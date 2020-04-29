
<%@ page language="java" contentType="text/html; charset=GBK" pageEncoding="GBK"%>
<%@ page import="java.io.*,java.util.*" %>
<%@ page import="gov.mof.fasp.ifmis.common.Globals" %>
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
 <script type="text/javascript" src="<%=basePath%>/js/jquery-1[1].3.1.js"></script>	
    <script type="text/javascript" src="<%=basePath%>/js/choose.js"></script>
  <script type="text/javascript">
 //  var tmpObj=window.dialogArguments;
//避免使用unonload事件导致刷新也关闭窗口，使用onbeforeunload by jzy
var id2 ="<%=request.getParameter("id")%>";
window.onbeforeunload=function(){
	getTips();
} 
/**
 * 关闭窗口
 */
 function getTips(){
 //window.returnValue = 'true';
 if(document.getElementById('tips').checked==true){
 	setCookie("notips_"+id2,"yes",1);
 }
 window.close();
 }
 
 function refreshParent(){
  	if(document.getElementById('tips').checked==true){
 		setCookie("notips_"+id2,"yes",1);
 	}
 	window.opener.location = window.opener.location;
 	 window.opener=null;
     window.close();
 }
 /**
 * 得到超链接参数
 * @param name 参数名称
 */
function getUrlParam(url,name)
{
	var r;
	var reg = new RegExp("(^|&|\\?)"+ name +"=([^&]*)(&|$)");
	if (r=url.match(reg))
	{
		return unescape(r[2]);
	} 
	return null;
}
  </script>
<meta http-equiv="Content-Type" content="text/html; charset=GB2312" />
<style type="text/css">
	.pop_body{
	font-size: 13px;
	font-weight: normal;
	}
   #content a {
      text-decoration: none;
      color: red;}
   #content{
   height:400px;
   margin-top:10px;
   margin-left:20px;
   margin-right:10px;
   }
   .title{
   font-size:14px;
   color:blue;
   }
   .list{
   padding-top:5px;
   }
   .list_title{
   font-size:14px;
   }
</style>
  <TITLE>控件安装提示</TITLE>
<link rel="stylesheet" type="text/css" href="<%=basePath%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
 </head>

 <body class="pop_body" >
   <div id="popPage"><div id="shenhe_title"><div id="shenhe_title_middle"></div></div>
   <div id="content">
   检测到您没有安装本站需要的相关控件，请您按照以下步骤进行操作：<br><br>1. 请根据IE弹出提示安装系统所需控件。<br><br>
   2. 如果没有任何提示，请点击“<a href="<%=basePath%>/system/setIE/create.do"  target="_blank">一键设置IE</a>”修改IE设置，并在弹出的窗口中选择"运行"，系统提示注册表修改成功后，关闭所有浏览器窗口，重新登录生效。
   <br><br>
   3. 安装完成后，请在关闭本窗口后按F5或者手动刷新页面。<a href="#" onclick="refreshParent();">刷新</a>或者<a href="#" onclick="getTips();">关闭本窗口</a>。<br><br>
     <font color = "red">*</font> 您可以随时在系统右上角的<img src="<%=basePath%>/ifmis_images/systemSet.png">中完成一键设置IE。
 <br><br><br><div><input type="checkbox" id="tips" value="false" /> 今天不再提示</div>
 </div>
<object id = "<%=request.getParameter("id")%>"  classid='clsid:<%=request.getParameter("classid")%>' codebase="<%=request.getParameter("codebase")%>"></object>
 </body>
</html>
