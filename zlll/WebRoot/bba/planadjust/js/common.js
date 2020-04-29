var initamt = 0;// 初始可用金额
var mainrownum = 0;// 主单选择的行号
var tempamt =0;//修改前后的差额
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
			dcAccountRequest();
			return;
		} else {
			tmain.data[mainrownum].checked = true;
			tmain.data[nextSelectedRow.rownum].checked = false;
			tmain.show();
			//JQ("#tmainsumAmtColumnidcuramt").text(String(tmain.data[mainrownum].curamt).toMoneyFormat());
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
	dcAccountRequest();
}

//初始化数据，含克隆。
function initCloneObj(row){
	initamt = row.curamt;
	mainrownum = row.rownum;
	//JQ("#tmainsumAmtColumnidcuramt").text(String(initamt).toMoneyFormat());
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
	changeColor();
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
	var mainVoucher = subeditData();
	//来源数据
	var fromObj = preSelectedRow;
	fromObj.dc = 1;
	fromObj.amt = -mainVoucher.amt;
	//去向数据
	var toObj = tdetail.data[0];
	toObj.dc = -1;
	toObj.amt = mainVoucher.amt;
	mainVoucher.startamt = mainVoucher.amt;
	mainVoucher.fromctrlid = fromObj.ctrlid;
	mainVoucher.ctrlid = fromObj.ctrlid;
	var details = new Array();
	details[0] = fromObj;
	details[1] = toObj;
	mainVoucher.details = details;
	var url = "./ajaxAddSave.do?";
	if (!isAddPage) {// 修改页
		url = "./ajaxModifySave.do?";
		mainVoucher.tempamt=accSub(mainVoucher.amt,tempamt);
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
