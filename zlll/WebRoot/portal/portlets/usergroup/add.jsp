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
					<div>�����û���
					</div>
				</li>
			</ul>
		</div>
		<!-- �뱣����div��a��ǩ  -->
		<div id="edit_table" style="height:400px;">
		<!--��link�����༭�� -->
		<div id="editform" onkeydown = "switchFocus()"> 
		<table id ="edittable" width="100%" border="0" cellspacing="0" style= "TABLE-LAYOUT:fixed" cellpadding="0"> 
		   <tr> 
		      <th class = 'thwidth'><div align=left>�û������&nbsp;&nbsp;&nbsp;&nbsp;<span>*</span></div></th>
		      <td nowrap=nowrap  colspan="1"  align="left">
		      	<input name="gcode" id="gcode"" type="text" style="text-align:left"  maxlength="5"  class="textmin" title="" />
			  </td> 
		      <th class = 'thwidth'><div align=left>�û�������&nbsp;&nbsp;&nbsp;&nbsp;<span>*</span></div></th>
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
			<input type="button" id="saveAndOut" name="save"  value="���沢����" onclick="saveContinue()" class="button_style" >
		<input type="button" id="saveAndOut" name="save"  value="���沢�˳�" onclick="saveExit()" class="button_style" >
		<input type="button" id="cancel"   name="cancel"  value="����" onclick="back()" class="button_style">	
		</div>
	</div>
</form>
<script type="text/javascript">
function checkinput(){
	var gcode = document.getElementById("gcode");
	var gname = document.getElementById("gname");

	if(gcode.value.trim()==''){
		alert('�������û������!');
		gcode.focus();
		return false;
	}
	if(isNaN(gcode.value.trim())){
		alert('�û������Ӧ��Ϊ5λ���ڵ�����!');
		gcode.focus();
		return false;
		
	}
	if(gname.value.trim()==''){
		alert('�������û�������!');
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
				alert("�û�����벻���ظ�!");
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
				alert("�û�����벻���ظ�!");
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