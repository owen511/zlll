<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ include file="/bba/common/common.jsp"%>
<script type="text/javascript" src="<%=basePath%>/bba/pay/js/common.js"></script>
<ui:menufunction divid="query_t"></ui:menufunction>
<form id=queryform action="./index.do?fromquery=yes&<%=menu%>" method="post">
 <ui:queryform formid="queryform" />
</form>
<div id="form_table_title">
 <ul>
  <li class="top">
   <div>支出凭证信息</div>
  </li>
  <li><ui:row2column dataid="tmain" showdivname="edit_table" columnNum="4"/></li>
 </ul>
</div>
<!--请保留此div和a标签 -->
<div id="containerline8">
 <div id='edit_table' style='display: none; padding: 0; margin: 0;'></div>
 <ui:datatable id="tmain" tabletype="MainList" data="json" showcheckbox="true"
  columndefine="true" sumColumnList="amt" onclick="mainclick"/>
</div>
<div id="form_table_title">
 <ul>
  <li class="top">
   <div>支出凭证明细信息</div>
  </li>
  <li></li>
 </ul>
</div>
<!--请保留此div和a标签 -->
<div id="containerline5">
	<div id='edit_table_tdetail'
		style='display: none; padding: 0; margin: 0;'></div>
	<ui:datatable columndefine="true" id="tdetail" tabletype="DetailList"
		data="detailsJson" sumColumnList="amt" />
</div>