var initamt = 0;// 初始可用金额
var mainrownum = 0;// 主单选择的行号
var tobillcode = "";//调账目标额度
var preSelectedRow;//前次选中的行对象,并同步到编辑区
var nextSelectedRow;//后次选中的行对象,判断前后两次选择的是否同一对象
var cloneSelectedRow;//复制的选中的行对象,并同步到明细中
var cloneSelectedRow2;//复制的选中的行对象,用于恢复数据
var tdetail= new dataTable();//明细表格
//主单点击事件(单选按钮)
function mainradioclick(row) {// 必须是单选按钮
	if (tmain.getSelectedRow().length == 0) {
		return;
	}
	nextSelectedRow = row;
//	var url = './findAdjustTarget.do?' + commonMenu + "&random=" + Math.random();
//	var pars = "&budgetagency=" + row.budgetagency + "&element01=0,1,3"
//			+ "&accountname=" + row.accountname + "&accountno=" + row.accountno
//			+ "&budgetproj=" + row.budgetproj;
	if (preSelectedRow != undefined && nextSelectedRow != preSelectedRow) {// 第2次以后选择
		if (confirm("是否放弃编辑？")) {
			//还原原选中数据
			tmain.data[mainrownum]=cloneSelectedRow2;
			cloneSelectedRow2.checked = false;
			tmain.show();
			
			initCloneObj(row);
			clearEditFormInput();
			datasynchfromtable(preSelectedRow);
			// 先清空明细,再添加明细
			tdetail.data = new Array();
			tdetail.appendRow(cloneSelectedRow);
			tdetail2.data = new Array();
			tdetail2.show();
			hasStarflag(preSelectedRow);
			return;
		} else {
			tmain.data[mainrownum].checked = true;
			tmain.data[nextSelectedRow.rownum].checked = false;
			tmain.show();
			setTotalAmt('tmainsumAmtColumnidcuramt',tmain.data[mainrownum].curamt);
			return;
		}
	}else if (nextSelectedRow==preSelectedRow){
		return;
	}
	// 第一次选择
	if (row.checked) {
		initCloneObj(row);
	}
	datasynchfromtable(preSelectedRow);
	//showTargetRequest(url,pars);
	tdetail.appendRow(cloneSelectedRow);
	setDisabled(false);
	hasStarflag(preSelectedRow);
}

//初始化数据，含克隆。
function initCloneObj(row){
	initamt = row.curamt;
	mainrownum = row.rownum;
	setTotalAmt('tmainsumAmtColumnidcuramt',initamt);
	//克隆，并同步到明细
	cloneSelectedRow = cloneObj(row);
	cloneSelectedRow.checked=true;
	//cloneSelectedRow.amt="0.00";
	//cloneSelectedRow.billcode ="";
	
	//克隆，用于还原数据
	cloneSelectedRow2 = cloneObj(row);
	cloneSelectedRow2.checked=true;
	//cloneSelectedRow2.amt="0.00";
	//cloneSelectedRow2.billcode ="";
	
	//同步到编辑区
	preSelectedRow = nextSelectedRow;
	preSelectedRow.amt = row.curamt;
	//preSelectedRow.amt="0.00";
	//preSelectedRow.billcode ="";
	
	//$("tobillcode_btn")=function(){alert('<<1>>');};
}

//主单点击事件
function mainclick(row) {
	tdetail.data = row.details;
	tdetail.show();
	changeColor();
	//var obj = tdetail.data[0];
	//alert(obj.budgetincometype_code);
}

//对比信息，不同的标红色
function changeColor() {
	for (var j = 0; j < tdetail.columnConfig.length; j++) {// 循环明细列
		var col = tdetail.columnConfig[j];
		var firObj = tdetail.data[0];
		var secObj = tdetail.data[1];
		if (secObj[col.id] != firObj[col.id]) {
			var strShowFunc = eval(col.show) + "";// 获取col.show的字符串
			//var obj = JQ("#tdetail-" + col.id + "-1")[0];
//			if (col.type == 'M') {
//				JQ("#tdetail-" + col.id + "-1")[0].innerHTML = "<div style='color:red'>"
//						+ String(secObj[col.id]).toMoneyFormat() + "</div>";
//			} else if (strShowFunc.indexOf('showElement') > 0) {// 要素
//				JQ("#tdetail-" + col.id + "-1")[0].innerHTML = "<div style='color:red'>"
//						+ secObj[col.id + "_code"]
//						+ "-"
//						+ secObj[col.id + "_name"] + "</div>";
//			} else {
//				JQ("#tdetail-" + col.id + "-1")[0].innerHTML = "<div style='color:red'>"
//						+ secObj[col.id] + "</div>";
//			}
			JQ("#tdetail-" + col.id + "-1").addClass("bbaClass");
		}
	}
}
// 保存数据
function savedata(flag) {
	if (!addEditFormInput()) {
		return;
	}
	if(!checkSkaccountno()){
		return;
	}
	var isNotTarget=tdetail2.data.length;
	var mainVoucher = subeditData();
	//来源数据
	var fromObj =preSelectedRow;
	fromObj.dc = 1;
	fromObj.amt = -mainVoucher.amt;
	fromObj.billid = 0;
	//去向数据
	var toObj = tdetail.data[0];
	toObj.dc = -1;
	toObj.amt = mainVoucher.amt;
	toObj.billid = 0;
	var details = new Array();
	details[0] = fromObj;
	details[1] = toObj;
	//mainVoucher.tobillcode=$("detailform").tobillcode.value;
	mainVoucher.frombillcode=preSelectedRow.billcode;
	mainVoucher.details = details;
	mainVoucher.element04=isNotTarget;
	var url = "./ajaxAddSave.do?";
	if (!isAddPage) {// 修改页
		url = "./ajaxModifySave.do?";
	}
	url += commonMenu + "&math=" + Math.random();
	var pars = "maindata=[" + Object.toJSON(mainVoucher) + "]";
	operator = flag;
	show();
	ajaxsubmit(url, pars, ajaxSaveSuccess);
}

// 验证编辑区金额
function checkAMT(obj) {
	obj.value = obj.value.replace(/,/g, "");
	if (Number(initamt) < Number(obj.value)) {
		alert('输入金额已超出可用金额!');
		obj.value = "0.00";
	}
	var rowObj = tmain.getSelectedRow()[0];
	rowObj.curamt = accSub(initamt, Number(obj.value));
	tmain.data[mainrownum].checked = true;
	tmain.draw();
	setTotalAmt('tmainsumAmtColumnidcuramt',rowObj.curamt);
	datasynch();
}


////请求查询概算明细
//function showTargetRequest(url, pars) {
//	var myAjax = new Ajax.Request(url, {
//		method : 'post',
//		parameters : pars,
//		onComplete : showTargetResponse
//	});
//}
//
////ajax请求成功后响应,概算明细 
//function showTargetResponse(request) {
//	eval("var tdetaildata = " + request.responseText);
//	tdetail.data = tdetaildata;
//	tdetail.show();
//	closeDiv();
//}

//查找调账目标
function onadjusttarget(){
	var selectRows = tmain.getSelectedRow();
	if (selectRows.length < 1) {
		alert("请选择支出凭证信息！");
		return;
	}
	var param = new Object();
	param.budgetagency = selectRows[0].budgetagency;
	param.accountname = selectRows[0].accountname;
	param.accountno = selectRows[0].accountno;
	param.curamt = selectRows[0].curamt;
	param.budgetproj = selectRows[0].budgetproj;
	param.budgetsource = selectRows[0].budgetsource;
	param.budgetfuncclass = selectRows[0].budgetfuncclass;
	param.billcode = selectRows[0].billcode;//用于过滤来源数据(合并前)
	var params = "&budgetagency=" + param.budgetagency + "&element01=0,1,3"
			+ "&accountname=" + param.accountname + "&accountno="
			+ param.accountno + "&curamt=" + param.curamt + "&budgetproj2="
			+ param.budgetproj + "&budgetsource2=" + param.budgetsource
			+ "&budgetfuncclass2=" + param.budgetfuncclass;
	param.condition = params;
	var url = "./findctrl.do?" + commonMenu + params;
	var result = window
			.showModalDialog(
					url,
					param,
					"dialogWidth:800px;dialogHeight:500px;center:yes;status:no;resizable:no;help:No;");
	if (result != null) {
		if(tdetail2.data.length>0){
			//tdetail2.removeSelected();
			tdetail2.data=new Array();
		}
		tdetail2.appendRow(result);
		tdetail2.show();
		setContrlDisabled("saveAndOn",false);
		setContrlDisabled("saveAndOut",false);
		$("detailform").budgetfuncclass.valueid = tdetail2.data[0].budgetfuncclass;
		$("detailform").budgetfuncclass.value = tdetail2.data[0].budgetfuncclass_code+"-"+tdetail2.data[0].budgetfuncclass_name;
		$("detailform").budgetproj.valueid = result.budgetproj;
		$("detailform").budgetproj.value = tdetail2.data[0].budgetproj_code+"-"+tdetail2.data[0].budgetproj_name;
		datasynch();
	}
	
}

//设置空件的启用、禁用。
function setContrlDisabled(id,flag){
	document.getElementById(id).disabled=flag;
}

//是否有红星
function hasStarflag(obj) {
	_pay_class_code = obj.payclass_code;
	if (_pay_class_code == 1) {
		addStarflag('收款人账号', false);
		addStarflag('收款人名称', false);
		$('skaccountno').value = "";
		$('skaccountname').value = "";
	} else {
		addStarflag('收款人账号', true);
		addStarflag('收款人名称', true);
	}
}
