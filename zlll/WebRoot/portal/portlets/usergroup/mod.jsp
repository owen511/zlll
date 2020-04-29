<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
%>
<div>
    <form name="detailform" id="detailform" action="#" method="post" >
    <input type="hidden" id="maindata" name="maindata" value=""/>
    <input type="hidden" id="optype" name="optype" value="add"/>
    <input name="gcodes" id="gcodes" type="hidden" value=""/>
		<div id="form_table_title" >
			<ul>
				<li class="top">
					<div>修改用户组</div>
				</li>
			</ul>
		</div>
		<!-- 请保留此div和a标签  -->
		<div id="edit_table" style="height:400px;">
		<!--按link解析编辑区 -->
		<div id="editform" onkeydown = "switchFocus()"> 
		<table id ="edittable" width="100%" border="0" cellspacing="0" style= "TABLE-LAYOUT:fixed" cellpadding="0"> 
		   <tr> 
		      <th class = 'thwidth'><div align=left>用户组编码<span>*</span></div></th>
		      <td nowrap=nowrap  colspan="1"  align="left">
		      	<input name="gcode" id="gcode" type="text" disabled value="" style="text-align:left"  class="textmin" title=""  />
			  </td> 
		      <th class = 'thwidth'><div align=left>用户组名称<span>*</span></div></th>
		      <td nowrap=nowrap colspan="1" align="left">
		      	<input name="gname" id="gname" type="text" value="" style="text-align:left"  maxlength="20"  class="textmin" title=""  />
			  </td> 
		   </tr> 
      </table> 
    </div> 
	<input name=submenu id=submenu type="hidden" value="<c:out value='${param.submenu}'/>" />
	<input name=mainmenu id=mainmenu type="hidden" value="<c:out value='${param.mainmenu}'/>" />
	
	<div id="querybutton">
		<div align="right">
			
			<input type="button" id="saveAndOut" name="save"  value="保存并退出" onclick="saveExit()" class="button_style" >
			<input type="button" id="cancel"   name="cancel"  value="返回" onclick="back()" class="button_style">	
		</div>
	</div>
	
		
</form>
<script type="text/javascript">
window.onload = function(){
	var gcode = '<%=(String)request.getAttribute("gcode")%>';
	var gname = '<%=(String)request.getAttribute("gname")%>';
		document.getElementById("gcode").value = gcode;
		document.getElementById("gcodes").value = gcode;
		document.getElementById("gname").value = gname;
	
}
function checkinput(){	
	var gname = document.getElementById("gname");
	if(gname.value.trim()==''){
		alert('请输入用户组名称!');
		gname.focus();
		return false;
	}	
	return true;	
}

function saveExit(){
	var formObject = $("detailform");
	if(checkinput()){
		formObject.action = "<%=request.getContextPath()%>/portal/usergroup/mod.do";
		formObject.submit();
	}
}

function back(){	
	var submenuid = '<c:out value="${param.submenu}"/>';
	var mainmenu = '<c:out value="${param.mainmenu}"/>';
	var url="<%=basePath%>/portal/usergroup/query.do?mainmenu="+mainmenu+"&submenu="+ submenuid;	
	window.location.href = url;	
}
</script>