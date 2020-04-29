
if(typeof(JQ)=="undefined" || JQ.fn.jquery != "1.3.1"){
	document.write("<scr"+"ipt language='javascript' src='/js/jquery-1[1].3.1.js' ></scr"+"ipt>");
	document.write("<scr"+"ipt language='javascript' src='/js/jquery.md5.js' ></scr"+"ipt>");
	document.write("<scr"+"ipt language='javascript' src='/js/jquery.editable-select.js'  charset='GBK' ></scr"+"ipt>");
	document.write("<scr"+"ipt language='javascript' src='/js/jquery.dragsort.js'  charset='GBK' ></scr"+"ipt>");
}else if(typeof(JQ.md5)=="undefined"){
	document.write("<scr"+"ipt language='javascript' src='/js/jquery.md5.js' ></scr"+"ipt>");
}
if(typeof(JQ)!="undefined"&&typeof(JQ.fn.editableSelect)=="undefined"){
	document.write("<scr"+"ipt language='javascript' src='/js/jquery.editable-select.js'  charset='GBK' ></scr"+"ipt>");
	document.write("<scr"+"ipt language='javascript' src='/js/jquery.dragsort.js'  charset='GBK' ></scr"+"ipt>");
}
if(typeof(JQ)!="undefined"&&typeof(JQ.fn.dragsort)=="undefined"){
	document.write("<scr"+"ipt language='javascript' src='/js/jquery.dragsort.js' charset='GBK' ></scr"+"ipt>");
}

var COL_HEAD_NONE = 0;
var COL_HEAD_EDGE = 1;
var COL_HEAD_OVER = 2;
var COL_HEAD_SIZE = 3;
var COL_HEAD_DOWN = 4;
var COL_HEAD_MOVE = 5;
var COL_HEAD_NODA = 6;
var BOTTOM_SPACE = 0;
var DATATABLES = new Array();
var dataTable_select_s=null;
function dataTable(){
	this.objecttype = "datatable";
	this.id = "";
	this.parent = null;	// 上级元素
	this.data = new Array();	// 数据
	this.datalen = 0;
	this.waitrefreshdata = new Array();//待刷新的行数据。
	this.maxline = 20;  // 默认显示行数
	this.height = 0;
	this.startRowNum= 0;
	this.columnConfig = new Array();
	this.inputRuleConfig = new Array();
	this.showLevelConfig = new Array();
	this.filterConfig = new Array();
	this.actionConfig = new Array();
	this.actionRule = new Array();
	this.timers = new Array();
	this.tabletype = null;
	this.linkname = null;
	this.labelmap = null;
	this.titleShow=false;
	this.rightscrollotop =0;
	this.isWrap=false;
	this.autocomplete = false;
	this.isredraw = false;
	this.vp = 0; //自定义表头 ，表头高度和标准的差值
	this.contentdiv = null;		// 显示内容的div
	this.rightscrollbar = null; // 控制纵向滚动条高度的div
	this.rightscroll = null;	// 右侧纵向滚动条
	this.borderdiv = null;		// 限制显示区域的div
	this.paginationdiv = null;	// 限制分页区域的div
	
	this.headHTML = null;		// 表头代码
	this.headtrobj = null;
	this.useThisHead = null;	// 自定义表头代码，ganhua 20090320
	this.onrowclick = null;		// 处理行点击事件
	this.onrowdblclick = null;	// 处理行点击双击事件 wy 20091205
	this.ondatachange = null;
	this.onclickselectedall = null ;  //选中全部外部事件接口
	this.drawing = false;		// 表示当前是否正在绘制表格
	this.currentSortCol=null;
	this.mainmenu = null;
	this.submenu = null;
	this.vchtypecode = null;
	this.customfield = null;
	this.trHeight = 22; //行高， 默认22
	this.headHeight = 22; //行高， 默认22
	this.TABLE_TR_H= 29;
	this.lockcolcount = 0; //固定列
	this.firstDraw = true;
	this.waitdrawrow = false;
	this.drawBeginTd = 0;
	this.drawEndTd = 0;
	
	this.display = "block";		// 显示方式: block按照给定区域大小显示  line按照设置的行数显示
	this.disabled = false;	
	this.negative = false;
	this.totalConfig = new Array();
	this.disabledConfig = new Array();
	this.getTableHead = new Array();//获取表头数组
	this.tableInitHead = new Array();//初始表头数组
	this.setHeadHeight = function (headHeight){}; //wy 设置表头高度
	this.setTRHeight = function (trHeight){}; //wy 设置行高度
	this.hasCorrectHeadUserData = false; //全局变量，第一次setTableHead的时候对表头信息进行校验
	
	this.headeventhandler=function(){};//表头事件绑定
	this._mouseMove=function(){};
	this._mouseUp=function(){};
	this._scrollMove = function(){}; //鼠标滚轮滚动事件
	this._removeLocalSetting=function(){};
	this._mouseDown=function(){};
	this._checkHeaderOperation = function(el, x) {}
	this._headerOper    = COL_HEAD_NONE;
	this._headerData    = null;
	this.bodyColResize = true;
 
	this.isShowRadio=false; //是否显示radio
	this.isShowCheckBox=false; //是否显示checkbox
	this.isShowSerial=false;  //是否显示序号
	this.isTag=false; //是否通过标签生成
	
	this.UseOtherTotaljson = false; //使用业务系统注入合计对象
	this.isTotalbyRadio =  false; //单选列表选中合计开关，默认选中进行合计
	
	this.allflag = false;		// 是否分页
	this.page_page = 1; /** 当前页号 */
    this.page_pageSize = this.maxline; /** 每页记录数 */
    this.page_pageCount = 1;/** 总页数 */
    this.page_totalRecord = 1;/** 所有页面的总记录数 */
    this.page_formName = null; /** 表单名称 */
    this.page_postUrl = null;/** 在翻页时, 所要提交的页面(指分页页面的.jsp或.do名称). 即formName表单的action属性 */
    this.page_hasPreviousPage = false; // 是否有上一页
    this.page_hasNextPage = false;// 是否有下一页
    this.page_previousPage = 1;//上一页
    this.page_nextPage = 1;// 下一页
    this.exportsql = null;
	
	this.tagPage=null;
    this.showHorizontalSB = true;
    this.sorter = null;//排序对象
    this.orderMap={};//存放每列排序状态的Map容器 
    this.compareFuncMap={};//存放每列排序函数的Map容器

	this.sumamtrow ="";// all 全部行金额汇总
	this.setDisabledConfig = function(){};
	this.getDisabledConfig = function(){};
	this.selectedall = false;	// 是否选中所有行	
	this.showstatus = false;	// 是否显示状态栏
	this.status = null;			// 状态栏
	this.sumAmtColumn = '0.00';
	this.isCreateAmtColumn = true;
	this.columnList=['amt'];		
	
	this.editTdDiv = null; //保存焦点中的DIV
	this.columnEditor = new Object(); // 保存数据监听器
	this.appendrow = false;    // 显示时追加的空行数，空行不计入datatable中的data数组中，一旦修改了appendrow的属性则改数据则记录到data数组中，并产生一个新的空行
	this.checkedOnclick = false; // 单击后则选中点击行,但只能单选
	this.listenObject = new Object(); // 保存事件监听器
	this.custom_totaljson ={}; //业务系统传入的合计对象
	this.allpage_totaljson={};//总合计对象
	this.totalColumn=new Array();//总合计列
	this.tmainpaginationdivorg = "";//缓存行专列
	this.isgetfocus=true; //单选时是否聚焦,上下键时需要聚焦。当页面行上弹出页面时不需要聚焦
	this.iszoom=false; //是否为最大化，默认否
	
	this.showcopy=false;//是否显示复制框
	
	this.showHeadContextmenu=false;//是否使用表头的右键菜单。
	
	this.defaultSortObj = new Object(); //重绘表格时候默认排序字段
	this.sortObjFromCookie = new Object();//从Cookie中取出的排序信息对象，不用读取两次cookie
	this.totalTextName = null;//存储合计名字以便名称转换时调用 
	// 根据Cookie中存储的排序信息进行排序
	this.sortFromCookie = function(){};
	//获取表头信息在绘制表头时候用
	this.getFromCookie  = function(){};
	// 根据Cookie中存储的排序信息进行排序
	this.sortFromURL = function(){};
	//获取表头信息在绘制表头时候用
	this.getFromURL  = function(){};
	
	// 返回选中行的数组
	this.getSelectedRow = function(){};
	// 选中所有数据
	this.selectedallrows = function(){};
	this.selectedrow = function(){};
	// 产生表头的HTML代码
	this.setTableHead = function(){};
	// 追加一个列设置
	this.appendColumnConfig = function(){};
	this.getColumnConfig = function(){};
	// 将表格完全重绘，修改数据时使用
	this.show = function(){};
	// 重绘表格显示部分，没有修改数据时使用
	this.draw = function(){};
	// 获取数据被改变的记录
	this.getChangedRows = function(){};
	// 向数据表格中追加数据
	this.appendRow = function(){};
	//向数据表格插入数据
	this.insertRow = function(){};
	// 删除选中行
	this.removeSelected = function(){};
	// 重新计算datatable各个区域的大小
	this.resize = function(){};
	// 从数据缓冲中读取下一段数据
	this.getnextdata = function(){};
	// 接收数据缓冲中的数据
	this.revertdata = function(){};
	// 检测datatable是否有该属性
	this.hasColumn = function(){};
	// 给数据表格的列绑定一个编辑域
	this.attachColumn = function(){};
	// 监听数据表格的事件，目前支持的事件有 onrowclick onrowselected onrowunselected
	this.listenEvent = function(){};
	// 触发dataTable的事件
	this.fireEvent = function(){};
	//增加金额列
	this.appendAmtColumn = function(){};
	//判断是否含有金额栏
	this.isContainsAmtColumn = function(){};
	//金额合计	
	this.sumMainAmtToColumn = function(totaldbList){};
	
	//业务系统调用接口，将需要合计的对象传进去.
	this.setallpagetotaljson = function(){};
	
	this.getTotalVal = function(){};
	this.setTotalVal = function(){};
	//jjy20090508 添加分面方法 begin
	//创建分页表格
	this.createPagination = function(){};
	// 检查用户输入的页号是否合法
	// 返回值：true-合法 false-非法;
	this.checkPage = function (thePage) {};
	// 支持回车跳转
	this.enterJump = function() {};
	// 跳转到指定的分页
	this.gotoPage = function(thePage) {};
	// 提交分页跳转表单
	this.submitGotoPage = function() {};
	//end 添加分面方法
	this.onfocus=function(){};
	
	//排序 jjy20090515
	this.sort_click = function(sortname,sorttype,cellindex){};
	this.toDate=function(ds){};//字符串转成日期类型 格式 MM/dd/YYYY MM-dd-YYYY YYYY/MM/dd YYYY-MM-dd
	this.switchOrder=function(idx){};
	this.generateCompareFunc=function(sortname,type,cellindex,thobj){};//生存排序函数 
	//排序 end

	/*
		改变合计值
	*/	
	this.changetotalresult = function(obj){};
	/*
		关闭合计方式层
	*/
	this.closetotalmenu = function(obj){};
	/*
		显示合计方式层
	*/
	this.showtotalmenu =function(){};

	/**
	 * 将列信息赋给当前对象，防止两个列表同一个id时中文名称覆盖问题
	*/
	this.resetColumnConfig = function(){
		for(var p in ColumnConfig){
			if(ColumnConfig[p]["id"]!=undefined &&(ColumnConfig[p]["tabletype"] == undefined ||  ColumnConfig[p]["tabletype"] == "" || ColumnConfig[p]["tabletype"]== this.tabletype ||this.tabletype ==undefined))
				this.ColumnConfig[p]=ColumnConfig[p];
		}
	}
	this.ColumnConfig = function(){
		var ret =new Object();
		for(var p in ColumnConfig)
		{
			if(ColumnConfig[p]["id"]!=undefined &&(ColumnConfig[p]["tabletype"] == undefined ||  ColumnConfig[p]["tabletype"] == "" || ColumnConfig[p]["tabletype"]== this.tabletype ||this.tabletype ==undefined))
				ret[p]=ColumnConfig[p];
		}
		return ret;
	}

	this.fireEvent = function(event, eventObject){
		if(this.listenObject[event] == null){
			return null;
		}
	    var listeners = this.listenObject[event];
	    for(var i=0;i<listeners.length;i++){
	        var listener = listeners[i];
	        listener.receiveEvent(event, eventObject);
	    }
	};
	
	this.attachEvent = function(event, listener){
		if(this.listenObject[event] == null){
			this.listenObject[event] = new Array();
		}
		this.listenObject[event][this.listenObject[event].length] = listener;
		listener.datatable = this;
	}
	
	this.setDisabledConfig = function(colid,rownum,disabled){
		var id = rownum+','+colid;
		this.disabledConfig[id]=disabled;
	}
	this.attachColumn = function(column, editor){
		this.columnEditor[column] = editor;
	}
	this.getDisabledConfig = function(colid,rownum){
		var id = rownum+','+colid;
		if(this.disabledConfig[id] != undefined){
			return this.disabledConfig[id];
		}else{
			return false;
		}
	}
	this.hasColumn = function(name){
		for(var i=0;i<this.columnConfig.length;i++){
			if(this.columnConfig[i].id == name){
				return true;
			}
		}
		return false;
	}
	
	this.removeSelected = function(){
		// 将未选中的行放到新的数组中，然后替换datatable的数据
		var newdatas = new Array();
		var removedatas = new Array();
		var _allTotal = this.allpage_totaljson;
		for(var i=0;i<this.data.length;i++){
			if(this.data[i].checked){
				var _rowData = this.data[i];
				removedatas[removedatas.length] = _rowData;
				// 删除时如果有所有合计，需要重新计算
				if (_allTotal != null) {
					for (var pro in _allTotal) {
						var _tempAmt = _rowData[pro];
						if (_tempAmt != null)
						_allTotal[pro] = parseFloat(_allTotal[pro]) - parseFloat(_tempAmt);
					}
				}
			}
			else {
				newdatas[newdatas.length] = this.data[i];			
			}
		}
		this.data = null;
		this.data = newdatas;
		this.waitrefreshdata = newdatas;
		this.isredraw = true;
		// 删除行时重置所有合计值
		if(this.isCreateAmtColumn) {
			this.sumMainAmtToColumn(this.totalColumn);
		}
		this.draw();
		this.resetscroll();
		return removedatas;
	}
	
	this.insertRow = function(row,startnum){
		if(this.data == null){
			this.data = new Array();
		}
		var newdatas = new Array();
		var inserted = false;
		for(var i=0;i<this.data.length;i++){
			newdatas[newdatas.length] = this.data[i];
			if(!inserted && this.data[i].checked){
				newdatas[newdatas.length] = row;
				inserted = true;
			}
		}
		if(!inserted){
			newdatas[newdatas.length] = row;
		}
		this.data = newdatas;
		this.isredraw = true;
		if(startnum!=null) 
			this.draw(startnum);
		else 
			this.draw(); 
		this.resetscroll();
	}
	
	this.appendRow = function(row,startnum){
		if(this.columnConfig.length>0){
			this.isredraw = true;
			if(this.data == null || this.data.length==0){
				this.data = new Array();
				this.data[this.data.length] = row;
				this.show();
			}else{
				this.data[this.data.length] = row;
				if(startnum!=null) 
					this.draw(startnum); //mod by liuch 100426
			    else 
			        this.draw(); 
				this.resetscroll();
			}
			// 新增行如果是有合计重算
			if(this.isCreateAmtColumn) {
				var _allTotal = this.allpage_totaljson;
				if (_allTotal != null) {
					for (var pro in _allTotal) {
						var _tempAmt = row[pro];
						if (_tempAmt != null)
						_allTotal[pro] = parseFloat(_allTotal[pro]) + parseFloat(_tempAmt);
					}
				}
				this.sumMainAmtToColumn(this.totalColumn);
			}
		}
	}
	
	this.isEditCol = function(col){
	   var colid = this.columnConfig[col].id;
	   if(colid.indexOf(".input")!=-1 || colid.indexOf(".file")!=-1)
	       return true;
	   return false;    
	}
	
	this.selectedallrows = function(selected){
		// 选中所有行
		for(var i=0,li=this.data.length;i<li;i++){
			this.data[i].checked = selected;
		}
	
		this.selectedall = selected;
		//20091011  选中全部外部事件接口
		if(this.onclickselectedall){
			onclickselectedall() ;			
		}
		JQ("table tbody tr:first-child th input:checkbox",JQ(this.parent)).attr("checked",selected);
		var checkboxs = JQ("input[name='dtbox']",JQ(this.parent));
		var trobjs = null;
		if(checkboxs.length>0){
			checkboxs.attr("checked", selected);
			trobjs = checkboxs.parent().parent();
		}else{
			checkboxs = JQ("table tbody tr td input:checkbox",JQ(this.parent));
			checkboxs.attr("checked", selected);
			trobjs = checkboxs.parent().parent();
		}
		if(!selected){
			for(var i=0,l=trobjs.length;i<l;i++){
					trobjs[i].className='main_table_title_letter';
			}
			//trobjs.unbind("onmouseover").bind("onmouseover",function(){trobj.runtimeStyle.backgroundColor='#e8f4ff';});
			//trobjs.unbind("onmouseout").bind("onmouseout",function(){trobj.runtimeStyle.backgroundColor='';});
		}else{
			for(var i=0,l=trobjs.length;i<l;i++){
					trobjs[i].className='main_table_title_letter_selected';
			}
			//trobjs.unbind("onmouseover").bind("onmouseover",function(){trobj.runtimeStyle.backgroundColor='';});
			//trobjs.unbind("onmouseout").bind("onmouseout",function(){trobj.runtimeStyle.backgroundColor='';});
			//trobjs.css("backgroundColor","");
		}
		var datatable = this;
		window.setTimeout(function(){
			if(datatable.isCreateAmtColumn)datatable.sumMainAmtToColumn(datatable.totalColumn);	
		},1);
	}
	
	this.selectedrow = function(row,selected){
		// 选中所有行
		for(var i=0;i<this.data.length;i++){
			this.data[i].checked = false;
			if(this.data[i].checkobj != undefined){
				this.data[i].checkobj.checked = false;
			}
		}
		
		row.checked = selected;
		if(row.checkobj != undefined){
			row.checkobj.checked = selected;
		}
		this.selectedall = false;

	}
	this.getMainTable = function(){
		return this.contentdiv.getElementsByTagName("TABLE").item(0);
	}
	this.getHeadbody = function(){
		return this.contentdiv.getElementsByTagName("TBODY").item(0);
	}
	this.getHeadbodyfixed = function(){
		return this.contentdivfixed.getElementsByTagName("TBODY").item(0);
	}
	this.getTablebody = function(){
		return this.contentdiv.getElementsByTagName("TBODY").item(1);
	}
	this.getTablebodyfixed = function(){
		return this.contentdivfixed.getElementsByTagName("TBODY").item(1);
	}
	//从Cookie中读取排序信息对象
	this.getFromCookie = function(){
		//var defaultSort = getCookie('howToSort');
		var defaultSort = getUserDataByElementId(this.id, this.tabletype+"_sort");
	    var reList = [];
	    if (typeof(defaultSort)!= "undefined" && defaultSort!=null && defaultSort != "") {
	        var params = eval("(" + defaultSort + ")");
	        var currentLN = location.href.split('?')[0];
	        if(typeof(linkName)!= "undefined"){
	        	currentLN = linkName;
	        }
	        if (params.linkname == currentLN) {
	            if (params.sort.length > 0) {
	                for (var i = 0; i < params.sort.length; i++) {
	                    if (params.sort[i].id == this.id) {
	                        try {
	                        	this.currentSortCol=params.sort[i].idx;	//当前排序列
	                            if(params.sort[i].order!='asc'){  //存储的
	                            	this.orderMap[params.sort[i].idx]='asc'; 
	             		       }
	                        } catch(e) {}
	                    }
	                }
	            }
	        }
	    }
	}
	//从URL中读取排序信息对象
	this.getFromURL = function(){
		var sortInfo = getparam('howToSort');
		 if(sortInfo==null){
			 this.getFromCookie();
			 return;
		 }
		 var defaultSort;
			 defaultSort = decodeURIComponent(sortInfo);
		this.sortObjFromCookie=defaultSort;
	    var params ={};
	    if (typeof(this.defaultSortObj) != "undefined"&&typeof(this.defaultSortObj.id) != "undefined") {
	    	params = this.defaultSortObj;
	    }else if(defaultSort!=""){
	    	params = eval("(" + defaultSort + ")");
	    }
        if (typeof(params.id)!="undefined") {
            if (params.id == this.id) {
                try {
                	this.currentSortCol=params.idx;	//当前排序列
                    if(params.order=='asc'){  //拍序列存储的顺序 反序
                    	this.orderMap[params.idx]='asc'; 
     		       }
                } catch(e) {}
            }
        }
	}
	// 设置表头
	this.setTableHead = function(heads,useColumWidth){
		var start = (new Date()).getTime();
		var oheads ;
		this.getFromURL();
	    if(typeof(heads)=="string"){//字符串表头
		    if(heads==""){
		    	heads = new Array();
		    } else{
		    	heads = heads.split(",");
		    }
		}
	    oheads = heads;
		if(this.tableInitHead.length == 0) this.tableInitHead = heads;
	    if(!this.useThisHead){
 		    var _newHead = getUserData(this.parent,this.tabletype+"_newHead");
  		   if(_newHead!=null&&!this.hasCorrectHeadUserData){
  		        //应该加一个比较
 		    	var arr_headstr = _newHead.split(",");
 		    	var gap_len = 0; //本地存储不记录序列号，单复选框，需要去掉
 		    	if(this.isShowSerial)gap_len++;
 		    	if(this.isShowCheckBox)gap_len++;
 		    	if(this.isShowRadio)gap_len++;
 		        if(typeof(oheads)!="undefined"&&(arr_headstr.length!=(oheads.length-gap_len))){
 		        	removeUserData(this.id,this.tabletype+"_newHead");
 		        	removeUserData(this.id,this.tabletype);
 		        }
 		       this.hasCorrectHeadUserData = true;
  		   }
		    var headstr= getUserData(this.parent,this.tabletype);
 		    if(headstr!=null){
			        if(this.isShowCheckBox)  {
			    	       headstr = "checkbox,"+headstr;
			    	}
			    	if(this.isShowRadio)  
			    	       headstr = "radio,"+headstr; 
			    	if(this.isShowSerial)
			    	      headstr = "serial,"+headstr;      
			        var localheads = headstr.split(",");
	                heads = localheads;// updateOrderArray(localheads,heads);
		    }
	    }
		this.getTableHead = heads;
		this.resetColumnConfig();

		this.columnConfig.clear();
		var _heads = ["<table><tbody>"];
		// 产生表头代码
		if(this.useThisHead)
		{
			_heads.push(this.useThisHead); 
			//this.headHTML = this.useThisHead;
			for(var i=0;i<heads.length;i++){
				var head = heads[i];
				if(typeof(head) == "string"){
					var config = this.ColumnConfig[head.toLowerCase()];
					if(config == null){
						config = this.ColumnConfig["noFind".toLowerCase()];
					}
					// 已经定义好的通用类型
					this.columnConfig[this.columnConfig.length] = config;
				}
				else{
					// 自定义类型
					this.columnConfig[this.columnConfig.length] = head;
				}
			}
		}else{
			var tbid = "'"+this.id+"_table'";
			_heads.push('<tr onselectstart="return false;" height="'); 
			_heads.push(this.headHeight); 
			_heads.push('px" id="'); 
			_heads.push(this.id); 
			_heads.push('_headeventhandler"');
			if(!this.showHeadContextmenu){
				_heads.push(' title="单击标题栏可以实现列表排序"')
			}
			_heads.push(' class="main_table_title">'); 
			//this.headHTML = '<tr onselectstart="return false;" height="'+this.headHeight+'px" id="'+this.id+'_headeventhandler" title="单击标题栏可以实现列表排序" class="main_table_title">';
			for(var i=0;i<heads.length;i++){
				var head = heads[i];
				var sorttype ="STRING";
				var sortname = head ;
				if(sortname == 'checkbox')sortname = 'checked';
				if(sortname.indexOf(".")!=-1) {
					sortname=sortname.substring(0, sortname.indexOf("."))	;//支持*.input
				}
				if(typeof(head) == "string"){
					var config = this.ColumnConfig[head.toLowerCase()];
					if(config == null){
						config = this.ColumnConfig["noFind".toLowerCase()];
					}
					if(config.type=="M"||config.type=="I"){
						sorttype = "NUMBER";
					}
					if(config.type =="S"){
						sorttype = "STRING";
					}
					if(config.type=="D"){
						sorttype = "DATE";
					}
					if(config.type=="C"){  //新增code-name，按照code排序 by jiazhiyu
						sorttype = "CODE";
					}
					if(config.sortname!=null) sortname =  config.sortname;
					if(config.sorttype!=null){
						if(config.sorttype=="M"||config.sorttype=="I"){
							sorttype = "NUMBER";
						}
						if(config.sorttype =="S"){
							sorttype = "STRING";
						}
						if(config.sorttype=="D"){
							sorttype = "DATE";
						}
						if(config.sorttype=="C"){
							sorttype = "CODE";
						}
					}
				}
                var floatblank='&nbsp;&nbsp;&nbsp;';
                if (head == "serial"||head == "checkbox" || head == "radio") {
 						floatblank = "";
				}			   
				var wid = "";
				if(head=="serial"){
				//	wid = "width:60px;"; 
				}else if(head=="radio"){
				//	wid = "width:35px;";
				}else if(head=="checkbox"){
					//wid = "width:60px;";
				}
			    var style = "text-align: center";
				_heads.push("<th style=\"");
				_heads.push(wid); 					
				_heads.push(style); 
				_heads.push("\" nowrap=\"true\""); 
				_heads.push(" sortname=\""); 
				_heads.push(sortname); 
				_heads.push("\" sorttype=\""); 
				_heads.push(sorttype); 
				_heads.push("\"  id=\""); 
				_heads.push(this.id); 
				_heads.push("_");
				_heads.push(head);
				_heads.push("\">");

				//this.headHTML += "<th style=\""+wid+"\" nowrap=\"nowrap\" "+thclass+" sortname=\""+sortname+"\" sorttype=\""+sorttype+"\"  id=\""+this.id+"_"+head+"\">";
				if(typeof(head) == "string"){
					var config = this.ColumnConfig[head.toLowerCase()];
					if(config == null){
						config = this.ColumnConfig["noFind".toLowerCase()];
					}
					// 已经定义好的通用类型
					this.columnConfig[this.columnConfig.length] = config;
					//全选状态 lp
					if(config.type=="checkbox" ){
						if (typeof config.title == "undefined" || config.title =="") {
							_heads.push('&nbsp;<input id="');
							_heads.push(this.id);
							_heads.push('_allbox" name="allbox" type="checkbox" align ="center" onclick="'); 
							_heads.push('this.parentElement.parentElement.parentElement.parentElement.datatable.selectedallrows(this.checked)" ');
							if(this.selectedall)_heads.push(" checked ");
							_heads.push('/>&nbsp;');
						} else {
							_heads.push(config.title);
						}
						//this.headHTML += '<input id="'+this.id+'_allbox" name="allbox" type="checkbox" onclick="this.parentElement.parentElement.parentElement.parentElement.datatable.selectedallrows(this.checked)" CHECKED/>'
					}
					else{
						_heads.push( typeof config.title=="function"?config.title(this):config.title);
						//this.headHTML += typeof config.title=="function"?config.title(this):config.title;
					}
				}
				else{
					// 自定义类型
					this.columnConfig[this.columnConfig.length] = head;
					//this.headHTML += head.title;
				}
				//必填标识*,满足是编辑而且必填标识为1
				if(config.id.indexOf(".")>-1 && config.requirement=='1'){
					_heads.push('<span style="color:red;">*</span>');
					//this.headHTML += '<span style="color:red;">*</span>';
				}
				if((this.currentSortCol==0 || this.currentSortCol) && this.currentSortCol==i&& head!="serial"){
				  var img = "desc.gif";
		   	      if(this.orderMap[i]=='asc')img = "asc.gif";
				  _heads.push("<a name=\"sortcol_img\"><img src=\"");
				  _heads.push(ROOT_PATH);
				  _heads.push("/images/actions/");
				  _heads.push(img);
				  _heads.push("\" width=\"20px\" height=\"20px\" border=\"0\" align=\"absmiddle\" /></a>");
				  //_heads.push(floatblank);
				  _heads.push("</th>");
		   	      //this.headHTML += "<a name=\"sortcol_img\"><img src=\""+ ROOT_PATH + "/images/actions/"+img+"\" width=\"22px\" height=\"22px\" border=\"0\" align=\"absmiddle\" /></a></th>";
			   	}else{
					if(head != "serial"){
						_heads.push("<a name=\"sortcol_img\" ></a>");
						//_heads.push(floatblank);
					}
					_heads.push("</th>");
					//this.headHTML += "<a name=\"sortcol_img\"></a></th>";
			   	}
			}
			_heads.push('</tr>');
			//this.headHTML += '</tr>';
		}
		//产生金额合计列
		this.appendAmtColumn(heads,_heads);
		var tablediv = document.createElement("div");
		_heads.push("</tbody></table>");

		tablediv.innerHTML = _heads.join("");//"<table><tbody>"+this.headHTML+"</tbody></table>";
		//alert(tablediv.innerHTML);
		this.headtrobj = tablediv.getElementsByTagName("table")[0].childNodes[0];
		this.headHTML = this.headtrobj.innerHTML;
		tablediv = null;
		//alert(((new Date()).getTime()-start)+"(ms)");
	}
	//wy 设置表头高度
	this.setHeadHeight = function (headHeight){
		this.headHeight = headHeight;
	}

	//wy 设置表体表格行高度
	this.setTRHeight = function (trHeight){  
	    this.trHeight = trHeight;
		this.TABLE_TR_H = this.trHeight/22*this.TABLE_TR_H;
	}
	this.getColumnConfig = function(colid){
		return columnConfig[colid];
	}
	this.appendColumnConfig = function(col){
		if(col.id != null){
			columnConfig[col.id] = col;
		}
	}
	this.unZiplabel = function(){
		if(typeof(labelmap)!="undefined"){
			this.labelmap = labelmap;
		}
		for(var i=0;this.data!=null&&i<this.data.length;i++){
			var row = this.data[i];
			if(row.checked=="true")row.checked = true;
			if(typeof(row.isunziplabel)=="undefined"&&this.labelmap!=null){
				var newrow = row;
				for(var key in this.labelmap){
					var label = this.labelmap[key];
					var value = row[label];
					if(typeof(value)!="undefined"){
						newrow[key] = value;
					}else{
						newrow[key] = row[key];
					}
					delete(row[label]); 
				}
				newrow.isunziplabel = false;
				this.data[i]= newrow;
			}
		}
	}
	this.setMaxLine = function(){
		if(this.parent.parentElement.offsetHeight > 0){
			 this.maxline = Math.ceil((this.parent.parentElement.offsetHeight - 86) / 23) + 1;
			 //JQ(".bottomdiv").html(JQ(".bottomdiv").html()+","+this.maxline); 
		}
	}
	this.layoutRegiter = function(){
		//if(true)return ;
		if(this.parent.parentElement.offsetHeight > 0){
			DATATABLES[DATATABLES.length] ={"id":this.id,"height":this.parent.parentElement.offsetHeight};
			//this.parent.style.height = this.parent.parentElement.offsetHeight-23; //减去分页行 22。
			//alert(this.parent.style.height);
			var datatable = this;
			JQ(document).ready(
				function (){
					datatable.zoomTableHeight();
				}
			);
			//window.setTimeout(function(){
			//	datatable.zoomTableHeight();	
			//},50);
		}
	}
	this.zoomTableHeight = function(){

		if((this.mainmenu+"") == "45100000") return;
		if(BOTTOM_SPACE == 0){
			var bottomdiv = JQ("#context");
			var maindiv = JQ("#main");
			if(bottomdiv.length > 0 && maindiv.length > 0){
				BOTTOM_SPACE = maindiv.height() - (bottomdiv.height()+40);
			}
		}
		if(BOTTOM_SPACE > 50 && this.parent.parentElement.offsetHeight>0){
			var totalHeight = 0;
			var theHeight = 0;
			for (var i = 0; i < DATATABLES.length; i++){
				totalHeight += DATATABLES[i].height;
				if(this.id ==  DATATABLES[i].id){
					theHeight = DATATABLES[i].height;
				}
			}
			if(totalHeight > 0){
				var zoomHeight = theHeight + (theHeight/totalHeight) * BOTTOM_SPACE;
				zoomHeight = Math.floor((zoomHeight - 86)/23)*23 + 86;
				var maxLineHeight = this.page_pageSize * 23 + 86;
				if(zoomHeight > maxLineHeight) zoomHeight = maxLineHeight;
				this.parent.parentElement.style.height = zoomHeight;
				//this.isredraw = true;
				//this.show();
			}
		}
	}
	this.bindRowSplitter = function() {

		JQ("body").bind("mouseup", function(event) {
			if ((typeof bTableStart) != "undefined" && bTableStart == true) {
				Src_splitter.style.display = "none";
			    var thisparent = Src_table.parent.parentElement;
				var oldbottom = Src_table.parent.getBoundingClientRect().bottom;
				var varh = thisparent.offsetHeight + event.clientY - oldbottom;
				//alert(document.documentElement.clientWidth +"<"+ (document.documentElement.offsetWidth-4));
				//alert(document.body.offsetHeight+"<"+(document.body.scrollHeight + event.clientY - oldbottom));
				//if(document.body.offsetHeight<document.body.scrollHeight + event.clientY - oldbottom){
				//}
				if (Math.abs(event.clientY - oldbottom) > 5) {
					if (varh < 100)
						varh = 100;
					thisparent.style.height = varh + 'px';
					Src_table.parent.style.height = (varh - 23) + 'px'
					setUserDataByElementId(Src_table.id, Src_table.tabletype+"_Height", varh);
					Src_table.show("drag");
				}

				if (Src_splitter.releaseCapture)
					Src_splitter.releaseCapture();
				bTableStart = false;
				Src_splitter = null;
				Src_table = null;
			}
		}).bind("mousemove", function(event) {
			if ((typeof bTableStart) != "undefined" && bTableStart == true
					&& (typeof Src_splitter) != "undefined"
					&& Src_splitter != null) {
				Src_splitter.style.top = event.clientY + iRowPadding;
			}
		});

	}
	this.updateColSelctListData=function(d,o,hoverbkg,hoverbkgborder)
	{
		var checklist=JQ(".ui-multiselect-list-left",o);
		checklist.empty();
		var widthlist=JQ(".ui-multiselect-list-right",o);
		widthlist.empty();
		for(ii=0,iL=d.length;ii<iL;ii++)
		{
			var s = (ii + 1) + "", n = 2;
			if (s.length >= n) {
				s = s;
			} else {
				s = new Array(n - s.length + 1).join(" ") + s;
			}
			s=s.replace(/\s/g,'&nbsp;');		
			var config = d[ii];
			var chkbox='<span class="serial">'+s+'</span><input type="checkbox" ';
			var checked = config["checkbox"]?"CHECKED":"";
			
			chkbox+=' id= "ui-multiselect-check-'+config["id"]+'" title="请选择要显示的字段、拖动可进行排序" value="'+config["id"]+'" '+checked+' ><span>'+config["title"]+'</span>';
			var offsetwidth = ""+config["offsetWidth"];
			var widthstr = '<input type="text" name="'+config["id"]+'" value="'+(config["selfWidth"]?config["selfWidth"]:"auto")+'" size="3">';  
			if (offsetwidth != "undefined") {
				offsetwidth = new Array(3 - offsetwidth.length + 1).join(" ") + offsetwidth;
				offsetwidth=offsetwidth.replace(/\s/g,'&nbsp;');
				widthstr = offsetwidth+widthstr;
			} else {
				widthstr = "&nbsp;&nbsp;&nbsp;"+widthstr;
			}
			JQ('<li></li>').append(chkbox).attr("curid",ii).attr("title","请选择要显示的字段、拖动可进行排序").appendTo(checklist);
			JQ('<li></li>').append(widthstr).attr("title","请输入字段显示宽度").appendTo(widthlist);
		}
		
		var jqsel=JQ("Li",checklist);
		checklist.dragsort({dragEnd: function(){
				var dragitemid = JQ("input[type='checkbox']",this).val();
				var widthlist = JQ(".ui-multiselect-list-right",this.parent().parent());

				var draggedItem = JQ("input[name='"+dragitemid+"']",widthlist).parent();
				var destItemId = null;
				var sortlist =   JQ("input[type='checkbox']",this.parent());
				for(var j=0;j<sortlist.length;j++){
					var chbox = sortlist[j];
						if(chbox.value == dragitemid) break;
						destItemId = chbox.value;
				}
				var destItem ;
				if(destItemId == null){
					destItem = widthlist.children(":first");
					destItem.before(draggedItem);
				}else{
					destItem = JQ("input[name='"+destItemId+"']",widthlist).parent();
					destItem.after(draggedItem);
				}
				JQ(".serial",this.parent()).each(
					function(j){
						var s = (j + 1) + "", n = 2;
						if (s.length >= n) {
							s = s;
						} else {
							s = new Array(n - s.length + 1).join(" ") + s;
						}
						s=s.replace(/\s/g,'&nbsp;');	
						this.innerHTML = s;
					}
				);

			}
		});
		jqsel.unbind( "hover" );
		jqsel.hover(function() {
			JQ(this).css({ "background": ""+hoverbkg,//#e3edfd",
              "border":" 1px solid "+hoverbkgborder,//#8ba3da",
              color: "#C77405",
			  "font-weight": "bold"
				});
				
		}, function() {JQ(this).css({ "background": "",
              "border":"1px",
              color: "",
             "font-weight": ""
				});
		});
		//jqsel=JQ("Li",checklist);
		jqsel.unbind( "click" );
		jqsel.click(function() {
			var data=this.parentElement.parentElement.parentElement.data;
			var curid=JQ(this).attr("curid");
			data[curid]["checkbox"]=!data[curid]["checkbox"];
			JQ("input",this).attr("checked",data[curid]["checkbox"]);
		
		});
		JQ("input[type='text']",widthlist).unbind("blur")
		.bind("blur",function(event){
				if((""+this.value)!="auto"){
					if(!(""+this.value).isNumber() || parseInt(this.value)>=1000 || parseFloat(this.value)<1){
						var oSel=this.parentElement.parentElement.parentElement.parentElement;
						oSel.bclose = false;
						alert("请输入有效宽度(大于0且小于1000)或自适应(auto)");
						this.value='auto';
					}
				}
			}
		);


		jqsel=JQ(".ui-multiselect-all",o);
		jqsel.unbind( "click" );
		jqsel.click(function(){
			var oSel=this.parentElement.parentElement.parentElement.parentElement
		     var data=oSel.data;
			for(ii=0,iL=data.length;ii<iL;ii++)
			{
			     data[ii]["checkbox"]=true;
			}
			JQ("input[type='checkbox']",oSel).attr("checked",true);
		
		});
		jqsel=JQ(".ui-multiselect-none",o);
		jqsel.unbind( "click" );
		jqsel.click(function(){
			var oSel=this.parentElement.parentElement.parentElement.parentElement
		     var data=oSel.data;
			for(ii=0,iL=data.length;ii<iL;ii++)
			{
			     data[ii]["checkbox"]=false;
			}
			JQ("input[type='checkbox']",JQ(oSel)).attr("checked",false);
		
		});	
		jqsel=JQ(".ui-multiselect-save",o);
		jqsel.unbind( "click" );
		jqsel.click(function(){ //下拉div中保存拖动排序
			var oSel=this.parentElement.parentElement.parentElement.parentElement
		     var data=oSel.data;
		     var headstr="";
		     var ah=new Array();
			for(ii=0,iL=data.length;ii<iL;ii++)
			{
				var headconfig = data[ii];
			     if(headconfig["checkbox"])
			     {
			         ah.push(headconfig["id"]);
			     };
			}
			if(ah.length==0)
			{
				alert("至少要选择保留一个字段为显示状态");
			}
			else
			{
				var dt=oSel.parentElement.parentElement.parentElement.parentElement.parentElement.dataTable;
				headstr=ah.join(",");
				setUserDataByElementId(dt.id, dt.tabletype, headstr);

				var colswidthobj  = {};
				JQ("input[type='text']",JQ(oSel)).each(
					function(){
						if("auto" != this.value)
							colswidthobj[this.name] = this.value;
					}
				);
				setUserDataByElementId(dt.id, dt.tabletype+"colswidth", Object.toJSON(colswidthobj));
 				JQ(oSel).hide();
 				dt.setTableHead(dt.tableInitHead,true);
 				dt.mustbedraw=true;
				var headstring = [];
				var _newHead = [];
				JQ("input[type='checkbox']",JQ(oSel)).each(
					function(){
						_newHead.push(this.value);
						if(this.checked){
							headstring.push(this.value);
						}
					}
				);
				setUserDataByElementId(dt.id, dt.tabletype+"_newHead",_newHead.join(","));//存储排序后所有有效字段.
				setUserDataByElementId(dt.id, dt.tabletype,headstring.join(","));
				dt.setTableHead();
				dt.show();
			}
		
		});
		jqsel=JQ(".ui-multiselect-close",o);
		jqsel.unbind( "click" );
		jqsel.click(function(){
			var oSel=this.parentElement.parentElement.parentElement.parentElement
		     
				var dt=oSel.parentElement.parentElement.parentElement.parentElement.parentElement.dataTable;
				//var headstr = getUserData(dt.id, dt.tabletype);
			    removeUserData(dt.id, dt.tabletype);
				removeUserData(dt.id, dt.tabletype+"colswidth");
				removeUserData(dt.id, dt.tabletype+"_newHead");
				removeUserData(dt.id, dt.tabletype+"_sort");
				JQ(oSel).hide();
		        //if(headstr)
		        	//{
		        dt.setTableHead(dt.tableInitHead,true);
 				dt.mustbedraw=true;
				dt.show();
				//}
		
		});
		
		
		
 	}
	this.updateRowSelctListData=function(d,o,hoverbkg,hoverbkgborder)
	{
		var mainW=JQ("#"+this.id+'_div');
		mainW.addClass('loading-indicator');
		var checklist=JQ(".ui-multiselect-list",o);
		checklist.empty();
		for(ii=0,iL=d.length;ii<iL;ii++)
		{
			var s = (ii + 1) + "", n = 3;
			if (s.length >= n) {
				s = s;
			} else {
				s = new Array(n - s.length + 1).join(" ") + s;
			}
			s=s.replace(/\s/g,'&nbsp');		
			var config = d[ii];
			var chkbox='<span>'+s+'</span><input type="checkbox" ';
			if(config["checkbox"])
			{
			    chkbox+=' id= "ui-multiselect-check-'+config["id"]+'" title="通过字段内容选择要过滤的行" value="'+config["id"]+'" CHECKED ><span>'+config["title"]+'</span>';
			}
			else
			{
			   chkbox+=' id= "ui-multiselect-check-'+config["id"]+'" title="通过字段内容选择要过滤的行" value="'+config["id"]+'" ><span>'+config["title"]+'</span>';
			}
			JQ('<li></li>').append(chkbox).attr("curid",ii).attr("title","通过字段内容选择要过滤的行").appendTo(checklist);
		}
		o[0].radio_curid="1";
		var jqsel=JQ("Li",checklist);
		jqsel.unbind("hover")
		jqsel.hover(function() {
			JQ(this).css({ "background": ""+hoverbkg,//#e3edfd",
              "border":" 1px solid "+hoverbkgborder,//#8ba3da",
              color: "#C77405",
             "font-weight": "bold"
				});
				
		}, function() {
			var chk=JQ("input",this).attr("checked");
		     if(typeof chk!="undefined" && chk)
		             return;
		     JQ(this).css({ "background": "",
              "border":"",
              color: "",
             "font-weight": ""
				});
		});
		jqsel=JQ("Li",checklist);
		jqsel.unbind( "click" );
		jqsel.click(function() {
			var data=this.parentElement.parentElement.data;
			var curid=JQ(this).attr("curid");
			data[curid]["checkbox"]=!data[curid]["checkbox"];
			JQ("input",this).attr("checked",data[curid]["checkbox"])
			var oSel=this.parentElement.parentElement;
			var dt=oSel.parentElement.parentElement.parentElement.parentElement.parentElement.dataTable;
			dt.CurRowSelCounter(oSel);
			
		
		});
		jqsel=JQ(".ui-multiselect-all",o);
		jqsel.unbind( "click" );
		jqsel.click(function(){
			var oSel=this.parentElement.parentElement.parentElement.parentElement
		     var data=oSel.data;
			for(ii=0,iL=data.length;ii<iL;ii++)
			{
			     data[ii]["checkbox"]=true;
			}
			JQ("input[type='checkbox']",oSel).attr("checked",true);
			
			var dt=oSel.parentElement.parentElement.parentElement.parentElement.parentElement.dataTable;
			dt.CurRowSelCounter(oSel,true);
			
		
		});
		jqsel=JQ(".ui-multiselect-none",o);
		jqsel.unbind( "click" );
		jqsel.click(function(){
			var oSel=this.parentElement.parentElement.parentElement.parentElement
		     var data=oSel.data;
			for(ii=0,iL=data.length;ii<iL;ii++)
			{
			     data[ii]["checkbox"]=false;
			}
			JQ("input[type='checkbox']",JQ(oSel)).attr("checked",false);
			var dt=oSel.parentElement.parentElement.parentElement.parentElement.parentElement.dataTable;
			dt.CurRowSelCounter(oSel);
		
		});		
		jqsel=JQ(".ui-multiselect-ok",o);
		jqsel.unbind( "click" );
		jqsel.click(function(){
			 var oSel=this.parentElement.parentElement.parentElement.parentElement
            var dt=oSel.parentElement.parentElement.parentElement.parentElement.parentElement.dataTable;
            var mlist=JQ(".ui-multiselect-list",oSel);
            var clist=JQ('input',mlist);
            var chk=JQ('input[checked]',mlist);
            if(clist.length==chk.length||chk.length==0)
            {
                if(clist.length==chk.length){
                	dt.CurRowSelCounterOK(oSel,true);
                }
                else
                {
                	dt.CurRowSelCounterOK(oSel,false);
                }
              }
            else
            {
	   		    dt.CurRowSelCounterOK(oSel);
            }
	   		JQ(oSel).hide();
		
		});
		jqsel=JQ(".ui-widget-header2 .ui-multiselect-radio",o);
		jqsel.unbind( "click" );
		jqsel.click(function(){
			JQ("input",this).attr("checked",true);
			var curid=JQ(this).attr("id");
			curid=curid.substr(curid.length-1,1);
			var oSel=this.parentElement.parentElement.parentElement.parentElement;
			oSel.radio_curid=curid;
			
		});
		  
		 if ( mainW.hasClass("loading-indicator") )
		   mainW.removeClass('loading-indicator');
 	}
 	this.CurRowSelCounterOK = function(o,selAll){
    	var ddata=this.data;
    	var sdata=o.data;
    	var Field=o.colid;
    	var option=o.radio_curid;
    	if(ddata.length<1)return;
    	var thisoksel=[];
    	if(typeof selAll=="undefined")
    	{
          for ( var i = 0, length = sdata.length; i < length; i++ ) {
     	        if(sdata[i]["checkbox"])
     	        {
     	        for ( var ii = 0, length2 = ddata.length; ii < length2; ii++ ) {
     	      //(typeof R_b_debug == "undefined")||(!R_b_debug)||RConsole.log('River 2 CurRowSelCounterOK ii:'+ii+'checked'+ddata[ii].checked);
     	        	if(option=="2" && (!ddata[ii].checked||thisoksel[('bSel'+ii)]))continue;
     	        	if(option=="3" && ddata[ii].checked)continue;
     	        	if(option=="1" && thisoksel[('bSel'+ii)])continue;
                    var id = JQ.md5(ddata[ii][Field]);    
                    
                   if(id==sdata[i]["id"])
                   	{
                      ddata[ii].checked=true; 
                      thisoksel[('bSel'+ii)]=true;
                  
                   }else
                   //if(option=="1" && !thisoksel[ddata[ii].rownum])
                   {
                   	ddata[ii].checked=false; 
                   }
                   
  				   }    
     	        }
             }
    	}
    	else
    	{
    		    for ( var ii = 0, length2 = ddata.length; ii < length2; ii++ ) {	
                     if(option=="2" && !ddata[ii].checked)continue;
     	        	if(option=="3" && ddata[ii].checked)continue;
                    	 ddata[ii].checked=selAll; 
    				}
    	}
    	var tbodyobj = this.getTablebody();
    	if(tbodyobj.childNodes.length<1)return;
    	//var strartTR=parseInt(tbodyobj.childNodes[0].childNodes[0].innerHTML)-1;
    	//var rehead = this.getTableThs();
    	this.show();
		var datatable = this;
		window.setTimeout(function(){
			if(datatable.isCreateAmtColumn)datatable.sumMainAmtToColumn(datatable.totalColumn);	
		},1);
		thisoksel=undefined;
     }
    this.CurRowSelCounter = function(o,selAll){
    	var ddata=this.data;
    	var sdata=o.data;
    	var Field=o.colid;
    	var sorttype=o.sorttype;
    	var amtlist=new Array();
    	
    	var AmtL=this.columnList;
    	var colList=this.getTableHead;
    	var lsumtotalRowcount=0;
    	var lsumtotalamt=new Array();
    	var thisoksel=[];
    	
    	for(var j=0,lj=AmtL.length;j<lj;j++)
    	{
    		if(-1 != colList.indexOf(AmtL[j])  )
    		{
    		  amtlist.push(AmtL[j]);
    		}
    	}
    	for(var j=0,lj=amtlist.length;j<lj;j++)
    	{
    		lsumtotalamt[amtlist[j]]=0;
    	}
    	if(typeof selAll=="undefined" || !selAll)
    	{
          for ( var i = 0, length = sdata.length; i < length; i++ ) {
     	        if(sdata[i]["checkbox"])
     	        {
     	        for ( var ii = 0, length2 = ddata.length; ii < length2; ii++ ) {	
                 var id = JQ.md5(ddata[ii][Field]);       
                   if(id==sdata[i]["id"] &&  !thisoksel[('bSel'+ii)]){
                   	  thisoksel[('bSel'+ii)]=true;
                   	  lsumtotalRowcount+=1;
                   	   for ( var iii = 0, length3 = amtlist.length; iii < length3; iii++ ) {
                   	   	lsumtotalamt[amtlist[iii]]+=parseFloat(ddata[ii][amtlist[iii]]);
                   	   	
                   	   }
                   }
  				}    
     	        }
             }
    	}
    	else
    	{
    		    for ( var ii = 0, length2 = ddata.length; ii < length2; ii++ ) {	
                
                   	  lsumtotalRowcount+=1;
                   	   for ( var iii = 0, length3 = amtlist.length; iii < length3; iii++ ) {
                   	   	lsumtotalamt[amtlist[iii]]+=parseFloat(ddata[ii][amtlist[iii]]);
                   	   	
                   	   }
                   
  				}
    	}
       
       var ullist=JQ(".header-count",o);
       ullist.empty();
       var cc='<li><span class="header-count-tip">选中行数:</span></li>' 
                + '<li><span class="header-count-input" id="header-count-rows">'+lsumtotalRowcount+'</span></li>' 
                + '<li><span class="header-count-tip">选中小计:</span></li>';
        for(var j=0,lj=amtlist.length;j<lj;j++)
    	{
    		
    		cc+= '<li><span class="header-count-tip">'+this.ColumnConfig[amtlist[j].toLowerCase()].title+':</span></li>'
    		cc+= '<li><span class="header-count-input2" id="header-count-amt">'+(lsumtotalamt[amtlist[j]]+"").toMoneyFormat()+'</span></li>';
    		
    	}        
         JQ(cc).appendTo(ullist);      
                
       
    }
	this.CreateColumnButton= function(parentDiv)
	{  
		if(parentDiv.floatColDiv)
		  return;
		var colbtn0 = JQ('<div class="ncolBtn0" ></div>');
		colbtn0.css({
					height : "14px",
					width : "20px",
					position : "absolute",
					"z-index" : "99999",
					display : "none",
					overflow:"hidden"
								});
		colbtn0.css("left", "300");
		colbtn0.css("top", "5");
		JQ(parentDiv).append(colbtn0);
		if (!this.isShowRadio) {
			var colbtn1 = JQ('<div class="ncolBtn00" ></div>');
			colbtn1.css({
						height : "16px",
						width : "1px",
						position : "absolute",
						display : "block",
						"background-image" : "url('/images/actions/btn-arrow.gif')"  //ui-icons_2e83ff_256x240.png
	 
					});
			 colbtn1.css("left", "0");
			 colbtn1.css("top", "0");
			JQ(colbtn0).append(colbtn1);
					colbtn1 = JQ('<div class="ncolBtn01" title="数据行选择过滤"></div>');
			colbtn1.css({
						height : "16px",
						width : "10px",
						position : "absolute",
						"z-index" : "99999",
						//display : "block",
						"background-image" : "url('/images/datatable/ui-icons_ef8c08_256x240.png')",
						"background-position-x":"-68px",
						"background-position-y":"0px",
						"background-repeat":"no-repeat",
						"float":"left"
					});
			colbtn1.css("left", "1");
			colbtn1.css("top", "0");
			JQ(colbtn0).append(colbtn1);
			colbtn1.mousedown(function(){
			  var pos=JQ(this).position();
			    JQ(this).css({
	                          top : pos.top+2
	 			});
			});
			colbtn1.mouseup(function(){
			  var pos=JQ(this).position();
			  		    JQ(this).css({
	                          top : pos.top-2
	 			});
	
			});
			
			parentDiv.floatRowSelectbtn=colbtn1;
			colbtn1.click(function() {
						var pos = JQ(this.parentElement).position();
						var dt = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.dataTable;
						var colid=this.parentElement.colid
						var sorttype = this.parentElement.sorttype;
						var t1=(new Date()).getTime();
						var rowseldata = dt.prepareRowSelectData(colid,sorttype);
						 //(typeof R_b_debug == "undefined")||(!R_b_debug)||RConsole.log('River 2 prepareRowSelectData: 1:'+((new Date()).getTime() - t1));
						var floatdiv = dt.contentdiv.floatRowSelectDiv;
						 floatdiv[0].data=rowseldata;
						 floatdiv[0].colid=colid;
						 floatdiv[0].sorttype=sorttype;
						 floatdiv[0].bclose=false;
						dt.updateRowSelctListData(rowseldata,floatdiv,'#FDF5CE','#C77405');
						//(typeof R_b_debug == "undefined")||(!R_b_debug)||RConsole.log('River 2 updateRowSelctListData: 2:'+((new Date()).getTime() - t1));
						
						var ullist=JQ(".header-count",floatdiv);
	                       ullist.empty();
	                       JQ('<li><span class="header-count-tip">选中行数:</span></li>' 
	                + '<li><span class="header-count-input" id="header-count-rows">0</span></li>' 
	                + '<li><span class="header-count-tip">选中小计:</span></li>' 
	                + '<li><span class="header-count-input2" id="header-count-amt">0</span></li>')
	                    .appendTo(ullist);
	                    if(pos.left<0){
	                    	pos.left=event.clientX-200;
	                    }
						var rrr=dt.borderdiv.offsetWidth-pos.left;
						if (rrr<400)
						{
						JQ(floatdiv).css({
									left : dt.contentdiv.scrollLeft+pos.left-312,
									top : "25",
									// "z-index" : "1",
									display : "block"
								});
						}
						else
						{
							JQ(floatdiv).css({
									left : dt.contentdiv.scrollLeft+pos.left,
									top : "25",
									// "z-index" : "1",
									display : "block"
								});
						}
						 floatdiv = dt.contentdiv.floatColSelectDiv;
						JQ(floatdiv).css({
									display : "none"
						});
					});
		}	
		 colbtn1 = JQ('<div class="ncolBtn02" title="隐藏和显示列"></div>');
		colbtn1.css({
					height : "16px",
					width : "9px",
					position : "absolute",
					 
					"background-image" : "url('/images/actions/btn-arrow.gif')"  //ui-icons_2e83ff_256x240.png
					 
				});
		colbtn1.css("left", "11");
		colbtn1.css("top", "0");
		JQ(colbtn0).append(colbtn1);
		parentDiv.floatColSelectbtn=colbtn1;
		colbtn1.click(function() {
					var pos = JQ(this.parentElement).position();
					var dt= this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.dataTable;
					var colseldata = dt.prepareColSelectData(); //准备展开数据
					var floatdiv = dt.contentdiv.floatColSelectDiv;
					    floatdiv[0].data=colseldata;
					     floatdiv[0].bclose=false;
					dt.updateColSelctListData(colseldata,floatdiv,'#e3edfd','#8ba3da');
				 	if(pos.left<0){
                    	pos.left=event.clientX-200;
                    }
					var rrr=dt.borderdiv.offsetWidth-pos.left;
					if (rrr<300)
					{
					JQ(floatdiv).css({
								left : dt.contentdiv.scrollLeft+pos.left-210,
								top : "25",
								// "z-index" : "1",
								display : "block"
							});
					}
					else
					{
						JQ(floatdiv).css({
								left : dt.contentdiv.scrollLeft+pos.left,
								top : "25",
								// "z-index" : "1",
								display : "block"
							});
					}
					floatdiv =  dt.contentdiv.floatRowSelectDiv;
					JQ(floatdiv).css({
 								display : "none"
							});
				});
				
				
		parentDiv.floatColDiv=colbtn0;
	};
	
	this.CreateColumnFilterDiv= function(parentDiv)
	
	{
		 var bload=false;
	    var ss=document.styleSheets;
	    for(var i=0,len=ss.length;i<len;i++)
	    {
	    	if(ss[i].href== '/style/cq_spb_datatable.css') bload=true;
	    }
	   
	    if(!bload)
		    document.createStyleSheet ( '/style/cq_spb_datatable.css');

		var colSelect = JQ('<div class="ui-multiselect-menu ui-widget ui-widget-content ui-corner-all" style="position: absolute;z-index:9999;width: 230px; top: 15px; left: 8px; display: none;"></div>');
		
	    JQ('<div class="ui-widget-header-blue ui-corner-all ui-multiselect-header ui-helper-clearfix">'
				+ '<ul class="ui-helper-reset">'
				+ '<li><a href="#" class="ui-multiselect-all ui-font-color" title="选择全部列"><span class="ui-icon ui-icon-check"></span><span>全选</span></a></li>'
				+ '<li><a href="#" class="ui-multiselect-none  ui-font-color"  title="清空选择"><span class="ui-icon ui-icon-closethick"></span><span>不选</span></a></li>'
				+ '<li><a class="ui-multiselect-save  ui-font-color" href="#"><span class="ui-icon ui-icon-circle-save" title="保存列配置"></span><span title="保存列配置">保存</span></a></li>'
				+ '<li><a class="ui-multiselect-close  ui-font-color" href="#"><span class="ui-icon ui-icon-circle-close" title="恢复列默认配置"></span><span title="恢复列默认配置">默认</span></a></li>'
				+ '</ul><img class="ui_header_close" src="/images/actions/closeChooseYY.png" title="关闭窗口"/></div>').appendTo(colSelect);
		JQ('<div class="title_container"><ul class="ui-multiselect-list-left" ></ul><ul class="ui-multiselect-list-right" ></ul></div>')
				.appendTo(colSelect);

		JQ(parentDiv).append(colSelect);
		
		var rowSelect = JQ('<div class="ui-multiselect-menu ui-widget ui-widget-content ui-corner-all" style="position: absolute;z-index:9999;width: 336px; top: 200px; left: 8px; display: none;"></div>');
		
	    JQ('<div class="ui-widget-header ui-corner-all ui-multiselect-header ui-helper-clearfix">'
				+ '<ul class="ui-helper-reset">'
				+ '<li><a href="#" class="ui-multiselect-all  ui-font-color" title="选择全部行"><span class="ui-icon ui-icon-check"></span><span>全&nbsp选</span></a>&nbsp</li>'
				+ '<li><a href="#" class="ui-multiselect-none  ui-font-color"  title="清空行选择"><span class="ui-icon ui-icon-closethick"></span><span>不&nbsp选</span></a>&nbsp</li>'
				+ '<li><a class="ui-multiselect-ok ui-font-color" href="#"  title="确定选择"><span class="ui-icon ui-icon-circle-ok"></span><span>确&nbsp定</span></a></li>'
				+ '</ul><img class="ui_header_close" src="/images/actions/closeChooseYY.png" title="关闭窗口"/></div>').appendTo(rowSelect);
		JQ('<div class="ui-widget-header2 ui-corner-all ui-multiselect-header ui-helper-clearfix">'
				+ '<ul class="ui-helper-reset">'
				+ '<li><a href="#" id="ui-multiselect-radio1" class="ui-multiselect-new ui-multiselect-radio ui-font-color"  title="重新选择"><input id="ui-multiselect-1-radio-0" type="radio" value="重新选择" name="multiselect_0" checked><span>重新选择</span></a></li>'
				+ '<li><a href="#" id="ui-multiselect-radio2" class="ui-multiselect-and  ui-multiselect-radio  ui-font-color" title="在已选择的行中附加条件,缩小选择行数" ><input id="ui-multiselect-1-radio-0" type="radio" value="并且" name="multiselect_0"><span>并且</span></a></li>'
				+ '<li><a href="#" id="ui-multiselect-radio3" class="ui-multiselect-or  ui-multiselect-radio  ui-font-color" title="在未选择的行中附加条件,扩大选择行数" ><input id="ui-multiselect-1-radio-0" type="radio" value="或者" name="multiselect_0"><span>或者</span></a></li>'
                + '</ul></div><div class="header-count-right" title="匹配当前选择的小计">'
                + '<ul class="header-count">'
                + '<li><span class="header-count-tip">选中行数:</span></li>' 
                + '<li><span class="header-count-input" id="header-count-rows">0</span></li>' 
                + '<li><span class="header-count-tip">选中小计:</span></li>' 
                + '<li><span class="header-count-input2" id="header-count-amt">0</span></li>'
				+ '</ul></div>').appendTo(rowSelect);
		JQ('<ul class="ui-multiselect-checkboxes ui-multiselect-list" ></ul>')
				.appendTo(rowSelect);

		JQ(parentDiv).append(rowSelect);
		parentDiv.floatColSelectDiv=colSelect;
		parentDiv.floatRowSelectDiv=rowSelect;
	}
this.bindFloatColBtn = function() {
    JQ("#" + this.id + "_div .ncolBtn0").hover(function() {
        JQ(this).css({
            display: "block"
        });
    },
    function() {
        JQ(this).css({
            display: "none"
        });
    });
    var table=this;
    JQ("#" + this.id + "_div th").mouseover(function() {
        if (JQ(this)[0].id.indexOf('checkbox') > 0 || JQ(this)[0].id.indexOf('serial') > 0 || JQ(this)[0].id.indexOf('radio') > 0 || this.sortname == undefined) return;
        var pos = JQ(this).position();
        var floatdiv = this.parentElement.parentElement.parentElement.parentElement.floatColDiv;
		if(floatdiv){
			floatdiv[0].colid = this.sortname;
			floatdiv[0].sorttype = this.sorttype;
			floatdiv[0].idx = this.cellIndex;
			if(!table.showHeadContextmenu){
				JQ(floatdiv).css({
					left: this.parentElement.parentElement.parentElement.parentElement.scrollLeft + pos.left + JQ(this).width() - 20,
					top: (JQ(this).height() - 18),
					zIndex : "99",
					backgroundColor : "#e7ebf7",
					display: "block"
				});
			}
		}
		//JQ(floatdiv).addClass("main_table_title");
    });
    JQ("#" + this.id + "_div .main_table_title").mouseout(function() {

        var floatdiv = this.parentElement.parentElement.parentElement.parentElement.floatColDiv;
        JQ(floatdiv).css({
            display: "none"
        });
    });
	/*
    JQ("#" + this.id + "_div .ui-multiselect-menu").click(function() {
        JQ(this)[0].bclose = true;
    });
    JQ("#" + this.id + "_div .ui-multiselect-menu").mouseleave(function() {
        var bclose = JQ(this)[0].bclose;
        if (typeof bclose != "undefined" && bclose) JQ(this).hide();
    });
	*/
    JQ("#" + this.id + "_div .ui_header_close").click(function() {
        JQ(this).parent().parent().hide();
    });
};
	this.firstshow = true;
	this.show = function(action){
		if (this.data == null) this.data = new Array();
		if (this.data.length == 0) this.allpage_totaljson = {};
		var start = (new Date()).getTime();
		if(typeof(JQ)=="undefined" || JQ.fn.jquery != "1.3.1"){
			document.write("<scr"+"ipt language='javascript' src='/js/jquery-1[1].3.1.js' ></scr"+"ipt>");
			document.write("<scr"+"ipt language='javascript' src='/js/jquery.md5.js' ></scr"+"ipt>");
			document.write("<scr"+"ipt language='javascript' src='/js/jquery.editable-select.js' charset='GBK' ></scr"+"ipt>");
			document.write("<scr"+"ipt language='javascript' src='/js/jquery.autocomplete.js' charset='GBK' ></scr"+"ipt>");
		}else if(typeof(JQ.md5)=="undefined"){
			document.write("<scr"+"ipt language='javascript' src='/js/jquery.md5.js' ></scr"+"ipt>");
		}
		if(typeof(JQ)!="undefined"&&typeof(JQ.fn.editableSelect)=="undefined"){
			document.write("<scr"+"ipt language='javascript' src='/js/jquery.editable-select.js'  charset='GBK' ></scr"+"ipt>");
		}
		
		var _doc = document;
		this.unZiplabel();
		if(typeof(this.beforeShow)=="function"){
			this.beforeShow();
		}
		if(this.parent == null) return ;
		var height = null;
		// 列表拖动高度后，点击扩大镜就不需要取原高度 lp20121227
		if (!this.iszoom) {
			height = getUserDataByElementId(this.id, this.tabletype+"_Height");
		}
		if(height){
			this.parent.parentElement.style.height = height+"px";
			this.parent.style.height = (height-23)+"px";
		}
		this.sortFromURL();
		if(this.lockcolcount>0)this.setTableHead(this.getTableHead,true);
		this.resetColumnConfig();
		if(this.firstshow&&"drag" != action & this.parent.offsetHeight>20){
			this.parent.style.height = this.parent.offsetHeight-20;
			this.firstshow = false;
		}
		this.parent.dataTable = this;
		var tableid = this.parent.id;
		var _table = [];
		_table.push("<table id=\"");
		_table.push(tableid);
		_table.push( "_dataTable\" border=\"0\" style=\"TABLE-LAYOUT: fixed;position: relative;float:left;\" width=\"100%\"  height=\"100%\" cellspacing=\"0\" cellpadding=\"0\">");
		_table.push("	<tr>");
		_table.push("		<td vAlign ='top' id=\"");
		_table.push(tableid);
		_table.push("_postable\" width=\"98.2%\" height=\"100%\">");
		_table.push('<div id="');
		_table.push(tableid);
		_table.push('_contentdiv" style="position:relative;height:100%;width:100%;overflow-x:');
		_table.push(this.showHorizontalSB?'scroll':'hidden');
		_table.push(';overflow-y:hidden;"></div>');

		_table.push('<div id="');
		_table.push(tableid);
		_table.push('_contentdivfixed" style="position:absolute;Z-INDEX: 3;top:0px;left:0px;display:none;height:0px;width:0px;overflow-x:hidden');
		_table.push(';overflow-y:hidden;"></div>');

		_table.push("</td>");
		_table.push("		<td style=\"width:18px;\" vAlign=\"top\" height=\"100%\">");
		_table.push("			<div id=\"");
		_table.push(tableid);
		_table.push("_rightscroll\" style=\"OVERFLOW-Y: scroll;WIDTH: 18px; HEIGHT: 100%;\">");
		_table.push("				<div id=\"");
		_table.push(tableid);
		_table.push("_rightscrollbar\" style=\"HEIGHT:1px;WIDTH: 1px;\"><span/></div>");
		_table.push("			</div>");
		_table.push("		</td>");
		_table.push("	</tr>");
		_table.push("</table>");
		// 清空元素内容
		this.parent.innerHTML = _table.join("");
		this.setMaxLine();
		
		this.borderdiv = _doc.getElementById(tableid + "_dataTable");
		this.rightscrollbar = _doc.getElementById(tableid + "_rightscrollbar");

		this.rightscroll = _doc.getElementById(tableid + "_rightscroll");
		this.contentdiv =  _doc.getElementById(tableid + "_contentdiv");
		this.contentdivfixed =  _doc.getElementById(tableid + "_contentdivfixed");
		this.borderdiv.dataTable = this;
		//this.paginationdiv = paginationdiv;
		//wy 右侧滚动条随内容的滚动而定位，不能超出内容范围
	   	var contentdivObj = this.contentdiv;
	   	var datalength = this.data==null?0:this.data.length;
	   	this.rightscrollotop=0;	 
		this.rightscroll.parentElement.dataTable = this;
		this.drawBeginTd = 0;
		this.drawEndTd = 0;
		this.rightscroll.onscroll = function(){	
			var datatable = this.parentElement.dataTable;
        	var	startnum = Math.floor(this.scrollTop / datatable.TABLE_TR_H);
			if(!datatable.drawing&&startnum!=datatable.startRowNum){
				datatable.drawing = true;
				for(var i=datatable.timers.length-1;i>=0;i--){
					if(datatable.timers[i]!=null)clearTimeout(datatable.timers[i]);
				}	
				if(datatable.drawEndTd == 0){
					var tablebody = datatable.getTablebody();
					if(tablebody.childNodes.length>0){
						var trobj = tablebody.childNodes[0];
						var scrollLeft = datatable.contentdiv.scrollLeft;
						for(j = 0; j < trobj.cells.length; j++){
							var tdobj = trobj.cells[j];
							if((tdobj.offsetLeft-scrollLeft)>datatable.contentdiv.offsetWidth){
								datatable.drawEndTd = j-1;
								break;
							}
						}
					}
				}
				if(datatable.drawBeginTd == 0){
					var tablebody = datatable.getTablebody();
					if(tablebody.childNodes.length>0){
						var trobj = tablebody.childNodes[0];
						var scrollLeft = datatable.contentdiv.scrollLeft;
						for(j = 0; j < trobj.cells.length; j++){
							var tdobj = trobj.cells[j];
							if((tdobj.offsetLeft+tdobj.offsetWidth)>=scrollLeft&&tdobj.offsetLeft<scrollLeft){
								datatable.drawBeginTd = j;
							}else{
								break;
							}
						}
					}
				}
				datatable.timers = [];
				
				datatable.timers[datatable.timers.length] = window.setTimeout(function(){datatable.draw();datatable.waitdrawrow = true;},5);
				datatable.drawing = false;
			}

   		}
		this.contentdiv.onscroll = function(){
			var datatable = this.parentElement.parentElement.parentElement.parentElement.dataTable;
			this.scrollTop=0;
			if(!datatable.drawing){
				var scrollLeft = this.scrollLeft;
				datatable.drawBeginTd = 0;
				datatable.drawEndTd = 0;
				var tablebody = datatable.getTablebody();
				if(tablebody.childNodes.length>0){
					var trobj = tablebody.childNodes[0];
					for(j = 0; j < trobj.cells.length; j++){
						var tdobj = trobj.cells[j];
						if((tdobj.offsetLeft+tdobj.offsetWidth)>=scrollLeft&&tdobj.offsetLeft<scrollLeft){
							datatable.drawBeginTd = j;
						}
						if((tdobj.offsetLeft-scrollLeft)>this.offsetWidth){
							datatable.drawEndTd = j-1;
							break;
						}
					}
					//JQ(".bottomdiv").html(JQ(".bottomdiv").html()+",("+datatable.drawBeginTd+","+datatable.drawEndTd+")");
					if(datatable.waitdrawrow){
						datatable.waitdrawrow = false;
						datatable.firstDraw = true;
						datatable.drawing = true;
						datatable.draw();	
						datatable.firstDraw = false;
						stopBubble();
						return false;
					}
				}
			}else{
				stopBubble();
				return false;
			}
   		}
        if(this.useThisHead) this.bodyColResize = true;
   		this.selectedall = false; //刷新应该不选中
		start = (new Date()).getTime();
		// 在显示区画表格
		this.draw();
		
		var datatable = this;
		if(this.contentdiv.offsetHeight>15)
			this.rightscroll.style.height =  this.contentdiv.offsetHeight-15;
		if(typeof(Ext) != "undefined"){Ext.lt.message.hook("layout","endlayout",function(){
				if(datatable.contentdiv.offsetHeight>15)
					datatable.rightscroll.style.height =  datatable.contentdiv.offsetHeight-15;	
				if(datatable.width != datatable.parent.offsetWidth){
					datatable.show();
				}else{
					datatable.setColWidth();
					datatable.drawEndTd = 0;
					var tablewidth = datatable.contentdiv.offsetWidth;
					var tablebody = datatable.getTablebody();
					if(tablebody!=null &&tablebody.childNodes.length>0){
						datatable.drawEndTd =0;
					}
				}
			});
		}
		var row_splitter = _doc.getElementById( this.parent.id + '_row_splitter');
		if(row_splitter==null){
			row_splitter = _doc.createElement("DIV");
			row_splitter.className = "vGrip";
			row_splitter.style.width = "100%";
			if(this.contentdiv.offsetHeight>0)
				this.contentdiv.style.height = this.contentdiv.offsetHeight-3;
			this.contentdiv.parentElement.appendChild(row_splitter); 
			row_splitter.innerHTML = "<span/>";
			row_splitter.id = this.parent.id + '_row_splitter';
		}
		var mainDiv = this.parent;
		var top_row_splitter = _doc.getElementById( this.parent.id + '_toprow_splitter');
		 if (top_row_splitter==null){
		 	top_row_splitter = _doc.createElement("DIV");
			top_row_splitter.className = "vGrip";
			top_row_splitter.style.width = "98%";
		    //mainDiv.appendChild(top_row_splitter);
		 	mainDiv.insertBefore(top_row_splitter,mainDiv.lastChild);
			top_row_splitter.innerHTML = "<span/>";
			top_row_splitter.id = this.parent.id + '_toprow_splitter';
		 }
		top_row_splitter.style.display = 'none';
		//top_row_splitter.style.cssText = "overflow:hidden;position: absolute;z-index:9999;background-color:darkslategray;display:none;cursor: s-resize;";
		//top_row_splitter.style.width=row_splitter.offsetWidth;
		top_row_splitter.style.height=3;//row_splitter.style.height;

		row_splitter.dataTable = this;
		row_splitter.onmousedown = function(e) {
			
			var posTdSplitter = row_splitter.getBoundingClientRect().top-mainDiv.getBoundingClientRect().top;
			//if(mainDiv.scrollHeight-mainDiv.offsetHeight>0)
			        posTdSplitter+=mainDiv.scrollTop;
			//oldsplittertop=posTdSplitter-row_splitter.style.top;
			iRowPadding = posTdSplitter - event.clientY;
			top_row_splitter.style.top = posTdSplitter;
			top_row_splitter.style.left = row_splitter.getBoundingClientRect().left-mainDiv.getBoundingClientRect().left;//getBoundingClientRect().left;
			top_row_splitter.style.display = 'block';
			if (top_row_splitter.setCapture)
				top_row_splitter.setCapture();
			bTableStart = true;
			Src_splitter=top_row_splitter;
			Src_table = this.dataTable;
			
		};


		this.bindRowSplitter();/**/
		if (this.data.length > 0 && this.useThisHead == null) {
			//if(!datatable.showHeadContextmenu){
				this.CreateColumnButton(this.contentdiv);	//this.parent
				this.CreateColumnFilterDiv(this.contentdiv);
			//}
		}
		start = (new Date()).getTime();
		//无数据时总算第一次画，解决查询时数据显示过短 lp20111223
		if(this.data && this.data.length>0){
			this.firstDraw = false;
		}
		//设置具体宽度， 避免字号切换宽度变小
		start = (new Date()).getTime();
		this.resetscroll();
		if(this.display == "line"){
			this.parent.style.height = (this.contentdiv.scrollWidth>this.contentdiv.offsetWidth)?this.contentdiv.getElementsByTagName("TABLE").item(0).offsetHeight+15:this.contentdiv.getElementsByTagName("TABLE").item(0).offsetHeight;
		}
		this.headeventhandler();
		this.parent.hiddenClick = function(){this.focus();}
		this.bindFloatColBtn();
		//this.lockcolcount = 2;
		var cols = this.contentdiv.getElementsByTagName("COL");
		if(this.lockcolcount>0 && cols.length>0){
				var fixedwidth = 0;
				for(var i=0;i<this.lockcolcount;i++){
					fixedwidth += cols[i].offsetWidth;
				}
				this.contentdivfixed.style.height = this.contentdiv.offsetHeight - 16;
				this.contentdivfixed.style.width = fixedwidth+1;
				this.contentdivfixed.style.top = this.contentdiv.offsetTop + this.contentdiv.offsetParent.offsetTop;
				this.contentdivfixed.style.left = this.contentdiv.offsetLeft;
				this.drawfixed();
		}
		this.width = this.parent.offsetWidth;
		//window.status = "show:"+ ((new Date()).getTime()-start)+"(ms)"+window.status;
		if(this.showNoPage){
			this.createNoPagination();
		
		}
	}
	
	this.resetscroll = function(){
		var tables = this.contentdiv.getElementsByTagName("TABLE");
		if(tables.length>0){
			if(this.isWrap){
				   // 设置滚动条默认值
					if(this.data != null){
						var table_h = tables.item(0).offsetHeight;
						var div_h = this.contentdiv.offsetHeight;
						if(table_h>div_h || this.maxline<this.data.length){
							// 需要显示滚动条，算超出行数
							var h = (this.data.length)*this.TABLE_TR_H+parseInt(this.contentdiv.offsetHeight,10)+20;
							this.rightscrollbar.style.height = (h>0)?h:10;
						}
					}
			}else{
					if(!this.vp) this.vp=0;
					var headbody = this.getHeadbody();
					
					// 设置滚动条默认值
					if(this.data != null){
						var table_h = tables.item(0).offsetHeight;
						var div_h = this.contentdiv.offsetHeight;
						if(table_h>div_h || this.maxline<this.data.length){
							// 需要显示滚动条，算超出行数
							var h = (this.totalConfig&&this.totalConfig.length>0?(this.data.length+1):this.data.length)*this.TABLE_TR_H+this.vp + headbody.offsetHeight;//+ parseInt(div_h,10) + 20;//tableobj.trsheight;//
							this.rightscrollbar.style.height = (h>0)?h:10;
						}
					}
			}
		}
	}
	
	this._removeLocalSetting = function(e){
	   var el;
	   el = (e)?e.target:window.event.srcElement;
	   if(el.tagName == "th" || el.tagName=="TH"){
		   removeUserData(this.id,this.tabletype);
		   removeUserData(this.id,this.tabletype+"colswidth");
		   removeUserData(this.id,this.tabletype+"_newHead");
		   this.setTableHead(this.tableInitHead);
		   this.show();
		}   
	}
	
	this.headeventhandler = function(headobj){
		if(headobj == undefined){
			headobj = this.getMainTable();
		}
		headobj = this.parent;
		if(headobj!=null){
			headobj.datatable= this;

			headobj.onmousedown = function(e) {this.datatable._mouseDown(e);}
			headobj.onmousemove = function(e) {this.datatable._mouseMove(e);}
			headobj.onmouseup   = function(e) {this.datatable._mouseUp(e); }
			headobj.ondblclick   = function(e) {this.datatable._removeLocalSetting(e);}
			//headobj.onmouseout   = function(e) {this.datatable._mouseOut(); }
			
			headobj.onmousewheel =  function(e) {this.datatable._scrollMove(e);stopBubble(e);}
		} 
	   var tableobj = this.getMainTable();
	   if(tableobj.getElementsByTagName("colgroup").length==0){
			this.setColWidth();
		}
	}

	this._mouseMove = function(e) {
		var el, x, w, tw, ox, rx, i, l;
		el = (e)?e.target:window.event.srcElement;
		if(el==null)return;
		//window.status ="s:"+(this._headerOper == COL_HEAD_DOWN);
		if(el.tagName != "th" && el.tagName!="TH" && el.tagName!="TABLE" && el.tagName!="IMG" && el.tagName!="DIV" ){
		
		    this._headerOper = COL_HEAD_NONE;
			//this._headerData[0].className = '';
			this._headerData = null;
			if (this._moveEl)    { this.contentdiv.removeChild(this._moveEl);    this._moveEl    = null; }
			if (this._moveSepEl) { this.contentdiv.removeChild(this._moveSepEl); this._moveSepEl = null; }
		    return;
		}
		if(el.tagName!="th" && el.tagName!="TH" && el.tagName!="DIV"){
			return;
		}
		x = (e)?e.pageX:window.event.x + this.contentdiv.scrollLeft;
		
		if ((this._headerOper == COL_HEAD_DOWN)&&this._headerData!=null &&((typeof(COL_MOVE)!= "undefined" && COL_MOVE!= false) || typeof(COL_MOVE)== "undefined")) {
			this._headerOper = COL_HEAD_MOVE;
			el.parentNode.style.cursor = 'move';
			w = this._headerData[2] + (x - this._headerData[1]);
			if (!this._moveEl) {
			    this._moveEl = document.createElement('div');
				this._moveEl.appendChild(document.createTextNode(this._headerData[0].firstChild.nodeValue));
				this._moveEl.className = 'columnlist-move-header';
				this._moveEl.style.textAlign = 'center';
				this.contentdiv.appendChild(this._moveEl);
			}
			else { this._moveEl.firstChild.nodeValue = this._headerData[0].firstChild.nodeValue; }
			this._moveEl.style.width = this._headerData[0].clientWidth + 'px';
	
			if (!this._moveSepEl) {
				this._moveSepEl = document.createElement('div');
				this._moveSepEl.className = 'columnlist-separator-header';
				this.contentdiv.appendChild(this._moveSepEl);
			}	
		}
		
		if (this._headerOper == COL_HEAD_MOVE) {
			if(el.tagName=="DIV")return;
			ox = this._headerData[1] + (x - this._headerData[2]);
			this._moveEl.style.left = ox + 'px';
			ox = 0, rx = x - this._headerData[3];
			var cells = el.parentNode.cells;
			var cellnum = cells.length;
			for (i = 0; i < cellnum; i++) {
				ox += cells[i].offsetWidth;
				if (ox >= rx) {break; }
			}
			sepCell = el.cellIndex;
			if (i == cellnum) { this._moveSepEl.style.left = (cells[cellnum-1].offsetLeft + cells[cellnum-1].offsetWidth - 1) + 'px'; }
			else { this._moveSepEl.style.left = cells[sepCell].offsetLeft + 'px'; }
	
			this._headerData[4] = i;

		}else if(this._headerOper == COL_HEAD_SIZE){
			w = this._headerData[1] + x - this._headerData[2];
			tw = ((w - this._headerData[1]) + this._headerData[3]) + 1;
			var tableobj = this.getMainTable();
			var cells = tableobj.getElementsByTagName("COL");
			if (w > 5 && cells.length>0 && w<1000) {
			    var cellIndex = this._headerData[0].cellIndex;
				if(this._headerData[0].mycellindex)cellIndex = this._headerData[0].mycellindex;
				var cellsfixed = this.contentdivfixed!=null? this.contentdivfixed.getElementsByTagName("COL"):[];
				var sortimg = 0;
				if(this.currentSortCol != null&&this.currentSortCol == cellIndex){
					//当表格插入排序图片时
					//sortimg = 25;
				}
				cells[cellIndex].width = w +sortimg+ 'px';
				if(cellsfixed.length>cellIndex && cellIndex<this.lockcolcount) {
					cellsfixed[cellIndex].width = cells[cellIndex].offsetWidth; 
					this.contentdivfixed.style.width = this._headerData[6] + (x - this._headerData[2]) + sortimg;
					
				}
				if(this.lockcolcount>0)this.contentdivfixed.resetwidth = true;
				tableobj.style.width = tw + 'px';
				this.movecolumn = {"cellIndex":cellIndex,"width":cells[cellIndex].offsetWidth-1};
//			    setColStyleWidth(this.columnConfig[cellIndex],w + 'px');
			    this.resetscroll(); 	
			}	
		}else{
			this._checkHeaderOperation(el, x);
		}
	}
	this._scrollMove = function(e){
		var _activeElement = document.activeElement;
  		if(_activeElement != null && _activeElement !='' && _activeElement.isContentEditable == true){
			if(typeof _activeElement.id != "undefined"&&_activeElement.id != ""){
				document.getElementById(_activeElement.id).blur();
			}else{
				_activeElement.blur();
			}
			
		}
		el = (e)?e.target:window.event;
		if(el.wheelDelta < 0){
			this.rightscroll.scrollTop=  this.rightscroll.scrollTop+parseInt((el.wheelDelta/-120))*this.TABLE_TR_H;
		}
		if(el.wheelDelta > 0){
			this.rightscroll.scrollTop =  this.rightscroll.scrollTop-parseInt((el.wheelDelta/120))*this.TABLE_TR_H;
		}
		this.draw();		
	}
	this._mouseUp = function(e) {
		var el, x, w, tw, ox, rx, i, l;
		el = (e)?e.target:window.event.srcElement;
		if(el.tagName == "HTML")return;
		if((el.tagName=="IMG"||el.tagName=="A") && el.parentNode!=null && el.parentNode.parentNode!=null && (el.parentNode.parentNode.tagName.toUpperCase()=="TH" || el.parentNode.tagName.toUpperCase()=="TH")){
			if(this._headerOper == COL_HEAD_DOWN) {
				if(!this.showHeadContextmenu){
					this.sort_click(el.parentNode.parentNode.tagName.toUpperCase()=="TH"?el.parentNode.parentNode:el.parentNode);
				}
			}
		}
		if(el.tagName=="th" || el.tagName=="TH"){
			if(this._headerOper == COL_HEAD_DOWN) {
				if(!this.showHeadContextmenu){
					this.sort_click(el);
				}
		    }else if (this._headerOper == COL_HEAD_MOVE) {
				if (this._moveEl)    { this.contentdiv.removeChild(this._moveEl);    this._moveEl    = null; }
				if (this._moveSepEl) { this.contentdiv.removeChild(this._moveSepEl); this._moveSepEl = null; }
				this._moveColumn(this._headerData[0], el);
			}
		}
        
		if (this._headerOper != COL_HEAD_NONE) {
			this._headerOper = COL_HEAD_NONE;
			if((el.tagName=="IMG"||el.tagName=="A")  && el.parentNode!=null && el.parentNode.parentNode!=null && (el.parentNode.parentNode.tagName.toUpperCase()=="TH" || el.parentNode.tagName.toUpperCase()=="TH")){
				el.parentNode.parentNode.tagName.toUpperCase()=="TH"?el.parentNode.parentNode.style.cursor = 'default':el.parentNode.style.cursor = 'default';
			}else if(el.parentNode!=null)
				el.parentNode.style.cursor = 'default';
			//this._headerData[0].className = '';
			this._headerData = null;
			if (this._moveEl)    { this.contentdiv.removeChild(this._moveEl);    this._moveEl    = null; }
			if (this._moveSepEl) { this.contentdiv.removeChild(this._moveSepEl); this._moveSepEl = null; }
			//this._sizeBodyAccordingToHeader();
			
	    }
	    else {
    		el.parentNode.parentNode.style.cursor = 'default';
	    }
		if(this.movecolumn){
			var headstr = getUserDataByElementId(this.id, this.tabletype+"colswidth");
			var colswidthobj  = {};
			if(headstr){
				eval("colswidthobj = "+headstr);
			}
			var config = this.columnConfig[this.movecolumn["cellIndex"]];
			var width = this.movecolumn["width"];
			colswidthobj[config.name] = width;
			setUserDataByElementId(this.id, this.tabletype+"colswidth", Object.toJSON(colswidthobj));
			//setColStyleWidth(config,width + 'px');
			this.movecolumn = null;
		}
		if(this.contentdivfixed.resetwidth){
			if(this.lockcolcount>0){
				var _t=this;
				window.setTimeout(function(){
				_doLock(_t);
				},100);
			}
			this.contentdivfixed.resetwidth = false;
		}
	}

	this._mouseDown = function(e) {
		var el, x, w, tw, ox, rx, i, l;
		el = (e)?e.target:window.event.srcElement;
		erl = window.event.button;
		if(erl==1){
			if((el.tagName=="IMG"||el.tagName=="A") && el.parentNode!=null && el.parentNode.parentNode!=null && (el.parentNode.parentNode.tagName.toUpperCase()=="TH" || el.parentNode.tagName.toUpperCase()=="TH")){
				if(this._headerData != null && this._headerData[0].cellIndex >= this.lockcolcount){
					this._headerOper = COL_HEAD_DOWN;
					this._headerData[0].className = 'columnlist-active-header';
				}
				return;
			}
			if(el.tagName=="th" || el.tagName=="TH"){
				x = (e)?e.pageX:window.event.x + this.contentdiv.scrollLeft;
				
				this._checkHeaderOperation(el, x);
				if (this._headerOper == COL_HEAD_EDGE) {
					//if (this.bodyColResize) { this._sizeBodyAccordingToHeader(); }
					this._headerOper = COL_HEAD_SIZE;
					if(this.contentdiv.floatColSelectDiv)JQ(this.contentdiv.floatColSelectDiv).hide();
				}
				else if (this._headerOper == COL_HEAD_OVER) {
					if(el.id ==this.id+"_serial" || el.id ==this.id+"_radio"){
					    this._headerOper =  COL_HEAD_NODA;
					}else{
					    if(this._headerData[0].cellIndex >= this.lockcolcount){
							this._headerOper = COL_HEAD_DOWN;
							this._headerData[0].className = 'columnlist-active-header';
						}
					}
				}
			}
	}
	if(erl == 2 && this.bodyColResize){
		var colid =null;
		var sorttype = null;
		   if(el.tagName=="th" || el.tagName=="TH"){
			   if (el.parentElement != null) {
				   el.parentElement.oncontextmenu = null;
			   }
			   var ie5 = document.getElementById("ie5menu");
			   if(ie5 !=null)
			   {
			     document.body.removeChild(ie5);
			   }
			   //如果要固定列数超出可视范围则不可固定
			   var cw = document.getElementById(this.parent.id+'_contentdiv').offsetWidth;
			   var w1 = el.offsetLeft ;
			   var w2 = el.offsetWidth;
			   var mw = w1 + w2;
			   //alert("cw="+cw+";mw="+mw);
			  
			   var rightbutton= document.createElement('<div id="ie5menu"></div>');
			   var content = document.createElement('<div  onmouseover="onMOvera(this)" onmouseout="onMOuta(this)" class="select" id="fix"></div>');
		       var content1 = document.createElement('<div  onmouseover="onMOvera(this)" onmouseout="onMOuta(this)" class="select" id="cancelFix"></div>');
		       content.innerText = "固定列";
		       content1.innerText = "取消固定列";
		       if(!(mw>cw && el.cellIndex >= this.lockcolcount) ){
			       rightbutton.appendChild(content);
			       rightbutton.appendChild(content1);
		       }
		       document.body.appendChild(rightbutton);
			    /*如果当前浏览器是Internet Explorer，document.all就返回真*/
		       if (document.all && window.print) {
		        /*选择菜单方块的显示样式*/
		       ie5menu.className = menuskin;
		       //数据行
		       var tab = el.offsetParent;
		       //表头行
		       var tab_title = tab.children[0];  
		       //合计行		
		       var tab_tot = document.getElementById(this.id+"_tot");
		       var otr = tab.getElementsByTagName("TR");
		       var otot = tab_tot.getElementsByTagName("TD");
		       var oth_title = tab.getElementsByTagName("TH");
		       var trlen = otr.length;
		       var datatable = this;
		       //添加固定样式
		       if(!(mw>cw && el.cellIndex >= this.lockcolcount) ){
		       document.getElementById("fix").onclick= function fixstyle(){
		       		if(datatable.lockcolcount==(el.cellIndex+1))return;
		       		
					if(datatable.lockcolcount>0){
						document.getElementById("cancelFix").click();
					}
					datatable.lockcolcount = el.cellIndex+1;
					if(el.mycellindex!=null){
						datatable.lockcolcount = parseInt(el.mycellindex)+1;
					}
					var cols= datatable.contentdiv.getElementsByTagName("col");
					datatable.contentdivfixed.style.height = datatable.contentdiv.offsetHeight-16;
					datatable.contentdivfixed.style.width = el.offsetLeft + cols[el.cellIndex].offsetWidth;
					datatable.contentdivfixed.style.top = datatable.contentdiv.offsetTop+datatable.contentdiv.offsetParent.offsetTop;
					datatable.contentdivfixed.style.left = datatable.contentdiv.offsetLeft;
					datatable.drawfixed();
					datatable.contentdiv.style.left=1;
					window.setTimeout(function(){
					_doLock(datatable);
					},100);
		      }
		      //取消固定样式
		       document.getElementById("cancelFix").onclick= function cancelfixstyle(){
					 datatable.lockcolcount = 0;
					 datatable.contentdivfixed.style.display = 'none';
					 datatable.contentdiv.style.left=0;
					 var _pw = datatable.contentdiv.parentNode.offsetWidth;
					 datatable.contentdiv.style.width = _pw; //恢复原宽度，与外层一致
		     	}
		     	}
		     	if(datatable.showHeadContextmenu){
			     	//排序。等功能。
			     	var zhengxu = document.createElement('<div  onmouseover="onMOvera(this)" onmouseout="onMOuta(this)" class="select" id="fix"></div>');
			     	var daoxu = document.createElement('<div  onmouseover="onMOvera(this)" onmouseout="onMOuta(this)" class="select" id="cancelFix"></div>');
			     	//var content1 = document.createElement('<div  onmouseover="onMOvera(this)" onmouseout="onMOuta(this)" class="select" id="cancelFix"></div>');
			     	zhengxu.innerText="正序";
			     	zhengxu.onclick=function(){
			     		datatable._headerOper=COL_HEAD_DOWN;
			     		var idx = oncontextmenuel.cellIndex;
			     		datatable.orderMap[idx]=''
						datatable.sort_click(oncontextmenuel);
			     	}
			     	daoxu.innerText="倒序";
			     	daoxu.onclick=function(){
			     		datatable._headerOper=COL_HEAD_DOWN;
			     		 var idx = oncontextmenuel.cellIndex;
			     		datatable.orderMap[idx]='asc'
						datatable.sort_click(oncontextmenuel);
			     	}
					rightbutton.appendChild(zhengxu);
					rightbutton.appendChild(daoxu);
					
					if (this.data.length > 0 && this.useThisHead == null) {
						//var idx = this.cellIndex;
						//this.CreateColumnButton(this.contentdiv);	//this.parent
						//this.CreateColumnFilterDiv(this.contentdiv);
						var colSelect=this.contentdiv.floatColSelectbtn;
						var rowSelect=this.contentdiv.floatRowSelectbtn;
						
						var cd=this.contentdiv.floatColSelectDiv;
						var rd=this.contentdiv.floatRowSelectDiv;
						
						var colSelectdiv = document.createElement('<div  onmouseover="onMOvera(this)" onmouseout="onMOuta(this)" class="select" id="fix"></div>');
					   	//var content1 = document.createElement('<div  onmouseover="onMOvera(this)" onmouseout="onMOuta(this)" class="select" id="cancelFix"></div>');
					   	colSelectdiv.innerText="隐藏和显示列";
					   	colSelectdiv.onclick=function(){
					   		if(cd!=null)cd.hide();
					   		if(rd!=null)rd.hide();
					   		colSelect.click();
					   	}
						rightbutton.appendChild(colSelectdiv);
						if(rowSelect!=null){
					   	var rowSelectdiv = document.createElement('<div  onmouseover="onMOvera(this)" onmouseout="onMOuta(this)" class="select" id="cancelFix"></div>');
					   	rowSelectdiv.innerText="数据行过滤";
					   	rowSelectdiv.onclick=function(){
					   		if(cd!=null)cd.hide();
					   		if(rd!=null)rd.hide();
							rowSelect[0].parentElement.colid=colid;
							rowSelect[0].parentElement.sorttype=sorttype;
					   		rowSelect.click();
					   	}
						rightbutton.appendChild(rowSelectdiv);
						}
					}
					rightbutton.style.height=27*rightbutton.childNodes.length;
					
		     	}
		       /*重定向鼠标右键事件的处理过程为自定义程序showmenuie5*/
		       el.parentElement.oncontextmenu = function(){
					if(rightbutton.childNodes.length==0)return false;
					colid =el.sortname;
					sorttype = el.sorttype;
					oncontextmenuel=el;
					return showmenuie5("ie5menu");
		       };
			   //window.status = "showmenuie5";
		       /*重定向鼠标左键事件的处理过程为自定义程序hidemenuie5*/
		       document.body.onclick = function(){return hidemenuie5("ie5menu");};;
	        }
      }
    }
}
var oncontextmenuel=null;
	this._checkHeaderOperation = function(el, x) {
	    if(el.tagName!="th" && el.tagName!="TH" && el.tagName!="DIV") return;
	    var prev, next, left, right, l, r,leftwidth,_doc;
	    leftwidth = 0;
		_doc = document;
	    if(_doc.getElementById("left_tree"))
	    	leftwidth = _doc.getElementById("left_tree").offsetWidth;
	    if(_doc.getElementById("switchBar"))
	    	leftwidth =  leftwidth+_doc.getElementById("switchBar").offsetWidth; 
	    if(_doc.getElementById("inacct_tree"))
	    	leftwidth =  leftwidth+_doc.getElementById("inacct_tree").offsetWidth; 
		prev = el.previousSibling;
		next = el.nextSibling;
		left = getLeftPos(el)-leftwidth;
		right = left + el.offsetWidth;
		l = x - left+10;
		r = right - x-15;
		var divfixedwidth = this.contentdivfixed!=null?this.contentdivfixed.offsetWidth-2:0;
		if ((l < 3) && (prev)) {
		    if(el.cellIndex < this.lockcolcount) {
		    el.parentNode.style.cursor = 'default';
		    return};
		    if(this.columnConfig[el.cellIndex].id=="radio" || this.columnConfig[el.cellIndex].id=="checkbox")
		        return;
			if(typeof(COL_RESIZE)!= "undefined" && false == COL_RESIZE) return;
			el.parentNode.style.cursor = 'e-resize';
			this._headerOper         = COL_HEAD_EDGE;
			this._headerData         = [prev, prev.offsetWidth - 5, x, el.parentNode.offsetWidth, el.cellIndex,prev.parentNode.lastChild.offsetWidth,divfixedwidth];
			
		} else if (r < 5) {
			if( typeof(COL_RESIZE)!= "undefined" && false == COL_RESIZE) return;
			el.parentNode.style.cursor = 'e-resize';
			this._headerOper         = COL_HEAD_EDGE;
			this._headerData         = [el, el.offsetWidth - 5, x, el.parentNode.offsetWidth, el.cellIndex,el.parentNode.lastChild.offsetWidth,divfixedwidth];
		}else {
			el.parentNode.style.cursor = 'default';
			this._headerOper         = COL_HEAD_OVER;
			this._headerData         = [el, el.offsetLeft, x, getLeftPos(el), el.cellIndex,el.parentNode.lastChild.offsetWidth,divfixedwidth];
		}	
    }
	
    
    /*
	 * 拖动排序实现 修改传入对象获取除索引外的其他属性.
	 */
	this._moveColumn = function(a, b) {
		var iCol = a.cellIndex;
		var iNew = b.cellIndex;
		var idCol  = a.id.split("_")[1]; //用于表头headString排序
		var idNew  = b.id.split("_")[1];
		var i, oParent, oCol,wCol, oBefore, aRows , rown , a,iCol,headstring;
		if(this.columnConfig==null){ return; }
		if(iNew<2) {
		   if(this.columnConfig[0].name == "serial" || this.columnConfig[0].name == "checkbox" || this.columnConfig[0].name == "radio") iNew = 1;
		   if(this.columnConfig[1].name == "serial" || this.columnConfig[1].name == "checkbox" || this.columnConfig[1].name == "radio") iNew = 2;
		}
		if (iCol == iNew) { return; }
        
        aRows = this.getMainTable().getElementsByTagName("tr");
		rown = aRows.length;
		//处理固定列无法拖动,同时无法向固定列插入其它列表
		var tab_colMove_tot =  document.getElementById(this.id+"_tot");
		var otot_colMove = tab_colMove_tot.getElementsByTagName("TD");
		if(otot_colMove[iNew].cellIndex < this.lockcolcount ){
			return;
		}
		var iColCur = iCol;
		var iNewCur = iNew;
		for (i = 0; i < rown; i++) {
			if(iColCur == iCol){
				var len = iCol;
				for(var j=0;j<len;j++){
					var colSpan = aRows[i].cells[j].colSpan;
					if(colSpan>1){
						iColCur = iColCur -(colSpan-1);
						iNewCur = iNewCur -(colSpan-1);
						break;
					}
				}
			}
			oCol    = aRows[i].cells[iColCur];
			oParent = aRows[i];
			if (iNewCur == aRows[i].cells.length) {
				oParent.removeChild(oCol);
				oParent.appendChild(oCol);       
			}else {
				oBefore = aRows[i].cells[iNewCur];
				oParent.removeChild(oCol);
				oParent.insertBefore(oCol, oBefore);
			}	
		}
		var oParents = this.getMainTable().getElementsByTagName("colgroup");
		if(oParents.length>0){
			var oParent = oParents[0];
			var cols = this.getMainTable().getElementsByTagName("col");
			oCol    = cols[iCol];
			
			if (iNew == cols.length) {
				oParent.removeChild(oCol);
				oParent.appendChild(oCol);
			}else {
				oBefore = cols[iNew];
				oParent.removeChild(oCol);
				oParent.insertBefore(oCol, oBefore);
			}	
		}

		rown = this.columnConfig.length;
		a = new Array();
		oCol = this.columnConfig[iCol];
        for(i = 0; i < rown; i++){
				if (i == iCol) { continue; }
				if (i == iNew) { a.push(oCol);}
				a.push(this.columnConfig[i]);
		}
		headstring = [];
		//对hearstring(包含隐藏列)_进行排序.
		var nowHeadStr = getUserData(this.parent, this.tabletype+"_newHead");
		if(nowHeadStr==null){
			nowHeadStr = this.tableInitHead.concat();
		}else{
			nowHeadStr = nowHeadStr.split(",");
		}
		//对headStr进行同步排序.jzy
		var _v = nowHeadStr;
		var _len = nowHeadStr.length;
		var _new_v = new Array(_len);
		var  _col, _new;
		for(var i=0;i<_len;i++){
			if(_v[i]==idCol){
				 _col = i;
			}
			if(_v[i]==idNew){
				_new = i ;
			}
		}
		_v.splice(_col,1);
		if(_col>_new){
			_v.splice(_new,0,idCol);
		}else{
			_v.splice(_new-1,0,idCol);
		}
		var _w = new Array();
		for(var i=0;i<_v.length;i++){
	        if(_v[i] == "checkbox" || _v[i]== "radio" || _v[i] == "serial"){
		           continue;
		    }
	        _w.push(_v[i]);
		}
		setUserDataByElementId(this.id,this.tabletype+"_newHead",_w.join(",")); //保存最新的排序后的所有可见与不可见字段的顺序的headstring
		this.columnConfig = a;
		for(i = 0; i < rown; i++){
		        if(this.columnConfig[i].name=="noFind" || this.columnConfig[i].name=="nofind") return;
		        if(this.columnConfig[i].name == "checkbox" || this.columnConfig[i].name == "radio" || this.columnConfig[i].name == "serial"){
		           continue;
		        }
		        headstring.push(this.columnConfig[i].id);
		}
		setUserDataByElementId(this.id,this.tabletype,headstring.join(","));
	}
	function trobjDblclick(){
		if(event.srcElement==this&&!event.type=="dbclick"){
			return;
		}
		var datatable = this.datatable;    							
		for(var i=0;i<datatable.columnConfig.length;i++){
			// 查找每一列对应的编辑框
			var colconfig = datatable.columnConfig[i];
			var columnediter = datatable.columnEditor[colconfig.id];
			if(columnediter != null){
				// 找到编辑框,调用编辑框的赋值方法
				columnediter.setDataRow(this.data[colconfig.id],this.data,datatable);
			}
		}
		
		if(datatable.checkedOnclick||datatable.isShowRadio){
			// 如果当前行没有选中,则选中该行
			if(this.data.checked != true){
				var rows = datatable.getSelectedRow();
				for(var i=0;i<rows.length;i++){
					rows[i].checked = false;
				}
				
				this.data.checked = true;
				datatable.draw();
			}
		}
		
		
		
		// 调用自定义的datatable双击事件
		if(this.onrowdblclick){
			this.onrowdblclick(this.data);
		}
		
	};  		  		
	function trobjClick(){
		if(event.srcElement==this&&!event.type=="click"){
			return;
		}
		var datatable = this.datatable;    							
		for(var i=0;i<datatable.columnConfig.length;i++){
			// 查找每一列对应的编辑框
			var colconfig = datatable.columnConfig[i];
			var columnediter = datatable.columnEditor[colconfig.id];
			if(columnediter != null){
				// 找到编辑框,调用编辑框的赋值方法
				columnediter.setDataRow(this.data[colconfig.id],this.data,datatable);
			}
		}
						
		if(datatable.checkedOnclick||datatable.isShowRadio){ //单选按钮点击行事件时先更新选中行 以免同步出错
			// 如果当前行没有选中,则选中该行
			if(this.data.checked != true){
				var rows = datatable.getSelectedRow();
				for(var i=0;i<rows.length;i++){
					rows[i].checked = false;
				}
				
				this.data.checked = true;
				datatable.draw();
			}
		}
		
		
		
		// 调用自定义的datatable点击事件
		if(this.onrowclick){
			var trobj = this;
			trobj.onrowclick(trobj.data);
			//window.setTimeout(function(){trobj.onrowclick(trobj.data);},1);
		}
		
	};
	function trobjMouseup(){
		var clickRepeat; 
		var clickCount=0;
		var clickDelay=2000;
		clearTimeout(clickRepeat); 
		clickCount++; 
		if(clickCount==1) {
			clearTimeout('trobj.click()',clickDelay);					
			clickCount=0;
		}else{
			trobj.ondblclick();
			clickCount=0;
		}     		
	}; 
	this.setTdTextAlignStyle = function(column,tdobj){
			if(this.useThisHead == null)return ;
			if(column.textAlign !=null){
				tdobj.style.textAlign = column.textAlign;
			}else if(column.style!=null &&column.style.indexOf("text-align")!=-1){
				var textAlign = null;
				var styles = column.style.split(";");
				for(var k=0;k<styles.length;k++){
					if(styles[k]!=null&&styles[k].indexOf("text-align")!=-1){
						textAlign = styles[k].split(":")[1]	;
					}
				}
				if(textAlign !=null){
					column.textAlign = textAlign;
					tdobj.style.textAlign = textAlign;
				}
			}
	}
	this.drawTrObj = function(_doc,row,tbodyobj,tbodyobjfixed,index,isrightmenu){
			var curdrawBeginTd = this.drawBeginTd;
			var curdrawEndTd = this.drawEndTd;
			
			var cols = this.columnConfig.length;
			// 创建每行的TR对象
			var trobj = _doc.createElement("TR");
			//trobj.height = this.trHeight+"px";
			//设置行属性
			if(row.showinfo!=null&&row.showinfo == true&&row.checked){
				trobj.className="main_table_title_letter_info";
			} else if(row.checked == true){ //重画的时候如果当前行选中，则置选中样式
				trobj.className="main_table_title_letter_selected";
			} else { 
				trobj.className="main_table_title_letter";
				trobj.onmouseover = function(){this.runtimeStyle.backgroundColor=this.data['checked']?'':'#e8f4ff';};
				trobj.onmouseout = function(){this.runtimeStyle .backgroundColor='';};
			}
			if(row["background-color"]!=null) trobj.style.backgroundColor = row["background-color"];
			trobj.onrowclick = this.onrowclick;
			trobj.onrowdblclick = this.onrowdblclick;
			trobj.ondblclick = trobjDblclick;
			trobj.onclick =  trobjClick;
			trobj.onmouseup = trobjMouseup;
			trobj.datatable = this;
			trobj.data = row;
			trobj.rownum = index;
			
			if (isrightmenu) trobj.oncontextmenu = trRightContextMenu;
			if(tbodyobjfixed){
				var trobjfixed = trobj.cloneNode(true);
				trobjfixed.onrowclick = this.onrowclick;
				trobjfixed.onrowdblclick = this.onrowdblclick;
				trobjfixed.ondblclick = trobjDblclick;
				trobjfixed.onclick =  trobjClick;
				trobjfixed.onmouseup = trobjMouseup;
				trobjfixed.style.background = "#EEE";
				trobjfixed._fixed =  true;
				tbodyobjfixed.insertBefore(trobjfixed, null);
				for(var i = 0; i<this.lockcolcount; i++){
					var column = this.columnConfig[i];
					var value = row[column.name];
					var tdobj = _doc.createElement('TD');
					var id =[this.id];
					id.push('-');
					id.push(column.name);
					id.push('-');
					id.push(row.rownum);
					tdobj.id= id.join("");
					tdobj.className="tdoverflow";
					tdobj.onmouseout = function(){return nd();};
					tdobj.noWrap = true;
					column._doc = _doc;
					column.trobj = trobj;
					column._fixed = true;
					column.show(row.rownum,value,row,tdobj,this);
					trobjfixed.insertBefore(tdobj, null);
					this.setTdTextAlignStyle(column,tdobj);
					//IE6不支持insertBefore之前赋值
					if(column.id == "checkbox"&&(row["checked"] == true ||row["checked"] == "true"|| this.selectedall)){
						tdobj.firstChild.checked = true;
					}
					this.timers[this.timers.length] = setTimeout(function(){JQ(tdobj).data("colconfig",column);},10);
				}
				if(cols-this.lockcolcount>0){//最后一列固定不需要创建空TD
					var tdobj = _doc.createElement('TD');
					tdobj.colSpan =  cols-this.lockcolcount;
					trobjfixed.insertBefore(tdobj, null);
				}
			}
			if(tbodyobj!=null){
				tbodyobj.insertBefore(trobj, null);
				var j = 0;
				if(!this.firstDraw&&curdrawBeginTd>0){
					var tdobj = _doc.createElement('TD');
					if(curdrawBeginTd+1>1){
						tdobj.colSpan =  curdrawBeginTd;
						this.waitdrawrow = true;
					}
					trobj.insertBefore(tdobj, null);
					j = curdrawBeginTd;
				}
				do{
					var column = this.columnConfig[j];
					var value = row[column.name];

					var tdobj = _doc.createElement('TD');
					tdobj.noWrap = true;
					var id =[this.id];
					id.push('-');
					id.push(column.name);
					id.push('-');
					id.push(row.rownum);
					tdobj.id= id.join("");
					tdobj.onmouseout = function(){return nd();};
					tdobj.className="tdoverflow";
					column._doc = _doc;
					column.trobj = trobj;
					//tdobj.innerText = curdrawBeginTd+","+curdrawEndTd+(this.firstDraw?"#":"");
					column.show(row.rownum,value,row,tdobj,this);
					trobj.insertBefore(tdobj, null);
					this.setTdTextAlignStyle(column,tdobj);
					//IE6不支持insertBefore之前赋值
					if(column.id == "checkbox"&&(row["checked"] == true ||row["checked"] == "true"|| this.selectedall)){
						tdobj.firstChild.checked = true;
					}
					this.timers[this.timers.length] = setTimeout(function(){JQ(tdobj).data("colconfig",column);},50);
					if(curdrawEndTd!=0&&!this.firstDraw&&j== curdrawEndTd){
						var tdobj = _doc.createElement('TD');
						tdobj.colSpan =  cols-j-1;
						trobj.insertBefore(tdobj, null);
						this.waitdrawrow = true;
					}
					j++;
				}while((j<= curdrawEndTd || curdrawEndTd==0 ||this.firstDraw) && j < cols)
				return trobj;
			}
	}
	this.refreshDrawTrObj = function(row,trobj){
		// 创建每行的TR对象
		if(trobj!=undefined){
			var _doc = document;
			var len = trobj.cells.length;
			for(var j = 0; j < len; j++){
				var oldtdobj = trobj.childNodes(j) ;
				var id = oldtdobj.id.split("-")[1];
				var column = this.ColumnConfig[id];
				if(column!=null && column.id.indexOf(".input")==-1 && (column.type == 'M' || column.type == 'I')){
					var value = row[column.name];
					var tdobj = _doc.createElement('TD');
					tdobj.onmouseout = function(){return nd();};
					tdobj.noWrap = true;
					column._doc = _doc;
					column.show(row.rownum,value,row,tdobj,this);
					oldtdobj.replaceNode(tdobj);
					setTimeout(function(){JQ(tdobj).data("colconfig",column);},10);
				}
			}
		}
	}
	/*此方法不用*/
	this.refreshTable = function(){
		this.draw();
	}
	this.reDrawTrObj = function(rownum){
		var trobj = this.getTablebody().childNodes[rownum];
		this.refreshDrawTrObj(trobj.data,trobj);
	}
	this.getTableThs = function(){
		var ths = this.contentdiv.getElementsByTagName("TH");
		if(this.useThisHead)(new MutilTableHeads(ths)).setCellIndex();
		var nths = new Array();
		for(var i=0;i<ths.length;i++){
			var oth = ths[i];
			var cellindex = oth.cellIndex;
			if(oth.mycellindex!=null) cellindex= parseInt(oth.mycellindex);
			if(oth.colSpan==1){
				nths[cellindex]=oth;
			}
		}
		ths = nths;
		return ths;

	}
	function trRightContextMenu(){
		var _doc = document;
		var _trRightMenu = _doc.getElementById("ie5menu");
		if (_trRightMenu) {
			_doc.body.removeChild(_trRightMenu)
		}
		var _rightMenu = _doc
				.createElement('DIV');
		_rightMenu.id ="ie5menu";
		var _inHTML = _doc.getElementById("tabrightmenu").innerHTML;
		_rightMenu.innerHTML = _inHTML;
		_doc.body.appendChild(_rightMenu);
		JQ("body").bind("click", function() {
					JQ("body").unbind("click");
					return hidemenuie5("ie5menu")
				});
		return showmenuie5("ie5menu");
	}
	this.drawrow = function(_doc,startnum,tbodyobj,tbodyobjfixed){
		// 运行时间统计
		//var start = (new Date()).getTime();
		//var drawtrtime = [];
		var index = 0;
		//行对象增加右键菜单
		var isrightmenu = false;
		if(_doc.getElementById("tabrightmenu")){
			var _inHTML = _doc.getElementById("tabrightmenu").innerHTML;
			//只在主列表中显示右键菜单
			if(_inHTML != "" && this.tabletype=="MainList")isrightmenu = true;
		}
		for (var i = startnum; i < this.data.length && i < startnum+this.maxline; i++) {
    		var row = this.data[i];
    		row.rownum = i;
			//var start1 = (new Date()).getTime();
			this.drawTrObj(_doc,row,tbodyobj,tbodyobjfixed,index,isrightmenu);
			//drawtrtime.push((new Date()).getTime()-start1);
			index++;
    	}
		//window.status = ((new Date()).getTime()-start)+"MS("+startnum+")"+window.status;
	}


	this.drawToRow = function(startnum){
		if(this.rightscrollbar.offsetHeight>this.contentdiv.offsetHeight){
			//加一个判断startnum＜0的时候 表格取数据赋值会报错，所以至少从0开始 by zhoujiyong 20131224
			if(startnum < 0 ){
				this.draw(0);
			}else{
				this.draw(startnum);
			}
			var bakscroll = this.rightscroll.onscroll;
			this.rightscroll.onscroll = null;
			this.rightscroll.scrollTop = parseInt(((startnum)/ this.data.length) * this.rightscrollbar.offsetHeight);
			var datatable = this;
			if(bakscroll!=null){
				setTimeout(function(){
					datatable.rightscroll.onscroll = bakscroll;
				},0);
			}
		}else{
			//this.drawing = true;
			this.draw(0);
		}
		
	}
	this.sortFromCookie = function(){
		//var defaultSort = getCookie('howToSort');
		var defaultSort = getUserDataByElementId(this.id, this.tabletype+"_sort");
		var reList = [];
		if (typeof(defaultSort)!= "undefined" && defaultSort!=null && defaultSort != "") {
			var params = eval("(" + defaultSort + ")");
			var currentLN = location.href.split('?')[0];
			if(typeof(linkName)!= "undefined" ){
				currentLN = linkName;
			}
			if (params.linkname == currentLN) {
				if (params.sort.length > 0) {
					for (var i = 0; i < params.sort.length; i++) {
						if (params.sort[i].id == this.id) {
							try {
								this.data.sort(this.generateCompareFunc(params.sort[i].sortname, params.sort[i].sorttype, params.sort[i].idx));
								if(params.sort[i].order=='asc'){
								  for(var j=this.data.length-1;j>=0;j=j-1){//反向排序
									   reList[reList.length]=this.data[j];
								  }
								  this.data = reList;
							   }
							} catch(e) {}
						}
					}
				}
			}
		}
	}
	this.sortFromURL = function(){
		var sortInfo = getparam('howToSort');
		 if(sortInfo==null){
			this.sortFromCookie();
			return ;
		 }
		 var defaultSort;
		 defaultSort = decodeURIComponent(sortInfo);
		var reList = [];
		var params ={};
	    if (typeof(this.defaultSortObj) != "undefined"&&typeof(this.defaultSortObj.id) != "undefined") {
	    	params = this.defaultSortObj;
	    }else if(defaultSort!=""){
	    	params = eval("(" + defaultSort + ")");
	    }
		if (typeof(params.id)!="undefined") {
			if (params.id == this.id) {
				try {
					this.data.sort(this.generateCompareFunc(params.sortname, params.sorttype, params.idx));
					if(params.order=='asc'){
					  for(var j=this.data.length-1;j>=0;j=j-1){//反向排序
						   reList[reList.length]=this.data[j];
					  }
					  this.data = reList;
				   }
				} catch(e) {}
			}
	}
		
	}
	this.setColWidth = function(_doc,table,tablebody){
		if(this.data && this.data.length>0){
			if(typeof(_doc) == "undefined") _doc = document;
			var span = _doc.createElement("span");
			span.innerText = "宽";
			span.style.fontWeight = "bold";
			_doc.body.appendChild(span);
			var fontweight = span.offsetWidth;
			_doc.body.removeChild(span);
			span = null;
			if(typeof(table) == "undefined")
				var table = this.getMainTable();
			if(typeof(tablebody) == "undefined")
				var tablebody = this.getTablebody();
			if(tablebody.childNodes.length>0){
				var colgroups = table.getElementsByTagName("colgroup");
				if(colgroups.length>0){
					JQ(colgroups).remove();
					table.style.width = "100%";
					table.style.tableLayout= "auto";
				}
				var headstr = getUserDataByElementId(this.id, this.tabletype+"colswidth");
				var colswidthobj  = {};
				if(headstr){
					eval("colswidthobj = "+headstr);
				}
				var tablewidth = this.contentdiv.offsetWidth;
				var colstotalwidth = 0;
				var colhtml = [];
				colhtml.push("<colgroup>");
				var trobj = tablebody.childNodes[0];
				var ths = this.getTableThs();
				var widths = [];
				var colstyles = [];
				var limits = [];
				var limitwidth = 0;
				var len = trobj.cells.length;
				var serialcol = -1;
				var checkboxcol = -1;
				var radiocol = -1;
				for(j = 0; j < len ; j++){
					var tdobj = trobj.cells[j];
					var width = 0;
					var style = this.columnConfig[j].style;
					var title = ths[j].innerText;
					var titlewidth = title.length*fontweight+32;
					var colstyle = "";
					if(style!=null){
						var styles = style.split(";");
						for(var k=0;k<styles.length;k++){
							if(styles[k]!=null&&styles[k].indexOf("width")!=-1){
								width = styles[k].split(":")[1]	;
							}else{
								//if(this.useThisHead == null)
								colstyle += styles[k] + ";";
							}
						}
					}
					colstyles.push(colstyle);
					if(width == 0){
						width = tdobj.offsetWidth-1;
					}
					var id = this.columnConfig[j].id;
					if(id == "serial" ){
						serialcol = j;
						width = 60;
					}else if(id == "checkbox" ){
						checkboxcol = j;
						width = 60;
					}else if(id == "radio" ){
						radiocol = j;
						width = 35;
					}else{
						if(titlewidth > parseInt(width)) {
							width = titlewidth;
						}
					}
					if(parseInt(colswidthobj[this.columnConfig[j].name])>0){
						width = parseInt(colswidthobj[this.columnConfig[j].name]);
					}else if(parseInt(width)>350){
						limits.push(parseInt(width)-350);
						limitwidth += parseInt(width)-350;
					}

					try{
						var selfWidth = 0;
						if(this.columnConfig[j].columnwidth && this.columnConfig[j].columnwidth!= "null")
							var selfWidth = parseInt(this.columnConfig[j].columnwidth);
							if(selfWidth>width)width = selfWidth;
					}catch(err){}
					widths.push(parseInt(width));
					colstotalwidth += parseInt(width);
				}
				var islimit = false;
				if(tablewidth < colstotalwidth){
					if(tablewidth>colstotalwidth-limitwidth){
						limitwidth = tablewidth-(colstotalwidth-limitwidth);
					}else{
						limitwidth = 0;
					}
					islimit = true;
				}
				len = widths.length;
				colstotalwidth = 0;
				for(var j=0;j<len;j++){
					var width = widths[j];
					if(islimit && width>350){
						if(parseInt(colswidthobj[this.columnConfig[j].name])>0){
							width = parseInt(colswidthobj[this.columnConfig[j].name]);
						}else{
							if(limitwidth>0){
								width = 350 + limitwidth/limits.length;
							}else{
								width = 350;
							}
						}
					}
					colhtml.push("<col");
					colhtml.push(" width='");
					colhtml.push(width);
					colhtml.push("px");
					if(colstyles[j]!=""){
						colhtml.push("' style = '");
						colhtml.push(colstyles[j]);
					}
					colhtml.push("'>");
					colstotalwidth += width;
				}
				colhtml.push("</colgroup>");
				if(tablewidth > colstotalwidth){
						//width = (tablewidth-20) - colstotalwidth;
						//table.style.width = colstotalwidth;
				}
				JQ(colhtml.join("")).prependTo(JQ(table));
				colhtml = null;
				table.style.tableLayout= "fixed";
				var cols = table.getElementsByTagName("COL");
				len = cols.length;
				widths = new Array(len);
				var locklen = 0;
				var per = 0;
				if(serialcol>=0){
					locklen += (cols[serialcol].offsetWidth-60);
					widths[serialcol] = 60;
					per ++;
				}
				if(checkboxcol>=0){
					locklen += (cols[checkboxcol].offsetWidth-60);
					widths[checkboxcol] = 60;
					per ++;
				}
				if(radiocol>=0){
					locklen += (cols[radiocol].offsetWidth-35);
					widths[radiocol] = 35;
					per ++;
				}
				if(per == 0){
					locklen += (cols[0].offsetWidth-60);
					widths[0] = 60;
					per ++;
				}
				for(var j=0;j<len;j++ ){
					if(parseInt(colswidthobj[this.columnConfig[j].name])>0){
						var selfWidth = parseInt(colswidthobj[this.columnConfig[j].name]);
						locklen += (cols[j].offsetWidth-selfWidth);
						widths[j] = selfWidth;
						per ++;
					}
				}
				for(var j=0;j<len;j++ ){
					if(j!=serialcol && j!=checkboxcol && j!=radiocol && j!=0 && typeof(colswidthobj[this.columnConfig[j].name])=="undefined")
						widths[j] = cols[j].offsetWidth-1 + locklen/(len-per);
				}
				colstotalwidth = 0;
				for(var j=0;j<len;j++ ){
					if(widths[j]>0&&widths[j]!=Infinity){
						cols[j].width = widths[j];
						colstotalwidth += widths[j];
					}
				}
				if(colstotalwidth<=tablewidth){
					table.style.width = colstotalwidth;
				}else{
					table.style.width = "100%";
				}
				table.style.tableLayout= "auto";
				table.style.tableLayout= "fixed";
				this.drawEndTd = 0;
			}
    	}

	}
	this.draw = function(startnum){
		var start = (new Date()).getTime();

		//window.status = "";
		this.editer = null;
 	    var rebindFloatColBtn=false;
 	    if (this.data == null) this.data = new Array();
		if (this.data.length == 0) this.allpage_totaljson = {};
		if(typeof(this.beforeDraw)=="function"){
			this.beforeDraw();
		}
		if(this.data!=null&&(this.datalen==0||this.datalen!=this.data.length)){
			this.datalen = this.data.length;
			this.resetheight = true;
		}
		if(this.activetd){
			JQ(this.activetd).find("input").trigger("blur");
			this.activetd=null;
		}

		var _doc = document;
		var tableobj = null;
		var tbodyobj = null;
		var tbodyobjfixed = null;
		if(!this.isredraw&&this.getMainTable()!=null){
			tbodyobj = _doc.createElement("TBODY");
			tableobj = this.getMainTable();
			var tbodyobjold = this.getTablebody();
			tbodyobjold.replaceNode(tbodyobj);
			tbodyobjold = null;
			delete tbodyobjold;
			if(this.contentdivfixed.style.display == "block"){
				tbodyobjold = this.getTablebodyfixed();
				tbodyobjfixed = _doc.createElement("TBODY");
				tbodyobjold.replaceNode(tbodyobjfixed);
			}
			tbodyobjold = null;
			delete tbodyobjold;
		}else{
			if(this.headtrobj.getElementsByTagName("TH").length==0){
				this.setTableHead(this.getTableHead,true);
				rebindFloatColBtn=true;
			}
			tableobj = _doc.createElement("table");
			tableobj.id = this.id+'_table';
			tableobj.className = "main_table_98";
			//tableobj.style.tableLayout = "fixed"; 
			tableobj.onclick = rowcheck;
			tableobj.cellSpacing  = 0;
			tableobj.align  = "left";
			tableobj.datatable = this;
			if(this.contentdiv.children.length > 0){
				this.contentdiv.children(0).replaceNode(tableobj);
			}else{
				this.contentdiv.insertBefore(tableobj, null);
			}

			tableobj.insertBefore(this.headtrobj, null);

			// 追加Tbody对象
			tbodyobj = _doc.createElement("TBODY");
			tableobj.insertBefore(tbodyobj, null);
			this.isredraw = true;
			this.firstDraw = true;
		}
		// 计算起始显示的数据记录
		if (startnum == null) {
        	startnum = Math.floor(this.rightscroll.scrollTop/ this.TABLE_TR_H);
        	
       	}
       	
    	if(this.data == null){
	    	// 如果没有数据则返回
    		return null
    	}
    	
    	this.startRowNum = startnum;
    	this.drawrow(_doc,startnum,tbodyobj,tbodyobjfixed);
		if(this.isredraw||tableobj.getElementsByTagName("colgroup").length==0){
			this.setColWidth(_doc,tableobj,tbodyobj);
		}

		this.drawing = false;
		this.isredraw = false;
		this.redrawed = true;

		var datatable = this;
		this.timers[this.timers.length] = window.setTimeout(function(){
			if(datatable.isCreateAmtColumn)datatable.sumMainAmtToColumn(datatable.totalColumn);	
			if(datatable.resetheight)datatable.resetscroll();
		},50);
		 
		var sumByVou = false;
		if(typeof(this.allpage_totaljson)!="undefined"&&typeof(this.allpage_totaljson["row_num"])!="undefined"){
				sumByVou = true;
		}
		if(!sumByVou){ //不分页，非编辑列进行动态合计
			createAmtTotal(this);
		}
		if(typeof(this.afterDraw)=="function"){
			this.afterDraw();
		}
		
		if(this.allflag && this.isShowCheckBox){
			var q = JQ("#"+this.id+"total_text");
			if(!this.totalTextName){ //第一次画列表初始化执行一次就行。防止覆盖
				this.totalTextName = q.text();
			}
		}
		//window.status = "draw:"+ ((new Date()).getTime()-start)+"(ms)"+window.status;
	}

	this.drawfixed = function(){
		window.status = "";
		// 运行时间统计
		var start = (new Date()).getTime(); 
		if(this.contentdivfixed.innerHTML == ""){
			var tableobjfixed = this.contentdiv.firstChild.cloneNode(true);	
			tableobjfixed.onclick = rowcheck;
			this.contentdivfixed.insertBefore(tableobjfixed, null);
		}
		this.contentdivfixed.style.display = 'block';
		var _doc = document;
		var tbodyobj = null;
		var tbodyobjfixed = null;

		tbodyobjold = this.getTablebodyfixed();
		tbodyobjfixed = _doc.createElement("TBODY");
		tbodyobjold.replaceNode(tbodyobjfixed);	
		tbodyobjold = null;
       	
    	if(this.data == null){
	    	// 如果没有数据则返回
    		return null
    	}
    	startnum = this.startRowNum;
		//window.status = "draw:"+ ((new Date()).getTime()-start)+"(ms)"+window.status;
    	
    	this.drawrow(_doc,startnum,null,tbodyobjfixed);

		//设置多表头中全选的状态
		var isselectall = JQ("table tbody tr:first-child th input:checkbox",JQ(this.contentdiv)).attr("checked");
		JQ("table tbody tr:first-child th input:checkbox",JQ(this.contentdivfixed)).attr("checked",isselectall);

		var datatable = this;
		this.timers[this.timers.length] = window.setTimeout(function(){
			if(datatable.isCreateAmtColumn)datatable.sumMainAmtToColumn(datatable.totalColumn);	
		},1);
	   
		this.headeventhandler(this.getHeadbodyfixed());

 		//if(rebindFloatColBtn)this.bindFloatColBtn();
		//window.status = "draw:"+ ((new Date()).getTime()-start)+"(ms)"+window.status;

		var trs = this.contentdivfixed.getElementsByTagName("tr");
		for(var i= trs.length-1;i>=1;i--){
			if(trs[i].data) trs[i].style.background = "#EEE";
			if(trs[i].TotalRow) trs[i].style.background = "#EEE";
		}

	}

	//金额合计栏
	this.appendAmtColumn = function(heads,_heads){	
	 	this.totalColumn = new Array();
	 	for(var prp in this.allpage_totaljson ){
			if("load_total" != prp && "row_num" != prp){
				this.totalColumn[this.totalColumn.length] = prp;
			}
		}
		var useTotalSet =false;

		 //产生表头代码		
		var style = 'style="display:none "'; 
		if(this.isCreateAmtColumn&&this.isContainsAmtColumn(heads)){
	 		//显示
			style = ''; 
	 	}
		_heads.push('<tr id="');
		_heads.push(this.id);
		_heads.push('_tot" class="main_table_title_letter" TotalRow="true" ');
		_heads.push(style);
		_heads.push('>');
	 	//this.headHTML += '<tr id="'+this.id+'_tot" class="main_table_title_letter" TotalRow="true" '+style+'>';

		for(var i=0;i<heads.length;i++){
			var head = heads[i];
			var config = this.ColumnConfig[head.toLowerCase()];
			var zero = config && config.type=="M"?"0.00":"0";
			var tdclass = '';
			useTotalSet =false
			if(i==0){
				_heads.push('<td nowrap="nowrap" ');
				_heads.push(tdclass);
				_heads.push('><a id="');
				_heads.push(this.id);
				var sumByVou = false;
				if(typeof(this.allpage_totaljson)!="undefined"&&typeof(this.allpage_totaljson["row_num"])!="undefined"){
					sumByVou = true;
			}
				if(sumByVou){
					_heads.push('total_text" >所有合计</a>');
				}else{
					_heads.push('total_text" >合计</a>');
				}
			    //this.headHTML += '<td nowrap="nowrap" '+tdclass+'><a id="'+this.id+'total_text" >合计</a>';
				/*
				if(this.totalColumn.length>0){
					_heads.push('<img src="');
					_heads.push('/images/actions/btn-arrow.gif" id="img_arrow" align="absmiddle" style="cursor:pointer;" onclick="');
					_heads.push(this.id);
					_heads.push('.showtotalmenu(this.parentElement)" />');

	    				//this.headHTML +='<a id="total_curpage" onclick="'+this.id+'.closetotalmenu(this)">当前合计</a><a id="total_allpage" onclick="'+this.id+'.closetotalmenu(this)">所有合计</a>'+'</div>';
				}
				*/
				_heads.push('</td>');
				//this.headHTML +='</td>';
			}else{
				//先校验配置
				for(var a =0;a<this.totalColumn.length;a++){
					if(head.toLowerCase()==this.totalColumn[a]){
						useTotalSet=true;
						break;
					}
				}
				_heads.push('<td nowrap="nowrap" ');
				_heads.push(tdclass);
				//by jzy 原先逻辑有误：只要配置问数值或金额字段，调用VaoDAO接口查询useTotalSet为真，就一定产生合计值。不受合计字段控制。
				//if(useTotalSet && (config.type=="M"||config.type=="I") || this.containsListElement(head)){
				if((config&&(config.type=="M"||config.type=="I")) && this.containsListElement(head)){
					    var amtflag = config.amtflag;
						if (null == amtflag || "" == amtflag || "2" == amtflag) {
							amtflag = 1;
						}
						var nlen = 2;
						if (amtflag == "10000") {
							//nlen =6;
						}
						if(head.indexOf(".")!=-1)head=head.substring(0, head.indexOf("."))	;//支持*.input	
						var value = this.allpage_totaljson[head];
						if(value != null && value != undefined){
							try {
								if (config.type == "I") {
									value = isNaN(String(value)) ? "0": String(value);
								} else {
									value = Math.round((value / amtflag) * Math.pow(10, nlen)) / Math.pow(10, nlen);
									value = String(value).toMoneyFormat();
								}
							} catch(exception) {}
						}else{
							value = zero;
						}
						var g = this.id+"sumAmtColumnid"+head;
						_heads.push('id="');
						_heads.push(this.id);
						_heads.push("sumAmtColumnid");
						_heads.push(head);
						_heads.push('" align="right" ');
						_heads.push('>');
						_heads.push(value);
						_heads.push('</td>');
						//this.headHTML += '<td nowrap="nowrap" id="'+g+'" align="right" '+tdclass+'>'+zero+'</td>';
				}else{	
					_heads.push('>&nbsp;</td>');
					//this.headHTML += '<td nowrap="nowrap" '+tdclass+'>&nbsp;</td>';
				}
			}			
		}
		_heads.push('</tr>');
		//this.headHTML += '</tr>';	
	}
	
	/*
		显示合计方式层
	*/
 this.showtotalmenu =function(totaltd){
		
		var showSelectCount = this.isShowRadio||this.isShowCheckBox;

		var _heads = [];
		_heads.push('<div id ="total_menu" style="z-index:9">');

	   //this.headHTML +='<img src="'+ ROOT_PATH+'/images/actions/btn-arrow.gif" id="img_arrow" align="absmiddle" style="cursor:pointer;" onclick="'+this.id+'.showtotalmenu()" />'+'<div id ="total_menu" style="z-index:9">';
		if(showSelectCount){
			_heads.push('<a id="total_selected" onclick="');
			_heads.push(this.id);
			_heads.push('.closetotalmenu(this)">选择合计</a>');
			//this.headHTML +='<a id="total_selected" onclick="'+this.id+'.closetotalmenu(this)">选择合计</a>'
		}
		_heads.push('<a id="total_curpage" onclick="');
		_heads.push(this.id);
		_heads.push('.closetotalmenu(this)">当前合计</a><a id="total_allpage" onclick="');
		_heads.push(this.id);
		_heads.push('.closetotalmenu(this)">所有合计</a>');
		_heads.push('</div>');
		
		var totalmenu = JQ(_heads.join(""));
		totalmenu.appendTo(JQ(totaltd));

		//得到鼠标位置设置浮动层位置
		var e = window.event;
 		var obj = mousePosition(e);
 		totalmenu.offset().left = obj.x;
 		totalmenu.offset().top = (obj.y);
		totalmenu.show();
	    window.document.body.onclick = function(){
			if(event.srcElement.id!="img_arrow"&&!totalmenu[0].contains(event.srcElement)){
				totalmenu.hide();
				window.document.body.onclick = null;
			}
		}
	}
	
	/*
		关闭合计方式层
	*/
	this.closetotalmenu = function(obj){
		var total_menu_div = obj.parentElement;
		var _parent = JQ(this.parent);
		var _totalbar = JQ("#" + this.id + "_tot", _parent);
		var _totaltext = JQ("#" + this.id + "total_text", _totalbar);
		var text = obj.innerHTML;
		_totaltext.text(text);
		if(text.length>2){
		   JQ("table colgroup col:first-child",_parent).width("60px");
		}
		total_menu_div.style.display="none";
		this.changetotalresult(obj);
	}
	/*
		改变合计值
	*/	
	this.changetotalresult = function(obj){
		if(obj.id=="total_curpage"){//当前页合计
			this.totalColumn.curtag="curpage";
			
			this.sumMainAmtToColumn(this.totalColumn);
		} else if(obj.id=="total_allpage"){//所有页合计
			this.totalColumn.curtag="allpage";
			for(var prp in this.allpage_totaljson ){
				var total_name = this.id+"sumAmtColumnid"+prp;
				var total_value=eval("this.allpage_totaljson."+prp)
				var nlen =2;
				if(this.amtflag=="10000"){
					//nlen =6;
				}
				//列数据类型
				var columnType;
				//整数判断,如果为整数,则合计无小数位,此处获取列数据类型
				for(var m=0;m<this.columnConfig.length;m++){
					var tempa = this.columnConfig[m].id;
					if(tempa.indexOf(".")!=-1)tempa=tempa.substring(0, tempa.indexOf("."));
					if(tempa==prp){
						columnType = this.columnConfig[m].type;
						break;
					}	
				}
				total_value = Math.round((total_value/this.amtflag)*Math.pow(10,nlen))/Math.pow(10,nlen);
				//如为整数,则不进行小数位转换
				if(columnType == "I"){					
					document.getElementById(total_name).innerHTML=(total_value+"");
				} else {
					document.getElementById(total_name).innerHTML=(total_value+"").toMoneyFormat();
				}
			}
		} else {//选择行合计
			this.totalColumn.curtag="selectpage";
			this.sumMainAmtToColumn(this.totalColumn);
		}
	}
	
	this.containsListElement = function(head){
		var ohead = head.replace(/.input/,"");
		for(var a =0;a<this.columnList.length;a++){
			if(head.toLowerCase()==this.columnList[a]||ohead.toLowerCase()==this.columnList[a]){
				return true;
				break;
			}
		}
		return false;
	}
	//判断是否含有金额栏
	this.isContainsAmtColumn = function(heads){	

		for(var a =0;a<this.columnList.length;a++){
			for(var i=0;i<heads.length;i++){
				var head = heads[i].toLowerCase();
				var ohead = head.replace(/.input/,"");
				if(head==this.columnList[a]||ohead==this.columnList[a]){
					return true;
				}				
			}
		}

		return false;
	
	}
	//分面签中有些没有在JSON串中返回所有合计，通过JSON串从后台中取值。
	this.loadAllPageTotal = function(){
		var url = "/common/loadallpagetotal.do?linkname="+this.linkname+"&mainmenu="+this.mainmenu+"&submenu="+this.submenu+"&random="+Math.random();
		var datatable = this;
		var myAjax = new Ajax.Request(url, 
		{
				   method : 'post', 
				   parameters : "",
				   asynchronous : true,
				   onComplete : function(resp){ 
							try{
								eval("var totalcols = "+resp.responseText);
								datatable.allpage_totaljson = totalcols;
								datatable.sumMainAmtToColumn(datatable.totalColumn);
							}catch(err){}
						},
				   onFailure : function(resp) {
					  //alert("网络异常");
					}
		}); 
	}

	//注入合计对象
	this.setallpagetotaljson = function(totalObj){
		this.UseOtherTotaljson = true;
		this.custom_totaljson = totalObj;
		for(var attr in this.custom_totaljson){
			this.allpage_totaljson[attr] = this.custom_totaljson[attr];
		}
		this.sumMainAmtToColumn(this.totalColumn);
	}
	//将金额汇总
	this.sumMainAmtToColumn2 = function(totaldbList,isAmtinput) {
		var totalList = new Array();
		if (totaldbList == null || totaldbList.length == 0) {
			totalList = this.columnList;
		} else {
			totalList = totaldbList;
		}
		selectrows = this.getSelectedRow();
		var _doc = document;
		var _parent = JQ(this.parent);
		var _totalbar = JQ("#" + this.id + "_tot", _parent);
		var prefix = "#" + this.id + "sumAmtColumnid";
		/*
		if (this.tabletype == "DetailList" && selectrows.length == 0) {
			selectrows = this.data;
		} 
		*/
		if(this.allpage_totaljson["row_num"]!=undefined && this.page_totalRecord!=this.allpage_totaljson["row_num"]){
			this.allpage_totaljson["load_total"] = "true";
		}
		if (selectrows.length == 0 && "{}" != Object.toJSON(this.allpage_totaljson) && this.allpage_totaljson["row_num"]!=undefined && this.allflag != false ) {
			//清零
			for (var a = 0; a < totalList.length; a++) {
				var totalStr = totalList[a];
				var columnid = totalStr;
				if (typeof(this.ColumnConfig[columnid]) == 'undefined') continue;
				var amtflag = this.ColumnConfig[columnid].amtflag;
				var columnType = this.ColumnConfig[columnid].type;
				if (null == amtflag || "" == amtflag || "2" == amtflag) {
					amtflag = 1;
				}
				var nlen = 2;
				if (amtflag == "10000") {
					//nlen =6;
				}
				//当金额为可编辑状态时带.input，要截取
				if (totalStr.indexOf(".") != -1) totalStr = totalStr.substring(0, totalStr.indexOf("."));
				try {
					var q = JQ(prefix + totalStr, _totalbar);
					if (columnType == "I") {
						var value = 0;
						var config = this.ColumnConfig[columnid];
						var pattern = config.pattern;
						if(pattern!=null && pattern.trim().length>2 && value!=null){ //不页数值格式合计也需要处理一下
							var fmtarr = pattern?pattern.split('.'):[''];
							var fmt=fmtarr.length>1?fmtarr[1]:'0';
							if(fmt!='0'){
								value = numberFormat(value.toFixed(fmt.length),pattern);
							}else{
								value = numberFormat(Math.round(value),pattern);
							}
						}
						q.text(String(value));
					} else {
						q.text("0.00");
					}
				} catch(exception) {}
			}			

			if(this.allpage_totaljson["load_total"] == "true"){
				this.loadAllPageTotal();
				return ;
			}
			for (var prp in this.allpage_totaljson) {
				// 可编辑列带.input
				var config = this.ColumnConfig[prp] || this.ColumnConfig[prp+".input"]
				var total_name = prefix + prp;
				var value = this.allpage_totaljson[prp];
				if(value != null && value != undefined){
					try {
						if (config.type == "I") {
							value = isNaN(String(value)) ? "0": String(value);
						} else {
							var amtflag = config.amtflag;
							if (null == amtflag || "" == amtflag || "2" == amtflag) {
								amtflag = 1;
							}
							var nlen = 2;
							if (this.amtflag == "10000") {
								//nlen =6;
							}
							value = Math.round((value / amtflag) * Math.pow(10, nlen)) / Math.pow(10, nlen);
							value = String(value).toMoneyFormat();
						}
					} catch(exception) {}
				}else{
					value = config && config.type=="M"?"0.00":"0";
				}
				if(typeof(config)!="undefined"){
					var pattern = config.pattern;
					if(config.type=="I"&&pattern!=null && pattern.trim().length>2 && value!=null){ //不分页数值格式合计也需要处理一下
						var fmtarr = pattern?pattern.split('.'):[''];
						var fmt=fmtarr.length>1?fmtarr[1]:'0';
						if(fmt!='0'){
							value = numberFormat(value.toFixed(fmt.length),pattern);
						}else{
							value = numberFormat(Math.round(value),pattern);
						}
					}
				}
				JQ(total_name, _totalbar).text(value);
			}
		} else {
			if(selectrows.length == 0){ //这个是默认初始化页面进行当前页合计的，以后统一使用业务系统传入的值
				selectrows = this.data;
			}
			var sumAmtColumns = new Array();
				for (var i = 0; selectrows!=null&&i < selectrows.length; i++) {

					for (var a = 0; a < totalList.length; a++) {
						var totalStr = totalList[a];
						var columnid = totalStr;
						var config = this.ColumnConfig[columnid] || this.ColumnConfig[columnid+".input"];
						if (config == null) continue;
						if (totalStr.indexOf(".") != -1) totalStr = totalStr.substring(0, totalStr.indexOf("."));
						if (typeof sumAmtColumns[totalStr] == 'undefined') sumAmtColumns[totalStr] = '0.00';
						var m = '0.00';
						if(config.id.indexOf(".input")>0&&config.istotal=="0"){ //可编辑合计字段配置 “编辑合计”为否， 则 不进行合计
							continue;
						}
						
						if(this.UseOtherTotaljson&&typeof(this.allpage_totaljson[totalStr])!=undefined&&this.data.length==selectrows.length){//如果
							sumAmtColumns[totalStr] =  parseFloat(this.allpage_totaljson[totalStr]);
							continue;
						}
					  
						if(this.isShowRadio&&selectrows.length==1){ //单选
							sumAmtColumns[totalStr] =  parseFloat(this.allpage_totaljson[totalStr]);
						}else{
							if (typeof(selectrows[i][totalStr]) != 'undefined') {
								m = String(selectrows[i][totalStr]);
							}
							if (m != null) m = m.replace(/,/g, "");
							if (!isNaN(parseFloat(m))) sumAmtColumns[totalStr] = accAdd(parseFloat(sumAmtColumns[totalStr]), parseFloat(m));
						 if(this.data.length==selectrows.length){ //将页面合计的值放到合计对象中
							 this.allpage_totaljson[totalStr] = sumAmtColumns[totalStr];
						 }
						}
					}
				}
			for (var a = 0; a < totalList.length; a++) {
				var totalStr = totalList[a];
				var columnid = totalStr;
				var config = this.ColumnConfig[columnid] || this.ColumnConfig[columnid+".input"];
				if (config == null) continue;
				var amtflag = config.amtflag;
				var columnType = config.type;
				var pattern = config.pattern;
				if (null == amtflag || "" == amtflag || "2" == amtflag) {
					amtflag = 1;
				}
				var nlen = 2;
				if (amtflag == "10000") {
					//nlen =6;
				}
				//当金额为可编辑状态时带.input，要截取
				if (totalStr.indexOf(".") != -1) totalStr = totalStr.substring(0, totalStr.indexOf("."));
				try {
					var q = JQ(prefix + totalStr, _totalbar);
					if (columnType == "I") {
						value = sumAmtColumns[totalStr];
						value = isNaN(String(value)) ? "0": value;						
						if(pattern!=null && pattern.trim().length>2 && value!=null){
							var fmtarr = pattern?pattern.split('.'):[''];
							var fmt=fmtarr.length>1?fmtarr[1]:'0';
							if(fmt!='0'){
								value = numberFormat(value.toFixed(fmt.length),pattern);
							}else{
								value = numberFormat(Math.round(value),pattern);
							}
						}
						q.text(String(value));
					} else {
						sumAmtColumns[totalStr] = Math.round((sumAmtColumns[totalStr] / amtflag) * Math.pow(10, nlen)) / Math.pow(10, nlen);
						q.text(String(sumAmtColumns[totalStr]).toMoneyFormat());
					}
				} catch(exception) {}

			}
		}
		
	}
	
	//将金额汇总
	this.sumMainAmtToColumn = function(totaldbList,isAmtinput) {
		var totalList = new Array();
		if (totaldbList == null || totaldbList.length == 0) {
			totalList = this.columnList;
		} else {
			totalList = totaldbList;
		}
		selectrows = this.getSelectedRow();
		var _doc = document;
		var _parent = JQ(this.parent);
		var _totalbar = JQ("#" + this.id + "_tot", _parent);
		var prefix = "#" + this.id + "sumAmtColumnid";
		/*
		if (this.tabletype == "DetailList" && selectrows.length == 0) {
			selectrows = this.data;
		} 
		*/
		if(this.allpage_totaljson["row_num"]!=undefined && this.page_totalRecord!=this.allpage_totaljson["row_num"]){
			this.allpage_totaljson["load_total"] = "true";
		}
		if (selectrows.length == 0 && "{}" != Object.toJSON(this.allpage_totaljson) &&this.allpage_totaljson["row_num"]!=undefined && this.allflag != false ) {
			if(this.allflag && this.isShowCheckBox){
				var q = JQ("#"+this.id+"total_text",_totalbar);
				q.text(this.totalTextName);	
			}
			//清零
			for (var a = 0; a < totalList.length; a++) {
				var totalStr = totalList[a];
				var columnid = totalStr;
				if (typeof(this.ColumnConfig[columnid]) == 'undefined') continue;
				var amtflag = this.ColumnConfig[columnid].amtflag;
				var columnType = this.ColumnConfig[columnid].type;
				if (null == amtflag || "" == amtflag || "2" == amtflag) {
					amtflag = 1;
				}
				var nlen = 2;
				if (amtflag == "10000") {
					//nlen =6;
				}
				//当金额为可编辑状态时带.input，要截取
				if (totalStr.indexOf(".") != -1) totalStr = totalStr.substring(0, totalStr.indexOf("."));
				try {
					var q = JQ(prefix + totalStr, _totalbar);
					if (columnType == "I") {
						var value = 0;
						var config = this.ColumnConfig[columnid];
						var pattern = config.pattern;
						if(pattern!=null && pattern.trim().length>2 && value!=null){ //不分页数值格式合计也需要处理一下
							var fmtarr = pattern?pattern.split('.'):[''];
							var fmt=fmtarr.length>1?fmtarr[1]:'0';
							if(fmt!='0'){
								value = numberFormat(value.toFixed(fmt.length),pattern);
							}else{
								value = numberFormat(Math.round(value),pattern);
							}
						}
						q.text(String(value));
					} else {
						q.text("0.00");
					}
				} catch(exception) {}
			}			

			if(this.allpage_totaljson["load_total"] == "true"){
				this.loadAllPageTotal();
				return ;
			}
			for (var prp in this.allpage_totaljson) {
				// 可编辑列带.input
				var config = this.ColumnConfig[prp] || this.ColumnConfig[prp+".input"]
				var total_name = prefix + prp;
				var value = this.allpage_totaljson[prp];
				if(value != null && value != undefined){
					try {
						if (config.type == "I") {
							value = isNaN(String(value)) ? "0": String(value);
						} else {
							var amtflag = config.amtflag;
							if (null == amtflag || "" == amtflag || "2" == amtflag) {
								amtflag = 1;
							}
							var nlen = 2;
							if (this.amtflag == "10000") {
								//nlen =6;
							}
							value = Math.round((value / amtflag) * Math.pow(10, nlen)) / Math.pow(10, nlen);
							value = String(value).toMoneyFormat();
						}
					} catch(exception) {}
				}else{
					value = config && config.type=="M"?"0.00":"0";
				}
				if(typeof(config)!="undefined"){
					var pattern = config.pattern;
					if(config.type=="I"&&pattern!=null && pattern.trim().length>2 && value!=null){ //不分页数值格式合计也需要处理一下
						var fmtarr = pattern?pattern.split('.'):[''];
						var fmt=fmtarr.length>1?fmtarr[1]:'0';
						if(fmt!='0'){
							value = numberFormat(value.toFixed(fmt.length),pattern);
						}else{
							value = numberFormat(Math.round(value),pattern);
						}
					}
				}
				JQ(total_name, _totalbar).text(value);
			}
			
		} else {
			if(selectrows.length ==1 && this.isShowRadio == true &&!isAmtinput&&!this.isTotalbyRadio){ // 单选不可编辑列表，不支持选择合计。 add by jzy 20130315
			 	return;
			}
			if(selectrows.length == 0){ //这个是默认初始化页面进行当前页合计的，
				selectrows = this.data;
				var q = JQ("#"+this.id+"total_text",_totalbar);
				if(selectrows.length>0&&this.allflag){ //分页修改合计信息
					q.text("当前合计");
				}
				this.totalTextName = q.text(); 
			}else if(this.allflag){
					var q = JQ("#"+this.id+"total_text",_totalbar);
				 	q.text("选择合计");
			}
			var tempSelectedRow = this.getSelectedRow();
			var sumAmtColumns = new Array();
				for (var i = 0; selectrows!=null&&i < selectrows.length; i++) {
					for (var a = 0; a < totalList.length; a++) {
						var totalStr = totalList[a];
						var columnid = totalStr;
						var config = this.ColumnConfig[columnid] || this.ColumnConfig[columnid+".input"];
						if (config == null) continue;
						if (totalStr.indexOf(".") != -1) totalStr = totalStr.substring(0, totalStr.indexOf("."));
						if (typeof sumAmtColumns[totalStr] == 'undefined') sumAmtColumns[totalStr] = '0.00';
						var m = '0.00';
						
						if(this.UseOtherTotaljson&&typeof(this.allpage_totaljson[totalStr])!=undefined&&this.data.length==selectrows.length){//如果
							sumAmtColumns[totalStr] =  parseFloat(this.allpage_totaljson[totalStr]);
							continue;
						}
						var selectedRadio = false;//是否计算单个radio行; 当有选中行时，再根据其他条件计算
					  	
					  	if(tempSelectedRow && tempSelectedRow.length > 0){
					  		selectedRadio = true;
					  	}
						if(this.isShowRadio && selectrows.length==1 && selectedRadio && !this.isTotalbyRadio){ //单选
							sumAmtColumns[totalStr] =  parseFloat(this.allpage_totaljson[totalStr]);
						}else{
							if (typeof(selectrows[i][totalStr]) != 'undefined') {
								m = String(selectrows[i][totalStr]);
							}
							if (m != null) m = m.replace(/,/g, "");
							if (!isNaN(parseFloat(m))) sumAmtColumns[totalStr] = accAdd(parseFloat(sumAmtColumns[totalStr]), parseFloat(m));
							 if(this.data.length==selectrows.length&&!this.allflag){
								 this.allpage_totaljson[totalStr] = sumAmtColumns[totalStr];
							 }
						}
					}
				}
			for (var a = 0; a < totalList.length; a++) {
				var totalStr = totalList[a];
				var columnid = totalStr;
				var config = this.ColumnConfig[columnid] || this.ColumnConfig[columnid+".input"];
				if (config == null) continue;
				var amtflag = config.amtflag;
				var columnType = config.type;
				var pattern = config.pattern;
				if (null == amtflag || "" == amtflag || "2" == amtflag) {
					amtflag = 1;
				}
				var nlen = 2;
				if (amtflag == "10000") {
					//nlen =6;
				}
				//当金额为可编辑状态时带.input，要截取
				if (totalStr.indexOf(".") != -1) totalStr = totalStr.substring(0, totalStr.indexOf("."));
				try {
					var q = JQ(prefix + totalStr, _totalbar);
					if (columnType == "I") {
						value = sumAmtColumns[totalStr];
						value = isNaN(String(value)) ? "0": value;
						if(pattern!=null && pattern.trim().length>2 && value!=null){
							var fmtarr = pattern?pattern.split('.'):[''];
							var fmt=fmtarr.length>1?fmtarr[1]:'0';
							if(fmt!='0'){
								value = numberFormat(value.toFixed(fmt.length),pattern);
							}else{
								value = numberFormat(Math.round(value),pattern);
							}
						}
						q.text(String(value));
					} else {
						sumAmtColumns[totalStr] = Math.round((sumAmtColumns[totalStr] / amtflag) * Math.pow(10, nlen)) / Math.pow(10, nlen);
						q.text(String(sumAmtColumns[totalStr]).toMoneyFormat());
					}
				} catch(exception) {}

			}
		}
		
	}
	this.getSumAmt = function(totalStr){
		var _parent = JQ(this.parent);
		var _totalbar = JQ("#" + this.id + "_tot", _parent);
		var prefix = "#" + this.id + "sumAmtColumnid";
		var q = JQ(prefix + totalStr, _totalbar);
		if(q.text()!="")return Number(q.text().replace(/,/g,""));
	}
	this.redrawSumAmt = function(sumObj){ //自定义合计接口
		if(typeof(sumObj)!="object"){
			return;
		} 
			var instance = this;
			window.setTimeout (function(){
				var totalList = new Array();
				var totaldbList = instance.totalColumn;
				if (totaldbList == null || totaldbList.length == 0) {
					totalList = instance.columnList;
				} else {
					totalList = totaldbList;
				}
				for(var pre in sumObj){
					for (var a = 0; a < totalList.length; a++) {
						var totalStr = totalList[a];
						var columnid = totalStr;
						var config = instance.ColumnConfig[columnid] || instance.ColumnConfig[columnid+".input"];
						if (config == null) continue;
						var amtflag = config.amtflag;
						var columnType = config.type;
						if (null == amtflag || "" == amtflag || "2" == amtflag) {
							amtflag = 1;
						}
						var nlen = 2;
						if (amtflag == "10000") {
							//nlen =6;
						}
						//当金额为可编辑状态时带.input，要截取
						if (totalStr.indexOf(".") != -1) totalStr = totalStr.substring(0, totalStr.indexOf("."));
						if(totalStr!=pre){
							continue;
						}
						try {
							var _val = sumObj[pre];
							_val = Math.round((_val / amtflag) * Math.pow(10, nlen)) / Math.pow(10, nlen);
							var _parent = JQ(instance.parent);
							var _totalbar = JQ("#" + instance.id + "_tot", _parent);
							var prefix = "#" + instance.id + "sumAmtColumnid";
							var q = JQ(prefix + totalStr, _totalbar);
								//q.text(String(sumAmtColumns[totalStr]).toMoneyFormat());
							q.text(String(_val).toMoneyFormat());
						} catch(exception) {
						}
					}
				}
			},90);
	}
	function createAmtTotal(tableObj){
	   window.setTimeout(function(){
				   if(typeof(tableObj)=="undefined"){
						return ;
					}
					var instance = tableObj;
					var totalList = new Array();
					var totaldbList = instance.totalColumn;
					if (totaldbList == null || totaldbList.length == 0) {
						totalList = instance.columnList;
					} else {
						totalList = totaldbList;
					}
					selectrows = instance.getSelectedRow();
					var _doc = document;
					var _parent = JQ(instance.parent);
					var _totalbar = JQ("#" + instance.id + "_tot", _parent);
					var prefix = "#" + instance.id + "sumAmtColumnid";
					if(instance.allpage_totaljson["row_num"]!=undefined && instance.page_totalRecord!=instance.allpage_totaljson["row_num"]){
						instance.allpage_totaljson["load_total"] = "true";
					}
					if(instance.isShowRadio || (!instance.isShowRadio && selectrows.length == 0)){
						selectrows = instance.data;
					}
						
						
					var sumAmtColumns = new Array();
						for (var i = 0; selectrows!=null&&i < selectrows.length; i++) {

							for (var a = 0; a < totalList.length; a++) {
								var totalStr = totalList[a];
								var columnid = totalStr;
								var config = instance.ColumnConfig[columnid] || instance.ColumnConfig[columnid+".input"];
								if (config == null) continue;
								if (totalStr.indexOf(".") != -1) totalStr = totalStr.substring(0, totalStr.indexOf("."));
								if (typeof sumAmtColumns[totalStr] == 'undefined') sumAmtColumns[totalStr] = '0.00';
								var m = '0.00';
				 
									if (typeof(selectrows[i][totalStr]) != 'undefined') {
										m = String(selectrows[i][totalStr]);
									}
									if (m != null) m = m.replace(/,/g, "");
									if (!isNaN(parseFloat(m))) sumAmtColumns[totalStr] = accAdd(parseFloat(sumAmtColumns[totalStr]), parseFloat(m));
								 if(instance.data.length==selectrows.length){ //将页面合计的值放到合计对象中
									 instance.allpage_totaljson[totalStr] = sumAmtColumns[totalStr];
								 }
								
							}
						}
					for (var a = 0; a < totalList.length; a++) {
						var totalStr = totalList[a];
						var columnid = totalStr;
						var config = instance.ColumnConfig[columnid] || instance.ColumnConfig[columnid+".input"];
						if (config == null) continue;
						var amtflag = config.amtflag;
						var columnType = config.type;
						var pattern   = config.pattern;
						if (null == amtflag || "" == amtflag || "2" == amtflag) {
							amtflag = 1;
						}
						var nlen = 2;
						if (amtflag == "10000") {
							//nlen =6;
						}
						//当金额为可编辑状态时带.input，要截取
						if (totalStr.indexOf(".") != -1) totalStr = totalStr.substring(0, totalStr.indexOf("."));
						try {
							var q = JQ(prefix + totalStr, _totalbar);
							if (columnType == "I") {
								value = sumAmtColumns[totalStr];
								value = isNaN(String(value)) ? "0": value;
								if(pattern!=null && pattern.trim().length>2 && value!=null){
									var fmtarr = pattern?pattern.split('.'):[''];
									var fmt=fmtarr.length>1?fmtarr[1]:'0';
									if(fmt!='0'){
										value = numberFormat(value.toFixed(fmt.length),pattern);
									}else{
										value = numberFormat(Math.round(value),pattern);
									}
								}
								q.text(String(value));
							} else {
								sumAmtColumns[totalStr] = Math.round((sumAmtColumns[totalStr] / amtflag) * Math.pow(10, nlen)) / Math.pow(10, nlen);
								q.text(String(sumAmtColumns[totalStr]).toMoneyFormat());
							}
						} catch(exception) {}

					} 
				},70);
	}
	

	// 返回选中行的数组
	this.getSelectedRow = function(){
		var l = new Array();
		var billids = "";
		var billidcodes = "";
		var bounds = "";
		if(this.data!=null){
		for(var i=0;i<this.data.length;i++){
			if(this.data[i].checked){
				l[l.length] = this.data[i];
				if(this.data[i].billid){
					billids += (billids.length>0?",":"")+ this.data[i].billid;
				}
				if(this.data[i].billidcodes){
					billidcodes +=(billidcodes.length>0?",":"")+ "'"+this.data[i].billidcodes+"'";
				}
				bounds += (bounds.length>0?",":"")+i;
			}
		}
		}
		l.billids=billids;
		l.billidcodes=billidcodes;
		l.bounds=bounds;
		return l;
	}

	
	this.getChangedRows = function(){
		var l = new Array();
		for(var i=0;i<this.data.length;i++){
			if(this.data[i].changed){
				l[l.length] = this.data[i];
			}
		}
		return l;
	}
	
	this.getTotalVal=function(colName){
		var totalVal = new Number(0.00);
		for(var i=0; i<this.data.length; i++) {
			var row = this.data[i];
			var val = row[colName];
			if(val != undefined){
				var nval = new Number(val);
				totalVal=accAdd(parseFloat(totalVal),parseFloat(nval));
			}			
		}
		return totalVal.toString();
	}
	
	this.setTotalVal=function(datatable,colName){
		var nlen =2;
		if(this.amtflag=="10000"){
			nlen =6;
		}
		if(datatable.columnList.length>0){
 			var totalList = datatable.totalColumn;
			if (totalList == null || totalList.length == 0) {
				this.totalColumn = this.columnList;
			}
			
			var _allTotal = datatable.allpage_totaljson;
			var tdobj = $(this.id+"sumAmtColumnid"+colName)
			if(tdobj  != null){
				var total = this.getTotalVal(colName);
				var _name = _allTotal[colName];
				_allTotal[colName] = total;
			 	for(var prp in this.allpage_totaljson ){ //如果业务系统注入合计对象，则需要在这里重新对totalColumn进行一次赋值.
					if("load_total" != prp && "row_num" != prp){
						var isExist = false;
						for(var j=0;j<this.totalColumn.length;j++){
							if(this.totalColumn[j]==prp){
								isExist = true;
								break;
							}else if(this.totalColumn[j].split(".")[0]==prp){
									isExist = true;
									break;
							}
						}
						if(!isExist){
							this.totalColumn[this.totalColumn.length] = prp;
						}
					}
				}
				datatable.sumMainAmtToColumn2(datatable.totalColumn,true);
			}
		}
	}
	this.zoom = function(){
		if(this.height == 0){
			this.maxline = this.page_pageSize;
			if(this.maxline>30)this.maxline = 30;
			//if(this.data!=null&&this.data.length<this.maxline){
			//	this.setMaxLine();
			//	if(this.data.length>this.maxline)this.maxline = this.data.length;
			//}
			var zoomoutheight = 86+this.maxline*23;
			if(this.useThisHead)zoomoutheight +=29;
			this.height = this.parent.parentElement.offsetHeight;
			if(this.height<zoomoutheight){
				this.iszoom = true;
				this.parent.parentElement.style.height = zoomoutheight+"px";;
				this.parent.style.height = (zoomoutheight-23)+"px";
				$(this.id+"zoomicon").src = ROOT_PATH+"/ifmis_images/done_btn/zoomout.gif";
				$(this.id+"zoomicon").alt = "还原";
			}
		}else{
			this.iszoom = false;
			this.parent.parentElement.style.height = this.height+"px";
			this.parent.style.height = ( this.height-23)+"px";;
			this.height = 0;
			this.setMaxLine();
			$(this.id+"zoomicon").src = ROOT_PATH+"/ifmis_images/done_btn/zoomin.gif";
			$(this.id+"zoomicon").alt = "放大";
		}
		this.show();
	}
	this.createNoPagination=function(){
		this.showNoPage=true;
		if(this.paginationdiv==null)return;
		var div = document.getElementById(this.id+"_noPage_div");
		if(div==null){
			div=document.createElement("div");
			div.id=this.id+"_noPage_div";
			div.style.float="left";
			div.style.position="absolute";
			div.style.zIndex=1000;
			div.style.right="0";
			div.style.top="0";
			this.paginationdiv.appendChild(div);
		}
		if(this.data==null||this.data.length==null){
			div.innerText="共0条";
		}else{
			div.innerText="共"+this.data.length+"条";
		}
	}
	this.createPagination = function(){
		//JQ('.editable-select').remove();
		
		var start = (new Date()).getTime();
		var tbodyHTML = ["<TABLE id=\"paginationtbl\" borderColor=#8596ca cellSpacing=0 cellPadding=0 align=center border=0 style=\"float:right;font-size:12px; color:#000000;\"><TBODY> <TR> <TD align=\"center\" width=\"50\" nowrap=\"nowrap\">"];
		//if($("your_position")){
		var your_position_div=document.getElementById('your_position');
		if(your_position_div!=null && your_position_div._datatable_init!=true){
			tbodyHTML.push(" <a href=\"javascript:");
			tbodyHTML.push(this.id);
			tbodyHTML.push(".zoom()\"><img id=\"");
			tbodyHTML.push(this.id);
			tbodyHTML.push("zoomicon\" src=\"");
			tbodyHTML.push(ROOT_PATH);
			tbodyHTML.push("/ifmis_images/done_btn/zoomin.gif\" alt=\"放大\" border=\"0\" height=\"20\" width=\"20\" align=\"absmiddle\" /></a>");
			your_position_div._datatable_init=true;
		}
		tbodyHTML.push("</TD><TD align=\"center\"  nowrap=\"nowrap\">");
		if(this.page_hasPreviousPage){
			tbodyHTML.push(" <a href=\"javascript:");
			tbodyHTML.push(this.id);
			tbodyHTML.push(".gotoPage(1)\"><img src=\"");
			tbodyHTML.push(ROOT_PATH);
			tbodyHTML.push("/images/actions/first.gif\" alt=\"第一页\" border=\"0\" height=\"16\" width=\"16\" align=\"absmiddle\" /></a> <a href=\"javascript:");
			tbodyHTML.push(this.id);
			tbodyHTML.push(".gotoPage(");
			tbodyHTML.push( this.page_previousPage );
			tbodyHTML.push(")\"><img src=\"");
			tbodyHTML.push(ROOT_PATH);
			tbodyHTML.push("/images/actions/pre.gif\" alt=\"上一页\" border=\"0\" height=\"16\" width=\"16\" align=\"absmiddle\" /></a>");
		} else {
			tbodyHTML.push( " <img src=\"");
			tbodyHTML.push(ROOT_PATH);
			tbodyHTML.push("/images/actions/first_un.gif\" alt=\"第一页\" border=\"0\" height=\"16\" width=\"16\" align=\"absmiddle\" /> <img src=\"");
			tbodyHTML.push(ROOT_PATH);
			tbodyHTML.push("/images/actions/pre_un.gif\" alt=\"上一页\" border=\"0\" height=\"16\" width=\"16\" align=\"absmiddle\" />");
		}
		if (this.page_hasNextPage) { 
			tbodyHTML.push( " <a href=\"javascript:");
			tbodyHTML.push(this.id);
			tbodyHTML.push(".gotoPage(");
			tbodyHTML.push(this.page_nextPage);
			tbodyHTML.push(")\"><img src=\"");
			tbodyHTML.push(ROOT_PATH);
			tbodyHTML.push("/images/actions/next.gif\" alt=\"下一页\" border=\"0\" height=\"16\" width=\"16\" align=\"absmiddle\" /></a>");
			tbodyHTML.push(" <a href=\"javascript:");
			tbodyHTML.push(this.id);
			tbodyHTML.push(".gotoPage(");
			tbodyHTML.push(this.page_pageCount);
			tbodyHTML.push(")\"><img src=\"");
			tbodyHTML.push(ROOT_PATH);
			tbodyHTML.push("/images/actions/end.gif\" alt=\"最后页\" border=\"0\" height=\"16\" width=\"16\" align=\"absmiddle\" /></a>");
		} else {
			tbodyHTML.push( " <img src=\"");
			tbodyHTML.push(ROOT_PATH);
			tbodyHTML.push("/images/actions/next_un.gif\" alt=\"下一页\" border=\"0\" height=\"16\" width=\"16\" align=\"absmiddle\" />");
			tbodyHTML.push(" <img src=\"");
			tbodyHTML.push(ROOT_PATH);
			tbodyHTML.push("/images/actions/end_un.gif\" alt=\"最后页\" border=\"0\" height=\"16\" width=\"16\" align=\"absmiddle\" />");
		}
		tbodyHTML.push( "</td>");
		tbodyHTML.push( "<td align=\"left\" noWrap >&nbsp;&nbsp;&nbsp;&nbsp;<img src=\"");
		tbodyHTML.push(ROOT_PATH);
		tbodyHTML.push( "/images/actions/share_icon.gif\" alt=\"\" border=\"0\" height=\"12\" width=\"15\" align=\"absmiddle\" hspace=\"3\" vspace=\"3\" />");
		tbodyHTML.push("    共 ");
		tbodyHTML.push( this.page_totalRecord );
		tbodyHTML.push(" 条,<a style=\"font:black\">每页</a>");
		tbodyHTML.push("<input id='setpage_size' name='setpage_size' title='设置每页多少条'  value=\"");
		tbodyHTML.push( this.page_pageSize );
		tbodyHTML.push("\" type=\"hidden\"/>");

		tbodyHTML.push("<input id='");
		tbodyHTML.push(this.id);
		tbodyHTML.push("setpage_size' name='");
		tbodyHTML.push(this.id);
		tbodyHTML.push("setpage_size' title='设置每页多少条'  value=\"");
		tbodyHTML.push( this.page_pageSize );
		tbodyHTML.push("\" type=\"hidden\"/>");
		tbodyHTML.push( "</td>");
		tbodyHTML.push( "<td align=\"left\" noWrap >");
		tbodyHTML.push("<select name=\"");
		tbodyHTML.push(this.id);
		tbodyHTML.push("setpage_size_select\" id=\"");
		tbodyHTML.push(this.id);
		tbodyHTML.push("setpage_size_select\" class=\"editable-select\"  style=\"width:43px\">");
		var pagelist = ["10","20","30","50","100","200","500","1000","100000"];
		var isdef = false;
		for(var j=0;j<pagelist.length;j++){
			if(!isdef&&parseInt(this.page_pageSize)<parseInt(pagelist[j])){
				tbodyHTML.push("<option value=\"");
				tbodyHTML.push(this.page_pageSize);
				tbodyHTML.push("\"");
				tbodyHTML.push(" selected");
				isdef = true;
				tbodyHTML.push(">");
				tbodyHTML.push(this.page_pageSize);
				tbodyHTML.push("</option>");
			}
			tbodyHTML.push("<option value=\"");
			if(pagelist[j] == "100000"){
				tbodyHTML.push("全部");
			}else{
				tbodyHTML.push(pagelist[j]);
			}
			tbodyHTML.push("\"");
			if(pagelist[j] == (this.page_pageSize+"")){
				tbodyHTML.push(" selected");
				isdef = true;
			}
			tbodyHTML.push(">");
			if(pagelist[j] == "100000"){
				tbodyHTML.push("全部");
			}else{
				tbodyHTML.push(pagelist[j]);
			}
			tbodyHTML.push("</option>");

		}
		tbodyHTML.push("</select>");
		tbodyHTML.push( "</td>");
		tbodyHTML.push( "<td align=\"left\" noWrap >");
		tbodyHTML.push("<a style=\"font:black\">条</a>");
		tbodyHTML.push(",第 ");
		tbodyHTML.push(this.page_page);
		tbodyHTML.push(" / ");
		tbodyHTML.push( this.page_pageCount );
		tbodyHTML.push(" 页");
		tbodyHTML.push("</td>");
		tbodyHTML.push( "<td align=\"right\"><input type=\"hidden\" name=\"pageSize\" value=\"");
		tbodyHTML.push( this.page_pageSize );
		tbodyHTML.push("\"/><input type=\"hidden\" name=\"pageCount\" value=\"");
		tbodyHTML.push( this.page_pageCount );
		tbodyHTML.push("\"/><input type=\"hidden\" name=\"totalRecord\" value=\"");
		tbodyHTML.push( this.page_totalRecord );
		tbodyHTML.push("\"/>");
		tbodyHTML.push("<input type=\"text\" id=\"");
		tbodyHTML.push(this.id);
		tbodyHTML.push("_page\" name=\"page\" value=\"");
		tbodyHTML.push(this.page_page);
		tbodyHTML.push("\" size=\"3\" onkeyup=\"");
		tbodyHTML.push(this.id);
		tbodyHTML.push(".checkenter(this.value);\" onblur=\"");
		tbodyHTML.push(this.id);
		tbodyHTML.push(".pageblur(");
		tbodyHTML.push( this.page_page );
		tbodyHTML.push(");\"/><a href=\"javascript:");
		tbodyHTML.push(this.id);
		tbodyHTML.push(".submitGotoPage()\"><img src=\"");
		tbodyHTML.push(ROOT_PATH);
		tbodyHTML.push("/images/actions/tz.gif\" alt=\"跳转\" height=\"21\" width=\"45\" align=\"absmiddle\" border=\"0\" /></a>");
		var _doc = document;
    	if(_doc.getElementById("pageTagDiv")!=null){
    		_doc.getElementById("pageTagDiv").innerHTML = tbodyHTML.join("");
    	} else {
			if(this.paginationdiv){
				this.paginationdiv.innerHTML = tbodyHTML.join("");
			}else{
				_doc.getElementById(this.tabletype+"_paginationdiv").innerHTML = tbodyHTML.join("");
			}
    	}
		var vpageSize = this.page_pageSize;
		var id = this.id;
		var datatable = this;
		// 采用样式单名查找对象再IE6环境中速度太慢，会造成页面空白
		var ed_selectid = id+"setpage_size_select";
		JQ('#'+ed_selectid).editableSelect({
			datatable:datatable,
			bg_iframe: false,
			onkeyup: function(){
				var oPagesize = this.value=="全部"?"100000": this.value;
				//oPagesize = oPagesize.replace(/\D/g,'');
				if(oPagesize>100000){
					alert("请输入小于100000的数字作为每页条数！");
					this.value = vpageSize;
					datatable.page_pageSize = vpageSize;
					return false;
				}
				if(oPagesize == ''){
					oPagesize = vpageSize;
				}
				if (oPagesize==0 || isNaN(oPagesize) || parseInt(oPagesize)!=oPagesize) {
			        alert("请输入一个有效数字作为每页条数！");
			        this.value = vpageSize;
					datatable.page_pageSize = vpageSize;
			        return false;
			    }
				
				datatable.page_pageSize = oPagesize;
				document.getElementById(id+"setpage_size").value = this.value;
				if(document.getElementById("setpage_size")!=null){
					document.getElementById("setpage_size").value = oPagesize;
				}
				if (event.keyCode == 13) {
					datatable.page_pageSize = oPagesize;
					datatable.submitGotoPage();
				}			
			},
			
			
			
			onSelect: function(list_item) {
				var oPagesize = this.text.val()=="全部"?"100000":this.text.val();
				document.getElementById(id+"setpage_size").value = oPagesize;
				if(document.getElementById("setpage_size")!=null){
					document.getElementById("setpage_size").value = oPagesize;
				}
				datatable.page_pageSize = oPagesize;
				datatable.submitGotoPage();
			}
		  }
		);
    	
	}
	
	// 检查用户输入的页号是否合法
	// 返回值：true-合法 false-非法
	this.checkPage = function (thePage) {
		var pEl = $(this.id+"setpage_size");
	   	var oPagesize = pEl.value;
		if (oPagesize == "") {
	        alert("请输入一个有效数字作为每页条数！");
	        return false;
	    }
	    if (thePage == "" || thePage=="0") {
	    	if(document.getElementById(this.id+"_page")!=null){
	    		document.getElementById(this.id+"_page").blur();
	    	}
	        return false;
	    }
	    var array_toPage = thePage.split("");
	    var digitalStr = "0123456789";
	    for (var i = 0; i < array_toPage.length; i++) {
	        if (digitalStr.indexOf(array_toPage[i]) == -1 || parseInt(array_toPage)==0) {
	            alert("请输入一个有效数字作为要跳转的页数！");
	            $(this.id+"_page").value = this.page_page;
	            return false;
	        }
	    }
	    if (thePage > this.page_pageCount) {
	        alert("输入的页数不应超过总页数（" + this.page_pageCount + "）！");
	        $(this.id+"_page").value = this.page_page;
	        return false;
	    }
	    return true;
	}

  	// 支持回车跳转
	this.checkenter = function(rows) {
		var pEl = window.event.srcElement;
	   	var oPagesize = pEl.value;
		oPagesize=oPagesize.replace(/\D/g,'');
		pEl.value = oPagesize;
	   if (event.keyCode == 13) {
		    if(pEl.id==this.id+"setpage_size")this.page_pageSize = oPagesize;
	        this.submitGotoPage();
	   }

	}
	this.pagesizeblur = function(vpageSize) {
		var pEl = $(this.id+"setpage_size");
	   	var oPagesize = pEl.value;
		if (oPagesize == "" || oPagesize=="0" || oPagesize==0) {
	        alert("请输入一个有效数字作为每页条数！");
			pEl.value = vpageSize;
			this.page_pageSize = vpageSize;
	        return false;
	    }
		this.page_pageSize = oPagesize;
		if(document.getElementById("setpage_size")!=null){
			document.getElementById("setpage_size").value = oPagesize;
		}
	}
	this.pageblur = function(vpage) {
		var pEl = window.event.srcElement;
	   	var oPage = pEl.value;
		if (oPage == "" || oPage=="0") {
	        alert("请输入一个有效数字作为要跳转的页数！");
			pEl.value = vpage;
	        return false;
	    }
		if(document.getElementById("page")!=null){
			document.getElementById("page").value = oPage;
		}
	}
	// 跳转到指定的分页
	this.gotoPage = function(thePage) {
	    var page = document.getElementById(this.id+"_page");
	    page.value = thePage;	
	    this.submitGotoPage();
	}
	//重置到1页
	this.resetPage = function(thePage) {
	    var page = document.getElementById(this.id+"_page");
	    if(page!=null)page.value = thePage;	
	}
	// 提交分页跳转表单
	this.submitGotoPage = function() {
	    //var theForm = eval("document."+this.page_formName);
	    // 获得原始输入值
	    var thePage = document.getElementById(this.id+"_page").value;
	    if(this.checkPage(thePage)){
	    	if (this.page_postUrl) {
		        //var func = this.page_postUrl
	   			this.page_postUrl(this.getPageParam());
	   			return;
		    }
			show();
	        if(document.getElementById("advancedQueryForm")!=null&&document.getElementById("advancedQueryForm").advancedQuery!=null
	        	&&document.getElementById("advancedQueryForm").advancedQuery.value=="advancedQuery"){
	        	if(document.getElementById(this.id+"_page")!=null){
	        		var formObj = document.getElementById("advancedQueryForm");
					formObj.ad_allflag.value = 0;
					formObj.ad_currpage.value = thePage;
					formObj.ad_rows.value = this.page_pageSize;
					formObj.ad_totalpages.value = this.page_pageCount;
					formObj.ad_totalrows.value = this.page_totalRecord;
					//在自己的页面做特别处理
					try{
				        doprivateQuery(formObj);
					}catch(e){
						//不成功,不管它,当没有实现该方法
					}
				}else {
					$('advancedQueryForm').ad_allflag.value = 1;
				}
				//翻页时，带待办参数 20090915 kim
				var val = "wfstat";
				var uri = window.location.search;
				var re = new RegExp("" +val+ "\=([^\&\?]*)", "ig");
				var wfstat = ((uri.match(re))?(uri.match(re)[0].substr(val.length+1)):null);
				if(wfstat!=null){
					if(formObj.action.indexOf("?")!=-1){
						formObj.action = formObj.action +"&wfstat="+wfstat;
					}else {
						formObj.action = formObj.action +"?wfstat="+wfstat;					
					}
				}
				if(this.defaultSortObj!=null){
					var sortInfo = getparam("howtosort");
					if(typeof(this.defaultSortObj.id)!="undefined"){
						sortInfo = encodeURIComponent(Object.toJSON(this.defaultSortObj));
					}
					if(sortInfo!=null){
						if(formObj.action.indexOf("?")!=-1){
							 formObj.action = formObj.action +"&howtosort="+sortInfo;
						}else {
							 formObj.action = formObj.action +"?howtosort="+sortInfo;		
						}
					}
				}
	        	query();
	        	return;        	
	        } else if(document.getElementById("queryform")!=null){
	        	if(document.getElementById(this.id+"_page")!=null){
	        		var formObj = document.getElementById("queryform");
					if(this.id == "tdetail"){
						formObj = JQ("FORM[id='queryform']")[1];
					}
					formObj.allflag.value = 0;
					formObj.currpage.value = thePage;
					if(document.getElementById(this.id+"setpage_size")!=null){
						var row = document.getElementById(this.id+"setpage_size").value;
						if(row == "全部") row = 100000;
						formObj.rows.value = row;
					}else{
						formObj.rows.value = this.page_pageSize;
					}
					formObj.totalpages.value = this.page_pageCount;
					formObj.totalrows.value = this.page_totalRecord;
					//在自己的页面做特别处理
					try{
				        doprivateSimQuery(formObj);
					}catch(e){
						//不成功,不管它,当没有实现该方法
					}
				}else {
					formObj.allflag.value = 1;
				}
				//翻页时，带待办参数 20090915 kim
				var val = "wfstat";
				var uri = window.location.search;
				var re = new RegExp("" +val+ "\=([^\&\?]*)", "ig");
				var wfstat = ((uri.match(re))?(uri.match(re)[0].substr(val.length+1)):null);
				if(wfstat!=null){
					if(formObj.action.indexOf("?")!=-1){
						formObj.action = formObj.action +"&wfstat="+wfstat;
					}else {
						formObj.action = formObj.action +"?wfstat="+wfstat;					
					}
				}
				if(this.defaultSortObj!=null){
					var sortInfo = getparam("howtosort");
					if(typeof(this.defaultSortObj.id)!="undefined"){
						sortInfo = encodeURIComponent(Object.toJSON(this.defaultSortObj));
					}
					if(sortInfo!=null){
					if(formObj.action.indexOf("?")!=-1){
						 formObj.action = formObj.action +"&howtosort="+sortInfo;
					}else {
						 formObj.action = formObj.action +"?howtosort="+sortInfo;		
					}
					}
				}
	        	formObj.dosubmit(this);
	        	return;
	    	}
	    }
	}
	
	this.paginationSet = function(page){
		this.allflag = page.allflag==0?true:false ;
		if(this.allflag){
			this.page_page = page.currpage;
			this.page_pageSize = page.rows;
			this.page_pageCount = page.totalpages;
			this.page_totalRecord = page.totalrows;
			if(page.posturl)
				this.page_postUrl = page.posturl;
			this.page_hasPreviousPage = page.currpage!=1?(page.totalpages > 1):false;
			this.page_hasNextPage = page.currpage < page.totalpages;
			this.page_previousPage = page.currpage>1?page.currpage - 1:1;
			this.page_nextPage = page.currpage + 1;
			this.paginationdiv = document.getElementById(this.id+'_paginationdiv');
			this.createPagination();
		}
	}
	
	this.getPageParam = function(){
		var params ="";
		if(this.allflag){			
			params ="allflag=0";
			params +="&currpage="+document.getElementById(this.id+"_page").value;
			params +="&rows="+document.getElementById(this.id+"setpage_size").value;
			if(this.page_pageCount&&this.page_pageCount>0){
				params +="&totalpages="+this.page_pageCount;
			}
			if(this.page_totalRecord&&this.page_totalRecord>0){
				params +="&totalrows="+this.page_totalRecord;
			}
		}
		return params;
	}
	/**
	* AJAX查询
	**/
	this.ajaxquerypost =function(queryform,url,param,asynchronous){
		// 查询区验证起始日期大小问题， lp20120703
		try{
			if(!queryCheckIdata()) return false;
		}catch(err){}
		if(asynchronous==null || typeof(asynchronous)=='undefined')
		{
			asynchronous=true;
		}
		var datatable = this;
		datatable.resetPage(1);
		if(url==undefined ) url = "/common/ajaxtopage.do?tabletype="+datatable.tabletype+"&linkname="+datatable.linkname+"&mainmenu="+datatable.mainmenu+"&submenu="+datatable.submenu+"&random="+Math.random();
		show();
		if(param==undefined )var param = "";
		param = param.length>0?param:datatable.getPageParam();
		if(queryform != null&&queryform != undefined)
			param += (param.length>0?"&":"")+ formToString(queryform);
		var myAjax = new Ajax.Request(url, 
		{
				   method : 'post', 
				   parameters : param,
				   asynchronous : asynchronous,
				   onComplete : function(resp){ 
							try{
								eval("var json = "+resp.responseText);
								if(json instanceof Array){
									for (i = 0; i < json.length; i++){
								   		var ojson = json[i];
								   		if(ojson.data != undefined && json.id != "datatable"){
											if(ojson.id != undefined){
												eval("var datatable = "+ojson.id);
											}
											datatable.data = ojson.data;
											eval(ojson.pageinfo);
											if(eval(ojson.filter)) {
												datatable.allpage_totaljson = eval(ojson.filter);
											}
											datatable.show();	
										}							   		
								   	}
								}else{
									if(json.id != undefined && json.id != "datatable"){
										eval("var datatable = "+json.id);
									}
									datatable.data = json.data;
									eval(json.pageinfo);
									if(eval(json.filter)) {
										datatable.allpage_totaljson = eval(json.filter);
									}
									datatable.show();
								}
							}catch(err){}
							closeDiv();
						},
				   onFailure : function(resp) {
					  alert("网络异常");
					  closeDiv();
					}
		}); 
	}
	this.sortById=function(id){
		this._headerOper=COL_HEAD_DOWN;
		this.sort_click(document.getElementById(this.id+"_"+id));
	}
	//排序
	this.sort_click = function(el){
	   if(this._headerOper != COL_HEAD_DOWN) return;
	   var thobj = el;
	   var sortname = thobj.sortname;
	   var sorttype = thobj.sorttype;
	   var idx = thobj.cellIndex;
	   var cellindex = thobj.cellIndex;
	   var aRowsList=this.data;//存放待排序的rows
	   var reList = [];
	   if(this.data!=null&&this.data.length>0){
	       //调整宽度
	       try{
			   this.defaultSortObj.id = this.id;
			   this.defaultSortObj.sortname = sortname;
			   this.defaultSortObj.sorttype = sorttype;
			   this.defaultSortObj.idx = idx;
			   this.defaultSortObj.order = this.orderMap[idx]==undefined?"":this.orderMap[idx];
			   aRowsList.sort(this.generateCompareFunc(sortname,sorttype,idx));//利用数组的sort方法对数组进行排序
				//当前表格的最外级对象.
			   if(document.getElementsByName("sortcol_img")!=null&&document.getElementsByName("sortcol_img").length>0){
			        for(var i=0;i<document.getElementsByName("sortcol_img").length;i++){//移除图标
			            var thobja= document.getElementsByName("sortcol_img")[i];
			            if(this.parent.contains(thobja)){
			            	thobja.innerHTML="";
			            }
		           }
			   }
			   if(this.orderMap[idx]=='asc'){
			      for(var i=aRowsList.length-1;i>=0;i=i-1){//反向排序
			           reList[reList.length] = aRowsList[i];
			           
			   	  }
			   	  this.data = reList;
			   	  thobj.getElementsByTagName("A")[0].innerHTML = '<img src="'+ ROOT_PATH + '/images/actions/asc.gif" border="0" width="20px" height="20px" align="absmiddle" />';
		       }else{
			       for(var i=0;i<aRowsList.length;i++){//正向排序
			            reList[reList.length] = aRowsList[i];
		           }
		           this.data = reList;
		           thobj.getElementsByTagName("A")[0].innerHTML = '<img src="'+ ROOT_PATH + '/images/actions/desc.gif" border="0" width="20px" height="20px" align="absmiddle" />';
			   }
			   var sortObj = {
				       id: this.id,
				       sortname: sortname,
				       sorttype: sorttype,
				       idx: idx,
				       order:this.orderMap[idx]==undefined?"":this.orderMap[idx]
				   };
				   var param = {
				       linkname: (typeof(linkName)!= "undefined")?linkName:location.href.split('?')[0],  //修改BUG48764存储当前页面LINKNAME做唯一标识，如果没有则使用当前的URL，避免报错
				       sort: [sortObj]
				   };
				   //var defaultSort = getCookie('howToSort');
				   var defaultSort = getUserDataByElementId(this.id, this.tabletype+"_sort");
				   var tmpObj;
				   if (typeof(defaultSort)!= "undefined" && defaultSort!=null && defaultSort != "") {
				       tmpObj = eval("(" + defaultSort + ")");
				       if (tmpObj.linkname == param.linkname) {
				           if (tmpObj.sort.length > 0) {
				               var isExist = false;
				               for (var i = 0; i < tmpObj.sort.length; i++) {
				                   if (tmpObj.sort[i].id == this.id) {
				                       isExist = true;
				                       tmpObj.sort[i] = sortObj;
				                   }
				               }
				               if (!isExist) {
				                   tmpObj.sort.push(sortObj);//用push方法比较好
				               }
				           }
				       } else {
				           tmpObj = param;
				       }
				   } else {
				       tmpObj = param;
				   }
				
			   //setCookie('howToSort', Object.toJSON(tmpObj), 1); //将最近一次排序信息写进Cookie，第二天凌晨过期.
			   setUserDataByElementId(this.id, this.tabletype+"_sort", Object.toJSON(tmpObj));
			   this.switchOrder(idx);
			   this.currentSortCol = idx;
			}catch(err){}  
	   }
	   this.drawing = true;
	   this.draw();
	   var tableobj = this.getMainTable();
	   if(tableobj.getElementsByTagName("colgroup").length==0){
			this.setColWidth();
		}
	   this.resetscroll();
	}
	this.toDate=function(ds){//字符串转成日期类型 格式 MM/dd/YYYY MM-dd-YYYY YYYY/MM/dd YYYY-MM-dd 
	   var d = new Date(Date.parse(ds)); 
	   if (isNaN(d)){ 
	       var arys= ds.split('-'); 
	        d = new Date(arys[0],arys[1]-1,arys[2]); 
	    } 
	   return d; 
	}
	this.switchOrder=function(idx){
	   var order=this.orderMap[idx]; 
	   order=(order==null||order=='desc')?'asc':'desc'; 
	   this.orderMap[idx]=order;	   
	}
	this.dateFom=function(s){ //add by jiazhiyu 日期格式转化函数 2012-02-13
		var s1=s.substring(0,4);
		var s2=s.substring(4,6);
		var s3=s.substring(6);
		s=s1+"/"+s2+"/"+s3;
		return s;
	}
	this.toVchtype=function(s){ //导入模板设置专用，从页面获取交易凭证CODE，请勿去掉该eval表达式 20130306 jzy
		eval("var vchtypeName=vchtype_"+s.tovchtypeid);
		var ss=parseInt(vchtypeName.split("-")[0]);
			return ss;
	}
	this.generateCompareFunc=function(sortname,type,i){//生成排序函数 
	   var idx=i;//列的下标 
	   var func=this.compareFuncMap[idx];//先在map中找,找不到再新建 
	   if(func!=null) return func; 
	   var instance=this;//闭包引用层次太深了,需要此引用 
	   if(type=="STRING"){ 
	        func=function compare(a,b){ 
	           var x=a[sortname];
	           var y=b[sortname];
	           if(x==null) x=a[sortname.toLowerCase()];
	           if(y==null) y=b[sortname.toLowerCase()];
	           x=x==null?'':x; 
	           y=y==null?'':y; 
	           var x1,y1;
	           if(a[sortname+"_code"]!=null&&a[sortname+"_name"]){
	           		x1 = a[sortname+"_code"];
	           }else {
	            	x1 =x;
	           }
	           if(b[sortname+"_code"]!=null&&b[sortname+"_name"]){
	           		y1 = b[sortname+"_code"];
	           }else {
	            	y1 =y;
	           }
	           //x1 y1有是字符串和数字情况
	           if(typeof x1 == 'string'){
	           		return x1.localeCompare(y1);//调用本地的比较函数,汉字按首字拼音排序 
	           }else{
	           		if(x1<y1){return -1;}
	           		else if(x1>y1){return 1;}
	           		else {return 0;}
	           }
	        }
	    }else if(type=="CODE"){
			   func=function compare(a,b){
				   var x=instance.toVchtype(a);
				   var y=instance.toVchtype(b);
				   var z=x-y;
				   return z;
				    } 
        }else if(type=="NUMBER"){ 
	        func=function compare(a,b){ 
	           var x=a[sortname];
	           var y=b[sortname];
	            x=x==null?0:x; 
	            y=y==null?0:y; 
	            x=(x+"").replace(/[^\d|.|-]/g,"");//去掉除-.以外的其他字符 
	            y=(y+"").replace(/[^\d|.|-]/g,""); 
	           return x*1-y*1; 
	        } 
	    }else if(type=="DATE"){ 
	        func=function compare(a,b){ 
	           var x=a[sortname];
	           var y=b[sortname];
	   		var regDate = /^(?:(?!0000)[0-9]{4}([-/.]?)(?:(?:0?[1-9]|1[0-2])([-/.]?)(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])([-/.]?)(?:29|30)|(?:0?[13578]|1[02])([-/.]?)31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-/.]?)0?2([-/.]?)29)$/g;
			var isValidDate = regDate.test(x);
			var isValidDate2= regDate.test(y);
			if(!isValidDate||!isValidDate2){	//如果传进来的不是有效的日期类型，按照字符串排序
				//return -1;
		           if(x==null) x=a[sortname.toLowerCase()];
		           if(y==null) y=b[sortname.toLowerCase()];
		           x=x==null?'':x; 
		           y=y==null?'':y; 
		           var x1,y1;
		           if(a[sortname+"_code"]!=null&&a[sortname+"_name"]){
		           		x1 = a[sortname+"_code"];
		           }else {
		            	x1 =x;
		           }
		           if(b[sortname+"_code"]!=null&&b[sortname+"_name"]){
		           		y1 = b[sortname+"_code"];
		           }else {
		            	y1 =y;
		           }
		           //x1 y1有是字符串和数字情况
		           if(typeof x1 == 'string'){
		           		return x1.localeCompare(y1);//调用本地的比较函数,汉字按首字拼音排序 
		           }else{
		           		if(x1<y1){return -1;}
		           		else if(x1>y1){return 1;}
		           		else {return 0;}
		           }
			}
	           var d='19000101';
	           var x=new Date(instance.dateFom(x==''?d:x));
	           var y=new Date(instance.dateFom(y==''?d:y));
	           var z=x-y; 
	           return z;
	        } 
	    } 
	   this.compareFuncMap[idx]=func; 
	   return func; 
	}
	this.redraw=function (row,column){
		var datatable=this;
		JQ.each(JQ(datatable.parent).find("tr"),function(i,trobj){
			if(JQ(trobj).attr("data")&&JQ(trobj).attr("data")==row){
				JQ.each(JQ(trobj).find("td"),function(i,tdobj){
					var id = tdobj.id.split("-")[1];
					if(column == id ){
						var colconfig=datatable.ColumnConfig[column];
						if(colconfig.name==column){
							colconfig.show(row["rownum"],row[column],row,tdobj,datatable);
							return false;
						}
					}else{
						
					}
				});
				return false;
			}
		});
	}


	this.progressBarStatus = function(text2,cur,rleft,rtop)
	{   var psb;
	    var mainWin=JQ('#'+this.id+'_div');
	    var pleft=mainWin.width()/2-80;
	    var ptop=mainWin.height()/2-20;
	    if(typeof rleft != "undefined")
	        pleft=rleft;
	    if(typeof rtop != "undefined")
	        ptop=rtop;
	     
	    psb=mainWin[0].progressBar;
	    if(typeof psb=="undefined" || psb.html()=="")
	    {
	   psb=JQ('<div class="progressbar_3">'
		+'<div class="progress_text">0%</div>'
		//+'<div class="progress_text2" style="display:none">正在准备处理数据.....</div>'
		+'<img class="progress" width="152" height="18" title="0%" alt="0%" src="'+ROOT_PATH+'/images/datatable/progressbg.gif" style="background-position:-152px 50%;"/>'
	    +'</div>');
	    psb.css({
	    	  left:pleft,
	    	  top:ptop
	    
	    });
	    psb.appendTo(mainWin);
	    mainWin[0].progressBar=psb;
	    }
	    psb.css({
	    	  display:"block",
	    	  left:pleft,
	    	  top:ptop
	    	  });
	    
	    if(cur==100)
	    {
	    	psb.css({
	    	  display : "none"});
	    }
	    var $txt = JQ(".progressbar_3 .progress_text",mainWin);
	     var $progress = JQ(".progressbar_3 .progress",mainWin);
	    // var $txt2 = JQ(".progressbar_3 .progress_text2",mainWin);
	    var curcss="-" + Math.floor((100-cur)*152/100)+" "+cur+"%";
	    //$txt2.text(text2);
	    
	    $txt.text(text2+cur+"%");
	    $progress.css({"backgroundPosition":curcss});

	}
	this.ColCompareFunc = function(sortname, type) {
        var func;
		if (type == "STRING") {
			func = function compare(a, b) {
				var x = a[sortname];
				var y = b[sortname];
				if (x == null) {
					x = a[sortname.toLowerCase()]
				}
				if (y == null) {
					y = b[sortname.toLowerCase()]
				}
				x = x == null ? "" : x;
				y = y == null ? "" : y;
				var x1, y1;
				if (a[sortname + "_code"] != null && a[sortname + "_name"]) {
					x1 = a[sortname + "_code"]
				} else {
					x1 = x
				}
				if (b[sortname + "_code"] != null && b[sortname + "_name"]) {
					y1 = b[sortname + "_code"]
				} else {
					y1 = y
				}
				if (typeof x1 == "string") {
					return x1.localeCompare(y1)
				} else {
					if (x1 < y1) {
						return -1
					} else {
						if (x1 > y1) {
							return 1
						} else {
							return 0
						}
					}
				}
			}
		} else {
			if (type == "NUMBER") {
				func = function compare(a, b) {
					var x = a[sortname];
					var y = b[sortname];
					x = x == null ? 0 : x;
					y = y == null ? 0 : y;
					x = (x + "").replace(/[^\d|.|-]/g, "");
					y = (y + "").replace(/[^\d|.|-]/g, "");
					return x * 1 - y * 1
				}
			} else {
				if (type == "DATE") {
					func = function compare(a, b) {
						var x = a[sortname];
						var y = b[sortname];
						var regDate = /^(?:(?!0000)[0-9]{4}([-/.]?)(?:(?:0?[1-9]|1[0-2])([-/.]?)(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])([-/.]?)(?:29|30)|(?:0?[13578]|1[02])([-/.]?)31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-/.]?)0?2([-/.]?)29)$/g;
						var isValidDate = regDate.test(x);
						var isValidDate2 = regDate.test(y);
						if (!isValidDate || !isValidDate2) {
							if (x == null) {
								x = a[sortname.toLowerCase()]
							}
							if (y == null) {
								y = b[sortname.toLowerCase()]
							}
							x = x == null ? "" : x;
							y = y == null ? "" : y;
							var x1, y1;
							if (a[sortname + "_code"] != null
									&& a[sortname + "_name"]) {
								x1 = a[sortname + "_code"]
							} else {
								x1 = x
							}
							if (b[sortname + "_code"] != null
									&& b[sortname + "_name"]) {
								y1 = b[sortname + "_code"]
							} else {
								y1 = y
							}
							if (typeof x1 == "string") {
								return x1.localeCompare(y1)
							} else {
								if (x1 < y1) {
									return -1
								} else {
									if (x1 > y1) {
										return 1
									} else {
										return 0
									}
								}
							}
						}
						var d = "19000101";
						var x = new Date(instance.dateFom(x == "" ? d : x));
						var y = new Date(instance.dateFom(y == "" ? d : y));
						var z = x - y;
						return z
					}
				}
			}
		}
		
		return func
	};
    this.prepareColSelectData = function() {
		var headstring = getUserData(this.parent, this.tabletype);
		//var h = this.tableInitHead;
		 var h = getUserData(this.parent, this.tabletype+"_newHead"); //如果表头已经进行拖动排序或隐藏列，则不用初始表头 20130325 jzy
		if(h==null){
			h = this.tableInitHead;
		}else{
			h = h.split(",");
		} 
		var reta = new Array();
		var f = new Array();
		var headstr = null;
		if(headstring) headstr = ","+headstring+",";
		var colswidthstr = getUserDataByElementId(this.id, this.tabletype+"colswidth");
		var colswidthobj  = {};
		if(colswidthstr){
			eval("colswidthobj = "+colswidthstr);
		}
		var cols = this.contentdiv.getElementsByTagName("COL");
		var colslen = this.columnConfig.length;
		for(var j = 0; j < colslen; j++){
			var column = this.columnConfig[j];
			column.offsetWidth = cols[j].offsetWidth-1;
		}
		for (var e = 0, ie = h.length; e < ie; e++) {
			if(h[e]=="checkbox"||h[e]=="radio"||h[e]=="serial")continue;
			var ra = new Array();
			var config = this.ColumnConfig[h[e].toLowerCase()];
			if(headstr==null || headstr.indexOf(","+h[e]+",")!=-1){
				ra["checkbox"] = true;		
			}else{
				ra["checkbox"] = false;
			}
			ra["title"] = config.title;
			ra["id"] = config.id;
			ra["offsetWidth"] = config["offsetWidth"];
			ra["selfWidth"] = colswidthobj[config.name];
			reta.push(ra); 
		}
		return reta;
	};
	
	this.prepareRowSelectData = function(Field, sorttype) {
		var reta = [], done = {};
		var ldata = this.data;
		var dt = this;
		var thisTimer = [];
		if (typeof Field == "undefined" || ldata == null || ldata.length == 0) return reta;
		for (var i = 0,length = ldata.length; i < length; i++) {
			var id = JQ.md5(ldata[i][Field]);
			if (!done[id]) {
				var x = ldata[i][Field];
				done[id] = true;
				var ra = new Array();
				ra["checkbox"] = false;
				if (sorttype == "NUMBER") {
					x = x == null ? 0 : x;
					var t = x.toMoneyFormat();
					var s, n = 16;
					if (t.length >= n) {
						s = t;
					} else {
						s = new Array(n - t.length + 1).join(" ") + t;
					}
					ra["title"] = s
				} else {
					x = (x == null) ? "" : x;
					if(x != "" && ldata[i][Field + "_code"] && ldata[i][Field + "_name"]){
						ra["title"] = ldata[i][Field + "_code"] + "-" + ldata[i][Field + "_name"];	
					}else{
						x = (x == "0") ? "空" : x;
						ra["title"] = x;
					}
				}
				ra["id"] = id; 
				reta.push(ra);

			}
		}
		reta.sort(this.ColCompareFunc("title", sorttype));
		if (sorttype == "NUMBER") {
			reta._each(function(a) {
				a["title"] = a["title"].replace(/\s/g, '&nbsp');
			})
		}
		return reta;

	}
}
function revertdata(request){
		try{
			eval("var cachedata = "+request.responseText);
			
			// 检查数组第一项是否是分布下载节点
	    	if(cachedata.length > 0){
	    		if("cachenode" == cachedata[0].nodetype){
	    			var cachenode = cachedata[0];
	    			var dataTable = window[cachenode.dataid];
	    			// 移除该节点
	    			cachedata.shift();
		    		dataTable.data = dataTable.data.concat(cachedata);
		    		dataTable.resetscroll();
		    		

		    		var size = parseInt(cachenode.size,10);
		    		var startpoint = parseInt(cachenode.startpoint,10);
		    		var length = parseInt(cachenode.length,10);
		    		
		    		if(size > (startpoint+length)){
	    				// 继续获取数据
	    				dataTable.getnextdata(cachenode);
	    			}
	    		}
	    	}
		}
		catch(ex){
			alert(ex)
		}
}

function createColumnConfig(){
	return {
		id:"",		//列标识
		name:"",	//字段名
		type:"",	//字段类型
		title:"",	//显示名称
		style:"text-align:left",	//显示样式
		tabletype:"",	//显示样式
		showconfig:[],	//级联参数
		show:function(rownum,value,row,tdobj,datatable){ //返回表格td内的HTML代码,value是该列的值,row是行对象,tdobj是表格对象
			if(value==null){
			   tdobj.innerText = " ";
			}else{
				
				if(value!=null && typeof(value)=="string" && ((value.indexOf("<")!=-1 && value.indexOf(">")!=-1)||value.indexOf("&nbsp;")!=-1)){
					tdobj.innerHTML = value;
				}else{
					tdobj.innerText = value;
				}
				if(datatable.titleShow){
					tdobj.onclick = function(){return showOverlibTips(this.innerHTML,this);}
				}else{
					datatableSetTitle(tdobj,value)
				}
			 }
		} 
	};
}

function datatableSetTitle(obj,title){
	if(title==null){
		title=obj.innerText;
	}
	title=title.toString().replace(/\r/g,'\n').replace(/\n\n/g,'\n').replace(/\n/g,'\n').replace(/<br>/g,'\n').replace(/<br\/>/g,'\n').replace(/<\/br>/g,'\n');
	//判断超链接时不加提示 zjy20131029
	if(title.indexOf('<a')>-1){
		obj.title='';
	}else{
		obj.title=title;
	}
	
}
var ColumnConfig = new Array();
function copyStyle(tdobj,divobj){
		divobj.style.fontFamily = tdobj.style.fontFamily;
		divobj.style.fontSize = tdobj.style.fontSize;
		divobj.style.fontWeight = tdobj.style.fontWeight;
		divobj.style.fontStyle = tdobj.style.fontStyle;
		divobj.style.textDecorationUnderline = tdobj.style.textDecorationUnderline;
		divobj.style.textAlign = tdobj.style.textAlign;
		divobj.style.backgroundColor = tdobj.style.backgroundColor;
		divobj.style.color = tdobj.style.color;	
}
function showInputEdit(rownum, value, row, tdobj, datatable) {
    if (this.id.indexOf(".input") == -1) {
        this.id += ".input";
    }
    var unit = this.amtflag;
    if (null == unit || "" == unit || "2" == unit) {
        unit = 1;
    }
	var inputtype = this.inputtype;
    var colname = this.name;
    if (value == null) {
        value = "";
    }
    tdobj.style.backgroundColor = '#FFEFC3'; //默认颜色
    // 创建可编辑区域
    var tableid = datatable.id;
	var doc = this._doc;
	if(!doc) doc = document;
    var col = this;
    var colname = this.name;
	var type = this.type;
    var divid = ["div" , tableid , colname ,rownum].join("_");
    var divobj = doc.createElement('DIV');
	divobj.id = divid;
	divobj.style.width = "100%";
	divobj.style.height = (datatable.trHeight-1)+"px";
	divobj.style.lineHeight = (datatable.trHeight-1)+"px";
	divobj.contentEditable = false;
    var temp = '0.00';
    var nlen = 2;
	var pattern = this.pattern;
	if("amt"==inputtype && value != ''){
		temp = Math.round((value / unit) * Math.pow(10, nlen)) / Math.pow(10, nlen) + ""; //单位金额转换
		divobj.style.textAlign = "right";
		divobj.innerText = temp.toMoneyFormat();
	}else if("number"==inputtype && value != ''){
		if(pattern!=null && pattern.trim().length>2 && value!=null){
			var fmtarr = pattern?pattern.split('.'):[''];
			var fmt=fmtarr.length>1?fmtarr[1]:'0';
			if(fmt!='0'){
				value = numberFormat(value.toFixed(fmt.length),pattern);
			}else{
				value = numberFormat(Math.round(value),pattern);
			}
		//value = numberFormat(value,pattern);
		}
		divobj.innerText = value;
	}else{
		divobj.innerText = value;
	}
    // 与datatable建立引用关系
    divobj.datarow = row;
    divobj.col = this;
    divobj.datatable = datatable;
    // 将可编辑取追加到表格
	tdobj.insertBefore(divobj, null);
    var olddata = new Object();

    var colid = this.id;
	var txtEdit;
	var isselect = false;
	var isTotal = this.istotal;
	var isRefreshRow = this.isRefreshRow;
    // 鼠标单击单元格后可以修改数据 
    if ( datatable.disabled == false && datatable.getDisabledConfig(this.id, rownum) == false) {
        divobj.onclick = function() {
            if (datatable.beforeClick) {
                if (datatable.beforeClick(this.datarow, colname)) {
                    return;
                }
            }
			datatable.editTdDiv = this;
			if(txtEdit == null){
				if(datatable.editer!=null &&datatable.editer.parentElement!=null&&datatable.editer.parentElement.parentElement!=null&&datatable.editer.parentElement.parentElement.parentElement!=null
				&&datatable.editer.parentElement.parentElement.parentElement.parentElement!=null
				&& datatable.editer.parentElement.parentElement.parentElement.parentElement.parentElement!=null){
					datatable.editer.fireEvent("onblur");
				}
				this.defaultamt = this.innerText.trim();
				value = divobj.innerText;
				divobj.innerText = "";
				txtEdit = doc.createElement('<input type="text" style=\"border:2px groove #000000;position:absolute;z-index:0;overflow:hidden;\"  NAME=\"txtEdit\">');// onfocus=\"this.select()\"
				txtEdit.style.lineHeight = (datatable.trHeight-1)+"px";
				divobj.insertBefore(txtEdit, null);
				datatable.editer = txtEdit;
				txtEdit.value = value;
				txtEdit.style.left = tdobj.offsetLeft-1;
				txtEdit.style.top = tdobj.offsetTop-1;
				var maxWidth = tdobj.offsetWidth ;
				var maxHeight = tdobj.offsetHeight ;
				if (maxWidth - 2 > 0) txtEdit.style.width = maxWidth - 2;
				if (maxHeight - 3 > 0) txtEdit.style.height = maxHeight - 3;
				if(typeof copyStyle == "function") copyStyle(tdobj,txtEdit);
				txtEdit.style.backgroundColor = '#FFFF00';
				if("amt"==inputtype || "number"==inputtype){
					this.defaultamt = this.defaultamt.replace(/,/g, "");
					txtEdit.style.textAlign = "right";
				}
				txtEdit.focus();
				txtEdit.onkeydown = function(){
					if(this.parentElement)
						keydowevent(event.keyCode,datatable,this.parentElement);
				};
				txtEdit.onkeyup = function(){//不允许输入非数字
					if("amt"==inputtype || "number"==inputtype){
						var dot = 14;
						var isnegative = this.parentElement.datatable.negative?1:0;
						 formatNumberInput(this,dot,isnegative);
					}
				};
				txtEdit.onblur = function(){
					if(this.bluring) return;
					this.bluring = true;
					var pdatatable = this.parentElement.datatable;
					var m;
					if("amt"==inputtype){
						m = txtEdit.value.toFixed(2);
					}else{
						convertStrForObj(this);//可编辑录入文本处理下半角转全角
						m = txtEdit.value;
					}
					if("amt"==inputtype || "number"==inputtype){
							m = m.replace(/,/g, "");
							//wy 多个小数点问题
							var ma = m.split(".");
							if (ma.length > 2) {
								m = ma[0] + "." + ma[1];
							}
							//只能录入数字和小数点
							if (!pdatatable.negative) { //不允许负数
								m = m.replace(/\-/g, "");
							}
							if(typeof(dataFormat)=="function")m = dataFormat(colname,m);
							var amtfloat = m.indexOf(".")>-1 ? m.substring(m.indexOf(".") + 1, m.length).replace(/-/, "") : null;
							var startamtfloat = m.indexOf(".")>-1 ? m.substring(0, m.indexOf(".")).replace(/-/, "") : m;
							if (startamtfloat.length > 14) {
								startamtfloat = startamtfloat.substring(0, 14);
								var mm = amtfloat != null ? startamtfloat + "." + amtfloat : startamtfloat;
								if (m.indexOf("-") == -1) {
									m = mm;
								} else {
									m = "-" + mm;
								}
								alert("整数位只能录入14位！");
							}
							if("number"==inputtype){
								olddata.value = divobj.datarow[colname];
								divobj.datarow[colname] = m;
								divobj.removeChild(this);
								txtEdit=null;
								if (m == ""){ //如果为0.00，失焦点时显示为空 wy add
									divobj.innerText = "";
								}else{
									if(pattern!=null && pattern.trim().length>2 && value!=null){
										var fmtarr = pattern?pattern.split('.'):[''];
										var fmt=fmtarr.length>1?fmtarr[1]:'0';
										if(fmt!='0'){
											m = numberFormat(m.toFixed(fmt.length),pattern);
										}else{
											m = numberFormat(Math.round(m),pattern);
										}
										
									}
									divobj.innerText = m;
								}
							}else{
								if(typeof(dataRound)=="function")m = dataRound(colname,m);
								// 检查是否设置外部校验方法
								// 在页面上可以根据方法命名规则创建校验方法
								// 命名规则 checka+属性名+cell
								// 如果校验不通过需要方法返回false
								pdatatable.redrawed = false;
								if (pdatatable.checkamtcell) {

									// 此处把金额类型转成数字  金额单位转换
									var r = pdatatable.checkamtcell(parseFloat(accMul(this.parentElement.defaultamt, unit)), parseFloat(accMul(m, unit)), row, colname);
									if (r == false) {
										datatable.editer = null;
										txtEdit=null;
										if(this.parentElement)this.focus();
										stopBubble();
										return;
									}
								}
								if(!pdatatable.redrawed){
									olddata.value = divobj.datarow[colname];
									divobj.datarow[colname] = parseFloat(accMul(m, unit));
									divobj.removeChild(this);
									txtEdit=null;
									if (m == "" || m == "0.0" || m == "0.00"){ //如果为0.00，失焦点时显示为空 wy add
										divobj.innerText = "";
									}else{
										divobj.innerText = m.toMoneyFormat();
									}
								}
							}
							if(typeof(isTotal)!="undefined"&&isTotal==1)window.setTimeout(function(){datatable.setTotalVal(datatable, colname);},5);
							if (datatable.ondatachange) {
								var func = datatable.ondatachange;
								eval(func + "(datatable,divobj.datarow,divobj.col,olddata)");
							}
							if(isRefreshRow)if(isTotal)window.setTimeout(function(){datatable.refreshDrawTrObj(divobj.datarow, divobj.parentElement.parentElement);},5);
					}else{
						olddata.value = divobj.datarow[colname];
						divobj.datarow[colname] = m;
						divobj.removeChild(this);
						txtEdit=null;
						divobj.innerText  = m;
						var inlength = m.replace(/([\u00FF-\uFFFF])/g,"**").length;
						if(inlength>255){
							divobj.innerText  = m.slice(0,(255-inlength));
						}
						if("Remark"==inputtype){ // 文本输入类型，也支持datatable.ondatachange事件
							if (datatable.ondatachange) {
								var func = datatable.ondatachange;
								eval(func + "(datatable,divobj.datarow,divobj.col,olddata)");
							}
						}
					}

					dataTabelKeyInputFilter(divobj);
				   //if (datatable.editTdDiv != null) datatable.editTdDiv.setActive();
				   datatable.editer = null;
				}
				 //20090915 非数字
				txtEdit.onpaste = function() {
					if("amt"==inputtype || "number"==inputtype){
						clipboardData.setData('text', clipboardData.getData('text').replace(/[^\d\.]/g, ''));
					}
				}
				
				txtEdit.onmousemove = function() {
					if(datatable.showcopy==false)return;
					var e = window.event;
					var obj = mousePosition(e);
					var id = datatable.id;
					var colidrrr = divobj.col.name;

					var showdiv = JQ('#copyDiv1');
					if (showdiv.length == 0) {
						showdiv = JQ('<div id="copyDiv1"></div>');
						showdiv.hide();
						showdiv.appendTo(JQ(datatable.contentdiv));
						var showhtml = "<br><div><input type ='radio' name='copyradio1'  value='0'>：向上复制<input type ='radio' checked name='copyradio1' value='1'>：向下复制</div><br>";
						showhtml = showhtml + "<div>行数：<input type='text' id='linenum' style ='width:80px;'></div><br>";
						showhtml = showhtml + "<div><input name='commit' type='button' value='确定' class='button_style' id='adddetailbtn'/><input name='cancel' onclick ='JQ(\"#copyDiv1\").remove();' type='button' value='取消' class='button_style id=;adddetailbtn' /></div>";
						showdiv.html(showhtml);
					}
					var y = divobj.parentElement.offsetTop + divobj.offsetHeight;// + datatable.contentdiv.scrollLeft - 10;
					var x = divobj.parentElement.offsetLeft + divobj.offsetWidth;// + datatable.contentdiv.scrollTop - 2;
					var objtop = divobj.parentElement.offsetTop + divobj.offsetHeight - datatable.contentdiv.scrollTop;
					var objleft = divobj.parentElement.offsetLeft + divobj.offsetWidth - datatable.contentdiv.scrollLeft;
					var copyValue = this.value;
					if (((e.x > (objleft - 10)) && e.x <= objleft) && (e.y <= objtop && e.y > (objtop - 5))) {
						var screen_x = doc.body.clientWidth;
						var screen_y = doc.body.clientHeight;
						if (obj.x + 200 > screen_x) {
							x = x - 200;
						}
						if (obj.y + 130 > screen_y) {
							y = y - 130;
						}
						JQ("input[name='commit']", "#copyDiv1").unbind("click").bind("click",
						function() {
							copycommit(rownum, copyValue, id, colidrrr, datatable);
						});
						showdiv.css({
							"left": x ,
							"top": y,
							"position": "absolute",
							"background": "#8ba3da",
							"width": 200,
							"height": 130
						}).show();
					} else {
						showdiv.remove();
					}
				}
				JQ("#copyDiv1").bind("mouseout mousewheel",
				function() {
					JQ(this).remove();
				});


			}
        }
        divobj.ondblclick = function() {
            this.fireEvent("onclick");
            if(txtEdit != null){
				txtEdit.focus();
			}
        }
        //20090915 非数字
        divobj.onpaste = function() {
           if(txtEdit == null)txtEdit.fireEvent("onpaste");
        }
		divobj.onkeydown = function(){
			keydowevent(event.keyCode,datatable,this);
		}
    }
} 

function keydowevent(keyCode,datatable,nowdivobj){
	if (keyCode == 13 || keyCode == 9) {
		// 回车键,调用失焦点事件
		if(datatable.editer!=null &&datatable.editer.parentElement!=null&&datatable.editer.parentElement.parentElement!=null&&datatable.editer.parentElement.parentElement.parentElement!=null
			&&datatable.editer.parentElement.parentElement.parentElement.parentElement!=null
			&& datatable.editer.parentElement.parentElement.parentElement.parentElement.parentElement!=null){
				datatable.editer.fireEvent("onblur");
			}
		var nowtdobj = nowdivobj.parentElement;
		if(datatable.redrawed )return;
		if(nowtdobj)
			nextDiv(nowtdobj, nowdivobj, datatable, false, keyCode);
		stopBubble();
		try{
			if (datatable.editTdDiv != null) {datatable.editTdDiv.setActive();}
		}catch(err){
			datatable.editTdDiv.focus();
		}
		return false;
	} else if (keyCode == 27) {
		// Esc键,恢复默认值
		if(datatable.editer!=null){
			datatable.editer.fireEvent("onblur");
		}
		nowdivobj.innerText = nowdivobj.defaultamt;
		return false;
	} else {
		if(datatable.editer!=null && event.srcElement.tagName == "DIV"){
			datatable.editer.select();
			datatable.editer.focus();
			
		}
	}
}

//20090914 copy  showInputAmt for  defineColumn
function showInputAmt(rownum,value,row,tdobj,datatable){
	this.showInputAmt = showInputEdit;
	this.inputtype = "amt"
	this.showInputAmt(rownum,value,row,tdobj,datatable);
}

//20090914 copy  showInputAmt for  defineColumn
function showInputAmt2(rownum,value,row,tdobj,datatable){
	this.showInputAmt = showInputAmt;
	this.showInputAmt(rownum,value,row,tdobj,datatable);
}

function showInputNumberFormat(rownum,value,row,tdobj,datatable){
	this.showInputAmt = showInputEdit;
	this.inputtype = "number"
	this.showInputAmt(rownum,value,row,tdobj,datatable);
}


function copycommit(rownum,copyvalue,id,colid,datatable){
	//copyvalue = moneyFormatToNumber(copyvalue);
	var _table = datatable;
	var postion = JQ("input[name='copyradio1'][checked]").val();
	var copyline = JQ("#linenum").val();
	var re = /^[0-9]*[1-9][0-9]*$/ ;
	if(copyline == null || copyline ==''){
		alert('请输入行数');
		return false;
	}
	if(re.test(copyline) == false){
		alert('行数只能为整数');
		return false;
	}
	var data = _table.data;
	if(postion == "1"){
		var lastNum = Number(copyline)+Number(rownum)+1;
		if(lastNum >data.length ){
			lastNum= data.length;
		}
		for(var i=rownum;i<lastNum;i++){
			data[i][colid] = copyvalue;
			data[i].modify = true;
		}
	} else{
		var lastNum = Number(rownum)-Number(copyline) -1;
		if(lastNum < 0 ){
			lastNum = -1;
		}
		for(var i=rownum;i>lastNum;i--){
			data[i][colid] = copyvalue;
			data[i].modify = true;
		}
	
	}
	_table.draw();
	JQ("#copyDiv1").remove();
}

//20090914 for  defineColumn
function showLastupdatetime(rownum,value,row,tdobj,datatable){
if(row.lastupdatetime != null){ 
 var optiondate = new Date(parseInt(value,10)); 
 var clock = optiondate.getHours()+':';  
 if (optiondate.getMinutes() < 10)  clock += '0';  
 clock += optiondate.getMinutes()+':'; 
 if (optiondate.getSeconds() < 10)  clock += '0';  
 clock += optiondate.getSeconds(); 
 tdobj.innerText = optiondate.getYear()+'-' + (optiondate.getMonth() + 1) + '-'+optiondate.getDate() + ' ' + clock; 
 }
}

function reShowElement2(colname,butid,divid,rownum,tableid){
	var colid="col_"+tableid+"_"+colname+"_"+rownum;
	var staticdivid = "div_"+tableid+"_"+colname+"_"+rownum;
	var divobj = document.getElementById(staticdivid);
	if(!divobj) return;
	var row = divobj.datarow;
	//divobj.removeChild(input);
	//divobj.removeChild(document.getElementById(butid));
	eval("var code = row."+colname+"_code");
	eval("var name = row."+colname+"_name");
	if(code != undefined){
		//if(codeShowConfigs != null && codeShowConfigs.indexOf(colname.toUpperCase())>-1){
			divobj.innerHTML=showElementCTRL(colname,code,name);
		//} else {
		//	divobj.innerHTML=name;
		//}
	}else{
	divobj.innerHTML="        ";
	}
	divobj.onblurTag=false;
	divobj.inputBlurTag = false;
}

function reShowElement(colname,butid,divid,rownum,tableid){
	var colid="col_"+tableid+"_"+colname+"_"+rownum;
	if(!document.getElementById(colid)) return;
	var row = document.getElementById(colid).datarow;

	var divobj = document.getElementById(divid);
	divobj.removeChild(document.getElementById(colid));
	divobj.removeChild(document.getElementById(butid));
	eval("var code = row."+colname+"_code");
	eval("var name = row."+colname+"_name");
	if(code != undefined){
		//if(codeShowConfigs != null && codeShowConfigs.indexOf(colname.toUpperCase())>-1){
			divobj.innerHTML=showElementCTRL(colname,code,name);
		//} else {
		//	divobj.innerHTML=name;
		//}
	}else{
	divobj.innerHTML="        ";
	}
	divobj.onblurTag=false;
	divobj.inputBlurTag = false;
}
function butbeforeactivate(divid){
	var divobj = document.getElementById(divid);
	divobj.onblurTag=false;
	divobj.inputBlurTag = false;
}

var thisRow;
function onClickElement(datatable,row,col,input){
	var mainmenu = datatable.mainmenu;
	var submenu = datatable.submenu;
	var vchtypecode = datatable.vchtypecode;
	var element = col.name;
	if(element == "acctid"){
		element="account";
	}
	var olddata = new Object();
	olddata.value = eval("row."+col.name);
	olddata.name = eval("row."+col.name+"_name");
	olddata.code = eval("row."+col.name+"_code");
	var colid= "col_"+datatable.id+"_"+col.name+"_"+row.rownum;
	var divid="div_"+datatable.id+"_"+col.name+"_"+row.rownum;
	var butid= "but_"+datatable.id+"_"+col.name+"_"+row.rownum;
	selectElememtByUrl(mainmenu,submenu,vchtypecode,element,input,col.url);
	setElementValueToRow(row,input);
	reShowElement2(col.name,butid,divid,row.rownum,datatable.id);
	if(datatable.ondatachange){
    	var func = datatable.ondatachange;
    	eval(func+"(datatable,row,col,olddata)");
    }
    thisRow = row;
}

//datatable  列编辑， 鼠标onlick ，选择后切换行列
function bindAutoCompleteDatatable(input,elementfilter,showlevel,setdefaultflag,showCode,showDivCode,setValueid){
	
	var datatable= input.datatable;
	var row =input.datarow;
    var col = input.col;
	var mainmenu = datatable.mainmenu;
	var submenu = datatable.submenu;
	var vchtypecode = datatable.vchtypecode;
	var element = col.name;
	if(element == "acctid"){
		element="account";
	}
	var olddata = new Object();
	olddata.value = eval("row."+col.name);
	olddata.name = eval("row."+col.name+"_name");
	olddata.code = eval("row."+col.name+"_code");
	var colid= "col_"+datatable.id+"_"+col.name+"_"+row.rownum;
	var divid="div_"+datatable.id+"_"+col.name+"_"+row.rownum;
	var butid= "but_"+datatable.id+"_"+col.name+"_"+row.rownum;
	//
	var avouobj  = new Object();
	if(input.avouObj)
	    avouobj = input.avouObj;
    
	var pvouobj  = new Object();
	if(input.pvouObj)
       pvouobj = input.pvouObj; 
    
    if(input.valueid)
    	eval("avouobj."+element+"=input.valueid");
    if(!setValueid) setValueid = false;
    if(!showCode) showCode = false;
    if(!showDivCode) showDivCode = false; 
    if(elementfilter != null && elementfilter !=""){

		elementfilter = getQueryStr(elementfilter); //wy add 配置界面设置过滤条件
	}
	var voucher = new Array();
	if(avouobj!=null)
		voucher[voucher.length]= avouobj; 
	var pvoucher = new Array();
	if(pvouobj!=null)
		pvoucher[pvoucher.length]= pvouobj;
    
    var tableRefresh = new refreshDataTable();
    tableRefresh.avouobj = avouobj;
    tableRefresh.element=element;
    tableRefresh.submenu=submenu;
    tableRefresh.vchtypecode=vchtypecode;
    tableRefresh.butid=butid;
    tableRefresh.divid=divid;
    tableRefresh.col=col;
    tableRefresh.row=row;
    tableRefresh.datatable=datatable;
    tableRefresh.olddata=olddata;
    tableRefresh.setdefaultflag=setdefaultflag;
    
    var url ="/common/findfuzzyelement.do?submenu="+submenu+"&vchtypecode="+vchtypecode+"&vchfieldcode="+element+"&voucher="+pvoucher.toJSON()+"&elementfilter="+elementfilter;	
    if(showlevel=="onlyselectbottom"){
		url += "&parsetype=ET2";
	}
	showCode=checkCodeShowFlag(element);
	
    JQ(input).autocomplete(url, {
	   	max:30, 
	   	minChars: 1,   
	   	dataType: 'json',
	   	tableRefreshObj:tableRefresh,
	  //加入对返回的json对象进行解析函数，函数返回一个数组     +inObj.value  
	   	parse: function(data) { 
	    	var rows = []; 
			for(var i=0; i<data.length; i++){  
		    	rows[rows.length] = { 
		 	    	data:((showDivCode)?(data[i].CODE+"-"):"")+data[i].NAME,
		 	    	value:((showCode)?(data[i].CODE+"-"):"")+data[i].NAME,  
		 	    	result:((showCode)?(data[i].CODE+"-"):"")+data[i].NAME,
		 	    	valueid:((setValueid)?data[i].ITEMID:null)
		    	}
	    	}
	    	return rows;
	   	}, 
	   	formatItem: function(row, i, n) {
	   	    return row;       
	   	} });	
}

function refreshDataTable(){
       this.avouobj;
       this.element;
       this.submenu;
       this.vchtypecode;
       this.butid;this.divid;this.col;this.row;this.datatable;this.olddata;
       this.input;
       this.setdefaultflag;
       this.refresh=function(){
           if(this.setdefaultflag && this.setdefaultflag==1){
	           eval("this.avouobj."+this.element+"=this.input.valueid");
			   new Ajax.Request(
		            ROOT_PATH+"/common/getInputRuleDefaultValue.do",
		            {method: 'post', parameters: "submenu="+this.submenu+"&vchtypecode="+this.vchtypecode+"&voucher="+Object.toJSON(this.avouobj),
		             onComplete: function(resp){
						var jsons = resp.responseText.evalJSON(true);
						for (items in jsons){
						     var json = jsons[items];
						     eval("row."+items+"="+json.id);  
						     eval("row."+items+"_code=\""+json.code+"\""); 
						     eval("row."+items+"_name=\""+json.name+"\"");
							 reShowElement2(this.items,this.butid,this.divid,this.row.rownum,this.datatable.id);  
						}
						refreshDataTabelRow(this.row,this.input,this.col,this.butid,this.divid,this.datatable,this.olddata);
						
		             }}
		        );
		    }else
		    	refreshDataTabelRow(this.row,this.input,this.col,this.butid,this.divid,this.datatable,this.olddata);    
       }
       
}            
//datatable  列编辑， 鼠标onlick ，选择后切换行列
function onClickInputElement(datatable,row,col,input,obj,elementfilter,showlevel,setdefaultflag){
	var mainmenu = datatable.mainmenu;
	var submenu = datatable.submenu;
	var vchtypecode = datatable.vchtypecode;
	var element = col.name;
	if(element == "acctid"){
		element="account";
	}
	var olddata = new Object();
	olddata.value = eval("row."+col.name);
	olddata.name = eval("row."+col.name+"_name");
	olddata.code = eval("row."+col.name+"_code");
	var colid= "col_"+datatable.id+"_"+col.name+"_"+row.rownum;
	var divid="div_"+datatable.id+"_"+col.name+"_"+row.rownum;
	var butid= "but_"+datatable.id+"_"+col.name+"_"+row.rownum;
	//
	var avouobj  = new Object();
	if(obj.avouObj)
	    avouobj = obj.avouObj;
    
	var pvouobj  = new Object();
	if(obj.pvouObj)
	    pvouobj = obj.pvouObj; 
    if (obj.avouObj == null && obj.pvouObj == null) {
		selectElememtByUrl(mainmenu, submenu, vchtypecode, element, input, col.url);
	}
	else {
		selectDataTableElememtEditByUrl(mainmenu, submenu, vchtypecode, element, input, col.url, pvouobj, elementfilter, showlevel);
	}		
	if(setdefaultflag==1){
		
	    //var ruleObj = new Object();
	    eval("avouobj."+element+"=input.valueid");
	    new Ajax.Request(
            ROOT_PATH+"/common/getInputRuleDefaultValue.do",
            {method: 'post', parameters: "submenu="+submenu+"&vchtypecode="+vchtypecode+"&voucher="+Object.toJSON(avouobj),
             onComplete: function(resp){
				var jsons = resp.responseText.evalJSON(true);
				for (items in jsons){
				     var json = jsons[items];
				     eval("row."+items+"="+json.id);  
				     eval("row."+items+"_code=\""+json.code+"\""); 
				     eval("row."+items+"_name=\""+json.name+"\"");
					 reShowElement2(items,butid,divid,row.rownum,datatable.id);  
				}
				refreshDataTabelRow(row,input,col,butid,divid,datatable,olddata);
				
             }}
            );
	}else{
		refreshDataTabelRow(row,input,col,butid,divid,datatable,olddata);
	}
}

 function refreshDataTabelRow(row,input,col,butid,divid,datatable,olddata) {
    setElementValueToRow(row,input);
	reShowElement2(col.name,butid,divid,row.rownum,datatable.id);
	if(datatable.ondatachange){
    	var func = datatable.ondatachange;
    	eval(func+"(datatable,row,col,olddata)");
    }
    thisRow = row;
    
    //var nowdivobj = document.getElementById(divid);
    //var nowtdobj = nowdivobj.parentElement;
    //nextDiv(nowtdobj,nowdivobj,datatable);
    nextDivByDivid(divid,datatable);
 }

 function getInputValue(input,element,itemid,datatable,row,col,bobj){
 	var submenu = datatable.submenu;
	var vchtypecode = datatable.vchtypecode;
 	//var m = this.value;
	var url ="/common/getInputValue.do";
	var pvouobj  = null;
	if(bobj!=null && bobj.pvouObj!=null)
	    pvouobj = bobj.pvouObj;
	    
	if(pvouobj!=null)
	    url+="?voucher="+Object.toJSON(pvouobj); 
 	//var elementcode = "elementcode="+element;
 	//var itemid = "itemid="+itemid;
 	//if(pars!=""){
	    try{
			var ret =eval("changeOnlySelectBottom_"+col.name+"();");
	}catch(e){
		//不成功,不管它,当没有实现该方法
	}	
	var obj=new Object();
	obj.elementcode=element;
	obj.itemid=itemid;
	obj.submenu= submenu;
	obj.vchtypecode = vchtypecode;
	obj.elementfilter = input.elementfilter;
	//末级控制可控制
	if(ret && ret=="1"){
		obj.onlyselectbottom = "true";			
	}else if(ret && ret=="0"){
		obj.onlyselectbottom = "false";
	}
	var ajaxobj=new Tbajax(url,Object.toJSON(obj)); 
	if(ajaxobj.respText==null || ajaxobj.respText=='null' || ajaxobj.respText==""){
	 	input.value = "";
	 	return;
	}
	var sarray=new Array();		
	sarray =ajaxobj.respText.split(';'); 
	//alert(sarray[0]);
	//eval("row."+element+"="+sarray[0]);
	//eval("row."+element+"_code="+sarray[1]);
	//eval("row."+element+"_name="+sarray[2]);
	var olddata = new Object();
	olddata.value = eval("row."+col.name);
	olddata.name = eval("row."+col.name+"_name");
	olddata.code = eval("row."+col.name+"_code");
	var colid= "col_"+datatable.id+"_"+col.name+"_"+row.rownum;
	var divid="div_"+datatable.id+"_"+col.name+"_"+row.rownum;
	var butid= "but_"+datatable.id+"_"+col.name+"_"+row.rownum;

	input.valueid=sarray[0];
	input.value=showElementCTRL(element,sarray[1],sarray[2]);

	if(input.activeFlag){
		var ruleObj = new Object();
	    if(bobj!=null && bobj.avouObj)
	    	ruleObj = bobj.avouObj;
	    eval("ruleObj."+element+"=input.valueid");
	    findItemValue(submenu,vchtypecode,ruleObj,row);
    }
    setElementValueToRow(row,input);

    reShowElement2(col.name,butid,divid,row.rownum,datatable.id);
       
	if(datatable.ondatachange){
    	var func = datatable.ondatachange;
    	eval(func+"(datatable,row,col,olddata)");
    }
    thisRow = row;
	return "1";
 } 
 
var findItemValue =function(submenu,vchtypecode,ruleObj,row){
     new Ajax.Request(
	            ROOT_PATH+"/common/getInputRuleDefaultValue.do",
	            {method: 'post', asynchronous: false, parameters: "submenu="+submenu+"&vchtypecode="+vchtypecode+"&voucher="+Object.toJSON(ruleObj),
	             onComplete: function(resp){
					var jsons = resp.responseText.evalJSON(true);
					for (items in jsons){
					     var json = jsons[items];
					     eval("row."+items+"="+json.id);  
					     eval("row."+items+"_code=\""+json.code+"\""); 
					     eval("row."+items+"_name=\""+json.name+"\"");  
					}
				}}
            );     
}

//按回车后光标移到下一个控件，并触发divObj的onclick事件
function  nextDivByDivid(divid,datatable,rightkey,keycode){
      var nowdivobj = document.getElementById(divid);
      var nowtdobj = nowdivobj.parentElement;
      if(!rightkey) rightkey = false;
      //if(!tabkey) tabkey = false;
      nextDiv(nowtdobj,nowdivobj,datatable,rightkey,keycode); 
}
function nextDiv(nowtdObj,nowdivObj,datatable,rightkey,keycode){
	if(!rightkey) rightkey=false;
	if(typeof keycode=="undefined" || keycode=="")keycode=13;
	if(keycode==9){
		var nexttdObj = nowtdObj.nextSibling;
		if(nexttdObj&&nexttdObj!=null){
		    var col = nexttdObj.cellIndex;
			var len = col;
			for(var i=0;i<len;i++){
				if(nexttdObj.parentElement.childNodes[i].colSpan>1){
					col += nexttdObj.parentElement.childNodes[i].colSpan-1;
				}
			}

		    var nextdivObj = nexttdObj.firstChild;
		    if(datatable.isEditCol(col)){
			    if(!rightkey){ nextdivObj.fireEvent("onclick");
			    	//如果单元格距离左侧大于可视范围宽度，滚动条+单元格宽度
			    	var currWidth = JQ(nexttdObj).parents("div")[0].offsetWidth;
			    	if(nexttdObj.offsetLeft>currWidth){
			    		JQ(nexttdObj).parents("div")[0].scrollLeft = JQ(nexttdObj).parents("div")[0].scrollLeft+nexttdObj.offsetWidth;
			    	}
			    	//有固定列，如果单元格所在位置小于滚动条位置，滚动条左移
			    	
			    	if(datatable.lockcolcount>0){
			    		var scrLeft = JQ(nexttdObj).parents("div")[0].scrollLeft;
				    	if(scrLeft>=nexttdObj.offsetLeft){
							var fixcol = JQ(nexttdObj).parent("tr").find("td");
				    		var currCell = fixcol[datatable.lockcolcount-1];
				    		JQ(nexttdObj).parents("div")[0].scrollLeft = scrLeft -(currCell.offsetLeft + currCell.offsetWidth);
				    	}
			    	}
			    //if(nextdivObj && nextdivObj!=null && nextdivObj.tagName && nextdivObj.tagName.toLowerCase() =="div"){
				}else{
					if(nextdivObj&&nextdivObj.onclick){
					     nextdivObj.fireEvent("onclick");
					     if(nextdivObj.contentEditable!=null && !nextdivObj.contentEditable)
					           nextDiv(nexttdObj,nowdivObj,datatable,keycode);    
					}else
					    nextDiv(nexttdObj,nowdivObj,datatable,rightkey,keycode);   
				}    
			}else{
				nextDiv(nexttdObj,nowdivObj,datatable,rightkey,keycode);
			}
		}else{
				//换行
			var nowtrobj = nowtdObj.parentElement;
			var nexttrobj = nowtrobj.nextSibling;
			var divid = nowdivObj.id;
			if(nexttrobj!=null && nexttrobj.tagName.toLowerCase() =="tr" && (nexttrobj.offsetTop+datatable.trHeight)<(datatable.contentdiv.offsetHeight-15)){
			    //alert(nexttrobj.TotalRow);
			    if(nexttrobj.TotalRow && nexttrobj.TotalRow ==true){
			       addDatatableRow(datatable);
			       nowdivObj = document.getElementById(divid);
			       nowtdObj = nowdivObj.parentElement;
			       nowtrObj = nowtdObj.parentElement;
			       nexttrobj= nowtrObj.nextSibling;
			       if(nexttrobj==null || nexttrobj.TotalRow || nexttrobj.TotalRow ==true)
			    	return;
			    }
				var ntdobj = nexttrobj.firstChild;
				var col = ntdobj.cellIndex;
				var len = col;
				for(var i=0;i<len;i++){
					if(ntdobj.parentElement.childNodes[i].colSpan>1){
						col += ntdobj.parentElement.childNodes[i].colSpan-1;
					}
				}
		        if(datatable.isEditCol(col)){
				   var ndivobj = ntdobj.firstChild;
					ndivobj.fireEvent("onclick");
				}else{
					nextDiv(ntdobj,ndivobj,datatable,rightkey,keycode);
				}
			}else{
				var rownum = nowtrobj.data.rownum;
				if((rownum+1)<datatable.data.length){
					datatable.drawToRow(datatable.startRowNum+1);
					nowdivObj = document.getElementById(divid);
					nowtdObj = nowdivObj.parentElement;
					
					var nowtrobj = nowtdObj.parentElement;
					var nexttrobj = nowtrobj.nextSibling;
					if(nexttrobj!=null)
					   nextDiv(nowtdObj,nowdivObj,datatable,rightkey,keycode);
				}
			}
		}
	}
	else if(keycode == 13){
		//换行
		var nowtrobj = nowtdObj.parentElement;
		var nexttrobj = nowtrobj.nextSibling;
		var tdindex = JQ(nowtdObj).parent("tr").find("td").index(nowtdObj);
		var len = tdindex;
		for(var i=0;i<len;i++){
			if(nowtrobj.childNodes[i].colSpan>1){
				tdindex += nowtrobj.childNodes[i].colSpan-1;
			}
		}
		var divid = nowdivObj.id;
		if(nexttrobj!=null && nexttrobj.tagName.toLowerCase() =="tr" && (nexttrobj.offsetTop+datatable.trHeight)<(datatable.contentdiv.offsetHeight-15)){
		    if(nexttrobj.TotalRow && nexttrobj.TotalRow ==true){
		       addDatatableRow(datatable);
		       nowdivObj = document.getElementById(divid);
		       nowtdObj = nowdivObj.parentElement;
		       nowtrObj = nowtdObj.parentElement;
		       nexttrobj= nowtrObj.nextSibling;
		       if(nexttrobj==null || nexttrobj.TotalRow || nexttrobj.TotalRow ==true)
		    	return;
		    }
			var ntdobj = JQ(nexttrobj).find("td")[len];
	        if(datatable.isEditCol(tdindex)){
			   var ndivobj = ntdobj.firstChild;
			   	//如果存在竖向滚动条每次向下滚动20
				//var tabh = JQ(nowtrobj).parents("table")[0].offsetHeight;
				//var tabheight = JQ("#rightscroll")[0].scrollHeight;
				//if(tabheight>=tabh){
				//	JQ("#rightscroll")[0].scrollTop = JQ("#rightscroll")[0].scrollTop+20;
				//}
				ndivobj.fireEvent("onclick");
				
			}else{
				nextDiv(ntdobj,ndivobj,datatable,rightkey,keycode);
			}
			/*
			for(var i =0;i<nexttrobj.childNodes.length;i++){
				if(datatable.isEditCol(i)){
			        var firstdivobj = nexttrobj.childNodes[i].firstChild;
				    //if(firstdivobj && firstdivobj.tagName && firstdivobj.tagName.toLowerCase() =="div"){
					firstdivobj.fireEvent("onclick");
					return;	
				}		
			}
			*/
		}else{
			var rownum = nowtrobj.data.rownum;
			if((rownum+1)<datatable.data.length){
				datatable.drawToRow(datatable.startRowNum+1);
				nowdivObj = document.getElementById(divid);
				nowtdObj = nowdivObj.parentElement;
				
				var nowtrobj = nowtdObj.parentElement;
				var nexttrobj = nowtrobj.nextSibling;
				if(nexttrobj!=null)
				   nextDiv(nowtdObj,nowdivObj,datatable,rightkey,keycode);
			}
		}
	}
	else{
	 	return;
	}	
}

//按回车后光标移到上一个控件，并触发divObj的onclick事件
function  prevDivByDivid(divid,datatable){
      var nowdivobj = document.getElementById(divid);
      var nowtdobj = nowdivobj.parentElement;
      prevDiv(nowtdobj,datatable); 
}
function  prevDiv(nowtdObj,datatable){
	var nexttdObj = nowtdObj.previousSibling;			
	if(nexttdObj&&nexttdObj!=null){
	    var col = nexttdObj.cellIndex;
		var len = col;
		for(var i=0;i<len;i++){
			if(nexttdObj.parentElement.childNodes[i].colSpan>1){
				col += nexttdObj.parentElement.childNodes[i].colSpan-1;
			}
		}
	    if(datatable.isEditCol(col)){
		    var nextdivObj = nexttdObj.firstChild;
		    //if(nextdivObj && nextdivObj!=null && nextdivObj.tagName && nextdivObj.tagName.toLowerCase() =="div"){
			//nextdivObj.fireEvent("onclick");
            if(nextdivObj&&nextdivObj.onclick){
				 nextdivObj.fireEvent("onclick");
				 if(nextdivObj.contentEditable!=null && !nextdivObj.contentEditable)
				       prevDiv(nexttdObj,datatable);
			}else
				 prevDiv(nexttdObj,datatable);
		}else{
			prevDiv(nexttdObj,datatable);
		}
	}else{
		//换行
		var nowtrobj = nowtdObj.parentElement;
		var nexttrobj = nowtrobj.previousSibling;
		if(nexttrobj!=null && nexttrobj.tagName.toLowerCase() =="tr"){
			var ntdobj = nexttrobj.lastChild;
			var col = ntdobj.cellIndex;
			var len = col;
			for(var i=0;i<len;i++){
				if(ntdobj.parentElement.childNodes[i].colSpan>1){
					col += ntdobj.parentElement.childNodes[i].colSpan-1;
				}
			}
	        if(datatable.isEditCol(col)){
			   var ndivobj = ntdobj.firstChild;
			   if(ndivobj && ndivobj.onclick){
				     ndivobj.fireEvent("onclick");
			   }
			}else{
				prevDiv(ntdobj,datatable);
			}
			/*for(var i =0;i<nexttrobj.childNodes.length;i++){
				if(datatable.isEditCol(i)){
			        var firstdivobj = nexttrobj.childNodes[i].firstChild;
				    //if(firstdivobj && firstdivobj.tagName && firstdivobj.tagName.toLowerCase() =="div"){
					firstdivobj.fireEvent("onclick");
					return;	
				}		
			}
			*/
		}
	}	
}

//按回车后光标移到上一行一个控件，并触发divObj的onclick事件
function upDivByDivid(divid,datatable){
     var nowdivobj = document.getElementById(divid);
	 var nowtdobj = nowdivobj.parentElement;			            
	 upDiv(nowtdobj,datatable);	
}
function  upDiv(nowtdObj,datatable){
    var col = nowtdObj.cellIndex;
	var nowtrobj = nowtdObj.parentElement;
	var nexttrobj = nowtrobj.previousSibling;
	if(nexttrobj!=null && nexttrobj.tagName.toLowerCase() =="tr"){
		var ntdobj = nexttrobj.cells[col];
		var len = col;
		for(var i=0;i<len;i++){
			if(nexttrobj.childNodes[i].colSpan>1){
				col += nexttrobj.childNodes[i].colSpan-1;
			}
		}
		if(datatable.isEditCol(col)){
		   var ndivobj = ntdobj.firstChild;
		   //if(ndivobj!=null && ndivobj.tagName && ndivobj.tagName.toLowerCase() =="div"){
			//ndivobj.fireEvent("onclick");
			if(ndivobj && ndivobj.onclick){
				 ndivobj.fireEvent("onclick");
				 if(ndivobj.contentEditable!=null && !ndivobj.contentEditable)
				       upDiv(ntdobj,datatable);
			}else
				 upDiv(ntdobj,datatable);
		}else{
		    upDiv(ntdobj,datatable);
		}
	}
}

//按回车后光标移到下一行一个控件，并触发divObj的onclick事件
function downDivByDivid(divid,datatable){
     var nowdivobj = document.getElementById(divid);
	 var nowtdobj = nowdivobj.parentElement;			            
	 downDiv(nowtdobj,datatable);	
}
function  downDiv(nowtdObj,datatable){
    var col = nowtdObj.cellIndex;
	var nowtrobj = nowtdObj.parentElement;
	var nexttrobj = nowtrobj.nextSibling;
	if(nexttrobj!=null && nexttrobj.tagName.toLowerCase() =="tr"){
		var ntdobj = nexttrobj.cells[col];
		var len = col;
		for(var i=0;i<len;i++){
			if(nexttrobj.childNodes[i].colSpan>1){
				col += nexttrobj.childNodes[i].colSpan-1;
			}
		}
		if(datatable.isEditCol(col)){
		   var ndivobj = ntdobj.firstChild;
		   //if(ndivobj!=null && ndivobj.tagName && ndivobj.tagName.toLowerCase() =="div"){
			//ndivobj.fireEvent("onclick");
			if(ndivobj && ndivobj.onclick){
				 ndivobj.fireEvent("onclick");
				 if(ndivobj.contentEditable!=null && !ndivobj.contentEditable)
				       downDiv(ntdobj,datatable);
			}else
				 downDiv(ntdobj,datatable);
		}else{
		    downDiv(ntdobj,datatable);
		}
	}
}

function addDatatableRow(datatable){
	if(datatable.tabletype=="MainList"){
	   	addMainListRow();
		return;			
	}else{
		addDetailListRow();
		return;
	}
}
//增行(具体jsp页面可以覆盖以下两个方法)
function addMainListRow(){} //增加主表行
function addDetailListRow(){} //增加明细行
/**
金额单位转换
*/
function showInputMoneyFormat(rownum,value,row,tdobj,datatable){
	var unit=this.amtflag;
	if(null==unit||""==unit||"null"==unit||"2"==unit){
		unit=1;
	}
	var len = 2;
	if(unit=='10000'){
		//len = 6;
	}
	value =(Math.round((value/unit)*Math.pow(10,len))/Math.pow(10,len))+""; 
	tdobj.innerText = value.toMoneyFormat();
	if(datatable.titleShow){
		tdobj.onclick = function(){return showOverlibTips(this.innerText,this);}
	}else{
		datatableSetTitle(tdobj)
	}
}
/*
* 显示数值 单小数值时进行补0
*/
/**
金额单位转换
*/
function showNumberFormat(rownum,value,row,tdobj,datatable){
    var pattern = this.pattern;
	if(pattern!=null && pattern.trim().length>2 && value!=null){
		value = numberFormat(value,pattern);
	}
	tdobj.innerText = value;
	if(datatable.titleShow){
		tdobj.onclick = function(){return showOverlibTips(this.innerText,this);}
	}else{
		datatableSetTitle(tdobj)
	}
}
/**
* 显示数据来源项
*/
function showElement(rownum,value,row,tdobj,datatable){
	var field = this.id;
    var code = row[this.id+"_code"];
	var name = row[this.id+"_name"];
	var superstr = row[this.id+"_super"];
	if(code != null && name!= null){
		var tips = "";
	    if(this.codeShow==null){
	         this.codeShow= checkCodeShowFlag(this.id);
	    } 
	    if(datatable.isWrap || datatable.useThisHead || !datatable.bodyColResize){
	    	if(this.codeShow&&field!="salmonth"&&field!="saldate"){
            	tdobj.innerText = code+"-"+name;
            } else {
            	tdobj.innerText = name;
            }
		}else{
		   if(this.codeShow){
            	tdobj.innerText = code+"-"+name;
           } else {
            	tdobj.innerText = name;
           }
		 
		   if(superstr!=null){
		   if(datatable.titleShow){
			    var hierarchys = [];
				if(superstr.indexOf(":")!=-1)
					superstr = superstr.replace(/{/g,"{\"").replace(/}/g,"\"}").replace(/:/g,"\":\"").replace(/,/g,"\",\"");
				eval("var hierarchy = "+superstr);
				var oldcode = "";
				for (keycode in hierarchy)   {
					if(oldcode.length>keycode.length){
					    hierarchys.unshift("<li>"+keycode+"-"+hierarchy[keycode]+"</li>");
					}else{
						hierarchys.push("<li>"+keycode+"-"+hierarchy[keycode]+"</li>");
					}
					oldcode = keycode;
				}
				hierarchys.unshift("<ul>");
				hierarchys.push("<li>"+code+"-"+name+"</li>");
				hierarchys.push("</ul>");
				tips = hierarchys.join("");
				
		   }else {
		  	  var hierarchys = [];
				if(superstr.indexOf(":")!=-1)
					superstr = superstr.replace(/{/g,"{\"").replace(/}/g,"\"}").replace(/:/g,"\":\"").replace(/,/g,"\",\"");
				eval("var hierarchy = "+superstr);
				var oldcode = "";
				for (keycode in hierarchy)   {
					if(oldcode.length>keycode.length){
					    hierarchys.unshift(keycode+"-"+hierarchy[keycode]+"</br>");
					}else{
						hierarchys.push(keycode+"-"+hierarchy[keycode]+"<br/>");
					}
					oldcode = keycode;
				}
				hierarchys.push(code+"-"+name+"<br/>");
				tips = hierarchys.join("");
		   }
		   }
		}
		if(tips == "")tips = tdobj.innerText;
		if(datatable.titleShow){
			tdobj.onclick = function(){return showOverlibTips(tips,this);}
		}else{
			datatableSetTitle(tdobj,tips)
		}
	}
}
function showInputElement(rownum,value,row,tdobj,datatable){
    thisRow =  row;
	var tableid=datatable.id; 
	var col = this;
	var colname =this.name;
	var url = this.url;
	if(url != undefined){
		url=",\""+url+"\"";
	}else{
		url="";
	}

	var element=colname; 
	if(element=="acctid"){
	   element="account"
	}
	
	// 创建可编辑区域
	var divid="div_"+tableid+"_"+colname+"_"+rownum;
	var divobj = document.createElement('<div id =\"'+divid+'\" style=\"width:99.5%;\" name =\"div_'+colname+'\"></div>');
    if(!datatable.isWrap && !datatable.useThisHead && datatable.bodyColResize){
         divobj = document.createElement('<div id =\"'+divid+'\" name =\"div_'+colname+'\" class ="divoverflow"></div>'); 
    }      
	if(value != null){
		value = value+"";
	} else {
		value ="";
	}
	var colid= "col_"+tableid+"_"+colname+"_"+rownum;
	var butid= "but_"+tableid+"_"+colname+"_"+rownum;
	//divobj.innerHTML=value;
	// 与datatable建立引用关系
	divobj.datarow = row;
	divobj.datatable = datatable;
	divobj.col =col;
	divobj.colid= colid;
	// 将可编辑取追加到表格
	tdobj.appendChild(divobj);
	var input;
	var button;
	
	if(this.codeShow==null){
	    this.codeShow= checkCodeShowFlag(this.name);
	}
	
	eval("var code = row."+colname+"_code");
	eval("var name = row."+colname+"_name");
	if(code != undefined){
		if(this.codeShow){
			divobj.innerHTML=code+"-"+name;
		} else {
			divobj.innerHTML=name;
		}
		
	}else{
		divobj.innerHTML="        ";
	}
	divobj.onblurTag=true;
	divobj.inputBlurTag = false;
	// 鼠标单击单元格后可以修改数据
	if(datatable.disabled==false && datatable.getDisabledConfig(this.id,rownum) == false){
	divobj.onclick = function(){
	    //是否可编辑 业务系统实现逻辑
	    var func = "callBeforeDataTableInput_"+this.datatable.id+"("+row+",'"+this.colid+"')";
		var isEdit = true;
		try{
		    isEdit = eval(func);
		    if (!isEdit) return;
		}catch(e){
			//不成功,不管它,当没有实现该方法
		}
	
		if(document.getElementById(colid)==undefined){
		    //初始化数据
		    dataTabelKeyInputFilter(this);
			divobj.innerHTML="";
			eval("var code = row."+colname+"_code");
			eval("var name = row."+colname+"_name");
			eval("var valueid = row."+colname);
			var disvalue="";
			if(code != undefined){
				if(col.codeShow){
					disvalue = code+"-"+name;
				} else {
					disvalue = name;
				}
			}
			var setDefault = this.activeFlag; 
			
			var avouObj = new Object(); 
			if (setDefault) {
				if(this.activeObject!=null)
			          avouObj = this.activeObject;
			}
			//else{
			var pvouObj = new Object(); 
			if(this.ruleObject!=null)
			    	pvouObj = this.ruleObject;
			//}
			var showLevel = "";
			if(this.levelConfig!=null)
			  showLevel=this.levelConfig;
			  
			// 联动 有表间关系
			var elementFilter="";
			if(this.filterObject!=null){
				for (items in this.filterObject){
					 elementFilter+=" and "+items+"="+ this.filterObject[items];
				}
			}
			if(elementFilter!="")
			    elementFilter = elementFilter.substring(4);
            
			
			if(this.ruleObject==null && this.activeObject==null){
				avouObj = null;
				pvouObj = null;
			}
			     
			//selectElementTreeForEditWithFieldCTRL(mainmenu,submenu,vchtypecode,vchfieldcode,backinput,vou,defaultvalue,anyvaluetag,parsetype,allField,elementfilter)
			var inputHTML ='<input id="'+colid+'" name="'+colname+'"'
			if(this.datatable.autocomplete)    
			     inputHTML +=' onfocus=\'bindAutoCompleteDatatable(this,"'+elementFilter+'","'+showLevel+'","'+setDefault+'",true,true,true)\'';
			inputHTML +='value ="'+disvalue+'"  type=text class=input_noborder_yellowbg />'; //,"'+elementFilter+'","'+showLevel+'","'+setDefault+'"
			var buttonHTML ='<input type = "button" id="'+butid+'" stype = "width: 25px;" class="bbb"  onbeforeactivate = \'butbeforeactivate(\"'+divid+'\");\'onclick=\'onClickInputElement(this.datatable,this.datarow,this.col,this.colid,this,"'+elementFilter+'","'+showLevel+'","'+setDefault+'")\' >...</input>';
			input=document.createElement(inputHTML);
			button=document.createElement(buttonHTML);	
			
			button.datatable=this.datatable;
			button.datarow = this.datarow;
			button.col=this.col;
			button.colid = input;
			button.avouObj=avouObj;
			button.pvouObj=pvouObj;
		    input.activeFlag = this.activeFlag;
		    input.elementFilter = elementFilter;
		    input.showLevel = showLevel;
			input.valueid = valueid;
			input.datarow = row;
			input.datatable = this.datatable;
			input.col = col;
           /*
			input.onkeydown= function(){
			     if(event.keyCode==13){
			          divobj.inputBlurTag = false;
			          getInputValue(this,colname,input.value,datatable,divobj.datarow,col,button);
			     }
			}
		  */
			input.onblur = function(){
			    if($('datatable_auto_div') && $('datatable_auto_div').style.display=='block') return;
			    divobj.inputBlurTag = false;
			    if(divobj.onblurTag==true){
					reShowElement2(colname,butid,divid,rownum,tableid);
				}else{
					divobj.onblurTag=true;
				}
			}
		    divobj.appendChild(input);
		    input.setActive();
		    input.select();
		    input.focus();
		    divobj.inputBlurTag = true;	
		    divobj.appendChild(button);		  
		    
		    editTdWidthAdjust(this.parentNode,this.datatable,input.offsetWidth+button.offsetWidth+20);  
		    input.onkeydown= function(){ 
		         keySwitchFocus(divid,datatable);
				 if(event.keyCode==13){
			         var retval = getInputValue(this,colname,input.value,datatable,divobj.datarow,col,button);
			         // wy 回车键触发下个单元格中div的onclick事件
			         if(retval&&retval!=null&&retval!=""){
			            nextDivByDivid(divid,datatable);
			         }else{					         	         
			            onClickInputElement(datatable,row,col,this,button,this.elementFilter,this.showLevel,this.activeFlag);
			            nextDivByDivid(divid,datatable);       	         	
			         }
			          divobj.inputBlurTag = false;
			     }
			     //datatable.parent.hiddenClick();
			} 
		    divobj.onblurTag=true;

		}
	}
	
	divobj.onblur = function(){
	    if($('datatable_auto_div') && $('datatable_auto_div').style.display=='block') return;
	    if(divobj.inputBlurTag) return;
		if(divobj.onblurTag==true){
			reShowElement(colname,butid,divid,rownum,tableid);
		}else{
			divobj.onblurTag=true;
		}
		
	}
	}
}

//20090914 copy  showInputAmt for  defineColumn
function showInputRemark(rownum,value,row,tdobj,datatable){
	this.showInputAmt = showInputEdit;
	this.inputtype = "Remark"
	this.showInputAmt(rownum,value,row,tdobj,datatable);
}


function showInputText(rownum,value,row,tdobj,datatable){
	this.showInputAmt = showInputEdit;
	this.inputtype = "Text"
	this.showInputAmt(rownum,value,row,tdobj,datatable);
}
/**
 * 此方法框架不再维护，全部转移到showinputselect方法
 */
function showSelect(rownum,value,row,tdobj,datatable){
    thisRow =  row;
	var tableid=datatable.id; 
	var col = this;
	var colname =this.name;
	// 创建可编辑区域
	var divid="div_"+tableid+"_"+colname+"_"+rownum;
	var divobj = document.createElement('<div id =\"'+divid+'\" name =\"div_'+colname+'\" class ="divoverflow"></div>');

	var selectIndex = 0;
	// 创建可编辑区域
	//var divobj = document.createElement('<div style="width:100%;"></div>');
	if(value != null){
		if(value == -1){
			divobj.innerHTML="贷";
		} 
		if(value == 1){
			divobj.innerHTML="借";
		}
	}else{
	   divobj.innerHTML="";
	}	
	// 与datatable建立引用关系
	divobj.datarow = row;
	divobj.datatable = datatable;
	// 将可编辑取追加到表格
	tdobj.appendChild(divobj);

	var select = null;
	var oOption1 = null;
	var oOption2 = null;
	// 鼠标单击单元格后可以修改数据 
	divobj.onclick = function(){
		//this.offsetWidth = 100;
		if(select==null && !datatable.disabled){

		    var dvalue =  divobj.innerHTML;		
		    divobj.innerHTML = "";	
			select =document.createElement("<SELECT id='wyd' style='width:100%'/>");

			oOption1 = document.createElement("OPTION");
			oOption2 = document.createElement("OPTION"); 
			oOption1.text="借";
            oOption1.value="1";
			oOption2.text="贷";
            oOption2.value="-1";
            select.add(oOption1);
            select.add(oOption2);
			divobj.appendChild(select);
			if(dvalue != null && dvalue != ""){
			   var options=select.options;
			   for(var i=0;i<options.length;i++){		   
			      if(options[i].text == dvalue){
			         options[i].selected = true;
			         break;
			      }
			   }
			}
			select.onblurtag= false;
            //select.fireEvent("onmousedown");
            try{
            	select.setActive();
            } catch(Exception){
            	
            }
            select.focus();
            //select.fireEvent("onfocus");
            //select.options[1].selected = true;
            //alert(select.options[0].outerHTML);
            select.onkeypress = function(){
                this.onblurtag = true;
                if(event.keyCode == 13){
                    this.fireEvent("onblur");
					//var nowdivobj = document.getElementById(divid);
			        //var nowtdobj = nowdivobj.parentElement;
					//寻找下一个单元格，并触发其中div的onclick方法
					//nextDiv(nowtdobj,nowdivobj,datatable);
					nextDivByDivid(divid,datatable);
					
					return false;
				}else{
					
				}
			}
		
            //mod by liuhongchang 090608	
            select.onblur =function(){
            
                if(!this.onblurtag) {
                	this.onblurtag = true;
                	return;
                }
                
			    var Index = select.options.selectedIndex;
			    var optText = select.options[Index].text;
			    var optValue = select.options[Index].value;
			    eval("divobj.datarow."+colname+" = optValue");
			    divobj.removeChild(select);
			    select=null;
			    divobj.innerHTML=optText;	
				if(datatable.ondatachange){
			    	var func = datatable.ondatachange;
			    	eval(func+"(datatable,divobj.datarow,col,optValue)");
			    } 
			}
			select.onclick =function(){
			   this.onblurtag = true;
			}
		}
	}
}

/*
 * @author jiazhiyu新增对于issource为5的列表项，如果不是时间戳使用日期控件参见 ColumnConfig.java
 * 关鹏提供的datatable日期控件录入以后框架升级替换掉该方法
 */
function showInputDate(rownum,value,row,tdobj,datatable){
   // add by lwy 20110701如果非录入状态和新增状态的单据不能进行编辑 (还款计划使用)
//	if(row.wfstatus!=undefined&&row.wfstatus!="00"&&row.agreerepayamtrmb!=""){
//	    tdobj.innerHTML =  "<div onclick='return showOverlibTips(this.innerHTML,this);' class='divoverflow'>"+value+"</div>";
//	    return;
//	}//end by lwy //
	var colname = this.name+"";
	var colid = (this.id+"").split(".")[0];
	var func = "callAfterDateInput_"+colid;
	var currentValue="";
	var tableid = datatable.id; 
	// 创建可编辑区域
	var divid = "div"+tableid+"_"+colname+"_"+rownum;
	var divobj = document.createElement('<div id="'+divid+'" style="width:90%;white-space:nowrap"></div>');
	if(value != null){
		value = value+"";
	} else {
		value ="";
	}
	tdobj.style.width='129px';
	tdobj.style.backgroundColor = '#FFEFC3'; //默认颜色
	var format  = this.format;
	var df;
	if(format!=null){
		df=new SimpleDateFormat();//jsJava1.0需要使用DateFormat对象，不要弄错就是了
		df.applyPattern(format);
		if(value!=null&&value.trim().length==8){
			var str = value.substring(0,4)+"/"+value.substring(5,6)+"/"+value.substring(7,8);
			var date = new Date(str);
			str=df.format(date);
			divobj.innerHTML = str;
		}else{
			divobj.innerHTML = value;
		}
	}else{
		divobj.innerHTML = value;
	}
	divobj.innerHTML=value;
	// 与datatable建立引用关系
	divobj.datarow = row;
	divobj.datatable = datatable;
	// 将可编辑区追加到表格
	tdobj.appendChild(divobj);
	var input;
	var button;
	divobj.onblurTag=false;
	// 鼠标单击单元格后可以修改数据 
	divobj.onclick = function(){
		if(input==undefined){
			divobj.innerHTML="";
			var calendarid = colname+"_cal";
			var inputHTML ='<input id="'+calendarid+'"  name="'+calendarid+'" value ="'+value+'" style="width:80px" type="text"/>';
			var buttonHTML ='<img src="/images/calendar/date.gif" alt="选择日期" onclick=\'return showCalendar(\"'+calendarid+'\", \"%Y%m%d\", null, true);\' style=\"cursor:hand; border:0;position:relative; top:5px; *top:3px;\" onmouseover=\"this.style.background=\'red\';\" onmouseout=\"this.style.background=\'\'\"/>';
			input = document.createElement(inputHTML);
		    divobj.appendChild(input);
		    button = document.createElement(buttonHTML);	
		    divobj.appendChild(button);
		}
		divobj.onblurTag=true;

	}
	divobj.onblur = function(){
		if(divobj.onblurTag==true){
			if(input!=undefined){
				var m = input.value;
				value = m;
				var pare = this.parentElement;		
				this.parentElement.runtimeStyle.backgroundColor = "";
				eval("divobj.datarow."+colname+" = m");
				divobj.removeChild(input);
				divobj.removeChild(button);
				input=undefined;
				if(format!=null&&value.trim().length>0){
					if(value!=null&&value.trim().length==8){
						var str = value.substring(0,4)+"/"+value.substring(5,6)+"/"+value.substring(7,8);
						var date = new Date(str);
						str=df.format(date);
						divobj.innerHTML = str;
					}else{
						divobj.innerHTML = value;
					}
				}else{
					divobj.innerHTML = value;
				}
			}
		}else{
			divobj.onblurTag=true;
		}
		//现金管理特殊处理页面回调方法
		try{
			if(typeof(eval(func))=="function"){
			 currentVaule=eval("divobj.datarow."+colname);
				func = func + "("+currentVaule+")";
				eval(func);
				func="callAfterDateInput_"+colid;
			}
		}catch(e){
			
		}
	}
	
}

//可编辑年月控件
function showInputDate2(rownum,value,row,tdobj,datatable){
		var colname = this.name+"";
		var colid = (this.id+"").split(".")[0];
		var func = "callAfterDateInput_"+colid;
		var currentValue="";
		var tableid = datatable.id; 
		// 创建可编辑区域
		var divid = "div"+tableid+"_"+colname+"_"+rownum;
		var divobj = document.createElement('<div id="'+divid+'" style="width:90%;white-space:nowrap"></div>');
		if(value != null){
			value = value+"";
		} else {
			value ="";
		}
		tdobj.style.width='129px';
		tdobj.style.backgroundColor = '#FFEFC3'; //默认颜色
		var format  = this.format;
		var df;
		if(format!=null){
			df=new SimpleDateFormat();//jsJava1.0需要使用DateFormat对象，不要弄错就是了
			df.applyPattern(format);
			if(value!=null&&value.trim().length==8){
				var str = value.substring(0,4)+"/"+value.substring(5,6)+"/"+value.substring(7,8);
				var date = new Date(str);
				str=df.format(date);
				divobj.innerHTML = str;
			}else{
				divobj.innerHTML = value;
			}
		}else{
			divobj.innerHTML = value;
		}
		divobj.innerHTML=value;
		// 与datatable建立引用关系
		divobj.datarow = row;
		divobj.datatable = datatable;
		// 将可编辑区追加到表格
		tdobj.appendChild(divobj);
		var input;
		var button;
		divobj.onblurTag=false;
		// 鼠标单击单元格后可以修改数据 
		divobj.onclick = function(){
			if(input==undefined){
				divobj.innerHTML="";
				var calendarid = colname+"_cal";
				var inputHTML ='<input id="'+calendarid+'"  name="'+calendarid+'" value ="'+value+'" style="width:80px" type="text"/>';
				var buttonHTML ='<img src="/images/calendar/date.gif" alt="选择日期" onclick=\'return showCalendar(\"'+calendarid+'\", \"%Y%m%d\", null, true,null,true);\' style=\"cursor:hand; border:0;\" onmouseover=\"this.style.background=\'red\';\" onmouseout=\"this.style.background=\'\'\"/>';
				input = document.createElement(inputHTML);
			    divobj.appendChild(input);
			    button = document.createElement(buttonHTML);	
			    divobj.appendChild(button);
			}
			divobj.onblurTag=true;

		}
		divobj.onblur = function(){
			if(divobj.onblurTag==true){
				if(input!=undefined){
					var m = input.value;
					value = m;
					var pare = this.parentElement;		
					this.parentElement.runtimeStyle.backgroundColor = "";
					eval("divobj.datarow."+colname+" = m");
					divobj.removeChild(input);
					divobj.removeChild(button);
					input=undefined;
					if(format!=null&&value.trim().length>0){
						if(value!=null&&value.trim().length==8){
							var str = value.substring(0,4)+"/"+value.substring(5,6)+"/"+value.substring(7,8);
							var date = new Date(str);
							str=df.format(date);
							divobj.innerHTML = str;
						}else{
							divobj.innerHTML = value;
						}
					}else{
						divobj.innerHTML = value;
					}
				}
			}else{
				divobj.onblurTag=true;
			}
			//现金管理特殊处理页面回调方法
			try{
				if(typeof(eval(func))=="function"){
				 currentVaule=eval("divobj.datarow."+colname);
					func = func + "("+currentVaule+")";
					eval(func);
					func="callAfterDateInput_"+colid;
				}
			}catch(e){
				
			}
		}
		
	}


function showInputFileUpload(rownum,value,row,tdobj,datatable){
	var colname =this.name+"";
	var tableid = datatable.id;
	// 创建可编辑区域
	var divid="div_"+tableid+"_"+colname+"_"+rownum;
	var divobj = document.createElement('<div id =\"'+divid+'\" name =\"div_'+colname+'\" class ="divoverflow"></div>');

	if(value != null){
		value = value+"";
	} else {
		value ="";
	}
	var colid= "col_"+tableid+"_"+colname+"_"+rownum;
	var butid= "but_"+tableid+"_"+colname+"_"+rownum;
	
	divobj.innerHTML=value;
	// 与datatable建立引用关系
	divobj.datarow = row;
	divobj.datatable = datatable;
	// 将可编辑取追加到表格
	tdobj.appendChild(divobj);
	var input; var inputfile;
	// 鼠标单击单元格后可以修改数据 
	divobj.onblurTag=true;
	divobj.inputBlurTag = false;
	divobj.onclick = function(){
			if(document.getElementById(colid)==undefined){
				divobj.innerHTML="";
			    //初始化数据
				var divo = document.createElement('<div style="display:none;"></div>');
				inputfile=document.createElement('<input id="'+colid+'_file"  type="file"  onpropertychange=\'changevalue("'+colid+'")\'/>');
				input=document.createElement('<input id="'+colid+'" name="'+colname+'"   style="width:60%" type=text class=main_lookup_input />');
				var buttonHTML ='<input type = "button"  id="'+butid+'" stype = "width:20%;"  value = "浏览"  onbeforeactivate = \'butbeforeactivate(\"'+divid+'\");\' onclick="selectfile(\''+colid+'\')" >浏览</input>';
				var imgobj = document.createElement("<img align=middle type ='image' value='清空' src='/images/done_btn/clear_qry2.gif' onclick='parentElement.clear();'>");
				var button=document.createElement(buttonHTML);	
               
				input.onblur = function(){
				    divobj.inputBlurTag = false;
				    if(divobj.onblurTag==true){
						eval("divobj.datarow."+colname+"=this.value");
						divobj.innerHTML=this.value;
						divobj.onblurTag=false;
						inputfile=null;  input=null; button=null;
					}else{
						divobj.onblurTag=true;
					}
				}
				
				 input.onkeydown= function(){
				    keySwitchFocus(divid,datatable);
					if(event.keyCode==13){
						eval("divobj.datarow."+colname+"=this.value");
				        //var nowdivobj = document.getElementById(divid);
				        //var nowtdobj = nowdivobj.parentElement;			            
				        //nextDiv(nowtdobj,nowdivobj,datatable);	 
				        nextDivByDivid(divid,datatable);       	         	
				        divobj.inputBlurTag = false;
				     }
				    // datatable.parent.hiddenClick();
				} 
				
				button.onblur = function(){
				   input.focus();
				}
				
				 eval("input.value=divobj.datarow."+colname);
				 
				divo.appendChild(inputfile);
				divobj.appendChild(divo);
				divobj.appendChild(input);
				divobj.appendChild(button);
				divobj.appendChild(imgobj);
				
			    input.setActive();
			    input.select();
			    input.focus();
			    divobj.inputBlurTag = true;	   
			    divobj.onblurTag=true;
			    
			}
	}
	

	divobj.onblur = function(){
	    if(divobj.inputBlurTag) return;
		if(divobj.onblurTag==true){
			if(input!=null){
				this.removeChild(input);
			}	
			eval("divobj.innerHTML=divobj.datarow."+colname);
			divobj.onblurTag=false;
			divobj.inputBlurTag = false;
			inputfile=null;  input=null; button=null;
		}else{
			divobj.onblurTag=true;
		}
		
	}
}

function changevalue(colid){
	var objinput = document.getElementById(colid + "_file");
	var obj = document.getElementById(colid);
	if (objinput != null && obj != null) {
		obj.value = objinput.value;
		obj.focus();
   }	 
}
function selectfile(colid){
		var obj = document.getElementById(colid+"_file");
		obj.click();
		
	}
// 序号列设置
col = createColumnConfig();
col.id = "noFind";
col.name = "noFind";
col.type = "S";
col.title = "#!未找到定义列";
ColumnConfig[col.id.toLowerCase()]=col;

function serialClick(){
		var trobj = this.parentElement;
		var selectedrows = trobj.datatable.getSelectedRow();
		if(selectedrows.length > 0){
			for(var i=0;i<selectedrows.length;i++){
				selectedrows[i].checked = false;
			}
		}
		trobj.data.checked = true;
		trobj.datatable.isredraw = true;
		trobj.datatable.draw();
		if(typeof(showEdit)=="function")showEdit(trobj.datatable.id);
	}

// 序号列设置
col = createColumnConfig();
col.id = "serial";
col.name = "serial";
col.type = "I";
col.title = "序号";
col.style = "width:35px";
col.show = function(rownum,value,row,tdobj,datatable){
	tdobj.innerText = rownum+1;
	tdobj.onclick = serialClick;
}

ColumnConfig[col.id.toLowerCase()]=col;

// 复选框列设置
col = createColumnConfig();
col.id = "checkbox";
col.name = "checkbox";
col.type = "checkbox";
col.style = "width:40px";
//col.title = '<input name="allbox" type="checkbox" onclick="this.parentElement.parentElement.parentElement.parentElement.datatable.selectedallrows(this.checked)"/>';
col.show = function(rownum,value,row,tdobj,datatable){
	var doc = this._doc;
	if(!doc) doc = document;
	var checkbox = doc.createElement('input');
	checkbox.type = "checkbox";
	checkbox.name = "dtbox";
	tdobj.insertBefore(checkbox, null);
	if(typeof(row.checkdisabled)!="undefined"){ checkbox.disabled = row.checkdisabled=="true"};	
	checkbox.row = row;
	checkbox.datatable = datatable;
	var fixed = this["_fixed"];
	var rowindex = rownum - datatable.startRowNum;
	checkbox.onclick = function(){
		var datatable = this.datatable;
		var trobj = this.parentNode.parentNode;
		if(fixed){
			JQ("table tbody tr:nth-child("+(rowindex+1)+") td:nth-child("+(tdobj.cellIndex+1)+") input:checkbox",JQ(datatable.contentdiv)).click(); 
		}
		var selectedrows = datatable.getSelectedRow();
		if(datatable.contentdivfixed.style.display == "block"&&this!=event.srcElement){
			 this.checked=this.row.checked ;
		}else{
			 this.row.checked =this.checked;
		}
		
		//判断是否按了shift而且有已选中的行,点击同一行时
		if(!event.shiftKey || selectedrows.length==0 || selectedrows.rownum == this.row.rownum){
			if(!this.checked){
				JQ("input[name='allbox']",JQ(datatable.parent)).removeAttr("checked");
				datatable.selectedall = false;
				trobj.className="main_table_title_letter";
	   		    //trobj.onmouseover = function(){trobj.runtimeStyle.backgroundColor='#e8f4ff';};
	   		    //trobj.onmouseout = function(){trobj.runtimeStyle.backgroundColor='';};
	   		    trobj.fireEvent("onmouseover");
			}else{
				if(this.row.showinfo!=null&&this.row.showinfo == true){
		   		   trobj.className="main_table_title_letter_info";
		   		} else{
		   		   trobj.className="main_table_title_letter_selected";
		   		}
		   		//trobj.onmouseover = function(){trobj.runtimeStyle.backgroundColor='';};
		    	//trobj.onmouseout = function(){trobj.runtimeStyle.backgroundColor='';};
		    	trobj.fireEvent("onmouseout");
	   		}
		}
		else{
		
			var allTR = trobj.parentNode.children;
			//得到所有选中的两行
			var numarr = [];
			for(var k = 0;k<allTR.length;k++){
				var TR = JQ(allTR[k]).find("input:[type=checkbox][checked=true]");
				if(TR.length>0 && allTR[k].rowIndex != trobj.rowIndex){
					numarr.push(allTR[k].rowIndex);
				}
			}
			//方便得到最大值最小值
			numarr.sort();
			//比较列表中所有数据中在最小行号和最大行号之间
			//已选中再重新选择满足样式的补全
			var minnum = trobj.rowIndex<numarr[0]?trobj.rowIndex:numarr[0];
			var maxnum = trobj.rowIndex<numarr[0]?numarr[numarr.length-1]:trobj.rowIndex;
			for(var j=0;j<allTR.length;j++){
				if(minnum<=allTR[j].rowIndex && allTR[j].rowIndex<=maxnum){
					JQ(allTR[j]).find("input:[type=checkbox]").attr("checked","true")
					JQ(allTR[j]).addClass("main_table_title_letter_selected");
					allTR[j].data.checked = true;
				}else{
					JQ(allTR[j]).find("input:[type=checkbox]").removeAttr("checked");
					JQ(allTR[j]).removeClass("main_table_title_letter_selected");
					delete(allTR[j].data.checked);
				} 
				
			}
		}
		//选中行合计
	//	if(!fixed){
			if(datatable.isCreateAmtColumn) 
				setTimeout(function(){datatable.sumMainAmtToColumn(datatable.totalColumn);}, 0);
	//	}
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

// 单选框列设置
col = createColumnConfig();
col.id = "radio";
col.name = "radio";
col.type = "radio";
col.title = '&nbsp;';
col.style = "width:30px";
col.showEvent=false;
col.show = function(rownum,value,row,tdobj,datatable){
	var doc = this._doc;
	if(!doc) doc = document;
	var radiobtn = null;
	if(row.checked == true ||row.checked == "true"){ //用于重画的时候如果当前行选中，则画radio的时候重画出来
		radiobtn = doc.createElement('<input name="'+datatable.id+'_radio" type="radio" checked/>');
	}else{
		radiobtn = doc.createElement('input');
		radiobtn.name = datatable.id+'_radio';
		radiobtn.type = "radio";
	}
	tdobj.appendChild(radiobtn);

	if(typeof(row.checkdisabled)!="undefined"){ radiobtn.disabled = (row.checkdisabled=="true")};
	
	radiobtn.row = row;
	row.checkobj = radiobtn;
	radiobtn.datatable = datatable;
	if(!this.showEvent){
		document.body.attachEvent("onkeydown",function(event){
			if(event.keyCode!='38'&&event.keyCode!='40'){return ; }
			if(datatable_FocusTable==null||datatable_FocusTable!=radiobtn.datatable)return;
			var datatable=datatable_FocusTable;
			var selectRow=datatable.getSelectedRow()[0];
			var rownum=selectRow.rownum;
			var currentrow=rownum;
			var nextrow=rownum+1;
			var backrow=rownum-1;
			var updown=null;
			var clickRow = null;
			if(event.keyCode=='38'){ //上键
				updown="up";
				if(datatable.data[backrow]==null){
					return;
				}
				datatable.data[currentrow].checked=false;
				datatable.data[backrow].checked=true;
				clickRow = backrow;
			}else if(event.keyCode=='40'){  //下键
				updown="down";
				if(datatable.data[nextrow]==null){
					return;
				}
				datatable.data[currentrow].checked=false;
				datatable.data[nextrow].checked=true;
				clickRow = nextrow;
			}
			
		
			var focusObj=null;
			if(datatable.data[clickRow]!=null){
				var rtnObj = datatable.data[clickRow].checkobj;
				if(rtnObj&&rtnObj.type=="radio"){
					var trobj = rtnObj.parentNode.parentNode;
					trobj.onclick();
				}
			}
			if(updown=="down"){
				datatable.drawToRow(currentrow);
				
			}else if(updown=="up"){
				datatable.drawToRow(currentrow-1);
			}
			
			//单选框获取焦点
			//第一次执行向下操作会因为延时加载失去焦点。所以给延迟一下
			getFocus(datatable_FocusTable);
			window.event.cancelBubble = true;
			return;
		});
	}
	this.showEvent=true;
	/*
	 * 添加单选框radio响应键盘上下键事件
	 * @author jiazhiyu @2012-02-03
	 
	radiobtn.onkeydown=function(){
		var datatable=this.datatable;
		var rownum=this.row.rownum;
		var currentrow=rownum;
		var nextrow=rownum+1;
		var backrow=rownum-1;
		var updown=null;
		if(event.keyCode=='38'){ //上键
			updown="up";
			if(datatable.data[backrow]==null){
				return;
			}
			datatable.data[currentrow].checked=false;
			datatable.data[backrow].checked=true;
		}else if(event.keyCode=='40'){  //下键
			Updown="down";
			if(datatable.data[nextrow]==null){
				return;
			}
			datatable.data[currentrow].checked=false;
			datatable.data[nextrow].checked=true;
		}
		//同步事件tr对象响应事件
		var trobj=this.parentNode.parentNode;
		trobj.onclick();
		if(updown=="down"){
			datatable.drawToRow(currentrow);			
		}else if(updown=="up"){
			datatable.drawToRow(currentrow-1);
		}
		//单选框获取焦点
		//第一次执行向下操作会因为延时加载失去焦点。所以给延迟一下
		getFocus(this);
		window.event.cancelBubble = true;
		return false;
	}
	*/
	
	radiobtn.onclick = function(){
		var datatable = this.datatable;
		// 清除选中项 
		var selectedrows = datatable.getSelectedRow();
		if(selectedrows.length > 0){
			for(var i=0;i<selectedrows.length;i++){
				selectedrows[i].checked = false;
			}
		}

		datatable.waitrefreshdata = selectedrows;
		// 选中当前行
		this.row.checked = true;

		datatable.waitrefreshdata[datatable.waitrefreshdata.length] = this.row;
		datatable.waitrefreshdata.bounds += (datatable.waitrefreshdata.bounds.length>0?",":"")+selectedrows.bounds;
		var tbodys = datatable.contentdiv.getElementsByTagName("TABLE").item(0).getElementsByTagName("TBODY");
		var dbody = tbodys.item(tbodys.length-1);
		var cellIndex = -1;
		for(i=0;i<datatable.columnConfig.length;i++){
		     if(datatable.columnConfig[i].name=="radio"){
		         cellIndex = i ; break;
		     }
		}
		for(i=0;i<dbody.childNodes.length;i++){
		     var trobj = dbody.childNodes[i];
		     var radioinput = trobj.cells[cellIndex].childNodes[0];
		     //if(radioinput && !radioinput.checked){
			//	 alert("先去掉此处行变色，单选从上向下，再从下向上选时行背景色没去掉");
		            radioinput.checked = false;
		         	trobj.className="main_table_title_letter";
		         	//先去掉此处行变色，单选从上向下，再从下向上选时行背景色没去掉
		   		    trobj.onmouseover = function(){trobj.runtimeStyle.backgroundColor='';};
		   		    trobj.onmouseout = function(){trobj.runtimeStyle.backgroundColor='';};
		    // }    
		}
		this.checked = true;
        var trobj = this.parentNode.parentNode;
        var rownum = trobj.rownum;
        // 当有固定列时需要同步
        if (trobj._fixed) {
        	//点击固定列
        	var trRadtio = JQ("table tbody tr:nth-child(" + (rownum + 1) + ") input:[type=radio]", datatable.contentdiv);
        	if (trRadtio != null) {
        		JQ(trRadtio).click();
        		// IE6下工资按钮选中不改变
            	var inputRadio = JQ("input[type=radio]", datatable.contentdivfixed);
            	if (inputRadio != null) {
            		for (var k = 0; k<inputRadio.length; k++) {
            			inputRadio[k].checked = false;
            		}
            	}
        	}
		}
        if (datatable.contentdivfixed.style.display == "block") {
        	//点击非固定列行
			var _fixchk = JQ("table tbody tr:nth-child(" + (rownum + 1) + ") input:[type=radio]", datatable.contentdivfixed);
			_fixchk.attr("checked", true);
        }
		if(this.row.showinfo!=null&&this.row.showinfo == true){
   		   trobj.className="main_table_title_letter_info";
   		} else{
   		   trobj.className="main_table_title_letter_selected";
   		}
   		trobj.onmouseover = function(){trobj.runtimeStyle.backgroundColor='';};
    	trobj.onmouseout = function(){trobj.runtimeStyle.backgroundColor='';};
    	trobj.fireEvent("onmouseout");
		//this.parentElement.fireEvent("onclick");
		if(datatable.isCreateAmtColumn) datatable.sumMainAmtToColumn(datatable.totalColumn);
		getFocus(datatable);
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

function getLeftPos(_el) {
        if(_el.tagName=="th" || _el.tagName=="TH")
        {  
			var x = 0;
			for (var el = _el; el; el = el.offsetParent) {
				//alert(el.innerHTML);
				//alert(el.offsetLeft);
				x += el.offsetLeft;
				//alert(x);
			}
			return x;}
		else  return;
}
function editTdWidthAdjust(tdobj,datatable,width){
  try{
	   if(datatable.useThisHead || !datatable.bodyColResize) return;
	   if(tdobj.offsetWidth<width){
		    var tmain = datatable.contentdiv.getElementsByTagName("TABLE").item(0);
	        tmain.style.width= (tmain.offsetWidth+(width-tdobj.offsetWidth))+"px";
	        var index = tdobj.cellIndex;
			var cols = tmain.getElementsByTagName("col");
			cols[index].width= width+"px";
	   } 
	}catch(err){}     
}
/*
 * kim 20091122
 * datatable，弹出树可编，无控制类型
 * 扩展类型 :
 * ET1 可编辑弹出树（输入控制）                       ET2 可编辑弹出树（末级控制、输入控制、有顺向细化）
 * ET3 可编辑弹出树（显示一级、输入控制）              ET4 可编辑弹出树（显示二级、输入控制）
 * ET5 可编辑弹出树（显示一级、末级控制、输入控制）    ET6 可编辑弹出树（显示二级、末级控制、输入控制）
 * E7 可编辑弹出树（控制显示至一级、输入控制）         ET8 可编辑弹出树（控制显示至二级、输入控制）
 * E9 可编辑弹出树（控制显示至一级、末级控制、输入控制）ET10 可编辑弹出树（控制显示至二级、末级控制、输入控制）
 * ET13 可编辑弹出树（末级控制、输入控制）
 */
function edittreefordatatable(rownum,value,row,tdobj,datatable){
    var colconfig = this;
	var code = row[colconfig.name+"_code"];
	var name = row[colconfig.name+"_name"];
	var isleaf = row[colconfig.name+"_isleaf"];
	var mainmenu = datatable.mainmenu;
	var submenu = datatable.submenu;
	var vchtypecode = datatable.vchtypecode;
	var divobj = document.createElement('<div class ="divoverflow"></div>');
	var divValue='';
	var defaultValue='';
	var columnName = colconfig.name;
	var parsetype = "";
	if(this.codeShow==null){
	    this.codeShow= checkCodeShowFlag(this.name);
	}
	var _type = colconfig.type;
	// 初始化列表同步数据，可编辑弹出树是否有末级控制标识
	var _onlybottom = false;
	if(_type != null){
		parsetype = _type;
		if (parsetype =="ET2" || parsetype=="ET5" || parsetype=="ET6" || parsetype=="E9" || parsetype=="ET10" || parsetype=="ET13") 
			_onlybottom = true;
	}
	if (_onlybottom && isleaf == "0") {
		code = name = isleaf = null;
	} else {
		if(code != null && name!= null){
			if(this.codeShow){
				divobj.innerHTML = code+"-"+name;
				divValue = code+"-"+name;
			} else {
				divobj.innerHTML = name;
				divValue = name;
			}
			defaultValue = code+"-"+name;
		}
	}
	tdobj.style.backgroundColor = '#FFEFC3'; //默认颜色
	//tdobj.style.backgroundColor = "red";
	// 创建可编辑区域
	
	divobj.datarow = row;
	var columnName = colconfig.name;
	divobj.datatable = datatable;
	divobj.blurtag = true;
	// 将可编辑取追加到表格
	tdobj.appendChild(divobj);
	// 鼠标单击单元格后可以修改数据   
	divobj.onclick = function(){
		this.innerHTML="";
		var inputobj = document.createElement('<input id="'+columnName+'_input'+ rownum +'" value="'+divValue+'" style ="border:0;height:20px;line-height:20px;" type ="text" readonly/>');
		var btnobj = document.createElement('<button id="'+columnName+'input_btn" style="height: 20px;width: 18px;border: 0px;background-image: url(/images/bg/dot_pop_black5.gif);background-repeat: no-repeat;margin-bottom: 1px;'
			+'margin-left: 2px;" ></button>');
	    var imgobj = document.createElement("<img align=middle type ='image' value='清空' src='/images/done_btn/clear_qry2.gif' onclick='parentElement.clear();'>");

			
		//if(this.parentElement!=null) this.parentElement.oldbackgroundColor = this.parentElement.runtimeStyle.backgroundColor;
		//if(this.parentElement!=null) this.parentElement.runtimeStyle.backgroundColor = '#FFFF00';  //得到焦点颜色
		// 与datatable建立引用关系
		this.appendChild(inputobj);
		this.appendChild(btnobj);
		this.appendChild(imgobj);
		editTdWidthAdjust(this.parentNode,this.datatable,inputobj.offsetWidth+btnobj.offsetWidth+imgobj.offsetWidth+2);
		divobj.blurtag = false;
		//判断当前点击事件是否在原来的事件
		window.document.body.onclick = function(){
			if(window.onclickdiv&&divobj!=window.onclickdiv&&!window.onclickdiv.blurtag){
				window.onclickdiv.innerHTML = window.onclickdiv.firstChild.value;
				window.onclickdiv.blurtag=true;
			}
			if(event.srcElement.tagName=="DIV"){
				window.onclickdiv= event.srcElement;
			}
			if(!divobj.contains(event.srcElement)){
				divobj.innerHTML = inputobj.value;
				window.document.body.onclick = null;
				window.onclickdiv=null;
			}
		}
		this.clear = function(){
			divValue = "";
			inputobj.value = "";
			row[columnName] = null;
			row[columnName+"_code"] = null;
			row[columnName+"_name"] = null;
			divobj.innerHTML="";
			divobj.blurtag = true;
		}

		this.show =function(){
		
			divobj.blurtag = false;
			eval("var tempinput =$('"+columnName+"_input"+ rownum +"');");
			if(tempinput.value!=""&&tempinput.value!="undefined"){
				tempinput.valueid = row[columnName];
			}
			var vouObj = new Object();
			vouObj.defValue = code == null ? "" : code;
			vouObj.anyvaluetag="0";
			// ET2弹出树顺向细化
			if(parsetype == "ET13"){
				vouObj.fromctrlid="1";
			}	
			//输入控制规则
			if(colconfig.showconfig!=null&&colconfig.showconfig.length>0){
				var erg ="";
				for(var i = 0;i<colconfig.showconfig.length;i++){
					try{
						eval("vouObj."+colconfig.showconfig[i]+"=row."+colconfig.showconfig[i]);
					}catch(e){
						erg +="字段［"+colconfig.name+"］输入控制规则字段［"+colconfig.showconfig[i]+"］没有配置;";
					}
				}
				if(erg.length)
					window.status=erg;
			}
			/* 检查是否设置外部校验方法
			 * 在页面上可以根据方法命名规则创建校验方法
			 * 命名规则 check+属性名+ctrl
			 * 
			 */
			if(eval("typeof(divobj.datatable.check"+columnName+ "ctrl)")=="function" ){
				var r = eval("divobj.datatable.check"+columnName+ "ctrl(code,row);");
				if(r != null && typeof(r)=="object"){
					vouObj = Object.extend(vouObj,r);
				}
			}
			if(eval("typeof(check"+columnName+ "berforclick)")=="function" ){
				var r = eval("check"+columnName+ "berforclick(this,divobj,row,datatable);");
				if(!r){
					divobj.blurtag = true;
					return;
				}
			}
			var elementfilter;
			try{
				eval("elementfilter = callfilter_"+columnName+"();");
			}catch(e){}
			selectElementTreeForEditWithFieldCTRL(mainmenu,submenu,vchtypecode,columnName,tempinput,vouObj,vouObj.defValue,vouObj.anyvaluetag,parsetype,"1",elementfilter);
			if(tempinput.value!=""&&tempinput.value!="undefined"){
				eval("row."+columnName+"=tempinput.valueid");
				var v = tempinput.value;
				if(v.indexOf("-")>-1){
				var vs = v.split('-');
				var vcode = vs[0];
				var vname = vs[1];
				}else{
				var vcode = "";
				var vname = v; 
				}
				row[columnName+"_code"] = vcode;
				row[columnName+"_name"] = vname;
				row[columnName+"_isleaf"] = tempinput.isleaf;
			} else if(tempinput.value==""){
				row[columnName]=null;
				row[columnName+"_code"]=null;
				row[columnName+"_name"]=null;
			}
			divValue = tempinput.value;
			divobj.innerHTML=divValue;
			if(eval("typeof(check"+columnName+ "afterclick)")=="function" ){
				var r = eval("check"+columnName+ "afterclick(this,divobj,row,datatable);");
				if(!r){
					divobj.blurtag = true;
					return;
				}
			}
			divobj.blurtag = true;
		}
		btnobj.onclick = function(){
			divobj.show();
		}
		inputobj.onclick = function(){
			divobj.show();
		}
	}
	divobj.onkeydown = function(){
		if(event.keyCode == 46){ 
			this.clear();
			window.event.cancelBubble = true;
			return false;
		}
	}
}
function setColStyleWidth(columnConfig,length ){
	   styleString = columnConfig.style;
	   if(styleString.indexOf("width")==-1 && styleString.indexOf("WIDTH")==-1){
	      styleString = "width:"+length+";"+styleString;
	      columnConfig.style = styleString;
	      return;
	   }
	   var items = styleString.split(";");
	   var newStyle ="";
	   var item ;
	   for(i=0;i<items.length;i++){
	       if(items[i].length>0){
		       item = items[i].split(":");
		       if(item[0]=="width" || item[0]=="WIDTH"){
		           items[i]= item[0]+":"+length;
		       }
		       newStyle =newStyle+ items[i]+";";
	       }
	   }
	   columnConfig.style = newStyle;
}

function dataTabelKeyInputFilter(el){
	if(el.parentNode==null) return;
    var index = el.parentNode.cellIndex;
    if(!el.datatable.columnConfig[index]) return;
    var colid = el.datatable.columnConfig[index].name;
    var ruleObject = new Object();
    var filterObject =  new Object();
	var activeObject = new Object();
	
	var ilength = el.datatable.inputRuleConfig.length;
	if(ilength==0) ruleObject = null;
    for(i=0;i<ilength;i++){
        ic = el.datatable.inputRuleConfig[i];
        if(ic[0]==colid){
            eval("ruleObject."+ic[1]+"=el.datarow."+ic[1]+";");
        }
    }
     
    ilength =el.datatable.actionRule.length;
	if(ilength==0) activeObject = null;
	for(i=0;i<ilength;i++){
           ic = el.datatable.actionRule[i];
           if(ic[0]==colid){
		   	   for (j = 0; j < ic[1].length; j++) {
			   		eval("activeObject."+ic[1][j]+"=el.datarow."+ic[1][j]+";");
			   }
           }
       }
	ilength =el.datatable.showLevelConfig.length;
	for(i=0;i<ilength;i++){
           ic = el.datatable.showLevelConfig[i];
           if(ic[0]==colid){
               el.levelConfig = "'"+el.datatable.showLevelConfig[i]+"'";
           }
       }
  		ilength =el.datatable.filterConfig.length;
       for(i=0;i<ilength;i++){
           ic = el.datatable.filterConfig[i];
           if(ic[0]==colid){
               eval("filterObject."+ic[1]+"=el.datarow."+ic[1]+";");
           }
       }
       
       el.activeFlag=0;
       ilength =el.datatable.actionConfig.length;
       for(i=0;i<ilength;i++){
           ic = el.datatable.actionConfig[i];
           if(ic ==colid){
               el.activeFlag=1;
           }
       }
	  el.filterObject =filterObject;
	  el.ruleObject = ruleObject;
	  el.activeObject =activeObject;
}
//固定列右键
function onMOvera(obj){
obj.className="Mover";
}
function onMOuta(obj){
obj.className="select";
}

function keySwitchFocus(divid,datatable){
   /*
    if (!JQ("div.ac_results").is(":visible") && event.keyCode==40){
		downDivByDivid(divid,datatable);
	}else if (!JQ("div.ac_results").is(":visible")&&event.keyCode==38){
		upDivByDivid(divid,datatable);
	}if ((event.ctrlKey)&&(event.keyCode==37)){
		prevDivByDivid(divid,datatable);
	}else if ((event.ctrlKey)&&(event.keyCode==39)){
		nextDivByDivid(divid,datatable,true);
	}
	*/
	var nowdivobj = document.getElementById(divid);
	   
	var isTabKey = false;
	if((event.shiftKey)&&(event.keyCode==9)){ 
	   	try{nowdivobj.fireEvent("onblur");}catch(err){}
	   	event.keyCode=37;prevDivByDivid(divid,datatable,true);
	}else if(event.keyCode==9){
	    try{nowdivobj.fireEvent("onblur");}catch(err){}
	 	event.keyCode=39;
	 	isTabKey = true;
	}else if ((!JQ("div.ac_results").is(":visible"))&&(event.keyCode==40)){
		try{nowdivobj.fireEvent("onblur");}catch(err){}
		downDivByDivid(divid,datatable);
	}else if ((!JQ("div.ac_results").is(":visible"))&&(event.keyCode==38)){
		try{nowdivobj.fireEvent("onblur");}catch(err){}
		upDivByDivid(divid,datatable);
	}if ((event.shiftKey)&&(event.keyCode==37)){
		try{nowdivobj.fireEvent("onblur");}catch(err){}
		prevDivByDivid(divid,datatable,true);
	}else if ((event.shiftKey || isTabKey)&&(event.keyCode==39)){
		try{nowdivobj.fireEvent("onblur");}catch(err){}
		nextDivByDivid(divid,datatable,true);
	}
}

function stopBubble(e){
    if(!e) e = window.event;
	e.cancelBubble = true;
	e.returnValue = false;
	if (e.stopPropagation) {
		e.stopPropagation();
		e.preventDefault();
	}
}
/**
	*设置多表头的列序号 qiudehe 2011-05-17
*/
function MutilTableHeads(theads){
	this.theads = theads;
	this.rowspans = new Array();
	this.setCellIndex = function(){
		for(var i=0;i<this.theads.length;i++){
			var oth = this.theads[i];
			if(oth.mycellindex!=null) break;
			var rowIndex= oth.parentElement.rowIndex;
			var colSpan = oth.colSpan ;
			var rowSpan = oth.rowSpan;
			var curCellIndex = this.getRowCellIndex(rowIndex);
			curCellIndex = (colSpan==1)?curCellIndex:(curCellIndex+(colSpan-1));
			oth.setAttribute("mycellindex",curCellIndex);
			this.setArray(rowIndex,rowSpan,curCellIndex);
		}
	}
	
	this.setArray = function(rowIndex,rowSpan,curCellIndex){
		for(var row =rowIndex;row<(rowSpan+rowIndex);row++){
			if(!(this.rowspans[row] instanceof Array)) this.rowspans[row] = new Array();
			this.rowspans[row][curCellIndex] = "1";
		}
		for(var i=0;i<=curCellIndex;i++)this.rowspans[rowIndex][i] = "1";
	}
	
	this.getRowCellIndex = function(row){
		var i=0;
		if(!(this.rowspans[row] instanceof Array)) this.rowspans[row] = new Array();
		for(;i<this.rowspans[row].length;i++){
			if(this.rowspans[row][i]!="1"){
				return i; 
			}
		}
		return i;
	}
}
/*
*大文本展示方法
*对应类型17
*/
function showTextArea(rownum,value,row,tdobj,datatable){
    eval("var va = row."+this.id);
	if(va != null){
		if(va.length<5){
     		tdobj.innerHTML = "<div>"+value+"</div>";
     	}
     	else{
     		tdobj.innerHTML = "<div onclick='showTextA(this);' style='float:left;'>"+value.substring(0,4)+"...</div><img style='float:right;margin-right:15px;' src='/ifmis_images/actions/showAlltext.gif' onclick='showTextA(this);'/><div id='realvalue' style='display:none'>"+value+"</div>";
     	}
	}
}
/*
* 点击行，选中行
*/

function rowcheck(){
	var divid = "";
	if(this.parentElement && this.parentElement.id) divid = this.parentElement.id;
	var obj = window.event.srcElement;
	if(obj.tagName=="INPUT"||obj.tagName=="A"||obj.tagName=="IMG"){
		return true; 
	}
	//可编辑列表需求 TODO

	if(obj.tagName!="TR"&&typeof(obj.onclick)=="function"){
		var funstr  = String(obj.onclick);
		if(funstr.indexOf("showOverlibTips")==-1)
			return true; 
	}
	
	if(obj.firstChild!=null && obj.firstChild.type == "checkbox"){
		 return true; 
	}
  	if(obj.tagName == "TD" && obj.innerHTML != null && obj.innerHTML.indexOf("checkbox")!=-1  && obj.innerHTML.indexOf("radio")!=-1){
		return true; 
	}
	while(obj.tagName!="TH"&&obj.tagName!="TR"&&obj.tagName!="TABLE"&&obj.parentElement!=null){
		obj = obj.parentElement;
	}
	if(obj.tagName=="TR"){
		var datatable = obj.datatable;
		if(typeof(datatable)!="undefined"){
			if(datatable.isShowRadio){ //单选列表
				var selectedrows = datatable.getSelectedRow();
				if(datatable.data.length > 0){
					for(var i=0;i<datatable.data.length;i++){
						datatable.data[i].checked = false;
					}
				}
				datatable.waitrefreshdata = selectedrows;
				// 选中当前行
				obj.data.checked = true;

				datatable.waitrefreshdata[datatable.waitrefreshdata.length] = obj.data;
				datatable.waitrefreshdata.bounds += (datatable.waitrefreshdata.bounds.length>0?",":"")+selectedrows.bounds;
				var tbodys = datatable.contentdiv.getElementsByTagName("TABLE").item(0).getElementsByTagName("TBODY");
				var dbody = tbodys.item(tbodys.length-1);
				var cellIndex = -1;
				for(i=0;i<datatable.columnConfig.length;i++){
				     if(datatable.columnConfig[i].name=="radio"){
				         cellIndex = i ; break;
				     }
				}
				for(i=0;i<dbody.childNodes.length;i++){
				     var trobj = dbody.childNodes[i];
				     var radioinput = trobj.cells[cellIndex].childNodes[0];
				     //if(radioinput && !radioinput.checked){
					//	 alert("先去掉此处行变色，单选从上向下，再从下向上选时行背景色没去掉");
				          //  radioinput.checked = false;
				         	trobj.className="main_table_title_letter";
				         	//先去掉此处行变色，单选从上向下，再从下向上选时行背景色没去掉
				   		  //  trobj.onmouseover = function(){trobj.runtimeStyle.backgroundColor='';};
				   		  //  trobj.onmouseout = function(){trobj.runtimeStyle.backgroundColor='';};
				    // }    
				}
		        var trobj = obj;
		        var rownum = trobj.rownum;
		        // 当有固定列时需要同步
		        if (trobj._fixed) {
		        	//点击固定列
		        	var trRadtio = JQ("table tbody tr:nth-child(" + (rownum + 1) + ") input:[type=radio]", datatable.contentdiv);
		        	if (trRadtio != null) {
		        		JQ(trRadtio).click();
		        		// IE6下工资按钮选中不改变
		            	var inputRadio = JQ("input[type=radio]", datatable.contentdivfixed);
		            	if (inputRadio != null) {
		            		for (var k = 0; k<inputRadio.length; k++) {
		            			inputRadio[k].checked = false;
		            		}
		            	}
		        	}
				}
		        if (datatable.contentdivfixed.style.display == "block") {
		        	//点击非固定列行
					var _fixchk = JQ("table tbody tr:nth-child(" + (rownum + 1) + ") input:[type=radio]", datatable.contentdivfixed);
					_fixchk.attr("checked", true);
		        }
				if(obj.data.showinfo!=null&&obj.data.showinfo == true){
		   		   trobj.className="main_table_title_letter_info";
		   		} else{
		   		   trobj.className="main_table_title_letter_selected";
		   		}
		   		trobj.onmouseover = function(){trobj.runtimeStyle.backgroundColor='';};
		    	trobj.onmouseout = function(){trobj.runtimeStyle.backgroundColor='';};
		    	trobj.fireEvent("onmouseout");
				//this.parentElement.fireEvent("onclick");
			}else{ //多选列表
				if(!obj.data.docheck){
					obj.data.docheck=true;
					obj.data.checked = !obj.data.checked;
					window.setTimeout(function(){obj.data.docheck=false},1000);
				}
				var trchecked = obj.data.checked ;
				if(!trchecked){
				//	JQ("input[name='allbox']",JQ(this.parent)).removeAttr("checked");
					//datatable.selectedall = false;
					obj.className="main_table_title_letter";
		   		    //obj.onmouseover = function(){obj.runtimeStyle.backgroundColor='#e8f4ff';};
		   		    //obj.onmouseout = function(){obj.runtimeStyle.backgroundColor='';};
		   		    obj.fireEvent("onmouseover");
				}else{
					if(obj.data.showinfo!=null&&obj.data.showinfo == true){
			   		   obj.className="main_table_title_letter_info";
			   		} else{
			   		   obj.className="main_table_title_letter_selected";
			   		}
			   		//obj.onmouseover = function(){obj.runtimeStyle.backgroundColor='';};
			   		//obj.onmouseout = function(){obj.runtimeStyle.backgroundColor='';};
			   		obj.fireEvent("onmouseout");
		   		}
			}
			if(datatable.isCreateAmtColumn) datatable.sumMainAmtToColumn(datatable.totalColumn);
			
		} 
		if(datatable!=null&&divid != null && divid.indexOf("fixed")==-1&&datatable.contentdivfixed.style.display == "block" ){
			var rownum = obj.rownum;
			JQ("table tbody tr:nth-child("+(rownum+1)+")",JQ(datatable.contentdivfixed)).click();
		}
		var inputs = obj.getElementsByTagName("INPUT");
		for(var i=0;inputs!=null&&i<inputs.length;i++){
			var checkobj = inputs[i];
			if((checkobj.type=="checkbox"||checkobj.type=="radio") && checkobj.name!="allbox"){
				checkobj = checkobj;
				if(checkobj.type=="radio" ) {
					if(this.datatable.getSelectedRow().length>0){
						this.datatable.getSelectedRow()[0].checked=false;	
					}
							getFocus(this.datatable);
				}
				checkobj.checked = !checkobj.checked;
				checkobj.onclick();
				//修改没有触发自定义行事件，数据无法同步  lp20111226
				obj.onclick();
				
				return true;
			}
		}
	}
}
/*
 * radio获取焦点方法
 * @param obj 当前对象
 * @author jiazhiyu 2012-02-03
 */
 var datatable_FocusTable=null;
function getFocus(obj){
	datatable_FocusTable = obj;
}
window.attachEvent("onload",function(){
document.body.attachEvent("onmousedown",function(event){
	datatable_FocusTable=null;
});
})


/*
*校验编辑列表中必填列
*@datatable为校验表对象
*/
function  chkTabEdit(datatable){
	 //得到所有需要校验的列
	 var header = datatable.columnConfig;
	 var headarr = []
	 for(var i=0;i<header.length;i++){
	 	if(header[i].id == "noFind"){
	          alert("字段配置错误，请核查！");
	          return false;
		   }
		 //编辑状态而且是必填 
		 var heads = {headid:null,headname:null}; 
	     if(header[i].id !="serial" && header[i].id !="checkbox" && header[i].id != "radio" && header[i].requirement=="1"){
	     	  var headid = header[i].id.indexOf(".input")>-1?header[i].id.split(".")[0]:header[i].id;
	          heads.headid = headid;
	          heads.headname = header[i].title;
	          headarr.push(heads);
	     }
	 }
	 //得到列表中数据
	 var data = datatable.data;
	 for(var j=0;j<data.length;j++){
	 	var row = eval(data[j]);
		for(var k=0;k<headarr.length;k++){
			if(!row[headarr[k].headid]){
				alert("\""+headarr[k].headname+"\"列不能为空");
				return false;
			}
		}	 	
	 }
	 return true;
}

/**
*	列表编辑之下拉列表控件
*/
function showInputSelect(rownum,value,row,tdobj,datatable){
	eval("var code = row."+this.name+"_code");
	eval("var name = row."+this.name+"_name");
    thisRow =  row;
	var col = this;
	var colname = this.name;
	var data = this.data;
	// 创建可编辑区域
	var divid = "div_"+datatable.id+"_"+colname+"_"+rownum;
	var divobj = document.createElement('<div id =\"'+divid+'\" name =\"div_'+colname+'\" class ="divoverflow"></div>');

	if(this.codeShow==null){
	    this.codeShow= checkCodeShowFlag(this.name);
	}
	if(code != null && name!= null&&code!= ""&& name!= ""){
		if(this.codeShow){
			divobj.innerHTML = code+"-"+name;
		} else {
			divobj.innerHTML = name;
		}
	}
	tdobj.style.backgroundColor = '#FFEFC3'; //默认颜色	
	// 与datatable建立引用关系
	divobj.datarow = row;
	divobj.datatable = datatable;
	// 将可编辑取追加到表格
	tdobj.appendChild(divobj);

	var select = null;
	// 鼠标单击单元格后可以修改数据 
	divobj.onclick = function(){
		if(dataTable_select_s!=null&&event.srcElement!=dataTable_select_s){
			dataTable_select_s.	onblur();
		}
		if(select==null && !datatable.disabled){
		    var dvalue =  divobj.innerHTML;		
		    divobj.innerHTML = "";	
			select = document.createElement("<SELECT style='width:100%'/>");
			var oOption1 = document.createElement("OPTION");
			oOption1.text = "";
			oOption1.value = "";
			select.add(oOption1);
			for(var i=0;i<data.length;i++){
				var oOption1 = document.createElement("OPTION");
				oOption1.text = data[i]["label"];
				oOption1.value = data[i]["id"];
				select.add(oOption1);
			}
			divobj.appendChild(select);
			if(dvalue != null && dvalue != ""){
			   var options = select.options;
			   for(var i=0;i<options.length;i++){		   
			      if(options[i].text == dvalue){
			         options[i].selected = true;
			         break;
			      }
			   }
			}
			select.onblurtag= false;
            try{
            	select.setActive();
            } catch(Exception){}
            select.focus();
            select.onkeypress = function(){
                this.onblurtag = true;
                if(event.keyCode == 13){
                    this.fireEvent("onblur");
					nextDivByDivid(divid,datatable);
					return false;
				}else{
					
				}
			}
            select.onchange = function() {
            	this.onblurtag = true;
            	var Index = select.options.selectedIndex;
			    var optText = select.options[Index].text;
			    var optValue = select.options[Index].value;
			    divobj.datarow[colname] = optValue;
			    if (optText.indexOf("-") > -1) {
			    	var optObj = optText.split("-");
				    divobj.datarow[colname+"_code"]=optObj[0];
				    divobj.datarow[colname+"_name"]=optObj[1];
			    } else {
			    	divobj.datarow[colname+"_code"]="";
				    divobj.datarow[colname+"_name"]=optText;
			    }
			    divobj.removeChild(select);
			    select = null;
			    divobj.innerHTML = optText;	
				if(datatable.ondatachange){
			    	var func = datatable.ondatachange;
			    	eval(func+"(datatable,divobj.datarow,col,optValue)");
			    } 
            }
            select.onblur =function(){
                if(!this.onblurtag) {
                	this.onblurtag = true;
                	return;
                }
			    var Index = select.options.selectedIndex;
			    var optText = select.options[Index].text;
			    var optValue = select.options[Index].value;
			    divobj.datarow[colname] = optValue;
			    if (optText.indexOf("-") > -1) {
			    	var optObj = optText.split("-");
				    divobj.datarow[colname+"_code"]=optObj[0];
				    divobj.datarow[colname+"_name"]=optObj[1];
			    } else {
			    	divobj.datarow[colname+"_code"]="";
				    divobj.datarow[colname+"_name"]=optText;
			    }
			    divobj.removeChild(select);
			    select = null;
			    divobj.innerHTML = optText;	
				if(datatable.ondatachange){
			    	var func = datatable.ondatachange;
			    	eval(func+"(datatable,divobj.datarow,col,optValue)");
			    } 
			}
			select.onclick =function(){
			   this.onblurtag = true;
			}
		}
	}
}
/**
* AJAX翻页
**/
function ajaxpost(param){
	var datatable = this;
	var url = "/common/ajaxtopage.do?tabletype="+datatable.tabletype+"&mainmenu="+datatable.mainmenu+"&submenu="+datatable.submenu+"&random="+Math.random();
	show();
	if(typeof(param)=="undefined" )var param = "";
	param = param.length>0?param:datatable.getPageParam();
	param += (param.length>0?"&":"")+ "linkname="+datatable.linkname+"&exportsql="+encodeURIComponent(datatable.exportsql);
	var myAjax = new Ajax.Request(url, 
	{
			   method : 'post', 
			   parameters : param,
			   onComplete : function(resp){ 
						try{
							eval("var json = "+resp.responseText);
							datatable.data = json.data;
							eval(json.pageinfo);
							if(eval(json.filter)) {
								datatable.allpage_totaljson = eval(json.filter);
							}
							datatable.show();
						}catch(err){}
						closeDiv();
					},
			   onFailure : function(resp) {
				  alert("网络异常");
				  closeDiv();
				}
	}); 
}

function getPositionTop(This){
	var el = This;var pT = 0;
	while(el){pT+=el.offsetTop;el=el.offsetParent;}
	return pT;
}
//取得对象的左边位置
function getPositionLeft(This){
	var el = This;var pL = 0;
	while(el){pL+=el.offsetLeft;el=el.offsetParent;}
	return pL;
}

 /**
* 显示列重新按默认排序
*  oArray :显示列
*  aArray :所有列排序
*/
function updateOrderArray(oArray,aArray){
  var i,j,isExist;
  var newArray = new Array();
  for(i = 0 ;i<aArray.length;i++) {
  	 isExist = false; 
  	 for(j = 0 ;j<oArray.length;j++) {
          if(aArray[i]==oArray[j]){
              isExist = true;
          }
     }
     if(isExist) newArray.push(aArray[i]);
  }
  return newArray;
}
//工资需要重写，将方法放开
function _doLock(_t){
	//i<_t.lockcolcount
	//_t.contentdiv
	//_t.contentdivfixed
	//c重新设置列宽
	Ext.lt.message.send("datatable","lock",_t);
	var colWidths=_t.colWidths;
	//1修正全部宽度。
	var fixedwidth=0;
	var trs=_t.contentdivfixed.getElementsByTagName("tbody").item(0).childNodes;
	var tds=trs[trs.length-2].childNodes;
	var _Index=_t.lockcolcount-1
	var fw=tds[_Index].offsetWidth+tds[_Index].offsetLeft;
	
	_t.contentdivfixed.getElementsByTagName("TABLE").item(0).style.width = fw+1;

	_t.contentdivfixed.style.width = fw+1;
	
	var _trs=_t.contentdiv.getElementsByTagName("tbody").item(0).childNodes;
	var _tds=_trs[trs.length-2].childNodes;
	var _fw=_tds[_Index].offsetWidth+_tds[_Index].offsetLeft;
	
	var _pw=_t.contentdiv.parentNode.offsetWidth;
		_t.contentdiv.style.width=_pw-(fw-_fw);
		_t.contentdiv.style.left=fw-_fw;
	_t.parent.style.overflow='hidden';
}
/*
var oldedittreefordatatable = edittreefordatatable;
var edittreefordatatable = function(rownum,value,row,tdobj,datatable){
	this.show1 = oldedittreefordatatable;
	this.show1(rownum,value,row,tdobj,datatable);
	var colid = this.name;
	var divobj = tdobj.firstChild;
	var oldvalue = value;
	divobj.onpropertychange = function(){
		if(this.blurtag&&value!=row[colid]){
			alert(value+"="+row[colid]);
			datatable.draw();
				}
			};
}
*/
