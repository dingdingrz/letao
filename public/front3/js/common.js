/**
 * Created by Administrator on 2018-04-14.
 */
$(function(){
  var gallery = mui('.mui-slider');
  gallery.slider({
    interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
  });


  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005
  })
})