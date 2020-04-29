<%@ page language="java" contentType="text/html; charset=GBK" import ="gov.mof.fasp.Globals,java.util.*" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>
<%@ page import="java.util.HashMap"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.List"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<%
String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
%>
<META HTTP-EQUIV="pragma" CONTENT="no-cache"/> 
<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache, must-revalidate"/> 
<META HTTP-EQUIV="expires" CONTENT="0"/> 

<title>用户登录</title>

<script type="text/javascript" src="<%=request.getContextPath()%>/js/template.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/prototype.js"></script>
<script language="JavaScript" type="text/javascript">
</script>
</head>
<body >
<form action="/ifmislogin.do" method = "post">
	<input type = 'hidden' name = "taskURL" value = ""/>
	<input type = 'hidden' name = "appCode" value = ""/>
	<input type = 'hidden' name = "appGuid" value = ""/>
	<input type = 'hidden' name = "userGuid" value = ""/>
	<input type = 'hidden' name = "jsessionid" value = ""/>
	<input type = 'hidden' name = "key" value = ""/>
	<input type = 'hidden' name = "pserver" value = "http://192.168.3.15:8002/testifmislogin.do"/>
	<input type = 'submit' value = "登录一体化"></input>
</form>

</body>
<script language="JavaScript" type="text/javascript">

</script>
</html>
