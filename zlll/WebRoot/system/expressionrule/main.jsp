<%@page language="java" contentType="text/html; charset=GBK"%>
<jsp:directive.page import="java.util.Map" />
<jsp:directive.page import="java.util.Iterator" />
<jsp:directive.page import="gov.mof.framework.util.DateUtil" />
<jsp:directive.page import="java.util.Date" />
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%
Date nowDate = DateUtil.getCurrentDate();
%>
<script type="text/javascript">
var nowDate = new Date(<%=nowDate.getTime()%>);
// 新增
function doAdd() {
	var submenuid = <c:out value="${param.submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
    var url = "<%=request.getContextPath()%>/system/expressionrule/manage/add/index.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
    window.location.href = url;
}

// 修改
function doMod(){
	var selectedRow = tmain.getSelectedRow();
    if(null == selectedRow || null == selectedRow[0]){
    	alert("请选择要修改的记录！");
        return;
    }
    var itemid = selectedRow[0].itemid;
    
    
	var submenuid = <c:out value="${submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
	
    if(itemid == null || "" == itemid)
    {
    	alert("输入值出错，请刷新页面！");
    	return false;
    }
    var url = "<%=request.getContextPath()%>/system/expressionrule/manage/modify/index.do?mainmenu="+mainmenu+"&submenu="+ submenuid + "&itemid="+ itemid;
    window.location.href = url;
}

function doDel(){
	var selectedRow = tmain.getSelectedRow();
    if(null == selectedRow){
    	alert("请选择要删除的记录！");
        return;
    }
	var submenuid = <c:out value="${submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
   	
   	var itemid = "";
   	for(var i = 0; i<selectedRow.length; i++ )
   	{
   		if(selectedRow[i].itemid == null || "" == selectedRow[i].itemid)
	    {
	    	alert("输入值出错，请刷新页面！");
	    	return false;
	    }else{
	    	itemid = itemid + "&itemid="+ selectedRow[i].itemid;
	    }
   	}
    
    var url = "<%=request.getContextPath()%>/system/expressionrule/manage/delete.do?mainmenu="+mainmenu+"&submenu="+ submenuid + itemid;
    if(confirm("确定删除所选记录吗？")){
    	window.location.href = url;
    }
}
</script>
<form id="queryform" name="queryform" method="post"
	action="<%=request.getContextPath()%>/system/expressionrule/manage/index.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>"
	onsubmit="switchValue(this)">
	<div id="query_t">
		<div>
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
	</div>
	<div id="form_table_title">
		<ul>
			<li class="top">
				<div>
					数学表达式规则主信息
				</div>
			</li>
		</ul>
	</div>
	<!--请保留此div和a标签 -->
	<div id="containerline10">
		<div id='tmain_div'
			style='position: relative; height: expression(this.offsetParent.offsetHeight); width: 100%;'></div>
		<script type="text/javascript">
		col = createColumnConfig();
		col.id = "code";
		col.name = "code";
		col.type = "S";
		col.title = "编码";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(value != null){
			  tdobj.innerHTML = value;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "name";
		col.name = "name";
		col.type = "S";
		col.title = "名称";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(value != null){
			  tdobj.innerHTML = value;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "wfdescid";
		col.name = "wfdescid";
		col.type = "S";
		col.title = "工作流";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(value != null){
			  tdobj.innerHTML = row.wfdescid_name;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "actiondescid";
		col.name = "actiondescid";
		col.type = "S";
		col.title = "工作流动作";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(value != null){
			  tdobj.innerHTML = row.actiondescid_code + "-"+ row.actiondescid_name;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		
		col = createColumnConfig();
		col.id = "expression";
		col.name = "expression";
		col.type = "S";
		col.title = "表达式";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(value != null){
			  tdobj.innerHTML = value;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		var tmain =new dataTable();
		tmain.isWrap = true;
		tmain.parent = document.getElementById('tmain_div');
		tmain.id ='tmain';
		tmain.setTableHead(["serial","checkbox","wfdescid","actiondescid","code","name","expression"]);
		tmain.isShowRadio = false ;
		tmain.isShowCheckBox = true ;
		tmain.isShowSerial = true ;
		tmain.isCreateAmtColumn= true;
		 tmain.tabletype = 'MainList';
		tmain.inputRuleConfig =[];
		tmain.showLevelConfig =[];
		tmain.filterConfig =[];
		tmain.actionConfig =[];
		tmain.actionRule =[];
		tmain.data = [];
		tmain.display = 'block';
		tmain.showstatus = false;
		tmain.amtflag = 1;
		tmain.tagPage = null;
		tmain.allflag = false ;
		
		<%
			String json = (String)request.getAttribute("json");
			if(null == json || "".equals(json)){
				out.println("tmain.data = new Array();\n");
			}else{
				out.println("tmain.data = "+ json);
			}
		%>
		tmain.onrowclick=function(row){
			var parameters = row.parameters;
			if(null != parameters){
				tdetail.data = parameters;
				tdetail.show();
			}else{
				tdetail.data = new Array();
				tdetail.show();
			}
		}
		tmain.show();
	</script>
	</div>
	<div id="form_table_title">
		<ul>
			<li class="top">
				<div>
					参数明细信息
				</div>
			</li>
		</ul>
	</div>
	<!--请保留此div和a标签 -->
	<div id="containerline6">
		<div id='tdetail_div' style='position:relative;behavior:url(#default#userData);height:expression(this.offsetParent.offsetHeight-22);width:100%;'  > </div>
		<script type="text/javascript">
		col = createColumnConfig();
		col.id = "value";
		col.name = "value";
		col.type = "S";
		col.title = "值";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(value != null){
			  tdobj.innerHTML = value;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "type";
		col.name = "type";
		col.type = "S";
		col.title = "类型";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(value != null){
			  if(value == 1){
			  	tdobj.innerHTML = "数值类型";
			  }else if(value == 2){
			  	tdobj.innerHTML = "单据属性类型";
			  }else if(value == 3){
			  	tdobj.innerHTML = "查询语句类型";
			  }else{
			  	tdobj.innerHTML = "";
			  }
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		var tdetail =new dataTable();
		tdetail.isWrap = true;
		tdetail.id="tdetail";
		tdetail.parent = document.getElementById('tdetail_div');
		tdetail.setTableHead(["serial","code","name","type","value"]);
		tdetail.id ='tdetail';
		tdetail.isShowRadio = false ;
		tdetail.isShowCheckBox = false ;
		tdetail.isShowSerial = true ;
		tdetail.isCreateAmtColumn= true;
		 tdetail.tabletype = 'MainList';
		tdetail.inputRuleConfig =[];
		tdetail.showLevelConfig =[];
		tdetail.filterConfig =[];
		tdetail.actionConfig =[];
		tdetail.actionRule =[];
		tdetail.data = [];
		tdetail.display = 'block';
		tdetail.isWrap = true;
		tdetail.showstatus = false;
		tdetail.amtflag = 1;
		tdetail.tagPage = null;
		tdetail.allflag = false ;
		tdetail.data = new Array();
		tdetail.show();
	</script>
	</div>
</form>
<script type="text/javascript">
<%
	String error = (String)request.getAttribute("error");
	if(null != error && !"".equals(error.trim())){
		out.println("alert('"+error+"')");
	}	
%>
</script>

