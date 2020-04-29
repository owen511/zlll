Ext_lt_RoleManage = new function(){
		var topHeight = document.body.clientHeight-window_top.offsetHeight-120;
		var arr = new Array();
		var w = document.body.clientWidth-270;
		w = w/3;
		//------role-------------------------------------
		var rolecm = new Ext.grid.ColumnModel([
	           			            //new Ext.grid.RowNumberer(),
	           			            { header: '', 
           			            	  dataIndex: 'gcode' ,
           			            	  width:40,
           			            	  renderer:function(val){
	           			                  return '<input type="radio" id="gcode'+val+'" name="isrole" onclick="Ext_lt_RoleManage.findset()">';   
	           			             	  }   
	           			            },
	           			            { header: '组编码', dataIndex: 'gcode',width:60 ,sortable:true},
	           			            { header: '组名称', dataIndex: 'gname',width:200 ,sortable:true}
	           			        ]);
	    rolecm.defaultSortable = true;
		var roledata;
	    var rolestore = new Ext.data.Store({
			 proxy: new Ext.data.MemoryProxy(roledata),
			 reader: new Ext.data.JsonReader({}, [{name:'gcode'},{name:'gname'}])
		})
		rolestore.load();
	    var rolegrid = new Ext.grid.GridPanel({
	    	id:'rolegrid',
            store: rolestore,
            cm: rolecm,
            width: w-2,
            columnWidth:.2,
            border:false,
            height:topHeight,
            enableColumnMove:false,// 拖放
            viewConfig:{
				forceFit:true,
				enableRowBody:true,
				showPreview:true,
				height:100
		    },
		   listeners:{cellclick:function(grid, rowIndex, columnIndex, e){
				if(columnIndex==1||columnIndex==2){
			    	var model = rolegrid.getSelectionModel();
					model.selectRow(rowIndex);
					var cell=model.getSelections();
								var gcode = cell[0].get('gcode')+"";
					document.getElementById("gcode"+gcode).checked=true;
					Ext_lt_RoleManage.findset();
				}
		  }}	
   	   });	
	    arr.delgroup = function(){
	    	var row = rolegrid.getSelectionModel().getSelected();
			if(row == undefined){return;}
	        if(confirm("确认删除吗？")==true){
	            var config = {};
	      	    config.gcode = row.get('gcode');
				Ext.lt.RCP.server("rolemanager", "delGroup", config,function (resp) {
					rolestore.loadData(resp);
					rolegrid.doLayout();
				});
	        }	
	    };
	    arr.addgroup = function(){
	    	var addform = new Ext.form.FormPanel({
				id:'addform',
				labelWidth:65 ,
				title: '',
				frame:true,
				layout:'fit',
				height:50,
				items:[{
					layout:'column',
					items:[{
						cloumnWidth:.33,
						layout:'form',
						items:[{xtype:'textfield',id:'gcode',fieldLabel:'组编码'}]
					},{
						cloumnWidth:.33,
						layout:'form',
						items:[{xtype:'textfield',id:'gname',fieldLabel:'组名称'}]
					}]
					}]
				});
			var addwin = new Ext.Window({
				buttonAlign: 'right',
				id:'addwin',
				width:450,
				autoHeight:true,
				closeAction:'close',
				modal: true,
				closable:false,
				items:[addform],
				listeners: {'close': function() {
							}},
				buttons:[{text :'保 存',id:'save',listeners:{'click':function(){
						 	var gcode = Ext.getCmp('gcode').getValue();
						 	var gname = Ext.getCmp('gname').getValue();
						 	if(gcode.trim()==""||gcode.length>5){
						 		alert("请输入5位以内的组编码！");
						 		return;
						 	}
						 	//判断组编码是否重复
						 	var tempStore = rolegrid.getStore();
						 	for(var i = 0 ;i < tempStore.getCount();i ++){
						 		var gg = tempStore.getAt(i).get('gcode');
						 		if(gcode==gg){
						 			alert("组编码重复！");return;
						 		}
						 	}
						 	if(gname.trim()==""||gname.length>20){
						 		alert("请输入20个字以内的组名称！");
						 		return;
						 	}
						 	var config={};
						 	config.gcode=gcode;
						 	config.gname=gname;
						 	Ext.lt.RCP.server("rolemanager", "addGroup", config,function (resp) {
						 		addwin.close();
								rolestore.loadData(resp);
								rolegrid.doLayout();
								
							});	
						}}
					},{text :'关 闭',id:'close',listeners:{'click':function(){addwin.close();}}}]
				});
			addwin.show();
	    } 
	    var tb = new Ext.Toolbar({
	    	 html:'<div ><input type="button" onclick="Ext_lt_RoleManage.addgroup();" class="btn" value="新增"/>'+
	    		 '<input type="button" name="" class="btn" onclick="Ext_lt_RoleManage.delgroup();" value="删除"/></div>'   
	    });
	    
		var rolepanel =new Ext.Panel({
		    id:'rolepanel',
			bodyStyle:'margin:0px 0px 0px 0px;',
			width: w, 
			title:'用户组',
			border:true,
			height:topHeight,
	   		items:[rolegrid],
	   		tbar:tb
		});
		//用户-----------------------------------------------------------------
	    var sm = new Ext.grid.CheckboxSelectionModel({checkOnly:true});//checkbox多选框的对象
		var cm = new Ext.grid.ColumnModel([
	           			            new Ext.grid.RowNumberer({width:35}),
		                   			sm,
	           			            { header: 'userid', dataIndex: 'userid',hidden:true,sortable:true},
	           			            { header: '用户编码', dataIndex: 'code',width:100,sortable:true},
	           			            { header: '用户名称', dataIndex: 'name',width:200,sortable:true}
	           			        ]);
		var data ;
		var store = new Ext.data.Store({
			 proxy: new Ext.data.MemoryProxy(data),
			 reader: new Ext.data.JsonReader({}, [{name:'userid'},{name:'code'},{name:'name'}])
		})
	    store.load();	
	    var grid = new Ext.grid.GridPanel({
	    								id:'usergrid',
		           			            store: store,
		           			            cm: cm,
		           			            sm:sm,
		           			            width: w-2,
		           			            border:false,
		           			            enableColumnMove:false,// 拖放 
		           			            height:topHeight,
		           			            viewConfig:{
			           						forceFit:true,
			           						enableRowBody:true,
			           						showPreview:true
		           						},
		           						listeners:{cellclick:function(grid, rowIndex, columnIndex, e){
											if(columnIndex!=1){
												var model = grid.getSelectionModel();
												if(model.isSelected(rowIndex)){
													 model.deselectRow(rowIndex);
												}else{
													 model.selectRow(rowIndex,rowIndex+1);
												}
											 }
										 }}	
		           			        });	
	    arr.queryuser=function(){
	         //查询条件
			var querycond = document.getElementById('querycond').value.trim();
			if(cond!=querycond){
				cond=querycond;
				start=-1;
				todo=[];
				searchindex=-1;
			}else{//同一查询条件点击多次，切换到不同匹配数据
				searchindex++;
			}
			var typemodel = grid.getSelectionModel();
			var tempStore = grid.getStore();
			for(var j = 0;j < tempStore.getCount();j ++){
				if(querycond==""){
					grid.getView().getRow(j).style.backgroundColor=''; 
					continue;
				}
		 		var userid = tempStore.getAt(j).get('userid')+"";
		 		var code = tempStore.getAt(j).get('code');
		 		var name = tempStore.getAt(j).get('name');
		 		if(userid.indexOf(querycond)==-1&&name.indexOf(querycond)==-1&&code.indexOf(querycond)==-1&&code.indexOf(querycond.toUpperCase())==-1){
		 			grid.getView().getRow(j).style.backgroundColor=''; 
		 			//grid.getView().getRow(j).style.display='none'; 
		 		}else{
		 			grid.getView().getRow(j).style.backgroundColor='#FFFF00';
		 			if(start==-1){
			 			var row = grid.getView().getRow(j); 
						var element = Ext.get(row); 
						element.focus(); 
						start=j;
					}else if(searchindex==-1){
						todo.push(j);
					}else{
						var row = grid.getView().getRow(todo[searchindex]); 
						var element = Ext.get(row); 
						element.focus(); 
						start=j;
						if(searchindex==todo.length-1){
							cond="";//如果已经是最后的匹配则下次点击时返回第一个匹配
						}
					}
				}
			}
	    }
	    arr.clear=function(){
	    	document.getElementById('querycond').value="";
			cond="";
	    }
	    var usertb = new Ext.Toolbar({
	    	 html:'<div><input id="querycond" type="text"/><input type="button" class="btn" onclick="Ext_lt_RoleManage.queryuser();" value="查询"/>'+
	    	 '<input type="button" class="btn" onclick="Ext_lt_RoleManage.clear();" value="清除"/></div>'   
	    });
		var userpanel =new Ext.Panel({
			id:'userpanel',
			bodyStyle:'margin:0px 0px 0px 0px;',
			width: w, 
			title:'用户',
			border:true,
			height:topHeight,
	   		items:[grid],
	   		tbar:usertb
	   	}); 
	    //---------------------问题类型------------------------------------------------
	   var typesm = new Ext.grid.CheckboxSelectionModel({checkOnly:true});//checkbox多选框的对象
	   var typecm = new Ext.grid.ColumnModel([
	           			            new Ext.grid.RowNumberer(),
	           			            typesm,
	           			            { header: 'itemid', dataIndex: 'itemid',hidden:true },
	           			            { header: '问题类型', dataIndex: 'name',width:200 ,sortable:true}
	           			        ]);
	    typecm.defaultSortable = true;
		var typedata ={result:0,data:[]};
		var typestore = new Ext.data.Store({
					proxy: new Ext.data.MemoryProxy(typedata),
					 reader: new Ext.data.JsonReader({}, [{name:'itemid'},
				            {name:'name'}
				            ])
		 			})
		typestore.load();	
	    var typegrid = new Ext.grid.GridPanel({	
	    								id:'typegrid',
		           			            store: typestore,
		           			            cm: typecm,
		           			            sm: typesm,
		           			            border:false,
		           			            width: w-2,
		           			            height:topHeight+28,
		           			            enableColumnMove:false,// 拖放
		           			            viewConfig:{
			           						forceFit:true,
			           						enableRowBody:true,
			           						showPreview:true
		           						},
		           						listeners:{cellclick:function(grid, rowIndex, columnIndex, e){
		           							if(columnIndex!=1){
		           								var model = typegrid.getSelectionModel();
		           								if(model.isSelected(rowIndex)){
		           									 model.deselectRow(rowIndex);
		           								}else{
		           									 model.selectRow(rowIndex,rowIndex+1);
		           								}
		           							 }
		           						 }}	
		           			        });		
		var typepanel =new Ext.Panel({
			id:'typepanel',
			bodyStyle:'margin:0px 0px 0px 0px;',
			width: w, 
			title:'问题类型',
			border:true,
			height:topHeight+28,
			items:[typegrid]
	   		
	    });     
	    //加载用户和用户组数据
		Ext.lt.RCP.server("rolemanager", "findUserAndGroup", null,function (resp) {
				store.loadData(resp.userlist);
				grid.doLayout();
				rolestore.loadData(resp.rolelist);
				rolegrid.doLayout();
				typestore.loadData(resp.typelist);   
				typegrid.doLayout();
		});	 
		
		var buttonpanel =new Ext.Panel({
			bodyStyle:'margin:0px 0px 0px 0px;',
			height:document.body.clientHeight-225,
			border:false,
	   		html:'<input type="button" value="保存" class="btn" onclick="Ext_lt_RoleManage.saveManage();"></br></br><font color="red">说明:选择某一个用户组，为该用户组分配用户和问题类型</font>'
	    });  
		
		arr.push(rolepanel);
		arr.push(userpanel);
		arr.push(typepanel);
		arr.push(buttonpanel);  
		//保存设置
		arr.saveManage = function(){
				var userrows = grid.getSelectionModel().getSelections();//用户（多个）
				var rolerows = rolegrid.getSelectionModel().getSelected();//用户组（一个）
				var typerows = typegrid.getSelectionModel().getSelections();//问题类型（多个）
				if(userrows==null||userrows.length==0){
					alert("请选择用户");return;
				}
				if(rolerows==null||rolerows.length==0){
					alert("请选择用户组");return;
				}
				if(typerows==null||typerows.length==0){
					alert("请选择问题类型");return;
				}
				var userids = [];
				var alluserids = [];
				var types = [];
				var gcode = rolerows.get("gcode");
				for(var i = 0;i < userrows.length;i ++ ){
					userids.push(userrows[i].get("userid"));
				}
				for(var i = 0;i < typerows.length;i ++ ){
					types.push(typerows[i].get("itemid"));
				}
	 			var config = {};
	 			config.gcode = gcode;
	 			config.userids = userids;
	 			config.types = types;
				Ext.lt.RCP.server("rolemanager", "saveSet", config,function (resp) {
					alert("保存成功！");
				});	
		}	
	
		arr.findset = function(){
			var rolerows = rolegrid.getSelectionModel().getSelected();//用户组（一个）
			var gcode = rolerows.get("gcode");
			var config = {};
			config.gcode = gcode;
			Ext.lt.RCP.server("rolemanager", "findSet", config,function (resp) {
				var userList = resp.userList;
				var typeList = resp.typeList;
				var model = grid.getSelectionModel();
				var typemodel = typegrid.getSelectionModel();
				model.clearSelections();//清除所有勾选上的数据
				typemodel.clearSelections();//清除所有勾选上的数据
				for(var i = 0;i < userList.length;i ++){
					var userid = userList[i].userid;
					var tempStore = grid.getStore();
					for(var j = 0;j < tempStore.getCount();j ++){
				 		var tempid = tempStore.getAt(j).get('userid');
				 		if(userid==tempid){
				 			model.selectRow(j,j+1)
				 		}
					}
				}
				for(var i = 0;i < typeList.length;i ++){
					var type = typeList[i].type;
					var tempStore = typegrid.getStore();
					for(var j = 0;j < tempStore.getCount();j ++){
				 		var tempid = tempStore.getAt(j).get('itemid');
				 		if(type==tempid){
				 			typemodel.selectRow(j,j+1)
				 		}
					}
				}
			});	
		}
		
		return arr;
}
