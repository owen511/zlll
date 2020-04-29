var qtree = null;
var datatable = null;
var modelId, bdgAgency;
var selNodeFlag = false;
var tablecode = "";
var product;
var wind = null;// ��������
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
    // ��ʼ������
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
		
		if(auditDef.audittypeStr == "�Զ������"){
			
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
    //���ѡ��
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
    
    //ѡ���ұ�
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
    
    
    
    //�󶨵�������ط��Զ��ر�ѡ��ɼ���������˵�
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
    
    //ѡ������
    $("#btn_lchoosefield").bind("click", function(){
        if (!$("#audit")[0].checked) {
            if ($("#lform").val() == "") {
                alert("��ѡ�����ɼ���");
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
                        if (fields[i].name != "��Ŀ���") {
                            sb.append("<li code=\"" + fields[i].COLUMNCODE + "\" type=\"" + fields[i].DATATYPE + "\">" + fields[i].NAME + "</li>");
                        }
                    }
                    $("#formfields ul").html(sb.toString());
                    
                    showDialog("ѡ���б��ʽ", "Dlg_SelectField", {
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
                        //  alert("ѡ���б��ʽ�﷨�������飡");
                        //}
                    });
                    
                    closediv();
                    
                    
                    
                    
                }
            });
        }
    });
    
    //ѡ������
    $("#btn_rchoosefield").bind("click", function(){
        if (!$("#audit")[0].checked) {
            if ($("#rform").val() == "") {
                alert("��ѡ���Ҳ�ɼ���");
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
                        if (fields[i].name != "��Ŀ���") {
                            sb.append("<li code=\"" + fields[i].COLUMNCODE + "\" type=\"" + fields[i].DATATYPE + "\">" + fields[i].NAME + "</li>");
                        }
                    }
                    $("#formfields ul").html(sb.toString());
                    
                    showDialog("ѡ���б��ʽ", "Dlg_SelectField", {
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
                        //  alert("ѡ���б��ʽ�﷨�������飡");
                        // }
                    });
                }
            });
        }
    });
    
    //�󶨵���ֶ���ӵ��б༭����
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
     alert("ѡ���б��ʽ�﷨У��ͨ����");
     }else{
     alert("ѡ���б��ʽ�﷨У��ʧ�ܣ����飡");
     }
     });*/
    //װ��ѡ���ֶα༭��
    initSelectFieldEditor();
    $("#Dlg_SelectField").hide();
    
    $("#btn_checkcondition").bind("click", function(){
        if (conditionTable.check()) {
            alert("У��ͨ����");
        }
        else {
            alert("У��ʧ�ܣ�");
        }
    });
    
    //ѡ��������
    $("#btn_lchoosewhere").bind("click", function(e){
        if (!$("#audit")[0].checked) {
            if (!auditDef.lform) {
                alert("��ѡ����ɼ���");
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
                        if (fields[i].name != "��Ŀ���") {
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
                    
                    showDialog("ѡ���������", "Dlg_WhereCondition", {
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
                            alert("�﷨У��ʧ�ܣ����飡");
                        }
                    });
                    
                    
                    
                    
                }
            });
            
            
        }
        
    });
    //ѡ��������
    $("#btn_rchoosewhere").bind("click", function(e){
        if (!$("#audit")[0].checked) {
            if (!auditDef.rform) {
                alert("��ѡ���Ҳɼ���");
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
                        if (fields[i].name != "��Ŀ���") {
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
                    showDialog("ѡ���ұ�����", "Dlg_WhereCondition", {
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
                            alert("�﷨У��ʧ�ܣ����飡");
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
            display = $("#lbracket_selector li[code=" + code + "]").text();//������
        }
        else 
            if (i == 1) {
                display = $("#logicalnot_selector li[code=" + code + "]").text();//�߼���
            }
            else 
                if (i == 2) {
                    display = $("#field_selector li[code=" + code + "]").text();//�ֶ�
                }
                else 
                    if (i == 3) {
                        display = $("#operator_selector li[code=" + code + "]").text();//�ȽϷ�
                    }
                    else 
                        if (i == 4) {
                        
                        }
                        else 
                            if (i == 5) {
                                display = $("#rbracket_selector li[code=" + code + "]").text();//������
                            }
                            else 
                                if (i == 6) {
                                    display = $("#logical_selector li[code=" + code + "]").text();//�߼���
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
    
    //�󶨵�������ط��Զ��ر������˵�
    $("body").bind("mousedown", function(e){
        var el = $(e.target);
        if (el.parents(".cell_condition_editor").length == 0) {
            $(".cell_condition_editor").hide();
        }
    });
    
    //�༭��¼����
    $("#btn_editgrouping").bind("click", function(){
        if (!$("#audit")[0].checked) {
            if (auditDef.lform == 0) {
                alert("��ѡ����ɼ���");
                return;
            }
            if (auditDef.rform == 0) {
                alert("��ѡ���Ҳɼ���");
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
                    
                    showDialog("�༭��¼����", "Dlg_Grouping", {
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
            alert("�����������飡");
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
            alert("��ѡ���Զ�����ˣ�");
            return;
        }
		
		if(form_content1_wind == null){
			$("#form_content1").show();
	        form_content1_wind = new Ext.lt.window({
	            title: '�Զ������',
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
    
    
    //Ŀ����¼�
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
            alert("����ѡ��ʹ����˵ı�");
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
		
		//������
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
		
		//���ر���Ϣ
		if(auditSetTable == null){
			var auditSetTable_rs = new Ext.lt.recordset({});
			auditSetTable = new Ext.lt.editdatatable(auditSetTable_rs);
			
			var cols = [
					auditSetTable.columns.seq,
					auditSetTable.columns.checkbox,
					{name:'FIELD',alias:'�б��ʽ',datatype:'S',edit:true},
					{name:'CONDITION',alias:'�Ƚ�����',datatype:'S',edit:true}
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
				alert("����ѡ�����ɼ���");
				return;
			}
			
			var rs = this.getRecordset();
			rs.addData({},rs.size()+1);
		}
		
		auditSetTable.deleteRow = function(){
			var sel = auditSetTree.getSelected();
			if(!sel || sel.length==0){
				alert("����ѡ�����ɼ���");
				return;
			}
			
			var data = this.getRecordSet().query({check:1});
			if(!data || data.length==0){
				alert("��ѡ��Ҫɾ�������ݣ�");
				return;
			}
			
			this.getRecordSet().remove(data);
		}
		
		auditSetTable.saveRow = function(){
			var sel = auditSetTree.getSelected();
			if(!sel || sel.length==0){
				alert("����ѡ�����ɼ���");
				return;
			}
			
			var dataArray = this.getRecordSet().toArray();
			customAuditCache[sel[0].code] = dataArray;
			
			alert("����ɹ���");
		}
		
		auditSetTree.on({"nodeclick" : function(tree,param){
	    	var selNode = param.data;
	    	if(selNode.isleaf == 0){
	    		alert("��ѡ��ĩ�����ݣ�");
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
	            title: '�Զ�����˱�����',
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
	
	//��ʹ����˵ı�ֵ
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
 * ��ʼ�����沼��
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
    sb.append("<legend>��˶��������Ϣ</legend>");
    sb.append("<div class=\"float\">");
    sb.append("<label>�������</label><font class=\"tip\">*</font>��");
    sb.append("<input type=\"text\" id=\"auditdef_name\" style=\"width:400px;\" value=\"\" />");
    sb.append("&nbsp;&nbsp;<label>ҵ������</label><font class=\"tip\">*</font>��<input id=\"audittype\" type=\"text\" style=\"width:200px;\" value =\"\" disabled=\"disabled\" /><button type=\"button\" id=\"btn_type\">...</button>");
    sb.append("&nbsp;&nbsp;<label for=\"projectabled\">�Զ������</label><input type=\"checkbox\" id=\"audit\" /> <button type=\"button\" id=\"btn_audit\">...</button>");
    sb.append("</div>");
    sb.append("<br class=\"clear\" />");
    
    sb.append("<div class=\"float\" >");
    sb.append("<label>ʹ����˵ı�</label><font class=\"tip\">*</font>��");
    sb.append("<input type=\"text\" id=\"auditdef_tagtable\" value=\"\" />");
    sb.append("<input type=\"button\" id=\"auditdef_btn_tagtable\" value=\"...\" />");
    sb.append("<div id=\"auditdef_btn_tagtable_div\" style=\"display:none;overflow:auto;width:210px;height:200px;position:absolute;background-color:#FCFCFC;border:1px solid #ccc;\"> </div>");
    
    sb.append("&nbsp;&nbsp;<label style=\"display:none;\">ʹ����˵�����</label>");
    sb.append("<input style=\"display:none;\" type=\"button\" id=\"auditdef_btn_tagset\" value=\"...\" />");
    sb.append("</div>");
    sb.append("<br class=\"clear\" />");
    
    sb.append("<div id='content1'>");
    sb.append("<table>");
    sb.append("<tr>");
    sb.append("<td>");
    sb.append("<fieldset class=\"leftmodel\">");
    sb.append("<legend>���</legend>");
    sb.append("<div>");
    sb.append("<label>ѡ�񱨱�</label><font class=\"tip\">*</font>��<input id=\"lform\" type=\"text\" style=\"width:200px;\"  disabled=\"disabled\" /><button type=\"button\" id=\"btn_lchooseform\">...</button>");
    sb.append("</div>");
    sb.append("<div>");
    sb.append("<label>�б��ʽ</label><font class=\"tip\">*</font>��<input id=\"lfield\" type=\"text\" style=\"width:200px;\" disabled=\"disabled\" /><button type=\"button\" id=\"btn_lchoosefield\">...</button>");
    sb.append("</div>");
    sb.append("<div style=\"vertical-align:top;\">");
    sb.append("<label><span>&nbsp;</span>�Ƚ�����</label>��<textarea id=\"lwhere\" style=\"width:200px;height:60px;\" disabled=\"disabled\"></textarea><button type=\"button\" id=\"btn_lchoosewhere\">...</button>");
    sb.append("</div>");
    sb.append("</fieldset>");
    sb.append("</td>");
    sb.append("<td>");
    sb.append("<select id=\"operator\">");
    sb.append("<option value=\"0\">���Ƚ�����</option>");
    sb.append("<option value=\"1\">����</option>");
    sb.append("<option value=\"2\">����</option>");
    sb.append("<option value=\"3\">���ڵ���</option>");
    sb.append("<option value=\"4\">С��</option>");
    sb.append("<option value=\"5\">С�ڵ���</option>");
    sb.append("<option value=\"6\">������</option>");
    sb.append("</select>");
    sb.append("</td>");
    sb.append("<td>");
    sb.append("<fieldset class=\"rightmodel\">");
    sb.append("<legend>�ұ�</legend>");
    sb.append("<div>");
    sb.append("<label>ѡ�񱨱�</label><font class=\"tip\">*</font>��<input id=\"rform\" type=\"text\" style=\"width:200px;\" disabled=\"disabled\" /><button type=\"button\" id=\"btn_rchooseform\">...</button>");
    sb.append("</div>");
    sb.append("	<div>");
    sb.append("<label>�б��ʽ</label><font class=\"tip\">*</font>��<input id=\"rfield\" type=\"text\" style=\"width:200px;\" disabled=\"disabled\" /><button type=\"button\" id=\"btn_rchoosefield\">...</button>");
    sb.append("</div>");
    sb.append("<div style=\"vertical-align:top;\">");
    sb.append("<label><span>&nbsp;</span>�Ƚ�����</label>��<textarea id=\"rwhere\" style=\"width:200px;height:60px;\" disabled=\"disabled\"></textarea><button type=\"button\" id=\"btn_rchoosewhere\">...</button>");
    sb.append("</div>");
    sb.append("</fieldset>");
    sb.append("</td>");
    sb.append("</tr>");
    sb.append("</table>");
    sb.append("</div>");
    //sb.append("<br class=\"clear\" />");
    sb.append("<div class=\"float\" id='content2'>");
    sb.append("<label>����</label><font class=\"tip\">*</font>��<input type=\"text\" disabled=\"disabled\" id=\"grouping\" style=\"width:400px;\" value=\"\"/><button type=\"button\" id=\"btn_editgrouping\">...</button>");
    sb.append("</div>");
    //sb.append("<br class=\"clear\" />");
    sb.append("</fieldset>");
    sb.append("<br class=\"clear\" />");
    sb.append("<fieldset class=\"fieldset\" style=\"width:1000px;\">");
    sb.append("<legend>��˶�������趨</legend>");
    sb.append("<br class=\"clear\" />");
    sb.append("<div class=\"float\">");
    sb.append("<span><label>���˵��</label><font class=\"tip\">*</font>��</span>");
    sb.append("<textarea id=\"explain\" style=\"width:600px;height:60px;\"></textarea>");
    sb.append("</div>");
    sb.append("<br class=\"clear\" />");
    sb.append("<div class=\"float\">");
    sb.append("<label>������</label><font class=\"tip\">*</font>��");
    sb.append("<input type=\"text\" id=\"inaccuracy\" value=\"\"/>");
    sb.append("&nbsp<label>���˳��</label><font class=\"tip\">*</font>��");
    sb.append("<input type=\"text\" id=\"sortIndex\" value=\"0\"/>");
    sb.append("&nbsp<label>����λ��</label><font class=\"tip\">*</font>��");
    sb.append("<input type=\"text\" id=\"scale\" value=\"0\" />");
    sb.append("&nbsp<label>��������</label> <input type=\"radio\" name=\"alarm_name\" id=\"alarmlevels\" value=\"0\" /> <label for=\"alarmlevels\">��ʾ���</label><input type=\"radio\" name=\"alarm_name\" checked=\"checked\" value=\"1\" id=\"alarmlevelsenable\" /> <label for=\"alarmlevelsenable\">ǿ�����</label>");
    sb.append("</div>");
    sb.append("<br class=\"clear\" />");
    sb.append("<div id=\"enabled_div\">");
    sb.append("<input type=\"checkbox\" id=\"budgetenabled\" />");
    sb.append("<label for=\"budgetenabled\">��������</label>");
    sb.append("<input type=\"checkbox\" id=\"agencyenabled\" />");
    sb.append("<label for=\"agencyenabled\">��λ����</label>");
    sb.append("<input type=\"checkbox\" id=\"projectabled\" />");
    sb.append("<label for=\"projectabled\">��Ŀ����</label>");
    sb.append("<input type=\"checkbox\" id=\"central\"/>");
    sb.append("<label for=\"central\">����</label>");
    sb.append("<input type=\"checkbox\" id=\"province\"/>");
    sb.append("<label for=\"province\">ʡ��</label>");
    sb.append("<input type=\"checkbox\" id=\"city\" />");
    sb.append("<label for=\"city\">�м�</label>");
    sb.append("</div>");
    sb.append("</fieldset>");
    sb.append("<div style=\"float:right;\">");
    if (!ismodify) {
        sb.append("<button type=\"button\" class=\"button_style\" onclick=\"saveAuditDef()\">����</button>");
    }
    sb.append("<button type=\"button\" class=\"button_style\" onclick=\"backToList()\">����</button>");
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
    //�б��ʽ
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
    sb.append("<span style=\"color:#000\">Ŀǰ֧�ֵĹ�ʽ֧�ֵĺ���Ϊoracle�﷨����</span>");
    sb.append("</td>");
    sb.append("</tr>");
    sb.append("</table>");
    sb.append("</div>");
    sb.append("<div>");
    sb.append("<button type=\"button\" id=\"btn_saveselectfield\">ȷ��</button>");
    sb.append("<button type=\"button\" onclick=\"closeDialog('SelectField')\">ȡ��</button>");
    sb.append("</div>");
    sb.append("</div>");
    //�Ƚ�����
    sb.append("<div class=\"dialog_content\" id=\"Dlg_WhereCondition\" style=\"display:none\">");
    sb.append("<div>");
    sb.append("<button type=\"button\" id=\"btn_addcondition\">�� ��</button>");
    sb.append("<button type=\"button\" id=\"btn_removecondition\">ɾ ��</button>");
    sb.append("<button type=\"button\" id=\"btn_checkcondition\">У ��</button>");
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
    sb.append("<th>��</th>");
    sb.append("<th>�߼���</th>");
    sb.append("<th>�ֶ�����</th>");
    sb.append("<th>������</th>");
    sb.append("<th>ֵ</th>");
    sb.append("<th>��</th>");
    sb.append("<th>�߼���</th>");
    sb.append("</tr>");
    sb.append("</thead>");
    sb.append("<body>");
    sb.append("</body>");
    sb.append("</table>");
    sb.append("</div>");
    sb.append("<div id=\"lbracket_selector\" class=\"cell_condition_editor\">");
    sb.append("<ul>");
    sb.append("<li code=\" \"></li>");
    sb.append("<li code=\"(\">��</li>");
    sb.append("</ul>");
    sb.append("</div>");
    sb.append("<div id=\"logicalnot_selector\" class=\"cell_condition_editor\">");
    sb.append("<ul>");
    sb.append("<li code=\" \"></li>");
    sb.append("<li code=\"not\">��</li>");
    sb.append("</ul>");
    sb.append("</div>");
    sb.append("<div id=\"field_selector\" class=\"cell_condition_editor\">");
    sb.append("<ul>");
    sb.append("</ul>");
    sb.append("</div>");
    sb.append("<div id=\"operator_selector\" class=\"cell_condition_editor\">");
    sb.append("<ul>");
    sb.append("<li code=\"1\">����</li>");
    sb.append("<li code=\"2\">����</li>");
    sb.append("<li code=\"3\">С��</li>");
    sb.append("<li code=\"4\">���ڵ���</li>");
    sb.append("<li code=\"5\">С�ڵ���</li>");
    sb.append("<li code=\"6\">����</li>");
    sb.append("<li code=\"7\">����</li>");
    sb.append("<li code=\"8\">������</li>");
    sb.append("</ul>");
    sb.append("</div>");
    sb.append("<div id=\"value_selector\" class=\"cell_condition_editor\">");
    sb.append("<input type=\"text\" value=\"\" />");
    sb.append("</div>");
    sb.append("<div id=\"rbracket_selector\" class=\"cell_condition_editor\">");
    sb.append("<ul>");
    sb.append("<li code=\" \"></li>");
    sb.append(" <li code=\")\">��</li>");
    sb.append("</ul>");
    sb.append("  </div>");
    sb.append(" <div id=\"logical_selector\" class=\"cell_condition_editor\">");
    sb.append(" <ul>");
    sb.append(" <li code=\" \"></li>");
    sb.append("<li code=\"and\">����</li>");
    sb.append(" <li code=\"or\">����</li>");
    sb.append("</ul>");
    sb.append("</div>");
    sb.append("<div>");
    sb.append("<button type=\"button\" id=\"btn_savewhere\">ȷ��</button>");
    sb.append("<button type=\"button\" onclick=\"closeDialog('WhereCondition')\">ȡ��</button>");
    sb.append("</div>");
    sb.append("</div>");
    
    //����
    sb.append("<div class=\"dialog_content\" id=\"Dlg_Grouping\" style=\"display:none\">");
    sb.append("<div>");
    sb.append("<button type=\"button\" id=\"btn_addgrouping\">���</button>");
    sb.append("<button type=\"button\" id=\"btn_removegrouping\">ɾ��</button>");
    sb.append("</div>");
    sb.append("<div style=\"height:200px;overflow:auto;\">");
    sb.append("<table class=\"tableview\" id=\"grouping_table\">");
    sb.append("<colgroup width=\"150\"></colgroup>");
    sb.append("<colgroup width=\"150\"></colgroup>");
    sb.append("<thead>");
    sb.append("<tr>");
    sb.append("<th>�����<br></th>");
    sb.append("<th>�ҷ���<br></th>");
    sb.append("</tr>");
    sb.append("</thead>");
    sb.append("<body>");
    sb.append("</body>");
    sb.append("</table>");
    sb.append("</div>");
    sb.append(" <div id=\"lgroup_fields\" class=\"cell_group_editor\"><ul></ul></div>");
    sb.append("<div id=\"rgroup_fields\" class=\"cell_group_editor\"><ul></ul></div>");
    sb.append("<div>");
    sb.append("<button type=\"button\" id=\"btn_savegrouping\">ȷ��</button>");
    sb.append("<button type=\"button\" onclick=\"closeDialog('Grouping')\">ȡ��</button>");
    sb.append(" </div>");
	
	sb.append("</div>");
    
	//�Զ������
	sb.append("<div id=\"form_content1\" style=\"display:none;width:660px;height:400px;\" >");
	sb.append("<div>");
    sb.append("<textarea id = 'filed2' style=\"width:99%;height:320px;\" ></textarea>");
    sb.append("</div>");
    sb.append("<div style=\"margin-left:40%;\">");
    sb.append("<input type=\"button\" style = \"height:20px;\" value=\"У ��\" onclick=\"vaildAudit()\"></input>");
    sb.append("<input type=\"button\" style = \"height:20px;\" value=\"�� ��\" onclick=\"saveForm()\"></input>");
    sb.append("<input type=\"button\" style = \"height:20px;\" value=\"ȡ ��\" onclick=\"form_content1_wind.close();\"></input>");
    sb.append("</div>");
    sb.append("</div>");
	
	
	//Ŀ��������
	sb.append("<div id=\"auditdef_div_tagset\" style=\"display:none;width:550px;height:300px;\" >");
	sb.append("<table style=\"width:98%;height:98%;\">");
	sb.append("<tr>");
	sb.append("<td style=\"width:30%;\">");
	sb.append("<div id=\"setTable_div\" style=\"background:#fff;border:1px solid #ccc;padding:0px; overflow:auto;height:270px;\"></div>");
	sb.append("</td>");
	sb.append("<td style=\"width:70%;\">");
	sb.append("<div>");
	sb.append("<div id=\"query_t\" style=\"height:25px;\">");
	sb.append("<span><span title=\"���\" class=\"budget_add\" onclick=\"auditSetTable.insertRow()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0);\">���</a></span></span>");	
	sb.append("<span><span title=\"ɾ��\" class=\"budget_del\" onclick=\"auditSetTable.deleteRow()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0);\">ɾ��</a></span></span>");
	sb.append("<span><span title=\"����\" class=\"budget_save\" onclick=\"auditSetTable.saveRow()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0);\">����</a></span></span>");
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

////���
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

var b = false;//����ӵģ�������
function saveAuditDef(){
    if ($("#auditdef_name").val() == "") {
        alert("������������ƣ�");
        return;
    }
	
	var input_table = document.getElementById("auditdef_tagtable");
	if(!input_table.code){
		alert("����ѡ��ʹ����˵ı�");
		return;
	}
	
    if (!$("#audit")[0].checked) {
        if (!auditDef.lform) {
            alert("��ѡ�����!");
            return;
        }
        if (!auditDef.rform) {
            alert("��ѡ���ұ�!");
            return;
        }
        if (!auditDef.lfield) {
            alert("��ѡ������!");
            return;
        }
        if (!auditDef.rfield) {
            alert("��ѡ������!");
            return;
        }
        
        if (!auditDef.grouping) {
            alert("��ѡ���������!");
            return;
        }
        if (auditDef.operator == 0) {
            alert("��ѡ����Ƚ�������");
            return;
        }
    }
    else {
        if (!auditDef.customsql) {
            alert("����д�Զ������!");
            return;
        }
    }
	
	if(!auditDef.audittype){
		alert("��ѡ��ҵ������!");
		return;
	}
	
    if (!isNumber($("#inaccuracy").val())) {
        alert("�������Ϊ���ұ���Ϊ���֣�����!");
        return;
    }
    
    if (isEmpty($("#sortIndex").val()) || !isInteger($("#sortIndex").val())) {
        alert("��ʾ˳����Ϊ���ұ���Ϊ����������!");
        return;
    }
    
    if (parseInt($("#sortIndex").val(), 10) < 0) {
        alert("��ʾ˳�������븺�������飡");
        return;
    }
    
    if (!isNumber($("#scale").val())) {
        alert("����λ������Ϊ���ұ���Ϊ���֣�����!");
        return;
    }
    
    if (parseInt($("#scale").val(), 10) > 5 || parseInt($("#scale").val(), 10) < 0) {
        alert("����λ��Ӧ��0-5֮�䣬����!");
        return;
    }
    
    if ($("#explain").val() == "") {
        alert("���˵������Ϊ�գ����飡");
        return;
    }
    
    var params = auditDef;
    params["explain"] = $("#explain").val();
    params["name"] = $("#auditdef_name").val();
    params["inaccuracy"] = $("#inaccuracy").val();
    params["sortIndex"] = $("#sortIndex").val();
    params["levelno"] = clevelno;
    params["product"] = product;
    //����λ��
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
            b = true;//����ӵ�	     
            alert("��˶��屣��ɹ���");
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
    //      b=true;//����ӵ�
    //      alert("��˶��屣��ɹ���");
    //     history.go(-1);
    //    }
    //  });
};

function backToList(){
    if (b == false) {//����ӵ�
        if (confirm("����δ���棬�Ƿ񱣴�����?")) {
            saveAuditDef();
        }
        else {//����ӵ�
            //		history.go(-1);//����ӵ�
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
            alert("SQLУ��ɹ���");
        }
    });
    
}

//��brתΪ��
function brToN(str){
	return str.replace(/<br>/g," ").replace(/\n/g," ");
}
