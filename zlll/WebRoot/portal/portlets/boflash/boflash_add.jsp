<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<script type="text/javascript" src="<%=request.getContextPath()%>/ckeditor/ckeditor.js"></script>
<script type="text/javascript">
<!--
function init(){
	$('topnum').value = 0;
}
var isboosave=false;
function saveQuit(){
		var bocomponent = document.detailform.bocomponent.value.trim();
		if(bocomponent == null ||bocomponent ==""){
			alert("������������ƣ�");
			document.detailform.bocomponent.value="";
			document.detailform.bocomponent.focus();
			return false;
		}
		
			if(!(document.getElementById('file').value==null||document.getElementById('file').value.length==0)){
			//������и���
				if(isboosave){
						alert("�����ϴ������Ժ�...");
						return ;
					}
					savefile();//�ϴ�����
					isNotUpload();
				}else{
					submitForm();
				}
		//document.detailform.action = "/portal/boflash/save.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>";
		//document.detailform.submit();
}

function savefile(){
	isboosave=true;
	var div=document.getElementById("detailform").parentNode;
	var p=document.getElementById('file').parentNode;
	var fileDiv=document.createElement("div");
	fileDiv.style.visibility='hidden';
	fileDiv.id='fileDiv';	
	var innerHTMLStr="<form action ='<%=request.getContextPath()%>/portal/boflash/uploadFile.do' method='post' ENCTYPE='multipart/form-data' id='fileUploadForm' target='fileUploadIfr'>";
	innerHTMLStr=innerHTMLStr+"</form>";
	innerHTMLStr=innerHTMLStr+"<iframe name='fileUploadIfr' id='fileUploadIfr' src='no'></iframe>";
	fileDiv.innerHTML=innerHTMLStr;
	div.appendChild(fileDiv);
	var form = document.getElementById('fileUploadForm');
	
	form.appendChild(document.getElementById('file'));
	
	form.submit();
	p.appendChild(document.getElementById('file'));
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
		div.parentNode.removeChild(div);
		return true;
	}
}

function submitForm(){
		//removeUploadFile();//ɾ���ϴ�file��ǩ
		//subeditData();
		//$("detailform").maindata.value  = Object.toJSON(editformobj);
		$("detailform").action="<%=request.getContextPath()%>/portal/boflash/save.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>";
		document.detailform.submit();
		//document.getElementById("saveAndOut").disabled = true;
}

function removeUploadFile(){
	var p=document.getElementById('file').parentNode;
	p.removeChild(document.getElementById('file'));
}

















function backCheckSave(){
		window.location.href("<%=request.getContextPath()%>/portal/boflash/index.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>");
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
						������
					</div>
				</li>
			</ul>
		</div>
		<!-- �뱣����div��a��ǩ  -->
		<div id="edit_table">
		<table id ="edittable" width="100%" border="2" cellspacing="0" style= "TABLE-LAYOUT:fixed" cellpadding="0"> 
      <tr> 
 
      <th class = 'thwidth'><div align=left>�������<span>*</span></div></th>
      <td nowrap=nowrap  colspan="1"  align="left"><input id="bocomponent" name="bocomponent" type=text class="text_popmin" title=""   />

</td> 
      <th class = 'thwidth'><div align=left>flash�ļ�<span>*</span></div></th>
      <td nowrap=nowrap colspan="1" align="left"><input type="file" name='file' id="file"/>
</td> 
     </tr> 
  </table> 
		</div>
	<div id="confirm_exit_btn"> 
		<input type="button" id="saveAndOut" name="save"  value="���沢�˳�" onclick="javascript:saveQuit()" class="button_style">
		<input type="button" name="cancel"  value="����" onclick="backCheckSave()" class="button_style">	
		</div>
	</form>
</div>
</body>