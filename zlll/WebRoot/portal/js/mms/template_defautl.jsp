<%@ page language="java" contentType="text/html; charset=GBK" pageEncoding="GBK"%>
<%
  response.setHeader("Cache-Control","no-cache"); 
  response.setHeader("Pragma","no-cache"); 
  response.setDateHeader("Expires",0); 
  String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
<title>财政管理一体化信息系统</title>
<script type="text/javascript">
var _ROOT_PATH_='<%=basePath%>';
var main_menuid=42000000;
</script>

<link rel="stylesheet" type="text/css" href="<%=basePath%>/style/style.css" />
<link rel="stylesheet" type="text/css" href="<%=basePath%>/ltext/style/ext-all.css"/>
<link rel="stylesheet" type="text/css" href="<%=basePath%>/ltext/style/portal.css"/>

<link rel="stylesheet" type="text/css" href="<%=basePath%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
<link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=basePath%>/style/stylefontS.css" />

<link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=basePath%>/style/<%=session.getAttribute("styleName") %>" />
<link rel="stylesheet" type="text/css" href="<%=basePath%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_LOGO%>_logo.css"/>

  <script type="text/javascript" src="<%=basePath%>/ltext/frameworksupport.js"></script>

  <script type="text/javascript" src="<%=basePath%>/ltext/Portal.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/ltext_core.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/ltext_template.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/ltext_portal.js"></script>
  
  <script type="text/javascript" src="<%=basePath%>/js/template.js"></script>
  <script type="text/javascript" src="<%=basePath%>/js/changescroll2.js"></script>
  <script type="text/javascript" src="<%=basePath%>/js/ftiens4.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/ltext_self.js"></script>
  <style>
        .pp{
	    width:40%;
	    float:left;
	    padding-left:3%;
	    padding-right:3%;
        }
        .fontcolor   {color:#000000}
        .sngPst {
			FONT-SIZE: 12px; COLOR: #000; LINE-HEIGHT: 15px
		}
		.divline{
			BORDER-BOTTOM: #8BA3DA 1px dotted;
		}
.pian{padding:10px}
.x-grid3-row-alt{background-color:red;}


.quickmenu_list{

}
.quickmenu_list li{
height:25px;
font-size:14px;
list-style:none;
cursor:pointer;
vertical-align:bottom;
background:url(../portal/images/5.gif) no-repeat left top;
padding:10px 0 0 25px;
}
.quickmenu_list li a:link{

color:#333;
text-decoration:none;
}
.quickmenu_list li a:active{
color:#333;
}
.quickmenu_list li a:hover{
color:#FF0000;
}
.quickmenu_list li a:visited

</style>
<OBJECT
	  classid="clsid:A3E8EEE9-E85E-472A-AEB3-EB182A605C62"
	  codebase="http://LIUCUNZHOU/AppCallerXControl.ocx#version=1,0,0,0"
	  width="0"
	  height="0"
	  visible="0" 
	  id="AppCaller"
>
    <param name="Visible" value="0">
    <param name="Enabled" value="-1">
    <param name="ParentBackground" value="0">
    <param name="DoubleBuffered" value="0">
    <param name="HideBar" value="0">
</OBJECT>
</head>

<body>
</body>
</html>
<%=request.getAttribute("page_content")%>
<script type="text/javascript" src="<%=basePath%>/portal/js/portalpengding.js"></script>
