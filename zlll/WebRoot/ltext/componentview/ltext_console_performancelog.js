Ext.lt.console.component.performancelog=new function(){
	this.datads = new Ext.data.Store({
		reader:new Ext.data.ArrayReader({}, [{name:"server"}, {name:"accesscount"}, {name:"preRuntime"}, {name:"maxRuntime"}, {name:"minRuntime"}])
	});
	this.model = new Ext.grid.ColumnModel([
		new Ext.grid.RowNumberer(), 
		{header:"访问组件服务", width:4, sortable:true,menuDisabled:true, locked:false, dataIndex:"server"}, 
		{header:"访问量", width:2, sortable:true,menuDisabled:true, locked:false, dataIndex:"accesscount"},
		{header:"平均执行时间(ms)", width:2, sortable:true,menuDisabled:true, locked:false, dataIndex:"preRuntime"},
		{header:"最大执行时间(ms)", width:1, sortable:true,menuDisabled:true, locked:false, dataIndex:"maxRuntime"},
		{header:"最小执行时间(ms)", width:1, sortable:true,menuDisabled:true, locked:false, dataIndex:"minRuntime"}]);
	this.panel = new Ext.grid.GridPanel({
				title:'组件性能日志',
				layout:"fit",
				iconCls:"grid", 
				border:0, 
				store:this.datads, 
				cm:this.model, 
				viewConfig: {forceFit:true},   
				frame:true,
				tbar:[{text:"清除日志",pressed:true, handler:function(){Ext.lt.RCP.server("framework_performancelog",'clearPerformancelogs',null,function(){alert("组件性能日志清理完毕！")})}}]
			});
	
	var _interval = -1;
	
	var startFlash=function(){
		if(_interval != -1) return;
			// 通过定时器更新指定数据，每5秒钟刷新一次
			_interval=window.setInterval(function(){
				Ext.lt.RCP.server("framework_performancelog",'getPerformancelogs',null,function(reps){
						// 通过远程调用获取最新的日志记录
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
	// 启动定时任务
		startFlash();
		return  Ext.lt.console.component.performancelog.panel;
	};
}