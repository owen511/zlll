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
// 重写查询条件方法
var userid_queryoptions = status_queryoptions = system_queryoptions = errortype_queryoptions = {url:"/system/errorlog/querytree.do"};
var submenu = <c:out value="${param.submenu}"/>;
var mainmenu = <c:out value="${param.mainmenu}"/>;
var pars = 'submenu=' + submenu+ '&mainmenu=' + mainmenu;
// 查询
function query(){
	$("queryform").dosubmit();
}
// 管理按钮
function manageError() {
	var row = tmain.getSelected();
	if(row.length != 1) {
		alert("请选择一条数据！");
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
// 删除
function deleteError() {
	var selectedRows = tmain.getSelected();
	if (selectedRows == null || selectedRows.length == 0) {
		alert("请选择要删除数据!");
		return;
	}
	var note = confirm("确定要删除选中数据吗？");
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
// 导出
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
			<li class="top"><div>错误信息</div></li>
			<li>
				<ui:row2column dataid="tmain" showdivname="edit_table"
					columnNum="4" drawDetail="false" tdetailName="tdetail"
					tdetailShowDivName="edit_table_tdetail"/>
			</li>
		</ul>
	</div>
	<!--请保留此div和a标签 -->
	<div id="containerline15" style='height:350px'>
	<div id='edit_table' style='display:none;padding:0;margin:0;'></div>
		<ui:ifmisdatatable id="tmain" tabletype="MainList" data="json" showcheckbox="true" columndefine="true"/>
	</div>
</form>
<!-- 管理页面 -->
<div id="manage" style="width:350px;height:200px;">
	<form id="manageform" action="#" method="post">
		<input type="hidden" id="logid" name="logid"/>
		<table>
			<tr>
				<td>状态:</td>
				<td>
					<input type="radio" name="status" value="0">待审核
					<input type="radio" name="status" value="1">已提交
					<input type="radio" name="status" value="2">已开发
					<input type="radio" name="status" value="3">待发版
					<input type="radio" name="status" value="4">已解决
				</td>
			</tr>
			<tr>
				<td>备注:</td>
				<td><textarea id="remark" name="remark" rows="5" cols="40"></textarea></td>
			</tr>
			<tr>
				<td colspan="2" align="center">
					<button onclick="saveclose()">确定</button>&nbsp;&nbsp;&nbsp;&nbsp;
					<button onclick="windclose();">取消</button>
				</td>
			</tr>
		</table>
	</form>
</div>
<!-- 详细错误日志信息 -->
<div id="stacklog" style="width:500px;height:300px;">
	<div id="stacktxt"></div>
</div>
<script>
	// 预先画好
	var wind=new Ext.lt.window({title:'错误信息管理',fitmode:'content',className:'wind7',pop:true,autoshow:false});
	wind.draw(manage);
	// 关闭弹出页面
	function windclose() {
		wind.close();
	}
	// 确定保存
	function saveclose() {
		Ext.lt.HTML.mark();
	    if($("remark").innerText.length > 250){
	    	alert('备注长度小于等于250！');
	    	Ext.lt.HTML.unmark();
	    	return;
	    }
		$("manageform").action = "/common/error/updateErrorlog.do?"+pars;
		$("manageform").submit();
	}
	var wind1=new Ext.lt.window({title:'堆栈错误信息',fitmode:'body',h:600,w:600,className:'wind7',pop:true,autoshow:false});
	wind1.draw(stacklog);
	// 行点击
	Ext.lt.onload(function(){
		tmain.onEvent('ondblclick',function(td,el,l,c,d){
			$("stacktxt").innerText = "";
			if(d.stacklog != null || d.stacklog != undefined)
				$("stacktxt").innerText = d.stacklog.replace(/<br>/g,'\n');
			else 
				$("stacktxt").innerText = "无堆栈错误信息!";
			wind1.show();
		});
	});
</script>