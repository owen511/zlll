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

var bdgagency = null;
// ������������¼���row ����ѡ�е��У�Ҳ���Ǵ���ҳ���������Ϣ
function mainclick(row){
	
	// ��ȡ�ù���ѡ���ѡ��ѡ�е���
	var selectrows = tmain.getSelectedRow();
	if(selectrows.length == 0){
		// �û�ֻ�ڱ���ϵ����һ�£���û��ѡ���κ���
		return ;
	}
	// ���ڽ�����ʹ�õ��ǵ�ѡ�������ȡѡ����
	var selectrow = selectrows[0];
	
	// ����Ѿ���ѡ���У�����׷������ϸ����ʾ�û��Ƿ�Ҫ����
	if(selectrow != mainVouch && mainVouch != null && mainVouch.details != null){
		if(confirm("�Ƿ�����༭��")){
			if(tdetail != null && tdetail.data != null && tdetail.data.length > 0 ){
				// ɾ��ѡ�е�����
				var datas = tdetail.data;
				var money = 0.0;
				for(var i=0;i<datas.length;i++){
					money = accAdd(money,parseFloat(moneyFormatToNumber(datas[i].amt)));
				}	
				// ��ɾ������ϸ�еĽ���˻ص�����
				mainVouch.curbal = parseFloat(moneyFormatToNumber(mainVouch.curbal)) + parseFloat(money);
				clearFormInput();
				detailObj=null;
				setDisabled(true);
			}
			mainVouch= selectrow;	
			tmain.draw();
			tdetail.data = new Array();
			tdetail.draw();
			mainsynch2fromtable(mainVouch);
			addDetail();
			return;
		}
		else{
			selectrow.checked=false;
			mainVouch.checked=true;
			tmain.draw();
			mainsynch2fromtable(mainVouch);
			addDetail();
			return ;
		}
	}
	
	mainVouch = selectrow;
	mainsynch2fromtable(mainVouch);
	addDetail();
}

//�޸Ŀ������
function checkAMT(obj){
	//obj.value = obj.value.replace(/(^.*?)\./,"");//������ʽȥ�������ַ�
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
<ui:menufunction divid="query_t"></ui:menufunction>
<form id=queryform action="edit.do?actiontype=add&query=true&mainmenu=<c:out value='${param.mainmenu}'/>&submenu=<c:out value='${param.submenu}'/>" method="post">
	<ui:queryform formid="queryform"/>
</form>
<form id="advancedQueryForm" name="advancedQueryForm" 
action="edit.do?actiontype=add&mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>" method="post">   
	   <ui:advancedqueryform formid="advancedQueryForm" />
</form>

<div id="form_table_title">
  <ul> <li class="top"> <div>��Դ��Ϣ </div> </li>
  <c:if test="${ifmis_uipage_depositinput eq 'depositinput'}">
  <script>
  function checkAcctSysBal(obj){
  	var allAcctAmt="<c:out value='${allDepositAcctBalance}'/>";
  	if(moneyFormatToNumber(obj.value)>Number(allAcctAmt)){
  		alert("�ɷִ���ҪС�ڲ��ܴ����������");
  		obj.value=allAcctAmt;
  		return false;
  	}
  	return true;
  }
  </script>
  	&nbsp;<font color="red" style=background-color:FFB6C1>�������:&nbsp;<c:out value='${allDepositAcctBalance}'/>
  	&nbsp;�ɷִ���</font>&nbsp;
  	<input type="text" id="sysAcctBal" name="sysAcctBal" onkeyup="formatMoneyInput(this);checkAcctSysBal(this);" value="<c:out value='${allDepositAcctBalance}'/>" />
  </c:if>
  </ul>
</div>

<!--�뱣����div��a��ǩ -->
<div id="containerline6">
	<ui:datatable id="tmain" tabletype="MainList" data="sourcesjson" onclick="mainclick" showradio="true" columndefine="true"/>
</div>
<form name="detailform" id="detailform" action="save.do?submittype=form&mainmenu=<c:out value='${param.mainmenu}'/>&submenu=<c:out value='${param.submenu}'/>" method="post">
<input type ="hidden" name ="maindata" id ="maindata" />
<div id="form_table_title">
  			<ul><li class="top"> <div>�����</div> </li></ul>
</div>
<!--�뱣����div��ǩ ������ʾ����-->
<div id="containerline5">
<c:choose>
   <c:when test="${ifmis_uipage_depositinput eq 'depositinput'}">
		<ui:datatable id="tdetail" tabletype="DetailList" data="detailsjson" onclick="detailclick" showradio="true" columndefine="true"  
			sumColumnList="amt,acctbal,shoulddepositamt,fallamt" sumamtrow="all" />
   </c:when>
   <c:otherwise>
		<ui:datatable id="tdetail" tabletype="DetailList" data="detailsjson" onclick="detailclick" showradio="true" columndefine="true" />
   </c:otherwise>   
</c:choose>	
</div>

			<div id="form_table_title_edit">
			  <ul> <li class="top">  <div>�༭��</div> </li></ul>
			</div>
			
			<div id="form_table">
				  <ui:editform formid="detailform" pagetype="add" parsetype="link" tableName="tdetail" />
			</div>

			<div id="confirm_exit_btn">  
			    <input name="addbtn" type="button" value="������ϸ" class="button_style" id="adddetailbtn" onclick ="addDetail()" />
			    <input name="delbtn" type="button" value="ɾ����ϸ" class="button_style" id="deldetailbtn" onclick ="delDetail()"/>
			    <input name="goonbtn" type="button" value="���沢����" class="button_style" id="saveAndOn" onclick="saveContinue()"/>
			    <input name="submitbtn" type="button" value="���沢�˳�" class="button_style" id="saveAndOut" onclick="saveQuit()"/>
			    <input name="backbtn" type="button" value="����"  class="button_style"  id="backbtn" onclick="backCheckSave()"/>  
			</div>
</form> 
<script>
disEnableEditFormInput();
</script>