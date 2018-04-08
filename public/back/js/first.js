/**
 * Created by Administrator on 2018-04-07.
 */
$(function(){
  var currentpage = 1;
  var pageSize = 5
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
          totalPages:Math.ceil(info.total/info.size),
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
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    fields:{
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
    $.ajax({
      url:'/category/addTopCategory',
      type:'post',
      data:$("#form").serialize(),
      success:function(info){
        if(info.success){
          $("#addModel").modal("hide")
          $("#form").data("bootstrapValidator").resetForm(true)
          render()
        }
      }
    })
  })

})