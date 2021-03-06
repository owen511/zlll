var mainmenu = null;
var menuid = null;

var qtree = null;
var _qtree = null;
var usertable = null;
var consoletable = null;
var datatable = null;
var subdatatable = null;

var userdata = null;       //处室用户
var usergroup = null;      //用户组
var consolegroup = null;   //控制组
var productData = null;    //产品类型

var form_content_wind = null;
var userCode = null;
var consoleName = null;
var consoleCode = null;
var userStatus = null;
var formtag = null;
var mainArray = [];
var formId = null;

var officesrule_list = function(config, service) {
	mainmenu = config.mainmenu;
	menuid = config.menuid;
	
	userdata = config.userData;
	usergroup = config.userGroup;
	consolegroup = config.consoleGroup;
	productData = config.productList;          
	
	//初始化主页面 
	initLayoutMain(config);	
	
	qtree = new Ext.lt.Qtree({
		data : userdata,
		linkchild : true,
		linkparend : true,
		parentlinksub : true,
		showRootNode : true,
		selectmode : 'n',
		outformart : '#code-#name'
	});
	qtree.draw(treeDiv);	
	
	//树的查询方法
	$("#selectInput").keyup(function(){		
		qtree.searchnode([{field:'code',values:[this.value.trim()]},{field:'name',values:[this.value.trim()]}],'contain');
		
		if(!this.value.trim()) qtree.clearSelected();
	}).keyup();
	
	qtree.on({
		nodeclick : function(tree, param) {
			var selNode = param.data;
			if (selNode.isleaf != 0) {
				var params = {};
				params['userid'] = selNode.itemid;
				params['menuid'] = menuid;
				
				Ext.lt.RCP.server("datacommon_officesrule_service", "getUserAndConsoleGroup", params, function(data) {
					if (data != null && data.result != null) {
						var code = data.result.toArray();		
						var userarr = usertable.getRecordSet().toArray();
						var consolearr = consoletable.getRecordSet().toArray();
						
						for(var i = 0; i < userarr.length; i++){
							userarr[i]["check"] = 0;
						}
						for(var i = 0; i < consolearr.length; i++){
							consolearr[i]["check"] = 0;
						}
						if(code.length != 0){
						var userdatas = usertable.getRecordSet().query({USERCODE:code[0].USERCODE}); 
						var consoledatas = consoletable.getRecordSet().query({CONSOLECODE:code[0].CONSOLECODE});
									   
						if(userdatas&&consoledatas){
						userdatas[0]["check"] = 1; 
						consoledatas[0]["check"] = 1;					
						}
						}
						usertable.reflash();
						consoletable.reflash();
					}
						},function(){
							alert('错误!');	
						});
			}
		}
	});
	
	var usernode = function(td,el,l,c,d){
		var _val = $(el).find("input[type=radio]:checked");
		var name = usertable.getCol(c).name;
		userName = d['USERNAME'];
		userCode = d['USERCODE'];
		$("#username").val(userName);
		if(name == 'USERNAME'){       
		   copyuser(1);
		}
	}
	
	var consolenode = function(td,el,l,c,d){      
		var _val = $(el).find("input[type=radio]:checked");
		var name = consoletable.getCol(c).name;
		consoleName = d['CONSOLENAME'];
		consoleCode = d['CONSOLECODE'];
		$("#consolename").val(consoleName);
		if(name == 'CONSOLENAME'){   
		   copyfrom(1);
		}
	}
	
	 usertable = new Ext.lt.datatable35(usergroup);  
	    usertable.setCols([
		usertable.columns.seq,
		usertable.columns.radio,
		{name:'USERNAME',alias:'单位分类',width:400,datatype:'S'}
		]);	
	    usertable.setEditSelectCheckbox(false);		
	    usertable.setMouselight('#597EAA');
	    usertable.mousedrag(false);
	    usertable.setClassName('dttheme_ifmis');	
	    usertable.setAlign("left");
	    usertable.setAllowClock(false);	
	    usertable.onEvent('onclick',usernode);
	    usertable.setLayout();
	    usertable.draw(usergroupDiv);     				
	 
	 consoletable = new Ext.lt.datatable35(consolegroup);
	    consoletable.setCols([
		consoletable.columns.seq,
		consoletable.columns.radio,
		{name:'CONSOLENAME',alias:'控制组',width:400,datatype:'S'}
		]);	
	    consoletable.setEditSelectCheckbox(false);		
	    consoletable.setMouselight('#597EAA');
	    consoletable.mousedrag(false);
	    consoletable.setClassName('dttheme_ifmis');	
	    consoletable.setAlign("left");
	    consoletable.setAllowClock(false);	
	    consoletable.onEvent('onclick',consolenode);
	    consoletable.setLayout();
	    consoletable.draw(consolegroupDiv);     
	    
	    //新增单位分类弹出窗
	    tree_content_wind = new Ext.lt.window({title:'用户组设置',fitmode:'content',className:'wind7',mark:true,autoshow:true,pop:true,w:425,h:400});
		tree_content_wind.draw(tree_content);
		$("#tree_content").show();	
		tree_content_wind.hidden();
		
		//新增采集表控制组弹出窗
		form_content_wind = new Ext.lt.window({title:'控制组设置',fitmode:'content',className:'wind7',mark:true,autoshow:true,pop:true,w:425,h:400});
		form_content_wind.draw(form_content);
		$("#form_content").show();
		form_content_wind.hidden();
		
		//新增采集表控制组列要素弹出窗
		form_subdata_wind = new Ext.lt.window({title:'要素设置',fitmode:'content',className:'wind7',mark:true,autoshow:true,pop:true,w:425,h:400});
		form_subdata_wind.draw(form_subdata);
		$("#form_subdata").show();
		form_subdata_wind.hidden();
}

//初始化主页面
function initLayoutMain(config){
	var sb = new StringBuffer();
	
	 var productBuffer = new StringBuffer();
	    var rowData;
		for(var j = 0;j<productData.length;j++){
			rowData = productData[j];
			if(j==0){
				producttype = rowData.PRODUCTS;
			}
			productBuffer.append("<option value = \""+rowData.PRODUCTS+"\">"+rowData.NAME+"</option>");	
		}
	
	sb.append("<table align='center' width=\"100%\"  border=\"0\">");
	sb.append("<tr><td valign=\"top\" width=\"20%\">");
	sb.append("<div style=\"position:relative;z-index:100;\">");
	sb.append("<input type=\"text\" style=\"width:99%;\" id=\"selectInput\" value=\"\">");
    sb.append("</div>");
	sb.append("</td>");
	sb.append("<td width=\"40%\">");
	sb.append("<div class=\"budget_title\" style=\"position:relative;z-index:100;\">");
	sb.append("<span style=\"vertical-align:middle;\" onmouseover=\"this.className='budget_over'\" onmouseout=\"this.className=''\"><button class=\"budget_clear\" id=\"btn_unBdgagency01\" onclick=\"dosave()\">保存</button></span>");
	sb.append("<span style=\"vertical-align:middle;\" onmouseover=\"this.className='budget_over'\" onmouseout=\"this.className=''\"><button class=\"budget_clear\" id=\"btn_unBdgagency02\" onclick=\"copyuser(0)\">新增单位分类</button></span>");
	sb.append("<span style=\"vertical-align:middle;\" onmouseover=\"this.className='budget_over'\" onmouseout=\"this.className=''\"><button class=\"budget_clear\" id=\"btn_unBdgagency02\" onclick=\"copyfrom(0)\">新增采集表控制组</button></span>");
	sb.append("<span style=\"vertical-align:middle;\" onmouseover=\"this.className='budget_over'\" onmouseout=\"this.className=''\"><button class=\"budget_clear\" id=\"btn_unBdgagency02\" onclick=\"delUser()\">删除单位分类</button></span>");
	sb.append("</div>");
	sb.append("</td>");
	sb.append("<td width=\"40%\">");
	sb.append("<div class=\"budget_title\" style=\"position:relative;z-index:100;\">");
	sb.append("<span style=\"vertical-align:middle;\" onmouseover=\"this.className='budget_over'\" onmouseout=\"this.className=''\"><button class=\"budget_clear\" id=\"btn_unBdgagency02\" onclick=\"delForm()\">删除控制组</button></span>");
	sb.append("<span>产品类型：");
	sb.append("<select id=\"producttype\" size = \"1\" style= \"width:160px;\">");
	sb.append(productBuffer.toString());
	sb.append("</select></span>");
	sb.append("</div>");
	sb.append("</td>");
	sb.append("</tr>");
	sb.append("<tr>");
	sb.append("<td valign=\"top\">");
	sb.append("<div id=\"treeDiv\" layout=\"{h:{fit:-25}}\" style=\"background:#fff;border:1px solid #ccc;padding:0px; overflow:auto;height:550px;width:100%;\"></div>");
	sb.append("</td>");
	sb.append("<td valign=\"top\">");
	sb.append("<div id='usergroupDiv' layout=\"{w:{fit:-738},h:{fit:-25}}\" style=\"background:#fff;border:1px solid #ccc;padding:0px; overflow:auto;height:550px;width:100%;\"></div>");
	sb.append("</td>");
	sb.append("<td valign=\"top\">");
	sb.append("<div id='consolegroupDiv' layout=\"{h:{fit:-25}}\" style=\"background:#fff;border:1px solid #ccc;padding:0px; overflow:auto;height:550px;width:100%;\"></div>");
	sb.append("</td>");
	sb.append("</tr>");
	sb.append("</table>");
	
	sb.append("<div id=\"tree_content\" style=\"display:none;\" >");
	sb.append("<div style=\"margin-left:2%;height:20px;\">");
	sb.append("用户组名称：<input type=\"text\" id=\"username\"></input>");
	sb.append("</div>");
	sb.append("<div style=\"width:425px;height:380px;\">");
	sb.append("<div id='tree_content02' style=\"width:99%;height:375px;overflow:scroll;position:absolute;background-color:#FCFCFC;border:1px solid #ccc;\">");
	sb.append("</div>");
	sb.append("</div>");
	sb.append("<div style=\"margin-left:40%;\">");
	sb.append("<input type=\"button\" value=\"保 存\" onclick=\"dosavetree()\"></input>");
	sb.append("<input type=\"button\" value=\"取 消\" onclick=\"tree_content_wind.hidden();\"></input>");
	sb.append("</div>");
	sb.append("</div>");
	
	sb.append("<div id=\"form_content\" style=\"display:none;\" >");
	sb.append("<div style=\"margin-left:2%;height:20px;\">");
	sb.append("控制组名称：<input type=\"text\" id=\"consolename\"></input>");
	sb.append("</div>");
	sb.append("<div style=\"width:425px;height:380px;\">");
	sb.append("<div id='form_content02' style=\"width:99%;height:375px;overflow:scroll;position:absolute;background-color:#FCFCFC;border:1px solid #ccc;\">");
	sb.append("</div>");
	sb.append("</div>");
	sb.append("<div style=\"margin-left:40%;\">");
	sb.append("<input type=\"button\" value=\"保 存\" onclick=\"dosaveform()\"></input>");
	sb.append("<input type=\"button\" value=\"取 消\" onclick=\"form_content_wind.hidden();\"></input>");
	sb.append("</div>");
	sb.append("</div>");
	
	sb.append("<div id=\"form_subdata\" style=\"display:none;\" >");
	sb.append("<div style=\"width:425px;height:400px;\">");
	sb.append("<div id='form_subdata02' style=\"width:99%;height:375px;overflow:scroll;position:absolute;background-color:#FCFCFC;border:1px solid #ccc;\">");
	sb.append("</div>");
	sb.append("</div>");
	sb.append("<div style=\"margin-left:40%;\">");
	sb.append("<input type=\"button\" value=\"保 存\" onclick=\"dosavesubdata()\"></input>");
	sb.append("<input type=\"button\" value=\"取 消\" onclick=\"form_subdata_wind.hidden();\"></input>");
	sb.append("</div>");
	sb.append("</div>");
	
	document.getElementById("template_main").innerHTML = sb.toString();
}

//新增单位分类
function copyuser(tag){	
    if(tag == 0){
    	userCode = null;
    	$("#username").val("");
	 }
	var params = {};
	params['menuid'] = menuid;
	params['userCode'] = userCode;
	userStatus = tag;  
	
	Ext.lt.RCP.server("datacommon_officesrule_service", "getBdgagencyData",params,function(data){
			tree_content_wind.show();    
			_qtree = new Ext.lt.Qtree({
				data : data.result,
				linkchild : true,
				linkparend : true,
				parentlinksub : true,
				showRootNode : true,
				selectmode : 'n',
				values : data.checkBdgagency,
				outformart : '#code-#name'
			});
			_qtree.draw(tree_content02);	
			},function(){
		alert('错误!');	
		});
}

//新增采集表控制组
function copyfrom(tag){	
	formtag = tag;
	mainArray = [];
	
	if(tag == 1){
		var params = {};
		params['menuid'] = menuid;
		params['consoleCode'] = consoleCode;
	Ext.lt.RCP.server("datacommon_officesrule_service", "getFromData",params,function(data){
		if (data != null && data.result != null) {
		form_content_wind.show(); 
		if(!datatable){
			tableView(data.result, form_content02);
		} else {
			var datas = datatable.getRecordset();
			datas.clear();
			datas.addData(data.result.toArray());
		}
		} else {
			alert("该控制组对应的采集表设置不存在，请查看！");
		}
		},function(){
		alert('错误!');	
		});
	} else {
		$("#consolename").val("");
		var params = {};
		params['product'] = $("#producttype").val();
	Ext.lt.RCP.server("datacommon_officesrule_service", "getMainList",params,function(data){
			form_content_wind.show();
			if(!datatable){	
				tableView(data.mainList, form_content02);
			} else {
				var datas = datatable.getRecordset();
				datas.clear();
				datas.addData(data.mainList.toArray());
			}
			},function(){
		alert('错误!');	
		});
	}
}

//删除单位分类
function delUser(){
	var datas = usertable.getRecordSet().query({check:1});
	if(!userCode){
		alert("请先选择用户组!");
		return;
	}	
	
	if(window.confirm("将会删除选中单位分类及和单位分类有关的配置，确认是否删除选中单位分类？")){
	var params = {};
	params['menuid'] = menuid;
	params['userCode'] = userCode;
	
	Ext.lt.RCP.server("datacommon_officesrule_service", "deleteUserGroup",params,function(data){
		if (data != null && data.result == 1) {
			usertable.getRecordSet().remove(datas);
			alert("单位分类删除成功！");
		} else {
			if (data.message != null) {
				alert(data.message);
			} else {
				alert("删除单位分类失败，请联系管理员！");
			}
		}
			},function(){
				alert('错误!');	
			});
	}
}

//删除控制组
function delForm(){
	var datas = consoletable.getRecordSet().query({check:1});
	if(!consoleCode){
		alert("请先选择控制组!");
		return;
	}	
	
	if(window.confirm("将会删除选中控制组及控制组有关的配置，确认是否删除选中控制组？")){
	var params = {};
	params['menuid'] = menuid;
	params['consoleCode'] = consoleCode;  
	
	Ext.lt.RCP.server("datacommon_officesrule_service", "deleteConsoleGroup",params,function(data){
		if (data != null && data.result == 1) {
			consoletable.getRecordSet().remove(datas);
			alert("控制组删除成功！");
		} else {
			if (data.message != null) {
				alert(data.message);
			} else {
				alert("删除控制组失败，请联系管理员！");
			}
		}
	},function(){
		alert('错误!');	
	});
	}
}

//保存用户组
function dosavetree(){
	var name = $("#username").val();
	if(name.length == 0){
		alert("请输入单位分类名称！");
		return;
	}
	
	var leafitemid = getQTreeLeafId(_qtree);
	var bdgagencyIdes = leafitemid.join(",");
	
	var params = {};
	params['bdgagency'] = bdgagencyIdes;
	params['menuid'] = menuid;
	params['username'] = name;
	params['userCode'] = userCode;
	params['status'] = userStatus;
	
	Ext.lt.RCP.server("datacommon_officesrule_service", "saveUserGroup",params,function(data){
		if (data != null && data.result == 1) {
			alert("单位分类设置成功！");
			var params = {};
			jumpTo("/datacommon/officesrule/index.page?mainmenu=" + mainmenu
					+ "&submenu=" + menuid + "", "post", params);
		} else {
			if (data.message != null) {
				alert(data.message);
			} else {
				alert("设置单位分类失败，请联系管理员！");
			}
		}
	},function(){
		alert('错误!');	
	});
}

//保存控制组
function dosaveform(){
	var consolename = $("#consolename").val();
	if (consolename == null || consolename == "") {
		alert("请输入控制组名称!");
		return;
	}
	
	var mainarrays = datatable.getRecordset().toArray();
	
	var params = {};
	params['mainarrays'] = JSON.stringify(mainarrays);
	params['subarrays'] = JSON.stringify(mainArray);  
	params['menuid'] = menuid;
	params['consoleName'] = consolename;
	params['code'] = consoleCode;
	params['formtag'] = formtag;
	
	Ext.lt.RCP.server("datacommon_officesrule_service", "saveConsoleGroup",params,function(data){
		if (data != null && data.result == 1) {
		alert("控制组设置成功！");
		var params = {};
		jumpTo("/datacommon/officesrule/index.page?mainmenu=" + mainmenu
				+ "&submenu=" + menuid + "", "post", params);
		} else {
			if (data.message != null) {
				alert(data.message);
			} else {
				alert("设置控制组失败，请联系管理员！");
			}
		}
	},function(){
		alert('错误!');	
	});
}

//保存要素
function dosavesubdata(){
	var array = [];
	var datas = subdatatable.getRecordset();
	array = datas.toArray();
	for(var i = 0; i < array.length; i++){
		array[i]['FORMID'] = formId;
	}
	for(var i = 0; i < mainArray.length; i++){
		if(mainArray[i][0].FORMID == array[0].FORMID){
			mainArray.splice(i, 1);
		}
	}
	mainArray.push(array); 
	form_subdata_wind.hidden();
}

//保存用户组和控制组对应关系
function dosave(){
	var datas = usertable.getRecordset().query({check:1});
	var userdata = consoletable.getRecordset().query({check:1});
	
	if (datas.length == 0) {
		alert("请选择单位分类！");
		return;
	}
	if (userdata.length == 0) {
		alert("请选择控制组！");
		return;
	}
	
	var userData = qtree.getSelected();
	if (userData.length == 0) {
		alert("请选择用户！");
		return;
	}
	var itemids = [];
	var j = 0;
	if (userData.length > 0) {
		for ( var i = 0; i < userData.length; i++) {
			if (userData[i].isleaf == '1') {
				itemids[j] = userData[i].itemid;
				j++;
			}
		}
	}
	var userIdes = itemids.join(",");
	
	var params = {};
	params['userarrays'] = userIdes;
	params['menuid'] = menuid;
	params['userCode'] = datas[0].USERCODE;
	params['consoleCode'] = userdata[0].CONSOLECODE;
	
	Ext.lt.RCP.server("datacommon_officesrule_service", "saveConsoleAndUserGroup",params,function(data){
		if (data != null && data.result == 1) {
			alert("处室采集表权限设置成功！");
		} else {
			if (data.message != null) {
				alert(data.message);
			} else {
			alert("处室采集表权限设置失败，请联系管理员！");
			}
		}
	},function(){
		alert('错误!');	
	});
}

//获取Qtree叶子节点的主键值
function getQTreeLeafId(bdgagencytree) {
	var selectNode = bdgagencytree.getSelected();
	if (selectNode.length == 0) {
		alert("请选择单位分类对应的单位！");
		return;
	}
	var itemids = [];
	var j = 0;
	if (selectNode.length > 0) {
		for ( var i = 0; i < selectNode.length; i++) {
			if (selectNode[i].isleaf == '1') {
				itemids[j] = selectNode[i].itemid;
				j++;
			}
		}
	}
	return itemids;
}

//查询列
function column(){
	var params = {};
	params['formid'] = formId;
	params['menuid'] = menuid;
	params['consoleCode'] = consoleCode;
	
	Ext.lt.RCP.server("datacommon_officesrule_service", "getFromSubData",params,function(data){
		if (data != null && data.result != null) {
		    form_subdata_wind.show();
		    if(!subdatatable){
			    subdataView(data.result, form_subdata02);
		    } else {
		    	var datas = subdatatable.getRecordset();
		    	datas.clear();
		    	datas.addData(data.result.toArray());
		    }
		} else {
			alert("获取采集表要素失败，请检查采集表!");
		}
	},function(){
		alert('错误!');	
	});
}

//画表
function tableView(tableData, tableDiv){
	var test = function(i,j,rs,value){
		if(rs.PERM==1){
		return ['<input type="radio" value=1 name='+rs.FORMID+' checked>可改     <input type="radio" value=2 name='+rs.FORMID+'>不可改']
		}
		else{
		return ['<input type="radio" value=1 name='+rs.FORMID+'>可改     <input type="radio" value=2 name='+rs.FORMID+' checked>不可改']
		}
		};
		
	var node = function(td,el,l,c,d){	
		var _val = $(el).find("input[type=radio]:checked");
		var name = datatable.getCol(c).name;
		formId = d['FORMID'];
		if(_val.val() == 1){
			d['PERM'] = 1;
		} else {
			d['PERM'] = 2;
		}
		if(name == 'NAME'){
			column();
		}
	}
	
	datatable = new Ext.lt.datatable35(tableData);
	datatable.setCols([
	{name:'NAME',alias:'控制组',width:200,datatype:'S'},
	{name:'PERM',alias:'设置',width:200,datatype:'S',fn:test}
	]);	
	datatable.setEditSelectCheckbox(false);		
	datatable.setMouselight('#597EAA');
	datatable.mousedrag(false);
	datatable.setClassName('dttheme_ifmis');	
	datatable.setAlign("left");
	datatable.setAllowClock(false);	
	datatable.onEvent('onclick',node);	
	datatable.setLayout();
	datatable.draw(tableDiv);
}

//列要素画表
function subdataView(tableData, tableDiv){
	var test = function(i,j,rs,value){
		if(rs.PERM==1){
		return ['<input type="radio" value=1 name='+rs.FORMELEMENTID+' checked>可改     <input type="radio" value=2 name='+rs.FORMELEMENTID+'>不可改']
		}
		else{
		return ['<input type="radio" value=1 name='+rs.FORMELEMENTID+'>可改     <input type="radio" value=2 name='+rs.FORMELEMENTID+' checked>不可改']
		}
		};
		
	var node = function(td,el,l,c,d){	
			var _val = $(el).find("input[type=radio]:checked");
			if(_val.val() == 1){
				d['PERM'] = 1;
			} else {
				d['PERM'] = 2;
			}
		}
		
	subdatatable = new Ext.lt.datatable35(tableData);
	subdatatable.setCols([
	{name:'NAME',alias:'要素',width:200,datatype:'S'},
	{name:'PERM',alias:'设置',width:200,datatype:'S',fn:test}
	]);	
	subdatatable.setEditSelectCheckbox(false);		
	subdatatable.setMouselight('#597EAA');
	subdatatable.mousedrag(false);
	subdatatable.setClassName('dttheme_ifmis');	
	subdatatable.setAlign("left");
	subdatatable.setAllowClock(false);	
	subdatatable.onEvent('onclick',node);	
	subdatatable.setLayout();
	subdatatable.draw(tableDiv);
}
