// 定义Portal命名空间
if(Ext.lt.portal==null) Ext.lt.portal = {component:{}};
if (Ext.lt.portal.component == null) {
	Ext.lt.portal.component = {};
}

//------------------（消息）----------------------------------------------------------------------------
/*
初始化参数
	remind：界面上用于显示“消息中心”的DIV对象
	refreshtime：刷新时间间隔，毫秒值，默认30秒
	popflag：整体控制是否需要显示右下角弹出提示框，如果整体配置允许弹框，还需要判断个人设置是否弹框
	showflash：是否显示flash提醒

调用方法
var msgcmp=new Ext.lt.portal.component.message({
		remind:document.getElementById('remind'),
		refreshtime:20000,
		popflag:true,
		showflash:false
});
msgcmp.draw(document.body)
*/
Ext.lt.portal.component.message=Ext.lt.createComponent(function(config){
	// 消息组件
	var cmp={}
	//显示"消息中心"的DIV对象
	var _reminddiv=config.remind;
	//刷新时间间隔
	var _msgrefreshtime=config.refreshtime
		if(_msgrefreshtime==null||_msgrefreshtime==""||_msgrefreshtime<10000){
			_msgrefreshtime=30000;
		}
	// 整体配置是否需要弹出
	var _pop=config.popflag;
	// 是否使用flash提示
	var _flashnotice=config.showflash;
	//消息提示外框对象		
	var _msgbox=null;
	//消息提示内容框对象	
	var _eMeng=null;
	//flash对象	
	var _flashbox=null;
	//下一条按钮对象
	var _nextBtn=null;
	//上一条按钮对象
	var _preBtn=null;
	//查看全部按钮对象
	var _allBtn=null;
	//关闭按钮对象
	var _closeBtn=null;
	//内容显示位置对象
	var _msginfo=null;
	//当前页数显示位置对象
	var _currentpage=null;
	//链接对象
	var _msgLInk=null;
	//保存所有消息
	var messages="";
	//保存当前显示是第几条消息，用来选择上一条、下一条
	var tempMsg=1;
	var unreadMsg = config.unreadMsg;
	// flash消息提示
	function showflash(){
		if(_flashbox==null){
			//调用框架方法检测flash版本
			Ext.lt.ifmis.activex.getFlashVersion();
			_flashbox=document.createElement('DIV');
			_flashbox.id='msg';
			_flashbox.style.cssText='bottom:0; right:0;Z-INDEX:99999;display:none;no-repeat left top;  POSITION: absolute; text-align:center;';
			_flashbox.innerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="101" height="101"><param name="movie" value="/portal/images/wininfo_00.swf" /><param name="quality" value="high" /> <param name="wmode" value="transparent" /><embed src="/portal/images/wininfo_00.swf" width="101" height="101" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash"></embed></object>';
			document.body.appendChild(_flashbox);
		}
	}

	// 显示消息提示框(ie6下使用htc文件使div背景透明后，div显示内容不能点击，所以背景和显示内容分为两个div，重叠显示)
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

	// 弹出个人消息框内容
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
	
	// 上一条消息
	function gopreMsg(){
		if(tempMsg>1){
			tempMsg--;
			var message = messages[tempMsg-1];
			makeMsgCont(message);
		}
	}
	
	// 下一条消息
	function gonextMsg(){
		if(tempMsg<messages.size()){
	   		 tempMsg++;
	   		 var message = messages[tempMsg-1];
	  		 makeMsgCont(message);
	    }	 
	}
	
	// 组装消息内容
	function makeMsgCont(message){
	 	 var createtime=message.createtime;
		 //如果该消息有链接
		 if(message.linkname!=null&&message.linkname!=""){
			 var msghtml = '<font color=#155402>&nbsp&nbsp发送人：'+message.sendname+'</font><br><a id="msglink" target="_parent"  href="'+message.linkname+'">&nbsp&nbsp消息内容：'+message.content+'</a>';
		 }else{
			 var msghtml = '<font color=#155402>&nbsp&nbsp发送人：'+message.sendname+'</font><br><a style="text-decoration:none;" id="msglink"  href="#">&nbsp&nbsp消息内容：'+message.content+'</a>';
		 }
   		_msginfo.innerHTML=msghtml;
		_currentpage.innerHTML=tempMsg+"/"+messages.size();
		_msgLInk=document.getElementById("msglink");
		_msgLInk.onclick=saveMessageRecord;
	}
	
	// 获取个人消息
	function loadMsg(){
		// 这里加载待办事项内容
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
			// 如果失败，则重新启动定时器
			function(){startCheckMsg()}
		);
	}
	
	// 检查服务端消息，如果存在代办消息则开始提示
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
		// 如果失败，则重新启动定时器
		function(){startCheckMsg()});
	}
	
	// 启动定时器检查待办事项
	function startCheckMsg(){
		window.setTimeout(checkMsg, _msgrefreshtime);
	}
	
	cmp.draw=function(el){ 
		// 启动消息查询定时器
		//startCheckMsg();
		// 设置消息中心显示内容
		if(_reminddiv!=null){
			//如果有未读消息
			if(unreadMsg!="0"&&unreadMsg!="null"){
				_reminddiv.innerHTML='<a title="消息中心" href="javascript:void(0)" class="havemsg"> 消息中心 </a>';
			}
			_reminddiv.onclick=showmsgrecord;

		}
	}
	cmp.resize=function(el){
	}
	// 启动消息查询定时器
	window.setTimeout(checkMsg, 3000);
	// 展示消息
	function popMsg(msgList){
		messages=msgList;
		if(msgList!=undefined&&msgList.size()>0){//如果有需要显示的消息
			//默认显示第一条消息
			var msg=msgList[0];
			//当前消息索引
			tempMsg=1;
			if(_eMeng.innerHTML==""||_nextBtn==null){
				var rightnowHtml = [
					'<table border="0" cellspacing="0" cellpadding="0" align="center" style="margin-top:13px;margin-left:18px; width:90%">'
					,'<tr><td nowrap="nowrap" width="125px" style="height:25px;">&nbsp;</td>'
					,'<td id="currentpage" class="msinfo" style="font-size:14px;font-weight:bold; color:#155402;">'+tempMsg+'/'+msgList.size()+'</td>'
					,'<td nowrap="nowrap"class="closeinfo" title="关闭" id="closeMsg"  onmouseover="this.className=\'closeinfo_over\'" onmouseout="this.className=\'closeinfo\'" onmousedown="this.className=\'closeinfo_click\'" onmouseup="this.className=\'closeinfo\'" >&nbsp;</td>'
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
				//如果有需要显示消息则把消息显示到消息的div中
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
			//如果消息div属性是隐藏的
			if(_eMeng.style.display=="none"){
				if((_flashnotice==true||_flashnotice=="true")&&_flashbox!=null){//如果需要显示flash图片
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
	
	// 点击查看全部
	function openMsg(){
		saveAllMessage();
	}
	// 把未读的消息保存到消息记录表中.
	function saveAllMessage(){
		closeMsgDiv();
		var param =new Object();
		param.msgList = messages; 
		Ext.lt.RCP.server('rightnowmessage', "saveAllMessage",  param, function (resp) {
				showmsgrecord();//打开消息中心，默认显示未读的消息
		},function(){});
	}
	// 点击关闭
	function closeAllMessage(){
		closeMsgDiv();
		var param =new Object();
		param.msgList = messages; 
		Ext.lt.RCP.server('rightnowmessage', "saveAllMessage",  param, function (resp) {
		},function(){});
	}
	// 关闭消息div
	function closeMsgDiv(){
		jQuery("#eMeng").hide();
		jQuery("#eMengbg").hide();
		startCheckMsg();
	}
	
	// 模态窗口查询消息记录
	function showmsgrecord(){
		var ieHeight = 450;//弹出窗口高度
		var ver;//浏览器版本 
		var bType;//浏览器类型 
		var ver = navigator.appVersion; 
      	var vNumber=parseFloat(ver.substring(ver.indexOf("MSIE ")+5,ver.lastIndexOf("Windows"))); 
		if (vNumber == 6.0) ieHeight = 494;
		var url = "/portal/portal2/message/showmessagerecord.jsp";
		var rv = window.showModalDialog(url,window,"dialogHeight:"+ieHeight+"px;dialogWidth:805px;resizable: No; status: No; help:No;");		
	}
	//点击某一条消息调用方法去后台删除消息
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
   		//删除该条消息并存入消息记录表中
		Ext.lt.RCP.server('rightnowmessage', "saveMessageRecord",  pdtPara, function (resp) {
			var msgList = messages;
		    msgList.splice(tempMsg-1,1);//remove当前点击的消息
	 	    messages=msgList;
	 	    //如果点击后还有其他消息，显示第一条消息，否则隐藏消息窗口
	 	    if(msgList.size()>0){
		 	    var message = msgList[0];
		 	    tempMsg=1;//当前消息索引 
		 	    makeMsgCont(message);	
	 	    }else{
	 	    	//如果消息窗口的消息都被点击查看了，隐藏消息div
				jQuery("#eMeng").hide();
				jQuery("#eMengbg").hide();
	 	    }
		},function(){closeMsgDiv();});
	}
	return cmp;	
});
