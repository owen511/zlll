//Ext.lt.portal.component.common.IfmisDefaultTitle
if (Ext.lt.portal.component == null) {
	Ext.lt.portal.component = {};
}
var para_login = new Object();
var boflash_index=0;
Ext.lt.portal.component.boflash = new function () {
	boflash_index++;
	this.server = "";
	this.getBOflash = function (boflashinfo,server) {
	    var panelheight = (document.body.clientHeight-50)/2;
		Ext.lt.portal.component.boflash.server=server;
		if (boflashinfo == null) {
			boflashinfo = new Object();
		}
		var setHtml = []; 
		
		setHtml.push("<div id=\"bo"+boflashinfo.boflashfileid+"\" style=\"height:" + (panelheight - 30) + "px;\">");
		setHtml.push("<object   classid= \"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000 \"   codebase= \"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0 \"   width= \"100%\"   height= \"100%\">"); 
		setHtml.push("<EMBED src=\""+boflashinfo.basePath+"/showflash.do?path="+boflashinfo.boflashfileid +"\" width=100% height=100% autostart=true >");
		setHtml.push("</EMBED>");
		setHtml.push("</object>");
		setHtml.push("</div>");
		//var retboflashpanel = new Ext.Panel({title:boflashinfo.name,panelheight:330,height:330,html:''});
		var retboflashpanel = new Ext.Panel({title:boflashinfo.name,panelheight:panelheight,height:panelheight,html:''});
		window.setTimeout(function(){
			retboflashpanel.body.update(setHtml.join(''));
		},1000*boflash_index*0.5);
		retboflashpanel.getname=function(){
			return retboflashpanel.title;
		}
		return retboflashpanel;
	};
};
	

