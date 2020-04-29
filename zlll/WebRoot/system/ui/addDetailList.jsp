
<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>

<HTML >
 <HEAD>

  <TITLE>添加子单显示属性</TITLE>
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
      <div>添加子单显示属性</div>
    </li>
  </ul>
</div>


<form name="addDetailSet" method="post">
<input type="hidden" id="hid" value="<c:out value='${detailSetDTO.colID}'/>"/>
 <div id="edit_table" style="width:98%">
<table width="664" border="1" >
  <tr>
    <th width="139" height="27"><div align="left">字段名</div></th>
    <td>
	 <select name="colId" onchange="aa(this)" >
     </select>
         </td>
  </tr>
  <tr>
    <th width="139"><div align="left">中文名称</div></th>
	<td><input type="text" name="colName" size="20" style="width:60%;"   value="<c:out value='${detailSetDTO.colName}'/>"/></td>
  </tr>
  <tr>
    <th width="69"><div align="left">显示次序</div></th>
    <td><input id="check" type="text" name="orderNum" size="10" style="width:60%;" value="<c:out value='${detailSetDTO.orderNum}'/>"/></td>
  </tr>
  <tr>    
    <th width="81"><div align="left">是否可见</div></th>
    <td><select name="isVisible">
		  
		      <option value="1">可见</option>
		      <option value="0">不可见</option>
		 
       </select>
  
    </td>
  </tr>
  <tr>
	    <th width="91"><div align="left">是否可编辑</div></th>
	    <td>
		    <select name="isEdit">
			<option value="1">是</option>
			<option value="0">否</option>
			</select>
		</td>
  </tr>
  <tr>
	    <th width="91"><div align="left">必填</div></th>
	    <td>
		    <select name="requirement">
			<option value="0">否</option>
			<option value="1">是</option>
			</select>
		</td>
  </tr>
  <tr>    
    <th width="105">字段性质</th>
    <td>
    <select  name="isSourse" onchange="showInputRule(this)">
	      <option value="0">无来源数据</option>
	      <option value="1">有来源数据</option>
	      <option value="2">大文本(折行处理)</option>
	      <option value="3">金额</option>
	      <option value="4">数值</option>
	      <option value="5">日期(对lastupdatetime 进行特殊处理)</option>
	      <option value="20">日期(含年月)</option>
	      <option value="6">字符串(不做折行处理)</option>
	      <option value="7">可编辑弹出树(输入控制)</option>
	      <option value="8">可编辑弹出树(末级控制、输入控制)</option>
	      <option value="9">可编辑弹出树(显示一级、输入控制)</option>
	      <option value="10">可编辑弹出树(显示二级、输入控制)</option>
	      <option value="11">可编辑弹出树(显示一级、末级控制、输入控制)</option>
	      <option value="12">可编辑弹出树(显示二级、末级控制、输入控制)</option>
	      <option value="13">可编辑弹出树(控制显示至一级、输入控制)</option>
	      <option value="14">可编辑弹出树(控制显示至二级、输入控制)</option>
	      <option value="15">可编辑弹出树(控制显示至一级、末级控制、输入控制)</option>
	      <option value="16">可编辑弹出树(控制显示至二级、末级控制、输入控制)</option>
	      <option value="19">可编辑弹出树(末级控制、输入控制、顺向细化)</option>
	      <option value="17">大文本</option>
	      <option value="18">下拉列表</option>

       </select>
     
     </td>
  </tr>
  <tr id="inputruletr" style="display:none">
    <th><div align="left">数值格式化</div></th>
    <td>
		<select name="inputRule">
		  <option value=""></option>
		  <option value="#,##0.######">正常(#,##0.######)</option>
		  <option value="#,##0">整数(#,##0)</option>
	      <option value="#,##0.00">保留两位小数(#,##0.00)</option>
	      <option value="#,##0.0000">保留四位小数(#,##0.0000)</option>
	      <option value="#,##0.000000">保留六位小数(#,##0.000000)</option>
       </select>
	</td>
  </tr>
    <tr id="showTotal"  style="display:none">
	<th><div align="left">是否合计</div></th>
	<td>
	   <select name="showTotal"> 
	     <option value="0"></option>
	     <option value="1">是</option>
	     <option value="0">否</option>
	  </select>
	</td>
</tr>
  <tr id="isTotal" style="display:none">
	<th><div align="left">编辑合计</div></th>
	<td>
       <select name="isTotal"> 
          <option value=""></option>
          <option value="1">是</option>
          <option value ="0">否</option>
		</select>
	</td>
 </tr>
   <tr>
  <th nowrap="nowrap">
		级联控制
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
      <input type="button" name="Submit" value="保存并继续"  onclick="saveAndGo()"  class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/>
      <input type="button" name="add" value="保存并返回"  onclick="saveAndReturn()"  class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'" />
      <input type="button" name="exit" value="返回"  onclick="location.href='/system/ui/detailSetList.do?linkname=<c:out value='${linkname}'/>&type=<c:out value='${param.type}'/>'" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/>
</div>
</body>
</html>
<script type="text/javascript">
 //弹出页面选择级联控制
	function onchangeshowconfig(value){
		var columncode = document.addDetailSet.colId.value;
	   	var linkname = document.getElementById("linkname").value;
	   	window.open("<%=request.getContextPath()%>/system/ui/showlevelconfiglist.do?linkname="+linkname+'&dbcuname='+columncode+'&value='+value,"_blank","height=500,width=300,status=yes,scrollbars=yes,toolbar=no,menubar=no,location=no");
	}  
	function returnresult(obj){
	 document.getElementById("showid").value = obj.value;
	  document.getElementById("showid").valueid = obj.valueid;
	}
//保存并继续
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

//保存后返回
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

//验证非空字段
    function checkNull(){
       var testColId = document.addDetailSet.colId.value;
       var testColName = document.addDetailSet.colName.value;
       var testColOderNum = document.addDetailSet.orderNum.value;
      if(testColId==""){
        alert("属性编码不能为空！");
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

//显示数值格式化
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
