/**
 * Created by Administrator on 2018-04-09.
 */
$(function(){
  var currentPage  = 1;
  render(currentPage,3);
  var picArr = [];
  function render(page,pageSize){
    $.ajax({
      type:'get',
      dataType:'json',
      url:'/product/queryProductDetailList',
      data:{page:page,pageSize:pageSize},
      success:function(info){
        //console.log(info);
        var strHtml = template("productList",info)
        $(".lt_contant tbody").html(strHtml);
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:currentPage,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function(a,b,c,page){
            currentPage = page
            render(currentPage,3)
          }
        })
      }
    })
  }



  $(".addbtn").click(function(){
    $("#productModal").modal("show")
    $.ajax({
      type:'get',
      dataType:'json',
      url:'/category/querySecondCategoryPaging',
      data:{page:currentPage,pageSize:10},
      success:function(info){
        console.log(info);
        $(".dropdown-menu").html(template("secondModal",info))
      }
    })
  })
  $(".dropdown-menu").on("click","a",function(){
    var id = $(this).data("id");
    var text = $(this).text();
    $(".secondTxt").text(text)
    $('[name ="brandId"]').val(id)
  })
  $("#fileupload").fileupload({
    dataType:'json',
    done:function(e,data){
      console.log(data);
      var picobj = data.result;
      var picAddr = picobj.picAddr
      picArr.push(picobj);
      console.log(picArr);
      $("#imgBox").prepend('<img src="'+picAddr+'" width="100">');
      if (picArr.length>3){
        picArr.pop()
        $("#imgBox img:last-of-type").remove()
      }
    }

  })

  $("#form").bootstrapValidator({
    exclude:[],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      brandId:{
        validators:{
          notEmpty:{
            message:"请选择二级分类"
          }
        }
      },
      proName:{
        validators:{
          notEmpty:{
            message:"请输入商品名称"
          }
        }
      },
      proDesc:{
        validators:{
          notEmpty:{
            message:"请输入产品描述"
          }
        }
      },
      num:{
        validators:{
          notEmpty:{
            message:"请输入产品库存"
          }
        }
      },
      size:{
        validators:{
          notEmpty:{
            message:"请输入产品的尺寸"
          }
        }
      },
      oldPrice:{
        validators:{
          notEmpty:{
            message:"请输入产品的原价"
          }
        }
      },
      price:{
        validators:{
          notEmpty:{
            message:"请输入产品的现价"
          }
        }
      },
      picstatus:{
        validators:{
          notEmpty:{
            message:"请上传三张图片"
          }
        }
      },
    }


  })
  $("#form").on("success.form.bv",function(e){
    e.preventDefault();
    var params = $("#form").serialize();
    params += "&picName1=" + picArr[0].picName + "&picAddr1=" + picArr[0].picAddr;
    params += "&picName2=" + picArr[1].picName + "&picAddr2=" + picArr[1].picAddr;
    params += "&picName3=" + picArr[2].picName + "&picAddr3=" + picArr[2].picAddr;
    $.ajax({
      url:'/product/addProduct',
      type:'post',
      dataType:'params',
      dataType:'json',
      success:function(info){
        console.log(info);
      }
    })
  })
})