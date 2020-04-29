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
	String _type = "blue";
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
			href="<%=basePath%>/ltext/datatabletheme.css?t=<%=modifytime%>" />
		<link rel="stylesheet" type="text/css"
			href="<%=basePath%>/style/styleblue/<%=_type %>.css?t=<%=modifytime%>" />
		<link rel="stylesheet" id="ifmisfontstyle" type="text/css"
			href="<%=basePath%>/style/<%=styleName%>?t=<%=modifytime%>" />
		<link rel="stylesheet" type="text/css"
			href="<%=basePath%>/portal/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_LOGO%>_logo.css" />
		<link rel="stylesheet" type="text/css"
			href="<%=basePath%>/portal/style/message.css?t=<%=modifytime%>" />

		<script type="text/javascript"
			src="<%=basePath%>/ltext/frameworksupport.gzjs?t=<%=modifytime%>"></script>
		<script type="text/javascript"
			src="<%=basePath%>/js/ftiens4.js?t=<%=modifytime%>"></script>
			<script type="text/javascript"
			src="<%=basePath%>/js/choose.js?t=<%=modifytime%>"></script>
		<script type="text/javascript"
			src="<%=basePath%>/ltext/ltext_core.js?t=<%=modifytime%>"></script>
		<script type="text/javascript"
			src="<%=basePath%>/js/changescroll.js?t=<%=modifytime%>"></script>
		<script type="text/javascript"
			src="<%=basePath%>/js/loadOcx.js?t=<%=modifytime%>"></script>
		<script type="text/javascript"
			src="<%=basePath%>/js/template/ifmis_position.js?t=<%=modifytime%>"></script>
		
  		<script type="text/javascript"
			src="<%=basePath%>/portal/js/login/portal_logo.js?t=<%=modifytime%>"></script>
		<script type="text/javascript"
			src="<%=basePath%>/portal/js/login/portal_menu.js?t=<%=modifytime%>"></script>
		<script type="text/javascript"
			src="<%=basePath%>/portal/js/login/portal_message.js?t=<%=modifytime%>"></script>
		<script type="text/javascript"
		src="<%=basePath%>/portal/js/login/gsSso.js?t=<%=modifytime%>"></script>
		<title>财政管理一体化信息系统(IFMIS)</title>
<script type="text/javascript">
info_load.public=new Date()-info_load.public;
</script>
<style>
#_menu {
	z-index: 2;
	font-weight: normal;
	color: #000000;
	background-image: url(../../ifmis_images/bg/menu_bg12.gif);
	background-repeat: repeat;
	/*border-top-width: 5px;
	border-top-style: double;
	border-top-color: #B6D1FB;*/
}
#_menu ul {
	margin: 0;
	padding: 0;
	white-space: nowrap;
}
#_menu li {
	list-style-type: none;
	display: inline;
	width: 100px;
	color: #FFFFFF;
}
#_menu li a {
	text-decoration: none;
	font-family: Arial, Helvetica, sans-serif;
	padding: 5px 3px;
	color: #FFFFFF;
}
#_menu li a:hover {
	border: 0;
	color: #FFFF99;
	text-decoration: underline;
}

#_menu li a:visited {
	border: 0;
}

#_menu li a:active {
	border: 0;
	color: #FFFFFF;
}
#_menu ul {
	font-size: 14px;
	line-height: 30px;
}
</style>
</head>
<body style="margin: 0px;padding:0px;">
</body>
</html>
<script type="text/javascript">
function blue() {
	var html = [];
	var _w=document.body.clientWidth
	var _h=document.body.clientHeight-100;
	//logo
	html.push("<div class='top' id='_top' layout={w:{fit:true}} style='height:50px;width:",_w,"px'>");
	html.push("<div id='_logo' style='float:left;height:100%;width:40%'></div>");
	html.push("<div id='_rbutton' style='float:right;height:100%;width:60%'></div></div>");
	//menu
	html.push("<div id='_menu'  layout={w:{fit:true}} style='width:",_w,"px'></div>");
	
	html.push("<div id='hidden_top' class='hidden_top' layout={w:{fit:true}} style='height:8px;width:",_w,"px' align=center><SPAN id=hiddenTopBar class='hiddenTopBar' onclick='_doHiddenTop' title=隐藏上部 >&nbsp;</SPAN></div>");
	html.push("<div id='_main'  layout={w:{fit:true},h:{fit:'auto'}}  style='height:",_h,"px;width:",_w,"px'>");
	html.push("<div id='switchBar' style='float:left;width:160px;height:",_h,"px' class='left_tree' layout={h:{fit:true}}><div id='left_tree' style='float:left;width:160px;height:",_h,"px'  layout={w:{fit:true},h:{fit:true}}></div></div>")
	html.push("<div id='_toleft' style='float:left;width:8px;height:",_h,"px' class='hidden_left' layout={h:{fit:true}}><SPAN id=hideLeftBar class='hiddenLeftBar' title=隐藏左侧树 onclick='_doHiddenLeft' >&nbsp;</SPAN></div>");
	html.push("<div id='center' style='float:right;'  layout={h:{fit:true},w:{fit:'auto'}} style='width:",_w-168,"px;height:",_h,"px'>")
	html.push("<div id='_position' class='your_position' layout={w:{fit:true}} style='height:20px;width:",_w-168,"px'></div>")
	html.push("<div layout={w:{fit:true},h:{fit:'auto'}} style='height:",_h-20,"px'><div  id='main' layout={w:{fit:true},h:{fit:true}}></div></div>")
	html.push("<div id='tree_inner' oncontextmenu='return false;'></div> ")
	html.push("</div>");
	html.push("</div>");
	document.body.innerHTML=html.join('');
}

function gaa(config,service){
		var _menu=document.getElementById('_menu');
		var _totop=document.getElementById('_totop');
		var _position=document.getElementById('_position');
		var _top=document.getElementById('_top');
		var _switchBar=document.getElementById('switchBar');
		//----------------------------------------
		var topmenu;
		//主菜单
		topmenu=new Ext.lt.portal.component.ifmismenu(config,service);
		topmenu.draw(_menu);
		//左侧树
		//var lefttree = Ext.lt.portal.component.ifmistree(config,service);
		//lefttree.draw(document.getElementById("left_tree"));
		var position=new Ext.lt.ifmis.position(config,service);
		position.draw(_position);
	}		

	blue();
	//logo
	Ext.lt.RCP.server('logoserver', "getPortalConfig",  null, function (resp) {
		var _logo=document.getElementById('_logo');
		var _rbutton=document.getElementById('_rbutton');
		var logo=new Ext.lt.portal.component.ifmislogo(resp,'');
		logo.draw(_logo);
		var sysbutton = new Ext.lt.portal.component.sysbutton(resp,'');
		sysbutton.draw(_rbutton);
	},
	function(){});
	//menu
	Ext.lt.RCP.server('menuserver', "getFirstMenu",  null, function (resp) {
		gaa(resp,'');
	},
	function(){});
	//左侧树
    var config = {};
    config.mainmenu = "42000000";
    config.submenu = "";
	Ext.lt.RCP.server('menuserver', "getUserMenus",  config, function (resp) {
		//左侧树
		var lefttree = Ext.lt.portal.component.ifmistree(resp,'');
		lefttree.draw(document.getElementById("left_tree"));
	},
	function(){});
</SCRIPT>
