$(function() {
    //1、全选按钮。上下的全选按钮效果是一样的，按钮状态选中，那么所有商品的状态为选中。点击全选按钮让其不选中时，商品的选中状态就全部取消choseall与goodchose
    $('.choseall').change(function() {
        //让下面商品的选中状态与全选按钮的一致$('.choseall').prop(checked)
        $('.goodchose').prop('checked', $('.choseall').prop('checked'))
        $('.chosealllast').prop('checked', $('.choseall').prop('checked'))
            //复制一份到下面的全选按钮中
        if ($(this).prop('checked') == true) {
            $('.goodchose').parent().parent().css('background-color', 'aliceblue')
        } else {
            $('.goodchose').parent().parent().css('background-color', '')
        }
    })
    $('.chosealllast').change(function() {
        //让下面商品的选中状态与全选按钮的一致$('.choseall').prop(checked)
        $('.goodchose').prop('checked', $('.chosealllast').prop('checked'))
        $('.choseall').prop('checked', $('.chosealllast').prop('checked'))
        if ($(this).prop('checked') == true) {
            $('.goodchose').parent().parent().css('background-color', 'aliceblue')
        } else {
            $('.goodchose').parent().parent().css('background-color', '')
        }
    })

    //2、当商品的选中个数小于商品栏个数的时候，两个全选按钮就会取消选中element：checked  用来专门获取复选框被选中的情况.length获取个数
    $('.goodchose').change(function() {
        // console.log($('.goodchose:checked'))
        if ($('.goodchose:checked').length != $('.goodchose').length) {
            $('.choseall').prop('checked', false)
            $('.chosealllast').prop('checked', false)

        }

        //当商品的选中个数等于商品个数的时候，就相当于全选了，此时两个全选复选框全部选中
        if ($('.goodchose:checked').length == $('.goodchose').length) {
            $('.choseall').prop('checked', true)
            $('.chosealllast').prop('checked', true)
        }
        // //6、更改商品总数内容
        // $('.totoalgoodn').text('已经选' + $('.goodchose:checked').length + '件商品')
        // console.log($('.goodchose:checked').length);

        //11
        if ($(this).prop('checked') == true) {
            $(this).parent().parent().css('background-color', 'aliceblue')
        } else {
            $(this).parent().parent().css('background-color', '')
        }

    })

    //3、修改数量为jian和add添加事件
    $('.add').click(function() {

        //这个商品的价格改变,siblings('')
        //是在初始值上每点击一次就减一,但最小为一
        var b = $(this).siblings('.mony').prop('value')
            //这个b是一个字符型
        $(this).siblings('.mony').prop('value', parseInt(b) + 1)
            //4|
        var c = $(this).parent().siblings('.onemony').text().substr(1)
            // console.log(c)
            //更改小计里面的内容,显示两个小数.toFixed(2)
        $(this).parent().siblings('.totalmony').text('￥' + (c * (parseInt(b) + 1)).toFixed(2))
        totalnumber()
    })
    $('.jian').click(function() {
        //这个商品的价格改变,siblings('')
        //是在初始值上每点击一次就减一,但最小为一
        var a = parseInt($(this).siblings('.mony').prop('value'))
        if (a >= 2) {
            $(this).siblings('.mony').prop('value', a - 1)
                //4|
            var c = $(this).parent().siblings('.onemony').text().substr(1)
                // console.log(c)
                //更改小计里面的内容,显示两个小数.toFixed(2)
            $(this).parent().siblings('.totalmony').text('￥' + (c * (a - 1)).toFixed(2))
        }
        totalnumber()
    })

    //4、实现小计跟随数量变化，用数量的值*单价。单价去掉￥，得到数字,因为是跟随数量变化的，所以这一部分添加到点击事件中去,substr()

    //5、手动更改数量的时候，小计会发生改变.给mony添加change事件
    $('.mony').change(function() {
            //获得这里面的值赋值给一个变量
            var number = $(this).prop('value')
                //获取对应的单价
            var c = $(this).parent().siblings('.onemony').text().substr(1)
                //要保证合格值大于等于1
            if (number >= 1) {
                var b = number * c
            }
            //当number小于1时，默认为1
            if (number < 1) {
                $(this).prop('value', 1)
                number = 1
                var b = number * c
            }
            // alert(number)
            // console.log(number)
            console.log(b)
            $(this).parent().siblings('.totalmony').text('￥' + (b).toFixed(2))
            totalnumber()
        })
        //6、获得已经选择的商品个数，就是看商品栏的状态选择个数,再状态变化的事件中进行更改--不对，商品数目拿的是表单里面的数量综合，一旦表单里面的元素值发生改变的时候，就要重新计算以下商品的数目

    //7、更改价格，价格的话就是小计的累加。那么就需要对小计进行遍历，一旦小计发生改变，就需要遍历一次去改变总价
    //函数封装
    //总计
    function totalnumber() {
        var ton = 0
        $('.mony').each(function(index, ele) {
            // console.log(index);
            // console.log($('.mony').eq(index).val());直接拿ele这个元素里面的内容，不需要进行索引
            ton = ton + parseInt($(ele).val())
        })

        $('.totoalgoodn').text('已经选' + ton + '件商品')
            //总额,从小计里面获得，去掉￥，再遍历相加
        var mon = 0
        $('.totalmony').each(function(i, e) {
                //首先获取每个元素的text

                mon = mon + parseInt($(e).text().substr(1))

            })
            //把mon给总价后的数值
        $('.totalprice').text('￥' + mon.toFixed(2))
    }
    totalnumber() //打开这个页面，有默认的值存在，所以也要调用一次

    //8、按下删除键，就删除此时的商品
    $('.deletthis').click(function() {
        //删除我的父亲tr
        $(this).parent().remove()
        totalnumber()
    })

    //9、删除选中的商品
    $('.chosedelet').click(function() {
        $('.goodchose:checked').parent().parent().remove()
        totalnumber()
    })

    //10、按下清理购物车，就将所有的商品都清理掉
    $('.clearall').click(function() {
            //这里不需要进行遍历
            $('.goodchose').parent().parent().remove()
            totalnumber()
        })
        //11、选定一个商品就给其添加一个背景色,放到商品购物状态change事件中
})