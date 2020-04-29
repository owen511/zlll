// ��������ռ�
if (Ext.lt.mms == null) {
	Ext.lt.mms = {};
}
/********************************����bug��ʾ**********************************/
Ext.lt.mms.mainshow = function(service, config) {
	Ext.lt.mms.mainshow.service = service;
	//�������bug��ʾ��ҳǩ
	var basicBugTabs = new Ext.TabPanel({
	    id:'basicBugsPanel',
	    //Ĭ����ʾҳǩ
	    activeTab:0,
	    items:[
	        {title:'δ����('+config.noDeal.length+')',
	        html:'<div id="noDeal"></div>',
	        listeners:{activate:showNoDeal}
	        },
	        {title:'�Ѵ���('+config.deal.length+')',
	         html:'<div id="deal"></div>',
	         listeners:{activate:showDeal}
	        },
	        {title:'�ѹر�('+config.close.length+')',
	         html:'<div id="close"></div>',
	         listeners:{activate:showClose}
	        }
	    ]
	});
	/*����gridPanalչʾ����bug��Ϣ*/
	//�������ݽṹ��Ϣ
	var mainFields = [
	    {name:'userName'},
	    {name:'bugNumber'}
	];
	//�������ݼ���Ϣ
	var mainJsonStore = new Ext.data.JsonStore({
	    fields:mainFields,
	    data:config.mainTable
	});
	//������ͷ��Ϣ
	var mainCol = [
	    {header:'�û�����'},
	    {header:'bug����'}
	]; 
	//����������ʾ���
	var mainGridPanel = new Ext.grid.GridPanel({
	    //���ݼ�
	    store:mainJsonStore,
	    //����нṹ��Ϣ
	    columns:mainCol,
	    //����¼�����
	    listeners:{
	        //����е����¼�
	        rowdblclick:function(grid, rowIndex, e){ 
	            //��ȡ��񵥻��ж���
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
            }

	    },
	    height:300
	});
	
	/**
     *�������������Ϣ���������ϸ����
	 */
	//��ϸ�����ݽṹ��Ϣ
	var detailFields = [
	    {name:'bugId'},
	    {name:'caption'},
	    {name:'priority'},
	    {name:'product'},
	    {name:'component'},
	    {name:'createTime'}
	];
	//��ϸ�����ݼ�����Ϣ(δ����)
	var detailJsonStoreNoDeal = new Ext.data.JsonStore({
	    fields:detailFields,
	    data:config.noDeal
	});
	//��ϸ�����ݼ�����Ϣ(�Ѵ���)
	var detailJsonStoreDeal = new Ext.data.JsonStore({
	    fields:detailFields,
	    data:config.deal
	});
	//��ϸ�����ݼ�����Ϣ(�ѹر�)
	var detailJsonStoreClose = new Ext.data.JsonStore({
	    fields:detailFields,
	    data:config.close
	});
	//��ϸ���ͷ��Ϣ
	var detailCol = [
	    {header:'bug��'},
	    {header:'bug����'},
	    {header:'bug����'},
	    {header:'��Ʒ'},
	    {header:'ģ��'},
	    {header:'����ʱ��'}
	];
	//��ϸ��������ʾ���(δ����)
	var detailGridPanelNoDeal = new Ext.grid.GridPanel({
	    //���ݼ�
	    store:detailJsonStoreNoDeal,
	    //����нṹ��Ϣ
	    columns:detailCol,
	    //����¼�����
	    listeners:{
	        //����е����¼�
	        rowdblclick:function(grid, rowIndex, e){ 
	            //��ȡ��񵥻��ж���
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
	//��ϸ��������ʾ���(�Ѵ���)
	var detailGridPanelDeal = new Ext.grid.GridPanel({
	    //���ݼ�
	    store:detailJsonStoreDeal,
	    //����нṹ��Ϣ
	    columns:detailCol,
	    //����¼�����
	    listeners:{
	        //����е����¼�
	        rowdblclick:function(grid, rowIndex, e){ 
	            //��ȡ��񵥻��ж���
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
	//��ϸ��������ʾ���(�ѹر�)
	var detailGridPanelClose = new Ext.grid.GridPanel({
	    //���ݼ�
	    store:detailJsonStoreClose,
	    //����нṹ��Ϣ
	    columns:detailCol,
	    //����¼�����
	    listeners:{
	        //����е����¼�
	        rowdblclick:function(grid, rowIndex, e){ 
	            //��ȡ��񵥻��ж���
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
	//��ʾδ����bug��Ϣ
	function showNoDeal(){
	    detailGridPanelNoDeal.render("noDeal");
	}
	//��ʾ�Ѵ���bug��Ϣ
	function showDeal(){
	    detailGridPanelDeal.render("deal");
	}
	//��ʾ�ѹرյ�bug��Ϣ
	function showClose(){
	    detailGridPanelClose.render("close");
	}
	return basicBugTabs;
}
/***********************************ACbug��ʾ*****************************************/
function acBugsShow(config) {
	//�������bug��ʾ��ҳǩ
	var acBugTabs = new Ext.TabPanel({
	    id:'acBugsPanel',
	    //Ĭ����ʾҳǩ
	    activeTab:0,
	    items:[
	        {title:'δ����('+config.noDeal.length+')',
	        html:'<div id="acNoDeal"></div>',
	        listeners:{activate:showNoDeal}
	        },
	        {title:'�Ѵ���('+config.deal.length+')',
	         html:'<div id="acDeal"></div>',
	         listeners:{activate:showDeal}
	        },
	        {title:'�ѹر�('+config.close.length+')',
	         html:'<div id="acClose"></div>',
	         listeners:{activate:showClose}
	        }
	    ]
	});
	/*����gridPanalչʾ����bug��Ϣ*/
	//�������ݽṹ��Ϣ
	var mainFields = [
	    {name:'userName'},
	    {name:'bugNumber'}
	];
	//�������ݼ���Ϣ
	var mainJsonStore = new Ext.data.JsonStore({
	    fields:mainFields,
	    data:config.mainTable
	});
	//������ͷ��Ϣ
	var mainCol = [
	    {header:'�û�����'},
	    {header:'bug����'}
	]; 
	//����������ʾ���
	var mainGridPanel = new Ext.grid.GridPanel({
	    //���ݼ�
	    store:mainJsonStore,
	    //����нṹ��Ϣ
	    columns:mainCol,
	    //����¼�����
	    listeners:{
	        //����е����¼�
	        rowdblclick:function(grid, rowIndex, e){ 
	            //��ȡ��񵥻��ж���
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
            }

	    },
	    height:300
	});
	
	/**
     *�������������Ϣ���������ϸ����
	 */
	//��ϸ�����ݽṹ��Ϣ
	var detailFields = [
	    {name:'bugId'},
	    {name:'caption'},
	    {name:'priority'},
	    {name:'product'},
	    {name:'component'},
	    {name:'createTime'}
	];
	//��ϸ�����ݼ�����Ϣ(δ����)
	var detailJsonStoreNoDeal = new Ext.data.JsonStore({
	    fields:detailFields,
	    data:config.noDeal
	});
	//��ϸ�����ݼ�����Ϣ(�Ѵ���)
	var detailJsonStoreDeal = new Ext.data.JsonStore({
	    fields:detailFields,
	    data:config.deal
	});
	//��ϸ�����ݼ�����Ϣ(�ѹر�)
	var detailJsonStoreClose = new Ext.data.JsonStore({
	    fields:detailFields,
	    data:config.close
	});
	//��ϸ���ͷ��Ϣ
	var detailCol = [
	    {header:'bug��'},
	    {header:'bug����'},
	    {header:'bug����'},
	    {header:'��Ʒ'},
	    {header:'ģ��'},
	    {header:'����ʱ��'}
	];
	//��ϸ��������ʾ���(δ����)
	var detailGridPanelNoDeal = new Ext.grid.GridPanel({
	    //���ݼ�
	    store:detailJsonStoreNoDeal,
	    //����нṹ��Ϣ
	    columns:detailCol,
	    //����¼�����
	    listeners:{
	        //����е����¼�
	        rowdblclick:function(grid, rowIndex, e){ 
	            //��ȡ��񵥻��ж���
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
	//��ϸ��������ʾ���(�Ѵ���)
	var detailGridPanelDeal = new Ext.grid.GridPanel({
	    //���ݼ�
	    store:detailJsonStoreDeal,
	    //����нṹ��Ϣ
	    columns:detailCol,
	    //����¼�����
	    listeners:{
	        //����е����¼�
	        rowdblclick:function(grid, rowIndex, e){ 
	            //��ȡ��񵥻��ж���
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
	//��ϸ��������ʾ���(�ѹر�)
	var detailGridPanelClose = new Ext.grid.GridPanel({
	    //���ݼ�
	    store:detailJsonStoreClose,
	    //����нṹ��Ϣ
	    columns:detailCol,
	    //����¼�����
	    listeners:{
	        //����е����¼�
	        rowdblclick:function(grid, rowIndex, e){ 
	            //��ȡ��񵥻��ж���
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
	//��ʾδ����bug��Ϣ
	function showNoDeal(){
	    detailGridPanelNoDeal.render("acNoDeal");
	}
	//��ʾ�Ѵ���bug��Ϣ
	function showDeal(){
	    detailGridPanelDeal.render("acDeal");
	}
	//��ʾ�ѹرյ�bug��Ϣ
	function showClose(){
	    detailGridPanelClose.render("acClose");
	}
	return acBugTabs;
}
/***********************************BBbug��ʾ*****************************************/
function bbBugsShow(config) {
	//�������bug��ʾ��ҳǩ
	var bbBugTabs = new Ext.TabPanel({
	    id:'bbBugsPanel',
	    //Ĭ����ʾҳǩ
	    activeTab:0,
	    items:[
	        {title:'δ����('+config.noDeal.length+')',
	        html:'<div id="bbNoDeal"></div>',
	        listeners:{activate:showNoDeal}
	        },
	        {title:'�Ѵ���('+config.deal.length+')',
	         html:'<div id="bbDeal"></div>',
	         listeners:{activate:showDeal}
	        },
	        {title:'�ѹر�('+config.close.length+')',
	         html:'<div id="bbClose"></div>',
	         listeners:{activate:showClose}
	        }
	    ]
	});
	/*����gridPanalչʾ����bug��Ϣ*/
	//�������ݽṹ��Ϣ
	var mainFields = [
	    {name:'userName'},
	    {name:'bugNumber'}
	];
	//�������ݼ���Ϣ
	var mainJsonStore = new Ext.data.JsonStore({
	    fields:mainFields,
	    data:config.mainTable
	});
	//������ͷ��Ϣ
	var mainCol = [
	    {header:'�û�����'},
	    {header:'bug����'}
	]; 
	//����������ʾ���
	var mainGridPanel = new Ext.grid.GridPanel({
	    //���ݼ�
	    store:mainJsonStore,
	    //����нṹ��Ϣ
	    columns:mainCol,
	    //����¼�����
	    listeners:{
	        //����е����¼�
	        rowdblclick:function(grid, rowIndex, e){ 
	            //��ȡ��񵥻��ж���
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
            }

	    },
	    height:300
	});
	
	/**
     *�������������Ϣ���������ϸ����
	 */
	//��ϸ�����ݽṹ��Ϣ
	var detailFields = [
	    {name:'bugId'},
	    {name:'caption'},
	    {name:'priority'},
	    {name:'product'},
	    {name:'component'},
	    {name:'createTime'}
	];
	//��ϸ�����ݼ�����Ϣ(δ����)
	var detailJsonStoreNoDeal = new Ext.data.JsonStore({
	    fields:detailFields,
	    data:config.noDeal
	});
	//��ϸ�����ݼ�����Ϣ(�Ѵ���)
	var detailJsonStoreDeal = new Ext.data.JsonStore({
	    fields:detailFields,
	    data:config.deal
	});
	//��ϸ�����ݼ�����Ϣ(�ѹر�)
	var detailJsonStoreClose = new Ext.data.JsonStore({
	    fields:detailFields,
	    data:config.close
	});
	//��ϸ���ͷ��Ϣ
	var detailCol = [
	    {header:'bug��'},
	    {header:'bug����'},
	    {header:'bug����'},
	    {header:'��Ʒ'},
	    {header:'ģ��'},
	    {header:'����ʱ��'}
	];
	//��ϸ��������ʾ���(δ����)
	var detailGridPanelNoDeal = new Ext.grid.GridPanel({
	    //���ݼ�
	    store:detailJsonStoreNoDeal,
	    //����нṹ��Ϣ
	    columns:detailCol,
	    //����¼�����
	    listeners:{
	        //����е����¼�
	        rowdblclick:function(grid, rowIndex, e){ 
	            //��ȡ��񵥻��ж���
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
	//��ϸ��������ʾ���(�Ѵ���)
	var detailGridPanelDeal = new Ext.grid.GridPanel({
	    //���ݼ�
	    store:detailJsonStoreDeal,
	    //����нṹ��Ϣ
	    columns:detailCol,
	    //����¼�����
	    listeners:{
	        //����е����¼�
	        rowdblclick:function(grid, rowIndex, e){ 
	            //��ȡ��񵥻��ж���
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
	//��ϸ��������ʾ���(�ѹر�)
	var detailGridPanelClose = new Ext.grid.GridPanel({
	    //���ݼ�
	    store:detailJsonStoreClose,
	    //����нṹ��Ϣ
	    columns:detailCol,
	    //����¼�����
	    listeners:{
	        //����е����¼�
	        rowdblclick:function(grid, rowIndex, e){ 
	            //��ȡ��񵥻��ж���
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
	//��ʾδ����bug��Ϣ
	function showNoDeal(){
	    detailGridPanelNoDeal.render("bbNoDeal");
	}
	//��ʾ�Ѵ���bug��Ϣ
	function showDeal(){
	    detailGridPanelDeal.render("bbDeal");
	}
	//��ʾ�ѹرյ�bug��Ϣ
	function showClose(){
	    detailGridPanelClose.render("bbClose");
	}
	return bbBugTabs;
}

/***********************************ImpBug��ʾ*****************************************/
function impBugsShow(config) {
	//�������bug��ʾ��ҳǩ
	var impBugTabs = new Ext.TabPanel({
	    id:'impBugsPanel',
	    //Ĭ����ʾҳǩ
	    activeTab:0,
	    items:[
	        {title:'δ����('+config.noDeal.length+')',
	        html:'<div id="impNoDeal"></div>',
	        listeners:{activate:showNoDeal}
	        },
	        {title:'�Ѵ���('+config.deal.length+')',
	         html:'<div id="impDeal"></div>',
	         listeners:{activate:showDeal}
	        },
	        {title:'�ѹر�('+config.close.length+')',
	         html:'<div id="impClose"></div>',
	         listeners:{activate:showClose}
	        }
	    ]
	});
	/*����gridPanalչʾ����bug��Ϣ*/
	//�������ݽṹ��Ϣ
	var mainFields = [
	    {name:'userName'},
	    {name:'bugNumber'}
	];
	//�������ݼ���Ϣ
	var mainJsonStore = new Ext.data.JsonStore({
	    fields:mainFields,
	    data:config.mainTable
	});
	//������ͷ��Ϣ
	var mainCol = [
	    {header:'�û�����'},
	    {header:'bug����'}
	]; 
	//����������ʾ���
	var mainGridPanel = new Ext.grid.GridPanel({
	    //���ݼ�
	    store:mainJsonStore,
	    //����нṹ��Ϣ
	    columns:mainCol,
	    //����¼�����
	    listeners:{
	        //����е����¼�
	        rowdblclick:function(grid, rowIndex, e){ 
	            //��ȡ��񵥻��ж���
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
            }

	    },
	    height:300
	});
	
	/**
     *�������������Ϣ���������ϸ����
	 */
	//��ϸ�����ݽṹ��Ϣ
	var detailFields = [
	    {name:'bugId'},
	    {name:'caption'},
	    {name:'priority'},
	    {name:'product'},
	    {name:'component'},
	    {name:'createTime'}
	];
	//��ϸ�����ݼ�����Ϣ(δ����)
	var detailJsonStoreNoDeal = new Ext.data.JsonStore({
	    fields:detailFields,
	    data:config.noDeal
	});
	//��ϸ�����ݼ�����Ϣ(�Ѵ���)
	var detailJsonStoreDeal = new Ext.data.JsonStore({
	    fields:detailFields,
	    data:config.deal
	});
	//��ϸ�����ݼ�����Ϣ(�ѹر�)
	var detailJsonStoreClose = new Ext.data.JsonStore({
	    fields:detailFields,
	    data:config.close
	});
	//��ϸ���ͷ��Ϣ
	var detailCol = [
	    {header:'bug��'},
	    {header:'bug����'},
	    {header:'bug����'},
	    {header:'��Ʒ'},
	    {header:'ģ��'},
	    {header:'����ʱ��'}
	];
	//��ϸ��������ʾ���(δ����)
	var detailGridPanelNoDeal = new Ext.grid.GridPanel({
	    //���ݼ�
	    store:detailJsonStoreNoDeal,
	    //����нṹ��Ϣ
	    columns:detailCol,
	    //����¼�����
	    listeners:{
	        //����е����¼�
	        rowdblclick:function(grid, rowIndex, e){ 
	            //��ȡ��񵥻��ж���
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
                window.open('http://192.168.3.7:8000/bugzilla/show_bug.cgi?id='+record.data.bugId,'window');               
            }
	    },
	    border:false,
	    layout:'fit',
	    height:540
	});
	//��ϸ��������ʾ���(�Ѵ���)
	var detailGridPanelDeal = new Ext.grid.GridPanel({
	    //���ݼ�
	    store:detailJsonStoreDeal,
	    //����нṹ��Ϣ
	    columns:detailCol,
	    //����¼�����
	    listeners:{
	        //����е����¼�
	        rowdblclick:function(grid, rowIndex, e){ 
	            //��ȡ��񵥻��ж���
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
                window.open('http://192.168.3.7:8000/bugzilla/show_bug.cgi?id='+record.data.bugId,'window');               
            }
	    },
	    border:false,
	    layout:'fit',
	    height:540
	});
	//��ϸ��������ʾ���(�ѹر�)
	var detailGridPanelClose = new Ext.grid.GridPanel({
	    //���ݼ�
	    store:detailJsonStoreClose,
	    //����нṹ��Ϣ
	    columns:detailCol,
	    //����¼�����
	    listeners:{
	        //����е����¼�
	        rowdblclick:function(grid, rowIndex, e){ 
	            //��ȡ��񵥻��ж���
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
                window.open('http://192.168.3.7:8000/bugzilla/show_bug.cgi?id='+record.data.bugId,'window');               
            }
	    },
	    border:false,
	    layout:'fit',
	    height:540
	});
	//��ʾδ����bug��Ϣ
	function showNoDeal(){
	    detailGridPanelNoDeal.render("impNoDeal");
	}
	//��ʾ�Ѵ���bug��Ϣ
	function showDeal(){
	    detailGridPanelDeal.render("impDeal");
	}
	//��ʾ�ѹرյ�bug��Ϣ
	function showClose(){
	    detailGridPanelClose.render("impClose");
	}
	return impBugTabs;
}
/***********************************���л���Bug��ʾ*****************************************/
function basicBugsAllShow(config) {
    //����3��bug���ܸ���
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
	//�������bug��ʾ��ҳǩ
	var basicBugsAllTabs = new Ext.TabPanel({
	    id:'basicBugsAllPanel',
	    //Ĭ����ʾҳǩ
	    activeTab:0,
	    items:[
	        {title:'δ����('+noDealNumber+')',
	        html:'<div id="basicAllNoDeal"></div>',
	        listeners:{activate:showNoDeal}
	        },
	        {title:'�Ѵ���('+dealNumber+')',
	         html:'<div id="basicAllDeal"></div>',
	         listeners:{activate:showDeal}
	        },
	        {title:'�ѹر�('+closeNumber+')',
	         html:'<div id="basicAllClose"></div>',
	         listeners:{activate:showClose}
	        }
	    ]
	});
	/*����gridPanalչʾ����bug��Ϣ*/
	//�������ݽṹ��Ϣ
	var mainFields = [
	    {name:'userName'},
	    {name:'bugNumber'}
	];
	//�������ݼ���Ϣ(δ����)
	var mainJsonStoreNoDeal = new Ext.data.JsonStore({
	    fields:mainFields,
	    data:config.noDeal
	});
	//�������ݼ���Ϣ(�Ѵ���)
	var mainJsonStoreDeal = new Ext.data.JsonStore({
	    fields:mainFields,
	    data:config.deal
	});
	//�������ݼ���Ϣ(�ѹر�)
	var mainJsonStoreClose = new Ext.data.JsonStore({
	    fields:mainFields,
	    data:config.close
	});
	//������ͷ��Ϣ
	var mainCol = [
	    {header:'�û�����'},
	    {header:'bug����'}
	]; 
	//����������ʾ���(δ����)
	var mainGridPanelNoDeal = new Ext.grid.GridPanel({
	    //���ݼ�
	    store:mainJsonStoreNoDeal,
	    //����нṹ��Ϣ
	    columns:mainCol,
	    //����¼�����
	    listeners:{
	        //����е����¼�
	        rowclick:function(grid, rowIndex, e){ 
	            //��ȡ��񵥻��ж���
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
			    //��ѯ��Ӧ�û�����ϸ����
			    Ext.lt.RCP.server("mainshowservermms", "findBasicBugsNoDeal", record.data.userName,function(resp) {
			        //��̬ˢ���ӵ�panel�б���Ϣ
			        detailJsonStoreNoDeal.loadData(resp.noDeal);
			    });
            }
	    },
	    border:false,
	    layout:'fit',
	    height:200,
	    region:'center'
	});
	//����������ʾ���(�Ѵ���)
	var mainGridPanelDeal = new Ext.grid.GridPanel({
	    //���ݼ�
	    store:mainJsonStoreDeal,
	    //����нṹ��Ϣ
	    columns:mainCol,
	    //����¼�����
	    listeners:{
	        //����е����¼�
	        rowclick:function(grid, rowIndex, e){ 
	            //��ȡ��񵥻��ж���
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
			    //��ѯ��Ӧ�û�����ϸ����
			    Ext.lt.RCP.server("mainshowservermms", "findBasicBugsDeal", record.data.userName,function(resp) {
			        //��̬ˢ���ӵ�panel�б���Ϣ
			        detailJsonStoreDeal.loadData(resp.deal);
			    });
            }
	    },
	    border:false,
	    layout:'fit',
	    height:200,
	    region:'center'
	});
	//����������ʾ���(�ѹر�)
	var mainGridPanelClose = new Ext.grid.GridPanel({
	    //���ݼ�
	    store:mainJsonStoreClose,
	    //����нṹ��Ϣ
	    columns:mainCol,
	    //����¼�����
	    listeners:{
	        //����е����¼�
	        rowclick:function(grid, rowIndex, e){ 
	            //��ȡ��񵥻��ж���
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
			    //��ѯ��Ӧ�û�����ϸ����
			    Ext.lt.RCP.server("mainshowservermms", "findBasicBugsClose", record.data.userName,function(resp) {
			        //��̬ˢ���ӵ�panel�б���Ϣ
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
     *�������������Ϣ���������ϸ����
	 */
	//��ϸ�����ݽṹ��Ϣ
	var detailFields = [
	    {name:'bugId'},
	    {name:'caption'},
	    {name:'priority'},
	    {name:'product'},
	    {name:'component'},
	    {name:'createTime'}
	];
	//��ϸ�����ݼ�����Ϣ(δ����)
	var detailJsonStoreNoDeal = new Ext.data.JsonStore({
	    fields:detailFields,
	    data:[]
	});
	//��ϸ�����ݼ�����Ϣ(�Ѵ���)
	var detailJsonStoreDeal = new Ext.data.JsonStore({
	    fields:detailFields,
	    data:[]
	});
	//��ϸ�����ݼ�����Ϣ(�ѹر�)
	var detailJsonStoreClose = new Ext.data.JsonStore({
	    fields:detailFields,
	    data:[]
	});
	//��ϸ���ͷ��Ϣ
	var detailCol = [
	    {header:'bug��'},
	    {header:'bug����'},
	    {header:'bug����'},
	    {header:'��Ʒ'},
	    {header:'ģ��'},
	    {header:'����ʱ��'}
	];
	//��ϸ��������ʾ���(δ����)
	var detailGridPanelNoDeal = new Ext.grid.GridPanel({
	    //���ݼ�
	    store:detailJsonStoreNoDeal,
	    //����нṹ��Ϣ
	    columns:detailCol,
	    //����¼�����
	    listeners:{
	        //����е����¼�
	        rowdblclick:function(grid, rowIndex, e){ 
	            //��ȡ��񵥻��ж���
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
	//��ϸ��������ʾ���(�Ѵ���)
	var detailGridPanelDeal = new Ext.grid.GridPanel({
	    //���ݼ�
	    store:detailJsonStoreDeal,
	    //����нṹ��Ϣ
	    columns:detailCol,
	    //����¼�����
	    listeners:{
	        //����е����¼�
	        rowdblclick:function(grid, rowIndex, e){ 
	            //��ȡ��񵥻��ж���
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
	//��ϸ��������ʾ���(�ѹر�)
	var detailGridPanelClose = new Ext.grid.GridPanel({
	    //���ݼ�
	    store:detailJsonStoreClose,
	    //����нṹ��Ϣ
	    columns:detailCol,
	    //����¼�����
	    listeners:{
	        //����е����¼�
	        rowdblclick:function(grid, rowIndex, e){ 
	            //��ȡ��񵥻��ж���
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
	//����panel����������ӵ��б�panel(δ����)
	var basicAllPanelNoDeal = new Ext.Panel({
	    layout:'border',
	    border:false,
	    height:540,
	    items:[mainGridPanelNoDeal,detailGridPanelNoDeal]
	});
	//����panel����������ӵ��б�panel(�Ѵ���)
	var basicAllPanelDeal = new Ext.Panel({
	    layout:'border',
	    border:false,
	    height:540,
	    items:[mainGridPanelDeal,detailGridPanelDeal]
	});
	//����panel����������ӵ��б�panel(�ѹر�)
	var basicAllPanelClose = new Ext.Panel({
	    layout:'border',
	    border:false,
	    height:540,
	    items:[mainGridPanelClose,detailGridPanelClose]
	});
	//��ʾδ����bug��Ϣ
	function showNoDeal(){
	    basicAllPanelNoDeal.render("basicAllNoDeal");
	}
	//��ʾ�Ѵ���bug��Ϣ
	function showDeal(){
	    basicAllPanelDeal.render("basicAllDeal");
	}
	//��ʾ�ѹرյ�bug��Ϣ
	function showClose(){
	    basicAllPanelClose.render("basicAllClose");
	}
	return basicBugsAllTabs;
}
/***********************************����ACBug��ʾ*****************************************/
function acBugsAllShow(config) {
    //����3��bug���ܸ���
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
	//�������bug��ʾ��ҳǩ
	var acBugsAllTabs = new Ext.TabPanel({
	    id:'acBugsAllPanel',
	    //Ĭ����ʾҳǩ
	    activeTab:0,
	    items:[
	        {title:'δ����('+noDealNumber+')',
	        html:'<div id="acAllNoDeal"></div>',
	        listeners:{activate:showNoDeal}
	        },
	        {title:'�Ѵ���('+dealNumber+')',
	         html:'<div id="acAllDeal"></div>',
	         listeners:{activate:showDeal}
	        },
	        {title:'�ѹر�('+closeNumber+')',
	         html:'<div id="acAllClose"></div>',
	         listeners:{activate:showClose}
	        }
	    ]
	});
	/*����gridPanalչʾ����bug��Ϣ*/
	//�������ݽṹ��Ϣ
	var mainFields = [
	    {name:'userName'},
	    {name:'bugNumber'}
	];
	//�������ݼ���Ϣ(δ����)
	var mainJsonStoreNoDeal = new Ext.data.JsonStore({
	    fields:mainFields,
	    data:config.noDeal
	});
	//�������ݼ���Ϣ(�Ѵ���)
	var mainJsonStoreDeal = new Ext.data.JsonStore({
	    fields:mainFields,
	    data:config.deal
	});
	//�������ݼ���Ϣ(�ѹر�)
	var mainJsonStoreClose = new Ext.data.JsonStore({
	    fields:mainFields,
	    data:config.close
	});
	//������ͷ��Ϣ
	var mainCol = [
	    {header:'�û�����'},
	    {header:'bug����'}
	]; 
	//����������ʾ���(δ����)
	var mainGridPanelNoDeal = new Ext.grid.GridPanel({
	    //���ݼ�
	    store:mainJsonStoreNoDeal,
	    //����нṹ��Ϣ
	    columns:mainCol,
	    //����¼�����
	    listeners:{
	        //����е����¼�
	        rowclick:function(grid, rowIndex, e){ 
	            //��ȡ��񵥻��ж���
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
			    //��ѯ��Ӧ�û�����ϸ����
			    Ext.lt.RCP.server("mainshowservermms", "findAcBugsNoDeal", record.data.userName,function(resp) {
			        //��̬ˢ���ӵ�panel�б���Ϣ
			        detailJsonStoreNoDeal.loadData(resp.noDeal);
			    });
            }
	    },
	    border:false,
	    layout:'fit',
	    height:200,
	    region:'center'
	});
	//����������ʾ���(�Ѵ���)
	var mainGridPanelDeal = new Ext.grid.GridPanel({
	    //���ݼ�
	    store:mainJsonStoreDeal,
	    //����нṹ��Ϣ
	    columns:mainCol,
	    //����¼�����
	    listeners:{
	        //����е����¼�
	        rowclick:function(grid, rowIndex, e){ 
	            //��ȡ��񵥻��ж���
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
			    //��ѯ��Ӧ�û�����ϸ����
			    Ext.lt.RCP.server("mainshowservermms", "findAcBugsDeal", record.data.userName,function(resp) {
			        //��̬ˢ���ӵ�panel�б���Ϣ
			        detailJsonStoreDeal.loadData(resp.deal);
			    });
            }
	    },
	    border:false,
	    layout:'fit',
	    height:200,
	    region:'center'
	});
	//����������ʾ���(�ѹر�)
	var mainGridPanelClose = new Ext.grid.GridPanel({
	    //���ݼ�
	    store:mainJsonStoreClose,
	    //����нṹ��Ϣ
	    columns:mainCol,
	    //����¼�����
	    listeners:{
	        //����е����¼�
	        rowclick:function(grid, rowIndex, e){ 
	            //��ȡ��񵥻��ж���
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
			    //��ѯ��Ӧ�û�����ϸ����
			    Ext.lt.RCP.server("mainshowservermms", "findAcBugsClose", record.data.userName,function(resp) {
			        //��̬ˢ���ӵ�panel�б���Ϣ
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
     *�������������Ϣ���������ϸ����
	 */
	//��ϸ�����ݽṹ��Ϣ
	var detailFields = [
	    {name:'bugId'},
	    {name:'caption'},
	    {name:'priority'},
	    {name:'product'},
	    {name:'component'},
	    {name:'createTime'}
	];
	//��ϸ�����ݼ�����Ϣ(δ����)
	var detailJsonStoreNoDeal = new Ext.data.JsonStore({
	    fields:detailFields,
	    data:[]
	});
	//��ϸ�����ݼ�����Ϣ(�Ѵ���)
	var detailJsonStoreDeal = new Ext.data.JsonStore({
	    fields:detailFields,
	    data:[]
	});
	//��ϸ�����ݼ�����Ϣ(�ѹر�)
	var detailJsonStoreClose = new Ext.data.JsonStore({
	    fields:detailFields,
	    data:[]
	});
	//��ϸ���ͷ��Ϣ
	var detailCol = [
	    {header:'bug��'},
	    {header:'bug����'},
	    {header:'bug����'},
	    {header:'��Ʒ'},
	    {header:'ģ��'},
	    {header:'����ʱ��'}
	];
	//��ϸ��������ʾ���(δ����)
	var detailGridPanelNoDeal = new Ext.grid.GridPanel({
	    //���ݼ�
	    store:detailJsonStoreNoDeal,
	    //����нṹ��Ϣ
	    columns:detailCol,
	    //����¼�����
	    listeners:{
	        //����е����¼�
	        rowdblclick:function(grid, rowIndex, e){ 
	            //��ȡ��񵥻��ж���
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
	//��ϸ��������ʾ���(�Ѵ���)
	var detailGridPanelDeal = new Ext.grid.GridPanel({
	    //���ݼ�
	    store:detailJsonStoreDeal,
	    //����нṹ��Ϣ
	    columns:detailCol,
	    //����¼�����
	    listeners:{
	        //����е����¼�
	        rowdblclick:function(grid, rowIndex, e){ 
	            //��ȡ��񵥻��ж���
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
	//��ϸ��������ʾ���(�ѹر�)
	var detailGridPanelClose = new Ext.grid.GridPanel({
	    //���ݼ�
	    store:detailJsonStoreClose,
	    //����нṹ��Ϣ
	    columns:detailCol,
	    //����¼�����
	    listeners:{
	        //����е����¼�
	        rowdblclick:function(grid, rowIndex, e){ 
	            //��ȡ��񵥻��ж���
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
	//����panel����������ӵ��б�panel(δ����)
	var acAllPanelNoDeal = new Ext.Panel({
	    layout:'border',
	    border:false,
	    height:540,
	    items:[mainGridPanelNoDeal,detailGridPanelNoDeal]
	});
	//����panel����������ӵ��б�panel(�Ѵ���)
	var acAllPanelDeal = new Ext.Panel({
	    layout:'border',
	    border:false,
	    height:540,
	    items:[mainGridPanelDeal,detailGridPanelDeal]
	});
	//����panel����������ӵ��б�panel(�ѹر�)
	var acAllPanelClose = new Ext.Panel({
	    layout:'border',
	    border:false,
	    height:540,
	    items:[mainGridPanelClose,detailGridPanelClose]
	});
	//��ʾδ����bug��Ϣ
	function showNoDeal(){
	    acAllPanelNoDeal.render("acAllNoDeal");
	}
	//��ʾ�Ѵ���bug��Ϣ
	function showDeal(){
	    acAllPanelDeal.render("acAllDeal");
	}
	//��ʾ�ѹرյ�bug��Ϣ
	function showClose(){
	    acAllPanelClose.render("acAllClose");
	}
	return acBugsAllTabs;
}
/***********************************����BB����������Bug��ʾ*****************************************/
function bbBugsAllShow(config) {
    //����3��bug���ܸ���
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
	//�������bug��ʾ��ҳǩ
	var bbBugsAllTabs = new Ext.TabPanel({
	    id:'bbBugsAllPanel',
	    //Ĭ����ʾҳǩ
	    activeTab:0,
	    items:[
	        {title:'δ����('+noDealNumber+')',
	        html:'<div id="bbAllNoDeal"></div>',
	        listeners:{activate:showNoDeal}
	        },
	        {title:'�Ѵ���('+dealNumber+')',
	         html:'<div id="bbAllDeal"></div>',
	         listeners:{activate:showDeal}
	        },
	        {title:'�ѹر�('+closeNumber+')',
	         html:'<div id="bbAllClose"></div>',
	         listeners:{activate:showClose}
	        }
	    ]
	});
	/*����gridPanalչʾ����bug��Ϣ*/
	//�������ݽṹ��Ϣ
	var mainFields = [
	    {name:'userName'},
	    {name:'bugNumber'}
	];
	//�������ݼ���Ϣ(δ����)
	var mainJsonStoreNoDeal = new Ext.data.JsonStore({
	    fields:mainFields,
	    data:config.noDeal
	});
	//�������ݼ���Ϣ(�Ѵ���)
	var mainJsonStoreDeal = new Ext.data.JsonStore({
	    fields:mainFields,
	    data:config.deal
	});
	//�������ݼ���Ϣ(�ѹر�)
	var mainJsonStoreClose = new Ext.data.JsonStore({
	    fields:mainFields,
	    data:config.close
	});
	//������ͷ��Ϣ
	var mainCol = [
	    {header:'�û�����'},
	    {header:'bug����'}
	]; 
	//����������ʾ���(δ����)
	var mainGridPanelNoDeal = new Ext.grid.GridPanel({
	    //���ݼ�
	    store:mainJsonStoreNoDeal,
	    //����нṹ��Ϣ
	    columns:mainCol,
	    //����¼�����
	    listeners:{
	        //����е����¼�
	        rowclick:function(grid, rowIndex, e){ 
	            //��ȡ��񵥻��ж���
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
			    //��ѯ��Ӧ�û�����ϸ����
			    Ext.lt.RCP.server("mainshowservermms", "findBbBugsNoDeal", record.data.userName,function(resp) {
			        //��̬ˢ���ӵ�panel�б���Ϣ
			        detailJsonStoreNoDeal.loadData(resp.noDeal);
			    });
            }
	    },
	    border:false,
	    layout:'fit',
	    height:200,
	    region:'center'
	});
	//����������ʾ���(�Ѵ���)
	var mainGridPanelDeal = new Ext.grid.GridPanel({
	    //���ݼ�
	    store:mainJsonStoreDeal,
	    //����нṹ��Ϣ
	    columns:mainCol,
	    //����¼�����
	    listeners:{
	        //����е����¼�
	        rowclick:function(grid, rowIndex, e){ 
	            //��ȡ��񵥻��ж���
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
			    //��ѯ��Ӧ�û�����ϸ����
			    Ext.lt.RCP.server("mainshowservermms", "findBbBugsDeal", record.data.userName,function(resp) {
			        //��̬ˢ���ӵ�panel�б���Ϣ
			        detailJsonStoreDeal.loadData(resp.deal);
			    });
            }
	    },
	    border:false,
	    layout:'fit',
	    height:200,
	    region:'center'
	});
	//����������ʾ���(�ѹر�)
	var mainGridPanelClose = new Ext.grid.GridPanel({
	    //���ݼ�
	    store:mainJsonStoreClose,
	    //����нṹ��Ϣ
	    columns:mainCol,
	    //����¼�����
	    listeners:{
	        //����е����¼�
	        rowclick:function(grid, rowIndex, e){ 
	            //��ȡ��񵥻��ж���
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
			    //��ѯ��Ӧ�û�����ϸ����
			    Ext.lt.RCP.server("mainshowservermms", "findBbBugsClose", record.data.userName,function(resp) {
			        //��̬ˢ���ӵ�panel�б���Ϣ
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
     *�������������Ϣ���������ϸ����
	 */
	//��ϸ�����ݽṹ��Ϣ
	var detailFields = [
	    {name:'bugId'},
	    {name:'caption'},
	    {name:'priority'},
	    {name:'product'},
	    {name:'component'},
	    {name:'createTime'}
	];
	//��ϸ�����ݼ�����Ϣ(δ����)
	var detailJsonStoreNoDeal = new Ext.data.JsonStore({
	    fields:detailFields,
	    data:[]
	});
	//��ϸ�����ݼ�����Ϣ(�Ѵ���)
	var detailJsonStoreDeal = new Ext.data.JsonStore({
	    fields:detailFields,
	    data:[]
	});
	//��ϸ�����ݼ�����Ϣ(�ѹر�)
	var detailJsonStoreClose = new Ext.data.JsonStore({
	    fields:detailFields,
	    data:[]
	});
	//��ϸ���ͷ��Ϣ
	var detailCol = [
	    {header:'bug��'},
	    {header:'bug����'},
	    {header:'bug����'},
	    {header:'��Ʒ'},
	    {header:'ģ��'},
	    {header:'����ʱ��'}
	];
	//��ϸ��������ʾ���(δ����)
	var detailGridPanelNoDeal = new Ext.grid.GridPanel({
	    //���ݼ�
	    store:detailJsonStoreNoDeal,
	    //����нṹ��Ϣ
	    columns:detailCol,
	    //����¼�����
	    listeners:{
	        //����е����¼�
	        rowdblclick:function(grid, rowIndex, e){ 
	            //��ȡ��񵥻��ж���
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
	//��ϸ��������ʾ���(�Ѵ���)
	var detailGridPanelDeal = new Ext.grid.GridPanel({
	    //���ݼ�
	    store:detailJsonStoreDeal,
	    //����нṹ��Ϣ
	    columns:detailCol,
	    //����¼�����
	    listeners:{
	        //����е����¼�
	        rowdblclick:function(grid, rowIndex, e){ 
	            //��ȡ��񵥻��ж���
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
	//��ϸ��������ʾ���(�ѹر�)
	var detailGridPanelClose = new Ext.grid.GridPanel({
	    //���ݼ�
	    store:detailJsonStoreClose,
	    //����нṹ��Ϣ
	    columns:detailCol,
	    //����¼�����
	    listeners:{
	        //����е����¼�
	        rowdblclick:function(grid, rowIndex, e){ 
	            //��ȡ��񵥻��ж���
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
	//����panel����������ӵ��б�panel(δ����)
	var bbAllPanelNoDeal = new Ext.Panel({
	    layout:'border',
	    border:false,
	    height:540,
	    items:[mainGridPanelNoDeal,detailGridPanelNoDeal]
	});
	//����panel����������ӵ��б�panel(�Ѵ���)
	var bbAllPanelDeal = new Ext.Panel({
	    layout:'border',
	    border:false,
	    height:540,
	    items:[mainGridPanelDeal,detailGridPanelDeal]
	});
	//����panel����������ӵ��б�panel(�ѹر�)
	var bbAllPanelClose = new Ext.Panel({
	    layout:'border',
	    border:false,
	    height:540,
	    items:[mainGridPanelClose,detailGridPanelClose]
	});
	//��ʾδ����bug��Ϣ
	function showNoDeal(){
	    bbAllPanelNoDeal.render("bbAllNoDeal");
	}
	//��ʾ�Ѵ���bug��Ϣ
	function showDeal(){
	    bbAllPanelDeal.render("bbAllDeal");
	}
	//��ʾ�ѹرյ�bug��Ϣ
	function showClose(){
	    bbAllPanelClose.render("bbAllClose");
	}
	return bbBugsAllTabs;
}
/***********************************����P1��Bug��ʾ*****************************************/
function impBugsAllShow(config) {
    //����3��bug���ܸ���
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
	//�������bug��ʾ��ҳǩ
	var impBugsAllTabs = new Ext.TabPanel({
	    id:'impBugsAllPanel',
	    //Ĭ����ʾҳǩ
	    activeTab:0,
	    items:[
	        {title:'δ����('+noDealNumber+')',
	        html:'<div id="impAllNoDeal"></div>',
	        listeners:{activate:showNoDeal}
	        },
	        {title:'�Ѵ���('+dealNumber+')',
	         html:'<div id="impAllDeal"></div>',
	         listeners:{activate:showDeal}
	        },
	        {title:'�ѹر�('+closeNumber+')',
	         html:'<div id="impAllClose"></div>',
	         listeners:{activate:showClose}
	        }
	    ]
	});
	/*����gridPanalչʾ����bug��Ϣ*/
	//�������ݽṹ��Ϣ
	var mainFields = [
	    {name:'userName'},
	    {name:'bugNumber'}
	];
	//�������ݼ���Ϣ(δ����)
	var mainJsonStoreNoDeal = new Ext.data.JsonStore({
	    fields:mainFields,
	    data:config.noDeal
	});
	//�������ݼ���Ϣ(�Ѵ���)
	var mainJsonStoreDeal = new Ext.data.JsonStore({
	    fields:mainFields,
	    data:config.deal
	});
	//�������ݼ���Ϣ(�ѹر�)
	var mainJsonStoreClose = new Ext.data.JsonStore({
	    fields:mainFields,
	    data:config.close
	});
	//������ͷ��Ϣ
	var mainCol = [
	    {header:'�û�����'},
	    {header:'bug����'}
	]; 
	//����������ʾ���(δ����)
	var mainGridPanelNoDeal = new Ext.grid.GridPanel({
	    //���ݼ�
	    store:mainJsonStoreNoDeal,
	    //����нṹ��Ϣ
	    columns:mainCol,
	    //����¼�����
	    listeners:{
	        //����е����¼�
	        rowclick:function(grid, rowIndex, e){ 
	            //��ȡ��񵥻��ж���
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
			    //��ѯ��Ӧ�û�����ϸ����
			    Ext.lt.RCP.server("mainshowservermms", "findImpBugsNoDeal", record.data.userName,function(resp) {
			        //��̬ˢ���ӵ�panel�б���Ϣ
			        detailJsonStoreNoDeal.loadData(resp.noDeal);
			    });
            }
	    },
	    border:false,
	    layout:'fit',
	    height:200,
	    region:'center'
	});
	//����������ʾ���(�Ѵ���)
	var mainGridPanelDeal = new Ext.grid.GridPanel({
	    //���ݼ�
	    store:mainJsonStoreDeal,
	    //����нṹ��Ϣ
	    columns:mainCol,
	    //����¼�����
	    listeners:{
	        //����е����¼�
	        rowclick:function(grid, rowIndex, e){ 
	            //��ȡ��񵥻��ж���
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
			    //��ѯ��Ӧ�û�����ϸ����
			    Ext.lt.RCP.server("mainshowservermms", "findImpBugsDeal", record.data.userName,function(resp) {
			        //��̬ˢ���ӵ�panel�б���Ϣ
			        detailJsonStoreDeal.loadData(resp.deal);
			    });
            }
	    },
	    border:false,
	    layout:'fit',
	    height:200,
	    region:'center'
	});
	//����������ʾ���(�ѹر�)
	var mainGridPanelClose = new Ext.grid.GridPanel({
	    //���ݼ�
	    store:mainJsonStoreClose,
	    //����нṹ��Ϣ
	    columns:mainCol,
	    //����¼�����
	    listeners:{
	        //����е����¼�
	        rowclick:function(grid, rowIndex, e){ 
	            //��ȡ��񵥻��ж���
                var selectionModel = grid.getSelectionModel();    
                var record = selectionModel.getSelected();
			    //��ѯ��Ӧ�û�����ϸ����
			    Ext.lt.RCP.server("mainshowservermms", "findImpBugsClose", record.data.userName,function(resp) {
			        //��̬ˢ���ӵ�panel�б���Ϣ
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
     *�������������Ϣ���������ϸ����
	 */
	//��ϸ�����ݽṹ��Ϣ
	var detailFields = [
	    {name:'bugId'},
	    {name:'caption'},
	    {name:'priority'},
	    {name:'product'},
	    {name:'component'},
	    {name:'createTime'}
	];
	//��ϸ�����ݼ�����Ϣ(δ����)
	var detailJsonStoreNoDeal = new Ext.data.JsonStore({
	    fields:detailFields,
	    data:[]
	});
	//��ϸ�����ݼ�����Ϣ(�Ѵ���)
	var detailJsonStoreDeal = new Ext.data.JsonStore({
	    fields:detailFields,
	    data:[]
	});
	//��ϸ�����ݼ�����Ϣ(�ѹر�)
	var detailJsonStoreClose = new Ext.data.JsonStore({
	    fields:detailFields,
	    data:[]
	});
	//��ϸ���ͷ��Ϣ
	var detailCol = [
	    {header:'bug��'},
	    {header:'bug����'},
	    {header:'bug����'},
	    {header:'��Ʒ'},
	    {header:'ģ��'},
	    {header:'����ʱ��'}
	];
	//��ϸ��������ʾ���(δ����)
	var detailGridPanelNoDeal = new Ext.grid.GridPanel({
	    //���ݼ�
	    store:detailJsonStoreNoDeal,
	    //����нṹ��Ϣ
	    columns:detailCol,
	    //����¼�����
	    listeners:{
	        //����е����¼�
	        rowdblclick:function(grid, rowIndex, e){ 
	            //��ȡ��񵥻��ж���
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
	//��ϸ��������ʾ���(�Ѵ���)
	var detailGridPanelDeal = new Ext.grid.GridPanel({
	    //���ݼ�
	    store:detailJsonStoreDeal,
	    //����нṹ��Ϣ
	    columns:detailCol,
	    //����¼�����
	    listeners:{
	        //����е����¼�
	        rowdblclick:function(grid, rowIndex, e){ 
	            //��ȡ��񵥻��ж���
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
	//��ϸ��������ʾ���(�ѹر�)
	var detailGridPanelClose = new Ext.grid.GridPanel({
	    //���ݼ�
	    store:detailJsonStoreClose,
	    //����нṹ��Ϣ
	    columns:detailCol,
	    //����¼�����
	    listeners:{
	        //����е����¼�
	        rowdblclick:function(grid, rowIndex, e){ 
	            //��ȡ��񵥻��ж���
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
	//����panel����������ӵ��б�panel(δ����)
	var impAllPanelNoDeal = new Ext.Panel({
	    layout:'border',
	    border:false,
	    height:540,
	    items:[mainGridPanelNoDeal,detailGridPanelNoDeal]
	});
	//����panel����������ӵ��б�panel(�Ѵ���)
	var impAllPanelDeal = new Ext.Panel({
	    layout:'border',
	    border:false,
	    height:540,
	    items:[mainGridPanelDeal,detailGridPanelDeal]
	});
	//����panel����������ӵ��б�panel(�ѹر�)
	var impAllPanelClose = new Ext.Panel({
	    layout:'border',
	    border:false,
	    height:540,
	    items:[mainGridPanelClose,detailGridPanelClose]
	});
	//��ʾδ����bug��Ϣ
	function showNoDeal(){
	    impAllPanelNoDeal.render("impAllNoDeal");
	}
	//��ʾ�Ѵ���bug��Ϣ
	function showDeal(){
	    impAllPanelDeal.render("impAllDeal");
	}
	//��ʾ�ѹرյ�bug��Ϣ
	function showClose(){
	    impAllPanelClose.render("impAllClose");
	}
	return impBugsAllTabs;
}
/***********************************���˹����б���Ϣ��ʾ(������Դ)*****************************************/
function tasksToShow(config) {
	//�������bug��ʾ��ҳǩ
	var tasksToTabs = new Ext.TabPanel({
	    id:'tasksToPanel',
	    //Ĭ����ʾҳǩ
	    activeTab:0,
	    items:[
	        {title:'δ����',
	        html:'<div id="toNoDeal"></div>',
	        listeners:{activate:showToNoDeal}
	        },
	        {title:'�Ѵ���',
	         html:'<div id="toClose"></div>',
	         listeners:{activate:showToClose}
	        }	    ]
	});
	/**
     *�����б���Ϣ
	 */
	//��ϸ�����ݽṹ��Ϣ
	var tasksFields = [
	    {name:'caption'},
	    {name:'detail'},
	    {name:'createTime'},
	    {name:'fromPerson'},
	    {name:'toPerson'}
	];
	//��ϸ�����ݼ�����Ϣ(δ����)
	var tasksJsonStoreToNoDeal = new Ext.data.JsonStore({
	    fields:tasksFields,
	    data:config.toNoDeal
	});
	//��ϸ�����ݼ�����Ϣ(�Ѵ���)
	var tasksJsonStoreToClose = new Ext.data.JsonStore({
	    fields:tasksFields,
	    data:config.toClose
	});
	//��ϸ���ͷ��Ϣ
	var tasksCol = [
	    {header:'����'},
	    {header:'����˵��'},
	    {header:'����ʱ��'},
	    {header:'������Դ'},
	    {header:'������'}
	];
	//��ϸ��������ʾ���(δ����)
	var tasksGridPanelToNoDeal = new Ext.grid.GridPanel({
	    //���ݼ�
	    store:tasksJsonStoreToNoDeal,
	    //����нṹ��Ϣ
	    columns:tasksCol,
	    border:false,
	    layout:'fit',
	    height:540
	});
	//��ϸ��������ʾ���(�Ѵ���)
	var tasksGridPanelToClose = new Ext.grid.GridPanel({
	    //���ݼ�
	    store:tasksJsonStoreToClose,
	    //����нṹ��Ϣ
	    columns:tasksCol,
	    border:false,
	    layout:'fit',
	    height:540
	});
	//��ʾδ����������Ϣ
	function showToNoDeal(){
	    tasksGridPanelToNoDeal.render("toNoDeal");
	}
	//��ʾ�Ѵ���������Ϣ
	function showToClose(){
	    tasksGridPanelToClose.render("toClose");
	}
	return tasksToTabs;
}
/***********************************���˹����б���Ϣ��ʾ(����ȥ��)*****************************************/
function tasksFromShow(config) {
	//�������bug��ʾ��ҳǩ
	var tasksFromTabs = new Ext.TabPanel({
	    id:'tasksFromPanel',
	    //Ĭ����ʾҳǩ
	    activeTab:0,
	    items:[
	        {title:'δ����',
	        html:'<div id="fromNoDeal"></div>',
	        listeners:{activate:showFromNoDeal}
	        },
	        {title:'�Ѵ���',
	         html:'<div id="fromClose"></div>',
	         listeners:{activate:showFromClose}
	        }	    ]
	});
	/**
     *�����б���Ϣ
	 */
	//��ϸ�����ݽṹ��Ϣ
	var tasksFields = [
	    {name:'caption'},
	    {name:'detail'},
	    {name:'createTime'},
	    {name:'fromPerson'},
	    {name:'toPerson'}
	];
	//��ϸ�����ݼ�����Ϣ(δ����)
	var tasksJsonStoreFromNoDeal = new Ext.data.JsonStore({
	    fields:tasksFields,
	    data:config.fromNoDeal
	});
	//��ϸ�����ݼ�����Ϣ(�Ѵ���)
	var tasksJsonStoreFromClose = new Ext.data.JsonStore({
	    fields:tasksFields,
	    data:config.fromClose
	});
	//��ϸ���ͷ��Ϣ
	var tasksCol = [
	    {header:'����'},
	    {header:'����˵��'},
	    {header:'����ʱ��'},
	    {header:'������Դ'},
	    {header:'������'}
	];
	//��ϸ��������ʾ���(δ����)
	var tasksGridPanelFromNoDeal = new Ext.grid.GridPanel({
	    //���ݼ�
	    store:tasksJsonStoreFromNoDeal,
	    //����нṹ��Ϣ
	    columns:tasksCol,
	    border:false,
	    layout:'fit',
	    height:540
	});
	//��ϸ��������ʾ���(�Ѵ���)
	var tasksGridPanelFromClose = new Ext.grid.GridPanel({
	    //���ݼ�
	    store:tasksJsonStoreFromClose,
	    //����нṹ��Ϣ
	    columns:tasksCol,
	    border:false,
	    layout:'fit',
	    height:540
	});
	//��ʾδ����������Ϣ
	function showFromNoDeal(){
	    tasksGridPanelFromNoDeal.render("fromNoDeal");
	}
	//��ʾ�Ѵ���������Ϣ
	function showFromClose(){
	    tasksGridPanelFromClose.render("fromClose");
	}
	return tasksFromTabs;
}
/***********************************���������Ʒbugͳ��*****************************************/
function productBugsShow(config) {
	/**
     *�����б���Ϣ
	 */
	//��ϸ�����ݽṹ��Ϣ
	var productBugsFields = [
	    {name:'product'},
	    {name:'p1'},
	    {name:'p2'},
	    {name:'p3'},
	    {name:'p4'},
	    {name:'p5'},
	    {name:'bugs'}
	];
	//��ϸ�����ݼ�����Ϣ(δ����)
	var productBugsJsonStore = new Ext.data.JsonStore({
	    fields:productBugsFields,
	    data:config.productBugs
	});
	//��ϸ���ͷ��Ϣ
	var productBugsCol = [
	    {header:'ϵͳ����'},
	    {header:'P1'},
	    {header:'P2'},
	    {header:'P3'},
	    {header:'P4'},
	    {header:'P5'},
	    {header:'�ϼ�'}
	];
	//��ϸ��������ʾ���
	var productBugsGridPanel = new Ext.grid.GridPanel({
	    //���ݼ�
	    id:'productBugsPanal',
	    store:productBugsJsonStore,
	    //����нṹ��Ϣ
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
/***********************************������Ա������ͳ��*****************************************/
function testWorkLoadShow(config) {
	/**
     *�����б���Ϣ
	 */
	//��ϸ�����ݽṹ��Ϣ
	var testWorkLoadFields = [
	    {name:'username'},
	    {name:'submitbugs'},
	    {name:'closeapp'}
	];
	//��ϸ�����ݼ�����Ϣ(δ����)
	var testWorkLoadJsonStore = new Ext.data.JsonStore({
	    fields:testWorkLoadFields,
	    data:config.testWorkLoad
	});
	//��ϸ���ͷ��Ϣ
	var testWorkLoadCol = [
	    {header:'��Ա'},
	    {header:'�ύbug'},
	    {header:'�رղ�������'}
	];
	//��ϸ��������ʾ���
	var testWorkLoadGridPanel = new Ext.grid.GridPanel({
	    //���ݼ�
	    id:'testWorkLoadPanal',
	    store:testWorkLoadJsonStore,
	    //����нṹ��Ϣ
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
/***********************************������Ա�ύbugδ����*****************************************/
function testNoDealShow(config) {
	/**
     *�����б���Ϣ
	 */
	//��ϸ�����ݽṹ��Ϣ
	var testNoDealFields = [
	    {name:'product'},
	    {name:'bugs'}
	];
	//��ϸ�����ݼ�����Ϣ(δ����)
	var testNoDealJsonStore = new Ext.data.JsonStore({
	    fields:testNoDealFields,
	    data:config.testNoDeal
	});
	//��ϸ���ͷ��Ϣ
	var testNoDealCol = [
	    {header:'ϵͳ����'},
	    {header:'bug��'}
	];
	//��ϸ��������ʾ���
	var testNoDealGridPanel = new Ext.grid.GridPanel({
	    //���ݼ�
	    id:'testNoDealPanal',
	    store:testNoDealJsonStore,
	    //����нṹ��Ϣ
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
