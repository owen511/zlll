// ����������Ϣ�ı���
var mainVouch = null;

var detailObj=null;

var detailamtDefault = null;
//�Ƿ���ƽ��
var controlcurbal = true;

// ��ѡ�е�������д���༭����
function detailclick(){
	if(tdetail ==null ||tdetail.data == null || tdetail.data.length <1 ){
		return;
	}
	var selectrows = tdetail.getSelectedRow();
	if(selectrows.length == 0){
		// �û�ֻ�ڱ���ϵ����һ�£���û��ѡ���κ���
		return ;
	}
	var selectrow=selectrows[0];
	
	if(detailObj != selectrow){
		if(checkNull()){
		    detailamtDefault = moneyFormatToNumber(selectrow.amt);
		    detailObj=selectrow;
			setDisabled(false);
	        //�ӱ༭��
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
//������ϸ
function copyDetail(){
	if(tdetail ==null ||tdetail.data == null || tdetail.data.length <1 ){
		return;
	}
	var selectrows = tdetail.getSelectedRow();
	if(selectrows.length == 0){
		// �û�ֻ�ڱ���ϵ����һ�£���û��ѡ���κ���
		return ;
	}
	var selectrow=selectrows[0];
  //��������
	var copydetailrow = Object.clone(selectrow);
	copydetailrow.checked=false;
	tdetail.appendRow(copydetailrow);
	tdetail.draw();
}
//������ϸ
function addDetail(){
	if(mainVouch == null){
		alert("��ѡ����Դ���ݣ�");
		return;
	}
	if(mainVouch.curbal != undefined && mainVouch.curbal !='null' && mainVouch.curbal==0&&controlcurbal){
		alert("��������Ѿ�Ϊ0,������������ϸ��");
		return false;
	}
	if(!checkNull()) return;
	
	clearFormInput();
	
	// ͨ��������Ϣ����һ����ϸ����
	var detailrow = Object.clone(mainVouch);
	if(typeof(switchBank)=="function"){
		detailrow = switchBank(detailrow);
	}
	detailrow.fromapp = mainVouch.billid;
	detailrow.details = null;
	
	//ͬ�����༭�����ݸ��¼���
	
	maindatasynchtoObj(detailrow);	
	detailrow.amt = "";
	//setDefaultValue(detailrow);
	//datasynchtoObj(detailrow);
	
	//���ԭ���ݵ�ѡ��״̬
	if(tdetail != null && tdetail.data != null && tdetail.data.length >0 ){
		for(var i=0;i<tdetail.data.length;i++){
			tdetail.data[i].checked=false;
		} 
	}
	
	//������Ĭ��ѡ��״̬
	detailrow.checked = true;
	
	tdetail.appendRow(detailrow);
	tdetail.draw();
	setDisabled(false);
	
	detailObj=detailrow;
	
	// ������ϸ
	if(mainVouch.details == null){
		mainVouch.details = new Array();
	}

    detailamtDefault=0;
    
}
//ɾ����ϸ
function delDetail(){
	if(detailObj==null){
    	alert("��ѡ��Ҫɾ������ϸ��");
    	return;
    }
		// ɾ��ѡ�е�����
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
	        //�ӱ�
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
		// ��ɾ������ϸ�еĽ���˻ص�����
		if(mainVouch!=null){
			mainVouch.curbal = parseFloat(moneyFormatToNumber(mainVouch.curbal)) + parseFloat(money);
		}
		if(typeof(tmain)!="undefined")tmain.draw();	;
}

function checkNull(){
   // У���û�¼����Ϣ
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

//�޸Ŀ������
function checkAMT(obj){
	
	if( obj.value.trim().length == 0 || obj.value == null){
		alert("����Ϊ�գ�");
		//obj.focus();
		return false;
	}
	if(!moneyFormatToNumber(obj.value).isNumber()){
		alert("�����������֣�");
		//obj.focus();
		return false;
	}else if(parseFloat(moneyFormatToNumber(obj.value))==0){
		alert("����������㣡");
		//obj.focus();
		return false;
	}
	//alert(tdetail);
	if(detailObj==null) return;
	if(detailamtDefault==null){ detailamtDefault=0;}
	if(Number(moneyFormatToNumber(mainVouch.curbal)) >= 0){
			if(parseFloat(moneyFormatToNumber(mainVouch.curbal)) + parseFloat(detailamtDefault) < parseFloat(moneyFormatToNumber(obj.value))){
				alert("�������ѳ���������");
				//obj.value = 0;
				obj.focus();//�����ƽ������õĻ�������ĳЩ�����ʧȥ���ơ�����Ϊ�˳�����ȷ������һЩ�����Ѻ��ԡ�
				return false;
			} else { //����ֵ > ���ý�� �� ����ֵ <= ���ý�� + ԭֵ
				//���ý�� = ���ý�� + ԭֵ - ��ֵ
				mainVouch.curbal =parseFloat(moneyFormatToNumber(mainVouch.curbal)) + parseFloat(detailamtDefault) -  parseFloat(moneyFormatToNumber(obj.value));
				detailObj.amt=moneyFormatToNumber(obj.value);
				tmain.draw();	
				tdetail.draw();
				//��ֵ�ɹ�������Ĭ��ֵΪ��ֵ
				detailamtDefault = moneyFormatToNumber(obj.value);
				//obj.value = obj.value.toMoneyFormat();
				return true;
			}	
		
	} else {
		alert("���ý���!");
		//obj.focus();
		return false;
	}
}

// ����������ϸ��Ϣ���浽��̨���������б�ҳ
function saveContinue(backindex){
	if(backindex==undefined){
		backindex = false;
	}
	if(typeof(ui_depositinput)!="undefined"&&ui_depositinput == "depositinput"){
		for(var i=0;i<tdetail.data.length;i++){
			if(!(Number(tdetail.data[i].amt)>0)){
				alert("����Ϊ����,����!");
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
		alert("��ѡ����Դ���ݣ�");
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
    	   
    	   //�������й��ܰ�ť������
		   disabledFunctionButton();
		   var url = 'save.do?random='+Math.random()+'&'+urlmenuparameter+'&inpueleList='+inpueleList;
		   var pars = "maindata="+$("detailform").maindata.value;
		   if($("detailform").billid)pars += "&billid="+$("detailform").billid.value;
           save(url,pars,backindex);
        }   	
    	return false;
    }else{
        alert("���������һ����ϸ��Ϣ��");
        return false;
    }
}

// ����������ϸ��Ϣ���浽��̨�������ر�ҳ
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
	
	//���ԭ���ݵ�ѡ��״̬
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

// ���FORM�еĿ�¼������
function clearFormInput(formObject){
	if(formObject==undefined){
		formObject= $("detailform");
	}
	var inputelements = formObject.elements;
	for(var i=0;i<inputelements.length;i++){
		var obj = inputelements[i];
		//�����ĺźͷ������ڲ������
		if(obj.tagName == "INPUT" && obj.type=="text"){
			obj.value = ""
			obj.valueid = null;
		}
	}
	// ���FORM��Ӧ����
	formObject.selectedRow = null;
}
