<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<script type="text/javascript">
//��ѯ
function query(){
	$('queryform').submit();
}

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
		obj.value="";
	}else if(obj.tagName == "INPUT" && obj.type=="hidden"){
		obj.value = "";
	}
}

// ���FORM�еĿ�¼������
function clearFormInputAll(formObj){
	var inputelements = formObj.elements;
	for(var i=0;i<inputelements.length;i++){
		var obj = inputelements[i];
		if((obj.tagName == "INPUT" && obj.type=="text") || obj.tagName == "SELECT"){
			obj.value = ""
			obj.valueid = null;
			obj.valuecode = null;
		}else if(obj.tagName == "INPUT" && obj.type=="checkbox"){
			obj.checked=false;
		}else if(obj.tagName == "INPUT" && obj.type=="hidden"){
			obj.value = "";
		}
	}
}

function add(){
	window.location.href("<%=request.getContextPath() %>/portal/hyperlink/add.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>");
}
function mod(){
	var selected = tmain.getSelectedRow();
    if(null == selected || null ==selected[0]){
 		alert("��ѡ��Ҫ�޸ĵ����ݣ�");
    	return;
    }
    if(selected.length >1){
    	alert("��ѡ��һ�����ݽ����޸ģ�");
        return;
    }else{
		var selectRow=new Array();
		var formObject = $("mainListForm");
      	var itemid = selected[0].itemid;
      	formObject.action = "<%=request.getContextPath()%>/portal/hyperlink/mod.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>&itemid="+itemid+"";
		formObject.submit();  
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

function del(){
	if(hasChecked()){
        if(confirm('ȷ��Ҫɾ����ѡ������?')) {
          var selectRow=new Array();
          var selected = tmain.getSelectedRow();
          for(var i=0;i<selected.length;i++){
             selectRow[i]="'"+selected[i].itemid+"'";
          }
          document.getElementById("selectedbillids").value = selectRow;         
          $('mainListForm').action="<%=request.getContextPath() %>/portal/hyperlink/del.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>";
          $('mainListForm').submit();    
	    }
     }else{
        alert("��ѡ��Ҫɾ��������!");
     }
}

</script>
<ui:menufunction divid="query_t"></ui:menufunction>
<form id="queryform"
	action="<%=request.getContextPath()%>/portal/hyperlink/index.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>"
	method="post">
	<div id= querylist style='display:none;'>    
	<table width=97% border=0 cellspacing=0 cellpadding=0> 
      <tr> 
 		<script> function createOption(optList){ if(optList==undefined||optList==null ||optList.length==0) return; var htmlStr =''; for(var i=0; i<optList.length;i++){ var opt = optList[i]; htmlStr += '<option value ='+opt+'>'+opt+'</option>' } return htmlStr; } function checkDef(def){ if(def.indexOf('|')<0||def==undefined ||def==null) alert('������Ĳ˵�ѡ���ʽ���ԣ�'); } </script><td style = 'width:1%'><div style='width:40px; height:20px; z-index:1000; position:relative; float:right; vertical-align:top;'><img title='���ò�ѯ����' src='/images/done_btn/setOnpage.gif'  align='absmiddle' style='cursor:pointer;' onclick='configCondition("/portal/hyperlink/index.do","5515")'/><img title='����ΪĬ������' id='savedefault' src='/images/done_btn/save.gif'  align='absmiddle' style='cursor:pointer;' onclick='saveQuery("/portal/hyperlink/index.do","queryform")'/></div></td>    </tr> 
  	</table> 
    </div>
    <input type="hidden" name="allflag"/><input type="hidden" name="totalrows" />
    <input type="hidden" name="totalpages" /><input type="hidden" name="rows"/>
    <input type="hidden" name="currpage" value="1"/>
    <script> 
    	ExForm($('queryform'));  
    	function addQueryFormInput(){ var obj; return true; }
		function queryCheckIdata(){return true;}
		function clearInputRule(element){ 
		} 
	 	function clearValueofIsDataSouce(){ var obj;} 
	</script> 
<input type='hidden' name='fromquery' value='yes'/><input type='hidden'id='isQuery' name='isQuery' value='yes'/><script> ExForm($('queryform')); </script> 
<script> JQ(document).ready(function() {loadselectquery();});  </script> 
<script> var programtreetype = 1;</script>
</form>
<div>
	<form name="mainListForm" id="mainListForm" action="#" method="post">
		<input name="selectedbillids" id="selectedbillids" type="hidden"
			value="">
		<div id="form_table_title">
			<ul>
				<li class="top">
					<div>
						����������
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


