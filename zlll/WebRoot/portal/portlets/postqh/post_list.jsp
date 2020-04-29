<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<script type="text/javascript">
function query(){
	$('queryform').dosubmit();
}
function add(){
	window.location.href("<%=request.getContextPath() %>/common/postqh/add.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>");
}
function mod(){
	if(hasChecked()){
       if(tmain.getSelectedRow().length>1){
          alert("��ѡ��һ����������޸�!");
       }else{
       		 var selectRow=new Array();
             selectRow[0]=tmain.getSelectedRow()[0].id;
             document.getElementById("selectedbillids").value = selectRow[0];
             $('mainListForm').action="<%=request.getContextPath() %>/common/postqh/mod.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>";
             $('mainListForm').submit();
       }
     }else{
       alert("��ѡ��Ҫ�޸ĵ�����!");
     }
}

function preview(){
	if(hasChecked()){
       if(tmain.getSelectedRow().length>1){
          alert("��ѡ��һ����������޸�!");
       }else{
       		 var id =tmain.getSelectedRow()[0].id;
             var url = "<%=request.getContextPath()%>/common/post/preview.do?id="+id;
   			 window.open(url,'window',"Width=700px;Height=550px;scroll=0;status=no;resizable=0;");  
       }
     }else{
       alert("��ѡ��ҪԤ��������!");
     }
}

function del(){
	if(hasChecked()){
        if(confirm('ȷ��Ҫɾ����ѡ������?')) {
          var selectRow=new Array();
          for(var i=0;i<tmain.getSelectedRow().length;i++){
             selectRow[i]=tmain.getSelectedRow()[i].id;
          }
          document.getElementById("selectedbillids").value = selectRow;
          $('mainListForm').action="<%=request.getContextPath() %>/common/postqh/del.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>";
          $('mainListForm').submit();    
	    }
     }else{
        alert("��ѡ��Ҫɾ���Ĺ���!");
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
          var url="<%=request.getContextPath()%>/common/post/classfy.do";
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
	document.location="<%=request.getContextPath() %>/common/postqh/index.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>";
}

function canclelpage(num){
	if(hasChecked()){
		  var selectRow="";
          for(var i=0;i<tmain.getSelectedRow().length;i++){
             selectRow+=tmain.getSelectedRow()[i].id+",";
          }
          var url="<%=request.getContextPath()%>/common/post/canclePost.do";
		  var myAjax = new Ajax.Request(
                    url,
                    {method: 'post', parameters: "selectedbillids="+selectRow+"&viewlevel="+num, onComplete: showResponse}
                    );
     }else{
       alert("��ѡ������!");
     }
}

</script>
<ui:menufunction divid="query_t"/>

<form id=queryform
	action="<%=request.getContextPath() %>/common/postqh/index.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>"
	method="post">
	<ui:queryform formid="queryform" />
</form>

<div>
	<form name="mainListForm" id="mainListForm" action="#" method="post">
	<input type="hidden" id="selectedbillids" name="selectedbillids" value=""/>
		<div id="form_table_title">
			<ul>
				<li id="zx" class="top" >
					<div>
						������Ϣ
					</div>
				</li>
			</ul>
		</div>
		<!--�뱣����div��a��ǩ -->
		<div id="containerline20" style="display: block;">
		<div id='edit_table' style='display:none;padding:0;margin:0;'></div>
			<ui:datatable columndefine="true" id="tmain" tabletype="MainList"  data="json"  display="block" showcheckbox="true"/>
		</div>
	</form>
</div>
