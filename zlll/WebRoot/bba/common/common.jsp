<%@page import="gov.mof.fasp.sec.util.SecureUtil"%>
<%@page import="gov.mof.fasp.ca.user.UserDTO"%>
<%@page contentType="text/html; charset=GBK"%>
<%@taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path;
	String mainmenu = request.getParameter("mainmenu");
	String submenu = request.getParameter("submenu");
	String menu = "mainmenu=" + mainmenu + "&submenu=" + submenu;
	String selectedTabIndex = request.getParameter("selectedTabIndex");
	if (null == selectedTabIndex) {
		selectedTabIndex = "0";
	}
%>
<style>
	.bbaClass{
		color:red;
	}
</style>
<script type="text/javascript">
var basePath='<%=basePath%>';
var mainmenu=<c:out value="${param.mainmenu}"/>;
var submenu=<c:out value="${param.submenu}"/>;
var commonMenu='mainmenu='+mainmenu+'&submenu='+submenu;
var selectedTabIndex=<%=selectedTabIndex%>;
var sourceJson = <%=request.getAttribute("sourcesJson")%>;
var detailJson = <%=request.getAttribute("detailsJson")%>;
var mainJson = <%=request.getAttribute("mainJson")%>;
var secdetailJson = <%=request.getAttribute("secdetailJson")%>;
var json = <%=request.getAttribute("json")%>;
var isAddPage = true;// 是否新增页 true-是、false-否
var isIndex = false;
var operator="save";
</script>
<script type="text/javascript" src="<%=basePath%>/bba/js/common.js"></script>
<script type="text/javascript" src="<%=basePath%>/bba/js/number.js"></script>