//Ext.lt.portal.component.common.IfmisDefaultTitle
if (Ext.lt.portal.component == null) {
	Ext.lt.portal.component = {};
}
Ext.lt.portal.component.modpsd = new function () {
	this.IfmisDefaultMenu = function (server,menuinfo) {
//		Ext.lt.portal.RCP.call("defaultmenuservice", "load", null, function (resp) {
			var setHtml = "<div id=\"window_top\" ><div id=\"top\" ><div id=\"menu\"><table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tr>";
			if (menuinfo.isshowmenus) {
				setHtml += "<td width=\"20px\" style=\"color:#FFFFFF;\"><img src=\"/images/done_btn/pre.gif\" style=\"cursor:pointer;\" title=\"\u5411\u524d\" onclick=\"showPre()\"/></td>";
			}
			setHtml += "<td> <div id = \"idd\" style=\"overflow:hidden; width:expression(document.body.offsetWidth-40);\"> <ul id=\"m_ul\"><li>\u2506</li> ";
			
			setHtml += menuinfo.menuinfo_tem;
			setHtml += "</ul><div id='panelDiv'>";
			setHtml += "</div>";
			setHtml += "</div></td>";
			if (menuinfo.isshowmenus) {
				setHtml += "<td width=\"20px\"><img src=\"/images/done_btn/next.gif\" style=\"cursor:pointer;\" title=\"\u5411\u540e\" onclick=\"showNext()\"/></td>";
			}
			setHtml += "</tr></table></div></div></div>";
		var retmenupanel = new Ext.Panel({id:"systemmenu", html:setHtml});
		return retmenupanel;
	};
	this.IfmisLeftMenu = function (server,config) {
		    var setHtml = "<ul class=\"quickmenu_list\"> ";
			config.menuinfo_tem = config.menuinfo_tem.replaceAll("©ª", " ");
			setHtml += config.menuinfo_tem;
			setHtml += "</ul>";
		return new Ext.Panel({title:"¿ì½Ý·½Ê½",padding:10,weight:200,height:310,autoScroll:true, html:setHtml});;
	};
};

