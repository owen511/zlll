var initamt = 0;// ��ʼ���ý��
var mainrownum = 0;// ����ѡ����к�
var tempamt =0;//�޸�ǰ��Ĳ��
var preSelectedRow;//ǰ��ѡ�е��ж���,��ͬ�����༭��
var nextSelectedRow;//���ѡ�е��ж���,�ж�ǰ������ѡ����Ƿ�ͬһ����
var cloneSelectedRow;//���Ƶ�ѡ�е��ж���,��ͬ������ϸ��
var cloneSelectedRow2;//���Ƶ�ѡ�е��ж���,���ڻָ�����
var tdetail= new dataTable();//��ϸ���
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
	// ��һ��ѡ��
	if (row.checked) {
		initCloneObj(row);
	}
	datasynchfromtable(preSelectedRow);
	tdetail.appendRow(cloneSelectedRow);
	setDisabled(false);
	dcAccountRequest();
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

//��������¼�
function mainclick(row) {
	tdetail.data = row.details;
	tdetail.show();
	changeColor();
}

//�Ա���Ϣ����ͬ�ı��ɫ
function changeColor() {
	for (var j = 0; j < tdetail.columnConfig.length; j++) {// ѭ����ϸ��
		var col = tdetail.columnConfig[j];
		var firObj = tdetail.data[0];
		var secObj = tdetail.data[1];
		if (secObj[col.id] != firObj[col.id]) {
			var strShowFunc = eval(col.show) + "";// ��ȡcol.show���ַ���
			//var obj = JQ("#tdetail-" + col.id + "-1")[0];
//			if (col.type == 'M') {
//				JQ("#tdetail-" + col.id + "-1")[0].innerHTML = "<div style='color:red'>"
//						+ String(secObj[col.id]).toMoneyFormat() + "</div>";
//			} else if (strShowFunc.indexOf('showElement') > 0) {// Ҫ��
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
// ��������
function savedata(flag) {
	if (!addEditFormInput()) {
		return;
	}
	var mainVoucher = subeditData();
	//��Դ����
	var fromObj = preSelectedRow;
	fromObj.dc = 1;
	fromObj.amt = -mainVoucher.amt;
	//ȥ������
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
	if (!isAddPage) {// �޸�ҳ
		url = "./ajaxModifySave.do?";
		mainVoucher.tempamt=accSub(mainVoucher.amt,tempamt);
	}
	url += commonMenu + "&math=" + Math.random();
	var pars = "maindata=[" + Object.toJSON(mainVoucher) + "]";
	operator = flag;
	show();
	ajaxsubmit(url, pars, ajaxSaveSuccess);
}

// ��֤�༭�����
function checkAMT(obj) {
	obj.value = obj.value.replace(/,/g, "");
	if (Number(initamt) < Number(obj.value)) {
		alert('�������ѳ������ý��!');
		obj.value = "0.00";
	}
	var rowObj = tmain.getSelectedRow()[0];
	rowObj.curamt = accSub(initamt, Number(obj.value));
	tmain.data[mainrownum].checked = true;
	tmain.draw();
	setTotalAmt('tmainsumAmtColumnidcuramt',rowObj.curamt);
	datasynch();
}
