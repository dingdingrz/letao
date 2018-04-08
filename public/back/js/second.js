/**
 * Created by Administrator on 2018-04-08.
 */
$(function(){
  render(1,5)
  var currentPage = 1;
  function render (page,pageSize){
    $.ajax({
      type:"get",
      url:'/category/querySecondCategoryPaging',
      data:{page:page, pageSize:pageSize},
      dataType:'json',
      success:function(info){
        //console.log(info);
        var strhtml = template("secondtpl",info)
        $(".lt_contant tbody").html(strhtml)
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:currentPage,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function(a,b,c,page){
            currentPage =page;
            render(currentPage,5)
          }
        })
      }
    })
  }
  $(".addbtn").click(function(){
    $("#secondModal").modal("show");
    function categoryRender(page,pageSize){
      $.ajax({
        type:'get',
        dataType:'json',
        url:'/category/queryTopCategoryPaging',
        data:{page:page, pageSize:pageSize},
        success:function(info){
          console.log(info);
          var strHtml = template("firsttmp",info)
          $(".dropdown-menu").html(strHtml)
        }
      })

    }
    categoryRender(1,20)
  })
  //给a 注册点击事件

  $(".dropdown-menu").on("click","a",function(){
    var id = $(this).data("id");
    var name = $(this).text();
    $(".categoryId").val(id)
    $(".secondTxt").text(name)
    $("#form").data("bootstrapValidator").updateStatus("categoryId","VALID")
  })

  //配置图片上传
  $("#fileupload").fileupload({
    dataType:'json',
    done:function(e,data){
      console.log(data);
      var picAddr = data.result.picAddr;
      $("#imgBox img").attr("src",picAddr);
      $('[name="brandLogo"]').val(picAddr)
      $("#form").data("bootstrapValidator").updateStatus("brandLogo","VALID")
    }
  })
  $("#form").bootstrapValidator({
    excluded:[],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      brandName:{
        validators:{
          notEmpty:{
            message:"请输入二级分类名称"
          }
        }
      },
      categoryId:{
        validators:{
          notEmpty:{
            message:"请输入一级分类"
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:"请上传图片"
          }
        }
      },
      brandName:{
        validators:{
          notEmpty:{
            message:"请输入二级分类"
          }
        }
      }

    }
  })


  //注册校验成功事件

  $("#form").on("success.form.bv",function(e){
    e.preventDefault();
    $.ajax({
      url:'/category/addSecondCategory',
      type:'post',
      data:$("#form").serialize(),
      success:function(info){
        console.log(info);
        $("#secondModal").modal("hide")
        $("#form").data("bootstrapValidator").resetForm(true);
        currentPage = 1;
        render(currentPage)
        $(".secondTxt").text("请选择一级分类")
        $("#imgBox img").attr("src","images/none.png")
      }
    })
  })
})