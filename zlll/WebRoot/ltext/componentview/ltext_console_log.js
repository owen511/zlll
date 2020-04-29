Ext.lt.console.component.accesslog=function(sid,config){
	
	Ext.lt.console.component.accesslog.instance=this;
	
	// TODO: �˴�Զ�̵��÷�������ȡϵͳ������־��Ϣ
	//var logdata={data:[{'url':'/default.page','access_count':9827,'access_pretime':123.2,'access_maxtime':123.2,'access_mintime':123.2}]};
	var logdata={data:[]};
	//debugger;
	var logcolumn=[{name:'url',alias:'���ʵ�ַ',width:250},
	               {name:'accesstype',alias:'��������',width:100},
	               {name:'accesscount',alias:"������",width:100,datatype:'N'},
	               {name:'runtime',alias:"����ʱ��(ms)",width:150,datatype:'N'},
	               {name:'preRuntime',alias:"ƽ��ִ��ʱ��(ms)",width:150,datatype:'N'},
	               {name:'maxRuntime',alias:"���ִ��ʱ��(ms)",width:150,datatype:'N'},
	               {name:'minRuntime',alias:"��Сִ��ʱ��(ms)",width:150,datatype:'N'}];
	var _interval = -1;
	this.dd = new Ext.lt.recordset();
	this.dd.setData(logdata.data);
	
	this.dt = new Ext.lt.datatable(this.dd);
	this.dt.setCols(logcolumn);
	this.dt.headsort(true);
	
	this.panel = new Ext.Panel({
		title:'������־����',
		border:false,
		tbar:[{text:"�����־",pressed:true, handler:function(){Ext.lt.RCP.server("framework_accesslog",'clearAccessPageLogs',null,function(){alert("ҳ�������־�������")})}}],
		autoScroll:true
	});
	
	var startFlash=function(){
		if(_interval != -1) return;
			// ͨ����ʱ������ָ�����ݣ�ÿ5����ˢ��һ��
			_interval=window.setInterval(function(){
				Ext.lt.RCP.server("framework_accesslog",'getAccessPageLog',null,function(r){
						// ͨ��Զ�̵��û�ȡ���µ���־��¼
						//r={data:[{'url':'/default.page'+Ext.lt.getNextSeqValue(),'access_count':9827,'access_pretime':123.2,'access_maxtime':123.2,'access_mintime':123.2}]};;
						window.status=""+Object.toJSON(r);
						Ext.lt.console.component.accesslog.instance.dd.clear();
						Ext.lt.console.component.accesslog.instance.dd.setData(r);
						Ext.lt.console.component.accesslog.instance.dt.reflash();
					})
					window.status="call"+Ext.lt.getNextSeqValue()
					// ����ģ��Զ�̵��õĽ��
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

	// ������ʱ����
	startFlash();
	
	return this.panel;
}