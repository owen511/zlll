
<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>

<HTML >
 <HEAD>

  <TITLE>�޸�������ʾ����</TITLE>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
<link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=request.getContextPath()%>/style/stylefontS.css" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_LOGO%>_logo.css"/>


 </HEAD>

<body>
<form name="addMainSet" method="post">
<input type="hidden" id="col" value="<c:out value='${mainListSet.colID}'/>"/>
<div id="form_table_title" style="margin-right:20px;">
  <ul>
    <li class="top">
      <div>�޸�������ʾ����</div>
    </li>
  </ul>
</div>


 
<div id="edit_table" style="width:98%">
<table width="664" border="1">
  <tr>
    <th width="139" height="27"><div align="left">�ֶ���</div></th>
    <td>
    <select name="colId" onchange="aa(this)" id='dbcuname' style="width:60%;">
							</select></td>
  </tr>
  <tr>
    <th width="139"><div align="left">��������</div></th>
	<td><input type="text" name="colName" size="20" style="width:60%;" value="<c:out value='${mainListSet.colName}'/>" />    </td>
  </tr>
  <tr>
    <th width="69"><div align="left">��ʾ����</div></th>
    <td><input type="text" id="check" name="orderNum" size="10" style="width:60%;" value="<c:out value='${mainListSet.orderNum}'/>"/></td>
  </tr>
  <tr>    
    <th width="81"><div align="left">�Ƿ�ɼ�</div></th>
    <td>
      <c:if test="${mainListSet.isVisible=='1'}">
        		<select name="isVisible">
	        	<option value="1" selected>�ɼ�</option>
	        	<option value="0" >���ɼ�</option>
	        	</select>
	   </c:if>
	    <c:if test="${mainListSet.isVisible=='0'}">
        		<select name="isVisible">
	        	<option value="1" >�ɼ�</option>
	        	<option value="0" selected>���ɼ�</option>
	        	</select>
	   </c:if>
      </td>
  </tr>
  <tr>
    <th width="91"><div align="left">�Ƿ�ɱ༭</div></th>
    <td>
    <c:if test="${mainListSet.isEdit=='0'}">
        		<select name="isEdit">
	        	<option value="1" >��</option>
	        	<option value="0" selected>��</option>
	        	</select>
	    </c:if>
       <c:if test="${mainListSet.isEdit=='1'}">
        		<select name="isEdit">
	        	<option value="1" selected>��</option>
	        	<option value="0" >��</option>
	        	</select>
	    </c:if>	
	</td>
  </tr>
  <tr>
    <th width="91"><div align="left">����</div></th>
    <td>
     	<select name="requirement">
	       	<option value="1" <c:if test="${mainListSet.requirement=='1'}">selected</c:if>>��</option>
	       	<option value="0" <c:if test="${mainListSet.requirement!='1'}">selected</c:if>>��</option>
       	</select>
	</td>
  </tr>
  <tr>    
    <th width="105">�ֶ�����</th>
    <td>
       <select  name="isSource" onchange="showInputRule(this)">
			      <option value="0" <c:if test="${mainListSet.isSource=='0'}">selected </c:if> >����Դ����</option>
			      <option value="1" <c:if test="${mainListSet.isSource=='1'}">selected </c:if>>����Դ����</option>
			      <option value="2" <c:if test="${mainListSet.isSource=='2'}">selected </c:if>>���ı�(���д���)</option>
			      <option value="3" <c:if test="${mainListSet.isSource=='3'}">selected </c:if>>���</option>
			      <option value="4" <c:if test="${mainListSet.isSource=='4'}">selected </c:if>>��ֵ</option>
			      <option value="5" <c:if test="${mainListSet.isSource=='5'}">selected </c:if>>����(��lastupdatetime �������⴦��)</option>
				  <option value="20" <c:if test="${mainListSet.isSource=='20'}">selected </c:if>>����(������)</option>
			      <option value="6" <c:if test="${mainListSet.isSource=='6'}">selected </c:if>>�ַ���(�������д���)</option>
			      <option value="7" <c:if test="${mainListSet.isSource=='7'}">selected </c:if>>�ɱ༭������(�������)</option>
			      <option value="8" <c:if test="${mainListSet.isSource=='8'}">selected </c:if>>�ɱ༭������(ĩ�����ơ��������)</option>
			      <option value="9" <c:if test="${mainListSet.isSource=='9'}">selected </c:if>>�ɱ༭������(��ʾһ�����������)</option>
			      <option value="10" <c:if test="${mainListSet.isSource=='10'}">selected </c:if>>�ɱ༭������(��ʾ�������������)</option>
			      <option value="11" <c:if test="${mainListSet.isSource=='11'}">selected </c:if>>�ɱ༭������(��ʾһ����ĩ�����ơ��������)</option>
			      <option value="12" <c:if test="${mainListSet.isSource=='12'}">selected </c:if>>�ɱ༭������(��ʾ������ĩ�����ơ��������)</option>
			      <option value="13" <c:if test="${mainListSet.isSource=='13'}">selected </c:if>>�ɱ༭������(������ʾ��һ�����������)</option>
			      <option value="14" <c:if test="${mainListSet.isSource=='14'}">selected </c:if>>�ɱ༭������(������ʾ���������������)</option>
			      <option value="15" <c:if test="${mainListSet.isSource=='15'}">selected </c:if>>�ɱ༭������(������ʾ��һ����ĩ�����ơ��������)</option>
			      <option value="16" <c:if test="${mainListSet.isSource=='16'}">selected </c:if>>�ɱ༭������(������ʾ��������ĩ�����ơ��������)</option>
			      <option value="19" <c:if test="${mainListSet.isSource=='19'}">selected </c:if>>�ɱ༭������(ĩ�����ơ�������ơ�˳��ϸ��)</option>
			      <option value="17" <c:if test="${mainListSet.isSource=='17'}">selected </c:if>>���ı�</option>
			      <option value="18" <c:if test="${mainListSet.isSource=='18'}">selected </c:if>>����</option>
	    </select>
	        	
       
    </td>
  </tr>
  <tr id="inputruletr" <c:if test="${mainListSet.isSource!='4'}">style="display:none"</c:if>>
    <th><div align="left">��ֵ��ʽ��</div></th>
    <td>
		<select name="inputRule">
		  <option value="" <c:if test="${mainListSet.inputRule==''}">selected </c:if> ></option>
		  <option value="#,##0.######" <c:if test="${mainListSet.inputRule=='#,##0.######'}">selected </c:if> >����(#,##0.######)</option>
		  <option value="#,##0" <c:if test="${mainListSet.inputRule=='#,##0'}">selected </c:if> >����(#,##0)</option>
	      <option value="#,##0.00" <c:if test="${mainListSet.inputRule=='#,##0.00'}">selected </c:if> >������λС��(#,##0.00)</option>
	      <option value="#,##0.0000" <c:if test="${mainListSet.inputRule=='#,##0.0000'}">selected </c:if> >������λС��(#,##0.0000)</option>
	      <option value="#,##0.000000" <c:if test="${mainListSet.inputRule=='#,##0.000000'}">selected </c:if> >������λС��(#,##0.000000)</option>
       </select>
	</td>
  </tr>
   <tr id="showTotal" <c:if test="${(mainListSet.isSource!='3')and(mainListSet.isSource!='4')}">style="display:none"</c:if>>
    <th><div align="left">�Ƿ�ϼ�</div></th>
    <td>
		<select name="showTotal">
		  <option value="1" <c:if test="${mainListSet.totalTag=='1'}">selected </c:if> >��</option>
		  <option value="0" <c:if test="${(mainListSet.totalTag=='')or(mainListSet.totalTag=='0')}">selected </c:if> >��</option>
       </select>
	</td>
  </tr>
  <tr id="isTotal"
						<c:if test="${(mainListSet.isSource!='3')and(mainListSet.isSource!='4')}">style="display:none"</c:if>>
						<th>
							<div align="left">
								�༭�ϼ�
							</div>
						</th>
						<td>
							<select name="isTotal">
								<option value="0"
									<c:if test="${mainListSet.isTotal==''}">selected </c:if>></option>
								<option value="1"
									<c:if test="${mainListSet.isTotal=='1'}">selected </c:if>>
									��
								</option>
								<option value="0"
									<c:if test="${mainListSet.isTotal=='0'}">selected </c:if>>
									��
								</option>
							</select>
						</td>
					</tr>
  <tr>
	<th  width="105">
		��������
	</th>
	<td nowrap="nowrap">
		<input type="text" style="width:60%;" name="showlevelconfig" size="14" id='showid'
			value="<c:out value='${mainListSet.showlevelconfig}'/>" />
		<button class="t_btn" onclick="onchangeshowconfig(showid.valueid)" />
	</td>
	</tr>
  </table>
  <c:out value='${ErrorEessage}'/>
  </div>


<input type="hidden" name="linkName" id ="linkName2" value="<c:out value='${mainListSet.linkName}'/>"> 
<input type="hidden" name="oldColId"  value="<c:out value='${mainListSet.colID}'/>"/>
</form>


<div id="confirm_exit_btn">
  <br/>
    <input type="button" name="add" value="����" onclick="modifyData()"  class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'" />
    <input type="button" name="exit" value="����" onclick="location.href='/system/ui/mainSetList.do?linkname=<c:out value='${mainListSet.linkName}'/>'" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/>
</div>

</body>
</html>
<script type="text/javascript">
	    //����ҳ��ѡ��������
	function onchangeshowconfig(value){
	
	 if(value == undefined){
	  value =document.getElementById("showid").value;
	 }
	  var columncode = document.getElementById("dbcuname").value;
      var linkname = document.getElementById("linkName2").value;
      window.open("<%=request.getContextPath()%>/system/ui/showlevelconfiglist.do?linkname="+linkname+'&dbcuname='+columncode+'&value='+value,"_blank","height=500,width=300,status=yes,scrollbars=yes,toolbar=no,menubar=no,location=no");
  } 
  function returnresult(obj){
   document.getElementById("showid").value = obj.value;
    document.getElementById("showid").valueid = obj.valueid;
  }
   //��֤�ǿ��ֶ�
    function checkNull(){
       var testColId = document.addMainSet.colId.value;
       var testColName = document.addMainSet.colName.value;
       var testColOderNum = document.addMainSet.orderNum.value;
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
  //�����޸�
  function modifyData(){
   if(document.getElementById("showid").valueid!=null){
      document.getElementById("showid").value = document.getElementById("showid").valueid;
     }
   if(checkNull()){
       if(chenkInteger()){
       
            var url = "/system/ui/modifyOneMainSet.do";
            
            document.forms[0].action=url;
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
				if(element!=null && element.length>0){
					for(var i = 0;i< element.length;i++){
						var oOption = document.createElement("OPTION");
						oOption.text=element[i].code+"-"+element[i].name;
						oOption.value=element[i].code;
						oOption.onclick = function(){
							document.getElementById("colName").value = "'"+element[i].name +"'";			
						}
						document.getElementById("colId").add(oOption);
						if(element[i].code == document.getElementById("col").value){
						  oOption.selected = true;
						  //document.getElementById("colName").value=element[i].name;
						}
					}
				}
				function aa(obj){
					//debugger;
					document.getElementById("colName").value=element[obj.selectedIndex].name;
				}
			</script>


