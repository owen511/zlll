<%@page language="java" contentType="text/html; charset=GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String mainmenu = request.getParameter("mainmenu");
	String submenu = request.getParameter("submenu");
%>
<script>
//保存主单信息的全局变量
var mainVouch = new Object();
<%
	if(null != request.getAttribute("expressionrule")){
		out.println("mainVouch = "+request.getAttribute("expressionrule").toString());
	}
%>

var actions = <c:out value="${actionDescDTOs}" escapexml="false"/>;
//保存明细列表行数据的全局变量
var detailObj=null;

function saveExit(){
    var formObject = $("form1");
    if(!checkdata())return false;
    mainVouch.parameters=tdetail.data;
    formObject.json.value = Object.toJSON(mainVouch);
    formObject.action = ROOT_PATH+"/system/expressionrule/manage/add/savereturn.do?mainmenu=<%=mainmenu%>&submenu=<%=submenu%>";
	formObject.submit();
}


function cancel(){
   if (confirm("数据未保存，是否保存数据?")){
   		saveExit();
   }else{
	    var url = '<%=basePath%>/system/expressionrule/manage/index.do?mainmenu=<%=mainmenu%>&submenu=<%=submenu%>' ;
	    window.location.href = url;
    }
}

//检查输入信息
function checkdata(){
	if(!addMainEditFormInput()) return false;
	if(!addEditFormInput()) return false;
	return true;
}
function enableEditFormInput(){
	$("form1").parametercode.disabled="";
	$("form1").parametername.disabled="";
	$("form1").parametertype.disabled="";
	$("form1").parametervalue.disabled="";
}
function disEnableEditFormInput(){
	$("form1").parametercode.disabled="disabled";
	$("form1").parametername.disabled="disabled";
	$("form1").parametertype.disabled="disabled";
	$("form1").parametervalue.disabled="disabled";
}

// 校验用户录入信息
function checkNull(){
  if(detailObj!=null){
	if(!addEditFormInput()){
	    return false;
	}
  }	
  return true;
}
function datasynchfromtable(rowObj){
	if(typeof(rowObj)=="object"){
		if(typeof(rowObj.code) !="undefined"){
			$("form1").parametercode.value = rowObj.code;
		}
		if(typeof(rowObj.name) !="undefined"){
			$("form1").parametername.value = rowObj.name;
		}
		if(typeof(rowObj.type) !="undefined"){
			$("form1").parametertype.value = rowObj.type;
		}
		if(typeof(rowObj.value) !="undefined"){
			$("form1").parametervalue.value = rowObj.value;
		}
	}
}

function maindatasynchfromtable(rowObj){
	if(typeof(rowObj)=="object"){
		if(typeof(rowObj.code) !="undefined"){
			$("form1").code.value = rowObj.code;
		}
		if(typeof(rowObj.name) !="undefined"){
			$("form1").name.value = rowObj.name;
		}
		if(typeof(rowObj.wfdescid) !="undefined"){
			$("form1").wfdescid.value = rowObj.wfdescid;
		}
		if(typeof(rowObj.actiondescid) !="undefined"){
			$("form1").actiondescid.value = rowObj.actiondescid;
		}
		if(typeof(rowObj.expression) !="undefined"){
			$("form1").expression.value = rowObj.expression;
		}
	}
}

function clearEditFormInput(){
	$("form1").parametercode.value = "";
	$("form1").parametername.value = "";
	$("form1").parametertype.value = "";
	$("form1").parametervalue.value = "";
}

function addMainEditFormInput(){
	var obj;
	obj = $("form1").code;
	if(obj.value == ""){
		alert("编码不能为空!");
		return false;
	}
	obj = $("form1").name;
	if(obj.value == ""){
		alert("名称不能为空!");
		return false;
	}
	obj = $("form1").wfdescid;
	if(obj.value == ""){
		alert("请选择工作流!");
		return false;
	}
	obj = $("form1").actiondescid;
	if(obj.value == ""){
		alert("请选择工作流动作!");
		return false;
	}
	obj = $("form1").expression;
	if(obj.value == ""){
		alert("数学表达式不能为空!");
		return false;
	}
	return true;
}

function addEditFormInput(){
	var obj;
	obj = $("form1").parametercode;
	if(obj.value == ""){
		alert("参数编码不能为空!");
		return false;
	}
	obj = $("form1").parametername;
	if(obj.value == ""){
		alert("参数名称不能为空!");
		return false;
	}
	obj = $("form1").parametertype;
	if(obj.value == ""){
		alert("请选择参数类型!");
		return false;
	}
	obj = $("form1").parametervalue;
	if(obj.value == ""){
		alert("参数值不能为空!");
		return false;
	}
	return true;
}
function maindatasynch(obj){
	try{
		var rowObj = eval("mainVouch");
		if( rowObj!=null && typeof(rowObj) == "object"){
			rowObj.code = $("form1").code.value;
			rowObj.name = $("form1").name.value;
			rowObj.wfdescid = $("form1").wfdescid.value;
			rowObj.actiondescid = $("form1").actiondescid.value;
			rowObj.expression = $("form1").expression.value;
		}
	}catch(e){
		throw e;
	}
}
function datasynch(obj){
	var rowObj;
	try{
		var tObj = eval("tdetail");
		if(typeof(tObj) == "object" && tObj.objecttype == "datatable"){ 
			var selectRows = tObj.getSelectedRow();
			if(selectRows.length>0){
				rowObj = selectRows[0];
			}
		}
		if( rowObj!=null && typeof(rowObj) == "object"){
			rowObj.code= $("form1").parametercode.value;
			rowObj.name= $("form1").parametername.value;
			rowObj.type= $("form1").parametertype.value;
			rowObj.value= $("form1").parametervalue.value;
			tObj.draw();
		}
	}catch(e){
		throw e;
	}
}
//点击添加明细
function addDetail(){
	if(!checkNull()) return;
	// 通过主单信息创建一条明细数据
	var detailrow = new Object;
	datasynchfromtable(detailrow);
	
	//清除原数据的选择状态
	if(tdetail != null && tdetail.data != null && tdetail.data.length >0 ){
		for(var i=0;i<tdetail.data.length;i++){
			tdetail.data[i].checked=false;
		} 
	}
	
	//新增行默认选中状态
	detailrow.checked = true;
	tdetail.appendRow(detailrow);
	enableEditFormInput();
	
	detailObj=detailrow;
	
    clearEditFormInput();
    datasynchfromtable(detailrow);
}

//点击删除明细
function delDetail(){
	if(detailObj==null){
    	alert("请选中要删除的明细！");
    	return;
    }
	// 删除选中的数据
	var index;
	for(var i=0;i<tdetail.data.length;i++){
		if(tdetail.data[i]==detailObj){
		    index=i;
		}
	}
	var datas = tdetail.removeSelected();
	if(tdetail.data.length>0){
		if(tdetail.data.length==index){
			detailObj=tdetail.data[index-1];
		}
		else
		{
		    detailObj=tdetail.data[index];
		}
		detailObj.checked=true;
		datasynchfromtable(detailObj);
	}else
	{
		enableEditFormInput();
		disEnableEditFormInput();
		detailObj=null;
	}
	tdetail.draw();
}

function changeWfdescid(wfdescid,actiondescid){
	var falg = false;
	actiondescid.options.length=0;
	var list = new Array();
	for(var i=0;i<actions.length;i++){
		var action = actions[i];
		if(action.wfdescid == wfdescid.value){
			var option = new Option(action.code+"-"+action.name,action.actiondescid);
			actiondescid.options.add(option);
			if(actiondescid.value == action.actiondescid){
				falg = true;
			}
		}
	}
	if(!falg){
		actiondescid.value = "";
	}
}
</script>
<form name="form1" id="form1"
	action="<%=basePath%>/system/expressionrule/manage/add/savereturn.do?mainmenu=<c:out value='${param.mainmenu}'/>&submenu=<c:out value='${param.submenu}'/>"
	method="post">
	<div id="form_table_title_edit">
		<ul>
			<li class="top">
				<div>
					数学表达式规则主信息编辑区
				</div>
			</li>
		</ul>
	</div>
	<div id="form_table">
		<table border="0" cellpadding="0px" cellspacing="0px">
			<tr>
				<th nowrap="nowrap">
					名称
					<span>*</span>
				</th>
				<td nowrap="nowrap" width="20%">
					<input type="text" name=name id=name value="" onkeyup=";maindatasynch(this);"/>
				</td>
				<th nowrap="nowrap">
					编码
					<span>*</span>
				</th>
				<td nowrap="nowrap">
					<input type="text" name="code" id="code" value="" onkeyup=";maindatasynch(this);"/>
				</td>
				<th nowrap="nowrap">
					工作流
					<span>*</span>
				</th>
				<td nowrap="nowrap">
					<select id="wfdescid" name="wfdescid" onchange=";maindatasynch(this);changeWfdescid(this,$('form1').actiondescid);">
						<c:forEach var="wfdesc" items="${wfDescDTOs}">
							<option value="<c:out value='${wfdesc.wfdescid}'/>">
								<c:out value='${wfdesc.name}' />
							</option>
						</c:forEach>
					</select>
				</td>
			</tr>
			<tr>
				<th nowrap="nowrap">
					工作流动作
					<span>*</span>
				</th>
				<td nowrap="nowrap">
					<select id="actiondescid" name="actiondescid" onchange=";maindatasynch(this);">
					</select>
				</td>
				<th nowrap="nowrap">
					数学表达式
				</th>
				<td nowrap="nowrap" colspan="3">
					<input name="expression" id="expression" value="" maxlength="50" size="50"
						type="text" onkeyup=";maindatasynch(this);"/>
				</td>
			</tr>
		</table>
	</div>
	<input name="json" id="json" value="<c:out value='${json} }'/>" type="hidden"/>

	<div id="form_table_title">
		<ul>
			<li class="top">
				<div>
					表达式规则明细信息
				</div>
			</li>
		</ul>
	</div>
	<!--请保留此div和a标签 -->
	<div id="containerline6">
		<div id='tdetail_div' style='padding: 0; margin: 0;'></div>
		<script type="text/javascript">
		col = createColumnConfig();
		col.id = "code";
		col.name = "code";
		col.type = "S";
		col.title = "编码";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(value != null){
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
		col.title = "名称";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(value != null){
			  tdobj.innerHTML = value;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "value";
		col.name = "value";
		col.type = "S";
		col.title = "值";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(value != null){
			  tdobj.innerHTML = value;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "type";
		col.name = "type";
		col.type = "S";
		col.title = "类型";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(value != null){
			  if(value == 1){
			  	tdobj.innerHTML = "数值类型";
			  }else if(value == 2){
			  	tdobj.innerHTML = "单据属性类型";
			  }else if(value == 3){
			  	tdobj.innerHTML = "查询语句类型";
			  }else{
			  	tdobj.innerHTML = "";
			  }
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		// 将选中的数据填写到编辑区内
		function detailclick(row){
			if(tdetail ==null ||tdetail.data == null || tdetail.data.length <1 ){
				return;
			}
			var selectrows = tdetail.getSelectedRow();	
			var selectrow=selectrows[0];
			if(detailObj != selectrow){
				if(checkNull()){
				    enableEditFormInput();
					detailObj = selectrow;
					datasynchfromtable(row);
				}
				else
				{
					selectrow.checked=false;
					detailObj.checked=true;
					tdetail.draw();
				}
			}
		
		}

		var tdetail =new dataTable();
		tdetail.isWrap = true;
		tdetail.parent = document.getElementById('tdetail_div');
		tdetail.setTableHead(["serial","radio","code","name","type","value"]);
		tdetail.data = new Array();
		tdetail.onrowclick = detailclick;
		tdetail.show();
	</script>
	</div>
	<div id="form_table_title_edit">
		<ul>
			<li class="top">
				<div>
					表达式规则明细信息编辑区
				</div>
			</li>
		</ul>
	</div>
	<div id="form_table">
		<table border="0" cellpadding="0px" cellspacing="0px">
			<tr>
				<th nowrap="nowrap">
					参数编码
					<span>*</span>
				</th>
				<td nowrap="nowrap" width="20%">
					<input type="text" name="parametercode" id="parametercode" value="" onkeyup=";datasynch(this);"/>
				</td>
				<th nowrap="nowrap">
					参数名称
					<span>*</span>
				</th>
				<td nowrap="nowrap">
					<input type="text" name="parametername" id="parametername" value="" onkeyup=";datasynch(this);"/>
				</td>
				<th nowrap="nowrap">
					参数类型
					<span>*</span>
				</th>
				<td nowrap="nowrap">
					<select name="parametertype" id="parametertype" onchange=";datasynch(this);">
						<option value="1" selected>
							数值类型
						</option>
						<option value="2">
							单据属性类型
						</option>
						<option value="3">
							查询语句类型
						</option>
					</select>
				</td>
			</tr>
			<tr>
				<th nowrap="nowrap">
					参数值
					<span>*</span>
				</th>
				<td nowrap="nowrap" colspan="5">
					<input name="parametervalue" id="parametervalue" value=""
						maxlength="255" size="100" type="text" onkeyup=";datasynch(this);"/>
				</td>
			</tr>
		</table>
	</div>
	<div id="confirm_exit_btn">
		<input name="del" type="button" value="增加明细参数"
			class="main_lookup_input" onclick="addDetail(this.form)" />
		<input name="add" type="button" value="删除明细参数"
			class="main_lookup_input" onclick="delDetail(this.form)" />
		<input name="submit2" type="button" class="button_style"
			onmouseover="this.className='OverBtn'"
			onmouseout="this.className='button_style'"
			onmousedown="this.className='down'" value="保存" onclick="saveExit()" />
		<input name="submit3" type="button" class="button_style"
			onmouseover="this.className='OverBtn'"
			onmouseout="this.className='button_style'"
			onmousedown="this.className='down'" value="返回" onclick="cancel();" />
	</div>
</form>
<span> 注：<br /> 1、表达式内只能包含数字及A-Z大写字母及数学运算符,A-Z的大写字母将成为参数在运算时转换<br />
	2、参数只能使用：A-Z二十六个大写字母<br />
	3、参数值中：当要使用单据的属性的，请在{@}内写上属性的名，如{@billcode},如想使用多级属性时可以写成{@bdgagency.state}
</span>
<script type="text/javascript">
//页面加载时，将各输入框设为不可用
disEnableEditFormInput();

maindatasynchfromtable(mainVouch);
if(null != mainVouch.parameters && mainVouch.parameters.length > 0){
	tdetail.data = mainVouch.parameters;
	tdetail.data[0].checked = true;
	datasynchfromtable(tdetail.data[0]);
	enableEditFormInput();
	tdetail.show();
}else{
	mainVouch.parameters = new Array();
}

changeWfdescid($('form1').wfdescid,$('form1').actiondescid);
</script>
<script type="text/javascript">
<%
	String error = (String)request.getAttribute("error");
	if(null != error && !"".equals(error.trim())){
		out.println("alert('"+error+"')");
	}	
%>
</script>