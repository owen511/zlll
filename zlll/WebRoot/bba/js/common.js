var isIndex = true;// �Ƿ��ѯҳ��(���������޸�ҳ)
var _pay_class_code =0;//֧����ʽ����
// ����
function add() {
	window.location.href = './add.do?' + commonMenu;
}

// �޸�
function mod() {
	var selectedrow = tmain.getSelectedRow();
	if (selectedrow.length == 0) {
		alert("��ѡ��Ҫ�޸ĵĵ��ݣ�");
		return;
	}
	if (selectedrow.length > 1) {
		alert("��ѡ�������ݽ����޸ģ�");
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
		alert("�����޸�����¼��ĵ��ݣ�");
		return;
	}
}

// �ܷ��޸�
function canMod() {
	var index = tmain.getSelectedRow()[0].wfstatus_name.indexOf('�˻�');
	if (tmain.getSelectedRow()[0].wfstatus != "00" && index < 0) {
		alert("ֻ���޸ġ���¼�롿���˻ء�״̬�ĵ��ݣ�������ѡ��");
		return false;
	}
	return true;
}

// �ܷ�ɾ��
function canDel() {
	var selectedrow = tmain.getSelectedRow();
	for (var i = 0; i < selectedrow.length; i++) {
		var index = tmain.getSelectedRow()[i].wfstatus_name.indexOf('�˻�');
		if (selectedrow[i].wfstatus != '00' && index < 0) {
			alert("ֻ��ɾ������¼�롿���˻ء�״̬���ݣ����飡");
			return false;
		}
	}
	return true;
}

// ɾ��
function del() {
	var selectedrow = tmain.getSelectedRow();
	if (selectedrow.length < 1) {
		alert("��ѡ��Ҫɾ���ĵ��ݣ�");
		return;
	}
	if (!canDel()) {
		return;
	}
	if (confirm('ȷ��Ҫɾ����ѡ������?')) {
		var billids = getAllSelectedBillid(selectedrow);
		var url = "./delete.do?" + commonMenu + "&random=" + Math.random();
		var pars = 'selectedbillids=' + billids;
		show();
		ajaxsubmit(url, pars, delSuccess);
	}
}

// ����
function cancel() {
	if (tmain.data.length > 0 && confirm("����δ���棬�Ƿ񱣴�����?")) {
		savedata(false);
	} else {
		var url = "./index.do?" + commonMenu;
		window.location.href = url;
	}
}

// ������ϸ
function addDetail() {
	if (chkAddRowData()) {
		return;
	}
	var itemrow = new Object();
	tdetail.appendRow(itemrow);
	tdetail.selectedrow(itemrow, true);
}

// ɾ��
function delDetail() {
	if (tdetail.getSelectedRow() == null || tdetail.getSelectedRow() == "") {
		alert("��ѡ��Ҫɾ������ϸ");
		return;
	}
	tdetail.removeSelected();
	selectedDetailRow();
}

// ��֤�����ʱ�ı����� add
function chkAddRowData() {
	return false;
}

//Ĭ�����һ��ѡ��
function selectedDetailRow() {
	var length = tdetail.data.length;
	for (var i = 0; i < length; i++) {
		if (i == length - 1) {// ���һ��
			tdetail.data[i].checked = true;
		} else {
			tdetail.data[i].checked = false;
		}
	}
	tdetail.show();
}
// ����
function sendaudit(warnMsg) {
	var selectRows = tmain.getSelectedRow();
	if (selectRows.length < 1) {
		alert("��ѡ��Ҫ" + warnMsg + "�ĵ��ݣ�");
		return;
	}

	if (!confirm("�Ƿ�" + warnMsg + "?")) {
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

// ȡ������
function cancelsendaudit(warnMsg) {
	var selectRows = tmain.getSelectedRow();
	if (selectRows.length < 1) {
		alert("��ѡ��Ҫȡ��" + warnMsg + "�ĵ��ݣ�");
		return;
	}
	if (!confirm("ȷ��ȡ��" + warnMsg + "?")) {
		return;
	}
	var billids = getAllSelectedBillid(selectRows);
	var url = "./audit.do?" + commonMenu + "&random=" + Math.random();
	var pars = 'selectedbillids=' + billids + "&operatetype=12&iscancel=true";
	show();
	ajaxsubmit(url, pars, afterOperation);
}

// ���
function audit(operatetype) {
	var selectRows = tmain.getSelectedRow();
	if (selectRows.length < 1) {
		alert("��ѡ��Ҫ�����ĵ��ݣ�");
		return;
	}
	// Ĭ��������
	if (!fillAuditInfo(tmain, 0, 'ͬ��')) {
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

// ȡ�����
function cancelaudit(operatetype) {
	var selectRows = tmain.getSelectedRow();
	if (selectRows.length < 1) {
		alert("��ѡ��Ҫ�����ĵ��ݣ�");
		return;
	}
	// Ĭ��������
	if (!fillAuditInfo(tmain, 0, 'ȡ�����')) {
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

// ����
function abolish() {
	var selectRows = tmain.getSelectedRow();
	if (selectRows.length < 1) {
		alert("��ѡ��Ҫ���ϵĵ��ݣ�");
		return;
	}

	// ����Ƿ�����
	if (checkisabolish(selectRows)) {
		return;
	}

	if (!confirm("�Ƿ�����?")) {
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

// �˻�
function doback() {
	var selectRows = tmain.getSelectedRow();
	if (selectRows.length < 1) {
		alert("��ѡ��Ҫ�����ĵ��ݣ�");
		return;
	}
	// Ĭ��������
	if (!fillAuditInfo(tmain, 0, '�˻�')) {
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

// ȡ���˻�
function docancelback() {
	var selectRows = tmain.getSelectedRow();
	if (selectRows.length < 1) {
		alert("��ѡ��Ҫ�����ĵ��ݣ�");
		return;
	}
	// Ĭ��������
	if (!fillAuditInfo(tmain, 0, 'ȡ���˻�')) {
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

//������Ͷ���ͳһ���
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
 * ��鵥���Ƿ�����
 * 
 * @param selectRows
 * @return
 */
function checkisabolish(selectRows) {
	var reflag = false;
	var aertMsg = "";
	for (var i = 0; i < selectRows.length; i++) {
		var index = selectRows[i].wfstatus_name.indexOf('������');
		if (index >= 0) {
			if (aertMsg.length > 0) {
				aertMsg += "\n";
			}
			aertMsg += "�����ٲ����������ϡ����ݣ�������ѡ��";
			if (aertMsg != "") {
				alert(aertMsg);
				reflag = true;
				break;
			}
		}
	}
	return reflag;
}
// ҳǩ��ѯ
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

// ҳǩ��ѯ---��ҳ
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

// ҳǩ��ѯ�ֲ�ˢ��ҳ��.
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
// ��ˢ��ҳ���������µ���״̬
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

// ��ȡ�޸�����
function getChangeDatas() {
	var changeDatas = new Array();
	var selectRows = tmain.getSelectedRow();
	for (var i = 0; i < selectRows.length; i++) {
		var rowObj = selectRows[i];
		var data = new Object();
		data.billid = rowObj.billid;
		// ������
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

// ����ѡ����id��,��','����ִ�.
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

// ajax�ύ����.
function ajaxsubmit(url, pars, callbackFunction) {
	var myAjax = new Ajax.Request(url, {
		method : 'post',
		parameters : pars,
		onComplete : callbackFunction,
		onFailure : function(resp) {
			closeDiv();
			alert("����ʧ�ܣ�");
		}
	});
}

// ɾ���ص�����
function delSuccess(resp) {
	var json = resp.responseText.evalJSON(true);
	closeDiv();
	if (json.statuCode != null && json.statuCode == 100 && json.warnmsg != null
			&& json.warnmsg != "") {
		alert(json.warnmsg);
	}
	$('queryform').dosubmit();
}

// �������޸�ʱ����ɹ������ص�����(ajax)
function ajaxSaveSuccess(resp) {
	var json = resp.responseText.evalJSON(true)
	closeDiv();
	if (json.statuCode == 100) {
		alert(json.warnmsg);
		return;
	}
	alert('�����ɹ���');
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

/** *********���ú��� �ַ����������������� start************************ */


//���ƶ���
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
// ���¡
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
 * ��JavaScript ���ţ�����Java��this.jsonString.startsWith(prefix) �ж��ַ����Ƿ�����strΪ��ͷ��
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

// �ж��������Ƿ����ĳԪ��.
Array.prototype.contains = function(arr) {
	for (var i = 0; i < this.length; i++) {// thisָ������������������Ķ���
		if (this[i] == arr) {
			return true;
		}
	}
	return false;
}
/** *********���ú��� �ַ������� end************************ */


//���úϼ����ۼƽ��,
//����tmain����tdetail������show(),draw()�����ٵ��ã����ܿ���Ч��
function setTotalAmt(objId,value){
	JQ("#"+objId).text(String(value).toMoneyFormat());
}

//��ȡ�ϼ����н���еĺϼƽ��
function getSumAmtColumnAmt(objId) {
	var totalamt = JQ("#"+objId).text();
	return totalamt.replace(/,/g, "");
}


//�����˺�
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
 * ��Ӻ���*
 * @param context �ؼ�����
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
 * ��ֹ�����ÿؼ�.
 * @param id �ؼ�ID
 * @param flag true-��ֹ false -����
 */
function isDisabled(id,flag){
	$(id).disabled=flag;
}

/**
 * ��֤�տ�����Ϣ�Ƿ�Ϊ��.
 */
function checkSkaccountno(){
	if (_pay_class_code != 1) {// �����ֽ�ʱ
		var noValue = $('skaccountno').value;
		var nameValue = $('skaccountname').value;
		if (noValue == null || noValue.trim() == "") {
			alert('�տ����˺Ų���Ϊ�գ�');
			return false;
		}
		if (nameValue == null || nameValue.trim() == "") {
			alert('�տ������Ʋ���Ϊ�գ�');
			return false;
		}
	}
	return true;
}