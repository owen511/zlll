/**

**/
// 检查命名空间,如果不存在则创建命名空间
if(Ext.lt.component==null) {Ext.lt.component={}};
Ext.lt.component.stylePanelComponent =function (obj) {
	var _obj=null;
	this._store= new Ext.data.GroupingStore({
		reader:new Ext.data.ArrayReader({}, [{name:'name'},{name:'value'},{name:'type'}]),
		groupField : 'type'
	});
	this._model = new Ext.grid.ColumnModel([
		{header:"类型",  sortable:true, hidden :true, locked:false, dataIndex:"type"}, 
		{header:"名称",  width:70,sortable:true,locked:false, dataIndex:"name"},
		{header:"样式",  width:100, sortable:true,locked:false, dataIndex:"value" ,renderer:function(value){return "<div id='style_panel_'"+11+"'></div>";}}
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
		loaddata.push(["背景","background","bg"]);
		loaddata.push(["边框","border","bg"]);
		loaddata.push(["宽","height","bg"]);
		loaddata.push(["高","width","bg"]);
		loaddata.push(["字体颜色","font-color","font"]);
		loaddata.push(["字体名称","font-family","font"]);
		loaddata.push(["字体大小","font-size","font"]);
		loaddata.push(["字体样式","font-style","font"]);
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
		_html.push('<li><a onclick="Ext.lt.component.htmlPanelComponent.showComponent(\"Table\")" class="menubar">Table(表格)</a></li>');
		_html.push('<li><a onclick="Ext.lt.component.htmlPanelComponent.showComponent(\"Text\")" class="menubar">Text(文本)</a></li>');
		_html.push('<li><a onclick="Ext.lt.component.htmlPanelComponent.showComponent(\"Title\")" class="menubar">Title(标题)</a></li>');
		_html.push('<li><a onclick="Ext.lt.component.htmlPanelComponent.showComponent(\"Report\")" class="menubar">Report(报(图)表)</a></li>');
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
				this.fontSizeData.push({value:i,show:i+"号"});
			}
		}
		if(obj==null){obj={};}
		if(obj.lable==null)obj.lable='字体大小';
		if(obj.value==null)obj.value=12;
		obj.data=this.fontSizeData;
		obj.tpl='<tpl for="."><div class="x-combo-list-item"><font style=font-size:{value}>{show}</font></div></tpl>';
		var box=createCombox(obj);
		return box;
	};
	this.colorData=[];
	this.color=function(obj){
		if(obj==null){obj={};}
		if(obj.lable==null)obj.lable='颜色';
		if(obj.value==null)obj.value='#000000';
		if(this.colorData.length==0){
			this.colorData.push({value:"#000000",show:"黑色"});
			this.colorData.push({value:"#A9A9A9",show:"暗灰"});
			this.colorData.push({value:"#E3E3E3",show:"浅灰"});
			this.colorData.push({value:"#FFFFFF",show:"白色"});
			this.colorData.push({value:"#FF0000",show:"红色"});
			this.colorData.push({value:"#8B0000",show:"深红"});
			this.colorData.push({value:"#FFFF00",show:"黄色"});
			this.colorData.push({value:"#FFFFE0",show:"浅黄"});
			this.colorData.push({value:"#FFD700",show:"金色"});
			this.colorData.push({value:"#00FF00",show:"绿色"});
			this.colorData.push({value:"#008000",show:"深绿"});
			this.colorData.push({value:"#00FFFF",show:"青色"});
			this.colorData.push({value:"#E0FFFF",show:"浅青"});
			this.colorData.push({value:"#0000FF",show:"蓝色"});
			this.colorData.push({value:"#00008B",show:"深蓝"});
			this.colorData.push({value:"#1E90FF",show:"湖蓝"});
			this.colorData.push({value:"#00BFFF",show:"天蓝"});		
		}		

		obj.data=this.colorData;
		obj.tpl='<tpl for="."><div class="x-combo-list-item"><font style="background:{value}">　　</font>{show}</div></tpl>';
		var box=createCombox(obj);
		return box;
	};
	
	this.fontstyleData=[];
	//<font style="font-style:italic;font-weight:bold;" >123</font>
	this.fontstyle=function(obj){
		if(obj==null){obj={};}
		if(obj.lable==null)obj.lable='字体样式';
		if(obj.value==null)obj.value='nn';
		if(this.fontstyleData.length==0){
			this.fontstyleData.push({value:"nn",show:"一般"});
			this.fontstyleData.push({value:"in",show:"倾斜"});
			this.fontstyleData.push({value:"nb",show:"加粗"});
			this.fontstyleData.push({value:"ib",show:"加粗倾斜"});		
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