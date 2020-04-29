<%@page language="java" contentType="text/html; charset=GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<script type="text/javascript">
// 是非已经选择
function isSelected() {
    for (var i = 0; i < $('queryform').elements.length; i++) {
        var e = $('queryform').elements[i];
        if (e.type == "checkbox" && e.checked) {
            return true;
        }
    }
    return false;
}

// 返回ID列复选框勾选的个数
function getSelectedCount() {
    var count = 0;
    for (var i = 0; i < $('queryform').elements.length; i++) {
        var e = $('queryform').elements[i];
        if (e.type == "checkbox" && e.checked) {
            count++;
        }
    }
    return count;
}

//错误提示
function loadError(){
	var error = '<c:out value="${error}"/>';
	if("" != error ){
		alert(error);
	}
}
loadError();

// 新增
function doAdd() {
	var submenuid = <c:out value="${param.submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
    var url = "<%=request.getContextPath()%>/portal/userinfo/turnToSave.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
    window.location.href = url;
}

// 修改
function doMod(){
	if (getSelectedCount() == 0) {
        alert("请首先选择1个记录，然后按[修改]！");
        return false;
    } else if (getSelectedCount() > 1) {
        alert("只能选择1个记录，然后按[修改]！");
        return false;
    }
    
	var selectedRow = tmain.getSelectedRow();
    var userid = selectedRow[0].userid;
    
    
	var submenuid = <c:out value="${submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
	
    if(userid == null || "" == userid)
    {
    	alert("输入值出错，请刷新页面！");
    	return false;
    }
    var url = "<%=request.getContextPath()%>/portal/userinfo/turnToModify.do?mainmenu="+mainmenu+"&submenu="+ submenuid + "&userid="+ userid;
    window.location.href = url;
}

function doDel(){
	var selectedRow = tmain.getSelectedRow();
    if(null == selectedRow){
    	alert("请选择要删除的用户！");
        return;
    }
	var submenuid = <c:out value="${submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
   	
   	var userid = "";
   	for(var i = 0; i<selectedRow.length; i++ )
   	{
   		if(selectedRow[i].userid == null || "" == selectedRow[i].userid)
	    {
	    	alert("输入值出错，请刷新页面！");
	    	return false;
	    }else{
	    	userid = userid + "&userid="+ selectedRow[i].userid;
	    }
   	}
    
    var url = "<%=request.getContextPath()%>/portal/userinfo/delete.do?mainmenu="+mainmenu+"&submenu="+ submenuid + userid;
    if(confirm("确定删除所选用户吗？")){
    	window.location.href = url;
    }
}

function search(){
	var code = document.getElementById("code").value.trim().toUpperCase();
	var name = document.getElementById("name").value.trim();
	var organidStr = document.getElementById("bdgagency").value.trim();
	var logintype = document.getElementById("logintype").value;
	var organtype = document.getElementById("organtype").value;
	tdetail.data = new Array();
	tdetail.show();
	var list = new Array();
   	for(var i=0;i<userList.length;i++){
   		var row = userList[i];
   		if(code != "" ){
   			if(null == row.code || row.code.indexOf(code) == -1){
   				continue;
   			}
   		}
   		if(name != "" ){
   			if(null == row.name || row.name.indexOf(name) == -1){
   				continue;
   			}
   		}
   		if(organtype != "" ){
   			if(null == row.organtype || row.organtype!=organtype){
   				continue;
   			}
   		}
   		if(organidStr != ""){
   			if(null == row.organidStr || organidStr.indexOf(row.organidStr.split('--')[1]) == -1){
   				continue;
   			}
   		}
   		if(logintype !=""){
   			if(null == row.logintype || row.logintype != logintype){
   				continue;
   			}
   		}
   		list[list.length] = row;
   	}
   	tmain.data = list;
   	tmain.show();
}

function doCopy(){
	if (getSelectedCount() == 0) {
        alert("请首先选择1个记录，然后按[复制]！");
        return false;
    } else if (getSelectedCount() > 1) {
        alert("只能选择1个记录，然后按[复制]！");
        return false;
    }
    
	var selectedRow = tmain.getSelectedRow();
    var userid = selectedRow[0].userid;
	
    if(userid == null || "" == userid)
    {
    	alert("输入值出错，请刷新页面！");
    	return false;
    }
    var url = "<%=request.getContextPath()%>/portal/userinfo/turnToCopy.do?userid="+ userid;
    var features = "top=150,left=50,width=750,height=500,scrollbars=no,resizable=no";
    window.open(url, "用户复制", features);
}

function datapermission(){
	if (getSelectedCount() == 0) {
        alert("请首先选择1个记录，然后按[数据权限]！");
        return false;
    } else if (getSelectedCount() > 1) {
        alert("只能选择1个记录，然后按[数据权限]！");
        return false;
    }
    
	var selectedRow = tmain.getSelectedRow();
    var userid = selectedRow[0].userid;
	
    if(userid == null || "" == userid)
    {
    	alert("输入值出错，请刷新页面！");
    	return false;
    }
    var url = "<%=request.getContextPath()%>/portal/userinfo/queryDataRight.do?userid="+ userid;
    var features = "top=150,left=50,width=750,height=500,scrollbars=no,resizable=no";
    window.open(url, "数据权限", features);
}
//切换登陆方式
function  changlogintype(){
	var selectedRow = tmain.getSelectedRow();
    if(selectedRow.length==0){
    	alert("请选择要更改的用户！");
        return;
    }
    /*
    if(selectedRow.length>1){
    	alert("每次只能更改一条！");
        return;
    }
    */
	var submenuid = <c:out value="${submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
   	
   	/*var logintype = "";
	if(selectedRow[0].logintype == null || "" == selectedRow[0].logintype)
	    {
	    	alert("此用户无登陆类型请检查！");
	    	return false;
	    }else{
	    	logintype = logintype + "&logintype="+ selectedRow[0].logintype;
	    }
    var usercode = "&usercode="+selectedRow[0].code;
    */
    if(confirm("确定更改此用户登陆方式吗？")){
    	
		var usercodes = [];
		var logintypes = []; 
		for(i = 0 ;i<selectedRow.length;i++){
			var logintype = selectedRow[i].logintype;
			if(logintype==null&&logintype==""){
				alert("此用户无登陆类型请检查！");
		    	return false;
			}
			usercodes.push(selectedRow[i].code);
			logintypes.push(logintype);
		}
		show();
	    new Ajax.Request("<%=request.getContextPath()%>/portal/userinfo/modifylogintype.do?random="+Math.random(), 
         	{
    	   		parameters : "logintype=" + logintypes.join(',') +"&usercode=" + usercodes.join(','),
    	   		method: 'post', 
    	   		onComplete : function(resp) { //"resp" is just the XMLHttpRequest object
	    	     	//if(resp.responseText=="true"){
	    	     		var url = "<%=request.getContextPath()%>/portal/userinfo/query.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
	    	     	    window.location.href = url;
	    	     	//}
    	        },
    	   		requestHeaders: {Accept: 'application/json'},
    	   		onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
    	        }
    		}); 
   	 }	    
}
function selectOrgan(obj){
	var formObject = $("queryform");
	var elementcode = formObject.organtype.value;
	var codevalue =  formObject.bdgage.value;
	if(null == elementcode || "" == elementcode){
		alert("请先选择一种机构类型！");
		return false;
	}
	var submenu = <c:out value="${param.submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
	selectMutlElememt(mainmenu,submenu,"5001",elementcode,obj,false,"",elementcode);
	//selectBaseInfoElememt(mainmenu,submenu,elementcode,obj,codevalue);
}

function selectBaseInfoElememt(mainmenu,submenu,elementcode,backinputStr,codevalue){
	var selvalue = backinputStr.valuecode != undefined ? backinputStr.valuecode : backinputStr.value;
	window.selvalue = selvalue;
    var element = window.$(elementcode);
   	var url = "<%=request.getContextPath()%>/portal/userinfo/elementtree.do?mainmenu="+mainmenu+"&submenu="+submenu+"&elementcode="+elementcode+"&organCode="+codevalue;
	var result = window.showModalDialog(url,window,'dialogHeight:500px;dialogWidth: 325px;resizable: No; status: No;help:No;');
	
	if(result != null){
	    if(typeof(result)!="string"){
		var str = backinputStr.id;
		eval(" var backinput = document.getElementById('"+str.substring(0,str.length-3)+"')");
		backinput.value = result.id;
		backinputStr.value = result.value;
		}
	}
}
//查询所有的权限
function selectMutlElememt(mainmenu,submenu,vchtypecode,vchfieldcode,backinput,checkflag,elementfilter,organtype){
    //wy add 20090923     46000000,46000011,"5001",    "bdgagency", this.form.bdgagency, false,"","bdgagency"
    					//46000000,46000011,"5001",    "agentbank", this.form.agentbank, false,"","agentbank"
    /** ganhua 20080304 在打开选择窗口前回调一个方法做某些事情
	  * 如：设置过滤条件，检查联动的其它控件是否选择值
	  * 
	**/
	codeShowFlag=1;
	var selvalue = backinput.valuecode != undefined ? backinput.valuecode : backinput.value;
	window.selvalue = selvalue;
	window.checkflag = checkflag;
	var func = "callBeforeOpenMultElementTree_"+vchfieldcode+"(window)";;
	var notReturn = true;
    try{
        notReturn = eval(func);
	}catch(e){
		//不成功,不管它,当没有实现该方法
	}
	if(notReturn == false)
	{
		return;
	}
	var elementfilter = "";
	if(window.elementfilter){
		elementfilter = window.elementfilter;
	}

	var refererurl = ""+window.location.href;
	
	var url = ROOT_PATH+"/common/tree/openTreeUser.do?organtype="+organtype+"&mainmenu="+mainmenu+"&submenu="+submenu+"&vchtypecode="+vchtypecode
		+"&vchfieldcode="+vchfieldcode+"&elementfilter="+elementfilter+"&managerid=1"
		+"&Referer="+refererurl.substring(0,refererurl.indexOf("?"));
	var result = window.showModalDialog(url,window,"dialogHeight:500px;dialogWidth: 325px;resizable: No; status: No; help:No;");
	//var result = window.open(url, 'newWindow','dialogWidth=400px,dialogHeight=450px,status=yes,toolbar=no,menubar=no,directories=no,resizable=no,Scrollbars=no');
    //清楚窗体的过滤条件 ganhua 20090509
	if(window.elementfilter);
	{
		window.elementfilter = null;
	}
	if(result != null){
	    if(typeof(result)!="string"){
			if(backinput == null){
				backinput = $(vchfieldcode);
			}
			backinput.value = result.value;
			backinput.valueid = result.id;
			backinput.isleaf= result.isleaf;
			backinput.valuecode = result.valuecode;
			try{
				document.getElementById("hidden_"+backinput.id).value= result.valuecode;
			}catch(e){}
		}
	}
	else
	{
	    if(backinput != null){
	        backinput.value = "";
			backinput.valueid = null;
			backinput.valuecode = "";
			try{
				document.getElementById("hidden_"+backinput.id).value= "";
			}catch(e){}
	    } 
	 }
	 codeShowFlag=null;
}

function clearOranid(){
	document.getElementById("bdgagency").value = "";
	document.getElementById("bdgage").value = "";
}
</script>
<form id="queryform" name="queryform" method="post"
	action="<%=request.getContextPath()%>/portal/userinfo/query.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>"
	onsubmit="switchValue(this)">
	<div id="query_t">
		<div>
			<span><span title="查询" class="query_btn" onclick="search()"
				onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
				onmousedown="doChangeBg1(this)"><a href="#">查询</a> </span> </span>
			<span><span title="清除查询条件" class="clear_btn" onclick="clearFormInputAll($('queryform'))"
				onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
				onmousedown="doChangeBg1(this)"><a href="#">清除查询条件</a> </span> </span>
			<span><span title="隐藏查询条件" class="hidden_btn"
				onclick="doQuery2(this)" onmouseover="doChangBg(this)"
				onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a
					href="#">隐藏查询条件</a> </span><span>｜</span> </span>

			<span><span title="新增" class="add_btn" onclick="doAdd()"
				onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
				onmousedown="doChangeBg1(this)"><a href="#">新增</a> </span> </span>
			<span><span title="修改" class="mod_btn" onclick="doMod()"
				onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
				onmousedown="doChangeBg1(this)"><a href="#">修改</a> </span> </span>
			<span>
				<c:if test="${type == '2'}">
				<span title="删除" class="del_btn" onclick="doDel()"
				onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
				onmousedown="doChangeBg1(this)"><a href="#">删除</a> </span>
				</c:if>
				<span>｜</span>
			</span>
<!-- 
			<span><span title="复制" class="copyPlay_btn" onclick="doCopy()"
				onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
				onmousedown="doChangeBg1(this)"><a href="#">复制</a> </span><span>｜</span>
			</span>
 -->			

			<span><span title="数据权限" class="datapermission_btn"
				onclick="datapermission()" onmouseover="doChangBg(this)"
				onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a
					href="#">数据权限</a> </span> </span>
			<span><span title="更改登陆方式" class="datapermission_btn"
				onclick="changlogintype()" onmouseover="doChangBg(this)"
				onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a
					href="#">更改登陆方式</a> </span> </span>		
		</div>
	</div>
	<div id="querylist" style="display:block">
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr>
				<td nowrap="nowrap">
					用户编码
				</td>
				<td nowrap="nowrap">
					<input type="text" name="code" id="code" >
				</td>
				<td nowrap="nowrap">
					用户名称
				</td>
				<td nowrap="nowrap">
					<input type="text" name="name" id="name">
				</td>
				<td nowrap="nowrap">
					机构类型
				</td>
				<td nowrap="nowrap">
				<select name=organtype id=organtype onchange="clearOranid()">
				    <option value="">
						&nbsp;
					</option>
					<c:forEach items="${organTypeMap}" var="entry">
						<option value="<c:out value='${entry.key}' />" <c:if test="${userViewDTO.organtype eq entry.key}"> selected </c:if> >
							<c:out value="${entry.value}" />
						</option>
					</c:forEach>
				</select>
				</td>
				<td width="10%" nowrap="nowrap">
					机构
				</td>
			<td nowrap=nowrap id='td_bdgagency_1' style = 'width:20%'><input name="bdgage" id="bdgage" type="hidden"><input name="bdgagency_valuecode" id="bdgagency_valuecode" type="hidden"><input id="bdgagency" name="bdgagency" type=text class=text_pop readonly onclick='selectOrgan(this)' />  <button style='margin-left:8px;' onclick='selectOrgan(this.form.bdgagency)'></button><img align=middle type ='image' value='清空' src='/images/done_btn/clear_qry2.gif' onclick='clearInputRule("bdgagency");clearInput(document.getElementById("bdgagency"));'>
</td>
			</tr>
			<tr>
				<td width="10%" nowrap="nowrap">
					登陆方式
				</td>
				<td width="20%" nowrap="nowrap">
					<select name="logintype" id="logintype">
						<option></option>
						<option value="0">密码登陆</option>
						<option value="1">CA登陆</option>
					</select>
				</td>
			</tr>
		</table>
	</div>
	<div id="form_table_title">
		<ul>
			<li class="top">
				<div>
					用户维护信息
				</div>
			</li>
		</ul>
	</div>
	<!--请保留此div和a标签 -->
	<div id="containerline12">
		<div id='tmain_div'
			style='position:relative;height:expression(this.offsetParent.offsetHeight);width:100%;'></div>
		<script type="text/javascript">
		col = createColumnConfig();
		col.id = "code";
		col.name = "code";
		col.type = "S";
		col.title = "编码";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row!=null && value != null){
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
			if(row!=null && value != null){
			  tdobj.innerHTML = value;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "userclsid";
		col.name = "userclsid";
		col.type = "S";
		col.title = "组别";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row!=null && row.userclsidStr != null){
			  tdobj.innerHTML = row.userclsidStr;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "organtype";
		col.name = "organtype";
		col.type = "S";
		col.title = "机构类型";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row!=null && row.organtypeStr != null){
			  tdobj.innerHTML = row.organtypeStr;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "organid";
		col.name = "organid";
		col.type = "S";
		col.title = "机构";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row!=null && row.organidStr != null){
			  tdobj.innerHTML = row.organidStr;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "type";
		col.name = "type";
		col.type = "S";
		col.title = "用户类型";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row!=null && row.typeStr != null){
			  tdobj.innerHTML = row.typeStr;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "logintype";
		col.name = "logintype";
		col.type = "S";
		col.title = "登陆方式";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row!=null && row.logintype!= null){
				if(row.logintype == "0"){
			  		tdobj.innerHTML = "密码登陆";
			  	}
			  	else{
			  		tdobj.innerHTML = "CA登陆";
			  	}
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "managerid";
		col.name = "managerid";
		col.type = "S";
		col.title = "管理者";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row!=null && row.manageridStr != null){
			  tdobj.innerHTML = row.manageridStr;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "state";
		col.name = "state";
		col.type = "S";
		col.title = "状态";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row!=null && row.stateStr != null){
			  tdobj.innerHTML = row.stateStr;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "createdate";
		col.name = "createdate";
		col.type = "S";
		col.title = "创建日期";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row!=null && value != null){
			  var dateObject = new Date(value); 
			  tdobj.innerHTML = eval(dateObject.getYear())+"-"+eval(dateObject.getMonth()+1)+"-"+dateObject.getDate();
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "updatedate";
		col.name = "updatedate";
		col.type = "S";
		col.title = "修改日期";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row!=null && value != null){
			  var dateObject = new Date(value); 
			  tdobj.innerHTML = eval(dateObject.getYear())+"-"+eval(dateObject.getMonth()+1)+"-"+dateObject.getDate();
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "overduedate";
		col.name = "overduedate";
		col.type = "S";
		col.title = "过期日期";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row!=null && value != null){
			  var dateObject = new Date(value); 
			  tdobj.innerHTML = eval(dateObject.getYear())+"-"+eval(dateObject.getMonth()+1)+"-"+dateObject.getDate();
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "remark";
		col.name = "remark";
		col.type = "S";
		col.title = "备注";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row!=null && value != null){
			  tdobj.innerHTML = value;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		function mainclick(row){
			var s = "";
			for(var v in row ){
				s += v+":";
				eval("s += row."+v);
				s += "\n";
			}
			var url = '<%=request.getContextPath()%>/portal/userinfo/queryRoleByUser.do';
			var pars = "userid="+row.userid;
		    var myAjax = new Ajax.Request(
		                    url,
		                    {method: 'post', parameters: pars, onComplete: showResponse}
		                    );
		}
		function showResponse(request){
			eval("var subList = " + request.responseText);
			tdetail.data = subList;
			tdetail.show();
		}
		
		var tmain =new dataTable();
		tmain.parent = document.getElementById('tmain_div');
		tmain.setTableHead(["serial","checkbox","code","name","organtype","organid","userclsid","type","logintype","managerid","state","createdate","updatedate","overduedate","remark"]);
		<%
			String userList = (String)request.getAttribute("userList");
			if(null == userList || "".equals(userList)){
				out.println("tmain.data = new Array();\n");
			}else{
				out.println("tmain.data = "+ userList);
				out.println("var userList = "+ userList);
			}
		%>
		tmain.onrowclick = mainclick;
		tmain.show();
		</script>
	</div>
	<div id="form_table_title">
		<ul>
			<li class="top">
				<div>
					角色信息
				</div>
			</li>
		</ul>
	</div>
	<div id="containerline3">
		<div id='tdetail_div'
			style='position:relative;height:expression(this.offsetParent.offsetHeight);width:100%;'></div>
		<script type="text/javascript">
		var tdetail =new dataTable();
		tdetail.parent = document.getElementById('tdetail_div');
		tdetail.setTableHead(["serial","userclsid","code","name"]);
		tdetail.data = new Array();
		tdetail.show();
		</script>
	</div>
</form>
