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
   <div>֧��ƾ֤��Ϣ</div>
  </li>
  <li><ui:row2column dataid="tmain" showdivname="edit_table" columnNum="4"/></li>
 </ul>
</div>
<!--�뱣����div��a��ǩ -->
<div id="containerline8">
 <div id='edit_table' style='display: none; padding: 0; margin: 0;'></div>
 <ui:datatable id="tmain" tabletype="MainList" data="json" showcheckbox="true"
  columndefine="true" sumColumnList="amt" onclick="mainclick"/>
</div>
<div id="form_table_title">
 <ul>
  <li class="top">
   <div>֧��ƾ֤��ϸ��Ϣ</div>
  </li>
  <li></li>
 </ul>
</div>
<!--�뱣����div��a��ǩ -->
<div id="containerline5">
	<div id='edit_table_tdetail'
		style='display: none; padding: 0; margin: 0;'></div>
	<ui:datatable columndefine="true" id="tdetail" tabletype="DetailList"
		data="detailsJson" sumColumnList="amt" />
</div>