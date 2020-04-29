//Ext.lt.portal.component.common.IfmisDefaultTitle
if (Ext.lt.portal.component == null) {
	Ext.lt.portal.component = {};
}
Ext.lt.portal.component.iframe = new function () {
	

	this.IfmisDefIframe = function (config,server) {
		//alert(config.url);
		//var panelheight = 330;
		var panelheight = (document.body.clientHeight-50)/2;
		var divheight = 303;
		var res = "";
		if(null!=config.defaultheight){
			panelheight = config.defaultheight;
			res = new Ext.Panel({title:config.name,tools:tools,panelheight:panelheight,html:"<div style=\"height:"+panelheight+"px;overflow:auto;\"/>"
			+"<iframe style=\"\" allowTransparency='true' width=100% height=25% src=''/>"
			+"<iframe style=\"\" allowTransparency='true' width=100% height=25% src=''/>"
			+"<iframe style=\"\" allowTransparency='true' width=100% height=25% src=''/>"
			+"<iframe style=\"\" allowTransparency='true' width=100% height=25% src=''/></div>"});			
		}else{
			res = new Ext.Panel({title:config.name,tools:tools,panelheight:panelheight,height:panelheight,html:"<div style=\"height:"+divheight+"px;overflow:auto;\"/><iframe style=\"\" width=100% height=100% src='"+config.url+"'/></div>"});
		}
		//var res = new Ext.Panel({title:config.name,panelheight:panelheight,html:"<div style=\"height:"+panelheight+"px;overflow:auto;\"/><iframe style=\"\" width=100% height=100% src='"+config.url+"'/></div>"});
		res.getname=function(){
			return res.title;
		}
		res.on('afterlayout',function(panel,layout){
				//panel.setHeight(267);
			});
		return res;
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
							fn(config,"ifr");
						Ext.getCmp("iframe_deploy").hide();
				}}]});
			}
			Ext.getCmp("iframe_deploy").show();
			Ext.getCmp("iframe_deploy_name").setValue("");
			Ext.getCmp("iframe_deploy_index").setValue("");
		};
	};
};

