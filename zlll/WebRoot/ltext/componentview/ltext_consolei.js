
Ext.lt.portal.component.consolei = new function () {
	this.manager = function () {
		var treeData = {'singleClickExpand':true,checked:false, 'text':"门户管理",'iconCls':"icon-pkg",'cls':"package",'children':[{checked:false, 'text':"用户管理",'iconCls':"icon-cls",'clientmodule':"/common/loadgroupprivilege.do",'leaf':true,'cls':"cls",'isClass':true,'id':"submenu.42000020"},{checked:false, 'text':"编辑业务系统",'iconCls':"icon-cls",'clientmodule':"/common/loadProgramConfig.do",'leaf':true,'cls':"cls",'isClass':true,'id':"submenu.42000030"},{checked:false, 'text':"门户相关页面配置",'iconCls':"icon-cls",'clientmodule':"/portal/portalset/index.do",'leaf':true,'cls':"cls",'isClass':true,'id':"submenu.42000050"},{checked:false, 'text':"待办事项设置",'iconCls':"icon-cls",'clientmodule':"/portal/pendingtask/index.do",'leaf':true,'cls':"cls",'isClass':true,'id':"submenu.42000040"},{checked:false, 'text':"处室下属管理",'iconCls':"icon-cls",'clientmodule':"/portal/portalpendingtask/index.do",'leaf':true,'cls':"cls",'isClass':true,'id':"submenu.42000110"},{checked:false, 'text':"用户信息",'iconCls':"icon-cls",'clientmodule':"/portal/userinfo/index.do",'leaf':true,'cls':"cls",'isClass':true,'id':"submenu.42000140"},{checked:false, 'text':"地区管理",'iconCls':"icon-cls",'clientmodule':"/portal/area/index.do",'leaf':true,'cls':"cls",'isClass':true,'id':"submenu.42000100"},{checked:false, 'text':"CA证书管理",'iconCls':"icon-cls",'clientmodule':"/portal/ca/index.do",'leaf':true,'cls':"cls",'isClass':true,'id':"submenu.42000080"},{checked:false, 'text':"处室下属待办查询",'iconCls':"icon-cls",'clientmodule':"/portal/portalpendingtask/underlinglist.do",'leaf':true,'cls':"cls",'isClass':true,'id':"submenu.42000120"},{checked:false, 'text':"报表维护",'iconCls':"icon-cls",'clientmodule':"/portal/report/index.do",'leaf':true,'cls':"cls",'isClass':true,'id':"submenu.42000130"},{checked:false, 'text':"查询登陆日志",'iconCls':"icon-cls",'clientmodule':"/portal/loginlog/index.do",'leaf':true,'cls':"cls",'isClass':true,'id':"submenu.42000090"},{checked:false, 'text':"公告管理",'iconCls':"icon-cls",'clientmodule':"/common/post/index.do",'leaf':true,'cls':"cls",'isClass':true,'id':"submenu.42000060"}],'id':"submenu.42000000"}
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
		var gData = [["g001002", "测试组1"], ["g001003", "开发组1"], ["g001004", "开发组2"], ["g001005", "开发组3"]];
		var gDs = new Ext.data.Store({reader:new Ext.data.ArrayReader({}, [ {name:'code'},{name:"pname"}])});
		gDs.loadData(gData);
		var gcolModel = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(), {header:"用户组", sortable:true, dataIndex:"pname"}]);
		var gGridPanel = new Ext.grid.GridPanel({ iconCls:"grid", store:gDs, cm:gcolModel,sm:gsm, height:450, frame:true, title:"用户组列表"});
		//roel
		var rData = [["r001002", "角色1"], ["r001003", "角色2"], ["r001004", "角色3"], ["r001005", "角色4"]];
		var rDs = new Ext.data.Store({reader:new Ext.data.ArrayReader({}, [{name:"code"}, {name:"rname"}])});
		rDs.loadData(rData);
		var rcolModel = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(), {header:"角色", width:75, sortable:true, dataIndex:"rname"}]);
		var rGridPanel = new Ext.grid.GridPanel({ iconCls:"grid", store:rDs, cm:rcolModel,sm:rsm, height:450, frame:true, title:"角色列表"});
		
		var cData = [["001002", "栏目1"], ["001003", "栏目1"], ["001004", "栏目2"], ["001005", "栏目1"]];
		var cDs = new Ext.data.Store({reader:new Ext.data.ArrayReader({}, [{name:"ccode"}, {name:"cname"}])});
		var ccolModel = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(),sm, {header:"栏目名称", width:75, sortable:true, dataIndex:"cname"}]);
		var cGridPanel = new Ext.grid.GridPanel({columnWidth:.15, iconCls:"grid", autoScroll:true,  store:cDs,sm:sm, cm:ccolModel, height:479, frame:true, title:"栏目列表"});
		
		var tablpanel={columnWidth:.2, xtype:"tabpanel",activeTab:0,border:0, items:[rGridPanel,gGridPanel]};
		var treepanel={title:"页面",columnWidth:.3,border:1,items:[cosi_tree]};
		//var top = new Ext.Panel({id:"console_i_top",border:false, layout:"column",height:200 ,region:"north", items:[,uGridPanel]});
		//var center = new Ext.Panel({id:"console_i_center",border:true, layout:"column", region:"center", items:[cosi_tree,cGridPanel]});
		var res = new Ext.Panel({title:"权限分配",border:false, id:"console_i_panel", layout:"column", height:550, items:[tablpanel,uGridPanel,treepanel, cGridPanel],buttons:[{
						text : "查询权限对象权限",
						handler :  function add() {
							selectPage();
	          				selectCom();
						}
				},{
						text : "保存权限信息",
						handler :  function add() {
							alert("请选择权限设置对象");
						}
				},{
						text : "清除角色权限信息",
						handler :  function add() {
							alert("请选择权限设置对象");
						}
		}]});
		res.getname = function () {
			return res.title;
		};
		return res;
	};
};

