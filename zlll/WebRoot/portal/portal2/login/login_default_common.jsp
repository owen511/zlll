<%@ page language="java" contentType="text/html; charset=GBK" pageEncoding="GBK"%>
<%@ page import="gov.mof.framework.util.DBUtil"%>
<%@ page import="gov.mof.fasp.systemset.dto.SystemSetDTO"%>
<%@ page import="gov.mof.fasp.systemset.bpo.ISystemSetService"%>
<%
  response.setHeader("Cache-Control","no-cache"); 
  response.setHeader("Pragma","no-cache"); 
  response.setDateHeader("Expires",0); 
  String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
  //服务端时间
  String severtime=(String)request.getSession().getAttribute("severtime");
  ISystemSetService systemSetService = (ISystemSetService) DBUtil.getBeanByName("fasp.systemset.systemSetBPO");
	boolean ukeycheck = false;
	try{
		SystemSetDTO systemSetDTO = systemSetService.findSystemSetByCode("common_ca_ukey");
		if(systemSetDTO!=null){
			ukeycheck = ("1".equals(systemSetDTO.getParamdata()));
		}
	}catch(Exception e){}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<meta http-equiv="X-UA-Compatible" content="IE=7" />
<title>用户登录</title>
		<script type="text/javascript">
			var info_load={};
			info_load.publics=[];//每个js/css加载时间  {name:string,time:int};
			info_load.ocxs=[];//每个ojbect(ocx等控件)加载时间  {name:string,time:int};
			info_load.all=new Date();
			var _ROOT_PATH_='<%=basePath%>';
			var ROOT_PATH=_ROOT_PATH_; 
			info_load.ocx=new Date();
			var ukeycheck = <%=ukeycheck%>;
		</script>
<OBJECT WIDTH="1" HEIGHT="1" ID="RemoveIEToolbar" 
    CLASSID="CLSID:2646205B-878C-11d1-B07C-0000C040BCDB" codebase="common/flyie.cab#version=1,0,0,0" VIEWASTEXT>
	 <PARAM NAME="ToolBar" VALUE="0">
	 <PARAM NAME="StatusBar" VALUE="1">
	 <PARAM NAME="MenuBar" VALUE="0">    
</OBJECT>
<%if(ukeycheck){%>
	<object  id="ocxukey" classid="clsid:CC9AB409-D49F-4574-B07C-DD316E3114AD"  style="display:none">
	</object>
<%}%>
 <%
  String is_ca=request.getSession().getAttribute("isportalca")!=null?(String)request.getSession().getAttribute("isportalca"):"false";
  if("true".equals(is_ca)){
 %>
    <object classid="clsid:707C7D52-85A8-4584-8954-573EFCE77488"
    	id="JITDSignOcx" width="0" codebase="<%=basePath%>/JITDSign.cab#version=2,0,24,13"></object>
 <%
  }
 %>

  	<%  
  	//页面编码
	String configs1=request.getSession().getAttribute("indexjsp")!=null?(String)request.getSession().getAttribute("indexjsp"):"";
	if(configs1.indexOf("16")!=-1){
	%>
 		<OBJECT classid="clsid:68DBACA2-CB2A-4C0E-9375-E17A2C56A643" id="FTCtrl"></object>
 		<OBJECT id="iTrusPTA" codeBase="<%=basePath%>/portal/PTADLL/iTrusPta.cab#version=2.4.2.471" classid="clsid:1E0DFFCF-27FF-4574-849B-55007349FEDA">
		</OBJECT>
 	<% }else if (configs1.indexOf("19")!=-1){%>
 		<OBJECT id="iTrusPTA" codeBase="<%=basePath%>/portal/PTADLL/iTrusPta.cab#version=2.4.2.471" classid="clsid:1E0DFFCF-27FF-4574-849B-55007349FEDA">
		</OBJECT>
 	<%} else if(configs1.indexOf("6")!=-1&&is_ca.indexOf("true")!=-1){%>
 		 <OBJECT classid="clsid:68DBACA2-CB2A-4C0E-9375-E17A2C56A643" id="FTCtrl"></OBJECT>
 		 <OBJECT ID="CASecurityClient" CLASSID="CLSID:F8119DB1-73CB-49F7-8559-2B5EDD869D2A" style="LEFT: 0px; WIDTH: 1px; TOP: 0px; HEIGHT: 1px" height="1"
			width="1" CODEBASE="<%=basePath%>/portal/cyca/SDCASecurityClient.dll#version=1,0,0,2"></OBJECT>
 		
 	<% }else if (configs1.indexOf("28")!=-1){%>
 		  <link rel="stylesheet" type="text/css" href="<%=basePath%>/portal/style/cq_login.css"/>
 	<%}else if (configs1.indexOf("31")!=-1){%>
	  <link rel="stylesheet" type="text/css" href="<%=basePath%>/portal/style/sx_login.css"/>
	<%}
 	//是否使用压缩格式的css js
  	String isCompression = (String)request.getSession().getAttribute("isCompression")+"";
  	 //System.out.println(isCompression);
  	
    if(("1").equals(isCompression)){
  	%>
  	<link rel="stylesheet" type="text/css" href="<%=basePath%>/ltext/style/ext-all.gzcss"/> 
	<script type="text/javascript" src="<%=basePath%>/ltext/frameworksupport.gzjs"></script>
  	<%
  }else {
  	%>
  	<link rel="stylesheet" type="text/css" href="<%=basePath%>/ltext/style/ext-all.css"/> 
  	<script type="text/javascript" src="<%=basePath%>/ltext/frameworksupport.js"></script>
  	<%
  }
 	%>
<script type="text/javascript">
			info_load.ocx=new Date()-info_load.ocx;
			info_load.public=new Date();
		</script>
<script> 
if(document.all){
   window.moveTo(0,0);
   top.window.resizeTo(screen.availWidth,screen.availHeight);   
}
</script>

<script type="text/javascript">
var _ROOT_PATH_='<%=basePath%>';
</script>
  <link rel="stylesheet" type="text/css" href="<%=basePath%>/ltext/style/portal.css"/>
  <link rel="stylesheet" type="text/css" href="<%=basePath%>/ltext/datatabletheme.css"/>
  <link rel="stylesheet" type="text/css" href="<%=basePath%>/portal/style/portallogin.css"/>
  <script type="text/javascript" src="<%=basePath%>/ltext/ltext_core.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/ltext_template.js"></script>
  <script type="text/javascript" src="<%=basePath%>/js/template.js"></script>
  <script type="text/javascript" src="<%=basePath%>/portal/js/helpContent.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/FusionCharts.js"></script>
  <script type="text/javascript" src="<%=basePath%>/js/loadOcx.js"></script> 
  <script language="JavaScript" type="text/javascript">
<!--	window.status="Copyright&copy; 2008 Longtu Software Co.,Ltd.All rights reserved."--> 
	
</script>
<script type="text/javascript">
info_load.public=new Date()-info_load.public;
</script>
</head>

<body id='id1' style="background:#C1C1C1 url(../../ifmis_images/login/20090930/body_bg.jpg) repeat-x left top; background-position:0 1px;" >
</body>
</html>

<%=request.getAttribute("page_content")%>
<script type="text/javascript">
info_load.all=new Date()-info_load.all;
function sertimeclitime(){
	try{
		var servertime='<%=severtime%>';
		servertime=parseInt(servertime);
		//获取客户端时间
		var localtime=new Date();
		var clitime=localtime.getYear()+''+(localtime.getMonth() + 1)+''+localtime.getDate();
		clitime=parseInt(clitime);
		var chatime=servertime-clitime;
		chatime=parseInt(chatime);
		if(chatime<0){
			chatime=parseInt(-(chatime));
		}
		if(chatime>=1){
			document.getElementById("errorMessage").innerHTML='客户端时间与服务器时间相差24小时，请调整';
		}
	}catch(e){}
}
sertimeclitime();
</script>
