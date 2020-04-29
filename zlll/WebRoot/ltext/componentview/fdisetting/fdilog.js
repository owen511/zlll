Ext.lt.console.component.fdilog=function(sid,config){
	
	//报表菜单数据结构
	
	var store= new Ext.data.GroupingStore({
		reader:new Ext.data.ArrayReader({}, [{name:'code'},{name:'configname'},{name:'operation'},{name:'rownumber'},{name:'time'},{name:'info'}]),
		groupField : 'configname'
	});
	var cm = new Ext.grid.ColumnModel([
		new Ext.grid.RowNumberer(),
			{header: "配置操作名称", width: 180, sortable: true,menuDisabled:true, dataIndex: 'configname'},
			{header: "日志类型", width: 50, sortable: true,menuDisabled:true, dataIndex: 'operation'},
			{header: "错误信息行数", width: 50, sortable: true,menuDisabled:true, dataIndex: 'rownumber'},
			{header: "操作时间", width: 100, sortable: true,menuDisabled:true, dataIndex: 'time'},
			{header: "详细信息", width: 300, sortable: true,menuDisabled:true, dataIndex: 'info'}
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
				    groupByText : '根据本列分组',
    			    showGroupsText : '是否采用分组显示',
    				groupTextTpl : '该类型日志信息<b><font color=red>{[values.rs.length]}</font></b> {[values.rs.length > 1 ? "个" : "个"]}'
				}),
			   stripeRows : true,
				viewConfig: {forceFit:true},
				sm:this.sm, 
				frame:true
		});
   var name=new Ext.form.TextField({fieldLabel: '配置操作名称',anchor: '99%'});
    var type=new Ext.form.ComboBox ({
		fieldLabel:"日志类型",
		anchor: '99%',
		store: new Ext.data.SimpleStore({
			fields : ['value', 'name'],
			data : [['', '无'],['导入出错', '导入出错'],['导入结束', '导入结束']]
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
		fieldLabel : '导入时间',
		value : new Date(),
		editable : false,
		format : 'Y-m-d',
		anchor: '99%'
	});
	
    var _querybutton=new Ext.Button({text: '查询',handler: function(){
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
    	layout:'column', //panel自适应
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
		title:'文件数据导入日志',
		border:false,
		layout:'border',
		autoScroll:true,
		items:[query,gpanel]
	});
	return panel;
}