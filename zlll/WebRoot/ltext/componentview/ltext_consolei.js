
Ext.lt.portal.component.consolei = new function () {
	this.manager = function () {
		var treeData = {'singleClickExpand':true,checked:false, 'text':"�Ż�����",'iconCls':"icon-pkg",'cls':"package",'children':[{checked:false, 'text':"�û�����",'iconCls':"icon-cls",'clientmodule':"/common/loadgroupprivilege.do",'leaf':true,'cls':"cls",'isClass':true,'id':"submenu.42000020"},{checked:false, 'text':"�༭ҵ��ϵͳ",'iconCls':"icon-cls",'clientmodule':"/common/loadProgramConfig.do",'leaf':true,'cls':"cls",'isClass':true,'id':"submenu.42000030"},{checked:false, 'text':"�Ż����ҳ������",'iconCls':"icon-cls",'clientmodule':"/portal/portalset/index.do",'leaf':true,'cls':"cls",'isClass':true,'id':"submenu.42000050"},{checked:false, 'text':"������������",'iconCls':"icon-cls",'clientmodule':"/portal/pendingtask/index.do",'leaf':true,'cls':"cls",'isClass':true,'id':"submenu.42000040"},{checked:false, 'text':"������������",'iconCls':"icon-cls",'clientmodule':"/portal/portalpendingtask/index.do",'leaf':true,'cls':"cls",'isClass':true,'id':"submenu.42000110"},{checked:false, 'text':"�û���Ϣ",'iconCls':"icon-cls",'clientmodule':"/portal/userinfo/index.do",'leaf':true,'cls':"cls",'isClass':true,'id':"submenu.42000140"},{checked:false, 'text':"��������",'iconCls':"icon-cls",'clientmodule':"/portal/area/index.do",'leaf':true,'cls':"cls",'isClass':true,'id':"submenu.42000100"},{checked:false, 'text':"CA֤�����",'iconCls':"icon-cls",'clientmodule':"/portal/ca/index.do",'leaf':true,'cls':"cls",'isClass':true,'id':"submenu.42000080"},{checked:false, 'text':"�������������ѯ",'iconCls':"icon-cls",'clientmodule':"/portal/portalpendingtask/underlinglist.do",'leaf':true,'cls':"cls",'isClass':true,'id':"submenu.42000120"},{checked:false, 'text':"����ά��",'iconCls':"icon-cls",'clientmodule':"/portal/report/index.do",'leaf':true,'cls':"cls",'isClass':true,'id':"submenu.42000130"},{checked:false, 'text':"��ѯ��½��־",'iconCls':"icon-cls",'clientmodule':"/portal/loginlog/index.do",'leaf':true,'cls':"cls",'isClass':true,'id':"submenu.42000090"},{checked:false, 'text':"�������",'iconCls':"icon-cls",'clientmodule':"/common/post/index.do",'leaf':true,'cls':"cls",'isClass':true,'id':"submenu.42000060"}],'id':"submenu.42000000"}
		 var treeloader = new Ext.tree.TreeLoader({
		    baseAttrs : {
		     cust : 'client'
		    }
		   });
		var cosi_tree = new Ext.tree.TreePanel({loader : treeloader, root: new Ext.tree.AsyncTreeNode({
            text:'\u90e8\u95e8\u7ba1\u7406',
            id:"m.r",
		    rootVisible : false,
		    autoheigth : true,
		    expanded : true,
		    enableDD : true,
		    ddGroup : "tgDD",
            children:[treeData]
         }),autoScroll:true, height:452,  border:false,listeners:{"checkchange":function (node, checked) {
			Ext.each(node.childNodes, function (childNode, index, allItems) {
				childNode.getUI().toggleCheck(checked);
			});
		}}});
		cosi_tree.on("load",function(node,response){
  			cosi_tree.expandAll();
 		});
		cosi_tree.on('click',function(node,event){cDs.loadData(cData);});
		var sm = new Ext.grid.CheckboxSelectionModel();
		var rsm=new Ext.grid.RowSelectionModel({
	                singleSelect: true,
	                listeners: {
	                    rowselect: function(sm, row, rec) {
							selectRow(rGridPanel);
							uDs.loadData(uData);
	                    }
	                }
	    });
	    var usm=new Ext.grid.RowSelectionModel({
	                singleSelect: true,
	                listeners: {
	                    rowselect: function(sm, row, rec) {
	                    	selectRow(uGridPanel);
	                    	
	                    }
	                }
	           });
	    var gsm=new Ext.grid.RowSelectionModel({
	                singleSelect: true,
	                listeners: {
	                    rowselect: function(sm, row, rec) {
	                    	selectRow(gGridPanel);
	                    	uDs.loadData(uData);
	                    }
	                }
	            });
	    var selcode="";
	    function selectRow(type){
	    		if(type!=uGridPanel){
			    	uGridPanel.getSelectionModel().clearSelections();
			    }if(type!=rGridPanel){
			    	rGridPanel.getSelectionModel().clearSelections();
			    }if(type!=gGridPanel){
			   		try{
			    		gGridPanel.getSelectionModel().clearSelections();
			    	}catch(e){}
			    }
	           selcode=type.getSelectionModel().getSelected().data.code;
	          // selectPage();
	          // selectCom();
	    };
	    function selectPage(){
	    	if(selcode=='r001002'){
	    		cosi_tree.getNodeById('submenu.42000020').getUI().toggleCheck(true);
	    	}else{
	    		cosi_tree.getNodeById('submenu.42000020').getUI().toggleCheck(false);
	    		cosi_tree.getNodeById('submenu.42000022').getUI().toggleCheck(true);
	    	}
	    };
	    function selectCom(){
	    };
		var uData = [["001002", "\u5e84\u5fd7\u6770", "BDGAGENCY-\u9884\u7b97\u5355\u4f4d", "\u5c40\u9886\u5bfc"], ["001003", "\u6797\u5efa\u9020", "BDGAGENCY-\u9884\u7b97\u5355\u4f4d", "\u5c40\u9886\u5bfc"], ["001004", "\u9ec4\u5c0f\u660e", "BDGAGENCY-\u9884\u7b97\u5355\u4f4d", "\u5c40\u9886\u5bfc"], ["001005", "\u5434\u65d7\u660e", "BDGAGENCY-\u9884\u7b97\u5355\u4f4d", "\u5c40\u9886\u5bfc"]];
		var uDs = new Ext.data.Store({reader:new Ext.data.ArrayReader({}, [{name:"code"}, {name:"username"}, {name:"departmenttype"}, {name:"department"}])});
		
		var ucolModel = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(), {header:"\u7528\u6237\u7f16\u7801", width:75, sortable:true, dataIndex:"code"}, {header:"\u59d3\u540d", width:75, sortable:true, dataIndex:"username"}, {header:"\u673a\u6784\u7c7b\u578b", width:150, sortable:true, dataIndex:"departmenttype"}, {header:"\u90e8\u95e8", width:75, sortable:true, dataIndex:"department"}]);
		var uGridPanel = new Ext.grid.GridPanel({columnWidth:.35, iconCls:"grid", store:uDs, cm:ucolModel,sm:usm, height:479, frame:true, title:"\u7528\u6237\u5217\u8868"});
		//group
		var gData = [["g001002", "������1"], ["g001003", "������1"], ["g001004", "������2"], ["g001005", "������3"]];
		var gDs = new Ext.data.Store({reader:new Ext.data.ArrayReader({}, [ {name:'code'},{name:"pname"}])});
		gDs.loadData(gData);
		var gcolModel = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(), {header:"�û���", sortable:true, dataIndex:"pname"}]);
		var gGridPanel = new Ext.grid.GridPanel({ iconCls:"grid", store:gDs, cm:gcolModel,sm:gsm, height:450, frame:true, title:"�û����б�"});
		//roel
		var rData = [["r001002", "��ɫ1"], ["r001003", "��ɫ2"], ["r001004", "��ɫ3"], ["r001005", "��ɫ4"]];
		var rDs = new Ext.data.Store({reader:new Ext.data.ArrayReader({}, [{name:"code"}, {name:"rname"}])});
		rDs.loadData(rData);
		var rcolModel = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(), {header:"��ɫ", width:75, sortable:true, dataIndex:"rname"}]);
		var rGridPanel = new Ext.grid.GridPanel({ iconCls:"grid", store:rDs, cm:rcolModel,sm:rsm, height:450, frame:true, title:"��ɫ�б�"});
		
		var cData = [["001002", "��Ŀ1"], ["001003", "��Ŀ1"], ["001004", "��Ŀ2"], ["001005", "��Ŀ1"]];
		var cDs = new Ext.data.Store({reader:new Ext.data.ArrayReader({}, [{name:"ccode"}, {name:"cname"}])});
		var ccolModel = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(),sm, {header:"��Ŀ����", width:75, sortable:true, dataIndex:"cname"}]);
		var cGridPanel = new Ext.grid.GridPanel({columnWidth:.15, iconCls:"grid", autoScroll:true,  store:cDs,sm:sm, cm:ccolModel, height:479, frame:true, title:"��Ŀ�б�"});
		
		var tablpanel={columnWidth:.2, xtype:"tabpanel",activeTab:0,border:0, items:[rGridPanel,gGridPanel]};
		var treepanel={title:"ҳ��",columnWidth:.3,border:1,items:[cosi_tree]};
		//var top = new Ext.Panel({id:"console_i_top",border:false, layout:"column",height:200 ,region:"north", items:[,uGridPanel]});
		//var center = new Ext.Panel({id:"console_i_center",border:true, layout:"column", region:"center", items:[cosi_tree,cGridPanel]});
		var res = new Ext.Panel({title:"Ȩ�޷���",border:false, id:"console_i_panel", layout:"column", height:550, items:[tablpanel,uGridPanel,treepanel, cGridPanel],buttons:[{
						text : "��ѯȨ�޶���Ȩ��",
						handler :  function add() {
							selectPage();
	          				selectCom();
						}
				},{
						text : "����Ȩ����Ϣ",
						handler :  function add() {
							alert("��ѡ��Ȩ�����ö���");
						}
				},{
						text : "�����ɫȨ����Ϣ",
						handler :  function add() {
							alert("��ѡ��Ȩ�����ö���");
						}
		}]});
		res.getname = function () {
			return res.title;
		};
		return res;
	};
};

