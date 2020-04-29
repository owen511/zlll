<%@ page language="java" import="java.util.*" pageEncoding="GB18030"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
//用户组编码
String gcode = (String)request.getAttribute("gcode");
//用户组名称
String gname = (String)request.getAttribute("gname");
%>
  <link href="<%=request.getContextPath()%>/style/styleportal.css" rel="stylesheet" type="text/css" />
<div id='query_t'>
	<span><span title=保存 class=save_btn onclick=savegroupProgram() onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>保存</a></span></span>
	<span><span title=返回 class=hidden_btn onclick=back() onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>返回</a></span></span>
</div>
<script>
<!--功能按钮自定义函数start-->
var tabMenufun = new Object();
<!--功能按钮自定义函数end-->
</script>
 
<div>
	<form name="mainListForm" id="mainListForm" action="#" method="post">
		<input name="selectedbillids" id="selectedbillids" type="hidden"
			value="">
		<input name="gcode" id="gcode" type="hidden"
			value="<%= request.getAttribute("gcode") %>">
		<div id="form_table_title">
			<ul>
				<li class="top">
					<div>分配用户组（<%=gcode %>-<%=gname %>）业务系统</div>
				</li>
				<li><div id ="tmainpaginationdiv" style="color:#000000 ; margin-right:5px; height:23px;">
					<img id='img_row2column_tmainedit_table' src='/images/done_btn/edit_style.gif' style='float:left;margin-right:5px;cursor:pointer;'
						onclick="doShowEditSimpleWithTitle('tmain','edit_table',4,this)" title='行转列' />
					 <img id='img_showNextRow_tmainedit_table' src='/images/done_btn/bottom_c.gif' title='下翻' style='float:left;cursor:pointer;margin-right:5px;' 
					 	onclick="showNextRow('tmain','edit_table',false,'null','null')"/>
					<img id='img_showBeforRow_tmainedit_table' src='/images/done_btn/top_c.gif' title='上翻' style='float:left;cursor:pointer;' 
						onclick="showBeforRow('tmain','edit_table',false,'null','null')"/>
					<script type='text/javascript' src='/js/row2column.js'></script>
					<a id='pageTagDiv' ></a></div>
				</li>
			</ul>
		</div>
		<!--请保留此div和a标签 -->		
		<div id='edit_table' style='display:none;padding:0;margin:0;'></div>
		<div id="containerline20" style="display: block;">
			<div id=tmain_div style='position:relative;behavior:url(#default#userData);height:100%;width:100%;'> </div>
	 	</div>
	</form>
</div>

  <%
  String programs=(String)request.getAttribute("programs");
  String programcodes=(String)request.getAttribute("programcodes");
  //String departments=(String)request.getAttribute("departments");
   %>
   
<script>
//定义列名
col = createColumnConfig();
col.id = "pname";
col.name = "pname";
col.type = "S";
col.title = "名称";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "pcode";
col.name = "pcode";
col.type = "S";
col.title = "编码";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "purl";
col.name = "purl";
col.type = "S";
col.title = "地址";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "ptype";
col.name = "ptype";
col.type = "S";
col.title = "类型";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value == 1){
		tdobj.innerHTML = "B/S";
	} else if(value == 2){
		tdobj.innerHTML = "C/S";
	}else{
		tdobj.innerHTML = "数据";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "psign";
col.name = "psign";
col.type = "S";
col.title = "标识符";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null ){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "needyearparameter";
col.name = "needyearparameter";
col.type = "S";
col.title = "年度参数";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null ){
		if(value =="1" ){
			tdobj.innerHTML = "需要";
		} else {
			tdobj.innerHTML = "不需要";
		}
	} else {
		tdobj.innerHTML = "不需要";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

tmain=new dataTable();
tmain.parent =document.getElementById('tmain_div');
tmain.setTableHead(["checkbox","pcode","pname","ptype","purl","psign","needyearparameter"]);
tmain.data = <%=programs%>;
//tmain.onrowclick = programmainclick;
tmain.show();

//返回
function back(){
	var submenuid = '<c:out value="${param.submenu}"/>';
	var mainmenu = '<c:out value="${param.mainmenu}"/>';
	var url = "<%=request.getContextPath()%>/common/loadgroupprivilege.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
	window.location.href = url;
}

//保存
function savegroupProgram(){
	if(tmain!=null && tmain.data !=null){
		if (tmain.getSelectedRow().length==0){
		   alert("请选择业务系统！");return;
		}
	}   
	var rows = tmain.getSelectedRow();
	var programcodes="";
	for(i = 0 ;i<rows.length;i++){
		if(i>0){
			programcodes = programcodes +",";
		}
		programcodes = programcodes + rows[i].pcode;
	}
	show();
	//解决以0开头的用户组不能分配业务系统的问题
	gcd = document.getElementById("gcode").value;
	new Ajax.Request("/common/UnifiedGroupProgram.do?random="+Math.random(), 
    	{
   		parameters : "ugcode=" + gcd +"&programcodes=" + programcodes,
   		method: 'get', 
   		onComplete : showCreateUPAfter,
   		requestHeaders: {Accept: 'application/json'},
   		onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
        }
	}); 	
}
  
//保存后的回调方法			
function showCreateUPAfter(resp){
	try{
		alert("分配成功！");
		closeDiv();
		back();
  	}catch(e){}
}
//选中默认数据
function loadProgram(){
	var programcodes = '<%=programcodes%>';
	var programs = programcodes.split(',');
	var tmainData = tmain.data;
	for(i = 0 ;i < programs.length;i ++){
		for(j = 0 ;j < tmainData.length;j ++){
			if(programs[i]==tmainData[j].pcode){
				tmainData[j].checked=true;
				continue;
			}
		}
	}
	tmain.draw();
}
loadProgram();
</script>
