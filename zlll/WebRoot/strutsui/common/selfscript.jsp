<%@ page language="java" contentType="text/html; charset=GBK"
	pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="http://struts.apache.org/tags-tiles" prefix="tiles"%>
<%
       String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
%>
<SCRIPT LANGUAGE="JavaScript" type="text/javascript" src="<%=basePath%>/strutsui/js/columndefine.js"></SCRIPT>
<SCRIPT LANGUAGE="JavaScript" type="text/javascript" src="<%=basePath%>/strutsui/js/div.js"></SCRIPT>
<SCRIPT LANGUAGE="JavaScript">
<!--
	var urlmenuparameter = "mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>&vchtypeid=<c:out value="${vchtypeid}"/>&<c:out value="${DEFAULTURLPARAMETER}" escapexml="false"/>";
	//��ʾ�����Ĳ�
	if(typeof(showdiv)=="undefined")showdiv = function (){};
	//���ش����Ĳ�
	if(typeof(closediv)=="undefined")closediv = function (){};
//-->
</SCRIPT>
<c:choose>
    <c:when test="${ifmis_ui_page_type eq 'indexpage'}">
<!--�б�ҳ���ʹ����������-->
<SCRIPT LANGUAGE="JavaScript">
<!--
var userid = "<%=gov.mof.fasp.sec.util.SecureUtil.getCurrentUser().getUserid()%>";
var rptid = "<c:out value='${rptid}'/>";
var isprintwf = "<c:out value='${isprintwf}'/>";
var isauditall = "<c:out value='${isauditall}'/>";

//�����б�
function backIndex(){
	document.mainListForm.action= 'index.do?random='+Math.random()+'&'+urlmenuparameter;
	document.mainListForm.submit();
}

//ɾ������
function deleteData(){
     if(hasChecked()){
		if(confirm('ȷ��Ҫɾ����ѡ������?')) {
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
							alert("ɾ��ʧ�ܣ�");
							return;
						}
					}
			)
		}   
     }else{
        alert("��ѡ��Ҫɾ���ĵ��ݣ�");
     }
}
//��������
function doadd(){
	window.location.href='edit.do?actiontype=add&'+urlmenuparameter;
}
//�޸Ĳ���
function modify(url,actionname,ismutilsel){
	 if(ismutilsel==undefined)ismutilsel=0;
	 if(url==undefined)url="edit.do"
	 if(actionname==undefined){
		actionname = event.srcElement.tagName=="A"?event.srcElement.parentElement.title:event.srcElement.title;
	 }
	 if(actionname==""||actionname==null)actionname="�޸�";
     if(hasChecked()){
       if(tmain.getSelectedRow().length>1&&ismutilsel==0){
          alert("��ѡ�������ݽ���"+actionname+"��");
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
       alert("��ѡ��Ҫ"+actionname+"�ĵ��ݣ�");
     }
}
function gotoadd(){
	 window.location.href='edit.do?querydata=0&actiontype=add&'+urlmenuparameter;
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
		if(e.type == "radio"&&e.checked&&e.name!="multiselect_0"){
		    flag=true;
			break;
		}
	 }
	 return flag;
}

/**
 *  ��AJAX��������	
 * URL ��action http URL
 * action :������
 * isconfirm :�Ƿ�ȷ��
 * backindex : �Ƿ񷵻ص�ǰһҳ���ˢ��
 * nocheck :����ѡ�����ݵķ���
*/
function sendurl(url,actionname,isconfirm,backindex,nocheck){
	if(backindex==undefined)
		backindex = false;
	if(nocheck==undefined)
		nocheck = false;
	if(hasChecked()||nocheck){
		if(!isconfirm||confirm('ȷ��Ҫ['+actionname+']��ѡ������?')) {
			var selectRow=new Array();
			
			var len=tmain.getSelectedRow().length;
			if(len==0&&!nocheck){
				alert("û��Ҫ["+actionname+"]�ĵ��ݣ����飡");
				return;
			}
			for(var i=0;i<len;i++){
				selectRow[i]=tmain.getSelectedRow()[i].billid;
			}
			var auditOpinion = "";
			if(len>0){
				auditOpinion = tmain.getSelectedRow()[0].auditOpinion;
			}
	        var selectedbillids = 'selectedbillids=' + selectRow+'&auditOpinion='+auditOpinion+'&'+urlmenuparameter;
	        var pars = selectedbillids;
	        showdiv();
		   	var myAjax = new Ajax.Request(url,
						   	{
							   	 method: 'post',
							   	 parameters: pars,
							   	 onComplete : function (resp){	//��ˢ��ҳ���������µ���״̬
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
								 	alert("����ʧ�ܣ�");
								 }
							} 
		   				);
	   }
    }else{
        alert("��ѡ��Ҫ"+actionname+"�ĵ��ݣ�");
     }
}
/**
 *	ִ���깤��������������������ˢ��ҳ�����DATATABLE�Ļص��������ݵķ���
 *  retobj ���� {statuCode:[100-����|200-��ȷ],
				 warnmsg:������Ϣ,
				 vous<���µ��е��������>:[{billid:,wfstatus_code:,wfstatus_name:,wfstatus_code:,userid:,lastupdatetime:,receipttime:},{}...],
				 datas<�е�����>:[{},{}....]}
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
						selectrows[j].auditOpinion = "";
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
//����
function sendAuditdata (){
	var url ="doaction.do?method=sendAudit";
	if(isauditall=="true")tmain.selectedallrows(true);//�����һ��������У���ȫѡ����
	sendurl(url,"����",true);
	
}

//ȡ������
function cancelSendAuditdata (){
	var url ="doaction.do?method=cancelSendAudit";
	if(isauditall=="true")tmain.selectedallrows(true);//�����һ��������У���ȫѡ����
	sendurl(url,"ȡ������",true);
}

//���
function audit(){
	var url ="doaction.do?method=audit";
	if(isauditall=="true")tmain.selectedallrows(true);//�����һ��������У���ȫѡ����
	sendurl(url,"���",true);
}

//ȡ�����
function cancelAudit(){
	var url ="doaction.do?method=cancelAudit";
	if(isauditall=="true")tmain.selectedallrows(true);//�����һ��������У���ȫѡ����
	sendurl(url,"ȡ�����",true);
}
//��˲�ͨ��
function passAudit(){
	var url ="doaction.do?method=passAudit";
	if(isauditall=="true")tmain.selectedallrows(true);//�����һ��������У���ȫѡ����
	sendurl(url,"��˲�ͨ��",true);
}

//�˻�
function back(){
	var url ="doaction.do?method=back";
	if(isauditall=="true")tmain.selectedallrows(true);//�����һ��������У���ȫѡ����
	sendurl(url,"�˻�",true);
}

//ȡ���˻�
function cancelBack(){
	var url ="doaction.do?method=cancelBack";
	if(isauditall=="true")tmain.selectedallrows(true);//�����һ��������У���ȫѡ����
	sendurl(url,"ȡ���˻�",true);
}
//ת��
function transfer(){
	var url ="doaction.do?method=transfer";
	sendurl(url,"ת��",true);
}

//ȡ��ת��
function cancelTransfer(){
	var url ="doaction.do?method=cancelTransfer";
	sendurl(url,"ȡ��ת��",true);
}

//�ص��Ǽ�
function checkin(){
	var url ="doaction.do?method=checkin";
	sendurl(url,"�ص��Ǽ�",true);
}
//ɾ����ȡ������
function dodel(){
	var url ="doaction.do?method=delete";
	sendurl(url,"ɾ��",true);
}

//ȷ��
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
//����֪ͨ
function saveDetail (){
	var url ="doaction.do?method=save";
	sendurl(url,"����",true,true);
}
function setLogDebugClasses(){
	var classnames = "gov.mof.fasp.ifmis.struts,gov.mof.fasp.ifmis.salary";
	classnames = window.prompt("��¼��Ҫ����ϵͳ���Ե��࣬��Ϊ������",classnames);
	var url ="/common/doaction.do?method=setLogDebugClassesAction&classnames="+classnames;
	sendurl(url,"����ϵͳ���Ե���",false,false,true);
}

//����Ϊ��ӡ��������
//TODO���뷨����
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

// ��ӡƾ֤  rptid ��ƾ֤��ӡģ�壬rows�Ǵ�ӡ������  ģ���ж����������ͨ������ƥ���Զ���rows�л�ȡ
// rows ������һ�����ݶ���
function printVoucher(rptid, rows){
	if($('WebPrinter')==null){
		var divobj = document.createElement("DIV");
		document.body.appendChild(divobj);
		divobj.innerHTML = '<object classid="clsid:0B7A9F67-EB6F-42B4-847B-E4A451E276F6" id=WebPrinter ></object>';
	}
    new Ajax.Request(
                    ROOT_PATH+"/common/printvoucher.do",
                    {method: 'post', parameters: "printid="+rptid+"&json="+Object.toJSON(rows), onComplete: printReport,
							onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
							 	alert("��ӡʧ�ܣ�");
							 }}
                    );
}

function printReport(request){
	try{
		eval("var gridData = "+request.responseText+"");
		//debugger;
		var printer = loadJQReportOcx();
		if(gridData.success){
			printer.PreviewEx(gridData.rpt,gridData.tmp);
		}
		else{
			alert(gridData.msg);
		}
	}
	catch(ex){
		alert(ex)
	}
}


var ds = new Object();
var isreprint = false;

//��ӡ
function sendprint(){
	if(rptid != undefined && rptid !='null' && isprintwf&&!isreprint){
		var url ="doaction.do?method=print";
		sendurl(url,"��ӡ",true);
	}else{
		isreprint = false;
	}
}
/**
*��ӡ������Ӵ�ӡ���� 
*/
function print() {
    if(tmain == null || tmain.data == null) return;
    var selectrows = tmain.getSelectedRow();
	for(i = 0;i< selectrows.length ;i++){
		var rowObj = selectrows[i];		
		if(rowObj.wfstatus==30){
			rowObj.checked = false;
		}		
	}
	tmain.draw();
	isreprint = false;
	doprint();	

}

function doprint() {

	if(tmain == null || tmain.data == null) return;
	var selectrows = tmain.getSelectedRow();
	if(selectrows.length==0){
	  alert("��ѡ��Ҫ��ӡ�ĵ���");
	  return false;
	}
	
	if(selectrows.length>1){
		alert("ֻ�ܴ�ӡ��������");
	 	return false;
	}
    sendprint();
	if (rptid == undefined || rptid =='null' || rptid.length <1) {
    	alert("û�з��ϴ�ӡ������ģ�壬����ϵ����Ա��") ;
    	return "" ;
    }
	ds.DS1 = selectrows;
	var date = new Date();
	var datastr = date.format("yyyy-MM-dd");
	datastr = datastr.replace(/-/g,"");
    ds.DS3 = [{"acctdate": ""+datastr}];	

	if(mainsub != undefined&&mainsub){
		var billids = tmain.getSelectedRow()[0].billid;
		var url = '../manage/getDetail.do?'+urlmenuparameter;
		var pars = 'billid='+billids;
		var myAjax = new Ajax.Request(
						url,
						{method: 'post', 
						parameters: pars, 
						onComplete: getAllDetails,
						onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
								alert("��ӡʧ�ܣ�");
							 }}
						);
	}else{
		printVoucher(rptid,ds);
	}
}

//ȡ����ӡ
function cancelPrint(){
	var url ="doaction.do?method=cancelPrint";
	sendurl(url,"ȡ����ӡ",true);
}

// ��������billids ��������ӵ��ļ�¼  �ڴ˻ص������д����ӡ 
function getAllDetails(request){
    eval("var allDetailDatas = "+request.responseText);
    ds.DS2 = allDetailDatas;  
    printVoucher(rptid,ds);
}

// ���´�ӡ
//ֻ�ܶ��Ѿ���ӡ�ĵ��ݽ������´�ӡ
//��ʱ�Ĵ�ӡ���߹�������
function reprint() {
    if(tmain == null || tmain.data == null) return;
    var selectrows = tmain.getSelectedRow();
	for(i = 0;i< selectrows.length ;i++){
		var rowObj = selectrows[i];		
		if(rowObj.wfstatus!=30){
			rowObj.checked = false;
		}
				
	}
	tmain.draw();
	isreprint = true;
	doprint();	
}
//-->
</SCRIPT>
	</c:when>
    <c:when test="${ifmis_ui_page_type eq 'editpage'}">
<SCRIPT LANGUAGE="JavaScript">
<!--
var actiontype = "<c:out value='${actiontype}'/>";
	//�����б�
function backIndex(){
	document.detailform.action= 'index.do?random='+Math.random()+'&'+urlmenuparameter;
	document.detailform.submit();
}
/**
*   �ύ����
*    url �ύ��action ��ַ
*    pars �ύ������
*    backindex �Ƿ񷵻ص��б�
*/
function save(url,pars,backindex){
	if(pars!=null){
		pars = pars.replace(/%/g,"��");
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
					alert("����ʧ�ܣ�");
					return;
				}
			}
	)

}
//������Ʊ༭��
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
		ismodifydata = false;
		alert("����ɹ���");
	}catch(err){
		alert("����:"+err.description);
	}


}

//����
var ismodifydata = true;
function backCheckSave(){
	if(tdetail != null && tdetail.data != null && tdetail.data.length >0&&ismodifydata){
		if(confirm("����δ���棬�Ƿ񱣴����ݣ�")){
		     saveQuit()	    
		} else {
			backIndex();
		}
	} else {
		backIndex();
	}

}
//�˴�������
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
// ���FORM�еĿ�¼������
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
	// ���FORM��Ӧ����
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

<SCRIPT FOR ="full_screen_text" EVENT = oncontextmenu>
	window.event.srcElement.parentElement.firstChild.attachEvent('ondblclick', setLogDebugClasses);
</SCRIPT>
