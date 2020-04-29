//Ext.lt.portal.component.common.IfmisDefaultTitle
if (Ext.lt.portal.component == null) {
	Ext.lt.portal.component = {};
}
Ext.lt.portal.component.beizhu = new function () {
	this.getNote = function (server,menuinfo) {
	var setHtml = "";
		var retmenupanel = new Ext.Panel({title:menuinfo.name,padding:10,height:200,autoScroll:true, html:setHtml});
		retmenupanel.getname=function(){
			return retmenupanel.title;
		}
		return retmenupanel;
	};
};

