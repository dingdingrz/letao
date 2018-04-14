/**
 * Created by Administrator on 2018-04-10.
 */
$(function(){

    function getHistory(){
        var history = localStorage.getItem("searchList")||"[]";
        var arr = JSON.parse(history);
        return arr
    }
    function render(){
        var arr = getHistory();
        $(".content ul").html(template("historyTpl",{list:arr}))
    }
    render()


    // 点击搜索按钮获得值并持久化本地中
    //$(".lt_search button").on("click",function(){
    //    var key = $(".lt_search input").val().trim();
    //    var newArr =getHistory();
    //    if(newArr.indexOf(key) !==-1){
    //        var index = newArr.indexOf(key);
    //        newArr.splice(index,1);
    //    }
    //    if(newArr.length>=10){
    //        newArr.pop()
    //    }
    //    newArr.unshift(key);
    //    localStorage.setItem("searchList",JSON.stringify(newArr));
    //    render()
    //    $(".lt_search input").val("")
    //    //return false
    //    location.href = "searchlist.html?key="+key;
    //
    //})
    //删除全部按钮功能
    $(".btn-empty").click(function(){
        mui.confirm("是否清空历史","温馨提示", ["确认", "取消"],function(e){
            if(e.index===0) {
                localStorage.removeItem("searchList");
                render()
            }
        })
    })

    //添加单个删除按钮功能
    $(".content ul").on("click",".btn_delete",function(){
        var index = $(this).data("index");
        mui.confirm("是否要删除","温馨提示",["确认","取消"],function(e){
            console.log(index);
            if(e.index===0){
                var arr = getHistory();
                arr.splice(index, 1);
                localStorage.setItem("searchList",JSON.stringify(arr))
                render()
            }
        })
    })
})