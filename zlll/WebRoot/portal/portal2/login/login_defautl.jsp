<%@ page language="java" contentType="text/html; charset=GBK" pageEncoding="GBK"%>
<!-- 测试门户登录首页客户端及服务端加载时间 -->
<script type="text/javascript">var startTime = new Date().getTime();</script>
<%
  response.setHeader("Cache-Control","no-cache"); 
  response.setHeader("Pragma","no-cache"); 
  response.setDateHeader("Expires",0); 
  String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();


%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=7" />
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title>用户登录123</title>
		<script type="text/javascript">
			var info_load={};
			info_load.publics=[];//每个js/css加载时间  {name:string,time:int};
			info_load.ocxs=[];//每个ojbect(ocx等控件)加载时间  {name:string,time:int};
			info_load.all=new Date();
			var _ROOT_PATH_='<%=basePath%>';
			info_load.ocx=new Date();
		</script>
<OBJECT WIDTH="1" HEIGHT="1" ID="RemoveIEToolbar" 
    CLASSID="CLSID:2646205B-878C-11d1-B07C-0000C040BCDB" codebase="common/flyie.cab#version=1,0,0,0" VIEWASTEXT>
	 <PARAM NAME="ToolBar" VALUE="0">
	 <PARAM NAME="StatusBar" VALUE="1">
	 <PARAM NAME="MenuBar" VALUE="0">    
</OBJECT>

 
<object classid="clsid:707C7D52-85A8-4584-8954-573EFCE77488"
	id="JITDSignOcx" width="0" codebase="./JITDSign.cab#version=2,0,24,13"></object>
<script type="text/javascript">
			info_load.ocx=new Date()-info_load.ocx;
			info_load.public=new Date();
		</script>
<style>
  #login_button {
	border: 0px;
	text-align: center;
	padding-top: 3px;
	width: 70px;
	height: 20px;
	background-image: url(../../images/buttons/login_button.gif);
  }
  .download{
z-index:10; 
position:absolute; 
top:0;
right:0; 
background-image:url(../images/login/download.gif); 
height:128px; 
width:128px; 
background-repeat:no-repeat; 
color:#FFF; 
font-size:14px; 
cursor:pointer;
filter:alpha(opacity=100);-moz-opacity:0.8;
line-height:128px;
font-weight:bold;
text-align:center;
}
.download_over{
z-index:10; 
position:absolute; 
top:0;
right:0; 
background-image:url(../images/login/download.gif); 
height:128px; 
width:128px; 
background-repeat:no-repeat; 
color:#FFF; 
font-size:14px; 
cursor:pointer;
filter:alpha(opacity=80);-moz-opacity:0.8;
line-height:128px;
font-weight:bold;
text-align:center;
}
.download a:link{color:#FFF; text-decoration:none;}
.download a:visited{color:#FFF; text-decoration:none;}
.download a:hover{color:#FFF; text-decoration:none;}
.download a:active{color:#FFF; text-decoration:none;}
</style>
  
  <link rel="stylesheet" type="text/css" href="<%=basePath%>/extstyle/portal.css"/>
  <link rel="stylesheet" type="text/css" href="<%=basePath%>/ltext/style/ext-all.gzcss"/> 
 <script type="text/javascript" src="<%=basePath%>/ltext/frameworksupport.gzjs"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/ltext_core.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/Portal.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/ltext_template.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/ltext_portal.js"></script>
  <script type="text/javascript" src="<%=basePath%>/js/template.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/FusionCharts.js"></script>
  <script type="text/javascript" src="<%=basePath%>/js/loadOcx.js"></script> 
  <script language="JavaScript" type="text/javascript">
	window.status="Copyright&copy; 2008 Longtu Software Co.,Ltd.All rights reserved." 
</script>
<script type="text/javascript">
info_load.public=new Date()-info_load.public;
</script>
</head>

<body id="id1" style="">
</body>
</html>
<%=request.getAttribute("page_content")%>
<script type="text/javascript">
info_load.all=new Date()-info_load.all;
</script>
<!-- 测试门户登录首页客户端及服务端加载时间 -->
<script type="text/javascript">var endTime = new Date().getTime();var subTime = endTime - startTime;var subTimeS = '<%=request.getAttribute("subTime")%>';  var csTime = "浏览器端加载时间：" + subTime + " 服务端加载时间：" + subTimeS;</script>