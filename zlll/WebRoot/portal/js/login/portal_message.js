// ����Portal�����ռ�
if(Ext.lt.portal==null) Ext.lt.portal = {component:{}};
if (Ext.lt.portal.component == null) {
	Ext.lt.portal.component = {};
}

//------------------����Ϣ��----------------------------------------------------------------------------
/*
��ʼ������
	remind��������������ʾ����Ϣ���ġ���DIV����
	refreshtime��ˢ��ʱ����������ֵ��Ĭ��30��
	popflag����������Ƿ���Ҫ��ʾ���½ǵ�����ʾ������������������򣬻���Ҫ�жϸ��������Ƿ񵯿�
	showflash���Ƿ���ʾflash����

���÷���
var msgcmp=new Ext.lt.portal.component.message({
		remind:document.getElementById('remind'),
		refreshtime:20000,
		popflag:true,
		showflash:false
});
msgcmp.draw(document.body)
*/
Ext.lt.portal.component.message=Ext.lt.createComponent(function(config){
	// ��Ϣ���
	var cmp={}
	//��ʾ"��Ϣ����"��DIV����
	var _reminddiv=config.remind;
	//ˢ��ʱ����
	var _msgrefreshtime=config.refreshtime
		if(_msgrefreshtime==null||_msgrefreshtime==""||_msgrefreshtime<10000){
			_msgrefreshtime=30000;
		}
	// ���������Ƿ���Ҫ����
	var _pop=config.popflag;
	// �Ƿ�ʹ��flash��ʾ
	var _flashnotice=config.showflash;
	//��Ϣ��ʾ������		
	var _msgbox=null;
	//��Ϣ��ʾ���ݿ����	
	var _eMeng=null;
	//flash����	
	var _flashbox=null;
	//��һ����ť����
	var _nextBtn=null;
	//��һ����ť����
	var _preBtn=null;
	//�鿴ȫ����ť����
	var _allBtn=null;
	//�رհ�ť����
	var _closeBtn=null;
	//������ʾλ�ö���
	var _msginfo=null;
	//��ǰҳ����ʾλ�ö���
	var _currentpage=null;
	//���Ӷ���
	var _msgLInk=null;
	//����������Ϣ
	var messages="";
	//���浱ǰ��ʾ�ǵڼ�����Ϣ������ѡ����һ������һ��
	var tempMsg=1;
	var unreadMsg = config.unreadMsg;
	// flash��Ϣ��ʾ
	function showflash(){
		if(_flashbox==null){
			//���ÿ�ܷ������flash�汾
			Ext.lt.ifmis.activex.getFlashVersion();
			_flashbox=document.createElement('DIV');
			_flashbox.id='msg';
			_flashbox.style.cssText='bottom:0; right:0;Z-INDEX:99999;display:none;no-repeat left top;  POSITION: absolute; text-align:center;';
			_flashbox.innerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="101" height="101"><param name="movie" value="/portal/images/wininfo_00.swf" /><param name="quality" value="high" /> <param name="wmode" value="transparent" /><embed src="/portal/images/wininfo_00.swf" width="101" height="101" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash"></embed></object>';
			document.body.appendChild(_flashbox);
		}
	}

	// ��ʾ��Ϣ��ʾ��(ie6��ʹ��htc�ļ�ʹdiv����͸����div��ʾ���ݲ��ܵ�������Ա�������ʾ���ݷ�Ϊ����div���ص���ʾ)
	function showMsgWindow(){
		if(_msgbox==null){
			_msgbox=document.createElement('DIV');
			_msgbox.id='eMengbg';
			_msgbox.style.cssText='display:none;bottom:0;right:0;background:url(/portal/images/msgImages/wininfo_k.png); Z-INDEX:999;  no-repeat left top; width:278px; height:193px; POSITION: absolute;overflow:hidden; ';
			document.body.appendChild(_msgbox);
			_eMeng=document.createElement('DIV');
			_eMeng.id='eMeng'
			_eMeng.style.cssText='display:none;bottom:0;right:0;Z-INDEX:9999;width:278px; height:193px;POSITION:absolute;overflow:hidden;text-align:center;'
			document.body.appendChild(_eMeng);
		}
	}

	// ����������Ϣ������
	function initMsg(){
		if(_flashnotice==true||_flashnotice=="true"){
			showflash();
			showMsgWindow();	
			//setTimeout(showMsgWindow,1000);
		}
		else{
			showMsgWindow();	
		}
	}
	
	// ��һ����Ϣ
	function gopreMsg(){
		if(tempMsg>1){
			tempMsg--;
			var message = messages[tempMsg-1];
			makeMsgCont(message);
		}
	}
	
	// ��һ����Ϣ
	function gonextMsg(){
		if(tempMsg<messages.size()){
	   		 tempMsg++;
	   		 var message = messages[tempMsg-1];
	  		 makeMsgCont(message);
	    }	 
	}
	
	// ��װ��Ϣ����
	function makeMsgCont(message){
	 	 var createtime=message.createtime;
		 //�������Ϣ������
		 if(message.linkname!=null&&message.linkname!=""){
			 var msghtml = '<font color=#155402>&nbsp&nbsp�����ˣ�'+message.sendname+'</font><br><a id="msglink" target="_parent"  href="'+message.linkname+'">&nbsp&nbsp��Ϣ���ݣ�'+message.content+'</a>';
		 }else{
			 var msghtml = '<font color=#155402>&nbsp&nbsp�����ˣ�'+message.sendname+'</font><br><a style="text-decoration:none;" id="msglink"  href="#">&nbsp&nbsp��Ϣ���ݣ�'+message.content+'</a>';
		 }
   		_msginfo.innerHTML=msghtml;
		_currentpage.innerHTML=tempMsg+"/"+messages.size();
		_msgLInk=document.getElementById("msglink");
		_msgLInk.onclick=saveMessageRecord;
	}
	
	// ��ȡ������Ϣ
	function loadMsg(){
		// ������ش�����������
		Ext.lt.RCP.server('rightnowmessage', "findwaittaskmessage",  null, 
			function(resp){
				if(_pop==true||_pop=="true"){
					initMsg();
					popMsg(resp.msgList);
				}
				else{
					var param =new Object();
					param.msgList = resp.msgList; 
					Ext.lt.RCP.server('rightnowmessage', "saveAllMessage", param, function (resp) {startCheckMsg();
					},function(){startCheckMsg();});
					
				}
			},
			// ���ʧ�ܣ�������������ʱ��
			function(){startCheckMsg()}
		);
	}
	
	// ���������Ϣ��������ڴ�����Ϣ��ʼ��ʾ
	function checkMsg(){
		Ext.lt.RCP.server('rightnowmessage', "checkMsg",  null, 
		function (resp) {
			if(resp!=null){
				if(resp=="1") loadMsg();
			}
			else{
				startCheckMsg();
			}
		},
		// ���ʧ�ܣ�������������ʱ��
		function(){startCheckMsg()});
	}
	
	// ������ʱ������������
	function startCheckMsg(){
		window.setTimeout(checkMsg, _msgrefreshtime);
	}
	
	cmp.draw=function(el){ 
		// ������Ϣ��ѯ��ʱ��
		//startCheckMsg();
		// ������Ϣ������ʾ����
		if(_reminddiv!=null){
			//�����δ����Ϣ
			if(unreadMsg!="0"&&unreadMsg!="null"){
				_reminddiv.innerHTML='<a title="��Ϣ����" href="javascript:void(0)" class="havemsg"> ��Ϣ���� </a>';
			}
			_reminddiv.onclick=showmsgrecord;

		}
	}
	cmp.resize=function(el){
	}
	// ������Ϣ��ѯ��ʱ��
	window.setTimeout(checkMsg, 3000);
	// չʾ��Ϣ
	function popMsg(msgList){
		messages=msgList;
		if(msgList!=undefined&&msgList.size()>0){//�������Ҫ��ʾ����Ϣ
			//Ĭ����ʾ��һ����Ϣ
			var msg=msgList[0];
			//��ǰ��Ϣ����
			tempMsg=1;
			if(_eMeng.innerHTML==""||_nextBtn==null){
				var rightnowHtml = [
					'<table border="0" cellspacing="0" cellpadding="0" align="center" style="margin-top:13px;margin-left:18px; width:90%">'
					,'<tr><td nowrap="nowrap" width="125px" style="height:25px;">&nbsp;</td>'
					,'<td id="currentpage" class="msinfo" style="font-size:14px;font-weight:bold; color:#155402;">'+tempMsg+'/'+msgList.size()+'</td>'
					,'<td nowrap="nowrap"class="closeinfo" title="�ر�" id="closeMsg"  onmouseover="this.className=\'closeinfo_over\'" onmouseout="this.className=\'closeinfo\'" onmousedown="this.className=\'closeinfo_click\'" onmouseup="this.className=\'closeinfo\'" >&nbsp;</td>'
					,'<td nowrap="nowrap" width="10px">&nbsp;</td></tr>'
					,'<tr> <td colspan="4" ><div style="width:200px; height:120px;  overflow:auto">'
				];
				rightnowHtml.push('<p id="msginfo" class="msinfo" style="word-break: break-all; word-wrap:break-word;text-align:left;"></p>');
				rightnowHtml.push('</div></td></tr>');
				rightnowHtml.push('<tr><td align="center" colspan="4">');
				rightnowHtml.push('<button class="preinfo" id="premsg"  onmouseover="this.className=\'preinfo_over\'" onmouseout="this.className=\'preinfo\'" onmousedown="this.className=\'preinfo_click\'" onmouseup="this.className=\'preinfo\'"  ></button>');
				rightnowHtml.push('<button class="nextinfo" id="nextmsg" onclick="gonextMsg()"   onmouseover="this.className=\'nextinfo_over\'" onmouseout="this.className=\'nextinfo\'" onmousedown="this.className=\'nextinfo_click\'" onmouseup="this.className=\'nextinfo\'"  ></button>');
				rightnowHtml.push('<button class="showallinfo" id="allmsg"  onmouseover="this.className=\'showallinfo_over\'" onmouseout="this.className=\'showallinfo\'" onmousedown="this.className=\'showallinfo_click\'" onmouseup="this.className=\'showallinfo\'"  ></button>');
				rightnowHtml.push('</td></tr></table>');
				//�������Ҫ��ʾ��Ϣ�����Ϣ��ʾ����Ϣ��div��
				_eMeng.innerHTML=rightnowHtml.join('');
				_nextBtn=document.getElementById('nextmsg');
				_preBtn=document.getElementById('premsg');
				_allBtn=document.getElementById('allmsg');
				_closeBtn=document.getElementById('closeMsg');
				_nextBtn.onclick=gonextMsg;
				_preBtn.onclick=gopreMsg;
				_allBtn.onclick=openMsg;
				_closeBtn.onclick=closeAllMessage;
				_msginfo=document.getElementById("msginfo");
			    _currentpage=document.getElementById("currentpage");
			}
			makeMsgCont(msg);
			//�����Ϣdiv���������ص�
			if(_eMeng.style.display=="none"){
				if((_flashnotice==true||_flashnotice=="true")&&_flashbox!=null){//�����Ҫ��ʾflashͼƬ
					jQuery('#msg').animate({height:101,width:101},"fast");
					window.setTimeout(animation1,3000);
				}else{
					animation2();
				}
			}
		}else{
			jQuery("#eMeng").hide();
			jQuery("#eMengbg").hide();
			startCheckMsg();
		}	
	}
	
	function animation1(){
		jQuery("#msg").hide();
		window.setTimeout(animation2,1000);
	}
	
	function animation2(){
		jQuery("#eMeng").animate({height:193,width:278},"slow");
		jQuery("#eMengbg").animate({height:193,width:278},"slow");
		timeoutclosewin=window.setTimeout(closeMsgDiv,15000);
	}
	
	// ����鿴ȫ��
	function openMsg(){
		saveAllMessage();
	}
	// ��δ������Ϣ���浽��Ϣ��¼����.
	function saveAllMessage(){
		closeMsgDiv();
		var param =new Object();
		param.msgList = messages; 
		Ext.lt.RCP.server('rightnowmessage', "saveAllMessage",  param, function (resp) {
				showmsgrecord();//����Ϣ���ģ�Ĭ����ʾδ������Ϣ
		},function(){});
	}
	// ����ر�
	function closeAllMessage(){
		closeMsgDiv();
		var param =new Object();
		param.msgList = messages; 
		Ext.lt.RCP.server('rightnowmessage', "saveAllMessage",  param, function (resp) {
		},function(){});
	}
	// �ر���Ϣdiv
	function closeMsgDiv(){
		jQuery("#eMeng").hide();
		jQuery("#eMengbg").hide();
		startCheckMsg();
	}
	
	// ģ̬���ڲ�ѯ��Ϣ��¼
	function showmsgrecord(){
		var ieHeight = 450;//�������ڸ߶�
		var ver;//������汾 
		var bType;//��������� 
		var ver = navigator.appVersion; 
      	var vNumber=parseFloat(ver.substring(ver.indexOf("MSIE ")+5,ver.lastIndexOf("Windows"))); 
		if (vNumber == 6.0) ieHeight = 494;
		var url = "/portal/portal2/message/showmessagerecord.jsp";
		var rv = window.showModalDialog(url,window,"dialogHeight:"+ieHeight+"px;dialogWidth:805px;resizable: No; status: No; help:No;");		
	}
	//���ĳһ����Ϣ���÷���ȥ��̨ɾ����Ϣ
	function saveMessageRecord(){
		var message=messages[tempMsg-1];
		var pdtPara = {};
		pdtPara.senduser=message.senduser;
   		pdtPara.msid=message.msid;
   		pdtPara.itemid=message.itemid;
   		pdtPara.type=message.type;
   		pdtPara.content=message.content;
   		pdtPara.linkname=message.linkname;
   		pdtPara.sendname=message.sendname;
   		pdtPara.createtime=message.createtime;
   		pdtPara.system=message.system;
   		pdtPara.source=message.source;
   		//ɾ��������Ϣ��������Ϣ��¼����
		Ext.lt.RCP.server('rightnowmessage', "saveMessageRecord",  pdtPara, function (resp) {
			var msgList = messages;
		    msgList.splice(tempMsg-1,1);//remove��ǰ�������Ϣ
	 	    messages=msgList;
	 	    //����������������Ϣ����ʾ��һ����Ϣ������������Ϣ����
	 	    if(msgList.size()>0){
		 	    var message = msgList[0];
		 	    tempMsg=1;//��ǰ��Ϣ���� 
		 	    makeMsgCont(message);	
	 	    }else{
	 	    	//�����Ϣ���ڵ���Ϣ��������鿴�ˣ�������Ϣdiv
				jQuery("#eMeng").hide();
				jQuery("#eMengbg").hide();
	 	    }
		},function(){closeMsgDiv();});
	}
	return cmp;	
});
