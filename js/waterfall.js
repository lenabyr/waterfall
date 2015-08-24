window.onload=function(){
	waterfall('container','box');
}
function waterfall(parent,box){
	//将container下所有class为box的元素取出来
	var oParent=document.getElementById(parent);
	var oBoxs=getByClass(oParent,box);
	//console.log(oBoxs.length);
	//计算整个页面显示的列数（页面宽度/box宽度）
	var oBoxW=oBoxs[0].offsetWidth;
	var cWidth=document.documentElement.clientWidth||document.body.clientWidth;
	
	var cols=Math.floor(cWidth/oBoxW);
	console.log(cols);
	//设置container宽度并居中
	oParent.style.cssText='width:'+oBoxW*cols+'px;margin:0 auto';
	var hArr=[];
	for(var i=0;i<oBoxs.length;i++){
		if(i<cols){
			hArr.push(oBoxs[i].offsetHeight);
		}
		else{
			var minH=Math.min.apply(null,hArr);//这里不是很理解，之后再看一下
			//console.log(minH);
			var index=getMinhIndex(hArr,minH);
			oBoxs[i].style.position='absolute';
			oBoxs[i].style.top=minH+'px';
			oBoxs[i].style.left=oBoxW*index+'px';
			//oBoxs[i].style.left=oBoxs[index].offsetLeft+'px';
			hArr[index]+=oBoxs[i].offsetHeight;
		}
	}
	console.log(hArr);
}
function getMinhIndex(arr,val){
	for(var i in arr){
		if(arr[i]==val){
			return i;
		}
	}
}
//根据class获取元素
function getByClass(parent,clsName){
	var boxArr=[];//存取所有class为box的元素
	var oElements=parent.getElementsByTagName('*');
	for(var i=0;i<oElements.length;i++){
		if(oElements[i].className==clsName){
			boxArr.push(oElements[i]);
		}
	}
	return boxArr;
}