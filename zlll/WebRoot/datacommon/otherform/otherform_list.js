var modifyFlag = "";//�ж��Ƿ����޸�Ȩ��
var menuId,mainmenu,modelId,bdgAgency;
var modifyed = false;
var url = null;
var tableCode = "";
var funcBtn = null;
var dataTable = null,projectForm = null;
var tableContainerHeight = 0;
var pageAble = null;

var dcotherform_list = function(config,service) {
	tableCode = config.tableCode;
	menuId = config.submenu;
	mainmenu = config.mainmenu;
	modelId = config.modelId;
		
	//��ʼ������                       
	initLayout(config); 
	
	if(!DataCommon.DataTable){
		alert("���ȼ���extendDataTable.js��extendBaseTable.js�ļ�");
		return;
	}
	else{
		dataTable = new DataCommon.DataTable(config,{
			tableDivId : "tablestyle_ifmis"
		});
		
	}
	
	setTimeout(function(){
		tableContainerHeight = $("#tablestyle_ifmis").height();
	},100);
}


//��������
function impExcel(){
	var params = []; 
	params.push("tablecode="+tableCode);
	params.push("condition=1=1");
	
	fileUpload = new FileUploadProject(params,"*.xls",function(data,attachItemid){
		
		// ˢ��ҳ��
	},"/datacommon/excelbase/index");	
}

//��������
function expExcel(){
	/*
	var params = {};
	params["modelId"] = modelId;
	params["bdgAgency"] = bdgAgency;
	params["menuId"] = menuId;
*/
	
	Ext.lt.RCPConsole.processdownNotEncode('datacommon_otherform_service', 'export2Excel', [tableCode,""]);
} 

/**
 * ��ʼ�����沼��
 */
function initLayout(config){
	var sb = new StringBuffer();
	
	sb.append("<div class=\"budget_collect_title\" style=\"position:relative;z-index:100;\">");
	sb.append("<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">");

	//����״̬������չʾλ��
	sb.append("<tr>");
	sb.append("<td>")
	sb.append("<div id=\"other_div\"></div>");
	sb.append("</td>")   
	sb.append("</tr>");

	//��ť����
	sb.append("<tr>");
	sb.append("<td>")
	sb.append("<div id=\"query_t\" style=\"height:25px;\">").append("</div>");
	sb.append("</td>")   
	sb.append("</tr>");
	
	//���ܲ�ѯȥ
	sb.append("<tr>");
	sb.append("<td>")
	sb.append("<div id=\"func_query\"></div>");
	sb.append("</td>")   
	sb.append("</tr>");
	
	sb.append("</table>");
	sb.append("</div>");
	
	//��ʽ
	sb.append("<div id=\"form_table_title\">");
	sb.append("<ul>");
	sb.append("<li class=\"top\"><div id=\"form_table_title_content\">��Ϣ�б�</div></li>")
	
	//��ҳ����
	sb.append("<li style=\"float:right;\"><div id=\"pageable_div\"></div></li>");
	
	sb.append("</ul>");
	sb.append("</div>");
	
	//���ڲɼ�����ʾλ��
	sb.append("<div id=\"tablestyle_ifmis\" layout=\"{w:{fit:true},h:{fit:-100}}\"></div>");
	
	//������ʾ��˽��λ��
	sb.append("<div id=\"tableContainer_td\"> </div>");
	
	document.getElementById("template_main").innerHTML = sb.toString();
	
	//�������ܰ�ť��ע���¼�
	funcBtn = DataCommon.topbutton({"buttons":[
		{name:"add",title:"�����",action:"insertRow()",className:"budget_add"},
		{name:"del",title:"ɾ����",action:"deleteRow()",className:"budget_del"},
		{name:"save",title:"����",action:"savedatas()",className:"budget_save"},
		"p",
		{name:"audit",title:"�������",action:"dataAudit()",className:"budget_audit"},
		{name:"refresh",title:"����ˢ��",action:"dataRefresh()",className:"budget_search"},
		"p",
		{name:"expData",title:"��������",action:"expExcel()",className:"budget_export"},
		{name:"impData",title:"��������",action:"impExcel()",className:"budget_export"}
		//"p",
		//{name:"backUp",title:"����/�ָ�",action:"gotoBackupMenu()",className:"budget_save"},
		//{name:"compare",title:"���ݶԱ�",action:"gotoCompareMenu()",className:"budget_search"}
	]});
	
	funcBtn.draw("query_t");
	
	projectForm = new DataCommon.ProjectForm(config.funcHtml);
	projectForm.setTableStyle("queryview");
	
	projectForm.draw("func_query");

	projectForm.clickRefAfter = function(node){
		
		alert(Object.toJSON(node));
	}
	
	//������ҳ
	pageAble = new DataCommon.Pageable({
		"html":config.pageHtml,
		"queryData" : function(start,length){
			if(dataTable == null) return;
			
			var params = {};
			params["start"] = start;
			params["length"] = length;
			params["modelId"] = modelId;
			
			showdiv();
			var res = Ext.lt.RCP.asynserver('datacommon_otherform_service', 'getTableData',params);
			if(res.error){
				closediv();
				alert(res.error);
			}
			else{
				dataTable.getRecordSetObj().clear();
				dataTable.getRecordSetObj().addData(res.datas,0);
				dataTable.setKeyIds(res.keyIds);
				
				closediv();
				return res.pageHtml;
			}
		},
		"beforeQueryData" : function(start, length){

			if(dataTable.getModifyMark() && confirm("��ǰ����û�б���,�Ƿ����?")){
				
				savedatas();
			}
			dataTable.resetModifyMark();
		}
	});
	pageAble.draw("pageable_div");
	
}

function insertRow(){
	
	dataTable.insertRow({},dataTable.getTotalSize()+1);
}

function deleteRow(){
	
	dataTable.deleteRow();
}

//����
function savedatas(){
	//��ѯ����
	var queryData = projectForm.getData();
	if(queryData.error){
		alert(queryData.error);
		return;
	}
	
	//��У�������
	var error = dataTable.verifyMustCol();
	if(error && error.length>0){
		alert(error);
		return;
	}
	
	var dataArray = dataTable.getTableData();
	var keyIds = dataTable.getKeyIds();
	
	var params = {};
	params["tableCode"] = tableCode;
	params["datas"] = dataArray;
	params["queryData"] = queryData.data;
	params["keyIds"] = keyIds;
	
	showdiv();
	var resultData = Ext.lt.RCP.asynserver("datacommon_otherform_service", "saveOtherForm",params);
	if(resultData.error){
		closediv();
		alert(resultData.error);
	}
	else{
		dataTable.resetModifyMark();
		(pageAble != null) && (pageAble.refresh());
		
		closediv();
		alert("����ɹ�");
	}
}

function gotoBackupMenu(){
	var bdgAgency = projectForm.getValue("BDGAGENCY");
	
	if(!bdgAgency){
		alert("����ѡ��λ��");
		return;
	}
	jumpTo("/datacommon/backupcompare/backup.page?mainmenu=83000000&submenu=83003010","post",{"agencys":[bdgAgency],"tables":[tableCode],"isjump":"1","fromURL":"/datacommon/otherform/index.page?modelId="+modelId+"&isMenu=yes&mainmenu="+mainmenu+"&submenu="+menuId});
}
function gotoCompareMenu(){
	var bdgAgency = projectForm.getValue("BDGAGENCY");
	
	if(!bdgAgency){
		alert("����ѡ��λ��");
		return;
	}
	jumpTo("/datacommon/backupcompare/compare.page?isMenu=yes&mainmenu=83000000&submenu=83003020","post",{"agency":bdgAgency,"tablecode":tableCode,"isjump":"1","fromURL":"/datacommon/otherform/index.page?modelId="+modelId+"&isMenu=yes&mainmenu="+mainmenu+"&submenu="+menuId});
}

//�ر�֮�����
DataCommon.DataAudit.prototype.afterCloseAudit = function(dataAudit){
	
	$("#tablestyle_ifmis").height(tableContainerHeight);
}
//��ʾ֮ǰ����
DataCommon.DataAudit.prototype.beforeShowAudit = function(dataAudit){
	
	$("#tablestyle_ifmis").height(tableContainerHeight - dataAudit.divHeight + 50);
}

function dataAudit(){
	/*
	var treeObj = fillProject.getProjectTree();
	if(!treeObj || treeObj == null){
		alert("����ѡ������");
		return;
	}
*/
		
	var da = DataCommon.DataAudit(
		{"taskId":0,"bdgagencyId":0,"divId":"tableContainer_td"}
	);
	
	da = null;
}

function dataRefresh(){
	(pageAble != null) && (pageAble.refresh());
	
}
