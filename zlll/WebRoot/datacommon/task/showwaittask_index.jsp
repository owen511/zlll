<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>


<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<link rel="stylesheet" type="text/css" href="<%=path%>/datacommon/common/style/global.css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/datacommon/common/style/pager.css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/datacommon/common/style/dialog.css" />

<script type="text/javascript" src="<%=path%>/datacommon/common/js/jquery-1.4.4.min.js"></script>
<script type="text/javascript" src="<%=path%>/datacommon/common/js/json.js"></script>
<script type="text/javascript" src="<%=path%>/datacommon/common/js/ajax.js"></script>
<script type="text/javascript" src="<%=path%>/datacommon/common/js/dialog.js"></script>
<script type="text/javascript" src="<%=path%>/datacommon/common/js/div.js"></script>

<link rel="stylesheet" type="text/css" href="<%=path%>/datacommon/common/style/tableview.css" />
<script type="text/javascript" src="<%=path%>/datacommon/common/js/tableview.js"></script>

<script type="text/javascript" src="<%=path%>/datacommon/common/js/jumpto.js"></script>

<style type="text/css">
<!--
.STYLE1 {
	color: #FF0000
}
-->
</style>
<script type="text/javascript">
var mainmenu = "<c:out value="${mainmenu.menuid}"></c:out>";

</script>
<div id="relation_container">
     <div id="form_table_title">
		<ul>
			<li class="top">
				<div>
					待办事项
				</div>
			</li>
		</ul>
	</div>
    <div id="taskdiv">
     <table class="tableview" id = "tasktable">
       <colgroup width="60" style="text-align:center"></colgroup>
       <colgroup></colgroup>
       <colgroup></colgroup>
        <thead>
      	<tr>
			<th>业务类型</th>
			<th>待办事项</th>
			<th>操作</th>
		</tr>
	</thead>
	<tbody>		
    </tbody>
</table>
</div>
 </div>
