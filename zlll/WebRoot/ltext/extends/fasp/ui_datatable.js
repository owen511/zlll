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
if(Ext.fasp.ui==null) Ext.fasp.ui={}
var COL_HEAD_NONE = 0;
var COL_HEAD_EDGE = 1;
var COL_HEAD_OVER = 2;
var COL_HEAD_SIZE = 3;
var COL_HEAD_DOWN = 4;
var COL_HEAD_MOVE = 5;
var COL_HEAD_NODA = 6;
Ext.fasp.ui.datatable=Ext.lt.createComponent(function(config){
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
			rs.setData(config.data);
			config.data=rs;
			_draw(config);
			return ;
		}
		config.rs.clear();
		config.rs.setData(config.data);
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
				config.drawobj.parentNode.attachEvent('onpropertychange',function(){_draw(config)});
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
		config.rs.setDataSort(true);
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
	showdiv();
	$.ajax({
		type: "POST",
		url: url,
		data:data, 
		dataType: "json",
		success : function(retobj){
			if(retobj!=null&&retobj["statuCode"]!=null && retobj.statuCode==100 && retobj.warnmsg !=null && retobj.warnmsg!=""){
				alert(retobj.warnmsg);
				failBackFunc();
			}else if(retobj!=null&&retobj.length==1){
				editObj = retobj[0];
				edit=tmain.getSelectedRow()[0];
				for(e in editObj){
					edit[e]=editObj[e];
				}
				tmain.isEdit=false;
				tmain.reflash();
			}
			closeCurpop(openeditdiv);
			tmain.isEdit=false;
		},
		complete: function(){
			 enabledFunctionButton();
			 closediv();
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
	//if(l==size-1)debugger;
	//�ҵ����鲻�ϲ���λ��
	for(;li<=size;li++){
		var nrs=tdobj.config.rs.getData(li);
		if(nrs==null||v!=nrs[tdobj.id])break;
	}
	var alli=li-fi;
	if(alli%2!=0)alli+=1;
	if(l==(fi+alli/2)-1){tdobj.innerHTML = _id2name(l,v,rs,tdobj,dt);return;}
}