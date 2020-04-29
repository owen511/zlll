var serverId = "", linkname = "";
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
	serverId = config.serverId;
	
	//��������
	linkname = window.location.pathname;
	linkname = linkname.substring(0,linkname.indexOf('/index.page')+"/index.page".length);
		
	//��ʼ������                       
	initLayout(config); 
	
	if(!DataCommon.DataTable){
		alert("���ȼ���extendDataTable.js��extendBaseTable.js�ļ�");
		return;
	}
	else{
		dataTable = new DataCommon.DataTable(config,{
			tableDivId : "tablestyle_ifmis",
			callback : {
				completedTable:function(opts, table, data){
				
					tableContainerHeight = $("#tablestyle_ifmis").height();
				}
			}
		});
		
	}
	
	setTimeout(function(){
		tableContainerHeight = $("#tablestyle_ifmis").height();
	},2000);
	
	(pageInitLayoutAfter != null) && pageInitLayoutAfter(config); 
	
	
	//�󶨻س��¼�
	$(document).keydown(function(e){
		if(e.keyCode==13){
		   
			(pageAble != null) && (pageAble.refresh());
		}
	});
	
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
	
	//Ext.lt.RCPConsole.processdownNotEncode(serverId, 'export2Excel', [tableCode,"1=1"]);
	
	function _getUrl(){
		var _url=Ext.lt.serverUrl;
		try{_url=_ROOT_PATH_;}catch(e){}
		return _url;
	}
	
	var iframe=document.getElementById("processdown");
	if(iframe==null){
		iframe=document.createElement("iframe");
		iframe.style.display ="none";
		iframe.id = "processdown";
		document.body.appendChild(iframe);
	}
	Ext.lt.RCPConsole.processserverNotEncode(serverId, 'export2Excel', [tableCode,"1=1"],
		function(rs){
			var url=_getUrl() + "/consoledown.rcp";
			iframe.src =url;
		},
		function(rs){
			rs && function(){
				rs = rs.replace("������������쳣��","");
				rs = rs.replace("E0-","");
				
				alert(rs);
			}();
		}
	)
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
	sb.append("<div id=\"query_t\" class=\"query_t\" style=\"height:25px;\">").append("</div>");
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
	sb.append("<div id=\"form_table_title\" layout=\"{w:{fit:true}\" >");
	sb.append("<ul>");
	sb.append("<li class=\"top\"><div id=\"form_table_title_content\">��Ϣ�б�</div></li>")
	
	//��ҳ����
	sb.append("<li style=\"float:right;\"><div id=\"pageable_div\"></div></li>");
	
	sb.append("</ul>");
	sb.append("</div>");
	
	//���ڲɼ�����ʾλ��
	sb.append("<div id=\"tablestyle_ifmis\" style=\"margin-left:10px;display:block;\" layout=\"{w:{fit:-10},h:{fit:-100}}\"></div>");
	
	//������ʾ��˽��λ��
	sb.append("<div id=\"tableContainer_td\"> </div>");
	
	document.getElementById("template_main").innerHTML = sb.toString();
	
	//�������ܰ�ť��ע���¼�
	funcBtn = DataCommon.topbutton({
		"buttons":[
			{name:"extraction",title:"������ȡ",action:"extractionData",className:"budget_search"},
			"p",
			{name:"add",title:"������",action:"insertRow",className:"budget_add"},
			{name:"del",title:"ɾ����",action:"deleteRow",className:"budget_del"},
			{name:"save",title:"����",action:"savedatas",className:"budget_save"},
			"p",
			{name:"audit",title:"����У��",action:"dataAudit",className:"budget_audit"},
			{name:"refresh",title:"����ˢ��",action:"dataRefresh",className:"budget_search"},
			"p",
			{name:"expData",title:"��������",action:"expExcel",className:"budget_export"}
			//{name:"impData",title:"��������",action:"impExcel",className:"budget_export"}
			//"p",
			//{name:"backUp",title:"����/�ָ�",action:"gotoBackupMenu",className:"budget_save"},
			//{name:"compare",title:"���ݶԱ�",action:"gotoCompareMenu",className:"budget_search"}
			],
		"serverId" : config.serverId	
		});
	
	funcBtn.draw("query_t");
	
	projectForm = new DataCommon.ProjectForm(config.funcHtml);
	projectForm.setTableStyle("queryview");
	
	projectForm.draw("func_query");

	/*
projectForm.clickRefAfter = function(node){
		
		alert(Object.toJSON(node));
	}
*/
	
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
			var res = Ext.lt.RCP.asynserver(serverId, 'getTableData',params);
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

			if(dataTable.getModifyMark() && confirm("��ǰ����û�б���,�Ƿ񱣴�����?")){
				
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
	var data = dataTable.getSelectedRows();
	if(!data || data.length == 0){
		alert("��ѡ��Ҫɾ�����У�");
		return;
	}
	
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
	var resultData = Ext.lt.RCP.asynserver(serverId, "saveOtherForm",params);
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
	
	$("#tablestyle_ifmis").height(tableContainerHeight - dataAudit.getDivHeight() + 50);
}

function dataAudit(){
		
	var da = DataCommon.DataAudit({
		"divId":"tableContainer_td",
		"tableCode":tableCode
	});
	
	return da.getAuditMark();
}

function dataRefresh(){
	(pageAble != null) && (pageAble.refresh());
}

//������ȡ
function extractionData(){
	
	if(confirm("������ȡ�Ḳ�ǲɼ��������ݣ��Ƿ������")){
		
		showdiv();
		Ext.lt.RCP.server(serverId,'extractionData',{"tableCode":tableCode},function(data){
			if(data.error){
				closediv();
				alert(data.error);
			}
			else{
				closediv();
				alert("������ȡ�ɹ���");
				jumpTo(""+linkname+"?mainmenu="+mainmenu+"&submenu="+menuId+"","post",{"modelId":modelId});
			}
		});
	}
}