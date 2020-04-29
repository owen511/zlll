//by ss 公用的加载采集表方法


//formData为结果集数据
function init_table_dc(config, tableDivId,callBack,isCheck){
	var headDefaultValue = {};
	var verifyMust = [];
	var totalRow = config.totalRow;
	var colAttrRatio = config.colAttrRatio;
	
	var formTableCache = new HashMap();

    var _tempTable = new Ext.lt.formulasdatatable({
        rs:config.formData,
        formulascol: config.formulasCol ||
        {},
        formulas: config.formulas ||
        {}
    });
    
    if (config.headLevelno > 1) {
        _tempTable.drawMultiHead(true);
    }
    
    var isFileCol = false;
    var columns = config.titleList;
	
	//给个修改属性的机会
	if(callBack) callBack(columns);
	
    for (var i = 0, n = columns.length; i < n; i++) {
        var column = columns[i];
        
        if (column.datatype && column.datatype == "A") {
            column.edit = false, isFileCol = true;
            
            column.fn = function(i, j, rs, value){
                if (value == null || value == 'null') value = ''; 
                
				if ( (totalRow-1) == i ) return "";

                return ['<span title="点击上传附件" >', '<button class="budget_file"></button>', '</span>'].join('');
            }
        }
        
        //处理默认值
        if (column && column.defaultval != null) {
            headDefaultValue[column.name] = column.defaultval;
        }
		
		//处理必填项
		if(column && column.required == 1){
			verifyMust.push(column.name);
		}
		
		//异步加载引用项
		if(column.getElement != undefined && column.getElement == true && column.sourceElement){
			var sourceElement = column.sourceElement;
			
			var params = {
				"elementCode":sourceElement,
				"products" : config.product,
				"columnName" : column.name
				}
			
			if(!formTableCache.containsKey(sourceElement)){
				
				Ext.lt.RCP.server("datacommon_excelbase_service", "addMapperData",params,function(data){
					if(!formTableCache.containsKey(data.elementCode)){
						
						formTableCache.put(data.elementCode,data.mapperData);
					}
					
					_tempTable.addMapperDatas(data.columnName,formTableCache.get(data.elementCode));
				},function(){});
			}
			else{
				_tempTable.addMapperDatas(column.name,formTableCache.get(sourceElement));
			}
		}
        
        if (column.edit == true) {
           
            column.rowspan = function(l, c, data){
                if (totalRow == "1" && l == 0) {
                    return "totalrow bl";
                }
                if (totalRow == "-1" && l == _tempTable.getRecordset().size() - 1) {
                    return "totalrow bl";
                }
                if (this.required && this.required == '1') {
                    return "required bl";
                }
                return "selectable bl";
            }
            
            column.oneditstart = function(table, e, l, c, data){
            	if (totalRow == "1" && l == 0) {
                    return false;
                }
				
				if (totalRow == "-1" && l == table.getRecordset().size() - 1) {
                    return false;
                }
			
                return true;
            }
            
            column.oneditend = function(table, e, l, c, data){
				var datatype = this.datatype;
				if(this.datatype=="S" && this.format) datatype = "R";
			
				if(!DataVerify[datatype](this,data)){
					data[this.name]="";
					setTimeout(function(){
						table.gotoCell(l,c,function(nextCell){
							if(nextCell!=null){nextCell.fireEvent('onclick');}
						})
					},10);
				}
				
				//不可重复列
				if(this.iskey == 1){
					var colName = this.name,currrentValue = data[colName];
					var rsData = table.getRecordset().toArray();
					var position = data["_locationposition"];
					var result = "";
					for(var i=0,n=rsData.length; i<n; i++){
						var cellValue = rsData[i][colName];
						if((totalRow==1 && i==0) || (totalRow==-1 && (n-1)==i)) continue;
						if(i==position||i==l) continue;
						if(currrentValue && currrentValue==cellValue){
							var totalPos = 0;
							if(totalRow == 1){
								totalPos = 1;
							}
							result += "您填写的数据和第"+(totalPos+i+1)+"行的重复，请重新填写!";
							break;
						}
					}
					if(result){
						alert(result);
						data[this.name]="";
					}
				}
				
                _tempTable.reflash();
            }
        }
        else {
            column.rowspan = function(l, c, data){
                if (totalRow == "1" && l == 0) {
                    return "totalrow bl";
                }
                if (totalRow == "-1" && l == _tempTable.getRecordset().size() - 1) {
                    return "totalrow bl";
                }
                return 'bl';
            }
        }
    }
    
    columns.insert(_tempTable.columns.seq,0);
	
	if(isCheck == undefined || isCheck==true){
		
		columns.insert(_tempTable.columns.checkbox,1);	
	}
    
    _tempTable.columns.checkbox.fn = function(l, c, rs, v){
        if (totalRow == "1" && l == 0) {
            return "";
        }
        
        if (totalRow == "-1" && l == (_tempTable.getRecordset().size() - 1)) {
            return "";
        }
        
        return '<input type="checkbox" ' + (v == this._checkvalue ? 'checked' : '') + ' style="margin-top:3px">';
    }
    
    _tempTable.setCols(columns);
    
    _tempTable.setHiddenColumn(config.hideList);
    
    _tempTable.setClassName("dttheme_budget");
    _tempTable.setSelectDown(false);
    _tempTable.setAlign("left");
    _tempTable.mousedrag(false);
    
    //提供设置行高
    _tempTable.setAllowLineHeight(true);
    _tempTable.setAllowcustom(false);
    //提供列锁定
    _tempTable.setAllowClock(true);
    _tempTable.headsort(true);
    
    _tempTable.setLayout();
    _tempTable.draw(document.getElementById(tableDivId));
    
    //加载附件事件
    if (isFileCol) {
		if (!AddFormAttach) {
            alert("请先加载extendDatatableType.js");
            return;
        }
		
        _tempTable.onEvent("onclick", function(table, el, l, c, d){
            var col = table.getCol(c);
            
            if (col.datatype == "A" && (totalRow-1) != l) {
                
                formAttach = new AddFormAttach(table, el, l, c, d);
                
                formAttach.initFormAttachDiv();
            }
        });
    }
	
	//动态增加方法
	_tempTable.dc_insertRow = function(){
		var rs = this.getRecordset();
		var newdefault = Ext.lt.apply({},headDefaultValue);
		var l = 1;
		
		if(totalRow == "-1"){
			l = -2;	
			rs.addData(newdefault,rs.size()+l);
			this.endAddData(-1,1);
		}
		else{
			rs.addData(newdefault,rs.size()+l);
			this.endAddData(rs.size()+1,1);
		}
		
	//	var rowPos;
	//	if(totalrow=="-1"){
	//		rowPos = datatable.getRecordset().size()-2;
	//	}
	//	else{
	//		rowPos = datatable.getRecordset().size()-1;
	//	}
		
	//	defaultExeFormula(rowPos);
		this.reflashdata('viewdata');
	}
	
	_tempTable.dc_deleteRow = function(){
		var data = this.getRecordSet().query({check:1});
		if(data == null || data.length == 0){
			alert("请选择需要删除的数据!");
			return;
		}
		else if(data && data.length>0){
			if(window.confirm("是否删除选中数据？")){
				var sizeRS = this.getRecordSet().size();
				var delData = [],_tempData = [];
				for (var i = 0; i<data.length;i++){
	
					if(totalRow=="1" && data[i]["_sortid"]==0){
						continue;
					}
					if(totalRow=="-1" && data[i]["_sortid"]==(sizeRS-1)){
						continue;
					}
					
					//判断级次
					if(data[i].LEVELNO < config.levelno ){
						alert("没有权限删除所选数据!");
						return;
					}
					
					delData.push(data[i]["_sortid"]);
					_tempData.push(data[i]);
				}
				
				this.startDeleteData(delData);
				this.getRecordSet().remove(_tempData);
			}
		}
	}
	
	//校验必填
	_tempTable.dc_verifyMust = function(){
		
		if((verifyMust && verifyMust.length > 0) || (colAttrRatio && colAttrRatio.length>0)){
			
			var rsdata = this.getRecordSet();
			
			var start = 0,end = rsdata.size();
			if(totalRow == 1){
				start ++;
			}
			if(totalRow == -1){
				end --;
			}
			for(var i=start; i<end; i++){
				var rsFormData = rsdata.getData(i);
				
				//先校验列扩展属性（项目下达比率）
				var ratioSum = 0 , sb = new StringBuffer();
				for(var r=0,n=colAttrRatio.length; r<n; r++){
					var ratioVal = rsFormData[colAttrRatio[r].COLUMNCODE];
					var colObj = this.getCol(colAttrRatio[r].COLUMNCODE);
					var name = colObj.name;
					
					if(colObj.datatype!="F" && colObj.datatype!="I" && colObj.datatype!="N"){
						
						return name + "列不是数字，请检查！";
					}
					
					ratioSum += parseFloat(ratioVal || 0);
					
					sb.append(name);
				}
				
				if(ratioSum!=100 && ratioSum!=0){
				
					return "第"+(rsFormData._sortid+start)+"行,"+sb.toString(",")+"列相加不为100或者为0，请检查！"	
				}
				
				for(var j=0,k=verifyMust.length; j<k; j++){
					var value = rsFormData[verifyMust[j]];
					
					if(null==value || value==undefined || value===""){
						var name = this.getCol(verifyMust[j]).name;
						
						return name+"列为必录列,有空值请填写!";
	    	 		 }
				}
			}
		}
		
		return "";
	}
	
    return _tempTable;
}

var DataVerify = {
	//字符串
	"S":function(column,data){
		var maxlength = column.maxlength,minlength = column.minlength;
		var value = data[column.name];
		
		if(maxlength && parseInt(maxlength,10) < value.length){
			alert("输入值大于最大长度"+maxlength);
			return false;
		 } 
		 if(minlength && parseInt(minlength,10) > value.length){
			alert("输入值小于最小长度"+minlength);
			return false;
 		 }
		 
		 var regexp = column.regexp;
		 if(regexp && !new RegExp(regexp).test(value)){
			alert("输入格式不正确，请重新输入！");
			return false;
		 }
		 
		return true;
	},
	//日期
	"D":function(column,data){
		if(data && !isDate(data[column.name])){
			alert("日期格式不正确，请重新输入！");
			return false;
		}
		return true;
	},
	//数字
	"F":function(column,data){
		var value = data[column.name];
		var maxvalue = column.maxvalue,minvalue = column.minvalue;
		
		if(isNaN(value)){
			alert("请输入数字！");
			return false;
		}
		if(maxvalue && parseFloat(maxvalue,10) < value){
			alert("输入值大于最大值"+maxvalue); 
			return false;
		 } 
		if(minvalue && parseFloat(minvalue) > value){
			alert("输入值小于最小值"+minvalue); 
			return false;
		 }
		 
		// var dotname = column.format.dotname;
		// data[column.name] = ToFixed(value,dotname);
		 data[column.name] = value;
		 
		return true;
	},
	"I":function(column,data){
		return DataVerify.F(column,data);
	},
	"N":function(column,data){
		return DataVerify.F(column,data);
	},
	//引用项
	"R":function(column,data){
		var required = column.required;
		if((required!=1 && data[column.name] ) || (required==1) ){
			var colData;
			try{
				colData = column.getMapperData(data[column.name]);
			}
			catch(e){
				alert("输入的数据在引用项中不存在或该引用项没有数据,请检查！");
				return false;
			}
			if(!colData){
				alert("输入的引用项值不存在，请重新输入！");							
				return false;
			}
		}
		
		return true;
	}
};
