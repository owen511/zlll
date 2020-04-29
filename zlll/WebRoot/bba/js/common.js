var isIndex = true;// 是否查询页，(除新增、修改页)
var _pay_class_code =0;//支付方式编码
// 新增
function add() {
	window.location.href = './add.do?' + commonMenu;
}

// 修改
function mod() {
	var selectedrow = tmain.getSelectedRow();
	if (selectedrow.length == 0) {
		alert("请选择要修改的单据！");
		return;
	}
	if (selectedrow.length > 1) {
		alert("请选择单条单据进行修改！");
		return;
	}
	if (!canMod()) {
		return;
	}
	if (userid == selectedrow[0].creater) {
		var selectedbillid = selectedrow[0].billid;
		var url = "./modify.do?" + commonMenu + "&selectedbillids="
				+ selectedbillid + "&random=" + Math.random();
		window.location.href = url;
	} else {
		alert("不能修改他人录入的单据！");
		return;
	}
}

// 能否修改
function canMod() {
	var index = tmain.getSelectedRow()[0].wfstatus_name.indexOf('退回');
	if (tmain.getSelectedRow()[0].wfstatus != "00" && index < 0) {
		alert("只能修改【已录入】或【退回】状态的单据，请重新选择！");
		return false;
	}
	return true;
}

// 能否删除
function canDel() {
	var selectedrow = tmain.getSelectedRow();
	for (var i = 0; i < selectedrow.length; i++) {
		var index = tmain.getSelectedRow()[i].wfstatus_name.indexOf('退回');
		if (selectedrow[i].wfstatus != '00' && index < 0) {
			alert("只能删除【已录入】或【退回】状态单据，请检查！");
			return false;
		}
	}
	return true;
}

// 删除
function del() {
	var selectedrow = tmain.getSelectedRow();
	if (selectedrow.length < 1) {
		alert("请选择要删除的单据！");
		return;
	}
	if (!canDel()) {
		return;
	}
	if (confirm('确定要删除所选单据吗?')) {
		var billids = getAllSelectedBillid(selectedrow);
		var url = "./delete.do?" + commonMenu + "&random=" + Math.random();
		var pars = 'selectedbillids=' + billids;
		show();
		ajaxsubmit(url, pars, delSuccess);
	}
}

// 返回
function cancel() {
	if (tmain.data.length > 0 && confirm("数据未保存，是否保存数据?")) {
		savedata(false);
	} else {
		var url = "./index.do?" + commonMenu;
		window.location.href = url;
	}
}

// 新增明细
function addDetail() {
	if (chkAddRowData()) {
		return;
	}
	var itemrow = new Object();
	tdetail.appendRow(itemrow);
	tdetail.selectedrow(itemrow, true);
}

// 删除
function delDetail() {
	if (tdetail.getSelectedRow() == null || tdetail.getSelectedRow() == "") {
		alert("请选择要删除的明细");
		return;
	}
	tdetail.removeSelected();
	selectedDetailRow();
}

// 验证添加行时的必填项 add
function chkAddRowData() {
	return false;
}

//默认最后一条选中
function selectedDetailRow() {
	var length = tdetail.data.length;
	for (var i = 0; i < length; i++) {
		if (i == length - 1) {// 最后一条
			tdetail.data[i].checked = true;
		} else {
			tdetail.data[i].checked = false;
		}
	}
	tdetail.show();
}
// 送审
function sendaudit(warnMsg) {
	var selectRows = tmain.getSelectedRow();
	if (selectRows.length < 1) {
		alert("请选择要" + warnMsg + "的单据！");
		return;
	}

	if (!confirm("是否" + warnMsg + "?")) {
		return;
	}
	var billids = getAllSelectedBillid(selectRows);
	var changeDatas = getChangeDatas();
	var url = "./audit.do?" + commonMenu + "&random=" + Math.random();
	var pars = 'selectedbillids=' + billids + "&operatetype=12&changedatas="
			+ changeDatas;
	show();
	ajaxsubmit(url, pars, afterOperation);
}

// 取消送审
function cancelsendaudit(warnMsg) {
	var selectRows = tmain.getSelectedRow();
	if (selectRows.length < 1) {
		alert("请选择要取消" + warnMsg + "的单据！");
		return;
	}
	if (!confirm("确认取消" + warnMsg + "?")) {
		return;
	}
	var billids = getAllSelectedBillid(selectRows);
	var url = "./audit.do?" + commonMenu + "&random=" + Math.random();
	var pars = 'selectedbillids=' + billids + "&operatetype=12&iscancel=true";
	show();
	ajaxsubmit(url, pars, afterOperation);
}

// 审核
function audit(operatetype) {
	var selectRows = tmain.getSelectedRow();
	if (selectRows.length < 1) {
		alert("请选择要操作的单据！");
		return;
	}
	// 默认审核意见
	if (!fillAuditInfo(tmain, 0, '同意')) {
		return;
	}
	var billids = getAllSelectedBillid(selectRows);
	var changeDatas = getChangeDatas();
	var url = "./audit.do?" + commonMenu + "&random=" + Math.random();
	var pars = 'selectedbillids=' + billids + '&operatetype=' + operatetype
			+ '&changedatas=' + changeDatas;
	show();
	ajaxsubmit(url, pars, afterOperation);
}

// 取消审核
function cancelaudit(operatetype) {
	var selectRows = tmain.getSelectedRow();
	if (selectRows.length < 1) {
		alert("请选择要操作的单据！");
		return;
	}
	// 默认审核意见
	if (!fillAuditInfo(tmain, 0, '取消审核')) {
		return;
	}
	var billids = getAllSelectedBillid(selectRows);
	var url = "./audit.do?" + commonMenu + "&random=" + Math.random();
	var changeDatas = getChangeDatas();
	var pars = 'iscancel=true&selectedbillids=' + billids + '&operatetype='
			+ operatetype + '&changedatas=' + changeDatas;
	show();
	ajaxsubmit(url, pars, afterOperation);
}

// 作废
function abolish() {
	var selectRows = tmain.getSelectedRow();
	if (selectRows.length < 1) {
		alert("请选择要作废的单据！");
		return;
	}

	// 检查是否作废
	if (checkisabolish(selectRows)) {
		return;
	}

	if (!confirm("是否作废?")) {
		return;
	}
	var changeDatas = getChangeDatas();
	var billids = getAllSelectedBillid(selectRows);
	var url = "./audit.do?" + commonMenu + "&random=" + Math.random();
	var pars = 'selectedbillids=' + billids + "&operatetype=51&changedatas="
			+ changeDatas;
	show();
	ajaxsubmit(url, pars, afterOperation);
}

// 退回
function doback() {
	var selectRows = tmain.getSelectedRow();
	if (selectRows.length < 1) {
		alert("请选择要操作的单据！");
		return;
	}
	// 默认审核意见
	if (!fillAuditInfo(tmain, 0, '退回')) {
		return;
	}
	var billids = getAllSelectedBillid(selectRows);
	var url = "./audit.do?" + commonMenu + "&random=" + Math.random();
	var changeDatas = getChangeDatas();
	var pars = 'operatetype=13&selectedbillids=' + billids + '&changedatas='
			+ changeDatas;
	show();
	ajaxsubmit(url, pars, afterOperation);
}

// 取消退回
function docancelback() {
	var selectRows = tmain.getSelectedRow();
	if (selectRows.length < 1) {
		alert("请选择要操作的单据！");
		return;
	}
	// 默认审核意见
	if (!fillAuditInfo(tmain, 0, '取消退回')) {
		return;
	}
	var billids = getAllSelectedBillid(selectRows);
	var url = "./audit.do?" + commonMenu + "&random=" + Math.random();
	var changeDatas = getChangeDatas();
	var pars = 'operatetype=13&iscancel=true&selectedbillids=' + billids
			+ '&changedatas=' + changeDatas;
	show();
	ajaxsubmit(url, pars, afterOperation);
}

//审核类型动作统一入口
function doCommonAction(selectRows,operatetype,iscancel){
	var billids = getAllSelectedBillid(selectRows);
	var url = "./audit.do?" + commonMenu + "&random=" + Math.random();
	var changeDatas = getChangeDatas();
	var pars = 'operatetype='+operatetype+'&iscancel='+iscancel+'&selectedbillids=' + billids
			+ '&changedatas=' + changeDatas;
	show();
	ajaxsubmit(url, pars, afterOperation);
}

/**
 * 检查单据是否作废
 * 
 * @param selectRows
 * @return
 */
function checkisabolish(selectRows) {
	var reflag = false;
	var aertMsg = "";
	for (var i = 0; i < selectRows.length; i++) {
		var index = selectRows[i].wfstatus_name.indexOf('已作废');
		if (index >= 0) {
			if (aertMsg.length > 0) {
				aertMsg += "\n";
			}
			aertMsg += "不能再操作【已作废】单据，请重新选择！";
			if (aertMsg != "") {
				alert(aertMsg);
				reflag = true;
				break;
			}
		}
	}
	return reflag;
}
// 页签查询
function tabclick(index) {
	show();
	selectedTabIndex = index;
	initTabOnclickBeforQuery();
	var url = "./tabquery.do?" + commonMenu;
	var querycondition = getTagCondition($('queryform'));
	var pars = "tabcondition=" + tabpage_main.getSelectedTabFilter(index);
	if (querycondition != null && querycondition != "") {
		pars += "&" + querycondition;
	}
	ajaxsubmit(url, pars, tagqueryAfter);
}

// 页签查询---分页
function tabPageClick() {
	show();
	var url = "./tabquery.do?" + commonMenu;
	initPage(tmain);
	var querycondition = getTagCondition($('queryform'));
	var pars = "tabcondition="
			+ tabpage_main
					.getSelectedTabFilter(tabpage_main.currentSelectedTabIndex);
	if (querycondition != null && querycondition != "") {
		pars += "&" + querycondition;
	}
	ajaxsubmit(url, pars, tagqueryAfter);
}

// 页签查询局部刷新页面.
function tagqueryAfter(resp) {
	eval("var json = " + resp.responseText);
	if (json.statuCode != null && json.statuCode == 100 && json.warnmsg != null
			&& json.warnmsg != "") {
		alert(json.warnmsg);
	} else {
		tmain.data = json.result;
		setTabPage(tmain, json);
		tmain.show();
	}
	closeDiv();
}
// 不刷新页面操作后更新单据状态
function afterOperation(resp) {
	var json = resp.responseText.evalJSON(true);
	if (json.vous != null) {
		var apps = json.vous;
		var selectrows = tmain.getSelectedRow();
		for (var i = 0; i < apps.size(); i++) {
			for (var j = 0; j < selectrows.length; j++) {
				if (apps[i].billid == selectrows[j].billid) {
					selectrows[j].wfstatus_code = apps[i].wfstatus_code;
					selectrows[j].wfstatus_name = apps[i].wfstatus_name;
					selectrows[j].wfstatus = apps[i].wfstatus_code;
					selectrows[j].userid = apps[i].userid;
					selectrows[j].lastupdatetime = apps[i].lastupdatetime;
					updateRow2Column('tmain', 'edit_table');
				}
			}
		}
	}
	tmain.draw();
	closeDiv();
	if (json.statuCode != null && json.statuCode == 100 && json.warnmsg != null
			&& json.warnmsg != "") {
		alert(json.warnmsg);
	}
	if (alertinfo(tmain)) {
		tabclick(tabpage_main.currentSelectedTabIndex);
	}
}

// 获取修改数据
function getChangeDatas() {
	var changeDatas = new Array();
	var selectRows = tmain.getSelectedRow();
	for (var i = 0; i < selectRows.length; i++) {
		var rowObj = selectRows[i];
		var data = new Object();
		data.billid = rowObj.billid;
		// 审核意见
		if (rowObj.auditOpinion) {
			data.auditOpinion = rowObj.auditOpinion;
		}

		for (var j = 0; j < tmain.columnConfig.length; j++) {
			var col = tmain.columnConfig[j];
			if (col.id.indexOf(".input") > 0) {
				eval("data." + col.name + "=" + "rowObj." + col.name);
			}
		}
		try {
			if (typeof (eval('addChangeDatas')) == "function") {
				addChangeDatas(data, rowObj);
			}
		} catch (e) {

		}
		changeDatas[i] = data;
	}
	return changeDatas.toJSON();
}

// 所有选中行id集,以','组成字串.
function getAllSelectedBillid(selectrows) {
	var billids = "";
	if (selectrows.length > 0) {
		billids = tmain.getSelectedRow()[0].billid;
		for (var i = 1; i < selectrows.length; i++) {
			billids = billids + "," + tmain.getSelectedRow()[i].billid;
		}
	}
	return billids;
}

// ajax提交数据.
function ajaxsubmit(url, pars, callbackFunction) {
	var myAjax = new Ajax.Request(url, {
		method : 'post',
		parameters : pars,
		onComplete : callbackFunction,
		onFailure : function(resp) {
			closeDiv();
			alert("操作失败！");
		}
	});
}

// 删除回调函数
function delSuccess(resp) {
	var json = resp.responseText.evalJSON(true);
	closeDiv();
	if (json.statuCode != null && json.statuCode == 100 && json.warnmsg != null
			&& json.warnmsg != "") {
		alert(json.warnmsg);
	}
	$('queryform').dosubmit();
}

// 新增、修改时保存成功动作回调方法(ajax)
function ajaxSaveSuccess(resp) {
	var json = resp.responseText.evalJSON(true)
	closeDiv();
	if (json.statuCode == 100) {
		alert(json.warnmsg);
		return;
	}
	alert('操作成功！');
	var backUrl = null;
	if (operator == 'continue') {
		backUrl = "./add.do?";
	} else {
		backUrl = "./index.do?";
	}
	window.location.href = backUrl + commonMenu;
}

function setDisabled(flag) {
	if (flag == true) {
		disEnableEditFormInput();
	} else {
		enableEditFormInput();
	}
}

/** *********常用函数 字符串处理，浮点数计算 start************************ */


//复制对象
function cloneObj(data) {
	if (data == null)
		return null;
	var row = new Object();
	for ( var p in data) {
		if (p == "rownum")
			continue;
		if (p == "checked") {
			row.checked = false;
			continue;
		}
		if (p == "checkobj") {
			row.checkobj = new Object();
			row.checkobj.checked = false;
			continue;
		}
		eval("row." + p + "=data." + p);
	}
	return row;
}
// 深克隆
var cloneOpr = {
	cloneObj : function(obj) {
		var newObj = [];
		for ( var i in obj) {
			newObj[i] = obj[i];
		}
		return newObj;
	},
	cloneArr : function(arr) {
		var newArr = [];
		for (var i = 0; i < arr.length; i++) {
			if (typeof arr[i] === 'object') {
				newArr.push(this.cloneObj(arr[i]));
			} else {
				newArr.push(this[i]);
			}
		}
		return newArr;
	}
};

/**
 * 对JavaScript 扩张，类似Java中this.jsonString.startsWith(prefix) 判断字符串是否是以str为开头的
 */
String.prototype.startWith = function(str) {
	if (str == null || str == "" || this.length == 0
			|| str.length > this.length)
		return false;
	if (this.substr(0, str.length) == str)
		return true;
	else
		return false;
	return true;
}

// 判断数组中是否存在某元素.
Array.prototype.contains = function(arr) {
	for (var i = 0; i < this.length; i++) {// this指向真正调用这个方法的对象
		if (this[i] == arr) {
			return true;
		}
	}
	return false;
}
/** *********常用函数 字符串处理， end************************ */


//设置合计行累计金额,
//需在tmain、或tdetail在重新show(),draw()，后再调用，才能看到效果
function setTotalAmt(objId,value){
	JQ("#"+objId).text(String(value).toMoneyFormat());
}

//获取合计行中金额列的合计金额
function getSumAmtColumnAmt(objId) {
	var totalamt = JQ("#"+objId).text();
	return totalamt.replace(/,/g, "");
}


//付款账号
function showGatherAccountNo(payaccountno,payaccountname,obj){
	var	url =basePath+'/bba/common/showgatheraccountno.do?'+commonMenu+"&budgetagency="+obj.budgetagency;
	var ch = changeOpenObj();
	var result = ch.showModalDialog(url,window,'dialogWidth:800px;dialogHeight:600px;status:no;resizable:yes;help:No;scroll:yes;');
	if(result != null){				
 		$('skaccountno').value=result.skaccountno;
 		$('skaccountname').value=result.skaccountname;	
	}
}

/**
 * 添加红星*
 * @param context 控件名称
 * @param flag
 */
function addStarflag(context,flag){
    if(flag){
		JQ("div[align='left']:contains('"+context+"')").replaceWith("<div align=left>"+context+"<span>*</span></div>");
	}else{
		JQ("div[align='left']:contains('"+context+"')").replaceWith("<div align=left>"+context+"</div>");
	}
}

/**
 * 禁止或启用控件.
 * @param id 控件ID
 * @param flag true-禁止 false -启用
 */
function isDisabled(id,flag){
	$(id).disabled=flag;
}

/**
 * 验证收款人信息是否为空.
 */
function checkSkaccountno(){
	if (_pay_class_code != 1) {// 不是现金时
		var noValue = $('skaccountno').value;
		var nameValue = $('skaccountname').value;
		if (noValue == null || noValue.trim() == "") {
			alert('收款人账号不能为空！');
			return false;
		}
		if (nameValue == null || nameValue.trim() == "") {
			alert('收款人名称不能为空！');
			return false;
		}
	}
	return true;
}