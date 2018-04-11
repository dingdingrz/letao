/**
 * Created by Administrator on 2018-04-11.
 */
$(function(){
  function render(id){
    $.ajax({
      type:'get',
      url:'/product/queryProductDetail',
      data:{id:id},
      dataType:'json',
      success:function(info){
        console.log(info);
        $(".product-detail").html(template("productTpl",info))
      }
    })
  }
  //render(1)
})