<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<link rel="stylesheet" type="text/css" href="<%=path%>/style/dialog.css" />
<script type="text/javascript" src="<%=path%>/js/dialog.js"></script>
<SCRIPT LANGUAGE="JavaScript">
<!--
var mainsub = false;//��ע�б�ҳ���Ƿ����� true:�� false :��
var error="<%=(String)request.getAttribute("error")%>";
if(error.trim().length>0&&"null"!=error){
	alert(error);
}
//-->
</SCRIPT>
<ui:menufunction divid="query_t"></ui:menufunction>
<form id=queryform
	action="index.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>&<c:out value="${DEFAULTURLPARAMETER}"/>"
	method="post">
	<ui:queryform formid="queryform" />
</form>

<form name="mainListForm" id="mainListForm" action="#" method="post">
	<input name="selectedbillids" id="selectedbillids" type="hidden" value=""/>
	<input type ="hidden" name ="maindata" id ="maindata" />
	<div id="form_table_title">
		<ul>
			<li class="top"><div>������Ϣ</div></li>
			<li>
				<ui:row2column dataid="tmain" showdivname="edit_table"
					columnNum="4" drawDetail="false" tdetailName="tdetail"
					tdetailShowDivName="edit_table_tdetail"/>
			</li>
		</ul>
	</div>
	<!--�뱣����div��a��ǩ -->
	<div id="containerline5">
	<div id='edit_table' style='display:none;padding:0;margin:0;'></div>
		<ui:datatable id="tmain" tabletype="MainList" data="json" showcheckbox="true" columndefine="true" useThisHead="tempHeadHtml" createAmtColumn="true" sumColumnList='<%=(String)request.getAttribute("sumColumnList")%>'/>
	</div>
</form>

<div class="dialog_content" id="Dlg_OutProject" style="display:none">
      <table id="edit_table" width="90%" class="form" style="margin:auto">
		  <tr>
		    <th><span>*</span><label>���������ַ</label>:</th>
		    <td><input type="text" id="macaddress" value="" size="19"/>  <a href="javascript:macaddress.value='<%=gov.mof.fasp.ifmis.system.license.util.MacAddressUtil.getMacAddress()%>';void(0);">��ȡ����������ַ</a></td>  
		  </tr>
		  <tr>
		     <th><span>*</span><label>��������</label>:</th>
		     <td><input type="password" id="password" value="" size="20"/></td>
		  </tr>
		  <tr>
		     <th><label>�Ƿ���԰�</label>:</th>
		     <td><input type="checkbox" id="istest" value="1" size="20"/></td>
		  </tr>
		  <tr>
		     <td colspan="2">���������ַ��ȡ�÷�ʽ��
				<table border="1" cellspacing="0" width="100%" id="table1">
					<tr>
						<td width="50%">����ϵͳ</td>
						<td>ִ������</td>
					</tr>
					<tr>
						<td width="50%">window</td>
						<td>ipconfig /all</td>
					</tr>
					<tr>
						<td width="50%">Linux</td>
						<td>/sbin/ifconfig -a</td>
					</tr>
					<tr>
						<td width="50%">SunSolaris</td>
						<td>/usr/sbin/arp</td>
					</tr>
					<tr>
						<td width="50%">Macintosh</td>
						<td>ifconfig</td>
					</tr>
					<tr>
						<td width="50%">HPUX</td>
						<td>/usr/sbin/lanscan -a</td>
					</tr>
				</table>
			 </td>
		  </tr>
       </table>
 <div class="formbtns">
    <input id="outProject_itemid" type="hidden" />
    <button type="button" id="btn_OutProject">ȷ ��</button>
    <button type="button" onclick="closeDialog('OutProject')">ȡ ��</button>
  </div>
</div>
<SCRIPT LANGUAGE="JavaScript">
<!--

//�޸Ĳ���
function createcert(){
	 var ismutilsel=0;
	 var actionname="����֤��";
     if(hasChecked()){
       if(tmain.getSelectedRow().length>1&&ismutilsel==0){
          alert("��ѡ�������ݽ���"+actionname+"��");
       }else{
			inputDialog();
       }
     }else{
       alert("��ѡ��Ҫ"+actionname+"�����ݣ�");
     }
}

function inputDialog(){
  JQ("#btn_OutProject").unbind("click").bind("click",function(){
  	
  	var macaddress = JQ("#macaddress").val();
  	var password = JQ("#password").val();

	if(!macaddress.match("^([A-Z0-9\ ]{1,2})-([A-Z0-9\ ]{1,2})-([A-Z0-9\ ]{1,2})-([A-Z0-9\ ]{1,2})-([A-Z0-9\ ]{1,2})-([A-Z0-9\ ]{1,2})$")&&"ifmis license"!=macaddress){
        alert("�����ַ��ʽ����!�����ַ��ʽӦΪ������λ���ַ�(��д������),�м���\"-\"����,��:F0-F0-F0-F0-F0-F0");
        return ;
    }
  	if(password.trim().length<1){
  		alert("���벻��Ϊ��");
  		return ;
  	}
	var istest = JQ("#istest").val();
	var paramdata = "macaddress="+macaddress+"&password="+password+"&istest="+istest;

	var selectRow=new Array();
	var len=tmain.getSelectedRow().length;
	for(var i=0;i<len;i++){
		selectRow[i]=tmain.getSelectedRow()[i].billid;
	}
	document.getElementById("selectedbillids").value=selectRow;
	document.mainListForm.action='createcert.do?'+paramdata+'&'+urlmenuparameter;
	document.mainListForm.submit();

    closeDialog("OutProject");
    
  });
  showDialog("����֤��","Dlg_OutProject",{"width":400,"height":250,"center":true},true,"OutProject");
}


//-->
</SCRIPT>