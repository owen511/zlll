// ����Portal�����ռ�
if(Ext.lt.portal==null) {
	Ext.lt.portal = {component:{}};
}
if (Ext.lt.portal.component == null) {
	Ext.lt.portal.component = {};
}

Ext.lt.portal.component.ifmislogo = function (config, service) {
	var ifmislogo={};
	ifmislogo.cfg=config;
	ifmislogo.cfg.el=null;
	
	function blue(cfg){
		//cfg.el.innerHTML="<table width=100%><tr><td></td></td></tr></table>";
	}
	function green(cfg){
	}
	
	//����Ĭ�Ϸ�����
	try{
		ifmislogo.fn=eval(cfg.type);
	}catch(e){
		ifmislogo.fn=blue;
	}
	if(ifmislogo.fn==null)ifmislogo.fn=blue;
	
	ifmislogo.draw=function(div){
		if(this.cfg.el!=null){
			return ;
		}
		this.cfg.el=div;
		if(this.cfg.el!=null){
			this.cfg.el.className+='logo';
			this.fn(this.cfg);
		}
	}
	ifmislogo.resize=function(w,h){
	}
	return ifmislogo;
	
}

Ext.lt.portal.component.sysbutton=function(config,service){
	var sysbutton={};
	sysbutton.cfg=config;
	sysbutton.cfg.el=null;
	function blue(config){
	var logoCfg = config.logoConfig;
		var sysHtml=[];
		sysHtml.push('<table border="0" cellspacing="0" cellpadding="0" class="table" >');
		sysHtml.push('<tr>');
		sysHtml.push('<td nowrap="nowrap">');
		sysHtml.push('<div style="width:6px;float:right">');
		sysHtml.push('</div>');
		if(logoCfg.exitshow == "1") {
			sysHtml.push('<div style="float:right">');
			if (config.ischeckpengding == "true") {
				sysHtml.push('<a title="�˳�" href="#" onclick="IsLogout();"><img src="/images/actions/exit.gif" width="16" height="16" border="0" /> �˳� </a>');
			} else {
				sysHtml.push('<a title="�˳�" href="' + _ROOT_PATH_ + '/logout.page"><img src="/images/actions/exit.gif" width="16" height="16" border="0" /> �˳� </a>');
			}
			sysHtml.push('</div>');
		}	
		sysHtml.push('<div class="w_gang"></div>');
		sysHtml.push('<div style="float:right">');
		sysHtml.push('<a title="������ҳ" href="http://127.0.0.1:7001/defaultcommon.page"><img src="/images/actions/house.gif" width="16" height="16" /> ��ҳ</a>');
		sysHtml.push('</div>');
		if (logoCfg.isaccuser == 1) {
			sysHtml.push('<div class="w_gang"></div>');
			sysHtml.push('<div style="float:right">');
			sysHtml.push('<a title="�л���ɫ" href="/portal/portal2/login/accuser.jsp"><img src="/images/actions/house.gif" width="16" height="16" /> �л���ɫ</a>');
			sysHtml.push('</div>');
		}
		sysHtml.push('<div class="w_gang"></div>');
		sysHtml.push('<div style="width: 65px; float:right">');
		sysHtml.push('<a title="ϵͳ��������" href="#" onclick="showInfo();"><img src="/images/actions/setsys.gif" width="16" height="16" border="0" />�ͻ�������</a>');
		sysHtml.push('</div>');
		sysHtml.push('<div class="w_gang"></div>');
		sysHtml.push('<div style="float:right">');
		sysHtml.push('<img src="/images/actions/font_size.gif" width="16" height="16" border="0" title="�ֺ�" />');
		sysHtml.push('<a href="#" onclick="setFont(\'l\')">��</a><a href="#" onclick="setFont(\'m\')"> ��</a><a href="#" onclick="setFont(\'s\')"> С</a>');
		sysHtml.push('</div>');

		if (logoCfg.passwordshow == "1" && logoCfg.isportalca == "false") {
			sysHtml.push('<div class="w_gang"></div>');
			sysHtml.push('<div style="width: 60px;float:right">');
			sysHtml.push('<a title="�޸�����" href="/portal/login/mod_password.jsp" target="_blank"><img src="/images/actions/mod_pwd.gif" width="16" height="16" border="0" /> �޸�����</a>');
			sysHtml.push('</div>');
		}
		if (logoCfg.intranetConfig == "true") {
			sysHtml.push('<div class="w_gang"></div>');
			sysHtml.push('<div style="width: 60px;float:right">');
			sysHtml.push('<a title="��������" href="' + _ROOT_PATH_ + '" target="_blank"><img src="' + _ROOT_PATH_ + '/images/actions/go_innerNet.gif" width="16" height="16" border="0" /> ����</a>');
			sysHtml.push('</div>');
		}
		if (logoCfg.changeyear == "1") {
			sysHtml.push('<div class="w_gang"></div>');
			sysHtml.push('<div id="changeyear" style="width: 60px;float:right">');
			sysHtml.push('<a title="�л����" href="javascript:void(0)"  onclick="changeYear();"><img src="' + _ROOT_PATH_ + '/portal/images/changeyear/change.gif" width="16" height="16" border="0" /> �л����</a>');
			sysHtml.push('</div>');
		}
		if (logoCfg.quickhelp == "1") {
			sysHtml.push('<div class="w_gang"></div>');
			sysHtml.push('<div id="quickhelp" style="width: 60px;float:right">');
			sysHtml.push('<a title="��������" href="javascript:void(0)"><img src="/images/actions/help.gif" width="16" height="16" /> ��������</a>');
			sysHtml.push('</div>');
		}
		if (logoCfg.isMessage == "1" || logoCfg.isMessage == "2") {
			sysHtml.push('<div class="w_gang"></div>');
			sysHtml.push('<div id="remind" style="width: 60px;float:right">');
			sysHtml.push('<a title="��Ϣ����" href="javascript:void(0)" style="display: block; width: 50px; padding-left: 20px; padding-top: 8px; background: url(/images/actions/look.gif) no-repeat left center;"> ��Ϣ���� </a>');
			sysHtml.push('</div>');
		}
		sysHtml.push('<div id="remindcss" style="display: none" class="w_gang"></div>');
		sysHtml.push('<div class="w_head"></div>');
		sysHtml.push('</td>');
		sysHtml.push('</tr>');
		sysHtml.push('<tr>');
		sysHtml.push('<td nowrap="nowrap" class="welcomeA">');
		
		if (logoCfg.refreshType == 1&&null != logoCfg.area_name && config.area_name != "") {
			sysHtml.push('����:' + logoCfg.area_name);
		}
		//��¼�������
		sysHtml.push('���:' + logoCfg.year);
		//�ж��Ƿ���ʾ����
		if (null != logoCfg.loginAreaName && logoCfg.loginAreaName != "") {
			sysHtml.push('����:' + logoCfg.loginAreaName);
		}
		//�û���λ��Ϣ
		if (logoCfg.agencyType != null) {
			if (logoCfg.agencyName != null) {
				sysHtml.push('&nbsp;' + logoCfg.agencyType + ':' + logoCfg.agencyName);
			} else {
				sysHtml.push('');
			}
		} else if (logoCfg.agencyName != null) {
			sysHtml.push('&nbsp;��λ:' + logoCfg.agencyName);
		}
		if (logoCfg.refreshType == 1&&null != logoCfg.showAcctsystype && logoCfg.showAcctsystype != "") {
			sysHtml.push('����:' + logoCfg.showAcctsystype);
		}
		//�û�������Ϣ
		sysHtml.push('&nbsp;�û�:' + logoCfg.name);
		//��ǰϵͳ����
		if (logoCfg.agencyType != null) {
			sysHtml.push('&nbsp;����:');
		} else {
			sysHtml.push('&nbsp;ϵͳ����:');
		}
		sysHtml.push('<span id=cdate>' + logoCfg.systemdate);
		sysHtml.push('</span>')
		sysHtml.push('&nbsp;</td>');
		sysHtml.push('</tr>');
		sysHtml.push('</table>');
		config.el.innerHTML=sysHtml.join('');
		Ext.lt.message.send('showlogo','onshow',logoCfg);
	}
	function green(cfg){
		var sysHtml=[];
		sysHtml.push('<table width="100%" border="0" cellspacing="0" cellpadding="0">');
		sysHtml.push('<tr>');
		sysHtml.push('<td nowrap="nowrap" class="scrolltosysbtn">&nbsp;</td>');
		sysHtml.push('<td nowrap="nowrap" class="sysbtnleft">&nbsp;</td>');
		sysHtml.push('<td nowrap="nowrap" class="sysbtnmiddle">');
		sysHtml.push('<a title="��Ϣ����" href="javascript:void(0)" class="message_eight" onclick=""></a>');
		sysHtml.push('<a title="�ص���ҳ" href="http://127.0.0.1:7001/defaultcommon.page" class="homepage"></a>');
		sysHtml.push('<a title="�޸�����" href="/portal/login/mod_password.jsp" target="_blank" class="modpwd"></a>');
		sysHtml.push('<a title="�˳�ϵͳ" href="http://127.0.0.1:7001/logout.do"  class="exitsys" ></a>');
		sysHtml.push('</td>');
		sysHtml.push('<td nowrap="nowrap" class="moresysbtn" title="���ఴť"  onmouseover="this.className=\'moresysbtn_over\'" onmouseout="this.className=\'moresysbtn\'" onmousedown="this.className=\'moresysbtn_down\'" onmouseup="this.className=\'moresysbtn\'">&nbsp;</td>');
		sysHtml.push('</tr>');
		sysHtml.push('</table>');
		cfg.el.innerHTML=sysHtml.join('');
	}
	
	//����Ĭ�Ϸ�����
	try{
		sysbutton.fn=eval(sysbutton.cfg.type);
	}catch(e){
		sysbutton.fn=blue;
	}
	if(sysbutton.fn==null){
		sysbutton.fn=blue;
	}
	sysbutton.draw=function(div){
		Ext.lt.message.hook('showlogo','onshow',function(config){
			//������Ϣ
			if("1"==config.isMessage||"2"==config.isMessage){
				try{
					var msgcmp=new Ext.lt.portal.component.message({
						remind:document.getElementById('remind'),
						refreshtime:config.msgrefreshtime,
						popflag:config.popflag,
						showflash:config.showflash,
						unreadMsg:config.unreadMsg
					});
					msgcmp.draw(document.body);
				}catch(e){
				}
			}
			Ext.lt.showhelpWin=function(){
				var _helpDiv=document.getElementById('helpDIV');
				if(_helpDiv!=null){
					return;
				}	
				var helpDiv=document.createElement('DIV');
				helpDiv.id='helpDIV';
				helpDiv.innerHTML="<iframe OVERFLOW-Y:scroll; allowtransparency=true  frameborder='0' style='width:720px;height:410px;' src='"+_ROOT_PATH_+"/portal/onlinehelp/oneKeyHelp.jsp'></iframe>";
				helpDiv.style.cssText='display:block;top:expression((document.body.clientHeight-this.style.pixelHeight)/2);left:expression((document.body.clientWidth-this.style.pixelWidth)/2);center ;Z-INDEX:9999; width:720px; height:410px; POSITION: absolute;overflow:hidden;';
				document.body.appendChild(helpDiv);
			} 
			//logo�����ʰ�ť
			var _quickhelp=document.getElementById("quickhelp");
			if(_quickhelp!=null){
				_quickhelp.onclick=Ext.lt.showhelpWin;
			}
			//�������߰����Ŀ�ݼ�'shift+as'
			Ext.lt.regKeyEvent('as',Ext.lt.showhelpWin,false,true);
		});
		
		if(this.cfg.el!=null){
			return ;
		}
		this.cfg.el=div;
		if(this.cfg.el!=null){
			this.fn(this.cfg);
		}
	}
	sysbutton.resize=function(w,h){
		
	}
	/**
	 * �л����
	 */
	Ext.lt.changeYear=function(config){
		var changeYears =config.changeYears!=null?eval(config.changeYears):"";debugger;
		var areaInfo = config.areaInfo!=null?eval( config.areaInfo):"";
		var _changeYearDiv = document.getElementById('changeYearDiv');
		if(_changeYearDiv!=null){
			_changeYearDiv.innerHTML="";   
		}else{
			var _changeYearDiv = document.createElement('DIV');
			_changeYearDiv.id='changeYearDiv';
			_changeYearDiv.style.cssText='width:340px;height:90px;Z-INDEX:99999; position:absolute';
			document.body.appendChild(_changeYearDiv);
		}
		
		var changeHtml = ['<table  border="0" cellspacing="0" cellpadding="0" width="100%"><tr><td nowrap="nowrap" colspan="4">&nbsp;</td></tr><tr><td nowrap="nowrap" colspan="4">&nbsp;</td></tr>',
		                  '<tr><td nowrap="nowrap" colspan="1">&nbsp;&nbsp;'
		                  ,'  ������ȣ�<select id = "changeYearselect" style="width:100px;">'];
		//�����ݻ��߶������ת�������� �ñ�����Ϊ��
		if(changeYears!=null){
			for(var i = 0;i < changeYears.length;i ++){
				var changeyear = changeYears[i];
				if(changeyear.acctyear.indexOf(titleYear)!=-1){
					changeHtml.push('<option selected value="'+changeyear.all+'">&nbsp'+changeyear.acctyear+'��</option>');
				}else{
					changeHtml.push('<option  value="'+changeyear.all+'">&nbsp;'+changeyear.acctyear+'��</option>');
				}
			}
		//�������ת�ӷ��� 	
		}else if(areaInfo!=null){
			for(var i = 0;i < areaInfo.length;i ++){
				var changeyear = areaInfo[i];
				if(changeyear.year.indexOf(titleYear)!=-1){
					changeHtml.push('<option selected value="'+changeyear.inditext+'">&nbsp;'+changeyear.year+'��</option>');
				}else{
					changeHtml.push('<option  value="'+changeyear.inditext+'">&nbsp;'+changeyear.year+'��</option>');
				}
			}
		}
		changeHtml.push('</select>&nbsp;&nbsp;&nbsp;&nbsp;<button id="surebtn" onclick="goToChangeYear();" class="button_style">ȷ��</button>');	
		changeHtml.push('</td></tr></table>');
		
		//������صı�
		changeHtml.push('<form id="loginForm" name="loginForm" method="post" action="">');
		changeHtml.push('<input type="hidden" id="username" name="username"/>');
		changeHtml.push('<input type="hidden" id="year" name="year"/>');
		changeHtml.push('<input type="hidden" id="password" name="password"/>');
		changeHtml.push('<input type="hidden" id="area" name="area"/>');
		changeHtml.push('<input type="hidden" id="area_name" name="area_name"/>');
		changeHtml.push('<input type="hidden" id="screenwidth" name="screenwidth"/>');
		changeHtml.push('<input type="hidden" id="mainUrl" name="mainUrl"/>');
		changeHtml.push('<input type="hidden" id="signed_data" name="signed_data"/>');
		changeHtml.push('<input type="hidden" id="DSign_Content" name="DSign_Content"/>');
		changeHtml.push('<input type="hidden" id="glca" name="glca"/>');
		changeHtml.push('<input type="hidden" id="pk" name="pk"/>');
		changeHtml.push('<input type="hidden" id="Sign_value" name="Sign_value"/>');
		changeHtml.push('<input type="hidden" id="glca" name="glca"/>');
		changeHtml.push('<input type="hidden" id="pk" name="pk"/>');
		changeHtml.push('<input type="hidden" id="Sign_value" name="Sign_value"/>');
		changeHtml.push('<input type="hidden" id="areaInfo" name="areaInfo"/>');
		changeHtml.push('</form>');
		_changeYearDiv.innerHTML=changeHtml.join('');
		
		wind=new Ext.lt.window({title:'��ѡ��������',fitmode:'content',className:'wind7',pop:true,mark:true});
		wind.draw(_changeYearDiv);
		document.getElementById('changeYearselect').style.display = '';
	}
	return sysbutton;
}
