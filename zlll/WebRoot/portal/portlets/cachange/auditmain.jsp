<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<script type="text/javascript" src="<%=basePath%>/js/choose.js"></script>
<script type="text/javascript">
function query(){
	$('queryform').dosubmit();
}

function audit(){
	if(hasChecked()){
		var selectedRow = tmain.getSelectedRow();
		if(selectedRow.length >1){
       		alert("��ѡ��һ�����ݽ�����ˣ�");
       	    return;
        }else{
       	    if(confirm('ȷ��Ҫ�����ѡ������?')) {
				var selectRow=new Array();
          		for(var i=0;i<selectedRow.length;i++){
            		 var id = selectedRow[0].itemid;
            		 var castate = selectedRow[0].castate;
         		}
		        document.getElementById("selectedbillids").value = id;         
		        $('mainListForm').action="<%=request.getContextPath() %>/portal/caAudit/audit.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>&castate="+castate+"";
		        $('mainListForm').submit();    
	        }
	    }
	}else{
        alert("��ѡ��Ҫ��˵�����!");
    }
}
//�˻�
function auditcancle(){
	if(hasChecked()){
          var selectRow=new Array();
          var selectedRow = tmain.getSelectedRow();
          for(var i=0;i<selectedRow.length;i++){
             selectRow[i] = selectedRow[i].itemid;
          }
          document.getElementById("selectedbillids").value = selectRow;
          	var url = "<%=request.getContextPath() %>/portal/portlets/cachange/cacancle.jsp";
			var cancleremark = window.showModalDialog(url,'window',"dialogWidth=450px;dialogHeight=260px,scrollbars=yes,status=no,resizable=0;"); 
			if(cancleremark !=undefined){ 
			window.location.href("<%=request.getContextPath() %>/portal/caAudit/auditcancle.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>&id="+document.getElementById("selectedbillids").value+"&cancleremark="+cancleremark+"");      
         }
     }else{
        alert("��ѡ��Ҫ�˻ص�����!");
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

//����F5ˢ��
function DisableF5(){   
	var d_url=document.location.href;
    with (event){   
           // F5 and Ctrl+R   
     if (keyCode==116 || (ctrlKey && keyCode==82)){  
     	if(d_url.indexOf('common/post/index')<=0){
			window.location='<%=request.getContextPath() %>/portal/caAudit/query.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>';
		} 
       event.keyCode = 0;   
       event.cancelBubble = true;   
       return false;   
     }   
   }   
} 
document.onkeydown = DisableF5;

</script>
<ui:menufunction divid="query_t"></ui:menufunction>
<form id="queryform"
	action="<%=request.getContextPath()%>/portal/caAudit/query.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>"
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
				<!-- <li id="zx" class="top" > -->
					<div>
						��¼��ʽ�л����
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