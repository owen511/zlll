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

tdetail2.data[0].checked=true;
tdetail2.show();
preSelectedRow = tmain.data[0];
cloneSelectedRow = cloneObj(preSelectedRow);
//��ʼ���=���ö��+���༭�ĵ��ݽ��
initamt=accAdd(preSelectedRow.curamt,editformobj.amt);
hasStarflag(editformobj);

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