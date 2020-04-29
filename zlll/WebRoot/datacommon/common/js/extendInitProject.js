//by ss 用于采集表展示（表单类型）同extendInitTable.js一样

function ProjectForm(data,serviceId){
	
	if(!CalendarProject){
		alert("请先加载calendarProject.js文件!");
		return;
	}
	
	if(!Ext.lt.Qtree){
		alert("请先加载qtree组件！");
		return;
	}
	
	this.refCache = new HashMap();
	
	this.context = $(data || "");
	
	this.tableId = "";
	
	this.product = "";
	
	this.version = "1.0";
	this.type = "table";
	
	this.serviceId = (serviceId || "datacommon_excelbase_service");
}

ProjectForm.prototype.draw = function(divId){
	var tempDiv = this.newInstance(divId);
	 
	if(tempDiv){
		
		$(tempDiv).html(this.context);
		
		this.tableId = this.context.find("table").attr("id");
		this.product = this.context.find("table").attr("product");
		
		this._bindMousedown();
		this._bindCellEvent();
	}
}

ProjectForm.prototype._bindCellEvent = function(){
	var pf = this;
	var $table = this.context.find("table");
	$table.bind("click",function(e){
		var $el = $(e.target);
		
		if($el.is("td") || $el.parent().is("td")){
			
			pf.clickCell(e);	
		}
	});
	
	$table.bind("dblclick",function(e){
	    var $el = $(e.target);
	    
	    if($el.is("td") || $el.parent().is("td")){
	      
		  pf.dblclickCell(e);
	    }
    });
	
	$table.find("input,textarea").bind("blur",function(e){
		var _rs = pf.verifyCell(e.target);
		if(!_rs){
			e.target.select();
		}
		//Check by doing other things
		else{
			
			pf.endFormatCell(e);
		}
	});
	
	$table.find("input,textarea").bind("focus",function(e){
		
		pf.startFormatCell(e);
	});
}

//click event
ProjectForm.prototype.clickCell = function(e){
	if(e.target.disabled) return;
		
	var dataType = this.getDataType(e.target);
	if("reference" == dataType){
		
		this.initRefEvent(e.target);
	}
	
	if("datetime" == dataType){
		
		this.initDateEvent(e.target);
	}
	
	
}

ProjectForm.prototype.dblclickCell = function(e){
	
}

ProjectForm.prototype.startFormatCell = function(e){
	var dataType = this.getDataType(e.target);
	
	if("number" == dataType){
		
		this.startFormatNumber(e.target);
	}
}

ProjectForm.prototype.endFormatCell = function(e){
	var dataType = this.getDataType(e.target);
	
	if("number" == dataType){
		
		this.endFormatNumber(e.target);
	}
}

ProjectForm.prototype.initDateEvent = function(_input){
	var dt = $(_input);   

	 var onCalSelected = function(cal,date,dateObj){  
	    cal.sel.value = date;
    	dt.attr("itemid",dateObj);
	    
		if (cal.dateClicked) {
	    	cal.callCloseHandler();
	    } 
    };

	var onCalClosed = function(cal) {
		cal.hide();
	};

	//if(!_dynarch_popupCalendar_project){
		
		dt.cal = new CalendarProject(1, null, onCalSelected, onCalClosed);
		dt.cal.setRange(1900, 2050);
		dt.cal.yearStep = 1;
		dt.cal.create();
	//}
	//else{
	//	dt.cal = _dynarch_popupCalendar_project;
		//dt.cal.setDate(new Date()); 
	//}
	dt.cal.sel = dt[0];
	
	//in order to be compatible with form
	var format = dt.attr("format");
	if(format){
		if(~format.indexOf("YYYY")){
			format = format.replace("YYYY","%Y");
		}
		if(~format.indexOf("MM")){
			format = format.replace("MM","%m");
		}
		if(~format.indexOf("DD")){
			format = format.replace("DD","%d");
		}
	}
	
	dt.cal.setDateFormat(format);

	dt.onStartEdit = function(td) {
		this.cal.showAtElement(this[0]);
		/*
		var strDate = this.val();
		if (strDate) {
			this.cal.parseDate(strDate);
		}
		*/
	};
	dt.cal.closeCallBack = function() {
		dt.val("");
		dt.attr("itemid","");
	};
	
	dt.onStartEdit();
	
	//release object
	dt.cal == null;
}

ProjectForm.prototype.initRefEvent = function(_input){
	if(!_input.code) return;var pf = this;
	
	var elementData = this.findElementData(_input.code);
	
	var $tempDiv = $("#"+this.tableId+"_tempContainer");
	$tempDiv.width($(_input).width()+3);

	var pos = $(_input).position();
	$tempDiv.css("top",pos.top+"px");
	$tempDiv.css("left",pos.left+"px");
	
	$tempDiv.show();
	
	var checked = [];
	if(_input.itemid){
		checked.push(_input.itemid);
	}
	
	var initDivTree = function(refData,checked,_input){
		var _tempTree = new Ext.lt.Qtree({
			data: refData,
			showRootNode:true,
			outformart:_input.format,
			selectmode:'false',
			values:checked
		});
		
		_tempTree.draw($tempDiv[0]);
		
		_tempTree.on({nodeclick : function(tree,param){
	    	var selNode = param.data;
	    	if(!selNode || selNode.isleaf == 0){
				//不用提示，直接展开末级
	    		//alert("请选择末级节点！");
	    		//return;
	    	}else{
	    		$(".tempContainerClass").hide();
	    		
				var format = _input.format;
				format = format.replace("#code",selNode.code);
				format = format.replace("#name",selNode.name);
				
	    		_input.innerText = format;
	    		_input.itemid = selNode.itemid;
				
				pf.clickRefAfter(selNode);
	    	}
	    }});
	}
	
	initDivTree(elementData,checked,_input);
}

ProjectForm.prototype.startFormatNumber = function(_input){
	_input.value = _input.itemid || 0;
	_input.select();
}

ProjectForm.prototype.endFormatNumber = function(_input){
	_input.itemid = _input.value;

	var _ov = _input.itemid || 0;
	var thousand = (_input.thousand == "true" ? true : false);
	var decimal = parseInt((_input.decimal || "0"),10);
	
	_input.value = this.toFixed(_ov,decimal,thousand);
}

//click on the tree's node after the call
ProjectForm.prototype.clickRefAfter = function(node){
	
}

ProjectForm.prototype.findElementData = function(elementCode){
	if(!this.refCache.containsKey(elementCode)){
		
		var resultData = this.asynserver("loadRefData", {"sourceCode":elementCode,"products":this.product});
		
		this.refCache.put(elementCode, resultData.refList);
	}
	
	return this.refCache.get(elementCode); 
}

ProjectForm.prototype.asynserver = function(method,params){
	showdiv();
	var resultData = Ext.lt.RCP.asynserver(this.serviceId, method,params);
	if(resultData.error){
		closediv();
		alert(resultData.error);
		return;
	}
	else {
		closediv();
	}
	return resultData;
}

ProjectForm.prototype.setDisabled = function(columnId,b){
	if(typeof b == "boolean"){
		this.findInput(columnId).attr("disabled",b);
	}
	
	return this;
}

//return (key + value) datas, at the same time, return error information
ProjectForm.prototype.getData = function(){
	var pf = this,data = {},errorMessage = "";
	
	pf.findInput().each(function(index){
		var key,value;
		
		if(this.nodeName == "INPUT" && this.type == "radio"){
			key = this.name.substring(pf.tableId.length + 1);
			value = pf.context.find("input[type=radio][name="+this.name+"]:checked").val();
		}
		else{
			key = this.id.substring(pf.tableId.length + 1);
			value =  this.itemid || $(this).val();
		}
		
		var $span = $(this).parent().prev().find("label>span");
		var nodeName = $span.eq(0).text();

		var isRequired = $span.eq(1).hasClass("tip");
		if(isRequired && value == ""){
			errorMessage = "<"+nodeName+">是必填项！";
			return false;
		}
		
		errorMessage = pf.verify[this.dataType](this,value);
		
		if(errorMessage != ""){
			errorMessage = "<"+nodeName+">"+errorMessage;
			return false;			
		}
		
		data[key] = value;
	});
	
	return {"data":data,"error":errorMessage};
}

ProjectForm.prototype.getValue = function(columnName){
	if(!columnName) return;
	
	var value = "", $o = null; 
	
	if(~columnName.indexOf(this.tableId)){
		$o = $("#"+columnName+"");
	}
	else{
		$o = this.findInput(columnName.toUpperCase());		
	}
	
	if($o && $o.length > 0){
		var _o = $o[0], dataType = this.getDataType(_o);
		
		if(_o.nodeName == "INPUT" && _o.type == "radio"){
			
			value = pf.context.find("input[type=radio][name="+this.tableId+"_"+_o.name+"]:checked").val();
		}
		else if("number" == dataType){
			
			value = _o.value;
		}
		else{
			
			value = ((!!+_o.itemid) ? _o.itemid : _o.value);
		}
	}
	return value;
}


//verify's method , can be overridden
ProjectForm.prototype.verifyCell = function(_input){
	
	var errorMessage = this.verify[this.getDataType(_input)](_input,this.getValue(_input.id));
	
	if(errorMessage != ""){
		var $span = $(_input).parent().prev().find("label>span");
		var nodeName = $span.eq(0).text();
		
		alert("<"+nodeName+">"+errorMessage);
		return false;			
	}
	
	return true;
}

ProjectForm.prototype.verify = {
	
	"singlelinetext":function(_input,value){
		var maxLength = _input.maxLength,minLength = _input.minLength;
		var valueLength = 0;
		
		for(var i=0,n=value.length; i<n; i++){
			
			if(isChinese(value.charAt(i))){
				valueLength += 2;
			}
			else{
				valueLength ++;
			}
		}
		
		if(maxLength && parseInt(maxLength,10) < valueLength){
			return "输入值大于最大长度"+maxLength;
		} 
		if(minLength && parseInt(minLength,10) > valueLength){
			return "输入值小于最小长度"+minLength;
 		}
		
		var regexp = _input.regexp;
		if(regexp && regexp!="null" && !new RegExp(regexp).test(value)){
			return "输入格式不正确，请重新输入！";
		}
		 
		return "";
	},
	
	"mutilinetext":function(_input,value){
		return projectForm.verify.singlelinetext(_input,value);
	},
	
	"datetime":function(_input,value){
		return "";
	},
	
	"number":function(_input,value){
		var maxValue = _input.maxValue,minValue = _input.minValue;
		
		if(isNaN(value)){
			return "请输入数字！";
		}
		if(maxValue && parseFloat(maxValue,10) < value){
			return "输入值大于最大值"+maxValue;
		 } 
		if(minValue && parseFloat(minValue,10) > value){
			return "输入值小于最小值"+minValue;
		 }
		 
		return "";
	},

	"reference":function(_input,value){
		return "";
	},
	
	"bool":function(_input,value){
		return "";
	}
};

//a distinction between different types of assignment
ProjectForm.prototype.setValues = {
	
	"singlelinetext":function(_input,value){
		_input.value = value;
	},
	
	"mutilinetext":function(_input,value){
		projectForm.setValues.singlelinetext(_input,value);
	},
	
	"datetime":function(_input,value){
		
	},
	
	"number":function(_input,value){
		 projectForm.setValues.singlelinetext(_input,value);
	},

	"reference":function(_input,value){
		var format = _input.format,val = "";
		
		val = format.replace("#code", value.code);
		val = val.replace("#name", value.name);
		
		_input.value = val;
		_input.itemid = value.itemid;
	},
	
	"bool":function(_input,value){
		
	}
};

//not use number's tofixed
ProjectForm.prototype.toFixed = function (value,decimal,thousand){
	var len = Math.pow(10, decimal);

	if (parseFloat(value) == value) {
		value = Math.round(value * len) / len;
	}
	if (value.toString().indexOf(".") != -1) {
		var cellarr = new Array();
		cellarr = value.toString().split(".");
		if (cellarr[1].length < decimal) {
			var cz = Math.pow(10, decimal - cellarr[1].length);
			var decw = cz.toString().substring(1, cz.length);
			value = value.toString() + decw.toString();
		}
	}
	if (value != null && value != "" && value.toString().indexOf(".") == -1) {
		if (value != "NaN") {
			var dec = len.toString().substring(1, len.length);
			if (!dec)
				value = value;
			else
				value = value + "." + dec;
		} else {
			value = "0." + dec;
		}
	}
	
	if(thousand){
		var tnum = value.toString().split(".")[0];
		var dnum = value.toString().split(".")[1];
		
		for(var i=0,n=tnum.length; i<Math.floor((n-(1+i))/3); i++){
			
			tnum = tnum.substring(0,tnum.length-(4*i+3))+','+ tnum.substring(tnum.length-(4*i+3)); 
		}
		
		if(dnum) tnum += "."+dnum;
		value = tnum;
	}
	
	return value;
}

ProjectForm.prototype.getDataType = function(_input){
	return _input.dataType;
}

ProjectForm.prototype.findInput = function(columnId){

	return columnId ? $("#"+this.tableId+"_"+columnId) : this.context.find("input,textarea");
}

ProjectForm.prototype.setValue = function(column,value){
	var colObj = this.newInstance(this.tableId+"_"+column);
	
	this.setValues[this.getDataType(colObj)](colObj, value);
	
	return this;
}

ProjectForm.prototype.setTableStyle = function(style){
	
	this.context.find(">table").removeClass().addClass(style);
}

ProjectForm.prototype.newInstance = function(id){
	return document.getElementById(id);
}

ProjectForm.prototype._bindMousedown = function(){
	
	($("body").length > 0) && (
		$("body").bind("mousedown",function(e) {
			var el = $(e.target);
			if (el.length>0 && el.parents(".tempContainerClass").length == 0 && !el.hasClass("tempContainerClass") ) {
				$(".tempContainerClass").hide();
			}
		})
	)	
}

if(DataCommon == null) { var DataCommon = {}}
DataCommon.ProjectForm = ProjectForm;