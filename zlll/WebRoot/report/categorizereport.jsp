<%@page language="java" contentType="text/html; charset=GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<script type="text/javascript">

//20090929 jiazhitao add
function showReport(row){
	var	 eObj = event.srcElement;
	if(eObj.tagName=='DIV'||eObj.tagName=='INPUT'){ //摘要字段不用打开报表 jzy
		return;
	}
	var submenu = row.menuid;
	 if(submenu && submenu == "null" ){
	 	submenu="<c:out value="${param.submenu}"/>"
	 }

	 var url = "<%=request.getContextPath()%>/report/show_result.do?reportcode="+ row.reportcode+"&reportspec="+row.reportspec+"&submenu="+row.menuid;
	 var windowWidth = window.screen.availwidth;
	 var windowHeight = window.screen.availheight;
	 window.open(url, '_blank','width='+ windowWidth + ',height='+ windowHeight +  ',status=yes,toolbar=no,menubar=no,directories=no,resizable=yes,location=no top=0,left=0' );

}




function clearValue(){
	document.reportqueryform.reset();
}

function checkNull(){
if(document.reportqueryform.reportcode.value.length==0&&document.reportqueryform.reportname.value.length==0){
alert("报表编码和报表名称都不能为空!");
document.reportqueryform.reportcode.focus(); 
return false;
}else{
return true;
}
}
function query(){
	if(checkNull()){
		document.reportqueryform.submit();
 	}
}
function doSave(){
	show();
	var data = tmain.data;
	var remark;
	var params="";
	for(var i=0;i<data.length;i++){
		remark = data[i].remark;
		if(remark!=null){
			params += "@"+data[i].reportid+":"+remark; 
		}
	}
		params="reportinfo="+params;
	    var url = "/report/index/savereportinfo.do";
        JQ.ajax({
       	type: "post",
       	url:url,
       	data:params,
       	complete:function(msg){
       		var result = msg.responseText;
       		if(result=="true"){
       			alert("保存成功");
       		}else{
           		alert("保存失败");
       		}
       		closeDiv();
       	}
       });
}
</script>
<div id="query_t">
	<div>
		<span><span title="查询" class="query_btn" onclick="query()"
			onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
			onmousedown="doChangeBg1(this)"><a href="#">查询</a> </span> </span>
		<span><span title="清除查询条件" class="clear_btn"
			onclick="clearValue()" onmouseover="doChangBg(this)"
			onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a
				href="#">清除查询条件</a> </span> </span>
		<span><span title="隐藏查询条件" class="hidden_btn"
			onclick="doQuery2(this)" onmouseover="doChangBg(this)"
			onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a
				href="#">隐藏查询条件</a> </span>
		</span>
		<span><span title="保存自定义名称" class="save_btn"
			onclick="doSave(this)" onmouseover="doChangBg(this)"
			onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a
				href="#">保存自定义名称</a> </span>
		</span>
			
	</div>
</div>

<div id= "querylist" style="display:block;">
<form name="reportqueryform" id="reportqueryform"
	action="<%=request.getContextPath()%>/report/index.do?query=true&mainmenu=33000"
	method="post">
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr>
				
				<td align="left">
					报表编码&nbsp;<input name="reportcode" type="text" id="reportcode" onchange="changeData()">
				</td>
				
				<td align="left">
					报表名称&nbsp;<input name="reportname" type="text" id="reportname" onchange="changeData()">
				</td>
			</tr>
		</table>
</form>
</div>
<form name="applyform" id="applyform" action="#" method="post">
<div id="form_table_title">
	<ul>
		<li class="top">
			<div>
				<%=(String)request.getAttribute("reporttypename") %>
			</div>
		</li>
	</ul>
</div>
<div id="containerline17">
	<!-- 使用标签创建，onclick 使用的方法必须放之前定义过 -->
	<ui:datatable columndefine="true" tabletype="MainList" id="tmain" data="json" onclick="showReport" />
	

</div>
</form>