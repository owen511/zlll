<%@ page language="java" contentType="text/html; charset=GBK"
	pageEncoding="GBK" import="java.util.*"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>

<HTML >
 <HEAD>

  <TITLE>修改功能按钮页面配置</TITLE>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
<link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=request.getContextPath()%>/style/stylefontS.css" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_LOGO%>_logo.css"/>
<script type="text/javascript" src="../../js/prototype.js"></script>
<script type="text/javascript" src="../../js/jquery-1[1].3.1.js"></script>
<script type="text/javascript" src="../../js/choose.js"></script>
<script type="text/javascript" src="../../js/changescroll.js"></script>

 </HEAD>

<body>
<form name="oneFunctionButton" method="post">
<div id="form_table_title" style="margin-right:20px;">
  <ul>
    <li class="top">
      <div>修改功能按钮页面配置</div>
    </li>
  </ul>
</div>


 <div id="edit_table" style="width:98%">
 <table border="1">
  <tr>
    <th width="74" height="31">显示名称：</th>
    <td width="142"><input name="name" type="text" value="<c:out value='${functionButtonDTO.name}'/>" size="20" /></td>
    <th width="71">是否可见：</th>
	   <c:if test="${functionButtonDTO.isVisible=='1'}">
	    <td width="293">
	    	<select name="isVisible">
	        	<option value="1" selected>可见</option>
	        	<option value="0" >不可见</option>
	        </select>
	    </td>
	  </c:if>
	  <c:if test="${functionButtonDTO.isVisible=='0'}">
	    <td width="293">
	    <select name="isVisible">
	        	<option value="1" >可见</option>
	        	<option value="0" selected>不可见</option>
	        </select>
	    </td>
	  </c:if>
  </tr>
  <tr>
    <th height="42">属性HTML：</th>
    <td colspan="3"><textarea name="nameThml" cols="70" rows="5"><c:out value='${functionButtonDTO.nameThml}'/></textarea></td>
   </tr>
  <tr>
    <th height="44">JS配置：</th>
    <td colspan="3"><textarea name="js" cols="70" rows="3"><c:out value='${functionButtonDTO.js}'/></textarea></td>
  </tr>
  <tr>
    <th height="32">显示顺序：</th>
    <td colspan="3"><input id="check" type="text" name="orderNum"  value="<c:out value='${functionButtonDTO.orderNum}'/>"  size="10"/></td>
  </tr>
  <tr>
    <th height="32">所属位置：</th>
    <td colspan="3"><input id="scope" type="text" name="scope"  value="<c:out value='${functionButtonDTO.scope}'/>"  size="10" readOnly/></td>
  </tr>
  <tr>
    <th height="32">右键菜单显示：</th>
    <td colspan="3">
    	<select name="rightMenu" style="width:100px;">
    		<option value="1"
				<c:if test="${functionButtonDTO.rightMenu=='1'}"> selected </c:if>>
				是
			</option>
			<option value="0"
				<c:if test="${functionButtonDTO.rightMenu!=1}"> selected </c:if>>
				否
			</option>
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
<br/>
<c:out value='${ErrorEessage}'/>
</div>

<input type="hidden" name="linkName" value="<c:out value='${functionButtonDTO.linkName}'/>"> 
<input type="hidden" name="itemId"  value="<c:out value='${functionButtonDTO.itemId}'/>"/>
<input type="hidden" name="tabIndex" id="tabIndex"/>
</form>

<div id="confirm_exit_btn">
  <br/>
    <input type="button" name="add" value="保存" onclick="modifyData()"  class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'" />
    <input type="button" name="exit" value="返回" onclick="location.href='/system/ui/functionButtonList.do?linkname=<c:out value='${functionButtonDTO.linkName}'/>&scope=<c:out value='${functionButtonDTO.scope}'/>'" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/>
</div>

</body>
</html>
<script type="text/javascript">
	//如果有页签，将选中
	var tabNum = '<c:out value="${functionButtonDTO.tabindex}"/>';
	if(tabNum){
		if(tabNum.indexOf(",")>-1){
			var arr = tabNum.split(",");
			for(var i=0;i<arr.length;i++){
				JQ("#tabTr input:[id="+arr[i]+"]").attr("checked","true");
			}
		}else{
			JQ("#tabTr input:[id="+tabNum+"]").attr("checked","true");
		}
	}
   //验证非空字段
    function checkNull(){
       var testNameThml = document.oneFunctionButton.nameThml.value;
       var testColName = document.oneFunctionButton.name.value;
       var testColOderNum = document.oneFunctionButton.orderNum.value;
      if(testNameThml==""){
        alert("按钮的HTML不能为空！");
        return false;
      }
      if(testColName ==""){
         alert("显示名称不能为空，请填写！");
         return false;
      }
       if(testColOderNum ==""){
         alert("属性显示顺序不能为空，请填写！");
         return false;
      }
      return true;
}
  //保存修改
  function modifyData(){
   if(checkNull()){
       if(chenkInteger()){
           var url = "/system/ui/modifyOneFunctionButton.do";
           document.forms[0].action=url;
           if(JQ("#tabTr").length>0){
				JQ("#tabIndex").val(getTabIndex());
			}
           document.forms[0].submit();
       }
   }
}
   //输入整数的验证 
   function chenkInteger(){
      var inputValue = document.getElementById("check").value;
	  var regex = /^[+-]?\d+$/;
      var result = regex.test(inputValue);
	  if(!result){
	     alert("显示顺序必须为整数形式，请重新输入！");
		 return false;
	  }
	  return true;
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
</script>




