<%@ page language="java" import="java.util.*,java.text.*"
	pageEncoding="GBK"%>
<%
    	
    response.setHeader("Cache-Control","no-cache"); 
    response.setHeader("Pragma","no-cache"); 
    response.setDateHeader("Expires",0); 
  
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path;
%>
<OBJECT
	  classid="clsid:A3E8EEE9-E85E-472A-AEB3-EB182A605C62"
	  codebase="AppCaller.cab#version=1,0,0,0"
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

<script language="text/javascript">
  AppCaller.initIE();
</script>

<script type="text/javascript" src="<%=basePath%>/ltrptapp/js/rptapputil.js"></script>


