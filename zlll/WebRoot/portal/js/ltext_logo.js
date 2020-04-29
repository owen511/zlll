//Ext.lt.portal.component.common.IfmisDefaultTitle
if(Ext.lt.portal==null) Ext.lt.portal = {component:{}};
if (Ext.lt.portal.component == null) {
	Ext.lt.portal.component = {};
}	
var para_login = new Object();
Ext.lt.portal.component.logo = new function () {

this.server = "";
	this.IfmisDefaultLogo = function (logoinfo,server) {
		if(document.all){
			window.moveTo(0,0);
			top.window.resizeTo(screen.availWidth,screen.availHeight); 
		}
		Ext.lt.portal.component.logo.server=server;
		
		if (logoinfo == null) {
			logoinfo = new Object();
		}
		if (logoinfo.outname == null || logoinfo.outname == "") {
			logoinfo.outname = "\u9000\u51fa";
		}
		if (logoinfo.indexname == null || logoinfo.indexname == "") {
			logoinfo.indexname = "\u9996\u9875";
		}
		//Ext.lt.RCP.call("defaultlogoservice", "load", null, function (resp) {
			//var logoinfo = eval("[" + resp.responseText + "]")[0];
			//debugger;
			var setHtml = []; 
			setHtml.push("<div id=\"logo\">");
			setHtml.push( "<table border=\"0\"cellspacing=\"0\"cellpadding=\"0\" ><tr><th rowspan=\"2\"nowrap=\"nowrap\"></th><td style=\"font-size:12;\"nowrap=\"nowrap\">");
			setHtml.push( "<div><a title=\"" + logoinfo.outname);
			setHtml.push( "\"href=\"/logout.page\"><img src=\""+_ROOT_PATH_+"/images/actions/exit.gif\"width=\"16\"height=\"16\"border=\"0\"/>" + logoinfo.outname);
			setHtml.push( "</a></div><div class=\"w_gang\"></div>");
			setHtml.push( "<div><a title=\"" + logoinfo.indexname + "\"href=\"/login/default.page\"><img src=\""+_ROOT_PATH_+"/images/actions/house.gif\"width=\"16\"height=\"16\"/>" + logoinfo.indexname + "</a></div><div class=\"w_gang\"></div>");
			//setHtml.push( "<div><img src=\""+_ROOT_PATH_+"/images/actions/font_size.gif\"width=\"16\"height=\"16\"border=\"0\"title=\"\u5b57\u53f7\"/><a href=\"#\"onclick=\"setFont('l')\">\u5927</a><a href=\"#\"onclick=\"setFont('m')\">\u4e2d</a><a href=\"#\"onclick=\"setFont('s')\">\u5c0f</a></div><div class=\"w_gang\"></div>");
			if (logoinfo.isportalca == null) {
				logoinfo.isportalca = false;
			}
			if (logoinfo.isportalca != false) {
				setHtml.push( "<div><a title=\"\u4fee\u6539\u5bc6\u7801\"href=\"javascript:modpsd()\"><img src=\""+_ROOT_PATH_+"/images/actions/mod_pwd.gif\"width=\"16\"height=\"16\"border=\"0\"/>\u4fee\u6539\u5bc6\u7801</a></div><div class=\"w_gang\"></div>");
			}
			if (logoinfo.intranetConfig != null && logoinfo.intranetConfig != "") {
				setHtml.push( "<div><a title=\"\u8fdb\u5165\u5185\u7f51\"href=\"" + logoinfo.intranetConfig + "\"><img src=\""+_ROOT_PATH_+"/images/actions/go_innerNet.gif\"width=\"16\"height=\"16\"/>\u5185\u7f51</a></div><div class=\"w_gang\"></div>");
			}
			//setHtml.push( "<div><a title=\"个性化设置\"href=\"#\" onclick='Ext.lt.portal.seft.IfmisDefSeft();'><img src=\""+_ROOT_PATH_+"/images/actions/go_innerNet.gif\"width=\"16\"height=\"16\"/>个性化设置</a></div><div class=\"w_gang\"></div>");
			setHtml.push( "<div class=\"w_head\"></div>");
			setHtml.push( "<td width=\"6\"nowrap=\"nowrap\"class=\"w_right\">&nbsp;</td>");
			setHtml.push( "</tr>");
			setHtml.push( "<tr>");
			setHtml.push( "<td nowrap=\"nowrap\"class=\"welcomeA\">");
//			setHtml.push( "登录次数:"+logoinfo.logintotal+"  ");
			setHtml.push( "上次登录时间:"+logoinfo.lasttime+"  ");
			if (logoinfo.agencyType != null && logoinfo.agencyType != "") {
				if(logoinfo.currentagencytype!=null&&logoinfo.currentuseragency!=null&&logoinfo.currentuseragency.shortname!=null){
					setHtml.push( logoinfo.currentagencytype + ":" + logoinfo.currentuseragency.shortname+" ");
				}
			} else {
				if (logoinfo.currentuseragencyname != null && logoinfo.currentuseragencyname != "") {
					setHtml.push( "\u5355\u4f4d:" + logoinfo.currentuseragency.name+" ");
				} else {
					if (logoinfo.currentuseragencyname != null && logoinfo.currentuseragencyname != "") {
					}
				}
			}
			if (logoinfo.showAcctsystype != null && logoinfo.showAcctsystype != "") {
				setHtml.push( "\u8d26\u5957:" + logoinfo.showAcctsystype+" ");
			}
			setHtml.push( "\u7528\u6237:" + logoinfo.currentuser.name+"  ");
			if (logoinfo.agencyType != null && logoinfo.agencyType != "") {
				setHtml.push( "\u65e5\u671f:");
			} else {
				setHtml.push( "\u7cfb\u7edf\u65e5\u671f:");
			}
			setHtml.push( "<span id=cdate>" + logoinfo.sysdate + "</span></td><td nowrap=\"nowrap\">&nbsp;</td></tr></table></div>");
			//var bd = Ext.getCmp("systemlogo");
			//debugger;
			//bd.body.update(setHtml.join(''));
			var retlogopanel = new Ext.Panel({id:"systemlogo",html:setHtml.join('')});
			retlogopanel.on('afterlayout',function(panel,layout){
				//panel.setHeight(80);
			});
		//});
		return retlogopanel;
	};
};
	function modpsd() {
		if (Ext.getCmp("mod_psd") == null) {
			new Ext.Window({title:"修改密码", width:400, closable :false,height:147, layout:"column", plain:true, id:"mod_psd", items:[
								{columnWidth:1, layout:"form", border:false, items:[{id:"oldpsd", xtype:"textfield",inputType:"password",anchor: '100%', fieldLabel:"旧密码", name:"oldpsd"}]}, 
								{columnWidth:1, layout:"form", border:false, items:[{id:"newpsd", xtype:"textfield", inputType:"password",anchor: '100%',fieldLabel:"新密码", name:"newpsd"}]},
								{columnWidth:1, layout:"form", border:false, items:[{id:"newpsd1", xtype:"textfield", inputType:"password",anchor: '100%',fieldLabel:"确认密码", name:"newpsd1"}]}
								], buttons:[{text:"\u5b8c\u6210",width:15, handler:function () {
									var config=new Object();
									config.oldpsd=Ext.getCmp("oldpsd").getValue();
									config.newpsd=Ext.getCmp("newpsd").getValue();
									config.newpsd1=Ext.getCmp("newpsd1").getValue();
									var result = queren_modpwd(config.oldpsd,config.newpsd,config.newpsd1);
									if(result){
										Ext.lt.RCP.call(Ext.lt.portal.component.logo.server, "modifyPassword", config, function (resp) {
											if(resp == 1){
												alert("修改成功");
												Ext.getCmp("mod_psd").hide();
												Ext.lt.template.unmask();
											}else{
												alert(resp);
												Ext.getCmp("mod_psd").hide();
												Ext.lt.template.unmask();
											}
										});
									}else {
										Ext.getCmp("mod_psd").hide();
										Ext.lt.template.unmask();
										return;
									}
								
			}},{text:"取消",width:15, handler:function () {
									Ext.getCmp("mod_psd").hide();
									Ext.lt.template.unmask();
									}}]});
		}
			Ext.getCmp("mod_psd").show();
			Ext.lt.template.mask();
			Ext.getCmp("oldpsd").setValue("");
			Ext.getCmp("newpsd").setValue("");
			Ext.getCmp("newpsd1").setValue("");
	}
	
	function queren_modpwd(oldpwd,newpwd,newpwd1){
		if(oldpwd==null||oldpwd==""){	
			alert("请填写原先密码");
			return false;
		}
		if(newpwd==null||newpwd==""){
			alert("请填写新密码");
			return false;
		}
		
		if(newpwd.length<6){
			alert("密码长度最少6位");
			return false;
		}
		
		if(newpwd1==null||newpwd1==""){
			alert("请填写确认密码");
			return false;
		}
		
		if(newpwd1 != newpwd){
			alert("两次输入的新密码不一致");
			return false;
		}
		return true ;
	}

