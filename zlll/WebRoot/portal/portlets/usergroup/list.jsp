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
  //�����û���
  function addGroup(){
        var submenuid = '<c:out value="${param.submenu}"/>';
	    var mainmenu = '<c:out value="${param.mainmenu}"/>';
	    var url = "<%=request.getContextPath()%>/portal/usergroup/turnToAdd.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
	    window.location.href = url;
  }
  
  //�޸��û���
  function modGroup(){
  	var selRow = tmain.getSelectedRow();
  	if(tmain.getSelectedRow()==null||selRow.length==0){
  		alert("����ѡ��һ���û�������޸�!");
  		return false;
  	}else if(selRow.length>1){
  		alert("ֻ��ѡ��һ���û�������޸�!");
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
      //ɾ���û���
    function deleteGroup(){
    	if(tmain!=null && tmain.data !=null){
			if (tmain.getSelectedRow().length==0){
			   alert("��ѡ�����ɾ���������û���!");return;
			}
		} 
		var submenuid = '<c:out value="${param.submenu}"/>';
		var mainmenu = '<c:out value="${param.mainmenu}"/>';
		var index="";
		var selRow = tmain.getSelectedRow();
		for(var i= 0;i<selRow.length;i++){
			index = index+","+selRow[i].gcode;		
		}  
		if(confirm("ȷ��ɾ����ѡ�е��û�����")){
		var url="<%=basePath%>/portal/usergroup/del.do?gcodes="+index+"&mainmenu="+mainmenu+"&submenu="+submenuid;
		window.location.href = url;
		}
    }
  //�����û����û�
  function distributeUser(){
  	    var selRow = tmain.getSelectedRow();
  	    
  	if(tmain.getSelectedRow()==null||selRow.length==0){
  		alert("����ѡ��һ���û�����з����û����û��Ĳ���!");
  		return false;
  	}else if(selRow.length>1){
  		alert("ֻ��ѡ��һ���û�����з����û����û��Ĳ���!");
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
	<span><span title=��ѯ class=query_btn onclick=query()
		onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>��ѯ</a>
	</span> </span>
	<span><span title=�����ѯ���� class=clear_btn
		onclick="clearFormInputAll($( 'queryform'));" onmouseover=doChangBg(this)
		onmouseout=doReturn(this)><a href=#>�����ѯ����</a> </span> </span>
	<span><span title=���ز�ѯ���� class=hidden_btn onclick=doQuery2(this)
		onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>���ز�ѯ����</a>
	</span> </span><span><span>��</span> </span>
	<span><span title=�����û��� class=add_btn onclick=addGroup()
		onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>�����û���</a>
	</span> </span>
	<span><span title=�޸��û��� class=mod_btn onclick=modGroup()
		onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>�޸��û���</a>
	</span> </span>
	<span><span title=ɾ���û��� class=del_btn onclick=deleteGroup()
		onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>ɾ���û���</a>
	</span> </span><span><span>��</span> </span>
	<span><span title=�����û����û� class=distribution_btn
		onclick=distributeUser() onmouseover=doChangBg(this)
		onmouseout=doReturn(this)><a href=#>�����û����û�</a> </span> </span>

</div>

<form name="queryform" id="queryform"
	action="<%=request.getContextPath()%>/portal/usergroup/query.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>"
	method="post">
	<div id=querylist style='display: block;'>
		<table width=97% border=0 cellspacing=0 cellpadding=0>
			<tr>
				<td style='width: 7%'>
					�û������
				</td>
				<td>
					<input type="text" id="groupcode" name="groupcode" class="inputst"
						style="width: 200px;"
						value="<%=request.getAttribute("groupcode")%>" />
				</td>
				<td style='width: 7%'>
					�û�������
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

		<!--�뱣����div��a��ǩ -->
		<div id="form_table_title">
			<ul>
				<li class="top">
					<div>
						�û����ѯ
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
