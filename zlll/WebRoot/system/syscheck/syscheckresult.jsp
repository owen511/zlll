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
<style>
	.wt{ font-size:12px; color:#000;line-height:27px;}
	.jc_l_tb{height:27px; width:22px; background:url(<%=basePath%>/ifmis_images/syschecktot/jc_l_tb.png) no-repeat left top!important;}
	.jc_m_bg{background:url(<%=basePath%>/ifmis_images/syschecktot/jc_m_bg.png) repeat-x left top!important; padding-left:2px; padding-right:2px;}
	.jc_m_gx{width:3px; font-size:0; background:url(<%=basePath%>/ifmis_images/syschecktot/jc_m_gx.png) no-repeat left top!important;}
	.jc_r_btn{background:url(<%=basePath%>/ifmis_images/syschecktot/jc_r_btn.png) no-repeat right top!important; width:70px; color:#FFF; cursor:pointer;}
    .jc_r_btn a:link{color:#FFF;}
    .jc_r_btn a:visited{color:#FFF;}
    .jc_r_btn a:hover{color:#FF0000;}
    .jc_r_btn a:active{color:#FFF;}
</style>

<script>
var submenuid = <c:out value="${param.submenu}"/>;
var mainmenu = <c:out value="${param.mainmenu}"/>;
var pars = 'submenu=' + submenuid+ '&mainmenu=' + mainmenu;
var datas = new Ext.lt.recordset({columns:[],datas:[[]]});
//显示所有业务菜单
function checkSys(){
	//判断当前页面是否为系统菜单，如果不是就直接查询本系统
	var currentUrl = window.location.href;
	var mainmenu = getUrlParam(currentUrl, "mainmenu");
	if(mainmenu != "26900938") {
		query(mainmenu);
		return false;
	}
	var url = "/system/checking/getAllSys.do";
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
}
//系统检测回调方法
function query(menuids){
	if(!menuids)return;
	Ext.lt.RCP.server("gov.mof.fasp.ifmis.system.syscheck.action.SysCheck","insertLog",[menuids.toString()]);
	Ext.lt.RCPConsole.processserver(
			"gov.mof.fasp.ifmis.system.syscheck.action.SysCheck",
			"beginCheck",
			[menuids.toString()], 
			function (resp) {
	        	tab.setRecordset(resp.data);
	        	tab.redraw();
	        	//tab.resize(JQ("#tbl-container").width(),(JQ("#left_tree").height()-80));
	        	var jqMain = JQ("#main");
				tab.resize(jqMain.width()*0.93,(jqMain.height()-110));
	        	errors = resp.error;
	        	var allc=0,rigc=0,errc=0,outh=["<table style='margin-left:15px;'>"];
	        	errors.each(function(i){
	        		var tempAll = parseInt(i.allcount,10);
	        		var tempErr = parseInt(i.errorcount,10);
	        		allc = allc + tempAll;
	        		errc = errc + tempErr;
	        		rigc = rigc + (tempAll - tempErr);
	        		outh.push("<tr style='height:22px;'><td align:left>",i.menu,"总数:</td><td align:left style='padding-right:10px;'>",tempAll,"</td><td align:left>正确:</td><td align:left style='padding-right:10px;'>",tempAll - tempErr,"</td><td align:left>异常:</td><td align:left >",tempErr,"</td></tr>");
	        	});
	        	outh.push("</table>");
	        	JQ("#everycount")[0].innerHTML = outh.join("");
	        	JQ("#alltot").text(allc);
	        	JQ("#righttot").text(rigc);
	        	JQ("#exceptiontot").text(errc);
	        	JQ("#tot").css("display","");
	        }
	 );
}

// 自定义导出功能
function expSysExcel(){
	var exportForm =document.createElement("<form id='exportform'  method='post' ></form>");
	document.body.appendChild(exportForm);
	exportForm.action = "/system/checking/expSysExcel.do";
	exportForm.submit();
  	document.body.removeChild(exportForm);
}

// 显示详细检测信息
function showAllCheck(){
	wind.show();
}
</script>
<ui:menufunction divid="query_t"></ui:menufunction>
<div id="tot" style="float:right;margin-right:10px;display:none;">
	<table cellpadding="0" cellspacing="0" class="wt">
		<tr>
			<td class="jc_l_tb">&nbsp;</td>
			<td class="jc_m_bg">总检测数:<span id="alltot"></span></td>
			<td class="jc_m_gx">&nbsp;</td>
			<td class="jc_m_bg">正确:<span id="righttot"></span></td>
			<td class="jc_m_gx">&nbsp;</td>
			<td class="jc_m_bg">异常:<span id="exceptiontot"></span></td>
			<td class="jc_r_btn" title="点击查看统计信息">&nbsp;<a href="#" onclick="showAllCheck()">统计信息</a></td>
		</tr>
	</table>
</div>
<!-- 存放详细信息 -->
<div id="everycount" style="width:500px;height:200px;"></div>
<div id="form_table_title">
	<ul>
		<li class="top"><div>系统检测结果</div></li>
	</ul>
</div>
<div id='tbl-container' style="margin-left:10px;width:99%;height:420px"></div>

<script>
//当在菜单挂载到业务系统下时，改名检测称和事件
JQ(document).ready(function(){
	var currentUrl = window.location.href;
	var mainmenu = getUrlParam(currentUrl, "mainmenu");
	if(mainmenu != "26900938") {
		JQ("#query_t span span").attr("title","检查");
		JQ("#query_t a").eq(0).text("检查");
	}
});

//画表格
var tab = new Ext.lt.datatable35(datas);
var col = [];
	col.push(tab.columns.seq);
	col.push({name:'code',alias:'编码',datatype:'S',width:0.11});
	col.push({name:'mainmenu',alias:'业务模块',datatype:'S',width:0.11});
	col.push({name:'title',alias:'标题',datatype:'S',width:0.11});
	col.push({name:'type',alias:'操作',datatype:'S',width:0.11});
	col.push({name:'result',alias:'检查结果',datatype:'S',width:380});
	col.push({name:'description',alias:'描述或处理办法',datatype:'S',width:300});
tab.setCols(col);
tab.setKeysearch(true);
tab.setAllowClock(false);
tab.clockColumnSize(1);//------
tab.mousedrag(false);
tab.setClassName('dttheme_ifmis');
tab.clockRowSize(0)
var _div = document.getElementById('tbl-container');
tab.draw(_div);
var wind;
// 将弹出详细信息先画好
JQ(function($){
	wind=new Ext.lt.window({title:'系统检测信息统计',fitmode:'body',h:400,w:600,style:'font-size:18',className:'wind7',pop:true,autoshow:false});
	wind.draw(everycount);
});
//tab.resize(JQ("#tbl-container").width(),(JQ("#left_tree").height()-50));
Ext.lt.message.hook("layout","endlayout",function(){
	var jqMain = JQ("#main");
	tab.resize(jqMain.width()*0.93,(jqMain.height()-110));
});
</script>