<%@page language="java" contentType="text/html; charset=GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<% String castate = (String)request.getAttribute("castate");%>
<jsp:directive.page import="gov.mof.framework.util.DateUtil" /><html>
<form  name="form1" id="form1"  action="#" method="post" >
	   <div id="form_table_title">
			<ul>
				<li id="zx" class="top" >
					<div>
					   �޸ĵ�¼��ʽ��Ϣ
					</div>
				</li>
			</ul>
		</div>
		<div id="edit_table">
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				
				<tr>
				<td nowrap="nowrap">
						¼����
				</td>
					<td nowrap="nowrap">
					<input type="text" name=addcode id=addcode value="<%=request.getAttribute("addcode") %>" disabled = "disabled"/>
					<input name=submenu id=submenu type="hidden" value="<c:out value='${param.submenu}'/>" />
					<input name=mainmenu id=mainmenu type="hidden" value="<c:out value='${param.mainmenu}'/>" />
					</td>
					<td nowrap="nowrap">
						��¼��ʽ
					</td>
					<td nowrap="nowrap">
						<select id="castate" name="castate">
						
							<option value="0">CA��ʽ</option>
							<option value="1">�û������뷽ʽ</option>
						</select>
					</td>
					<td nowrap="nowrap">
						��ע<span><font color="red">*</font></span>
				</td>
				<td>
				<input type="text" name=remark id=remark value="<%=request.getAttribute("remark") %>"/>
				<input name=itemid id=itemid type="hidden" value="<%=request.getAttribute("itemid") %>"/>
				</td>
				</tr>
			</table>
		</div>
		<div id="querybutton"> 
		<div align="right">
		<input type="button" id="saveAndOut" name="save"  value="���沢�˳�" onclick="saveExit()" class="button_style"/>
		</div></div>
</form>

<script type="text/javascript">
document.getElementById('castate').value= '<%=castate%>';
function saveExit(){
	var formObject = $("form1"); 
	var addcode = document.form1.addcode.value;
	var remark = document.form1.remark.value;
	var castate = document.form1.castate.value;
	var itemid = document.form1.itemid.value;
	if(remark == null||remark.trim() == ""){
 			alert("��ע����Ϊ�ա�");
 			return false;
		}
	if(remark.length > 500){
		alert("ֻ������500�������ڣ�");
		return;
	}else{
	    formObject.action = "<%=request.getContextPath()%>/portal/caAdd/modsave.do";
	    formObject.submit();
    }    
}
</script>
