<%@ page language="java" contentType="text/html; charset=GBK" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%
       String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
%>

<SCRIPT LANGUAGE="JavaScript" type="text/javascript" src="<%=basePath%>/strutsui/js/editsrcmaindata.js"></SCRIPT>

<script language="javascript" type="text/javascript">
var detailObj=null;
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

function doSave(formObject){
		if(tmain == null || tmain.data == null || tmain.data.length ==0){
	   		 alert("没有要保存的数据！"); return;
		}
		var checkRepeatTypeValue=$("detailform").checkRepeatType.value;
		if(checkRepeatTypeValue=="acctcash"){
			for(var i=0;i<tmain.data.length;i++){
				if(tmain.data[i].amt<=0){
					 alert("金额要大于零，请检查！");
					 return;
				 }
			}
		}
		
		saveCheckRepeat();
}
function cancel(){
   window.location.href="index.do?mainmenu=<c:out value='${param.mainmenu}'/>&submenu=<c:out value='${param.submenu}'/>";
}
// 删除数据
function delDetail(){
	    if(detailObj==null){
    	    alert("请选中要删除的明细！");
    	    return;
        }
		// 删除选中的数据
		var index;
		for(var i=0;i<tmain.data.length;i++){
			if(tmain.data[i]==detailObj){
			    index=i;
			}
		}
		var datas = tmain.removeSelected();
		if(tmain.data.length>0){
			if(tmain.data.length==index){
				detailObj=tmain.data[index-1];
			}
			else
			{
			    detailObj=tmain.data[index];
			}
			detailObj.checked=true;
			datasynchfromtable(detailObj);
		}else
		{
			clearFormInput();
			detailObj=null;
		}
		tmain.draw();
}
function detailclick(row){
	if(tmain ==null ||tmain.data == null || tmain.data.length <1 ){
		return;
	}
	var selectrows = tmain.getSelectedRow();	
	var selectrow=selectrows[0];
	if(tmain != null && tmain.data != null && tmain.data.length >0 && detailObj != selectrow){	
		if(!checkNull()){
			datasynchfromtable(row);			
			detailObj=row;
			selectrow.checked=false;
			row.checked=true;
			tdetail.draw();
		}else{

			row.checked=false;
			detailObj.checked=true;
			tmain.draw();
		}
	}
}
// 将选中的数据填写到编辑区内
function mainclick(detailrow){
	//校验主子单的必填字段
	//if(!addMainEditFormInput()) return;
	//if(!addEditFormInput()) return;
	if(tmain ==null ||tmain.data == null || tmain.data.length <1 ){
		return;
	}
	var selectrows = tmain.getSelectedRow();	
	var selectrow=selectrows[0];
    datasynchfromtable(selectrow);
    detailObj=selectrow;
}
//检测银行重复
function saveCheckRepeat(){
	var selectRow=new Array();
	var checkRepeatTypeValue=$("detailform").checkRepeatType.value;
	var billidValue=$("detailform").billid.value;
	var allstorerate=0;
	var url ="checkRepeat.do?checkRepeatType="+checkRepeatTypeValue+"&"+urlmenuparameter+"&billid="+billidValue;
	if(checkRepeatTypeValue=="acctcash"){
		submitTableData();	
	
	}else {// if(checkRepeatTypeValue=="storerate")
		for(var i=0;i<tmain.data.length;i++){
			selectRow[i]=tmain.data[i].agentbank;
			allstorerate=Number(allstorerate)+Number(tmain.data[i].storerate);
		 }
		if(Number(allstorerate)>1){
		 	alert("界面数据，分存比例总值和为:"+allstorerate+" 大于１，请检查！");
		 	return;
		 }
		 url=url+"&alluistorerate="+allstorerate;
		 var pars = 'selectedbillids='+selectRow;						
		 var myAjax = new Ajax.Request( url,{method: 'post', parameters: pars, onComplete: doSaveProcess} );
		 
	}
}
function doSaveProcess(resp){
 	var data= resp.responseText;
 	if(data=="ok"){
		submitTableData();			   	 
	}else{
		alert(data);
	}
}
function submitTableData(){
	    $("detailform").maindata.value =tmain.data.toJSON();
		$("detailform").submit();
		document.getElementById("saveAndOut").disabled = true;
		document.getElementById("deldetailbtn").disabled = true; 
}
function formatMoneyInput(obj,objlenght){
	if(parseFloat(event.keyCode) > 41 || parseFloat(event.keyCode) < 36){ 
		obj.value = chkNumber(obj);
		if(obj.value!=null&&obj.value!=""){
			var amtint = obj.value.substring(0,obj.value.indexOf(".")==-1?obj.value.length:obj.value.indexOf("."));
			if(amtint.length>14){
				alert("录入的数据，整数位只能录入14位！");
				obj.value = obj.value.substring(0,obj.value.length-1);
				return false;
			}
		}
		if(obj.value.indexOf(".")!=-1){
			var amtfloat = obj.value.substring(obj.value.indexOf(".")+1,obj.value.length);
			if(amtfloat.length>objlenght) {
				alert("录入的数据，小数位只保留"+objlenght+"位！");
				obj.value = obj.value.substring(0,obj.value.length-1);
				return false;
			}
		}
		obj.value = numFormat(obj);
	} else {
		return false;
	}
}
</script>
<c:choose>
	    <c:when test="${ifmis_uipage_head eq 'noqueryedit'}">
		</c:when>
	    <c:otherwise>
		<ui:menufunction divid="query_t"></ui:menufunction>
		<form id=queryform
			action="edit.do?actiontype=add&mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>"
			method="post">
			<ui:queryform formid="queryform" />
		</form>
		<form id="advancedQueryForm" name="advancedQueryForm" 
			action="edit.do?actiontype=add&mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>" method="post">   
			   <ui:advancedqueryform formid="advancedQueryForm" />
		</form>
  </c:otherwise>   
</c:choose>
	
<div id="form_table_title">
  　　<ul><li class="top"><div>表格区</div></li></ul>
</div>

<div id="containerline6">
	<ui:datatable id="tmain" tabletype="MainList" data="sourcesjson"  showradio="true" onclick="mainclick" columndefine="true"/>
</div>

<form name="detailform" id="detailform" action="save.do?submittype=form&mainmenu=<c:out value='${param.mainmenu}'/>&submenu=<c:out value='${param.submenu}'/>" method="post">
	<input type="hidden" name ="maindata" id ="maindata" />
	<input type="hidden" name="billid" id="billid" value="<c:out value='${mainVouDTO.billid}'/>" />
	<input type="hidden" name="selectedbillids" id="selectedbillids" />
	<input type="hidden" name ="checkRepeatType" id ="checkRepeatType" value="<%=request.getAttribute("checkRepeatType")%>"/>
	

<div id="form_table_title_edit">
  <ul> <li class="top">  <div>编辑区</div> </li></ul>
</div>

<div id="form_table">
	  <ui:editform formid="detailform" pagetype="add" parsetype="link" tableName="tmain" />
</div>
<div id="confirm_exit_btn">    
    <input name="submitbtn" type="button" value="保存并退出" class="button_style" id="saveAndOut" onclick="doSave(this.form)"/>
    <input name="backbtn" type="button" value="返回"  class="button_style"  id="backbtn" onclick="cancel()"/>  
</div>
</form>
<script type="text/javascript">
    tmain.data[0].checked = true;
	tmain.show();
	var orerowobj=tmain.data[0];
	datasynchfromtable(orerowobj);

</script>