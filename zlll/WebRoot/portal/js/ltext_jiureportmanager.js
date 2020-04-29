//Ext.lt.portal.component.common.IfmisDefaultTitle
if (Ext.lt.portal.component == null) {
	Ext.lt.portal.component = {};
}
//久其报表管理
Ext.lt.portal.component.jiureportmanager = new function () {
	this.server = "";
	this.menuinfo = "";
	this.getNote = function (menuinfo,server) {
		Ext.lt.portal.component.jiureportmanager.server=server;
		Ext.lt.portal.component.jiureportmanager.menuinfo=menuinfo;
		var setHtml = []; //拼装后在pangel中显示一个div
		setHtml.push("<div id=\"jiureportmanager\" style=\"height:210px;overflow:auto;padding:'10 0 0 10';\">");
		setHtml.push("</div>");
		//new一个panel带添加和删除的按钮
		var reportpanel = new Ext.Panel({title:menuinfo.name,height:330,autoScroll:false, html:setHtml,tbar:[{text:"\u6dfb\u52a0", iconCls:"select", pressed:true, handler:function () {
			Ext.lt.portal.component.jiureportmanager.addreport();//调用添加方法
		}, scope:this}, "-", {text:"\u5220\u9664", iconCls:"select", pressed:true, handler:function () {
			var checks = document.getElementsByName("mycheck");//获取所有复选框对象
			var ids = "";
			//循环将选中的所有数据的id拼成一个字符串如“12,13,”
			for(var i = 0;i < checks.length;i ++){
				if(checks[i].checked == true){
					ids += "'"+checks[i].value+"',";
				}
			}
			//如果ids不为空调用删除方法
				if(ids != ""){
					if(confirm('确定要删除此条记录吗？')){
						Ext.lt.RCP.call(Ext.lt.portal.component.jiureportmanager.server, "deleteJiuReportManager", ids, function (resp) {
							if(resp == 1){
								alert("删除成功");
								Ext.lt.portal.component.jiureportmanager.getReport();//删除成功后再调用查询方法显示出数据
							}else{
								alert(resp);
							}
						});
					}
				}else{
					alert("请选择要删除的记录！");
				}
			}}]});
		reportpanel.getname = function () {
			return reportpanel.title;
		};
		reportpanel.on('afterlayout',function(pan){
			if(reportpanel.items.items[0]!= null){
				reportpanel.items.items[0].setHeight(reportpanel.getHeight()-75);
			}
		});
	Ext.lt.portal.component.jiureportmanager.getReport();//调用查询方法
	return reportpanel;
	};
		//查询方法
	this.getReport=function(){
		var str="";
		Ext.lt.RCP.call(Ext.lt.portal.component.jiureportmanager.server, "getJiuReportManager", str,function (resp) {
			var Html = "<table style=\"width:100%;\">"; 
			for(var i=0;i<resp.length;i++){
				Html += "<tr><td style=\"height:23px; font-size='14'\"><input type = checkbox name=\"mycheck\" value=\""+resp[i].code+"\"><a  href=\""+resp[i].reporturl +"\" >"+resp[i].reportname+"</a>";
				Html += "</td></tr>";
			}
				Html += "</table>";
				document.getElementById("jiureportmanager").innerHTML=Html;
		});
	};
	//添加方法
	this.addreport = function() {
		if (Ext.getCmp("add_report") == null) {
			new Ext.Window({title:"添加报表", width:400, closable :false,height:120, layout:"column", plain:true, id:"add_report", items:[
								{columnWidth:1, layout:"form", border:false, items:[{id:"jiuname_add", xtype:"textfield",anchor: '100%',fieldLabel:"报表名称", name:"jiuname_add"},{id:"jiuurl_add", xtype:"textfield",anchor: '100%',fieldLabel:"报表路径", name:"jiuurl_add"}]}
								], buttons:[{text:"\u5b8c\u6210",width:15, handler:function () {
									var config=new Object();
									config.reportname=Ext.getCmp("jiuname_add").getValue();//添加报表管理的name
									config.reporturl=Ext.getCmp("jiuurl_add").getValue();//添加报表管理的url
									if(config.reportname.trim().length==0){
										alert("报表名称不能为空");
										return;
									}
									if(config.reporturl.trim().length==0){
										alert("报表路径不能为空");
										return;
									}
									if(config.reportname.trim().length>100){
										alert("报表名称不能超过100个字");
										return;
									}
									if(config.reporturl.trim().length>500){
										alert("报表路径不能超过500个字");
										return;
									}
									//把url中的特殊字符进行替换处理
									var urls = config.reporturl.replaceAll(" ","").replaceAll("&",",");
									urls = urls.replaceAll("#",",,").split("?");
									var para = new Object();
									para.reportname=Ext.getCmp("jiuname_add").getValue();
									para.reporturl=urls;
									//调用后台类的添加方法
									Ext.lt.RCP.call(Ext.lt.portal.component.jiureportmanager.server, "addJiuReportManager", para, function (resp) {
										if(resp == 1){
											alert("添加成功");
											Ext.lt.portal.component.jiureportmanager.getReport();//添加成功后再调用查询方法显示出数据
											Ext.lt.template.unmask();
										}else{
											alert(resp);
										}
									});
								Ext.getCmp("add_report").hide();
								
			}},{text:"取消",width:15, handler:function () {
									Ext.getCmp("add_report").hide();
									Ext.lt.template.unmask();
									}}]});
		}
			Ext.getCmp("add_report").show();
			Ext.lt.template.mask();
			Ext.getCmp("jiuname_add").setValue("");
			Ext.getCmp("jiuurl_add").setValue("");
	}
	
};

