<%@page language="java" contentType="text/html; charset=GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<script>
var mainindexurl =  "index.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>";
// 保存主单信息的变量
var mainVouch = new Object();

//记录用户是否变更的全局变量
var isModified=false;
var backindex = false;// 保存后是否返回列表页
 
function setMainVouchPK(mainVouch){
	if($("billid"))mainVouch.billid= $("billid").value;
}

//返回
//取消
function backCheckSave(){
	if(!ismodifydata){
		backIndex();
		return;
	}
	if(confirm("数据未保存，是否保存数据？")){
		if(addEditFormInput() ){
			 saveQuit();
		}		    
	} else {
		backIndex();
	}
}
// 清除FORM中的可录入数据
function clearFormInput(isOnlyAmt){
	var inputelements = $("detailform").elements;
	for(var i=0;i<inputelements.length;i++){
		var obj = inputelements[i];
		if(obj.tagName == "INPUT" && obj.type=="text" ){
			obj.value = ""
			obj.valueid = null;
		}
		if(obj.tagName == "INPUT" && obj.type=="radio" ){
			obj.checked = false;
		}
	}
	//clearEditFormInput();
}

function limitNum(obj) {
    obj.value=obj.value.replace(/[^0-9]/g,'');
}

function checkLength(obj,ilen,scaption){
  if(obj.value!=null && obj.value!=""){
			if(obj.value.length>ilen){
			    var strcaption ="";
			    if (scaption != null)
			    	strcaption = scaption;    
			//	alert(strcaption+"录入数据不能超过"+ilen+"位！"); 
				obj.value = obj.value.substring(0,ilen);
				return false;
			}
   }
   return true;		
}
</script>

<form name="detailform" id="detailform"
	action="save.do?submittype=form&mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>" method="post">
	<input type="hidden" name="maindata" id="maindata" />
	<input type="hidden" name="billid" id="billid" value="<c:out value='${mainVouDTO.billid}'/>" />
	<div id="form_table_title_edit">
		<ul>
			<li class="top">
				<div>
					编辑区
				</div>
			</li>
		</ul>
	</div>
	<div id="form_table" style="display:block;">
		<ui:editform formid="detailform" pagetype="mod" parsetype="link"/>
	</div>
	<div id="confirm_exit_btn">
		<c:choose>
		<c:when test="${actiontype eq 'add'}">
			<input name="goonbtn" type="button" value="保存并继续" class="button_style" id="saveAndOn" onclick="saveContinue()"/>
			<input name="submitbtn" type="button" value="保存并退出" class="button_style" id="saveAndOut" onclick="saveQuit()"/>
		</c:when>   
		   <c:otherwise> 
			<input name="submitbtn" type="button" value="保存" class="button_style" id="saveAndOut" onclick="saveQuit()"/>
		</c:otherwise>
	   </c:choose>
		<input name="mod3" type="button" value="返回" class="button_style"
			onclick="backCheckSave()" />
		<input type="button" style="border:0; background:none; width:0;" />
	</div>
</form>
<SCRIPT LANGUAGE="JavaScript">
<!--
	    //同步mainVouDTO到主编辑区
	var mainJson = <%= request.getAttribute("mainJson")%>;

	mainVouch = mainJson[0];
	datasynchfromtable(mainVouch);
	if("add" == "<%=request.getAttribute("actiontype")%>"){
		if(typeof(setDefaultValue)=='function'){
			setDefaultValue();
		}
	}

// 保存
function savedata(){
	if(backindex==undefined)
		backindex = false;
	 if( addEditFormInput()){
		   setMainVouchPK(mainVouch)
           datasynchtoObj(mainVouch);
    	   var url = 'save.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>';
		   var pars ='maindata='+Object.toJSON(mainVouch)+'&billid='+$("billid").value;
		   save(url,pars,backindex);  
	 }
}
// 将主单和明细信息保存到后台，并返回本页
function saveQuit(){
	backindex = true;
	savedata();
}
// 保存退出，并返回列表页
function saveContinue(){
	backindex = false;
	savedata()
}
//检测银行重复
function saveCheckBankRepeat(){
	var itemid =$("detailform").agentbank.valueid;
	if(!itemid){return;	}

	var url ="checkRepeat.do?checkRepeatType=bankgrade&billid="+$("billid").value+"&"+urlmenuparameter;
	var pars = 'selectedbillids='+itemid;
	var myAjax =new Ajax.Request(url,{
								   	 method: 'post',
								   	 parameters: pars,
								   	 onComplete: doSaveProcess,
									 onFailure : function(resp) {}
									} 
								);
}
function doSaveProcess(resp){
 	var data= resp.responseText;
 	if(data=="ok"){
		savedata();				   	 
	}else{
		alert(data);	
	}
}

//判断数据是否修改
ismodifydata = false;
var oldrowObj = new Object();
datasynchtoObj(oldrowObj);
var bfselffunc = function(obj){
	if(!ismodifydata){
		var newrowObj = new Object();
		datasynchtoObj(newrowObj);
		ismodifydata = compareRowObj(newrowObj,oldrowObj);
	}
}  

//-->
</SCRIPT>