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
  <TITLE>�ͻ��˻�������</TITLE>
<link rel="stylesheet" type="text/css" href="<%=basePath%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
 </head>

 <body class="pop_body" >
   <div id="popPage"><div id="shenhe_title"><div id="shenhe_title_middle"></div></div>
   <div id="content">
<div class="title">[ϵͳ֧�ֻ���]</div>
<div class="list">
<ui>
<li>����ϵͳ:Windows XP/Vista/7</li>
<li>�����:IE 6/7/8</li>
</ui>
</div>
<br><br>
<div class="title">[����˵��]</div>
<div class="list">
<ui>
<li><div class="list_title">���������</div>	 ������<a href="<%=basePath%>/system/setIE/create.do"  target="_blank">���������</a>�������ڵ����Ĵ�����ѡ��"����"��ϵͳ��ʾע����޸ĳɹ��󣬹ر�������������ڣ����µ�¼��Ч��</li>
<li><div class="list_title">ϵͳ��ز������</div>	��ر�����ɱ������Լ�����ǽ��Ȼ��ѡ�����ص�ַ�������ز���װ��</li>
</ui>
</div>
<br>
<br>
<div class="title">[�������]</div>
<div class="list">
 
 <div>1.<a href="<%=basePath%>/system/setIE/create.do" onclick=""  target="_blank">���������</a></div>
<div>2.ϵͳ��ز��<div id="address" style="margin-left:13px;margin-top:2px">���ص�ַ��<div style="margin-top:5px">
<%
if(Globals.IFMIS_DOWNURL.indexOf(";")!=-1){ 
 String[] url=Globals.IFMIS_DOWNURL.split(";");
 for(int i=0;i<url.length;i++){
%>
<a href="<%=url[i]%>" onclick=""  target="_blank">��ַ<%=i+1%></a>&nbsp&nbsp
<%}
}else if(Globals.IFMIS_DOWNURL!=""&&Globals.IFMIS_DOWNURL.indexOf(";")==-1){
%>
<a href="<%=Globals.IFMIS_DOWNURL%>" onclick=""  target="_blank">��ַ1</a>&nbsp&nbsp
<%
}%>
</div></div></div>
<br>
</div>
</div>
 </div>
 </body>
</html>
