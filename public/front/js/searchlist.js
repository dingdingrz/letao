/**
 * Created by Administrator on 2018-04-11.
 */
$(function(){
  var currentPage = 1;
  var key = getSearch("key");
  $(".lt_search input").val(key);
  mui.init({
    pullRefresh : {
      container:".content",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down : {

        auto: true,//可选,默认false.首次加载自动上拉刷新一次
        callback :function(){
          currentPage = 1;
          render(function(info){
            $(".lt_product ul").html(template("productTmp",info));
            mui(".content").pullRefresh().endPulldownToRefresh();
            mui(".content").pullRefresh().enablePullupToRefresh();
          })
        }
      },
      up:{
        callback:function(){
          currentPage++;
          render(function(info){
            if(info.data.length>0){
              $(".lt_product ul").append(template("productTmp",info));
              mui(".content").pullRefresh().endPulldownToRefresh()
            }else{
              mui(".content").pullRefresh().endPullupToRefresh(true)
            }
          })
        }
      }
    }

  });


//按钮搜索进行渲染
  $(".lt_search button").click(function(){
    render()
    var key = $(".lt_search input").val();
    var history = localStorage.getItem("searchList")||"[]";
    var arr = JSON.parse(history);
    var index = arr.indexOf(key);
    if(index !== -1){
      arr.splice(index, 1);
    }
    if(arr.length>=10){
      arr.pop()
    }
    arr.unshift(key)
    localStorage.setItem("searchList",JSON.stringify(arr));
  })



  $(".lt_title a[data-type]").click(function(){
    if($(this).hasClass("current")){
      $(this).find("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up")
    }else{
      $(this).addClass("current").parent().siblings().find("a").removeClass("current")
      $(".lt_title a ").find("i").removeClass("fa-angle-up").addClass("fa-angle-down")
    }
    render()
  })

  function render(callback){
    //var callback;
    //$(".lt_product ul").html('<div class="loading"></div>')
    var params = {}
      params.proName=$(".lt_search input").val(),
      params.page=1;
      params.pageSize=100;
    var $current = $(".lt_title .current")
    if($current.length>0){
      var sortName = $current.data("type")
      var sortNum = $current.find("i").hasClass("fa-angle-down")?"2":"1";
      params[sortName]=sortNum;
    }
    console.log(params);
    setTimeout(function(){
      $.ajax({
        dataType:'json',
        url:'/product/queryProduct',
        type:'get',
        data:params,
        success:function(info){

          callback && callback(info);

        }
      })
    },500)

  }


  //配置下拉刷新
  mui.init({
    pullRefresh : {
      container:".content",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down : {
        style:'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
        color:'#2BD009', //可选，默认“#2BD009” 下拉刷新控件颜色
        height:'50px',//可选,默认50px.下拉刷新控件的高度,
        range:'100px', //可选 默认100px,控件可下拉拖拽的范围
        offset:'0px', //可选 默认0px,下拉刷新控件的起始位置
        auto: true,//可选,默认false.首次加载自动上拉刷新一次
        callback :function(){
            currentPage = 1;
          render(function(info){
            $(".lt_product ul").html(template("productTmp",info))
            mui(".content").pullRefresh().enablePullupToRefresh();

          })
        }
      }
    }
  });
})