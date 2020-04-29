var richEditor;
var wind;
function backup_list(config,service){
	var dt = null;
	var mainmenu = null;
	var submenu = null;
	//单位和查询条件默认值
	var agencys = [];
	var agencyNames = [];
	var tables = [];
	var tableNames = [];
	mainmenu = config.mainmenu;
	submenu = config.submenu;
	if(config.agencys == null || config.agencys.length == 0){
		//单位赋默认值，第一个结点为“全部单位”
//		agencys.push(config.allAgency.getData(0).itemid);
//		agencyNames.push(config.allAgency.getData(0).name);
	}else{
		agencys = config.agencys;
		for(var i = 0;i<config.allAgency.size();i++){
			if(agencys.indexOf(config.allAgency.getData(i).itemid)!=-1){
				agencyNames.push(config.allAgency.getData(i).name);
			}
		}
	}
	if(config.tables == null || config.tables.length == 0){
		//采集表赋默认值，第一个结点为“全部采集表”
//		tables.push(config.allTable.getData(0).code);
//		tableNames.push(config.allTable.getData(0).name);
	}else{
		tables = config.tables;
		for(var i = 0;i<config.allTable.size();i++){
			if(tables.indexOf(config.allTable.getData(i).code)!=-1){
				tableNames.push(config.allTable.getData(i).name);
			}
		}
	}
	//模拟数据
	var sb = new StringBuffer();
	sb.append("<div id=\"query_t\">");
	if(config.isjump!=null && config.isjump=='1'){
		sb.append("<span><button id=\"exit_btn\" type=\"button\" style=\"width:50px;\">返回</button></span>");
	}
	//单位选择下拉框  
	sb.append("<span><span >单位：</span></span>");
	sb.append("<span><input type=\"text\" readOnly=\"true\" id=\"form_backup_agency\" style=\"width:150px;cursor : pointer;\">");
	sb.append("</input></span>");
	//采集表选择下拉框
	sb.append("<span><span >采集表：</span></span>");
	sb.append("<span><input type=\"text\" readOnly=\"true\" id=\"form_backup_table\" style=\"width:150px;cursor : pointer;\">");
	sb.append("</input></span>");
	
	sb.append("<span><span id='findBackupBTN' title=\"查询备份\" class=\"query_btn\" ><a href=\"javascript:void(0)\">查询</a></span></span>");
	sb.append("<span><span id='doBackupBTN' title=\"备份所选采集表的当前数据\" class=\"save_btn\" ><a href=\"javascript:void(0)\">备份</a></span></span>");
	sb.append("<span><span id='delBackupBTN' title=\"删除选定备份\" class=\"del_btn\" ><a href=\"javascript:void(0)\">删除</a></span></span>");
	sb.append("<span><span id='backupDetailBTN' title=\"查看备份数据\" class=\"generationDaily_btn\" ><a href=\"javascript:void(0)\">查看备份数据</a></span></span>");
	sb.append("<span><span id='RestoreBackupBTN' title=\"恢复为备份的数据，将会覆盖当前数据\" class=\"flip_btn\" ><a href=\"javascript:void(0)\">恢复备份数据</a></span></span>");
	sb.append("<span><span id='backupCompareBTN' title=\"以选定备份为基准进行比较\" class=\"copyPlay_btn\" ><a href=\"javascript:void(0)\">历史数据对比</a></span></span>");
	sb.append("</div>");
	
	sb.append("<div id=\"form_table_title\">");
	sb.append("<ul><li class=\"top\"><div>备份信息</div></li></ul>");
	sb.append("</div>");
	sb.append("<div id=\"containerline20_d\">");
	sb.append("<div id='edit_table_div' style=\"width:100%;height:500px;display:block\"></div>");
	sb.append("</div>");
	sb.append("");
	
	sb.append('<div class="dialog_content" id="addRemarkWin" style="height:270px;width:630px;">');
	sb.append('      <table width="90%" class="form" style="margin:auto">');
	sb.append('		  <tr>');
	sb.append('		  	<td><label>备注</label>：</td>');
	sb.append('		  </tr>');
	sb.append('		  <tr>');
	sb.append('		     <td><textarea style="width:600px;height:200px;" id="remarkContent"></textarea></td> ');
	sb.append('		  </tr>');
	sb.append('       </table>');
	sb.append(' <div class="formbtns" align="center">');
	sb.append('    <button type="button" class="button_style" id="confirmBackupBTN">备份数据</button>');
	sb.append('    <button type="button" class="button_style" onclick="wind.close()">取消</button>');
	sb.append('  </div>');
	sb.append('</div>');
	
	document.getElementById("template_main").innerHTML = sb.toString();
	
	document.getElementById("template_main").attachEvent('onresize', function(){
		var titleHeight = document.getElementById("query_t").offsetHeight + document.getElementById("form_table_title").offsetHeight;
		document.getElementById('containerline20_d').style.height = document.getElementById("template_main").offsetHeight-titleHeight+'px';
		document.getElementById('edit_table_div').style.height = document.getElementById("template_main").offsetHeight-titleHeight-2+'px';
		document.getElementById('context').style.width = document.getElementById("main").offsetWidth+'px';
		document.getElementById('template_main').style.width = document.getElementById("main").offsetWidth-4+'px';
		document.getElementById('containerline20_d').style.width = document.getElementById("main").offsetWidth-30+'px';
		document.getElementById('edit_table_div').style.width = document.getElementById("main").offsetWidth-30+'px';
		if(dt != null){
			dt.resize(document.getElementById('edit_table_div').offsetWidth,document.getElementById('edit_table_div').offsetHeight);
		}
	});
	
	if(config.isjump!=null && config.isjump=='1'){
		document.getElementById("exit_btn").onclick=function(){
			jumpTo(config.fromURL,"post");
		}
	}
	
	wind = new Ext.lt.window({title:'填写备注',fitmode:'content',className:'wnd_ifmis',pop:true,autoshow:false});
	wind.draw(addRemarkWin);
	
	//功能按钮的点击事件--------------开始
	//单位下拉框
	document.getElementById("form_backup_agency").onclick=function(){
		showQtree2AgencyInput();
	}
	//采集表下拉框
	document.getElementById("form_backup_table").onclick=function(){
		showQtree2TableInput();
	}
	//查询按钮
	document.getElementById("findBackupBTN").onclick=function(){
		setTimeout(function(){
			findBackups();
		},100);
	}
	//备份按钮
	document.getElementById("doBackupBTN").onclick=function(){
		var values = getAgencyAndTableValue();
		if(values.tables.length == 0){
			alert('请选择单位和采集表！');
			return;
		}
		//先去除单位选项
		//values.agencys.length == 0
		wind.show();
		document.getElementById('remarkContent').value='';
	}
	//确认备份
	document.getElementById("confirmBackupBTN").onclick=function(){
		var remark = document.getElementById('remarkContent').value;;
		if(remark.length>120){
			alert('备注长度不能超过120个字符！');
			return;
		}
		wind.close();
		setTimeout(function(){
			doBackup();
		},100);
	}
	//删除按钮
	document.getElementById("delBackupBTN").onclick=function(){
		var datas = dt.getRecordSet().query({check:1});
		if(datas.length==0){
			alert("请选择一个要删除的备份！");
			return;
		}
		//if(datas[0].BACKUPTYPE=="1"){
		//	alert("自动备份的数据不可删除！");
		//	return;
		//}
		if(window.confirm("您是否要删除选中备份？")){
			deleteBackup(datas[0]["ID"]);
		}
	}
	//查看数据按钮
	document.getElementById("backupDetailBTN").onclick=function(){
		var datas = dt.getRecordSet().query({check:1});
		if(datas.length==0){
			alert("请选择一个要查看的备份！");
			return;
		}
		showBackupInfo(datas[0]["ID"]);
	}
	//恢复备份按钮
	document.getElementById("RestoreBackupBTN").onclick=function(){
		var datas = dt.getRecordSet().query({check:1});
		if(datas.length==0){
			alert("请选择一个要恢复的备份！");
			return;
		}
		if(window.confirm("您是否要将当前数据恢复到选中备份的状态（将会覆盖当前数据）？")){
			restoreBackup(datas[0]["ID"]);
		}
	}
	//数据对比按钮
	document.getElementById("backupCompareBTN").onclick=function(){
		var datas = dt.getRecordSet().query({check:1});
		if(datas.length==0){
			alert("请选择一个备份作为比较基准！");
			return;
		}
		jumpTo("/datacommon/backupcompare/compare.page?isMenu=yes&mainmenu=83000000&submenu=83003020","post",{"mainmenu":mainmenu,"submenu":submenu,"backupId":datas[0]["ID"],"tablecode":datas[0]["TABLECODE"],"isjump":"1","fromURL":"/datacommon/backupcompare/backup.page?mainmenu=83000000&submenu=83003010"});
	}
	//功能按钮点击事件定义------------结束
	
	/**
	 * 获取所选的单位和采集表的
	 */
	function getAgencyAndTableValue(){
		var values = new Object();
		values.agencys = [];
		values.tables = [];
		if(document.getElementById('form_backup_agency').ids != null && document.getElementById('form_backup_agency').ids.length > 0){
			values.agencys = document.getElementById('form_backup_agency').ids.split(',');
		}
		if(document.getElementById('form_backup_table').ids != null && document.getElementById('form_backup_table').ids.length > 0){
			values.tables  = document.getElementById('form_backup_table').ids.split(',');
		}
		return values;
	}
	
	
	/**
	 * 查询备份
	 */
	function findBackups(){
		var values = getAgencyAndTableValue();
		values.backupType = config.backupType;
		
		Ext.lt.RCP.server("datacommon_backup_service", "listBackup",[values.agencys,values.tables,values.backupType],function(resp){
			reLoadBackupTable(resp);
		});
	}
	//备份数据
	function doBackup(){
		var values = getAgencyAndTableValue();
		values.remark = document.getElementById('remarkContent').value;
		
		if(values.tables.length == 0){
			alert('请选择单位和采集表！');
			return;
		}
		//values.agencys.length == 0
		values.menuId = submenu;
		values.backupType = config.backupType;
		values.productType = config.productType;
		
		showdiv();
		Ext.lt.RCPConsole.tipsserver("datacommon_backup_service", "doBackup",values,function(resp){
			if(resp.success){
				var s = [];
				for(var i=0;i<resp.msg.length;i++){
					s.push(resp.msg[i]);
					if(i<resp.msg.length-1){
						s.push('\n');
					}
				}
				alert(s.join(''));
				findBackups();
			}
			closediv();
		},function(resp){
			alert("请求失败！");
			closediv();
		});
	}
	//删除备份
	function deleteBackup(id){
		showdiv();
		Ext.lt.RCP.server("datacommon_backup_service", "deleteBackup",id,function(resp){
			if(resp == 'true'){
				alert('删除成功！');
				findBackups();
			}else{
				alert('删除失败！');
			}
			closediv();
		},function(){
			alert("请求失败！");
			closediv();
		});
	}
	//查询备份详细信息
	function showBackupInfo(id){
		var values = getAgencyAndTableValue();
		
		var params = {};
		params["backupId"] = id;
		params["agencys"] = values.agencys;
		params["tables"] = values.tables;
		params["productType"] = config.productType;
		params["backupType"] = config.backupType;
		
		jumpTo("/datacommon/backupcompare/showbackup.page?isMenu=yes&mainmenu="+mainmenu+"&submenu="+submenu,"post",params);
	}
	//恢复备份
	function restoreBackup(id){
		showdiv();
		var values = getAgencyAndTableValue();
		Ext.lt.RCP.server("datacommon_backup_service", "restoreBackup",[id,values.agencys],function(resp){
			if(resp.success){
				alert('恢复成功！');
			}else{
				alert(resp.msg);
			}
			closediv();
		},function(){
			alert("请求失败！");
			closediv();
		});
	}
	//加载备份列表数据
	function reLoadBackupTable(rsData){
		rs=dt.getRecordSet();
		rs.clear();
		rs.setData(rsData);
		dt.reflash();
	}
	//获取元素纵坐标
	function getTop(e){
		var offset=e.offsetTop; 
		if(e.offsetParent!=null) offset+=getTop(e.offsetParent); 
		return offset; 
	}
	//获取元素的横坐标 
	function getLeft(e){
		var offset=e.offsetLeft; 
		if(e.offsetParent!=null) offset+=getLeft(e.offsetParent); 
		return offset; 
	}
	
	function showQtree2AgencyInput(){
		var divID = 'form_backup_agency_drop_div';
		var targetDiv = document.getElementById(divID);
		if(targetDiv == null){
			targetDiv = _initTreeDiv(divID,config.allAgency,agencys,'#name');
		}
		targetDiv.style.top=(getTop(document.getElementById('form_backup_agency'))+18)+'px';
		targetDiv.style.left=getLeft(document.getElementById('form_backup_agency'))+'px';
		targetDiv.setValue2Input = function(){
			var nodes = targetDiv.tree.getSelected();
			var ids = new StringBuffer();
			var names = new StringBuffer();
			for(var i=0;i<nodes.length;i++){
				ids.append(nodes[i].itemid+'');
				names.append(nodes[i].name+'');
				if(i<nodes.length-1){
					ids.append(',');
					names.append(',');
				}
			}
			document.getElementById('form_backup_agency').value = names.toString();
			document.getElementById('form_backup_agency').ids = ids.toString();
		}
		
		function exitAGClickFN(){
			var div = document.getElementById(divID);
			if(!div.contains(window.event.srcElement)){
				//点击其他区域，关闭下拉框，取值
				if(div.style.visibility=='visible'){
					div.setValue2Input();
				}
				div.style.visibility='hidden';
				document.body.detachEvent("onclick",exitAGClickFN);
			}
		}
		window.event.cancelBubble =  true;
		document.body.attachEvent("onclick",exitAGClickFN);
		targetDiv.style.visibility='visible';
		if(document.getElementById('form_backup_table_drop_div')!=null){
			document.getElementById('form_backup_table_drop_div').style.visibility='hidden';
			document.getElementById('form_backup_table_drop_div').setValue2Input();
		}
	}
	function showQtree2TableInput(datas){
		var divID = 'form_backup_table_drop_div';
		var targetDiv = document.getElementById(divID);
		if(targetDiv == null){
			targetDiv = _initTreeDiv(divID,config.allTable,tables,'#name');
		}
		targetDiv.style.top=(getTop(document.getElementById('form_backup_table'))+18)+'px';
		targetDiv.style.left=getLeft(document.getElementById('form_backup_table'))+'px';
		targetDiv.setValue2Input = function(){
			var nodes = targetDiv.tree.getSelected();
			var ids = new StringBuffer();
			var names = new StringBuffer();
			for(var i=0;i<nodes.length;i++){
				ids.append(nodes[i].code+'');
				names.append(nodes[i].name+'');
				if(i<nodes.length-1){
					ids.append(',');
					names.append(',');
				}
			}
			document.getElementById('form_backup_table').value = names.toString();
			document.getElementById('form_backup_table').ids = ids.toString();
		}
		
		function exitTABClickFN(){
			var div = document.getElementById(divID);
			if(!div.contains(window.event.srcElement)){
				//点击其他区域，关闭下拉框，取值
				if(div.style.visibility=='visible'){
					div.setValue2Input();
				}
				div.style.visibility='hidden';
				document.body.detachEvent("onclick",exitTABClickFN);
			}
		}
		window.event.cancelBubble =  true;
		document.body.attachEvent("onclick",exitTABClickFN);
		targetDiv.style.visibility='visible';
		if(document.getElementById('form_backup_agency_drop_div')!=null){
			document.getElementById('form_backup_agency_drop_div').style.visibility='hidden';
			document.getElementById('form_backup_agency_drop_div').setValue2Input();
		}
	}
	//初始化div
	function _initTreeDiv(divID,datas,values,disptype){
		var targetDiv = document.createElement('DIV');
		var tree = null;
		targetDiv.id=divID;
		targetDiv.style.backgroundColor = '#FFFFFF';
		targetDiv.style.border='#99bbe8 solid 1px';	
		targetDiv.style.height='340px';
		targetDiv.style.width='260px';
		targetDiv.style.visibility='visible';
		targetDiv.style.position='absolute';
		document.body.appendChild(targetDiv);
		
		tree=new Ext.lt.Qtree({
			data:datas,
			linkchild:true,
			showRootNode:true,
			outformart:disptype,
			selectmode:'n',
			values:values
		});
		tree.expandlevel(1);
		tree.draw(targetDiv);
		
		targetDiv.tree = tree;
		return targetDiv;
	}
	//构造datatable
	dt = new Ext.lt.datatable(config.data);
	var tableCodeArr = [];
	for(var i=0;i<config.allTable.size();i++){
		var tempArr = [];
		tempArr.push(config.allTable.getData(i).code);
		tempArr.push(config.allTable.getData(i).name);
		tableCodeArr.push(tempArr);
	}

	dt.setCols([
			dt.columns.seq,
			dt.columns.radio,
			{name:'ID',alias:'备份标识',datatype:'S'},
			{name:'TABLECODE',alias:'备份表名',datatype:'S',mapper:{columns:['code','name'],datas:tableCodeArr},format:'#name'},
			{name:'TIME',alias:'备份时间',datatype:'S'},
			{name:'BATCHNO',alias:'备份批次',datatype:'S'},
			{name:'BACKUPTYPE',alias:'是否自动备份',datatype:'S',mapper:{columns:['code','name'],datas:[['1','是'],['0','否']]},format:'#name'},
			{name:'REMARK',alias:'备注',datatype:'S'}
	]);
	dt.setClassName("dttheme_budget");
	dt.setAlign("left");
	dt.mousedrag(false);
	dt.setHiddenColumn("EMPTY");
	dt.setAllowClock(false);
	dt.setAllowcustom(false);
	//绘制表格
	dt.draw(edit_table_div);
	//赋默认值
	document.getElementById('form_backup_agency').ids = agencys.join(',');
	document.getElementById('form_backup_agency').value = agencyNames.join(',');
	document.getElementById('form_backup_table').ids = tables.join(',');
	document.getElementById('form_backup_table').value = tableNames.join(',');
	if(config.isjump=='1'){
		document.getElementById('form_backup_table').disabled = true;
	}
//	findBackups();
}