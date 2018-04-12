/**
 * Created by Administrator on 2018-04-11.
 */
$(function(){
  var productId = getSearch("productId");
  function render(id){
    $.ajax({
      type:'get',
      url:'/product/queryProductDetail',
      data:{id:id},
      dataType:'json',
      success:function(info){
        console.log(info);
        $(".mui-scroll").html(template("productTpl",info))
        var gallery = mui('.mui-slider');
        gallery.slider({
          interval:1000
        });
        mui(".mui-numbox").numbox()
      }
    })
  }
  render(1)

  //尺码点击增加分类时间
  $(".mui-scroll").on("click",".size span", function(){
    $(this).addClass("current").siblings().removeClass("current")
  })

  //点击加入购物车按钮

  $(".add_cart").on("click",function(){
    var size = $(".size span.current").text()
    var num = $(".num input").val();
    if(!size){
      mui.toast("请选择尺码")
      return
    }
    $.ajax({
      type:'post',
      dataType:'json',
      url:'/cart/addCart',
      data:{
        productId:productId,
        size:size,
        num:num
      },
      success:function(info){
        console.log(info);
        if(info.success){
          mui.confirm("添加成功","温馨提示",["去购物车","继续浏览"],function(e){
            if(e.index===0){
              location.href = "cart.html"
            }
          })
        }
        if(info.error ===400){
          location.href="login.html?retUrl="+location.href;
        }
      }

    })
  })
})