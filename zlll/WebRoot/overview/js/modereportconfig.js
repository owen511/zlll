//��������ռ�
if(Ext.lt.overview==null){
    Ext.lt.overview={component:{}}
};
Ext.lt.overview.modeconfig=function(config,service){
	var dt=null;
	var tree=null;
	var cols=[];
	var coltree=null;
	var col=[];
	var rs=new Ext.lt.recordset();
	rs.addData({});
	var yulanwin=null;
	var yulandt=null;
	var sourcecol=null;
	var qtreediv=null;
	var conditionTreeDiv=null;
	var sourcecondition=null;
	
	var selectColdt=null;
	var selectColrs=new Ext.lt.recordset();
	var yulanwin_div=null;
	var page={currpage:1,totalpages:1,totalrows:0,rows:100};
	var paginationdiv=null;
	if(config.ispage==null)config.ispage=true;
	config.page=page;
	var codes=[];
	var osp=null;
	var s=null;
	
	config.element={};

	var cfg=config.code==null?{name:'',code:''}:Ext.lt.RCP.asyncall(service,'findRepotrConfigByCode',config.code);
	if(cfg==null){
		alert('����������');
		window.history.back(1);
	}
	if(config.code!=null){
		cfg.oldcode=cfg.code;
		sourcecol=Ext.lt.RCP.asyncall(service,'loadSourceCol',cfg.sourcetablecode);
		sourcecondition=Ext.lt.RCP.asyncall(service,'loadSourceCondition',cfg.sourcetablecode);
	}
	if(config.copy==1){
		cfg.oldcode='';
		cfg.code='';
		cfg.copy=1;
	}
	
	
	//alert(cfg.oldcode);
	var col_value=config.code==null?[]:Ext.lt.RCP.asyncall(service,'findRepotrColByCode',config.code);
	var con_value=config.code==null?[]:Ext.lt.RCP.asyncall(service,'findRepotrConditionByCode',config.code);
	for(var i=0;i<con_value.length;i++){
		con_value[i]=con_value[i][0];
	}
	var datatable_data=new Ext.lt.recordset(); 
	function _initpage(div){
		paginationdiv=div
		_drawpage(page,div);
	}
		/****/
	function _drawpage(p,obj){
		if(obj==null) return;
		var html=[];
		html.push('<table cellSpacing=0 cellPadding=0 border=0 style="float:right;padding-right:20px"><tr><td align=right>');
		html.push('<TABLE id="paginationtbl" cellSpacing=0 cellPadding=0 border=0><TBODY><TR>');
		//�Ŵ���ʱ������
		//html.push('<TD align="center" width="50" nowrap="nowrap"><a href="#"> <img id="tmainzoomicon"src='+ROOT_PATH+'"/images/done_btn/zoomin.gif"alt="�Ŵ�" border="0" height="20" width="20" align="absmiddle" /></a></TD>');
		html.push('<TD nowrap="nowrap" class="jump_link"><a href="#"><img src="'+_ROOT_PATH_+'" title="��ҳ"/></a> <a href="#"><img src="'+_ROOT_PATH_+'" title="��ҳ"/></a> <a href="#"><img src="'+_ROOT_PATH_+'" title="��ҳ"/></a> <a href="#"><img src="'+_ROOT_PATH_+'" title="ĩҳ"/></a></td>');
		html.push('<td>�� <font id="page_totalrows">'+p.totalrows+'</font> ����</td><td><a style="font: black">ÿҳ</a></td><td><input id="setpage_size" style="padding-bottom:1px; width: 30px; height: 16px; background:#FFF; border: 1px #86A2C0 solid; line-height: 16px; text-align: center;color:#0000FF;" title=\'����ÿҳ������\' ');
		html.push(' size="4" /></td><td><a style="font: black">��</a>����</td><td><input id="page" type="text" style="padding-bottom:1px; width: 30px; height: 16px; background:#FFF; border: 1px #86A2C0 solid; line-height: 16px; text-align: center;color:#0000FF;"/></td><td>/<a></a>ҳ</td>');
		html.push('<td align="right">��<button class="jumppage" >��ת</button></td><td widht=20px>&nbsp;&nbsp;&nbsp;</td></tr></table>');
		html.push('</td></tr></table>');		
		obj.innerHTML=html.join("");
	}
	
	function _initEvent(p,obj){
		var as=obj.getElementsByTagName('A');
		//��ҳ
		_previousPage(p,as,obj);
		_nextPage(p,as,obj);
		var inputs=obj.getElementsByTagName('input');
		_sizePage(p,inputs[0],obj);
		_runToPage(p,inputs[1],obj)
		obj.getElementsByTagName('button')[0].onclick=function(){
			p.send(obj);
		}
	}
	
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
		//��ҳ
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
		        alert("������һ��1-100��Чֵ��Ϊÿҳ������");
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
		        alert("������һ����Чֵ��ΪҪ��ת��ҳ����");
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
		yulanquery();
		_initInfo(page,paginationdiv);
	}
	var _query={};
	
	function yulanquery(){
		//Ext.lt.HTML.mark(yulanwin_div);
		Ext.lt.RCP.call(service,'preview',[osp.query({code:s.value})[0].tabname,codes,page],function(resp){
			datatable_data=resp;
			yulandt.setRecordset(datatable_data);
			yulandt.reflash();
			//Ext.lt.HTML.unmark(yulanwin_div);
		});
	}
	
	function _buildButtons(div){

		function yulan(){
			var b_cols=buildCols2Datatable();
			if(b_cols.length<=1){
				alert("��������");
				return;
			}
			if(yulanwin==null){
				var _d=document.createElement("div");
				_initpage(_d);
				var d=document.createElement("div");
				document.body.appendChild(_d);
				yulanwin_div=_d;
				_d.appendChild(d);
				d.style.width='755px';
				d.style.height='490px';
				yulanwin=new Ext.lt.window({title:"Ԥ��", w:800, h:580,close:true,pop:true,mark:true,className:'wind7',style:'overflow:hidden'});
				yulanwin.draw(_d);
				
				yulandt=new Ext.lt.datatable(datatable_data);
				
				col.push(dt.columns.seq);
				//col.push({alias:'A',datatype:'S',name:'A'});
				yulandt.setCols(col);
				/*********������ʽ*************/
				
				yulandt.headsort(false);
				yulandt.setAllowClock(false);
				yulandt.setClassName('dttheme_ifmis');
				yulandt.setMouselight('#CFF6FF');
				yulandt.mousedrag(false);
				yulandt.draw(d);
				yulanwin.hidden();
			}
		
			yulanwin.show();
			codes=[];
			for(var j=1;j<b_cols.length;j++){
				codes.push(b_cols[j].name);
			}
			codes=codes.join(",");
			//***********
			page.currpage=1;
			page.totalpages=1;
			page.rows=100;
			//*************
				
			Ext.lt.RCP.call(service,'preview2PageCount',[osp.query({code:s.value})[0].tabname,codes],function(resp){
				page.totalrows=resp;
				if(page.totalrows==0){
					yulandt.getRecordset().clear();
					yulandt.reflash();
				}else{
					yulanquery();
				}
				_initInfo(page,paginationdiv);
			});
			redrawDt(yulandt,b_cols);
		}
		
		function save(){
			Ext.lt.HTML.mark();
			var l=tree.getSelected();
			/*if(l.length>3){
				alert('���ѡ��3����ѯ����');
					Ext.lt.HTML.unmark();
				return ;
			}*/
			
			if(inp.value==null||inp.value.length==0){
				alert("����дģ�����ƣ�");
					Ext.lt.HTML.unmark();
				return;
			}
			if(inp.value.length>100){
				alert("ģ�����Ƴ��ȳ���100����������д");
					Ext.lt.HTML.unmark();
				return;
			}
			cfg.itemid=config.itemid;
			cfg.name=inp.value;
			var _col=[];
			var _con=[];
			var _colbak=[];
			var _conbak=[];
			//var b_cols=buildCols2Datatable();
			if(selectColrs.size()<1){
				alert('��ѡ����');
					Ext.lt.HTML.unmark();
				return ;
			}
			
			for(var i=0;i<selectColrs.size();i++){
				if(selectColrs.getData(i).alias.length>100){
					alert("������"+selectColrs.getData(i).alias+"���ȴ���100����������д��");
						Ext.lt.HTML.unmark();
					return ;
				}else if(selectColrs.getData(i).alias==null||selectColrs.getData(i).alias.trim().length==0){
					alert("������Ϊ�գ�����д��");
					Ext.lt.HTML.unmark();
					return ;
				}
				_col.push([selectColrs.getData(i).code,i,selectColrs.getData(i).alias]);
				_colbak.push(selectColrs.getData(i).code);
			}
			for(var i=0;i<l.length;i++){
				_con.push([l[i].code,i]);
				_conbak.push(l[i].code);
			}
			cfg.sourcetablecode=s.value;
			cfg.sourcetablename=document.getElementById('modeconfig'+s.value).innerText;
			if(config.coyp!=null){
				cfg.code=null;
			}
			if(code.value==null||code.value.length==0){
				alert("����дģ����룡");
					Ext.lt.HTML.unmark();
				return;
			}
			cfg.code=code.value;
			if(code.value.length>100){
				alert("���볤�ȳ���100����������д");
					Ext.lt.HTML.unmark();
				return;
			}
			//alert(cfg.oldcode);
			if(!Ext.lt.RCP.asyncall(service,'haveCode',cfg)){
				alert("�����Ѵ��ڣ���������д��");
					Ext.lt.HTML.unmark();
				return ;
			}			
			if(!Ext.lt.RCP.asyncall(service,'loadSourceTable',cfg.sourcetablecode)){
				alert(cfg.sourcetablename+"�ѱ�ɾ����������ѡ������Դ��ͼ��");
				Ext.lt.HTML.unmark();
				for(var i=0,k=document.getElementById('slt').children.length;i<k;i++){
					if(document.getElementById('slt').children(i).outerText==cfg.sourcetablename){
						var oChild=document.getElementById('slt').children(i);
						break;
					}
				}
				document.getElementById('slt').removeChild(oChild);
				window.location.reload();
				return; 
			}
			if(Ext.lt.RCP.asyncall(service,'isSourceCol',[_colbak])){
				alert("��ѡ���ѱ��޸ģ�������ѡ���У�");
				Ext.lt.HTML.unmark();
				window.location.reload();
				return;
			}
			if(Ext.lt.RCP.asyncall(service,'isSourceCon',[_conbak])){
				alert("��ѡ��ѯ�����ѱ��޸ģ�������ѡ���ѯ������");
				Ext.lt.HTML.unmark();
				window.location.reload();
				return;
			}
			if(selectColrs.size()<1){
				alert('��ѡ����');
					Ext.lt.HTML.unmark();
				return ;
			}
			Ext.lt.RCP.call(service,'saveRepotrConfig',[cfg,_col,_con],function(resp){
				if(resp){
					alert('����ɹ�');
					window.location='./reportconfig.page?isMenu=yes&mainmenu='+config.mainmenu+'&submenu=26900956'
				}else{
					alert('����ʧ��');
				}
				Ext.lt.HTML.unmark();
			});
		}

		 var functions={id:'toolbar',buttons:[
			{name:'yl',title:'Ԥ��',icon:'query',action:function(){yulan()},disabled:false},
			{name:'save',title:'����',icon:'add',action:function(){save()},disabled:false},
			{name:'bak',title:'����',icon:'return',action:function(){
			var b=window.confirm("�Ƿ񷵻أ�");
				if(b){
					window.location='./reportconfig.page?isMenu=yes&mainmenu='+config.mainmenu+'&submenu=26900956'
				}
			},disabled:false}
		]}
		
		var toolbar=new Ext.lt.toolbar(functions);
		toolbar.draw(div);
		div.appendChild(document.createElement('div'));
		div=div.lastChild;
		div.className="overview_modeconfig_top_s";
		var code=document.createElement("input");
		div.appendChild(document.createTextNode("  ģ�����"));
		div.appendChild(code);
		code.value=cfg.code;
		
		var inp=document.createElement("input");
		div.appendChild(document.createTextNode("  ģ������"));
		div.appendChild(inp);
		inp.value=cfg.name;
		div.appendChild(document.createTextNode("  ѡ������Դ��ͼ"));
		s=document.createElement("select");
		s.id='slt';
		osp=Ext.lt.RCP.asyncall(service,'loadSourceTable');
		if(osp==null || osp.size() == 0){
			alert("����������Դ��");
			return;
		}
		for(var i=0;i<osp.size();i++){
			var o=document.createElement("option");
			o.innerText=osp.getData(i).name;
			o.value=osp.getData(i).code;
			s.appendChild(o);
			o.id="modeconfig"+osp.getData(i).code;
			//
			if(o.value==cfg.sourcetablecode){
				o.selected=true;
			}
		}
		if(sourcecol==null){
			sourcecol=Ext.lt.RCP.asyncall(service,'loadSourceCol',osp.getData(0).code);
			sourcecondition=Ext.lt.RCP.asyncall(service,'loadSourceCondition',osp.getData(0).code);
		}
		div.appendChild(s);
		var v=s.value;;
		s.onchange=function(a,b,c,d){
			if(!window.confirm("�л�����Դ��ǰ���ý������ã��Ƿ��л���")){
				setTimeout(function(){
					s.value=v;
				},10);
				return;
			}
			v=s.value;
			sourcecol=Ext.lt.RCP.asyncall(service,'loadSourceCol',s.value);
			sourcecondition=Ext.lt.RCP.asyncall(service,'loadSourceCondition',s.value);
			changeCol();
		}
	}
	
	function changeCol(){
		selectColrs.clear();
		selectColdt.reflash();
		con_value=[];
		col_value=[];
		_buildColTree();
		_buildConditionTree();
		redrawDt(dt,buildCols2Datatable());
	}
	
	
	function _buildDatatable(div){
		dt=new Ext.lt.datatable(rs);
		dt.setLayout();
		col=buildCols2Datatable();
		dt.setCols(col);
		/*********������ʽ*************/
		
		dt.headsort(false);
		dt.setAllowClock(false);
		dt.setClassName('dttheme_ifmis');
		dt.setMouselight('#CFF6FF');
		dt.mousedrag(false);
		dt.draw(div);
	}
	
	function _buildColumn(div){
		div.innerHTML='<div  layout="{h:{fit:20},w:{fit:true}}" ><input type="checkbox" id="allcheck" title="ѡ��ȫ����" onclick="Ext.lt.message.send(\'reportconfig\',\'checkall\')"/>ѡ����Ҫ���ӵ��ֶΣ�</div><div layout="{h:{fit:-20},w:{fit:true}}" style="background-color: #FFFFFF;border-right: 1px #000 solid;"></div>';
		//div.innerHTML='<div  layout="{h:{fit:20},w:{fit:true}}" >ѡ����Ҫ���ӵ��ֶΣ�</div><div layout="{h:{fit:-20},w:{fit:true}}" style="background-color: #FFFFFF;border-right: 1px #000 solid;"></div>';
		qtreediv=div.lastChild
		_buildColTree();
	}
	Ext.lt.message.hook("reportconfig","checkconall",function(){
		var l=tree.getAllData();
		var allcheck=document.getElementById('allconcheck');
		var sv='';
		if(allcheck.checked){
			sv='checked'
		}
		for(var i=0;i<l.length;i++){
			l[i]._checked=sv;
		}
		tree.reflash();
	});
	Ext.lt.message.hook("reportconfig","checkall",function(){
		var l=coltree.getAllData();
		var allcheck=document.getElementById('allcheck');
		var sv='';
		if(allcheck.checked){
			sv='checked'
		}
		selectColrs.clear();
		for(var i=0;i<l.length;i++){
			l[i]._checked=sv;
			if(sv!=''){
				var n=Ext.lt.clone(l[i]);
				n.alias=n.name;
				selectColrs.addData(n);			
			}
		}
		coltree.reflash();
		selectColdt.reflash();
		redrawDt(dt,buildCols2Datatable());
	});
	function _buildSelectColumn(div){
		var _html=[];
		//_html.push('<table width=100%>');
		//_html.push('<tr height=10px><td>ѡ���ֶ�</td></tr>');
		//_html.push('<tr align="left" valign="middle"><td><div id="tjkj" layout="{w:{fit:true},h:{fit:-10}}" class="info_col" info_col=true></div></td></tr>');
		//_html.push('</table>');
		_html.push('<div style="height:20px">ѡ���ֶ�</div>');
		_html.push('<div id="tjkj" layout="{w:{fit:true},h:{fit:\'auto\'}}" class="info_col" info_col=true></div>');
		div.innerHTML=_html.join('');
		_initcol();
		selectColdt=new Ext.lt.editdatatable(selectColrs);
		selectColdt.setLayout();
		var selectColdt_col=[selectColdt.columns.seq];
		selectColdt_col.push({alias:"����",datatype:"S",name:"name"});
		selectColdt_col.push({alias:"����",datatype:"S",name:"alias",edit:true,width:150,oneditend:function(){redrawDt(dt,buildCols2Datatable());}});
		selectColdt.setLinedrop(true);
		selectColdt.setCols(selectColdt_col)
		selectColdt.headsort(false);
		selectColdt.setAllowClock(false);
		selectColdt.setClassName('dttheme_ifmis');
		selectColdt.setMouselight('#CFF6FF');
		selectColdt.mousedrag(false);
		selectColdt.draw(document.getElementById('tjkj'));
	}
	Ext.lt.message.hook("datatable","linedrop",function(){
		redrawDt(dt,buildCols2Datatable());
	});
	
	function _initcol(){
		for(var i=0;i<col_value.length;i++){
			var node=sourcecol.query({'code':col_value[i][0]});
			//addCol(node[0]);
			var n=Ext.lt.clone(node[0]);
			if(col_value[i][2]!=null){
				n.alias=col_value[i][2];
			}else{
				n.alias=n.name;
			}
			selectColrs.addData(n);
			col_value[i]=col_value[i][0];
		}
	}
	function _buildSelect(div){
		var _html=['<div  layout="{h:{fit:20},w:{fit:true}}"><input type="checkbox" id="allconcheck" title="ѡ��ȫ����ѯ����" onclick="Ext.lt.message.send(\'reportconfig\',\'checkconall\')"/>ѡ����Ҫ�Ĳ�ѯ������</div>']
		_html.push('<div layout="{h:{fit:-20},w:{fit:true}}" style="background-color: #FFF;overflow: scroll;"></div>');
		div.innerHTML=_html.join('');
		conditionTreeDiv=div.lastChild
		_buildConditionTree();
	}
	function _buildConditionTree(){
		tree=new Ext.lt.Qtree({
			values:con_value,
			data: sourcecondition,
			field:{id:'code',name:'name',code:'code'},
			selectmode:'n',
			outformart:'#name',
			viewmodel:'list'
		});

		tree.draw(conditionTreeDiv);
	}
	function _buildColTree(){
	
		coltree=new Ext.lt.Qtree({
			values:col_value,
			data: sourcecol,
			field:{id:'code',name:'name',code:'tabcode'},
			outformart:'#name',
			selectmode:'n',
			viewmodel:'list',
			on:{'change':function(qtree,node){
				var b=false;
				if(node.data._checked=="checked"){
					b=addCol(node.data);
				}else{
					b=removeCol(node.data);
				}
				if(b){redrawDt(dt,buildCols2Datatable())}
			}}
		});

		coltree.draw(qtreediv);
	}
	var coldata={};
	function addCol(node){
		var n=Ext.lt.clone(node);
		n.alias=n.name;
		selectColrs.addData(n);
		
		return true;
	}
	function removeCol(node){
		var l=selectColrs.query({code:node.code});
		selectColrs.remove(l);
		return true;
	}
	
	function buildCols2Datatable(){
	
		cols=[dt.columns.seq];
		for(var i=0;i<selectColrs.size();i++){
			var node = selectColrs.getData(i);
			if('S'!=node.type&&null!=node.type){
				cols.push({alias:(i<9?'0':'')+(i+1)+node.alias,datatype:node.type,name:node.tabcol.toLowerCase(),_code:node.code});
			}else{
				var _clast={alias:(i<9?'0':'')+(i+1)+node.alias,datatype:node.type,name:node.tabcol.toLowerCase(),_code:node.code};
				cols.push(_clast);
				if(node.elementcode!=null){
					if(node.format==null){
						_clast.format="#name";
					}else{
						_clast.format=node.format;
					}
					if(config.element[node.elementcode]==null){
						config.element[node.elementcode]=Ext.lt.RCP.asyncall(service,"getElements",node.elementcode);
					}
					_clast.mapper={columns:['code','name'],datas:config.element[node.elementcode]}
				}
			}
		}
		if(cols.length==coltree.getAllData().length+1){
			document.getElementById('allcheck').checked=true;
		}else{
			document.getElementById('allcheck').checked=false;
		}
		return cols;
	}
	function redrawDt(_dt,_cols){
		_dt.clearCols();
		_dt.mergeColumn(0)
		_dt.setCols(_cols);
		_dt.redraw();
	}
	

	function redrawDatatable(){
		dt.clearCols();
		col.push({alias:node.name,datatype:'S',name:node.code});
		
		dt.mergeColumn(0)
		dt.setCols(col);
		dt.redraw();
	}
	function _draw(div){
		var html=['<div class="overview_modeconfig_top" layout="{h:{fit:60},w:{fit:true}}"></div>'];
		html.push('<div layout="{h:{fit:-60},w:{fit:-320}}" style="float:left"></div>');
		html.push('<div class="overview_modeconfig_cols" layout="{h:{fit:-60},w:{fit:310}}" style="float:left">');
			html.push('<div layout="{h:{fit:200},w:{fit:145}}" style="float:left"></div>');
			html.push('<div layout="{h:{fit:200},w:{fit:-155}}" style="float:left;"></div>');
			html.push('<div layout="{h:{fit:-220},w:{fit:true}}" style="float:left"></div>');
		html.push('</div>')
		div.innerHTML=html.join('');
		_buildButtons(div.childNodes[0])
		_buildSelectColumn(div.lastChild.childNodes[2])
		_buildColumn(div.lastChild.childNodes[0])
		_buildSelect(div.lastChild.childNodes[1])
		_buildDatatable(div.childNodes[1])
	}
	var _modereport={};
	_modereport.draw=function(div){
		_draw(div);
		_modereport.el=div;
	}
	_modereport.resize=function(w,h){
		var div=this.el.childNodes[1];
		setTimeout(function(){
			dt.resize(div.clientWidth,div.clientHeight-20);
		},100);
	}
	return _modereport;
}