<%@ page language="java" import="java.util.*" pageEncoding="GB18030"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
  <link href="<%=request.getContextPath()%>/style/styleportal.css" rel="stylesheet" type="text/css" />
  <script>
  //新增参数
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
  //删除参数
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
<span><span title=增加参数 class=add_btn onclick="addparas()" onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>增加参数</a></span></span>
<span><span title=修改参数 class=mod_btn onclick="updateparams()" onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>修改参数</a></span></span>
<span><span title=删除参数 class=del_btn onclick="delContinue()" onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>删除参数</a></span></span>
<span><span title=删除参数 class=del_btn onclick="cancelSave()" onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>返回</a></span></span>
</div> <script>
<!--功能按钮自定义函数start-->
var tabMenufun = new Object();
<!--功能按钮自定义函数end-->
 </script>
  
  <div id="" style="height:200px;">
	
		<div id="form_table_title">
			<ul>
				<li class="top">
					<div>业务系统参数</div>
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
	      <th nowrap=nowrap style = 'width:7%'><div align=left>年度</div></th>
	      <td nowrap=nowrap style = 'width:18%' align="left">
	      	<input name='yearparameter' id='yearparameter' type=text class=text title="" />
	      </td>
	      <th nowrap=nowrap style = 'width:7%'><div align=left>参数名称<span>*</span></div></th>
	      <td nowrap=nowrap style = 'width:18%' align="left">
	      	<input name='parametername' id='parametername' type=text class=text title="" />
	      </td>
	      <th nowrap=nowrap style = 'width:7%'><div align=left>参数值<span>*</span></div></th>
	      <td nowrap=nowrap style = 'width:18%' align="left">
	      	<input name='parametervalue' id='parametervalue' type=text class=text title="" />
	      </td>
	       <th nowrap=nowrap style = 'width:7%'><div align=left>参数顺序<span>*</span></div></th>
	      <td nowrap=nowrap style = 'width:18%' align="left">
	      	<input name='parameterorder' id='parameterorder' type=text class=text title="" />
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
	      <th nowrap=nowrap style = 'width:7%'><div align=left>年度</div></th>
	      <td nowrap=nowrap style = 'width:18%' align="left">
	      	<input name='yearparameter' id='yearparameter' type=text class=text title="" />
	      </td>
	      <th nowrap=nowrap style = 'width:7%'><div align=left>参数名称<span>*</span></div></th>
	      <td nowrap=nowrap style = 'width:18%' align="left">
	      	<input name='parametername' id='parametername' type=text class=text title="" />
	      </td>
	      <th nowrap=nowrap style = 'width:7%'><div align=left>参数值<span>*</span></div></th>
	      <td nowrap=nowrap style = 'width:18%' align="left">
	      	<input name='parametervalue' id='parametervalue' type=text class=text title="" />
	      </td>
	       <th nowrap=nowrap style = 'width:7%'><div align=left>参数顺序<span>*</span></div></th>
	      <td nowrap=nowrap style = 'width:18%' align="left">
	      	<input name='parameterorder' id='parameterorder' type=text class=text title="" />
	      </td>
     </tr> 
  </table> 
</div>
<div id="confirm_exit_btn"> 
		<input type="button" id="saveAndOut1" name="save1"  value="保存" onclick="saveupdateContinue()" class="button_style" >
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
col.title = "标示ID";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "yearparameter";
col.name = "yearparameter";
col.type = "S";
col.title = "年度";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "parametername";
col.name = "parametername";
col.type = "S";
col.title = "参数名称";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "parametervalue";
col.name = "parametervalue";
col.type = "S";
col.title = "参数值";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "parameterorder";
col.name = "parameterorder";
col.type = "S";
col.title = "参数顺序";
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
			alert("请输入参数名称!");
			return false;
		}
		if(formObject.parametervalue.value.trim() == ""){
			alert("请输入参数值!");
			return false;
		}
		if(formObject.yearparameter.value.trim()!=''){
	    	if(isNaN(formObject.yearparameter.value.trim())){
	    	alert("年度请输入数字!");
    		return false;
    		}
	    }
		if(isNaN(formObject.parameterorder.value.trim())||formObject.parameterorder.value.trim().length>1||formObject.parameterorder.value.trim()=='0'){
			alert("参数顺序非法!");
			return false;
		}
		//等等。。
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
		formObject.action = "<%=request.getContextPath()%>/portal/userprogramset/updateprogramparams.do?mainmenu="+mainmenu+"&submenu="+ submenuid+"&id="+id;
		formObject.submit();		
	}
}
function delContinue(){
	
	
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
	if(true){
		var url = "<%=request.getContextPath()%>/portal/userprogramset/delprogramparams.do?mainmenu="+mainmenu+"&submenu="+ submenuid+"&ids="+ids+"&code="+code;
		
		window.location.href = url;
	}
	
}

</script>