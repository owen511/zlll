
// 定义Portal命名空间
if(Ext.lt.portal==null) Ext.lt.portal = {component:{}};
if (Ext.lt.portal.component == null) {
	Ext.lt.portal.component = {};
}
//t_portal_componentservice 表中serviceid



Ext.lt.portal.component.menu = new function () {
	this.IfmisDefaultMenu = function (menuinfo,server) {

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
		var retmenupanel = new Ext.Panel({id:"systemmenu",border:0,html:setHtml});
		return retmenupanel;
	};
	this.IfmisLeftMenu = function (config,server) {
		    var setHtml = "<ul class=\"quickmenu_list\"> ";
			config.menuinfo_tem = config.menuinfo_tem.replaceAll("┆", " ");
			setHtml += config.menuinfo_tem;
			setHtml += "</ul>";
		return new Ext.Panel({title:"快捷方式",padding:10,weight:200,height:310,autoScroll:true, html:setHtml});;
	};
};



//Ext.lt.portal.component.common.IfmisDefaultTitle
if (Ext.lt.portal.component == null) {
	Ext.lt.portal.component = {};
}
var para_login = new Object();
Ext.lt.portal.component.logo = new function () {
this.server = "";
	this.IfmisDefaultLogo = function (logoinfo,server) {
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
		//Ext.lt.portal.RCP.call("defaultlogoservice", "load", null, function (resp) {
			//var logoinfo = eval("[" + resp.responseText + "]")[0];
			//debugger;
			var setHtml = []; 
			setHtml.push("<div id=\"logo\">");
			setHtml.push( "<table border=\"0\"cellspacing=\"0\"cellpadding=\"0\"><tr><th rowspan=\"2\"nowrap=\"nowrap\"></th><td nowrap=\"nowrap\">");
			setHtml.push( "<div><a title=\"" + logoinfo.outname);
			setHtml.push( "\"href=\"/logout.page\"><img src=\"/images/actions/exit.gif\"width=\"16\"height=\"16\"border=\"0\"/>" + logoinfo.outname);
			setHtml.push( "</a></div><div class=\"w_gang\"></div>");
			setHtml.push( "<div><a title=\"" + logoinfo.indexname + "\"href=\"/common/index.do\"><img src=\"/images/actions/house.gif\"width=\"16\"height=\"16\"/>" + logoinfo.indexname + "</a></div><div class=\"w_gang\"></div>");
			setHtml.push( "<div><img src=\"/images/actions/font_size.gif\"width=\"16\"height=\"16\"border=\"0\"title=\"\u5b57\u53f7\"/><a href=\"#\"onclick=\"setFont('l')\">\u5927</a><a href=\"#\"onclick=\"setFont('m')\">\u4e2d</a><a href=\"#\"onclick=\"setFont('s')\">\u5c0f</a></div><div class=\"w_gang\"></div>");
			if (logoinfo.isportalca == null) {
				logoinfo.isportalca = false;
			}
			if (logoinfo.isportalca != false) {
				setHtml.push( "<div><a title=\"\u4fee\u6539\u5bc6\u7801\"href=\"javascript:modpsd()\"><img src=\"/images/actions/mod_pwd.gif\"width=\"16\"height=\"16\"border=\"0\"/>\u4fee\u6539\u5bc6\u7801</a></div><div class=\"w_gang\"></div>");
			}
			if (logoinfo.intranetConfig != null && logoinfo.intranetConfig != "") {
				setHtml.push( "<div><a title=\"\u8fdb\u5165\u5185\u7f51\"href=\"" + logoinfo.intranetConfig + "\"><img src=\"/images/actions/go_innerNet.gif\"width=\"16\"height=\"16\"/>\u5185\u7f51</a></div><div class=\"w_gang\"></div>");
			}
			setHtml.push( "<div><a title=\"个性化设置\"href=\"#\" onclick='Ext.lt.portal.seft.IfmisDefSeft();'><img src=\"/images/actions/go_innerNet.gif\"width=\"16\"height=\"16\"/>个性化设置</a></div><div class=\"w_gang\"></div>");
			setHtml.push( "<div class=\"w_head\"></div>");
			setHtml.push( "<td width=\"6\"nowrap=\"nowrap\"class=\"w_right\">&nbsp;</td>");
			setHtml.push( "</tr>");
			setHtml.push( "<tr>");
			setHtml.push( "<td nowrap=\"nowrap\"class=\"welcomeA\">");
			if (logoinfo.agencyType != null && logoinfo.agencyType != "") {
				if(logoinfo.currentagencytype !=null&&logoinfo.currentuseragency!=null&& logoinfo.currentuseragency.shortname!=null){
					setHtml.push( logoinfo.currentagencytype + ":" + logoinfo.currentuseragency.shortname);
				}
			} else {
				if (logoinfo.currentuseragencyname != null && logoinfo.currentuseragencyname != "") {
					setHtml.push( "\u5355\u4f4d:" + logoinfo.currentuseragency.name);
				} else {
					if (logoinfo.currentuseragencyname != null && logoinfo.currentuseragencyname != "") {
					}
				}
			}
			if (logoinfo.showAcctsystype != null && logoinfo.showAcctsystype != "") {
				setHtml.push( "\u8d26\u5957:" + logoinfo.showAcctsystype);
			}
			setHtml.push( "\u7528\u6237:" + logoinfo.currentuser.name);
			if (logoinfo.agencyType != null && logoinfo.agencyType != "") {
				setHtml.push( "\u65e5\u671f:");
			} else {
				setHtml.push( "\u7cfb\u7edf\u65e5\u671f:");
			}
			setHtml.push( "<span id=cdate>" + logoinfo.sysdate + "</span></td><td nowrap=\"nowrap\">&nbsp;</td></tr></table></div>");
			//var bd = Ext.getCmp("systemlogo");
			//debugger;
			//bd.body.update(setHtml.join(''));
		var retlogopanel = new Ext.Panel({id:"systemlogo", html:setHtml.join('')});
		//});
		return retlogopanel;
	};
};
	function modpsd() {
		if (Ext.getCmp("mod_psd") == null) {
			new Ext.Window({title:"修改密码", width:400, closable :false,height:147, layout:"column", plain:true, id:"mod_psd", items:[
								{columnWidth:1, layout:"form", border:false, items:[{id:"oldpsd", xtype:"textfield",inputType:"password", fieldLabel:"旧密码", name:"oldpsd"}]}, 
								{columnWidth:1, layout:"form", border:false, items:[{id:"newpsd", xtype:"textfield", inputType:"password",fieldLabel:"新密码", name:"newpsd"}]},
								{columnWidth:1, layout:"form", border:false, items:[{id:"newpsd1", xtype:"textfield", inputType:"password",fieldLabel:"确认密码", name:"newpsd1"}]}
								], buttons:[{text:"取消",width:15, handler:function () {
									Ext.getCmp("mod_psd").hide();
									Ext.lt.template.unmask();
									}},{text:"\u5b8c\u6210",width:15, handler:function () {
									var config=new Object();
									config.oldpsd=Ext.getCmp("oldpsd").getValue();
									config.newpsd=Ext.getCmp("newpsd").getValue();
									config.newpsd1=Ext.getCmp("newpsd1").getValue();
									var result = queren_modpwd(config.oldpsd,config.newpsd,config.newpsd1);
									if(result){
										Ext.lt.RCP.call(Ext.lt.portal.component.logo.server, "modifyPassword", config, function (resp) {
											if(resp == 1){
												alert("修改成功");
												Ext.lt.template.unmask();
											}else{
												alert(resp);
												Ext.lt.template.unmask();
											}
										});
									}else {
										return;
									}
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

//Ext.lt.portal.component.common.IfmisDefaultTitle
if (Ext.lt.portal.component == null) {
	Ext.lt.portal.component = {};
}
Ext.lt.portal.component.beizhu = new function () {
	this.bzDS = new Ext.data.Store({reader:new Ext.data.ArrayReader({}, [{name:"no"}, {name:"task"}])});
	this.bzModel = new Ext.grid.ColumnModel([
		new Ext.grid.RowNumberer(), {header:"no",sortable:true, locked:false, dataIndex:"no"}, 
		{header:"\u5185\u5bb9", sortable:true, locked:false, dataIndex:"task"}
		]);
	this.bzData = new Ext.grid.GridPanel({layout:"fit", columnWidth:.98 ,height:200,iconCls:"grid", border:0, store:this.bzDS, cm:this.bzModel, frame:true, tbar:[{text:"\u6dfb\u52a0", iconCls:"select", pressed:true, handler:function () {
		alert(1);
	}, scope:this}, "-", {text:"\u5220\u9664", iconCls:"select", pressed:true, handler:function () {
		alert("\u6682\u4e0d\u652f\u6301\u5207\u6362\u6a21\u7248");
	}}]});
		this.bzDatafn = function (datas) {
		var loaddata = new Array();
		/*
		for (var i = 0; i < datas.length; i++) {
			loaddata[i] = new Array(datas[i].no, datas[i].task);
		}
		this.bzDS.loadData(loaddata);
		*/
	};
	this.getNote = function (menuinfo,server) {
		var datas = menuinfo.usertask;
		var retmenupanel = new Ext.Panel({title:menuinfo.name,height:220, autoScroll:false, items:Ext.lt.portal.component.beizhu.bzData});
		retmenupanel.getname = function () {
			return retmenupanel.title;
		};
		Ext.lt.portal.component.beizhu.bzDatafn(datas);
		return retmenupanel;
	};
};

//Ext.lt.portal.component.common.IfmisDefaultTitle
if (Ext.lt.portal.component == null) {
	Ext.lt.portal.component = {};
}
Ext.lt.portal.component.calendar = new function () {
	this.IfmisDefCalendar = function (config,server) {
		//日历
		var DatePicker = new Ext.DatePicker({style:{"width":"100%", "height":"100%"}, listeners:{"render":function (dp) {
				//取得DatePicker的DOM节点的第一个子节点
			var outerTable = dp.el.dom.firstChild;
				//取得DatePicker的顶部导航条
			var tbar = outerTable.firstChild.childNodes[0];
				//取得DatePicker的主体
			var main = outerTable.firstChild.childNodes[1];
				//取得DatePicker底部工具条
			var bbar = outerTable.firstChild.childNodes[2];
			var innerTable = main.firstChild.firstChild;
				//
			var thead = innerTable.firstChild;
				//使用行内样式修改
			outerTable.style.width = "100%";
			outerTable.style.height = "100%";
				//以下为解决DatePicker变形
			tbar.style.height = "30px";
			bbar.style.height = "30px";
			innerTable.style.height = "100%";
			thead.firstChild.style.height = "20px";
		}}});
		DatePicker.on("select", function (src, date) {
			if (DatePicker.value.format("Y-m-d") == "2011-02-17") {
				reminderCodeData = {records:reminderCodeDataRecords2};
				reminderCodeStore.loadData(reminderCodeData);
			} else {
				reminderCodeData = {records:reminderCodeDataRecords};
				reminderCodeStore.loadData(reminderCodeData);
			}
		});
		return new Ext.Panel({
                    title: '日历',
//                    tools: tools,
					items:DatePicker
                });
	};
	this.deploy = function () {
		this.show = function (com, fn) {
			if (Ext.getCmp("calendar_deploy") == null) {
				new Ext.Window({title:"\u9ed8\u8ba4\u7a97\u53e3\u914d\u7f6e", width:700, height:400, layout:"column", plain:true, id:"calendar_deploy", items:[{columnWidth:0.5, layout:"form", border:false, items:[{id:"calendar_deploy_linkage", xtype:"textfield", fieldLabel:"是否与备忘录联动", name:"linkage"}]}], buttons:[{text:"\u5b8c\u6210", handler:function () {
					var config = new Object();
					config.name = "日历";
					config.url = Ext.getCmp("calendar_deploy_index").getValue();
					fn(config, "defaultiframe");
					Ext.getCmp("calendar_deploy").hide();
				}}]});
			}
			Ext.getCmp("calendar_deploy").show();
			Ext.getCmp("calendar_deploy_index").setValue("");
		};
	};
};


//Ext.lt.portal.component.common.IfmisDefaultTitle
if (Ext.lt.portal.component == null) {
	Ext.lt.portal.component = {};
}
Ext.lt.portal.component.zfcgpengding = new function () {
	this.getZFCGpengdingtask = function (menuinfo,server) {
		var task_list = menuinfo.pengdingtask;
		var setHtml = "";
		setHtml += "<div style=\"height:220px;overflow:auto;\">";
		//setHtml += "<a href=\""+task_list[0].joburi+"\">asdf</a>";
		for(var i=0;i<task_list.size();i++){
			setHtml += "<a href=\""+task_list[i].joburi+"\">"+task_list[i].statusname+"</a><br>";
		}
		setHtml += "</div>";
		//alert(setHtml);
		var retmenupanel = new Ext.Panel({title:menuinfo.name,padding:'0 0 0 10',autoScroll:false, html:setHtml});
		retmenupanel.getname=function(){
			return retmenupanel.title;
		}
		return retmenupanel;
	};
};


