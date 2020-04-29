<%@page language="java" contentType="text/html; charset=GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%
	response.setHeader("Cache-Control", "no-cache");
	response.setHeader("Pragma", "no-cache");
	response.setDateHeader("Expires", 0);
	String rootPath = request.getContextPath();
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 6.0 Transitional//EN">
<html xmlns="http://www.w3.org/1999/xhtml">
	<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
	<head>
		<title>请选择文件</title>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<script>
			window.close();
			var queryform = window.opener.document.getElementById("queryform");
			window.opener.document.getElementById("error").value = '<%=request.getAttribute("error")%>';
			window.opener.document.getElementById("totalnum").value = '<%=request.getAttribute("totalNum")%>';
			window.opener.document.getElementById("filepath").value = '<%=request.getAttribute("filepath")%>';
			window.opener.document.getElementById("filename").value = '<%=request.getAttribute("filename")%>';
			queryform.action = "<%=request.getContextPath()%>/common/queryimportdata.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>&vchtypeid=<c:out value="${param.vchtypeid}"/>&vchflagStr=<c:out value="${param.vchflagStr}"/>";	
			queryform.submit();
		</script>
	</head>

	<body>
		<input id="vchtypeid" name="vchtypeid" type="hidden" value="<c:out value='${vchtypeid}'/>">
	</body>
</html>
