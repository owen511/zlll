//Ext.lt.portal.component.common.IfmisDefaultTitle
if (Ext.lt.portal.component == null) {
	Ext.lt.portal.component = {};
}
Ext.lt.portal.component.report = new function () {
	this.server = "";
	this.IfmisReport = function (reportinfo,server) {
	    var panelheight = (document.body.clientHeight-50)/2;
		var setHtml = [];
		setHtml.push("<div style=\"height:330px;\"/>");
		setHtml.push("<div id=\"report_"+reportinfo.id+"\" style=\"\"/>");
		//setHtml.push("<table>");
		//setHtml.push("<tr>");
		//setHtml.push("<td>");
		//setHtml.push(logoinfo.name);
		//setHtml.push("</td>");
		//setHtml.push("</tr>");
		//setHtml.push("</table>");
		setHtml.push("</div>");
		setHtml.push("</div>");
		Ext.lt.portal.component.report.server=server;
		
		//var reportpanel = new Ext.Panel({height:330,panelheight:330,reportinfo_tmp:reportinfo,title:reportinfo.name,html:setHtml.join('')});
		var reportpanel = new Ext.Panel({height:panelheight,panelheight:panelheight,reportinfo_tmp:reportinfo,title:reportinfo.name,html:setHtml.join('')});
		reportpanel.getname = function(){
			return reportpanel.title;
		}
		//reportpanel.on('afterlayout',function(pan){
			//reportinfo.reportwidth = reportpanel.getWidth();
			Ext.lt.portal.component.report.GenerateGraphics(reportinfo);
		//});
		return reportpanel;
	}
	this.GenerateGraphics = function(reportinfo){
		//alert(reportinfo.reportname);
		var reportname = reportinfo.reportname;
		//alert(reportinfo.reportparam);
		var reportparam = reportinfo.reportparam;
		//alert(reportinfo.report_pserver);
		var pserver = reportinfo.report_pserver;
		//alert(reportinfo.fcasip);
		var fcasip = reportinfo.fcasip;
		//alert(reportinfo.reportorimage);
		var reportorimage = reportinfo.reportorimage;
		//alert(reportinfo.report_sid);
		var report_sid = reportinfo.report_sid;
		//alert(reportinfo.report_uid);
		var report_uid = reportinfo.report_uid;
		//alert(reportinfo.report_year);
		var report_year = reportinfo.report_year;
		//alert(reportinfo.reportwidth);
		//var report_width = reportinfo.reportwidth;
		
		//reportparam ='xiamenquery520091248400266671copy2011,xiamenquery520091248400266671copy2011,2';
		//pserver = 'http://192.168.3.30:8090/security/authservice';
		//fcasip = 'http://192.168.3.73:7002';
		//reportorimage = "1";
		//report_year = "2011";
		       
		//Ext.lt.portal.component.report.createScript(fcasip+'/fcas/js/outermouse.js',1);
		//Ext.lt.portal.component.report.createScript(fcasip+'/fcas/js/zapatec.js',2);
		//Ext.lt.portal.component.report.createScript(fcasip+'/fcas/js/tree.js',3);
		//Ext.lt.portal.component.report.createScript(fcasip+'/fcas/js/outerchart.js',4);
		//Ext.lt.portal.component.report.createScript(fcasip+'/fcas/system/fuscharinfor/js/FusionCharts.js',5);
		Ext.lt.portal.component.report.createScript(fcasip+'/fcas/js/outermouse.js',6,function(){
			Ext.lt.portal.component.report.createScript(fcasip+'/fcas/js/zapatec.js',7,function(){
				Ext.lt.portal.component.report.createScript(fcasip+'/fcas/js/tree.js',8,function(){
					Ext.lt.portal.component.report.createScript(fcasip+'/fcas/js/outerchart.js',9,function(){
						Ext.lt.portal.component.report.createScript(fcasip+'/fcas/system/fuscharinfor/js/FusionCharts.js',10,function(){
							if(reportorimage == 0){
								try{
									var tableObj = queryout(reportparam);
									tableObj.outParameter({uid:report_uid,sid:report_sid,pserver:pserver,acctYear:report_year,divId:'report_'+reportinfo.id,height:'222',width:372,refresh:'0',fcasIp:fcasip,tparams:reportparam});
								}catch(e){}
							}else{
								try{
									var tableObj = queryChartOut(reportparam);
									tableObj.outParameter({uid:report_uid,sid:report_sid,pserver:pserver,acctYear:report_year,divId:'report_'+reportinfo.id,height:'200',width:372,refresh:'0',fcasIp:fcasip,tparams:reportparam});
								}catch(e){}
							}
						});
					});
				});
			});
		});
	}
	
		this.GenerateGraphics_tmp = function(reportinfo,r_height,r_width){
		//alert(reportinfo.reportname);
		var reportname = reportinfo.reportname;
		//alert(reportinfo.reportparam);
		var reportparam = reportinfo.reportparam;
		//alert(reportinfo.report_pserver);
		var pserver = reportinfo.report_pserver;
		//alert(reportinfo.fcasip);
		var fcasip = reportinfo.fcasip;
		//alert(reportinfo.reportorimage);
		var reportorimage = reportinfo.reportorimage;
		//alert(reportinfo.report_sid);
		var report_sid = reportinfo.report_sid;
		//alert(reportinfo.report_uid);
		var report_uid = reportinfo.report_uid;
		//alert(reportinfo.report_year);
		var report_year = reportinfo.report_year;
		if(reportorimage == 0){
			var tableObj = queryout(reportparam);
			tableObj.outParameter({uid:report_uid,sid:report_sid,pserver:pserver,acctYear:report_year,divId:'report_'+reportinfo.id,height:r_height,width:r_width,refresh:'0',fcasIp:fcasip,tparams:reportparam});
			
		}else{
			var tableObj = queryChartOut(reportparam);
			tableObj.outParameter({uid:report_uid,sid:report_sid,pserver:pserver,acctYear:report_year,divId:'report_'+reportinfo.id,height:r_height,width:r_width,refresh:'0',fcasIp:fcasip,tparams:reportparam});
		}
		}
	this.createScript = function (srcIp,id){
	    if (document.getElementById("cgi_emotion_list123"+id)){
			document.getElementsByTagName("HEAD")[0].removeChild(document.getElementById("cgi_emotion_list123"+id));
	    }
	    var s = document.createElement("SCRIPT");
	    s.id="cgi_emotion_list123"+id; 
	    document.getElementsByTagName("HEAD")[0].appendChild(s);
	    s.src=srcIp; 
	    s.onreadystatechange = function () {
			if (this.readyState == "complete" || this.readyState == "loaded") {
			}
		};
	      
	}
	
	this.createScript = function (srcIp, divId, fn) {
		if (document.getElementById("cgi_emotion_list" + divId)) {
			document.getElementsByTagName("HEAD")[0].removeChild(document.getElementById("cgi_emotion_list" + divId));
		}
		var s = document.createElement("SCRIPT");
		s.id = "cgi_emotion_list" + divId;
		s.src = srcIp+"?id"+Math.random();
		s.onreadystatechange = function () {
			if (this.readyState == "complete" || this.readyState == "loaded") {
				if (fn != null) {
					fn();
				}
			}
		};
		document.getElementsByTagName("HEAD")[0].appendChild(s);
		return s;
	};
	
};

