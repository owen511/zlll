var mainRow;// ѡ�е���������
var initamt = 0;// ��ʼ���ý��
var tempamt =0;//�޸�ǰ��Ĳ��

var preSelectedRow;//ǰ��ѡ�е��ж���,��ͬ�����༭��
var nextSelectedRow;//���ѡ�е��ж���,�ж�ǰ������ѡ����Ƿ�ͬһ����
var cloneSelectedRow;//���Ƶ�ѡ�е��ж���,��ͬ������ϸ��
var cloneSelectedRow2;//���Ƶ�ѡ�е��ж���,���ڻָ�����
var mainrownum = 0;// ����ѡ����к�

//��������¼�(��ѡ��ť)
function mainradioclick(row) {// �����ǵ�ѡ��ť
	if (tmain.getSelectedRow().length == 0) {
		return;
	}
	nextSelectedRow = row;
	if (preSelectedRow != undefined && nextSelectedRow != preSelectedRow) {// ��2���Ժ�ѡ��
		if (confirm("�Ƿ�����༭��")) {
			//��ԭԭѡ������
			tmain.data[mainrownum]=cloneSelectedRow2;
			cloneSelectedRow2.checked = false;
			tmain.show();
			
			initCloneObj(row);
			clearEditFormInput();
			datasynchfromtable(preSelectedRow);
			// �������ϸ,�������ϸ
			tdetail.data = new Array();
			tdetail.appendRow(cloneSelectedRow);
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
	// ��һ��ѡ��
	if (row.checked) {
		initCloneObj(row);
	}
	datasynchfromtable(preSelectedRow);
	tdetail.appendRow(cloneSelectedRow);
	setDisabled(false);
}

//��ʼ�����ݣ�����¡��
function initCloneObj(row){
	initamt = row.curamt;
	mainrownum = row.rownum;
	//JQ("#tmainsumAmtColumnidcuramt").text(String(initamt).toMoneyFormat());
	setTotalAmt('tmainsumAmtColumnidcuramt',initamt);
	//��¡����ͬ������ϸ
	cloneSelectedRow = cloneObj(row);
	cloneSelectedRow.checked=true;
	cloneSelectedRow.amt="0.00";
	cloneSelectedRow.billcode ="";
	
	//��¡�����ڻ�ԭ����
	cloneSelectedRow2 = cloneObj(row);
	cloneSelectedRow2.checked=true;
	cloneSelectedRow2.amt="0.00";
	cloneSelectedRow2.billcode ="";
	
	//ͬ�����༭��
	preSelectedRow = nextSelectedRow;
	preSelectedRow.amt="0.00";
	preSelectedRow.billcode ="";
}

// �ӵ�����¼�(��ѡ��ť)
function detailradioclick(row) {
	// ͬ�����༭��
	datasynchfromtable(row);
}

// ������ϸ
function addDetail() {
	if (tmain.getSelectedRow().length==0) {
		alert("��ѡ��������ˮ��Ϣ��");
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
	// ͬ��Ĭ������
	$("detailform").amt_hid.value = "";
	$("detailform").amt.value = "";

	// ��ϸ�ϼƽ��
	var detailtotalamt = getTdetailsumAmtColumnidamt();
	tmain.data[mainrownum].checked = true;
	var iiamt = accSub(Number(initamt), Number(detailtotalamt));
	tmain.data[mainrownum].curamt = iiamt;
	tmain.draw();
	selectedDetailRow();// Ĭ�����һ��ѡ��
}

// ɾ����ϸ,
function delDetail() {
	if (tdetail.data.length<=1) {
		alert("��������һ����ȵǼ���ϸ��");
		return;
	}
	var rowObj=tmain.getSelectedRow()[0];
	tdetail.removeSelected();
	selectedDetailRow();
	//�ӵ�����¼�
	detailradioclick(tdetail.getSelectedRow()[0]);
	rowObj.curamt = accSub(initamt, calTDtailTotalAmt());
	tmain.data[mainrownum].checked = true;
	tmain.draw();
	//JQ("#tmainsumAmtColumnidcuramt").text(String(rowObj.curamt).toMoneyFormat());
	setTotalAmt('tmainsumAmtColumnidcuramt',rowObj.curamt);
}

// ��������
function savedata(flag) {
	if (tdetail.data.length == 0) {
		alert("������ÿ�ƻ���ϸ��");
		return;
	}
	if (!addEditFormInput()) {
		return;
	}
	var url = "./ajaxAddSave.do?";
	if (!isAddPage) {// �޸�ҳ
		url = "./ajaxModifySave.do?";
	}
	url += commonMenu + "&math=" + Math.random();
	var pars = "maindata=" + Object.toJSON(tdetail.data);
	operator = flag;
	show();
	ajaxsubmit(url, pars, ajaxSaveSuccess);
}

// ��ȡ��ϸ�ĺϼƽ��
function getTdetailsumAmtColumnidamt() {
	var totalamt = JQ("#tdetailsumAmtColumnidamt").text();
	return totalamt.replace(/,/g, "");
}

// ��֤�༭�����
function checkAMT(obj) {
	obj.value = obj.value.replace(/,/g, "");
	var rowObj = tmain.getSelectedRow()[0];
	if (Number(rowObj.curamt) >= 0) {
		if (Number(initamt) < calTDtailTotalAmt()) {
			alert('�������ѳ������ý��!');
			obj.value = "0.00";
			datasynch();
			rowObj.curamt = accSub(initamt, calTDtailTotalAmt());
			tmain.draw();
			setTotalAmt('tmainsumAmtColumnidcuramt',rowObj.curamt);
			return;
		}
		rowObj.curamt = accSub(initamt, calTDtailTotalAmt());
		tmain.data[mainrownum].checked = true;
		tmain.draw();
	}
	setTotalAmt('tmainsumAmtColumnidcuramt',rowObj.curamt);
	selectedDetailRow();
}

// ������ϸ���ϼ���
function calTDtailTotalAmt() {
	var tatalAmt = Number(0);
	var rowObj;
	for (var i = 0; i < tdetail.data.length; i++) {
		rowObj = tdetail.data[i];
		tatalAmt = accAdd(Number(rowObj.amt), tatalAmt);
	}
	return tatalAmt;
}

