<%@ page language="java" contentType="text/html; charset=gbk"
	pageEncoding="gbk"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>

<%
String path = request.getContextPath();
String basePath = request.getScheme() + "://"
		+ request.getServerName() + ":" + request.getServerPort()
		+ path;
%>
<script type="text/javascript">
var responseText = '<%=request.getAttribute("statuCode")%>';
var backUrl = '<%=request.getAttribute("backUrl")%>';
var warnmsg = '<%=request.getAttribute("warnmsg")%>'
alert(warnmsg);
window.location.href = backUrl;
</script>
