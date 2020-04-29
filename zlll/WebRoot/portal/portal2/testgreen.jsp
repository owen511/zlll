<%@ page language="java" contentType="text/html; charset=GBK"
	pageEncoding="GBK" buffer="1400k"%>
<jsp:directive.page import="java.util.Map" />
<jsp:directive.page
	import="gov.mof.fasp.ifmis.system.configspace.ConfigElement" />
<%@ taglib uri="/WEB-INF/struts-tiles.tld" prefix="tiles"%>
<%@ page import="gov.mof.fasp.ifmis.common.Globals"%>
<%@ page import="gov.mof.fasp.ifmis.common.JsLoader"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%
  response.setHeader("Cache-Control","no-cache"); 
  response.setHeader("Pragma","no-cache"); 
  response.setDateHeader("Expires",0); 
  String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
			String styleName = "stylefontS.css";
	if (session.getAttribute("StyleName") != null) {
		styleName = (String) session.getAttribute("StyleName");
	}
	long modifytime = JsLoader.modifyTime();
	int clientWidth = JsLoader.getCookieInt(request, "clientWidth");
	if (clientWidth == 0)
		clientWidth = 1020;
	int clientHeight = JsLoader.getCookieInt(request, "clientHeight");
	if (clientHeight == 0)
		clientHeight = 764;
	int windowtopHeight = 120;
	int lefttreeWidth = 160;
	int switchBarWidth = 8;
	int bottomHeight = clientHeight - windowtopHeight;
	int mainWidth = clientWidth - lefttreeWidth - switchBarWidth - 10;
	
	Object type = session.getAttribute("style");
	String _type = "green";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<meta http-equiv="X-UA-Compatible" content="IE=7" />
<title>财政管理一体化信息系统</title>
		<script type="text/javascript">
			var info_load={};
			info_load.publics=[];//每个js/css加载时间  {name:string,time:int};
			info_load.ocxs=[];//每个ojbect(ocx等控件)加载时间  {name:string,time:int};
			info_load.all=new Date();
			var _ROOT_PATH_='<%=basePath%>';
			var ROOT_PATH=_ROOT_PATH_; 
			info_load.ocx=new Date();
		</script>
<OBJECT WIDTH="1" HEIGHT="1" ID="RemoveIEToolbar" 
    CLASSID="CLSID:2646205B-878C-11d1-B07C-0000C040BCDB" codebase="common/flyie.cab#version=1,0,0,0" VIEWASTEXT>
	 <PARAM NAME="ToolBar" VALUE="0">
	 <PARAM NAME="StatusBar" VALUE="1">
	 <PARAM NAME="MenuBar" VALUE="0">    
</OBJECT>
<script type="text/javascript">
			info_load.ocx=new Date()-info_load.ocx;
			info_load.public=new Date();
</script> 
 		 <link rel="stylesheet" type="text/css"
			href="<%=basePath%>/style/styleblue/ifmis_style.css?t=<%=modifytime%>" />
		<link rel="stylesheet" type="text/css"
			href="<%=basePath%>/style/styleblue/<%=_type %>.css?t=<%=modifytime%>" />
		<link rel="stylesheet" type="text/css"
			href="<%=basePath%>/ltext/datatabletheme.css?t=<%=modifytime%>" />
		<link rel="stylesheet" type="text/css"
			href="<%=basePath%>/portal/style/message.css?t=<%=modifytime%>" />

		<script type="text/javascript"
			src="<%=basePath%>/js/ftiens4.js?t=<%=modifytime%>"></script>
		<script type="text/javascript"
			src="<%=basePath%>/js/choose.js?t=<%=modifytime%>"></script>
		<script type="text/javascript"
			src="<%=basePath%>/ltext/frameworksupport.gzjs?t=<%=modifytime%>"></script>
		<script type="text/javascript"
			src="<%=basePath%>/ltext/ltext_core.js?t=<%=modifytime%>"></script>
		<script type="text/javascript"
			src="<%=basePath%>/js/loadOcx.js?t=<%=modifytime%>"></script>
		<script type="text/javascript"
			src="<%=basePath%>/js/template/ifmis_position.js?t=<%=modifytime%>"></script>
		
			
  		<script type="text/javascript"
			src="<%=basePath%>/portal/js/login/portal_logo.js?t=<%=modifytime%>"></script>
		<script type="text/javascript"
			src="<%=basePath%>/portal/js/login/portal_menu.js?t=<%=modifytime%>"></script>
		<script type="text/javascript"
		src="<%=basePath%>/portal/js/login/gsSso.js?t=<%=modifytime%>"></script>
		<title>财政管理一体化信息系统(IFMIS)</title>
<script type="text/javascript">
info_load.public=new Date()-info_load.public;
</script>
</head>
<body style="margin: 0px;padding:0px;">
</body>
</html>
<script type="text/javascript">
function green() {
	var html = [];
	var _w=document.body.clientWidth
	var _h=document.body.clientHeight-100;
	html.push("<div class='top' id='_top' layout={w:{fit:true}} style='height:32px;width:",_w,"px'>");
	html.push("<div id='_logo' style='float:left;height:32px;width:45px;'></div>")
	html.push("<div style='width:",_w-45-80-160,"px;height:32px;float:left' layout={w:{fit:'auto'}}><div id='_menu' style='width:",_w-45-80-160,"px;height:32px;' layout={w:{fit:true}} style='float:left' ></div></div>");
	
	html.push("<div id='_menuscroll' style='float:left;height:32px;width:80px'>");
	html.push("<table width='100%' border='0' cellspacing='0' cellpadding='0'>");
 		html.push("<tr>");
	html.push("<td nowrap='nowrap' class='scrollmenuarea'>");
	html.push("<p title='下一屏菜单' class='nextmenu' onclick='Ext.lt.message.send(\"ifmistopmenu\",\"scroll\",1)' ></p>");
	html.push("<p title='上一屏菜单' class='premenu' onclick='Ext.lt.message.send(\"ifmistopmenu\",\"scroll\",-1)' ></p>");
	html.push("</td>");
	html.push("</tr>");
	html.push("</table>");
	html.push("</div>");
	
	html.push("<div id='_rbutton' style='float:right;height:32px;width:160px'></div>");
	html.push("</div>");
	html.push("<div id='_position' class='your_position' layout={w:{fit:true}} style='height:20px;width:",_w,"px'></div>")
	
	html.push("<div layout={w:{fit:true},h:{fit:'auto'}} style='height:",_h-52,"px;width:",_w,"px'><div style='height:",_h-52,"px;width:",_w,"px' id='main' layout={w:{fit:true},h:{fit:true}}></div></div>")
	html.push("<div id='tree_inner' oncontextmenu='return false;'></div> ")
	document.body.innerHTML=html.join('');
}
function af(config,service){
	var _logo=document.getElementById('_logo');
	var _rbutton=document.getElementById('_rbutton');
	var _menu=document.getElementById('_menu');
	var _position=document.getElementById('_position');
	
	var logo=new Ext.lt.portal.component.ifmislogo(config,service);
	logo.draw(_logo);
	var rbutton=new Ext.lt.portal.component.sysbutton(config,service);
	rbutton.draw(_rbutton);
	//主菜单
	var topmenu=new Ext.lt.portal.component.ifmismenu(config,service);
	topmenu.draw(_menu);
	var position=new Ext.lt.ifmis.position(config,service);
	position.draw(_position);
}

	green();
	Ext.lt.RCP.server('menuserver', "getAllMenu",  null, function (resp) {
		//resp.type = 'green';
		af(resp,'');
	},
	function(){});
</SCRIPT>
