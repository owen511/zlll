Ext.lt.console.component.uploadfilelog=function(sid,config){
	
	//����˵����ݽṹ
	var fields=[{name:'filename'},{name:'folder'},{name:'product'},{name:'type'},{name:'time'},{name:'persion'},{name:'info'}];
	
	var store= new Ext.data.JsonStore({
		fields: fields 
	});
	var gpanel = new Ext.grid.GridPanel({
		layout:"fit", //panel����Ӧ
		border:false,
		store: store,
		region:'center',
		viewConfig: {forceFit:true},  
		columns: [
			 new Ext.grid.RowNumberer(),
			{header: "�ļ���", width: 180, sortable: true,menuDisabled:true, dataIndex: 'filename'},
			{header: "�ļ�����", width: 180, sortable: true,menuDisabled:true, dataIndex: 'folder'},
			{header: "��Ʒ��", width: 180, sortable: true,menuDisabled:true, dataIndex: 'product',renderer:function(value){
				for(var i=0;i<_productdata.length;i++){
					if(value==_productdata[i].config)return _productdata[i].name;
				}
			}},
			{header: "������ʽ", width: 180, sortable: true,menuDisabled:true, dataIndex: 'type'},
			{header: "����ʱ��", width: 180, sortable: true,menuDisabled:true, dataIndex: 'time'},
			{header: "������Ա", width: 180, sortable: true,menuDisabled:true, dataIndex: 'persion'},
			{header: "������Ϣ", width: 180, sortable: true,menuDisabled:true, dataIndex: 'info'}
		]
    });
	var _filename=new Ext.form.TextField({fieldLabel: '�ļ�����',anchor: '99%'});
	var _folder=new Ext.form.TextField({fieldLabel: '�ļ�����',anchor: '99%'});
	var _productdata=Ext.lt.RCP.asynserver("consoleinstallservice", "load",  null);
	
    var _product=new Ext.form.ComboBox ({
		fieldLabel:"��Ʒ����",
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
		fieldLabel:"������ʽ",
		anchor: '99%',
		store: new Ext.data.SimpleStore({
			fields : ['value', 'name'],
			data : [['', '��'],['����', '����'],['�޸�', '�޸�'],['ɾ��', 'ɾ��']]
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
		fieldLabel : '��ʼʱ��',
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
		fieldLabel : '����ʱ��',
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
    var _querybutton=new Ext.Button({text: '��ѯ',handler: function(){
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
    	layout:'column', //panel����Ӧ
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
		title:'�ϴ��ļ�����',
		border:false,
		layout:'border',
		autoScroll:true,
		items:[query,gpanel]
	});
	return panel;
}