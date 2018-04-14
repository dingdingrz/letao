/**
 * Created by Administrator on 2018-04-14.
 */
$(function(){

  render()
  function getHistory(){
    var history = localStorage.getItem("searchList") || "[]";
    var arr = JSON.parse(history)
    return arr
  }
  function render(){
    var arr = getHistory()
    $(".historylist").html(template("historytext",{list:arr}))
  }



  $(".searchbtn").on("click",function(){
    var val = $(".majortext").val();
    var arr = getHistory()
    if(val.length>0){
      if(arr.indexOf(val) !== -1){
        arr.splice(arr.indexOf(val),1)
      }
      if(arr.length>10){
        arr.pop()
      }
      arr.unshift(val)
      localStorage.setItem("searchList",JSON.stringify(arr))
      render()
      $(".majortext").val("")
      location.href = "searchlist.html?key="+val
    }
    mui.toast('请输入搜索关键字',{ duration:500, type:'div' })

  })

  $(".historylist ").on("click","a",function(){
    var val = $(this).text();
    $(".majortext").val(val);

  })

  $(".deletebtn").on("click",function(){
    mui.confirm("您确定要删除吗？","温馨提醒",["确定","取消"],function(e){
      console.log(e.index);
      if(e.index===0){
        localStorage.removeItem("searchList");
        render()
      }
    })
  })

})