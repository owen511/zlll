<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ include file="/bba/common/common.jsp"%>
<ui:menufunction divid="query_t"></ui:menufunction>
<form id=queryform action="./index.do?fromquery=yes&<%=menu%>"
	method="post">
	<ui:queryform formid="queryform" />
</form>
<div id="form_table_title">
	<ul>
		<li class="top">
			<div>用户绑定地址信息</div>
		</li>
		<li><ui:row2column dataid="tmain" showdivname="edit_table"
				columnNum="4" /></li>
	</ul>
</div>
<!--请保留此div和a标签 -->
<div id="containerline8">
	<div id='edit_table' style='display: none; padding: 0; margin: 0;'></div>
	<ui:datatable id="tmain" tabletype="MainList" data="json"
		columndefine="true" />
</div>
