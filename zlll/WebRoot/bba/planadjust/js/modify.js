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
tempamt =editformobj.amt;

