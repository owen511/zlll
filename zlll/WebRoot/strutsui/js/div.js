var loadingdiv;
var bodybackdiv;
//创建滚动条层

function createloadingdiv(){
    loadingdiv = document.createElement("div");
	//给这个元素设置属性与样式
	loadingdiv.setAttribute("id","popupAddr");
	loadingdiv.style.border = "1px solid #ccc";
	loadingdiv.style.width = "60px";
	loadingdiv.style.top="300px";
	var k = document.body.clientWidth;
	loadingdiv.style.left=k/2-50;
	loadingdiv.style.height = "10px";
	loadingdiv.style.background = "#fff";
	loadingdiv.style.zIndex = 99;
	loadingdiv.style.position = "absolute";
	loadingdiv.innerHTML = "<img  src='/images/actions/loading.gif' >";
}
//创建背景层
function createbodybackdiv(){
	var arrayPageSize = getPageSize();
	var arrayPageScroll = getPageScroll();
	bodybackdiv = document.createElement("div");
	bodybackdiv.setAttribute("id","bodybg")
	bodybackdiv.style.width = "100%";	
	bodybackdiv.style.top = (arrayPageScroll[1] + ((arrayPageSize[3] - 35 - 400) / 2) + 'px') ;
	bodybackdiv.style.left = (((arrayPageSize[0] - 20 - 600) / 2) + 'px');
	bodybackdiv.style.height = (arrayPageSize[1] + 35 + 'px');
	bodybackdiv.style.zIndex = 98;
	bodybackdiv.style.position = "absolute";
	bodybackdiv.style.top = 0;
	bodybackdiv.style.left = 0;
	bodybackdiv.style.filter = "alpha(opacity=20)";
	bodybackdiv.style.opacity = 0.2;
	bodybackdiv.style.background = "#000";
}
//显示创建的层
function showdiv(){
	if(document.getElementById("popupAddr")){
		document.getElementById("popupAddr").style.display = "";
	}else{
		createloadingdiv();
	}
	if(document.getElementById("bodybg")){
		document.getElementById("bodybg").style.display = "";
	}else{
		createbodybackdiv();
	}
	document.body.appendChild(loadingdiv);
	document.body.appendChild(bodybackdiv); 
	}
//隐藏创建的层
function closediv(){
	document.getElementById("popupAddr").style.display = "none";
	document.getElementById("bodybg").style.display = "none";
}
//打开创建的层
function opendiv(){
	document.getElementById("popupAddr").style.display = "";
	document.getElementById("bodybg").style.display = "";
}

function getScrollTop() {    
    var scrollPos = 0;    
    if (typeof window.pageYOffset != 'undefined') {    
        scrollPos = window.pageYOffset;    
     }    
    else if (typeof window.document.compatMode != 'undefined' &&    
        window.document.compatMode != 'BackCompat') {    
        scrollPos = window.document.documentElement.scrollTop;    
     }    
    else if (typeof window.document.body != 'undefined') {    
        scrollPos = window.document.body.scrollTop;    
     }    
    return scrollPos;
    }

	//获取页面实际大小
function getPageSize(){ 
    
    var xScroll, yScroll; 
    
    if (window.innerHeight && window.scrollMaxY) {    
        xScroll = document.body.scrollWidth; 
        yScroll = window.innerHeight + window.scrollMaxY; 
    } else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac 
        xScroll = document.body.scrollWidth; 
        yScroll = document.body.scrollHeight; 
    } else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari 
        xScroll = document.body.offsetWidth; 
        yScroll = document.body.offsetHeight; 
    } 
    
    var windowWidth, windowHeight; 
    if (self.innerHeight) {    // all except Explorer 
        windowWidth = self.innerWidth; 
        windowHeight = self.innerHeight; 
    } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode 
        windowWidth = document.documentElement.clientWidth; 
        windowHeight = document.documentElement.clientHeight; 
    } else if (document.body) { // other Explorers 
        windowWidth = document.body.clientWidth; 
        windowHeight = document.body.clientHeight; 
    }    
    
    // for small pages with total height less then height of the viewport 
    if(yScroll < windowHeight){ 
        pageHeight = windowHeight; 
    } else { 
        pageHeight = yScroll; 
    } 

    // for small pages with total width less then width of the viewport 
    if(xScroll < windowWidth){    
        pageWidth = windowWidth; 
    } else { 
        pageWidth = xScroll; 
    } 

    arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight) 
    return arrayPageSize; 
}

//获取滚动条的高度
function getPageScroll(){
var yScroll;
if (self.pageYOffset) {
   yScroll = self.pageYOffset;
} else if (document.documentElement && document.documentElement.scrollTop){ // Explorer 6 Strict
   yScroll = document.documentElement.scrollTop;
} else if (document.body) {// all other Explorers
   yScroll = document.body.scrollTop;
}
arrayPageScroll = new Array('',yScroll) 
return arrayPageScroll;
}