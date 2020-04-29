<%@ page language="java" contentType="text/html; charset=GBK"
	pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%
String rootPath = request.getContextPath();
com.jiuqi.ezReport.output.HTMLReportGenerator htmlRptgen = (com.jiuqi.ezReport.output.HTMLReportGenerator)request.getAttribute("htmlRptgen");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GBK" />

<title>Insert title here</title>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/prototype.js"></script>
<script type="text/javascript">
var ROOT_PATH = '<%=request.getContextPath()%>';
String.prototype.trim = function(){
	return this.replace(/(^\s*)|(\s*$)/g,"");
}
</script>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<link href="/style/ifmis_style.css" rel="stylesheet" type="text/css" />
	<link href="/style/styleFontS.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=rootPath%>/style/calendar.css"/>
<script type="text/javascript" src="<%=rootPath%>/js/choose.js"></script>
<script type="text/javascript" src="<%=rootPath%>/ltext/ltext_core.js"></script>
<script type="text/javascript" src="<%=rootPath%>/js/loadOcx.js"></script>
<script type="text/javascript" src="<%=rootPath%>/js/changescroll.js"></script>
<script type="text/javascript" src="<%=rootPath%>/js/calendar.js"></script>
<script src="<%=request.getContextPath()%>/js/datatable.js"></script>
<script src="<%=request.getContextPath()%>/js/JQWebTableViewClass.js"></script>
   <style>
       <%=htmlRptgen.getCellStyles()%>
   </style>
   <script>
 //系统报表组件是否允许自动安装
 var rptOcxIsAuto =<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_RPTOCXAUTO%>;
   </script>
</head>
<body>

<form id=queryform action="<%=request.getContextPath() %>/report/showreport.do?rptid=<c:out value="${param.rptid}"/>&mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>" method="post">
<ui:reportqueryform formid="queryform" report="report"/>
</form>
<input type="button" value="打印" onclick="printTable()">

<div id="divName" style='width:expression(document.body.offsetWidth-document.body.leftMargin-document.body.rightMargin-10);height:expression(parseInt(document.body.offsetHeight)-parseInt(document.body.topMargin)-parseInt(document.body.bottomMargin)-50)'>
   <table id="reportTable" width="<%=htmlRptgen.getTableWidth()%>" height="<%=htmlRptgen.getTableHeight()%>">
       <%=htmlRptgen.generate()%>
   </table>
</div>
</body>
</html>
<script type="text/javascript">
       function onwinload(){
               if(typeof(divName)=="undefined") return;
               if(divName==null) return;
               
               window.cobj=new JiuQiWebTableView(divName,"","<%=request.getContextPath() %>/images/jiuqi");//实例化WEBGRID对象
               cobj.attachOverTable(reportTable);//附加现成表
               cobj.mainTableHome.isReadOnly=true;//设置它只读
               cobj.mainTableHome.createLockTableHead();
               cobj.setDesignMode(false);//设置非设计模式
       }
       window.attachEvent ('onload',onwinload);
</script>
<script type="text/javascript">
       function printTable()
       {
               var gridData = "<c:out value="${gridData}"/>"
               Ext.lt.ifmis.activex.loadJQReportOcx().Preview(gridData);
       }
</script>

