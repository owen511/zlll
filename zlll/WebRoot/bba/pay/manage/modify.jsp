<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ include file="/bba/common/common.jsp"%>
<script type="text/javascript" src="<%=basePath%>/bba/pay/js/common.js"></script>
<div>&nbsp;</div>
<div>&nbsp;</div>
<div id="form_table_title">
	<ul>
		<li class="top">
			<div>请选择用款额度信息</div>
		</li>
		<li><ui:row2column dataid="tmain" showdivname="edit_table"
				columnNum="4" drawDetail="true" tdetailName="tdetail"
				tdetailShowDivName="edit_table_tdetail" /></li>
	</ul>
</div>
<div id="containerline4">
	<div id='edit_table' style='display: none; padding: 0; margin: 0;'></div>
	<ui:datatable id="tmain" tabletype="MainList" data="sourcesJson"
		showradio="true" sumColumnList="amt,curamt" columndefine="true"
		onclick="mainradioclick" />
</div>
<div id="form_table_title_edit">
	<ul>
		<li class="top">
			<div>请录入支出凭证</div>
		</li>
	</ul>
</div>
<form name="detailform" id="detailform" enctype="multipart/form-data"
	action="" method="post">
	<div id="form_table" style="display: block;">
		<ui:editform formid="detailform" pagetype="add" parsetype="link"
			tableName="tdetail" />
	</div>
</form>
<ui:menufunction divid="confirm_exit_btn" btscope="1"></ui:menufunction>
<div id="form_table_title">
	<ul>
		<li class="top">
			<div>支出凭证明细信息</div>
		</li>
		<li><a id='pageTagDiv'></a></li>
	</ul>
</div>
<div id="containerline5">
	<div id='edit_table_tdetail' style='display: none; padding: 0; margin: 0;'></div>
	<ui:datatable columndefine="true" id="tdetail" tabletype="DetailList"
		data="detailsJson" showradio="true" sumColumnList="amt" onclick="detailradioclick"/>
</div>
<script type="text/javascript" src="<%=basePath%>/bba/pay/js/modify.js"></script>
<script type="text/javascript" src="<%=basePath%>/bba/js/overviewdc.js"></script>