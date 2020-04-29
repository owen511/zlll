Ext.lt.console.component.uploadfilelog=function(sid,config){
	
	//报表菜单数据结构
	var fields=[{name:'filename'},{name:'folder'},{name:'product'},{name:'type'},{name:'time'},{name:'persion'},{name:'info'}];
	
	var store= new Ext.data.JsonStore({
		fields: fields 
	});
	var gpanel = new Ext.grid.GridPanel({
		layout:"fit", //panel自适应
		border:false,
		store: store,
		region:'center',
		viewConfig: {forceFit:true},  
		columns: [
			 new Ext.grid.RowNumberer(),
			{header: "文件名", width: 180, sortable: true,menuDisabled:true, dataIndex: 'filename'},
			{header: "文件夹名", width: 180, sortable: true,menuDisabled:true, dataIndex: 'folder'},
			{header: "产品名", width: 180, sortable: true,menuDisabled:true, dataIndex: 'product',renderer:function(value){
				for(var i=0;i<_productdata.length;i++){
					if(value==_productdata[i].config)return _productdata[i].name;
				}
			}},
			{header: "操作方式", width: 180, sortable: true,menuDisabled:true, dataIndex: 'type'},
			{header: "操作时间", width: 180, sortable: true,menuDisabled:true, dataIndex: 'time'},
			{header: "操作人员", width: 180, sortable: true,menuDisabled:true, dataIndex: 'persion'},
			{header: "操作信息", width: 180, sortable: true,menuDisabled:true, dataIndex: 'info'}
		]
    });
	var _filename=new Ext.form.TextField({fieldLabel: '文件名称',anchor: '99%'});
	var _folder=new Ext.form.TextField({fieldLabel: '文件夹名',anchor: '99%'});
	var _productdata=Ext.lt.RCP.asynserver("consoleinstallservice", "load",  null);
	
    var _product=new Ext.form.ComboBox ({
		fieldLabel:"产品名称",
		anchor: '99%',
		store: new Ext.data.JsonStore({
			fields: [{name:'name'},{name:'config'}],
			data : _productdata
		}),
		displayField:'name',
		valueField :'config',
		typeAhead: true,
	  	mode: 'local',
	  	triggerAction: 'all',
		editable:false,
		value:''
	});
    var _type=new Ext.form.ComboBox ({
		fieldLabel:"操作方式",
		anchor: '99%',
		store: new Ext.data.SimpleStore({
			fields : ['value', 'name'],
			data : [['', '无'],['新增', '新增'],['修改', '修改'],['删除', '删除']]
		}),
		displayField:'name',
		valueField :'value',
		typeAhead: true,
	  	mode: 'local',
	  	triggerAction: 'all',
		editable:false,
		value:''
	});
    var startdate = new Ext.form.DateField({
		fieldLabel : '开始时间',
		maxValue : new Date(),
		editable : false,
		format : 'Y-m-d',
		anchor: '99%',
		listeners : {
			'select' : function(value) {
				enddate.setMinValue(this.getValue());
			}
		}
	});
	var enddate = new Ext.form.DateField({
		fieldLabel : '结束时间',
		editable : false,
		format : 'Y-m-d',
		maxValue : new Date(new Date().getTime()+1000*60*60*24),
		anchor: '99%',
		listeners : {
			'select' : function(value) {
				startdate.setMaxValue(this.getValue());
			}
		}
	})
    var _querybutton=new Ext.Button({text: '查询',handler: function(){
    	var o={};
    	o.filename = _filename.getValue();
    	o.folder = _folder.getValue();
    	o.product = _product.getValue();
    	o.type = _type.getValue();
    	o.start = startdate.value;
    	o.end = enddate.value;
    	for(e in o){
    		if(o[e]=='')o[e]=null;
    	}
		Ext.lt.RCP.server("frameworkfilelog","load",o, function(resp) {
			store.loadData(resp.toArray());
		});
    }});
    var query=new Ext.Panel({
    	layout:'column', //panel自适应
		border:false,
	    region:'north',
	    height:60,
	    items:[{width:200,
				layout: 'form',
				baseCls: 'x-plain',
				items:[_filename,_product]
			},{width:200,
				layout: 'form',
				baseCls: 'x-plain',
				items:[_folder,startdate]
			},{width:200,
				layout: 'form',
				baseCls: 'x-plain',
				items:[_type,enddate]
			},{style: 'padding-left:30px',
				baseCls: 'x-plain',
				items:[_querybutton]
			}]
    });
	var panel=new Ext.Panel({
		title:'上传文件管理',
		border:false,
		layout:'border',
		autoScroll:true,
		items:[query,gpanel]
	});
	return panel;
}