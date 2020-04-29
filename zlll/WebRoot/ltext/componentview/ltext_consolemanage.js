
Ext.lt.console.component.console = new function () {
	this.manager=function(config,server){
	var maxlength=15;
	function createMainHtml(object){
				var items=object.chl;
    			var html=[];
    			if(object.obj.imagepath==null){
    				object.obj.imagepath=_ROOT_PATH_+'/ltext/images/menhu_p.gif'
    			}
    			
				html.push("<table width='96%' border='0'> <tr> <td width='100px' height='90px' rowspan='2' style='background:url("+object.obj.imagepath+") no-repeat left top; background-position:10px 10px; '></td>");
				html.push("<td class='menhu_title'>"+object.obj.name+"</td></tr>");
				html.push("<tr><td class='menhu_link'>");
				for(var i=0;i<items.length;i++){
					var obj=items[i].obj;
					if(maxlength<=obj.name.length){
						maxlength=obj.name.length;
					}
					if(obj.page==null){
						if(obj.jslib==null)obj.jslib="";
						if(obj.jsobjctname==null)obj.jsobjctname="";
						html.push('<div onmouseout="this.className=\'\';" onmousemove="this.className=\'selectDiv\'" onclick="Ext.lt.console.component.console.openshutterpanel(\''+obj.pid+'\',\''+obj.id+'\');setCenterPanel(\''+obj.jslib+'\',\''+obj.jsobjctname+'\',\'consolepanel_'+obj.id+'\');">'+obj.name+'</div>');
					}else{
						html.push('<div onmouseout="this.className=\'\';" onmousemove="this.className=\'selectDiv\'" onclick="Ext.lt.console.component.console.openshutterpanel(\''+obj.pid+'\',\''+obj.id+'\');open2menu(\''+obj.page+'\'); ">'+obj.name+'</div>');
					}
				}
				html.push("</td></tr></table><div style='border-bottom:1px #ADBDD4 dashed; hieght:10px; font-size:0; line-height:10px;'>&nbsp;</div>");
			return html;
		}
		var html=[];
	var items=config.menus;
	for(var i=0;i<items.length;i++){
		html.push(createMainHtml(items[i]).join(""));
	}
	var css=null;
	if(document.styleSheets.length==0){css=document.createStyleSheet();}else{css=document.styleSheets[0]};
	css.addRule(".menhu_link div","width:"+(maxlength*13+5)+"px;");
	
	var res=new Ext.Panel({title:"¿ØÖÆÌ¨",id:"console_index_panel",autoScroll:true, layout:'fit',html:html.join('')});
	
	res.getname=function(){
	return res.title;
	}
	return res;
	};
	
	this.openshutterpanel=function(pid,cid){
		var items=Ext.lt.template.getLeftPanel().items.items[0].items.items;
		for(var i=0;i<items.length;i++){
			if(items[i].id=='shutterpanel_'+pid){
				if(items[i].collapsed){
					items[i].expand();
				}
			}else{
				if(!items[i].collapsed){
					items[i].collapse();
				}
			}
		}
	}
};

