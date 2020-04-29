<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ page import="java.util.List"%>

<HTML >
 <HEAD>

  <TITLE>添加功能按钮页面配置</TITLE>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
<link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=request.getContextPath()%>/style/stylefontS.css" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_LOGO%>_logo.css"/>
<script type="text/javascript" src="../../js/prototype.js"></script>
<script type="text/javascript" src="../../js/jquery-1[1].3.1.js"></script>
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
      <div>添加功能按钮页面配置</div>
    </li>
  </ul>
</div>


<form name="addFunctionButton" method="post">


 <div id="edit_table" style="width:98%" >
 <table border="1">
  <tr>
    <th width="74" height="31">显示名称</th>
    <td width="142"><input type="text" name="name" size="20"value="<c:out value='${functionButtonDTO.name}'/>" /></td>
    <th width="71">是否可见</th>
    <td width="293">
    <select name="isVisible">
      <option value="1">可见</option>
      <option value="0">不可见</option>
    </select></td>
  </tr>
  <tr>
    <th height="42">属性HTML</th>
    <td colspan="3"><textarea name="nameThml" cols="70" rows="5"><c:out value='${functionButtonDTO.nameThml}'/></textarea></td>
   </tr>
  <tr>
    <th height="44">JS配置</th>
    <td colspan="3"><textarea name="js" cols="70" rows="3"><c:out value='${functionButtonDTO.js}'/></textarea></td>
   </tr>
  <tr>
    <th height="32">显示顺序</th>
    <td colspan="3"><input  id="check" type="text" name="orderNum"   value="<c:out value='${functionButtonDTO.orderNum}'/>" size="15" /></td>
  </tr>
  <tr>
    <th height="32">所属位置</th>
    <td colspan="3"><input  id="check" type="text" name="scope"   value="<c:out value='${scope}'/>" size="15" readOnly/></td>
  </tr>
  <tr>
    <th height="32">右键菜单显示</th>
    <td colspan="3" >
    	<select name="rightMenu" style="width:100px;">
    		<option value="0">否</option>
    		<option value="1">是</option>
    	</select>
    </td>
  </tr>
  <tr>
    <th height="32">分配角色</th>
    <td colspan="3"><textarea name="funcRight" cols="70" rows="2"><c:out value='${functionButtonDTO.funcRight}'/></textarea></td>
  </tr>

<%
	List tabList = (List)request.getAttribute("tabList");
  	if(tabList !=null && tabList.size()>0){
%>
 	<tr id="tabTr">
  		<th height="32">归属页签</th>
	   <td>
	    <c:forEach var="tab" items="${tabList}" >
	    	<input type="checkbox" id="<c:out value="${tab.tabindex}"></c:out>"/>
	    	<c:out value="${tab.tabname}"></c:out>&nbsp;&nbsp;
	    </c:forEach>
	   </td>
	</tr>
<%} %>
   
</table>
</br>
<c:out value='${ErrorEessage}'/>
</div>

<input type="hidden" name="linkname" id ="linkname" value="<c:out value='${linkname}'/>"/>
<input type="hidden" id="mehtod" name="method" value=""/>
<input type="hidden" name="tabIndex" id="tabIndex"/>
</form>

<br/>

<div style="float:right;">
      <input type="button" name="Submit" value="保存并继续"  onclick="saveAndGo()"  class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/>
      <input type="button" name="add" value="保存并返回"  onclick="saveAndReturn()"  class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'" />
      <input type="button" name="exit" value="返回"  onclick="location.href='/system/ui/functionButtonList.do?linkname=<c:out value='${linkname}'/>&scope=<c:out value='${scope}'/>'" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/>
</div>
</body>
</html>
<script type="text/javascript">
//保存并继续
function saveAndGo() {
	if (checkNull()) {
		if (chenkInteger()) {
			document.getElementById("method").value = "comeOn"
			var url = "/system/ui/addFunctionButton.do";
			document.forms[0].action = url;
			if(JQ("#tabTr").length>0){
				JQ("#tabIndex").val(getTabIndex());
			}
			document.forms[0].submit();
		}
	}
}

//保存后返回
function saveAndReturn() {
	if (checkNull()) {
		if (chenkInteger()) {
			document.getElementById("method").value = "saveThenReturn"
			var url = "/system/ui/addFunctionButton.do";
			document.forms[0].action = url;
			if(JQ("#tabTr").length>0){
				JQ("#tabIndex").val(getTabIndex());
			}
			document.forms[0].submit();
		}
	}

}
//得到选中归属页签
function getTabIndex(){
	var tabIndex = "";
	var obj = JQ("#tabTr input:[checked]");
	for(var i=0;i<obj.length;i++){
		if(i>0)tabIndex = tabIndex+",";
		tabIndex = tabIndex +obj[i].id;
	}
	return tabIndex;
}
//验证非空字段
function checkNull() {
	var testNameThml = document.addFunctionButton.nameThml.value;
	var testColName = document.addFunctionButton.name.value;
	var testColOderNum = document.addFunctionButton.orderNum.value;
	if (testNameThml == "") {
		alert("按钮的HTML不能为空！");
		return false;
	}
	if (testColName == "") {
		alert("显示名称不能为空，请填写！");
		return false;
	}
	if (testColOderNum == "") {
		alert("属性显示顺序不能为空，请填写！");
		return false;
	}
	return true;

}



//输入整数的验证
function chenkInteger() {

	var inputValue = document.getElementById("check").value;
	var regex = /^[+-]?\d+$/;
	var result = regex.test(inputValue);
	if (!result) {
		alert("显示顺序必须为整数形式，请重新输入！");
		return false;
	}
	return true;
}
</script>




