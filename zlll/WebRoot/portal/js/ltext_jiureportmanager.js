//Ext.lt.portal.component.common.IfmisDefaultTitle
if (Ext.lt.portal.component == null) {
	Ext.lt.portal.component = {};
}
//���䱨�����
Ext.lt.portal.component.jiureportmanager = new function () {
	this.server = "";
	this.menuinfo = "";
	this.getNote = function (menuinfo,server) {
		Ext.lt.portal.component.jiureportmanager.server=server;
		Ext.lt.portal.component.jiureportmanager.menuinfo=menuinfo;
		var setHtml = []; //ƴװ����pangel����ʾһ��div
		setHtml.push("<div id=\"jiureportmanager\" style=\"height:210px;overflow:auto;padding:'10 0 0 10';\">");
		setHtml.push("</div>");
		//newһ��panel����Ӻ�ɾ���İ�ť
		var reportpanel = new Ext.Panel({title:menuinfo.name,height:330,autoScroll:false, html:setHtml,tbar:[{text:"\u6dfb\u52a0", iconCls:"select", pressed:true, handler:function () {
			Ext.lt.portal.component.jiureportmanager.addreport();//������ӷ���
		}, scope:this}, "-", {text:"\u5220\u9664", iconCls:"select", pressed:true, handler:function () {
			var checks = document.getElementsByName("mycheck");//��ȡ���и�ѡ�����
			var ids = "";
			//ѭ����ѡ�е��������ݵ�idƴ��һ���ַ����硰12,13,��
			for(var i = 0;i < checks.length;i ++){
				if(checks[i].checked == true){
					ids += "'"+checks[i].value+"',";
				}
			}
			//���ids��Ϊ�յ���ɾ������
				if(ids != ""){
					if(confirm('ȷ��Ҫɾ��������¼��')){
						Ext.lt.RCP.call(Ext.lt.portal.component.jiureportmanager.server, "deleteJiuReportManager", ids, function (resp) {
							if(resp == 1){
								alert("ɾ���ɹ�");
								Ext.lt.portal.component.jiureportmanager.getReport();//ɾ���ɹ����ٵ��ò�ѯ������ʾ������
							}else{
								alert(resp);
							}
						});
					}
				}else{
					alert("��ѡ��Ҫɾ���ļ�¼��");
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
	Ext.lt.portal.component.jiureportmanager.getReport();//���ò�ѯ����
	return reportpanel;
	};
		//��ѯ����
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
	//��ӷ���
	this.addreport = function() {
		if (Ext.getCmp("add_report") == null) {
			new Ext.Window({title:"��ӱ���", width:400, closable :false,height:120, layout:"column", plain:true, id:"add_report", items:[
								{columnWidth:1, layout:"form", border:false, items:[{id:"jiuname_add", xtype:"textfield",anchor: '100%',fieldLabel:"��������", name:"jiuname_add"},{id:"jiuurl_add", xtype:"textfield",anchor: '100%',fieldLabel:"����·��", name:"jiuurl_add"}]}
								], buttons:[{text:"\u5b8c\u6210",width:15, handler:function () {
									var config=new Object();
									config.reportname=Ext.getCmp("jiuname_add").getValue();//��ӱ�������name
									config.reporturl=Ext.getCmp("jiuurl_add").getValue();//��ӱ�������url
									if(config.reportname.trim().length==0){
										alert("�������Ʋ���Ϊ��");
										return;
									}
									if(config.reporturl.trim().length==0){
										alert("����·������Ϊ��");
										return;
									}
									if(config.reportname.trim().length>100){
										alert("�������Ʋ��ܳ���100����");
										return;
									}
									if(config.reporturl.trim().length>500){
										alert("����·�����ܳ���500����");
										return;
									}
									//��url�е������ַ������滻����
									var urls = config.reporturl.replaceAll(" ","").replaceAll("&",",");
									urls = urls.replaceAll("#",",,").split("?");
									var para = new Object();
									para.reportname=Ext.getCmp("jiuname_add").getValue();
									para.reporturl=urls;
									//���ú�̨�����ӷ���
									Ext.lt.RCP.call(Ext.lt.portal.component.jiureportmanager.server, "addJiuReportManager", para, function (resp) {
										if(resp == 1){
											alert("��ӳɹ�");
											Ext.lt.portal.component.jiureportmanager.getReport();//��ӳɹ����ٵ��ò�ѯ������ʾ������
											Ext.lt.template.unmask();
										}else{
											alert(resp);
										}
									});
								Ext.getCmp("add_report").hide();
								
			}},{text:"ȡ��",width:15, handler:function () {
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

