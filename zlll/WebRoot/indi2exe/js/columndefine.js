// ������������
col = createColumnConfig();
col.id = "lastupdatetime";
col.name = "lastupdatetime";
col.type = "S";
col.title = "��������";
col.show = function(rownum,value,row,tdobj,datatable){
	if(row.lastupdatetime != null){
		var optiondate = new Date(parseInt(value,10));		
		var clock = optiondate.getHours()+':'; 
	    if (optiondate.getMinutes() < 10) 
	    	clock += '0'; 
    	clock += optiondate.getMinutes()+':'; 
	    if (optiondate.getSeconds() < 10) 
	    	clock += '0'; 
    	clock += optiondate.getSeconds(); 

		tdobj.innerHTML = optiondate.getYear()+"-" + (optiondate.getMonth() + 1) + "-"+optiondate.getDate() 
			+ " " + clock;		
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

// ���������
col = createColumnConfig();
col.id = "Year";
col.name = "Year";
col.type = "I";
col.title = "���";
col.style = "text-align:right;left;width:40px";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "billcode";
col.name = "billcode";
col.type = "S";
col.title = "����";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "Billcode.input";
col.name = "Billcode";
col.type = "S";
col.title = "����";
col.show = function(rownum,value,row,tdobj,datatable){
	// �����ı����Ĭ������
	var input = document.createElement('<input type="text" style="width:99%;border:0px"/>');
	input.value = value;
	input.name = this.name;
	tdobj.appendChild(input);
	input.row = row;
	
	input.onblur = function(){
		var name = this.name;
		eval("this.row."+name+"=this.value");
		// ��Ǳ��ı�
		this.row.chagned = true;
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "remark";
col.name = "remark";
col.type = "S";
col.title = "ժҪ";
col.style = "width:200px;text-align:left;word-wrap:break-word;word-break:break-all";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "amt";
col.name = "amt";
col.type = "M";
col.title = "���";
col.style = "text-align:right";
col.show = function(rownum,value,row,tdobj,datatable){
	value = value+"";
	tdobj.innerHTML = value.toMoneyFormat();
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "amt.input";
col.name = "amt";
col.type = "M";
col.title = "���";
col.style = "text-align:right";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
		value = value+"";
	} else {
		value ="";
	}
	tdobj.style.backgroundColor = '#FFEFC3';
	// �����ɱ༭����
	var divobj = document.createElement('<div style="width:100%"></div>');
	divobj.innerHTML = value.toMoneyFormat();
	// ��datatable�������ù�ϵ
	divobj.datarow = row;
	divobj.datatable = datatable;
	// ���ɱ༭ȡ׷�ӵ����
	tdobj.appendChild(divobj);
	// ��굥����Ԫ�������޸����� 
	divobj.onclick = function(){
		//����Ѿ��ɱ༭,�򷵻�
		//jinjiyong	20081117
		if(this.contentEditable == "true"){
			return;
		}
		//window.status ="1";
		// ���Ƚ�ǧ��λȥ��
		var m = this.innerText.trim();
		if(m.trim() == "0"){
			this.innerHTML = "";
			this.defaultamt = 0.0;
		}
		else{
			if(this.contentEditable !=true){
				m = m.replace(/,/g,"");
				this.innerHTML = m;
				this.defaultamt = parseFloat(m);
			}
		}
		
		// ������ʽ����
		this.parentElement.oldbackgroundColor = this.parentElement.runtimeStyle.backgroundColor;
		this.parentElement.runtimeStyle.backgroundColor = '#FFFF00';
		
		// ���ÿɱ༭����
		this.contentEditable = true;
		//window.status = "Ĭ��ֵ��" +this.defaultamt;
		this.setActive();
	}
	
	divobj.onblur = function(){
		if(this.contentEditable!="true"){
			return;
		}
		var m = this.innerHTML
		
		m = m.replace(/,/g,"");
		if(isNaN(m)){
			alert("�����ݵ����ָ�ʽ�����⣬���飡");
			this.setActive();
			return ;
		}
		
		// ����Ƿ������ⲿУ�鷽��
		// ��ҳ���Ͽ��Ը��ݷ����������򴴽�У�鷽��
		// �������� checka+������+cell
		// ���У�鲻ͨ����Ҫ��������false
		if(this.datatable.checkamtcell){
			// �˴��ѽ������ת������
			var r = this.datatable.checkamtcell(this.defaultamt ,parseFloat(m),row);
			if(r == false){
				this.setActive();
				return ;
			}
		}
		
		if(this.parentElement!=null){
			this.parentElement.runtimeStyle.backgroundColor = "";
		}
		// ���ò��ɱ༭
		this.contentEditable = false;
		divobj.datarow.amt = m;
		this.innerHTML = m.toMoneyFormat();
	}
	
	divobj.onkeydown = function(){
		if(event.keyCode == 13){ 
			// �س���,����ʧ�����¼�
			this.fireEvent("onblur");
			return false;
		}
		else if(event.keyCode == 27 ){
			// Esc��,�ָ�Ĭ��ֵ
			this.innerText = this.defaultamt;
			this.fireEvent("onblur");
			return false;
		}
	}
}
ColumnConfig[col.id.toLowerCase()]=col;


/*
col = createColumnConfig();
col.id = "departmentdivision";
col.name = "departmentdivision";
col.type = "S";
col.title = "ҵ����";
col.show = function(rownum,value,row,tdobj,datatable){
	eval("var code = row.departmentdivision_code");
	eval("var name = row.departmentdivision_name");
	if(code != null && name!= null){
		tdobj.innerHTML = code+"-"+name;
	}
}
ColumnConfig[col.id.toLowerCase()]=col;
*/

col = createColumnConfig();
col.id = "fundtype";
col.name = "fundtype";
col.type = "S";
col.title = "�ʽ���Դ";
col.show = function(rownum,value,row,tdobj,datatable){
	eval("var code = row.fundtype_code");
	eval("var name = row.fundtype_name");
	if(code != null && name!= null){
		tdobj.innerHTML = code+"-"+name;
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "expfunc";
col.name = "expfunc";
col.type = "S";
col.title = "���ܷ���";
col.show = function(rownum,value,row,tdobj,datatable){
	eval("var code = row.expfunc_code");
	eval("var name = row.expfunc_name");
	if(code != null && name!= null){
		tdobj.innerHTML = code+"-"+name;
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "fundsource";
col.name = "fundsource";
col.type = "S";
col.title = "ָ����Դ";
col.show = function(rownum,value,row,tdobj,datatable){
	eval("var code = row.fundsource_code");
	eval("var name = row.fundsource_name");
	if(code != null && name!= null){
		tdobj.innerHTML = code+"-"+name;
	}
}
ColumnConfig[col.id.toLowerCase()]=col;
/*jinjiyong �����Ѵ���
col = createColumnConfig();
col.id = "remark";
col.name = "remark";
col.type = "S";
col.title = "ժҪ";
ColumnConfig[col.id.toLowerCase()]=col;
*/

col = createColumnConfig();
col.id = "incomeexpmanage";
col.name = "incomeexpmanage";
col.type = "S";
col.title = "֧������";
col.show = function(rownum,value,row,tdobj,datatable){
	eval("var code = row.incomeexpmanage_code");
	eval("var name = row.incomeexpmanage_name");
	if(code != null && name!= null){
		tdobj.innerHTML = code+"-"+name;
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "indsource";
col.name = "indsource";
col.type = "S";
col.title = "Ԥ����Դ����";
col.show = function(rownum,value,row,tdobj,datatable){
	eval("var code = row.indsource_code");
	eval("var name = row.indsource_name");
	if(code != null && name!= null){
		tdobj.innerHTML = code+"-"+name;
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "billstatus";
col.name = "billstatus";
col.type = "S";
col.title = "״̬";
col.show = function(rownum,value,row,tdobj,datatable){
	eval("var code = row.billstatus_code");
	eval("var name = row.billstatus_name");
	if(code != null && name!= null){
		tdobj.innerHTML = code+"-"+name;
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "createtime";
col.name = "createtime";
col.type = "S";
col.title = "�Ƶ�����";
col.style = "text-align:center";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null ){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}	
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "bdgagency";
col.name = "bdgagency";
col.type = "S";
col.title = "��λ";
col.show = function(rownum,value,row,tdobj,datatable){
	eval("var code = row.bdgagency_code");
	eval("var name = row.bdgagency_name");
	if(row.ctrlid != null){
		if(row.ctrlid =="1"){
			tdobj.parentElement.className="main_table_title_letter_error1";
			if(code != null && name != null ){
				tdobj.innerHTML = code+"-"+name;
			}
		} else if(row.ctrlid =="2"){
			tdobj.parentElement.className="main_table_title_letter_error2";
			if(code != null && name != null){
				tdobj.innerHTML = code+"-"+name;
			}
		} else {
			if(code != null && name != null){			
				tdobj.innerHTML = code+"-"+name;
			}
		}
	} else if(code != null && name!= null){
		tdobj.innerHTML = code+"-"+name;
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "expfunc";
col.name = "expfunc";
col.type = "S";
col.title = "֧�����ܷ���";
col.show = function(rownum,value,row,tdobj,datatable){
	eval("var code = row.expfunc_code");
	eval("var name = row.expfunc_name");
	if(code != null && name!= null){
		tdobj.innerHTML = code+"-"+name;
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "expeconormic";
col.name = "expeconormic";
col.type = "S";
col.title = "֧�����÷���";
col.show = function(rownum,value,row,tdobj,datatable){
	eval("var code = row.expeconormic_code");
	eval("var name = row.expeconormic_name");
	if(code != null && name!= null){
		tdobj.innerHTML = code+"-"+name;
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "planamt";
col.name = "amt";
col.type = "M";
col.title = "�ƻ����";
col.style = "text-align:right";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "startamt";
col.name = "startamt";
col.type = "M";
col.title = "��ʼ���";
col.style = "text-align:right";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "profund";
col.name = "profund";
col.type = "S";
col.title = "��Ŀ����";
col.show = function(rownum,value,row,tdobj,datatable){
	eval("var code = row.profund_code");
	eval("var name = row.profund_name");
	if(code != null && name!= null){
		tdobj.innerHTML = code+"-"+name;
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

//ҵ�����û��profund��������Ԥ���ֶ�element13
col = createColumnConfig();
col.id = "element13";
col.name = "element13";
col.type = "S";
col.title = "��Ŀ����";
col.show = function(rownum,value,row,tdobj,datatable){
	eval("var code = row.element13_code");
	eval("var name = row.element13_name");
	if(code != null && name!= null){
		tdobj.innerHTML = code+"-"+name;
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "programtype";
col.name = "programtype";
col.type = "S";
col.title = "��Ŀ���";
col.show = function(rownum,value,row,tdobj,datatable){
	eval("var code = row.programtype_code");
	eval("var name = row.programtype_name");
	if(code != null && name!= null){
		tdobj.innerHTML = code+"-"+name;
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "program";
col.name = "program";
col.type = "S";
col.title = "��Ŀ";
col.show = function(rownum,value,row,tdobj,datatable){
	eval("var code = row.program_code");
	eval("var name = row.program_name");
	if(code != null && name!= null){
		tdobj.innerHTML = code+"-"+name;
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "month";
col.name = "month";
col.type = "S";
col.title = "�·�";
col.style = "text-align:center";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
		tdobj.innerHTML = value;	
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "paytype";
col.name = "paytype";
col.type = "S";
col.title = "֧����ʽ";
col.show = function(rownum,value,row,tdobj,datatable){
	eval("var code = row.paytype_code");
	eval("var name = row.paytype_name");
	if(code != null && name!= null){
		tdobj.innerHTML = code+"-"+name;
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "incomeexpmanage";
col.name = "incomeexpmanage";
col.type = "S";
col.title = "��֧����ṹ";
col.show = function(rownum,value,row,tdobj,datatable){
	eval("var code = row.incomeexpmanage_code");
	eval("var name = row.incomeexpmanage_name");
	if(code != null && name!= null){
		tdobj.innerHTML = code+"-"+name;
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "bdgmanagedivision";
col.name = "bdgmanagedivision";
col.type = "S";
col.title = "ָ��������";
col.show = function(rownum,value,row,tdobj,datatable){
	eval("var code = row.bdgmanagedivision_code");
	eval("var name = row.bdgmanagedivision_name");
	if(code != null && name!= null){
		tdobj.innerHTML = code+"-"+name;
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "departmentdivision";
col.name = "departmentdivision";
col.type = "S";
col.title = "ҵ���ڴ���";
col.show = function(rownum,value,row,tdobj,datatable){
	eval("var code = row.departmentdivision_code");
	eval("var name = row.departmentdivision_name");
	if(code != null && name!= null){
		tdobj.innerHTML = code+"-"+name;
	}
}

ColumnConfig[col.id.toLowerCase()]=col; 

//RK20080903 begin
col = createColumnConfig();
col.id = "gatheringbankacctcode";
col.name = "gatheringbankacctcode";
col.type = "S";
col.title = "�տ��˻���";

ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "gatheringbankaccount";
col.name = "gatheringbankaccount";
col.type = "S";
col.title = "�տ��˻���ˮ��";

ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "gatheringbankname";
col.name = "gatheringbankname";
col.type = "S";
col.title = "�տ��˻�������";

ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "gatheringbankacctname";
col.name = "gatheringbankacctname";
col.type = "S";
col.title = "�տ��˻���";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "paymentbankacctcode";
col.name = "paymentbankacctcode";
col.type = "S";
col.title = "�����˺�";

ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "paymentbankname";
col.name = "paymentbankname";
col.type = "S";
col.title = "�����˻�������";

ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "paymentbankacctname";
col.name = "paymentbankacctname";
col.type = "S";
col.title = "�����˻���";

ColumnConfig[col.id.toLowerCase()]=col;

//end

col = createColumnConfig();
col.id = "wfstatus";
col.name = "wfstatus";
col.type = "S";
col.title = "״̬";
col.show = function(rownum,value,row,tdobj,datatable){
	eval("var code = row.wfstatus_code");
	eval("var name = row.wfstatus_name");
	if(code != null && name!= null){
		tdobj.innerHTML = code+"-"+name;
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "text3";
col.name = "text3";
col.type = "S";
col.title = "�����ĺ�";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "text2";
col.name = "text2";
col.type = "S";
col.title = "�����ĺ�";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "userid";
col.name = "userid";
col.type = "S";
col.title = "������";
col.show = function(rownum,value,row,tdobj,datatable){
	eval("var code = row.userid_code");
	eval("var name = row.userid_name");
	if(code != null && name!= null){
		tdobj.innerHTML = code+"-"+name;
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "senddoctime";
col.name = "senddoctime";
col.type = "S";
col.title = "��������";
col.style = "text-align:center";
col.show = function(rownum,value,row,tdobj,datatable){
	tdobj.innerHTML = value;	
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "endbal";
col.name = "endbal";
col.type = "M";
col.title = "ָ�����";
col.style = "text-align:right";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
	        value = value+"";
		tdobj.innerHTML = value.toMoneyFormat();
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "curbal";
col.name = "curbal";
col.type = "M";
col.title = "�������";
col.style = "text-align:right";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
	        value = value+"";
		tdobj.innerHTML = value.toMoneyFormat();
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "element11";
col.name = "element11";
col.type = "S";
col.title = "�ɹ���־";
col.style = "text-align:right";
col.show = function(rownum,value,row,tdobj,datatable){
	eval("var code = row.element11_code");
	eval("var name = row.element11_name");
	if(code != null && name!= null){
		tdobj.innerHTML = code+"-"+name;
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "startamt.input";
col.name = "startamt";
col.type = "M";
col.title = "�ƻ����";
col.show = function(rownum,value,row,tdobj,datatable){
	// �����ı����Ĭ������
	var input = document.createElement('<input type="text" style="width:99%;border:0px" value ="'+ value + '"/>');
	input.value = value;
	input.name = this.name;
	tdobj.appendChild(input);
	input.row = row;
	
	input.onblur = function(){
		var name = this.name;
		eval("this.row."+name+"=this.value");
		// ��Ǳ��ı�
		this.row.chagned = true;
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "month.input";
col.name = "month";
col.type = "S";
col.title = "�·�";
col.show = function(rownum,value,row,tdobj,datatable){
	// �����ı����Ĭ������
	var input = document.createElement('<input type="text" style="width:98%;border:0px" value ="'+ row.month + '"/>');
	input.value = value;
	input.name = this.name;
	tdobj.appendChild(input);
	input.row = row;	
	input.onblur = function(){
		var name = this.name;
		eval("this.row."+name+"=this.value");
		// ��Ǳ��ı�
		this.row.chagned = true;
	}
}
ColumnConfig[col.id.toLowerCase()]=col;


col = createColumnConfig();
col.id = "remark.input";
col.name = "text5";
col.type = "S";
col.title = "ժҪ";
col.style = "text-align:left";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
		value = value+"";
	} else {
		value ="";
	}
	tdobj.style.backgroundColor = '#FFEFC3';
	// �����ɱ༭����
	var divobj = document.createElement('<div style="width:100%"></div>');
	divobj.innerHTML = value;
	// ��datatable�������ù�ϵ
	divobj.datarow = row;
	divobj.datatable = datatable;
	// ���ɱ༭ȡ׷�ӵ����
	tdobj.appendChild(divobj);
	
	// ��굥����Ԫ�������޸����� 
	divobj.onclick = function(){
		var m = this.innerText.trim();
		if(m == null){
			this.innerHTML ="";
			this.defaultremark = "";
		} else {
			this.defaultremark = m;
		}
		
		// ������ʽ����
		this.parentElement.oldbackgroundColor = this.parentElement.runtimeStyle.backgroundColor;
		this.parentElement.runtimeStyle.backgroundColor = '#FFFF00';
		
		// ���ÿɱ༭����
		this.contentEditable = true;
		this.focus();
		this.setActive();
	}
	
	divobj.onblur = function(){
		var m = this.innerHTML;	
		this.parentElement.runtimeStyle.backgroundColor = "";
		// ���ò��ɱ༭
		//this.contentEditable = false;
		divobj.datarow.remark = m;
		this.innerHTML = m;
	}
	
	divobj.onkeydown = function(){
		if(event.keyCode == 13){
			// �س���,����ʧ�����¼�
			this.fireEvent("onblur");
			return false;
		}
		else if(event.keyCode == 27 ){
			// Esc��,�ָ�Ĭ��ֵ
			this.innerText = this.defaultremark;
			this.fireEvent("onblur");
			return false;
		}
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "paytype.input";
col.name = "paytype";
col.type = "S";
col.title = "֧����ʽ";
col.show = function(rownum,value,row,tdobj,datatable){
	eval("var code = row.paytype_code");
	eval("var name = row.paytype_name");
	// �����ı����Ĭ������
	var input = document.createElement('<input type="text" style="width:98%;border:0px" value = "'+ code + '-' +value + '"/>');
	input.value = value;
	input.name = this.name;
	tdobj.appendChild(input);
	input.row = row;
	
	input.onblur = function(){
		var name = this.name;
		eval("this.row."+name+"=this.value");
		// ��Ǳ��ı�
		this.row.chagned = true;
	}
}

col = createColumnConfig();
col.id = "text9";
col.name = "text9";
col.type = "S";
col.title = "ָ��˵��";
ColumnConfig[col.id.toLowerCase()]=col;


col = createColumnConfig();
col.id = "creater";
col.name = "creater";
col.type = "S";
col.title = "�Ƶ���";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
		tdobj.innerHTML = row["creater_name"];
	} else {
		tdobj.innerHTML ="";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "element04";
col.name = "element04";
col.type = "S";
col.title = "������־";
col.show = function(rownum,value,row,tdobj,datatable){
	if(row["element04_code"] !=null && row["element04_name"]!=null){
		tdobj.innerHTML = row["element04_code"]+"-"+row["element04_name"];
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "bdgversion";
col.name = "bdgversion";
col.type = "S";
col.title = "ָ��汾";
col.show = function(rownum,value,row,tdobj,datatable){
	if(row["bdgversion_code"] !=null && row["bdgversion_name"]!=null){
		tdobj.innerHTML = row["bdgversion_code"]+"-"+row["bdgversion_name"];
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "bdgallow";
col.name = "bdgallow";
col.type = "S";
col.title = "ָ���ִ�б�־";
col.show = function(rownum,value,row,tdobj,datatable){
	if(row["bdgallow_code"] !=null && row["bdgallow_name"]!=null){
		tdobj.innerHTML = row["bdgallow_code"]+"-"+row["bdgallow_name"];
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "element12";
col.name = "element12";
col.type = "S";
col.title = "ת����־";
col.show = function(rownum,value,row,tdobj,datatable){
	if(row["element12_code"] !=null && row["element12_name"]!=null){
		tdobj.innerHTML = row["element12_code"]+"-"+row["element12_name"];
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "executemethod";
col.name = "executemethod";
col.type = "S";
col.title = "ִ�з�ʽ";
col.show = function(rownum,value,row,tdobj,datatable){
	if(row["executemethod_code"] !=null && row["executemethod_name"]!=null){
		tdobj.innerHTML = row["executemethod_code"]+"-"+row["executemethod_name"];
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "element14";
col.name = "element14";
col.type = "S";
col.title = "���ն�֧��־";
col.show = function(rownum,value,row,tdobj,datatable){
	if(row["element14_code"] !=null && row["element14_name"]!=null){
		tdobj.innerHTML = row["element14_code"]+"-"+row["element14_name"];
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "element21";
col.name = "element21";
col.type = "S";
col.title = "���ն�֧��־";
col.show = function(rownum,value,row,tdobj,datatable){
	if(row["element21_code"] !=null && row["element21_name"]!=null){
		tdobj.innerHTML = row["element21_code"]+"-"+row["element21_name"];
	}
}
ColumnConfig[col.id.toLowerCase()]=col;


col = createColumnConfig();
col.id = "amt16";
col.name = "amt16";
col.type = "M";
col.title = "��Ҫ�������";
col.style = "text-align:right";
col.show = function(rownum,value,row,tdobj,datatable){
	value = value+"";
	tdobj.innerHTML = value.toMoneyFormat();
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "amt03";
col.name = "amt03";
col.type = "M";
col.title = "�������";
col.style = "text-align:right";
col.show = function(rownum,value,row,tdobj,datatable){
	value = value+"";
	tdobj.innerHTML = value.toMoneyFormat();
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "originalbal";
col.name = "originalbal";
col.type = "M";
col.title = "��ʼ���";
col.style = "text-align:right";
col.show = function(rownum,value,row,tdobj,datatable){
	value = value+"";
	tdobj.innerHTML = value.toMoneyFormat();
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "paytype.select";
col.name = "paytype";
col.type = "S";
col.title = "֧����ʽ";
col.show = function(rownum,value,row,tdobj,datatable){
	eval("var code = row.paytype_code");
	eval("var name = row.paytype_name");
	// �����ı����Ĭ������
	var input = document.createElement('<ui:elementtree id="paytype" element="paytype"/>');
	input.value = value;
	input.name = this.name;
	tdobj.appendChild(input);
	input.row = row;
	
	input.onblur = function(){
		var name = this.name;
		eval("this.row."+name+"=this.value");
		// ��Ǳ��ı�
		this.row.chagned = true;
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "settlemode";
col.name = "settlemode";
col.type = "S";
col.title = "���㷽ʽ";
col.show = function(rownum,value,row,tdobj,datatable){
	eval("var code = row.settlemode_code");
	eval("var name = row.settlemode_name");
	if(code != null && name!= null){
		tdobj.innerHTML = code+"-"+name;
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "notetype";
col.name = "notetype";
col.type = "S";
col.title = "֧������";
col.show = function(rownum,value,row,tdobj,datatable){
	eval("var code = row.notetype_code");
	eval("var name = row.notetype_name");
	if(code != null && name!= null){
		tdobj.innerHTML = code+"-"+name;
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "element12";
col.name = "element12";
col.type = "S";
col.title = "ת����־";
col.show = function(rownum,value,row,tdobj,datatable){
	eval("var code = row.element12_code");
	eval("var name = row.element12_name");
	if(code != null && name!= null){
		tdobj.innerHTML = code+"-"+name;
	}
}
ColumnConfig[col.id.toLowerCase()]=col;


col = createColumnConfig();
col.id = "selfamt";
col.name = "selfamt";
col.type = "M";
col.title = "��λ�����ʽ�";
col.show = function(rownum,value,row,tdobj,datatable){
    if(value != null){
	value = value+"";
	tdobj.innerHTML = value.toMoneyFormat();
    }
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "contractamt";
col.name = "contractamt";
col.type = "M";
col.title = "��ͬ���";
col.style = "text-align:right";
col.show = function(rownum,value,row,tdobj,datatable){
    if(value != null){
	value = value+"";
	tdobj.innerHTML = value.toMoneyFormat();
    }
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "price";
col.name = "price";
col.type = "M";
col.title = "����";
col.style = "text-align:right";
col.show = function(rownum,value,row,tdobj,datatable){
    if(value != null){
	value = value+"";
	tdobj.innerHTML = value.toMoneyFormat();
    }
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "amount";
col.name = "amount";
col.type = "M";
col.title = "����";
col.style = "text-align:right";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "spec";
col.name = "spec";
col.type = "M";
col.title = "���";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "contractcode";
col.name = "contractcode";
col.type = "M";
col.title = "��ͬ��";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;


col = createColumnConfig();
col.id = "clearbank";
col.name = "clearbank";
col.type = "S";
col.title = "��������";
col.show = function(rownum,value,row,tdobj,datatable){
	eval("var code = row.clearbank_code");
	eval("var name = row.clearbank_name");
	if(code != null && name!= null){
		tdobj.innerHTML = code+"-"+name;
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "clearbankname";
col.name = "clearbankname";
col.type = "S";
col.title = "���㸶���˻�������";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "clearbankacctname";
col.name = "clearbankacctname";
col.type = "S";
col.title = "�����˻���";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "clearbankacctcode";
col.name = "clearbankacctcode";
col.type = "S";
col.title = "���������˺�";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "executemethod";
col.name = "executemethod";
col.type = "S";
col.title = "ִ�з�ʽ";
col.show = function(rownum,value,row,tdobj,datatable){
	eval("var code = row.executemethod_code");
	eval("var name = row.executemethod_name");
	if(code != null && name!= null){
		tdobj.innerHTML = code+"-"+name;
	} else if( value == null) {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "element07";
col.name = "element07";
col.type = "S";
col.title = "�鼯����";
col.show = function(rownum,value,row,tdobj,datatable){
	eval("var code = row.element07_code");
	eval("var name = row.element07_name");
	if(code != null && name!= null){
		tdobj.innerHTML = code+"-"+name;
	} else if( value == null) {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "text10";
col.name = "text10";
col.type = "S";
col.title = "��;";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
	  tdobj.innerHTML = value;
	} else {
	  tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "paymentbankprovince";
col.name = "paymentbankprovince";
col.type = "S";
col.title = "�����ʡ";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "paymentbankcity";
col.name = "paymentbankcity";
col.type = "S";
col.title = "�������";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "gatheringbankprovince";
col.name = "gatheringbankprovince";
col.type = "S";
col.title = "������ʡ";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "gatheringbankcity";
col.name = "gatheringbankcity";
col.type = "S";
col.title = "��������";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

//�����ֶ���ʾ����

col = createColumnConfig();
col.id = "reporttype";
col.name = "reporttype";
col.type = "S";
col.title = "�������";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

ColumnConfig[col.id.toLowerCase()]=col;
col = createColumnConfig();
col.id = "reportcode";
col.name = "reportcode";
col.type = "S";
col.title = "�������";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

ColumnConfig[col.id.toLowerCase()]=col;
col = createColumnConfig();
col.id = "reportspec";
col.name = "reportspec";
col.type = "S";
col.title = "��������";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

ColumnConfig[col.id.toLowerCase()]=col;
col = createColumnConfig();
col.id = "bdgyear";
col.name = "bdgyear";
col.type = "S";
col.title = "Ԥ�����";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

ColumnConfig[col.id.toLowerCase()]=col;
col = createColumnConfig();
col.id = "text8";
col.name = "text8";
col.type = "S";
col.title = "֧���׶�";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "printtag";
col.name = "printtag";
col.type = "S";
col.title = "��ӡ״̬";
col.show = function(rownum,value,row,tdobj,datatable){
	if(row["printtag"] == 0){
		tdobj.innerHTML = "0-δ��ӡ";
	}
	if(row["printtag_code"] !=null && row["printtag_name"]!=null){
		tdobj.innerHTML = row["printtag_code"]+"-"+row["printtag_name"];
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "printclearnoticetag";
col.name = "printclearnoticetag";
col.type = "S";
col.title = "��ӡ״̬";
col.show = function(rownum,value,row,tdobj,datatable){
	if(row["printclearnoticetag"] == 0){
		tdobj.innerHTML = "0-δ��ӡ";
	}

	if(row["printclearnoticetag_code"] !=null && row["printclearnoticetag_name"]!=null){
		tdobj.innerHTML = row["printclearnoticetag_code"]+"-"+row["printclearnoticetag_name"];
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "agentbank";
col.name = "agentbank";
col.type = "S";
col.title = "��������";
col.show = function(rownum,value,row,tdobj,datatable){
	if(row["agentbank_code"] !=null && row["agentbank_name"]!=null){
		tdobj.innerHTML = row["agentbank_code"]+"-"+row["agentbank_name"];
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "vchtypeid";
col.name = "vchtypeid";
col.type = "S";
col.title = "ҵ������";
col.show = function(rownum,value,row,tdobj,datatable){
	eval("var code = row.vchtypeid_code");
	eval("var name = row.vchtypeid_name");
	if(code != null && name!= null){
		tdobj.innerHTML = code+"-"+name;
	} else if( value == null) {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

ColumnConfig[col.id.toLowerCase()]=col;
col = createColumnConfig();
col.id = "paycleartime";
col.name = "paycleartime";
col.type = "S";
col.title = "��������";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "paymentbankaccount";
col.name = "paymentbankaccount";
col.type = "S";
col.title = "�����˻�";
col.show = function(rownum,value,row,tdobj,datatable){
	eval("var code = row.paymentbankaccount_code");
	eval("var name = row.paymentbankaccount_name");
	if(code != null && name!= null){
		tdobj.innerHTML = code+"-"+name;
	} else if( value == null) {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "clearbankaccount";
col.name = "clearbankaccount";
col.type = "S";
col.title = "�����˻�";
col.show = function(rownum,value,row,tdobj,datatable){
	eval("var code = row.clearbankaccount_code");
	eval("var name = row.clearbankaccount_name");
	if(code != null && name!= null){
		tdobj.innerHTML = code+"-"+name;
	} else if( value == null) {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "printclearnoticetag";
col.name = "printclearnoticetag";
col.type = "S";
col.title = "��ӡ״̬";
col.show = function(rownum,value,row,tdobj,datatable){
	if(row["printclearnoticetag"] == 0){
		tdobj.innerHTML = "0-δ��ӡ";
	}

	if(row["printclearnoticetag_code"] !=null && row["printclearnoticetag_name"]!=null){
		tdobj.innerHTML = row["printclearnoticetag_code"]+"-"+row["printclearnoticetag_name"];
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "printclearnoticedate";
col.name = "printclearnoticedate";
col.type = "S";
col.title = "��ӡ����";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "exporttime";
col.name = "exporttime";
col.type = "S";
col.title = "��������";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value!= null){
		tdobj.innerHTML = value;
	} else if( value == null) {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "printdate";
col.name = "printdate";
col.type = "S";
col.title = "��ӡ����";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "bankprinttag";
col.name = "bankprinttag";
col.type = "S";
col.title = "��ӡ״̬";
col.show = function(rownum,value,row,tdobj,datatable){
	if(row["bankprinttag"] == 0){
		tdobj.innerHTML = "0-δ��ӡ";
	}

	if(row["bankprinttag_code"] !=null && row["bankprinttag_name"]!=null){
		tdobj.innerHTML = row["bankprinttag_code"]+"-"+row["bankprinttag_name"];
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "bankprintdate";
col.name = "bankprintdate";
col.type = "S";
col.title = "��ӡ����";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;


col = createColumnConfig();
col.id = "printtime";
col.name = "printtime";
col.type = "S";
col.title = "��ӡ����";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
		tdobj.innerHTML = value.substr(0,8);
	} else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "printcleartag";
col.name = "printcleartag";
col.type = "S";
col.title = "��ӡ״̬";
col.show = function(rownum,value,row,tdobj,datatable){
	if(row["printcleartag"] == 0){
		tdobj.innerHTML = "0-δ��ӡ";
	}
	if(row["printcleartag_code"] !=null && row["printcleartag_name"]!=null){
		tdobj.innerHTML = row["printcleartag_code"]+"-"+row["printcleartag_name"];
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "printclearid";
col.name = "printclearid";
col.type = "S";
col.title = "��ӡ����";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "printid";
col.name = "printid";
col.type = "S";
col.title = "��ӡ����";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "printbankid";
col.name = "printbankid";
col.type = "S";
col.title = "��ӡ����";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "element03";
col.name = "element03";
col.type = "S";
col.title = "���ʱ�ʶ";
col.show = function(rownum,value,row,tdobj,datatable){
	if(row["element03_code"] !=null && row["element03_name"]!=null){
		tdobj.innerHTML = row["element03_code"]+"-"+row["element03_name"];
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "text5";
col.name = "text5";
col.type = "S";
col.title = "ժҪ";
col.style = "width:200px;text-align:left;word-wrap:break-word;word-break:break-all";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null&&value!="undefined"){
	  tdobj.innerHTML = value;
	} else {
	  tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "element05";
col.name = "element05";
col.type = "S";
col.title = "ʵ����ʶ";
col.show = function(rownum,value,row,tdobj,datatable){
	if(row["element05_code"] !=null && row["element05_name"]!=null){
		tdobj.innerHTML = row["element05_code"]+"-"+row["element05_name"];
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "lastauditdate";
col.name = "lastauditdate";
col.type = "S";
col.title = "��������";
col.style = "text-align:center";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "code";
col.name = "code";
col.type = "S";
col.title = "��Ŀ����";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "name";
col.name = "name";
col.type = "S";
col.title = "��Ŀ����";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "bdgdocno";
col.name = "bdgdocno";
col.type = "S";
col.title = "�����ĺ�";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "startyear";
col.name = "startyear";
col.type = "S";
col.title = "��ʼ���";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "endyear";
col.name = "endyear";
col.type = "S";
col.title = "�������";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "startdate";
col.name = "startdate";
col.type = "S";
col.title = "��ʼ����";
col.style = "text-align:center";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "enddate";
col.name = "enddate";
col.type = "S";
col.title = "��������";
col.style = "text-align:center";	
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "status";
col.name = "status";
col.type = "S";
col.title = "״̬";
col.show = function(rownum,value,row,tdobj,datatable){
	eval("var code = row.status_code");
	eval("var name = row.status_name");
	if(code != null && name!= null){
		tdobj.innerHTML = code+"-"+name;
	}else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "exporttag";
col.name = "exporttag";
col.type = "S";
col.title = "����״̬";
col.show = function(rownum,value,row,tdobj,datatable){
	eval("var code = row.exporttag_code");
	eval("var name = row.exporttag_name");
	if(code != null && name!= null){
		tdobj.innerHTML = code+"-"+name;
	}else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;


col = createColumnConfig();
col.id = "printenteracctdate";
col.name = "printenteracctdate";
col.type = "S";
col.title = "��ӡ����";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
		tdobj.innerHTML = value.substr(0,8);
	} else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "printenteraccttag";
col.name = "printenteraccttag";
col.type = "S";
col.title = "��ӡ״̬";
col.show = function(rownum,value,row,tdobj,datatable){
	if(row["printenteraccttag"] == 0){
		tdobj.innerHTML = "0-δ��ӡ";
	}
	if(row["printenteraccttag_code"] !=null && row["printenteraccttag_name"]!=null){
		tdobj.innerHTML = row["printenteraccttag_code"]+"-"+row["printenteraccttag_name"];
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "printenteracctid";
col.name = "printenteracctid";
col.type = "S";
col.title = "��ӡ����";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "printid4";
col.name = "printid4";
col.type = "S";
col.title = "��ӡ����";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null && value != "0"){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;


col = createColumnConfig();
col.id = "printdate4";
col.name = "printdate4";
col.type = "S";
col.title = "��ӡ����";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null && value != "0"){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "printtag4";
col.name = "printtag4";
col.type = "S";
col.title = "��ӡ״̬";
col.show = function(rownum,value,row,tdobj,datatable){
	if(row["printtag4"] == 0){
		tdobj.innerHTML = "0-δ��ӡ";
	}
	if(row["printtag4_code"] !=null && row["printtag4_name"]!=null){
		tdobj.innerHTML = row["printtag4_code"]+"-"+row["printtag4_name"];
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "printid5";
col.name = "printid5";
col.type = "S";
col.title = "��ӡ����";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null && value != "0"){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;


col = createColumnConfig();
col.id = "printdate5";
col.name = "printdate5";
col.type = "S";
col.title = "��ӡ����";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null && value != "0"){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "printtag5";
col.name = "printtag5";
col.type = "S";
col.title = "��ӡ״̬";
col.show = function(rownum,value,row,tdobj,datatable){
	if(row["printtag5"] == 0){
		tdobj.innerHTML = "0-δ��ӡ";
	}
	if(row["printtag5_code"] !=null && row["printtag5_name"]!=null){
		tdobj.innerHTML = row["printtag5_code"]+"-"+row["printtag5_name"];
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "amt08";
col.name = "amt08";
col.type = "M";
col.title = "���Ԥ��";
col.style = "text-align:right";
col.show = function(rownum,value,row,tdobj,datatable){
	value = value+"";
	tdobj.innerHTML = value.toMoneyFormat();
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "amt10";
col.name = "amt10";
col.type = "M";
col.title = "���´���";
col.style = "text-align:right";
col.show = function(rownum,value,row,tdobj,datatable){
	value = value+"";
	tdobj.innerHTML = value.toMoneyFormat();
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "amt01";
col.name = "amt01";
col.type = "M";
col.title = "ֱ��֧����";
col.style = "text-align:right";
col.show = function(rownum,value,row,tdobj,datatable){
	value = value+"";
	tdobj.innerHTML = value.toMoneyFormat();
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "amt02";
col.name = "amt02";
col.type = "M";
col.title = "��Ȩ֧����";
col.style = "text-align:right";
col.show = function(rownum,value,row,tdobj,datatable){
	value = value+"";
	tdobj.innerHTML = value.toMoneyFormat();
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "text6";
col.name = "text6";
col.type = "M";
col.title = "���ն�֧���ƶ��";
col.style = "text-align:right";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value!=null&&""!=value){
		value = value+"";
		tdobj.innerHTML = value.toMoneyFormat();
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "text7";
col.name = "text7";
col.type = "M";
col.title = "��������";
col.style = "text-align:right";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value!=null&&""!=value){
		tdobj.innerHTML = value;
	}
}

col = createColumnConfig();
col.id = "agenceposttime";
col.name = "agenceposttime";
col.type = "S";
col.title = "��λ����ʱ��";
col.style = "text-align:center";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null ){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}	
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "sendtime";
col.name = "sendtime";
col.type = "S";
col.title = "����ʱ��";
col.style = "text-align:center";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null ){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}	
}

ColumnConfig[col.id.toLowerCase()]=col;
col = createColumnConfig();
col.id = "posttime";
col.name = "posttime";
col.type = "S";
col.title = "����ʱ��";
col.style = "text-align:center";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null ){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}	
}
ColumnConfig[col.id.toLowerCase()]=col;


col = createColumnConfig();
col.id = "agenceposter";
col.name = "agenceposter";
col.type = "S";
col.title = "��λ������";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
		tdobj.innerHTML = row["agenceposter_name"];
	} else {
		tdobj.innerHTML ="";
	}
}

ColumnConfig[col.id.toLowerCase()]=col;
col = createColumnConfig();
col.id = "sender";
col.name = "sender";
col.type = "S";
col.title = "������";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
		tdobj.innerHTML = row["sender_name"];
	} else {
		tdobj.innerHTML ="";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

ColumnConfig[col.id.toLowerCase()]=col;
col = createColumnConfig();
col.id = "poster";
col.name = "poster";
col.type = "S";
col.title = "������";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
		tdobj.innerHTML = row["poster_name"];
	} else {
		tdobj.innerHTML ="";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "expfunc.input";
col.name = "expfunc";
col.type = "S";
col.title = "���ܷ���";
col.show = function(rownum,value,row,tdobj,datatable){
	eval("var code = row.expfunc_code");
	eval("var name = row.expfunc_name");
	var mainmenu = datatable.mainmenu;
	var submenu = datatable.submenu;
	var vchtypecode = datatable.vchtypecode;
	var divobj = document.createElement('<div style="width:100%"></div>');
	var divValue='';
	var defaultValue='';
	if(code != null && name!= null){
		divobj.innerHTML = code+"-"+name;
		divValue = code+"-"+name;
		defaultValue = code+"-"+name;
	}
	//tdobj.style.backgroundColor = "red";
	// �����ɱ༭����
	
	divobj.datarow = row;
	var columnName = this.name;
	divobj.datatable = datatable;
	// ���ɱ༭ȡ׷�ӵ����
	tdobj.appendChild(divobj);
	// ��굥����Ԫ�������޸����� 
	divobj.ondblclick = function(){
		this.innerHTML="";
		var inputobj = document.createElement('<input id="'+columnName+'_input'+ rownum +'" value="'+divValue+'" style ="border:0;height:20px;line-height:20px;" type ="text" readonly/>');
		var btnobj = document.createElement('<button id="'+columnName+'input_btn" style="height: 20px;width: 25px;border: 0px;background-image: url(/images/bg/dot_pop_black5.gif);background-repeat: no-repeat;margin-bottom: 1px;'
			+'margin-left: 2px;" ></button>');
		// ��datatable�������ù�ϵ
		this.appendChild(inputobj);
		this.appendChild(btnobj);
		//�жϵ�ǰ����¼��Ƿ���ԭ�����¼�
		window.document.body.onclick = function(){
			if(!divobj.contains(event.srcElement)){
				divobj.innerHTML = inputobj.value;
				window.document.body.onclick = null;
			}
		}
		this.show =function(){
			eval("var tempinput =$('"+columnName+"_input"+ rownum +"');");
			var vouObj = new Object();
			vouObj.defValue="";
			vouObj.anyvaluetag="0";
			// ����Ƿ������ⲿУ�鷽��
			// ��ҳ���Ͽ��Ը��ݷ����������򴴽�У�鷽��
			// �������� check+������+ctrl
			// ���У�鲻ͨ����Ҫ��������false
			if(eval("typeof(divobj.datatable.check"+columnName+ "ctrl)")=="function" ){
				var r = eval("divobj.datatable.check"+columnName+ "ctrl(code,row);");
				if(r != null && typeof(r)=="object"){
					vouObj = Object.extend(vouObj,r);
				}
			}
			selectElememtByUrlWithVou(mainmenu,submenu,vchtypecode,columnName,tempinput,vouObj,vouObj.defValue,vouObj.anyvaluetag,"");
			if(tempinput.value!=""&&tempinput.value!="undefined"){
				eval("row."+columnName+"=tempinput.valueid");
				var v = tempinput.value;
				var vs = v.split('-');
				var vcode = vs[0];
				var vname = vs[1];
				eval("row."+columnName+"_code='"+vcode+"'");
				eval("row."+columnName+"_name='"+vname+"'");
			}
			divValue = tempinput.value;
			divobj.innerHTML=divValue;
			
		}
		btnobj.onclick = function(){
			divobj.show();
		}
		inputobj.onclick = function(){
			divobj.show();
		}
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "text5.input";
col.name = "text5";
col.type = "S";
col.title = "ժҪ";
col.style = "width:200px;text-align:left;word-wrap:break-word;word-break:break-all";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
		value = value+"";
	} else {
		value ="";
	}
	// �����ɱ༭����
	var divobj = document.createElement('<div style="width:100%"></div>');
	divobj.innerHTML = value;
	// ��datatable�������ù�ϵ
	divobj.datarow = row;
	divobj.datatable = datatable;
	// ���ɱ༭ȡ׷�ӵ����
	tdobj.appendChild(divobj);
	
	// ��굥����Ԫ�������޸����� 
	divobj.onclick = function(){
		var m = this.innerText.trim();
		if(m == null){
			this.innerHTML ="";
			this.defaultremark = "";
		} else {
			this.defaultremark = m;
		}
		
		// ������ʽ����
		this.parentElement.oldbackgroundColor = this.parentElement.runtimeStyle.backgroundColor;
		this.parentElement.runtimeStyle.backgroundColor = 'yellow';
		
		// ���ÿɱ༭����
		this.contentEditable = true;
		this.setActive();
	}
	
	divobj.onblur = function(){
		var m = this.innerHTML;	
		this.parentElement.runtimeStyle.backgroundColor = "";
		// ���ò��ɱ༭
		this.contentEditable = false;
		divobj.datarow.remark = m;
		this.innerHTML = m;
	}
	
	divobj.onkeydown = function(){
		if(event.keyCode == 13){
			// �س���,����ʧ�����¼�
			this.fireEvent("onblur");
			return false;
		}
		else if(event.keyCode == 27 ){
			// Esc��,�ָ�Ĭ��ֵ
			this.innerText = this.defaultremark;
			this.fireEvent("onblur");
			return false;
		}
	}
}
ColumnConfig[col.id.toLowerCase()]=col;