<%@page language="java" contentType="text/html; charset=GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%
       String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
       String actiontype = request.getParameter("actiontype");
%>
<SCRIPT LANGUAGE="JavaScript">
<!--
var uieditmodel = "<c:out value='${ifmis_ui_page_editmodel}'/>";//标注编辑界面是"无来源主子单的编辑"
var actiontype = "<%=actiontype%>";
controlcurbal = true; //控制金额
//-->
</SCRIPT>
<script>
// 保存主单信息的变量
var mainVouch = null;

var detailObj=null;

var detailamtDefault = null;

// 处理主单点击事件，row 代表被选中的行，也就是传到页面的主单信息
function mainclick(row){
	if(actiontype!="add")return;
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
				// 把删除的明细中的金额退回到主单
				//alert(mainVouch.curbal+"+"+sumAmt(tdetail));
				mainVouch.curbal = accAdd(parseFloat(moneyFormatToNumber(mainVouch.curbal)),sumAmt(tdetail));
				clearFormInput();
				mainVouch.details = null;
				tmain.draw();
				//disEnableMainEditFormInput();
			}
			//tdetail.data = new Array();
			//tdetail.draw();
			mainVouch= selectrow;
			mainVouch.fromapp = mainVouch.billid;
			//enableMainEditFormInput();
			loadDetail();
			return;
		}else{
			selectrow.checked=false;
			mainVouch.checked=true;
			tmain.draw();
			return ;
		}
	}
	enableMainEditFormInput();
	mainVouch = selectrow;
	mainVouch.originalbal = mainVouch.curbal;
	mainVouch.fromapp = mainVouch.billid;
	loadDetail();

}
//加载子单
function loadDetail(){
	if(mainVouch == null){
		alert("请选择来源单据！");
		return;
	}
	var url = 'edit.do?actiontype=loaddetail&mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>';
	var pars = 'billid='+mainVouch.billid+"&model=back";//列出退款的信息
    var myAjax = new Ajax.Request(
                    url,
                    {method: 'post', parameters: pars, onComplete: showResponse}
                    );    
}

function showResponse(request){
    eval("var tdetaildata = "+request.responseText);
    tdetail.data = tdetaildata;
	for(var i=0;tdetail.data!=null&&i<tdetail.data.length;i++){
		//如果控制表合计的值大于当前子单的值，则用当前子单的值为可用余额
		var amt = parseFloat(moneyFormatToNumber(tdetail.data[i].amt));
		if(amt>0&&amt<parseFloat(tdetail.data[i].curbal))tdetail.data[i].curbal = amt;
		tdetail.data[i].originalbal = 0;
		tdetail.data[i].amt = 0;
		tdetail.data[i].fromapp = mainVouch.fromapp;
	}
    tdetail.show();
	mainVouch.details = tdetail.data;
	detailObj =  mainVouch.details[0];
	if($("detailform").mainamt)$("detailform").mainamt.value =  0;
	if(mainVouch.details.length==1)detailamtDefault = detailObj.amt;
	if(uieditmodel != "srcmainsubdata"){
		maindatasynchfromtable(detailObj);
	}else{
		//maindatasynchfromtable(mainVouch);
	}

    updateRow2ColumnForDetail('edit_table_tdetail','tdetail');
}


// 将选中的数据填写到编辑区内
function detailclick(row){
	if(tdetail ==null ||tdetail.data == null || tdetail.data.length <1 ){
		return;
	}
	detailObj = row;
	//detailamtDefault = moneyFormatToNumber(detailObj.amt);
	return;
}

// 将主单和明细信息保存到后台，并返回列表页
function saveContinue(backindex){
	if(backindex==undefined)
		backindex = false;
	if(mainVouch == null){
		alert("请选择来源单据！");
		return false;
	}
	
	if(!addMainEditFormInput()) return;

	 if(tdetail != null && tdetail.data != null && tdetail.data.length >0){
    	if(checkNull()){ 
		   var saveMainVouch = Object.clone(mainVouch);
           maindatasynchtoObj(saveMainVouch);
		   maindatasynch();
		   saveMainVouch.details = tdetail.data;
		   if(saveMainVouch.details.length==1&&uieditmodel != "srcmainsubdata"){
				saveMainVouch = Object.clone(saveMainVouch.details[0]);
		   }

           $("detailform").maindata.value = Object.toJSON(saveMainVouch);
    	   //设置所有功能按钮不可用
			disabledFunctionButton();
		   var url = 'save.do?random='+Math.random()+'&'+urlmenuparameter;
		   var pars = "maindata="+$("detailform").maindata.value;
		   if($("detailform").billid)pars += "&billid="+$("detailform").billid.value;
           save(url,pars,backindex);
        }else{
			 alert("请录入退款信息！");
		}
    	return false;
    }else{
        alert("请至少添加一条明细信息！");
        return false;
    }
}

// 将主单和明细信息保存到后台，并返回本页
function saveQuit(){
	saveContinue(true);
}

//返回
function backCheckSave(){
	if(tdetail != null && tdetail.data != null && tdetail.data.length >0){
		if(confirm("数据未保存，是否保存数据？")){
		  saveContinue()		    
		} else {
			window.location.href = 'index.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>';
		}
	} else {
		window.location.href = 'index.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>';
	}

}

function checkNull(){
   // 校验用户录入信息
  	if(!addMainEditFormInput()) return false;
	if($("detailform").mainamt&&$("detailform").mainamt.value !=  0){
		return true;
	}else{
		return false;
	}
    return true;
}

var isInputErr = false;
//修改可用余额
function checkAMT(obj){
	isInputErr = true; //防止在文本框和列表同时编辑时，失去焦点时冲突。
	if( obj.value.trim().length == 0 || obj.value == null){
		alert("金额不能为空！");
		//obj.focus();
		return false;
	}
	if(!moneyFormatToNumber(obj.value).isNumber()){
		alert("金额必须是数字！");
		//obj.focus();
		return false;
	}
	if(detailObj==null) {
		detailObj = new Object();
	}
	if(detailamtDefault==null){ detailamtDefault=0;}
	var curbal = parseFloat(moneyFormatToNumber(mainVouch.curbal));
	detailamtDefault = parseFloat(moneyFormatToNumber(detailamtDefault));
	var inputamt = parseFloat(moneyFormatToNumber(obj.value));
	if(curbal >= 0){
			if(curbal + detailamtDefault < inputamt){
				alert("输入金额已超出可用余额！");
				//obj.value = 0;
				obj.focus();//不控制焦点重置的话，会在某些情况下失去控制。这里为了程序正确，牺牲一些操作友好性。
				return false;
			} else { //输入值 > 可用金额 且 输入值 <= 可用金额 + 原值
				//可用金额 = 可用金额 + 原值 - 新值
				mainVouch.curbal = accAdd(accAdd(curbal , detailamtDefault), -inputamt);
				detailObj.amt = inputamt;
				detailObj.originalbal = detailObj.amt;
				detailObj.curbal = accAdd(accAdd(detailObj.curbal , detailamtDefault), -inputamt);
				//赋值成功，更改默认值为新值
				detailamtDefault = inputamt;
				tmain.draw();	
				tdetail.draw();
				isInputErr = false;
				return true;
			}	
		
	} else {
		alert("可用金额不足!");
		//obj.focus();
		return false;
	}
}


//修改可用余额
function checkMoney(amt,curbal,oldamt){
	if(isInputErr){
		isInputErr = false;
		return false;
	}
	if( amt.trim().length == 0 || amt == null){
		alert("金额不能为空！");
		//obj.focus();
		return false;
	}
	if(!moneyFormatToNumber(amt).isNumber()){
		alert("金额必须是数字！");
		//obj.focus();
		return false;
	}
	if(accAdd(curbal,oldamt) > 0){
			if(accAdd(curbal,oldamt) < parseFloat(moneyFormatToNumber(amt))){
				alert("输入金额已超出可用余额！");
				//obj.value = 0;
				//obj.focus();//不控制焦点重置的话，会在某些情况下失去控制。这里为了程序正确，牺牲一些操作友好性。
				return false;
			} else { //输入值 > 可用金额 且 输入值 <= 可用金额 + 原值
				return true;
			}	
		
	} else {
		alert("可用金额不足!");
		//obj.focus();
		return false;
	}
}
// 清除FORM中的可录入数据
function  clearFormInput(){
	clearMainEditFormInput();
	detailamtDefault = null;
}


function showInputRemark(rownum,value,row,tdobj,datatable){
	if(value != null){
		value = value+"";
	} else {
		value ="";
	}
	var colname=this.name;
	// 创建可编辑区域
	var tableid=datatable.id; 
	var col = this;
	var colname =this.name;
	var divobj = document.createElement('<div style="width:98%;height:98%;border: 1px solid #000080"></div>');
	if(colname=="amt"){
		divobj.innerHTML = value.toMoneyFormat();
		divobj.style.textAlign = "right";
	}else{
		divobj.innerHTML = value;
	}
	// 与datatable建立引用关系
	divobj.datarow = row;
	divobj.datatable = datatable;
	// 将可编辑取追加到表格
	tdobj.appendChild(divobj);
	if(datatable.disabled==false && datatable.getDisabledConfig(this.id,rownum) == false){	
		// 鼠标单击单元格后可以修改数据 
		divobj.onclick = function(){
			var m = this.innerText.trim();
			if(m == null){
				this.innerHTML ="";
				this.defaultremark = "";
			} else {
				this.defaultremark = m;
				if(colname=="amt"){
					if(detailamtDefault == null)detailamtDefault = m;
				}
			}
			
			// 设置样式加重
			if(this.parentElement!=null) this.parentElement.oldbackgroundColor = this.parentElement.runtimeStyle.backgroundColor;
			if(this.parentElement!=null) this.parentElement.runtimeStyle.backgroundColor = 'yellow';
			
			// 设置可编辑属性
			this.contentEditable = true;
			this.focus();
			this.setActive();
		}
		
		divobj.onblur = function(){
			var m = this.innerHTML;	
			if(this.parentElement!=null) this.parentElement.runtimeStyle.backgroundColor = "";
			// 设置不可编辑
			this.contentEditable = false;
			if(colname=="amt"){
				//debugger;
				var inputamt = Math.abs(parseFloat(moneyFormatToNumber(m)));
				var curbal =  parseFloat(moneyFormatToNumber(divobj.datarow.curbal));
				var oldamt =  parseFloat(moneyFormatToNumber(divobj.datarow.originalbal));
				if(checkMoney(m,curbal,oldamt)){
					m = inputamt;//m.toMoneyFormat();
					divobj.datarow.curbal =  accAdd(accAdd(curbal,oldamt),-inputamt);
					$("detailform").mainamt.value = accAdd(accAdd(parseFloat(moneyFormatToNumber($("detailform").mainamt.value)),-oldamt),inputamt);
					mainVouch.curbal = accAdd(parseFloat(moneyFormatToNumber(mainVouch.originalbal)),-parseFloat(moneyFormatToNumber($("detailform").mainamt.value)));
					tmain.draw();
					divobj.datarow.originalbal = inputamt;
					detailamtDefault = inputamt;
				}
			}
			eval("divobj.datarow."+colname+" = m");
			this.innerHTML = m;
			this.datatable.draw();

		}
		divobj.onkeydown = function(){
			if(event.keyCode == 13){
				//寻找下一个单元格，并触发其中div的onclick方法
				nextDiv(tdobj,divobj,datatable);
				
				// 回车键,调用失焦点事件
				this.fireEvent("onblur");
				return false;
			}
			else if(event.keyCode == 27 ){
				// Esc键,恢复默认值
				this.innerText = this.defaultremark;
				this.fireEvent("onblur");
				return false;
			}
		}
	}
}

</script>
<ui:menufunction divid="query_t"></ui:menufunction>
<form id="queryform" name="queryform" method="post"
	action="edit.do?actiontype=add&mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>">
	<ui:queryform formid="queryform" />
</form>
<div id="form_table_title">
	<ul>
		<li class="top">
			<div>
				来源信息
			</div>
		</li>
	</ul>
</div>
<!-- 这个DIV上定义了主单样式 -->
<div id="containerline4">
	<!-- 使用标签创建，onclick 使用的方法必须放之前定义过 -->
	<ui:datatable id="tmain" tabletype="MainList" data="sourcesjson"
		onclick="mainclick" showradio="true" columndefine="true" />
</div>

<div id="form_table_title_edit">
	<ul>
		<li class="top">
			<div>
				主单编辑区
			</div>
		</li>
	</ul>
</div>
<!--一行放三个查询条件-->
<form name="detailform" id="detailform"
	action="save.do?submittype=form&mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>"
	method="post">
	<input type ="hidden" name ="maindata" id ="maindata" />
	<input type="hidden" name="billid" id="billid" value="<c:out value='${mainVouDTO.billid}'/>" />
	<div id="form_table" style="display:block;">
		<%--主编辑区--%>
		<ui:maineditform formid="detailform" pagetype="add" parsetype="link"
			tableName="tmain" />
	</div>
	<div id="form_table_title">
		<ul><li class="top"><div>明细信息</div></li></ul>
	</div>
	<!--请保留此div和a标签 -->
	<div id="containerline4">
		<div id='edit_table_tdetail' style='display:none;padding:0;margin:0;'></div>
		<ui:datatable id="tdetail" tabletype="DetailList" showradio="false"  data="detailsjson"  columndefine="true" />
	</div>
	
	<div id="confirm_exit_btn">
	<c:choose>
		<c:when test="${actiontype eq 'add'}">
			<input name="goonbtn" type="button" value="保存并继续" class="button_style" id="saveAndOn" onclick="saveContinue()"/>
			<input name="submitbtn" type="button" value="保存并退出" class="button_style" id="saveAndOut" onclick="saveQuit()"/>
		</c:when>   
		   <c:otherwise> 
			<input name="submitbtn" type="button" value="保存" class="button_style" id="saveAndOut" onclick="saveQuit()"/>
		</c:otherwise>
	</c:choose>
	<input name="back" type="button" value="返回" class="button_style" onclick="backCheckSave()" />
	</div>
</form>

<script>
if(actiontype=="add"){
	//页面加载时，将各输入框设为不可用
	disEnableMainEditFormInput();
}else{
    //默认页面加载即选中来源数据
    tmain.selectedallrows(true);
	var selectrows = tmain.getSelectedRow();
	var selectrow = selectrows[0];
	mainVouch = selectrow;
	
	//对修改来说，明细列表中必然有数据，因此默认选中第一条明细，并赋给全局变量detailObj作为初始值
	tdetail.data[0].checked=true;
	for(var i=0;tdetail.data!=null&&i<tdetail.data.length;i++){
		//如果控制表合计的值大于当前子单的值，则用当前子单的值为可用余额
		tdetail.data[i].originalbal = tdetail.data[i].amt;
	}
	detailObj = tdetail.data[0];
	tdetail.show();
	
	//同步mainVouDTO到主编辑区
	var mainJson = <%= request.getAttribute("mainJson")%>;
   	maindatasynchfromtable(mainJson[0]);
	mainVouch.originalbal = accAdd(parseFloat(moneyFormatToNumber(mainVouch.curbal)),sumAmt(tdetail));
	//给金额加千分位
	if($('detailform').mainamt){
		$("detailform").mainamt.value =  sumAmt(tdetail);
		detailamtDefault = $("detailform").mainamt.value;
   		$('detailform').mainamt.value = formatNumber($('detailform').mainamt.value,"#,###.00");
    }
}

function maindatasynch() {
	
	var ttemp = tmain;
	if(tdetail){
		ttemp = tdetail;
	}
	if (ttemp != null && ttemp.data != null && ttemp.data.length > 0) {
				//同步更新所有子数据发文日期
		var datas = ttemp.data;
				
				//主编辑区里的元素数组
				//maininpueleList;
		for (var i = 0; i < datas.length; i++) {
			for (var j = 0; j < maininpueleList.length; j++) {
			
				eval(" var eleObj = $('detailform')." + maininpueleList[j] + ".value");
				
				var temp = maininpueleList[j].replace("main", "");
				if(temp=="amt") eleObj = eleObj.replace(/,/g,"");
				eval("datas[i]." + temp + "= eleObj");
			}
		}
	}
	ttemp.draw();
}

</script>

