/*  
 *封装AJAX
 *author:constantine
 */
function Tbajax(url,jsonstr) {
	//服务器端返回值
	this.respText=null;
	//ajax发送的url
	this.url = url;
	//向服务器发送的内容:如有多个参数要传递，可以封装到一个对象中，转为字符串，取其属性
	this.jsonstr = this.treatjsonstr(jsonstr);
	//创建ajax请求
	this.request = this.createrequest();
	//发送到服务器端
	this.doajax();
}
//创建ajax请求
Tbajax.prototype.createrequest = function () {
	var request=false;
	try {
		request = new XMLHttpRequest();
	}
	catch (trymicrosoft) {
		try {
			request = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (othermicrosoft) {
			try {
				request = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (failed) {
				request = false;
			}
		}
	}
	if (!request) {
		alert("Error initializing XMLHttpRequest!");
	}
	return request;
};
//处理向服务器发送的内容
Tbajax.prototype.treatjsonstr = function (jsonstr) {
	return this.customescape(jsonstr);
};
//替换特殊字符
Tbajax.prototype.customescape = function (prastr) {
	prastr = prastr.replace(/%/g, "%25");
	prastr = prastr.replace(/\+/g, "%2B");
	prastr = prastr.replace(/\//g, "%2F");
	prastr = prastr.replace(/\?/g, "%3F");
	prastr = prastr.replace(/#/g, "%23");
	prastr = prastr.replace(/&/g, "%26");
	prastr = prastr.replace(/=/g, "%3D");
	prastr = prastr.replace(/ /g, "%20");
	return prastr;
};
//ajax请求
Tbajax.prototype.doajax=function (){
	this.request.open("POST", this.url, false);
	this.request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
	this.request.send("jsonstr=" + this.jsonstr);
	this.ajaxback();
};
//ajax返回值赋值
Tbajax.prototype.ajaxback=function () {
	if (this.request.readyState == 4) {
		if (this.request.status == 200) {
			this.respText = this.request.responseText;
		}
	}
};
