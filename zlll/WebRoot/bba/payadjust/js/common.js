var initamt = 0;// ��ʼ���ý��
var mainrownum = 0;// ����ѡ����к�
var tobillcode = "";//����Ŀ����
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
//	var url = './findAdjustTarget.do?' + commonMenu + "&random=" + Math.random();
//	var pars = "&budgetagency=" + row.budgetagency + "&element01=0,1,3"
//			+ "&accountname=" + row.accountname + "&accountno=" + row.accountno
//			+ "&budgetproj=" + row.budgetproj;
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
	// ��һ��ѡ��
	if (row.checked) {
		initCloneObj(row);
	}
	datasynchfromtable(preSelectedRow);
	//showTargetRequest(url,pars);
	tdetail.appendRow(cloneSelectedRow);
	setDisabled(false);
	hasStarflag(preSelectedRow);
}

//��ʼ�����ݣ�����¡��
function initCloneObj(row){
	initamt = row.curamt;
	mainrownum = row.rownum;
	setTotalAmt('tmainsumAmtColumnidcuramt',initamt);
	//��¡����ͬ������ϸ
	cloneSelectedRow = cloneObj(row);
	cloneSelectedRow.checked=true;
	//cloneSelectedRow.amt="0.00";
	//cloneSelectedRow.billcode ="";
	
	//��¡�����ڻ�ԭ����
	cloneSelectedRow2 = cloneObj(row);
	cloneSelectedRow2.checked=true;
	//cloneSelectedRow2.amt="0.00";
	//cloneSelectedRow2.billcode ="";
	
	//ͬ�����༭��
	preSelectedRow = nextSelectedRow;
	preSelectedRow.amt = row.curamt;
	//preSelectedRow.amt="0.00";
	//preSelectedRow.billcode ="";
	
	//$("tobillcode_btn")=function(){alert('<<1>>');};
}

//��������¼�
function mainclick(row) {
	tdetail.data = row.details;
	tdetail.show();
	changeColor();
	//var obj = tdetail.data[0];
	//alert(obj.budgetincometype_code);
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
	if(!checkSkaccountno()){
		return;
	}
	var isNotTarget=tdetail2.data.length;
	var mainVoucher = subeditData();
	//��Դ����
	var fromObj =preSelectedRow;
	fromObj.dc = 1;
	fromObj.amt = -mainVoucher.amt;
	fromObj.billid = 0;
	//ȥ������
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
	if (!isAddPage) {// �޸�ҳ
		url = "./ajaxModifySave.do?";
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


////�����ѯ������ϸ
//function showTargetRequest(url, pars) {
//	var myAjax = new Ajax.Request(url, {
//		method : 'post',
//		parameters : pars,
//		onComplete : showTargetResponse
//	});
//}
//
////ajax����ɹ�����Ӧ,������ϸ 
//function showTargetResponse(request) {
//	eval("var tdetaildata = " + request.responseText);
//	tdetail.data = tdetaildata;
//	tdetail.show();
//	closeDiv();
//}

//���ҵ���Ŀ��
function onadjusttarget(){
	var selectRows = tmain.getSelectedRow();
	if (selectRows.length < 1) {
		alert("��ѡ��֧��ƾ֤��Ϣ��");
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
	param.billcode = selectRows[0].billcode;//���ڹ�����Դ����(�ϲ�ǰ)
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

//���ÿռ������á����á�
function setContrlDisabled(id,flag){
	document.getElementById(id).disabled=flag;
}

//�Ƿ��к���
function hasStarflag(obj) {
	_pay_class_code = obj.payclass_code;
	if (_pay_class_code == 1) {
		addStarflag('�տ����˺�', false);
		addStarflag('�տ�������', false);
		$('skaccountno').value = "";
		$('skaccountname').value = "";
	} else {
		addStarflag('�տ����˺�', true);
		addStarflag('�տ�������', true);
	}
}
