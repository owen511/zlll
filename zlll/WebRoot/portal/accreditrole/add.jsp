<%@page language="java" contentType="text/html; charset=GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<jsp:directive.page import="gov.mof.framework.util.DateUtil" />
<%
	String nowDate = DateUtil.getCurrentDateStr(DateUtil.C_DATE_PATTON_DEFAULT);
	String code = request.getAttribute("code")==null?"":request.getAttribute("code").toString(); 
	String name = request.getAttribute("name")==null?"":request.getAttribute("name").toString();
	String bdgagency = request.getAttribute("bdgagency")==null?"":request.getAttribute("bdgagency").toString();
	String json = (String)request.getAttribute("json");
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
function doClear(){
	document.getElementById("code").value = "";
	document.getElementById("name").value = "";
	document.getElementById("bdgagency").value = "";
	document.getElementById("bdgage").value = "";
}
function doQuery() {
	var submenuid = <c:out value="${param.submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
    var url = "<%=request.getContextPath()%>/portal/accreditrole/turnToQuery.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
    var formObject = $("form1");
	formObject.action = "<%=request.getContextPath()%>/portal/accreditrole/turnToQuery.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
	formObject.submit();
	formObject.action = "<%=request.getContextPath()%>/portal/accreditrole/save.do";
}
function selectOrgan(obj){
	var formObject = $("form1");
	var elementcode = formObject.organtype.value;
	var codevalue =  formObject.bdgage.value;
	if(null == elementcode || "" == elementcode){
		alert("请先选择一种机构类型！");
		return false;
	}
	var submenu = <c:out value="${param.submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
	selectMutlElememt(mainmenu,submenu,"5001",elementcode,obj,false,"",elementcode);
	//selectBaseInfoElememt(mainmenu,submenu,elementcode,obj,codevalue);
}

function selectBaseInfoElememt(mainmenu,submenu,elementcode,backinputStr,codevalue){
	var selvalue = backinputStr.valuecode != undefined ? backinputStr.valuecode : backinputStr.value;
	window.selvalue = selvalue;
    var element = window.$(elementcode);
   	var url = "<%=request.getContextPath()%>/portal/userinfo/elementtree.do?mainmenu="+mainmenu+"&submenu="+submenu+"&elementcode="+elementcode+"&organCode="+codevalue;
	var result = window.showModalDialog(url,window,'dialogHeight:500px;dialogWidth: 325px;resizable: No; status: No;help:No;');
	
	if(result != null){
	    if(typeof(result)!="string"){
		var str = backinputStr.id;
		eval(" var backinput = document.getElementById('"+str.substring(0,str.length-3)+"')");
		backinput.value = result.id;
		backinputStr.value = result.value;
		}
	}
}
//查询所有的权限
function selectMutlElememt(mainmenu,submenu,vchtypecode,vchfieldcode,backinput,checkflag,elementfilter,organtype){
    //wy add 20090923     46000000,46000011,"5001",    "bdgagency", this.form.bdgagency, false,"","bdgagency"
    					//46000000,46000011,"5001",    "agentbank", this.form.agentbank, false,"","agentbank"
    /** ganhua 20080304 在打开选择窗口前回调一个方法做某些事情
	  * 如：设置过滤条件，检查联动的其它控件是否选择值
	  * 
	**/
	codeShowFlag=1;
	var selvalue = backinput.valuecode != undefined ? backinput.valuecode : backinput.value;
	window.selvalue = selvalue;
	window.checkflag = checkflag;
	var func = "callBeforeOpenMultElementTree_"+vchfieldcode+"(window)";;
	var notReturn = true;
    try{
        notReturn = eval(func);
	}catch(e){
		//不成功,不管它,当没有实现该方法
	}
	if(notReturn == false)
	{
		return;
	}
	var elementfilter = "";
	if(window.elementfilter){
		elementfilter = window.elementfilter;
	}

	var refererurl = ""+window.location.href;
	
	var url = ROOT_PATH+"/common/tree/openTreeUser.do?organtype="+organtype+"&mainmenu="+mainmenu+"&submenu="+submenu+"&vchtypecode="+vchtypecode
		+"&vchfieldcode="+vchfieldcode+"&elementfilter="+elementfilter+"&managerid=1"
		+"&Referer="+refererurl.substring(0,refererurl.indexOf("?"));
	var result = window.showModalDialog(url,window,"dialogHeight:500px;dialogWidth: 325px;resizable: No; status: No; help:No;");
	//var result = window.open(url, 'newWindow','dialogWidth=400px,dialogHeight=450px,status=yes,toolbar=no,menubar=no,directories=no,resizable=no,Scrollbars=no');
    //清楚窗体的过滤条件 ganhua 20090509
	if(window.elementfilter);
	{
		window.elementfilter = null;
	}
	if(result != null){
	    if(typeof(result)!="string"){
			if(backinput == null){
				backinput = $(vchfieldcode);
			}
			backinput.value = result.value;
			backinput.valueid = result.id;
			backinput.isleaf= result.isleaf;
			backinput.valuecode = result.valuecode;
			document.getElementById("hidden_"+backinput.id).value= result.valuecode;
		}
	}
	else
	{
	    if(backinput != null){
	        backinput.value = "";
			backinput.valueid = null;
			backinput.valuecode = "";
			document.getElementById("hidden_"+backinput.id).value= "";
	    } 
	 }
	 codeShowFlag=null;
}
</script>
<form name="form1" id="form1" action="<%=request.getContextPath()%>/portal/accredit/save.do"
	method="post">
	
	<div id="form_table_title_edit">
		<ul>
			<li class="top">
				<div>
					授权管理编辑区
				</div>
			</li>
		</ul>
	</div>
	<div id="edit_table"  style='height:50px;'>
		<table border="0" cellpadding="0px" cellspacing="0px">
			<tr>
				<th nowrap="nowrap">
					授权用户
				</th>
				<td nowrap="nowrap" width="20%">
					<input type="text" name=accreditUser id=accreditUser value="<c:out value='${accreditUser.name}'/>" disabled = "disabled"/>
					<input name=submenu id=submenu type="hidden"
						value="<c:out value='${param.submenu}'/>" />
					<input name=mainmenu id=mainmenu type="hidden"
						value="<c:out value='${param.mainmenu}'/>" />
				</td>
				<th nowrap="nowrap">
					开始日期
					<span>*</span>
				</th>
				<td nowrap="nowrap">
					<input type="text" name="startdate" id="startdate" value="" size="10" readonly="readonly"/>
					&nbsp;
					<img src="<%=request.getContextPath()%>/images/calendar/date.gif" alt="选择日期"
						onclick="return showCalendar('startdate', '%Y-%m-%d', null, true);"
						style="cursor:hand; border:0;"
						onmouseover="this.style.background='red';"
						onmouseout="this.style.background=''" />
				</td>
				<th nowrap="nowrap">
					结束日期
					<span>*</span>
				</th>
				<td nowrap="nowrap">
					<input name="enddate" type="text" id="enddate" value="" size="10" readonly="readonly"/>
					<img src="<%=request.getContextPath()%>/images/calendar/date.gif" alt="选择日期"
						onclick="return showCalendar('enddate', '%Y-%m-%d', null, true);"
						style="cursor:hand; border:0;"
						onmouseover="this.style.background='red';"
						onmouseout="this.style.background=''" />
				</td>
			</tr>
			<tr>
				<th nowrap="nowrap">
					备注
				</th>
				<td nowrap="nowrap" colspan="5">
					<input name="remark" id="remark" value="" maxlength="100" type="text" />
				</td>
				<td nowrap="nowrap" colspan="5">
			
					<input name="roleid" id=""roleid"" value="" maxlength="100" type="hidden" />
				</td>
				<td nowrap="nowrap" colspan="5">
			
					<input name="rolename" id=""rolename"" value="" maxlength="100" type="hidden" />
				</td>
			</tr>
		</table>
	</div>
<div>
		<div style='width:47%;float:left;height:120%'>

	<div id="querylist" style="display:block">
		<table id='edittable' width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr>

				<td nowrap="nowrap">
					<input type="hidden" name="code" id="code" value="<%=request.getAttribute("code") %>" >
				</td>

				<td nowrap="nowrap">
					<input type="hidden" name="name" id="name" value="<%=request.getAttribute("name") %>" >
				</td>
				
			</tr>
		</table>
	</div>
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
				<div id='mayuser_div'
					style='position:relative;height:expression(this.offsetParent.offsetHeight);width:101%;'></div>

				</div>
		</div>
	
    	<div style='width:52%;display:block;float:left;'>

	<div id="querylist" style="display:block">
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr>
				<td nowrap="nowrap">
					用户编码
				</td>
				<td nowrap="nowrap">
					<input type="text" name="user_code" id="user_code" value="<%=request.getAttribute("code") %>" >
				</td>
				<td nowrap="nowrap">
					用户名称
				</td>
				<td nowrap="nowrap">
				
					<input type="text" name="user_name" id="user_name" value="<%=request.getAttribute("name") %>" >
					<input type="button" value="查询" onclick='selectByCode()'>
				</td>
				
			</tr>
		</table>
	</div>
			<div id="form_table_title">
				<ul>
					<li class="top">
						<div>
							可选用户
						</div>
					</li>
				</ul>
			</div>
			<div id="containerline6">
				<div id='tmain_div'
					style='position:relative;height:expression(this.offsetParent.offsetHeight);width:101%;'></div>
					
			
			</div>			    		
    	</div>
	</div>
	<div id="querybutton"> 
		<div align="right">
		<input name="submit2" type="button" class="button_style"
			onmouseover="this.className='OverBtn'"
			onmouseout="this.className='button_style'"
			onmousedown="this.className='down'" value="授权" onclick="saveExit()" />
		<input name="submit3" type="button" class="button_style"
			onmouseover="this.className='OverBtn'"
			onmouseout="this.className='button_style'"
			onmousedown="this.className='down'" value="返回" onclick="cancel();" />
	</div></div>
	<input id=accredited name=accredited type=hidden value="">
	<input name=submenu id=submenu type="hidden"
		value="<c:out value='${param.submenu}'/>" />
	<input name=mainmenu id=mainmenu type="hidden"
		value="<c:out value='${param.mainmenu}'/>" />
</form>
<script>

function saveExit(){
			var selectedRow = tmain.getSelectedRow();
			var roleSelected = roleJson.getSelectedRow();
			
			if(roleSelected.length == 0){
			    alert("请选择一个需要授权的角色！");
    			return false;
			}
			if(null == selectedRow[0]){
				alert("请选择一个要授于权限的用户！");
    			return false;
			}
			var formObject = $("form1");
			if(formObject.startdate.value==""){
		       alert("请输入开始时间！");
		       return false;
		    }
		    if(formObject.enddate.value==""){
		       alert("请输入结束时间！");
		       return false;
		    }
		    if(formObject.startdate.value > formObject.enddate.value){
		    	alert("开始时间不能大于结束时间！");
		        return false;
		    }
		    if(formObject.enddate.value < nowDate){
		       alert("结束时间不能小于当前日期！");
		       return false;
		    }
		    formObject.accredited.value = selectedRow[0].userid;
		    var selectRow=new Array();
		    
            for(var i=0;i<roleJson.getSelectedRow().length;i++){
             selectRow[i]=roleJson.getSelectedRow()[i].roleid;
             
            
            }
            
		    formObject.roleid.value =  selectRow; 
		    
		    
		    formObject.action = "<%=request.getContextPath()%>/portal/accreditrole/save.do";
		    new Ajax.Request("<%=request.getContextPath()%>/portal/accreditrole/checkuser.do?random="+Math.random(), 
     	{
	   		parameters :  encodeURI(Form.serialize(formObject)),
	   		method: 'get', 
	   		onComplete : function(resp) { //"resp" is just the XMLHttpRequest object
	     	//debugger;
	     	//var res = resp.responseText;
	     	if(resp.responseText=="false"){
	     	alert("I40606-该被授权用户在此时间段已有授权，同一时间段不能重复授权");
	     	return;
	     	}else{
	     	formObject.submit();
	     	}
	     	
	        },
	   		requestHeaders: {Accept: 'application/json'},
	   		onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
	     	netWorkEception();
	        }
		}); 
		    
		    //formObject.submit();
		}
		
		function cancel(){
			var submenuid = <c:out value="${param.submenu}"/>;
			var mainmenu = <c:out value="${param.mainmenu}"/>;
			var url = "<%=request.getContextPath()%>/portal/accreditrole/query.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
			window.location.href = url;
		}
</script>
		<script type="text/javascript">
		//document.getElementById('edittable').style.display='none';
		col = createColumnConfig();
		col.id = "code";
		col.name = "code";
		col.type = "S";
		col.title = "角色编码";
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
		col.title = "角色名称";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row!=null && value != null){
			  tdobj.innerHTML = value;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "remark";
		col.name = "remark";
		col.type = "S";
		col.title = "角色组";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row!=null && value != null){
			  tdobj.innerHTML = value;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		col = createColumnConfig();
		col.id = "subroleid";
		col.name = "subroleid";
		col.type = "S";
		col.title = "状态";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row!=null && value != null){
			  tdobj.innerHTML = value;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		function showResponse(request){
			eval("var subList = " + request.responseText);
			tdetail.data = subList;
			tdetail.show();
		}
		var roleJson =new dataTable();
		roleJson.parent = document.getElementById('mayuser_div');
		roleJson.parent.parentElement.style.height = 340;
		roleJson.setTableHead(["serial","checkbox","code","name","remark"]);
		<%
			String roleJsonList = (String)request.getAttribute("roleJson");
			if(null == roleJsonList || "".equals(roleJsonList)){
				out.println("roleJson.data = new Array();\n");
			}else{
				out.println("roleJson.data = "+ roleJsonList);
			}
		%>
		roleJson.show();
		</script>
				<script type="text/javascript">
		col = createColumnConfig();
		col.id = "usercode";
		col.name = "usercode";
		col.type = "S";
		col.title = "用户编码";
		col.show = function(rownum,value,row,tdobj,datatable){
			
			if(value != null){
			  tdobj.innerHTML = value;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "username";
		col.name = "username";
		col.type = "S";
		col.title = "用户名称";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(value != null){
			  tdobj.innerHTML = value;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "userremark";
		col.name = "userremark";
		col.type = "S";
		col.title = "用户组";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(value != null){
			  tdobj.innerHTML = value;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "stateStr";
		col.name = "stateStr";
		col.type = "S";
		col.title = "状态";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(value != null){
			  tdobj.innerHTML = value;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		var tmain =new dataTable();
		tmain.parent = document.getElementById('tmain_div');
		tmain.parent.parentElement.style.height = 340;
		tmain.setTableHead(["serial","radio","usercode","username","userremark"]);
	    var json=<%=json%>;
	    
        tmain.data =json;
        
		tmain.show();
	function selectByCode(){
		var code = document.getElementById('user_code').value;
		var name = document.getElementById('user_name').value;
		var arr = new Array();
		for(var i=0;i<json.length;i++){
			if(code != "" ){
				if(json[i].usercode.toUpperCase().indexOf(code.toUpperCase())==-1){
					continue;
				}
			}
			if(name != "" ){
				if(json[i].username.toUpperCase().indexOf(name.toUpperCase())==-1){
					continue;
				}
			}
			arr.push(json[i]);
		}
		tmain.data=arr;
		tmain.show();
	}
</script>	
