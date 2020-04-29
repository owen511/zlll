<%@ page language="java" contentType="text/html; charset=GBK" pageEncoding="GBK"%>
<%
  response.setHeader("Cache-Control","no-cache"); 
  response.setHeader("Pragma","no-cache"); 
  response.setDateHeader("Expires",0); 
  String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
			//System.out.println("这个jsp");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META HTTP-EQUIV="pragma" CONTENT="no-cache"/> 
<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache, must-revalidate"/> 
<META HTTP-EQUIV="expires" CONTENT="0"/> 
<meta http-equiv="X-UA-Compatible" content="IE=7" />
<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
<title>默认标题</title>
		<script type="text/javascript">
			var info_load={};
			info_load.publics=[];//每个js/css加载时间  {name:string,time:int};
			info_load.ocxs=[];//每个ojbect(ocx等控件)加载时间  {name:string,time:int};
			info_load.public=new Date();
			info_load.all=new Date();
			var _ROOT_PATH_='<%=basePath%>';
		</script>
<link rel="stylesheet" type="text/css" href="<%=basePath%>/style/ifmis_style.css"/> 
<link rel="stylesheet" type="text/css" href="<%=basePath%>/ltext/style/ext-all.css"/>
<link rel="stylesheet" type="text/css" href="<%=basePath%>/ltext/style/portal.css"/>
<link rel="stylesheet" type="text/css" href="<%=basePath%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
<link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=basePath%>/style/stylefontS.css" />
<link rel="stylesheet" type="text/css" href="<%=basePath%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_LOGO%>_logo.css"/>
  <script type="text/javascript" src="<%=basePath%>/ltext/frameworksupport.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/ltext_core.js"></script>  
  <script type="text/javascript" src="<%=basePath%>/ltext/ltext_template.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/ltext_portal.js"></script>
  <script type="text/javascript" src="<%=basePath%>/portal/js/ltext_portal.js"></script>
    <script type="text/javascript" src="<%=basePath%>/portal/js/ltext_login.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/componentview/console.js"></script>
   <script type="text/javascript" src="<%=basePath%>/ltext/FusionCharts.js"></script>
   <script type="text/javascript" src="<%=basePath%>/js/loadOcx.js"></script> 
  <script type="text/javascript" src="<%=basePath%>/js/template.js"></script>
  <script type="text/javascript" src="<%=basePath%>/js/choose.js"></script>
  <script type="text/javascript" src="<%=basePath%>/js/changescroll2.js"></script>
  <script type="text/javascript" src="<%=basePath%>/js/ftiens4.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/ltext_self.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/datatable3.0.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/data.js"></script>
  <style>
    .gg{color: black;text-decoration:none}
	.gg:hover{color:#800080 ;text-decoration:none;}
	.gg:visited{color:#800080 ;text-decoration:none;}
	.gg:active{color:#800080 ;text-decoration:none;}
	.STYLE12 {
		color: #000000;
		font-family: "宋体";
		font-size: 12px;
		font-weight:normal;
	}
  	 .x-panel-header {
  		overflow:hidden;
	    zoom:1;
	    padding:5px 3px 4px 5px;
	    border:1px solid;
	    line-height: 15px;
	    background:url(../../portal/images/mhtitle.gif) no-repeat left top;
  	}
  	
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

.quickmenu_list{

}
.quickmenu_list li{
height:25px;
font-size:12px;
list-style:none;
cursor:pointer;
vertical-align:bottom;
background:url(../ifmis_images/6.png) no-repeat left top;
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
		<script type="text/javascript">
			info_load.public=new Date()-info_load.public;
			info_load.ocx=new Date();
		</script>
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
<script type="text/javascript">
			info_load.ocx=new Date()-info_load.ocx;
		</script>
</head>

<body id='id1' style="background-color:#40D0E8;">

</body>
</html>
<%=request.getAttribute("page_content")%>
<script type="text/javascript">
info_load.all=new Date()-info_load.all;
</script>