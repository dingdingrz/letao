/**
 * Created by Administrator on 2018-04-07.
 */
$(function(){
  var currentPage = 1;
  var pageSize =5
  render()
  function render(){
    $.ajax({
      type:'get',
      dataType:'json',
      url:'/user/queryUser',
      data:{page:currentPage, pageSize:pageSize},
      success:function(info){
        console.log(info);
        var stringHtml = template("usertmp",info)
        $(".lt_contant tbody").html(stringHtml)
        //分页插件渲染
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage :info.page,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function(a,b,c,page){
            currentPage = page;
            render()
          }

        })

      }
    })
  }


  // 禁用和启用功能

  $(".lt_contant tbody").on("click","button",function(){
    $("#userModal").modal("show");
    var id = $(this).parent().data("id");
    var isDelete = $(this).hasClass("btn-success")? "1":"0";
    $("#confirm").off("click").on("click",function(){
      $.ajax({
        type:'post',
        url:'/user/updateUser',
        data:{id:id,isDelete:isDelete},
        success:function(info){
          console.log(info);
          if(info.success){
            $("#userModal").modal("hide");
            render()
          }
        }
      })
    })
  })
})

