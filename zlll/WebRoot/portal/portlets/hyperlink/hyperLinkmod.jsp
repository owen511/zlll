<%@page language="java" contentType="text/html; charset=GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<form  name="form1" id="form1"  action="#" method="post" >
	   <div id="form_table_title">
			<ul>
				<li id="zx" class="top" >
					<div>
					   �޸ĳ�����
					</div>
				</li>
			</ul>
		</div>
		<div id="edit_table">
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tr>
					<th class = 'thwidth'><div align=left>����<span>*</span></div></th>
      				<td nowrap=nowrap  colspan="1"  align="left"><input id="hyperlinkname" name="hyperlinkname" type=text   title="" value="<%=request.getAttribute("linkname") %>" />
      				<th class = 'thwidth'><div align=left>��ַ<span>*</span></div></th>
      				<td nowrap=nowrap  colspan="1"  align="left"><input id="linkurl" name="linkurl" type=text  title="" value="<%=request.getAttribute("serviceurl") %>" />
      				<th class = 'thwidth'><div align=left>˳��</div></th>
      				<td nowrap=nowrap  colspan="1"  align="left"><input id="linkorder" name="linkorder" type=text   title="" value="<%=request.getAttribute("linkorder") %>" />
				</tr>
				<input name=itemid id=itemid type="hidden" value="<%=request.getAttribute("itemid") %>"/>
				<input name=submenu id=submenu type="hidden" value="<c:out value='${param.submenu}'/>" />
				<input name=mainmenu id=mainmenu type="hidden" value="<c:out value='${param.mainmenu}'/>" />
			</table>
		</div>
		<div id="querybutton"> 
		<div align="right">
		<input type="button" id="saveAndOut" name="save"  value="���沢�˳�" onclick="saveExit()" class="button_style"/>
		<input type="button" id="cancel"   name="cancel"  value="����" onclick="cancelSave()" class="button_style">	
		</div></div>
</form>

<script type="text/javascript">
function checkInputValue(){
	var linkname = document.form1.hyperlinkname.value.trim();
 	var linkurl = document.form1.linkurl.value.trim();
 	var linkorder = document.form1.linkorder.value.trim();
  	if(linkname==null||linkname.replace(/ /g,"")==""){
			alert("���ⲻ��Ϊ��");
			return false;
	 }
	if(linkname.length > 20){
		alert("����ֻ������20�������ڣ�");
		return false;
	}
	if(linkurl==null||linkurl.replace(/ /g,"")==""){
		alert("��ַ����Ϊ��");
		return false;
    }
	if(linkurl.length > 200){
		alert("��ַֻ������200�������ڣ�");
		return false;
	}
	if(linkorder.length > 2){
		alert("˳��ֻ��������λ�����ڣ�");
		return false;
	}
	if(linkorder.length != ''){
		var reg = /^(-|\+)?\d+$/ ;
		if(!reg.test(linkorder)){
			alert("˳��ֻ��������λ�����ڵ�������");
			return false;
		}
	}
	return true;
}
function saveExit(){
	if(checkInputValue()){
		var formObject = $("form1"); 
		formObject.action = "<%=request.getContextPath()%>/portal/hyperlink/addsave.do";
	 	formObject.submit();
 	}
}

//����
function cancelSave(){
	var submenuid = '<c:out value="${param.submenu}"/>';
	var mainmenu = '<c:out value="${param.mainmenu}"/>';
	var url = "<%=request.getContextPath()%>/portal/hyperlink/index.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
	window.location.href = url;
}
</script>
