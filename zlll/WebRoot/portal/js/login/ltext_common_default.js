/**
*��¼��ҳ��������
*/
//����js·������ 
// ����Portal�����ռ�
if(Ext.lt.portal==null) Ext.lt.portal = {component:{}};
if (Ext.lt.portal.component == null) {
	Ext.lt.portal.component = {};
}
//��ҳ�������Ϣ
var para = new Object(); 
//��¼��ҳչʾ���󣨲˵�����������ȣ�
Ext.lt.portal.component.login = new function () {
	//��¼��ҳserver
	this.server="";
	this.config="";
	
	/**��������չʾ����Χ��ܣ�*/
	function pendingTaskShow(config){
	    //��������洢�������
	    var pendingTaskHtml = [];
		var tempwidth=(document . body . clientWidth/100)*3+8+482;
	    //�ж��Ƿ�ֻ��ʾ�������������桢���ٵ�������������ʾ��
		if (config.isbulletin == "false" && config.quickguidMenu.length == 0 && config.isshowreport == "false") {
			pendingTaskHtml.push('<div id="default_center">');
		//��������������ʾ
		}else {
	        pendingTaskHtml.push('<div id="default_center" style=" float: left; margin-left: 10px; width:65%; margin-top: 5px;display:inline;" layout="{w:{fit:-515},h:{fit:-10}}">');
		}
		//��������չʾ�������
		pendingTaskHtml.push('       <div id="default_top_simple" >');
		pendingTaskHtml.push('         <div style="width:100%;">��������</div>');
		pendingTaskHtml.push('       </div>');
		//����������������չ
		pendingTaskHtml.push('       <div id="default_middle_simple" style = "overflow-x: hidden; overflow-y: auto; padding-top: 0px;padding-bottom: 0px;"; layout="{h:{fit:\'auto\'}}">');
		/*
		pendingTaskHtml.push('    	     <span id="middle_inner">');
		pendingTaskHtml.push('		         <table width=97% border=0 cellpadding=0 cellspacing=0>');
        //���������ȡ���ñ���
        //�˵�ID
		var menuid = "";
		//ҵ��ϵͳ��ַ
		var hosturl = "";
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
		//����ҵ��ϵͳ��Ŀ
		var count = 0;
		//ѭ��������ϵͳ��Ϣ
		for (var i = 0; i < config.totalmenus.length; i ++){
	        //�˵����� 
	        var menu = config.totalmenus[i]
	        //���������ҵ��ϵͳ
	        if (menu.menuid){
	            //�˵�����
				menuid += menu.menuid + ";";
				//ҵ��ϵͳ��ַ
				hosturl += "0" + ";";
				//�˵�����
				meunname += menu.name + ";";
				//ҵ��ϵͳ���ͣ�һ�廯��ͬ����ҵ��ϵͳ���뼰һ�廯����ҵ��ϵͳ����
				type += 4 + ";";
				count=count+1;
				//����ҵ��ϵͳչʾ����һ��ҵ��ϵͳռ��һ������һ��
				pendingTaskHtml.push('<tr>');
				pendingTaskHtml.push('    <td>');
				pendingTaskHtml.push('        <div id=' + menu.menuid + '>');
				pendingTaskHtml.push('        </div>');
				pendingTaskHtml.push('    </td>');
				pendingTaskHtml.push('</tr>');    
	        //����ǽ���ҵ��ϵͳ
	        }else {
	            //�������ҵ��ϵͳ��Ҫչʾ��������
				if (menu.haspendingtask) {
				//alert(menu.haspendingtask);
				    //ҵ��ϵͳ����
					menuid += menu.code + ";";
					//ҵ��ϵͳ��ַ
					hosturl += menu.hosturl + ";";
					//ҵ��ϵͳ����
					meunname += menu.name + ";";
					//ҵ��ϵͳ����
					type += menu.tjhqprogram + ";";
					count=count+1;
					//����ҵ��ϵͳչʾ����һ��ҵ��ϵͳռ��һ������һ��
					pendingTaskHtml.push('<tr>');
					pendingTaskHtml.push('    <td>');
					pendingTaskHtml.push('        <div id=' + menu.code + '>');
					pendingTaskHtml.push('        </div>');
					pendingTaskHtml.push('    </td>');
					pendingTaskHtml.push('</tr>');    
				}
	        }
	        //��װ���������ѯ������ÿ���һ��������˷���
	        if (count == 5 || i == config.totalmenus.length - 1){
		        var pdtPara = {};
		        //�˵�����
		        pdtPara.menuid = menuid;
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
                Ext.lt.RCP.server('defaultCommonService', "getPendingTask",  pdtPara, function (resp) {
                    //���������ѯ���ؽ��չʾ
                    showPendingTask(resp);
                });
                //��ո�������Ϣ
				//ҵ��ϵͳ����
				menuid = "";
				//ҵ��ϵͳ��ַ
				hosturl = "";
				//ҵ��ϵͳ����
				meunname = "";
				//ҵ��ϵͳ����
				type = "";
				count = 0;
	        }
		}
		pendingTaskHtml.push('		         </table>');
		pendingTaskHtml.push('           </span>');
		*/
		pendingTaskHtml.push('       </div>');
		pendingTaskHtml.push('       <div id="default_bottom_simple">');
		pendingTaskHtml.push('	         <div style="width:100%;"><span></span></div>');
		pendingTaskHtml.push('       </div>');
	    pendingTaskHtml.push('    </div>');
	    return pendingTaskHtml.join('');
	};
	/**��������չʾ(����)*/
	this.pendingTaskShowAfter=function(config){
	    //��������洢�������
	    var pendingTaskHtml = [];
		pendingTaskHtml.push('    	     <span id="middle_inner">');
		pendingTaskHtml.push('		         <table width=97% border=0 cellpadding=0 cellspacing=0>');
        //���������ȡ���ñ���
        //�˵�ID
		var menuid = "";
		//ҵ��ϵͳ��ַ
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
		//����ҵ��ϵͳ��Ŀ
		var count = 0;
		//ѭ��������ϵͳ��Ϣ
		for (var i = 0; i < config.totalmenus.length; i ++){
	        //�˵����� 
	        var menu = config.totalmenus[i]
	        //���������ҵ��ϵͳ
	        if (menu.menuid){
	            //�˵�����
				clientmodules += menu.clientmodule + ";";
	            //�˵�����
				menuid += menu.menuid + ";";
				//ҵ��ϵͳ��ַ
				hosturl += "0" + ";";
				//�˵�����
				meunname += menu.name + ";";
				//ҵ��ϵͳ���ͣ�һ�廯��ͬ����ҵ��ϵͳ���뼰һ�廯����ҵ��ϵͳ����
				type += 4 + ";";
				count=count+1;
				//����ҵ��ϵͳչʾ����һ��ҵ��ϵͳռ��һ������һ��
				pendingTaskHtml.push('<tr>');
				pendingTaskHtml.push('    <td>');
				pendingTaskHtml.push('        <div  id=' + menu.menuid + '>');
				pendingTaskHtml.push('        </div>');
				pendingTaskHtml.push('    </td>');
				pendingTaskHtml.push('</tr>');    
	        //����ǽ���ҵ��ϵͳ
	        }else {
	            //�������ҵ��ϵͳ��Ҫչʾ��������
				if (menu.haspendingtask == 'true') {
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
					count=count+1;
					//����ҵ��ϵͳչʾ����һ��ҵ��ϵͳռ��һ������һ��
					pendingTaskHtml.push('<tr>');
					pendingTaskHtml.push('    <td>');
					pendingTaskHtml.push('        <div id=' + menu.code + '>');
					pendingTaskHtml.push('        </div>');
					pendingTaskHtml.push('    </td>');
					pendingTaskHtml.push('</tr>');    
				}
	        }
	        //��װ���������ѯ������ÿ���һ��������˷���
	        if (count == 5 || i == config.totalmenus.length - 1){
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
                Ext.lt.RCP.server('defaultCommonService', "getPendingTask",  pdtPara, function (resp) {
                    //���������ѯ���ؽ��չʾ
                	if(config.portalisshownewpendingtask==0){
                		showPendingTaskNEW(resp);
                	} else if (config.portalisshownewpendingtask==2){  // �����°�UI
                		task_render.append(resp);
                	} else {
                    	showPendingTask(resp);
                	}
                });
                //��ո�������Ϣ
				//ҵ��ϵͳ����
				menuid = "";
				//ҵ��ϵͳ��ַ
				hosturl = "";
				//ҵ��ϵͳ����
				meunname = "";
				//ҵ��ϵͳ����
				type = "";
				count = 0;
				clientmodules="";
	        }
		}
		pendingTaskHtml.push('		         </table>');
		pendingTaskHtml.push('           </span>');
	    return pendingTaskHtml.join('');
	};
	/**************���������ѯ���ؽ��չʾ**********/
	function showPendingTask(config){ 
	    //��������չʾ���󼯺�
	    var totallist = config;
		var isMergeOperate = false;
		if(totallist && totallist.length>0){
			var mergeOperate =  totallist[0];
			
			if(mergeOperate.isMergeOperate != undefined){
				isMergeOperate = mergeOperate.isMergeOperate;
				
				//�Ƴ���һ��
				totallist.shift();
			}
		}
	    for(var index = 0;index < totallist.length; index++)
	    {   
	        //ҵ��ϵͳ��������������磺ָ��ϵͳ
		    var pendingtasks=totallist[index];
		    //�����������洢�������
		    var taskStrHtml = [];
		    //���ҵ��ϵͳ��Ҫ��ʾ��������
		    if(pendingtasks.size()>0){
		       //���������ҵ��ϵͳ
			   if(pendingtasks[0].outter!=1)
			   {   
			       //���ҵ��ϵͳ�����ڴ�������
				   if(!pendingtasks[0].name)
				   {
				        //ҵ��ϵͳID
					    var k=pendingtasks[0].k;
					    //ҵ��ϵͳ����
						var menuname=pendingtasks[0].menuname;
						//ҵ��ϵͳ����
						var menuurl=pendingtasks[0].clientmodule;
						//��ʾҵ��ϵͳ����
						taskStrHtml.push('<p style="display:block; overflow:auto;">');
						taskStrHtml.push('<a class=inner_title href="' + _ROOT_PATH_+menuurl+'">'+ menuname + '&nbsp&nbsp&nbsp&nbsp<b style="color:#000; font-weight:normal;"></b>' + '</a>');
						taskStrHtml.push('</p>');
			       }
			       //���ҵ��ϵͳ���ڴ�������
			       else{
			           //�û�����
					   var count=0;
					   //����������������٣���С������ʾ��ĸ߶ȣ����ٿհ�
					   if(pendingtasks.size()<=2){
					   		var total=0;
					   		for(i=0; i<pendingtasks.size();i++) {
					   			var tempdetails = pendingtasks[i].details;
					   			if(tempdetails.size()>total)total=tempdetails.size();
					   		}
					   		var divH=150-(4-total)*13;
					   		taskStrHtml.push('<p style="height:'+divH+'px; display:block; overflow:auto;">');
					   }else{
					     	taskStrHtml.push('<p style="height:150px; display:block; overflow:auto;">');
					   }
					   //��ʾҵ��ϵͳ����
					   taskStrHtml.push('<a class=inner_title href="' + _ROOT_PATH_+pendingtasks[0].clientmodule+'">'+ pendingtasks[0].menuname + '</a>');
					   //ҵ��ϵͳ�д�������չʾ���
					   taskStrHtml.push('<table width=97% border=0 cellpadding=0 cellspacing=0>');
					   //ѭ��ҵ��ϵͳ��ϵͳ,���磺��ָ����ء���λָ������ȵ�
				       for(i=0; i<pendingtasks.size();i++) {
				       		//����ҵ��ϵͳ��ϵͳ����
							var pendingtask= pendingtasks[i];
							//ҵ��ϵͳ��ϵͳ��������������磺����ˡ�����ӡ�ȵ�
							var details = pendingtask.details;
							//��ϵͳ�����ַ
							var hostip = pendingtask.hostip;
							//��ϵͳ����˿�
							var hostport=pendingtask.hostport;
							//��ϵͳ���ط����ַ
							var localip = pendingtask.localip;
							//��ϵͳ���ط���˿�
							var localport=pendingtask.localport;
							//�û�����
							var uid=pendingtask.uid;
							//ҵ��ϵͳ�˵��ɣ�
							var k = pendingtask.k;
							//sessionID
							var sid=pendingtask.sid;
							//�������
							var year=pendingtask.year;
							if(pendingtask.totalcount > 0){
								count++;
								//�Ƿ���
								if(count%2==1)
								{
				      				taskStrHtml.push('<tr>');
				    			}
				    			//��ϵͳ��������չʾ
								taskStrHtml.push('<td width="45%" style="vertical-align:top;">' + '<span>');
								//��ϵͳ����ǰ������ͼ��
								taskStrHtml.push('<img src="' + _ROOT_PATH_ + '/images/bg/top.gif"/>');
								taskStrHtml.push(pendingtask.name + '----->��' + pendingtask.totalcount + '��<br/>');
							}
							//�ϲ�ͬһ��muenuid�͹�����״̬�ĵ���
							if (isMergeOperate) {							
								var detailsCache = {}, _tempdetails = [];
								//&submenu=23633&wfstat='118'&fromtask=yes
								(function(){
									for (var k = 0, n = details.length; k < n; k++) {
										var detail = details[k];
										var linkName = detail.linkName;
										
										if (linkName && ~ linkName.indexOf("&submenu") && ~ linkName.indexOf("&wfstat")) {
											var submenu = linkName.substring(linkName.indexOf("&submenu=") + "&submenu=".length, linkName.indexOf("&wfstat"));
											var wfstat = linkName.substring(linkName.indexOf("&wfstat=") + "&wfstat=".length, linkName.indexOf("&fromtask"));
											
											var operatName = detail.operattypedto.name;
											var key = submenu + "-" + operatName;
											
											if (detailsCache[key]) {
												var _tempDetail = detailsCache[key];
												
												_tempDetail.totalcount = parseInt(_tempDetail.totalcount, 10) + parseInt(detail.totalcount, 10);
												
												var _linkName = _tempDetail.linkName;
												var _wfstat = _linkName.substring(_linkName.indexOf("&wfstat=") + "&wfstat=".length, _linkName.indexOf("&fromtask"));
												
												var new_wfstat = _wfstat + "," + wfstat;
												
												_tempDetail.linkName = _linkName.replace("wfstat=" + _wfstat, "wfstat=" + new_wfstat);
											}
											else {
											
												detailsCache[key] = detail;
											}
										}
										else {
											_tempdetails.push(detail);
										}
									}
									
									for (var dc in detailsCache) {
									
										_tempdetails.push(detailsCache[dc]);
									}
								})();
								
								details = _tempdetails;
							}
							//������ϵͳ����������磺����ˡ�����ӡ��
							for(j=0;j<details.size();j++)
							{ 
								//��ϵͳ��������������磺����ˡ�����ӡ��
								detail=details[j];
								//���˴�������Ϊ0�Ķ���
								if(detail.totalcount > 0){
								    //��ϵͳ��������ǰ��ͼ��
								    taskStrHtml.push('&nbsp' + '<img src="' + _ROOT_PATH_ + '/images/bg/20.png" />');
								    //��ϵͳ�����������ӵ�ַ
								    var url="http://"+hostip+":"+hostport+detail.linkName;
								    //�滻���ӵ�ַ�еĲ������ַ�
								    url=url.replace(/&/g, "%26");
								    //���ҵ��ϵͳ�ķ����ַΪ����ʹ�õ�ǰϵͳ��Ĭ�ϵ�ַ
								    if(hostip == "" && hostport == ""){
								       taskStrHtml.push('<a href="' + _ROOT_PATH_);
								       taskStrHtml.push(detail.linkName + '">');
								    }  
								    //������ҵ��ϵͳ�ķ����ַ�뵱ǰ�����ַ��ͬ��ʹ�õ�ǰϵͳ��Ĭ�ϵ�ַ 
								    else if(hostip == localip && hostport == localport)
									{
								       taskStrHtml.push('<a href="' + _ROOT_PATH_);
								       taskStrHtml.push(detail.linkName + '">');
								    }
								    //������������ҵ��ϵͳ
								    else{
								       taskStrHtml.push('<a href="http://');
								       taskStrHtml.push(hostip + ':' + hostport + '/common/pendingtasklogin.do' + '?uid=' + uid + '&sid=' + sid + '&year=' + year + '&url=' + url + '">');
								    }
								    //��ʾ���������������
								    taskStrHtml.push('&nbsp��' + detail.operattypedto.name + '&nbsp' + detail.totalcount + '��</a>');
					   				taskStrHtml.push('<br/>');   
								}
						    } 
							taskStrHtml.push('</span>' + '</td>');
							//��ϵͳ�Ƿ���
							if(count%2==0){
			      			    taskStrHtml.push('</tr>');
			    			}  
					    }
						taskStrHtml.push('</table>');
						taskStrHtml.push('</p>');
				    }
			   }
			   //���Ϊ�����������
			   if(pendingtasks[0].outter==1){
				   //ѭ��ҵ��ϵͳ��ϵͳ��Ϣ
				   for(i=0; i<pendingtasks.size();i++) {
				   	  taskStrHtml.push('<p>');
				   	  //��ϵͳ�������磺��ָ����ء���λָ�����
				      pendingtask= pendingtasks[i];
				      //ҵ��ϵͳID
				      var k=pendingtask.k;
				      //��ϵͳ�������������磺����ˡ�����ӡ��
				      var details = pendingtask.details;
				      //��ϵͳ���Ƽ���
				      var name_tem = pendingtask.name_tem;
				      //ҵ��ϵͳǰ������ͼ��
				      taskStrHtml.push('<img src="' + _ROOT_PATH_ + '/images/bg/top.gif"/>');
				      //�����bsҵ��ϵͳ
				      if(pendingtask.type==1)
					  {  
				      	taskStrHtml.push('<a href="' + pendingtask.Url + '" target="_blank">');
				      	//ҵ��ϵͳ����
				      	taskStrHtml.push(pendingtask.name + '</a>');
				      //�����csҵ��ϵͳ
				      }else{
				      	taskStrHtml.push('<a href="' + pendingtask.Url + '">');
				      	//ҵ��ϵͳ����
				      	taskStrHtml.push(pendingtask.name + '</a>');
				      }
				      //���������������������
				      if(pendingtask.count>0){
				    	  if(pendingtask.name_tem[0]!="�����˻�ϵͳ"){
				    		  taskStrHtml.push('----->��' + pendingtask.count + '��<br/>');
				    	  }
				       }
				       taskStrHtml.push('<br/>'); 
				       taskStrHtml.push('<span>');
				       //��ϵͳ���Ƽ���Ϊ����������table�����ҵ��ϵͳ�в�ͬ��ϵͳ�Ĵ�������
				       if(name_tem.size()>0){
					        taskStrHtml.push('<table border=0>');
					        //ѭ������ҵ��ϵͳ��ϵͳ
					       	for(o=0;o<name_tem.size();o++){
					       	//�����б��
					       	if(o%2==0)
								{
				      				taskStrHtml.push('<tr>');
				    			}
					       	    taskStrHtml.push('<td width="300" style="vertical-align:top;">');
					       	    //ϵͳ����ǰ��ͼ��
					       	 if(name_tem[0]!="�����˻�ϵͳ"){
					       		taskStrHtml.push('&nbsp' + '<img src="' + _ROOT_PATH_ + '/images/bg/20.png" />');
					       		//��ϵͳ����
					       		taskStrHtml.push(name_tem[o]);	       		
					       		taskStrHtml.push('<br/>');
					       	 }
					       		//ѭ��������ϵͳ��Ӧ��������������ˡ�����ӡ��
					       		for(j=0;j<details.size();j++)
								   { 
								      //��ϵͳ������������������ˡ�����ӡ��
								      detail=details[j];
								      //�����ϵͳ����������������0
								      
								      if(detail.totalcount>0){
								    	  if(detail.menuname=="�����˻�ϵͳ"){
								    	
											         //�����bsϵͳ
											         if(pendingtask.type==1)
											         {  
											         	taskStrHtml.push('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + '<a href="' + detail.JobUrl + '" target="_blank"><font color = "' + detail.color + '">' + detail.status + '</font></a>');
											         	taskStrHtml.push('<br/>');
							                         }
							                         //�����CSϵͳ
							                         else
							                         {
							                            taskStrHtml.push('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + detail.status + '&nbsp;>');
							                            taskStrHtml.push('<br/>'); 
							                         }
							                       }
								    	  else{
								          //�����ϵͳ��������������ж�Ӧ��ϵͳ����һ�£���Ѵ�����������Ӧ��ϵͳ������
									      if(detail.menuname == name_tem[o] ){
									         //�����bsϵͳ
									         if(pendingtask.type==1)
									         {  
									         	taskStrHtml.push('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + '<a href="' + detail.JobUrl + '" target="_blank"><font color = "' + detail.color + '">' + detail.status + '<' + detail.totalcount + '��></font></a>');
									         	taskStrHtml.push('<br/>');
					                         }
					                         //�����CSϵͳ
					                         else
					                         {
					                            taskStrHtml.push('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + detail.status + '&nbsp;<' + detail.totalcount + '��>');
					                            taskStrHtml.push('<br/>'); 
					                         }
					                       }
							                       
								    	  }
								       }
								       //��������ϵͳ����������������0
								       if(detail.totalcount==0){
								    		   taskStrHtml.push('&nbsp' + detail.status); 
								    		   taskStrHtml.push('<br/>'); 
								    	  
								        }								        
							       }					       		
					       		taskStrHtml.push('</td>');
					       		//�Ƿ���
					       		if(o%2==1)
								{
				      				taskStrHtml.push('</tr>');
				    			}
					       	}
					       	taskStrHtml.push('</table>');
				       //��ϵͳ���Ƽ���Ϊ1��,����tableչʾ
				       }else{
				           //ѭ��������ϵͳ��������
					       for(j=0;j<details.size();j++)
						   {
						      //��ϵͳ�����������
						      detail=details[j];
						      taskStrHtml.push('&nbsp' + '<img src="' + _ROOT_PATH_ + '/images/bg/20.png" />');
						     //�����bsϵͳ
					         if(pendingtask.type==1)
					         {  
					            //�����ϵͳ�����������0��
					            if(detail.totalcount>0){
						         	taskStrHtml.push('<a href="' + detail.JobUrl + '" target="_blank"><font color = "' + detail.color + '">' + detail.status + '<' + detail.totalcount + '��></font></a>');
					         	}else{
					         		taskStrHtml.push('<a><font color = "' + detail.color + '">' + detail.status + '</font></a>');
					         	}
	                         }
	                         //�����csϵͳ
	                         else
	                         {
	                            //�����ϵͳ�����������0��
	                         	if(detail.totalcount>0){
	                            	taskStrHtml.push(detail.status + '&nbsp;<' + detail.totalcount + '��>');
	                            }else {
					         		taskStrHtml.push(detail.status);
					         	}
					         }
						        taskStrHtml.push('<br/>'); 
					       }
				       }
				       taskStrHtml.push('</span>');
				       taskStrHtml.push('</p>'); 
				    }
				     
			    }
		    }//pendingtasks>0
		   //�Ѹ�ҵ��ϵͳ��Ӧ�Ĵ���������Ϣ�������Ӧ�ģɣ���
		   document.getElementById(k).innerHTML = taskStrHtml.join('');
	   }//for
	};
	/**************���������ѯ���ؽ��չʾ(�°��չʾ)wyx20120712**********/
	function showPendingTaskNEW(config){ 
		//alert('a');
	    //��������չʾ���󼯺�
	    var totallist = config;
		var isMergeOperate = false;
		if(totallist && totallist.length>0){
			var mergeOperate =  totallist[0];
			
			if(mergeOperate.isMergeOperate != undefined){
				isMergeOperate = mergeOperate.isMergeOperate;
				
				//�Ƴ���һ��
				totallist.shift();
			}
		}
	    for(var index = 0;index < totallist.length; index++)
	    {   
	        //ҵ��ϵͳ��������������磺ָ��ϵͳ
		    var pendingtasks=totallist[index];
		    //�����������洢�������
		    var taskStrHtml = [];
		    //���ҵ��ϵͳ��Ҫ��ʾ��������
		    if(pendingtasks.size()>0){
		       //���������ҵ��ϵͳ
			   if(pendingtasks[0].outter!=1)
			   {   
			       //���ҵ��ϵͳ�����ڴ�������
				   if(!pendingtasks[0].name)
				   {
				        //ҵ��ϵͳID
					    var k=pendingtasks[0].k;
					    //ҵ��ϵͳ����
						var menuname=pendingtasks[0].menuname;
						//ҵ��ϵͳ����
						var menuurl=pendingtasks[0].clientmodule;
						//��ʾҵ��ϵͳ����
						taskStrHtml.push('<div>');
						taskStrHtml.push('<div class="title_blue">');
						taskStrHtml.push('<a href="' + _ROOT_PATH_+menuurl+'">'+ menuname + '&nbsp&nbsp&nbsp&nbsp<b style="color:#000; font-weight:normal;"></b>' + '</a>');
						taskStrHtml.push('</div>');
						taskStrHtml.push('<table width=97% border=0 cellpadding=0 cellspacing=0>');
						taskStrHtml.push('<tr>');
						taskStrHtml.push('<td colspan="2" style="vertical-align:top;" nowrap="nowrap">');
						taskStrHtml.push('<div class="content_black">��ʱû�д�������</div>');
						taskStrHtml.push('</td>');
						taskStrHtml.push('</tr>');
						taskStrHtml.push('</table>');
						taskStrHtml.push('</div>');
						
			       }
			       //���ҵ��ϵͳ���ڴ�������
			       else{
			           //�û�����
					   var count=0;
					   //����������������٣���С������ʾ��ĸ߶ȣ����ٿհ�
					   if(pendingtasks.size()<=2){
					   		var total=0;
					   		for(i=0; i<pendingtasks.size();i++) {
					   			var tempdetails = pendingtasks[i].details;
					   			if(tempdetails.size()>total)total=tempdetails.size();
					   		}
					   		var divH=150-(4-total)*13;
					   		taskStrHtml.push('<div>');
					   }else{
					     	taskStrHtml.push('<div>');
					   }
					   //��ʾҵ��ϵͳ����
					   taskStrHtml.push('<div class="title_blue"><a  href="' + _ROOT_PATH_+pendingtasks[0].clientmodule+'">'+ pendingtasks[0].menuname + '</a></div>');
					   //ҵ��ϵͳ�д�������չʾ���
					   taskStrHtml.push('<table width=97% border=0 cellpadding=0 cellspacing=0>');
					   //ѭ��ҵ��ϵͳ��ϵͳ,���磺��ָ����ء���λָ������ȵ�
				       for(i=0; i<pendingtasks.size();i++) {
				       		//����ҵ��ϵͳ��ϵͳ����
							var pendingtask= pendingtasks[i];
							//ҵ��ϵͳ��ϵͳ��������������磺����ˡ�����ӡ�ȵ�
							var details = pendingtask.details;
							//��ϵͳ�����ַ
							var hostip = pendingtask.hostip;
							//��ϵͳ����˿�
							var hostport=pendingtask.hostport;
							//��ϵͳ���ط����ַ
							var localip = pendingtask.localip;
							//��ϵͳ���ط���˿�
							var localport=pendingtask.localport;
							//�û�����
							var uid=pendingtask.uid;
							//ҵ��ϵͳ�˵��ɣ�
							var k = pendingtask.k;
							//sessionID
							var sid=pendingtask.sid;
							//�������
							var year=pendingtask.year;
			      			if(pendingtask.totalcount > 0){
			      				count++;
			      				//�Ƿ���
								//if(count%2==1)
								//{
				      				taskStrHtml.push('<tr width="100%">');
				    			//}
				    			//��ϵͳ��������չʾ
								taskStrHtml.push('<td colspan="2" style="vertical-align:top;" nowrap="nowrap">');
								//��ϵͳ����ǰ������ͼ��
								taskStrHtml.push('<div class="content_title">');
								taskStrHtml.push(pendingtask.name + '(��' + pendingtask.totalcount + '��)</div>');
								taskStrHtml.push('</td>');
								taskStrHtml.push('</tr>');
			      			}
							//�ϲ�ͬһ��muenuid�͹�����״̬�ĵ���
							if (isMergeOperate) {							
								var detailsCache = {}, _tempdetails = [];
								//&submenu=23633&wfstat='118'&fromtask=yes
								(function(){
									for (var k = 0, n = details.length; k < n; k++) {
										var detail = details[k];
										var linkName = detail.linkName;
										
										if (linkName && ~ linkName.indexOf("&submenu") && ~ linkName.indexOf("&wfstat")) {
											var submenu = linkName.substring(linkName.indexOf("&submenu=") + "&submenu=".length, linkName.indexOf("&wfstat"));
											var wfstat = linkName.substring(linkName.indexOf("&wfstat=") + "&wfstat=".length, linkName.indexOf("&fromtask"));
											
											var operatName = detail.operattypedto.name;
											var key = submenu + "-" + operatName;
											
											if (detailsCache[key]) {
												var _tempDetail = detailsCache[key];
												
												_tempDetail.totalcount = parseInt(_tempDetail.totalcount, 10) + parseInt(detail.totalcount, 10);
												
												var _linkName = _tempDetail.linkName;
												var _wfstat = _linkName.substring(_linkName.indexOf("&wfstat=") + "&wfstat=".length, _linkName.indexOf("&fromtask"));
												
												var new_wfstat = _wfstat + "," + wfstat;
												
												_tempDetail.linkName = _linkName.replace("wfstat=" + _wfstat, "wfstat=" + new_wfstat);
											}
											else {
											
												detailsCache[key] = detail;
											}
										}
										else {
											_tempdetails.push(detail);
										}
									}
									
									for (var dc in detailsCache) {
									
										_tempdetails.push(detailsCache[dc]);
									}
								})();
								
								details = _tempdetails;
							}
							//������ϵͳ����������磺����ˡ�����ӡ��
							for(j=0;j<details.length;j++)
							{ 
								//��ϵͳ��������������磺����ˡ�����ӡ��
							    detail=details[j];
							    //���˴�������Ϊ0�Ķ���
							    if(detail.totalcount > 0){
									//taskStrHtml.push('<tr><td colspan="2">');
									if(j%2==0){
										taskStrHtml.push('<tr>');
									}
									if(details.length%2==1){
										if((j+1)==details.length){
											taskStrHtml.push('<td colspan="2" nowrap="nowrap" >');
										}else{
											taskStrHtml.push('<td nowrap="nowrap">');
										}
									}else{
										taskStrHtml.push('<td nowrap="nowrap">');
									}
								    //��ϵͳ��������ǰ��ͼ��
									taskStrHtml.push('<div class="content_black">');
								    //taskStrHtml.push('&nbsp' + '<img src="' + _ROOT_PATH_ + '/images/bg/20.png" />');
								    
								    //��ϵͳ�����������ӵ�ַ
								    var url="http://"+hostip+":"+hostport+detail.linkName;
								    //�滻���ӵ�ַ�еĲ������ַ�
								    url=url.replace(/&/g, "%26");
								    //���ҵ��ϵͳ�ķ����ַΪ����ʹ�õ�ǰϵͳ��Ĭ�ϵ�ַ
								    if(hostip == "" && hostport == ""){
								       taskStrHtml.push('<a href="' + _ROOT_PATH_);
								       taskStrHtml.push(detail.linkName + '">');
								    }  
								    //������ҵ��ϵͳ�ķ����ַ�뵱ǰ�����ַ��ͬ��ʹ�õ�ǰϵͳ��Ĭ�ϵ�ַ 
								    else if(hostip == localip && hostport == localport)
									{
								       taskStrHtml.push('<a href="' + _ROOT_PATH_);
								       taskStrHtml.push(detail.linkName + '">');
								    }
								    //������������ҵ��ϵͳ
								    else{
								       taskStrHtml.push('<div class="content_black"><a href="http://');
								       taskStrHtml.push(hostip + ':' + hostport + '/common/pendingtasklogin.do' + '?uid=' + uid + '&sid=' + sid + '&year=' + year + '&url=' + url + '">');
								    }
								    //��ʾ���������������
								    taskStrHtml.push('&nbsp��' + detail.operattypedto.name + '&nbsp(' + detail.totalcount + '��)</a>');
					   				taskStrHtml.push('</div>'); 
					   				taskStrHtml.push('</td>');
					   				//�����޷�������ʾ����
					   				if(details.length%2==1){
					   					if(j%2==1){
											taskStrHtml.push('</tr>');
										}
										//��ڲ���
										if((j+1)==details.size()){
											taskStrHtml.push('</tr>');
										}
					   				}else{
					   					if(j%2==1){
					   						taskStrHtml.push('</tr>');
					   					}
					   				}
					   				//taskStrHtml.push('</td></tr>');
							    }
						    } 
							
							//��ϵͳ�Ƿ���
							//if(count%2==0){
			      			    //taskStrHtml.push('</tr>');
			    			//}  
					    }
						taskStrHtml.push('</table>');
						taskStrHtml.push('</div>');
				    }
			   }
			   //���Ϊ�����������
			   if(pendingtasks[0].outter==1){
				   //ѭ��ҵ��ϵͳ��ϵͳ��Ϣ
				   for(i=0; i<pendingtasks.size();i++) {
				   	  taskStrHtml.push('<div><div class="title_blue">');
				   	  //��ϵͳ�������磺��ָ����ء���λָ�����
				      pendingtask= pendingtasks[i];
				      //ҵ��ϵͳID
				      var k=pendingtask.k;
				      //��ϵͳ�������������磺����ˡ�����ӡ��
				      var details = pendingtask.details;
				      //��ϵͳ���Ƽ���
				      var name_tem = pendingtask.name_tem;
				      //ҵ��ϵͳǰ������ͼ��
				      //taskStrHtml.push('<img src="' + _ROOT_PATH_ + '/images/bg/top.gif"/>');
				      //�����bsҵ��ϵͳ
				      if(pendingtask.type==1)
					  {  
				      	taskStrHtml.push('<a href="' + pendingtask.Url + '" target="_blank">');
				      	//ҵ��ϵͳ����
				      	taskStrHtml.push(pendingtask.name + '</a>');
				      //�����csҵ��ϵͳ
				      }else{
				      	taskStrHtml.push('<a href="' + pendingtask.Url + '">');
				      	//ҵ��ϵͳ����
				      	taskStrHtml.push(pendingtask.name + '</a>');
				      }
				      //���������������������
				      if(pendingtask.count>0){
				        taskStrHtml.push('(��' + pendingtask.count + '��)');
				       }
				       //taskStrHtml.push('<br/>'); 
				       //taskStrHtml.push('<span>');
				       taskStrHtml.push('</div>');
				       taskStrHtml.push('<div>');
				       taskStrHtml.push('<table width=97% border=0 cellpadding=0 cellspacing=0>');
				       //��ϵͳ���Ƽ���Ϊ����������table�����ҵ��ϵͳ�в�ͬ��ϵͳ�Ĵ�������
				       if(name_tem.size()>0){
					        //ѭ������ҵ��ϵͳ��ϵͳ
					       	for(o=0;o<name_tem.size();o++){
					       		//�����б��
					       		taskStrHtml.push('<tr width="100%"><td colspan="2" style="vertical-align:top;" nowrap="nowrap">');
					       	    //taskStrHtml.push('<td width="300" style="vertical-align:top;">');
					       	    //ϵͳ����ǰ��ͼ��
					       		//taskStrHtml.push('&nbsp' + '<img src="' + _ROOT_PATH_ + '/images/bg/20.png" />11111111111');
					       		//��ϵͳ����
					       		taskStrHtml.push('<div class="content_black">');
					       		taskStrHtml.push(name_tem[o]);	   
					       		taskStrHtml.push('</div>');    		
					       		taskStrHtml.push('</td>');
					       		//ѭ��������ϵͳ��Ӧ��������������ˡ�����ӡ��
					       		for(j=0;j<details.length;j++)
								   {
								   	  if(j%2==0){
								   	  		taskStrHtml.push('<tr>');
								   	  }
								   	  if(details.size()%2==1){
								   	  		if((j+1)==details.size()){
								   	  			taskStrHtml.push('<td colspan="2" nowrap="nowrap" >');
								   	  		}else{
								   	  			taskStrHtml.push('<td nowrap="nowrap">');
								   	  		}
								   	  }else{
								   	  		taskStrHtml.push('<td nowrap="nowrap">');
								   	  }
								   	  taskStrHtml.push('<div class="content_black">');
								      //��ϵͳ������������������ˡ�����ӡ��
								      detail=details[j];
								      //�����ϵͳ����������������0
								      if(detail.totalcount>0){
								    	  if(detail.menuname == name_tem[0]&&detail.menuname=="�ʼ�ϵͳ��������"){
					                    	 taskStrHtml.push('<a href="javascript:clickTaskEmail()")>' + detail.status + '(' + detail.totalcount + '��)></a>');
					                    	// �������ŵ������ύ
					                    	   taskStrHtml.push('<form id="appemail" name="appemail" method="post" action="' + detail.JobUrl + '"  target="_blank" style="display:none">'); 
					                    	   taskStrHtml.push('<input type="text" name="sid" value=""/>');
					                    	   taskStrHtml.push('<input type="text" name="mid" value=""/></form>');
					                       }else if(detail.menuname == name_tem[0] ){
									    	//�����ϵͳ��������������ж�Ӧ��ϵͳ����һ�£���Ѵ�����������Ӧ��ϵͳ������
									         //�����bsϵͳ
									         if(pendingtask.type==1)
									         {  
									         	taskStrHtml.push('<a href="' + detail.JobUrl + '" target="_blank">' + detail.status + '(' + detail.totalcount + '��)</a>');
					                         }
					                         //�����CSϵͳ
					                         else
					                         {
					                            taskStrHtml.push(detail.status + '&nbsp;(' + detail.totalcount + '��)');
					                         }
					                       }
								       }
								       //��������ϵͳ����������������0
								       if(detail.totalcount==0){
								           taskStrHtml.push('&nbsp' + detail.status); 
								        }
								        taskStrHtml.push('</div>'); 
								        taskStrHtml.push('</td>');
								        if(details.size()%2==1){
								        	if(j%2==1){
								        		taskStrHtml.push('</tr>');
								        	}
								        	//��ڲ���
								        	if((j+1)==details.size()){
								        		taskStrHtml.push('</tr>');
								        	}
								        }else{
								        	if(j%2==1){
								        		taskStrHtml.push('</tr>');
								        	}
								        }
							       }					       		
					       		
					       	}
					       	//taskStrHtml.push('</table>');
				       //��ϵͳ���Ƽ���Ϊ1��,����tableչʾ
				       }else{
				           //ѭ��������ϵͳ��������
					       for(j=0;j<details.size();j++)
						   {
						   	  if(j%2==0){
						   	  		taskStrHtml.push('<tr>');
						   	  }	
						   	  if(details.size()%2==1){
						   	  		if((j+1)==details.size()){
						   	  			taskStrHtml.push('<td colspan="2" nowrap="nowrap" >');
						   	  		}else{
						   	  			taskStrHtml.push('<td nowrap="nowrap">');
						   	  		
						   	  		}
						   	  }else{
						   	  		taskStrHtml.push('<td nowrap="nowrap">');
						   	  }
						   	  taskStrHtml.push('<div class="content_black">');
						      //��ϵͳ�����������
						      detail=details[j];
						      //taskStrHtml.push('&nbsp' + '<img src="' + _ROOT_PATH_ + '/images/bg/20.png" />');
						     //�����bsϵͳ
					         if(pendingtask.type==1)
					         {  
					            //�����ϵͳ�����������0��
					            if(detail.totalcount>0){
						         	taskStrHtml.push('<a href="' + detail.JobUrl + '" target="_blank">' + detail.status + '(' + detail.totalcount + '��)</a>');
					         	}else{
					         		taskStrHtml.push('<a href="' + detail.JobUrl + '" target="_blank">' + detail.status + '</a>');
					         	}
	                         }
	                         //�����csϵͳ
	                         else
	                         {
	                            //�����ϵͳ�����������0��
	                         	if(detail.totalcount>0){
	                            	taskStrHtml.push(detail.status + '&nbsp;(' + detail.totalcount + '��)');
	                            }else {
					         		taskStrHtml.push(detail.status);
					         	}
					         }
					         taskStrHtml.push('</div>');
					         taskStrHtml.push('</td>');
						     //�����޷�������ʾ����
					         if(details.size()%2==1){
					         		if(j%2==1){
					         			taskStrHtml.push('</tr>');
					         		}
					         		//��ڲ���
					         		if((j+1)==details.size()){
					         			taskStrHtml.push('</tr>');
					         		}
					         	
					         }else{
					         	if(j%2==1){
					         		taskStrHtml.push('</tr>');
					         	}
					         }
					       }
					       
				       }
				       taskStrHtml.push('</table');
				       taskStrHtml.push('</div>');
				       taskStrHtml.push('</div>'); 
				    }
				     
			    }
		    }//pendingtasks>0
		   //�Ѹ�ҵ��ϵͳ��Ӧ�Ĵ���������Ϣ�������Ӧ�ģɣ���
		   //alert(k+'========'+taskStrHtml.join('')); 
		   document.getElementById(k).innerHTML = taskStrHtml.join('');
	   }//for
	};	
	// @author:miaojing-------------------------------- �����µ�ҳ��
	var task_render = (function($){
        var template = {
        		bone: '<div class="dbbtnarea"> <button class="dbbtnbg" data-id="fold-all"> չ��ȫ�� </button> </div> <br> <div style="overflow-x: hidden; overflow-y: auto; width: 99.8%;" layout="{h:{fit:-30,min:200}}" id="p-task-list"> </div>',
            sys_gutter: '<div class="dboutterjg"> &nbsp; </div>',
            sys_bone: '<div class="dbitem"> <table width="98%" border="0" cellspacing="0" cellpadding="0"> <tr> <td width="103px" valign="top"> <div class="indidb" style="background:url(portal/images/cqdb/#{3-bgimg}) no-repeat center 50%"></div> <div class="sysfont"> #{0-menuname} </div> </td> <td width="41%" valign="top"> #{1-sub_system1} </td> <td width="13px" nowrap="nowrap" style="font-size: 0;"> &nbsp; </td> <td valign="top"> #{2-sub_system2} </td> </tr> </table> </div>',
            sub_sys_gutter: '<div class="dbinnerjg"> &nbsp; </div>',
            sub_sys: '<table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td class="dbtitleleft"> &nbsp; </td> <td class="dbtitlebg" title="#{3-sub_sys_name_title}"> #{0-sub_sys_name} </td> <td class="dbtitlezk" data-id="fold" data-group="#{2-sub_sys_name_hash}"> &nbsp; </td> </tr> </table> <!--����������--> <table width="100%" border="0" cellspacing="0" cellpadding="0" class="dbcontents" data-group="#{2-sub_sys_name_hash}"> <tr> <td class="dbinnerjg" ></td> </tr> #{1-sub_sys_options} </table>',
            sub_sys_option: '<td nowrap="nowrap" width="30%" class="#{0-class}" align="center" valign="bottom"> <a href="#{1-link}">#{2-name}&nbsp;<span class="dbcount">#{3-count}</span></a> </td>',
            sub_sys_blank_option: '<td nowrap="nowrap" width="30%"> &nbsp; </td>',
            pholder: ''
        },
        configMap = {
        },
        jqueryMap = {
            $container: null,
            pholder: ''
        },
        optionsMap = {
            '���': {
                class_name: 'dbaudit',
                name: '�����'
            },
            '��ӡ': {
                class_name: 'dbaprint',
                name: '����ӡ'
            },
            'others': {
                class_name: 'dbcheck',
                name: '����֤'
            }
        },
        is_inited = false;


        // utility functions -----------------------
        /**
         * ��ʽ���ַ��� '#{0}, {1-comment}'.format('a', 'b') -> 'a, b'
         * @return {String}
         */
        String.prototype.format = function(){
            var str = this;
            for (var i = 0; i < arguments.length; i++) {
                var t = arguments[i];
                var r = new RegExp('#\\{'+i+'(-\\w+)?\\}', 'g');
                str = str.replace(r, t);
            }
            return str;
        };

        String.prototype.hashCode = function(){
            var hash = 0, i, char;
            if (this.length === 0) return hash;
            for (i = 0, l = this.length; i < l; i++) {
                char  = this.charCodeAt(i);
                hash  = ((hash<<5)-hash)+char;
                hash |= 0; // Convert to 32bit integer
            }
            return hash;
        };

        // ϵͳ
        var render_sys = function(){
            jqueryMap.$container.html(template.bone);
            jqueryMap.$t_list = jqueryMap.$container.find('#p-task-list');
        };

        var append_data = function(data){
            if (!is_inited){
                render_sys();
                bind_foldall();
                is_inited = true;
            }
            
            data.shift(); // ȥ�� isMergeOperate ����
            
            var rs = [];
            for (var i = 0; i < data.length; i++) {
                var sub_list = data[i];
                if (sub_list.length === 0 || !sub_list[0].name){
                    continue;
                }
                var menuname = sub_list[0].menuname;
                var menuid = sub_list[0].k;
                var offset = Math.ceil(sub_list.length/2);
                var group_b = sub_list.slice(offset);
                var group_a = sub_list.slice(0, offset);
                rs.push(template.sys_bone.format(menuname, render_sub_sys(group_a), 
                    render_sub_sys(group_b) || '&nbsp;', get_sys_icon(menuid, menuname) ));
                rs.push(template.sys_gutter);
            }
            jqueryMap.$t_list.append(rs.join(''));
            bind_fold();
        };

        var render_sub_sys = function(sub_sys_data){
            var rs = [];
            for (var i = 0; i < sub_sys_data.length; i++) {
                var sub = sub_sys_data[i];
                if (sub.name){
                	var nsub = sub.name;
                	if(nsub.length>8){
                		nsub = nsub.substr(0,8)+"..."
              	}
                    rs.push(template.sub_sys.format(nsub, render_sub_options(sub.details, sub), sub.name.hashCode() ,sub.name));
                    rs.push(template.sub_sys_gutter);
                }
            }
            return rs.join('');
        };

        // ��ˣ� δ��ˣ� ��ӡ
        var render_sub_options = function(details, sub_data){
            var rs = [], desired_times = 3;
            var tds = [];
            details = details || [];
            var tr = '<tr>#{0}</tr>';
            for (var i = 0; i < details.length; i++) {

                var d = details[i];
                var link = get_sub_option_url(sub_data, d);
                var name = d.operattypedto.name;
                var info = optionsMap[name] || optionsMap.others;
                if(d.totalcount > 0)
                tds.push(template.sub_sys_option.format( info.class_name, get_sub_option_url(sub_data, d), info.name, d.totalcount) );
                if ((i + 1) % 3 === 0) {
                    rs.push(tr.format(tds.join('')));
                    tds = [];
                }
            }

            for (var j = i % desired_times; j <= desired_times; j++) {
                tds.push(template.sub_sys_blank_option);
            }
            if(i % desired_times!=0)
            rs.push( tr.format(tds.join('')) );

            return rs.join('');
        };

        var get_sub_option_url = function(sub_data, detail_data){
            var 
                host_ip     = sub_data.hostip,
                host_port   = sub_data.host_port,
                local_ip    = sub_data.localip,
                local_port  = sub_data.local_port,
                detail_link = detail_data.linkName,
                url         = 'http://#{0}:#{1}#{2}';
            // ���ҵ��ϵͳ�ķ����ַΪ����ʹ�õ�ǰϵͳ��Ĭ�ϵ�ַ
            // ������ҵ��ϵͳ�ķ����ַ�뵱ǰ�����ַ��ͬ��ʹ�õ�ǰϵͳ��Ĭ�ϵ�ַ 
            if ( (!host_ip && !host_port) || (host_ip === local_ip && host_port === local_port)){
                return configMap.context_url + detail_link; //todo: lack `_ROOT_PATH_` in the equivlent
            }
            var t = '/common/pendingtasklogin.do?uid=#{0}&sid=#{1}&year=#{2}&url=#{3}';
            var remote_url = t.format( sub_data.uid, sub_data.sid, sub_data.year, 
                url.format(host_ip, host_port, detail_link).replace(/&/g, '%26') );
            return url.format(host_ip, host_port, remote_url);
        };

        var bind_fold = function(){
            jqueryMap.$fold = jqueryMap.$t_list.find('td[data-id="fold"]');
            jqueryMap.$fold.unbind('click');
            jqueryMap.$fold.click(function(){
                var _this = $(this);
                var group_id = _this.attr('data-group');
                var $panel = jqueryMap.$t_list.find('table[data-group="#{0}"]'.format(group_id));
                var is_unfold = (_this.data('is_unfold'));
                _this.removeAttr('class');
                if (is_unfold){ // unfold -> fold
                    _this.addClass('dbtitlezk');
                    $panel.css('display', 'none');
                    _this.data('is_unfold', false);
                } else { // fold -> unfold
                    _this.addClass('dbtitlesq');
                    $panel.css('display', 'block');
                    _this.data('is_unfold', true);
                }
            });
        };

        var bind_foldall = function(){
            var $fold_all = jqueryMap.$container.find('button[data-id="fold-all"]');
            var ischecked = false;
            $fold_all
                .bind('mouseenter', function(){
                    this.className = 'dbbtnbg_o';
                }).bind('mouseleave', function(){
                    this.className = 'dbbtnbg';
                }).bind('click', function(){
                    ischecked = !ischecked;
                    if (ischecked){
                        jqueryMap.$fold.filter('.dbtitlezk').removeClass('dbtitlezk').addClass('dbtitlesq');
                        jqueryMap.$container.find('table[data-group]').css('display', 'block');
                        $fold_all.text('����ȫ��');
                    }else{
                        jqueryMap.$fold.filter('.dbtitlesq').removeClass('dbtitlesq').addClass('dbtitlezk');
                        jqueryMap.$container.find('table[data-group]').css('display', 'none');
                        $fold_all.text('չ��ȫ��');
                    }
                });
        };

        var get_sys_icon = function(menu_id, menu_name){
            var id_map = {
                "121960": "sysmanagement.png",
                "2000": "sysmanagement.png",
                "26900938": "sysmanagement.png",
                "28000": "accountingsys.png",
                "29000": "officialcardsys.png",
                "30000": "accountingunitsys.png",
                "31000019": "banksys.png",
                "32000": "banksys.png",
                "33000": "reportsys.png",
                "42000000": "officialcardsys.png",
                "45100000": "salarysys.png",
                "46000000": "officialcardsys.png",
                "72100000": "dnmonitoringsys.png",
                "82700000": "officialcardsys.png"
            }, name_map = {
                "����Ԥ��ִ��": "budgetsysy.png",
                "����": "officialcardsys.png",
                "��̬���": "dnmonitoringsys.png",
                "��λ����": "accountingunitsys.png",
                "ʵ������": "officialcardsys.png",
                "����ͳ��": "salarysys.png",
                "���ñ���": "reportsys.png",
                "ϵͳ����": "sysmanagement.png",
                "�����ʽ����": "subsidyfundssys.png",
                "�������": "accountingsys.png",
                "���й���": "banksys.png",
                "�Ż�����": "officialcardsys.png",
                "��Ŀ�ʽ����": "officialcardsys.png"
            },
            default_icon = 'indisys.png';

            return id_map[menu_id] || name_map[menu_name] || default_icon;
        };

        /**
         * ��ʼ�����
         * @param  {Object} $container
         * @param  {String} context_url ϵͳ��ǰurl������
         * @return {void}
         */
        var config = function($container, context_url){
            // configurations
            configMap.context_url =context_url;
            jqueryMap.$container = $container;
        };
        

        return {
            config: config,
            append: append_data,
            pholder: ''
        };
    }(JQ));
	JQ(function(){
		task_render.config(JQ('#default_middle_simple'), _ROOT_PATH_);
	});
	
	// -------------------------------- �����µ�ҳ��:END
	/***********�Ҳ���ٵ�������������չʾ����***********/
	function qrgRightShow(config){
	//debugger;
	    //�������洢����
	    var qrgRightHtml = [];
	    //�жϿ��ٵ��������������Ƿ���һ����Ҫ��ʾ��
		if (config.isbulletin == "true" || config.quickguidMenu.length > 0 || (config.isshowreport == "true" && config.reportlist.length>0)) {
			//���������Ҳ���ʾ����
		    qrgRightHtml.push('<div id="default_center" style="width:30%; float: left; margin-left: 20px; margin-top: 5px;display:inline;" layout="{h:{fit:-10},w:{fit:482}}">');
		    //���ϲ�
			qrgRightHtml.push(    '<div id="default_top_simple" >');
			qrgRightHtml.push(	      '<div style="width:100%;"><span></span></div>');
			qrgRightHtml.push(    '</div>');
			//���в�
			qrgRightHtml.push(    '<div id="default_middle_simple" style="background-image: none; background-repeat: no-repeat; background-position: right bottom;padding-top: 0px;padding-bottom: 0px;" layout="{h:{fit:\'auto\'}}">');
			qrgRightHtml.push(        '<span id="middle_inner">'); 
			//�ж��Ƿ���ʾ���ٵ���(�����ʾ)
			if (config.quickguidMenu.length > 0){
				qrgRightHtml.push(            '<div  class="title_orange">���ٵ���</div>');
				//�����Ƿ���ʾ�������жϿ��ٵ�������ĸ߶�
			    if (config.isbulletin == "true"){
				    qrgRightHtml.push('<div style="height:210px; overflow-y:scroll;">');
			    }else {
			   	    qrgRightHtml.push('<div style="height: expression(document.body.clientHeight-window_top.offsetHeight-180);overflow-y:scroll;">');
			    }
			    qrgRightHtml.push('<table width="90%" border="0" cellpadding="0" cellspacing="0">');
				for(var i = 0; i < config.quickguidMenu.length; i++){
				    //���ٵ�������
				    var guidMenu =config.quickguidMenu[i];
				    //3��һ��
				    if(i%3==0){
				        qrgRightHtml.push('<tr valign="top">');
				    }
				    qrgRightHtml.push('       <td align="center" style="padding-top:2px;" width="32%">');
				    //ͼƬ
				    qrgRightHtml.push('           <img style="margin-left:20px;" src="' + _ROOT_PATH_ + '/images/bg/quick_before_small.gif" onMouseOver="this.src=\'' + _ROOT_PATH_ + '/images/bg/quick.gif\'" onMouseOut="this.src=\'' + _ROOT_PATH_ + '/images/bg/quick_before_small.gif\'" onClick="location.href=\'' + guidMenu.inputaddurl + '\'">');
				    qrgRightHtml.push('           <br/>');
				    qrgRightHtml.push('           <a href="' + guidMenu.inputaddurl + '" style="font-size:12px; margin-top:2px;">' + guidMenu.menuname + '</a>');
				    //������ٵ��й�����λ��
				    if((i+1)%6==0){
				        qrgRightHtml.push('<br/><br/>')
				    }
				    qrgRightHtml.push('       </td>');
				    //�н�����
					if((i+1)%3 == 0 || i == config.quickguidMenu.length - 1){
					    qrgRightHtml.push('</tr>');
					}
				}
				qrgRightHtml.push('</table>');
				qrgRightHtml.push('</div>');
			//�ж��Ƿ���ʾ�������ٵ���������ֻ����ʾһ�������п��ٵ�����ʾʱ��������ͬʱѡ����ʾ����
			}else if (config.isshowreport == "true" && config.reportlist.length>0) {
			    qrgRightHtml.push('<div id="reportShow" style="display:block;">');
				qrgRightHtml.push('    <div  class="title_report">')
				qrgRightHtml.push('        <ul>');
				//ѭ�������б�
                for(var o = 0; o < config.reportlist.length; o++){
                    //Ĭ����ʾ��һ�ű���
				    if(o == 0){
					    qrgRightHtml.push('<li class="selected" onclick="switchReportshow(this,' + (o+1) + ',' + config.reportlist.length + ',\''+config.reportlist[o].fcasip+'\',\''+config.reportlist[o].reportorimage+'\',\''+config.session+'\',\''+config.userCode+'\',\''+config.reportlist[o].pserver+'\',\''+config.reportlist[o].reportparam+'\',\''+config.year+'\')">ͼ��' + (o+1) + '</li>');
					    //qrgRightHtml.push('<li class="selected" onclick="switchReport(this,' + (o+1) + ',' + config.reportlist.length + ')">ͼ��' + (o+1) + '</li>');
					}else{
					    qrgRightHtml.push('<li class="noselected" onclick="switchReportshow(this,' + (o+1) + ',' + config.reportlist.length + ',\''+config.reportlist[o].fcasip+'\',\''+config.reportlist[o].reportorimage+'\',\''+config.session+'\',\''+config.userCode+'\',\''+config.reportlist[o].pserver+'\',\''+config.reportlist[o].reportparam+'\',\''+config.year+'\')">ͼ��' + (o+1) + '</li>');
					    //qrgRightHtml.push('<li class="noselected" onclick="switchReport(this,' + (o+1) + ',' + config.reportlist.length + ')">ͼ��' + (o+1) + '</li>');
					}
				}
				qrgRightHtml.push('		  </ul>');
				qrgRightHtml.push('    </div>');
				qrgRightHtml.push('</div>');
				/*׷��--------------------�޸�*/
				//ѭ������ĳ��ȣ�ȡ��ÿһ������
				for(var k=1;k<config.reportlist.length+1;k++){
					//����й��棬�򱨱�ĸ߶���һ��ģ�
					if (config.isbulletin == "true"){
						//Ĭ�ϵ�һ����ʾ�����������Ķ�����
						if(k==1){
							qrgRightHtml.push('<div id="report_'+k+'" style="height:210px;" style="display:block;">');
					 		qrgRightHtml.push('</div>');
						}else{
							qrgRightHtml.push('<div id="report_'+k+'" style="height:210px;" style="display:none;">');
					 		qrgRightHtml.push('</div>');
						}
						//���û�й��棬����ĸ߶�ռ��
					}else{
						//Ĭ�ϵ�һ����ʾ�����������Ķ�����
						if(k==1){
							qrgRightHtml.push('<div id="report_'+k+'" style="height: expression(document . body . clientHeight-window_top . offsetHeight-180); display:block;">');
					 		qrgRightHtml.push('</div>');
						}else{
							qrgRightHtml.push('<div id="report_'+k+'" style="height: expression(document . body . clientHeight-window_top . offsetHeight-180); display:none;">');
					 		qrgRightHtml.push('</div>');
						}
					}

				}
			}
			//��ʾ����
			if(config.isbulletin == "true"){
			//debugger;
			    Ext.lt.portal.component.login.config=config;
			    qrgRightHtml.push('<div class="title_orange"><table width=100% border="0"><tr><td>����</td><td align="right"><input style="width:70px;height:20px;background:url(../portal/images/viewall.gif) no-repeat left top;cursor:pointer;border:0;" type="button" onclick="Ext.lt.portal.component.login.openPost();"/></td></tr></table></div>');
			    //���ݿ��ٵ����ͱ����Ƿ���ʾ�����ƹ���ģ��ĸ߶�
			    if(config.quickguidMenu.length > 0 || (config.isshowreport == "true" && config.reportlist.length>0)){
			        qrgRightHtml.push('<marquee direction=up scrollamount=1 scrolldelay=50 onMouseOver="stop()" onMouseOut="start()" style="cursor: pointer; color: #000000; height: expression(document.body.clientHeight-window_top.offsetHeight-400);">');
				}else{	
					qrgRightHtml.push('<marquee direction=up scrollamount=1 scrolldelay=50 onMouseOver="stop()" onMouseOut="start()" style="cursor: pointer; color: #000000; height: expression(document.body.clientHeight-window_top.offsetHeight-180);">');
                }
               //debugger;
                //ѭ�������б�
				for(var i = 0; i < config.postList.length; i++){
				    //�������
					var post =config.postList[i];
					//qrgRightHtml.push('<div class="gonggao">');
					qrgRightHtml.push('<div style="border-bottom:1px #ccc dotted; margin-top:10px;  line-height:25px;">');
					qrgRightHtml.push('    <img src="' + _ROOT_PATH_ + '/images/done_btn/news.gif" />');
					qrgRightHtml.push('	   <a onclick=\'preview("' + config.contextpath + '","' + post.id + '")\'>');
					//���ݹ��漶���ж��Ƿ��ɫ������ʾ
					if(post.postlevel == "03"){
					    qrgRightHtml.push('    <font color=red>');
						qrgRightHtml.push(post.posttitle);
						qrgRightHtml.push('	   </font>');
						qrgRightHtml.push('		</a>');
					    qrgRightHtml.push('(' + post.createtime + ')');                       
					//��ͨ����
					}else{
						//alert("pubid = "+post.pubid)
					    qrgRightHtml.push(post.posttitle);
					    qrgRightHtml.push('		</a>');
					    qrgRightHtml.push('(' + post.createtime + ')');	
					    //alert(typeof(123));				   	
						if(typeof(post.pubid) == "undefined"){
	                        qrgRightHtml.push('    <img id="'+post.id +'" src="' + _ROOT_PATH_ + '/portal/images/new.gif" />');
						}
					}
					qrgRightHtml.push('	<br>');
					qrgRightHtml.push('</div>');
				}
				qrgRightHtml.push('<br />');
				qrgRightHtml.push('</marquee>'); 
			}
			qrgRightHtml.push(        '</span>');
		    qrgRightHtml.push(    '</div>');
			//���²�
			qrgRightHtml.push(    '<div id="default_bottom_simple">');
			qrgRightHtml.push(        '<div style="width:100%;"><span></span></div>');				
			qrgRightHtml.push(    '</div>');
		    qrgRightHtml.push('</div>');
		}
		return qrgRightHtml.join('');
	};
	
	/************��¼��ҳ����*******************************************************/
 	this.ifmisCommonDefault = function (config,servers) {
 		config.totalmenus = config.totalmenus.toArray();
 		Ext.lt.portal.component.login.config=config;
 	    //��ҳHTML�������
 	    var defaultHTML = [];
		//csҵ��ϵͳĬ�ϵ�ַд��ע�ᱨ��kookie
		//mainMenuHtml.push(config.str_cs);
		/***********��ҳͷ����Ϣ**************/
		if(config.sxindexjsp!="31"){
			defaultHTML.push('<div id="window_top">');
			defaultHTML.push('    <div id="top"> ');
			 //ϵͳ��ҳlog����
		    defaultHTML.push(logoArea(config));
		    //ϵͳ�˵�չʾ����
		    defaultHTML.push(mainMenuShow(config));
			//��ҳͷ����Ϣ
			defaultHTML.push('    </div>');
			defaultHTML.push('</div>');
		}else{
	    //ϵͳ��ҳlog����
	    defaultHTML.push(logoArea(config));
	    //ϵͳ�˵�չʾ����
	    defaultHTML.push(mainMenuShow(config));
		}
		if(config.sxindexjsp=="31"){
		defaultHTML.push('<div class="middlearea">');
		defaultHTML.push('<div class="menubottom">&nbsp;</div>');
		defaultHTML.push('<table width="100%" border="0" cellpadding="0" cellspacing="0">');
		defaultHTML.push('<tr>');
		defaultHTML.push('<td width="220px" valign="top" class="leftpart">');
		defaultHTML.push('<div class="leftpartredline"></div>');
		defaultHTML.push('<div class="leftpartmain">');
		defaultHTML.push('<div class="leftparttitle">�ҵ�ҵ��ϵͳ</div>');
		defaultHTML.push('<div id="basic-accordian1" >');
		defaultHTML.push('<div class="item_jg">&nbsp;</div>');
		
		//��¼csϵͳ����  ����0ʱ��ʾ ҵ������ַ����˵�
		var cscount=0;
		var leftList = config.leftList;
		var sb="";
		for(var lts =0;lts<leftList.size();lts++){
			var jr=0;
			var program = leftList[lts];
			var leftmenuname = program.split(";")[0].split(",")[0];
			var signs = program.split(";")[0].split(",")[1];
			var id = "test"+lts+"-content";
			 defaultHTML.push('<div class="item_jg">&nbsp;</div>');
	    	 defaultHTML.push('<div id="test-header" class="accordion_headings" ><div class="iteml_');
	    	 defaultHTML.push(signs);
	    	 defaultHTML.push('" onclick="querysx(this,\''+id+'\',\''+signs+'\');">'+leftmenuname+'</div></div>');
	    	 if(program.split(";")[1]!=""&&program.split(";")[1].indexOf("null")==-1){
	    	 defaultHTML.push('<div id=');
	    	 defaultHTML.push(id);
	    	 defaultHTML.push(' style="display:none;">');
	    	 defaultHTML.push('<div id="accordion_child">');
	    	 defaultHTML.push('<ul>');
	    	 }
	    	 var sbst =";";
	    	 var st =0;
	    	 if(program.split(";").length>1){
					var leftcode = program.split(";")[1];
					var signss =  program.split(";")[0].split(",")[1];
					
			for(var ct =1;ct<leftcode.split(",").length;ct++){
		for (var i = 0; i < config.totalmenus.length; i++){
		     var menu = config.totalmenus[i];
		     var code = menu.code;
		   //�û����ն���
		     var userComObj = new Array();
		 	//��������UKey��½��ε����ܵ����½������
		 	var ischeckUkey = config.portalIsCheckUkey;
		     var userCompare = config.userCompare;
		        for(var u = 0; u < userCompare.length; u++){
		        	userComObj[userCompare[u].BUSIGN] = userCompare[u];
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
            	var formTarget = "_blank";
            	if(menu.opentype!=null&&menu.opentype==2){
            		formTarget = "";
            	}
            	 // end ���޺� 2012.12.10 ��ȡ�ͻ���ip
		     if(!menu.menuid){
		    	 var sign = menu.sign;
			   
					
					var programcode = leftcode.split(",")[ct];	
					
		    	 	if(programcode==code){
		    	 		sbst=sbst+leftcode.split(",")[ct]+","+ct+";";
		    		if("portal"==sign){	    		
		    			defaultHTML.push('<li><a href="#" onclick ="ClickGg();">����</a></li>');
		    			defaultHTML.push('<li><a href="#" onclick ="ClickBw();">����¼</a></li>');
		    			
		    		}else{		    			
		    		    var programparas = config.programparas;
		    		    if(programparas!=null&&programparas[menu.code]!=null){
		    		        menu.parameters = programparas[menu.code];
		    		    }else{
		    		        menu.parameters=[];
		    		    }
		    			//�����b/sϵͳ
		                if (menu.type == 1){
		                	
		                	 // end ���޺� 2012.12.10 ��ȡ�ͻ���ip
		                    /**����ҵ��ϵͳ�����̽������֣�1��̫������ϵͳ 2����ͼϵͳ 4: ��ͬ�����һ�廯ϵͳ�˵� 5�����������ҵ��ϵͳ����϶��Լ������ĵ����¼�ؼ�  6��δʵ��ϵͳ��*/
		                    //����ǲ�ͬ�����һ�廯ϵͳ�˵�
		                    if (menu.tjhqprogram == 4){
		                        //��ʱ��ʵ�֣���֪���ĸ���������
		                    //������������ҵ��ϵͳ����϶��Լ������ĵ����¼�ؼ�
		                    }else if (menu.tjhqprogram == 5){		                                       
		                                //δʵ��ҵ��ϵͳ��  
		                    }else if (menu.tjhqprogram == 6){
		                        defaultHTML.push('<li><a href="#"');
		    				    defaultHTML.push(' onclick="javascript:alert(\'' + promsg + '\');">' + menu.name + '</a>��</li>');
		                    //ASPϵͳ  
		                    }else if (menu.tjhqprogram == 7){
		                    	defaultHTML.push('<li><a href="#" onclick="bclick(\''+menu.code+'\');">' + menu.name + '</a>');
		                        //�������ŵ�����������
		    	    			defaultHTML.push('<form id="app' + menu.code + '" name="app' + menu.code + '" method="get" action="' + menurl + '" style="display:none">');					    	//ѭ��ϵͳ����
		    			    	//ѭ��ϵͳ����
		    			    	for(var j = 0; j < menu.parameters.length; j++){
		    			    	    var parameter = menu.parameters[j];
		    				    	defaultHTML.push('<input type="text" name="' + parameter.parametername + '" value="' + parameter.parametervalue + '"/>');
		    			    	}
		    			    	//�û�����
		    				    defaultHTML.push('<input type="text" name="uid" value="' + config.userCode + '"/>');
		    				    //sessionId
		    				    defaultHTML.push('<input type="text" name="sid" value="' + config.session + '"/>');
		    				    //�������
		    				    defaultHTML.push('<input type="text" name="year" value="' + config.year + '"/></form>');
		    		    		defaultHTML.push('</li>');
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
		    					    	defaultHTML.push('<form id="app' + menu.code + '" name="app' + menu.code + '" method="post" action="' + menurl + '" style="display:none">');					    	//ѭ��ϵͳ����
		    					    	//ѭ��ϵͳ����
		    					    	for(var j = 0; j < menu.parameters.length; j++){
		    					    	    var parameter = menu.parameters[j];
		    						    	defaultHTML.push('<input type="text" name="' + parameter.parametername + '" value="' + parameter.parametervalue + '"/>');
		    					    	}
		    					    	//�û�����
		    						    defaultHTML.push('<input type="text" name="uid" value="' + comUcode + '"/>');
		    						    //sessionId
		    						    defaultHTML.push('<input type="text" name="sid" value="' + config.session + '"/>');
		    						    //�������
		    						    defaultHTML.push('<input type="text" name="year" value="' + config.year + '"/></form>');
		    				    		defaultHTML.push('</li>');	
		    				    	//BOϵͳ�����¼			    	
		    				        }else if (menu.sign == "BOZHCX"){
		    				            //��Ҫʵ��----------------------------------
		    				        }else {
		    				        	defaultHTML.push('<li><a href="#" onclick="bclick(\''+menu.code+'\');">' + menu.name + '</a>');
		    					    	// �������ŵ������ύ
		    					    	defaultHTML.push('<form id="app' + menu.code + '" name="app' + menu.code + '" method="post" action="' + menurl + '"  target="'+formTarget+'" style="display:none">');                            //ѭ��ϵͳ����
		                                //ѭ��ϵͳ����
		    					    	for(var j = 0; j < menu.parameters.length; j++){
		    					    		var parameter = menu.parameters[j];
		    						    	defaultHTML.push('<input type="text" name="' + parameter.parametername + '" value="' + parameter.parametervalue + '"/>');
		    					    	}
		    					    	//�û�����
		    						    defaultHTML.push('<input type="text" name="uid" value="' + comUcode + '"/>');
		    						    //sessionId
		    						    defaultHTML.push('<input type="text" name="sid" value="' + config.session + '"/>');
		    						    //�������
		    						    defaultHTML.push('<input type="text" name="year" value="' + config.year + '"/></form>');
		    				    		defaultHTML.push('</li>');	
		    				        }
		                        }
		                    
		                    }
		                //csϵͳ
		                }else{
		                    cscount=cscount+1;
		                    /**csҵ��ϵͳ����: 1:̫������ҵ��ϵͳ */
		                    //̫������ҵ��ϵͳ
		                    if (menu.tjhqprogram == 1){
		                        //����Ԥ����Ƶ�λ��(efmdiv)�����������λ��(dfczdiv)
		                        if(menu.sign == "efmdiv" || menu.sign == "dfczdiv"){
		                        	defaultHTML.push('<li><a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){loadAppcaller();AppCaller.callApp(\'');
		                        //��������csҵ��ϵͳ
		                        }else {
		                        	defaultHTML.push('<li><a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){loadAppcaller();AppCaller.callHqApp(\'');
		                        }
		                        //ҵ��ϵͳ��ʶ
		                        defaultHTML.push(menu.sign + '\',\'');
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
		                        	defaultHTML.push('|exp|' + comUcode.toLowerCase());
		                        //ָ��ϵͳϵͳ����
		                        }else if(menu.sign == "indisys"){
		                        	defaultHTML.push('|indi|' + comUcode.toLowerCase());
		                        //��������ҵ��ϵͳ
		                        }else{
		                        	defaultHTML.push('|' + menu.sign + '|' + comUcode.toLowerCase());
		                        }
		                        //�������ϵͳ���������ݿ����������ϵͳ�������Ӳ�ͬ��ȵ����ݿ⣬Ĭ��ȡ��һ��
		                        if(dbs.length > 0){
		                            //ҵ��ϵͳ���ݿ����
		                        	var db = dbs[0];
		                        	defaultHTML.push('|' + db.dbstr);
		                        }
		                        //�Ƿ���ҪsessionID
		                        if(menu.needsid ==1 ){
		                        	defaultHTML.push('|' + config.session);
		    					}
		    					//��װҵ��ϵͳ����
		    					for(var j = 0; j < menu.parameters.length; j++){
		    						defaultHTML.push('|' + menu.parameters[j].parametervalue);
		    					}
		    					defaultHTML.push('\');}">' + menu.name + '</a>');
		    					//���ҵ��ϵͳ���ڶ������ݿ�����
		    					if(dbs.length>1){
		    					    //�ڲ˵������һͼ�֧꣬���������¼��������º󵯳������������ѡ���
		    						defaultHTML.push('&nbsp;<IMG id="img' + menu.code + '" alt="�л���" src="' + _ROOT_PATH_ + '/images/list.gif" style="margin-top:10px;cursor:pointer;" onmouseover="mvqMOv(\'img' + menu.code + '\',\'panelDiv' + menu.code + '\')";>');
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
		    					defaultHTML.push('</li>');
		    					//�ж�TjhqprogramΪ5�ģ��ǵ����¿ؼ��ĵط���ƴ�ɵ����ӵ�ַ,����ĳϵͳ
		                    }else if (menu.tjhqprogram == 5){                     
		                    }else if (menu.tjhqprogram == 6){
		                    	defaultHTML.push('<li><a href="javascript:alert(\'' + promsg + '\'');
		                    	defaultHTML.push(');"> ' + menu.name + '</a>');
		                    	defaultHTML.push('</li>');
		    				//����csҵ��ϵͳ
		                    }else {
		                            //��ͼƽ̨�ͻ���ϵͳ
		                            if(menu.hosturl != null){
		                            	defaultHTML.push('<li><a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){loadAppcaller();AppCaller.callApp(\'');
		                            	defaultHTML.push(menu.sign + '\',\'');
		                            	defaultHTML.push('uid=' + comUcode + ' sid=' + config.session + 'LT');
		    								for(var j = 0; j < menu.parameters.length; j++){
		    									defaultHTML.push(' ');
		    									defaultHTML.push(menu.parameters[j].parametername + '=' + menu.parameters[j].parametervalue);
		    								}
		    								defaultHTML.push('\');}"> ' + menu.name + '</a>');
		    								defaultHTML.push('</li>');
		    						//����ҵ��ϵͳ
		    			            }else {
		    			            	defaultHTML.push('<li><a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){loadAppcaller();AppCaller.callApp(\'');
		    			            	defaultHTML.push(menu.sign + '\',\'');
		    			            	defaultHTML.push('uid=' + comUcode + ' sid=' + config.session);
		    								for(var j = 0; j < menu.parameters.length; j++){
		    									defaultHTML.push(' ');
		    									defaultHTML.push(menu.parameters[j].parametername + '=' + menu.parameters[j].parametervalue);
		    								}
		    								defaultHTML.push('\');}"> ' + menu.name + '</a>');
		    								defaultHTML.push('</li>');
		    			            }
		                    }
		                }
		    	}
		    }//defaultHTML.push('<li>' + menu.name + '</li>');
		}
	    }
		}
		}
		var pro = program.split(";")[1].split(",");
		var sbstStr = sbst.split(";");
		if(sbst!=";"){
			for(var p=0;p<pro.length;p++){
				if(pro[p]!=""){
					if(sbst.indexOf(pro[p]+",")==-1){
						var allmenuname= config.sxallmenuname;
						for(var allt = 0;allt<allmenuname.length;allt++){
						if(allmenuname[allt].CODE==pro[p]){
							defaultHTML.push('<li><a href="#" disabled = "true">' + allmenuname[allt].NAME + '</a></li>');
							break;
						}	
						}
					}
				}
			}
		}else{			
			var allmenuname = config.sxallmenuname;
			for(var pror =0;pror<pro.length;pror++){
				if(pro[pror]!=""){
					for(var allt = 0;allt<allmenuname.length;allt++){
						if(allmenuname[allt].CODE==pro[pror]){
							defaultHTML.push('<li><a href="#" disabled = "true">' + allmenuname[allt].NAME + '</a></li>');
							break;
						}	
					}
				}
			}
		}
		if(program.split(";")[1]!=""&&program.split(";")[1].indexOf("null")==-1){
		defaultHTML.push('</ul>');
		defaultHTML.push('</div>');
		defaultHTML.push('</div>');
		}
		}
        defaultHTML.push('</div><!--�˵�����-->');
		defaultHTML.push('</div>');
		defaultHTML.push('<div class="leftpartbottom"></div>');
		defaultHTML.push('</td>');
		defaultHTML.push('<td width="9px" style="font-size:9px;">&nbsp;</td>');
		defaultHTML.push('<div id="sxggdiv"><td>&nbsp;</td>');
		defaultHTML.push('<td valign="top" id="sxphoto" style="display:none;">');
		defaultHTML.push('<div id="fitmodedemo2">');
		defaultHTML.push('<div class="editarea">');
		defaultHTML.push('<form id="bq" name ="bq" method="post" action=""><table width="100%" border="0" cellspacing="0" cellpadding="0">');
		defaultHTML.push(' <br><br><br><tr>');
		defaultHTML.push(' <td width="100px" class="thele"><input type="file" name="file" style="width:360px;height:20px;" id="file" value="" /></td>');
		defaultHTML.push('</tr>');
		defaultHTML.push('<tr><td><center>');
	    defaultHTML.push('<button class="nomalbtn" id="sxfilebcbtn" onclick="SaveFile()">����</button>&nbsp;');
	    defaultHTML.push('<button class="nomalbtn" id="sxfileqxbtn" >ȡ��</button>');
	    defaultHTML.push('</center></td></tr>');
		defaultHTML.push('</table></form>');
		defaultHTML.push(' </div>');
		defaultHTML.push(' </div></td>');
		defaultHTML.push('<td valign="top" id="sxgg" style="display:none;">');
		
		defaultHTML.push('<div class="noticearea">');
		defaultHTML.push('<div class="contenttitlebg"><div class="titletb">���Ź���</div></div>');
		defaultHTML.push('<div class="titleblueline"></div>');
		defaultHTML.push('<div class="contents gg_sy" style="overflow-x:hidden; overflow-y:auto;">');
		var post = config.postList;
		if(post.length>0){
		for(var p=0;p< post.length;p++){
			if(post[p].postlevel=="03"){
				defaultHTML.push('<p class="gg"><a href="#" onclick=\'preview("' + Ext.lt.portal.component.login.config.contextpath + '","' + post[p].id + '")\'><font color=red>'+post[p].posttitle+'</font></a><span class="datainfo">'+post[p].createtime+'</span></p>');
			}else{
				defaultHTML.push('<p class="gg"><a href="#" onclick=\'preview("' + Ext.lt.portal.component.login.config.contextpath + '","' + post[p].id + '")\'>'+post[p].posttitle+'</a><span class="datainfo">'+post[p].createtime+'</span></p>');
			}
		}
		}
		defaultHTML.push('</div>');
		defaultHTML.push('<div class="gg_fy">');
	    defaultHTML.push('</div>');
	    defaultHTML.push('</div>');
	    defaultHTML.push('</td></div>');
	    defaultHTML.push('<td valign="top" id="sxbw" style="display:none;overflow:auto;">');
        defaultHTML.push('<div class="noticearea">');
        defaultHTML.push('<div class="contenttitlebg"><div class="titletb">����¼</div></div>');
        defaultHTML.push('<div class="titleblueline"></div>');
        defaultHTML.push('<div class="contents_bw">');
        defaultHTML.push('<table width="100%" border="0" cellspacing="0" cellpadding="0">');
        defaultHTML.push('<tr>');
        defaultHTML.push('<td width="220px" valign="top">');
        defaultHTML.push('<div class="bw_date">');
        defaultHTML.push('<div class="bw_date_r">');
        defaultHTML.push('<div class="bw_date_l" id="timeapm">');
        defaultHTML.push('<span class="time">'+config.time+'</span>');
        defaultHTML.push('<span class="ap">'+config.apm+'</span>');
        defaultHTML.push('</div>');
        defaultHTML.push('</div>');
        defaultHTML.push(' </div>');
        defaultHTML.push(' <div class="calendararea" id="sxcalendar">');                
        defaultHTML.push(' </div>');
        defaultHTML.push(' <div class="addbw" title="������ӱ���" onclick="ClickBwNew();"></div>');
        defaultHTML.push(' </td>');
        defaultHTML.push('<td valign="top">');
        defaultHTML.push('<div class="contents_right bw" id="contentsbw" style="height:470px; overflow-x:hidden; overflow-y:auto;">');
        var bwTimeList = config.bwTimeList;
        var bwList = config.bwList;
        for(var b=0;b<bwTimeList.length;b++){
        	var time = bwTimeList[b].TIME;
        	defaultHTML.push('<div class="bw_datetype">'+time+'</div>');
        	for(var w=0;w<bwList.length;w++){
        		if(time==bwList[w].BWTIME){
        			defaultHTML.push(' <p class="bwitems"><a href="#" onclick="UpdateBw(\''+bwList[w].NO+'\',\''+bwList[w].BWDETAIL+'\',\''+systemdate+'\');">'+bwList[w].BWDETAIL+'</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onclick="DeleteBw(\''+bwList[w].NO+'\');">ɾ��</a></p>');
        		}
        	}
        }
        defaultHTML.push(' </div>');
        defaultHTML.push('<div class="gg_fy">');
        defaultHTML.push('</div>');
        defaultHTML.push('</td>');
	    
		defaultHTML.push('</tr>');
		defaultHTML.push('</table>');
        defaultHTML.push('</div>');
		defaultHTML.push('<div id="fitmodedemo1" style="display:none;">');
		defaultHTML.push('<div class="editarea">');
	    defaultHTML.push('<table width="100%" border="0" cellspacing="0" cellpadding="0">');
	    defaultHTML.push(' <tr>');
	    defaultHTML.push(' <td width="100px" class="thele">�������ݣ�</td>');
	    defaultHTML.push(' <td><textarea class="textarestyle" onpropertychange="if(value.length>1500) value=value.substr(0,1500)" id="bwdetail"></textarea></td>');
	    defaultHTML.push(' </tr>');
	    defaultHTML.push('<tr>');
	    defaultHTML.push('<td width="100px" class="thele">¼�����ڣ�</td>');
	    defaultHTML.push('<td><input type="hidden" id="bwsxno" value=""><font size="2" color="red">'+systemdate+'</font><input type="hidden" id="bwsxhidden" value="0"></td>');
	    defaultHTML.push('</tr>');
	    defaultHTML.push('</table>');
	    defaultHTML.push(' </div>');
	    defaultHTML.push('<div style="height:10px;">&nbsp;</div>');
	    defaultHTML.push('<center>');
	    defaultHTML.push('<button class="nomalbtn" id="sxbcbtn" onclick="SaveBw(\''+systemdate+'\')">����</button>&nbsp;');
	    defaultHTML.push('<button class="nomalbtn" id="sxqxbtn" >ȡ��</button>');
	    defaultHTML.push('</center>');
	    defaultHTML.push('</div>');
	    defaultHTML.push('</div>');		
		}else{
		if(config.isshowtask!=null&&config.isshowtask==1){
			defaultHTML.push('<div id="default_main" style="display:block;overflow:auto; position:relative; background:url(/portal/images/portalwelcome.jpg) no-repeat center top;margin-bottom: 0px;" layout="{h:{fit:true,min:300},w:{fit:true,min:750}}">');
			defaultHTML.push('</div>');
		}else{
			/***********������������������Ϣ**************/	
			defaultHTML.push('<div id="default_main" style="display:block;overflow:auto; position:relative;margin-bottom: 0px;" layout="{h:{fit:\'auto\',min:300},w:{fit:true,min:750}}">');
	        //��������չʾ����
	        defaultHTML.push(pendingTaskShow(config));
	        //�Ҳ���ٵ�������������չʾ����
	        defaultHTML.push(qrgRightShow(config));
			defaultHTML.push('</div>');
		}
		}
	    //����洢ҳ��panel����
		var defaultPanel = new Ext.Panel({
			id:"defaultId", 
			border:false,
			html:defaultHTML.join('')
		});
		var isgo = true;
		var ii=0;
		var passwordflag=0;	
		/*
		defaultPanel.on('resize',function(panel){
			//resizeʱ�ı����div�Ŀ��
			var w = document . body . clientWidth;
			var tempwidth=w-(w/100)*3-483;
			tempwidth=w-520;
			if(document.getElementById('default_center')!=null){
				//document.getElementById('default_center').style.width=tempwidth;
			}
		});
		*/
		defaultPanel.on('afterlayout',function(panel){
		//ҳ����غ��ټ��ش�����������
		//var pdStr = pendingTaskShowAfter(config);
		//document.getElementById("default_middle_simple").innerHTML = pdStr;
			if(!panel.drawing){
					setTimeout(function(){
							if (config.quickguidMenu.length <= 0 && config.isshowreport == "true" && config.reportlist.length>0) {
										//�����pserver����
										var report_pserver_tem = config.reportlist[0].pserver;
										//���ݸ��ۺϲ�ѯ�ı������
										var report_param_tem = config.reportlist[0].reportparam;
										//�Ƿ���ʾͼ�λ��Ǳ�
										var report_reportorimage_tem = config.reportlist[0].reportorimage;
										//�ۺϲ�ѯ��IP��ַ
										var report_fcasip_tem = config.reportlist[0].fcasip;
											createScript_tem(report_fcasip_tem+'/fcas/js/outermouse.js',1,function(){
												createScript_tem(report_fcasip_tem+'/fcas/js/zapatec.js',2,function(){
													createScript_tem(report_fcasip_tem+'/fcas/js/tree.js',3,function(){
														createScript_tem(report_fcasip_tem+'/fcas/js/outerchart.js',4,function(){
															createScript_tem(report_fcasip_tem+'/fcas/system/fuscharinfor/js/FusionCharts.js',5,function(){
																//�����ʾ����ͼ�Σ�����ۺϲ�ѯ�Ĳ�ѯͼ�εĽӿ�
																if(report_reportorimage_tem!=null && report_reportorimage_tem == "1"){
																	var report_sid = config.session;
																	var report_uid = config.userCode;
																	var report_pserver = report_pserver_tem;
																	var report_param = report_param_tem;
																	var report_year = config.year;
																	var report_fcasip = report_fcasip_tem ;
																	var divid = "report_1";
																	//�����ۺϲ�ѯ��js
																	try{
																		var tableObj = queryChartOut(report_param);
															  			tableObj.outParameter({uid:report_uid,sid:report_sid,pserver:report_pserver,acctYear:report_year,divId:divid,height:'210',width:'437',refresh:'0',fcasIp:report_fcasip,tparams:report_param});
																	}catch(e){
																		divid.innerHTML="�ۺϲ�ѯ������"+report_fcasip_tem+"/fcas�޷�����";
																	}
																	/**/
																	//�������ͼ�Σ����ۺϲ�ѯ�Ĳ�ѯ����Ľӿ�
																}else{
																	var report_sid = config.session;
																	var report_uid = config.userCode;
																	var report_pserver = report_pserver_tem;
																	var report_param = report_param_tem;
																	var report_year = config.year;
																	var report_fcasip = report_fcasip_tem ;
																	var divid = "report_1";
																	//�����ۺϲ�ѯ��js
																	var tableObj = queryout(report_param);
										  							tableObj.outParameter({uid:report_uid,sid:report_sid,pserver:report_pserver,acctYear:report_year,divId:divid,height:'210',width:'437',refresh:'0',fcasIp:report_fcasip,tparams:report_param});
																	/**/
																}
															});
														});
													});
												});
											});
										
							}
						panel.drawing=false
					},200);
					panel.drawing=true;
			}
			if(ii==0){
				Ext.lt.message.send('showlogo','onshow',"");
				if(config.isshow==1){
					showuserInfor_text(config);
				}
			}
			ii++;
			/*�Զ�������ҳ���ܣ��൱������ҳ�Զ�ˢ��*/
			if(config.refreshtime!=null){
			
				var refreshtime = config.refreshtime;
				if(refreshtime!=0){
					window.setTimeout("window.location.href='"+_ROOT_PATH_ + "/defaultcommon.page';", refreshtime);
				}
			}	
			//��ȡsessionʧЧ������sessionʧЧ��������ʾ���رմ���
			if(config.sessiontime!=null){
			
				var refreshtime = config.sessiontime;
				if(refreshtime!=0){
					window.setTimeout("window.location.href='/getsession.do';", refreshtime);
				}
			}	
			//�жϾ������Ƿ����������������zjm
			if(config.MODPWD =="1"){
				var password = config.PWD;
				var reg = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{2,})$/;				 
                var r = reg.test(password);
              
				if(r){                                             
				 return defaultPanel;
			    }else{
			    	if(passwordflag==0){
			    		Ext.lt.portal.component.login.showmodpasswordwin();
			        	//window.showModalDialog(_ROOT_PATH_ +"/template/commons/modifytz.do","window","dialogWidth:436px;dialogHeight:260px;center:yes;help:no;resizable:no;status:no");
			   			passwordflag=passwordflag+1;
			   		}
			    }	
			}		    
			
		});
		return defaultPanel;
	};
}
	//ǿ����ʾ��¼���û��Ĺ���
	var prenum = 1;
	var maxnum = 0;
	var minnum = 1
	var flag=false;
	var list = new Array();
	function showuserInfor_text(config){
		for(var i = 0;i < config.fileids.size();i ++){
			list.push(config.fileids[i].publicId);
		}
		 maxnum =config.fileids.size();
	var postHtml = [];	
	var url= _ROOT_PATH_+"/common/post/showload.do?id="+list[0];
		postHtml.push(' <div>');
		postHtml.push('<iframe src="" name="public_frame" id="public_frame" marginwidth=0 marginheight=0 width=100% height=94% frameborder=1></iframe>');
		postHtml.push('</div>');
   		postHtml.push(' <div style="width:100%; text-align:center">��&nbsp;&nbsp;<span id="showpre"></span>&nbsp;&nbsp;/&nbsp;&nbsp;<span id="showMaxPage"></span>&nbsp;&nbsp;ҳ');
   		postHtml.push('<input type="button" value="��һҳ" class="button_style" onmouseover="this.className=\'OverBtn\'" onmouseout="this.className=\'button_style\'" onmousedown="this.className=\'down\'" onclick="upPage()" id="upbutton"/>');
   		postHtml.push('<input type="button" value="��һҳ" class="button_style" onmouseover="this.className=\'OverBtn\'" onmouseout="this.className=\'button_style\'" onmousedown="this.className=\'down\'" onclick="nextPage()" id="nextbutton"/>');
   		postHtml.push('<input type="button" id="closewid" disabled="true" value="�ر�"  onmouseover="this.className=\'OverBtn\'" onmouseout="this.className=\'button_style\'" onmousedown="this.className=\'down\'" class="button_style" onclick="closewin()"/>');
    	postHtml.push('</div>'); 
		
		var win =new Ext.Window({    
			id:'postwin',    
		    width : document.body.clientWidth/2-100,
			height : document.body.clientHeight-40,			
			title : "����",
			resizable : false,
			buttonAlign :'center',
			closable:false,
			html:postHtml.join('')
	});	
	win.on('afterlayout',function(win){
		document.getElementById('public_frame').src=url;
		loadpage();
		Ext.getCmp("defaultId").getEl().mask();
	});
	win.show();
	}	
	function loadpage(){
  		document.getElementById('showpre').innerText=1;
  		document.getElementById('showMaxPage').innerText=maxnum;
  		if(maxnum==1){
  			document.getElementById('closewid').disabled=false;
  			document.getElementById('nextbutton').disabled=true;
  			document.getElementById('upbutton').disabled=true;
  		}else{
  			document.getElementById('closewid').disabled=true;
  			document.getElementById('upbutton').disabled=true;
  		}
  	}
	//��һҳ���ж�
  	function nextPage(){
  		prenum=prenum+1;
  		if(prenum<maxnum && prenum!=1){
  			document.getElementById('nextbutton').disabled=false;
  			document.getElementById('upbutton').disabled=false;
  			document.getElementById('closewid').disabled=true;
  			document.getElementById('showpre').innerText=prenum;
  		}else if(prenum==maxnum){
  			document.getElementById('nextbutton').disabled=true;
  			document.getElementById('upbutton').disabled=false;
  			document.getElementById('closewid').disabled=false;
  			prenum=maxnum;
  			document.getElementById('showpre').innerText=prenum;
  			flag=true;
  		}
  		if(flag==true){
  			document.getElementById('closewid').disabled=false;
  		}
  		var id= list[prenum-1];
  		document.getElementById('public_frame').src= _ROOT_PATH_+"/common/post/showload.do?id="+id;
  	}
  	//��һҳ���ж�
  	function upPage(){
  		prenum=prenum-1;
  		if(prenum<maxnum && prenum!=1){
  			document.getElementById('nextbutton').disabled=false;
  			document.getElementById('upbutton').disabled=false;
  			document.getElementById('showpre').innerText=prenum;
  			document.getElementById('showpre').innerText=prenum;
  			document.getElementById('closewid').disabled=true;
  		}else if(prenum<maxnum && prenum==1){
  			document.getElementById('nextbutton').disabled=false;
  			document.getElementById('upbutton').disabled=true;
  			prenum=1;
  			document.getElementById('showpre').innerText=prenum;
  			document.getElementById('closewid').disabled=true;
  		}
  		if(flag==true){
  			document.getElementById('closewid').disabled=false;
  		}
  		var id= list[prenum-1];
  		document.getElementById('public_frame').src= _ROOT_PATH_+"/common/post/showload.do?id="+id;
  	}
  	//�ر�
  	function closewin(){
  		Ext.getCmp('postwin').close();
  		Ext.getCmp("defaultId").getEl().unmask();
  	}
//Ԥ������
function preview(contextpath,id){
	para.id = id;
  	Ext.lt.RCP.server('defaultCommonService', "preview",  para, function (resp) {
  			if(resp=="true"){
  				document.getElementById(id).style.display="none";
  			}else{
  				document.getElementById(id).style.display="block";
  			}	
    });
	var url = contextpath+"/portal/portlets/post/post_preview.jsp?id="+id;
	window.open(url,'window',"Height=700,Width=600px,scrollbars=yes,status=no,resizable=0;");  
}

//����֮����ʱ����
function switchReport(obj,num,totalnum){
		var oo = document.getElementById("reportShow").getElementsByTagName('li');
		for(var t=0;t<oo.length;t++){
			oo[t].className='noselected';
		}
		obj.className='selected';
		var dividid = 'report_';
		for(var t=0;t<totalnum;t++){
			dividid = dividid +(t+1);
			document.getElementById(dividid).style.display = "none"; 
			dividid = 'report_';
		}
		var divid_show = 'report_'+num;
		document.getElementById(divid_show).style.display = "block";
		//alert(num);
		//alert(totalnum);
}
function switchReportshow(obj,num,totalnum,report_fcasip_tem,report_reportorimage_tem,report_sid,report_uid,report_pserver,report_param,report_year){
	//alert(report_fcasip_tem);
	//alert(report_reportorimage_tem);
	//alert(report_sid);
	//alert(report_uid);
	//alert(report_pserver);
	//alert(report_param);
	//alert(report_year);
	var report_fcasip = report_fcasip_tem;
	var p = num;
	//alert(report_fcasip);
		var oo = document.getElementById("reportShow").getElementsByTagName('li');
		for(var t=0;t<oo.length;t++){
			oo[t].className='noselected';
		}
		obj.className='selected';
		var dividid = 'report_';
		for(var t=0;t<totalnum;t++){
			dividid = dividid +(t+1);
			document.getElementById(dividid).style.display = "none"; 
			dividid = 'report_';
		}
		var divid_show = 'report_'+num;
		document.getElementById(divid_show).style.display = "block";
						//����js  1--report_fcasip_tem
				createScript_tem(report_fcasip_tem+'/fcas/js/outermouse.js',1,function(){
					createScript_tem(report_fcasip_tem+'/fcas/js/zapatec.js',2,function(){
						createScript_tem(report_fcasip_tem+'/fcas/js/tree.js',3,function(){
							createScript_tem(report_fcasip_tem+'/fcas/js/outerchart.js',4,function(){
								createScript_tem(report_fcasip_tem+'/fcas/system/fuscharinfor/js/FusionCharts.js',5,function(){
									//�����ʾ����ͼ�Σ�����ۺϲ�ѯ�Ĳ�ѯͼ�εĽӿ� 
									//2---report_reportorimage_tem
									//3--report_sid
									//4--report_uid
									//5--report_pserver
									//6--report_param
									//7--report_year
									//8--report_fcasip
									//9--p
									if(report_reportorimage_tem!=null && report_reportorimage_tem == "1"){
										var divid = "report_"+p;
										//�����ۺϲ�ѯ��js
										var tableObj = queryChartOut(report_param);
								  		tableObj.outParameter({uid:report_uid,sid:report_sid,pserver:report_pserver,acctYear:report_year,divId:divid,height:'210',width:'437',refresh:'0',fcasIp:report_fcasip,tparams:report_param});
										/**/
										//�������ͼ�Σ����ۺϲ�ѯ�Ĳ�ѯ����Ľӿ�
									}else{
										var divid = "report_"+p;
										//�����ۺϲ�ѯ��js
										var tableObj = queryout(report_param);
										tableObj.outParameter({uid:report_uid,sid:report_sid,pserver:report_pserver,acctYear:report_year,divId:divid,height:'210',width:'437',refresh:'0',fcasIp:report_fcasip,tparams:report_param});
										/**/
									}
								});
							});
						});
					});
				});
		//alert(num);
		//alert(totalnum);
}
function createScript_tem(srcIp, divId, fn) {
		if (document.getElementById("cgi_emotion_list" + divId)) {
			document.getElementsByTagName("HEAD")[0].removeChild(document.getElementById("cgi_emotion_list" + divId));
		}
		var s = document.createElement("SCRIPT");
		s.id = "cgi_emotion_list" + divId;
		s.src = srcIp;
		s.onreadystatechange = function () {
			if (this.readyState == "complete" || this.readyState == "loaded") {
				if (fn != null) {
					fn();
				}
			}
		};
		document.getElementsByTagName("HEAD")[0].appendChild(s);
		return s;
	}

//*******************************************Ext.lt.portal.component.ifmis ��ʼ****************************************************************************************************
Ext.lt.portal.component.ifmis=new function(){
	this.config="";
	/**��������չʾ  ���div*/
//{isbulletin:,quickguidMenu:,isshowreport:,userCode:}
	this.pendingTaskShow=function(config){
	    //��������洢�������
	    var pendingTaskHtml = [];
	    //�ж��Ƿ�ֻ��ʾ�������������桢���ٵ�������������ʾ��
		if (config.isbulletin == "false" && config.quickguidMenu.length == 0 && config.isshowreport == "false") {
			pendingTaskHtml.push('<div id="default_center" style="width:100%">');
		//��������������ʾ
		}else {
			var tempwidth=(document . body . clientWidth/100)*3+483;
	       // pendingTaskHtml.push('<div id="default_center" layout="{w:{fit:-527}}" style=" float: left; margin-left: 1%; margin-top: 1%;">');
			pendingTaskHtml.push('<div id="default_center" style="width: expression(document . body . clientWidth-'+tempwidth+'); float: left; margin-left: 1%; margin-top: 1%;">');
		
		}
		//��������չʾ�������
		pendingTaskHtml.push('       <div id="default_top_simple">');
		pendingTaskHtml.push('           <div style="width:100%;"><span>��������</span></div>');
		pendingTaskHtml.push('       </div>');
		//����������������չʾ
		pendingTaskHtml.push('       <div data-id="p-task-container" id="default_middle_simple" style="height: expression(document.body.clientHeight-logo.offsetHeight-menu.offsetHeight-120);">');
		pendingTaskHtml.push('       </div>');
		pendingTaskHtml.push('       <div id="default_bottom_simple">');
		pendingTaskHtml.push('	         <div style="width:100%;"><span></span></div>');
		pendingTaskHtml.push('       </div>');
	    pendingTaskHtml.push('    </div>');
	    return pendingTaskHtml.join('');
	};
	/**************���������ѯ���ؽ��չʾ**********�ĳ�window.onloadʱ���ش��� �˷����Ͳ���Ҫ*/ 
	this.showPendingTask=function(config){
	    //��������չʾ���󼯺�
	    var totallist = config;
	    for(var index = 0;index < totallist.length; index++)
	    {   
	        //ҵ��ϵͳ��������������磺ָ��ϵͳ
		    var pendingtasks=totallist[index];
		    //�����������洢�������
		    var taskStrHtml = [];
		    //���ҵ��ϵͳ��Ҫ��ʾ��������
		    if(pendingtasks.size()>0){
		       //���������ҵ��ϵͳ
			   if(pendingtasks[0].outter!=1)
			   {   
			       //���ҵ��ϵͳ�����ڴ�������
				   if(!pendingtasks[0].name)
				   {
				        //ҵ��ϵͳID
					    var k=pendingtasks[0].k;
					    //ҵ��ϵͳ����
						var menuname=pendingtasks[0].menuname;
						//��ʾҵ��ϵͳ����
						taskStrHtml.push('<p style="display:block; overflow:auto;">');
						taskStrHtml.push('<a class=inner_title >' + menuname + '&nbsp&nbsp&nbsp&nbsp<b style="color:#000; font-weight:normal;"></b>' + '</a>');
						taskStrHtml.push('</p>');
			       }
			       //���ҵ��ϵͳ���ڴ�������
			       else{
			           //�û�����
					   var count=0;
					   //��ʾҵ��ϵͳ����
					   taskStrHtml.push('<p style="height:150px; display:block; overflow:auto;">');
					   taskStrHtml.push('<a class=inner_title >' + pendingtasks[0].menuname + '</a>');
					   //ҵ��ϵͳ�д�������չʾ���
					   taskStrHtml.push('<table width=98% border=0 cellpadding=0 cellspacing=0>');
					   //ѭ��ҵ��ϵͳ��ϵͳ,���磺��ָ����ء���λָ������ȵ�
				       for(i=0; i<pendingtasks.size();i++) {
				       		count++;
				       		//����ҵ��ϵͳ��ϵͳ����
							var pendingtask= pendingtasks[i];
							//ҵ��ϵͳ��ϵͳ��������������磺����ˡ�����ӡ�ȵ�
							var details = pendingtask.details;
							//��ϵͳ�����ַ
							var hostip = pendingtask.hostip;
							//��ϵͳ����˿�
							var hostport=pendingtask.hostport;
							//��ϵͳ���ط����ַ
							var localip = pendingtask.localip;
							//��ϵͳ���ط���˿�
							var localport=pendingtask.localport;
							//�û�����
							var uid=pendingtask.uid;
							//ҵ��ϵͳ�˵��ɣ�
							var k = pendingtask.k;
							//sessionID
							var sid=pendingtask.sid;
							//�������
							var year=pendingtask.year;
							//�Ƿ���
							if(count%2==1)
							{
			      				taskStrHtml.push('<tr>');
			    			}
			    			//��ϵͳ��������չʾ
							taskStrHtml.push('<td width="45%" style="vertical-align:top;">' + '<span>');
							//��ϵͳ����ǰ������ͼ��
							taskStrHtml.push('<img src="' + _ROOT_PATH_ + '/images/bg/top.gif"/>');
							taskStrHtml.push(pendingtask.name + '----->��' + pendingtask.totalcount + '��<br/>');
							//������ϵͳ����������磺����ˡ�����ӡ��
							for(j=0;j<details.size();j++)
							{ 
							    //��ϵͳ��������ǰ��ͼ��
							    taskStrHtml.push('&nbsp' + '<img src="' + _ROOT_PATH_ + '/images/bg/20.png" />');
							    //��ϵͳ��������������磺����ˡ�����ӡ��
							    detail=details[j];
							    //��ϵͳ�����������ӵ�ַ
							    var url="http://"+hostip+":"+hostport+detail.linkName;
							    //�滻���ӵ�ַ�еĲ������ַ�
							    url=url.replace(/&/g, "%26");
							    //���ҵ��ϵͳ�ķ����ַΪ����ʹ�õ�ǰϵͳ��Ĭ�ϵ�ַ
							    if(hostip == "" && hostport == ""){
							       taskStrHtml.push('<a href="' + _ROOT_PATH_);
							       taskStrHtml.push(detail.linkName + '">');
							    }  
							    //������ҵ��ϵͳ�ķ����ַ�뵱ǰ�����ַ��ͬ��ʹ�õ�ǰϵͳ��Ĭ�ϵ�ַ 
							    else if(hostip == localip && hostport == localport)
								{
							       taskStrHtml.push('<a href="' + _ROOT_PATH_);
							       taskStrHtml.push(detail.linkName + '">');
							    }
							    //������������ҵ��ϵͳ
							    else{
							       taskStrHtml.push('<a href="http://');
							       taskStrHtml.push(hostip + ':' + hostport + '/common/pendingtasklogin.do' + '?uid=' + uid + '&sid=' + sid + '&year=' + year + '&url=' + url + '">');
							    }
							    //��ʾ���������������
							    taskStrHtml.push('&nbsp��' + detail.operattypedto.name + '&nbsp' + detail.totalcount + '��</a>');
				   				taskStrHtml.push('<br/>');   
						    } 
							taskStrHtml.push('</span>' + '</td>');
							//��ϵͳ�Ƿ���
							if(count%2==0){
			      			    taskStrHtml.push('</tr>');
			    			}  
					    }
						taskStrHtml.push('</table>');
						taskStrHtml.push('</p>');
				    }
			   }
			   //���Ϊ�����������
			   if(pendingtasks[0].outter==1){
				   //ѭ��ҵ��ϵͳ��ϵͳ��Ϣ
				   for(i=0; i<pendingtasks.size();i++) {
				   	  taskStrHtml.push('<p>');
				   	  //��ϵͳ�������磺��ָ����ء���λָ�����
				      pendingtask= pendingtasks[i];
				      //ҵ��ϵͳID
				      var k=pendingtask.k;
				      //��ϵͳ�������������磺����ˡ�����ӡ��
				      var details = pendingtask.details;
				      //��ϵͳ���Ƽ���
				      var name_tem = pendingtask.name_tem;
				      //ҵ��ϵͳǰ������ͼ��
				      taskStrHtml.push('<img src="' + _ROOT_PATH_ + '/images/bg/top.gif"/>');
				      //�����bsҵ��ϵͳ
				      if(pendingtask.type==1)
					  {  
				      	taskStrHtml.push('<a href="' + pendingtask.Url + '" target="_blank">');
				      	//ҵ��ϵͳ����
				      	taskStrHtml.push(pendingtask.name + '</a>');
				      //�����csҵ��ϵͳ
				      }else{
				      	taskStrHtml.push('<a href="' + pendingtask.Url + '">');
				      	//ҵ��ϵͳ����
				      	taskStrHtml.push(pendingtask.name + '</a>');
				      }
				      //���������������������
				      if(pendingtask.count>0){
				        taskStrHtml.push('----->��' + pendingtask.count + '��<br/>');
				       }
				       taskStrHtml.push('<br/>'); 
				       taskStrHtml.push('<span>');
				       //��ϵͳ���Ƽ���Ϊ����������table�����ҵ��ϵͳ�в�ͬ��ϵͳ�Ĵ�������
				       if(name_tem.size()>0){
					        taskStrHtml.push('<table border=0>');
					        //ѭ������ҵ��ϵͳ��ϵͳ
					       	for(o=0;o<name_tem.size();o++){
					       	//�����б��
					       	if(o%2==0)
								{
				      				taskStrHtml.push('<tr>');
				    			}
					       	    taskStrHtml.push('<td width="300" style="vertical-align:top;">');
					       	    //ϵͳ����ǰ��ͼ��
					       		taskStrHtml.push('&nbsp' + '<img src="' + _ROOT_PATH_ + '/images/bg/20.png" />');
					       		//��ϵͳ����
					       		taskStrHtml.push(name_tem[o]);	       		
					       		taskStrHtml.push('<br/>');
					       		//ѭ��������ϵͳ��Ӧ��������������ˡ�����ӡ��
					       		for(j=0;j<details.size();j++)
								   { 
								      //��ϵͳ������������������ˡ�����ӡ��
								      detail=details[j];
								      //�����ϵͳ����������������0
								      if(detail.totalcount>0){
								          //�����ϵͳ��������������ж�Ӧ��ϵͳ����һ�£���Ѵ�����������Ӧ��ϵͳ������
									      if(detail.menuname == name_tem[o] ){
									         //�����bsϵͳ
									         if(pendingtask.type==1)
									         {  
									         	taskStrHtml.push('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + '<a href="' + detail.JobUrl + '" target="_blank">' + detail.status + '<' + detail.totalcount + '��></a>');
									         	taskStrHtml.push('<br/>');
					                         }
					                         //�����CSϵͳ
					                         else
					                         {
					                            taskStrHtml.push('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + detail.status + '&nbsp;<' + detail.totalcount + '��>');
					                            taskStrHtml.push('<br/>'); 
					                         }
					                       }
								       }
								       //��������ϵͳ����������������0
								       if(detail.totalcount==0){
								           taskStrHtml.push('&nbsp' + detail.status); 
								           taskStrHtml.push('<br/>'); 
								        }								        
							       }					       		
					       		taskStrHtml.push('</td>');
					       		//�Ƿ���
					       		if(o%2==1)
								{
				      				taskStrHtml.push('</tr>');
				    			}
					       	}
					       	taskStrHtml.push('</table>');
				       //��ϵͳ���Ƽ���Ϊ1��,����tableչʾ
				       }else{
				           //ѭ��������ϵͳ��������
					       for(j=0;j<details.size();j++)
						   {
						      //��ϵͳ�����������
						      detail=details[j];
						      taskStrHtml.push('&nbsp' + '<img src="' + _ROOT_PATH_ + '/images/bg/20.png" />');
						     //�����bsϵͳ
					         if(pendingtask.type==1)
					         {  
					            //�����ϵͳ�����������0��
					            if(detail.totalcount>0){
						         	taskStrHtml.push('<a href="' + detail.JobUrl + '" target="_blank">' + detail.status + '<' + detail.totalcount + '��></a>');
					         	}else{
					         		taskStrHtml.push('<a href="' + detail.JobUrl + '" target="_blank">' + detail.status + '</a>');
					         	}
	                         }
	                         //�����csϵͳ
	                         else
	                         {
	                            //�����ϵͳ�����������0��
	                         	if(detail.totalcount>0){
	                            	taskStrHtml.push(detail.status + '&nbsp;<' + detail.totalcount + '��>');
	                            }else {
					         		taskStrHtml.push(detail.status);
					         	}
					         }
						        taskStrHtml.push('<br/>'); 
					       }
				       }
				       taskStrHtml.push('</span>');
				       taskStrHtml.push('</p>'); 
				    }
				     
			    }
		    }//pendingtasks>0
		   //�Ѹ�ҵ��ϵͳ��Ӧ�Ĵ���������Ϣ�������Ӧ�ģɣ���
		   document.getElementById(k).innerHTML = taskStrHtml.join('');
	   }//for
	};
	
	/***********�Ҳ���ٵ�������������չʾ����***********/
	
	this.qrgRightShow=function(config){
	config.isbulletin="false";
	
	    //�������洢����
	    var qrgRightHtml = [];
	    //�жϿ��ٵ��������������Ƿ���һ����Ҫ��ʾ��
		if (config.isbulletin == "true" || config.quickguidMenu.length > 0 || config.isshowreport == "true") {
			//���������Ҳ���ʾ����
		    qrgRightHtml.push('<div id="default_center" style="width:482px; float: left; margin-left: 1%; margin-top: 1%;">');
		    //���ϲ�
			qrgRightHtml.push(    '<div id="default_top_simple" >');
			qrgRightHtml.push(	      '<div style="width:100%;"><span></span></div>');
			qrgRightHtml.push(    '</div>');
			//���в�
		    qrgRightHtml.push(    '<div id="default_middle_simple" style="height: expression(document.body.clientHeight-logo.offsetHeight-menu.offsetHeight-120); background-image: none; background-repeat: no-repeat; background-position: right bottom;">');
			qrgRightHtml.push(        '<span id="middle_inner">'); 
			//�ж��Ƿ���ʾ���ٵ���(�����ʾ)
			if (config.quickguidMenu.length > 0){
				qrgRightHtml.push(            '<div  class="title_orange">���ٵ���</div>');
				//�����Ƿ���ʾ�������жϿ��ٵ�������ĸ߶�
			    if (config.isbulletin == "true"){
				    qrgRightHtml.push('<div style="height:210px; overflow-y:scroll;">');
			    }else {
			   	    qrgRightHtml.push('<div style="height: expression(document.body.clientHeight-logo.offsetHeight-menu.offsetHeight-190);overflow-y:scroll;">');
			    }
			    qrgRightHtml.push('<table width="90%" border="0" cellpadding="0" cellspacing="0">');
				for(var i = 0; i < config.quickguidMenu.length; i++){
				    //���ٵ�������
				    var guidMenu =config.quickguidMenu[i];
				    //3��һ��
				    if(i%3==0){
				        qrgRightHtml.push('<tr valign="top">');
				    }
				    qrgRightHtml.push('       <td align="center" style="padding-top:2px;" width="32%">');
				    //ͼƬ
				    qrgRightHtml.push('           <img style="margin-left:20px;" src="' + _ROOT_PATH_ + '/images/bg/quick_before_small.gif" onMouseOver="this.src=\'' + _ROOT_PATH_ + '/images/bg/quick.gif\'" onMouseOut="this.src=\'' + _ROOT_PATH_ + '/images/bg/quick_before_small.gif\'" onClick="location.href=\'' + guidMenu.inputaddurl + '\'">');
				    qrgRightHtml.push('           <br/>');
				    qrgRightHtml.push('           <a href="' + guidMenu.inputaddurl + '" style="font-size:12px; margin-top:2px;">' + guidMenu.menuname + '</a>');
				    //������ٵ��й�����λ��
				    if((i+1)%6==0){
				        qrgRightHtml.push('<br/><br/>')
				    }
				    qrgRightHtml.push('       </td>');
				    //�н�����
					if((i+1)%3 == 0 || i == config.quickguidMenu.length - 1){
					    qrgRightHtml.push('</tr>');
					}
				}
				qrgRightHtml.push('</table>');
				qrgRightHtml.push('</div>');
			//�ж��Ƿ���ʾ�������ٵ���������ֻ����ʾһ�������п��ٵ�����ʾʱ��������ͬʱѡ����ʾ����
			}else if (config.isshowreport == "true") {
			    qrgRightHtml.push('<div id="reportShow" style="display:block;">');
				qrgRightHtml.push('    <div  class="title_report">')
				qrgRightHtml.push('        <ul>');
				//ѭ�������б�
                for(var o = 0; o < config.reportlist.length; o++){
                    //Ĭ����ʾ��һ�ű���
				    if(o == 0){
					    qrgRightHtml.push('<li class="selected" onclick="switchReport(this,' + (o+1) + ',' + config.reportlist.length + ')">ͼ��' + (o+1) + '</li>');
					}else{
					    qrgRightHtml.push('<li class="noselected" onclick="switchReport(this,' + (o+1) + ',' + config.reportlist.length + ')">ͼ��' + (o+1) + '</li>');
					}
				}
				qrgRightHtml.push('		  </ul>');
				qrgRightHtml.push('    </div>');
				qrgRightHtml.push('</div>');
			}
			debugger;
			//��ʾ����
			
			if(config.isbulletin == "true"){
			debugger;
			    qrgRightHtml.push('<div class="title_orange"><table width=100% border="0"><tr><td>����</td><td align="right"><input style="width:70px;height:20px;background:url(../portal/images/viewall.gif) no-repeat left top;cursor:pointer;border:0;" type="button" onclick="Ext.lt.portal.component.login.openPost();"/></td></tr></table></div>');
			    //���ݿ��ٵ����ͱ����Ƿ���ʾ�����ƹ���ģ��ĸ߶�
			    if(config.quickguidMenu.length > 0 || config.isshowreport == "true"){
			        qrgRightHtml.push('<marquee direction=up scrollamount=1 scrolldelay=50 onMouseOver="stop()" onMouseOut="start()" style="cursor: pointer; color: #000000; height: expression(document.body.clientHeight-logo.offsetHeight-menu.offsetHeight-280);">');
				}else{	
					qrgRightHtml.push('<marquee direction=up scrollamount=1 scrolldelay=50 onMouseOver="stop()" onMouseOut="start()" style="cursor: pointer; color: #000000; height: expression(document.body.clientHeight-logo.offsetHeight-menu.offsetHeight-60);">');
                }
                
                //ѭ�������б�
				for(var i = 0; i < config.postList.length; i++){
				
				    //�������
					var post =config.postList[i];
					qrgRightHtml.push('<div style=\"border-bottom:1px #ccc dotted; margin-top:10px;  line-height:25px;\">');
					qrgRightHtml.push('    <img src="' + _ROOT_PATH_ + '/images/done_btn/news.gif" />');
					qrgRightHtml.push('	   <a onclick=\'preview("","' + post.id + '")\'>');
					//���ݹ��漶���ж��Ƿ��ɫ������ʾ
					if(post.postlevel == "3"){
					    qrgRightHtml.push('    <font color=green>');
						qrgRightHtml.push(post.posttitle);
						qrgRightHtml.push('	   </font>');
						qrgRightHtml.push('		</a>');
					    qrgRightHtml.push('(' + post.createtime + ')');
					    qrgRightHtml.push('    <img src="' + _ROOT_PATH_ + '/images/done_btn/news.gif" />');
					//��ͨ����
					}else{
					    //if(config.postList2.length>0){
					    // qrgRightHtml.push(post.posttitle);
					    //  qrgRightHtml.push('		</a>');
					    //qrgRightHtml.push('(' + post.createtime + ')');
					    // }else{
					     qrgRightHtml.push(post.posttitle);
					     qrgRightHtml.push('		</a>');
					     qrgRightHtml.push('(' + post.createtime + ')');
                         qrgRightHtml.push('    <img src="' + _ROOT_PATH_ + '/images/done_btn/news.gif" />');
					    //}
					}

					qrgRightHtml.push('		<br>');
					qrgRightHtml.push('</div>');
				}
				qrgRightHtml.push('<br />');
				qrgRightHtml.push('</marquee>'); 
			}
			qrgRightHtml.push(        '</span>');
		    qrgRightHtml.push(    '</div>');
			//���²�
			qrgRightHtml.push(    '<div id="default_bottom_simple">');
			qrgRightHtml.push(        '<div style="width:100%;"><span></span></div>');				
			qrgRightHtml.push(    '</div>');
		    qrgRightHtml.push('</div>');
		}
		return qrgRightHtml.join('');
	};
	
	// �����Ż����ʵ��logo���
	this.logo=function(servers,config){
	    //��ҳlogo����
	    var logoHtml = [];	
        logoHtml.push('<div id="logo" >');
        logoHtml.push('    <table width="100%" border="0" cellspacing="0" cellpadding="0">');
        logoHtml.push('        <tr>');
        logoHtml.push('            <th rowspan="2" nowrap="nowrap"></th>');
        logoHtml.push('            <td  nowrap="nowrap">');
        //�Ƿ���ʾ�˳���ť
        if(config.exitshow == "1"){
            logoHtml.push('	           <div><a title="�˳�" href="' + _ROOT_PATH_ + '/logout.page"><img src="' + _ROOT_PATH_ + '/images/actions/exit.gif" width="16" height="16" border="0"/> �˳� </a></div><div class="w_gang"></div>');
        }
        //��ҳˢ�°�ť
        logoHtml.push('                <div><a title="ˢ��" href="' + _ROOT_PATH_ + '/defaultcommon.page"><img src="' + _ROOT_PATH_ + '/images/actions/house.gif" width="16" height="16" /> ˢ��</a></div><div class="w_gang"></div>');
        //�ֺŴ�С����
        logoHtml.push('                <div><img src="' + _ROOT_PATH_ + '/images/actions/font_size.gif" width="16" height="16" border="0" title="�ֺ�" /><a href="#" onclick="setFont(\'l\')">��</a><a href="#" onclick="setFont(\'m\')"> ��</a><a href="#" onclick="setFont(\'s\')"> С</a></div><div class="w_gang"></div>');
        //�Ƿ���ʾ�޸����밴ť(��ʾ�޸����밴ť���Ҳ���ca��¼)
        if(config.passwordshow == "1" && config.isportalca == "false"){
            logoHtml.push('                <div><a title="�޸�����" href="' + _ROOT_PATH_ + '/portal/login/mod_password.jsp" target="_blank"><img src="' + _ROOT_PATH_ + '/images/actions/mod_pwd.gif" width="16" height="16" border="0"/> �޸�����</a></div><div class="w_gang"></div>');
        }
        //�Ƿ���ʾ������¼��ť
        if(config.intranetConfig == "true"){
            logoHtml.push('                <div><a title="��������" href="' + _ROOT_PATH_ + '" target="_blank"><img src="' + _ROOT_PATH_ + '/images/actions/go_innerNet.gif" width="16" height="16" /> ����</a></div><div class="w_gang"></div>');   
        }
        logoHtml.push('                    <div class="w_head"></div>');   
        logoHtml.push('                </td>');
        logoHtml.push('                <td width="6" nowrap="nowrap" class="w_right">&nbsp;</td>');
        logoHtml.push('            </tr>');
        logoHtml.push('            <tr>');
        logoHtml.push('                <td nowrap="nowrap"  class="welcomeA">');
        //�������¼��Ҫ��������ʹ�ã�
        //<%if(area_name != null && area_name != ""){ %>
       	//����:<%=area_name%> 
        //<%}%> 
        //��¼�������
        logoHtml.push('                ���:' + config.year );
        //�û���λ��Ϣ
        if(config.agencyType != null){
            logoHtml.push(config.agencyType + ':' + config.agencyName);         
        }else if (config.agencyName != null){
            logoHtml.push('��λ:' + config.agencyName); 
        }
        //�û�������Ϣ
        logoHtml.push('�û�:' + config.userCode);
        //��ǰϵͳ����
        var s="";   

        if(config.agencyType != null){
            logoHtml.push('����:');
        }else {
            logoHtml.push('ϵͳ����:');
        }
        logoHtml.push('                   <span id=cdate>' + Ext.lt.dateutil.YYMMDD());
        logoHtml.push('                   </span></td>')
        logoHtml.push('                <td nowrap="nowrap">&nbsp;</td>');
        logoHtml.push('            </tr>');
        logoHtml.push('        </table>');
        logoHtml.push('    </div>');
        logoHtml.join('');
	/*
		var logoPanel = new Ext.Panel({
			id:"defaultId", 
			layout:'fit',
			border:false,
			html:logoHtml.join('')
		});
	*/
		var logoPanel=new function(){
			layout:'fit'
			var cmp;
			this.draw=function(el){
				el.innerHTML=logoHtml.join('');
				cmp=el.firstChild;
			}
			/*this.resize=function(w,h){
				cmp.style.width=w+'px'
				cmp.style.height=h+'px'
			}
			*/
		}
		
		return logoPanel;
	};
	
// �����Ż����ʵ�ֲ˵����
	this.menu=function(servers,config){
		//��¼csϵͳ����  ����0ʱ��ʾ ҵ������ַ����˵�
		var cscount=0;
		//����˵���������
		var mainMenuHtml = [];
        //�����˵�������󣬶����ݿ����ϵͳ
		var menudiv = [];
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
	    mainMenuHtml.push('        <li>��</li>'); 
	    /**��ʼ����ϵͳ�˵���Ϣ*/
	    //�˵��ܳ��ܵ������
	    var menuwidth = window.screen.width - 50;
	    //ʵ�ʲ˵����
	    var menulength = 1;
	    for (var i = 0; i < config.totalmenus.length; i++){
	        //�˵����� 
	        var menu = config.totalmenus[i]
	        //����˵����
	        menulength = menulength + menu.name.length+1;
	        //����Ƕ�����ʾ
	        if (config.isshowmenus == "true"){
	            //������
				if(menulength*16>=menuwidth){
					//����
					mainMenuHtml.push('<br><li>��&nbsp;</li>');;
					menulength=1;
				}
	        }
	        //�����һ�廯�˵�
	        if(menu.menuid){
	            mainMenuHtml.push('<li><a href="' + _ROOT_PATH_ + menu.clientmodule+'?mainmenu=' + menu.menuid + '">' + menu.name + '</a>��</li>');
	        //����ǽ���˵�
	        }else {
	            /**���ݲ�ͬҵ��ϵͳ���ͽ������⴦��1��b/sϵͳ  2��c/sϵͳ  3����־����-��ʱ��������Ǹ��ط���ʹ�ã�*/
	            //δʵ��ϵͳ��ʾ��Ϣ
	            var promsg = "��ϵͳ��û�н��н��룬�޷����е����¼";
	            //�����b/sϵͳ
	            if (menu.type == 1){
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
	                //δʵ��ҵ��ϵͳ��  
	                }else if (menu.tjhqprogram == 6){
	                    mainMenuHtml.push('<li><a href="#"');
					    mainMenuHtml.push(' onclick="javascript:alert(\'' + promsg + '\');">' + menu.name + '</a>��</li>');
	                //����ҵ��ϵͳ����Ҫ�Ƿ�����ͼĬ��b/sҵ��ϵͳ����淶�ĵ�3��ҵ��ϵͳ��  
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
	                            mainMenuHtml.push('<li><a href="#" onclick="app' + menu.code + '.submit();return false;">' + menu.name + '</a>');
	                            //�������ŵ�����������
						    	mainMenuHtml.push('<form id="app' + menu.code + '" name="app' + menu.code + '" method="post" action="' + menu.url + '" style="display:none">');
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
					    	//BOϵͳ�����¼			    	
					        }else if (menu.sign == "BOZHCX"){
					            //��Ҫʵ��----------------------------------
					        //��������ҵ��ϵͳ
					        }else {
	                            mainMenuHtml.push('<li><a href="#" onclick="app' + menu.code + '.submit();return false;">' + menu.name + '</a>');
						    	// �������ŵ������ύ
						    	mainMenuHtml.push('<form id="app' + menu.code + '" name="app' + menu.code + '" method="post" action="' + menu.url + '" target="_blank" style="display:none">');
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
                            mainMenuHtml.push('<li><a href="javascript:loadAppcaller();AppCaller.callApp(\'');
                        //��������csҵ��ϵͳ
                        }else {
                            mainMenuHtml.push('<li><a href="javascript:loadAppcaller();AppCaller.callHqApp(\'');
                        }
                        //ҵ��ϵͳ��ʶ
                        mainMenuHtml.push(menu.sign + '\',\'');
	                    //�洢ҵ��ϵͳ��Ӧ���ݿ��б���Ϣ
	                    var dbs = {};
	                    //���ݿ��ѯ��������
	                    var dbsConfig = {};
	                    //ҵ��ϵͳ����
	                    dbsConfig.programCode = menu.code;
	                    //�������
	                    dbsConfig.year = config.year;
	                    //��ѯҵ��ϵͳ��Ӧ���ݿ���Ϣ
                        Ext.lt.RCP.server('defaultCommonService', "getDbConfig",  dbsConfig, function (resp) {
                            dbs = resp;
                        });
	                    //�洢ҵ��ϵͳ��Ӧ��ϵͳ�б���Ϣ
	                    var subPrograms = {};
	                    //��ѯҵ��ϵͳ��Ӧ��ϵͳ��Ϣ
                        Ext.lt.RCP.server('defaultCommonService', "getSubPrograms",  menu.code, function (resp) {
                            subPrograms = resp;
                        });
                        //�ж�����ǲ���Ԥ���ϵͳ����Ҳ��exp
                        if(menu.sign = "expxtgl"){
                            //�û�����
                        	mainMenuHtml.push('|exp|' + config.userCode.toLowerCase());
                        //ָ��ϵͳϵͳ����
                        }else if(menu.sign == "indisys"){
                        	mainMenuHtml.push('|indi|' + config.userCode.toLowerCase());
                        //��������ҵ��ϵͳ
                        }else{
                        	mainMenuHtml.push('|' + menu.sign + '|' + config.userCode.toLowerCase());
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
						mainMenuHtml.push('\');">' + menu.name + '</a>');
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
											 menudiv.push('<a href="javascript:loadAppcaller();AppCaller.callApp(\'');
				                        }else{
											 menudiv.push('<a href="javascript:loadAppcaller();AppCaller.callHqApp(\'');
				                        }
										 mainMenuHtml.push(program.getSign() + '\',\'');
										 //�ж�����ǲ���Ԥ���ϵͳ����Ҳ��exp
										 if(menu.sign == "expxtgl"){
                        					menudiv.push('|exp|' + config.userCode.toLowerCase());
                        				//�����ָ��ϵͳ��ϵͳ����
                        				}else if(menu.sign == "indisys"){
                        					menudiv.push('|indi|' + config.userCode.toLowerCase());
                        				}else{
                        					menudiv.push('|' + menu.sign + '|' + config.userCode.toLowerCase());
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
										menudiv.push('\');">');
									 }
									 //���ݿ�����
									 menudiv.push(db.dbname);
									 //�����������ϵͳ�����ƴװ
									 if(subPrograms.length == 0){
									 	menudiv.push('</a>');
									 }
									 menudiv.push('</div>');
									 //���������ϵͳ
									 for(var h = 0; h < subprograms.length; h++){ 
									     //��ϵͳ����
									     var subprogram = subprograms[h];
										 menudiv.push('<div class="divline" nowrap>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:loadAppcaller();AppCaller.callHqApp(\'');
										 //ҵ��ϵͳ��ʶ
										 menudiv.push(menu.sign + '\',\'');
										 //�ж�����ǲ���Ԥ���ϵͳ����Ҳ��exp
										 if(menu.sign == "expxtgl"){
                        					menudiv.push('|exp|' + config.userCode.toLowerCase());
                        				 //ָ��ϵͳϵͳ����
                        				 }else if(menu.sign == "indisys"){
                        					 menudiv.push('|indi|' + config.userCode.toLowerCase());
                        				 }else{
                        					 menudiv.push('|' + subprogram.sign + '|' + config.userCode.toLowerCase());
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
	                     	mainMenuHtml.push('<li><a href="javascript:yszxxt1(\'');
	                     	//ϵͳ��ʶ
	                     	mainMenuHtml.push(menu.sign + '\',\'');
	                     	//�û�����+sessionID
					        mainMenuHtml.push('uid=' + config.userCode + ' sid=' + config.session + 'LT\'');
	                     	mainMenuHtml.push(');"> ' + menu.name + '</a>');
							mainMenuHtml.push('��</li>');
	                     }
	                     if(menu.sign == "yszxxt2"){
	                     	mainMenuHtml.push('<li><a href="javascript:yszxxt2(\'');
	                     	//ϵͳ��ʶ
	                     	mainMenuHtml.push(menu.sign + '\',\'');
	                     	//�û�����+sessionID
					        mainMenuHtml.push('uid=' + config.userCode + ' sid=' + config.session + 'LT\'');
	                     	mainMenuHtml.push(');"> ' + menu.name + '</a>');
							mainMenuHtml.push('��</li>');
	                     }
	                     if(menu.sign == "jzzfdw"){
	                     	mainMenuHtml.push('<li><a href="javascript:jzzfdw(\'');
	                     	//ϵͳ��ʶ
	                     	mainMenuHtml.push(menu.sign + '\',\'');
	                     	//�û�����+sessionID
					        mainMenuHtml.push('uid=' + config.userCode + ' sid=' + config.session + 'LT\'');
	                     	mainMenuHtml.push(');"> ' + menu.name + '</a>');
							mainMenuHtml.push('��</li>');
	                     }
	                     if(menu.sign == "gwkzf"){
	                        mainMenuHtml.push('<li><a href="javascript:gwkzf(\'');
	                     	//ϵͳ��ʶ
	                     	mainMenuHtml.push(menu.sign + '\',\'');
	                     	//�û�����+sessionID
					        mainMenuHtml.push('uid=' + config.userCode + ' sid=' + config.session + 'LT\'');
	                     	mainMenuHtml.push(');"> ' + menu.name + '</a>');
							mainMenuHtml.push('��</li>');
	                     }if(menu.sign == "jzzfdws"){
	                     	 mainMenuHtml.push('<li><a href="javascript:jzzfdws(\'');
	                     	//ϵͳ��ʶ
	                     	mainMenuHtml.push(menu.sign + '\',\'');
	                     	//�û�����+sessionID
					        mainMenuHtml.push('uid=' + config.userCode + ' sid=' + config.session + 'LT\'');
	                     	mainMenuHtml.push(');"> ' + menu.name + '</a>');
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
		                            mainMenuHtml.push('<li><a href="javascript:loadAppcaller();AppCaller.callApp(\'');
		                            mainMenuHtml.push(menu.sign + '\',\'');
				                    mainMenuHtml.push('uid=' + config.userCode + ' sid=' + config.session + 'LT');
									for(var j = 0; j < menu.parameters.length; j++){
									    mainMenuHtml.push(' ');
		                                mainMenuHtml.push(menu.parameters[j].parametername + '=' + menu.parameters[j].parametervalue);
									}
									mainMenuHtml.push('\');"> ' + menu.name + '</a>');
									mainMenuHtml.push('��</li>');
							//����ҵ��ϵͳ
				            }else {
		                            mainMenuHtml.push('<li><a href="javascript:loadAppcaller();AppCaller.callApp(\'');
		                            mainMenuHtml.push(menu.sign + '\',\'');
				                    mainMenuHtml.push('uid=' + config.userCode + ' sid=' + config.session);
									for(var j = 0; j < menu.parameters.length; j++){
									    mainMenuHtml.push(' ');
		                                mainMenuHtml.push(menu.parameters[j].parametername + '=' + menu.parameters[j].parametervalue);
									}
									mainMenuHtml.push('\');"> ' + menu.name + '</a>');
									mainMenuHtml.push('��</li>');
				            }
	                }
	            
	            } //CSҵ��ϵͳ����BSҵ��ϵͳ
	        } //һ�廯�˵����ǽ���˵�
	    } //ѭ���������в˵�
	    if(cscount>0){
	    	mainMenuHtml.push('<li><a href="/common/applocation.do"> ҵ������ַ����</a>��</li>');
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


		var menuPanel = new Ext.Panel({
			id:"defaultId", 
			layout:'fit',
			border:false,
			html:mainMenuHtml.join('')
		});
	/*
		var menuPanel=new function(){
			var cmp;
			this.draw=function(el){
				el.innerHTML=mainMenuHtml.join('');
				cmp=el.firstChild;
			}
			this.resize=function(w,h){
				cmp.style.width=w+'px'
				cmp.style.height=h+'px'
			}
		}
	*/
		return menuPanel;
	};
	
	
	// �����Ż����ʵ��Ifmisϵͳ2.2���
	this.portal22=function(servers,config){
	    //Ext.lt.portal.component.login.config=config;
	    Ext.lt.portal.component.ifmis.config=config;
	    var portalHtml=[Ext.lt.portal.component.ifmis.pendingTaskShow(config),Ext.lt.portal.component.ifmis.qrgRightShow(config)];

		/*
			var logoPanel = new Ext.Panel({
				id:"defaultId", 
				layout:'fit',
				border:false,
				html:logoHtml.join('')
			});
		*/
	    var portalPanel=new function(){
		    var cmp;
		    this.draw=function(el){
				el.innerHTML=portalHtml.join('');
				cmp=el.firstChild;
			}
			this.resize=function(w,h){
				//resizeʱ�ı����div�Ŀ��
				var tempwidth=w-(w/100)*3-483;
				document.getElementById('default_center').style.width=tempwidth;
				//cmp.style.width=w+'px'
				//cmp.style.height=h+'px'
			}
		}
		return portalPanel;
    }
};
//**********************************************Ext.lt.portal.component.ifmis  ����****************************************************************
window.onload=function(){
	var cfg = Ext.lt.portal.component.login.config;
	if(cfg.sxindexjsp!="31"){
	if(cfg.isshowtask==null||cfg.isshowtask==0){
		var str = Ext.lt.portal.component.login.pendingTaskShowAfter(cfg);
		document.getElementById("default_middle_simple").innerHTML = str;
	}
	}else{
		document.body.style.cssText="margin:0; padding:0;background:#FFF; overflow-x:hidden;";	
	}
}

//갼��� 2011-11-30 BUG-33308 �޸Ŀ�ʼ ���Ԥ��ȫ�����水ť�¼�
Ext.lt.portal.component.login.openPost = function (){
		var reps=Ext.lt.portal.component.login.config.postList;		
		var postHtml = [];	
		postHtml.push('<div style="text-align:center; background-color:#fff;  line-height:25px;width:787px; height:320px; overflow-y:scroll;">');
		postHtml.push('<table width=96% border=0 cellspacing="0" cellpadding="0">');
		postHtml.push('<tr><td align="left" class="title_orange" style="padding-left:20px;">�������</td>');
		postHtml.push('<td width="30%" align="left" class="title_orange">����ʱ��</td></tr>');
		for(var i = 0; i < reps.length; i++){				
			postHtml.push('<tr><td align="left" style="overflow:hidden;padding-left:20px;border-bottom:1px #ccc dotted;"><img src="' + _ROOT_PATH_ + '/images/done_btn/news.gif" />');
			postHtml.push('<a href="#" onclick=\'preview("' + Ext.lt.portal.component.login.config.contextpath + '","' + reps[i].id + '")\'>');	
			//postHtml.push('<a href="#" onclick=\'preview("","' + reps[i].id + '")\'>');	
			postHtml.push(reps[i].posttitle);
			postHtml.push('</a></td><td align="left" style="border-bottom:1px #ccc dotted;">');
			postHtml.push('('+reps[i].createtime+')');
			postHtml.push('</td></tr>');			
		}						
		postHtml.push('</table></div>');
		//document.write(postHtml.join(''));
		
	var win =new Ext.Window({        
			id:"postid",        
		    width : 800,
			//height : 380,			
			title : "ȫ������",
			resizable : false,
			buttonAlign :'center',
			buttons :[{
					text:"�ر�",
					pressed:true, 
					handler:function () {
						win.close();
				}
			}],
			html:postHtml.join('')
	});	
	win.show();
}
//갼��� 2011-11-30 BUG-33308 �޸Ľ���****************************************************************************************
//����ǿ���޸������
Ext.lt.portal.component.login.showmodpasswordwin = function (){
	var modpassword = ['<div id="popPage"><div id="shenhe_title">'
	,'<div id="shenhe_title_middle"></div></div>'
	,'<div id="pop_inner2">  <br/><div id="table_list_title"><ul><li class="top"><div><font size="2">�����޸�</font><font color="red" size="2">(��������6-16����ĸ��������ɣ�����ȫ������)</font></div></li></ul></div><div id="edit_table" style="padding-left:0;">'
	,'<form name="form1" id="form1" action="/template/commons/modifypwd.do" method="post">'
	,'<table width="100%" border="0" cellpadding="0" cellspacing="0"> <tr>'
	,'<th>������<span><font color="red">*</font></span></th>'
	,'<td><input type="password" name="oldpwd" /></td>'
	,'</tr><tr>'
	,'<th>������<span><font color="red">*</font></span></th> <td><input type="password" name="newpwd" /></td> </tr>'
	,'<tr><th>ȷ������<span><font color="red">*</font></span></th> <td><input type="password" name="newpwd1" /></td> </tr>'
	,'<tr style="display:none;">'
	,'<td style="display:none"><input type="hidden" name="commonCode" value ="<%=commonCode %>"></td>'
	,'<td style="display:none"><input type="hidden" name="ui_logo_area" value ="<%=ui_logo_area %>"></td></tr></table>'
	,'</form>'
	,'</div></div>'
	,'<center>'
	,'<input type="button" class="button_style" onmouseover="this.className=\'OverBtn\'" onmouseout="this.className=\'button_style\'" onmousedown="this.className=\'down\'" value="ȷ��" onclick="modpwd()"/>'
	//,'<input type="button" class="button_style" onmouseover="this.className=\'OverBtn\'" onmouseout="this.className=\'button_style\'" onmousedown="this.className=\'down\'" value="�ر�" onclick="modpasswordwin.close();"/>'
	,' </div>'
	]

	var modpasswordwin =new Ext.Window({        
			id:"modpasswordwin",        
		    width : 500,
			//height : 380,			
			title : "�����޸�",
			resizable : false,
			autoHeight:true,
			buttonAlign :'center',
			closable:false,
			/*buttons :[{
					text:"�ر�",
					pressed:true, 
					handler:function () {
						modpasswordwin.close();
				}
			}],
			*/
			html:modpassword.join('')
	});	
	modpasswordwin.on('afterlayout',function(win){
		Ext.getCmp("defaultId").getEl().mask();
	});
	modpasswordwin.show();
}

function modpwd(){
	//var commonCode_tem = Trim(document.form1.commonCode.value);
	//var ui_logo_area_tem = Trim(document.form1.ui_logo_area.value);
	if(document.form1.oldpwd==null||document.form1.oldpwd.value==""){	
		alert("����дԭ������");
		return false;
	}
	if(document.form1.newpwd==null||document.form1.newpwd.value==""){
		alert("����д������");
		return false;
	}
	if(document.form1.newpwd.value.length<6){
		alert("���볤������6λ");
		document.form1.newpwd.value ="";
		document.form1.newpwd1.value ="";
		return false;
	}
	if(document.form1.newpwd.value.length>16){
		alert("���볤�Ȳ��ܴ���16λ");
		document.form1.newpwd.value ="";
		document.form1.newpwd1.value ="";
		return false;
	}
	if(document.form1.newpwd1==null||document.form1.newpwd1.value==""){
		alert("����дȷ������");
		return false;
	}
	if(document.form1.newpwd1.value != document.form1.newpwd.value){
		alert("��������������벻һ��");
		return false;
	}
	//if(ui_logo_area_tem == 'chongqing'){
	var password = document.form1.newpwd.value;
	var reg = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{2,})$/;	
	var r = reg.test(password);
	if(!r){
		alert("�����������ֺ���ĸ��ɵ�����!");
		document.form1.newpwd.value ="";
		document.form1.newpwd1.value ="";
		password = document.form1.newpwd.focus();
		return false;
	}	
	//}
	var para={};
	para.oldpwd = document.form1.oldpwd.value;
	para.newpwd = document.form1.newpwd.value;
  	Ext.lt.RCP.server('defaultCommonService', "modifyPassword",  para, function (resp) {
  				if(resp=="1"){
  					alert("�޸ĳɹ�");
  					Ext.getCmp('modpasswordwin').close();
  					Ext.getCmp("defaultId").getEl().unmask();
  				}else{
  					alert(resp);
  				}
    });
    //document.form1.submit();
}
//�����ʼ�ϵͳ�����������ӵ���ϸ  ��ȡ��Ӧ����sid��mid
function clickTaskEmail(){
	var para_login = {};
	var config = Ext.lt.portal.component.menu.config;
	var menu = config.totalmenus;
	var face = "XT3";
	for(var j = 0; j < menu.length; j++){
		if("xmemail"==menu[j].sign){
			if("face"==menu[j].parameter.parametername){
				face = menu[j].parameter.parametervalue;
			}
			break;  
		}
	}
	para_login.user_at_domain = config.cardCode;
	para_login.attrs = face;
	para_login.menuwebserviece = config.webservice;
	Ext.lt.RCP.server('defaultCommonService', "getSidMid",  para_login, function (resp) {   
		var code = resp.code;
		var message = resp.message;
		var result = resp.result;
		var mid = resp.mid;
		$('appemail').sid.value = result;
		$('appemail').mid.value = mid;		
    	$('appemail').submit();
	});	
}
//�����ʾ����
function ClickGg(){
    document.getElementById("sxgg").style.display = 'block';
	document.getElementById("sxbw").style.display = 'none';

}
var s=0;
//�����ʾ����
function ClickBw(){
	document.getElementById("sxbw").style.display = 'block';
	document.getElementById("sxgg").style.display = 'none';	
	if(s==0){
	var p=Ext.lt.portal.component.calendar.IfmisDefCalendar();
	p.render(document.getElementById("sxcalendar"));
	s++;
	}
	document.body.style.cssText="margin:0; padding:0;background:#FFF;overflow-x:hidden;";	
}
//�����ʾ��������
function ClickBwNew(){
	document.getElementById("fitmodedemo1").style.display = 'block';
	var wind=new Ext.lt.window({
		title:'��������¼',
		className:'wind7',
		pop:'true',
		w:'500',
		h:'240',
		mark:'true'});
	wind.draw(fitmodedemo1);
	sxqxbtn.onclick=function(){
		wind.close();
	}	
	document.getElementById("bwdetail").value="";
	document.getElementById("sxgg").style.display = 'none';
	
}
//�������� ����
function SaveBw(bwtime){
	var bwdetail = document.getElementById("bwdetail").value;
	if(bwdetail==""){
		alert("�������ݲ���Ϊ��!");
		return false;
	}else{
	var para = {};
	para.bwdetail=bwdetail;
	para.bwtime = bwtime;
	para.bwsxhidden = document.getElementById("bwsxhidden").value;
	para.no = document.getElementById("bwsxno").value;
	Ext.lt.RCP.server('defaultCommonService', "saveBw",  para, function (resp) {   
		if(resp.ret=="0"){
			alert("����ʧ��!");
			return false;
		}else{
			alert("����ɹ�!");
			sxqxbtn.onclick();
			var defaultHTML=[];
			var bwTimeList = resp.bwTimeList;
		        var bwList = resp.bwList;
		        for(var b=0;b<bwTimeList.length;b++){
		        	var time = bwTimeList[b].TIME;
		        	defaultHTML.push('<div class="bw_datetype">'+time+'</div>');
		        	for(var w=0;w<bwList.length;w++){
		        		if(time==bwList[w].BWTIME){
		        			defaultHTML.push(' <p class="bwitems"><a href="#" onclick="UpdateBw(\''+bwList[w].NO+'\',\''+bwList[w].BWDETAIL+'\',\''+systemdate+'\');">'+bwList[w].BWDETAIL+'</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onclick="DeleteBw(\''+bwList[w].NO+'\');">ɾ��</a></p>');
		        		}
		        	}
		        }	
		    document.getElementById("contentsbw").innerHTML = defaultHTML.join('');
		}
	});	
	}
}
//ɾ������
function DeleteBw(no){
	var para = {};
	para.no=no;
	Ext.lt.RCP.server('defaultCommonService', "deleteBw",  para, function (resp) {   
		if(resp.ret=="0"){
			alert("ɾ��ʧ��!");
			return false;
		}else{
			alert("ɾ���ɹ�!");
			var defaultHTML=[];
			var bwTimeList = resp.bwTimeList;
		        var bwList = resp.bwList;
		        for(var b=0;b<bwTimeList.length;b++){
		        	var time = bwTimeList[b].TIME;
		        	defaultHTML.push('<div class="bw_datetype">'+time+'</div>');
		        	for(var w=0;w<bwList.length;w++){
		        		if(time==bwList[w].BWTIME){
		        			defaultHTML.push(' <p class="bwitems"><a href="#" onclick="UpdateBw(\''+bwList[w].NO+'\',\''+bwList[w].BWDETAIL+'\',\''+systemdate+'\');">'+bwList[w].BWDETAIL+'</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onclick="DeleteBw(\''+bwList[w].NO+'\');">ɾ��</a></p>');
		        		}
		        	}
		        }	
		    document.getElementById("contentsbw").innerHTML = defaultHTML.join('');
		}
	});	
	
}
//����¼����
function UpdateBw(no,bwdetail,bwtime){
	document.getElementById("fitmodedemo1").style.display = 'block';
	var wind=new Ext.lt.window({title:'�޸ı���¼',className:'wind7',pop:'true',w:'500',h:'240',mark:'true'});
	wind.draw(fitmodedemo1);
	sxqxbtn.onclick=function(){
		wind.close();
	}	
	document.getElementById("bwdetail").value=bwdetail;	
	document.getElementById("bwsxhidden").value="1";
	document.getElementById("bwsxno").value=no;
}
//������˵���������Ӳ˵�
function querysx(obj,id,sign){
	if(null!=document.getElementById(id)){
	if(document.getElementById(id).style.display == 'none'){
		document.getElementById(id).style.display = 'block';
		document.getElementById(id).className = 'accordion_child';
		for(var i=0;i<9;i++){
			var ids = "test"+i+"-content";
			if(document.getElementById(ids)&&id!=ids){
				if(document.getElementById(ids).style.display == 'block'){					
					document.getElementById(ids).style.display= 'none';
			}
		}
		}
	}else{
		document.getElementById(id).style.display= 'none';
	}
	}
	
}
var timeVal = window.setInterval(timeUpdate, 3000);

//ʱ�䶨ʱ����
function timeUpdate(){
	if(null==document.getElementById("timeapm")){
		clearInterval(timeVal);
	}else{
	var para = {};
	Ext.lt.RCP.server('defaultCommonService', "timeUpdate",  para, function (resp) {   
		var time = resp.time;
		var apm = resp.apm;		
	document.getElementById("timeapm").innerHTML='<span class="time">'+time+'</span><span class="ap">'+apm+'</span>';
	});	
	}
}

function bclick(id){
	var ids = "app"+id;
	document.getElementById(ids).submit();
	return false;
}