<%@page language="java" contentType="text/html; charset=GBK"%>
<jsp:directive.page import="gov.mof.fasp.ca.accredit.AccreditDTO" />
<jsp:directive.page import="gov.mof.framework.util.DateUtil" />
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%
	AccreditDTO accreditDTO = (AccreditDTO)request.getAttribute("accreditDTO");
	String startdate = DateUtil.format(accreditDTO.getStartdate(),DateUtil.C_DATE_PATTON_DEFAULT);
	String enddate = DateUtil.format(accreditDTO.getEnddate(),DateUtil.C_DATE_PATTON_DEFAULT);
	String nowDate = DateUtil.getCurrentDateStr(DateUtil.C_DATE_PATTON_DEFAULT);
	String json = (String)request.getAttribute("json");
	String rolename = (String)request.getAttribute("rolename");
	String accreditedid = (String)request.getAttribute("accreditedid");
	String code = request.getAttribute("code")==null?"":request.getAttribute("code").toString(); 
	String name = request.getAttribute("name")==null?"":request.getAttribute("name").toString();
	String bdgagency = request.getAttribute("bdgagency")==null?"":request.getAttribute("bdgagency").toString();
%>
<script>
var nowDate = '<%=nowDate%>';
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
      formObject.accreditedid.value = selectedRow[0].userid;
	  var selectRow=new Array();
	  for(var i=0;i<roleJson.getSelectedRow().length;i++){
      	selectRow[i]=roleJson.getSelectedRow()[i].roleid;
      }
      formObject.roleid.value =  selectRow;
	  new Ajax.Request("<%=request.getContextPath()%>/portal/accreditrole/checkModuser.do?random="+Math.random(), 
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
	}

function cancel(){
	var submenuid = <c:out value="${param.submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
	var url = "<%=request.getContextPath()%>/portal/accreditrole/query.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
	window.location.href = url;	
}

</script>
<form name="form1" id="form1" action="<%=request.getContextPath()%>/portal/accreditrole/update.do"
	method="post">
	<c:out value="${error}"/>
	<div id="form_table_title_edit">
		<ul>
			<li class="top">
				<div>
					授权管理编辑区
				</div>
			</li>
		</ul>
	</div>
	<div id="edit_table">
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
					<input name=accreditid id=accreditid type="hidden"
						value="<c:out value='${accreditDTO.accreditid}'/>" />
						<input name=accreditedidid id=accreditedidid type="hidden"
						value="<%= request.getAttribute("accreditedid") %>" />
				</td>
				<th nowrap="nowrap">
					开始日期
					<span>*</span>
				</th>
				<td nowrap="nowrap">
					<input type="text" name="startdate" id="startdate" value="<%=startdate %>" size="10" readonly="readonly"/>
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
					<input name="enddate" type="text" id="enddate" value="<%=enddate %>" size="10" readonly="readonly"/>
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
				<td nowrap="nowrap" colspan="3">
					<input name="remark" id="remark" value="<c:out value='${accreditDTO.remark}'/>" maxlength="100" type="text" />
				</td>
									<td nowrap="nowrap" colspan="5">
			
					<input name="roleid" id=""roleid"" value="" maxlength="100" type="hidden" />
				</td>
				<td nowrap="nowrap" colspan="5">
			
					<input name="accreditedid" id=""accreditedid"" value="" maxlength="100" type="hidden" />
				</td>

				
			</tr>
		</table>
	</div>
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
					<input type="text" name="user_code" id="user_code" value="" >
				</td>
				<td nowrap="nowrap">
					用户名称
				</td>
				<td nowrap="nowrap">
				
					<input type="text" name="user_name" id="user_name" value="" >
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
			onmousedown="this.className='down'" value="修改" onclick="saveExit()" />
		<input name="submit3" type="button" class="button_style"
			onmouseover="this.className='OverBtn'"
			onmouseout="this.className='button_style'"
			onmousedown="this.className='down'" value="返回" onclick="cancel();" />
	</div></div>
	<input name=submenu id=submenu type="hidden"
		value="<c:out value='${param.submenu}'/>" />
	<input name=mainmenu id=mainmenu type="hidden"
		value="<c:out value='${param.mainmenu}'/>" />
</form>
		<script type="text/javascript">
		//document.getElementById('edittable').style.display='none';
		col = createColumnConfig();
		col.id = "code";
		col.name = "code";
		col.type = "S";
		col.title = "角色编号";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row!=null && value != null){
			  tdobj.innerHTML = value;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
				col = createColumnConfig();
		col.id = "roleid";
		col.name = "roleid";
		col.type = "S";
		col.title = "角色id";
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
		col.title = "用户编号";
		col.show = function(rownum,value,row,tdobj,datatable){
			
			if(value != null){
			  tdobj.innerHTML = value;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "accreditedid";
		col.name = "accreditedid";
		col.type = "S";
		col.title = "被授权用户id";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(value != null){
			  tdobj.innerHTML = value;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		col = createColumnConfig();
		col.id = "accredited";
		col.name = "accredited";
		col.type = "S";
		col.title = "被授权用户id";
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
		//用户列表的查询条件设置
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
    
		<script type="text/javascript">
		//跳转到修改页面的连接
		function selRow(){
			var rolename = '<%=rolename%>';
			var roleid = rolename.split(',');
        	var selectedRow = roleJson.data;
	        var accreditedid = '<%=accreditedid%>';
	        var roleRow = tmain.data;
	        
	   	    for(var i=0;i<selectedRow.length;i++){
		    	for(var j=0;j<roleid.length;j++){
					if(selectedRow[i].roleid  == roleid[j]){
						selectedRow[i].checked =true;
						continue;
					}
				}
	   	    }
	   	    for(var j= 0;j<roleRow.length;j++){
	   	    		if(roleRow[j].userid  == accreditedid){
						roleRow[j].checked =true;
						continue;
					}
	   	    }
	   	    tmain.draw();
	   	    roleJson.draw();
	   	    
   	 }
	
</script>

  <SCRIPT FOR=window EVENT=onload LANGUAGE="JScript">
    selRow();
</script>
