
<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>

<HTML >
 <HEAD>
 <META HTTP-EQUIV="pragma" CONTENT="no-cache"> 
<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache, must-revalidate"> 
<META HTTP-EQUIV="expires" CONTENT="Wed, 26 Feb 1997 08:21:57 GMT">

  <TITLE>添加自定义要素</TITLE>
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
      <div>添加总账外要素添加</div>
    </li>
  </ul>
</div>
<form name="addMainSet" method="post">
<input type="hidden" id="hid" value="<c:out value='${codeShowDTO.colCode}'/>"/>
<!-- 新的样式 -->
<div id="edit_table" style="width:98%">
<table width="664" border="1" >
  <tr>
    <th width="139"><div align="left">要素编码</div></th>
	<td><input type="text" id="colCode" name="colCode" value="<c:out value='${codeShowDTO.colCode}'/>" size="20" style="width:60%;"  />    </td>
  </tr>
  <tr>
    <th width="69"><div align="left">要素名称</div></th>
    <td><input id="colName" type="text" name="colName" value="<c:out value='${codeShowDTO.colName}'/>" size="10" style="width:60%;"  /></td>
  </tr>
  <tr>    
</table>
</div>
<FONT color="red"><c:out value='${ErrorEessage}'/></FONT>
<input type="hidden" name="checkmenuid" id = "系统ID" value="<c:out value='${checkmenuid}'/>"/>
<input type="hidden" id="mehtod" name="method" value="">
</form>

<br/>


<div style="float:right;">
      <input type="button" name="Submit" value="保存并继续"  onclick="saveAndGo()"  class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/>
      <input type="button" name="add" value="保存并返回"  onclick="saveAndReturn()"  class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'" />
      <input type="button" name="exit" value="返回"  onclick="location.href='/common/codeShowManage/addQueryList.do?checkmenuid=<c:out value='${checkmenuid}'/>'" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/>
</div>
</body>
</html>
<script type="text/javascript">
//保存并继续
function saveAndGo(){
 if(checkNull()){
       document.getElementById("method").value="comeOn"
       var url = "/common/codeShowManage/addOwnerCodeDone.do";
       document.forms[0].action=url;
       document.forms[0].submit();
     }
}

//保存后返回
 function  saveAndReturn(){
     if(checkNull()){
         document.getElementById("method").value="saveThenReturn"
         var url = "/common/codeShowManage/addOwnerCodeDone.do";
         document.forms[0].action=url;
         document.forms[0].submit();
     }
 }

//验证非空字段
    function checkNull(){
       var colCode = document.addMainSet.colCode.value;
       var colName = document.addMainSet.colName.value;
      if(colCode==""){
        alert("要素编码不能为空,请填写！");
        return false;
      }
      if(colName ==""){
         alert("要素名称名称不能为空,请填写！");
         return false;
      }
      return true;

}
if('<%=request.getParameter("status")%>' == 1 ){
	window.opener.getsubmenu(document.addMainSet.checkmenuid.value);
}

</script>