/**
*登录页面公共设置
*/
//设置js路径对象
// 定义Portal命名空间
if(Ext.lt.portal==null) Ext.lt.portal = {component:{}};
if (Ext.lt.portal.component == null) {
	Ext.lt.portal.component = {};
}
//CA证书产生随机数
var DSign_Content = "";
//登录参数信息
var para_login = new Object(); 
//多地区列表对象
var objAreaSelect = null;
//当前页面的风格默认值为1.
var _indexjp = "1";
var isshowlogincuryear = "0";
var glsevertime="";
var overTimeSe="";
var overTimeContext="";
/**
*登录页面对象
*/
Ext.lt.portal.component.login = new function () {
	var jrArr=['','/portal/images/jr/5_1.png','/portal/images/jr/8_15.png','/portal/images/jr/10_1.png','','/portal/images/jr/1_1.png','/portal/images/jr/12_25.png'];
	var logincmp=this;
	//登陆后系统首页路径
	this.url="./login/default.page";
	//登录认证server
	this.server="";
	this.indexjsp="";
	// 关闭窗口
	this.closewindow=function(){window.opener=null;window.close()};
	//默认登录设置对象
	this.ifmisDefaultLogin = function(logininfo,servers){
		Ext.lt.portal.component.login.logininfo=logininfo;
		_indexjp = logininfo.indexjsp;
	    if(logininfo.isshowlogincuryear!=null){
	    	isshowlogincuryear = logininfo.isshowlogincuryear;
		}
	    //多地区登录判断
	    //如果登录成功，则跳转到登录页面,直接走跳转登录
	    if (logininfo.errorMessage=="true"){
				window.location.href = _ROOT_PATH_ + "/defaultcommon.page";
	    //如果为授权用户，则跳转到授权页面
	    }else if(logininfo.errorMessage=="shouquan"){
				window.location.href = _ROOT_PATH_ + "/portal/portal2/login/accuser.jsp";	
	    //多地区跳转退出到主服务地址
	    }else if (logininfo.mainUrl != null){
	        //如果是退出系统
	        if(null!=logininfo.logoutparam){
		        //退出前先调用当前服务的退出接口，注销用户登录信息
		        Ext.lt.RCP.call(servers, "logoutAction", null, function (resp) {
					if(resp == "1"){
						window.opener=null;
						window.close();
						return;
					}
				});
	       //退出到主服务期登录页面，并给出提示信息				
				window.location.href = logininfo.mainUrl + "/logout.page";
				//如果是登录失败
			}else{
				window.location.href = logininfo.mainUrl + "/logout.page?errorMessage=" + logininfo.errorMessage;
			}
		//如果多地区跳转登录失败则返回到主服务登陆页面，并给出提示信息
	    }
	    //多地区列表对象
        objAreaSelect = logininfo.loginArea;
	    //登录认证server
		  logincmp.server=servers;
		    //设置登录后系统首页路径
			if(logininfo.url!=null){
				this.url=logininfo.url;
			}
			window.status=logininfo.copyright==null?"Copyright&copy; 厦门市财政局":logininfo.copyright;
      //调用对应系统登录页面对象
			if(null!=logininfo.logoutparam){
				Ext.lt.RCP.call(logincmp.server, "logoutAction", null, function (resp) {
					if(resp == "1"){
						logincmp.closewindow();
						return;
					}else{
						return logincmp['ifmisLogin'+logininfo.indexjsp+'Show'](servers,logininfo); 
					}
				});
			}
			  	//判断退出结束
			if(_indexjp!=undefined){
				return logincmp['ifmisLogin'+_indexjp+'Show'](servers,logininfo);
			}
	};
	
	/*取浏览器版本，然后根据版本号分别确定模态窗口的大小*/
	var Sys = {};
	var ua = navigator.userAgent.toLowerCase();
	if (window.ActiveXObject)
	Sys.ie = ua.match(/msie ([\d.]+)/)[1]
	else if (document.getBoxObjectFor)
	Sys.firefox = ua.match(/firefox\/([\d.]+)/)[1]
	else if (window.MessageEvent && !document.getBoxObjectFor)
	Sys.chrome = ua.match(/chrome\/([\d.]+)/)[1]
	else if (window.opera)
	Sys.opera = ua.match(/opera.([\d.]+)/)[1]
	else if (window.openDatabase)
	Sys.safari = ua.match(/version\/([\d.]+)/)[1];

	/**
	*系统默认登录页面 对应编号为 1 使用地区：四川，宁夏，厦门，东营，内蒙古地区通用
	*/
	this.ifmisLoginCommonShow = function(servers,logininfo){		
		//登录服务地址
		Ext.lt.portal.component.login.server=servers;
		//设置登录后系统首页路径
			if(logininfo.url!=null){
				this.url=logininfo.url;
			}
			//登录页面内容存储数组
			var setHtml=[];
			var fl=logininfo.IFMIS_FESTIVAL;
			if(fl=="0"){
				setHtml.push('<div style="margin-top:12%; background-image:url(/images/bg/font.gif); background-repeat:no-repeat; background-position:left; height:50px; "></div>');			    							
			}else{
				setHtml.push('<div style="margin-top:12%;height:50px;"></div>');			    							
			}
			setHtml.push('<div id="login1" style="border:1px #FFF solid;display:block; background-image:url(/images/bg/' + logininfo.IFMIS_ADMDIV + '_login_bg.gif); background-repeat:no-repeat;height:221px; width:100%; margin-top:2%; background-position:left; font-size:14px;">');
			if(fl=="1" ||fl=="2" ||fl=="3"||fl=="5" ||fl=="6"){
				setHtml.push('<div id="flasho" style="margin-top:10%;top:0;left:0;background:url('+jrArr[fl]+');Z-INDEX:9999;  no-repeat left top; width:213px; height:113px;POSITION: absolute;overflow:hidden; ">');
	            setHtml.push('</div>');
			}
		    //如果使用公告并公告条不为0
			if(logininfo.isbulletin == true&&logininfo.postList.length > 0){
		       setHtml.push(post(logininfo));	
			}
		    
			setHtml.push('  <form id="form1" name="form1" autocomplete="off" method="post" action="">');
			setHtml.push('    <table width="93%" border="0" cellspacing="0" cellpadding="0" style ="width:60%; display:block; margin-top:140px; margin-left:23%;">');
			setHtml.push('      <tr>');
			
            //非ca登录(编辑用户名、密码)
			if (logininfo.isportalca=="false") {
				setHtml.push(' <td width="8%" align="right" nowrap="nowrap"><font color="#ffffff">用户：</font></td>');
				setHtml.push(' <td width="25%" nowrap="nowrap"><input type="text" name="username"/></td>');
				setHtml.push(' <td width="10%" align="right" nowrap="nowrap" style="top_color"><font color="#ffffff">密码：</font></td>');
				setHtml.push(' <td width="25%" nowrap="nowrap"><input type="password" name="password"/></td>');
			}
			
	        //财政年度设置
			setHtml.push('<td width="9%" align="right" nowrap="nowrap" style="top_color"><font color="#ffffff">年份：</font></td>');
			
			//多数据源模式
			if (logininfo.isMultiDataSourceDeployMode) {
				setHtml.push('        <td width="15%" nowrap="nowrap">');
				setHtml.push('         <select name="year" onclick="year2AreaSelect();">');
				for (var i = 0; i < logininfo.loginaCctyear.length; i++) {
					setHtml.push('<option value="' + logininfo.loginaCctyear[i].all + '">' + logininfo.loginaCctyear[i].acctmainbodyname + '</option>');
				}
				setHtml.push(' </select></td>');
			}
			
			//多地区设置		
	        if(logininfo.isArea=='1'){
	          setHtml.push('<td width="9%" align="right" nowrap="nowrap" style="top_color;" ><font color="#ffffff">地区：</font></td>');
		      setHtml.push('<td width="15%" nowrap="nowrap">');
		      setHtml.push('<select name="area" id="area">');
		      setHtml.push('<option>1</option>');
		      setHtml.push('</select>');
		      setHtml.push('</td>');
	        }
	        
			//如果是CA认证，提供ca认证按钮
			if(logininfo.isportalca=="true"){
				setHtml.push('<td nowrap="nowrap" colspan="4">&nbsp;<input type="hidden" id="screenwidth" name="screenwidth">');
				setHtml.push('<input type="hidden" id="signed_data" name="signed_data"/>');
				setHtml.push(' <input type="button" style="	border: 0px;text-align: center;padding-top: 3px;width: 70px;height: 20px;background-image: url(../../images/buttons/login_button.gif);" value="认证" id="login_button" onclick="doDataProcess()"/>');
				setHtml.push('</td></tr>');
				setHtml.push('<tr><td nowrap="nowrap" colspan="6">&nbsp;</td></tr>');
			}else{
				setHtml.push('<tr><td nowrap="nowrap" colspan="6">&nbsp;<input type="hidden" id="screenwidth" name="screenwidth"></td></tr>');
			}
			
			//认证失败提示信息		
            setHtml.push('<tr><td colspan="4"  nowrap="nowrap" valign="bottom" align="center">&nbsp;<font color="red" id="errorMessage">' + logininfo.errorMessage + '</font></td>');
            
            //如果是非CA登录，则显示登陆按钮
            if(logininfo.isportalca=="false"){
                setHtml.push('<td colspan="2" nowrap="nowrap">'); 
			    setHtml.push('<input type="button"  style="	border: 0px;text-align: center;padding-top: 3px;width: 70px;height: 20px;background-image: url(../../images/buttons/login_button.gif);" value="登录" id="login_button" onclick="dologin()"/> ');
			    setHtml.push('<input type="reset"   style="	border: 0px;text-align: center;padding-top: 3px;width: 70px;height: 20px;background-image: url(../../images/buttons/login_button.gif);" value="重置" id="login_button" />');
				setHtml.push('</td>');
            }           
            setHtml.push('<input type="hidden" id="fontFile" name="fontFile" value="stylefontS.css"></input>');
			setHtml.push('</tr></table></form>');
			
			//多地区跳转用户登录信息存储表单对象
			setHtml.push('  <form id="multiAreaForm" name="multiAreaForm" method="post" action="">');
			//用户编码
			setHtml.push('  <input type="hidden" id="username" name="username"/>');
			//财政年度
			setHtml.push(' <input type="hidden" id="year" name="year"/>');
			//密码
			setHtml.push(' <input type="hidden" id="password" name="password"/>');
			//地区标识
			setHtml.push(' <input type="hidden" id="area" name="area"/>');
			setHtml.push(' <input type="hidden" id="area_name" name="area_name"/>');
			//用于控制菜单宽度
			setHtml.push('<input type="hidden" id="screenwidth" name="screenwidth"/>');
			//主服务地址，用户控制退出系统操作
			setHtml.push('  <input type="hidden" id="mainUrl" name="mainUrl"/>');
			//CA认证信息
			setHtml.push('  <input type="hidden" id="signed_data" name="signed_data"/>');
			//CA认证随机数信息
			setHtml.push(' <input type="hidden" id="DSign_Content" name="DSign_Content"/>');
			setHtml.push('</form>');
			setHtml.push('</div>');
			
			//版权控制 
			setHtml.push('<div><p style="margin:auto;font-size:12px;margin-left:'+window.screen.width/3+'; margin-top:20; color:#11F; text-align:right; width:480px; line-height:15px; height:15px;">'+window.status+'</p></div>');
			
			//下载空间功能按钮 
			setHtml.push('<div id="xzkj" style="z-index:10; position:absolute; top:0;right:0; background-image:url(../images/login/download.gif); height:128px; width:128px; background-repeat:no-repeat; color:#FFF; font-size:14px; cursor:pointer; filter:alpha(opacity=100);-moz-opacity:0.8;line-height:128px;font-weight:bold;text-align:center;"onmouseover="mouseOver()" onmouseout="mouseOut()" onclick="exe(\''+logininfo.controlURL+'\')">下载控件</div>');		 
			
		   //定义存储页面panel对象
			var retloginpanel = new Ext.Panel({
				id:"systemmain", 
				bodyStyle:'border-width:0px',
				bodyStyle:'background:none',
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
			retloginpanel.on('afterlayout',function(panel,layout){
					document.body.style.backgroundColor = "white";	
					onloadCook();
					//初始化多地区对象信息
					year2AreaSelect();
			});
			DSign_Content = logininfo.DSign_Content;
		return retloginpanel;
	};
	this.ifmisLogin1Show=this.ifmisLoginCommonShow;

	/**
	*页面对应编号为 4 使用地区：安徽、山西、重庆地区通用
	*/
	this.ifmisLogin4Show = function(servers,logininfo){
	//登录服务地址
	Ext.lt.portal.component.login.server=servers;
	        //设置登录后系统首页路径
			if(logininfo.url!=null){
				this.url=logininfo.url;
			}
			//登录页面内容存储数组
			var setHtml=[];
			//公告
			setHtml.push(post(logininfo));
			setHtml.push('<div style="border:1px #006EC3 solid; border-bottom:0;border-left:0;border-right:0;height:768px;width:100%;background-image:url(../../ifmis_images/login/20091110/div_bg_three.jpg);background-position:center center;background-repeat:no-repeat;">');
			setHtml.push('<div style="border-left:0;border-right:0;border-bottom:0;background-image:url(../../ifmis_images/login/20091110/login_bg.jpg);background-position:center center;background-repeat:no-repeat;height:349px;width:99%;margin-top:120px;margin-left:150px;color:#185da2;font-weight:bold;font-size:14px;">');
			var fl=logininfo.IFMIS_FESTIVAL;
			if(fl=="1" ||fl=="2" ||fl=="3"||fl=="5" ||fl=="6"){
				setHtml.push('<div id="flasho" style="background:url('+jrArr[fl]+');background-repeat:no-repeat; width:213px; height:113px;POSITION:absolute;overflow:hidden;z-index:10000;top:118px;margin-left:expression((document.body.clientWidth-469)/2-97);">');			  
				setHtml.push('</div>');
			}	
			setHtml.push('<form id="form1" name="form1" autocomplete="off" method="post" action="/login.do">');
			//字体样式
            setHtml.push('<input type="hidden" id="fontFile" name="fontFile" value="stylefontS.css"></input>');

			if(logininfo.isArea=='5'){
				setHtml.push('<table width="480px" border="0" align="center"style="margin:auto;margin-top:250px; font-size:14px;color:#FFF;">');				
				setHtml.push('<tr width="380px" height="36">');
			}else{
				setHtml.push('<table width="480px" border="0" align="center"style="margin:auto;margin-top:250px; font-size:14px;color:#FFF;">');				
				setHtml.push('<tr width="380px" height="36">');
			}
            //非ca登录(编辑用户名、密码)
			if (logininfo.isportalca=="false") {
				setHtml.push('<td nowrap="nowrap" align="left">用户：</td>');
				setHtml.push('<td nowrap="nowrap" align="left" ><input type="text" name="username" style="height:24px;width:120px;padding-left:2px;line-height:24px;font-size:14px;background-color:none;border:1px #002d5e solid;color:#084691;"/></td>');
				setHtml.push('<td nowrap="nowrap" align="left">密码：</td>');
				setHtml.push('<td nowrap="nowrap" align="left"><input type="password" name="password" style="height:24px;width:120px;padding-left:2px;line-height:24px;font-size:14px;background-color:none;border:1px #002d5e solid;color:#084691;"/></td>');
			}
			if(logininfo.isArea!='1'&&logininfo.isArea!='5'){
			  setHtml.push('<td nowrap="nowrap" width="15%" align="right">年份：</td>');            
			  if (logininfo.isMultiDataSourceDeployMode) {
				 setHtml.push('<td nowrap="nowrap" align="right" width="80px" valign="middle">');
				 setHtml.push('<select name="year" style="width:80px;height:26px;line-height:24px; padding-left:2px;font-size:14px;border:1px #002d5e solid;color:#084691;">');
				 for (var i = 0; i < logininfo.loginaCctyear.length; i++) {
					setHtml.push('<option value="' + logininfo.loginaCctyear[i].all + '">' + logininfo.loginaCctyear[i].acctmainbodyname + '</option>');
				 }
				 setHtml.push('</select></td>');
			  }			 
			}
			if(logininfo.isArea=='5'){
				  setHtml.push('</tr></br><tr><td nowrap="nowrap" width="15%" align="left">年份：</td>');            
				  if (logininfo.isMultiDataSourceDeployMode) {
					 setHtml.push('<td nowrap="nowrap" align="right" width="120px" valign="middle">');
					 setHtml.push('<select name="year" style="width:120px;">');
					 for (var i = 0; i < logininfo.loginaCctyear.length; i++) {
						setHtml.push('<option value="' + logininfo.loginaCctyear[i].all + '">' + logininfo.loginaCctyear[i].acctmainbodyname + '</option>');
					 }
					 setHtml.push('</select></td>');
				  }			 
				
				 setHtml.push('<td nowrap="nowrap" width="15%" align="left">网络类型：</td>');            
				 if (logininfo.netnameList&&logininfo.netnameList.length!=0) {
				 setHtml.push('<td nowrap="nowrap" align="right" width="120px" valign="middle">');
				 setHtml.push('<select name="netname" style="width:120px;">');
				 var nenamelist = logininfo.netnameList;
				 for (var n = 0; n < nenamelist.length; n++) {
					setHtml.push('<option value="' + nenamelist[n].NETNAME + '">' + nenamelist[n].NETNAME + '</option>');
				 }
				 setHtml.push('</select></td>');
				 }else{
					 setHtml.push('<td nowrap="nowrap" align="right" width="120px" valign="middle">');
					 setHtml.push('<select name="netname" style="width:120px;">'); 
					 setHtml.push('<option value="">请配置网络类型</option>');
					 setHtml.push('</select></td>');
				 }			 
			}
		  if (logininfo.isportalca=="false"||logininfo.isArea=='1') {
			  setHtml.push('</tr>');
		   }	  
		
	    //财政名称设置
			if(logininfo.isArea=='1'){
				setHtml.push('<tr width="380px" height="26">')
				setHtml.push('<td nowrap="nowrap" align="left" >年度：</td>')
			    setHtml.push('<td nowrap="nowrap" align="left" > ');
			    setHtml.push('<select name="year" style="width: 126px;" onchange="year2AreaSelect();">');
			    for (var i = 0; i < logininfo.loginaCctyear.length; i++) {
			       setHtml.push('<option value="' + logininfo.loginaCctyear[i].all + '">' + logininfo.loginaCctyear[i].acctmainbodyname + '</option>');
			    }	
			    setHtml.push('</select></td>');
			    setHtml.push('<td nowrap="nowrap" align="left">地区：</td>');
			    setHtml.push('<td nowrap="nowrap"  align="left" >');
			    setHtml.push('<select name="area" style="width: 126px;" id="area">');
                setHtml.push('<option>1</option>');
			    setHtml.push('        </select>        </td>');			    
			    setHtml.push('</tr>');
			    
			}
			
			//如果是CA认证，则显示登陆按钮
	        if (logininfo.isportalca=="true") {
	        	if (logininfo.isArea=='1') {
	        		setHtml.push('<tr width="380px">')
	        	}	
	        	setHtml.push('<td colspan="2" nowrap="nowrap" align="right">');
	        	setHtml.push('<input type="hidden" id="signed_data" name="signed_data"/>');	        	
	        	setHtml.push('<input type="button" style="margin-top:5px;cursor:pointer;border: 0px;text-align: center;font-size:12px;line-height:22px;width: 72px;height: 22px;background:none;background-image: url(/portal/images/login/jr/jrrz.gif);" value="认证" id="login_button" onclick="doDataProcess()"/></td>');	        	
	        	setHtml.push('</tr><tr><td nowrap="nowrap" width="50px" align="right" nowrap="nowrap">&nbsp;<input type="hidden" name="screenwidth"></td> ');
	        	//setHtml.push('<td nowrap="nowrap" align="right" width="80px">&nbsp;</td> ');
				setHtml.push('<td colspan="2" nowrap="nowrap" align="center" valign="bottom"><font color="red" id="errorMessage">'+ logininfo.errorMessage +'</font></td>');
				setHtml.push('</tr>');	
				
		    //如果不是CA认证，则显示登陆按钮
	        }else{
	            setHtml.push('<tr width="380px" style="display:none;">');	
	            setHtml.push('<td nowrap="nowrap" width="50px" align="right" nowrap="nowrap">&nbsp;<input type="hidden" name="screenwidth"></td>');
	            setHtml.push('</tr>');
	            setHtml.push('<tr width="380px"><td colspan="6" nowrap="nowrap" align="center" style="padding-top:20px;" >');	
		        setHtml.push('<button style="border:0;background:none;background-image:url(../../ifmis_images/login/20090930/login_btn_one.png);background-position:center center;background-repeat:no-repeat;height:34px;width:95px;text-align:center;font-size:14px;color:#000000;cursor:pointer;" value="登录" id="login_button" onclick="dologin()" ></button>&nbsp;&nbsp;&nbsp;');
		        setHtml.push('<button style="border:0;background:none;background-image:url(../../ifmis_images/login/20090930/btn_one.png);background-position:center center;background-repeat:no-repeat;height:34px;width:95px;text-align:center;font-size:14px;color:#000000;cursor:pointer;" value="重置"  type="reset">	');	        	
	        	setHtml.push('</td>');
	        	setHtml.push('</tr>');
	        	setHtml.push('<tr><td nowrap="nowrap" width="50px" align="right" nowrap="nowrap">&nbsp;<input type="hidden" name="screenwidth"></td> ');
	        	setHtml.push('<td colspan="5" nowrap="nowrap" align="center" valign="bottom"><font color="red" id="errorMessage">'+ logininfo.errorMessage +'</font></td>');	        	
	        	setHtml.push('<tr>');
	        }
	         
	        setHtml.push('</table></form>');
	        
	        //多地区跳转用户登录信息存储表单对象
			setHtml.push('  <form id="multiAreaForm" name="multiAreaForm" method="post" action="/login.do">');
			//用户编码
			setHtml.push('      <input type="hidden" id="username" name="username"/>');
			//财政年度
			setHtml.push('      <input type="hidden" id="year" name="year"/>');
			//密码
			setHtml.push('      <input type="hidden" id="password" name="password"/>');
			//地区标识
			setHtml.push('      <input type="hidden" id="area" name="area"/>');
			setHtml.push('      <input type="hidden" id="area_name" name="area_name"/>');
			//用于控制菜单宽度
			setHtml.push('      <input type="hidden" id="screenwidth" name="screenwidth"/>');
			//主服务地址，用户控制退出系统操作
			setHtml.push('      <input type="hidden" id="mainUrl" name="mainUrl"/>');
			//CA认证信息
			setHtml.push('      <input type="hidden" id="signed_data" name="signed_data"/>');
			//CA认证随机数信息
			setHtml.push('      <input type="hidden" id="DSign_Content" name="DSign_Content"/>');
			setHtml.push('</form>');
	        setHtml.push('</div>');	
	        
			setHtml.push('<p style="margin:auto;font-size:12px; color:#757575; text-align:right; width:420px; line-height:50px; height:50px;">'+window.status+'</p>');
			setHtml.push('</div>');
	        
	        //下载控件功能按钮	
     	    if(logininfo.jdcontrolURL!=null &&logininfo.jdcontrolURL!=""){
    			setHtml.push('<div id="jdxzkj" style="z-index:11; position:absolute; top:0;left:0;right:10px; background-image:url(../../ifmis_images/login/20090930/xiazai.png); height:123px; width:113px; background-repeat:no-repeat; color:#FFF; font-size:14px; cursor:pointer;filter:alpha(opacity=100);-moz-opacity:0.8;line-height:128px;font-weight:bold;text-align:center;" onmouseover="jdmouseOvers()" onmouseout="jdmouseOut()" onclick="exe(\''+logininfo.jdcontrolURL+'\')">下载九鼎控件</div>');
			}
			setHtml.push('<div id="xzkj" style="z-index:10; position:absolute; top:0;right:10px; background-image:url(../../ifmis_images/login/20090930/xiazai.png); height:123px; width:113px; background-repeat:no-repeat; color:#FFF; font-size:14px; cursor:pointer;filter:alpha(opacity=100);-moz-opacity:0.8;line-height:128px;font-weight:bold;text-align:center;" onmouseover="mouseOvers()" onmouseout="mouseOut()" onclick="exe(\''+logininfo.controlURL+'\')">下载控件</div>');
       		
            //往模板页面增加body样式来处理登录页面高度不能撑满整个屏幕的问题
            //document.write('<link href="' + _ROOT_PATH_ + '"/portal/css/body4.css" rel="stylesheet" type="text/css" />');
            
            //定义存储页面panel对象	       
			var retloginpanel = new Ext.Panel({
				id:"systemmain", 
				unstyled:true,
				bodyStyle:'border-width:0px;',
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
			retloginpanel.on('afterlayout',function(panel,layout){
					onloadCook();
			});
			DSign_Content = logininfo.DSign_Content;
		return retloginpanel;
	};	



/**
	*页面对应编号为 5 使用地区：西安
	* 说明：最初为西安专门定制
	*/
	this.ifmisLogin5Show = function(servers,logininfo){
		document.getElementById('id1').style.backgroundColor='#D0F0FF';
	//登录服务地址
	Ext.lt.portal.component.login.server=servers;
	        //设置登录后系统首页路径
			if(logininfo.url!=null){
				this.url=logininfo.url;
			}
			//登录页面内容存储数组
			var setHtml=[];
			var fl=logininfo.IFMIS_FESTIVAL;
			if(fl=="1" ||fl=="2" ||fl=="3"||fl=="5" ||fl=="6"){
				setHtml.push('<div id="flasho" style="background:url('+jrArr[fl]+');background-repeat:no-repeat; width:213px; height:113px;POSITION:absolute;overflow:hidden;z-index:10000;top:118px;margin-left:expression((document.body.clientWidth-469)/2-97);">');			  
				setHtml.push('</div>');
			}	
			//公告
			setHtml.push(post(logininfo));
			setHtml.push('<div style="border:1px #FFF solid; border-bottom:0;border-left:0;border-right:0;height:768px;width:100%;background-image:url(../../lightblue_images/login/20091110/div_bg_three.jpg);background-position:center center;background-repeat:no-repeat;">');
			setHtml.push('<div style="border-left:0;border-right:0;border-bottom:0;background-image:url(../../lightblue_images/login/20091110/login_bg.jpg);background-position:center center;background-repeat:no-repeat;height:349px;width:99%;margin-top:172px;color:#185da2;font-weight:bold;font-size:14px;">');
            setHtml.push('<p style="height:220px;*height:223px!important;*height:223px; "></p>');
			setHtml.push('<table width="480px" border="0" align="center"style="margin:auto;margin-top:-25px; font-size:14px;">');
			setHtml.push('<tr width="380px">');
			setHtml.push('<form id="form1" name="form1" autocomplete="off" method="post" action="/login.do">');
			//字体样式
            setHtml.push('<input type="hidden" id="fontFile" name="fontFile" value="stylefontS.css"></input>');
			
            //非ca登录(编辑用户名、密码)
			if (logininfo.isportalca=="false") {			    
				setHtml.push('<td nowrap="nowrap" align="left" width="70">&nbsp;用户：</td>');
				setHtml.push('<td nowrap="nowrap" align="left" ><input type="text" name="username" style="height:16px;width:110px;padding-left:2px;line-height:16px;font-size:14px;background-color:none;"/></td>');
				setHtml.push('<td nowrap="nowrap" width="70" align="left">&nbsp;密码：</td>');
				setHtml.push('<td nowrap="nowrap" align="left"><input type="password" name="password" style="height:16px;width:110px;padding-left:2px;line-height:16px;font-size:14px;background-color:none;"/></td>');
			}

			if(logininfo.isArea!='1'){	         
			  setHtml.push('<td nowrap="nowrap" width="15%" align="right">&nbsp;年份：</td>');                        
			  if (logininfo.isMultiDataSourceDeployMode) {
				 setHtml.push('<td nowrap="nowrap" align="left" width="80px">');
				 setHtml.push('<select name="year" style="width:80px;">');
				 for (var i = 0; i < logininfo.loginaCctyear.length; i++) {
					setHtml.push('<option value="' + logininfo.loginaCctyear[i].all + '">' + logininfo.loginaCctyear[i].acctmainbodyname + '</option>');
				 }
				 setHtml.push('</select></td>');
			  }			 
			}
		
	    //财政名称设置
			if(logininfo.isArea=='1'){
				setHtml.push('<tr style="line-height: 28px; height: 28px;">')
				setHtml.push('<td nowrap="nowrap" width="70" align="left" >&nbsp;年度：</td>')
			    setHtml.push('<td nowrap="nowrap" align="left" > ');
			    setHtml.push('<select name="year" style="width: 117px;" onchange="year2AreaSelect();">');
			    for (var i = 0; i < logininfo.loginaCctyear.length; i++) {
			       setHtml.push('<option value="' + logininfo.loginaCctyear[i].all + '">' + logininfo.loginaCctyear[i].acctmainbodyname + '</option>');
			    }	
			    setHtml.push('</select></td>');
			    setHtml.push('<td nowrap="nowrap" align="left" width="70">&nbsp;地区：</td>');
			    setHtml.push('<td nowrap="nowrap"  align="left" >');
			    setHtml.push('<select name="area" style="width: 117px;" id="area">');
                setHtml.push('<option>1</option>');
			    setHtml.push('        </select>        </td>');			    
			}
	        
			//如果是CA认证，则显示登陆按钮
	        if (logininfo.isportalca=="true") {
	        	setHtml.push('<td colspan="2" nowrap="nowrap" align="center">');
	        	setHtml.push('<input type="hidden" id="signed_data" name="signed_data"/>');
	        	setHtml.push('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" value="认证" id="login_button" onclick="doDataProcess()" style="margin-top:10px;margin-bottom:10px;cursor:pointer;border: 0px;text-align: center;font-size:12px;line-height:22px;width: 72px;height: 22px;background:none;background-image: url(/portal/images/login/jr/jrrz.gif);"/></td>');
				setHtml.push('</tr>');	
				setHtml.push('<tr>');
				setHtml.push('<td colspan="6" nowrap="nowrap" valign="bottom" align="center">&nbsp</td>');				
				setHtml.push('</tr>');
	        	setHtml.push('<tr><td nowrap="nowrap" width="50px" align="right" nowrap="nowrap">&nbsp;<input type="hidden" name="screenwidth"></td> ');
	        	setHtml.push('<td colspan="5" nowrap="nowrap"  valign="bottom"><font color="red" id="errorMessage">'+logininfo.errorMessage+'</font></td>');
	        	setHtml.push('</tr>');
	        }
	        
	        //如果不是CA认证，则显示登陆按钮
	        if(logininfo.isportalca=="false"){
	        	setHtml.push('<tr><td nowrap="nowrap" width="50px" align="right" style="display:none;">&nbsp;<input type="hidden" name="screenwidth"></td> </tr>');	        
	            setHtml.push('<tr><td colspan="6" nowrap="nowrap" align="center" style="padding-top:5px;" >');
                setHtml.push('<button class="login_btn" value="登录" id="login_button" onclick="dologin()" ></button>&nbsp;&nbsp;&nbsp;');
		        setHtml.push('<button class="reset_btn" value="重置"  type="reset">	');	        	
	        	setHtml.push('</td></tr>');
	            //setHtml.push('<tr><td nowrap="nowrap" width="30px" align="left" nowrap="nowrap"></td> ');
	        	setHtml.push('<td colspan="6" nowrap="nowrap" align="center" valign="bottom">&nbsp;<input type="hidden" name="screenwidth"><font color="red" id="errorMessage">'+logininfo.errorMessage+'</font></td>');	        	
	        	setHtml.push('<tr>');	        		        
	        }		       
	        setHtml.push('</table>');
	        setHtml.push('</form>');
	        setHtml.push('</div>');
	        
	         //多地区跳转用户登录信息存储表单对象
			setHtml.push('  <form id="multiAreaForm" name="multiAreaForm" method="post" action="/login.do">');
			//用户编码
			setHtml.push('      <input type="hidden" id="username" name="username"/>');
			//财政年度
			setHtml.push('      <input type="hidden" id="year" name="year"/>');
			//密码
			setHtml.push('      <input type="hidden" id="password" name="password"/>');
			//地区标识
			setHtml.push('      <input type="hidden" id="area" name="area"/>');
			setHtml.push('      <input type="hidden" id="area_name" name="area_name"/>');
			//用于控制菜单宽度
			setHtml.push('      <input type="hidden" id="screenwidth" name="screenwidth"/>');
			//主服务地址，用户控制退出系统操作
			setHtml.push('      <input type="hidden" id="mainUrl" name="mainUrl"/>');
			//CA认证信息
			setHtml.push('      <input type="hidden" id="signed_data" name="signed_data"/>');
			//CA认证随机数信息
			setHtml.push('      <input type="hidden" id="DSign_Content" name="DSign_Content"/>');
			setHtml.push('</form>');
	        setHtml.push('<p style="font-size:12px;margin-left:'+window.screen.width/4+'; color:#18F; text-align:right; width:480px; line-height:15px; height:15px;margin:auto;">'+window.status+'</p></div>');
			//下载控件功能按钮
			setHtml.push('<div id="xzkj" style="z-index:10; position:absolute; top:0;right:10px; background-image:url(../../lightblue_images/login/jiatou.gif); height:128px; width:128px; background-repeat:no-repeat; color:#FFF; font-size:14px; cursor:pointer;filter:alpha(opacity=100);-moz-opacity:0.8;line-height:128px;font-weight:bold;text-align:center;" onmouseover="mouseOvers()" onmouseout="mouseOut()" onclick="exe(\''+logininfo.controlURL+'\')">下载控件</div>'); 
           
            //定义存储页面panel对象
			var retloginpanel = new Ext.Panel({
				id:"systemmain", 
				unstyled:true,
				bodyStyle:'border-width:0px',
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
			retloginpanel.on('afterlayout',function(panel,layout){
					onloadCook();
			});
			DSign_Content = logininfo.DSign_Content;
		return retloginpanel;
	};
	
/**
	*系统默认登录页面 对应编号为 6 使用地区：青岛
	*说明 最初为宁夏专门定制，后为黑龙江使用，现已不用
*/		
	this.ifmisLogin6Show = function(servers,logininfo){	
		//登录服务地址
		Ext.lt.portal.component.login.server=servers;
	        //设置登录后系统首页路径
			if(logininfo.url!=null){
				this.url=logininfo.url;
			}
			//登录页面内容存储数组
			var setHtml=[];
			var fl=logininfo.IFMIS_FESTIVAL;
			if(fl=="0"){
				setHtml.push('<div style="margin-top:12%; background-image:url(/images/bg/font.gif); background-repeat:no-repeat; background-position:left; height:50px; "></div>');			    							
			}else{
				setHtml.push('<div style="margin-top:12%;height:50px;"></div>');			    							
			}
			setHtml.push('<div  id="login1" style="border:1px #FFF solid;display:block; background-image:url(/images/bg/' + logininfo.IFMIS_ADMDIV + '_login_bg.gif); background-repeat:no-repeat;height:221px; width:100%; margin-top:2%; background-position:left; font-size:14px;">');			
			if(fl=="1" ||fl=="2" ||fl=="3"||fl=="5" ||fl=="6"){
				setHtml.push('<div id="flasho" style="margin-top:10.3%;top:0;left:0;background:url('+jrArr[fl]+');Z-INDEX:9999;  no-repeat left top; width:213px; height:113px;POSITION: absolute;overflow:hidden; ">');
	            setHtml.push('</div>');
			}
			setHtml.push('  <form id="form1" name="form1" method="post" action="/login.do">');
			//字体样式
            setHtml.push('<input type="hidden" id="fontFile" name="fontFile" value="stylefontS.css"></input>');
			setHtml.push('    <table width="93%" border="0" cellspacing="0" cellpadding="0" style ="width:60%; display:block; margin-top:140px; margin-left:23%;">');
			setHtml.push('      <tr>');
            
		   //判断登录方式(编辑用户名、密码)           
		   if(logininfo.Userlogincontrol=="true"){
				setHtml.push(' <td width="8%" align="right" nowrap="nowrap"><font color="#ffffff">用户：</font></td>');
				setHtml.push(' <td width="25%" nowrap="nowrap" id="id6qingdaotd" ><input type="text" name="username" id="username" value="" readOnly></td>');
				setHtml.push(' <td width="10%" align="right" nowrap="nowrap" style="top_color"><font color="#ffffff">密码：</font></td>');
				setHtml.push(' <td width="25%" nowrap="nowrap"><input type="password" name="password"/></td>');
			}else{
			   if (logininfo.isportalca=="false") {
				  setHtml.push('<td width="8%" align="right" nowrap="nowrap"><font color="#ffffff">用户：</font></td>');
				  setHtml.push('<td width="25%" nowrap="nowrap" id="id6qingdaotd"><input type="text" name="username" id="username" value=""></td>');
				  setHtml.push('<td width="10%" align="right" nowrap="nowrap" style="top_color"><font color="#ffffff">密码：</font></td>');
				  setHtml.push('<td width="25%" nowrap="nowrap"><input type="password" name="password"/></td>');
			   }
			   if(logininfo.isportalca=="true"){
				  setHtml.push('<td width="8%" align="right" nowrap="nowrap"><font color="#ffffff">用户：</font></td>');
				  setHtml.push('<td width="25%" nowrap="nowrap" id="id6qingdaotd"><input type="text" name="username" id="username" value="" readonly></td>');
				  setHtml.push('<td width="10%" align="right" nowrap="nowrap" style="top_color"><font color="#ffffff">密码：</font></td>');
				  setHtml.push('<td width="25%" nowrap="nowrap"><input type="password" name="password"/></td>');
				
			   }
			}
	        //财政年度设置
			setHtml.push('<td width="8%" align="right" nowrap="nowrap" style="top_color"><font color="#ffffff">年份：</font></td>');
			
			//多数据源模式
			if (logininfo.isMultiDataSourceDeployMode) {
			   setHtml.push('        <td width="15%" nowrap="nowrap">');
			   setHtml.push('         <select name="year" onchange="year2AreaSelect();">');
				for (var i = 0; i < logininfo.loginaCctyear.length; i++) {
					setHtml.push('<option value="' + logininfo.loginaCctyear[i].all + '">' + logininfo.loginaCctyear[i].acctmainbodyname + '</option>');
			   }
			   setHtml.push('     </select></td>');
			}
			
			//多地区设置		
	        if(logininfo.isArea=='1'){
	          setHtml.push('<td width="2%" align="right" nowrap="nowrap" style="top_color;" ><font color="#ffffff">地区：</font></td>');
		      setHtml.push('<td nowrap="nowrap">');
		      setHtml.push('<select name="area" id="area">');
		      setHtml.push('<option>1</option>');
		      setHtml.push('</select>');
		      setHtml.push('</td>');
	        }
			setHtml.push('</tr>');
			setHtml.push('<tr><td nowrap="nowrap" colspan="6">&nbsp;</td></tr>');
             
            //认证失败提示信息
            //<tr><td colspan="4"  nowrap="nowrap" valign="bottom">&nbsp;<font color="white" id="errorMessage">
			setHtml.push(' <tr><td colspan="4" nowrap="nowrap" valign="bottom" align="center">');
            setHtml.push('&nbsp;<font  id="errorMessage" color="red"></font>');
            setHtml.push('</td>');
            //如果判断登录方式打开，使用同一个登录界面
            if(logininfo.Userlogincontrol=="true"){
               setHtml.push('<td align="right" colspan="2" nowrap="nowrap">');
               setHtml.push('<input type="hidden" id="signed_data" name="signed_data"/>');
               setHtml.push('<input type="button"  style="cursor:pointer;border: 0px;text-align: center;padding-top: 3px;width: 70px;height: 25px;background-image: url(../../images/buttons/login_button.gif);" value="CA认证" id="login_button" onclick="dologin_cyca()"/>&nbsp;');
               setHtml.push('<input type="hidden"  name="screenwidth" />');
			   setHtml.push('</td>');           			 
			   setHtml.push('<td align="left" colspan="2" nowrap="nowrap">');             		
			   setHtml.push('<input type="hidden" id="signed_data" name="signed_data"/>');
               setHtml.push('<input type="hidden"  name="screenwidth" />');	
               setHtml.push('<input type="button"  style="cursor:pointer;border: 0px;text-align: center;padding-top: 3px;width: 70px;height: 25px;background-image: url(../../images/buttons/login_button.gif);" value="登录" id="login_button" onclick="dologin()"/> ');				
			   setHtml.push('<input type="reset"   style="cursor:pointer;border: 0px;text-align: center;padding-top: 3px;width: 70px;height: 25px;background-image: url(../../images/buttons/login_button.gif);" value="重置" id="login_button" />');			  			                 
			   setHtml.push('</td>');
			}else{
			   if(logininfo.isportalca=="true"){
                  setHtml.push('<td align="right" colspan="2" nowrap="nowrap">');
                  setHtml.push('<input type="hidden" id="signed_data" name="signed_data"/>');
			      setHtml.push('<input type="button"  style="border: 0px;text-align: center;padding-top: 3px;width: 70px;height: 20px;background-image: url(../../images/buttons/login_button.gif);" value="CA认证" id="login_button" onclick="dologin_cyca()"/>');
                  setHtml.push('<input type="hidden"  name="screenwidth" />');
			      setHtml.push('</td>');           
			  }else{//如果是非CA登录，则显示登陆按钮
			      setHtml.push('<td align="left" colspan="2" nowrap="nowrap">');             		
			      setHtml.push('<input type="hidden" id="signed_data" name="signed_data"/>');
                  setHtml.push('<input type="hidden"  name="screenwidth" />');			   		 
			      setHtml.push('<input type="button"  style="	border: 0px;text-align: center;padding-top: 3px;width: 70px;height: 20px;background-image: url(../../images/buttons/login_button.gif);" value="登录" id="login_button" onclick="dologin()"/>&nbsp;');				
			      setHtml.push('<input type="reset"   style="	border: 0px;text-align: center;padding-top: 3px;width: 70px;height: 20px;background-image: url(../../images/buttons/login_button.gif);" value="重置" id="login_button" />');			  			  
			      setHtml.push('</td>');
			  }
		   }
			
			//屏幕宽度，框架使用
			setHtml.push('<input type="hidden"  name="screenwidth" /></td>');
			setHtml.push(' </tr>');
			setHtml.push(' </table></form></div>');
			//版权控制 
			setHtml.push('<div><p style="margin:auto;font-size:12px;margin-left:'+window.screen.width/3+'; margin-top:20; color:#11F; text-align:right; width:480px; line-height:15px; height:15px;">'+window.status+'</p></div>');
			
			//多地区跳转用户登录信息存储表单对象
			setHtml.push('  <form id="multiAreaForm" name="multiAreaForm" method="post" action="/login.do">');
			//用户编码
			setHtml.push('      <input type="hidden" id="username" name="username"/>');
			//财政年度
			setHtml.push('      <input type="hidden" id="year" name="year"/>');
			//密码
			setHtml.push('      <input type="hidden" id="password" name="password"/>');
			//地区标识
			setHtml.push('      <input type="hidden" id="area" name="area"/>');
			setHtml.push('      <input type="hidden" id="area_name" name="area_name"/>');
			//用于控制菜单宽度
			setHtml.push('      <input type="hidden" id="screenwidth" name="screenwidth"/>');
			//主服务地址，用户控制退出系统操作
			setHtml.push('      <input type="hidden" id="mainUrl" name="mainUrl"/>');
			//CA认证信息
			setHtml.push('      <input type="hidden" id="signed_data" name="signed_data"/>');
			//CA认证随机数信息
			setHtml.push('      <input type="hidden" id="DSign_Content" name="DSign_Content"/>');
			setHtml.push('</form>');
			
			//下载空间功能按钮
			setHtml.push('<div id="xzkj" style="z-index:10; position:absolute; top:0;right:0; background-image:url(../images/login/download.gif); height:128px; width:128px; background-repeat:no-repeat; color:#FFF; font-size:14px; cursor:pointer; filter:alpha(opacity=100);-moz-opacity:0.8;line-height:128px;font-weight:bold;text-align:center;"onmouseover="mouseOver()" onmouseout="mouseOut()" onclick="exe(\''+logininfo.controlURL+'\')">下载控件</div>');		 
			//超链接
			if(logininfo.hyperLinks!=null&&logininfo.hyperLinks.length > 0){
				setHtml.push(hyperLink(logininfo,0));
			}
			//定义存储页面panel对象
			var retloginpanel = new Ext.Panel({
				id:"systemmain", 
				bodyStyle:'border-width:0px',
				bodyStyle:'background:none',			
				html:setHtml.join(''),
				keys : {key : Ext.EventObject.ENTER,
					fn : function(btn, e) {
					if(logininfo.isportalca=="true"){
					    dologin_cyca();
					}else{
						dologin();
					}						
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
			
			var random1='';
			try {
				random1=CASecurityClient.SOF_GetUserList();//CASecurityClient.SOF_GenRandom(parseInt(10))
			}catch(e){}
		   if(logininfo.Userlogincontrol=="true"){
		   
		       if(random1!=''){
				  window.onload=function(){
				      //修改页面背景色
					  onloadCook();
				      document.body.style.backgroundColor = "white";
				      readcertq();                         
	              }
	            }else {
	         	   retloginpanel.on('afterlayout',function(panel,layout){
	         		   document.body.style.backgroundColor = "white";
                       document.getElementById("username").readOnly=false;
				       onloadCook();					
			       });
	            }
	         }
	      else{
	            if(logininfo.isportalca=="true"){
				   window.onload=function(){
				       //修改页面背景色
					   onloadCook();
					   document.body.style.backgroundColor = "white";							  
					   readcertq();                           
	              }
	         }else if(logininfo.isportalca=="false"){
	         	retloginpanel.on('afterlayout',function(panel,layout){	
	         		document.body.style.backgroundColor = "white";
				    onloadCook();					
			    });
	         }	
	     }	            
		return retloginpanel;
	};
	
/**
	*页面对应编号为 8 使用地区：黑龙江
	* 说明：最初为重庆专门定制
	*/
this.ifmisLogin8Show = function(servers,logininfo){
	//登录服务地址
	Ext.lt.portal.component.login.server=servers;
	        //设置登录后系统首页路径
			if(logininfo.url!=null){
				this.url=logininfo.url;
			}
			//登录页面内容存储数组
			var setHtml=[];
			setHtml.push('<div style="text-align:center;display:block;height:110px; width:201px; font-size:12px; background:url(/images/login/small_login.gif); background-repeat:repeat; background-position:left top;">');
            setHtml.push('<form id="form1" name="form1" method="post" target="_blank" action="/login.do" >');
            setHtml.push('<table border="0" cellspacing="0" cellpadding="0" style ="width:99%; display:block; height:78px;">');
            setHtml.push('<tr>');
            setHtml.push('<td width="8%" align="right" nowrap="nowrap" style="height:27px;"><font color="#000" style="font-weight:bold; font-size:17px;">用户：</font></td>');
            setHtml.push('<td width="25%" nowrap="nowrap" colspan="4" align="left"><input style="height:20px;width:120px;" type="text" name="username" value=""/></td>')
            setHtml.push('</tr><tr>');
            setHtml.push(' <td width="10%" align="right" nowrap="nowrap" style="height:27px;"><font color="#000" style="font-weight:bold; font-size:17px;">密码：</font></td>');
            setHtml.push(' <td width="25%" nowrap="nowrap" colspan="4" align="left"><input style="height:20px;width:120px;" type="password" id="password" name="password" value=""/></td>');
            setHtml.push('</tr><tr>');
            //多地区设置   宁夏集中登录地区选择
            if(logininfo.isArea=='1'){
            	setHtml.push('<td width="9%" align="right" nowrap="nowrap" style="top_color;" ><font color="#ffffff">地区：</font></td>');
            	setHtml.push('<td width="15%" nowrap="nowrap">');
            	setHtml.push('<select name="area" id="area">');
            	setHtml.push('<option>1</option>');
            	setHtml.push('</select> </td>');	
            }
            setHtml.push('<td width="25%" align="right" nowrap="nowrap" style="height:30px;"><font color="#000" style="font-weight:bold; font-size:17px;">年份：</font></td>');
            //多数据源模式
            if(logininfo.isMultiDataSourceDeployMode){
                  setHtml.push('<td width="23%" nowrap="nowrap" align="left" colspan="10">');
                  setHtml.push('<select name="year" onchange="year2AreaSelect();" style="height:22px; font-size:14px; width:125px;"> ');
                  for (var i = 0; i < logininfo.loginaCctyear.length; i++) {
					setHtml.push('<option value="' + logininfo.loginaCctyear[i].all + '">' + logininfo.loginaCctyear[i].acctmainbodyname + '</option>');
			   }
			   setHtml.push('        </select>        </td>');
			   setHtml.push('<td colspan="2" nowrap="nowrap" style="display:none;">');
			   setHtml.push('<input type="hidden" id="signed_data" name="signed_data"/>');
			   setHtml.push('  </td>');
            }
            setHtml.push('</tr><tr>  ');
            setHtml.push('<td colspan="10" nowrap="nowrap" align="center" style="height:30px;">');
            setHtml.push('<input type="button" value="" id="login_button_nomal" style=" border: 0px;text-align: center;width:54px;height:22px;background-image: url(../../images/login/hljczblue_nomal.gif); cursor:pointer;" onclick="dologin8()"/>');
            setHtml.push('&nbsp;');
            setHtml.push('<input type="button" value="" id="login_button_ca" onclick="doDataProcess()"/>');
            setHtml.push('<td>');
              //字体样式
            setHtml.push('<input type="hidden" id="fontFile" name="fontFile" value="stylefontS.css"></input>');
            setHtml.push('</tr> <tr style="display:none;">');
            //如果是CA认证，则显示CA认证按钮
            if(logininfo.isportalca==true){
            	setHtml.push('<td nowrap="nowrap" colspan="4" style="display:none">&nbsp;<input type="hidden" name="screenwidth"></input><br /><br /></td>');
            //不是ca登录(编辑用户名、密码)
            }else{
            	setHtml.push('<td nowrap="nowrap" colspan="6">&nbsp;<input type="hidden" name="screenwidth"></input><br /><br /></td>');
            }
            setHtml.push('<td><input type="hidden" name="msg" value="<%=msg %>"></input><br /><br /></td>');
//            if(msg!=null&&"".equals(msg)){
//                MSG8();
//            } 
            setHtml.push('</tr><tr>');

            setHtml.push('     </tr> </table></form></div>');
            if(logininfo.isportalca)
            //定义存储页面panel对象
			var retloginpanel = new Ext.Panel({
				id:"systemmain", 
				bodyStyle:'border-width:0px',
				html:setHtml.join(''),
				keys : {key : Ext.EventObject.ENTER,
					fn : function(btn, e) {
						dologin8();
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
			retloginpanel.on('afterlayout',function(panel,layout){
					onloadCook();
			});
			DSign_Content = logininfo.DSign_Content;
			//alert(logininfo.DSign_Content);
		return retloginpanel;
	};
	
	/**
	*页面对应编号为 9 使用地区：重庆
	* 说明：最初为重庆专门定制（现在不用，但需保留，以备后用）
	*/
	
	this.ifmisLogin9Show = function(servers,logininfo){
		//登录服务地址
		Ext.lt.portal.component.login.server=servers;
	        //设置登录后系统首页路径
			if(logininfo.url!=null){
				this.url=logininfo.url;
			}
			//登录页面内容存储数组
			var setHtml=[];
			var fl = logininfo.IFMIS_FESTIVAL;
			if(fl=="1" ||fl=="2" ||fl=="3"||fl=="5" ||fl=="6"){
				setHtml.push('<div id="flasho" style="background:url('+jrArr[fl]+');background-repeat:no-repeat; width:213px; height:113px;POSITION:absolute;overflow:hidden;z-index:10000;top:118px;margin-left:expression((document.body.clientWidth-469)/2-97);">');			  
				setHtml.push('</div>');
			}	
			//左侧信息框
			if(logininfo.otherList!=null&&logininfo.otherList.length>0){
				setHtml.push(postLeft(logininfo));
			}
			//公告
			setHtml.push(post(logininfo));
		    
		    setHtml.push('<div style="border:1px #006EC3 solid; border-bottom:0;border-left:0;border-right:0;top:0;left:0;height:768px;width:100%;background-image:url(../../ifmis_images/login/20091110/div_bg_three.jpg);background-position:center center;background-repeat:no-repeat;">');
		    var isgansu = (logininfo.IFMIS_ADMDIV === 'gansu');
		    if(Sys.ie == '6.0') {//在IE6的情况下加
		    	if (isgansu){
		    		setHtml.push('<div style="border:1px #3170C0 dotted; border-bottom:0;border-left:0;border-right:0;background-image:url(/portal/images/gansu/gansu_login_bg.jpg);background-position:center center;background-repeat:no-repeat;height:349px;width:99%;margin-top:128px;color:#185da2;font-weight:bold;font-size:14px;">');
		    	}else{
		    		setHtml.push('<div style="border:1px #3170C0 dotted; border-bottom:0;border-left:0;border-right:0;background-image:url(../../ifmis_images/login/20091110/login_bg.jpg);background-position:center center;background-repeat:no-repeat;height:349px;width:99%;margin-top:128px;color:#185da2;font-weight:bold;font-size:14px;">');
		    	}
				
			}else{
				if (isgansu){
					setHtml.push('<div style="border:1px #3170C0 dotted; border-bottom:0;border-left:0;border-right:0;background-image:url(/portal/images/gansu/gansu_login_bg.jpg);background-position:center center;background-repeat:no-repeat;height:349px;width:99%;margin-top:172px;color:#185da2;font-weight:bold;font-size:14px;">');
				}else{
					setHtml.push('<div style="border:1px #3170C0 dotted; border-bottom:0;border-left:0;border-right:0;background-image:url(../../ifmis_images/login/20091110/login_bg.jpg);background-position:center center;background-repeat:no-repeat;height:349px;width:99%;margin-top:172px;color:#185da2;font-weight:bold;font-size:14px;">');
				}
		    	
            }
           
		    //form1
			setHtml.push('<form id="form1" name="form1" autocomplete="off" method="post" action="/login.do">');	
			
			if(Sys.ie == '6.0'){ //在IE6的情况下加  					    
				  setHtml.push('<table id="ptdl"  width="469px" border="0"align="center" cellpadding="0" cellspacing="0" style="display:none; margin-top:245px;font-size:14px;">');
		    }else{
	    	      setHtml.push('<table id="ptdl"  width="469px" border="0"align="center" cellpadding="0" cellspacing="0" style="display:none; margin-top:198px;*margin-top:202px!important;*margin-top:202px; font-size:14px;">');
	    	}
			
	    	setHtml.push('<tr width="380px" style="height: 24px;">');
            //非ca登录(编辑用户名、密码)
		    setHtml.push('<td nowrap="nowrap" align="left" >用户编码</td>');
			setHtml.push('<td nowrap="nowrap" align="left"><input type="text" name="username" style="height:16px;width:110px;padding-left:2px;line-height:16px;font-size:14px;background-color:none;"/></td>');
			setHtml.push('<td nowrap="nowrap" align="left">&nbsp;用户密码</td>');
			setHtml.push('<td nowrap="nowrap" align="left"><input type="password" id="passwordvalue" name="passwordvalue" style="height:16px;width:110px;padding-left:2px;line-height:16px;font-size:14px;background-color:none;" onkeyup="chongqingkeyup(this)" onkeydown="chongqing9PasswordCkeystop(event)" onkeypress="chongqing9Password(this)" onblur="chongqing9PasswordBlur(this)"  onpaste="return false" oncontextmenu="return false"/><input type="hidden" name="password" id="passwordval" value="" /></td>');

	        //财政年度设置
			if(logininfo.isArea!='1'){
			    setHtml.push('<td nowrap="nowrap" align="right" width="15%">&nbsp;财政年份</td>');
			    setHtml.push('<td nowrap="nowrap" align="right" width="80px">');
			    setHtml.push('<select name="year" style="width:80px;">');
			    for (var i = 0; i < logininfo.loginaCctyear.length; i++) {
			       setHtml.push('<option value="' + logininfo.loginaCctyear[i].all + '">' + logininfo.loginaCctyear[i].acctmainbodyname + '</option>');
			    }
			    setHtml.push('</select></td>');
			    setHtml.push('</tr><tr style="line-height: 25px; height: 25px;">')
			    setHtml.push('<td nowrap="nowrap" align="left">&nbsp;</td> ');
			}
			setHtml.push('</tr>');
			
		    //财政名称设置
			if(logininfo.isArea=='1'){
				setHtml.push('<tr style="line-height: 25px; height: 25px;">')
				setHtml.push('<td nowrap="nowrap" width="100px" align="left" >财政年度</td>')
			    setHtml.push('<td nowrap="nowrap" align="left" > ');
			    setHtml.push('<select name="year" style="width: 117px;" onchange="year2AreaSelect();">');
			    for (var i = 0; i < logininfo.loginaCctyear.length; i++) {
			       setHtml.push('<option value="' + logininfo.loginaCctyear[i].all + '">' + logininfo.loginaCctyear[i].acctmainbodyname + '</option>');
			    }	
			    setHtml.push('</select></td>');
			    setHtml.push('<td nowrap="nowrap" align="left" width="100px">&nbsp;财政名称</td>');
			    setHtml.push('<td nowrap="nowrap" width="118px" align="left" >');
			    setHtml.push('<select name="area" style="width: 117px;" id="area">');
                setHtml.push('<option>1</option>');
			    setHtml.push('        </select>        </td>');			   
			}
	        setHtml.push('</tr>')
	        setHtml.push('<tr>');
	        setHtml.push('<td colspan="6" nowrap="nowrap" align="center" >');
	        setHtml.push('<button class="login_btn" value="登录" id="login_button" onclick="dologin()""></button>&nbsp;&nbsp;&nbsp;');
	        setHtml.push('<button class="reset_btn" value="重置"  type="reset">	 </button>   ');
		    
		    //字体样式
		    setHtml.push('<input type="hidden" id="fontFile" name="fontFile" value="stylefontS.css"></input>');
		    setHtml.push('</td> </tr> ');
		    setHtml.push('<tr style="height: 18px;">');
		    setHtml.push('<td nowrap="nowrap" colspan="7" width="100%" align="center" valign="middle" nowrap="nowrap">&nbsp;');
		    setHtml.push('<input type="hidden" name="screenwidth" />');
		  	setHtml.push('<font color="red"  id="errorMessage">' + logininfo.errorMessage + '</font>');
		    setHtml.push('</td></tr></table></form>');
		    
		    //form2
		    setHtml.push('<form id="form2" name="form2" autocomplete="off" method="post"action="/login.do">');
            if(Sys.ie == '6.0'){ //在IE6的情况下加 					    
				 setHtml.push('<table id="cadl" width="30%" border="0" align="center" cellpadding="0" cellspacing="0" style="display:block;margin-top:243px;  font-size:14px;">');
		    }else{
		         setHtml.push('<table id="cadl" width="30%" border="0" align="center" cellpadding="0" cellspacing="0" style="display:block;margin-top:200px;  font-size:14px;">');
		    }
		    setHtml.push('<tr style="height: 24px;">');
		    //集中登录地区选择
		    setHtml.push('<td nowrap="nowrap" align="right" height="44px" >财政年度&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>');
		    setHtml.push('<td nowrap="nowrap" align="left" >');
		    setHtml.push('<select name="year" style="width: 118px;" onchange="year2AreaSelect();">');
			for (var i = 0; i < logininfo.loginaCctyear.length; i++) {
			     setHtml.push('<option value="' + logininfo.loginaCctyear[i].all + '">' + logininfo.loginaCctyear[i].acctmainbodyname + '</option>');
			}	
			setHtml.push('</select>');
			setHtml.push('</td>');
		    if(logininfo.isArea=='1'){
		        setHtml.push('<td nowrap="nowrap" width="110px" align="center" >财政名称</td>');
		        setHtml.push('<td nowrap="nowrap" align="left" >');
		        setHtml.push('<select name="area" id="area1" style="width: 118px;">');
		        setHtml.push('<option>1</option>');
		        setHtml.push('</select></td>');
		    }
			setHtml.push('</tr>');
			// 集中登录地区结束
			setHtml.push('<tr style="font-size:0;height:7px">');
			setHtml.push('<td>&nbsp;</td></tr><tr>');
			setHtml.push('<td nowrap="nowrap" align="center" colspan="4">');
			setHtml.push('<input type="button" class="renzheng_btn" onclick="doDataProcess()"/>'); 
			setHtml.push('<input type="hidden" id="signed_data" name="signed_data" />'); 
			setHtml.push('&nbsp;&nbsp;&nbsp;');
			if (logininfo.certupdateviewstatus === '1'){   // 是否显示证书更新
				setHtml.push('<input type="button" class="renzhengupdate_btn" onclick="caupdateUrl()"/>');
			}
			setHtml.push('</td></tr>'); 
			setHtml.push('<tr style="height: 18px;">'); 
			setHtml.push('<td nowrap="nowrap" colspan="7" width="469px" align="center" valign="middle" nowrap="nowrap">&nbsp;'); 
			setHtml.push('<input type="hidden" name="screenwidth" />'); 
			//字体样式
			setHtml.push('<input type="hidden" id="fontFile" name="fontFile" value="stylefontS.css"></input>');
			setHtml.push('<font color="red"   id="caerrorMessage">' + logininfo.errorMessage + '</font>');
			setHtml.push('</td></tr></table></form>');
			
			//多地区跳转用户登录信息存储表单对象
			setHtml.push('  <form id="multiAreaForm" name="multiAreaForm" method="post" action="/login.do">');
			//用户编码
			setHtml.push('      <input type="hidden" id="username" name="username"/>');
			//财政年度
			setHtml.push('      <input type="hidden" id="year" name="year"/>');
			//密码
			setHtml.push('      <input type="hidden" id="password" name="password"/>');
			//地区标识
			setHtml.push('      <input type="hidden" id="area" name="area"/>');
			setHtml.push('      <input type="hidden" id="area_name" name="area_name"/>');
			//用于控制菜单宽度
			setHtml.push('      <input type="hidden" id="screenwidth" name="screenwidth"/>');
			//主服务地址，用户控制退出系统操作
			setHtml.push('      <input type="hidden" id="mainUrl" name="mainUrl"/>');
			//CA认证信息
			setHtml.push('      <input type="hidden" id="signed_data" name="signed_data"/>');
			//CA认证随机数信息
			setHtml.push('      <input type="hidden" id="DSign_Content" name="DSign_Content"/>');
			setHtml.push('</form>');
			
			setHtml.push(' <table width="469px" border="0" align="center" cellpadding="0" cellspacing="0">');
			setHtml.push('<tr style="height: 30px;">');
		    setHtml.push('<td nowrap="nowrap" align="center" colspan="7" valign="bottom"style="height: 26px;">');
		    setHtml.push('<div id="nomalandca" class="ca_style"><div class="choose_acc" onclick="jumpToCA9()">CA认证</div><div class="choose_acc" onclick="jumpToNomal9()">普通用户</div></div></td></tr></table></td></td>');
			setHtml.push('<p style="margin:auto;font-size:12px;margin-left:'+window.screen.width/4+'; margin-top:30px;color:#FFFFFF; text-align:right; width:480px; line-height:15px; height:15px;">'+window.status+'</p></div>');	   
		    //setHtml.push('<p style="margin:auto;font-size:12px;margin-left:'+window.screen.width/3+';margin-top:30px; color:#FFFFFF; text-align:right; width:480px; line-height:15px; height:15px;">Copyright (C) 2011 重庆财政局</p></div>');	    
	        setHtml.push('</div>');
	        	
			//下载控件功能按钮
			setHtml.push(downloadControl(logininfo));
			//定义存储页面panel对象			
			var retloginpanel = new Ext.Panel({
				id:"systemmain", 
				bodyStyle:'border:0',
				bodyStyle:'background:none',
				height:768,
				html:setHtml.join(''),
				keys : {key : Ext.EventObject.ENTER,
					fn : function(btn, e) {
						chongqing9PasswordBlur2();
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
			
		    window.onload=function(){
				//修改页面背景色
		    	document.body.style.background="#c1c1c1 url(/ifmis_images/login/20090930/body_bg.jpg) repeat-x left top";
	        }
	        
			retloginpanel.on('afterlayout',function(panel,layout){
					onloadCook();
					if(logininfo.logindefaulttype=="1"){
						jumpToNomal9();//0默认为ca ;1默认为用户登录 
					}else{
						jumpToCA9();
					}
					if(logininfo.errorMessage!=null&&logininfo.errorMessage.indexOf("用户名或密码错误")!=-1){
						jumpToNomal9();
					}else if(logininfo.errorMessage!=null&&(logininfo.errorMessage.indexOf("CA")!=-1||logininfo.errorMessage.indexOf("认证")!=-1)){
						jumpToCA9();
					}
			});
			DSign_Content = logininfo.DSign_Content;
		return retloginpanel;
	};	

	/**
	*页面对应编号为 10 使用地区：福建
	* 说明：最初为福建专门定制
	*/
	this.ifmisLogin10Show = function(servers,logininfo){
		//登录服务地址
		Ext.lt.portal.component.login.server=servers;
	        //设置登录后系统首页路径
			if(logininfo.url!=null){
				this.url=logininfo.url;
			}
			//登录页面内容存储数组
			var setHtml=[];
			var fl = logininfo.IFMIS_FESTIVAL;
			if(fl=="1" ||fl=="2" ||fl=="3"||fl=="5" ||fl=="6"){
				setHtml.push('<div id="flasho" style="background:url('+jrArr[fl]+');background-repeat:no-repeat; width:213px; height:113px;POSITION:absolute;overflow:hidden;z-index:10000;top:118px;margin-left:expression((document.body.clientWidth-469)/2-97);">');			  
				setHtml.push('</div>');
			}	
			//公告
			setHtml.push(post(logininfo));
			
			setHtml.push('<div style="height: 768px;width: 100%;background-image: url(../ifmis_images/login/fujian/div_bg_three.jpg);background-position: center center;background-repeat: no-repeat;">');
			if(logininfo.logincontrol=="1"){
				if(Sys.ie == '6.0'){ //在IE6的情况下加 					    
					setHtml.push('<div style="background-image:url(../../portal/images/login/general/' + logininfo.IFMIS_ADMDIV + '_login.jpg);background-position:center center;background-repeat:no-repeat;height:349px;width:99%;margin-top:123px;color:#185da2;font-weight:bold;font-size:14px;position:absolute;">');
				}else{
					setHtml.push('<div style="background-image:url(../../portal/images/login/general/' + logininfo.IFMIS_ADMDIV + '_login.jpg);background-position:center center;background-repeat:no-repeat;height:349px;width:99%;margin-top:172px;color:#185da2;font-weight:bold;font-size:14px;position:absolute;">');
				}
			}else{
				if(Sys.ie == '6.0'){ //在IE6的情况下加 					    
					setHtml.push('<div style="background-image:url(../../ifmis_images/login/20091110/login_bg.jpg);background-position:center center;background-repeat:no-repeat;height:349px;width:99%;margin-top:123px;color:#185da2;font-weight:bold;font-size:14px;position:absolute;">');
				}else{
				    setHtml.push('<div style="background-image:url(../../ifmis_images/login/20091110/login_bg.jpg);background-position:center center;background-repeat:no-repeat;height:349px;width:99%;margin-top:172px;color:#185da2;font-weight:bold;font-size:14px;position:absolute;">');
	            }
			}
		    //form1
			setHtml.push('<form id="form1" name="form1" autocomplete="off" method="post" action="/login.do">');
            if(Sys.ie == '6.0'){
                setHtml.push('<table id="ptdl"  width="469px" border="0"align="center" cellpadding="0" cellspacing="0" style="display:none; margin-top:245px;font-size:14px;">');
            }else{
		        setHtml.push('<table id="ptdl"  width="469px" border="0"align="center" cellpadding="0" cellspacing="0" style="display:none; margin-top:198px;*margin-top:202px; font-size:14px;">');
			}
			
			setHtml.push('<tr width="380px" style="height: 24px;">');
            //非ca登录(编辑用户名、密码)
			setHtml.push('<td nowrap="nowrap" align="left" width="70px">&nbsp;用户编码</td>');
			setHtml.push('<td nowrap="nowrap" align="left"><input type="text" name="username" style="height:16px;width:110px;padding-left:2px;line-height:16px;font-size:14px;background-color:none;"/></td>');
			setHtml.push('<td nowrap="nowrap" width="70px" align="left">&nbsp;用户密码</td>');
			setHtml.push('<td nowrap="nowrap" align="left"><input type="password" name="password" style="height:16px;width:110px;padding-left:2px;line-height:16px;font-size:14px;background-color:none;"/></td>');

	        //财政年度设置
			if(logininfo.isArea!='1'){
			    setHtml.push('<td nowrap="nowrap"  align="left" nowrap="nowrap">&nbsp;财政年份</td>');
			    setHtml.push('<td nowrap="nowrap" align="right" width="80px">');
			    setHtml.push('<select name="year" style="width:80px;">');
			    for (var i = 0; i < logininfo.loginaCctyear.length; i++) {
			       setHtml.push('<option value="' + logininfo.loginaCctyear[i].all + '">' + logininfo.loginaCctyear[i].acctmainbodyname + '</option>');
			    }
			    setHtml.push('        </select>        </td>');
			    setHtml.push('</tr><tr style="line-height: 25px; height: 25px;">')
			    setHtml.push('<td nowrap="nowrap" align="left">&nbsp;</td> ');
			}
		   
		   //财政名称设置
			if(logininfo.isArea=='1'){
				setHtml.push('</tr><tr style="line-height: 25px; height: 25px;">')
				setHtml.push('<td nowrap="nowrap" width="100px" align="left" >&nbsp;财政年度</td>')
			    setHtml.push('<td nowrap="nowrap" align="left" > ');
			    setHtml.push('<select name="year" style="width: 117px;" onchange="year2AreaSelect();">');
			    for (var i = 0; i < logininfo.loginaCctyear.length; i++) {
			       setHtml.push('<option value="' + logininfo.loginaCctyear[i].all + '">' + logininfo.loginaCctyear[i].acctmainbodyname + '</option>');
			    }	
			    setHtml.push('</select></td>');
			    setHtml.push('<td nowrap="nowrap" align="left" width="100px">&nbsp;财政名称</td>');
			    setHtml.push('<td nowrap="nowrap" width="118px" align="left" >');
			    setHtml.push('<select name="area" style="width: 117px;" id="area">');
                setHtml.push('<option>1</option>');
			    setHtml.push('        </select>        </td>');			   
			}
	        setHtml.push('</tr><tr>');
	        setHtml.push('<td colspan="6" nowrap="nowrap" align="center" >');
			setHtml.push('<button class="login_btn" value="登录" id="login_button" onclick="dologin()""></button>&nbsp;&nbsp;&nbsp;');
			setHtml.push('<button class="reset_btn" value="重置"  type="reset">	 </button>   ');
		    //字体样式
		    setHtml.push('<input type="hidden" id="fontFile" name="fontFile" value="stylefontS.css"></input>');
		    setHtml.push('</td> </tr> ');
		    setHtml.push('<tr style="height: 18px;">');
		    setHtml.push('<td nowrap="nowrap" colspan="7" width="469px" align="center" valign="middle" nowrap="nowrap">&nbsp;');
		    setHtml.push('<input type="hidden" name="screenwidth" />');
		    //setHtml.push('<td colspan="6" nowrap="nowrap" valign="middle"><font color="red"  id="errorMessage"><c:out value="${msg}" /> </font>');
		  	setHtml.push('<font color="red"  id="errorMessage">' + logininfo.errorMessage + '</font>');
		    setHtml.push('</td></tr></table></form>');
		    
		    //form2
		    setHtml.push('<form id="form2" name="form2" autocomplete="off" method="post"action="/login.do">');
		    if(Sys.ie == '6.0'){
            	setHtml.push('<table id="cadl" width="30%" border="0" align="center" cellpadding="0" cellspacing="0" style="display:block;margin-top:254px;  font-size:14px;">');
            }else{
		    	setHtml.push('<table id="cadl" width="30%" border="0" align="center" cellpadding="0" cellspacing="0" style="display:block;margin-top:211px;  font-size:14px;">');
	        }
		    setHtml.push('<tr style="height: 24px;">');
		   
		    //集中登录地区选择
		    setHtml.push('<td nowrap="nowrap" align="center" >财政年度</td>');
		    setHtml.push('<td nowrap="nowrap" align="left" >');
		    setHtml.push('<select name="year" style="width: 117px;" onchange="year2AreaSelect();">');
			for (var i = 0; i < logininfo.loginaCctyear.length; i++) {
			     setHtml.push('<option value="' + logininfo.loginaCctyear[i].all + '">' + logininfo.loginaCctyear[i].acctmainbodyname + '</option>');
			}	
			setHtml.push('</select>');
			setHtml.push('</td>');
		    if(logininfo.isArea=='1'){
		        setHtml.push('<td nowrap="nowrap" width="120px" align="center" >财政名称</td>');
		        setHtml.push('<td nowrap="nowrap" align="left" >');
		        setHtml.push('<select name="area" id="area1" style="width: 117px;">');
		        setHtml.push('<option>1</option>');
		        setHtml.push('</select></td>');
		    }
			setHtml.push('</tr>');
			// 集中登录地区结束
		    setHtml.push('<tr style="height:5px">');
			setHtml.push('<td>&nbsp;</td></tr><tr>');
			setHtml.push('<td nowrap="nowrap" align="center" colspan="4">');
			setHtml.push('<input type="button" class="safe_btn" id="login_button" onclick="doDataProcess()"/>'); 
			setHtml.push('<input type="hidden" id="signed_data" name="signed_data" />'); 
			setHtml.push('</td></tr>'); 
			setHtml.push('<tr style="height: 18px;">'); 
			setHtml.push('<td nowrap="nowrap" colspan="7" width="469px" align="center" valign="middle" nowrap="nowrap">&nbsp;'); 
			setHtml.push('<input type="hidden" name="screenwidth" />'); 
			
			//字体样式
			setHtml.push('<input type="hidden" id="fontFile" name="fontFile" value="stylefontS.css"></input>');
			setHtml.push('<font color="red"   id="caerrorMessage">' + logininfo.errorMessage + '</font>');
			setHtml.push('</td></tr></table></form>');
			
			//多地区跳转用户登录信息存储表单对象
			setHtml.push('  <form id="multiAreaForm" name="multiAreaForm" method="post" action="/login.do">');
			//用户编码
			setHtml.push('      <input type="hidden" id="username" name="username"/>');
			//财政年度
			setHtml.push('      <input type="hidden" id="year" name="year"/>');
			//密码
			setHtml.push('      <input type="hidden" id="password" name="password"/>');
			//地区标识
			setHtml.push('      <input type="hidden" id="area" name="area"/>');
			setHtml.push('      <input type="hidden" id="area_name" name="area_name"/>');
			//用于控制菜单宽度
			setHtml.push('      <input type="hidden" id="screenwidth" name="screenwidth"/>');
			//主服务地址，用户控制退出系统操作
			setHtml.push('      <input type="hidden" id="mainUrl" name="mainUrl"/>');
			//CA认证信息
			setHtml.push('      <input type="hidden" id="signed_data" name="signed_data"/>');
			//CA认证随机数信息
			setHtml.push('      <input type="hidden" id="DSign_Content" name="DSign_Content"/>');
			setHtml.push('</form>');
			
			setHtml.push(' <table width="469px" border="0" align="center" cellpadding="0" cellspacing="0">');
			setHtml.push('<tr style="height: 30px;">');
		    setHtml.push('<td nowrap="nowrap" align="center" colspan="7" valign="bottom"style="height: 26px;">');
		    setHtml.push('<div id="nomalandca" class="ca_style"><div class="choose_acc" onclick="jumpToCA9()">CA认证</div><div class="choose_acc" onclick="jumpToNomal9()">普通用户</div></div></td></tr></table></td></td>')
			setHtml.push('<p style="font-size:12px;margin-left:'+window.screen.width/4+'; margin-top:30px;color:#FFFFFF; text-align:right; width:480px; line-height:15px; height:15px;margin:auto;margin-top:30px;">'+window.status+'</p></div>');	   
	        setHtml.push('</div>');	
	
			//下载控件功能按钮
			setHtml.push(downloadControl(logininfo));
			//定义存储页面panel对象
			var retloginpanel = new Ext.Panel({
				id:"systemmain", 
				unstyled:true,
				bodyStyle:'border-width:0px',
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
			retloginpanel.on('afterlayout',function(panel,layout){
					onloadCook();
					year2AreaSelect();
					if(logininfo.logindefaulttype=="1"){
						jumpToNomal9();//0默认为ca ;1默认为用户登录 
					}else{
						jumpToCA9();
					}
					if(logininfo.errorMessage!=null&&logininfo.errorMessage.indexOf("用户名或密码错误")!=-1){
						jumpToNomal9();
					}else if(logininfo.errorMessage!=null&&(logininfo.errorMessage.indexOf("CA")!=-1||logininfo.errorMessage.indexOf("认证")!=-1)){
						jumpToCA9();
					}
			});
			DSign_Content = logininfo.DSign_Content;
		return retloginpanel;
	};	
	
/**
	*页面对应编号为 11 使用地区：郴州
	* 说明：最初为郴州专门定制
	*/
	this.ifmisLogin11Show = function(servers,logininfo){
		//登录服务地址
		Ext.lt.portal.component.login.server=servers;
	        //设置登录后系统首页路径
			if(logininfo.url!=null){
				this.url=logininfo.url;
			}
			//登录页面内容存储数组
			var setHtml=[];
			var fl = logininfo.IFMIS_FESTIVAL;
			if(fl=="1" ||fl=="2" ||fl=="3"||fl=="5" ||fl=="6"){
				setHtml.push('<div id="flasho" style="background:url('+jrArr[fl]+');background-repeat:no-repeat; width:213px; height:113px;POSITION:absolute;overflow:hidden;z-index:10000;top:168px;margin-left:expression((document.body.clientWidth-469)/2-77);">');			  
				setHtml.push('</div>');
			}	
			//登录界面公告显示
			setHtml.push(postCt(logininfo));
			//超链接
			if(logininfo.hyperLinks!=null&&logininfo.hyperLinks.length > 0){
				setHtml.push(hyperLink(logininfo,35));
			}
			
			setHtml.push('<div style="border:1px #006EC3 solid; border-bottom:0;border-left:0;border-right:0;top:0;left:0;height:768px;width:100%;background-image:url(../../ifmis_images/login/chenzhou/div_bg_three.jpg);background-position:center center;background-repeat:no-repeat;">');
			setHtml.push('<div style="background-image:url(../../ifmis_images/login/chenzhou/login_bg.jpg);background-position:center center;background-repeat:no-repeat;height:349px;width:99%;margin-top:200px;color:#185da2;font-weight:bold;font-size:14px;">');
		    //form1
			setHtml.push('<form id="form1" name="form1" autocomplete="off" method="post" action="">');
			//字体样式
            setHtml.push('<input type="hidden" id="fontFile" name="fontFile" value="stylefontS.css"></input>');
        	setHtml.push('<input type="hidden" name="screenwidth" />');
            setHtml.push('<p style="height:180px;*height:178px!important;*height:178px; "></p>');
			
			setHtml.push('<table id="ptdl" width="480px" border="0" align="center"style="margin-top:-16px;font-size:14px;color:#000;">');
			setHtml.push('<tr height="27px" width="380px">');
           
            //非ca登录(编辑用户名、密码)
			setHtml.push('<td nowrap="nowrap" align="left" width="15%">用户编码：</td>');
			setHtml.push('<td nowrap="nowrap" width="35%" align="left" ><input type="text" name="username" style="height:16px;width:120px;padding-left:2px;line-height:16px;font-size:14px;background-color:none;"/></td>');
			setHtml.push('<td nowrap="nowrap" width="15%" align="left">用户密码：</td>');
			setHtml.push('<td nowrap="nowrap" align="left"><input type="password" name="password" style="height:16px;width:120px;padding-left:2px;line-height:16px;font-size:14px;background-color:none;"/></td>');
            setHtml.push('</tr>');
	       
	        //财政年度设置
			if(logininfo.isArea!='1'){
			    setHtml.push('<tr height="27px" width="380px">');
			    setHtml.push('<td nowrap="nowrap"  align="left" width="15%">财政年份：</td>');
			    setHtml.push('<td nowrap="nowrap" align="left" width="80px">');
			    setHtml.push('<select name="year" style="width:126px;">');
			    for (var i = 0; i < logininfo.loginaCctyear.length; i++) {
			       setHtml.push('<option value="' + logininfo.loginaCctyear[i].all + '">' + logininfo.loginaCctyear[i].acctmainbodyname + '</option>');
			    }
			    setHtml.push('</select></td>');			   			    
			}
	
		    //财政名称设置
			if(logininfo.isArea=='1'){
				setHtml.push('<tr style="line-height: 25px; height: 27px;">')
				setHtml.push('<td nowrap="nowrap" width="100px" align="left" >财政年度：</td>')
			    setHtml.push('<td nowrap="nowrap" align="left" > ');
			    setHtml.push('<select name="year" style="width: 126px;" onchange="year2AreaSelect();">');
			    for (var i = 0; i < logininfo.loginaCctyear.length; i++) {
			       setHtml.push('<option value="' + logininfo.loginaCctyear[i].all + '">' + logininfo.loginaCctyear[i].acctmainbodyname + '</option>');
			    }	
			    setHtml.push('</select></td>');
			    setHtml.push('<td nowrap="nowrap" align="left" width="100px">财政名称：</td>');
			    setHtml.push('<td nowrap="nowrap" width="118px" align="left" >');
			    setHtml.push('<select name="area" style="width: 126px;" id="area">');
                setHtml.push('<option>1</option>');
			    setHtml.push('        </select>        </td>');			    
			}
			setHtml.push('</tr>')
			
            setHtml.push('<tr><td colspan="6" nowrap="nowrap" align="center" >');	
        	setHtml.push('<button class="login_btn" value="登录" id="login_button" onclick="dologin()" ></button>&nbsp;&nbsp;&nbsp;');
        	setHtml.push('<button class="reset_btn" value="重置"  type="reset">	');	        	
        	setHtml.push('</td></tr> ');
        	setHtml.push('<tr style="line-height:19px;height:19px;">');
        	setHtml.push('<td colspan="5" nowrap="nowrap" valign="bottom"><font color="red" id="errorMessage">'+logininfo.errorMessage+'</font></td>');
        	setHtml.push('</tr>');
	        setHtml.push('</table>');
	        setHtml.push('</form>');
	        
	        //form2
	        setHtml.push('<form id="form2" name="form2" autocomplete="off" method="post" action="">');
			//字体样式
            setHtml.push('<input type="hidden" id="fontFile" name="fontFile" value="stylefontS.css"></input>');
        	setHtml.push('<input type="hidden" name="screenwidth" />');
			setHtml.push('<table id="cadl" width="480px" border="0" align="center" style="display:none;margin-top:0;font-size:14px;color:#000;">');
	        //财政年度设置
			if(logininfo.isArea!='1'){
			    setHtml.push('<tr height="30px" width="380px">');
			    setHtml.push('<td nowrap="nowrap"  align="left" width="15%">财政年份：</td>');
			    setHtml.push('<td nowrap="nowrap" align="left" width="80px">');
			    setHtml.push('<select name="year" style="width:126px;">');
			    for (var i = 0; i < logininfo.loginaCctyear.length; i++) {
			       setHtml.push('<option value="' + logininfo.loginaCctyear[i].all + '">' + logininfo.loginaCctyear[i].acctmainbodyname + '</option>');
			    }
			    setHtml.push('</select></td>');			   			    
			}
		    //财政名称设置
			if(logininfo.isArea=='1'){
				setHtml.push('<tr style="line-height: 25px; height: 30px;">')
				setHtml.push('<td nowrap="nowrap" width="100px" align="left" >财政年度：</td>')
			    setHtml.push('<td nowrap="nowrap" align="left" > ');
			    setHtml.push('<select name="year" style="width: 126px;" onchange="year2AreaSelect();">');
			    for (var i = 0; i < logininfo.loginaCctyear.length; i++) {
			       setHtml.push('<option value="' + logininfo.loginaCctyear[i].all + '">' + logininfo.loginaCctyear[i].acctmainbodyname + '</option>');
			    }	
			    setHtml.push('</select></td>');
			    setHtml.push('<td nowrap="nowrap" align="left" width="100px">财政名称：</td>');
			    setHtml.push('<td nowrap="nowrap" width="118px" align="left" >');
			    setHtml.push('<select name="area" style="width:126px;" id="area1">');
                setHtml.push('<option>1</option>');
			    setHtml.push('</select></td>');			    
			}
			setHtml.push('</tr>')
			  
            setHtml.push('<tr style="line-height: 25px; height: 25px;"> ');	
        	setHtml.push('<td colspan="4" nowrap="nowrap" align="center" >');
        	setHtml.push('<input type="hidden" id="signed_data" name="signed_data"/>');
        	setHtml.push('<input type="button" class="renzheng_btn" style="margin-top:10px;border:0;" onclick="doDataProcess()"/>'); 
        	//setHtml.push('<input type="button" style="margin-top:10px;border: 0;background-image: url(/portal/images/login/jr/jrrz.gif);background-position: center center;background-repeat: no-repeat;height: 22px;width: 72px;text-align: center;font-size: 12px;color: #000000;cursor: pointer;" value="认证" id="login_button" onclick="doDataProcess()"/></td>');
        	setHtml.push('<td nowrap="nowrap" width="10px" align="right" nowrap="nowrap">&nbsp;<input type="hidden" name="screenwidth"></td> ');
        	setHtml.push('</tr>');	
        	setHtml.push('<tr style="line-height:19px;height:19px;">');
			setHtml.push('<td align="left" colspan="4" nowrap="nowrap" valign="bottom"><font color="red"  id="caerrorMessage">'+logininfo.errorMessage+'</font></td>');
			setHtml.push('</tr>');	
	        setHtml.push('</table>');
	        setHtml.push('</form>');
	        
	        
	        setHtml.push('<table width="480px" border="0" cellspacing="0" align="center">');
	        setHtml.push('<tr style="height: 30px;">');
		    setHtml.push('<td nowrap="nowrap" align="center" colspan="7" valign="bottom"style="height: 26px;">');
		    setHtml.push('<div id="nomalandca" class="cachange_style"><div class="choose_acc" onclick="jumpToCA11()">CA认证</div><div class="choose_acc" onclick="jumpToNomal11()">普通用户</div></div>');
		    setHtml.push('</td></tr></table>');
	        
	        setHtml.push('</div>');
	        
	        //版权控制
		    setHtml.push('<p style="font-size:12px;margin-left:'+window.screen.width/4+'; color:#FFFFFF; text-align:right; width:480px; line-height:15px; height:15px;margin:auto;margin-top:-10px;*margin-top:-15px!important;*margin-top:-15px;">'+window.status+'</p></div>');			
			//多地区跳转用户登录信息存储表单对象
			setHtml.push('  <form id="multiAreaForm" name="multiAreaForm" method="post" action="/login.do">');
			//用户编码
			setHtml.push('      <input type="hidden" id="username" name="username"/>');
			//财政年度
			setHtml.push('      <input type="hidden" id="year" name="year"/>');
			//密码
			setHtml.push('      <input type="hidden" id="password" name="password"/>');
			//地区标识
			setHtml.push('      <input type="hidden" id="area" name="area"/>');
			setHtml.push('      <input type="hidden" id="area_name" name="area_name"/>');
			//用于控制菜单宽度
			setHtml.push('      <input type="hidden" id="screenwidth" name="screenwidth"/>');
			//主服务地址，用户控制退出系统操作
			setHtml.push('      <input type="hidden" id="mainUrl" name="mainUrl"/>');
			//CA认证信息
			setHtml.push('      <input type="hidden" id="signed_data" name="signed_data"/>');
			//CA认证随机数信息
			setHtml.push('      <input type="hidden" id="DSign_Content" name="DSign_Content"/>');
			setHtml.push('</form>');
					
			//下载控件功能按钮
			setHtml.push(downloadControl(logininfo));
            //定义存储页面panel对象	
			var retloginpanel = new Ext.Panel({
				id:"systemmain", 
				unstyled:true,
				bodyStyle:'border-width:0px',
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
			retloginpanel.on('afterlayout',function(panel,layout){
					onloadCook();
					if(logininfo.logindefaulttype=="1"){
						jumpToNomal11();//0默认为ca ;1默认为用户登录 
					}else{
						jumpToCA11();
					}
					if(logininfo.errorMessage!=null&&logininfo.errorMessage.indexOf("用户名或密码错误")!=-1){
						jumpToNomal11();
					}else if(logininfo.errorMessage!=null&&(logininfo.errorMessage.indexOf("CA")!=-1||logininfo.errorMessage.indexOf("认证")!=-1)){
						jumpToCA11();
					}
			});
			DSign_Content = logininfo.DSign_Content;
		return retloginpanel;
	};		
	
/**
	*页面对应编号为 12 使用地区：安徽检查系统
	* 说明：最初为安徽专门定制
	*/
	this.ifmisLogin12Show = function(servers,logininfo){
		//登录服务地址
		Ext.lt.portal.component.login.server=servers;
	        //设置登录后系统首页路径
			if(logininfo.url!=null){
				this.url=logininfo.url;
			}
			//登录页面内容存储数组
			var setHtml=[];
			setHtml.push('<div style="background-image: url(../../portal/login/images/bg_leri.jpg);background-repeat: repeat-x;">');
			setHtml.push('<form id="form1" name="form1" method="post" action="/login.do">');
			setHtml.push('<input type="hidden" id="screenwidth" name="screenwidth"></input>');		
			//字体样式
			setHtml.push('<input type="hidden" id="fontFile" name="fontFile" value="stylefontS.css"></input>');
			setHtml.push('<table width="861" height="781" border="0" align="center" cellpadding="0" cellspacing="0" class="a1" >');
			setHtml.push('<tr><td valign="top">');
			setHtml.push('<table width="222" height="145" border="0" align="center" cellspacing="0" style="margin:245px; margin-bottom:0;"><tr>');
			setHtml.push('<td width="49">用户</td>');
			setHtml.push('<td width="169"><input type="text" name="username" style="width:169px;heigth:28px;" value=""/></td>');
			setHtml.push('</tr><tr>');
			setHtml.push('<td>密码</td>');
			setHtml.push('<td ><input  type="password" name="password" style="width:169px;heigth:28px;" value=""/></td>');
			setHtml.push('</tr><tr>');
			setHtml.push('<td>年份</td>');
			setHtml.push('<td>    <select name="year"> ');
			for(var i=0;i<logininfo.loginaCctyear.length;i++){
				setHtml.push('<option value="'+logininfo.loginaCctyear[i].all+'">'+logininfo.loginaCctyear[i].acctmainbodyname+'</option>');
			}
			setHtml.push(' </select>       </td');
			setHtml.push('</tr> <tr>');
			setHtml.push(' <td><input type="button" style="	border: 0px;text-align: center;padding-top: 3px;width: 92px;height: 43px;background-image: url(../../portal/login/images/come.jpg);" value="" id="login_button" onclick="dologin()"/></td>');
			setHtml.push(' <td>&nbsp;&nbsp;&nbsp;&nbsp;<input type="reset"  style="	border: 0px;text-align: center;padding-top: 3px;width: 92px;height: 43px;background-image: url(../../portal/login/images/recome.jpg);" value="" id="login_button" /></td>');
			setHtml.push('</tr> </table>');
			setHtml.push('<table border="0" style="margin-left:249px;">');
			setHtml.push('<tr>');
			setHtml.push('<td nowrap="nowrap" valign="bottom"><font color="red" size="2"  id="errorMessage"><c:out value="${msg}"/></font></td>');
			setHtml.push('</tr></table></td></tr></table></form>');
			setHtml.push('</div>');
            //定义存储页面panel对象
			var retloginpanel = new Ext.Panel({
				id:"systemmain", 
				//unstyled:true,
				bodyStyle:'border-width:0px',
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
			retloginpanel.on('afterlayout',function(panel,layout){
					onloadCook();
			});
			DSign_Content = logininfo.DSign_Content;
		return retloginpanel;
	};	
	
	/**
	*页面对应编号为 13 使用地区：岳阳
	* 说明：最初为岳阳专门定制
	*/
	this.ifmisLogin13Show = function(servers,logininfo){
		//登录服务地址
		Ext.lt.portal.component.login.server=servers;
	        //设置登录后系统首页路径
			if(logininfo.url!=null){
				this.url=logininfo.url;
			}
			//登录页面内容存储数组
			var setHtml=[];
			var fl = logininfo.IFMIS_FESTIVAL;
			if(fl=="1" ||fl=="2" ||fl=="3"||fl=="5" ||fl=="6"){
				if(logininfo.IFMIS_LOGO == "loudi" ){
					setHtml.push('<div id="flasho" style="background:url('+jrArr[fl]+');background-repeat:no-repeat; width:213px; height:113px;POSITION:absolute;overflow:hidden;z-index:10000;top:118px;margin-left:expression((document.body.clientWidth-469)/2-97);">');			  
					setHtml.push('</div>');
				}else{
					setHtml.push('<div id="flasho" style="background:url('+jrArr[fl]+');background-repeat:no-repeat; width:213px; height:113px;POSITION:absolute;overflow:hidden;z-index:10000;top:138px;margin-left:expression((document.body.clientWidth-469)/2-77);">');			  
					setHtml.push('</div>');
				}
			}	
			if(logininfo.IFMIS_LOGO == "loudi" ){
				document.getElementById("id1").style.background = "#00d2e9";
			}
		    setHtml.push(postCt(logininfo));
			setHtml.push('<div style="border:1px #006EC3 solid; border-bottom:0;border-left:0;border-right:0;top:0;left:0;height:768px;width:100%;background-image:url(../../portal/images/login/'+ logininfo.IFMIS_LOGO +'/div_bg_three.jpg);background-position:center center;background-repeat:no-repeat;">');
			setHtml.push('<div style="background-image:url(../../portal/images/login/'+ logininfo.IFMIS_LOGO +'/login_bg.jpg);background-position:center center;background-repeat:no-repeat;height:349px;width:99%;margin-top:170px;color:#185da2;font-weight:bold;font-size:14px;">');
		   	setHtml.push('<form id="form1" name="form1" autocomplete="off" method="post" action="/login.do">');
			//字体样式
            setHtml.push('<input type="hidden" id="fontFile" name="fontFile" value="stylefontS.css"></input>');
			
            if(logininfo.IFMIS_LOGO == "loudi" ){
				setHtml.push('<table width="480px" border="0" align="center"style="margin-top:185px; margin-left:20px;font-size:14px;position:relative;top:190px;*top:0!important;*top:0;left:0px;">');						
			}else{
				setHtml.push('<table width="480px" border="0" align="center"style="margin-top:175px; margin-left:-10px;font-size:14px;position:relative;top:180px;*top:0!important;*top:0;left:0px;">');
			}
			
			setHtml.push('<tr height="35px" width="380px">');
            //非ca登录(编辑用户名、密码)
			if (logininfo.isportalca=="false") {
				setHtml.push('<td nowrap="nowrap" align="left" width="15%">用户编码：</td>');
				setHtml.push('<td nowrap="nowrap" width="35%" align="left" ><input type="text" name="username" style="height:16px;width:120px;padding-left:2px;line-height:16px;font-size:14px;background-color:none;"/></td>');
				setHtml.push('<td nowrap="nowrap" width="15%" align="left">用户密码：</td>');
				setHtml.push('<td nowrap="nowrap" align="left"><input type="password" name="password" style="height:16px;width:120px;padding-left:2px;line-height:16px;font-size:14px;background-color:none;"/></td>');
			}
            setHtml.push('</tr>');
           
	       
	        //财政年度设置
			if(logininfo.isArea!='1'){
			    setHtml.push('<tr height="30px" width="380px">');
			    setHtml.push('<td nowrap="nowrap"  align="left" width="15%">财政年份：</td>');
			    setHtml.push('<td nowrap="nowrap" align="left" width="80px">');
			    setHtml.push('<select name="year" style="width:126px;">');
			    for (var i = 0; i < logininfo.loginaCctyear.length; i++) {
			       setHtml.push('<option value="' + logininfo.loginaCctyear[i].all + '">' + logininfo.loginaCctyear[i].acctmainbodyname + '</option>');
			    }
			    setHtml.push('</select></td>');			   			    
			}
	
		    //财政名称设置
			if(logininfo.isArea=='1'){
				setHtml.push('<tr style="line-height: 25px; height: 25px;">')
				setHtml.push('<td nowrap="nowrap" width="100px" align="left" >财政年度：</td>')
			    setHtml.push('<td nowrap="nowrap" align="left" > ');
			    setHtml.push('<select name="year" style="width: 126px;" onchange="year2AreaSelect();">');
			    for (var i = 0; i < logininfo.loginaCctyear.length; i++) {
			       setHtml.push('<option value="' + logininfo.loginaCctyear[i].all + '">' + logininfo.loginaCctyear[i].acctmainbodyname + '</option>');
			    }	
			    setHtml.push('</select></td>');
			    setHtml.push('<td nowrap="nowrap" align="left" width="100px">财政名称：</td>');
			    setHtml.push('<td nowrap="nowrap" width="118px" align="left" >');
			    setHtml.push('<select name="area" style="width: 126px;" id="area">');
                setHtml.push('<option>1</option>');
			    setHtml.push('        </select>        </td>');		    
			}
			setHtml.push('</tr>')
			
			if(logininfo.isportalca=="true") {
	            setHtml.push('<tr style="line-height: 25px; height: 25px;"> ');	
	        	setHtml.push('<td colspan="6" nowrap="nowrap" align="center" >');
	        	setHtml.push('<input type="hidden" id="signed_data" name="signed_data"/>');
	        	setHtml.push('<input type="button" style="margin-top:10px;border: 0;background-image: url(/portal/images/login/jr/jrrz.gif);background-position: center center;background-repeat: no-repeat;height: 22px;width: 72px;text-align: center;font-size: 12px;color: #000000;cursor: pointer;" value="认证" id="login_button" onclick="doDataProcess()"/></td>');
	        	setHtml.push('</tr> ');
				setHtml.push('<tr align="right" style="line-height: 25px; height: 25px;"> ');
				setHtml.push('<td nowrap="nowrap" width="10px" align="right" nowrap="nowrap">&nbsp;<input type="hidden" name="screenwidth"></td> ');
				setHtml.push('<td align="left" colspan="4" nowrap="nowrap" valign="bottom"><font color="red"  id="errorMessage">'+logininfo.errorMessage+'</font></td>');
				setHtml.push('</tr> ');	
		    //如果不是CA认证，则显示登陆按钮
	        }else{
	            setHtml.push('<tr><td colspan="6" nowrap="nowrap" align="center" style="padding-top:10px;" >');	
	        	setHtml.push('<button class="login_btn" value="登录" id="login_button" onclick="dologin()" ></button>&nbsp;&nbsp;&nbsp;');
	        	setHtml.push('<button class="reset_btn" value="重置"  type="reset">	');	        	
	        	setHtml.push('</td></tr> ');
	        	setHtml.push('<tr> ');
	        	setHtml.push('<td colspan="5" nowrap="nowrap" valign="bottom"><font color="red" id="errorMessage">'+logininfo.errorMessage+'</font></td>');
	        	setHtml.push('</tr>');
	        }	        		       
	        setHtml.push('</table>');
	        setHtml.push('</form></div>');  
	        
	        //多地区跳转用户登录信息存储表单对象
			setHtml.push('  <form id="multiAreaForm" name="multiAreaForm" method="post" action="/login.do">');
			//用户编码
			setHtml.push('      <input type="hidden" id="username" name="username"/>');
			//财政年度
			setHtml.push('      <input type="hidden" id="year" name="year"/>');
			//密码
			setHtml.push('      <input type="hidden" id="password" name="password"/>');
			//地区标识
			setHtml.push('      <input type="hidden" id="area" name="area"/>');
			setHtml.push('      <input type="hidden" id="area_name" name="area_name"/>');
			//用于控制菜单宽度
			setHtml.push('      <input type="hidden" id="screenwidth" name="screenwidth"/>');
			//主服务地址，用户控制退出系统操作
			setHtml.push('      <input type="hidden" id="mainUrl" name="mainUrl"/>');
			//CA认证信息
			setHtml.push('      <input type="hidden" id="signed_data" name="signed_data"/>');
			//CA认证随机数信息
			setHtml.push('      <input type="hidden" id="DSign_Content" name="DSign_Content"/>');
			setHtml.push('</form>');
				        
			//版权控制
		    setHtml.push('<p style="font-size:12px;margin-left:'+window.screen.width/4+'; color:#FFFFFF; text-align:right; width:480px; line-height:15px; height:15px;margin:auto;margin-top:0px;*margin-top:0px!important;*margin-top:0px;">'+window.status+'</p></div>');			
			//下载控件功能按钮
       	 	if(logininfo.IFMIS_LOGO == "loudi" ){
       	 		setHtml.push('<div id="xzkj" style="z-index:10; position:absolute; top:0;right:10px; background-image:url(../../portal/images/login/download/ld_download.jpg); height:128px; width:128px; background-repeat:no-repeat; color:#FFF; font-size:14px; cursor:pointer;filter:alpha(opacity=100);-moz-opacity:0.8;line-height:128px;font-weight:bold;text-align:center;" onmouseover="mouseOvers()" onmouseout="mouseOut()" onclick="exe(\''+logininfo.controlURL+'\')">下载控件</div>');           
       	 	}else{
       	 		setHtml.push(downloadControl(logininfo));
       	 	}
            
            //定义存储页面panel对象	
			var retloginpanel = new Ext.Panel({
				id:"systemmain", 
				unstyled:true,
				bodyStyle:'border-width:0px',
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
			retloginpanel.on('afterlayout',function(panel,layout){
					onloadCook();
			});
			DSign_Content = logininfo.DSign_Content;
		return retloginpanel;
	};		
	
/**
	*页面对应编号为 14 使用地区：张家界
	* 说明：最初为张家界专门定制
	*/
	this.ifmisLogin14Show = function(servers,logininfo){
		//登录服务地址
		Ext.lt.portal.component.login.server=servers;
	        //设置登录后系统首页路径
			if(logininfo.url!=null){
				this.url=logininfo.url;
			}
			//登录页面内容存储数组
			var setHtml=[];
			var fl = logininfo.IFMIS_FESTIVAL;
			if(fl=="1" ||fl=="2" ||fl=="3"||fl=="5" ||fl=="6"){
				setHtml.push('<div id="flasho" style="background:url('+jrArr[fl]+');background-repeat:no-repeat; width:213px; height:113px;POSITION:absolute;overflow:hidden;z-index:10000;top:174px;margin-left:expression((document.body.clientWidth-469)/2-77);">');			  
				setHtml.push('</div>');
			}
	        //登录界面公告显示
			setHtml.push(postCt(logininfo));
			setHtml.push('<div style="border:1px #006EC3 solid; border-bottom:0;border-left:0;border-right:0;top:0;left:0;height:768px;width:100%;background-image:url(../../ifmis_images/login/zhangjiajie/div_bg_three.jpg);background-position:center center;background-repeat:no-repeat;">');
			setHtml.push('<div style="background-image:url(../../ifmis_images/login/zhangjiajie/login_bg.jpg);background-position:center center;background-repeat:no-repeat;height:349px;width:99%;margin-top:200px;color:#185da2;font-weight:bold;font-size:14px;">');
			setHtml.push('<form id="form1" name="form1" autocomplete="off" method="post" action="/login.do">');
			
			//字体样式
            setHtml.push('<input type="hidden" id="fontFile" name="fontFile" value="stylefontS.css"></input>');
			setHtml.push('<table width="480px" border="0" align="center"style="margin-top:175px; margin-left:-20px;font-size:14px;position:relative;top:180px;*top:13px!important;*top:13px;left:8px;*left:10px!important;*left:10px;">');			
			setHtml.push('<tr height="35px" width="380px">');
            //非ca登录(编辑用户名、密码)
			if (logininfo.isportalca=="false") {
				setHtml.push('<td nowrap="nowrap" align="left"width="50px">用户：</td>');
				setHtml.push('<td nowrap="nowrap" width="130px" align="left" ><input type="text" name="username" style="height:16px;width:110px;padding-left:2px;line-height:16px;font-size:14px;background-color:none;"/></td>');
				setHtml.push('<td nowrap="nowrap" width="50px" align="left">密码：</td>');
				setHtml.push('<td nowrap="nowrap" align="left"><input type="password" name="password" style="height:16px;width:110px;padding-left:2px;line-height:16px;font-size:14px;background-color:none;"/></td>');
			}                      
	       
	        //财政年度设置
			if(logininfo.isArea!='1'){			
			    setHtml.push('<td nowrap="nowrap"  align="left" width="15%">年份：</td>');
			    setHtml.push('<td nowrap="nowrap" align="left" width="80px">');
			    setHtml.push('<select name="year" style="width:80px;">');
			    for (var i = 0; i < logininfo.loginaCctyear.length; i++) {
			       setHtml.push('<option value="' + logininfo.loginaCctyear[i].all + '">' + logininfo.loginaCctyear[i].acctmainbodyname + '</option>');
			    }
			    setHtml.push('</select></td>');			   			    
			}
	        setHtml.push('</tr>');
	       
		    //财政名称设置
			if(logininfo.isArea=='1'){
				setHtml.push('<tr style="line-height: 25px; height: 25px;">');
				setHtml.push('<td nowrap="nowrap" width="100px" align="left" >财政年度：</td>')
			    setHtml.push('<td nowrap="nowrap" align="left" > ');
			    setHtml.push('<select name="year" style="width: 118px;" onchange="year2AreaSelect();">');
			    for (var i = 0; i < logininfo.loginaCctyear.length; i++) {
			       setHtml.push('<option value="' + logininfo.loginaCctyear[i].all + '">' + logininfo.loginaCctyear[i].acctmainbodyname + '</option>');
			    }	
			    setHtml.push('</select></td>');
			    setHtml.push('<td nowrap="nowrap" align="left" width="100px">财政名称：</td>');
			    setHtml.push('<td nowrap="nowrap" width="118px" align="left" >');
			    setHtml.push('<select name="area" style="width: 118px;" id="area">');
                setHtml.push('<option>1</option>');
			    setHtml.push('        </select>        </td>');			    
			}
			setHtml.push('</tr>')
			
			if(logininfo.isportalca=="true") {
	            setHtml.push('<tr style="line-height: 25px; height: 25px;"> ');	
	        	setHtml.push('<td colspan="6" nowrap="nowrap" align="center" >');
	        	setHtml.push('<input type="hidden" id="signed_data" name="signed_data"/>');
	        	setHtml.push('<input type="button" style="margin-top:10px;border: 0;background-image: url(/portal/images/login/jr/jrrz.gif);background-position: center center;background-repeat: no-repeat;height: 22px;width: 72px;text-align: center;font-size: 12px;color: #000000;cursor: pointer;" value="认证" id="login_button" onclick="doDataProcess()"/></td></tr>');
				setHtml.push('<tr><td align="left" colspan="4" nowrap="nowrap" valign="bottom"><input type="hidden" name="screenwidth"><font color="red"  id="errorMessage">'+logininfo.errorMessage+'</font></td>');
				setHtml.push('</tr> ');	
		    //如果不是CA认证，则显示登陆按钮
	        }else{
	            setHtml.push('<tr><td colspan="6" nowrap="nowrap" align="center" style="padding-top:10px;">');	
	        	setHtml.push('<button class="login_btn" value="登录" id="login_button" onclick="dologin()" ></button>&nbsp;&nbsp;&nbsp;');
	        	setHtml.push('<button class="reset_btn" value="重置"  type="reset">	');	        	
	        	setHtml.push('</td></tr> ');
	        	setHtml.push('<tr> ');
	        	setHtml.push('<td colspan="6" nowrap="nowrap" valign="bottom" align="center"><font color="red" id="errorMessage">'+logininfo.errorMessage+'</font></td>');
	        	setHtml.push('</tr>');
	        }	        		       
	        setHtml.push('</table>');
	        setHtml.push('</form></div>');  
	        
	        //多地区跳转用户登录信息存储表单对象
			setHtml.push('  <form id="multiAreaForm" name="multiAreaForm" method="post" action="/login.do">');
			//用户编码
			setHtml.push('      <input type="hidden" id="username" name="username"/>');
			//财政年度
			setHtml.push('      <input type="hidden" id="year" name="year"/>');
			//密码
			setHtml.push('      <input type="hidden" id="password" name="password"/>');
			//地区标识
			setHtml.push('      <input type="hidden" id="area" name="area"/>');
			setHtml.push('      <input type="hidden" id="area_name" name="area_name"/>');
			//用于控制菜单宽度
			setHtml.push('      <input type="hidden" id="screenwidth" name="screenwidth"/>');
			//主服务地址，用户控制退出系统操作
			setHtml.push('      <input type="hidden" id="mainUrl" name="mainUrl"/>');
			//CA认证信息
			setHtml.push('      <input type="hidden" id="signed_data" name="signed_data"/>');
			//CA认证随机数信息
			setHtml.push('      <input type="hidden" id="DSign_Content" name="DSign_Content"/>');
			setHtml.push('</form>');
				        
			setHtml.push('<p style="font-size:12px;margin-left:'+window.screen.width/4+'; color:#FFFFFF; text-align:right; width:480px; line-height:15px; height:15px;margin:auto;margin-top:10px;*margin-top:-10px!important;*margin-top:20px;">'+window.status+'</p></div>');						

			//下载控件功能按钮
            setHtml.push('<div id="xzkj" style="z-index:10; position:absolute; top:0;right:10px; background-image:url(../portal/images/login/download/download.gif); height:128px; width:128px; background-repeat:no-repeat; color:#FFF; font-size:14px; cursor:pointer;filter:alpha(opacity=100);-moz-opacity:0.8;line-height:128px;font-weight:bold;text-align:center;" onmouseover="mouseOvers()" onmouseout="mouseOut()" onclick="exe(\''+logininfo.controlURL+'\')">下载控件</div>');           
           
            //定义存储页面panel对象	
			var retloginpanel = new Ext.Panel({
				id:"systemmain", 
				unstyled:true,
				bodyStyle:'border-width:0px',
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
			retloginpanel.on('afterlayout',function(panel,layout){
					onloadCook();
			});
			DSign_Content = logininfo.DSign_Content;
		return retloginpanel;
	};	

/**
	*页面对应编号为 15 使用地区：湘潭
	*/
	this.ifmisLogin15Show = function(servers,logininfo){
		//登录服务地址
		Ext.lt.portal.component.login.server=servers;
	        //设置登录后系统首页路径
			if(logininfo.url!=null){
				this.url=logininfo.url;
			}
			//登录页面内容存储数组
			var setHtml=[];
			var fl = logininfo.IFMIS_FESTIVAL;
			if(fl=="1" ||fl=="2" ||fl=="3"||fl=="5" ||fl=="6"){
				setHtml.push('<div id="flasho" style="background:url('+jrArr[fl]+');background-repeat:no-repeat; width:213px; height:113px;POSITION:absolute;overflow:hidden;z-index:10000;top:164px;margin-left:expression((document.body.clientWidth-469)/2-77);">');			  
				setHtml.push('</div>');
			}	
			
	        //登录界面公告显示
			setHtml.push(postCt(logininfo));
		    setHtml.push('<div style="top:0;left:0;height:768px;width:100%;background-image:url(../../ifmis_images/login/xiangtan/xiangtan_bg.jpg);background-position:center center;background-repeat:no-repeat;border:1px #306DBE solid;">');
		    setHtml.push('<div style="background-image:url(../../portal/images/login/xt/login_bg.jpg);background-position:center center;background-repeat:no-repeat;height:349px;width:99%;margin-top:190px;color:#185da2;font-weight:bold;font-size:14px;">');
			setHtml.push('<form id="form1" name="form1" autocomplete="off" method="post" action="/login.do">');
			
			//字体样式
            setHtml.push('<input type="hidden" id="fontFile" name="fontFile" value="stylefontS.css"></input>');
			setHtml.push('<table width="480px" border="0" align="center"style="margin-top:175px; margin-left:-15px;font-size:14px;position:relative;top:180px;*top:13px!important;*top:13px;left:8px;*left:10px!important;*left:10px;">');			
			setHtml.push('<tr height="35px" width="380px">');
            //非ca登录(编辑用户名、密码)
			if (logininfo.isportalca=="false") {
				setHtml.push('<td nowrap="nowrap" align="left"width="50px">用户：</td>');
				setHtml.push('<td nowrap="nowrap" width="130px" align="left" ><input type="text" name="username" style="height:16px;width:110px;padding-left:2px;line-height:16px;font-size:14px;background-color:none;"/></td>');
				setHtml.push('<td nowrap="nowrap" width="50px" align="left">密码：</td>');
				setHtml.push('<td nowrap="nowrap" align="left"><input type="password" name="password" style="height:16px;width:110px;padding-left:2px;line-height:16px;font-size:14px;background-color:none;"/></td>');
			}
	       
	       //财政年度设置
			if(logininfo.isArea!='1'){
			    setHtml.push('<td nowrap="nowrap"  align="left" width="15%">年份：</td>');
			    setHtml.push('<td nowrap="nowrap" align="left" width="80px">');
			    setHtml.push('<select name="year" style="width:80px;">');
			    for (var i = 0; i < logininfo.loginaCctyear.length; i++) {
			       setHtml.push('<option value="' + logininfo.loginaCctyear[i].all + '">' + logininfo.loginaCctyear[i].acctmainbodyname + '</option>');
			    }
			    setHtml.push('</select></td>');			   			    
			}
	        setHtml.push('</tr>');
	        
		   //财政名称设置
			if(logininfo.isArea=='1'){
				setHtml.push('<tr style="line-height: 25px; height: 25px;">')
				setHtml.push('<td nowrap="nowrap" width="100px" align="left" >财政年度：</td>')
			    setHtml.push('<td nowrap="nowrap" align="left" > ');
			    setHtml.push('<select name="year" style="width: 118px;" onchange="year2AreaSelect();">');
			    for (var i = 0; i < logininfo.loginaCctyear.length; i++) {
			       setHtml.push('<option value="' + logininfo.loginaCctyear[i].all + '">' + logininfo.loginaCctyear[i].acctmainbodyname + '</option>');
			    }	
			    setHtml.push('</select></td>');
			    setHtml.push('<td nowrap="nowrap" align="left" width="100px">财政名称：</td>');
			    setHtml.push('<td nowrap="nowrap" width="118px" align="left" >');
			    setHtml.push('<select name="area" style="width: 118px;" id="area">');
                setHtml.push('<option>1</option>');
			    setHtml.push('        </select>        </td>');
			}
			  setHtml.push('</tr>')

			
			if(logininfo.isportalca=="true") {
	            setHtml.push('<tr style="line-height: 25px; height: 25px;"> ');	
	        	setHtml.push('<td colspan="4" nowrap="nowrap" align="center" >');
	        	setHtml.push('<input type="hidden" id="signed_data" name="signed_data"/>');
	            setHtml.push('<input type="button" style="margin-top:10px;border: 0;background-image: url(/portal/images/login/jr/jrrz.gif);background-position: center center;background-repeat: no-repeat;height: 22px;width: 72px;text-align: center;font-size: 12px;color: #000000;cursor: pointer;" value="认证" id="login_button" onclick="doDataProcess()"/></td>');
	        	setHtml.push('<td nowrap="nowrap" width="10px" align="right" nowrap="nowrap">&nbsp;<input type="hidden" name="screenwidth"></td> ');
	        	setHtml.push('</tr> ');
	        	setHtml.push('<tr align="right" style="line-height: 25px; height: 25px;"> ');		
				setHtml.push('<td align="center" colspan="4" nowrap="nowrap" valign="bottom"><font color="red"  id="errorMessage">'+logininfo.errorMessage+'</font></td>');
				setHtml.push('</tr> ');	
		    //如果不是CA认证，则显示登陆按钮
	        }else{
	            setHtml.push('<tr><td colspan="6" nowrap="nowrap" align="center" style="padding-top:10px;">');	
	        	setHtml.push('<button class="login_btn" value="登录" id="login_button" onclick="dologin()" ></button>&nbsp;&nbsp;&nbsp;');
	        	setHtml.push('<button class="reset_btn" value="重置"  type="reset">	');	        	
	        	setHtml.push('</td></tr> ');
	        	setHtml.push('<tr> ');
	        	setHtml.push('<td colspan="6" nowrap="nowrap" valign="bottom"><font color="red" id="errorMessage">'+logininfo.errorMessage+'</font></td>');
	        	setHtml.push('</tr>');
	        }	        		       
	        setHtml.push('</table>');
	        setHtml.push('</form></div>');  
			
			setHtml.push('<p style="font-size:12px;margin-left:'+window.screen.width/4+'; color:#FFFFFF; text-align:right; width:480px; line-height:15px; height:15px;margin:auto;margin-top:10px;*margin-top:-10px!important;*margin-top:20px;">'+window.status+'</p></div>');						
			
			//多地区跳转用户登录信息存储表单对象
			setHtml.push('  <form id="multiAreaForm" name="multiAreaForm" method="post" action="/login.do">');
			//用户编码
			setHtml.push('      <input type="hidden" id="username" name="username"/>');
			//财政年度
			setHtml.push('      <input type="hidden" id="year" name="year"/>');
			//密码
			setHtml.push('      <input type="hidden" id="password" name="password"/>');
			//地区标识
			setHtml.push('      <input type="hidden" id="area" name="area"/>');
			setHtml.push('      <input type="hidden" id="area_name" name="area_name"/>');
			//用于控制菜单宽度
			setHtml.push('      <input type="hidden" id="screenwidth" name="screenwidth"/>');
			//主服务地址，用户控制退出系统操作
			setHtml.push('      <input type="hidden" id="mainUrl" name="mainUrl"/>');
			//CA认证信息
			setHtml.push('      <input type="hidden" id="signed_data" name="signed_data"/>');
			//CA认证随机数信息
			setHtml.push('      <input type="hidden" id="DSign_Content" name="DSign_Content"/>');
			setHtml.push('</form>');
			
			//下载控件功能按钮
			setHtml.push(downloadControl(logininfo));
			//setHtml.push('<div id="xzkj" style="z-index:10; position:absolute; top:0;right:10px; background-image:url(../../portal/images/login/download/ah_download.jpg); height:128px; width:128px; background-repeat:no-repeat; color:#FFF; font-size:14px; cursor:pointer;filter:alpha(opacity=100);-moz-opacity:0.8;line-height:128px;font-weight:bold;text-align:center;" onmouseover="mouseOvers()" onmouseout="mouseOut()" onclick="exe(\''+logininfo.controlURL+'\')">下载控件</div>');
            
            //定义存储页面panel对象	
			var retloginpanel = new Ext.Panel({
				id:"systemmain", 
				unstyled:true,
				bodyStyle:'border-width:0px',
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
			retloginpanel.on('afterlayout',function(panel,layout){
					onloadCook();
			});
			DSign_Content = logininfo.DSign_Content;
		return retloginpanel;
	};			

/**
	*页面对应编号为 16 使用地区：南宁
	*/
	this.ifmisLogin16Show = function(servers,logininfo){
		//登录服务地址
		Ext.lt.portal.component.login.server=servers;
	        //设置登录后系统首页路径
			if(logininfo.url!=null){
				this.url=logininfo.url;
			}
			//登录页面内容存储数组
			var setHtml=[];
			var fl = logininfo.IFMIS_FESTIVAL;
			if(fl=="1" ||fl=="2" ||fl=="3"||fl=="5" ||fl=="6"){
				setHtml.push('<div id="flasho" style="background:url('+jrArr[fl]+');background-repeat:no-repeat; width:213px; height:113px;POSITION:absolute;overflow:hidden;z-index:10000;top:8px;margin-left:expression((document.body.clientWidth-878)/2);">');			  
				setHtml.push('</div>');			
			}
		    //登录界面公告显示
		    setHtml.push(postCt(logininfo));
		    setHtml.push('<div style="top:0;left:0;height:768px;width:100%;background-image:url(../../portal/images/login/gx/gx_login_bg.jpg);background-position:center top;background-repeat:no-repeat;border-top:1px #306DBE solid;">');
		    setHtml.push('<div style="background-image:url(../../portal/images/login/gx/gx_login.jpg);background-position:center center;background-repeat:no-repeat;height:451px;width:99%;margin-top:60px;color:#FFF;font-weight:bold;font-size:14px;">');
			setHtml.push('<form id="form1" name="form1" autocomplete="off" method="post" action="/login.do">');
			//字体样式
            setHtml.push('<input type="hidden" id="fontFile" name="fontFile" value="stylefontS.css"></input>');
			setHtml.push('<table width="500px" border="0" align="center" cellspacing="7" style="margin-left:320px;margin-top:192px;font-size:14px;margin:auto;position:relative;top:178px; right:-160px;">');
            
            //非ca登录(编辑用户名、密码)
			if (logininfo.isportalca=="false") {
			    if(logininfo.isArea=="1"){
			        setHtml.push('<tr height="58px"></tr>');
			    }else{
				    setHtml.push('<tr height="70px"></tr>');
			    }	
			    setHtml.push('<tr >');
				setHtml.push('<td nowrap="nowrap" align="right" width="35%">用户：</td>');
				setHtml.push('<td nowrap="nowrap" align="left" ><input type="text" name="username" style="height:16px;width:120px;padding-left:2px;line-height:16px;font-size:14px;background-color:none;"/></td>');
				setHtml.push('</tr><tr>');
				setHtml.push('<td nowrap="nowrap" align="right">密码：</td>');
				setHtml.push('<td nowrap="nowrap" align="left"><input type="password" name="password" style="height:16px;width:120px;padding-left:2px;line-height:16px;font-size:14px;background-color:none;"/></td>');
				setHtml.push('</tr>');
			}
                                     
            if (logininfo.isportalca=="true") {
                if(logininfo.isArea=="1"){
                   setHtml.push('<tr height="56px"></tr>');
                }else{
             	   setHtml.push('<tr height="80px"></tr>');
             	}            	
                setHtml.push('<tr >');
            	setHtml.push('<input name="pk" type="hidden"  >');
				setHtml.push('<input name="Sign_value" type="hidden"  >');
	            setHtml.push('<td align="right"  width="35%">证书：');
	           	setHtml.push('</td><td nowrap="nowrap" align="left">');
	            setHtml.push('<select name="selCert" id="selCert" >');
    			setHtml.push('</select></td>');
    			setHtml.push('</tr>');
				setHtml.push('<tr>');
	            setHtml.push('<td nowrap="nowrap" align="right">密码：');
	           	setHtml.push('</td><td nowrap="nowrap" align="left">');
	            setHtml.push('<input type="password" value="" name="userpin">');
    			setHtml.push('</td>');
    			setHtml.push('</tr>');
			}
			
		  if(logininfo.isArea!='1'){
	           //财政年度设置
	           setHtml.push('<tr>');
			   setHtml.push('<td nowrap="nowrap" align="right">年份：</td>');
               //多数据源模式
			   if (logininfo.isMultiDataSourceDeployMode) {
				  setHtml.push('<td nowrap="nowrap" align="left"  colspan="3">');
				  setHtml.push('<select name="year" style="width:125px;height:20px;font-size:12px;">');
				  for (var i = 0; i < logininfo.loginaCctyear.length; i++) {
					 setHtml.push('<option value="' + logininfo.loginaCctyear[i].all + '">' + logininfo.loginaCctyear[i].acctmainbodyname + '</option>');
				  }
				  setHtml.push('        </select>        </td>');
				  setHtml.push('</tr>');
				
			   }
		   }
		  //财政名称设置
		  if(logininfo.isArea=='1'){
		        setHtml.push('<tr style="line-height: 25px; height: 25px;">')
			    setHtml.push('<td nowrap="nowrap" align="right" >年度：</td>')
			    setHtml.push('<td nowrap="nowrap" align="left" > ');
			    setHtml.push('<select name="year" style="width: 126px;" onchange="year2AreaSelect();">');
			    for (var i = 0; i < logininfo.loginaCctyear.length; i++) {
			       setHtml.push('<option value="' + logininfo.loginaCctyear[i].all + '">' + logininfo.loginaCctyear[i].acctmainbodyname + '</option>');
			    }	
			    setHtml.push('</select></td>');
			    setHtml.push('</tr>')
				setHtml.push('<tr>')
			    setHtml.push('<td nowrap="nowrap" align="right">名称：</td>');
			    setHtml.push('<td nowrap="nowrap" width="126px" align="left" >');
			    setHtml.push('<select name="area" style="width: 126px;" id="area">');
                setHtml.push('<option>1</option>');
			    setHtml.push('        </select>        </td>');
			    setHtml.push('</tr>')			   
		  }
			
			//如果是CA认证，则显示登陆按钮 &nbsp;
	        if (logininfo.isportalca=="true") {	
				setHtml.push('<tr>');
				setHtml.push('<td align="center" colspan="1" nowrap="nowrap">');
				setHtml.push('<input type="hidden" id="signed_data" name="signed_data"/>');
	        	setHtml.push('</td>');
				setHtml.push('<td nowrap="nowrap" align="left" width="50px"><input type="button" id="login_button" onclick="OnLogin()" style="border:0;background-image:url(../../portal/images/login/jr/2012/nncj/rz.gif);background-position:center center;background-repeat:no-repeat;height:19px;width:48px;text-align:center;font-size:14px;color:#000000;cursor:pointer;"/></td>');				
				setHtml.push('</tr>');	
				setHtml.push('<tr height="0" style="font-size:0;">');	        	
	        	setHtml.push('<td nowrap="nowrap" align="right">&nbsp;<input type="hidden" name="screenwidth"></td> ');
	        	setHtml.push('<td nowrap="nowrap" text-align="right" width="10px">&nbsp;</td></tr><tr>');
	        	setHtml.push('<td colspan="2" valign="bottom" style="height:40px;">&nbsp;<font color="red"  id="errorMessage">'+logininfo.errorMessage+'</font></td>');
				setHtml.push('</tr>');
				setHtml.push('<tr>');	
				setHtml.push('<td colspan="4" nowrap="nowrap" align="center" </td></tr>');

		    //如果不是CA认证，则显示登陆按钮
	        }else{
	        	setHtml.push('<input type="hidden" name="screenwidth">');
	        	setHtml.push('<tr><td colspan="6" nowrap="nowrap" align="center" >');
        	    setHtml.push('<button class="login_btn" value="登录" id="login_button" style="border:0;background-image:url(../../portal/images/login/gx/login_btn.gif);background-position:center center;background-repeat:no-repeat;height:19px;width:48px;text-align:center;font-size:14px;color:#000000;cursor:pointer;" onclick="dologin()" ></button>&nbsp;&nbsp;&nbsp;');
        	    setHtml.push('<button class="reset_btn" value="重置"  type="reset" style="border:0;background-image:url(../../portal/images/login/gx/reset_btn.gif);background-position:center center;background-repeat:no-repeat;height:19px;width:48px;text-align:center;font-size:14px;color:#000000;cursor:pointer;">	');
	            setHtml.push('</td></tr>');
	            if(logininfo.isArea=='1'){
	                 setHtml.push('<tr><td colspan="2">&nbsp;<input type="hidden" name="screenwidth"><font color="red" id="errorMessage">'+logininfo.errorMessage+'</font></td></tr>');
	            }else{
	                 setHtml.push('<tr height="60px"><td colspan="2">&nbsp;<input type="hidden" name="screenwidth"><font color="red" id="errorMessage">'+logininfo.errorMessage+'</font></td></tr>');
	            }
	       }			
	        setHtml.push('</table>');
	        setHtml.push('</form></div>');
			
			//多地区跳转用户登录信息存储表单对象
			setHtml.push('  <form id="multiAreaForm" name="multiAreaForm" method="post" action="/login.do">');
			//用户编码
			setHtml.push('      <input type="hidden" id="username" name="username"/>');
			//财政年度
			setHtml.push('      <input type="hidden" id="year" name="year"/>');
			//密码
			setHtml.push('      <input type="hidden" id="password" name="password"/>');
			//地区标识
			setHtml.push('      <input type="hidden" id="area" name="area"/>');
			setHtml.push('      <input type="hidden" id="area_name" name="area_name"/>');
			//用于控制菜单宽度
			setHtml.push('      <input type="hidden" id="screenwidth" name="screenwidth"/>');
			//主服务地址，用户控制退出系统操作
			setHtml.push('      <input type="hidden" id="mainUrl" name="mainUrl"/>');
			
			//CA认证信息
			setHtml.push('      <input type="hidden" id="signed_data" name="signed_data"/>');
			//CA认证随机数信息
			setHtml.push('      <input type="hidden" id="DSign_Content" name="DSign_Content"/>');
			//桂林ca特别标识
			setHtml.push('      <input type="hidden" id="glca" name="glca"/>');
			setHtml.push('      <input type="hidden" id="pk" name="pk"/>');
			setHtml.push('      <input type="hidden" id="Sign_value" name="Sign_value"/>');
			setHtml.push('</form>');

			setHtml.push('<p style="font-size:12px;margin-left:'+window.screen.width/4+'; color:#FFFFFF; text-align:right; width:480px; line-height:40px;*line-height:15px!important;*line-height:15px;height:40px;*height:15px!important;*height:15px;margin:auto;">'+window.status+'</p></div>');						

			//下载控件功能按钮
			setHtml.push('<div id="xzkj" style="z-index:10; position:absolute; top:0;right:10px; background-image:url(../portal/images/login/download/download.jpg); height:87px; width:87px; background-repeat:no-repeat; color:#FFF; font-size:14px; cursor:pointer;filter:alpha(opacity=100);-moz-opacity:0.8;line-height:87px;font-weight:bold;text-align:center;" onmouseover="mouseOvers()" onmouseout="mouseOut()" onclick="exe(\''+logininfo.controlURL+'\')">下载控件</div>');
			//防止afterlayout走两遍
            var nanning = true;
            //定义存储页面panel对象OnLogin()
			var retloginpanel = new Ext.Panel({
				id:"systemmain", 
				unstyled:true,
				bodyStyle:'border-width:0px',
				html:setHtml.join(''),
				listeners:{
					'afterlayout':function(){
						if(!nanning){
							return;
						}else{
							nanning = false;
						}
						try{
							onloadCook();
							refresh2();
						}catch(e){
						}
						try{
							document.onkeydown=function(){
								var evt=window.event;
								evt = evt ? evt : (window.event ? window.event : null);
								if(evt.keyCode ==Ext.EventObject.ENTER){
									try{
										form1.selCert.focus();
									}catch(e){}
									if(logininfo.isportalca=="true"){
										 OnLogin();
									}else{
										 dologin();
									}
								}
							}
							
						}catch(e){
						}
					}
				}
			});
			login_init();
			DSign_Content = logininfo.DSign_Content;
		return retloginpanel;
	};	

/**
	*页面对应编号为 17 使用地区：常德
	* 说明：最初为常德专门定制
	*/
	this.ifmisLogin17Show = function(servers,logininfo){
		//登录服务地址
		Ext.lt.portal.component.login.server=servers;
	        //设置登录后系统首页路径
			if(logininfo.url!=null){
				this.url=logininfo.url;
			}
			document.body.style.width = "100%";
			document.body.style.height = "100%";
			document.body.style.margin = "0";
			document.body.style.padding = "0";
			document.body.style.textAlign = "center";
		    document.body.style.backgroundColor = "#0081C6";
		    document.body.style.backgroundImage = "url(../../portal/images/login/cd/cd_login.jpg)";
		    document.body.style.backgroundPosition="center bottom";
		    document.body.style.backgroundRepeat="repeat-x";
			//登录页面内容存储数组
			var setHtml=[];
			var fl = logininfo.IFMIS_FESTIVAL;
			if(fl=="1" ||fl=="2" ||fl=="3"||fl=="5" ||fl=="6"){
				setHtml.push('<div id="flasho" style="background:url('+jrArr[fl]+');background-repeat:no-repeat; width:213px; height:113px;POSITION:absolute;overflow:hidden;z-index:10000;bottom:500px;margin-left:expression((document.body.clientWidth-469)/2-77);">');			  
				setHtml.push('</div>');
			}	
	        //登录界面公告显示
	        setHtml.push(post(logininfo));
			setHtml.push('<div style="width:100%;">');
			setHtml.push('<div style="display:block;position:absolute;z-index:100;left:0;bottom:238px;*bottom:200px!important;*bottom:200px;width:100%; text-align:center;">');
			setHtml.push('<div style="width:535px;background:url(../../portal/images/login/cd/cd_logink.gif) no-repeat center center;height:349px;color:#185da2;font-weight:bold;font-size:14px;margin:auto;">');
			setHtml.push('<form id="form1" name="form1" autocomplete="off" method="post" action="/login.do">');
			//字体样式
            setHtml.push('<input type="hidden" id="fontFile" name="fontFile" value="stylefontS.css"></input>');
            setHtml.push('<p style="height:187px;*height:170px!important;*height:170px;"></p>');
		    setHtml.push('<table width="480px" border="0" align="center"style="font-size:14px">');
			setHtml.push('<tr width="380px">');
            //非ca登录(编辑用户名、密码)
			if (logininfo.isportalca=="false") {
				setHtml.push('<td nowrap="nowrap" align="left"width="50px">用户：</td>');
				setHtml.push('<td nowrap="nowrap" width="50px" align="left" ><input type="text" name="username" style="height:16px;width:120px;padding-left:2px;line-height:16px;font-size:14px;background-color:none;"/></td>');
				setHtml.push('<td nowrap="nowrap" width="50px" align="left">密码：</td>');
				setHtml.push('<td nowrap="nowrap" width="50px" align="left"><input type="password" name="password" style="height:16px;width:110px;padding-left:2px;line-height:16px;font-size:14px;background-color:none;"/></td>');
			}

	        //财政年度设置
			if(logininfo.isArea!='1'){		
			    setHtml.push('<td nowrap="nowrap"  align="left" width="15%">年份：</td>');
			    setHtml.push('<td nowrap="nowrap" align="left" width="80px">');
			    setHtml.push('<select name="year" style="width:80px;">');
			    for (var i = 0; i < logininfo.loginaCctyear.length; i++) {
			       setHtml.push('<option value="' + logininfo.loginaCctyear[i].all + '">' + logininfo.loginaCctyear[i].acctmainbodyname + '</option>');
			    }
			    setHtml.push('</select></td>');			   			    
			}
	
		    //财政名称设置
			if(logininfo.isArea=='1'){
				setHtml.push('<tr style="line-height: 25px; height: 25px;">')
				setHtml.push('<td nowrap="nowrap" width="100px" align="left" >财政年度：</td>')
			    setHtml.push('<td nowrap="nowrap" align="left" > ');
			    setHtml.push('<select name="year" style="width: 126px;" onchange="year2AreaSelect();">');
			    for (var i = 0; i < logininfo.loginaCctyear.length; i++) {
			       setHtml.push('<option value="' + logininfo.loginaCctyear[i].all + '">' + logininfo.loginaCctyear[i].acctmainbodyname + '</option>');
			    }	
			    setHtml.push('</select></td>');
			    setHtml.push('<td nowrap="nowrap" align="left" width="100px">财政名称：</td>');
			    setHtml.push('<td nowrap="nowrap" width="118px" align="left" >');
			    setHtml.push('<select name="area" style="width: 117px;" id="area">');
                setHtml.push('<option>1</option>');
			    setHtml.push('        </select>        </td>');			    
			}
			setHtml.push('</tr>')

			//如果是CA认证，则显示登陆按钮
	        if (logininfo.isportalca=="true") {
	        	setHtml.push('<td colspan="4" nowrap="nowrap">');
	        	setHtml.push('<input type="hidden" id="signed_data" name="signed_data"/><input type="hidden" name="screenwidth">');
	        	setHtml.push('<input type="button" style="margin-top:10px;border: 0;background-image: url(/portal/images/login/jr/jrrz.gif);background-position: center center;background-repeat: no-repeat;height: 22px;width: 72px;text-align: center;font-size: 12px;color: #000000;cursor: pointer;" value="认证" id="login_button" onclick="doDataProcess()"/>');
				setHtml.push('<tr><td colspan="4" valign="bottom"><font color="red" id="errorMessage">'+logininfo.errorMessage+'</font></td>');
				setHtml.push('</tr>');	
		    //如果不是CA认证，则显示登陆按钮
	        }else{
	        	setHtml.push('<tr><td colspan="6" nowrap="nowrap" align="center" style="padding-top:20px;" >');
				setHtml.push('<button class="login_btn" value="登录" id="login_button" onclick="dologin()" ></button>&nbsp;&nbsp;&nbsp;');
				setHtml.push('<button class="reset_btn" value="重置"  type="reset">');	
				setHtml.push('	</td></tr> <td colspan="6" nowrap="nowrap" valign="bottom">&nbsp;<input type="hidden" name="screenwidth"><font color="red" id="errorMessage">'+logininfo.errorMessage+'</font></td>');
	        	setHtml.push('</tr><tr> ');       	
	        }

	        setHtml.push('</table></form></div>');
	        setHtml.push('<p style="margin:auto;font-size:12px;margin-left:'+window.screen.width/4+'; color:#173E60; text-align:right; width:480px; line-height:15px; height:15px;">'+window.status+'</p>');
			setHtml.push('</div>');
			setHtml.push('</div>');
	       
	        //多地区跳转用户登录信息存储表单对象
			setHtml.push('  <form id="multiAreaForm" name="multiAreaForm" method="post" action="/login.do">');
			//用户编码
			setHtml.push('      <input type="hidden" id="username" name="username"/>');
			//财政年度
			setHtml.push('      <input type="hidden" id="year" name="year"/>');
			//密码
			setHtml.push('      <input type="hidden" id="password" name="password"/>');
			//地区标识
			setHtml.push('      <input type="hidden" id="area" name="area"/>');
			setHtml.push('      <input type="hidden" id="area_name" name="area_name"/>');
			//用于控制菜单宽度
			setHtml.push('      <input type="hidden" id="screenwidth" name="screenwidth"/>');
			//主服务地址，用户控制退出系统操作
			setHtml.push('      <input type="hidden" id="mainUrl" name="mainUrl"/>');
			//CA认证信息
			setHtml.push('      <input type="hidden" id="signed_data" name="signed_data"/>');
			//CA认证随机数信息
			setHtml.push('      <input type="hidden" id="DSign_Content" name="DSign_Content"/>');
			setHtml.push('</form>');
	        
	        //下载控件功能按钮
	        setHtml.push('<div id="xzkj" style="z-index:10; position:absolute; top:0;left:10px; background-image:url(../../portal/images/login/cd/xiazai.jpg); height:128px; width:128px; background-repeat:no-repeat; color:#FFF; font-size:14px; cursor:pointer;filter:alpha(opacity=100);-moz-opacity:0.8;line-height:128px;font-weight:bold;text-align:center;" onmouseover="mouseOvers()" onmouseout="mouseOut()" onclick="exe(\''+logininfo.controlURL+'\')">下载控件</div>');
            //往模板页面增加body样式来处理登录页面高度不能撑满整个屏幕的问题
            //document.write('<link href="' + _ROOT_PATH_ + '"/portal/css/body17.css" rel="stylesheet" type="text/css" />');
            //定义存储页面panel对象	
			var retloginpanel = new Ext.Panel({
				id:"systemmain", 
				unstyled:true,
				bodyStyle:'border-width:0px;',
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
			retloginpanel.on('afterlayout',function(panel,layout){
					onloadCook();
			});
			DSign_Content = logininfo.DSign_Content;
		return retloginpanel;
	};	
/**
	*页面对应编号为 18 使用地区：长沙政府债务系统
	* 
	*/
	this.ifmisLogin18Show = function(servers,logininfo){
		//登录服务地址
		Ext.lt.portal.component.login.server=servers;
	        //设置登录后系统首页路径
			if(logininfo.url!=null){
				this.url=logininfo.url;
			}
			//登录页面内容存储数组
			var setHtml=[];
			var fl = logininfo.IFMIS_FESTIVAL;
			if(fl=="1" ||fl=="2" ||fl=="3"||fl=="5" ||fl=="6"){
				setHtml.push('<div id="flasho" style="background:url('+jrArr[fl]+');background-repeat:no-repeat; width:213px; height:113px;POSITION:absolute;overflow:hidden;z-index:10000;top:174px;margin-left:expression((document.body.clientWidth-469)/2-67);">');			  
				setHtml.push('</div>');
			}
	        //登录界面公告显示
			setHtml.push(postCt(logininfo));
	        document.getElementById("id1").style.background = "#00D3E8 url(../portal/images/login/cs/csbg.jpg) repeat-x left top";
		    setHtml.push('<div style="top:0;left:0;height:768px;width:100%;background-image:url(../portal/images/login/cs/cs_bg.jpg);background-position:center center;background-repeat:no-repeat;border-top:1px #306DBE solid;">');
		    setHtml.push('<div style="background-image:url(../portal/images/login/cs/cs_login.jpg);background-position:center center;background-repeat:no-repeat;height:349px;width:99%;margin-top:200px;color:#185da2;font-weight:bold;font-size:14px;position:relative;left:13px;">');
			setHtml.push('<form id="form1" name="form1" autocomplete="off" method="post" action="/login.do">');
			//字体样式
            setHtml.push('<input type="hidden" id="fontFile" name="fontFile" value="stylefontS.css"></input>');
			setHtml.push('<table width="480px" border="0" align="center"style="margin-top:175px; font-size:14px;position:relative;top:180px;*top:13px!important;*top:13px;left:1px;*left:10px!important;*left:2px;">');			
			setHtml.push('<tr height="35px" width="380px">');
            //非ca登录(编辑用户名、密码)
			if (logininfo.isportalca=="false") {
				setHtml.push('<td nowrap="nowrap" align="left"width="50px">用户：</td>');
				setHtml.push('<td nowrap="nowrap" width="130px" align="left" ><input type="text" name="username" style="height:16px;width:110px;padding-left:2px;line-height:16px;font-size:14px;background-color:none;"/></td>');
				setHtml.push('<td nowrap="nowrap" width="50px" align="left">密码：</td>');
				setHtml.push('<td nowrap="nowrap" align="left"><input type="password" name="password" style="height:16px;width:110px;padding-left:2px;line-height:16px;font-size:14px;background-color:none;"/></td>');
			}            
            
            //财政年度设置
			if(logininfo.isArea!='1'){
			    setHtml.push('<td nowrap="nowrap"  align="left" width="15%">年份：</td>');
			    setHtml.push('<td nowrap="nowrap" align="left" width="80px">');
			    setHtml.push('<select name="year" style="width:80px;">');
			    for (var i = 0; i < logininfo.loginaCctyear.length; i++) {
			       setHtml.push('<option value="' + logininfo.loginaCctyear[i].all + '">' + logininfo.loginaCctyear[i].acctmainbodyname + '</option>');
			    }
			    setHtml.push('</select></td>');			   			    
			}
	       setHtml.push('</tr>');
	       
		   //财政名称设置
			if(logininfo.isArea=='1'){
				setHtml.push('<tr style="line-height: 25px; height: 25px;">');
				setHtml.push('<td nowrap="nowrap" width="100px" align="left" >财政年度：</td>')
			    setHtml.push('<td nowrap="nowrap" align="left" > ');
			    setHtml.push('<select name="year" style="width: 118px;" onchange="year2AreaSelect();">');
			    for (var i = 0; i < logininfo.loginaCctyear.length; i++) {
			       setHtml.push('<option value="' + logininfo.loginaCctyear[i].all + '">' + logininfo.loginaCctyear[i].acctmainbodyname + '</option>');
			    }	
			    setHtml.push('</select></td>');
			    setHtml.push('<td nowrap="nowrap" align="left" width="100px">财政名称：</td>');
			    setHtml.push('<td nowrap="nowrap" width="118px" align="left" >');
			    setHtml.push('<select name="area" style="width: 118px;" id="area">');
                setHtml.push('<option>1</option>');
			    setHtml.push('        </select>        </td>');			    
			}
			setHtml.push('</tr>')
			  
			//如果是CA认证，则显示登陆按钮
	        if (logininfo.isportalca=="true") {
	            setHtml.push('<tr height="25px" width="380px">');
	        	setHtml.push('<td colspan="4" nowrap="nowrap" align="center">');
	        	setHtml.push('<input type="hidden" id="signed_data" name="signed_data"/>');
        	    setHtml.push('<input type="button" style="margin-top:10px;border: 0;background-image: url(/portal/images/login/jr/jrrz.gif);background-position: center center;background-repeat: no-repeat;height: 22px;width: 72px;text-align: center;font-size: 12px;color: #000000;cursor: pointer;" value="认证" id="login_button" onclick="doDataProcess()"/>');
	        	setHtml.push('</tr>');
				setHtml.push('<tr height="18px" width="380px">');
				setHtml.push('<td colspan="4" nowrap="nowrap" valign="bottom"><input type="hidden" name="screenwidth"><font color="red"  id="errorMessage">'+logininfo.errorMessage+'</font></td>');
				setHtml.push('</tr> <tr>');	
				setHtml.push('<td colspan="4" nowrap="nowrap" align="center" >');
		    //如果不是CA认证，则显示登陆按钮
	        }else{
	            setHtml.push('<tr><td colspan="6" nowrap="nowrap" align="center" style="padding-top:10px;">');
	            setHtml.push('<button class="login_btn" value="登录" id="login_button" onclick="dologin()" ></button>&nbsp;&nbsp;&nbsp;');
		        setHtml.push('<button class="reset_btn" value="重置"  type="reset">	');	        	
	        	setHtml.push('</td></tr>');
	        	setHtml.push('<tr>');
	        	setHtml.push('<td colspan="6" nowrap="nowrap" valign="bottom" align="center"><font color="red" id="errorMessage">'+logininfo.errorMessage+'</font></td>');
	        	setHtml.push('</tr>');
	        }		
	        setHtml.push('</table></form></div>');
			
			//多地区跳转用户登录信息存储表单对象
			setHtml.push('  <form id="multiAreaForm" name="multiAreaForm" method="post" action="/login.do">');
			//用户编码
			setHtml.push('      <input type="hidden" id="username" name="username"/>');
			//财政年度
			setHtml.push('      <input type="hidden" id="year" name="year"/>');
			//密码
			setHtml.push('      <input type="hidden" id="password" name="password"/>');
			//地区标识
			setHtml.push('      <input type="hidden" id="area" name="area"/>');
			setHtml.push('      <input type="hidden" id="area_name" name="area_name"/>');
			//用于控制菜单宽度
			setHtml.push('      <input type="hidden" id="screenwidth" name="screenwidth"/>');
			//主服务地址，用户控制退出系统操作
			setHtml.push('      <input type="hidden" id="mainUrl" name="mainUrl"/>');
			//CA认证信息
			setHtml.push('      <input type="hidden" id="signed_data" name="signed_data"/>');
			//CA认证随机数信息
			setHtml.push('      <input type="hidden" id="DSign_Content" name="DSign_Content"/>');
			setHtml.push('</form>');
			
			setHtml.push('<p style="font-size:12px;margin-left:'+window.screen.width/4+'; color:#FFFFFF; text-align:right; width:480px; line-height:15px; height:15px;margin:auto;margin-top:6px;*margin-top:-10px!important;*margin-top:6px;">'+window.status+'</p></div>');			
			//下载控件功能按钮
			setHtml.push('<div id="xzkj" style="z-index:10; position:absolute; top:0;right:10px; background-image:url(../portal/images/login/cs/cs_download.jpg); height:128px; width:128px; background-repeat:no-repeat; color:#FFF; font-size:14px; cursor:pointer;filter:alpha(opacity=100);-moz-opacity:0.8;line-height:128px;font-weight:bold;text-align:center;" onmouseover="mouseOvers()" onmouseout="mouseOut()" onclick="exe(\''+logininfo.controlURL+'\')">下载控件</div>');
            
            //定义存储页面panel对象			
			var retloginpanel = new Ext.Panel({
				id:"systemmain", 
				unstyled:true,
				bodyStyle:'border-width:0px',
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
			retloginpanel.on('afterlayout',function(panel,layout){
					onloadCook();
			});
			DSign_Content = logininfo.DSign_Content;
		return retloginpanel;
	};			

   /**
	*页面对应编号为 19 使用地区：桂林
	* 
	*/

	this.ifmisLogin19Show = function(servers,logininfo){
		glsevertime = logininfo.wholesevertime;
		overTimeSet = logininfo.overTimeSet;
		overTimeContext = logininfo.overTimeContext;
		//登录服务地址;
		Ext.lt.portal.component.login.server=servers;
	    //document.getElementById('id1').style.backgroundColor='#02E8F5';
	        //设置登录后系统首页路径
			if(logininfo.url!=null){
				this.url=logininfo.url;
			}
			//登录页面内容存储数组
			var setHtml=[];
			var fl = logininfo.IFMIS_FESTIVAL;
			if(fl=="1" ||fl=="2" ||fl=="3"||fl=="5" ||fl=="6"){
				setHtml.push('<div id="flasho" style="background:url('+jrArr[fl]+');background-repeat:no-repeat; width:213px; height:113px;POSITION:absolute;overflow:hidden;z-index:10000;top:128px;margin-left:expression((document.body.clientWidth-469)/2-232);">');			  
				setHtml.push('</div>');
			}		
	        //登录界面公告显示
			setHtml.push(post(logininfo));
			setHtml.push('<div style="top:0;left:0;height:768px;width:100%;background-image:url(../portal/images/login/gl/gl.jpg);background-position:center center;background-repeat:no-repeat;border-top:1px #306DBE solid;">');
			setHtml.push('<div style="background-image:url(../portal/images/login/gl/gl_login.jpg);background-position:center center;background-repeat:no-repeat;height:349px;width:99%;margin-top:172px;margin-left:-135px;color:#185da2;font-weight:bold;font-size:14px;position:relative;top:-3px;*top:0!important;*top:0;left:22px;*left:10px!important;*left:10px;">');
			setHtml.push('<form id="form1" name="form1" autocomplete="off" method="post" action="/login.do">');
			//字体样式
            setHtml.push('<input type="hidden" id="fontFile" name="fontFile" value="stylefontS.css"></input>');
            setHtml.push('<table width="480px" border="0" align="center"style="margin-top:185px; font-size:14px;position:relative;left:0px;top:200px;*top:20px!impotant;*top:20px;">');
            //非ca登录(编辑用户名、密码)
			if (logininfo.isportalca=="false") {
			    setHtml.push('<tr height="25px">');
				setHtml.push('<td nowrap="nowrap" align="left"width="15%">用户：</td>');
				setHtml.push('<td nowrap="nowrap" width="35%" align="left" ><input type="text" name="username" style="height:16px;width:120px;padding-left:2px;line-height:16px;font-size:14px;background-color:none;"/></td>');
				setHtml.push('<td nowrap="nowrap" width="15%" align="left">密码：</td>');
				setHtml.push('<td nowrap="nowrap" align="left"><input type="password" name="password" style="height:16px;width:120px;padding-left:2px;line-height:16px;font-size:14px;background-color:none;"/></td>');
				setHtml.push('</tr>');
			}           
           
	        //财政年度设置
			if(logininfo.isArea!='1'){
			    setHtml.push('<tr height="18px">');
		        //setHtml.push('<tr height="35px" width="380px">');
		 	    setHtml.push('<td nowrap="nowrap"  align="left" width="15%">年份：</td>');
			    setHtml.push('<td nowrap="nowrap" align="left" width="80px">');
			    setHtml.push('<select name="year" style="width:126px;">');
			    for (var i = 0; i < logininfo.loginaCctyear.length; i++) {
			       setHtml.push('<option value="' + logininfo.loginaCctyear[i].all + '">' + logininfo.loginaCctyear[i].acctmainbodyname + '</option>');
			    }
			    setHtml.push('</select></td>');			   			    
			}
	
		    //财政名称设置
			if(logininfo.isArea=='1'){
				setHtml.push('<tr style="line-height: 25px; height: 18px;">');
				setHtml.push('<td nowrap="nowrap" width="100px" align="left" >财政年度：</td>')
			    setHtml.push('<td nowrap="nowrap" align="left" > ');
			    setHtml.push('<select name="year" style="width: 126px;" onchange="year2AreaSelect();">');
			    for (var i = 0; i < logininfo.loginaCctyear.length; i++) {
			       setHtml.push('<option value="' + logininfo.loginaCctyear[i].all + '">' + logininfo.loginaCctyear[i].acctmainbodyname + '</option>');
			    }	
			    setHtml.push('</select></td>');	
			    setHtml.push('<td nowrap="nowrap" align="left" width="100px">财政名称：</td>');
			    setHtml.push('<td nowrap="nowrap" width="118px" align="left" >');
			    setHtml.push('<select name="area" style="width: 126px;" id="area">');
                setHtml.push('<option>1</option>');
			    setHtml.push('</select></td>');			   		    
			}
			 			  
           if (logininfo.isportalca=="true") { 
                setHtml.push('<tr style="line-height: 25px; height: 25px;">')          
	            setHtml.push('<td nowrap="nowrap" width="50px" align="left">证书：</td>');
	            setHtml.push('<input name="pk" type="hidden"  >');
				setHtml.push('<input name="Sign_value" type="hidden">');
	           	setHtml.push('<td nowrap="nowrap" width="100px" align="left" nowrap="nowrap">');
	            setHtml.push('<select name="select1" id="select1" onchange="javascript:guilinCheckOutDateTime()" >');
    			setHtml.push('</select></td>');
			}
           setHtml.push('</tr>');
           
			//如果是CA认证，则显示登陆按钮
	        if (logininfo.isportalca=="true") {
	        	setHtml.push('<td colspan="4" nowrap="nowrap" align="center">');
	        	setHtml.push('<input type="hidden" id="signed_data" name="signed_data"/><input type="hidden" name="screenwidth">');
	        	setHtml.push('<input type="button" value="认证" style="margin-top:10px;border: 0;background-image: url(/portal/images/login/jr/jrrz.gif);background-position: center center;background-repeat: no-repeat;height: 22px;width: 72px;text-align: center;font-size: 12px;color: #000000;cursor: pointer;" id="login_button" onclick="signvalue()"/></td>');
				setHtml.push('<tr style="line-height: 25px; height: 25px;"><td colspan="4" nowrap="nowrap" valign="bottom"><div style="width:460px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:red;"><font color="red"  id="errorMessage" title="'+logininfo.errorMessage+'">'+logininfo.errorMessage+'</font></div></td></tr>');
				setHtml.push('</tr> <tr>');	
				setHtml.push('<td colspan="4" nowrap="nowrap" align="center" >');
		    //如果不是CA认证，则显示登陆按钮
	        }else{
	            setHtml.push('<tr><td colspan="6" nowrap="nowrap" align="center" style="padding-top:10px;">');
	        	setHtml.push('<button class="login_btn" value="登录" id="login_button" onclick="dologin()" ></button>&nbsp;&nbsp;&nbsp;');
	            setHtml.push('<button class="reset_btn" value="重置"  type="reset">	');
	            setHtml.push('</td>');
	        	setHtml.push('<tr style="line-height: 25px; height: 25px;">')
	        	setHtml.push('<td colspan="5" nowrap="nowrap" valign="bottom" align="center"><font color="red" id="errorMessage">'+logininfo.errorMessage+'</font></td>');
	        	setHtml.push('</tr><tr><td colspan="6" nowrap="nowrap" align="center" >');
	        }			
	        setHtml.push('</td></tr> </table></form></div>');
	        setHtml.push('<p style="font-size:12px;margin-left:'+window.screen.width/4+'; color:#FFFFFF; text-align:center; width:100%;line-height:20px; height:20px;"><span style="magin-right:-350px;*position:relative!important;*position:relative;*right:350px!important;*right:350px;">'+window.status+'</span></p></div>');			
			//多地区跳转用户登录信息存储表单对象
			setHtml.push('  <form id="multiAreaForm" name="multiAreaForm" method="post" action="/login.do">');
			//用户编码
			setHtml.push('      <input type="hidden" id="username" name="username"/>');
			//财政年度
			setHtml.push('      <input type="hidden" id="year" name="year"/>');
			//密码
			setHtml.push('      <input type="hidden" id="password" name="password"/>');
			//地区标识
			setHtml.push('      <input type="hidden" id="area" name="area"/>');
			setHtml.push('      <input type="hidden" id="area_name" name="area_name"/>');
			//用于控制菜单宽度
			setHtml.push('      <input type="hidden" id="screenwidth" name="screenwidth"/>');
			//主服务地址，用户控制退出系统操作
			setHtml.push('      <input type="hidden" id="mainUrl" name="mainUrl"/>');
			//CA认证信息
			setHtml.push('      <input type="hidden" id="signed_data" name="signed_data"/>');
			//CA认证随机数信息
			setHtml.push('      <input type="hidden" id="DSign_Content" name="DSign_Content"/>');
			//桂林ca特别标识
			setHtml.push('      <input type="hidden" id="glca" name="glca"/>');
			setHtml.push('      <input type="hidden" id="pk" name="pk"/>');
			setHtml.push('      <input type="hidden" id="Sign_value" name="Sign_value"/>');
			setHtml.push('</form>');
			
			//下载控件功能按钮
			setHtml.push('<div id="xzkj" style="z-index:10; position:absolute; top:0;right:10px; background-image:url(../portal/images/login/gl/gl_download.jpg); height:128px; width:128px; background-repeat:no-repeat; color:#FFF; font-size:14px; cursor:pointer;filter:alpha(opacity=100);-moz-opacity:0.8;line-height:128px;font-weight:bold;text-align:center;" onmouseover="mouseOvers()" onmouseout="mouseOut()" onclick="exe(\''+logininfo.controlURL+'\')">下载控件</div>');           
            //定义存储页面panel对象			   	     
			var retloginpanel = new Ext.Panel({
				id:"systemmain", 
				unstyled:true,
				bodyStyle:'border-width:0px',
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
            //修改开始 臧家妹    修改BUG39194 2012-2-15 点击回车键不能登录 
            if(logininfo.isportalca=="true"){
            	window.onload=function(){
            		//修改页面背景色
            		document.body.style.background="#00D3E8 url(/portal/images/login/gl/gl_bg.jpg) repeat-x left top";
				    refresh1();
                    guilinCheckOutDateTime();
            	}   
	        }else if(logininfo.isportalca=="false"){
	         	retloginpanel.on('afterlayout',function(panel,layout){			
				   onloadCook();
			    });
				window.onload=function(){
				    //修改页面背景色
					document.body.style.background="#00D3E8 url(/portal/images/login/gl/gl_bg.jpg) repeat-x left top";
	            }
	        }
            //修改结束 臧家妹 
            
			retloginpanel.on('afterlayout',function(panel,layout){					
					onloadCook();
			});
            
			DSign_Content = logininfo.DSign_Content;
		return retloginpanel;
	};				
	

/**
* 重庆使用
*/
   this.ifmisLogin28Show = function(servers,logininfo){		
	//登录服务地址
	Ext.lt.portal.component.login.server=servers;
	//设置登录后系统首页路径
		if(logininfo.url!=null){
			this.url=logininfo.url;
		}
		var fl=logininfo.IFMIS_FESTIVAL;
		var login_render = (function(){
		    var 
		        templ = {
		            skeleton: '<body class="body_bg"> #{0-notices} #{7-noticess}<div class="div_bg"> <div class="login_bg"> <form id="form1" method="POST" autocomplete="off"> <p style="height: 292px; *height: 292px !important; *height: 292px;"></p> <table width="800px" border="0"style="font-size: 14px; margin: auto;"> <tr> #{1-username_pwd} <td nowrap="nowrap" width="64px" align="right"> &nbsp; </td> <td nowrap="nowrap" align="left"> <select class="input_style_end" name="year"onclick="year2AreaSelect();"> #{2-options} </select> </td> </tr> <tr style="height: 40px; *height: 38px;"> <td style="color: #FF0000" colspan="6" id="errorMessage"> #{3-error_msgs} </td> </tr> #{4-login_button} </table> <input type="hidden" id="fontFile" name="fontFile"value="stylefontS.css"></input> </form> #{5-another_form} </div> <p style="font-size: 12px; color: #4e4b4b; text-align: center; width: 480px; line-height: 30px; height: 30px; margin: auto; margin-top: 80px;"> CopyRight 2013 重庆市 </p> </div> <div class="download" onmouseover="this.className=\'download_over\'"onmouseout="this.className=\'download\'"onclick="exe(\'#{6-plugin_url}\')"> 下载控件 </div> </body>',
		            username_pwd: '<td nowrap="nowrap" align="right" width="95px"> &nbsp; </td> <td nowrap="nowrap" width="160px" align="left" style="padding-left: 5px"><input type="text" class="input_style" name="username"/> </td> <td nowrap="nowrap" width="67px" align="right"> &nbsp; </td> <td nowrap="nowrap" width="155px" align="left"><input type="password" class="password_style" id="passwordvalue" name="passwordvalue" onkeyup="chongqingkeyup(this)" onkeydown="chongqing9PasswordCkeystop(event)" onkeypress="chongqing9Password(this)" onblur="chongqing9PasswordBlur(this)"  onpaste="return false" oncontextmenu="return false"/><input type="hidden" name="password" id="passwordval" value="" /></td>',
		            option: '<option value="#{0}">#{1}</option>',
		            login_button: '<tr> <td nowrap="nowrap" align="center" colspan="7"style="height: 50px;"> <input type="button" class="login_btn" onmouseover="this.className=\'login_over\'" onmouseout="this.className=\'login_btn\'" onclick="dologin()"></input> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <button class="reset_btn" onmouseover="this.className=\'reset_over\'"onmouseout="this.className=\'reset_btn\'" type="reset"></button> </td> </tr>',
		            pholder: ''
		        },
		        configMap = {
		            logininfo: null
		        };

		    // utils functions
		    /**
		     * 格式化字符串 '#{0}, {1-comment}'.format('a', 'b') -> 'a, b'
		     * @return {String}
		     */
		    String.prototype.format = function(){
		        var str = this;
		        for (var i = 0; i < arguments.length; i++) {
		            var t = arguments[i];
		            var r = new RegExp('#\\{'+i+'(-.*?)?\\}', 'g');
		            str = str.replace(r, t);
		        }
		        return str;
		    };

		    // 公告信息
		    var get_notices = function(){
		        var result;
		        if(configMap.logininfo.isbulletin && configMap.logininfo.postList.length > 0){
		           result = post(configMap.logininfo);
		        }
		        return result || '';
		    };
		    // 公告信息
		    var get_noticesleft = function(){
		        var result;
		        if(configMap.logininfo.otherList && configMap.logininfo.otherList.length > 0){
		           result = postLeft(configMap.logininfo);
		        }
		        return result || '';
		    };
		    
		    var get_userpwd = function(){
		        var result = '';
		        if (configMap.logininfo.isportalca == "false"){ //非ca登录(编辑用户名、密码)
		            result = templ.username_pwd;
		        }
		        return result;
		    };

		    var get_options = function(){
		        var info = configMap.logininfo;
		        var rs = [];
		        for (var i = 0; i < info.loginaCctyear.length; i++) {
		            rs.push(templ.option.format(info.loginaCctyear[i].all, info.loginaCctyear[i].acctmainbodyname));
		        }
		        return rs.join('');
		    };

		    var get_error_msgs = function(){
		    	return configMap.logininfo.errorMessage || '&nbsp;';
		    };

		    var get_login_buttons = function(){
		        return logininfo.isportalca=="false" ? templ.login_button : '';
		    };

		    var get_another_form = function(){
		        var h = [];
		        //多地区跳转用户登录信息存储表单对象
		        h.push('  <form id="multiAreaForm" name="multiAreaForm" method="post" action="">');
		        //用户编码
		        h.push('  <input type="hidden" id="username" name="username"/>');
		        //财政年度
		        h.push(' <input type="hidden" id="year" name="year"/>');
		        //密码
		        h.push(' <input type="hidden" id="password" name="password"/>');
		        //地区标识
		        h.push(' <input type="hidden" id="area" name="area"/>');
		        h.push(' <input type="hidden" id="area_name" name="area_name"/>');
		        //用于控制菜单宽度
		        h.push('<input type="hidden" id="screenwidth" name="screenwidth"/>');
		        //主服务地址，用户控制退出系统操作
		        h.push('  <input type="hidden" id="mainUrl" name="mainUrl"/>');
		        //CA认证信息
		        h.push('  <input type="hidden" id="signed_data" name="signed_data"/>');
		        //CA认证随机数信息
		        h.push(' <input type="hidden" id="DSign_Content" name="DSign_Content"/>');
		        h.push('</form></div>');

		        return h.join('');
		    };

		    var get_plugin_url = function(){
		        return configMap.logininfo.controlURL || '';
		    };

		    var get_rendered_template = function(){
		        return templ.skeleton.format(get_notices(), get_userpwd(), get_options(), 
		            get_error_msgs(), get_login_buttons(), get_another_form(), get_plugin_url(),get_noticesleft());
		    };

		    var init = function(logininfo){
		        configMap.logininfo = logininfo;
		    };

		    return {
		        init: init,
		        get_html_segment: get_rendered_template
		    };
		}());
		login_render.init(logininfo);
	   //定义存储页面panel对象
		var retloginpanel = new Ext.Panel({
			id:"systemmain", 
			bodyStyle:'border-width:0px',
			bodyStyle:'background:none',
			html:login_render.get_html_segment(),
			keys : {key : Ext.EventObject.ENTER,
				fn : function(btn, e) {
					dologin(28);
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
		retloginpanel.on('afterlayout',function(panel,layout){
				document.body.style.backgroundColor = "#f0f7ff";	
				onloadCook();
				//初始化多地区对象信息
				year2AreaSelect();
		});
		DSign_Content = logininfo.DSign_Content;
	return retloginpanel;
}; 

/**
* 甘肃使用
*/
   this.ifmisLogin29Show = function(servers,logininfo){		
	//登录服务地址
	Ext.lt.portal.component.login.server=servers;
	//设置登录后系统首页路径
		if(logininfo.url!=null){
			this.url=logininfo.url;
		}
		//登录页面内容存储数组
		var setHtml=[];
		var fl=logininfo.IFMIS_FESTIVAL;
		
		setHtml.push('<body style="width:100%;height:100%;margin:0;padding:0;text-align:center;background-color:#3d5db4;background-image:url(/portal/images/login/gslogin_/bodybg.jpg);background-repeat:repeat-x;background-position:left top;"><div id="login1" style="height:768px;width:100%;background-image:url(/portal/images/login/gslogin_/gsdlbj.jpg);background-position:center top;background-repeat:no-repeat;border-top:1px #FFF solid;">');
		
	    //如果使用公告并公告条不为0
		if(logininfo.isbulletin == true&&logininfo.postList.length > 0){
	       setHtml.push(post(logininfo));	
		}
	    
		setHtml.push('  <div class="login_bggs"><form id="form1" name="form1" autocomplete="off" method="post" action=""><p style="height:280px;*height:280px!important;*height:280px; "></p>');
		setHtml.push('    <table width="683" border="0" cellspacing="0" cellpadding="0" style ="font-size:16px;display:block;margin:auto;">');
		setHtml.push('  <tr style="height:31px;*height:26px;"></td></tr>    <tr style="height:38px;*height:38px;">');
		
        //非ca登录(编辑用户名、密码)
		if (logininfo.isportalca=="false") {
			setHtml.push(' <td nowrap="nowrap" width="70px" style=" font-weight:normal; padding-top:10px;" valign="top">用户名:</td>');
			setHtml.push(' <td nowrap="nowrap" width="160px"  align="left" valign="top" style="padding-top:7px;"><input class="input_stylegs" type="text" name="username"/></td>');
			setHtml.push(' <td nowrap="nowrap" width="75px" align="right" style=" font-weight:normal;padding-top:10px;" valign="top">密码：</td>');
			setHtml.push(' <td nowrap="nowrap" width="160px" align="left" valign="top" style="padding-top:7px;"><input class="password_stylegs"type="password" name="password"/></td>');
		}
		setHtml.push('<td nowrap="nowrap" align="left" width="25px" class="bbb">&nbsp;&nbsp;&nbsp;</td><td nowrap="nowrap" align="left" class="aaa">');
		setHtml.push('<button class="login_btngs" onmouseover="changeBg(this)" onmouseout="backBg(this)" onclick="dologin()"></button>');
		setHtml.push('&nbsp;&nbsp;<button class="reset_btngs" type="reset" onmouseover="changeBgs(this)" onmouseout="backBg(this)"></button>');
		
		//多数据源模式
		
			setHtml.push('&nbsp;&nbsp;&nbsp;<select style="display:none;"class="input_style_endgs" name="year" type="hidden" onclick="year2AreaSelect();">');
			for (var i = 0; i < logininfo.loginaCctyear.length; i++) {
				setHtml.push('<option value="' + logininfo.loginaCctyear[i].all + '">' + logininfo.loginaCctyear[i].acctmainbodyname + '</option>');
			}
			setHtml.push(' </select>');
		
		
		//多地区设置		
        if(logininfo.isArea=='1'){
          setHtml.push('<td width="9%" align="right" nowrap="nowrap" style="top_color;" ><font color="#ffffff">地区：</font></td>');
	      setHtml.push('<td width="15%" nowrap="nowrap">');
	      setHtml.push('<select name="area" id="area">');
	      setHtml.push('<option>1</option>');
	      setHtml.push('</select>');
	      setHtml.push('</td>');
        }
        
		//如果是CA认证，提供ca认证按钮
		if(logininfo.isportalca=="true"){
			setHtml.push('<td nowrap="nowrap" colspan="4">&nbsp;<input type="hidden" id="screenwidth" name="screenwidth">');
			setHtml.push('<input type="hidden" id="signed_data" name="signed_data"/>');
			setHtml.push(' <input type="button" style="	border: 0px;text-align: center;padding-top: 3px;width: 70px;height: 20px;background-image: url(../../images/buttons/login_button.gif);" value="认证" id="login_button" onclick="doDataProcess()"/>');
			setHtml.push('</td>');
		}
		
		//认证失败提示信息		
        
		setHtml.push('<tr style="height:35px;*height:30px;"><td colspan="6" >&nbsp;<font color="red" id="errorMessages">'+logininfo.errorMessage+'</font></td></tr>');
		
		
		//如果是非CA登录，则显示登陆按钮
//        if(logininfo.isportalca=="false"){
//            setHtml.push('<td nowrap="nowrap" align="left" class="aaa">'); 
//		    setHtml.push('<input type="button"  id ="btngs" class="login_btngs" onmouseover="mouseovergss();" onmouseout ="mouseoutgss();" onclick="dologin()"/> ');
//		    setHtml.push('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button id ="rtngs" class="reset_btngs" type="reset" onmouseover="mouseovergs();" onmouseout ="mouseoutgs();"></button>');
//			setHtml.push('</td></tr>');
//        }           
        setHtml.push('<input type="hidden" id="fontFile" name="fontFile" value="stylefontS.css"></input>');
       
		setHtml.push('</table></form>');
		//多地区跳转用户登录信息存储表单对象
		setHtml.push('  <form id="multiAreaForm" name="multiAreaForm" method="post" action="">');
		//用户编码
		setHtml.push('  <input type="hidden" id="username" name="username"/>');
		//财政年度
		setHtml.push(' <input type="hidden" id="year" name="year"/>');
		//密码
		setHtml.push(' <input type="hidden" id="password" name="password"/>');
		//地区标识
		setHtml.push(' <input type="hidden" id="area" name="area"/>');
		setHtml.push(' <input type="hidden" id="area_name" name="area_name"/>');
		//用于控制菜单宽度
		setHtml.push('<input type="hidden" id="screenwidth" name="screenwidth"/>');
		//主服务地址，用户控制退出系统操作
		setHtml.push('  <input type="hidden" id="mainUrl" name="mainUrl"/>');
		//CA认证信息
		setHtml.push('  <input type="hidden" id="signed_data" name="signed_data"/>');
		//CA认证随机数信息
		setHtml.push(' <input type="hidden" id="DSign_Content" name="DSign_Content"/>');
		setHtml.push('</form></div>');
		
		//版权控制  <p style="font-size:12px; color:#4e4b4b; text-align:center; width:480px; line-height:30px; height:30px; margin:auto; margin-top:80px;">CopyRight 2013 重庆市</p>
		
		setHtml.push('<div><p style="font-size:12px; color:#4e4b4b; text-align:center; width:480px; line-height:30px; height:30px; margin:auto; margin-top:6%; ">'+window.status+'</p></div>');

		setHtml.push('</div>');
		//下载空间功能按钮 
		setHtml.push('<div id="xzkj" class="downloadgs" onmouseover="mouseovergsss();" onmouseout ="mouseoutgsss();" onclick="exe(\''+logininfo.controlURL+'\')"></div></body>');		 
		
	   //定义存储页面panel对象
		var retloginpanel = new Ext.Panel({
			id:"systemmain", 
			bodyStyle:'border-width:0px',
			bodyStyle:'background:none',
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
		retloginpanel.on('afterlayout',function(panel,layout){
				document.body.style.backgroundColor = "#f0f7ff";	
				onloadCook();
				//初始化多地区对象信息
				year2AreaSelect();
		});
		DSign_Content = logininfo.DSign_Content;
	return retloginpanel;
}; 

/**
*页面对应编号为 30 使用地区：山西特殊登录认证使用
*/
this.ifmisLogin30Show = function(servers,logininfo){
	//登录服务地址
	Ext.lt.portal.component.login.server=servers;
        //设置登录后系统首页路径
		if(logininfo.url!=null){
			this.url=logininfo.url;
		}
		//登录页面内容存储数组
		var setHtml=[];
		var sxauthURL = logininfo.sxauthURL;
		var fl = logininfo.IFMIS_FESTIVAL;
		if(fl=="1" ||fl=="2" ||fl=="3"||fl=="5" ||fl=="6"){
			setHtml.push('<div id="flasho" style="background:url('+jrArr[fl]+');background-repeat:no-repeat; width:213px; height:113px;POSITION:absolute;overflow:hidden;z-index:10000;top:118px;margin-left:expression((document.body.clientWidth-469)/2-97);">');			  
			setHtml.push('</div>');
		}	
		//左侧信息框
		if(logininfo.otherList!=null&&logininfo.otherList.length>0){
			setHtml.push(postLeft(logininfo));
		}
		//公告
		//setHtml.push(post(logininfo));
	  if(logininfo.isbulletin == true&&logininfo.postList.length > 0){
	       setHtml.push(post(logininfo));	
		}
	    setHtml.push('<div style="border:1px #006EC3 solid; border-bottom:0;border-left:0;border-right:0;top:0;left:0;height:768px;width:100%;background-image:url(../../ifmis_images/login/20091110/div_bg_three.jpg);background-position:center center;background-repeat:no-repeat;">');
	    if(Sys.ie == '6.0') {//在IE6的情况下加  					    
			setHtml.push('<div style="border:1px #3170C0 dotted; border-bottom:0;border-left:0;border-right:0;background-image:url(../../ifmis_images/login/20091110/login_bg.jpg);background-position:center center;background-repeat:no-repeat;height:419px;width:99%;margin-top:128px;color:#185da2;font-weight:bold;font-size:14px;">');
		}else if(Sys.ie == '7.0') {//在IE6的情况下加  					    
			setHtml.push('<div style="border:1px #3170C0 dotted; border-bottom:0;border-left:0;border-right:0;background-image:url(../../ifmis_images/login/20091110/login_bg.jpg);background-position:center center;background-repeat:no-repeat;height:426px;width:99%;margin-top:128px;color:#185da2;font-weight:bold;font-size:14px;">');
		}else{
	    	setHtml.push('<div style="border:1px #3170C0 dotted; border-bottom:0;border-left:0;border-right:0;background-image:url(../../ifmis_images/login/20091110/login_bg.jpg);background-position:center center;background-repeat:no-repeat;height:349px;width:99%;margin-top:172px;color:#185da2;font-weight:bold;font-size:14px;">');
        }
       
	    //form1
		setHtml.push('<form id="form1" name="form1" autocomplete="off" method="post" action="/login.do">');	
		if(Sys.ie == '6.0'){ //在IE6的情况下加  					    
			  setHtml.push('<table id="ptdl"  width="469px" border="0"align="center" cellpadding="0" cellspacing="0" style="display:none; margin-top:245px;font-size:14px;">');
	    }else if(Sys.ie == '7.0'){ //在IE6的情况下加  					    
			  setHtml.push('<table id="ptdl"  width="469px" border="0"align="center" cellpadding="0" cellspacing="0" style="display:none; margin-top:239px;font-size:14px;">');
	    }else{
    	      setHtml.push('<table id="ptdl"  width="469px" border="0"align="center" cellpadding="0" cellspacing="0" style="display:none; margin-top:198px; font-size:14px;">');
    	}
		
    	setHtml.push('<tr width="380px" style="height: 24px;">');
        //非ca登录(编辑用户名、密码)
	    setHtml.push('<td nowrap="nowrap" align="left" height="44px">用户&nbsp;</td>');
		setHtml.push('<td nowrap="nowrap" align="left"><input type="text" name="username" style="height:16px;width:110px;padding-left:2px;line-height:16px;font-size:14px;background-color:none;"/></td>');
		setHtml.push('<td nowrap="nowrap" align="left" height="44px" >&nbsp;&nbsp;密码&nbsp;</td>');
		setHtml.push('<td nowrap="nowrap" align="left"><input type="password" id="passwordvalue" name="passwordvalue" style="height:16px;width:110px;padding-left:2px;line-height:16px;font-size:14px;background-color:none;" onkeyup="chongqingkeyup(this)" onkeydown="chongqing9PasswordCkeystop(event)" onkeypress="chongqing9Password(this)" onblur="chongqing9PasswordBlur(this)"  onpaste="return false" oncontextmenu="return false"/><input type="hidden" name="password" id="passwordval" value="" /></td>');

        //财政年度设置
		if(logininfo.isArea!='1'){
		    setHtml.push('<td nowrap="nowrap" align="left">&nbsp;年份&nbsp</td>');
		    setHtml.push('<td nowrap="nowrap" align="right" width="80px">');
		    setHtml.push('<select name="year" style="width:80px;">');
		    for (var i = 0; i < logininfo.loginaCctyear.length; i++) {
		       setHtml.push('<option value="' + logininfo.loginaCctyear[i].all + '">' + logininfo.loginaCctyear[i].acctmainbodyname + '</option>');
		    }
		    setHtml.push('</select></td>');
		    setHtml.push('</tr><tr style="line-height: 9px; height: 9px;">')
		    setHtml.push('<td nowrap="nowrap" align="left">&nbsp;</td> ');
		}
		setHtml.push('</tr>');
		
	    //财政名称设置
		if(logininfo.isArea=='1'){
			setHtml.push('<tr style="line-height: 25px; height: 25px;">')
			setHtml.push('<td nowrap="nowrap" width="100px" align="left" >年份</td>')
		    setHtml.push('<td nowrap="nowrap" align="left" > ');
		    setHtml.push('<select name="year" style="width: 117px;" onchange="year2AreaSelect();">');
		    for (var i = 0; i < logininfo.loginaCctyear.length; i++) {
		       setHtml.push('<option value="' + logininfo.loginaCctyear[i].all + '">' + logininfo.loginaCctyear[i].acctmainbodyname + '</option>');
		    }	
		    setHtml.push('</select></td>');
		    setHtml.push('<td nowrap="nowrap" align="left" width="100px">&nbsp;财政名称</td>');
		    setHtml.push('<td nowrap="nowrap" width="118px" align="left" >');
		    setHtml.push('<select name="area" style="width: 117px;" id="area">');
            setHtml.push('<option>1</option>');
		    setHtml.push('        </select>        </td>');			   
		}
        setHtml.push('</tr>')
        setHtml.push('<tr>');
        setHtml.push('<td colspan="6" nowrap="nowrap" align="center" >');
        setHtml.push('<button class="login_btn" value="登录" id="login_button" onclick="dologin()""></button>&nbsp;&nbsp;&nbsp;');
        setHtml.push('<button class="reset_btn" value="重置"  type="reset">	 </button>   ');
	    
	    //字体样式
	    setHtml.push('<input type="hidden" id="fontFile" name="fontFile" value="stylefontS.css"></input>');
	    setHtml.push('</td> </tr> ');
	    setHtml.push('<tr style="height: 18px;">');
	    setHtml.push('<td nowrap="nowrap" colspan="7" width="489px" align="center" valign="middle" nowrap="nowrap">&nbsp;');
	    setHtml.push('<input type="hidden" name="screenwidth" />');
	  	setHtml.push('<font color="red"  id="errorMessage">' + logininfo.errorMessage + '</font>');
	    setHtml.push('</td></tr></table></form>');
	    
	    //form2
	    setHtml.push('<form id="form2" name="form2" autocomplete="off" method="post" action="'+sxauthURL+'">');
        if(Sys.ie == '6.0'){ //在IE6的情况下加 					    
			 setHtml.push('<table id="cadl" width="30%" border="0" align="center" cellpadding="0" cellspacing="0" style="display:block;margin-top:243px;  font-size:14px;">');
	    }else if(Sys.ie == '7.0'){ //在IE6的情况下加 					    
			 setHtml.push('<table id="cadl" width="30%" border="0" align="center" cellpadding="0" cellspacing="0" style="display:block;margin-top:242px;  font-size:14px;">');
	    }else{
	         setHtml.push('<table id="cadl" width="30%" border="0" align="center" cellpadding="0" cellspacing="0" style="display:block;margin-top:200px;  font-size:14px;">');
	    }
	    setHtml.push('<tr style="height: 24px;">');
	    //集中登录地区选择
	    setHtml.push('<td nowrap="nowrap" align="right" height="44px" >年份&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>');
	    setHtml.push('<td nowrap="nowrap" align="left" >');
	    setHtml.push('<select name="year" style="width: 118px;" onchange="year2AreaSelect();">');
		for (var i = 0; i < logininfo.loginaCctyear.length; i++) {
		     setHtml.push('<option value="' + logininfo.loginaCctyear[i].all + '">' + logininfo.loginaCctyear[i].acctmainbodyname + '</option>');
		}	
		setHtml.push('</select>');
		setHtml.push('</td>');
	    if(logininfo.isArea=='1'){
	        setHtml.push('<td nowrap="nowrap" width="110px" align="center" >财政名称</td>');
	        setHtml.push('<td nowrap="nowrap" align="left" >');
	        setHtml.push('<select name="area" id="area1" style="width: 118px;">');
	        setHtml.push('<option>1</option>');
	        setHtml.push('</select></td>');
	    }
		setHtml.push('</tr>');
		// 集中登录地区结束
		setHtml.push('<tr style="font-size:0;height:7px">');
		setHtml.push('<td>&nbsp;</td></tr><tr>');
		setHtml.push('<td nowrap="nowrap" align="center" colspan="4">');
		setHtml.push('<input type="button" class="renzheng_btn" onclick="doLoginCa()"/>'); 
		setHtml.push('<input type="hidden" id="signed_data" name="signed_data" />'); 
		setHtml.push('&nbsp;&nbsp;&nbsp;');
		//setHtml.push('<input type="button" class="renzhengupdate_btn" onclick="caupdateUrl()"/>'); 
		//setHtml.push('<input type="hidden" id="signed_data" name="signed_data" />'); 
		setHtml.push('</td></tr>'); 
		setHtml.push('<tr style="height: 18px;">'); 
		setHtml.push('<td nowrap="nowrap" colspan="7" width="469px" align="center" valign="middle" nowrap="nowrap">&nbsp;'); 
		setHtml.push('<input type="hidden" name="screenwidth" />'); 
		//字体样式
		setHtml.push('<input type="hidden" id="fontFile" name="fontFile" value="stylefontS.css"></input>');
		setHtml.push('<font color="red"   id="caerrorMessage">' + logininfo.errorMessage + '</font>');
		setHtml.push('</td></tr></table></form>');
		
		//多地区跳转用户登录信息存储表单对象
		setHtml.push('  <form id="multiAreaForm" name="multiAreaForm" method="post" action="/login.do">');
		//用户编码
		setHtml.push('      <input type="hidden" id="username" name="username"/>');
		//财政年度
		setHtml.push('      <input type="hidden" id="year" name="year"/>');
		//密码
		setHtml.push('      <input type="hidden" id="password" name="password"/>');
		//地区标识
		setHtml.push('      <input type="hidden" id="area" name="area"/>');
		setHtml.push('      <input type="hidden" id="area_name" name="area_name"/>');
		//用于控制菜单宽度
		setHtml.push('      <input type="hidden" id="screenwidth" name="screenwidth"/>');
		//主服务地址，用户控制退出系统操作
		setHtml.push('      <input type="hidden" id="mainUrl" name="mainUrl"/>');
		//CA认证信息
		setHtml.push('      <input type="hidden" id="signed_data" name="signed_data"/>');
		//CA认证随机数信息
		setHtml.push('      <input type="hidden" id="DSign_Content" name="DSign_Content"/>');
		setHtml.push('</form>');
		
		setHtml.push(' <table width="469px" border="0" align="center" cellpadding="0" cellspacing="0">');
		setHtml.push('<tr style="height: 30px;">');
	    setHtml.push('<td nowrap="nowrap" align="center" colspan="7" valign="bottom"style="height: 26px;">');
	    setHtml.push('<div id="nomalandca" class="ca_style"><div class="choose_acc" onclick="jumpToCA9()">CA认证</div><div class="choose_acc" onclick="jumpToNomal9()">普通用户</div></div></td></tr></table></td></td>');
		setHtml.push('<p style="margin:auto;font-size:12px;margin-left:'+window.screen.width/4+'; margin-top:30px;color:#FFFFFF; text-align:right; width:480px; line-height:15px; height:15px;">'+window.status+'</p></div>');	   
	    //setHtml.push('<p style="margin:auto;font-size:12px;margin-left:'+window.screen.width/3+';margin-top:30px; color:#FFFFFF; text-align:right; width:480px; line-height:15px; height:15px;">Copyright (C) 2011 重庆财政局</p></div>');	    
        setHtml.push('</div>');
        	
		//下载控件功能按钮
		setHtml.push(downloadControl(logininfo));
		//定义存储页面panel对象			
		var retloginpanel = new Ext.Panel({
			id:"systemmain", 
			bodyStyle:'border:0',
			bodyStyle:'background:none',
			height:768,
			html:setHtml.join(''),
			keys : {key : Ext.EventObject.ENTER,
				fn : function(btn, e) {
					chongqing9PasswordBlur2();
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
		
	    window.onload=function(){
			//修改页面背景色
	    	document.body.style.background="#c1c1c1 url(/ifmis_images/login/20090930/body_bg.jpg) repeat-x left top";
        }
        
		retloginpanel.on('afterlayout',function(panel,layout){
				onloadCook();
				if(logininfo.logindefaulttype=="1"){
					jumpToNomal9();//0默认为ca ;1默认为用户登录 
				}else{
					jumpToCA9();
				}
				if(logininfo.errorMessage!=null&&logininfo.errorMessage.indexOf("用户名或密码错误")!=-1){
					jumpToNomal9();
				}else if(logininfo.errorMessage!=null&&(logininfo.errorMessage.indexOf("CA")!=-1||logininfo.errorMessage.indexOf("认证")!=-1)){
					jumpToCA9();
				}
		});
		DSign_Content = logininfo.DSign_Content;
	return retloginpanel;
};	
/**
*页面对应编号为 31 使用地区：山西特殊登录认证使用
*/
this.ifmisLogin31Show = function(servers,logininfo){
	//登录服务地址
	Ext.lt.portal.component.login.server=servers;
        //设置登录后系统首页路径
		if(logininfo.url!=null){
			this.url=logininfo.url;
		}
		//登录页面内容存储数组
		var setHtml=[];
		//左侧信息框
		//if(logininfo.otherList!=null&&logininfo.otherList.length>0){
			//setHtml.push(postLeft(logininfo));
		//}
		//公告
		//setHtml.push(post(logininfo));	
			if(logininfo.isbulletin == true&&logininfo.postList.length > 0){
	       setHtml.push(post(logininfo));	
			}
	    setHtml.push('<body id="loginId" style = "width:100%;height:100%;margin:0;padding:0;text-align:center;background-color:#bbbbbb;background-position:left top;"><div class="div_bg">');
	    setHtml.push('<div class="login_bg">');
	    setHtml.push('<p style="height:97px;*height:97px!important;*height:97px; "></p>');
	    setHtml.push('<table border="0" cellpadding="0" cellspacing="0" width="923" style="margin:auto;">');
	    setHtml.push('<tr style="height:48px;*height:48px;">');
	    setHtml.push('<td nowrap="nowrap" width="653px">&nbsp;</td>');
	    setHtml.push('<td nowrap="nowrap" align="left"><button class="calogin" title="CA登录" onclick="turnToCaLogin();"></button></td>');
	    setHtml.push('</tr>');
	    setHtml.push('<tr style="height:43px;*height:43px;">');
	    setHtml.push('<td colspan="">&nbsp;</td>');
	    setHtml.push('<td>&nbsp;</td>');
	    setHtml.push('</tr>');
	    setHtml.push('<tr style="height:28px;*height:28px;">');
	    setHtml.push('<td colspan="">&nbsp;</td>');
	    setHtml.push('<td align="left"><button class="nomallogin" title="普通登录" onclick="turnToNormalLogin();"></button></td>');
	    setHtml.push('</tr>');
	    setHtml.push('</table>');
		setHtml.push('</div>');  
		setHtml.push('<p style="font-size:12px; font-family:Arial, Helvetica, sans-serif; color:#555555; text-align:center; width:480px; line-height:24px; height:24px; margin:auto; margin-top:0px;">版权所有 山西省财政厅信息网络中心</p>');  
		setHtml.push('</div></body>');  
		//下载控件功能按钮
		//setHtml.push(downloadControl(logininfo));
		//定义存储页面panel对象			
		var retloginpanel = new Ext.Panel({
			id:"loginId", 
			bodyStyle:'border:0',
			bodyStyle:'background-image:url(portal/images/login/shanxi/loginbg.jpg);background-repeat:repeat-x;',
			height:768,
			html:setHtml.join(''),
			keys : {key : Ext.EventObject.ENTER,
				fn : function(btn, e) {
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
		retloginpanel.on('afterlayout',function(panel,layout){
		});
		DSign_Content = logininfo.DSign_Content;
	return retloginpanel;
};	
}

function turnToCaLogin(){
	var logininfo = Ext.lt.portal.component.login.logininfo;
	var setHtml=[];	 
	var sxauthURL = logininfo.sxauthURL;
    setHtml.push('<div class="div_bg_lg">');
    setHtml.push('<div class="login_bg">');
    setHtml.push('<p style="height:80px;"></p>');
    setHtml.push('<form id="form2" name="form2" autocomplete="off" method="post" action="'+sxauthURL+'"><table border="0" cellpadding="0" cellspacing="0" width="923" style="margin:auto;">');
    setHtml.push('<tr><td nowrap="nowrap" width="580px">&nbsp;</td>');
    setHtml.push('<td nowrap="nowrap" align="left">');
    setHtml.push('<table border="0" cellpadding="0" cellspacing="0"><tr style="height:18px"><td>&nbsp;</td><td>&nbsp;</td></tr>');
    setHtml.push('<tr height="34px"><td class="logonfonts">&nbsp;</td><td>&nbsp;</td></tr>');
    setHtml.push('<tr height="34px"><td class="logonfonts">年&nbsp;份</td><td>');
    setHtml.push('<select name="year" class="slctyear" onchange="year2AreaSelect();">');
    for (var i = 0; i < logininfo.loginaCctyear.length; i++) {
       setHtml.push('<option value="' + logininfo.loginaCctyear[i].all + '">' + logininfo.loginaCctyear[i].acctmainbodyname + '</option>');
    }	
    setHtml.push('</select>');
    setHtml.push('<tr height="34px"><td class="logonfonts">&nbsp;</td><td>&nbsp;</td></tr>');    
    setHtml.push('<tr height="10px" style="font-size:10px;">');
    setHtml.push('<td>&nbsp;</td></tr>');
    setHtml.push('<tr style="height:40px;">');
    setHtml.push('<td class="errorinfoarea" colspan="2"><font color="red"   id="caerrorMessage">' + logininfo.errorMessage + '</font></td>');
    setHtml.push('<td>&nbsp;</td>');
    setHtml.push('</tr>');
    setHtml.push('<tr><td></td>');
    setHtml.push('<td align="right" style="padding-right:40px;"><button class="login_btnsxca" title="登录" onclick="doLoginCaSx();">登&nbsp;录</button></td>');
    setHtml.push('</tr>');
    setHtml.push('</table></td></tr></table></form></div>');
    setHtml.push('<p style="font-size:12px; font-family:Arial, Helvetica, sans-serif; color:#555555; text-align:center; width:480px; line-height:24px; height:24px; margin:auto; margin-top:50px;">版权所有 山西省财政厅信息网络中心</p>');
    setHtml.push('</div>');
	document.body.innerHTML = setHtml.join('');
	document.body.style.cssText="background-image:url(portal/images/login/shanxi/loginbg.jpg);background-repeat:repeat-x;";
	onloadCooksx();
	document.onkeydown = function() {
        if (event.keyCode == 13) { 
        	event.keyCode = 0;   
        	doLoginCaSx();       
        }
	}
}
function turnToNormalLogin(){
	var logininfo = Ext.lt.portal.component.login.logininfo;
	var setHtml=[];
	setHtml.push('<div class="div_bg_lg"><div class="login_bg"><p style="height:80px;"></p>');
	setHtml.push('<form id="form1" name="form1" autocomplete="off" method="post" action="/login.do">');
	setHtml.push('<table border="0" cellpadding="0" cellspacing="0" width="923" style="margin:auto;">');
	setHtml.push('<tr><td nowrap="nowrap" width="580px">&nbsp;</td><td nowrap="nowrap" align="left">');
	setHtml.push('<table border="0" cellpadding="0" cellspacing="0">');
	setHtml.push('<tr style="height:18px">');
	setHtml.push('<td>&nbsp;</td><td>&nbsp;</td></tr>');
	setHtml.push('<tr height="34px">');
	setHtml.push('<td class="logonfontsxnormal">用&nbsp;户</td>');
	setHtml.push('<td><input type="text" name="username" class="input_style"/></td>');
	setHtml.push('</tr><tr height="34px"><td class="logonfontsxnormal">密&nbsp;码</td>');
	setHtml.push('<td><input type="password" id="password" name="password" class="password_style"/></td>');
	setHtml.push('</tr><tr height="34px">');
	setHtml.push('<td class="logonfontsxnormal">年&nbsp;份</td><td>');
	
	setHtml.push('<select name="year" class="slctyear" onchange="year2AreaSelect();">');
	for (var i = 0; i < logininfo.loginaCctyear.length; i++) {
		setHtml.push('<option value="' + logininfo.loginaCctyear[i].all + '">' + logininfo.loginaCctyear[i].acctmainbodyname + '</option>');
	}	
	setHtml.push('</select>');
	setHtml.push('</td></tr><tr height="10px" style="font-size:10px;">');
	setHtml.push('<td>&nbsp;</td></tr>');
	setHtml.push('<tr style="height:40px;">');
	var mes = logininfo.errorMessage;
	setHtml.push('<td class="errorinfoarea" colspan="3" id="errorMessage">' + mes + '</td>');
	setHtml.push('<td>&nbsp;</td></tr><tr><td></td>');
	setHtml.push('<td align="right" style="padding-right:40px;"><button class="login_btnsxnormal" title="登录"  onclick="dologin(31);">登&nbsp;录</button><button class="reset_btnsxnormal" title="重置" type="reset">重&nbsp;置</button></td>');
	setHtml.push('</tr></table></td></tr></table></form></div>');
	setHtml.push('<p style="font-size:12px; font-family:Arial, Helvetica, sans-serif; color:#555555; text-align:center; width:480px; line-height:24px; height:24px; margin:auto; margin-top:50px;">版权所有 山西省财政厅信息网络中心</p>');
	setHtml.push('</div>');
	document.body.innerHTML = setHtml.join('');
	document.body.style.cssText="background-image:url(portal/images/login/shanxi/loginbg.jpg);background-repeat:repeat-x;";
	onloadCooksx();
	document.onkeydown = function() {
        if (event.keyCode == 13) { 
        	event.keyCode = 0; 
        	dologin(31) ;       
        }
	}
}
function doLoginCa(){
	var year = document.forms[1].year.value;
	if(year.split(";").length>0){
		year = year.split(";")[0];
	}
	var form=document.forms[1];
	var act = form.action;
	act = act +"?zt="+year+"&model=ssl";	
	form.action = act;
	form.submit();
}
function doLoginCaSx(){
	var year = document.forms[0].year.value;
	if(year.split(";").length>0){
		year = year.split(";")[0];
	}
	var form=document.forms[0];
	var act = form.action;
	act = act +"?zt="+year+"&model=ssl";
	//var act = "/sxcalogin.do";
	form.action = act;
	form.submit();
}
/**
* 初始化屏幕宽度及字体大小设置
*/
function login_init() {
    //屏幕宽度
	para_login.screenwidth = String(window.screen.width);
	//获取字体大小设置信息
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
/**
* 认证更新
*/
function caupdateUrl(){
	
	Ext.lt.RCPConsole.processcall(Ext.lt.portal.component.login.server, "getCaupdateUrl", {} , function (resp) {
		if(resp.error){
			alert(resp.error);
			return;
		}
		else{
			//https://10.88.2.127:7443
			window.open(resp.url, "_blank", "");		
		}
	});
}
/**
* 根据原文和证书产生认证数据包（处理CA登录）
*/
function doDataProcess() {
	try{
	if(ukeycheck&&"1"==_indexjp){
		//if(document.getElementById("ocxukey")!=null&&document.getElementById("ocxukey").object==null)
		if(ocxukey!=null&&!("MOF_WaitForDeviceEvent" in ocxukey)){
			if(window.confirm("系统UKEY插件已升级，请确认安装！")){
				window.location.replace(_ROOT_PATH_+"/common/xm/ifmis_plugins.exe");
				return;
			}
		}
	}
	}catch(e){}
	
	//登录前先清空之前的错误的信息
	var errorMsgObj = document.getElementById("errorMessage");
	if(errorMsgObj!=null){
		errorMsgObj.innerHTML="";
	}
    //表单对象
    var form=document.forms[0];
    if(document.form2!=undefined){
	    form=document.form2;
    }
    //ca登录返回错误信息（页面9、10）
    var caerrmsg=document.getElementById("caerrorMessage");
	var DSign_Subject = "";
	if (DSign_Content == "") {
		alert("原文不能为空，请输入原文!");
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
			//CA认证信息
			if(temp_DSign_Result==null||temp_DSign_Result==""){
				document.getElementById("errorMessage").innerHTML = "根据原文和证书产生认证数据包失败";
				if(caerrmsg!=undefined&&caerrmsg!=null){
					caerrmsg.innerHTML = "根据原文和证书产生认证数据包失败";
				}
				return;
			}
			para_login.signed_data = temp_DSign_Result;
			//CA随机数
			para_login.DSign_Content = DSign_Content;
			//获取年度及地区财政信息
			if (form.year != null) {
				para_login.year = form.year.value;
			} else {
				para_login.loginacctyear = form.loginacctyear.value;
				para_login.logingovid = form.logingovid.value;
			}
			//多地区跳转信息 
	        if(form.area!=null){
		        para_login.area = form.area.value;
		        for(var z=0;z<form.area.length;z++){
					if(form.area[z].selected==true)
						para_login.area_name = form.area[z].text;
			    }	
	        }
	        if(form.netname!=null){
	    		para_login.netname = form.netname.value;
	    		if(para_login.netname==""){
	    			alert("请配置网络类型!");
	    			return false;
	    		}
	    	}
		}
	}
	//处理CA登录
	Ext.lt.RCPConsole.processcall(Ext.lt.portal.component.login.server, "calogin", para_login , function (resp) {
		if (resp.errorMessage=="true") {
			window.location.href = _ROOT_PATH_ + "/defaultcommon.page";
		//多地区跳转
		}else if (resp.httpUrl != null){
		    var multiAreaForm = document.getElementById("multiAreaForm");
		    //表单提交地址
		    multiAreaForm.action = resp.httpUrl;
	        //地区标识 
	        if(form.area!=null){
		        multiAreaForm.area.value = form.area.value;
		        for(var z=0;z<form.area.length;z++){
					if(form.area[z].selected==true)
					multiAreaForm.area_name.value = form.area[z].text;
				}	
	        }
			//财政年度
			//宁夏，如果多地区跳转没有配置年度则使用主服务选中年度
			if (resp.year != null){
			    multiAreaForm.year.value = resp.year;
			}else {
			    multiAreaForm.year.value = form.year.value;
			}
			//CA认证信息
			multiAreaForm.signed_data.value = temp_DSign_Result;
			//CA认证随机数信息
			multiAreaForm.DSign_Content.value = DSign_Content;
			//用于控制菜单宽度
			multiAreaForm.screenwidth.value = window.screen.width;
			//当前服务地址，用户推迟系统操作
			multiAreaForm.mainUrl.value = resp.mainUrl;
			if(resp.areaInfo!=null){
				var newElement = document.createElement("input");
			    newElement.setAttribute("name","areaInfo");
			    newElement.setAttribute("type","hidden");
			    newElement.setAttribute("value",resp.areaInfo);
			    multiAreaForm.appendChild(newElement);
			}
			/*
			//跳转前先验证要跳转的服务地址是否可用
			Ext.lt.RCP.call(Ext.lt.portal.component.login.server, "checkUrl",  resp.httpUrl, function (backvalue) {
					if(backvalue==true){
					    //提交表单
			                  multiAreaForm.submit();	
		   			 }else{
		    			document.getElementById("errorMessage").innerHTML = "服务地址:"+resp.httpUrl+"不可用";
		    			if(caerrmsg!=undefined&&caerrmsg!=null){
							caerrmsg.innerHTML = "服务地址:"+resp.httpUrl+"不可用";
						}
						form.password.value = "";
		   			 }
		    });
		    */
			//提交表单
			multiAreaForm.submit();
		//如果是授权用户，则跳转到授权登录页面
		}else if(resp.errorMessage == "shouquan"){
			window.location.href = _ROOT_PATH_ + "/portal/portal2/login/accuser.jsp";
			//document.getElementById("msg").innerText = resp;
			//form.password.value = "";
		//如果登录失败，则给出提示信息
		 }else {
			 if(caerrmsg!=undefined&&caerrmsg!=null){
				 caerrmsg.innerHTML = resp.errorMessage;
			 }else{
				 //如果ca登录失败并且是9或10的多页签方式，就不在普通登录页签显示错误信息
				 document.getElementById("errorMessage").innerHTML = resp.errorMessage;
			 }
		 }
	});
}

function dologin_cyca() {
  
	//记录登录的用户名和密码到cookie中
	writecookie();
    //表单对象
	var form=document.forms[0];
	//用户名
	para_login.name = form.username.value;
	//密码
	para_login.password = form.password.value;
		//area   form.area.value只取到areadto的id 而不是name
	if(form.area!=null){
		para_login.area = form.area.value;
		for(var z=0;z<form.area.length;z++){
			if(form.area[z].selected==true)
				para_login.area_name = form.area[z].text;
		}	
	}
	//财政年度
	if (form.year != null) {
		para_login.year = form.year.value;
	} else {
		para_login.loginacctyear = form.loginacctyear.value;
		para_login.logingovid = form.logingovid.value;
	}

	//处理登录请求	
	Ext.lt.RCP.call(Ext.lt.portal.component.login.server, "cycalogin",  para_login, function (resp) {
		if (resp.errorMessage=="true") {
			//window.location.href = Ext.lt.portal.component.login.url;//"./default.page";
			form.password.value = "";
			window.location.href = _ROOT_PATH_ + "/defaultcommon.page";
		//如果为多地区跳转
		}else if (resp.httpUrl != null){
		
		      var multiAreaForm = document.getElementById("multiAreaForm");
		      //表单提交地址
		      multiAreaForm.action = resp.httpUrl;
		      //用户编码
		      multiAreaForm.username.value = form.username.value;
		      //密码
	          multiAreaForm.password.value = form.password.value;
	        //地区标识 
	        if(form.area!=null){
		          multiAreaForm.area.value = form.area.value;
		          for(var z=0;z<form.area.length;z++){
					if(form.area[z].selected==true)
					multiAreaForm.area_name.value = form.area[z].text;
				  }	
	         }
					//财政年度
			if (form.year != null) {
				multiAreaForm.year.value = resp.year;
				//宁夏，如果多地区跳转没有配置年度则使用主服务选中年度
				if(resp.year == null){
					multiAreaForm.year.value = form.year.value;
				}
			}
				//用于控制菜单宽度
			multiAreaForm.screenwidth.value = window.screen.width;
				//当前服务地址，用户推迟系统操作
			multiAreaForm.mainUrl.value = resp.mainUrl;
				//验证多地区跳转用户名密码是否正确
				//定义登录验证参数对象
			var para_login_temp = new Object();
			para_login_temp.name = form.username.value;
			para_login_temp.password = form.password.value;
				//财政年度
				if (form.year != null) {
						para_login_temp.year = encodeURI(encodeURI(resp.year));
						//宁夏，如果多地区跳转没有配置年度则使用主服务选中年度
						if(resp.year == null){
						    para_login_temp.year = encodeURI(encodeURI(form.year.value));
						}
				}
			  //跳转前先验证要跳转的服务地址是否可用
			   Ext.lt.RCP.call(Ext.lt.portal.component.login.server, "checkUrl",  resp.httpUrl, function (backvalue) {
					if(backvalue==true){
						//提交表单
		   				multiAreaForm.submit();
		   			 }else{
		    			document.getElementById("errorMessage").innerHTML = "服务地址:"+resp.httpUrl+"不可用";
		    			if(caerrmsg!=undefined&&caerrmsg!=null){
							caerrmsg.innerHTML = "服务地址:"+resp.httpUrl+"不可用";
						}
						form.password.value = "";
		   			 }
		    });
		//授权登录
		}else if(resp.errorMessage == "shouquan"){
			window.location.href = _ROOT_PATH_ + "/portal/portal2/login/accuser.jsp";
			//document.getElementById("msg").innerText = resp;
			form.password.value = "";
		//如果登录失败给出提示信息
		}else{
		    document.getElementById("errorMessage").innerHTML = resp.errorMessage;
		    form.password.value = "";
		}
	});

}
//-----------------------------------
/**
* 处理登录请求
*/

function dologin(str) {
	//登录前先清空之前的错误的信息
	var errorMsgObj = document.getElementById("errorMessage");
	if(errorMsgObj!=null){
		errorMsgObj.innerHTML="";
	}
	//记录登录的用户名和密码到cookie中
	writecookie();
    //表单对象
	var form=document.forms[0];
	//用户名
	para_login.name = form.username.value;
	//密码
	para_login.password = form.password.value;
	if(str==28){
		para_login.password = document.getElementById("passwordvalue").value.replace(/(^\s*@)|(\s*@)/g, "");
	}
		//area   form.area.value只取到areadto的id 而不是name
	if(form.area!=null){
		para_login.area = form.area.value;
		for(var z=0;z<form.area.length;z++){
			if(form.area[z].selected==true)
				para_login.area_name = form.area[z].text;
		}	
	}
	//财政年度
	if (form.year != null) {
		para_login.year = form.year.value;
	} else {
		para_login.loginacctyear = form.loginacctyear.value;
		para_login.logingovid = form.logingovid.value;
	}
	if(form.netname!=null){
		para_login.netname = form.netname.value;
		if(para_login.netname==""){
			alert("请配置网络类型!");
			return false;
		}
	}
	//处理登录请求	
	Ext.lt.RCP.call(Ext.lt.portal.component.login.server, "login",  para_login, function (resp) {
		if (resp.errorMessage=="true") {
			form.password.value = "";
			//window.location.href = _ROOT_PATH_ + "/fdms/index.do?mainmenu=84100000";
			window.location.href = _ROOT_PATH_ + "/bba/index.do?mainmenu=9000000";
		//如果为多地区跳转
		}else if (resp.httpUrl != null){
		      var multiAreaForm = document.getElementById("multiAreaForm");
		      //表单提交地址
		      multiAreaForm.action = resp.httpUrl;
		      //用户编码
		      multiAreaForm.username.value = form.username.value;
		      //密码
	          multiAreaForm.password.value = form.password.value;
	        //地区标识 
	        if(form.area!=null){
		          multiAreaForm.area.value = form.area.value;
		          for(var z=0;z<form.area.length;z++){
					if(form.area[z].selected==true)
					multiAreaForm.area_name.value = form.area[z].text;
				  }	
	        }
					//财政年度
					if (form.year != null) {
						  multiAreaForm.year.value = resp.year;
						  //宁夏，如果多地区跳转没有配置年度则使用主服务选中年度
						  if(resp.year == null){
						      multiAreaForm.year.value = form.year.value;
						  }
					}
					//用于控制菜单宽度
					multiAreaForm.screenwidth.value = window.screen.width;
					//当前服务地址，用户退出系统操作
					multiAreaForm.mainUrl.value = resp.mainUrl;
					//验证多地区跳转用户名密码是否正确
					//定义登录验证参数对象
					var para_login_temp = new Object();
					para_login_temp.name = form.username.value;
					para_login_temp.password = form.password.value;
					//财政年度
					if (form.year != null) {
						  para_login_temp.year = encodeURI(encodeURI(resp.year));
						  //宁夏，如果多地区跳转没有配置年度则使用主服务选中年度
						  if(resp.year == null){
						      para_login_temp.year = encodeURI(encodeURI(form.year.value));
						  }
					}
					if(resp.areaInfo!=null){
						var newElement = document.createElement("input");
					    newElement.setAttribute("name","areaInfo");
					    newElement.setAttribute("type","hidden");
					    newElement.setAttribute("value",resp.areaInfo);
					    multiAreaForm.appendChild(newElement);
					}
				//跳转前先验证要跳转的服务地址是否可用
			  if(_indexjp == "9"){							
						//远程访问多地区跳转服务验证是否能够能录
					   Ext.lt.RCP.script(resp.httpUrl, "defaultcommonloginservice", "login", para_login_temp, function (resp){
							    //如果登录成功（包括授权用户）
							    if(resp.errorMessage=="true"||resp.errorMessage == "shouquan"){
							        //提交表单
						            multiAreaForm.submit();
						        //如果登录失败
							    }else{
							        document.getElementById("errorMessage").innerHTML = resp.errorMessage;
				                    form.password.value = "";
							    }
						});						
					
				}else{
					   Ext.lt.RCP.call(Ext.lt.portal.component.login.server, "checkUrl",  resp.httpUrl, function (backvalue) {
						if(backvalue==true){
						    //远程访问多地区跳转服务验证是否能够能录
							Ext.lt.RCP.script(resp.httpUrl, "defaultcommonloginservice", "login", para_login_temp, function (resp){
							    //如果登录成功（包括授权用户）
							    if(resp.errorMessage=="true"||resp.errorMessage == "shouquan"){
							        //提交表单
						            multiAreaForm.submit();
						        //如果登录失败
							    }else{
							        document.getElementById("errorMessage").innerHTML = resp.errorMessage;
				                    form.password.value = "";
							    }
							});
						}else{
							document.getElementById("errorMessage").innerHTML = "服务地址:"+resp.httpUrl+"不可用";
							form.password.value = "";
						}
					});
				 }
					
		//授权登录
		}else if(resp.errorMessage == "shouquan"){
			window.location.href = _ROOT_PATH_ + "/portal/portal2/login/accuser.jsp";
			//document.getElementById("msg").innerText = resp;
			form.password.value = "";
		//如果登录失败给出提示信息
		}else{
			var mes = resp.errorMessage;
			if(str==31){
				mes="您输入的用户名或密码错误,请重新输入!";
			}
		    document.getElementById("errorMessage").innerHTML = mes;
		    form.password.value = "";
		}
	});

}
	function dologin8() {
		var para_login = new Object();
		var form=document.forms[0];
		para_login.name = form.username.value;
		para_login.password = form.password.value;
		if (form.year != null) {
			para_login.year = form.year.value;
		} else {
			para_login.loginacctyear = form.loginacctyear.value;
			para_login.logingovid = form.logingovid.value;
		}
		Ext.lt.RCP.server('defaultloginservice', "login",  para_login, function (resp) {
			if (resp=="true") {
				window.location.href = "./login/default.page";
				form.password.value = "";
				//window.location.href = "./default.page";
			} else {
				document.getElementById("msg").innerText = resp;
				form.password.value = "";
			}
		},function(){
							alert("失败!");
						});
		
	}

/**
* 关闭公告  
*/
function closeGonggao(){
document.getElementById("gonggao_div").style.display = "none";
}
function preview(id){
	//para_login.id = id;
  	//Ext.lt.RCP.call(Ext.lt.portal.component.login.server, "preview",  para_login, function (resp) {
  	//		if(resp=="true"){
  	//			document.getElementById(id).style.display="none";
  	//		}else{
  	//			document.getElementById(id).style.display="block";
  	//		}	
    //},function(){});
		var url = "/portal/portlets/post/post_preview.jsp?id="+id;
   		window.open(url,'window',"Height=700,Width=600px,scrollbars=yes,status=no,resizable=0;");  
}
/**
* 用户跳转 7 重庆  开始
*/
function jumpToNomal(){
	document.getElementById("nomalandca").style.background = "url(../images/login/chooseaccttype1.jpg)"; 
	document.getElementById("ptyh").style.color = "#FFF"; 
	document.getElementById("cayh").style.color = "#555"; 
	document.getElementById("ptdl").style.display = "block"; 
	document.getElementById("cadl").style.display = "none"; 
}
function jumpToCA(){
	document.getElementById("nomalandca").style.background = "url(../images/login/chooseaccttype.jpg)"; 
	document.getElementById("cayh").style.color = "#FFF"; 
	document.getElementById("ptyh").style.color = "#555"; 
	document.getElementById("ptdl").style.display = "none"; 
	document.getElementById("cadl").style.display = "block"; 
}
/** 下载控件开始 */
// 1.6下载控件
function mouseOver(){	
document.getElementById("xzkj").style.color='blue';
document.getElementById("xzkj").style.filter='alpha(opacity=80)';
document.getElementById("xzkj").style.textDecoration='underline';
}
// 4、10、11、13、14
function mouseOvers(){	
document.getElementById("xzkj").style.filter='alpha(opacity=80)';
}
function mouseOut(){
document.getElementById("xzkj").style.color='#fff';
document.getElementById("xzkj").style.filter='alpha(opacity=100)';
document.getElementById("xzkj").style.textDecoration='none';
}
function jdmouseOvers(){	
document.getElementById("jdxzkj").style.filter='alpha(opacity=80)';
}
function jdmouseOut(){
document.getElementById("jdxzkj").style.color='#fff';
document.getElementById("jdxzkj").style.filter='alpha(opacity=100)';
document.getElementById("jdxzkj").style.textDecoration='none';
}

function mouseoverssss(){
	document.getElementById("xzkj").className='download_over';
}
function mouseoutssss(){
	document.getElementById("xzkj").className='download';
}
function mouseoversss(){
	document.getElementById("btns").className='login_overss';
}
function mouseoutsss(){
	document.getElementById("btns").className='login_btnss';
}
function mouseoverss(){
	document.getElementById("rtns").className='reset_overss';
}
function mouseoutss(){
	document.getElementById("rtns").className='reset_btnss';
}

function mouseovergsss(){
	document.getElementById("xzkj").className='download_overgs';
}
function mouseoutgsss(){
	document.getElementById("xzkj").className='downloadgs';
}

function changeBg(obj){
	 var pn = obj.parentNode;
	 pn.className = "login_overgs";
}
function changeBgs(obj){
	 var pn = obj.parentNode;
	 pn.className = "reset_overgs";
}
function backBg(obj){
	 var pn = obj.parentNode;
	 pn.className = "z";
}
function exe(controlURL){
	if(controlURL!=null && controlURL !=""){
		window.location.replace(controlURL);
	}else{
		window.location.replace( "/common/ifmis_plugins.exe ");
	}
  //response.setContentType( "/common/ifmis_plugins.exe "); 
  

}
/** 下载控件开始 */

/**  用户跳转 7 重庆 结束 */
function MSG8(){      	
var msg = document.forms[0].msg.value;
      			if(msg!=null){
      				alert(msg);
      				window.close();
      			}
}
/**  用户跳转 10 福建 开始 */
function jumpToNomal9(){
	document.getElementById("nomalandca").className = "nomal_style"; 
	document.getElementById("ptdl").style.display = "block"; 
	document.getElementById("cadl").style.display = "none"; 
	year2AreaSelect();
}
function jumpToCA9(){
	document.getElementById("nomalandca").className = "ca_style";
	document.getElementById("ptdl").style.display = "none"; 
	document.getElementById("cadl").style.display = "block"; 
	year2AreaSelect();
}
function jumpToNomalJR9(){
	document.getElementById("nomalandca").style.backgroundImage = "url(/portal/images/login/jr/2012/nomal_login.gif)"; 
	document.getElementById("ptdl").style.display = "block"; 
	document.getElementById("cadl").style.display = "none"; 
	year2AreaSelect();
}
function jumpToCAJR9(){
	document.getElementById("nomalandca").style.backgroundImage = "url(/portal/images/login/jr/2012/ca_login.gif)"; 
	document.getElementById("ptdl").style.display = "none"; 
	document.getElementById("cadl").style.display = "block"; 
	year2AreaSelect();
}
/**  用户跳转 10 福建 结束*/

/**  页面11 郴州 开始 */
function jumpToNomal11(){
	document.getElementById("nomalandca").className = "nomalchange_style"; 
	document.getElementById("ptdl").style.display = "block"; 
	document.getElementById("cadl").style.display = "none"; 
	year2AreaSelect();
}
function jumpToCA11(){
	document.getElementById("nomalandca").className = "cachange_style";
	document.getElementById("ptdl").style.display = "none"; 
	document.getElementById("cadl").style.display = "block"; 
	year2AreaSelect();
}
/**  页面11 郴州 end */

//取当前年度还是cookie
function onIsShowLoginCurYear(){
	var myDate = new Date(); 
	var curyear =myDate.getFullYear();
	var objSelect = document.getElementsByName("year")[0];
	for (var i = 0; i < objSelect.options.length; i++) {  
      if (objSelect.options[i].value.indexOf(curyear)>=0) {
          objSelect[i].selected = true ;     
          break; 
      }
  } 
}

/** 读取cookie中的用户名以及年度到登录页面*/
function onloadCook(){
		onLd();
		year2AreaSelect();
		var cook=document.cookie;
		if(cook.indexOf('loginname')!=-1){
			if(cook.split('loginname=')[1]!='undefined'&&cook.split('loginname=')[1]!=null){
				if(document.forms[0].username!=null){
					document.forms[0].username.value=cook.split('loginname=')[1].split(';')[0];
				}
			}
		}
		if(document.forms[0].netname!=null){
			if(cook.indexOf('loginnetname')!=-1){
				if(cook.split('loginnetname=')[1]!='undefined'&&cook.split('loginnetname=')[1]!=null){
						document.forms[0].netname.value=cook.split('loginnetname=')[1].split(';')[0];
				}
			}
		}
 	//使用多地区
		if(document.forms[0].area!=null){
				if(cook.indexOf('loginyear')!=-1){
						var index=parseInt(cook.split('loginyear=')[1].split(';')[0]);
						//document.forms[0].year.getElementsByTagName('option')[index].selected=true;
						document.getElementsByName("year")[0].value=document.forms[0].year.getElementsByTagName('option')[index].value;
					 	year2AreaSelect();
						if(cook.indexOf('loginarea')!=-1){
							var index=cook.split('loginarea=')[1].split(';')[0];
							var temp = index.split(',')[0];//cookie记录的年度
							var areaid = index.split(',')[1];//alert(temp+"===="+areaid)
							if(document.forms[0].year.value.substring(0,4)==temp){
									//if(document.forms[0].area!=null){
									for(var k = 0;k<document.forms[0].area.getElementsByTagName('option').length;k++){
										if(document.forms[0].area.getElementsByTagName('option')[k].text==areaid){
											setTimeout(function(){document.forms[0].area.getElementsByTagName('option')[k].selected=true},1);
											//setTimeout(function(){document.forms[0].area.getElementsByTagName('option')[k].setAttribute("selected","selected")},1);
											break;
									  // }
									    }
									}
							}else{
							       // document.getElementsByName("area")[0].value="";
							}
						}	
				 }	
	     }else{ //不使用多地区
				if(cook.indexOf('loginyear')!=-1){
						var index=parseInt(cook.split('loginyear=')[1].split(';')[0]);
						//document.forms[0].year.getElementsByTagName('option')[index].selected=true;
						document.getElementsByName("year")[0].value=document.forms[0].year.getElementsByTagName('option')[index].value;
				}	
	    }	
		if(isshowlogincuryear == "1"){
			onIsShowLoginCurYear();
		}
}

/** 记录登录的用户名和密码到cookie中*/
function writecookie(){
		var cook=document.cookie;
		var date=new Date();
		var expireDays=10*365;
		date.setTime(date.getTime()+expireDays*24*3600*1000);
		//cookie中存用户名
		newcook = 'loginname='+document.forms[0].username.value+";expires="+unescape(date.toGMTString())+';';
		//newcook1中存有地区的年度
		if(document.getElementById("area")!=null&&document.forms[0].area!=null){
			var loginyear=0;
			var tempyear;
			var opt=document.forms[0].year.getElementsByTagName('option');
			for(var i=0;i<opt.length;i++){
					if(document.forms[0].year.value==opt[i].value){
						loginyear=i;
						tempyear=opt[i].value.substring(0,4);
						break;
					}
			}
			var loginarea=0;
			var optarea=document.forms[0].area.getElementsByTagName('option');
			for(var j=0;j<optarea.length;j++){
					if(document.forms[0].area.value==optarea[j].value){
						//alert(optarea[j].text);
						loginarea=tempyear+","+optarea[j].text;
						break;
					}
			}
			newcook1 = 'loginyear='+loginyear+";expires="+unescape(date.toGMTString())+';';
			newcook2 = 'loginarea='+loginarea+";expires="+unescape(date.toGMTString())+';';
			document.cookie = newcook1;
			document.cookie = newcook2;
		}else{//newcook2中存无地区的年度
			var loginyear=0;
			var opt=document.forms[0].year.getElementsByTagName('option');
			for(var i=0;i<opt.length;i++){
					if(document.forms[0].year.value==opt[i].value){
						loginyear=i;
						break;
					}
			}
			newcook1 = 'loginyear='+loginyear+";expires="+unescape(date.toGMTString())+';';
			document.cookie = newcook1;
		}
		if(document.getElementById("netname")!=null&&document.forms[0].netname!=null){
			var tempnetname;
			var optn=document.forms[0].netname.getElementsByTagName('option');
			for(var i=0;i<optn.length;i++){
					if(document.forms[0].netname.value==optn[i].value){
						tempnetname=optn[i].value;
						break;
					}
			}
			newcook3 = 'loginnetname='+tempnetname+";expires="+unescape(date.toGMTString())+';';
			document.cookie = newcook3;
		}
		document.cookie = newcook;
		//document.forms[0].submit();
		//document.forms[0].password.value = "";
	}
//多地区跳转地区下拉框列表信息生成对象 year：财政年度 sel：地区下拉框对象
function createAreaOption(year,sel){
//debugger;
        //如果年度信息为空，则返回
		if(year==null||year=='')return '';
		//遍历地区列表信息填充到地区下拉框对象中
		for(var i=0;i<objAreaSelect.length;i++){
		    //取当前选中年度的信息
			if(objAreaSelect[i].year==year){
			    //创建下拉信息对象
				var opt=document.createElement('option');
				opt.value=objAreaSelect[i].id;
				opt.innerText=objAreaSelect[i].name;
				//把下拉信息对象追加到下拉列表对象中
				sel.appendChild(opt);
			}
		}
	}
//根据多地区列表对象填充多地区列表
function year2AreaSelect(){
    //多地区下拉框对象
		var obj=document.getElementById('area');//普通
		var ptdl=document.getElementById('ptdl');//普通form
		//处理有2个表单的地区(比如福建)
		var obj1=document.getElementById('area1');//ca
		var ptd2=document.getElementById('cadl');//ca form
		//如果地区下拉对象为空或者地区列表对象为空则返回
		//if(ptdl!=null&&ptdl.style.display=="block"&&(obj==null || objAreaSelect==null)){
		if(obj==null || objAreaSelect==null){
			return;
		}
		if (ptdl!=null&&ptdl.style.display=="block"){
			obj.innerHTML="";
			//调用下拉框列表生成对象
			createAreaOption(document.forms[0].year.value.split(';')[0],obj);
		}else if(ptdl==null){
			obj.innerText="";
			//调用下拉框列表生成对象
			createAreaOption(document.forms[0].year.value.split(';')[0],obj);
		}
		//处理多个表单
		if (ptd2!=null&&ptd2.style.display=="block"&&obj1!=null){
		    obj1.innerHTML="";
		    createAreaOption(document.forms[1].year.value.split(';')[0],obj1);
		}		  
}
	
	
	
/***********广西桂林CA证书信息读取***************/
    //证书集合
	var Certs;
	//当前证书
	var CurCert;
	//固定常量
	OUTPUT_BASE64				= 0x04;
	
	//授权码数组信息-----南宁
	var tempArraySN;
	//证书数量
	var certNum = 0;
	//是否选择证书
	var isSelectCert = 0;
//读取证书列表放入证书选择下拉框中（桂林）
function refresh1(){
     Certs=null;
     if(document.getElementById("select1")!=null){
    	 document.getElementById("select1").innerText =""
     }
	 CertFilter =iTrusPTA.Filter;
	 CertFilter.Issuer="O=GuangXi Certificate Authority Ltd., OU=For Intranet Using, CN=Guangxi Individual CA for Intranet";
     Certs=iTrusPTA.MyCertificates;
     for(i=1;i<=Certs.Count;i++){
		if(i==1){
			form1.pk.value=Certs.item(i).CommonName+spitSubject(Certs.item(i).Subject);
		}
		opt=document.createElement("OPTION");
	    form1.select1.options.add(opt);
	    opt.innerText=Certs.item(i).CommonName;
	    opt.value=i;
	} 
}
//读取证书列表放入证书选择下拉框中（南宁）
function refresh2()
		{
			var j =form1.selCert.length;
			for(i=j-1; i>=0; i--)
			{
				 form1.selCert.remove(i);
			}
			certNum = FTCtrl.GetAllCertNum;
			if(!certNum || certNum == 0)
			{
				alert("未检测到数字证书，请确认已经插入包含数字证书的USBKEY");
				//return;
			}
			var tempStr = FTCtrl.GetAllCertCn;						
			var tempArray = tempStr.split(",");
			var tempSnStr = FTCtrl.GetAllCertSN;
			    tempArraySN = tempSnStr.split(",");
			for(i=0; i< certNum;i++)
			{
				form1.selCert.options[form1.selCert.options.length] = new Option(tempArray[i], tempArray[i]);
			}
			if(certNum > 1)
			{
				alert("检测到多张数字证书，请先选择要使用的证书！");
				form1.selCert.focus();
			}
			isSelectCert = 1;
		}
		
//提交登录请求（南宁）
function OnLogin(){
			var certNum = FTCtrl.GetAllCertNum;
			//alert(certNum);
			//没有数字证书selCert
			if(certNum == 0){
				alert("没有检测到数字证书");
				form1.selCert.foucs();
				return false;
			}
			
			//校验证书密码
			var pinLength = form1.userpin.value.length;
			if(pinLength < 4|| pinLength > 16){
			
				alert("用户密码有效位数是：4-16位，请确认输入正确的位数");
				form1.userpin.foucs();
				return false;
			}
			
			var strCn = form1.selCert.options[form1.selCert.selectedIndex].value;
			CurSn=tempArraySN[form1.selCert.selectedIndex];
			var ret = FTCtrl.VeryfyUSerpiByCN(strCn,form1.userpin.value);
			if(ret !=0)
			{
					ret = FTCtrl.GetPinInfoByCN(strCn);
					if(ret == 0x1006)
					{
						alert("指定的证书不存在");
					}
					else
					{
						alert("验证用户密码失败,密码可重试次数为："+ret +" 次");
					}
				   return false;
			}
			else					//验证userpin成功，跳转到指定的https站点
			{
				var CertFilter;//定义一个变量 
				CertFilter =iTrusPTA.Filter;//把对象付给变量 
				CertFilter.SerialNumber=CurSn;//设置查询条件，根据序列号
				Certs=iTrusPTA.MyCertificates;//得到一个证书总数变量，
				if (Certs.Count == 0) 
				{
				  alert("出现技术性错误，请与软件开发商联系");
				  return false;
				}
				CurCert=Certs.item(1);//从总数里面获取第一个，其实过滤查询后证书总数就只有一个item
				
				//登录参数对象
				var para_login = new Object();
				//获取年度及地区财政信息
				if (document.forms[0].year != null) {
					para_login.year = document.forms[0].year.value;
				} else {
					para_login.loginacctyear = document.forms[0].loginacctyear.value;
					para_login.logingovid = document.forms[0].logingovid.value;
				}
				 //CurCert=Certs.item(form1.select1.value);
				 form1.pk.value=spitSubjectForIden(CurCert.Subject);
				 para_login.pk = spitSubjectForIden(CurCert.Subject)+"n";
				try
				{
					//form1.Sign_value.value = CurCert.SignMessage(form1.pk.value,OUTPUT_BASE64);
					para_login.Sign_value = CurCert.SignMessage(form1.pk.value,OUTPUT_BASE64);
					para_login.screenwidth = window.screen.width;
					//处理CA登录
					Ext.lt.RCP.call(Ext.lt.portal.component.login.server, "glcalogin", para_login , function (resp) {					   
						if (resp.errorMessage=="true") {
							window.location.href = _ROOT_PATH_ + "/defaultcommon.page";
						//多地区跳转
						}else if (resp.httpUrl != null){
						    var multiAreaForm = document.getElementById("multiAreaForm");
						    //表单提交地址
						    multiAreaForm.action = resp.httpUrl;
					        //地区标识 
					        if(document.forms[0].area!=null){
						        multiAreaForm.area.value = document.forms[0].area.value;
					        }
							//财政年度
							multiAreaForm.year.value = resp.year;
							//begin 南宁ca多年度跳转修改 楚艳红
							multiAreaForm.glca.value = "glca";
							//CA认证信息
							multiAreaForm.pk.value = para_login.pk;
							multiAreaForm.Sign_value.value = para_login.Sign_value;
							//end 南宁ca多年度跳转修改 楚艳红
							//用于控制菜单宽度
							multiAreaForm.screenwidth.value = window.screen.width;
							
							//当前服务地址，用户推迟系统操作
							multiAreaForm.mainUrl.value = resp.mainUrl;
							//提交表单
						    multiAreaForm.submit();
						//如果登录失败，则给出提示信息
						} else if(resp.errorMessage == "shouquan"){
			                window.location.href = _ROOT_PATH_ + "/portal/portal2/login/accuser.jsp";
			                 form.password.value = "";
		     
		                }else {
							document.getElementById("errorMessage").innerText = resp.errorMessage;//臧家妹 错误提示信息
						}
					});
				}
				catch(Exception)
				{
				  alert("签名失败");
				   return false;
				}							
			}
  }
		
	//拆分主题得到用户名+电子邮件组合体
	function spitSubject(Subject)
	{
	 var sub_email="";
	 var sub_id=Subject.split(",");
     //判断标识
     var checkFlag = 0;
	 for(var i=0;i<sub_id.length;i++)
	 {
	    var get_i=sub_id[i].indexOf("E=")
		if(get_i>0)
		{
		 sub_email=sub_id[i].substring(get_i+2);
		}
	 }
     // 字符数组
     var checkStrTemp = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
     //判断去掉最后一个回车符
     for(var j=0;j<checkStrTemp.length;j++){
         if (sub_email.toArray()[sub_email.length-1].toUpperCase()==checkStrTemp[j]){
             checkFlag = 1;
             break;
         }
     }
     if(checkFlag==0){
         sub_email = sub_email.substr(0,sub_email.length-1)
     }
	  return sub_email;
	}
	//拆分主题得到用户身份证号(identification) 南宁
	function spitSubjectForIden(Subject)
	{
	 //身份证号
	 var identify="";
	 var sub_id=Subject.split(",");
	      // 字符数组
	 var checkFlag = 0;
	 for(var i=0;i<sub_id.length;i++){  
	  
	    var get_i=sub_id[i].indexOf("OU=ID:")
		if(get_i>0)
		{
		 identify=sub_id[i].substring(get_i+6);
		}
	 }
	 var checkStrTemp = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	 for(var j=0;j<checkStrTemp.length;j++){
	   if (identify.toArray()[identify.length-1].toUpperCase()==checkStrTemp[j]){
             checkFlag = 1;
             break;
         }
     }
     if(checkFlag==0){
         identify = identify.substr(0,identify.length-1)
     }
	  return identify;
	}
	
//检验证书是否过期（桂林）
function guilinCheckOutDateTime(){
	try{
		var glErrorMsg = document.getElementById("errorMessage");
		glErrorMsg.innerText = "";
		glErrorMsg.title = "";
		if (Certs.Count == 0){
			return false;
		}
		CurCert=Certs.item(form1.select1.value);
		var overday = CurCert.ValidTo;
		var serverDate = new Date(glsevertime);
		var diffDays = parseFloat((overday-serverDate)/(1000*60*60*24));
		diffDays = Math.round(diffDays*100)/100;
		if(diffDays<=overTimeSet&&diffDays>=1){
			var errorMessage = "您的证书将在【" + parseInt(diffDays) + "】天之后过期"+overTimeContext;
			glErrorMsg.innerText = errorMessage;
			glErrorMsg.title = errorMessage;
		}else if(diffDays>=0&&diffDays<1){
			glErrorMsg.innerText = "您的证书将要过期"+overTimeContext;
			glErrorMsg.title = "您的证书将要过期"+overTimeContext;
		}else if(diffDays<0){
			glErrorMsg.innerText = "您的证书已经过期"+overTimeContext;
			glErrorMsg.title = "您的证书已经过期"+overTimeContext;
		}
	}catch(e){}	
}	
//进行签名提交目的是不让人篡改（桂林）
function signvalue(){
	var glErrorMsg = document.getElementById("errorMessage");
	glErrorMsg.innerText = "";
	glErrorMsg.title = "";
	var para_login = new Object();
	if (Certs.Count == 0) 
	{
      alert("没有查找到证书");
	  return false;
	}
	//获取年度及地区财政信息
	if (document.forms[0].year != null) {
		para_login.year = document.forms[0].year.value;
	} else {
		para_login.loginacctyear = document.forms[0].loginacctyear.value;
		para_login.logingovid = document.forms[0].logingovid.value;
	}
	 CurCert=Certs.item(form1.select1.value);
	 var _pkvalue = CurCert.CommonName+spitSubject(CurCert.Subject);
	 form1.pk.value = _pkvalue;
	 para_login.pk = _pkvalue + "g";
	
	try
	{
		var _SignMessage = CurCert.SignMessage(form1.pk.value,OUTPUT_BASE64);
		form1.Sign_value.value = _SignMessage;
		para_login.Sign_value = _SignMessage;
		para_login.screenwidth = window.screen.width;
		var temppk = para_login.pk;
		var tempSign_value = para_login.Sign_value;
		//处理CA登录
		Ext.lt.RCP.call(Ext.lt.portal.component.login.server, "glcalogin", para_login , function (resp) {
		  
			if (resp.errorMessage=="true") {
				window.location.href = _ROOT_PATH_ + "/defaultcommon.page";
			//多地区跳转
			}else if (resp.httpUrl != null){
			    var multiAreaForm = document.getElementById("multiAreaForm");
			    //表单提交地址
			    multiAreaForm.action = resp.httpUrl;
		        //地区标识 
		        if(document.forms[0].area!=null){
			        multiAreaForm.area.value = document.forms[0].area.value;
		        }
				//财政年度
				multiAreaForm.year.value = resp.year;
				//CA认证信息
				//multiAreaForm.signed_data.value = temp_DSign_Result;
				//用于控制菜单宽度
				multiAreaForm.screenwidth.value = window.screen.width;
				//当前服务地址，用户推迟系统操作
				multiAreaForm.mainUrl.value = resp.mainUrl;
				multiAreaForm.glca.value = "glca";
				//CA认证信息
				multiAreaForm.pk.value = temppk;
				multiAreaForm.Sign_value.value = tempSign_value;
				//提交表单
			    multiAreaForm.submit();
			//授权登录
			} else if(resp.errorMessage == "shouquan"){
			   window.location.href = _ROOT_PATH_ + "/portal/portal2/login/accuser.jsp";
			  form.password.value = "";
		     
		    }
		    //如果登录失败，则给出提示信息
			else {
				glErrorMsg.innerText = resp.errorMessage;//臧家妹 错误提示信息
				glErrorMsg.title = resp.errorMessage;;
			}
		});
	}
	catch(Exception)
	{
	  alert("签名失败");
	   return false;
	}
}
//城阳CA进行证书签名
function readcertq(){

       	//产生随机数
		var random=CASecurityClient.SOF_GenRandom(parseInt(10));
			
		//判断错误
		if(CASecurityClient.SOF_GetLastError()!=0){
			alert(CASecurityClient.SOF_GetLastError());
			return false;
		}
		
		//获取客户端签名证书 
		var clientCertID=CASecurityClient.SOF_GetUserList();
		 //alert(clientCertID);		
		//判断错误
		if(CASecurityClient.SOF_GetLastError()!=0){
			alert(CASecurityClient.SOF_GetLastError());
			return false;
		}
		
		//证书签名
		var cipherText=CASecurityClient.SOF_SignData(clientCertID,random);
		
		//判断错误
		if(CASecurityClient.SOF_GetLastError()!=0){
			alert(CASecurityClient.SOF_GetLastError());
			return false;
		}
		
		//导出用户端签名证书
		var clientCert=CASecurityClient.SOF_ExportUserCert(clientCertID);
		//alert(clientCert);	
		//判断错误
		if(CASecurityClient.SOF_GetLastError()!=0){
			alert(CASecurityClient.SOF_GetLastError());
			return false;
		}
		
	    if (document.forms[0].year != null) {
		   para_login.year = document.forms[0].year.value;
	    } else {
		   para_login.loginacctyear = document.forms[0].loginacctyear.value;
		   para_login.logingovid = document.forms[0].logingovid.value;
	    }
		
		para_login.cipherText = cipherText;
		para_login.clientCertID = clientCertID;
		para_login.clientCert =clientCert;
		para_login.random =random;
      	
	    Ext.lt.RCP.call(Ext.lt.portal.component.login.server, "cyca", para_login , function (resp) {	
			if (resp.code!=null) {
				//begin wyx 2013.01.15.判断青岛唯一ukey对应多用户的方法				
				if(typeof(resp.code)!='undefined' && typeof(resp.code)=='object'){
					var divobj = document.getElementById('id6qingdaotd');
					divobj.innerHTML='';
					//创建selectHTML标签
					var selectobj = document.createElement('<select name="username" readonly>');
					var select_id = document.createAttribute("id");
					select_id.nodeValue = 'username';
					selectobj.setAttributeNode(select_id);
					var select_name = document.createAttribute("name");
					select_name.nodeValue = 'username';
					selectobj.setAttributeNode(select_name);
					var list = resp.code;
					for(var i=0;i<list.length;i++){
						var option = document.createElement("option");
						var option_value = document.createAttribute("value");
						option_value.nodeValue = list[i].USERCODE;
						var option_text = document.createTextNode(list[i].USERCODE);
						option.setAttributeNode(option_value);
						option.appendChild(option_text);
						selectobj.appendChild(option);
					}
					divobj.appendChild(selectobj);
				}else{
					document.getElementById("username").value=resp.code;
				}
				//end wyx 2013.01.15.判断青岛唯一ukey对应多用户的方法					
			//window.location.href = _ROOT_PATH_ + "/defaultcommon.page";
			//多地区跳转
			}else if (resp.httpUrl != null){
			    var multiAreaForm = document.getElementById("multiAreaForm");
			    //表单提交地址
			    multiAreaForm.action = resp.httpUrl;
		        //地区标识 
		        if(document.forms[0].area!=null){
			        multiAreaForm.area.value = document.forms[0].area.value;
		        }
				//财政年度
				multiAreaForm.year.value = resp.year;
				//CA认证信息
				multiAreaForm.signed_data.value = temp_DSign_Result;
				//用于控制菜单宽度
				multiAreaForm.screenwidth.value = window.screen.width;
				
				//当前服务地址，用户推迟系统操作
				multiAreaForm.mainUrl.value = resp.mainUrl;
				//提交表单
			    multiAreaForm.submit();
			//如果登录失败，则给出提示信息
			} else {
				document.getElementById("errorMessage").innerText = resp.errorMessage;
			}
		});
}
    
  function post(logininfo){
  	 //登录页面内容存储数组
	 var setHtml=[];
      if (logininfo.isbulletin == true){ 
      	var indexjsp=Ext.lt.portal.component.login.logininfo.indexjsp;
		if(indexjsp=="5"){
		setHtml.push('<div style="z-index:1000;position:absolute;background:#fff;height:200px;width:360px;background-image:url(../../lightblue_images/bg/gonggao_div.gif);background-repeat:repeat;margin-right:2px;font-size:12px;bottom:0; right:0;" id="gonggao_div" style="display:block;">');	
		}else if(indexjsp=="31"){
			setHtml.push('<div style="z-index:1000;position:absolute;background:#fff;height:159px;width:297px;background-image:url(../../portal/images/login/shanxi/gg.gif);background-repeat:no-repeat;margin-right:2px;font-size:12px;bottom:0; right:0;" id="gonggao_div" style="display:block;">');
		}else{	 
			setHtml.push('<div style="z-index:1000;position:absolute;background:#fff;height:200px;width:360px;background-image:url(../../ifmis_images/bg/gonggao_div.gif);background-repeat:repeat;margin-right:2px;font-size:12px;bottom:0; right:0;" id="gonggao_div" style="display:block;">');
		}
		setHtml.push('<table width="100%" border="0" cellpadding="0" cellspacing="0">');
	    setHtml.push('<tr>');
	    if(indexjsp=="31"){
    	setHtml.push('<td align=center><div style="color:#FFF;">公告栏</div></td>');
	    }else{
	    	setHtml.push('<td align=center><div >公告栏</div></td>');
	    }
	    setHtml.push('<td onclick="closeGonggao()" style="width:30px;height:25px; cursor:pointer;" title="关闭">&nbsp;</td>');
		setHtml.push('</tr>');
		setHtml.push('</table>');
		setHtml.push('<marquee direction=up scrollamount=1 scrolldelay=50 onmouseover="stop()" onmouseout="start()" style=" cursor:pointer; color:#000000; height:150px; margin:20px 20px 0 20px;">');				   
  		if(logininfo.postList.length > 0){ 				   
			for(var i=0;i<logininfo.postList.length;i++){
			  var post =logininfo.postList[i];
			  //height:25px;  line-height:25px;高度去掉，防止文字过多导致文字重叠现象
			  setHtml.push('<div style=" border-bottom:1px #ccc dotted;">');
			  setHtml.push('<img src="../images/done_btn/news.gif" />');
			  setHtml.push('<a  onclick=\'preview("' + post.id + '")\'>');
					if(post.postlevel=="03"){
							setHtml.push('<font color=red>'+post.posttitle+'</font>');
							setHtml.push('		</a>');
					        setHtml.push('('+post.createtime+')');
					}else{
							setHtml.push(''+post.posttitle+'');
							setHtml.push('</a>');	
							setHtml.push('('+post.createtime+')');								    
							//if(logininfo.redFlag=="1" && post.pubid == undefined){
	                        //     setHtml.push('<img id="'+post.id +'" src="' + _ROOT_PATH_ + '/portal/images/new.gif" />');						               
						    //}
					}
					setHtml.push('<br>');
					setHtml.push('</div>');
					setHtml.push('<br/>');
			}
		}
					setHtml.push('</marquee>');        
				    setHtml.push('</div>');
	   }
	   return setHtml.join('');
    }
    
    function postCt(logininfo){
        	    //登录页面内容存储数组
			    var setHtml=[];	
    			if (logininfo.isbulletin == true){		
				    setHtml.push('<div class="gonggao_div11" id="gonggao_div" style="display:block;width:100%;">');
				    setHtml.push('<table width="100%" border="0" cellpadding="0" cellspacing="0" style="border-style:none;">');
				    setHtml.push('<tr>');
				    setHtml.push('<td style="background:#FFF url(../ifmis_images/login/chenzhou/head_title.gif) no-repeat left top;width:40px;"></td>');
				    setHtml.push('<td>&nbsp;');
				    setHtml.push('<marquee direction=left scrollamount=2 scrolldelay=50 onmouseover="stop()" onmouseout="start()" style=" cursor:pointer; color:#000000;">');
				    if(logininfo.postList.length > 0){
						  for(var i=0;i<logininfo.postList.length;i++){
								setHtml.push('<img src="../images/done_btn/news.gif" />');
								setHtml.push('<a  onclick=\'preview("' + logininfo.postList[i].id + '")\'>');
								if(logininfo.postList[i].postlevel=="03"){
									 setHtml.push('<font color=red>'+logininfo.postList[i].posttitle+'</font>');
								}else{
									 setHtml.push(''+logininfo.postList[i].posttitle+'');
								}
								setHtml.push('</a>');	
								setHtml.push('('+logininfo.postList[i].createtime+')&nbsp;&nbsp;&nbsp;&nbsp;');
							}
					}	
					setHtml.push('</marquee>'); 
					setHtml.push('</td>');
					setHtml.push('<td onclick="closeGonggao()" style="background:#FFF url(../ifmis_images/login/chenzhou/hand_end.gif) no-repeat right top;width:80px;" align="right"><div style="width:30px; cursor:pointer;" title="关闭"></div></td>');
				    setHtml.push('</tr></table>')
				    setHtml.push('</div>');
			}
			return setHtml.join('');
    }
    
    function postLeft(logininfo){
   	 	var setHtml=[];
   		setHtml.push('<div style="z-index:1000;position:absolute;background:#fff;height:200px;width:360px;background-image:url(../../ifmis_images/bg/gonggao_div.gif);background-repeat:repeat;margin-right:2px;font-size:12px;bottom:0; left:0;" id="leftgonggao_div" style="display:block;">');				    
   		setHtml.push('<table width="100%" border="0" cellpadding="0" cellspacing="0">');
   	    setHtml.push('<tr>');
       	setHtml.push('<td align=center><div>公告栏</div></td>');
   	    setHtml.push('<td onclick="closeleftGonggao()" style="width:30px;height:25px; cursor:pointer;" title="关闭">&nbsp;</td>');
   		setHtml.push('</tr>');
   		setHtml.push('</table>');
   		//otherList
		setHtml.push('<marquee direction=up scrollamount=1 scrolldelay=50 onmouseover="stop()" onmouseout="start()" style=" cursor:pointer; color:#000000; height:150px; margin:20px 20px 0 20px;">');				   
  		if(logininfo.otherList.length > 0){ 				   
			for(var i=0;i<logininfo.otherList.length;i++){
			  var post =logininfo.otherList[i];
			  //height:25px;  line-height:25px;高度去掉，防止文字过多导致文字重叠现象
			  setHtml.push('<div style=" border-bottom:1px #ccc dotted;width:300px;word-wrap:break-word;">');
			  setHtml.push('<img src="../images/done_btn/news.gif" />');
			  setHtml.push('<a  onclick=\'preview("' + post.id + '")\'>');
					if(post.postlevel=="03"){
							setHtml.push('<font color=red>'+post.posttitle+'</font>');
							setHtml.push('		</a>');
					        setHtml.push('('+post.createtime+')');
					}else{
							setHtml.push(''+post.posttitle+'');
							setHtml.push('</a>');	
							setHtml.push('('+post.createtime+')');								    
							//if(logininfo.redFlag=="1" && post.pubid == undefined){
	                        //     setHtml.push('<img id="'+post.id +'" src="' + _ROOT_PATH_ + '/portal/images/new.gif" />');						               
						    //}
					}
					setHtml.push('<br>');
					setHtml.push('</div>');
					setHtml.push('<br/>');
			}
		}
					setHtml.push('</marquee>');        
				    setHtml.push('</div>');
        return setHtml.join('');
   }
	function closeleftGonggao(){
		document.getElementById("leftgonggao_div").style.display = "none";
	}
	
    function downloadControl(logininfo){
    	//登录页面内容存储数组
	    var setHtml=[];	
	    setHtml.push('<div id="xzkj" style="z-index:10; position:absolute; top:0;right:10px; background-image:url(../portal/images/login/download/download.gif); height:128px; width:128px; background-repeat:no-repeat; color:#FFF; font-size:14px; cursor:pointer;filter:alpha(opacity=100);-moz-opacity:0.8;line-height:128px;font-weight:bold;text-align:center;" onmouseover="mouseOvers()" onmouseout="mouseOut()" onclick="exe(\''+logininfo.controlURL+'\')">下载控件</div>');
        return setHtml.join('');
    }
    //begin wyx 20121114 为了重庆密码框的输入
    function chongqing9PasswordCkeystop(evt){//onkeydown
    	if(!window.event){
    		var keycode=evt.keycode;
    		var key=String.fromcharcode(keycode).toLowercase();
    		if(evt.ctrlkey&&key=="v"){
    			evt.preventDefault();
                evt.stopPropagation();
         	}
    	}
	}
    function chongqingkeyup(obj){//onkeyup
    	if(window.event){
    		var evt = window.event;
    		if(evt.keyCode==8){
    			var obj = document.getElementById('passwordvalue');
        		var pass = obj.value;
    			if(pass.indexOf("@@@@")!=-1){
    				pass = pass.replace("@@@@","@@");
    			}else if(pass.length>0){
    				pass = pass.substring(0,pass.length-2);
    			}
    			obj.value=pass;
    		}
    		var checkword=obj.value;
    		if(checkword.indexOf("@@")==-1){
    			checkword="@@"+checkword;
    			if (checkword=="@@"){
    				checkword="";
    			}
    		}
    		var checklength=checkword.length;
			if(0!=checklength%3){
				checkword="@@"+checkword;
			}
    		obj.value=checkword;
    	}
    }
    function chongqing9Password(obj){//onkeypress
//		if(document.all){ 
//			var content = document.selection.createRange(); 
//		}else{ 
//			var content = window.getSelection(); 
//		    content.text = content.toString(); 
//		} 
//		var str = content.text;//选择的内容
		if(window.event){
			var evt = window.event;
			if(evt.keyCode!=13){
				obj.value=obj.value+"@@";
			}
		}else {
			obj.value=obj.value+"@@";
		}
	}
	function chongqing9PasswordBlur2(){//回车
		var obj = document.getElementById('passwordvalue');
		if(null==obj){
			return false;
		}
		var realPasswordObj = document.getElementById('passwordval');
		if(null==realPasswordObj){
			return false;
		}
		var pattern = /[-<>?@]/g;;
		var val = obj.value;
		realPasswordObj.value=val.replace(pattern,'');	
	}
	function chongqing9PasswordBlur(obj){//onblur
		var realPasswordObj = document.getElementById('passwordval');
		var pattern = /[-<>?@]/g;;
		var val = obj.value;
		realPasswordObj.value=val.replace(pattern,'');
	}
	//end wyx 20121114 为了重庆密码框的输入
	
	//显示超链接
	function hyperLink(logininfo,bottom){
		var setHtml=[];
		setHtml.push('<div style="z-index:1000;position:absolute;height:160px;width:251px;background-image:url(../../portal/images/linkarea.png);background-repeat:no-repeat;background-position:left top;font-size:12px;bottom:'+bottom+'px; right:0;" id="A_div" style="display:block;">');
		setHtml.push('<table width="100%" border="0" cellpadding="0" cellspacing="0">');
	    setHtml.push('<tr>');
		setHtml.push('<td align=center><div>&nbsp</div></td>');
	    setHtml.push('<td onclick="closeHyper()" style="width:25px; cursor:pointer;"  title="关闭">&nbsp;</td><td width="10px">&nbsp;</td>');
		setHtml.push('</tr>');
		setHtml.push('</table>');
		setHtml.push('<div style="margin:7px 2px 0 18px; width:225px; height:130px; overflow-x:hidden; overflow-y:auto;">');
		if(logininfo.hyperLinks!=null&&logininfo.hyperLinks.length > 0){
			for(var i=0;i<logininfo.hyperLinks.length;i++){
				var hyperLink =logininfo.hyperLinks[i];
				setHtml.push('<div style="border-bottom:1px #CCC dotted; width:225px; height:25px; line-height:25px; text-align:left;overflow:hidden;">');
				setHtml.push('<img style="margin-bottom:-8px;" src = "../../portal/images/ietb.png"/><a style="text-decoration:none;" target = "_blank" title= "'+hyperLink.linkname+'" href='+hyperLink.serviceurl+'>');
				setHtml.push(hyperLink.linkname);
				setHtml.push('</a></div>');
			}
		}
	    setHtml.push('</div>');
	    setHtml.push('</div>');
	   return setHtml.join('');
	}
	//关闭超链接div
	function closeHyper(){
		document.getElementById("A_div").style.display = "none";
	}
	
	//节日动态效果
	function onLd(){
		try{
			var flashoObj = document.getElementById("flasho");
			if(flashoObj!=null){
				var i = 1;
				setInterval(function(){
					flashoObj.style.backgroundPosition = "0px -"+((i++%3)*113 )+"px";
				},200);
			}
		}catch(e){}
	}
	/** 读取cookie中的用户名以及年度到登录页面*/
	function onloadCooksx(){
			year2AreaSelect();
			var cook=document.cookie;
			if(cook.indexOf('loginname')!=-1){
				if(cook.split('loginname=')[1]!='undefined'&&cook.split('loginname=')[1]!=null){
					if(document.forms[0].username!=null){
						document.forms[0].username.value=cook.split('loginname=')[1].split(';')[0];
					}
				}
			}
	 	//使用多地区
			if(document.forms[0].area!=null){
					if(cook.indexOf('loginyear')!=-1){
							var index=parseInt(cook.split('loginyear=')[1].split(';')[0]);
							//document.forms[0].year.getElementsByTagName('option')[index].selected=true;
							document.getElementsByName("year")[0].value=document.forms[0].year.getElementsByTagName('option')[index].value;
						 	year2AreaSelect();
							if(cook.indexOf('loginarea')!=-1){
								var index=cook.split('loginarea=')[1].split(';')[0];
								var temp = index.split(',')[0];//cookie记录的年度
								var areaid = index.split(',')[1];//alert(temp+"===="+areaid)
								if(document.forms[0].year.value.substring(0,4)==temp){
										//if(document.forms[0].area!=null){
										for(var k = 0;k<document.forms[0].area.getElementsByTagName('option').length;k++){
											if(document.forms[0].area.getElementsByTagName('option')[k].text==areaid){
												setTimeout(function(){document.forms[0].area.getElementsByTagName('option')[k].selected=true},1);
												//setTimeout(function(){document.forms[0].area.getElementsByTagName('option')[k].setAttribute("selected","selected")},1);
												break;
										  // }
										    }
										}
								}else{
								       // document.getElementsByName("area")[0].value="";
								}
							}	
					 }	
		     }else{ //不使用多地区
					if(cook.indexOf('loginyear')!=-1){
							var index=parseInt(cook.split('loginyear=')[1].split(';')[0]);
							//document.forms[0].year.getElementsByTagName('option')[index].selected=true;
							document.getElementsByName("year")[0].value=document.forms[0].year.getElementsByTagName('option')[index].value;
					}	
		    }	
			if(isshowlogincuryear == "1"){
				onIsShowLoginCurYear();
			}
	}