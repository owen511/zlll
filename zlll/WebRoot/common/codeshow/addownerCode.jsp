
<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>

<HTML >
 <HEAD>
 <META HTTP-EQUIV="pragma" CONTENT="no-cache"> 
<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache, must-revalidate"> 
<META HTTP-EQUIV="expires" CONTENT="Wed, 26 Feb 1997 08:21:57 GMT">

  <TITLE>����Զ���Ҫ��</TITLE>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
<link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=request.getContextPath()%>/style/stylefontS.css" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_LOGO%>_logo.css"/>
<script type="text/javascript" src="../../js/prototype.js"></script>
<script type="text/javascript" src="../../js/choose.js"></script>
<script type="text/javascript" src="../../js/changescroll.js"></script>

<style>
select{
width:60%;
}
</style>
 </HEAD>
<body  class="pop_body">
<div id="form_table_title" style="margin-right:1px;">
  <ul>
    <li class="top">
      <div>���������Ҫ�����</div>
    </li>
  </ul>
</div>
<form name="addMainSet" method="post">
<input type="hidden" id="hid" value="<c:out value='${codeShowDTO.colCode}'/>"/>
<!-- �µ���ʽ -->
<div id="edit_table" style="width:98%">
<table width="664" border="1" >
  <tr>
    <th width="139"><div align="left">Ҫ�ر���</div></th>
	<td><input type="text" id="colCode" name="colCode" value="<c:out value='${codeShowDTO.colCode}'/>" size="20" style="width:60%;"  />    </td>
  </tr>
  <tr>
    <th width="69"><div align="left">Ҫ������</div></th>
    <td><input id="colName" type="text" name="colName" value="<c:out value='${codeShowDTO.colName}'/>" size="10" style="width:60%;"  /></td>
  </tr>
  <tr>    
</table>
</div>
<FONT color="red"><c:out value='${ErrorEessage}'/></FONT>
<input type="hidden" name="checkmenuid" id = "ϵͳID" value="<c:out value='${checkmenuid}'/>"/>
<input type="hidden" id="mehtod" name="method" value="">
</form>

<br/>


<div style="float:right;">
      <input type="button" name="Submit" value="���沢����"  onclick="saveAndGo()"  class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/>
      <input type="button" name="add" value="���沢����"  onclick="saveAndReturn()"  class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'" />
      <input type="button" name="exit" value="����"  onclick="location.href='/common/codeShowManage/addQueryList.do?checkmenuid=<c:out value='${checkmenuid}'/>'" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/>
</div>
</body>
</html>
<script type="text/javascript">
//���沢����
function saveAndGo(){
 if(checkNull()){
       document.getElementById("method").value="comeOn"
       var url = "/common/codeShowManage/addOwnerCodeDone.do";
       document.forms[0].action=url;
       document.forms[0].submit();
     }
}

//����󷵻�
 function  saveAndReturn(){
     if(checkNull()){
         document.getElementById("method").value="saveThenReturn"
         var url = "/common/codeShowManage/addOwnerCodeDone.do";
         document.forms[0].action=url;
         document.forms[0].submit();
     }
 }

//��֤�ǿ��ֶ�
    function checkNull(){
       var colCode = document.addMainSet.colCode.value;
       var colName = document.addMainSet.colName.value;
      if(colCode==""){
        alert("Ҫ�ر��벻��Ϊ��,����д��");
        return false;
      }
      if(colName ==""){
         alert("Ҫ���������Ʋ���Ϊ��,����д��");
         return false;
      }
      return true;

}
if('<%=request.getParameter("status")%>' == 1 ){
	window.opener.getsubmenu(document.addMainSet.checkmenuid.value);
}

</script>