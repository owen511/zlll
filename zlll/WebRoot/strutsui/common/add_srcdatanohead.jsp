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

var bdgagency = null;
// 处理主单点击事件，row 代表被选中的行，也就是传到页面的主单信息
function mainclick(row){
	
	// 获取用过单选框或复选框选中的行
	var selectrows = tmain.getSelectedRow();
	if(selectrows.length == 0){
		// 用户只在表格上点击了一下，并没有选中任何行
		return ;
	}
	// 由于界面上使用的是单选框，这里获取选中行
	var selectrow = selectrows[0];
	
	// 如果已经有选中行，并且追加了明细则提示用户是否要保存
	if(selectrow != mainVouch && mainVouch != null && mainVouch.details != null){
		if(confirm("是否放弃编辑？")){
			if(tdetail != null && tdetail.data != null && tdetail.data.length > 0 ){
				// 删除选中的数据
				var datas = tdetail.data;
				var money = 0.0;
				for(var i=0;i<datas.length;i++){
					money = accAdd(money,parseFloat(moneyFormatToNumber(datas[i].amt)));
				}	
				// 把删除的明细中的金额退回到主单
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

//修改可用余额
function checkAMT(obj){
	//obj.value = obj.value.replace(/(^.*?)\./,"");//正则表达式去掉其它字符
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
<ui:menufunction divid="query_t"></ui:menufunction>
<form id=queryform action="edit.do?actiontype=add&query=true&mainmenu=<c:out value='${param.mainmenu}'/>&submenu=<c:out value='${param.submenu}'/>" method="post">
	<ui:queryform formid="queryform"/>
</form>
<form id="advancedQueryForm" name="advancedQueryForm" 
action="edit.do?actiontype=add&mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>" method="post">   
	   <ui:advancedqueryform formid="advancedQueryForm" />
</form>

<div id="form_table_title">
  <ul> <li class="top"> <div>来源信息 </div> </li>
  <c:if test="${ifmis_uipage_depositinput eq 'depositinput'}">
  <script>
  function checkAcctSysBal(obj){
  	var allAcctAmt="<c:out value='${allDepositAcctBalance}'/>";
  	if(moneyFormatToNumber(obj.value)>Number(allAcctAmt)){
  		alert("可分存金额要小于不能大于总账余额");
  		obj.value=allAcctAmt;
  		return false;
  	}
  	return true;
  }
  </script>
  	&nbsp;<font color="red" style=background-color:FFB6C1>总账余额:&nbsp;<c:out value='${allDepositAcctBalance}'/>
  	&nbsp;可分存金额</font>&nbsp;
  	<input type="text" id="sysAcctBal" name="sysAcctBal" onkeyup="formatMoneyInput(this);checkAcctSysBal(this);" value="<c:out value='${allDepositAcctBalance}'/>" />
  </c:if>
  </ul>
</div>

<!--请保留此div和a标签 -->
<div id="containerline6">
	<ui:datatable id="tmain" tabletype="MainList" data="sourcesjson" onclick="mainclick" showradio="true" columndefine="true"/>
</div>
<form name="detailform" id="detailform" action="save.do?submittype=form&mainmenu=<c:out value='${param.mainmenu}'/>&submenu=<c:out value='${param.submenu}'/>" method="post">
<input type ="hidden" name ="maindata" id ="maindata" />
<div id="form_table_title">
  			<ul><li class="top"> <div>表格区</div> </li></ul>
</div>
<!--请保留此div标签 数据显示区域-->
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
			  <ul> <li class="top">  <div>编辑区</div> </li></ul>
			</div>
			
			<div id="form_table">
				  <ui:editform formid="detailform" pagetype="add" parsetype="link" tableName="tdetail" />
			</div>

			<div id="confirm_exit_btn">  
			    <input name="addbtn" type="button" value="增加明细" class="button_style" id="adddetailbtn" onclick ="addDetail()" />
			    <input name="delbtn" type="button" value="删除明细" class="button_style" id="deldetailbtn" onclick ="delDetail()"/>
			    <input name="goonbtn" type="button" value="保存并继续" class="button_style" id="saveAndOn" onclick="saveContinue()"/>
			    <input name="submitbtn" type="button" value="保存并退出" class="button_style" id="saveAndOut" onclick="saveQuit()"/>
			    <input name="backbtn" type="button" value="返回"  class="button_style"  id="backbtn" onclick="backCheckSave()"/>  
			</div>
</form> 
<script>
disEnableEditFormInput();
</script>