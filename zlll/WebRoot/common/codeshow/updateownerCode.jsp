<%@ page contentType="text/html; charset=GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%
	response.setHeader("Cache-Control", "no-cache");
	response.setHeader("Pragma", "no-cache");
	response.setDateHeader("Expires", 0);

	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
%>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
<link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=request.getContextPath()%>/style/stylefontS.css" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_LOGO%>_logo.css"/>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/prototype.js"></script>
<script type="text/javascript" src="../../js/choose.js"></script>
<script type="text/javascript" src="../../js/changescroll.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/datatable.js"></script>
<TITLE>������Ҫ��--�޸�</TITLE>
<style>
<!--
 select{
 width:110px;
 }
 textarea {
	width:100%;
}
-->
</style>
<script type="text/javascript">
var ROOT_PATH = "<%=basePath%>";
function updateback(){ 
      var checkmenuid = document.getElementById("checkmenuid").value;
      window.location.href="/common/codeShowManage/addQueryList.do?checkmenuid="+checkmenuid;
}

//ajax��֤
function savetest(){
      var checkmenuid = document.getElementById("checkmenuid").value;
      var colCodeold = document.fft.colCodeold.value;
      var colCode = document.getElementById("colCode").value;
      var result = "checkmenuid="+checkmenuid+'&colCodeold='+colCodeold+"&colCode="+colCode;
      var url = "/common/codeShowManage/updateajax.do?";
      var myAjax = new Ajax.Request(url,
					   	{
						   	 method: 'post',
						   	 parameters: result,
						   	 onComplete : showResponse
						} 
	   				);   

}
//��֤����Ϊ��
function showResponse(tr){
      var strs = tr.responseText;
       var checkmenuid = document.getElementById("checkmenuid").value;
      var colCodeold = document.fft.colCodeold.value;
      if(strs == "false" && document.getElementById("colCode").value !=colCodeold){
           alert("�������Ҫ�ش����Ѿ�����");
           return;
      }
      var colCode = document.fft.colCode.value;
      var colName = document.fft.colName.value;
      if(colCode==""){
        alert("Ҫ�ر��벻��Ϊ��,����д��");
        return false;
      }
      if(colName ==""){
         alert("Ҫ���������Ʋ���Ϊ��,����д��");
         return false;
      }
     fft.action="/common/codeShowManage/updateOwnerCodeDone.do?colCode="+colCode+'&colName='+colName+"&colCodeold="+colCodeold+"&checkmenuid="+checkmenuid;
     fft.submit();
    }
</script>
<body class=pop_body>
	<div id="popPage1">
		<div id="shenhe_title">
			<div id="shenhe_title_middle"></div>
		</div>


		<div id="form_table_title_edit">
			<ul>
				<li class="top">
					<div>
						������Ҫ���޸�
					</div>
				</li>
			</ul>
		</div>
		<form id="editformlist" name="fft"
			action="/system/ui/updateshowsetpageedit.do" method="post">
			<input type="hidden" id="colCodeold"
				value="<c:out value='${ownerinfo.CODE}'/>" />
			<input type="hidden" id="checkmenuid"
				value="<c:out value='${ownerinfo.MAINMENU}'/>" />
			<div id="edit_table" style="width:99%;">
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tr>
			    <th width="139"><div align="left">Ҫ�ر���</div></th>
				<td><input type="text" id="colCode" name="colCode" value="<c:out value='${ownerinfo.CODE}'/>" size="20" style="width:60%;"  />    </td>
			    </tr>
				  <tr>
				    <th width="69"><div align="left">Ҫ������</div></th>
				    <td><input id="colName" type="text" name="colName" value="<c:out value='${ownerinfo.NAME}'/>" size="10" style="width:60%;"  /></td>
				  </tr>
				</table>
				<c:out value='${strs}' />
			</div>
			<div id="showhelp"></div>
			<div id="confirm_exit_btn">
				<INPUT type="button" name="buton" class="button_style" value="���沢����"
					onclick="savetest()" />
				<INPUT type="button" class="button_style" value="����"
					onclick="updateback()" />
			</div>
		</form>

</body>
