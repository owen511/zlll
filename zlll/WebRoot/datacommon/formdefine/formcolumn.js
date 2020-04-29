
var table, tree;
var columnPro_wind = null;

var treeData = null;
var tableData = null;

var dataTypeObj = {};
var product = null;
var tablecode = null;

var product = null;
var clevelno = null;
var amtUnit = 0;
var dataTree = null;
var _tempTree = null, _tempTableTree = null;
var selNodeFlag = false;
var refAll = [];
var productType = null;
var contextTree = null;
var formsRS = null;

var treeClickMark = false;

var cacheFormColumn = new HashMap();
var factors = ["itemid","code","name","isleaf","superitemid"];

var formcolumn_list = function(config, service) {
	treeData = config.columnQree;
	tableData = config.columnTable;
	product = config.product;
	tablecode = config.tablecode;
	mainmenu = config.mainmenu;
    submenu = config.submenu;
    product = config.product;
    clevelno = config.levelno;
	amtUnit = config.amtUnit;
	refAll = config.refAll;
	productType = config.productType;
	formsRS = config.formsRS;
   
	//��ʼ��ҳ��
	initLayoutMain(config);
	
	//��������ѡ��
	initDataType();
	
	//�������ṹ�¼���
	loadQtree(treeData);

	//----table start
	table = new Ext.lt.datatable35(tableData);

	var headDatas = config.headList;
	headDatas.insert(table.columns.seq,0);
	headDatas.insert(table.columns.radio);
	
	table.setCols(headDatas);

	table.setEditSelectCheckbox(false);
	table.setMouselight('#597EAA');
	table.mousedrag(false);
	table.setClassName('dttheme_budget');
	table.headsort(true);

	table.setLayout();
	table.draw(tableContainer);

	$("#column_dataType").append($("#div_dataType"));
	$("#div_dataType").show();

	// �����������л�
	$("#dataType_select").bind("change", function() {
		
		//Ŀǰȫ���أ���Ϊû������
		if(this.value == "label"){
			$("#dataType_restriction").hide();
		}
		//�����е������������Ե�
		else{
			$("#dataType_restriction > div").hide();
			$("#dataType_restriction").show();
			
			$("#dataType_restriction_" + this.value).show();
		}
	});

	$("#extends_confirm_btn").bind("click", function() {
		extends_wind.hidden();

		alert("����ɹ���");
	});
	
	//����
	$("#btn_save_column_property").unbind("click").bind("click", function(e) {
		var saveType = $(this).attr("saveType");
		if(!saveType) saveType = 1;
		
		var columnName = $("#column_name").val();
		var columnCode = $("#column_columncode").val();
		
		if(isEmpty(columnName)){
			alert("������������!");
			return;
		}
		
		if(isEmpty(columnCode)){
			alert("������\"���ݱ��ֶ�\"�ֶ���!");
			return;
		}
		if(/[^a-zA-Z _]/.test(columnCode)){
			alert("\" ���ݱ��ֶ�\"ֻ������ĸ���!");
			return;
		}
		
		if(columnName.length>16){
			alert("�����Ʋ��ܳ���16!");
			return;
		}
	
	   if(columnCode.length>16){
			alert("�ֶ������ܳ���16!");
			return;
		}
		columnCode = columnCode.toUpperCase();
		
		//���ִ����ͷ������
		var params = {};
		params["col.name"] = columnName;
		params["col.columncode"] = columnCode;
		params["col.iskey"] = ischecked("column_iskey");
		params["col.style"] = $("#column_style").val();
		params["col.datatype"] = $("#dataType_select").val();
		
		params["head.name"] = columnName;
		params["head.columnvalue"] = columnName;
		params["head.columncode"] = columnCode;
		params["head.required"] = ischecked("column_required");
		params["head.ishide"] = ischecked("column_ishide");
		params["head.isedit"] = ischecked("column_isedit");
		params["head.levelno"] = clevelno;
		
		var tempParams = dataTypeObj[$("#dataType_select").val()]();
		
		params["columnId"] = $("#column_id").val();
		
		$.extend(params,tempParams);
		
		params["tablecode"] = tablecode;
		
		//��������
		if(saveType == "1"){
			
			saveData(params);
		}
		//�������
		else if(saveType == "2"){
			
			saveNextData(params,$(this).attr("grade"),$(this).attr("superitemid"));
		}
		else{
			alert("δ֪�ı������ͣ�");
		}
	});
	
	//����չ���Ա���
	$("#extends_confirm_btn").unbind("click").bind("click",function(){
		var data = table.getRecordSet().query({check:1});
		if(!data || data.length!=1){
			alert("��ѡ����Ҫ������չ���Եı�!");
			return;
		}
		
		//����ѡ��
		var params = {};
		params["columnCode"] = data[0].COLUMNCODE;
		params["tableCode"] = tablecode;
		
		var checkJSON = [];
		$("#extends_attr input[type=checkbox]:checked").each(function(index){
			
			checkJSON.push({"tableCode":params.tableCode,"columnCode":params.columnCode,"attrId":this.value});
		});
		
		params["jsonreq"] = JSON.stringify(checkJSON);
		
		showdiv();
		Ext.lt.RCP.server("datacommon_formcolumn_service", "saveExtendAttr",params,function(data){
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
	
	//�������
	$("#reference_input").unbind("click").bind("click",function(e){
		
		if(contextTree != null){
			
			contextTree.draw({
				tagInput : "reference_input",
				datas : config.refAll
			});
		}
	});
	
	//�ɼ����������
	$("#tableReference_input").unbind("click").bind("click",function(e){
		var c = this;
		if(contextTree != null){
			
			contextTree.draw({
				tagInput : c.id,
				datas : config.formsRS,
				onClickAfter : function(node){
					
					if(cacheFormColumn.get(node.itemid) == null){
						
						showdiv();
						Ext.lt.RCP.server("datacommon_formcolumn_service", "findColumnIsleafQtree",{"tableCode":node.itemid},function(data){
							if(data.error){
								alert(data.error);
							}
							else{
								
								cacheFormColumn.put(node.itemid,data.columnQree);
								//���
								$("#factorSet_Div input[type=text]").each(function(index){
									
									this.value = "";
									this.itemid = "";
									this.code = "";
								});
							}
							closediv();
						});
					}
				}
			});
		}
	});

	//����������������
	contextTree = new formcolumn_tree();


	//��Ҫ�������¼�
	$("#factorSet_Div").unbind("click").bind("click",function(e){
		var $e = $(e.target);
		if(!$e.is("input") || !$e.hasClass("reference_factor")) return;
		
		var d = document.getElementById("tableReference_input");
		if(!d.itemid){
			alert("����ѡ�����òɼ���");
			return;
		}
		
		if(contextTree != null){
			
			contextTree.draw({
				tagInput : $e[0].id,
				datas : cacheFormColumn.get(d.itemid)
			});
		}
	});

}
// -----end

var formcolumn_tree = function(){
	if(!(this instanceof formcolumn_tree)){
		return new formcolumn_tree(config);
	}
	
	var _temp = {};
	var selNodeFlag = false;
	
	var setting = {};
	
	var initTree = function(){
		var _input = document.getElementById(setting.tagInput);
		_input.code = _input.value;
		_input.value = "";
		
		var checked = [];
		if(_input.itemid){
			checked.push(_input.itemid);
		}
		
		_temp.tree = new Ext.lt.Qtree({
			data: setting.datas,
			showRootNode:true,
			outformart:'#code-#name',
			selectmode:'false',
			values:checked
		});
		
		_temp.tree.draw(document.getElementById(setting.drawDiv));
	}
	
	var initEvent = function(){
		
		_temp.tree.on({"dblclick" : function(tree,param){
			var sels = tree.getSelected();
			if(sels.length == 0) return;
		
	    	var selNode = sels[0];
	    	if(!selNode || selNode.isleaf == 0){
				//������ʾ��ֱ��չ��ĩ��
	    		
	    	}
			else{
	    		$(setting.drawDivClass).hide();
				var _input = document.getElementById(setting.tagInput);
	    		
				var format = "#code-#name";
				format = format.replace("#code",selNode.code);
				format = format.replace("#name",selNode.name);
				
	    		_input.innerText = format;
	    		_input.itemid = selNode.itemid;
				_input.code = format;
				
				setting.onClickAfter(selNode);
				
				$("body").mousedown();
	    	}
	    }});
		
		//���Ĳ�ѯ����
		$("#"+setting.tagInput).keyup(function(){
			
			if(selNodeFlag && this.value){
				
				_temp.tree.searchnode([{field:'code',values:[this.value.trim()]},{field:'name',values:[this.value.trim()]}],'contain');
				if(!this.value.trim()) _temp.tree.clearSelected();
			}
			selNodeFlag = true;
	  	}).keyup();
		
		//�ر�div���
		$("body").bind("mousedown",function(e){
			
			var el = $(e.target);
			if (el.length>0 && el.parents("#"+setting.drawDiv).length == 0 && !el.hasClass(setting.drawDivClass) ) {
				$("#"+setting.drawDiv).hide();	
				
				var _input = _temp.getInput();
				_input.code ? (_input.value = _input.code) : (_input.value = "");
			}
		});
	}
	
	var positionDiv = function(){
		var $input = $(_temp.getInput()), $div = $("#"+setting.drawDiv);
	  	
		var pos = $input.position();
		$div.css("top",(pos.top+$input.height()+3)+"px");
	  	$div.css("left",(pos.left)+"px");
		$div.width($input.width());
		
	  	$div.show();
	}
	
	_temp.draw = function(config){
		
		setting = {
			drawDivClass : "tempContainerClass",
			drawDiv : "tableReference_factor_treecontainer",
			tagInput : "tableReference_input",
			datas : null,
			onClickAfter : function(node){}
		};
	
		$.extend(setting, config);
		
		initTree();
		setTimeout(function(){
			initEvent();
			positionDiv();
		},100);
	}
	
	_temp.getInput = function(){
		return document.getElementById(setting.tagInput);
	}
	
	return _temp;
} 

function saveData(params){
	//��ȡ����
	var selected = tree.getSelected();
	var superitemid = 0;
	if(selected.length > 0){
		
		superitemid = selected[0].itemid;
	}
	params["head.superitemid"] = superitemid;
	
	showdiv();
	Ext.lt.RCP.server("datacommon_formcolumn_service", "saveColumn",params,function(data){
		if(data.error){
			alert(data.error);
		}
		else{
			columnPro_wind.close();
			
			//���¼�����
			loadQtree(data.columnQree);
			
			setTimeout(function(){
				var node = tree.getNode(superitemid);
				
				tree.selectedNode(node);
			},0);
		}
		closediv();
	});
}

function saveNextData(params,grade,superitemid){
	params["head.superitemid"] = superitemid;
	// ��ѡ����λ��
	params["previousGrade"] = grade;
	
	showdiv();
	Ext.lt.RCP.server("datacommon_formcolumn_service", "saveNextColumn",params,function(data){
		if(data.error){
			alert(data.error);
		}
		else{
			columnPro_wind.close();
			
			//���¼�����
			loadQtree(data.columnQree);
			
			setTimeout(function(){
				var node = tree.getNode(0);
				
				tree.selectedNode(node);
			},0);
		}
		closediv();
	});
	
}

function loadQtree(treeData){
	
	tree = new Ext.lt.Qtree({
		data : treeData,
		linkchild : true,
		linkparend : true,
		parentlinksub : true,
		showRootNode : true,
		selectmode : 'false',
		expandlevel: 5,
		outformart : '#code-#name',
		rootNode : {name : "�ɼ�����ά��",itemid : "0",superitemid : "0",isleaf : 0}
	});
	tree.draw(treeContainer);
	
	// ���Ĳ�ѯ����
	$("#selectInput").keyup(function() {
		if(treeClickMark){
			
			tree.searchnode([ {field :'code',values:[this.value.trim()]},{field :'name',values:[this.value.trim()]}],'contain');
			if (!this.value.trim()){
				
				tree.clearSelected();
				queryColumn(0);
			}
		}
		
		treeClickMark = true;
	}).keyup();

	//���ĵ���¼�
	tree.on({nodeclick : function(tree, param) {
		    dataTree = param.data;
			
			var superItemid = 0;
			dataTree && (superItemid = dataTree.itemid);

			queryColumn(superItemid);
		}
	});
}

//��յ�����
function clearWind(dataType){
	
	$("#Dlg_ColumnProperty input[type=checkbox]").attr("checked",false);
	
	$("#Dlg_ColumnProperty input").each(function(index){
		if(this.type == "text"){
			
			(this.isdefaultVal ? (this.value = this.isdefaultVal) : (this.value = ""));
			
			if(this.itemid) this.itemid = "";
			if(this.code) this.code = "";
		}	
		else if (this.type == "checkbox"){
			
			if(this.isdefaultVal != undefined){
				
				setchecked(this.id,this.isdefaultVal);
			}
		}	
		else{
			
			//����չ����
		}
	});
	
	$("#dataType_select").val(dataType);
	
	$("#dataType_select").change();
	
	//���ò����޸ĵ���
	$("#column_columncode").attr("disabled",false);
	
	$("#column_style").val("");
}

// ���
function doadd() {
    if(dataTree){
	    var data = dataTree;
	    if(data.isdefaultcol == 1){
		      alert("Ĭ���ֶβ�������");
		      return;
	    }
    }
	columnPro_wind.resetTitle("����");
	columnPro_wind.show();

	$("#Dlg_ColumnProperty select").show();
	
	clearWind("singlelinetext");
	
	$("#column_id").val("0");
	
	$("#btn_save_column_property").attr("saveType","1");
}

//��ӵ���һ��
function doaddNext(){
	var selected = tree.getSelected();
	if(!selected || selected.length==0){
		alert("����ѡ��һ�У�");
		return;
	}
	columnPro_wind.resetTitle("����");
	columnPro_wind.show();

	$("#Dlg_ColumnProperty select").show();
	
	clearWind("singlelinetext");
	
	$("#column_id").val("0");
	
	$("#btn_save_column_property").attr("saveType","2");
	//��ѡ�����λ�ô���
	$("#btn_save_column_property").attr("grade",selected[0].grade);
	//�͸��ڵ�
	$("#btn_save_column_property").attr("superitemid",selected[0].superitemid);
}

//�޸�
function doedit() {
	var data = table.getRecordSet().query({check:1});
	if(data.length==0){
		alert("��ѡ��Ҫ�޸ĵ���");
		return;
	}
	if(data[0].ISDEFAULTCOL == 1){
		alert("Ĭ���ֶβ����޸�");
		return;
	}
	
	if(data[0].PRIMARYKEY == 1){
		alert("�����в����޸�");
		return;
	}
	
	if (!data || data.length != 1) {
		alert("����ѡ��һ������Ϣ����!");
		return;
	}
	/*
	var LEVEL = data[0].LEVELNO;
	if(clevelno > LEVEL){
	    alert("�û�Ȩ�޲����������޸ģ�");
	    return;
	}
	*/
	clearWind("singlelinetext");

	var params = {};
	params["tableCode"] = tablecode;
	params["columnCode"] = data[0].COLUMNCODE;
	
	showdiv();
	Ext.lt.RCP.server("datacommon_formcolumn_service", "editColumn",params,function(data){
		if(data.error){
			alert(data.error);
		}
		else{
			columnPro_wind.resetTitle("�޸�");
			
			columnPro_wind.show();
			$("#Dlg_ColumnProperty select").show();
			
			var column = data.column;
			setValueByDataType(column,data);
			
			setchecked("column_iskey",column.iskey);
			setchecked("column_required",column.required);
			setchecked("column_ishide",column.ishide);
			setchecked("column_isedit",column.isedit);
			
			$("#column_name").val(column.name);
			$("#column_columncode").val(column.columncode);
			$("#column_style").val(column.style);
			
			$("#dataType_select").val(column.datatype);
			$("#dataType_select").change();
			
			//���ò����޸ĵ���
			$("#column_columncode").attr("disabled",true);
			
			$("#column_id").val(column.itemid);
		}
		closediv();
	});

}

//��ѯ�ж���
function queryColumn(superItemid){
	
	var params = {};
	params["superItemid"] = superItemid;
	params["tableCode"] = tablecode;
	
	//showdiv();
	Ext.lt.RCP.server("datacommon_formcolumn_service", "queryColumn",params,function(data){
		if(data.error){
			alert(data.error);
		}
		else{
			var rs = table.getRecordset();
			rs.clear();
			
			data.columnList.length>0 && rs.addData(data.columnList,-1);
			
			table.reflash();
		}
		//closediv();
	});
}

//ɾ����
function dodelete() {
	var dataTable = table.getRecordSet().query({check:1});
	if(dataTable.length==0){
	  alert("��ѡ��Ҫɾ������");
	  return;
	}
	
	if(dataTable[0].PRIMARYKEY == 1){
		alert("�����ֶβ���ɾ��");
		return;
	}
	
	if(dataTable[0].ISDEFAULTCOL == 1){
		alert("Ĭ���ֶβ���ɾ��");
		return;
	}
	
	if (!dataTable || dataTable.length != 1) {
		alert("��ѡ����Ҫɾ��������Ϣ����!");
		return;
	} 
	else {
	    //var LEVEL = dataTable[0].LEVELNO;
		//if(clevelno > LEVEL){
		//    alert("�û�Ȩ�޲���������ɾ����");
		//    return;
		//}
            
		if (confirm("�Ƿ�ɾ����ѡ����Ϣ��")) {

			var params = {};
			params["tablecode"] = tablecode;
			params["columncode"] = dataTable[0].COLUMNCODE;
			Ext.lt.RCP.server("datacommon_formcolumn_service", "deleteColumn",params,function(data){
				if(data.error){
					alert(data.error);
					closediv();
				}
				else{
					var selected = tree.getSelected();
					var superitemid = 0;
					if(selected.length > 0){
						
						superitemid = selected[0].itemid;
					}
					
					tree.removeNode(data.headItemid);
					
					var node = tree.getNode(superitemid);
					tree.selectedNode(node);
					
					closediv();
					alert("ɾ���ɹ�!");
				}
			});
		}
	}
}

// ��չ����
function extendAttr() {
	var data = table.getRecordSet().query({
		check : 1
	});
	if (!data || data.length != 1) {
		alert("��ѡ��һ������Ϣ����!");
		return;
	}

	$("#extends_attr").show();

	extends_wind = new Ext.lt.window({
		title : '��չ��������',
		fitmode : 'body',
		className : 'wind7',
		mark : true,
		autoshow : false,
		pop : true,
		w : 562,
		h : 350
	});

	extends_wind.draw(extends_attr);

	extends_wind.show();
	
	
	//����ѡ��
	var params = {};
	params["columnCode"] = data[0].COLUMNCODE;
	params["tableCode"] = tablecode;
	
	showdiv();
	Ext.lt.RCP.server("datacommon_formcolumn_service", "loadExtendAttr",params,function(data){
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

// ����������
function setPrimaryKey() {
	var data = table.getRecordSet().query({check : 1});
	if (!data || data.length != 1) {
		alert("��ѡ��һ������Ϣ����!");
		return;
	}
	
	if(data[0].ISLEAF == "0"){
		alert("�����в�������Ϊ����!");
		return;
	}

	if(data[0].PRIMARYKEY == "1"){
		alert("�Ѿ��������в���Ҫ����!");
		return;
	}
	
	var params = {};
	params["columnCode"] = data[0].COLUMNCODE;
	params["tableCode"] = tablecode;
	
	var superItemid = "0";
	var selected = tree.getSelected();
	if(selected && selected.length!=0){
		
		superItemid = selected[0].itemid;
	}
	params["superItemid"] = superItemid;
	
	showdiv();
	Ext.lt.RCP.server("datacommon_formcolumn_service", "setPrimaryKey",params,function(data){
		if(data.error){
			alert(data.error);
		}
		else{
			var rs = table.getRecordset();
			rs.clear();
			
			data.columnList.length>0 && rs.addData(data.columnList,-1);
			
			table.reflash();
			
			alert("���������гɹ���");
		}
		closediv();
	});
}

//��ͬ�����ͶԲ�����ֵ��ͬ
function initDataType(){
	
	dataTypeObj["singlelinetext"] = function(){
		var params = {};
		var maxLength = $("#singlelinetext_maxlength").val();
		if(!maxLength){
			maxLength = "255";
		}
		params["col.maxlength"] = maxLength;
		params["col.minlength"] = $("#singlelinetext_minlength").val();
		params["col.regexp"] = $("#singlelinetext_regexp").val();
		
		return params;
	}
	
	dataTypeObj["mutilinetext"] = function(){
		var params = {};
		params["col.maxlength"] = $("#mutilinetext_maxlength").val();
		params["col.minlength"] = $("#mutilinetext_minlength").val();
		
		var style = new StringBuffer();
		style.append("height:"+$("#mutilinetext_height").val()+"px");
		
		var overflow = ($("#mutilinetext_overflow").is(":checked") ? "hidden" : "");
		if(overflow){
			
			style.append("overflow:"+overflow);
		}
		style.append("");
		
		params["col.style"] = style.toString(";");
		
		return params;
	}
	
	dataTypeObj["bool"] = function(){
		var params = {};
		params["col.elementtype"] = $("#bool_format").val();
		params["col.format"] = "#name";
		
		return params;
	}
	
	dataTypeObj["number"] = function(){
		var params = {};
		params["col.maxvalue"] = $("#number_max").val();
		params["col.minvalue"] = $("#number_min").val();
		var decimal = $("#number_decimal").val();
		if(decimal == ""){
			decimal = "0";
		}
		params["col.decimalvalue"] = decimal;
		params["col.thousand"] = document.getElementById("number_thousand").checked;
		params["col.defaultval"] = $("#number_defaultval").val();
		
		//��ʱ�Ȳ����unit���ԣ���ʽ���ĵ�λ(unit)��bug
		//var format = {"unit":amtUnit,"dotname":decimal,"qfw":$("#number_thousand").attr("checked")};
		var format = {"dotname":decimal,"qfw":params["col.thousand"]};
		params["col.format"] = JSON.stringify(format);
		return params;
	}
	
	dataTypeObj["datetime"] = function(){
		var params = {};
		params["col.format"] = $("#datetime_format").val();
		
		return params;
	}
	
	dataTypeObj["formula"] = function(){
		var params = {};
		
		return params;
	}
	
	//����������
	dataTypeObj["reference"] = function(){
		var params = {};
		
		params["col.sourceelement"] = (document.getElementById("reference_input").itemid || "");
		params["col.format"] = $("#reference_format").val();
		
		return params;
	}
	
	//�ɼ�������
	dataTypeObj["tableReference"] = function(){
		var params = {};
		
		params["col.format"] = $("#tableReference_format").val();
		params["col.sourceelement"] = (document.getElementById("tableReference_input").itemid || "");
		
		var input_id = "tableReference_factor_";
		for(var i=0,n=factors.length; i<n; i++){
			
			params["col.element"+factors[i]] = document.getElementById(input_id+""+factors[i]).itemid;	
		}
		
		return params;
	}
	
	dataTypeObj["file"] = function(){
		var params = {};
		
		params["col.maxvalue"] = $("#file_format").val();
		
		return params;
	}
	
	dataTypeObj["label"] = function(){
		
		return {};
	}
}

//��ֵ
function setValueByDataType(column,context){
	
	//�ַ���
	$("#singlelinetext_maxlength").val(column.maxlength);
	$("#singlelinetext_minlength").val(column.minlength);
	$("#singlelinetext_regexp").val(column.regexp);
	
	//�����ı�
	if(column.datatype == "mutilinetext"){
		
		$("#mutilinetext_maxlength").val(column.maxlength);
		$("#mutilinetext_minlength").val(column.minlength);
		
		var style = column.style;
		
		if(style){
			if(~style.indexOf("overflow:hidden")){
			
				setchecked("mutilinetext_overflow","1");
			}
			else{
				setchecked("mutilinetext_overflow","0");
			}
			
			var height = style.substring("height".length+1,style.indexOf("px"));
			$("#mutilinetext_height").val(height);
			
			column.style = "";
		}
	}
	
	
	//����
	$("#bool_format").val(column.format);
	
	//����
	$("#number_max").val(column.maxvalue);
	$("#number_min").val(column.minvalue);
	$("#number_decimal").val(column.decimalvalue);
	$("#number_thousand").attr("checked",(!column.thousand?false:(column.thousand=="true" ? true : false)));
	$("#number_defaultval").val(column.defaultval);
	
	//��������
	$("#datetime_format").val(column.format);
	
	//��ʽ
	
	//���ö������и�ֵ
	$("#reference_format").val(column.format);
	var refInput = document.getElementById("reference_input");
	
	var refCode="", refName="";
	var refQuery = refAll.query({code:column.sourceelement});
	for(var i=0,n=refQuery.length; i<n; i++){
		
		if(column.sourceelement == refQuery[i].code){
			
			refCode = refQuery[i].code;
			refName = refQuery[i].name;
			
			break;
		}
	}
	refInput.itemid = refCode;
	refInput.code = refCode + "-" + refName;
	refInput.value = refCode + "-" + refName;
	
	
	//�ɼ������öԸ�ֵ
	$("#tableReference_format").val(column.format);
	var refTableInput = document.getElementById("tableReference_input");
	
	var refTableCode="", refTableName="";
	var refTableQuery = formsRS.query({code:column.sourceelement});
	for(var i=0,n=refTableQuery.length; i<n; i++){
		
		if(column.sourceelement == refTableQuery[i].code){
			
			refTableCode = refTableQuery[i].code;
			refTableName = refTableQuery[i].name;
			
			break;
		}
	}
	refTableInput.itemid = refTableCode;
	refTableInput.code = refTableCode + "-" + refTableName;
	refTableInput.value = refTableCode + "-" + refTableName;
	
	if(context.columnQree){
		cacheFormColumn.put(column.sourcetable, context.columnQree);
		
		var input_id = "tableReference_factor_";
		for(var i=0,n=factors.length; i<n; i++){
			
			var _input = document.getElementById(input_id+""+factors[i]);
			
			var _code="", _name="";
			var _query = context.columnQree.query({code:column["element"+factors[i]]});
			
			if(!_query || _query.length==0) continue;
			
			for(var j=0,k=_query.length; j<k; j++){
				
				if(column["element"+factors[i]] == _query[j].code){
					
					_code = _query[j].code;
					_name = _query[j].name;
					
					break;
				}
			}
			_input.itemid = _code;
			_input.code = _code + "-" + _name;
			_input.value = _code + "-" + _name;
		}
	}
	
	//����
	$("#file_format").val(column.maxvalue);
	
}

//ת��checkbox�Ƿ�ѡ��
function ischecked(id){
	var $check = $("#"+id);
	
	if($check.length>0 && $check.attr("checked")){
		return "1";
	}
	return "0";
}

//ת��checkbox�Ƿ�ѡ��
function setchecked(id,value){
	var $check = $("#"+id);
	
	if($check.length>0 && value == "1"){
		$check.attr("checked",true);
	}
	else{
		$check.attr("checked",false);
	}
}

//����
function back(){
		var params = {};
        params["product"] = product;
		params["tablecode"] = tablecode;
		params["productType"] = productType;
		jumpTo("/datacommon/formdefine/index.page?mainmenu="+mainmenu+"&submenu="+submenu+"","post",params);
}

//�ı���
/*
$("#dataType_select").live("change",function(){
	var $select = $("#dataType_select").val();       
	if($select == "singlelinetext" || $select == "mutilinetext"){
		$("#column_style").val("text-align:left");
	}
	else{
		$("#column_style").val("");
	}
});
*/

//�Ƿ�Ψһ��У��
$("#column_iskey").live("change",function(){
	var check = ischecked("column_iskey");
	if(check == 1){
		$("#column_required").attr("checked", true);
		$("#column_required").attr("disabled", true);
	}
	else{
		$("#column_required").attr("disabled", false);
	}
});

// ��ʼ����ҳ��
function initLayoutMain(config) {
	var sb = new StringBuffer();

	sb.append("<table align=\"center\" width=\"100%\" border=\"0\" id=\"table\">");
	 sb.append("<tr>");
	    sb.append("<td width=\"25%\" valign=\"top\">");
			sb.append("<div style=\"position:relative;z-index:100;\">");
				sb.append("<input type=\"text\" size=\"35\" id=\"selectInput\" value=\"\">");
			sb.append("</div>");
	        sb.append("<div id=\"treeContainer\" layout=\"{h:{fit:-27}}\" style=\"background:#fff;border:1px solid #ccc;padding:4px; overflow:auto;height:500px;\"></div>");
	    sb.append("</td>");
	    sb.append("<td width=\"70%\" valign=\"top\">");
	    	sb.append("<div id=\"query_t\" style=\"height:25px;\">");				
				sb.append("<span><span title=\"����\" class=\"budget_add\" onclick=\"doadd()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0)\">����</a></span></span>");	
				sb.append("<span><span title=\"��������ѡ�е���һ��λ��\" class=\"budget_add\" onclick=\"doaddNext()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0)\">��������ѡ�е���һ��λ��</a></span></span>");	
				sb.append("<span><span title=\"�޸�\" class=\"budget_mod\" onclick=\"doedit()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0)\">�޸�</a></span></span>");
				sb.append("<span><span title=\"ɾ��\" class=\"budget_del\" onclick=\"dodelete()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0)\">ɾ��</a></span></span>");
				sb.append("<span><span title=\"����������\" class=\"budget_setting\" onclick=\"setPrimaryKey()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0)\">����������</a></span></span>");
				//sb.append("<span><span title=\"��չ����\" class=\"budget_setting\" onclick=\"extendAttr()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0);\">��չ����</a></span></span>");	
				sb.append("<span><span title=\"����\" class=\"budget_back\" onclick=\"back()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0);\">����</a></span></span>");
			sb.append("</div>");
			sb.append("<div id=\"tableContainer\" style=\"overflow:scroll;\"  layout=\"{w:{fit:true},h:{fit:true}}\" ></div>");
		 sb.append("</td>");
	sb.append("</tr>");
	sb.append("</table>");

//����id��ֵ�޸�ʹ��
sb.append("<input type=\"text\" id=\"column_id\" stype=\"display:none;\ value=\"0\" />");

sb.append("<!-- ���������� -->");
sb.append("<div class=\"dialog_content\" id=\"Dlg_ColumnProperty\" style=\"display:none;\">");
  sb.append("<div id=\"dialog_column_field\">");
    sb.append("<span class=\"box\">");
      sb.append("<label for=\"column_name\">������<font color='red'>*</font>��</label>");
      sb.append("<input type=\"text\" id=\"column_name\" style=\"width:100px;\"></input>");
    sb.append("</span>");
    sb.append("<br class=\"clear\" />");
    sb.append("<span class=\"box\">");
      sb.append("<label for=\"column_field\">���ݱ��ֶ�<font color='red'>*</font>��</label>");
      sb.append("<input type=\"text\" id=\"column_columncode\" />");
      sb.append("<br class=\"clear\"/>");
      sb.append("<input type=\"checkbox\" id=\"column_iskey\" /><label for=\"column_iskey\">�Ƿ�Ψһ��У��</label>");
      sb.append("<input type=\"checkbox\" id=\"column_required\"/><label for=\"column_required\">�Ƿ��¼</label>");
      sb.append("<input type=\"checkbox\" id=\"column_ishide\"/><label for=\"column_ishide\">�Ƿ�����</label>");
      sb.append("<input type=\"checkbox\" id=\"column_isedit\" isdefaultVal=\"1\" /><label for=\"column_isedit\">�Ƿ�ɱ༭</label>");
    sb.append("</span>");
	sb.append("<br class=\"clear\"/><br class=\"clear\"/>");	
  sb.append("</div>");
  sb.append("<br class=\"clear\" />");
  sb.append("<div id=\"column_dataType\"></div>");
  sb.append("<div style=\"margin-top:30px;margin-left:40%;\">");
    sb.append("<button type=\"button\" id=\"btn_save_column_property\">����</button>");
    sb.append("<button type=\"button\" onclick=\"columnPro_wind.close()\">ȡ��</button>");
  sb.append("</div>");
sb.append("</div>");

sb.append("<!-- �������� -->");
sb.append("<div id=\"div_dataType\" style=\"display:none;\">");
  sb.append("<br class=\"clear\" />");
  sb.append("<div id=\"dataType_setting\">");
    sb.append("<label>��������</label>��");
    sb.append("<select id=\"dataType_select\">");
      sb.append("<option value=\"singlelinetext\">�����ı�</option>");
      sb.append("<option value=\"mutilinetext\">�����ı�</option>");
      sb.append("<option value=\"bool\">����ֵ</option>");
      sb.append("<option value=\"number\">����</option>");
      sb.append("<option value=\"datetime\">����/ʱ��</option>");
      sb.append("<option value=\"reference\">ƽ̨����</option>");
      sb.append("<option value=\"tableReference\">�ɼ�������</option>");
//      sb.append("<option value=\"formula\">��ʽ</option>");
      sb.append("<option value=\"file\">����</option>");
	  sb.append("<option value=\"label\">��ǩ</option>");
    sb.append("</select>");
    
    sb.append("&nbsp&nbsp&nbsp&nbsp&nbsp");
//    sb.append("<span class=\"box\">");
		sb.append("<label>���뷽ʽ��</label>");
		sb.append("<select id=\"column_style\">");
	      sb.append("<option value=\"\">Ĭ��</option>");
	      sb.append("<option value=\"text-align:left\">����</option>");
	      sb.append("<option value=\"text-align:center\">����</option>");
	      sb.append("<option value=\"text-align:right\">����</option>");
	    sb.append("</select>");
//	sb.append("</span>");
	
  sb.append("</div>");
  sb.append("<br class=\"clear\" />");
  sb.append("<div>");
    sb.append("<fieldset id=\"dataType_restriction\">");
      sb.append("<legend>�������ʽ</legend>");
      
      sb.append("<!-- �����ı� -->");
      sb.append("<div id=\"dataType_restriction_singlelinetext\">");
        sb.append("<span class=\"box\">");
          sb.append("<label for=\"singlelinetext_maxlength\">��󳤶�</label>��<input type=\"text\" isdefaultVal=\"255\" id=\"singlelinetext_maxlength\" style=\"width:30px;\" />");
          sb.append("<label for=\"singlelinetext_minlength\">��С����</label>��<input type=\"text\" isdefaultVal=\"0\" id=\"singlelinetext_minlength\" style=\"width:30px;\" />");
        sb.append("</span>");
        sb.append("<br class=\"clear\" />");
        sb.append("<div class=\"box\">");
			sb.append("<label for=\"singlelinetext_regexp\">������ʽ</label>��");
            sb.append("<textarea id=\"singlelinetext_regexp\" rows=\"3\" cols=\"40\">");
            sb.append("</textarea>");
        sb.append("</div>");
        sb.append("<br class=\"clear\" />");
      sb.append("</div>");
      
      sb.append("<!-- �����ı� -->");
      sb.append("<div id=\"dataType_restriction_mutilinetext\" style=\"display:none;\">");
		sb.append("<span class=\"box\">");
          sb.append("<label for=\"mutilinetext_overflow\">����ʾ������</label>:<input type=\"checkbox\" isdefaultVal=\"1\" id=\"mutilinetext_overflow\" style=\"width:20px;\" />");
		  sb.append("&nbsp;&nbsp;");
          sb.append("<label for=\"mutilinetext_height\">�߶�</label>��<input type=\"text\" isdefaultVal=\"100\" id=\"mutilinetext_height\" style=\"width:30px;\" />&nbsp;px");
        sb.append("</span>");
		sb.append("<br class=\"clear\" />");
        sb.append("<span class=\"box\">");
          sb.append("<label for=\"mutilinetext_maxlength\">��󳤶�</label>��<input type=\"text\" isdefaultVal=\"1000\" id=\"mutilinetext_maxlength\" style=\"width:30px;\" />");
		  sb.append("&nbsp;&nbsp;");
          sb.append("<label for=\"mutilinetext_minlength\">��С����</label>��<input type=\"text\" isdefaultVal=\"0\" id=\"mutilinetext_minlength\" style=\"width:30px;\" />");
        sb.append("</span>");
        sb.append("<br class=\"clear\" />");
      sb.append("</div>");
      
      sb.append("<!-- ����ֵ -->");
      sb.append("<div id=\"dataType_restriction_bool\" style=\"display:none;\">");
        sb.append("<span class=\"box\">");
          sb.append("<label for=\"bool_format\">��ʾ��ʽ</label>��");
          sb.append("<select id=\"bool_format\" style=\"width:100px;\">");
            //sb.append("<option value=\"1\">true-false</option>");
            //sb.append("<option value=\"2\">yes-no</option>");
            sb.append("<option value=\"3\">��-��</option>");
          sb.append("</select>");
        sb.append("</span>");
        sb.append("<br class=\"clear\" />");
      sb.append("</div>");
      
      sb.append("<!-- ���� -->");
      sb.append("<div id=\"dataType_restriction_number\" style=\"display:none;\">");
        sb.append("<span class=\"box\">");
          sb.append("<label for=\"number_defaultval\">Ĭ��ֵ</label>��");
          sb.append("<input type=\"text\" id=\"number_defaultval\" style=\"width:150px;\" />");
        sb.append("</span>");
        sb.append("<span class=\"box\">");
          sb.append("<label for=\"number_max\">���</label>��<input type=\"text\" isdefaultVal=\"999999\" id=\"number_max\" style=\"width:30px;\" />");
          sb.append("<label for=\"number_min\">��С</label>��<input type=\"text\" isdefaultVal=\"0\" id=\"number_min\" style=\"width:30px;\" />");
        sb.append("</span>");
        sb.append("<br class=\"clear\" />");
        sb.append("<span class=\"box\">");
          sb.append("<label for=\"number_decimal\">����С����λ��</label>��<input type=\"text\" isdefaultVal=\"2\" id=\"number_decimal\" style=\"width:30px;\" />");
          sb.append("<input type=\"checkbox\" id=\"number_thousand\" value=\"true\" /><label for=\"number_thousand\">ʹ��ǧ�ַ�</label>");
        sb.append("</span>");
        sb.append("<br class=\"clear\" />");
      sb.append("</div>");
      
      sb.append("<!-- ����ʱ�� -->");
      sb.append("<div id=\"dataType_restriction_datetime\" style=\"display:none;\">");
        sb.append("<span class=\"box\">");
          sb.append("<label for=\"datetime_format\">��ʾ��ʽ</label>��");
          sb.append("<select id=\"datetime_format\" style=\"width:100px;\">");
            sb.append("<option value=\"YYYYMMDD\">YYYYMMDD</option>");
            sb.append("<option value=\"YYYY-MM-DD\">YYYY-MM-DD</option>");
            sb.append("<option value=\"YYYY/MM/DD\">YYYY/MM/DD</option>");
          sb.append("</select>");
        sb.append("</span>");
        sb.append("<br class=\"clear\" />");
      sb.append("</div>");
	  
      sb.append("<!-- ��������-->");
      sb.append("<div id=\"dataType_restriction_file\" style=\"display:none;\">");
        sb.append("<span class=\"box\">");
          sb.append("<label for=\"file_format\">������С(K)</label>��");
          sb.append("<input id=\"file_format\" type=\"text\" isdefaultVal=\"10\" />");
        sb.append("</span>");
        sb.append("<br class=\"clear\" />");
      sb.append("</div>");
	  
      sb.append("<!-- ��ʽ -->");
      sb.append("<div id=\"dataType_restriction_formula\" style=\"display:none;\">");
        sb.append("<span class=\"box\">");
          sb.append("<label for=\"formula_expression\">���ʽ</label>��");
          sb.append("<textarea id=\"formula_expression\" rows=\"3\" cols=\"40\">");
			
		  sb.append("</textarea>");
          sb.append("<a href=\"formula_help.html\" target=\"_blank\">����</a>");
        sb.append("</span>");
        sb.append("<br class=\"clear\" /><br class=\"clear\" />");
        sb.append("<span class=\"box\">");
          sb.append("<label for=\"formula_decimal\">����С����λ��</label>��<input type=\"text\" id=\"formula_decimal\" style=\"width:30px;\" />");
          sb.append("<input type=\"checkbox\" id=\"formula_thousand\" value=\"true\" /><label for=\"formula_thousand\">ʹ��ǧ�ַ�</label>");
        sb.append("</span>");
        sb.append("<br class=\"clear\" />");
      sb.append("</div>");
      
      sb.append("<!-- ���� -->");
      sb.append("<div id=\"dataType_restriction_reference\" style=\"display:none;\">");
        
        sb.append("<span class=\"box\" id=\"treeTD\" >");
          sb.append("<label for=\"reference_input\">����������</label>��");

			//������Ϊ����չʾ
			sb.append("<input type=\"text\" id=\"reference_input\" value=\"\" style=\"text-align:left;width:200px;\" />");
		
        sb.append("</span>");
		sb.append("<span class=\"box\">");
//          sb.append("<label for=\"parent_checked\">�Ƿ����ѡ���ĩ���ڵ�</label>��<input type=\"checkbox\" id=\"parent_checked\" style=\"width:30px;\" />");
        sb.append("</span>");
        sb.append("<br class=\"clear\" />");

        sb.append("<br class=\"clear\" />");
        sb.append("<span class=\"box\">");
          sb.append("<label for=\"reference_format\">��ʾ��ʽ</label>��");
          sb.append("<select id=\"reference_format\" style=\"width:100px;\">");
            sb.append("<option value=\"#code-#name\">����-����</option>");
            sb.append("<option value=\"#code\">����</option>");
            sb.append("<option value=\"#name\">����</option>");
          sb.append("</select>");
        sb.append("</span>");
        sb.append("<br class=\"clear\"/>");
      sb.append("</div>");
	  
	  sb.append("<!--�ɼ��� ���� -->");
      sb.append("<div id=\"dataType_restriction_tableReference\" style=\"display:none;\">");
        
        sb.append("<span class=\"box\" id=\"treeTD\" >");
          sb.append("<label for=\"tableReference_input\">���òɼ���</label>��");

			//������Ϊ����չʾ
			sb.append("<input type=\"text\" id=\"tableReference_input\" value=\"\" style=\"text-align:left;width:200px;\" />");
		
        sb.append("</span>");
		//sb.append("<span class=\"box\">");
		//	sb.append("<label for=\"parent_checked\">�Ƿ����ѡ���ĩ���ڵ�</label>��<input type=\"checkbox\" id=\"parent_checked\" style=\"width:30px;\" />");
        //sb.append("</span>");
        sb.append("<br class=\"clear\" />");
		
        sb.append("<span class=\"box\">");
          sb.append("<label for=\"tableReference_format\">��ʾ��ʽ</label>��");
          sb.append("<select id=\"tableReference_format\" style=\"width:100px;\">");
            sb.append("<option value=\"#code-#name\">����-����</option>");
            sb.append("<option value=\"#code\">����</option>");
            sb.append("<option value=\"#name\">����</option>");
          sb.append("</select>");
        sb.append("</span>");
		
		sb.append("<br class=\"clear\" />");
		sb.append("<br class=\"clear\" />");
		sb.append("<fieldset>");
      		sb.append("<legend>Ҫ������</legend>");
			sb.append("<div id=\"factorSet_Div\">");
			
				sb.append("<span class=\"box\">");
			      sb.append("<label for=\"tableReference_factor_itemid\">������</label>");
			      sb.append("<input type=\"text\" class=\"reference_factor\" id=\"tableReference_factor_itemid\" style=\"width:200px;\"></input>");
			    sb.append("</span>");
				sb.append("<span class=\"box\">");
			      sb.append("<label for=\"tableReference_factor_code\">���룺</label>");
			      sb.append("<input type=\"text\" class=\"reference_factor\" id=\"tableReference_factor_code\" style=\"width:200px;\"></input>");
			    sb.append("</span>");
				sb.append("<br class=\"clear\" />");
				sb.append("<span class=\"box\">");
			      sb.append("<label for=\"tableReference_factor_name\">���ƣ�</label>");
			      sb.append("<input type=\"text\" class=\"reference_factor\" id=\"tableReference_factor_name\" style=\"width:200px;\"></input>");
			    sb.append("</span>");
				sb.append("<span class=\"box\">");
			      sb.append("<label for=\"tableReference_factor_isleaf\">�Ƿ�ĩ����</label>");
			      sb.append("<input type=\"text\" class=\"reference_factor\" id=\"tableReference_factor_isleaf\" style=\"width:200px;\"></input>");
			    sb.append("</span>");
				sb.append("<br class=\"clear\" />");
				sb.append("<span class=\"box\">");
			      sb.append("<label for=\"tableReference_factor_superitemid\">���ڵ�ID��</label>");
			      sb.append("<input type=\"text\" class=\"reference_factor\" id=\"tableReference_factor_superitemid\" style=\"width:200px;\"></input>");
			    sb.append("</span>");
			
			sb.append("</div>");
		sb.append("</fieldset>");

        sb.append("<br class=\"clear\"/>");
      sb.append("</div>");
      
    sb.append("</fieldset>");
  sb.append("</div>");
  sb.append("<br class=\"clear\" /><br class=\"clear\" /><br class=\"clear\" />");
  //����չʾdiv
  sb.append("<div id=\"tableReference_factor_treecontainer\" class=\"tempContainerClass\" style=\"display:none;overflow:auto;width:210px;height:200px;position:absolute;background-color:#FCFCFC;border:1px solid #ccc;\"></div>");

sb.append("</div>");


sb.append("<!-- ��չ����-->");
sb.append("<div id=\"extends_attr\" style=\"display:none;\">");
	sb.append("<div style=\"height:90%\">");
	sb.append("<table class=\"tableview\" width=\"90%\">");
		sb.append("<colgroup align=\"center\" width=\"15%\"></colgroup>");
		sb.append("<colgroup align=\"left\" width=\"85%\"></colgroup>");
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
		sb.append("<span><button onclick=\"extends_wind.close();\" >ȡ��</button></span>");
	sb.append("</div>");
	
	sb.append("</div>");

	document.getElementById("template_main").innerHTML = sb.toString();
	
	$("#Dlg_ColumnProperty").show();
	columnPro_wind = new Ext.lt.window({title : '����',fitmode : 'body',className : 'wind7',mark : true,autoshow : false,pop : true,w : 600,h : 500});
	columnPro_wind.draw(Dlg_ColumnProperty);
	
	columnPro_wind.close();
}
