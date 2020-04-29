var table = null;
var form_content_wind = null;
var formulaEditor = null;
var extends_wind = null;

var mainmenu = null;
var submenu = null;
var budgetUnifiedamtunit = null;
var template = null;
var wind = null;
var windSum = null;
var newControlWind = null;
var outterCondtionWind = null;
var totalRow = -1;
var conditionTable = null;
var ruleListTable = null;
var outterConditionTable = null;
var defTree = null;

var qtree = null;
var formulaEditor = null;
var modelList = null;
var outterForms = {};
var outterRule = {};
var formFields = {};//
var thisFormRule = null;// 当前正使用的formRule
var oprators = {};
var attachFuns = {};
var totalObj = {};
var inner_condtion_type_index = 2;
var condtion_type_custom = 4;
var baseInfoMap, modelIdTemp = 0;
var seq = 0;
var colFieldArr = [];
var model = null;
var formdataflag = false;
var baseInfoFormBillId = -1;

var product;//产品
var  producttype;
var formModelColCache = {};//存储采集表的列信息
var formModelCache = new HashMap();//存储采集表的信息
var currentColCache = {};//存储所选采集表列
var tdSplit="|",trSplit="&";
var conditionQtreeRecordSet = {};//存储数据项
var windSum = null,windOrder = null;
var tablecode = null;
var formShow = null;
var tableData = null;
var productData = null;
var clevelno = null;
var productTypeMark = false;

var formdefine_list = function(config, service) {
	mainmenu = config.mainmenu;
	submenu = config.submenu;
	product = config.product;
	productData = config.productList;
	tablecode = config.tablecode;
	tableData = config.dataList;
	clevelno = config.levelno;
	productTypeMark = config.productTypeMark;
	
	// 初始化主页面 
	initLayoutMain(config);
	
	
	 $("#producttype").bind("change",function(){
		 var params = {};
		 producttype = params["product"] = $(this).val();
		 
		 Ext.lt.RCP.server("datacommon_formdefine_service", "getTableData",params,function(data){
				if(data.error){
					alert(data.error);
				}
				else{
									
					var rs = table.getRecordSet();
					rs.clear();
					table.getRecordset().addData(data.formDefineList,-1);
					table.reflash();		
				}
				
			
		});		
		
	 });
	 
	 var _tempTable = "";
	 $("#form_content input[name=issysform]").bind("click",function(e){
		var tableCode = document.getElementById("tableCode");	 	
		
		if(this.value == "1"){
			//_tempTable = tableCode.value;			
			tableCode.disabled = false;
		}
		else{
			//tableCode.value = _tempTable;
			tableCode.disabled = true;
		}
	 });
	
	table = new Ext.lt.datatable35(config.dataList);
    
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
	table.draw(btn_table);
	if(tablecode){
	var leftdata = table.getRecordSet().query({TABLECODE:tablecode});
	leftdata[0]["check"] = 1; 
	}
   
	// 加载公式编辑框
	initLayoutRule();

	String.prototype.trim = function() {
		return this.replace(/[\xa0]/gi, "").replace(" ", "");
	}
	
	wind = new Ext.lt.window({title : '公式',fitmode : 'content',className : 'wind7',pop : true,autoshow : false,mark : true});
	wind.draw(control_rule_list);

	newControlWind = new Ext.lt.window({title : '新增公式',fitmode : 'content',className : 'wind7',pop : true,autoshow : false,mark : true});
	newControlWind.draw(newControlWindow);

	outterCondtionWind = new Ext.lt.window({title : '表间条件',fitmode : 'content',className : 'wind7',pop : true,autoshow : false,mark : true});
	outterCondtionWind.draw(outter_condtion_win);

	ruleListTable = new TableView($("#ruleList_table")[0]);
	ruleListTable.clickCell = function(td) {
		this.selectRow(td.parent());
	};

	// 列控制条件
	conditionTable = new TableView($("#condition_table")[0]);

	var unClickColumn = [ 0, 3, 4, 5, 6 ];
	var operatorCode = [ "6", "7", "8", "9" ];
	conditionTable.clickCell = function(td) {
		this.selectRow(td.parent());
		var topAdd = 0;
		var conditiontable = this;

		var $tds = $(td).parent().find("td");
		var index = $.inArray(td[0], $tds);

		var celleditor = null;
		if (index == 0) {
			celleditor = $("#lbracket_selector");
		} 
		else if (index == 1) {
			celleditor = $("#field_selector");
		}
		else if (index == 2) {
			celleditor = $("#operator_selector");
			
			var colNameTd = $tds[1];
			var columnObj = currentColCache[$(colNameTd).attr("code")];
			
			var lis = "";
			if(columnObj.datatype == "number"){
				lis = "<li code='1'>等于</li><li code='2'>大于</li><li code='3'>小于</li><li code='4'>大于等于</li><li code='5'>小于等于</li>";
			}
			// 存在引用
			else if (columnObj.datatype == "reference") {
				lis = "<li code='1'>等于</li><li code='2'>大于</li><li code='3'>小于</li><li code='4'>大于等于</li><li code='5'>小于等于</li><li code='6'>相似</li><li code='7'>包含</li><li code='8'>不包含</li><li code='9'>值集</li>";
			} 
			// 不存在引用
			else {
				lis = "<li code='1'>等于</li><li code='2'>大于</li><li code='3'>小于</li><li code='4'>大于等于</li><li code='5'>小于等于</li><li code='6'>相似</li><li code='7'>包含</li><li code='8'>不包含</li>";
			}
			$("#operator_selector ul").html(lis);
		} else if (index == 3) {
			// 列名
			var operatorTd = $tds[2];
			
			var colNameTd = $tds[1];
			var columnObj = currentColCache[colNameTd.code];
			
			if ((columnObj.datatype == "reference" && operatorTd.code == 9)) {
				celleditor = $("#tree_selector");
				topAdd = 20;
			} else {
				celleditor = $("#value_selector");
			}
		} else if (index == 4) {
			celleditor = $("#rbracket_selector");
		} else if (index == 5) {
			celleditor = $("#logical_selector");
		}
		//----初始化编辑框 end
		
		if (celleditor && celleditor.length>0) {
			if (celleditor.attr("type") == "tree") {
				celleditor.width(300);
				celleditor.height(300);
				
				conditionDrawTree(td);
				
				window.event.cancelBubble = true;
				onStopEditTree(celleditor, td);
			} else {
				celleditor.find("input").width(td.width());
				celleditor.find("input").height(td.height());
				celleditor.find("input").val(td.text());
			}

			celleditor.find("input").unbind("keydown").bind("keydown",function(e) {
				if (e.keyCode == 13) {
					td.text($(this).val());
					td.attr("code", $(this).val());
					celleditor.hide();
				}
			});
			celleditor.find("input").unbind("blur").bind("blur", function(e) {
				if (celleditor.attr("type") != "tree") {
					td.text($(this).val());
					td.attr("code", $(this).val());
				}

			});

			celleditor.width(td.width());

			var pos = td.position();
			celleditor.css("top", (pos.top + topAdd) + "px");
			celleditor.css("left", (pos.left + 1) + "px");
			celleditor.show();
			
			//编辑框的点击事件
			celleditor.find("li").unbind("click").bind("click",function(e) {
				td.text(this.innerText);
				td.attr("code", this.code);
				
				celleditor.hide();
				// 切换字段时检测是否为引用
				if (celleditor[0].id == "field_selector") {
					var columnObj = currentColCache[$tds[1].code];
					
					if ((columnObj == null || columnObj.datatype != "reference") && $($tds[2]).attr("code") == 9) {
						// 如果不为引用且当前选择为值集，则清空选项
						td.parent().find("td").each(function(n) {
							if (n == 2) {
								$(this).text("");
								$(this).removeAttr("code");
							}
						});
					}
				}
			});

			if (celleditor.find("input").length > 0) {
				celleditor.find("input").focus();
			}
		}// end if(celleditor)
	};

	conditionTable.toWhereString = function() {
		var _table = this;
		var sb = new StringBuffer();
		$(this.table).find("tbody tr").each(function(index) {
			var tds = $(this).find("td");
			for ( var i = 0; i < tds.length; i++) {
				var code = $(tds[i]).attr("code");
				if (code == undefined) {
					code = " ";
				}
				if (i == 2) {
					sb.append(_table._getOperatorValue(code));
				} else {
					sb.append(code);
				}

			}
		});
		return sb.toString(" ");
	};

	conditionTable._getOperatorValue = function(operator) {
		var operatorValue = null;
		if (operator == "1") {
			operatorValue = "=";
		} else if (operator == "2") {
			operatorValue = ">";
		} else if (operator == "3") {
			operatorValue = "<";
		} else if (operator == "4") {
			operatorValue = ">=";
		} else if (operator == "5") {
			operatorValue = "<=";
		} else if (operator == "6") {
			operatorValue = "like";
		} else if (operator == "7") {
			operatorValue = "in";
		} else if (operator == "8") {
			operatorValue = "not in";
		}
		return operatorValue;
	};

	conditionTable.toWhereCode = function() {
		var sb = new StringBuffer();
		var $trs = $(this.table).find("tbody tr");
		var trsLen = $trs.length;
		$trs.each(function(index) {
			var tds = $(this).find("td");
			var first = true;
			for ( var i = 0, j = tds.length; i < j; i++) {
				var code = $(tds[i]).attr("code");
				if (code == undefined || code == '') {
					code = " ";
				}
				if (first) {
					first = false;
				} else {
					sb.append(tdSplit);
				}
				sb.append(code);

			}
			if (index < (trsLen - 1)) {
				sb.append(trSplit);
			}
		});

		return sb.toString();
	}

	conditionTable.clear = function() {
		$(this.table).find("tbody").html("");
	};

	conditionTable.check = function() {
		return true;
	};
	conditionTable.setInnerCondition = function(conditionSeria) {
		if (!conditionSeria || conditionSeria == "")
			return;
		var conditionArr = conditionSeria.split(trSplit);
		for ( var i = 0, j = conditionArr.length; i < j; i++) {
			var condition = conditionArr[i];
			var elements = condition.split(tdSplit);
			var sb = new StringBuffer();
			sb.append("<tr>");
			for ( var m = 0, n = elements.length; m < n; m++) {
				sb.append("<td code=" + elements[m] + ">"+ this.getInnerDisplayByCode(elements[m], m) + "</td>");
			}
			sb.append("</tr>");
			$("#condition_table").find("tbody").append(sb.toString());
		}
	};

	conditionTable.getInnerDisplayByCode = function(code, i) {
		var display = "";
		if (i == 0) {
			display = $("#lbracket_selector li[code=" + code + "]").text();// 左括号
		} else if (i == 1) {
			display = $("#field_selector li[code=" + code + "]").text();// 列名
		}else if (i == 2) {
			display = $("#operator_selector li[code=" + code + "]").text();// 关系符
		} else if (i == 3) {
			display = code;// 条件
		} else if (i == 4) {
			display = $("#rbracket_selector li[code=" + code + "]").text();// 右括号
		} else if (i == 5) {
			display = $("#logical_selector li[code=" + code + "]").text();// 逻辑符
		}
		return display;
	};

	conditionTable.isEmpty = function() {
		return $(this.table).find("tbody tr").length == 0;
	};

	// 绑定点击其他地方自动关闭下拉菜单
	$("body").bind("mousedown",function(e) {
		var el = $(e.target);
		if (el.length>0 && el.parents(".cell_condition_editor").length == 0 && !el.hasClass("cell_condition_editor")) {
			$(".cell_condition_editor").hide();
		}
	});

	// 公式类型
	$("#rule_type_box :radio").click(function(e) {
		var $e = $(e.target);
		if ($e.val() == 0) {
			$("#formula_box").hide();
			$("#columnspanbox").hide();
			$("#columnControl").hide();
			$("#rule_editable_box").hide();
			// 隐藏框默认选中
			// $("#rule_hide").attr("checked",true);
		} else {
			$("#formula_box").show();
			$("#columnspanbox").show();
			$("#columnControl").show();
			$("#rule_editable_box").show();
			// $("#rule_hide").attr("checked",false);
		}
	});

	//切换公式雷习惯
	$("#columnControl input[name=formula_type]").click(function(e) {
		// 表内
		if (this.value == 0) {
			$("#formula_outterform").hide();
			// 表内公式屏蔽相似
			$("#operator_selector li[code=6]").hide();
			$("#formula_innerform").show();
		} 
		// 表间
		else {
			$("#formula_innerform").hide();
			$("#formula_outterform").show();
			$("#operator_selector li[code=6]").show();
		}
	});

	//初始化公式编辑框
	initFormulaEditor();

	// 选择采集表
	$("#outter_form").bind("click", function() {
		var pos = $("#outter_form").position();

		$("#selectFormModel").css("top", pos.top + "px");
		$("#selectFormModel").css("left", pos.left + "px");
		$("#selectFormModel").show();

		$("#selectFormModel li").unbind("click").bind("click", function() {
			$("#outter_form").val(this.innerText);
			$("#outter_form").attr("modelId", this.modelId);
			$("#outter_form").attr("code", this.code);
			$("#selectFormModel").hide();
			$("#outter_form_field").val("");
			// formulaEditor.clear();
			
			//获取表的列信息
			if(!formModelColCache[this.code]){
				getFormModelColCache(this.code);
			}
			
			var columnList = formModelColCache[this.code];
			var columnSB = new StringBuffer();
			for(var i=0,n=columnList.length; i<n; i++){
				var column = columnList[i];
				
				columnSB.append("<li code=\"").append(column.columncode).append("\">");
				columnSB.append(column.name).append("</li>");
			}
			
			$("#selectFormModelField ul").html(columnSB.toString());
		});
	});

	//字段点击
	$("#outter_form_field").bind("click",function() {

		var pos = $("#outter_form_field").position();
		$("#selectFormModelField").css("top", pos.top + "px");
		$("#selectFormModelField").css("left", pos.left + "px");
		$("#selectFormModelField").show();
		
		$("#selectFormModelField ul").unbind("click").bind("click",function(e) {
				var el = $(e.target);
				if (!el.is("li")) {
					return;
				}
				var column = el[0];
				
				var outterForm = document.getElementById("outter_form");
				var colInput = new StringBuffer();
				
				colInput.append("<input type=\"text\" tablecode =");
				colInput.append("\"").append(outterForm.code).append("\"");
				colInput.append(" code=\"").append(outterForm.code+"."+column.code).append("\" ");
				colInput.append(" field=\"").append(column.code).append("\" ");
				colInput.append(" value=\"").append(column.innerText).append("\" ");
				colInput.append(" seq=\"").append(getNextSeq()).append("\" >");
				
				var html = colInput.toString();
				
				formulaEditor.focus();
				var selection = formulaEditor.document.selection;
				if (selection) {
					if (selection.type.toLowerCase() != "none") {
						this.execCommand("Delete");
					}
					formulaEditor.document.selection.createRange().pasteHTML(html);
				} else {// for ff
					this.execCommand("insertHTML",false, html);
				}
				formulaEditor.focus();
				
				$("#selectFormModelField").hide();
				$("#outter_form_field").val(column.innerText);
			});
	});

	$("#table_outterform_condition tbody").unbind("click").bind("click",function(e) {
		var el = $(e.target);
		if (!el.is("button")) {
			return;
		}
		
		$("#outter_condtion_win tbody").html("");
		var modelId = el.attr("modelId");
		var tablecode = el.attr("tablecode");
		
		//获取表的列信息
		if(!formModelColCache[tablecode]){
			getFormModelColCache(tablecode);
		}
		var fieldList = formModelColCache[tablecode];
		
		var sb = new StringBuffer();
		for ( var i = 0, j = fieldList.length; i < j; i++) {
			var filed = fieldList[i];
			sb.append("<li ");
			if (tablecode){
				sb.append("tablecode=\"" + tablecode + "\" ");
			}
			sb.append("code=\"" + filed.columncode + "\" name='"+ filed.name + "' type=\""+ filed.datatype + "\">" + filed.name+ "</li>");
		}
		$("#outter_condition_fields ul").html(sb.toString());
		
		if (thisFormRule && thisFormRule.outtercondition) {
			var outterConditions = getFormRuleOutterCondition(thisFormRule, tablecode);
			loadOutterConditions(outterConditions,$("#outter_condtion_win tbody"));
		}
		outterCondtionWind.show();

	});

	outterConditionTable = new TableView($("#outter_condition_table")[0]);
	outterConditionTable.clickCell = function(td) {
		this.selectRow(td.parent());
		var $tds = $(td).parent().find("td");
		var index = $.inArray(td[0], $tds);
		if (index == 0)
			return;
		var celleditor = null;
		if (index == 1) {
			celleditor = $("#outter_condition_fields");
		} else if (index == 2) {
			celleditor = $("#outter_condition_operator_selector");
		} else if (index == 3) {
			celleditor = $("#outter_condition_value_selector");
		}

		celleditor.find("input").width(td.width());
		celleditor.find("input").height(td.height());
		celleditor.find("input").val(td.text());
		celleditor.width(td.width());
		var pos = td.position();
		celleditor.css("top", pos.top + "px");
		celleditor.css("left", (pos.left + 1) + "px");
		celleditor.show();
		celleditor.find("li").unbind("click").bind("click", function(e) {
			td.text($(this).text());
			td.attr("code", $(this).attr("code"));
			if (index == 1) {
				td.attr("tablecode", $(this).attr("tablecode"));
			}
			celleditor.hide();
		});
		celleditor.find("input").unbind("blur").bind("blur", function(e) {
			td.text(this.value);
			td.attr("code",this.value);
		});
		if (celleditor.find("input").length > 0) {
			celleditor.find("input").focus();
		}
	}

	outterConditionTable.getCheckedRadio = function() {
		var checkedRadio = $(this.table).find("td input:radio:checked");
		if (checkedRadio.length > 0) {
			return checkedRadio.parent().parent();
		}
	};
	
	outterConditionTable.clear = function(){
		$(this.table).find("tbody").html("");
	}
	
	/*
document.getElementById("isgather_sel").onchange = function() {
		var _tr = document.getElementById("isgather_tr");
		var _sql = document.getElementById("gathersql");
		if (this.value == "0") {

			_sql.value = "";
			_tr.style.display = "none";
		} 
		else {
			_sql.style.display = "";
			_tr.style.display = "";
		}

	};
*/
	
	document.getElementById('columnList').onchange = function(){
		if(this.value){
			insertText(document.getElementById('innerFormContent'),this.value);
			document.getElementById("columnList").value='';
		}
	}
	document.getElementById("casewhen_btn").onclick = function(){
		insertText(document.getElementById('innerFormContent'),"case when then else end ");
	}
	
	//表扩展属性保存
	$("#extends_confirm_btn").unbind("click").bind("click",function(){
		var data = table.getRecordSet().query({check:1});
		if(!data || data.length!=1){
			alert("请选择需要设置扩展属性的表!");
			return;
		}
		
		//设置选中
		var params = {};
		params["tableCode"] = data[0].TABLECODE;
		
		var checkJSON = [];
		$("#extends_attr input[type=checkbox]:checked").each(function(index){
			
			checkJSON.push({"tableCode":params.tableCode,"attrId":this.value});
		});
		
		params["jsonreq"] = JSON.stringify(checkJSON);
		
		showdiv();
		Ext.lt.RCP.server("datacommon_formdefine_service", "saveExtendAttr",params,function(data){
			if(data.error){
				alert(data.error);
			}
			else{
				extends_wind.close();
				
				alert("保存成功！");
			}
			closediv();
		});
	});

}
//-----------ready end

function getFormModelColCache(tablecode){
	
	showdiv();
	var resultData = Ext.lt.RCP.asynserver('datacommon_formdefine_service', 'getColumnByForm',{"tableCode":tablecode});
	if(resultData.error){
		closediv();
		alert(resultData.error);
		return;
	}
	formModelColCache[tablecode] = resultData.columnList;
	closediv();
}

// 添加
function doadd(){
	$("#formName").val("");
	$("#formType").val("");
	$("#formType").attr("itemid",0);
	$("#orderNum").val("0");
	$("#isIncrement").val("0");
	$("#isgather_sel").val("0");
	$("#gathersql").val("");
	$("#gathersql").hide();
	$("#amtUnit").val("10000");
	
	
	$("#form_Id").val("0");
	
	$("#formType").attr("disabled",false);
	$("#form_content table input[type=radio][name=issysform]").attr("disabled",false);
	$("#form_content table input[type=radio][name=issysform][value=0]").trigger("click");
	
	var params = {};
	params["tablecode"] = $("#tableCode").val();
	
	showdiv();
	Ext.lt.RCP.server("datacommon_formdefine_service", "insertForm",params,function(data){
		if(data.error){
			closediv();
			alert(data.error);
		}
		else{
			$("#tableCode").val(data.tablecode);

			form_content_wind.resetTitle("添加");
			form_content_wind.show();
			
			$("#producttype").show();
			
			$("#form_content select").show();
			$("#form_content02").show();
			$("#form_content02").hide();
			closediv();
		}
	});
}

// 修改
function doedit(){
	var data = table.getRecordSet().query({check:1});
	if(!data || data.length != 1){
		alert("请选择一条表定义信息数据!");
		return;
	}
	var LEVEL = data[0].LEVELNO;
	if(clevelno > LEVEL){
	    alert("用户权限不够，不能修改！");
	    return;
	}
	
	//一些不可编辑的单元格
	$("#formType").attr("disabled",true);
	$("#tableCode").attr("disabled",true);
	$("#form_content table input[type=radio][name=issysform]").attr("disabled",true);
	
	$("#form_Id").val(data[0].BILLID);
	
	var params = {};
	params["tableCode"] = data[0].TABLECODE;
	
	showdiv();
	Ext.lt.RCP.server("datacommon_formdefine_service", "updateForm",params,function(data){
		if(data.error){
			closediv();
			alert(data.error);
		}
		else{
			var form = data.formMap;
			var name = null;
			for(var i=0; i<formTypeList.length; i++){
			  if(formTypeList[i].itemid == form.FORMTYPE){
			     name = formTypeList[i].name;
			   }
			};
			
			$("#formName").val(form.NAME);
			$("#formType").val(name);
			$("#formType").attr("itemid",form.FORMTYPE);
			$("#orderNum").val(form.ORDERNUM);
			$("#isIncrement").val(form.ISINCREMENT);
			$("#isgather_sel").val(form.ISGATHER);
			$("#gathersql").val(form.GATHERSQL);
			$("#tableCode").val(form.TABLECODE);
			if(form.ISGATHER == 1){
				$("#gathersql").show();
			}
			else{
				$("#gathersql").hide();
			}
			$("#amtUnit").val(form.AMTUNIT);
			
			$("#form_content table input[type=radio][name=issysform][value="+form.ISSYSFORM+"]").attr("checked",true);
			
			closediv();
			
			form_content_wind.resetTitle("修改");
			form_content_wind.show();
			
			$("#producttype").show();
			$("#form_content02").show();
			$("#form_content02").hide();
			
			$("#form_content select").show();
		}
	});
}

//保存采集表
function saveForm(){
    if(isEmpty($("#orderNum").val())){
      alert("排序序号不能为空!");
	  return;
    };
	if($("#orderNum").val().length>4){
			alert("排序序号不能超过4位!");
			return;
		}	
	if(isNaN($("#orderNum").val())){
	      alert("排序序号必须为数字");
	      return;
	    }	
	if(!isNaN($("#orderNum").val())&&$("#orderNum").val()<0){
	       alert("排序序号必须大于0");
	       return;
	    }
	    
	if(isEmpty($("#formName").val())){
			alert("报表名称不能为空!");
			return;
		}
	if(isEmpty($("#formType").val()) || $("#formType").attr("itemid")==0){
			alert("报表类型不能为空!");
			return;
		}	
	if($("#formName").val().length>16){
			alert("报表名称不能超过16!");
			return;
	}
	
	if(!isTable($("#tableCode").val())){
		alert("物理表名格式不正确!");
		return;
	}
	
	var params = {};
	params["form.name"] = $("#formName").val();
	params["form.formtype"] = $("#formType").attr("itemid");
	params["form.ordernum"] = $("#orderNum").val();
	params["form.isincrement"] = $("#isIncrement").val();
	params["form.isgather"] = $("#isgather_sel").val();
	params["form.gathersql"] = $("#gathersql").val();
	params["form.amtunit"] = $("#amtUnit").val();
	params["form.tablecode"] = $("#tableCode").val().toUpperCase();
	params["form.billid"] = $("#form_Id").val();
	params["form.levelno"] = clevelno; 
	params["form.product"] = $("#producttype").val();
	params["form.issysform"] = $("input[name=issysform]:checked").val();
	
	showdiv();
	Ext.lt.RCP.server("datacommon_formdefine_service", "saveForm",params,function(data){
		if(data.error){
			closediv();
			alert(data.error);
		}
		else{
			form_content_wind.close();
			closediv();
			
			var rs = table.getRecordset();
			rs.clear();
			
			table.getRecordset().addData(data.modelDataList,-1);
			table.reflash();
			
			alert("保存成功!");
		}
	});
}

//查询
function chaxun(){
var params = {};
params["form.name"] = $("#formname").val();
params["form.formtype"] = $("#formtype").attr("itemid");
params["form.product"] = $("#producttype").val();

showdiv();
Ext.lt.RCP.server("datacommon_formdefine_service", "queryForm",params,function(data){
		if(data.error){
			closediv();
			alert(data.error);
		}
		else{
			var datas = table.getRecordSet();
			datas.clear();
			datas.addData(data.dataList.toArray(), datas.size()+1);
			closediv();
			
		}
	});

}

function deleteData(){
	var data = table.getRecordSet().query({check:1});
	if(!data || data.length !=1){
		alert("请选择一条表定义信息数据!");
		return;
	}
	else{
	     var LEVEL = data[0].LEVELNO;
	if(clevelno > LEVEL){
	    alert("用户权限不够，不能删除！");
	    return;
	}
	
		if(confirm("删除功能会删除采集表的一切信息，确定要删除么？")){
			var params = {};
			params["billid"] = data[0].BILLID;
			params["tablecode"] = data[0].TABLECODE;
			showdiv();
			Ext.lt.RCP.server("datacommon_formdefine_service", "deleteForm",params,function(data){
				if(data.error){
					alert(data.error);
				}
				else{
					table.remove({BILLID:params.billid});
					table.reflash();
					
					alert("删除成功!");
				}
				closediv();
			});
		}
	}
}

function columnSet(){
	var data = table.getRecordSet().query({check:1});
	if(!data || data.length!=1){
		alert("请选择一条表定义信息数据!");
		return;
	}
	else{
		var params = {};
		params["tablecode"] = data[0].TABLECODE;	
		params["product"] = $("#producttype").val();
		params["productTypeMark"] = productTypeMark;
		jumpTo("/datacommon/formcolumn/index.page?mainmenu="+mainmenu+"&submenu="+submenu+"","post",params);
	}
}

function formPreview(){
	var data = table.getRecordSet().query({check:1});
	if(!data || data.length==0){
		alert("请选择需要预览的表信息!");
		return;
	}
	else{
		window.open("list_preview.html");
	}
	
}

// 扩展属性
function extendAttr(){
	var data = table.getRecordSet().query({check:1});
	if(!data || data.length!=1){
		alert("请选择采集表的数据!");
		return;
	}
	
	$("#extends_attr").show();
	
	extends_wind = new Ext.lt.window({title:'扩展属性设置',fitmode:'body',className:'wind7',mark:true,autoshow:false,pop:true,w:562,h:350});
	
	extends_wind.draw(extends_attr);
	
	extends_wind.show();
	
	//设置选中
	var params = {};
	params["tableCode"] = data[0].TABLECODE;
	
	showdiv();
	Ext.lt.RCP.server("datacommon_formdefine_service", "loadExtendAttr",params,function(data){
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

// 设置规则
function openControlRule(){
	var tableData = table.getRecordSet().query({check:1});
	if(!tableData || tableData.length != 1){
		alert("请选择需要设置公式的采集表!");
		return;
	}
	
	$("#ruleList_table").find("tbody").html("");
	
	var params = {};
	params["tableCode"] = tableData[0].TABLECODE;
	
	showdiv();
	Ext.lt.RCP.server("datacommon_formdefine_service", "loadRule",params,function(data){
		if(data.error){
			alert(data.error);
		}
		else{
			var ruleList = data.ruleList;
			
			var sb = new StringBuffer();
			for(var i=0,n=ruleList.length; i<n; i++){
				var rule = ruleList[i];
				if(rule.defaultrule == 1) continue;
				
				sb.append("<tr>");
				sb.append("<td><input type=\"checkbox\" value=\""+rule.billid+"\"></td>");
				sb.append("<td>").append(rule.ordernum).append("</td>");
				sb.append("<td>").append(rule.name).append("</td>");
				if(rule.exptype == 1){
					sb.append("<td>表外公式</td>");
				}
				else{
					sb.append("<td>表内公式</td>");
				}
				sb.append("<td>").append(rule.columnname).append("</td>");
				sb.append("<td>").append(rule.userinner).append("</td>");
				sb.append("<td>").append(rule.outterexpression).append("</td>");
				sb.append("<td><span><a href=\"javascript:void(0);\" onclick=\"openNewRule('"+rule.billid+"')\">查看</a></span></td>");
				
				sb.append("</tr>");
			}
			
			$("#ruleList_table").find("tbody").html(sb.toString());
			
			wind.show();
		}
		closediv();
	});
}
var formTypeList;
function ups(_input,content,formcontent){
$(_input).val("");
$(_input).attr("itemid",0);
var $tempDiv = $("#"+content);
$tempDiv.width($(_input).width()+3);
var pos = $(_input).position();
	$tempDiv.css("top",pos.top+16+"px");
	$tempDiv.css("left",pos.left+"px");
   $("#"+content).show();
   var qtree=new Ext.lt.Qtree({
			data:formTypeList,
			outformart:'#name',
			expandlevel:'2',
			showRootNode:true,
			rootNode:{superitemid:'0',itemid:'0',name:'全部',isleaf:'0'}
		});
	  qtree.draw(document.getElementById(content));

	  qtree.on({nodeclick : function(tree,param){
	    	var selNode = param.data;
	    	if(!selNode || selNode.isleaf == 0){
	    		alert("请选择末级节点！");
	    		return;
	    	}else{
	    		$("#"+content).hide();	    		
	    		_input.innerText = selNode.name;
	    		_input.itemid = selNode.itemid;
	    	}
	    }});	
	    $("#"+formcontent).click(function (event) {
	    var el = $(event.target);
	   if (el.parents("#"+content).length == 0 && el.attr("id") != _input.id && el.attr("id") != content) {
				$("#"+content).hide();
			}
	    }); 	
}

// 初始化主页面
function initLayoutMain(config){
	var sb = new StringBuffer();
	
	var productBuffer = new StringBuffer();
	for(var j = 0;j<productData.length;j++){
		productBuffer.append("<option value = \""+productData[j].PRODUCTS+"\">"+productData[j].NAME+"</option>");	
	}
	
	sb.append("<div id=\"query_t\" style=\"height:25px;\">");
	sb.append("<span><span title=\"添加\" class=\"budget_add\" onclick=\"doadd()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0);\">添加</a></span></span>");	
	sb.append("<span><span title=\"修改\" class=\"budget_mod\" onclick=\"doedit()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0);\">修改</a></span></span>");
	sb.append("<span><span title=\"删除\" class=\"budget_del\" onclick=\"deleteData()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0);\">删除</a></span><span>｜</span></span>");
	
	sb.append("<span><span title=\"采集表列维护\" class=\"budget_setting\" onclick=\"columnSet()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0);\">采集表列维护</a></span></span>");
	sb.append("<span><span title=\"设置排序列\" class=\"budget_sumrow\" onclick=\"openOrderRow()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0);\">设置排序列</a></span></span>");
	//sb.append("<span><span title=\"公式设置\" class=\"budget_export\" onclick=\"openControlRule()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0);\">公式设置</a></span></span>");  
	sb.append("<span><span title=\"采集表预览\" class=\"budget_search\" onclick=\"showForm()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0);\">采集表预览</a></span></span>");	
	//sb.append("<span><span title=\"扩展属性\" class=\"budget_setting\" onclick=\"extendAttr()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0);\">扩展属性</a></span></span>");	
	//sb.append("<span><span title=\"设置合计行\" class=\"budget_sumrow\" onclick=\"openSumRow()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0);\">设置合计行</a></span></span>");	
	//sb.append("<span><span title=\"表信息导出\" class=\"budget_sumrow\" onclick=\"formInfoExport()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0);\">表信息导出</a></span></span>");	
	//sb.append("<span><span title=\"表信息导入\" class=\"budget_sumrow\" onclick=\"formInfoImport()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0);\">表信息导入</a></span></span>");
	sb.append("<span><span title=\"查询\" class=\"budget_mod\" onclick=\"chaxun()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0);\">查询</a></span></span>");		
	sb.append("</div>");
    sb.append("<form name=\"mainListForm\" id=\"mainListForm\" action=\"#\" method=\"post\">");
    sb.append("<tr align = \"center\">");
    sb.append("<div style=\"margin-left:10px;font-weight:700;\">");
	sb.append("<span>产品类型：");
	sb.append("<select id=\"producttype\" size = \"1\" style= \"width:160px;\">");
	sb.append(productBuffer.toString());
	sb.append("</select></span>");
	sb.append("<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;报表名称：<input type=\"text\" id=\"formname\" style=\"width:150px\"/></span>");
	sb.append("<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;报表类型：<input type=\"text\" id=\"formtype\" readonly onclick='ups(formtype,\"form_content03\",\"template_main\")' style=\"width:150px\"/></span>");
	sb.append("</div>");
	sb.append("</tr>");
	
	/*
sb.append("<form name=\"mainListForm\" id=\"mainListForm\" action=\"#\" method=\"post\">");
		sb.append("<div id=\"form_table_title\">");
			sb.append("<ul>");
				sb.append("<li class=\"top\"><div>采集表定义</div></li>");
			sb.append("</ul>");
		sb.append("</div>");
	sb.append("</form>");
*/
	sb.append("<div>");
	sb.append("<div id=\"btn_table\" layout=\"{w:{fit:true},h:{fit:-60}}\" ></div>");	
	sb.append("</div>");
	sb.append("</form>");
	//采集表新增时弹出div
	sb.append("<div id=\"form_content\" style=\"display:none;\" >");
		sb.append("<div style=\"width:460px;height:380px;\">");
		sb.append(' <input type="hidden" id="form_Id" value="0"/>');
			sb.append("<table class=\"tableview\" >");
				sb.append("<colgroup align=\"left\" width=\"50%\" ></colgroup>");
				sb.append("<colgroup align=\"left\" width=\"50%\"></colgroup>");
				sb.append("<thead>");
					sb.append("<tr>");
						sb.append("<th>名称</th>");
						sb.append("<th>内容</th>");
					sb.append("</tr>");
				sb.append("</thead>");
				sb.append("<tbody>");
					sb.append("<tr>");
						sb.append("<th>报表名称<font color=\"red\">*</font></th>");
						sb.append("<td><input type=\"text\" id=\"formName\" style=\"width:98%\" /></td>");
					sb.append("</tr>");
					sb.append("<tr>");
						sb.append("<th>报表类型<font color=\"red\">*</font></th>");
						sb.append("<td>");
						
					    formTypeList = config.formTypeList;
						sb.append("<input type=\"text\" style=\"width:98%\" id=\"formType\" readonly onclick='ups(formType,\"form_content02\",\"form_content\")'/>");
//						sb.append("<select id=\"formType\">");
//						for(var i=0,n=formTypeList.length;i<n;i++){
//							var formType = formTypeList[i];
//							sb.append("<option value=").append(formType.itemid).append(" >").append(formType.code+"-"+formType.name).append("</option>");
//						}
//						sb.append("</select></td>");
                        sb.append("</td>");
						
					sb.append("</tr>");
					sb.append("<tr>");
						sb.append("<th>排序序号</th>");
						sb.append("<td><input type=\"text\" style=\"width:98%\" id=\"orderNum\"></td>");
					sb.append("</tr>");
					sb.append("<tr>");
						sb.append("<th>物理表名</th>");
						sb.append("<td><input type=\"text\" style=\"width:98%\" disabled=\"disabled\" id=\"tableCode\" value=\"\"></td>");
					sb.append("</tr>");
					sb.append("<tr>");
						sb.append("<th>是否系统表</th>");
						sb.append("<td><input type=\"radio\" name=\"issysform\" id=\"issysform_1\" value=\"1\" ><label for=\"issysform_1\">是</label></input><input type=\"radio\" name=\"issysform\" id=\"issysform_0\" value=\"0\" checked=\"checked\"></input><label for=\"issysform_0\">否</label></td>");
					sb.append("</tr>");
					/*
sb.append("<tr>");
						sb.append("<th>是否增量表</th>");
						sb.append("<td><select style=\"width:99%\" id=\"isIncrement\"><option value=\"1\">是</option><option selected value=\"0\">否</option></select></td>");
					sb.append("</tr>");
					sb.append("<tr>");
						sb.append("<th>是否汇总表</th>");
						sb.append("<td><select style=\"width:99%\" id=\"isgather_sel\"><option value=\"1\">是</option><option value=\"0\" selected>否</option></select></td>");
					sb.append("</tr>");
					sb.append("<tr id=\"isgather_tr\" style=\"display:none;\">");
						sb.append("<th>汇总语句</th>");
						sb.append("<td><textarea id=\"gathersql\" rows=\"3\" cols=\"40\"></textarea></td>");
					sb.append("</tr>");
					sb.append("<tr>");
						sb.append("<th>计量单位</th>");
						sb.append("<td><select style=\"width:99%\" id=\"amtUnit\">");
						
						var amtunitList = config.amtunitList;
						for(var i=0,n=amtunitList.length;i<n;i++){
							var amtunit = amtunitList[i];
							sb.append("<option value=").append(amtunit.itemid).append(" >").append(amtunit.name).append("</option>");
						}
						sb.append("</select></td>");
						
					sb.append("</tr>");
*/
				sb.append("</tbody>");
			sb.append("</table>");
		sb.append("</div>");

		sb.append("<div style=\"margin-left:40%;\">");
			sb.append("<input type=\"button\" value=\"保 存\" onclick=\"saveForm()\"></input>");
			sb.append("<input type=\"button\" value=\"取 消\" onclick=\"form_content_wind.close();\"></input>");
		sb.append("</div>");
		
    sb.append("<div id='form_content02' style=\"display:none;height:170px;overflow:scroll;position:absolute;background-color:#FCFCFC;border:1px solid #ccc;\">");
    sb.append("</div>");
    
	sb.append("</div>");

	// <!-- 规则窗口 -->
	sb.append("<div id=\"rule_div\" style=\"display:none;\"></div>");
	
	sb.append("<!-- 扩展属性-->");
	sb.append("<div id=\"extends_attr\" style=\"display:none;\">");
		sb.append("<div style=\"height:90%\">");
		sb.append("<table class=\"tableview\" width=\"90%\">");
			sb.append("<colgroup align=\"center\" width=\"20%\"></colgroup>");
			sb.append("<colgroup align=\"left\" width=\"80%\"></colgroup>");
			sb.append("<thead>");
				sb.append("<tr>");
					sb.append("<td>选择</td><td>属性名称</td>");
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
			sb.append("<span><button id=\"extends_confirm_btn\">确定</button></span>");
			sb.append("<span><button onclick=\"extends_wind.close();\">取消</button></span>");
		sb.append("</div>");
		
	sb.append("</div>");
	
	sb.append('<div class="dialog_content" id="Dlg_SumRow" style="display:block;width:300px;height:200px;">');
	sb.append('		<div style="height:100px;">');
	sb.append('			<span class="box">');
	sb.append('			  <input type="radio" id="radio11" name="radio_totalrow" value="1" />');
	sb.append('			  <label for="radio11">第一行</label> ');
	sb.append('			</span>');
	sb.append('			<span class="box" style=\"display:none;\">');
	sb.append('			  <input type="radio" id="radio12" name="radio_totalrow" value="-1"/>');
	sb.append('			  <label for="radio12">最后一行</label> ');
	sb.append('			</span>');
	sb.append('			<span class="box">');
	sb.append('			  <input type="radio" id="radio13" name="radio_totalrow" value="0"/>');
	sb.append('			  <label for="radio13">无合计行</label> ');
	sb.append('			</span>');
	
	sb.append('</br>');
	
	sb.append('			<span class="box">');
	sb.append('			  <label for="cell_name">合计列:</label>');
	sb.append('			     <input id="sumColumnTree" name="text" disabled = "disabled" value=""/>');
	sb.append('				 <button type="button" id="btn_select_sum_column">选择</button>');
	sb.append('			</span>');
	
	sb.append('  		<div id="sum_column_selector" type="tree" class="cell_condition_editor" style="border:1px solid #ccc;">');
	sb.append('  		</div>');
	
	sb.append('		</div>');
	sb.append('		');
	sb.append('		<div id="SumRow_confirm_exit_btn" style="text-align:center">');
	sb.append('			<button type="button" class="button_style" onclick="saveSumRow()">保存</button>');
	sb.append('			<button type="button" class="button_style" onclick="windSum.close();">关闭</button>');
	sb.append('		</div>');
	sb.append('</div>');
	
	//排序列
	sb.append('<div class="dialog_content" id="Dlg_FormOrder" style="display:block;width:300px;height:200px;">');
	sb.append('		<div style="width:100%;height:40px;">');
	sb.append('			<span class="box">');
	sb.append('			  <label for="cell_name">列信息:</label>');
	sb.append('			  <input type="text" disabled="disabled" id="input_order"  />');
	sb.append('			  <button type="button" id="btn_select_order_column">选择</button>');
	sb.append('			</span>');
	
	sb.append('  		<div id="order_column_selector" type="tree" class="cell_condition_editor" style="border:1px solid #ccc;"></div>');
	sb.append('		</div>');
	
	sb.append('		<br /><br /><br />');
	
	sb.append('		');
	sb.append('		<div style="text-align:center">');
	sb.append('			<button type="button" class="button_style" onclick="saveOrderRow()">保存</button>');
	sb.append('			<button type="button" class="button_style" onclick="windOrder.close();">关闭</button>');
	sb.append('		</div>');
	sb.append('</div>');
	
	sb.append("<div id='form_content03' style=\"display:none;height:170px;overflow:scroll;position:absolute;background-color:#FCFCFC;border:1px solid #ccc;\">");
    sb.append("</div>");
	
	//----预览布局
	sb.append("<div class=\"dialog_content\" id=\"Dlg_showForm\" style=\"display:none;width:600px;height:300px;\">");
	//sb.append("			<div> <input type=\"button\" value=\"关闭\" onClick=\"formShow.hidden();\" /> </div>");
	sb.append("			<div id='div_showForm' style=\"width:100%;height:90%;\" ></div>");
	sb.append("</div>");
	
	document.getElementById("template_main").innerHTML = sb.toString();
	
	$("#form_content").show();
	form_content_wind = new Ext.lt.window({title:'采集表新增',fitmode:'content',className:'wind7',mark:true,autoshow:true,pop:true,w:562,h:472});
	form_content_wind.draw(form_content);
	
	form_content_wind.close();
	
	//总计框口
	windSum = new Ext.lt.window({title:'设置总计',fitmode:'content',className:'wind7',pop:true,autoshow:false,mark:true});
	windSum.draw(Dlg_SumRow);
	
	//采集表预览
	$("#Dlg_showForm").show();
	
	formShow = new Ext.lt.window({title : '采集表预览',fitmode : 'content',className : 'wind7',pop : true,autoshow : false,mark : false});
	formShow.draw(Dlg_showForm);
	
	formShow.close();
	
	$("#producttype").val(product);
	
	if(config.productTypeMark){
		
		$("#producttype").attr("disabled",true);
	}
	
	//设置排序列
	windOrder = new Ext.lt.window({title:'设置排序列',fitmode:'content',className:'wind7',pop:true,autoshow:false,mark:true});
	windOrder.draw(Dlg_FormOrder);
	 
}


// 初始化规则页面
function initLayoutRule(){
	var sb = new StringBuffer();

	sb.append('<!--列表界面-->');
	sb.append('<div id="control_rule_list" style="width:1200px;height:300px;display:block">');
	sb.append('	<div>');
	sb.append('		<DIV style="TEXT-ALIGN: left; FLOAT: left; HEIGHT: 25px; VERTICAL-ALIGN: baseline">');
	
		sb.append('			<A style="HEIGHT: 16px; MARGIN-RIGHT: 10px" title=增行>');
		sb.append('				<IMG style="CURSOR: pointer" onclick=\"openNewRule(0);\" src="../common/images/addrow.gif">');
		sb.append('			</A> ');
		sb.append('			<A style="HEIGHT: 16px" title=减行><IMG style="CURSOR: pointer" onclick=\"deleteRule();\" src="../common/images/jianrow.gif"></A>');
	
	sb.append('		</DIV>');
	sb.append('		<br class="clear" />');
	sb.append('		<table class="tableview" id="ruleList_table">');
	sb.append('			<colgroup colName="element" colType="str" width="50" style="text-align:center;"></colgroup>');
	sb.append('			<colgroup colName="element" colType="str" width="150" style="text-align:left;"></colgroup>');
	sb.append('			<colgroup colName="element" colType="str" width="150" style="text-align:left;"></colgroup>');
	sb.append(' 		<colgroup colName="element" colType="str" width="150" style="text-align:left;"></colgroup>');
	sb.append('			<colgroup colName="element" colType="str" width="150" style="text-align:left;"></colgroup>');
	sb.append('			<colgroup colName="element" colType="str" width="150" style="text-align:left;"></colgroup>');
	sb.append('			<colgroup colName="element" colType="str" width="150" style="text-align:left;"></colgroup>');
	sb.append('			<colgroup colName="element" colType="str" width="150" style="text-align:left;"></colgroup>');
	sb.append('			<thead>');
	sb.append('				<tr>');
	sb.append('					<th align=\"left\" ><input type=\"checkbox\" id=\"checkall\" onclick=\"checkAll()\"  ></th>');
	sb.append('					<th>显示顺序</th>');
	sb.append('					<th>名称</th>');
	sb.append(' 				<th>类型</th>');
	sb.append('					<th>列名称</th>');
	sb.append('					<th>表内公式</th>');
	sb.append('					<th>表间公式</th>');
	sb.append('					<th>查看</th>');
	sb.append('				</tr>');
	sb.append('			</thead>');
	sb.append('			<tbody>');
	
	
	sb.append('			</tbody>');
	sb.append('		</table>');
	sb.append('	</div>');
	sb.append('</div>');
	
	sb.append('<!--新增界面-->');
	sb.append('<div id="newControlWindow" style="width:900px;height:500px;display:block;overflow:hidden;">');
	sb.append(' <input type="hidden" id="form_rule_id" value="0"/>');
	sb.append("<div style='width:930px;'>");
	
		sb.append('  <button onclick=\"saveNewControl();\" class=\"budget_save\" title=\"保存\">保存</button>');
	
	sb.append('  <button onclick=\"backNewControl();\" class=\"budget_del\" title=\"返回\">返回</button>');
	sb.append("</div>");
// sb.append('<br class="clear" />');
	sb.append('	<div style="width:930px;">');
	sb.append('		<span class="boxRule">');
	sb.append('			<label for="order_name">公式名称</label>：');
	sb.append('			<input type="text" id="rule_name" style="width:100px;" />');
	sb.append('		</span>');
	sb.append('		<button class="oneGrounp"></button>');
	// sb.append(' <span class="boxRule" id="rule_type_box">');
	// sb.append(' <label for="order_name">类型</label>：');
	// sb.append(' <input type="radio" name="rule_type" value="0">全表</input>');
	// sb.append(' <input type="radio" name="rule_type" value="1"
	// checked="checked">列</input>');
	// sb.append(' </span>');
	
	sb.append('		<span class="boxRule">');
	sb.append('			<label for="order_name">显示顺序</label>：');
	sb.append('			<input type="text" id="order" name="order" value=""/>');
	sb.append('		</span>');
	
	sb.append('		<button class="oneGrounp"></button>');
	sb.append('		<span class="boxRule" id="columnspanbox">');
	sb.append('			<label for="order_name">列名称</label>：');
	sb.append('			<select id="column_selector">');
	sb.append('			</select>');
	sb.append('		</span>');
	
	sb.append('		');
	sb.append('		<br class="clear" />');
	sb.append('		<span class="boxRule">');
	sb.append('			<fieldset style="width:930px;">');
	sb.append('			<legend>列公式条件</legend>');
	sb.append('			<DIV style="TEXT-ALIGN: left; FLOAT: left; HEIGHT: 25px; VERTICAL-ALIGN: baseline">');
	sb.append('				<A style="HEIGHT: 16px; MARGIN-RIGHT: 10px" title=增行>');
	sb.append('					<IMG style="CURSOR: pointer" onclick=addConditionRow() src="../common/images/addrow.gif">');
	sb.append('				</A> ');
	sb.append('				<A style="HEIGHT: 16px" title=减行><IMG style="CURSOR: pointer" onclick=delConditionRow() src="../common/images/jianrow.gif"></A>');
	sb.append('			</DIV>');
	sb.append('			<br class="clear" />');
	sb.append('			<div style="height:100px;overflow-y:scroll;width:930px;">');
	sb.append('				<table class="tableview" id="condition_table" style="width:900px;">');
	sb.append('					<colgroup colName="element" colType="str" width="30"></colgroup>');
	sb.append('					<colgroup colName="type" colType="str" width="100"></colgroup>');
	// sb.append(' <colgroup colName="operator" colType="str"
	// width="100"></colgroup>');
	sb.append('					<colgroup colName="condition" colType="str" width="100"></colgroup>');
	sb.append('					<colgroup colName="condition" colType="str" width="300"></colgroup>');
	sb.append('					<colgroup colName="condition" colType="str" width="30"></colgroup>');
	sb.append('					<colgroup colName="condition" colType="str" width="100"></colgroup>');
	sb.append('					<thead>');
	sb.append('						<tr>');
	sb.append('							<th>（</th>');
	sb.append('							<th>列名</th>');
	// sb.append(' <th>类型</th>');
	sb.append('							<th>关系符</th>');
	sb.append('							<th>条件</th>');
	sb.append('							<th>）</th>');
	sb.append('							<th>逻辑符</th>');
	sb.append('						</tr>');
	sb.append('					</thead>');
	sb.append('					<tbody>');
	sb.append('						');
	sb.append('					</tbody>');
	sb.append('				</table>');
	sb.append('			</div>');
	sb.append('			</fieldset>');
	sb.append('		</span>');
	sb.append('		');
	sb.append('		<br class="clear" />');
	sb.append('		');
	sb.append('		<span class="boxRule" id="columnControl">');
	sb.append('			<label for="order_name">公式类型</label>：');
	sb.append('			<input type="radio" id="formula_type_inner" name="formula_type" value="0" checked="checked">表内公式</input>');
	
	sb.append('			<input type="radio" id="formula_type_outer" name="formula_type" value="1">表间公式</input>');
	sb.append('		</span>');
	sb.append('		');
	sb.append('		<br class="clear" />');
	sb.append('		');
	
	sb.append('		<div id="formula_box" style="height:350px;overflow-y:scroll;width:930px;">');// div
																						// 595
	
	
	sb.append('			<!-- 表内公式 -->');
	sb.append('		    <div id="formula_innerform">');
	
	sb.append('    <fieldset style="width:900px;">');
	sb.append('      <legend>表内公式</legend>');
	sb.append('        </br>');
	sb.append('             <input type="button" id="casewhen_btn" style="height:20px;" value="CASE语法"/>')
	sb.append('				选择列：<select id="columnList" style="width:100px;"><option value=\"\"></option></select>&nbsp;例子：A+B');
	sb.append('        </br>');
	sb.append('              <textarea id="innerFormContent" style="width:300px;height:100px;"></textarea>');
	sb.append('    </fieldset>');
	
	sb.append('		    </div>');
	
	sb.append('			');
	sb.append('			<!--表间公式-->');
	sb.append('			');
	
	sb.append('			<div id="formula_outterform" style="display:none;">');// div
																				// 639
	sb.append('				<DIV id="editorContainer">');
	sb.append('					<IFRAME style="WIDTH: 680px; HEIGHT: 80px" id="formulaEditor" marginHeight=0 frameBorder=1 name="formulaEditor" marginWidth=0>');
	sb.append('					</IFRAME>');
	sb.append('				</DIV>');
	
	sb.append('			<TABLE id=baseFactorsTable width="80%">');
	sb.append('				<TBODY>');
	sb.append('				<TR>');
	sb.append('				<TD>采集表:<input id="outter_form" name="outter_form" value="" style="width:200px;" code="" modelId="" /></TD>');
	sb.append('				<TD>字段:<input id="outter_form_field" name="outter_form_field" value="" style="width:200px;"/></TD>');
	sb.append('				<div id="selectFormModel" class="cell_condition_editor" style="display:none;">');
	sb.append('					<ul>');
    
	sb.append('					</ul>');
	sb.append('				</div>');
	
	sb.append('				<div id="selectFormModelField" class="cell_condition_editor" style="display:none;">');
	sb.append('					<ul>');
	sb.append('					</ul>');
	sb.append('				</div>');
	
	sb.append('				</TR>');
	sb.append('				</TBODY>');
	sb.append('			</TABLE>');
	
	sb.append('			<div style="width:500px;height:200px;display:block;">');// div
																				// 668
	sb.append('				<DIV style="TEXT-ALIGN: left; FLOAT: left; HEIGHT: 25px; VERTICAL-ALIGN: baseline">');
	sb.append('					<A style="HEIGHT: 16px; MARGIN-RIGHT: 10px" title=增行>');
	sb.append('						<IMG style="CURSOR: pointer" onclick=addOutterRule() src="../common/images/addrow.gif">');
	sb.append('					</A> ');
	sb.append('					<A style="HEIGHT: 16px" title=减行><IMG style="CURSOR: pointer" onclick=\"delOutterFormula();\" src="../common/images/jianrow.gif"></A>');
	sb.append('				</DIV>');
	sb.append('				');
	sb.append('				<br class="clear" />');
	sb.append('				<table class="tableview" id="table_outterform_condition" style="width:600px;">');
	sb.append('					<colgroup colName="element" colType="str" width="50" align="center"></colgroup>');
	sb.append('					<colgroup colName="element" colType="str" width="100" align="center"></colgroup>');
	sb.append('					<thead>');
	sb.append('						<tr>');
	sb.append('							<th>表名</th>');
	sb.append('							<th>设置</th>');
	sb.append('						</tr>');
	sb.append('					</thead>');
	sb.append('					<tbody>');
	sb.append('					');
	sb.append('					</tbody>');
	sb.append('				</table>');
	sb.append('			</div>');// end div 668
	sb.append('		  </div>');// end div 639
	sb.append('		    ');
	sb.append('		</div>');// end div 595
	sb.append('		');
	
	sb.append('		');
	sb.append('		<br class="clear" />');
	sb.append('		');
	sb.append('  <div id="lbracket_selector" class="cell_condition_editor">');
	sb.append('    <ul>');
	sb.append('      <li code=" "></li>');
	sb.append('      <li code="("> （</li>');
	sb.append('    </ul>');
	sb.append('  </div>');
	sb.append('  ');
	sb.append('  <div id="field_selector" class="cell_condition_editor" style="overflow:auto;_height:expression_r(function(el){el.style.height=el.scrollHeight > 300 ? "300px" : "auto";}(this));">');
	sb.append('  	<ul>');
	sb.append('');
	sb.append('    </ul>');
	sb.append('  </div>');
	sb.append('  ');
	sb.append('  <div id="operator_selector" class="cell_condition_editor">');
	sb.append('    <ul>');
	sb.append('      <li code="1">等于</li>');
	sb.append('      <li code="2">大于</li>');
	sb.append('      <li code="3">小于</li>');
	sb.append('      <li code="4">大于等于</li>');
	sb.append('      <li code="5">小于等于</li>');
	sb.append('      <li code="6">相似</li>');
	sb.append('      <li code="7">包含</li>');
	sb.append('      <li code="8">不包含</li>');
	sb.append('      <li code="9">值集</li>');
	sb.append('    </ul>');
	sb.append('  </div>');
	
	sb.append('  ');
	sb.append('  <div id="value_selector" class="cell_condition_editor">');
	sb.append('    <input type="text" value="" />');
	sb.append('  </div>');
	sb.append('  ');
	
	sb.append('  <div id="tree_selector" type="tree" class="cell_condition_editor">');
	sb.append('  </div>');
	sb.append('  ');
	
	
	sb.append('  <div id="rbracket_selector" class="cell_condition_editor">');
	sb.append('    <ul>');
	sb.append('      <li code=" "></li>');
	sb.append('      <li code=")">  ）</li>');
	sb.append('    </ul>');
	sb.append('  </div>');
	sb.append('  ');
	sb.append('  <div id="logical_selector" class="cell_condition_editor">');
	sb.append('    <ul>');
	sb.append('      <li code=" "></li>');
	sb.append('      <li code="and">并且</li>');
	sb.append('      <li code="or">或者</li>');
	sb.append('    </ul>');
	sb.append('  </div>');
	
	sb.append('  <div id="formname_selector" class="cell_condition_editor">');
	sb.append('    <ul>');
	sb.append('    </ul>');
	sb.append('  </div>');
	
	sb.append('	</div>');
	sb.append('</div>');
	
	sb.append('	<!--表间condition-->');
	sb.append('<div id="outter_condtion_win" style="width:600px;height:300px;display:block;overflow-x:hidden;overflow-y:scroll;">');// div
																								// 793
	sb.append('	<div>');// div 794
	sb.append('		<DIV style="TEXT-ALIGN: left; FLOAT: left; HEIGHT: 25px; VERTICAL-ALIGN: baseline;overflow-x:hidden;">');
	sb.append("			<button onclick=\"saveOutterCondition();\" class=\"save\" title=\"保存\" value=\"保存\"></button>");
	sb.append('			<A style="HEIGHT: 16px; MARGIN-RIGHT: 10px" title=增行>');
	sb.append('				<IMG style="CURSOR: pointer" onclick="addOutterCondtion();" src="../common/images/addrow.gif">');
	sb.append('			</A> ');
	sb.append('			<A style="HEIGHT: 16px" title=减行><IMG style="CURSOR: pointer" onclick="delOutterCondtion();" src="../common/images/jianrow.gif"></A>');
	sb.append('		</DIV>');
	sb.append('		<br class="clear" />');
	sb.append('		<table class="tableview" id="outter_condition_table">');
	sb.append('			<colgroup colName="element" colType="radio" width="50" align="center"></colgroup>');
	sb.append('			<colgroup colName="element" colType="str" width="150"></colgroup>');
	sb.append('			<colgroup colName="element" colType="str" width="150"></colgroup>');
	sb.append('			<colgroup colName="element" colType="str" width="150"></colgroup>');
	sb.append('					<thead>');
	sb.append('						<tr>');
	sb.append('							<th>选择</th>');
	sb.append('							<th>列</th>');
	sb.append('							<th>操作符</th>');
	sb.append('							<th>值</th>');
	sb.append('						</tr>');
	sb.append('					</thead>');
	sb.append('					<tbody>');
	sb.append(' ');
	sb.append('					</tbody>');
	sb.append('		 </table>');
	
	sb.append('      <div id="outter_condition_fields" class="cell_condition_editor">');
    sb.append('      	<ul>');
    sb.append('      	</ul>');
  	sb.append('      </div>');
  	sb.append('		<div id="outter_condition_operator_selector" class="cell_condition_editor">');// div
																									// 822
	sb.append('    		<ul>');
	sb.append('      		<li code="1">等于</li>');
	sb.append('      		<li code="2">大于</li>');
	sb.append('      		<li code="3">小于</li>');
	sb.append('      		<li code="4">大于等于</li>');
	sb.append('      		<li code="5">小于等于</li>');
	sb.append('      		<li code="6">相似</li>');
	sb.append('      		<li code="7">包含</li>');
	sb.append('      		<li code="8">不包含</li>');
	sb.append('    		</ul>');
	sb.append('		</div>');// end div 822
	sb.append('		<div id="outter_condition_value_selector" class="cell_condition_editor">');
	sb.append('    		<input type="text" value="" />');
	sb.append('		</div>');
	
	sb.append('	<div>');// end div 794
	sb.append('<div>');// end div 793
	
	
	/*
	sb.append('<!--分组弹出框-->');
	sb.append('		<div id="outter_group_container" style="width:400px;height:300px;display:block">');// div
																										// 853
	sb.append('			<div style="width:400px;height:200px;display:block">');
	sb.append('				<table class="tableview" id="outter_grouping_table">');
	sb.append('					<colgroup colName="element" colType="str" width="150"></colgroup>');
	sb.append('					<colgroup colName="element" colType="str" width="150"></colgroup>');
	sb.append('					<thead>');
	sb.append('						<tr>');
	sb.append('							<th>列</th>');
	sb.append('							<th>字段</th>');
	sb.append('						</tr>');
	sb.append('					</thead>');
	sb.append('					<tbody>');
	
	sb.append('					</tbody>');
	sb.append('				</table>');
	sb.append('			</div>');
	sb.append('			<div id="outter_grouping_field" class="cell_condition_editor">');
	sb.append('    			<ul>');
	sb.append('    			</ul>');
	sb.append('     	</div>');
	sb.append('			<div>');
	sb.append('				<button type="button" class="button_style" onclick="doSaveGrouping();">确定</button>');
	sb.append('				<button type="button" class="button_style" onclick="javascript:outterGroupingWind.close();">取消</button>');
	sb.append('			</div>');
	sb.append('     </div>');
	*/
	document.getElementById("rule_div").innerHTML = sb.toString();

}
function bodyBindClick(div,selector,sumTree){
	attachFuns.clickFunc = function(event){
	 	var el = $(event.srcElement);
		if(el.attr("id") == "Dlg_SumRow"){ 
			
			doCheckSumColumn(div,selector,sumTree);
		}
		else if (el.attr("id") == "Dlg_FormOrder") {
		
			doCheckOrderColumn(div,selector,sumTree);
		}
	};
	document.body.attachEvent("onclick",attachFuns.clickFunc);
};

function doCheckOrderColumn(div,selector,orderTree){
	var e  = window.event;
	if(!div.contains(e.srcElement) && selector.find(".qtree:first").length > 0){
		colFieldArr = [];
		//var checkedSet = orderTree.getSelected();
		//for(var i = 0,j = checkedSet.length; i < j ; i++){
		//	var field = checkedSet[i]["itemid"];
		//	 var name = checkedSet[i]["name"];
		//	colFieldArr.push(name);
		//}
		//$("#sumColumnTree").val(colFieldArr.join(","));
        //document.body.detachEvent("onclick",attachFuns.clickFunc);
	}
};

function doCheckSumColumn(div,selector,sumTree){
	var e  = window.event;
	if(!div.contains(e.srcElement) && selector.find(".qtree:first").length > 0){
		colFieldArr = [];
		var checkedSet = sumTree.getSelected();
		for(var i = 0,j = checkedSet.length; i < j ; i++){
		//	var field = checkedSet[i]["itemid"];
			 var name = checkedSet[i]["name"];
			colFieldArr.push(name);
		}
		$("#sumColumnTree").val(colFieldArr.join(","));
        document.body.detachEvent("onclick",attachFuns.clickFunc);
	}
};
function isNumber(paramStr) {
	return !isNaN(paramStr);
};

function findFirstTds($tr){
	var $tds = $tr.find("td.header");
	if($tds.length > 0){
		var $nextTR = $tr.next("tr");// 找下一行
		if ($nextTR.length > 0) {// 有下一行
			return arguments.callee($nextTR);// 递归查找
			
		}else{
			return null;
		}
	}else{
		return $tr.find("td");
	}
};

//全选checkbox
function checkAll() {
	$("#ruleList_table input[type=checkbox]").attr("checked",$("#checkall").attr("checked"));
};

//重置公式窗口
function resetRuleWin(){
	
	$("#rule_name").val("");
	$("#order").val("");
	
	$("#column_selector").val("");
	$("#column_selector").attr("disabled",false);
	
	conditionTable.clear();
	$("#columnControl input[name=formula_type][value=0]").attr("checked",true);
	$("#columnControl input[name=formula_type][value=0]").click();
	
	$("#innerFormContent").val("");
	formulaEditor.clear();
	$("#outter_form").val("");
	$("#outter_form_field").val("");
	
	$("#table_outterform_condition").find("tbody").html("");
	outterConditionTable.clear();
}

//新增公式
function openNewRule(ruleId){
	var tableData = table.getRecordSet().query({check:1});
	if(!tableData || tableData.length != 1){
		alert("请选择需要设置公式的采集表!");
		return;
	}
	
	newControlWind.resetTitle("新增公式");
	resetRuleWin();
	
	var params = {};
	params["product"] = product;
	params["tableCode"] = tableData[0].TABLECODE;
	params["ruleId"] = ruleId;
	
	wind.close();
	thisFormRule = {};
	
	$("#form_rule_id").val(ruleId);
	
	showdiv();
	Ext.lt.RCP.server("datacommon_formdefine_service", "newRule",params,function(data){
		if(data.error){
			alert(data.error);
		}
		else{
			var formList = data.formList;
			var columnList = data.columnList;
			
			var sb = new StringBuffer();
			var columnListSB = new StringBuffer();
			var selector = new StringBuffer();
			
			columnListSB.append("<option value=\"\" ></option>");
			
			for(var i=0,n=columnList.length; i<n; i++){
				var column = columnList[i];
				
				currentColCache[column.columncode] = column;
				
				sb.append("<li code=\"").append(column.columncode).append("\" ");
				sb.append(">");
				sb.append(column.name).append("</li>");
				
				selector.append("<option value=\"").append(column.columncode).append("\">");
				selector.append(column.name).append("</option>");
								
				columnListSB.append("<option value=\"").append(column.columncode).append("\">");
				columnListSB.append(column.name).append("</option>");
			}
			
			$("#field_selector ul").html(sb.toString());// 加载列公式条件列
			$("#column_selector").html(selector.toString());//加载列名称
			$("#columnList").html(columnListSB.toString());// 选择列下拉框（表内公式）
			
			var formSB = new StringBuffer();
			for(var i=0,n=formList.length; i<n; i++){
				var form = formList[i];
				
				formModelCache.put(form.TABLECODE,form);
				
				//过滤掉自己
				if(form.TABLECODE == params.tableCode) continue;
				
				formSB.append("<li modelId=\"").append(form.BILLID).append("\" ");
				formSB.append(" code=\"").append(form.TABLECODE).append("\" >");
				formSB.append(form.NAME).append("</li>");
			}
			
			$("#selectFormModel ul").html(formSB.toString());
			
			newControlWind.show();
			
			$("#column_selector").show();
			$("#formulaEditor").show();
			$("#columnList").show();
			
			$("#formula_type_inner").click();
			
			//如果是修改则赋值
			var ruleMap = data.ruleMap;
			if(!ruleMap || ruleMap.length==0 || ruleId=="0"){
				closediv();
				return;
			}
			
			newControlWind.resetTitle("修改公式");
			
			$("#rule_name").val(ruleMap.NAME);
			$("#order").val(ruleMap.ORDERNUM);
			$("#column_selector").val(ruleMap.COLUMNCODE);
			$("#column_selector").attr("disabled",true);
			
			conditionTable.setInnerCondition(ruleMap.INNERCONDITION);
			
			$("#columnControl input[name=formula_type][value="+ruleMap.EXPTYPE+"]").attr("checked",true);
			$("#columnControl input[name=formula_type]:checked").click();
			
			//表间
			if(ruleMap.EXPTYPE == 1){
				formulaEditor.setExpression(ruleMap.USEROUTTER);
				
				initOutterRule(ruleMap.OUTTERCONDITION);
				
				thisFormRule.outtercondition = ruleMap.OUTTERCONDITION;
			}
			//表内
			else{
				$("#innerFormContent").val(ruleMap.USERINNER);
			}
			
		}
		closediv();
	});
};

function insertText(obj,str) {
	   // obj为textarea 元素，str为要插入字符
		obj.focus();
	    if (document.selection) {
	        var sel = document.selection.createRange();
	        sel.text = str;
	    } 
	    else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
	        var startPos = obj.selectionStart;
	        var endPos = obj.selectionEnd;
	        var cursorPos = startPos;
	        var tmpStr = obj.value;
	        obj.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length);
	        cursorPos += str.length;
	        obj.selectionStart = obj.selectionEnd = cursorPos;
	    } 
	    else {
	        obj.value += str;
	    }
	}

// 选中删除公式信息
function deleteRule(){	
	var $tr = ruleListTable.findCheckedRow();
	
	if(!$tr || $tr.length==0){
		alert("请选择需要删除的公式！");
		return;
	}
	
	var ruleIds = new StringBuffer();
	$tr.each(function(){
		var checkId = $(this).find("input[type=checkbox]").val();
		ruleIds.append(checkId);
	});
	
	var params = {};
	params["ruleIds"] = ruleIds.toString(",");
	
	showdiv();
	Ext.lt.RCP.server("datacommon_formdefine_service", "deleteRule",params,function(data){
		if(data.error){
			alert(data.error);
		}
		else{
			ruleListTable.removeRow($tr);
			
			alert("删除公式成功!");
			
			thisFormRule = {};
		}
		closediv();
	});
};

function addConditionRow(){
    var sb = new StringBuffer();
	sb.append("<tr>");
	sb.append("<td></td>");
	sb.append("<td></td>");
	sb.append("<td></td>");
	sb.append("<td></td>");
	sb.append("<td></td>");
	sb.append("<td></td>");
	sb.append("</tr>");
	$("#condition_table").find("tbody").append(sb.toString());
};

function delConditionRow(){
	var tr = $(conditionTable.table).find("tbody tr.sel");
    conditionTable.removeRow(tr);
    
    var trs = $("#condition_table tbody").find("tr");
    if(trs.length == 0){
    	$("#formula_innerform").show();
    }
};

function addOutterRule(){
	$("#table_outterform_condition").find("tbody").html("");
	var sb = new StringBuffer();
	var usedForms = formulaEditor.getForms();
	for(var a in usedForms){
		if(usedForms[a] == null){
			continue;
		}
		sb.append("<tr>");
		sb.append("<td>"+usedForms[a].NAME+"</td>");
		sb.append("<td>"+"<button type='button' tablecode = \""+a+"\" modelId=\""+usedForms[a].BILLID+"\">...</button>"+"</td>");
		sb.append("</tr>");
	}
	
	$("#table_outterform_condition").find("tbody").html(sb.toString());
};

function initOutterRule(outterConditionStr){
	if(!outterConditionStr || outterConditionStr.length==0)return;

	var outterConditions = outterConditionStr.split(trSplit);
	var ocLength = outterConditions.length;
	var condtionTableCodes = [];// 获取条件中共有的表
	for(var i = 0,j = ocLength; i < j; i++){
		var aoutterCondition = outterConditions[i];
		try{
			var tableCode = aoutterCondition.split(tdSplit)[0].split(".")[0];
			condtionTableCodes.push(tableCode);
		}catch(e){
			continue;
		}
	}
	$("#table_outterform_condition").find("tbody").html("");
	var sb = new StringBuffer();
	var usedForms = formulaEditor.getForms();
	for(var a in usedForms){
		if(usedForms[a] == null || condtionTableCodes.inArray(a) == -1){
			continue;
		}
		
		sb.append("<tr>");
		sb.append("<td>"+usedForms[a].NAME+"</td>");
		sb.append("<td>"+"<button type='button' tablecode = \""+a+"\"modelId=\""+usedForms[a].BILLID+"\">...</button>"+"</td>");
		sb.append("</tr>");
	}
	
	$("#table_outterform_condition").find("tbody").html(sb.toString());
};

function delOutterFormula(){
	$("#table_outterform_condition").find("tbody>tr:last").remove();
};


function delInnerFormula(){
	$("#table_innerform").find("tbody>tr:last").remove();
};

//保存公式信息
function saveNewControl(){
	var formRule= {};

	var ruleName = $("#rule_name").val();
	if(ruleName == undefined || ruleName == ""){
		alert("请填写'控制名称'!");
		return;
	}
	
	var tableData = table.getRecordSet().query({check:1});
	formRule.tablecode = tableData[0].TABLECODE;
	
	formRule.name = ruleName;
	
	if(!$("#column_selector").val()){
		alert("请选择列名称！");
		return;
	}
	formRule.columncode = $("#column_selector").val();
	
	var order = $("#order").val();
	if(order == "" || !isInteger(order)){
		alert("加载顺序只能是数字，请检查！");
		return;
	}
	
	formRule.ordernum = order;
	
	var expType = formRule.exptype = $("#columnControl input[name=formula_type]:checked").val();
	
	// 表间公式
	if(expType == 1){
		formRule.outterexpression = formulaEditor.getExpression();
		if(!formRule.outterexpression || formRule.outterexpression.trim() == ""){
			alert('表间公式不能为空!');
			return;
		}
		formRule.useroutter = formulaEditor.getUserExpression();
		formRule.outtercolumn = formulaEditor.getExpressionColumns();
		
		if(thisFormRule && thisFormRule.outtercondition){
			formRule.outtercondition = thisFormRule.outtercondition;
		}
	}
	// 表内
	else{
		var innerFormContent = $("#innerFormContent").val();// 表内公式
		
		formRule.userinner = innerFormContent;
		formRule.innerexpression = innerFormContent;
		
	}
	//列控制条件
	var columnControlCondition = conditionTable.toWhereCode();
	
	formRule.innercondition = columnControlCondition;
	
	//转换传到后台
	var params = {};
	for(var rule in formRule){
		params["formRule."+rule] = formRule[rule];
	}
	
	params["ruleId"] = $("#form_rule_id").val();
	
	showdiv();
	Ext.lt.RCP.server("datacommon_formdefine_service", "saveRule",params,function(data){
		if(data.error){
			closediv();
			alert(data.error);
		}
		else{
			closediv();
			
			thisFormRule = {};
			
			alert("规则保存成功！");
			$("#form_rule_id").val("0");
			backNewControl();
		}
	});
};

// 返回...
function backNewControl(){
	newControlWind.close();
	openControlRule();
}
	
	// 预览
function dopreview(){
	previewWind.show();
	var sheet2 = new Sheet($("#preview")[0]);
	sheet2.loadFromJson(sheet1.toJson());
	
// if (($.browser.msie) && ($.browser.version == "6.0")){
// previewWind.close();
// previewWind.show();
// }
};

function parseExpression(expressionStr,before,after){
	var sb = new StringBuffer();
	var symbol = ["(",")","+","-","*","/","ifelse","IFELSE","{","}"];
	var token = new StringTokenizer(expressionStr,"()+-*/{}",true);
	while(token.hasMoreElements()){
		var ele = token.nextElement();
		if(symbol.inArray(ele) == -1){
			sb.append(before);
			sb.append("'");
			sb.append(ele);
			sb.append("'");
			sb.append(after);
		}else{
			sb.append(ele);
		}
	}
	return sb.toString();
};

Array.prototype.inArray = function(ele){
	for(var i = 0,j=this.length; i < j; i++){
		if(this[i] == ele){
			return i;
		}
	}
	return -1;
};

//公式编辑框
function initFormulaEditor(){
  formulaEditor = document.getElementById("formulaEditor").contentWindow; 
  formulaEditor.document.designMode = 'On';
  formulaEditor.document.contentEditable = true;
  formulaEditor.document.open();
  formulaEditor.document.writeln("<html><head><link href=\"/datacommon/common/style/formulastyle.css\" rel=\"stylesheet\" type=\"text/css\"/></head><body></body></html>");
  formulaEditor.document.onclick = "alert()";
  formulaEditor.document.close();
  formulaEditor.document.charset="GBK";
  formulaEditor.document.onkeyup = function(){};
  document.getElementById("formulaEditor").attachEvent("onblur",function(){
		addOutterRule();
  });
  
  // ie bug
  if(document.attachEvent){
      var selRange;
      var ieSelectionBookmark ;
      formulaEditor.document.onbeforedeactivate = function() {
        selRange = this.selection.createRange();
      };
      formulaEditor.document.onactivate = function () {
        if(selRange){
          selRange.select();
          selRange = null;
        } 
      }
  }
  
  formulaEditor.getForms = function(){
	    var content = $("<div style=\"display:none;\">"+this.document.body.innerHTML+"</div>");
	    outterForms = {};
	    content.find("input[tablecode]").each(function(){
			outterForms[this.tablecode] = formModelCache.get(this.tablecode);
	    });
	    content = null;
	    return outterForms;
  };
	
	formulaEditor.getExpression = function(){
	    var content = $("<div style=\"display:none;\">"+this.document.body.innerHTML+"</div>");
	    content.find("input[tablecode]").each(function(){
	    	var tablecode = $(this).attr("tablecode");
	    	var field = $(this).attr("field");
	    	var seq = $(this).attr("seq");
			$(this).replaceWith(tablecode+field+seq);
	    });
	    var expression = content.text();
	    content = null;
	    return expression;
	};
	
	formulaEditor.getUserExpression = function(){
		return this.document.body.innerHTML;
	}
	
	formulaEditor.setExpression = function(expression){
		this.document.body.innerHTML = expression;
   };
   
   formulaEditor.getExpressionColumns = function(){
	    var content = $("<div style=\"display:none;\">"+this.document.body.innerHTML+"</div>");
	    var sb = new StringBuffer();
	    var hasColumn = false;
	    content.find("input[tablecode]").each(function(){
	    	var code = $(this).attr("code");
	    	var seq = $(this).attr("seq");
			sb.append(code+"-"+seq);
			hasColumn = true;
	    });
	    content = null;
	    if(hasColumn){
	    	return sb.toString(trSplit);
	    }else{
	    	return "";
	    }
	};
	
	formulaEditor.clear = function(){
    	this.document.body.innerHTML = "";
  	};
  
};// end initFormulaEditor()

function addOutterCondtion(){
	var sb = new StringBuffer();
	sb.append("<tr>");
	sb.append("<td><input type='radio' name='outterConditionRadio'/></td>");
	sb.append("<td></td>");
	sb.append("<td></td>");
	sb.append("<td></td>");
	sb.append("</tr>");
	$("#outter_condition_table tbody").append(sb.toString());	
}

//TODO 保存表外条件是否需要动态更新呢
function saveOutterCondition(){
	thisFormRule = thisFormRule || {};

	var trfirst = true;
	var tablecode = null;
	var sb = new StringBuffer();
	$("#outter_condition_table tbody").find("tr").each(function(index){
		if(trfirst){
			trfirst = false;
		}else{
			sb.append(trSplit);
		}
		var $tds = $(this).find("td");
		for(var i=1,j=$tds.length;i < j;i++){
			if(i == 1){
				tablecode = $($tds[i]).attr("tablecode");
			}
	    	var code = $($tds[i]).attr("code");
	    	if(code==undefined){
	      		code = " ";
	    	}
	    	if(i == 1){
	    		sb.append(tablecode+"."+code);
	    	}else if(i == 2){
	    		sb.append(tdSplit);
	    		sb.append(code);
	    	}else if(i == 3){
	    		sb.append(tdSplit);
	    		sb.append($($tds[i]).text());
	    	}
	    }
	});
	addFormRuleOutterCondition(thisFormRule,sb.toString());
	outterCondtionWind.close();
};

//增加表外条件
function addFormRuleOutterCondition(formRule,str){
	var outterCondition = formRule.outtercondition;
	
	if(!outterCondition){
		formRule.outtercondition = str;
	}
	else{
		var strArr = str.split(trSplit);
		var tableCodeArr = [];
		for(var i = 0,j = strArr.length; i < j; i++){
			var tableCode = strArr[i].split(tdSplit)[0].split(".")[0];
			tableCodeArr.push(tableCode);
		}
		var sb = new StringBuffer();
		var conditonArr = outterCondition.split(trSplit);
		var first = true;
		for(var i = 0,j = conditonArr.length; i < j; i++){
			var tableCode = conditonArr[i].split(tdSplit)[0].split(".")[0];
			if(tableCodeArr.inArray(tableCode) == -1){// 没有修改的加上
				if(first){
					first = false;
				}else{
					sb.append(trSplit);
				}
				sb.append(conditonArr[i]);
			}
		}
		if(first){
			sb.append(str);
		}else{
			sb.append(trSplit);
			sb.append(str);
		}
		formRule.outtercondition = sb.toString();
	}
};

function getSheetColumns(){
	var columns = {};
	var colgroups = $(sheet1.table).find("colgroup.col");
	for(var i = 0,j = colgroups.length; i < j; i++){
		var cg = colgroups[i];
		var colName = $(cg).attr("name");
		var field = $(cg).attr("field");
		if(field) {
			columns[field] = colName;
		}
	}
	return columns;
};

function loadOutterConditions(expression,$tbody){
	if(!expression)return;
	
	var row = expression.split(trSplit);
	var sb = new StringBuffer();
	for(var i = 0,j = row.length; i < j; i++){
		sb.append("<tr>");
		sb.append("<td><input type='radio' name='outterConditionRadio'/></td>");
		var tds = row[i].split(tdSplit);
		for(var m = 0,n = tds.length; m < n; m++){
			if(m == 0){
				var tcode = tds[m].split(".");
				var tablecode = tcode[0];
				var code = tcode[1];
				sb.append("<td");
				var fieldList = formModelColCache[tablecode];
				var fieldDTO = getFieldDTO(fieldList,code);
				sb.append(" tablecode='"+tablecode+"'");
				sb.append(" code='"+code+"' name = '"+fieldDTO.name+"' ");
				sb.append(">");
				sb.append(fieldDTO.name);
				sb.append("</td>");
			}else if(m == 1){
				var code = tds[m];
				sb.append("<td code='"+code+"' >");
				sb.append(getOperatorBycode(code));
				sb.append("</td>");
			}else{
				sb.append("<td>");
				sb.append(tds[m]);
				sb.append("</td>");
			}
		}
		sb.append("</tr>");
	}
	$tbody.append(sb.toString());
};

function getFieldDTO(fieldList,code){
	for(var i = 0,j = fieldList.length; i < j; i++){
		var fieldDTO = fieldList[i];
		if(fieldDTO.columncode == code){
			return fieldDTO;
		}
	}
	return null;
}

function initOprators(){
	oprators["1"] = "等于";
	oprators["2"] = "大于";
	oprators["3"] = "小于";
	oprators["4"] = "大于等于";
	oprators["5"] = "小于等于";
	oprators["6"] = "相似";
	oprators["7"] = "包含";
	oprators["8"] = "不包含";
	return oprators;
}
function getOperatorBycode(code){
	var ops = initOprators();
	
	return ops[code];
};

function loadOutterGrouping(grouping){
	if(!grouping || grouping == "")return null;
	// <TD modelId="1983" code="BILLID" tablecode="T_BUDGET_DYNFORM_902">主键</TD>
	// getFieldDTO(fieldList,code)
	// thisFormRule
	var elements = grouping.split("&");
	var sb = new StringBuffer();
	for(var i = 0,j = elements.length; i < j; i++){
		var tdotf = elements[i];
		var arr = tdotf.split(".");
		var tablecode = arr[0];
		var field = arr[1];
		var formDTO =  getFormDTOByCode(tablecode);
		sb.append("<tr>");
		sb.append("<td>");sb.append(formDTO.name);sb.append("</td>");
		// modelDTO.billid+'" code="'+modelDTO.tablecode+'">'+modelDTO.name
		sb.append("<td");sb.append(" modelId = \""+formDTO.billid+"\"");
		sb.append(" tablecode=\""+formDTO.tablecode+"\"");
		var fieldList = null;
		var fieldDTO = null;
		if("benbiao" == tablecode){
			fieldDTO = getBenBiaoFieldDTO(field);
		}else{
			fieldList = formFields[tablecode];
			fieldDTO = getFieldDTO(fieldList,field);
		}
		
		sb.append(" code=\""+fieldDTO.code+"\" ");
		sb.append(">");
		sb.append(fieldDTO.name);
		sb.append("</td>");
		sb.append("</tr>");
	}
	return sb.toString();
}

function getBenBiaoFieldDTO(fieldCode){
	var colgroups = $(sheet1.table).find("colgroup.col");
	for(var i = 0,j = colgroups.length; i < j; i++){
		var cg = colgroups[i];
		var colName = $(cg).attr("name");
		var field = $(cg).attr("field");
		if(field == fieldCode) {
			return {"code":field,"name":colName};
		}
	}
};

function getColumnRecordSet(){
	var colgroups = $(sheet1.table).find("colgroup.col");
	var columndata = {columns:['itemid','superitemid','code','name'],datas:[]};
	
	// {columns:['code','name'],datas:[['101','一般预算'],['102','国防'],['103','科技']]}
	for(var i = 0,j = colgroups.length; i < j ; i++){
		var cg = colgroups[i];
		var dataType = $(cg).attr("dataType");
		if(dataType == undefined || (dataType.name != "number" && dataType.name != "formula")){
			continue;
		}
		var colName = $(cg).attr("name");
		var field = $(cg).attr("field");
		columndata.datas.push([field,-1,colName,field]);
	}
	return new Ext.lt.recordset(columndata);
	
};

function getSumRowFormula(sumField){
	var fieldFormula = {};
	var sumFormula = new StringBuffer();
	var colgroups = $(sheet1.table).find("colgroup.col");
	var first = true;
	for(var i = 0,j = colgroups.length; i < j ; i++){
		var cg = colgroups[i];
		var dataType = $(cg).attr("dataType");
		if(dataType == undefined || (dataType.name != "number" && dataType.name != "formula")){
			continue;
		}
		var colName = $(cg).attr("name");
		var field = $(cg).attr("field");
		if(sumField.inArray(colName) == -1){
			fieldFormula[colName] = "${COLSUM("+colName+")}";// {"formula":"${COLSUM("+field+")}","name":colName};
			if(first){
				first = false;
			}else{
				sumFormula.append("+");
			}
			sumFormula.append("${COLUMN("+colName+")}");
		}
	}
	
	var formula = sumFormula.toString();
	for(var i = 0,j = sumField.length; i < j; i++){
		var colName = sumField[i];
		fieldFormula[colName] = formula;
	}
	return fieldFormula;
};

function onStopEditTree(celleditor,td){
	attachFuns.innerTreeClick = function(){
		var div = document.getElementById('tree_selector');
		if(!div.contains(window.event.srcElement) && celleditor.find(".qtree:first").length > 0){
			var checkedSet  = qtree.getSelected();
			var sb = new StringBuffer();
			for(var i = 0,j = checkedSet.length,m = j-1; i < j ; i++){
				sb.append(checkedSet[i]["itemid"]);
				if(i != m){
					sb.append(",");
				}
			}
			var str = sb.toString("");
			td.text(str);
	        td.attr("code",str);
	        document.body.detachEvent("onclick",attachFuns.innerTreeClick);
    	}
	};
	document.body.attachEvent("onclick",attachFuns.innerTreeClick);
};

//增加树,如果当前应该用列为引用类型
function conditionDrawTree(td){
		var code  = td[0].code;
		if(code == undefined || code == null){
			code = "";
		}
		var values = code.split(",");
		var colNameTd = $(td).parent().find("td")[1];// 列名
		
		var column = currentColCache[colNameTd.code];
		
		if(column && column.datatype == "reference"){
			var defid = column.sourceelement;
			if(!defid){
				alert("列"+colNameTd.code+"的引用项获取错误！");
				return;
			}
			
			if(conditionQtreeRecordSet[defid]){
				drawCondtitionQtree(defid,values);
			}
			else{
				var params = {};
				params["defid"] = defid;
				
				showdiv();
				var resultData = Ext.lt.RCP.asynserver('datacommon_formdefine_service', 'getRefTree',params);
				if(resultData.error){
					closediv();
					alert(resultData.error);
					return;
				}
				closediv();
				
				conditionQtreeRecordSet[defid] = resultData.refList;
				drawCondtitionQtree(defid,values);
			}
		}
};

function drawCondtitionQtree(defid,values){
	qtree=new Ext.lt.Qtree({
		data:conditionQtreeRecordSet[defid],
		linkchild:true,
		showRootNode:true,
		outformart:'#code-#name',
		selectmode:'n',
		values:values
	});
	//qtree.expandlevel(1);
	qtree.draw(tree_selector);
};


function getFormRuleOutterCondition(formRule,tableCode){
	var outterCondition = formRule.outtercondition;
	var sb = new StringBuffer();
	if(outterCondition){
		var conditonArr = outterCondition.split(trSplit);
		var first = true;
		for(var i = 0, j = conditonArr.length; i < j; i++){
			var tabCode = conditonArr[i].split(tdSplit)[0].split(".")[0];
			if(tabCode == tableCode){
				if(first){
					first = false;
				}else{
					sb.append(trSplit);
				}
				sb.append(conditonArr[i]);
			}
		}
	}
	return sb.toString();
};


function getNextSeq(){
	return seq++;
};

function delOutterCondtion(){
	var tr = outterConditionTable.getCheckedRadio();
	if(tr && tr.length>0){
		outterConditionTable.removeRow(tr);
	}
};

//   设置合计行
var typeColumnData;
function openSumRow(){
	var data = table.getRecordSet().query({check:1});
	if(!data || data.length!=1){
		alert("请选择需要设置合计的表!");
		return;
	}
		
	var params = {};
	params["tableCode"] = data[0].TABLECODE;
		
	showdiv();
	Ext.lt.RCP.server("datacommon_formdefine_service", "querySumRow",params,function(data){
		if(data.error){
			alert(data.error);
			closediv();
		}
		else{
			var totalRow = data.totalRow;
			$("#Dlg_SumRow input[type=radio][name=radio_totalrow][value="+totalRow+"]").attr("checked",true);
			
			typeColumnData = data.typeColumn;
			$("#sumColumnTree").val("");
			if($("#radio13").attr("checked")){
            $(".box label[for='cell_name']").hide();
            $("#sumColumnTree").hide();
            $("#btn_select_sum_column").hide();
//            $("#SumRow_confirm_exit_btn").hide();
			}
			else{
			$(".box label[for='cell_name']").show();
            $("#sumColumnTree").show();
            $("#btn_select_sum_column").show();
//            $("#SumRow_confirm_exit_btn").show();
			}
			windSum.show();
			
			sumTree=new Ext.lt.Qtree({
			data:typeColumnData,
			linkchild:true,
			showRootNode:false,
			outformart:'#code-#name',
			selectmode:'n',
			values:colFieldArr
		    });
		sumTree.expandlevel(1);
		sumTree.draw(sum_column_selector);
		  
		}
		closediv();
	});
	
	//按钮绑定事件
	$("#radio11").bind("click",function(){
	        $(".box label[for='cell_name']").show();
            $("#sumColumnTree").show();
            $("#btn_select_sum_column").show();
//            $("#SumRow_confirm_exit_btn").show();
	});
	
	$("#radio13").bind("click",function(){
	        $(".box label[for='cell_name']").hide();
            $("#sumColumnTree").hide();
            $("#btn_select_sum_column").hide();
 //           $("#SumRow_confirm_exit_btn").hide();
	});
	
	$("#btn_select_sum_column").unbind("click").bind("click",function(e){
	
			var selector = $("#sum_column_selector");
	//		var treeRecordSet = getColumnRecordSet(sheet1);		
			selector.width(150);
			selector.height(150);
			var pos = $("#sumColumnTree").position();
			selector.css("top",pos.top+"px");
		    selector.css("left",(pos.left+1)+"px");
		    selector.show();
	    	var div = document.getElementById('sum_column_selector');
	    	bodyBindClick(div,selector,sumTree);
	});

};

//设置排序列
function openOrderRow(){
	var data = table.getRecordSet().query({check:1});
	if(!data || data.length!=1){
		alert("请选择需要设置排序列的表!");
		return;
	}
		
	var params = {};
	params["tableCode"] = data[0].TABLECODE;
		
	showdiv();
	Ext.lt.RCP.server("datacommon_formdefine_service", "queryOrderCol",params,function(data){
		if(data.error){
			alert(data.error);
			closediv();
		}
		else{
			var checkedHead = data.checkedHead;
			var colFieldId = [],colFieldName = [];
			
			for(var i=0,n=checkedHead.length; i<n; i++){
				
				colFieldId.push(checkedHead[i].itemid);
				colFieldName.push(checkedHead[i].name);
			}
			
			var _input = document.getElementById("input_order");
			_input.ids = colFieldId.join(",");
			_input.value = colFieldName.join(",");
			
			typeColumnData = data.typeColumn;
			windOrder.show();
			
			orderTree = new Ext.lt.Qtree({
				data:typeColumnData,
				linkchild:true,
				showRootNode:false,
				outformart:'#code-#name',
				selectmode:'n',
				values:colFieldId
		    });

			orderTree.draw(order_column_selector);
			
			orderTree.on({"click" : function(tree,param){
		    	var selNode = param.data;
		    	if(selNode.isleaf == 0){

		    	}
				else{
					var _input = document.getElementById("input_order");
					var ids = _input.ids ? _input.ids.split(",") : [];
					var values = _input.value ? _input.value.split(",") : [];
					
					if(selNode._checked == "checked"){
						
						ids.push(selNode.itemid);
						values.push(selNode.name);
					}
					else{
						var index = $.inArray(selNode.itemid, ids);
						if(index != -1){
							
							ids.splice(parseInt(index,10),1);
						}
						
						var index2 = $.inArray(selNode.name, values);
						if(index2 != -1){
							
							values.splice(parseInt(index2,10),1);
						}
					}
					
					_input.ids = ids.join(",");
					_input.value = values.join(","); 
		    	}
		    }});
		  
		}
		closediv();
	});
	
	$("#btn_select_order_column").unbind("click").bind("click",function(e){
	
			var selector = $("#order_column_selector");
			selector.width(150);
			selector.height(150);
			
			var pos = $("#input_order").position();
			selector.css("top",(pos.top+20)+"px");
		    selector.css("left",(pos.left+1)+"px");
		    selector.show();
	});
}

//保存排序列
function saveOrderRow(){
	var _input = document.getElementById("input_order");
	var ids = _input.ids || [];
	
	var data = table.getRecordSet().query({check:1});
	
	var params = {};
	params["ids"] = ids;
	params["tablecode"] = data[0].TABLECODE;

	showdiv();
	Ext.lt.RCP.server("datacommon_formdefine_service", "saveOrderRow",params,function(data){
		if(data.error){
			alert(data.error);
			closediv();
		}
		else{
			closediv();
			windOrder.close();
			
			alert("保存成功");
		}
	});	
}

function saveSumRow(){
	var checkedSet  = sumTree.getSelected();
	var data = table.getRecordSet().query({check:1});
	var params = {};
	var columncode=null;
	for(var i=0; i<checkedSet.length;i++){
	if(i==0){
	columncode = "'"+checkedSet[i]["code"]+"'";
	}
	else{
    columncode = columncode +"," + "'"+checkedSet[i]["code"]+"'";  
    }
	}
	var Dlg_SumRow = $("#Dlg_SumRow input[type=radio][name=radio_totalrow][checked=true]").val();
	params['columncode'] = columncode;
	params['tablecode'] = "'"+data[0].TABLECODE+"'";
	params['totalRow'] = Dlg_SumRow;
	if(!columncode && Dlg_SumRow == 1){
	  alert("请选择要合计的行");
	  return;
	}
	
	Ext.lt.RCP.server("datacommon_formdefine_service", "upForm",params,function(data){
		if(data.error){
			alert(data.error);
			closediv();
		}
		else{
			alert("设置合计行成功");
			windSum.close();
		}
		closediv();
	});
};

function formInfoExport(){
	
	Ext.lt.RCPConsole.processdownNotEncode('datacommon_formdefine_service', 'formInfoExport', {});
}

function formInfoImport(){
	var params = [];
	
	fileUpload = new FileUploadProject(params,"*.zip",function(data){
		
		//先不处理返回值
		
	},"/datacommon/formdefine/index");
	
}

//采集表预览
function showForm(){
	var data = table.getRecordSet().query({check:1});
	if(!data || data.length!=1){
		alert("请选择需要预览的表!");
		return;
	}
    $("#div_showForm").empty();
	showdiv();
	var resultData = Ext.lt.RCP.asynserver('datacommon_formdefine_service', "showForm",{"tableCode":data[0].TABLECODE});
	if(resultData.error){
		closediv();
		alert(resultData.error);
		return;
	}
	else {
		closediv();
	}
	
	if(!init_table_dc){
		alert("请先加载extendInitTable.js文件");
		return;
	}
	else{
		formShow.show();
		
		init_table_dc(resultData,"div_showForm",function(columns){
			for(var i=0,n=columns.length; i<n; i++){
				columns[i].edit = false;
			}
		}, false);
	}
	
	
}
