<%@page language="java" contentType="text/html; charset=GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%
	String site=(String)request.getAttribute("site");
 %>
<script>
function loadError(){
	var error = '<c:out value="${error}"/>';
	if("" != error ){
		alert(error);
	}
}
function checkIP(oTextbox) {
    oTextbox.value = oTextbox.value.trim();
    var inputVal = oTextbox.value;
    var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/;
    var isValidDate = reg.test(inputVal);
    if (!isValidDate && inputVal != null && inputVal != "") {
        alert("请输入正确的IP地址（如：192.168.3.2）！");
        oTextbox.value = "";
    } else { 
        var array = inputVal.split(".");
        inputVal = '';
        for (var i = 0; i < 4; i++) {
            array[i] = parseInt(array[i]);
            if (i < 3) {
                inputVal = inputVal + array[i] + '.';
            } else {
                inputVal = inputVal + array[i];
            }
        }
        oTextbox.value = inputVal;
    }
}
function saveExit(){
	var formObject = $("form1");
	if(formObject.name.value.trim()==""){
       alert("请输入站点地址！");
       return false;
    }
    document.getElementById("newsite").value=document.getElementById('name').value;
	formObject.action = '<%=request.getContextPath()%>/system/moudeldef/modifySite.do';
	formObject.submit();
}

function cancel(){
	var submenuid = <c:out value="${param.submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
	var url = "<%=request.getContextPath()%>/system/moudeldef/setIE.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
	window.location.href = url;
}
</script>
<form name="form1" id="form1"
	action="<%=request.getContextPath()%>/system/accredit/save.do"
	method="post">
	<div id="form_table_title_edit">
		<ul>
			<li class="top">
				<div>
					修改站点IP地址编辑区
				</div>
			</li>
		</ul>
	</div>
	<div id="edit_table"">
		<table border="0" cellpadding="0px" cellspacing="0px">
			<tr>
			<th nowrap="nowrap">
					修改站点IP地址
					<span>*</span>
				</th>
				<td nowrap="nowrap">
					<input type="text" name=name id=name
						value="<%=site%>" onblur="checkIP(this);"/>
					<input name=site id=site type="hidden"
						value="<%=site%>" />	
					<input name=newsite id=newsite type="hidden"
						value="" />		
					<input name=submenu id=submenu type="hidden"
						value="<c:out value='${param.submenu}'/>" />
					<input name=mainmenu id=mainmenu type="hidden"
						value="<c:out value='${param.mainmenu}'/>" />

					<a href="javascript:document.getElementById('name').value=window.location.href.split(':')[1].substring(2);void(0);">获取当前站点地址</a>
					<img align=middle type ='image' value='清空' src='/images/done_btn/clear_qry2.gif' onclick="document.getElementById('name').value=''"/>
				</td>
				</tr>
		</table>
	</div>
	<div id="confirm_exit_btn">
		<button name="submit2" class="button_style"
			onmouseover="this.className='OverBtn'"
			onmouseout="this.className='button_style'"
			onmousedown="this.className='down'" onclick="saveExit()">保存</button>
		<button name="submit3"  class="button_style"
			onmouseover="this.className='OverBtn'"
			onmouseout="this.className='button_style'"
			onmousedown="this.className='down'" onclick="cancel();">返回</button>
	</div>
</form>
