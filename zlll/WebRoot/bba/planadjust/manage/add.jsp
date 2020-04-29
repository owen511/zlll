<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ include file="/bba/common/common.jsp"%>
<script type="text/javascript" src="<%=basePath%>/bba/planadjust/js/common.js"></script>
<ui:menufunction divid="query_t"></ui:menufunction>
<form id=queryform action="./add.do?fromquery=yes&<%=menu%>" method="post">
	<ui:queryform formid="queryform" />
</form>
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
<ui:menufunction divid="confirm_exit_btn" btscope="1"></ui:menufunction>
<div id="form_table_title_edit">
	<ul>
		<li class="top">
			<div>请录入额度调账信息</div>
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

<div id="containerline3" style="display: none">
	<div id='edit_table_tdetail'
		style='display: none; padding: 0; margin: 0;'></div>
	<ui:datatable columndefine="true" id="tdetail" tabletype="DetailList"
		data="detailsJson" sumColumnList="amt" />
</div>
<script type="text/javascript">
setDisabled(true);
</script>
<script type="text/javascript" src="<%=basePath%>/bba/js/overviewdc.js"></script>