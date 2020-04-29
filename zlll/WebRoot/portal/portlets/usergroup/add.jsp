<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<div>
    <form name="detailform" id="detailform" action="#" method="post" >
    <input type="hidden" id="maindata" name="maindata" value=""/>
    <input type="hidden" id="optype" name="optype" value="add"/>
		<div id="form_table_title" >
			<ul>
				<li class="top">
					<div>新增用户组
					</div>
				</li>
			</ul>
		</div>
		<!-- 请保留此div和a标签  -->
		<div id="edit_table" style="height:400px;">
		<!--按link解析编辑区 -->
		<div id="editform" onkeydown = "switchFocus()"> 
		<table id ="edittable" width="100%" border="0" cellspacing="0" style= "TABLE-LAYOUT:fixed" cellpadding="0"> 
		   <tr> 
		      <th class = 'thwidth'><div align=left>用户组编码&nbsp;&nbsp;&nbsp;&nbsp;<span>*</span></div></th>
		      <td nowrap=nowrap  colspan="1"  align="left">
		      	<input name="gcode" id="gcode"" type="text" style="text-align:left"  maxlength="5"  class="textmin" title="" />
			  </td> 
		      <th class = 'thwidth'><div align=left>用户组名称&nbsp;&nbsp;&nbsp;&nbsp;<span>*</span></div></th>
		      <td nowrap=nowrap colspan="1" align="left">
		      	<input name="gname" id="gname" type="text" style="text-align:left"  maxlength="20"  class="textmin" title=""  />
			  </td> 
		   </tr> 
      </table> 
    </div> 
	<input name=submenu id=submenu type="hidden" value="<c:out value='${param.submenu}'/>" />
	<input name=mainmenu id=mainmenu type="hidden" value="<c:out value='${param.mainmenu}'/>" />
	
	<div id="querybutton">
		<div align="right">
			<input type="button" id="saveAndOut" name="save"  value="保存并继续" onclick="saveContinue()" class="button_style" >
		<input type="button" id="saveAndOut" name="save"  value="保存并退出" onclick="saveExit()" class="button_style" >
		<input type="button" id="cancel"   name="cancel"  value="返回" onclick="back()" class="button_style">	
		</div>
	</div>
</form>
<script type="text/javascript">
function checkinput(){
	var gcode = document.getElementById("gcode");
	var gname = document.getElementById("gname");

	if(gcode.value.trim()==''){
		alert('请输入用户组编码!');
		gcode.focus();
		return false;
	}
	if(isNaN(gcode.value.trim())){
		alert('用户组编码应该为5位以内的整数!');
		gcode.focus();
		return false;
		
	}
	if(gname.value.trim()==''){
		alert('请输入用户组名称!');
		gname.focus();
		return false;
	}	
	return true;	
}
function saveContinue(){
	var formObject = $("detailform");
	if(checkinput()){		
		new Ajax.Request("<%=request.getContextPath()%>/portal/usergroup/check.do?cancel=true&random="+Math.random(), 
		{	
		parameters : encodeURI(Form.serialize(detailform)),
		method: 'get', 
		onComplete : function(resp){
			if("1"==resp.responseText){
				formObject.action = "<%=request.getContextPath()%>/portal/usergroup/addContinue.do";
				formObject.submit();
			}else{
				alert("用户组编码不能重复!");
				document.getElementById("gcode").focus();
				return false;
			}
		},
		requestHeaders: {Accept: 'application/json'},
		onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
		}
	}); 
		
	}
}
function saveExit(){
	var formObject = $("detailform");
	if(checkinput()){
		new Ajax.Request("<%=request.getContextPath()%>/portal/usergroup/check.do?cancel=true&random="+Math.random(), 
		{	
		parameters : encodeURI(Form.serialize(detailform)),
		method: 'get', 
		onComplete : function(resp){
			if("1"==resp.responseText){
				formObject.action = "<%=request.getContextPath()%>/portal/usergroup/addSave.do";
				formObject.submit();
			}else{
				alert("用户组编码不能重复!");
				document.getElementById("gcode").focus();
				return false;
			}
		},
		requestHeaders: {Accept: 'application/json'},
		onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
		}
	}); 
		
	}
}

function back(){	
		var mainmenu='<%=request.getParameter("mainmenu") %>';
		var submenuid= <%=request.getParameter("submenu") %>;
	var url="<%=request.getContextPath()%>/portal/usergroup/query.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
	window.location.href = url;	
}
</script>