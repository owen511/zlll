<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<SCRIPT LANGUAGE="JavaScript">
<!--
var mainsub = true;//标注列表页面是否主子 true:是 false :否;  请保留!!!

function mainclick(row){
    
	var url = '../manage/getDetail.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>';
	
	var pars = 'billid='+row.billid;
    var myAjax = new Ajax.Request(
                    url,
                    {method: 'post', parameters: pars, onComplete: showResponse,onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
								 	alert("读取失败！");
								 }
					}
                    );
}

function showResponse(request){
    eval("var tdetaildata = "+request.responseText);
    tdetail.data = tdetaildata;
    tdetail.show();
    updateRow2ColumnForDetail('edit_table_tdetail','tdetail');
}

//-->
</SCRIPT>

<ui:menufunction divid="query_t"></ui:menufunction>
<form id=queryform
	action="index.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>"
	method="post">
	<ui:queryform formid="queryform" />
</form>
<form id="advancedQueryForm" name="advancedQueryForm" 
	  action="index.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>" method="post">   
	  <ui:advancedqueryform formid="advancedQueryForm" />
</form>
<div>
	<form name="mainListForm" id="mainListForm" action="#" method="post">
		<input name="selectedbillids" id="selectedbillids" type="hidden"
			value="">
		<div id="form_table_title">
			<ul>
				<li class="top">
					<div>
						主单信息
					</div>
				</li>
				<li>
					<ui:row2column dataid="tmain" showdivname="edit_table"
						columnNum="4" drawDetail="true" tdetailName="tdetail"
						tdetailShowDivName="edit_table_tdetail" />
				</li>
			</ul>
		</div>
		<!--请保留此div和a标签 -->
		<div id="containerline8">
			<div id='edit_table' style='display:none;padding:0;margin:0;'></div>
			<ui:datatable id="tmain" tabletype="MainList" data="json"
				onclick="mainclick" showcheckbox="true" columndefine="true" />
		</div>
	</form>
</div>
<div>
	<form action="#" method="post">
		<div id="form_table_title">
			<ul>
				<li class="top">
					<div>
						明细信息
					</div>
				</li>
				<li>
					<ui:row2column dataid="tdetail" showdivname="edit_table_tdetail"
						columnNum="4" />
				</li>
			</ul>
		</div>
		<!--请保留此div和a标签 -->
		<div id="containerline4">
			<div id='edit_table_tdetail' style='display:none;padding:0;margin:0;'></div>
			<ui:datatable id="tdetail" tabletype="DetailList" showcheckbox="true"
				columndefine="true" />
		</div>
	</form>
</div>

