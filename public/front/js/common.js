/**
 * Created by Administrator on 2018-04-10.
 */
$(function(){
    mui('.mui-scroll-wrapper').scroll({
        indicators: false
    });

    //轮播图
    var gallery = mui('.mui-slider');
    gallery.slider({
        interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
    });
})

function getSearch(key){
    var search = location.search;
    search=decodeURI(search);
    search = search.slice(1);
    var arr = search.split("&");
    var obj = {};
    arr.forEach(function(element,index){
        var k = element.split("=")[0];
        var v = element.split("=")[1];
        obj[k] = v;

    })

    return obj[key];
}

