<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path;
%>
<link rel="stylesheet" type="text/css" href="<%=basePath %>/ltext/datatabletheme.css"></script>
<link rel="stylesheet" type="text/css" href="<%=basePath %>/ltext/datatabletheme35.css"></script>
<script type="text/javascript" src="<%=basePath %>/ltext/datatable3.0.js"></script>
<script>
	var userid_queryoptions = {url:"/system/checking/getSyscheckQueryLog.do"};
</script>
<ui:menufunction divid="query_t"></ui:menufunction>
<form id ="queryform">
	<ui:queryform formid="queryform" dateformat = "%Y-%m-%d"/>
</form>
<div id="form_table_title">
	<ul>
		<li class="top"><div>ϵͳ�����־��Ϣ</div></li>
	</ul>
</div>
<div id='tbl-container' style="margin-left:10px;width:99%;height:420px"></div>
<script>
function checkSysLog(){
	var code = document.getElementById("code").value;//.toUpperCase()
	var start_checkdate = document.getElementById("start_checkdate").value; 
	var end_checkdate = document.getElementById("end_checkdate").value;
	var name = document.getElementById("name").value;
	//��־format��ʽ����
    if ((start_checkdate.replaceAll("-","")) > (end_checkdate.replaceAll("-",""))) {
    	alert("��ʼ���ڲ��ܴ��ڽ�������!");
    	return;
    }
	Ext.lt.RCP.server("gov.mof.fasp.ifmis.system.syscheck.action.SysCheck","sysCheckQueryLog",[code,name,start_checkdate,end_checkdate], 
			function (resp) {
	        	tab.setRecordset(resp);
	        	tab.redraw();
	        }
	 );
}

var datas = <%=request.getAttribute("syslog")%>;
var menuids = <%=request.getAttribute("mainMenus")%>;
var arrnames = [];
for (var i in menuids) {
	arrnames.push([menuids[i].code,menuids[i].name]);
}
//�����
var tab = new Ext.lt.datatable35(datas);
var col = [];
	col.push(tab.columns.seq, tab.columns.checkbox);
	col.push({name:'code',alias:'�û�����',datatype:'S',width:'200'});
	col.push({name:'name',alias:'�û�����',datatype:'S',width:'200'});
	col.push({name:'menuid',alias:'���ģ��',datatype:'S',width:'200',mapper:{columns:['menuid','name'],datas:arrnames},format:'#menuid-#name'});
	col.push({name:'checklog',alias:'��������',datatype:'S',width:'200'});
	col.push({name:'checkdate',alias:'���ʱ��',datatype:'S',width:'200'});
tab.setCols(col);
tab.setKeysearch(true);
tab.setAllowClock(false);
tab.clockColumnSize(1);
tab.mousedrag(false);
tab.setClassName('dttheme_ifmis');
tab.clockRowSize(0)
var _div = document.getElementById('tbl-container');
tab.draw(_div);
Ext.lt.message.hook("layout","endlayout",function(){
	var jqMain = JQ("#main");
	tab.resize(jqMain.width()*0.93,(jqMain.height()-120));
});
</script>