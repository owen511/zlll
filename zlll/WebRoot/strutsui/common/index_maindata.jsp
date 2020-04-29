<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<SCRIPT LANGUAGE="JavaScript">
<!--
var mainsub = false;//标注列表页面是否主子 true:是 false :否
//-->
</SCRIPT>
<ui:menufunction divid="query_t"></ui:menufunction>
<form id=queryform
	action="index.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>&<c:out value="${DEFAULTURLPARAMETER}"/>"
	method="post">
	<ui:queryform formid="queryform" />
</form>

<form name="mainListForm" id="mainListForm" action="#" method="post">
	<input name="selectedbillids" id="selectedbillids" type="hidden" value=""/>
	<input type ="hidden" name ="maindata" id ="maindata" />
	<div id="form_table_title">
		<ul>
			<li class="top"><div>主单信息</div></li>
			<li>
				<ui:row2column dataid="tmain" showdivname="edit_table"
					columnNum="4" drawDetail="false" tdetailName="tdetail"
					tdetailShowDivName="edit_table_tdetail"/>
			</li>
		</ul>
	</div>
	<!--请保留此div和a标签 -->
	<div id="containerline20_d">
	<div id='edit_table' style='display:none;padding:0;margin:0;'></div>
		<ui:datatable id="tmain" tabletype="MainList" data="json" showcheckbox="true" columndefine="true" useThisHead="tempHeadHtml" createAmtColumn="true" sumColumnList='<%=(String)request.getAttribute("sumColumnList")%>'/>
	</div>
</form>


