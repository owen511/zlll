//Ext.lt.portal.component.common.IfmisDefaultTitle
if (Ext.lt.portal.component == null) {
	Ext.lt.portal.component = {};
}

Ext.lt.portal.component.allpengding = new function () {
	this.server="";
	this.havependingtask = false;
	this.getALLpengdingtask = function (config,server) {
	//待办事项初始高度
	var offset = 30;
	var pdHeight = (document.body.clientHeight-54)/2+19 - offset;
	var imageHeight = pdHeight;
	Ext.lt.portal.component.allpengding.server = server;
		var setHtml = []; 
		var objHtml = "<table border=\"0\" cellpadding=\"0\"  cellspacing=\"0\">";
	    objHtml = objHtml + "<tr><td>";
	    objHtml = objHtml + "<div style=\"height:60px;\"><img src=\"../portal/images/loading_green.gif\" /> ";
	    objHtml = objHtml + "<div id='pBarTextId'>\u5904\u7406\u4e2d\uff0c\u8bf7\u7a0d\u540e......</div>";
	    objHtml = objHtml + "</div></td></tr></table>";
		var alltaskpanel = new Ext.Panel({title:config.name,panelheight:pdHeight,height:pdHeight+offset, html:"<div align=\"center\" id=\"default_allpengding\" style=\"height:"+pdHeight+"px;overflow-x:hidden;overflow-y:auto;padding:'2 0 0 0';\"><table width=100% height=100%><tr><td align=\"center\" valign=\"middle\">"+objHtml+"</td></tr></table></div>"});
		alltaskpanel.getname=function(){
			return alltaskpanel.title;
		}
		/*
		//框架滚动条
		alltaskpanel.on("afterlayout",function(){
			if(!alltaskpanel.loadpask){
				Ext.lt.template.loadmask(alltaskpanel);
				alltaskpanel.loadpask=true;
			}
		});
		*/
		
		//发送call请求，获取待办事项信息
		Ext.lt.RCP.call(Ext.lt.portal.component.allpengding.server, "getTask", config , function (resp) {
			setHtml.push("<div style=\"height:"+imageHeight+"px;overflow:auto;padding:'2 0 0 10';background:url(../portal/images/pendingtask.gif) no-repeat right bottom;\">");
			setHtml.push("<table border='0' style=\"width:95%;line-height:20px;\">");
			var tasks_list = resp.tasks_list;
			var tasknumber = true ;
      
			//循环每个系统的待办事项进行显示
			for(var i=0;i<tasks_list.length;i++){
				var program_type = tasks_list[i].program_type;
				var program_sign = tasks_list[i].program_sign;
				var program_url = tasks_list[i].program_url;
				var program_name = tasks_list[i].program_name;
				var url = tasks_list[i].URL;
				var tasks = tasks_list[i].tasks;
				var details_name = tasks_list[i].details_name;
				var program_totalnum = tasks_list[i].program_totalnum;
				//alert(program_type+'-'+program_sign+'-'+program_url+'-'+program_name);
				//如果有待办事项进行显示，如果没有不显示
				if(tasks!=null &&tasks.length>0){
					//判断业务系统类型1为BS 2为CS
					if(program_type==1){
						if(tasks[0].jobnum!=null){
							tasknumber = false;
							/*
							setHtml.push("<tr><td style=\"width:50%; font-size='12'\">");
								setHtml.push("<a href=\""+url+"\" target='_blank'><font size='2'><b>"+program_name+"</b></font></a>");
								setHtml.push("</td></tr>");
								for(k=0;k<tasks.size();k++){
									setHtml.push("<tr><td colspan='2' style=\"width:50%; font-size='12'\" >");
									setHtml.push("<img src=\"../portal/images/news.gif\"/>");
									if(null!=tasks[k].jobnum){
										if(tasks[k].jobnum>=0){
											setHtml.push("<a onclick=\"Ext.lt.portal.component.zfcgpengding.pengdingshow()\" href=\""+tasks[k].joburi+"\" target=\"_blank\">"+tasks[k].statusname+"("+tasks[k].jobnum+"条)</a><br>");
										}else{
											setHtml.push("<a onclick=\"Ext.lt.portal.component.zfcgpengding.pengdingshow()\" href=\""+tasks[k].joburi+"\" target=\"_blank\">"+tasks[k].statusname+"</a><br>");
										}
									}else{
										setHtml.push(tasks[k].statusname+"<br>");
									}
									setHtml.push("</td></tr>");
								}
								*/
								setHtml.push("<tr><td style=\"width:50%; font-size='12'\">");
								if(program_totalnum>0){
									setHtml.push("<img src=\"../portal/images/top.gif\" /><a href=\""+url+"\" target='_blank'><font size='2'><b>"+program_name+"---->共"+program_totalnum+"条</b></font></a>");
								}else{
									setHtml.push("<img src=\"../portal/images/top.gif\" /><a href=\""+url+"\" target='_blank'><font size='2'><b>"+program_name+"</b></font></a>");
								}
								setHtml.push("</td></tr>");
								if(details_name.size()>0){
									for(o=0;o<details_name.size();o++){
								       	if(o%2==0)
											{
							      				setHtml.push("<tr>");
							    			}
								       	    setHtml.push("<td valign='top' style=\"width:50%; font-size='12';\">");
								       		setHtml.push("&nbsp"+"<img src=\"../portal/images/20.png\" />");
								       		setHtml.push(details_name[o]);
								       		setHtml.push("<br/>");
								       		for(j=0;j<tasks.size();j++)
										   	{
										      //taskStr=taskStr+"&nbsp"+"<img src=\"<%=request.getContextPath()%>/images/bg/20.png\" />";
										      if(tasks[j].jobnum>0){
										      if(tasks[j].menuname == details_name[o] ){
						                            //setHtml.push("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+tasks[j].statusname+"&nbsp;<"+tasks[j].jobnum+"条>");
						                            setHtml.push("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+"<a onclick=\"Ext.lt.portal.component.allpengding.pengdingshow()\" href=\""+tasks[j].joburi+"\" target=\"_blank\">"+tasks[j].statusname+"("+tasks[j].jobnum+"条)</a>");
						                            setHtml.push("<br/>"); 
						                       }
										       }else if(tasks[j].jobnum<0){
										    	   setHtml.push("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+"<a onclick=\"Ext.lt.portal.component.allpengding.pengdingshow()\" href=\""+tasks[j].joburi+"\" target=\"_blank\">"+tasks[j].statusname+"</a>");
						                           setHtml.push("<br/>"); 
						                       }
										       if(tasks[j].jobnum==0){
										           setHtml.push("&nbsp"+tasks[j].statusname); 
										           setHtml.push("<br/>"); 
										        }
									       	}
								       		setHtml.push("</td>");
								       		if(o%2==1)
											{
							      				setHtml.push("</tr>");
							    			}
							    			if(o%2==0 && o==details_name.size()-1){
							    				setHtml.push("</tr>");
							    			}
								       	}
								}else{
									for(k=0;k<tasks.size();k++){
										setHtml.push("<tr><td colspan='2' style=\"width:50%;height:20px; line-height:20px;font-size='12'\" >");
										setHtml.push("<img src=\"../portal/images/20.png\"/>");
										if(null!=tasks[k].jobnum){
											if(tasks[k].jobnum>=0){
												setHtml.push("<a onclick=\"Ext.lt.portal.component.allpengding.pengdingshow()\" href=\""+tasks[k].joburi+"\" target=\"_blank\">"+tasks[k].statusname+"("+tasks[k].jobnum+"条)</a><br>");
											}else{
												setHtml.push("<a onclick=\"Ext.lt.portal.component.allpengding.pengdingshow()\" href=\""+tasks[k].joburi+"\" target=\"_blank\">"+tasks[k].statusname+"</a><br>");
											}
										}else{
											setHtml.push(tasks[k].statusname+"<br>");
										}
										setHtml.push("</td></tr>");
									}
								}
								setHtml.push("<tr style='height:10px; '><td colspan='2'><p style='border:1px #CCC dotted;'></p></td></tr>");
						}
					}else{
						if(tasks[0].jobnum>0){
							tasknumber = false;
							//如果分类名不为空，则进行分类显示
							setHtml.push("<tr><td>");
							setHtml.push("<img src=\"../portal/images/top.gif\" /><a href=\""+url+"\"><font size='2'><b>"+program_name+"---->共"+program_totalnum+"条</b></font></a>");
							setHtml.push("</td></tr>");
							if(details_name.size()>0){
								for(o=0;o<details_name.size();o++){
							       	if(o%2==0)
										{
						      				setHtml.push("<tr>");
						    			}
							       	    setHtml.push("<td valign='top' style=\"width:50%; font-size='12';\">");
							       		setHtml.push("&nbsp"+"<img src=\"../portal/images/20.png\" />");
							       		setHtml.push(details_name[o]);
							       		setHtml.push("<br/>");
							       		for(j=0;j<tasks.size();j++)
									   	{
									      //taskStr=taskStr+"&nbsp"+"<img src=\"<%=request.getContextPath()%>/images/bg/20.png\" />";
									      if(tasks[j].jobnum>0){
									      if(tasks[j].menuname == details_name[o] ){
					                            setHtml.push("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+tasks[j].statusname+"&nbsp;<"+tasks[j].jobnum+"条>");
					                            setHtml.push("<br/>"); 
					                       }
									       }
									       if(tasks[j].jobnum==0){
									           setHtml.push("&nbsp"+tasks[j].statusname); 
									           setHtml.push("<br/>"); 
									        }
								       	}
							       		setHtml.push("</td>");
							       		if(o%2==1)
										{
						      				setHtml.push("</tr>");
						    			}
						    			if(o%2==0 && o==details_name.size()-1){
						    				setHtml.push("</tr>");
						    			}
							       	}
						       	}else{
						       		for(u=0;u<tasks.size();u++){
										setHtml.push("<tr><td colspan='2' style=\"width:50%;height:20px; line-height:20px;font-size='12'\" >");
										setHtml.push("<img src=\"../portal/images/20.png\"/>");
										if(null!=tasks[u].jobnum){
											if(tasks[u].jobnum>=0){
												//setHtml.push("<a onclick=\"Ext.lt.portal.component.allpengding.pengdingshow()\" href=\""+tasks[u].joburi+"\">"+tasks[u].statusname+"("+tasks[u].jobnum+"条)</a><br>");
												setHtml.push(tasks[u].statusname+"&nbsp;<"+tasks[u].jobnum+"条>");
											}else{
												//setHtml.push("<a onclick=\"Ext.lt.portal.component.allpengding.pengdingshow()\" href=\""+tasks[u].joburi+"\" target=\"_blank\">"+tasks[u].statusname+"</a><br>");
												setHtml.push(tasks[u].statusname+"&nbsp;<"+tasks[u].jobnum+"条>");
											}
										}else{
											setHtml.push(tasks[u].statusname+"<br>");
										}
										setHtml.push("</td></tr>");
									}
						       	}
						       	setHtml.push("<tr style='height:10px; '><td colspan='2'><p style='border:1px #CCC dotted;'></p></td></tr>");
						}
					}
				}
			}
			if(tasknumber){
				setHtml.push("<tr><td style=\"width:50%; font-size='12'\">");
				setHtml.push("<img src=\"../portal/images/top.gif\" /><font size='2'><b>无待办事项</b></font>");
				setHtml.push("</td></tr>");
			}
			setHtml.push("</table>");
			setHtml.push("</div>");
			/*
			//框架关闭滚动条
			Ext.lt.template.closeloadmask(alltaskpanel);
			*/
			alltaskpanel.body.update(setHtml.join(''));
		});
		return alltaskpanel;
	};
	this.pengdingshow = function(){
		var item=Ext.getCmp("mainbody").get(0).items.items[0].items.items;
		item=item.concat(Ext.getCmp("mainbody").get(0).items.items[1].items.items);
		Ext.getCmp("lefttreemenu").getEl().unmask();
		for(var i=0;i<item.size();i++){
			item[i].getEl().unmask();
		}
	};
	this.deploy = function () {
		this.show = function (com,fn) {
			if (Ext.getCmp("iframe_indipendingtaskparam") == null) {
				new Ext.Window({title:"默认窗口配置", width:700, height:400, layout:"column", plain:true, id:"iframe_indipendingtaskparam", items:[
						{columnWidth:0.5, layout:"form", border:false, items:[{id:"iframe_indipendingtaskparam_name", xtype:"textfield", fieldLabel:"待办事项名称", name:"name"}]}, 
						{columnWidth:0.5, layout:"form", border:false, items:[{id:"iframe_indipendingtaskparam_procode", xtype:"textfield", fieldLabel:"接入系统的code", name:"procode"}]}
						], buttons:[{text:"\u5b8c\u6210", handler:function () {
							var config=new Object();
							config.name=Ext.getCmp("iframe_indipendingtaskparam_name").getValue();
							config.url=Ext.getCmp("iframe_indipendingtaskparam_procode").getValue();
							fn(config,"defaultiframe");
						Ext.getCmp("iframe_indipendingtaskparam").hide();
				}}]});
			}
			Ext.getCmp("iframe_indipendingtaskparam").show();
			Ext.getCmp("iframe_indipendingtaskparam_name").setValue("");
			Ext.getCmp("iframe_indipendingtaskparam_procode").setValue("");
		};
	};
};

