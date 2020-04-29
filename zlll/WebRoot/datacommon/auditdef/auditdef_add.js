var qtree = null;
var datatable = null;
var modelId, bdgAgency;
var selNodeFlag = false;
var tablecode = "";
var product;
var wind = null;// 弹出窗口
var agencyAddName = null;
var tableData;
var mainmenu = null;
var submenu = null;
var auditDef = {};
var elementDataMap = {}, tableheight = 0;
var auditTypeList;
var type;
var ismodify;
var clevelno = null;
var billid = null;
var productType = null;
var form_content1_wind = null;
var form_auditset_wind = null;
var auditSetTable = null;
var auditSetTree = null;
var customAuditCache = {};

var addauditdef_list = function(config, service){

    agencyAddName = config.nameAgency;
    mainmenu = config.mainmenu;
    submenu = config.menuId;
    tablecode = config.tablecode;
    bdgAgency = config.bdgAgency;
    product = config.product;
    tableData = config.tableList;
    auditTypeList = config.auditTypeList;
    auditDef = config.auditList[0];
    type = config.type;
    billid = config.billid;
    clevelno = config.levelno;
    productType = config.productType;
    
    //agencyAddName=config.bdgAgency;
    if (type == "1" && clevelno != auditDef.levelno) {
        ismodify = true;
    }
    else {
        ismodify = false;
    }
    // 初始化布局
    initLayout(config);
    
    if (type == "1") {
        if (auditDef.customsql != undefined && auditDef.customsql != "") {
            $("#audit")[0].checked = true;
            document.getElementById("filed2").value = brToN(auditDef.customsql);
            $("#audittype").val(auditDef.audittypeStr);
            document.getElementById('content1').disabled = true;
            document.getElementById('content2').disabled = true;
            
            
            
        }
        else {
            $("#operator").val(auditDef.operator);
            $("#lform").val(auditDef.lformName);
            $("#rform").val(auditDef.rformName);
            $("#lfield").val(auditDef.lfieldStr);
            $("#rfield").val(auditDef.rfieldStr);
            $("#lwhere").val(auditDef.lwhereStr);
            $("#rwhere").val(auditDef.rwhereStr);
            $("#grouping").val(auditDef.groupingStr);
            $("#audittype").val(auditDef.audittypeStr);
        }
		
		if(auditDef.audittypeStr == "自定义审核"){
			
			$("#enabled_div").hide();
		}
		else{
			
			$("#enabled_div").show();
		}
		
        $("#auditdef_name").val(auditDef.name);
        $("#explain").val(auditDef.explain);
        if (auditDef.inaccuracy != undefined) {
            $("#inaccuracy").val(auditDef.inaccuracy);
        }
        if (auditDef.sortIndex != undefined) {
            $("#sortIndex").val(auditDef.sortIndex);
        }
        if (auditDef.scale != undefined) {
            $("#scale").val(auditDef.scale);
        }
        
        if (auditDef.budgetenabled != undefined) {
            if (auditDef.budgetenabled) {
                $("#budgetenabled").attr("checked", true);
                
            }
            else {
                $("#budgetenabled").attr("checked", false);
            }
        }
        
        
        if (auditDef.agencyenabled != undefined) {
            if (auditDef.agencyenabled) {
                $("#agencyenabled").attr("checked", true);
                
            }
            else {
                $("#agencyenabled").attr("checked", false);
            }
        }
        
        if (auditDef.projectabled != undefined) {
            if (auditDef.projectabled) {
                $("#projectabled").attr("checked", true);
            }
            else {
                $("#projectabled").attr("checked", false);
                
            }
        }
        
        if (auditDef.alarmlevels != undefined) {
			
			$("input[name=alarm_name][type=radio][value="+auditDef.alarmlevels+"]").attr("checked",true);
        }
        
    }
    else {
        auditDef.lform = "";
        auditDef.rform = "";
        if (auditDef.inaccuracy != undefined) {
            $("#inaccuracy").val(auditDef.inaccuracy);
        }
    }
    
    $("#operator").bind("change", function(){
        auditDef.operator = $(this).val();
    });
    $("#btn_type").bind("click", function(){
        var pos = $("#audittype").position();
        
        $("#formModelType").css("top", pos.top + "px");
        $("#formModelType").css("left", pos.left + "px");
        $("#formModelType").show();
        
        $("#formModelType li").unbind("click").bind("click", function(){
            if ($(this).attr("typeId") != auditDef.audittype) {
                $("#audittype").val($(this).text());
                auditDef.audittype = $(this).attr("typeId");
				
				if($(this).attr("typeCode") == "003"){
					
					$("#enabled_div").hide();
				}
				else{
					
					$("#enabled_div").show();
				}
            }
            $("#formModelType").hide();
        });
    });
    //左表选择
    $("#btn_lchooseform").bind("click", function(){
        if (!$("#audit")[0].checked) {
            var pos = $("#lform").position();
            
            $("#selectFormModel").css("top", pos.top + "px");
            $("#selectFormModel").css("left", pos.left + "px");
            $("#selectFormModel").show();
            
            $("#selectFormModel li").unbind("click").bind("click", function(){
                if ($(this).attr("modelId") != auditDef.lform) {
                    $("#lform").val($(this).text());
                    auditDef.lform = $(this).attr("modelId");
                    auditDef.lfield = undefined;
                    $("#lfield").val("");
                    auditDef.lwhere = undefined;
                    $("#lwhere").val("");
                    auditDef.grouping = undefined;
                    $("#grouping").val("");
                }
                $("#selectFormModel").hide();
                
            });
        }
    });
    
    //选择右表
    $("#btn_rchooseform").bind("click", function(){
        if (!$("#audit")[0].checked) {
            var pos = $("#rform").position();
            
            $("#selectFormModel").css("top", pos.top + "px");
            $("#selectFormModel").css("left", pos.left + "px");
            $("#selectFormModel").show();
            
            $("#selectFormModel li").unbind("click").bind("click", function(){
                if ($(this).attr("modelId") != auditDef.rform) {
                    $("#rform").val($(this).text());
                    auditDef.rform = $(this).attr("modelId");
                    auditDef.rfield = undefined;
                    $("#rfield").val("");
                    auditDef.rwhere = undefined;
                    $("#rwhere").val("");
                    auditDef.grouping = undefined;
                    $("#grouping").val("");
                }
                $("#selectFormModel").hide();
            });
        }
    });
    
    
    
    //绑定点击其他地方自动关闭选择采集表的下拉菜单
    $("body").bind("mousedown", function(e){
        var el = $(e.target);
        if (el.parents("#selectFormModel").length == 0) {
            $("#selectFormModel").hide();
        }
        if (el.parents("#auditdef_btn_tagtable_div").length == 0 && el[0].id != "auditdef_btn_tagtable_div") {
            $("#auditdef_btn_tagtable_div").hide();
        }
        if (el.parents("#formModelType").length == 0) {
            $("#formModelType").hide();
        }
    });
    
    //选择左列
    $("#btn_lchoosefield").bind("click", function(){
        if (!$("#audit")[0].checked) {
            if ($("#lform").val() == "") {
                alert("请选择左侧采集表！");
                return;
            }
            var params = {};
            params["modelId"] = auditDef.lform;
            //params["filter"] = "number";
            Ext.lt.RCP.server("datacommon_addauditdef_service", "loadFields", params, function(data){
                if (data.error) {
                    closediv();
                    alert(data.error);
                }
                else {
                    var i = 0, fields = data.fieldList, length = fields.length;
                    var sb = new StringBuffer();
                    for (i = 0; i < length; i++) {
                        if (fields[i].name != "项目编号") {
                            sb.append("<li code=\"" + fields[i].COLUMNCODE + "\" type=\"" + fields[i].DATATYPE + "\">" + fields[i].NAME + "</li>");
                        }
                    }
                    $("#formfields ul").html(sb.toString());
                    
                    showDialog("选择列表达式", "Dlg_SelectField", {
                        "width": 600,
                        "height": 320,
                        "center": true
                    }, true, "SelectField");
                    
                    if (auditDef.lfield != undefined) {
                        selectFieldEditor.setExpression(auditDef.lfield, {
                            "fields": fields
                        });
                    }
                    else {
                        selectFieldEditor.clear();
                    }
                    
                    $("#btn_saveselectfield").unbind("click").bind("click", function(e){
                        // if(selectFieldEditor.check()){
                        var exp = selectFieldEditor.getExpression().replace(/[\xa0]/gi, " ");
                        if (exp != auditDef.lfield) {
                            $("#lfield").val(selectFieldEditor.document.body.innerText);
                            auditDef.lfield = exp;
                        }
                        closeDialog("SelectField");
                        //}else{
                        //  alert("选择列表达式语法有误，请检查！");
                        //}
                    });
                    
                    closediv();
                    
                    
                    
                    
                }
            });
        }
    });
    
    //选择右列
    $("#btn_rchoosefield").bind("click", function(){
        if (!$("#audit")[0].checked) {
            if ($("#rform").val() == "") {
                alert("请选择右侧采集表！");
                return;
            }
            var params = {};
            params["modelId"] = auditDef.rform;
            //params["filter"] = "number";
            Ext.lt.RCP.server("datacommon_addauditdef_service", "loadFields", params, function(data){
                if (data.error) {
                    closediv();
                    alert(data.error);
                }
                else {
                    var i = 0, fields = data.fieldList, length = fields.length;
                    var sb = new StringBuffer();
                    for (i = 0; i < length; i++) {
                        if (fields[i].name != "项目编号") {
                            sb.append("<li code=\"" + fields[i].COLUMNCODE + "\" type=\"" + fields[i].DATATYPE + "\">" + fields[i].NAME + "</li>");
                        }
                    }
                    $("#formfields ul").html(sb.toString());
                    
                    showDialog("选择列表达式", "Dlg_SelectField", {
                        "width": 600,
                        "height": 320,
                        "center": true
                    }, true, "SelectField");
                    
                    if (auditDef.rfield != undefined) {
                        selectFieldEditor.setExpression(auditDef.rfield, {
                            "fields": fields
                        });
                    }
                    else {
                        selectFieldEditor.clear();
                    }
                    
                    $("#btn_saveselectfield").unbind("click").bind("click", function(e){
                        //if(selectFieldEditor.check()){
                        var exp = selectFieldEditor.getExpression().replace(/[\xa0]/gi, " ");
                        if (exp != auditDef.rfield) {
                            $("#rfield").val(selectFieldEditor.document.body.innerText);
                            auditDef.rfield = exp;
                        }
                        closeDialog("SelectField");
                        //}else{
                        //  alert("选择列表达式语法有误，请检查！");
                        // }
                    });
                }
            });
        }
    });
    
    //绑定点击字段添加到列编辑器中
    $("#formfields ul").bind("click", function(e){
        var el = $(e.target);
        if (el.is("li")) {
            var fieldCode = el.attr("code");
            var fieldName = el.text();
            selectFieldEditor.insertField(fieldCode, fieldName);
        }
    });
    
    /* $("#btn_checkselfields").bind("click",function(){
     if(selectFieldEditor.check()){
     alert("选择列表达式语法校验通过！");
     }else{
     alert("选择列表达式语法校验失败，请检查！");
     }
     });*/
    //装载选择字段编辑器
    initSelectFieldEditor();
    $("#Dlg_SelectField").hide();
    
    $("#btn_checkcondition").bind("click", function(){
        if (conditionTable.check()) {
            alert("校验通过！");
        }
        else {
            alert("校验失败！");
        }
    });
    
    //选择左条件
    $("#btn_lchoosewhere").bind("click", function(e){
        if (!$("#audit")[0].checked) {
            if (!auditDef.lform) {
                alert("请选择左采集表！");
                return;
            }
            var params = {};
            params["modelId"] = auditDef.lform;
            Ext.lt.RCP.server("datacommon_addauditdef_service", "loadFields", params, function(data){
                if (data.error) {
                    closediv();
                    alert(data.error);
                }
                else {
                    var i = 0, fields = data.fieldList, length = fields.length;
                    var sb = new StringBuffer();
                    for (i = 0; i < length; i++) {
                        if (fields[i].name != "项目编号") {
                            sb.append("<li code=\"" + fields[i].COLUMNCODE + "\" type=\"" + fields[i].DATATYPE + "\">" + fields[i].NAME + "</li>");
                        }
                    }
                    $("#field_selector ul").html(sb.toString());
                    
                    conditionTable.clear();
                    if (auditDef.lwhere && auditDef.lwhere.trim()) {
                        conditionTable.setWhere(auditDef.lwhere, {
                            "fields": fields
                        });
                    }
                    
                    showDialog("选择左表条件", "Dlg_WhereCondition", {
                        "width": 600,
                        "height": 300,
                        "center": true
                    }, true, "WhereCondition");
                    $("#btn_savewhere").unbind("click").bind("click", function(){
                        if (conditionTable.check()) {
                            $("#lwhere").text(conditionTable.toWhereString());
                            auditDef.lwhere = conditionTable.toWhereCode();
                            closeDialog("WhereCondition");
                        }
                        else {
                            alert("语法校验失败，请检查！");
                        }
                    });
                    
                    
                    
                    
                }
            });
            
            
        }
        
    });
    //选择右条件
    $("#btn_rchoosewhere").bind("click", function(e){
        if (!$("#audit")[0].checked) {
            if (!auditDef.rform) {
                alert("请选择右采集表！");
                return;
            }
            var params = {};
            params["modelId"] = auditDef.rform;
            Ext.lt.RCP.server("datacommon_addauditdef_service", "loadFields", params, function(data){
                if (data.error) {
                    closediv();
                    alert(data.error);
                }
                else {
                    var i = 0, fields = data.fieldList, length = fields.length;
                    var sb = new StringBuffer();
                    for (i = 0; i < length; i++) {
                        if (fields[i].name != "项目编号") {
                            sb.append("<li code=\"" + fields[i].COLUMNCODE + "\" type=\"" + fields[i].DATATYPE + "\">" + fields[i].NAME + "</li>");
                        }
                    }
                    
                    $("#field_selector ul").html(sb.toString());
                    
                    conditionTable.clear();
                    if (auditDef.rwhere && auditDef.rwhere.trim()) {
                        conditionTable.setWhere(auditDef.rwhere, {
                            "fields": fields
                        });
                    }
                    showDialog("选择右表条件", "Dlg_WhereCondition", {
                        "width": 600,
                        "height": 300,
                        "center": true
                    }, true, "WhereCondition");
                    $("#btn_savewhere").unbind("click").bind("click", function(){
                        if (conditionTable.check()) {
                            $("#rwhere").text(conditionTable.toWhereString());
                            auditDef.rwhere = conditionTable.toWhereCode();
                            closeDialog("WhereCondition");
                        }
                        else {
                            alert("语法校验失败，请检查！");
                        }
                    });
                    
                    
                    
                    
                }
            });
        }
    });
    
    $("#btn_addcondition").bind("click", function(e){
        var html = "<tr>";
        for (var i = 0; i < 7; i++) {
            html += "<td></td>";
        }
        html += "</tr>";
        $("#condition_table tbody").append(html);
    });
    
    $("#btn_removecondition").bind("click", function(e){
        var row = $(conditionTable.table).find("tbody tr.sel");
        conditionTable.removeRow(row);
    });
    
    conditionTable = new TableView($("#condition_table")[0]);
    conditionTable.toWhereString = function(){
        var sb = new StringBuffer();
        $(this.table).find("tbody tr").each(function(index){
            var tds = $(this).find("td");
            var operator = false;
            for (var i = 0; i < tds.length; i++) {
                var code = $(tds[i]).attr("code");
                if (code == undefined) {
                    code = " ";
                }
                if (i == 3) {
                    if (code == '7' || code == '8') {
                        operator = true;
                    }
                    sb.append(conditionTable._getOperatorValue(code));
                }
                else 
                    if (i == 4 && operator) {
                        sb.append(code + " )");
                    }
                    else {
                        sb.append(code);
                    }
            }
        });
        return sb.toString(" ");
    };
    
    conditionTable._getOperatorValue = function(operator){
        var operatorValue = null;
        if (operator == "1") {
            operatorValue = "=";
        }
        else 
            if (operator == "2") {
                operatorValue = ">";
            }
            else 
                if (operator == "3") {
                    operatorValue = "<";
                }
                else 
                    if (operator == "4") {
                        operatorValue = ">=";
                    }
                    else 
                        if (operator == "5") {
                            operatorValue = "<=";
                        }
                        else 
                            if (operator == "6") {
                                operatorValue = "like";
                            }
                            else 
                                if (operator == "7") {
                                    operatorValue = "in ( ";
                                }
                                else 
                                    if (operator == "8") {
                                        operatorValue = "not in ( ";
                                    }
        return operatorValue;
    };
    
    conditionTable.toWhereCode = function(){
        var sb = new StringBuffer();
        $(this.table).find("tbody tr").each(function(index){
            var tds = $(this).find("td");
            var operator = false;
            for (var i = 0; i < tds.length; i++) {
                var code = $(tds[i]).attr("code");
                if (code == undefined) {
                    code = " ";
                }
                if (i == 3 && (code == '7' || code == '8')) {
                    operator = true;
                }
                if (operator == true && i == 4 && code.trim() != "") {
                    sb.append(" ( " + code + " ) ");
                }
                else {
                    sb.append(code);
                }
            }
        });
        
        return " " + sb.toString("|") + " ";
    }
    
    conditionTable.setWhere = function(whereStr){
        var conditionExps = whereStr.split("|");
        if (conditionExps.length > 0) {
            var sb = new StringBuffer();
            var size = conditionExps.length / 7;
            var display;
            var code;
            var type;
            for (var i = 0; i < size; i++) {
                sb.append("<tr>");
                for (var j = 0; j < 7; j++) {
                    code = conditionExps[i * 7 + j];
                    display = this._getCellDisplay(code, j);
                    sb.append("<td");
                    sb.append(" code=\"" + code + "\"");
                    if (j == 2) {
                        sb.append(" type=\"" + this._getCellTypeAttr(code, j) + "\"");
                    }
                    sb.append(">");
                    sb.append(display);
                    sb.append("</td>");
                }
                sb.append("</tr>");
            }
            var html = sb.toString();
            $("#condition_table tbody").append(html);
        }
    };
    
    conditionTable._getCellTypeAttr = function(code, i){
        var type;
        if (i == 2) {
            type = $("#field_selector li[code=" + code + "]").attr("type");
        }
        return type;
    }
    
    conditionTable._getCellDisplay = function(code, i){
        var display = code;
        if (i == 0) {
            display = $("#lbracket_selector li[code=" + code + "]").text();//左括号
        }
        else 
            if (i == 1) {
                display = $("#logicalnot_selector li[code=" + code + "]").text();//逻辑非
            }
            else 
                if (i == 2) {
                    display = $("#field_selector li[code=" + code + "]").text();//字段
                }
                else 
                    if (i == 3) {
                        display = $("#operator_selector li[code=" + code + "]").text();//比较符
                    }
                    else 
                        if (i == 4) {
                        
                        }
                        else 
                            if (i == 5) {
                                display = $("#rbracket_selector li[code=" + code + "]").text();//右括号
                            }
                            else 
                                if (i == 6) {
                                    display = $("#logical_selector li[code=" + code + "]").text();//逻辑符
                                }
        return display;
    };
    
    conditionTable._getField = function(code, fields){
        for (var i = 0; i < fields.length; i++) {
            if (fields[i].code == code) {
                return fields[i];
            }
        }
    };
    
    conditionTable.clear = function(){
        $(this.table).find("tbody").html("");
    };
    
    conditionTable.check = function(){
        return true;
    };
    
    conditionTable.clickCell = function(td){
        this.selectRow(td.parent());
        var index = $.inArray(td[0], $(td).parent().find("td"));
        
        var celleditor = null;
        if (index == 0) {
            celleditor = $("#lbracket_selector");
        }
        else 
            if (index == 1) {
                celleditor = $("#logicalnot_selector");
            }
            else 
                if (index == 2) {
                    celleditor = $("#field_selector");
                }
                else 
                    if (index == 3) {
                        celleditor = $("#operator_selector");
                        $("#operator_selecotr li").hide();
                        
                    }
                    else 
                        if (index == 4) {
                            celleditor = $("#value_selector");
                        }
                        else 
                            if (index == 5) {
                                celleditor = $("#rbracket_selector");
                            }
                            else 
                                if (index == 6) {
                                    celleditor = $("#logical_selector");
                                }
        if (celleditor) {
            celleditor.find("input").width(td.width());
            celleditor.find("input").height(td.height());
            celleditor.find("input").val(td.text());
            celleditor.find("input").unbind("keydown").bind("keydown", function(e){
                if (e.keyCode == 13) {
                    td.text($(this).val());
                    td.attr("code", $(this).val());
                    celleditor.hide();
                }
            });
            celleditor.find("input").unbind("blur").bind("blur", function(e){
                td.text($(this).val());
                td.attr("code", $(this).val());
            });
            
            celleditor.width(td.width());
            
            var pos = td.position();
            celleditor.css("top", pos.top + "px");
            celleditor.css("left", (pos.left + 1) + "px");
            celleditor.show();
            celleditor.find("li").unbind("click").bind("click", function(e){
                td.text($(this).text());
                td.attr("code", $(this).attr("code"));
                celleditor.hide();
            });
            
            if (celleditor.find("input").length > 0) {
                celleditor.find("input").focus();
            }
        }
    }
    
    //绑定点击其他地方自动关闭下拉菜单
    $("body").bind("mousedown", function(e){
        var el = $(e.target);
        if (el.parents(".cell_condition_editor").length == 0) {
            $(".cell_condition_editor").hide();
        }
    });
    
    //编辑记录分组
    $("#btn_editgrouping").bind("click", function(){
        if (!$("#audit")[0].checked) {
            if (auditDef.lform == 0) {
                alert("请选择左采集表！");
                return;
            }
            if (auditDef.rform == 0) {
                alert("请选择右采集表！");
                return;
            }
            
            var params = {};
            params["lModelId"] = auditDef.lform;
            params["rModelId"] = auditDef.rform;
            Ext.lt.RCP.server("datacommon_addauditdef_service", "loadGroupingFields", params, function(data){
                if (data.error) {
                    closediv();
                    alert(data.error);
                }
                else {
                    var lFields = data.lFieldList;
                    var sb = new StringBuffer();
                    var length = lFields.length;
                    for (i = 0; i < length; i++) {
                        sb.append("<li code=\"" + lFields[i].COLUMNCODE + "\" type=\"" + lFields[i].DATATYPE + "\">" + lFields[i].NAME + "</li>");
                    }
                    
                    $("#lgroup_fields ul").html(sb.toString());
                    
                    var rFields = data.rFieldList;
                    sb = new StringBuffer();
                    var length = rFields.length;
                    for (i = 0; i < length; i++) {
                        sb.append("<li code=\"" + rFields[i].COLUMNCODE + "\" type=\"" + rFields[i].DATATYPE + "\">" + rFields[i].NAME + "</li>");
                    }
                    
                    $("#rgroup_fields ul").html(sb.toString());
                    
                    groupingTable.clear();
                    if (auditDef.grouping) {
                        groupingTable.load(auditDef.grouping);
                    }
                    
                    showDialog("编辑记录分组", "Dlg_Grouping", {
                        "width": 500,
                        "height": 300,
                        "center": true
                    }, true, "Grouping");
                    
                }
            });
            
        }
    });
    $("#audit").bind("click", function(){
        if ($("#audit")[0].checked) {
            document.getElementById('content1').disabled = true;
            document.getElementById('content2').disabled = true;
        }
        else {
            document.getElementById('content1').disabled = false;
            document.getElementById('content2').disabled = false;
        }
    });
    $("#btn_addgrouping").bind("click", function(){
        var html = "<tr><td></td><td></td></tr>";
        $(groupingTable.table).find("tbody").append(html);
    });
    
    $("#btn_removegrouping").bind("click", function(){
        var tr = $(groupingTable.table).find("tbody tr.sel");
        groupingTable.removeRow(tr);
    });
    
    $("#btn_savegrouping").bind("click", function(){
        if (!groupingTable.check()) {
            alert("分组有误，请检查！");
        }
        else {
            $("#grouping").val(groupingTable.getgroupingStr());
            auditDef.grouping = groupingTable.getGroupingCode();
            closeDialog("Grouping");
        }
    });
    
    groupingTable = new TableView($("#grouping_table")[0]);
    groupingTable.clickCell = function(td){
        this.selectRow($(td).parent());
        var index = $.inArray($(td)[0], $(td).parent().find("td"));
        var pos = $(td).position();
        var editor = null
        if (index == 0) {
            editor = $("#lgroup_fields");
        }
        else {
            editor = $("#rgroup_fields");
        }
        editor.css("top", pos.top + "px");
        editor.css("left", pos.left + "px");
        editor.width($(td).width());
        editor.height($(td).height());
        editor.show();
        
        editor.find("li").unbind("click").bind("click", function(e){
            td.text($(this).text());
            td.attr("code", $(this).attr("code"));
            editor.hide();
        });
    };
    
    $("body").bind("mousedown", function(e){
        var el = $(e.target);
        if (el.parents("div.cell_group_editor").length == 0) {
            $("div.cell_group_editor").hide();
        }
    });
    
    groupingTable.clear = function(){
        $(groupingTable.table).find("tbody").html("");
    };
    
    groupingTable.getGroupingCode = function(){
        var sb = new StringBuffer();
        var rows = $(this.table).find("tbody tr");
        rows.each(function(index){
            var ltd = $(this).find("td:first");
            var rtd = $(this).find("td:last");
            sb.append(ltd.attr("code") + "|" + rtd.attr("code"));
        });
        return sb.toString(",");
    };
    
    groupingTable.check = function(){
        var checked = true;
        var rows = $(this.table).find("tbody tr");
        rows.each(function(index){
            var ltd = $(this).find("td:first");
            var rtd = $(this).find("td:last");
            if (!ltd.attr("code") || !rtd.attr("code")) {
                checked = false;
            }
        });
        return checked;
    };
    
    groupingTable.getgroupingStr = function(){
        var sb = new StringBuffer();
        var rows = $(this.table).find("tbody tr");
        rows.each(function(index){
            var ltd = $(this).find("td:first");
            var rtd = $(this).find("td:last");
            sb.append(ltd.text() + "|" + rtd.text());
        });
        return sb.toString(",");
    };
    
    groupingTable.load = function(groupingExp){
        var rowsData = groupingExp.split(",");
        var lcode, ltext, rcode, rtext;
        var sb = new StringBuffer();
        for (var i = 0; i < rowsData.length; i++) {
            var cellsData = rowsData[i].split("|");
            lcode = cellsData[0];
            ltext = this._getLField(lcode);
            rcode = cellsData[1];
            rtext = this._getRField(rcode);
            sb.append("<tr>");
            sb.append("<td code=\"" + lcode + "\">");
            sb.append(ltext);
            sb.append("</td>");
            sb.append("<td code=\"" + rcode + "\">");
            sb.append(rtext);
            sb.append("</td>");
            sb.append("</tr>");
        }
        $(this.table).find("tbody").html(sb.toString());
    };
    
    groupingTable._getLField = function(code){
        var field;
        $("#lgroup_fields ul li").each(function(index){
            if ($(this).attr("code") == code) {
                field = $(this).text();
            }
        });
        return field;
    };
    
    groupingTable._getRField = function(code){
        var field;
        $("#rgroup_fields ul li").each(function(index){
            if ($(this).attr("code") == code) {
                field = $(this).text();
            }
        });
        return field;
    };
    
    $("#budgetenabled").bind("click", function(e){
        var el = $(e.target);
        if (el[0].checked) {
            $("#projectabled").attr("checked", false);
        }
    });
    $("#agencyenabled").bind("click", function(e){
        var el = $(e.target);
        if (el[0].checked) {
            $("#projectabled").attr("checked", false);
        }
    });
    $("#projectabled").bind("click", function(e){
        var el = $(e.target);
        if (el[0].checked) {
            $("#budgetenabled").attr("checked", false);
            $("#agencyenabled").attr("checked", false);
        }
    });
    
    $("#audit").bind("click", function(e){
        var el = $(e.target);
        if (el[0].checked) {
            $("#operator").val("0");
            $("#lform").val("");
            $("#rform").val("");
            $("#lfield").val("");
            $("#rfield").val("");
            $("#lwhere").val("");
            $("#rwhere").val("");
            $("#grouping").val("");
        }
        else {
            $("#operator").val(auditDef.operator);
            $("#lform").val(auditDef.lformName);
            $("#rform").val(auditDef.rformName);
            $("#lfield").val(auditDef.lfieldStr);
            $("#rfield").val(auditDef.rfieldStr);
            $("#lwhere").val(auditDef.lwhereStr);
            $("#rwhere").val(auditDef.rwhereStr);
            $("#grouping").val(auditDef.groupingStr);
        }
    });
    
    $("#btn_audit").bind("click", function(){
        if (!$("#audit")[0].checked) {
            alert("请选择自定义审核！");
            return;
        }
		
		if(form_content1_wind == null){
			$("#form_content1").show();
	        form_content1_wind = new Ext.lt.window({
	            title: '自定义审核',
	            fitmode: 'body',
	            className: 'wind7',
	            mark: true,
	            autoshow: false,
	            pop: true,
				fitmode:'content'
	        });
	        form_content1_wind.draw(form_content1);
		}
        
        form_content1_wind.show();
		
        if (auditDef.customsql != undefined) {
            document.getElementById("filed2").value = brToN(auditDef.customsql);
        }
        else {
            document.getElementById("filed2").value = "";
        }
    });
    
    
    //目标表事件
    $("#auditdef_btn_tagtable").unbind("click").bind("click", function(){
        var $div = $("#auditdef_btn_tagtable_div");
        $div.show();
		
        var $input = $("#auditdef_tagtable");
        
        var checkeds = [];
        $input[0].value && (checkeds = $input[0].itemid.split(","));
        
        var tagTable = new Ext.lt.Qtree({
            data: config.tagTables,
            linkchild: true,
            linkparend: true,
            indeterminate: true,
            parentlinksub: true,
            showRootNode: true,
            selectmode: 'n',
            outformart: '#name',
            values: checkeds
        });
        tagTable.draw(auditdef_btn_tagtable_div);
        
        
        var pos = $input.position();
        $div.css("top", (pos.top + $input.height()) + "px");
        $div.css("left", (pos.left) + "px");
        
        $div.css("width", ($input.width()) + "px");
        
        tagTable.on({
            "click": function(tree, param){
                var _input = document.getElementById("auditdef_tagtable");
                _input.code = "";
                _input.value = "";
                _input.itemid = "";
                
                var sels = tree.getSelected();
                var codes = [], values = [], itemids = [];
                for (var i = 0, n = sels.length; i < n; i++) {
                
                    itemids.push(sels[i].itemid);
                    codes.push(sels[i].code);
                    values.push(sels[i].name);
                }
                
                _input.itemid = itemids.join(",");
                _input.code = codes.join(",");
                _input.value = values.join(",");
            }
        });
    });
    
    $("#auditdef_btn_tagset").bind("click", function(){
        var _input = document.getElementById("auditdef_tagtable");
        
        if (!_input.code) {
            alert("请先选择使用审核的表！");
            return;
        }
        
		$("#auditdef_div_tagset").show();
		
		var treeMapper = {};
		treeMapper["columns"] = ["itemid","code","name","superitemid","isleaf"];
		
		var treeDatas = [];
		var codes = _input.code, names = _input.value;
		if(codes && names){
			var codeArr = codes.split(","),nameArr = names.split(",");
			
			for(var i=0,n=codeArr.length; i<n; i++){
				var _tempArr = [];
				
				_tempArr.push(codeArr[i]);
				_tempArr.push(codeArr[i]);
				_tempArr.push(nameArr[i]);
				_tempArr.push("0");
				_tempArr.push("1");
				
				treeDatas.push(_tempArr);
			}
		}
		
		treeMapper["datas"] = treeDatas;
		
		//加载树
		auditSetTree = new Ext.lt.Qtree({
			data:new Ext.lt.recordset(treeMapper),
			linkchild:true,
			linkparend:true,
			indeterminate:true,
			parentlinksub:true,
			showRootNode:true,
			outformart:'#code-#name'
		});
		auditSetTree.draw(setTable_div);
		
		//加载表信息
		if(auditSetTable == null){
			var auditSetTable_rs = new Ext.lt.recordset({});
			auditSetTable = new Ext.lt.editdatatable(auditSetTable_rs);
			
			var cols = [
					auditSetTable.columns.seq,
					auditSetTable.columns.checkbox,
					{name:'FIELD',alias:'列表达式',datatype:'S',edit:true},
					{name:'CONDITION',alias:'比较条件',datatype:'S',edit:true}
			];
			
			for(var i=0,n=cols.length; i<n; i++){
				if(cols[i].edit){
					
					cols[i].rowspan = function(l, c, data){
						
						return  "selectable bl";
					}
					cols[i].oneditstart = function(table, e, l, c, data){
						
					}
					
					cols[i].oneditend = function(table, e, l, c, data){
						
					}
				}
			}
			
			auditSetTable.setCols(cols);
			
			auditSetTable.setClassName("dttheme_budget");
			auditSetTable.setAlign("left");
			auditSetTable.mousedrag(false);
			auditSetTable.setAllowClock(false);
			auditSetTable.setAllowcustom(false);
			
			auditSetTable.draw(edit_table_div);
		}
		
		auditSetTable.insertRow = function(){
			var sel = auditSetTree.getSelected();
			if(!sel || sel.length==0){
				alert("请先选择左侧采集表！");
				return;
			}
			
			var rs = this.getRecordset();
			rs.addData({},rs.size()+1);
		}
		
		auditSetTable.deleteRow = function(){
			var sel = auditSetTree.getSelected();
			if(!sel || sel.length==0){
				alert("请先选择左侧采集表！");
				return;
			}
			
			var data = this.getRecordSet().query({check:1});
			if(!data || data.length==0){
				alert("请选择要删除的数据！");
				return;
			}
			
			this.getRecordSet().remove(data);
		}
		
		auditSetTable.saveRow = function(){
			var sel = auditSetTree.getSelected();
			if(!sel || sel.length==0){
				alert("请先选择左侧采集表！");
				return;
			}
			
			var dataArray = this.getRecordSet().toArray();
			customAuditCache[sel[0].code] = dataArray;
			
			alert("保存成功！");
		}
		
		auditSetTree.on({"nodeclick" : function(tree,param){
	    	var selNode = param.data;
	    	if(selNode.isleaf == 0){
	    		alert("请选择末级数据！");
	    		return;
	    	}
			else{
	    		auditSetTable.getRecordset().clear();
				
				var _d = customAuditCache[selNode.code] || [];
				auditSetTable.getRecordset().addData(_d, 1);
	    	}
	    }});
		
		
		if(form_auditset_wind == null){
	        form_auditset_wind = new Ext.lt.window({
	            title: '自定义审核表条件',
	            fitmode: 'body',
	            className: 'wind7',
	            mark: true,
	            autoshow: false,
	            pop: true,
				fitmode:'content'
	        });
	        form_auditset_wind.draw(auditdef_div_tagset);
		}
        
		$("#edit_table_div").show();
        form_auditset_wind.show();
    });
	
	//对使用审核的表赋值
	if(config.userTables){
		var _input = document.getElementById("auditdef_tagtable"),tables = config.tableList;
		_input.code = (config.userTables.join(",") || "");
		
		var names = [],itemids = [];
		for(var i=0,n=config.userTables.length; i<n; i++){
			var t = config.userTables[i];
			
			for(var j=0,k=tables.length; j<k; j++){
				
				if(t == tables[j].CODE){
					
					names.push(tables[j].NAME);
					itemids.push(tables[j].ITEMID);
					break;
				}
			}
		}
		
		_input.itemid = itemids.join(",");
		_input.value = names.join(",");
	}
    
}
//------onload end



/**
 * 初始化界面布局
 */
function initLayout(config){
    var sb = new StringBuffer();
    var tableBuffer = new StringBuffer();
    var tableTypeBuffer = new StringBuffer();
    var tableLen = tableData.length;
    var audittypeLen = auditTypeList.length;
    var rowData;
    for (var i = 0; i < tableLen; i++) {
        rowData = tableData[i];
        tableBuffer.append("<li modelId=\"" + rowData.TABLECODE + "\">" + rowData.NAME + "</li>");
    }
    if (audittypeLen > 0) {
        for (var j = 0; j < audittypeLen; j++) {
            rowData = auditTypeList[j];
            tableTypeBuffer.append("<li typeCode=\""+rowData.code+"\" typeId=\"" + rowData.itemid + "\">" + rowData.name + "</li>");
        }
    }
    
    sb.append("<div class=\"auditdef\" layout=\"{w:{fit:-30},h:{fit:-35}}\" style = \"overflow:auto;\">");
    sb.append("<fieldset class=\"fieldset\" style=\"width:1000px;\" >");
    sb.append("<legend>审核定义基本信息</legend>");
    sb.append("<div class=\"float\">");
    sb.append("<label>审核名称</label><font class=\"tip\">*</font>：");
    sb.append("<input type=\"text\" id=\"auditdef_name\" style=\"width:400px;\" value=\"\" />");
    sb.append("&nbsp;&nbsp;<label>业务类型</label><font class=\"tip\">*</font>：<input id=\"audittype\" type=\"text\" style=\"width:200px;\" value =\"\" disabled=\"disabled\" /><button type=\"button\" id=\"btn_type\">...</button>");
    sb.append("&nbsp;&nbsp;<label for=\"projectabled\">自定义审核</label><input type=\"checkbox\" id=\"audit\" /> <button type=\"button\" id=\"btn_audit\">...</button>");
    sb.append("</div>");
    sb.append("<br class=\"clear\" />");
    
    sb.append("<div class=\"float\" >");
    sb.append("<label>使用审核的表</label><font class=\"tip\">*</font>：");
    sb.append("<input type=\"text\" id=\"auditdef_tagtable\" value=\"\" />");
    sb.append("<input type=\"button\" id=\"auditdef_btn_tagtable\" value=\"...\" />");
    sb.append("<div id=\"auditdef_btn_tagtable_div\" style=\"display:none;overflow:auto;width:210px;height:200px;position:absolute;background-color:#FCFCFC;border:1px solid #ccc;\"> </div>");
    
    sb.append("&nbsp;&nbsp;<label style=\"display:none;\">使用审核的条件</label>");
    sb.append("<input style=\"display:none;\" type=\"button\" id=\"auditdef_btn_tagset\" value=\"...\" />");
    sb.append("</div>");
    sb.append("<br class=\"clear\" />");
    
    sb.append("<div id='content1'>");
    sb.append("<table>");
    sb.append("<tr>");
    sb.append("<td>");
    sb.append("<fieldset class=\"leftmodel\">");
    sb.append("<legend>左表</legend>");
    sb.append("<div>");
    sb.append("<label>选择报表</label><font class=\"tip\">*</font>：<input id=\"lform\" type=\"text\" style=\"width:200px;\"  disabled=\"disabled\" /><button type=\"button\" id=\"btn_lchooseform\">...</button>");
    sb.append("</div>");
    sb.append("<div>");
    sb.append("<label>列表达式</label><font class=\"tip\">*</font>：<input id=\"lfield\" type=\"text\" style=\"width:200px;\" disabled=\"disabled\" /><button type=\"button\" id=\"btn_lchoosefield\">...</button>");
    sb.append("</div>");
    sb.append("<div style=\"vertical-align:top;\">");
    sb.append("<label><span>&nbsp;</span>比较条件</label>：<textarea id=\"lwhere\" style=\"width:200px;height:60px;\" disabled=\"disabled\"></textarea><button type=\"button\" id=\"btn_lchoosewhere\">...</button>");
    sb.append("</div>");
    sb.append("</fieldset>");
    sb.append("</td>");
    sb.append("<td>");
    sb.append("<select id=\"operator\">");
    sb.append("<option value=\"0\">表间比较条件</option>");
    sb.append("<option value=\"1\">等于</option>");
    sb.append("<option value=\"2\">大于</option>");
    sb.append("<option value=\"3\">大于等于</option>");
    sb.append("<option value=\"4\">小于</option>");
    sb.append("<option value=\"5\">小于等于</option>");
    sb.append("<option value=\"6\">不等于</option>");
    sb.append("</select>");
    sb.append("</td>");
    sb.append("<td>");
    sb.append("<fieldset class=\"rightmodel\">");
    sb.append("<legend>右表</legend>");
    sb.append("<div>");
    sb.append("<label>选择报表</label><font class=\"tip\">*</font>：<input id=\"rform\" type=\"text\" style=\"width:200px;\" disabled=\"disabled\" /><button type=\"button\" id=\"btn_rchooseform\">...</button>");
    sb.append("</div>");
    sb.append("	<div>");
    sb.append("<label>列表达式</label><font class=\"tip\">*</font>：<input id=\"rfield\" type=\"text\" style=\"width:200px;\" disabled=\"disabled\" /><button type=\"button\" id=\"btn_rchoosefield\">...</button>");
    sb.append("</div>");
    sb.append("<div style=\"vertical-align:top;\">");
    sb.append("<label><span>&nbsp;</span>比较条件</label>：<textarea id=\"rwhere\" style=\"width:200px;height:60px;\" disabled=\"disabled\"></textarea><button type=\"button\" id=\"btn_rchoosewhere\">...</button>");
    sb.append("</div>");
    sb.append("</fieldset>");
    sb.append("</td>");
    sb.append("</tr>");
    sb.append("</table>");
    sb.append("</div>");
    //sb.append("<br class=\"clear\" />");
    sb.append("<div class=\"float\" id='content2'>");
    sb.append("<label>分组</label><font class=\"tip\">*</font>：<input type=\"text\" disabled=\"disabled\" id=\"grouping\" style=\"width:400px;\" value=\"\"/><button type=\"button\" id=\"btn_editgrouping\">...</button>");
    sb.append("</div>");
    //sb.append("<br class=\"clear\" />");
    sb.append("</fieldset>");
    sb.append("<br class=\"clear\" />");
    sb.append("<fieldset class=\"fieldset\" style=\"width:1000px;\">");
    sb.append("<legend>审核定义参数设定</legend>");
    sb.append("<br class=\"clear\" />");
    sb.append("<div class=\"float\">");
    sb.append("<span><label>审核说明</label><font class=\"tip\">*</font>：</span>");
    sb.append("<textarea id=\"explain\" style=\"width:600px;height:60px;\"></textarea>");
    sb.append("</div>");
    sb.append("<br class=\"clear\" />");
    sb.append("<div class=\"float\">");
    sb.append("<label>审核误差</label><font class=\"tip\">*</font>：");
    sb.append("<input type=\"text\" id=\"inaccuracy\" value=\"\"/>");
    sb.append("&nbsp<label>审核顺序</label><font class=\"tip\">*</font>：");
    sb.append("<input type=\"text\" id=\"sortIndex\" value=\"0\"/>");
    sb.append("&nbsp<label>保留位数</label><font class=\"tip\">*</font>：");
    sb.append("<input type=\"text\" id=\"scale\" value=\"0\" />");
    sb.append("&nbsp<label>报警级别：</label> <input type=\"radio\" name=\"alarm_name\" id=\"alarmlevels\" value=\"0\" /> <label for=\"alarmlevels\">提示审核</label><input type=\"radio\" name=\"alarm_name\" checked=\"checked\" value=\"1\" id=\"alarmlevelsenable\" /> <label for=\"alarmlevelsenable\">强制审核</label>");
    sb.append("</div>");
    sb.append("<br class=\"clear\" />");
    sb.append("<div id=\"enabled_div\">");
    sb.append("<input type=\"checkbox\" id=\"budgetenabled\" />");
    sb.append("<label for=\"budgetenabled\">财政启用</label>");
    sb.append("<input type=\"checkbox\" id=\"agencyenabled\" />");
    sb.append("<label for=\"agencyenabled\">单位启用</label>");
    sb.append("<input type=\"checkbox\" id=\"projectabled\" />");
    sb.append("<label for=\"projectabled\">项目启用</label>");
    sb.append("<input type=\"checkbox\" id=\"central\"/>");
    sb.append("<label for=\"central\">中央</label>");
    sb.append("<input type=\"checkbox\" id=\"province\"/>");
    sb.append("<label for=\"province\">省级</label>");
    sb.append("<input type=\"checkbox\" id=\"city\" />");
    sb.append("<label for=\"city\">市级</label>");
    sb.append("</div>");
    sb.append("</fieldset>");
    sb.append("<div style=\"float:right;\">");
    if (!ismodify) {
        sb.append("<button type=\"button\" class=\"button_style\" onclick=\"saveAuditDef()\">保存</button>");
    }
    sb.append("<button type=\"button\" class=\"button_style\" onclick=\"backToList()\">返回</button>");
    sb.append("</div>");
    
    
    sb.append("<div id=\"selectFormModel\" style=\"display:none;\">");
    sb.append("<ul>");
    sb.append(tableBuffer.toString());
    sb.append("</ul>");
    sb.append("</div>");
    
    sb.append("<div id=\"formModelType\" style=\"display:none;\">");
    sb.append("<ul>");
    sb.append(tableTypeBuffer.toString());
    sb.append("</ul>");
    sb.append("</div>");
    //列表达式
    sb.append("<div class=\"dialog_content\"  id=\"Dlg_SelectField\">");
    sb.append("<div>");
    sb.append("<table>");
    sb.append("<tr>");
    sb.append("<td id=\"formfields\" valign=\"top\" width=\"25%\">");
    sb.append("<ul>");
    sb.append("</ul>");
    sb.append("</td>");
    sb.append("<td>");
    sb.append("<iframe name=\"selectFieldEditor\" id=\"selectFieldEditor\" frameBorder=\"1\" marginWidth=\"0\" marginHeight=\"0\" style=\"width: 450px; height: 200px;\"></iframe>");
    sb.append("</td>");
    sb.append("</tr>");
    sb.append(" <tr>");
    sb.append("<td colspan=\"2\" style=\"padding:4px;\">");
    sb.append("<span style=\"color:#000\">目前支持的公式支持的函数为oracle语法函数</span>");
    sb.append("</td>");
    sb.append("</tr>");
    sb.append("</table>");
    sb.append("</div>");
    sb.append("<div>");
    sb.append("<button type=\"button\" id=\"btn_saveselectfield\">确定</button>");
    sb.append("<button type=\"button\" onclick=\"closeDialog('SelectField')\">取消</button>");
    sb.append("</div>");
    sb.append("</div>");
    //比较条件
    sb.append("<div class=\"dialog_content\" id=\"Dlg_WhereCondition\" style=\"display:none\">");
    sb.append("<div>");
    sb.append("<button type=\"button\" id=\"btn_addcondition\">添 加</button>");
    sb.append("<button type=\"button\" id=\"btn_removecondition\">删 除</button>");
    sb.append("<button type=\"button\" id=\"btn_checkcondition\">校 验</button>");
    sb.append("</div>");
    sb.append("<div style=\"height:200px;overflow:auto;\">");
    sb.append("<table class=\"tableview\" id=\"condition_table\">");
    sb.append("<colgroup width=\"20\"></colgroup>");
    sb.append("<colgroup width=\"60\"></colgroup>");
    sb.append("<colgroup width=\"150\"></colgroup>");
    sb.append("<colgroup width=\"60\"></colgroup>");
    sb.append("<colgroup width=\"150\"></colgroup>");
    sb.append("<colgroup width=\"20\"></colgroup>");
    sb.append("<colgroup width=\"60\"></colgroup>");
    sb.append("<thead>");
    sb.append("<tr>");
    sb.append("<th>（</th>");
    sb.append("<th>逻辑非</th>");
    sb.append("<th>字段名称</th>");
    sb.append("<th>操作符</th>");
    sb.append("<th>值</th>");
    sb.append("<th>）</th>");
    sb.append("<th>逻辑符</th>");
    sb.append("</tr>");
    sb.append("</thead>");
    sb.append("<body>");
    sb.append("</body>");
    sb.append("</table>");
    sb.append("</div>");
    sb.append("<div id=\"lbracket_selector\" class=\"cell_condition_editor\">");
    sb.append("<ul>");
    sb.append("<li code=\" \"></li>");
    sb.append("<li code=\"(\">（</li>");
    sb.append("</ul>");
    sb.append("</div>");
    sb.append("<div id=\"logicalnot_selector\" class=\"cell_condition_editor\">");
    sb.append("<ul>");
    sb.append("<li code=\" \"></li>");
    sb.append("<li code=\"not\">非</li>");
    sb.append("</ul>");
    sb.append("</div>");
    sb.append("<div id=\"field_selector\" class=\"cell_condition_editor\">");
    sb.append("<ul>");
    sb.append("</ul>");
    sb.append("</div>");
    sb.append("<div id=\"operator_selector\" class=\"cell_condition_editor\">");
    sb.append("<ul>");
    sb.append("<li code=\"1\">等于</li>");
    sb.append("<li code=\"2\">大于</li>");
    sb.append("<li code=\"3\">小于</li>");
    sb.append("<li code=\"4\">大于等于</li>");
    sb.append("<li code=\"5\">小于等于</li>");
    sb.append("<li code=\"6\">相似</li>");
    sb.append("<li code=\"7\">包含</li>");
    sb.append("<li code=\"8\">不包含</li>");
    sb.append("</ul>");
    sb.append("</div>");
    sb.append("<div id=\"value_selector\" class=\"cell_condition_editor\">");
    sb.append("<input type=\"text\" value=\"\" />");
    sb.append("</div>");
    sb.append("<div id=\"rbracket_selector\" class=\"cell_condition_editor\">");
    sb.append("<ul>");
    sb.append("<li code=\" \"></li>");
    sb.append(" <li code=\")\">）</li>");
    sb.append("</ul>");
    sb.append("  </div>");
    sb.append(" <div id=\"logical_selector\" class=\"cell_condition_editor\">");
    sb.append(" <ul>");
    sb.append(" <li code=\" \"></li>");
    sb.append("<li code=\"and\">并且</li>");
    sb.append(" <li code=\"or\">或者</li>");
    sb.append("</ul>");
    sb.append("</div>");
    sb.append("<div>");
    sb.append("<button type=\"button\" id=\"btn_savewhere\">确定</button>");
    sb.append("<button type=\"button\" onclick=\"closeDialog('WhereCondition')\">取消</button>");
    sb.append("</div>");
    sb.append("</div>");
    
    //分组
    sb.append("<div class=\"dialog_content\" id=\"Dlg_Grouping\" style=\"display:none\">");
    sb.append("<div>");
    sb.append("<button type=\"button\" id=\"btn_addgrouping\">添加</button>");
    sb.append("<button type=\"button\" id=\"btn_removegrouping\">删除</button>");
    sb.append("</div>");
    sb.append("<div style=\"height:200px;overflow:auto;\">");
    sb.append("<table class=\"tableview\" id=\"grouping_table\">");
    sb.append("<colgroup width=\"150\"></colgroup>");
    sb.append("<colgroup width=\"150\"></colgroup>");
    sb.append("<thead>");
    sb.append("<tr>");
    sb.append("<th>左分组<br></th>");
    sb.append("<th>右分组<br></th>");
    sb.append("</tr>");
    sb.append("</thead>");
    sb.append("<body>");
    sb.append("</body>");
    sb.append("</table>");
    sb.append("</div>");
    sb.append(" <div id=\"lgroup_fields\" class=\"cell_group_editor\"><ul></ul></div>");
    sb.append("<div id=\"rgroup_fields\" class=\"cell_group_editor\"><ul></ul></div>");
    sb.append("<div>");
    sb.append("<button type=\"button\" id=\"btn_savegrouping\">确定</button>");
    sb.append("<button type=\"button\" onclick=\"closeDialog('Grouping')\">取消</button>");
    sb.append(" </div>");
	
	sb.append("</div>");
    
	//自定义审核
	sb.append("<div id=\"form_content1\" style=\"display:none;width:660px;height:400px;\" >");
	sb.append("<div>");
    sb.append("<textarea id = 'filed2' style=\"width:99%;height:320px;\" ></textarea>");
    sb.append("</div>");
    sb.append("<div style=\"margin-left:40%;\">");
    sb.append("<input type=\"button\" style = \"height:20px;\" value=\"校 验\" onclick=\"vaildAudit()\"></input>");
    sb.append("<input type=\"button\" style = \"height:20px;\" value=\"保 存\" onclick=\"saveForm()\"></input>");
    sb.append("<input type=\"button\" style = \"height:20px;\" value=\"取 消\" onclick=\"form_content1_wind.close();\"></input>");
    sb.append("</div>");
    sb.append("</div>");
	
	
	//目标表的条件
	sb.append("<div id=\"auditdef_div_tagset\" style=\"display:none;width:550px;height:300px;\" >");
	sb.append("<table style=\"width:98%;height:98%;\">");
	sb.append("<tr>");
	sb.append("<td style=\"width:30%;\">");
	sb.append("<div id=\"setTable_div\" style=\"background:#fff;border:1px solid #ccc;padding:0px; overflow:auto;height:270px;\"></div>");
	sb.append("</td>");
	sb.append("<td style=\"width:70%;\">");
	sb.append("<div>");
	sb.append("<div id=\"query_t\" style=\"height:25px;\">");
	sb.append("<span><span title=\"添加\" class=\"budget_add\" onclick=\"auditSetTable.insertRow()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0);\">添加</a></span></span>");	
	sb.append("<span><span title=\"删除\" class=\"budget_del\" onclick=\"auditSetTable.deleteRow()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0);\">删除</a></span></span>");
	sb.append("<span><span title=\"保存\" class=\"budget_save\" onclick=\"auditSetTable.saveRow()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0);\">保存</a></span></span>");
	sb.append("</div>")
	sb.append("<div id=\"edit_table_div\" style=\"width:95%;height:250px;\" ></div>");		
	sb.append("</div>");
	sb.append("</td>");
	sb.append("</tr>");		
	sb.append("<table>");
	sb.append("</div>");
    
    //	sb.append("");	
    document.getElementById("template_main").innerHTML = sb.toString();
}

////添加
//function leftform(){
//	 var pos = $("#lform").position();
//	    
//	    $("#selectFormModel").css("top",pos.top+"px");
//	    $("#selectFormModel").css("left",pos.left+"px");
//	    $("#selectFormModel").show();
//	    
//	    $("#selectFormModel li").unbind("click").bind("click",function(){
//	      if($(this).attr("modelId")!=auditDef.lform){
//	        $("#lform").val($(this).text());
//	        auditDef.lform = $(this).attr("modelId");
//	        auditDef.lfield = undefined;
//	        $("#lfield").val("");
//	        auditDef.lwhere = undefined;
//	        $("#lwhere").val("");
//	        auditDef.grouping = undefined;
//	        $("#grouping").val("");
//	      }
//	      $("#selectFormModel").hide();
//	      
//	    });
//}


function initSelectFieldEditor(){

    selectFieldEditor = document.getElementById("selectFieldEditor").contentWindow;
    selectFieldEditor.document.designMode = 'On';
    selectFieldEditor.document.contentEditable = true;
    selectFieldEditor.document.open();
    selectFieldEditor.document.writeln("<html><head><link href=\"/budget/common/style/formulastyle.css\" rel=\"stylesheet\" type=\"text/css\"/></head><body></body></html>");
    selectFieldEditor.document.onclick = "alert()";
    selectFieldEditor.document.close();
    selectFieldEditor.document.charset = "utf-8";
    
    this.srcElement = null;
    if (window.getSelection) {//for ff
        $(selectFieldEditor.document).bind("mouseup", this, function(event){
            event.data.srcElement = event.target;
        });
    }
    
    //ie bug
    if (document.attachEvent) {
        var selRange;
        var ieSelectionBookmark;
        selectFieldEditor.document.onbeforedeactivate = function(){
            selRange = this.selection.createRange();
        };
        selectFieldEditor.document.onactivate = function(){
            if (selRange) {
                selRange.select();
                selRange = null;
            }
        }
    }
    
    selectFieldEditor.check = function(){
        var b = true;
        var content = $("<div style=\"display:none;\">" + this.document.body.innerHTML + "</div>");
        content.find("a[code]").each(function(){
        
            $(this).text("new Number(9)");
        });
        if (!b) {
            return;
        }
        var formula = content.text();
        //alert(formula);
        var SUM = function(){
        };
        var COUNT = function(){
        };
        var MAX = function(){
        };
        var MIN = function(){
        };
        var DISTINCT = function(){
        };
        try {
            eval("var formulatest=" + formula);
            return true;
        } 
        catch (exception) {
            return false;
        }
    };
    
    selectFieldEditor.setExpression = function(expression, context){
        var expReg = /\$\{([\s\S]+?)\}/g;
        var field;
        var html = expression.replace(expReg, function($0, $1){
            field = selectFieldEditor._getField($1, context.fields);
            return "<a code=\"" + field.COLUMNCODE + "\">" + field.NAME + "</a>";
        });
        this.document.body.innerHTML = html;
    };
    
    selectFieldEditor._getField = function(code, fields){
        for (var i = 0; i < fields.length; i++) {
            if (fields[i].COLUMNCODE == code) {
                return fields[i];
            }
        }
    };
    
    selectFieldEditor.getExpression = function(){
        var content = $("<div style=\"display:none;\">" + this.document.body.innerHTML + "</div>");
        content.find("a[code]").each(function(){
            $(this).text("${" + $(this).attr("code") + "}");
        });
        //alert(content.text());
        return content.text();
    };
    
    selectFieldEditor.insertField = function(fieldCode, fieldName){
        var html = "<a code=\"" + fieldCode + "\">" + fieldName + "</a>";
        this.focus();
        var selection = this.document.selection;
        if (selection) {
            if (selection.type.toLowerCase() != "none") {
                this.execCommand("Delete");
            }
            this.document.selection.createRange().pasteHTML(html);
        }
        else {//for ff
            this.execCommand("insertHTML", false, html);
        }
        this.focus();
    };
    
    selectFieldEditor.clear = function(){
        this.document.body.innerHTML = "";
    };
}

var b = false;//后添加的，杨锁成
function saveAuditDef(){
    if ($("#auditdef_name").val() == "") {
        alert("请输入审核名称！");
        return;
    }
	
	var input_table = document.getElementById("auditdef_tagtable");
	if(!input_table.code){
		alert("请先选择使用审核的表！");
		return;
	}
	
    if (!$("#audit")[0].checked) {
        if (!auditDef.lform) {
            alert("请选择左表!");
            return;
        }
        if (!auditDef.rform) {
            alert("请选择右表!");
            return;
        }
        if (!auditDef.lfield) {
            alert("请选择左列!");
            return;
        }
        if (!auditDef.rfield) {
            alert("请选择右列!");
            return;
        }
        
        if (!auditDef.grouping) {
            alert("请选择分组条件!");
            return;
        }
        if (auditDef.operator == 0) {
            alert("请选择表间比较条件！");
            return;
        }
    }
    else {
        if (!auditDef.customsql) {
            alert("请填写自定义审核!");
            return;
        }
    }
	
	if(!auditDef.audittype){
		alert("请选择业务类型!");
		return;
	}
	
    if (!isNumber($("#inaccuracy").val())) {
        alert("审核误差不能为空且必须为数字，请检查!");
        return;
    }
    
    if (isEmpty($("#sortIndex").val()) || !isInteger($("#sortIndex").val())) {
        alert("显示顺序不能为空且必须为整数，请检查!");
        return;
    }
    
    if (parseInt($("#sortIndex").val(), 10) < 0) {
        alert("显示顺序不能输入负数，请检查！");
        return;
    }
    
    if (!isNumber($("#scale").val())) {
        alert("保留位数不能为空且必须为数字，请检查!");
        return;
    }
    
    if (parseInt($("#scale").val(), 10) > 5 || parseInt($("#scale").val(), 10) < 0) {
        alert("保留位数应在0-5之间，请检查!");
        return;
    }
    
    if ($("#explain").val() == "") {
        alert("审核说明不能为空，请检查！");
        return;
    }
    
    var params = auditDef;
    params["explain"] = $("#explain").val();
    params["name"] = $("#auditdef_name").val();
    params["inaccuracy"] = $("#inaccuracy").val();
    params["sortIndex"] = $("#sortIndex").val();
    params["levelno"] = clevelno;
    params["product"] = product;
    //保留位数
    params["scale"] = $("#scale").val();
    
    if ($("#budgetenabled:checked").length > 0) {
        params["budgetenabled"] = true;
    }
    else {
        params["budgetenabled"] = false;
    }
    if ($("#agencyenabled:checked").length > 0) {
        params["agencyenabled"] = true;
    }
    else {
        params["agencyenabled"] = false;
    }
    
    if ($("#projectabled:checked").length > 0) {
        params["projectabled"] = true;
    }
    else {
        params["projectabled"] = false;
    }
    
	params["alarmlevels"] = $("input[name=alarm_name][type=radio]:checked").val();
	
/*
	var tableTag = [];
	var tableCodes = input_table.code.split(",");
	for(var i=0,n=tableCodes.length; i<n; i++){
		var _d = customAuditCache[tableCodes[i]];
		
		if(_d){
			(!(_d instanceof Array)) && (_d = [_d]);
			
			for(var j=0,k=_d.length; j<k; j++){
				_d[j]["TABLECODE"] =  tableCodes[i];
				
				tableTag.push(_d[j]);
			}
		}else{
			tableTag.push({"TABLECODE":tableCodes[i],"FIELD":"","CONDITION":""});
		}
	}
	
	params["tableTags"] = tableTag;
*/
	params["tableCodes"] = input_table.code;
	
    Ext.lt.RCP.server("datacommon_addauditdef_service", "saveAudit", params, function(data){
        if (data.error) {
        
            alert(data.error);
            closediv();
        }
        else {
            auditDef.billid = data.billid;
            b = true;//后添加的	     
            alert("审核定义保存成功！");
            var params = {};
            params["product"] = product;
            params["billid"] = billid;
			params["productType"] = product;
            jumpTo("/datacommon/auditdef/index.page?mainmenu=" + mainmenu + "&submenu=" + submenu + "", "post", params);
            
        }
    });
    //  $.jsonPost("save.do",params,function(data){
    //    if(data.error){
    //      alert(data.error);
    //    }else{
    //      auditDef.billid = data.billid;
    //      b=true;//后添加的
    //      alert("审核定义保存成功！");
    //     history.go(-1);
    //    }
    //  });
};

function backToList(){
    if (b == false) {//后添加的
        if (confirm("数据未保存，是否保存数据?")) {
            saveAuditDef();
        }
        else {//后添加的
            //		history.go(-1);//后添加的
            var params = {};
            params["product"] = product;
            params["billid"] = billid;
            params["productType"] = productType;
            jumpTo("/datacommon/auditdef/index.page?mainmenu=" + mainmenu + "&submenu=" + submenu + "", "post", params);
        }
    }
    else {
        history.go(-1);
    }
};

function saveForm(){
    var params = {};
    params["customsql"] = brToN(document.getElementById("filed2").value);
    Ext.lt.RCP.server("datacommon_addauditdef_service", "vaildAudit", params, function(data){
        if (data.error) {
            alert(data.error);
            closediv();
        }
        else {
            var exp = document.getElementById("filed2").value;
            if (exp != auditDef.customsql) {
            
                auditDef.customsql = exp;
            }
            form_content1_wind.close();
        }
    });
}

function vaildAudit(){
    var params = {};
    params["customsql"] = document.getElementById("filed2").value.replace(/\n/g, " ");
    Ext.lt.RCP.server("datacommon_addauditdef_service", "vaildAudit", params, function(data){
        if (data.error) {
            alert(data.error);
            closediv();
        }
        else {
            alert("SQL校验成功！");
        }
    });
    
}

//将br转为空
function brToN(str){
	return str.replace(/<br>/g," ").replace(/\n/g," ");
}
