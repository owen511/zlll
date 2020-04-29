<%@ page language="java" import="java.util.*" pageEncoding="GB18030"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%
    String path = request.getContextPath();
			String basePath = request.getScheme() + "://"
					+ request.getServerName() + ":" + request.getServerPort()
					+ path + "/";
			String json = (String) request.getAttribute("json");
%>
<script>
  function query(){	
	var formObject = $("queryform");
	var submenuid = '<c:out value="${param.submenu}"/>';
	var mainmenu = '<c:out value="${param.mainmenu}"/>';
	formObject.action = "<%=request.getContextPath()%>/portal/usergroup/query.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
	formObject.submit();
	}
  //新增用户组
  function addGroup(){
        var submenuid = '<c:out value="${param.submenu}"/>';
	    var mainmenu = '<c:out value="${param.mainmenu}"/>';
	    var url = "<%=request.getContextPath()%>/portal/usergroup/turnToAdd.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
	    window.location.href = url;
  }
  
  //修改用户组
  function modGroup(){
  	var selRow = tmain.getSelectedRow();
  	if(tmain.getSelectedRow()==null||selRow.length==0){
  		alert("至少选择一个用户组进行修改!");
  		return false;
  	}else if(selRow.length>1){
  		alert("只能选择一个用户组进行修改!");
  		return false;
  	}else{
		    var submenuid = '<c:out value="${param.submenu}"/>';
			var mainmenu = '<c:out value="${param.mainmenu}"/>';
			var gcode = selRow[0].gcode;
			var gname = selRow[0].gname;
			var url = "<%=request.getContextPath()%>/portal/usergroup/turnToMod.do?mainmenu="+mainmenu+"&submenu="+ submenuid+"&gcode="+ gcode+"&gname="+ gname;
			window.location.href = url;
	}
		
  }
      //删除用户组
    function deleteGroup(){
    	if(tmain!=null && tmain.data !=null){
			if (tmain.getSelectedRow().length==0){
			   alert("请选择进行删除操作的用户组!");return;
			}
		} 
		var submenuid = '<c:out value="${param.submenu}"/>';
		var mainmenu = '<c:out value="${param.mainmenu}"/>';
		var index="";
		var selRow = tmain.getSelectedRow();
		for(var i= 0;i<selRow.length;i++){
			index = index+","+selRow[i].gcode;		
		}  
		if(confirm("确定删除所选中的用户组吗？")){
		var url="<%=basePath%>/portal/usergroup/del.do?gcodes="+index+"&mainmenu="+mainmenu+"&submenu="+submenuid;
		window.location.href = url;
		}
    }
  //分配用户组用户
  function distributeUser(){
  	    var selRow = tmain.getSelectedRow();
  	    
  	if(tmain.getSelectedRow()==null||selRow.length==0){
  		alert("至少选择一个用户组进行分配用户组用户的操作!");
  		return false;
  	}else if(selRow.length>1){
  		alert("只能选择一个用户组进行分配用户组用户的操作!");
  		return false;
  	}else{
		    var submenuid = '<c:out value="${param.submenu}"/>';
			var mainmenu = '<c:out value="${param.mainmenu}"/>';
			var gcode =selRow[0].gcode;
			var gname = selRow[0].gname;
			var url = "<%=request.getContextPath()%>/portal/usergroup/designuser.do?mainmenu="+mainmenu+"&submenu="+ submenuid+"&gcode="+ gcode+"&gname="+ gname;
			window.location.href = url;
	}
  }
 function DisableF5(){   
		var d_url=document.location.href;
  		 with (event){   
           // F5 and Ctrl+R   
    	 if (keyCode==116 || (ctrlKey && keyCode==82)){  
    		var submenuid = '<c:out value="${param.submenu}"/>';
			var mainmenu = '<c:out value="${param.mainmenu}"/>';
			window.location="<%=request.getContextPath()%>/portal/usergroup/query.do?mainmenu="+mainmenu+"&submenu="+submenuid;
			event.keyCode = 0;   
       		event.cancelBubble = true;   
       		return false;   
     		}   
   		}   
} 
document.onkeydown = DisableF5;
</script>
<div id='query_t'>
	<span><span title=查询 class=query_btn onclick=query()
		onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>查询</a>
	</span> </span>
	<span><span title=清除查询条件 class=clear_btn
		onclick="clearFormInputAll($( 'queryform'));" onmouseover=doChangBg(this)
		onmouseout=doReturn(this)><a href=#>清除查询条件</a> </span> </span>
	<span><span title=隐藏查询条件 class=hidden_btn onclick=doQuery2(this)
		onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>隐藏查询条件</a>
	</span> </span><span><span>｜</span> </span>
	<span><span title=新增用户组 class=add_btn onclick=addGroup()
		onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>新增用户组</a>
	</span> </span>
	<span><span title=修改用户组 class=mod_btn onclick=modGroup()
		onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>修改用户组</a>
	</span> </span>
	<span><span title=删除用户组 class=del_btn onclick=deleteGroup()
		onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>删除用户组</a>
	</span> </span><span><span>｜</span> </span>
	<span><span title=分配用户组用户 class=distribution_btn
		onclick=distributeUser() onmouseover=doChangBg(this)
		onmouseout=doReturn(this)><a href=#>分配用户组用户</a> </span> </span>

</div>

<form name="queryform" id="queryform"
	action="<%=request.getContextPath()%>/portal/usergroup/query.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>"
	method="post">
	<div id=querylist style='display: block;'>
		<table width=97% border=0 cellspacing=0 cellpadding=0>
			<tr>
				<td style='width: 7%'>
					用户组编码
				</td>
				<td>
					<input type="text" id="groupcode" name="groupcode" class="inputst"
						style="width: 200px;"
						value="<%=request.getAttribute("groupcode")%>" />
				</td>
				<td style='width: 7%'>
					用户组名称
				</td>
				<td>
					<input type="text" id="groupname" name="groupname" class="inputst"
						style="width: 200px;"
						value="<%=request.getAttribute("groupname")%>" />
				</td>
			</tr>
		</table>
	</div>
	<ui:queryform formid="queryform" />
</form>
<div>
	<form name="mainListForm" id="mainListForm" action="#" method="post">
        <input name="selectedbillids" id="selectedbillids" type="hidden"
			value="">

		<!--请保留此div和a标签 -->
		<div id="form_table_title">
			<ul>
				<li class="top">
					<div>
						用户组查询
					</div>
				</li>
				<li>
					<ui:row2column dataid="tmain" showdivname="edit_table"
						columnNum="4" />
				</li>
			</ul>
		</div>
		<div id='edit_table' style='display: none; padding: 0; margin: 0;'></div>
		<div id="containerline20" style="display: block;">
			<ui:datatable columndefine="true" id="tmain" tabletype="MainList"
				data="json" showcheckbox="true" />
		</div>
	</form>
</div>
