//Ext.lt.portal.component.common.IfmisDefaultTitle
if (Ext.lt.portal.component == null) {
	Ext.lt.portal.component = {};
}
Ext.lt.portal.component.console = new function () {
	this.comnents = null;
	this.comnenttype = null;
	this.templates = null;
	this.config = null;
	this.showPageMangeData2 = function (datas) {
		var l = new Ext.lt.recordset();
		l.setData(datas);
		l.drawto(document.getElementById("pagemanger_datatable"));
	};
	this.showPageMangeData = function (datas) {
		var loaddata = new Array();
		for (var i = 0; i < datas.length; i++) {
			loaddata[i] = new Array(datas[i].url, datas[i].page, datas[i].template, datas[i].isidentifer);
		}
		this.pageMangeDataDS.loadData(loaddata);
	};
	this.pageMangeDataDS = new Ext.data.Store({reader:new Ext.data.ArrayReader({}, [{name:"url"}, {name:"page"}, {name:"template"}, {name:"isidentifier"}])});
	this.sm = new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	this.pageManageDataModel = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(), this.sm, {header:"url", width:200, sortable:true, locked:false, dataIndex:"url", renderer:function (value) {
		return value + ".page";
	}}, {header:"\u8fd4\u56de\u5730\u5740", width:200, sortable:true, locked:false, dataIndex:"page"}, {header:"\u9009\u62e9\u6a21\u7248ID", width:200, sortable:true, locked:false, dataIndex:"template"}, {header:"\u662f\u5426\u6709\u4e2a\u6027\u8bdd\u8bbe\u7f6e", width:200, sortable:true, dataIndex:"isidentifier", renderer:function (value) {
		if (value == null || value == 0) {
			value = "\u65e0";
		} else {
			value = "\u6709";
		}
		return value;
	}}]);
	this.PageMangeData = new Ext.grid.GridPanel({layout:"fit", iconCls:"grid", border:0, store:this.pageMangeDataDS, cm:this.pageManageDataModel, sm:this.sm, frame:true, tbar:[{text:"\u65b0\u5efa", iconCls:"select", pressed:true, handler:function () {
		Ext.lt.portal.component.console.templateWin(true);
	}, scope:this}, "-", {text:"\u5207\u6362\u6a21\u7248", iconCls:"select", pressed:true, handler:function () {
		alert("\u6682\u4e0d\u652f\u6301\u5207\u6362\u6a21\u7248");
	}, scope:this}, "-", {text:"\u4fee\u6539", iconCls:"cancel", pressed:true, handler:function () {
		alert("\u6682\u4e0d\u652f\u6301\u4fee\u6539\u529f\u80fd");
	}, scope:this}, "-", {text:"\u5220\u9664", iconCls:"cancel", pressed:true, handler:function () {
		var selectrow = Ext.lt.portal.component.console.PageMangeData.getSelectionModel().getSelected();
		Ext.lt.portal.RCP.call(Ext.lt.portal.component.console.server, "remove",  selectrow.data.url , function (resp) {
			debugger;
			if (resp!=null) {
				alert("\u5220\u9664\u6210\u529f");
				var data =resp;
				Ext.lt.portal.component.console.showPageMangeData(data);
				Ext.getCmp("pagemanager").doLayout();
			} else {
				alert("\u5220\u9664\u5931\u8d25");
			}
		});
	}, scope:this}, "-", {text:"\u7ec4\u4ef6\u6743\u9650\u8bbe\u7f6e", iconCls:"cancel", pressed:true, handler:function () {
		alert("\u6682\u4e0d\u652f\u6301\u6743\u9650\u8bbe\u7f6e");
	}, scope:this}]});
	this.PageMangeData.addListener("rowdblclick", function (grid, rowindex, e) {
		window.open(grid.getSelectionModel().getSelected().data.url + ".page");
	});
	this.pagemanager = function (service, config) {
		//获取页面信息
		Ext.lt.portal.component.console.server = service;
		Ext.lt.portal.RCP.call(Ext.lt.portal.component.console.server, "load", null, function (resp) {
			var data =resp;
			Ext.lt.portal.component.console.showPageMangeData(data);
			Ext.getCmp("pagemanager").doLayout();
		});
		//获取栏目内容
		Ext.lt.portal.RCP.call(Ext.lt.portal.component.console.server, "loadcomnents", null, function (resp) {
			this.comnents = resp[0];
			this.comnenttype = resp[1];
		});
		//获取模版信息
		Ext.lt.portal.RCP.call(Ext.lt.portal.component.console.server, "loadtemplates", null, function (resp) {
			this.templates = resp;
		});
		Ext.lt.portal.component.console.PageMangeData.region = "center";
		var ret = {id:"pagemanager", title:"\u9875\u9762\u914d\u7f6e", border:0, height:900, layout:"border", items:[Ext.lt.portal.component.console.PageMangeData]};
		//ret.height=Ext.lt.template.currenttemplate.get("centermain").getHeight();
		return ret;
	};
	this.templateWin = function (boo) {
		if (boo) {
			this.config = {name:"", url:"", page:""};
		}
		if (Ext.getCmp("templateWin") == null) {
			//获取模版信息
			var innerhtml = "";
			//var selecttemplatepanel = new Ext.Panel({layout:"form",autoFill:true,autoScroll : true});
			for (var i = 0; i < templates.length; i++) {
			//		var box={xtype: 'box',width: 150,height: 150, autoEl: {tag: 'img', src: templates[i].DEMOPIC}};
			//		selecttemplatepanel.add(box);
				innerhtml += "<div onmouseout=\"Ext.lt.portal.component.console.templatesBGColor('1',this);\" onmousemove=\"Ext.lt.portal.component.console.templatesBGColor('2',this);\" onclick=\"Ext.lt.portal.component.console.templatesBGColor('3',this,function(){Ext.lt.portal.component.console.seltemp='" + templates[i].ID + "'});\" style='width:130,height:130;float:left;background-color: #CEDAEA'>&nbsp;<img width=100 height=100 style='filter:alpha(opacity=30);' src='" + templates[i].DEMOPIC + "'/>&nbsp;</div>";
			}
			var selecttemplatepanel = new Ext.Panel({xtype:"panel", columnWidth:1, region:"center", layout:"fit", html:"<div align='left' id='templates_div' style='vertical-align:left;overflow:scroll;height:255px;background-color: #CEDAEA'>" + innerhtml + "</div>"});
			new Ext.Window({closeAction:"hide", title:"\u914d\u7f6e\u9875\u9762", width:700, height:400, layout:"column", plain:true, id:"templateWin", items:[{columnWidth:1, border:false, layout:"column", items:[{columnWidth:0.5, layout:"form", border:false, items:[this.urlfieldLabel]}, {columnWidth:0.5, layout:"form", border:false, items:[this.namefieldLabel]}]}, {columnWidth:1, layout:"form", items:this.jspfieldLabel}, selecttemplatepanel], buttons:[{text:"\u53d6\u6d88", handler:function () {
				Ext.lt.portal.component.console.seltemp == null;
				Ext.getCmp("templateWin").hide();
				Ext.lt.portal.component.console.clearMainBodyPanel();
			}}, {text:"\u4e0b\u4e00\u6b65", handler:function () {
				if (Ext.lt.portal.component.console.seltemp == null) {
					alert("\u8bf7\u9009\u62e9\u9875\u9762\u6a21\u7248");
					return;
				}
				Ext.lt.portal.component.console.config.url = Ext.getCmp("pageMange_url").getValue();
				Ext.lt.portal.component.console.config.name = Ext.getCmp("pageMange_name").getValue();
				Ext.lt.portal.component.console.config.page = Ext.getCmp("pageMange_page").getValue();
				Ext.lt.portal.component.console.config.template = Ext.lt.portal.component.console.seltemp;
				Ext.getCmp("templateWin").hide();
				Ext.lt.portal.component.console.defComnentWin();
			}}]});
		}
		Ext.getCmp("pageMange_url").setValue(this.config.url);
		Ext.getCmp("pageMange_name").setValue(this.config.name);
		Ext.getCmp("pageMange_page").setValue(this.config.page);
		Ext.getCmp("templateWin").show();
	};
	this.urlfieldLabel = {id:"pageMange_url", xtype:"textfield", fieldLabel:"\u9875\u9762\u5730\u5740", name:"url"};
	this.namefieldLabel = {id:"pageMange_name", xtype:"textfield", fieldLabel:"\u9875\u9762\u540d\u79f0", name:"name"};
	this.jspfieldLabel = {id:"pageMange_page", xtype:"textfield", fieldLabel:"\u8df3\u8f6cjsp", name:"page"};
	this.urlfieldLabel_lab = {id:"pageMange_url_lab", xtype:"textfield", fieldLabel:"\u9875\u9762\u5730\u5740", name:"url"};
	this.namefieldLabel_lab = {id:"pageMange_name_lab", xtype:"textfield", fieldLabel:"\u9875\u9762\u540d\u79f0", name:"name"};
	this.jspfieldLabel_lab = {id:"pageMange_page_lab", xtype:"textfield", fieldLabel:"\u8df3\u8f6cjsp", name:"page"};
	this.seltemp = null;
	this.selectDefComnent = new Ext.Panel({layout:"border", columnWidth:1, height:255, region:"center", items:[{region:"west", width:400, xtype:"tabpanel", border:4, margins:"4 4 4 4", activeTab:0, hidden:true, id:"selectCommonComnent_tab"}, {region:"west", width:400, xtype:"tabpanel", border:4, margins:"4 4 4 4", activeTab:0, id:"selectDefComnent_tab"}, {region:"center", xtype:"panel", margins:"4 4 4 4", id:"selectDefComnent_panel", border:false, layout:"border", items:[{id:"headbody_def", region:"north", border:false}, {region:"center", id:"mainbody_def_center", layout:"border", border:false, margins:"0 0 0 0", items:[{id:"leftbody_def", region:"west", border:false, margins:"0 0 0 0"}, {id:"mainbody_def", region:"center", layout:"column", autoScroll:true, border:false, margins:"0 0 0 0"}]}]}]});
	this.defTabPanelItems = new Object();
	this.createDefTabPanel = function (title, type) {
		var tabPanel = Ext.getCmp("selectDefComnent_tab");
		var tab = tabPanel.getItem(type);
		if (tab == null) {
			var html = "<div align='left' style='vertical-align:left;overflow:scroll;height:360px;background-color: #CEDAEA'>";
			for (var i = 0; i < comnents.length; i++) {
				if (comnents[i].COMPONENTCLASS == type) {
					html += "<div style='width:130,height:130;float:left;background-color: #CEDAEA' ondblclick=\"Ext.lt.portal.component.console.removeDefComponentDemo('" + type + "','" + comnents[i].VIEWID + "','" + comnents[i].DEMOPIC + "','" + comnents[i].REGION + "');\"  onclick=\"Ext.lt.portal.component.console.templatesBGColor('3',this,function(){Ext.lt.portal.component.console.setDefComponentDemo('" + type + "','" + comnents[i].VIEWID + "','" + comnents[i].DEMOPIC + "','" + comnents[i].REGION + "');});\" onmouseout=\"Ext.lt.portal.component.console.templatesBGColor('1',this);\" onmousemove=\"Ext.lt.portal.component.console.templatesBGColor('2',this);\">&nbsp;<img width=100 height=100 style='filter:alpha(opacity=30);' src='" + comnents[i].DEMOPIC + "'/>&nbsp;</div>";
				}
			}
			html += "</div>";
			tabPanel.add({title:title, html:html}).show();
		}
	};
	this.createCommonTabPanel = function () {
		var tabPanel = Ext.getCmp("selectCommonComnent_tab");
		for (var j = 0; j < comnenttype.length; j++) {
			var tab = tabPanel.getItem(comnenttype[j].COMPONENTCLASS);
			if (tab == null) {
				var html = "<div align='left' style='vertical-align:left;overflow:scroll;height:360px;background-color: #CEDAEA'>";
				for (var i = 0; i < comnents.length; i++) {
					if (comnents[i].COMPONENTCLASS == comnenttype[j].COMPONENTCLASS) {
						html += "<div style='width:130,height:130;float:left;background-color: #CEDAEA' ondblclick=\"Ext.lt.portal.component.console.createComponent('" + comnents[i].COMPONENTID + "');\"  onclick=\"Ext.lt.portal.component.console.templatesBGColor('3',this);\" onmouseout=\"Ext.lt.portal.component.console.templatesBGColor('1',this);\" onmousemove=\"Ext.lt.portal.component.console.templatesBGColor('2',this);\">&nbsp;<img width=100 height=100 style='filter:alpha(opacity=30);' src='" + comnents[i].DEMOPIC + "'/>&nbsp;</div>";
					}
				}
				html += "</div>";
				tabPanel.add({title:comnenttype[j].COMPONENTCLASSNAME, html:html, id:comnenttype[j].COMPONENTCLASS}).show();
			}
		}
	};
	this.defComnentWin = function () {
		Ext.getCmp("selectDefComnent_tab").removeAll();
		if (this.config.template != "onpagetemplate") {
			this.createDefTabPanel("logo", "logo");
			this.createDefTabPanel("\u4e3b\u83dc\u5355", "menu");
			if (this.config.template == "toplefttemplate") {
				this.createDefTabPanel("\u4e8c\u7ea7\u83dc\u5355", "submenu");
			}
		} else {
			Ext.getCmp("selectDefComnent_tab").add({title:"\u6682\u65e0\u5fc5\u9009\u9879", html:"<div align='center' style='height:360px;background-color: #CEDAEA'>\u6682\u65e0\u5fc5\u9009\u9879</div>"}).show();
		}
		if (Ext.getCmp("defComnentWin") == null) {
			this.createCommonTabPanel();
			new Ext.Window({closeAction:"hide", title:"\u914d\u7f6e\u9875\u9762", width:700, height:400, layout:"column", plain:true, id:"defComnentWin", items:[{columnWidth:1, border:false, layout:"column", items:[{columnWidth:0.5, layout:"form", border:false, items:[this.urlfieldLabel_lab]}, {columnWidth:0.5, layout:"form", border:false, items:[this.namefieldLabel_lab]}]}, {columnWidth:1, layout:"form", items:this.jspfieldLabel_lab}, this.selectDefComnent], buttons:[{text:"\u53d6\u6d88", handler:function () {
				Ext.lt.portal.component.console.seltemp == null;
				Ext.getCmp("defComnentWin").hide();
				Ext.lt.portal.component.console.clearMainBodyPanel();
			}}, {text:"\u4e0a\u4e00\u6b65", handler:function () {
				if (Ext.getCmp("defComnentWin").buttons[2].getText() == "\u4e0b\u4e00\u6b65") {
					Ext.getCmp("defComnentWin").hide();
					Ext.lt.portal.component.console.setConfigManage();
					Ext.lt.portal.component.console.templateWin(false);
				} else {
					Ext.getCmp("selectDefComnent_tab").setVisible(true);
					Ext.getCmp("selectCommonComnent_tab").setVisible(false);
					Ext.getCmp("defComnentWin").buttons[2].setText("\u4e0b\u4e00\u6b65");
				}
			}}, {text:"\u4e0b\u4e00\u6b65", handler:function () {
				if (Ext.getCmp("defComnentWin").buttons[2].getText() == "\u4e0b\u4e00\u6b65") {
					Ext.getCmp("defComnentWin").buttons[2].setText("\u5b8c\u6210");
					Ext.getCmp("selectDefComnent_tab").setVisible(false);
					Ext.getCmp("selectCommonComnent_tab").setVisible(true);
				} else {
					Ext.lt.portal.component.console.setConfigManage();
					if (Ext.lt.portal.component.console.savePageValidation()) {
						Ext.lt.portal.RCP.call(Ext.lt.portal.component.console.server, "savePage", Ext.lt.portal.component.console.config, function (resp) {
							if (resp == true) {
								alert("\u4fdd\u5b58\u6210\u529f");
								Ext.getCmp("selectDefComnent_tab").setVisible(true);
								Ext.getCmp("selectCommonComnent_tab").setVisible(false);
								Ext.getCmp("defComnentWin").buttons[2].setText("\u4e0b\u4e00\u6b65");
								Ext.getCmp("defComnentWin").hide();
								Ext.lt.portal.component.console.clearMainBodyPanel();
										//获取页面信息
								Ext.lt.portal.RCP.call(Ext.lt.portal.component.console.server, "load", null, function (resp) {
									var data = resp;
									Ext.lt.portal.component.console.showPageMangeData(data);
									Ext.getCmp("pagemanager").doLayout();
								});
							} else {
								alert("\u4fdd\u5b58\u5931\u8d25");
							}
						});
					}
				}
			}}]});
		}
		Ext.getCmp("pageMange_url_lab").setValue(this.config.url);
		Ext.getCmp("pageMange_name_lab").setValue(this.config.name);
		Ext.getCmp("pageMange_page_lab").setValue(this.config.page);
		Ext.getCmp("selectDefComnent_tab").setVisible(true);
		Ext.getCmp("selectCommonComnent_tab").setVisible(false);
		Ext.getCmp("defComnentWin").show();
		this.showDefComponentDemo();
	};
	this.setDefComponentDemo = function (type, id, demopic, region) {
		if (type == "logo") {
			this.config.logo = {"comview":id, "demopic":demopic, "region":region, "comservice":"defaultlogoservice", "component":"ifmis_default_logo"};
		}
		if (type == "menu") {
			this.config.menu = {"comview":id, "demopic":demopic, "region":region, "comservice":"defaultmenuservice", "component":"ifmis_default_menu"};
		}
		if (type == "submenu") {
			this.config.submenu = {"comview":id, "demopic":demopic, "region":region, "comservice":"defaultsubmenuservice", "component":"ifmis_default_submenu"};
		}
		this.showDefComponentDemo();
	};
	this.removeDefComponentDemo = function (type, id, demopic) {
		if (type == "logo") {
			if (this.config.logo.id == id) {
				this.config.logo = null;
			} else {
				this.config.logo = {"comview":id, "demopic":demopic, "region":region, "comservice":"defaultlogoservice", "component":"ifmis_default_logo"};
			}
		}
		if (type == "menu") {
			if (this.config.menu.id == id) {
				this.config.menu = null;
			} else {
				this.config.menu = {"comview":id, "demopic":demopic, "region":region, "comservice":"defaultmenuservice", "component":"ifmis_default_menu"};
			}
		}
		if (type == "submenu") {
			if (this.config.submenu.id == id) {
				this.config.submenu = null;
			} else {
				this.config.submenu = {"comview":id, "demopic":demopic, "region":region, "comservice":"defaultsubmenuservice", "component":"ifmis_default_submenu"};
			}
		}
		this.showDefComponentDemo();
	};
	this.showDefComponentDemo = function () {
		var setHtmltitle = "";
		var setHtmlleft = "";
		if (this.config.logo != null) {
			if (this.config.logo.region == "title") {
				setHtmltitle += "<div><img src='" + this.config.logo.demopic + "'/></div>";
			} else {
				setHtmlleft += "<div><img src='" + this.config.logo.demopic + "'/></div>";
			}
		}
		if (this.config.menu != null) {
			if (this.config.menu.region == "title") {
				setHtmltitle += "<div><img src='" + this.config.menu.demopic + "'/></div>";
			} else {
				setHtmlleft += "<div><img src='" + this.config.menu.demopic + "'/></div>";
			}
		}
		if (this.config.submenu != null) {
			if (this.config.submenu.region == "title") {
				setHtmltitle += "<div><img src='" + this.config.submenu.demopic + "'/></div>";
			} else {
				setHtmlleft += "<div><img src='" + this.config.submenu.demopic + "'/></div>";
			}
		}
		var bd = Ext.getCmp("headbody_def");
		bd.body.update(setHtmltitle);
		bd.doLayout();
		if (setHtmltitle != "") {
			bd.setHeight(80);
		} else {
			bd.setHeight(0);
		}
		bd = Ext.getCmp("leftbody_def");
		bd.body.update(setHtmlleft);
		bd.setWidth(80);
		if (setHtmlleft != "") {
			bd.setWidth(80);
		} else {
			bd.setWidth(0);
		}
		bd.doLayout();
		Ext.getCmp("mainbody_def_center").doLayout();
		Ext.getCmp("selectDefComnent_panel").doLayout();
	};
	//选择框架时候鼠标移入效果
	this.templatesBGColor_div = null;
	this.templatesBGColor = function (type, div, fn) {
		//onmouseout
		if (type == "1") {
			if (div == this.templatesBGColor_div) {
				return;
			}
			div.style.background = "#CEDAEA";
		}
		if (type == "2") {
			div.style.background = "#AEDAEA";
		}
		if (type == "3") {
			if (this.templatesBGColor_div != null) {
				this.templatesBGColor_div.style.background = "#CEDAEA";
			}
			div.style.background = "#FFDAEA";
			this.templatesBGColor_div = div;
			if (fn != null) {
				fn();
			}
		}
	};
	this.componentDeploy = null;
	this.createComponent = function (comid) {
		for (var i = 0; i < comnents.length; i++) {
			if (comnents[i].COMPONENTID == comid) {
				var com = comnents[i];
				var objname = comnents[i].JSOBJECTNAME.substring(0, comnents[i].JSOBJECTNAME.lastIndexOf("."));
				new Ext.lt.portal.util().createScript("./" + comnents[i].JSLIB, "console", function () {
					eval("Ext.lt.portal.component.console.componentDeploy=new " + objname + ".deploy();");
					Ext.lt.portal.component.console.componentDeploy.show(com, function (cof, service) {
						if (Ext.lt.portal.component.console.config.main == null) {
							Ext.lt.portal.component.console.config.main = new Array();
						}
						var obj = new Object();
						obj.component = com.COMPONENTID;
						obj.comview = com.VIEWID;
						obj.comservice = service;
						obj.config = cof;
						var companel = new Ext.Panel({title:cof.name,draggable:true, width:55, height:55, html:"<img width=55, height=55 src='" + com.DEMOPIC + "'/>"});
						companel.on("render", function () {
							companel.getEl().on("dblclick", function () {
								var arr = Ext.lt.portal.component.console.config.main;
								var boo = false;
								for (var i = 0; i < arr.length; i++) {
									if (boo) {
										arr[i - 1] = arr[i];
									}
									if (obj == arr[i]) {
										boo = true;
									}
								}
								arr.length = arr.length - 1;
								Ext.getCmp("mainbody_def").remove(companel);
							});
						}, this);
						Ext.getCmp("mainbody_def").add(companel.show());
						Ext.getCmp("mainbody_def").doLayout();
						Ext.lt.portal.component.console.config.main.push(obj);
					});
				});
			}
		}
	};
	this.savePageValidation = function () {
		var config = Ext.lt.portal.component.console.config;
		if (config.name == null || config.name.length == 0) {
			alert("\u8bf7\u586b\u5199\u9875\u9762\u540d\u79f0!");
			return false;
		}
		if (config.url == null || config.url.length == 0) {
			alert("\u8bf7\u586b\u5199\u9875\u9762url!");
			return false;
		}
		return true;
	};
	this.setConfigManage = function () {
		Ext.lt.portal.component.console.config.url = Ext.getCmp("pageMange_url_lab").getValue();
		Ext.lt.portal.component.console.config.name = Ext.getCmp("pageMange_name_lab").getValue();
		Ext.lt.portal.component.console.config.page = Ext.getCmp("pageMange_page_lab").getValue();
	};
	this.clearMainBodyPanel = function () {
		var bd = Ext.getCmp("mainbody_def");
		if (bd != null) {
			bd.removeAll();
		}
	};
	//--------
};

