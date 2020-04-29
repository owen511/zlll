var qtree = null;
var datatable = null;
var modelId, bdgAgency;
var selNodeFlag = false;
var tablecode = "";
var product;
var wind = null;// ��������
var agencyAddName = null;
var tableData, productData;
var mainmenu = null;
var submenu = null;
var elementDataMap = {}, tableheight = 0;
var expTable;
var elementCode = null;
var clevelno;
var producttype;
var productTypeMark;

var tablesdefine_list = function(config, service){

    agencyAddName = config.nameAgency;
    mainmenu = config.mainmenu;
    submenu = config.menuId;
    tablecode = config.tablecode;
    bdgAgency = config.bdgAgency;
    product = config.product;
    tableData = config.tablesList;
    productData = config.productList;
    clevelno = config.levelno;
    productTypeMark = config.productTypeMark;
    //agencyAddName=config.bdgAgency;
    // ��ʼ������
    initLayout(config)
    
    $("#producttype").bind("change", function(){
        var params = {};
        params["product"] = $(this).val();
        producttype = $(this).val();
        product = $(this).val();
        Ext.lt.RCP.server("datacommon_tablesdefine_service", "getTableData", params, function(data){
            if (data.error) {
                alert(data.error);
            }
            else {
                var tablesList = data.tablesList;
                var sBuffer = new StringBuffer();
                var tagBuffer = new StringBuffer();
                var tableBuffer = new StringBuffer();
                $("#sourcetd").empty();
                if (tablesList.length > 0) {
                    for (var i = 0; i < tablesList.length; i++) {
                        var row = tablesList[i];
                        tableBuffer.append("<option value = \"" + row.TABLECODE + "\">" + row.NAME + "</option>");
                    }
                }
                sBuffer.append("<select id=\"sourcetable\" size = \"1\" style= \"display:block;width:160px;\">");
                sBuffer.append("<option value = \"\"></option>");
                sBuffer.append(tableBuffer.toString());
                sBuffer.append("</select>");
                $("#sourcetd").append(sBuffer.toString());
                
                $("#tagtd").empty();
                tagBuffer.append("<select id=\"tagtable\" size = \"1\" style= \"display:block;width:160px;\">");
                tagBuffer.append("<option value = \"\"></option>");
                tagBuffer.append(tableBuffer.toString());
                tagBuffer.append("</select>");
                $("#tagtd").append(tagBuffer.toString());
                var rs = datatable.getRecordSet();
                rs.clear();
                datatable.getRecordset().addData(data.tableDefineList, -1);
            }
        });
    });
    
    datatable = new Ext.lt.datatable(config.tableDefineList);
    var first = config.headList;
    first.insert(datatable.columns.seq, 0)
    first.insert(datatable.columns.radio);
    
    
    datatable.setCols(first);
    
    
    datatable.setClassName("dttheme_budget");
    //datatable.setSelectDown(false);
    // ������һ��
    // datatable.clockColumnSize(1);
    
    
    datatable.mousedrag(false);
    datatable.setAllowClock(true);
    datatable.headsort(false);
    datatable.setAllowcustom(false);
    datatable.headsort(true);
    datatable.setLayout();
    datatable.draw(edit_table_div);
    if (tablecode) {
        var leftdata = datatable.getRecordSet().query({
            ITEMID: tablecode
        });
        leftdata[0]["check"] = 1;
    }
	
	//��Դ�������¼�
	$("#sourceTableType").bind("change",function(e){
		var sel = $(this).val();
		
		if(sel == "1"){
			
			$("#sourceTableTr").show();	
			$("#sourceSqlTr").hide();	
		}
		if(sel == "2"){
			$("#sourceSqlTr").show();
			$("#sourceTableTr").hide();
		}
	})
	
	   
}
//------onload end



/**
 * ��ʼ�����沼��
 */
function initLayout(config){
    var sb = new StringBuffer();
    var tableSbuffer = new StringBuffer();
    var tableLen = tableData.length;
    var productBuffer = new StringBuffer();
    var rowData;
    for (var j = 0; j < productData.length; j++) {
        rowData = productData[j];
        if (j == 0) {
            producttype = rowData.PRODUCTS;
        }
        productBuffer.append("<option value = \"" + rowData.PRODUCTS + "\">" + rowData.NAME + "</option>");
    }
    for (var i = 0; i < tableLen; i++) {
        row = tableData[i];
        tableSbuffer.append("<option value = \"" + row.TABLECODE + "\">" + row.NAME + "</option>");
    }
    sb.append("<div id=\"query_t\">");
    sb.append("<span><span title=\"���\" class=\"add_btn\" onclick=\"doadd()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0)\">���</a></span></span>");
    sb.append("<span><span title=\"�޸�\" class=\"mod_btn\" onclick=\"domodify()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0)\">�޸�</a></span></span>");
    sb.append("<span><span title=\"ɾ��\" class=\"del_btn\" onclick=\"deleteData()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0)\">ɾ��</a></span></span>");
    sb.append("<span><span title=\"��Ӧ��ϵ����\" class=\"budget_setting\" onclick=\"columnSet()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0)\">��Ӧ��ϵ����</a></span></span>");
    //sb.append("<span><span title=\"������ʽ����\" class=\"budget_setting\" onclick=\"pubexpSet()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0)\">������ʽ����</a></span></span>	");
    sb.append("<span><span title=\"����ȡ������\" class=\"budget_setting\" onclick=\"conditionSet()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0)\">����ȡ������</a></span></span>");
    sb.append("</div>");
    sb.append("<form name=\"mainListForm\" id=\"mainListForm\" action=\"#\" method=\"post\">");
    //	sb.append("<div>");	
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
    //	sb.append("</div>");
    sb.append("<div>");
    sb.append("<div id=\"edit_table_div\" layout=\"{w:{fit:true},h:{fit:-60}}\"></div>	");
    sb.append("</div>");
    sb.append("</form>");
    
    sb.append("<div id=\"form_content\" style=\"display:none;\" >");
    sb.append("<div style=\"width:460px;height:380px;\">");
    sb.append("<table id=\"form_table\" class=\"tableview\">");
    sb.append("<colgroup align=\"left\" width=\"30%\" ></colgroup>");
    sb.append("<colgroup align=\"left\" width=\"70%\"></colgroup>");
    
    sb.append("<tbody>");
    sb.append("<tr>");
    sb.append("<td>����<font color=\"red\">*</font>:</td>");
    sb.append("<td><input type=\"text\" id = \"name\" style= \"width:160px;\"/><input type=\"hidden\" id = \"itemid\"/></td>");
    sb.append("</tr>");
    
	sb.append("<tr>");
    sb.append("<td>��Դ������<font color=\"red\">*</font>:</td>");
    sb.append("<td>");
    sb.append("<select id=\"sourceTableType\" style=\"width:160px;\">");
    sb.append("<option value = \"1\">ʵ��������ͼ</option>");
    sb.append("<option value = \"2\">SQL���</option>");
    sb.append("</select>");
    sb.append("</td>");
    sb.append("</tr>");
    
    sb.append("<tr id=\"sourceTableTr\" >");
    sb.append("<td>��Դ��<font color=\"red\">*</font>:</td>");
    sb.append("<td  id = \"sourcetd\">");
    sb.append("<select id=\"sourcetable\" size = \"1\" style= \"display:block;width:160px;\">");
    sb.append("<option value = \"\"></option>");
    sb.append(tableSbuffer.toString());
    sb.append("</select>");
    sb.append("</td>");
    sb.append("</tr>");
	
	sb.append("<tr id=\"sourceSqlTr\" style=\"display:none;\">");
    sb.append("<td>��ԴSQL<font color=\"red\">*</font>:</td>");
    sb.append("<td><textarea id = \"sourceSql\" rows = \"10\" cols = \"40\"></textarea></td>");
    sb.append("</tr>");
	
    sb.append("<tr>");
    sb.append("<td>Ŀ���<font color=\"red\">*</font>:</td>");
    sb.append("<td id = \"tagtd\">");
    sb.append("<select id=\"tagtable\" size = \"1\" style= \"display:block;width:160px;\">");
    sb.append("<option value = \"\"></option>");
    sb.append(tableSbuffer.toString());
    sb.append("</select>");
    sb.append("</td>");
    sb.append("</tr>");
    sb.append("<tr style=\"display:none;\" >");
    sb.append("<td>ת����־:</td>");
    sb.append("<td>");
    sb.append("<select id=\"ischange\" size = \"1\" style= \"display:block;width:160px;\">");
    sb.append("	<option value = \"1\">��</option>");
    sb.append("<option value = \"0\">��</option>");
    
    sb.append("	</select>");
    sb.append("</td>");
    sb.append("</tr>");
    sb.append("<tr>");
    sb.append("<td>�Ƿ�����:</td>");
    sb.append("<td>");
    sb.append("<select id=\"isenable\" size = \"1\" style= \"display:block;width:160px;\">");
    sb.append("	<option value = \"1\">��</option>");
    sb.append("<option value = \"0\">��</option>");
    sb.append("</select>");
    sb.append("</td>");
    sb.append("</tr>");
    
    sb.append("<tr style=\"display:none;\" >");
    sb.append("<td>��������:</td>");
    sb.append("<td>");
    sb.append("<select id=\"levelno\" size = \"1\" style= \"display:block;width:160px;\" disabled = \"true\">");
    sb.append("	<option value = \"\"></option>");
    sb.append("	<option value = \"1\">����</option>");
    sb.append("<option value = \"2\">ʡ</option>");
    sb.append("<option value = \"3\">��</option>");
    sb.append("<option value = \"4\">��</option>");
    sb.append("<option value = \"5\">����</option>");
    sb.append("</select>");
    sb.append("</td>");
    sb.append("</tr>");
    sb.append("	<tr>");
    sb.append("<td>��ע��</td>");
    sb.append("<td><textarea id = \"remark\" rows = \"5\" cols = \"40\"></textarea></td>");
    sb.append("</tr>");
    sb.append("	</tbody>");
    sb.append("</table>");
    sb.append("</div>");
    sb.append("<div style=\"margin-left:40%;\">");
    sb.append("<input type=\"button\" id = \"saveTable\" style = \"height:20px;\" value=\"�� ��\" onclick=\"saveTable()\"></input>");
    sb.append("<input type=\"button\" style = \"height:20px;\" value=\"ȡ ��\" onclick=\"form_content_wind.close();\"></input>");
    sb.append("</div>");
    
    
    sb.append("<div id=\"form_content1\" style=\"display:none;\" >");
    
    sb.append("<div><label for=\"exp_context\" style=\"margin-left:10px;font-weight:700;\">��ʽ���ݣ�</label></div>");
    
    sb.append("<div style=\"width:560px;height:380px;\">");
    sb.append("<table id=\"form_table\" class=\"tableview\" width=\"100%\" height=\"90%\" >");
    //sb.append("<colgroup colName=\"name\" colType=\"str\" style=\"text-align:center;\"></colgroup>");
    //sb.append("<colgroup colName=\"value\" colType=\"str\" ></colgroup>");
    sb.append("<tbody>");
    sb.append("<tr>");
    sb.append("<td valign=\"top\" width= '45%'>");
    sb.append("<div id=\"refContainer\" style=\"background:#fff;border:0px solid #ccc;overflow:auto;height:345px;width:98%\"></div>");
    sb.append("</td>");
    //sb.append("<label for=\"exp_context\">��ʽ���ݣ�</label>");
    sb.append("<td valign=\"top\" width = '50%'>");
    sb.append("<textarea id = 'filed2' rows = '23' cols = '38'></textarea>");
    sb.append("</td>");
    sb.append("</tr>");
    sb.append("</tbody>");
    sb.append("</table>");
    sb.append("</div>");
    sb.append("<div style=\"margin-left:40%;\">");
    sb.append("<input type=\"button\" style = \"height:20px;\" value=\"�� ��\" onclick=\"savePubExp()\"></input>");
    sb.append("<input type=\"button\" style = \"height:20px;\" value=\"ȡ ��\" onclick=\"form_content1_wind.hidden();\"></input>");
    sb.append("</div>");
    sb.append("</div>");
    
    sb.append("<div id=\"form_content2\" style=\"display:none;\" >");
    sb.append("<div style=\"width:560px;height:380px;\">");
    sb.append("<table id=\"form_table\" class=\"tableview\" width=\"100%\" height=\"100%\">");
    //sb.append("<colgroup colName=\"name\" colType=\"str\" style=\"text-align:center;\"></colgroup>");
    //sb.append("<colgroup colName=\"value\" colType=\"str\" ></colgroup>");
    sb.append("<tbody>");
    sb.append("<tr>");
    sb.append("<td valign=\"top\" width = '50%'>");
    sb.append("<div id=\"contionContainer\" style=\"background:#fff;border:0px solid #ccc;padding:0px; overflow:auto;height:375px;\"></div>");
    sb.append("</td>");
    sb.append("<td valign=\"top\" width = '50%'>	");
    sb.append("<textarea id = 'filed3' rows = '25' cols = '35'></textarea>");
    sb.append("</td>");
    sb.append("</tr>");
    sb.append("</tbody>");
    sb.append("</table>");
    
    sb.append("</div>");
    sb.append("<div style=\"margin-left:40%;\">");
    sb.append("<input type=\"button\" style = \"height:20px;\" value=\"У ��\" onclick=\"validForm()\"></input>");
    sb.append("<input type=\"button\" id = \"conditionBtn\" style = \"height:20px;\" value=\"�� ��\" onclick=\"saveCondition()\"></input>");
    sb.append("<input type=\"button\" style = \"height:20px;\" value=\"ȡ ��\" onclick=\"form_content2_wind.hidden();\"></input>");
    sb.append("</div>");
    sb.append("</div>");
    
    sb.append("</div>");
    
    //	sb.append("");
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    document.getElementById("template_main").innerHTML = sb.toString();
    
    
    
    
    $("#producttype").val(product);
    
    if (productTypeMark) {
    
        $("#producttype").attr("disabled", true);
    }
    
    
}


//���
function doadd(){
    producttype = $("#producttype").val();
    if (producttype == undefined || producttype == null) {
        alert("���ݲɼ�û�ж�Ӧ�Ĳ�Ʒ��,��ά����Ʒ��!");
    }
    $("#itemid").val("");
    $("#name").val("");
    $("#sourcetable").val("");
    $("#sourcetable").attr("disabled", false);
    $("#tagtable").val("");
    $("#tagtable").attr("disabled", false);
    $("#ischange").val("1");
    $("#isenable").val("1");
    if (producttype == "TPMS") {
        $("#levelno").val(clevelno);
    }
    $("#remark").val("");
	$("#sourceSql").val("");
	
	$("#sourceTableType").attr("disabled", false);
	
    $("#form_content").show();
    
    form_content_wind = new Ext.lt.window({
        title: '����',
        fitmode: 'body',
        className: 'wind7',
        mark: true,
        autoshow: false,
        pop: true,
        w: 562,
        h: 472
    });
    
    form_content_wind.draw(form_content);
    
    form_content_wind.show();
    
    $("#form_content select").show();
}

function saveTable(){
    if ($("#name").val() == null || $("#name").val() == "") {
        alert("����������!");
        return;
    }
    if ($("#name").val().length > 16) {
        alert("�����Ʋ��ܳ���16�����飡");
        return;
    }
	
	if($("#remark").val().length > 500){
		alert("��ע���ȳ���500�����飡");
		return;
	}
    
	var sourceType = $("#sourceTableType").val(),sourceTag = null;
	if(sourceType == "1"){
		
		sourceTag = $("#sourcetable");
	}
	else if(sourceType == "2"){
		
		sourceTag = $("#sourceSql");
	}
	
	if(!sourceTag.val()){
		alert("��������Դ�����ԴSQL��");
		return;
	}
	
    if (!$("#tagtable").val()) {
        alert("��ѡ��Ŀ���!");
        return;
    }
	
	var params = {};
    params["form.itemid"] = $("#itemid").val();
    params["form.name"] = $("#name").val();
    params["form.sourcetable"] = $("#sourcetable").val();
    params["form.sourcesql"] = nToBr($("#sourceSql").val());
    params["form.tagtable"] = $("#tagtable").val();
    params["form.ischange"] = $("#ischange").val();
    params["form.isenable"] = $("#isenable").val();
    params["form.remark"] = brToN2($("#remark").val());
    params["form.levelno"] = $("#levelno").val();
    params["form.product"] = $("#producttype").val();
    params["form.sourcetype"] = sourceType;
	
    showdiv();
    Ext.lt.RCP.server("datacommon_tablesdefine_service", "saveTablesDefine", params, function(data){
        if (data.error) {
            closediv();
            alert(data.error);
        }
        else {
            form_content_wind.close();
        
            var rs = datatable.getRecordSet();
            rs.clear();
            datatable.getRecordset().addData(data.tableDefineList, -1);
            
            closediv();
			alert("����ɹ�!");
        }
    });
    
    
}

//�����з�תΪbr
function nToBr(str){
	return str && str.replace(/\n/g,"<br>");
}

//��brתΪ���з�
function brToN(str){
	return str && str.replace(/<br>/g,"\n");
}

function domodify(){
    producttype = $("#producttype").val();
    if (producttype == undefined || producttype == null) {
        alert("���ݲɼ�û�ж�Ӧ�Ĳ�Ʒ��,��ά����Ʒ��!");
    }
    
    
    var datas = datatable.getRecordSet().query({
        check: 1
    });
    if (datas.length == 0) {
        alert("��ѡ��һ������ϵ���壡");
        return;
    }
    else {
        if (producttype == "TPMS" && datas[0].LEVELNO != clevelno) {
            $("#saveTable")[0].disabled = true;
        }
    }
    $("#itemid").val(datas[0].ITEMID);
    $("#name").val(datas[0].NAME);
    $("#sourcetable").val(datas[0].SOURCETABLE);
    $("#sourcetable").attr("disabled", true);
    $("#tagtable").val(datas[0].TAGTABLE);
    $("#tagtable").attr("disabled", true);
    $("#ischange").val(datas[0].ISCHANGE);
    $("#isenable").val(datas[0].ISENABLE);
    $("#remark").val(brToN2(datas[0].REMARK));
    $("#form_content").show();
	$("#sourceSql").val(brToN(datas[0].SOURCESQL));
	
	//��Դ������
	$("#sourceTableType").val(datas[0].SOURCETYPE);
	$("#sourceTableType").change();
	$("#sourceTableType").attr("disabled", true);
    
    form_content_wind = new Ext.lt.window({
        title: '�޸�',
        fitmode: 'body',
        className: 'wind7',
        mark: true,
        autoshow: false,
        pop: true,
        w: 562,
        h: 472
    });
    
    form_content_wind.draw(form_content);
    
    form_content_wind.show();
    
    $("#form_content select").show();
}

function columnSet(){
    var data = datatable.getRecordSet().query({
        check: 1
    });
    if (!data || data.length != 1) {
        alert("��ѡ����Ҫ�����е�����!");
        return;
    }
	
	if(data[0].SOURCETYPE == "2"){
		alert("��Դ������SQL�������ö�Ӧ��ϵ��");
		return;
	}
	
    var params = {};
    params["tableCode"] = data[0].ITEMID;
    params["sourceTable"] = data[0].SOURCETABLE;
    //		params["product"] = data[0].PRODUCT;
    params["product"] = $("#producttype").val();
    jumpTo("/datacommon/tablescolumn/index.page?mainmenu=" + mainmenu + "&submenu=" + submenu + "", "post", params);
}

function pubexpSet(){
    $("#form_content1").show();
    form_content1_wind = new Ext.lt.window({
        title: '������ʽ����',
        fitmode: 'body',
        className: 'wind7',
        mark: true,
        autoshow: false,
        pop: true,
        w: 610,
        h: 472
    });
    form_content1_wind.draw(form_content1);
    form_content1_wind.show();
    var params = {};
    params["product"] = product;
    //params["defineid"]=datas[0].DEFINEID;
    Ext.lt.RCP.server("datacommon_tablesdefine_service", "getPubExpList", params, function(data){
        if (data.error) {
            alert(data.error);
        }
        else {
            expTable = new Ext.lt.datatable35(data.pubRefList);
            
            expTable.setCols([datatable.columns.radio, {
                name: 'ELEMENTCODE',
                alias: '����',
                datatype: 'S',
                width: '120'
            }, {
                name: 'NAME',
                alias: '����',
                datatype: 'S',
                width: '120'
            }]);
            expTable.onEvent('onclick', function(td, el, l, c, d){
                var expStr;
                expStr = document.getElementById("filed2").value;
                var params = {};
                params["elementcode"] = elementCode;
                params["expStr"] = expStr;
                params["product"] = product;
                params["newelementcode"] = d.ELEMENTCODE;
                //				if(elementCode!=null&&elementCode!=d.ELEMENTCODE){
                //					if(confirm("�Ƿ񱣴浱ǰ��ʽ?")){
                //			
                //					
                //					Ext.lt.RCP.server("datacommon_tablesdefine_service", "savePubExp",params,function(data){
                //						if(data.error){
                //							alert(data.error);
                //						}
                //						else{
                //											
                //							document.getElementById("filed2").value = data.expString;
                //						}
                //						
                //					
                //				});		
                //				}
                //				
                //				}
                //				else{
                Ext.lt.RCP.server("datacommon_tablesdefine_service", "getPubExp", params, function(data){
                    if (data.error) {
                        alert(data.error);
                    }
                    else {
                    
                        document.getElementById("filed2").value = data.expString;
                    }
                    
                    
                });
                //				}
                //				elementCode = d.ELEMENTCODE;
            });
            
            expTable.setEditSelectCheckbox(false);
            expTable.setMouselight('#597EAA');
            expTable.mousedrag(false);
            expTable.setClassName('dttheme_budget');
            
            //expTable.setLayout();
            expTable.draw(refContainer);
            
            
        }
    });
    
    
    
}

/**
 * ȡ������
 */
function conditionSet(){
    var datas = datatable.getRecordSet().query({
        check: 1
    });
    if (!datas || datas.length != 1) {
        alert("��ѡ����Ҫ����ȡ������������!");
        return;
    }
	
	if(datas[0].SOURCETYPE == "2"){
		alert("��Դ������SQL��������ȡ��������");
		return;
	}
	
    $("#form_content2").show();
    form_content2_wind = new Ext.lt.window({
        title: '����ȡ������',
        fitmode: 'body',
        className: 'wind7',
        mark: true,
        autoshow: false,
        pop: true,
        w: 610,
        h: 472
    });
    form_content2_wind.draw(form_content2);
    form_content2_wind.show();
    if (producttype == "TPMS" && datas[0].LEVELNO != clevelno) {
        $("#conditionBtn")[0].disabled = true;
        $("#filed3")[0].disabled = true;
        
    }
    else {
        $("#conditionBtn")[0].disabled = false;
        $("#filed3")[0].disabled = false;
    }
    if (datas[0].CONDITION == undefined) {
        document.getElementById("filed3").value = "";
    }
    else {
        document.getElementById("filed3").value = datas[0].CONDITION;
    }
    
    var params = {};
    params["sourceTable"] = datas[0].SOURCETABLE;
    params["defineid"] = datas[0].DEFINEID;
    Ext.lt.RCP.server("datacommon_tablescolumn_service", "getSourceColumnList", params, function(data){
        if (data.error) {
            alert(data.error);
        }
        else {
            var colTitle = data.columnTitleList;
            var sourceData = data.rs;
            var conTable = new Ext.lt.datatable35(sourceData);
            colTitle.insert(datatable.columns.seq, 0);
            conTable.setCols(colTitle);
            conTable.setEditSelectCheckbox(false);
            conTable.setMouselight('#597EAA');
            conTable.mousedrag(false);
            conTable.onEvent('ondblclick', function(td, el, l, c, d){
                if ($("#conditionBtn")[0].disabled == false) {
                    var myValue = "{" + d.NAME + "}";
                    var colCode = d.COLUMNCODE;
                    
                    
                    var myField = document.getElementById("filed3");
                    if (document.selection) {
                        myField.focus();
                        sel = document.selection.createRange();
                        sel.text = myValue;
                        sel.select();
                    }
                    //MOZILLA/NETSCAPE support 
                    else 
                        if (myField.selectionStart || myField.selectionStart == '0') {
                            var startPos = myField.selectionStart;
                            var endPos = myField.selectionEnd;
                            
                            var restoreTop = myField.scrollTop;
                            myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);
                            if (restoreTop > 0) {
                                myField.scrollTop = restoreTop;
                            }
                            myField.focus();
                            myField.selectionStart = startPos + myValue.length;
                            myField.selectionEnd = startPos + myValue.length;
                        }
                        else {
                            myField.value += myValue;
                            myField.focus();
                        }
                }
                
            });
            conTable.setClassName('dttheme_budget');
            
            conTable.draw(contionContainer);
        }
    });
}

function deleteData(){
    producttype = $("#producttype").val();
    var datas = datatable.getRecordSet().query({
        check: 1
    });
    if (!datas || datas.length == 0) {
        alert("��ѡ����Ҫɾ��������!");
        return;
    }
    
    
    if (producttype == "TPMS" && datas[0].LEVELNO != clevelno) {
        alert("�ö�Ӧ��ϵ�Ĳ������κͱ����������β�һ��,����!");
        return;
    }
    
    if (window.confirm("���Ƿ�Ҫɾ��ѡ�м�¼��")) {
        var params = {};
        params["itemid"] = datas[0].ITEMID;
        Ext.lt.RCP.server("datacommon_tablesdefine_service", "delTablesDefine", params, function(data){
            if (data.error) {
                alert(data.error);
            }
            else {
                datatable.getRecordSet().remove(datas);
                //datatable.reflash();
                alert("ɾ���ɹ�!");
            }
        });
        
    }
}

/**
 * У��ȡ������
 */
function validForm(){
    var expStr;
    expStr = document.getElementById("filed3").value;
    var params = {};
    var datas = datatable.getRecordSet().query({
        check: 1
    });
    params["sourceTable"] = datas[0].SOURCETABLE;
    params["expStr"] = expStr;
    params["itemid"] = datas[0].itemid;
    
    Ext.lt.RCP.server("datacommon_tablesdefine_service", "validCondition", params, function(data){
        if (data.error) {
            alert(data.error);
        }
        else {
        
            alert("ȡ������У��ɹ�!");
        }
        
        
    });
    
}

/**
 * ����ȡ������
 */
function saveCondition(){
    var expStr;
    expStr = document.getElementById("filed3").value;
    var params = {};
    var datas = datatable.getRecordSet().query({
        check: 1
    });
    params["sourceTable"] = datas[0].SOURCETABLE;
    params["expStr"] = expStr;
    params["itemid"] = datas[0].ITEMID;
    params["product"] = $("#producttype").val();
    
    Ext.lt.RCP.server("datacommon_tablesdefine_service", "saveCondition", params, function(data){
        if (data.error) {
            alert(data.error);
        }
        else {
			form_content2_wind.close();
			
            var rs = datatable.getRecordSet();
            rs.clear();
            rs.addData(data.tableDefineList, -1);
       
            alert("����ɹ�!");
        }
        
        
    });
}

function savePubExp(){
    var expStr;
    expStr = document.getElementById("filed2").value;
    var params = {};
    var datas = expTable.getRecordSet().query({
        check: 1
    });
    params["elementcode"] = datas[0].ELEMENTCODE;
    params["expStr"] = expStr;
    params["product"] = product;
    
    Ext.lt.RCP.server("datacommon_tablesdefine_service", "savePubExp", params, function(data){
        if (data.error) {
            alert(data.error);
        }
        else {
        
            alert("����ɹ�!");
        }
        
        
    });
}

//��brתΪ��
function brToN2(str){
	return str && str.replace(/<br>/g," ").replace(/\n/g," ").replace(/\r/g," ");
}