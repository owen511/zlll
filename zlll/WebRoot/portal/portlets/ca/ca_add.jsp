<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<script type="text/javascript" src="<%=request.getContextPath()%>/ckeditor/ckeditor.js"></script>
<script type="text/javascript">
<!--
function init(){
	$('topnum').value = 0;
}
function saveQuit(){
		var username = document.detailform.username.value.trim();
		var identification = document.detailform.identification.value.trim();
		if(username == null ||username ==""){
			alert("�������û�����");
			document.detailform.username.value="";
			document.detailform.username.focus();
			return false;
		}
		if(identification == null ||identification ==""){
			alert("���������֤�ţ�");
			document.detailform.identification.value="";
			document.detailform.identification.focus();
			return false;
		}
		if(identification.length !=18 & identification.length !=15){
			alert("���֤�Ų��Ϸ���");
			document.detailform.identification.value="";
			document.detailform.identification.focus();
			return false;
		}
		document.detailform.action = "/portal/ca/save.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>";
		document.detailform.submit();

}

function backCheckSave(){
		window.location.href("<%=request.getContextPath()%>/portal/ca/index.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>");
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
						���CA�û�
					</div>
				</li>
			</ul>
		</div>
		<!-- �뱣����div��a��ǩ  -->
		<div id="edit_table">
		<table id ="edittable" width="100%" border="2" cellspacing="0" style= "TABLE-LAYOUT:fixed" cellpadding="0"> 
      <tr> 
 
      <th class = 'thwidth'><div align=left>�û�����<span>*</span></div></th>
      <td nowrap=nowrap  colspan="1"  align="left"><input id="username" name="username" type=text class="text_popmin" title=""   />

</td> 
      <th class = 'thwidth'><div align=left>���֤��<span>*</span></div></th>
      <td nowrap=nowrap colspan="1" align="left"><input name=identification id=identification type="text"  maxlength="250"  class="textmin" title=""   />
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