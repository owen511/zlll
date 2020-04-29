//检查命名空间
if(Ext.lt.overview==null){
    Ext.lt.overview={component:{}}
};
Ext.lt.overview.reportqueryFrom={};
Ext.lt.overview.report=function(config,service){
		//p.currpage 当前页码
		//p.totalpages 总页码
		//p.totalrows  总条数
		//p.rows 每页个数
	var page={currpage:1,totalpages:1,totalrows:0,rows:100};
	var paginationdiv=null;
	if(config.ispage==null)config.ispage=true;
	var rs=new Ext.lt.recordset(); 
	config.page=page;
	var code=config.code;
	var _form=null;
	function notHaveReport(){
		alert('报表不存在');
		window.history.back(1)
	}

	if(config.tab==false){notHaveReport();}
	var querysel={};
	function _buildButtons(div,d2){
		var html=[];
		var b=false;
		if(config.condition!=null&&config.condition.length>0){b=true;}
		if(b){
			html.push("<ul layout={w:{fit:true}} id=\"formpanel\" columnsize='3' style=\"width:100%\" >");
			for(var i=0;i<config.condition.length;i++){
				var inp=config.condition[i];
				if(inp.type==null||inp.type==''){inp.type='input'}
				html.push('<li type="', inp.type,'"');
				if( inp.type=='select'||inp.type=='treeselect' ){
					Ext.lt.overview.reportqueryFrom[inp.tabcol]=Ext.lt.RCP.asyncall(service,'loadSelectData',inp.code+'');
					html.push( ' dataloader=" Ext.lt.overview.reportqueryFrom.',inp.tabcol,'" ' );
					if(inp.selectmode=='n' ){
						html.push('selectmode="n"');
					}
					
				}
				html.push( '" clearbtn=true name="', inp.tabcol, '" redwordmode="on" labelwidth=30% label="', inp.name,  '"/>');
			}
			html.push("</ul>");
		}
		d2.innerHTML=html.join('');
		if(b){
			_form = Ext.lt.editpanel.initFormPanel(document.getElementById('formpanel'));
			_form.bind(querysel);
		}
		
		 var functions={id:'toolbar',buttons:[]};
		 if(b){
			functions.buttons.push({name:'yl',title:'查询',icon:'query',action:function(){Ext.lt.message.send('report','query')},disabled:false});
		}
		functions.buttons.push({name:'save',title:'导出',icon:'add',action:function(){Ext.lt.message.send('modepage','down')},disabled:false});
		var toolbar=new Ext.lt.toolbar(functions);
		toolbar.draw(div);
	}
	var dt=null;
	/****/
	function _drawpage(p,obj){
		if(obj==null) return;
		var html=[];
		html.push('<table cellSpacing=0 cellPadding=0 border=0 ><tr><td align=center>');
		html.push('<TABLE id="paginationtbl" cellSpacing=0 cellPadding=0 border=0><TBODY><TR>');
		//放大暂时不开启
		//html.push('<TD align="center" width="50" nowrap="nowrap"><a href="#"> <img id="tmainzoomicon"src='+ROOT_PATH+'"/images/done_btn/zoomin.gif"alt="放大" border="0" height="20" width="20" align="absmiddle" /></a></TD>');
		html.push('<TD nowrap="nowrap" class="jump_link"><a href="#"><img src="'+_ROOT_PATH_+'" title="首页"/></a> <a href="#"><img src="'+_ROOT_PATH_+'" title="上页"/></a> <a href="#"><img src="'+_ROOT_PATH_+'" title="下页"/></a> <a href="#"><img src="'+_ROOT_PATH_+'" title="末页"/></a></td>');
		html.push('<td>共 <font id="page_totalrows">'+p.totalrows+'</font> 条，</td><td><a style="font: black">每页</a></td><td><input id="setpage_size" style="padding-bottom:1px; width: 30px; height: 16px; background:#FFF; border: 1px #86A2C0 solid; line-height: 16px; text-align: center;color:#0000FF;" title=\'设置每页多少条\' ');
		html.push(' size="4" /></td><td><a style="font: black">条</a>，第</td><td><input id="page" type="text" style="padding-bottom:1px; width: 30px; height: 16px; background:#FFF; border: 1px #86A2C0 solid; line-height: 16px; text-align: center;color:#0000FF;"/></td><td>/<a></a>页</td>');
		html.push('<td align="right">　<button class="jumppage" >跳转</button></td></tr></table>');
		html.push('</td></tr></table>');		
		obj.innerHTML=html.join("");
		//obj.style.align ='right';
		_initInfo(p,obj);
	}
	
	function _initEvent(p,obj){
		var as=obj.getElementsByTagName('A');
		//首页
		_previousPage(p,as,obj);
		_nextPage(p,as,obj);
		var inputs=obj.getElementsByTagName('input');
		_sizePage(p,inputs[0],obj);
		_runToPage(p,inputs[1],obj)
		obj.getElementsByTagName('button')[0].onclick=function(){
			p.send(obj);
		}
	}
	
	Ext.lt.message.hook("modepage","down",function(){
			Ext.lt.RCPConsole.processdown("overview_reportdown","down",[code,_query]);
	});
	function _initInfo(p,obj){
		p.currpage=p.currpage<=0?1:p.currpage;
		p.totalpages=p.totalpages<=0?1:p.totalpages;
		p.totalrows=p.totalrows<0?1:p.totalrows;
		p.rows=p.rows<0?100:p.rows;

		if(p.totalrows%p.rows==0){
			p.totalpages=p.totalrows/p.rows
		}else{
			try {
				p.totalpages=Math.floor(p.totalrows/p.rows)+1;
			} catch (e) {
			}
		}
		p.totalpages=p.totalpages<=0?1:p.totalpages;
		document.getElementById('page_totalrows').innerHTML=p.totalrows;
		var as=obj.getElementsByTagName('A');
		//首页
		_previousPage(p,as,obj);
		_nextPage(p,as,obj);
		as[6].innerHTML=p.totalpages;
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
			if (Ext.lt.util.checkNumber(this.value,1,100)) {
		        alert("请输入一个1-100有效值作为每页条数！");
				this.value = p.rows;
		        return false;
		    }
			p.rows = oPagesize;
			p.currpage=1;
			p.send(obj)
		}
		i.onkeyup=function(e){
			 if (event.keyCode == 13) {
			 	document.body.focus();
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
		    p.send(obj)
		}
		i.onkeyup=function(e){
			 if (event.keyCode == 13) {
			 	document.body.focus();
			 }
		}
	}
	function _previousPage(p,as,obj){
		if(p.currpage != 1 ? (p.totalpages > 1) : false){
			as[0].onclick=function(){
				p.currpage=1;
				p.send(obj);
			};
			as[1].onclick=function(){
				p.currpage=p.currpage-1;
				p.send(obj);
			};
			as[1].className=''
			as[0].className=''
			as[1].firstChild.src=_ROOT_PATH_+'/images/actions/pre.gif';
			as[0].firstChild.src=_ROOT_PATH_+'/images/actions/first.gif';
		}else{
			as[0].onclick=null;
			as[1].onclick=null;
			as[1].className='nolink'
			as[0].className='nolink'
			as[1].firstChild.src=_ROOT_PATH_+'/images/actions/pre_un.gif';
			as[0].firstChild.src=_ROOT_PATH_+'/images/actions/first_un.gif';
		}
		
	}
	function _nextPage(p,as,obj){
		if( p.currpage <p.totalpages){
			as[3].onclick=function(){
				p.currpage=p.totalpages;
				p.send(obj);
			};
			as[2].onclick=function(){
				p.currpage=parseInt(p.currpage)+1;
				p.send(obj);
			};
			as[2].className=''
			as[3].className=''
			as[2].firstChild.src=_ROOT_PATH_+'/images/actions/next.gif';
			as[3].firstChild.src=_ROOT_PATH_+'/images/actions/end.gif';
		}else{
			as[3].onclick=null;
			as[2].onclick=null;
			as[2].className='nolink'
			as[3].className='nolink'
			as[2].firstChild.src=_ROOT_PATH_+'/images/actions/next_un.gif';
			as[3].firstChild.src=_ROOT_PATH_+'/images/actions/end_un.gif';
		}
	}
	
	page.send=function(obj){
		query();
		_initInfo(page,paginationdiv);
	}
	var _query={};
	
	Ext.lt.message.hook("report","query",function(){ toQuery(); });
	
	function toQuery(){
		_query={};
		if(config.condition!=null&&config.condition.length>0){
			for(var i=0;i<config.condition.length;i++){
				var tabcol=config.condition[i].tabcol;
				if(config.condition[i].type=="dateregion"){
					if(querysel['start_'+tabcol]==null&&querysel['end_'+tabcol]==null){continue;}
					_query[tabcol]=[config.condition[i].type,querysel['start_'+tabcol],querysel['end_'+tabcol]];
				}else{
					if(querysel[tabcol]==null||querysel[tabcol].length==0){continue;}
					if(config.condition[i].type=='treeselect'&&config.condition[i].selectmode!='n'){
						_query[tabcol]=['select',querysel[tabcol]];
					}else{
						_query[tabcol]=[config.condition[i].type,querysel[tabcol]];
					}
				}
			}
		
		}
		page.totalrows=Ext.lt.RCP.asyncall(service,'query2PageCount',[code,_query]);
		if(page.totalrows==-1){
			notHaveReport();
			return;
		}
		page.currpage=1;
		_initInfo(page,paginationdiv);
		if(page.totalrows==0){
			dt.getRecordset().clear();
			dt.reflash();
		}else{
			query();
		}
	}
	function query(){
		Ext.lt.HTML.mark();
		Ext.lt.RCP.call(service,'query',[code,_query,page],function(resp){
			if(resp==null){
				notHaveReport();
				Ext.lt.HTML.unmark();
				return;
			}
				dt.setRecordset(resp);
				dt.reflash();
				Ext.lt.HTML.unmark();
		});
	}
	function _buildDatatable(div){
		dt=new Ext.lt.datatable(rs);
		var b_cols=buildCols2Datatable();
		var c=[].concat(dt.columns.seq,b_cols);

		dt.setCols(c);
		/*********设置样式*************/
		
		dt.headsort(false);
		dt.setAllowClock(false);
		dt.setClassName('dttheme_ifmis');
		dt.setMouselight('#CFF6FF');
		dt.mousedrag(false);
		dt.draw(div);
	}
	function buildCols2Datatable(){
		
		for(var i=0;i<config.cols.length;i++){
			var _c=config.cols[i];
			_c.name=_c.name.toLowerCase();
			if(_c.datatype=="S"||_c.datatype==null){
				if(_c.elementcode!=null&&config.element[_c.elementcode]!=null){
					if(_c.format==null){
						_c.format="#name";
					}
					_c.mapper={columns:['code','name'],datas:config.element[_c.elementcode]}
				}else{
					_c.format=null;
				}
			}else{
				_c.format=null;
			}
		}
		return config.cols;
	}
	
	function _draw(div){
		var html=[];

		html.push('<div ></div>');
		html.push('<div style="z-index:999999999;POSITION: relative;"></div>');
		html.push('<div id="form_table_title" style="z-index:1"><div id="paginationdiv" style="overflow:auto;border:0px;" align="right"  ></div></div>');
		html.push('<div layout="{h:{fit:\'auto\'},w:{fit:true}}" style="padding-left:10px"><div id="tbl-container" layout="{h:{fit:true},w:{fit:-20}}" ></div></div>')
		//html.push('<div layout="{w:{fit:true}}"></div>');
		//html.push('<div layout="{w:{fit:true}}" ></div>')
		//html.push('<div layout="{h:{fit:22},w:{fit:true}}" ><div id="paginationdiv" style="overflow:auto;border:0px;" align="right"  ></div></div>');
		//html.push('<div layout="{h:{fit:\'auto\'},w:{fit:-10}}"></div>');
		div.innerHTML=html.join('');
		_buildButtons(div.childNodes[0],div.childNodes[1])
				//分页设置
		_buildDatatable(div.lastChild.lastChild)
		if(config.ispage){
			paginationdiv=document.getElementById("paginationdiv");
			_drawpage(page,paginationdiv);
			toQuery();
		}
	}
	var _modereport={};
	_modereport.draw=function(div){
		_draw(div);
		_modereport.el=div;
	}
	_modereport.resize=function(w,h){
		var div=this.el.lastChild;
		dt.resize(div.clientWidth-30,div.clientHeight);
		dt.redraw();
	}
	return _modereport;
}
