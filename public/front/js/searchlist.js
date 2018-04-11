/**
 * Created by Administrator on 2018-04-11.
 */
$(function(){
  var key = getSearch("key");
  $(".lt_search input").val(key);
  render()


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

  function render(){
    $(".lt_product ul").html('<div class="loading"></div>')
    var params = {}
      params.proNam=$(".lt_search input").val(),
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
          $(".lt_product ul").html(template("productTmp",info))
        }
      })
    },500)

  }
})