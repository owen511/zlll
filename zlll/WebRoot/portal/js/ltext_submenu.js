var content=new Object();
var submenutreeData={};
var submenutreeloader = new Ext.tree.TreeLoader({
    baseAttrs : {
     cust : 'client'
    }
   });
//Ext.lt.portal.component.common.IfmisDefaultTitle
if (Ext.lt.portal.component == null) {
	Ext.lt.portal.component = {};
}

Ext.lt.portal.component.submenu = new function () {
	this.server=null;
	this.IfmisDefaultLeve2Menu = function (config,server) {
		var retmenupanel = new Ext.Panel({width: 200,ayout:'border',items:[{id:"systemleve2menu",region:'center'}]});
		Ext.lt.RCP.call(server, "loadSubmenu",  main_menuid , function (resp) {
			var menuinfo = resp;
			submenutreeData=menuinfo.treemenus;
			 var submenutreepanel = new Ext.tree.TreePanel({
			    loader : submenutreeloader,
			    width : 199,
			    border : false,
			    rootVisible : false,
			    autoheigth : true,
			    expanded : true,
			    enableDD : true,
			    ddGroup : "tgDD",
			    id:'tree',
				root: new Ext.tree.AsyncTreeNode({
			            text:'Ext JS',
			            id:'root',
			            expanded:true,
			            children:[submenutreeData]
			         })
			   });
			submenutreepanel.on('click',function(node,event){
				if(node.leaf){
					if(node.id=="submenu.42000150"){
						Ext.getCmp('systemmain').layout.setActiveItem("pagemanager");
						return;
					}
					if(Ext.getCmp(node.id)==null){
						Ext.getCmp('systemmain').add({id:node.id,title:node.text,layout: 'fit',bodyStyle: 'padding:25px'});
					}
					Ext.getCmp('systemmain').layout.setActiveItem(node.id);
				}
			});
			Ext.getCmp('systemleve2menu').add(submenutreepanel);
			var leftbody = Ext.lt.template.currenttemplate.get("centermain").get("leftbody");
			Ext.getCmp('systemleve2menu').setHeight(leftbody.getHeight()-200);
			Ext.getCmp('systemleve2menu').doLayout();
    		// 让页头重新计算布局
			leftbody.doLayout();
			if (tempconfig.left.length > 0) {
				var width = 1;
				for (var i = 0; i < tempconfig.left.length; i++) {
					width += tempconfig.left[i].getWidth();
				}
				leftbody.setWidth(width);
			} else {
				leftbody.setWidth( tempconfig.left.getWidth()+1);
			}
			Ext.lt.template.currenttemplate.get("centermain").doLayout();
    		// 重新计算整个页面的布局
			Ext.lt.template.currenttemplate.doLayout();
			submenutreepanel.expandAll();
		});
		return retmenupanel;
	};
};

function setCenterPanel(id,text){
	if(Ext.getCmp(id)==null){
		Ext.getCmp('systemmain').add({id:node.id,title:text,layout: 'fit',bodyStyle: 'padding:25px'});
	}
	Ext.getCmp('systemmain').layout.setActiveItem(node.id);
}

