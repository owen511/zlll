/**
*登录首页公共设置
*/
//设置js路径对象 
// 定义Portal命名空间
if(Ext.lt.portal==null) Ext.lt.portal = {component:{}};
if (Ext.lt.portal.component == null) {
	Ext.lt.portal.component = {};
}
//首页面参数信息
var para = new Object(); 
//登录首页展示对象（菜单、待办事项等）
Ext.lt.portal.component.login = new function () {
	//登录首页server
	this.server="";
	this.config="";
	
	/**待办事项展示（外围框架）*/
	function pendingTaskShow(config){
	    //待办事项存储数组对象
	    var pendingTaskHtml = [];
		var tempwidth=(document . body . clientWidth/100)*3+8+482;
	    //判断是否只显示待办事项（如果公告、快速导航、报表都不显示）
		if (config.isbulletin == "false" && config.quickguidMenu.length == 0 && config.isshowreport == "false") {
			pendingTaskHtml.push('<div id="default_center">');
		//分左右两部分显示
		}else {
	        pendingTaskHtml.push('<div id="default_center" style=" float: left; margin-left: 10px; width:65%; margin-top: 5px;display:inline;" layout="{w:{fit:-515},h:{fit:-10}}">');
		}
		//待办事项展示区域标题
		pendingTaskHtml.push('       <div id="default_top_simple" >');
		pendingTaskHtml.push('         <div style="width:100%;">待办事项</div>');
		pendingTaskHtml.push('       </div>');
		//待办事项正文区域展
		pendingTaskHtml.push('       <div id="default_middle_simple" style = "overflow-x: hidden; overflow-y: auto; padding-top: 0px;padding-bottom: 0px;"; layout="{h:{fit:\'auto\'}}">');
		/*
		pendingTaskHtml.push('    	     <span id="middle_inner">');
		pendingTaskHtml.push('		         <table width=97% border=0 cellpadding=0 cellspacing=0>');
        //待办事项读取所用变量
        //菜单ID
		var menuid = "";
		//业务系统地址
		var hosturl = "";
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
		//计算业务系统数目
		var count = 0;
		//循环遍历子系统信息
		for (var i = 0; i < config.totalmenus.length; i ++){
	        //菜单对象 
	        var menu = config.totalmenus[i]
	        //如果是生长业务系统
	        if (menu.menuid){
	            //菜单编码
				menuid += menu.menuid + ";";
				//业务系统地址
				hosturl += "0" + ";";
				//菜单名称
				meunname += menu.name + ";";
				//业务系统类型：一体化不同不无业务系统接入及一体化本身业务系统类型
				type += 4 + ";";
				count=count+1;
				//绘制业务系统展示区域，一个业务系统占用一个表格的一行
				pendingTaskHtml.push('<tr>');
				pendingTaskHtml.push('    <td>');
				pendingTaskHtml.push('        <div id=' + menu.menuid + '>');
				pendingTaskHtml.push('        </div>');
				pendingTaskHtml.push('    </td>');
				pendingTaskHtml.push('</tr>');    
	        //如果是接入业务系统
	        }else {
	            //如果接入业务系统需要展示待办事项
				if (menu.haspendingtask) {
				//alert(menu.haspendingtask);
				    //业务系统编码
					menuid += menu.code + ";";
					//业务系统地址
					hosturl += menu.hosturl + ";";
					//业务系统名称
					meunname += menu.name + ";";
					//业务系统类型
					type += menu.tjhqprogram + ";";
					count=count+1;
					//绘制业务系统展示区域，一个业务系统占用一个表格的一行
					pendingTaskHtml.push('<tr>');
					pendingTaskHtml.push('    <td>');
					pendingTaskHtml.push('        <div id=' + menu.code + '>');
					pendingTaskHtml.push('        </div>');
					pendingTaskHtml.push('    </td>');
					pendingTaskHtml.push('</tr>');    
				}
	        }
	        //组装待办事项查询参数，每五个一组往服务端发送
	        if (count == 5 || i == config.totalmenus.length - 1){
		        var pdtPara = {};
		        //菜单编码
		        pdtPara.menuid = menuid;
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
                Ext.lt.RCP.server('defaultCommonService', "getPendingTask",  pdtPara, function (resp) {
                    //待办事项查询返回结果展示
                    showPendingTask(resp);
                });
                //清空各对象信息
				//业务系统编码
				menuid = "";
				//业务系统地址
				hosturl = "";
				//业务系统名称
				meunname = "";
				//业务系统类型
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
	/**待办事项展示(内容)*/
	this.pendingTaskShowAfter=function(config){
	    //待办事项存储数组对象
	    var pendingTaskHtml = [];
		pendingTaskHtml.push('    	     <span id="middle_inner">');
		pendingTaskHtml.push('		         <table width=97% border=0 cellpadding=0 cellspacing=0>');
        //待办事项读取所用变量
        //菜单ID
		var menuid = "";
		//业务系统地址
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
		//计算业务系统数目
		var count = 0;
		//循环遍历子系统信息
		for (var i = 0; i < config.totalmenus.length; i ++){
	        //菜单对象 
	        var menu = config.totalmenus[i]
	        //如果是生长业务系统
	        if (menu.menuid){
	            //菜单链接
				clientmodules += menu.clientmodule + ";";
	            //菜单编码
				menuid += menu.menuid + ";";
				//业务系统地址
				hosturl += "0" + ";";
				//菜单名称
				meunname += menu.name + ";";
				//业务系统类型：一体化不同不无业务系统接入及一体化本身业务系统类型
				type += 4 + ";";
				count=count+1;
				//绘制业务系统展示区域，一个业务系统占用一个表格的一行
				pendingTaskHtml.push('<tr>');
				pendingTaskHtml.push('    <td>');
				pendingTaskHtml.push('        <div  id=' + menu.menuid + '>');
				pendingTaskHtml.push('        </div>');
				pendingTaskHtml.push('    </td>');
				pendingTaskHtml.push('</tr>');    
	        //如果是接入业务系统
	        }else {
	            //如果接入业务系统需要展示待办事项
				if (menu.haspendingtask == 'true') {
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
					count=count+1;
					//绘制业务系统展示区域，一个业务系统占用一个表格的一行
					pendingTaskHtml.push('<tr>');
					pendingTaskHtml.push('    <td>');
					pendingTaskHtml.push('        <div id=' + menu.code + '>');
					pendingTaskHtml.push('        </div>');
					pendingTaskHtml.push('    </td>');
					pendingTaskHtml.push('</tr>');    
				}
	        }
	        //组装待办事项查询参数，每五个一组往服务端发送
	        if (count == 5 || i == config.totalmenus.length - 1){
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
                Ext.lt.RCP.server('defaultCommonService', "getPendingTask",  pdtPara, function (resp) {
                    //待办事项查询返回结果展示
                	if(config.portalisshownewpendingtask==0){
                		showPendingTaskNEW(resp);
                	} else if (config.portalisshownewpendingtask==2){  // 重庆新版UI
                		task_render.append(resp);
                	} else {
                    	showPendingTask(resp);
                	}
                });
                //清空各对象信息
				//业务系统编码
				menuid = "";
				//业务系统地址
				hosturl = "";
				//业务系统名称
				meunname = "";
				//业务系统类型
				type = "";
				count = 0;
				clientmodules="";
	        }
		}
		pendingTaskHtml.push('		         </table>');
		pendingTaskHtml.push('           </span>');
	    return pendingTaskHtml.join('');
	};
	/**************待办事项查询返回结果展示**********/
	function showPendingTask(config){ 
	    //待办事项展示对象集合
	    var totallist = config;
		var isMergeOperate = false;
		if(totallist && totallist.length>0){
			var mergeOperate =  totallist[0];
			
			if(mergeOperate.isMergeOperate != undefined){
				isMergeOperate = mergeOperate.isMergeOperate;
				
				//移除第一个
				totallist.shift();
			}
		}
	    for(var index = 0;index < totallist.length; index++)
	    {   
	        //业务系统待办事项对象，例如：指标系统
		    var pendingtasks=totallist[index];
		    //定义待办事项存储数组对象
		    var taskStrHtml = [];
		    //如果业务系统需要显示待办事项
		    if(pendingtasks.size()>0){
		       //如果是生长业务系统
			   if(pendingtasks[0].outter!=1)
			   {   
			       //如果业务系统不存在待办事项
				   if(!pendingtasks[0].name)
				   {
				        //业务系统ID
					    var k=pendingtasks[0].k;
					    //业务系统名称
						var menuname=pendingtasks[0].menuname;
						//业务系统链接
						var menuurl=pendingtasks[0].clientmodule;
						//显示业务系统名称
						taskStrHtml.push('<p style="display:block; overflow:auto;">');
						taskStrHtml.push('<a class=inner_title href="' + _ROOT_PATH_+menuurl+'">'+ menuname + '&nbsp&nbsp&nbsp&nbsp<b style="color:#000; font-weight:normal;"></b>' + '</a>');
						taskStrHtml.push('</p>');
			       }
			       //如果业务系统存在待办事项
			       else{
			           //用户换行
					   var count=0;
					   //如果待办事项条数少，缩小待办提示框的高度，减少空白
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
					   //显示业务系统名称
					   taskStrHtml.push('<a class=inner_title href="' + _ROOT_PATH_+pendingtasks[0].clientmodule+'">'+ pendingtasks[0].menuname + '</a>');
					   //业务系统中待办事项展示表格
					   taskStrHtml.push('<table width=97% border=0 cellpadding=0 cellspacing=0>');
					   //循环业务系统子系统,例如：总指标加载、单位指标调剂等等
				       for(i=0; i<pendingtasks.size();i++) {
				       		//具体业务系统子系统对象
							var pendingtask= pendingtasks[i];
							//业务系统子系统待办事项对象，例如：待审核、待打印等等
							var details = pendingtask.details;
							//子系统服务地址
							var hostip = pendingtask.hostip;
							//子系统服务端口
							var hostport=pendingtask.hostport;
							//子系统本地服务地址
							var localip = pendingtask.localip;
							//子系统本地服务端口
							var localport=pendingtask.localport;
							//用户编码
							var uid=pendingtask.uid;
							//业务系统菜单ＩＤ
							var k = pendingtask.k;
							//sessionID
							var sid=pendingtask.sid;
							//财政年度
							var year=pendingtask.year;
							if(pendingtask.totalcount > 0){
								count++;
								//是否换行
								if(count%2==1)
								{
				      				taskStrHtml.push('<tr>');
				    			}
				    			//子系统待办事项展示
								taskStrHtml.push('<td width="45%" style="vertical-align:top;">' + '<span>');
								//子系统名称前的闪动图标
								taskStrHtml.push('<img src="' + _ROOT_PATH_ + '/images/bg/top.gif"/>');
								taskStrHtml.push(pendingtask.name + '----->共' + pendingtask.totalcount + '条<br/>');
							}
							//合并同一个muenuid和工作流状态的单据
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
							//遍历子系统待办事项，例如：待审核、待打印等
							for(j=0;j<details.size();j++)
							{ 
								//子系统待办事项对象，例如：待审核、待打印等
								detail=details[j];
								//过滤待办事项为0的对象
								if(detail.totalcount > 0){
								    //子系统待办事项前边图标
								    taskStrHtml.push('&nbsp' + '<img src="' + _ROOT_PATH_ + '/images/bg/20.png" />');
								    //子系统待办事项链接地址
								    var url="http://"+hostip+":"+hostport+detail.linkName;
								    //替换链接地址中的不规则字符
								    url=url.replace(/&/g, "%26");
								    //如果业务系统的服务地址为空则使用当前系统的默认地址
								    if(hostip == "" && hostport == ""){
								       taskStrHtml.push('<a href="' + _ROOT_PATH_);
								       taskStrHtml.push(detail.linkName + '">');
								    }  
								    //如果如果业务系统的服务地址与当前服务地址相同则使用当前系统的默认地址 
								    else if(hostip == localip && hostport == localport)
									{
								       taskStrHtml.push('<a href="' + _ROOT_PATH_);
								       taskStrHtml.push(detail.linkName + '">');
								    }
								    //跨服务接入生长业务系统
								    else{
								       taskStrHtml.push('<a href="http://');
								       taskStrHtml.push(hostip + ':' + hostport + '/common/pendingtasklogin.do' + '?uid=' + uid + '&sid=' + sid + '&year=' + year + '&url=' + url + '">');
								    }
								    //显示具体代办事项内容
								    taskStrHtml.push('&nbsp待' + detail.operattypedto.name + '&nbsp' + detail.totalcount + '条</a>');
					   				taskStrHtml.push('<br/>');   
								}
						    } 
							taskStrHtml.push('</span>' + '</td>');
							//子系统是否换行
							if(count%2==0){
			      			    taskStrHtml.push('</tr>');
			    			}  
					    }
						taskStrHtml.push('</table>');
						taskStrHtml.push('</p>');
				    }
			   }
			   //如果为接入待办事项
			   if(pendingtasks[0].outter==1){
				   //循环业务系统子系统信息
				   for(i=0; i<pendingtasks.size();i++) {
				   	  taskStrHtml.push('<p>');
				   	  //子系统对象，例如：总指标加载、单位指标调剂
				      pendingtask= pendingtasks[i];
				      //业务系统ID
				      var k=pendingtask.k;
				      //子系统具体待办事项，例如：待审核、待打印等
				      var details = pendingtask.details;
				      //子系统名称集合
				      var name_tem = pendingtask.name_tem;
				      //业务系统前边闪动图标
				      taskStrHtml.push('<img src="' + _ROOT_PATH_ + '/images/bg/top.gif"/>');
				      //如果是bs业务系统
				      if(pendingtask.type==1)
					  {  
				      	taskStrHtml.push('<a href="' + pendingtask.Url + '" target="_blank">');
				      	//业务系统名称
				      	taskStrHtml.push(pendingtask.name + '</a>');
				      //如果是cs业务系统
				      }else{
				      	taskStrHtml.push('<a href="' + pendingtask.Url + '">');
				      	//业务系统名称
				      	taskStrHtml.push(pendingtask.name + '</a>');
				      }
				      //如果待办事项条数大于零
				      if(pendingtask.count>0){
				    	  if(pendingtask.name_tem[0]!="银行账户系统"){
				    		  taskStrHtml.push('----->共' + pendingtask.count + '条<br/>');
				    	  }
				       }
				       taskStrHtml.push('<br/>'); 
				       taskStrHtml.push('<span>');
				       //子系统名称集合为多条，则用table来存放业务系统中不同子系统的待办事项
				       if(name_tem.size()>0){
					        taskStrHtml.push('<table border=0>');
					        //循环遍历业务系统子系统
					       	for(o=0;o<name_tem.size();o++){
					       	//处理换行标记
					       	if(o%2==0)
								{
				      				taskStrHtml.push('<tr>');
				    			}
					       	    taskStrHtml.push('<td width="300" style="vertical-align:top;">');
					       	    //系统名称前的图标
					       	 if(name_tem[0]!="银行账户系统"){
					       		taskStrHtml.push('&nbsp' + '<img src="' + _ROOT_PATH_ + '/images/bg/20.png" />');
					       		//子系统名称
					       		taskStrHtml.push(name_tem[o]);	       		
					       		taskStrHtml.push('<br/>');
					       	 }
					       		//循环遍历子系统对应代办事项，例如待审核、待打印等
					       		for(j=0;j<details.size();j++)
								   { 
								      //子系统待办事项对象，例如待审核、待打印等
								      detail=details[j];
								      //如果子系统待办事项条数大于0
								      
								      if(detail.totalcount>0){
								    	  if(detail.menuname=="银行账户系统"){
								    	
											         //如果是bs系统
											         if(pendingtask.type==1)
											         {  
											         	taskStrHtml.push('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + '<a href="' + detail.JobUrl + '" target="_blank"><font color = "' + detail.color + '">' + detail.status + '</font></a>');
											         	taskStrHtml.push('<br/>');
							                         }
							                         //如果是CS系统
							                         else
							                         {
							                            taskStrHtml.push('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + detail.status + '&nbsp;>');
							                            taskStrHtml.push('<br/>'); 
							                         }
							                       }
								    	  else{
								          //如果子系统名称与待办事项中对应子系统名称一致，则把待办事项放入对应子系统区域中
									      if(detail.menuname == name_tem[o] ){
									         //如果是bs系统
									         if(pendingtask.type==1)
									         {  
									         	taskStrHtml.push('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + '<a href="' + detail.JobUrl + '" target="_blank"><font color = "' + detail.color + '">' + detail.status + '<' + detail.totalcount + '条></font></a>');
									         	taskStrHtml.push('<br/>');
					                         }
					                         //如果是CS系统
					                         else
					                         {
					                            taskStrHtml.push('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + detail.status + '&nbsp;<' + detail.totalcount + '条>');
					                            taskStrHtml.push('<br/>'); 
					                         }
					                       }
							                       
								    	  }
								       }
								       //如果如果子系统待办事项条数等于0
								       if(detail.totalcount==0){
								    		   taskStrHtml.push('&nbsp' + detail.status); 
								    		   taskStrHtml.push('<br/>'); 
								    	  
								        }								        
							       }					       		
					       		taskStrHtml.push('</td>');
					       		//是否换行
					       		if(o%2==1)
								{
				      				taskStrHtml.push('</tr>');
				    			}
					       	}
					       	taskStrHtml.push('</table>');
				       //子系统名称集合为1条,则不用table展示
				       }else{
				           //循环遍历子系统待办事项
					       for(j=0;j<details.size();j++)
						   {
						      //子系统待办事项对象
						      detail=details[j];
						      taskStrHtml.push('&nbsp' + '<img src="' + _ROOT_PATH_ + '/images/bg/20.png" />');
						     //如果是bs系统
					         if(pendingtask.type==1)
					         {  
					            //如果子系统待办事项大于0条
					            if(detail.totalcount>0){
						         	taskStrHtml.push('<a href="' + detail.JobUrl + '" target="_blank"><font color = "' + detail.color + '">' + detail.status + '<' + detail.totalcount + '条></font></a>');
					         	}else{
					         		taskStrHtml.push('<a><font color = "' + detail.color + '">' + detail.status + '</font></a>');
					         	}
	                         }
	                         //如果是cs系统
	                         else
	                         {
	                            //如果子系统待办事项大于0条
	                         	if(detail.totalcount>0){
	                            	taskStrHtml.push(detail.status + '&nbsp;<' + detail.totalcount + '条>');
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
		   //把各业务系统对应的待办事项信息放入其对应ＤＩＶ中
		   document.getElementById(k).innerHTML = taskStrHtml.join('');
	   }//for
	};
	/**************待办事项查询返回结果展示(新版的展示)wyx20120712**********/
	function showPendingTaskNEW(config){ 
		//alert('a');
	    //待办事项展示对象集合
	    var totallist = config;
		var isMergeOperate = false;
		if(totallist && totallist.length>0){
			var mergeOperate =  totallist[0];
			
			if(mergeOperate.isMergeOperate != undefined){
				isMergeOperate = mergeOperate.isMergeOperate;
				
				//移除第一个
				totallist.shift();
			}
		}
	    for(var index = 0;index < totallist.length; index++)
	    {   
	        //业务系统待办事项对象，例如：指标系统
		    var pendingtasks=totallist[index];
		    //定义待办事项存储数组对象
		    var taskStrHtml = [];
		    //如果业务系统需要显示待办事项
		    if(pendingtasks.size()>0){
		       //如果是生长业务系统
			   if(pendingtasks[0].outter!=1)
			   {   
			       //如果业务系统不存在待办事项
				   if(!pendingtasks[0].name)
				   {
				        //业务系统ID
					    var k=pendingtasks[0].k;
					    //业务系统名称
						var menuname=pendingtasks[0].menuname;
						//业务系统链接
						var menuurl=pendingtasks[0].clientmodule;
						//显示业务系统名称
						taskStrHtml.push('<div>');
						taskStrHtml.push('<div class="title_blue">');
						taskStrHtml.push('<a href="' + _ROOT_PATH_+menuurl+'">'+ menuname + '&nbsp&nbsp&nbsp&nbsp<b style="color:#000; font-weight:normal;"></b>' + '</a>');
						taskStrHtml.push('</div>');
						taskStrHtml.push('<table width=97% border=0 cellpadding=0 cellspacing=0>');
						taskStrHtml.push('<tr>');
						taskStrHtml.push('<td colspan="2" style="vertical-align:top;" nowrap="nowrap">');
						taskStrHtml.push('<div class="content_black">暂时没有待办事项</div>');
						taskStrHtml.push('</td>');
						taskStrHtml.push('</tr>');
						taskStrHtml.push('</table>');
						taskStrHtml.push('</div>');
						
			       }
			       //如果业务系统存在待办事项
			       else{
			           //用户换行
					   var count=0;
					   //如果待办事项条数少，缩小待办提示框的高度，减少空白
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
					   //显示业务系统名称
					   taskStrHtml.push('<div class="title_blue"><a  href="' + _ROOT_PATH_+pendingtasks[0].clientmodule+'">'+ pendingtasks[0].menuname + '</a></div>');
					   //业务系统中待办事项展示表格
					   taskStrHtml.push('<table width=97% border=0 cellpadding=0 cellspacing=0>');
					   //循环业务系统子系统,例如：总指标加载、单位指标调剂等等
				       for(i=0; i<pendingtasks.size();i++) {
				       		//具体业务系统子系统对象
							var pendingtask= pendingtasks[i];
							//业务系统子系统待办事项对象，例如：待审核、待打印等等
							var details = pendingtask.details;
							//子系统服务地址
							var hostip = pendingtask.hostip;
							//子系统服务端口
							var hostport=pendingtask.hostport;
							//子系统本地服务地址
							var localip = pendingtask.localip;
							//子系统本地服务端口
							var localport=pendingtask.localport;
							//用户编码
							var uid=pendingtask.uid;
							//业务系统菜单ＩＤ
							var k = pendingtask.k;
							//sessionID
							var sid=pendingtask.sid;
							//财政年度
							var year=pendingtask.year;
			      			if(pendingtask.totalcount > 0){
			      				count++;
			      				//是否换行
								//if(count%2==1)
								//{
				      				taskStrHtml.push('<tr width="100%">');
				    			//}
				    			//子系统待办事项展示
								taskStrHtml.push('<td colspan="2" style="vertical-align:top;" nowrap="nowrap">');
								//子系统名称前的闪动图标
								taskStrHtml.push('<div class="content_title">');
								taskStrHtml.push(pendingtask.name + '(共' + pendingtask.totalcount + '条)</div>');
								taskStrHtml.push('</td>');
								taskStrHtml.push('</tr>');
			      			}
							//合并同一个muenuid和工作流状态的单据
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
							//遍历子系统待办事项，例如：待审核、待打印等
							for(j=0;j<details.length;j++)
							{ 
								//子系统待办事项对象，例如：待审核、待打印等
							    detail=details[j];
							    //过滤待办事项为0的对象
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
								    //子系统待办事项前边图标
									taskStrHtml.push('<div class="content_black">');
								    //taskStrHtml.push('&nbsp' + '<img src="' + _ROOT_PATH_ + '/images/bg/20.png" />');
								    
								    //子系统待办事项链接地址
								    var url="http://"+hostip+":"+hostport+detail.linkName;
								    //替换链接地址中的不规则字符
								    url=url.replace(/&/g, "%26");
								    //如果业务系统的服务地址为空则使用当前系统的默认地址
								    if(hostip == "" && hostport == ""){
								       taskStrHtml.push('<a href="' + _ROOT_PATH_);
								       taskStrHtml.push(detail.linkName + '">');
								    }  
								    //如果如果业务系统的服务地址与当前服务地址相同则使用当前系统的默认地址 
								    else if(hostip == localip && hostport == localport)
									{
								       taskStrHtml.push('<a href="' + _ROOT_PATH_);
								       taskStrHtml.push(detail.linkName + '">');
								    }
								    //跨服务接入生长业务系统
								    else{
								       taskStrHtml.push('<div class="content_black"><a href="http://');
								       taskStrHtml.push(hostip + ':' + hostport + '/common/pendingtasklogin.do' + '?uid=' + uid + '&sid=' + sid + '&year=' + year + '&url=' + url + '">');
								    }
								    //显示具体代办事项内容
								    taskStrHtml.push('&nbsp待' + detail.operattypedto.name + '&nbsp(' + detail.totalcount + '条)</a>');
					   				taskStrHtml.push('</div>'); 
					   				taskStrHtml.push('</td>');
					   				//屏蔽无法正常显示错误
					   				if(details.length%2==1){
					   					if(j%2==1){
											taskStrHtml.push('</tr>');
										}
										//封口操作
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
							
							//子系统是否换行
							//if(count%2==0){
			      			    //taskStrHtml.push('</tr>');
			    			//}  
					    }
						taskStrHtml.push('</table>');
						taskStrHtml.push('</div>');
				    }
			   }
			   //如果为接入待办事项
			   if(pendingtasks[0].outter==1){
				   //循环业务系统子系统信息
				   for(i=0; i<pendingtasks.size();i++) {
				   	  taskStrHtml.push('<div><div class="title_blue">');
				   	  //子系统对象，例如：总指标加载、单位指标调剂
				      pendingtask= pendingtasks[i];
				      //业务系统ID
				      var k=pendingtask.k;
				      //子系统具体待办事项，例如：待审核、待打印等
				      var details = pendingtask.details;
				      //子系统名称集合
				      var name_tem = pendingtask.name_tem;
				      //业务系统前边闪动图标
				      //taskStrHtml.push('<img src="' + _ROOT_PATH_ + '/images/bg/top.gif"/>');
				      //如果是bs业务系统
				      if(pendingtask.type==1)
					  {  
				      	taskStrHtml.push('<a href="' + pendingtask.Url + '" target="_blank">');
				      	//业务系统名称
				      	taskStrHtml.push(pendingtask.name + '</a>');
				      //如果是cs业务系统
				      }else{
				      	taskStrHtml.push('<a href="' + pendingtask.Url + '">');
				      	//业务系统名称
				      	taskStrHtml.push(pendingtask.name + '</a>');
				      }
				      //如果待办事项条数大于零
				      if(pendingtask.count>0){
				        taskStrHtml.push('(共' + pendingtask.count + '条)');
				       }
				       //taskStrHtml.push('<br/>'); 
				       //taskStrHtml.push('<span>');
				       taskStrHtml.push('</div>');
				       taskStrHtml.push('<div>');
				       taskStrHtml.push('<table width=97% border=0 cellpadding=0 cellspacing=0>');
				       //子系统名称集合为多条，则用table来存放业务系统中不同子系统的待办事项
				       if(name_tem.size()>0){
					        //循环遍历业务系统子系统
					       	for(o=0;o<name_tem.size();o++){
					       		//处理换行标记
					       		taskStrHtml.push('<tr width="100%"><td colspan="2" style="vertical-align:top;" nowrap="nowrap">');
					       	    //taskStrHtml.push('<td width="300" style="vertical-align:top;">');
					       	    //系统名称前的图标
					       		//taskStrHtml.push('&nbsp' + '<img src="' + _ROOT_PATH_ + '/images/bg/20.png" />11111111111');
					       		//子系统名称
					       		taskStrHtml.push('<div class="content_black">');
					       		taskStrHtml.push(name_tem[o]);	   
					       		taskStrHtml.push('</div>');    		
					       		taskStrHtml.push('</td>');
					       		//循环遍历子系统对应代办事项，例如待审核、待打印等
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
								      //子系统待办事项对象，例如待审核、待打印等
								      detail=details[j];
								      //如果子系统待办事项条数大于0
								      if(detail.totalcount>0){
								    	  if(detail.menuname == name_tem[0]&&detail.menuname=="邮件系统待办事项"){
					                    	 taskStrHtml.push('<a href="javascript:clickTaskEmail()")>' + detail.status + '(' + detail.totalcount + '条)></a>');
					                    	// 将参数放到表单中提交
					                    	   taskStrHtml.push('<form id="appemail" name="appemail" method="post" action="' + detail.JobUrl + '"  target="_blank" style="display:none">'); 
					                    	   taskStrHtml.push('<input type="text" name="sid" value=""/>');
					                    	   taskStrHtml.push('<input type="text" name="mid" value=""/></form>');
					                       }else if(detail.menuname == name_tem[0] ){
									    	//如果子系统名称与待办事项中对应子系统名称一致，则把待办事项放入对应子系统区域中
									         //如果是bs系统
									         if(pendingtask.type==1)
									         {  
									         	taskStrHtml.push('<a href="' + detail.JobUrl + '" target="_blank">' + detail.status + '(' + detail.totalcount + '条)</a>');
					                         }
					                         //如果是CS系统
					                         else
					                         {
					                            taskStrHtml.push(detail.status + '&nbsp;(' + detail.totalcount + '条)');
					                         }
					                       }
								       }
								       //如果如果子系统待办事项条数等于0
								       if(detail.totalcount==0){
								           taskStrHtml.push('&nbsp' + detail.status); 
								        }
								        taskStrHtml.push('</div>'); 
								        taskStrHtml.push('</td>');
								        if(details.size()%2==1){
								        	if(j%2==1){
								        		taskStrHtml.push('</tr>');
								        	}
								        	//封口操作
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
				       //子系统名称集合为1条,则不用table展示
				       }else{
				           //循环遍历子系统待办事项
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
						      //子系统待办事项对象
						      detail=details[j];
						      //taskStrHtml.push('&nbsp' + '<img src="' + _ROOT_PATH_ + '/images/bg/20.png" />');
						     //如果是bs系统
					         if(pendingtask.type==1)
					         {  
					            //如果子系统待办事项大于0条
					            if(detail.totalcount>0){
						         	taskStrHtml.push('<a href="' + detail.JobUrl + '" target="_blank">' + detail.status + '(' + detail.totalcount + '条)</a>');
					         	}else{
					         		taskStrHtml.push('<a href="' + detail.JobUrl + '" target="_blank">' + detail.status + '</a>');
					         	}
	                         }
	                         //如果是cs系统
	                         else
	                         {
	                            //如果子系统待办事项大于0条
	                         	if(detail.totalcount>0){
	                            	taskStrHtml.push(detail.status + '&nbsp;(' + detail.totalcount + '条)');
	                            }else {
					         		taskStrHtml.push(detail.status);
					         	}
					         }
					         taskStrHtml.push('</div>');
					         taskStrHtml.push('</td>');
						     //屏蔽无法正常显示错误
					         if(details.size()%2==1){
					         		if(j%2==1){
					         			taskStrHtml.push('</tr>');
					         		}
					         		//封口操作
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
		   //把各业务系统对应的待办事项信息放入其对应ＤＩＶ中
		   //alert(k+'========'+taskStrHtml.join('')); 
		   document.getElementById(k).innerHTML = taskStrHtml.join('');
	   }//for
	};	
	// @author:miaojing-------------------------------- 重庆新的页面
	var task_render = (function($){
        var template = {
        		bone: '<div class="dbbtnarea"> <button class="dbbtnbg" data-id="fold-all"> 展开全部 </button> </div> <br> <div style="overflow-x: hidden; overflow-y: auto; width: 99.8%;" layout="{h:{fit:-30,min:200}}" id="p-task-list"> </div>',
            sys_gutter: '<div class="dboutterjg"> &nbsp; </div>',
            sys_bone: '<div class="dbitem"> <table width="98%" border="0" cellspacing="0" cellpadding="0"> <tr> <td width="103px" valign="top"> <div class="indidb" style="background:url(portal/images/cqdb/#{3-bgimg}) no-repeat center 50%"></div> <div class="sysfont"> #{0-menuname} </div> </td> <td width="41%" valign="top"> #{1-sub_system1} </td> <td width="13px" nowrap="nowrap" style="font-size: 0;"> &nbsp; </td> <td valign="top"> #{2-sub_system2} </td> </tr> </table> </div>',
            sub_sys_gutter: '<div class="dbinnerjg"> &nbsp; </div>',
            sub_sys: '<table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td class="dbtitleleft"> &nbsp; </td> <td class="dbtitlebg" title="#{3-sub_sys_name_title}"> #{0-sub_sys_name} </td> <td class="dbtitlezk" data-id="fold" data-group="#{2-sub_sys_name_hash}"> &nbsp; </td> </tr> </table> <!--待办竖向间隔--> <table width="100%" border="0" cellspacing="0" cellpadding="0" class="dbcontents" data-group="#{2-sub_sys_name_hash}"> <tr> <td class="dbinnerjg" ></td> </tr> #{1-sub_sys_options} </table>',
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
            '审核': {
                class_name: 'dbaudit',
                name: '待审核'
            },
            '打印': {
                class_name: 'dbaprint',
                name: '待打印'
            },
            'others': {
                class_name: 'dbcheck',
                name: '待验证'
            }
        },
        is_inited = false;


        // utility functions -----------------------
        /**
         * 格式化字符串 '#{0}, {1-comment}'.format('a', 'b') -> 'a, b'
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

        // 系统
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
            
            data.shift(); // 去除 isMergeOperate 数据
            
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

        // 审核， 未审核， 打印
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
            // 如果业务系统的服务地址为空则使用当前系统的默认地址
            // 如果如果业务系统的服务地址与当前服务地址相同则使用当前系统的默认地址 
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
                        $fold_all.text('收起全部');
                    }else{
                        jqueryMap.$fold.filter('.dbtitlesq').removeClass('dbtitlesq').addClass('dbtitlezk');
                        jqueryMap.$container.find('table[data-group]').css('display', 'none');
                        $fold_all.text('展开全部');
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
                "乡镇预算执行": "budgetsysy.png",
                "公务卡": "officialcardsys.png",
                "动态监控": "dnmonitoringsys.png",
                "单位核算": "accountingunitsys.png",
                "实拨管理": "officialcardsys.png",
                "工资统发": "salarysys.png",
                "常用报表": "reportsys.png",
                "系统管理": "sysmanagement.png",
                "补贴资金管理": "subsidyfundssys.png",
                "账务管理": "accountingsys.png",
                "银行管理": "banksys.png",
                "门户管理": "officialcardsys.png",
                "项目资金管理": "officialcardsys.png"
            },
            default_icon = 'indisys.png';

            return id_map[menu_id] || name_map[menu_name] || default_icon;
        };

        /**
         * 初始化组件
         * @param  {Object} $container
         * @param  {String} context_url 系统当前url上下文
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
	
	// -------------------------------- 重庆新的页面:END
	/***********右侧快速导航、报表、公告展示区域***********/
	function qrgRightShow(config){
	//debugger;
	    //定义对象存储数组
	    var qrgRightHtml = [];
	    //判断快速导航、报表、公告是否有一个需要显示）
		if (config.isbulletin == "true" || config.quickguidMenu.length > 0 || (config.isshowreport == "true" && config.reportlist.length>0)) {
			//待办事项右侧显示区域
		    qrgRightHtml.push('<div id="default_center" style="width:30%; float: left; margin-left: 20px; margin-top: 5px;display:inline;" layout="{h:{fit:-10},w:{fit:482}}">');
		    //右上部
			qrgRightHtml.push(    '<div id="default_top_simple" >');
			qrgRightHtml.push(	      '<div style="width:100%;"><span></span></div>');
			qrgRightHtml.push(    '</div>');
			//右中部
			qrgRightHtml.push(    '<div id="default_middle_simple" style="background-image: none; background-repeat: no-repeat; background-position: right bottom;padding-top: 0px;padding-bottom: 0px;" layout="{h:{fit:\'auto\'}}">');
			qrgRightHtml.push(        '<span id="middle_inner">'); 
			//判断是否显示快速导航(如果显示)
			if (config.quickguidMenu.length > 0){
				qrgRightHtml.push(            '<div  class="title_orange">快速导航</div>');
				//根据是否显示公告来判断快速导航区域的高度
			    if (config.isbulletin == "true"){
				    qrgRightHtml.push('<div style="height:210px; overflow-y:scroll;">');
			    }else {
			   	    qrgRightHtml.push('<div style="height: expression(document.body.clientHeight-window_top.offsetHeight-180);overflow-y:scroll;">');
			    }
			    qrgRightHtml.push('<table width="90%" border="0" cellpadding="0" cellspacing="0">');
				for(var i = 0; i < config.quickguidMenu.length; i++){
				    //快速导航对象
				    var guidMenu =config.quickguidMenu[i];
				    //3个一行
				    if(i%3==0){
				        qrgRightHtml.push('<tr valign="top">');
				    }
				    qrgRightHtml.push('       <td align="center" style="padding-top:2px;" width="32%">');
				    //图片
				    qrgRightHtml.push('           <img style="margin-left:20px;" src="' + _ROOT_PATH_ + '/images/bg/quick_before_small.gif" onMouseOver="this.src=\'' + _ROOT_PATH_ + '/images/bg/quick.gif\'" onMouseOut="this.src=\'' + _ROOT_PATH_ + '/images/bg/quick_before_small.gif\'" onClick="location.href=\'' + guidMenu.inputaddurl + '\'">');
				    qrgRightHtml.push('           <br/>');
				    qrgRightHtml.push('           <a href="' + guidMenu.inputaddurl + '" style="font-size:12px; margin-top:2px;">' + guidMenu.menuname + '</a>');
				    //处理快速当行滚动条位置
				    if((i+1)%6==0){
				        qrgRightHtml.push('<br/><br/>')
				    }
				    qrgRightHtml.push('       </td>');
				    //行结束符
					if((i+1)%3 == 0 || i == config.quickguidMenu.length - 1){
					    qrgRightHtml.push('</tr>');
					}
				}
				qrgRightHtml.push('</table>');
				qrgRightHtml.push('</div>');
			//判断是否显示报表，快速导航跟报表只能显示一个，当有快速导航显示时，不可以同时选择显示报表
			}else if (config.isshowreport == "true" && config.reportlist.length>0) {
			    qrgRightHtml.push('<div id="reportShow" style="display:block;">');
				qrgRightHtml.push('    <div  class="title_report">')
				qrgRightHtml.push('        <ul>');
				//循环报表列表
                for(var o = 0; o < config.reportlist.length; o++){
                    //默认显示第一张报表
				    if(o == 0){
					    qrgRightHtml.push('<li class="selected" onclick="switchReportshow(this,' + (o+1) + ',' + config.reportlist.length + ',\''+config.reportlist[o].fcasip+'\',\''+config.reportlist[o].reportorimage+'\',\''+config.session+'\',\''+config.userCode+'\',\''+config.reportlist[o].pserver+'\',\''+config.reportlist[o].reportparam+'\',\''+config.year+'\')">图表' + (o+1) + '</li>');
					    //qrgRightHtml.push('<li class="selected" onclick="switchReport(this,' + (o+1) + ',' + config.reportlist.length + ')">图表' + (o+1) + '</li>');
					}else{
					    qrgRightHtml.push('<li class="noselected" onclick="switchReportshow(this,' + (o+1) + ',' + config.reportlist.length + ',\''+config.reportlist[o].fcasip+'\',\''+config.reportlist[o].reportorimage+'\',\''+config.session+'\',\''+config.userCode+'\',\''+config.reportlist[o].pserver+'\',\''+config.reportlist[o].reportparam+'\',\''+config.year+'\')">图表' + (o+1) + '</li>');
					    //qrgRightHtml.push('<li class="noselected" onclick="switchReport(this,' + (o+1) + ',' + config.reportlist.length + ')">图表' + (o+1) + '</li>');
					}
				}
				qrgRightHtml.push('		  </ul>');
				qrgRightHtml.push('    </div>');
				qrgRightHtml.push('</div>');
				/*追加--------------------修改*/
				//循环报表的长度，取出每一个报表
				for(var k=1;k<config.reportlist.length+1;k++){
					//如果有公告，则报表的高度是一半的，
					if (config.isbulletin == "true"){
						//默认第一个显示出来，其他的都隐藏
						if(k==1){
							qrgRightHtml.push('<div id="report_'+k+'" style="height:210px;" style="display:block;">');
					 		qrgRightHtml.push('</div>');
						}else{
							qrgRightHtml.push('<div id="report_'+k+'" style="height:210px;" style="display:none;">');
					 		qrgRightHtml.push('</div>');
						}
						//如果没有公告，报表的高度占满
					}else{
						//默认第一个显示出来，其他的都隐藏
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
			//显示公告
			if(config.isbulletin == "true"){
			//debugger;
			    Ext.lt.portal.component.login.config=config;
			    qrgRightHtml.push('<div class="title_orange"><table width=100% border="0"><tr><td>公告</td><td align="right"><input style="width:70px;height:20px;background:url(../portal/images/viewall.gif) no-repeat left top;cursor:pointer;border:0;" type="button" onclick="Ext.lt.portal.component.login.openPost();"/></td></tr></table></div>');
			    //根据快速导航和报表是否显示来控制公告模块的高度
			    if(config.quickguidMenu.length > 0 || (config.isshowreport == "true" && config.reportlist.length>0)){
			        qrgRightHtml.push('<marquee direction=up scrollamount=1 scrolldelay=50 onMouseOver="stop()" onMouseOut="start()" style="cursor: pointer; color: #000000; height: expression(document.body.clientHeight-window_top.offsetHeight-400);">');
				}else{	
					qrgRightHtml.push('<marquee direction=up scrollamount=1 scrolldelay=50 onMouseOver="stop()" onMouseOut="start()" style="cursor: pointer; color: #000000; height: expression(document.body.clientHeight-window_top.offsetHeight-180);">');
                }
               //debugger;
                //循环公告列表
				for(var i = 0; i < config.postList.length; i++){
				    //公告对象
					var post =config.postList[i];
					//qrgRightHtml.push('<div class="gonggao">');
					qrgRightHtml.push('<div style="border-bottom:1px #ccc dotted; margin-top:10px;  line-height:25px;">');
					qrgRightHtml.push('    <img src="' + _ROOT_PATH_ + '/images/done_btn/news.gif" />');
					qrgRightHtml.push('	   <a onclick=\'preview("' + config.contextpath + '","' + post.id + '")\'>');
					//根据公告级别判断是否红色字体显示
					if(post.postlevel == "03"){
					    qrgRightHtml.push('    <font color=red>');
						qrgRightHtml.push(post.posttitle);
						qrgRightHtml.push('	   </font>');
						qrgRightHtml.push('		</a>');
					    qrgRightHtml.push('(' + post.createtime + ')');                       
					//普通公告
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
			//右下部
			qrgRightHtml.push(    '<div id="default_bottom_simple">');
			qrgRightHtml.push(        '<div style="width:100%;"><span></span></div>');				
			qrgRightHtml.push(    '</div>');
		    qrgRightHtml.push('</div>');
		}
		return qrgRightHtml.join('');
	};
	
	/************登录首页对象*******************************************************/
 	this.ifmisCommonDefault = function (config,servers) {
 		config.totalmenus = config.totalmenus.toArray();
 		Ext.lt.portal.component.login.config=config;
 	    //首页HTML数组对象
 	    var defaultHTML = [];
		//cs业务系统默认地址写入注册报及kookie
		//mainMenuHtml.push(config.str_cs);
		/***********首页头部信息**************/
		if(config.sxindexjsp!="31"){
			defaultHTML.push('<div id="window_top">');
			defaultHTML.push('    <div id="top"> ');
			 //系统首页log区域
		    defaultHTML.push(logoArea(config));
		    //系统菜单展示区域
		    defaultHTML.push(mainMenuShow(config));
			//首页头部信息
			defaultHTML.push('    </div>');
			defaultHTML.push('</div>');
		}else{
	    //系统首页log区域
	    defaultHTML.push(logoArea(config));
	    //系统菜单展示区域
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
		defaultHTML.push('<div class="leftparttitle">我的业务系统</div>');
		defaultHTML.push('<div id="basic-accordian1" >');
		defaultHTML.push('<div class="item_jg">&nbsp;</div>');
		
		//记录cs系统个数  大于0时显示 业务程序地址管理菜单
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
		   //用户对照对象
		     var userComObj = new Array();
		 	//广西南宁UKey登陆后拔掉仍能单点登陆的问题
		 	var ischeckUkey = config.portalIsCheckUkey;
		     var userCompare = config.userCompare;
		        for(var u = 0; u < userCompare.length; u++){
		        	userComObj[userCompare[u].BUSIGN] = userCompare[u];
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
            	var formTarget = "_blank";
            	if(menu.opentype!=null&&menu.opentype==2){
            		formTarget = "";
            	}
            	 // end 楚艳红 2012.12.10 获取客户端ip
		     if(!menu.menuid){
		    	 var sign = menu.sign;
			   
					
					var programcode = leftcode.split(",")[ct];	
					
		    	 	if(programcode==code){
		    	 		sbst=sbst+leftcode.split(",")[ct]+","+ct+";";
		    		if("portal"==sign){	    		
		    			defaultHTML.push('<li><a href="#" onclick ="ClickGg();">公告</a></li>');
		    			defaultHTML.push('<li><a href="#" onclick ="ClickBw();">备忘录</a></li>');
		    			
		    		}else{		    			
		    		    var programparas = config.programparas;
		    		    if(programparas!=null&&programparas[menu.code]!=null){
		    		        menu.parameters = programparas[menu.code];
		    		    }else{
		    		        menu.parameters=[];
		    		    }
		    			//如果是b/s系统
		                if (menu.type == 1){
		                	
		                	 // end 楚艳红 2012.12.10 获取客户端ip
		                    /**根据业务系统开发商进行区分（1：太极华清系统 2：龙图系统 4: 不同服务的一体化系统菜单 5：甘肃第三方业务系统不配合而自己开发的单点登录控件  6：未实现系统）*/
		                    //如果是不同服务的一体化系统菜单
		                    if (menu.tjhqprogram == 4){
		                        //暂时不实现，不知道哪个地区在用
		                    //处理甘肃第三方业务系统不配合而自己开发的单点登录控件
		                    }else if (menu.tjhqprogram == 5){		                                       
		                                //未实现业务系统）  
		                    }else if (menu.tjhqprogram == 6){
		                        defaultHTML.push('<li><a href="#"');
		    				    defaultHTML.push(' onclick="javascript:alert(\'' + promsg + '\');">' + menu.name + '</a>┆</li>');
		                    //ASP系统  
		                    }else if (menu.tjhqprogram == 7){
		                    	defaultHTML.push('<li><a href="#" onclick="bclick(\''+menu.code+'\');">' + menu.name + '</a>');
		                        //将参数放到表单隐藏域中
		    	    			defaultHTML.push('<form id="app' + menu.code + '" name="app' + menu.code + '" method="get" action="' + menurl + '" style="display:none">');					    	//循环系统参数
		    			    	//循环系统参数
		    			    	for(var j = 0; j < menu.parameters.length; j++){
		    			    	    var parameter = menu.parameters[j];
		    				    	defaultHTML.push('<input type="text" name="' + parameter.parametername + '" value="' + parameter.parametervalue + '"/>');
		    			    	}
		    			    	//用户编码
		    				    defaultHTML.push('<input type="text" name="uid" value="' + config.userCode + '"/>');
		    				    //sessionId
		    				    defaultHTML.push('<input type="text" name="sid" value="' + config.session + '"/>');
		    				    //财政年度
		    				    defaultHTML.push('<input type="text" name="year" value="' + config.year + '"/></form>');
		    		    		defaultHTML.push('</li>');
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
		    					    	defaultHTML.push('<form id="app' + menu.code + '" name="app' + menu.code + '" method="post" action="' + menurl + '" style="display:none">');					    	//循环系统参数
		    					    	//循环系统参数
		    					    	for(var j = 0; j < menu.parameters.length; j++){
		    					    	    var parameter = menu.parameters[j];
		    						    	defaultHTML.push('<input type="text" name="' + parameter.parametername + '" value="' + parameter.parametervalue + '"/>');
		    					    	}
		    					    	//用户编码
		    						    defaultHTML.push('<input type="text" name="uid" value="' + comUcode + '"/>');
		    						    //sessionId
		    						    defaultHTML.push('<input type="text" name="sid" value="' + config.session + '"/>');
		    						    //财政年度
		    						    defaultHTML.push('<input type="text" name="year" value="' + config.year + '"/></form>');
		    				    		defaultHTML.push('</li>');	
		    				    	//BO系统单点登录			    	
		    				        }else if (menu.sign == "BOZHCX"){
		    				            //需要实现----------------------------------
		    				        }else {
		    				        	defaultHTML.push('<li><a href="#" onclick="bclick(\''+menu.code+'\');">' + menu.name + '</a>');
		    					    	// 将参数放到表单中提交
		    					    	defaultHTML.push('<form id="app' + menu.code + '" name="app' + menu.code + '" method="post" action="' + menurl + '"  target="'+formTarget+'" style="display:none">');                            //循环系统参数
		                                //循环系统参数
		    					    	for(var j = 0; j < menu.parameters.length; j++){
		    					    		var parameter = menu.parameters[j];
		    						    	defaultHTML.push('<input type="text" name="' + parameter.parametername + '" value="' + parameter.parametervalue + '"/>');
		    					    	}
		    					    	//用户编码
		    						    defaultHTML.push('<input type="text" name="uid" value="' + comUcode + '"/>');
		    						    //sessionId
		    						    defaultHTML.push('<input type="text" name="sid" value="' + config.session + '"/>');
		    						    //财政年度
		    						    defaultHTML.push('<input type="text" name="year" value="' + config.year + '"/></form>');
		    				    		defaultHTML.push('</li>');	
		    				        }
		                        }
		                    
		                    }
		                //cs系统
		                }else{
		                    cscount=cscount+1;
		                    /**cs业务系统类型: 1:太极华清业务系统 */
		                    //太极华清业务系统
		                    if (menu.tjhqprogram == 1){
		                        //华清预算编制单位版(efmdiv)或财政供养单位版(dfczdiv)
		                        if(menu.sign == "efmdiv" || menu.sign == "dfczdiv"){
		                        	defaultHTML.push('<li><a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){loadAppcaller();AppCaller.callApp(\'');
		                        //华清其他cs业务系统
		                        }else {
		                        	defaultHTML.push('<li><a href="javascript:if(isCheckUeyOutOrIn('+ischeckUkey+')){loadAppcaller();AppCaller.callHqApp(\'');
		                        }
		                        //业务系统标识
		                        defaultHTML.push(menu.sign + '\',\'');
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
		                        	defaultHTML.push('|exp|' + comUcode.toLowerCase());
		                        //指标系统系统管理
		                        }else if(menu.sign == "indisys"){
		                        	defaultHTML.push('|indi|' + comUcode.toLowerCase());
		                        //正常华清业务系统
		                        }else{
		                        	defaultHTML.push('|' + menu.sign + '|' + comUcode.toLowerCase());
		                        }
		                        //如果华清系统配置了数据库参数，华清系统可能连接不同年度的数据库，默认取第一个
		                        if(dbs.length > 0){
		                            //业务系统数据库对象
		                        	var db = dbs[0];
		                        	defaultHTML.push('|' + db.dbstr);
		                        }
		                        //是否需要sessionID
		                        if(menu.needsid ==1 ){
		                        	defaultHTML.push('|' + config.session);
		    					}
		    					//组装业务系统参数
		    					for(var j = 0; j < menu.parameters.length; j++){
		    						defaultHTML.push('|' + menu.parameters[j].parametervalue);
		    					}
		    					defaultHTML.push('\');}">' + menu.name + '</a>');
		    					//如果业务系统存在多条数据库配置
		    					if(dbs.length>1){
		    					    //在菜单后放置一图标，支持鼠标放下事件，鼠标放下后弹出财政年度下拉选择框
		    						defaultHTML.push('&nbsp;<IMG id="img' + menu.code + '" alt="切换库" src="' + _ROOT_PATH_ + '/images/list.gif" style="margin-top:10px;cursor:pointer;" onmouseover="mvqMOv(\'img' + menu.code + '\',\'panelDiv' + menu.code + '\')";>');
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
		    					defaultHTML.push('</li>');
		    					//判断Tjhqprogram为5的，是调用新控件的地方，拼成的连接地址,甘肃某系统
		                    }else if (menu.tjhqprogram == 5){                     
		                    }else if (menu.tjhqprogram == 6){
		                    	defaultHTML.push('<li><a href="javascript:alert(\'' + promsg + '\'');
		                    	defaultHTML.push(');"> ' + menu.name + '</a>');
		                    	defaultHTML.push('</li>');
		    				//其他cs业务系统
		                    }else {
		                            //龙图平台客户端系统
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
		    						//其他业务系统
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
        defaultHTML.push('</div><!--菜单结束-->');
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
	    defaultHTML.push('<button class="nomalbtn" id="sxfilebcbtn" onclick="SaveFile()">保存</button>&nbsp;');
	    defaultHTML.push('<button class="nomalbtn" id="sxfileqxbtn" >取消</button>');
	    defaultHTML.push('</center></td></tr>');
		defaultHTML.push('</table></form>');
		defaultHTML.push(' </div>');
		defaultHTML.push(' </div></td>');
		defaultHTML.push('<td valign="top" id="sxgg" style="display:none;">');
		
		defaultHTML.push('<div class="noticearea">');
		defaultHTML.push('<div class="contenttitlebg"><div class="titletb">新闻公告</div></div>');
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
        defaultHTML.push('<div class="contenttitlebg"><div class="titletb">备忘录</div></div>');
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
        defaultHTML.push(' <div class="addbw" title="点击增加备忘" onclick="ClickBwNew();"></div>');
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
        			defaultHTML.push(' <p class="bwitems"><a href="#" onclick="UpdateBw(\''+bwList[w].NO+'\',\''+bwList[w].BWDETAIL+'\',\''+systemdate+'\');">'+bwList[w].BWDETAIL+'</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onclick="DeleteBw(\''+bwList[w].NO+'\');">删除</a></p>');
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
	    defaultHTML.push(' <td width="100px" class="thele">备忘内容：</td>');
	    defaultHTML.push(' <td><textarea class="textarestyle" onpropertychange="if(value.length>1500) value=value.substr(0,1500)" id="bwdetail"></textarea></td>');
	    defaultHTML.push(' </tr>');
	    defaultHTML.push('<tr>');
	    defaultHTML.push('<td width="100px" class="thele">录入日期：</td>');
	    defaultHTML.push('<td><input type="hidden" id="bwsxno" value=""><font size="2" color="red">'+systemdate+'</font><input type="hidden" id="bwsxhidden" value="0"></td>');
	    defaultHTML.push('</tr>');
	    defaultHTML.push('</table>');
	    defaultHTML.push(' </div>');
	    defaultHTML.push('<div style="height:10px;">&nbsp;</div>');
	    defaultHTML.push('<center>');
	    defaultHTML.push('<button class="nomalbtn" id="sxbcbtn" onclick="SaveBw(\''+systemdate+'\')">保存</button>&nbsp;');
	    defaultHTML.push('<button class="nomalbtn" id="sxqxbtn" >取消</button>');
	    defaultHTML.push('</center>');
	    defaultHTML.push('</div>');
	    defaultHTML.push('</div>');		
		}else{
		if(config.isshowtask!=null&&config.isshowtask==1){
			defaultHTML.push('<div id="default_main" style="display:block;overflow:auto; position:relative; background:url(/portal/images/portalwelcome.jpg) no-repeat center top;margin-bottom: 0px;" layout="{h:{fit:true,min:300},w:{fit:true,min:750}}">');
			defaultHTML.push('</div>');
		}else{
			/***********待办事项、公告等区域信息**************/	
			defaultHTML.push('<div id="default_main" style="display:block;overflow:auto; position:relative;margin-bottom: 0px;" layout="{h:{fit:\'auto\',min:300},w:{fit:true,min:750}}">');
	        //待办事项展示区域
	        defaultHTML.push(pendingTaskShow(config));
	        //右侧快速导航、报表、公告展示区域
	        defaultHTML.push(qrgRightShow(config));
			defaultHTML.push('</div>');
		}
		}
	    //定义存储页面panel对象
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
			//resize时改变待办div的宽度
			var w = document . body . clientWidth;
			var tempwidth=w-(w/100)*3-483;
			tempwidth=w-520;
			if(document.getElementById('default_center')!=null){
				//document.getElementById('default_center').style.width=tempwidth;
			}
		});
		*/
		defaultPanel.on('afterlayout',function(panel){
		//页面加载后再加载待办事项内容
		//var pdStr = pendingTaskShowAfter(config);
		//document.getElementById("default_middle_simple").innerHTML = pdStr;
			if(!panel.drawing){
					setTimeout(function(){
							if (config.quickguidMenu.length <= 0 && config.isshowreport == "true" && config.reportlist.length>0) {
										//报表的pserver属性
										var report_pserver_tem = config.reportlist[0].pserver;
										//传递给综合查询的报表参数
										var report_param_tem = config.reportlist[0].reportparam;
										//是否显示图形还是表
										var report_reportorimage_tem = config.reportlist[0].reportorimage;
										//综合查询的IP地址
										var report_fcasip_tem = config.reportlist[0].fcasip;
											createScript_tem(report_fcasip_tem+'/fcas/js/outermouse.js',1,function(){
												createScript_tem(report_fcasip_tem+'/fcas/js/zapatec.js',2,function(){
													createScript_tem(report_fcasip_tem+'/fcas/js/tree.js',3,function(){
														createScript_tem(report_fcasip_tem+'/fcas/js/outerchart.js',4,function(){
															createScript_tem(report_fcasip_tem+'/fcas/system/fuscharinfor/js/FusionCharts.js',5,function(){
																//如果显示的是图形，则调综合查询的查询图形的接口
																if(report_reportorimage_tem!=null && report_reportorimage_tem == "1"){
																	var report_sid = config.session;
																	var report_uid = config.userCode;
																	var report_pserver = report_pserver_tem;
																	var report_param = report_param_tem;
																	var report_year = config.year;
																	var report_fcasip = report_fcasip_tem ;
																	var divid = "report_1";
																	//创建综合查询的js
																	try{
																		var tableObj = queryChartOut(report_param);
															  			tableObj.outParameter({uid:report_uid,sid:report_sid,pserver:report_pserver,acctYear:report_year,divId:divid,height:'210',width:'437',refresh:'0',fcasIp:report_fcasip,tparams:report_param});
																	}catch(e){
																		divid.innerHTML="综合查询服务器"+report_fcasip_tem+"/fcas无法访问";
																	}
																	/**/
																	//如果不是图形，调综合查询的查询报表的接口
																}else{
																	var report_sid = config.session;
																	var report_uid = config.userCode;
																	var report_pserver = report_pserver_tem;
																	var report_param = report_param_tem;
																	var report_year = config.year;
																	var report_fcasip = report_fcasip_tem ;
																	var divid = "report_1";
																	//创建综合查询的js
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
			/*自动调用首页功能，相当于与首页自动刷新*/
			if(config.refreshtime!=null){
			
				var refreshtime = config.refreshtime;
				if(refreshtime!=0){
					window.setTimeout("window.location.href='"+_ROOT_PATH_ + "/defaultcommon.page';", refreshtime);
				}
			}	
			//获取session失效与否，如果session失效，弹出提示，关闭窗口
			if(config.sessiontime!=null){
			
				var refreshtime = config.sessiontime;
				if(refreshtime!=0){
					window.setTimeout("window.location.href='/getsession.do';", refreshtime);
				}
			}	
			//判断旧密码是否符合密码规则（配置项）zjm
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
	//强制显示登录的用户的公告
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
   		postHtml.push(' <div style="width:100%; text-align:center">第&nbsp;&nbsp;<span id="showpre"></span>&nbsp;&nbsp;/&nbsp;&nbsp;<span id="showMaxPage"></span>&nbsp;&nbsp;页');
   		postHtml.push('<input type="button" value="上一页" class="button_style" onmouseover="this.className=\'OverBtn\'" onmouseout="this.className=\'button_style\'" onmousedown="this.className=\'down\'" onclick="upPage()" id="upbutton"/>');
   		postHtml.push('<input type="button" value="下一页" class="button_style" onmouseover="this.className=\'OverBtn\'" onmouseout="this.className=\'button_style\'" onmousedown="this.className=\'down\'" onclick="nextPage()" id="nextbutton"/>');
   		postHtml.push('<input type="button" id="closewid" disabled="true" value="关闭"  onmouseover="this.className=\'OverBtn\'" onmouseout="this.className=\'button_style\'" onmousedown="this.className=\'down\'" class="button_style" onclick="closewin()"/>');
    	postHtml.push('</div>'); 
		
		var win =new Ext.Window({    
			id:'postwin',    
		    width : document.body.clientWidth/2-100,
			height : document.body.clientHeight-40,			
			title : "公告",
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
	//下一页的判断
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
  	//上一页的判断
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
  	//关闭
  	function closewin(){
  		Ext.getCmp('postwin').close();
  		Ext.getCmp("defaultId").getEl().unmask();
  	}
//预览公告
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

//更改之后暂时不用
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
						//加载js  1--report_fcasip_tem
				createScript_tem(report_fcasip_tem+'/fcas/js/outermouse.js',1,function(){
					createScript_tem(report_fcasip_tem+'/fcas/js/zapatec.js',2,function(){
						createScript_tem(report_fcasip_tem+'/fcas/js/tree.js',3,function(){
							createScript_tem(report_fcasip_tem+'/fcas/js/outerchart.js',4,function(){
								createScript_tem(report_fcasip_tem+'/fcas/system/fuscharinfor/js/FusionCharts.js',5,function(){
									//如果显示的是图形，则调综合查询的查询图形的接口 
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
										//创建综合查询的js
										var tableObj = queryChartOut(report_param);
								  		tableObj.outParameter({uid:report_uid,sid:report_sid,pserver:report_pserver,acctYear:report_year,divId:divid,height:'210',width:'437',refresh:'0',fcasIp:report_fcasip,tparams:report_param});
										/**/
										//如果不是图形，调综合查询的查询报表的接口
									}else{
										var divid = "report_"+p;
										//创建综合查询的js
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

//*******************************************Ext.lt.portal.component.ifmis 开始****************************************************************************************************
Ext.lt.portal.component.ifmis=new function(){
	this.config="";
	/**待办事项展示  外层div*/
//{isbulletin:,quickguidMenu:,isshowreport:,userCode:}
	this.pendingTaskShow=function(config){
	    //待办事项存储数组对象
	    var pendingTaskHtml = [];
	    //判断是否只显示待办事项（如果公告、快速导航、报表都不显示）
		if (config.isbulletin == "false" && config.quickguidMenu.length == 0 && config.isshowreport == "false") {
			pendingTaskHtml.push('<div id="default_center" style="width:100%">');
		//分左右两部分显示
		}else {
			var tempwidth=(document . body . clientWidth/100)*3+483;
	       // pendingTaskHtml.push('<div id="default_center" layout="{w:{fit:-527}}" style=" float: left; margin-left: 1%; margin-top: 1%;">');
			pendingTaskHtml.push('<div id="default_center" style="width: expression(document . body . clientWidth-'+tempwidth+'); float: left; margin-left: 1%; margin-top: 1%;">');
		
		}
		//待办事项展示区域标题
		pendingTaskHtml.push('       <div id="default_top_simple">');
		pendingTaskHtml.push('           <div style="width:100%;"><span>待办事项</span></div>');
		pendingTaskHtml.push('       </div>');
		//待办事项正文区域展示
		pendingTaskHtml.push('       <div data-id="p-task-container" id="default_middle_simple" style="height: expression(document.body.clientHeight-logo.offsetHeight-menu.offsetHeight-120);">');
		pendingTaskHtml.push('       </div>');
		pendingTaskHtml.push('       <div id="default_bottom_simple">');
		pendingTaskHtml.push('	         <div style="width:100%;"><span></span></div>');
		pendingTaskHtml.push('       </div>');
	    pendingTaskHtml.push('    </div>');
	    return pendingTaskHtml.join('');
	};
	/**************待办事项查询返回结果展示**********改成window.onload时加载待办 此方法就不需要*/ 
	this.showPendingTask=function(config){
	    //待办事项展示对象集合
	    var totallist = config;
	    for(var index = 0;index < totallist.length; index++)
	    {   
	        //业务系统待办事项对象，例如：指标系统
		    var pendingtasks=totallist[index];
		    //定义待办事项存储数组对象
		    var taskStrHtml = [];
		    //如果业务系统需要显示待办事项
		    if(pendingtasks.size()>0){
		       //如果是生长业务系统
			   if(pendingtasks[0].outter!=1)
			   {   
			       //如果业务系统不存在待办事项
				   if(!pendingtasks[0].name)
				   {
				        //业务系统ID
					    var k=pendingtasks[0].k;
					    //业务系统名称
						var menuname=pendingtasks[0].menuname;
						//显示业务系统名称
						taskStrHtml.push('<p style="display:block; overflow:auto;">');
						taskStrHtml.push('<a class=inner_title >' + menuname + '&nbsp&nbsp&nbsp&nbsp<b style="color:#000; font-weight:normal;"></b>' + '</a>');
						taskStrHtml.push('</p>');
			       }
			       //如果业务系统存在待办事项
			       else{
			           //用户换行
					   var count=0;
					   //显示业务系统名称
					   taskStrHtml.push('<p style="height:150px; display:block; overflow:auto;">');
					   taskStrHtml.push('<a class=inner_title >' + pendingtasks[0].menuname + '</a>');
					   //业务系统中待办事项展示表格
					   taskStrHtml.push('<table width=98% border=0 cellpadding=0 cellspacing=0>');
					   //循环业务系统子系统,例如：总指标加载、单位指标调剂等等
				       for(i=0; i<pendingtasks.size();i++) {
				       		count++;
				       		//具体业务系统子系统对象
							var pendingtask= pendingtasks[i];
							//业务系统子系统待办事项对象，例如：待审核、待打印等等
							var details = pendingtask.details;
							//子系统服务地址
							var hostip = pendingtask.hostip;
							//子系统服务端口
							var hostport=pendingtask.hostport;
							//子系统本地服务地址
							var localip = pendingtask.localip;
							//子系统本地服务端口
							var localport=pendingtask.localport;
							//用户编码
							var uid=pendingtask.uid;
							//业务系统菜单ＩＤ
							var k = pendingtask.k;
							//sessionID
							var sid=pendingtask.sid;
							//财政年度
							var year=pendingtask.year;
							//是否换行
							if(count%2==1)
							{
			      				taskStrHtml.push('<tr>');
			    			}
			    			//子系统待办事项展示
							taskStrHtml.push('<td width="45%" style="vertical-align:top;">' + '<span>');
							//子系统名称前的闪动图标
							taskStrHtml.push('<img src="' + _ROOT_PATH_ + '/images/bg/top.gif"/>');
							taskStrHtml.push(pendingtask.name + '----->共' + pendingtask.totalcount + '条<br/>');
							//遍历子系统待办事项，例如：待审核、待打印等
							for(j=0;j<details.size();j++)
							{ 
							    //子系统待办事项前边图标
							    taskStrHtml.push('&nbsp' + '<img src="' + _ROOT_PATH_ + '/images/bg/20.png" />');
							    //子系统待办事项对象，例如：待审核、待打印等
							    detail=details[j];
							    //子系统待办事项链接地址
							    var url="http://"+hostip+":"+hostport+detail.linkName;
							    //替换链接地址中的不规则字符
							    url=url.replace(/&/g, "%26");
							    //如果业务系统的服务地址为空则使用当前系统的默认地址
							    if(hostip == "" && hostport == ""){
							       taskStrHtml.push('<a href="' + _ROOT_PATH_);
							       taskStrHtml.push(detail.linkName + '">');
							    }  
							    //如果如果业务系统的服务地址与当前服务地址相同则使用当前系统的默认地址 
							    else if(hostip == localip && hostport == localport)
								{
							       taskStrHtml.push('<a href="' + _ROOT_PATH_);
							       taskStrHtml.push(detail.linkName + '">');
							    }
							    //跨服务接入生长业务系统
							    else{
							       taskStrHtml.push('<a href="http://');
							       taskStrHtml.push(hostip + ':' + hostport + '/common/pendingtasklogin.do' + '?uid=' + uid + '&sid=' + sid + '&year=' + year + '&url=' + url + '">');
							    }
							    //显示具体代办事项内容
							    taskStrHtml.push('&nbsp待' + detail.operattypedto.name + '&nbsp' + detail.totalcount + '条</a>');
				   				taskStrHtml.push('<br/>');   
						    } 
							taskStrHtml.push('</span>' + '</td>');
							//子系统是否换行
							if(count%2==0){
			      			    taskStrHtml.push('</tr>');
			    			}  
					    }
						taskStrHtml.push('</table>');
						taskStrHtml.push('</p>');
				    }
			   }
			   //如果为接入待办事项
			   if(pendingtasks[0].outter==1){
				   //循环业务系统子系统信息
				   for(i=0; i<pendingtasks.size();i++) {
				   	  taskStrHtml.push('<p>');
				   	  //子系统对象，例如：总指标加载、单位指标调剂
				      pendingtask= pendingtasks[i];
				      //业务系统ID
				      var k=pendingtask.k;
				      //子系统具体待办事项，例如：待审核、待打印等
				      var details = pendingtask.details;
				      //子系统名称集合
				      var name_tem = pendingtask.name_tem;
				      //业务系统前边闪动图标
				      taskStrHtml.push('<img src="' + _ROOT_PATH_ + '/images/bg/top.gif"/>');
				      //如果是bs业务系统
				      if(pendingtask.type==1)
					  {  
				      	taskStrHtml.push('<a href="' + pendingtask.Url + '" target="_blank">');
				      	//业务系统名称
				      	taskStrHtml.push(pendingtask.name + '</a>');
				      //如果是cs业务系统
				      }else{
				      	taskStrHtml.push('<a href="' + pendingtask.Url + '">');
				      	//业务系统名称
				      	taskStrHtml.push(pendingtask.name + '</a>');
				      }
				      //如果待办事项条数大于零
				      if(pendingtask.count>0){
				        taskStrHtml.push('----->共' + pendingtask.count + '条<br/>');
				       }
				       taskStrHtml.push('<br/>'); 
				       taskStrHtml.push('<span>');
				       //子系统名称集合为多条，则用table来存放业务系统中不同子系统的待办事项
				       if(name_tem.size()>0){
					        taskStrHtml.push('<table border=0>');
					        //循环遍历业务系统子系统
					       	for(o=0;o<name_tem.size();o++){
					       	//处理换行标记
					       	if(o%2==0)
								{
				      				taskStrHtml.push('<tr>');
				    			}
					       	    taskStrHtml.push('<td width="300" style="vertical-align:top;">');
					       	    //系统名称前的图标
					       		taskStrHtml.push('&nbsp' + '<img src="' + _ROOT_PATH_ + '/images/bg/20.png" />');
					       		//子系统名称
					       		taskStrHtml.push(name_tem[o]);	       		
					       		taskStrHtml.push('<br/>');
					       		//循环遍历子系统对应代办事项，例如待审核、待打印等
					       		for(j=0;j<details.size();j++)
								   { 
								      //子系统待办事项对象，例如待审核、待打印等
								      detail=details[j];
								      //如果子系统待办事项条数大于0
								      if(detail.totalcount>0){
								          //如果子系统名称与待办事项中对应子系统名称一致，则把待办事项放入对应子系统区域中
									      if(detail.menuname == name_tem[o] ){
									         //如果是bs系统
									         if(pendingtask.type==1)
									         {  
									         	taskStrHtml.push('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + '<a href="' + detail.JobUrl + '" target="_blank">' + detail.status + '<' + detail.totalcount + '条></a>');
									         	taskStrHtml.push('<br/>');
					                         }
					                         //如果是CS系统
					                         else
					                         {
					                            taskStrHtml.push('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + detail.status + '&nbsp;<' + detail.totalcount + '条>');
					                            taskStrHtml.push('<br/>'); 
					                         }
					                       }
								       }
								       //如果如果子系统待办事项条数等于0
								       if(detail.totalcount==0){
								           taskStrHtml.push('&nbsp' + detail.status); 
								           taskStrHtml.push('<br/>'); 
								        }								        
							       }					       		
					       		taskStrHtml.push('</td>');
					       		//是否换行
					       		if(o%2==1)
								{
				      				taskStrHtml.push('</tr>');
				    			}
					       	}
					       	taskStrHtml.push('</table>');
				       //子系统名称集合为1条,则不用table展示
				       }else{
				           //循环遍历子系统待办事项
					       for(j=0;j<details.size();j++)
						   {
						      //子系统待办事项对象
						      detail=details[j];
						      taskStrHtml.push('&nbsp' + '<img src="' + _ROOT_PATH_ + '/images/bg/20.png" />');
						     //如果是bs系统
					         if(pendingtask.type==1)
					         {  
					            //如果子系统待办事项大于0条
					            if(detail.totalcount>0){
						         	taskStrHtml.push('<a href="' + detail.JobUrl + '" target="_blank">' + detail.status + '<' + detail.totalcount + '条></a>');
					         	}else{
					         		taskStrHtml.push('<a href="' + detail.JobUrl + '" target="_blank">' + detail.status + '</a>');
					         	}
	                         }
	                         //如果是cs系统
	                         else
	                         {
	                            //如果子系统待办事项大于0条
	                         	if(detail.totalcount>0){
	                            	taskStrHtml.push(detail.status + '&nbsp;<' + detail.totalcount + '条>');
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
		   //把各业务系统对应的待办事项信息放入其对应ＤＩＶ中
		   document.getElementById(k).innerHTML = taskStrHtml.join('');
	   }//for
	};
	
	/***********右侧快速导航、报表、公告展示区域***********/
	
	this.qrgRightShow=function(config){
	config.isbulletin="false";
	
	    //定义对象存储数组
	    var qrgRightHtml = [];
	    //判断快速导航、报表、公告是否有一个需要显示）
		if (config.isbulletin == "true" || config.quickguidMenu.length > 0 || config.isshowreport == "true") {
			//待办事项右侧显示区域
		    qrgRightHtml.push('<div id="default_center" style="width:482px; float: left; margin-left: 1%; margin-top: 1%;">');
		    //右上部
			qrgRightHtml.push(    '<div id="default_top_simple" >');
			qrgRightHtml.push(	      '<div style="width:100%;"><span></span></div>');
			qrgRightHtml.push(    '</div>');
			//右中部
		    qrgRightHtml.push(    '<div id="default_middle_simple" style="height: expression(document.body.clientHeight-logo.offsetHeight-menu.offsetHeight-120); background-image: none; background-repeat: no-repeat; background-position: right bottom;">');
			qrgRightHtml.push(        '<span id="middle_inner">'); 
			//判断是否显示快速导航(如果显示)
			if (config.quickguidMenu.length > 0){
				qrgRightHtml.push(            '<div  class="title_orange">快速导航</div>');
				//根据是否显示公告来判断快速导航区域的高度
			    if (config.isbulletin == "true"){
				    qrgRightHtml.push('<div style="height:210px; overflow-y:scroll;">');
			    }else {
			   	    qrgRightHtml.push('<div style="height: expression(document.body.clientHeight-logo.offsetHeight-menu.offsetHeight-190);overflow-y:scroll;">');
			    }
			    qrgRightHtml.push('<table width="90%" border="0" cellpadding="0" cellspacing="0">');
				for(var i = 0; i < config.quickguidMenu.length; i++){
				    //快速导航对象
				    var guidMenu =config.quickguidMenu[i];
				    //3个一行
				    if(i%3==0){
				        qrgRightHtml.push('<tr valign="top">');
				    }
				    qrgRightHtml.push('       <td align="center" style="padding-top:2px;" width="32%">');
				    //图片
				    qrgRightHtml.push('           <img style="margin-left:20px;" src="' + _ROOT_PATH_ + '/images/bg/quick_before_small.gif" onMouseOver="this.src=\'' + _ROOT_PATH_ + '/images/bg/quick.gif\'" onMouseOut="this.src=\'' + _ROOT_PATH_ + '/images/bg/quick_before_small.gif\'" onClick="location.href=\'' + guidMenu.inputaddurl + '\'">');
				    qrgRightHtml.push('           <br/>');
				    qrgRightHtml.push('           <a href="' + guidMenu.inputaddurl + '" style="font-size:12px; margin-top:2px;">' + guidMenu.menuname + '</a>');
				    //处理快速当行滚动条位置
				    if((i+1)%6==0){
				        qrgRightHtml.push('<br/><br/>')
				    }
				    qrgRightHtml.push('       </td>');
				    //行结束符
					if((i+1)%3 == 0 || i == config.quickguidMenu.length - 1){
					    qrgRightHtml.push('</tr>');
					}
				}
				qrgRightHtml.push('</table>');
				qrgRightHtml.push('</div>');
			//判断是否显示报表，快速导航跟报表只能显示一个，当有快速导航显示时，不可以同时选择显示报表
			}else if (config.isshowreport == "true") {
			    qrgRightHtml.push('<div id="reportShow" style="display:block;">');
				qrgRightHtml.push('    <div  class="title_report">')
				qrgRightHtml.push('        <ul>');
				//循环报表列表
                for(var o = 0; o < config.reportlist.length; o++){
                    //默认显示第一张报表
				    if(o == 0){
					    qrgRightHtml.push('<li class="selected" onclick="switchReport(this,' + (o+1) + ',' + config.reportlist.length + ')">图表' + (o+1) + '</li>');
					}else{
					    qrgRightHtml.push('<li class="noselected" onclick="switchReport(this,' + (o+1) + ',' + config.reportlist.length + ')">图表' + (o+1) + '</li>');
					}
				}
				qrgRightHtml.push('		  </ul>');
				qrgRightHtml.push('    </div>');
				qrgRightHtml.push('</div>');
			}
			debugger;
			//显示公告
			
			if(config.isbulletin == "true"){
			debugger;
			    qrgRightHtml.push('<div class="title_orange"><table width=100% border="0"><tr><td>公告</td><td align="right"><input style="width:70px;height:20px;background:url(../portal/images/viewall.gif) no-repeat left top;cursor:pointer;border:0;" type="button" onclick="Ext.lt.portal.component.login.openPost();"/></td></tr></table></div>');
			    //根据快速导航和报表是否显示来控制公告模块的高度
			    if(config.quickguidMenu.length > 0 || config.isshowreport == "true"){
			        qrgRightHtml.push('<marquee direction=up scrollamount=1 scrolldelay=50 onMouseOver="stop()" onMouseOut="start()" style="cursor: pointer; color: #000000; height: expression(document.body.clientHeight-logo.offsetHeight-menu.offsetHeight-280);">');
				}else{	
					qrgRightHtml.push('<marquee direction=up scrollamount=1 scrolldelay=50 onMouseOver="stop()" onMouseOut="start()" style="cursor: pointer; color: #000000; height: expression(document.body.clientHeight-logo.offsetHeight-menu.offsetHeight-60);">');
                }
                
                //循环公告列表
				for(var i = 0; i < config.postList.length; i++){
				
				    //公告对象
					var post =config.postList[i];
					qrgRightHtml.push('<div style=\"border-bottom:1px #ccc dotted; margin-top:10px;  line-height:25px;\">');
					qrgRightHtml.push('    <img src="' + _ROOT_PATH_ + '/images/done_btn/news.gif" />');
					qrgRightHtml.push('	   <a onclick=\'preview("","' + post.id + '")\'>');
					//根据公告级别判断是否红色字体显示
					if(post.postlevel == "3"){
					    qrgRightHtml.push('    <font color=green>');
						qrgRightHtml.push(post.posttitle);
						qrgRightHtml.push('	   </font>');
						qrgRightHtml.push('		</a>');
					    qrgRightHtml.push('(' + post.createtime + ')');
					    qrgRightHtml.push('    <img src="' + _ROOT_PATH_ + '/images/done_btn/news.gif" />');
					//普通公告
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
			//右下部
			qrgRightHtml.push(    '<div id="default_bottom_simple">');
			qrgRightHtml.push(        '<div style="width:100%;"><span></span></div>');				
			qrgRightHtml.push(    '</div>');
		    qrgRightHtml.push('</div>');
		}
		return qrgRightHtml.join('');
	};
	
	// 采用门户框架实现logo组件
	this.logo=function(servers,config){
	    //首页logo区域
	    var logoHtml = [];	
        logoHtml.push('<div id="logo" >');
        logoHtml.push('    <table width="100%" border="0" cellspacing="0" cellpadding="0">');
        logoHtml.push('        <tr>');
        logoHtml.push('            <th rowspan="2" nowrap="nowrap"></th>');
        logoHtml.push('            <td  nowrap="nowrap">');
        //是否显示退出按钮
        if(config.exitshow == "1"){
            logoHtml.push('	           <div><a title="退出" href="' + _ROOT_PATH_ + '/logout.page"><img src="' + _ROOT_PATH_ + '/images/actions/exit.gif" width="16" height="16" border="0"/> 退出 </a></div><div class="w_gang"></div>');
        }
        //首页刷新按钮
        logoHtml.push('                <div><a title="刷新" href="' + _ROOT_PATH_ + '/defaultcommon.page"><img src="' + _ROOT_PATH_ + '/images/actions/house.gif" width="16" height="16" /> 刷新</a></div><div class="w_gang"></div>');
        //字号大小设置
        logoHtml.push('                <div><img src="' + _ROOT_PATH_ + '/images/actions/font_size.gif" width="16" height="16" border="0" title="字号" /><a href="#" onclick="setFont(\'l\')">大</a><a href="#" onclick="setFont(\'m\')"> 中</a><a href="#" onclick="setFont(\'s\')"> 小</a></div><div class="w_gang"></div>');
        //是否显示修改密码按钮(显示修改密码按钮并且不是ca登录)
        if(config.passwordshow == "1" && config.isportalca == "false"){
            logoHtml.push('                <div><a title="修改密码" href="' + _ROOT_PATH_ + '/portal/login/mod_password.jsp" target="_blank"><img src="' + _ROOT_PATH_ + '/images/actions/mod_pwd.gif" width="16" height="16" border="0"/> 修改密码</a></div><div class="w_gang"></div>');
        }
        //是否显示内网登录按钮
        if(config.intranetConfig == "true"){
            logoHtml.push('                <div><a title="进入内网" href="' + _ROOT_PATH_ + '" target="_blank"><img src="' + _ROOT_PATH_ + '/images/actions/go_innerNet.gif" width="16" height="16" /> 内网</a></div><div class="w_gang"></div>');   
        }
        logoHtml.push('                    <div class="w_head"></div>');   
        logoHtml.push('                </td>');
        logoHtml.push('                <td width="6" nowrap="nowrap" class="w_right">&nbsp;</td>');
        logoHtml.push('            </tr>');
        logoHtml.push('            <tr>');
        logoHtml.push('                <td nowrap="nowrap"  class="welcomeA">');
        //多地区登录需要处理（福建使用）
        //<%if(area_name != null && area_name != ""){ %>
       	//财政:<%=area_name%> 
        //<%}%> 
        //登录财政年度
        logoHtml.push('                年度:' + config.year );
        //用户单位信息
        if(config.agencyType != null){
            logoHtml.push(config.agencyType + ':' + config.agencyName);         
        }else if (config.agencyName != null){
            logoHtml.push('单位:' + config.agencyName); 
        }
        //用户编码信息
        logoHtml.push('用户:' + config.userCode);
        //当前系统日期
        var s="";   

        if(config.agencyType != null){
            logoHtml.push('日期:');
        }else {
            logoHtml.push('系统日期:');
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
	
// 采用门户框架实现菜单组件
	this.menu=function(servers,config){
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
	    mainMenuHtml.push('        <li>┆</li>'); 
	    /**开始插入系统菜单信息*/
	    //菜单能承受的最大宽度
	    var menuwidth = window.screen.width - 50;
	    //实际菜单宽度
	    var menulength = 1;
	    for (var i = 0; i < config.totalmenus.length; i++){
	        //菜单对象 
	        var menu = config.totalmenus[i]
	        //计算菜单宽度
	        menulength = menulength + menu.name.length+1;
	        //如果是多行显示
	        if (config.isshowmenus == "true"){
	            //处理换行
				if(menulength*16>=menuwidth){
					//换行
					mainMenuHtml.push('<br><li>┆&nbsp;</li>');;
					menulength=1;
				}
	        }
	        //如果是一体化菜单
	        if(menu.menuid){
	            mainMenuHtml.push('<li><a href="' + _ROOT_PATH_ + menu.clientmodule+'?mainmenu=' + menu.menuid + '">' + menu.name + '</a>┆</li>');
	        //如果是接入菜单
	        }else {
	            /**根据不同业务系统类型进行特殊处理（1：b/s系统  2：c/s系统  3：日志类型-暂时不清楚有那个地方在使用）*/
	            //未实现系统提示信息
	            var promsg = "此系统还没有进行接入，无法进行单点登录";
	            //如果是b/s系统
	            if (menu.type == 1){
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
	                //未实现业务系统）  
	                }else if (menu.tjhqprogram == 6){
	                    mainMenuHtml.push('<li><a href="#"');
					    mainMenuHtml.push(' onclick="javascript:alert(\'' + promsg + '\');">' + menu.name + '</a>┆</li>');
	                //其他业务系统（主要是符合龙图默认b/s业务系统接入规范的第3方业务系统）  
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
	                            mainMenuHtml.push('<li><a href="#" onclick="app' + menu.code + '.submit();return false;">' + menu.name + '</a>');
	                            //将参数放到表单隐藏域中
						    	mainMenuHtml.push('<form id="app' + menu.code + '" name="app' + menu.code + '" method="post" action="' + menu.url + '" style="display:none">');
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
					    	//BO系统单点登录			    	
					        }else if (menu.sign == "BOZHCX"){
					            //需要实现----------------------------------
					        //其他正常业务系统
					        }else {
	                            mainMenuHtml.push('<li><a href="#" onclick="app' + menu.code + '.submit();return false;">' + menu.name + '</a>');
						    	// 将参数放到表单中提交
						    	mainMenuHtml.push('<form id="app' + menu.code + '" name="app' + menu.code + '" method="post" action="' + menu.url + '" target="_blank" style="display:none">');
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
                            mainMenuHtml.push('<li><a href="javascript:loadAppcaller();AppCaller.callApp(\'');
                        //华清其他cs业务系统
                        }else {
                            mainMenuHtml.push('<li><a href="javascript:loadAppcaller();AppCaller.callHqApp(\'');
                        }
                        //业务系统标识
                        mainMenuHtml.push(menu.sign + '\',\'');
	                    //存储业务系统对应数据库列表信息
	                    var dbs = {};
	                    //数据库查询参数对象
	                    var dbsConfig = {};
	                    //业务系统编码
	                    dbsConfig.programCode = menu.code;
	                    //财政年度
	                    dbsConfig.year = config.year;
	                    //查询业务系统对应数据库信息
                        Ext.lt.RCP.server('defaultCommonService', "getDbConfig",  dbsConfig, function (resp) {
                            dbs = resp;
                        });
	                    //存储业务系统对应子系统列表信息
	                    var subPrograms = {};
	                    //查询业务系统对应子系统信息
                        Ext.lt.RCP.server('defaultCommonService', "getSubPrograms",  menu.code, function (resp) {
                            subPrograms = resp;
                        });
                        //判断如果是部门预算的系统管理，也传exp
                        if(menu.sign = "expxtgl"){
                            //用户编码
                        	mainMenuHtml.push('|exp|' + config.userCode.toLowerCase());
                        //指标系统系统管理
                        }else if(menu.sign == "indisys"){
                        	mainMenuHtml.push('|indi|' + config.userCode.toLowerCase());
                        //正常华清业务系统
                        }else{
                        	mainMenuHtml.push('|' + menu.sign + '|' + config.userCode.toLowerCase());
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
						mainMenuHtml.push('\');">' + menu.name + '</a>');
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
											 menudiv.push('<a href="javascript:loadAppcaller();AppCaller.callApp(\'');
				                        }else{
											 menudiv.push('<a href="javascript:loadAppcaller();AppCaller.callHqApp(\'');
				                        }
										 mainMenuHtml.push(program.getSign() + '\',\'');
										 //判断如果是部门预算的系统管理，也传exp
										 if(menu.sign == "expxtgl"){
                        					menudiv.push('|exp|' + config.userCode.toLowerCase());
                        				//如果是指标系统的系统管理
                        				}else if(menu.sign == "indisys"){
                        					menudiv.push('|indi|' + config.userCode.toLowerCase());
                        				}else{
                        					menudiv.push('|' + menu.sign + '|' + config.userCode.toLowerCase());
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
										menudiv.push('\');">');
									 }
									 //数据库名称
									 menudiv.push(db.dbname);
									 //如果不存在子系统则结束拼装
									 if(subPrograms.length == 0){
									 	menudiv.push('</a>');
									 }
									 menudiv.push('</div>');
									 //如果存在子系统
									 for(var h = 0; h < subprograms.length; h++){ 
									     //子系统对象
									     var subprogram = subprograms[h];
										 menudiv.push('<div class="divline" nowrap>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:loadAppcaller();AppCaller.callHqApp(\'');
										 //业务系统标识
										 menudiv.push(menu.sign + '\',\'');
										 //判断如果是部门预算的系统管理，也传exp
										 if(menu.sign == "expxtgl"){
                        					menudiv.push('|exp|' + config.userCode.toLowerCase());
                        				 //指标系统系统管理
                        				 }else if(menu.sign == "indisys"){
                        					 menudiv.push('|indi|' + config.userCode.toLowerCase());
                        				 }else{
                        					 menudiv.push('|' + subprogram.sign + '|' + config.userCode.toLowerCase());
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
	                     	mainMenuHtml.push('<li><a href="javascript:yszxxt1(\'');
	                     	//系统标识
	                     	mainMenuHtml.push(menu.sign + '\',\'');
	                     	//用户编码+sessionID
					        mainMenuHtml.push('uid=' + config.userCode + ' sid=' + config.session + 'LT\'');
	                     	mainMenuHtml.push(');"> ' + menu.name + '</a>');
							mainMenuHtml.push('┆</li>');
	                     }
	                     if(menu.sign == "yszxxt2"){
	                     	mainMenuHtml.push('<li><a href="javascript:yszxxt2(\'');
	                     	//系统标识
	                     	mainMenuHtml.push(menu.sign + '\',\'');
	                     	//用户编码+sessionID
					        mainMenuHtml.push('uid=' + config.userCode + ' sid=' + config.session + 'LT\'');
	                     	mainMenuHtml.push(');"> ' + menu.name + '</a>');
							mainMenuHtml.push('┆</li>');
	                     }
	                     if(menu.sign == "jzzfdw"){
	                     	mainMenuHtml.push('<li><a href="javascript:jzzfdw(\'');
	                     	//系统标识
	                     	mainMenuHtml.push(menu.sign + '\',\'');
	                     	//用户编码+sessionID
					        mainMenuHtml.push('uid=' + config.userCode + ' sid=' + config.session + 'LT\'');
	                     	mainMenuHtml.push(');"> ' + menu.name + '</a>');
							mainMenuHtml.push('┆</li>');
	                     }
	                     if(menu.sign == "gwkzf"){
	                        mainMenuHtml.push('<li><a href="javascript:gwkzf(\'');
	                     	//系统标识
	                     	mainMenuHtml.push(menu.sign + '\',\'');
	                     	//用户编码+sessionID
					        mainMenuHtml.push('uid=' + config.userCode + ' sid=' + config.session + 'LT\'');
	                     	mainMenuHtml.push(');"> ' + menu.name + '</a>');
							mainMenuHtml.push('┆</li>');
	                     }if(menu.sign == "jzzfdws"){
	                     	 mainMenuHtml.push('<li><a href="javascript:jzzfdws(\'');
	                     	//系统标识
	                     	mainMenuHtml.push(menu.sign + '\',\'');
	                     	//用户编码+sessionID
					        mainMenuHtml.push('uid=' + config.userCode + ' sid=' + config.session + 'LT\'');
	                     	mainMenuHtml.push(');"> ' + menu.name + '</a>');
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
		                            mainMenuHtml.push('<li><a href="javascript:loadAppcaller();AppCaller.callApp(\'');
		                            mainMenuHtml.push(menu.sign + '\',\'');
				                    mainMenuHtml.push('uid=' + config.userCode + ' sid=' + config.session + 'LT');
									for(var j = 0; j < menu.parameters.length; j++){
									    mainMenuHtml.push(' ');
		                                mainMenuHtml.push(menu.parameters[j].parametername + '=' + menu.parameters[j].parametervalue);
									}
									mainMenuHtml.push('\');"> ' + menu.name + '</a>');
									mainMenuHtml.push('┆</li>');
							//其他业务系统
				            }else {
		                            mainMenuHtml.push('<li><a href="javascript:loadAppcaller();AppCaller.callApp(\'');
		                            mainMenuHtml.push(menu.sign + '\',\'');
				                    mainMenuHtml.push('uid=' + config.userCode + ' sid=' + config.session);
									for(var j = 0; j < menu.parameters.length; j++){
									    mainMenuHtml.push(' ');
		                                mainMenuHtml.push(menu.parameters[j].parametername + '=' + menu.parameters[j].parametervalue);
									}
									mainMenuHtml.push('\');"> ' + menu.name + '</a>');
									mainMenuHtml.push('┆</li>');
				            }
	                }
	            
	            } //CS业务系统还是BS业务系统
	        } //一体化菜单还是接入菜单
	    } //循环遍历所有菜单
	    if(cscount>0){
	    	mainMenuHtml.push('<li><a href="/common/applocation.do"> 业务程序地址管理</a>┆</li>');
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
	
	
	// 采用门户框架实现Ifmis系统2.2风格
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
				//resize时改变待办div的宽度
				var tempwidth=w-(w/100)*3-483;
				document.getElementById('default_center').style.width=tempwidth;
				//cmp.style.width=w+'px'
				//cmp.style.height=h+'px'
			}
		}
		return portalPanel;
    }
};
//**********************************************Ext.lt.portal.component.ifmis  结束****************************************************************
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

//臧家妹 2011-11-30 BUG-33308 修改开始 添加预览全部公告按钮事件
Ext.lt.portal.component.login.openPost = function (){
		var reps=Ext.lt.portal.component.login.config.postList;		
		var postHtml = [];	
		postHtml.push('<div style="text-align:center; background-color:#fff;  line-height:25px;width:787px; height:320px; overflow-y:scroll;">');
		postHtml.push('<table width=96% border=0 cellspacing="0" cellpadding="0">');
		postHtml.push('<tr><td align="left" class="title_orange" style="padding-left:20px;">公告标题</td>');
		postHtml.push('<td width="30%" align="left" class="title_orange">创建时间</td></tr>');
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
			title : "全部公告",
			resizable : false,
			buttonAlign :'center',
			buttons :[{
					text:"关闭",
					pressed:true, 
					handler:function () {
						win.close();
				}
			}],
			html:postHtml.join('')
	});	
	win.show();
}
//臧家妹 2011-11-30 BUG-33308 修改结束****************************************************************************************
//弹出强制修改密码框
Ext.lt.portal.component.login.showmodpasswordwin = function (){
	var modpassword = ['<div id="popPage"><div id="shenhe_title">'
	,'<div id="shenhe_title_middle"></div></div>'
	,'<div id="pop_inner2">  <br/><div id="table_list_title"><ul><li class="top"><div><font size="2">密码修改</font><font color="red" size="2">(密码须由6-16个字母和数字组成，不能全是数字)</font></div></li></ul></div><div id="edit_table" style="padding-left:0;">'
	,'<form name="form1" id="form1" action="/template/commons/modifypwd.do" method="post">'
	,'<table width="100%" border="0" cellpadding="0" cellspacing="0"> <tr>'
	,'<th>旧密码<span><font color="red">*</font></span></th>'
	,'<td><input type="password" name="oldpwd" /></td>'
	,'</tr><tr>'
	,'<th>新密码<span><font color="red">*</font></span></th> <td><input type="password" name="newpwd" /></td> </tr>'
	,'<tr><th>确认密码<span><font color="red">*</font></span></th> <td><input type="password" name="newpwd1" /></td> </tr>'
	,'<tr style="display:none;">'
	,'<td style="display:none"><input type="hidden" name="commonCode" value ="<%=commonCode %>"></td>'
	,'<td style="display:none"><input type="hidden" name="ui_logo_area" value ="<%=ui_logo_area %>"></td></tr></table>'
	,'</form>'
	,'</div></div>'
	,'<center>'
	,'<input type="button" class="button_style" onmouseover="this.className=\'OverBtn\'" onmouseout="this.className=\'button_style\'" onmousedown="this.className=\'down\'" value="确定" onclick="modpwd()"/>'
	//,'<input type="button" class="button_style" onmouseover="this.className=\'OverBtn\'" onmouseout="this.className=\'button_style\'" onmousedown="this.className=\'down\'" value="关闭" onclick="modpasswordwin.close();"/>'
	,' </div>'
	]

	var modpasswordwin =new Ext.Window({        
			id:"modpasswordwin",        
		    width : 500,
			//height : 380,			
			title : "密码修改",
			resizable : false,
			autoHeight:true,
			buttonAlign :'center',
			closable:false,
			/*buttons :[{
					text:"关闭",
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
		alert("请填写原先密码");
		return false;
	}
	if(document.form1.newpwd==null||document.form1.newpwd.value==""){
		alert("请填写新密码");
		return false;
	}
	if(document.form1.newpwd.value.length<6){
		alert("密码长度最少6位");
		document.form1.newpwd.value ="";
		document.form1.newpwd1.value ="";
		return false;
	}
	if(document.form1.newpwd.value.length>16){
		alert("密码长度不能大于16位");
		document.form1.newpwd.value ="";
		document.form1.newpwd1.value ="";
		return false;
	}
	if(document.form1.newpwd1==null||document.form1.newpwd1.value==""){
		alert("请填写确认密码");
		return false;
	}
	if(document.form1.newpwd1.value != document.form1.newpwd.value){
		alert("两次输入的新密码不一致");
		return false;
	}
	//if(ui_logo_area_tem == 'chongqing'){
	var password = document.form1.newpwd.value;
	var reg = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{2,})$/;	
	var r = reg.test(password);
	if(!r){
		alert("请输入由数字和字母组成的密码!");
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
  					alert("修改成功");
  					Ext.getCmp('modpasswordwin').close();
  					Ext.getCmp("defaultId").getEl().unmask();
  				}else{
  					alert(resp);
  				}
    });
    //document.form1.submit();
}
//厦门邮件系统待办事项链接到明细  获取相应参数sid和mid
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
//点击显示公告
function ClickGg(){
    document.getElementById("sxgg").style.display = 'block';
	document.getElementById("sxbw").style.display = 'none';

}
var s=0;
//点击显示备忘
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
//点击显示备忘新增
function ClickBwNew(){
	document.getElementById("fitmodedemo1").style.display = 'block';
	var wind=new Ext.lt.window({
		title:'新增备忘录',
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
//新增备忘 保存
function SaveBw(bwtime){
	var bwdetail = document.getElementById("bwdetail").value;
	if(bwdetail==""){
		alert("备忘内容不能为空!");
		return false;
	}else{
	var para = {};
	para.bwdetail=bwdetail;
	para.bwtime = bwtime;
	para.bwsxhidden = document.getElementById("bwsxhidden").value;
	para.no = document.getElementById("bwsxno").value;
	Ext.lt.RCP.server('defaultCommonService', "saveBw",  para, function (resp) {   
		if(resp.ret=="0"){
			alert("保存失败!");
			return false;
		}else{
			alert("保存成功!");
			sxqxbtn.onclick();
			var defaultHTML=[];
			var bwTimeList = resp.bwTimeList;
		        var bwList = resp.bwList;
		        for(var b=0;b<bwTimeList.length;b++){
		        	var time = bwTimeList[b].TIME;
		        	defaultHTML.push('<div class="bw_datetype">'+time+'</div>');
		        	for(var w=0;w<bwList.length;w++){
		        		if(time==bwList[w].BWTIME){
		        			defaultHTML.push(' <p class="bwitems"><a href="#" onclick="UpdateBw(\''+bwList[w].NO+'\',\''+bwList[w].BWDETAIL+'\',\''+systemdate+'\');">'+bwList[w].BWDETAIL+'</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onclick="DeleteBw(\''+bwList[w].NO+'\');">删除</a></p>');
		        		}
		        	}
		        }	
		    document.getElementById("contentsbw").innerHTML = defaultHTML.join('');
		}
	});	
	}
}
//删除备忘
function DeleteBw(no){
	var para = {};
	para.no=no;
	Ext.lt.RCP.server('defaultCommonService', "deleteBw",  para, function (resp) {   
		if(resp.ret=="0"){
			alert("删除失败!");
			return false;
		}else{
			alert("删除成功!");
			var defaultHTML=[];
			var bwTimeList = resp.bwTimeList;
		        var bwList = resp.bwList;
		        for(var b=0;b<bwTimeList.length;b++){
		        	var time = bwTimeList[b].TIME;
		        	defaultHTML.push('<div class="bw_datetype">'+time+'</div>');
		        	for(var w=0;w<bwList.length;w++){
		        		if(time==bwList[w].BWTIME){
		        			defaultHTML.push(' <p class="bwitems"><a href="#" onclick="UpdateBw(\''+bwList[w].NO+'\',\''+bwList[w].BWDETAIL+'\',\''+systemdate+'\');">'+bwList[w].BWDETAIL+'</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onclick="DeleteBw(\''+bwList[w].NO+'\');">删除</a></p>');
		        		}
		        	}
		        }	
		    document.getElementById("contentsbw").innerHTML = defaultHTML.join('');
		}
	});	
	
}
//备忘录更新
function UpdateBw(no,bwdetail,bwtime){
	document.getElementById("fitmodedemo1").style.display = 'block';
	var wind=new Ext.lt.window({title:'修改备忘录',className:'wind7',pop:'true',w:'500',h:'240',mark:'true'});
	wind.draw(fitmodedemo1);
	sxqxbtn.onclick=function(){
		wind.close();
	}	
	document.getElementById("bwdetail").value=bwdetail;	
	document.getElementById("bwsxhidden").value="1";
	document.getElementById("bwsxno").value=no;
}
//左侧主菜单点击加载子菜单
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

//时间定时更新
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