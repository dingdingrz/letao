/**
 * Created by Administrator on 2018-04-14.
 */
$(function(){
  function render(){
    setTimeout(function(){
      $.ajax({
        type:'get',
        dataType:'json',
        url:'/cart/queryCart',
        success:function(info){
          console.log(info);
          $(".mui-scroll").html(template("product",{list:info}))
          mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh()
        }
      })

    },500)
  }
  mui.init({
    pullRefresh:{
      container:".mui-scroll-wrapper",
      down:{
        auto:true,
        callback:function(){
          render()
        }
      }
    }
  })
  $(".mui-scroll").on("tap",".editadd",function(){
    var id = this.dataset.id;
    console.log(id);
    var htmlString = template("editorTpl",this.dataset);
    htmlString =htmlString.replace(/\n/g,"");
    mui.confirm(htmlString,"编辑商品",["确认","取消"],function(e){
      if(e.index===0){
        var size = $(".lt_size span.current").text();
        console.log(size);
        var num = $(".lt_num .mui-number-input").val();
        $.ajax({
          type:'post',
          dataType:'json',
          url:'/cart/updateCart',
          data:{
            id:id,
            size:size,
            num:num
          },
          success:function(info){
            if(info.success){
              mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
            }
          }
        })
      }
    })
    mui(".mui-numbox").numbox()

  })
  $('body').on("tap", ".lt_size span", function() {
    $(this).addClass("current").siblings().removeClass("current");
  })

})