//Ext.lt.portal.component.common.IfmisDefaultTitle
if (Ext.lt.portal.component == null) {
	Ext.lt.portal.component = {};
}
var para_login = new Object();
Ext.lt.portal.component.emailandlogin = new function () {
this.server = "";
	this.IfmisDefaultEmail = function (logoinfo,server) {
		Ext.lt.portal.component.emailandlogin.server=server;
		if (logoinfo == null) {
			logoinfo = new Object();
		}
		var task_list = logoinfo.pengdingtask;
		//Ext.lt.RCP.call("defaultlogoservice", "load", null, function (resp) {
			//var logoinfo = eval("[" + resp.responseText + "]")[0];
			//debugger;
			var setHtml = []; 
			setHtml.push("<table style=\" width:100%; height:186px;background:url(../portal/images/daiban_tu.gif) center bottom;\" border=\"0\" cellspacing='0' cellpadding='0'>");
			setHtml.push("<tr>");
			setHtml.push("<td style='border-right:1px #2C609C dotted;font-size:14px; background:url(../portal/images/111.gif) no-repeat left center;background-position:100;' width=\"50%\">");
			setHtml.push("<div class=\"email_div\" style=\" margin-top:10px; text-align:right;padding-top:10px;margin-right:150px;\">");
		  	setHtml.push("<div class=\"email_title\" style=\"font-size:15px;font-weight:nomal;color:#DD7D2E;height:30px;line-height:30px;\">�����ʼ�</div> ");
		  	setHtml.push("<div class='email_detail' stylle=\" font-size:13px;color:#2C609C;height:30px;line-height:30px;\">");
		  	setHtml.push("<div id=\"email\"><a href=\""+task_list[0].joburi+"\" target=\"_blank\" style='color:#2C609C;'>����"+task_list[0].jobnum+"�����ʼ�</a></div>");
		  	setHtml.push("</div>");
		 	setHtml.push("</div>");	
			setHtml.push("</td>");
			setHtml.push("<td valign='bottom' align='right'style='font-size:14px;'>");
			setHtml.push("<div style='text-align:left; padding-left:60px; height:110px;line-height:110px;'>");
			setHtml.push("<a href=\"javascript:AppCaller.callApp('rtx','RTX.exe')\"><img src='../portal/images/tongxxun.gif'/></a>");
			setHtml.push("</div>");
			setHtml.push( "��¼����:"+logoinfo.logintotal+"  ");
			setHtml.push( "�ϴε�¼ʱ��:"+logoinfo.lasttime+"  ");
			setHtml.push("</div>");
			setHtml.push("</td>");
			setHtml.push("</tr>");
			setHtml.push("<tr>");
			setHtml.push("<td  colspan=\"2\" valign='bottom' align='center' style='border-top:3px #2C609C dotted; font-size:14px; color:#2C609C;'>");
			setHtml.push("�ຣʡ������һ�廯ϵͳ���绰��xxxxxxxxx");
			setHtml.push("</td>");
			setHtml.push("</tr>");
			setHtml.push("</table>");
			var retlogopanel = new Ext.Panel({id:"email",html:setHtml.join('')});
		//});
		return retlogopanel;
	};
};
	

