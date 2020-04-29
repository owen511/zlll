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
var uieditmodel = "srcdatanohead";//标注编辑界面是"有来源无主单的编辑"
var ui_depositinput = "<c:out value='${ifmis_uipage_depositinput}'/>";
//-->
</SCRIPT>
<script type="text/javascript">
//修改可用余额
function checkAMT(obj){
	if(mainVouch == null){
		alert("您还未选择来源信息！")
		return false;
	}
	obj.value= obj.value.replace(/,/g,"");
	if( obj.value.trim().length == 0 || obj.value == null){
	
		mainVouch.curbal =accAdd(accAdd(parseFloat(moneyFormatToNumber(mainVouch.curbal)) , parseFloat(detailamtDefault)), -parseFloat(moneyFormatToNumber(obj.value)));
		detailObj.amt=moneyFormatToNumber(obj.value);
		tmain.draw();	
		tdetail.draw();		
		//赋值成功，更改默认值为新值
		detailamtDefault = moneyFormatToNumber(obj.value);
		
		alert("金额不能为空！");
		
		return false;
	}
	
	if(detailObj==null) return;
	if(detailamtDefault==null){ detailamtDefault=0;}
	if(Number(moneyFormatToNumber(mainVouch.curbal)) >= 0){
			if(accAdd(parseFloat(moneyFormatToNumber(mainVouch.curbal)),parseFloat(detailamtDefault)) < parseFloat(moneyFormatToNumber(obj.value))){
				alert("输入金额已超出可用余额！");
				//obj.value = 0;
				//obj.focus();
				
				obj.value="";
				return false;
			} else { //输入值 > 可用金额 且 输入值 <= 可用金额 + 原值
				//可用金额 = 可用金额 + 原值 - 新值
					mainVouch.curbal =accAdd(accAdd(parseFloat(moneyFormatToNumber(mainVouch.curbal)) , parseFloat(detailamtDefault)), -parseFloat(moneyFormatToNumber(obj.value)));
					detailObj.amt=moneyFormatToNumber(obj.value);
					tmain.draw();	
					tdetail.draw();
					//赋值成功，更改默认值为新值
					detailamtDefault = moneyFormatToNumber(obj.value);
					//obj.value = obj.value.toMoneyFormat();
					return true;


			}	

	} else {
		alert("可用金额不足!");
		return false;
	}
}
</script>
<!--请保留此div标签 数据显示区域-->
<div id="form_table_title">
  <ul>
    <li class="top">
      <div>来源信息</div>
    </li>
  </ul>
</div>
<!--请保留此div和a标签 -->
<div id="containerline7">
	<ui:datatable id="tmain" tabletype="MainList" data="sourcesjson" showradio="true" columndefine="true" />
</div>
<form name="detailform" id="detailform" action="save.do?submittype=form&mainmenu=<c:out value='${param.mainmenu}'/>&submenu=<c:out value='${param.submenu}'/>" method="post">
<input type="hidden" name="maindata" id="maindata" />
<input type="hidden" name="billid" id="billid" value="<c:out value='${mainVouDTO.billid}'/>" />
<div id="form_table_title">
  <ul><li class="top"> <div>表格区</div> </li></ul>
</div>
<!--请保留此div标签 数据显示区域-->
<div id="containerline5">
	<ui:datatable id="tdetail" tabletype="DetailList" data="detailsjson" onclick="detailclick" showradio="true" columndefine="true" />
</div>
<div id="form_table_title_edit">
  <ul> <li class="top">  <div>编辑区</div> </li></ul>
</div>

<div id="form_table">
	  <ui:editform formid="detailform" pagetype="add" parsetype="link" tableName="tdetail" />
</div>

<div id="confirm_exit_btn">  
    <input name="submitbtn"  type="button" value="保存" class="button_style" onclick="saveQuit()">
    <input name="back" type="button" value="返回"  class="button_style"  onclick="backCheckSave()">  
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