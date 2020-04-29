<%@page language="java" contentType="text/html; charset=GBK"%>
<jsp:directive.page import="java.util.Map" />
<jsp:directive.page import="java.util.Iterator" />
<jsp:directive.page import="gov.mof.framework.util.DateUtil" />
<jsp:directive.page import="java.util.Date" />
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%
	Date nowDate = DateUtil.getCurrentDate();
	String json = (String)request.getAttribute("json");
	String isaccuser = (String)request.getAttribute("isaccuser");
%>
<script type="text/javascript">
var nowDate = new Date(<%=nowDate.getTime()%>);
// 新增
var isaccuser=<%=isaccuser%>;
function doAdd() {
    if(isaccuser!="0"){
    	alert("非本人角色不允许做授权新增操作");
    	return;
    }else{
	var submenuid = <c:out value="${param.submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
    var url = "<%=request.getContextPath()%>/portal/accreditrole/turnToSave.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
    window.location.href = url;
    }
}

// 修改
function doMod(){
 if(isaccuser!="0"){
    	alert("非本人角色不允许做授权修改操作");
    	return;
    }else{
	var selectedRow = tmain.getSelectedRow();
    if(null == selectedRow || null == selectedRow[0]){
    	alert("请选择要修改的授权记录！");
        return;
    }
    if(selectedRow.length > 1){
     alert("请选择一条数据进行修改!");
     return;
     }
    if(selectedRow[0].state == 2){
        alert("此授权已经被回收,不能修改!");
        return false;
     }
    var accreditid = selectedRow[0].accreditid;
    var accreditedid = selectedRow[0].accreditedid;
   
    var rolename= selectedRow[0].rolename;
    
    
	var submenuid = <c:out value="${submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
	
    if(accreditid == null || "" == accreditid)
    {
    	alert("输入值出错，请刷新页面！");
    	return false;
    }
    var url = "<%=request.getContextPath()%>/portal/accreditrole/turnToModify.do?mainmenu="+mainmenu+"&submenu="+ submenuid + "&accreditid="+ accreditid+"&rolename="+ rolename+ "&accreditedid="+ accreditedid;
    window.location.href = url;
    }
   
}

//回收
function getBack()
{ 	if(isaccuser!="0"){
    	alert("非本人角色不允许做授权收回操作");
    	return;
    }else{
	var selectedRow = tmain.getSelectedRow();
    if(null == selectedRow || null == selectedRow[0]){
        alert("请选择要回收的授权记录！");
        return;
    }
    if(selectedRow[0].state == 2){
       alert("此授权已经被回收了！");
       return false;
    }
    var enddate = new Date(selectedRow[0].enddate);
    //if(enddate > nowDate){
       //alert("当前日期小于结束日期，此记录不能回收！");
       //return false;
    //}
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
    
    var url = "<%=request.getContextPath()%>/portal/accreditrole/getBack.do?mainmenu="+mainmenu+"&submenu="+ submenuid + accreditid;
    if(confirm("确定回收所选授权吗？")){
    	window.location.href = url;
    }
    }
}

function doDel(){
 if(isaccuser!="0"){
    	alert("非本人角色不允许做授权删除操作");
    	return;
    }else{
	var selectedRow = tmain.getSelectedRow();
    if(null == selectedRow || null == selectedRow[0]){
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
    
    var url = "<%=request.getContextPath()%>/portal/accreditrole/delete.do?mainmenu="+mainmenu+"&submenu="+ submenuid + accreditid;
    if(confirm("确定删除所选授权吗？")){
    	window.location.href = url;
    }
    }
}
function doQuery(){
	$('queryform').dosubmit();
}
//屏蔽F5刷新
function DisableF5(){   
	var d_url=document.location.href;
   with (event){   
           // F5 and Ctrl+R   
     if (keyCode==116 || (ctrlKey && keyCode==82)){  
     	if(d_url.indexOf('common/post/index')<=0){
			window.location='<%=request.getContextPath() %>/portal/accreditrole/query.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>';
		} 
       event.keyCode = 0;   
       event.cancelBubble = true;   
       return false;   
     }   
   }   
} 
document.onkeydown = DisableF5;


</script>
<form id="queryform" name="queryform" method="post"
	action="<%=request.getContextPath()%>/portal/accreditrole/query.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>"
	onsubmit="switchValue(this)">
	<div id="query_t">
	
			<span><span title="查询" class="query_btn" onclick="selectByCode()"
				onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
				onmousedown="doChangeBg1(this)"><a href="#">查询</a> </span> </span>
			<span><span title="清除查询条件" class="clear_btn" onclick="clearcontinue()"
				onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
				onmousedown="doChangeBg1(this)"><a href="#">清除查询条件</a> </span>
			</span>
			<span><span title="隐藏查询条件" class="hidden_btn" onclick="dohiddensearch()"
				onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
				onmousedown="doChangeBg1(this)"><a href="#"  id="ycorxs">隐藏查询条件</a> </span><span>｜</span>
			</span>
			<span><span title="新增" class="add_btn" onclick="doAdd()"
				onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
				onmousedown="doChangeBg1(this)"><a href="#">新增</a> </span> </span>
			<span><span title="修改" class="mod_btn" onclick="doMod()"
				onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
				onmousedown="doChangeBg1(this)"><a href="#">修改</a> </span>
			</span>
			<span><span title="删除" class="del_btn" onclick="doDel()"
				onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
				onmousedown="doChangeBg1(this)"><a href="#">删除</a> </span><span>｜</span>
			</span>
			<span><span title="收回" class="return_btn" onclick="getBack()"
				onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
				onmousedown="doChangeBg1(this)"><a href="#">收回</a> </span> </span>
		
	</div>

	<div id="querylist"  style='display:block;'>
		<table width=97% border=0 cellspacing=0 cellpadding=0> 
			<tr>
				<td nowrap="nowrap">
					被授权用户
				</td>
				<td nowrap="nowrap" width="20%">
					<input type="text" name="user_code" id="user_code" value="" >
				</td>
				<td nowrap="nowrap">
					开始日期
			
				</td>
				<td nowrap="nowrap">
					<input type="text" name="startdate" id="startdate" value="" width="20%"readonly="readonly"/>
					&nbsp;
					<img src="<%=request.getContextPath()%>/images/calendar/date.gif" alt="选择日期"
						onclick="return showCalendar('startdate', '%Y-%m-%d', null, true);"
						style="cursor:hand; border:0;"
						onmouseover="this.style.background='red';"
						onmouseout="this.style.background=''" />
				</td>
				<td nowrap="nowrap">
					结束日期
					
				</td>
				<td nowrap="nowrap">
					<input name="enddate" type="text" id="enddate" value="" width="20%" readonly="readonly"/>
					<img src="<%=request.getContextPath()%>/images/calendar/date.gif" alt="选择日期"
						onclick="return showCalendar('enddate', '%Y-%m-%d', null, true);"
						style="cursor:hand; border:0;"
						onmouseover="this.style.background='red';"
						onmouseout="this.style.background=''" />
						
				</td>
			</tr>
			
		</table>
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
		col.id = "roleid";
		col.name = "roleid";
		col.type = "S";
		col.title = "授权角色";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(value != null){
			  tdobj.innerHTML = value;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;

		col = createColumnConfig();
		col.id = "rolename";
		col.name = "rolename";
		col.type = "S";
		col.title = "授权角色名称";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(value != null){
			  tdobj.innerHTML = value;
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
	    
	    var json=<%=json%>;
        tmain.data =json;

		tmain.show(); 

	
//用户列表的查询条件设置
function selectByCode(){
		var code = document.getElementById('user_code').value;
		var startdate = document.getElementById('startdate').value;
		var enddate = document.getElementById('enddate').value;
		var arr = new Array();
		
		for(var i=0;i<json.length;i++){
			if(code != "" ){
				if(json[i].accreditedUser.code.toUpperCase().indexOf(code.toUpperCase())==-1){
				continue;
				}
			}
		if(startdate != ""){
			var dateObject = new Date(json[i].startdate); 
			var year = dateObject.getYear();
			var month = dateObject.getMonth()+1;
			if(month<10){
				month="0"+month;
			}
			var day = dateObject.getDate();
			if(day<10){
				day="0"+day;
			}
			
			if(!(year+"-"+month+"-"+day >= startdate )){
				continue;
			}
		}
		if(enddate != ""){
			var dateObject2 = new Date(json[i].enddate);
			var year = dateObject2.getYear();
			var month = dateObject2.getMonth()+1;
			if(month<10){
				month="0"+month;
			}
			var day = dateObject2.getDate();
			if(day<10){
				day="0"+day;
			} 
			if(!(year+"-"+month+"-"+day <= enddate)){
				continue;
			}
		}	
			
		/*if(startdate != "" && enddate != ""){
			var dateObject = new Date(json[i].startdate); 
			var dateObject2 = new Date(json[i].enddate); 
			if( !((eval(dateObject.getYear())+"-"+eval(dateObject.getMonth()+1)+"-"+dateObject.getDate()) >= startdate )|| !((eval(dateObject2.getYear())+"-"+eval(dateObject2.getMonth()+1)+"-"+dateObject2.getDate())<= enddate)){
				continue;
			}
		}	*/			
		arr.push(json[i]);
		}
		tmain.data=arr;
		tmain.show();
}
//清除查询条件
function clearcontinue(){
	document.getElementById('startdate').value="";
	document.getElementById('enddate').value="";
	document.getElementById('user_code').value="";

}
//隐藏查询条件
function dohiddensearch(){
	var obj = document.getElementById('querylist').style.display+'';
	if(obj=='block'){
		document.getElementById('ycorxs').innerText='显示查询条件';
		document.getElementById('querylist').style.display='none';
	}else{
		document.getElementById('ycorxs').innerText='隐藏查询条件';
		document.getElementById('querylist').style.display='block';
	}
}

      
</script>
</form>
