

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
var elementDataMap = {}, tableheight = 0;
var productData = null;
var tableData = null;
var billid = null;
var productTypeMark = false;

var auditdef_list = function(config, service){

    agencyAddName = config.nameAgency;
    mainmenu = config.mainmenu;
    submenu = config.menuId;
    tablecode = config.tablecode;
    bdgAgency = config.bdgAgency;
    product = config.product;
    productData = config.productList;
    tableData = config.auditList;
    clevelno = config.levelno;
    billid = config.billid;
    productTypeMark = config.productTypeMark;
    
    //agencyAddName=config.bdgAgency;
    // 初始化布局
    initLayout(config)
    
    $("#producttype").bind("change", function(){
        var params = {};
        params["product"] = $(this).val();
        producttype = $(this).val();
        Ext.lt.RCP.server("datacommon_auditdef_service", "getTableData", params, function(data){
            if (data.error) {
                alert(data.error);
            }
            else {
            
                var rs = datatable.getRecordSet();
                rs.clear();
                datatable.getRecordset().addData(data.auditDefineList, -1);
                datatable.reflash();
            }
            
            
        });
        
    });
    
    
    datatable = new Ext.lt.datatable(config.auditList);
    var first = config.headList;
    first.insert(datatable.columns.seq, 0)
    first.insert(datatable.columns.radio);
    
    
    datatable.setCols(first);
    
    
    datatable.setClassName("dttheme_budget");
    //datatable.setSelectDown(false);
    // 锁定第一列
    // datatable.clockColumnSize(1);
    
    
    datatable.mousedrag(false);
    datatable.setAllowClock(true);
    datatable.headsort(false);
    datatable.setAllowcustom(false);
    datatable.setLayout();
    datatable.draw(edit_table_div);
    
    if (billid) {
        var leftdata = datatable.getRecordSet().query({
            BILLID: billid
        });
        leftdata[0] && (leftdata[0]["check"] = 1);
    }
    
    
    //置灰
    if (productTypeMark) {
    
        $("#producttype").attr("disabled", true);
    }
}
//------onload end



/**
 * 初始化界面布局
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
    sb.append("<table>");
    sb.append("<tr><td>");
    sb.append("<span><span title=\"新增\" class=\"budget_add\" onclick=\"doadd()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0)\">添加</a></span></span>");
    sb.append("<span><span title=\"修改\" class=\"budget_mod\" onclick=\"domodify()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0)\">修改</a></span></span>");
    sb.append("<span><span title=\"删除\" class=\"budget_del\" onclick=\"deleteData()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0)\">删除</a></span></span>");
    sb.append("<span><span title=\"查询\" class=\"budget_search\" onclick=\"searchData()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0)\">查询</a></span></span>");
    sb.append("</td></tr>");
    sb.append("<tr><td>");
    sb.append("<span>产品类型：");
    sb.append("<select id=\"producttype\" size = \"1\" style= \"width:160px;\">");
    sb.append(productBuffer.toString());
    sb.append("</select></span>");
	
	sb.append("<span><label>&nbsp;&nbsp;审核名称 </label><input type=\"text\" id=\"audit_name\"  /></span>");
	sb.append("<span><label>&nbsp;&nbsp;左表 </label><input type=\"text\" id=\"audit_ltable\" /></span>");
	sb.append("<span><label>&nbsp;&nbsp;右表 </label><input type=\"text\" id=\"audit_rtable\" /></span>");
	
    sb.append("</td></tr>");
    sb.append("</table>");
    sb.append("</div>");
    sb.append("<form name=\"mainListForm\" id=\"mainListForm\" action=\"#\" method=\"post\">");
    sb.append("<div id=\"form_table_title\">");
    sb.append("<ul>");
    sb.append("<li class=\"top\"><div>审核定义</div></li>");
    sb.append("</ul>");
    sb.append("</div>");
    sb.append("<div id=\"containerline20_d\">");
    sb.append("<div id=\"edit_table_div\" layout=\"{w:{fit:true},h:{fit:-60}}\"></div>	");
    sb.append("</div>");
    sb.append("</form>");
    
    
    sb.append("</div>");
    
    //	sb.append("");
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    document.getElementById("template_main").innerHTML = sb.toString();
    
    
    $("#producttype").val(product);
    
    
}

function doadd(){

    var params = {};
    params["billid"] = 0;
    params["type"] = 0;
    params["levelno"] = clevelno;
    params["product"] = $("#producttype").val();
    params["productTypeMark"] = productTypeMark;
    jumpTo("/datacommon/addauditdef/index.page?mainmenu=" + mainmenu + "&submenu=" + submenu + "", "post", params);
}

//修改
function domodify(){
    var datas = datatable.getRecordSet().query({
        check: 1
    });
    if (datas.length == 0) {
        alert("请选择一个审核定义！");
        return;
    }
    var LEVEL = datas[0].LEVELNO;
    //	if(clevelno > LEVEL){
    //	    alert("用户权限不够，不能修改！");
    //	    return;
    //	}
    var params = {};
    params["billid"] = datas[0].BILLID;
    params["type"] = 1;
    params["levelno"] = clevelno;
    params["product"] = $("#producttype").val();
    params["productTypeMark"] = productTypeMark;
    jumpTo("/datacommon/addauditdef/index.page?mainmenu=" + mainmenu + "&submenu=" + submenu + "", "post", params);
}

function deleteData(){
    var datas = datatable.getRecordSet().query({
        check: 1
    });
    if (datas.length == 0) {
        alert("请选择一个审核定义！");
        return;
    }
    var LEVEL = datas[0].LEVELNO;
    if (clevelno > LEVEL) {
        alert("用户权限不够，不能删除！");
        return;
    }
    if (window.confirm("您是否要删除选中记录？")) {
        var params = {};
        params["billid"] = datas[0].BILLID;
        Ext.lt.RCP.server("datacommon_auditdef_service", "deleteData", params, function(data){
            if (data.error) {
                closediv();
                alert(data.error);
            }
            else {
                alert("审核定义删除成功！");
                var params = {};
                params["product"] = $("#producttype").val();
                jumpTo("/datacommon/auditdef/index.page?mainmenu=" + mainmenu + "&submenu=" + submenu + "", "post", params);
                
            }
        });
    }
}

function searchData(){
	
	var params = {};
	params["audit_name"] = $("#audit_name").val();
	params["audit_ltable"] = $("#audit_ltable").val();
	params["audit_rtable"] = $("#audit_rtable").val();
	params["producttype"] = $("#producttype").val();
	
	showdiv();
	Ext.lt.RCP.server("datacommon_auditdef_service", "searchData", params, function(data){
        if (data.error) {
            closediv();
            alert(data.error);
        }
        else{
            datatable.getRecordSet().clear();
			datatable.getRecordSet().addData(data.auditList,0);
			
			closediv();	
        }
    });
}

