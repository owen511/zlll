Ext.lt.ifmisdatatable = function(config) {
	if (typeof config == "undefined") return;
	var _config = config; // ��ʾ����ID
	var id = _config.id;
	var showserial = _config.showserial; //�Ƿ���ʾ���
	var showcheckbox = _config.showcheckbox;
	var showradio = _config.showradio;
	var isCreateAmtColumn = _config.isCreateAmtColumn; //�Ƿ���ʾ�ϼ���
	var sumColumnList = _config.sumColumnList;
	var table = "dt_" + id;
	var _mainmenu = _config.mainmenu;
	var _submenu = _config.submenu;
	var _cols = _config.cols;
	var datas = _config.datas;
	var mergeColumn=_config.mergeColumn;
	var initFn=_config.initFn
	var _onclick = eval(_config.onclick);
	var _showLine = true; //��������ʾ����Ϣ
	var _class = null //ajax��ҳ������
	var _method = null //ajax��ҳ���÷���
	var _exportsql = _config.exportsql // ����ǰ̨sql
	var _clazz = null; //ajaxҵ��Ŀ����
	var _method = null; //ajaxҵ��Ŀ�귽��
	var _tabletype = _config.tabletype; //�б�����
	var _dataListName = _config.dataListName //���ݼ�����
	var _allpage_totaljson = eval("("+_config.allpage_totaljson+")");
	var _page_postUrl = _config.page_postUrl;
	var _vchcode =  _config.vchcode;
	var _hidhead = _config.hidhead;
	var _usecache = _config.usecache;
	var _detailnum = _config.detailnum;
	var _useThisHead = _config.useThisHead;
	var _sumRs = null;
	if(_allpage_totaljson==null&&sumColumnList!=null&&sumColumnList.length>0){
		var jsfn=["function sumdata(datas){"];
		jsfn.push("var obj={");
		jsfn.push(sumColumnList[0])
		jsfn.push(':0');
		for(var i=1;i<sumColumnList.length;i++){
			jsfn.push(',');
			jsfn.push(sumColumnList[i])
			jsfn.push(':0');
		}
		jsfn.push('};');
		//--------------
		jsfn.push("for(var i=0,l=datas.length;i<l;i++){");
		
		for(var i=0;i<sumColumnList.length;i++){
			jsfn.push('obj.');
			jsfn.push(sumColumnList[i]);
			jsfn.push('+=parseFloat(datas[i].');
			jsfn.push(sumColumnList[i],");");
		}
		jsfn.push('}');
		jsfn.push("return obj");
		jsfn.push('}');
		eval(jsfn.join(''));
		_allpage_totaljson = sumdata(datas.toArray());
	}
	
	if (isContainsAmtColumn(sumColumnList)) {
		_sumRs = new Ext.lt.recordset({columns:sumColumnList, datas:[[]]});
		_sumRs.setData(_allpage_totaljson);
		_sumRs.delRow(0);
	}
	
	var table = new Ext.lt.datatable35(datas);
	// ��ʾ����
	//��ʱ���飬�����ʾ����ǰ��
	var _tempArr = [];
	if (showserial) {
		table.columns.seq.width=60;
		_tempArr.push(table.columns.seq);
	}
	if (showcheckbox) {
		_tempArr.push(table.columns.checkbox);
	}
	if (showradio) {
		_tempArr.push(table.columns.radio);
	}
	var cols = _tempArr.concat(_cols);
	table.setCols(cols);
	table.setAllowClock(true);
	table.setAllHeadWidth(true);
	table.headsort(true);
	table.setMouselight('#597EAA');
	table.setClassName('dttheme_table');
	table.mousedrag(false);
	//table.showLine(_showLine);
	table.drawMultiHead(true);
	table.setSelectClassName('#CBDAF2');
	table.setColumndrag(true);
	//table.setHeadFilter(false);
	table.setAllowcustom(false);
	if(mergeColumn!=null&&mergeColumn>0){
		table.mergeColumn(mergeColumn);
	}
	// �ض�������ʾ
	var columnName = table.getCols();
	reCol(columnName);
	/**
	 * �ض����ͷ
	 * @param columnName ��ͷ����
	 */
	function reCol (columnName) {
		for (var i = 0, len = columnName.length; i < len; i++) {
			// ��ͷ���������У�С�ϼƹ���
			if (columnName[i].name =="_locationposition" || columnName[i].name == "check")
				continue;
			//columnName[i].alias='<button id="'+table.id+'_'+columnName[i].name+'" style="background:url(../../ifmis_images/actions/filter.gif) no-repeat left top;width:16px;height:16px;border:0;cursor:pointer;" title="����"/>&nbsp;</button>'+columnName[i].alias;
			columnName[i].fn = function(i, j, rs, value) {
				if (this.datatype == "N" && value === 0) {
					value = "0.00";
				}
				if (value == null || value == 'null' || value == "-" || value == "0-0") value = '';
				return '<span title="' + value + '" >' + value + '</span>';
			}
		}
	}
	// checkbox��
	table.columns.checkbox.fn = function(l, c, rs, v) {
		if (typeof this.rstype !='undefined' && this.rstype == 'clockrowset') {
			return '';
		} else {
			return '<input type="checkbox" ' + (v == this._checkvalue ? 'checked' : '') + ' style="margin-top:3px">';
		}
	}
	
	//ѡ��ϼ�
	function checkTotal(table, el, l, c, d) {
		if(_sumRs==null)return;
			for (var i = 0, len = sumColumnList.length; i < len; i++) {
				var id = sumColumnList[i];
				if (typeof totalrs[id] == "undefined") totalrs[id] = 0;
				if (typeof d[id] == "undefined") d[id] = 0;
				totalrs[id] += d['check'] ? parseFloat(d[id]) : -1 * parseFloat(d[id]);
			}
			if (_onclick != null) {
				if (Ext.lt.isFunction(_onclick)) {
					_onclick(l, d, d['checked'] == 1);
				}
			}
			if (_table.onRowClick != null) {
				if (Ext.lt.isFunction(_table.onRowClick)) {
					_table.onRowClick(l, d, d['checked'] == 1);
				}
			}
			var _arr = datas.query({check:1});
			if(_arr.length>0) {
				_sumRs.setData(totalrs);
			} else {
				_sumRs.setData(_allpage_totaljson);
			}
			_sumRs.delRow(0);
			table.reflash('viewdata');
		}
	
	// �ϼ���
	if (isCreateAmtColumn && _sumRs != null) {
		// �����ϼ���
		table.setClockRowSet(_sumRs);
		var l = datas.size();
		table.columns.seq.fn = function(l, c, rs, v) {
			if (l+this.fixi == 1) {
				return '<center>�ϼ�</center>'
			} else {
				return '<center>' + (l+this.fixi-1) + '</center>'
			}
		}
		// ȫѡ�ϼ�
		var totalrs = {};
		table.columns.checkbox.onallselected = function(table,el,l,c,d) {
			for (var i = 0, len = sumColumnList.length; i < len; i++) {
				var id = sumColumnList[i];
				totalrs[id] = 0;
				var data = table.getRecordSet().toArray();
				for (var j=0, jlen = data.length; j<jlen; j++) {
					var d = data[j];
					if (typeof d[id] == "undefined") d[id]=0;
					totalrs[id] += d['check'] ? parseFloat(d[id]) : -1 * parseFloat(d[id]);
				}
			}
			_sumRs.setData(totalrs);
			_sumRs.delRow(0);
			table.reflash();
		}
		// ȡ��ȫѡ
		table.columns.checkbox.onallunselected = function(table,el,l,c,d) {
			for (var i = 0, len = sumColumnList.length; i < len; i++) {
				var id = sumColumnList[i];
				totalrs[id] = 0;
			}
			_sumRs.setData(_allpage_totaljson);
			_sumRs.delRow(0);
			table.reflash();
		}
		// ѡ�кϼ�
		table.onEvent('onclick', checkTotal);
	} else {
		if(_onclick != null) {
			table.onEvent('onclick', function(table, el, l, c, d) {
					if (Ext.lt.isFunction(_onclick)) {
						_onclick(l, d, d['checked'] == 1);
					}
				});
			}
			/*
			if (_table.onRowClick != null) {
				if (Ext.lt.isFunction(_table.onRowClick)) {
					_table.onRowClick(l, d, d['checked'] == 1);
				}
			}
			table.reflashdata();
			*/
	}
	// �жϺϼ����������Ƿ����
	function isContainsAmtColumn (heads){	
		for(var a =0,len = _cols.length ;a<len ;a++){
			for(var i=0;i<heads.length;i++){
				var head = heads[i].toLowerCase();
				if(head==_cols[a]["name"]){
					return true;
				}				
			}
		}
		return false;
	}
	// ��������ȡ�ж���
	function getColByName(name) {
		for(var i=0,len=columnName.length; i<len; i++) {
			if(columnName[i].name == name)
				 return columnName[i];
		}
	}
	// ����
	Ext.lt.message.hook("layout", "endlayout", function() {
		table.resize(_div.offsetWidth, _div.offsetHeight);
	});
	// �����
	var _div = document.getElementById(id + "_div");
	if(initFn!=null&&initFn.length>0){
		initFn=eval(initFn);
		initFn(table);
	}
	table.draw(_div);
	// �����ݹ��˷���
	/*
	var _html = [];
	var _datafiltermenu = document.createElement('<DIV style="border:1px #CCC solid;width:300px;height:200px;overflow:hidden; position:absolute;background-color:#EFEFEF;z-index:9999;" >');
	_datafiltermenu.id = table.id+"_datafiltermenu";
	_datafiltermenu.style.display = "none";
	document.body.appendChild(_datafiltermenu);
	for (var i = 0, len = columnName.length; i < len; i++) {
		var name = columnName[i].name;
		if (name =="_locationposition" || name == "check")
			continue;
		var headBt = document.getElementById(table.id+'_'+name);
		headBt.onclick = function(name){
			this.style.backgroundPosition = "0 -16px";
			var _name = this.id.split("_")[1];
			var _data = datas.toArray();
			var _arr = [];
			var _id = table.id;
			var column = getColByName(_name);
			var _inHtml = ['<div class="r_div_s" isfiltermenu="true"><input type="button" id="',_id,'_allbt" value="ȫѡ" isfiltermenu="true" style="border:0;"/><input type="button" id="',_id,'_cancelbt"  value="��ѡ" isfiltermenu="true" style="border:0;"/><input type="button" id="',_id,'_surebt" value="ȷ��" isfiltermenu="true" style="border:0;"/></div>'];
			_inHtml.push('<div id="condition" style="border:1px #C3D2E3 solid;background-color:#E6ECF8"><input type="radio" id="recheck" name="con" checked isfiltermenu="true"/>��ѡ<input type="radio" id="andcheck" name="con" isfiltermenu="true"/>����<input type="radio" name="con" id="orcheck" isfiltermenu="true"/>����</div>');
			_inHtml.push('<div id=',table.id,'_filterdatas" style="width:160px;height:175px;float:left;overflow-x:auto;overflow-y:scroll;" isfiltermenu="true"><ul>');
			// ����Դ������Դ����ʽ��ͬ
			if (typeof column.mapper != "undefined") {
				var _colData = column.mapper.datas;
				for (var i=0,len=_colData.length; i<len; i++) {
					var _d = _colData[i];
					if(_d[1] == "") continue;
					_inHtml.push('<li isfiltermenu="true"><input type="checkbox" isfiltermenu="true" id="',_d[0],'"/>');
					_inHtml.push(_d[1]+"_"+_d[2]);
					_inHtml.push('</li>');
				}
			} else if (column.datatype == "N") {
			  for(var i = 0,len=_data.length; i<len; i++) {
			  	var _d = _data[i][_name];
			  	if(_arr.indexOf(_d) > -1) continue;
			  	var d=column.format.dotname;
					var q=column.format.qfw;
					var u=column.format.unit;
					_d=(_d+'').toNumber(d,q,u);
			  	_inHtml.push('<li isfiltermenu="true"><input type="checkbox" isfiltermenu="true"/>');
			  	_inHtml.push(_d);
			  	_inHtml.push('</li>');
			  	_arr.push(_d);
			  }
			} else {
			  for(var i = 0,len=_data.length; i<len; i++) {
			  	var _d = _data[i][_name];
			  	if(_arr.indexOf(_d) > -1) continue;
			  	_inHtml.push('<li isfiltermenu="true"><input type="checkbox" isfiltermenu="true"/>');
			  	_inHtml.push(_d);
			  	_inHtml.push('</li>');
			  	_arr.push(_d);
			  }
			}
		  _inHtml.push('</ul></div>');
		  _inHtml.push('<div style="width:130;height:175;overflow:autofloat:left;" isfiltermenu="true"><div>ѡ������:</div>')
		  if (isCreateAmtColumn) {
		  	_inHtml.push('<div id="tot">0</div><div>ѡ��С��:</div><div id="sum"></div>');
		  } 
		  _inHtml.push('</div>');
		  var colp=Ext.lt.HTML.positionedOffset(this,null,false);
			_datafiltermenu.style.left=(colp.left-this.parentElement.scrollLeft+1)+'px';
			_datafiltermenu.style.top=(colp.top+this.offsetHeight)+'px';
			_datafiltermenu.innerHTML = _inHtml.join('');
			_datafiltermenu.style.display = "block";
			// �����ݲ��һ��onclick����ѡ���¼�
			_datafiltermenu.attachEvent("onclick", function(){
					var _tag = event.srcElement, _chkflag = false, _d=_data, o={},_dataflag = false;
					var _con = JQ("#condition [type=radio][checked]");
					// ����ɸѡ
					if (_tag.type == "checkbox") {
						o[_name] = _tag.id?_tag.id:_tag.parentElement.innerText;
						_chkflag = _tag.checked;
						_dataflag = true;
					} else if (_tag.tagName == "LI"){
							var _chk = _tag.children[0];
							_chk.checked = !_chk.checked;
							o[_name] = _chk.id?_chk.id:_tag.innerText;
							_chkflag = _chk.checked;
							_dataflag = true;
					} else if (_tag.id==_id+"_surebt") {  // ȷ��, ȫѡ, ��ѡ
						_closeFilterMenu();
						table.reflash();
						return;
					} else if (_tag.id==_id+"_allbt") {
						var _allbox = _datafiltermenu.getElementsByTagName("input");
							var _allbox = JQ("[type=checkbox]",_datafiltermenu)
							.attr("checked",true);
							_chkflag = true;
							_dataflag = true;
					} else if (_tag.id==_id+"_cancelbt"){
							var _allbox = JQ("[type=checkbox]",_datafiltermenu)
							.removeAttr("checked");
							_chkflag = false;
							_dataflag = true;
					}
					if(_dataflag) {
						// ��ѡ,����,����
						if (_con[0].id == "recheck") {
							var _reverd = {};_reverd[_name]=[];
							var _allbox = JQ("[type=checkbox][checked=false]",_datafiltermenu);
							for(var i=0,len=_allbox.length;i<len;i++) {
								_reverd[_name].push(_allbox[i].id?_allbox[i].id:_allbox[i].parentElement.innerText);
							}
							var _temp = datas.query(_reverd);
							for(var i=0,len=_temp.length; i<len; i++) {
								_temp[i].check = 0;
							}
							// ����ѡ��
							_d = datas.query(o);
							for (var ii=0,len=_d.length; ii<len; ii++) {
									_d[ii].check = _chkflag?1:0;
							}
						} else if(_con[0].id == "andcheck") {
							_dd = datas.query({check:1});
							for (var j = 0,jlen = _dd.length;j<jlen;j++) {
								_dd[j].check = 2;
							}
							o["check"] = 2;
							// ����ѡ��
							_d = datas.query(o);
							for (var ii=0,len=_d.length; ii<len; ii++) {
									_d[ii].check = 1;
							}
						} else {
							_d = datas.query(o);
							for (var ii=0,len=_d.length; ii<len; ii++) {
									_d[ii].check = 1;
							}
						}
						// ѡ������
						var checkedRows = datas.query({check:1});
						document.getElementById("tot").innerText = checkedRows.length;
						// С�ϼƣ��б�ϼ�
						if (isCreateAmtColumn) {
							var _sumHtml = [],_sumcol=0;
							var totalrs = datas.getData(0);
			  			for (var i = 0, len = sumColumnList.length; i < len; i++) {
								var id = sumColumnList[i];
								for(var j=0,jlen=checkedRows.length;j<jlen;j++) {
									if(typeof checkedRows[j][id] == "undefined") continue;
									_sumcol += parseFloat(checkedRows[j][id]);
									totalrs[id] = _sumcol;
								}
								_sumHtml.push('<div>',id,':',_sumcol,'</div>');
							}
			  			document.getElementById("sum").innerHTML = _sumHtml.join('');
			  		}
			  	}
				table.reflash();
			});
			document.body.attachEvent("onclick", function(){
				if(!event.srcElement.isfiltermenu) 
					_closeFilterMenu();
			});
			// �رչ��˲˵�
			function _closeFilterMenu() {
					_datafiltermenu.style.display = "none";
					_datafiltermenu.innerHTML = "";
			}
			// ��ֹ�¼�����ð��
			event.cancelBubble = true;
		}
	}
	*/
	//��ת���¼�
	var row2column = document.getElementById("img_row2column_" + id);
	if (row2column) {
		var nextrow = document.getElementById("img_showNextRow_" + id);
		var prerow = document.getElementById("img_showBeforRow_" + id);
		row2column.attachEvent("onclick", rowToColumn);
		nextrow.attachEvent("onclick", showNextRow(nextrow));
		prerow.attachEvent("onclick", showNextRow(prerow));
	}
	//��ת��

	function rowToColumn() {
		var row = _div;
		var showDivName = row2column.getAttribute("showdivname");
		var num = row2column.getAttribute("columnnum");
		var column = document.getElementById(showDivName);
		var rc = row2column.getAttribute("rc");
		var coldata = datas.query({
			check: 1
		});
		if (rc == "1") { //ת��
			if (coldata.length > 1) {
				alert("ֻ��ѡ��һ��");
				return;
			}
			if (column.innerHTML != "") column.innerHTML = "";
			if (coldata.length == 1) {
				column.innerHTML = createShowTable(coldata, num);
			} else {
				alert("��ѡ��һ�У�");
				return;
			}
			row2column.setAttribute("rc", "0");
			row.style.display = "none";
			column.style.display = "block";
		} else { //ת��
			row2column.setAttribute("rc", "1");
			if (column.innerHTML != "") {
				column.innerHTML = "";
			}
			row.style.display = "block";
			column.style.display = "none";
			table.redraw();
		}
		Ext.lt.layout.doLayout();
	}
	/*
	 *��һ��
	 */

	function showNextRow(currentObj) {
	
		return function() {
			var ac = currentObj.getAttribute("ac");
			var showDivName = row2column.getAttribute("showdivname");
			var num = row2column.getAttribute("columnnum");
			var column = document.getElementById(showDivName);
			var coldata = datas.query({
				check: 1
			});
			if (coldata.length > 0) {
				var currseq = coldata[0]['_sortid'];
				coldata[0].check = undefined;
				var nextData;
				if (ac == "next") {
					var n = currseq + 1;
					if (n > datas.size()-1) n = 0;
					nextData = datas.getData(n);
					
				} else {
					var n = currseq - 1;
					if (n < 0) n = datas.size()-1;
					nextData = datas.getData(n);
				}
				
				if (nextData) {
					nextData.check = 1;
					totalrs = {};
					checkTotal(table, null, datas.size(), null, nextData);
					if (column.style.display == "block") {
						var arr = [];
						arr.push(nextData);
						column.innerHTML = createShowTable(arr, num);
						
					} else {
						
						table.reflash();
					}
					
				} else {
					return;
				}
			} else {
				return;
			}
		}
	}
	/**
	 * ������ʾ��
	 **/

	function createShowTable(coldata, num) { /*ȡֵ����*/
		var th_td1 = "";
		var th_td = "";
		var columnName = table.getCols();
		var tdValue = (columnName.length - 1) % num;
		var colValue = 1;
		var len = isCreateAmtColumn ? datas.size() - 1 : datas.size();
		if (tdValue != 0) {
			colValue = (num - tdValue) * 2 + 1;
		}
		for (var i = 2; i < columnName.length; i++) {
			var alias = columnName[i].alias;
			var name = columnName[i].name;
			var value = coldata[0][columnName[i]['name']];
			if (columnName[i]._formartValue) value = columnName[i]._formartValue(value);
			value = columnName[i].fn(coldata[0]['_locationposition'], i, datas, value);
			if ((i - 1) % num == 0) th_td = "<tr>\n";
			if (i == 2) th_td += "<th width=8% >���</th><td onmouseout=\"return nd();\" width=17% >" + (coldata[0]['_sortid']+1) + "/" + (len+1) + "</td>\n";
			if (i == columnName.length - 1) {
				th_td += "<th width=8% >" + alias + "</th><td onmouseout=\"return nd();\" width=17% colspan =" + colValue + " id=columnValue_" + name + " style=\"text-align:" + (alias == "���" ? "right" : "left") + ";\" >" + value + "</td>\n";
			} else {
				th_td += "<th width=8% >" + alias + "</th><td onmouseout=\"return nd();\" width=17% id=columnValue_" + name + " style=\"text-align:" + (alias == "���" ? "right" : "left") + ";\" >" + value + "</td>\n";
			}
			if (i % num == 0 || i == (columnName.length - 1)) th_td += "</tr>\n";
			if (i % num == 0 || i == (columnName.length - 1)) th_td1 += th_td;

		}
		return "<table width=100% style= 'TABLE-LAYOUT:fixed' border='0' cellspacing='0'>" + th_td1 + "</table>";
	}
	// �ⲿ�ӿ�
	var _table = {};
	_table.resize=function(w,h){table.resize(w,h)}
	// ��ҳ
	_table.createPagination = function() {
		this.page_page = _config.page_page;
		this.page_pageSize = _config.page_pageSize;
		this.page_pageCount = _config.page_pageCount;
		if(this.page_pageCount==0){this.page_page=0};
		this.page_totalRecord = _config.page_totalRecord;
		this.page_postUrl = _page_postUrl;
		this.page_hasPreviousPage = _config.page_hasPreviousPage;
		this.page_hasNextPage = _config.page_hasNextPage;
		this.page_previousPage = _config.page_previousPage;
		this.page_nextPage = _config.page_nextPage;
		this.paginationdiv = _config.paginationdiv;
		var tbodyHTML = ["<TABLE id=\"paginationtbl\" borderColor=#8596ca cellSpacing=0 cellPadding=0 align=center border=0 style=\"float:right;font-size:12px; color:#000000;\"><TBODY> <TR> "];
		tbodyHTML.push("<TD align=\"center\"  nowrap=\"nowrap\">");
		if (this.page_hasPreviousPage) {
			tbodyHTML.push(" <a href=\"javascript:");
			tbodyHTML.push(id);
			tbodyHTML.push(".gotoPage(1)\"><img src=\"");
			tbodyHTML.push(ROOT_PATH);
			tbodyHTML.push("/images/actions/first.gif\" alt=\"��һҳ\" border=\"0\" height=\"16\" width=\"16\" align=\"absmiddle\" /></a> <a href=\"javascript:");
			tbodyHTML.push(id);
			tbodyHTML.push(".gotoPage(");
			tbodyHTML.push(this.page_previousPage);
			tbodyHTML.push(")\"><img src=\"");
			tbodyHTML.push(ROOT_PATH);
			tbodyHTML.push("/images/actions/pre.gif\" alt=\"��һҳ\" border=\"0\" height=\"16\" width=\"16\" align=\"absmiddle\" /></a>");
		} else {
			tbodyHTML.push(" <img src=\"");
			tbodyHTML.push(ROOT_PATH);
			tbodyHTML.push("/images/actions/first_un.gif\" alt=\"��һҳ\" border=\"0\" height=\"16\" width=\"16\" align=\"absmiddle\" /> <img src=\"");
			tbodyHTML.push(ROOT_PATH);
			tbodyHTML.push("/images/actions/pre_un.gif\" alt=\"��һҳ\" border=\"0\" height=\"16\" width=\"16\" align=\"absmiddle\" />");
		}
		if (this.page_hasNextPage) {
			tbodyHTML.push(" <a href=\"javascript:");
			tbodyHTML.push(id);
			tbodyHTML.push(".gotoPage(");
			tbodyHTML.push(this.page_nextPage);
			tbodyHTML.push(")\"><img src=\"");
			tbodyHTML.push(ROOT_PATH);
			tbodyHTML.push("/images/actions/next.gif\" alt=\"��һҳ\" border=\"0\" height=\"16\" width=\"16\" align=\"absmiddle\" /></a>");
			tbodyHTML.push(" <a href=\"javascript:");
			tbodyHTML.push(id);
			tbodyHTML.push(".gotoPage(");
			tbodyHTML.push(this.page_pageCount);
			tbodyHTML.push(")\"><img src=\"");
			tbodyHTML.push(ROOT_PATH);
			tbodyHTML.push("/images/actions/end.gif\" alt=\"���ҳ\" border=\"0\" height=\"16\" width=\"16\" align=\"absmiddle\" /></a>");
		} else {
			tbodyHTML.push(" <img src=\"");
			tbodyHTML.push(ROOT_PATH);
			tbodyHTML.push("/images/actions/next_un.gif\" alt=\"��һҳ\" border=\"0\" height=\"16\" width=\"16\" align=\"absmiddle\" />");
			tbodyHTML.push(" <img src=\"");
			tbodyHTML.push(ROOT_PATH);
			tbodyHTML.push("/images/actions/end_un.gif\" alt=\"���ҳ\" border=\"0\" height=\"16\" width=\"16\" align=\"absmiddle\" />");
		}
		tbodyHTML.push("</td>");
		tbodyHTML.push("<td align=\"left\">&nbsp;&nbsp;&nbsp;&nbsp;<img src=\"");
		tbodyHTML.push(ROOT_PATH);
		tbodyHTML.push("/images/actions/share_icon.gif\" alt=\"\" border=\"0\" height=\"12\" width=\"15\" align=\"absmiddle\" hspace=\"3\" vspace=\"3\" />");
		tbodyHTML.push("    �� ");
		tbodyHTML.push(this.page_totalRecord);
		tbodyHTML.push(" ��,<a style=\"font:black\">ÿҳ</a><input id='");
		tbodyHTML.push(id);
		tbodyHTML.push("setpage_size' name='setpage_size' title='����ÿҳ������'  value=\"");
		tbodyHTML.push(this.page_pageSize);
		tbodyHTML.push("\" size=\"4\" onkeyup=\"");
		tbodyHTML.push(id);
		tbodyHTML.push(".checkenter(");
		tbodyHTML.push(this.page_pageSize);
		tbodyHTML.push(");\" onblur=\"");
		tbodyHTML.push(id);
		tbodyHTML.push(".pagesizeblur(");
		tbodyHTML.push(this.page_pageSize);
		tbodyHTML.push(");\"/><a style=\"font:black\">��</a>");
		tbodyHTML.push(",�� ");
		tbodyHTML.push(this.page_page);
		tbodyHTML.push(" / ");
		tbodyHTML.push(this.page_pageCount);
		tbodyHTML.push(" ҳ");
		tbodyHTML.push("</td>");
		tbodyHTML.push("<td align=\"right\"><input type=\"hidden\" name=\"pageSize\" value=\"");
		tbodyHTML.push(this.page_pageSize);
		tbodyHTML.push("\"/><input type=\"hidden\" name=\"pageCount\" value=\"");
		tbodyHTML.push(this.page_pageCount);
		tbodyHTML.push("\"/><input type=\"hidden\" name=\"totalRecord\" value=\"");
		tbodyHTML.push(this.page_totalRecord);
		tbodyHTML.push("\"/>");
		tbodyHTML.push("<input type=\"text\" id=\"");
		tbodyHTML.push(id);
		tbodyHTML.push("_page\" name=\"page\" value=\"");
		tbodyHTML.push(this.page_page);
		tbodyHTML.push("\" size=\"3\" onkeyup=\"");
		tbodyHTML.push(id);
		tbodyHTML.push(".checkenter(this.value);\" onblur=\"");
		tbodyHTML.push(id);
		tbodyHTML.push(".pageblur(");
		tbodyHTML.push(this.page_page);
		tbodyHTML.push(");\"/><a href=\"javascript:");
		tbodyHTML.push(id);
		tbodyHTML.push(".submitGotoPage()\"><img src=\"");
		tbodyHTML.push(ROOT_PATH);
		tbodyHTML.push("/images/actions/tz.gif\" alt=\"��ת\" height=\"21\" width=\"45\" align=\"absmiddle\" border=\"0\" /></a>");

		var _doc = document;
		if (_doc.getElementById("pageTagDiv") != null) {
			_doc.getElementById("pageTagDiv").innerHTML = tbodyHTML.join("");
		} else {
			if (this.paginationdiv) {
				this.paginationdiv.innerHTML = tbodyHTML.join("");
			} else {
				_doc.getElementById(table.tabletype + "_paginationdiv").innerHTML = tbodyHTML.join("");
			}
		}

		//}

		// ����û������ҳ���Ƿ�Ϸ�
		// ����ֵ��true-�Ϸ� false-�Ƿ�
		_table.checkPage = function(thePage) {
			var pEl = $(id + "setpage_size");
			var oPagesize = pEl.value;
			if (oPagesize == "" || oPagesize == "0" || oPagesize==0 || oPagesize<0) {
				alert("������һ����Ч������Ϊÿҳ������");
				return false;
			}
			if (thePage == "" || thePage == "0"||isNaN(thePage)||thePage<=0||thePage.indexOf('.')!=-1) {
				alert("������һ����Ч������ΪҪ��ת��ҳ����");
				$(id + "_page").value = this.page_page;
				return false;
			}
			//��֤��ʽ������
			/*
			var array_toPage = thePage.split("");
			var digitalStr = "0123456789";
			for (var i = 0; i < array_toPage.length; i++) {
				if (digitalStr.indexOf(array_toPage[i]) == -1 || array_toPage[i]==0) {
					alert("������һ����Ч������ΪҪ��ת��ҳ����");
					$(id + "_page").value = this.page_page;
					return false;
				}
			}
			*/
			if (thePage > this.page_pageCount) {
				alert("�����ҳ����Ӧ������ҳ����" + this.page_pageCount + "����");
				$(id + "_page").value = this.page_page;
				return false;
			}
			return true;
		}

		// ֧�ֻس���ת
		_table.checkenter = function(rows) {
			var pEl = window.event.srcElement;
			var oPagesize = pEl.value;
			oPagesize = oPagesize.replace(/\D/g, '');
			pEl.value = oPagesize;
			if (event.keyCode == 13) {
				if (pEl.id == id + "setpage_size") this.page_pageSize = oPagesize;
				this.submitGotoPage();
			}

		}
		_table.pagesizeblur = function(vpageSize) {
			var pEl = $(id + "setpage_size");
			var oPagesize = pEl.value;
			if (oPagesize == "" || oPagesize == "0" || oPagesize==0 || oPagesize<0) {
				alert("������һ����Ч������Ϊÿҳ������");
				pEl.value = vpageSize;
				this.page_pageSize = vpageSize;
				return false;
			}
			this.page_pageSize = oPagesize;
			if (document.getElementById("setpage_size") != null) {
				document.getElementById("setpage_size").value = oPagesize;
			}
		}
		_table.pageblur = function(vpage) {
			var pEl = window.event.srcElement;
			var oPage = pEl.value;
			if (oPage == "" || oPage == "0") {
				alert("������һ����Ч������ΪҪ��ת��ҳ����");
				pEl.value = vpage;
				return false;
			}
			if (document.getElementById("page") != null) {
				document.getElementById("page").value = oPage;
			}
		}
		// ��ת��ָ���ķ�ҳ
		_table.gotoPage = function(thePage) {

			var page = document.getElementById(id + "_page");
			page.value = thePage;
			this.submitGotoPage();
		}
		//���õ�1ҳ
		_table.resetPage = function(thePage) {
			var page = document.getElementById(id + "_page");
			if (page != null) page.value = thePage;
		}
		// �ύ��ҳ��ת��
		_table.submitGotoPage = function() {
			//var theForm = eval("document."+this.page_formName);
			// ���ԭʼ����ֵ
			var thePage = document.getElementById(id + "_page").value;

			if (this.checkPage(thePage)) {
				if (this.page_postUrl) {
					_table.ajaxPost();
					return;
				}
				if (document.getElementById("advancedQueryForm") != null && document.getElementById("advancedQueryForm").advancedQuery != null && document.getElementById("advancedQueryForm").advancedQuery.value == "advancedQuery") {
					if (document.getElementById(id + "_page") != null) {
						var formObj = document.getElementById("advancedQueryForm");
						formObj.ad_allflag.value = 0;
						formObj.ad_currpage.value = thePage;
						formObj.ad_rows.value = this.page_pageSize;
						formObj.ad_totalpages.value = this.page_pageCount;
						formObj.ad_totalrows.value = this.page_totalRecord;
						//���Լ���ҳ�����ر���
						try {
							doprivateQuery(formObj);
						} catch (e) {
							//���ɹ�,������,��û��ʵ�ָ÷���
						}
					} else {
						$('advancedQueryForm').ad_allflag.value = 1;
					}
					//��ҳʱ����������� 20090915 kim
					var val = "wfstat";
					var uri = window.location.search;
					var re = new RegExp("" + val + "\=([^\&\?]*)", "ig");
					var wfstat = ((uri.match(re)) ? (uri.match(re)[0].substr(val.length + 1)) : null);
					if (wfstat != null) {
						if (formObj.action.indexOf("?") != -1) {
							formObj.action = formObj.action + "&wfstat=" + wfstat;
						} else {
							formObj.action = formObj.action + "?wfstat=" + wfstat;
						}
					}
					query();
					return;
				} else if (document.getElementById("queryform") != null) {
					if (document.getElementById(id + "_page") != null) {
						var formObj = document.getElementById("queryform");
						if (id == "tdetail") {
							formObj = JQ("FORM[id='queryform']")[1];
						}
						formObj.allflag.value = 0;
						formObj.currpage.value = thePage;
						if (document.getElementById(id + "setpage_size") != null) {
							formObj.rows.value = document.getElementById(id + "setpage_size").value;
						} else {
							formObj.rows.value = this.page_pageSize;
						}
						formObj.totalpages.value = this.page_pageCount;
						formObj.totalrows.value = this.page_totalRecord;
						//���Լ���ҳ�����ر���
						try {
							doprivateSimQuery(formObj);
						} catch (e) {
							//���ɹ�,������,��û��ʵ�ָ÷���
						}
					} else {
						formObj.allflag.value = 1;
					}
					//��ҳʱ����������� 20090915 kim
					var val = "wfstat";
					var uri = window.location.search;
					var re = new RegExp("" + val + "\=([^\&\?]*)", "ig");
					var wfstat = ((uri.match(re)) ? (uri.match(re)[0].substr(val.length + 1)) : null);
					if (wfstat != null) {
						if (formObj.action.indexOf("?") != -1) {
							formObj.action = formObj.action + "&wfstat=" + wfstat;
						} else {
							formObj.action = formObj.action + "?wfstat=" + wfstat;
						}
					}
					formObj.dosubmit(this);
					return;
				}
			}
		}

		_table.paginationSet = function(page) {
			if (_config.allflag) {
				_config.page_page = page.currpage;
				_config.page_pageSize = page.rows;
				_config.page_pageCount = page.totalpages;
				_config.page_totalRecord = page.totalrows;
				_config.page_hasPreviousPage = page.currpage != 1 ? (page.totalpages > 1) : false;
				_config.page_hasNextPage = page.currpage < page.totalpages;
				_config.page_previousPage = page.currpage > 1 ? page.currpage - 1 : 1;
				_config.page_nextPage = page.currpage + 1;
				_config.paginationdiv = document.getElementById(id + '_paginationdiv');
				this.createPagination();
			}
		}	
	}
	// ajax��ҳ
	var _pars = "";
	var clazz = "gov.mof.fasp.ifmis.system.ifmisui.service.IfmisAjaxDatatableService";
	var method = "listAction&pars"+_table.pars;
	_table.ajaxPost = function(param){
		show();
		var o = {
			clazz:_clazz,
			method:_method,
			submenu:_submenu,
			vchcode:_vchcode,
			tabletype:_tabletype,
			dataListName:_dataListName,
			hidHead:_hidhead,
			useThisHead:_useThisHead,
			usecache:_usecache,
			detailnum:_detailnum
		};
		// ��ҳ��Ϣ
		if (_config.allflag) {
				o["allflag"] = 0;
				o["currpage"] = document.getElementById(id + "_page").value;
				o["rows"] = document.getElementById(id + "setpage_size").value;
				if (this.page_pageCount && this.page_pageCount > 0) {
					o["totalpages"] = this.page_pageCount;
				}
				if (this.page_totalRecord && this.page_totalRecord > 0) {
					o["totalrows"] = this.page_totalRecord;
				}
		}
		Ext.lt.RCP.server(
			clazz,
			method+"&"+_pars,
			o,
			function(resp){
				datas = resp.datas;
				// ���кϼ�
				if(resp.allpage_totaljson!=null){
					_allpage_totaljson = eval("("+resp.allpage_totaljson+")");
				}
				// ��ʱ����ϼ���
				var _cols = resp.cols;
				var colsz=table.getCols();
				var colswidth={};
				for(var i=0;i<colsz.length;i++){
					var c=colsz[i];
					colswidth[c.name]=c;
				}
				for(var i=0;i<_cols.length;i++){
					var c=_cols[i];
					if(typeof(colswidth[c.name]) != "undefined"){
						c.width=colswidth[c.name].width;
					}
				}
				table.clearCols();
				table.mergeColumn(0);
				reCol(_cols);
				_cols = _tempArr.concat(_cols);
				table.setCols(_cols);
				table.mergeColumn(mergeColumn);
				/*
				for (var j=0,len=_cols.length; j<len; j++) {
					for(var ii=0,ilen=_cols.length;ii<ilen;ii++) {
						if(_cols[ii]['name'] == _cols[j]['name'] && typeof _cols[j]['mapper'] != "undefined") 
							table.addMapperDatas(_cols[ii]['name'], _cols[j]['mapper']['datas']);
					}
				}
				*/
				table._cols_bak=_cols;
				if(_sumRs != null && _allpage_totaljson != null) {
					_sumRs.addData(_allpage_totaljson);
					_sumRs.delRow(0);
					totalrs = {};
				}
				table.setRecordset(datas);
				var page = resp.page;
				if (page != null)
				{
					_table.paginationSet(page);
				}
				_exportsql = resp.exportsql;
				table.columns.checkbox.reset();
				if(initFn!=null){
					initFn(table);
				}
				table.redraw();
				closeDiv();
			});
	}
	// ��ҳ
	if (_config.allflag) {
		_table.createPagination();
	}
	// Ԥ���е���¼� line,data,checked
	_table.onRowClick = null;
	// ���������У�����������
	_table.setclockColumnSize = function(num) {
		if (typeof num == "undefined" || num == null) return;
		else table.clockColumnSize(num);
	}
	// ������ʾ�кţ����Դ�boolean, �ֶ���, �Զ��庯��
	_table.setShowLine = function(arg) {
		if (typeof arg == "undefined" || arg == null) return;
		else _showLine = arg;
	}
	// Ԥ�����ý����
	_table.setDatas = function(data) {
		if (typeof data == "undefined" || data == null) return;
		else table.setRecordset(data);
	}
	// �ж��Ƿ��ö��ͷ
	_table.isUseThisHead = function (){
		return _useThisHead
	}
	// ��ñ�ͷ��
	_table.getCols = function() {
		return _cols;
	}
	// ��ȡѡ��������
	_table.getSelectedRow = function(){
		return _table.getSelected();
	}
	_table.getSelected = function() {
		var _darr = table.getRecordSet().query({check: 1});
		var _cols = table.getCols();
		var billids = "", billidcodes = "",bounds = "";
		for (var n=0,nlen = _darr.length;n<nlen;n++) {
			var _d = _darr[n];
			if(_d.billid){
					billids += (billids.length>0?",":"")+ _d.billid;
			}
			if(_d.billidcodes){
					billidcodes +=(billidcodes.length>0?",":"")+ "'"+_d.billidcodes+"'";
			}
			bounds += (bounds.length>0?",":"")+n;
			for (var i=0,len=_cols.length; i<len; i++) {
				var _col = _cols[i];
				if(typeof _col.mapping != "undefined") {
					var _id = _col.name;
					var _code = _col.mapper.columns[1];
					var _name = _col.mapper.columns[2];
					var _val = _d[_col.name];
					if(typeof _val != "undefined") {
						var mapping = _col.mapping[_val];
						if(typeof mapping == "undefined") continue;
						_d[_id+"_"+_code] = mapping[1];
						_d[_id+"_"+_name] = mapping[2];
					}
				}
			}
		}
		_darr.billids = billids;
		_darr.billidcodes = billidcodes;
		_darr.bounds = bounds;
		return _darr;
	}
	// ɾ��ѡ����
	_table.removeSelected = function() {
		var _darr = datas.query({check: 1});
		datas.remove(_darr);
		this.addPageCount(-1*_darr.length);
		table.reflash();
	}
	// ������������ж���
	_table.getColByName = function(name) {
		return getColByName(name);
	}
	// ��ȡ�б����ݼ�
	_table.getRecordSet = function() {
		// ����кϼ�ȥ����һ�����ݼ�
		var _arr = table.getRecordSet().toArray();
		return _arr;
	}
	// ��ȡ����sql
	_table.getExpSql = function(){
		return _exportsql;
	}
	// ��ȡ�������
	_table.getTableType = function() {
		return _tabletype;
	}
	_table.setAjaxArgs = function(clazz, method) {
		if(typeof clazz != "undefined" && clazz != null) 
			_clazz = clazz;
		if(typeof method != "undefined" && method != null) 
			_method = method;
	}
	// ajax���ݵ�get����
	_table.setPars = function(pars) {
		if(typeof pars == "undefined" || pars == null )
			return;
		_pars = pars;
	}
	/**
	 * ������
	 * @param data �������ݿ���������Ҳ�����Ƕ���
	 */
	_table.appendRow = function(data) {
		var _arr = [];
		if(!Ext.lt.isArray(data)) {
			// ����������װ�������У����ٺ���ˢ���ж�
			_arr.push(data);
		} else {
			_arr = data;
		}
		var _data = table.getRecordSet();
		_data.addData(data, _data.size());
		this.addPageCount(_arr.length);
		this.reflash(_arr);
	}
	_table.addPageCount=function(n){
		if (_config.allflag) {
			var page={};
			page.currpage=_config.page_page
			page.rows=_config.page_pageSize
			page.totalrows=_config.page_totalRecord+n
			if(page.totalrows%page.rows==0){
				page.totalpages=page.totalrows/page.rows
			}else{
				try {
					page.totalpages=Math.floor(page.totalrows/page.rows)+1;
				} catch (e) {
					page.totalpages=0;
				}
			}
			_table.paginationSet(page);
		}
	}
	/* �Զ�����ͷ
	 * head ���� {col:[head]}
	 */
	_table.setMutlHead = function(head) {
		if(typeof head == "undefined" || head == null )
			return ;
		for (var pro in head) {
			for (var i=0,len=cols.length; i<len; i++) {
				if(cols[i].name == pro) {
					cols[i]["head"] = head[pro];
				}
			}
		}
		table.redraw();
	}
	// ��úϼ��ж���
	_table.getSumRs = function(){
		return _sumRs;
	}
	// ȡ�����кϼ�Ĭ��ֵ��
	_table.getTotalSum = function() {
		return _allpage_totaljson;
	}
 	/* ˢ��
 	 * dataArr Ҫ�޸ĵ������������ݼ�����
 	 */
	_table.reflash = function(dataArr) {
		if (dataArr != null) {
			var _totalcol = _allpage_totaljson;
			for (var i=0,len=dataArr.length; i<len; i++) {
				var _data = dataArr[i];
				// �Ȱ�billdidΨһ����
				var _olddata = datas.query({billid:_data['billid']})[0];
				if(typeof _olddata.length == 0) return;
				// ��getCols()����������ajaxʱ�ж���ı�
				var _cols = table.getCols();
				for (var j=0,jlen=_cols.length; j<jlen; j++) {
					var _col = _cols[j];
					var _colid = _col['name'];
					if (_colid == "_locationposition" || _colid == "check") continue;
					// �޸�֮�����кϼƵ�����
					if (isCreateAmtColumn && typeof totalrs != "undefined" && _totalcol != null) {
						if(typeof _totalcol[_colid] != "undefined") {
							// ���кϼ�
							var _totalVal = parseFloat(_totalcol[_colid]);
							// �ϼ�
							if (typeof totalrs[_colid] == "undefined") continue;
							var _amtVal = parseFloat(totalrs[_colid]);
							// ��ȥ��ʷ����
							if(typeof _olddata[_colid] != "undefined") {
								_amtVal = _amtVal - parseFloat(_olddata[_colid]);
								_totalVal = _totalVal - parseFloat(_olddata[_colid]);
							}
							// �����µ�����
							if(typeof _data[_colid] != "undefined") {
								_amtVal = _amtVal + parseFloat(_data[_colid]);
								_totalVal = _totalVal + parseFloat(_data[_colid]);
							}
							_totalcol[_colid] = _totalVal;
							totalrs[_colid] = _amtVal;
						}
					}
					if(typeof _col.mapping != "undefined") {
						var _id = _data[_colid];
						// ���ж��޸ĺ���Ϊ0
						if(typeof _id == "undefined" || typeof _col.mapping[_id] != "undefined") continue;
						var _code = _data[_colid+"_code"];
						var _name = _data[_colid+"_name"];
						if(typeof _code == "undefined" || typeof _name == "undefined") continue;
						table.addMapperDatas(_colid, [[_id, _code, _name]]);
					}
				}
				// �޸ĵ����ݼ����¸�ֵ��ԭ����,��Ϊ�п�����������ʷ�����в�����
				Ext.lt.apply(_olddata, _data);
			}
		}
		table.reflash();
		//table.reflash();
	}
	// ����Զ����¼�
	_table.onEvent = function (en, f){
		table.onEvent(en, f);
	}
	var deffn=["setFnFilter","clearFnFilter","setFilter","clearFilter","setMouselightCell","setHiddenColumn"];
	_table.mergeColumn=function(n){
		mergeColumn=n;
		table.mergeColumn(n);
	}
	for(var i=0,l=deffn.length;i<l;i++){
		if(_table[deffn[i]]==null){
			_table[deffn[i]]=table[deffn[i]];
		}
	}
	
	return _table;
}
Ext.lt.ifmiseditdatatable=function(config){
	var _endFunc = config.endedit;
	if(_endFunc != null && !Ext.lt.isFunction(_endFunc)) {
		_endFunc = eval(_endFunc);
	}
	/** ͨ���ж���ɱ༭�����滻����ͨ�÷��� **/
	// ��ʼ���򵥿ɱ༭��
	var ovalue=null;
	function _init_edit(td,el,col,d,l,c){
		if(el.contains(_editor)) return;
		
		if(col.mapping==null){
			_init_edit_input(td,el,col,d,l,c);
			el.firstChild.focus();
			el.firstChild.select();
		}
		else{
			_init_edit_select(td,el,col,d,l,c);
		}
	}
	
	var _editor=null;
	var _endEdite=function(save){
			var d='';
			if(this.tagName=='INPUT') d=this.value;
			if(this.tagName=='SELECT') d=this.value;
			var col=this.col;
			
			if(save){
				if(col.datatype=='N'){
					d=d.toNumber(col.format.dotname,false,1);
				}
				this.data[col.name]=d
			}

			var yanzheng=true;
			if(_endFunc){
				yanzheng=_endFunc(col._dt,col._dt.getRecordset(),this.l,this.c,this.data);
			}
			d=col._fn(this.l,this.c,this.data)
			this.srcobj.innerHTML=d==null?'':d
			this.srcobj.editing=false;
			this.removeNode(true);
						
			if(yanzheng==false){
				this.data[col.name]=ovalue;
				ovalue=null;
				col._dt.reflashdata();
				return ;
			}
			if(this.data.check==1){
				var _sumRs=table.getSumRs();
				if(col.datatype=='N'&&_sumRs!=null){
					//��ʼ����ϼ�ֵ
					//�ºϼ�ֵ=�ϼ�ֵ-��ֵ+��ֵ
					var sumrs=_sumRs.getData(0);
					if(isNaN(sumrs[col.name]))sumrs[col.name]=0;
					sumrs[col.name]=parseFloat(sumrs[col.name],10)-parseFloat(ovalue,10)+parseFloat(this.data[col.name],10);
					sumrs[col.name]=(sumrs[col.name]+"").toNumber(col.format.dotname,false,1)
				}
			}
			var sumrs=table.getTotalSum();
			if(col.datatype=='N'&&sumrs!=null){
				//��ʼ����ϼ�ֵ
				//�ºϼ�ֵ=�ϼ�ֵ-��ֵ+��ֵ
				if(isNaN(sumrs[col.name]))sumrs[col.name]=0;
				sumrs[col.name]=parseFloat(sumrs[col.name])-parseFloat(ovalue,10)+parseFloat(this.data[col.name],10);
				sumrs[col.name]=(sumrs[col.name]+"").toNumber(col.format.dotname,false,1)
			}
			ovalue=null;
			if(col.datatype=='N'){
				this.data[col.name]=parseFloat(this.data[col.name],10);
			}
			col._dt.reflashdata();
	}
	// ��ʼ���򵥿ɱ༭��
	function _init_edit_input(table,el,col,d,l,c){
		var _editor=document.createElement('input')
		_editor.className='_edit '+col.datatype;
		_editor.value=d[col.name]==null?(col.datatype=='S'?'':0):d[col.name];
		_editor.srcobj=el;
		_editor.col=col;
		_editor.data=d;
		_editor.l=l;
		_editor.c=c;
		_editor.style.width=(el.offsetWidth-Ext.lt.HTML.getBorderSet(el).left-2)+'px';
		_editor.onselectstart=function(){window.event.cancelBubble=true;};
		_editor.onselect=function(){window.event.cancelBubble=true;};
		Ext.lt.HTML.expand(_editor);
		el.innerHTML=''
		el.appendChild(_editor);
		el.editing=true;
		_editor.fixPosition=false;
		_editor.onKey({
			// �س���
			'13':function(){
				_endEdite.apply(_editor,[true]);
				var id=_editor.srcobj.id
				table.gotoCell(_editor.l+1,_editor.c,function(nextCell){
					if(nextCell!=null) nextCell.fireEvent('onclick');
				},true);
				event.cancelBubble=true;
			},
			// Tab��
			'9':function(){
				_endEdite.apply(_editor,[true]);
				var id=_editor.srcobj.id
				var _columns=table.getCols();
				var nextcol=_editor.c+1,nextline=_editor.l;
				for(;nextline<dt.getRecordset().size();nextline++){
					for(;nextcol<_columns.length;nextcol++){
						if(_columns[nextcol].edit==true) break;
					}
					if(nextcol!=_columns.length) break;
					nextcol=0;
				}
				
				table.gotoCell(nextline,nextcol,function(nextCell){
					if(nextCell!=null){
						nextCell.fireEvent('onclick');
					}
				},true);
				
				event.cancelBubble=true;
			},
			//��
			'37':function(){
				var _columns=table.getCols();
				_endEdite.apply(_editor,[true]);
				var id=_editor.srcobj.id
				var _columns=table.getCols();
				var nextcol=_editor.c-1,nextline=_editor.l;
				for(;nextline>=0;nextline--){
					for(;nextcol>=0;nextcol--){
						if(_columns[nextcol].edit==true) break;
					}
					if(nextcol!=-1) break;
					nextcol=_columns.length-1;
				}
				
				table.gotoCell(nextline,nextcol,function(nextCell){
					if(nextCell!=null){
						nextCell.fireEvent('onclick');
					}
				},true);		
			},
			//��
			'38':function(){
				_endEdite.apply(_editor,[true]);
				var id=_editor.srcobj.id
				table.gotoCell(_editor.l-1,_editor.c,function(nextCell){
					if(nextCell!=null) nextCell.fireEvent('onclick');
				},true);
				event.cancelBubble=true;	
			},
			//��
			'39':function(){
				_endEdite.apply(_editor,[true]);
				var id=_editor.srcobj.id
				var _columns=table.getCols();
				var nextcol=_editor.c+1,nextline=_editor.l;
				for(;nextline<table.getRecordSet().size();nextline++){
					for(;nextcol<_columns.length;nextcol++){
						if(_columns[nextcol].edit==true) break;
					}
					if(nextcol!=_columns.length) break;
					nextcol=0;
				}
				
				table.gotoCell(nextline,nextcol,function(nextCell){
					if(nextCell!=null){
						nextCell.fireEvent('onclick');
					}
				},true);	
			},
			//��
			'40':function(){
				_endEdite.apply(_editor,[true]);
				var id=_editor.srcobj.id
				table.gotoCell(_editor.l+1,_editor.c,function(nextCell){
					if(nextCell!=null) nextCell.fireEvent('onclick');
				},true);
				event.cancelBubble=true;	
			},
			// Esc��
			'27':function(){
				_endEdite.apply(_editor,[true]);
				event.cancelBubble=true;
			},
			'*':function(){
				event.cancelBubble=true;
			}
			
			
		});
		
		_editor.onclick=function(){window.event.cancelBubble=true;return false;}
		
		_editor.onblur=function(){
			_endEdite.apply(_editor,[true]);
			window.event.cancelBubble=true;
			return false;
		}
		//_editor.select();
		//_editor.focus();
	}
	
	// ��ʼ���򵥵�ѡ�б�
	function _init_edit_select(table,el,col,d,l,c){
		var sel=[];
		var cdata=col.mapper.datas;
		var ci=col.ci;
		
		
		sel.push('<select>');
		for(var i=0,j=cdata.length;i<j;i++){
			//c.mapping[c.mapper.datas[i][c.ci]]=c.mapper.datas[i];
			sel.push('<option value="',cdata[i][ci],'">',col._formartValue(cdata[i][ci]),'</option>')
		}
		sel.push('</select>');
		el.innerHTML=sel.join('');
		
		_editor=el.firstChild;
		_editor.style.width='100%';
		_editor.src=el;
		_editor.col=col;
		_editor.data=d;
		_editor.l=l;
		_editor.c=c;
		_editor.value=d[col.name];
		_editor.onclick=function(){_editor.editing=true};
		_editor.onchange=function(){_endEdite.apply(this,[true])};
		
	}

	// ��ʼ��Ԫ��༭
	function _startedit(table,el,l,c,d){
	
		stuffEl.l=l;
		stuffEl.c=c;
		ovalue=d[table.getCol(c).name];
		if(ovalue==null)ovalue=0;
		if(config.startedit){
			if(!eval(config.startedit)(table,el,l,c,d)){
				return;
			}
		}
		_init_edit(table,el,table.getCol(c),d,l,c)
	}
	
	// �����༭��Ԫ��༭
	function _endedit(){
		
	}
	
	function _columnclick(table,el,l,c,d){
		if(!this.edit) return;
		this.oneditstart(table,el,l,c,d)
		window.event.cancelBubble=true;
	}
	var c=config.cols;
	
	function _initColsInfo(c){
		for(var n=0;n<c.length;n++){
			var col=c[n];
			if(col==null) continue;
			if(col.onclick!=null){
				col.onclick=function(fn){
					var col_click=fn
					return function(){
						_columnclick.apply(this,arguments);
						if(col_click!=null) col_click.apply(this,arguments);
					}
				}(col.onclick);
			}
			else{
				col.onclick=_columnclick
			}
			if(col.edit==true){
				col.oneditstart=_startedit;
				col.oneditend=_endedit;
				col.rowspan=function(i,c,tmpdata){
					if(config.startedit){
						if(eval(config.startedit)(dt,null,i,c,tmpdata)){
							return 'bl dedit';
						}
					}else{
						return 'bl dedit';
					}
			//	else return 'bl';
				}
				//col.style="background-color: #FFEFC3;"
			}
		}
	}
	
	
	var table=new Ext.lt.ifmisdatatable(config);
	var dt=table.getCols()[0]._dt;
	_initColsInfo(dt.getCols());
	// ��������滻����
	dt.setKeysearch=function(flag){
		_keysearch=flag==true;
		var tab=this;
		Ext.lt.regKeyEvent('r',function(){tab.showReplacewindow()},false,true);
		Ext.lt.regKeyEvent('s',function(){tab.showSearchwindow()},false,true);
		Ext.lt.regKeyEvent('n',function(){tab.showStuffwindow()},false,true);
	}
	var _replaceWindow=null;
	function _initReplaceWindow(){
		if(_replaceWindow!=null) return;
		
		// ���ɽ���
		var replaceWindow=document.createElement('DIV');
		replaceWindow.className='datatable_replacewindow';
		replaceWindow.style.cssText='display:none;';
		Ext.lt.HTML.expand(replaceWindow);
		replaceWindow.setInnerHTML('<table border="0"><tr><td class="drag"></td><td><input type="text" tipstext="�������������..." value=""></td><td><button>��һ��</button></td><td><button>��һ��</button></td><td></td></tr><tr><td class="drag"></td><td><input type="text" tipstext="�������滻����..." value=""></td><td><button>�滻</button></td><td><button>ȫ���滻</button></td><td><button>�ر�</button></td></tr></table>');
		document.body.appendChild(replaceWindow);
		var tds = replaceWindow.getElementsByTagName('TD');
		
		// ���ɶ�������
		replaceWindow.dragdt=tds.item(0);
		replaceWindow.inputbox=tds.item(1).firstChild;
		replaceWindow.prebtn=tds.item(2).firstChild;
		replaceWindow.nextbtn=tds.item(3).firstChild;
		replaceWindow.replacebox=tds.item(6).firstChild;
		replaceWindow.repbtn=tds.item(7).firstChild;
		replaceWindow.repallbtn=tds.item(8).firstChild;
		replaceWindow.closebtn=tds.item(9).firstChild;
		replaceWindow.table=dt
		var _searchword=null
		// ���ɶ���
		var lastkeyup=null;
		Ext.lt.HTML.drag({element:replaceWindow.dragdt,holder:false,dragel:replaceWindow});
		replaceWindow.inputbox.onkeyup=function(){
			lastkeyup=new Date();
			_searchword=this.value
			setTimeout(function(){if(new Date()-lastkeyup>300){replaceWindow.table.setSearchWord(_searchword)}},400);
			
		}
		replaceWindow.prebtn.onclick=function(){replaceWindow.cell=replaceWindow.table.goPreSearchWord()};
		replaceWindow.nextbtn.onclick=function(){
			replaceWindow.cell=replaceWindow.table.goNextSearchWord();
		};
		replaceWindow.closebtn.onclick=function(){replaceWindow.inputbox.value='';replaceWindow.table.clearSearchWord();replaceWindow.style.display='none'};
		replaceWindow.repbtn.onclick=function(){
			if(_searchword==null||replaceWindow.cell==null||_searchword.length==0||dt.getClockRowSize()>replaceWindow.cell.l)return;
			//debugger;
			var reg=eval('/('+_searchword.replace(/\./gi,'\\.').replace(/\*/gi,'.*').replace(/\?/gi,'.?')+')/gi');
			var l=replaceWindow.cell.l;
			var c=replaceWindow.cell.c;
			var col=dt.getCol(c);
			if(!col.edit){replaceWindow.cell=replaceWindow.table.goNextSearchWord();return;}
			var data=dt.getRecordset().getData(l);
			var d=data[col.name];
			if(config.startedit){
				eval(config.startedit)(table,null,l,c,data);
			}
			//�޸�������������
			if(col.datatype=='N'&&d==null){
				d='0';
			}
			if(col.datatype=='N'){
				d=(d+'').toNumber(col.format.dotname,false,col.format.unit);	
			}
			//�ı�����
			d=(d+'').replace(reg,replaceWindow.replacebox.value);
			if(col.datatype=='N'){
				d=d.toNumber(col.format.dotname,false,1);
			}
			
			data[col.name]=d
			if(config.endedit){
				eval(config.endedit)(dt,dt.getRecordset(),l,c,data);
			}
			dt.reflashdata();
			replaceWindow.cell=replaceWindow.table.goNextSearchWord();
		}
		replaceWindow.repallbtn.onclick=function(){
			if(_searchword==null||_searchword.length==0)return;
			var cols=dt.getCols();
			var colmuns=[];
			for(var i=0;i<cols.length;i++){
				if(cols[i].edit){
					colmuns.push(cols[i]);
				}
			}
			var _rs=dt.getRecordset();
			var colsize=colmuns.length;
			var l=dt.getClockRowSize();
			var c=0;
			var reg=eval('/('+_searchword.replace(/\./gi,'\\.').replace(/\*/gi,'.*').replace(/\?/gi,'.?')+')/gi');
			for(l;l<_rs.size();l++){
				var data=_rs.getData(l);
				for(c=0;c<colsize;c++){
					var col=colmuns[c]
					var d=data[col.name];
				
					//�޸�������������
					if(col.datatype=='N'&&d==null){
						d='0'.toNumber(col.format.dotname,col.format.qfw,col.format.unit);
					}
					if(!reg.test(d))continue;
					if(config.startedit){
						eval(config.startedit)(table,null,l,c,data);
					}
					//�ı�����
					d=(d+'').replace(reg,replaceWindow.replacebox.value);
					
					if(col.datatype=='N'){
						d=d.toNumber(col.format.dotname,false,1);
					}
					
					data[col.name]=d
					if(config.endedit){
						eval(config.endedit)(dt,dt.getRecordset(),l,col.colindex,data);
					}
				}
			}
			dt.reflashdata();
		}
		
		_replaceWindow=replaceWindow;
	}
	
	var stuffWindow=null;
	var stuffEl={};
	function _init_stuff_win(){
		if(stuffWindow!=null)return;
			stuffWindow=document.createElement('div');
			stuffWindow.innerHTML='<table border="0"><tr><td class="drag"></td><td><input type="text" tipstext="������������" value=""></td><td><button>����</button></td><td><button>����</button></td><td><button>�ر�</button></td></tr></table>'
			document.body.appendChild(stuffWindow);
			stuffWindow.className='datatable_searchwindow';
			stuffWindow.style.cssText='display:none;';
			Ext.lt.HTML.expand(stuffWindow);
			var tds = stuffWindow.getElementsByTagName('TD');
			// ���ɶ�������
			stuffWindow.dragdt=tds.item(0);
			stuffWindow.inputbox=tds.item(1).firstChild;
			stuffWindow.prebtn=tds.item(2).firstChild;
			stuffWindow.nextbtn=tds.item(3).firstChild;
			stuffWindow.closebtn=tds.item(4).firstChild;
			stuffWindow.table=table
			
			// ���ɶ���
			Ext.lt.HTML.drag({element:stuffWindow.dragdt,holder:false,dragel:stuffWindow});
			//_editor
			stuffWindow.inputbox.onblur=function(){
				//��֤������Ƿ������֣�	
			}
			stuffWindow.prebtn.onclick=function(){
				if(stuffEl.c==null){return}
				var crs=dt.getClockRowSize();
				var col=dt.getCol(stuffEl.c);
				var l=stuffEl.l-1;
				var v=dt.getRecordset().getData(stuffEl.l)[col.name];
				for(var i=stuffWindow.inputbox.value;i>0&&l>=crs;i--,l--){
					if(config.startedit){
						eval(config.startedit)(dt,null,l,stuffEl.c,dt.getRecordset().getData(l));
					}
					dt.getRecordset().getData(l)[col.name]=v;
					if(config.endedit){
						eval(config.endedit)(dt,dt.getRecordset(),l,stuffEl.c,dt.getRecordset().getData(l));
					}
				}
					dt.reflashdata();
			};
			stuffWindow.nextbtn.onclick=function(){
				if(stuffEl.c==null){return}
				var col=dt.getCol(stuffEl.c);
				var l=stuffEl.l+1;
				var v=dt.getRecordset().getData(stuffEl.l)[col.name];
				var datasize=dt.getRecordset().size();
				for(var i=stuffWindow.inputbox.value;i>0&&l<datasize;i--,l++){
					if(config.startedit){
						eval(config.startedit)(dt,null,l,stuffEl.c,dt.getRecordset().getData(l));
					}
					dt.getRecordset().getData(l)[col.name]=v;
					if(config.endedit){
						eval(config.endedit)(dt,dt.getRecordset(),l,stuffEl.c,dt.getRecordset().getData(l));
					}
				}
					dt.reflashdata();	
				
			};
			stuffWindow.closebtn.onclick=function(){stuffWindow.inputbox.value='';stuffWindow.style.display='none'};
			
	}
	dt.showReplacewindow=function(){
		_initReplaceWindow();
		_replaceWindow.style.display='';
		_replaceWindow.style.top='0px';
		_replaceWindow.style.left='0px';
		
	}
	dt.showStuffwindow=function(){
		_init_stuff_win();
		stuffWindow.style.display='';
		stuffWindow.style.top='0px';
		stuffWindow.style.left='0px';
	}
	dt.setKeysearch(true);
	table.getEditOldValue=function(){
		return ovalue;
	}
	var EditColsFn=null;
	table.setEditColsFn=function(fn){
		EditColsFn=fn;
	}
	dt.redraw_b=dt.redraw;
	dt.redraw=function(){
		//debugger;
		if(dt._cols_bak!=null){
			EditColsFn(dt._cols_bak);
			_initColsInfo(dt._cols_bak);
		}
		dt.redraw_b();
	};
	return table;
};
// ����¹��õ���tabname,path,templettag,titleflag,sumflag��IXLSExportData
//@IXLSExportData ���Ի������ӿڣ���Ӧspring��beanid
function ifmisExpExcel(tabname,path,templettag,titleflag,sumflag,IXLSExportData) {
		var _table = tabname;
		// ҳǩ
		var tabPageMap = {};
 	   	if(typeof tabpage_main != "undefined"){
 	   		_table = eval(tabpage_main.datatable);
 	   		tabPageMap = {
 			   submenu:getUrlParam(window.location.search,"submenu"),
 			   defTabIndex:tabpage_main.firstSelectedIndex,
 			   defCondition:tabpage_main.getFirstTabFilter(),
			   tabCondition:tabpage_main.getSelectedTabFilter(),
			   selectedTabIndex:tabpage_main.getSelectedTabIndex()
 	   		}
	 	}
		var _datas = _table.getRecordSet();
		if(_datas.length == 0) {
			alert("������������ݣ����ѯ���ٵ�����"); 
			return;
		}
		// ��Ҫ�ı�ͷ��Ϣ
		var needHead = [];
		// ��ͷ��󳤶�
		var headMaxLen = 0;
		var heads = _table.getCols();
		for (var i=0,len=heads.length; i<len; i++) {
			needHead[i] = {};
			needHead[i]["name"] = heads[i].alias;
			needHead[i]["headid"] = heads[i].name;
			needHead[i]["head"] = heads[i].head;
			if (heads[i].head != null && heads[i].head.length>headMaxLen) {
				headMaxLen = heads[i].head.length;
			}
			needHead[i]["datatype"] = heads[i].datatype;
		}
		// ҳǩ��Ϣ����
		var map = {
			heads:needHead, 			//��ȡ��ͷ
			title:getTitle(),			//����
			sumflag:sumflag,			//1 �кϼ���,�ϼƱ�ʶ
			titleflag:titleflag,		//1 �б�����,�����б�ʶ
			tabtype:_table.getTableType(),//������
			path:path,					//ҵ��ҳ��·��
			amtflag:1,					//����ʶ
			billids:getSelectedBillids(),		//ѡ����billid
			headMaxLen:headMaxLen,
			exportsql:_table.getExpSql()	//��̨sql
		};
		//added by zhangkai ���Ӹ��Ի������ӿ�
		if(typeof(IXLSExportData)!="undefined"&&IXLSExportData!=null&&IXLSExportData!="")
			map.IXLSExportData=IXLSExportData;
		// ����
		Ext.lt.RCPConsole.processdown(
				"gov.mof.fasp.ifmis.system.export.XlsExport",
				"exportExcel",
				[map, tabPageMap]
		);
		/**
		 * �õ�ѡ���е�billid
		 */
		function getSelectedBillids() {
			var _selectedRows = _table.getSelected();
			var billds = [];
			for (var i=0,len=_selectedRows.length; i<len; i++) {
				billds.push(_selectedRows[i]['billid']);
			}
			return billds.join(",");
		}
}