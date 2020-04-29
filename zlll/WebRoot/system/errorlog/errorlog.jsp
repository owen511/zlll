<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path;
%>
<link type="text/css" rel="stylesheet"	href="<%=basePath%>/ltext/datatabletheme.css" />
<script type="text/javascript" src="<%=basePath%>/ltext/datatable3.0.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/ifmisdatatable.js"></script>
<script>
// ��д��ѯ��������
var userid_queryoptions = status_queryoptions = system_queryoptions = errortype_queryoptions = {url:"/system/errorlog/querytree.do"};
var submenu = <c:out value="${param.submenu}"/>;
var mainmenu = <c:out value="${param.mainmenu}"/>;
var pars = 'submenu=' + submenu+ '&mainmenu=' + mainmenu;
// ��ѯ
function query(){
	$("queryform").dosubmit();
}
// ����ť
function manageError() {
	var row = tmain.getSelected();
	if(row.length != 1) {
		alert("��ѡ��һ�����ݣ�");
		return;
	}
	$("logid").value = row[0].logid;
	if(row[0].statusid) {
		var statsObj = document.getElementsByName("status");
		for (var i=0,len=statsObj.length; i<len; i++) {
			if(statsObj[i].value == row[0].statusid) {
				statsObj[i].checked = true;
			}
		}
	}
	if(row[0].remark) {
		$("remark").innerText = row[0].remark;
	}
	wind.show();
}
// ɾ��
function deleteError() {
	var selectedRows = tmain.getSelected();
	if (selectedRows == null || selectedRows.length == 0) {
		alert("��ѡ��Ҫɾ������!");
		return;
	}
	var note = confirm("ȷ��Ҫɾ��ѡ��������");
	if (!note) {
		return;
	}
	var logids = new Array();
	for (var i=0;i<selectedRows.length;i++) {
		logids.push(selectedRows[i].logid);
	}
	$("logids").value = logids.join(",");
	$("mainListForm").action = "/common/error/deleteErrorlog.do?"+pars;
	$("mainListForm").submit();
}
// ����
function exportError() {
	var selectedRows = tmain.getSelected();
	var logids = new Array();
	for (var i=0;i<selectedRows.length;i++) {
		logids.push(selectedRows[i].logid);
	}
	var exportForm =document.createElement("<form id='exportform'  method='post' ></form>");
	document.body.appendChild(exportForm);
	exportForm.action = "/common/error/expSysExcel.do?logids="+logids.join(",");
	exportForm.submit();
  	document.body.removeChild(exportForm);
}
</script>

<ui:menufunction divid="query_t"></ui:menufunction>
<form id=queryform
	action="/common/error/getErrorLog.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>"
	method="post">
	<ui:queryform formid="queryform" />
</form>
<form name="mainListForm" id="mainListForm" style="height:350px" action="#" method="post">
	<input name="logids" id="logids" type="hidden" value=""/>
	<div id="form_table_title">
		<ul>
			<li class="top"><div>������Ϣ</div></li>
			<li>
				<ui:row2column dataid="tmain" showdivname="edit_table"
					columnNum="4" drawDetail="false" tdetailName="tdetail"
					tdetailShowDivName="edit_table_tdetail"/>
			</li>
		</ul>
	</div>
	<!--�뱣����div��a��ǩ -->
	<div id="containerline15" style='height:350px'>
	<div id='edit_table' style='display:none;padding:0;margin:0;'></div>
		<ui:ifmisdatatable id="tmain" tabletype="MainList" data="json" showcheckbox="true" columndefine="true"/>
	</div>
</form>
<!-- ����ҳ�� -->
<div id="manage" style="width:350px;height:200px;">
	<form id="manageform" action="#" method="post">
		<input type="hidden" id="logid" name="logid"/>
		<table>
			<tr>
				<td>״̬:</td>
				<td>
					<input type="radio" name="status" value="0">�����
					<input type="radio" name="status" value="1">���ύ
					<input type="radio" name="status" value="2">�ѿ���
					<input type="radio" name="status" value="3">������
					<input type="radio" name="status" value="4">�ѽ��
				</td>
			</tr>
			<tr>
				<td>��ע:</td>
				<td><textarea id="remark" name="remark" rows="5" cols="40"></textarea></td>
			</tr>
			<tr>
				<td colspan="2" align="center">
					<button onclick="saveclose()">ȷ��</button>&nbsp;&nbsp;&nbsp;&nbsp;
					<button onclick="windclose();">ȡ��</button>
				</td>
			</tr>
		</table>
	</form>
</div>
<!-- ��ϸ������־��Ϣ -->
<div id="stacklog" style="width:500px;height:300px;">
	<div id="stacktxt"></div>
</div>
<script>
	// Ԥ�Ȼ���
	var wind=new Ext.lt.window({title:'������Ϣ����',fitmode:'content',className:'wind7',pop:true,autoshow:false});
	wind.draw(manage);
	// �رյ���ҳ��
	function windclose() {
		wind.close();
	}
	// ȷ������
	function saveclose() {
		Ext.lt.HTML.mark();
	    if($("remark").innerText.length > 250){
	    	alert('��ע����С�ڵ���250��');
	    	Ext.lt.HTML.unmark();
	    	return;
	    }
		$("manageform").action = "/common/error/updateErrorlog.do?"+pars;
		$("manageform").submit();
	}
	var wind1=new Ext.lt.window({title:'��ջ������Ϣ',fitmode:'body',h:600,w:600,className:'wind7',pop:true,autoshow:false});
	wind1.draw(stacklog);
	// �е��
	Ext.lt.onload(function(){
		tmain.onEvent('ondblclick',function(td,el,l,c,d){
			$("stacktxt").innerText = "";
			if(d.stacklog != null || d.stacklog != undefined)
				$("stacktxt").innerText = d.stacklog.replace(/<br>/g,'\n');
			else 
				$("stacktxt").innerText = "�޶�ջ������Ϣ!";
			wind1.show();
		});
	});
</script>