//Ext.lt.portal.component.common.IfmisDefaultTitle
if (Ext.lt.portal.component == null) {
	Ext.lt.portal.component = {};
}
//�ۺϲ�ѯ�������
Ext.lt.portal.component.reportmanager = new function () {
	this.server = "";
	this.menuinfo = "";
	this.aae = function (){alert('123');};

	this.getNote = function (menuinfo,server) {
		Ext.lt.portal.component.reportmanager.server=server;
		Ext.lt.portal.component.reportmanager.menuinfo=menuinfo;
		var setHtml = [];  //ƴװ����pangel����ʾһ��div
		setHtml.push("<script language=\"javascript\">function aa(){alert('123');}</script>");
		setHtml.push("<div id=\"reportmanager\" style=\"height:210px;overflow:auto;padding:'10 0 0 10';\">");
		setHtml.push("</div>");
		//newһ��panel����Ӻ�ɾ���İ�ť
		var retmenupanel = new Ext.Panel({title:menuinfo.name,bodystyle:'border:3px solid red;',height:330,autoScroll:false, html:setHtml,tbar:[{text:"\u6dfb\u52a0",layout:'fit',width:20,  pressed:true, handler:function () {
			Ext.lt.portal.component.reportmanager.addreport();//������ӷ���
		}, scope:this}, "-", {text:"\u5220\u9664",  pressed:true, handler:function () {
			var checks = document.getElementsByName("check");//��ȡ���и�ѡ�����
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
						Ext.lt.RCP.call(Ext.lt.portal.component.reportmanager.server, "deleteReportManager", ids, function (resp) {
							if(resp == 1){
								alert("ɾ���ɹ�");
								Ext.lt.portal.component.reportmanager.getReport();//ɾ���ɹ����ٵ��ò�ѯ������ʾ������
							}else{
								alert(resp);
							}
						});
					}
				}else{
					alert("��ѡ��Ҫɾ���ļ�¼��");
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
	Ext.lt.portal.component.reportmanager.getReport();//���ò�ѯ����
	return retmenupanel;
	};
		//��ѯ����
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
	//��ӷ���
	this.addreport = function() {
		if (Ext.getCmp("add_mem") == null) {
			new Ext.Window({title:"��ӱ���", width:400, closable :false,height:145, layout:"column", plain:true, id:"add_mem", items:[
								{columnWidth:1, layout:"form", border:false, items:[{id:"name_add", xtype:"textfield",anchor: '100%',fieldLabel:"��������",name:"name_add"},{id:"requrl_add", xtype:"textfield",anchor: '100%',fieldLabel:"�����¼·��",name:"requrl_add"},{id:"url_add", xtype:"textfield",anchor: '100%',fieldLabel:"����·��",name:"url_add"}]}
								], buttons:[{text:"\u5b8c\u6210",width:15, handler:function () {
									var config=new Object();
									config.requrl=Ext.getCmp("requrl_add").getValue();//��ӱ������ĵ����½·��
									config.reportname=Ext.getCmp("name_add").getValue();//��ӱ�������name
									config.reporturl=Ext.getCmp("url_add").getValue();//��ӱ�������·��
									if(config.reportname.trim().length==0){
										alert("�������Ʋ���Ϊ��");
										return;
									}
									if(config.reporturl.trim().length==0){
										alert("����·������Ϊ��");
										return;
									}
									if(config.requrl.trim().length==0){
										alert("�����¼·������Ϊ��");
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
									if(config.requrl.trim().length>500){
										alert("�����¼·�����ܳ���500����");
										return;
									}
									//��url��requrl���д����滻�������ַ�
									var urls = config.reporturl.replaceAll(" ","").replaceAll("&",",");
									 urls = urls.replaceAll("#",",,").split("?");
									var requrls = config.requrl.replaceAll(" ","").replaceAll("&",",");
									requrls = requrls.replaceAll("#",",,").split("?");
									var para = new Object();
									para.reportname=Ext.getCmp("name_add").getValue();
									para.reporturl=urls;
									para.requrl=requrls;
									//���ú�̨����ӷ���
									Ext.lt.RCP.call(Ext.lt.portal.component.reportmanager.server, "addReportManager", para, function (resp) {
										if(resp == 1){
											alert("��ӳɹ�");
											Ext.lt.portal.component.reportmanager.getReport();//��ӳɹ�����ò�ѯ����������ʾ����
											Ext.lt.template.unmask();
										}else{
											alert(resp);
										}
									});
								Ext.getCmp("add_mem").hide();
								
			}},{text:"ȡ��",width:15, handler:function () {
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
					alert("����ʧ��");
				}
				});
}

