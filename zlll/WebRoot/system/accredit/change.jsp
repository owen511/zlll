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
       alert("�����뿪ʼʱ�䣡");
       return false;
    }
    if(formObject.enddate.value==""){
       alert("���������ʱ�䣡");
       return false;
    }
	if(formObject.startdate.value > formObject.enddate.value){
    	alert("��ʼʱ�䲻�ܴ��ڽ���ʱ�䣡");
        return false;
    }
    if(formObject.enddate.value < nowDate){
       alert("����ʱ�䲻��С�ڵ�ǰ���ڣ�");
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
					��Ȩ����༭��
				</div>
			</li>
		</ul>
	</div>
	<div id="edit_table">
		<table border="0" cellpadding="0px" cellspacing="0px">
			<tr>
				<th nowrap="nowrap">
					��Ȩ�û�
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
					��ʼ����
					<span>*</span>
				</th>
				<td nowrap="nowrap">
					<input type="text" name="startdate" id="startdate" value="<%=startdate %>" size="10" readonly="readonly"/>
					&nbsp;
					<img src="<%=request.getContextPath()%>/images/calendar/date.gif" alt="ѡ������"
						onclick="return showCalendar('startdate', '%Y-%m-%d', null, true);"
						style="cursor:hand; border:0;"
						onmouseover="this.style.background='red';"
						onmouseout="this.style.background=''" />
				</td>
				<th nowrap="nowrap">
					��������
					<span>*</span>
				</th>
				<td nowrap="nowrap">
					<input name="enddate" type="text" id="enddate" value="<%=enddate %>" size="10" readonly="readonly"/>
					<img src="<%=request.getContextPath()%>/images/calendar/date.gif" alt="ѡ������"
						onclick="return showCalendar('enddate', '%Y-%m-%d', null, true);"
						style="cursor:hand; border:0;"
						onmouseover="this.style.background='red';"
						onmouseout="this.style.background=''" />
				</td>
			</tr>
			<tr>
				<th nowrap="nowrap">
					����Ȩ�û�
				</th>
				<td nowrap="nowrap" width="20%">
					<input type="text" name=accreditedUser id=accreditedUser value="<c:out value='${accreditedUser.name}'/>" readonly="readonly" />
				</td>
				<th nowrap="nowrap">
					��ע
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
			onmousedown="this.className='down'" value="�޸�" onclick="saveExit()" />
		<input name="submit3" type="button" class="button_style"
			onmouseover="this.className='OverBtn'"
			onmouseout="this.className='button_style'"
			onmousedown="this.className='down'" value="����" onclick="cancel();" />
	</div>
	<input name=submenu id=submenu type="hidden"
		value="<c:out value='${param.submenu}'/>" />
	<input name=mainmenu id=mainmenu type="hidden"
		value="<c:out value='${param.mainmenu}'/>" />
</form>
