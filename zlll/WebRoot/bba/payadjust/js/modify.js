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
//初始金额=可用额度+被编辑的单据金额
initamt=accAdd(preSelectedRow.curamt,editformobj.amt);
hasStarflag(editformobj);

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