isAddPage = false;
var editformobj = mainJson[0];
datasynchfromtable(editformobj);
tmain.data[0].checked=true;
tmain.show();
tdetail.data[0].checked=true;
for(var i = 0 ; i<tdetail.data.length;i++){
	tdetail.data[i].initamt=tdetail.data[i].amt;
	tdetail.data[i].ctrlid=tmain.data[0].ctrlid;
}
tdetail.show();
preSelectedRow = tmain.data[0];
cloneSelectedRow = cloneObj(preSelectedRow);
//��ʼ���=���ö��+���༭�ĵ��ݽ��
initamt=accAdd(preSelectedRow.curamt,editformobj.amt);

_pay_class_code=editformobj.payclass_code;
if (_pay_class_code == 1) {
	isDisabled('skaccountno', true);
	isDisabled('skaccountno_btn', true);
	isDisabled('skaccountname', true);
	addStarflag('�տ����˺�', false);
	addStarflag('�տ�������', false);
} else {
	isDisabled('skaccountno', false);
	isDisabled('skaccountno_btn', false);
	isDisabled('skaccountname', false);
	addStarflag('�տ����˺�', true);
	addStarflag('�տ�������', true);
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
		tdetail.data[i].tempamt = accSub(tdetail.data[i].amt,tdetail.data[i].initamt);
	}
	tdetail.show();
}