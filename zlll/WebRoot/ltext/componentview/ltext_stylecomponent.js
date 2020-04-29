/**

**/
// ��������ռ�,����������򴴽������ռ�
if(Ext.lt.component==null) {Ext.lt.component={}};
Ext.lt.component.stylePanelComponent =function (obj) {
	var _obj=null;
	this._store= new Ext.data.GroupingStore({
		reader:new Ext.data.ArrayReader({}, [{name:'name'},{name:'value'},{name:'type'}]),
		groupField : 'type'
	});
	this._model = new Ext.grid.ColumnModel([
		{header:"����",  sortable:true, hidden :true, locked:false, dataIndex:"type"}, 
		{header:"����",  width:70,sortable:true,locked:false, dataIndex:"name"},
		{header:"��ʽ",  width:100, sortable:true,locked:false, dataIndex:"value" ,renderer:function(value){return "<div id='style_panel_'"+11+"'></div>";}}
	]);
	var _panel = new Ext.grid.GridPanel({
		border:0,
		height: 300,
		store:this._store, 
		cm:this._model,
		stripeRows : true,
		viewConfig: {forceFit:true}
	});
	this.init=function(){}
	this.load=function(){
		var loaddata = new Array();
		loaddata.push(["����","background","bg"]);
		loaddata.push(["�߿�","border","bg"]);
		loaddata.push(["��","height","bg"]);
		loaddata.push(["��","width","bg"]);
		loaddata.push(["������ɫ","font-color","font"]);
		loaddata.push(["��������","font-family","font"]);
		loaddata.push(["�����С","font-size","font"]);
		loaddata.push(["������ʽ","font-style","font"]);
		this._store.loadData(loaddata);
	}
	this.load();
	this.styleObj=new function(){
		this.version="1.0";
		this.type="stylecomponent";
		this.setObj=function(obj){
			if(obj==null||typeof(obj)=='string'){return;}
			_obj=obj;
			this.init();
		}
		this.getPanel=function(){
			return _panel;
		}
	}
	return this.styleObj;
}

Ext.lt.component.htmlPanelComponent = function (obj) {
	var _obj=null;
	var _drawObj=null;
	var ul=document.createElement("<ul class=\"quickmenu_list\"></ul>");
	var com=[];
	function _init(){
		_drawObj.appendChild(ul);
		var l=com.length;
		for(var i=0;i<l;i++){
			
		}
		_html.push('<li><a onclick="Ext.lt.component.htmlPanelComponent.showComponent(\"Table\")" class="menubar">Table(���)</a></li>');
		_html.push('<li><a onclick="Ext.lt.component.htmlPanelComponent.showComponent(\"Text\")" class="menubar">Text(�ı�)</a></li>');
		_html.push('<li><a onclick="Ext.lt.component.htmlPanelComponent.showComponent(\"Title\")" class="menubar">Title(����)</a></li>');
		_html.push('<li><a onclick="Ext.lt.component.htmlPanelComponent.showComponent(\"Report\")" class="menubar">Report(��(ͼ)��)</a></li>');
	}
	function addComponents(){
		
	}
	function addComponent(){
		
	}
	function _drow(obj){
		_drawObj=obj;
		_init;
	}
	this.htmlObj=new function(){
		this.version="1.0";
		this.type="htmlcomponent";
		this.setObj=function(obj){
			if(obj==null||typeof(obj)=='string'){return;}
			_obj=obj;
		}
		this.dorw=function(obj){
			if(obj==null||typeof(obj)=='string'){return;}
			_drow(obj);	
		}
		this.setComponent=function(obj){
			if(obj==null||typeof(obj)=='string')return;
			try{
				if(obj.length>0){
					addComponents(obj);
				}else{
					addComponent(obj);
				}
			}catch(e){
				addComponent(obj);
			}
			
		}
	}
	return this.htmlObj;
}
Ext.lt.component.htmlPanelComponent.showComponent=function(type){
		
}
Ext.lt.component.styleComponent=new function(){
	
	function createCombox(obj){
		var box = new Ext.form.ComboBox({
			id:obj.id,
			fieldLabel:obj.lable,
			store: new Ext.data.JsonStore({
				fields:["value","show"],
				data:obj.data
			}),
			valueField : 'value',
			displayField : 'show',
			typeAhead : true,
			mode : 'local',
			triggerAction : 'all',
			selectOnFocus : true,
			editable : false,
			tpl:obj.tpl,
			value: obj.value
		});
		return box;
	}
	this.fontSizeData=[];
	this.fontSize=function(obj){
		if(this.fontSizeData.length==0){
			for(var i=6;i<25;i++){
				this.fontSizeData.push({value:i,show:i+"��"});
			}
		}
		if(obj==null){obj={};}
		if(obj.lable==null)obj.lable='�����С';
		if(obj.value==null)obj.value=12;
		obj.data=this.fontSizeData;
		obj.tpl='<tpl for="."><div class="x-combo-list-item"><font style=font-size:{value}>{show}</font></div></tpl>';
		var box=createCombox(obj);
		return box;
	};
	this.colorData=[];
	this.color=function(obj){
		if(obj==null){obj={};}
		if(obj.lable==null)obj.lable='��ɫ';
		if(obj.value==null)obj.value='#000000';
		if(this.colorData.length==0){
			this.colorData.push({value:"#000000",show:"��ɫ"});
			this.colorData.push({value:"#A9A9A9",show:"����"});
			this.colorData.push({value:"#E3E3E3",show:"ǳ��"});
			this.colorData.push({value:"#FFFFFF",show:"��ɫ"});
			this.colorData.push({value:"#FF0000",show:"��ɫ"});
			this.colorData.push({value:"#8B0000",show:"���"});
			this.colorData.push({value:"#FFFF00",show:"��ɫ"});
			this.colorData.push({value:"#FFFFE0",show:"ǳ��"});
			this.colorData.push({value:"#FFD700",show:"��ɫ"});
			this.colorData.push({value:"#00FF00",show:"��ɫ"});
			this.colorData.push({value:"#008000",show:"����"});
			this.colorData.push({value:"#00FFFF",show:"��ɫ"});
			this.colorData.push({value:"#E0FFFF",show:"ǳ��"});
			this.colorData.push({value:"#0000FF",show:"��ɫ"});
			this.colorData.push({value:"#00008B",show:"����"});
			this.colorData.push({value:"#1E90FF",show:"����"});
			this.colorData.push({value:"#00BFFF",show:"����"});		
		}		

		obj.data=this.colorData;
		obj.tpl='<tpl for="."><div class="x-combo-list-item"><font style="background:{value}">����</font>{show}</div></tpl>';
		var box=createCombox(obj);
		return box;
	};
	
	this.fontstyleData=[];
	//<font style="font-style:italic;font-weight:bold;" >123</font>
	this.fontstyle=function(obj){
		if(obj==null){obj={};}
		if(obj.lable==null)obj.lable='������ʽ';
		if(obj.value==null)obj.value='nn';
		if(this.fontstyleData.length==0){
			this.fontstyleData.push({value:"nn",show:"һ��"});
			this.fontstyleData.push({value:"in",show:"��б"});
			this.fontstyleData.push({value:"nb",show:"�Ӵ�"});
			this.fontstyleData.push({value:"ib",show:"�Ӵ���б"});		
		}		

		obj.data=this.fontstyleData;
		obj.tpl=new Ext.XTemplate('<tpl for="."><div class="x-combo-list-item"><font style="{value:this.style()}">{show}</font></div></tpl>',{style:function(v){
			if(v=='nn')return "font-style:normal;font-weight:normal;";
			if(v=='in')return "font-style:italic;font-weight:normal;";
			if(v=='nb')return "font-style:normal;font-weight:bold;";
			if(v=='ib')return "font-style:italic;font-weight:bold;";
			
			}});
		var box=createCombox(obj);
		box.setValue(obj.value);
		return box;
	};
}