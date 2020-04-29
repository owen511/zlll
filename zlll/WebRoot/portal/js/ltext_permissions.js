
Ext.lt.portal.component.permissions = new function () {
	this.ifmisDefpermissions = function () {
		 var treeloader = new Ext.tree.TreeLoader({
		    baseAttrs : {
		     cust : 'client'
		    },
		    //��ȡpage��
		    dataUrl : '/webservice.rcp?serverid=consoleportalpermissions&method=findPage'
		   });
		var cosi_tree = new Ext.tree.TreePanel({loader : treeloader, root: new Ext.tree.AsyncTreeNode({
            text:'ҳ���б�',
            id:"m.r",
		    rootVisible : false,
		    autoheigth : true,
		    expanded : true,
		    enableDD : true,
		    ddGroup : "tgDD"
            //children:[treeData]
         }),autoScroll:true, border:false,listeners:{"checkchange":function (node, checked) {
			Ext.each(node.childNodes, function (childNode, index, allItems) {
				childNode.getUI().toggleCheck(checked);
			});
		}}});
		cosi_tree.on("load",function(node,response){
  			cosi_tree.expandAll();
 		});
 		var cos_tree=null;
		cosi_tree.on('click',function(node,event){
			cos_tree=node;
			//���������Ϣ
		 	Ext.lt.RCP.server("consoleportalpermissions","loadComponets", cos_tree.text, function (resp) {
				var data=new Array();
				for(var i=0;i<resp.length;i++){
					if(resp[i].config!=null){
						var main=eval('['+resp[i].config+']')[0];
						if(main.name!=null&&main.name.length>0){
							data.push([resp[i].name,main.name]);
						}
					}
				}
				cDs.loadData(data);
				selectCom();
			});
		});
		var sm = new Ext.grid.CheckboxSelectionModel();
		var rsm=new Ext.grid.RowSelectionModel({
	                singleSelect: true,
	                listeners: {
	                    rowselect: function(sm, row, rec) {
	                    	if(rec.data.id=='-1'){
	                    		uDs.loadData(users);
	                    		return;
	                    	}
							selectRow(rGridPanel);
							loadUserByRole(rec.data.id);
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
	                    	if(rec.data.id=='-1'){
	                    		uDs.loadData(users);
	                    		return;
	                    	}
	                    	selectRow(gGridPanel);
	                    	loadUserByGroup(rec.data.id);
	                    }
	                }
	            });
		function loadUserByRole(rid){
			var arr=new Array();
			for(var i=0;i<roles.length;i++){
				if(rid==roles[i].roleid){
					arr.push(roles[i].userid);
				}
			}
			var items=new Array();
			for(var i=0;i<users.length;i++){
				for(var j=0;j<arr.length;j++){
					if(arr[j]==users[i][1]){
						items.push(users[i]);
						break;
					}
				}
			}
			uDs.loadData(items);
		}
		function loadUserByGroup(gcode){
			var arr=new Array();
			for(var i=0;i<groups.length;i++){
				if(gcode==groups[i].gcode){
					arr.push(groups[i].usercode);
				}
			}
			var items=new Array();              
			for(var i=0;i<users.length;i++){
				for(var j=0;j<arr.length;j++){
					if(arr[j]==users[i][2]){
						items.push(users[i]);
						break;
					}
				}
			}
			uDs.loadData(items);
		}
		function loadUserByRole(rid){
			var arr=new Array();
			for(var i=0;i<roles.length;i++){
				if(rid==roles[i].roleid){
					arr.push(roles[i].userid);
				}
			}
			var items=new Array();
			for(var i=0;i<users.length;i++){
				for(var j=0;j<arr.length;j++){
					if(arr[j]==users[i][1]){
						items.push(users[j]);
						break;
					}
				}
			}
			uDs.loadData(items);
		}
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
	          selectPage();
	          selectCom();
	    };
	    //������Ȩ�޵���Ϣ����ѡ��
	    function selectPage(){
	    	  	 //pageȨ�޼���
			Ext.lt.RCP.server("consoleportalpermissions", "findPageByPer", selcode, function (resp) {
				var node=cosi_tree.getNodeById('m.r');
				Ext.each(node.childNodes, function (childNode, index, allItems) {
					childNode.getUI().toggleCheck(false);
				});
				for(var i=0;i<resp.length;i++){
					cosi_tree.getNodeById('c.'+resp[i]).getUI().toggleCheck(true);
				}
			});
	    };
	    //�������
	    function selectCom(){
	    	if(cos_tree==null)return ; 
	    	Ext.lt.RCP.server("consoleportalpermissions", "findComponentByPer", [selcode,cos_tree.text], function (resp) {
	    		var items=cDs.data.items;
	    		var array=new Array();
	    		for(var i=0;i<items.length;i++){
	    			for(var j=0;j<resp.length;j++){
	    				if(resp[j]==items[i].data.code){
	    					array.push(items[i]);
	    					break;
	    				}
	    			}
	    		}
	    		 sm.selectRecords(array);
			});
	    };
	    //group����
		Ext.lt.RCP.server("consoleportalpermissions", "loadGroup", null, function (resp) {
			var data=new Array();
			data.push(["-1","-1","ȫ��"]);
			for(var i=0;i<resp.length;i++){
				data.push(["g"+resp[i].gcode,resp[i].gcode,resp[i].gname]);
			}
			gDs.loadData(data);
		});
		//roel����
		Ext.lt.RCP.server("consoleportalpermissions", "loadRole", null, function (resp) {
			var data=new Array();
			data.push(["-1","-1","ȫ��"]);
			for(var i=0;i<resp.length;i++){
				data.push(["r"+resp[i].code,resp[i].roleid,resp[i].name]);
			}
			rDs.loadData(data);
		});
			            //�����û���Ϣ
	    Ext.lt.RCP.server("consoleportalpermissions","loadUser", null, function (resp) {
				users=new Array();
				var userst1=resp[1];
				var userst0=resp[0];
				for(var i=0;i<userst0.length;i++){
					for(var j=0;j<userst1.length;j++){
						var boo=false;
						if(userst0[i].code==userst1[j].usercode){
							users.push(["u"+userst0[i].code,userst0[i].userid,userst0[i].code,userst0[i].name,userst1[j].departmentname]);
							boo=true;
							break;
						}
					}
					if(!boo){
						users.push(["u"+userst0[i].code,userst0[i].userid,userst0[i].code,userst0[i].name,""]);
					}
				}
				//uDs.loadData(data);
		});
		var roles=null;
		var groups=null;
		var users=null;
		Ext.lt.RCP.server("consoleportalpermissions", "findUsersByRoleAll", null, function (resp) {
			roles=resp;
		});
		Ext.lt.RCP.server("consoleportalpermissions", "findUsersByGroupAll", null, function (resp) {
			groups=resp;
		});
		var uDs = new Ext.data.Store({reader:new Ext.data.ArrayReader({}, [{name:"code"},{name:"id"},{name:"usercode"}, {name:"username"},  {name:"department"}])});
		var ucolModel = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(), {header:"\u7528\u6237\u7f16\u7801", width:100, sortable:true, dataIndex:"usercode"}, {header:"\u59d3\u540d", width:175, sortable:true, dataIndex:"username"}, {header:"\u90e8\u95e8", width:175, sortable:true, dataIndex:"department"}]);
		var uGridPanel = new Ext.grid.GridPanel({columnWidth:.35, iconCls:"grid", store:uDs, cm:ucolModel,sm:usm,  frame:true, title:"\u7528\u6237\u5217\u8868"});
		
		//var gData = [["g001002", "������1"], ["g001003", "������1"], ["g001004", "������2"], ["g001005", "������3"]];
		var gDs = new Ext.data.Store({reader:new Ext.data.ArrayReader({}, [ {name:'code'},{name:'id'},{name:"name"}])});
		//gDs.loadData(gData);
		var gcolModel = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(), {header:"�û���", sortable:true, dataIndex:"name"}]);
		var gGridPanel = new Ext.grid.GridPanel({ iconCls:"grid", store:gDs, cm:gcolModel,sm:gsm,  frame:true, title:"�û����б�"});

		var rDs = new Ext.data.Store({reader:new Ext.data.ArrayReader({}, [{name:"code"},{name:"id"}, {name:"name"}])});
		var rcolModel = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(), {header:"��ɫ", sortable:true, dataIndex:"name"}]);
		var rGridPanel = new Ext.grid.GridPanel({ iconCls:"grid", store:rDs, cm:rcolModel,sm:rsm,  frame:true, title:"��ɫ�б�"});
		//��Ŀ
		
		//var cData = [["001002", "��Ŀ1"], ["001003", "��Ŀ1"], ["001004", "��Ŀ2"], ["001005", "��Ŀ1"]];
		var cDs = new Ext.data.Store({reader:new Ext.data.ArrayReader({}, [{name:"code"}, {name:"name"}])});
		var ccolModel = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(),sm, {header:"�������", width:75, sortable:true, dataIndex:"name"}]);
		var cGridPanel = new Ext.grid.GridPanel({columnWidth:.15, iconCls:"grid", autoScroll:true,  store:cDs,sm:sm, cm:ccolModel, frame:true, title:"��Ŀ�б�"});
		
		var tablpanel={columnWidth:.2, xtype:"tabpanel",activeTab:0,border:0, items:[rGridPanel,gGridPanel]};
		var treepanel={title:"ҳ��",columnWidth:.3,border:1,items:[cosi_tree]};
		//var top = new Ext.Panel({id:"console_i_top",border:false, layout:"column",height:200 ,region:"north", items:[,uGridPanel]});
		//var center = new Ext.Panel({id:"console_i_center",border:true, layout:"column", region:"center", items:[cosi_tree,cGridPanel]});
		var res = new Ext.Panel({title:"Ȩ�޷���",border:false,  layout:"column", items:[tablpanel,uGridPanel,treepanel, cGridPanel],buttons:[{
					//	text : "��ѯȨ�޶���Ȩ��",
					//	handler :  function add() {
					//		selectPage();
	          		//		selectCom();
					//	}
				//},{
						text : "����ҳ��Ȩ����Ϣ",
						handler :  function add() {
							Ext.lt.template.mask();
							var items=new Array();
							var node=cosi_tree.getNodeById('m.r');
							Ext.each(node.childNodes, function (childNode, index, allItems) {
								if(childNode.getUI().isChecked()){
									items.push(childNode.text);
								}
							});
							var itemscom=new Array();
							var ite=cGridPanel.getSelectionModel().selections.items;
							for(var i=0;i<ite.length;i++){
								itemscom.push(ite[i].data.code);
							}
							var cos_treetext="";
							if(cos_tree!=null){
								cos_treetext=cos_tree.text;
							}
							Ext.lt.RCP.server("consoleportalpermissions", "savePer", [selcode,items,cos_treetext,itemscom], function (resp) {
								if(resp){
									alert("����ɹ�");
								//	cos_tree=null;
								}else{
									alert("����ʧ��");
								}
								Ext.lt.template.unmask();
							});
						}
				},{
						text : "���Ȩ����Ϣ",
						handler :  function add() {
							Ext.lt.RCP.server("consoleportalpermissions", "clear", selcode, function (resp) {
								if(resp){
									alert("����ɹ�");
									selectPage();
	          						selectCom();
								}else{
									alert("���ʧ��");
								}
							})
						}
		}]});
		res.getname = function () {
			return res.title;
		};
		res.on("afterlayout",function(pan,layout){
	    	var item=pan.items.items;
	    	for(var i=0;i<item.length;i++){
	    		item[i].setHeight(pan.getHeight()-70);
	    		item[i].doLayout();
	    	}
    	});
		return res;
	};
};

