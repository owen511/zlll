if(typeof(JQ)=="undefined")
	document.write("<scr"+"ipt language='javascript' src='/js/jquery-1[1].3.1.js' ></scr"+"ipt>");
var COL_HEAD_NONE = 0;
var COL_HEAD_EDGE = 1;
var COL_HEAD_OVER = 2;
var COL_HEAD_SIZE = 3;
var COL_HEAD_DOWN = 4;
var COL_HEAD_MOVE = 5;
var COL_HEAD_NODA = 6;
var BOTTOM_SPACE = 0;
var DATATABLES = new Array();
function dataTable(){
	this.objecttype = "datatable";
	this.parent = null;	// �ϼ�Ԫ��
	this.data = new Array();	// ����
	this.datalen = 0;
	this.waitrefreshdata = new Array();//��ˢ�µ������ݡ�
	this.maxline = 20;  // Ĭ����ʾ����
	this.height = 0;
	this.startRowNum= 0;
	this.columnConfig = new Array();
	this.inputRuleConfig = new Array();
	this.showLevelConfig = new Array();
	this.filterConfig = new Array();
	this.actionConfig = new Array();
	this.actionRule = new Array();
	this.columnWidth =  new Array();
	this.timers = new Array();
	this.tabletype = null;
	this.linkname = null;
	this.labelmap = null;
	
	this.rightscrollotop =0;
	this.isWrap=false;
	this.autocomplete = false;
	this.isredraw = false;
	this.vp = 0; //�Զ����ͷ ����ͷ�߶Ⱥͱ�׼�Ĳ�ֵ
	this.contentdiv = null;		// ��ʾ���ݵ�div
	this.rightscrollbar = null; // ��������������߶ȵ�div
	this.rightscroll = null;	// �Ҳ����������
	this.borderdiv = null;		// ������ʾ�����div
	this.paginationdiv = null;	// ���Ʒ�ҳ�����div
	
	this.headHTML = null;		// ��ͷ����
	this.useThisHead = null;	// �Զ����ͷ���룬ganhua 20090320
	this.onrowclick = null;		// �����е���¼�
	this.onrowdblclick = null;	// �����е��˫���¼� wy 20091205
	this.ondatachange = null;
	this.onclickselectedall = null ;  //ѡ��ȫ���ⲿ�¼��ӿ�
	this.drawing = false;		// ��ʾ��ǰ�Ƿ����ڻ��Ʊ��
	this.currentSortCol=null;
	this.mainmenu = null;
	this.submenu = null;
	this.vchtypecode = null;
	this.customfield = null;
	this.trHeight = 22; //�иߣ� Ĭ��22
	this.headHeight = 22; //�иߣ� Ĭ��22
	this.TABLE_TR_H= 29;
	this.lockcolcount = 0; //�̶���
	this.firstDraw = true;
	this.drawtdIndex = 13;
	
	this.display = "block";		// ��ʾ��ʽ: block���ո��������С��ʾ  line�������õ�������ʾ
	this.disabled = false;	
	this.negative = false;
	this.totalConfig = new Array();
	this.disabledConfig = new Array();
	this.getTableHead = new Array();//��ȡ��ͷ����
	this.tableInitHead = new Array();//��ʼ��ͷ����
	this.setHeadHeight = function (headHeight){}; //wy ���ñ�ͷ�߶�
	this.setTRHeight = function (trHeight){}; //wy ���ñ�ͷ�߶�

	this.headeventhandler=function(){};//��ͷ�¼���
	this._mouseMove=function(){};
	this._mouseUp=function(){};
	this._scrollMove = function(){}; //�����ֹ����¼�
	this._removeLocalSetting=function(){};
	this._mouseDown=function(){};
	this._checkHeaderOperation = function(el, x) {}
	this._headerOper    = COL_HEAD_NONE;
	this._headerData    = null;
	this.bodyColResize = true;
 
	this.isShowRadio=false; //�Ƿ���ʾradio
	this.isShowCheckBox=false; //�Ƿ���ʾcheckbox
	this.isShowSerial=false;  //�Ƿ���ʾ���
	this.isTag=false; //�Ƿ�ͨ����ǩ����
	
	this.allflag = false;		// �Ƿ��ҳ
	this.page_page = 1; /** ��ǰҳ�� */
    this.page_pageSize = this.maxline; /** ÿҳ��¼�� */
    this.page_pageCount = 1;/** ��ҳ�� */
    this.page_totalRecord = 1;/** ����ҳ����ܼ�¼�� */
    this.page_formName = null; /** ������ */
    this.page_postUrl = null;/** �ڷ�ҳʱ, ��Ҫ�ύ��ҳ��(ָ��ҳҳ���.jsp��.do����). ��formName����action���� */
    this.page_hasPreviousPage = false; // �Ƿ�����һҳ
    this.page_hasNextPage = false;// �Ƿ�����һҳ
    this.page_previousPage = 1;//��һҳ
    this.page_nextPage = 1;// ��һҳ
    this.exportsql = null;
	
	this.tagPage=null;
    this.showHorizontalSB = true;
    this.sorter = null;//�������
    this.orderMap={};//���ÿ������״̬��Map���� 
    this.compareFuncMap={};//���ÿ����������Map����

	this.sumamtrow ="";// all ȫ���н�����
	this.setDisabledConfig = function(){};
	this.getDisabledConfig = function(){};
	this.selectedall = false;	// �Ƿ�ѡ��������	
	this.showstatus = false;	// �Ƿ���ʾ״̬��
	this.status = null;			// ״̬��
	this.sumAmtColumn = '0.00';
	this.isCreateAmtColumn = true;
	this.columnList=['amt'];		
	
	this.editTdDiv = null; //���潹���е�DIV
	this.columnEditor = new Object(); // �������ݼ�����
	this.appendrow = false;    // ��ʾʱ׷�ӵĿ����������в�����datatable�е�data�����У�һ���޸���appendrow����������������¼��data�����У�������һ���µĿ���
	this.checkedOnclick = false; // ��������ѡ�е����,��ֻ�ܵ�ѡ
	this.listenObject = new Object(); // �����¼�������
	this.allpage_totaljson={};//�ܺϼƶ���
	this.totalColumn=new Array();//�ܺϼ���
	this.tmainpaginationdivorg = "";//������ר��
	
	
	// ����ѡ���е�����
	this.getSelectedRow = function(){};
	// ѡ����������
	this.selectedallrows = function(){};
	this.selectedrow = function(){};
	// ������ͷ��HTML����
	this.setTableHead = function(){};
	// ׷��һ��������
	this.appendColumnConfig = function(){};
	this.getColumnConfig = function(){};
	// �������ȫ�ػ棬�޸�����ʱʹ��
	this.show = function(){};
	// �ػ�����ʾ���֣�û���޸�����ʱʹ��
	this.draw = function(){};
	// ��ȡ���ݱ��ı�ļ�¼
	this.getChangedRows = function(){};
	// �����ݱ����׷������
	this.appendRow = function(){};
	//�����ݱ���������
	this.insertRow = function(){};
	// ɾ��ѡ����
	this.removeSelected = function(){};
	// ���¼���datatable��������Ĵ�С
	this.resize = function(){};
	// �����ݻ����ж�ȡ��һ������
	this.getnextdata = function(){};
	// �������ݻ����е�����
	this.revertdata = function(){};
	// ���datatable�Ƿ��и�����
	this.hasColumn = function(){};
	// �����ݱ����а�һ���༭��
	this.attachColumn = function(){};
	// �������ݱ����¼���Ŀǰ֧�ֵ��¼��� onrowclick onrowselected onrowunselected
	this.listenEvent = function(){};
	// ����dataTable���¼�
	this.fireEvent = function(){};
	//���ӽ����
	this.appendAmtColumn = function(){};
	//�ж��Ƿ��н����
	this.isContainsAmtColumn = function(){};
	//���ϼ�	
	this.sumMainAmtToColumn = function(totaldbList){};
	
	this.getTotalVal = function(){};
	this.setTotalVal = function(){};
	//jjy20090508 ��ӷ��淽�� begin
	//������ҳ���
	this.createPagination = function(){};
	// ����û������ҳ���Ƿ�Ϸ�
	// ����ֵ��true-�Ϸ� false-�Ƿ�;
	this.checkPage = function (thePage) {};
	// ֧�ֻس���ת
	this.enterJump = function() {};
	// ��ת��ָ���ķ�ҳ
	this.gotoPage = function(thePage) {};
	// �ύ��ҳ��ת��
	this.submitGotoPage = function() {};
	//end ��ӷ��淽��
	this.onfocus=function(){};
	
	//���� jjy20090515
	this.sort_click = function(sortname,sorttype,cellindex){};
	this.toDate=function(ds){};//�ַ���ת���������� ��ʽ MM/dd/YYYY MM-dd-YYYY YYYY/MM/dd YYYY-MM-dd
	this.switchOrder=function(idx){};
	this.generateCompareFunc=function(sortname,type,cellindex,thobj){};//���������� 
	//���� end

	/*
		�ı�ϼ�ֵ
	*/	
	this.changetotalresult = function(obj){};
	/*
		�رպϼƷ�ʽ��
	*/
	this.closetotalmenu = function(obj){};
	/*
		��ʾ�ϼƷ�ʽ��
	*/
	this.showtotalmenu =function(){};

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
		// ��δѡ�е��зŵ��µ������У�Ȼ���滻datatable������
		var newdatas = new Array();
		var removedatas = new Array();
		
		for(var i=0;i<this.data.length;i++){
			if(this.data[i].checked){
				removedatas[removedatas.length] = this.data[i];
			}
			else {
				newdatas[newdatas.length] = this.data[i];			
			}
		}
		this.data = null;
		this.data = newdatas;
		this.waitrefreshdata = newdatas;
		this.isredraw = true;
		this.draw();
		this.resetscroll();
		return removedatas;
	}
	
	this.insertRow = function(row,startnum){
		row.ischangflag = false;
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
		row.ischangflag = false;
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
		}
	}
	
	this.isEditCol = function(col){
	   var colid = this.columnConfig[col].id;
	   if(colid.indexOf(".input")!=-1 || colid.indexOf(".file")!=-1)
	       return true;
	   return false;    
	}
	
	this.selectedallrows = function(selected){
		// ѡ��������
		for(var i=0;i<this.data.length;i++){
			this.data[i].checked = selected;
		}
	
		this.selectedall = selected;
		//20091011  ѡ��ȫ���ⲿ�¼��ӿ�
		if(this.onclickselectedall){
			onclickselectedall() ;			
		}
   		var dbody = this.getMainTable().getElementsByTagName("TBODY").item(1);
		var cellIndex =-1;
		for(i=0;i<this.columnConfig.length;i++){
		     if(this.columnConfig[i].name=="checkbox"){
		         cellIndex = i ; break;
		     }    
		}
		if(cellIndex==-1) return;
		for(i=0;i<dbody.childNodes.length;i++){
		     var trobj = dbody.childNodes[i];
		     var checkinput = trobj.cells[cellIndex].childNodes[0];
		     if(!selected){
		            checkinput.checked = false;
		         	trobj.className="main_table_title_letter";
		   		    trobj.onmouseover = function(){trobj.runtimeStyle.backgroundColor='#e8f4ff';};
		   		    trobj.onmouseout = function(){trobj.runtimeStyle.backgroundColor='';};
		     }else{
		            checkinput.checked = true;
			   		trobj.className="main_table_title_letter_selected";
			   		trobj.onmouseover = function(){trobj.runtimeStyle.backgroundColor='';};
			    	trobj.onmouseout = function(){trobj.runtimeStyle.backgroundColor='';};
			    	trobj.fireEvent("onmouseout");
		     }    
		}
		if(this.id!=undefined)setTimeout("if("+this.id+".isCreateAmtColumn) "+this.id+".sumMainAmtToColumn("+this.id+".totalColumn)", 1);
	}
	
	this.selectedrow = function(row,selected){
		// ѡ��������
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
		return this.getMainTable().getElementsByTagName("TBODY").item(0);
	}
	// ���ñ�ͷ
	this.setTableHead = function(heads,useColumWidth){
	    //��ͷ�п������Ƿ����
	    if(!useColumWidth) this.columnWidth = new Array();
	    //debugger;
	    if(typeof(heads)=="string"){//�ַ�����ͷ
		    if(heads=="") heads = new Array();
			  else
		    	heads = heads.split(",");
		}
		this.tableInitHead = heads;
	    if(!this.useThisHead){
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
                heads = updateArray(localheads,heads);
		    }     
	    }
	    
		this.getTableHead = heads;
		this.columnConfig.clear();
		
		// ������ͷ����
		if(this.useThisHead)
		{
			this.headHTML = this.useThisHead;
			for(var i=0;i<heads.length;i++){
				var head = heads[i];
				if(typeof(head) == "string"){
					var config = ColumnConfig[head.toLowerCase()];
					if(config == null){
						config = ColumnConfig["noFind".toLowerCase()];
					}
					// �Ѿ�����õ�ͨ������
					this.columnConfig[this.columnConfig.length] = config;
				}
				else{
					// �Զ�������
					this.columnConfig[this.columnConfig.length] = head;
				}
			}
		}else{
			var ths = null;
			if(this.parent!=null) ths = this.parent.getElementsByTagName("TH");
			var tbid ="'"+this.id+"_table'";
			this.headHTML = '<tr onselectstart="return false;" height="'+this.headHeight+'px" id="'+this.id+'_headeventhandler" title="��������������ʵ���б�����" class="main_table_title">';
			for(var i=0;i<heads.length;i++){
				var head = heads[i];
				var sorttype ="STRING";
				var sortname = head ;
				if(sortname.indexOf(".")!=-1) sortname=sortname.substring(0, sortname.indexOf("."))	;//֧��*.input
				if(typeof(head) == "string"){
					var config = ColumnConfig[head.toLowerCase()];
					if(config == null){
						config = ColumnConfig["noFind".toLowerCase()];
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
					if(config.type=="C"){  //����code-name������code���� by jiazhiyu
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
			   
			    var wid= "";
			    if((this.bodyColResize && !this.isWrap) && this.columnWidth[i]){
					wid = this.columnWidth[i];
				}
			    else {
					if(ths!=null&&ths.length>i){
						 wid=(ths[i].offsetWidth-1);
					}
					if(head=="serial") wid=30;
					if(head=="checkbox"||head=="radio") wid=35;
			    }
				wid = "width:"+wid+"px;";
				//�̶��й������϶���ͷlp 100612
				var thclass = "";
				if(this.contentdiv != null && this.contentdiv.innerHTML != "null" && !this.useThisHead && this.showHorizontalSB){
				   var rehead = this.getMainTable().rows[0].children;
				        var headStyle = rehead[i]?rehead[i].className:"";
				        if(headStyle.indexOf("FixedTitleColumn")!=-1)thclass = "class=\"FixedTitleColumn\"";

				}else{
					if(i<this.lockcolcount)thclass = "class=\"FixedTitleColumn\"";
				}
				this.headHTML += "<th style=\""+wid+"\" nowrap=\"nowrap\" "+thclass+" sortname=\""+sortname+"\" sorttype=\""+sorttype+"\"  id=\""+this.id+"_"+head+"\">";
				if(typeof(head) == "string"){
					var config = ColumnConfig[head.toLowerCase()];
					if(config == null){
						config = ColumnConfig["noFind".toLowerCase()];
					}
					// �Ѿ�����õ�ͨ������
					this.columnConfig[this.columnConfig.length] = config;
					//ȫѡ״̬ lp
					if(config.type=="checkbox" && this.selectedall){
						this.headHTML += '<input id="'+this.id+'_allbox" name="allbox" type="checkbox" onclick="this.parentElement.parentElement.parentElement.parentElement.datatable.selectedallrows(this.checked)" CHECKED/>'
					}
					else{
						this.headHTML += typeof config.title=="function"?config.title(this):config.title;
					}
				}
				else{
					// �Զ�������
					this.columnConfig[this.columnConfig.length] = head;
					this.headHTML += head.title;
				}
				//�����ʶ*,�����Ǳ༭���ұ����ʶΪ1
				if(config.id.indexOf(".")>-1 && config.requirement=='1'){
						this.headHTML += '<span style="color:red;">*</span>';
				}
				if((this.currentSortCol==0 || this.currentSortCol) && this.currentSortCol==i){
				  var img = "desc.gif";
		   	      if(this.orderMap[i]=='asc')img = "asc.gif";
		   	      this.headHTML += "<a name=\"sortcol_img\"><img src=\""+ ROOT_PATH + "/images/actions/"+img+"\" width=\"22px\" height=\"22px\" border=\"0\" align=\"absmiddle\" /></a></th>";
			   	}else{
				  this.headHTML += "<a name=\"sortcol_img\"></a></th>";
			   	}
			}
			this.headHTML += '</tr>';
		}
		//�������ϼ���
		this.appendAmtColumn(heads);

	}	
	//wy ���ñ�ͷ�߶�
	this.setHeadHeight = function (headHeight){
		this.headHeight = headHeight;
	}

	//wy ���ñ������и߶�
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
		if(this.parent.parentElement.offsetHeight > 0){
			DATATABLES[DATATABLES.length] ={"id":this.id,"height":this.parent.parentElement.offsetHeight};
			this.parent.style.height = this.parent.parentElement.offsetHeight-23; //��ȥ��ҳ�� 22��
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
			var bottomdiv = JQ(".bottomdiv");
			if(bottomdiv.length > 0){
				BOTTOM_SPACE = document.body.clientHeight - bottomdiv.offset().top - 10;
				//JQ(".bottomdiv").html(JQ(".bottomdiv").html()+","+BOTTOM_SPACE);
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
				//this.parent.style.height = zoomHeight - 22; //��ȥ��ҳ�� 22
				this.show();
			}
		}
	}
	this.show = function(){
		this.unZiplabel();
		if(typeof(this.beforeShow)=="function"){
			this.beforeShow();
		}
		if(this.parent == null) return ;
		if(this.lockcolcount>0)this.setTableHead(this.getTableHead,true);
		this.parent.dataTable = this;
		// ���Ԫ������
		this.parent.innerHTML = "";
		// ������ʼHTML����
		var borderdiv = document.createElement('<div id=borderdiv style="position:relative;height:expression(this.offsetParent.offsetHeight);width:expression(this.offsetParent.offsetWidth-1);overflow:hidden"></div>');
		var contentdiv = document.createElement('<div id="'+this.parent.id+'_contentdiv" style="position:absolute;height:expression(this.offsetParent.offsetHeight);width:expression(this.offsetParent.offsetWidth-15);overflow-x:'+(this.showHorizontalSB?'scroll':'hidden')+';overflow-y:hidden;"></div>');
		var rightscroll = document.createElement('<div id =rightscroll style="position:absolute;left:expression(this.offsetParent.offsetWidth-17);width:16px;overflow-y:scroll;height:expression(this.offsetParent.offsetHeight-(('+this.parent.id+'_contentdiv.scrollWidth>'+this.parent.id+'_contentdiv.offsetWidth)?15:0));"></div>');
		var rightscrollbar = document.createElement('<div id="aaaa" style="height:50%"></div>');
		//this.status = document.createElement('<div style="height:20px;overflow:hidden;margin-top:expression(this.offsetParent.offsetHeight-this.offsetHeight);background-color:red">sfsa</div>');
		//var paginationdiv = document.createElement('<div id=\"paginationdiv\" style="position:relative;height:50px;width:expression(this.offsetParent.offsetWidth-1);overflow:hidden"></div>');
		// ��װ���
		rightscroll.appendChild(rightscrollbar);
		borderdiv.appendChild(rightscroll);
		borderdiv.appendChild(contentdiv);
		this.parent.appendChild(borderdiv);
		this.setMaxLine();
		
		//this.parent.appendChild(paginationdiv);
		//this.parent.appendChild(this.status);
		//alert(this.parent.outerHTML)
		
		this.borderdiv = borderdiv;
		this.rightscrollbar = rightscrollbar;
		this.rightscroll = rightscroll;
		this.contentdiv = contentdiv;
		this.borderdiv.id = this.parent.id + "_dataTable";
		this.borderdiv.dataTable = this;
		//this.paginationdiv = paginationdiv;
		//wy �Ҳ�����������ݵĹ�������λ�����ܳ������ݷ�Χ
	   	var contentdivObj = this.contentdiv;
	   	var datalength = this.data==null?0:this.data.length;
	   	this.rightscrollotop=0;	 	
		this.rightscroll.onscroll = function(){	
			if(!this.parentElement.dataTable.drawing){
				this.parentElement.dataTable.drawing = true;
				//���ƹ������߶�
				var otop = eval(this.parentElement.id+".dataTable.rightscrollotop");    
				var trheight= parseInt(this.parentElement.dataTable.TABLE_TR_H);
				if(this.parentElement.dataTable.TABLE_TR_H-trheight>0)
				    trheight = trheight+1;
				if(this.scrollTop-otop<this.parentElement.dataTable.TABLE_TR_H && this.scrollTop-otop>0)  this.scrollTop=otop+trheight;
				if(this.scrollTop-otop<=0 && this.scrollTop-otop>(this.parentElement.dataTable.TABLE_TR_H*-1)) this.scrollTop=otop-trheight;
				var code = this.parentElement.id+".dataTable.draw()";
				window.setTimeout(code,1);	
				//$("debuginfo").innerHTML = $("debuginfo").innerHTML+("onscroll,");
			}
//		    // wy ���ù������߶�ֵ(�����ݸ���ƥ��) 20100119
//			if(datalength >0){
//				var table = contentdivObj.getElementsByTagName("TABLE").item(0);
//				var tr_h = table.childNodes[0].offsetHeight;
//				var showlength = Math.round(contentdivObj.offsetHeight/tr_h-2);
//	    		// ������ʼ��ʾ�����ݼ�¼
//	    		var startnum = datalength-showlength;
//	    		var maxlength = parseInt(startnum,10)*this.TABLE_TR_H;
//	    		if(this.scrollTop >maxlength){
//	    			this.scrollTop = maxlength;
//	    		}
//			}
   		}
        if(this.useThisHead) this.bodyColResize = true;
   		this.selectedall = false; //ˢ��Ӧ�ò�ѡ��
		// ����ʾ�������
		this.draw();
		this.firstDraw = false;
		//this.setFixedLayout();
		//setTimeout(function(){
		//	datatable.setFixedLayout();
		//},100);
    	
		// ���������ƫ����
		var scrollwidth = this.rightscroll.offsetWidth+1;
		this.rightscroll.style.width = scrollwidth+100;
		this.rightscroll.style.setExpression("left","this.offsetParent.offsetWidth-"+this.rightscroll.offsetWidth);
		this.contentdiv.style.setExpression("width","this.offsetParent.offsetWidth-"+(scrollwidth));
		this.resetscroll();
		//�Ƿ��ҳ
		//if(this.allflag){
		//	this.createPagination();		
		//}
		

		if(this.display == "line"){
			//this.contentdiv.style.overflowY = "visible";
			this.parent.style.height = ($(this.parent.id+"_contentdiv").scrollWidth>$(this.parent.id+"_contentdiv").offsetWidth)?$(this.parent.id+"_contentdiv").getElementsByTagName("TABLE").item(0).offsetHeight+15:$(this.parent.id+"_contentdiv").getElementsByTagName("TABLE").item(0).offsetHeight;
		}
		this.headeventhandler();
		this.parent.hiddenClick = function(){this.focus();/*this.dataTable.focusObj= this;*/}
		//this.parent.onclick = function(){this.dataTable.focusObj= this;}
		//this.parent.onblur = function(){this.dataTable.focusObj= null;}
	}
	this.setFixedLayout = function(){
		if (this.data && this.data.length>0 &&!this.useThisHead && !this.isWrap && this.bodyColResize) {
	    	var tableobj = this.getMainTable();
			if(tableobj.style.tableLayout != "fixed"){
				this.resetTdWidth(0,-1);
				tableobj.style.tableLayout= "fixed";
			}
		}
	}
	//�������ñ����
	this.resetTdWidth = function(startCol,endCol){
		//���þ����ȣ� �����ֺ��л���ȱ�С
		if(this.data && this.data.length>0 &&(document.getElementById(this.id+"_div")==null || document.getElementById(this.id+"_div").offsetWidth<this.contentdiv.getElementsByTagName("TABLE").item(0).offsetWidth)){
			var headbody = this.contentdiv.getElementsByTagName("TABLE").item(0).getElementsByTagName("TBODY").item(0);
			var cols = this.columnConfig.length;          
			for(i=0;i<headbody.childNodes.length;i++){
			    trobj = headbody.childNodes[i];
			    if(trobj.childNodes.length==cols){
					if(endCol == undefined || endCol == -1){
						endCol = cols;
					}
			        for(j= startCol;j< endCol;j++){
			           trobj.cells[j].style.width= trobj.cells[j].offsetWidth;
					    this.columnWidth[i] = trobj.childNodes[i].offsetWidth;
			        }
			        break;
			    }
			}
	        /*
	        var tableobj = this.contentdiv.getElementsByTagName("TABLE").item(0);
			tbodyobj = tableobj.childNodes[1] ;//alert(tableobj.childNodes[1].childNodes.length);
	        if(tbodyobj.childNodes.length>0){
	    	     var trobj = tbodyobj.childNodes[0];
	    	     for(var i = 0 ;i<trobj.childNodes.length;i++){
	    	        //alert(trobj.childNodes[i].offsetWidth);
	    	        this.columnWidth[i] = trobj.childNodes[i].offsetWidth;
	    	        trobj.childNodes[i].style.width=(trobj.childNodes[i].offsetWidth+1)+"px";
	    	        
	    	     }
	    	}
			*/
    	}
	}
	
	this.resetscroll = function(){
	    if(this.isWrap){
			   // ���ù�����Ĭ��ֵ
				if(this.data != null){
					var table_h = this.contentdiv.getElementsByTagName("TABLE").item(0).offsetHeight;
					var div_h = this.contentdiv.offsetHeight;
					if(table_h>div_h || this.maxline<this.data.length){
						// ��Ҫ��ʾ���������㳬������
						var h = (this.data.length)*this.TABLE_TR_H+parseInt(this.contentdiv.offsetHeight,10)+20;
						this.rightscrollbar.style.height = (h>0)?h:10;
					}
				}
		}else{
				if(!this.vp) this.vp=0;
			    var headbody = this.contentdiv.getElementsByTagName("TABLE").item(0).getElementsByTagName("TBODY").item(0);
			    
				// ���ù�����Ĭ��ֵ
				if(this.data != null){
					var table_h = this.contentdiv.getElementsByTagName("TABLE").item(0).offsetHeight;
					var div_h = this.contentdiv.offsetHeight;
					if(table_h>div_h || this.maxline<this.data.length){
						// ��Ҫ��ʾ���������㳬������
						var h = (this.totalConfig&&this.totalConfig.length>0?(this.data.length+1):this.data.length)*this.TABLE_TR_H+this.vp + headbody.offsetHeight;//+ parseInt(div_h,10) + 20;//tableobj.trsheight;//
						this.rightscrollbar.style.height = (h>0)?h:10;
					}
				}
		}		
	}
	
	this._removeLocalSetting = function(e){
	   var el;
	   el = (e)?e.target:window.event.srcElement;
	   if(el.tagName == "th" || el.tagName=="TH"){
		   removeUserData(this.id,this.tabletype);
		   this.setTableHead(this.tableInitHead);
		   this.show();
		}   
	}
	
	this.headeventhandler= function(){
		var headobj = this.getMainTable();//document.getElementById(this.id+"_headeventhandler");//this.contentdiv;//
		headobj.datatable= this;

		headobj.onmousedown = function(e) {this.datatable._mouseDown(e);}
		headobj.onmousemove = function(e) {this.datatable._mouseMove(e);}
		headobj.onmouseup   = function(e) {this.datatable._mouseUp(e); }
		headobj.ondblclick   = function(e) {this.datatable._removeLocalSetting(e);}
		//headobj.onmouseout   = function(e) {this.datatable._mouseOut(); }
		headobj.onmousewheel =  function(e) {this.datatable._scrollMove(e);stopBubble(e);}
		 
	}

	this._mouseMove = function(e) {
		var el, x, w, tw, ox, rx, i, l;
		el = (e)?e.target:window.event.srcElement;
		//window.status ="s:"+(this._headerOper == COL_HEAD_DOWN);
		if(el.tagName != "th" && el.tagName!="TH" && el.tagName!="TABLE" && el.tagName!="IMG"){
		    this._headerOper = COL_HEAD_NONE;
			//this._headerData[0].className = '';
			this._headerData = null;
			if (this._moveEl)    { this.contentdiv.removeChild(this._moveEl);    this._moveEl    = null; }
			if (this._moveSepEl) { this.contentdiv.removeChild(this._moveSepEl); this._moveSepEl = null; }
		    return;
		}
		if(el.tagName!="th" && el.tagName!="TH") return;
		x = (e)?e.pageX:window.event.x + this.contentdiv.scrollLeft;
		
		if ((this._headerOper == COL_HEAD_DOWN)&&this._headerData!=null) {
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
			if(tw<this.parent.offsetWidth-20) return;
			var tableobj = this.contentdiv.getElementsByTagName("TABLE").item(0);

			var trs = tableobj.getElementsByTagName("tr");
			if (w > 5) {
			    var cellIndex = this._headerData[0].cellIndex;
			    this.columnWidth[cellIndex]=w;// ��С�����ֵ
			    for (i = 0; i < trs.length; i++){
			    	  if(this.currentSortCol != null&&this.currentSortCol ==cellIndex){
			    	  	//������������ͼƬʱ
			          	trs[i].cells[cellIndex].style.width = w +25+ 'px';
			          }else{
			          	trs[i].cells[cellIndex].style.width = w + 'px';
			          }
			          
			    }
				if (this.bodyColResize) {
				    
					tableobj.style.width = tw + 'px';
			    }
			    setColStyleWidth(this.columnConfig[cellIndex],w + 'px');
			    this.resetscroll(); 	
			}	
		}else{
			this._checkHeaderOperation(el, x);
		}
	}
	this._scrollMove = function(e){
  		if(document.activeElement != null && document.activeElement !='' && document.activeElement.isContentEditable == true){
			if(typeof document.activeElement.id != "undefined"&&document.activeElement.id != ""){
				document.getElementById(document.activeElement.id).blur();
			}else{
				document.activeElement.blur();
			}
			
		}
		el = (e)?e.target:window.event;
		if(el.wheelDelta < 0){
			this.rightscroll.scrollTop=  this.rightscroll.scrollTop+parseInt((el.wheelDelta/-120))*this.TABLE_TR_H;
		}
		if(el.wheelDelta > 0){
			this.rightscroll.scrollTop =  this.rightscroll.scrollTop-parseInt((el.wheelDelta/120))*this.TABLE_TR_H;
		}
		this.id+".draw()";		
	}
	this._mouseUp = function(e) {
		var el, x, w, tw, ox, rx, i, l;
		el = (e)?e.target:window.event.srcElement;
		
		if(el.tagName=="IMG" && el.parentNode!=null && el.parentNode.parentNode!=null && (el.parentNode.parentNode.tagName=="th" || el.parentNode.parentNode.tagName=="TH")){
			if(this._headerOper == COL_HEAD_DOWN) 
				this.sort_click(el.parentNode.parentNode);
		}
		if(el.tagName=="th" || el.tagName=="TH"){
		    //window.status=(this._headerOper == COL_HEAD_MOVE);
			x = (e)?e.pageX:window.event.x + this.contentdiv.scrollLeft;
			if(this._headerOper == COL_HEAD_DOWN) {
				this.sort_click(el);
		    }else if (this._headerOper == COL_HEAD_MOVE) {
				if (this._moveEl)    { this.contentdiv.removeChild(this._moveEl);    this._moveEl    = null; }
				if (this._moveSepEl) { this.contentdiv.removeChild(this._moveSepEl); this._moveSepEl = null; }
				this._moveColumn(this._headerData[0].cellIndex, el.cellIndex);
			}
		}
        if(this._headerOper == COL_HEAD_NODA){
            //alert("");
        }
        
		if (this._headerOper != COL_HEAD_NONE) {
			this._headerOper = COL_HEAD_NONE;
			if(el.tagName=="IMG" && el.parentNode!=null && el.parentNode.parentNode!=null && (el.parentNode.parentNode.tagName=="th" || el.parentNode.parentNode.tagName=="TH")){
				el.parentNode.parentNode.style.cursor = 'default';
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
	}
	this._mouseDown = function(e) {
		var el, x, w, tw, ox, rx, i, l;
		el = (e)?e.target:window.event.srcElement;
		erl = window.event.button;
		if(erl==1){
			if(el.tagName=="IMG" && el.parentNode!=null && el.parentNode.parentNode!=null && (el.parentNode.parentNode.tagName=="th" || el.parentNode.parentNode.tagName=="TH")){
				this._headerOper = COL_HEAD_DOWN;
				if(this._headerData != null && this._headerData[0].className != "FixedTitleColumn")
				this._headerData[0].className = 'columnlist-active-header';
				return;
			}
			if(el.tagName=="th" || el.tagName=="TH"){
				x = (e)?e.pageX:window.event.x + this.contentdiv.scrollLeft;
				
				this._checkHeaderOperation(el, x);
				if (this._headerOper == COL_HEAD_EDGE) {
					//if (this.bodyColResize) { this._sizeBodyAccordingToHeader(); }
					this._headerOper = COL_HEAD_SIZE;
				}
				else if (this._headerOper == COL_HEAD_OVER) {
					if(el.id ==this.id+"_serial" || el.id ==this.id+"_radio" || el.id ==this.id+"_checkbox"){
					    this._headerOper =  COL_HEAD_NODA;
					}else{
					    this._headerOper = COL_HEAD_DOWN;
					    if(this._headerData[0].className != "FixedTitleColumn")
						this._headerData[0].className = 'columnlist-active-header';
					}
				}
			}
	}
		//alert(this._headerOper);
	if(erl == 2 && this.bodyColResize){
		   // debugger;
		   if(el.tagName=="th" || el.tagName=="TH"){
		   var ie5 = document.getElementById("ie5menu");
		   if(ie5 !=null)
		   {
		     document.body.removeChild(ie5);
		   }
		   //���Ҫ�̶������������ӷ�Χ�򲻿ɹ̶�
		   var cw = document.getElementById(this.parent.id+'_contentdiv').offsetWidth;
		   var w1 = el.offsetLeft ;
		   var w2 = el.offsetWidth;
		   var mw = w1 + w2;
		   //alert("cw="+cw+";mw="+mw);
		   if(mw>cw && el.className != "FixedTitleColumn") return ;
		   var rightbutton= document.createElement('<div id="ie5menu"></div>');
		   var content = document.createElement('<div  onmouseover="onMOvera(this)" onmouseout="onMOuta(this)" class="select" id="fix"></div>');
	       var content1 = document.createElement('<div  onmouseover="onMOvera(this)" onmouseout="onMOuta(this)" class="select" id="cancelFix"></div>');
	       content.innerText = "�̶���";
	       content1.innerText = "ȡ���̶���";
	       rightbutton.appendChild(content);
	       rightbutton.appendChild(content1);
	       document.body.appendChild(rightbutton);
		    /*�����ǰ�������Internet Explorer��document.all�ͷ�����*/
	       if (document.all && window.print) {
	        /*ѡ��˵��������ʾ��ʽ*/
	       ie5menu.className = menuskin;
	       //debugger;
	       //������
	       var tab = el.offsetParent;
	       //��ͷ��
	       var tab_title = tab.children[0];  
	       //�ϼ���
	       var tab_tot = document.getElementById(this.id+"_tot");
	       var otr = tab.getElementsByTagName("TR");
	       var otot = tab_tot.getElementsByTagName("TD");
	       var oth_title = tab_title.getElementsByTagName("TH");
	       var trlen = otr.length;
	       var datatable = this;
	       //��ӹ̶���ʽ
	       document.getElementById("fix").onclick= function fixstyle(){
			     if(datatable.lockcolcount>0){
						 document.getElementById("cancelFix").click();
				 }
				 datatable.lockcolcount = el.cellIndex+1;
				 if(el.mycellindex!=null){
					 datatable.lockcolcount = parseInt(el.mycellindex)+1;
				 }
				for(var i=0;i<oth_title.length;i++){
					var oth = oth_title[i];
					var cellindex = oth.cellIndex;
					if(oth.mycellindex!=null) cellindex= parseInt(oth.mycellindex);
					if(cellindex<datatable.lockcolcount){
						oth.className="FixedTitleColumn";
					}
				}				 

	             for(var m = 0;m<trlen;m++)
	             {
	                 var otd = otr[m].getElementsByTagName("TD");
	                 for(var n = 0;n<datatable.lockcolcount;n++)
	                  {
		                    otot[n].className="FixedDataColumn";
		                    if(otd[n]!=undefined)
		                    {
		                      otd[n].className="FixedDataColumn";
		                    }
			          }
			      }
	      }
	      //ȡ���̶���ʽ
	       document.getElementById("cancelFix").onclick= function cancelfixstyle(){
				for(var i=0;i<oth_title.length;i++){
					var oth = oth_title[i];
					var cellindex = oth.cellIndex;
					if(oth.mycellindex!=null) cellindex= parseInt(oth.mycellindex);
					if(oth.className == "FixedTitleColumn"){
						if((cellindex+1)>datatable.lockcolcount)datatable.lockcolcount = cellindex+1;
						oth.className="";
					}
				}	

	             for(var m = 0;m<trlen;m++)
	             {
	                 var otd = otr[m].getElementsByTagName("TD");
	                 for(var n = 0;n<datatable.lockcolcount;n++)
	                 {
						   oth_title[n].className= "";
		                   otot[n].className="";
		                   if(otd[n]!=undefined)
		                   {
		                      otd[n].className="";
		                   }
	         		 }
	      		 }
				 datatable.lockcolcount = 0;
	     	}
	       /*�ض�������Ҽ��¼��Ĵ������Ϊ�Զ������showmenuie5*/
	       el.parentElement.oncontextmenu = function(){return showmenuie5("ie5menu");};
		   //window.status = "showmenuie5";
	       /*�ض����������¼��Ĵ������Ϊ�Զ������hidemenuie5*/
	       document.body.onclick = function(){return hidemenuie5("ie5menu");};;
        }
      }
    }
}
	
	this._checkHeaderOperation = function(el, x) {
	    if(el.tagName!="th" && el.tagName!="TH") return;
	    var prev, next, left, right, l, r,leftwidth;
	    leftwidth = 0;
	    if(document.getElementById("left_tree"))
	    	leftwidth = document.getElementById("left_tree").offsetWidth;
	    if(document.getElementById("switchBar"))
	    	leftwidth =  leftwidth+document.getElementById("switchBar").offsetWidth; 
	    if(document.getElementById("inacct_tree"))
	    	leftwidth =  leftwidth+document.getElementById("inacct_tree").offsetWidth; 
		prev = el.previousSibling;
		next = el.nextSibling;
		left = getLeftPos(el)-leftwidth;
		right = left + el.offsetWidth;
		l = x - left+10;
		r = right - x-15;
        //alert("l:"+l+";r:"+r);
		if ((l < 3) && (prev)) {
		    //alert("l:"+l+";r:"+r);
		    //alert("left:"+left+";right:"+right+";el.offsetWidth:"+el.offsetWidth);\
		    //alert("l:"+l);
		    if(el.className=="FixedTitleColumn") {
		    el.parentNode.style.cursor = 'default';
		    return};
		    if(this.columnConfig[el.cellIndex].id=="radio" || this.columnConfig[el.cellIndex].id=="checkbox")
		        return;
			el.parentNode.style.cursor = 'e-resize';
			this._headerOper         = COL_HEAD_EDGE;
			this._headerData         = [prev, prev.offsetWidth - 5, x, el.parentNode.offsetWidth];
			
		} else if (r < 5) {
		    //alert(r);
		    //alert("l:"+l+";r:"+r);
		    //alert("left:"+left+";right:"+right+";el.offsetWidth:"+el.offsetWidth);
			el.parentNode.style.cursor = 'e-resize';
			this._headerOper         = COL_HEAD_EDGE;
			this._headerData         = [el, el.offsetWidth - 5, x, el.parentNode.offsetWidth];
		}else {
			el.parentNode.style.cursor = 'default';
			this._headerOper         = COL_HEAD_OVER;
			this._headerData         = [el, el.offsetLeft, x, getLeftPos(el), el.cellIndex];
		}	
    }
	
    
    /*
	 * 
	 */
	this._moveColumn = function(iCol, iNew) {
		var i, oParent, oCol,wCol, oBefore, aRows , rown , a,iCol,headstring;
		if(this.columnConfig==null){ return; }
		if(iNew<2) {
		   if(this.columnConfig[0].name == "serial" || this.columnConfig[0].name == "checkbox" || this.columnConfig[0].name == "radio") iNew = 1;
		   if(this.columnConfig[1].name == "serial" || this.columnConfig[1].name == "checkbox" || this.columnConfig[1].name == "radio") iNew = 2;
		}
		if (iCol == iNew) { return; }
        
        aRows = this.getMainTable().getElementsByTagName("tr");
		rown = aRows.length;
		//����̶����޷��϶�,ͬʱ�޷���̶��в��������б�
		var tab_colMove_tot =  document.getElementById(this.id+"_tot");
		var otot_colMove = tab_colMove_tot.getElementsByTagName("TD");
		if(otot_colMove[iNew].className == "FixedDataColumn" || otot_colMove[iCol].className == "FixedDataColumn" ){
			return;
		}
		for (i = 0; i < rown; i++) {
			oCol    = aRows[i].cells[iCol];
			oParent = aRows[i];
			if (iNew == aRows[i].cells.length) {
				oParent.removeChild(oCol);
				oParent.appendChild(oCol);
			}else {
				oBefore = aRows[i].cells[iNew];
				oParent.removeChild(oCol);
				oParent.insertBefore(oCol, oBefore);
			}	
		}
		
		rown = this.columnConfig.length;
		a = new Array(); b = new Array();
		oCol = this.columnConfig[iCol];
		wCol = this.columnWidth[iCol];
        for(i = 0; i < rown; i++){
				if (i == iCol) { continue; }
				if (i == iNew) { a.push(oCol); b.push(wCol);}
				a.push(this.columnConfig[i]);
				b.push(this.columnWidth[i]);
		}
		//if(iNew == rown-1) a.push(oCol);
		headstring = "";
		this.columnConfig = a;
		this.columnWidth = b;
		
		for(i = 0; i < rown; i++){
		        if(this.columnConfig[i].name=="noFind" || this.columnConfig[i].name=="nofind") return;
		        if(this.columnConfig[i].name == "checkbox" || this.columnConfig[i].name == "radio" || this.columnConfig[i].name == "serial"){
		           continue;
		        }
		        headstring = headstring + this.columnConfig[i].id;
				if (i < rown-1) { headstring = headstring+",";}
		}
		setUserDataByElementId(this.id,this.tabletype,headstring);
	}   
	function trobjDblclick(){
		if(event.srcElement==this&&!event.type=="dbclick"){
			return;
		}
		var datatable = this.datatable;    							
		for(var i=0;i<datatable.columnConfig.length;i++){
			// ����ÿһ�ж�Ӧ�ı༭��
			var colconfig = datatable.columnConfig[i];
			var columnediter = datatable.columnEditor[colconfig.id];
			if(columnediter != null){
				// �ҵ��༭��,���ñ༭��ĸ�ֵ����
				columnediter.setDataRow(this.data[colconfig.id],this.data,datatable);
			}
		}
		
		if(datatable.checkedOnclick){
			// �����ǰ��û��ѡ��,��ѡ�и���
			if(this.data.checked != true){
				var rows = datatable.getSelectedRow();
				for(var i=0;i<rows.length;i++){
					rows[i].checked = false;
				}
				
				this.data.checked = true;
				datatable.draw();
			}
		}   				
		
		// �����Զ����datatable˫���¼�
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
			// ����ÿһ�ж�Ӧ�ı༭��
			var colconfig = datatable.columnConfig[i];
			var columnediter = datatable.columnEditor[colconfig.id];
			if(columnediter != null){
				// �ҵ��༭��,���ñ༭��ĸ�ֵ����
				columnediter.setDataRow(this.data[colconfig.id],this.data,datatable);
			}
		}
						
		if(datatable.checkedOnclick){
			// �����ǰ��û��ѡ��,��ѡ�и���
			if(this.data.checked != true){
				var rows = datatable.getSelectedRow();
				for(var i=0;i<rows.length;i++){
					rows[i].checked = false;
				}
				
				this.data.checked = true;
				datatable.draw();
			}
		}
		
		// �����Զ����datatable����¼�
		if(this.onrowclick){
			this.onrowclick(this.data);
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
	this.getTdWidth = function(ths,i){
		if(this.firstDraw) return "";
		var wid = "50";
		if((this.bodyColResize && !this.isWrap) && this.columnWidth[i]){
			wid = this.columnWidth[i];
		}
		else {
			if(ths!=null&&ths.length>i){
				 wid=(ths[i].offsetWidth);
			}
		}
		return ";width:"+wid+"px";
	};
	this.drawTrObj = function(row,trobj,ths,index){
			var curdrawtdIndex = this.drawtdIndex;
			var cols = this.columnConfig.length;
			var isFirst = (index==0);
			if(ths==undefined||ths==null)
			   ths = this.getTableThs();
			//�����ж���
			if(trobj!=undefined&&trobj!=null){
				var j=0;
					if(row.showinfo!=null&&row.showinfo == true&&row.checked){
					   trobj.className="main_table_title_letter_info";
					} else if(row.checked == true){
					   trobj.className="main_table_title_letter_selected";
					} else {
					  trobj.className="main_table_title_letter";
					  trobj.onmouseover = function(){this.runtimeStyle .backgroundColor='#e8f4ff';};
					  trobj.onmouseout = function(){this.runtimeStyle .backgroundColor='';};
					}
					trobj.data = row;
				(function () {
					do{
						var column = trobj.datatable.columnConfig[j];
						var oldtdobj = trobj.childNodes(j) ;
						if(oldtdobj == null) return ;
						var tdobj = document.createElement('<td onmouseout="return nd();" style="'+column.style+'" nowrap></td>');
						eval("var value = row."+column.name);
						// ������׷�ӵ�Ԫ��
						trobj.appendChild(tdobj);
						tdobj.id= trobj.datatable.id+'-'+column.name+'-'+row.rownum;
						//lp �̶���ʱ��
						var fixStyle = ths[j].className;
						//tdobj.style.width = ths[j].offsetWidth-1;
						if(fixStyle=="FixedTitleColumn"){// && trobj.className == "main_table_title_letter"){
							tdobj.className = "FixedDataColumn";
						}
						column.show(row.rownum,value,row,tdobj,trobj.datatable);
						trobj.replaceChild(tdobj, oldtdobj);
						JQ(tdobj).data("colconfig",column);
						j++;
					}while((j<= curdrawtdIndex ||isFirst) && j < trobj.childNodes.length)
					if (j < trobj.childNodes.length) {
						//curdrawtdIndex += 1;
						trobj.datatable.timers[trobj.datatable.timers.length]= setTimeout(arguments.callee, 50);
					}
				})();
				return;
			}
			// ����ÿ�е�TR����
			trobj = document.createElement("TR");
			trobj.style.height = this.trHeight+"px";
			trobj.className="main_table_title_letter";
			//����������
			if(row.showinfo!=null&&row.showinfo == true&&row.checked){
			   trobj.className="main_table_title_letter_info";
			} else if(row.checked == true){
			   trobj.className="main_table_title_letter_selected";
			} else {
			  trobj.onmouseover = function(){this.runtimeStyle .backgroundColor='#e8f4ff';};
			  trobj.onmouseout = function(){this.runtimeStyle .backgroundColor='';};
			}
	
			trobj.datatable = this;
			var settr = true;
			(function () {
				if(settr){
					trobj.data = row;
					if(trobj.datatable.onrowclick){
						trobj.onrowclick = trobj.datatable.onrowclick;
					}
					//wy ������˫���¼�
					if(trobj.datatable.onrowdblclick){
						trobj.onrowdblclick = trobj.datatable.onrowdblclick;
					} 
					trobj.ondblclick = trobjDblclick;
					trobj.onclick =  trobjClick;
					trobj.onmouseup = trobjMouseup;
				}else{
					trobj.datatable.timers[trobj.datatable.timers.length]= setTimeout(arguments.callee, 1);
					settr = true;
				}
			})();
			var j=0;
			(function () {
				do{
					var column = trobj.datatable.columnConfig[j];
					var value = row[column.name];
					//lp �̶���ʱ��
					var fixStyle = ths[j].className;
					var tdclass = "";
					if(fixStyle=="FixedTitleColumn"){
						tdclass = 'class="FixedDataColumn"';
					}
					//var tdwidth = trobj.datatable.getTdWidth(ths,j);
					//if(column.style != null && column.style.indexOf("width")!=-1){
					//	tdwidth = "";
					//}
					var tdobj = document.createElement('<td '+tdclass+' onmouseout="return nd();" style="'+column.style+'" nowrap></td>');
					// ������׷�ӵ�Ԫ��
					trobj.appendChild(tdobj);
					tdobj.id= trobj.datatable.id+'-'+column.name+'-'+row.rownum;

					column.show(row.rownum,value,row,tdobj,trobj.datatable);
					//if(tdobj.innerHTML == ""){
					//	tdobj.innerHTML = "<div>&nbsp;</div>";
					//}
					JQ(tdobj).data("colconfig",column);
					j++;
				}while((j<= curdrawtdIndex ||isFirst) && j < cols)
				if (j < cols) {
					//curdrawtdIndex += 2;
					trobj.datatable.timers[trobj.datatable.timers.length]= setTimeout(arguments.callee, 80);
				}
			})();
			return trobj;
	}
	this.refreshTable = function(){
		// ��ȡ������
		var isupdate = false;
		var rows = this.getSelectedRow();
		if(this.data!=null&&this.data.length>0&&this.waitrefreshdata!=null&&this.waitrefreshdata.length>0){
			rows = this.waitrefreshdata;
		}
		if(rows.length>0&&!this.isredraw){
			//����ɾ���в���ʱ����ѡ�����ѱ�ɾ����û��ѡ��������ֱ�ӷ���
			if(!rows.bounds) return;
			var bounds = rows.bounds.split(',');
			for(var i=0;i<bounds.length;i++){
				var rownum = bounds[i];
				var row = this.data[rownum];
				var trobj = this.getMainTable().getElementsByTagName("TBODY").item(1).childNodes[rownum-this.startRowNum];
				this.drawTrObj(row,trobj);
				isupdate = true;
			}
		}else{
			//�����ʾ���������ݲ����ã����ػ������У����ܴ��ڼӼ��д���
			var showrow = this.maxline;
			if(this.startRowNum+this.maxline>this.data.length) showrow = this.data.length-this.startRowNum;
			if(showrow!=this.getMainTable().getElementsByTagName("TBODY").item(1).childNodes.length){
				return false;
			}
			for (var i = this.startRowNum; i < this.data.length && i < this.startRowNum+this.maxline; i++) {
				var row = this.data[i];
				if(row.rownum == undefined||row.rownum==null||row.rownum!=i){
					row.rownum = i;
					var trobj = this.getMainTable().getElementsByTagName("TBODY").item(1).childNodes[i-this.startRowNum];
					if(trobj==null){
						return false;
					}
					this.drawTrObj(row,trobj);
					isupdate = true;
				}
			}
		}
		return isupdate;
	}
	this.reDrawTrObj = function(rownum){
		var trobj = this.getMainTable().getElementsByTagName("TBODY").item(1).childNodes[rownum];
		this.drawTrObj(trobj.data,trobj);
	}
	this.getTableThs = function(){
		var ths = this.parent.getElementsByTagName("TH");
		if(this.useThisHead)(new MutilTableHeads(ths)).setCellIndex();
		var nths = new Array();
		for(var i=0;i<ths.length;i++){
			var oth = ths[i];
			var cellindex = oth.cellIndex;
			if(oth.mycellindex!=null) cellindex= parseInt(oth.mycellindex);
			if(cellindex<this.lockcolcount){
				oth.className="FixedTitleColumn";
			}
			if(oth.colSpan==1){
				nths[cellindex]=oth;
			}
		}
		ths = nths;
		return ths;

	}
	this.drawrow = function(startnum,tbodyobj,ths){
		// ����ʱ��ͳ��
		var start = (new Date()).getTime();
		var trobjs = new Array();
		var drawtrtime = "";
		var index = 0;
		//�ж��������Ҽ��˵�
		var isrightmenu = false;
		if(document.getElementById("tabrightmenu")){
			var _inHTML = document.getElementById("tabrightmenu").innerHTML;
			//ֻ�����б�����ʾ�Ҽ��˵�
			if(_inHTML != "" && this.tabletype=="MainList")isrightmenu = true;
		}
		for (var i = startnum; i < this.data.length && i < startnum+this.maxline; i++) {
    		var row = this.data[i];
    		row.rownum = i;
			var start1 = (new Date()).getTime();
			if(tbodyobj.childNodes.length>index){
				this.drawTrObj(row,tbodyobj.childNodes[index],ths,index);
			}else{
				var trobj = this.drawTrObj(row,null,ths,index);
				if(index == 0){
					// ������׷����
					tbodyobj.appendChild(trobj);
					//ֻ�����б�����ʾ�Ҽ��˵�
					if(isrightmenu){
						trobj.oncontextmenu = function(){
							var _trRightMenu = document.getElementById("ie5menu");
							if(_trRightMenu)document.body.removeChild(_trRightMenu);
							var _rightMenu = document.createElement('<div id="ie5menu"></div>');
							_rightMenu.innerHTML = _inHTML;
							document.body.appendChild(_rightMenu);
							//����ʾ�Ҽ��˵�ʱΪbody��click�¼�
							JQ('body').bind("click",function(){
								JQ('body').unbind("click");
								return hidemenuie5("ie5menu");
							});
							return showmenuie5("ie5menu");
						};
					}
					this.setFixedLayout();
				}else{
					trobjs[trobjs.length] = trobj;
				}
			}
			drawtrtime+="|"+((new Date()).getTime()-start1);
			index++;
    	}
		for(var j=0;j<trobjs.length;j++){
			// ������׷����
			tbodyobj.appendChild(trobjs[j]);
			//ֻ�����б�����ʾ�Ҽ��˵�
			if(isrightmenu){
				trobjs[j].oncontextmenu = function(){
					var _trRightMenu = document.getElementById("ie5menu");
					if(_trRightMenu)document.body.removeChild(_trRightMenu);
					var _rightMenu = document.createElement('<div id="ie5menu"></div>');
					_rightMenu.innerHTML = _inHTML;
					document.body.appendChild(_rightMenu);
					//����ʾ�Ҽ��˵�ʱΪbody��click�¼�
					JQ('body').bind("click",function(){
						JQ('body').unbind("click");
						return hidemenuie5("ie5menu");
					});
					return showmenuie5("ie5menu");
				};
			}
		}
		for(var j=tbodyobj.childNodes.length-1;j>=index;j--){
			tbodyobj.childNodes[j].removeNode(true);
		}
		//JQ(".bottomdiv").html(((new Date()).getTime()-start)+"(ms)"+drawtrtime);
		//window.status = ((new Date()).getTime()-start)+"(ms)"+drawtrtime;
	}
	this.drawToRow = function(startnum){
		if(this.rightscrollbar.offsetHeight>this.contentdiv.offsetHeight){
			this.draw(startnum);
			var bakscroll = this.rightscroll.onscroll;
			this.rightscroll.onscroll = null;
			this.rightscroll.scrollTop = parseInt(((startnum)/ this.data.length) * this.rightscrollbar.offsetHeight);
			var datatable = this;
			setTimeout(function(){
				datatable.rightscroll.onscroll = bakscroll;
			},0);
		}else{
			//this.drawing = true;
			this.draw(0);
		}
		
	}
	this.draw = function(startnum){
		// ����ʱ��ͳ��
	    var odate = new Date();
		var start = odate.getTime();
		if(typeof(this.beforeDraw)=="function"){
			this.beforeDraw();
		}
		if(this.data!=null&&(this.datalen==0||this.datalen!=this.data.length)){
			this.datalen = this.data.length;
			this.isredraw = true;
		}
		if(this.activetd){
			JQ(this.activetd).find("input").trigger("blur");
			this.activetd=null;
		}
		//��ȡ���ͷ��ȫѡ��״̬
		var isselectall = false;
		if(this.useThisHead&&$("tmain_checkbox")){
			var inputs = $("tmain_checkbox").getElementsByTagName("INPUT");
			 if(inputs!=null&&inputs.length>0){
				isselectall = inputs[0].checked;
			 }
		}
		if($(this.id+"_table")&& this.getMainTable() != null){
			this.setTableHead(this.getTableHead,true);
			if(!this.drawing&&(this.startRowNum == startnum||typeof(startnum)=="undefined")&&this.refreshTable()){
				if(this.id!=undefined)setTimeout("if("+this.id+".isCreateAmtColumn) "+this.id+".sumMainAmtToColumn("+this.id+".totalColumn)", 1);
				return;
			}else{
				this.isredraw = false;
			}
		}
		// ���浱ǰ�����������λ��
		var scroll_left = this.contentdiv.scrollLeft;
		// wy ���浱ǰ�����������λ��
		var scroll_right = this.rightscroll.scrollTop;
		var tbodyobj = null;
		if(this.isredraw&&this.getMainTable()!=null){
			//this.setTableHead(this.getTableHead,true);
			tbodyobj = this.getMainTable().getElementsByTagName("TBODY").item(1);
		}else{
			var tablehtml = '<table id="'+this.id+'_table" class="main_table_98" onclick="rowcheck();" cellspacing="0" align="center">';
				tablehtml += this.headHTML;
				tablehtml += '</table>';
			this.contentdiv.innerHTML = tablehtml;
			// ��ȡ������
			var tableobj = this.getMainTable();
			// ��table���������� datatable ������
			tableobj.datatable = this;
			
			tableobj.style.tableLayout= "auto";
			// ׷��Tbody����
			tbodyobj = document.createElement("TBODY");
			tableobj.appendChild(tbodyobj);		
		}
		// ������ʼ��ʾ�����ݼ�¼
		if (startnum == null) {
        	startnum = Math.floor(this.rightscroll.scrollTop/ this.TABLE_TR_H);
        	
       	} else {
			/*
			var headbody = this.contentdiv.getElementsByTagName("TABLE").item(0).getElementsByTagName("TBODY").item(0);
			var headbodyoffsetheight = headbody.offsetHeight;
			//��º��޸�20100712 �Զ����ͷ�Ĵ���. 
			if(this.useThisHead){
				for(var i=1;i<this.contentdiv.getElementsByTagName("TABLE").item(0).rows.length;i++){
					headbodyoffsetheight += this.contentdiv.getElementsByTagName("TABLE").item(0).rows.item(i).offsetHeight;
					var rowhtml = this.contentdiv.getElementsByTagName("TABLE").item(0).rows.item(i).outerHTML;
					if(rowhtml.indexOf("total_text")!=-1){//���ϼƺ��Ǳ�ͷ
						break; 
					}
				}
			}
       	    scroll_right = parseInt(startnum,10)*this.TABLE_TR_H + headbodyoffsetheight;
       		this.rightscroll.scrollTop = parseInt(startnum,10)*this.TABLE_TR_H + headbodyoffsetheight;
			*/
       	}
       	
    	if(this.data == null){
	    	// ���û�������򷵻�
    		return null
    	}
    	
    	// ��������һ���Ƿ��Ƿֲ����ؽڵ�
    	if(this.data.length > 0){
    		if("cachenode" == this.data[0].nodetype){
    			var cachenode = this.data[0];
    			this.getnextdata(cachenode);
    			// �Ƴ��ýڵ�
    			this.data.shift();
    		}
    	}
    	this.startRowNum = startnum;
		for(var i=0;i<this.timers.length;i++){
			if(this.timers[i]!=null)clearTimeout(this.timers[i]);
		}
		var rehead = this.getTableThs();
		if(rehead!=null&&rehead.length>0){
			var tablewidth = this.contentdiv.offsetWidth;
			for(var i=0;i<rehead.length;i++){
				var oth = rehead[i];
				this.drawtdIndex = i+1;
				if((oth.offsetLeft-this.contentdiv.scrollLeft)>tablewidth){
					break;
				}
			}
		}
    	this.drawrow(startnum,tbodyobj,rehead);
		//���ö��ͷ��ȫѡ��״̬
		if(this.useThisHead&&$("tmain_checkbox")){
			 var inputs = $("tmain_checkbox").getElementsByTagName("INPUT");
			 if(inputs!=null&&inputs.length>0){
				inputs[0].checked = isselectall;
			 }
		}
		/*---todotest--
    	if(tbodyobj.childNodes.length>0){
    	    var trobj = tbodyobj.childNodes[0];
    	    var cols = trobj.childNodes.length;
	    	for(j = 0; j < cols; j++){
	    	    if(trobj.cells[j].offsetWidth>500){
	    	         for(i=0;i<tbodyobj.childNodes.length;i++){
	    	            trobj = tbodyobj.childNodes[i];
	   	                tdobj =  trobj.cells[j]; 
	   	                try{
		   	                var node = tdobj.childNodes[0]; 
		   	                //if(!cnodes) continue;
		   	                //var node = cnodes[0];
		   	                //if(!node) continue;
		   	                //if(!node.tagName)continue;
		   	                //if(tdobj.offsetWidth>500){
							       tdobj.style.width="500px";
								   node.style.width="500px";
							//}	
						}catch(err){}
					}	
				}		
			}
    	}
    	
    	*/
		this.contentdiv.scrollLeft = scroll_left;
		this.rightscroll.scrollTop = scroll_right;
        this.rightscrollotop = this.rightscroll.scrollTop;
		//*/
		this.drawing = false;
		this.isredraw = false;
		

		//window.status = (end-start)+"(ms)";
		//�ϼƽ��
		//---todotest--if(this.isCreateAmtColumn)this.sumMainAmtToColumn(this.totalColumn);		
		if(this.id!=undefined)setTimeout("if("+this.id+".isCreateAmtColumn) "+this.id+".sumMainAmtToColumn("+this.id+".totalColumn)", 1);
	   //wy20100119 �����������,�Ҳ�����������ݵĹ�������λ
	   	var contentdivObj = this.contentdiv;
	   	var tableObj = this;
	   	var rightscrollObj = this.rightscroll;
		/*
	    contentdivObj.onscroll = function(){
	    	var table = contentdivObj.getElementsByTagName("TABLE").item(0);
			var tr_h = table.childNodes[0].offsetHeight;			
	    	var move = contentdivObj.scrollTop;	
	    	if(move>0){
	    		rightscrollObj.scrollTop = move*tableObj.TABLE_TR_H;	
	    	}	
   	    }  	
		*/
   	    if(!this.isredraw){
			if($(this.id+"_allbox")!=null){
				 if(this.selectedall) $(this.id+"_allbox").checked = true;
				 else $(this.id+"_allbox").checked = false;
			}
			this.headeventhandler();
		}
		if(typeof(this.afterDraw)=="function"){
			this.afterDraw();
		}
		//window.status = "draw:"+ ((new Date()).getTime()-start)+"(ms)"+window.status;
		//window.status =  "draw:"+ ((new Date()).getTime()-start)+"(ms)"+window.status;
	}

	//���ϼ���
	this.appendAmtColumn = function(heads){	
	 	this.totalColumn = new Array();
	 	for(var prp in this.allpage_totaljson ){
			if("load_total" != prp && "row_num" != prp){
				this.totalColumn[this.totalColumn.length] = prp;
			}
		} 	
		var useTotalSet =false
		if(this.contentdiv != null ){
			var ths = this.parent.getElementsByTagName("TH");

			var nths = new Array();
			for(var i=0;i<ths.length;i++){
				var oth = ths[i];
				var cellindex = oth.cellIndex;
				if(oth.mycellindex!=null) cellindex= parseInt(oth.mycellindex);
				if(cellindex<this.lockcolcount){
					oth.className="FixedTitleColumn";
				}
				if(oth.colSpan==1){
					nths[cellindex]=oth;
				}
			}
			var rehead = nths;
		}else{
			var divObj = document.createElement("DIV"); 
			divObj.innerHTML ="<table>"+this.headHTML+"</table>"
			var rehead = divObj.getElementsByTagName("TH");
		}
		 //������ͷ����		
		var style = 'style="display:none "'; 
		if(this.isCreateAmtColumn&&this.isContainsAmtColumn(heads)){
	 		//��ʾ
			style = ''; 
	 	}
	 	this.headHTML += '<tr id="'+this.id+'_tot" class="main_table_title_letter" TotalRow="true" '+style+'>';
		var cols = this.columnConfig.length;
		var showSelectCount = false;
 		for(var j = 0; j < cols; j++){
				var column = this.columnConfig[j];
				if(column.id=="checkbox" || column.id=="radio"){
				    showSelectCount = true;
					break;
				}	
		}
		for(var i=0;i<heads.length;i++){
			var head = heads[i];
			var config = ColumnConfig[head.toLowerCase()];
			var zero = config && config.type=="M"?"0.00":"0";
			var tdclass = '';
			//�̶��й������϶� 100612
			if(rehead.length>0){
				var headStyle = rehead[i]?rehead[i].className:"";
				if(headStyle=="FixedTitleColumn"){
					tdclass = 'class="FixedDataColumn"';
				}
			}
			useTotalSet =false
			if(i==0){
			    this.headHTML += '<td nowrap="nowrap" '+tdclass+'><a id="'+this.id+'total_text" >�ϼ�</a>';
				if(this.totalColumn.length>0){
					this.headHTML +='<img src="'+ ROOT_PATH+'/images/actions/btn-arrow.gif" id="img_arrow" align="absmiddle" style="cursor:pointer;" onclick="'+this.id+'.showtotalmenu()" />'
						+'<div id ="total_menu" style="z-index:9">';
						if(showSelectCount)
						   this.headHTML +='<a id="total_selected" onclick="'+this.id+'.closetotalmenu(this)">ѡ��ϼ�</a>'
	    				this.headHTML +='<a id="total_curpage" onclick="'+this.id+'.closetotalmenu(this)">��ǰ�ϼ�</a><a id="total_allpage" onclick="'+this.id+'.closetotalmenu(this)">���кϼ�</a>'
						+'</div>';
				}
				this.headHTML +='</td>';
			}else{
				//��У������
				for(var a =0;a<this.totalColumn.length;a++){
					if(head.toLowerCase()==this.totalColumn[a]){
						useTotalSet=true;
						break;
					}
				}
				if(useTotalSet){
					if(config.type!="M"&&config.type!="I"){
					   //�̶��й������϶� 100612
						this.headHTML += '<td nowrap="nowrap" '+tdclass+'>&nbsp;</td>';
					}else{
						if(head.indexOf(".")!=-1)head=head.substring(0, head.indexOf("."))	;//֧��*.input	
						var g = this.id+"sumAmtColumnid"+head;
						this.headHTML += '<td nowrap="nowrap" id="'+g+'" align="right" '+tdclass+'>'+zero+'</td>';
					}
				} else if(this.containsListElement(head)){
						if(head.indexOf(".")!=-1)head=head.substring(0, head.indexOf("."))	;//֧��*.input	
						var g = this.id+"sumAmtColumnid"+head;	
						this.headHTML += '<td nowrap="nowrap" id="'+g+'" align="right" '+tdclass+'>'+zero+'</td>';
				}else{	
					this.headHTML += '<td nowrap="nowrap" '+tdclass+'>&nbsp;</td>';
				}
			}			
		}
		this.headHTML += '</tr>';	
				
	}
	
	/*
		��ʾ�ϼƷ�ʽ��
	*/
 this.showtotalmenu =function(){
		var total_menu_div =document.getElementById("total_menu");
		//Ϊ����̶���ʱ������ʾ���ϼƲ�ӷŵ�body��
		document.body.appendChild(total_menu_div);
		//�õ����λ�����ø�����λ��
		var e = window.event;
 		var obj = mousePosition(e);
 		total_menu_div.style.left = obj.x;
 		total_menu_div.style.top = obj.y;
	    total_menu_div.style.visibility='visible';
   	    total_menu_div.style.display='block';
	    window.document.body.onclick = function(){
			if(event.srcElement.id!="img_arrow"&&!total_menu_div.contains(event.srcElement)){
				total_menu_div.style.display='none';
				window.document.body.onclick = null;
			}
		}
	}
	
	/*
		�رպϼƷ�ʽ��
	*/
	this.closetotalmenu = function(obj){
		var total_menu_div=document.getElementById("total_menu");
		document.getElementById(this.id+"total_text").innerHTML=obj.innerHTML;
		if(document.getElementById(this.id+"total_text").innerHTML.length>2){
		   var serialobj = this.contentdiv.getElementsByTagName("TABLE").item(0).getElementsByTagName("TBODY").item(0).childNodes[0].childNodes[0];
		   if(serialobj.offsetWidth<80){
		   	  serialobj.style.width="78px";
		   	  this.columnWidth[0]=78;
		   }
		}
		total_menu_div.style.display="none";
		this.changetotalresult(obj);
	}
	/*
		�ı�ϼ�ֵ
	*/	
	this.changetotalresult = function(obj){
		if(obj.id=="total_curpage"){//��ǰҳ�ϼ�
			this.totalColumn.curtag="curpage";
			
			this.sumMainAmtToColumn(this.totalColumn);
		} else if(obj.id=="total_allpage"){//����ҳ�ϼ�
			this.totalColumn.curtag="allpage";
			for(var prp in this.allpage_totaljson ){
				if("load_total" == prp || "row_num" == prp){
					continue;
				}
				var total_name = this.id+"sumAmtColumnid"+prp;
				var total_value=eval("this.allpage_totaljson."+prp)
				var nlen =2;
				if(this.amtflag=="10000"){
					//nlen =6;
				}
				//����������
				var columnType;
				//�����ж�,���Ϊ����,��ϼ���С��λ,�˴���ȡ����������
				for(var m=0;m<this.columnConfig.length;m++){
					var tempa = this.columnConfig[m].id;
					if(tempa.indexOf(".")!=-1)tempa=tempa.substring(0, tempa.indexOf("."));
					if(tempa==prp){
						columnType = this.columnConfig[m].type;
						break;
					}	
				}
				total_value = Math.round((total_value/this.amtflag)*Math.pow(10,nlen))/Math.pow(10,nlen);
				//��Ϊ����,�򲻽���С��λת��
				if(columnType == "I"){					
					document.getElementById(total_name).innerHTML=(total_value+"");
				} else {
					document.getElementById(total_name).innerHTML=(total_value+"").toMoneyFormat();
				}
			}
		} else {//ѡ���кϼ�
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
	//�ж��Ƿ��н����
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
	//��������
	this.sumMainAmtToColumn = function(totaldbList){
	   var totalList = new Array();
	   var rehead = this.getTableThs();
	   var headStyle = rehead[0]?rehead[0].className:"";
	   if(totaldbList==null||totaldbList.length==0) {
	   		totalList = this.columnList;
	   		totalList.curtag="curpage";
	   } else {
	   		totalList = totaldbList;
	   }
	   if(totaldbList!=null&&this.totalColumn.curtag=="curpage")
			document.getElementById(this.id+"total_text").innerHTML="��ǰ�ϼ�";
	   else if(totaldbList!=null&&this.totalColumn.curtag=="selectpage")
			document.getElementById(this.id+"total_text").innerHTML="ѡ��ϼ�";
	   else if(totaldbList!=null&&this.totalColumn.curtag=="allpage"){
	   		document.getElementById(this.id+"total_text").innerHTML="���кϼ�";
	   		for(var prp in this.allpage_totaljson ){
				if("load_total" == prp || "row_num" == prp){
					continue;
				}
				var total_name = this.id+"sumAmtColumnid"+prp;
				var total_value=eval("this.allpage_totaljson."+prp)
				var nlen =2;
				if(this.amtflag=="10000"){
					//nlen =6;
				}
				total_value = Math.round((total_value/this.amtflag)*Math.pow(10,nlen))/Math.pow(10,nlen);				
				document.getElementById(total_name).innerHTML=(total_value+"").toMoneyFormat();
			}
			return;
	   }else{
	   		if(headStyle == "FixedTitleColumn"){
	   			document.getElementById(this.id+"total_text").parentNode.className="FixedDataColumn";
	   		}
			document.getElementById(this.id+"total_text").innerHTML="�ϼ�";
			for(var b=0;b<this.totalColumn.length;b++){
				q = eval(this.id+"sumAmtColumnid"+this.totalColumn[b]);
				q.innerHTML="0.00";
			}
	   }	
			var selectrows = this.data;
			var isSelect = false;
			//hwy20091230�ϼ������н��
			if(this.sumamtrow=="all"){
				isSelect = false;
			}else if(this.tabletype=="DetailList"){
				selectrows = this.getSelectedRow();
				if(selectrows.length==0)selectrows = this.data;
			} else if(totaldbList!=null&&totaldbList.curtag=="curpage"){
				isSelect = false;
			} else if(totaldbList!=null&&totaldbList.curtag=="selectpage"){
				isSelect = true;
			} else {
				isSelect = true;
			}	
			var sumAmtColumns = new Array();
			for(var i=0;i<selectrows.length;i++){
				if(isSelect){
					if(!selectrows[i].checked)continue;
				}
				for(var a=0;a<totalList.length;a++){
					var totalStr = totalList[a];
					var columnid = totalStr;
					if(typeof(ColumnConfig[columnid])=='undefined')continue;
					if(totalStr.indexOf(".")!=-1)totalStr=totalStr.substring(0, totalStr.indexOf("."));		
					if(typeof sumAmtColumns[totalStr] == 'undefined')sumAmtColumns[totalStr] = '0.00';		
					var m = '0.00';		
					if(typeof(eval('selectrows['+i+'].'+totalStr))!='undefined'){
							m = String(eval('selectrows['+i+'].'+totalStr));
					}
					if(m!=null) m = m.replace(/,/g,"");	
					if(!isNaN(parseFloat(m)))			
						sumAmtColumns[totalStr] = accAdd(parseFloat(sumAmtColumns[totalStr]), parseFloat(m));
				}

			}

			for(var a=0;a<totalList.length;a++){
				var totalStr = totalList[a];
				var columnid = totalStr;
				if(typeof(ColumnConfig[columnid])=='undefined')continue;
				var amtflag = ColumnConfig[columnid].amtflag;
				var columnType = ColumnConfig[columnid].type;
				if(null==amtflag||""==amtflag||"2" == amtflag){
					amtflag=1;
				}
				var nlen =2;
				if(amtflag=="10000"){
					//nlen =6;
				}
				//�����Ϊ�ɱ༭״̬ʱ��.input��Ҫ��ȡ
				if(totalStr.indexOf(".")!=-1)totalStr=totalStr.substring(0, totalStr.indexOf("."));
				sumAmtColumns[totalStr] = Math.round((sumAmtColumns[totalStr]/amtflag)*Math.pow(10,nlen))/Math.pow(10,nlen);
				try{
					var q = eval(this.id+"sumAmtColumnid"+totalStr);		
					if(q[0]!=null){
						q = q[0];
					}
					if(columnType == "I"){
						/**
						 * ����ʼʱsumAmtColumns������ֵ������ΪNaN,�Ӵ��ж� lp 20111209
						 */
						q.innerHTML = isNaN(String(sumAmtColumns[totalStr]))?"0":String(sumAmtColumns[totalStr]);
					} else {
						q.innerHTML = String(sumAmtColumns[totalStr]).toMoneyFormat();	
					}
				}catch(exception){}

			}
	}
		//��������
	
	// 
	this.drawall = function(){	
		// ����ʱ��ͳ��
	    var odate = new Date();
		var start = odate.getMilliseconds() + odate.getSeconds() * 1000;
		// ����Ƿ񴴽������
		var createdtable = this.contentdiv.getElementsByTagName("TABLE");
		
		var tablehtml = '<table class="main_table_98" border="0" id="tbl" cellspacing="1"  align="center" >';
		
		if(createdtable.length>0){
			// ��ȡ��ǰ���ı�ͷHTML����
			tablehtml += this.getMainTable().rows.item(0).outerHTML;			
		}
		else{
			tablehtml += this.headHTML;
		}
		tablehtml += '</table>';
		this.contentdiv.innerHTML = tablehtml;
		// ��table���������� datatable ������
		this.getMainTable().datatable = this;
		// ��ȡ������
		var tableobj = this.getMainTable();
		// ׷��Tbody����
		var tbodyobj = document.createElement("TBODY");
		tableobj.appendChild(tbodyobj);
		
    	if(this.data == null){
	    	// ���û�������򷵻�
    		return null
    	}
    	
    	for (var i = 0; i < this.data.length; i++) {
    		var row = this.data[i];
    		// ����ÿ�е�TR����
    		var trobj = document.createElement("TR");
    		if(row.checked == true){
    		   trobj.className="main_table_title_letter_selected";
    		} 
    		else {
    		  trobj.className="main_table_title_letter";
    		  trobj.onmouseover = function(){this.runtimeStyle .backgroundColor='#e8f4ff';};
    		  trobj.onmouseout = function(){this.runtimeStyle .backgroundColor='';};
    		}
    		trobj.data = row;
    		if(this.onrowclick){
    			var func = this.onrowclick;
    			trobj.onclick = function(){func(this.data);};
    		}
    		//wy ��˫���¼�
    		if(this.onrowdblclick){
    			var func = this.onrowdblclick;
    			trobj.ondblclick = function(){func(this.data);};
    		}
	
			for(var j = 0; j < this.columnConfig.length; j++){
				var column = this.columnConfig[j];
				var tdobj = document.createElement('<td style="'+column.style+'" nowrap="nowrap"></td>');
				eval("var value = row."+column.name);
				
				// ������׷�ӵ�Ԫ��
				trobj.appendChild(tdobj);				
				column.show(i,value,row,tdobj,this);
			}
			// ������׷����
			tbodyobj.appendChild(trobj);
    	}

		this.drawing = false;
		
		// ����ҳ��������ĸ߶�
		if(this.display == "line"){
			//this.parent.style.height = ($(this.parent.id+"_contentdiv").scrollWidth>$(this.parent.id+"_contentdiv").offsetWidth)?$(this.parent.id+"_contentdiv").getElementsByTagName("TABLE").item(0).offsetHeight+15:$(this.parent.id+"_contentdiv").getElementsByTagName("TABLE").item(0).offsetHeight;
		}
		
		var odate = new Date();
		var end = odate.getMilliseconds() + odate.getSeconds() * 1000;
		//window.status = (end-start)+"(ms)";
	}	
	
	// ����ѡ���е�����
	this.getSelectedRow = function(){
		//debugger;
		var l = new Array();
		var billids = "";
		var billidcodes = "";
		var bounds = "";
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
			eval("var val =row."+colName);
			if(val != undefined){
				var nval = new Number(val);
				//totalVal=totalVal+nval;
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
		if(datatable.columnList.length>1){
			var tdobj = $(this.id+"sumAmtColumnid"+colName)
			if(tdobj  != null){
				var total = this.getTotalVal(colName);
				tdobj.innerHTML=total.toMoneyFormat();

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
			this.parent.parentElement.style.height = zoomoutheight+"px";;
			this.parent.style.height = (zoomoutheight-23)+"px";
			$(this.id+"zoomicon").src = ROOT_PATH+"/ifmis_images/done_btn/zoomout.gif";
			$(this.id+"zoomicon").alt = "��ԭ";
		}else{
			this.parent.parentElement.style.height = this.height+"px";
			this.parent.style.height = ( this.height-23)+"px";;
			this.height = 0;
			this.setMaxLine();
			$(this.id+"zoomicon").src = ROOT_PATH+"/ifmis_images/done_btn/zoomin.gif";
			$(this.id+"zoomicon").alt = "�Ŵ�";
		}
		this.show();
	}
	this.createPagination = function(){
    	var tbodyHTML="<TABLE id=\"paginationtbl\" borderColor=#8596ca cellSpacing=0 cellPadding=0 align=center" 
		+"border=0 style=\"float:right;font-size:12px; color:#000000;\">"
		+"<TBODY>"
		+"<TR>"
		+"<TD align=\"center\" width=\"50\" nowrap=\"nowrap\">"
		+" <a href=\"javascript:"+this.id+".zoom()\">"
		+" <img id=\""+this.id+"zoomicon\" src=\""+ ROOT_PATH+"/ifmis_images/done_btn/zoomin.gif\" alt=\"�Ŵ�\" border=\"0\" height=\"20\" width=\"20\" align=\"absmiddle\" />"
		+"</a>"
		+"</TD>"
		+"<TD align=\"center\"  nowrap=\"nowrap\">";
		if(this.page_hasPreviousPage){
            tbodyHTML +=" <a href=\"javascript:"+this.id+".gotoPage(1)\"><img src=\""+ROOT_PATH+"/images/actions/first.gif\" alt=\"��һҳ\" border=\"0\" height=\"16\" width=\"16\" align=\"absmiddle\" /></a>"
             +" <a href=\"javascript:"+this.id+".gotoPage("+ this.page_previousPage + ")\"><img src=\""+ROOT_PATH+"/images/actions/pre.gif\" alt=\"��һҳ\" border=\"0\" height=\"16\" width=\"16\" align=\"absmiddle\" /></a>";
        } else {
            tbodyHTML += " <img src=\""+ ROOT_PATH+"/images/actions/first_un.gif\" alt=\"��һҳ\" border=\"0\" height=\"16\" width=\"16\" align=\"absmiddle\" />"
            	+" <img src=\""+ ROOT_PATH +"/images/actions/pre_un.gif\" alt=\"��һҳ\" border=\"0\" height=\"16\" width=\"16\" align=\"absmiddle\" />";
        }
        if (this.page_hasNextPage) { 
            tbodyHTML += " <a href=\"javascript:"+this.id+".gotoPage("+this.page_nextPage+")\"><img src=\""+ROOT_PATH+"/images/actions/next.gif\" alt=\"��һҳ\" border=\"0\" height=\"16\" width=\"16\" align=\"absmiddle\" /></a>"
            	+" <a href=\"javascript:"+this.id+".gotoPage("+this.page_pageCount+")\"><img src=\""+ROOT_PATH+"/images/actions/end.gif\" alt=\"���ҳ\" border=\"0\" height=\"16\" width=\"16\" align=\"absmiddle\" /></a>";
        } else {
            tbodyHTML += " <img src=\""+ ROOT_PATH+"/images/actions/next_un.gif\" alt=\"��һҳ\" border=\"0\" height=\"16\" width=\"16\" align=\"absmiddle\" />"
            	+" <img src=\""+ ROOT_PATH+"/images/actions/end_un.gif\" alt=\"���ҳ\" border=\"0\" height=\"16\" width=\"16\" align=\"absmiddle\" />";
        }
        tbodyHTML += "</td>";
        tbodyHTML += "<td align=\"left\">\n"
        +"&nbsp;&nbsp;&nbsp;&nbsp;<img src=\""+ ROOT_PATH + "/images/actions/share_icon.gif\" alt=\"\" border=\"0\" height=\"12\" width=\"15\" align=\"absmiddle\" hspace=\"3\" vspace=\"3\" />"
        +"    �� "+ this.page_totalRecord + " ��,<a style=\"font:black\">ÿҳ</a><input id='"+this.id+"setpage_size' name='setpage_size' title='����ÿҳ������'  value=\""+ this.page_pageSize +"\" size=\"4\" onkeyup=\""+this.id+".checkenter("+ this.page_pageSize +");\" onblur=\""+this.id+".pagesizeblur("+ this.page_pageSize +");\"/><a style=\"font:black\">��</a>"
        +",�� "+this.page_page+ " / " + this.page_pageCount +" ҳ"
        +"</td>";
        tbodyHTML += "<td align=\"right\">";
        tbodyHTML += "<input type=\"hidden\" name=\"pageSize\" value=\""+ this.page_pageSize +"\"/><input type=\"hidden\" name=\"pageCount\" value=\""+ this.page_pageCount +"\"/><input type=\"hidden\" name=\"totalRecord\" value=\""+ this.page_totalRecord +"\"/>"
            +"<input type=\"text\" id=\""+this.id+"_page\" name=\"page\" value=\""+this.page_page+"\" size=\"3\" onkeyup=\""+this.id+".checkenter(this.value);\" onblur=\""+this.id+".pageblur("+ this.page_page +");\"/><a href=\"javascript:"+this.id+".submitGotoPage()\"><img src=\""+ROOT_PATH+"/images/actions/tz.gif\" alt=\"��ת\" height=\"21\" width=\"45\" align=\"absmiddle\" border=\"0\" /></a>";
		//if(document.getElementById("page")!=null){
		//	tbodyHTML +="<input type=\"hidden\" id=\"page\" value=\""+this.page_page+"\"><input type=\"hidden\" id=\"setpage_size\" value=\""+ this.page_pageSize +"\">";
		//}
    	tbodyHTML +="</td></tr></table>";
  
    	if(document.getElementById("pageTagDiv")!=null){
    		document.getElementById("pageTagDiv").innerHTML =tbodyHTML;
    	} else {
			if(this.paginationdiv){
				this.paginationdiv.innerHTML = tbodyHTML;
			}else{
				document.getElementById(this.tabletype+"_paginationdiv").innerHTML =tbodyHTML;
			}
    	}		

    	
	}
	
	// ����û������ҳ���Ƿ�Ϸ�
	// ����ֵ��true-�Ϸ� false-�Ƿ�
	this.checkPage = function (thePage) {
		var pEl = $(this.id+"setpage_size");
	   	var oPagesize = pEl.value;
		if (oPagesize == "" || oPagesize=="0") {
	        alert("������һ����Ч������Ϊÿҳ������");
	        return false;
	    }
	    if (thePage == "" || thePage=="0") {
	        alert("������һ����Ч������ΪҪ��ת��ҳ����");
	        $(this.id+"_page").value = this.page_page;
	        return false;
	    }
	    var array_toPage = thePage.split("");
	    var digitalStr = "0123456789";
	    for (var i = 0; i < array_toPage.length; i++) {
	        if (digitalStr.indexOf(array_toPage[i]) == -1) {
	            alert("������һ����Ч������ΪҪ��ת��ҳ����");
	            $(this.id+"_page").value = this.page_page;
	            return false;
	        }
	    }
	    if (thePage > this.page_pageCount) {
	        alert("�����ҳ����Ӧ������ҳ����" + this.page_pageCount + "����");
	        $(this.id+"_page").value = this.page_page;
	        return false;
	    }
	    return true;
	}

  	// ֧�ֻس���ת
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
		if (oPagesize == "" || oPagesize=="0") {
	        alert("������һ����Ч������Ϊÿҳ������");
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
	        alert("������һ����Ч������ΪҪ��ת��ҳ����");
			pEl.value = vpage;
	        return false;
	    }
		if(document.getElementById("page")!=null){
			document.getElementById("page").value = oPage;
		}
	}
	// ��ת��ָ���ķ�ҳ
	this.gotoPage = function(thePage) {

	    var page = document.getElementById(this.id+"_page");
	    page.value = thePage;	
	    this.submitGotoPage();
	}
	//���õ�1ҳ
	this.resetPage = function(thePage) {
	    var page = document.getElementById(this.id+"_page");
	    if(page!=null)page.value = thePage;	
	}
	// �ύ��ҳ��ת��
	this.submitGotoPage = function() {
	    //var theForm = eval("document."+this.page_formName);
	    // ���ԭʼ����ֵ
	    var thePage = document.getElementById(this.id+"_page").value;
	  
	    if(this.checkPage(thePage)){
	    	if (this.page_postUrl) {
		        //var func = this.page_postUrl
	   			this.page_postUrl(this.getPageParam());
	   			return;
		    }
	        if(document.getElementById("advancedQueryForm")!=null&&document.getElementById("advancedQueryForm").advancedQuery!=null
	        	&&document.getElementById("advancedQueryForm").advancedQuery.value=="advancedQuery"){
	        	if(document.getElementById(this.id+"_page")!=null){
	        		var formObj = document.getElementById("advancedQueryForm");
					formObj.ad_allflag.value = 0;
					formObj.ad_currpage.value = thePage;
					formObj.ad_rows.value = this.page_pageSize;
					formObj.ad_totalpages.value = this.page_pageCount;
					formObj.ad_totalrows.value = this.page_totalRecord;
					//���Լ���ҳ�����ر���
					try{
				        doprivateQuery(formObj);
					}catch(e){
						//���ɹ�,������,��û��ʵ�ָ÷���
					}
				}else {
					$('advancedQueryForm').ad_allflag.value = 1;
				}
				//��ҳʱ����������� 20090915 kim
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
						formObj.rows.value=document.getElementById(this.id+"setpage_size").value;
					}else{
						formObj.rows.value = this.page_pageSize;
					}
					formObj.totalpages.value = this.page_pageCount;
					formObj.totalrows.value = this.page_totalRecord;
					//���Լ���ҳ�����ر���
					try{
				        doprivateSimQuery(formObj);
					}catch(e){
						//���ɹ�,������,��û��ʵ�ָ÷���
					}
				}else {
					formObj.allflag.value = 1;
				}
				//��ҳʱ����������� 20090915 kim
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
	* AJAX��ѯ
	**/
	this.ajaxquerypost =function(queryform,url,param,asynchronous){
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
											datatable.show();	
										}							   		
								   	}
								}else{
									if(json.id != undefined && json.id != "datatable"){
										eval("var datatable = "+json.id);
									}
									datatable.data = json.data;
									eval(json.pageinfo);
									datatable.show();
								}
							}catch(err){}
							closeDiv();
						},
				   onFailure : function(resp) {
					  alert("�����쳣");
					  closeDiv();
					}
		}); 
	}

	//����
	this.sort_click = function(el){
	   if(this._headerOper != COL_HEAD_DOWN) return;
	   var thobj = el;
	   //this.columnWidth[el.cellIndex] = el.offsetWidth+25;
	   var sortname = thobj.sortname;
	   var sorttype = thobj.sorttype;
	   var idx = thobj.cellIndex;
	   var cellindex = thobj.cellIndex;
	   var aRowsList=this.data;//��Ŵ������rows
	   var reList = [];
	   if(this.data!=null&&this.data.length>0){
	       //�������
	       try{
			   if(this.currentSortCol==null||this.currentSortCol != idx){
			        this.columnWidth[idx] = el.offsetWidth+25;
			   		el.style.width=el.offsetWidth+25;
			   }
			   aRowsList.sort(this.generateCompareFunc(sortname,sorttype,idx));//���������sort�����������������
			   if(document.getElementsByName("sortcol_img")!=null&&document.getElementsByName("sortcol_img").length>0){
			        for(var i=0;i<document.getElementsByName("sortcol_img").length;i++){//�Ƴ�ͼ��
			            var thobja= document.getElementsByName("sortcol_img")[i];
			            //�������
			            if(thobja.innerHTML!="" && this.currentSortCol == thobja.parentNode.cellIndex && thobja.parentNode.cellIndex!=idx){
			                 //thobja.parentNode.style.width = thobja.parentNode.offsetWidth-25;
			                 this.columnWidth[thobja.parentNode.cellIndex]  = thobja.parentNode.offsetWidth-25;
			            }
			            thobja.innerHTML="";
		           }
			   }
			   for(var i=0; i < this.getTableHead.length;i++){
			    	var othobj= document.getElementById(this.id+"_"+this.getTableHead[i]);
			    	if(!this.columnWidth[i]	&& !(this.getTableHead[i]=="serial" || this.getTableHead[i]=="checkbox" || this.getTableHead[i]=="radio")){
			    		this.columnWidth[i] = othobj.offsetWidth;
			    	}
			    	
			    }
			   if(this.orderMap[idx]=='asc'){
			      for(var i=aRowsList.length-1;i>=0;i=i-1){//��������
			           reList[reList.length]=aRowsList[i];
			           
			   	  }
			   	  this.data = reList;
			   	 // thobj.lastChild.innerHTML = '<img src="'+ ROOT_PATH + '/images/actions/asc.gif" width="22px" height="22px" border="0" align="absmiddle" />';
		       }else{
			       for(var i=0;i<aRowsList.length;i++){//��������
			            reList[reList.length]=aRowsList[i];
		           }
		           this.data = reList;
		          // thobj.lastChild.innerHTML = '<img src="'+ ROOT_PATH + '/images/actions/desc.gif" width="22px" height="22px" border="0" align="absmiddle" />';
			   }
			   this.switchOrder(idx);
			   this.currentSortCol = idx;
			}catch(err){}  
	   }
	   this.drawing = true;
	   this.draw();
	   this.resetscroll();
	}
	this.toDate=function(ds){//�ַ���ת���������� ��ʽ MM/dd/YYYY MM-dd-YYYY YYYY/MM/dd YYYY-MM-dd 
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
	this.dateFom=function(s){ //add by jiazhiyu ���ڸ�ʽת������ 2012-02-13
		var s1=s.substring(0,4);
		var s2=s.substring(4,6);
		var s3=s.substring(6);
		s=s1+"/"+s2+"/"+s3;
		return s;
	}
	this.toVchtype=function(s){
		eval("var vchtypeName=vchtype_"+s.tovchtypeid);
		var ss=parseInt(vchtypeName.split("-")[0]);
			return ss;
	}
	this.generateCompareFunc=function(sortname,type,i){//���������� 
	   var idx=i;//�е��±� 
	   var func=this.compareFuncMap[idx];//����map����,�Ҳ������½� 
	   if(func!=null) return func; 
	   var instance=this;//�հ����ò��̫����,��Ҫ������ 
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
	           //x1 y1�����ַ������������
	           if(typeof x1 == 'string'){
	           		return x1.localeCompare(y1);//���ñ��صıȽϺ���,���ְ�����ƴ������ 
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
	            x=(x+"").replace(/[^\d|.|-]/g,"");//ȥ����-.����������ַ� 
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
			if(!isValidDate||!isValidDate2){	//����������Ĳ�����Ч���������ͣ������ַ�������
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
		           //x1 y1�����ַ������������
		           if(typeof x1 == 'string'){
		           		return x1.localeCompare(y1);//���ñ��صıȽϺ���,���ְ�����ƴ������ 
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
					if(column){
						var colconfig=JQ(tdobj).data("colconfig");
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
}
function revertdata(request){
		try{
			eval("var cachedata = "+request.responseText);
			
			// ��������һ���Ƿ��Ƿֲ����ؽڵ�
	    	if(cachedata.length > 0){
	    		if("cachenode" == cachedata[0].nodetype){
	    			var cachenode = cachedata[0];
	    			var dataTable = window[cachenode.dataid];
	    			// �Ƴ��ýڵ�
	    			cachedata.shift();
		    		dataTable.data = dataTable.data.concat(cachedata);
		    		dataTable.resetscroll();
		    		

		    		var size = parseInt(cachenode.size,10);
		    		var startpoint = parseInt(cachenode.startpoint,10);
		    		var length = parseInt(cachenode.length,10);
		    		
		    		if(size > (startpoint+length)){
	    				// ������ȡ����
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
		id:"",		//�б�ʶ
		name:"",	//�ֶ���
		type:"",	//�ֶ�����
		title:"",	//��ʾ����
		style:"text-align:left",	//��ʾ��ʽ
		showconfig:[],	//��������
		show:function(rownum,value,row,tdobj,datatable){ //���ر��td�ڵ�HTML����,value�Ǹ��е�ֵ,row���ж���,tdobj�Ǳ�����
			if(value==null)
			   tdobj.innerHTML = "&nbsp;";
			else{  //tdobj.innerHTML = value;
			   if(datatable.isWrap || datatable.useThisHead || !datatable.bodyColResize)  tdobj.innerHTML = value;
			   else tdobj.innerHTML = "<div onclick='return showOverlibTips(this.innerHTML,this);' class ='divoverflow'>"+value+"</div>";
			 }
		} 
	};
}

var ColumnConfig = new Array();
function showInputAmt(rownum,value,row,tdobj,datatable){
var unit=this.amtflag;
	if(null==unit||""==unit||"2"==unit){
		unit=1;
	}
	var colname =this.name;
	if(value != null){
		value = value+"";
	} else {
		value ="";
	}
    tdobj.style.backgroundColor = '#FFEFC3'; //Ĭ����ɫ
	// �����ɱ༭����
	var tableid=datatable.id; 
	var col = this;
	var colname =this.name;
	var divid="div_"+tableid+"_"+colname+"_"+rownum;
	var divobj = document.createElement('<div id =\"'+divid+'\" name =\"div_'+colname+'\" style="width:100%"></div>');
	var temp = '0.00' ;
	var nlen =2;
	if(this.amtflag=="10000"){
		//nlen =6;
	}
	if (value!='') temp = Math.round((value/unit)*Math.pow(10,nlen))/Math.pow(10,nlen)+"" ;  //��λ���ת��
	
	divobj.innerHTML = (value==''?'':temp.toMoneyFormat());  //��ʼ��ʾΪ�� wy modified
	// ��datatable�������ù�ϵ
	divobj.datarow = row;
	divobj.col=this;
	divobj.datatable = datatable;
	// ���ɱ༭ȡ׷�ӵ����
	tdobj.appendChild(divobj);
	var olddata = new Object();
	
	var colid = this.id;
	
	// ��굥����Ԫ�������޸����� 
	if(datatable.disabled==false && datatable.getDisabledConfig(this.id,rownum) == false){

	divobj.onclick = function(){
		if(datatable.beforeClick){
			if(datatable.beforeClick(this.datarow,colname)){
				this.contentEditable = false;
				return;	
			}
		}
		// ���Ƚ�ǧ��λȥ��
		var m = this.innerText.trim();
		if(m == ""||m == "0.0"||m=="0.00"){
			this.innerHTML = "0.00"; 
			this.defaultamt = 0.00;
		}else{
			if(this.contentEditable!="true"){
				m = m.replace(/,/g,"");
				this.innerHTML = m;
				this.defaultamt = parseFloat(m);
			}
		}
		
		// ������ʽ����
		if(this.parentElement!=null) this.parentElement.oldbackgroundColor = this.parentElement.runtimeStyle.backgroundColor;
		if(this.parentElement!=null) this.parentElement.runtimeStyle.backgroundColor = '#FFFF00';  //�õ�������ɫ
		
		// ���ÿɱ༭����
		this.contentEditable = true;
		this.focus();
		this.setActive();
	}
		
	divobj.onblur = function(){
	   divobj.clearzero = false;
	   if(this.parentElement.runtimeStyle.backgroundColor ==""){
	     return;
	   }
		var m = this.innerHTML;
		m = m.replace(/,/g,"");
		//wy ���С��������
		var ma = m.split(".");
		if(ma.length>2){
			m= ma[0]+"."+ma[1];		
		}
		if(!this.datatable.negative){//��������
			m = m.replace(/\-/g,"");
		}
		if(isNaN(m)){
			alert("�����ݵ����ָ�ʽ�����⣬���飡");
			this.innerText = "";
			this.setActive();
			return ;
		}
		
		// ����Ƿ������ⲿУ�鷽��
		// ��ҳ���Ͽ��Ը��ݷ����������򴴽�У�鷽��
		// �������� checka+������+cell
		// ���У�鲻ͨ����Ҫ��������false
		if(this.datatable.checkamtcell){
			// �˴��ѽ������ת������  ��λת��
			var r = this.datatable.checkamtcell(parseFloat(this.defaultamt*unit),parseFloat(m*unit),row);
			if(r == false){
				this.setActive();
				return ;
			}
		}
		
		if(this.parentElement!=null) this.parentElement.runtimeStyle.backgroundColor = "";
		// ���ò��ɱ༭
		this.contentEditable = false;
		var m1 = new String(m*unit);
		m1 = m1.toMoneyFormat();
		m1 = m1.replace(/,/g,"");
		eval("olddata.value = divobj.datarow."+colname);
		eval("divobj.datarow."+colname+" = m1");
		this.innerHTML = m.toMoneyFormat();
		if(m == ""||m == "0.0"||m=="0.00")  //���Ϊ0.00��ʧ����ʱ��ʾΪ�� wy add
	    	document.getElementById(divid).innerHTML = "";
		datatable.setTotalVal(datatable,colname);
		if(datatable.ondatachange){
    		var func = datatable.ondatachange;
    		eval(func+"(this.datatable,this.datarow,this.col,olddata)");
    	}
		dataTabelKeyInputFilter(this);
		
		if(this.activeFlag){
			    var vouObj = new Object(); 
			    if(this.activeObject!=null)
			    	vouObj = this.activeObject;
			    eval("vouObj."+colname+"=m");
				var submenu = datatable.submenu;
	            var vchtypecode = datatable.vchtypecode;
			    new Ajax.Request(
		            ROOT_PATH+"/common/getInputRuleDefaultValue.do",
		            {method: 'post', parameters: "submenu="+submenu+"&vchtypecode="+vchtypecode+"&voucher="+Object.toJSON(vouObj),
		             onComplete: function(resp){
						var jsons = resp.responseText.evalJSON(true);
						for (items in jsons){
						     var json = jsons[items];
						     eval("row."+items+"="+json.id);  
						     eval("row."+items+"_code=\""+json.code+"\""); 
						     eval("row."+items+"_name=\""+json.name+"\"");
							 reShowElement2(items,butid,divid,row.rownum,datatable.id);  
						}				
		             }}
		            );
		}
	}
	//divobj.onkeydown =txtEditkeydown;

	divobj.onkeydown = function(){
		var m = this.innerText.trim();
		// zhangjusuo 20090622 ֧������С�����磺0.12
		if(m != null){
			//divobj.clearzero ��ʶ�ǵ�һ�μ����¼�ʱ���0.00����ֹ0.009���Զ����9
			if( m=="0.00" && !divobj.clearzero){//m == "0" || m=="0.0" || m=="0.00"
				divobj.clearzero = true;
				this.innerHTML ="";
			}else if(!divobj.clearzero){
				divobj.clearzero = true;
			}
		}
		keySwitchFocus(divid,datatable);
		if(event.keyCode == 13){ 
			// �س���,����ʧ�����¼�
			this.fireEvent("onblur");
			//Ѱ����һ����Ԫ�񲢴�������div��onclick����	
			//var nowdivobj = document.getElementById(divid);
    		//var nowtdobj = nowdivobj.parentElement;
    		//nextDiv(nowtdobj,nowdivobj,datatable);
    		nextDivByDivid(divid,datatable);
			return false;
		}
		else if(event.keyCode == 27 ){
			// Esc��,�ָ�Ĭ��ֵ
			this.innerText = this.defaultamt;
			this.fireEvent("onblur");
			return false;
		}
	}
        //20090915 ������
        divobj.onpaste = function(){
               clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d\.]/g,''));
        }
	}
}

//20090914 copy  showInputAmt for  defineColumn
function showInputAmt2(rownum,value,row,tdobj,datatable){
	this.showInputAmt = showInputAmt;
	this.showInputAmt(rownum,value,row,tdobj,datatable);
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
 tdobj.innerHTML = optiondate.getYear()+'-' + (optiondate.getMonth() + 1) + '-'+optiondate.getDate() + ' ' + clock; 
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
    //debugger;
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

//datatable  �б༭�� ���onlick ��ѡ����л�����
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

		elementfilter = getQueryStr(elementfilter); //wy add ���ý������ù�������
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
	  //����Է��ص�json������н�����������������һ������     +inObj.value  
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
//datatable  �б༭�� ���onlick ��ѡ����л�����
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
		//���ɹ�,������,��û��ʵ�ָ÷���
	}	
	var obj=new Object();
	obj.elementcode=element;
	obj.itemid=itemid;
	obj.submenu= submenu;
	obj.vchtypecode = vchtypecode;
	obj.elementfilter = input.elementfilter;
	//ĩ�����ƿɿ���
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

//���س������Ƶ���һ���ؼ���������divObj��onclick�¼�
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
		    var nextdivObj = nexttdObj.firstChild;
		    if(datatable.isEditCol(col)){
			    if(!rightkey){ nextdivObj.fireEvent("onclick");
			    	//�����Ԫ����������ڿ��ӷ�Χ��ȣ�������+��Ԫ����
			    	var currWidth = JQ(nexttdObj).parents("div")[0].offsetWidth;
			    	if(nexttdObj.offsetLeft>currWidth){
			    		JQ(nexttdObj).parents("div")[0].scrollLeft = JQ(nexttdObj).parents("div")[0].scrollLeft+nexttdObj.offsetWidth;
			    	}
			    	//�й̶��У������Ԫ������λ��С�ڹ�����λ�ã�����������
			    	var fixcol = JQ(nexttdObj).parent("tr").find("td.FixedDataColumn");
			    	if(fixcol.length>0){
			    		var scrLeft = JQ(nexttdObj).parents("div")[0].scrollLeft;
				    	if(scrLeft>=nexttdObj.offsetLeft){
				    		var currCell = fixcol[fixcol.length-1];
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
				//����
			var nowtrobj = nowtdObj.parentElement;
			var nexttrobj = nowtrobj.nextSibling;
			var divid = nowdivObj.id;
			if(nexttrobj!=null && nexttrobj.tagName.toLowerCase() =="tr"){
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
		        if(datatable.isEditCol(col)){
				   var ndivobj = ntdobj.firstChild;
					ndivobj.fireEvent("onclick");
				}else{
					nextDiv(ntdobj,ndivobj,datatable,rightkey,keycode);
				}
			}else{
				//����
				addDatatableRow(datatable); 
				nowdivObj = document.getElementById(divid);
			    nowtdObj = nowdivObj.parentElement;
			    
			    var nowtrobj = nowtdObj.parentElement;
			    var nexttrobj = nowtrobj.nextSibling;
			    if(nexttrobj!=null)
				   nextDiv(nowtdObj,nowdivObj,datatable,rightkey,keycode);
			}
		}
	}
	else if(keycode == 13){
		//����
		var nowtrobj = nowtdObj.parentElement;
		var nexttrobj = nowtrobj.nextSibling;
		var tdindex = JQ(nowtdObj).parent("tr").find("td").index(nowtdObj);
		var divid = nowdivObj.id;
		if(nexttrobj!=null && nexttrobj.tagName.toLowerCase() =="tr"){
		    if(nexttrobj.TotalRow && nexttrobj.TotalRow ==true){
		       addDatatableRow(datatable);
		       nowdivObj = document.getElementById(divid);
		       nowtdObj = nowdivObj.parentElement;
		       nowtrObj = nowtdObj.parentElement;
		       nexttrobj= nowtrObj.nextSibling;
		       if(nexttrobj==null || nexttrobj.TotalRow || nexttrobj.TotalRow ==true)
		    	return;
		    }
			var ntdobj = JQ(nexttrobj).find("td")[tdindex];
	        if(datatable.isEditCol(tdindex)){
			   var ndivobj = ntdobj.firstChild;
			   	//����������������ÿ�����¹���20
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
			//����
			addDatatableRow(datatable); 
			nowdivObj = document.getElementById(divid);
		    nowtdObj = nowdivObj.parentElement;
		    
		    var nowtrobj = nowtdObj.parentElement;
		    var nexttrobj = nowtrobj.nextSibling;
		    if(nexttrobj!=null)
			   nextDiv(nowtdObj,nowdivObj,datatable,rightkey,keycode);
		}
	}
	else{
	 	return;
	}	
}

//���س������Ƶ���һ���ؼ���������divObj��onclick�¼�
function  prevDivByDivid(divid,datatable){
      var nowdivobj = document.getElementById(divid);
      var nowtdobj = nowdivobj.parentElement;
      prevDiv(nowtdobj,datatable); 
}
function  prevDiv(nowtdObj,datatable){
	var nexttdObj = nowtdObj.previousSibling;			
	if(nexttdObj&&nexttdObj!=null){
	    var col = nexttdObj.cellIndex;
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
		//����
		var nowtrobj = nowtdObj.parentElement;
		var nexttrobj = nowtrobj.previousSibling;
		if(nexttrobj!=null && nexttrobj.tagName.toLowerCase() =="tr"){
			var ntdobj = nexttrobj.lastChild;
			var col = ntdobj.cellIndex;
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

//���س������Ƶ���һ��һ���ؼ���������divObj��onclick�¼�
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

//���س������Ƶ���һ��һ���ؼ���������divObj��onclick�¼�
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
//����(����jspҳ����Ը���������������)
function addMainListRow(){} //����������
function addDetailListRow(){} //������ϸ��
/**
��λת��
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
	tdobj.innerHTML =  "<div onclick='return showOverlibTips(this.innerHTML,this);' class='divoverflow'>"+value.toMoneyFormat()+"</div>";
}

function showElement(rownum,value,row,tdobj,datatable){
    eval("var code = row."+this.id+"_code");
	eval("var name = row."+this.id+"_name");
	if(code != null && name!= null){
	    if(this.codeShow==null){
	         this.codeShow= checkCodeShowFlag(this.id);
	    } 
	    if(datatable.isWrap || datatable.useThisHead || !datatable.bodyColResize){
	    	if(this.codeShow){
            	tdobj.innerHTML =code+"-"+name;
            } else {
            	tdobj.innerHTML = name;
            }
		}else
		   if(this.codeShow){
	       		tdobj.innerHTML = "<div onclick='return showOverlibTips(this.innerHTML,this);' class='divoverflow'>"+code+"-"+name+"</div>";
	       } else {
	        	tdobj.innerHTML = "<div onclick='return showOverlibTips(this.innerHTML,this);' class='divoverflow'>"+name+"</div>";
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
	
	// �����ɱ༭����
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
	// ��datatable�������ù�ϵ
	divobj.datarow = row;
	divobj.datatable = datatable;
	divobj.col =col;
	divobj.colid= colid;
	// ���ɱ༭ȡ׷�ӵ����
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
	// ��굥����Ԫ�������޸�����
	if(datatable.disabled==false && datatable.getDisabledConfig(this.id,rownum) == false){
	divobj.onclick = function(){
	    //�Ƿ�ɱ༭ ҵ��ϵͳʵ���߼�
	    var func = "callBeforeDataTableInput_"+this.datatable.id+"("+row+",'"+this.colid+"')";
		var isEdit = true;
		try{
		    isEdit = eval(func);
		    if (!isEdit) return;
		}catch(e){
			//���ɹ�,������,��û��ʵ�ָ÷���
		}
	
		if(document.getElementById(colid)==undefined){
		    //��ʼ������
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
			  
			// ���� �б���ϵ
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
			         // wy �س��������¸���Ԫ����div��onclick�¼�
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

function showInputRemark(rownum,value,row,tdobj,datatable){
	if(value != null){
		value = value+"";
	} else {
		value ="";
	}
	var colname=this.name;
	// �����ɱ༭����
	var tableid=datatable.id; 
	tdobj.style.backgroundColor = '#FFEFC3';
	var col = this;
	var colname =this.name;
	var divid="div_"+tableid+"_"+colname+"_"+rownum;
	var divobj 
	if(datatable.isWrap || datatable.useThisHead || !datatable.bodyColResize) 
	       divobj = document.createElement('<div></div>');
	else
	       divobj = document.createElement('<div class ="divoverflow"></div>');     
	divobj.innerHTML = value;
	// ��datatable�������ù�ϵ
	divobj.datarow = row;
	divobj.datatable = datatable;
	// ���ɱ༭ȡ׷�ӵ����
	tdobj.appendChild(divobj);
	if(datatable.disabled==false && datatable.getDisabledConfig(this.id,rownum) == false){	
		// ��굥����Ԫ�������޸����� 
		divobj.onclick = function(){
			var m = this.innerText.trim();
			if(m == null){
				this.innerHTML ="";
				this.defaultremark = "";
			} else {
				this.defaultremark = m;
			}
			
			//alert("divobj=="+divobj.outerHTML);
			// ������ʽ����
			if(this.parentElement!=null) this.parentElement.oldbackgroundColor = this.parentElement.runtimeStyle.backgroundColor;
			if(this.parentElement!=null) this.parentElement.runtimeStyle.backgroundColor = '#FFFF00';  //�õ�������ɫ
			
			// ���ÿɱ༭����
			this.contentEditable = true;
			this.focus();
			this.setActive();
		}
		
	
		divobj.onblur = function(){
			this.innerHTML = convertStr(divobj.innerText);
			var m = this.innerHTML;	
			if(this.parentElement!=null) this.parentElement.runtimeStyle.backgroundColor = "";
			// ���ò��ɱ༭
			this.contentEditable = false;
			//divobj.datarow.remark = m;
			eval("divobj.datarow."+colname+" = m");			
			this.innerHTML = m;
			var inlength = m.replace(/([\u00FF-\uFFFF])/g,"**").length;
			if(inlength>255){
				//alert("�����ַ��������ܳ���255��");	
				this.innerHTML = m.slice(0,(255-inlength));
			}				
		}
		divobj.onkeydown = function(){
		    keySwitchFocus(divid,datatable);
			if(event.keyCode == 13){
				//Ѱ����һ����Ԫ�񣬲���������div��onclick����
				nextDiv(tdobj,divobj,datatable);				
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
		
		//�����ַ�¼����תȫ��
		divobj.onkeyup = function(){
			//this.innerHTML = convertStr(divobj.innerHTML);
			//var m = this.innerHTML;
			//var inlength = m.replace(/([\u00FF-\uFFFF])/g,"**").length;
			//if(inlength>255){
			//	alert("��¼���ַ�λ��Ϊ"+inlength+",����255��");	
			//	this.innerHTML =  m.slice(0,(255-inlength));			
			//}						
		}
	}
}

function showInputText(rownum,value,row,tdobj,datatable){
	var colname =this.name+"";
	
	// �����ɱ༭����
	var divobj;
    if(datatable.isWrap || datatable.useThisHead || !datatable.bodyColResize) 
	       divobj = document.createElement('<div></div>');
	else
	       divobj = document.createElement('<div class ="divoverflow"></div>');  
	if(value != null){
		value = value+"";
	} else {
		value ="";
	}
	divobj.innerHTML=value;
	// ��datatable�������ù�ϵ
	divobj.datarow = row;
	divobj.datatable = datatable;
	// ���ɱ༭ȡ׷�ӵ����
	tdobj.appendChild(divobj);
	var input;
	// ��굥����Ԫ�������޸����� 
	divobj.onclick = function(){

		divobj.innerHTML="";
		if(input==undefined){
		    input=document.createElement('<input type="text" style="width:100%" value = "'+value + '"/>');
		    divobj.appendChild(input);
		}
		input.focus();
		
	    input.onblur = function(){
		    var m = input.value;
		    value = m;
		    var pare = this.parentElement;		
		    if(this.parentElement!=null) this.parentElement.runtimeStyle.backgroundColor = "";
		    eval("divobj.datarow."+colname+" = m");
		    divobj.removeChild(input);
		    input=undefined;
		    divobj.innerHTML=m;
		    
	    }
	}	
}

function showSelect(rownum,value,row,tdobj,datatable){
    thisRow =  row;
	var tableid=datatable.id; 
	var col = this;
	var colname =this.name;
	// �����ɱ༭����
	var divid="div_"+tableid+"_"+colname+"_"+rownum;
	var divobj = document.createElement('<div id =\"'+divid+'\" name =\"div_'+colname+'\" class ="divoverflow"></div>');

	var selectIndex = 0;
	// �����ɱ༭����
	//var divobj = document.createElement('<div style="width:100%;"></div>');
	if(value != null){
		if(value == -1){
			divobj.innerHTML="��";
		} 
		if(value == 1){
			divobj.innerHTML="��";
		}
	}else{
	   divobj.innerHTML="";
	}	
	// ��datatable�������ù�ϵ
	divobj.datarow = row;
	divobj.datatable = datatable;
	// ���ɱ༭ȡ׷�ӵ����
	tdobj.appendChild(divobj);

	var select = null;
	var oOption1 = null;
	var oOption2 = null;
	// ��굥����Ԫ�������޸����� 
	divobj.onclick = function(){
		//this.offsetWidth = 100;
		if(select==null && !datatable.disabled){

		    var dvalue =  divobj.innerHTML;		
		    divobj.innerHTML = "";	
			select =document.createElement("<SELECT id='wyd' style='width:100%'/>");

			oOption1 = document.createElement("OPTION");
			oOption2 = document.createElement("OPTION"); 
			oOption1.text="��";
            oOption1.value="1";
			oOption2.text="��";
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
					//Ѱ����һ����Ԫ�񣬲���������div��onclick����
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
 * @author jiazhiyu��������issourceΪ5���б���������ʱ���ʹ�����ڿؼ��μ� ColumnConfig.java
 * �����ṩ��datatable���ڿؼ�¼���Ժ��������滻���÷���
 */
function showInputDate(rownum,value,row,tdobj,datatable){
   // add by lwy 20110701�����¼��״̬������״̬�ĵ��ݲ��ܽ��б༭ (����ƻ�ʹ��)
//	if(row.wfstatus!=undefined&&row.wfstatus!="00"&&row.agreerepayamtrmb!=""){
//	    tdobj.innerHTML =  "<div onclick='return showOverlibTips(this.innerHTML,this);' class='divoverflow'>"+value+"</div>";
//	    return;
//	}//end by lwy //
	var colname = this.name+"";
	var colid = (this.id+"").split(".")[0];
	var func = "callAfterDateInput_"+colid;
	var currentValue="";
	var tableid = datatable.id; 
	// �����ɱ༭����
	var divid = "div"+tableid+"_"+colname+"_"+rownum;
	var divobj = document.createElement('<div id="'+divid+'" style="width:90%;white-space:nowrap"></div>');
	if(value != null){
		value = value+"";
	} else {
		value ="";
	}
	tdobj.style.width='129px';
	tdobj.style.backgroundColor = '#FFEFC3'; //Ĭ����ɫ
	var format  = this.format;
	var df;
	if(format!=null){
		df=new SimpleDateFormat();//jsJava1.0��Ҫʹ��DateFormat���󣬲�ҪŪ�������
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
	// ��datatable�������ù�ϵ
	divobj.datarow = row;
	divobj.datatable = datatable;
	// ���ɱ༭��׷�ӵ����
	tdobj.appendChild(divobj);
	var input;
	var button;
	divobj.onblurTag=false;
	// ��굥����Ԫ�������޸����� 
	divobj.onclick = function(){
		if(input==undefined){
			divobj.innerHTML="";
			var inputHTML ='<input id="'+colname+'"  name="'+colname+'" value ="'+value+'" style="width:80px" type="text"/>';
			var buttonHTML ='<img src="/images/calendar/date.gif" alt="ѡ������" onclick=\'return showCalendar(\"'+colname+'\", \"%Y%m%d\", null, true);\' style=\"cursor:hand; border:0;\" onmouseover=\"this.style.background=\'red\';\" onmouseout=\"this.style.background=\'\'\"/>';
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
		//�ֽ�������⴦��ҳ��ص�����
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
	// �����ɱ༭����
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
	// ��datatable�������ù�ϵ
	divobj.datarow = row;
	divobj.datatable = datatable;
	// ���ɱ༭ȡ׷�ӵ����
	tdobj.appendChild(divobj);
	var input; var inputfile;
	// ��굥����Ԫ�������޸����� 
	divobj.onblurTag=true;
	divobj.inputBlurTag = false;
	divobj.onclick = function(){
			if(document.getElementById(colid)==undefined){
				divobj.innerHTML="";
			    //��ʼ������
				var divo = document.createElement('<div style="display:none;"></div>');
				inputfile=document.createElement('<input id="'+colid+'_file"  type="file"  onpropertychange=\'changevalue("'+colid+'")\'/>');
				input=document.createElement('<input id="'+colid+'" name="'+colname+'"   style="width:60%" type=text class=main_lookup_input />');
				var buttonHTML ='<input type = "button"  id="'+butid+'" stype = "width:20%;"  value = "���"  onbeforeactivate = \'butbeforeactivate(\"'+divid+'\");\' onclick="selectfile(\''+colid+'\')" >���</input>';
				var imgobj = document.createElement("<img align=middle type ='image' value='���' src='/images/done_btn/clear_qry2.gif' onclick='parentElement.clear();'>");
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
// ���������
col = createColumnConfig();
col.id = "noFind";
col.name = "noFind";
col.type = "S";
col.title = "#!δ�ҵ�������";
ColumnConfig[col.id.toLowerCase()]=col;


// ���������
col = createColumnConfig();
col.id = "serial";
col.name = "serial";
col.type = "I";
col.title = "���";
col.style = "width:35px";
col.show = function(rownum,value,row,tdobj,datatable){
	tdobj.innerHTML = rownum+1;
	tdobj.datatable = datatable;
	tdobj.onclick = function (){
		// ���ѡ����
		var datatable = this.datatable;
		var selectedrows = datatable.getSelectedRow();
		if(selectedrows.length > 0){
			for(var i=0;i<selectedrows.length;i++){
				selectedrows[i].checked = false;
			}
		}
		row.checked = true;
		datatable.isredraw = true;
		datatable.draw();
		if(typeof(showEdit)=="function")showEdit(this.datatable.id);
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

// ��ѡ��������
col = createColumnConfig();
col.id = "checkbox";
col.name = "checkbox";
col.type = "checkbox";
col.style = "width:33px";
col.title = '<input name="allbox" type="checkbox" onclick="this.parentElement.parentElement.parentElement.parentElement.datatable.selectedallrows(this.checked)"/>';
col.show = function(rownum,value,row,tdobj,datatable){
	var checkbox = null;
	if(row.checked == true || datatable.selectedall){
		checkbox = document.createElement('<input name="" type="checkbox" checked/>');
	}
	else{
		checkbox = document.createElement('<input name="" type="checkbox"/>');
	}

	if(typeof(row.checkdisabled)!="undefined"){ checkbox.disabled = row.checkdisabled=="true"};
	tdobj.appendChild(checkbox);
	
	checkbox.row = row;
	checkbox.datatable = datatable;
	checkbox.onclick = function(){
		var datatable = this.datatable
		var selectedrows = datatable.getSelectedRow();
		this.row.checked = this.checked;
		var trobj = this.parentNode.parentNode;
		var allTR = trobj.parentNode.children;
		//�ж��Ƿ���shift��������ѡ�е���,���ͬһ��ʱ
		if(!event.shiftKey || selectedrows.length==0 || selectedrows.rownum == this.row.rownum){
			if(!this.checked){
				var inputs = datatable.contentdiv.getElementsByTagName("INPUT");
				
				for(var i=0;i<inputs.length;i++){
					if(inputs[i].name == "allbox"){
						inputs[i].checked = false;
						datatable.selectedall = false;
						break;
					}
				}
				trobj.className="main_table_title_letter";
	   		    trobj.onmouseover = function(){trobj.runtimeStyle.backgroundColor='#e8f4ff';};
	   		    trobj.onmouseout = function(){trobj.runtimeStyle.backgroundColor='';};
	   		    trobj.fireEvent("onmouseover");
			}else{
				if(this.row.showinfo!=null&&this.row.showinfo == true){
		   		   trobj.className="main_table_title_letter_info";
		   		} else{
		   		   trobj.className="main_table_title_letter_selected";
		   		}
		   		trobj.onmouseover = function(){trobj.runtimeStyle.backgroundColor='';};
		    	trobj.onmouseout = function(){trobj.runtimeStyle.backgroundColor='';};
		    	trobj.fireEvent("onmouseout");
	   		}
		}
		else{
			//�õ�����ѡ�е�����
			var numarr = [];
			for(var k = 0;k<allTR.length;k++){
				var TR = JQ(allTR[k]).find("input:[type=checkbox][checked=true]");
				if(TR.length>0 && allTR[k].rowIndex != trobj.rowIndex){
					numarr.push(allTR[k].rowIndex);
				}
			}
			//����õ����ֵ��Сֵ
			numarr.sort();
			//�Ƚ��б�����������������С�кź�����к�֮��
			//��ѡ��������ѡ��������ʽ�Ĳ�ȫ
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
		//ѡ���кϼ�
		if(datatable.isCreateAmtColumn) datatable.sumMainAmtToColumn(datatable.totalColumn);
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

// ��ѡ��������
col = createColumnConfig();
col.id = "radio";
col.name = "radio";
col.type = "radio";
col.title = '&nbsp;';
col.style = "width:30px";
col.show = function(rownum,value,row,tdobj,datatable){
	var radiobtn = null;
	if(row.checked == true ||row.checked == "true"){
		radiobtn = document.createElement('<input name="'+datatable.id+'_radio" type="radio" checked/>');
	}
	else{
		radiobtn = document.createElement('<input name="'+datatable.id+'_radio" type="radio"/>');
	}
	if(typeof(row.checkdisabled)!="undefined"){ radiobtn.disabled = (row.checkdisabled=="true")};
	tdobj.appendChild(radiobtn);
	radiobtn.row = row;
	row.checkobj = radiobtn;
	radiobtn.datatable = datatable;
	
	/*
	 * ��ӵ�ѡ��radio��Ӧ�������¼��¼�
	 * @author jiazhiyu @2012-02-03
	 */
	radiobtn.onkeydown=function(){
		var datatable=this.datatable;
		var rownum=this.row.rownum;
		var currentrow=rownum;
		var nextrow=rownum+1;
		var backrow=rownum-1;
		var updown=null;
		if(event.keyCode=='38'){ //�ϼ�
			updown="up";
			if(datatable.data[backrow]==null){
				return;
			}
			datatable.data[currentrow].checked=false;
			datatable.data[backrow].checked=true;
		}else if(event.keyCode=='40'){	//�¼�
			updown="down";
			if(datatable.data[nextrow]==null){
				return;
			}
			datatable.data[currentrow].checked=false;
			datatable.data[nextrow].checked=true;
		}
		//ͬ���¼�tr������Ӧ�¼�
		var trobj=this.parentNode.parentNode;
		trobj.onclick();
		if(updown=="down"){
			datatable.drawToRow(currentrow);			
		}else if(updown=="up"){
			datatable.drawToRow(currentrow-1);
		}
		//��ѡ���ȡ����
		//��һ��ִ�����²�������Ϊ��ʱ����ʧȥ���㡣���Ը��ӳ�һ��
		getFocus(this);
		window.event.cancelBubble = true;
		return false;
	}
	
	
	radiobtn.onclick = function(){
		var datatable = this.datatable;
		// ���ѡ���� 
		//debugger;
		var selectedrows = datatable.getSelectedRow();
		if(selectedrows.length > 0){
			for(var i=0;i<selectedrows.length;i++){
				selectedrows[i].checked = false;
			}
		}
		datatable.waitrefreshdata = selectedrows;
		// ѡ�е�ǰ��
		this.row.checked = true;
		datatable.waitrefreshdata[datatable.waitrefreshdata.length] = this.row;
		datatable.waitrefreshdata.bounds += (datatable.waitrefreshdata.bounds.length>0?",":"")+datatable.getSelectedRow().bounds;
		
		var dbody = datatable.contentdiv.getElementsByTagName("TABLE").item(0).getElementsByTagName("TBODY").item(1);
		var cellIndex =-1;
		for(i=0;i<datatable.columnConfig.length;i++){
		     if(datatable.columnConfig[i].name=="radio"){
		         cellIndex = i ; break;
		     }
		}
		for(i=0;i<dbody.childNodes.length;i++){
		     var trobj = dbody.childNodes[i];
		     var radioinput = trobj.cells[cellIndex].childNodes[0];
		     if(radioinput && radioinput.checked){
		            radioinput.checked = false;
		         	trobj.className="main_table_title_letter";
		         	//��ȥ���˴��б�ɫ����ѡ�������£��ٴ�������ѡʱ�б���ɫûȥ��
		   		    //trobj.onmouseover = function(){trobj.runtimeStyle.backgroundColor='#e8f4ff';};
		   		    trobj.onmouseout = function(){trobj.runtimeStyle.backgroundColor='';};
		     }    
		}
		this.checked = true;
        var trobj = this.parentNode.parentNode;
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
		getFocus(this);
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
	        var headbody = datatable.contentdiv.getElementsByTagName("TABLE").item(0).getElementsByTagName("TBODY").item(0);
			var cols = datatable.columnConfig.length;          
			for(i=0;i<headbody.childNodes.length;i++){
			    trobj = headbody.childNodes[i];
			    if(trobj.childNodes.length==cols){
			           trobj.cells[index].style.width= width+"px";
			    }
			}
			var databody = datatable.contentdiv.getElementsByTagName("TABLE").item(0).getElementsByTagName("TBODY").item(1);
			for(i=0;i<databody.childNodes.length;i++){
			    trobj = databody.childNodes[i];
			    trobj.cells[index].style.width= width+"px";
			}
	        datatable.columnWidth[index] = width;
	   } 
	}catch(err){}     
}
/*
 * kim 20091122
 * datatable���������ɱ࣬�޿�������
 * ��չ���� :
 * ET1 �ɱ༭��������������ƣ�                       ET2 �ɱ༭��������ĩ�����ơ�������ƣ�
 * ET3 �ɱ༭����������ʾһ����������ƣ�              ET4 �ɱ༭����������ʾ������������ƣ�
 * ET5 �ɱ༭����������ʾһ����ĩ�����ơ�������ƣ�    ET6 �ɱ༭����������ʾ������ĩ�����ơ�������ƣ�
 * E7 �ɱ༭��������������ʾ��һ����������ƣ�         ET8 �ɱ༭��������������ʾ��������������ƣ�
 * E9 �ɱ༭��������������ʾ��һ����ĩ�����ơ�������ƣ�ET10 �ɱ༭��������������ʾ��������ĩ�����ơ�������ƣ�
 */
function edittreefordatatable(rownum,value,row,tdobj,datatable){
    var colconfig = this;
	eval("var code = row."+colconfig.name+"_code");
	eval("var name = row."+colconfig.name+"_name");
	eval("var isleaf = row."+colconfig.name+"_isleaf");
	var mainmenu = datatable.mainmenu;
	var submenu = datatable.submenu;
	var vchtypecode = datatable.vchtypecode;
	var divobj = document.createElement('<div class ="divoverflow"></div>');
	var divValue='';
	var defaultValue='';
	var columnName = colconfig.name;
	if(this.codeShow==null){
	    this.codeShow= checkCodeShowFlag(this.name);
	}
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
	tdobj.style.backgroundColor = '#FFEFC3'; //Ĭ����ɫ
	//tdobj.style.backgroundColor = "red";
	// �����ɱ༭����
	
	divobj.datarow = row;
	var columnName = colconfig.name;
	divobj.datatable = datatable;
	divobj.blurtag = true;
	// ���ɱ༭ȡ׷�ӵ����
	tdobj.appendChild(divobj);
	// ��굥����Ԫ�������޸�����   
	divobj.onclick = function(){
		this.innerHTML="";
		var inputobj = document.createElement('<input id="'+columnName+'_input'+ rownum +'" value="'+divValue+'" style ="border:0;height:20px;line-height:20px;" type ="text" readonly/>');
		var btnobj = document.createElement('<button id="'+columnName+'input_btn" style="height: 20px;width: 18px;border: 0px;background-image: url(/images/bg/dot_pop_black5.gif);background-repeat: no-repeat;margin-bottom: 1px;'
			+'margin-left: 2px;" ></button>');
	    var imgobj = document.createElement("<img align=middle type ='image' value='���' src='/images/done_btn/clear_qry2.gif' onclick='parentElement.clear();'>");

			
		//if(this.parentElement!=null) this.parentElement.oldbackgroundColor = this.parentElement.runtimeStyle.backgroundColor;
		//if(this.parentElement!=null) this.parentElement.runtimeStyle.backgroundColor = '#FFFF00';  //�õ�������ɫ
		// ��datatable�������ù�ϵ
		this.appendChild(inputobj);
		this.appendChild(btnobj);
		this.appendChild(imgobj);
		editTdWidthAdjust(this.parentNode,this.datatable,inputobj.offsetWidth+btnobj.offsetWidth+imgobj.offsetWidth+2);
		divobj.blurtag = false;
		//�жϵ�ǰ����¼��Ƿ���ԭ�����¼�
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
			eval("row."+columnName+"='0'");
			eval("row."+columnName+"_code=null");
			eval("row."+columnName+"_name=null");
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
			vouObj.defValue=code;
			vouObj.anyvaluetag="0";
			if(isleaf=="0"){
				vouObj.fromctrlid="1";
			}	
			//������ƹ���
			if(colconfig.showconfig!=null&&colconfig.showconfig.length>0){
				var erg ="";
				for(var i = 0;i<colconfig.showconfig.length;i++){
					try{
						eval("vouObj."+colconfig.showconfig[i]+"=row."+colconfig.showconfig[i]);
					}catch(e){
						erg +="�ֶΣ�"+colconfig.name+"��������ƹ����ֶΣ�"+colconfig.showconfig[i]+"��û������;";
					}
				}
				if(erg.length)
					window.status=erg;
			}
			/* ����Ƿ������ⲿУ�鷽��
			 * ��ҳ���Ͽ��Ը��ݷ����������򴴽�У�鷽��
			 * �������� check+������+ctrl
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
			var parsetype="";
			if(colconfig.type=="ET1"){
				parsetype ="ET1";
			}else if(colconfig.type=="ET2"){
				parsetype ="ET2";
			} else if (colconfig.type=="ET3"){
				parsetype = "ET3";
			} else if (colconfig.type=="ET4"){
				parsetype = "ET4";
			}else if (colconfig.type=="ET5"){
				parsetype = "ET5";
			}else if (colconfig.type=="ET6"){
				parsetype = "ET6";
			}else if (colconfig.type=="ET7"){
				parsetype = "ET7";
			}else if (colconfig.type=="ET8"){
				parsetype = "ET8";
			}else if (colconfig.type=="ET9"){
				parsetype = "ET9";
			}else if (colconfig.type=="ET10"){
				parsetype = "ET10";
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
				eval("row."+columnName+"_code='"+vcode+"'");
				eval("row."+columnName+"_name='"+vname+"'");
				row.ischangflag = true;
			} else if(tempinput.value==""){
				eval("row."+columnName+"='0'");
				eval("row."+columnName+"_code=null");
				eval("row."+columnName+"_name=null");
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
	
	var ilength =el.datatable.inputRuleConfig.length;
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
//�̶����Ҽ�
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
	*���ö��ͷ������� qiudehe 2011-05-17
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
*���ı�չʾ����
*��Ӧ����17
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
* ����У�ѡ����
*/

function rowcheck(){
	var obj = window.event.srcElement;
	if(obj.tagName=="INPUT"||obj.tagName=="A"||obj.tagName=="IMG"){
		return true; 
	}
	if(obj.tagName!="TR"&&typeof(obj.onclick)=="function"){
		var funstr  = String(obj.onclick);
		if(funstr.indexOf("showOverlibTips")==-1)
			return true; 
	}
  	if(obj.tagName == "TD" && obj.innerHTML != null && obj.innerHTML.indexOf("checkbox")!=-1){
		return true; 
	}
	while(obj.tagName!="TR"&&obj.tagName!="TABLE"&&obj.parentElement!=null){
		obj = obj.parentElement;
	}
	if(obj.tagName=="TR"){
		var inputs = obj.getElementsByTagName("INPUT");
		for(var i=0;inputs!=null&&i<inputs.length;i++){
			var checkobj = inputs[i];
			if((checkobj.type=="checkbox"||checkobj.type=="radio") && checkobj.name!="allbox"){
				checkobj = checkobj;
				checkobj.checked = !checkobj.checked;
				checkobj.onclick();
				//�޸�û�д����Զ������¼��������޷�ͬ��  lp20111226
				checkobj.parentNode.parentNode.onclick();
				if(checkobj.type=="radio") {
					getFocus(obj);
				}
				return true;
			}
		}
	}
}
/*
 * radio��ȡ���㷽��
 * @param obj ��ǰ����
 * @author jiazhiyu 2012-02-03
 */
function getFocus(obj){
	var datatable = obj.datatable;
	setTimeout(function (){
		//var focus=document.activeElement; //��ʾ��ǰ����ΪDIV��
		var inputs = datatable.contentdiv.getElementsByTagName("INPUT");
		for(var i=0;i<inputs.length;i++){
			var checkobj = inputs[i];
			if((checkobj.type=="radio")&&((checkobj.checked=="true")||(checkobj.checked==true))){
				checkobj.focus();
			}
		}
	},50);
}
/*
*У��༭�б��б�����
*@datatableΪУ������
*/
function  chkTabEdit(datatable){
	 //�õ�������ҪУ�����
	 var header = datatable.columnConfig;
	 var headarr = []
	 for(var i=0;i<header.length;i++){
	 	if(header[i].id == "noFind"){
	          alert("�ֶ����ô�����˲飡");
	          return false;
		   }
		 //�༭״̬�����Ǳ��� 
		 var heads = {headid:null,headname:null}; 
	     if(header[i].id !="serial" && header[i].id !="checkbox" && header[i].id != "radio" && header[i].requirement=="1"){
	     	  var headid = header[i].id.indexOf(".input")>-1?header[i].id.split(".")[0]:header[i].id;
	          heads.headid = headid;
	          heads.headname = header[i].title;
	          headarr.push(heads);
	     }
	 }
	 //�õ��б�������
	 var data = datatable.data;
	 for(var j=0;j<data.length;j++){
	 	var row = eval(data[j]);
		for(var k=0;k<headarr.length;k++){
			if((row.ischangflag==undefined||row.ischangflag)&& !row[headarr[k].headid]){
				alert("\""+headarr[k].headname+"\"�в���Ϊ��");
				return false;
			}
		}	 	
	 }
	 return true;
}

/**
*	�б�༭֮�����б�ؼ�
*/
function showInputSelect(rownum,value,row,tdobj,datatable){
	eval("var code = row."+this.name+"_code");
	eval("var name = row."+this.name+"_name");
    thisRow =  row;
	var col = this;
	var colname = this.name;
	var data = this.data;
	// �����ɱ༭����
	var divid = "div_"+datatable.id+"_"+colname+"_"+rownum;
	var divobj = document.createElement('<div id =\"'+divid+'\" name =\"div_'+colname+'\" class ="divoverflow"></div>');

	if(this.codeShow==null){
	    this.codeShow= checkCodeShowFlag(this.name);
	}
	if(code != null && name!= null){
		if(this.codeShow){
			divobj.innerHTML = code+"-"+name;
		} else {
			divobj.innerHTML = name;
		}
	}
	tdobj.style.backgroundColor = '#FFEFC3'; //Ĭ����ɫ	
	// ��datatable�������ù�ϵ
	divobj.datarow = row;
	divobj.datatable = datatable;
	// ���ɱ༭ȡ׷�ӵ����
	tdobj.appendChild(divobj);

	var select = null;
	// ��굥����Ԫ�������޸����� 
	divobj.onclick = function(){
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
* AJAX��ҳ
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
							datatable.show();
						}catch(err){}
						closeDiv();
					},
			   onFailure : function(resp) {
				  alert("�����쳣");
				  closeDiv();
				}
	}); 
}
function showInputNumberFormat(rownum,value,row,tdobj,datatable){
	showNumberFormat(rownum,value,row,tdobj,datatable);
}
/**
��λת��
*/
function showNumberFormat(rownum,value,row,tdobj,datatable){
	if(value==null)
		   tdobj.innerHTML = "&nbsp;";
	else{  //tdobj.innerHTML = value;
	   if(datatable.isWrap || datatable.useThisHead || !datatable.bodyColResize)  tdobj.innerHTML = value;
	   else tdobj.innerHTML = "<div onclick='return showOverlibTips(this.innerHTML,this);' class ='divoverflow'>"+value+"</div>";
	 }
}
function getPositionTop(This){
	var el = This;var pT = 0;
	while(el){pT+=el.offsetTop;el=el.offsetParent;}
	return pT;
}
//ȡ�ö�������λ��
function getPositionLeft(This){
	var el = This;var pL = 0;
	while(el){pL+=el.offsetLeft;el=el.offsetParent;}
	return pL;
}

