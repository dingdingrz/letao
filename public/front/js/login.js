/**
 * Created by Administrator on 2018-04-12.
 */
$(function(){
  $(".confirmbtn").on("click",function(){
    var username =$("[name = username]").val();
    var password = $("[name = password]").val();

    if(!username){
      mui.toast("请输入用户名")
    }
    if (!password){
      mui.toast("请输入密码")

    }
    $.ajax({
      type:'post',
      dataType:'json',
      url:'/user/login',
      data:{
        username:username,
        password:password
      },
      success:function(info){
        console.log(info);
        if(info.success){
          if(location.search.indexOf("retUrl")!==-1){
            location.href = location.search.replace("?retUrl=","")
          }else {
            location.href = "user.html";
          }
        }
      }
    })
  })
})