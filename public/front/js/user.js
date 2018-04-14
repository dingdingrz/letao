/**
 * Created by Administrator on 2018-04-14.
 */
$(function(){
  $.ajax({
    type:'get',
    dataType:'json',
    url:'/user/queryUserMessage',
    success:function(info){
      console.log(info);
      if(info.error===400){
        location.href = "login.html";
        return;
      }
      $("#info").html(template("list",info))
    }
  })
  $(".loginoutbtn").on("click",function(){
    $.ajax({
      type:'get',
      url:'/user/logout',
      dataType:'json',
      success:function(info){
        if(info.success){
          location.href = "login.html"

        }
      }
    })
  })
})