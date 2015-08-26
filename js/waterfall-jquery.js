$(window).on('load',function(){
	var jsondatas={"data":[{"src":"01.jpg"},{"src":"02.jpg"},{"src":"03.jpg"},{"src":"04.jpg"},{"src":"05.jpg"},{"src":"06.jpg"},{"src":"07.jpg"},{"src":"08.jpg"},{"src":"09.jpg"},{"src":"10.jpg"}]};
	waterfall();
	$(window).on('scroll',function(){
		if(checkScrollSlide){
			$.each(jsondatas.data,function(index,value){
				var oBox=$('<div>').addClass('box').appendTo($("#container"));
				var oPic=$('<div>').addClass('picture').appendTo(oBox);
				$('<img>').attr('src','images/'+$(value).attr('src')).appendTo(oPic);
			});
			waterfall();
		}
	});
});
function waterfall(){
	var $oBoxs=$("#container>div");
	var w=$oBoxs.eq(0).outerWidth();
	var cols=Math.floor($(window).width()/w);
	$("#container").width(w*cols).css("margin","0 auto");
	var hArr=[];
	$.each($oBoxs,function(index,value){
		var h=$oBoxs.eq(index).outerHeight();
		if(index<cols){
			hArr[index]=h;
		}else{
			var minH=Math.min.apply(null,hArr);
			var minHIndex=$.inArray(minH,hArr);
			$(value).css({
				'position':'absolute',
				'top':minH+'px',
				'left':minHIndex*w+'px'
			});
			hArr[minHIndex]+=$oBoxs.eq(index).outerHeight();
		}
	});
}
function checkScrollSlide(){
	var oBoxlast=$("#container>div").last();
	var lastHeight=oBoxlast.offset().top+Math.floor(oBoxlast.outerHeight/2);
	var scrollH=$(window).scrollTop();
	var clientH=$(window).height();
	return (lastHeight<scrollH+clientH)?true:false;
}