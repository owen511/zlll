<%@ page language="java" contentType="text/html; charset=GBK"
	pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<link rel="stylesheet" type="text/css" href="image/tbtree.css" />
<link href="image/SpryTabbedPanels.css" rel="stylesheet" type="text/css" />
<script language="JavaScript" type="text/javascript"
	src="image/SpryTabbedPanels.js"></script>
<script language="JavaScript" type="text/javascript"
	src="image/tbajax.js"></script>

<%
String rootPath = request.getContextPath();
String reportid = (String) request.getAttribute("reportid");
%>
<table width="85%" class="main_table_98" border="0" cellspacing="1"> 
	<tr class="main_table_title">
		<th width="47%" nowrap="nowrap"> 复制方案选择 </th>
		<th width="6%" nowrap="nowrap"> </th>
		<th width="47%" nowrap="nowrap"> 复制方案用户选择&nbsp; </th> 
	</tr> 
	<tr class="main_table_title_letter" > 
		<td width="45%"  align="left" nowrap="nowrap"> 
			<div id="containerline12"> 
				<div id='tschema_div' style='position:left;height:100;width:100%;'  > </div>
      </div>
		</td> 
		<th align="center"> </th>
		<td width="45%" align="left" nowrap="nowrap">
			<div id="containerline12"> 
				<!-- 使用标签创建，onclick 使用的方法必须放之前定义过 -->
				<div id='tuser_div' style='position:left;height:100%;width:100%;'  > </div>
			</div> 
		</td>
	</tr>
</table>

<div id="button_div"
	style="width: 100%; text-align:center;float: left; margin-left: 0px; margin-top: 5px; height: 30px;line-height:30px;overflow: hidden;">
	<input type="button" value="复制" class="button_style"
		onclick="saveschemas()" />
	<input type="button" value="返回" class="button_style" onclick="back()" />
</div>


<script>
function saveschemas(){
	//alert("请选中要复制的方案");
	var schemas = tschema.getSelectedRow();
	if(schemas.length<1){
		alert("请选中要复制的方案");
		return;
	}
	var users = tuser.getSelectedRow();
	if(users.length<1){
		alert("请选中要复制的用户");
		return;
	}
	var strschemas="";
  for(var i=0;i<schemas.length;i++){
  	strschemas = strschemas+schemas[i].schemaid+",";
  }
  var strusers="";
	for(var i=0;i<users.length;i++){
  	strusers = strusers+users[i].userid+",";
  }
	//alert(strschemas);
	//alert(strusers);

	var url='<%=rootPath%>/report/savecopyschematootherusers.do';
	var pars = 'reportid=<%=reportid%>&schemas=' + strschemas + '&users=' + strusers;
	//alert(url+pars);
	var myAjax = 
		new Ajax.Request(
			url,
			{
				method: 'post', 
				parameters: pars,
				onComplete : function(resp){},
			  onSuccess: afterOperation,
				onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
				 	alert("方案复制失败！");
					return;
					abort;
				}
			}
		);
	return;
}

function afterOperation(){
	alert("方案复制成功！");
}
function back(){
	window.close();
}

  col = createColumnConfig();
col.id = "schemaname";
col.name = "schemaname";
col.type = "S";
col.title = "方案名称";
col.style = "text-align:left";					
col.show = function(rownum,value,row,tdobj,datatable){
	if(row["schemaname"] != null && value != null){
	  tdobj.innerHTML = value;
	} else {
	  tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;	

	var isCreateMainAmtColumn = false;
	var isCreatedetailAmtColumn = true;
	var columnList = ['amt'];

	var tschema =new dataTable();
	 tschema.id ='tschema';
	tschema.parent = document.getElementById('tschema_div');
	
	tschema.setTableHead(["serial","checkbox","schemaname"]);
	
<%
				String json = (String)request.getAttribute("queryschemaJson");
				if(null == json || "".equals(json)){
					out.println("tschema.data = new Array();\n");
				}else{
					out.println("tschema.data = "+ json);
				}
			%>

	tschema.mainmenu = 30000;
	tschema.submenu = 30530;
	tschema.vchtypecode = 9001;
	tschema.showstatus = false;
	tschema.show();
	tschema.allflag = false ;
</script>

<script>
col = createColumnConfig();
col.id = "code";
col.name = "code";
col.type = "S";
col.title = "编码";
col.style = "text-align:left;";
col.show = function(rownum,value,row,tdobj,datatable){
	if(row["code"] != null && value != null){
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
col.title = "用户名称";
col.style = "text-align:left;width:80%;word-wrap: break-word; word-break: break-all;overflow=auto;";
col.show = function(rownum,value,row,tdobj,datatable){
	if(row["name"] != null && value != null){
	  tdobj.innerHTML = value;
	} else {
	  tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;	

	var tuser =new dataTable();
	 tuser.id ='tuser';
	tuser.isCreateAmtColumn= true;
	tuser.columnList = ['amt'];
	 tuser.tabletype = 'DetailList';
	tuser.parent = document.getElementById('tuser_div');
	tuser.setTableHead(["serial","checkbox","code","name"]);
	<%
				String json2 = (String)request.getAttribute("userList");
				if(null == json2 || "".equals(json2)){
					out.println("tuser.data = new Array();\n");
				}else{
					out.println("tuser.data = "+ json2);
				}
			%>
	tuser.mainmenu = 30000;
	tuser.submenu = 30530;
	tuser.vchtypecode = 9001;
	tuser.showstatus = false;
	tuser.show();
</script>