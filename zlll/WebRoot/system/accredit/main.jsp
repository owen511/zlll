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
    var url = "<%=request.getContextPath()%>/system/accredit/turnToSave.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
    window.location.href = url;
}

// 修改
function doMod(){
	var selectedRow = tmain.getSelectedRow();
    if(null == selectedRow || null == selectedRow[0]){
    	alert("请选择要修改的授权记录！");
        return;
    }
    var accreditid = selectedRow[0].accreditid;
    
    
	var submenuid = <c:out value="${submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
	
    if(accreditid == null || "" == accreditid)
    {
    	alert("输入值出错，请刷新页面！");
    	return false;
    }
    var url = "<%=request.getContextPath()%>/system/accredit/turnToModify.do?mainmenu="+mainmenu+"&submenu="+ submenuid + "&accreditid="+ accreditid;
    window.location.href = url;
}

//回收
function getBack()
{
	var selectedRow = tmain.getSelectedRow();
    if(null == selectedRow){
        alert("请选择要回收的授权记录！");
        return;
    }
    if(selectedRow[0].state == 2){
       alert("此授权已经被回收了！");
       return false;
    }
    var enddate = new Date(selectedRow[0].enddate);
    if(enddate > nowDate){
       alert("当前日期小于结束日期，此记录不能回收！");
       return false;
    }
	var submenuid = <c:out value="${submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
	
   	var accreditid = "";
   	for(var i = 0; i<selectedRow.length; i++ )
   	{
   		if(selectedRow[i].accreditid == null || "" == selectedRow[i].accreditid)
	    {
	    	alert("输入值出错，请刷新页面！");
	    	return false;
	    }else{
	    	accreditid = accreditid + "&accreditid="+ selectedRow[i].accreditid;
	    }
   	}
    
    var url = "<%=request.getContextPath()%>/system/accredit/getBack.do?mainmenu="+mainmenu+"&submenu="+ submenuid + accreditid;
    if(confirm("确定回收所选授权吗？")){
    	window.location.href = url;
    }
}

function doDel(){
	var selectedRow = tmain.getSelectedRow();
    if(null == selectedRow){
    	alert("请选择要删除的授权记录！");
        return;
    }
	var submenuid = <c:out value="${submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
   	
   	var accreditid = "";
   	for(var i = 0; i<selectedRow.length; i++ )
   	{
   		if(selectedRow[i].accreditid == null || "" == selectedRow[i].accreditid)
	    {
	    	alert("输入值出错，请刷新页面！");
	    	return false;
	    }else{
	    	accreditid = accreditid + "&accreditid="+ selectedRow[i].accreditid;
	    }
   	}
    
    var url = "<%=request.getContextPath()%>/system/accredit/delete.do?mainmenu="+mainmenu+"&submenu="+ submenuid + accreditid;
    if(confirm("确定删除所选授权吗？")){
    	window.location.href = url;
    }
}
function doQuery(){
	$('queryform').dosubmit();
}
</script>
<form id="queryform" name="queryform" method="post"
	action="<%=request.getContextPath()%>/system/accredit/query.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>"
	onsubmit="switchValue(this)">
	<div id="query_t">
		<div>
			<span><span title="新增" class="add_btn" onclick="doAdd()"
				onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
				onmousedown="doChangeBg1(this)"><a href="#">新增</a> </span> </span>
			<span><span title="修改" class="mod_btn" onclick="doMod()"
				onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
				onmousedown="doChangeBg1(this)"><a href="#">修改</a> </span><span>｜</span>
			</span>
			<span><span title="删除" class="del_btn" onclick="doDel()"
				onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
				onmousedown="doChangeBg1(this)"><a href="#">删除</a> </span><span>｜</span>
			</span>
			<span><span title="收回" class="return_btn" onclick="getBack()"
				onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
				onmousedown="doChangeBg1(this)"><a href="#">收回</a> </span> </span>
		</div>
	</div>
	<div id="form_table_title">
		<ul>
			<li class="top">
				<div>
					授权
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
			Map stateMap = (Map)request.getAttribute("stateMap");
			if(null != stateMap && null != stateMap.keySet())
			{
				for(Iterator it = stateMap.keySet().iterator();it.hasNext();)
				{
					String id = (String)it.next();
					String stateJson = (String)stateMap.get(id);
					out.println("var state_"+id+"='"+stateJson+"';");
				}
			}
		%>
		col = createColumnConfig();
		col.id = "accreditUser";
		col.name = "accreditUser";
		col.type = "S";
		col.title = "授权用户";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(value != null && value.code != null ){
			  tdobj.innerHTML = value.code+"-"+value.name;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "accreditedUser";
		col.name = "accreditedUser";
		col.type = "S";
		col.title = "被授权用户";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(value != null && value.code != null ){
			  tdobj.innerHTML = value.code+"-"+value.name;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "startdate";
		col.name = "startdate";
		col.type = "S";
		col.title = "开始时间";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row["startdate"] != null && value != null){
			  var dateObject = new Date(value); 
			  tdobj.innerHTML = eval(dateObject.getYear())+"-"+eval(dateObject.getMonth()+1)+"-"+dateObject.getDate();
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "enddate";
		col.name = "enddate";
		col.type = "S";
		col.title = "结束时间";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row["enddate"] != null && value != null){
			  var dateObject = new Date(value); 
			  tdobj.innerHTML = eval(dateObject.getYear())+"-"+eval(dateObject.getMonth()+1)+"-"+dateObject.getDate();
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "stopdate";
		col.name = "stopdate";
		col.type = "S";
		col.title = "收回日期";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row["stopdate"] != null && value != null){
			  var dateObject = new Date(value); 
			  tdobj.innerHTML = eval(dateObject.getYear())+"-"+eval(dateObject.getMonth()+1)+"-"+dateObject.getDate();
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "state";
		col.name = "state";
		col.type = "S";
		col.title = "状态";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(value != null){
			  eval("var stateName = state_"+value);
			  tdobj.innerHTML = stateName;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "remark";
		col.name = "remark";
		col.type = "S";
		col.title = "备注";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(value != null){
			  tdobj.innerHTML = value;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		var tmain =new dataTable();
		tmain.parent = document.getElementById('tmain_div');
		tmain.setTableHead(["serial","radio","accreditUser","accreditedUser","startdate","enddate","stopdate","state","remark"]);
		<%
			String json = (String)request.getAttribute("json");
			if(null == json || "".equals(json)){
				out.println("tmain.data = new Array();\n");
			}else{
				out.println("tmain.data = "+ json);
			}
		%>
		tmain.show();
	</script>
</form>
