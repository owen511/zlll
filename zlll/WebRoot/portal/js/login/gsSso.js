//甘肃
function getSSOUser(param,fun){	
	
	new Ajax.Request( _ROOT_PATH_ +"/portal/ssouser/getssouser.do?cancel=true&random="+Math.random(), 
	{	
		parameters : param,
		method: 'get', 
		onComplete : fun,
		requestHeaders: {Accept: 'application/json'},
		onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
		}
	});
}
function iserror(res){
}
var yszxxt1_time = 1;
function yszxxt1(sign,param){
  	var par=param.split(" ")[0]+"&uid=ifmis";
 	getSSOUser(par,function(resp){
 	 	var json = eval('(' + resp.responseText + ')');
 	 	//alert('预算执行信息系统'+"::::::"+";;"+json.loginname+";"+json.pwd);
 	 	loadAppcaller();
 		AppCaller.openApp('预算执行信息系统',";;"+json.loginname+";"+json.pwd);
 	});
}
var yszxxt2_time = 1;
function yszxxt2(sign,param){
 	var par=param.replace(/ /g, "&");
 	getSSOUser(par,function(resp){
 	 	var json = eval('(' + resp.responseText + ')'); 
 		//alert('预算执行信息系统'+"::::::"+"ZJS001DW;009033;"+json.loginname+";"+json.pwd);
 		loadAppcaller();
 		AppCaller.openApp('预算执行信息系统',"ZJS001DW;009033;"+json.loginname+";"+json.pwd);
 	});
}
var jzzfdw_time = 1;
function jzzfdw(sign,param){
    var par=param.replace(/ /g, "&");
 	getSSOUser(par,function(resp){
 	 	var json = eval('(' + resp.responseText + ')'); 
 	 	//alert('集中支付系统单位版'+"::::::"+json.year+";0;"+json.loginname+";"+json.pwd);
 	 	loadAppcaller();
 	 	AppCaller.openApp('集中支付系统单位版',json.year+";1;"+json.loginname+";"+json.pwd);
 	});
}
function gwkzf(sign,param){
    var par=param.replace(/ /g, "&");
 	getSSOUser(par,function(resp){
 	 	var json = eval('(' + resp.responseText + ')'); 
 	 	//alert('公务卡系统单位版'+"::::::"+json.year+";0;"+json.loginname+";"+json.pwd);
 	 	loadAppcaller();
 	 	AppCaller.openApp('公务卡系统单位版',json.year+";1;"+json.loginname+";"+json.pwd);
 	});
}
function jzzfdws(sign,param){
   	loadAppcaller();
  	AppCaller.openApp('集中支付系统单位版数据下载','2011;1');
}
	var cshxxtlogname;
	var cshxxtlogpwd;
	var cshxxtininyear=2008;
	var cshxxtendyear;
	var k = 0;
	var dd = 100;
	var total = 60000;
function cshxxt(sign,param){
  	sTitle = "用户登录";
  	loadAppcaller();
  	if(!AppCaller.setWinVisibl(sTitle,false)){
  		var url='http://10.88.2.15:9009/systemframe';
  		window.open(url);
  	}
   	var pars=param.split(" ");
   	for(var i=0;i<pars.length;i++){
   		if(pars[i].split("=")[0]=='year'){
   			cshxxtininyear=parseInt(pars[i].split("=")[1]);
   		}
   	}
    var par=param.replace(/ /g, "&");
 	getSSOUser(par,function(resp){
 	 	var json = eval('(' + resp.responseText + ')'); 
 		k=0;
 		cshxxtlogname=json.loginname;
 		cshxxtlogpwd=json.pwd;
 		cshxxtendyear=parseInt(json.year);
  		whileIsTitle();
 	});
}
function whileIsTitle(){
		sTitle = "用户登录";
	  	k += dd;
	  	//loadAppcaller();
  		if(!AppCaller.setWinVisibl(sTitle,false)){
	  		if(k<total){
	  			window.setTimeout("whileIsTitle();",dd);
	  		}
	  	} else {
			cshxxt2();
		}
}
  
  var cshxxt_time=30;
  function cshxxt2(){
  	sTitle = "用户登录";
  	//loadAppcaller();
  	AppCaller.wait(1500);//暂停300毫秒
  	AppCaller.setWinVisibl(sTitle,false);
 	AppCaller.moveWindow(sTitle,2300,2300);
	AppCaller.wait(cshxxt_time);
	AppCaller.setWinVisibl(sTitle,true);
	AppCaller.wait(cshxxt_time);
	AppCaller.windowToTop(sTitle);
	AppCaller.simDelete(sTitle);
	AppCaller.wait(cshxxt_time);
	AppCaller.windowToTop(sTitle);
	AppCaller.simKbInput(cshxxtlogname);//输入用户编码
	AppCaller.wait(cshxxt_time);
	AppCaller.windowToTop(sTitle);
	AppCaller.simKbInput('\t');//切换到密码
	AppCaller.wait(cshxxt_time);
	AppCaller.windowToTop(sTitle);
	AppCaller.simKbInput(cshxxtlogpwd);//输入密码
	AppCaller.wait(cshxxt_time);
	AppCaller.windowToTop(sTitle)
	AppCaller.simKbInput('\t');//切换到年度
	AppCaller.wait(cshxxt_time);
	AppCaller.windowToTop(sTitle);
	for(var i=0;cshxxtininyear<cshxxtendyear;cshxxtininyear++){
		AppCaller.sendKeyMsg(40);
		AppCaller.wait(cshxxt_time);
	}
	AppCaller.windowToTop(sTitle)
	AppCaller.simKbInput('\t');//切换到登录
	AppCaller.wait(cshxxt_time);
	AppCaller.windowToTop(sTitle)
	AppCaller.simKbInput('\r');//回车
  }
  function efmdivop(sign,param){
  	var pars=param.split("|");
  	var par="uid="+pars[2]+"&table="+pars[5];
  	getSSOUser(par,function(resp){
 	 	var json = eval('(' + resp.responseText + ')'); 
 		k=0;
 		var inditext=json.inditext;
 		loadAppcaller();
 		AppCaller.callApp(sign,param.replace(pars[5],inditext));
 	});
  }
  
  //王永迅  2012-08-09 BUG-无 湖南-久其资产单点登录-begin
//begin 湖南久期资产单点登录 修改  楚艳红 2012-09-10
function special(bucode,bupassword,openurl){
		window.open(openurl)
		whilespecial(bucode,bupassword);
}
function whilespecial(bucode,bupassword){
	loadAppcaller();
	var sTitle = "行政事业单位资产管理信息系统 - Microsoft Internet Explorer";
	k += dd;
	if(!AppCaller.setWinVisibl(sTitle,false)){
		if(k<total){
			window.setTimeout(function(){ whilespecial(bucode,bupassword);},dd);
		}
	}else{
		special2(bucode,bupassword)
	}

}
function special2(bucode,bupassword){		
	var sTitle = "行政事业单位资产管理信息系统 - Microsoft Internet Explorer";
	AppCaller.moveWindow(sTitle,-1000,-1000);
	AppCaller.wait(500);
	AppCaller.simKbInput(bucode);//输入用户编码
	AppCaller.simKbInput('\t');//切换到密码
	AppCaller.wait(100);
	AppCaller.simKbInput(bupassword);//输入密码
	AppCaller.simKbInput('\t');//切换到回车
	AppCaller.wait(100);

	AppCaller.simKbInput('\r');//回车
	AppCaller.simKbInput('\r');//回车
	AppCaller.simKbInput('\r');//回车
	AppCaller.simKbInput('\r');//回车
	AppCaller.simKbInput('\r');//回车
	AppCaller.setWinVisibl(sTitle,true);
}
//end 湖南久期资产单点登录 修改  楚艳红 2012-09-10
//王永迅 2012-08-09 BUG-无 湖南-久其资产单点登录-end