//Ext.lt.portal.component.common.IfmisDefaultTitle
if (Ext.lt.portal.component == null) {
	Ext.lt.portal.component = {};
}

Ext.lt.portal.component.zfcgpengding = new function () {
	this.havependingtask = false;
	this.getZFCGpengdingtask = function (menuinfo,server) {
		var task_list = menuinfo.pengdingtask;
		//待办事项的类型，1--BS  2--CS
		var task_type = menuinfo.program_type;
		//待办事项的一级name
		var name_tem = menuinfo.name_tem;
		var setHtml = []; 
		setHtml.push("<div style=\"height:210px;overflow:auto;padding:'10 0 0 10';\">");
		setHtml.push("<table style=\"width:100%;\">");
		if(task_type == 1){
			for(var i=0;i<task_list.size();i++){
				setHtml.push("<tr><td style=\"height:23px; font-size='14'\" >");
				setHtml.push("<img src=\"../portal/images/news.gif\"/>");
				if(null!=task_list[i].jobnum){
					Ext.lt.portal.component.zfcgpengding.havependingtask = true;
					if(task_list[i].jobnum>=0){
						setHtml.push("<a onclick=\"Ext.lt.portal.component.zfcgpengding.pengdingshow()\" href=\""+task_list[i].joburi+"\" target=\"_blank\">"+task_list[i].statusname+"("+task_list[i].jobnum+"条)</a><br>");
					}else{
						setHtml.push("<a onclick=\"Ext.lt.portal.component.zfcgpengding.pengdingshow()\" href=\""+task_list[i].joburi+"\" target=\"_blank\">"+task_list[i].statusname+"</a><br>");
					}
				}else{
					setHtml.push(task_list[i].statusname+"<br>");
				}
				setHtml.push("</tr></td>");
			}
			setHtml.push("</table>");
		}else{
		for(o=0;o<name_tem.size();o++){
				       	if(o%2==0)
							{
			      				setHtml.push("<tr>");
			    			}
				       	    setHtml.push("<td style=\"width:50%; font-size='14'\">");
				       		setHtml.push("&nbsp"+"<img src=\"../portal/images/news.gif\" />");
				       		setHtml.push(name_tem[o]);
				       		
				       		setHtml.push("<br/>");
				       		for(j=0;j<task_list.size();j++)
							   {
							      //taskStr=taskStr+"&nbsp"+"<img src=\"<%=request.getContextPath()%>/images/bg/20.png\" />";
							      if(task_list[j].jobnum>0){
							      if(task_list[j].menuname == name_tem[o] ){
			                            setHtml.push("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+task_list[j].statusname+"&nbsp;<"+task_list[j].jobnum+"条>");
			                            setHtml.push("<br/>"); 
			                       }
							       }
							       if(task_list[j].jobnum==0){
							           setHtml.push("&nbsp"+task_list[j].statusname); 
							           setHtml.push("<br/>"); 
							        }
							        
						       }
				       		
				       		setHtml.push("</td>");
				       		if(o%2==1)
							{
			      				setHtml.push("</tr>");
			    			}
				       	}
				       	setHtml.push("</table>");

		}
		setHtml.push("</div>");
		var retmenupanel = new Ext.Panel({title:menuinfo.name,panelheight:210,autoScroll:false, html:setHtml.join('')});
		retmenupanel.getname=function(){
			return retmenupanel.title;
		}
		retmenupanel.pengding=true;
		return retmenupanel;
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

