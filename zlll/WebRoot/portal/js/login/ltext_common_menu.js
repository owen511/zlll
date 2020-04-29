//设置js路径对象
// 定义Portal命名空间
if(Ext.lt.portal==null) Ext.lt.portal = {component:{}};
if (Ext.lt.portal.component == null) {
	Ext.lt.portal.component = {};
}

/**系统logo区域*/
function logoArea(config) {
	var logoHtml = [];
	if(config.sxindexjsp=="31"){
		var d = new Date();
		var a = new Array("日", "一", "二", "三", "四", "五", "六");
		logoHtml.push('<div class="defaultoutter">');
		//logo区域 开始
		logoHtml.push('<div class="logoarea">');
		logoHtml.push('<table width="460" border="0">');
		logoHtml.push('<tr>');
		logoHtml.push('<td class="fontcolor">'+systemdate+'&nbsp;&nbsp;&nbsp;星期');
		logoHtml.push(a[d.getDay()]);
		logoHtml.push('</td>');
		logoHtml.push('<td>');
		logoHtml.push('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;登录年度:' + config.year);
		//logoHtml.push('</td>');
		//logoHtml.push('<td width="200px"><div id="remind"><a href="javascript:void(0)">消息</a></div>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="' + _ROOT_PATH_ + '/portal/login/mod_password.jsp" target="_blank">修改密码</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#" onclick="IsLogout(\''+config.ukeycheck+'\',\''+config.ischeckpengding+'\');">退出</a>&nbsp;&nbsp;</td>');
		logoHtml.push('&nbsp;&nbsp;|&nbsp;&nbsp;<a href="' + _ROOT_PATH_ + '/portal/login/mod_password.jsp" target="_blank">修改密码</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#" onclick="IsLogout(\''+config.ukeycheck+'\',\''+config.ischeckpengding+'\');">退出</a>&nbsp;&nbsp;</td>');
		logoHtml.push('</tr></table></div>');
	}else{
	if(config.refreshType != 1){
		logoHtml.push('<div id="logo">');
	}	
	logoHtml.push('    <table width="100%" border="0" cellspacing="0" cellpadding="0">');
	logoHtml.push('        <tr>');
	logoHtml.push('            <th rowspan="2" nowrap="nowrap"></th>');
	logoHtml.push('            <td  nowrap="nowrap">');
	//是否显示退出按钮
	if (config.exitshow == "1") {
		// begin 楚艳红 2012.11.21 退出时检测是否提示有无待办事项  1检测 0 不检测
		logoHtml.push('            <div><a title="退出" href="#" onclick="IsLogout(\''+config.ukeycheck+'\',\''+config.ischeckpengding+'\');"><img src="' + _ROOT_PATH_ + '/images/actions/exit.gif" width="16" height="16" border="0"/> 退出 </a></div><div class="w_gang"></div>');
		// end 楚艳红 2012.11.21 退出时检测是否提示有无待办事项  1检测 0 不检测
	}
	if(config.refreshType == 1){
		//logoHtml.push('                <div><a title="返回首页" href="' + _ROOT_PATH_ + '/defaultcommon.page"><img src="' + _ROOT_PATH_ + '/images/actions/house.gif" width="16" height="16" /> 首页</a></div><div class="w_gang"></div>');
	}else{
		logoHtml.push('                <div><a title="刷新" href="' + _ROOT_PATH_ + '/defaultcommon.page"><img src="' + _ROOT_PATH_ + '/images/actions/house.gif" width="16" height="16" /> 刷新</a></div><div class="w_gang"></div>');
	}
	if (config.isaccuser != 0) {
		logoHtml.push('                <div><a title="切换角色" href="' + _ROOT_PATH_ + '/portal/portal2/login/accuser.jsp"><img src="' + _ROOT_PATH_ + '/portal/images/changerole.gif" width="16" height="16" /> 切换角色</a></div><div class="w_gang"></div>');
	}
	logoHtml.push('            <div style="width:65px"><a title="系统环境设置"  href="#" onclick="showInfo();"><img src="' + _ROOT_PATH_ + '/images/actions/setsys.gif" width="16" height="16" border="0"/>客户端设置</a></div><div class="w_gang"></div> ');
	logoHtml.push('                <div><img src="' + _ROOT_PATH_ + '/images/actions/font_size.gif" width="16" height="16" border="0" title="字号" /><a href="#" onclick="setFont(\'l\')">大</a><a href="#" onclick="setFont(\'m\')"> 中</a><a href="#" onclick="setFont(\'s\')"> 小</a></div><div class="w_gang"></div>');
	if (config.passwordshow == "1" && config.isportalca == "false") {
		logoHtml.push('                <div style="width:60px"><a title="修改密码" href="' + _ROOT_PATH_ + '/portal/login/mod_password.jsp" target="_blank"><img src="' + _ROOT_PATH_ + '/images/actions/mod_pwd.gif" width="16" height="16" border="0"/> 修改密码 </a></div><div class="w_gang"></div>');
	}
	if (config.intranetConfig == "true") {
		logoHtml.push('                <div><a title="进入内网" href="' + _ROOT_PATH_ + '" target="_blank"><img src="' + _ROOT_PATH_ + '/images/actions/go_innerNet.gif" width="16" height="16" /> 内网</a></div><div class="w_gang"></div>');
	}
	if (config.changeyear != null && config.changeyear == "1") {
		logoHtml.push('                <div  style="width:60px"><a title="切换年度" href="javascript:void(0)"  onclick="changeYear();"><img src="' + _ROOT_PATH_ + '/portal/images/changeyear/change.gif" width="16" height="16" /> 切换年度</a></div><div class="w_gang"></div>');
	}
	if (config.quickhelp == "1") {
		logoHtml.push('                <div id="quickhelp" style="width:60px"><a title="快速提问" href="javascript:void(0)" ><img src="' + _ROOT_PATH_ + '/images/actions/help.gif" width="16" height="16" /> 快速提问</a></div><div class="w_gang"></div>');
	}
	if (config.isMessage == "1" || config.isMessage == "2") {
		logoHtml.push('              <div id="remind" style="width:60px"><a title="消息中心" href="javascript:void(0)" class="lock"> 消息中心 </a></div><div id="remindcss" class="w_gang"></div>');
	}
	//增加计算器功能 by ss
	if(config.isShowCalculator == "1"){
		logoHtml.push('                <div><a title="计算器" href="javascript:void(0);" onclick="showCalculator();" ><img src="' + _ROOT_PATH_ + '/portal/images/calculator.png" width="16" height="16" /> 计算器</a></div><div class="w_gang" style="display:none"></div>');
	}
	logoHtml.push('                    <div class="w_head" visibility:hidden></div>');
	logoHtml.push('                </td>');
	logoHtml.push('                <td width="6" nowrap="nowrap" class="w_right">&nbsp;</td>');
	logoHtml.push('            </tr>');
	logoHtml.push('            <tr>');
	logoHtml.push('                <td nowrap="nowrap"  class="welcomeA">');
	if (config.refreshType == 1&&null != config.area_name && config.area_name != "") {
		logoHtml.push('                财政:' + config.area_name);
	}
	//登录财政年度
	logoHtml.push('                年度:' + config.year);
	//判断是否显示地区
	if (null != config.loginAreaName && config.loginAreaName != "") {
		logoHtml.push('                地区:' + config.loginAreaName);
	}
	//用户单位信息
	if (config.agencyType != null) {
		if (config.agencyName != null) {
			logoHtml.push('&nbsp;' + config.agencyType + ':' + config.agencyName);
		} else {
			logoHtml.push('');
		}
	} else if (config.agencyName != null) {
		logoHtml.push('&nbsp;单位:' + config.agencyName);
	}
	if (config.refreshType == 1&&null != config.showAcctsystype && config.showAcctsystype != "") {
		logoHtml.push('                账套:' + config.showAcctsystype);
	}
	//用户编码信息
	logoHtml.push('&nbsp;用户:' + config.name);
	//当前系统日期
	if (config.agencyType != null) {
		logoHtml.push('&nbsp;日期:');
	} else {
		logoHtml.push('&nbsp;系统日期:');
	}
	logoHtml.push('                   <span id=cdate>' + systemdate);
	logoHtml.push('                   </span></td>')
	logoHtml.push('                <td nowrap="nowrap">&nbsp;</td>');
	logoHtml.push('            </tr>');
	logoHtml.push('        </table>');
	if(config.refreshType != 1){
		logoHtml.push('    </div>');
	}
	}
	return logoHtml.join('');
};

Ext.lt.portal.component.logo = new function () {
	this.config="";
	this.showLogo=function(divid,config){
		var logoHtml = logoArea(config);
	    document.getElementById(divid).innerHTML=logoHtml;
	    Ext.lt.message.send('showlogo','onshow',"");
	};
}

/**系统首页主菜单展示区域*/
function mainMenuShow(config){
	//begin 楚艳红 2012.11.21 退出时检测是否有无待办事项 IsLogout()方法使用
	if(Ext.lt.portal.component.menu.config==null||Ext.lt.portal.component.menu.config==""){
		Ext.lt.portal.component.menu.config = config;
	}
	//广西南宁UKey登陆后拔掉仍能单点登陆的问题
	var ischeckUkey = config.portalIsCheckUkey;
	//begin 楚艳红 2012.11.21 退出时检测是否有无待办事项  IsLogout()方法使用
	//记录cs系统个数  大于0时显示 业务程序地址管理菜单
	var cscount=0;
	//定义菜单加载数组
	var mainMenuHtml = [];
    //弹出菜单数组对象，多数据库多子系统
	var menudiv = [];
	if(config.sxindexjsp=="31"){
	mainMenuHtml.push('<div class="menuareaoutter">');
    mainMenuHtml.push('<div class="redline"></div>');
	mainMenuHtml.push('<div class="menubg">');
	mainMenuHtml.push('<table width="100%" border="0" cellpadding="0" cellspacing="0">');
	mainMenuHtml.push('<tr>');
	mainMenuHtml.push('<td width="260px" valign="top">');
	mainMenuHtml.push('<div class="userinfos">');
	mainMenuHtml.push('<table width="100%" border="0">');
	mainMenuHtml.push('<tr>');
	mainMenuHtml.push('<td width="77px" valign="top"><div class="usersphoto" id="usersphoto" ondblclick="addPhoto()"><img id="imgd" src="' + _ROOT_PATH_ + '/downLoad.do?path='+config.fileid+'" /></div></td>');
	mainMenuHtml.push('<td class="userinfo_g">&nbsp;</td>');
	mainMenuHtml.push('<td valign="top">');
	mainMenuHtml.push('<table width="100%" border="0" cellspacing="0" cellpadding="0">');
	
	var cname = config.name;
	var cnames = cname;
	if(cnames.length>7){
		cnames = cname.substr(0,7)+"...";
	}
	mainMenuHtml.push('<tr><td class="infoname" style="width:38px">姓名：</td><td class="infoname" title="'+cname+'">');
	mainMenuHtml.push(cnames);
	mainMenuHtml.push('</td></tr>');
	var code = config.userCode;
	var codes = code;
	if(codes.length>7){
		codes = code.substr(0,7)+"...";
	}
	mainMenuHtml.push('<tr><td class="infozw">编码：</td><td class="infozw" title="'+code+'">');
	mainMenuHtml.push(codes);
	mainMenuHtml.push('</td></tr>');
	var agen = config.agencyName;
	var agens = agen;
	if(agen!=null&&agens.length>7){
		agens = agen.substr(0,7)+"...";
	}
	mainMenuHtml.push('<tr><td class="infocs">处室：</td><td class="infocs" title="'+agen+'">');
	mainMenuHtml.push(agens);
	mainMenuHtml.push('</td></tr></table></td>');
	mainMenuHtml.push('</tr>');
	mainMenuHtml.push('</table>');
	mainMenuHtml.push('</div>');
	mainMenuHtml.push('</td>');
	mainMenuHtml.push('<td valign="top">');	
	mainMenuHtml.push('<div class="menuarea">');
	//mainMenuHtml.push('<a href="' + _ROOT_PATH_ + '/defaultcommon.page">返回首页</a>');
	mainMenuHtml.push('<table  border="0" cellspacing="0" cellpadding="0">');	
	var leftprogramList= config.leftprogramList;
	var t=0;
	var a=0;
	if(leftprogramList.size()==0){
		for (var i = 0; i < config.totalmenus.length; i++){
	        var menu = config.totalmenus[i];	
	        if(menu.menuid){  
	        	if(menu.menuid==42000000){   
	        	mainMenuHtml.push('<tr>');
	    		mainMenuHtml.push('<td width="180px">');
	    		mainMenuHtml.push('<ul>');
	    		mainMenuHtml.push('<li><a href="' + _ROOT_PATH_ + menu.clientmodule+'?mainmenu=' + menu.menuid + '">' + menu.name + '</a></li>');
	    		mainMenuHtml.push('</ul>');
	    		mainMenuHtml.push('</td>');
	    		mainMenuHtml.push('</tr>');    
	        	}        	
	        	}
	        }
	}
	var leftprogramObj = {};
	for(var l=0;l<leftprogramList.size();l++){
		if(leftprogramList[l].CODETYPE == null){
			leftprogramList[l].CODETYPE = 0;
		}
		leftprogramObj[leftprogramList[l].PROGRAMCODE+"-"+leftprogramList[l].CODETYPE] = leftprogramList[l];
	}
	for (var i = 0; i < config.totalmenus.length; i++){
		var menu = config.totalmenus[i];
		if(leftprogramObj[menu.code+"-"+0]==undefined && leftprogramObj[menu.menuid+"-"+1] == undefined){
			continue;
		}
      //菜单能承受的最大宽度
	    //实际菜单宽度
	    var menulength = 1;
	    //if(menu.menuid&&t!=0){
	    //	continue;
	    //}
	    var isJoin = leftprogramObj[menu.code+"-"+0] && leftprogramObj[menu.code+"-"+0].CODETYPE == 0 && menu.sign!="portal";
	    var isGrow = leftprogramObj[menu.menuid+"-"+1] && leftprogramObj[menu.menuid+"-"+1].CODETYPE == 1;
        if(isGrow || isJoin ){
        	 //计算菜单宽度
	        menulength = menulength + menu.name.length+1;
			if((a)%4==0){
				mainMenuHtml.push('<tr>');
			}		
			
		}else{
			continue;
		}
	    
	    //用户对照对象
	    var userComObj = new Array();
	    //接入系统的参数 
	    var programparas = config.programparas;
      
      //用户对照信息
        var userCompare = config.userCompare;
        for(var j = 0; j < userCompare.length; j++){
        	userComObj[userCompare[j].BUSIGN] = userCompare[j];
        }
        //判断用户对照信息是否存在，如果存在则修改
        var comUcode = config.userCode;
        var comPassword = "";
        if(userComObj[menu.sign]){
        	comUcode = userComObj[menu.sign].BUCODE;
        	if(userComObj[menu.sign].BUPASSWORD != null){
        	    comPassword = userComObj[menu.sign].BUPASSWORD;
            }        	
        }
        if(menu.menuid){  
        	//if(t==0){
        	//if(menu.menuid==42000000){   
        		mainMenuHtml.push('<td width="180px">');
        		mainMenuHtml.push('<ul>');
	            mainMenuHtml.push('<li><a href="' + _ROOT_PATH_ + menu.clientmodule+'?mainmenu=' + menu.menuid + '">' + menu.name + '</a></li>');
	        //	continue;
        	//}        	
        	//}
        //如果是接入菜单
        }else {       
        	if(leftprogramObj[menu.code+"-"+0]  && menu.sign!="portal"){
        		mainMenuHtml.push('<td width="180px">');
        		mainMenuHtml.push('<ul>');
        	if(programparas!=null&&programparas[menu.code]!=null){
        		menu.parameters = programparas[menu.code];
        	}else{
        		menu.parameters=[];
        	}
            /**根据不同业务系统类型进行特殊处理（1：b/s系统  2：c/s系统  3：日志类型-暂时不清楚有那个地方在使用）*/
            //未实现系统提示信息
            var promsg = "此系统还没有进行接入，无法进行单点登录";
            //如果是b/s系统
            if (menu.type == 1){
            	var formTarget = "_blank";
            	if(menu.opentype!=null&&menu.opentype==2){
            		formTarget = "";
            	}
            	 // begin 楚艳红 2012.12.10 获取客户端ip
            	var menurl = menu.url;
            	try{
            		if(menurl.indexOf("//")!=-1){
            			var murls = menurl.split("//")[1];
            			if(murls.indexOf(":")!=-1){
                    		var murl =murls.split(":")[1];
                    		if(menurl.indexOf("localhost")!=-1||menurl.indexOf("127.0.0.1")!=-1){
                    			menurl = "http://"+config.clientIp+":"+murl;
                    		}
            			}
                	}
            	}catch(e){
            		menurl = menu.url;
            	}
            	 // end 楚艳红 2012.12.10 获取客户端ip
                /**根据业务系统开发商进行区分（1：太极华清系统 2：龙图系统 4: 不同服务的一体化系统菜单 5：甘肃第三方业务系统不配合而自己开发的单点登录控件  6：未实现系统）*/
                //如果是不同服务的一体化系统菜单
                if (menu.tjhqprogram == 4){
                    //暂时不实现，不知道哪个地区在用
                //处理甘肃第三方业务系统不配合而自己开发的单点登录控件
                }else if (menu.tjhqprogram == 5){		                                       
                    //固定系统标识（甘肃某系统）
                    if (menu.sign == "cshxxt"){
                        //参数为用户编码与sessionId
                        mainMenuHtml.push('<li><a href="javascript:cshxxt(\'' + menu.sign + '\',\'uid=' + config.userCode + ' sid=' + config.session + 'LT\');">' + menu.name + '</a>┆</li>');
                    }
                    if(menu.sign == "jiuqizichan"){
	 	                //begin 添加久其资产单点登录   楚艳红 2012.09.14
	        			mainMenuHtml.push('<li><a href="javascript:special(\''+comUcode+'\',\''+comPassword+'\',\''+menurl +'\')" >' + menu.name + '</a>');
				 		mainMenuHtml.push('┆</li>');
				 		//end 添加久其资产单点登录   楚艳红 2012.09.14	
	        		 }
                    if(menu.sign=="xmemail"){
                    	var face = "XT3";
                    	for(var j = 0; j < menu.parameters.length; j++){
    			    	    var parameter = menu.parameters[j];
    			    	    if("face"==parameter.parametername){
    			    	    	face = parameter.parametervalue;
    			    	    }
    			    	    break;    				    	
    			    	}
                    	mainMenuHtml.push('<li><a href="javascript:clickEmail(\'' + config.cardCode + '\',\''+face+'\',\''+menurl+'\',\''+config.webservice+'\',\''+menu.code+'\')">' + menu.name + '</a>');                        
                    	// 将参数放到表单中提交
				    	mainMenuHtml.push('<form id="app' + menu.code + '" name="app' + menu.code + '" method="post" action="' + menurl + '"  target="_blank" style="display:none">'); 
                        mainMenuHtml.push('<input type="text" name="sid" value=""/></form>');
			    		mainMenuHtml.push('</li>');	
                    }
                //未实现业务系统）  
                }else if (menu.tjhqprogram == 6){
                    mainMenuHtml.push('<li><a href="#"');
				    mainMenuHtml.push(' onclick="javascript:alert(\'' + promsg + '\');">' + menu.name + '</a></li>');
                //ASP系统  
                }else if (menu.tjhqprogram == 7){
                	defaultHTML.push('<li><a href="#" onclick="bclick(\''+menu.code+'\');">' + menu.name + '</a>');
                    //将参数放到表单隐藏域中
	    			mainMenuHtml.push('<form id="app' + menu.code + '" name="app' + menu.code + '" method="get" action="' + menurl + '" style="display:none">');					    	//循环系统参数
			    	//循环系统参数
			    	for(var j = 0; j < menu.parameters.length; j++){
			    	    var parameter = menu.parameters[j];
				    	mainMenuHtml.push('<input type="text" name="' + parameter.parametername + '" value="' + parameter.parametervalue + '"/>');
			    	}
			    	//用户编码
				    mainMenuHtml.push('<input type="text" name="uid" value="' + config.userCode + '"/>');
				    //sessionId
				    mainMenuHtml.push('<input type="text" name="sid" value="' + config.session + '"/>');
				    //财政年度
				    mainMenuHtml.push('<input type="text" name="year" value="' + config.year + '"/></form>');
		    		mainMenuHtml.push('</li>');
                }else {
                    /**根据业务系统地址hosturl是否为空来特殊处理*/
                    //处理hosturl为不为空的业务系统，不清楚做什么用，这里暂时不实现
                    if (menu.hosturl != null){
                        //判断业务系统地址与门户服务地址是否一致
                        if (menu.hosturl == _ROOT_PATH_){
                        
                        }
                    //处理hosturl为空的业务系统，此处为正常的业务系统接入
                    }else{
                    //业务系统如果是用户支付3.0、福建横连系统、实体账户系统、打开页面不加_blank
                        if (menu.sign == "YYJZZF3.0" || menu.sign == "nftt" || menu.sign == "account"){
                        	defaultHTML.push('<li><a href="#" onclick="bclick(\''+menu.code+'\');">' + menu.name + '</a>');
                            //将参数放到表单隐藏域中
					    	mainMenuHtml.push('<form id="app' + menu.code + '" name="app' + menu.code + '" method="post" action="' + menurl + '" style="display:none">');					    	//循环系统参数
					    	//循环系统参数
					    	for(var j = 0; j < menu.parameters.length; j++){
					    	    var parameter = menu.parameters[j];
						    	mainMenuHtml.push('<input type="text" name="' + parameter.parametername + '" value="' + parameter.parametervalue + '"/>');
					    	}
					    	//用户编码
						    mainMenuHtml.push('<input type="text" name="uid" value="' + comUcode + '"/>');
						    //sessionId
						    mainMenuHtml.push('<input type="text" name="sid" value="' + config.session + '"/>');
						    //财政年度
						    mainMenuHtml.push('<input type="text" name="year" value="' + config.year + '"/></form>');
				    		mainMenuHtml.push('</li>');	
				    	//BO系统单点登录			    	
				        }else if (menu.sign == "BOZHCX"){
				            //需要实现----------------------------------
				        }else if(menu.sign == "xzd"){
					        //begin  湖南新中大单点登录调试  楚艳红 2012.09.17
				        	defaultHTML.push('<li><a href="#" onclick="bclick(\''+menu.code+'\');">' + menu.name + '</a>');
						    // 将参数放到表单中提交
						    mainMenuHtml.push('<form id="app' + menu.code + '" name="app' + menu.code + '" method="post" action="' + menurl + '" target="_blank" style="display:none">');
				     	    //用户编码
							mainMenuHtml.push('<input type="text" name="uid" value="' + config.userCode + '"/>');
							mainMenuHtml.push('<input type="text" name="name" value="' + config.name + '"/></form>');
					    	mainMenuHtml.push('</li>');	
					    	//end  湖南新中大单点登录调试  楚艳红 2012.09.17   
					    	//其他正常业务系统
				        }else {
                            mainMenuHtml.push('<li><a href="#" onclick="bclick(\''+menu.code+'\');">' + menu.name + '</a>');
					    	// 将参数放到表单中提交
					    	mainMenuHtml.push('<form id="app' + menu.code + '" name="app' + menu.code + '" method="post" action="' + menurl + '"  target="'+formTarget+'" style="display:none">');                            //循环系统参数
                            //循环系统参数
					    	for(var j = 0; j < menu.parameters.length; j++){
					    		var parameter = menu.parameters[j];
						    	mainMenuHtml.push('<input type="text" name="' + parameter.parametername + '" value="' + parameter.parametervalue + '"/>');
					    	}
					    	//用户编码
						    mainMenuHtml.push('<input type="text" name="uid" value="' + comUcode + '"/>');
						    //sessionId
						    mainMenuHtml.push('<input type="text" name="sid" value="' + config.session + '"/>');
						    //财政年度
						    mainMenuHtml.push('<input type="text" name="year" value="' + config.year + '"/></form>');
				    		mainMenuHtml.push('</li>');	
				        }
                    }
                
                }
            //cs系统
            }else if (menu.type == 2){
                 cscount=cscount+1;
                /**cs业务系统类型: 1:太极华清业务系统 */
                //太极华清业务系统
                if (menu.tjhqprogram == 1){
                    //华清预算编制单位版(efmdiv)或财政供养单位版(dfczdiv)
                    if(menu.sign == "efmdiv" || menu.sign == "dfczdiv"){
                        mainMenuHtml.push('<li><a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){loadAppcaller();AppCaller.callApp(\'');
                    //华清其他cs业务系统
                    }else {
                        mainMenuHtml.push('<li><a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){loadAppcaller();AppCaller.callHqApp(\'');
                    }
                    //业务系统标识
                    mainMenuHtml.push(menu.sign + '\',\'');
                    //存储业务系统对应数据库列表信息
                    var dbs = {};
                    //数据库查询参数对象
                    //var dbsConfig = {};
                    //业务系统编码
                   // dbsConfig.programCode = menu.code;
                    //财政年度
                    //dbsConfig.year = config.year;
                    //查询业务系统对应数据库信息
                   // dbs = Ext.lt.RCP.asynserver('defaultCommonService', "getDbConfig",  dbsConfig);
                    //存储业务系统对应子系统列表信息
                    var subPrograms = {};
                    //查询业务系统对应子系统信息
                    //subPrograms = Ext.lt.RCP.asynserver('defaultCommonService', "getSubPrograms",  menu.code);
                    var csParaMap = config.csParaMap;
                    if(csParaMap!=undefined){
                        for(var m = 0; m < csParaMap.length; m ++){
                        	if(csParaMap[m].menucode==menu.code){
                        		dbs = csParaMap[m].dbsList;
                        		subPrograms = csParaMap[m].subList;
                        	}
                        }
                    } 
                    //判断如果是部门预算的系统管理，也传exp
                    if(menu.sign == "expxtgl"){
                        //用户编码
                    	mainMenuHtml.push('|exp|' + comUcode.toLowerCase());
                    //指标系统系统管理
                    }else if(menu.sign == "indisys"){
                    	mainMenuHtml.push('|indi|' + comUcode.toLowerCase());
                    //正常华清业务系统
                    }else{
                    	mainMenuHtml.push('|' + menu.sign + '|' + comUcode.toLowerCase());
                    }
                    //如果华清系统配置了数据库参数，华清系统可能连接不同年度的数据库，默认取第一个
                    if(dbs.length > 0){
                        //业务系统数据库对象
                    	var db = dbs[0];
                    	mainMenuHtml.push('|' + db.dbstr);
                    }
                    //是否需要sessionID
                    if(menu.needsid ==1 ){
                    	mainMenuHtml.push('|' + config.session);
					}
					//组装业务系统参数
					for(var j = 0; j < menu.parameters.length; j++){
						mainMenuHtml.push('|' + menu.parameters[j].parametervalue);
					}
					mainMenuHtml.push('\');}">' + menu.name + '</a>');
					//如果业务系统存在多条数据库配置
					if(dbs.length>1){
					    //在菜单后放置一图标，支持鼠标放下事件，鼠标放下后弹出财政年度下拉选择框
						mainMenuHtml.push('&nbsp;<IMG id="img' + menu.code + '" alt="切换库" src="' + _ROOT_PATH_ + '/images/list.gif" style="margin-top:10px;cursor:pointer;" onmouseover="mvqMOv(\'img' + menu.code + '\',\'panelDiv' + menu.code + '\')";>');
						//弹出菜单样式div
						menudiv.push('<div id="panelDiv' + menu.code + '" style="position:absolute;visibility:hidden; z-index:1000; WIDTH: 90px; BORDER-RIGHT: #8BA3DA 1px solid; PADDING-RIGHT: 12px;BORDER-TOP: #8BA3DA 1px solid; PADDING-LEFT: 12px; PADDING-BOTTOM: 12px; BORDER-LEFT: #8BA3DA 1px solid; PADDING-TOP: 12px;BORDER-BOTTOM: #8BA3DA 1px solid; BACKGROUND-COLOR: #FFFFFF" onmouseover="panelMOv(\'panelDiv' + menu.code + '\');" onmouseout="panelMOu(\'panelDiv' + menu.code + '\');">');
						menudiv.push('<table width=100% >');
						menudiv.push('    <tr valign=top><td width=20% class="sngPst">');
						//循环遍历数据库信息
						for(var j = 0;j<dbs.length; j++){
						         //数据库对象
							     var db = dbs[j];
								 menudiv.push('<div class="divline" nowrap>');
								 //如果不存在子系统
								 if(subPrograms.length == 0){
			                        //判断是否是华清预算编制单位版(efmdiv)或财政供养单位版(dfczdiv)
			                        if(menu.sign == "efmdiv" || menu.sign == "dfczdiv"){
										 menudiv.push('<a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){loadAppcaller();AppCaller.callApp(\'');
			                        }else{
										 menudiv.push('<a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){loadAppcaller();AppCaller.callHqApp(\'');
			                        }
			                        menudiv.push(menu.sign + '\',\'');
									 //判断如果是部门预算的系统管理，也传exp
									 if(menu.sign == "expxtgl"){
                    					menudiv.push('|exp|' + comUcode.toLowerCase());
                    				//如果是指标系统的系统管理
                    				}else if(menu.sign == "indisys"){
                    					menudiv.push('|indi|' + comUcode.toLowerCase());
                    				}else if(menu.sign == "hqexp"){
                    					//内蒙古华清部门预算系统使用
                                    	mainMenuHtml.push('|efmis|' + comUcode.toLowerCase());
                                        //正常华清业务系统
                                    }else{
                    					menudiv.push('|' + menu.sign + '|' + comUcode.toLowerCase());
                    				}
                    				//数据库参数信息
	                        		menudiv.push('|' + db.dbstr);
	                        		//是否传递sessionID
	                        		if(menu.needsid == 1){
	                        		 	menudiv.push('|' + config.session);
	                        		}
									//组装业务系统参数
									for(var p = 0; p < menu.parameters.length; p++){
										menudiv.push('|' + menu.parameters[p].parametervalue);
									}
									menudiv.push('\');}">');
								 }
								 //数据库名称
								 menudiv.push(db.dbname);
								 //如果不存在子系统则结束拼装
								 if(subPrograms.length == 0){
								 	menudiv.push('</a>');
								 }
								 menudiv.push('</div>');
								 //如果存在子系统
								 for(var h = 0; h < subPrograms.length; h++){ 
								     //子系统对象
								     var subprogram = subPrograms[h];
									 menudiv.push('<div class="divline" nowrap>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:loadAppcaller();AppCaller.callHqApp(\'');
									 //业务系统标识
									 menudiv.push(menu.sign + '\',\'');
									 //判断如果是部门预算的系统管理，也传exp
									 if(menu.sign == "expxtgl"){
                    					menudiv.push('|exp|' + comUcode.toLowerCase());
                    				 //指标系统系统管理
                    				 }else if(menu.sign == "indisys"){
                    					 menudiv.push('|indi|' + comUcode.toLowerCase());
                    				 }else{
                    					 menudiv.push('|' + subprogram.sign + '|' + comUcode.toLowerCase());
                    				 }
                    				 //数据库参数		 
	                        		 menudiv.push('|' + db.dbstr);
	                        		 //如果需要sessionID
	                        		 if(menu.needsid == 1){
	                        		     menudiv.push('|' + config.session);
	                        		 }
									 menudiv.push('\');"> ' + subprogram.name + '</a></div>');
								 }   
						}
						menudiv.push('</td>');
						menudiv.push('</tr>');
						menudiv.push('</table>');
						menudiv.push('</div>');
					}
					mainMenuHtml.push('</li>');
					//判断Tjhqprogram为5的，是调用新控件的地方，拼成的连接地址,甘肃某系统
                }else if (menu.tjhqprogram == 5){
                     //根据系统标识判断
                     if(menu.sign == "yszxxt1"){
                     	mainMenuHtml.push('<li><a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){yszxxt1(\'');
                     	//系统标识
                     	mainMenuHtml.push(menu.sign + '\',\'');
                     	//用户编码+sessionID
				        mainMenuHtml.push('uid=' + config.userCode + ' sid=' + config.session + 'LT\'');
                     	mainMenuHtml.push(');}"> ' + menu.name + '</a>');
						mainMenuHtml.push('</li>');
                     }
                     if(menu.sign == "yszxxt2"){
                     	mainMenuHtml.push('<li><a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){yszxxt2(\'');
                     	//系统标识
                     	mainMenuHtml.push(menu.sign + '\',\'');
                     	//用户编码+sessionID
				        mainMenuHtml.push('uid=' + config.userCode + ' sid=' + config.session + 'LT\'');
                     	mainMenuHtml.push(');}"> ' + menu.name + '</a>');
						mainMenuHtml.push('</li>');
                     }
                     if(menu.sign == "jzzfdw"){
                     	mainMenuHtml.push('<li><a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){jzzfdw(\'');
                     	//系统标识
                     	mainMenuHtml.push(menu.sign + '\',\'');
                     	//用户编码+sessionID
				        mainMenuHtml.push('uid=' + config.userCode + ' sid=' + config.session + 'LT\'');
                     	mainMenuHtml.push(');}"> ' + menu.name + '</a>');
						mainMenuHtml.push('</li>');
                     }
                     if(menu.sign == "gwkzf"){
	                        mainMenuHtml.push('<li><a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){gwkzf(\'');
	                     	//系统标识
	                     	mainMenuHtml.push(menu.sign + '\',\'');
	                     	//用户编码+sessionID
					        mainMenuHtml.push('uid=' + config.userCode + ' sid=' + config.session + 'LT\'');
	                     	mainMenuHtml.push(');}"> ' + menu.name + '</a>');
							mainMenuHtml.push('</li>');
                     }if(menu.sign == "jzzfdws"){
                     	 mainMenuHtml.push('<li><a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){jzzfdws(\'');
                     	//系统标识
                     	mainMenuHtml.push(menu.sign + '\',\'');
                     	//用户编码+sessionID
				        mainMenuHtml.push('uid=' + config.userCode + ' sid=' + config.session + 'LT\'');
                     	mainMenuHtml.push(');}"> ' + menu.name + '</a>');
						mainMenuHtml.push('</li>');
                     }
                //未实现系统
                }else if (menu.tjhqprogram == 6){
                 	mainMenuHtml.push('<li><a href="javascript:alert(\'' + promsg + '\'');
                 	mainMenuHtml.push(');"> ' + menu.name + '</a>');
					mainMenuHtml.push('</li>');
				//其他cs业务系统
                }else {
                        //龙图平台客户端系统
                        if(menu.hosturl != null){
	                            mainMenuHtml.push('<li><a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){loadAppcaller();AppCaller.callApp(\'');
	                            mainMenuHtml.push(menu.sign + '\',\'');
			                    mainMenuHtml.push('uid=' + comUcode + ' sid=' + config.session + 'LT');
								for(var j = 0; j < menu.parameters.length; j++){
								    mainMenuHtml.push(' ');
	                                mainMenuHtml.push(menu.parameters[j].parametername + '=' + menu.parameters[j].parametervalue);
								}
								mainMenuHtml.push('\');}"> ' + menu.name + '</a>');
								mainMenuHtml.push('</li>');
						//其他业务系统
			            }else {
	                            mainMenuHtml.push('<li><a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){loadAppcaller();AppCaller.callApp(\'');
	                            mainMenuHtml.push(menu.sign + '\',\'');
			                    mainMenuHtml.push('uid=' + comUcode + ' sid=' + config.session);
								for(var j = 0; j < menu.parameters.length; j++){
								    mainMenuHtml.push(' ');
	                                mainMenuHtml.push(menu.parameters[j].parametername + '=' + menu.parameters[j].parametervalue);
								}
								mainMenuHtml.push('\');}"> ' + menu.name + '</a>');
								mainMenuHtml.push('</li>');
			            }
                }
            
            } //CS业务系统还是BS业务系统
            //break;
        }        	
        }
        
        if((leftprogramObj[menu.menuid+"-"+1] && leftprogramObj[menu.menuid+"-"+1].CODETYPE == 1 )||(leftprogramObj[menu.code+"-"+0]  && menu.sign!="portal")){
	        mainMenuHtml.push('</ul>');
	    	mainMenuHtml.push('</td>');
	       
	    	if(a%4==3){
	    		mainMenuHtml.push('</tr>');
	    	}
	    	a++;
        }
	}	
	
	mainMenuHtml.push('</table>');
	mainMenuHtml.push('</div>');
	mainMenuHtml.push('</td>');
	mainMenuHtml.push('</tr>');
	mainMenuHtml.push('</table>');
	mainMenuHtml.push('</div>');
	mainMenuHtml.push('</div>');	
	}else{
	//菜单表格区域
	mainMenuHtml.push('<div id="menu" >');
    mainMenuHtml.push('<table width="100%" border="0" cellspacing="0" cellpadding="0"">');
	mainMenuHtml.push('    <tr>');
	//判断菜单单行显示还是多行显示，true:多行显示 false:单行显示
	//如果是单行显示
	if (config.isshowmenus == "false"){
	    //向前显示图标
	    mainMenuHtml.push('<td width="20px" style="color:#FFFFFF;"><img src="' + _ROOT_PATH_ + '/images/done_btn/pre.gif" style="cursor:pointer;" title="向前" onclick="showPre()"/></td>');
	}
	//具体菜单项
	mainMenuHtml.push('<td>');
	mainMenuHtml.push('    <div id = "idd" style="overflow:hidden; width:expression(document.body.offsetWidth-40);">');
	mainMenuHtml.push('    <ul id="m_ul">');
    mainMenuHtml.push('        <li style="">┆</li>'); 
    /**开始插入系统菜单信息*/
    //菜单能承受的最大宽度
    var menuwidth = window.screen.width - 50;
    //实际菜单宽度
    var menulength = 1;
    //用户对照对象
    var userComObj = new Array();
    //接入系统的参数 
    var programparas = config.programparas;
    for (var i = 0; i < config.totalmenus.length; i++){
        //菜单对象 
        var menu = config.totalmenus[i]
        //计算菜单宽度
        menulength = menulength + menu.name.length+1;
//        var menuL = menu.name.replace(/[^\x00-\xff]/g, '__').length;
//        menulength = menulength + Math.ceil(menuL/2) +0.9; 
        //用户对照信息
        var userCompare = config.userCompare;
        for(var j = 0; j < userCompare.length; j++){
        	userComObj[userCompare[j].BUSIGN] = userCompare[j];
        }
        //判断用户对照信息是否存在，如果存在则修改
        var comUcode = config.userCode;
        var comPassword = "";
        if(userComObj[menu.sign]){
        	comUcode = userComObj[menu.sign].BUCODE;
        	if(userComObj[menu.sign].BUPASSWORD != null){
        	    comPassword = userComObj[menu.sign].BUPASSWORD;
            }
        	
        }
        //如果是多行显示  
        if (config.isshowmenus == "true"){
            //处理换行
			if(menulength*16>=menuwidth){
				//换行
				mainMenuHtml.push('<br><li>┆</li>');
				menulength=1;
			}
        }
        //如果是一体化菜单
        if(menu.menuid){
        	if(menu.menuid==41000){
	            mainMenuHtml.push('<li><a href="' + _ROOT_PATH_ + menu.clientmodule+'?mainmenu=' + menu.menuid + '" target="_blank">' + menu.name + '</a>┆</li>');
        	}else{
	            mainMenuHtml.push('<li><a href="' + _ROOT_PATH_ + menu.clientmodule+'?mainmenu=' + menu.menuid + '">' + menu.name + '</a>┆</li>');
        	}
        //如果是接入菜单
        }else {
        	if(programparas!=null&&programparas[menu.code]!=null){
        		menu.parameters = programparas[menu.code];
        	}else{
        		menu.parameters=[];
        	}
            /**根据不同业务系统类型进行特殊处理（1：b/s系统  2：c/s系统  3：日志类型-暂时不清楚有那个地方在使用）*/
            //未实现系统提示信息
            var promsg = "此系统还没有进行接入，无法进行单点登录";
            //如果是b/s系统
            if (menu.type == 1){
            	var formTarget = "_blank";
            	if(menu.opentype!=null&&menu.opentype==2){
            		formTarget = "";
            	}
            	 // begin 楚艳红 2012.12.10 获取客户端ip
            	var menurl = menu.url;
            	try{
            		if(menurl.indexOf("//")!=-1){
            			var murls = menurl.split("//")[1];
            			if(murls.indexOf(":")!=-1){
                    		var murl =murls.split(":")[1];
                    		if(menurl.indexOf("localhost")!=-1||menurl.indexOf("127.0.0.1")!=-1){
                    			menurl = "http://"+config.clientIp+":"+murl;
                    		}
            			}
                	}
            	}catch(e){
            		menurl = menu.url;
            	}
            	 // end 楚艳红 2012.12.10 获取客户端ip
                /**根据业务系统开发商进行区分（1：太极华清系统 2：龙图系统 4: 不同服务的一体化系统菜单 5：甘肃第三方业务系统不配合而自己开发的单点登录控件  6：未实现系统）*/
                //如果是不同服务的一体化系统菜单
                if (menu.tjhqprogram == 4){
                    //暂时不实现，不知道哪个地区在用
                //处理甘肃第三方业务系统不配合而自己开发的单点登录控件
                }else if (menu.tjhqprogram == 5){		                                       
                    //固定系统标识（甘肃某系统）
                    if (menu.sign == "cshxxt"){
                        //参数为用户编码与sessionId
                        mainMenuHtml.push('<li><a href="javascript:cshxxt(\'' + menu.sign + '\',\'uid=' + config.userCode + ' sid=' + config.session + 'LT\');">' + menu.name + '</a>┆</li>');
                    }
                    if(menu.sign == "jiuqizichan"){
	 	                //begin 添加久其资产单点登录   楚艳红 2012.09.14
	        			mainMenuHtml.push('<li><a href="javascript:special(\''+comUcode+'\',\''+comPassword+'\',\''+menurl +'\')" >' + menu.name + '</a>');
				 		mainMenuHtml.push('┆</li>');
				 		//end 添加久其资产单点登录   楚艳红 2012.09.14	
	        		 }
                    if(menu.sign=="xmemail"){
                    	var face = "XT3";
                    	for(var j = 0; j < menu.parameters.length; j++){
    			    	    var parameter = menu.parameters[j];
    			    	    if("face"==parameter.parametername){
    			    	    	face = parameter.parametervalue;
    			    	    }
    			    	    break;    				    	
    			    	}
                    	mainMenuHtml.push('<li><a href="javascript:clickEmail(\'' + config.cardCode + '\',\''+face+'\',\''+menurl+'\',\''+config.webservice+'\',\''+menu.code+'\')">' + menu.name + '</a>');                        
                    	// 将参数放到表单中提交
				    	mainMenuHtml.push('<form id="app' + menu.code + '" name="app' + menu.code + '" method="post" action="' + menurl + '"  target="_blank" style="display:none">'); 
                        mainMenuHtml.push('<input type="text" name="sid" value=""/></form>');
			    		mainMenuHtml.push('┆</li>');	
                    }
                //未实现业务系统）  
                }else if (menu.tjhqprogram == 6){
                    mainMenuHtml.push('<li><a href="#"');
				    mainMenuHtml.push(' onclick="javascript:alert(\'' + promsg + '\');">' + menu.name + '</a>┆</li>');
                //ASP系统  
                }else if (menu.tjhqprogram == 7){
                	mainMenuHtml.push('<li><a href="#" onclick="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){app' + menu.code + '.submit();return false;}">' + menu.name + '</a>');
                    //将参数放到表单隐藏域中
	    			mainMenuHtml.push('<form id="app' + menu.code + '" name="app' + menu.code + '" method="get" action="' + menurl + '" style="display:none">');					    	//循环系统参数
			    	//循环系统参数
			    	for(var j = 0; j < menu.parameters.length; j++){
			    	    var parameter = menu.parameters[j];
				    	mainMenuHtml.push('<input type="text" name="' + parameter.parametername + '" value="' + parameter.parametervalue + '"/>');
			    	}
			    	//用户编码
				    mainMenuHtml.push('<input type="text" name="uid" value="' + config.userCode + '"/>');
				    //sessionId
				    mainMenuHtml.push('<input type="text" name="sid" value="' + config.session + '"/>');
				    //财政年度
				    mainMenuHtml.push('<input type="text" name="year" value="' + config.year + '"/></form>');
		    		mainMenuHtml.push('┆</li>');
                }else {
                    /**根据业务系统地址hosturl是否为空来特殊处理*/
                    //处理hosturl为不为空的业务系统，不清楚做什么用，这里暂时不实现
                    if (menu.hosturl != null){
                        //判断业务系统地址与门户服务地址是否一致
                        if (menu.hosturl == _ROOT_PATH_){
                        
                        }
                    //处理hosturl为空的业务系统，此处为正常的业务系统接入
                    }else{
                    //业务系统如果是用户支付3.0、福建横连系统、实体账户系统、打开页面不加_blank
                        if (menu.sign == "YYJZZF3.0" || menu.sign == "nftt" || menu.sign == "account"){
                            mainMenuHtml.push('<li><a href="#" onclick="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){app' + menu.code + '.submit();return false;}">' + menu.name + '</a>');
                            //将参数放到表单隐藏域中
					    	mainMenuHtml.push('<form id="app' + menu.code + '" name="app' + menu.code + '" method="post" action="' + menurl + '" style="display:none">');					    	//循环系统参数
					    	//循环系统参数
					    	for(var j = 0; j < menu.parameters.length; j++){
					    	    var parameter = menu.parameters[j];
						    	mainMenuHtml.push('<input type="text" name="' + parameter.parametername + '" value="' + parameter.parametervalue + '"/>');
					    	}
					    	//用户编码
						    mainMenuHtml.push('<input type="text" name="uid" value="' + comUcode + '"/>');
						    //sessionId
						    mainMenuHtml.push('<input type="text" name="sid" value="' + config.session + '"/>');
						    //财政年度
						    mainMenuHtml.push('<input type="text" name="year" value="' + config.year + '"/></form>');
				    		mainMenuHtml.push('┆</li>');	
				    	//BO系统单点登录			    	
				        }else if (menu.sign == "BOZHCX"){
				            //需要实现----------------------------------
				        }else if(menu.sign == "xzd"){
					        //begin  湖南新中大单点登录调试  楚艳红 2012.09.17
					        mainMenuHtml.push('<li><a href="#" onclick="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){app' + menu.code + '.submit();return false;}">' + menu.name + '</a>');
						    // 将参数放到表单中提交
						    mainMenuHtml.push('<form id="app' + menu.code + '" name="app' + menu.code + '" method="post" action="' + menurl + '" target="_blank" style="display:none">');
				     	    //用户编码
							mainMenuHtml.push('<input type="text" name="uid" value="' + config.userCode + '"/>');
							mainMenuHtml.push('<input type="text" name="name" value="' + config.name + '"/></form>');
					    	mainMenuHtml.push('┆</li>');	
					    	//end  湖南新中大单点登录调试  楚艳红 2012.09.17   
					    	//其他正常业务系统
				        }else {
                            mainMenuHtml.push('<li><a href="#" onclick="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){app' + menu.code + '.submit();return false;}">' + menu.name + '</a>');
					    	// 将参数放到表单中提交
					    	mainMenuHtml.push('<form id="app' + menu.code + '" name="app' + menu.code + '" method="post" action="' + menurl + '"  target="'+formTarget+'" style="display:none">');                            //循环系统参数
                            //循环系统参数
					    	for(var j = 0; j < menu.parameters.length; j++){
					    		var parameter = menu.parameters[j];
						    	mainMenuHtml.push('<input type="text" name="' + parameter.parametername + '" value="' + parameter.parametervalue + '"/>');
					    	}
					    	//用户编码
						    mainMenuHtml.push('<input type="text" name="uid" value="' + comUcode + '"/>');
						    //sessionId
						    mainMenuHtml.push('<input type="text" name="sid" value="' + config.session + '"/>');
						    //财政年度
						    mainMenuHtml.push('<input type="text" name="year" value="' + config.year + '"/></form>');
				    		mainMenuHtml.push('┆</li>');	
				        }
                    }
                
                }
            //cs系统
            }else if (menu.type == 2){
                 cscount=cscount+1;
                /**cs业务系统类型: 1:太极华清业务系统 */
                //太极华清业务系统
                if (menu.tjhqprogram == 1){
                    //华清预算编制单位版(efmdiv)或财政供养单位版(dfczdiv)
                    if(menu.sign == "efmdiv" || menu.sign == "dfczdiv"){
                        mainMenuHtml.push('<li><a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){loadAppcaller();AppCaller.callApp(\'');
                    //华清其他cs业务系统
                    }else {
                        mainMenuHtml.push('<li><a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){loadAppcaller();AppCaller.callHqApp(\'');
                    }
                    //业务系统标识
                    mainMenuHtml.push(menu.sign + '\',\'');
                    //存储业务系统对应数据库列表信息
                    var dbs = {};
                    //数据库查询参数对象
                    //var dbsConfig = {};
                    //业务系统编码
                   // dbsConfig.programCode = menu.code;
                    //财政年度
                    //dbsConfig.year = config.year;
                    //查询业务系统对应数据库信息
                   // dbs = Ext.lt.RCP.asynserver('defaultCommonService', "getDbConfig",  dbsConfig);
                    //存储业务系统对应子系统列表信息
                    var subPrograms = {};
                    //查询业务系统对应子系统信息
                    //subPrograms = Ext.lt.RCP.asynserver('defaultCommonService', "getSubPrograms",  menu.code);
                    var csParaMap = config.csParaMap;
                    if(csParaMap!=undefined){
                        for(var m = 0; m < csParaMap.length; m ++){
                        	if(csParaMap[m].menucode==menu.code){
                        		dbs = csParaMap[m].dbsList;
                        		subPrograms = csParaMap[m].subList;
                        	}
                        }
                    } 
                    //判断如果是部门预算的系统管理，也传exp
                    if(menu.sign == "expxtgl"){
                        //用户编码
                    	mainMenuHtml.push('|exp|' + comUcode.toLowerCase());
                    //指标系统系统管理
                    }else if(menu.sign == "indisys"){
                    	mainMenuHtml.push('|indi|' + comUcode.toLowerCase());
                    //正常华清业务系统
                    }else{
                    	mainMenuHtml.push('|' + menu.sign + '|' + comUcode.toLowerCase());
                    }
                    //如果华清系统配置了数据库参数，华清系统可能连接不同年度的数据库，默认取第一个
                    if(dbs.length > 0){
                        //业务系统数据库对象
                    	var db = dbs[0];
                    	mainMenuHtml.push('|' + db.dbstr);
                    }
                    //是否需要sessionID
                    if(menu.needsid ==1 ){
                    	mainMenuHtml.push('|' + config.session);
					}
					//组装业务系统参数
					for(var j = 0; j < menu.parameters.length; j++){
						mainMenuHtml.push('|' + menu.parameters[j].parametervalue);
					}
					mainMenuHtml.push('\');}">' + menu.name + '</a>');
					//如果业务系统存在多条数据库配置
					if(dbs.length>1){
					    //在菜单后放置一图标，支持鼠标放下事件，鼠标放下后弹出财政年度下拉选择框
						mainMenuHtml.push('&nbsp;<IMG id="img' + menu.code + '" alt="切换库" src="' + _ROOT_PATH_ + '/images/list.gif" style="margin-top:10px;cursor:pointer;" onmouseover="mvqMOv(\'img' + menu.code + '\',\'panelDiv' + menu.code + '\')";>');
						//弹出菜单样式div
						menudiv.push('<div id="panelDiv' + menu.code + '" style="position:absolute;visibility:hidden; z-index:1000; WIDTH: 90px; BORDER-RIGHT: #8BA3DA 1px solid; PADDING-RIGHT: 12px;BORDER-TOP: #8BA3DA 1px solid; PADDING-LEFT: 12px; PADDING-BOTTOM: 12px; BORDER-LEFT: #8BA3DA 1px solid; PADDING-TOP: 12px;BORDER-BOTTOM: #8BA3DA 1px solid; BACKGROUND-COLOR: #FFFFFF" onmouseover="panelMOv(\'panelDiv' + menu.code + '\');" onmouseout="panelMOu(\'panelDiv' + menu.code + '\');">');
						menudiv.push('<table width=100% >');
						menudiv.push('    <tr valign=top><td width=20% class="sngPst">');
						//循环遍历数据库信息
						for(var j = 0;j<dbs.length; j++){
						         //数据库对象
							     var db = dbs[j];
								 menudiv.push('<div class="divline" nowrap>');
								 //如果不存在子系统
								 if(subPrograms.length == 0){
			                        //判断是否是华清预算编制单位版(efmdiv)或财政供养单位版(dfczdiv)
			                        if(menu.sign == "efmdiv" || menu.sign == "dfczdiv"){
										 menudiv.push('<a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){loadAppcaller();AppCaller.callApp(\'');
			                        }else{
										 menudiv.push('<a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){loadAppcaller();AppCaller.callHqApp(\'');
			                        }
			                        menudiv.push(menu.sign + '\',\'');
									 //判断如果是部门预算的系统管理，也传exp
									 if(menu.sign == "expxtgl"){
                    					menudiv.push('|exp|' + comUcode.toLowerCase());
                    				//如果是指标系统的系统管理
                    				}else if(menu.sign == "indisys"){
                    					menudiv.push('|indi|' + comUcode.toLowerCase());
                    				}else if(menu.sign == "hqexp"){
                    					//内蒙古华清部门预算系统使用
                                    	mainMenuHtml.push('|efmis|' + comUcode.toLowerCase());
                                        //正常华清业务系统
                                    }else{
                    					menudiv.push('|' + menu.sign + '|' + comUcode.toLowerCase());
                    				}
                    				//数据库参数信息
	                        		menudiv.push('|' + db.dbstr);
	                        		//是否传递sessionID
	                        		if(menu.needsid == 1){
	                        		 	menudiv.push('|' + config.session);
	                        		}
									//组装业务系统参数
									for(var p = 0; p < menu.parameters.length; p++){
										menudiv.push('|' + menu.parameters[p].parametervalue);
									}
									menudiv.push('\');}">');
								 }
								 //数据库名称
								 menudiv.push(db.dbname);
								 //如果不存在子系统则结束拼装
								 if(subPrograms.length == 0){
								 	menudiv.push('</a>');
								 }
								 menudiv.push('</div>');
								 //如果存在子系统
								 for(var h = 0; h < subPrograms.length; h++){ 
								     //子系统对象
								     var subprogram = subPrograms[h];
									 menudiv.push('<div class="divline" nowrap>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:loadAppcaller();AppCaller.callHqApp(\'');
									 //业务系统标识
									 menudiv.push(menu.sign + '\',\'');
									 //判断如果是部门预算的系统管理，也传exp
									 if(menu.sign == "expxtgl"){
                    					menudiv.push('|exp|' + comUcode.toLowerCase());
                    				 //指标系统系统管理
                    				 }else if(menu.sign == "indisys"){
                    					 menudiv.push('|indi|' + comUcode.toLowerCase());
                    				 }else{
                    					 menudiv.push('|' + subprogram.sign + '|' + comUcode.toLowerCase());
                    				 }
                    				 //数据库参数		 
	                        		 menudiv.push('|' + db.dbstr);
	                        		 //如果需要sessionID
	                        		 if(menu.needsid == 1){
	                        		     menudiv.push('|' + config.session);
	                        		 }
									 menudiv.push('\');"> ' + subprogram.name + '</a></div>');
								 }   
						}
						menudiv.push('</td>');
						menudiv.push('</tr>');
						menudiv.push('</table>');
						menudiv.push('</div>');
					}
					mainMenuHtml.push('┆</li>');
					//判断Tjhqprogram为5的，是调用新控件的地方，拼成的连接地址,甘肃某系统
                }else if (menu.tjhqprogram == 5){
                     //根据系统标识判断
                     if(menu.sign == "yszxxt1"){
                     	mainMenuHtml.push('<li><a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){yszxxt1(\'');
                     	//系统标识
                     	mainMenuHtml.push(menu.sign + '\',\'');
                     	//用户编码+sessionID
				        mainMenuHtml.push('uid=' + config.userCode + ' sid=' + config.session + 'LT\'');
                     	mainMenuHtml.push(');}"> ' + menu.name + '</a>');
						mainMenuHtml.push('┆</li>');
                     }
                     if(menu.sign == "yszxxt2"){
                     	mainMenuHtml.push('<li><a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){yszxxt2(\'');
                     	//系统标识
                     	mainMenuHtml.push(menu.sign + '\',\'');
                     	//用户编码+sessionID
				        mainMenuHtml.push('uid=' + config.userCode + ' sid=' + config.session + 'LT\'');
                     	mainMenuHtml.push(');}"> ' + menu.name + '</a>');
						mainMenuHtml.push('┆</li>');
                     }
                     if(menu.sign == "jzzfdw"){
                     	mainMenuHtml.push('<li><a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){jzzfdw(\'');
                     	//系统标识
                     	mainMenuHtml.push(menu.sign + '\',\'');
                     	//用户编码+sessionID
				        mainMenuHtml.push('uid=' + config.userCode + ' sid=' + config.session + 'LT\'');
                     	mainMenuHtml.push(');}"> ' + menu.name + '</a>');
						mainMenuHtml.push('┆</li>');
                     }
                     if(menu.sign == "gwkzf"){
	                        mainMenuHtml.push('<li><a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){gwkzf(\'');
	                     	//系统标识
	                     	mainMenuHtml.push(menu.sign + '\',\'');
	                     	//用户编码+sessionID
					        mainMenuHtml.push('uid=' + config.userCode + ' sid=' + config.session + 'LT\'');
	                     	mainMenuHtml.push(');}"> ' + menu.name + '</a>');
							mainMenuHtml.push('┆</li>');
                     }if(menu.sign == "jzzfdws"){
                     	 mainMenuHtml.push('<li><a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){jzzfdws(\'');
                     	//系统标识
                     	mainMenuHtml.push(menu.sign + '\',\'');
                     	//用户编码+sessionID
				        mainMenuHtml.push('uid=' + config.userCode + ' sid=' + config.session + 'LT\'');
                     	mainMenuHtml.push(');}"> ' + menu.name + '</a>');
						mainMenuHtml.push('┆</li>');
                     }
                //未实现系统
                }else if (menu.tjhqprogram == 6){
                 	mainMenuHtml.push('<li><a href="javascript:alert(\'' + promsg + '\'');
                 	mainMenuHtml.push(');"> ' + menu.name + '</a>');
					mainMenuHtml.push('┆</li>');
				//其他cs业务系统
                }else {
                        //龙图平台客户端系统
                        if(menu.hosturl != null){
	                            mainMenuHtml.push('<li><a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){loadAppcaller();AppCaller.callApp(\'');
	                            mainMenuHtml.push(menu.sign + '\',\'');
			                    mainMenuHtml.push('uid=' + comUcode + ' sid=' + config.session + 'LT');
								for(var j = 0; j < menu.parameters.length; j++){
								    mainMenuHtml.push(' ');
	                                mainMenuHtml.push(menu.parameters[j].parametername + '=' + menu.parameters[j].parametervalue);
								}
								mainMenuHtml.push('\');}"> ' + menu.name + '</a>');
								mainMenuHtml.push('┆</li>');
						//其他业务系统
			            }else {
	                            mainMenuHtml.push('<li><a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){loadAppcaller();AppCaller.callApp(\'');
	                            mainMenuHtml.push(menu.sign + '\',\'');
			                    mainMenuHtml.push('uid=' + comUcode + ' sid=' + config.session);
								for(var j = 0; j < menu.parameters.length; j++){
								    mainMenuHtml.push(' ');
	                                mainMenuHtml.push(menu.parameters[j].parametername + '=' + menu.parameters[j].parametervalue);
								}
								mainMenuHtml.push('\');}"> ' + menu.name + '</a>');
								mainMenuHtml.push('┆</li>');
			            }
                }
            
            } //CS业务系统还是BS业务系统
        } //一体化菜单还是接入菜单
    } //循环遍历所有菜单
    if(cscount>0){
    	 if (config.isshowmenus == "true"){
             //处理换行
 			if(menulength*16>=menuwidth){
 				//换行
 				mainMenuHtml.push('<br><li>┆</li>');
 				menulength=1;
 			}
         }
    	//begin 楚艳红 2012.12.06 业务程序地址改为弹出框
    	mainMenuHtml.push('<li><a href="#" onclick="openApp();"> 业务程序地址管理</a>┆</li>');
    	//end 楚艳红 2012.12.06 业务程序地址改为弹出框
    }
    mainMenuHtml.push('    </ul>');
    //放置华清业务系统多库多子系统弹出菜单
    mainMenuHtml.push('        <div id="panelDiv">' + menudiv.join('') + '</div>');
    mainMenuHtml.push('	   </div>');  
	mainMenuHtml.push('</td>');
	//如果是单行显示,则显示向后的箭头
	if (config.isshowmenus == "false"){
	    mainMenuHtml.push('<td width="20px"><img src="' + _ROOT_PATH_ + '/images/done_btn/next.gif" style="cursor:pointer;" title="向后" onclick="showNext()"/></td>');	
	}
	mainMenuHtml.push('</tr>');
	mainMenuHtml.push('</table>');
	mainMenuHtml.push('</div>');
	}
	return mainMenuHtml.join('');
	
};

Ext.lt.portal.component.menu = new function () {
	this.config="";
	this.showMenu=function(divid,config){
		var mainMenuHtml = mainMenuShow(config);
	    document.getElementById(divid).innerHTML=mainMenuHtml;
	};
}

/**动态加载appcaller控件*/
function loadAppcaller(){
	Ext.lt.ifmis.activex.loadAppCallerOcx();
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
			_msgbox=document.getElementById('eMengbg');
			//_msgbox=document.createElement('DIV');
			//_msgbox.id='eMengbg';
			//_msgbox.style.cssText='display:none;bottom:0;right:0;background:url(/portal/images/msgImages/wininfo_k.png); Z-INDEX:999;  no-repeat left top; width:278px; height:193px; POSITION: absolute;overflow:hidden; ';
			//document.body.appendChild(_msgbox);
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
			 var msghtml = '<font color=#155402>&nbsp&nbsp发送人：'+message.sendname+'</font><br><a id="msglink" target="_blank"  href="'+message.linkname+'">&nbsp&nbsp消息内容：'+message.content+'</a>';
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
					if(resp!=null&&resp.msgList!=null){
						param.msgList = resp.msgList; 
						Ext.lt.RCP.server('rightnowmessage', "saveAllMessage", param, function (resp) {startCheckMsg();
						},function(){startCheckMsg();});
					}
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

//在线人数统计
Ext.lt.portal.component.onlineuser=function(){
	//到服务端确认在线并获取最新在线人数
	function checkOnline(){
		Ext.lt.RCP.server('onlineservice', "checkOnline",  null, 
		function (resp) {
			startCheckOnline();
		},
		// 如果失败，则重新启动定时器
		function(){startCheckOnline()});
	}
	// 启动定时器
	function startCheckOnline(){
		if(onlinetime==null)
			onlinetime=300000;
		window.setTimeout(checkOnline,onlinetime);
	}
	checkOnline();
}

//begin 楚艳红 2012.12.06 业务程序地址改为弹出框
function openApp(){
		window.showModalDialog(ROOT_PATH+"/common/applocation.do","","dialogWidth:646px;dialogHeight:442px;center:yes;help:no;resizable:no;status:no");
	}
//end 楚艳红 2012.12.06 业务程序地址改为弹出框

//退出
function IsLogout(caUkeycheck,ischeckpengding){
	//山西ca认证登录需要在统一认证平台注销
	var config = Ext.lt.portal.component.menu.config;
	var exiturl = config.exiturl;
	if(ischeckpengding == "true"){//检测是否还有待办
		checkTask(caUkeycheck);
	}else if(caUkeycheck == "1"){//厦门退出时启用UKEY检查
		checkXMUeky(caUkeycheck);
	}else if(exiturl){
		ATL1.setpinstate();
		ATL1.clearssl();
		window.location.href = _ROOT_PATH_+"/logout.page";
	}else{
	window.location.href = _ROOT_PATH_+"/logout.page";
	}	
}
//begin 楚艳红 2012.11.21 退出时检测是否有无待办事项
function checkTask(caUkeycheck){
	var config = Ext.lt.portal.component.menu.config;
	var menuid = "";
	var hosturl = "";
	//链接地址
	var clientmodules = "";
	//菜单编码
	var meunname = "";
	//业务系统类型
	var type = "";
	//用户编码
	var uid = config.userCode;
	//sessionID 
	var sid = config.session;
	//财政年度
	var year = config.year;	
	//循环遍历子系统信息
	for (var i = 0; i < config.totalmenus.length; i ++){
		var menu = config.totalmenus[i];
        //如果是生长业务系统
        if (menu.menuid){
        	clientmodules += menu.clientmodule + ";";
            //菜单编码
    		menuid += menu.menuid + ";";
    		//业务系统地址
    		hosturl += "0" + ";";
    		//菜单名称
    		meunname += menu.name + ";";
    		//业务系统类型：一体化不同不无业务系统接入及一体化本身业务系统类型
    		type += 4 + ";";
		}else{
        	//如果接入业务系统需要展示待办事项
			if (menu.haspendingtask) {		   
			//菜单链接
			clientmodules +="null;";
		    //业务系统编码
			menuid += menu.code + ";";
			//业务系统地址
			hosturl += menu.hosturl + ";";
			//业务系统名称
			meunname += menu.name + ";";
			//业务系统类型
			type += menu.tjhqprogram + ";";
			}
		}
     }
	 var pdtPara = {};
     //菜单编码
     pdtPara.menuid = menuid;
     //系统链接
     pdtPara.clientmodules = clientmodules;
     //业务系统地址
     pdtPara.hosturl = hosturl;
     //业务系统名称
     pdtPara.meunname = meunname;
     //业务系统类型
     pdtPara.type = type;
     //用户编码
     pdtPara.uid = uid;
     //sessionID
     pdtPara.sid = sid;
     //财政年度
     pdtPara.year = year;
     //查询待办事项信息
     Ext.lt.RCP.server('defaultCommonService', "CheckPendingTask",  pdtPara, function (resp) {
    	 if(resp!=null&&resp!=""&&resp.length > 0){
     	 	 if(confirm("还有待办事项未处理，是否退出?")){
     	 	 	checkXMUeky(caUkeycheck);
     	 	 }
	      }else{
	  		checkXMUeky(caUkeycheck);
	      }
      },function (resp){
			checkXMUeky(caUkeycheck);
      });
}
//end 楚艳红 2012.11.21 退出时检测是否有无待办事项

//厦门退出时启用UKEY检查
function checkXMUeky(caUkeycheck){
	if(caUkeycheck != "1"){
		window.location.href = _ROOT_PATH_+"/logout.page";
	}
	var res = false;
	try{
		var sign = 5;
		sign = ocxukey.MOF_WaitForDeviceEvent();
		sign = sign >>> 0;
		sign = sign.toString(16);
		if(sign == 1){
			res = true;
		}
	}catch(e){
	}
	if(res){
		if(window.confirm("您的移动证书UKEY还插在电脑上，在退出一体化系统前强烈建议您先拔掉UKEY！\r 如果您确定在退出一体化时不拔掉UKEY,请按“确定”键，否则按“取消”返回。")){
			if(window.confirm("警告：您已确定在退回一体化系统时不拔掉UKEY，请您再次确认是否要不拔掉UKEY退出一体化系统。")){
				window.location.href = _ROOT_PATH_+"/logout.page";
			}
		}
	}else{
		window.location.href = _ROOT_PATH_+"/logout.page";	
	}
}

//广西南宁UKey登陆后拔掉仍能单点登陆的问题
function isCheckUeyOutOrIn(res){
	if(1==res){
		var ukeyobj=document.getElementById("FTCtrl");
		if(null==ukeyobj || undefined==ukeyobj){
			var jsfile = document.createElement("OBJECT");
			jsfile.classid="clsid:68DBACA2-CB2A-4C0E-9375-E17A2C56A643";
			jsfile.id="FTCtrl";
			document.getElementsByTagName("head")[0].appendChild(jsfile);
		}
		var certNum = FTCtrl.GetAllCertNum;
		if(!certNum || certNum == 0){
			alert("未检测到数字证书，请确认已经插入包含数字证书的USBKEY，系统将要退出");
			window.location.href = _ROOT_PATH_ + '/logout.page';
			return false;
		}
	}
	return true;
}

/**
 * 切换年度跳转
 */
function goToChangeYear(){
	document.getElementById('surebtn').disabled = true;
	var changeYearselect = document.getElementById('changeYearselect');
	var yearValue = changeYearselect.value;
	if(yearValue.indexOf(titleYear)!=-1){
		wind.close();
		//window.alert("与当前年度重复！");
		//document.getElementById('surebtn').disabled = false;
		return;
	}
	var config = {};
	config.year = yearValue;
	Ext.lt.RCP.server('defaultcommonloginservice', "goToChangeYear",  config, function (resp) {
		if(resp.errorMessage == "true"){
			window.location.href = _ROOT_PATH_ + "/defaultcommon.page";
		}else if(resp.errorMessage == "shouquan"){
			window.location.href = _ROOT_PATH_ + "/portal/portal2/login/accuser.jsp";
		}else if(resp.httpUrl!=null||resp.mainUrl!=null){
			createLoginForm(resp,yearValue);
		}else{
			if(resp.errorMessage!=null){
				alert(resp.errorMessage);
			}else{
				alert("切换年度失败");
			}
			document.getElementById('surebtn').disabled = false;
		}
    },function (resp){
    });
}

/**
 * 如果是在子服务进行切换年度，需要从主服务传过来的地区配置中查询出要切换的年度地址
 * @param loginForm
 * @param yearValue
 */
function findAreaUrl(loginForm,yearValue){
	for(var i = 0;i < areaInfo.length;i ++){
		var area = areaInfo[i];
		if(yearValue.indexOf(area.year)!=-1){
			loginForm.action = "http://"+area.url+"/logincommon.page";
			loginForm.area_name.value = area.name;
			loginForm.year.value = area.inditext;
			break;
		}
	}
}

/**
 * 给表单赋值并提交表单
 * @param resp
 * @param yearValue
 */
function createLoginForm(resp,yearValue){
	var loginForm = document.getElementById("loginForm");
	if(resp.httpUrl!=null){
		loginForm.action = resp.httpUrl;
		loginForm.area_name.value = resp.area_name;
		loginForm.year.value = resp.year;
	}else{
		findAreaUrl(loginForm,yearValue);
	}
	if(resp.mainUrl!=null){
		loginForm.mainUrl.value = resp.mainUrl;
	}
	if(resp.username!=null){
		loginForm.username.value = resp.username;
		loginForm.password.value = resp.password;
	}else if(resp.signed_data!=null){
		//CA认证信息
		loginForm.signed_data.value = resp.signed_data;
		//CA认证随机数信息
		loginForm.DSign_Content.value = resp.DSign_Content;
	}else{//桂林ca
		loginForm.pk.value = resp.pk;
		loginForm.Sign_value.value = resp.Sign_value;
		loginForm.glca.value = "glca";
	}
	loginForm.screenwidth.value = window.screen.width;
	if(allAreaInfo!=null){
		loginForm.areaInfo.value = allAreaInfo;
	}
	loginForm.submit();
}
/*
 * 显示计算器
 */
function showCalculator(){
	var command = "calc.exe"
	
	window.oldOnError = window.onerror;
    window._command = command;
    window.onerror = function (err) {
      if (err.indexOf('utomation') != -1) {
        alert('命令' + window._command + ' 已经被用户禁止\n请启用IE中<对未标记为可安全执行脚本的ActiveX控件初始化并执行脚本>'); 
        return true;
      }
      else return false;
    };
    var wsh = new ActiveXObject('WScript.Shell');
    if (wsh)
      wsh.Run(command);
    window.onerror = window.oldOnError;
}/**
 * 切换年度
 */
function changeYear(){
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
	                  ,'  财政年度：<select id = "changeYearselect" style="width:100px;">'];
	//多数据或者多年度跳转的主服务 该变量不为空
	if(changeYears!=null){
		for(var i = 0;i < changeYears.length;i ++){
			var changeyear = changeYears[i];
			if(changeyear.acctyear.indexOf(titleYear)!=-1){
				changeHtml.push('<option selected value="'+changeyear.all+'">&nbsp'+changeyear.acctyear+'年</option>');
			}else{
				changeHtml.push('<option  value="'+changeyear.all+'">&nbsp;'+changeyear.acctyear+'年</option>');
			}
		}
	//多年度跳转子服务 	
	}else if(areaInfo!=null){
		for(var i = 0;i < areaInfo.length;i ++){
			var changeyear = areaInfo[i];
			if(changeyear.year.indexOf(titleYear)!=-1){
				changeHtml.push('<option selected value="'+changeyear.inditext+'">&nbsp;'+changeyear.year+'年</option>');
			}else{
				changeHtml.push('<option  value="'+changeyear.inditext+'">&nbsp;'+changeyear.year+'年</option>');
			}
		}
	}
	changeHtml.push('</select>&nbsp;&nbsp;&nbsp;&nbsp;<button id="surebtn" onclick="goToChangeYear();" class="button_style">确定</button>');	
	changeHtml.push('</td></tr></table>');
	
	//添加隐藏的表单
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
	
	wind=new Ext.lt.window({title:'请选择财政年度',fitmode:'content',className:'wind7',pop:true,mark:true});
	wind.draw(_changeYearDiv);
	document.getElementById('changeYearselect').style.display = '';
}


//logo加载显示之后再添加消息和一键提问，否则取不到相应div
Ext.lt.message.hook('showlogo','onshow',function(config){
	if("1"==ismessage||"2"==ismessage){
		var msgcmp=new Ext.lt.portal.component.message({
				remind:document.getElementById('remind'),
				refreshtime:msgrefreshtime,
				popflag:popflag,
				showflash:showflash
		});
		msgcmp.draw(document.body);
	}
	//增加在线帮助的快捷键'shift+as'
	Ext.lt.showhelpWin=function(){
		var _helpDiv=document.getElementById('helpDIV');
		if(_helpDiv!=null){
			document.body.removeChild(_helpDiv);
		}	
		var helpDiv=document.createElement('DIV');
		helpDiv.id='helpDIV';
		helpDiv.innerHTML="<iframe OVERFLOW-Y:scroll; allowtransparency=true  frameborder='0' style='width:720px;height:410px;' src='"+_ROOT_PATH_+"/portal/onlinehelp/oneKeyHelp.jsp'></iframe>";
		helpDiv.style.cssText='display:block;top:expression((document.body.clientHeight-this.style.pixelHeight)/2);left:expression((document.body.clientWidth-this.style.pixelWidth)/2);center Z-INDEX:999; width:720px; height:410px; POSITION: absolute;overflow:hidden;';
		document.body.appendChild(helpDiv);
	} 
	//logo的提问按钮
	var _quickhelp=document.getElementById("quickhelp");
	if(_quickhelp!=null){
	_quickhelp.onclick=Ext.lt.showhelpWin;
	}
	Ext.lt.regKeyEvent('as',Ext.lt.showhelpWin,false,true);
});
//厦门邮件系统第一次点击进入userLoginEx 获取相应参数
function clickEmail(user_at_domain,attrs,menurl,menuwebserviece,codes){
	var para_login = {};
	para_login.user_at_domain = user_at_domain;
	para_login.attrs = attrs;
	para_login.menuwebserviece = menuwebserviece;
	Ext.lt.RCP.server('defaultCommonService', "getSid",  para_login, function (resp) {   
		var sid = resp.sid;
		window.open(menurl+"?sid="+sid);
	});	
}
function addPhoto(){
	document.getElementById("fitmodedemo2").style.display = 'block';	
	document.getElementById("file").value="";
	var wind=new Ext.lt.window({
		title:'添加图片',
		className:'wind7',
		pop:'true',
		w:'500',
		h:'240',
		mark:'true'});
	wind.draw(fitmodedemo2);
	document.getElementById("sxfileqxbtn").onclick=function(){
		wind.close();
	}
	//document.getElementById("usersphoto").style.backgroundImage="";
}
function SaveFile(){
		var types = "jpg,bmp,png,jpeg,gif";
		var fileuploads = document.getElementsByName('file');
		var fileuploadres=true;
		if(fileuploads.length>1){
			for(var i=0;i<fileuploads.length;i++){
				if(fileuploads[i].value==''){
					fileuploadres=false;
					break;
				}
			}
		}
		//-----------------上传附件：如果上传多附件中有一个值为空那么不允许上传
		if(!fileuploadres){			
			submitForm();
		}
		//---------------------
		if(!(document.getElementById('file').value==null||document.getElementById('file').value.length==0)){
		var fileTypes = document.getElementsByName('file');
		var typeFlag = false;
		for(var j = 0;j< fileTypes.length;j++){
			fileType=fileTypes[j].value.split(".");
			if(types.toUpperCase().indexOf(fileType[fileType.length-1].toUpperCase())==-1){
				alert("照片上传类型只能支持（"+types+"）类型！");
		     	return false;
			}
		}
		savefile();
		//isNotUpload();
		}else{
			alert("上传照片为空!");
			return false;
		}	
		document.getElementById("sxfileqxbtn").onclick();
		var para_login = {};
		Ext.lt.RCP.server('defaultCommonService', "getFileid",  para_login, function (resp) {  
			var code = resp.fileid;	
			imgd.src ="/downLoad.do?path="+code;
		});
		
}
function savefile(){
	var div=document.getElementById("bq").parentNode;
	var p=document.getElementById('file').parentNode;
	var fileDiv=document.createElement("div");
	fileDiv.style.visibility='hidden';
	fileDiv.id='fileDiv';	
	var innerHTMLStr="<form action =''" + _ROOT_PATH_ + "/common/photosx/uploadFile.do' method='post' ENCTYPE='multipart/form-data' id='fileUploadForm' target='fileUploadIfr'>";
	innerHTMLStr=innerHTMLStr+"</form>";
	innerHTMLStr=innerHTMLStr+"<iframe name='fileUploadIfr' id='fileUploadIfr' src='no'></iframe>";
	fileDiv.innerHTML=innerHTMLStr;
	div.appendChild(fileDiv);
	var form = document.getElementById('fileUploadForm');
	var fileuploads = document.getElementsByName('file');
	for(var i=0;i<fileuploads.length;i++){
		form.appendChild(fileuploads[0]);
	}
	form.action="/common/photosx/uploadFile.do";
	form.submit();
	p.appendChild(document.getElementById('file'));
}
function bclick(id){
	var ids = "app"+id;
	document.getElementById(ids).submit();
	return false;
}
