
// 综合查询脚本库初始化函数
function ltext_fcas_init(){

	// 创建命名空间
	Ext.lt.fcas = {
		panels:[],
		
		// 创建工作界面
		getPanels: function(panelname){
			if(panelname == null) alert("Ext.lt.fcas.getPanels() 没有指定获取界面名称");
			panelname = panelname.toLowerCase();
			if(Ext.lt.fcas.panels[panelname] == null){
				// 创建任务界面
				eval("Ext.lt.fcas.create"+panelname.substring(0,1).toUpperCase()+panelname.substr(1)+"()");
			}
			return Ext.lt.fcas.panels[panelname];
		},
		
		// 显示综合查询任务列表
		showTaskPanel:function(){
		    Ext.lt.template.showtasklist({
		        id:'fcastaskpanel',
		        title:'综合查询任务列表',
		        url:Ext.lt.encodeUrl('datas/fcastasklist.data')
		    }).show();
		},
		
		
		// 显示综合查询系统设置界面
		showSystemconfigPanel:function(){
		    Ext.lt.template.showSystemconfig({
		        id:'fcasSystemconfig',
		        title:'综合查询系统配置',
		        programerurl: Ext.lt.encodeUrl('datas/fcasprogramerlist.data'),
		        testerurl: Ext.lt.encodeUrl('datas/fcastesterlist.data'),
		        weblogiclisturl: Ext.lt.encodeUrl('datas/weblogiclist.data')
		    }).show();
		},
	    
		
		fcas_menu: new Ext.Panel({
            title:'综合查询',
            autoScroll:true,
            border:false,
            iconCls:'nav_fcas',
            html:'<li class=menulist><a href="#" onclick="javascript:Ext.lt.fcas.showTaskPanel();">任务列表</a></li><li class=menulist><a href="javascript:return false">发布版本</a></li><li class=menulist><a  href="#" onclick="javascript:Ext.lt.fcas.showSystemconfigPanel();">系统设置</a></li>'
        })
        
	};
	
	
	
	var listnemu = Ext.lt.template.consoletemplate.items.get('listnemu');
	listnemu.insert(0,Ext.lt.fcas.fcas_menu);
	listnemu.doLayout();
	Ext.lt.fcas.fcas_menu.expand();
	
}

function showfcas(){
	alert("called showfcas")
}



