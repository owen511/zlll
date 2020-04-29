//Ext.lt.portal.component.common.IfmisDefaultTitle
if (Ext.lt.portal.component == null) {
	Ext.lt.portal.component = {};
}
Ext.lt.portal.component.calendar = new function () {
	this.IfmisDefCalendar = function (server, config) {
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

