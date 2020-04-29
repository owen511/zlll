//��������ռ�
if(Ext.lt==null){
    Ext.lt={component:{}}
};
	var wn=null;
if(Ext.lt.formula==null){
	Ext.lt.formula={};
}
Ext.lt.formula.formulaconfig=function(service,config){
	var html=[];
	var rs=null;
	var dt=null;
	var fm=null;
	//html.push("<div layout='{h:{fit:20},w:{fit:true}}'><button class=\"btn\" onclick='wn.show();Ext.lt.layout.doLayout();'>����</button>&nbsp;&nbsp;<button class=\"btn\" onclick='alert(\"ɾ���ɹ�!\")'>ɾ��</button></div><div layout='{h:{fit:-20},w:{fit:true}}'></div><div class='winfitmode' class='winfitmode' style='height:500px;width:600px;overflow:hidden;'></div>");
   	var _productdata=Ext.lt.RCP.asynserver("consoleinstallservice", "load",  null);
   	Ext.lt.formula.prodata=new Ext.lt.recordset();
   	var prodata=[];
   	for(var i=0;i<_productdata.length;i++){
   		Ext.lt.formula.prodata.addData({v:_productdata[i].config,t:_productdata[i].name});
   		prodata.push([_productdata[i].config,_productdata[i].name]);
   	}
	function initTeble(d){
		//
		rs=new Ext.lt.recordset();
		rs.addData(config.tablers)
		dt=new Ext.lt.datatable(rs);
		col=[dt.columns.seq,dt.columns.checkbox];
		col.push({alias:'����',datatype:'S',name:'code'});
		col.push({alias:'����',datatype:'S',name:'name'});
		col.push({alias:'��ʽ',datatype:'S',name:'formula'});
		col.push({alias:'��Ʒ��ʶ',datatype:'S',name:'product',format:"#name",mapper:{columns:['code','name'],datas:prodata}});
		col.push({alias:'��ע1',datatype:'S',name:'remark1'});
		col.push({alias:'��ע2',datatype:'S',name:'remark2'});
		col.push({alias:'��ע3',datatype:'S',name:'remark3'});
		dt.drawMultiHead(true);
		dt.setCols(col);
		/*********������ʽ*************/
		dt.headsort(true);
		dt.setAllowClock(true);
		dt.setClassName('dttheme_ifmis');
		dt.setMouselight('#CFF6FF');
		dt.mousedrag(false);
		dt.draw(d);
		
	}
	function createWin(d){
		d.id='winfitmode'
		wn=Ext.lt.window({title:"�༭��Ϣ",h:560,w:660,className:'wind7', close:false,pop:true,mark:true});
		var h=[];
		h.push('<ul>');
		h.push('<li label="��ʽ���룺" width=\"350px\" type=\"input\" maxLength=50 name=\"code\" redwordmode=\"on\" />');
		h.push('<li label="��ʽ���ƣ�" width=\"350px\" type=\"input\" maxLength=50 name=\"name\" redwordmode=\"on\" />');
		h.push('<li label="��Ʒ���ƣ�" width=\"350px\" type=\"select\" maxLength=50 name=\"product\" redwordmode=\"on\" dataloader=\"Ext.lt.formula.prodata\" />');
		h.push('</ul>');
		h.push('<p>��ʽ��');
		h.push('<div class="formula_area" id="formula_area" layout="{w:{fit:600},h:{fit:200}}"></div>');
		h.push('</p>');
		h.push('<p>');
		h.push('<div class="formula_formulas" id="formula_formulas" layout="{w:{fit:280},h:{fit:160}}"></div>');
		h.push('<div class="formula_formulas_other" id="formula_formulas_other" layout="{w:{fit:300},h:{fit:160}}">');
		h.push('<button _val="+">+ ��</button>');
		h.push('<button _val="-">- ��</button>');
		h.push('<button _val="*">* ��</button>');
		h.push('<button _val="/">/ ��</button>');
		h.push('<button _val="%">% ����</button>');
		h.push('<button _val=",">, �����ָ��</button>');
		h.push('<button _val="(">( ������</button>');
		h.push('<button _val=")">) ������</button>');
		h.push('<button _val=">">> ����</button>');
		h.push('<button _val="<">< С��</button>');
		h.push('<button _val="=">= ����</button>');
		h.push('<button _val="const">����</button>');
		h.push('<button _val="cell">cell ��Ԫ��</button>');
		h.push('<button _val="row">row ��</button>');
		h.push('<button _val="col">col ��</button>');
		h.push('<button _val="backspace">backspace</button>');
		h.push('</div>');
		h.push('</p>');
		h.push('<center><button class=\"btn\" onclick="Ext.lt.message.send(\'formulaconfig\',\'save\')">ȷ��</button>&nbsp;&nbsp;<button class=\"btn\" onclick="wn.hidden();" >ȡ��</button></center>');
		h.push('</div>')
		d.innerHTML=h.join('');
		wn.draw(d);
		buildFormulaTree();
		buildButton();
		wn.hidden();
		fm = Ext.lt.editpanel.initFormPanel(d.firstChild);
	}
	var fttree=new Ext.lt.recordset({columns:['itemid','name','code','promptinfo','formulas'],datas:[]});
	var selectNode=null;
	var formulas=new Ext.lt.formulas();
	function buildFormulaTree(){
		var formulasInfs=formulas.getFormulasInfo();
		for(var es in formulasInfs){
			fttree.addData({itemid:es,name:formulasInfs[es].name,code:es,promptinfo:formulasInfs[es].promptinfo});
		}
		var qtree=new Ext.lt.Qtree({
			data:fttree,
			outformartfn:function(node){
				return '<a title=\"'+node.promptinfo+'\">'+node.name+'</a>';
			},
			viewmodel:'list',
			on:{'nodeclick':function(qtree,node){
					addFormula({code:node.data.code+"(",name:node.data.name+"("});
					addFormula({code:")",name:")"});
			}}
		});
		qtree.draw(document.getElementById('formula_formulas'));
	}
	
	var formula_area=null;
	Ext.lt.message.hook('prompt','close',function(){
		var v=Ext.lt.HTML.prompt.getValue()
		var vs=selectNode.formulas(v);
		selectNode=null;
		if(v==null||v==''){
			return;
		}
		addFormula({code:vs,name:vs});
	});
	
	function buildButton(){
		var div=document.getElementById('formula_formulas_other');
		var ds=div.childNodes;
		for(var i=0;i<ds.length;i++){
			var _ds=ds[i];
			switch(_ds._val){
				case 'indexOf':
					_ds.onclick=function(){selectNode=this; Ext.lt.HTML.prompt.show("���ҵ����ַ���")};
					_ds.formulas=function(v){return "indexOf('"+v+"')"};
					break;
				case 'const':
					_ds.formulas=function(v){return v};
					_ds.onclick=function(){selectNode=this;Ext.lt.HTML.prompt.show("�����ֵ");}
					break;
				case 'cell':
					_ds.formulas=function(v){return "cell("+v+")"};
					_ds.onclick=function(){selectNode=this;Ext.lt.HTML.prompt.show("�뵥Ԫ�� ��,��");}
					break;
				case 'row':
					_ds.formulas=function(v){return "row("+v+")"};
					_ds.onclick=function(){selectNode=this;Ext.lt.HTML.prompt.show("���б��");}
					break;
				case 'col':
					_ds.formulas=function(v){return "col("+v+")"};
					_ds.onclick=function(){selectNode=this;Ext.lt.HTML.prompt.show("���б��");}
					break;
				case 'backspace':
					_ds.onclick=function(){
						if(selectFdiv==null){
							formula_area.removeChild(formula_area.lastChild);	
						}else{
							formula_area.removeChild(selectFdiv.previousSibling);
						}
					}
					break;
				default:_ds.onclick=function(){addFormula({code:this._val,name:this._val});}
			}
		}
		document.getElementById('formula_area').onclick=function(){
			if(event.srcElement==this &&	selectFdiv!=null)	{
				selectFdiv.className=selectFdiv.className.replace(' divselect','');
				selectFdiv=null;
			}
		}
		
		document.getElementById('formula_area').onkeypress=function(e){
			if(keyCode[event.keyCode]!=null){
				addFormula({code:keyCode[event.keyCode],name:keyCode[event.keyCode]});
			}
			
		}
	}
	var keyCode={};
	function getKeyCodes(){
		var buttons= document.getElementById('formula_formulas_other').childNodes;
		for(var i=0;i<buttons.length;i++){
			if(buttons[i]._val.length==1){
				keyCode[buttons[i]._val.toUpperCase().charCodeAt(0)]=buttons[i]._val;
			}
		}
	}
	var fdivClose="<span onclick='Ext.lt.message.send(\"formula\",\"removeFormula\",this)'>��</span>";
	Ext.lt.message.hook("formula","removeFormula",function(font){
		if(selectFdiv==font.parentNode){selectFdiv=null;}
		formula_area.removeChild(font.parentNode);
	});
	var selectFdiv=null;
	function addFormula(t){
		if(t==null)return;
		var fdiv=document.createElement('div');
		if(selectFdiv==null){
			formula_area.appendChild(fdiv);
		}else{
			formula_area.insertBefore(fdiv,selectFdiv);
		}
		fdiv.innerHTML=t.name+fdivClose;
		
		fdiv.sthml=t.code;
		fdiv.onmousemove=function(){
			if(this.className.indexOf('divmouse')==-1){
				this.className+=' divmouse';
			}
		}
		fdiv.onmouseout=function(){
			this.className=this.className.replace(' divmouse','');
		}
		fdiv.onclick=function(){
			if(selectFdiv==this){
				selectFdiv.className=selectFdiv.className.replace(' divselect','');
				selectFdiv=null;
				return;
			}
			if(selectFdiv!=null){
				selectFdiv.className=selectFdiv.className.replace(' divselect','');
			}
			this.className+=' divselect';
			selectFdiv=this;
		}
		
	}
	config.draw=function(d){
		var html=[];
		html.push("<div layout='{h:{fit:20},w:{fit:true}}'><button class=\"btn\" onclick='Ext.lt.message.send(\"formulaconfig\",\"add\")'>����</button>&nbsp;&nbsp;<button class=\"btn\" onclick='Ext.lt.message.send(\"formulaconfig\",\"del\")'>ɾ��</button></div><div layout='{h:{fit:-20},w:{fit:true}}'></div><div class='winfitmode' class='winfitmode' style='height:500px;width:600px;overflow:hidden;'></div>");
		d.innerHTML=html.join('');
		initTeble(d.childNodes[1]);
		createWin(d.childNodes[2]);
		formula_area=document.getElementById('formula_area');
		getKeyCodes();
	}
	config.resize=function(w,h){
		dt.resize(w,h-40);
	}
	var _formula={};
	//event
	Ext.lt.message.hook('formulaconfig','save',function(){
		var fc=formula_area.childNodes;
		var str=[];
		for(var i=0,l=fc.length;i<l;i++){
			str.push(fc[i].sthml);
		}
		str=str.join("");
		_formula.formula=str;
		var reps=Ext.lt.RCP.asyncall(service,"saveFormulas",_formula);
		if(reps){
			alert("����ɹ�");
			loadFormula();
			wn.hidden();
		}
	})
	function loadFormula(){
		rs.clear();
		rs.addData(Ext.lt.RCP.asyncall(service,"loadFormulas",null));
		dt.reflash();
	}
	Ext.lt.message.hook('formulaconfig','add',function(){
		_formula={};
		fm.bind(_formula);
		formula_area.innerHTML="";
		wn.show();
		Ext.lt.layout.doLayout();
	})
	Ext.lt.message.hook('formulaconfig','del',function(){
		var ids=[];
		var l=rs.query({check:1});
		if(l==null||l.length==0){
			alert("��ѡ����Ҫɾ��������");
			return;
		}
		var b=window.confirm("�Ƿ�ɾ��ѡ������");
		if(!b)return;
		for(var i=0,lt=l.length;i<lt;i++){
			ids.push(l[i].itemid);
		}
		var reps=Ext.lt.RCP.asyncall(service,"removeById",[ids]);
		if(reps){
			alert("ɾ���ɹ�");
			loadFormula();
		}
	})
	
	return config;
}