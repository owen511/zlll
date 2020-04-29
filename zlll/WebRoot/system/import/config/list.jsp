<%@page language="java" contentType="text/html; charset=GBK"%>
<jsp:directive.page import="java.util.Map" />
<jsp:directive.page import="java.util.Iterator" />
<jsp:directive.page import="java.util.Set" />
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<script type="text/javascript">
// 是非已经选择
function isSelected() {
    for (var i = 0; i < $('queryform').elements.length; i++) {
        var e = $('queryform').elements[i];
        if (e.type == "checkbox" && e.checked) {
            return true;
        }
    }
    return false;
}

// 返回ID列复选框勾选的个数
function getSelectedCount() {
    var count = 0;
    for (var i = 0; i < $('queryform').elements.length; i++) {
        var e = $('queryform').elements[i];
        if (e.type == "checkbox" && e.checked) {
            count++;
        }
    }
    return count;
}



function mainclick(row){
	var s = "";
	for(var v in row ){
		s += v+":";
		eval("s += row."+v);
		s += "\n";
	}
	var formObject = $("queryform");
	formObject.selectedRow = row;
}

//查询
function doQuery(){
document.queryform.action="<%=request.getContextPath()%>/system/importConfig/index.do?mainmenu=26900938&submenu=26901001";
document.queryform.submit();
}

//清空查询条件
function clearValue(){
var obj=document.getElementById("vchtypecode");
 	obj.value = ""
	obj.valueid = null;
	obj.valuecode = null;
}

// 新增
function doAdd() {
	var submenuid = <c:out value="${param.submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
    var url = "<%=request.getContextPath()%>/system/importConfig/turnToSave.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
    window.location.href = url;
}

// 修改
function doMod(){
	if (getSelectedCount() == 0) {
        alert("请首先选择1个记录，然后按[修改]！");
        return false;
    } else if (getSelectedCount() > 1) {
        alert("只能选择1个记录，然后按[修改]！");
        return false;
    }
	var submenuid = <c:out value="${submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
	
	var selectedRow = tmain.getSelectedRow();
    var billid = selectedRow[0].billid;
    if(billid == null || "" == billid)
    {
    	alert("输入值出错，请刷新页面！");
    	return false;
    }
    var url = "<%=request.getContextPath()%>/system/importConfig/turnToModify.do?mainmenu="+mainmenu+"&submenu="+ submenuid + "&billid="+ billid;
    window.location.href = url;
}

//删除
function doDel()
{
	if (getSelectedCount() < 1) {
        alert("请选择要删除记录！");
        return;
    }
	var submenuid = <c:out value="${submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
   	
   	var selectedRow = tmain.getSelectedRow();
   	var billid = "";
   	for(var i = 0; i<selectedRow.length; i++ )
   	{
   		if(selectedRow[i].billid == null || "" == selectedRow[i].billid)
	    {
	    	alert("输入值出错，请刷新页面！");
	    	return false;
	    }else{
	    	billid = billid + "&billid="+ selectedRow[i].billid;
	    }
   	}
    
    var url = "<%=request.getContextPath()%>/system/importConfig/delete.do?mainmenu="+mainmenu+"&submenu="+ submenuid + billid;
    if(confirm("确定删除所选单据吗？")){
    	window.location.href = url;
    }
}

//子项维护
function showItem(currentRow){
	var submenuid = <c:out value="${submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
	
	var formatid = currentRow.billid;
	if(null == formatid || "" == formatid)
	{
		alert("参数错误，请重新刷新页面！");
		return false;
	}
	var url = "<%=request.getContextPath()%>/system/importConfig/listItem.do?mainmenu="+mainmenu+"&submenu="+submenuid+ "&formatid=" + formatid;
	window.location = url;
}

//弹出树
function showQuery(){
	var submenuid = <c:out value="${submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
	var backinput=document.getElementById("vchtypecode");
	var opt = new Object();
	opt.mainmenu = mainmenu;
	opt.submenu = submenuid;
	opt.vchtypecode = "09002";
	opt.vchfieldcode = "vchtypeid";
	opt.backinput = backinput;
	opt.elementfilter = "vchtypeid in (select tovchtypeid from T_IMPORTFORMAT)";
	var B = new Object();
	B.url = "/common/mutlelementtree.do";
	customTree(opt,B);
}
</script>
<form id="queryform" name="queryform" method="post"
	action="<%=request.getContextPath()%>/system/importConfig/query.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>"
	onsubmit="switchValue(this)">
	<div id="query_t">
	    <span><span title="查询" class="query_btn"   onclick="doQuery()"
	        onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
	         onmousedown="doChangeBg1(this)"><a href="#">查询</a></span> </span>
		<span><span title="清除查询条件" class="clear_btn"
			onclick="clearValue()" onmouseover="doChangBg(this)"
			onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a
				href="#">清除查询条件</a> </span> </span>	         
		<span><span title="新增" class="add_btn" onclick="doAdd()"
			onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
			onmousedown="doChangeBg1(this)"><a href="#">新增</a> </span> </span>
		<span><span title="修改" class="mod_btn" onclick="doMod()"
			onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
			onmousedown="doChangeBg1(this)"><a href="#">修改</a> </span> </span>
		<span><span title="删除" class="del_btn" onclick="doDel()"
			onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
			onmousedown="doChangeBg1(this)"><a href="#">删除</a> </span> </span>
	</div>
<div id= "querylist" style="display:block;">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr>
			 <td align="left">
					交易凭证&nbsp;
					<input name="vchtypecode" type="text" id="vchtypecode" value='<c:out value="${vchCondition}"/>' readonly onclick="showQuery();"/>
					<button style='margin-left:8px;'onclick="showQuery();"></button>
					<img align=middle type ='image' value='清空' src='/images/done_btn/clear_qry2.gif' onclick="clearValue();"/>
				</td>
			</tr>
		</table>
</div>
	<div id="form_table_title">
		<ul>
			<li class="top">
				<div>
					导入格式模板信息
				</div>
			</li>
		</ul>
	</div>
	<!--请保留此div和a标签 -->
	<div id="containerline20">
		<div id='tmain_div'
			style='position:relative;height:expression(this.offsetParent.offsetHeight);width:100%;'></div>
	</div>
	<script type="text/javascript">
	<%
	Map vchtypeMap = (Map)request.getAttribute("vchtypeMap");
	Set vchtypeSet = vchtypeMap.keySet();
	for(Iterator it = vchtypeSet.iterator();it.hasNext();){
		String key = (String)it.next();
		String value = (String)vchtypeMap.get(key);
		out.println("var vchtype_"+key+"='"+value+"';");
	}
	
	Map tableMap = (Map)request.getAttribute("tableMap");
	Set tableSet = tableMap.keySet();
	for(Iterator it = tableSet.iterator();it.hasNext();){
		String key = (String)it.next();
		String value = (String)tableMap.get(key);
		out.println("var table_"+key+"='"+value+"';");
	}
	
	Map stateMap = (Map)request.getAttribute("stateMap");
	Set stateSet = stateMap.keySet();
	for(Iterator it = stateSet.iterator();it.hasNext();){
		String key = (String)it.next();
		String value = (String)stateMap.get(key);
		out.println("var state_"+key+"='"+value+"';");
	}
	%>
	col = createColumnConfig();
	col.id = "name";
	col.name = "name";
	col.type = "S";
	col.title = "格式名称";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["name"] != null && value != null){
		  tdobj.innerHTML = value;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "tovchtypeid";
	col.name = "tovchtypeid";
	col.type = "C";
	col.title = "交易凭证";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["tovchtypeid"] != null && value != null){
		  eval("var vchtypeName=vchtype_"+value);
		  tdobj.innerHTML = vchtypeName;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "vchflagstr";
	col.name = "vchflagstr";
	col.type = "S";
	col.title = "模板标志";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["functionname"] != null && value != null){
		  tdobj.innerHTML = value;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "totablecode";
	col.name = "totablecode";
	col.type = "S";
	col.title = "数据库业务表";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["totablecode"] != null && value != null){
		  eval("var tableName=table_"+value);
		  tdobj.innerHTML = tableName;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "fromtablecode";
	col.name = "fromtablecode";
	col.type = "S";
	col.title = "数据库来源表";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["fromtablecode"] != null && value != null){
		  eval("var tableName=table_"+value);
		  tdobj.innerHTML = tableName;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "type";
	col.name = "type";
	col.type = "S";
	col.title = "导入数据文件格式";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["type"] != null && value != null){
		  tdobj.innerHTML = value;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "classname";
	col.name = "classname";
	col.type = "S";
	col.title = "调用类名称";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["classname"] != null && value != null){
		  tdobj.innerHTML = value;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "functionname";
	col.name = "functionname";
	col.type = "S";
	col.title = "调用方法名称";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["functionname"] != null && value != null){
		  tdobj.innerHTML = value;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "definitionclass";
	col.name = "definitionclass";
	col.type = "S";
	col.title = "自定义解析器类名";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["functionname"] != null && value != null){
		  tdobj.innerHTML = value;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "definitionmethod";
	col.name = "definitionmethod";
	col.type = "S";
	col.title = "自定义解析器方法名";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["functionname"] != null && value != null){
		  tdobj.innerHTML = value;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "definitioncodeclass";
	col.name = "definitioncodeclass";
	col.type = "S";
	col.title = "自定义编码解析器类名";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["functionname"] != null && value != null){
		  tdobj.innerHTML = value;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "definitioncodemethod";
	col.name = "definitioncodemethod";
	col.type = "S";
	col.title = "自定义编码解析器方法名";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["functionname"] != null && value != null){
		  tdobj.innerHTML = value;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "state";
	col.name = "state";
	col.type = "S";
	col.title = "是否启用";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["state"] != null && value != null){
		  eval("var stateName=state_"+value);
		  tdobj.innerHTML = stateName;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "defaultvalue";
	col.name = "defaultvalue";
	col.type = "S";
	col.title = "默认值";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["defaultvalue"] != null && value != null){
		  tdobj.innerHTML = value;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "itemconfig";
	col.name = "itemconfig";
	col.type = "S";
	col.title = "子项维护";
	col.show = function(rownum,value,row,tdobj,datatable){
		 tdobj.row = row;
		 tdobj.innerHTML = "<img src='../../images/actions/query.gif' alt='子项维护' onclick='showItem(this.parentNode.row);' />";
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	var tmain =new dataTable();
	tmain.parent = document.getElementById('tmain_div');
	tmain.setTableHead(["serial","checkbox","name","itemconfig","tovchtypeid","vchflagstr","totablecode","fromtablecode","type","classname","functionname","definitionclass","definitionmethod","definitioncodeclass","definitioncodemethod","state","defaultvalue"]);
	<%
		String json = (String)request.getAttribute("json");
		if(null == json || "".equals(json)){
			out.println("tmain.data = new Array();\n");
		}else{
			out.println("tmain.data = "+ json);
		}
	%>
	tmain.onrowclick = mainclick;
	tmain.show();
	var aRowsList=tmain.data;
	aRowsList.sort(tmain.generateCompareFunc("tovchtypeid","CODE",3));//页面初始化交易凭证按照vchtypecode排序显示
	tmain.drawing = true;
	tmain.draw();
	</script>
</form>
