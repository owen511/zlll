// 保存主单信息的变量
var mainVouch = null;

var detailObj=null;

var detailamtDefault = null;
//是否控制金额
var controlcurbal = true;

// 将选中的数据填写到编辑区内
function detailclick(){
	if(tdetail ==null ||tdetail.data == null || tdetail.data.length <1 ){
		return;
	}
	var selectrows = tdetail.getSelectedRow();
	if(selectrows.length == 0){
		// 用户只在表格上点击了一下，并没有选中任何行
		return ;
	}
	var selectrow=selectrows[0];
	
	if(detailObj != selectrow){
		if(checkNull()){
		    detailamtDefault = moneyFormatToNumber(selectrow.amt);
		    detailObj=selectrow;
			setDisabled(false);
	        //子编辑区
	        datasynchfromtable(detailObj);
			detailObj=selectrow;
		}
		else
		{
			selectrow.checked=false;
			detailObj.checked=true;
			if (window.event.srcElement.tagName == "INPUT"&&(window.event.srcElement.type == "checkbox"||window.event.srcElement.type == "radio")){
				window.event.srcElement.checked = false;
			}

			tdetail.draw();
		}
	}

}
//复制明细
function copyDetail(){
	if(tdetail ==null ||tdetail.data == null || tdetail.data.length <1 ){
		return;
	}
	var selectrows = tdetail.getSelectedRow();
	if(selectrows.length == 0){
		// 用户只在表格上点击了一下，并没有选中任何行
		return ;
	}
	var selectrow=selectrows[0];
  //复制数据
	var copydetailrow = Object.clone(selectrow);
	copydetailrow.checked=false;
	tdetail.appendRow(copydetailrow);
	tdetail.draw();
}
//增加明细
function addDetail(){
	if(mainVouch == null){
		alert("请选择来源单据！");
		return;
	}
	if(mainVouch.curbal != undefined && mainVouch.curbal !='null' && mainVouch.curbal==0&&controlcurbal){
		alert("可用余额已经为0,不能再增加明细了");
		return false;
	}
	if(!checkNull()) return;
	
	clearFormInput();
	
	// 通过主单信息创建一条明细数据
	var detailrow = Object.clone(mainVouch);
	if(typeof(switchBank)=="function"){
		detailrow = switchBank(detailrow);
	}
	detailrow.fromapp = mainVouch.billid;
	detailrow.details = null;
	
	//同步主编辑区数据给新加行
	
	maindatasynchtoObj(detailrow);	
	detailrow.amt = "";
	//setDefaultValue(detailrow);
	//datasynchtoObj(detailrow);
	
	//清除原数据的选择状态
	if(tdetail != null && tdetail.data != null && tdetail.data.length >0 ){
		for(var i=0;i<tdetail.data.length;i++){
			tdetail.data[i].checked=false;
		} 
	}
	
	//新增行默认选中状态
	detailrow.checked = true;
	
	tdetail.appendRow(detailrow);
	tdetail.draw();
	setDisabled(false);
	
	detailObj=detailrow;
	
	// 构造明细
	if(mainVouch.details == null){
		mainVouch.details = new Array();
	}

    detailamtDefault=0;
    
}
//删除明细
function delDetail(){
	if(detailObj==null){
    	alert("请选中要删除的明细！");
    	return;
    }
		// 删除选中的数据
		var index;
		for(var i=0;i<tdetail.data.length;i++){
			if(tdetail.data[i]==detailObj){
			    index=i;
			}
		}
		var datas = tdetail.removeSelected();
		if(tdetail.data.length>0){
			if(tdetail.data.length==index){
				detailObj=tdetail.data[index-1];
			}
			else
			{
			    detailObj=tdetail.data[index];
			}
			detailObj.checked=true;
			datasynchfromtable(detailObj);
			detailamtDefault=moneyFormatToNumber(detailObj.amt);
	        //子表
	      	//if(typeof(detailObj)!="undefined"){ datasynchfromtable(detailObj);  }
		}else
		{
			clearFormInput();
			setDisabled(true);
			detailObj=null;
			detailamtDefault=null;
		}
		tdetail.draw();
		var money = 0.0;
		for(var i=0;i<datas.length;i++){
			money += parseFloat(moneyFormatToNumber(datas[i].amt));
		}	
		// 把删除的明细中的金额退回到主单
		if(mainVouch!=null){
			mainVouch.curbal = parseFloat(moneyFormatToNumber(mainVouch.curbal)) + parseFloat(money);
		}
		if(typeof(tmain)!="undefined")tmain.draw();	;
}

function checkNull(){
   // 校验用户录入信息
  if(detailObj!=null){
  	if(!addMainEditFormInput()){
		return false;
	}  
		
	if(!addEditFormInput()){
		return false;
	}
  }	 
  return true;
}

//修改可用余额
function checkAMT(obj){
	
	if( obj.value.trim().length == 0 || obj.value == null){
		alert("金额不能为空！");
		//obj.focus();
		return false;
	}
	if(!moneyFormatToNumber(obj.value).isNumber()){
		alert("金额必须是数字！");
		//obj.focus();
		return false;
	}else if(parseFloat(moneyFormatToNumber(obj.value))==0){
		alert("金额必须大于零！");
		//obj.focus();
		return false;
	}
	//alert(tdetail);
	if(detailObj==null) return;
	if(detailamtDefault==null){ detailamtDefault=0;}
	if(Number(moneyFormatToNumber(mainVouch.curbal)) >= 0){
			if(parseFloat(moneyFormatToNumber(mainVouch.curbal)) + parseFloat(detailamtDefault) < parseFloat(moneyFormatToNumber(obj.value))){
				alert("输入金额已超出可用余额！");
				//obj.value = 0;
				obj.focus();//不控制焦点重置的话，会在某些情况下失去控制。这里为了程序正确，牺牲一些操作友好性。
				return false;
			} else { //输入值 > 可用金额 且 输入值 <= 可用金额 + 原值
				//可用金额 = 可用金额 + 原值 - 新值
				mainVouch.curbal =parseFloat(moneyFormatToNumber(mainVouch.curbal)) + parseFloat(detailamtDefault) -  parseFloat(moneyFormatToNumber(obj.value));
				detailObj.amt=moneyFormatToNumber(obj.value);
				tmain.draw();	
				tdetail.draw();
				//赋值成功，更改默认值为新值
				detailamtDefault = moneyFormatToNumber(obj.value);
				//obj.value = obj.value.toMoneyFormat();
				return true;
			}	
		
	} else {
		alert("可用金额不足!");
		//obj.focus();
		return false;
	}
}

// 将主单和明细信息保存到后台，并返回列表页
function saveContinue(backindex){
	if(backindex==undefined){
		backindex = false;
	}
	if(typeof(ui_depositinput)!="undefined"&&ui_depositinput == "depositinput"){
		for(var i=0;i<tdetail.data.length;i++){
			if(!(Number(tdetail.data[i].amt)>0)){
				alert("金额不能为零或空,请检查!");
				return;
			}
		} 
		
	 	$("detailform").maindata.value = Object.toJSON(tdetail.data);
	 	disabledFunctionButton();
		   var url = 'save.do?random='+Math.random()+'&'+urlmenuparameter+'&inpueleList='+inpueleList;
		   var pars = "maindata="+$("detailform").maindata.value;
		   if($("detailform").billid)pars += "&billid="+$("detailform").billid.value;
           save(url,pars,backindex);
           return;
	}
	if(mainVouch == null){
		alert("请选择来源单据！");
		return false;
	}
	
	if(!addMainEditFormInput()) return;
	
	 if(tdetail != null && tdetail.data != null && tdetail.data.length >0){
    	if(checkNull()&&checkAMT($("detailform").amt)){ 
		   if(typeof(uieditmodel)!="undefined"&&uieditmodel == "srcdatanohead"){
				 $("detailform").maindata.value = Object.toJSON(tdetail.data);
		   }else{
			     maindatasynchtoObj(mainVouch);
				 mainVouch.details=tdetail.data;
				 maindatasynch();
				 $("detailform").maindata.value = Object.toJSON(mainVouch);
		   }
    	   
    	   //设置所有功能按钮不可用
		   disabledFunctionButton();
		   var url = 'save.do?random='+Math.random()+'&'+urlmenuparameter+'&inpueleList='+inpueleList;
		   var pars = "maindata="+$("detailform").maindata.value;
		   if($("detailform").billid)pars += "&billid="+$("detailform").billid.value;
           save(url,pars,backindex);
        }   	
    	return false;
    }else{
        alert("请至少添加一条明细信息！");
        return false;
    }
}

// 将主单和明细信息保存到后台，并返回本页
function saveQuit(){
	saveContinue(true);
}

function addDetailNoSrc(){
	//if(!addEditFormInput()) return;
	if(!checkNull()) return;
	
	clearFormInput();
	enableEditFormInput();
	var detailrow = new Object();
	detailrow.details = null;	
	detailrow.amt = "";
    setDefaultValue(detailrow);	  
	datasynchtoObj(detailrow);
	
	//清除原数据的选择状态
	if(tdetail != null && tdetail.data != null && tdetail.data.length >0 ){
		for(var i=0;i<tdetail.data.length;i++){
			tdetail.data[i].checked=false;
		} 
	}
	detailrow.checked = true;
	tdetail.appendRow(detailrow);
	tdetail.show();
	
	detailObj=detailrow;
	detailamtDefault=0;
}

// 清除FORM中的可录入数据
function clearFormInput(formObject){
	if(formObject==undefined){
		formObject= $("detailform");
	}
	var inputelements = formObject.elements;
	for(var i=0;i<inputelements.length;i++){
		var obj = inputelements[i];
		//发文文号和发文日期不用清空
		if(obj.tagName == "INPUT" && obj.type=="text"){
			obj.value = ""
			obj.valueid = null;
		}
	}
	// 清除FORM对应数据
	formObject.selectedRow = null;
}
