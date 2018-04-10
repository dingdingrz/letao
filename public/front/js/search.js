/**
 * Created by Administrator on 2018-04-10.
 */
$(function(){

    function getHistory(){
        var history = localStorage.getItem("searchList")||[];
        var arr = JSON.parse(history);
        return arr
    }
    function render(){
        var arr = getHistory();
        $(".content ul").html(template("historyTpl",{list:arr}))
    }
    render()


    // 点击搜索按钮获得值并持久化本地中
    $(".lt_search button").on("click",function(){
        var key = +$(".lt_search input").val().trim();
        var newArr =getHistory();
        if(newArr.indexOf(key) !==-1){
            var index = newArr.indexOf(key);
            newArr.splice(index,1);
        }
        if(newArr.length>=10){
            newArr.pop()
        }
        newArr.unshift(key);
        localStorage.setItem("searchList",JSON.stringify(newArr));
        render()
        $(".lt_search input").val("")

    })
    //删除全部按钮功能
    $(".btn-empty").click(function(){
        mui.confirm("是否清空历史","温馨提示", ["确认", "取消"],function(e){
            console.log(e.index);
            if(e.index===0) {

            }
        })
    })
})