 /*
  *
  *  导航菜单  横向滚动
  *
  */
 (function($) {
     $.fn.daohang = function(option) {
         var $this = $(this),
             opts = $.extend($.fn.daohang.defaults, option),
             navList = $this.find("li"),
             curBg = $this.find("." + opts.curBgClassName),
             j = 0, // 用于定位curBg上一个位置（及触发mouseout的li的下标）
             i = 0, // 当前li的下标
             timeout = null;

         // 设置起始位置
         move(opts.first, opts.first, 1);

         function move(n, m, time) { // time这个参数，主要是用于刚进入页面，设置的起始位置
             time = time || opts.changeTime;
             navList.removeClass(opts.curClassName);
             navList.eq(m).addClass(opts.curClassName);
             if (opts.isBack) {
                 navList.eq(opts.first).addClass(opts.curClassName);
             }

             var navNewWidth = navList.eq(m).outerWidth(true),
                 navNewLeft = navList.eq(m).offset().left - navList.eq(0).offset().left;

             curBg.stop(true, true).animate({
                 width: navNewWidth + "px",
                 marginLeft: navNewLeft + "px"
             }, time);
         }

         $this.on("mouseenter mouseleave", "li", function(event) {
             var target = $(this);

             if (event.type === "mouseenter") {
                 clearTimeout(timeout);
                 i = target.index();
                 move(j, i);
             }

             if (event.type === "mouseleave") {
                 j = target.index();
                 if (opts.isBack) {
                     timeout = setTimeout(function() {
                         move(j, opts.first);
                     }, opts.changeTime);
                 }
             }
         });

         return $this;
     };

     /*
      *
      *默认参数
      *
      */
     $.fn.daohang.defaults = {
         curClassName: "cur", // 当前li的class
         curBgClassName: "curBg", // 导航下划线的class
         changeTime: 400, // 多长时间导航下划线移动到指定位置
         isBack: true,
         first: 0
     };
 })(jQuery);

 /*
  *
  * 调用函数
  *
  */
 jQuery(function() {
     $("#nav").daohang({
         isBack: true,
         first: 5
     });
 });