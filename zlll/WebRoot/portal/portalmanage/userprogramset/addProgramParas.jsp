<%@ page language="java" import="java.util.*" pageEncoding="GB18030"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
  <link href="<%=request.getContextPath()%>/style/styleportal.css" rel="stylesheet" type="text/css" />
  <script>
  //��������
  function addparas(){
     if(document.getElementById("addparas").style.display=='none'){
     	document.getElementById("addparas").style.display="none";
  	 document.getElementById("addparas_update").style.display="none";
  	 document.getElementById("addparas").style.display="block";
     	
     }else{
     document.getElementById("addparas").style.display="none";
  	 document.getElementById("addparas_update").style.display="none";
     }
  	 
  }
  function closediv(){
  	 	 document.getElementById("addparas_update").style.display="none";
  	 document.getElementById("addparas").style.display="none";
  }
  function updateparams(){
		var selectrows = tmain.getSelectedRow();
		if(selectrows.length == 0){
			alert('��ѡҵ��ϵͳ');
			document.getElementById("addparas").style.display="none";
  			 document.getElementById("addparas_update").style.display="none";
			return;
		}
		if(selectrows.length> 1){
			alert('ֻ��ѡ��һ��ҵ����Ϣ');
			document.getElementById("addparas").style.display="none";
  	 document.getElementById("addparas_update").style.display="none";
			return;
		}
		
		var selectRow = selectrows[0];
		var yearparameter= '';
		if(undefined!=selectRow.yearparameter){
			yearparameter= selectRow.yearparameter;
		}
		
		var parametername = selectRow.parametername;
		var parametervalue = selectRow.parametervalue;
		var parameterorder = selectRow.parameterorder;
		var formObject=$('updateForm');
		formObject.yearparameter.value=yearparameter;
		formObject.parametername.value=parametername;
		formObject.parametervalue.value=parametervalue;
		formObject.parameterorder.value=parameterorder;
		if( document.getElementById("addparas_update").style.display=='none'){
		  	 document.getElementById("addparas").style.display="none";
  			 document.getElementById("addparas_update").style.display="none";
  	 document.getElementById("addparas_update").style.display="block";
  	 
		}else{
		 document.getElementById("addparas").style.display="none";
  			 document.getElementById("addparas_update").style.display="none";
		}
  	
  }
  //ɾ������
  function delparas(){
  }
  function cancelSave(){
    var submenuid = '<c:out value="${param.submenu}"/>';
    var mainmenu = '<c:out value="${param.mainmenu}"/>';
    var url = "<%=request.getContextPath()%>/common/loadProgramConfig.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
    window.location.href = url;
  }
  </script>
  
  <div id='query_t'> 
<span><span title=���Ӳ��� class=add_btn onclick="addparas()" onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>���Ӳ���</a></span></span>
<span><span title=�޸Ĳ��� class=mod_btn onclick="updateparams()" onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>�޸Ĳ���</a></span></span>
<span><span title=ɾ������ class=del_btn onclick="delContinue()" onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>ɾ������</a></span></span>
<span><span title=ɾ������ class=del_btn onclick="cancelSave()" onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>����</a></span></span>
</div> <script>
<!--���ܰ�ť�Զ��庯��start-->
var tabMenufun = new Object();
<!--���ܰ�ť�Զ��庯��end-->
 </script>
  
  <div id="" style="height:200px;">
	
		<div id="form_table_title">
			<ul>
				<li class="top">
					<div>ҵ��ϵͳ����</div>
				</li>
				<li><div id ="tmainpaginationdiv" style="color:#000000 ; margin-right:5px; height:23px;">
							<img id='img_row2column_tmainedit_table' src='/images/done_btn/edit_style.gif' style='float:left;margin-right:5px;cursor:pointer;'
								onclick="doShowEditSimpleWithTitle('tmain','edit_table',4,this)" title='��ת��' />
							 <img id='img_showNextRow_tmainedit_table' src='/images/done_btn/bottom_c.gif' title='�·�' style='float:left;cursor:pointer;margin-right:5px;' 
							 	onclick="showNextRow('tmain','edit_table',false,'null','null')"/>
							<img id='img_showBeforRow_tmainedit_table' src='/images/done_btn/top_c.gif' title='�Ϸ�' style='float:left;cursor:pointer;' 
								onclick="showBeforRow('tmain','edit_table',false,'null','null')"/>
							<script type='text/javascript' src='/js/row2column.js'></script>
							<a id='pageTagDiv' ></a>
					</div>
				</li>
			</ul>
		</div>
		<!--�뱣����div��a��ǩ -->
		<div id='edit_table' style='display:none;padding:0;margin:0;'></div>		
		<div id="containerline20" style="display: block;height:200px;">
			<div id=tmain_div style='position:relative;behavior:url(#default#userData);height:100%;width:100%;'  > </div>
	 	</div>
	<form name="mainListForm" id="mainListForm" action="#" method="post">
 <div id="addparas" style= "display:none">
 <div id="form_table_title_edit">
		<ul>
			<li class="top">
				<div>
					�༭��
				</div>
			</li>
		</ul>
 </div>
	<div id="form_table" style="display:block;">
    <table id ="mainedittable" width="100%" border="0" cellspacing="0" cellpadding="0" > 
      <tr> 
	      <th nowrap=nowrap style = 'width:7%'><div align=left>���</div></th>
	      <td nowrap=nowrap style = 'width:18%' align="left">
	      	<input name='yearparameter' id='yearparameter' type=text class=text title="" />
	      </td>
	      <th nowrap=nowrap style = 'width:7%'><div align=left>��������<span>*</span></div></th>
	      <td nowrap=nowrap style = 'width:18%' align="left">
	      	<input name='parametername' id='parametername' type=text class=text title="" />
	      </td>
	      <th nowrap=nowrap style = 'width:7%'><div align=left>����ֵ<span>*</span></div></th>
	      <td nowrap=nowrap style = 'width:18%' align="left">
	      	<input name='parametervalue' id='parametervalue' type=text class=text title="" />
	      </td>
	       <th nowrap=nowrap style = 'width:7%'><div align=left>����˳��<span>*</span></div></th>
	      <td nowrap=nowrap style = 'width:18%' align="left">
	      	<input name='parameterorder' id='parameterorder' type=text class=text title="" />
	      </td>
     </tr> 
  </table> 
</div>
<div id="confirm_exit_btn"> 
		<input type="button" id="saveAndOut" name="save"  value="����" onclick="saveContinue()" class="button_style" >
		<input type="button" id="cancel"   name="cancel"  value="�ر�" onclick="closediv()" class="button_style">	
</div>
<input type="hidden" name='programcode' id='programcode' value='<c:out value="${programcode}"/>' />
</div>

</form>
<form name="updateForm" id="updateForm" action="#" method="post">
 <div id="addparas_update" style= "display:none">
 <div id="form_table_title_edit">
		<ul>
			<li class="top">
				<div>
					�༭��
				</div>
			</li>
		</ul>
 </div>
	<div id="form_table" style="display:block;">
    <table id ="mainedittable" width="100%" border="0" cellspacing="0" cellpadding="0" > 
      <tr> 
	      <th nowrap=nowrap style = 'width:7%'><div align=left>���</div></th>
	      <td nowrap=nowrap style = 'width:18%' align="left">
	      	<input name='yearparameter' id='yearparameter' type=text class=text title="" />
	      </td>
	      <th nowrap=nowrap style = 'width:7%'><div align=left>��������<span>*</span></div></th>
	      <td nowrap=nowrap style = 'width:18%' align="left">
	      	<input name='parametername' id='parametername' type=text class=text title="" />
	      </td>
	      <th nowrap=nowrap style = 'width:7%'><div align=left>����ֵ<span>*</span></div></th>
	      <td nowrap=nowrap style = 'width:18%' align="left">
	      	<input name='parametervalue' id='parametervalue' type=text class=text title="" />
	      </td>
	       <th nowrap=nowrap style = 'width:7%'><div align=left>����˳��<span>*</span></div></th>
	      <td nowrap=nowrap style = 'width:18%' align="left">
	      	<input name='parameterorder' id='parameterorder' type=text class=text title="" />
	      </td>
     </tr> 
  </table> 
</div>
<div id="confirm_exit_btn"> 
		<input type="button" id="saveAndOut1" name="save1"  value="����" onclick="saveupdateContinue()" class="button_style" >
		<input type="button" id="cancel"   name="cancel"  value="�ر�" onclick="closediv()" class="button_style">	
</div>
<input type="hidden" name='programcode' id='programcode' value='<c:out value="${programcode}"/>' />
</div>

</form>
<% 
String paras=(String)request.getAttribute("paras");
%>
<script>
col = createColumnConfig();
col.id = "id";
col.name = "id";
col.type = "S";
col.title = "��ʾID";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "yearparameter";
col.name = "yearparameter";
col.type = "S";
col.title = "���";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "parametername";
col.name = "parametername";
col.type = "S";
col.title = "��������";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "parametervalue";
col.name = "parametervalue";
col.type = "S";
col.title = "����ֵ";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "parameterorder";
col.name = "parameterorder";
col.type = "S";
col.title = "����˳��";
ColumnConfig[col.id.toLowerCase()]=col;

col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}
}

tmain =new dataTable();
tmain.parent = document.getElementById('tmain_div');  
tmain.setTableHead(["checkbox","yearparameter","parametername","parametervalue","parameterorder"]);
         tmain.data = <%=paras%>;
//tmain.onrowclick = areamainclick;
tmain.show();
</script>
<script type="text/javascript">
	function checkInput(formObject){
		
		if(formObject.parametername.value.trim() == ""){
			alert("�������������!");
			return false;
		}
		if(formObject.parametervalue.value.trim() == ""){
			alert("���������ֵ!");
			return false;
		}
		if(formObject.yearparameter.value.trim()!=''){
	    	if(isNaN(formObject.yearparameter.value.trim())){
	    	alert("�������������!");
    		return false;
    		}
	    }
		if(isNaN(formObject.parameterorder.value.trim())||formObject.parameterorder.value.trim().length>1||formObject.parameterorder.value.trim()=='0'){
			alert("����˳��Ƿ�!");
			return false;
		}
		//�ȵȡ���
	    return true;
	}
function saveContinue(){
	var submenuid = '<c:out value="${param.submenu}"/>';
	var mainmenu = '<c:out value="${param.mainmenu}"/>';
	var formObject = $("mainListForm");
	if(checkInput(formObject)){
		formObject.action = "<%=request.getContextPath()%>/portal/userprogramset/addprogramparams.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
		formObject.submit();
	}
	
}
function saveupdateContinue(){
		var selectrows = tmain.getSelectedRow();
		if(selectrows.length == 0){
			alert('��ѡҵ��ϵͳ');
			return;
		}
		if(selectrows.length> 1){
			alert('ֻ��ѡ��һ��ҵ����Ϣ');
			return;
		}
	var selectRow = selectrows[0];
	var id=selectRow.id
	var submenuid = '<c:out value="${param.submenu}"/>';
	var mainmenu = '<c:out value="${param.mainmenu}"/>';
	var formObject = $("updateForm");
	if(checkInput(formObject)){
		formObject.action = "<%=request.getContextPath()%>/portal/userprogramset/updateprogramparams.do?mainmenu="+mainmenu+"&submenu="+ submenuid+"&id="+id;
		formObject.submit();		
	}
}
function delContinue(){
	
	
		var ids='';
		var selectrows = tmain.getSelectedRow();
		if(selectrows.length == 0){
			alert('��ѡҵ��ϵͳ');
			return;
		}
		if(confirm("�Ƿ�ɾ��?")==false){
			return;
		}
		for(var i=0;i<selectrows.length;i++){
			var selectRow = selectrows[i];
			ids +=selectRow.id+'@@';
		}
	
	
	var submenuid = '<c:out value="${param.submenu}"/>';
	var mainmenu = '<c:out value="${param.mainmenu}"/>';
	var code='<c:out value="${programcode}"/>';
	if(true){
		var url = "<%=request.getContextPath()%>/portal/userprogramset/delprogramparams.do?mainmenu="+mainmenu+"&submenu="+ submenuid+"&ids="+ids+"&code="+code;
		
		window.location.href = url;
	}
	
}

</script>