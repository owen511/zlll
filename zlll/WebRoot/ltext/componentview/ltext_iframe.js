//Ext.lt.portal.component.common.IfmisDefaultTitle
if (Ext.lt.portal.component == null) {
	Ext.lt.portal.component = {};
}
Ext.lt.portal.component.iframe = new function () {
	this.IfmisDefIframe = function (server,config) {
		return new Ext.Panel({title:config.name,height:300,layout:'fit',html:"<iframe src='"+config.url+"/>"});
	}
	this.deploy = function () {
		this.show = function (com,fn) {
			if (Ext.getCmp("iframe_deploy") == null) {
				new Ext.Window({title:"默认窗口配置", width:700, height:400, layout:"column", plain:true, id:"iframe_deploy", items:[
						{columnWidth:0.5, layout:"form", border:false, items:[{id:"iframe_deploy_name", xtype:"textfield", fieldLabel:"栏目名称", name:"name"}]}, 
						{columnWidth:0.5, layout:"form", border:false, items:[{id:"iframe_deploy_index", xtype:"textfield", fieldLabel:"连接地址", name:"page"}]}
						], buttons:[{text:"\u5b8c\u6210", handler:function () {
							var config=new Object();
							config.name=Ext.getCmp("iframe_deploy_name").getValue();
							config.url=Ext.getCmp("iframe_deploy_index").getValue();
							fn(config,"defaultiframe");
						Ext.getCmp("iframe_deploy").hide();
				}}]});
			}
			Ext.getCmp("iframe_deploy").show();
			Ext.getCmp("iframe_deploy_name").setValue("");
			Ext.getCmp("iframe_deploy_index").setValue("");
		};
	};
};

