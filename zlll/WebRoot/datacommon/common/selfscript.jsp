<%@ page language="java" contentType="text/html; charset=GBK"
	pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="http://struts.apache.org/tags-tiles" prefix="tiles"%>
<%
       String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
%>
<SCRIPT LANGUAGE="JavaScript" type="text/javascript" src="<%=basePath%>/datacommon/common/js/columndefine.js"></SCRIPT>
<SCRIPT LANGUAGE="JavaScript" type="text/javascript" src="<%=basePath%>/datacommon/common/js/div.js"></SCRIPT>
<SCRIPT LANGUAGE="JavaScript">
<!--
	var urlmenuparameter = "mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>&vchtypeid=<c:out value="${vchtypeid}"/>&<c:out value="${DEFAULTURLPARAMETER}" escapexml="false"/>";
	//显示创建的层
	if(typeof(showdiv)=="undefined")showdiv = function (){};
	//隐藏创建的层
	if(typeof(closediv)=="undefined")closediv = function (){};
//-->
</SCRIPT>
<%System.out.println(request.getAttribute("ifmis_ui_page_type")); %>
<c:choose>
    <c:when test="${ifmis_ui_page_type eq 'indexpage'}">
<!--列表页面才使用以下内容-->
<SCRIPT LANGUAGE="JavaScript">
<!--
var userid = "<%=gov.mof.fasp.sec.util.SecureUtil.getCurrentUser().getUserid()%>";
var rptid = "<c:out value='${rptid}'/>";
var isprintwf = "<c:out value='${isprintwf}'/>";
var isauditall = "<c:out value='${isauditall}'/>";

//返回列表
function backIndex(){
	document.mainListForm.action= 'index.do?random='+Math.random()+'&'+urlmenuparameter;
	document.mainListForm.submit();
}

//删除操作
function deleteData(){
     if(hasChecked()){
		if(confirm('确定要删除所选单据吗?')) {
			var selectRow=new Array();
			for(var i=0;i<tmain.getSelectedRow().length;i++){
				selectRow[i]=tmain.getSelectedRow()[i].billid;
			}
			var url = 'delete.do?'+urlmenuparameter;
			var pars = 'selectedbillids='+selectRow;
			showdiv();
			var myAjax = new Ajax.Request(
					url,
					{method: 'post',
				     parameters: pars,
				     onComplete: function(request){
							closediv();
							var retobj = request.responseText.evalJSON(true);	
							if(retobj.statuCode!=null && retobj.statuCode==100 && retobj.warnmsg !=null && retobj.warnmsg!=""){
								alert(retobj.warnmsg);
								//backIndex();
							}else{
								backIndex();
							}
					 },
					 onFailure : function(resp) {
						    closediv();
							alert("删除失败！");
							return;
						}
					}
			)
		}   
     }else{
        alert("请选择要删除的单据！");
     }
}
//新增操作
function doadd(){
	window.location.href='edit.do?actiontype=add&'+urlmenuparameter;
}
//修改操作
function modify(url,actionname,ismutilsel){
	 if(ismutilsel==undefined)ismutilsel=0;
	 if(url==undefined)url="edit.do"
	 if(actionname==undefined){
		actionname = event.srcElement.tagName=="A"?event.srcElement.parentElement.title:event.srcElement.title;
	 }
	 if(actionname==""||actionname==null)actionname="修改";
     if(hasChecked()){
       if(tmain.getSelectedRow().length>1&&ismutilsel==0){
          alert("请选择单条数据进行"+actionname+"！");
       }else{
          	var selectRow=new Array();
			var len=tmain.getSelectedRow().length;
			for(var i=0;i<len;i++){
				selectRow[i]=tmain.getSelectedRow()[i].billid;
			}
          	document.getElementById("selectedbillids").value=selectRow;
          	document.mainListForm.action=url+'?actiontype=modify&'+urlmenuparameter;
          	document.mainListForm.submit();
       }
     }else{
       alert("请选择要"+actionname+"的单据！");
     }
}
function gotoadd(){
	 window.location.href='edit.do?querydata=0&actiontype=add&'+urlmenuparameter;
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
		if(e.type == "radio"&&e.checked){
		    flag=true;
			break;
		}
	 }
	 return flag;
}
/**
 *  用AJAX发送请求	
 * URL ：action http URL
 * action :动作名
 * isconfirm :是否确认
 * backindex : 是否返回到前一页面或刷新
 * nocheck :不用选择内容的发送
*/
function sendurl(url,actionname,isconfirm,backindex,nocheck){
	if(backindex==undefined)
		backindex = false;
	if(nocheck==undefined)
		nocheck = false;
	if(hasChecked()||nocheck){
		if(!isconfirm||confirm('确定要['+actionname+']所选单据吗?')) {
			var selectRow=new Array();
			
			var len=tmain.getSelectedRow().length;
			if(len==0&&!nocheck){
				alert("没有要["+actionname+"]的单据，请检查！");
				return;
			}
			for(var i=0;i<len;i++){
				selectRow[i]=tmain.getSelectedRow()[i].billid;
			}
			
	        var selectedbillids = 'selectedbillids=' + selectRow+'&'+urlmenuparameter;
	        var pars = selectedbillids;
	        showdiv();
		   	var myAjax = new Ajax.Request(url,
						   	{
							   	 method: 'post',
							   	 parameters: pars,
							   	 onComplete : function (resp){	//不刷新页面操作后更新单据状态
											closediv();
											var retobj = resp.responseText.evalJSON(true);	
											if(retobj.statuCode!=null && retobj.statuCode==100 && retobj.warnmsg !=null && retobj.warnmsg!=""){
												enabledFunctionButton();
												alert(retobj.warnmsg);
												sendurlredraw(retobj);
											}else{
												if(backindex){
													backIndex();
												}else{
													sendurlredraw(retobj);
												}
											}
										},
								 onFailure : function(resp) { 
									closediv();
								 	alert("操作失败！");
								 }
							} 
		   				);
	   }
    }else{
        alert("请选择要"+actionname+"的单据！");
     }
}
/**
 *	执行完工作流操作或其它操作后不刷新页面更新DATATABLE的回调更新数据的方法
 *  retobj 对象 {statuCode:[100-错误|200-正确],
				 warnmsg:错误信息,
				 vous<更新的行的相关数据>:[{billid:,wfstatus_code:,wfstatus_name:,wfstatus_code:,userid:,lastupdatetime:,receipttime:},{}...],
				 datas<行的数据>:[{},{}....]}
*/
function sendurlredraw(retobj){
	try{
		if(retobj.vous!=null){
			var apps = retobj.vous;
			var selectrows =  tmain.getSelectedRow();
			for(var i= 0; i<apps.size();i++) {
				for(var j=0;j<selectrows.length;j++){
					if(apps[i].billid==selectrows[j].billid){
						selectrows[j].wfstatus_code=apps[i].wfstatus_code;
						selectrows[j].wfstatus_name=apps[i].wfstatus_name;
						selectrows[j].wfstatus = apps[i].wfstatus_code;
						selectrows[j].userid = apps[i].userid;
						selectrows[j].lastupdatetime = apps[i].lastupdatetime;
						selectrows[j].receipttime = apps[i].receipttime;
						updateRow2Column('tmain','edit_table');
					}
				}
			}
		}
		if(retobj.datas!=null){
			var datas = retobj.datas;
			var selectrows = tmain.data;
			for(var i= 0; i<datas.size();i++) {
				for(var j=0;j<selectrows.length;j++){
					if(datas[i].billid==selectrows[j].billid){
						selectrows[j] = datas[i];
					}
				}
			}
		}
		tmain.draw();
	}catch(err){
		for(var pre in err){
			alert(pre+":"+err[pre]);
		}
	}

}
//送审
function sendAuditdata (){
	var url ="doaction.do?method=sendAudit";
	if(isauditall=="true")tmain.selectedallrows(true);//如果是一次审核所有，则全选所有
	sendurl(url,"送审",true);
	
}

//取消送审
function cancelSendAuditdata (){
	var url ="doaction.do?method=cancelSendAudit";
	if(isauditall=="true")tmain.selectedallrows(true);//如果是一次审核所有，则全选所有
	sendurl(url,"取消送审",true);
}

//审核
function audit(){
	var url ="doaction.do?method=audit";
	if(isauditall=="true")tmain.selectedallrows(true);//如果是一次审核所有，则全选所有
	sendurl(url,"审核",true);
}

//取消审核
function cancelAudit(){
	var url ="doaction.do?method=cancelAudit";
	if(isauditall=="true")tmain.selectedallrows(true);//如果是一次审核所有，则全选所有
	sendurl(url,"取消审核",true);
}
//审核不通过
function passAudit(){
	var url ="doaction.do?method=passAudit";
	if(isauditall=="true")tmain.selectedallrows(true);//如果是一次审核所有，则全选所有
	sendurl(url,"审核不通过",true);
}

//退回
function back(){
	var url ="doaction.do?method=back";
	if(isauditall=="true")tmain.selectedallrows(true);//如果是一次审核所有，则全选所有
	sendurl(url,"退回",true);
}

//取消退回
function cancelBack(){
	var url ="doaction.do?method=cancelBack";
	if(isauditall=="true")tmain.selectedallrows(true);//如果是一次审核所有，则全选所有
	sendurl(url,"取消退回",true);
}

//删除：取消送审
function dodel(){
	var url ="doaction.do?method=delete";
	sendurl(url,"删除",true);
}

//确认
function doconfirm(){
	var selectrows = tmain.getSelectedRow();
	for(i = 0;i< selectrows.length ;i++){
		var rowObj = selectrows[i];	
		if(rowObj.wfstatus==18){
			rowObj.checked = false;
		}		
	}
	var url ="doaction.do?method=confirm";
}
//生成通知
function saveDetail (){
	var url ="doaction.do?method=save";
	sendurl(url,"生成",true,true);
}
//以下为打印函数所有
//TODO：想法屏蔽
Date.prototype.format = function(mask) {     
    var d = this;     
    var zeroize = function (value, length) {     
        if (!length) length = 2;     
        value = String(value);     
        for (var i = 0, zeros = ''; i < (length - value.length); i++) {     
            zeros += '0';     
        }     
        return zeros + value;     
    };       
    return mask.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])\1?|[lLZ])\b/g, function($0) {    
        switch($0) {     
            case 'dd':  return zeroize(d.getDate());       
            case 'MM':  return zeroize(d.getMonth() + 1);     
            case 'yyyy':    return d.getFullYear();     
            case 'hh':  return zeroize(d.getHours() % 12 || 12);     
            case 'HH':  return zeroize(d.getHours());      
            case 'mm':  return zeroize(d.getMinutes());         
            case 'ss':  return zeroize(d.getSeconds());          
            default:    return $0.substr(1, $0.length - 2);     
        }     
    });
};
 
 
//-->
</SCRIPT>
	</c:when>
    <c:when test="${ifmis_ui_page_type eq 'editpage'}">
<SCRIPT LANGUAGE="JavaScript">
<!--
var actiontype = "<c:out value='${actiontype}'/>";
	//返回列表
function backIndex(){
	document.detailform.action= 'index.do?random='+Math.random()+'&'+urlmenuparameter;
	document.detailform.submit();
}
/**
*   提交保存
*    url 提交的action 地址
*    pars 提交的数据
*    backindex 是否返回到列表
*/
function save(url,pars,backindex){
	if(pars!=null){
		pars = pars.replace(/%/g,"％");
	}
	showdiv();
	var myAjax = new Ajax.Request(
			url,
			{method: 'post',
			 parameters: pars,
			 onComplete: function(request){
					closediv();
					if(request.responseText!=null&&request.responseText!=""){
						var retobj = request.responseText.evalJSON(true);	
						if(retobj.statuCode!=null && retobj.statuCode==100 && retobj.warnmsg !=null && retobj.warnmsg!=""){
							enabledFunctionButton();
							alert(retobj.warnmsg);
							return ;
						}
					}
					if(backindex){
						backIndex();
					}else{
						redrawEdit();
					}
			 },
			 onFailure : function(resp) {
					closediv();
				    enabledFunctionButton();
					alert("保存失败！");
					return;
				}
			}
	)

}
//重设绘制编辑区
function redrawEdit(){
	try{
		enabledFunctionButton();
		clearMainEditFormInput();
		clearFormInput(false);
		enableMainEditFormInput();
		if(typeof(tdetail) != "undefined"){
			disEnableEditFormInput();
			tdetail.data = new Array();
			tdetail.draw();
			detailObj = null;
			detailamtDefault = null;
		}
		if(mainVouch != null){
			mainVouch.checked = false;
			mainVouch = new Object();
		}
		if(typeof(tmain) != "undefined"){
			tmain.draw();
		}
		try{
			if($("detailform").mainamt)$("detailform").mainamt.value = 0;
		}catch(err){}
		alert("保存成功！");
	}catch(err){
		alert("错误:"+err.description);
	}


}

//返回
var ismodifydata = true;
function backCheckSave(){
	if(tdetail != null && tdetail.data != null && tdetail.data.length >0&&ismodifydata){
		if(confirm("数据未保存，是否保存数据？")){
		     saveQuit()	    
		} else {
			backIndex();
		}
	} else {
		backIndex();
	}

}
//此处声明：
function maindatasynchfromtable(rowObj){};
function mainsynch2fromtable(mainVouch){};
function maindatasynchtoObj(detailrow){};
function enableMainEditFormInput(){};
function enableEditFormInput(){};
function disEnableMainEditFormInput(){};
function disEnableEditFormInput(){};
function addMainEditFormInput(){return true};
function addEditFormInput(){return true};
function mainclick(row){};
function detailclick(row){};
function clearEditFormInput(){};
function clearMainEditFormInput(){};
function setMainDefaultValue(){};
// 清除FORM中的可录入数据
function clearFormInput(isOnlyAmt){
	/*
	var inputelements = $("detailform").elements;
	for(var i=0;i<inputelements.length;i++){
		var obj = inputelements[i];
		if(!isOnlyAmt && obj.tagName == "INPUT" && obj.type=="text" ){
			obj.value = ""
			obj.valueid = null;
		}
		if(isOnlyAmt && obj.name == "amt"){
			obj.value = ""
			obj.valueid = null;
		}
	}
	inputelements.selectedRow = null;
	*/
	clearEditFormInput();
	// 清除FORM对应数据
	detailObj = null;
	detailamtDefault = null;
}
//-->
</SCRIPT>

    </c:when>
    <c:otherwise>

    </c:otherwise>   
</c:choose>
<%if(request.getAttribute("modulescript")!=null){%>
<tiles:insert page='<%=(String)request.getAttribute("modulescript")%>' flush="true"/>
<%}%>