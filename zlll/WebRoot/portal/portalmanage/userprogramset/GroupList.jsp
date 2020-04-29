<%@ page language="java" import="java.util.*" pageEncoding="GB18030"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<link href="<%=request.getContextPath()%>/style/styleportal.css" rel="stylesheet" type="text/css" />
  <script>
  //新增用户组
  function addGroup(){
        var submenuid = '<c:out value="${param.submenu}"/>';
	    var mainmenu = '<c:out value="${param.mainmenu}"/>';
	    var url = "<%=request.getContextPath()%>/portal/group/addGroup.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
	    window.location.href = url;
  }
  
  //修改用户组
  function modGroup(){
  	    if(tmain!=null && tmain.data!=null && tmain.getSelectedRow()!=null && tmain.getSelectedRow().length==1){
		    var submenuid = '<c:out value="${param.submenu}"/>';
			var mainmenu = '<c:out value="${param.mainmenu}"/>';
			var gcode = tmain.getSelectedRow()[0].gcode;
			var gname = tmain.getSelectedRow()[0].gname;
			var url = "<%=request.getContextPath()%>/portal/group/modGroup.do?mainmenu="+mainmenu+"&submenu="+ submenuid+"&gcode="+ gcode+"&gname="+ gname;
			window.location.href = url;
		}else{
			alert("请选择一个用户组");
		}
  }
  
  //分配用户组用户
  function distributeUser(){
  	    if(tmain!=null && tmain.data!=null && tmain.getSelectedRow()!=null && tmain.getSelectedRow().length==1){
		    var submenuid = '<c:out value="${param.submenu}"/>';
			var mainmenu = '<c:out value="${param.mainmenu}"/>';
			var gcode = tmain.getSelectedRow()[0].gcode;
			var gname = tmain.getSelectedRow()[0].gname;
			var url = "<%=request.getContextPath()%>/common/loaduserprivilege.do?mainmenu="+mainmenu+"&submenu="+ submenuid+"&gcode="+ gcode+"&gname="+ gname;
			window.location.href = url;
		}else{
			alert("请选择一个用户组");
		}
  }
  
  //分配用户组业务系统
  function distributeProgram(){
  	    if(tmain!=null && tmain.data!=null && tmain.getSelectedRow()!=null && tmain.getSelectedRow().length==1){
		    var submenuid = '<c:out value="${param.submenu}"/>';
			var mainmenu = '<c:out value="${param.mainmenu}"/>';
			var gcode = tmain.getSelectedRow()[0].gcode;
			var gname = tmain.getSelectedRow()[0].gname;
			var url = "<%=request.getContextPath()%>/common/loadprogramprivilege.do?mainmenu="+mainmenu+"&submenu="+ submenuid+"&gcode="+ gcode+"&gname="+ gname;
			window.location.href = url;
		}else{
			alert("请选择一个用户组");
		}
  }
  </script>
<div id='query_t'> 
<span><span title=新增用户组 class=add_btn onclick=addGroup() onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>新增用户组</a></span></span>
<span><span title=修改用户组 class=mod_btn onclick=modGroup() onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>修改用户组</a></span></span>
<span><span title=删除用户组 class=del_btn onclick=deleteGroup() onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>删除用户组</a></span></span><span><span>｜</span></span>
<span><span title=分配用户组用户 class=distribution_btn onclick=distributeUser() onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>分配用户组用户</a></span></span>
<span><span title=分配用户组业务系统 class=distribution_btn onclick=distributeProgram() onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>分配用户组业务系统</a></span></span>
</div> <script>
 </script>
  
<div>
	<form name="mainListForm" id="mainListForm" action="#" method="post">
		<input name="selectedbillids" id="selectedbillids" type="hidden"
			value="">
		<div id="form_table_title">
			<ul>
				<li class="top">
					<div>用户组</div>
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
<%String usergroup=(String)request.getAttribute("usergroup");%>
<script>
	//定义列名
	col = createColumnConfig();
	col.id = "gname";
	col.name = "gname";
	col.type = "S";
	col.title = "组名称";
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "gcode";
	col.name = "gcode";
	col.type = "S";
	col.title = "组编码";
	ColumnConfig[col.id.toLowerCase()]=col;
    
  	tmain=new dataTable();
	tmain.parent =document.getElementById('tmain_div');
	tmain.setTableHead(["radio","gcode","gname"]);
	tmain.data = <%=usergroup%>;
	//tmain.onrowclick =groupmainclick;
	tmain.checkedOnclick = true;
	tmain.show();
  
    //删除用户组
    function deleteGroup(){
    	if(tmain!=null && tmain.data !=null){
			if (tmain.getSelectedRow().length==0){
			   alert("请选择用户组！");return;
			}
		}   
		if(confirm("确定删除所选中的用户组吗？")){
			new Ajax.Request("<%=request.getContextPath()%>/common/deleteGroupUser.do?cancel=true&random="+Math.random(), 
	     	{
		   		parameters : "ugcode=" + tmain.getSelectedRow()[0].gcode,
		   		method: 'get', 
		   		onComplete : deleteGroupAfter,
		   		requestHeaders: {Accept: 'application/json'},
		   		onFailure : function(resp) {
		        }
			}); 
		}	
    }
    //删除用户组的回调方法
    function deleteGroupAfter(resp){
  		    tmain.removeSelected();
  		    tmain.draw();
  		    alert("删除成功！");
  		    onloadinfor();
  			
    }	
    
    //默认勾选第一行
	function onloadinfor(){
		if(''==tmain.data && tmain.data.length==0){
			return ;
		}
		tmain.data[0].checked=true;
		tmain.draw();
	}			
	onloadinfor();
</script>

