

var qtree = null;
var datatable = null;
var  modelId, bdgAgency;
var datatableOne = null;
var datatableTwo = null;
var datatableChange = null;
var datatableAudit = null;
var attachTable = null;
var datatableAuditTwo = null;
var selNodeFlag = false;
var tablecode = "";
var product,levelno;
var wind = null;// ��������
var agencyAddName=null;
var tableData;
var mainmenu = null;
var submenu = null;
var taskid;
var booleanMapper,tableMapper,formTypeMapper,productData;
var elementDataMap = {},tableheight = 0;
var codedatamodel = null;
var codedatamodeltab = null;
var codedatareal = null;
var codedatarealtab = null;
var type;
var rs = null;
var m = null;
var taskTypeList,taskCycleList;
//var taskAttributes,taskCodeRule,taskNameRule,tsql;
var taskclassification_list = function(config, service) {
	
	agencyAddName=config.nameAgency;
	mainmenu = config.mainmenu;	
	submenu = config.menuId;
	tablecode = config.tablecode;
	bdgAgency = config.bdgAgency;
	product = config.product;
	levelno = config.levelno;
	tableData = config.tablesList;
	formTypeMapper = config.formTypeMapper;
	tableMapper = config.tableMapper;
	productData = config.productList;
	taskTypeList = config.taskTypeList;
	taskCycleList = config.taskCycleList;
	
	//agencyAddName=config.bdgAgency;
	// ��ʼ������
	initLayout(config);
	
	function pubtree(_input,content,formcontent,dataList){
		$("#"+_input).val("");
		var $tempDiv = $("#"+content);
		$tempDiv.width($(_input).width()+3);
		var pos = $(_input).position();
			$tempDiv.css("top",pos.top+16+"px");
			$tempDiv.css("left",pos.left+"px");
		   $("#"+content).show();
		   var qtree=new Ext.lt.Qtree({
					data:dataList,
					outformart:'#name',
					expandlevel:'2',
					showRootNode:true,
					rootNode:{superitemid:'0',itemid:'0',name:'ȫ��',isleaf:'0'}
				});
			  qtree.draw(document.getElementById(content));

			  qtree.on({nodeclick : function(tree,param){
			    	var selNode = param.data;
			    	if(!selNode || selNode.isleaf == 0){
			    		alert("��ѡ��ĩ���ڵ㣡");
			    		return;
			    	}else{
			    		$("#"+content).hide();	    		
			    		_input.innerText = selNode.name;
			    		_input.itemid = selNode.itemid;
			    	}
			    }});	
//			    $("#"+formcontent).click(function (event) {
//			    var el = $(event.target);
//			   if (el.parents("#"+content).length == 0 && el.attr("id") != _input.id && el.attr("id") != content) {
//						$("#"+content).hide();
//					}
//			    }); 	
		}

	 $("#producttype").bind("change",function(){
		 var params = {};
		 params["product"] = $(this).val();
		 producttype =  $(this).val();
		 Ext.lt.RCP.server("datacommon_taskclassification_service", "getTableData",params,function(data){
				if(data.error){
					alert(data.error);
				}
				else{					
					var rs = datatable.getRecordSet();
					rs.clear();
					datatable.getRecordset().addData(data.tableList,-1);
					datatable.reflash();		
					
				}
				
			
		});		
		
	 });

	
	datatable = new Ext.lt.datatable(config.taskList);
	var first = config.headList;
//	for(var j = 0;j<first.length;j++){
//		var colName = first[j].name;
//		if(colName == "ATTRIBUTES"){
//			first[j].fn = taskAttributes;
//		}
//		if(colName == "TASKCODERULE"){
//			first[j].fn = taskCodeRule;
//		}
//		if(colName == "TASKNAMERULE"){
//			first[j].fn = taskNameRule;
//		}
//		if(colName == "TSQL"){
//			first[j].fn = tsql;
//		}
//		
//		
//	}
	first.insert(datatable.columns.seq, 0)
    first.insert(datatable.columns.radio);
	
	extendsBtnType(datatable,first);
	datatable.setCols(first);


	datatable.setClassName("dttheme_budget");
	//datatable.setSelectDown(false);
	// ������һ��
	// datatable.clockColumnSize(1);


	datatable.mousedrag(false);
	datatable.setAllowClock(true);
	datatable.headsort(false);
	datatable.setAllowcustom(false);
	datatable.setLayout();
	datatable.draw(edit_table_div);
	
	codedatamodel = new Ext.lt.recordset({columns:[ "NAME", "VALUE"],datas:[
  		['��������','ʡ'],['���','2013'],['�̶��ַ�','�̶��ַ�'],['����˳���ţ�##��','01'],['����˳���ţ�###��','001'],['����˳���ţ�####��','0001']
  		]});
	codedatamodeltab = new Ext.lt.datatable35(codedatamodel);
	codedatamodeltab.setCols([
	        codedatamodeltab.columns.radio,
  			{name:'NAME',alias:'����',datatype:'S',style:'text-align:center'},
  			{name:'VALUE',alias:'ȡֵʾ��',datatype:'S',style:'text-align:center'}
  	]);
	codedatamodeltab.setMouselight('#597EAA');
	codedatamodeltab.mousedrag(false);
	codedatamodeltab.setClassName('dttheme_ifmis');
	//codedatamodeltab.setLayout();
	$("#codeform").show();
	codedatamodeltab.draw(codeformContainer1);
	

	
	
	codedatareal = new Ext.lt.recordset({columns:["NAME", "VALUE"],datas:[]});
	codedatarealtab = new Ext.lt.editdatatable(codedatareal);
	codedatarealtab.setCols([
	        codedatarealtab.columns.seq,
	        codedatarealtab.columns.radio,
  			{name:'NAME',alias:'����',datatype:'S',style:'text-align:center'},
  			{name:'VALUE',alias:'ȡֵʾ��',datatype:'S',style:'text-align:center',edit:true,oneditstart:function(table,e,l,c,data){
  				if(data.NAME!='�̶��ַ�')return false;
  			}}
  	]);
	codedatarealtab.setMouselight('#597EAA');
	codedatarealtab.mousedrag(false);
	codedatarealtab.setClassName('dttheme_ifmis');
	//codedatarealtab.setLayout();
	codedatarealtab.draw(codeformContainer2);
	
	$("#codeform").hide();
	//��չ���Ա���
	$("#extends_confirm_btn").unbind("click").bind("click",function(){
		var data = datatable.getRecordSet().query({check:1});
		if(!data || data.length!=1){
			alert("��ѡ����Ҫ������չ���Եı�!");
			return;
		}
		
		//����ѡ��
		var params = {};
		params["taskId"] = data[0].ITEMID;
		
		var checkJSON = [];
		$("#extends_attr input[type=checkbox]:checked").each(function(index){
			
			checkJSON.push({"taskId":params.taskId,"attrId":this.value});
		});
		
		params["jsonreq"] = JSON.stringify(checkJSON);
		
		showdiv();
		Ext.lt.RCP.server("datacommon_taskclassification_service", "saveExtendAttr",params,function(data){
			if(data.error){
				alert(data.error);
			}
			else{
				extends_wind.close();
				
				alert("����ɹ���");
			}
			closediv();
		});
	});
	

}
//------onload end



/**
 * ��ʼ�����沼��
 */
function initLayout(config) {
	var sb = new StringBuffer();
	var taskTypeBuffer = new StringBuffer();
	var taskCycleBuffer = new StringBuffer();
	for(var i = 0;i<taskTypeList.length;i++){
		var row = taskTypeList[i];
		taskTypeBuffer.append("<option value = \""+row.itemid+"\" code = \""+row.code+"\">"+row.name+"</option>");
	}
	
	for(var k = 0;k<taskCycleList.length;k++){
		var cyclerow = taskCycleList[k];
		taskCycleBuffer.append("<option value = \""+cyclerow.itemid+"\" code = \""+cyclerow.code+"\">"+cyclerow.name+"</option>");
	}
//	var tableSbuffer = new StringBuffer();
//	var tableLen = tableData.length;
//	var rowData;
//	for(var i = 0;i<tableLen;i++){
//		row = tableData[i];
//		tableSbuffer.append("<option value = \""+row.TABLECODE+"\">"+row.NAME+"</option>");		
//	}	
	var productBuffer = new StringBuffer();
	
	for(var j = 0;j<productData.length;j++){
		rowData = productData[j];
		if(j==0){
			producttype = rowData.PRODUCTS;
		}
		productBuffer.append("<option value = \""+rowData.PRODUCTS+"\">"+rowData.NAME+"</option>");	
	}
	sb.append("<div id=\"codeform\" style=\"width:600px;height:400px;display:block;\">");
	sb.append("<table style=\"width:100%;height:100%;\">");
	sb.append("<tr>");
	sb.append("<td valign=\"top\" style=\"width:40%;height:45%;\">");
	sb.append("<fieldset class=\"fieldset\">");
	sb.append("<div id=\"codeformContainer1\" style=\"width:100%;height:300px;\" ></div>");
	sb.append("</fieldset>");
	sb.append("</td>");
	sb.append("<td style=\"width:6%;height:45%;\">");
	sb.append("<input type=\"button\" onclick=\"dolefttoright()\" id=\"lefttoright\" value=\"==>\" /><br>");
	sb.append("<input type=\"button\" onclick=\"dorighttoleft()\" id=\"righttoleft\" value=\"<==\" />");
	sb.append("</td>");
	sb.append("<td valign=\"top\" style=\"width:48%;height:45%;\">");
	sb.append("<fieldset class=\"fieldset\">");
	sb.append("<div id=\"codeformContainer2\" style=\"width:100%;height:300px;\"></div>");
	sb.append("</fieldset>");
	sb.append("</td>");
	sb.append("<td valign=\"top\" style=\"width:6%;height:45%;\">");
	sb.append("<input type=\"button\" onclick=\"doup()\" id=\"lefttoright\" value=\"����\" /><br>");
	sb.append("<input type=\"button\" onclick=\"dodown()\" id=\"righttoleft\" value=\"����\" />");
	sb.append("</td>");
	sb.append("</tr>");
	sb.append("<tr>");
	sb.append("<td colspan='4' align=\"top\" >");
	sb.append("<textarea id = 'filedcname' disabled='disabled' style=\"width:100%;height:100%;\"></textarea>");
	sb.append("</td>");
	sb.append("</tr>");
	sb.append("<tr>");
	sb.append("<td colspan='4' align=\"center\">");
	sb.append("<span><button onclick=\"saverule();\">����</button></span>");
	sb.append("<span><button onclick=\"codeform_wind.close();\">ȡ��</button></span>");
	sb.append("</td>");
	sb.append("</tr>");
	sb.append("</table>");
	//sb.append("<div id=\"codeformContainer1\" layout=\"{w:{fit:true},h:{fit:-20}}\" style=\"width:50%;height:430px;border:solid 1px red;\"></div>");
	//sb.append("<div id=\"codeformContainer2\" style=\"width:50%;height:430px;border:solid 1px red;\"></div>");
	sb.append("</div>");
	
	
	sb.append("<div id=\"query_t\">");

//	sb.append("<tr>");
	sb.append("<span><span title=\"����\" style=\"vertical-align:middle;\" class=\"add_btn\" onclick=\"doadd()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0)\">����</a></span></span>");
	sb.append("<span><span title=\"�޸�\" style=\"vertical-align:middle;\" class=\"mod_btn\" onclick=\"domodify()\"  onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0)\">�޸�</a></span></span>");
	sb.append("<span><span title=\"ɾ��\" style=\"vertical-align:middle;\" class=\"del_btn\" onclick=\"deleteData()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0)\">ɾ��</a></span></span>");
	
	sb.append("<span><span title=\"��Ӧ��ϵ\" style=\"vertical-align:middle;\" class=\"budget_setting\" onclick=\"addRelation()\"  onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0)\">��Ӧ��ϵ</a></span></span>");

//	sb.append("</tr>");
	sb.append("</div>");
	sb.append("<form name=\"mainListForm\" id=\"mainListForm\" action=\"#\" method=\"post\">");
	sb.append("<tr align = \"center\">");		
//	sb.append("<td>");
	sb.append("<div style=\"margin-left:10px;font-weight:700;\">");
	sb.append("<label>��Ʒ���ͣ�</label>");
	sb.append("<select id=\"producttype\" size = \"1\" style= \"width:160px;\">");
//	sb.append("<option value = \"\"></option>");	
	sb.append(productBuffer.toString());
	sb.append("</select>");
	
	sb.append("</div>");
	
//	sb.append("</td>");
	sb.append("</tr>");
	
	sb.append("<div id=\"form_table_title\">");
	sb.append("<ul>");
	sb.append("<li class=\"top\"><div>����������</div></li>");
	sb.append("</ul>");
	sb.append("</div>");
	sb.append("<tr>");
	sb.append("<td>");
	sb.append("<div id=\"containerline20_d\">");
	sb.append("<div id='edit_table_div' layout=\"{w:{fit:true},h:{fit:-80}}\"></div>");
	sb.append("</div>");
	sb.append("</td>");
	sb.append("</tr>");
	sb.append("</div>");
	sb.append("</form>");

	sb.append("<div id=\"btn_table\" layout=\"{w:{fit:true},h:{fit:-35}}\" ></div>");	
	sb.append("<div id=\"form_content\" style=\"display:none;\" >");
	sb.append("<div style=\"width:460px;height:380px;\">");
	sb.append("<table id=\"form_table\" class=\"tableview\">");
	sb.append("<colgroup align=\"left\" width=\"40%\" ></colgroup>");
	sb.append("<colgroup align=\"left\" width=\"60%\"></colgroup>");
	sb.append("<thead>");
//	sb.append("<tbody>");
	sb.append("<tr>");
	sb.append("<th>����</td>");
	sb.append("<th>����</td>");
	sb.append("</tr>");
	sb.append("</thead>");
	sb.append("<tbody>");
	sb.append("<tr>");
	sb.append("<th>�ɼ������������<font color=\"red\">*</font></td>");
	sb.append("<td><input type=\"text\" id=\"name\" style=\"width:95%\" /><input type=\"hidden\" id = \"itemid\"/></td>");
	sb.append("</tr>");
	sb.append("<tr>");
	sb.append("<th>�ɼ������������<font color=\"red\">*</font></td>");
	
	sb.append("<td><select id=\"tasktype\" style=\"width:95%\">");
	sb.append("<option vaule = \"\"></option>");
	sb.append(taskTypeBuffer.toString());
//	sb.append("<option value='1'>ת��֧�����ݲɼ�</option>");
//	sb.append("<option value='2'>ת��֧��ִ�й���</option>");
//	sb.append("<option value='3'>ָ����˹���</option>");
	sb.append("</select></td>");	
	sb.append("</tr>");
	sb.append("<tr>");
	sb.append("<th>�ɼ�������������<font color=\"red\">*</font></td>");
	sb.append("<td><select id=\"taskcycletype\" style=\"width:95%\">");
	sb.append("<option vaule = \"\"></option>");
//	sb.append("<option value='1'>����������</option><option value='2'>�±�</option>");
//	sb.append("<option value='3'>����</option>");
//	sb.append("<option value='4'>�ܱ�</option>");
//	sb.append("<option value='3'>Ѯ��</option>");
	sb.append(taskCycleBuffer.toString());
	sb.append("</select></td>");	
	sb.append("</tr>");
	sb.append("<tr>");
	sb.append("<th>�������</td>");
	sb.append("<td><input type=\"text\" id=\"orderno\" style=\"width:95%\"/></td>");
	sb.append("</tr>");
	sb.append("<tr>");
	sb.append("<th>��˲�ͨ���Ƿ������ϱ�</td>");
	sb.append("<td><select id=\"isreporting\" style=\"width:95%\"><option value='0'>��</option><option value='1'>��</option></select></td>");
	sb.append("</tr>");
	sb.append("<tr>");
	sb.append("<th>�ɼ��������˵��</td>");
	sb.append("<td><textarea id=\"remark\" rows=\"3\" cols=\"40\" style=\"width:95%\"></textarea></td>");
	sb.append("</tr>");	
	sb.append("</tbody>");
	sb.append("</table>");
	sb.append("</div>");
	sb.append("<div style=\"margin-left:40%;\">");
	sb.append("	<input type=\"button\" value=\"�� ��\" style=\"height:20px;\" onclick=\"doSave()\"></input>");
	sb.append("<input type=\"button\" value=\"ȡ ��\" style=\"height:20px;\" onclick=\"form_content_wind.hidden();\"></input>");
	sb.append("</div>");
	
	sb.append("<div id=\"form_Attributes\" style=\"display:none;\" >");
	sb.append("<div style=\"width:460px;height:380px;\">");
	sb.append("<table id=\"form_table\" class=\"tableview\">");
	sb.append("<div id=\"attributes\">");
	sb.append("</table>");
	sb.append("</div>");
	sb.append("</div>");
	
	sb.append("<div id=\"form_content1\" style=\"display:none;\" >");
	
	sb.append("<table id=\"form_table\" class=\"tableview\">");
	sb.append("<thead>");
	sb.append("<tr>");	
	sb.append("<td valign=\"top\" width = '100%'>");
	
	sb.append("<textarea id = 'filed2' rows = '20' cols = '60'></textarea>");
	sb.append("</td>");
	sb.append("</tr>");
	sb.append("</thead>	");
	sb.append("</table>");
	
	sb.append("<div style=\"margin-left:40%;\">");
	sb.append("<input type=\"button\" style = \"height:20px;\" value=\"�� ��\" onclick=\"saveSql()\"></input>");
	sb.append("<input type=\"button\" style = \"height:20px;\" value=\"ȡ ��\" onclick=\"form_content1_wind.hidden();\"></input>");
	sb.append("</div>");
	sb.append("</div>");	
	sb.append("<div id=\"taskform_content\" style=\"display:none;\" >");	
	sb.append("<div id=\"tableContainer\" style=\"width:100%;height:430px;\"></div>");
	sb.append("</div>");
	
	sb.append("<div id=\"extends_attr\" style=\"display:none;\">");
	sb.append("<div style=\"height:90%\">");
	sb.append("<table class=\"tableview\" width=\"90%\">");
		sb.append("<colgroup align=\"center\" width=\"20%\"></colgroup>");
		sb.append("<colgroup align=\"left\" width=\"80%\"></colgroup>");
		sb.append("<thead>");
			sb.append("<tr>");
				sb.append("<td>ѡ��</td><td>��������</td>");
			sb.append("</tr>");
		sb.append("</thead>");
		sb.append("<tbody>");
		
			var attrList = config.attrList;
			for(var i=0,n=attrList.length; i<n; i++){
				var attr = attrList[i];
				
				sb.append("<tr>");
					sb.append("<td><input type=\"checkbox\" value=\""+attr.ATTRID+"\" ></td><td>"+attr.NAME+"</td>");
				sb.append("</tr>");
			}
		
		sb.append("</tbody>");
	sb.append("</table>");
	sb.append("</div>");
	
	sb.append("<div style=\"margin-left:40%;\">");
		sb.append("<span><button id=\"extends_confirm_btn\">ȷ��</button></span>");
		sb.append("<span><button onclick=\"extends_wind.close();\">ȡ��</button></span>");
	sb.append("</div>");

	
	sb.append("</div>");
	
	

		
	//	sb.append("");
	
	
	document.getElementById("template_main").innerHTML = sb.toString();
	$("#codeform").hide();


}


//���
function doadd(){
	
	$("#itemid").val("");
	$("#name").val("");
	$("#tasktype").val("");	
	$("#tasktype")[0].disabled = false;
	$("#taskcycletype").val("");
	$("#taskcycletype")[0].disabled = false;
	$("#orderno").val("");
	$("#isreporting").val("");	
	$("#remark").val("");

	$("#form_content").show();
	
	form_content_wind = new Ext.lt.window({title:'����',fitmode:'body',className:'wind7',mark:true,autoshow:false,pop:true,w:562,h:472});
	
	form_content_wind.draw(form_content);
	
	form_content_wind.show();
	
	$("#form_content select").show();
}
function doSave(){
	var params = {};
	params["form.itemid"] = $("#itemid").val();
	params["form.name"] = $("#name").val();
	params["form.tasktype"] = $("#tasktype").val();
	params["form.taskcycletype"] = $("#taskcycletype").val();
	params["form.orderno"] = $("#orderno").val();
	params["form.isreporting"] = $("#isreporting").val();
	params["form.remark"] = $("#remark").val();
	params["form.product"] =  $("#producttype").val();
	if($("#name").val()==null||$("#name").val()==""){
		alert("����������!");
		return;
	}
	if($("#tasktype").val()==null||$("#tasktype").val()==""){
		alert("��ѡ�������������!");
		return;
	}
	if($("#taskcycletype").val()==null||$("#taskcycletype").val()==""){
		alert("��ѡ��������������!");
		return;
	}
	if(isNaN($("#orderno").val())){
	      alert("������ű���Ϊ����");
	      return;
	    }	
	if(!isNaN($("#orderno").val())&&$("#orderno").val()<0){
	       alert("������ű������0");
	       return;
	    }
	showdiv();
	Ext.lt.RCP.server("datacommon_taskclassification_service", "saveTaskClassification",params,function(data){
		if(data.error){
			closediv();
			alert(data.error);
		}
		else{
			alert("����ɹ�!");
			form_content_wind.close();
			closediv();
			var rs = datatable.getRecordset();
			rs.clear();			
			datatable.getRecordset().addData(data.dataList,-1);
			datatable.reflash();
		
		}
	});
	
	
}

function domodify(){
	var datas = datatable.getRecordSet().query({check:1});
	if(datas.length==0){
		alert("��ѡ��һ�����������Ϣ��");
		return;
	}
	$("#itemid").val(datas[0].ITEMID);
	$("#name").val(datas[0].NAME);
	$("#tasktype").val(datas[0].TASKTYPE);	
	$("#tasktype")[0].disabled = true;
	$("#taskcycletype").val(datas[0].TASKCYCLETYPE);
	$("#taskcycletype")[0].disabled = true;
	$("#orderno").val(datas[0].ORDERNO);
	$("#isreporting").val(datas[0].ISREPORTING);	
	$("#remark").val(datas[0].REMARK);
	$("#form_content").show();
	
	form_content_wind = new Ext.lt.window({title:'�޸�',fitmode:'body',className:'wind7',mark:true,autoshow:false,pop:true,w:562,h:472});
	
	form_content_wind.draw(form_content);
	
	form_content_wind.show();
	
	$("#form_content select").show();
}




	function deleteData(){
		var datas = datatable.getRecordSet().query({check:1});
		if(!datas || datas.length==0){
			alert("��ѡ����Ҫɾ��������!");
			return;
		}
		else{
			if(window.confirm("���Ƿ�Ҫɾ��ѡ�м�¼��")){  
			var params = {};
			params["itemid"] = datas[0].ITEMID;			
			Ext.lt.RCP.server("datacommon_taskclassification_service", "deleteData",params,function(data){
				if(data.error){				
					alert(data.error);
				}
				else{
					datatable.getRecordSet().remove(datas);					
					alert("ɾ���ɹ�!");
					datatable.reflash();
//					var params = {};
//					jumpTo("/datacommon/tablesdefine/index.page?mainmenu="+mainmenu+"&submenu="+submenu+"","post",params);
				
				}
			});
			}
			
		}
	}

 /**
 * У��ȡ������
 */
function validForm(){
	 	var expStr;
	 	expStr = document.getElementById("filed3").value;			
		var params = {};
		var datas = datatable.getRecordSet().query({check:1});
		params["sourceTable"] = datas[0].SOURCETABLE;
		params["expStr"] = expStr;
		params["itemid"] = datas[0].itemid;
		
		Ext.lt.RCP.server("datacommon_tablesdefine_service", "validCondition",params,function(data){
			if(data.error){
				alert(data.error);
			}
			else{
								
				alert("ȡ������У��ɹ�!");
			}
			
		
	});			

 }
 
 /**
 * ����ȡ������
 */
function saveSql(){
		var expStr;
	 	expStr = document.getElementById("filed2").value;			
		var params = {};
		var datas = datatable.getRecordSet().query({check:1});		
		params["expStr"] = expStr;
		params["itemid"] = datas[0].ITEMID;
		params["product"] =  $("#producttype").val();
		Ext.lt.RCP.server("datacommon_taskclassification_service", "saveTsql",params,function(data){
			if(data.error){
				alert(data.error);
			}
			else{
								
				alert("����ɹ�!");
				form_content1_wind.close();
				var rs = datatable.getRecordset();
				rs.clear();			
				datatable.getRecordset().addData(data.dataList,-1);
				datatable.reflash();
			}
			
		
	});			
 }

function taskAttributes(d){	
	var itemid = d.ITEMID;
	$("#extends_attr").show();
	
	extends_wind = new Ext.lt.window({title:'��չ��������',fitmode:'body',className:'wind7',mark:true,autoshow:false,pop:true,w:562,h:350});
	
	extends_wind.draw(extends_attr);
	
	extends_wind.show();
	
	//����ѡ��
	var params = {};
	params["taskId"] = itemid;
	
	showdiv();
	Ext.lt.RCP.server("datacommon_taskclassification_service", "loadExtendAttr",params,function(data){
		if(data.error){
			alert(data.error);
		}
		else{
			var attrMapper = data.attrMapper;
			
			$("#extends_attr input[type=checkbox]:checked").attr("checked",false);
			
			for(var i=0,n=attrMapper.length; i<n; i++){
				var attr = attrMapper[i];
				
				$("#extends_attr input[type=checkbox][value="+attr.ATTRID+"]").attr("checked",true);
			}			
		}
		closediv();
	});
	
	
}

function taskCodeRule(d){
	type = 0;
	var itemid = d.ITEMID;
	var params = {};
	params["type"]=type;
	params["classid"]=itemid;
	var resp = Ext.lt.RCP.asynserver("datacommon_taskclassification_service", "selRealData" ,params);
	$("#codeform").show();	
	codeform_wind = new Ext.lt.window({title:'��������������',fitmode:'body',className:'wind7',mark:true,autoshow:false,pop:true,w:650,h:500});
	codeform_wind.draw(codeform);
	codeform_wind.show();
	codedatareal.clear();
	codedatareal.addData(resp.dataList);
	textarea();
}

function taskNameRule(d){
	type = 1;
	var itemid = d.ITEMID;
	var params = {};
	params["type"]=type;
	params["classid"]=itemid;
	var resp = Ext.lt.RCP.asynserver("datacommon_taskclassification_service", "selRealData" ,params);
	$("#codeform").show();	
	codeform_wind = new Ext.lt.window({title:'�����������ƹ���',fitmode:'body',className:'wind7',mark:true,autoshow:false,pop:true,w:650,h:500});
	codeform_wind.draw(codeform);
	codeform_wind.show();
	codedatareal.clear();
	codedatareal.addData(resp.dataList);
	textarea();
}

function tSql(d){
	
	var tsql = d.TSQL;
	$("#form_content1").show();
	form_content1_wind = new Ext.lt.window({title:'����SQL����',fitmode:'body',className:'wnd_ifmis',mark:true,autoshow:false,pop:true,w:510,h:472});
	form_content1_wind.draw(form_content1);	
	form_content1_wind.show();
		      if(tsql!=undefined){
		    	  document.getElementById("filed2").value = tsql;
		      }else{
		    	  document.getElementById("filed2").value = "";
		      }
		      
	
}


function extendsBtnType(table,c){
	if(!Ext.lt.isArray(c)){c=[c]};
	
	var col;
	var btn;
	for(var i=0,n=c.length; i<n; i++){
		col = c[i];
		var colName = col.name;
		
		if(colName == "ATTRIBUTES" || colName == "TASKCODERULE" || colName == "TASKNAMERULE" || colName == "TSQL"){		
			
			col.fn = function(i,j,rs,value){
				if(value==null || value=='null') value='';
				
				
				return ['<span title="" >','<button class="budget_file" style = "width:50px;height:25px;vertical-align:middle;"></button>','</span>'].join('');
			}
			
		}
	}
	
	table.onEvent("onclick",function(table,el,l,c,d){
		var col = table.getCol(c);
		var colName = col.name;
		if(colName == "ATTRIBUTES"){
			taskAttributes(d);
		}
		if(colName == "TASKCODERULE"){
			taskCodeRule(d);
		}
		if(colName == "TASKNAMERULE"){
			taskNameRule(d);
		}
		if(colName == "TSQL"){
			tSql(d);
		}
		
		
	});
}

function addRelation(){
	var datas = datatable.getRecordSet().query({check:1});
	var params = {};
	
	if(datas.length==0){
		alert("��ѡ��һ�����������Ϣ��");
		return;
	}
	booleanMapper = {columns:['code','name'],datas:[["0","��"],["1","��"]]};
	
	$("#taskform_content").show();	
	$("#tableContainer").show();
	
	taskform_content_wind = new Ext.lt.window({title:'�ɼ����Ӧ',fitmode:'body',className:'wind7',mark:true,autoshow:true,pop:true,w:1000,h:500});	
	taskform_content_wind.draw(document.getElementById("taskform_content"));	
	taskform_content_wind.show();
	
	taskid = datas[0].ITEMID;
	

	var afterShowDiv = function (t,item){
		var tabNum = t.cfg.activeTab;
		var datas = datatable.getRecordSet().query({check:1});
		var params = {};
		params["itemid"] = datas[0].ITEMID;
		params["type"] = 6;
		params["projectId"] = 1;		
		  switch(tabNum){
			case 0:
				initTaskFormTab(params);

			break;

			case 1:
				initFormChangeTab(params);
			break;

			case 2:
				initAuditFormTab(params);
			break;

			case 3:
				initAttachTab(params);
			break;

		

			default:
          alert("ѡ�������");
		}
	}
	
	var datas=[];
	datas.push({title:'�ɼ���������Ӧ�ɼ���',html:"<div id='taskFormTab' style='width:100%;height:100%;'></div>"});
	datas.push({title:'�ɼ���������Ӧ�ɼ���ת����ϵ',html:"<div id='formChangeTab' style='width:100%;height:100%;'></div>"});
	datas.push({title:'�ɼ���������Ӧ���',html:"<div id='auditFormTab' style='width:100%;height:100%;'></div>"});
	datas.push({title:'�ɼ���������Ӧ����',html:"<div id='attachFormTab' style='width:100%;height:100%;'></div>"});
	if(m == null){
		m = Ext.lt.TabPanel({
			items:datas,
			activeTab:0,
			className:'bottom_tablpanel2',
			aftershow:afterShowDiv
			});
		
		m.draw(document.getElementById('tableContainer'));
	}
	else{
		m.activate(0);
	}
}


function initTaskFormTab(params){
	if(datatableOne == null){
	document.getElementById("taskFormTab").innerHTML = "";
	var sb = new StringBuffer();

	//sb.append("<div style='margin:0px;'>");
	
	sb.append("<table align='center' width=\"950px;\" border=\"0\" >");
		sb.append("<tr style='background-color:#FCFCFC;height:30px;'>");
			sb.append("<th>");   
				sb.append("<span>��������Ӧ�ɼ���</span>");
			sb.append("</th>");
			sb.append("<th>");   
				sb.append("<span>�ɼ���</span>");
			sb.append("</th>");
		sb.append("</tr>");
		
		sb.append("<tr>");
			sb.append("<td>");   
				sb.append("<div id=\"query_t\" style=\"height:20px;margin:0;\">");				
					sb.append("<span><span title=\"����\" class=\"add_btn\" onclick=\"saveTaskForm()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0)\">����</a></span></span>");	
					sb.append("<span><span title=\"ɾ��\" class=\"del_btn\" onclick=\"delForm()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0);\">ɾ��</a></span></span>");	
				sb.append("</div>");
			sb.append("</td>");
			sb.append("<td>");   
				sb.append("<div id=\"query_t\" style=\"height:20px;margin:0;\">");				
					sb.append("<span><span title=\"���\" class=\"add_btn\" onclick=\"addForm()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0)\">���</a></span></span>");	
				sb.append("</div>");
			sb.append("</td>");
		sb.append("</tr>");
		
		sb.append("<tr>");
			sb.append("<td style='width:50%;'>");
				sb.append("<div id='formDiv_1' style='width:100%;height:272px;'></div>");
			sb.append("</td>");
			sb.append("<td style='width:50%;'>");
				sb.append("<div id='formDiv_2' style='width:100%;height:272px;'></div>");
			sb.append("</td>");
		sb.append("</tr>");
		
 	sb.append("</table>");
//	sb.append("</div>");

	document.getElementById("taskFormTab").innerHTML = sb.toString();
	}
	if(datatableOne == null){
//		var rs=new Ext.lt.recordset({column:[],datas:[]});
		
		datatableOne=new Ext.lt.editdatatable(new Ext.lt.recordset({column:[],datas:[]}));
		datatableOne.setCols([
		datatableOne.columns.seq,
		datatableOne.columns.checkbox,
		{name:'TABLECODE',alias:'�ɼ�������',width:150,datatype:'S',mapper:tableMapper,format:'#name'},
		{name:'DISPLAYNO',alias:'��ʾ˳��',width:50,datatype:'I',edit:true},
		{name:'CHANGENO',alias:'ת��˳��',width:50,datatype:'I',edit:true},
		{name:'ISHIDE',alias:'�Ƿ�ɼ�',width:50,datatype:'S',edit:true,mapper:booleanMapper,format:'#name'},
		{name:'LEVELNO',alias:'��������',width:50,datatype:'S'},
		{name:'CENTRAL',alias:'��������',width:50,datatype:'S',edit:true,mapper:booleanMapper,format:'#name'},
		{name:'PROVINCE',alias:'ʡ������',width:50,datatype:'S',edit:true,mapper:booleanMapper,format:'#name'},
		{name:'CITY',alias:'�м�����',width:50,datatype:'S',edit:true,mapper:booleanMapper,format:'#name'},
		{name:'COUNTY',alias:'�ؼ�����',width:50,datatype:'S',edit:true,mapper:booleanMapper,format:'#name'},
		]);		
		datatableOne.setMouselight('#597EAA');
		datatableOne.mousedrag(false);
		datatableOne.setClassName('dttheme_budget');		
		datatableOne.draw(document.getElementById("formDiv_1"));
	}
	if(datatableTwo==null){
//		var rs=new Ext.lt.recordset({column:[],datas:[]});
		datatableTwo=new Ext.lt.datatable35(new Ext.lt.recordset({column:[],datas:[]}));
		datatableTwo.setCols([
		datatableTwo.columns.seq,
		datatableTwo.columns.checkbox,
		{name:'TABLECODE',alias:'�ɼ�������',width:250,datatype:'S',mapper:tableMapper,format:'#name'},
		{name:'FORMTYPE',alias:'�ɼ������',width:50,datatype:'S',style:'text-align:center'}
		]);		
		datatableTwo.setMouselight('#597EAA');
		datatableTwo.mousedrag(false);
		datatableTwo.setClassName('dttheme_budget');		
		datatableTwo.draw(document.getElementById("formDiv_2"));
	}
	
	
	Ext.lt.RCP.server("datacommon_taskclassification_service", "getTaskForm",params,function(data){
		if(data.error){
			alert(data.error);
		}
		else{
			var rsOne=	datatableOne.getRecordset();
			rsOne.clear();
			rsOne.join(data.taskFormList,rsOne.size());
			
			
			
			var rsTwo=	datatableTwo.getRecordset();
			rsTwo.clear();
			rsTwo.join(data.formList,rsTwo.size());
			datatableTwo.reflash();
			datatableOne.reflash();

		}
		
	
});	
}
function initFormChangeTab(params){
	if(datatableChange == null){
	document.getElementById("formChangeTab").innerHTML = "";
	
	var sb = new StringBuffer();
	sb.append("<table align='center' width=\"950px;\" border=\"0\" >");
	sb.append("<tr style='background-color:#FCFCFC;height:30px;'>");
		sb.append("<th>");   
			sb.append("<span>��������Ӧת����ϵ</span>");
		sb.append("</th>");	
	sb.append("</tr>");
	
	sb.append("<tr>");
		sb.append("<td>");   
			sb.append("<div id=\"query_t\" style=\"height:20px;margin:0;\">");				
				sb.append("<span><span title=\"����\" class=\"add_btn\" onclick=\"saveFormChange()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0)\">����</a></span></span>");					
			sb.append("</div>");
		sb.append("</td>");		
	sb.append("</tr>");
	
	sb.append("<tr>");
		sb.append("<td style='width:100%;'>");
			sb.append("<div id='formChangeDiv' style='width:100%;height:272px;'></div>");
		sb.append("</td>");		
	sb.append("</tr>");	
	sb.append("</table>");
	document.getElementById("formChangeTab").innerHTML = sb.toString();
//	var rs=new Ext.lt.recordset({column:[],datas:[]});
	datatableChange=new Ext.lt.editdatatable(new Ext.lt.recordset({column:[],datas:[]}));
	datatableChange.setCols([
	datatableChange.columns.seq,			
	{name:'ISENABLE',alias:'�Ƿ�����',datatype:'S',edit:true,mapper:booleanMapper,format:'#name'},
	{name:'TAGTABLE',alias:'Ŀ���',datatype:'S',mapper:tableMapper,format:'#name'},
	{name:'FORMTYPE',alias:'ҵ������',datatype:'S',mapper:formTypeMapper,format:'#name'},
	{name:'NAME',alias:'ת����ϵ����',datatype:'S'},
	{name:'SOURCETABLE',alias:'��Դ��',datatype:'S',mapper:tableMapper,format:'#name'},
	{name:'LEVELNO',alias:'���ü���',datatype:'S'},
	{name:'REMARK',alias:'��ע',datatype:'S'}
	]);		
	datatableChange.setMouselight('#597EAA');
	datatableChange.mousedrag(false);
	datatableChange.setClassName('dttheme_budget');		
	datatableChange.draw(formChangeDiv);
	}
	Ext.lt.RCP.server("datacommon_taskclassification_service", "getFormChange",params,function(data){
		if(data.error){
			alert(data.error);
		}
		else{
			var rsChange=	datatableChange.getRecordset();
			rsChange.clear();
			rsChange.join(data.dataList,rsChange.size());
			datatableChange.reflash();			
		}
		
	
});	
	
}

function initAuditFormTab(params){
	
	
	if(datatableAudit == null){
		document.getElementById("auditFormTab").innerHTML = "";
		var sb = new StringBuffer();

	//sb.append("<div style='margin:0px;'>");
	
	sb.append("<table align='center' width=\"950px;\" border=\"0\" >");
		sb.append("<tr style='background:#FCFCFC;height:30px;'>");
			sb.append("<th>");   
				sb.append("<span>�ɼ���������Ӧ���</span>");
			sb.append("</th>");
			sb.append("<th>");   
				sb.append("<span>��˶�Ӧ�ɼ���</span>");
			sb.append("</th>");
		sb.append("</tr>");
		
		sb.append("<tr>");
			sb.append("<td>");   
				sb.append("<div id=\"query_t\" style=\"height:20px;margin:0;\">");				
					sb.append("<span><span title=\"����\" class=\"add_btn\" onclick=\"saveAuditForm()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0)\">����</a></span></span>");	
					
				sb.append("</div>");
			sb.append("</td>");
			sb.append("<td>");  
				
			sb.append("</td>");
		sb.append("</tr>");
		
		sb.append("<tr>");
			sb.append("<td style='width:50%;'>");
				sb.append("<div id='auditformDiv_1' style='width:100%;height:272px;'></div>");
			sb.append("</td>");
			sb.append("<td style='width:50%;'>");
				sb.append("<div id='auditformDiv_2' style='width:100%;height:272px;'></div>");
			sb.append("</td>");
		sb.append("</tr>");
		
 	sb.append("</table>");
//	sb.append("</div>");
 	document.getElementById("auditFormTab").innerHTML = sb.toString();
 	
 	datatableAudit=new Ext.lt.editdatatable(new Ext.lt.recordset({column:[],datas:[]}));
	datatableAudit.setCols([
	datatableAudit.columns.seq,			
	{name:'ISENABLE',alias:'�Ƿ�����',datatype:'S',edit:true,mapper:booleanMapper,format:'#name'},
	{name:'NAME',alias:'�������',datatype:'S'},
	{name:'LFORM',alias:'�󱨱�',datatype:'S',mapper:tableMapper,format:'#name'},
	{name:'RFORM',alias:'�ұ���',datatype:'S',mapper:tableMapper,format:'#name'},
	{name:'AUDITTYPE',alias:'�������',datatype:'S'},			
	{name:'LEVELNO',alias:'���ü���',datatype:'S'},
	{name:'EXPLAIN',alias:'���˵��',datatype:'S'}
	]);		
	datatableAudit.setMouselight('#597EAA');
	datatableAudit.mousedrag(false);
	datatableAudit.setClassName('dttheme_budget');		
	/*
datatableAudit.onEvent('ondblclick',function(td,el,l,c,d){				
		var params = {};
		params["auditId"] = d.AUDITID;
		Ext.lt.RCP.server("datacommon_taskclassification_service", "getFormByAudit",params,function(data){
			if(data.error){				
				alert(data.error);
			}
			else{
				var rs = datatableAuditTwo.getRecordSet();
				rs.clear();		
				rs.join(data.formList,rs.size+1);
				
			
			}
		});
		
	});
*/
	datatableAudit.draw(document.getElementById("auditformDiv_1"));
	
	datatableAuditTwo=new Ext.lt.datatable35(new Ext.lt.recordset({column:[],datas:[]}));
	datatableAuditTwo.setCols([
	datatableAuditTwo.columns.seq,			
	{name:'NAME',alias:'�ɼ�������',datatype:'S'},
	{name:'TABLECODE',alias:'�������',datatype:'S'},
	{name:'FORMTYPE',alias:'ҵ������',datatype:'S',mapper:formTypeMapper}
	]);		
	datatableAuditTwo.setMouselight('#597EAA');
	datatableAuditTwo.mousedrag(false);
	datatableAuditTwo.setClassName('dttheme_budget');		
	datatableAuditTwo.draw(document.getElementById("auditformDiv_2"));
 	

	
	}
	Ext.lt.RCP.server("datacommon_taskclassification_service", "getAuditForm",params,function(data){
		if(data.error){
			alert(data.error);
		}
		else{
			var rsOne=	datatableAudit.getRecordset();
			rsOne.clear();
			rsOne.join(data.dataList,rsOne.size());
			
			datatableAudit.reflash();
			
//			var rsTwo=	datatableAuditTwo.getRecordset();
//			rsTwo.clear();
//			rsTwo.join(data.formList,rsTwo.size());
//			datatableAuditTwo.reflash();			
			
		}
		
	
});	
}


function initAttachTab(params){
	
	if(attachTable == null ){
		document.getElementById("attachFormTab").innerHTML = "";
		var sb = new StringBuffer();
	
	sb.append("<table align='center' width=\"100%\" border=\"0\" >");
		sb.append("<tr>");
			sb.append("<td>");   
				sb.append("<div id=\"query_t\" style=\"height:20px;width:99%;margin:0;\">");				
					sb.append("<span><span title=\"����ļ�\" class=\"add_btn\" onclick=\"addAttach()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0)\">����ļ�</a></span></span>");	
					sb.append("<span><span title=\"ɾ���ļ�\" class=\"del_btn\" onclick=\"delAttach()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0);\">ɾ���ļ�</a></span></span>");	
				sb.append("</div>");
			sb.append("</td>");
		sb.append("</tr>");
		
		sb.append("<tr>");
			sb.append("<td>");
				sb.append("<div id='attachDiv' style='overflow:auto;width:800px;;height:330px;'></div>");
			sb.append("</td>");
		sb.append("</tr>");
 	sb.append("</table>");
	
 	document.getElementById("attachFormTab").innerHTML = sb.toString();
 	
 	var _attach = attachTable = new Ext.lt.datatable35(new Ext.lt.recordset({column:[],datas:[]}));
	
	_attach.setCols([
	                 	_attach.columns.seq,
	                 	_attach.columns.checkbox,
						{name:'FILENAME',width:'300',datatype:'S',alias:'����',style:'text-align:left'},
						{name:'FILETYPE',width:'180',datatype:'S',alias:'����',style:'text-align:left'},
						{name:'FILESIZE',width:'180',datatype:'S',alias:'��С',style:'text-align:right'}
						]);
								
	_attach.setEditSelectCheckbox(false);
	_attach.setMouselight('#597EAA');
	_attach.mousedrag(false);
	_attach.setClassName('dttheme_budget');
	
	_attach.draw(document.getElementById("attachDiv"));
	}
	
 	showdiv();
	var result = Ext.lt.RCP.asynserver('tpms_fillproject_service', "findAttach",params);
	if(result.error){
		closediv();
		alert(result.error);
		return;
	}
	else {
		closediv();
	}
	
	var attachRs=	attachTable.getRecordset();
	attachRs.clear();
//	attachRs.join(result.attachList,attachRs.size());
	attachTable.reflash();	
	
	
}

function addForm(){
	var datas = datatableTwo.getRecordSet().query({check:1});
	if(datas.length==0){
		alert("��ѡ��һ���ɼ���");
		return;
	}
	var newdefault = [];	
	for(var i = 0;i<datas.length;i++){
		var headdeafaultvalue = {};
		headdeafaultvalue["TABLECODE"] = datas[i].TABLECODE;
		headdeafaultvalue["DISPLAYNO"]=0;
		headdeafaultvalue["CHANGENO"]=0;
		headdeafaultvalue["ISHIDE"] = 1;
		headdeafaultvalue["LEVELNO"]= levelno;		
		headdeafaultvalue["CENTRAL"] = 1;
		headdeafaultvalue["PROVINCE"] = 1;
		headdeafaultvalue["CITY"] = 1;
		headdeafaultvalue["COUNTY"] = 1;
		newdefault.push(headdeafaultvalue);
		
	}
	
	
	datatableOne.getRecordSet().addData(newdefault,datatableOne.getRecordSet().size()+1);
	datatableOne.reflash();
	datatableTwo.getRecordSet().remove(datas);
	datatableTwo.reflash();
}

function delForm(){
	var datas = datatableOne.getRecordSet().query({check:1});
	if(datas.length==0){
		alert("��ѡ��һ���ɼ���");
		return;
	}
	var newdefault = [];	
	for(var i = 0;i<datas.length;i++){
		var headdeafaultvalue = {};
		headdeafaultvalue["TABLECODE"] = datas[i].TABLECODE;		
		newdefault.push(headdeafaultvalue);
		
	}	
	datatableTwo.getRecordSet().addData(newdefault,datatableTwo.getRecordSet().size()+1);
	datatableOne.getRecordSet().remove(datas);
}

function saveTaskForm(){
	var rsdata = datatableOne.getRecordset();	
	var inputobj = rsdata.toArray();
	var params = {};
	params["rsjason"]=inputobj;
	params["itemid"]=taskid;
	Ext.lt.RCP.server("datacommon_taskclassification_service", "saveTaskForm",params,function(data){
		if(data.error){
			alert(data.error);
		}
		else{
			alert("����ɹ�!");
		}
		
	
});	
}
	
function saveFormChange(){
		var formList = [];
		//var formData = {};

		var rsdata = datatableChange.getRecordset().query({ISENABLE:1});	
		if(rsdata.size()>0){
			for(var i = 0;i<rsdata.size();i++){
				var formData = rsdata[i];
				formList.push(formData);
				
			}
		}
			
		
		//var inputobj = rsdata.toArrayJSON();
		var params = {};
		params["rsjason"]=JSON.stringify(formList); 
		params["itemid"]=taskid;
		Ext.lt.RCP.server("datacommon_taskclassification_service", "saveFormChange",params,function(data){
			if(data.error){
				alert(data.error);
			}
			else{
				alert("����ɹ�!");
			}
			
		
	});	
}


function saveAuditForm(){
	var formList = [];
	//var formData = {};

	var rsdata = datatableAudit.getRecordset().query({ISENABLE:1});	
	if(rsdata.size()>0){
		for(var i = 0;i<rsdata.size();i++){
			var formData = rsdata[i];
			formList.push(formData);
			
		}
	}
		
	
	//var inputobj = rsdata.toArrayJSON();
	var params = {};
	params["rsjason"]=JSON.stringify(formList); 
	params["itemid"]=taskid;
	Ext.lt.RCP.server("datacommon_taskclassification_service", "saveAuditForm",params,function(data){
		if(data.error){
			alert(data.error);
		}
		else{
			alert("����ɹ�!");
		}
		
	
});	
}

//���Ӹ���
function addAttach(){
	
	var params = [];
	params.push("projectId="+"1");
	params.push("type="+6);
	
	fileUpload = new FileUploadProject(params,"*.txt",function(data){
		if(data.dataMap){
			
			var rs = attachTable.getRecordSet();
			rs.addData(data.dataMap,rs.size()+1);
		}
	});
	
}

function delAttach(){
	var rs = attachTable.getRecordSet();
	var selData = rs.query({check:1});
	
	if(!rs || rs.length==0){
		alert("����ѡ��һ�����ݣ�");
		return;
	}
	
	var itemids = [];
	for(var i=0,n=selData.length; i<n; i++){
		itemids.push(selData[i].ITEMID);
	}
	
	showdiv();
	Ext.lt.RCP.server("tpms_fillproject_service", "deleteAttach",{"itemids":itemids.join(",")},function(data){
		if(data.error){
			closediv();
			alert(data.error);
		}
		else{
			rs.remove(selData);
			
			closediv();
			alert("ɾ���ɹ���");
		}
	});
}
function dolefttoright() {
	var leftdata = codedatamodeltab.getRecordSet().query({check:1});
	if(!leftdata || leftdata.length==0){
		alert("��ѡ��");
		return;
	} else {
		var map = leftdata[0];
		var newmap = new Object();
		for(var key in map){			
			if(key == 'check') {
				newmap[key] = 0;
			} else {
				newmap[key] = map[key];
			}
		}
		var array = [];
		array[0] = newmap;
		codedatareal.addData(array);
	}
	textarea();
}
function dorighttoleft() {
	var rightdata = codedatarealtab.getRecordSet().query({check:1});
	if(!rightdata || rightdata.length==0){
		alert("��ѡ��Ҫɾ���Ĺ���");
		return;
	} else {
		codedatareal.remove(rightdata);
		codedatarealtab.reflash();
	}
	textarea();
}
function saverule() {
	var data = datatable.getRecordSet().query({check:1});
	var classid = taskid;
	var realrs = codedatareal.toArrayJSON();
	var params = {};
	params["type"]=type;
	params["rsjson"]=realrs;
	params["classid"]=data[0].ITEMID;
	Ext.lt.RCP.server("datacommon_taskclassification_service", "saveNameRule",params,function(data){
		if(data.error){
			alert(data.error);
		}
		else{
			alert("����ɹ�!");
			codeform_wind.close();
		}	
	});		
}
function doup(){
	var rightdata = codedatarealtab.getRecordSet().query({check:1});
	var pos = rightdata[0]._sortid-2;
	if(pos<-1) return;
	codedatareal.remove(rightdata);
	codedatareal.addData(rightdata,pos);
	textarea();
}
function dodown(){
	var rightdata = codedatarealtab.getRecordSet().query({check:1});
	var pos = rightdata[0]._sortid;
	codedatareal.remove(rightdata);
	codedatareal.addData(rightdata,pos);
	textarea();
}
function textarea(){
	var txt = '';
	rs = codedatareal.toArray();
	for (var i = 0; i < codedatareal.size(); i++) {
		txt += rs[i].VALUE;
	}
	document.getElementById("filedcname").value = txt;
}