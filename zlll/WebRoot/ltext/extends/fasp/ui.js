// ��������ռ�
if(Ext.fasp==null) Ext.fasp={ui:{}}
if(Ext.fasp.ui==null) Ext.fasp.ui={}



/*
��ѯ���������ȡ�ڲ����ݵķ���
 */
Ext.fasp.ui._cache={};
Ext.fasp.ui.elementcodeloader=function(linkname,colid){
	var r=Ext.fasp.ui._cache[linkname+colid];
	if(r == null){
		r=Ext.lt.RCP.asynserver('ui.QueryFromService','getColumnSrcElementcode',[linkname,colid]);
		Ext.fasp.ui._cache[linkname+colid]=r;
	}
	return r;
}




/**
	Ext.fasp.ui.datatable
		����:
			version:"3.0"
			objecttype:"datatable3.0"
			rs: object���ݼ�
			table : object ������
			data : array ���ݼ�����
		����:
			show()		���»���
			draw(obj)	����
			resize(w,h)	�ض����С
			resetscroll	��ʵ�֡��ýӿ�ֻ�Ǳ�֤������
			setMouselight(color) ����ɫ
			setClassName(className)	����datatable��ʽ
			onEvent(e,f)	����¼�
			getSelectedRow()	��ȡѡ�������ݡ�
			appendRow(data)		�������
			removeSelected() ɾ��ѡ����
			reflash()		ˢ��
			checkAll()	��ѡ��ȫѡ
			privateColumnConfig()
			createPagination() ������ҳ
*/
// ��������ռ�
var COL_HEAD_NONE = 0;
var COL_HEAD_EDGE = 1;
var COL_HEAD_OVER = 2;
var COL_HEAD_SIZE = 3;
var COL_HEAD_DOWN = 4;
var COL_HEAD_MOVE = 5;
var COL_HEAD_NODA = 6;

Ext.fasp.ui.datatable=Ext.lt.createComponent(function(cfg){
	var config=cfg;
	if(config==null)config={};
	if(config.type=='recordset')config={data:config};
	config.objecttype = "datatable3.0";
	config.version='3.0';
	
	config.setTableHead=function(arr){
		this.tableHead=arr;
	}
	//���»��Ʒ���
	config.show=function(){
		//�޸�״̬���û���
		if(config.isEdit)return;
		//δ������ֱ�ӻ��Ƴ�����
		if(!config.drawed){
			rs=new Ext.lt.recordset();
			rs.setData(config.data.toArray());
			config.data=rs;
			_draw(config);
			return ;
		}
		config.rs.clear();
		config.rs.setData(config.data.toArray());
		config.table.reflash();
	}
	function init(){
		if(config.event==null)config.event=[];
		config.mouselight="#e8f4ff";
		config.className="dttheme_fasp";
		config.selectlinestyle="#CBDAF2";
		config.headsort=true;
		config.allowClock=false;
		config.isEdit=false;
		config.mousedrag=false;
	}
	function setDataTable(t,config){
		/*
		ȥ�������������
		*/
		t.setAllowClock(config.allowClock);
		t.headsort(config.headsort);
		t.setMouselight(config.mouselight);
		t.mousedrag(config.mousedrag);
		//����¼�
		for(e in config.event){
			t.onEvent(e,config.event[e]);
		}
		//���������¼�
		if(config.onclick){
			config.onclick=eval(config.onclick);
			t.onEvent('onclick',function(dt,el,l,c,rs){
				config.onclick(rs);
				if(config.showselect){
					onclick2select(dt,l);
				}
			})
		}else{
			//���ѡ���б�ɫ�¼�
			if(config.showselect){
				t.onEvent('onclick',function(dt,el,l,c,rs){
					onclick2select(dt,l);
				})
			}
		}
		//������
		t.setClassName(config.className);
		t.setSelectClassName(config.selectlinestyle);
	}
	//�е����ɫ
	function onclick2select(t,l){
		if(t.oselect!=null)
			_drawSelectLineBgcolor(document.getElementById(t.id+'_l'+t.oselect+'_d'),"");
		_drawSelectLineBgcolor(document.getElementById(t.id+'_l'+l+'_d'),config.selectlinestyle)
		t.oselect=l;
	}
	//ָ���б�ɫ����
	function _drawSelectLineBgcolor(l,color){
		if(l==null)return;
		var cs = l.children;
		for(var i=0,l=cs.length;i<l;i++){
			cs.item(i).style.backgroundColor=color;
		}
	}
	//��ʼ����Ϣ
	init();
	
	function _draw(config){
		//����޷�������ʾ������¼�onreadystatechange
		if(config.drawed){return;}
			//˽�л����Զ�����
		if(config.ColumnConfig==null){
			config.ColumnConfig=Ext.lt.clone(ColumnConfig);
		}
		//�ж�����Ƿ�չʾ
		if(config.drawobj.parentNode.scrollHeight<=1||config.drawobj.parentNode.scrollWidth<=0){
			if(!config.opc){
				config.opc=true;
				// ��ֹ����ڲ��ֵ����Ĺ����п�ʼ���ɱ��
				var layoutflag=true;
				config.drawobj.parentNode.attachEvent('onpropertychange',function(en){
					if(layoutflag) return ;
					_draw(config)
				});
				Ext.lt.message.hook("layout","endlayout",function(){layoutflag=false});
			}
			return;
		}
		config.drawobj.style.height=config.drawobj.parentNode.scrollHeight-1;
		config.drawobj.style.width=config.drawobj.parentNode.scrollWidth;
		config.rs= new Ext.lt.recordset();
		
		if(config.data!=null&&config.data.size()>0){
			config.rs=config.data;
		}else{
			//config.rs.setData({"":""});
		}
		config.data=config.rs.toArray();
		// config.rs.setDataSort(true);
		config.table = new Ext.lt.datatable(config.rs);
		//������
		var sw=parseInt(config.drawobj.style.width)-40;
		var t=config.table;
		//��ʼ�������Ϣ
		setDataTable(t,config);
		//�����
		var col=[t.columns.seq];
		sw-=22;
		//��ѡ��
		if(config.showradio){
			t.columns.radio.setColumnName('checked');
			col.push(t.columns.radio);
			sw-=22;
		}
		//��ѡ��
		if(config.showcheckbox){
			t.columns.checkbox.setColumnName('checked');
			config.checkBox=t.columns.checkbox;
			col.push(t.columns.checkbox);
			sw-=22;
		}
		var columns=[];
		//������ʾ����
		for(var i=0;i<config.column.length;i++){
			if(config.column[i].visible!=false){
				columns.push(config.column[i]);
			}
		}
		//�����п�
		sw=Math.floor(sw/columns.length)-5;
		for(var i=0;i<columns.length;i++){
			//�����п�
			setColWidth(config.rs,columns[i],sw);
			col.push(columns[i]);
			if(config.ColumnConfig[columns[i].name]!=null){
				var _colcfg=config.ColumnConfig[columns[i].name];
				columns[i].alias=_colcfg.title;
				if(!isNaN(_colcfg.width)) columns[i].width=_colcfg.width;
				columns[i].datatype=_colcfg.type;
				columns[i].show=_colcfg.show;
				columns[i].style=_colcfg.style;
				columns[i].rowspan=_colcfg.rowspan;
			}
			if(columns[i].style==null)columns[i].style="";
				//.TC ������� . TL���� .TR����
			if(columns[i].align==0){
				columns[i].style+='text-align:center';
			}else if(columns[i].align==1){
				columns[i].style+='text-align:left';
			}else if(columns[i].align==2){
				columns[i].style+='text-align:right';
			}
		//	columns[i].style+='text-align:left';
			if(columns[i].datatype=='S')
				columns[i].format=null;
			//�����show����
			if(columns[i].show!=null){
				columns[i].fn=function(l,c,rs,v){
					var o={id:this.name,version:"3.0",config:config};
					this.show(l,v,rs,o,config.table);
					return o.innerHTML;
				}
			}else{
				//��Ҫ����showElement����
				if(columns[i].source==1){
					columns[i].fn=function(l,c,rs,v){
						var o={id:this.name,version:"3.0",config:config};
						o.show=showElement;
						o.show(l,v,rs,o,config.table);
						return o.innerHTML;
					}
				}
			}
			columns[i].config=config;
		}
		t.setCols(col);
		t.setKeysearch(true);
		t.draw(config.drawobj);
		config.drawed=true;
		
		//���� ������Ϣ ���ָĶ��ı��С
		Ext.lt.message.hook("layout","endlayout",function(){config.resize();})
		//��ҳ�ж�
		if(config.page!=null){
			if(config.paginationId!=null){
				config.createPagination(config.paginationId);
			}else if(config.id=='tmain'){
				config.createPagination();
			}
		}
		if(config.id=='tmain'){
			var tmain_config=config;
			//������ҳ��ѯ���
			Ext.lt.message.hook('queryform','doquery',function(resp){
				var js=resp.response;
				var tmain={};
				tmain.createPagination=function(){
					if(tmain_config.page==null)return;
					tmain_config.page.currpage=this.page_page;
					tmain_config.page.rows=this.page_pageSize;
					tmain_config.page.totalpages=this.page_pageCount;
					tmain_config.page.totalrows=this.page_totalRecord;
					tmain_config.createPagination();
				}
				tmain.show=function(){
					tmain_config.data=this.data;
					tmain_config.show();
				}
				eval(js);
			});
		}
		//������Ϣ����table���
		Ext.lt.message.send("uidatatable","drawed",config)
	}
	function setColWidth(rs,col,sw){
		//�����п���ʹ���Ѿ����õ�
		if(col.width!=null){
			col.minwidth==null?col.width:col.minwidth;
			return;
		}
		//�����ͷ�ַ�����������С�п�
		var mw=col.alias.length*12+50;
		var w=0;
		if(rs.getMaxColDataLength()!=null){
			//�������͹̶���С90px
			if(col.datatype=='D'){
				mw=mw>90?mw:90;
				col.minwidth=mw;
				col.width=mw;
				return;
			}
			col.minwidth=mw>50?mw:50;
			var cols=rs.getColNames();
			var mls=0;
			//���������colname_name����colname���������ʾʱ���п�colname_name��
			if(cols[col.name+"_name"]!=null){
				mls=rs.getMaxColDataLength()[cols[col.name+"_name"]];
			}else{
				mls=rs.getMaxColDataLength()[cols[col.name]];
			}
			if(col.codeShow&&cols[col.name+"_code"]!=null){
				mls=mls+1+rs.getMaxColDataLength()[cols[col.name+"_code"]];
			}
			w=(mls+5)*6;
		}else{
			w=sw;
		}
		if(isNaN(w)) w=col.minwidth;
		if(w<col.minwidth){
			w=col.minwidth;
		}
		if(w>=200){
			w=200;
		}
		col.width=w;
	}
	config.draw=function(obj){
		//������޸�״̬���ػ�
		if(config.isEdit)return;
		if(config.drawobj!=null){
			config.show();
			return;
		}
		if(obj!=null){
			config.drawobj=obj;
		}
		if(config.drawobj==null)return;
		setTimeout(function(){
			_draw(config);
		},1);
	}
	config.draw2Onload=function(obj){
		//������޸�״̬���ػ�
		if(config.isEdit||obj==null)return;
		if(config.drawobj!=null){
			config.show();
			return;
		}
		config.drawobj=obj;
		if(document.body.onloaded){
			window.attachEvent('onload',function(){
				_draw(config);
				document.body.onloaded=false;
		  });
		}else{
			_draw(config);
		}
	}
	config.resize=function(w,h){
		if(this.table==null) return;
			if(h==null){
				var oh=0;
				if(!isNaN(parseInt(this.drawobj.parentNode.currentStyle.paddingTop)))
				oh+=parseInt(this.drawobj.parentNode.currentStyle.paddingTop);
				if(!isNaN(parseInt(this.drawobj.parentNode.currentStyle.paddingBottom)))
				oh+=parseInt(this.drawobj.parentNode.currentStyle.paddingBottom);
				if(!isNaN(parseInt(this.drawobj.parentNode.currentStyle.borderBottomWidth)))
				oh+=parseInt(this.drawobj.parentNode.currentStyle.borderBottomWidth);
				if(!isNaN(parseInt(this.drawobj.parentNode.currentStyle.borderTopWidth)))
				oh+=parseInt(this.drawobj.parentNode.currentStyle.borderTopWidth);
				h=this.drawobj.parentNode.offsetHeight-1-oh;
			}
			if(w==null){
				var oh=0;
				if(!isNaN(parseInt(this.drawobj.parentNode.currentStyle.borderLeftWidth)))
				oh+=parseInt(this.drawobj.parentNode.currentStyle.borderLeftWidth);
				if(!isNaN(parseInt(this.drawobj.parentNode.currentStyle.borderRightWidth)))
				oh+=parseInt(this.drawobj.parentNode.currentStyle.borderRightWidth);
				if(!isNaN(parseInt(this.drawobj.parentNode.currentStyle.paddingLeft)))
				oh+=parseInt(this.drawobj.parentNode.currentStyle.paddingLeft);
				if(!isNaN(parseInt(this.drawobj.parentNode.currentStyle.paddingRight)))
				oh+=parseInt(this.drawobj.parentNode.currentStyle.paddingRight);
				w=this.drawobj.parentNode.offsetWidth-1-oh;
			}
			if(h<=0||w<=0){return;}
			this.drawobj.style.height=h;
			this.drawobj.style.width=w;
			this.table.resize(w,h);
			this.table.setZoom(1);
	}
	//��ʵ�֡��ýӿ�ֻ�Ǳ�֤������
	config.resetscroll=function(){}
	config.setMouselight=function(color){
		config.mouselight=color;
	}
	config.setCols=function(cols){
		config.column=cols;
	}
	config.setClassName=function(className){
		config.className=className;
	}
	config.headsort=function(b){
		config.headsort=b;
	}
	config.setAllowClock=function(b){
		config.allowClock=b;
	}
	config.onEvent=function(e,f){
		if(config.table!=null){
			config.table.onEvent(e,f);
		}
		config.event[e]=f;
	}
	//��ȡѡ�������ݡ�
	config.getSelectedRow=function(){
		 var ret=config.rs.query({checked:1});
		 if(ret.length==0){
		 	ret=config.rs.query({checked:true});
		 }
		 var l=ret.length;
		 var billidcodes=[];
		 var billids=[];
		 var bounds=[];
		 ret.length=l;
		 for(var i=0;i<l;i++){
		 	if(ret[i]['billidcode']!=null){
		 		billidcodes.push(ret[i]['billidcode']);
		 	}
		 	if(ret[i]['billid']!=null){
		 		billids.push(ret[i]['billid']);
		 	}
		 	if(ret[i]['_locationposition']!=null){
		 		bounds.push(ret[i]['_locationposition']);
		 	}
		 }
		 ret.billidcodes=billidcodes.join();
		 ret.billids=billids.join();
		 ret.bounds=bounds.join();
		 return ret;
	}
	//�������
	config.appendRow=function(data){
		if(data.check||data.checked){data.checked=1}
		config.rs.addData(data);
		config.data=config.rs.toArray();
		config.show();
	}
	config.removeSelected=function(){
		config.rs.remove(config.getSelectedRow());
		config.data=config.rs.toArray();
	}
	
	config.reflash=function(){
		if(config.table!=null)
		config.table.reflash();
	}
	config.sort=function(col,sort){
		if(config.rs==null||config.rs.size()<2)return;
		if(sort==null)sort=true;
		config.rs.sort(col,true);
		this.reflash();
	}
	config.checkAll=function(){
		if(config.checkBox==null)return;
		var o=document.getElementById(config.table.id+'_h_'+config.checkBox.colindex);
		o.firstChild.checked=!o.firstChild.checked;
		config.checkBox.onheadclick(config.table,o,config.checkBox.colindex,config.rs);
	}
	config.privateColumnConfig=function(){
	
	}
	config.createPagination=function(obj){
		var p=Ext.fasp.ui.pagination(this.page,this.rs);
		p.draw(obj);
		config.page=p;
	}
	config.showSearchWindow=function(){
		config.table.showSearchwindow();
	}
	config.selectRow=function(filter){
		var rs = config.rs;
		var sdata = rs.query(filter);
		if(sdata.lengt==0) return;
		var d=sdata[0]
		d['checked']=true;
		var l=d['_locationposition'];
		config.table.reflash()
		config.table.goto(l);
	}
	return config;
});
function isDatatable3(obj){
	if(obj==null)return false;
	return "3.0"==obj.version;
}
//��дshowElement����
var _showElement_bak=showElement;
var showElement =function (rownum,value,row,tdobj,datatable){
	if(isDatatable3(tdobj)){
		var code=row[this.id+"_code"];
		var name=row[this.id+"_name"];
		if(code != null && name!= null){
			if(this.codeShow){
				tdobj.innerHTML =code+"-"+name;
			} else {
				tdobj.innerHTML = name;
			}
		}else if(name!=null&&name!="")return tdobj.innerHTML=name
	}
	else{
		this._showElement=_showElement_bak;
		this._showElement(rownum,value,row,tdobj,datatable);
	}
}
//��дaddEditObj����
/**
 * �����µı༭����
 * 
 * @return  
 */
var _addEditObj_bak=addEditObj;
var addEditObj =function (){
	if(!isDatatable3(tmain)){
		_addEditObj_bak();
		return;
	}
	
	if(!checkNull()) return;
	clearFormInput(editform);
	enableEditFormInput();
	var editrow = new Object();
    setDefaultValue(editrow);	  
	datasynchtoObj(editrow);
	//���ԭ���ݵ�ѡ��״̬
	var selectrows = tmain.getSelectedRow();
	for(var i=0;i<selectrows.length;i++){
		selectrows[i].checked=false;
	}
	editrow.checked = 1;
	tmain.appendRow(editrow);
	tmain.isEdit = true;
	editObj = editrow;
}
//��дshowElement����
	// ����������ϸ��Ϣ���浽��̨���������б�ҳ
var _doSave_bak=save;
var save=function(url,data,editdiv){
	if(!isDatatable3(tmain)){
		_doSave_bak(url,data,editdiv);
		return;
	}
	var openeditdiv = editdiv;
	var successdel=true;
	showdiv();
	$.ajax({
		type: "POST",
		url: url,
		data:data, 
		dataType: "json",
		success : function(retobj){
			if(retobj!=null&&retobj["statuCode"]!=null && retobj.statuCode==100 && retobj.warnmsg !=null && retobj.warnmsg!=""){
				alert(retobj.warnmsg);
				successdel=false;
				//failBackFunc();
			}else if(retobj!=null&&retobj.length==1){
				editObj = retobj[0];
				edit=tmain.getSelectedRow()[0];
				for(e in editObj){
					edit[e]=editObj[e];
				}
				tmain.isEdit=false;
				tmain.reflash();
			}
			if(successdel){
				closeCurpop(openeditdiv);
			}
			tmain.isEdit=false;
		},
		complete: function(){
			 enabledFunctionButton();
			 closediv(successdel);
			 tmain.isEdit=false;
		},
		 error : function(resp) {
			alert("����ʧ�ܣ�");
			failBackFunc();
			tmain.isEdit=false;
		}
	});
}
//��дshowElement����
//ȡ���༭��
var _doCance_bak=doCance;
var doCance=function(editdiv){_doCance_bak(editdiv);tmain.isEdit=false;}
//��дshowElement����
//ȡ���༭��
var _domod_bak=domod;
var domod=function(){_domod_bak();tmain.isEdit=true;}
var allrosan_arr={};
function rowspan(l,c,rs){
	if(l==0)allrosan_arr[this.name]={};
	var o=allrosan_arr[this.name];
	o[l]='bl';
	if(this.config.rs.size()==l-1)return 'bl';
	var nrs=this.config.rs.getData(l+1);
	if(nrs==null)return 'bl'
	if(rs[this.name]==nrs[this.name]){
		o[l]='bnl';
		return 'bnl';
	}
	return 'bl';
}

function _id2name(l,v,row,tdobj,dt){
	var code=row[tdobj.id+"_code"];
	var name=row[tdobj.id+"_name"];
	if(code==null && name==null) return v;
	if(code != null && name!= null){
		if(this.codeShow){
			return code+"-"+name;
		} else {
			return name;
		}
	}else if(name!=null&&name!="") return name	
}

function rowshowTop(l,v,rs,tdobj,dt){
	var o=allrosan_arr[tdobj.id];

	if(l==0){tdobj.innerHTML = _id2name(l,v,rs,tdobj,dt);return;}
	if(o[l-1]=='bl'){tdobj.innerHTML = _id2name(l,v,rs,tdobj,dt);return;}
}
var test=[];
function rowshowCenter(l,v,rs,tdobj,dt){
	var o=allrosan_arr[tdobj.id];

	//�����һ���Ƿ�ϲ�  ���ϲ���ֱ��չʾ
	if(o[l]=='bl'&&l==0){tdobj.innerHTML = _id2name(l,v,rs,tdobj,dt);return;}
	//���������Ƿ�ϲ�  ���ϲ���ֱ��չʾ
	if(o[l]=='bl'&&o[l-1]=='bl'){tdobj.innerHTML = _id2name(l,v,rs,tdobj,dt);return;}
	var fi=l+0;
	//һֱ�ҵ��ϸ����ϲ���λ�û���0��
	for(;fi>=0;fi--){
		var nrs=tdobj.config.rs.getData(fi);
		if(v!=nrs[tdobj.id])break;
	}
	fi++;
	var li=l+0;
	var size=tdobj.config.rs.size();
	//if(l==size-1)
	//�ҵ����鲻�ϲ���λ��
	for(;li<=size;li++){
		var nrs=tdobj.config.rs.getData(li);
		if(nrs==null||v!=nrs[tdobj.id])break;
	}
	var alli=li-fi;
	if(alli%2!=0)alli+=1;
	if(l==(fi+alli/2)-1){tdobj.innerHTML = _id2name(l,v,rs,tdobj,dt);return;}
}




// ��������ռ�
Ext.fasp.ui.pagination=Ext.lt.createComponent(function(_page,_rs){
	var p=Ext.lt.clone(_page);
	p.rs=_rs;
	p.allflag=1;
	function _draw(p,obj){
		if(obj==null) return;
		var html=[];
		html.push('<table cellSpacing=0 cellPadding=0 border=0 width=100%><tr><td width=100% align=right>');
		html.push('<TABLE id="paginationtbl" cellSpacing=0 cellPadding=0 border=0><TBODY><TR>');
		//�Ŵ���ʱ������
		//html.push('<TD align="center" width="50" nowrap="nowrap"><a href="#"> <img id="tmainzoomicon"src='+ROOT_PATH+'"/images/done_btn/zoomin.gif"alt="�Ŵ�" border="0" height="20" width="20" align="absmiddle" /></a></TD>');
		html.push('<TD align="center" nowrap="nowrap"><a >��ҳ</a> <a >��ҳ</a> <a >��ҳ</a> <a >ĩҳ</a>��</td>');
		html.push('<td>�� '+p.totalrows+' ��,<a style="font: black">ÿҳ</a><input id="setpage_size" title=\'����ÿҳ������\' ');
		html.push(' size="4" /><a style="font: black">��</a>,<a></a></td>');
		html.push('<td align="right"><input id="page" type="text" style="width: 30px; height: 18px; border: 1px #CCC solid; line-height: 18px; text-align: center;" size="3" /><button class="jumppage" >��ת</button></td></tr></table>');
		html.push('</td></tr></table>');		
		obj.innerHTML=html.join("");
		//obj.style.align ='right';
		_initInfo(p,obj);
	}
	function _initInfo(p,obj){
		//p.currpage ��ǰҳ��
		//p.totalpages ��ҳ��
		//p.totalrows  ������
		//p.rows ÿҳ����
		p.currpage=p.currpage<1?1:p.currpage;
		p.totalpages=p.totalpages<1?1:p.totalpages;
		p.totalrows=p.totalrows<1?1:p.totalrows;
		p.rows=p.rows<1?20:p.rows;
		
		if(p.totalrows%p.rows==0){
			p.totalpages=p.totalrows/p.rows
		}else{
			try {
				p.totalpages=floor(p.totalrows/p.rows)+1;
			} catch (e) {
			}
		}

		var as=obj.getElementsByTagName('A');
		//��ҳ
		_previousPage(p,as,obj);
		_nextPage(p,as,obj);
		as[6].innerHTML=' �� '+p.currpage+' / '+p.totalpages+' ҳ';
		var inputs=obj.getElementsByTagName('input');
		_sizePage(p,inputs[0],obj);
		_runToPage(p,inputs[1],obj)
		obj.getElementsByTagName('button')[0].onclick=function(){
			p.send(obj);
		}
	}
	function _sizePage(p,i,obj){
		i.value=p.rows;
		i.onblur=function(){
		   	var oPagesize = this.value;
			if (Ext.lt.util.checkNumber(this.value,1)) {
		        alert("������һ����Чֵ��Ϊÿҳ������");
				this.value = p.rows;
		        return false;
		    }
			p.rows = oPagesize;
			return true;
		}
		i.onkeyup=function(e){
			 if (event.keyCode == 13) {
			 	if(this.onblur())p.send(obj);
			 }
		}
	}
	function _runToPage(p,i,obj){
		i.value=p.currpage;
		i.onblur=function(){
			if (Ext.lt.util.checkNumber(this.value,1,p.totalpages)!=0) {
		        alert("������һ����Чֵ��ΪҪ��ת��ҳ����");
				this.value = p.currpage;
		        return false;
		    }
		    p.currpage = this.value;
		    return true;
		}
		i.onkeyup=function(e){
			 if (event.keyCode == 13) {
			 	if(this.onblur())p.send(obj);
			 }
		}
	}
	function _previousPage(p,as,obj){
		if(p.currpage != 1 ? (p.totalpages > 1) : false){
			as[0].href='#';
			as[1].href='#';
			as[0].onclick=function(){
				p.currpage=1;
				p.send(obj);
			};
			as[1].onclick=function(){
				p.currpage=p.currpage-1;
				p.send(obj);
			};
		}
		
	}
	function _nextPage(p,as,obj){
		if( p.currpage <p.totalpages){
			as[3].href='#';
			as[2].href='#';
			as[3].onclick=function(){
				p.currpage=p.totalpages;
				p.send(obj);
			};
			as[2].onclick=function(){
				p.currpage=p.currpage+1;
				p.send(obj);
			};
		}
	}
	function _toPage(p,obj){
		if($("#queryform")[0].dosubmit!=null){
			oldtopage(p,obj);
		}
		Ext.lt.message.send('querybtn','submit',p);
	}
	function oldtopage(p,obj){
		if(document.getElementById("advancedQueryForm")!=null&&document.getElementById("advancedQueryForm").advancedQuery!=null&&document.getElementById("advancedQueryForm").advancedQuery.value=="advancedQuery"){
			var formObj = document.getElementById("advancedQueryForm");
			formObj.ad_allflag.value = 0;
			formObj.ad_currpage.value = p.currpage;
			formObj.ad_rows.value = p.rows;
			formObj.ad_totalpages.value = p.totalpages;
			formObj.ad_totalrows.value = p.totalrows;
			//���Լ���ҳ�����ر���
			try{
		        doprivateQuery(formObj);
			}catch(e){
				//���ɹ�,������,��û��ʵ�ָ÷���
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
	      		var formObj = document.getElementById("queryform");
			formObj.allflag.value = 0;
			formObj.currpage.value = p.currpage;
			formObj.rows.value =p.rows;
			formObj.totalpages.value = p.totalpages;
			formObj.totalrows.value = p.totalrows;;
			//���Լ���ҳ�����ر���
			try{
		        doprivateSimQuery(formObj);
			}catch(e){
				//���ɹ�,������,��û��ʵ�ָ÷���
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
	       	formObj.dosubmit(p,obj);
	       	return;
	    }
	}
	p.send=function(obj){
		_toPage(this,obj);
	}
	p.draw=function(obj){
		if(obj==null){
			obj=document.getElementById("paginationdiv");
		}
		if(typeof(obj)=='string'){
			obj=document.getElementById(obj);
		}
		_draw(this,obj);
	}
	p.resize=function(){}
	return p;
})










/**
��ѯȥ��ǩ������һ�廯ϵͳ���б�ǩʹ��editpanelʵ�֡��������Ҫע�� ui.QueryFromService ����


��ʼ��������
	formid��form��ǩID������ԭqueryform��ǩ�����ԣ�û��ʵ����;
	linkname������ҳ����
	defaultvalues����ѯ��ȱʡ��ѯ����
	columns����ѯ�������ã��ο�ifmis_t_uiqueryform���ֶ�����
	queryformconfig��ҳ���ѡ��ѯ�������ã���ҳ���Ӧ��������Դ��ı�ṹ��Ϣ�����ڲ�����ѯ�����ý��档�ò������Բ���

������
	draw(formelement) �����ύ��Ϣ��form��ǩ����
	show() ��ʾ��ѯ��
	hide() ���ز�ѯ��
	redraw() ���»��Ʋ�ѯ������ͨ�����ô��ڸı�ʱ��ѯ������ʱ����ѯ�����Զ��ػ�
	saveconfig() �����ѯ������
	showconfig() ������ѯ�����ý���
	
	
������Ϣ������Ϣ��Դqueryform��
	doquery��{'response':respText}  ������˷��ز�ѯ����󣬲�ѯ��ǩ��У��ҳ��ʹ�õ�datatable����汾�������uidatatable�������ҳ�淢��doquery��Ϣ����������˷���ֵ��Ϊ��Ϣ���ݷ��ͳ�ȥ

������Ϣ��
	��Ϣ��Դ��hidshowQuerybtn
	show����ʾ��ѯ��
	hidden�����ز�ѯ��

�÷���
ҳ�����ñ�ǩ��
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>


��Ҫ���ã�
<link rel="stylesheet" type="text/css" href="http://localhost:7001/fasp/ltext/datatable3.0.css" />
<link rel="stylesheet" type="text/css" href="http://localhost:7001/fasp/style/faspcmp.css" />
<script language="JavaScript" src="http://localhost:7001/fasp/ltext/frameworksupport.js" type="text/javascript"></script>
<script language="JavaScript" src="http://localhost:7001/fasp/ltext/ltext_core.js" type="text/javascript"></script>
<script language="JavaScript" src="http://localhost:7001/fasp/ltext/datatable3.0.js" type="text/javascript"></script>
<script language="JavaScript" src="http://localhost:7001/fasp/ltext/extends/fasp/ui.js" type="text/javascript"></script>
<script language="JavaScript" src="http://localhost:7001/fasp/ltext/extends/fasp/ui_queryform.js" type="text/javascript"></script>


��ǩ��ʽʹ�ã�
<ui:uiqueryform formid="queryform" />


js��ʽʹ�ã�
var queryform=new Ext.fasp.ui.queryform({
"queryformconfig":new Ext.lt.recordset({ver:"1.2",columns:["COLUMNCODE","COLID","NAME","DATATYPE","SOURCEELEMENT","ORDERNUM","ISVISIBLE","TYPE","check"],datas:[["code","code","�û�����","S",,1,1,"t",1],["name","name","�û�����","S",,2,1,"t",1],["organid","organid","����ID","N","AGENCY",3,1,"inputtips",1],["createdate","createdate","��������","D",,4,1,"di",1],["managerid",,"������ID","N",,,,,0],["onlinenum",,"��������","N",,,,,0],["organ",,"����","S",,,,,0],["organtype",,"��������","N",,,,,0],["overduedate",,"��������","D",,,,,0],["password",,"����","S",,,,,0],["remark",,"��ע","S",,,,,0],["state",,"״̬","N","STATUS",,,,0],["type",,"�û�����","N",,,,,0],["updatedate",,"��������","D",,,,,0],["userclsid",,"���ID","N",,,,,0],["userid",,"�û�ID","N",,,,,0]],seqdatamap:{},ml:[11,10,8,1,6,1,1,9,1]}),
"columns":new Ext.lt.recordset({ver:"1.2",columns:["LINKNAME","COLID","COLNAME","ORDERNUM","ISVISIBLE","TYPE","FUNCTION","DEFAULTVAL","ISREQUIRED","SHOWLEVELCONFIG","ELEMENTFILTER","INPUTRULE","FILTERFIELD","JSFUNCTION","BELONGTYPE","VOUCHTYPECODE"],datas:[["$0","code","�û�����",1,1,"input",,,,,,,,,,"$1"],["$0","name","�û�����",2,1,"input",,,,,,,,,,"$1"],["$0","organid","����ID",3,1,"select",,,,,,,,,,"$1"],["$0","createdate","��������",4,1,"dateregion",,,,,,,,,,"$1"]],seqdatamap:{$0:"/fasp/ca/agencyuser/*",$1:"10000604"},ml:[21,10,8,1,1,10,0,0,0,0,0,0,0,0,0,8]}),
"defaultvalues":{"code":"asdfas"},
"linkname":"/fasp/ca/agencyuser/*",
"formid":"queryform"});
queryform.draw(document.getElementById('queryform'));



 */
Ext.fasp.ui.queryform=Ext.lt.createComponent(function(config){
	// ��ѯ�����
	var _formobj=typeof(config.formid)=='string'?document.getElementById(config.formid):config.formid;
	var _columns=config.columns.toArray();
	var _defaultvalues=config.defaultvalues;
	var _linkname=config.linkname;
	// �༭������
	var _querypanel;
	var _queryeare;
	var _btn_config,_btn_savedefaultvalue;
	var _config_window=null;
	var _config_table=null;
	var _config_data=config.queryformconfig;
	    _config_data.each(function(rs){_config_data[rs['COLUMNCODE']]=rs})
	var _element=null;
	var _columnsize=config.columnsize==null?0:config.columnsize;


		
	// һ�廯ϵͳ��ѯ���ύ����
	var dosubmit = function(page){
		var obj=_querypanel.getData(),m;
		var postobj=Ext.lt.clone(obj);
		// �������ڲ�ѯ����
		for(var i=0,l=_columns.length;i<l;i++){
			m=_columns[i];
			if(m['TYPE']!='date' && m['TYPE']!='dateregion') continue;
			// �������ֶν��ж�ת��Ϊ������
			var colid=_columns[i].COLID;
			
		}
		
		try{addQueryFormInput();}catch(err){}; //ע�ֳ�����ֻҪ��ʾ�������Ϊ��,��Ҫ��ѯ������.
		if(typeof clearValueofIsDataSouce == "function")clearValueofIsDataSouce();

		// ִ��ҳ��У�鷽��
		try{
			if(!queryCheckIdata()) return false;
		}catch(err){}
		
		if(page!=null){
			postobj.currpage=page.currpage;
			postobj.rows=page.rows;
			postobj.totalpages=page.totalpages;
			postobj.totalrows=page.totalrows;
		}
		// ��ȡ��ҳ����
		postobj.allflag=document.getElementById("page")!=null?1:null;
		postobj.rows=document.getElementById("setpage_size")!=null?document.getElementById("setpage_size").value:null;
		postobj.fromquery='yes'
			var ajax=new Ajax.Request("?method=pageAction&t="+new Date(), {
				parameters:postobj,
				method:"post", 
				requestHeaders:{Accept:"application/json","If-Modified-Since":"0"},
				onComplete:function (resp) {
					// �����ж��Ƿ�ʹ���±�ǩ
					var tablever=null;
					var respText = resp.responseText;
					try{eval('tablever=tmain.version')}catch(e){}
					if(tablever==null){
						eval(respText);
					}
					else{
						Ext.lt.message.send('queryform','doquery',{'response':respText});
					}
					
					// �����ϸ�б�
					if(tdetail){
						tdetail.data = [];
						tdetail.rs.clear();
						tdetail.show();
					}
				},
				onFailure:function (resp) {
					alert('����ʧ��');
				}
			});
	}

	// ���ؿɲ����Ŀؼ�����
	var _cmp={}
	
	_buildElement=function(formElement){
		var queryformdivid="queryformdiv"+Ext.lt.getNextSeqValue();
		//document.write('<div style="display:none;" id='+queryformdivid+'></div>');
		//_element=document.getElementById(queryformdivid);
		
		
		_element=document.createElement('DIV');
		_element.id=queryformdivid
		_element.style.cssText='display:none;';
		formElement.appendChild(_element);
	}
	
	_cmp.draw=function(element){
		
			var formdiv=document.createElement('DIV')
			formdiv.style.cssText='width:100%;position:relative;z-index:10';
			element.insertAdjacentElement('beforeBegin',formdiv);
			//formdiv.appendChild(element);
		
			_buildElement(element);
			_cmp.init();
			_cmp.hide();
		
		Ext.lt.onload(function(){
			formdiv.appendChild(element);
		})
		// ���form��ǩ���ּ���ʱ�߶Ȳ�׼�����⣬�������ҳ��ṹ����form��ǩ��div�滻
	}
	
	_cmp.init=function(){
		var queryformid="queryform"+Ext.lt.getNextSeqValue();
		var html=['<ul id=',queryformid,' columnsize="',_columnsize,'" layout="{w:{fit:true}}">'],m,loader='',clearbtn='';
		for(var i=0,l=_columns.length;i<l;i++){
			m=_columns[i];
			if(m['TYPE']=='select'){
				loader='dataloader="Ext.fasp.ui.elementcodeloader(\''+_linkname+'\',\''+m['COLID']+'\')"';
			}
			else{
				loader='';
			}
			m['TYPE']=='input'?clearbtn='':clearbtn='clearbtn="true"';
			html.push('<li name="',m['COLID'],'" label="',m['COLNAME'],'" type="',m['TYPE'],'" isvisible="',m['ISVISIBLE'],'" ',clearbtn,' ',loader,'></li>');
		}
		html.push('</ul>');
		//remove ���ò�ѯ����
		html.push('<div style="height:20px; position:relative; float:right; vertical-align:top; display:none"><button title="���ò�ѯ����" class="uibtn uibtn_save" overclass="uibtn uibtn_save_over" clickclass="uibtn uibtn_save_click" align="absmiddle"></button><button title="����ΪĬ������" align="absmiddle" class="uibtn uibtn_config" overclass="uibtn uibtn_config_over" clickclass="uibtn uibtn_config_click"></button></div>');
		// document.write(html.join(''));
		_element.innerHTML=html.join('')
		
		// ������ѯ��
		_querypanel=Ext.lt.editpanel.initFormPanel(_element.firstChild);
	  _querypanel.className+=" queryform";
		_queryeare=_element;
		_btn_config=_queryeare.lastChild.firstChild;
		_btn_savedefaultvalue=_queryeare.lastChild.lastChild;
	  
	  // ��Ĭ��ֵ
	  _querypanel.bind(_defaultvalues);
	  Ext.lt.HTML.expand(_element);
	  
	  // ������ʾ�����ز�ѯ����Ϣ
	  Ext.lt.message.hook('hidshowQuerybtn','show',_cmp.show);
	  Ext.lt.message.hook('hidshowQuerybtn','hidden',_cmp.hide);
	  Ext.lt.message.hook('clearbtn','click',_cmp.clear);
		
		// ������ѯ��ť��Ϣ
	  Ext.lt.message.hook('querybtn','submit',dosubmit);
	  
	  //
	  _btn_savedefaultvalue.onclick=function(){_cmp.saveconfig()};
	  _btn_config.onclick=function(){_cmp.showconfig()};
	  
	  setTimeout(function(){
		  for(var i in _defaultvalues){
		  	if(_defaultvalues[i]!=null){
		  		var btn=$('button.show_btn');
		  		if(btn) btn=btn[0]
		  		if(btn==null) return;
			  	btn.fireEvent('onclick');
			  	break;
			  }
		  }
		},1);
	}
	
	_cmp.show=function(){
		_queryeare.style.display='block';
		_formobj.style.display='block';
		Ext.lt.layout.doLayout();
	}
	_cmp.hide=function(){
		_queryeare.style.display='none'
		_formobj.style.display='none';
	}
	_cmp.redraw=function(){
	  // ������ʾ�����ز�ѯ����Ϣ
	  Ext.lt.message.unhook('hidshowQuerybtn','show',_cmp.show);
	  Ext.lt.message.unhook('hidshowQuerybtn','hidden',_cmp.hide);
	  Ext.lt.message.unhook('clearbtn','show',_cmp.clear);
		
		// ������ѯ��ť��Ϣ
	  Ext.lt.message.unhook('querybtn','click',dosubmit);
		_cmp.init();
	}
	
	_cmp.resize=function(){
		
	}
	
	_cmp.saveconfig=function(){
		var d=_querypanel.getData();
		var r=Ext.lt.RCP.asynserver('ui.QueryFromService','saveconfig',[_linkname,d]);
		if(r=='1'){
			alert('����ɹ�');
		}
		else{
			alert('����ʧ��\r\n'+r);
		}
		
	}
		
	_cmp.showconfig=function(){
		// �������ô���
		var r=Ext.lt.RCP.asynserver('ui.QueryFromService','getQueryFormConfig',[_linkname]);
		if(r==null) return;
		if(_config_window==null) initConfigWindow();
		if(_config_window==null){
			alert('û���ҵ�'+_linkname+'������Ϣ');
			return;
		}
		_config_window.show();
		
		if(_config_data==null){
			_config_data=r;
		}
		else{
			_config_data.clear();
			_config_data.join(r);
		}		
		
		
	}
	
	_cmp.clear=function(){
		var els=_querypanel.getElementsByTagName('INPUT');
		for(var i=0,l=els.length;i<l;i++){
			els[i].value='';
			if(els[i].onchange) els[i].onchange();
			els[i].fireEvent('onblur');
		}
		
		
	}

	// �������ô���
	function initConfigWindow(){
		
		var div=document.createElement('DIV');
		div.style.cssText='width:700px;height:450px;overflow:hidden';
		document.body.appendChild(div);
		div.innerHTML='<div style="width:700px;height:415px;overflow:hidden"></div><div style="width:700px;height:30px;overflow:hidden;margin-top:5px"><center><button>����</button>&nbsp;&nbsp;<button>ȡ��</button></center></div>';
		_config_window=new Ext.lt.window({title:'��ѯ��������',pop:true,autoshow:false,fitmode:'content'});

		_config_table=new Ext.lt.datatable(_config_data);
		_config_table.setCols([
		_config_table.columns.seq,
		_config_table.columns.checkbox,		
		{name:'NAME',alias:'����',datatype:'S',edit:true,oneditstart:function(table,el,l,c,ds){if(ds['check']==1){this._startedit(table,el,l,c,ds)}else{alert('���ȹ�ѡ����')}}},
		{name:'DATATYPE',alias:'��������',mapper:{columns:['id','name'],datas:[['N','����'],['D','����'],['S','�ı�']]},format:'#id-#name'},
		{name:'ORDERNUM',alias:'����',datatype:'I',edit:true,oneditstart:function(table,el,l,c,ds){if(ds['check']==1){this._startedit(table,el,l,c,ds)}else{alert('���ȹ�ѡ����')}}},
		{name:'TYPE',alias:'����',mapper:{columns:['id','name'],datas:[['t','�ı���'],['inputtips','��¼��������'],['d','����'],['di','��������']]},format:'#name',edit:true,oneditstart:function(table,el,l,c,ds){if(ds['check']==1){this._startedit(table,el,l,c,ds)}else{alert('���ȹ�ѡ����')}}},
		{name:'ISVISIBLE',alias:'�Ƿ�ɼ�',mapper:{columns:['id','name'],datas:[[0,'����'],[1,'�ɼ�']]},format:'#name',edit:true,oneditstart:function(table,el,l,c,ds){if(ds['check']==1){this._startedit(table,el,l,c,ds)}else{alert('���ȹ�ѡ����')}}}
		]);
		_config_table.setClassName('dttheme_fasp');
		_config_table.setAllowClock(false);
		_config_table.mousedrag(false);
		_config_table.setMouselight('#acbeda');
		_config_table.draw(div.firstChild);
		_config_window.draw(div);
		
		var _save_btn=div.lastChild.firstChild.firstChild;
		var _canel_btn=div.lastChild.lastChild.lastChild;
		_canel_btn.onclick=function(){_config_window.close();}
		
		_save_btn.onclick=function(){
			var config=_config_data.query({check:1});
			
			var r=Ext.lt.RCP.asynserver('ui.QueryFromService','saveQuerFormConfig',[_linkname,config]);
			if(r=='1'){
				_config_window.close();
				Ext.lt.RCP.server('ui.QueryFromService','getConfig',_linkname,function(config){
					_columns=config;
					_cmp.redraw();
				});
				alert('����ɹ�');
			}
			else{
				alert('�����ѯ������Ϣʱ����/r/n'+r);	
			}
			
		}
	}
	
	return _cmp;
});





/**
ƽ̨2���湤�������
  �������ɽ��湤���������������ݿ�t_uifunction������ʹ�á�������Ĭ�Ͽ���Ϊҳ����*24px���߶ȿ�ͨ��

ʵ����������
	id:String	����������id��ͨ����ǩ���ɵĹ����������ڽ��������ɵĶ�����
	linkname:String	��Ӧҳ������linkname����
	configbtn:boolean	�Ƿ���ʾ���ð�ť
	querybtn:boolean �Ƿ���ʾ����ʾ��ѯ����ť
	buttons:array+object	��ť��������
		name:string	��ť����id����ť�������ñ�־
		title:string	��ť��ʾ����
		icon:string	��ťͼ�꣬ϵͳ���� icon+'_btn'�Ĺ���Ϊ��ť�����ʽ�����ң�����icon+'_btn '+icon+'btn_over'  icon+'_btn '+icon+'_click'�Ĺ������ɰ�ť�����ʽ
		action:function	��ťִ���¼�
		isvisible:boolean	�Ƿ�ɼ���Ĭ��Ϊtrue
		disabled:boolean	��ť�Ƿ�Ϊ����״̬

�������������ԣ�
	id:string	����������id
	linkname:string	��Ӧҳ������linkname����
	configbtn:HTMLButtonElement	���ð�ť����
	querybtn:HTMLButtonElement	��ѯ��ť����
	buttons:array	����ͨ����ť���ƻ�ťλ�ò��Ұ�ť����
		��ť����ṹ
			���ԣ�
			name:string	��ť����id����ť�������ñ�־
			title:string	��ť��ʾ����
			icon:string	��ťͼ�꣬ϵͳ���� icon+'_btn'�Ĺ���Ϊ��ť�����ʽ�����ң�����icon+'_btn '+icon+'btn_over'  icon+'_btn '+icon+'_click'�Ĺ������ɰ�ť�����ʽ
			action:function	��ťִ���¼�
			disabled:boolean	��ť�Ƿ�Ϊ����״̬
			isvisible:boolean	�Ƿ�ɼ���Ĭ��Ϊtrue
			������
			setDisabled(boolean)	�����Ƿ����
			setIsvisible(boolean)	�����Ƿ�ɼ�


*/
Ext.fasp.ui.toolbar=Ext.lt.createComponent(function(cfg){
	var _config=Ext.lt.apply({linkname:'',configbtn:true,querybtn:true,buttons:[]},cfg);
	if(_config.id==null) _config.id='fasptoolbar'+Ext.lt.getNextSeqValue();
	
	var _cmp={};
	
	_cmp.draw=function(el){
		var html=['<ul class="query_t toolbar" layout="{w:{fit:true}}"><li layout="{w:{fit:\'auto\'}}">'];
		var btn,queryflag=false;
		_cmp.buttons=[];
		for(var i=0,l=_config.buttons.length;i<l;i++){
			btn=_config.buttons[i]
			if(typeof(btn)=='string') {
				html.push('<button class="query_g" style="float:left;"></button>');
			}
			else{
				if(!queryflag) queryflag=btn.title.indexOf('��ѯ')>-1;
				if(btn.name==null) btn.name='toolbarbtn'+Ext.lt.getNextSeqValue();
				if(btn.isvisible==null) btn.isvisible=true;
				html.push('<button id="',btn.name,'" title="',btn.title,'" icon="',btn.icon,'" class="',btn.icon,'_btn" overclass="',btn.icon,'_btn ',btn.icon,'_btn_over" clickclass="',btn.icon,'_btn ',btn.icon,'_btn_click" ',(btn.disabled?'disabled':''),' style="float:left;',(btn.isvisible?'':'display:none'),'" >',btn.title,'</button> ');
				_cmp.buttons[btn.name]=btn;
				_cmp.buttons.push(btn);
			}
		}
		if(cfg.configbtn) html.push('<img title="���ù��ܲ˵�" align="absMiddle" id="configFunctionButtonFunc" style="cursor: pointer;" src="/fasp/images/done_btn/setOnpage.gif" />');
		html.push('</li>');
		// ֻ�������˲�ѯ��ť���Ұ�ť�����а�������ѯ������ʱ����ʾ��ѯ��ť�Ż���ʾ
		if(_config.querybtn && queryflag){
			html.push('<li class="query_t_r"><button title="��ʾ��ѯ" id="showquery_btn" class="show_btn" onclick="hidshowQuery(this)" style="float:right">��ʾ��ѯ</button></li>');
		}
		html.push('</ul>');
		
		// ���ɹ�����
		Ext.lt.HTML.setInnerHTML(el,html.join(''));
		
		// ������á����÷���
		var btns=el.getElementsByTagName('BUTTON');
		for(var i=0,l=btns.length;i<l;i++){
			btn=btns.item(i);
			if(_cmp.buttons[btn.id]!=null){
				_cmp.buttons[btn.id].element=btn;
				_cmp.buttons[btn.id].element.onclick=_cmp.buttons[btn.id].action;
				_cmp.buttons[btn.id].setDisabled=function(flag){
					flag=flag==true;
					this.disabled=flag;
					flag?this.element.setAttribute('disabled','true'):this.element.removeAttribute('disabled');
				}
				_cmp.buttons[btn.id].setIsvisible=function(flag){
					flag=flag==true;
					this.isvisible=flag;
					this.element.style.display=flag?'':'none';
				}
			}
			else if(btn.id=='showquery_btn'){
				_cmp.querybtn=btn;
			}
		}
		var configbtn=el.getElementsByTagName('IMG');
		if(configbtn.length>0){
			configbtn.item(0).onclick=function(){configFunctionButton(_cmp.linkname,"","")}
		}
	}

	// ��������ʵ��ersize����	
	_cmp.resize=function(){
	}
	
	_cmp.setDisabled=function(btns,flag){
		flag=flag==true
		for(var i=0,j=btns.length;i<j;i++){
			_cmp.buttons[btns[i]].setDisabled(flag);
		}
	}
	
	return _cmp
});