//Ext.lt.portal.component.common.IfmisDefaultTitle
if (Ext.lt.portal.component == null) {
	Ext.lt.portal.component = {};
}
var DSign_Content = "";
var para_login = new Object();para_login
Ext.lt.portal.component.login = new function () {
	this.url="./default.page";
	this.server="";
	this.ifmisDefaultLogin = function (servers,logininfo) {
		Ext.lt.portal.component.login.server=servers;
		//var retloginpanel = new Ext.Panel({id:"systemmain", html:""});
		//Ext.lt.portal.RCP.call("defaultloginservice", "getLoginYears", null, function (resp) {
		//	var logininfo = eval("[" + resp.responseText + "]")[0];
			if(logininfo.url!=null){
				this.url=logininfo.url;
			}
			if(null!=logininfo.logoutparam){
				Ext.lt.portal.RCP.call(Ext.lt.portal.component.login.server, "logoutAction", null, function (resp) {
					if(resp == "1"){
						alert(2222);
						window.opener=null;
						window.close();
						return;
					}
				});
			}
			var setHtml = "<div style=\"margin-top:12%; background-image:url(/images/bg/font.gif); background-repeat:no-repeat; background-position:left; height:50px; \"></div>";
			setHtml += "<div id=\"login1\" style=\"display:block; background-image:url(/images/bg/" + logininfo.IFMIS_ADMDIV + "_login_bg.gif); background-repeat:no-repeat;height:221px; width:100%; margin-top:2%; background-position:left; font-size:14px;\">";
			setHtml += "  <form id=\"form1\" name=\"form1\" method=\"post\" action=\"/login.do\">";
			setHtml += "    <table width=\"93%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" style =\"width:60%; display:block; margin-top:140px; margin-left:23%;\">";
			setHtml += "      <tr>";
			if (logininfo.isca) {
				setHtml += "        <td width=\"8%\" align=\"right\" nowrap=\"nowrap\"><font color=\"#ffffff\">\u7528\u6237\uff1a</font></td>";
				setHtml += "        <td width=\"25%\" nowrap=\"nowrap\"><input type=\"text\" name=\"username\" value=\"\"/></td>";
				setHtml += "        <td width=\"10%\" align=\"right\" nowrap=\"nowrap\" style=\"top_color\"><font color=\"#ffffff\">\u5bc6\u7801\uff1a</font></td>";
				setHtml += "        <td width=\"25%\" nowrap=\"nowrap\"><input type=\"password\" name=\"password\" value=\"\"/></td>";
			}
			setHtml += "        <td width=\"9%\" align=\"right\" nowrap=\"nowrap\" style=\"top_color\"><font color=\"#ffffff\">\u5e74\u4efd\uff1a</font></td>";
			if (logininfo.isMultiDataSourceDeployMode) {
				setHtml += "        <td width=\"23%\" nowrap=\"nowrap\">";
				setHtml += "         <select name=\"year\">";
				for (var i = 0; i < logininfo.loginaCctyear.length; i++) {
					setHtml += "<option value=\"" + logininfo.loginaCctyear[i].all + "\">" + logininfo.loginaCctyear[i].acctmainbodyname + "</option>";
				}
				setHtml += "        </select>";
				setHtml += "        </td>";
				if (!logininfo.isca) {
					setHtml += "        <td colspan=\"2\" nowrap=\"nowrap\">";
					setHtml += "        <input type=\"button\" value=\"\u8ba4\u8bc1\" id=\"login_button\" onclick=\"doDataProcess()\"/></td>";
				}
			} else {
				setHtml += "        <td width=\"23%\" nowrap=\"nowrap\">";
				setHtml += "        <select name=\"loginacctyear\">        ";
				for (var i = 0; i < logininfo.loginaCctyear.length; i++) {
					setHtml += "<option value=\"" + logininfo.loginaCctyear[i].loginacctyear + "\">" + logininfo.loginaCctyear[i].loginacctyear + "</option>";
				}
				setHtml += "        </select>";
				setHtml += "        </td>";
				setHtml += "        <td width=\"9%\" align=\"right\" nowrap=\"nowrap\" style=\"top_color\"><font color=\"#ffffff\">\u8d22\u653f\uff1a</font></td>";
				setHtml += "        <td width=\"23%\" nowrap=\"nowrap\">";
				if (logininfo.logingovid) {
					setHtml += "        <select name=\"logingovid\">        ";
					for (var i = 0; i < logininfo.logingovid.length; i++) {
						setHtml += "<option value=\"" + logininfo.logingovid[i].govid + "\">" + logininfo.logingovid[i].name + "</option>";
					}
					setHtml += "        </select>";
				}
				setHtml += "        </td>";
				if (!logininfo.isca) {
					setHtml += "        <td colspan=\"2\" nowrap=\"nowrap\">";
					setHtml += "        <input type=\"button\" value=\"\u8ba4\u8bc1\" id=\"login_button\" onclick=\"doDataProcess()\"/></td>";
				}
			}
			setHtml += "      </tr>";
			if (logininfo.isca) {
				setHtml += "      <tr>";
				setHtml += "        <td nowrap=\"nowrap\" colspan=\"4\">&nbsp;</td>";
				setHtml += "      </tr>";
			} else {
				setHtml += "        <tr>";
				setHtml += "           <td nowrap=\"nowrap\" colspan=\"6\">&nbsp;</td>";
				setHtml += "        </tr>";
			}
			setHtml += "      <tr>";
			setHtml += "        <td colspan=\"4\"  nowrap=\"nowrap\" valign=\"bottom\">&nbsp;<font id=\"msg\" color=\"red\"></font></td>";
			if (logininfo.isca) {
				setHtml += "        <td colspan=\"2\" nowrap=\"nowrap\">";
				setHtml += "        <input type=\"button\" value=\"\u767b\u5f55\" id=\"login_button\" onclick=\"dologin()\"/>";
				setHtml += "        <input type=\"reset\" value=\"\u91cd\u7f6e\" id=\"login_button\" />";
				setHtml += "        </td>";
			}
			setHtml += "      </tr>";
			setHtml += "    </table>";
			setHtml += "    </form>";
			setHtml += "</div>";
			setHtml += "<div class=\"download\" onmouseover=\"this.className='download_over'\" onmouseout=\"this.className='download'\"><a href=\"/common/ifmis_plugins.exe\">\u4e0b\u8f7d\u63a7\u4ef6</a></div>";
		//	var bd = Ext.getCmp("systemmain");
		//	bd.body.update(setHtml);
			var retloginpanel = new Ext.Panel({id:"systemmain", html:setHtml});
			login_init();
			DSign_Content = logininfo.DSign_Content;
		//});
		return retloginpanel;
	};
	this.deploy = function () {
		this.show = function (com,fn) {
			if (Ext.getCmp("common_deploy") == null) {
				new Ext.Window({title:"默认窗口配置", width:700, height:400, layout:"column", plain:true, id:"common_deploy", items:[
						{columnWidth:1, layout:"form", border:false, items:[{id:"common_deploy_name", xtype:"textfield", fieldLabel:"栏目名称", name:"name"}]}], buttons:[{text:"\u5b8c\u6210", handler:function () {
							var config=new Object();
							config.name=Ext.getCmp("common_deploy_name").getValue();
							fn(config,"defaultloginservice");
						Ext.getCmp("common_deploy").hide();
				}}]});
			}
			Ext.getCmp("common_deploy").show();
			Ext.getCmp("common_deploy_name").setValue("");
		};
	};
};
function login_init() {
	para_login.screenwidth = window.screen.width;
	try {
		document.forms["form1"].username.focus();
	}
	catch (e) {
	}
	para_login.fontsize = getFont("ifmisfont");
	if (para_login.fontsize != null && para_login.fontsize != "") {
		if (para_login.fontsize == "l") {
			para_login.fontFile = "stylefontL.css";
		} else {
			if (para_login.fontsize == "m") {
				para_login.fontFile = "stylefontM.css";
			} else {
				para_login.fontFile = "stylefontS.css";
			}
		}
	} else {
		para_login.fontFile = "stylefontS.css";
	}
}
//根据原文和证书产生认证数据包
function doDataProcess() { 
	var DSign_Subject = "";
	if (DSign_Content == "") {
		alert("\u539f\u6587\u4e0d\u80fd\u4e3a\u7a7a\uff0c\u8bf7\u8f93\u5165\u539f\u6587!");
	} else {
			//控制证书为一个时，不弹出证书选择框
		JITDSignOcx.SetCertChooseType(1);
		JITDSignOcx.SetCert("SC", "", "", "", "CN=Private Certificate Authority Of MOF, O=MOF, C=CN", "");
		if (JITDSignOcx.GetErrorCode() != 0) {
			alert("\u9519\u8bef\u4fe1\u606f\uff1a" + JITDSignOcx.GetErrorMessage(JITDSignOcx.GetErrorCode()));
			return false;
		} else {
			var temp_DSign_Result = JITDSignOcx.DetachSignStr(DSign_Subject, DSign_Content);
			if (JITDSignOcx.GetErrorCode() != 0) {
				alert("\u9519\u8bef\u4fe1\u606f\uff1a" + JITDSignOcx.GetErrorMessage(JITDSignOcx.GetErrorCode()));
				return false;
			}
			//如果Get请求，需要放开下面注释部分
			//	 while(temp_DSign_Result.indexOf('+')!=-1) {
			//		 temp_DSign_Result=temp_DSign_Result.replace("+","%2B");
			//	 }
			para_login.signed_data = temp_DSign_Result;
			if (document.forms[0].year != null) {
				para_login.year = document.forms[0].year.value;
			} else {
				para_login.loginacctyear = document.forms[0].loginacctyear.value;
				para_login.logingovid = document.forms[0].logingovid.value;
			}
		}
	}
	Ext.lt.portal.RCP.call(Ext.lt.portal.component.login.server, "calogin", para_login , function (resp) {
		if (resp=="true") {
			window.location.href = Ext.lt.portal.component.login.url;//"./default.page";
			//window.location.href = "./default.page";
		} else {
			document.getElementById("msg").innerText = resp;
		}
	});
}
function dologin() {
	para_login.name = document.forms[0].username.value;
	para_login.password = document.forms[0].password.value;
	if (document.forms[0].year != null) {
		para_login.year = document.forms[0].year.value;
	} else {
		para_login.loginacctyear = document.forms[0].loginacctyear.value;
		para_login.logingovid = document.forms[0].logingovid.value;
	}
	Ext.lt.portal.RCP.script("./","defaultloginservice", "login", para_login, "dologinScriptRun");
	document.forms[0].password.value = "";
}
function dologinScriptRun (resp) {
		if (resp =="true") {
			window.location.href = Ext.lt.portal.component.login.url;//"./default.page";
			//window.location.href = "./default.page";
		} else {
			document.getElementById("msg").innerText = resp;
		}
	}
function dologinRCP() {
	para_login.name = document.forms[0].username.value;
	para_login.password = document.forms[0].password.value;
	if (document.forms[0].year != null) {
		para_login.year = document.forms[0].year.value;
	} else {
		para_login.loginacctyear = document.forms[0].loginacctyear.value;
		para_login.logingovid = document.forms[0].logingovid.value;
	}
	Ext.lt.portal.RCP.call(Ext.lt.portal.component.login.server, "login",  para_login, function (resp) {
		if (resp=="true") {
			window.location.href = Ext.lt.portal.component.login.url;//"./default.page";
			//window.location.href = "./default.page";
		} else {
			document.getElementById("msg").innerText = resp;
		}
	});
	document.forms[0].password.value = "";
}

