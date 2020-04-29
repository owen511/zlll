Ext.lt.console.component.consolemenu = new function () {
	this.shuttermenu = function (config,server) {
		function createMenuPanel(object){
				var items=object.chl;
				var html=[];
				html.push("<ul class=\"quickmenu_list\">");
				for(var i=0;i<items.length;i++){
					var obj=items[i].obj;
					if(obj.page==null){
						if(obj.jslib==null)obj.jslib="";
						if(obj.jsobjctname==null)obj.jsobjctname="";
						html.push('<li id=\'consolepanel_'+obj.id+'_li\'><a onclick="setCenterPanel(\''+obj.jslib+'\',\''+obj.jsobjctname+'\',\'consolepanel_'+obj.id+'\');" class="menubar">'+obj.name+'</a></li>');
					}else{
						html.push('<li id=\'consolepanel_'+obj.id+'_li\'><a onclick="" class="menubar">'+obj.name+'</a></li>');
					}
				}
				
				html.push('</ul>');
				var menu = new Ext.Panel({border:false,html:html.join("")});
				var shutterpanel = new Ext.Panel({
                    title:object.obj.name,
                    collapsible: true,    //本窗口伸缩
                    id:"shutterpanel_"+object.obj.id,
                    split:true,
                     border:false,
                     layout:'fit',
                    minSize: 175,
                    maxSize: 175,
                    margins:{left: 10, top: 0, right: 0, bottom: 0},
                    //layout:'accordion',   //子窗口为折叠
                    layoutConfig:{
                        animate:true
                    },
                    items:[menu]
    		});
    		return shutterpanel;
		}
		var items=config.menus;
		for(var i=0;i<items.length;i++){
			items[i]=createMenuPanel(items[i]);
		}
		//debugger;
    	var shutterpanel = new Ext.Panel({ border:false,items:[items]});
		return shutterpanel;
	};
};
var consolepanel_id_li;
function setCenterPanel(js,objname,id) {
	if(Ext.getCmp(id)==null&&!Ext.lt.template.isHaveMainPanel2id(id)){
		new Ext.lt.util.createScript(js, "console", function () {
			var panel=eval("new " + objname + "();");
			panel.id=id;
			Ext.lt.template.addPanel2CenterMain(panel);
		});
	}else{
		Ext.lt.template.showPanel2CenterMain(id);
	}
	if(consolepanel_id_li!=null){
		document.getElementById(consolepanel_id_li).style.background ='';
	}
	consolepanel_id_li=id+"_li";
	document.getElementById(consolepanel_id_li).style.background = 'url(../ltext/images/menhu_list_bg.gif) repeat-x left bottom';
}
function open2menu(url) {
	var tmp=window.open(url,"","fullscreen=0")
	tmp.moveTo(0,0)
	tmp.resizeTo(screen.width+20,screen.height)
	tmp.focus();
}