<%@page language="java" contentType="text/html; charset=GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<jsp:directive.page import="gov.mof.framework.util.DateUtil" />
<%
	String nowDate = DateUtil.getCurrentDateStr(DateUtil.C_DATE_PATTON_DEFAULT);
%>
<script>
var nowDate = '<%=nowDate%>';
function loadError(){
	var error = '<c:out value="${error}"/>';
	if("" != error ){
		alert(error);
	}
}
loadError();
</script>
<form name="form1" id="form1" action="<%=request.getContextPath()%>/system/accredit/save.do"
	method="post">
	<div id="form_table_title_edit">
		<ul>
			<li class="top">
				<div>
					��Ȩ����༭��
				</div>
			</li>
		</ul>
	</div>
	<div id="edit_table" style='height:50px;'>
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
				</td>
				<th nowrap="nowrap">
					��ʼ����
					<span>*</span>
				</th>
				<td nowrap="nowrap">
					<input type="text" name="startdate" id="startdate" value="" size="10" readonly="readonly"/>
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
					<input name="enddate" type="text" id="enddate" value="" size="10" readonly="readonly"/>
					<img src="<%=request.getContextPath()%>/images/calendar/date.gif" alt="ѡ������"
						onclick="return showCalendar('enddate', '%Y-%m-%d', null, true);"
						style="cursor:hand; border:0;"
						onmouseover="this.style.background='red';"
						onmouseout="this.style.background=''" />
				</td>
			</tr>
			<tr>
				<th nowrap="nowrap">
					��ע
				</th>
				<td nowrap="nowrap" colspan="5">
					<input name="remark" id="remark" value="" maxlength="100" type="text" />
				</td>
			</tr>
		</table>
	</div>
	<div id="form_table_title">
		<ul>
			<li class="top">
				<div>
					����Ȩ�û���Ϣ
				</div>
			</li>
		</ul>
	</div>
	<!--�뱣����div��a��ǩ -->
	<div id="containerline15">
		<div id='tmain_div'
			style='position:relative;height:expression(this.offsetParent.offsetHeight);width:100%;'></div>
	</div>
	<script type="text/javascript">
		col = createColumnConfig();
		col.id = "code";
		col.name = "code";
		col.type = "S";
		col.title = "�û�����";
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
		col.title = "�û�����";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(value != null){
			  tdobj.innerHTML = value;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "organtypeStr";
		col.name = "organtypeStr";
		col.type = "S";
		col.title = "��������";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(value != null){
			  tdobj.innerHTML = value;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "organidStr";
		col.name = "organidStr";
		col.type = "S";
		col.title = "����";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(value != null){
			  tdobj.innerHTML = value;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "typeStr";
		col.name = "typeStr";
		col.type = "S";
		col.title = "�û�����";
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
		tmain.setTableHead(["serial","radio","code","name","typeStr","organtypeStr","organidStr"]);
		<%
			String json = (String)request.getAttribute("json");
			if(null == json || "".equals(json)){
				out.println("tmain.data = new Array();\n");
			}else{
				out.println("tmain.data = "+ json);
			}
		%>
		tmain.show();

		function saveExit(){
			var selectedRow = tmain.getSelectedRow();
			if(null == selectedRow[0]){
				alert("��ѡ��һ��Ҫ����Ȩ�޵��û���");
    			return false;
			}
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
		    formObject.accredited.value = selectedRow[0].userid;
		    formObject.action = "<%=request.getContextPath()%>/system/accredit/save.do";
		    formObject.submit();
		}
		
		function cancel(){
			var submenuid = <c:out value="${param.submenu}"/>;
			var mainmenu = <c:out value="${param.mainmenu}"/>;
			var url = "<%=request.getContextPath()%>/system/accredit/query.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
			window.location.href = url;
		}
	</script>
	<div id="confirm_exit_btn">
		<input name="submit2" type="button" class="button_style"
			onmouseover="this.className='OverBtn'"
			onmouseout="this.className='button_style'"
			onmousedown="this.className='down'" value="��Ȩ" onclick="saveExit()" />
		<input name="submit3" type="button" class="button_style"
			onmouseover="this.className='OverBtn'"
			onmouseout="this.className='button_style'"
			onmousedown="this.className='down'" value="����" onclick="cancel();" />
	</div>
	<input id=accredited name=accredited type=hidden value="">
	<input name=submenu id=submenu type="hidden"
		value="<c:out value='${param.submenu}'/>" />
	<input name=mainmenu id=mainmenu type="hidden"
		value="<c:out value='${param.mainmenu}'/>" />
</form>
