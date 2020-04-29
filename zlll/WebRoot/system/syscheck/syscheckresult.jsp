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
//��ʾ����ҵ��˵�
function checkSys(){
	//�жϵ�ǰҳ���Ƿ�Ϊϵͳ�˵���������Ǿ�ֱ�Ӳ�ѯ��ϵͳ
	var currentUrl = window.location.href;
	var mainmenu = getUrlParam(currentUrl, "mainmenu");
	if(mainmenu != "26900938") {
		query(mainmenu);
		return false;
	}
	var url = "/system/checking/getAllSys.do";
	var iWidth=300;
	var iHeight =450;
	var iTop = (window.screen.availHeight-30-iHeight)/2;       //��ô��ڵĴ�ֱλ��;
    var iLeft = (window.screen.availWidth-10-iWidth)/2; 
	window.open(url, 'newWindow','width=310px,height=450px,top='+iTop+',left='+iLeft+',status=yes,toolbar=no,menubar=no,directories=no,resizable=no,Scrollbars=no,help:No');
}
window.onload = function(){
	if(mainmenu == "26900938"&&getparam("uicheck")=="yes") {
		query(mainmenu);
		//return false;
	}
}
//ϵͳ���ص�����
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
	        		outh.push("<tr style='height:22px;'><td align:left>",i.menu,"����:</td><td align:left style='padding-right:10px;'>",tempAll,"</td><td align:left>��ȷ:</td><td align:left style='padding-right:10px;'>",tempAll - tempErr,"</td><td align:left>�쳣:</td><td align:left >",tempErr,"</td></tr>");
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

// �Զ��嵼������
function expSysExcel(){
	var exportForm =document.createElement("<form id='exportform'  method='post' ></form>");
	document.body.appendChild(exportForm);
	exportForm.action = "/system/checking/expSysExcel.do";
	exportForm.submit();
  	document.body.removeChild(exportForm);
}

// ��ʾ��ϸ�����Ϣ
function showAllCheck(){
	wind.show();
}
</script>
<ui:menufunction divid="query_t"></ui:menufunction>
<div id="tot" style="float:right;margin-right:10px;display:none;">
	<table cellpadding="0" cellspacing="0" class="wt">
		<tr>
			<td class="jc_l_tb">&nbsp;</td>
			<td class="jc_m_bg">�ܼ����:<span id="alltot"></span></td>
			<td class="jc_m_gx">&nbsp;</td>
			<td class="jc_m_bg">��ȷ:<span id="righttot"></span></td>
			<td class="jc_m_gx">&nbsp;</td>
			<td class="jc_m_bg">�쳣:<span id="exceptiontot"></span></td>
			<td class="jc_r_btn" title="����鿴ͳ����Ϣ">&nbsp;<a href="#" onclick="showAllCheck()">ͳ����Ϣ</a></td>
		</tr>
	</table>
</div>
<!-- �����ϸ��Ϣ -->
<div id="everycount" style="width:500px;height:200px;"></div>
<div id="form_table_title">
	<ul>
		<li class="top"><div>ϵͳ�����</div></li>
	</ul>
</div>
<div id='tbl-container' style="margin-left:10px;width:99%;height:420px"></div>

<script>
//���ڲ˵����ص�ҵ��ϵͳ��ʱ���������ƺ��¼�
JQ(document).ready(function(){
	var currentUrl = window.location.href;
	var mainmenu = getUrlParam(currentUrl, "mainmenu");
	if(mainmenu != "26900938") {
		JQ("#query_t span span").attr("title","���");
		JQ("#query_t a").eq(0).text("���");
	}
});

//�����
var tab = new Ext.lt.datatable35(datas);
var col = [];
	col.push(tab.columns.seq);
	col.push({name:'code',alias:'����',datatype:'S',width:0.11});
	col.push({name:'mainmenu',alias:'ҵ��ģ��',datatype:'S',width:0.11});
	col.push({name:'title',alias:'����',datatype:'S',width:0.11});
	col.push({name:'type',alias:'����',datatype:'S',width:0.11});
	col.push({name:'result',alias:'�����',datatype:'S',width:380});
	col.push({name:'description',alias:'��������취',datatype:'S',width:300});
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
// ��������ϸ��Ϣ�Ȼ���
JQ(function($){
	wind=new Ext.lt.window({title:'ϵͳ�����Ϣͳ��',fitmode:'body',h:400,w:600,style:'font-size:18',className:'wind7',pop:true,autoshow:false});
	wind.draw(everycount);
});
//tab.resize(JQ("#tbl-container").width(),(JQ("#left_tree").height()-50));
Ext.lt.message.hook("layout","endlayout",function(){
	var jqMain = JQ("#main");
	tab.resize(jqMain.width()*0.93,(jqMain.height()-110));
});
</script>