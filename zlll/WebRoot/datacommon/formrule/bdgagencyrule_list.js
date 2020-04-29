var mainmenu = null;
var menuid = null;

var qtree = null;
var _qtree = null;
var consoletable = null;
var datatable = null;
var subdatatable = null;

var userdata = null;       //�����û�
var consolegroup = null;   //������
var productData = null;    //��Ʒ����

var form_content_wind = null;
var consoleName = null;
var consoleCode = null;
var formtag = null;
var mainArray = [];
var formId = null;

var bdgagencyrule_list = function(config, service) {
	mainmenu = config.mainmenu;
	menuid = config.menuid;
	
	userdata = config.userData;
	usergroup = config.userGroup;
	consolegroup = config.consoleGroup;
	productData = config.productList;          
	
	//��ʼ����ҳ�� 
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
	
	//���Ĳ�ѯ����
	$("#selectInput").keyup(function(){		
		qtree.searchnode([{field:'code',values:[this.value.trim()]},{field:'name',values:[this.value.trim()]}],'contain');
		
		if(!this.value.trim()) qtree.clearSelected();
	}).keyup();
	
	qtree.on({
		nodeclick : function(tree, param) {
			var selNode = param.data;
			if (selNode.isleaf != 0) {
				var params = {};
				params['bdgagency'] = selNode.itemid;
				params['menuid'] = menuid;
				
				Ext.lt.RCP.server("datacommon_bdgagencyrule_service", "getFromDataByAgency", params, function(data) {
					if (data != null && data.result != null) {
						var code = data.result.toArray();		
						var consolearr = consoletable.getRecordSet().toArray();
												
						for(var i = 0; i < consolearr.length; i++){
							consolearr[i]["check"] = 0;
						}
						if(code.length != 0){
						var consoledatas = consoletable.getRecordSet().query({CONSOLECODE:code[0].CONSOLECODE});
									   
						if(consoledatas){
						consoledatas[0]["check"] = 1;					
						}
						}
						consoletable.reflash();
					}
						},function(){
							alert('����!');	
						});
			}
		}
	});
	
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
	 
	 consoletable = new Ext.lt.datatable35(consolegroup);
	    consoletable.setCols([
		consoletable.columns.seq,
		consoletable.columns.radio,
		{name:'CONSOLENAME',alias:'������',width:850,datatype:'S'}
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
		
		//�����ɼ�������鵯����
		form_content_wind = new Ext.lt.window({title:'����������',fitmode:'content',className:'wind7',mark:true,autoshow:true,pop:true,w:425,h:400});
		form_content_wind.draw(form_content);
		$("#form_content").show();
		form_content_wind.hidden();
		
		//�����ɼ����������Ҫ�ص�����
		form_subdata_wind = new Ext.lt.window({title:'Ҫ������',fitmode:'content',className:'wind7',mark:true,autoshow:true,pop:true,w:425,h:400});
		form_subdata_wind.draw(form_subdata);
		$("#form_subdata").show();
		form_subdata_wind.hidden();
}

//��ʼ����ҳ��
function initLayoutMain(config){
	var sb = new StringBuffer();
	
	sb.append("<table align='center' width=\"100%\"  border=\"0\">");
	sb.append("<tr><td valign=\"top\" width=\"20%\">");
	sb.append("<div style=\"position:relative;z-index:100;\">");
	sb.append("<input type=\"text\" style=\"width:99%;\" id=\"selectInput\" value=\"\">");
    sb.append("</div>");
	sb.append("</td>");
	sb.append("<td width=\"80%\">");
	sb.append("<div class=\"budget_title\" style=\"position:relative;z-index:100;\">");
	sb.append("<span style=\"vertical-align:middle;\" onmouseover=\"this.className='budget_over'\" onmouseout=\"this.className=''\"><button class=\"budget_clear\" id=\"btn_unBdgagency01\" onclick=\"dosave()\">����</button></span>");
	sb.append("<span style=\"vertical-align:middle;\" onmouseover=\"this.className='budget_over'\" onmouseout=\"this.className=''\"><button class=\"budget_clear\" id=\"btn_unBdgagency02\" onclick=\"copyfrom(0)\">�����ɼ��������</button></span>");
	sb.append("<span style=\"vertical-align:middle;\" onmouseover=\"this.className='budget_over'\" onmouseout=\"this.className=''\"><button class=\"budget_clear\" id=\"btn_unBdgagency02\" onclick=\"delForm()\">ɾ��������</button></span>");
	sb.append("</div>");
	sb.append("</td>");
	sb.append("</tr>");
	sb.append("<tr>");
	sb.append("<td valign=\"top\">");
	sb.append("<div id=\"treeDiv\" layout=\"{h:{fit:-25}}\" style=\"background:#fff;border:1px solid #ccc;padding:0px; overflow:auto;height:550px;width:100%;\"></div>");
	sb.append("</td>");
	sb.append("<td valign=\"top\">");
	sb.append("<div id='consolegroupDiv' layout=\"{w:{fit:-250},h:{fit:-25}}\" style=\"background:#fff;border:1px solid #ccc;padding:0px; overflow:auto;height:550px;width:100%;\"></div>");
	sb.append("</td>");
	sb.append("</tr>");
	sb.append("</table>");
	
	sb.append("<div id=\"form_content\" style=\"display:none;\" >");
	sb.append("<div style=\"margin-left:2%;height:20px;\">");
	sb.append("���������ƣ�<input type=\"text\" id=\"consolename\"></input>");
	sb.append("</div>");
	sb.append("<div style=\"width:425px;height:380px;\">");
	sb.append("<div id='form_content02' style=\"width:99%;height:375px;overflow:scroll;position:absolute;background-color:#FCFCFC;border:1px solid #ccc;\">");
	sb.append("</div>");
	sb.append("</div>");
	sb.append("<div style=\"margin-left:40%;\">");
	sb.append("<input type=\"button\" value=\"�� ��\" onclick=\"dosaveform()\"></input>");
	sb.append("<input type=\"button\" value=\"ȡ ��\" onclick=\"form_content_wind.hidden();\"></input>");
	sb.append("</div>");
	sb.append("</div>");
	
	sb.append("<div id=\"form_subdata\" style=\"display:none;\" >");
	sb.append("<div style=\"width:425px;height:400px;\">");
	sb.append("<div id='form_subdata02' style=\"width:99%;height:375px;overflow:scroll;position:absolute;background-color:#FCFCFC;border:1px solid #ccc;\">");
	sb.append("</div>");
	sb.append("</div>");
	sb.append("<div style=\"margin-left:40%;\">");
	sb.append("<input type=\"button\" value=\"�� ��\" onclick=\"dosavesubdata()\"></input>");
	sb.append("<input type=\"button\" value=\"ȡ ��\" onclick=\"form_subdata_wind.hidden();\"></input>");
	sb.append("</div>");
	sb.append("</div>");
	
	document.getElementById("template_main").innerHTML = sb.toString();
}

//�����ɼ��������
function copyfrom(tag){	
	formtag = tag;
	mainArray = [];
	
	if(tag == 1){
		var params = {};
		params['menuid'] = menuid;
		params['consoleCode'] = consoleCode;
	Ext.lt.RCP.server("datacommon_bdgagencyrule_service", "getFromData",params,function(data){
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
			alert("�ÿ������Ӧ�Ĳɼ������ò����ڣ���鿴��");
		}
		},function(){
		alert('����!');	
		});
	} else {
		$("#consolename").val("");
		var params = {};
//		params['product'] = $("#producttype").val();
	Ext.lt.RCP.server("datacommon_bdgagencyrule_service", "getMainList",params,function(data){
			form_content_wind.show();  
			if(!datatable){	
				tableView(data.mainList, form_content02);
			} else {
				var datas = datatable.getRecordset();
				datas.clear();
				datas.addData(data.mainList.toArray());
			}
			},function(){
		alert('����!');	
		});
	}
}

//ɾ��������
function delForm(){
	var datas = consoletable.getRecordSet().query({check:1});
	if(!consoleCode){
		alert("����ѡ�������!");
		return;
	}	
	
	if(window.confirm("����ɾ��ѡ�п����鼰�������йص����ã�ȷ���Ƿ�ɾ��ѡ�п����飿")){
	var params = {};
	params['menuid'] = menuid;
	params['consoleCode'] = consoleCode;  
	
	Ext.lt.RCP.server("datacommon_bdgagencyrule_service", "deleteConsoleGroup",params,function(data){
		if (data != null && data.result == 1) {
			consoletable.getRecordSet().remove(datas);
			alert("������ɾ���ɹ���");
		} else {
			if (data.message != null) {
				alert(data.message);
			} else {
				alert("ɾ��������ʧ�ܣ�����ϵ����Ա��");
			}
		}
	},function(){
		alert('����!');	
	});
	}
}

//���������
function dosaveform(){
	var consolename = $("#consolename").val();
	if (consolename == null || consolename == "") {
		alert("���������������!");
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
	
	Ext.lt.RCP.server("datacommon_bdgagencyrule_service", "saveConsoleGroup",params,function(data){
		if (data != null && data.result == 1) {
		alert("���������óɹ���");
		var params = {};
		jumpTo("/datacommon/bdgagencyrule/index.page?mainmenu=" + mainmenu
				+ "&submenu=" + menuid + "", "post", params);
		} else {
			if (data.message != null) {
				alert(data.message);
			} else {
				alert("���ÿ�����ʧ�ܣ�����ϵ����Ա��");
			}
		}
	},function(){
		alert('����!');	
	});
}

//����Ҫ��
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

//����˵��Ϳ������Ӧ��ϵ
function dosave(){
	var userdata = consoletable.getRecordset().query({check:1});

	if (userdata.length == 0) {
		alert("��ѡ������飡");
		return;
	}
	
	var userData = qtree.getSelected();
	if (userData.length == 0) {
		alert("��ѡ���û���");
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
	params['consoleCode'] = userdata[0].CONSOLECODE;
	
	Ext.lt.RCP.server("datacommon_bdgagencyrule_service", "saveConsoleAndUserGroup",params,function(data){
		if (data != null && data.result == 1) {
			alert("��λ�ɼ���Ȩ�����óɹ���");
		} else {
			if (data.message != null) {
				alert(data.message);
			} else {
			alert("��λ�ɼ���Ȩ������ʧ�ܣ�����ϵ����Ա��");
			}
		}
	},function(){
		alert('����!');	
	});
}

//��ѯ��
function column(){
	var params = {};
	params['formid'] = formId;
	params['menuid'] = menuid;
	params['consoleCode'] = consoleCode;
	
	Ext.lt.RCP.server("datacommon_bdgagencyrule_service", "getFromSubData",params,function(data){
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
			alert("��ȡ�ɼ���Ҫ��ʧ�ܣ�����ɼ���!");
		}
	},function(){
		alert('����!');	
	});
}

//����
function tableView(tableData, tableDiv){
	var test = function(i,j,rs,value){
		if(rs.PERM==1){
		return ['<input type="radio" value=1 name='+rs.FORMID+' checked>�ɸ�     <input type="radio" value=2 name='+rs.FORMID+'>���ɸ�']
		}
		else{
		return ['<input type="radio" value=1 name='+rs.FORMID+'>�ɸ�     <input type="radio" value=2 name='+rs.FORMID+' checked>���ɸ�']
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
	{name:'NAME',alias:'������',width:200,datatype:'S'},
	{name:'PERM',alias:'����',width:200,datatype:'S',fn:test}
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

//��Ҫ�ػ���
function subdataView(tableData, tableDiv){
	var test = function(i,j,rs,value){
		if(rs.PERM==1){
		return ['<input type="radio" value=1 name='+rs.FORMELEMENTID+' checked>�ɸ�     <input type="radio" value=2 name='+rs.FORMELEMENTID+'>���ɸ�']
		}
		else{
		return ['<input type="radio" value=1 name='+rs.FORMELEMENTID+'>�ɸ�     <input type="radio" value=2 name='+rs.FORMELEMENTID+' checked>���ɸ�']
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
	{name:'NAME',alias:'Ҫ��',width:200,datatype:'S'},
	{name:'PERM',alias:'����',width:200,datatype:'S',fn:test}
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
