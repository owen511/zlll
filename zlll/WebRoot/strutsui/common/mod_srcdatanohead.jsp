<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>
<%
       String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
%>
<SCRIPT LANGUAGE="JavaScript" type="text/javascript" src="<%=basePath%>/strutsui/js/editsrcmaindata.js"></SCRIPT>
<SCRIPT LANGUAGE="JavaScript">
<!--
var uieditmodel = "srcdatanohead";//��ע�༭������"����Դ�������ı༭"
var ui_depositinput = "<c:out value='${ifmis_uipage_depositinput}'/>";
//-->
</SCRIPT>
<script type="text/javascript">
//�޸Ŀ������
function checkAMT(obj){
	if(mainVouch == null){
		alert("����δѡ����Դ��Ϣ��")
		return false;
	}
	obj.value= obj.value.replace(/,/g,"");
	if( obj.value.trim().length == 0 || obj.value == null){
	
		mainVouch.curbal =accAdd(accAdd(parseFloat(moneyFormatToNumber(mainVouch.curbal)) , parseFloat(detailamtDefault)), -parseFloat(moneyFormatToNumber(obj.value)));
		detailObj.amt=moneyFormatToNumber(obj.value);
		tmain.draw();	
		tdetail.draw();		
		//��ֵ�ɹ�������Ĭ��ֵΪ��ֵ
		detailamtDefault = moneyFormatToNumber(obj.value);
		
		alert("����Ϊ�գ�");
		
		return false;
	}
	
	if(detailObj==null) return;
	if(detailamtDefault==null){ detailamtDefault=0;}
	if(Number(moneyFormatToNumber(mainVouch.curbal)) >= 0){
			if(accAdd(parseFloat(moneyFormatToNumber(mainVouch.curbal)),parseFloat(detailamtDefault)) < parseFloat(moneyFormatToNumber(obj.value))){
				alert("�������ѳ���������");
				//obj.value = 0;
				//obj.focus();
				
				obj.value="";
				return false;
			} else { //����ֵ > ���ý�� �� ����ֵ <= ���ý�� + ԭֵ
				//���ý�� = ���ý�� + ԭֵ - ��ֵ
					mainVouch.curbal =accAdd(accAdd(parseFloat(moneyFormatToNumber(mainVouch.curbal)) , parseFloat(detailamtDefault)), -parseFloat(moneyFormatToNumber(obj.value)));
					detailObj.amt=moneyFormatToNumber(obj.value);
					tmain.draw();	
					tdetail.draw();
					//��ֵ�ɹ�������Ĭ��ֵΪ��ֵ
					detailamtDefault = moneyFormatToNumber(obj.value);
					//obj.value = obj.value.toMoneyFormat();
					return true;


			}	

	} else {
		alert("���ý���!");
		return false;
	}
}
</script>
<!--�뱣����div��ǩ ������ʾ����-->
<div id="form_table_title">
  <ul>
    <li class="top">
      <div>��Դ��Ϣ</div>
    </li>
  </ul>
</div>
<!--�뱣����div��a��ǩ -->
<div id="containerline7">
	<ui:datatable id="tmain" tabletype="MainList" data="sourcesjson" showradio="true" columndefine="true" />
</div>
<form name="detailform" id="detailform" action="save.do?submittype=form&mainmenu=<c:out value='${param.mainmenu}'/>&submenu=<c:out value='${param.submenu}'/>" method="post">
<input type="hidden" name="maindata" id="maindata" />
<input type="hidden" name="billid" id="billid" value="<c:out value='${mainVouDTO.billid}'/>" />
<div id="form_table_title">
  <ul><li class="top"> <div>�����</div> </li></ul>
</div>
<!--�뱣����div��ǩ ������ʾ����-->
<div id="containerline5">
	<ui:datatable id="tdetail" tabletype="DetailList" data="detailsjson" onclick="detailclick" showradio="true" columndefine="true" />
</div>
<div id="form_table_title_edit">
  <ul> <li class="top">  <div>�༭��</div> </li></ul>
</div>

<div id="form_table">
	  <ui:editform formid="detailform" pagetype="add" parsetype="link" tableName="tdetail" />
</div>

<div id="confirm_exit_btn">  
    <input name="submitbtn"  type="button" value="����" class="button_style" onclick="saveQuit()">
    <input name="back" type="button" value="����"  class="button_style"  onclick="backCheckSave()">  
</div>
</form> 
<script type="text/javascript">
tmain.data[0].checked = true;
mainVouch = tmain.data[0];
bdgagency = mainVouch.bdgagency;
tmain.show();
tdetail.data[0].checked = true;
detailObj=tdetail.data[0];
detailamtDefault=moneyFormatToNumber(detailObj.amt);
datasynchfromtable(detailObj);
enableEditFormInput();
</script>