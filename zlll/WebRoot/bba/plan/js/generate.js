function generate(isYes,flag){
	var selectRows=tmain.getSelectedRow();
	if(selectRows.length<1){
		alert('请选择银行流水信息！');
		return;
	}
	if(isYes==1){
		if (!addEditFormInput()) {
			return;
		}
		var mainVoucher = subeditData();
		for(var i = 0;i<selectRows.length;i++){
			selectRows[i].text05 = mainVoucher.digest;
		}
	}
	var url = "./ajaxAddSave.do?";
	url += commonMenu + "&isCom="+isYes+"&math=" + Math.random();
	var pars = "maindata=" + Object.toJSON(selectRows);
	operator = flag;
	show();
	ajaxsubmit(url, pars, ajaxSaveSuccess);
}

function mainclick(row){
	if (typeof(tdetail)=='undefined' || tdetail == undefined){
		return;
	}
    tdetail.data = row.details;
    tdetail.show();
    updateRow2ColumnForDetail('edit_table_tdetail','tdetail');
}


function del2() {
	var selectedrow = tmain.getSelectedRow();
	if (selectedrow.length < 1) {
		alert("请选择要删除的单据！");
		return;
	}
	if (confirm('确定要删除所选单据吗?')) {
		var billcodes = getAllSelectedBillid(selectedrow);
		var url = "./delete.do?" + commonMenu + "&random=" + Math.random();
		var pars = 'selectedbillids=' + billcodes;
		show();
		ajaxsubmit(url, pars, delSuccess);
	}
}

function getAllSelectedBillid(selectrows) {
	var billcodes = "";
	if (selectrows.length > 0) {
		billcodes = "'"+tmain.getSelectedRow()[0].billcode+"'";
		for (var i = 1; i < selectrows.length; i++) {
			billcodes = billcodes + ",'" + tmain.getSelectedRow()[i].billcode+"'";
		}
	}
	return billcodes;
}

function delSuccess(resp) {
	var json = resp.responseText.evalJSON(true);
	closeDiv();
	alert(json.warnmsg);
	$('queryform').dosubmit();
}

//点击是否合并单选按钮.
function doRadio(flag) {
	if (flag == 1) {
		document.getElementById('isDisplay').style.display = "block";
		document.getElementById('btn_1').style.display = "block";
		document.getElementById('btn_0').style.display = "none";
	} else {
		document.getElementById('isDisplay').style.display = "none";
		document.getElementById('btn_1').style.display = "none";
		document.getElementById('btn_0').style.display = "block";
	}
}