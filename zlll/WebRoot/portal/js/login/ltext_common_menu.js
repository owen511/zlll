//����js·������
// ����Portal�����ռ�
if(Ext.lt.portal==null) Ext.lt.portal = {component:{}};
if (Ext.lt.portal.component == null) {
	Ext.lt.portal.component = {};
}

/**ϵͳlogo����*/
function logoArea(config) {
	var logoHtml = [];
	if(config.sxindexjsp=="31"){
		var d = new Date();
		var a = new Array("��", "һ", "��", "��", "��", "��", "��");
		logoHtml.push('<div class="defaultoutter">');
		//logo���� ��ʼ
		logoHtml.push('<div class="logoarea">');
		logoHtml.push('<table width="460" border="0">');
		logoHtml.push('<tr>');
		logoHtml.push('<td class="fontcolor">'+systemdate+'&nbsp;&nbsp;&nbsp;����');
		logoHtml.push(a[d.getDay()]);
		logoHtml.push('</td>');
		logoHtml.push('<td>');
		logoHtml.push('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;��¼���:' + config.year);
		//logoHtml.push('</td>');
		//logoHtml.push('<td width="200px"><div id="remind"><a href="javascript:void(0)">��Ϣ</a></div>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="' + _ROOT_PATH_ + '/portal/login/mod_password.jsp" target="_blank">�޸�����</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#" onclick="IsLogout(\''+config.ukeycheck+'\',\''+config.ischeckpengding+'\');">�˳�</a>&nbsp;&nbsp;</td>');
		logoHtml.push('&nbsp;&nbsp;|&nbsp;&nbsp;<a href="' + _ROOT_PATH_ + '/portal/login/mod_password.jsp" target="_blank">�޸�����</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#" onclick="IsLogout(\''+config.ukeycheck+'\',\''+config.ischeckpengding+'\');">�˳�</a>&nbsp;&nbsp;</td>');
		logoHtml.push('</tr></table></div>');
	}else{
	if(config.refreshType != 1){
		logoHtml.push('<div id="logo">');
	}	
	logoHtml.push('    <table width="100%" border="0" cellspacing="0" cellpadding="0">');
	logoHtml.push('        <tr>');
	logoHtml.push('            <th rowspan="2" nowrap="nowrap"></th>');
	logoHtml.push('            <td  nowrap="nowrap">');
	//�Ƿ���ʾ�˳���ť
	if (config.exitshow == "1") {
		// begin ���޺� 2012.11.21 �˳�ʱ����Ƿ���ʾ���޴�������  1��� 0 �����
		logoHtml.push('            <div><a title="�˳�" href="#" onclick="IsLogout(\''+config.ukeycheck+'\',\''+config.ischeckpengding+'\');"><img src="' + _ROOT_PATH_ + '/images/actions/exit.gif" width="16" height="16" border="0"/> �˳� </a></div><div class="w_gang"></div>');
		// end ���޺� 2012.11.21 �˳�ʱ����Ƿ���ʾ���޴�������  1��� 0 �����
	}
	if(config.refreshType == 1){
		//logoHtml.push('                <div><a title="������ҳ" href="' + _ROOT_PATH_ + '/defaultcommon.page"><img src="' + _ROOT_PATH_ + '/images/actions/house.gif" width="16" height="16" /> ��ҳ</a></div><div class="w_gang"></div>');
	}else{
		logoHtml.push('                <div><a title="ˢ��" href="' + _ROOT_PATH_ + '/defaultcommon.page"><img src="' + _ROOT_PATH_ + '/images/actions/house.gif" width="16" height="16" /> ˢ��</a></div><div class="w_gang"></div>');
	}
	if (config.isaccuser != 0) {
		logoHtml.push('                <div><a title="�л���ɫ" href="' + _ROOT_PATH_ + '/portal/portal2/login/accuser.jsp"><img src="' + _ROOT_PATH_ + '/portal/images/changerole.gif" width="16" height="16" /> �л���ɫ</a></div><div class="w_gang"></div>');
	}
	logoHtml.push('            <div style="width:65px"><a title="ϵͳ��������"  href="#" onclick="showInfo();"><img src="' + _ROOT_PATH_ + '/images/actions/setsys.gif" width="16" height="16" border="0"/>�ͻ�������</a></div><div class="w_gang"></div> ');
	logoHtml.push('                <div><img src="' + _ROOT_PATH_ + '/images/actions/font_size.gif" width="16" height="16" border="0" title="�ֺ�" /><a href="#" onclick="setFont(\'l\')">��</a><a href="#" onclick="setFont(\'m\')"> ��</a><a href="#" onclick="setFont(\'s\')"> С</a></div><div class="w_gang"></div>');
	if (config.passwordshow == "1" && config.isportalca == "false") {
		logoHtml.push('                <div style="width:60px"><a title="�޸�����" href="' + _ROOT_PATH_ + '/portal/login/mod_password.jsp" target="_blank"><img src="' + _ROOT_PATH_ + '/images/actions/mod_pwd.gif" width="16" height="16" border="0"/> �޸����� </a></div><div class="w_gang"></div>');
	}
	if (config.intranetConfig == "true") {
		logoHtml.push('                <div><a title="��������" href="' + _ROOT_PATH_ + '" target="_blank"><img src="' + _ROOT_PATH_ + '/images/actions/go_innerNet.gif" width="16" height="16" /> ����</a></div><div class="w_gang"></div>');
	}
	if (config.changeyear != null && config.changeyear == "1") {
		logoHtml.push('                <div  style="width:60px"><a title="�л����" href="javascript:void(0)"  onclick="changeYear();"><img src="' + _ROOT_PATH_ + '/portal/images/changeyear/change.gif" width="16" height="16" /> �л����</a></div><div class="w_gang"></div>');
	}
	if (config.quickhelp == "1") {
		logoHtml.push('                <div id="quickhelp" style="width:60px"><a title="��������" href="javascript:void(0)" ><img src="' + _ROOT_PATH_ + '/images/actions/help.gif" width="16" height="16" /> ��������</a></div><div class="w_gang"></div>');
	}
	if (config.isMessage == "1" || config.isMessage == "2") {
		logoHtml.push('              <div id="remind" style="width:60px"><a title="��Ϣ����" href="javascript:void(0)" class="lock"> ��Ϣ���� </a></div><div id="remindcss" class="w_gang"></div>');
	}
	//���Ӽ��������� by ss
	if(config.isShowCalculator == "1"){
		logoHtml.push('                <div><a title="������" href="javascript:void(0);" onclick="showCalculator();" ><img src="' + _ROOT_PATH_ + '/portal/images/calculator.png" width="16" height="16" /> ������</a></div><div class="w_gang" style="display:none"></div>');
	}
	logoHtml.push('                    <div class="w_head" visibility:hidden></div>');
	logoHtml.push('                </td>');
	logoHtml.push('                <td width="6" nowrap="nowrap" class="w_right">&nbsp;</td>');
	logoHtml.push('            </tr>');
	logoHtml.push('            <tr>');
	logoHtml.push('                <td nowrap="nowrap"  class="welcomeA">');
	if (config.refreshType == 1&&null != config.area_name && config.area_name != "") {
		logoHtml.push('                ����:' + config.area_name);
	}
	//��¼�������
	logoHtml.push('                ���:' + config.year);
	//�ж��Ƿ���ʾ����
	if (null != config.loginAreaName && config.loginAreaName != "") {
		logoHtml.push('                ����:' + config.loginAreaName);
	}
	//�û���λ��Ϣ
	if (config.agencyType != null) {
		if (config.agencyName != null) {
			logoHtml.push('&nbsp;' + config.agencyType + ':' + config.agencyName);
		} else {
			logoHtml.push('');
		}
	} else if (config.agencyName != null) {
		logoHtml.push('&nbsp;��λ:' + config.agencyName);
	}
	if (config.refreshType == 1&&null != config.showAcctsystype && config.showAcctsystype != "") {
		logoHtml.push('                ����:' + config.showAcctsystype);
	}
	//�û�������Ϣ
	logoHtml.push('&nbsp;�û�:' + config.name);
	//��ǰϵͳ����
	if (config.agencyType != null) {
		logoHtml.push('&nbsp;����:');
	} else {
		logoHtml.push('&nbsp;ϵͳ����:');
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

/**ϵͳ��ҳ���˵�չʾ����*/
function mainMenuShow(config){
	//begin ���޺� 2012.11.21 �˳�ʱ����Ƿ����޴������� IsLogout()����ʹ��
	if(Ext.lt.portal.component.menu.config==null||Ext.lt.portal.component.menu.config==""){
		Ext.lt.portal.component.menu.config = config;
	}
	//��������UKey��½��ε����ܵ����½������
	var ischeckUkey = config.portalIsCheckUkey;
	//begin ���޺� 2012.11.21 �˳�ʱ����Ƿ����޴�������  IsLogout()����ʹ��
	//��¼csϵͳ����  ����0ʱ��ʾ ҵ������ַ����˵�
	var cscount=0;
	//����˵���������
	var mainMenuHtml = [];
    //�����˵�������󣬶����ݿ����ϵͳ
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
	mainMenuHtml.push('<tr><td class="infoname" style="width:38px">������</td><td class="infoname" title="'+cname+'">');
	mainMenuHtml.push(cnames);
	mainMenuHtml.push('</td></tr>');
	var code = config.userCode;
	var codes = code;
	if(codes.length>7){
		codes = code.substr(0,7)+"...";
	}
	mainMenuHtml.push('<tr><td class="infozw">���룺</td><td class="infozw" title="'+code+'">');
	mainMenuHtml.push(codes);
	mainMenuHtml.push('</td></tr>');
	var agen = config.agencyName;
	var agens = agen;
	if(agen!=null&&agens.length>7){
		agens = agen.substr(0,7)+"...";
	}
	mainMenuHtml.push('<tr><td class="infocs">���ң�</td><td class="infocs" title="'+agen+'">');
	mainMenuHtml.push(agens);
	mainMenuHtml.push('</td></tr></table></td>');
	mainMenuHtml.push('</tr>');
	mainMenuHtml.push('</table>');
	mainMenuHtml.push('</div>');
	mainMenuHtml.push('</td>');
	mainMenuHtml.push('<td valign="top">');	
	mainMenuHtml.push('<div class="menuarea">');
	//mainMenuHtml.push('<a href="' + _ROOT_PATH_ + '/defaultcommon.page">������ҳ</a>');
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
      //�˵��ܳ��ܵ������
	    //ʵ�ʲ˵����
	    var menulength = 1;
	    //if(menu.menuid&&t!=0){
	    //	continue;
	    //}
	    var isJoin = leftprogramObj[menu.code+"-"+0] && leftprogramObj[menu.code+"-"+0].CODETYPE == 0 && menu.sign!="portal";
	    var isGrow = leftprogramObj[menu.menuid+"-"+1] && leftprogramObj[menu.menuid+"-"+1].CODETYPE == 1;
        if(isGrow || isJoin ){
        	 //����˵����
	        menulength = menulength + menu.name.length+1;
			if((a)%4==0){
				mainMenuHtml.push('<tr>');
			}		
			
		}else{
			continue;
		}
	    
	    //�û����ն���
	    var userComObj = new Array();
	    //����ϵͳ�Ĳ��� 
	    var programparas = config.programparas;
      
      //�û�������Ϣ
        var userCompare = config.userCompare;
        for(var j = 0; j < userCompare.length; j++){
        	userComObj[userCompare[j].BUSIGN] = userCompare[j];
        }
        //�ж��û�������Ϣ�Ƿ���ڣ�����������޸�
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
        //����ǽ���˵�
        }else {       
        	if(leftprogramObj[menu.code+"-"+0]  && menu.sign!="portal"){
        		mainMenuHtml.push('<td width="180px">');
        		mainMenuHtml.push('<ul>');
        	if(programparas!=null&&programparas[menu.code]!=null){
        		menu.parameters = programparas[menu.code];
        	}else{
        		menu.parameters=[];
        	}
            /**���ݲ�ͬҵ��ϵͳ���ͽ������⴦��1��b/sϵͳ  2��c/sϵͳ  3����־����-��ʱ��������Ǹ��ط���ʹ�ã�*/
            //δʵ��ϵͳ��ʾ��Ϣ
            var promsg = "��ϵͳ��û�н��н��룬�޷����е����¼";
            //�����b/sϵͳ
            if (menu.type == 1){
            	var formTarget = "_blank";
            	if(menu.opentype!=null&&menu.opentype==2){
            		formTarget = "";
            	}
            	 // begin ���޺� 2012.12.10 ��ȡ�ͻ���ip
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
            	 // end ���޺� 2012.12.10 ��ȡ�ͻ���ip
                /**����ҵ��ϵͳ�����̽������֣�1��̫������ϵͳ 2����ͼϵͳ 4: ��ͬ�����һ�廯ϵͳ�˵� 5�����������ҵ��ϵͳ����϶��Լ������ĵ����¼�ؼ�  6��δʵ��ϵͳ��*/
                //����ǲ�ͬ�����һ�廯ϵͳ�˵�
                if (menu.tjhqprogram == 4){
                    //��ʱ��ʵ�֣���֪���ĸ���������
                //������������ҵ��ϵͳ����϶��Լ������ĵ����¼�ؼ�
                }else if (menu.tjhqprogram == 5){		                                       
                    //�̶�ϵͳ��ʶ������ĳϵͳ��
                    if (menu.sign == "cshxxt"){
                        //����Ϊ�û�������sessionId
                        mainMenuHtml.push('<li><a href="javascript:cshxxt(\'' + menu.sign + '\',\'uid=' + config.userCode + ' sid=' + config.session + 'LT\');">' + menu.name + '</a>��</li>');
                    }
                    if(menu.sign == "jiuqizichan"){
	 	                //begin ��Ӿ����ʲ������¼   ���޺� 2012.09.14
	        			mainMenuHtml.push('<li><a href="javascript:special(\''+comUcode+'\',\''+comPassword+'\',\''+menurl +'\')" >' + menu.name + '</a>');
				 		mainMenuHtml.push('��</li>');
				 		//end ��Ӿ����ʲ������¼   ���޺� 2012.09.14	
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
                    	// �������ŵ������ύ
				    	mainMenuHtml.push('<form id="app' + menu.code + '" name="app' + menu.code + '" method="post" action="' + menurl + '"  target="_blank" style="display:none">'); 
                        mainMenuHtml.push('<input type="text" name="sid" value=""/></form>');
			    		mainMenuHtml.push('</li>');	
                    }
                //δʵ��ҵ��ϵͳ��  
                }else if (menu.tjhqprogram == 6){
                    mainMenuHtml.push('<li><a href="#"');
				    mainMenuHtml.push(' onclick="javascript:alert(\'' + promsg + '\');">' + menu.name + '</a></li>');
                //ASPϵͳ  
                }else if (menu.tjhqprogram == 7){
                	defaultHTML.push('<li><a href="#" onclick="bclick(\''+menu.code+'\');">' + menu.name + '</a>');
                    //�������ŵ�����������
	    			mainMenuHtml.push('<form id="app' + menu.code + '" name="app' + menu.code + '" method="get" action="' + menurl + '" style="display:none">');					    	//ѭ��ϵͳ����
			    	//ѭ��ϵͳ����
			    	for(var j = 0; j < menu.parameters.length; j++){
			    	    var parameter = menu.parameters[j];
				    	mainMenuHtml.push('<input type="text" name="' + parameter.parametername + '" value="' + parameter.parametervalue + '"/>');
			    	}
			    	//�û�����
				    mainMenuHtml.push('<input type="text" name="uid" value="' + config.userCode + '"/>');
				    //sessionId
				    mainMenuHtml.push('<input type="text" name="sid" value="' + config.session + '"/>');
				    //�������
				    mainMenuHtml.push('<input type="text" name="year" value="' + config.year + '"/></form>');
		    		mainMenuHtml.push('</li>');
                }else {
                    /**����ҵ��ϵͳ��ַhosturl�Ƿ�Ϊ�������⴦��*/
                    //����hosturlΪ��Ϊ�յ�ҵ��ϵͳ���������ʲô�ã�������ʱ��ʵ��
                    if (menu.hosturl != null){
                        //�ж�ҵ��ϵͳ��ַ���Ż������ַ�Ƿ�һ��
                        if (menu.hosturl == _ROOT_PATH_){
                        
                        }
                    //����hosturlΪ�յ�ҵ��ϵͳ���˴�Ϊ������ҵ��ϵͳ����
                    }else{
                    //ҵ��ϵͳ������û�֧��3.0����������ϵͳ��ʵ���˻�ϵͳ����ҳ�治��_blank
                        if (menu.sign == "YYJZZF3.0" || menu.sign == "nftt" || menu.sign == "account"){
                        	defaultHTML.push('<li><a href="#" onclick="bclick(\''+menu.code+'\');">' + menu.name + '</a>');
                            //�������ŵ�����������
					    	mainMenuHtml.push('<form id="app' + menu.code + '" name="app' + menu.code + '" method="post" action="' + menurl + '" style="display:none">');					    	//ѭ��ϵͳ����
					    	//ѭ��ϵͳ����
					    	for(var j = 0; j < menu.parameters.length; j++){
					    	    var parameter = menu.parameters[j];
						    	mainMenuHtml.push('<input type="text" name="' + parameter.parametername + '" value="' + parameter.parametervalue + '"/>');
					    	}
					    	//�û�����
						    mainMenuHtml.push('<input type="text" name="uid" value="' + comUcode + '"/>');
						    //sessionId
						    mainMenuHtml.push('<input type="text" name="sid" value="' + config.session + '"/>');
						    //�������
						    mainMenuHtml.push('<input type="text" name="year" value="' + config.year + '"/></form>');
				    		mainMenuHtml.push('</li>');	
				    	//BOϵͳ�����¼			    	
				        }else if (menu.sign == "BOZHCX"){
				            //��Ҫʵ��----------------------------------
				        }else if(menu.sign == "xzd"){
					        //begin  �������д󵥵��¼����  ���޺� 2012.09.17
				        	defaultHTML.push('<li><a href="#" onclick="bclick(\''+menu.code+'\');">' + menu.name + '</a>');
						    // �������ŵ������ύ
						    mainMenuHtml.push('<form id="app' + menu.code + '" name="app' + menu.code + '" method="post" action="' + menurl + '" target="_blank" style="display:none">');
				     	    //�û�����
							mainMenuHtml.push('<input type="text" name="uid" value="' + config.userCode + '"/>');
							mainMenuHtml.push('<input type="text" name="name" value="' + config.name + '"/></form>');
					    	mainMenuHtml.push('</li>');	
					    	//end  �������д󵥵��¼����  ���޺� 2012.09.17   
					    	//��������ҵ��ϵͳ
				        }else {
                            mainMenuHtml.push('<li><a href="#" onclick="bclick(\''+menu.code+'\');">' + menu.name + '</a>');
					    	// �������ŵ������ύ
					    	mainMenuHtml.push('<form id="app' + menu.code + '" name="app' + menu.code + '" method="post" action="' + menurl + '"  target="'+formTarget+'" style="display:none">');                            //ѭ��ϵͳ����
                            //ѭ��ϵͳ����
					    	for(var j = 0; j < menu.parameters.length; j++){
					    		var parameter = menu.parameters[j];
						    	mainMenuHtml.push('<input type="text" name="' + parameter.parametername + '" value="' + parameter.parametervalue + '"/>');
					    	}
					    	//�û�����
						    mainMenuHtml.push('<input type="text" name="uid" value="' + comUcode + '"/>');
						    //sessionId
						    mainMenuHtml.push('<input type="text" name="sid" value="' + config.session + '"/>');
						    //�������
						    mainMenuHtml.push('<input type="text" name="year" value="' + config.year + '"/></form>');
				    		mainMenuHtml.push('</li>');	
				        }
                    }
                
                }
            //csϵͳ
            }else if (menu.type == 2){
                 cscount=cscount+1;
                /**csҵ��ϵͳ����: 1:̫������ҵ��ϵͳ */
                //̫������ҵ��ϵͳ
                if (menu.tjhqprogram == 1){
                    //����Ԥ����Ƶ�λ��(efmdiv)�����������λ��(dfczdiv)
                    if(menu.sign == "efmdiv" || menu.sign == "dfczdiv"){
                        mainMenuHtml.push('<li><a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){loadAppcaller();AppCaller.callApp(\'');
                    //��������csҵ��ϵͳ
                    }else {
                        mainMenuHtml.push('<li><a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){loadAppcaller();AppCaller.callHqApp(\'');
                    }
                    //ҵ��ϵͳ��ʶ
                    mainMenuHtml.push(menu.sign + '\',\'');
                    //�洢ҵ��ϵͳ��Ӧ���ݿ��б���Ϣ
                    var dbs = {};
                    //���ݿ��ѯ��������
                    //var dbsConfig = {};
                    //ҵ��ϵͳ����
                   // dbsConfig.programCode = menu.code;
                    //�������
                    //dbsConfig.year = config.year;
                    //��ѯҵ��ϵͳ��Ӧ���ݿ���Ϣ
                   // dbs = Ext.lt.RCP.asynserver('defaultCommonService', "getDbConfig",  dbsConfig);
                    //�洢ҵ��ϵͳ��Ӧ��ϵͳ�б���Ϣ
                    var subPrograms = {};
                    //��ѯҵ��ϵͳ��Ӧ��ϵͳ��Ϣ
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
                    //�ж�����ǲ���Ԥ���ϵͳ����Ҳ��exp
                    if(menu.sign == "expxtgl"){
                        //�û�����
                    	mainMenuHtml.push('|exp|' + comUcode.toLowerCase());
                    //ָ��ϵͳϵͳ����
                    }else if(menu.sign == "indisys"){
                    	mainMenuHtml.push('|indi|' + comUcode.toLowerCase());
                    //��������ҵ��ϵͳ
                    }else{
                    	mainMenuHtml.push('|' + menu.sign + '|' + comUcode.toLowerCase());
                    }
                    //�������ϵͳ���������ݿ����������ϵͳ�������Ӳ�ͬ��ȵ����ݿ⣬Ĭ��ȡ��һ��
                    if(dbs.length > 0){
                        //ҵ��ϵͳ���ݿ����
                    	var db = dbs[0];
                    	mainMenuHtml.push('|' + db.dbstr);
                    }
                    //�Ƿ���ҪsessionID
                    if(menu.needsid ==1 ){
                    	mainMenuHtml.push('|' + config.session);
					}
					//��װҵ��ϵͳ����
					for(var j = 0; j < menu.parameters.length; j++){
						mainMenuHtml.push('|' + menu.parameters[j].parametervalue);
					}
					mainMenuHtml.push('\');}">' + menu.name + '</a>');
					//���ҵ��ϵͳ���ڶ������ݿ�����
					if(dbs.length>1){
					    //�ڲ˵������һͼ�֧꣬���������¼��������º󵯳������������ѡ���
						mainMenuHtml.push('&nbsp;<IMG id="img' + menu.code + '" alt="�л���" src="' + _ROOT_PATH_ + '/images/list.gif" style="margin-top:10px;cursor:pointer;" onmouseover="mvqMOv(\'img' + menu.code + '\',\'panelDiv' + menu.code + '\')";>');
						//�����˵���ʽdiv
						menudiv.push('<div id="panelDiv' + menu.code + '" style="position:absolute;visibility:hidden; z-index:1000; WIDTH: 90px; BORDER-RIGHT: #8BA3DA 1px solid; PADDING-RIGHT: 12px;BORDER-TOP: #8BA3DA 1px solid; PADDING-LEFT: 12px; PADDING-BOTTOM: 12px; BORDER-LEFT: #8BA3DA 1px solid; PADDING-TOP: 12px;BORDER-BOTTOM: #8BA3DA 1px solid; BACKGROUND-COLOR: #FFFFFF" onmouseover="panelMOv(\'panelDiv' + menu.code + '\');" onmouseout="panelMOu(\'panelDiv' + menu.code + '\');">');
						menudiv.push('<table width=100% >');
						menudiv.push('    <tr valign=top><td width=20% class="sngPst">');
						//ѭ���������ݿ���Ϣ
						for(var j = 0;j<dbs.length; j++){
						         //���ݿ����
							     var db = dbs[j];
								 menudiv.push('<div class="divline" nowrap>');
								 //�����������ϵͳ
								 if(subPrograms.length == 0){
			                        //�ж��Ƿ��ǻ���Ԥ����Ƶ�λ��(efmdiv)�����������λ��(dfczdiv)
			                        if(menu.sign == "efmdiv" || menu.sign == "dfczdiv"){
										 menudiv.push('<a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){loadAppcaller();AppCaller.callApp(\'');
			                        }else{
										 menudiv.push('<a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){loadAppcaller();AppCaller.callHqApp(\'');
			                        }
			                        menudiv.push(menu.sign + '\',\'');
									 //�ж�����ǲ���Ԥ���ϵͳ����Ҳ��exp
									 if(menu.sign == "expxtgl"){
                    					menudiv.push('|exp|' + comUcode.toLowerCase());
                    				//�����ָ��ϵͳ��ϵͳ����
                    				}else if(menu.sign == "indisys"){
                    					menudiv.push('|indi|' + comUcode.toLowerCase());
                    				}else if(menu.sign == "hqexp"){
                    					//���ɹŻ��岿��Ԥ��ϵͳʹ��
                                    	mainMenuHtml.push('|efmis|' + comUcode.toLowerCase());
                                        //��������ҵ��ϵͳ
                                    }else{
                    					menudiv.push('|' + menu.sign + '|' + comUcode.toLowerCase());
                    				}
                    				//���ݿ������Ϣ
	                        		menudiv.push('|' + db.dbstr);
	                        		//�Ƿ񴫵�sessionID
	                        		if(menu.needsid == 1){
	                        		 	menudiv.push('|' + config.session);
	                        		}
									//��װҵ��ϵͳ����
									for(var p = 0; p < menu.parameters.length; p++){
										menudiv.push('|' + menu.parameters[p].parametervalue);
									}
									menudiv.push('\');}">');
								 }
								 //���ݿ�����
								 menudiv.push(db.dbname);
								 //�����������ϵͳ�����ƴװ
								 if(subPrograms.length == 0){
								 	menudiv.push('</a>');
								 }
								 menudiv.push('</div>');
								 //���������ϵͳ
								 for(var h = 0; h < subPrograms.length; h++){ 
								     //��ϵͳ����
								     var subprogram = subPrograms[h];
									 menudiv.push('<div class="divline" nowrap>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:loadAppcaller();AppCaller.callHqApp(\'');
									 //ҵ��ϵͳ��ʶ
									 menudiv.push(menu.sign + '\',\'');
									 //�ж�����ǲ���Ԥ���ϵͳ����Ҳ��exp
									 if(menu.sign == "expxtgl"){
                    					menudiv.push('|exp|' + comUcode.toLowerCase());
                    				 //ָ��ϵͳϵͳ����
                    				 }else if(menu.sign == "indisys"){
                    					 menudiv.push('|indi|' + comUcode.toLowerCase());
                    				 }else{
                    					 menudiv.push('|' + subprogram.sign + '|' + comUcode.toLowerCase());
                    				 }
                    				 //���ݿ����		 
	                        		 menudiv.push('|' + db.dbstr);
	                        		 //�����ҪsessionID
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
					//�ж�TjhqprogramΪ5�ģ��ǵ����¿ؼ��ĵط���ƴ�ɵ����ӵ�ַ,����ĳϵͳ
                }else if (menu.tjhqprogram == 5){
                     //����ϵͳ��ʶ�ж�
                     if(menu.sign == "yszxxt1"){
                     	mainMenuHtml.push('<li><a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){yszxxt1(\'');
                     	//ϵͳ��ʶ
                     	mainMenuHtml.push(menu.sign + '\',\'');
                     	//�û�����+sessionID
				        mainMenuHtml.push('uid=' + config.userCode + ' sid=' + config.session + 'LT\'');
                     	mainMenuHtml.push(');}"> ' + menu.name + '</a>');
						mainMenuHtml.push('</li>');
                     }
                     if(menu.sign == "yszxxt2"){
                     	mainMenuHtml.push('<li><a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){yszxxt2(\'');
                     	//ϵͳ��ʶ
                     	mainMenuHtml.push(menu.sign + '\',\'');
                     	//�û�����+sessionID
				        mainMenuHtml.push('uid=' + config.userCode + ' sid=' + config.session + 'LT\'');
                     	mainMenuHtml.push(');}"> ' + menu.name + '</a>');
						mainMenuHtml.push('</li>');
                     }
                     if(menu.sign == "jzzfdw"){
                     	mainMenuHtml.push('<li><a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){jzzfdw(\'');
                     	//ϵͳ��ʶ
                     	mainMenuHtml.push(menu.sign + '\',\'');
                     	//�û�����+sessionID
				        mainMenuHtml.push('uid=' + config.userCode + ' sid=' + config.session + 'LT\'');
                     	mainMenuHtml.push(');}"> ' + menu.name + '</a>');
						mainMenuHtml.push('</li>');
                     }
                     if(menu.sign == "gwkzf"){
	                        mainMenuHtml.push('<li><a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){gwkzf(\'');
	                     	//ϵͳ��ʶ
	                     	mainMenuHtml.push(menu.sign + '\',\'');
	                     	//�û�����+sessionID
					        mainMenuHtml.push('uid=' + config.userCode + ' sid=' + config.session + 'LT\'');
	                     	mainMenuHtml.push(');}"> ' + menu.name + '</a>');
							mainMenuHtml.push('</li>');
                     }if(menu.sign == "jzzfdws"){
                     	 mainMenuHtml.push('<li><a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){jzzfdws(\'');
                     	//ϵͳ��ʶ
                     	mainMenuHtml.push(menu.sign + '\',\'');
                     	//�û�����+sessionID
				        mainMenuHtml.push('uid=' + config.userCode + ' sid=' + config.session + 'LT\'');
                     	mainMenuHtml.push(');}"> ' + menu.name + '</a>');
						mainMenuHtml.push('</li>');
                     }
                //δʵ��ϵͳ
                }else if (menu.tjhqprogram == 6){
                 	mainMenuHtml.push('<li><a href="javascript:alert(\'' + promsg + '\'');
                 	mainMenuHtml.push(');"> ' + menu.name + '</a>');
					mainMenuHtml.push('</li>');
				//����csҵ��ϵͳ
                }else {
                        //��ͼƽ̨�ͻ���ϵͳ
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
						//����ҵ��ϵͳ
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
            
            } //CSҵ��ϵͳ����BSҵ��ϵͳ
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
	//�˵��������
	mainMenuHtml.push('<div id="menu" >');
    mainMenuHtml.push('<table width="100%" border="0" cellspacing="0" cellpadding="0"">');
	mainMenuHtml.push('    <tr>');
	//�жϲ˵�������ʾ���Ƕ�����ʾ��true:������ʾ false:������ʾ
	//����ǵ�����ʾ
	if (config.isshowmenus == "false"){
	    //��ǰ��ʾͼ��
	    mainMenuHtml.push('<td width="20px" style="color:#FFFFFF;"><img src="' + _ROOT_PATH_ + '/images/done_btn/pre.gif" style="cursor:pointer;" title="��ǰ" onclick="showPre()"/></td>');
	}
	//����˵���
	mainMenuHtml.push('<td>');
	mainMenuHtml.push('    <div id = "idd" style="overflow:hidden; width:expression(document.body.offsetWidth-40);">');
	mainMenuHtml.push('    <ul id="m_ul">');
    mainMenuHtml.push('        <li style="">��</li>'); 
    /**��ʼ����ϵͳ�˵���Ϣ*/
    //�˵��ܳ��ܵ������
    var menuwidth = window.screen.width - 50;
    //ʵ�ʲ˵����
    var menulength = 1;
    //�û����ն���
    var userComObj = new Array();
    //����ϵͳ�Ĳ��� 
    var programparas = config.programparas;
    for (var i = 0; i < config.totalmenus.length; i++){
        //�˵����� 
        var menu = config.totalmenus[i]
        //����˵����
        menulength = menulength + menu.name.length+1;
//        var menuL = menu.name.replace(/[^\x00-\xff]/g, '__').length;
//        menulength = menulength + Math.ceil(menuL/2) +0.9; 
        //�û�������Ϣ
        var userCompare = config.userCompare;
        for(var j = 0; j < userCompare.length; j++){
        	userComObj[userCompare[j].BUSIGN] = userCompare[j];
        }
        //�ж��û�������Ϣ�Ƿ���ڣ�����������޸�
        var comUcode = config.userCode;
        var comPassword = "";
        if(userComObj[menu.sign]){
        	comUcode = userComObj[menu.sign].BUCODE;
        	if(userComObj[menu.sign].BUPASSWORD != null){
        	    comPassword = userComObj[menu.sign].BUPASSWORD;
            }
        	
        }
        //����Ƕ�����ʾ  
        if (config.isshowmenus == "true"){
            //������
			if(menulength*16>=menuwidth){
				//����
				mainMenuHtml.push('<br><li>��</li>');
				menulength=1;
			}
        }
        //�����һ�廯�˵�
        if(menu.menuid){
        	if(menu.menuid==41000){
	            mainMenuHtml.push('<li><a href="' + _ROOT_PATH_ + menu.clientmodule+'?mainmenu=' + menu.menuid + '" target="_blank">' + menu.name + '</a>��</li>');
        	}else{
	            mainMenuHtml.push('<li><a href="' + _ROOT_PATH_ + menu.clientmodule+'?mainmenu=' + menu.menuid + '">' + menu.name + '</a>��</li>');
        	}
        //����ǽ���˵�
        }else {
        	if(programparas!=null&&programparas[menu.code]!=null){
        		menu.parameters = programparas[menu.code];
        	}else{
        		menu.parameters=[];
        	}
            /**���ݲ�ͬҵ��ϵͳ���ͽ������⴦��1��b/sϵͳ  2��c/sϵͳ  3����־����-��ʱ��������Ǹ��ط���ʹ�ã�*/
            //δʵ��ϵͳ��ʾ��Ϣ
            var promsg = "��ϵͳ��û�н��н��룬�޷����е����¼";
            //�����b/sϵͳ
            if (menu.type == 1){
            	var formTarget = "_blank";
            	if(menu.opentype!=null&&menu.opentype==2){
            		formTarget = "";
            	}
            	 // begin ���޺� 2012.12.10 ��ȡ�ͻ���ip
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
            	 // end ���޺� 2012.12.10 ��ȡ�ͻ���ip
                /**����ҵ��ϵͳ�����̽������֣�1��̫������ϵͳ 2����ͼϵͳ 4: ��ͬ�����һ�廯ϵͳ�˵� 5�����������ҵ��ϵͳ����϶��Լ������ĵ����¼�ؼ�  6��δʵ��ϵͳ��*/
                //����ǲ�ͬ�����һ�廯ϵͳ�˵�
                if (menu.tjhqprogram == 4){
                    //��ʱ��ʵ�֣���֪���ĸ���������
                //������������ҵ��ϵͳ����϶��Լ������ĵ����¼�ؼ�
                }else if (menu.tjhqprogram == 5){		                                       
                    //�̶�ϵͳ��ʶ������ĳϵͳ��
                    if (menu.sign == "cshxxt"){
                        //����Ϊ�û�������sessionId
                        mainMenuHtml.push('<li><a href="javascript:cshxxt(\'' + menu.sign + '\',\'uid=' + config.userCode + ' sid=' + config.session + 'LT\');">' + menu.name + '</a>��</li>');
                    }
                    if(menu.sign == "jiuqizichan"){
	 	                //begin ��Ӿ����ʲ������¼   ���޺� 2012.09.14
	        			mainMenuHtml.push('<li><a href="javascript:special(\''+comUcode+'\',\''+comPassword+'\',\''+menurl +'\')" >' + menu.name + '</a>');
				 		mainMenuHtml.push('��</li>');
				 		//end ��Ӿ����ʲ������¼   ���޺� 2012.09.14	
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
                    	// �������ŵ������ύ
				    	mainMenuHtml.push('<form id="app' + menu.code + '" name="app' + menu.code + '" method="post" action="' + menurl + '"  target="_blank" style="display:none">'); 
                        mainMenuHtml.push('<input type="text" name="sid" value=""/></form>');
			    		mainMenuHtml.push('��</li>');	
                    }
                //δʵ��ҵ��ϵͳ��  
                }else if (menu.tjhqprogram == 6){
                    mainMenuHtml.push('<li><a href="#"');
				    mainMenuHtml.push(' onclick="javascript:alert(\'' + promsg + '\');">' + menu.name + '</a>��</li>');
                //ASPϵͳ  
                }else if (menu.tjhqprogram == 7){
                	mainMenuHtml.push('<li><a href="#" onclick="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){app' + menu.code + '.submit();return false;}">' + menu.name + '</a>');
                    //�������ŵ�����������
	    			mainMenuHtml.push('<form id="app' + menu.code + '" name="app' + menu.code + '" method="get" action="' + menurl + '" style="display:none">');					    	//ѭ��ϵͳ����
			    	//ѭ��ϵͳ����
			    	for(var j = 0; j < menu.parameters.length; j++){
			    	    var parameter = menu.parameters[j];
				    	mainMenuHtml.push('<input type="text" name="' + parameter.parametername + '" value="' + parameter.parametervalue + '"/>');
			    	}
			    	//�û�����
				    mainMenuHtml.push('<input type="text" name="uid" value="' + config.userCode + '"/>');
				    //sessionId
				    mainMenuHtml.push('<input type="text" name="sid" value="' + config.session + '"/>');
				    //�������
				    mainMenuHtml.push('<input type="text" name="year" value="' + config.year + '"/></form>');
		    		mainMenuHtml.push('��</li>');
                }else {
                    /**����ҵ��ϵͳ��ַhosturl�Ƿ�Ϊ�������⴦��*/
                    //����hosturlΪ��Ϊ�յ�ҵ��ϵͳ���������ʲô�ã�������ʱ��ʵ��
                    if (menu.hosturl != null){
                        //�ж�ҵ��ϵͳ��ַ���Ż������ַ�Ƿ�һ��
                        if (menu.hosturl == _ROOT_PATH_){
                        
                        }
                    //����hosturlΪ�յ�ҵ��ϵͳ���˴�Ϊ������ҵ��ϵͳ����
                    }else{
                    //ҵ��ϵͳ������û�֧��3.0����������ϵͳ��ʵ���˻�ϵͳ����ҳ�治��_blank
                        if (menu.sign == "YYJZZF3.0" || menu.sign == "nftt" || menu.sign == "account"){
                            mainMenuHtml.push('<li><a href="#" onclick="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){app' + menu.code + '.submit();return false;}">' + menu.name + '</a>');
                            //�������ŵ�����������
					    	mainMenuHtml.push('<form id="app' + menu.code + '" name="app' + menu.code + '" method="post" action="' + menurl + '" style="display:none">');					    	//ѭ��ϵͳ����
					    	//ѭ��ϵͳ����
					    	for(var j = 0; j < menu.parameters.length; j++){
					    	    var parameter = menu.parameters[j];
						    	mainMenuHtml.push('<input type="text" name="' + parameter.parametername + '" value="' + parameter.parametervalue + '"/>');
					    	}
					    	//�û�����
						    mainMenuHtml.push('<input type="text" name="uid" value="' + comUcode + '"/>');
						    //sessionId
						    mainMenuHtml.push('<input type="text" name="sid" value="' + config.session + '"/>');
						    //�������
						    mainMenuHtml.push('<input type="text" name="year" value="' + config.year + '"/></form>');
				    		mainMenuHtml.push('��</li>');	
				    	//BOϵͳ�����¼			    	
				        }else if (menu.sign == "BOZHCX"){
				            //��Ҫʵ��----------------------------------
				        }else if(menu.sign == "xzd"){
					        //begin  �������д󵥵��¼����  ���޺� 2012.09.17
					        mainMenuHtml.push('<li><a href="#" onclick="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){app' + menu.code + '.submit();return false;}">' + menu.name + '</a>');
						    // �������ŵ������ύ
						    mainMenuHtml.push('<form id="app' + menu.code + '" name="app' + menu.code + '" method="post" action="' + menurl + '" target="_blank" style="display:none">');
				     	    //�û�����
							mainMenuHtml.push('<input type="text" name="uid" value="' + config.userCode + '"/>');
							mainMenuHtml.push('<input type="text" name="name" value="' + config.name + '"/></form>');
					    	mainMenuHtml.push('��</li>');	
					    	//end  �������д󵥵��¼����  ���޺� 2012.09.17   
					    	//��������ҵ��ϵͳ
				        }else {
                            mainMenuHtml.push('<li><a href="#" onclick="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){app' + menu.code + '.submit();return false;}">' + menu.name + '</a>');
					    	// �������ŵ������ύ
					    	mainMenuHtml.push('<form id="app' + menu.code + '" name="app' + menu.code + '" method="post" action="' + menurl + '"  target="'+formTarget+'" style="display:none">');                            //ѭ��ϵͳ����
                            //ѭ��ϵͳ����
					    	for(var j = 0; j < menu.parameters.length; j++){
					    		var parameter = menu.parameters[j];
						    	mainMenuHtml.push('<input type="text" name="' + parameter.parametername + '" value="' + parameter.parametervalue + '"/>');
					    	}
					    	//�û�����
						    mainMenuHtml.push('<input type="text" name="uid" value="' + comUcode + '"/>');
						    //sessionId
						    mainMenuHtml.push('<input type="text" name="sid" value="' + config.session + '"/>');
						    //�������
						    mainMenuHtml.push('<input type="text" name="year" value="' + config.year + '"/></form>');
				    		mainMenuHtml.push('��</li>');	
				        }
                    }
                
                }
            //csϵͳ
            }else if (menu.type == 2){
                 cscount=cscount+1;
                /**csҵ��ϵͳ����: 1:̫������ҵ��ϵͳ */
                //̫������ҵ��ϵͳ
                if (menu.tjhqprogram == 1){
                    //����Ԥ����Ƶ�λ��(efmdiv)�����������λ��(dfczdiv)
                    if(menu.sign == "efmdiv" || menu.sign == "dfczdiv"){
                        mainMenuHtml.push('<li><a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){loadAppcaller();AppCaller.callApp(\'');
                    //��������csҵ��ϵͳ
                    }else {
                        mainMenuHtml.push('<li><a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){loadAppcaller();AppCaller.callHqApp(\'');
                    }
                    //ҵ��ϵͳ��ʶ
                    mainMenuHtml.push(menu.sign + '\',\'');
                    //�洢ҵ��ϵͳ��Ӧ���ݿ��б���Ϣ
                    var dbs = {};
                    //���ݿ��ѯ��������
                    //var dbsConfig = {};
                    //ҵ��ϵͳ����
                   // dbsConfig.programCode = menu.code;
                    //�������
                    //dbsConfig.year = config.year;
                    //��ѯҵ��ϵͳ��Ӧ���ݿ���Ϣ
                   // dbs = Ext.lt.RCP.asynserver('defaultCommonService', "getDbConfig",  dbsConfig);
                    //�洢ҵ��ϵͳ��Ӧ��ϵͳ�б���Ϣ
                    var subPrograms = {};
                    //��ѯҵ��ϵͳ��Ӧ��ϵͳ��Ϣ
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
                    //�ж�����ǲ���Ԥ���ϵͳ����Ҳ��exp
                    if(menu.sign == "expxtgl"){
                        //�û�����
                    	mainMenuHtml.push('|exp|' + comUcode.toLowerCase());
                    //ָ��ϵͳϵͳ����
                    }else if(menu.sign == "indisys"){
                    	mainMenuHtml.push('|indi|' + comUcode.toLowerCase());
                    //��������ҵ��ϵͳ
                    }else{
                    	mainMenuHtml.push('|' + menu.sign + '|' + comUcode.toLowerCase());
                    }
                    //�������ϵͳ���������ݿ����������ϵͳ�������Ӳ�ͬ��ȵ����ݿ⣬Ĭ��ȡ��һ��
                    if(dbs.length > 0){
                        //ҵ��ϵͳ���ݿ����
                    	var db = dbs[0];
                    	mainMenuHtml.push('|' + db.dbstr);
                    }
                    //�Ƿ���ҪsessionID
                    if(menu.needsid ==1 ){
                    	mainMenuHtml.push('|' + config.session);
					}
					//��װҵ��ϵͳ����
					for(var j = 0; j < menu.parameters.length; j++){
						mainMenuHtml.push('|' + menu.parameters[j].parametervalue);
					}
					mainMenuHtml.push('\');}">' + menu.name + '</a>');
					//���ҵ��ϵͳ���ڶ������ݿ�����
					if(dbs.length>1){
					    //�ڲ˵������һͼ�֧꣬���������¼��������º󵯳������������ѡ���
						mainMenuHtml.push('&nbsp;<IMG id="img' + menu.code + '" alt="�л���" src="' + _ROOT_PATH_ + '/images/list.gif" style="margin-top:10px;cursor:pointer;" onmouseover="mvqMOv(\'img' + menu.code + '\',\'panelDiv' + menu.code + '\')";>');
						//�����˵���ʽdiv
						menudiv.push('<div id="panelDiv' + menu.code + '" style="position:absolute;visibility:hidden; z-index:1000; WIDTH: 90px; BORDER-RIGHT: #8BA3DA 1px solid; PADDING-RIGHT: 12px;BORDER-TOP: #8BA3DA 1px solid; PADDING-LEFT: 12px; PADDING-BOTTOM: 12px; BORDER-LEFT: #8BA3DA 1px solid; PADDING-TOP: 12px;BORDER-BOTTOM: #8BA3DA 1px solid; BACKGROUND-COLOR: #FFFFFF" onmouseover="panelMOv(\'panelDiv' + menu.code + '\');" onmouseout="panelMOu(\'panelDiv' + menu.code + '\');">');
						menudiv.push('<table width=100% >');
						menudiv.push('    <tr valign=top><td width=20% class="sngPst">');
						//ѭ���������ݿ���Ϣ
						for(var j = 0;j<dbs.length; j++){
						         //���ݿ����
							     var db = dbs[j];
								 menudiv.push('<div class="divline" nowrap>');
								 //�����������ϵͳ
								 if(subPrograms.length == 0){
			                        //�ж��Ƿ��ǻ���Ԥ����Ƶ�λ��(efmdiv)�����������λ��(dfczdiv)
			                        if(menu.sign == "efmdiv" || menu.sign == "dfczdiv"){
										 menudiv.push('<a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){loadAppcaller();AppCaller.callApp(\'');
			                        }else{
										 menudiv.push('<a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){loadAppcaller();AppCaller.callHqApp(\'');
			                        }
			                        menudiv.push(menu.sign + '\',\'');
									 //�ж�����ǲ���Ԥ���ϵͳ����Ҳ��exp
									 if(menu.sign == "expxtgl"){
                    					menudiv.push('|exp|' + comUcode.toLowerCase());
                    				//�����ָ��ϵͳ��ϵͳ����
                    				}else if(menu.sign == "indisys"){
                    					menudiv.push('|indi|' + comUcode.toLowerCase());
                    				}else if(menu.sign == "hqexp"){
                    					//���ɹŻ��岿��Ԥ��ϵͳʹ��
                                    	mainMenuHtml.push('|efmis|' + comUcode.toLowerCase());
                                        //��������ҵ��ϵͳ
                                    }else{
                    					menudiv.push('|' + menu.sign + '|' + comUcode.toLowerCase());
                    				}
                    				//���ݿ������Ϣ
	                        		menudiv.push('|' + db.dbstr);
	                        		//�Ƿ񴫵�sessionID
	                        		if(menu.needsid == 1){
	                        		 	menudiv.push('|' + config.session);
	                        		}
									//��װҵ��ϵͳ����
									for(var p = 0; p < menu.parameters.length; p++){
										menudiv.push('|' + menu.parameters[p].parametervalue);
									}
									menudiv.push('\');}">');
								 }
								 //���ݿ�����
								 menudiv.push(db.dbname);
								 //�����������ϵͳ�����ƴװ
								 if(subPrograms.length == 0){
								 	menudiv.push('</a>');
								 }
								 menudiv.push('</div>');
								 //���������ϵͳ
								 for(var h = 0; h < subPrograms.length; h++){ 
								     //��ϵͳ����
								     var subprogram = subPrograms[h];
									 menudiv.push('<div class="divline" nowrap>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:loadAppcaller();AppCaller.callHqApp(\'');
									 //ҵ��ϵͳ��ʶ
									 menudiv.push(menu.sign + '\',\'');
									 //�ж�����ǲ���Ԥ���ϵͳ����Ҳ��exp
									 if(menu.sign == "expxtgl"){
                    					menudiv.push('|exp|' + comUcode.toLowerCase());
                    				 //ָ��ϵͳϵͳ����
                    				 }else if(menu.sign == "indisys"){
                    					 menudiv.push('|indi|' + comUcode.toLowerCase());
                    				 }else{
                    					 menudiv.push('|' + subprogram.sign + '|' + comUcode.toLowerCase());
                    				 }
                    				 //���ݿ����		 
	                        		 menudiv.push('|' + db.dbstr);
	                        		 //�����ҪsessionID
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
					mainMenuHtml.push('��</li>');
					//�ж�TjhqprogramΪ5�ģ��ǵ����¿ؼ��ĵط���ƴ�ɵ����ӵ�ַ,����ĳϵͳ
                }else if (menu.tjhqprogram == 5){
                     //����ϵͳ��ʶ�ж�
                     if(menu.sign == "yszxxt1"){
                     	mainMenuHtml.push('<li><a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){yszxxt1(\'');
                     	//ϵͳ��ʶ
                     	mainMenuHtml.push(menu.sign + '\',\'');
                     	//�û�����+sessionID
				        mainMenuHtml.push('uid=' + config.userCode + ' sid=' + config.session + 'LT\'');
                     	mainMenuHtml.push(');}"> ' + menu.name + '</a>');
						mainMenuHtml.push('��</li>');
                     }
                     if(menu.sign == "yszxxt2"){
                     	mainMenuHtml.push('<li><a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){yszxxt2(\'');
                     	//ϵͳ��ʶ
                     	mainMenuHtml.push(menu.sign + '\',\'');
                     	//�û�����+sessionID
				        mainMenuHtml.push('uid=' + config.userCode + ' sid=' + config.session + 'LT\'');
                     	mainMenuHtml.push(');}"> ' + menu.name + '</a>');
						mainMenuHtml.push('��</li>');
                     }
                     if(menu.sign == "jzzfdw"){
                     	mainMenuHtml.push('<li><a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){jzzfdw(\'');
                     	//ϵͳ��ʶ
                     	mainMenuHtml.push(menu.sign + '\',\'');
                     	//�û�����+sessionID
				        mainMenuHtml.push('uid=' + config.userCode + ' sid=' + config.session + 'LT\'');
                     	mainMenuHtml.push(');}"> ' + menu.name + '</a>');
						mainMenuHtml.push('��</li>');
                     }
                     if(menu.sign == "gwkzf"){
	                        mainMenuHtml.push('<li><a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){gwkzf(\'');
	                     	//ϵͳ��ʶ
	                     	mainMenuHtml.push(menu.sign + '\',\'');
	                     	//�û�����+sessionID
					        mainMenuHtml.push('uid=' + config.userCode + ' sid=' + config.session + 'LT\'');
	                     	mainMenuHtml.push(');}"> ' + menu.name + '</a>');
							mainMenuHtml.push('��</li>');
                     }if(menu.sign == "jzzfdws"){
                     	 mainMenuHtml.push('<li><a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){jzzfdws(\'');
                     	//ϵͳ��ʶ
                     	mainMenuHtml.push(menu.sign + '\',\'');
                     	//�û�����+sessionID
				        mainMenuHtml.push('uid=' + config.userCode + ' sid=' + config.session + 'LT\'');
                     	mainMenuHtml.push(');}"> ' + menu.name + '</a>');
						mainMenuHtml.push('��</li>');
                     }
                //δʵ��ϵͳ
                }else if (menu.tjhqprogram == 6){
                 	mainMenuHtml.push('<li><a href="javascript:alert(\'' + promsg + '\'');
                 	mainMenuHtml.push(');"> ' + menu.name + '</a>');
					mainMenuHtml.push('��</li>');
				//����csҵ��ϵͳ
                }else {
                        //��ͼƽ̨�ͻ���ϵͳ
                        if(menu.hosturl != null){
	                            mainMenuHtml.push('<li><a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){loadAppcaller();AppCaller.callApp(\'');
	                            mainMenuHtml.push(menu.sign + '\',\'');
			                    mainMenuHtml.push('uid=' + comUcode + ' sid=' + config.session + 'LT');
								for(var j = 0; j < menu.parameters.length; j++){
								    mainMenuHtml.push(' ');
	                                mainMenuHtml.push(menu.parameters[j].parametername + '=' + menu.parameters[j].parametervalue);
								}
								mainMenuHtml.push('\');}"> ' + menu.name + '</a>');
								mainMenuHtml.push('��</li>');
						//����ҵ��ϵͳ
			            }else {
	                            mainMenuHtml.push('<li><a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){loadAppcaller();AppCaller.callApp(\'');
	                            mainMenuHtml.push(menu.sign + '\',\'');
			                    mainMenuHtml.push('uid=' + comUcode + ' sid=' + config.session);
								for(var j = 0; j < menu.parameters.length; j++){
								    mainMenuHtml.push(' ');
	                                mainMenuHtml.push(menu.parameters[j].parametername + '=' + menu.parameters[j].parametervalue);
								}
								mainMenuHtml.push('\');}"> ' + menu.name + '</a>');
								mainMenuHtml.push('��</li>');
			            }
                }
            
            } //CSҵ��ϵͳ����BSҵ��ϵͳ
        } //һ�廯�˵����ǽ���˵�
    } //ѭ���������в˵�
    if(cscount>0){
    	 if (config.isshowmenus == "true"){
             //������
 			if(menulength*16>=menuwidth){
 				//����
 				mainMenuHtml.push('<br><li>��</li>');
 				menulength=1;
 			}
         }
    	//begin ���޺� 2012.12.06 ҵ������ַ��Ϊ������
    	mainMenuHtml.push('<li><a href="#" onclick="openApp();"> ҵ������ַ����</a>��</li>');
    	//end ���޺� 2012.12.06 ҵ������ַ��Ϊ������
    }
    mainMenuHtml.push('    </ul>');
    //���û���ҵ��ϵͳ������ϵͳ�����˵�
    mainMenuHtml.push('        <div id="panelDiv">' + menudiv.join('') + '</div>');
    mainMenuHtml.push('	   </div>');  
	mainMenuHtml.push('</td>');
	//����ǵ�����ʾ,����ʾ���ļ�ͷ
	if (config.isshowmenus == "false"){
	    mainMenuHtml.push('<td width="20px"><img src="' + _ROOT_PATH_ + '/images/done_btn/next.gif" style="cursor:pointer;" title="���" onclick="showNext()"/></td>');	
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

/**��̬����appcaller�ؼ�*/
function loadAppcaller(){
	Ext.lt.ifmis.activex.loadAppCallerOcx();
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
			 var msghtml = '<font color=#155402>&nbsp&nbsp�����ˣ�'+message.sendname+'</font><br><a id="msglink" target="_blank"  href="'+message.linkname+'">&nbsp&nbsp��Ϣ���ݣ�'+message.content+'</a>';
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
					if(resp!=null&&resp.msgList!=null){
						param.msgList = resp.msgList; 
						Ext.lt.RCP.server('rightnowmessage', "saveAllMessage", param, function (resp) {startCheckMsg();
						},function(){startCheckMsg();});
					}
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

//��������ͳ��
Ext.lt.portal.component.onlineuser=function(){
	//�������ȷ�����߲���ȡ������������
	function checkOnline(){
		Ext.lt.RCP.server('onlineservice', "checkOnline",  null, 
		function (resp) {
			startCheckOnline();
		},
		// ���ʧ�ܣ�������������ʱ��
		function(){startCheckOnline()});
	}
	// ������ʱ��
	function startCheckOnline(){
		if(onlinetime==null)
			onlinetime=300000;
		window.setTimeout(checkOnline,onlinetime);
	}
	checkOnline();
}

//begin ���޺� 2012.12.06 ҵ������ַ��Ϊ������
function openApp(){
		window.showModalDialog(ROOT_PATH+"/common/applocation.do","","dialogWidth:646px;dialogHeight:442px;center:yes;help:no;resizable:no;status:no");
	}
//end ���޺� 2012.12.06 ҵ������ַ��Ϊ������

//�˳�
function IsLogout(caUkeycheck,ischeckpengding){
	//ɽ��ca��֤��¼��Ҫ��ͳһ��֤ƽ̨ע��
	var config = Ext.lt.portal.component.menu.config;
	var exiturl = config.exiturl;
	if(ischeckpengding == "true"){//����Ƿ��д���
		checkTask(caUkeycheck);
	}else if(caUkeycheck == "1"){//�����˳�ʱ����UKEY���
		checkXMUeky(caUkeycheck);
	}else if(exiturl){
		ATL1.setpinstate();
		ATL1.clearssl();
		window.location.href = _ROOT_PATH_+"/logout.page";
	}else{
	window.location.href = _ROOT_PATH_+"/logout.page";
	}	
}
//begin ���޺� 2012.11.21 �˳�ʱ����Ƿ����޴�������
function checkTask(caUkeycheck){
	var config = Ext.lt.portal.component.menu.config;
	var menuid = "";
	var hosturl = "";
	//���ӵ�ַ
	var clientmodules = "";
	//�˵�����
	var meunname = "";
	//ҵ��ϵͳ����
	var type = "";
	//�û�����
	var uid = config.userCode;
	//sessionID 
	var sid = config.session;
	//�������
	var year = config.year;	
	//ѭ��������ϵͳ��Ϣ
	for (var i = 0; i < config.totalmenus.length; i ++){
		var menu = config.totalmenus[i];
        //���������ҵ��ϵͳ
        if (menu.menuid){
        	clientmodules += menu.clientmodule + ";";
            //�˵�����
    		menuid += menu.menuid + ";";
    		//ҵ��ϵͳ��ַ
    		hosturl += "0" + ";";
    		//�˵�����
    		meunname += menu.name + ";";
    		//ҵ��ϵͳ���ͣ�һ�廯��ͬ����ҵ��ϵͳ���뼰һ�廯����ҵ��ϵͳ����
    		type += 4 + ";";
		}else{
        	//�������ҵ��ϵͳ��Ҫչʾ��������
			if (menu.haspendingtask) {		   
			//�˵�����
			clientmodules +="null;";
		    //ҵ��ϵͳ����
			menuid += menu.code + ";";
			//ҵ��ϵͳ��ַ
			hosturl += menu.hosturl + ";";
			//ҵ��ϵͳ����
			meunname += menu.name + ";";
			//ҵ��ϵͳ����
			type += menu.tjhqprogram + ";";
			}
		}
     }
	 var pdtPara = {};
     //�˵�����
     pdtPara.menuid = menuid;
     //ϵͳ����
     pdtPara.clientmodules = clientmodules;
     //ҵ��ϵͳ��ַ
     pdtPara.hosturl = hosturl;
     //ҵ��ϵͳ����
     pdtPara.meunname = meunname;
     //ҵ��ϵͳ����
     pdtPara.type = type;
     //�û�����
     pdtPara.uid = uid;
     //sessionID
     pdtPara.sid = sid;
     //�������
     pdtPara.year = year;
     //��ѯ����������Ϣ
     Ext.lt.RCP.server('defaultCommonService', "CheckPendingTask",  pdtPara, function (resp) {
    	 if(resp!=null&&resp!=""&&resp.length > 0){
     	 	 if(confirm("���д�������δ�����Ƿ��˳�?")){
     	 	 	checkXMUeky(caUkeycheck);
     	 	 }
	      }else{
	  		checkXMUeky(caUkeycheck);
	      }
      },function (resp){
			checkXMUeky(caUkeycheck);
      });
}
//end ���޺� 2012.11.21 �˳�ʱ����Ƿ����޴�������

//�����˳�ʱ����UKEY���
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
		if(window.confirm("�����ƶ�֤��UKEY�����ڵ����ϣ����˳�һ�廯ϵͳǰǿ�ҽ������Ȱε�UKEY��\r �����ȷ�����˳�һ�廯ʱ���ε�UKEY,�밴��ȷ�����������򰴡�ȡ�������ء�")){
			if(window.confirm("���棺����ȷ�����˻�һ�廯ϵͳʱ���ε�UKEY�������ٴ�ȷ���Ƿ�Ҫ���ε�UKEY�˳�һ�廯ϵͳ��")){
				window.location.href = _ROOT_PATH_+"/logout.page";
			}
		}
	}else{
		window.location.href = _ROOT_PATH_+"/logout.page";	
	}
}

//��������UKey��½��ε����ܵ����½������
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
			alert("δ��⵽����֤�飬��ȷ���Ѿ������������֤���USBKEY��ϵͳ��Ҫ�˳�");
			window.location.href = _ROOT_PATH_ + '/logout.page';
			return false;
		}
	}
	return true;
}

/**
 * �л������ת
 */
function goToChangeYear(){
	document.getElementById('surebtn').disabled = true;
	var changeYearselect = document.getElementById('changeYearselect');
	var yearValue = changeYearselect.value;
	if(yearValue.indexOf(titleYear)!=-1){
		wind.close();
		//window.alert("�뵱ǰ����ظ���");
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
				alert("�л����ʧ��");
			}
			document.getElementById('surebtn').disabled = false;
		}
    },function (resp){
    });
}

/**
 * ��������ӷ�������л���ȣ���Ҫ�������񴫹����ĵ��������в�ѯ��Ҫ�л�����ȵ�ַ
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
 * ������ֵ���ύ��
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
		//CA��֤��Ϣ
		loginForm.signed_data.value = resp.signed_data;
		//CA��֤�������Ϣ
		loginForm.DSign_Content.value = resp.DSign_Content;
	}else{//����ca
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
 * ��ʾ������
 */
function showCalculator(){
	var command = "calc.exe"
	
	window.oldOnError = window.onerror;
    window._command = command;
    window.onerror = function (err) {
      if (err.indexOf('utomation') != -1) {
        alert('����' + window._command + ' �Ѿ����û���ֹ\n������IE��<��δ���Ϊ�ɰ�ȫִ�нű���ActiveX�ؼ���ʼ����ִ�нű�>'); 
        return true;
      }
      else return false;
    };
    var wsh = new ActiveXObject('WScript.Shell');
    if (wsh)
      wsh.Run(command);
    window.onerror = window.oldOnError;
}/**
 * �л����
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


//logo������ʾ֮���������Ϣ��һ�����ʣ�����ȡ������Ӧdiv
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
	//�������߰����Ŀ�ݼ�'shift+as'
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
	//logo�����ʰ�ť
	var _quickhelp=document.getElementById("quickhelp");
	if(_quickhelp!=null){
	_quickhelp.onclick=Ext.lt.showhelpWin;
	}
	Ext.lt.regKeyEvent('as',Ext.lt.showhelpWin,false,true);
});
//�����ʼ�ϵͳ��һ�ε������userLoginEx ��ȡ��Ӧ����
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
		title:'���ͼƬ',
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
		//-----------------�ϴ�����������ϴ��฽������һ��ֵΪ����ô�������ϴ�
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
				alert("��Ƭ�ϴ�����ֻ��֧�֣�"+types+"�����ͣ�");
		     	return false;
			}
		}
		savefile();
		//isNotUpload();
		}else{
			alert("�ϴ���ƬΪ��!");
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
