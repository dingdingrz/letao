/**
 * Created by Administrator on 2018-04-10.
 */
$(function(){
    function render(){
        $.ajax({
            type:'get',
            dataType:'json',
            url:'/category/queryTopCategory',
            success:function(info){
                console.log(info);
                $(".main_left ul").html(template("firstcategory",info))
            }
        })
    }
    render()
    $(".main_left ul").on("click","a",function(){
        var id = $(this).data("id");
        $(this).addClass("current").parent().siblings().find("a").removeClass("current")
        $.ajax({
            type:'get',
            data:{id:id},
            dataType:'json',
            url:'/category/querySecondCategory',
            success:function(info){
                console.log(info);
                $(".main_right ul").html(template("secondcategory",info))
            }
        })
    })
})