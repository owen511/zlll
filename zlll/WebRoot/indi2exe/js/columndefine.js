// 操作日期设置
col = createColumnConfig();
col.id = "lastupdatetime";
col.name = "lastupdatetime";
col.type = "S";
col.title = "操作日期";
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

// 年度列设置
col = createColumnConfig();
col.id = "Year";
col.name = "Year";
col.type = "I";
col.title = "年度";
col.style = "text-align:right;left;width:40px";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "billcode";
col.name = "billcode";
col.type = "S";
col.title = "单号";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "Billcode.input";
col.name = "Billcode";
col.type = "S";
col.title = "单号";
col.show = function(rownum,value,row,tdobj,datatable){
	// 增加文本框和默认内容
	var input = document.createElement('<input type="text" style="width:99%;border:0px"/>');
	input.value = value;
	input.name = this.name;
	tdobj.appendChild(input);
	input.row = row;
	
	input.onblur = function(){
		var name = this.name;
		eval("this.row."+name+"=this.value");
		// 标记被改变
		this.row.chagned = true;
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "remark";
col.name = "remark";
col.type = "S";
col.title = "摘要";
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
col.title = "金额";
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
col.title = "金额";
col.style = "text-align:right";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
		value = value+"";
	} else {
		value ="";
	}
	tdobj.style.backgroundColor = '#FFEFC3';
	// 创建可编辑区域
	var divobj = document.createElement('<div style="width:100%"></div>');
	divobj.innerHTML = value.toMoneyFormat();
	// 与datatable建立引用关系
	divobj.datarow = row;
	divobj.datatable = datatable;
	// 将可编辑取追加到表格
	tdobj.appendChild(divobj);
	// 鼠标单击单元格后可以修改数据 
	divobj.onclick = function(){
		//如果已经可编辑,则返回
		//jinjiyong	20081117
		if(this.contentEditable == "true"){
			return;
		}
		//window.status ="1";
		// 首先将千分位去掉
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
		
		// 设置样式加重
		this.parentElement.oldbackgroundColor = this.parentElement.runtimeStyle.backgroundColor;
		this.parentElement.runtimeStyle.backgroundColor = '#FFFF00';
		
		// 设置可编辑属性
		this.contentEditable = true;
		//window.status = "默认值：" +this.defaultamt;
		this.setActive();
	}
	
	divobj.onblur = function(){
		if(this.contentEditable!="true"){
			return;
		}
		var m = this.innerHTML
		
		m = m.replace(/,/g,"");
		if(isNaN(m)){
			alert("您数据的数字格式有问题，请检查！");
			this.setActive();
			return ;
		}
		
		// 检查是否设置外部校验方法
		// 在页面上可以根据方法命名规则创建校验方法
		// 命名规则 checka+属性名+cell
		// 如果校验不通过需要方法返回false
		if(this.datatable.checkamtcell){
			// 此处把金额类型转成数字
			var r = this.datatable.checkamtcell(this.defaultamt ,parseFloat(m),row);
			if(r == false){
				this.setActive();
				return ;
			}
		}
		
		if(this.parentElement!=null){
			this.parentElement.runtimeStyle.backgroundColor = "";
		}
		// 设置不可编辑
		this.contentEditable = false;
		divobj.datarow.amt = m;
		this.innerHTML = m.toMoneyFormat();
	}
	
	divobj.onkeydown = function(){
		if(event.keyCode == 13){ 
			// 回车键,调用失焦点事件
			this.fireEvent("onblur");
			return false;
		}
		else if(event.keyCode == 27 ){
			// Esc键,恢复默认值
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
col.title = "业务处室";
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
col.title = "资金来源";
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
col.title = "功能分类";
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
col.title = "指标来源";
col.show = function(rownum,value,row,tdobj,datatable){
	eval("var code = row.fundsource_code");
	eval("var name = row.fundsource_name");
	if(code != null && name!= null){
		tdobj.innerHTML = code+"-"+name;
	}
}
ColumnConfig[col.id.toLowerCase()]=col;
/*jinjiyong 下面已存在
col = createColumnConfig();
col.id = "remark";
col.name = "remark";
col.type = "S";
col.title = "摘要";
ColumnConfig[col.id.toLowerCase()]=col;
*/

col = createColumnConfig();
col.id = "incomeexpmanage";
col.name = "incomeexpmanage";
col.type = "S";
col.title = "支出类型";
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
col.title = "预算来源性质";
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
col.title = "状态";
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
col.title = "制单日期";
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
col.title = "单位";
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
col.title = "支出功能分类";
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
col.title = "支出经济分类";
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
col.title = "计划金额";
col.style = "text-align:right";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "startamt";
col.name = "startamt";
col.type = "M";
col.title = "开始金额";
col.style = "text-align:right";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "profund";
col.name = "profund";
col.type = "S";
col.title = "项目归类";
col.show = function(rownum,value,row,tdobj,datatable){
	eval("var code = row.profund_code");
	eval("var name = row.profund_name");
	if(code != null && name!= null){
		tdobj.innerHTML = code+"-"+name;
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

//业务表中没有profund，启用了预留字段element13
col = createColumnConfig();
col.id = "element13";
col.name = "element13";
col.type = "S";
col.title = "项目归类";
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
col.title = "项目类别";
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
col.title = "项目";
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
col.title = "月份";
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
col.title = "支付方式";
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
col.title = "收支管理结构";
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
col.title = "指标管理科室";
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
col.title = "业务归口处科";
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
col.title = "收款账户号";

ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "gatheringbankaccount";
col.name = "gatheringbankaccount";
col.type = "S";
col.title = "收款账户流水号";

ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "gatheringbankname";
col.name = "gatheringbankname";
col.type = "S";
col.title = "收款账户开户行";

ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "gatheringbankacctname";
col.name = "gatheringbankacctname";
col.type = "S";
col.title = "收款账户名";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "paymentbankacctcode";
col.name = "paymentbankacctcode";
col.type = "S";
col.title = "付款账号";

ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "paymentbankname";
col.name = "paymentbankname";
col.type = "S";
col.title = "付款账户开户行";

ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "paymentbankacctname";
col.name = "paymentbankacctname";
col.type = "S";
col.title = "付款账户名";

ColumnConfig[col.id.toLowerCase()]=col;

//end

col = createColumnConfig();
col.id = "wfstatus";
col.name = "wfstatus";
col.type = "S";
col.title = "状态";
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
col.title = "发文文号";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "text2";
col.name = "text2";
col.type = "S";
col.title = "管理文号";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "userid";
col.name = "userid";
col.type = "S";
col.title = "经办人";
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
col.title = "发文日期";
col.style = "text-align:center";
col.show = function(rownum,value,row,tdobj,datatable){
	tdobj.innerHTML = value;	
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "endbal";
col.name = "endbal";
col.type = "M";
col.title = "指标余额";
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
col.title = "可用余额";
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
col.title = "采购标志";
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
col.title = "计划金额";
col.show = function(rownum,value,row,tdobj,datatable){
	// 增加文本框和默认内容
	var input = document.createElement('<input type="text" style="width:99%;border:0px" value ="'+ value + '"/>');
	input.value = value;
	input.name = this.name;
	tdobj.appendChild(input);
	input.row = row;
	
	input.onblur = function(){
		var name = this.name;
		eval("this.row."+name+"=this.value");
		// 标记被改变
		this.row.chagned = true;
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "month.input";
col.name = "month";
col.type = "S";
col.title = "月份";
col.show = function(rownum,value,row,tdobj,datatable){
	// 增加文本框和默认内容
	var input = document.createElement('<input type="text" style="width:98%;border:0px" value ="'+ row.month + '"/>');
	input.value = value;
	input.name = this.name;
	tdobj.appendChild(input);
	input.row = row;	
	input.onblur = function(){
		var name = this.name;
		eval("this.row."+name+"=this.value");
		// 标记被改变
		this.row.chagned = true;
	}
}
ColumnConfig[col.id.toLowerCase()]=col;


col = createColumnConfig();
col.id = "remark.input";
col.name = "text5";
col.type = "S";
col.title = "摘要";
col.style = "text-align:left";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
		value = value+"";
	} else {
		value ="";
	}
	tdobj.style.backgroundColor = '#FFEFC3';
	// 创建可编辑区域
	var divobj = document.createElement('<div style="width:100%"></div>');
	divobj.innerHTML = value;
	// 与datatable建立引用关系
	divobj.datarow = row;
	divobj.datatable = datatable;
	// 将可编辑取追加到表格
	tdobj.appendChild(divobj);
	
	// 鼠标单击单元格后可以修改数据 
	divobj.onclick = function(){
		var m = this.innerText.trim();
		if(m == null){
			this.innerHTML ="";
			this.defaultremark = "";
		} else {
			this.defaultremark = m;
		}
		
		// 设置样式加重
		this.parentElement.oldbackgroundColor = this.parentElement.runtimeStyle.backgroundColor;
		this.parentElement.runtimeStyle.backgroundColor = '#FFFF00';
		
		// 设置可编辑属性
		this.contentEditable = true;
		this.focus();
		this.setActive();
	}
	
	divobj.onblur = function(){
		var m = this.innerHTML;	
		this.parentElement.runtimeStyle.backgroundColor = "";
		// 设置不可编辑
		//this.contentEditable = false;
		divobj.datarow.remark = m;
		this.innerHTML = m;
	}
	
	divobj.onkeydown = function(){
		if(event.keyCode == 13){
			// 回车键,调用失焦点事件
			this.fireEvent("onblur");
			return false;
		}
		else if(event.keyCode == 27 ){
			// Esc键,恢复默认值
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
col.title = "支付方式";
col.show = function(rownum,value,row,tdobj,datatable){
	eval("var code = row.paytype_code");
	eval("var name = row.paytype_name");
	// 增加文本框和默认内容
	var input = document.createElement('<input type="text" style="width:98%;border:0px" value = "'+ code + '-' +value + '"/>');
	input.value = value;
	input.name = this.name;
	tdobj.appendChild(input);
	input.row = row;
	
	input.onblur = function(){
		var name = this.name;
		eval("this.row."+name+"=this.value");
		// 标记被改变
		this.row.chagned = true;
	}
}

col = createColumnConfig();
col.id = "text9";
col.name = "text9";
col.type = "S";
col.title = "指标说明";
ColumnConfig[col.id.toLowerCase()]=col;


col = createColumnConfig();
col.id = "creater";
col.name = "creater";
col.type = "S";
col.title = "制单人";
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
col.title = "基建标志";
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
col.title = "指标版本";
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
col.title = "指标可执行标志";
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
col.title = "转拨标志";
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
col.title = "执行方式";
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
col.title = "以收定支标志";
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
col.title = "以收定支标志";
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
col.title = "需要冲销金额";
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
col.title = "调整金额";
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
col.title = "初始金额";
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
col.title = "支付方式";
col.show = function(rownum,value,row,tdobj,datatable){
	eval("var code = row.paytype_code");
	eval("var name = row.paytype_name");
	// 增加文本框和默认内容
	var input = document.createElement('<ui:elementtree id="paytype" element="paytype"/>');
	input.value = value;
	input.name = this.name;
	tdobj.appendChild(input);
	input.row = row;
	
	input.onblur = function(){
		var name = this.name;
		eval("this.row."+name+"=this.value");
		// 标记被改变
		this.row.chagned = true;
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "settlemode";
col.name = "settlemode";
col.type = "S";
col.title = "结算方式";
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
col.title = "支付类型";
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
col.title = "转拨标志";
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
col.title = "单位自有资金";
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
col.title = "合同金额";
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
col.title = "单价";
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
col.title = "数量";
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
col.title = "规格";
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
col.title = "合同号";
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
col.title = "清算银行";
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
col.title = "清算付款账户开户行";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "clearbankacctname";
col.name = "clearbankacctname";
col.type = "S";
col.title = "清算账户名";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "clearbankacctcode";
col.name = "clearbankacctcode";
col.type = "S";
col.title = "清算银行账号";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "executemethod";
col.name = "executemethod";
col.type = "S";
col.title = "执行方式";
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
col.title = "归集银行";
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
col.title = "用途";
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
col.title = "汇出行省";
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
col.title = "汇出行市";
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
col.title = "汇入行省";
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
col.title = "汇入行市";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

//报表字段显示设置

col = createColumnConfig();
col.id = "reporttype";
col.name = "reporttype";
col.type = "S";
col.title = "报表类别";
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
col.title = "报表编码";
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
col.title = "报表名称";
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
col.title = "预算年度";
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
col.title = "支付阶段";
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
col.title = "打印状态";
col.show = function(rownum,value,row,tdobj,datatable){
	if(row["printtag"] == 0){
		tdobj.innerHTML = "0-未打印";
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
col.title = "打印状态";
col.show = function(rownum,value,row,tdobj,datatable){
	if(row["printclearnoticetag"] == 0){
		tdobj.innerHTML = "0-未打印";
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
col.title = "代理银行";
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
col.title = "业务类型";
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
col.title = "清算日期";
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
col.title = "付款账户";
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
col.title = "清算账户";
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
col.title = "打印状态";
col.show = function(rownum,value,row,tdobj,datatable){
	if(row["printclearnoticetag"] == 0){
		tdobj.innerHTML = "0-未打印";
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
col.title = "打印日期";
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
col.title = "导出日期";
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
col.title = "打印日期";
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
col.title = "打印状态";
col.show = function(rownum,value,row,tdobj,datatable){
	if(row["bankprinttag"] == 0){
		tdobj.innerHTML = "0-未打印";
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
col.title = "打印日期";
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
col.title = "打印日期";
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
col.title = "打印状态";
col.show = function(rownum,value,row,tdobj,datatable){
	if(row["printcleartag"] == 0){
		tdobj.innerHTML = "0-未打印";
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
col.title = "打印单号";
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
col.title = "打印单号";
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
col.title = "打印单号";
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
col.title = "工资标识";
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
col.title = "摘要";
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
col.title = "实拨标识";
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
col.title = "终审日期";
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
col.title = "项目编码";
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
col.title = "项目名称";
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
col.title = "批复文号";
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
col.title = "启始年度";
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
col.title = "结束年度";
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
col.title = "起始日期";
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
col.title = "结束日期";
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
col.title = "状态";
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
col.title = "导出状态";
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
col.title = "打印日期";
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
col.title = "打印状态";
col.show = function(rownum,value,row,tdobj,datatable){
	if(row["printenteraccttag"] == 0){
		tdobj.innerHTML = "0-未打印";
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
col.title = "打印单号";
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
col.title = "打印单号";
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
col.title = "打印日期";
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
col.title = "打印状态";
col.show = function(rownum,value,row,tdobj,datatable){
	if(row["printtag4"] == 0){
		tdobj.innerHTML = "0-未打印";
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
col.title = "打印单号";
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
col.title = "打印日期";
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
col.title = "打印状态";
col.show = function(rownum,value,row,tdobj,datatable){
	if(row["printtag5"] == 0){
		tdobj.innerHTML = "0-未打印";
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
col.title = "年初预算";
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
col.title = "已下达数";
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
col.title = "直接支付数";
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
col.title = "授权支付数";
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
col.title = "以收定支控制额度";
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
col.title = "控制类型";
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
col.title = "单位终审时间";
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
col.title = "发送时间";
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
col.title = "终审时间";
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
col.title = "单位终审人";
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
col.title = "发送人";
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
col.title = "终审人";
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
col.title = "功能分类";
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
	// 创建可编辑区域
	
	divobj.datarow = row;
	var columnName = this.name;
	divobj.datatable = datatable;
	// 将可编辑取追加到表格
	tdobj.appendChild(divobj);
	// 鼠标单击单元格后可以修改数据 
	divobj.ondblclick = function(){
		this.innerHTML="";
		var inputobj = document.createElement('<input id="'+columnName+'_input'+ rownum +'" value="'+divValue+'" style ="border:0;height:20px;line-height:20px;" type ="text" readonly/>');
		var btnobj = document.createElement('<button id="'+columnName+'input_btn" style="height: 20px;width: 25px;border: 0px;background-image: url(/images/bg/dot_pop_black5.gif);background-repeat: no-repeat;margin-bottom: 1px;'
			+'margin-left: 2px;" ></button>');
		// 与datatable建立引用关系
		this.appendChild(inputobj);
		this.appendChild(btnobj);
		//判断当前点击事件是否在原来的事件
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
			// 检查是否设置外部校验方法
			// 在页面上可以根据方法命名规则创建校验方法
			// 命名规则 check+属性名+ctrl
			// 如果校验不通过需要方法返回false
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
col.title = "摘要";
col.style = "width:200px;text-align:left;word-wrap:break-word;word-break:break-all";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null){
		value = value+"";
	} else {
		value ="";
	}
	// 创建可编辑区域
	var divobj = document.createElement('<div style="width:100%"></div>');
	divobj.innerHTML = value;
	// 与datatable建立引用关系
	divobj.datarow = row;
	divobj.datatable = datatable;
	// 将可编辑取追加到表格
	tdobj.appendChild(divobj);
	
	// 鼠标单击单元格后可以修改数据 
	divobj.onclick = function(){
		var m = this.innerText.trim();
		if(m == null){
			this.innerHTML ="";
			this.defaultremark = "";
		} else {
			this.defaultremark = m;
		}
		
		// 设置样式加重
		this.parentElement.oldbackgroundColor = this.parentElement.runtimeStyle.backgroundColor;
		this.parentElement.runtimeStyle.backgroundColor = 'yellow';
		
		// 设置可编辑属性
		this.contentEditable = true;
		this.setActive();
	}
	
	divobj.onblur = function(){
		var m = this.innerHTML;	
		this.parentElement.runtimeStyle.backgroundColor = "";
		// 设置不可编辑
		this.contentEditable = false;
		divobj.datarow.remark = m;
		this.innerHTML = m;
	}
	
	divobj.onkeydown = function(){
		if(event.keyCode == 13){
			// 回车键,调用失焦点事件
			this.fireEvent("onblur");
			return false;
		}
		else if(event.keyCode == 27 ){
			// Esc键,恢复默认值
			this.innerText = this.defaultremark;
			this.fireEvent("onblur");
			return false;
		}
	}
}
ColumnConfig[col.id.toLowerCase()]=col;