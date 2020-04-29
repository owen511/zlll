Ext.lt.console.component.performancelog=new function(){
	this.datads = new Ext.data.Store({
		reader:new Ext.data.ArrayReader({}, [{name:"server"}, {name:"accesscount"}, {name:"preRuntime"}, {name:"maxRuntime"}, {name:"minRuntime"}])
	});
	this.model = new Ext.grid.ColumnModel([
		new Ext.grid.RowNumberer(), 
		{header:"�����������", width:4, sortable:true,menuDisabled:true, locked:false, dataIndex:"server"}, 
		{header:"������", width:2, sortable:true,menuDisabled:true, locked:false, dataIndex:"accesscount"},
		{header:"ƽ��ִ��ʱ��(ms)", width:2, sortable:true,menuDisabled:true, locked:false, dataIndex:"preRuntime"},
		{header:"���ִ��ʱ��(ms)", width:1, sortable:true,menuDisabled:true, locked:false, dataIndex:"maxRuntime"},
		{header:"��Сִ��ʱ��(ms)", width:1, sortable:true,menuDisabled:true, locked:false, dataIndex:"minRuntime"}]);
	this.panel = new Ext.grid.GridPanel({
				title:'���������־',
				layout:"fit",
				iconCls:"grid", 
				border:0, 
				store:this.datads, 
				cm:this.model, 
				viewConfig: {forceFit:true},   
				frame:true,
				tbar:[{text:"�����־",pressed:true, handler:function(){Ext.lt.RCP.server("framework_performancelog",'clearPerformancelogs',null,function(){alert("���������־������ϣ�")})}}]
			});
	
	var _interval = -1;
	
	var startFlash=function(){
		if(_interval != -1) return;
			// ͨ����ʱ������ָ�����ݣ�ÿ5����ˢ��һ��
			_interval=window.setInterval(function(){
				Ext.lt.RCP.server("framework_performancelog",'getPerformancelogs',null,function(reps){
						// ͨ��Զ�̵��û�ȡ���µ���־��¼
						var loaddata = new Array();
						for (var i = 0; i < reps.length; i++) {
							if(reps[i].server!='com.longtu.managerconsole.monitor.PerformancelogComponent')
							loaddata.push([reps[i].server,reps[i].accesscount, reps[i].preRuntime, reps[i].maxRuntime, reps[i].minRuntime]);
						}
						Ext.lt.console.component.performancelog.datads.loadData(loaddata);
					})
					window.status="call"+Ext.lt.getNextSeqValue();
				},1000);
	};
		
	var stopFlash=function(){
		if(_interval!=-1) window.clearInterval(_interval);
	};
	
	this.panel.on('destroy',stopFlash);
	this.panel.on('hide',stopFlash);
	this.panel.on('show',startFlash);

	this.show=function(){
	// ������ʱ����
		startFlash();
		return  Ext.lt.console.component.performancelog.panel;
	};
}