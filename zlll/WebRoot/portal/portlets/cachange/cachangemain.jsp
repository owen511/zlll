<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String f2 = (String)request.getAttribute("f2");
%>
<script type="text/javascript">
function query(){
	$('queryform').dosubmit();
}
var f2='<%=f2%>';
function add(){
    
	if(f2 == "false"){
    	alert("�������м�¼���޸ģ���Ҫ�ظ�����");
    	return;
    }else{
	window.location.href("<%=request.getContextPath() %>/portal/caAdd/add.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>");
}
}
function mod(){
	 
       if(null == tmain.getSelectedRow() || null == tmain.getSelectedRow()[0]){
    		alert("��ѡ��Ҫ�޸ĵ����ݣ�");
       	    return;
    
       }
       if(tmain.getSelectedRow().length >1){
       		alert("��ѡ��һ�����ݽ����޸ģ�");
       	    return;
       }else{
       
       		 var selectRow=new Array();
       		 var formObject = $("mainListForm");
             var itemid = tmain.getSelectedRow()[0].itemid;
            formObject.action = "<%=request.getContextPath()%>/portal/caAdd/mod.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>&itemid="+itemid+"";
		    formObject.submit();  
       }

}


function del(){
	if(hasChecked()){
        if(confirm('ȷ��Ҫɾ����ѡ������?')) {
          var selectRow=new Array();
          for(var i=0;i<tmain.getSelectedRow().length;i++){
             selectRow[i]=tmain.getSelectedRow()[i].itemid;
          }
          document.getElementById("selectedbillids").value = selectRow;         
          $('mainListForm').action="<%=request.getContextPath() %>/portal/caAdd/del.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>";
          $('mainListForm').submit();    
	    }
     }else{
        alert("��ѡ��Ҫɾ��������!");
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
          var url="<%=request.getContextPath()%>/portal/bdgagency/classfy.do";
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
	document.location="<%=request.getContextPath() %>/portal/bdgagency/index.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>";
}

function canclelpage(num){
	if(hasChecked()){
		  var selectRow="";
          for(var i=0;i<tmain.getSelectedRow().length;i++){
             selectRow+=tmain.getSelectedRow()[i].id+",";
          }
          var url="<%=request.getContextPath()%>/portal/bdgagency/canclePost.do";
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
			window.location='<%=request.getContextPath() %>/portal/caAdd/query.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>';
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
	action="<%=request.getContextPath()%>/portal/caAdd/query.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>"
	method="post">
	
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
						��¼��ʽ�л�
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