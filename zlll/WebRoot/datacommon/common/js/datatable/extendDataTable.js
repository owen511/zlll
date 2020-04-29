if(DataCommon == null) {var DataCommon = {}}
//by ss ���õļ��زɼ�����

DataCommon.DataTable = function(config,set){
	if(!(this instanceof DataCommon.DataTable)){
		
		return new DataCommon.DataTable(config,set); 
	}
	
	this.SERVICEPATH = "datacommon_excelbase_service";

	this.markData = {};
	this.verifyMust = [];
	this.headDefaultValue = {};
	
	this.drawMultiHead = (config.headLevelno > 1);
	
	var totalRow = config.totalRow;
	this.colAttrRatio = config.colAttrRatio;
	
	this.keyIds = config.keyIds;
	var tableCode = config.tableCode;
	
	var formTableCache = new HashMap();

	//Ĭ��
	this.setting = {
		cols : [],
		hideList : [],
		className : "dttheme_budget",
		check_Style: "checkbox",
		columnsSeq : true,
		autoLoad : true,
		servicePath : "",
		isEdit : true,
		selectDown : false,
		align : "left",
		mousedrag : false,
		allowLineHeight : true,
		allowcustom : false,
		allowClock : true,
		headsort : false,
		params : "",
		totalRow : config.totalRow,
		modifyMark : false,
		
		callback : {
			oneditstart : editstart,
			oneditend : editend,
			completedInit : null,
			ondblclick	: null,
			onclick : null,
			onsaveData : null,
			colFormat : null,
			completedTable : null,
			onrowSpan : rowspan
		},
		tableDivId : "",
		divObject : null
	};
	
	this.init = function(set){
		set = set || {};
	
		var _tempCallBack = set.callback;
		set.callback = undefined;
		
		$.extend(this.setting,set);
		$.extend(this.setting.callback,_tempCallBack);
		
		if(!this.setting.servicePath){
			this.setting.servicePath = this.SERVICEPATH;
		}
		
		if(this.setting.hideList.length == 0){
			this.setting.hideList = config.hideList;
		}
		
		this.setting.divObject = $("#"+this.setting.tableDivId);
		this.setting.divObject.unbind("completedTable");
		this.setting.divObject.bind("completedTable", function(event, opts, table, data) {
			
			apply(opts.callback.completedTable, [opts, table, data]);
		});
		
		if(this.setting.cols.length == 0){
			
			this.setting.cols = config.titleList;
		}
		
	};
	this.init(set);
	
	//��������ԶԴ����¼������κδ���
	function eventHandle() {

		this.oneditend = function(column, arg, setting) {
			var dt = setting.dataTable;
			var colName = dt.getCol(arg[3]).name;
			
			var oldValue = dt.getOldValue()
			apply(setting.callback["oneditend"], arg);
			
			setting.modifyMark = (oldValue != arg[4][colName]);
		};

		this.oneditstart = function(column, arg, setting) {
			apply(setting.callback["oneditstart"], arg);
		};
		
		this.cellclick = function(column, arg, setting) {
			apply(setting.callback["cellclick"], arg);

		} 
		this.rowSpan = function(column, arg, setting){
			return apply(setting.callback["onrowSpan"], [setting.dataTable,column,arg[0],arg[1],arg[2]]);
		}
	}
	
	//��ʼ����
	function initTable(config,setting,verifyMust,headDefaultValue){
		var _tempTable = null;
		if(setting.isEdit){
			_tempTable = new Ext.lt.formulasdatatable({
        		rs:config.formData,
        		formulascol: config.formulasCol ||
        		{},
        		formulas: config.formulas ||
        		{}
    		});
		}
		else{
			_tempTable = new Ext.lt.datatable35(config.formData);
		}
		
		if(setting.columnsSeq){
			
			setting.cols.insert(_tempTable.columns.seq,0);
		}
		
		if(setting.check_Style == "checkbox"){
			
	    	setting.cols.insert(_tempTable.columns.checkbox,1);
		}
		else if(setting.check_Style == "radio"){
			setting.cols.insert(_tempTable.columns.radio,1);
		}
		
		setting.cols = initCols(setting,_tempTable,verifyMust,headDefaultValue);
		
		setting.isEdit && bindTableEvent(setting);
		
		_tempTable.setCols(setting.cols);
	    _tempTable.setHiddenColumn(setting.hideList);
	    
	    _tempTable.setClassName(setting.className);
		
	    setting.isEdit && _tempTable.setSelectDown(setting.selectDown);
	    _tempTable.setAlign(setting.align);
	    _tempTable.mousedrag(setting.mousedrag);
	    
	    //�ṩ�����и�
	    _tempTable.setAllowLineHeight(setting.allowLineHeight);
	    _tempTable.setAllowcustom(setting.allowcustom);
	    //�ṩ������
	    _tempTable.setAllowClock(setting.allowClock);
	    _tempTable.headsort(setting.headsort);
	    
	    _tempTable.setLayout();
		
		_tempTable.draw(document.getElementById(setting.tableDivId));
		
		setting.dataTable = _tempTable;
		
		//setTimeout(function(){
			//setting.divObject.trigger("completedTable", [setting, _tempTable, config.formData]);
		//},20);
		//Ext.lt.message.hook("datatable","drawed",function(){
	
		var timeEndId = "";
		Ext.lt.message.hook("layout","endlayout",function(){
				clearTimeout(timeEndId);
				
				timeEndId = setTimeout(function(){
					
					setting.divObject.trigger("completedTable", [setting, _tempTable, config.formData]);
				},20);
		});

	}
	
	initTable(config,this.setting,this.verifyMust,this.headDefaultValue);
	
	//�󶨱����Զ���ĸ����¼�
	function bindTableEvent(setting) {
		bindColEvent(setting);
		
		if(setting.callback.ondblclick && jQuery.type(setting.callback.ondblclick) ==="function"){
			setting.dataTable.onEvent("ondblclick", setting.callback.ondblclick);
		}
		if(setting.callback.onclick && jQuery.type(setting.callback.onclick) ==="function"){
			setting.dataTable.onEvent("onclick", setting.callback.onclick); 
		}
		//if(setting.callback.onsaveData && jQuery.type(setting.callback.onsaveData) ==="function"){
		//	setting.gridObj.bind("saveData",  setting.callback.onsaveData);
		//}
	}
	
	function bindColEvent(setting) {
		var cols = setting.cols;
		var handler = new eventHandle();
		
		if (cols instanceof Array) {
			for (var i = 0,n=cols.length; i <n ; i++) {
				
				cols[i].oneditend = function(e) {
					handler.oneditend(this, arguments, setting);
				};
				cols[i].oneditstart = function(e) {
					handler.oneditstart(this, arguments, setting);
				};
				cols[i].afterclick = function(e) {
					handler.cellclick(this, arguments, setting);
				};
				
				if(cols[i].edit == true){
					cols[i].rowspan = function(e){
						return handler.rowSpan(this, arguments, setting);
					};
				}
			}
		}
	}
	
	function initCols(setting,_tempTable,verifyMust,headDefaultValue){
		if(!$.isArray(setting.cols) ){
			return setting.cols;
		}
		var array = setting.cols;
		var cols = [];
		var colFormat = setting.callback.colFormat || {};
		
		if(!("check" in colFormat)){
			
			colFormat["check"] = defaultCheckForm;
		}
		
		for(var i=0,n=array.length; i<n; i++){
			var column = cols[i] = array[i];
			
			if(column.name in colFormat ){
				if($.type(colFormat[column.name]) === "function"){
					
					column.fn = colFormat[column.name];
				}
			}
			
			//TODO ����Ϣ��ȡ��������
			if (column.datatype && column.datatype == "A") {
	            column.edit = false, isFileCol = true;
	            
	            column.fn = function(i, j, rs, value){
	                if (value == null || value == 'null') value = ''; 
	                
					if ( (totalRow-1) == i ) return "";
	
	                return ['<span title="����ϴ�����" >', '<button class="budget_file"></button>', '</span>'].join('');
	            }
	        }
			
			//��ǩ����Ҫ���ڻ�����Ϣ�ɼ�����
			if (column.datatype && column.datatype == "L") {
	            column.edit = false;
	            
	            column.fn = function(i, j, rs, value){
	
	                return '';
	            }
	        }
	        
	        //����Ĭ��ֵ
	        if (column && column.defaultval != null) {
	            headDefaultValue[column.name] = column.defaultval;
	        }
			
			//���������
			if(column && column.required == 1){
				verifyMust.push(column.name);
			}
			
			//�첽����������
			if(column.getElement != undefined && column.getElement == true && column.sourceElement){
				var sourceElement = column.sourceElement;
				
				var eleItemid = column.elementitemid || "";
				var eleCode = column.elementcode || "";
				var eleName = column.elementname || "";
				
				var keyCache = sourceElement.trim() + "-" + eleItemid.trim() + "-" + eleCode.trim() + "-" + eleName.trim();

				var params = {
					"elementCode":sourceElement,
					"products" : config.product,
					"columnName" : column.name,
					"tableCode" : tableCode,
					"key" : keyCache
					}
				
				if(!formTableCache.containsKey(keyCache)){
					
					Ext.lt.RCP.server(setting.servicePath, "addMapperData",params,function(data){
						if(!formTableCache.containsKey(data.key)){
							
							formTableCache.put(data.key,data.mapperData);
						}
						
						_tempTable.addMapperDatas(data.columnName,formTableCache.get(data.key));
						
						setting.dataTable && setting.dataTable.reflash();
					},function(){});
				}
				else{
					_tempTable.addMapperDatas(column.name,formTableCache.get(keyCache));
				}
			}
		}
		return cols;
	}
	
	function apply(fun, param, defaultValue) {
		if ((typeof fun) == "function") {
			return fun.apply(this, param);
		}
		return defaultValue;
	}
	
	function debug($obj) {
		if (window.console && window.console.log) {
			window.console.log('log: ' + $obj);
		}
	}
	
	//----Ĭ�������һЩ�¼��Զ�ע��
	function editstart(table, e, l, c, data){
		if (totalRow == "1" && l == 0) {
            return false;
        }
		
		if (totalRow == "-1" && l == table.getRecordset().size() - 1) {
            return false;
        }
	
        return true;
	}
	
	function editend(table, e, l, c, data){
		var colObj = table.getCol(c);
		
		var datatype = colObj.datatype;
		if(colObj.datatype=="S" && colObj.format) datatype = "R";
	
		if(!DataVerify[datatype](colObj,data)){
			data[colObj.name]="";
			setTimeout(function(){
				table.gotoCell(l,c,function(nextCell){
					if(nextCell!=null){nextCell.fireEvent('onclick');}
				})
			},10);
		}
		
		//�����ظ���
		if(colObj.iskey == 1){
			var colName = colObj.name,currrentValue = data[colName];
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
					result += "����д�����ݺ͵�"+(totalPos+i+1)+"�е��ظ�����������д!";
					break;
				}
			}
			if(result){
				alert(result);
				data[this.name]="";
			}
		}
		
        table.reflash();
    }
		
	
	function defaultCheckForm(l, c, rs, v){
		/*
		if (totalRow == "1" && l == 0) {
            return "";
        }
        
        if (totalRow == "-1" && l == (this.setting.dataTable.getRecordset().size() - 1)) {
            return "";
        }
		*/
        return '<input type="checkbox" ' + (v == this._checkvalue ? 'checked' : '') + ' style="margin-top:3px">';
	}
	
	function rowspan(table,column, l, c, data){
		if (totalRow == "1" && l == 0) {
            return "totalrow bl";
        }
        if (totalRow == "-1" && l == table.getRecordset().size() - 1) {
            return "totalrow bl";
        }
        if (column.required && column.required == '1') {
            return "required bl";
        }
        return "selectable bl";
	}
}

var DataVerify = {
	
	"S":function(column,data){
		var maxlength = column.maxlength,minlength = column.minlength;
		var value = data[column.name];
		
		if(maxlength && parseInt(maxlength,10) < value.length){
			alert("����ֵ������󳤶�"+maxlength);
			return false;
		 } 
		 if(minlength && parseInt(minlength,10) > value.length){
			alert("����ֵС����С����"+minlength);
			return false;
 		 }
		 
		 var regexp = column.regexp;
		 if(regexp && !new RegExp(regexp).test(value)){
			alert("�����ʽ����ȷ�����������룡");
			return false;
		 }
		 
		return true;
	},
	
	"D":function(column,data){
		if(data && !isDate(data[column.name])){
			alert("���ڸ�ʽ����ȷ�����������룡");
			return false;
		}
		return true;
	},
	
	"F":function(column,data){
		var value = data[column.name];
		var maxvalue = column.maxvalue,minvalue = column.minvalue;
		
		if(isNaN(value)){
			alert("���������֣�");
			return false;
		}
		if(maxvalue && parseFloat(maxvalue,10) < value){
			alert("����ֵ�������ֵ"+maxvalue); 
			return false;
		 } 
		if(minvalue && parseFloat(minvalue) > value){
			alert("����ֵС����Сֵ"+minvalue); 
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
	
	"R":function(column,data){
		var required = column.required;
		if((required!=1 && data[column.name] ) || (required==1) ){
			var colData;
			try{
				colData = column.getMapperData(data[column.name]);
			}
			catch(e){
				alert("������������������в����ڻ��������û������,���飡");
				return false;
			}
			if(!colData){
				alert("�����������ֵ�����ڣ����������룡");							
				return false;
			}
		}
		
		return true;
	}
};


DataCommon.DataTable.prototype = new DataCommon.BaseTable();
DataCommon.DataTable.prototype.constructor = DataCommon.DataTable; 

//������дһЩ����
jQuery.extend(DataCommon.DataTable.prototype, {
			//����
			insertRow : function(data, line) {
				if (data._locationposition) {
					line = parseInt(data._locationposition,10);
				} 
				else if (line) {
					data._locationposition = parseInt(line,10);
				} 
				var cols = this.getColNames();
				var tempdata={};
				for (var i = 0; i < cols.length; i++) {
					tempdata[cols[i].name]=""; 
				}
								
				tempdata = $.extend(tempdata,this.headDefaultValue,data);
				
				this.getRecordSetObj().addData(tempdata, line);
				
				if(this.setting.isEdit){
					this.setting.dataTable.endAddData(line,1);
				}
				
				this.setting.modifyMark = true;
			},
			
			// ɾ��ѡ�е�����
			deleteRow : function() {
				var data = this.getSelectedRows();
				
				if(data && data.length>0){
					var delData = [], totalNum = this.setting.totalRow;
					
					for(var i=(data.length-1); i>=0; i--){
						
						if(totalNum=="1" && data[i]["_sortid"]==0){
							data.splice(i,1);
						}
						
						delData.push(data[i]["_sortid"]);
					}
					
					this.getDataTableObj().startDeleteData(delData);
					this.getDataTableObj().getRecordSet().remove(data);
					
					this.setting.modifyMark = true;
				}
			},
			 
			// �޸�����
			updataRow : function(data, line) {
				if (!$.isEmptyObject(data._locationposition) && $.isNumeric(data._locationposition)) {
					line = parseInt(data._locationposition);
				}
				if ($.type(line) != "number" ) {
					return;
				} 
				if ($.isEmptyObject(data)) {
					return;
				}
				var olddata = this.getRecordSetObj().getData(line);
		        if (olddata) {
					for (var ar in data) {
						if ("_locationposition" != ar) {
							if (ar in olddata) {
								this.setting.dataTable.updateData(line, ar,data[ar]);
								this.setting.dataTable.reflashdata();
							}
						}
					}
					
					this.setting.modifyMark = true;
				} 
			},
			
			//�������ݵ���̨
			saveData : function(params,url,fn) {
				 
			},
			
			//У�������
			verifyMustCol : function(){
				
				if((this.verifyMust && this.verifyMust.length > 0) || (this.colAttrRatio && this.colAttrRatio.length>0)){
			
					var rsdata = this.getRecordSetObj();
					
					var start = 0,end = rsdata.size();
					if(this.setting.totalRow == 1){
						start ++;
					}
					if(this.setting.totalRow == -1){
						end --;
					}
					for(var i=start; i<end; i++){
						var rsFormData = rsdata.getData(i);
						
						//��У������չ���ԣ���Ŀ�´���ʣ�
						var ratioSum = 0 , sb = new StringBuffer();
						for(var r=0,n=this.colAttrRatio.length; r<n; r++){
							var ratioVal = rsFormData[this.colAttrRatio[r].COLUMNCODE];
							var colObj = this.setting.dataTable.getCol(this.colAttrRatio[r].COLUMNCODE);
							var name = colObj.name;
							
							if(colObj.datatype!="F" && colObj.datatype!="I" && colObj.datatype!="N"){
								
								return name + "�в������֣����飡";
							}
							
							ratioSum += parseFloat(ratioVal || 0);
							
							sb.append(name);
						}
						
						if(ratioSum!=100 && ratioSum!=0){
						
							return "��"+(rsFormData._sortid+start)+"��,"+sb.toString(",")+"����Ӳ�Ϊ100����Ϊ0�����飡"	
						}
						
						for(var j=0,k=this.verifyMust.length; j<k; j++){
							var value = rsFormData[this.verifyMust[j]];
							
							if(null==value || value==undefined || value===""){
								var name = this.setting.dataTable.getCol(this.verifyMust[j]).alias;//ȡ������  ��ȡ���ݱ��ֶ�
								
								return "<"+name+">��Ϊ��¼��,�п�ֵ����д!";
			    	 		 }
						}
					}
				}
				
				return "";
			}
});

