<%@ page language="java" contentType="text/html; charset=GBK"
	pageEncoding="GBK" import="java.util.*"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>

<HTML >
 <HEAD>

  <TITLE>�޸Ĺ��ܰ�ťҳ������</TITLE>
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
      <div>�޸Ĺ��ܰ�ťҳ������</div>
    </li>
  </ul>
</div>


 <div id="edit_table" style="width:98%">
 <table border="1">
  <tr>
    <th width="74" height="31">��ʾ���ƣ�</th>
    <td width="142"><input name="name" type="text" value="<c:out value='${functionButtonDTO.name}'/>" size="20" /></td>
    <th width="71">�Ƿ�ɼ���</th>
	   <c:if test="${functionButtonDTO.isVisible=='1'}">
	    <td width="293">
	    	<select name="isVisible">
	        	<option value="1" selected>�ɼ�</option>
	        	<option value="0" >���ɼ�</option>
	        </select>
	    </td>
	  </c:if>
	  <c:if test="${functionButtonDTO.isVisible=='0'}">
	    <td width="293">
	    <select name="isVisible">
	        	<option value="1" >�ɼ�</option>
	        	<option value="0" selected>���ɼ�</option>
	        </select>
	    </td>
	  </c:if>
  </tr>
  <tr>
    <th height="42">����HTML��</th>
    <td colspan="3"><textarea name="nameThml" cols="70" rows="5"><c:out value='${functionButtonDTO.nameThml}'/></textarea></td>
   </tr>
  <tr>
    <th height="44">JS���ã�</th>
    <td colspan="3"><textarea name="js" cols="70" rows="3"><c:out value='${functionButtonDTO.js}'/></textarea></td>
  </tr>
  <tr>
    <th height="32">��ʾ˳��</th>
    <td colspan="3"><input id="check" type="text" name="orderNum"  value="<c:out value='${functionButtonDTO.orderNum}'/>"  size="10"/></td>
  </tr>
  <tr>
    <th height="32">����λ�ã�</th>
    <td colspan="3"><input id="scope" type="text" name="scope"  value="<c:out value='${functionButtonDTO.scope}'/>"  size="10" readOnly/></td>
  </tr>
  <tr>
    <th height="32">�Ҽ��˵���ʾ��</th>
    <td colspan="3">
    	<select name="rightMenu" style="width:100px;">
    		<option value="1"
				<c:if test="${functionButtonDTO.rightMenu=='1'}"> selected </c:if>>
				��
			</option>
			<option value="0"
				<c:if test="${functionButtonDTO.rightMenu!=1}"> selected </c:if>>
				��
			</option>
    	</select>
    </td>
  </tr>
  <tr>
    <th height="32">�����ɫ</th>
    <td colspan="3"><textarea name="funcRight" cols="70" rows="2"><c:out value='${functionButtonDTO.funcRight}'/></textarea></td>
  </tr>
<%
	List tabList = (List)request.getAttribute("tabList");
  	if(tabList !=null && tabList.size()>0){
%>
 	<tr id="tabTr">
  		<th height="32">����ҳǩ</th>
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
    <input type="button" name="add" value="����" onclick="modifyData()"  class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'" />
    <input type="button" name="exit" value="����" onclick="location.href='/system/ui/functionButtonList.do?linkname=<c:out value='${functionButtonDTO.linkName}'/>&scope=<c:out value='${functionButtonDTO.scope}'/>'" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/>
</div>

</body>
</html>
<script type="text/javascript">
	//�����ҳǩ����ѡ��
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
   //��֤�ǿ��ֶ�
    function checkNull(){
       var testNameThml = document.oneFunctionButton.nameThml.value;
       var testColName = document.oneFunctionButton.name.value;
       var testColOderNum = document.oneFunctionButton.orderNum.value;
      if(testNameThml==""){
        alert("��ť��HTML����Ϊ�գ�");
        return false;
      }
      if(testColName ==""){
         alert("��ʾ���Ʋ���Ϊ�գ�����д��");
         return false;
      }
       if(testColOderNum ==""){
         alert("������ʾ˳����Ϊ�գ�����д��");
         return false;
      }
      return true;
}
  //�����޸�
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
   //������������֤ 
   function chenkInteger(){
      var inputValue = document.getElementById("check").value;
	  var regex = /^[+-]?\d+$/;
      var result = regex.test(inputValue);
	  if(!result){
	     alert("��ʾ˳�����Ϊ������ʽ�����������룡");
		 return false;
	  }
	  return true;
   }
   //�õ�ѡ�й���ҳǩ
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




