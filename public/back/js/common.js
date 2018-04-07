/**
 * Created by Administrator on 2018-04-06.
 */
$(document).ajaxStart(function(){
  NProgress.start();
})
$(document).ajaxStop(function(){
  setTimeout(function(){
    NProgress.done();
  },500)
});
if(location.href.indexOf("login.html") === -1 ){
  $.ajax({
    url:'/employee/checkRootLogin',
    type:'get',
    success:function(info){
      console.log(info);
      if(info.success){
      }
      if (info.error ===400){
        location.href = "login.html";
      }
    }
  })
}
$(function(){
  $(".category").click(function(){
    $(this).next().stop().slideToggle()
  })
  $(".icon_menu").click(function(){
    $(".lt_side").toggleClass("hidemenu");
    $(".lt_main").toggleClass("hidemenu");
    $(".lt_topbar").toggleClass("hidemenu");
  })
  $(".icon_logout").click(function(){
  $("#logoutModal").modal("show");
  })
  $("#loginoutBtn").click(function(){
    console.log(11);
    $.ajax({
      type:'get',
      dataType:'json',
      url:'/employee/employeeLogout',
      success:function(info){
        if(info.success){
          location.href="login.html"
        }
      }
    })
  })

})