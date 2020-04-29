<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ include file="/bba/common/common.jsp"%>
<script type="text/javascript" src="<%=basePath%>/bba/plan/js/common.js"></script>
<script type="text/javascript"
	src="<%=basePath%>/bba/plan/js/generate.js"></script>
<style>
.button_style {
	width: 120px;
	background-image: url(../ifmis_images/bg/button_bg.gif);
	border: 1px solid #003c74;
	color: #000000;
	height: 20px;
	padding-top: 2px;
	margin-left: 5px;
	margin-right: 10px;
}
</style>
<ui:menufunction divid="query_t"></ui:menufunction>
<form id=queryform action="./add.do?fromquery=yes&<%=menu%>"
	method="post">
	<ui:queryform formid="queryform" />
</form>
<div id="form_table_title">
	<ul>
		<li class="top">
			<div>银行流水信息</div>
		</li>
		<li><ui:row2column dataid="tmain" showdivname="edit_table"
				columnNum="4" /></li>
	</ul>
</div>
<!--请保留此div和a标签 -->
<div id="containerline8">
	<div id='edit_table' style='display: none; padding: 0; margin: 0;'></div>
	<ui:datatable id="tmain" tabletype="MainList" data="json"
		showcheckbox="true" columndefine="true" sumColumnList="amt" />
</div>
<div id="isDisplay" style="display: none;">
	<div id="form_table_title_edit">
		<ul>
			<li class="top">
				<div>合并摘要编辑区</div>
			</li>
		</ul>
	</div>
	<form name="detailform" id="detailform" enctype="multipart/form-data"
		action="" method="post">
		<div id="form_table" style="display: block;">
			<ui:editform formid="detailform" pagetype="add" parsetype="link" />
		</div>
	</form>
</div>

<div id="form_table_title_edit">
	<ul>
		<li class="top">
			<div>请选择是否合并操作</div>
		</li>
		<li>注：选择是：则在选中的银行流水信息中按账户名称、账号、单位相同时，汇总成一条数据；否则反之。</li>
	</ul>
</div>
<div id="form_table">
	<table>
		<tr>
			<td>&nbsp;是否合并</td>
			<td style="text-align: right;">是</td>
			<td><input type="radio" id="radio_yes" name="single_btn"
				value="1" onclick="doRadio(1)" /></td>
			<td style="text-align: right;">否</td>
			<td><input type="radio" id="radio_no" name="single_btn"
				value="0" onclick="doRadio(0)" checked="checked"/></td>
		</tr>
	</table>
</div>
<div id="btn_1" style="display: none">
	<ui:menufunction divid="confirm_exit_btn" btscope="1"></ui:menufunction>
</div>
<div id="btn_0" style="display: block">
	<ui:menufunction divid="confirm_exit_btn" btscope="2"></ui:menufunction>
</div>
