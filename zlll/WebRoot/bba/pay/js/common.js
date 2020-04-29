var mainRow;// 选中的主单数据
var initamt = 0;// 初始可用金额
var mainrownum = 0;// 主单选择的行号
// 主单点击事件(单选按钮)
function mainradioclick2(row) {// 必须是单选按钮
	if (row.checked) {
		mainRow = row;
		mainRow.amt = 0;
		mainRow.billcode = null;
		initamt = row.curamt;
		mainrownum = row.rownum;
	}
	datasynchfromtable(mainRow);
	tdetail.appendRow(mainRow);
	setDisabled(false);
}


var preSelectedRow;//前次选中的行对象,并同步到编辑区
var nextSelectedRow;//后次选中的行对象,判断前后两次选择的是否同一对象
var cloneSelectedRow;//复制的选中的行对象,并同步到明细中
var cloneSelectedRow2;//复制的选中的行对象,用于恢复数据
var mainrownum = 0;// 主单选择的行号

//主单点击事件(单选按钮)
function mainradioclick(row) {// 必须是单选按钮
	if (tmain.getSelectedRow().length == 0) {
		return;
	}
	nextSelectedRow = row;
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
			isDisabled('skaccountno',true);
			isDisabled('skaccountno_btn',true);
			isDisabled('skaccountname',true);
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
	tdetail.appendRow(cloneSelectedRow);
	setDisabled(false);
	isDisabled('skaccountno',true);
	isDisabled('skaccountno_btn',true);
	isDisabled('skaccountname',true);
}

//初始化数据，含克隆。
function initCloneObj(row){
	initamt = row.curamt;
	mainrownum = row.rownum;
	setTotalAmt('tmainsumAmtColumnidcuramt',initamt);
	//克隆，并同步到明细
	cloneSelectedRow = cloneObj(row);
	cloneSelectedRow.checked=true;
	cloneSelectedRow.amt="0.00";
	cloneSelectedRow.billcode ="";
	
	//克隆，用于还原数据
	cloneSelectedRow2 = cloneObj(row);
	cloneSelectedRow2.checked=true;
	cloneSelectedRow2.amt="0.00";
	cloneSelectedRow2.billcode ="";
	
	//同步到编辑区
	preSelectedRow = nextSelectedRow;
	preSelectedRow.amt="0.00";
	preSelectedRow.billcode ="";
}

//主单点击事件
function mainclick(row) {
	tdetail.data = row.details;
	tdetail.show();
}
// 子单点击事件(单选按钮)
function detailradioclick(row) {
	// 同步到编辑区
	datasynchfromtable(row);
}

//新增明细
function addDetail() {
	if (tmain.getSelectedRow().length==0) {
		alert("请选择银行流水信息！");
		return;
	}
	if (!addEditFormInput()) {
		return;
	}
	var detailRow = new Object();
	detailRow = Object.extend(detailRow, cloneSelectedRow);
	detailRow.billcode = null;
	detailRow.amt = "";
	tdetail.appendRow(detailRow);
	// 同步默认数据
	$("detailform").amt_hid.value = "";
	$("detailform").amt.value = "";

	// 明细合计金额
	var detailtotalamt = getTdetailsumAmtColumnidamt();
	tmain.data[mainrownum].checked = true;
	var iiamt = accSub(Number(initamt), Number(detailtotalamt));
	tmain.data[mainrownum].curamt = iiamt;
	tmain.draw();
	selectedDetailRow();// 默认最后一条选中
}

function delDetail() {
	if (tdetail.data.length<=1) {
		alert("至少需有一条额度登记明细！");
		return;
	}
	var rowObj=tmain.getSelectedRow()[0];
	tdetail.removeSelected();
	selectedDetailRow();
	//子单点击事件
	detailradioclick(tdetail.getSelectedRow()[0]);
	rowObj.curamt = accSub(initamt, calTDtailTotalAmt());
	tmain.data[mainrownum].checked = true;
	tmain.draw();
	setTotalAmt('tmainsumAmtColumnidcuramt',rowObj.curamt);
}

// 新增明细
function addDetail2() {
	if (mainRow == null) {
		alert("请选择用款计划信息！");
		return;
	}
	if (!addEditFormInput()) {
		return;
	}
	var detailRow = new Object();
	detailRow = Object.extend(detailRow, mainRow);
	detailRow.billcode = null;
	detailRow.amt = "";
	tdetail.appendRow(detailRow);
	// 同步默认数据
	$("detailform").amt_hid.value = "";
	$("detailform").amt.value = "";

	// 明细合计金额
	var detailtotalamt = getTdetailsumAmtColumnidamt();
	tmain.data[mainrownum].checked = true;
	var iiamt = accSub(Number(initamt), Number(detailtotalamt));
	tmain.data[mainrownum].curamt = iiamt;
	tmain.draw();
	selectedDetailRow();// 默认最后一条选中
}

// 删除明细,
function delDetail2() {
	if (tdetail.data.length == 1) {
		alert('至少须有一条支出凭证明细！');
		return;
	}
	tdetail.removeSelected();
	selectedDetailRow();
	mainRow.curamt = accSub(initamt, calTDtailTotalAmt());
	tmain.data[mainrownum].checked = true;
	tmain.draw();
}

// 保存数据
function savedata(flag) {
	if (tdetail.data.length == 0) {
		alert("请添加支出凭证明细！");
		return;
	}
	if (!addEditFormInput()) {
		return;
	}
	if(!checkSkaccountno()){
		return;
	}
	var url = "./ajaxAddSave.do?";
	if (!isAddPage) {// 修改页
		url = "./ajaxModifySave.do?";
	}
	url += commonMenu + "&math=" + Math.random();
	var pars = "maindata=" + Object.toJSON(tdetail.data);
	operator = flag;
	show();
	ajaxsubmit(url, pars, ajaxSaveSuccess);
}

// 获取明细的合计金额
function getTdetailsumAmtColumnidamt() {
	var totalamt = JQ("#tdetailsumAmtColumnidamt").text();
	return totalamt.replace(/,/g, "");
}

//验证编辑区金额
function checkAMT(obj) {
	obj.value = obj.value.replace(/,/g, "");
	var rowObj = tmain.getSelectedRow()[0];
	var beforeAmt = Number(0);
	if (Number(rowObj.curamt) >= 0) {
		beforeAmt = rowObj.curamt;
		rowObj.curamt = accSub(initamt, calTDtailTotalAmt());
		if (Number(initamt) < calTDtailTotalAmt()) {
			alert('输入金额已超出可用金额!');
			obj.value = "0.00";
			datasynch();
			setTotalAmt('tmainsumAmtColumnidcuramt',beforeAmt);
			tmain.data[mainrownum].curamt = beforeAmt;
			tmain.draw();
			return;
		}
		tmain.data[mainrownum].checked = true;
		tmain.draw();
	}
	setTotalAmt('tmainsumAmtColumnidcuramt',rowObj.curamt);
	selectedDetailRow();
}

// 验证编辑区金额
function checkAMT2(obj) {
	obj.value = obj.value.replace(/,/g, "");
	if (Number(mainRow.curamt) >= 0) {
		mainRow.curamt = accSub(initamt, getTdetailsumAmtColumnidamt());
		if (Number(mainRow.curamt) < 0) {
			alert('输入金额已超出可用金额!');
			obj.value = 0;
			datasynch();
			mainRow.curamt = accSub(initamt, calTDtailTotalAmt());
			tmain.draw();
			return;
		}
		tmain.data[mainrownum].checked = true;
		tmain.draw();
	}
	selectedDetailRow();
}

// 计算明细金额合计数
function calTDtailTotalAmt() {
	var tatalAmt = Number(0);
	var rowObj;
	for (var i = 0; i < tdetail.data.length; i++) {
		rowObj = tdetail.data[i];
		tatalAmt = accAdd(Number(rowObj.amt), tatalAmt);
	}
	return tatalAmt;
}

