<%@ page language="java" import="java.util.*" pageEncoding="GB18030"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
//�û������
String gcode = (String)request.getAttribute("gcode");
//�û�������
String gname = (String)request.getAttribute("gname");
%>
  <link href="<%=request.getContextPath()%>/style/styleportal.css" rel="stylesheet" type="text/css" />
<div id='query_t'>
	<span><span title=���� class=save_btn onclick=savegroupProgram() onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>����</a></span></span>
	<span><span title=���� class=hidden_btn onclick=back() onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>����</a></span></span>
</div>
<script>
<!--���ܰ�ť�Զ��庯��start-->
var tabMenufun = new Object();
<!--���ܰ�ť�Զ��庯��end-->
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
					<div>�����û��飨<%=gcode %>-<%=gname %>��ҵ��ϵͳ</div>
				</li>
				<li><div id ="tmainpaginationdiv" style="color:#000000 ; margin-right:5px; height:23px;">
					<img id='img_row2column_tmainedit_table' src='/images/done_btn/edit_style.gif' style='float:left;margin-right:5px;cursor:pointer;'
						onclick="doShowEditSimpleWithTitle('tmain','edit_table',4,this)" title='��ת��' />
					 <img id='img_showNextRow_tmainedit_table' src='/images/done_btn/bottom_c.gif' title='�·�' style='float:left;cursor:pointer;margin-right:5px;' 
					 	onclick="showNextRow('tmain','edit_table',false,'null','null')"/>
					<img id='img_showBeforRow_tmainedit_table' src='/images/done_btn/top_c.gif' title='�Ϸ�' style='float:left;cursor:pointer;' 
						onclick="showBeforRow('tmain','edit_table',false,'null','null')"/>
					<script type='text/javascript' src='/js/row2column.js'></script>
					<a id='pageTagDiv' ></a></div>
				</li>
			</ul>
		</div>
		<!--�뱣����div��a��ǩ -->		
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
//��������
col = createColumnConfig();
col.id = "pname";
col.name = "pname";
col.type = "S";
col.title = "����";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "pcode";
col.name = "pcode";
col.type = "S";
col.title = "����";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "purl";
col.name = "purl";
col.type = "S";
col.title = "��ַ";
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
col.title = "����";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value == 1){
		tdobj.innerHTML = "B/S";
	} else if(value == 2){
		tdobj.innerHTML = "C/S";
	}else{
		tdobj.innerHTML = "����";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "psign";
col.name = "psign";
col.type = "S";
col.title = "��ʶ��";
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
col.title = "��Ȳ���";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null ){
		if(value =="1" ){
			tdobj.innerHTML = "��Ҫ";
		} else {
			tdobj.innerHTML = "����Ҫ";
		}
	} else {
		tdobj.innerHTML = "����Ҫ";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

tmain=new dataTable();
tmain.parent =document.getElementById('tmain_div');
tmain.setTableHead(["checkbox","pcode","pname","ptype","purl","psign","needyearparameter"]);
tmain.data = <%=programs%>;
//tmain.onrowclick = programmainclick;
tmain.show();

//����
function back(){
	var submenuid = '<c:out value="${param.submenu}"/>';
	var mainmenu = '<c:out value="${param.mainmenu}"/>';
	var url = "<%=request.getContextPath()%>/common/loadgroupprivilege.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
	window.location.href = url;
}

//����
function savegroupProgram(){
	if(tmain!=null && tmain.data !=null){
		if (tmain.getSelectedRow().length==0){
		   alert("��ѡ��ҵ��ϵͳ��");return;
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
	//�����0��ͷ���û��鲻�ܷ���ҵ��ϵͳ������
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
  
//�����Ļص�����			
function showCreateUPAfter(resp){
	try{
		alert("����ɹ���");
		closeDiv();
		back();
  	}catch(e){}
}
//ѡ��Ĭ������
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
