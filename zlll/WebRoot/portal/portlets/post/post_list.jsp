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
	window.location.href("<%=request.getContextPath() %>/common/post/add.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>");
}
function mod(){
	if(hasChecked()){
       if(tmain.getSelectedRow().length>1){
          alert("��ѡ��һ����������޸�!");
       }else{
       		 var selectRow=new Array();
             selectRow[0]=tmain.getSelectedRow()[0].id;
             document.getElementById("selectedbillids").value = selectRow[0];
             $('mainListForm').action="<%=request.getContextPath() %>/common/post/mod.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>";
             $('mainListForm').submit();
       }
     }else{
       alert("��ѡ��Ҫ�޸ĵ�����!");
     }
}

function preview(){
	if(hasChecked()){
       if(tmain.getSelectedRow().length>1){
          alert("��ѡ��һ���������Ԥ��!");
       }else{
       		 var id =tmain.getSelectedRow()[0].id;
             var url = "<%=request.getContextPath()%>/common/post/preview.do?id="+id;
      		 window.open(url,'window',"Width=600px,Height=700px,scrollbars=yes,status=no,resizable=0;");  
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
          $('mainListForm').action="<%=request.getContextPath() %>/common/post/del.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>";
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
             var posttypeName = tmain.getSelectedRow()[i].posttype_name;
             if(posttypeName!=null&&posttypeName!=""){
             	if(posttypeName.indexOf('����')==-1){
             		alert("��ѡ������Ϊ��01-���桿�����ݽ������ã�");
             		return false;
             	}
             }
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
	document.location="<%=request.getContextPath() %>/common/post/index.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>";
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

//����F5ˢ��
function DisableF5(){   
	var d_url=document.location.href;
   with (event){   
           // F5 and Ctrl+R   
     if (keyCode==116 || (ctrlKey && keyCode==82)){  
     	if(d_url.indexOf('common/post/index')<=0){
			window.location='<%=request.getContextPath() %>/common/post/index.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>';
		} 
       event.keyCode = 0;   
       event.cancelBubble = true;   
       return false;   
     }   
   }   
} 
document.onkeydown = DisableF5;

function clearInput(obj){
	if(obj.tagName == "INPUT" && obj.type=="text"){
		obj.value = ""
		obj.valueid = null;
		obj.valuecode = "";
		if(obj.row){
			obj.row = "";
			obj.page = "";
		}
	}else if(obj.tagName == "SELECT"){
		obj.value = ""
	}
}
</script>
<ui:menufunction divid="query_t"></ui:menufunction>
<form id="queryform"
	action="<%=request.getContextPath()%>/common/post/index.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>"
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
						������Ϣ
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