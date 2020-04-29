//Ext.lt.portal.component.common.IfmisDefaultTitle
if (Ext.lt.portal.component == null) {
	Ext.lt.portal.component = {};
}
//综合查询报表管理
Ext.lt.portal.component.reportmanager = new function () {
	this.server = "";
	this.menuinfo = "";
	this.aae = function (){alert('123');};

	this.getNote = function (menuinfo,server) {
		Ext.lt.portal.component.reportmanager.server=server;
		Ext.lt.portal.component.reportmanager.menuinfo=menuinfo;
		var setHtml = [];  //拼装后在pangel中显示一个div
		setHtml.push("<script language=\"javascript\">function aa(){alert('123');}</script>");
		setHtml.push("<div id=\"reportmanager\" style=\"height:210px;overflow:auto;padding:'10 0 0 10';\">");
		setHtml.push("</div>");
		//new一个panel带添加和删除的按钮
		var retmenupanel = new Ext.Panel({title:menuinfo.name,bodystyle:'border:3px solid red;',height:330,autoScroll:false, html:setHtml,tbar:[{text:"\u6dfb\u52a0",layout:'fit',width:20,  pressed:true, handler:function () {
			Ext.lt.portal.component.reportmanager.addreport();//调用添加方法
		}, scope:this}, "-", {text:"\u5220\u9664",  pressed:true, handler:function () {
			var checks = document.getElementsByName("check");//获取所有复选框对象
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
						Ext.lt.RCP.call(Ext.lt.portal.component.reportmanager.server, "deleteReportManager", ids, function (resp) {
							if(resp == 1){
								alert("删除成功");
								Ext.lt.portal.component.reportmanager.getReport();//删除成功后再调用查询方法显示出数据
							}else{
								alert(resp);
							}
						});
					}
				}else{
					alert("请选择要删除的记录！");
				}
			}}]});
		retmenupanel.getname = function () {
			return retmenupanel.title;
		};
		retmenupanel.on('afterlayout',function(pan){
			if(retmenupanel.items.items[0]!= null){
				retmenupanel.items.items[0].setHeight(retmenupanel.getHeight()-75);
			}
		});
	Ext.lt.portal.component.reportmanager.getReport();//调用查询方法
	return retmenupanel;
	};
		//查询方法
	this.getReport=function(){
		var str="";
		Ext.lt.RCP.call(Ext.lt.portal.component.reportmanager.server, "getReportManager", str,function (resp) {
			var uid =resp[0];
			var sid = resp[1];
			var pserver =resp[2];
			var acctyear = resp[3];
			var tasklist=resp[4];
			var Html = "<table style=\"width:100%;\">"; 
			for(var i=0;i<tasklist.length;i++){
				Html += "<tr><td  style=\"height:23px; font-size='14'\"><input type = checkbox name=\"check\" value=\""+tasklist[i].code+"\"><a href=\"#\" onclick=\"link("+uid+","+sid+","+pserver+","+acctyear+",'"+tasklist[i].requrl+"','"+tasklist[i].reporturl+"');\" >"+tasklist[i].reportname+"</a>";
				Html += "</td></tr>";
				}
				Html += "</table>";
				document.getElementById("reportmanager").innerHTML=Html;
		});
	};
	//添加方法
	this.addreport = function() {
		if (Ext.getCmp("add_mem") == null) {
			new Ext.Window({title:"添加报表", width:400, closable :false,height:145, layout:"column", plain:true, id:"add_mem", items:[
								{columnWidth:1, layout:"form", border:false, items:[{id:"name_add", xtype:"textfield",anchor: '100%',fieldLabel:"报表名称",name:"name_add"},{id:"requrl_add", xtype:"textfield",anchor: '100%',fieldLabel:"单点登录路径",name:"requrl_add"},{id:"url_add", xtype:"textfield",anchor: '100%',fieldLabel:"报表路径",name:"url_add"}]}
								], buttons:[{text:"\u5b8c\u6210",width:15, handler:function () {
									var config=new Object();
									config.requrl=Ext.getCmp("requrl_add").getValue();//添加报表管理的单点登陆路径
									config.reportname=Ext.getCmp("name_add").getValue();//添加报表管理的name
									config.reporturl=Ext.getCmp("url_add").getValue();//添加报表管理的路径
									if(config.reportname.trim().length==0){
										alert("报表名称不能为空");
										return;
									}
									if(config.reporturl.trim().length==0){
										alert("报表路径不能为空");
										return;
									}
									if(config.requrl.trim().length==0){
										alert("单点登录路径不能为空");
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
									if(config.requrl.trim().length>500){
										alert("单点登录路径不能超过500个字");
										return;
									}
									//对url和requrl进行处理替换掉特殊字符
									var urls = config.reporturl.replaceAll(" ","").replaceAll("&",",");
									 urls = urls.replaceAll("#",",,").split("?");
									var requrls = config.requrl.replaceAll(" ","").replaceAll("&",",");
									requrls = requrls.replaceAll("#",",,").split("?");
									var para = new Object();
									para.reportname=Ext.getCmp("name_add").getValue();
									para.reporturl=urls;
									para.requrl=requrls;
									//调用后台的添加方法
									Ext.lt.RCP.call(Ext.lt.portal.component.reportmanager.server, "addReportManager", para, function (resp) {
										if(resp == 1){
											alert("添加成功");
											Ext.lt.portal.component.reportmanager.getReport();//添加成功后调用查询方法进行显示数据
											Ext.lt.template.unmask();
										}else{
											alert(resp);
										}
									});
								Ext.getCmp("add_mem").hide();
								
			}},{text:"取消",width:15, handler:function () {
									Ext.getCmp("add_mem").hide();
									Ext.lt.template.unmask();
									}}]});
		}
			Ext.getCmp("add_mem").show();
			Ext.lt.template.mask();
			Ext.getCmp("name_add").setValue("");
			Ext.getCmp("url_add").setValue("");
			Ext.getCmp("requrl_add").setValue("");
	}
	
};
function link(uid,sid,pserver,acctyear,requrl,reporturl){
	pserver=_ROOT_PATH_+pserver;
	///debugger;
	Ext.lt.RCP.script(requrl,'plogin', "doLogin", 
			{uid:uid,sid:sid,pserver:pserver,acctyear:acctyear},function(resp){
				//debugger;
				resp=parseInt(resp);
				if(resp >=0 ){
					//window.open("http://192.168.3.125:7001/fcas/reportshow.page?templatecode=402883fd31da9c5d0131db69fdf30002#");
					window.open(reporturl);
				}else{
					alert("连接失败");
				}
				});
}

