//by ss ���õļ��زɼ�����


//formDataΪ���������
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
	
	//�����޸����ԵĻ���
	if(callBack) callBack(columns);
	
    for (var i = 0, n = columns.length; i < n; i++) {
        var column = columns[i];
        
        if (column.datatype && column.datatype == "A") {
            column.edit = false, isFileCol = true;
            
            column.fn = function(i, j, rs, value){
                if (value == null || value == 'null') value = ''; 
                
				if ( (totalRow-1) == i ) return "";

                return ['<span title="����ϴ�����" >', '<button class="budget_file"></button>', '</span>'].join('');
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
				
				//�����ظ���
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
							result += "����д�����ݺ͵�"+(totalPos+i+1)+"�е��ظ�����������д!";
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
    
    //�ṩ�����и�
    _tempTable.setAllowLineHeight(true);
    _tempTable.setAllowcustom(false);
    //�ṩ������
    _tempTable.setAllowClock(true);
    _tempTable.headsort(true);
    
    _tempTable.setLayout();
    _tempTable.draw(document.getElementById(tableDivId));
    
    //���ظ����¼�
    if (isFileCol) {
		if (!AddFormAttach) {
            alert("���ȼ���extendDatatableType.js");
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
	
	//��̬���ӷ���
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
			alert("��ѡ����Ҫɾ��������!");
			return;
		}
		else if(data && data.length>0){
			if(window.confirm("�Ƿ�ɾ��ѡ�����ݣ�")){
				var sizeRS = this.getRecordSet().size();
				var delData = [],_tempData = [];
				for (var i = 0; i<data.length;i++){
	
					if(totalRow=="1" && data[i]["_sortid"]==0){
						continue;
					}
					if(totalRow=="-1" && data[i]["_sortid"]==(sizeRS-1)){
						continue;
					}
					
					//�жϼ���
					if(data[i].LEVELNO < config.levelno ){
						alert("û��Ȩ��ɾ����ѡ����!");
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
	
	//У�����
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
				
				//��У������չ���ԣ���Ŀ�´���ʣ�
				var ratioSum = 0 , sb = new StringBuffer();
				for(var r=0,n=colAttrRatio.length; r<n; r++){
					var ratioVal = rsFormData[colAttrRatio[r].COLUMNCODE];
					var colObj = this.getCol(colAttrRatio[r].COLUMNCODE);
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
				
				for(var j=0,k=verifyMust.length; j<k; j++){
					var value = rsFormData[verifyMust[j]];
					
					if(null==value || value==undefined || value===""){
						var name = this.getCol(verifyMust[j]).name;
						
						return name+"��Ϊ��¼��,�п�ֵ����д!";
	    	 		 }
				}
			}
		}
		
		return "";
	}
	
    return _tempTable;
}

var DataVerify = {
	//�ַ���
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
	//����
	"D":function(column,data){
		if(data && !isDate(data[column.name])){
			alert("���ڸ�ʽ����ȷ�����������룡");
			return false;
		}
		return true;
	},
	//����
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
	//������
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
