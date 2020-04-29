//Ext.lt.portal.component.common.IfmisDefaultTitle
if(Ext.lt.portal==null) Ext.lt.portal = {component:{}};
if (Ext.lt.portal.component == null) {
	Ext.lt.portal.component = {};
}
var jrArr=['','/portal/images/jr/5_1.png','/portal/images/jr/8_15.png','/portal/images/jr/10_1.png','','/portal/images/jr/1_1.png','/portal/images/jr/12_25.png'];
var DSign_Content = "";
var para_login = new Object();
Ext.lt.portal.component.login = new function () {
	this.url="./login/default.page";
	this.server="";
	this.ifmisDefaultLogin = function (logininfo,servers) {
		Ext.lt.portal.component.login.server=servers;
		//var retloginpanel = new Ext.Panel({id:"systemmain", html:""});
		//Ext.lt.RCP.call("defaultloginservice", "getLoginYears", null, function (resp) {
		//	var logininfo = eval("[" + resp.responseText + "]")[0];
			if(logininfo.url!=null){
				this.url=logininfo.url;
			}
			if(null!=logininfo.logoutparam){
				Ext.lt.RCP.call(Ext.lt.portal.component.login.server, "logoutAction", null, function (resp) {
					if(resp == "1"){
						window.opener=null;
						window.close();
						return;
					}else{
						return Ext.lt.portal.component.login.ifmisloginqinghaishow(servers,logininfo); 
					}
				});
			}
			return Ext.lt.portal.component.login.ifmisloginqinghaishow(servers,logininfo);
			
			
		
	};
	
	this.ifmisloginshow = function(servers,logininfo){
	
	Ext.lt.portal.component.login.server=servers;
	
			if(logininfo.url!=null){
				this.url=logininfo.url;
			}
			var setHtml=[];
			
		
			  setHtml.push('<div style="margin-top:12%; background-image:url(/images/bg/font.gif); background-repeat:no-repeat; background-position:left; height:50px; "></div>');			
			  setHtml.push('<div id="login1" style="display:block; background-image:url(/images/bg/' + logininfo.IFMIS_ADMDIV + '_login_bg.gif); background-repeat:no-repeat;height:221px; width:100%; margin-top:2%; background-position:left; font-size:14px;">');
			
			setHtml.push('  <form id="form1" name="form1" method="post" action="/login.do">');
			setHtml.push('    <table width="93%" border="0" cellspacing="0" cellpadding="0" style ="width:60%; display:block; margin-top:140px; margin-left:23%;">');
			setHtml.push('      <tr>');

			if (logininfo.isca) {
				setHtml.push('        <td width="8%" align="right" nowrap="nowrap"><font color="#ffffff">\u7528\u6237\uff1a</font></td>');
				setHtml.push('        <td width="25%" nowrap="nowrap"><input type="text" name="username"/><input type="hidden"  name="screenwidth" /></td>');
				setHtml.push('        <td width="10%" align="right" nowrap="nowrap" style="top_color"><font color="#ffffff">\u5bc6\u7801\uff1a</font></td>');
				setHtml.push('        <td width="25%" nowrap="nowrap"><input type="password" name="password"/></td>');
			}
			setHtml.push('        <td width="9%" align="right" nowrap="nowrap" style="top_color"><font color="#ffffff">\u5e74\u4efd\uff1a</font></td>');
			
			if (logininfo.isMultiDataSourceDeployMode) {
				setHtml.push('        <td width="23%" nowrap="nowrap">');
				setHtml.push('         <select name="year">');
				for (var i = 0; i < logininfo.loginaCctyear.length; i++) {
					setHtml.push('<option value="' + logininfo.loginaCctyear[i].all + '">' + logininfo.loginaCctyear[i].acctmainbodyname + '</option>');
				}
				setHtml.push('        </select>        </td>');

				if (!logininfo.isca) {
					setHtml.push('        <td colspan="2" nowrap="nowrap">');
					setHtml.push('        <input type="button" value="\u8ba4\u8bc1" id="login_button" onclick="doDataProcess()"/></td>');
				}
			} else {
				setHtml.push('        <td width="23%" nowrap="nowrap">');
				setHtml.push('        <select name="loginacctyear">');
				
				for (var i = 0; i < logininfo.loginaCctyear.length; i++) {
					setHtml.push('<option value="' + logininfo.loginaCctyear[i].loginacctyear + '">' + logininfo.loginaCctyear[i].loginacctyear + '</option>');
				}
				setHtml.push('        </select>');
				setHtml.push('        </td>');
				setHtml.push('        <td width="9%" align="right" nowrap="nowrap" style="top_color"><font color="#ffffff">\u8d22\u653f\uff1a</font></td>');
				setHtml.push('        <td width="23%" nowrap="nowrap">');
				
				if (logininfo.logingovid) {
					setHtml.push('        <select name="logingovid">        ');
					for (var i = 0; i < logininfo.logingovid.length; i++) {
						setHtml.push('<option value="' + logininfo.logingovid[i].govid + '">' + logininfo.logingovid[i].name + '</option>');
					}
					setHtml.push('        </select>');
				}
				setHtml.push('        </td>');

				if (!logininfo.isca) {
					setHtml.push('        <td colspan="2" nowrap="nowrap">');
					setHtml.push('        <input type="button" value="\u8ba4\u8bc1" id="login_button" onclick="doDataProcess()"/></td>');
				}
			}
			setHtml.push('      </tr>');

			if (logininfo.isca) {
				setHtml.push('      <tr>');
				setHtml.push('        <td nowrap="nowrap" colspan="4">&nbsp;</td>');
				setHtml.push('      </tr>');
			} else {
				setHtml.push('        <tr>');
				setHtml.push('           <td nowrap="nowrap" colspan="6">&nbsp;</td>');
				setHtml.push('        </tr>');
			}
				setHtml.push('      <tr><td colspan="4"  nowrap="nowrap" valign="bottom">&nbsp;<font id="msg" color="red"></font></td>');

			if (logininfo.isca) {
				setHtml.push('        <td colspan="2" nowrap="nowrap">');
				setHtml.push('        <input type="button" value="\u767b\u5f55" id="login_button" onclick="dologin()"/>');
				setHtml.push('        <input type="reset" value="\u91cd\u7f6e" id="login_button" /></td>');

			}
			setHtml.push('      </tr></table></form></div>');
			setHtml.push('<div class="download" onmouseover="this.className=\'download_over\'" onmouseout="this.className=\'download\'"><a href="/common/ifmis_plugins.exe">下载控件</a></div>');

			var retloginpanel = new Ext.Panel({
				id:"systemmain", 
				body:0,
				html:setHtml.join(''),
				keys : {key : Ext.EventObject.ENTER,
					fn : function(btn, e) {
						dologin();
				},
				
				listeners:{
					'afterlayout':function(){
						// 用户框设置焦点
						try {
							document.forms["form1"].username.focus();
						}catch (e) {}
					}
				}
			}
			});
			login_init();
			DSign_Content = logininfo.DSign_Content;
			//alert(logininfo.DSign_Content);
		return retloginpanel;
	};
	
	this.ifmisloginqinghaishow = function(servers,logininfo){
	//debugger;
	       Ext.lt.portal.component.login.server=servers;
			if(logininfo.url!=null){
				this.url=logininfo.url;
			}
			var setHtml=[];		
			var fl=logininfo.IFMIS_FESTIVAL;
			if(fl=="0"){
				setHtml.push('<div style="margin-top:12%; background-image:url(/images/bg/font.gif); background-repeat:no-repeat; background-position:left; height:50px; "></div>');			    							
			}else{
				setHtml.push('<div style="margin-top:12%;height:50px;"></div>');			    							
			}
			setHtml.push('<div id="login1" style="display:block; background-image:url(/ifmis_images/bg/' + logininfo.IFMIS_ADMDIV + '_login_bg.gif); background-repeat:no-repeat;height:221px; width:100%; margin-top:2%; background-position:left; font-size:14px;">');
			if(fl=="1" ||fl=="2" ||fl=="3"||fl=="5" ||fl=="6"){
				setHtml.push('<div id="flasho" style="margin-top:10%;top:0;left:0;background:url('+jrArr[fl]+');Z-INDEX:9999;  no-repeat left top; width:213px; height:113px;POSITION: absolute;overflow:hidden; ">');
	            setHtml.push('</div>');
			}
			setHtml.push('  <form id="form1" name="form1" method="post" action="/login.do">');
			setHtml.push('    <table width="100%" border="0" cellspacing="0" cellpadding="0" style ="width:60%; display:block; margin-top:140px; margin-left:23%;">');
			setHtml.push('      <tr>');

			if (logininfo.isca) {
				setHtml.push('        <td width="8%" align="right" nowrap="nowrap"><font color="#ffffff">\u7528\u6237\uff1a</font></td>');
				setHtml.push('        <td width="25%" nowrap="nowrap"><input type="text" name="username"/><input type="hidden"  name="screenwidth" /></td>');
				setHtml.push('        <td width="10%" align="right" nowrap="nowrap" style="top_color"><font color="#ffffff">\u5bc6\u7801\uff1a</font></td>');
				setHtml.push('        <td width="25%" nowrap="nowrap"><input type="password" name="password"/></td>');
			}
			setHtml.push('        <td width="9%" align="right" nowrap="nowrap" style="top_color"><font color="#ffffff">\u5e74\u4efd\uff1a</font></td>');
			
			if (logininfo.isMultiDataSourceDeployMode) {
				setHtml.push('        <td width="23%" nowrap="nowrap">');
				setHtml.push('         <select name="year">');
				for (var i = 0; i < logininfo.loginaCctyear.length; i++) {
					setHtml.push('<option value="' + logininfo.loginaCctyear[i].all + '">' + logininfo.loginaCctyear[i].acctmainbodyname + '</option>');
				}
				setHtml.push('        </select>        </td>');
			} else {
				setHtml.push('        <td width="23%" nowrap="nowrap">');
				setHtml.push('        <select name="loginacctyear">');
				
			    for (var i = 0; i < logininfo.loginaCctyear.length; i++) {
				   setHtml.push('<option value="' + logininfo.loginaCctyear[i].loginacctyear + '">' + logininfo.loginaCctyear[i].loginacctyear + '</option>');
			    }
			    setHtml.push('        </select>');
			    setHtml.push('        </td>');
			    setHtml.push('        <td width="9%" align="right" nowrap="nowrap" style="top_color"><font color="#ffffff">\u8d22\u653f\uff1a</font></td>');
			    setHtml.push('        <td width="23%" nowrap="nowrap">');
				
			    if (logininfo.logingovid) {
				   setHtml.push('        <select name="logingovid">        ');
				   for (var i = 0; i < logininfo.logingovid.length; i++) {
					 setHtml.push('<option value="' + logininfo.logingovid[i].govid + '">' + logininfo.logingovid[i].name + '</option>');
				   }
				   setHtml.push('        </select>');
			    }
			    setHtml.push('        </td>');

			}
			  setHtml.push('      </tr>');

			setHtml.push('      <tr>');
			setHtml.push('        <td nowrap="nowrap" colspan="4">&nbsp;</td>');
			setHtml.push('      </tr>');
				
				//错误信息提示
				setHtml.push('      <tr><td colspan="4"  nowrap="nowrap" valign="bottom">&nbsp;<font id="msg" color=red></font></td>');

				setHtml.push('        <td colspan="2" nowrap="nowrap">');
				  setHtml.push('        <input type="button" value="登录" id="login_button" onclick="dologin()"/>');
				  setHtml.push('        <input type="reset" value="重置" id="login_button" />');
				  setHtml.push('        <input type="button" value="认证" id="login_button" onclick="doDataProcess()"/><a style="font-size:12px;color:#000000" href="http://10.116.1.1/download/ysdw/CAkey.rar">下载证书驱动</a></td>');
			
			setHtml.push('      </tr></table></form></div>');
			
			//下载控件
			setHtml.push('<div class="download" onmouseover="this.className=\'download_over\'" onmouseout="this.className=\'download\'"><a href="/common/ifmis_plugins.exe">下载控件</a></div>');
      
			var retloginpanel = new Ext.Panel({
				id:"systemmain", 
				body:0,				
			    unstyled:true,												
				html:setHtml.join(''),
				keys : {key : Ext.EventObject.ENTER,
					fn : function(btn, e) {
						dologin();
				},
				
				listeners:{
					'afterlayout':function(){
						// 用户框设置焦点
						try {
							document.forms["form1"].username.focus();
						}catch (e) {}
					}
				}
			}
			});
			login_init();
			DSign_Content = logininfo.DSign_Content;
			//alert(logininfo.DSign_Content);
			  window.onload=function(){			    
			    document.body.style.backgroundColor = "white";			    
			  }
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
			para_login.DSign_Content = DSign_Content;
			if (document.forms[0].year != null) {
				para_login.year = document.forms[0].year.value;
			} else {
				para_login.loginacctyear = document.forms[0].loginacctyear.value;
				para_login.logingovid = document.forms[0].logingovid.value;
			}
		}
	}
	Ext.lt.RCP.call(Ext.lt.portal.component.login.server, "calogin", para_login , function (resp) {
		if (resp=="true") {
			window.location.href = Ext.lt.portal.component.login.url;//"./default.page";
			//window.location.href = "./default.page";
		} else {
			document.getElementById("msg").innerText = resp;
		}
	});
}

function dologinscr() {
	para_login.name = document.forms[0].username.value;
	para_login.password = document.forms[0].password.value;
	if (document.forms[0].year != null) {
		para_login.year = document.forms[0].year.value;
	} else {
		para_login.loginacctyear = document.forms[0].loginacctyear.value;
		para_login.logingovid = document.forms[0].logingovid.value;
	}
	Ext.lt.RCP.script("./","defaultloginservice", "login", para_login, "dologinScriptRun");
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
function dologin() {
	var form=document.forms[0];
	para_login.name = form.username.value;
	para_login.password = form.password.value;
	if (form.year != null) {
		para_login.year = form.year.value;
	} else {
		para_login.loginacctyear = form.loginacctyear.value;
		para_login.logingovid = form.logingovid.value;
	}
	Ext.lt.RCP.call(Ext.lt.portal.component.login.server, "login",  para_login, function (resp) {
		if (resp=="true") {
			window.location.href = Ext.lt.portal.component.login.url;//"./default.page";
			form.password.value = "";
			//window.location.href = "./default.page";
		} else {
			document.getElementById("msg").innerText = resp;
			form.password.value = "";
		}
	});
}

