<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String mainmenu = request.getParameter("mainmenu");
	String submenu = request.getParameter("submenu");
	String reportid = request.getParameter("reportid");
	String matchpara = (String)request.getAttribute("matchpara");
	String matchremark = (String)request.getAttribute("matchremark");
	//out.println(matchremark);
	//String json = (String) request.getAttribute("json");
%>
<script>
var billObj=null;
var mod = false;
function cancel(){
	window.location.href = "/report/reportedit.do?mainmenu=<%=mainmenu%>&submenu=<%=submenu%>";
}
function saveExit(){
	var formObject = $("rptform");
	var matchpara = formObject.matchpara.value;
	var templatename = formObject.templatename.value;
	var rptfile = formObject.rpt.value;
	var matchpress = formObject.matchpress.value;
	var templateid = formObject.templateid.value;
	//alert("请输入匹配参数！");	
	if(matchpara == ""){
		alert("请输入匹配参数！");
		formObject.matchpara.focus();
		return;
	}
	if(templatename == ""){
		alert("请输入模板名称！");
		formObject.templatename.focus();
		return;
	}    	
	if(rptfile == "" && templateid==""){
	 alert("请选择报表模板文件！");
	 formObject.rpt.focus();
	 return;
	}
	if(matchpress == ""){
		alert("请输入匹配表达式！");
		formObject.matchpress.focus();
		return;
	}
	//alert("请输入匹配参数！");
	formObject.action = '/report/moretemplate_save.do?templateid='+templateid+'&mainmenu=<%=mainmenu%>&submenu=<%=submenu%>&reportid=<%=reportid%>';
	
	formObject.submit();
	mod = false;
}

function addRecord(){
	if(checkNull()){
		return;
	}
	if(billObj!=null){
		billObj.checked=false;
	}
	billObj = new Object();
	billObj.checked=true;
	tmain.appendRow(billObj);
	//tmain.selectedrow(billObj,true);
  resetInput();
	tmain.draw();
}

function resetInput(){
	var formObject = $("rptform");
	var matchpara = formObject.matchpara.value;
	var matchremark = formObject.matchremark.value;
	formObject.reset();
	formObject.matchpara.value = <%=reportid%>;
  formObject.matchpara.value = matchpara;
	formObject.matchremark.value = matchremark;
}

function delRecord(){
	if(tmain.getSelectedRow()==0){
		alert("请首先选择1个记录，然后按[删除]！");
		return false;
	}else if(tmain.getSelectedRow() > 1){
		alert("只能选择1个记录，然后按[删除]！");
		return false;
	}
	if(!confirm('确定要删除所选记录吗?')) {
		return false;
	}
	var selectedRow=tmain.getSelectedRow();
	var templateid=selectedRow[0].templateid;
	//alert(templateid);
	if(templateid==undefined){
		var index;
		for(var i=0;i<tmain.data.length;i++){
			if(tmain.data[i]==billObj){
			    index=i;
			}
		}
		var datas = tmain.removeSelected();
		if(tmain.data.length>0){
			if(tmain.data.length==index){
				billObj=tmain.data[index-1];
			}
			else
			{
			  billObj=tmain.data[index];
			}
			billObj.checked=true;
			fillInput(billObj,true);
			//$("amt").focus();
		}else
		{
			resetInput();
			billObj=null;
		}
		tmain.draw();
		mod = false;
		return false;
	}
	var url="/report/moretemplate_del.do?mainmenu=<%=mainmenu%>&submenu=<%=submenu%>&reportid=<%=reportid%>";
	var pars="&templateid="+templateid;
	var myAjax = new Ajax.Request(url,
			{ method: 'post', 
				parameters: pars,
				onComplete : function(resp){
					var newContext=resp.responseText;
					if(newContext == ""){
						 window.location="/report/moretemplate.do?mainmenu=<%=mainmenu%>&submenu=<%=submenu%>&reportid=<%=reportid%>";
					}else{
						 alert(newContext);
					}
				},
				onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
					alert("操作失败！");
				}
			}
		);		
	//mod = false;
}

function mainclick(row){
	if(tmain ==null ||tmain.data == null || tmain.data.length <1 ){
		return;
	}
	var selectrows = tmain.getSelectedRow();
	var selectrow=selectrows[0];
	if(tmain != null && tmain.data != null && tmain.data.length >0 && billObj != selectrow){
		if(!checkNull()){			
			fillInput(selectrow,true);
			billObj=selectrow;
			//$("amt").focus();
			mod = false;
		}
		else
		{
			selectrow.checked=false;
			billObj.checked=true;
			tmain.draw();
		}
	}	
}

function fillInput(row,all){
		var formObject = $("rptform");
    formObject.templateid.value = row.templateid;	
		formObject.templatename.value=row.templatename;
		if (row.remark != null){
			formObject.remark.value=row.remark;
		}
		else{
			formObject.remark.value= "";
		}
		formObject.matchpress.value= row.matchpress;
}

function checkNull(){
	if(billObj==null) return false;
	if($('matchpara').value==""){
		alert("匹配参数不能为空!");
		return true;
	}
	if($('templatename').value==""){
		alert("模板名称不能为空!");
		return true;
	}
	if($('matchpress').value==""){
		alert("匹配表达式不能为空!");
		return true;
	}
	if (mod==true){
		alert("当前数据未保存，请先保存!");
		return true;
	}
	return false;
}

function changeData(){
	if(billObj!=null){
		mod = true;
		
		var formObject = $("rptform");
    billObj.templateid =formObject.templateid.value;		
		billObj.templatename=formObject.templatename.value;
		billObj.remark=formObject.remark.value;	
		billObj.matchpress=formObject.matchpress.value;
		tmain.draw();
		
	}
}
function download(templateid){
	window.location.href="/report/moretemplatedownload.do?mainmenu=<%=mainmenu %>&submenu=<%=submenu%>&reportid=<%=reportid%>&templateid="+templateid;	
}
</script>
<body onload="loadshow()">     
  <form action="/report/moretemplate_save.do" name='rptform'	method="post" ENCTYPE="multipart/form-data">	
		<div id="form_table_title_edit">
			<ul>
				<li class="top">
					<div>匹配参数定义区</div>
				</li>
			</ul>
		</div>
		<div id="edit_table">	  
			<table border="0" cellpadding="0px" cellspacing="0px">
				<tr>
					<th nowrap="nowrap" width="10%">匹配参数<span>*</span></th>
					<td nowrap="nowrap" width="20%">
						<input name="matchpara" type="text" style="width:300px"  class="main_lookup_input" value="<%=matchpara%>" onchange="changeData()"/>
					</td>
					<th nowrap="nowrap" width="10%">匹配参数说明<span></span></th>
					<td nowrap="nowrap">
						<input name="matchremark" type="text" style="width:300px"  class="main_lookup_input" value="<%=matchremark%>" onchange="changeData()"/>
					</td>
				</tr>     
			</table>
		</div>	
		<div id="form_table_title">
			<ul>
				<li class="top">
					<div>报表模版列表</div>
				</li>
			</ul>
		</div>
		<div id="containerline15" style='position:relative;height:expression(this.offsetParent.offsetHeight/2);width:100%;'>
			<div id='tmain_div'></div>							
		</div>
		<script type="text/javascript"> 
			col = createColumnConfig();
			col.id = "reportid";
			col.name = "reportid";
			col.type = "N";
			col.title = "reportid";
			col.show = function(rownum,value,row,tdobj,datatable){
				if(row["reportid"] != null && value != null){
					tdobj.innerHTML = value;
				} else {
					tdobj.innerHTML = "";
				}
			}
			ColumnConfig[col.id.toLowerCase()]=col;
			//ID
			col = createColumnConfig();
			col.id = "templateid";
			col.name = "templateid";
			col.type = "N";
			col.title = "templateid";
			col.show = function(rownum,value,row,tdobj,datatable){
				if(row["templateid"] != null && value != null){
					tdobj.innerHTML = value;
				} else {
					tdobj.innerHTML = "";
				}
			}
			ColumnConfig[col.id.toLowerCase()]=col;

			//类型编码
			col = createColumnConfig();
			col.id = "templatename";
			col.name = "templatename";
			col.type = "S";
			col.title = "模板名称";
			col.show = function(rownum,value,row,tdobj,datatable){
				if(row["templatename"] != null && value != null){
					tdobj.innerHTML = value;
				} else {
					tdobj.innerHTML = "";
				}
			}
			ColumnConfig[col.id.toLowerCase()]=col;
			
			// 类型名称
			col = createColumnConfig();
			col.id = "rpt";
			col.name = "rpt";
			col.type = "S";
			col.title = "模版文件";
			col.show = function(rownum,value,row,tdobj,datatable){
				if(row["rpt"] != null && value != null){
					tdobj.innerHTML = value;
				} else {
					tdobj.innerHTML = "";
				}
			}
			ColumnConfig[col.id.toLowerCase()]=col;
			//	<INPUT TYPE="FILE" NAME="uploadfile" SIZE="25"/>
			// 数据存储表 tablecodeinner
			col = createColumnConfig();
			col.id = "remark";
			col.name = "remark";
			col.type = "S";
			col.title = "说明";
			col.show = function(rownum,value,row,tdobj,datatable){				
				if(row["remark"] != null && value != null && value != "null"){
					tdobj.innerHTML = value;
				} else {
					tdobj.innerHTML = "";
				}
			}
			ColumnConfig[col.id.toLowerCase()]=col;
			
			// 分组条件
			col = createColumnConfig();
			col.id = "matchpress";
			col.name = "matchpress";
			col.type = "S";
			col.title = "匹配表达式";
			col.show = function(rownum,value,row,tdobj,datatable){
				if(row["matchpress"] != null && value != null){
					tdobj.innerHTML = value;
				} else {
					tdobj.innerHTML = "";
				}
			}

			ColumnConfig[col.id.toLowerCase()]=col;
			
			// 分组条件
			col = createColumnConfig();
			col.id = "download";
			col.name = "download";
			col.type = "S";
			col.title = "下载";
			col.show = function(rownum,value,row,tdobj,datatable){
				tdobj.innerHTML = "<a href='#' onclick='javascript:download("+row.templateid+")'>下载</a>";
			}
			ColumnConfig[col.id.toLowerCase()]=col;
			
			var tmain =new dataTable();
			tmain.parent = document.getElementById('tmain_div');
			tmain.setTableHead(["serial","radio","templatename","matchpress","remark","download"]);
			<%
				String json = (String)request.getAttribute("json");
				if(null == json || "".equals(json)){
					out.println("tmain.data = new Array();\n");
				}else{
					out.println("tmain.data = "+ json);
				}
			%>
			tmain.onrowclick = mainclick;
			tmain.show();			
		</script>	
	
		<div id="form_table_title_edit">
			<ul>
				<li class="top">
					<div>报表模版列表编辑区</div>
				</li>
			</ul>
		</div>
		<div id="edit_table">
			<input type="hidden" name="reportid" value=<%=reportid%>>	
			<input type="hidden" name="templateid"  value="">	
			<table border="0" cellpadding="0px" cellspacing="0px">
				<tr>
						<th nowrap="nowrap" width="10%">模板名称<span>*</span></th>
						<td nowrap="nowrap" width="20%">
							<input name="templatename" type="text" style="width:300px"  class="main_lookup_input" value="" onchange="changeData()"/>
						</td>
						<th nowrap="nowrap" width="10%">模版文件<span></span></th>
						<td nowrap="nowrap">
							<input name="rpt" type="file" name="rpt" style="width:300px" onchange="changeData()"/>
						</td>             
					</tr>    
					<tr>
						<th nowrap="nowrap" width="10%">匹配表达式<span>*</span></th>
						<td nowrap="nowrap" width="20%">
							<input name="matchpress" type="text" style="width:300px" class="main_lookup_input" value="" onchange="changeData()"/>
						</td>
						<th nowrap="nowrap" width="10%">说明<span></span></th>
						<td nowrap="nowrap">
							<input name="remark" type="text" style="width:300px" class="main_lookup_input" value="" onchange="changeData()"/>
						</td>             
					</tr>      
			</table>
		</div>	
	</form>
  <div > <!-- InstanceBeginEditable name="EditRegion8" -->		
		<div> <!-- InstanceBeginEditable name="EditRegion7" -->
			<div id="confirm_exit_btn">
							<input name="submit1" type="button" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'" value="增加" onclick="addRecord()"/>
							<input name="submit1" type="button" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'" value="删除" onclick="delRecord()"/>
										<input name="submit2" type="button" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'" value="保存" onclick="saveExit()" />
										<input name="submit3" type="button" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'" value="返回"  onclick="cancel();"/>
			</div>
		</div>
	  <!--main-->
	</div>
	<div id="foot"></div>
<!--没有id的div-->
</body>
<!-- InstanceEnd --></html>
<script type="text/javascript"> 
if(tmain.data.length>0){
	tmain.data[0].checked=true;
	mainclick(tmain.data[0]);
	tmain.show();
}
</script>