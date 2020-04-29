Ext.lt.console.component.accesslog=function(sid,config){
	
	Ext.lt.console.component.accesslog.instance=this;
	
	// TODO: 此处远程调用服务器获取系统访问日志信息
	//var logdata={data:[{'url':'/default.page','access_count':9827,'access_pretime':123.2,'access_maxtime':123.2,'access_mintime':123.2}]};
	var logdata={data:[]};
	//debugger;
	var logcolumn=[{name:'url',alias:'访问地址',width:250},
	               {name:'accesstype',alias:'访问类型',width:100},
	               {name:'accesscount',alias:"访问量",width:100,datatype:'N'},
	               {name:'runtime',alias:"运行时间(ms)",width:150,datatype:'N'},
	               {name:'preRuntime',alias:"平均执行时间(ms)",width:150,datatype:'N'},
	               {name:'maxRuntime',alias:"最大执行时间(ms)",width:150,datatype:'N'},
	               {name:'minRuntime',alias:"最小执行时间(ms)",width:150,datatype:'N'}];
	var _interval = -1;
	this.dd = new Ext.lt.recordset();
	this.dd.setData(logdata.data);
	
	this.dt = new Ext.lt.datatable(this.dd);
	this.dt.setCols(logcolumn);
	this.dt.headsort(true);
	
	this.panel = new Ext.Panel({
		title:'访问日志管理',
		border:false,
		tbar:[{text:"清除日志",pressed:true, handler:function(){Ext.lt.RCP.server("framework_accesslog",'clearAccessPageLogs',null,function(){alert("页面访问日志清理完毕")})}}],
		autoScroll:true
	});
	
	var startFlash=function(){
		if(_interval != -1) return;
			// 通过定时器更新指定数据，每5秒钟刷新一次
			_interval=window.setInterval(function(){
				Ext.lt.RCP.server("framework_accesslog",'getAccessPageLog',null,function(r){
						// 通过远程调用获取最新的日志记录
						//r={data:[{'url':'/default.page'+Ext.lt.getNextSeqValue(),'access_count':9827,'access_pretime':123.2,'access_maxtime':123.2,'access_mintime':123.2}]};;
						window.status=""+Object.toJSON(r);
						Ext.lt.console.component.accesslog.instance.dd.clear();
						Ext.lt.console.component.accesslog.instance.dd.setData(r);
						Ext.lt.console.component.accesslog.instance.dt.reflash();
					})
					window.status="call"+Ext.lt.getNextSeqValue()
					// 这里模拟远程调用的结果
					//r={data:[{'url':'/default.page'+Ext.lt.getNextSeqValue(),'access_count':9827,'access_pretime':123.2,'access_maxtime':123.2,'access_mintime':123.2}]};;
					//Ext.lt.console.component.accesslog.instance.dd.clear();
					//Ext.lt.console.component.accesslog.instance.dd.setData(r.data);
					//Ext.lt.console.component.accesslog.instance.dt.reflash();
				},1000);
	};
		
	var stopFlash=function(){
		if(_interval!=-1) window.clearInterval(_interval);
	};
	
	this.panel.on('afterlayout',function(pal,layout){
			Ext.lt.console.component.accesslog.instance.dt.draw(pal.body.dom);
		});
	this.panel.on('bodyresize',function(pal,w,h){
			Ext.lt.console.component.accesslog.instance.dt.resize(w,h);
		});
	this.panel.on('bodyresize',function(pal,w,h){
			Ext.lt.console.component.accesslog.instance.dt.resize(w,h);
		});
		
	this.panel.on('destroy',stopFlash);
	this.panel.on('hide',stopFlash);
	this.panel.on('show',startFlash);

	// 启动定时任务
	startFlash();
	
	return this.panel;
}