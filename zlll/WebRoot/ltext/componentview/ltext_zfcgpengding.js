//Ext.lt.portal.component.common.IfmisDefaultTitle
if (Ext.lt.portal.component == null) {
	Ext.lt.portal.component = {};
}
Ext.lt.portal.component.zfcgpengding = new function () {
	this.getZFCGpengdingtask = function (server,menuinfo) {
		var task_list = menuinfo.pengdingtask;
		var setHtml = "";
		setHtml += "<div>";
		//setHtml += "<a href=\""+task_list[0].joburi+"\">asdf</a>";
		for(var i=0;i<task_list.size();i++){
			setHtml += "<a href=\""+task_list[i].joburi+"\">"+task_list[i].statusname+"</a><br>";
		}
		setHtml += "</div>";
		//alert(setHtml);
		var retmenupanel = new Ext.Panel({title:menuinfo.name,padding:10,weight:450,height:300,autoScroll:true, html:setHtml});
		retmenupanel.getname=function(){
			return retmenupanel.title;
		}
		return retmenupanel;
	};
};

