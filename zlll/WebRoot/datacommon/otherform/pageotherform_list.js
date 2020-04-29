var serverId = "", linkname = "";
var modifyFlag = "";//判断是否有修改权限
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
	
	//处理链接
	linkname = window.location.pathname;
	linkname = linkname.substring(0,linkname.indexOf('/index.page')+"/index.page".length);
		
	//初始化布局                       
	initLayout(config); 
	
	if(!DataCommon.DataTable){
		alert("请先加载extendDataTable.js和extendBaseTable.js文件");
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
	
	
	//绑定回车事件
	$(document).keydown(function(e){
		if(e.keyCode==13){
		   
			(pageAble != null) && (pageAble.refresh());
		}
	});
	
}


//导入数据
function impExcel(){
	var params = []; 
	params.push("tablecode="+tableCode);
	params.push("condition=1=1");
	
	fileUpload = new FileUploadProject(params,"*.xls",function(data,attachItemid){
		
		// 刷新页面
	},"/datacommon/excelbase/index");	
}

//导出数据
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
				rs = rs.replace("组件服务运行异常！","");
				rs = rs.replace("E0-","");
				
				alert(rs);
			}();
		}
	)
} 

/**
 * 初始化界面布局
 */
function initLayout(config){
	var sb = new StringBuffer();
	
	sb.append("<div class=\"budget_collect_title\" style=\"position:relative;z-index:100;\">");
	sb.append("<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">");

	//数据状态，金额等展示位置
	sb.append("<tr>");
	sb.append("<td>")
	sb.append("<div id=\"other_div\"></div>");
	sb.append("</td>")   
	sb.append("</tr>");

	//按钮区域
	sb.append("<tr>");
	sb.append("<td>")
	sb.append("<div id=\"query_t\" class=\"query_t\" style=\"height:25px;\">").append("</div>");
	sb.append("</td>")   
	sb.append("</tr>");
	
	//功能查询去
	sb.append("<tr>");
	sb.append("<td>")
	sb.append("<div id=\"func_query\"></div>");
	sb.append("</td>")   
	sb.append("</tr>");
	
	sb.append("</table>");
	sb.append("</div>");
	
	//样式
	sb.append("<div id=\"form_table_title\" layout=\"{w:{fit:true}\" >");
	sb.append("<ul>");
	sb.append("<li class=\"top\"><div id=\"form_table_title_content\">信息列表</div></li>")
	
	//分页区域
	sb.append("<li style=\"float:right;\"><div id=\"pageable_div\"></div></li>");
	
	sb.append("</ul>");
	sb.append("</div>");
	
	//用于采集表显示位置
	sb.append("<div id=\"tablestyle_ifmis\" style=\"margin-left:10px;display:block;\" layout=\"{w:{fit:-10},h:{fit:-100}}\"></div>");
	
	//用于显示审核结果位置
	sb.append("<div id=\"tableContainer_td\"> </div>");
	
	document.getElementById("template_main").innerHTML = sb.toString();
	
	//创建功能按钮并注册事件
	funcBtn = DataCommon.topbutton({
		"buttons":[
			{name:"extraction",title:"数据提取",action:"extractionData",className:"budget_search"},
			"p",
			{name:"add",title:"添加行",action:"insertRow",className:"budget_add"},
			{name:"del",title:"删除行",action:"deleteRow",className:"budget_del"},
			{name:"save",title:"保存",action:"savedatas",className:"budget_save"},
			"p",
			{name:"audit",title:"数据校验",action:"dataAudit",className:"budget_audit"},
			{name:"refresh",title:"数据刷新",action:"dataRefresh",className:"budget_search"},
			"p",
			{name:"expData",title:"导出数据",action:"expExcel",className:"budget_export"}
			//{name:"impData",title:"导入数据",action:"impExcel",className:"budget_export"}
			//"p",
			//{name:"backUp",title:"备份/恢复",action:"gotoBackupMenu",className:"budget_save"},
			//{name:"compare",title:"数据对比",action:"gotoCompareMenu",className:"budget_search"}
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
	
	//创建分页
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

			if(dataTable.getModifyMark() && confirm("当前数据没有保存,是否保存后继续?")){
				
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
		alert("请选择要删除的行！");
		return;
	}
	
	dataTable.deleteRow();
}

//保存
function savedatas(){
	//查询区域
	var queryData = projectForm.getData();
	if(queryData.error){
		alert(queryData.error);
		return;
	}
	
	//现校验必填项
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
		alert("保存成功");
	}
}

function gotoBackupMenu(){
	var bdgAgency = projectForm.getValue("BDGAGENCY");
	
	if(!bdgAgency){
		alert("请先选择单位！");
		return;
	}
	jumpTo("/datacommon/backupcompare/backup.page?mainmenu=83000000&submenu=83003010","post",{"agencys":[bdgAgency],"tables":[tableCode],"isjump":"1","fromURL":"/datacommon/otherform/index.page?modelId="+modelId+"&isMenu=yes&mainmenu="+mainmenu+"&submenu="+menuId});
}
function gotoCompareMenu(){
	var bdgAgency = projectForm.getValue("BDGAGENCY");
	
	if(!bdgAgency){
		alert("请先选择单位！");
		return;
	}
	jumpTo("/datacommon/backupcompare/compare.page?isMenu=yes&mainmenu=83000000&submenu=83003020","post",{"agency":bdgAgency,"tablecode":tableCode,"isjump":"1","fromURL":"/datacommon/otherform/index.page?modelId="+modelId+"&isMenu=yes&mainmenu="+mainmenu+"&submenu="+menuId});
}

//关闭之后调用
DataCommon.DataAudit.prototype.afterCloseAudit = function(dataAudit){
	
	$("#tablestyle_ifmis").height(tableContainerHeight);
}
//显示之前调用
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

//数据提取
function extractionData(){
	
	if(confirm("数据提取会覆盖采集表的数据，是否继续？")){
		
		showdiv();
		Ext.lt.RCP.server(serverId,'extractionData',{"tableCode":tableCode},function(data){
			if(data.error){
				closediv();
				alert(data.error);
			}
			else{
				closediv();
				alert("数据提取成功！");
				jumpTo(""+linkname+"?mainmenu="+mainmenu+"&submenu="+menuId+"","post",{"modelId":modelId});
			}
		});
	}
}
