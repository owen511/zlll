<%@page language="java" contentType="text/html; charset=GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<script>
var mainindexurl =  "index.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>";
// ����������Ϣ�ı���
var mainVouch = new Object();

//��¼�û��Ƿ�����ȫ�ֱ���
var isModified=false;
var backindex = false;// ������Ƿ񷵻��б�ҳ

/**
*	�Ƚ������ж����Ƿ���ȣ������ж������Ƿ��޸ġ�����޸Ľ��޸ı�ʶ��Ϊ�� .modify = 'true';
*
**/
function compareRowObj(rowdata,oldrowdata){
	try{
		if(oldrowdata==null||rowdata==null){
			return false;
		}
		var oldrowdatastr=Object.toJSON(oldrowdata);
		var rowdatastr=Object.toJSON(rowdata);
		if(oldrowdatastr!=rowdatastr){
			for(var key in rowdata){
				if(oldrowdata[key]!=rowdata[key]){
					if(!isNaN(oldrowdata[key])&&!isNaN(rowdata[key])&&(parseFloat(oldrowdata[key])-parseFloat(rowdata[key]))==0){
						continue;
					}
					rowdata.modify = 'true';
					return true;
				}
			}
		}
	}catch(err){
		alert(err);
	}
	return false;
} 

function setMainVouchPK(mainVouch){
	if($("billid"))mainVouch.billid= $("billid").value;
}

//����
//ȡ��
function backCheckSave(){
	if(!ismodifydata){
		backIndex();
		return;
	}
	if(confirm("����δ���棬�Ƿ񱣴����ݣ�")){
		if(addEditFormInput() ){
			 saveQuit();
		}		    
	} else {
		backIndex();
	}
}
// ���FORM�еĿ�¼������
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
			//	alert(strcaption+"¼�����ݲ��ܳ���"+ilen+"λ��"); 
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
					�༭��
				</div>
			</li>
		</ul>
	</div>
	<div id="form_table" style="display:block;">
		<ui:editform formid="detailform" pagetype="mod" parsetype="link"/>
	</div>
	<div id="form_table_title">
		<ul><li class="top"><div>֤���ģ����Ϣ</div></li></ul>
	</div>
	<!--�뱣����div��a��ǩ -->
	<div id="containerline20">
		<div id='edit_table_tdetail' style='display:none;padding:0;margin:0;'></div>
		<ui:datatable id="tdetail" tabletype="DetailList" showcheckbox="true"  data="detailsjson"  columndefine="true" />
	</div>
	<div id="confirm_exit_btn">
		<c:choose>
		<c:when test="${actiontype eq 'add'}">
			<input name="goonbtn" type="button" value="���沢����" class="button_style" id="saveAndOn" onclick="saveContinue()"/>
			<input name="submitbtn" type="button" value="���沢�˳�" class="button_style" id="saveAndOut" onclick="saveQuit()"/>
		</c:when>   
		   <c:otherwise> 
			<input name="submitbtn" type="button" value="����" class="button_style" id="saveAndOut" onclick="saveQuit()"/>
		</c:otherwise>
	   </c:choose>
		<input name="mod3" type="button" value="����" class="button_style"
			onclick="backCheckSave()" />
		<input type="button" style="border:0; background:none; width:0;" />
	</div>
</form>
<SCRIPT LANGUAGE="JavaScript">
<!--
	    //ͬ��mainVouDTO�����༭��
	var mainJson = <%= request.getAttribute("mainJson")%>;

	mainVouch = mainJson[0];
	var d = new Date();
	var month = "0"+(d.getMonth() + 1);
		month = month.substr(month.length-2);
	var toDate = "0"+d.getDate();
		toDate = toDate.substr(toDate.length-2);
	mainVouch.begindate = d.getFullYear()+month+toDate;
	mainVouch.enddate = "20501231";
	datasynchfromtable(mainVouch);
	if("add" == "<%=request.getAttribute("actiontype")%>"){
		if(typeof(setDefaultValue)=='function'){
			setDefaultValue(mainVouch);
		}
	}

// ����
function savedata(){
	if(backindex==undefined)
		backindex = false;
	 if( addEditFormInput()){
		   setMainVouchPK(mainVouch)
           datasynchtoObj(mainVouch);
		   mainVouch.moudels = tdetail.getSelectedRow().billids;
    	   var url = 'save.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>';
		   var pars ='maindata='+Object.toJSON(mainVouch)+'&billid='+$("billid").value;
		   save(url,pars,backindex);  
	 }
}
// ����������ϸ��Ϣ���浽��̨�������ر�ҳ
function saveQuit(){
	backindex = true;
	savedata();
}
// �����˳����������б�ҳ
function saveContinue(){
	backindex = false;
	savedata();
	location = '/system/license/edit.do?actiontype=add&mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>';
}
//�ж������Ƿ��޸�
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