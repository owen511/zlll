<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<script type="text/javascript" src="<%=request.getContextPath()%>/ckeditor/ckeditor.js"></script>
<%
	String username = (String)request.getAttribute("username");
	String identification = (String)request.getAttribute("identification");

 %>
<script type="text/javascript">
<!--
function init(){
	$('topnum').value = 0;
}
function saveQuit(){
		var username = document.detailform.username.value.trim();
		var identification = document.detailform.identification.value.trim();
		if(username == null ||username ==""){
			alert("请输入用户名！");
			document.detailform.username.value="";
			document.detailform.username.focus();
			return false;
		}
		if(identification == null ||identification ==""){
			alert("请输入用户KEY信息！");
			document.detailform.identification.value="";
			document.detailform.identification.focus();
			return false;
		}

		document.detailform.action = "/portal/glca/modsave.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>";
		document.detailform.submit();

}

function backCheckSave(){
		window.location.href("<%=request.getContextPath()%>/portal/glca/index.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>");
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
						添加CA用户
					</div>
				</li>
			</ul>
		</div>
		<!-- 请保留此div和a标签  -->
		<div id="edit_table">
		<table id ="edittable" width="100%" border="2" cellspacing="0" style= "TABLE-LAYOUT:fixed" cellpadding="0"> 
      <tr> 
 
      <th class = 'thwidth'><div align=left>用户CODE<span>*</span></div></th>
      <td nowrap=nowrap  colspan="1"  align="left">
      <input id="username" name="username" type="text" class="text_popmin" title="" value="<%=username %>"/>
      <input type="hidden" name="oldUserName" value="<%=username %>"/>
</td> 
      <th class = 'thwidth'><div align=left>用户KEY信息<span>*</span></div></th>
      <td nowrap=nowrap colspan="1" align="left">
      <input name="identification" id="identification" type="text"  maxlength="250"  class="textmin" title="" value= "<%=identification %>"  />
</td> 
     </tr> 
  </table> 
		</div>
	<div id="confirm_exit_btn"> 
		<input type="button" id="saveAndOut" name="save"  value="保存并退出" onclick="javascript:saveQuit()" class="button_style">
		<input type="button" name="cancel"  value="返回" onclick="backCheckSave()" class="button_style">	
		</div>
	</form>
</div>
</body>