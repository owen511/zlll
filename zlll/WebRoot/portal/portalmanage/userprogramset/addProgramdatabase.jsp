<%@ page language="java" import="java.util.*" pageEncoding="GB18030"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
  <link href="<%=request.getContextPath()%>/style/styleportal.css" rel="stylesheet" type="text/css" />
  <script>
  //������
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
  //ɾ����
  function delparas(){
 
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
	var url = "<%=request.getContextPath()%>/portal/userprogramset/delprogramdb.do?mainmenu="+mainmenu+"&submenu="+ submenuid+"&ids="+ids+"&code="+code;
	window.location.href = url;		
		  	
  }
 function updatedatabase(){
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
		var dbname= selectRow.dbname;
		var dbaccount = selectRow.dbstr;
		var dbyear = selectRow.year;
		var formObject=$('updateForm');
		formObject.dbname.value=dbname;
		formObject.dbaccount.value=dbaccount;
		formObject.dbyear.value=dbyear;
		if( document.getElementById("addparas_update").style.display=='none'){
		  	 document.getElementById("addparas").style.display="none";
  			 document.getElementById("addparas_update").style.display="none";
  	 document.getElementById("addparas_update").style.display="block";
  	 
		}else{
		 document.getElementById("addparas").style.display="none";
  			 document.getElementById("addparas_update").style.display="none";
		}
  	
  }  
  //����
  function cancelSave(){
    var submenuid = '<c:out value="${param.submenu}"/>';
    var mainmenu = '<c:out value="${param.mainmenu}"/>';
    var url = "<%=request.getContextPath()%>/common/loadProgramConfig.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
    window.location.href = url;
  }
  function closediv(){
  	 	 document.getElementById("addparas_update").style.display="none";
  	 document.getElementById("addparas").style.display="none";
  }  
  </script>
  
  <div id='query_t'> 
<span><span title=���ӿ� class=add_btn onclick="addparas()" onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>���ӿ�</a></span></span>
<span><span title=�޸Ŀ� class=mod_btn onclick="updatedatabase()" onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>�޸Ŀ�</a></span></span>
<span><span title=ɾ���� class=del_btn onclick="delparas()" onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>ɾ����</a></span></span>
<span><span title=ɾ���� class=del_btn onclick="cancelSave()" onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>����</a></span></span>
</div> <script>
<!--���ܰ�ť�Զ��庯��start-->
var tabMenufun = new Object();
<!--���ܰ�ť�Զ��庯��end-->
 </script>
  
  <div id="" style="height:200px;">
	
		<div id="form_table_title">
			<ul>
				<li class="top">
					<div>�༭ϵͳ����(֧�ֶ��)</div>
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
	      <th nowrap=nowrap style = 'width:7%'><div align=left>���ݿ�����<span>*</span></div></th>
	      <td nowrap=nowrap style = 'width:18%' align="left">
	      	<input name=dbname id=dbname type=text class=text title="" />
	      </td>
	      <th nowrap=nowrap style = 'width:7%'><div align=left>���ݿ��˺�/����<span>*</span></div></th>
	      <td nowrap=nowrap style = 'width:18%' align="left">
	      	<input name=dbaccount id=dbaccount type=text class=text title="" />
	      </td>
	      <th nowrap=nowrap style = 'width:7%'><div align=left>���<span>*</span></div></th>
	      <td nowrap=nowrap style = 'width:18%' align="left">
	      	<input name=dbyear id=dbyear type=text class=text title="" />
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
	      <th nowrap=nowrap style = 'width:7%'><div align=left>���ݿ�����<span>*</span></div></th>
	      <td nowrap=nowrap style = 'width:18%' align="left">
	      	<input name=dbname id=dbname type=text class=text title="" />
	      </td>
	      <th nowrap=nowrap style = 'width:7%'><div align=left>���ݿ��˺�/����<span>*</span></div></th>
	      <td nowrap=nowrap style = 'width:18%' align="left">
	      	<input name=dbaccount id=dbaccount type=text class=text title="" />
	      </td>
	      <th nowrap=nowrap style = 'width:7%'><div align=left>���<span>*</span></div></th>
	      <td nowrap=nowrap style = 'width:18%' align="left">
	      	<input name=dbyear id=dbyear type=text class=text title="" />
	      </td>
     </tr> 
  </table> 
</div>
<div id="confirm_exit_btn"> 
		<input type="button" id="saveAndOut" name="save"  value="����" onclick="saveupdateContinue()" class="button_style" >
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
col.title = "��ʾId";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "dbname";
col.name = "dbname";
col.type = "S";
col.title = "���ݿ�����";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "dbstr";
col.name = "dbstr";
col.type = "S";
col.title = "���ݿ��˺�/����";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "year";
col.name = "year";
col.type = "S";
col.title = "���";
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
tmain.setTableHead(["checkbox","dbname","dbstr","year"]);
         tmain.data = <%=paras%>;
//tmain.onrowclick = areamainclick;
tmain.show();
</script>
<script type="text/javascript">
	function checkInput(formObject){
		if(formObject.dbname.value.trim() == ""){
			alert("���������ݿ�����!");
			return false;
		}
		if(formObject.dbaccount.value.trim() == ""){
			alert("���������ݿ��˺�/����!");
			return false;
		}
		if(formObject.dbyear.value.trim()!=''){
	    	if(isNaN(formObject.dbyear.value.trim())){
	    	alert("����������!");
    		return false;
    		}
	    }else{
	    	alert("���������!");
	    	return false;
	    }
		
		//�ȵȡ���
	    return true;
	}
//���
function saveContinue(){
	var submenuid = '<c:out value="${param.submenu}"/>';
	var mainmenu = '<c:out value="${param.mainmenu}"/>';
	var formObject = $("mainListForm");
	if(checkInput(formObject)){
		formObject.action = "<%=request.getContextPath()%>/portal/userprogramset/saveprogramdb.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
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
		formObject.action = "<%=request.getContextPath()%>/portal/userprogramset/updateprogramdb.do?mainmenu="+mainmenu+"&submenu="+ submenuid+"&id="+id;
		formObject.submit();		
	}
}
	

</script>