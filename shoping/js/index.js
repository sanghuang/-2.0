// 点击f可获得搜索框的焦点
    var search_input=document.querySelector("#search_input");
    document.addEventListener('keyup',function(e){
    if(e.key=='c' || e.keyCode==70){
        search_input.focus();
    }
});
// 搜索框放大镜
    var search_div=document.querySelector("#search_div");
        search_div.style.display="none";
    search_input.addEventListener('keyup',function(){
        if(this.value==""){
            search_div.style.display="none";
        }else {
            search_div.style.display="block";
            search_div.innerText=this.value;
        };
        search_input.addEventListener('focus',function(){
            if(this.value!=""){
                search_div.style.display="block";
            }
        });
        search_input.addEventListener('blur',function(){
            search_div.style.display="none";
        })
    });
// 下拉菜单
    $(document).ready(function(){
        // 下拉边框默认收起
        $(".arrow-icon").children("ul").slideUp();
        
        $(".arrow-icon").hover(function(){
            $(this).children("ul").stop().slideToggle();
        });
    });
    
