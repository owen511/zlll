<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ page import="gov.mof.fasp.sec.util.SecureUtil"%>
<%@ page import="gov.mof.fasp.ca.user.UserDTO" %>
<%@ page import="java.util.Map"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
			%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
   <script type="text/javascript">
  var _ROOT_PATH_='<%=request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()%>'
  </script>
  <link rel="stylesheet" type="text/css" href="<%=basePath%>/ltext/style/ext-all.css"/> 
  <link rel="stylesheet" type="text/css" href="<%=basePath%>/style/ifmis_style.css"/>
  <link rel="stylesheet" type="text/css" href="<%=basePath%>/style/stylefontL.css"/>
  <link rel="stylesheet" type="text/css" href="<%=basePath%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_LOGO%>_logo.css"/>
  <script type="text/javascript" src="<%=basePath%>/ltext/frameworksupport.gzjs"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/ltext_core.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/ltext_template.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/ltext_portal.js"></script>
  <script type="text/javascript" src="<%=basePath%>/js/template.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/FusionCharts.js"></script>
   <script type="text/javascript" src="<%=basePath%>/js/changescroll2.js"></script>	
  <script type="text/javascript" src="<%=basePath%>/portal/js/onlinehelp/searchquestion.js"></script>
  </head>
  
  <body>
    <input type="button" value="²âÊÔstruts" onclick="a()"><input type='text' id='struts'><br>
     <input type="button" value="²âÊÔÃÅ»§¿ò¼Ücall" onclick="b()"><input type='text' id='call'>
  </body>
</html>
<script type="text/javascript">
function a(){//struts
var pdtPara="code=admin" ;
 //var selectedbillids = 'selectedbillids=' + selectRow+'&auditOpinion='+auditOpinion+'&'+urlmenuparameter;
var url = "/testMsg.do?";
var myAjax = new Ajax.Request(url,
					   	{
						   	 method: 'post',
						   	 parameters: pdtPara,
						   	 requestHeaders: {Accept: 'application/json'},
						   	 onComplete: function(request){
						   	document.getElementById('struts').value=request.responseText;
					 		 }
						} 
	   				); 
}
function b(){//rcp.call
	    var pdtPara = {};
	    pdtPara.usercode = "admin";
		Ext.lt.RCP.server('defaultCommonService', "testMsg",  pdtPara, function (resp) {
			document.getElementById('call').value=resp;
			});

}
</script>
