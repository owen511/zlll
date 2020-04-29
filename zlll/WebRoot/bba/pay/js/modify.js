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
//初始金额=可用额度+被编辑的单据金额
initamt=accAdd(preSelectedRow.curamt,editformobj.amt);

_pay_class_code=editformobj.payclass_code;
if (_pay_class_code == 1) {
	isDisabled('skaccountno', true);
	isDisabled('skaccountno_btn', true);
	isDisabled('skaccountname', true);
	addStarflag('收款人账号', false);
	addStarflag('收款人名称', false);
} else {
	isDisabled('skaccountno', false);
	isDisabled('skaccountno_btn', false);
	isDisabled('skaccountname', false);
	addStarflag('收款人账号', true);
	addStarflag('收款人名称', true);
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
		tdetail.data[i].tempamt = accSub(tdetail.data[i].amt,tdetail.data[i].initamt);
	}
	tdetail.show();
}