<%@ page language="java" import="java.util.*" pageEncoding="GB18030"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
  <link href="<%=request.getContextPath()%>/style/styleportal.css" rel="stylesheet" type="text/css" />
  <script>
  //新增库
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
  //删除库
  function delparas(){
 
  		var ids='';
		var selectrows = tmain.getSelectedRow();
		if(selectrows.length == 0){
			alert('请选业务系统');
			return;
		}
		 if(confirm("是否删除?")==false){
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
			alert('请选业务系统');
			document.getElementById("addparas").style.display="none";
  			 document.getElementById("addparas_update").style.display="none";
			return;
		}
		if(selectrows.length> 1){
			alert('只能选择一个业务信息');
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
  //返回
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
<span><span title=增加库 class=add_btn onclick="addparas()" onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>增加库</a></span></span>
<span><span title=修改库 class=mod_btn onclick="updatedatabase()" onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>修改库</a></span></span>
<span><span title=删除库 class=del_btn onclick="delparas()" onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>删除库</a></span></span>
<span><span title=删除库 class=del_btn onclick="cancelSave()" onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>返回</a></span></span>
</div> <script>
<!--功能按钮自定义函数start-->
var tabMenufun = new Object();
<!--功能按钮自定义函数end-->
 </script>
  
  <div id="" style="height:200px;">
	
		<div id="form_table_title">
			<ul>
				<li class="top">
					<div>编辑系统参数(支持多库)</div>
				</li>
				<li><div id ="tmainpaginationdiv" style="color:#000000 ; margin-right:5px; height:23px;">
							<img id='img_row2column_tmainedit_table' src='/images/done_btn/edit_style.gif' style='float:left;margin-right:5px;cursor:pointer;'
								onclick="doShowEditSimpleWithTitle('tmain','edit_table',4,this)" title='行转列' />
							 <img id='img_showNextRow_tmainedit_table' src='/images/done_btn/bottom_c.gif' title='下翻' style='float:left;cursor:pointer;margin-right:5px;' 
							 	onclick="showNextRow('tmain','edit_table',false,'null','null')"/>
							<img id='img_showBeforRow_tmainedit_table' src='/images/done_btn/top_c.gif' title='上翻' style='float:left;cursor:pointer;' 
								onclick="showBeforRow('tmain','edit_table',false,'null','null')"/>
							<script type='text/javascript' src='/js/row2column.js'></script>
							<a id='pageTagDiv' ></a>
					  </div>
				 </li>
			</ul>
		</div>
		<!--请保留此div和a标签 -->
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
					编辑区
				</div>
			</li>
		</ul>
 </div>
	<div id="form_table" style="display:block;">
    <table id ="mainedittable" width="100%" border="0" cellspacing="0" cellpadding="0" > 
      <tr> 
	      <th nowrap=nowrap style = 'width:7%'><div align=left>数据库名称<span>*</span></div></th>
	      <td nowrap=nowrap style = 'width:18%' align="left">
	      	<input name=dbname id=dbname type=text class=text title="" />
	      </td>
	      <th nowrap=nowrap style = 'width:7%'><div align=left>数据库账号/密码<span>*</span></div></th>
	      <td nowrap=nowrap style = 'width:18%' align="left">
	      	<input name=dbaccount id=dbaccount type=text class=text title="" />
	      </td>
	      <th nowrap=nowrap style = 'width:7%'><div align=left>年度<span>*</span></div></th>
	      <td nowrap=nowrap style = 'width:18%' align="left">
	      	<input name=dbyear id=dbyear type=text class=text title="" />
	      </td>
     </tr> 
  </table> 
</div>
<div id="confirm_exit_btn"> 
		<input type="button" id="saveAndOut" name="save"  value="保存" onclick="saveContinue()" class="button_style" >
		<input type="button" id="cancel"   name="cancel"  value="关闭" onclick="closediv()" class="button_style">	
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
					编辑区
				</div>
			</li>
		</ul>
 </div>
	<div id="form_table" style="display:block;">
    <table id ="mainedittable" width="100%" border="0" cellspacing="0" cellpadding="0" > 
      <tr> 
	      <th nowrap=nowrap style = 'width:7%'><div align=left>数据库名称<span>*</span></div></th>
	      <td nowrap=nowrap style = 'width:18%' align="left">
	      	<input name=dbname id=dbname type=text class=text title="" />
	      </td>
	      <th nowrap=nowrap style = 'width:7%'><div align=left>数据库账号/密码<span>*</span></div></th>
	      <td nowrap=nowrap style = 'width:18%' align="left">
	      	<input name=dbaccount id=dbaccount type=text class=text title="" />
	      </td>
	      <th nowrap=nowrap style = 'width:7%'><div align=left>年度<span>*</span></div></th>
	      <td nowrap=nowrap style = 'width:18%' align="left">
	      	<input name=dbyear id=dbyear type=text class=text title="" />
	      </td>
     </tr> 
  </table> 
</div>
<div id="confirm_exit_btn"> 
		<input type="button" id="saveAndOut" name="save"  value="保存" onclick="saveupdateContinue()" class="button_style" >
		<input type="button" id="cancel"   name="cancel"  value="关闭" onclick="closediv()" class="button_style">	
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
col.title = "标示Id";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "dbname";
col.name = "dbname";
col.type = "S";
col.title = "数据库名称";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "dbstr";
col.name = "dbstr";
col.type = "S";
col.title = "数据库账号/密码";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "year";
col.name = "year";
col.type = "S";
col.title = "年度";
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
			alert("请输入数据库名称!");
			return false;
		}
		if(formObject.dbaccount.value.trim() == ""){
			alert("请输入数据库账号/密码!");
			return false;
		}
		if(formObject.dbyear.value.trim()!=''){
	    	if(isNaN(formObject.dbyear.value.trim())){
	    	alert("请输入数字!");
    		return false;
    		}
	    }else{
	    	alert("请输入年度!");
	    	return false;
	    }
		
		//等等。。
	    return true;
	}
//添加
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
			alert('请选业务系统');
			return;
		}
		if(selectrows.length> 1){
			alert('只能选择一个业务信息');
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