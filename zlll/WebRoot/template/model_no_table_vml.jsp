<%@ page language="java" contentType="text/html; charset=GBK"
	pageEncoding="GBK"%>
<jsp:directive.page import="java.util.Map"/>	
<%@ taglib uri="/WEB-INF/struts-tiles.tld" prefix="tiles" %>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>
<%
	response.setHeader("Cache-Control","no-cache"); 
	response.setHeader("Pragma","no-cache"); 
	response.setDateHeader("Expires",0); 
  
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
			
%>
<HTML xmlns:fc xmlns:v="urn:schemas-microsoft-com:vml">
<head>

<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<title>
    <tiles:insert attribute="title" />
</title>	
<object classid="clsid:0B7A9F67-EB6F-42B4-847B-E4A451E276F6" id=WebPrinter codebase="<%=basePath%>/common/JQezPrinter.ocx#version=1.0.0.0"></object>
<OBJECT WIDTH="1" HEIGHT="1" ID="RemoveIEToolbar" 
    CLASSID="CLSID:2646205B-878C-11d1-B07C-0000C040BCDB" codebase="<%=basePath%>/common/flyie.cab#version=1,0,0,0" VIEWASTEXT>
	 <PARAM NAME="ToolBar" VALUE="0">
	 <PARAM NAME="StatusBar" VALUE="1">
	 <PARAM NAME="MenuBar" VALUE="0">     
</OBJECT>
<link rel="stylesheet" type="text/css" href="barmenu.css">
<STYLE>
		 .userData{behavior:url(#default#userData);}
			@import url( editor.css );
			@media All { v\:* { BEHAVIOR: url(#default#VML) }}
</STYLE>
<script src="editor.js"></script>
<script src="events.js"></script>
<script src="loadreport.js"></script>
<script src="adjust.js"></script>
<script src="selrange.js"></script>
<script src="insrow.js"></script>
<script src="fontcolor.js"></script>
<script src="csjsrequest.js"></script>
<script src="fcpub.js"></script>
<script src="base.js"></script>
<script src="extend.js"></script>
<script type="text/javascript">
var linkvchtypeid = '<%=request.getAttribute("linkvchtypeid")%>';
var ROOT_PATH = '<%=basePath%>';
String.prototype.trim = function(){
	return this.replace(/(^\s*)|(\s*$)/g,"");
}
//获取Code全局变量
 var codeShowConfigs = new Array();
 var codeShowConfigs_ =<%=request.getAttribute("CODESHOWCONFIG") %> ;
 if(codeShowConfigs_ != null){
   codeShowConfigs = codeShowConfigs_;
 }
  //系统CODE配置参数
 var codeShowFlag =<%=request.getAttribute("CODESHOWFLAG") %> ;
</script>
</head>
<BODY bgcolor="#d4d0c8" onLoad="return window_onload()" onbeforeunload="return window_onbeforeunload()"
    onresize="window_onresize()" topmargin="0" leftmargin="0" style="overflow:hidden;">
<div id ="context">
<tiles:insert attribute="main"/>
<div class="bottomdiv">&nbsp;</div> 
</div> 
</body>
</html>
