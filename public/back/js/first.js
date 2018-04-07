/**
 * Created by Administrator on 2018-04-07.
 */
$(function(){
  var currentpage = 1;
  var pageSize = 2
  render();

  function render(){
    $.ajax({
      type:'get',
      url:'/category/queryTopCategoryPaging',
      data:{
        page:currentpage,
        pageSize:pageSize
      },
      dataType:'json',
      success:function(info){
        console.log(info);
        var stringHtml = template("list",info)
        $(".lt_contant tbody").html(stringHtml)
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentpage:currentpage,
          totalPages:Math.ceil(info.total/(info.size/5)),
          onPageClicked:function(a,b,c,page){
            console.log(page);
            currentpage = page;
            render()
          }
        })
      }


    })
  }

  $(".addbtn").on("click",function(){
    $("#addModel").modal("show")
  })

  //给模态框进行校验
  $("#form").bootstrapValidator({
    fileds:{
      categoryName:{
        validators:{
          notEmpty:{
            message:"请输入一级分类名称"
          }
        }
      }
    }
  })
  $("#form").on("success.form.bv",function(e){
    e.preventDefault()
  })

})