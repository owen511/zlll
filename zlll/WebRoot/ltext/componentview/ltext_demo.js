// 定义Ext.lt.demo 命名空间
if (Ext.lt.demo == null) {
	Ext.lt.demo = {component:{}};
}

Ext.lt.demo.component.hellowordpanel = function (sid,config) {

		var demopanel = new Ext.Panel({
				title:'helloword',
				padding:10,
				autoScroll:true,
				border:false,
				buttons :[
					{text: 'RCP TEST', listeners:{'click':function(){
							Ext.lt.RCP.call(sid,'getWord',['aa',[]], function(val){
									alert("call back "+val);
								});
						}}}
				],
				html:'<span style="font-size:20px;color:'+config.color+'">HELLO WORD '+config.msg+'</span>'
			});

		return demopanel;
};
