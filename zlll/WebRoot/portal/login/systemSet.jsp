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
<meta http-equiv="Content-Type" content="text/html; charset=GB2312" />
<style type="text/css">
	.pop_body{
	font-size: 14px;
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
  <TITLE>客户端环境设置</TITLE>
<link rel="stylesheet" type="text/css" href="<%=basePath%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
 </head>

 <body class="pop_body" >
   <div id="popPage"><div id="shenhe_title"><div id="shenhe_title_middle"></div></div>
   <div id="content">
<div class="title">[系统支持环境]</div>
<div class="list">
<ui>
<li>操作系统:Windows XP/Vista/7</li>
<li>浏览器:IE 6/7/8</li>
</ui>
</div>
<br><br>
<div class="title">[设置说明]</div>
<div class="list">
<ui>
<li><div class="list_title">浏览器设置</div>	 请点击“<a href="<%=basePath%>/system/setIE/create.do"  target="_blank">浏览器设置</a>”，并在弹出的窗口中选择"运行"，系统提示注册表修改成功后，关闭所有浏览器窗口，重新登录生效。</li>
<li><div class="list_title">系统相关插件下载</div>	请关闭所有杀毒软件以及防火墙，然后选择下载地址进行下载并安装。</li>
</ui>
</div>
<br>
<br>
<div class="title">[相关下载]</div>
<div class="list">
 
 <div>1.<a href="<%=basePath%>/system/setIE/create.do" onclick=""  target="_blank">浏览器设置</a></div>
<div>2.系统相关插件<div id="address" style="margin-left:13px;margin-top:2px">下载地址：<div style="margin-top:5px">
<%
if(Globals.IFMIS_DOWNURL.indexOf(";")!=-1){ 
 String[] url=Globals.IFMIS_DOWNURL.split(";");
 for(int i=0;i<url.length;i++){
%>
<a href="<%=url[i]%>" onclick=""  target="_blank">地址<%=i+1%></a>&nbsp&nbsp
<%}
}else if(Globals.IFMIS_DOWNURL!=""&&Globals.IFMIS_DOWNURL.indexOf(";")==-1){
%>
<a href="<%=Globals.IFMIS_DOWNURL%>" onclick=""  target="_blank">地址1</a>&nbsp&nbsp
<%
}%>
</div></div></div>
<br>
</div>
</div>
 </div>
 </body>
</html>
