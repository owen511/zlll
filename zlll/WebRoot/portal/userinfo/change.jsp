<%@page language="java" contentType="text/html; charset=GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<jsp:directive.page import="gov.mof.framework.util.DateUtil" />
<%
			String nowDate = DateUtil
			.getCurrentDateStr(DateUtil.C_DATE_PATTON_DEFAULT);
%>
<script>
var nowDate = '<%=nowDate%>';
function loadError(){
	var error = '<c:out value="${error}"/>';
	if("" != error ){
		alert(error);
	}
}
loadError();

function selectBaseInfoElememt(mainmenu,submenu,elementcode,backinputStr,codevalue){
	var selvalue = backinputStr.valuecode != undefined ? backinputStr.valuecode : backinputStr.value;
	window.selvalue = selvalue;
    var element = window.$(elementcode);
   	var url = "<%=request.getContextPath()%>/portal/userinfo/elementtree.do?mainmenu="+mainmenu+"&submenu="+submenu+"&elementcode="+elementcode+"&organCode="+codevalue;
	var result = window.showModalDialog(url,window,'dialogHeight:500px;dialogWidth: 325px;resizable: No; status: No;help:No;');
	
	if(result != null){
	    if(typeof(result)!="string"){
			if($("userclsidStr") == null){
				$("userclsidStr") = "";
			}
		var str = backinputStr.id;
		eval(" var backinput = document.getElementById('"+str.substring(0,str.length-3)+"')");
		backinput.value = result.id;
		backinputStr.value = result.value;
		}
	}
}

function selectOrgan(obj){
	var formObject = $("form1");
	var elementcode = formObject.organtype.value;
	var codevalue =  formObject.organCode.value;
	if(null == elementcode || "" == elementcode){
		alert("请先选择一种机构类型！");
		return false;
	}
	var submenu = <c:out value="${param.submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
	selectBaseInfoElememt(mainmenu,submenu,elementcode,obj,codevalue);
}

function selectUserCls(){
	var selvalue = $("userclsidStr").valuecode != undefined ? $("userclsidStr").valuecode : $("userclsidStr").value;
	window.selvalue = selvalue;
   	var url = "<%=request.getContextPath()%>/portal/userinfo/selectUserCls.do";
	var result = window.showModalDialog(url,window,'dialogHeight:500px;dialogWidth: 325px;resizable: No; status: No;help:No;');
	if(result != null){
	    if(typeof(result)!="string"){
			if($("userclsidStr") == null){
				$("userclsidStr") = "";
			}
		$("userclsid").value = result.id;
		$("userclsidStr").value = result.value;
		$("userclsidStr").valuecode = result.valuecode;
		}
	}	
}

function moveToSelect(row){
	var s = "";
	for(var v in row ){
		s += v+":";
		eval("s += row."+v);
		s += "\n";
	}
	
	selectedRole.appendRow(row);
	selectedRole.show();
	
	var newdatas = new Array();
	
	for(var i=0;i<canSelectRole.data.length;i++){
		if(canSelectRole.data[i].code != row.code){
			newdatas[newdatas.length] = canSelectRole.data[i];			
		}
	}
	canSelectRole.data = newdatas;
	canSelectRole.show();
}

function moveToCanSelect(row){
	var s = "";
	for(var v in row ){
		s += v+":";
		eval("s += row."+v);
		s += "\n";
	}
	
	canSelectRole.appendRow(row);
	canSelectRole.show();
	
	var newdatas = new Array();
	
	for(var i=0;i<selectedRole.data.length;i++){
		if(selectedRole.data[i].code != row.code){
			newdatas[newdatas.length] = selectedRole.data[i];			
		}
	}
	selectedRole.data = newdatas;
	selectedRole.show();
}

function checkUserCode(){
	var formObject = $("form1");
	var code = formObject.code.value.trim();
	var url = "<%=request.getContextPath()%>/portal/userinfo/checkUserCode.do";
	if(null != code && "" != code){
		var pars = "code="+code;
    	var myAjax = new Ajax.Request(
                    url,
                    {method: 'post', parameters: pars, onComplete: checkUserCodeResult}
                    );
	}
}

function checkUserCodeResult(request){
	eval("var isHave = " + request.responseText);
	if(isHave == true){
		alert("此用户编码已经存在，请输入其它编码！");
		var code = document.getElementById("code");
		code.value = "";
		code.focus();
	}
}
</script>
<form name="form1" id="form1"
	action="<%=request.getContextPath()%>/portal/userinfo/update.do"
	method="post">
	<div id="form_table_title">
		<ul>
			<li class="top">
				<div>
					用户维护编辑区
				</div>
			</li>
		</ul>
	</div>
	<div id="form_table">
		<table cellpadding="0" cellspacing="0">
			<tr>
				<th nowrap="nowrap">
					用户编码
					<span>*</span>
				</th>
				<td nowrap="nowrap">
					<input type="text" id="code" name="code" onchange="checkUserCode()" value="<c:out value='${userViewDTO.code}'/>"/>
					<input type="hidden" id="userid" name="userid" value="<c:out value='${userViewDTO.userid}'/>"/>
				</td>
				<th nowrap="nowrap">
					用户名称
					<span>*</span>
				</th>
				<td nowrap="nowrap" >
					<input type="text" id="name" name="name" value="<c:out value='${userViewDTO.name}'/>"/>
				</td>
				
			<th nowrap="nowrap">
					用户类型
					<span>*</span>
				</th>
				<td nowrap="nowrap">
					<select name=type id=type>
						<option value="0">
							0-普通用户
						</option>
						<c:if test="${managerUserDTO.type == '2'}">
							<option value="1">
								1-管理用户
							</option>
						</c:if>
					</select>
				</td>
			<tr>
			<th nowrap="nowrap">
					登录方式
					<span>*</span>
				</th>
				<td nowrap="nowrap">
					<input type="radio" name="logotype" <c:if test="${logotype=='0'}"> checked </c:if>  value = "0" >密码登录</input>
					<input type="radio" name="logotype" <c:if test="${logotype=='1'}"> checked </c:if> value = "1" >CA登录</input>
				</td>
				<th nowrap="nowrap">
					用户密码
					<span>*</span>
				</th>
				<td nowrap="nowrap">
					<input type="password" id="password" name="password" value="<c:out value='${userViewDTO.password}'/>"/>
				</td>
				<th nowrap="nowrap">
					核对密码
					<span>*</span>
				</th>
				<td nowrap="nowrap">
					<input type="password" id="password2" name="password2" value="<c:out value='${userViewDTO.password}'/>"/>
				</td>
				
			</tr>
			<tr>
				<th nowrap="nowrap">
					机构类型<span>*</span>
				</th>
				
				<td nowrap="nowrap">
				    <c:choose>
							<c:when test="${managerUserDTO.type != '2'}">
									<input type="text" name="organtypeStr" id="organtypeStr" value="<c:out value='${userViewDTO.organtypeStr}'/>" disabled = "disabled"/>
							        <input type="hidden" name="organtype" id="organtype"  value="<c:out value='${userViewDTO.organtype}'/>" />
							</c:when>
							<c:otherwise>
								<select name="organtype" id="organtype" onchange ="clearOranid()">
										
										    <option value="">
												&nbsp;
											</option>
											<c:forEach items="${organTypeMap}" var="entry">
												<option value="<c:out value='${entry.key}' />" <c:if test="${userViewDTO.organtype eq entry.key}"> selected </c:if> >
													<c:out value="${entry.value}" />
												</option>
											</c:forEach>
								</select>
							</c:otherwise>
					 </c:choose>
				</td>
				
				<th nowrap="nowrap">
					机构<span>*</span>
				</th>
				<td nowrap="nowrap">
				    <c:choose>
				       <c:when test="${managerUserDTO.type != '2'}">
				     		<input type="text" name="organidStr" id="organidStr"  value="<c:out value='${userViewDTO.organidStr}'/>"
								class=main_lookup_input readonly onclick="selectOrgan(this)">
							<input type="hidden" name="organid"  value="<c:out value='${userViewDTO.organid}'/>" id="organid">
							<button id="organid_btn"
								onclick="selectOrgan(this.form.organidStr)"></button>
				       </c:when>
				       <c:otherwise>
							<input type="text" name="organidStr" id="organidStr"
								class=main_lookup_input readonly onclick="selectOrgan(this)"  value="<c:out value='${userViewDTO.organidStr}'/>">
							<input type="hidden" name="organid" id="organid" value="<c:out value='${userViewDTO.organid}'/>">
							<button id="organid_btn"
								onclick="selectOrgan(this.form.organidStr)"></button>
						</c:otherwise>
					</c:choose>
					<input type="hidden" name="organCode" id="organCode" value="<c:out value='${userViewDTO.organCode}'/>">
				</td>
				<th nowrap="nowrap">
					管理者
				</th>
				<td nowrap="nowrap">
					<input type="text"
						value="<c:out value='${userViewDTO.manageridStr}'/>"
						disabled="disabled" name=manageridStr id=manageridStr />
					<input name=managerid id=managerid type="hidden"
						value="<c:out value='${userViewDTO.managerid}'/>" />
				</td>
			</tr>
			<tr>
				<th nowrap="nowrap">
					用户组
					<span>*</span>
				</th>
				<td nowrap="nowrap">
				   <c:choose>
				       <c:when test="${managerUserDTO.type != '2'}">
				       		<input type="text" name="userclsidStr" id="userclsidStr" value="<c:out value='${userViewDTO.userclsidStr}'/>"  disabled = "disabled"/>
				       		<input type="hidden" name=userclsid id=userclsid value="<c:out value='${userViewDTO.userclsid}'/>" />
				       </c:when>
				       <c:otherwise>
							<input type="text" name=userclsidStr id=userclsidStr value="<c:out value='${userViewDTO.userclsidStr}'/>" 
								readonly="readonly" onclick="selectUserCls()">
							<input type="hidden" name=userclsid id=userclsid value="<c:out value='${userViewDTO.userclsid}'/>">
							<button id="userclsid_btn" onclick="selectUserCls()"></button>
					   </c:otherwise>
					</c:choose>
				</td>
				<th nowrap="nowrap">
					过期日期
				</th>
				<td nowrap="nowrap">
					<input name="overduedate" type="text" id="overduedate" value="<c:out value='${userViewDTO.overduedateStr}'/>"
						size="10" readonly="readonly" />
					<img src="../../images/calendar/date.gif" alt="选择日期"
						onclick="return showCalendar('overduedate', '%Y-%m-%d', null, true);"
						style="cursor:hand; border:0;"
						onmouseover="this.style.background='red';"
						onmouseout="this.style.background=''" />
				</td>
				<th nowrap="nowrap">
					状态
					<span>*</span>
				</th>
				<td nowrap="nowrap">
					<select name=state id=state>
						<c:forEach items="${stateMap}" var="entry">
							<option value="<c:out value='${entry.key}' />"  <c:if test="${entry.key eq userViewDTO.state}"> selected </c:if>>
								<c:out value="${entry.value}" />
							</option>
						</c:forEach>
					</select>
				</td>
			</tr>
			<tr>
				<th nowrap="nowrap">
					备注
				</th>
				<td colspan="5" nowrap="nowrap">
					<textarea style="height:60px; width:80%; overflow:auto;"
						name=remark id=remark><c:out value='${userViewDTO.remark}'/></textarea>
				</td>
			</tr>
		</table>
	</div>
	<div>
		<div style='width:50%;float:left;overflow:auto;'>
			<div id="form_table_title">
				<ul>
					<li class="top">
						<div>
							可选角色
						</div>
					</li>
				</ul>
			</div>
			<div id="containerline6">
				<div id='canSelectRole_div'
					style='position:relative;height:expression(this.offsetParent.offsetHeight);width:100%;'></div>
				<script type="text/javascript">
				col = createColumnConfig();
				col.id = "code";
				col.name = "code";
				col.type = "S";
				col.title = "编码";
				col.show = function(rownum,value,row,tdobj,datatable){
					if(row!=null && value != null){
					  tdobj.innerHTML = value;
					} else {
					  tdobj.innerHTML = "";
					}
				}
				ColumnConfig[col.id.toLowerCase()]=col;
				
				col = createColumnConfig();
				col.id = "name";
				col.name = "name";
				col.type = "S";
				col.title = "名称";
				col.show = function(rownum,value,row,tdobj,datatable){
					if(row!=null && value != null){
					  tdobj.innerHTML = value;
					} else {
					  tdobj.innerHTML = "";
					}
				}
				ColumnConfig[col.id.toLowerCase()]=col;
				
				col = createColumnConfig();
				col.id = "userclsid";
				col.name = "userclsid";
				col.type = "S";
				col.title = "组别";
				col.show = function(rownum,value,row,tdobj,datatable){
					if(row!=null && row.userclsidStr != null){
					  tdobj.innerHTML = row.userclsidStr;
					} else {
					  tdobj.innerHTML = "";
					}
				}
				ColumnConfig[col.id.toLowerCase()]=col;
		
				var canSelectRole =new dataTable();
				canSelectRole.parent = document.getElementById('canSelectRole_div');
				canSelectRole.setTableHead(["serial","userclsid","code","name"]);
				<%
				String canSelectRole = (String)request.getAttribute("canSelectRole");
				if(null == canSelectRole || "".equals(canSelectRole)){
					out.println("canSelectRole.data = new Array();\n");
				}else{
					out.println("canSelectRole.data = "+ canSelectRole);
				}
				%>
				canSelectRole.onrowclick = moveToSelect;
				canSelectRole.show();
				
				</script>
			</div>
		</div>
		<div style='width:49%;display:block;'>
			<div id="form_table_title">
				<ul>
					<li class="top">
						<div>
							已选角色
						</div>
					</li>
				</ul>
			</div>
			<div id="containerline6">
				<div id='selectedRole_div'
					style='position:relative;height:expression(this.offsetParent.offsetHeight);width:100%;'></div>
				<script type="text/javascript">
				var selectedRole =new dataTable();
				selectedRole.parent = document.getElementById('selectedRole_div');
				selectedRole.setTableHead(["serial","userclsid","code","name"]);
				<%
				String selectedRole = (String)request.getAttribute("selectedRole");
				if(null == selectedRole || "".equals(selectedRole)){
					out.println("selectedRole.data = new Array();\n");
				}else{
					out.println("selectedRole.data = "+ selectedRole);
				}
				%>
				selectedRole.onrowclick = moveToCanSelect;
				selectedRole.show();
				</script>
			</div>
		</div>
		<br/>
		<div id="confirm_exit_btn" style='width:100%;display:block;'>
			<input name="submit2" type="button" class="button_style"
				onmouseover="this.className='OverBtn'"
				onmouseout="this.className='button_style'"
				onmousedown="this.className='down'" value="保存"
				onclick="saveExit()" />
			<input name="submit3" type="button" class="button_style"
				onmouseover="this.className='OverBtn'"
				onmouseout="this.className='button_style'"
				onmousedown="this.className='down'" value="返回" onclick="cancel()" />
		</div>
	</div>
	<script type="text/javascript">
	
	function saveExit(){
	    var formObject = $("form1");
	    if(checkInput(formObject)){
		    formObject.selectedRoleJson.value = selectedRole.data.toJSON();
		    formObject.action = "<%=request.getContextPath()%>/portal/userinfo/update.do";
		    formObject.submit();
	    }
	}
	
	function checkInput(formObject){
		if(formObject.code.value.trim() == ""){
			alert("请输入用户编码!");
			return false;
		}
		if(formObject.name.value.trim() == ""){
			alert("请输入用户名称!");
			return false;
		}
		if(checkRadio() == false){
			alert("请选择登录方式!");
			return false;
		}
		if(formObject.password.value.trim() == ""){
			alert("请输入用户密码!");
			return false;
		}
		var passowrdCheck = '<c:out value ='${passwordCheckFlag}'/>';
		if(passowrdCheck == 'chongqing'){
			if(formObject.password.value.trim().length <6){
			   alert("用户密码不能小于6位!");
			  return false;
		    }
			//全都一样
			var reg =  /^(\d)\1+$/;
			var val = formObject.password.value.trim();
			//顺序如:123456
			var str1 = val.replace(/\d/g, function($0, pos) {
	        	return parseInt($0)-pos;
	    	});
	    	//倒序如:654321
			str2 = val.replace(/\d/g, function($0, pos) {
	        	return parseInt($0)+pos;
	    	});
			//单位编码
			var agencycode = '<c:out value ='${commonElementDTO.code}'/>';
			if(val == agencycode){
				alert("密码不能和单位编码相同!");
				return false;
			}
			if(reg.test(val) || reg.test(str1) || reg.test(str2)){
				alert("密码太简单了,请重新设置!");
				return false;
			}
		}
		if(formObject.password.value != formObject.password2.value){
			alert("核对密码同用户密码不相等，请重新输入!");
			return false;
		}
		if(formObject.organtype.value == ""){
			alert("请选择机构类型!");
			return false;
		}
		if(formObject.organid.value == ""){
			alert("请选择机构!");
			return false;
		}
		if(formObject.userclsid.value == ""){
			alert("请选择用户组!");
			return false;
		}
	    return true;
	}
	
	function cancel(){
		var submenuid = <c:out value="${param.submenu}"/>;
		var mainmenu = <c:out value="${param.mainmenu}"/>;
		var url = "<%=request.getContextPath()%>/portal/userinfo/query.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
		window.location.href = url;
	}
	
	function init(){
		var type = "<c:out value='${userViewDTO.type}'/>";
		var organtype = "<c:out value='${userViewDTO.organtype}'/>";
		var state = "<c:out value='${userViewDTO.state}'/>";
		var formObject = $("form1");
		formObject.type.value = type;
		if(typeof(formObject.organtypestr) != 'undefined'){
			formObject.organtypestr.value = organtype;
		}
		formObject.state.value = state;
	}
	init();
	function checkRadio(){
	   var radios=document.form1.logotype;
	   var flag=false;
	   for(var i=0;i<radios.length;i++)
	   {
	      if(radios[i].checked)
	      {
	         flag=true;
	         break;
	      }
	   }
	  if(flag==false)
	  {
	    return false;
	  }
	 return true;
	}
	function clearOranid(){
		var formObject = $("form1");
		formObject.organidStr.value = "";
		formObject.organid.value = "";
	}
	</script>
	<input name=submenu id=submenu type="hidden"
		value="<c:out value='${param.submenu}'/>" />
	<input name=mainmenu id=mainmenu type="hidden"
		value="<c:out value='${param.mainmenu}'/>" />
	<input name=selectedRoleJson id=selectedRoleJson type="hidden" value="" />
</form>
