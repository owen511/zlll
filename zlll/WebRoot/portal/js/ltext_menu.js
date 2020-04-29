//Ext.lt.portal.component.common.IfmisDefaultTitle
if (Ext.lt.portal.component == null) {
	Ext.lt.portal.component = {};
}
Ext.lt.portal.component.menu = new function () {
	this.IfmisDefaultMenu = function (menuinfo,server) {

			var setHtml = "<div id=\"window_top\" ><div id=\"top\" ><div id=\"menu\"><table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tr>";
			if (menuinfo.isshowmenus) {
				setHtml += "<td width=\"20px\" style=\"color:#FFFFFF;\"><img src=\"/images/done_btn/pre.gif\" style=\"cursor:pointer;\" title=\"\u5411\u524d\" onclick=\"showPre()\"/></td>";
			}
			setHtml += "<td> <div id = \"idd\" style=\"overflow:hidden; width:expression(document.body.offsetWidth-40);\"> <ul id=\"m_ul\"><li>\u2506</li> ";
			
			setHtml += menuinfo.menuinfo_tem;
			setHtml += "</ul><div id='panelDiv'>";
			setHtml += "</div>";
			setHtml += "</div></td>";
			if (menuinfo.isshowmenus) {
				setHtml += "<td width=\"20px\"><img src=\"/images/done_btn/next.gif\" style=\"cursor:pointer;\" title=\"\u5411\u540e\" onclick=\"showNext()\"/></td>";
			}
			setHtml += "</tr></table></div></div></div>";
		var retmenupanel = new Ext.Panel({id:"systemmenu",border:0,html:setHtml});
		return retmenupanel;
	};
	this.IfmisLeftMenu = function (config,server) {
	if(config.post != null && config.post != ""){
		if (Ext.getCmp("post_tem") == null) {
			new Ext.Window({title:"通知", width:700, closable :false,height:400,autoScroll:true, layout:"column", plain:true, id:"post_tem", html: "<div style='overflow:scroll;filter:alpha(opacity=90);opacity:5;'>"+config.post+"</div>", buttons:[{text:"确定",width:15, handler:function () {
									Ext.getCmp("post_tem").hide();
									//Ext.lt.template.unmask();
									}}]});
		}
			
			Ext.getCmp("post_tem").show();
			//Ext.lt.template.mask();
			//Ext.getCmp("memorandum_add").lable.hide();
			//Ext.getCmp("memorandum_add").setValue(config.post);
	
	}
		    var setHtml = "<ul class=\"quickmenu_list\" style=\"background:url(../portal/images/quickmenu.gif) no-repeat right bottom;\"> ";
			config.menuinfo_tem = config.menuinfo_tem.replaceAll("┆", " ");
			setHtml += config.menuinfo_tem;
			setHtml += "</ul>";
			var res=new Ext.Panel({id:"lefttreemenu",title:"快捷方式",padding:10,weight:200,height:310,autoScroll:true, html:setHtml});
			res.on('afterlayout',function(panel,layout){
				var left=Ext.getCmp('leftbody');
				if((left.getHeight()-245)<50){
		   			panel.setHeight(50);
		   		}else{
		   			panel.setHeight(left.getHeight()-245);
		   		}
			});
		 return res;
	};
};
//begin 黑龙江单点登陆 楚艳红 2012.08.29
/*******
 * 时间的等待
 * @type Number
 */
var k = 0;
var dd = 100;
var total = 6000;
var cshxxt_time=50;
var sTitle;
var bucode;
var bupassword;
//工资地址及weblogic用户名密码
var url;
var wlgCode;
var wlgPwd
/****
 * 黑龙江单点登录
 * @param {} type【支付、工资、账务】
 */
function portalhljcs(sign,bucodeT,bupasswordT){
    bucode = bucodeT;
    bupassword = bupasswordT;
	if(sign=='hljzhifu'){	
		AppCaller.callApp(sign,'hljzhifu');		
		whilezhifu();
	}
	if(sign=='hljzhangwu'){
		AppCaller.callApp(sign,'hljzhangwu');
		whilezhangwu(bucode,bupassword);
	}
	
}
//支付管理
function whilezhifu(){
	sTitle = "计划管理";
	k += dd;
	if(!AppCaller.setWinVisibl(sTitle,false)){
		if(k<total){
			window.setTimeout("whilezhifu();",dd);
		}
	}else{
		portalhljzhifu()
	}

}
//账务管理
function whilezhangwu(bucode,bupassword){
	sTitle = "账务管理";
	k += dd;

	if(!AppCaller.setWinVisibl(sTitle,false)){
		if(k<total){
			window.setTimeout("whilezhangwu();",dd);
		}
	}else{
		portalhljzhangwu()
	}

}

/******
 * 黑龙江单点登录支付管理
 */
function portalhljzhifu(){
	AppCaller.wait(3000);//暂停300毫秒
	sTitle = "计划管理";
	AppCaller.windowToTop(sTitle);
  	//AppCaller.wait(1500);//暂停300毫秒
  	AppCaller.setWinVisibl(sTitle,true);
 	AppCaller.moveWindow(sTitle,2300,2300);
	AppCaller.simKbInput(bucode);//输入用户编码
	AppCaller.wait(cshxxt_time);
	AppCaller.windowToTop(sTitle);
	AppCaller.simKbInput('\r');//切换到密码
	AppCaller.wait(cshxxt_time);
	AppCaller.windowToTop(sTitle);
	AppCaller.simKbInput(bupassword);//输入密码
	AppCaller.wait(cshxxt_time);
	AppCaller.windowToTop(sTitle)
	AppCaller.simKbInput('\r');//切换到年度
	AppCaller.wait(cshxxt_time);
	//for(var i=0;cshxxtininyear<cshxxtendyear;cshxxtininyear++){
		//AppCaller.sendKeyMsg(40);
		//AppCaller.wait(cshxxt_time);
	//}
	AppCaller.windowToTop(sTitle)
	AppCaller.simKbInput('\r');//切换到登录
	AppCaller.wait(cshxxt_time);
	AppCaller.windowToTop(sTitle)
	AppCaller.simKbInput('\r');//回车
}
/***
 * 黑龙江当点登录账务
 */
function portalhljzhangwu(){
  	sTitle = "账务管理";
	AppCaller.wait(1000);
	//设置窗体初始化状态
	AppCaller.windowToTop(sTitle);
	AppCaller.setWinVisibl(sTitle,false);
	AppCaller.moveWindow(sTitle,2300,2300);
	////切换到用户那里
	AppCaller.wait(cshxxt_time);
	AppCaller.windowToTop(sTitle);
	AppCaller.simKbInput('\t');//切换到密码
	
	AppCaller.wait(cshxxt_time);
	AppCaller.windowToTop(sTitle);
	AppCaller.simKbInput('\t');//切换到密码

	AppCaller.wait(cshxxt_time);
	AppCaller.windowToTop(sTitle);
	AppCaller.simKbInput('\t');//切换到密码

	AppCaller.wait(cshxxt_time);
	AppCaller.windowToTop(sTitle);
	AppCaller.simKbInput('\t');//切换到密码
	

  	//loadAppcaller();
  	AppCaller.wait(cshxxt_time);//暂停300毫秒
	AppCaller.windowToTop(sTitle);
	AppCaller.simKbInput(bucode);//输入用户编码
	AppCaller.wait(cshxxt_time);
	AppCaller.windowToTop(sTitle);
	AppCaller.simKbInput('\t');//切换到密码
	AppCaller.wait(cshxxt_time);
	AppCaller.windowToTop(sTitle);
	AppCaller.simKbInput(bupassword);//输入密码
	AppCaller.wait(cshxxt_time);
	AppCaller.windowToTop(sTitle);
	AppCaller.simKbInput('\t');//切换到回车
	AppCaller.wait(cshxxt_time);
	AppCaller.windowToTop(sTitle);
	AppCaller.simKbInput('\r');//回车	
}

  //begin 工资系统单点登录  楚艳红 2012.09.17
  function gz(urlT,bucodeT,bupasswordT,wlgCodeT,wlgPwdT){
	  url = urlT;
	  bucode = bucodeT;
	  bupassword = bupasswordT;
	  wlgCode = wlgCodeT;
	  wlgPwd = wlgPwdT;
	  window.open(url);
	  window.setTimeout(function(){ portalhljgz();},5000);	
  }
  /*******
   * 黑龙江工资系统
   */
  function portalhljgz(){	
    sTitle = "用户登录";
    var cshxxt_time = 300;
  	AppCaller.wait(cshxxt_time);
   	AppCaller.simKbInput(wlgCode);//输入用户编码
  	AppCaller.wait(cshxxt_time);
  	AppCaller.simKbInput('\t');//切换到密码
  	AppCaller.wait(cshxxt_time);
   	AppCaller.simKbInput(wlgPwd);//输入密码
   	AppCaller.wait(cshxxt_time);
  	AppCaller.simKbInput('\r');//切换到密码
  	AppCaller.wait(1000);
  
  	AppCaller.simDelete(sTitle);
  	AppCaller.wait(cshxxt_time);
  	AppCaller.simKbInput(bucode);
  	AppCaller.simKbInput('\t');
  	AppCaller.wait(cshxxt_time);
  	AppCaller.simKbInput(bupassword);
  	AppCaller.simKbInput('\t');
    AppCaller.wait(cshxxt_time);
  	AppCaller.simKbInput('\t');
  	AppCaller.wait(cshxxt_time);
  	AppCaller.simKbInput('\r');
    	
  }
  //end 工资系统单点登录  楚艳红 2012.09.17
//end 黑龙江单点登陆 楚艳红 2012.08.29
