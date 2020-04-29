<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
   
%>
<script type="text/javascript">
function query(){
	$('queryform').dosubmit();
}
function add(){
        
       $('mainListForm').action="<%=request.getContextPath() %>/portal/userCompare/add.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>";
       $('mainListForm').submit();
}
function returnInfo(){
        
       window.location.href("<%=request.getContextPath() %>/portal/keyuserCompare/index.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>");
}
function mod(){
	if(hasChecked()){
       if(tmain.getSelectedRow().length>1){
          alert("��ѡ��һ�����ݽ����޸�!");
       }else{
       
       		 var selectRow=new Array();
       		 //alert(selectRow);
             selectRow[0]=tmain.getSelectedRow()[0].itemid;
             //alert(document.getElementById("selectedbillids").value);
             document.getElementById("selectedbillids").value = selectRow[0];
             $('mainListForm').action="<%=request.getContextPath() %>/portal/userCompare/mod.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>";
             $('mainListForm').submit();
             
       }
     }else{
       alert("��ѡ��Ҫ�޸ĵ�����!");
     }
}


function del(){
	if(hasChecked()){
        if(confirm('ȷ��Ҫɾ����ѡ��Ϣ��?')) {
          var selectRow=new Array();
          for(var i=0;i<tmain.getSelectedRow().length;i++){
             selectRow[i]=tmain.getSelectedRow()[i].itemid;
          }
          document.getElementById("selectedbillids").value = selectRow;         
          $('mainListForm').action="<%=request.getContextPath() %>/portal/userCompare/del.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>";
          $('mainListForm').submit();    
	    }
     }else{
        alert("��ѡ��Ҫɾ�����û���Ϣ!");
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

function setlpage(num){
	if(hasChecked()){
		  var selectRow="";
          for(var i=0;i<tmain.getSelectedRow().length;i++){
             selectRow+=tmain.getSelectedRow()[i].id+",";
          }
          var url="<%=request.getContextPath()%>/common/bdgagency/classfy.do";
		  var myAjax = new Ajax.Request(
                    url,
                    {method: 'post', parameters: "selectedbillids="+selectRow+"&viewlevel="+num, onComplete: showResponse}
                    );
     }else{
       alert("��ѡ������!");
     }
}

function showResponse(request){
	alert("�趨�ɹ���");
	document.location="<%=request.getContextPath() %>/portal/userCompare/index.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>";
}

function canclelpage(num){
	if(hasChecked()){
		  var selectRow="";
          for(var i=0;i<tmain.getSelectedRow().length;i++){
             selectRow+=tmain.getSelectedRow()[i].id+",";
          }
          var url="<%=request.getContextPath()%>/portal/userCompare/canclePost.do";
		  var myAjax = new Ajax.Request(
                    url,
                    {method: 'post', parameters: "selectedbillids="+selectRow+"&viewlevel="+num, onComplete: showResponse}
                    );
     }else{
       alert("��ѡ������!");
     }
}



</script>
<ui:menufunction divid="query_t"></ui:menufunction>
<form id="queryform"
	action="<%=request.getContextPath()%>/portal/userCompare/index.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>"
	method="post">
	<ui:queryform formid="queryform" />
	<input name="busign2" id="busign2" type="hidden"  maxlength="250"  class="textmin" title="" value = "<%= request.getAttribute("busign") %>"/>
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
						�����¼�û�����
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
		<input name="busign" id="busign" type="hidden"  maxlength="250"  class="textmin" title="" value = "<%= request.getAttribute("busign") %>"/>
	</form>
</div>