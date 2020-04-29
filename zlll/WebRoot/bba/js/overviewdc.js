/*******************************/
/************此处js是对 借方（字段element02）、贷方(字段element03)的弹窗添加过滤条件，
所以引用使用此文件时，应放在文件的底部*******************/
//重写借方，通过收支类型过滤
function element02_selecttree(inputObj) {
	var vouObj = new Object();
	var defaultValue = "";
	var anyvaluetag = 1;
	var rowObj;
	try {
		var tObj = eval("tmain");
		if (typeof (tObj) == "object" && tObj.objecttype == "datatable") {
			var selectRows = tObj.getSelectedRow();
			if (selectRows.length > 0) {
				rowObj = selectRows[0];
			}
		}
	} catch (e) {
	}
	if (1 == 1) {
		if (typeof (rowObj) == "object"
				&& typeof (rowObj.element02) != "undefined"
				&& "0" != rowObj.element02) {
			defaultValue = rowObj.element02_code;
		} else {
			if (inputObj.valuecode != undefined && inputObj.valuecode != '') {
				var defv = inputObj.valuecode.split(',');
				defaultValue = defv[defv.length - 1];
			}
		}
	}
	var elementfilter=$("detailform").budgetincometype.valueid;
	if(elementfilter=='' || elementfilter==null){
		elementfilter ="dctype=-999";
	}else{
		elementfilter ="dctype="+$("detailform").budgetincometype.valueid;
	}
	
	selectElementTreeForEditWithFieldCTRL(mainmenu, submenu, tmain.vchtypecode,
			"element02", inputObj, vouObj, defaultValue, anyvaluetag, "link",
			"0", elementfilter);
}

//重写贷方 通过收支类型过滤
function element03_selecttree(inputObj) {
	var vouObj = new Object();
	var defaultValue = "";
	var anyvaluetag = 1;
	var rowObj;
	try {
		var tObj = eval("tmain");
		if (typeof (tObj) == "object" && tObj.objecttype == "datatable") {
			var selectRows = tObj.getSelectedRow();
			if (selectRows.length > 0) {
				rowObj = selectRows[0];
			}
		}
	} catch (e) {
	}
	if (1 == 1) {
		if (typeof (rowObj) == "object"
				&& typeof (rowObj.element03) != "undefined"
				&& "0" != rowObj.element03) {
			defaultValue = rowObj.element03_code;
		} else {
			if (inputObj.valuecode != undefined && inputObj.valuecode != '') {
				var defv = inputObj.valuecode.split(',');
				defaultValue = defv[defv.length - 1];
			}
		}
	}
	var elementfilter=$("detailform").budgetincometype.valueid;
	if(elementfilter=='' || elementfilter==null){
		elementfilter ="dctype=-999";
	}else{
		elementfilter ="dctype="+$("detailform").budgetincometype.valueid;
	}
	selectElementTreeForEditWithFieldCTRL(mainmenu, submenu, tmain.vchtypecode,
			"element03", inputObj, vouObj, defaultValue, anyvaluetag, "link",
			"0", elementfilter);
}

//重写收支类型，主要是为了能自动获取收支类型对应的借贷科目能自动填充
function budgetincometype_selecttree(inputObj) {
	var beforeValue = $("detailform").budgetincometype.value;
	var vouObj = new Object();
	var defaultValue = "";
	var anyvaluetag = 1;
	var rowObj;
	try {
		var tObj = eval("tmain");
		if (typeof (tObj) == "object" && tObj.objecttype == "datatable") {
			var selectRows = tObj.getSelectedRow();
			if (selectRows.length > 0) {
				rowObj = selectRows[0];
			}
		}
	} catch (e) {
	}
	if (1 == 1) {
		if (typeof (rowObj) == "object"
				&& typeof (rowObj.budgetincometype) != "undefined"
				&& "0" != rowObj.budgetincometype) {
			defaultValue = rowObj.budgetincometype_code;
		} else {
			if (inputObj.valuecode != undefined && inputObj.valuecode != '') {
				var defv = inputObj.valuecode.split(',');
				defaultValue = defv[defv.length - 1];
			}
		}
	}
	selectElementTreeForEditWithFieldCTRL(mainmenu, submenu, tmain.vchtypecode,
			"budgetincometype", inputObj, vouObj, defaultValue, anyvaluetag,
			"link", "0", "");
	//如果没有选择值或前、后选择的值一样
    if(inputObj.value=='' || inputObj.value==beforeValue){
    	return;
    }
    dcAccountRequest();
}

//显示借贷科目
function dcAccountRequest(){
	var value = $("detailform").budgetincometype.valueid;
	if (value == '' || value == null) {
		value = "-999";
		return;
	} else {
		value =  $("detailform").budgetincometype.valueid;
	}
	
	var url ='/bba/common/findAccount.do?';
	var pars ='dctype='+value;
	showAccountRequest(url, pars);
}

//请求的借贷科目
function showAccountRequest(url, pars) {
	var myAjax = new Ajax.Request(url, {
		method : 'post',
		parameters : pars,
		onComplete : showAccountResponse
	});
}

// ajax请求成功后响应借贷科目
function showAccountResponse(request) {
	eval("var jsonObj = " + request.responseText);
	if (jsonObj.errObj != null) {
		alert(jsonObj.errObj);
	}
	// 借
	var fromJson = jsonObj.fromDcObj;
	if (fromJson == null || fromJson == undefined) {
		$("detailform").element02.valueid = "";
		$("detailform").element02.value = "";
		fromJson = new Array();
		var fromObj = new Object();
		fromJson.push(fromObj);
	} else {
		$("detailform").element02.valueid = fromJson[0].itemid;
		$("detailform").element02.value = fromJson[0].code + "-" + fromJson[0].name;
	}
	// 贷
	var toJson = jsonObj.toDcObj;
	if (toJson == null || toJson == undefined) {
		$("detailform").element03.valueid = "";
		$("detailform").element03.value = "";
		toJson = new Array();
		var toObj = new Object();
		toJson.push(toObj);
	} else {
		$("detailform").element03.valueid = toJson[0].itemid;
		$("detailform").element03.value = toJson[0].code + "-" + toJson[0].name;
	}
	doSpecProcess(fromJson[0],toJson[0]);
}

//特殊处理,默认实现
function doSpecProcess(fromObj,toObj){
	var rowObj;
	for(var i = 0;i<tdetail.data.length;i++){
		rowObj = tdetail.data[i];
		if(rowObj.checked==true){
			//借
			rowObj.element02=fromObj.itemid;
			rowObj.element02_code=fromObj.code;
			rowObj.element02_name=fromObj.name;
			//贷
			rowObj.element03=toObj.itemid;
			rowObj.element03_code=toObj.code;
			rowObj.element03_name=toObj.name;
		}
	}
	tdetail.show();
}

/**
 * 重写支付方式，除现金外，收款人账号及收款人名称必填。
 */
function payclass_selecttree(inputObj) {
	var vouObj = new Object();
	var defaultValue = "";
	var anyvaluetag = 1;
	var rowObj;
	try {
		var tObj = eval("tmain");
		if (typeof (tObj) == "object" && tObj.objecttype == "datatable") {
			var selectRows = tObj.getSelectedRow();
			if (selectRows.length > 0) {
				rowObj = selectRows[0];
			}
		}
	} catch (e) {
	}
	if (1 == 1) {
		if (typeof (rowObj) == "object"
				&& typeof (rowObj.payclass) != "undefined"
				&& "0" != rowObj.payclass) {
			defaultValue = rowObj.payclass_code;
		} else {
			if (inputObj.valuecode != undefined && inputObj.valuecode != '') {
				var defv = inputObj.valuecode.split(',');
				defaultValue = defv[defv.length - 1];
			}
		}
	}
	selectElementTreeForEditWithFieldCTRL(mainmenu, submenu, tmain.vchtypecode,
			"payclass", inputObj, vouObj, defaultValue, anyvaluetag, "link",
			"0", "");
	var payValue = inputObj.value;
	_pay_class_code = payValue.split('-')[0];
	//现金 skaccountno skaccountno 		
	if (_pay_class_code == 1) {
		isDisabled('skaccountno', true);
		isDisabled('skaccountno_btn', true);
		isDisabled('skaccountname', true);
		addStarflag('收款人账号', false);
		addStarflag('收款人名称', false);
		$('skaccountno').value="";
		$('skaccountname').value="";
	} else if (_pay_class_code > 1){
		isDisabled('skaccountno', false);
		isDisabled('skaccountno_btn', false);
		isDisabled('skaccountname', false);
		addStarflag('收款人账号', true);
		addStarflag('收款人名称', true);
	}else{
		//第一次选择空时，不处理
	}
}