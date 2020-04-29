// 定义Portal命名空间
if(Ext.lt.portal==null) Ext.lt.portal = {component:{}};
if (Ext.lt.portal.component == null) {
	Ext.lt.portal.component = {};
}

/**系统左侧菜单展示区域*/
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

//阻止链接跳转
function stopDefaultHref(e) { 
    if (e && e.preventDefault) 
        e.preventDefault(); 
    else 
        window.event.returnValue = false; 
    return false; 
} 
//左侧菜单点击事件
function clickLeftTree(el,mainmenuid){
	var target = el.href;
	if (isLinked(target)) {
		if(target.indexOf("javascript:openReport(")>=0){
			//如果是打开龙图报表，则阻止<a>链接跳转
			stopDefaultHref(el);
			target = target.substring(22,target.indexOf(")"));
			openReport(target);
		}else if(target.indexOf("/longtu/report")>=0&&reportexturl!=null){
			//如果是打开龙图报表，则阻止<a>链接跳转
			stopDefaultHref(el);
			target += ((target.indexOf("?")==-1)?"?":"&")+Base64.decode(reportexturl);
			try{
				if(document.all.ltrptocx==undefined||document.all.ltrptocx.object==null){ // 点击系统管理左侧报表定义等菜单项，判断ltrpt是否存在，不存在则允许自动安装或弹出下载提示
					Ext.lt.ifmis.activex.loadLTReportOcx();
				}
				ltrptocx.openJnlpProgram('RPT',
			            REPORT_VERSION,
						ROOT_PATH+'/common/jre6.zip',
						target,
						target.substring(target.indexOf('?')+1));	
			 }catch(ex){
				 alert("调用ltrptocx异常："+ex);	
			 }
    	}else{
			var v=qmenutree.getSelected()
			var open=true;
			if(typeof(openmenubefore)=="function"){
				open = openmenubefore();
			}
			// 点击了根节点
			if(el.dataid==mainmenuid){
				open=false;
			}
			return open;
    	}
    }
}

/**系统主菜单展示区域*/
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
		//广西南宁UKey登陆后拔掉仍能单点登陆的问题
		var ischeckUkey = config.portalIsCheckUkey;
		var userComObj = new Array();
		//判断用户对照信息是否存在，如果存在则修改
		var userCompare = config.userCompare;
		if(userCompare!=null){
			 for(var j = 0; j < userCompare.length; j++){
	        	userComObj[userCompare[j].BUSIGN] = userCompare[j];
	         }
		}
		for(var i = 0;i < d.length;i ++){
			var menu = d[i];
			if(!menu.tjhqprogram){//如果是一体化菜单
				if(menu.menuid==41000){//总会计特别处理
					menu.click=function(topObj){
						var url = _ROOT_PATH_ + topObj.clientmodule+'?mainmenu=' + topObj.menuid;
		        		//window.open(url,"Detail","Scrollbars=no,Toolbar=no,Location=no,Direction=no,Resizeable=no,Width=1024,Height=768,top=0,left=0");
		        		window.open(url);
					}
					continue;
	        	}
				if(menu.isleaf==0&&menu.levelno==1){//如果是点击主菜单，获取mainmenuid
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
								if(document.all.ltrptocx==undefined||document.all.ltrptocx.object==null){ // 点击系统管理左侧报表定义等菜单项，判断ltrpt是否存在，不存在则允许自动安装或弹出下载提示
									Ext.lt.ifmis.activex.loadLTReportOcx();
								}
								ltrptocx.openJnlpProgram('RPT',
							            REPORT_VERSION,
										ROOT_PATH+'/common/jre6.zip',
										target,
										target.substring(target.indexOf('?')+1));	
							 }catch(ex){
								 alert("调用ltrptocx异常："+ex);	
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
			}else{//接入
				var promsg = "此系统还没有进行接入，无法进行单点登录";
				menu.click=function(topObj){
					//南宁单点登录时是否检测ukey还在
					if(!isCheckUeyOutOrIn(ischeckUkey)){
						return;
					}
					//判断用户对照信息是否存在，如果存在则修改
			        var comUcode = config.userCode;
					var comPassword = "";
			        if(userComObj[topObj.sign]){
			        	comUcode = userComObj[topObj.sign].BUCODE;
			        	if(userComObj[topObj.sign].BUPASSWORD != null){
			        	    comPassword = userComObj[topObj.sign].BUPASSWORD;
			            }
			        }
					if (topObj.type == 1){
						//单点登录中配置的localhost转成服务地址
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
		            	
			            /**根据业务系统开发商进行区分（1：太极华清系统 2：龙图系统 4: 不同服务的一体化系统菜单 5：甘肃第三方业务系统不配合而自己开发的单点登录控件  6：未实现系统）*/
		                if (topObj.tjhqprogram == 4){//暂时不实现，不知道哪个地区在用
		                }else if (topObj.tjhqprogram == 5){//处理甘肃第三方业务系统不配合而自己开发的单点登录控件		                                       
		                    //固定系统标识（甘肃某系统）
		                    if (topObj.sign == "cshxxt"){
		                        //参数为用户编码与sessionId
		                    	cshxxt(topObj.sign ,"uid=" + config.userCode + " sid=" + config.session + "LT");
		                    }
		                    if(topObj.sign == "jiuqizichan"){//久其资产
			        			special(comUcode,comPassword,menurl);
			        		 }
		                }else if (topObj.tjhqprogram == 6){//未实现业务系统
		                   alert(promsg);
		                }else if (topObj.tjhqprogram == 7){ //ASP系统  
		                	var multiAreaForm = document.createElement('FORM');
			        		multiAreaForm.method = "get";
			        		multiAreaForm.action = menurl;
			        		multiAreaForm.target = "_blank";
			        		multiAreaForm.style.cssText = "display:none";
			        		document.appendChild(multiAreaForm);
			        		//循环系统参数
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
		                    //处理hosturl为不为空的业务系统，不清楚做什么用，这里暂时不实现
		                    if (topObj.hosturl != null){
		                        //判断业务系统地址与门户服务地址是否一致
		                        if (topObj.hosturl == _ROOT_PATH_){
		                        }
		                    //处理hosturl为空的业务系统，此处为正常的业务系统接入
		                    }else{ //业务系统如果是用户支付3.0、福建横连系统、实体账户系统、打开页面不加_blank
		                        if (topObj.sign == "YYJZZF3.0" || topObj.sign == "nftt" || topObj.sign == "account"){
		                        	var multiAreaForm = document.createElement('FORM');
					        		multiAreaForm.method = "post";
					        		multiAreaForm.action = menurl;
					        		multiAreaForm.target = "_blank";
					        		multiAreaForm.style.cssText = "display:none";
					        		document.appendChild(multiAreaForm);
					        		//循环系统参数
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
						        }else if (topObj.sign == "BOZHCX"){//BO系统单点登录
						            //需要实现----------------------------------
						        }else if(topObj.sign == "xzd"){//湖南新中大单点登录
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
						        }else {//其他正常业务系统
					        		var multiAreaForm = document.createElement('FORM');
					        		multiAreaForm.method = "post";
					        		multiAreaForm.action = menurl;
					        		multiAreaForm.target = "_blank";
					        		multiAreaForm.style.cssText = "display:none";
					        		document.appendChild(multiAreaForm);
					        		//循环系统参数
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
		            //cs系统
				    }else if (topObj.type == 2){
				    	loadAppcaller();
		                //太极华清业务系统
		                if (topObj.tjhqprogram == 1){
		                	//存储业务系统对应数据库列表信息
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
		                	//判断如果是部门预算的系统管理，也传exp
		                    if(topObj.sign == "expxtgl"){
		                        //用户编码
		                    	arr.push('|exp|' + comUcode.toLowerCase());
		                    //指标系统系统管理
		                    }else if(topObj.sign == "indisys"){
		                    	arr.push('|indi|' + comUcode.toLowerCase());
		                    //正常华清业务系统
		                    }else{
		                    	arr.push('|' + topObj.sign + '|' + comUcode.toLowerCase());
		                    }
		                    //如果华清系统配置了数据库参数，华清系统可能连接不同年度的数据库，默认取第一个
		                    if(dbs.length > 0){
		                        //业务系统数据库对象
		                    	var db = dbs[0];
		                    	arr.push('|' + db.dbstr);
		                    }
		                    //是否需要sessionID
		                    if(topObj.needsid ==1 ){
		                    	arr.push('|' + config.session);
							}
							//组装业务系统参数
							for(var j = 0; j < topObj.parameters.length; j++){
								arr.push('|' + topObj.parameters[j].parametervalue);
							}
		                	//华清预算编制单位版(efmdiv)或财政供养单位版(dfczdiv)
		                    if(topObj.sign == "efmdiv" || topObj.sign == "dfczdiv"){
		                    	//AppCaller.callApp(topObj.sign,arr.join(''));
		                    //华清其他cs业务系统
		                    }else {
		                    	 //AppCaller.callHqApp(topObj.sign,arr.join(''));
		                    }
		                    
		                    //如果业务系统存在多条数据库配置
							if(dbs.length>1){
							//
								//循环遍历数据库信息
							/*	for(var j = 0;j<dbs.length; j++){
								     var db = dbs[j];
								     alert(topObj.menuid);
								     topmenu.additem({id:topObj.menuid+j,name:db.dbname,code:'s',sid:topObj.menuid});
								}	
								//topmenu.reflash(); 
								*/
								return;
								
							    //在菜单后放置一图标，支持鼠标放下事件，鼠标放下后弹出财政年度下拉选择框
								mainMenuHtml.push('&nbsp;<IMG id="img' + topObj.code + '" alt="切换库" src="' + _ROOT_PATH_ + '/images/list.gif" style="margin-top:10px;cursor:pointer;" onmouseover="mvqMOv(\'img' + topObj.code + '\',\'panelDiv' + topObj.code + '\')";>');
								//弹出菜单样式div
								menudiv.push('<div id="panelDiv' + topObj.code + '" style="position:absolute;visibility:hidden; z-index:1000; WIDTH: 90px; BORDER-RIGHT: #8BA3DA 1px solid; PADDING-RIGHT: 12px;BORDER-TOP: #8BA3DA 1px solid; PADDING-LEFT: 12px; PADDING-BOTTOM: 12px; BORDER-LEFT: #8BA3DA 1px solid; PADDING-TOP: 12px;BORDER-BOTTOM: #8BA3DA 1px solid; BACKGROUND-COLOR: #FFFFFF" onmouseover="panelMOv(\'panelDiv' + topObj.code + '\');" onmouseout="panelMOu(\'panelDiv' + topObj.code + '\');">');
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
					                        if(topObj.sign == "efmdiv" || topObj.sign == "dfczdiv"){
												 menudiv.push('<a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){loadAppcaller();AppCaller.callApp(\'');
					                        }else{
												 menudiv.push('<a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){loadAppcaller();AppCaller.callHqApp(\'');
					                        }
					                        menudiv.push(topObj.sign + '\',\'');
											 //判断如果是部门预算的系统管理，也传exp
											 if(topObj.sign == "expxtgl"){
		                    					menudiv.push('|exp|' + comUcode.toLowerCase());
		                    				//如果是指标系统的系统管理
		                    				}else if(topObj.sign == "indisys"){
		                    					menudiv.push('|indi|' + comUcode.toLowerCase());
		                    				}else{
		                    					menudiv.push('|' + topObj.sign + '|' + comUcode.toLowerCase());
		                    				}
		                    				//数据库参数信息
			                        		menudiv.push('|' + db.dbstr);
			                        		//是否传递sessionID
			                        		if(topObj.needsid == 1){
			                        		 	menudiv.push('|' + config.session);
			                        		}
											//组装业务系统参数
											for(var p = 0; p < topObj.parameters.length; p++){
												menudiv.push('|' + topObj.parameters[p].parametervalue);
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
											 menudiv.push(topObj.sign + '\',\'');
											 //判断如果是部门预算的系统管理，也传exp
											 if(topObj.sign == "expxtgl"){
		                    					menudiv.push('|exp|' + comUcode.toLowerCase());
		                    				 //指标系统系统管理
		                    				 }else if(topObj.sign == "indisys"){
		                    					 menudiv.push('|indi|' + comUcode.toLowerCase());
		                    				 }else{
		                    					 menudiv.push('|' + subprogram.sign + '|' + comUcode.toLowerCase());
		                    				 }
		                    				 //数据库参数		 
			                        		 menudiv.push('|' + db.dbstr);
			                        		 //如果需要sessionID
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
	
						//判断Tjhqprogram为5的，是调用新控件的地方，拼成的连接地址,甘肃某系统
		                }else if (topObj.tjhqprogram == 5){
		                     //根据系统标识判断
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
		                //未实现系统
		                }else if (topObj.tjhqprogram == 6){
		                	alert(promsg);
						//其他cs业务系统
		                }else {
	                        //龙图平台客户端系统
	                        if(topObj.hosturl != null){
	                        	var arr = ['uid=' + comUcode + ' sid=' + config.session + 'LT']; 
	                        	for(var j = 0; j < topObj.parameters.length; j++){
	                        		arr.push(' ');
	                        		arr.push(topObj.parameters[j].parametername + '=' + topObj.parameters[j].parametervalue);
								}
	                        	AppCaller.callApp(topObj.sign,arr.join(''));
							//其他业务系统
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
	

	/**系统首页主菜单展示区域*/
	function mainMenuShow(config){
		config.totalmenus = config.totalmenus.toArray();
		//广西南宁UKey登陆后拔掉仍能单点登陆的问题
		var ischeckUkey = config.portalIsCheckUkey;
		//记录cs系统个数  大于0时显示 业务程序地址管理菜单
		var cscount=0;
		//定义菜单加载数组
		var mainMenuHtml = [];
	    //弹出菜单数组对象，多数据库多子系统
		var menudiv = [];
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
	    
	    for (var i = 0; i < config.totalmenus.length; i++){
	        //菜单对象 
	        var menu = config.totalmenus[i]
	        //计算菜单宽度
	        menulength = menulength + menu.name.length+1;
//	        var menuL = menu.name.replace(/[^\x00-\xff]/g, '__').length;
//	        menulength = menulength + Math.ceil(menuL/2) +0.9; 
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
	        if(!menu.tjhqprogram){
	        	if(menu.menuid==41000){
		            mainMenuHtml.push('<li><a href="' + _ROOT_PATH_ + menu.clientmodule+'?mainmenu=' + menu.menuid + '" target="_blank">' + menu.name + '</a>┆</li>');
	        	}else{
		            mainMenuHtml.push('<li><a href="' + _ROOT_PATH_ + menu.clientmodule+'?mainmenu=' + menu.menuid + '">' + menu.name + '</a>┆</li>');
	        	}
	        //如果是接入菜单
	        }else {
	            /**根据不同业务系统类型进行特殊处理（1：b/s系统  2：c/s系统  3：日志类型-暂时不清楚有那个地方在使用）*/
	            //未实现系统提示信息
	            var promsg = "此系统还没有进行接入，无法进行单点登录";
	            //如果是b/s系统
	            if (menu.type == 1){
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
						    	mainMenuHtml.push('<form id="app' + menu.code + '" name="app' + menu.code + '" method="post" action="' + menurl + '" target="_blank" style="display:none">');                            //循环系统参数
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
	    	if((menulength+9)*16>=menuwidth){
				//换行
				mainMenuHtml.push('<br><li>┆</li>');
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
		return mainMenuHtml.join('');
	};

	return ifmismenu;
}
/**动态加载appcaller控件*/
function loadAppcaller(){
	Ext.lt.ifmis.activex.loadAppCallerOcx();
}

/**业务程序地址弹出框*/
function openApp(){
	window.showModalDialog(ROOT_PATH+"/common/applocation.do","","dialogWidth:646px;dialogHeight:442px;center:yes;help:no;resizable:no;status:no");
}

/**广西南宁UKey登陆后拔掉仍能单点登陆的问题*/
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


