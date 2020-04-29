Ext.lt.console.component.fdilog=function(sid,config){
	
	//����˵����ݽṹ
	
	var store= new Ext.data.GroupingStore({
		reader:new Ext.data.ArrayReader({}, [{name:'code'},{name:'configname'},{name:'operation'},{name:'rownumber'},{name:'time'},{name:'info'}]),
		groupField : 'configname'
	});
	var cm = new Ext.grid.ColumnModel([
		new Ext.grid.RowNumberer(),
			{header: "���ò�������", width: 180, sortable: true,menuDisabled:true, dataIndex: 'configname'},
			{header: "��־����", width: 50, sortable: true,menuDisabled:true, dataIndex: 'operation'},
			{header: "������Ϣ����", width: 50, sortable: true,menuDisabled:true, dataIndex: 'rownumber'},
			{header: "����ʱ��", width: 100, sortable: true,menuDisabled:true, dataIndex: 'time'},
			{header: "��ϸ��Ϣ", width: 300, sortable: true,menuDisabled:true, dataIndex: 'info'}
		]);
	
    var gpanel = new Ext.grid.GridPanel({
				layout:"fit",
				iconCls:"grid",
				region:'center',
				border:false, 
				store:store, 
				cm:cm,
				view : new Ext.grid.GroupingView({
					forceFit:true,
				    groupByText : '���ݱ��з���',
    			    showGroupsText : '�Ƿ���÷�����ʾ',
    				groupTextTpl : '��������־��Ϣ<b><font color=red>{[values.rs.length]}</font></b> {[values.rs.length > 1 ? "��" : "��"]}'
				}),
			   stripeRows : true,
				viewConfig: {forceFit:true},
				sm:this.sm, 
				frame:true
		});
   var name=new Ext.form.TextField({fieldLabel: '���ò�������',anchor: '99%'});
    var type=new Ext.form.ComboBox ({
		fieldLabel:"��־����",
		anchor: '99%',
		store: new Ext.data.SimpleStore({
			fields : ['value', 'name'],
			data : [['', '��'],['�������', '�������'],['�������', '�������']]
		}),
		displayField:'name',
		valueField :'value',
		typeAhead: true,
	  	mode: 'local',
	  	triggerAction: 'all',
		editable:false,
		value:''
	});
    var date = new Ext.form.DateField({
		fieldLabel : '����ʱ��',
		value : new Date(),
		editable : false,
		format : 'Y-m-d',
		anchor: '99%'
	});
	
    var _querybutton=new Ext.Button({text: '��ѯ',handler: function(){
    	var o={};
    	o.date = date.value;
    	o.type = type.value;
    	o.name = name.getValue();
		Ext.lt.RCP.server("framework_fdisetting","loadInfo",o, function(reps) {
			var loaddata = [];
			for (var i = 0; i < reps.length; i++) {
				loaddata.push([reps[i].code,reps[i].configname,reps[i].operation,reps[i].rownumber,reps[i].time,reps[i].info]);
			}
			store.loadData(loaddata);
		});
    }});
    var query=new Ext.Panel({
    	layout:'column', //panel����Ӧ
		border:false,
	    region:'north',
	    height:40,
	    items:[{width:200,
				layout: 'form',
				baseCls: 'x-plain',
				items:[name]
			},{width:200,
				layout: 'form',
				baseCls: 'x-plain',
				items:[date]
			},{width:200,
				layout: 'form',
				baseCls: 'x-plain',
				items:[type]
			},{style: 'padding-left:30px',
				baseCls: 'x-plain',
				items:[_querybutton]
			}]
    });
	var panel=new Ext.Panel({
		title:'�ļ����ݵ�����־',
		border:false,
		layout:'border',
		autoScroll:true,
		items:[query,gpanel]
	});
	return panel;
}