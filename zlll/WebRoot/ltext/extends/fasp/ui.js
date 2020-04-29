// 检查命名空间
if(Ext.fasp==null) Ext.fasp={ui:{}}
if(Ext.fasp.ui==null) Ext.fasp.ui={}



/*
查询区下拉框获取内部数据的方法
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
		属性:
			version:"3.0"
			objecttype:"datatable3.0"
			rs: object数据集
			table : object 表格对象
			data : array 数据集数组
		方法:
			show()		重新绘制
			draw(obj)	绘制
			resize(w,h)	重定义大小
			resetscroll	不实现。该接口只是保证不出错
			setMouselight(color) 行颜色
			setClassName(className)	设置datatable样式
			onEvent(e,f)	添加事件
			getSelectedRow()	获取选中行数据。
			appendRow(data)		添加数据
			removeSelected() 删除选中行
			reflash()		刷新
			checkAll()	多选框全选
			privateColumnConfig()
			createPagination() 创建分页
*/
// 检查命名空间
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
	//重新绘制方法
	config.show=function(){
		//修改状态则不让绘制
		if(config.isEdit)return;
		//未绘制则直接绘制出来。
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
		去除锁定添加排序
		*/
		t.setAllowClock(config.allowClock);
		t.headsort(config.headsort);
		t.setMouselight(config.mouselight);
		t.mousedrag(config.mousedrag);
		//添加事件
		for(e in config.event){
			t.onEvent(e,config.event[e]);
		}
		//添加鼠标点击事件
		if(config.onclick){
			config.onclick=eval(config.onclick);
			t.onEvent('onclick',function(dt,el,l,c,rs){
				config.onclick(rs);
				if(config.showselect){
					onclick2select(dt,l);
				}
			})
		}else{
			//添加选中行变色事件
			if(config.showselect){
				t.onEvent('onclick',function(dt,el,l,c,rs){
					onclick2select(dt,l);
				})
			}
		}
		//设置列
		t.setClassName(config.className);
		t.setSelectClassName(config.selectlinestyle);
	}
	//行点击变色
	function onclick2select(t,l){
		if(t.oselect!=null)
			_drawSelectLineBgcolor(document.getElementById(t.id+'_l'+t.oselect+'_d'),"");
		_drawSelectLineBgcolor(document.getElementById(t.id+'_l'+l+'_d'),config.selectlinestyle)
		t.oselect=l;
	}
	//指定行变色方法
	function _drawSelectLineBgcolor(l,color){
		if(l==null)return;
		var cs = l.children;
		for(var i=0,l=cs.length;i<l;i++){
			cs.item(i).style.backgroundColor=color;
		}
	}
	//初始化信息
	init();
	
	function _draw(config){
		//如果无法正常显示则监听事件onreadystatechange
		if(config.drawed){return;}
			//私有化列自定义列
		if(config.ColumnConfig==null){
			config.ColumnConfig=Ext.lt.clone(ColumnConfig);
		}
		//判断外层是否展示
		if(config.drawobj.parentNode.scrollHeight<=1||config.drawobj.parentNode.scrollWidth<=0){
			if(!config.opc){
				config.opc=true;
				// 防止表格在布局调整的过程中开始生成表格
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
		//设置列
		var sw=parseInt(config.drawobj.style.width)-40;
		var t=config.table;
		//初始化表格信息
		setDataTable(t,config);
		//序号列
		var col=[t.columns.seq];
		sw-=22;
		//单选列
		if(config.showradio){
			t.columns.radio.setColumnName('checked');
			col.push(t.columns.radio);
			sw-=22;
		}
		//多选列
		if(config.showcheckbox){
			t.columns.checkbox.setColumnName('checked');
			config.checkBox=t.columns.checkbox;
			col.push(t.columns.checkbox);
			sw-=22;
		}
		var columns=[];
		//过滤显示的列
		for(var i=0;i<config.column.length;i++){
			if(config.column[i].visible!=false){
				columns.push(config.column[i]);
			}
		}
		//均分列宽
		sw=Math.floor(sw/columns.length)-5;
		for(var i=0;i<columns.length;i++){
			//计算列宽
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
				//.TC 字体居中 . TL居左 .TR居右
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
			//如果有show方法
			if(columns[i].show!=null){
				columns[i].fn=function(l,c,rs,v){
					var o={id:this.name,version:"3.0",config:config};
					this.show(l,v,rs,o,config.table);
					return o.innerHTML;
				}
			}else{
				//需要调用showElement方法
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
		
		//监听 布局信息 布局改动改变大小
		Ext.lt.message.hook("layout","endlayout",function(){config.resize();})
		//分页判断
		if(config.page!=null){
			if(config.paginationId!=null){
				config.createPagination(config.paginationId);
			}else if(config.id=='tmain'){
				config.createPagination();
			}
		}
		if(config.id=='tmain'){
			var tmain_config=config;
			//监听分页查询结果
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
		//发送消息绘制table完成
		Ext.lt.message.send("uidatatable","drawed",config)
	}
	function setColWidth(rs,col,sw){
		//设置列宽则使用已经设置的
		if(col.width!=null){
			col.minwidth==null?col.width:col.minwidth;
			return;
		}
		//计算表头字符个数用于最小列宽
		var mw=col.alias.length*12+50;
		var w=0;
		if(rs.getMaxColDataLength()!=null){
			//日期类型固定大小90px
			if(col.datatype=='D'){
				mw=mw>90?mw:90;
				col.minwidth=mw;
				col.width=mw;
				return;
			}
			col.minwidth=mw>50?mw:50;
			var cols=rs.getColNames();
			var mls=0;
			//列中如果有colname_name的列colname列则该列显示时用列宽colname_name的
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
		//如果是修改状态则不重绘
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
		//如果是修改状态则不重绘
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
	//不实现。该接口只是保证不出错
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
	//获取选中行数据。
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
	//添加数据
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
//重写showElement方法
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
//重写addEditObj方法
/**
 * 增加新的编辑对象。
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
	//清除原数据的选择状态
	var selectrows = tmain.getSelectedRow();
	for(var i=0;i<selectrows.length;i++){
		selectrows[i].checked=false;
	}
	editrow.checked = 1;
	tmain.appendRow(editrow);
	tmain.isEdit = true;
	editObj = editrow;
}
//重写showElement方法
	// 将主单和明细信息保存到后台，并返回列表页
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
			alert("保存失败！");
			failBackFunc();
			tmain.isEdit=false;
		}
	});
}
//重写showElement方法
//取消编辑层
var _doCance_bak=doCance;
var doCance=function(editdiv){_doCance_bak(editdiv);tmain.isEdit=false;}
//重写showElement方法
//取消编辑层
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

	//计算第一个是否合并  不合并则直接展示
	if(o[l]=='bl'&&l==0){tdobj.innerHTML = _id2name(l,v,rs,tdobj,dt);return;}
	//计算其他是否合并  不合并则直接展示
	if(o[l]=='bl'&&o[l-1]=='bl'){tdobj.innerHTML = _id2name(l,v,rs,tdobj,dt);return;}
	var fi=l+0;
	//一直找到上个不合并的位置或这0；
	for(;fi>=0;fi--){
		var nrs=tdobj.config.rs.getData(fi);
		if(v!=nrs[tdobj.id])break;
	}
	fi++;
	var li=l+0;
	var size=tdobj.config.rs.size();
	//if(l==size-1)
	//找到这组不合并的位置
	for(;li<=size;li++){
		var nrs=tdobj.config.rs.getData(li);
		if(nrs==null||v!=nrs[tdobj.id])break;
	}
	var alli=li-fi;
	if(alli%2!=0)alli+=1;
	if(l==(fi+alli/2)-1){tdobj.innerHTML = _id2name(l,v,rs,tdobj,dt);return;}
}




// 检查命名空间
Ext.fasp.ui.pagination=Ext.lt.createComponent(function(_page,_rs){
	var p=Ext.lt.clone(_page);
	p.rs=_rs;
	p.allflag=1;
	function _draw(p,obj){
		if(obj==null) return;
		var html=[];
		html.push('<table cellSpacing=0 cellPadding=0 border=0 width=100%><tr><td width=100% align=right>');
		html.push('<TABLE id="paginationtbl" cellSpacing=0 cellPadding=0 border=0><TBODY><TR>');
		//放大暂时不开启
		//html.push('<TD align="center" width="50" nowrap="nowrap"><a href="#"> <img id="tmainzoomicon"src='+ROOT_PATH+'"/images/done_btn/zoomin.gif"alt="放大" border="0" height="20" width="20" align="absmiddle" /></a></TD>');
		html.push('<TD align="center" nowrap="nowrap"><a >首页</a> <a >上页</a> <a >下页</a> <a >末页</a>，</td>');
		html.push('<td>共 '+p.totalrows+' 条,<a style="font: black">每页</a><input id="setpage_size" title=\'设置每页多少条\' ');
		html.push(' size="4" /><a style="font: black">条</a>,<a></a></td>');
		html.push('<td align="right"><input id="page" type="text" style="width: 30px; height: 18px; border: 1px #CCC solid; line-height: 18px; text-align: center;" size="3" /><button class="jumppage" >跳转</button></td></tr></table>');
		html.push('</td></tr></table>');		
		obj.innerHTML=html.join("");
		//obj.style.align ='right';
		_initInfo(p,obj);
	}
	function _initInfo(p,obj){
		//p.currpage 当前页码
		//p.totalpages 总页码
		//p.totalrows  总条数
		//p.rows 每页个数
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
		//首页
		_previousPage(p,as,obj);
		_nextPage(p,as,obj);
		as[6].innerHTML=' 第 '+p.currpage+' / '+p.totalpages+' 页';
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
		        alert("请输入一个有效值作为每页条数！");
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
		        alert("请输入一个有效值作为要跳转的页数！");
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
			//在自己的页面做特别处理
			try{
		        doprivateQuery(formObj);
			}catch(e){
				//不成功,不管它,当没有实现该方法
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
	       	query();
	       	return;        	
		} else if(document.getElementById("queryform")!=null){
	      		var formObj = document.getElementById("queryform");
			formObj.allflag.value = 0;
			formObj.currpage.value = p.currpage;
			formObj.rows.value =p.rows;
			formObj.totalpages.value = p.totalpages;
			formObj.totalrows.value = p.totalrows;;
			//在自己的页面做特别处理
			try{
		        doprivateSimQuery(formObj);
			}catch(e){
				//不成功,不管它,当没有实现该方法
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
查询去标签，兼容一体化系统现有标签使用editpanel实现。服务端需要注册 ui.QueryFromService 服务。


初始化参数：
	formid：form标签ID，兼容原queryform标签的属性，没有实际用途
	linkname：配置页面名
	defaultvalues：查询区缺省查询条件
	columns：查询区列设置，参考ifmis_t_uiqueryform表字段设置
	queryformconfig：页面可选查询条件配置，该页面对应的数据来源表的表结构信息，用于产生查询区配置界面。该参数可以不传

方法：
	draw(formelement) 用于提交信息的form标签对象
	show() 显示查询区
	hide() 隐藏查询区
	redraw() 重新绘制查询区，当通过配置窗口改变时查询区设置时，查询区会自动重绘
	saveconfig() 保存查询区配置
	showconfig() 弹出查询区配置界面
	
	
发送消息——消息来源queryform：
	doquery：{'response':respText}  当服务端返回查询结果后，查询标签会校验页面使用的datatable组件版本，如果是uidatatable组件则向页面发送doquery消息，并将服务端返回值作为消息内容发送出去

接收消息：
	消息来源：hidshowQuerybtn
	show：显示查询区
	hidden：隐藏查询区

用法：
页面引用标签库
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>


需要引用：
<link rel="stylesheet" type="text/css" href="http://localhost:7001/fasp/ltext/datatable3.0.css" />
<link rel="stylesheet" type="text/css" href="http://localhost:7001/fasp/style/faspcmp.css" />
<script language="JavaScript" src="http://localhost:7001/fasp/ltext/frameworksupport.js" type="text/javascript"></script>
<script language="JavaScript" src="http://localhost:7001/fasp/ltext/ltext_core.js" type="text/javascript"></script>
<script language="JavaScript" src="http://localhost:7001/fasp/ltext/datatable3.0.js" type="text/javascript"></script>
<script language="JavaScript" src="http://localhost:7001/fasp/ltext/extends/fasp/ui.js" type="text/javascript"></script>
<script language="JavaScript" src="http://localhost:7001/fasp/ltext/extends/fasp/ui_queryform.js" type="text/javascript"></script>


标签方式使用：
<ui:uiqueryform formid="queryform" />


js方式使用：
var queryform=new Ext.fasp.ui.queryform({
"queryformconfig":new Ext.lt.recordset({ver:"1.2",columns:["COLUMNCODE","COLID","NAME","DATATYPE","SOURCEELEMENT","ORDERNUM","ISVISIBLE","TYPE","check"],datas:[["code","code","用户编码","S",,1,1,"t",1],["name","name","用户名称","S",,2,1,"t",1],["organid","organid","机构ID","N","AGENCY",3,1,"inputtips",1],["createdate","createdate","创建日期","D",,4,1,"di",1],["managerid",,"管理者ID","N",,,,,0],["onlinenum",,"在线数量","N",,,,,0],["organ",,"部门","S",,,,,0],["organtype",,"机构类型","N",,,,,0],["overduedate",,"过期日期","D",,,,,0],["password",,"密码","S",,,,,0],["remark",,"备注","S",,,,,0],["state",,"状态","N","STATUS",,,,0],["type",,"用户类型","N",,,,,0],["updatedate",,"更新日期","D",,,,,0],["userclsid",,"类别ID","N",,,,,0],["userid",,"用户ID","N",,,,,0]],seqdatamap:{},ml:[11,10,8,1,6,1,1,9,1]}),
"columns":new Ext.lt.recordset({ver:"1.2",columns:["LINKNAME","COLID","COLNAME","ORDERNUM","ISVISIBLE","TYPE","FUNCTION","DEFAULTVAL","ISREQUIRED","SHOWLEVELCONFIG","ELEMENTFILTER","INPUTRULE","FILTERFIELD","JSFUNCTION","BELONGTYPE","VOUCHTYPECODE"],datas:[["$0","code","用户编码",1,1,"input",,,,,,,,,,"$1"],["$0","name","用户名称",2,1,"input",,,,,,,,,,"$1"],["$0","organid","机构ID",3,1,"select",,,,,,,,,,"$1"],["$0","createdate","创建日期",4,1,"dateregion",,,,,,,,,,"$1"]],seqdatamap:{$0:"/fasp/ca/agencyuser/*",$1:"10000604"},ml:[21,10,8,1,1,10,0,0,0,0,0,0,0,0,0,8]}),
"defaultvalues":{"code":"asdfas"},
"linkname":"/fasp/ca/agencyuser/*",
"formid":"queryform"});
queryform.draw(document.getElementById('queryform'));



 */
Ext.fasp.ui.queryform=Ext.lt.createComponent(function(config){
	// 查询框对象
	var _formobj=typeof(config.formid)=='string'?document.getElementById(config.formid):config.formid;
	var _columns=config.columns.toArray();
	var _defaultvalues=config.defaultvalues;
	var _linkname=config.linkname;
	// 编辑区对象
	var _querypanel;
	var _queryeare;
	var _btn_config,_btn_savedefaultvalue;
	var _config_window=null;
	var _config_table=null;
	var _config_data=config.queryformconfig;
	    _config_data.each(function(rs){_config_data[rs['COLUMNCODE']]=rs})
	var _element=null;
	var _columnsize=config.columnsize==null?0:config.columnsize;


		
	// 一体化系统查询区提交函数
	var dosubmit = function(page){
		var obj=_querypanel.getData(),m;
		var postobj=Ext.lt.clone(obj);
		// 处理日期查询条件
		for(var i=0,l=_columns.length;i<l;i++){
			m=_columns[i];
			if(m['TYPE']!='date' && m['TYPE']!='dateregion') continue;
			// 日期型字段将判断转换为日期型
			var colid=_columns[i].COLID;
			
		}
		
		try{addQueryFormInput();}catch(err){}; //注现场需求只要提示必填项不能为空,但要查询出数据.
		if(typeof clearValueofIsDataSouce == "function")clearValueofIsDataSouce();

		// 执行页面校验方法
		try{
			if(!queryCheckIdata()) return false;
		}catch(err){}
		
		if(page!=null){
			postobj.currpage=page.currpage;
			postobj.rows=page.rows;
			postobj.totalpages=page.totalpages;
			postobj.totalrows=page.totalrows;
		}
		// 获取分页设置
		postobj.allflag=document.getElementById("page")!=null?1:null;
		postobj.rows=document.getElementById("setpage_size")!=null?document.getElementById("setpage_size").value:null;
		postobj.fromquery='yes'
			var ajax=new Ajax.Request("?method=pageAction&t="+new Date(), {
				parameters:postobj,
				method:"post", 
				requestHeaders:{Accept:"application/json","If-Modified-Since":"0"},
				onComplete:function (resp) {
					// 这里判断是否使用新标签
					var tablever=null;
					var respText = resp.responseText;
					try{eval('tablever=tmain.version')}catch(e){}
					if(tablever==null){
						eval(respText);
					}
					else{
						Ext.lt.message.send('queryform','doquery',{'response':respText});
					}
					
					// 清空明细列表
					if(tdetail){
						tdetail.data = [];
						tdetail.rs.clear();
						tdetail.show();
					}
				},
				onFailure:function (resp) {
					alert('调用失败');
				}
			});
	}

	// 返回可操作的控件对象
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
		// 解决form标签布局计算时高度不准的问题，这里调整页面结构，将form标签用div替换
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
		//remove 配置查询条件
		html.push('<div style="height:20px; position:relative; float:right; vertical-align:top; display:none"><button title="配置查询条件" class="uibtn uibtn_save" overclass="uibtn uibtn_save_over" clickclass="uibtn uibtn_save_click" align="absmiddle"></button><button title="保存为默认条件" align="absmiddle" class="uibtn uibtn_config" overclass="uibtn uibtn_config_over" clickclass="uibtn uibtn_config_click"></button></div>');
		// document.write(html.join(''));
		_element.innerHTML=html.join('')
		
		// 创建查询区
		_querypanel=Ext.lt.editpanel.initFormPanel(_element.firstChild);
	  _querypanel.className+=" queryform";
		_queryeare=_element;
		_btn_config=_queryeare.lastChild.firstChild;
		_btn_savedefaultvalue=_queryeare.lastChild.lastChild;
	  
	  // 绑定默认值
	  _querypanel.bind(_defaultvalues);
	  Ext.lt.HTML.expand(_element);
	  
	  // 监听显示、隐藏查询区消息
	  Ext.lt.message.hook('hidshowQuerybtn','show',_cmp.show);
	  Ext.lt.message.hook('hidshowQuerybtn','hidden',_cmp.hide);
	  Ext.lt.message.hook('clearbtn','click',_cmp.clear);
		
		// 监听查询按钮消息
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
	  // 监听显示、隐藏查询区消息
	  Ext.lt.message.unhook('hidshowQuerybtn','show',_cmp.show);
	  Ext.lt.message.unhook('hidshowQuerybtn','hidden',_cmp.hide);
	  Ext.lt.message.unhook('clearbtn','show',_cmp.clear);
		
		// 监听查询按钮消息
	  Ext.lt.message.unhook('querybtn','click',dosubmit);
		_cmp.init();
	}
	
	_cmp.resize=function(){
		
	}
	
	_cmp.saveconfig=function(){
		var d=_querypanel.getData();
		var r=Ext.lt.RCP.asynserver('ui.QueryFromService','saveconfig',[_linkname,d]);
		if(r=='1'){
			alert('保存成功');
		}
		else{
			alert('保存失败\r\n'+r);
		}
		
	}
		
	_cmp.showconfig=function(){
		// 构造配置窗口
		var r=Ext.lt.RCP.asynserver('ui.QueryFromService','getQueryFormConfig',[_linkname]);
		if(r==null) return;
		if(_config_window==null) initConfigWindow();
		if(_config_window==null){
			alert('没有找到'+_linkname+'配置信息');
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

	// 创建配置窗口
	function initConfigWindow(){
		
		var div=document.createElement('DIV');
		div.style.cssText='width:700px;height:450px;overflow:hidden';
		document.body.appendChild(div);
		div.innerHTML='<div style="width:700px;height:415px;overflow:hidden"></div><div style="width:700px;height:30px;overflow:hidden;margin-top:5px"><center><button>保存</button>&nbsp;&nbsp;<button>取消</button></center></div>';
		_config_window=new Ext.lt.window({title:'查询条件配置',pop:true,autoshow:false,fitmode:'content'});

		_config_table=new Ext.lt.datatable(_config_data);
		_config_table.setCols([
		_config_table.columns.seq,
		_config_table.columns.checkbox,		
		{name:'NAME',alias:'列名',datatype:'S',edit:true,oneditstart:function(table,el,l,c,ds){if(ds['check']==1){this._startedit(table,el,l,c,ds)}else{alert('请先勾选本行')}}},
		{name:'DATATYPE',alias:'数据类型',mapper:{columns:['id','name'],datas:[['N','数字'],['D','日期'],['S','文本']]},format:'#id-#name'},
		{name:'ORDERNUM',alias:'排序',datatype:'I',edit:true,oneditstart:function(table,el,l,c,ds){if(ds['check']==1){this._startedit(table,el,l,c,ds)}else{alert('请先勾选本行')}}},
		{name:'TYPE',alias:'类型',mapper:{columns:['id','name'],datas:[['t','文本框'],['inputtips','可录入下拉框'],['d','日期'],['di','日期区间']]},format:'#name',edit:true,oneditstart:function(table,el,l,c,ds){if(ds['check']==1){this._startedit(table,el,l,c,ds)}else{alert('请先勾选本行')}}},
		{name:'ISVISIBLE',alias:'是否可见',mapper:{columns:['id','name'],datas:[[0,'隐藏'],[1,'可见']]},format:'#name',edit:true,oneditstart:function(table,el,l,c,ds){if(ds['check']==1){this._startedit(table,el,l,c,ds)}else{alert('请先勾选本行')}}}
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
				alert('保存成功');
			}
			else{
				alert('保存查询配置信息时出错：/r/n'+r);	
			}
			
		}
	}
	
	return _cmp;
});





/**
平台2界面工具条组件
  用于生成界面工具条。可以在数据库t_uifunction中配置使用。工具条默认宽、高为页面宽度*24px。高度可通过

实例化参数：
	id:String	工具条对象id，通过标签生成的工具条对象在界面中生成的对象名
	linkname:String	对应页面配置linkname对象
	configbtn:boolean	是否显示配置按钮
	querybtn:boolean 是否显示‘显示查询’按钮
	buttons:array+object	按钮对象配置
		name:string	按钮对象id，按钮对象引用标志
		title:string	按钮显示内容
		icon:string	按钮图标，系统按照 icon+'_btn'的规则为按钮添加样式，并且，按照icon+'_btn '+icon+'btn_over'  icon+'_btn '+icon+'_click'的规则生成按钮鼠标样式
		action:function	按钮执行事件
		isvisible:boolean	是否可见，默认为true
		disabled:boolean	按钮是否为禁用状态

工具条对象属性：
	id:string	工具条对象id
	linkname:string	对应页面配置linkname对象
	configbtn:HTMLButtonElement	配置按钮对象
	querybtn:HTMLButtonElement	查询按钮对象
	buttons:array	可以通过按钮名称或按钮位置查找按钮对象
		按钮对象结构
			属性：
			name:string	按钮对象id，按钮对象引用标志
			title:string	按钮显示内容
			icon:string	按钮图标，系统按照 icon+'_btn'的规则为按钮添加样式，并且，按照icon+'_btn '+icon+'btn_over'  icon+'_btn '+icon+'_click'的规则生成按钮鼠标样式
			action:function	按钮执行事件
			disabled:boolean	按钮是否为禁用状态
			isvisible:boolean	是否可见，默认为true
			方法：
			setDisabled(boolean)	设置是否可用
			setIsvisible(boolean)	设置是否可见


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
				if(!queryflag) queryflag=btn.title.indexOf('查询')>-1;
				if(btn.name==null) btn.name='toolbarbtn'+Ext.lt.getNextSeqValue();
				if(btn.isvisible==null) btn.isvisible=true;
				html.push('<button id="',btn.name,'" title="',btn.title,'" icon="',btn.icon,'" class="',btn.icon,'_btn" overclass="',btn.icon,'_btn ',btn.icon,'_btn_over" clickclass="',btn.icon,'_btn ',btn.icon,'_btn_click" ',(btn.disabled?'disabled':''),' style="float:left;',(btn.isvisible?'':'display:none'),'" >',btn.title,'</button> ');
				_cmp.buttons[btn.name]=btn;
				_cmp.buttons.push(btn);
			}
		}
		if(cfg.configbtn) html.push('<img title="配置功能菜单" align="absMiddle" id="configFunctionButtonFunc" style="cursor: pointer;" src="/fasp/images/done_btn/setOnpage.gif" />');
		html.push('</li>');
		// 只有设置了查询按钮并且按钮名称中包含“查询”文字时，显示查询按钮才会显示
		if(_config.querybtn && queryflag){
			html.push('<li class="query_t_r"><button title="显示查询" id="showquery_btn" class="show_btn" onclick="hidshowQuery(this)" style="float:right">显示查询</button></li>');
		}
		html.push('</ul>');
		
		// 生成工具条
		Ext.lt.HTML.setInnerHTML(el,html.join(''));
		
		// 添加启用、禁用方法
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

	// 工具条不实现ersize方法	
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