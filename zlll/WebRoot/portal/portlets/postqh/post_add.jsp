<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<script type="text/javascript" src="<%=request.getContextPath()%>/ckeditor/ckeditor.js"></script>
<script type="text/javascript">
codeShowFlag =null;
<!--
function init(){
	$('topnum').value = 0;
	$('filedisplay').value = 0;
	$('postorder').value = 0;
}
var isboosave=false;
function removeUploadFile(){
	var p=document.getElementById('file').parentNode;
	p.removeChild(document.getElementById('file'));
}
function savefile(){
	isboosave=true;
	var div=document.getElementById("detailform").parentNode;
	var p=document.getElementById('file').parentNode;
	var fileDiv=document.createElement("div");
	fileDiv.style.visibility='hidden';
	fileDiv.id='fileDiv';	
	var innerHTMLStr="<form action ='<%=request.getContextPath()%>/common/post/uploadFile.do' method='post' ENCTYPE='multipart/form-data' id='fileUploadForm' target='fileUploadIfr'>";
	innerHTMLStr=innerHTMLStr+"</form>";
	innerHTMLStr=innerHTMLStr+"<iframe name='fileUploadIfr' id='fileUploadIfr' src='no'></iframe>";
	fileDiv.innerHTML=innerHTMLStr;
	div.appendChild(fileDiv);
	var form = document.getElementById('fileUploadForm');
	
	form.appendChild(document.getElementById('file'));
	
	form.submit();
	p.appendChild(document.getElementById('file'));
}
function submitForm(){
		//removeUploadFile();//ɾ���ϴ�file��ǩ
		subeditData();
		$("detailform").maindata.value  = Object.toJSON(editformobj);
		$("detailform").action="<%=request.getContextPath()%>/common/postqh/save.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>";
		$("detailform").submit();
		document.getElementById("saveAndOut").disabled = true;
}
function isNotUpload(){
	var locas=window.frames('fileUploadIfr').location.toString().split('/');
	if(locas[locas.length-1]=='no'){
		window.setTimeout("isNotUpload()",100);
	}else if(locas[locas.length-1]=='true'){
		alert('�����ϴ��ɹ�!');
		submitForm();
	}else {
		alert("�ϴ�ʧ�ܣ�");
		isboosave=false;
		var div=document.getElementById('fileDiv');
		div.parentNode .removeChild(div);
		return true;
	}
}
function saveQuit(){
	//if($('postorder').value.trim().length==0||isNaN($('postorder').value.trim())||parseInt($('postorder').value.trim())<0||parseInt($('postorder').value.trim().length)>=5){
		//alert('���������������ڻ������������');
		//return;
	//}
	
	if(addEditFormInput()){
		submitForm();
	
		//if(!(document.getElementById('file').value==null||document.getElementById('file').value.length==0)){
		//������и���
			//if(isboosave){
					//alert("�����ϴ������Ժ�...");
					//return ;
				//}
				//savefile();//�ϴ�����
				//isNotUpload();
			//}else{
				//submitForm();
			//}
	}
}
function backCheckSave(){
		window.location.href("<%=request.getContextPath()%>/common/postqh/index.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>");
}


var checkSubmitFlg = false;
    function checkSubmit() {
      if (checkSubmitFlg == true) {
         return false;
      }
      checkSubmitFlg = true;
      return true;
    }
   
   document.ondblclick = function docondblclick() {
    window.event.returnValue = false;
   }
   document.onclick = function doconclick() {
       if (checkSubmitFlg) {
         window.event.returnValue = false;
       }
   } 


function selectMutlElememt(mainmenu,submenu,vchtypecode,vchfieldcode,backinput,checkflag,elementfilter,organtype){
    //wy add 20090923
    /** ganhua 20080304 �ڴ�ѡ�񴰿�ǰ�ص�һ��������ĳЩ����
	  * �磺���ù�����������������������ؼ��Ƿ�ѡ��ֵ
	  * 
	**/
	codeShowFlag=1;
	var selvalue = backinput.valuecode != undefined ? backinput.valuecode : backinput.value;
	window.selvalue = selvalue;
	window.checkflag = checkflag;
	var func = "callBeforeOpenMultElementTree_"+vchfieldcode+"(window)";;
	var notReturn = true;
    try{
        notReturn = eval(func);
	}catch(e){
		//���ɹ�,������,��û��ʵ�ָ÷���
	}
	if(notReturn == false)
	{
		return;
	}
	var elementfilter = "";
	if(window.elementfilter){
		elementfilter = window.elementfilter;
	}

	var refererurl = ""+window.location.href;
	
	var url = ROOT_PATH+"/common/tree/openTreeUser.do?organtype="+organtype+"&mainmenu="+mainmenu+"&submenu="+submenu+"&vchtypecode="+vchtypecode
		+"&vchfieldcode="+vchfieldcode+"&elementfilter="+elementfilter
		+"&Referer="+refererurl.substring(0,refererurl.indexOf("?"));
	var result = window.showModalDialog(url,window,"dialogHeight:500px;dialogWidth: 325px;resizable: No; status: No; help:No;");
	//var result = window.open(url, 'newWindow','dialogWidth=400px,dialogHeight=450px,status=yes,toolbar=no,menubar=no,directories=no,resizable=no,Scrollbars=no');
    //�������Ĺ������� ganhua 20090509
	if(window.elementfilter);
	{
		window.elementfilter = null;
	}
	if(result != null){
	    if(typeof(result)!="string"){
			if(backinput == null){
				backinput = $(vchfieldcode);
			}
			backinput.value = result.value;
			backinput.valueid = result.id;
			backinput.isleaf= result.isleaf;
			backinput.valuecode = result.valuecode;
			document.getElementById("hidden_"+backinput.id).value= result.valuecode;
		}
	}
	else
	{
	    if(backinput != null){
	        backinput.value = "";
			backinput.valueid = null;
			backinput.valuecode = "";
			document.getElementById("hidden_"+backinput.id).value= "";
	    } 
	 }
	 codeShowFlag=null;
}
//-->
</script>
<body onload='init()'> 
<div>
    <form name="detailform" id="detailform" action="#" method="post" >
    <input type="hidden" id="maindata" name="maindata" value=""/>
    <input type="hidden" id="optype" name="optype" value="add"/>
		<div id="form_table_title">
			<ul>
				<li class="top">
					<div>
						��������
					</div>
				</li>
			</ul>
		</div>
		<!-- �뱣����div��a��ǩ  -->
		<div id="edit_table">
		<ui:editform formid="detailform"  pagetype = "add" parsetype="link"/>
		<table id ="edittable" width="100%" border="2" cellspacing="0" style= "TABLE-LAYOUT:fixed" cellpadding="0"> 
		 <tr> 
	 <c:if test="${isauthority=='true'}">
   		  <th class = 'thwidth'><div align=left>Ԥ�㵥λ</div></th>
		<td nowrap=nowrap  colspan="1"  align="left"><input name="hidden_bdgagency" id="hidden_bdgagency" type="hidden">
		<input id="bdgagency" name="bdgagency" value="" valueid="" type=text  class=text_pop style="width: 100px" readonly onclick='selectMutlElememt(46000000,46000011,"5001","bdgagency",this,false,"","bdgagency");null' />
		<button onclick='selectMutlElememt(46000000,46000011,"5001","bdgagency",this.form.bdgagency,false,"","bdgagency");null'></button>
		<img align=middle type ='image' value='���' src='/images/done_btn/clear_qry2.gif' onclick='clearInput(document.getElementById("bdgagency"));'>
		</td> 
		<th class = 'thwidth'><div align=left>ָ�������</div></th>
      <td nowrap=nowrap colspan="1" align="left">
		<input name="hidden_bdgmanagedivision" id="hidden_bdgmanagedivision" type="hidden">
		<input id="bdgmanagedivision" name="bdgmanagedivision" value="" valueid="" type=text  class=text_pop style="width: 100px" readonly onclick='selectMutlElememt(46000000,46000011,"5001","bdgmanagedivision",this,false,"","bdgmanagedivision");null' />
		<button onclick='selectMutlElememt(46000000,46000011,"5001","bdgmanagedivision",this.form.bdgmanagedivision,false,"","bdgmanagedivision");null'></button>
		<img align=middle type ='image' value='���' src='/images/done_btn/clear_qry2.gif' onclick='clearInput(document.getElementById("bdgmanagedivision"));'>
		</td> 
      <th class = 'thwidth'><div align=left>��������</div></th>
      <td nowrap=nowrap colspan="1"  align="left">
		<input name="hidden_agentbank" id="hidden_agentbank" type="hidden">
		<input id="agentbank" name="agentbank" value="" valueid="" type=text  class=text_pop style="width: 100px" readonly onclick='selectMutlElememt(46000000,46000011,"5001","agentbank",this,false,"","agentbank");null' />
		<button onclick='selectMutlElememt(46000000,46000011,"5001","agentbank",this.form.agentbank,false,"","agentbank");null'></button>
		<img align=middle type ='image' value='���' src='/images/done_btn/clear_qry2.gif' onclick='clearInput(document.getElementById("agentbank"));'>
		 </td> </tr> 
     <tr> 
      <th class = 'thwidth'><div align="left">��������</div></th>
      <td nowrap=nowrap colspan="1"  align="left">
		<input name="hidden_clearbank" id="hidden_clearbank" type="hidden">
		<input id="clearbank" name="clearbank" value="" valueid="" type=text  class=text_pop style="width: 100px" readonly onclick='selectMutlElememt(46000000,46000011,"5001","clearbank",this,false,"","clearbank");null' />
		<button onclick='selectMutlElememt(46000000,46000011,"5001","clearbank",this.form.clearbank,false,"","clearbank");null'></button>
		<img align=middle type ='image' value='���' src='/images/done_btn/clear_qry2.gif' onclick='clearInput(document.getElementById("clearbank"));'>
		 <th class = 'thwidth'><div align="left">�鼯����</div></th>
      <td nowrap=nowrap colspan="1"  align="left">
		<input name="hidden_gatherbank" id="hidden_gatherbank" type="hidden">
		<input id="gatherbank" name="gatherbank" value="" valueid="" type=text  class=text_pop style="width: 100px" readonly onclick='selectMutlElememt(46000000,46000011,"5001","gatherbank",this,false,"","gatherbank");null' />
		<button onclick='selectMutlElememt(46000000,46000011,"5001","gatherbank",this.form.gatherbank,false,"","gatherbank");null'></button>
		<img align=middle type ='image' value='���' src='/images/done_btn/clear_qry2.gif' onclick='clearInput(document.getElementById("gatherbank"));'>
		</td>
		 <th class = 'thwidth'><div align="left">������</div></th>
      <td nowrap=nowrap colspan="1"  align="left">
		<p ><input type="file" name='file' id="file"/></p>
		</td></c:if>
    </tr> 
  </table> 
		<br/>
		<p>
		<label for="editor2">�������ݣ�</label><br/>
		<textarea cols="80" id="editor2" name="editor2" rows="10">
		
		</textarea>
		<script type="text/javascript">
			CKEDITOR.replace( 'editor2' );
		</script>
	</p>
		</div>
	<div id="confirm_exit_btn"> 
		<input type="button" id="saveAndOut" name="save"  value="���沢�˳�" onclick="saveQuit()" class="button_style">
		<input type="button" name="cancel"  value="����" onclick="backCheckSave()" class="button_style">	
		</div>
	</form>
</div>
</body>