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
var submenuid = <c:out value="${param.submenu}"/>;
var mainmenu = <c:out value="${param.mainmenu}"/>;
var pars = 'submenu=' + submenuid+ '&mainmenu=' + mainmenu;
var datas = new Ext.lt.recordset({columns:[],datas:[[]]});
//显示所有业务菜单
/*function checkSys(){
	//判断当前页面是否为系统菜单，如果不是就直接查询本系统
	var currentUrl = window.location.href;
	var mainmenu = getUrlParam(currentUrl, "mainmenu");
	if(mainmenu != "26900938") {
		query(mainmenu);
		return false;
	}
	var url = "/system/checking/queryCheckSys.do";
	var iWidth=300;
	var iHeight =450;
	var iTop = (window.screen.availHeight-30-iHeight)/2;       //获得窗口的垂直位置;
    var iLeft = (window.screen.availWidth-10-iWidth)/2; 
	window.open(url, 'newWindow','width=310px,height=450px,top='+iTop+',left='+iLeft+',status=yes,toolbar=no,menubar=no,directories=no,resizable=no,Scrollbars=no,help:No');
}
window.onload = function(){
	if(mainmenu == "26900938"&&getparam("uicheck")=="yes") {
		query(mainmenu);
		//return false;
	}
}*/

function checkSys(){
	var menuids = document.getElementById("mainmenu").value;
	//如果没有选中择检测所有系统
	if(menuids == ""){
	
		alert("请选择业务模块!");
		return;
	}
	query(menuids);
}
//系统检测回调方法
function query(menuids){
	if(!menuids)return;
	Ext.lt.RCP.server("gov.mof.fasp.ifmis.system.syscheck.action.SysCheck","sysCheckQuery",[menuids.toString()], 
			function (resp) {
	        	tab.setRecordset(resp);
	        	tab.redraw();
	        }
	 );
}
</script>
<script>
	var mainmenu_queryoptions = {url:"/system/checking/getSyscheckQueryLog.do"};
</script>
<ui:menufunction divid="query_t"></ui:menufunction>
<form id ="queryform">
	<ui:queryform formid="queryform"/>
</form>
<div id="form_table_title">
	<ul>
		<li class="top"><div>系统检测配置信息</div></li>
	</ul>
</div>
<div id='tbl-container' style="margin-left:10px;width:99%;height:420px"></div>

<script>
var datas = <%=request.getAttribute("sysset")%>;
var menus = <%=request.getAttribute("mainMenus")%>;
var arrnames = [];
for (var i in menus) {
	arrnames.push([menus[i].code,menus[i].name]);
}
//画表格
var tab = new Ext.lt.datatable35(datas);
var col = [];
	col.push(tab.columns.seq, tab.columns.checkbox);
	col.push({name:'code',alias:'编码',datatype:'S',width:'100'});
	col.push({name:'mainmenu',alias:'业务模块',datatype:'S',width:'100',mapper:{columns:['mainmenu','name'],datas:arrnames},format:'#mainmenu-#name'});
	col.push({name:'title',alias:'检测主题',datatype:'S',width:'200'});
	col.push({name:'type',alias:'检测类型',datatype:'S',width:'100',mapper:{columns:['type','name'],datas:[[1,'版本检测'],[2,'配置项核对'],[3,'错误验证']]},format:'#name'});
	col.push({name:'model',alias:'检测模式',datatype:'S',width:'100',mapper:{columns:['model','name'],datas:[[1,'SQL'],[2,'Class']]},format:'#name'});
	col.push({name:'sql',alias:'检测SQL语句',datatype:'S',width:'400'});
	col.push({name:'classname',alias:'检测实现类名称',datatype:'S',width:'200'});
	col.push({name:'method',alias:'检测实现类方法',datatype:'S',width:'200'});
	col.push({name:'description',alias:'检测描述或处理方法',datatype:'S',width:'400'});
tab.setCols(col);
tab.setKeysearch(true);
tab.setAllowClock(false);
tab.clockColumnSize(1);
tab.mousedrag(false);
tab.setClassName('dttheme_ifmis');
tab.clockRowSize(0);
var _div = document.getElementById('tbl-container');
tab.draw(_div);
Ext.lt.message.hook("layout","endlayout",function(){
	var jqMain = JQ("#main");
	tab.resize(jqMain.width()*0.93,(jqMain.height()-120));
});
</script>