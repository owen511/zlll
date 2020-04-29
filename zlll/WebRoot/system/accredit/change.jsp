<%@page language="java" contentType="text/html; charset=GBK"%>
<jsp:directive.page import="gov.mof.fasp.ca.accredit.AccreditDTO" />
<jsp:directive.page import="gov.mof.framework.util.DateUtil" />
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%
	AccreditDTO accreditDTO = (AccreditDTO)request.getAttribute("accreditDTO");
	String startdate = DateUtil.format(accreditDTO.getStartdate(),DateUtil.C_DATE_PATTON_DEFAULT);
	String enddate = DateUtil.format(accreditDTO.getEnddate(),DateUtil.C_DATE_PATTON_DEFAULT);
	String nowDate = DateUtil.getCurrentDateStr(DateUtil.C_DATE_PATTON_DEFAULT);
%>
<script>
var nowDate = '<%=nowDate%>';
function saveExit(){
	var formObject = $("form1");
	if(formObject.startdate.value==""){
       alert("请输入开始时间！");
       return false;
    }
    if(formObject.enddate.value==""){
       alert("请输入结束时间！");
       return false;
    }
	if(formObject.startdate.value > formObject.enddate.value){
    	alert("开始时间不能大于结束时间！");
        return false;
    }
    if(formObject.enddate.value < nowDate){
       alert("结束时间不能小于当前日期！");
       return false;
    }
	formObject.submit();
}

function cancel(){
	var submenuid = <c:out value="${param.submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
	var url = "<%=request.getContextPath()%>/system/accredit/query.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
	window.location.href = url;	
}
</script>
<form name="form1" id="form1" action="<%=request.getContextPath()%>/system/accredit/update.do"
	method="post">
	<c:out value="${error}"/>
	<div id="form_table_title_edit">
		<ul>
			<li class="top">
				<div>
					授权管理编辑区
				</div>
			</li>
		</ul>
	</div>
	<div id="edit_table">
		<table border="0" cellpadding="0px" cellspacing="0px">
			<tr>
				<th nowrap="nowrap">
					授权用户
				</th>
				<td nowrap="nowrap" width="20%">
					<input type="text" name=accreditUser id=accreditUser value="<c:out value='${accreditUser.name}'/>" readonly="readonly" />
					<input name=submenu id=submenu type="hidden"
						value="<c:out value='${param.submenu}'/>" />
					<input name=mainmenu id=mainmenu type="hidden"
						value="<c:out value='${param.mainmenu}'/>" />
					<input name=accreditid id=accreditid type="hidden"
						value="<c:out value='${accreditDTO.accreditid}'/>" />
				</td>
				<th nowrap="nowrap">
					开始日期
					<span>*</span>
				</th>
				<td nowrap="nowrap">
					<input type="text" name="startdate" id="startdate" value="<%=startdate %>" size="10" readonly="readonly"/>
					&nbsp;
					<img src="<%=request.getContextPath()%>/images/calendar/date.gif" alt="选择日期"
						onclick="return showCalendar('startdate', '%Y-%m-%d', null, true);"
						style="cursor:hand; border:0;"
						onmouseover="this.style.background='red';"
						onmouseout="this.style.background=''" />
				</td>
				<th nowrap="nowrap">
					结束日期
					<span>*</span>
				</th>
				<td nowrap="nowrap">
					<input name="enddate" type="text" id="enddate" value="<%=enddate %>" size="10" readonly="readonly"/>
					<img src="<%=request.getContextPath()%>/images/calendar/date.gif" alt="选择日期"
						onclick="return showCalendar('enddate', '%Y-%m-%d', null, true);"
						style="cursor:hand; border:0;"
						onmouseover="this.style.background='red';"
						onmouseout="this.style.background=''" />
				</td>
			</tr>
			<tr>
				<th nowrap="nowrap">
					被授权用户
				</th>
				<td nowrap="nowrap" width="20%">
					<input type="text" name=accreditedUser id=accreditedUser value="<c:out value='${accreditedUser.name}'/>" readonly="readonly" />
				</td>
				<th nowrap="nowrap">
					备注
				</th>
				<td nowrap="nowrap" colspan="3">
					<input name="remark" id="remark" value="<c:out value='${accreditDTO.remark}'/>" maxlength="100" type="text" />
				</td>
			</tr>
		</table>
	</div>
	<div id="confirm_exit_btn">
		<input name="submit2" type="button" class="button_style"
			onmouseover="this.className='OverBtn'"
			onmouseout="this.className='button_style'"
			onmousedown="this.className='down'" value="修改" onclick="saveExit()" />
		<input name="submit3" type="button" class="button_style"
			onmouseover="this.className='OverBtn'"
			onmouseout="this.className='button_style'"
			onmousedown="this.className='down'" value="返回" onclick="cancel();" />
	</div>
	<input name=submenu id=submenu type="hidden"
		value="<c:out value='${param.submenu}'/>" />
	<input name=mainmenu id=mainmenu type="hidden"
		value="<c:out value='${param.mainmenu}'/>" />
</form>
