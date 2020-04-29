//读取 cookies 信息   
function getFont(name){   
  var cookieValue='';   
  var search=name+'=';   
  if(document.cookie.length>0){   
    offset=document.cookie.indexOf(search);   
    if (offset!=-1){   
      offset+=search.length;   
      end=document.cookie.indexOf(';', offset);   
      if (end == -1) end=document.cookie.length;   
      cookieValue = unescape(document.cookie.substring(offset,end))   
    }   
  }   
  return cookieValue;  
}   
  
//写入 cookies 信息   
function setFontCookie(value){   
  var expire = "";   
  hours=1;      
  //cookie.Expires  =  DataTime.MaxValue  
  if(hours != null){   
    expire = new Date((new Date()).getTime() + hours * 3600000);   
    expire = "; expires=" + expire.toGMTString();   
  }     
  document.cookie = "ifmisfont" + "=" + escape(value) + expire+";path=/";  
}  

function setFontSession(fontFile){
	var url = ROOT_PATH+"/common/setFontSession.do?random="+Math.random();
	new Ajax.Request(url,
	   {
	     method:'post',
         parameters:'fontfile='+fontFile,
         onComplete:function(resp){}
	   });
} 

/*
*两个参数，一个是cookie的名子，一个是值
*/
function setCookie1(name, value) {
    var Days = 1; //此 cookie 将被保存 30 天
    var exp = new Date(); //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + "; expires=" + exp.toGMTString()+";path=/; ";
}

/*
* 删除cookie
*/
function delCookie1(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie1(name);
    if (cval != null) document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();
}

//获取cookie by-jzy
function getCookie1(sName)
{
	// cookies are separated by semicolons
	var aCookie = document.cookie.split("; ");
	for (var i=0; i < aCookie.length; i++)
	{
		// a name/value pair (a crumb) is separated by an equal sign
		var aCrumb = aCookie[i].split("=");
		if (sName == aCrumb[0])
			return unescape(aCrumb[1]);
	}
	// a cookie with the requested name does not exist
	return null;
}


function setClientDimension(save){
	if(location.href.indexOf("getSession.do")!=-1 || save){
		 var clientWidth= top.window.document.body.clientWidth;
		 var clientHeight= top.window.document.body.clientHeight;
		 clientWidth = clientWidth<800?800:clientWidth;
		 clientHeight = clientHeight<600?600:clientHeight;
		 delCookie1("clientWidth");
		 delCookie1("clientHeight");
		 setCookie1("clientWidth", clientWidth);
		 setCookie1("clientHeight", clientHeight);
	}
}

window.attachEvent('onresize',function(){
	 setClientDimension(true)
});

window.attachEvent('onload',function(){
	var save = false;
	if(location.href.indexOf("getSession.do")!=-1 || location.href.indexOf("mainmenu")!=-1 && location.href.indexOf("submenu") == -1){
		save = true;
	}
	setClientDimension(save);
});