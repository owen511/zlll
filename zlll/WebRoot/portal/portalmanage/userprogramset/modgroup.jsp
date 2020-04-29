<%@page language="java" contentType="text/html; charset=GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%
	String gcode = (String)request.getAttribute("gcode");
    String gname = (String)request.getAttribute("gname");
 %>
<div>
    <form name="detailform" id="detailform" action="#" method="post" >
    <input type="hidden" id="maindata" name="maindata" value=""/>
    <input type="hidden" id="optype" name="optype" value="add"/>
		<div id="form_table_title" >
			<ul>
				<li class="top">
					<div>�޸��û���</div>
				</li>
			</ul>
		</div>
		<!-- �뱣����div��a��ǩ  -->
		<div id="edit_table" style="height:400px;">
		<!--��link�����༭�� -->
		<div id="editform" onkeydown = "switchFocus()"> 
		<table id ="edittable" width="100%" border="0" cellspacing="0" style= "TABLE-LAYOUT:fixed" cellpadding="0"> 
		   <tr> 
		      <th class = 'thwidth'><div align=left>�����<span>*</span></div></th>
		      <td nowrap=nowrap  colspan="1"  align="left">
		      	<input name=gcode id=gcode type="text" disabled value="<%=gcode%>" style="text-align:left"  maxlength="250"  class="textmin" title=""  />
			  </td> 
		      <th class = 'thwidth'><div align=left>������<span>*</span></div></th>
		      <td nowrap=nowrap colspan="1" align="left">
		      	<input name=gname id=gname type="text" value="<%=gname%>" style="text-align:left"  maxlength="250"  class="textmin" title=""  />
			  </td> 
		   </tr> 
      </table> 
    </div> 
	<input name=submenu id=submenu type="hidden" value="<c:out value='${param.submenu}'/>" />
	<input name=mainmenu id=mainmenu type="hidden" value="<c:out value='${param.mainmenu}'/>" />
	
	<div id="querybutton">
		<div align="right">
			
			<input type="button" id="saveAndOut" name="save"  value="���沢�˳�" onclick="saveExit()" class="button_style" >
			<input type="button" id="cancel"   name="cancel"  value="����" onclick="cancelSave()" class="button_style">	
		</div>
	</div>
	
		
</form>
<script type="text/javascript">
	function checkInput(formObject){
		if($('detailform').gcode.value.trim()==''){
	    	alert("�����������!");
    		return false;
	    }
	    if($('detailform').gname.value.trim()==''){
	    	alert("������������!");
    		return false;
	    }
	    if(isNaN($('detailform').gcode.value)){
	    	alert("�û���������������֣�");
	    	return false;
	    }
	    if($('detailform').gcode.value<1){
	    	alert("�û������Ӧ����0");
	    	return false;
	    }
	    if($('detailform').gcode.value.length>5){
	    	alert("�û������ӦС��6λ");
	    	return false;
	    }
	    if($('detailform').gcode.value!=$('detailform').gcode.value.trim()){
	    	alert("�û�����뺬�пո�");
	    	return false;
	    }
	    return true;
	}


    function saveUserGroup(resp){
	   		var group = eval(resp.responseText);
	   		if(group.size()==0){
	   		    alert("��������Ѵ���,����������!");
	   		}else{
	   			alert("����ɹ�!");
	   			$('detailform').gcode.value="";
	   			$('detailform').gname.value="";
			}	
    } 
	//���沢�˳�
	function saveExit(){
	    var formObject = $("detailform");
	    if(checkInput(formObject)){
	    	var gcode=document.getElementById("gcode").value;
	    	var gname=document.getElementById("gname").value;
	    	new Ajax.Request("<%=request.getContextPath()%>/common/SaveGroup.do?random="+Math.random(), 
	     	{
		   		parameters : "gcode="+gcode+"&gname=" + gname+"&sign=1",//sign=0Ϊ����
		   		method: 'get', 
		   		onComplete : aftersaveGroup,
		   		requestHeaders: {Accept: 'application/json'},
		   		onFailure : function(resp) {
		        }
			}); 
		 }
	}
	function aftersaveGroup(resp){
	   		var group = eval(resp.responseText);
	   		if(group.size()==0){
	   		    alert("��������Ѵ���,����������!");
	   		}else{
	   			//alert("����ɹ�!");
	   			var submenuid = '<c:out value="${param.submenu}"/>';
				var mainmenu = '<c:out value="${param.mainmenu}"/>';
				var url = "<%=request.getContextPath()%>/common/loadgroupprivilege.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
				window.location.href = url;
			}	
    } 
	//����
	function cancelSave(){
		var submenuid = '<c:out value="${param.submenu}"/>';
		var mainmenu = '<c:out value="${param.mainmenu}"/>';
		var url = "<%=request.getContextPath()%>/common/loadgroupprivilege.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
		window.location.href = url;
	}
	</script>