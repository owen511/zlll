
var Browser=new Object();
Browser.isMozilla=(typeof document.implementation!='undefined')&&(typeof document.implementation.createDocument!='undefined')&&(typeof HTMLDocument!='undefined');
Browser.isIE=window.ActiveXObject?true:false;
Browser.isGecko=navigator.userAgent.indexOf("Gecko")!=-1;
Browser.isOpera=(navigator.userAgent.toLowerCase().indexOf("opera")!=-1);
if(Browser.isMozilla&&!Browser.isOpera){
	HTMLElement.prototype.removeNode=function(){this.parentNode.removeChild(this);}
	extendEventObject();
	emulateAttachEvent();
	var eventArr=["click","dblclick","mouseover","mouseout","mousedown","mouseup","mousemove","keydown","keypress","keyup"];
	emulateEventHandlers(eventArr);
	emulateCurrentStyle();
	Event.LEFT=0;
	Event.MIDDLE=1;
	Event.RIGHT=2;
}
else{
	Event={};
	Event.LEFT=1;
	Event.MIDDLE=4;
	Event.RIGHT=2;
}



var xmlHttp
function creRequest(){
	msxml_progid=['MSXML2.XMLHTTP.3.0','MSXML2.XMLHTTP','Microsoft.XMLHTTP'];
	try{
		xmlHttp=new XMLHttpRequest();
	}
	catch(e){
		for(var i=0;i<msxml_progid.length;++i){
			try{
				xmlHttp=new ActiveXObject(msxml_progid[i]);
				break;
			}
			catch(e){
			}
		}
	}
}

function creNewRequest(){
	var oXMLHttp;
	msxml_progid=['MSXML2.XMLHTTP.3.0','MSXML2.XMLHTTP','Microsoft.XMLHTTP'];
	try{
		oXMLHttp=new XMLHttpRequest();
	}
	catch(e){
		for(var i=0;i<msxml_progid.length;++i){
			try{
				oXMLHttp=new ActiveXObject(msxml_progid[i]);
				break;
			}
			catch(e){
			}
		}
	}
	return oXMLHttp;
}

function startRequest(method,urlstr,postDatastr,callback,synch){
	if (synch == null) {
		synch = true;
	}
	var xmlHttp = creNewRequest();
	if(xmlHttp){
		var url="";
		var poststr="";
		if(method=='GET'){
			url=urlstr+"?"+postDatastr+"&t="+Math.random();
			postDatastr=null;
		}
		else if(method=='POST'){
			url=urlstr+"?t="+Math.random();
			poststr=postDatastr;
		}
		xmlHttp.onreadystatechange=function(){
			if(xmlHttp.readyState==4&&xmlHttp.status==200){
				if(Browser.isIE){
					if(callback) callback(xmlHttp.responseText);
				}
				else{
					if(callback) callback(xmlHttp.responseText);
				}
			}
		}
		xmlHttp.open(method,url,synch);
		xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
		xmlHttp.send(poststr);
	}
}


function gb2utf8(data){
	var glbEncode=[];
	gb2utf8_data=data;
	execScript("gb2utf8_data = MidB(gb2utf8_data, 1)","VBScript");
	var t=escape(gb2utf8_data).replace(/%u/g,"").replace(/(.{2})(.{2})/g,"%$2%$1").replace(/%([A-Z].)%(.{2})/g,"@$1$2");
	t=t.split("@");
	var i=0,j=t.length,k;
	while(++i<j){
		k=t[i].substring(0,4);
		if(!glbEncode[k]){
			gb2utf8_char=eval("0x"+k);
			execScript("gb2utf8_char = Chr(gb2utf8_char)","VBScript");
			glbEncode[k]=escape(gb2utf8_char).substring(1,6);
		} 
		t[i]=glbEncode[k]+t[i].substring(4);
	}
	gb2utf8_data=gb2utf8_char=null;
	return unescape(t.join("%"));
}
