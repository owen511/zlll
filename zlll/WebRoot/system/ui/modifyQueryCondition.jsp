
<%@ page contentType="text/html; charset=GBK" %>
<%@page import="gov.mof.fasp.ifmis.system.ui.dto.ConditionListDTO"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>

<HTML >
 <HEAD>

  <TITLE>修改查询条件属性</TITLE>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
<link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=request.getContextPath()%>/style/stylefontS.css" />
<script type="text/javascript" src="../../js/prototype.js"></script>
<script type="text/javascript" src="../../js/prototype.js"></script>
<script type="text/javascript" src="../../js/choose.js"></script>
<script type="text/javascript" src="../../js/changescroll.js"></script>

 </HEAD>

<body>
<form name="oneQueryCondition" method="post">
<input type="hidden" id="hid" value="<c:out value='${conditionDTO.colID}'/>"/>
<div id="form_table_title" style="margin-right:20px;">
  <ul>
    <li class="top">
      <div>修改查询条件属性</div>
    </li>
  </ul>
</div>

 <div id="edit_table" style="width:98%">
<table  border="1" id="tbl1" cellspacing="0" >
  <tr>
    <th nowrap="nowrap" width="15%"><div align="left">字段名</div></th>
    <td ><select name="colId" onchange="aa(this)" style="width:60%;" > 
    </select> </td>
  </tr>
  <tr>
    <th nowrap="nowrap"><div align="left">中文名称</div></th>
    <td>
	<input type="text" id="colName" name="colName" size="20" style="width:60%;" value="<c:out value='${conditionDTO.colName}'/>"/>    </td>
  </tr>
  
  <tr>
    <th nowrap="nowrap">显示顺序</th>
    <td><input id="check" type="text" name="orderNum" size="10" style="width:60%;" value="<c:out value='${conditionDTO.orderNum}'/>" /></td>
  </tr> 
  <tr>
    <th nowrap="nowrap">过滤条件</th>
    <td><input id="elementfilter" type="text" name="elementfilter" size="10" style="width:60%;" value="<c:out value='${conditionDTO.elementfilter}'/>" /></td>
  </tr>
  <tr>
    <th nowrap="nowrap">输入控制规则</th>
    <td><input id="inputrule" type="text" name="inputrule" size="10" style="width:60%;" value="<c:out value='${conditionDTO.inputrule}'/>" /></td>
  </tr>
  <!-- <tr>
    <th nowrap="nowrap">过滤条件2</th>
    <td><input id="filterfield" type="text" name="filterfield" size="10" style="width:60%;" value="<c:out value='${conditionDTO.filterfield}'/>" /></td>
  </tr> -->
    <tr>
    <th nowrap="nowrap"><div align="left">是否必填</div></th>
   <td>
      <c:if test="${conditionDTO.isRequired=='1'}">
        		<select name="isRequired">
	        	<option value="1" selected>必填</option>
	        	<option value="0" >非必填</option>
	        	</select>
	   </c:if>
	    <c:if test="${conditionDTO.isRequired=='0'}">
        		<select name="isRequired">        		
	        	<option value="1" >必填</option>
	        	<option value="0" selected>非必填</option>
	        	
	        	</select>
	   </c:if>
    </td>
  </tr>
  
  <tr>
    <th nowrap="nowrap"><div align="left">是否可见</div></th>
   <td>
      <c:if test="${conditionDTO.isVisible=='1'}">
        		<select name="isVisible">
        		<option value="2" >隐藏</option>
	        	<option value="1" selected>可见</option>
	        	<option value="0" >不可见</option>
	        	</select>
	   </c:if>
	    <c:if test="${conditionDTO.isVisible=='0'}">
        		<select name="isVisible">
        		<option value="2" >隐藏</option>
	        	<option value="1" >可见</option>
	        	<option value="0" selected>不可见</option>
	        	</select>
	   </c:if>
   	  <c:if test="${conditionDTO.isVisible=='2'}">
        		<select name="isVisible">
	        	<option value="1" >可见</option>
	        	<option value="0" >不可见</option>
	        	<option value="2" selected>隐藏</option>
	        	</select>
	  </c:if>
    </td>
  </tr>
  <tr>
		<th nowrap="nowrap">启用级联控制</th>
		<td nowrap="nowrap">
			<select name="showLevelConfig">
      			<option value="1">是</option>
      			<option value="0">否</option>
      		</select>
		</td>      
  </tr> 
  <tr>
    <th nowrap="nowrap"><div align="left">查询类型</div></th>
    <td>
        
        		 <select name="type">
			        <option value="m"  <c:if test="${conditionDTO.type=='m'}">selected  </c:if>>多选</option>
			        <option value="s"  <c:if test="${conditionDTO.type=='s'}">selected  </c:if>>单选</option>
			        <option value="si"  <c:if test="${conditionDTO.type=='si'}">selected  </c:if>>单选区间</option>
			        <option value="selecti"  <c:if test="${conditionDTO.type=='selecti'}">selected  </c:if>>下拉区间</option>
			        <option value="t"  <c:if test="${conditionDTO.type=='t'}">selected  </c:if>>文本</option>
			        <option value="amtinput"  <c:if test="${conditionDTO.type=='amtinput'}">selected  </c:if>>金额</option>
			        <option value="dm" <c:if test="${conditionDTO.type=='dm'}">selected  </c:if>>下拉多选</option>
                    <option value="ds" <c:if test="${conditionDTO.type=='ds'}">selected  </c:if>>下拉单选</option>
                    <option value="sdm" <c:if test="${conditionDTO.type=='sdm'}">selected  </c:if>>单层多选</option>
                    <option value="sds" <c:if test="${conditionDTO.type=='sds'}">selected  </c:if>>单层单选</option>
                    <option value="inputtips" <c:if test="${conditionDTO.type=='inputtips'}">selected  </c:if>>自动下拉提示</option>
			        <option value="d" <c:if test="${conditionDTO.type=='d'}">selected  </c:if>>日期</option>
			        <option value="dym" <c:if test="${conditionDTO.type=='dym'}">selected  </c:if>>日期(含年月)</option>
			        <option value="di" <c:if test="${conditionDTO.type=='di'}">selected  </c:if>>日期区间</option>
			        <option value="ni" <c:if test="${conditionDTO.type=='ni'}">selected  </c:if>>数字区间</option>
			        <option value="ti" <c:if test="${conditionDTO.type=='ti'}">selected  </c:if>>文本区间</option>
			        <option value="select" <c:if test="${conditionDTO.type=='select'}">selected  </c:if>>下拉菜单</option>
			        <option value="se" <c:if test="${conditionDTO.type=='se'}">selected  </c:if> >无数据权限单选</option>
			        <option value="me" <c:if test="${conditionDTO.type=='me'}">selected  </c:if> >无数据权限多选</option>
			        <option value="intree" <c:if test="${conditionDTO.type=='intree'}">selected  </c:if> >自定义弹出树</option>
			        <option value="program_m" <c:if test="${conditionDTO.type=='program_m'}">selected  </c:if> >项目多选弹出树</option>
			     </select>
      </td>
  </tr>
  
  <tr>
    <th nowrap="nowrap">默认值</th>
    <td>
    	<div id="def">
    		<input id="defaultVal" type="text" name="defaultVal" size="10" style="width:60%;"/>
    	</div>
    </td>
  </tr>
   <tr>
    <th nowrap="nowrap">归属类型</th>
    <td><input id="belongType" type="text" name="belongType" size="10" style="width:60%;" value="<c:out value='${conditionDTO.belongType}'/>" /></td>
  </tr>
 <tr>
	  <th nowrap="nowrap">
		自定义函数事件
	</th>
	<td>
		<textarea rows="5" cols="" style="width:60%;text-align:left;" name="jsFunction"><c:out value='${conditionDTO.jsFunction}'/></textarea>
	</td>
</tr> 

</table>
  <c:out value='${ErrorEessage}'/>
</div>
<input type="hidden" name="linkName" value="<c:out value='${conditionDTO.linkName}'/>"> 
<input type="hidden" name="vouchTypeCode" value="<c:out value='${vouchTypeCode}'/>"> 
<input type="hidden" name="oldColId"  value="<c:out value='${conditionDTO.colID}'/>"/>
</form>


<div id="confirm_exit_btn" >
  <br/>
    <input type="button" name="add" value="保存" onclick="modifyData()"  class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'" />
    <input type="button" name="exit" value="返回" onclick="location.href='/system/ui/conditionList.do?linkname=<c:out value='${conditionDTO.linkName}'/>&vouchTypeCode=<c:out value='${vouchTypeCode}'/>'" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/>
</div>
</body>
</html>

<script type="text/javascript"> 
var defobj = document.getElementById("tbl1").childNodes[0].childNodes[10];
var definp = document.getElementById("defaultVal");
var selobj = document.getElementById("type");
// 保存时有错误信息返回时，默认值，能够显示前一步选中值
var defVal= '<c:out value='${conditionDTO.defaultVal}'/>';
definp.onblur = function(){
	if(definp.value==""){
		return;	
	}
	if(selobj.value == "select"&& defobj.style.display == "block"){
		checkDef(definp.value);
	}
}
// 日期类型默认值配置
selobj.onchange = function() {
	var def = document.getElementById("def");
	var val = {noday:"",yearfirstday:"本年第一天",now:"当前日期",firstday:"本月第一天",lastday:"本月最后一天"};
	if (this.value == "d") {
		// 日期
		var i=j=0
		var newSelect = document.createElement("<select name='defaultVal'>");
		for (var pro in val) {
			var oval = pro == "noday" ? "" : pro;
			var txt = val[pro];
			var opt = new Option(txt, oval);
			if (oval == defVal) {
				j=i;
			}
			newSelect.options.add(opt);
			i++;
		}
		newSelect.options[j].setAttribute("selected","true");
		def.innerHTML = newSelect.outerHTML;
	} else if (this.value == "di") { 
	 	// 日期期间
		var firstSelect = document.createElement("<select name='firstdefault'>");
		var lastSelect = document.createElement("<select name='lastdefault'>");
		firstSelect.style.width = lastSelect.style.width = 125+"px";
		var i=j=m=n=0;
		for (var pro in val) {
			var oval = pro == "noday" ? "" : pro;
			var txt = val[pro];
			var firstOpt　= null, lastOpt = null;
			if (pro != "lastday") {
				firstOpt = new Option(txt, oval);
			}
			if (pro != "yearfirstday" && pro != "firstday") {
				lastOpt = new Option(txt, oval);
			}
			if (defVal != null && defVal.indexOf(",")>-1) {
				var valArr = defVal.split(",");
				var firstVal = valArr[0], lastVal = valArr[1];
				if (oval == firstVal) {
					m = i;
				}
				if (oval == lastVal) {
					n = j;
				}
			}
			if (pro != "lastday") {
				firstSelect.options.add(firstOpt);
				i++
			}
			if (pro != "yearfirstday" && pro != "firstday") {
				lastSelect.options.add(lastOpt);
				j++;
			}
		}
		firstSelect.options[m].setAttribute("selected","true");
		lastSelect.options[n].setAttribute("selected","true");
		var divArr = [];
		divArr.push("<div>起始日期:", firstSelect.outerHTML, "结束日期:", lastSelect.outerHTML,"</div>");
		def.innerHTML = divArr.join("");
	} else {
		def.innerHTML = '<input id="defaultVal" type="text" name="defaultVal" size="10" style="width:60%;"/>';
	}
}
// 日期默认值的处理
if (selobj.value != "d" && selobj.value != "di" && definp != null && defVal != null) {
	definp.value = defVal;
} else {
	selobj.fireEvent("onchange");
}
//校验默认值格式
function checkDef(def){
   if(def.indexOf('|')<0||def==undefined ||def==null) 
      alert('您输入的菜单选项格式不对！');  
}

//验证非空字段
function checkNull(){
	var testColId = document.oneQueryCondition.colId.value;
	var testColName = document.oneQueryCondition.colName.value;
	var testColOderNum = document.oneQueryCondition.orderNum.value;
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
  //保存修改
function modifyData(){
	if(checkNull()){
	    if(chenkInteger()){
	        var url = "/system/ui/modifyOneCondition.do";
	        document.forms[0].action=url;
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

var element= <%=request.getAttribute("nameStr")%>;
if(element!=null && element.length>0){
	for(var i = 0;i< element.length;i++){
		var oOption = document.createElement("OPTION");
		oOption.text=element[i].code+"-"+element[i].name;
		oOption.value=element[i].code;
		//oOption.valueid = "'"+element[i].name +"'";
		oOption.onclick = function(){
			document.getElementById("colName").value = "'"+element[i].name +"'";			
		}
		document.getElementById("colId").add(oOption);
		if(element[i].code == document.getElementById("hid").value){
		  oOption.selected = true;
		 // document.getElementById("colName").value=element[i].name;
		}
	}
}
function aa(obj){
	//debugger;
	document.getElementById("colName").value=element[obj.selectedIndex].name;
}
</script>




