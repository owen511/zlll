
<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>

<HTML >
 <HEAD>

  <TITLE>����ӵ���ʾ����</TITLE>
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
      <div>����ӵ���ʾ����</div>
    </li>
  </ul>
</div>


<form name="addDetailSet" method="post">
<input type="hidden" id="hid" value="<c:out value='${detailSetDTO.colID}'/>"/>
 <div id="edit_table" style="width:98%">
<table width="664" border="1" >
  <tr>
    <th width="139" height="27"><div align="left">�ֶ���</div></th>
    <td>
	 <select name="colId" onchange="aa(this)" >
     </select>
         </td>
  </tr>
  <tr>
    <th width="139"><div align="left">��������</div></th>
	<td><input type="text" name="colName" size="20" style="width:60%;"   value="<c:out value='${detailSetDTO.colName}'/>"/></td>
  </tr>
  <tr>
    <th width="69"><div align="left">��ʾ����</div></th>
    <td><input id="check" type="text" name="orderNum" size="10" style="width:60%;" value="<c:out value='${detailSetDTO.orderNum}'/>"/></td>
  </tr>
  <tr>    
    <th width="81"><div align="left">�Ƿ�ɼ�</div></th>
    <td><select name="isVisible">
		  
		      <option value="1">�ɼ�</option>
		      <option value="0">���ɼ�</option>
		 
       </select>
  
    </td>
  </tr>
  <tr>
	    <th width="91"><div align="left">�Ƿ�ɱ༭</div></th>
	    <td>
		    <select name="isEdit">
			<option value="1">��</option>
			<option value="0">��</option>
			</select>
		</td>
  </tr>
  <tr>
	    <th width="91"><div align="left">����</div></th>
	    <td>
		    <select name="requirement">
			<option value="0">��</option>
			<option value="1">��</option>
			</select>
		</td>
  </tr>
  <tr>    
    <th width="105">�ֶ�����</th>
    <td>
    <select  name="isSourse" onchange="showInputRule(this)">
	      <option value="0">����Դ����</option>
	      <option value="1">����Դ����</option>
	      <option value="2">���ı�(���д���)</option>
	      <option value="3">���</option>
	      <option value="4">��ֵ</option>
	      <option value="5">����(��lastupdatetime �������⴦��)</option>
	      <option value="20">����(������)</option>
	      <option value="6">�ַ���(�������д���)</option>
	      <option value="7">�ɱ༭������(�������)</option>
	      <option value="8">�ɱ༭������(ĩ�����ơ��������)</option>
	      <option value="9">�ɱ༭������(��ʾһ�����������)</option>
	      <option value="10">�ɱ༭������(��ʾ�������������)</option>
	      <option value="11">�ɱ༭������(��ʾһ����ĩ�����ơ��������)</option>
	      <option value="12">�ɱ༭������(��ʾ������ĩ�����ơ��������)</option>
	      <option value="13">�ɱ༭������(������ʾ��һ�����������)</option>
	      <option value="14">�ɱ༭������(������ʾ���������������)</option>
	      <option value="15">�ɱ༭������(������ʾ��һ����ĩ�����ơ��������)</option>
	      <option value="16">�ɱ༭������(������ʾ��������ĩ�����ơ��������)</option>
	      <option value="19">�ɱ༭������(ĩ�����ơ�������ơ�˳��ϸ��)</option>
	      <option value="17">���ı�</option>
	      <option value="18">�����б�</option>

       </select>
     
     </td>
  </tr>
  <tr id="inputruletr" style="display:none">
    <th><div align="left">��ֵ��ʽ��</div></th>
    <td>
		<select name="inputRule">
		  <option value=""></option>
		  <option value="#,##0.######">����(#,##0.######)</option>
		  <option value="#,##0">����(#,##0)</option>
	      <option value="#,##0.00">������λС��(#,##0.00)</option>
	      <option value="#,##0.0000">������λС��(#,##0.0000)</option>
	      <option value="#,##0.000000">������λС��(#,##0.000000)</option>
       </select>
	</td>
  </tr>
    <tr id="showTotal"  style="display:none">
	<th><div align="left">�Ƿ�ϼ�</div></th>
	<td>
	   <select name="showTotal"> 
	     <option value="0"></option>
	     <option value="1">��</option>
	     <option value="0">��</option>
	  </select>
	</td>
</tr>
  <tr id="isTotal" style="display:none">
	<th><div align="left">�༭�ϼ�</div></th>
	<td>
       <select name="isTotal"> 
          <option value=""></option>
          <option value="1">��</option>
          <option value ="0">��</option>
		</select>
	</td>
 </tr>
   <tr>
  <th nowrap="nowrap">
		��������
	</th>
	<td nowrap="nowrap">
		<input type="text" name="showlevelconfig"
			class="main_lookup_input" id='showid' style="width:60%;" size="14" value="<c:out value='${mainListSetDTO.showlevelconfig}' />"/>
			<button  class="t_btn" onclick="onchangeshowconfig(showid.valueid)" />
	</td>
	</tr>
</table>
<c:out value='${ErrorEessage}'/>
</div>

<input type="hidden" name="linkname" id = "linkname" value="<c:out value='${linkname}'/>"/>
<input type="hidden" name="type" id = "type" value="<c:out value='${param.type}'/>"/>
<input type="hidden" id="mehtod" name="method" value=""/>
</form>

<br/>

<div style="float:right;">
      <input type="button" name="Submit" value="���沢����"  onclick="saveAndGo()"  class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/>
      <input type="button" name="add" value="���沢����"  onclick="saveAndReturn()"  class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'" />
      <input type="button" name="exit" value="����"  onclick="location.href='/system/ui/detailSetList.do?linkname=<c:out value='${linkname}'/>&type=<c:out value='${param.type}'/>'" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/>
</div>
</body>
</html>
<script type="text/javascript">
 //����ҳ��ѡ��������
	function onchangeshowconfig(value){
		var columncode = document.addDetailSet.colId.value;
	   	var linkname = document.getElementById("linkname").value;
	   	window.open("<%=request.getContextPath()%>/system/ui/showlevelconfiglist.do?linkname="+linkname+'&dbcuname='+columncode+'&value='+value,"_blank","height=500,width=300,status=yes,scrollbars=yes,toolbar=no,menubar=no,location=no");
	}  
	function returnresult(obj){
	 document.getElementById("showid").value = obj.value;
	  document.getElementById("showid").valueid = obj.valueid;
	}
//���沢����
function saveAndGo(){
 if(document.getElementById("showid").valueid!=null){
     document.getElementById("showid").value = document.getElementById("showid").valueid;
  }
 if(checkNull()){
       if(chenkInteger()){
       document.getElementById("method").value="comeOn"
       var url = "/system/ui/addDetailListSet.do";
       document.forms[0].action=url;
       document.forms[0].submit();
       }
 }
}

//����󷵻�
 function  saveAndReturn(){
 	if(document.getElementById("showid").valueid!=null){
     document.getElementById("showid").value = document.getElementById("showid").valueid;
    }
     if(checkNull()){
        if(chenkInteger()){
         document.getElementById("method").value="saveThenReturn"
         var url = "/system/ui/addDetailListSet.do";
         document.forms[0].action=url;
         document.forms[0].submit();
        }
     }
 
 }

//��֤�ǿ��ֶ�
    function checkNull(){
       var testColId = document.addDetailSet.colId.value;
       var testColName = document.addDetailSet.colName.value;
       var testColOderNum = document.addDetailSet.orderNum.value;
      if(testColId==""){
        alert("���Ա��벻��Ϊ�գ�");
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

//��ʾ��ֵ��ʽ��
function showInputRule(the){
	if(the.options[the.selectedIndex].value == "4"){
		 document.getElementById("inputruletr").style.display = "block";
	}else{
		 document.getElementById("inputruletr").style.display = "none";
	}
	if(the.options[the.selectedIndex].value == "4"||the.options[the.selectedIndex].value == "3"){
		 document.getElementById("showTotal").style.display = "block";
		 document.getElementById("isTotal").style.display = "block";
	}else{
		 document.getElementById("showTotal").style.display = "none";
		 document.getElementById("isTotal").style.display = "none";
	}
}

</script>

<script>
				var element= <%=request.getAttribute("nameStr")%>;
				var colid = document.getElementById("hid").value;
				if(element!=null && element.length>0){
					for(var i = 0;i< element.length;i++){
						var oOption = document.createElement("OPTION");
						oOption.text=element[i].code+"-"+element[i].name;
						oOption.value=element[i].code;
						//oOption.valueid = "'"+element[i].name +"'";
						oOption.onclick = function(){
							debugger;
							document.getElementById("colName").value = "'"+element[i].name +"'";			
						}
						document.getElementById("colId").add(oOption);
						if(element[i].code == document.getElementById("hid").value){
						  oOption.selected = true;
						}
					}
				}
				function aa(obj){
					//debugger;
					document.getElementById("colName").value=element[obj.selectedIndex].name;
				}
			</script>
