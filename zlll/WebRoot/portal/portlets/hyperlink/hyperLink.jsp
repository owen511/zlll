<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<script type="text/javascript">
//查询
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

// 清除FORM中的可录入数据
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
 		alert("请选择要修改的数据！");
    	return;
    }
    if(selected.length >1){
    	alert("请选择一条数据进行修改！");
        return;
    }else{
		var selectRow=new Array();
		var formObject = $("mainListForm");
      	var itemid = selected[0].itemid;
      	formObject.action = "<%=request.getContextPath()%>/portal/hyperlink/mod.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>&itemid="+itemid+"";
		formObject.submit();  
	}
}

//判断主单列表中是否有勾选的数据
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
        if(confirm('确定要删除所选数据吗?')) {
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
        alert("请选择要删除的数据!");
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
 		<script> function createOption(optList){ if(optList==undefined||optList==null ||optList.length==0) return; var htmlStr =''; for(var i=0; i<optList.length;i++){ var opt = optList[i]; htmlStr += '<option value ='+opt+'>'+opt+'</option>' } return htmlStr; } function checkDef(def){ if(def.indexOf('|')<0||def==undefined ||def==null) alert('您输入的菜单选项格式不对！'); } </script><td style = 'width:1%'><div style='width:40px; height:20px; z-index:1000; position:relative; float:right; vertical-align:top;'><img title='配置查询条件' src='/images/done_btn/setOnpage.gif'  align='absmiddle' style='cursor:pointer;' onclick='configCondition("/portal/hyperlink/index.do","5515")'/><img title='保存为默认条件' id='savedefault' src='/images/done_btn/save.gif'  align='absmiddle' style='cursor:pointer;' onclick='saveQuery("/portal/hyperlink/index.do","queryform")'/></div></td>    </tr> 
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
						超链接配置
					</div>
				</li>				
				<li><ui:row2column dataid="tmain" showdivname="edit_table" columnNum= "4"/></li>
			</ul>
		</div>
		<!--请保留此div和a标签 -->		
		<div id='edit_table' style='display:none;padding:0;margin:0;'></div>
		<div id="containerline20" style="display: block;">
			<ui:datatable columndefine="true" id="tmain" tabletype="MainList"  data="json"  showcheckbox="true"/>
		</div>
		
	</form>
</div>


