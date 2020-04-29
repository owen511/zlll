// ¼ì²éÃüÃû¿Õ¼ä
if (Ext.lt.mms == null) {
	Ext.lt.mms = {};
}
Ext.lt.mms.footshow = function(service, config) {
	Ext.lt.mms.footshow.service = service;
	var footShowPanel = new Ext.form.FormPanel({
				id : 'footShow',
				html : '<div><marquee direction="right">' + config.foot + '</marquee></div>'
			});
	return null;
}
