// ����Portal�����ռ�
if(Ext.lt.portal==null) Ext.lt.portal = {component:{}};
if (Ext.lt.portal.component == null) {
	Ext.lt.portal.component = {};
}

/**ϵͳ���˵�չʾ����*/
Ext.lt.portal.component.ifmistree = function (config, service) {
	var ifmistree={};
	var _treedata = config.treedata;// Ext.lt.RCP.asynserver('framework_topmenu', 'getUserMenus',menuID);
	var _submenuid = config.submenuid;
	var mainmenuid = config.mainmenuid;
	var treerootmenujson={menuid:mainmenuid,name:config.mainmenuname};//todo
	
	function leftTree(){
		try{
			Ext.lt.layout.doLayout();
		}catch(e){}
		qmenutree = new Ext.lt.Qtree({
			data:_treedata, 
			rootNode:treerootmenujson, 
			showRootNode:treerootmenujson != null, 
			outformart:'<a  href="#url" onclick="return clickLeftTree(this,'+mainmenuid+');" dataid="#menuid"  title="#name">#name</a>', 
			values:[_submenuid],
			clickexpand:true,
			classname:'ifmissubmenu',
			field:{id:"menuid", level:"levelno", sid:"parentid", name:"name"}
			,on:{
				'nodeclick':function(tree,param){
				}
			}
		}); 
		return qmenutree;
	}
	
	ifmistree.draw=function(el){
		if(el!=null){
			var qtree = leftTree();
			qtree.draw(el);
		}
	}
	ifmistree.resize=function(w,h){
	}
	return ifmistree;
}

//��ֹ������ת
function stopDefaultHref(e) { 
    if (e && e.preventDefault) 
        e.preventDefault(); 
    else 
        window.event.returnValue = false; 
    return false; 
} 
//���˵�����¼�
function clickLeftTree(el,mainmenuid){
	var target = el.href;
	if (isLinked(target)) {
		if(target.indexOf("javascript:openReport(")>=0){
			//����Ǵ���ͼ��������ֹ<a>������ת
			stopDefaultHref(el);
			target = target.substring(22,target.indexOf(")"));
			openReport(target);
		}else if(target.indexOf("/longtu/report")>=0&&reportexturl!=null){
			//����Ǵ���ͼ��������ֹ<a>������ת
			stopDefaultHref(el);
			target += ((target.indexOf("?")==-1)?"?":"&")+Base64.decode(reportexturl);
			try{
				if(document.all.ltrptocx==undefined||document.all.ltrptocx.object==null){ // ���ϵͳ������౨����Ȳ˵���ж�ltrpt�Ƿ���ڣ��������������Զ���װ�򵯳�������ʾ
					Ext.lt.ifmis.activex.loadLTReportOcx();
				}
				ltrptocx.openJnlpProgram('RPT',
			            REPORT_VERSION,
						ROOT_PATH+'/common/jre6.zip',
						target,
						target.substring(target.indexOf('?')+1));	
			 }catch(ex){
				 alert("����ltrptocx�쳣��"+ex);	
			 }
    	}else{
			var v=qmenutree.getSelected()
			var open=true;
			if(typeof(openmenubefore)=="function"){
				open = openmenubefore();
			}
			// ����˸��ڵ�
			if(el.dataid==mainmenuid){
				open=false;
			}
			return open;
    	}
    }
}

/**ϵͳ���˵�չʾ����*/
Ext.lt.portal.component.ifmismenu = function (config, service) {
	var ifmismenu={};
	ifmismenu.cfg=config;
	ifmismenu.cfg.el=null;
	var topmenu;
	_mainmenu = "";
	try{
		ifmismenu.fn=eval(config.type);
	}catch(e){
		ifmismenu.fn=blue;
	}
	if(ifmismenu.fn==null){
		ifmismenu.fn=blue;
	}
	
	ifmismenu.draw=function(div){
		if(this.cfg.el!=null){
			return ;
		}
		this.cfg.el=div;
		if(this.cfg.el!=null){
			this.fn(this.cfg);
		}
	}
	ifmismenu.resize=function(w,h){
	}

	function blue(config){
		config.el.innerHTML = mainMenuShow(config);
	}
	
	function green(config){
		var d = config.totalmenus.toArray();
		var reportexturl = config.reportexturl;
		//��������UKey��½��ε����ܵ����½������
		var ischeckUkey = config.portalIsCheckUkey;
		var userComObj = new Array();
		//�ж��û�������Ϣ�Ƿ���ڣ�����������޸�
		var userCompare = config.userCompare;
		if(userCompare!=null){
			 for(var j = 0; j < userCompare.length; j++){
	        	userComObj[userCompare[j].BUSIGN] = userCompare[j];
	         }
		}
		for(var i = 0;i < d.length;i ++){
			var menu = d[i];
			if(!menu.tjhqprogram){//�����һ�廯�˵�
				if(menu.menuid==41000){//�ܻ���ر���
					menu.click=function(topObj){
						var url = _ROOT_PATH_ + topObj.clientmodule+'?mainmenu=' + topObj.menuid;
		        		//window.open(url,"Detail","Scrollbars=no,Toolbar=no,Location=no,Direction=no,Resizeable=no,Width=1024,Height=768,top=0,left=0");
		        		window.open(url);
					}
					continue;
	        	}
				if(menu.isleaf==0&&menu.levelno==1){//����ǵ�����˵�����ȡmainmenuid
					menu.click=function(topObj){
						_mainmenu = topObj.menuid;
					}
					continue;
				}
				var target = menu.clientmodule;
				if(menu.isleaf == 0 || target==null){continue;}
				menu.click=function(topObj){
					if (isLinked(target)) {
			    		if(target.indexOf("javascript:openReport(")>=0){
			    			target = target.substring(22,target.indexOf(")"));
			    			openReport(target);
			    		}else if(target.indexOf("/longtu/report")>=0&&reportexturl!=null){
							target += ((target.indexOf("?")==-1)?"?":"&")+Base64.decode(reportexturl);
							try{
								if(document.all.ltrptocx==undefined||document.all.ltrptocx.object==null){ // ���ϵͳ������౨����Ȳ˵���ж�ltrpt�Ƿ���ڣ��������������Զ���װ�򵯳�������ʾ
									Ext.lt.ifmis.activex.loadLTReportOcx();
								}
								ltrptocx.openJnlpProgram('RPT',
							            REPORT_VERSION,
										ROOT_PATH+'/common/jre6.zip',
										target,
										target.substring(target.indexOf('?')+1));	
							 }catch(ex){
								 alert("����ltrptocx�쳣��"+ex);	
							 }
				    	}else{
			        		var clienturl = topObj.clientmodule;
			        		if (clienturl.indexOf('?') == -1) {
				            	clienturl += "?isMenu=yes";
				            }else{
				            	clienturl += "&isMenu=yes";
				            }
				            clienturl += "&mainmenu=" + _mainmenu+ "&submenu=" + topObj.menuid;
			        		window.location.href = _ROOT_PATH_ + clienturl ;
				    	}
				    }
				}
			}else{//����
				var promsg = "��ϵͳ��û�н��н��룬�޷����е����¼";
				menu.click=function(topObj){
					//���������¼ʱ�Ƿ���ukey����
					if(!isCheckUeyOutOrIn(ischeckUkey)){
						return;
					}
					//�ж��û�������Ϣ�Ƿ���ڣ�����������޸�
			        var comUcode = config.userCode;
					var comPassword = "";
			        if(userComObj[topObj.sign]){
			        	comUcode = userComObj[topObj.sign].BUCODE;
			        	if(userComObj[topObj.sign].BUPASSWORD != null){
			        	    comPassword = userComObj[topObj.sign].BUPASSWORD;
			            }
			        }
					if (topObj.type == 1){
						//�����¼�����õ�localhostת�ɷ����ַ
		            	var menurl = topObj.url;
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
		            		menurl = topObj.url;
		            	}
		            	
			            /**����ҵ��ϵͳ�����̽������֣�1��̫������ϵͳ 2����ͼϵͳ 4: ��ͬ�����һ�廯ϵͳ�˵� 5�����������ҵ��ϵͳ����϶��Լ������ĵ����¼�ؼ�  6��δʵ��ϵͳ��*/
		                if (topObj.tjhqprogram == 4){//��ʱ��ʵ�֣���֪���ĸ���������
		                }else if (topObj.tjhqprogram == 5){//������������ҵ��ϵͳ����϶��Լ������ĵ����¼�ؼ�		                                       
		                    //�̶�ϵͳ��ʶ������ĳϵͳ��
		                    if (topObj.sign == "cshxxt"){
		                        //����Ϊ�û�������sessionId
		                    	cshxxt(topObj.sign ,"uid=" + config.userCode + " sid=" + config.session + "LT");
		                    }
		                    if(topObj.sign == "jiuqizichan"){//�����ʲ�
			        			special(comUcode,comPassword,menurl);
			        		 }
		                }else if (topObj.tjhqprogram == 6){//δʵ��ҵ��ϵͳ
		                   alert(promsg);
		                }else if (topObj.tjhqprogram == 7){ //ASPϵͳ  
		                	var multiAreaForm = document.createElement('FORM');
			        		multiAreaForm.method = "get";
			        		multiAreaForm.action = menurl;
			        		multiAreaForm.target = "_blank";
			        		multiAreaForm.style.cssText = "display:none";
			        		document.appendChild(multiAreaForm);
			        		//ѭ��ϵͳ����
					    	for(var j = 0; j < topObj.parameters.length; j++){
					    		var parameter = topObj.parameters[j];
					    		var newElement = document.createElement("input");
							    newElement.setAttribute("name",parameter.parametername);
							    newElement.setAttribute("type","text");
							    newElement.setAttribute("value",parameter.parametervalue);
							    multiAreaForm.appendChild(newElement);
					    	}
					    	var newElement1 = document.createElement("input");
					    	newElement1.setAttribute("name","uid");
					    	newElement1.setAttribute("type","text");
					    	newElement1.setAttribute("value",config.userCode);
						    multiAreaForm.appendChild(newElement1);
						    var newElement2 = document.createElement("input");
						    newElement2.setAttribute("name","sid");
						    newElement2.setAttribute("type","text");
						    newElement2.setAttribute("value",config.session);
						    multiAreaForm.appendChild(newElement2);
						    var newElement3 = document.createElement("input");
						    newElement3.setAttribute("name","year");
						    newElement3.setAttribute("type","text");
						    newElement3.setAttribute("value",config.year);
						    multiAreaForm.appendChild(newElement3);
						    multiAreaForm.submit();
		                }else {
		                    //����hosturlΪ��Ϊ�յ�ҵ��ϵͳ���������ʲô�ã�������ʱ��ʵ��
		                    if (topObj.hosturl != null){
		                        //�ж�ҵ��ϵͳ��ַ���Ż������ַ�Ƿ�һ��
		                        if (topObj.hosturl == _ROOT_PATH_){
		                        }
		                    //����hosturlΪ�յ�ҵ��ϵͳ���˴�Ϊ������ҵ��ϵͳ����
		                    }else{ //ҵ��ϵͳ������û�֧��3.0����������ϵͳ��ʵ���˻�ϵͳ����ҳ�治��_blank
		                        if (topObj.sign == "YYJZZF3.0" || topObj.sign == "nftt" || topObj.sign == "account"){
		                        	var multiAreaForm = document.createElement('FORM');
					        		multiAreaForm.method = "post";
					        		multiAreaForm.action = menurl;
					        		multiAreaForm.target = "_blank";
					        		multiAreaForm.style.cssText = "display:none";
					        		document.appendChild(multiAreaForm);
					        		//ѭ��ϵͳ����
							    	for(var j = 0; j < topObj.parameters.length; j++){
							    		var parameter = topObj.parameters[j];
							    		var newElement = document.createElement("input");
									    newElement.setAttribute("name",parameter.parametername);
									    newElement.setAttribute("type","text");
									    newElement.setAttribute("value",parameter.parametervalue);
									    multiAreaForm.appendChild(newElement);
							    	}
							    	var newElement1 = document.createElement("input");
							    	newElement1.setAttribute("name","uid");
							    	newElement1.setAttribute("type","text");
							    	newElement1.setAttribute("value",comUcode);
								    multiAreaForm.appendChild(newElement1);
								    var newElement2 = document.createElement("input");
								    newElement2.setAttribute("name","sid");
								    newElement2.setAttribute("type","text");
								    newElement2.setAttribute("value",config.session);
								    multiAreaForm.appendChild(newElement2);
								    var newElement3 = document.createElement("input");
								    newElement3.setAttribute("name","year");
								    newElement3.setAttribute("type","text");
								    newElement3.setAttribute("value",config.year);
								    multiAreaForm.appendChild(newElement3);
								    multiAreaForm.submit();
						        }else if (topObj.sign == "BOZHCX"){//BOϵͳ�����¼
						            //��Ҫʵ��----------------------------------
						        }else if(topObj.sign == "xzd"){//�������д󵥵��¼
						        	var multiAreaForm = document.createElement('FORM');
					        		multiAreaForm.method = "post";
					        		multiAreaForm.action = menurl;
					        		multiAreaForm.id = "app"+topObj.code;
					        		multiAreaForm.name = "app"+topObj.code;
					        		multiAreaForm.target = "_blank";
					        		multiAreaForm.style.cssText = "display:none";
					        		document.appendChild(multiAreaForm);
					        		var newElement1 = document.createElement("input");
							    	newElement1.setAttribute("name","uid");
							    	newElement1.setAttribute("type","text");
							    	newElement1.setAttribute("value",config.userCode);
								    multiAreaForm.appendChild(newElement1);
								    var newElement2 = document.createElement("input");
								    newElement2.setAttribute("name","name");
								    newElement2.setAttribute("type","text");
								    newElement2.setAttribute("value",config.name);
								    multiAreaForm.appendChild(newElement2);
								    multiAreaForm.submit();
						        }else {//��������ҵ��ϵͳ
					        		var multiAreaForm = document.createElement('FORM');
					        		multiAreaForm.method = "post";
					        		multiAreaForm.action = menurl;
					        		multiAreaForm.target = "_blank";
					        		multiAreaForm.style.cssText = "display:none";
					        		document.appendChild(multiAreaForm);
					        		//ѭ��ϵͳ����
							    	for(var j = 0; j < topObj.parameters.length; j++){
							    		var parameter = topObj.parameters[j];
							    		var newElement = document.createElement("input");
									    newElement.setAttribute("name",parameter.parametername);
									    newElement.setAttribute("type","text");
									    newElement.setAttribute("value",parameter.parametervalue);
									    multiAreaForm.appendChild(newElement);
							    	}
							    	var newElement1 = document.createElement("input");
							    	newElement1.setAttribute("name","uid");
							    	newElement1.setAttribute("type","text");
							    	newElement1.setAttribute("value",comUcode);
								    multiAreaForm.appendChild(newElement1);
								    var newElement2 = document.createElement("input");
								    newElement2.setAttribute("name","sid");
								    newElement2.setAttribute("type","text");
								    newElement2.setAttribute("value",config.session);
								    multiAreaForm.appendChild(newElement2);
								    var newElement3 = document.createElement("input");
								    newElement3.setAttribute("name","year");
								    newElement3.setAttribute("type","text");
								    newElement3.setAttribute("value",config.year);
								    multiAreaForm.appendChild(newElement3);
								    multiAreaForm.submit();
						        }
		                    }
		                }
		            //csϵͳ
				    }else if (topObj.type == 2){
				    	loadAppcaller();
		                //̫������ҵ��ϵͳ
		                if (topObj.tjhqprogram == 1){
		                	//�洢ҵ��ϵͳ��Ӧ���ݿ��б���Ϣ
		                    var dbs = {};
		                    var csParaMap = config.csParaMap;
		                    if(csParaMap!=undefined){
		                        for(var m = 0; m < csParaMap.length; m ++){
		                        	if(csParaMap[m].menucode==topObj.code){
		                        		dbs = csParaMap[m].dbsList;
		                        		subPrograms = csParaMap[m].subList;
		                        	}
		                        }
		                    } 
		                	var arr = []; 
		                	//�ж�����ǲ���Ԥ���ϵͳ����Ҳ��exp
		                    if(topObj.sign == "expxtgl"){
		                        //�û�����
		                    	arr.push('|exp|' + comUcode.toLowerCase());
		                    //ָ��ϵͳϵͳ����
		                    }else if(topObj.sign == "indisys"){
		                    	arr.push('|indi|' + comUcode.toLowerCase());
		                    //��������ҵ��ϵͳ
		                    }else{
		                    	arr.push('|' + topObj.sign + '|' + comUcode.toLowerCase());
		                    }
		                    //�������ϵͳ���������ݿ����������ϵͳ�������Ӳ�ͬ��ȵ����ݿ⣬Ĭ��ȡ��һ��
		                    if(dbs.length > 0){
		                        //ҵ��ϵͳ���ݿ����
		                    	var db = dbs[0];
		                    	arr.push('|' + db.dbstr);
		                    }
		                    //�Ƿ���ҪsessionID
		                    if(topObj.needsid ==1 ){
		                    	arr.push('|' + config.session);
							}
							//��װҵ��ϵͳ����
							for(var j = 0; j < topObj.parameters.length; j++){
								arr.push('|' + topObj.parameters[j].parametervalue);
							}
		                	//����Ԥ����Ƶ�λ��(efmdiv)�����������λ��(dfczdiv)
		                    if(topObj.sign == "efmdiv" || topObj.sign == "dfczdiv"){
		                    	//AppCaller.callApp(topObj.sign,arr.join(''));
		                    //��������csҵ��ϵͳ
		                    }else {
		                    	 //AppCaller.callHqApp(topObj.sign,arr.join(''));
		                    }
		                    
		                    //���ҵ��ϵͳ���ڶ������ݿ�����
							if(dbs.length>1){
							//
								//ѭ���������ݿ���Ϣ
							/*	for(var j = 0;j<dbs.length; j++){
								     var db = dbs[j];
								     alert(topObj.menuid);
								     topmenu.additem({id:topObj.menuid+j,name:db.dbname,code:'s',sid:topObj.menuid});
								}	
								//topmenu.reflash(); 
								*/
								return;
								
							    //�ڲ˵������һͼ�֧꣬���������¼��������º󵯳������������ѡ���
								mainMenuHtml.push('&nbsp;<IMG id="img' + topObj.code + '" alt="�л���" src="' + _ROOT_PATH_ + '/images/list.gif" style="margin-top:10px;cursor:pointer;" onmouseover="mvqMOv(\'img' + topObj.code + '\',\'panelDiv' + topObj.code + '\')";>');
								//�����˵���ʽdiv
								menudiv.push('<div id="panelDiv' + topObj.code + '" style="position:absolute;visibility:hidden; z-index:1000; WIDTH: 90px; BORDER-RIGHT: #8BA3DA 1px solid; PADDING-RIGHT: 12px;BORDER-TOP: #8BA3DA 1px solid; PADDING-LEFT: 12px; PADDING-BOTTOM: 12px; BORDER-LEFT: #8BA3DA 1px solid; PADDING-TOP: 12px;BORDER-BOTTOM: #8BA3DA 1px solid; BACKGROUND-COLOR: #FFFFFF" onmouseover="panelMOv(\'panelDiv' + topObj.code + '\');" onmouseout="panelMOu(\'panelDiv' + topObj.code + '\');">');
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
					                        if(topObj.sign == "efmdiv" || topObj.sign == "dfczdiv"){
												 menudiv.push('<a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){loadAppcaller();AppCaller.callApp(\'');
					                        }else{
												 menudiv.push('<a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){loadAppcaller();AppCaller.callHqApp(\'');
					                        }
					                        menudiv.push(topObj.sign + '\',\'');
											 //�ж�����ǲ���Ԥ���ϵͳ����Ҳ��exp
											 if(topObj.sign == "expxtgl"){
		                    					menudiv.push('|exp|' + comUcode.toLowerCase());
		                    				//�����ָ��ϵͳ��ϵͳ����
		                    				}else if(topObj.sign == "indisys"){
		                    					menudiv.push('|indi|' + comUcode.toLowerCase());
		                    				}else{
		                    					menudiv.push('|' + topObj.sign + '|' + comUcode.toLowerCase());
		                    				}
		                    				//���ݿ������Ϣ
			                        		menudiv.push('|' + db.dbstr);
			                        		//�Ƿ񴫵�sessionID
			                        		if(topObj.needsid == 1){
			                        		 	menudiv.push('|' + config.session);
			                        		}
											//��װҵ��ϵͳ����
											for(var p = 0; p < topObj.parameters.length; p++){
												menudiv.push('|' + topObj.parameters[p].parametervalue);
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
											 menudiv.push(topObj.sign + '\',\'');
											 //�ж�����ǲ���Ԥ���ϵͳ����Ҳ��exp
											 if(topObj.sign == "expxtgl"){
		                    					menudiv.push('|exp|' + comUcode.toLowerCase());
		                    				 //ָ��ϵͳϵͳ����
		                    				 }else if(topObj.sign == "indisys"){
		                    					 menudiv.push('|indi|' + comUcode.toLowerCase());
		                    				 }else{
		                    					 menudiv.push('|' + subprogram.sign + '|' + comUcode.toLowerCase());
		                    				 }
		                    				 //���ݿ����		 
			                        		 menudiv.push('|' + db.dbstr);
			                        		 //�����ҪsessionID
			                        		 if(topObj.needsid == 1){
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
	
						//�ж�TjhqprogramΪ5�ģ��ǵ����¿ؼ��ĵط���ƴ�ɵ����ӵ�ַ,����ĳϵͳ
		                }else if (topObj.tjhqprogram == 5){
		                     //����ϵͳ��ʶ�ж�
		                     if(topObj.sign == "yszxxt1"){
		                    	 yszxxt1(topObj.sign,'uid=' + config.userCode + ' sid=' + config.session + 'LT');
		                    	// yszxxt1(\''+topObj.sign + '\',\''+'uid=' + config.userCode + ' sid=' + config.session + 'LT\''');
		                     }
		                     if(topObj.sign == "yszxxt2"){
		                    	 yszxxt2(topObj.sign,'uid=' + config.userCode + ' sid=' + config.session + 'LT');
		                     }
		                     if(topObj.sign == "jzzfdw"){
		                    	 jzzfdw(topObj.sign,'uid=' + config.userCode + ' sid=' + config.session + 'LT');
		                     }
		                     if(topObj.sign == "gwkzf"){
		                    	 gwkzf(topObj.sign,'uid=' + config.userCode + ' sid=' + config.session + 'LT');
		                     }if(topObj.sign == "jzzfdws"){
		                    	 jzzfdws(topObj.sign,'uid=' + config.userCode + ' sid=' + config.session + 'LT');
		                     }
		                //δʵ��ϵͳ
		                }else if (topObj.tjhqprogram == 6){
		                	alert(promsg);
						//����csҵ��ϵͳ
		                }else {
	                        //��ͼƽ̨�ͻ���ϵͳ
	                        if(topObj.hosturl != null){
	                        	var arr = ['uid=' + comUcode + ' sid=' + config.session + 'LT']; 
	                        	for(var j = 0; j < topObj.parameters.length; j++){
	                        		arr.push(' ');
	                        		arr.push(topObj.parameters[j].parametername + '=' + topObj.parameters[j].parametervalue);
								}
	                        	AppCaller.callApp(topObj.sign,arr.join(''));
							//����ҵ��ϵͳ
				            }else {
	                        	var arr = ['uid=' + comUcode + ' sid=' + config.session + 'LT']; 
	                        	for(var j = 0; j < topObj.parameters.length; j++){
	                        		arr.push(' ');
	                        		arr.push(topObj.parameters[j].parametername + '=' + topObj.parameters[j].parametervalue);
								}
	                        	AppCaller.callApp(topObj.sign,arr.join(''));
				            }
		                }
		            }
				}
			}
		}	
		var getMainmenu = function(menuid){
			_mainmenu = menuid;
		}
		topmenu=new Ext.lt.topmenu({
			data:d,
			scroll:true,
			correction:1,
			showmenu:'onclick',
			className:'topmenu2',
			scroll:true,
			maxHeight:400,
			beforeshowmenu:getMainmenu,
			field:{id:'menuid',sid:'parentid',name:'name',code:'code'}
		});
		topmenu.draw(config.el);
		 
		Ext.lt.message.hook("ifmistopmenu",'scroll',function(v){
		 	if(v==null||isNaN(v))return;
		 	v=parseInt(v);
		 	topmenu.scroll(v);
		 });
	}
	

	/**ϵͳ��ҳ���˵�չʾ����*/
	function mainMenuShow(config){
		config.totalmenus = config.totalmenus.toArray();
		//��������UKey��½��ε����ܵ����½������
		var ischeckUkey = config.portalIsCheckUkey;
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
	    mainMenuHtml.push('        <li style="">��</li>'); 
	    /**��ʼ����ϵͳ�˵���Ϣ*/
	    //�˵��ܳ��ܵ������
	    var menuwidth = window.screen.width - 50;
	    //ʵ�ʲ˵����
	    var menulength = 1;
	    //�û����ն���
	    var userComObj = new Array();
	    
	    for (var i = 0; i < config.totalmenus.length; i++){
	        //�˵����� 
	        var menu = config.totalmenus[i]
	        //����˵����
	        menulength = menulength + menu.name.length+1;
//	        var menuL = menu.name.replace(/[^\x00-\xff]/g, '__').length;
//	        menulength = menulength + Math.ceil(menuL/2) +0.9; 
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
	        if(!menu.tjhqprogram){
	        	if(menu.menuid==41000){
		            mainMenuHtml.push('<li><a href="' + _ROOT_PATH_ + menu.clientmodule+'?mainmenu=' + menu.menuid + '" target="_blank">' + menu.name + '</a>��</li>');
	        	}else{
		            mainMenuHtml.push('<li><a href="' + _ROOT_PATH_ + menu.clientmodule+'?mainmenu=' + menu.menuid + '">' + menu.name + '</a>��</li>');
	        	}
	        //����ǽ���˵�
	        }else {
	            /**���ݲ�ͬҵ��ϵͳ���ͽ������⴦��1��b/sϵͳ  2��c/sϵͳ  3����־����-��ʱ��������Ǹ��ط���ʹ�ã�*/
	            //δʵ��ϵͳ��ʾ��Ϣ
	            var promsg = "��ϵͳ��û�н��н��룬�޷����е����¼";
	            //�����b/sϵͳ
	            if (menu.type == 1){
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
						    	mainMenuHtml.push('<form id="app' + menu.code + '" name="app' + menu.code + '" method="post" action="' + menurl + '" target="_blank" style="display:none">');                            //ѭ��ϵͳ����
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
	    	if((menulength+9)*16>=menuwidth){
				//����
				mainMenuHtml.push('<br><li>��</li>');
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
		return mainMenuHtml.join('');
	};

	return ifmismenu;
}
/**��̬����appcaller�ؼ�*/
function loadAppcaller(){
	Ext.lt.ifmis.activex.loadAppCallerOcx();
}

/**ҵ������ַ������*/
function openApp(){
	window.showModalDialog(ROOT_PATH+"/common/applocation.do","","dialogWidth:646px;dialogHeight:442px;center:yes;help:no;resizable:no;status:no");
}

/**��������UKey��½��ε����ܵ����½������*/
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


