
<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>

<HTML >
 <HEAD>

  <TITLE>��Ӳ�ѯ��������</TITLE>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
<link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=request.getContextPath()%>/style/stylefontS.css" />
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
      <div>��Ӳ�ѯ��������</div>
    </li>
  </ul>
</div>


<form name="addConditionList" method="post">
<input type="hidden" id="hid" value="<c:out value='${conditionDTO.colID}'/>"/>
<div id="edit_table" style="width:98%">
<table  border="1" id="tbl1" cellspacing="0" >
  <tr>
    <th nowrap="nowrap" width="15%"><div align="left">�ֶ���</div></th>
    <td >
       <select name="colId" onchange="aa(this)"> 
    </select> </td>
  </tr>
  <tr>
    <th nowrap="nowrap"><div align="left">��������</div></th>
    <td>
	<input type="text" id="colName" name="colName" size="20" style="width:60%;" value="<c:out value='${conditionDTO.colName}'/>"/></td>
  </tr>
  
  <tr>
    <th nowrap="nowrap">��ʾ˳��</th>
    <td><input id="check" type="text" name="orderNum" size="10" style="width:60%;" value="<c:out value='${conditionDTO.orderNum}'/>" /></td>
  </tr>
   <tr>
    <th nowrap="nowrap">��������</th>
    <td><input id="elementfilter" type="text" name="elementfilter" size="10" style="width:60%;" value="<c:out value='${conditionDTO.elementfilter}'/>" /></td>
  </tr>
  <tr>
    <th nowrap="nowrap">������ƹ���</th>
    <td><input id="inputrule" type="text" name="inputrule" size="10" style="width:60%;" value="<c:out value='${conditionDTO.inputrule}'/>" /></td>
  </tr>
  <!-- <tr>
    <th nowrap="nowrap">��������2</th>
    <td><input id="filterfield" type="text" name="filterfield" size="10" style="width:60%;" value="<c:out value='${conditionDTO.filterfield}'/>" /></td>
  </tr> -->
  <tr>
    <th nowrap="nowrap"><div align="left">�Ƿ����</div></th>
   <td><select name="isRequired">
      <option value="1">����</option>
      <option value="0">�Ǳ���</option>
      </select>
    </td>
  </tr>
  <tr>
    <th nowrap="nowrap"><div align="left">�Ƿ�ɼ�</div></th>
   <td><select name="isVisible">
      <option value="1">�ɼ�</option>
      <option value="0">���ɼ�</option>
      <option value="2">����</option>
      </select>
    </td>
  </tr>
  <tr>
	<th nowrap="nowrap">���ü�������</th>
	<td nowrap="nowrap">
		<select name="showLevelConfig">
      		<option value="1">��</option>
      		<option value="0">��</option>
      	</select>
    </td>
  </tr>  
  <tr>
    <th nowrap="nowrap"><div align="left">��ѯ����</div></th>
    <td><select name="type">
	        <option value="m"  <c:if test="${conditionDTO.type=='m'}">selected  </c:if>>��ѡ</option>
	        <option value="s"  <c:if test="${conditionDTO.type=='s'}">selected  </c:if>>��ѡ</option>
	        <option value="si"  <c:if test="${conditionDTO.type=='si'}">selected  </c:if>>��ѡ����</option>
	        <option value="selecti"  <c:if test="${conditionDTO.type=='selecti'}">selected  </c:if>>��������</option>
	        <option value="t"  <c:if test="${conditionDTO.type=='t'}">selected  </c:if>>�ı�</option>
	        <option value="amtinput"  <c:if test="${conditionDTO.type=='amtinput'}">selected  </c:if>>���</option>
	        <option value="dm" <c:if test="${conditionDTO.type=='dm'}">selected  </c:if>>������ѡ</option>
            <option value="ds" <c:if test="${conditionDTO.type=='ds'}">selected  </c:if>>������ѡ</option>
            <option value="sdm" <c:if test="${conditionDTO.type=='sdm'}">selected  </c:if>>�����ѡ</option>
            <option value="sds" <c:if test="${conditionDTO.type=='sds'}">selected  </c:if>>���㵥ѡ</option>
            <option value="inputtips" <c:if test="${conditionDTO.type=='inputtips'}">selected  </c:if>>�Զ�������ʾ</option>
			<option value="d" <c:if test="${conditionDTO.type=='d'}">selected  </c:if>>����</option>
			<option value="dym" <c:if test="${conditionDTO.type=='dym'}">selected  </c:if>>����(������)</option>
	        <option value="di" <c:if test="${conditionDTO.type=='di'}">selected  </c:if>>��������</option>
	        <option value="ni" <c:if test="${conditionDTO.type=='ni'}">selected  </c:if>>��������</option>
	        <option value="ti" <c:if test="${conditionDTO.type=='ti'}">selected  </c:if>>�ı�����</option>
	        <option value="select" <c:if test="${conditionDTO.type=='select'}">selected  </c:if>>�����˵�</option>
	        <option value="se" <c:if test="${conditionDTO.type=='se'}">selected  </c:if> >������Ȩ�޵�ѡ</option>
	        <option value="me" <c:if test="${conditionDTO.type=='me'}">selected  </c:if> >������Ȩ�޶�ѡ</option>
	        <option value="intree" <c:if test="${conditionDTO.type=='intree'}">selected  </c:if> >�Զ��嵯����</option>
	        <option value="program_m" <c:if test="${conditionDTO.type=='program_m'}">selected  </c:if> >��Ŀ��ѡ������</option>
      </select>
      </td>
  </tr>
  <tr>
    <th nowrap="nowrap" >Ĭ��ֵ</th>
    <td>
    	<div id="def">
    		<input id="defaultVal" type="text" name="defaultVal" size="10" style="width:60%;"/>
    	</div>
   	</td>
  </tr>
  <tr>
    <th nowrap="nowrap" >��������</th>
    <td><input id="belongType" type="text" name="belongType" size="10" style="width:60%;" value="<c:out value='${conditionDTO.belongType}'/>" /></td>
  </tr>
  <tr>
		<th nowrap="nowrap">
				�Զ��庯���¼�
		</th>
			<td nowrap="nowrap" >
			   <textarea rows="5" cols="" style="width:60%;text-align:left;" name="jsFunction"  ></textarea>
			</td>
		</tr>
</table>
  <br/>
<c:out value='${ErrorEessage}'/>  
<input type="hidden" name="linkname" id = "linkname" value="<c:out value='${linkname}'/>"/>
<input type="hidden" name="vouchTypeCode" id = "vouchTypeCode" value="<c:out value='${vouchTypeCode}'/>"/>
<input type="hidden" id="mehtod" name="method" value=""/>  
  
</from>  
</div>
<div style="float:right;">
      <input type="button" name="Submit" value="���沢����"  onclick="saveAndGo()"  class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/>
      <input type="button" name="add" value="���沢����"  onclick="saveAndReturn()"  class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'" />
      <input type="button" name="exit" value="����"  onclick="location.href='/system/ui/conditionList.do?linkname=<c:out value='${linkname}'/>&vouchTypeCode=<c:out value='${vouchTypeCode}'/>'" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/>
</div>
</body>
</html>
<script type="text/javascript">
var defobj = document.getElementById("tbl1").childNodes[0].childNodes[10];
var definp = document.getElementById("defaultVal");
var selobj = document.getElementById("type");
// ����ʱ�д�����Ϣ����ʱ��Ĭ��ֵ���ܹ���ʾǰһ��ѡ��ֵ
var defVal= '<c:out value='${conditionDTO.defaultVal}'/>';
definp.onblur = function(){
	if(definp.value==""){
		return;	
	}		
	if(selobj.value == "select"&& defobj.style.display == "block"){
		checkDef(definp.value);	
	}
}
// ��������Ĭ��ֵ����
selobj.onchange = function() {
	var def = document.getElementById("def");
	var val = {noday:"",yearfirstday:"�����һ��",now:"��ǰ����",firstday:"���µ�һ��",lastday:"�������һ��"};
	if (this.value == "d") {
		// ����
		var newSelect = document.createElement("<select name='defaultVal'>");
		for (var pro in val) {
			var oval = pro == "noday" ? "" : pro;
			var txt = val[pro];
			var opt = new Option(txt, oval);
			newSelect.options.add(opt);
		}
		def.innerHTML = newSelect.outerHTML;
	} else if (this.value == "di") { 
	 	// �����ڼ�
		var firstSelect = document.createElement("<select name='firstdefault'>");
		var lastSelect = document.createElement("<select name='lastdefault'>");
		firstSelect.style.width = lastSelect.style.width = 125+"px";
		for (var pro in val) {
			var oval = pro == "noday" ? "" : pro;
			var txt = val[pro];
			var firstOpt��= null, lastOpt = null;
			if (pro != "lastday") {
				firstOpt = new Option(txt, oval);
				firstSelect.options.add(firstOpt);
			}
			if (pro != "yearfirstday" && pro != "firstday") {
				lastOpt = new Option(txt, oval);
				lastSelect.options.add(lastOpt);
			}
		}
		var divArr = [];
		divArr.push("<div>��ʼ����:", firstSelect.outerHTML, "��������:", lastSelect.outerHTML);
		def.innerHTML = divArr.join("");
	} else {
		def.innerHTML = '<input id="defaultVal" type="text" name="defaultVal" size="10" style="width:60%;"/>';
	}
}
// ����Ĭ��ֵ�Ĵ���
if (selobj.value != "d" && selobj.value != "di" && definp != null && defVal != null) {
	definp.value = defVal;
} else {
	selobj.fireEvent("onchange");
}

//У��Ĭ��ֵ��ʽ
function checkDef(def){
   if(def.indexOf('|')<0||def==undefined ||def==null) 
      alert('������Ĳ˵�ѡ���ʽ���ԣ�');
      return;
}

//���沢����
function saveAndGo(){
	if(checkNull()){
       if(chenkInteger()){
	       document.getElementById("method").value="comeOn"
	       var url = "/system/ui/addCondition.do";
	       document.forms[0].action=url;
	       document.forms[0].submit();	
       }
	}
}

//����󷵻�
 function  saveAndReturn(){
     if(checkNull()){
        if(chenkInteger()){
         document.getElementById("method").value="saveThenReturn"
         var url = "/system/ui/addCondition.do";
         document.forms[0].action=url;
         document.forms[0].submit();
        }
     }
}

//��֤�ǿ��ֶ�
function checkNull(){
	var testColId = document.addConditionList.colId.value;
	var testColName = document.addConditionList.colName.value;
	var testColOderNum = document.addConditionList.orderNum.value;
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

var element= <%=request.getAttribute("nameStr")%>;
if(element!=null && element.length>0){
	for(var i = 0;i< element.length;i++){
		var oOption = document.createElement("OPTION");
		oOption.text=element[i].code+"-"+element[i].name;
		oOption.value=element[i].code;
		if(i==0){
			document.getElementById("colName").value =element[0].name;
		}
		//oOption.valueid = "'"+element[i].name +"'";
		oOption.onclick = function(){
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