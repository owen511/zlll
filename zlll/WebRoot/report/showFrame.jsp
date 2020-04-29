<%@page language="java" import="java.util.*,"
	contentType="text/html; charset=GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%
	//report/show_result.do?reportcode=pay_004
	String rootPath = request.getContextPath();
	String reportcode = request.getParameter("reportcode").trim();
	String allcolumns=request.getParameter("allcolumns");
	if(allcolumns==null)
	{
	    allcolumns = null;
	}
	String addremark=request.getParameter("addremark");
	if(addremark==null){
		addremark="false";
	}
	
%>
<script type="text/javascript" src="<%=rootPath%>/js/jquery-1[1].3.1.js"></script>	
<script type="text/javascript">
function reSetIframe(){ 
	var iframe = document.getElementById("iframeId"); 
	try{ 
		var bHeight = iframe.contentWindow.document.body.scrollHeight; 
		var dHeight = iframe.contentWindow.document.documentElement.scrollHeight; 
		var height = Math.max(bHeight, dHeight); 
	    iframe.height = height; 
	    
	    var bWidth = iframe.contentWindow.document.body.scrollWidth; 
		var dWidth = iframe.contentWindow.document.documentElement.scrollWidth; 
		var width = Math.max(bWidth, dWidth); 
	    iframe.width = width; 
	}catch (ex){} 
	} 
</script>

<body class="mainbody">

<IFrame name="actionFrm" id="iframeId" width="100%"  height="90%" onload="reSetIframe()" scrolling="no" 
      src="<%=rootPath%>/report/show_result.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>&reportcode=<%=reportcode%>&inframe=1&allcolumns=<%=allcolumns%>&addremark=<%=addremark%>">
</IFrame>
<div id="customDiv"></div>
</body>
