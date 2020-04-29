<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<script>
function add(){
	window.location.href("<%=request.getContextPath() %>/portal/ca/add.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>");
}
function query(){
	$('queryform').dosubmit();
}

function mod(){
	if(hasChecked()){
       if(tmain.getSelectedRow().length>1){
          alert("��ѡ��һ�������޸�!");
       }else{
       		 var selectRow=new Array();
             selectRow[0]=tmain.getSelectedRow()[0].usercode;
             document.getElementById("selectedbillids").value = selectRow[0];
             $('mainListForm').action="<%=request.getContextPath() %>/portal/ca/mod.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>";
             $('mainListForm').submit();
       }
     }else{
       alert("��ѡ��Ҫ�޸ĵ�����!");
     }
}

function del(){
	if(hasChecked()){
        if(confirm('ȷ��Ҫע�������û���CA��?')) {
          var selectRow=new Array();
          for(var i=0;i<tmain.getSelectedRow().length;i++){
             selectRow[i]=tmain.getSelectedRow()[i].usercode;
          }
          document.getElementById("selectedbillids").value = selectRow;
          $('mainListForm').action="<%=request.getContextPath() %>/portal/ca/del.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>";
          $('mainListForm').submit();    
	    }
     }else{
        alert("��ѡ��Ҫע�����û�!");
     }
}

//�ж������б����Ƿ��й�ѡ������
function hasChecked(){
	 var flag =false;		
	 for(var i=0;i<document.mainListForm.elements.length;i++){
	    var e=document.mainListForm.elements[i];
		if(e.type == "checkbox"&&e.checked&&e.name!="allbox"){
		    flag=true;
			break;
		}
	 }	
	 return flag;
}
</script>
<ui:menufunction divid="query_t"></ui:menufunction>
<form id="queryform"
	action="<%=request.getContextPath()%>/portal/ca/index.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>"
	method="post">
	<ui:queryform formid="queryform" />
</form>
<div>
	<form name="mainListForm" id="mainListForm" action="#" method="post">
		<input name="selectedbillids" id="selectedbillids" type="hidden"
			value="">
		<div id="form_table_title">
			<ul>
				<li class="top">
					<div>
						CA����
					</div>
				</li>
				
				<li><ui:row2column dataid="tmain" showdivname="edit_table" columnNum= "4"/></li>
			</ul>
		</div>
		<!--�뱣����div��a��ǩ -->
		
		<div id='edit_table' style='display:none;padding:0;margin:0;'></div>
		<div id="containerline20" style="display: block;">
			<ui:datatable columndefine="true" id="tmain" tabletype="MainList"  data="json"  showcheckbox="true"/>
		</div>
		
	</form>
</div>
