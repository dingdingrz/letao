/**
 * Created by Administrator on 2018-04-06.
 */
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
    alert(123);
    $.ajax({
      type:'get',
      dataType:'json',
      url:'/employee/employeeLogout',
      success:function(info){
        if(info.success){
          location.href="index.html"
        }
      }
    })
  })

})