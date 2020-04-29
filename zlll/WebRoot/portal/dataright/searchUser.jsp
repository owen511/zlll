<%@page language="java" contentType="text/html; charset=GBK"%>
<%
	response.setHeader("Cache-Control", "no-cache");
	response.setHeader("Pragma", "no-cache");
	response.setDateHeader("Expires", 0);

	String rootPath = request.getContextPath();
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 6.0 Transitional//EN">
<html xmlns="http://www.w3.org/1999/xhtml">
	<script type="text/javascript"
		src="<%=request.getContextPath()%>/js/prototype.js"></script>
	<script type="text/javascript">
	var ROOT_PATH = '<%=request.getContextPath()%>';
	String.prototype.trim = function(){
		return this.replace(/(^\s*)|(\s*$)/g,"");
	}
	</script>
	<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
	<head>
		<title>请选择用户</title>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">

		<link href="<%=rootPath%>/style/style.css" rel="stylesheet"
			type="text/css" />
		<link rel="stylesheet" type="text/css"
			href="<%=rootPath%>/style/calendar.css" />
		<script type="text/javascript" src="<%=rootPath%>/js/choose.js"></script>
		<script type="text/javascript" src="<%=rootPath%>/js/changescroll.js"></script>
		<script type="text/javascript" src="<%=rootPath%>/js/calendar.js"></script>
		<script src="<%=request.getContextPath()%>/js/datatable.js"></script>
		<script src="<%=request.getContextPath()%>/js/formatNumber.js"></script>

	
	</head>

	<body class="pop_body">
		<div id="popPage1">
			<div id="shenhe_title">
				<div id="shenhe_title_middle">
					用户权限查询
				</div>
			</div>
			<div id="query_t">
				<div>
					<span><span title="查询" class="query_btn" onclick="query()"
						onmouseover="doChangBg(this)" onmouseout="doReturn(this)"><a
							href="#">查询</a> </span> </span>
					<span><span title="清除查询条件" class="clear_btn"
						onclick="clearFormInputAll()" onmouseover="doChangBg(this)"
						onmouseout="doReturn(this)"><a href="#">清除查询条件</a> </span> </span>
					<span><span title="隐藏查询条件" class="hidden_btn"
						onclick="doQuery2(this)" onmouseover="doChangBg(this)"
						onmouseout="doReturn(this)"><a href="#">隐藏查询条件</a> </span> </span>
				</div>
			</div>
			<div id="querylist" style="display:block;">
				<table width="100%" border="0" cellspacing="0" cellpadding="0"
					class="main_lookup_input">
					<tr>
						<td nowrap="nowrap">
							用户名称
						</td>
						<td nowrap="nowrap">
							<input id="name" name="name" type="text"
								class="main_lookup_input" />
						</td>
						<td nowrap="nowrap">
							用户编码
						</td>
						<td nowrap="nowrap">
							<input id="code" name="code" type="text"
								class="main_lookup_input" />
						</td>
						<td nowrap="nowrap">
							用户单位
						</td>
						<td nowrap="nowrap">
							<input id="organidStr" name="organidStr" type="text"
								class="main_lookup_input" />
						</td>
					</tr>
				</table>
			</div>
			<div id="form_table_title">
				<ul>
					<li class="top">
						<div>
							用户列表
						</div>
					</li>
				</ul>
			</div>
			<div id="containerline12">
				<div id='tdetail_div'
					style='position:relative;height:expression(this.offsetParent.offsetHeight);width:100%;'></div>
			</div>
			<script type="text/javascript">
					col = createColumnConfig();
					col.id = "code";
					col.name = "code";
					col.type = "S";
					col.title = "用户编码";
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
					col.title = "用户名称";
					col.show = function(rownum,value,row,tdobj,datatable){
						if(value != null){
						  tdobj.innerHTML = value;
						} else {
						  tdobj.innerHTML = "";
						}
					}
					ColumnConfig[col.id.toLowerCase()]=col;
					
					col = createColumnConfig();
					col.id = "organtypeStr";
					col.name = "organtypeStr";
					col.type = "S";
					col.title = "机构类型";
					col.show = function(rownum,value,row,tdobj,datatable){
						if(value != null){
						  tdobj.innerHTML = value;
						} else {
						  tdobj.innerHTML = "";
						}
					}
					ColumnConfig[col.id.toLowerCase()]=col;
					
					col = createColumnConfig();
					col.id = "organidStr";
					col.name = "organidStr";
					col.type = "S";
					col.title = "机构";
					col.show = function(rownum,value,row,tdobj,datatable){
						if(value != null){
						  tdobj.innerHTML = value;
						} else {
						  tdobj.innerHTML = "";
						}
					}
					ColumnConfig[col.id.toLowerCase()]=col;
					
					col = createColumnConfig();
					col.id = "typeStr";
					col.name = "typeStr";
					col.type = "S";
					col.title = "用户类型";
					col.show = function(rownum,value,row,tdobj,datatable){
						if(value != null){
						  tdobj.innerHTML = value;
						} else {
						  tdobj.innerHTML = "";
						}
					}
					ColumnConfig[col.id.toLowerCase()]=col;
					
					var tdetail =new dataTable();
					tdetail.parent = document.getElementById('tdetail_div');
					tdetail.setTableHead(["serial","radio","code","name","typeStr","organtypeStr","organidStr"]);
					<%
						String userJson = (String)request.getAttribute("userJson");
						if(null == userJson || "".equals(userJson)){
							out.println("tdetail.data = new Array();\n");
							out.println("var json = new Array();\n");
						}else{
							out.println("tdetail.data = "+ userJson);
							out.println("var json = "+ userJson);
						}
					%>
					tdetail.show();
					
					function search(){
						var selectedRow = tdetail.getSelectedRow();
						if(null == selectedRow[0]){
							alert("请选择一个要查询的用户！");
			    			return false;
						}
						window.opener.document.getElementById("userName").value = selectedRow[0].code +"-"+selectedRow[0].name;
						window.opener.document.getElementById("userid").value = selectedRow[0].userid;
						window.close();
					}
					
					
		    function query(){
		    	var code = document.getElementById("code").value.trim().toUpperCase();
		    	var name = document.getElementById("name").value.trim();
		    	var organidStr = document.getElementById("organidStr").value.trim();
		    	if("" == code && "" == name && "" == organidStr){
		    		tdetail.data = json;
		    		tdetail.show();
		    		return;
		    	}
		    	var list = new Array();
		    	for(var i=0;i<json.length;i++){
		    		var row = json[i];
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
		    		if(organidStr != ""){
		    			if(null == row.organidStr || row.organidStr.indexOf(organidStr) == -1){
		    				continue;
		    			}
		    		}
		    		list[list.length] = row;
		    	}
		    	tdetail.data = list;
		    	tdetail.show();
		    }
		    
		    function clearFormInputAll(){
		    	var button = document.getElementsByTagName("input");
		    	for(var i=0;i<button.length;i++){
		    		button[i].value="";
		    	}
		    }
				</script>
		</div>
		<br />
		<center>
			<button onclick="search()" class="button_style"
				onmouseover="this.className='OverBtn'"
				onmouseout="this.className='button_style'"
				onmousedown="this.className='down'">
				确&nbsp;定
			</button>
			&nbsp;
			<button onclick="window.close();" class="button_style"
				onmouseover="this.className='OverBtn'"
				onmouseout="this.className='button_style'"
				onmousedown="this.className='down'">
				取&nbsp;消
			</button>
		</center>
	</body>
</html>
