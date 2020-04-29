// 检查命名空间
if (Ext.lt.mms == null) {
	Ext.lt.mms = {};
}
/********************************基本bug显示**********************************/
Ext.lt.mms.mainshow = function(service, config) {
	Ext.lt.mms.mainshow.service = service;
	//定义基本bug显示的页签
	var basicBugTabs = new Ext.TabPanel({
	    id:'basicBugsPanel',
	    //默认显示页签
	    activeTab:0,
	    items:[
	        {title:'未处理('+config.noDeal.length+')',
	        html:'<div id="noDeal"></div>',
	        listeners:{activate:showNoDeal}
	        },
	        {title:'已处理('+config.deal.length+')',
	         html:'<div id="deal"></div>',
	         listeners:{activate:showDeal}
	        },
	        {title:'已关闭('+config.close.length+')',
	         html:'<div id="close"></div>',
	         listeners:{activate:showClose}
	        }
	    ]
	});
	/*定义gridPanal展示主表bug信息*/
	//主表数据结构信息
	var mainFields = [
	    {name:'userName'},
	    {name:'bugNumber'}
	];
	//主表数据集信息
	var mainJsonStore = new Ext.data.JsonStore({
	    fields:mainFields,
	    data:config.mainTable
	});
	//主表格表头信息
	var mainCol = [
	    {header:'用户名称'},
	    {header:'bug数量'}
	]; 
	//主表数据显示表格
	var mainGridPanel = new Ext.grid.GridPanel({
	    //数据集
	    store:mainJsonStore,
	    //表格列结构信息
	    columns:mainCol,
	    //表格事件监听
	    listeners:{
	        //表格行单击事件
	        rowdblclick:function(grid, rowIndex, e){ 
	            //获取表格单击行对象
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
            }

	    },
	    height:300
	});
	
	/**
     *单击主表格行信息弹出表格明细数据
	 */
	//明细表数据结构信息
	var detailFields = [
	    {name:'bugId'},
	    {name:'caption'},
	    {name:'priority'},
	    {name:'product'},
	    {name:'component'},
	    {name:'createTime'}
	];
	//明细表数据集新消息(未处理)
	var detailJsonStoreNoDeal = new Ext.data.JsonStore({
	    fields:detailFields,
	    data:config.noDeal
	});
	//明细表数据集新消息(已处理)
	var detailJsonStoreDeal = new Ext.data.JsonStore({
	    fields:detailFields,
	    data:config.deal
	});
	//明细表数据集新消息(已关闭)
	var detailJsonStoreClose = new Ext.data.JsonStore({
	    fields:detailFields,
	    data:config.close
	});
	//明细表表头信息
	var detailCol = [
	    {header:'bug号'},
	    {header:'bug标题'},
	    {header:'bug级次'},
	    {header:'产品'},
	    {header:'模块'},
	    {header:'创建时间'}
	];
	//明细表数据显示表格(未处理)
	var detailGridPanelNoDeal = new Ext.grid.GridPanel({
	    //数据集
	    store:detailJsonStoreNoDeal,
	    //表格列结构信息
	    columns:detailCol,
	    //表格事件监听
	    listeners:{
	        //表格行单击事件
	        rowdblclick:function(grid, rowIndex, e){ 
	            //获取表格单击行对象
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
                window.open('http://192.168.3.7:8000/bugzilla/show_bug.cgi?id='+record.data.bugId,'window');               
            }
	    },
	    viewConfig : {
             forceFit : true,
             getRowClass : function(record, rowIndex, rowParams, store) {
                 if (record.data.priority == 'P1') {
                     return 'x-grid3-row-alt';
                 }
	         }
	    },
	    border:false,
	    layout:'fit',
	    height:540
	});
	//明细表数据显示表格(已处理)
	var detailGridPanelDeal = new Ext.grid.GridPanel({
	    //数据集
	    store:detailJsonStoreDeal,
	    //表格列结构信息
	    columns:detailCol,
	    //表格事件监听
	    listeners:{
	        //表格行单击事件
	        rowdblclick:function(grid, rowIndex, e){ 
	            //获取表格单击行对象
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
                window.open('http://192.168.3.7:8000/bugzilla/show_bug.cgi?id='+record.data.bugId,'window');               
            }
	    },
	    viewConfig : {
             forceFit : true,
             getRowClass : function(record, rowIndex, rowParams, store) {
                 if (record.data.priority == 'P1') {
                     return 'x-grid3-row-alt';
                 }
	         }
	    },
	    border:false,
	    layout:'fit',
	    height:540
	});
	//明细表数据显示表格(已关闭)
	var detailGridPanelClose = new Ext.grid.GridPanel({
	    //数据集
	    store:detailJsonStoreClose,
	    //表格列结构信息
	    columns:detailCol,
	    //表格事件监听
	    listeners:{
	        //表格行单击事件
	        rowdblclick:function(grid, rowIndex, e){ 
	            //获取表格单击行对象
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
                window.open('http://192.168.3.7:8000/bugzilla/show_bug.cgi?id='+record.data.bugId,'window');               
            }
	    },	    viewConfig : {
             forceFit : true,
             getRowClass : function(record, rowIndex, rowParams, store) {
                 if (record.data.priority == 'P1') {
                     return 'x-grid3-row-alt';
                 }
	         }
	    },
	    border:false,
	    layout:'fit',
	    height:540
	});
	//显示未处理bug信息
	function showNoDeal(){
	    detailGridPanelNoDeal.render("noDeal");
	}
	//显示已处理bug信息
	function showDeal(){
	    detailGridPanelDeal.render("deal");
	}
	//显示已关闭的bug信息
	function showClose(){
	    detailGridPanelClose.render("close");
	}
	return basicBugTabs;
}
/***********************************ACbug显示*****************************************/
function acBugsShow(config) {
	//定义基本bug显示的页签
	var acBugTabs = new Ext.TabPanel({
	    id:'acBugsPanel',
	    //默认显示页签
	    activeTab:0,
	    items:[
	        {title:'未处理('+config.noDeal.length+')',
	        html:'<div id="acNoDeal"></div>',
	        listeners:{activate:showNoDeal}
	        },
	        {title:'已处理('+config.deal.length+')',
	         html:'<div id="acDeal"></div>',
	         listeners:{activate:showDeal}
	        },
	        {title:'已关闭('+config.close.length+')',
	         html:'<div id="acClose"></div>',
	         listeners:{activate:showClose}
	        }
	    ]
	});
	/*定义gridPanal展示主表bug信息*/
	//主表数据结构信息
	var mainFields = [
	    {name:'userName'},
	    {name:'bugNumber'}
	];
	//主表数据集信息
	var mainJsonStore = new Ext.data.JsonStore({
	    fields:mainFields,
	    data:config.mainTable
	});
	//主表格表头信息
	var mainCol = [
	    {header:'用户名称'},
	    {header:'bug数量'}
	]; 
	//主表数据显示表格
	var mainGridPanel = new Ext.grid.GridPanel({
	    //数据集
	    store:mainJsonStore,
	    //表格列结构信息
	    columns:mainCol,
	    //表格事件监听
	    listeners:{
	        //表格行单击事件
	        rowdblclick:function(grid, rowIndex, e){ 
	            //获取表格单击行对象
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
            }

	    },
	    height:300
	});
	
	/**
     *单击主表格行信息弹出表格明细数据
	 */
	//明细表数据结构信息
	var detailFields = [
	    {name:'bugId'},
	    {name:'caption'},
	    {name:'priority'},
	    {name:'product'},
	    {name:'component'},
	    {name:'createTime'}
	];
	//明细表数据集新消息(未处理)
	var detailJsonStoreNoDeal = new Ext.data.JsonStore({
	    fields:detailFields,
	    data:config.noDeal
	});
	//明细表数据集新消息(已处理)
	var detailJsonStoreDeal = new Ext.data.JsonStore({
	    fields:detailFields,
	    data:config.deal
	});
	//明细表数据集新消息(已关闭)
	var detailJsonStoreClose = new Ext.data.JsonStore({
	    fields:detailFields,
	    data:config.close
	});
	//明细表表头信息
	var detailCol = [
	    {header:'bug号'},
	    {header:'bug标题'},
	    {header:'bug级次'},
	    {header:'产品'},
	    {header:'模块'},
	    {header:'创建时间'}
	];
	//明细表数据显示表格(未处理)
	var detailGridPanelNoDeal = new Ext.grid.GridPanel({
	    //数据集
	    store:detailJsonStoreNoDeal,
	    //表格列结构信息
	    columns:detailCol,
	    //表格事件监听
	    listeners:{
	        //表格行单击事件
	        rowdblclick:function(grid, rowIndex, e){ 
	            //获取表格单击行对象
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
                window.open('http://192.168.3.7:8000/bugzilla/show_bug.cgi?id='+record.data.bugId,'window');               
            }
	    },
	    viewConfig : {
             forceFit : true,
             getRowClass : function(record, rowIndex, rowParams, store) {
                 if (record.data.priority == 'P1') {
                     return 'x-grid3-row-alt';
                 }
	         }
	    },
	    border:false,
	    layout:'fit',
	    height:540
	});
	//明细表数据显示表格(已处理)
	var detailGridPanelDeal = new Ext.grid.GridPanel({
	    //数据集
	    store:detailJsonStoreDeal,
	    //表格列结构信息
	    columns:detailCol,
	    //表格事件监听
	    listeners:{
	        //表格行单击事件
	        rowdblclick:function(grid, rowIndex, e){ 
	            //获取表格单击行对象
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
                window.open('http://192.168.3.7:8000/bugzilla/show_bug.cgi?id='+record.data.bugId,'window');               
            }
	    },	    viewConfig : {
             forceFit : true,
             getRowClass : function(record, rowIndex, rowParams, store) {
                 if (record.data.priority == 'P1') {
                     return 'x-grid3-row-alt';
                 }
	         }
	    }, 
	    border:false,
	    layout:'fit',
	    height:540
	});
	//明细表数据显示表格(已关闭)
	var detailGridPanelClose = new Ext.grid.GridPanel({
	    //数据集
	    store:detailJsonStoreClose,
	    //表格列结构信息
	    columns:detailCol,
	    //表格事件监听
	    listeners:{
	        //表格行单击事件
	        rowdblclick:function(grid, rowIndex, e){ 
	            //获取表格单击行对象
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
                window.open('http://192.168.3.7:8000/bugzilla/show_bug.cgi?id='+record.data.bugId,'window');               
            }
	    },
	    viewConfig : {
             forceFit : true,
             getRowClass : function(record, rowIndex, rowParams, store) {
                 if (record.data.priority == 'P1') {
                     return 'x-grid3-row-alt';
                 }
	         }
	    },
	    border:false,
	    layout:'fit',
	    height:540
	});
	//显示未处理bug信息
	function showNoDeal(){
	    detailGridPanelNoDeal.render("acNoDeal");
	}
	//显示已处理bug信息
	function showDeal(){
	    detailGridPanelDeal.render("acDeal");
	}
	//显示已关闭的bug信息
	function showClose(){
	    detailGridPanelClose.render("acClose");
	}
	return acBugTabs;
}
/***********************************BBbug显示*****************************************/
function bbBugsShow(config) {
	//定义基本bug显示的页签
	var bbBugTabs = new Ext.TabPanel({
	    id:'bbBugsPanel',
	    //默认显示页签
	    activeTab:0,
	    items:[
	        {title:'未处理('+config.noDeal.length+')',
	        html:'<div id="bbNoDeal"></div>',
	        listeners:{activate:showNoDeal}
	        },
	        {title:'已处理('+config.deal.length+')',
	         html:'<div id="bbDeal"></div>',
	         listeners:{activate:showDeal}
	        },
	        {title:'已关闭('+config.close.length+')',
	         html:'<div id="bbClose"></div>',
	         listeners:{activate:showClose}
	        }
	    ]
	});
	/*定义gridPanal展示主表bug信息*/
	//主表数据结构信息
	var mainFields = [
	    {name:'userName'},
	    {name:'bugNumber'}
	];
	//主表数据集信息
	var mainJsonStore = new Ext.data.JsonStore({
	    fields:mainFields,
	    data:config.mainTable
	});
	//主表格表头信息
	var mainCol = [
	    {header:'用户名称'},
	    {header:'bug数量'}
	]; 
	//主表数据显示表格
	var mainGridPanel = new Ext.grid.GridPanel({
	    //数据集
	    store:mainJsonStore,
	    //表格列结构信息
	    columns:mainCol,
	    //表格事件监听
	    listeners:{
	        //表格行单击事件
	        rowdblclick:function(grid, rowIndex, e){ 
	            //获取表格单击行对象
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
            }

	    },
	    height:300
	});
	
	/**
     *单击主表格行信息弹出表格明细数据
	 */
	//明细表数据结构信息
	var detailFields = [
	    {name:'bugId'},
	    {name:'caption'},
	    {name:'priority'},
	    {name:'product'},
	    {name:'component'},
	    {name:'createTime'}
	];
	//明细表数据集新消息(未处理)
	var detailJsonStoreNoDeal = new Ext.data.JsonStore({
	    fields:detailFields,
	    data:config.noDeal
	});
	//明细表数据集新消息(已处理)
	var detailJsonStoreDeal = new Ext.data.JsonStore({
	    fields:detailFields,
	    data:config.deal
	});
	//明细表数据集新消息(已关闭)
	var detailJsonStoreClose = new Ext.data.JsonStore({
	    fields:detailFields,
	    data:config.close
	});
	//明细表表头信息
	var detailCol = [
	    {header:'bug号'},
	    {header:'bug标题'},
	    {header:'bug级次'},
	    {header:'产品'},
	    {header:'模块'},
	    {header:'创建时间'}
	];
	//明细表数据显示表格(未处理)
	var detailGridPanelNoDeal = new Ext.grid.GridPanel({
	    //数据集
	    store:detailJsonStoreNoDeal,
	    //表格列结构信息
	    columns:detailCol,
	    //表格事件监听
	    listeners:{
	        //表格行单击事件
	        rowdblclick:function(grid, rowIndex, e){ 
	            //获取表格单击行对象
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
                window.open('http://192.168.3.7:8000/bugzilla/show_bug.cgi?id='+record.data.bugId,'window');               
            }
	    },
	    viewConfig : {
             forceFit : true,
             getRowClass : function(record, rowIndex, rowParams, store) {
                 if (record.data.priority == 'P1') {
                     return 'x-grid3-row-alt';
                 }
	         }
	    },
	    border:false,
	    layout:'fit',
	    height:540
	});
	//明细表数据显示表格(已处理)
	var detailGridPanelDeal = new Ext.grid.GridPanel({
	    //数据集
	    store:detailJsonStoreDeal,
	    //表格列结构信息
	    columns:detailCol,
	    //表格事件监听
	    listeners:{
	        //表格行单击事件
	        rowdblclick:function(grid, rowIndex, e){ 
	            //获取表格单击行对象
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
                window.open('http://192.168.3.7:8000/bugzilla/show_bug.cgi?id='+record.data.bugId,'window');               
            }
	    },
	    viewConfig : {
             forceFit : true,
             getRowClass : function(record, rowIndex, rowParams, store) {
                 if (record.data.priority == 'P1') {
                     return 'x-grid3-row-alt';
                 }
	         }
	    },
	    border:false,
	    layout:'fit',
	    height:540
	});
	//明细表数据显示表格(已关闭)
	var detailGridPanelClose = new Ext.grid.GridPanel({
	    //数据集
	    store:detailJsonStoreClose,
	    //表格列结构信息
	    columns:detailCol,
	    //表格事件监听
	    listeners:{
	        //表格行单击事件
	        rowdblclick:function(grid, rowIndex, e){ 
	            //获取表格单击行对象
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
                window.open('http://192.168.3.7:8000/bugzilla/show_bug.cgi?id='+record.data.bugId,'window');               
            }
	    },
	    viewConfig : {
             forceFit : true,
             getRowClass : function(record, rowIndex, rowParams, store) {
                 if (record.data.priority == 'P1') {
                     return 'x-grid3-row-alt';
                 }
	         }
	    },
	    border:false,
	    layout:'fit',
	    height:540
	});
	//显示未处理bug信息
	function showNoDeal(){
	    detailGridPanelNoDeal.render("bbNoDeal");
	}
	//显示已处理bug信息
	function showDeal(){
	    detailGridPanelDeal.render("bbDeal");
	}
	//显示已关闭的bug信息
	function showClose(){
	    detailGridPanelClose.render("bbClose");
	}
	return bbBugTabs;
}

/***********************************ImpBug显示*****************************************/
function impBugsShow(config) {
	//定义基本bug显示的页签
	var impBugTabs = new Ext.TabPanel({
	    id:'impBugsPanel',
	    //默认显示页签
	    activeTab:0,
	    items:[
	        {title:'未处理('+config.noDeal.length+')',
	        html:'<div id="impNoDeal"></div>',
	        listeners:{activate:showNoDeal}
	        },
	        {title:'已处理('+config.deal.length+')',
	         html:'<div id="impDeal"></div>',
	         listeners:{activate:showDeal}
	        },
	        {title:'已关闭('+config.close.length+')',
	         html:'<div id="impClose"></div>',
	         listeners:{activate:showClose}
	        }
	    ]
	});
	/*定义gridPanal展示主表bug信息*/
	//主表数据结构信息
	var mainFields = [
	    {name:'userName'},
	    {name:'bugNumber'}
	];
	//主表数据集信息
	var mainJsonStore = new Ext.data.JsonStore({
	    fields:mainFields,
	    data:config.mainTable
	});
	//主表格表头信息
	var mainCol = [
	    {header:'用户名称'},
	    {header:'bug数量'}
	]; 
	//主表数据显示表格
	var mainGridPanel = new Ext.grid.GridPanel({
	    //数据集
	    store:mainJsonStore,
	    //表格列结构信息
	    columns:mainCol,
	    //表格事件监听
	    listeners:{
	        //表格行单击事件
	        rowdblclick:function(grid, rowIndex, e){ 
	            //获取表格单击行对象
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
            }

	    },
	    height:300
	});
	
	/**
     *单击主表格行信息弹出表格明细数据
	 */
	//明细表数据结构信息
	var detailFields = [
	    {name:'bugId'},
	    {name:'caption'},
	    {name:'priority'},
	    {name:'product'},
	    {name:'component'},
	    {name:'createTime'}
	];
	//明细表数据集新消息(未处理)
	var detailJsonStoreNoDeal = new Ext.data.JsonStore({
	    fields:detailFields,
	    data:config.noDeal
	});
	//明细表数据集新消息(已处理)
	var detailJsonStoreDeal = new Ext.data.JsonStore({
	    fields:detailFields,
	    data:config.deal
	});
	//明细表数据集新消息(已关闭)
	var detailJsonStoreClose = new Ext.data.JsonStore({
	    fields:detailFields,
	    data:config.close
	});
	//明细表表头信息
	var detailCol = [
	    {header:'bug号'},
	    {header:'bug标题'},
	    {header:'bug级次'},
	    {header:'产品'},
	    {header:'模块'},
	    {header:'创建时间'}
	];
	//明细表数据显示表格(未处理)
	var detailGridPanelNoDeal = new Ext.grid.GridPanel({
	    //数据集
	    store:detailJsonStoreNoDeal,
	    //表格列结构信息
	    columns:detailCol,
	    //表格事件监听
	    listeners:{
	        //表格行单击事件
	        rowdblclick:function(grid, rowIndex, e){ 
	            //获取表格单击行对象
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
                window.open('http://192.168.3.7:8000/bugzilla/show_bug.cgi?id='+record.data.bugId,'window');               
            }
	    },
	    border:false,
	    layout:'fit',
	    height:540
	});
	//明细表数据显示表格(已处理)
	var detailGridPanelDeal = new Ext.grid.GridPanel({
	    //数据集
	    store:detailJsonStoreDeal,
	    //表格列结构信息
	    columns:detailCol,
	    //表格事件监听
	    listeners:{
	        //表格行单击事件
	        rowdblclick:function(grid, rowIndex, e){ 
	            //获取表格单击行对象
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
                window.open('http://192.168.3.7:8000/bugzilla/show_bug.cgi?id='+record.data.bugId,'window');               
            }
	    },
	    border:false,
	    layout:'fit',
	    height:540
	});
	//明细表数据显示表格(已关闭)
	var detailGridPanelClose = new Ext.grid.GridPanel({
	    //数据集
	    store:detailJsonStoreClose,
	    //表格列结构信息
	    columns:detailCol,
	    //表格事件监听
	    listeners:{
	        //表格行单击事件
	        rowdblclick:function(grid, rowIndex, e){ 
	            //获取表格单击行对象
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
                window.open('http://192.168.3.7:8000/bugzilla/show_bug.cgi?id='+record.data.bugId,'window');               
            }
	    },
	    border:false,
	    layout:'fit',
	    height:540
	});
	//显示未处理bug信息
	function showNoDeal(){
	    detailGridPanelNoDeal.render("impNoDeal");
	}
	//显示已处理bug信息
	function showDeal(){
	    detailGridPanelDeal.render("impDeal");
	}
	//显示已关闭的bug信息
	function showClose(){
	    detailGridPanelClose.render("impClose");
	}
	return impBugTabs;
}
/***********************************所有基本Bug显示*****************************************/
function basicBugsAllShow(config) {
    //计算3类bug的总个数
    var noDealNumber = 0;
    for (var i = 0; i < config.noDeal.length; i++){
        noDealNumber += config.noDeal[i].bugNumber;
    }
    var dealNumber = 0;
    for (var i = 0; i < config.deal.length; i++){
        dealNumber += config.deal[i].bugNumber;
    }
    var closeNumber = 0;
    for (var i = 0; i < config.close.length; i++){
        closeNumber += config.close[i].bugNumber;
    }
	//定义基本bug显示的页签
	var basicBugsAllTabs = new Ext.TabPanel({
	    id:'basicBugsAllPanel',
	    //默认显示页签
	    activeTab:0,
	    items:[
	        {title:'未处理('+noDealNumber+')',
	        html:'<div id="basicAllNoDeal"></div>',
	        listeners:{activate:showNoDeal}
	        },
	        {title:'已处理('+dealNumber+')',
	         html:'<div id="basicAllDeal"></div>',
	         listeners:{activate:showDeal}
	        },
	        {title:'已关闭('+closeNumber+')',
	         html:'<div id="basicAllClose"></div>',
	         listeners:{activate:showClose}
	        }
	    ]
	});
	/*定义gridPanal展示主表bug信息*/
	//主表数据结构信息
	var mainFields = [
	    {name:'userName'},
	    {name:'bugNumber'}
	];
	//主表数据集信息(未处理)
	var mainJsonStoreNoDeal = new Ext.data.JsonStore({
	    fields:mainFields,
	    data:config.noDeal
	});
	//主表数据集信息(已处理)
	var mainJsonStoreDeal = new Ext.data.JsonStore({
	    fields:mainFields,
	    data:config.deal
	});
	//主表数据集信息(已关闭)
	var mainJsonStoreClose = new Ext.data.JsonStore({
	    fields:mainFields,
	    data:config.close
	});
	//主表格表头信息
	var mainCol = [
	    {header:'用户名称'},
	    {header:'bug数量'}
	]; 
	//主表数据显示表格(未处理)
	var mainGridPanelNoDeal = new Ext.grid.GridPanel({
	    //数据集
	    store:mainJsonStoreNoDeal,
	    //表格列结构信息
	    columns:mainCol,
	    //表格事件监听
	    listeners:{
	        //表格行单击事件
	        rowclick:function(grid, rowIndex, e){ 
	            //获取表格单击行对象
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
			    //查询对应用户的明细数据
			    Ext.lt.RCP.server("mainshowservermms", "findBasicBugsNoDeal", record.data.userName,function(resp) {
			        //动态刷新子单panel列表信息
			        detailJsonStoreNoDeal.loadData(resp.noDeal);
			    });
            }
	    },
	    border:false,
	    layout:'fit',
	    height:200,
	    region:'center'
	});
	//主表数据显示表格(已处理)
	var mainGridPanelDeal = new Ext.grid.GridPanel({
	    //数据集
	    store:mainJsonStoreDeal,
	    //表格列结构信息
	    columns:mainCol,
	    //表格事件监听
	    listeners:{
	        //表格行单击事件
	        rowclick:function(grid, rowIndex, e){ 
	            //获取表格单击行对象
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
			    //查询对应用户的明细数据
			    Ext.lt.RCP.server("mainshowservermms", "findBasicBugsDeal", record.data.userName,function(resp) {
			        //动态刷新子单panel列表信息
			        detailJsonStoreDeal.loadData(resp.deal);
			    });
            }
	    },
	    border:false,
	    layout:'fit',
	    height:200,
	    region:'center'
	});
	//主表数据显示表格(已关闭)
	var mainGridPanelClose = new Ext.grid.GridPanel({
	    //数据集
	    store:mainJsonStoreClose,
	    //表格列结构信息
	    columns:mainCol,
	    //表格事件监听
	    listeners:{
	        //表格行单击事件
	        rowclick:function(grid, rowIndex, e){ 
	            //获取表格单击行对象
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
			    //查询对应用户的明细数据
			    Ext.lt.RCP.server("mainshowservermms", "findBasicBugsClose", record.data.userName,function(resp) {
			        //动态刷新子单panel列表信息
			        detailJsonStoreClose.loadData(resp.close);
			    });
            }
	    },
	    border:false,
	    layout:'fit',
	    height:200,
	    region:'center'
	});
	/**
     *单击主表格行信息弹出表格明细数据
	 */
	//明细表数据结构信息
	var detailFields = [
	    {name:'bugId'},
	    {name:'caption'},
	    {name:'priority'},
	    {name:'product'},
	    {name:'component'},
	    {name:'createTime'}
	];
	//明细表数据集新消息(未处理)
	var detailJsonStoreNoDeal = new Ext.data.JsonStore({
	    fields:detailFields,
	    data:[]
	});
	//明细表数据集新消息(已处理)
	var detailJsonStoreDeal = new Ext.data.JsonStore({
	    fields:detailFields,
	    data:[]
	});
	//明细表数据集新消息(已关闭)
	var detailJsonStoreClose = new Ext.data.JsonStore({
	    fields:detailFields,
	    data:[]
	});
	//明细表表头信息
	var detailCol = [
	    {header:'bug号'},
	    {header:'bug标题'},
	    {header:'bug级次'},
	    {header:'产品'},
	    {header:'模块'},
	    {header:'创建时间'}
	];
	//明细表数据显示表格(未处理)
	var detailGridPanelNoDeal = new Ext.grid.GridPanel({
	    //数据集
	    store:detailJsonStoreNoDeal,
	    //表格列结构信息
	    columns:detailCol,
	    //表格事件监听
	    listeners:{
	        //表格行单击事件
	        rowdblclick:function(grid, rowIndex, e){ 
	            //获取表格单击行对象
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
                window.open('http://192.168.3.7:8000/bugzilla/show_bug.cgi?id='+record.data.bugId,'window');               
            }
	    },
	    viewConfig : {
             forceFit : true,
             getRowClass : function(record, rowIndex, rowParams, store) {
                 if (record.data.priority == 'P1') {
                     return 'x-grid3-row-alt';
                 }
	         }
	    },
	    layout:'fit',
	    height:340,
	    border:false,
	    region:'south'
	});
	//明细表数据显示表格(已处理)
	var detailGridPanelDeal = new Ext.grid.GridPanel({
	    //数据集
	    store:detailJsonStoreDeal,
	    //表格列结构信息
	    columns:detailCol,
	    //表格事件监听
	    listeners:{
	        //表格行单击事件
	        rowdblclick:function(grid, rowIndex, e){ 
	            //获取表格单击行对象
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
                window.open('http://192.168.3.7:8000/bugzilla/show_bug.cgi?id='+record.data.bugId,'window');               
            }
	    },
	    viewConfig : {
             forceFit : true,
             getRowClass : function(record, rowIndex, rowParams, store) {
                 if (record.data.priority == 'P1') {
                     return 'x-grid3-row-alt';
                 }
	         }
	    },
	    layout:'fit',
	    height:340,
	    border:false,
	    region:'south'
	});
	//明细表数据显示表格(已关闭)
	var detailGridPanelClose = new Ext.grid.GridPanel({
	    //数据集
	    store:detailJsonStoreClose,
	    //表格列结构信息
	    columns:detailCol,
	    //表格事件监听
	    listeners:{
	        //表格行单击事件
	        rowdblclick:function(grid, rowIndex, e){ 
	            //获取表格单击行对象
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
                window.open('http://192.168.3.7:8000/bugzilla/show_bug.cgi?id='+record.data.bugId,'window');               
            }
	    },
	    viewConfig : {
             forceFit : true,
             getRowClass : function(record, rowIndex, rowParams, store) {
                 if (record.data.priority == 'P1') {
                     return 'x-grid3-row-alt';
                 }
	         }
	    },
	    layout:'fit',
	    height:340,
	    border:false,
	    region:'south'
	});
	//定义panel存放主单和子单列表panel(未处理)
	var basicAllPanelNoDeal = new Ext.Panel({
	    layout:'border',
	    border:false,
	    height:540,
	    items:[mainGridPanelNoDeal,detailGridPanelNoDeal]
	});
	//定义panel存放主单和子单列表panel(已处理)
	var basicAllPanelDeal = new Ext.Panel({
	    layout:'border',
	    border:false,
	    height:540,
	    items:[mainGridPanelDeal,detailGridPanelDeal]
	});
	//定义panel存放主单和子单列表panel(已关闭)
	var basicAllPanelClose = new Ext.Panel({
	    layout:'border',
	    border:false,
	    height:540,
	    items:[mainGridPanelClose,detailGridPanelClose]
	});
	//显示未处理bug信息
	function showNoDeal(){
	    basicAllPanelNoDeal.render("basicAllNoDeal");
	}
	//显示已处理bug信息
	function showDeal(){
	    basicAllPanelDeal.render("basicAllDeal");
	}
	//显示已关闭的bug信息
	function showClose(){
	    basicAllPanelClose.render("basicAllClose");
	}
	return basicBugsAllTabs;
}
/***********************************所有ACBug显示*****************************************/
function acBugsAllShow(config) {
    //计算3类bug的总个数
    var noDealNumber = 0;
    for (var i = 0; i < config.noDeal.length; i++){
        noDealNumber += config.noDeal[i].bugNumber;
    }
    var dealNumber = 0;
    for (var i = 0; i < config.deal.length; i++){
        dealNumber += config.deal[i].bugNumber;
    }
    var closeNumber = 0;
    for (var i = 0; i < config.close.length; i++){
        closeNumber += config.close[i].bugNumber;
    }
	//定义基本bug显示的页签
	var acBugsAllTabs = new Ext.TabPanel({
	    id:'acBugsAllPanel',
	    //默认显示页签
	    activeTab:0,
	    items:[
	        {title:'未处理('+noDealNumber+')',
	        html:'<div id="acAllNoDeal"></div>',
	        listeners:{activate:showNoDeal}
	        },
	        {title:'已处理('+dealNumber+')',
	         html:'<div id="acAllDeal"></div>',
	         listeners:{activate:showDeal}
	        },
	        {title:'已关闭('+closeNumber+')',
	         html:'<div id="acAllClose"></div>',
	         listeners:{activate:showClose}
	        }
	    ]
	});
	/*定义gridPanal展示主表bug信息*/
	//主表数据结构信息
	var mainFields = [
	    {name:'userName'},
	    {name:'bugNumber'}
	];
	//主表数据集信息(未处理)
	var mainJsonStoreNoDeal = new Ext.data.JsonStore({
	    fields:mainFields,
	    data:config.noDeal
	});
	//主表数据集信息(已处理)
	var mainJsonStoreDeal = new Ext.data.JsonStore({
	    fields:mainFields,
	    data:config.deal
	});
	//主表数据集信息(已关闭)
	var mainJsonStoreClose = new Ext.data.JsonStore({
	    fields:mainFields,
	    data:config.close
	});
	//主表格表头信息
	var mainCol = [
	    {header:'用户名称'},
	    {header:'bug数量'}
	]; 
	//主表数据显示表格(未处理)
	var mainGridPanelNoDeal = new Ext.grid.GridPanel({
	    //数据集
	    store:mainJsonStoreNoDeal,
	    //表格列结构信息
	    columns:mainCol,
	    //表格事件监听
	    listeners:{
	        //表格行单击事件
	        rowclick:function(grid, rowIndex, e){ 
	            //获取表格单击行对象
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
			    //查询对应用户的明细数据
			    Ext.lt.RCP.server("mainshowservermms", "findAcBugsNoDeal", record.data.userName,function(resp) {
			        //动态刷新子单panel列表信息
			        detailJsonStoreNoDeal.loadData(resp.noDeal);
			    });
            }
	    },
	    border:false,
	    layout:'fit',
	    height:200,
	    region:'center'
	});
	//主表数据显示表格(已处理)
	var mainGridPanelDeal = new Ext.grid.GridPanel({
	    //数据集
	    store:mainJsonStoreDeal,
	    //表格列结构信息
	    columns:mainCol,
	    //表格事件监听
	    listeners:{
	        //表格行单击事件
	        rowclick:function(grid, rowIndex, e){ 
	            //获取表格单击行对象
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
			    //查询对应用户的明细数据
			    Ext.lt.RCP.server("mainshowservermms", "findAcBugsDeal", record.data.userName,function(resp) {
			        //动态刷新子单panel列表信息
			        detailJsonStoreDeal.loadData(resp.deal);
			    });
            }
	    },
	    border:false,
	    layout:'fit',
	    height:200,
	    region:'center'
	});
	//主表数据显示表格(已关闭)
	var mainGridPanelClose = new Ext.grid.GridPanel({
	    //数据集
	    store:mainJsonStoreClose,
	    //表格列结构信息
	    columns:mainCol,
	    //表格事件监听
	    listeners:{
	        //表格行单击事件
	        rowclick:function(grid, rowIndex, e){ 
	            //获取表格单击行对象
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
			    //查询对应用户的明细数据
			    Ext.lt.RCP.server("mainshowservermms", "findAcBugsClose", record.data.userName,function(resp) {
			        //动态刷新子单panel列表信息
			        detailJsonStoreClose.loadData(resp.close);
			    });
            }
	    },
	    border:false,
	    layout:'fit',
	    height:200,
	    region:'center'
	});
	/**
     *单击主表格行信息弹出表格明细数据
	 */
	//明细表数据结构信息
	var detailFields = [
	    {name:'bugId'},
	    {name:'caption'},
	    {name:'priority'},
	    {name:'product'},
	    {name:'component'},
	    {name:'createTime'}
	];
	//明细表数据集新消息(未处理)
	var detailJsonStoreNoDeal = new Ext.data.JsonStore({
	    fields:detailFields,
	    data:[]
	});
	//明细表数据集新消息(已处理)
	var detailJsonStoreDeal = new Ext.data.JsonStore({
	    fields:detailFields,
	    data:[]
	});
	//明细表数据集新消息(已关闭)
	var detailJsonStoreClose = new Ext.data.JsonStore({
	    fields:detailFields,
	    data:[]
	});
	//明细表表头信息
	var detailCol = [
	    {header:'bug号'},
	    {header:'bug标题'},
	    {header:'bug级次'},
	    {header:'产品'},
	    {header:'模块'},
	    {header:'创建时间'}
	];
	//明细表数据显示表格(未处理)
	var detailGridPanelNoDeal = new Ext.grid.GridPanel({
	    //数据集
	    store:detailJsonStoreNoDeal,
	    //表格列结构信息
	    columns:detailCol,
	    //表格事件监听
	    listeners:{
	        //表格行单击事件
	        rowdblclick:function(grid, rowIndex, e){ 
	            //获取表格单击行对象
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
                window.open('http://192.168.3.7:8000/bugzilla/show_bug.cgi?id='+record.data.bugId,'window');               
            }
	    },
	    viewConfig : {
             forceFit : true,
             getRowClass : function(record, rowIndex, rowParams, store) {
                 if (record.data.priority == 'P1') {
                     return 'x-grid3-row-alt';
                 }
	         }
	    },
	    layout:'fit',
	    height:340,
	    border:false,
	    region:'south'
	});
	//明细表数据显示表格(已处理)
	var detailGridPanelDeal = new Ext.grid.GridPanel({
	    //数据集
	    store:detailJsonStoreDeal,
	    //表格列结构信息
	    columns:detailCol,
	    //表格事件监听
	    listeners:{
	        //表格行单击事件
	        rowdblclick:function(grid, rowIndex, e){ 
	            //获取表格单击行对象
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
                window.open('http://192.168.3.7:8000/bugzilla/show_bug.cgi?id='+record.data.bugId,'window');               
            }
	    },
	    viewConfig : {
             forceFit : true,
             getRowClass : function(record, rowIndex, rowParams, store) {
                 if (record.data.priority == 'P1') {
                     return 'x-grid3-row-alt';
                 }
	         }
	    },
	    layout:'fit',
	    height:340,
	    border:false,
	    region:'south'
	});
	//明细表数据显示表格(已关闭)
	var detailGridPanelClose = new Ext.grid.GridPanel({
	    //数据集
	    store:detailJsonStoreClose,
	    //表格列结构信息
	    columns:detailCol,
	    //表格事件监听
	    listeners:{
	        //表格行单击事件
	        rowdblclick:function(grid, rowIndex, e){ 
	            //获取表格单击行对象
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
                window.open('http://192.168.3.7:8000/bugzilla/show_bug.cgi?id='+record.data.bugId,'window');               
            }
	    },
	    viewConfig : {
             forceFit : true,
             getRowClass : function(record, rowIndex, rowParams, store) {
                 if (record.data.priority == 'P1') {
                     return 'x-grid3-row-alt';
                 }
	         }
	    },
	    layout:'fit',
	    height:340,
	    border:false,
	    region:'south'
	});
	//定义panel存放主单和子单列表panel(未处理)
	var acAllPanelNoDeal = new Ext.Panel({
	    layout:'border',
	    border:false,
	    height:540,
	    items:[mainGridPanelNoDeal,detailGridPanelNoDeal]
	});
	//定义panel存放主单和子单列表panel(已处理)
	var acAllPanelDeal = new Ext.Panel({
	    layout:'border',
	    border:false,
	    height:540,
	    items:[mainGridPanelDeal,detailGridPanelDeal]
	});
	//定义panel存放主单和子单列表panel(已关闭)
	var acAllPanelClose = new Ext.Panel({
	    layout:'border',
	    border:false,
	    height:540,
	    items:[mainGridPanelClose,detailGridPanelClose]
	});
	//显示未处理bug信息
	function showNoDeal(){
	    acAllPanelNoDeal.render("acAllNoDeal");
	}
	//显示已处理bug信息
	function showDeal(){
	    acAllPanelDeal.render("acAllDeal");
	}
	//显示已关闭的bug信息
	function showClose(){
	    acAllPanelClose.render("acAllClose");
	}
	return acBugsAllTabs;
}
/***********************************所有BB工作任务安排Bug显示*****************************************/
function bbBugsAllShow(config) {
    //计算3类bug的总个数
    var noDealNumber = 0;
    for (var i = 0; i < config.noDeal.length; i++){
        noDealNumber += config.noDeal[i].bugNumber;
    }
    var dealNumber = 0;
    for (var i = 0; i < config.deal.length; i++){
        dealNumber += config.deal[i].bugNumber;
    }
    var closeNumber = 0;
    for (var i = 0; i < config.close.length; i++){
        closeNumber += config.close[i].bugNumber;
    }
	//定义基本bug显示的页签
	var bbBugsAllTabs = new Ext.TabPanel({
	    id:'bbBugsAllPanel',
	    //默认显示页签
	    activeTab:0,
	    items:[
	        {title:'未处理('+noDealNumber+')',
	        html:'<div id="bbAllNoDeal"></div>',
	        listeners:{activate:showNoDeal}
	        },
	        {title:'已处理('+dealNumber+')',
	         html:'<div id="bbAllDeal"></div>',
	         listeners:{activate:showDeal}
	        },
	        {title:'已关闭('+closeNumber+')',
	         html:'<div id="bbAllClose"></div>',
	         listeners:{activate:showClose}
	        }
	    ]
	});
	/*定义gridPanal展示主表bug信息*/
	//主表数据结构信息
	var mainFields = [
	    {name:'userName'},
	    {name:'bugNumber'}
	];
	//主表数据集信息(未处理)
	var mainJsonStoreNoDeal = new Ext.data.JsonStore({
	    fields:mainFields,
	    data:config.noDeal
	});
	//主表数据集信息(已处理)
	var mainJsonStoreDeal = new Ext.data.JsonStore({
	    fields:mainFields,
	    data:config.deal
	});
	//主表数据集信息(已关闭)
	var mainJsonStoreClose = new Ext.data.JsonStore({
	    fields:mainFields,
	    data:config.close
	});
	//主表格表头信息
	var mainCol = [
	    {header:'用户名称'},
	    {header:'bug数量'}
	]; 
	//主表数据显示表格(未处理)
	var mainGridPanelNoDeal = new Ext.grid.GridPanel({
	    //数据集
	    store:mainJsonStoreNoDeal,
	    //表格列结构信息
	    columns:mainCol,
	    //表格事件监听
	    listeners:{
	        //表格行单击事件
	        rowclick:function(grid, rowIndex, e){ 
	            //获取表格单击行对象
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
			    //查询对应用户的明细数据
			    Ext.lt.RCP.server("mainshowservermms", "findBbBugsNoDeal", record.data.userName,function(resp) {
			        //动态刷新子单panel列表信息
			        detailJsonStoreNoDeal.loadData(resp.noDeal);
			    });
            }
	    },
	    border:false,
	    layout:'fit',
	    height:200,
	    region:'center'
	});
	//主表数据显示表格(已处理)
	var mainGridPanelDeal = new Ext.grid.GridPanel({
	    //数据集
	    store:mainJsonStoreDeal,
	    //表格列结构信息
	    columns:mainCol,
	    //表格事件监听
	    listeners:{
	        //表格行单击事件
	        rowclick:function(grid, rowIndex, e){ 
	            //获取表格单击行对象
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
			    //查询对应用户的明细数据
			    Ext.lt.RCP.server("mainshowservermms", "findBbBugsDeal", record.data.userName,function(resp) {
			        //动态刷新子单panel列表信息
			        detailJsonStoreDeal.loadData(resp.deal);
			    });
            }
	    },
	    border:false,
	    layout:'fit',
	    height:200,
	    region:'center'
	});
	//主表数据显示表格(已关闭)
	var mainGridPanelClose = new Ext.grid.GridPanel({
	    //数据集
	    store:mainJsonStoreClose,
	    //表格列结构信息
	    columns:mainCol,
	    //表格事件监听
	    listeners:{
	        //表格行单击事件
	        rowclick:function(grid, rowIndex, e){ 
	            //获取表格单击行对象
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
			    //查询对应用户的明细数据
			    Ext.lt.RCP.server("mainshowservermms", "findBbBugsClose", record.data.userName,function(resp) {
			        //动态刷新子单panel列表信息
			        detailJsonStoreClose.loadData(resp.close);
			    });
            }
	    },
	    border:false,
	    layout:'fit',
	    height:200,
	    region:'center'
	});
	/**
     *单击主表格行信息弹出表格明细数据
	 */
	//明细表数据结构信息
	var detailFields = [
	    {name:'bugId'},
	    {name:'caption'},
	    {name:'priority'},
	    {name:'product'},
	    {name:'component'},
	    {name:'createTime'}
	];
	//明细表数据集新消息(未处理)
	var detailJsonStoreNoDeal = new Ext.data.JsonStore({
	    fields:detailFields,
	    data:[]
	});
	//明细表数据集新消息(已处理)
	var detailJsonStoreDeal = new Ext.data.JsonStore({
	    fields:detailFields,
	    data:[]
	});
	//明细表数据集新消息(已关闭)
	var detailJsonStoreClose = new Ext.data.JsonStore({
	    fields:detailFields,
	    data:[]
	});
	//明细表表头信息
	var detailCol = [
	    {header:'bug号'},
	    {header:'bug标题'},
	    {header:'bug级次'},
	    {header:'产品'},
	    {header:'模块'},
	    {header:'创建时间'}
	];
	//明细表数据显示表格(未处理)
	var detailGridPanelNoDeal = new Ext.grid.GridPanel({
	    //数据集
	    store:detailJsonStoreNoDeal,
	    //表格列结构信息
	    columns:detailCol,
	    //表格事件监听
	    listeners:{
	        //表格行单击事件
	        rowdblclick:function(grid, rowIndex, e){ 
	            //获取表格单击行对象
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
                window.open('http://192.168.3.7:8000/bugzilla/show_bug.cgi?id='+record.data.bugId,'window');               
            }
	    },
	    viewConfig : {
             forceFit : true,
             getRowClass : function(record, rowIndex, rowParams, store) {
                 if (record.data.priority == 'P1') {
                     return 'x-grid3-row-alt';
                 }
	         }
	    },
	    layout:'fit',
	    height:340,
	    border:false,
	    region:'south'
	});
	//明细表数据显示表格(已处理)
	var detailGridPanelDeal = new Ext.grid.GridPanel({
	    //数据集
	    store:detailJsonStoreDeal,
	    //表格列结构信息
	    columns:detailCol,
	    //表格事件监听
	    listeners:{
	        //表格行单击事件
	        rowdblclick:function(grid, rowIndex, e){ 
	            //获取表格单击行对象
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
                window.open('http://192.168.3.7:8000/bugzilla/show_bug.cgi?id='+record.data.bugId,'window');               
            }
	    },
	    viewConfig : {
             forceFit : true,
             getRowClass : function(record, rowIndex, rowParams, store) {
                 if (record.data.priority == 'P1') {
                     return 'x-grid3-row-alt';
                 }
	         }
	    },
	    layout:'fit',
	    height:340,
	    border:false,
	    region:'south'
	});
	//明细表数据显示表格(已关闭)
	var detailGridPanelClose = new Ext.grid.GridPanel({
	    //数据集
	    store:detailJsonStoreClose,
	    //表格列结构信息
	    columns:detailCol,
	    //表格事件监听
	    listeners:{
	        //表格行单击事件
	        rowdblclick:function(grid, rowIndex, e){ 
	            //获取表格单击行对象
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
                window.open('http://192.168.3.7:8000/bugzilla/show_bug.cgi?id='+record.data.bugId,'window');               
            }
	    },
	    viewConfig : {
             forceFit : true,
             getRowClass : function(record, rowIndex, rowParams, store) {
                 if (record.data.priority == 'P1') {
                     return 'x-grid3-row-alt';
                 }
	         }
	    },
	    layout:'fit',
	    height:340,
	    border:false,
	    region:'south'
	});
	//定义panel存放主单和子单列表panel(未处理)
	var bbAllPanelNoDeal = new Ext.Panel({
	    layout:'border',
	    border:false,
	    height:540,
	    items:[mainGridPanelNoDeal,detailGridPanelNoDeal]
	});
	//定义panel存放主单和子单列表panel(已处理)
	var bbAllPanelDeal = new Ext.Panel({
	    layout:'border',
	    border:false,
	    height:540,
	    items:[mainGridPanelDeal,detailGridPanelDeal]
	});
	//定义panel存放主单和子单列表panel(已关闭)
	var bbAllPanelClose = new Ext.Panel({
	    layout:'border',
	    border:false,
	    height:540,
	    items:[mainGridPanelClose,detailGridPanelClose]
	});
	//显示未处理bug信息
	function showNoDeal(){
	    bbAllPanelNoDeal.render("bbAllNoDeal");
	}
	//显示已处理bug信息
	function showDeal(){
	    bbAllPanelDeal.render("bbAllDeal");
	}
	//显示已关闭的bug信息
	function showClose(){
	    bbAllPanelClose.render("bbAllClose");
	}
	return bbBugsAllTabs;
}
/***********************************所有P1级Bug显示*****************************************/
function impBugsAllShow(config) {
    //计算3类bug的总个数
    var noDealNumber = 0;
    for (var i = 0; i < config.noDeal.length; i++){
        noDealNumber += config.noDeal[i].bugNumber;
    }
    var dealNumber = 0;
    for (var i = 0; i < config.deal.length; i++){
        dealNumber += config.deal[i].bugNumber;
    }
    var closeNumber = 0;
    for (var i = 0; i < config.close.length; i++){
        closeNumber += config.close[i].bugNumber;
    }
	//定义基本bug显示的页签
	var impBugsAllTabs = new Ext.TabPanel({
	    id:'impBugsAllPanel',
	    //默认显示页签
	    activeTab:0,
	    items:[
	        {title:'未处理('+noDealNumber+')',
	        html:'<div id="impAllNoDeal"></div>',
	        listeners:{activate:showNoDeal}
	        },
	        {title:'已处理('+dealNumber+')',
	         html:'<div id="impAllDeal"></div>',
	         listeners:{activate:showDeal}
	        },
	        {title:'已关闭('+closeNumber+')',
	         html:'<div id="impAllClose"></div>',
	         listeners:{activate:showClose}
	        }
	    ]
	});
	/*定义gridPanal展示主表bug信息*/
	//主表数据结构信息
	var mainFields = [
	    {name:'userName'},
	    {name:'bugNumber'}
	];
	//主表数据集信息(未处理)
	var mainJsonStoreNoDeal = new Ext.data.JsonStore({
	    fields:mainFields,
	    data:config.noDeal
	});
	//主表数据集信息(已处理)
	var mainJsonStoreDeal = new Ext.data.JsonStore({
	    fields:mainFields,
	    data:config.deal
	});
	//主表数据集信息(已关闭)
	var mainJsonStoreClose = new Ext.data.JsonStore({
	    fields:mainFields,
	    data:config.close
	});
	//主表格表头信息
	var mainCol = [
	    {header:'用户名称'},
	    {header:'bug数量'}
	]; 
	//主表数据显示表格(未处理)
	var mainGridPanelNoDeal = new Ext.grid.GridPanel({
	    //数据集
	    store:mainJsonStoreNoDeal,
	    //表格列结构信息
	    columns:mainCol,
	    //表格事件监听
	    listeners:{
	        //表格行单击事件
	        rowclick:function(grid, rowIndex, e){ 
	            //获取表格单击行对象
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
			    //查询对应用户的明细数据
			    Ext.lt.RCP.server("mainshowservermms", "findImpBugsNoDeal", record.data.userName,function(resp) {
			        //动态刷新子单panel列表信息
			        detailJsonStoreNoDeal.loadData(resp.noDeal);
			    });
            }
	    },
	    border:false,
	    layout:'fit',
	    height:200,
	    region:'center'
	});
	//主表数据显示表格(已处理)
	var mainGridPanelDeal = new Ext.grid.GridPanel({
	    //数据集
	    store:mainJsonStoreDeal,
	    //表格列结构信息
	    columns:mainCol,
	    //表格事件监听
	    listeners:{
	        //表格行单击事件
	        rowclick:function(grid, rowIndex, e){ 
	            //获取表格单击行对象
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
			    //查询对应用户的明细数据
			    Ext.lt.RCP.server("mainshowservermms", "findImpBugsDeal", record.data.userName,function(resp) {
			        //动态刷新子单panel列表信息
			        detailJsonStoreDeal.loadData(resp.deal);
			    });
            }
	    },
	    border:false,
	    layout:'fit',
	    height:200,
	    region:'center'
	});
	//主表数据显示表格(已关闭)
	var mainGridPanelClose = new Ext.grid.GridPanel({
	    //数据集
	    store:mainJsonStoreClose,
	    //表格列结构信息
	    columns:mainCol,
	    //表格事件监听
	    listeners:{
	        //表格行单击事件
	        rowclick:function(grid, rowIndex, e){ 
	            //获取表格单击行对象
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
			    //查询对应用户的明细数据
			    Ext.lt.RCP.server("mainshowservermms", "findImpBugsClose", record.data.userName,function(resp) {
			        //动态刷新子单panel列表信息
			        detailJsonStoreClose.loadData(resp.close);
			    });
            }
	    },
	    border:false,
	    layout:'fit',
	    height:200,
	    region:'center'
	});
	/**
     *单击主表格行信息弹出表格明细数据
	 */
	//明细表数据结构信息
	var detailFields = [
	    {name:'bugId'},
	    {name:'caption'},
	    {name:'priority'},
	    {name:'product'},
	    {name:'component'},
	    {name:'createTime'}
	];
	//明细表数据集新消息(未处理)
	var detailJsonStoreNoDeal = new Ext.data.JsonStore({
	    fields:detailFields,
	    data:[]
	});
	//明细表数据集新消息(已处理)
	var detailJsonStoreDeal = new Ext.data.JsonStore({
	    fields:detailFields,
	    data:[]
	});
	//明细表数据集新消息(已关闭)
	var detailJsonStoreClose = new Ext.data.JsonStore({
	    fields:detailFields,
	    data:[]
	});
	//明细表表头信息
	var detailCol = [
	    {header:'bug号'},
	    {header:'bug标题'},
	    {header:'bug级次'},
	    {header:'产品'},
	    {header:'模块'},
	    {header:'创建时间'}
	];
	//明细表数据显示表格(未处理)
	var detailGridPanelNoDeal = new Ext.grid.GridPanel({
	    //数据集
	    store:detailJsonStoreNoDeal,
	    //表格列结构信息
	    columns:detailCol,
	    //表格事件监听
	    listeners:{
	        //表格行单击事件
	        rowdblclick:function(grid, rowIndex, e){ 
	            //获取表格单击行对象
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
                window.open('http://192.168.3.7:8000/bugzilla/show_bug.cgi?id='+record.data.bugId,'window');               
            }
	    },
	    layout:'fit',
	    height:340,
	    border:false,
	    region:'south'
	});
	//明细表数据显示表格(已处理)
	var detailGridPanelDeal = new Ext.grid.GridPanel({
	    //数据集
	    store:detailJsonStoreDeal,
	    //表格列结构信息
	    columns:detailCol,
	    //表格事件监听
	    listeners:{
	        //表格行单击事件
	        rowdblclick:function(grid, rowIndex, e){ 
	            //获取表格单击行对象
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
                window.open('http://192.168.3.7:8000/bugzilla/show_bug.cgi?id='+record.data.bugId,'window');               
            }
	    },
	    layout:'fit',
	    height:340,
	    border:false,
	    region:'south'
	});
	//明细表数据显示表格(已关闭)
	var detailGridPanelClose = new Ext.grid.GridPanel({
	    //数据集
	    store:detailJsonStoreClose,
	    //表格列结构信息
	    columns:detailCol,
	    //表格事件监听
	    listeners:{
	        //表格行单击事件
	        rowdblclick:function(grid, rowIndex, e){ 
	            //获取表格单击行对象
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
                window.open('http://192.168.3.7:8000/bugzilla/show_bug.cgi?id='+record.data.bugId,'window');               
            }
	    },
	    layout:'fit',
	    height:340,
	    border:false,
	    region:'south'
	});
	//定义panel存放主单和子单列表panel(未处理)
	var impAllPanelNoDeal = new Ext.Panel({
	    layout:'border',
	    border:false,
	    height:540,
	    items:[mainGridPanelNoDeal,detailGridPanelNoDeal]
	});
	//定义panel存放主单和子单列表panel(已处理)
	var impAllPanelDeal = new Ext.Panel({
	    layout:'border',
	    border:false,
	    height:540,
	    items:[mainGridPanelDeal,detailGridPanelDeal]
	});
	//定义panel存放主单和子单列表panel(已关闭)
	var impAllPanelClose = new Ext.Panel({
	    layout:'border',
	    border:false,
	    height:540,
	    items:[mainGridPanelClose,detailGridPanelClose]
	});
	//显示未处理bug信息
	function showNoDeal(){
	    impAllPanelNoDeal.render("impAllNoDeal");
	}
	//显示已处理bug信息
	function showDeal(){
	    impAllPanelDeal.render("impAllDeal");
	}
	//显示已关闭的bug信息
	function showClose(){
	    impAllPanelClose.render("impAllClose");
	}
	return impBugsAllTabs;
}
/***********************************个人工作列表信息显示(任务来源)*****************************************/
function tasksToShow(config) {
	//定义基本bug显示的页签
	var tasksToTabs = new Ext.TabPanel({
	    id:'tasksToPanel',
	    //默认显示页签
	    activeTab:0,
	    items:[
	        {title:'未处理',
	        html:'<div id="toNoDeal"></div>',
	        listeners:{activate:showToNoDeal}
	        },
	        {title:'已处理',
	         html:'<div id="toClose"></div>',
	         listeners:{activate:showToClose}
	        }	    ]
	});
	/**
     *任务列表信息
	 */
	//明细表数据结构信息
	var tasksFields = [
	    {name:'caption'},
	    {name:'detail'},
	    {name:'createTime'},
	    {name:'fromPerson'},
	    {name:'toPerson'}
	];
	//明细表数据集新消息(未处理)
	var tasksJsonStoreToNoDeal = new Ext.data.JsonStore({
	    fields:tasksFields,
	    data:config.toNoDeal
	});
	//明细表数据集新消息(已处理)
	var tasksJsonStoreToClose = new Ext.data.JsonStore({
	    fields:tasksFields,
	    data:config.toClose
	});
	//明细表表头信息
	var tasksCol = [
	    {header:'标题'},
	    {header:'任务说明'},
	    {header:'创建时间'},
	    {header:'任务来源'},
	    {header:'责任人'}
	];
	//明细表数据显示表格(未处理)
	var tasksGridPanelToNoDeal = new Ext.grid.GridPanel({
	    //数据集
	    store:tasksJsonStoreToNoDeal,
	    //表格列结构信息
	    columns:tasksCol,
	    border:false,
	    layout:'fit',
	    height:540
	});
	//明细表数据显示表格(已处理)
	var tasksGridPanelToClose = new Ext.grid.GridPanel({
	    //数据集
	    store:tasksJsonStoreToClose,
	    //表格列结构信息
	    columns:tasksCol,
	    border:false,
	    layout:'fit',
	    height:540
	});
	//显示未处理任务信息
	function showToNoDeal(){
	    tasksGridPanelToNoDeal.render("toNoDeal");
	}
	//显示已处理任务信息
	function showToClose(){
	    tasksGridPanelToClose.render("toClose");
	}
	return tasksToTabs;
}
/***********************************个人工作列表信息显示(任务去向)*****************************************/
function tasksFromShow(config) {
	//定义基本bug显示的页签
	var tasksFromTabs = new Ext.TabPanel({
	    id:'tasksFromPanel',
	    //默认显示页签
	    activeTab:0,
	    items:[
	        {title:'未处理',
	        html:'<div id="fromNoDeal"></div>',
	        listeners:{activate:showFromNoDeal}
	        },
	        {title:'已处理',
	         html:'<div id="fromClose"></div>',
	         listeners:{activate:showFromClose}
	        }	    ]
	});
	/**
     *任务列表信息
	 */
	//明细表数据结构信息
	var tasksFields = [
	    {name:'caption'},
	    {name:'detail'},
	    {name:'createTime'},
	    {name:'fromPerson'},
	    {name:'toPerson'}
	];
	//明细表数据集新消息(未处理)
	var tasksJsonStoreFromNoDeal = new Ext.data.JsonStore({
	    fields:tasksFields,
	    data:config.fromNoDeal
	});
	//明细表数据集新消息(已处理)
	var tasksJsonStoreFromClose = new Ext.data.JsonStore({
	    fields:tasksFields,
	    data:config.fromClose
	});
	//明细表表头信息
	var tasksCol = [
	    {header:'标题'},
	    {header:'任务说明'},
	    {header:'创建时间'},
	    {header:'任务来源'},
	    {header:'责任人'}
	];
	//明细表数据显示表格(未处理)
	var tasksGridPanelFromNoDeal = new Ext.grid.GridPanel({
	    //数据集
	    store:tasksJsonStoreFromNoDeal,
	    //表格列结构信息
	    columns:tasksCol,
	    border:false,
	    layout:'fit',
	    height:540
	});
	//明细表数据显示表格(已处理)
	var tasksGridPanelFromClose = new Ext.grid.GridPanel({
	    //数据集
	    store:tasksJsonStoreFromClose,
	    //表格列结构信息
	    columns:tasksCol,
	    border:false,
	    layout:'fit',
	    height:540
	});
	//显示未处理任务信息
	function showFromNoDeal(){
	    tasksGridPanelFromNoDeal.render("fromNoDeal");
	}
	//显示已处理任务信息
	function showFromClose(){
	    tasksGridPanelFromClose.render("fromClose");
	}
	return tasksFromTabs;
}
/***********************************测试组各产品bug统计*****************************************/
function productBugsShow(config) {
	/**
     *任务列表信息
	 */
	//明细表数据结构信息
	var productBugsFields = [
	    {name:'product'},
	    {name:'p1'},
	    {name:'p2'},
	    {name:'p3'},
	    {name:'p4'},
	    {name:'p5'},
	    {name:'bugs'}
	];
	//明细表数据集新消息(未处理)
	var productBugsJsonStore = new Ext.data.JsonStore({
	    fields:productBugsFields,
	    data:config.productBugs
	});
	//明细表表头信息
	var productBugsCol = [
	    {header:'系统名称'},
	    {header:'P1'},
	    {header:'P2'},
	    {header:'P3'},
	    {header:'P4'},
	    {header:'P5'},
	    {header:'合计'}
	];
	//明细表数据显示表格
	var productBugsGridPanel = new Ext.grid.GridPanel({
	    //数据集
	    id:'productBugsPanal',
	    store:productBugsJsonStore,
	    //表格列结构信息
	    columns:productBugsCol,
	    viewConfig : {
             forceFit : true
	    },
	    border:false,
	    layout:'fit',
	    height:540
	});
	return productBugsGridPanel;
}
/***********************************测试人员工作量统计*****************************************/
function testWorkLoadShow(config) {
	/**
     *任务列表信息
	 */
	//明细表数据结构信息
	var testWorkLoadFields = [
	    {name:'username'},
	    {name:'submitbugs'},
	    {name:'closeapp'}
	];
	//明细表数据集新消息(未处理)
	var testWorkLoadJsonStore = new Ext.data.JsonStore({
	    fields:testWorkLoadFields,
	    data:config.testWorkLoad
	});
	//明细表表头信息
	var testWorkLoadCol = [
	    {header:'人员'},
	    {header:'提交bug'},
	    {header:'关闭测试申请'}
	];
	//明细表数据显示表格
	var testWorkLoadGridPanel = new Ext.grid.GridPanel({
	    //数据集
	    id:'testWorkLoadPanal',
	    store:testWorkLoadJsonStore,
	    //表格列结构信息
	    columns:testWorkLoadCol,
	    viewConfig : {
             forceFit : true
	    },
	    border:false,
	    layout:'fit',
	    height:540
	});
	return testWorkLoadGridPanel;
}
/***********************************测试人员提交bug未处理*****************************************/
function testNoDealShow(config) {
	/**
     *任务列表信息
	 */
	//明细表数据结构信息
	var testNoDealFields = [
	    {name:'product'},
	    {name:'bugs'}
	];
	//明细表数据集新消息(未处理)
	var testNoDealJsonStore = new Ext.data.JsonStore({
	    fields:testNoDealFields,
	    data:config.testNoDeal
	});
	//明细表表头信息
	var testNoDealCol = [
	    {header:'系统名称'},
	    {header:'bug数'}
	];
	//明细表数据显示表格
	var testNoDealGridPanel = new Ext.grid.GridPanel({
	    //数据集
	    id:'testNoDealPanal',
	    store:testNoDealJsonStore,
	    //表格列结构信息
	    columns:testNoDealCol,
	    viewConfig : {
             forceFit : true
	    },
	    border:false,
	    layout:'fit',
	    height:540
	});
	return testNoDealGridPanel;
}
