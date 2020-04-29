Ext.lt.console.component.datasourcemanager=function(sid,config){
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = 'side';
// 创建数据集
Ext.lt.console.component.datasourcemanager.instance=this;
  
  this.store =new Ext.data.Store({reader:new Ext.data.ArrayReader({}, [
			{name:'acctyear'},
			{name:'region'},
			{name:'id'},
			{name:'name'},
			{name:'dbtype'},
			{name:'host'},
			{name:'port'},
			{name:'dbname'},
			{name:'username'},
			{name:'password'}
			])});
		this.provinces=[];
		//Ext.lt.RCP.server("datasourceserver", "findAllProvince", "110" , function (resp)可查北京地区
 		Ext.lt.RCP.server("datasourceserver", "findAllDataSource", null , function (resp) {
			Ext.lt.console.component.datasourcemanager.instance.showData(resp);
		});
	this.showData = function (datas) {
		var loaddata = new Array();
		for (var i = 0; i < datas.length; i++) {
			loaddata[i] = new Array(datas[i].acctyear, datas[i].region, datas[i].id, datas[i].name,datas[i].dbtype,datas[i].host,datas[i].port,datas[i].dbname,datas[i].username,datas[i].password);
		}
		this.store.loadData(loaddata);
	};
// 创建显示数据源的列表
//var sm = new Ext.grid.CheckboxSelectionModel();//grid列中有第一个checkbox
var sm = new Ext.grid.CheckboxSelectionModel({header: ""});//grid列中没有第一个checkbox
	this.datasourceGrid = new Ext.grid.GridPanel({
		layout:"fit", //panel自适应
		border:false,
        store: this.store,
        region:'center',
        columns: [
    	//sm = datasourceGrid.getSelectionModel(); 
		//sm.clearSelections(); 
		//或指定sm.deselectRow(n)
    	sm,//添加checkbox


					{id:'acctyear',header: "年度", width: 80, sortable: true,menuDisabled:true, dataIndex: 'acctyear'},
					{id:'region',header: "地区", width: 80, sortable: true,menuDisabled:true, dataIndex: 'region', renderer:function (value) {
						var s=Ext.lt.console.component.datasourcemanager.instance.provinces;
						var arr=s.toArray();
						for(var i=0;i<arr.length;i++){
							if(arr[i].code==value){
								value=arr[i].name;
								break;
							}
						}
						return value;
					}},
					{id:'id',header: "数据源编码", width: 80, sortable: true,menuDisabled:true, dataIndex: 'id'},
					{id:'dbtype',header: "数据库类型", width: 80, sortable: true,menuDisabled:true, dataIndex: 'dbtype'},
					{id:'host',header: "服务器IP", width: 80, sortable: true,menuDisabled:true, dataIndex: 'host'},
					{id:'port',header: "端口号", width: 80, sortable: true,menuDisabled:true, dataIndex: 'port'},
					{id:'dbname',header: "数据库名", width: 80, sortable: true,menuDisabled:true, dataIndex: 'dbname'},
					{id:'username',header: "用户名", width: 80, sortable: true,menuDisabled:true, dataIndex: 'username'},
					{id:'password',header: "密码", width: 80, sortable: true,menuDisabled:true, dataIndex: 'password',hidden:true}
					 
        ],
        sm:sm,
        stripeRows: true,
        autoExpandColumn: 'username',
        tbar:[
					{text: '新增', iconCls:"cancel", pressed:true,  listeners:{'click':function(){Ext.lt.console.component.datasourcemanager.instance.datasourceGrid.newdatasource()}}},
					'-', 
					{text: '删除',iconCls:"cancel", pressed:true, listeners:{'click':function(){
						var selectrow = Ext.lt.console.component.datasourcemanager.instance.datasourceGrid.getSelectionModel().selections.items;
						var arr=new Array();
						for(var i=0;i<selectrow.length;i++){
							if(selectrow[i].data.id!=''){
								arr.push(selectrow[i].data.id);
							}
						}
						if(arr.length>0){
							Ext.MessageBox.confirm("删除操作", "是否要删除已选数据源？",
							function(btn) {
								if (btn == "yes") {
									if(typeof(deleteFcasDataSourceCallBack)!='undefined'){
										var msg=deleteFcasDataSourceCallBack(arr);
										if(msg&&msg!='false'){
											Ext.MessageBox.confirm("删除操作", msg,function(button){
												if(button=='yes'){
													remove(arr);
												}
											})
										}else{
											remove(arr);
										}
									}else{
										remove(arr);
									}
								}
							});
						}else{
							for(var i=0;i<selectrow.length;){
								Ext.lt.console.component.datasourcemanager.instance.store.remove(selectrow[0]);
							}
								Ext.Msg.alert('提示', '请选择要删除的数据！');
						}
					}}}
				],
        height:380
        //autoHeight: true			 //自动调整高度
    }
    );
    //删除操作
    function remove(arr){
    	Ext.lt.RCP.server("datasourceserver", "remove",[ arr ], function (resp) {
			var selectrow = Ext.lt.console.component.datasourcemanager.instance.datasourceGrid.getSelectionModel().selections.items;
			for(var i=0;i<selectrow.length;){
				Ext.lt.console.component.datasourcemanager.instance.store.remove(selectrow[0]);
			}
			Ext.Msg.alert('提示', '删除成功！');
  		 });
    }
   
    // 增加显示明文密码快捷键'ctrl+shift+p'
	document.onkeypress=function(){
		var event = window.event;
		if(event.shiftKey && event.ctrlKey && event.keyCode==16){
			if(Ext.lt.console.component.datasourcemanager.instance.datasourceGrid.colModel.getColumnAt(9).hidden){
			Ext.lt.console.component.datasourcemanager.instance.datasourceGrid.colModel.setHidden(9,false);
			}else{
			Ext.lt.console.component.datasourcemanager.instance.datasourceGrid.colModel.setHidden(9,true);
			}
		}
	}
    
    var dbconfigbasic=new Ext.lt.console.component.dbconfigbasic(this.datasourceGrid);
    var dbSQLInfo=new Ext.lt.console.component.daomonitorlog.show();
    var dbSQLCache=new Ext.lt.console.component.datasourcecache.show();
    
    this.datasourceGrid.newdatasource=function(){
    	var dd=new Ext.data.Record({'acctyear':'2011','region':'','id':'','dbtype':'oracle','host':'','port':'','dbname':'','username':''});
    	if(dbconfigbasic.showDataSource(dd)){
    		this.store.add([dd]);
    		sm.selectRecords([dd]);
    	}

    }
    sm.on('beforerowselect', function(sm, rowIdx,keepExisting, r) {
    		if(null!=r.data.id&&r.data.id!=''){
    			dbSQLInfo.loadDBInfo(r.data.id);
    			dbSQLCache.loadDBInfo(r.data.id);
    		}
    		return dbconfigbasic.showDataSource(r);
    });
    
		// 详细设置界面
    this.dsconfig=new Ext.TabPanel({
    
    	id:'dbconfig',
    	activeTab:0,
    	border:false,
    	enableTabScroll:true,
    	region:'south',
    	items:[
    		dbconfigbasic,dbSQLInfo,dbSQLCache
    		/*注销缓存管理
    		,
    		{id:'cache',border:0,title:'缓存管理'}
    		
    		*/
    	]
    });
    
	this.panel= new Ext.Panel({
		
		title:'数据源管理',
		id:'datasourcemanager',
		border:false,
		//width:'99.8%',	//datagrid列表的宽度
		//autoHeight: true,	//自动调整高度	
		height:500,
		layout:'border',
		//autoScroll:true,
		items:[this.datasourceGrid,this.dsconfig]
		});
	return this.panel;
}

//基本设置
Ext.lt.console.component.dbconfigbasic=function(datasourceGrid){
	var datas=Ext.lt.RCP.asynserver("datasourceserver", "findAllProvince", null);
	Ext.lt.console.component.datasourcemanager.instance.provinces=datas[0];
	var treeCombox=new Ext.form.ComboBox({
			fieldLabel: "地区<span style='color:red'>*</span>",
			store: new Ext.data.SimpleStore({
			fields : ['value', 'name'],
			data : [[]]
			}),
			displayField:'name',
			typeAhead: true,
		  	mode: 'local',
		  	triggerAction: 'all',
			name: 'region',
		  	selectOnFocus:true,
			anchor:'100%',
			allowBlank : false,
 			blankText:"不允许为空！",
			editable:false,
			tpl: "<div style='height:200px' id='regionTreeDiv'></div>",
			onSelect:Ext.emptyFn
			})
  	//重写下拉列表框的点击事件(屏蔽)
	treeCombox.onViewClick = function(doFocus){
	};
	var _tree = new Ext.lt.Qtree({
				id:"TTree",
				fields : ['itemid','code', 'name','level','isleaf','superitemid'],
				data:datas[0],
 	 			outformart:'#name',
 	 			showRootNode:false,
 	 			autoScroll : false,
				height:200,
				linkchild:true,
				viewmodel:'tree'
		});	
	treeCombox.onViewClick = function(doFocus){
	};			
	var hasdrawn = false;
	treeCombox.on('expand',function(){
		if(!hasdrawn){
			_tree.draw(document.getElementById("regionTreeDiv")); 
			hasdrawn = true;
		}
		//_tree.expandlevel(2);
	});
	treeCombox.on('collapse',function(){
		var nodes = _tree.getSelected();
		if(nodes.length==0) return;
		treeCombox.setValue(nodes[0].name);
		treeCombox.comvalue=nodes[0].code;
	});
	_tree.on({nodeclick:function(tree,param){
		var selectNode=param.data;
		treeCombox.setValue(selectNode.name);
		treeCombox.comvalue=selectNode.code;
		treeCombox.collapse();
	}	
	});
	//重写getValue方法
	treeCombox.getValue=function(){return treeCombox.comvalue?treeCombox.comvalue:"";}
	 var _grid = datasourceGrid;
	 var basicPanel=new Ext.Panel({
	 	layout:"fit",
		id:'base',
		title:'基本配置',
		//autoHeight: true,	//自动调整高度
		height:155,
		border:false,
		tbar :[
			//
			{text: '保存', iconCls: 'save',pressed:true,  listeners:{'click':function(){basicPanel.save()}}},
			'-', 
			{text: '测试', iconCls: 'test',pressed:true,  listeners:{'click':function(){basicPanel.test()}}}
		],
		padding:8,
		//输入框
		items:new Ext.form.FormPanel({
				
			    id:'datasourcefrom',
				baseCls: 'x-plain',
				labelWidth: 80,
				//三列数据
				items: [{
		            	layout:'column',
		           	 	baseCls: 'x-plain',
		            	items:[{
				                //一列三行数据
				                columnWidth:.3,
				                layout: 'form',
				                baseCls: 'x-plain',
				                items: [//地区选择框
				                new Ext.form.ComboBox({
										fieldLabel: '数据库类型',
										store: new Ext.data.SimpleStore({
										fields : ['value', 'name'],
										data : [['一体化库', '一体化库'], ['其他数据库','其他数据库']]
										}),
										displayField:'name',
										typeAhead: true,
									  	mode: 'local',
									  	triggerAction: 'all',
										name: 'db_type',
									  	selectOnFocus:true,
										anchor:'99%',
										allowBlank : false,
				        				blankText:"不允许为空！",
										editable:false,
										//valueField:'value',
										//setvalue:"value",
										value: '一体化库',
										listeners:{'select':function(p,k,i){
											var faspdb=basicPanel.findById('datasourcefrom').getForm().findField('faspdb')
											if(i==0){
												faspdb.setDisabled(true);
												faspdb.setValue("faspdb");
											}else{
												faspdb.setDisabled(false);
											}
										}}
										}),{
				                	//年度
						                    xtype:'textfield',
						                    fieldLabel: "年度<span style='color:red'>*</span>",
						                    name: 'acctyear',
						                    //selectOnFocus:true,
						                    anchor:'99%',
					                    	//emptyText:'2011',
						                     //验证textfield是否为空
					                    	allowBlank : false,
				        					//输入内容为空提示语
				        					blankText:"不允许为空！", 
											//最长字符（可以达到）
				        					maxLength : 8 ,
											//超出设定的最长字符时，会给出错误提示
											maxLengthText : '年度长度不能超过8位！',
				        					//正则表达式验证输入的内容是否为8位内数字
     										regex:/^([1-9]\d{0,8})$/,
     										//输入IP格式错误提示语
     										regexText:'年度格式错误，年度只能输入数字(例:2011)！' 
     										
						                },{
						                    xtype:'textfield',
						                    fieldLabel: "编码<span style='color:red'>*</span>",
						                    name: 'faspdb',
						                    anchor:'99%',
					                    	allowBlank : false,
					                    	disabled:true,
				        					//输入内容为空提示语
				        					blankText:"不允许为空！", 
											//最长字符（可以达到）
				        					maxLength : 8 ,
											//超出设定的最长字符时，会给出错误提示
											maxLengthText : '年度长度不能超过8位！',
     										value:'faspdb'
						                },{
						            //数据源编码
						                    xtype:'textfield',
						                    /*fieldLabel: "<span style='color:red'>abcds*</span>",
						                    	设置textfield中的fieldLabel颜色为红色*/
						                    fieldLabel: "数据源编码<span style='color:red'>*</span>",
						                    name: 'id',
						                    align:'center',
						                    anchor:'99%',
						                     //验证textfield是否为空
					                    	allowBlank : false,
					                    	disabled:true
				        					//输入内容为空提示语
				        					//blankText:"不允许为空!",
				        					//最长字符（可以达到）
				        					//maxLength : 50 ,
											//超出设定的最长字符时，会给出错误提示
											//maxLengthText : '数据源编码长度不能超过50位！'
											
											
				                		}]
		           				},{
				                baseCls: 'x-plain',
				                width:20
				                },{
				                //一列三行数据
				                columnWidth:.3,
				                layout: 'form',
				                baseCls: 'x-plain',
				                items: [
				                //地区选择框
				                treeCombox,
							{
								//服务器地址
					                    xtype:'textfield',
					                    fieldLabel: "服务器地址<span style='color:red'>*</span>",
					                    name: 'host',
					                    anchor:'99%',
					                    //验证textfield是否为空
					                    allowBlank : false,
				        				//输入内容为空提示语
				        				blankText:"不允许为空！",
     									/*获取键盘事件禁止输入某些字符
     									initEvents : function() {   
										    var keyPress = function(e){   
										        var blockchars = ' abcdefghijklmnopqrstuvwxyz';   
										        var c = e.getCharCode();   
										        if(blockchars.indexOf(String.fromCharCode(c)) != -1){   
										            e.stopEvent();   
										        }   
										    };   
										    this.el.on("keypress", keyPress, this);   
										}  ,
										*/
				        				//正则表达式验证输入的内容是否为IP地址
     									regex:/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
     									//输入IP格式错误提示语
     									regexText:'IP地址格式错误，IP地址为：:xxx.xxx.xxx.xxx(xxx为0-255)！'          
				                		},
								//用户名
		                				{
					                    xtype:'textfield',
					                    columnWidth:.5,
					                    fieldLabel:"用户名<span style='color:red'>*</span>",
					                    name: 'username',
					                    anchor:'99%',
					                    //验证textfield是否为空
					                    allowBlank : false,
				        				//输入内容为空提示语
				        				blankText:"不允许为空！",
				        				//最长字符（可以达到）
				        				maxLength : 100 ,
										//超出设定的最长字符时，会给出错误提示
										maxLengthText : '用户名长度不能超过100位！'
		                				},
				                		{
				                	//数据库名
						                    xtype:'textfield',
						                    columnWidth:.5,
						                    fieldLabel: "数据库名<span style='color:red'>*</span>",//设置*颜色为红色
						                    name: 'dbname',
						                    align:'center',
						                    anchor:'99%',
						                    //验证textfield是否为空
					                    	allowBlank : false,
				        					//输入内容为空提示语
				        					blankText:"不允许为空！" ,
				        					//最长字符（可以达到）
				        					maxLength : 50 ,
											//超出设定的最长字符时，会给出错误提示
											maxLengthText : '数据库长度不能超过50位！'
				                		}]
		            			} ,{
				                baseCls: 'x-plain',
				                width:20
				                },
		            			{
				                //一列三行数据
				                columnWidth:.3333333,
				                layout: 'form',
				                baseCls: 'x-plain',
				                items: [	//数据库类型选择框
		                		new Ext.form.ComboBox({
										fieldLabel:"数据库类型<span style='color:red'>*</span>",
										store: new Ext.data.SimpleStore({
										fields : ['value', 'name'],
										data : [['oracle', 'Oracle'], ['mysql','MySQL'],['mssqlserver','MS SQLSERVER']]
										}),
										displayField:'name',
										typeAhead: true,
							  			mode: 'local',
							  			triggerAction: 'all',
										name: 'dbtype',
							  			selectOnFocus:true,
										anchor:'99%',
										allowBlank : false,
		        						blankText:"不允许为空！",
										editable:false,
										valueField:'value',
										setvalue:"value",
										value:"oracle"
										}),{
								//端口号
					                    xtype:'textfield',
					                    fieldLabel: "端口号<span style='color:red'>*</span>",
					                    name: 'port',
					                    anchor:'99%',
					                    selectOnFocus:true,
					                     //验证textfield是否为空
					                    allowBlank : false,
				        				//输入内容为空提示语
				        				blankText:"不允许为空！" ,
				        				//最长字符（可以达到）
				        				maxLength : 5 ,
										//超出设定的最长字符时，会给出错误提示
										maxLengthText : '端口号长度不能超过5位！',
										regex:/^([1-9]\d{0,8})$/,
     										//输入IP格式错误提示语
     									regexText:'端口号只能输入数字类型！' 
				                		},{
										//密码
										xtype:'textfield',
										fieldLabel: "密码<span style='color:red'>*</span>",
										inputType : "password" , 
										name: 'password',
										 
										anchor: '99%',
										 //验证textfield是否为空
					                    allowBlank : false,
				        				//输入内容为空提示语
				        				blankText:"不允许为空！" ,
				        				//最长字符（可以达到）
				        				maxLength : 50 ,
										//超出设定的最长字符时，会给出错误提示
										maxLengthText : '密码长度不能超过50位！'
				            			},{   
							        	//链接字符串
							            xtype : 'textarea',   
							            fieldLabel : '链接字符串',   
							            emptyText : '<空>',   
							            name : 'url',   
							            height : 30,
							            anchor: '99.5%' ,
							            //最长字符（可以达到）
									    maxLength : 512 ,
										//超出设定的最长字符时，会给出错误提示
										maxLengthText : '链接字符串长度不能超过512位！'
							        	}]
		            			}]
		        	}]
		})
		
	})
//统一指定错误信息提示浮动显示方式
//Ext.form.Field.prototype.msgTarget = 'side';
//初始化信息提示功能
	Ext.QuickTips.init();
	// 添加必要的业务方法
	// 显示数据库链接数据
	basicPanel.showDataSource=function(r){
		if(!basicPanel.hasChanged()){
			if(confirm('数据源信息已经被改动，是否要替换数据源信息？')){
				var d=basicPanel._recordset;
				if(d.get('id')==''){
					// 新建的数据集
					_grid.store.remove(d);
				}
				basicPanel._recordset=null;
				return basicPanel.showDataSource(r);
			}
			else{
				return false;
			}
		}
		else{
			var _form = basicPanel.findById('datasourcefrom').getForm();
			basicPanel._recordset=r
			var _ds=r.data;
			if(_ds['id'].indexOf('faspdb')==(_ds['acctyear']+"").length+_ds['region'].length){
				_form.findField('db_type').setValue('一体化库');
				_form.findField('faspdb').setValue('faspdb');
				_form.findField('faspdb').setDisabled(true);
			}else{
				_form.findField('db_type').setValue('其他数据库');
				_form.findField('faspdb').setValue(_ds['id'].replace(_ds['acctyear']+_ds['region'],''));
				_form.findField('faspdb').setDisabled(false);
			}
			_form.findField('acctyear').setValue(_ds['acctyear']);
			treeCombox.comvalue=_ds['region'];
			_form.findField('region').setValue(this.getRegionName(_ds['region']));
			_form.findField('id').setValue(_ds['id']);
			_form.findField('dbtype').setValue(_ds['dbtype']);
			_form.findField('dbname').setValue(_ds['dbname']);
			_form.findField('host').setValue(_ds['host']);
			_form.findField('port').setValue(_ds['port']);
			_form.findField('username').setValue(_ds['username']);
			_form.findField('password').setValue(_ds['password']);
			_form.findField('url').setValue(_ds['url']);
		}
		return true;
	}
	basicPanel.getRegionName=function(value){
		var s=Ext.lt.console.component.datasourcemanager.instance.provinces;
		var arr=s.toArray();
		for(var i=0;i<arr.length;i++){
			if(arr[i].code==value){
				value=arr[i].name;
				break;
			}
		}
		return value;
	}
	basicPanel.getRegionCode=function(value){
		var s=Ext.lt.console.component.datasourcemanager.instance.provinces;
		var arr=s.toArray();
		for(var i=0;i<arr.length;i++){
			if(arr[i].name==value){
				value=arr[i].code;
			}
		}
		return value;
	}
	basicPanel.save=function(){
		// TODO: 此处实现提交数据源配置的代码
		var _form = basicPanel.findById('datasourcefrom').getForm();
		var _rs=new Object();
		_rs.acctyear=_form.findField('acctyear').getValue();
		_rs.region=basicPanel.getRegionCode(_form.findField('region').getValue());
		var faspdb='faspdb'
		if(_form.findField('db_type').getValue()!='一体化库'){
			faspdb=_form.findField('faspdb').getValue();
		}
		_rs.oldId=basicPanel._recordset.data.id;
		_form.findField('id').setValue(_rs.acctyear+''+basicPanel.getRegionCode(_form.findField('region').getValue())+faspdb);
		_rs.id=_form.findField('id').getValue();
		_rs.dbtype=_form.findField('dbtype').getValue();
		_rs.dbname=_form.findField('dbname').getValue();
		_rs.host=_form.findField('host').getValue();
		_rs.port=_form.findField('port').getValue();
		_rs.username=_form.findField('username').getValue();
		_rs.password=_form.findField('password').getValue();
		_rs.url=_form.findField('url').getValue();
		var storeData = Ext.lt.console.component.datasourcemanager.instance.store.data;
		var isExist = 0;
		for(var i=0;i<storeData.length;i++){
			var data_Id = storeData.get(i).data.id;
			if(data_Id != _rs.oldId && data_Id == _rs.id){
				isExist = 1;
				break;
			}
		}
		if(isExist == 1){
			Ext.Msg.alert('提示', "数据源编码已存在，请检查！");
			return;
		}
		if(basicPanel._recordset.data.id!=''){
			Ext.lt.RCP.server("datasourceserver", "updateDataSource", _rs , afterSave);
		}else{
			Ext.lt.RCP.server("datasourceserver", "saveDataSource", _rs , afterSave,function(resp){Ext.Msg.alert('提示', "保存失败！")});
		}
	}
	afterSave=function (resp){
		if(resp){
			//Ext.MessageBox.alert('提示','保存成功');
			Ext.Msg.alert('提示', '保存成功！');
			var _form = basicPanel.findById('datasourcefrom').getForm();
			var _rs = basicPanel._recordset;
			_rs.set('acctyear',_form.findField('acctyear').getValue());
			_rs.set('region',basicPanel.getRegionCode(_form.findField('region').getValue()));
			_rs.set('id',_form.findField('id').getValue());
			_rs.set('dbtype',_form.findField('dbtype').getValue());
			_rs.set('dbname',_form.findField('dbname').getValue());
			_rs.set('host',_form.findField('host').getValue());
			_rs.set('port',_form.findField('port').getValue());
			_rs.set('username',_form.findField('username').getValue());
			_rs.set('password',_form.findField('password').getValue());
			_rs.set('url',_form.findField('url').getValue());
			_rs.commit();
		}else{
			Ext.Msg.alert('提示', '保存失败！');
		}
	}
	basicPanel.test=function(sid,config){
		var count=datasourceGrid.getSelectionModel().selections.items.length;
		if(count==0){
			Ext.Msg.alert('提示', '请选择数据源！');
			return;
		}
		// TODO: 此处实现验证数据库配置信息是否正确的代码，这里假设验证通过
		var _form = basicPanel.findById('datasourcefrom').getForm();
		var _rs=new Object();
		_rs.acctyear=_form.findField('acctyear').getValue();
		_rs.region=basicPanel.getRegionCode(_form.findField('region').getValue());
		_rs.id=_form.findField('id').getValue();
		_rs.dbtype=_form.findField('dbtype').getValue();
		_rs.dbname=_form.findField('dbname').getValue();
		_rs.host=_form.findField('host').getValue();
		_rs.port=_form.findField('port').getValue();
		_rs.username=_form.findField('username').getValue();
		_rs.password=_form.findField('password').getValue();
		_rs.url=_form.findField('url').getValue();
		 Ext.lt.RCP.server("datasourceserver",'testDataSource',_rs, function(resp){
			if(resp){
				// Ext.MessageBox.confirm('提示','数据源验证通过，是否保存？',function(btn){if(btn=='yes'){basicPanel.save()}});
				Ext.Msg.alert('提示', '链接成功！');
			}else{
				Ext.Msg.alert('提示', '链接失败！');
			}		
		});
	}
	
	// 检查数据库配置信息是否被改动过
	basicPanel.hasChanged=function(){
		if(basicPanel._recordset==null) return true;
		if(datasourceGrid.getSelectionModel().getSelected()==null)return true;
		
		var _ds=basicPanel._recordset.data;
		var _form = basicPanel.findById('datasourcefrom').getForm();
		return (_ds['acctyear']!='' && _ds['acctyear']==_form.findField('acctyear').getValue()) &&
		       (_ds['region']!='' && _ds['region']==basicPanel.getRegionCode(_form.findField('region').getValue())) &&
		       (_ds['id']!='' && _ds['id']==_form.findField('id').getValue()) &&
		       (_ds['dbtype']!='' && _ds['dbtype']==_form.findField('dbtype').getValue()) &&
		       (_ds['dbname']!='' && _ds['dbname']==_form.findField('dbname').getValue()) &&
		       ( _ds['host']==_form.findField('host').getValue()) &&
		       ( _ds['port']==_form.findField('port').getValue()) &&
		       ( _ds['username']==_form.findField('username').getValue()) &&
		       ( _ds['password']==_form.findField('password').getValue()) &&
		       ( _ds['url']==null?true:_ds['url']==_form.findField('url').getValue());
	}
	
	return basicPanel;
}
Ext.lt.console.component.daomonitorlog=new function(){
	this.datads = new Ext.data.Store({
		sortInfo :{field: "accRuntime", direction: "DESC"},
		reader:new Ext.data.ArrayReader({}, [{name:"sql"},  {name:"maxRuntime"}, {name:"minRuntime"},{name:"accRuntime"},{name:"preRuntime"},{name:"runtime"}])
	});
	this.model = new Ext.grid.ColumnModel([
		new Ext.grid.RowNumberer(), 
		{header:"访问SQL", width:3, sortable:true,menuDisabled:true, locked:false, dataIndex:"sql"},
		{header:"最大执行时间(ms)", width:2, sortable:true,menuDisabled:true, locked:false, dataIndex:"maxRuntime"},
		{header:"最小执行时间(ms)", width:2, sortable:true,menuDisabled:true, locked:false, dataIndex:"minRuntime"},
		{header:"累计执行时间(ms)", width:2, sortable:true,menuDisabled:true, locked:false, dataIndex:"accRuntime"},
		{header:"平均执行时间(ms)", width:2, sortable:true,menuDisabled:true, locked:false, dataIndex:"preRuntime"},
		{header:"执行次数", width:1, sortable:true,menuDisabled:true, locked:false, dataIndex:"runtime"}
		]);
	this.panel = new Ext.grid.GridPanel({
				title:'数据库SQL执行日志',
				layout:"fit",
				iconCls:"grid", 
				border:0, 
				store:this.datads, 
				cm:this.model, 
				viewConfig: {forceFit:true},   
				frame:true
			});
	var src=this;
	this.panel.loadDBInfo=function(dsid){
		Ext.lt.RCP.server("datasourceserver",'getdaomonitorlogs',dsid,function(reps){
			// 通过远程调用获取最新的日志记录
			var loaddata = new Array();
				for(var j=0;j<reps.length;j++){
				loaddata.push([reps[j].sql,reps[j].maxRuntime,reps[j].minRuntime,reps[j].accRuntime,reps[j].preRuntime,reps[j].runtime]);
			}
			src.datads.loadData(loaddata);
		});
	};
	this.panel.addListener('rowdblclick', function(grid, rowindex, e){
		Ext.Msg.alert("SQL详情",grid.store.data.items[rowindex].data.sql);
	}); 
	this.show=function(){
	return  Ext.lt.console.component.daomonitorlog.panel;
	}
};

Ext.lt.console.component.datasourcecache=new function(){
	var sm = new Ext.grid.CheckboxSelectionModel({header: "",singleSelect :true});//grid列中没有第一个checkbox
	this.datads = new Ext.data.Store({
		reader:new Ext.data.ArrayReader({}, [{name:"sql"},{name:"refresh"},{name:"id"}])
	});
	this.model = new Ext.grid.ColumnModel([
		sm,
		new Ext.grid.RowNumberer(), 
		{header:"SQL", width:3, sortable:true,menuDisabled:true, locked:false, dataIndex:"sql"},
		{header:"刷新时间", width:1, sortable:true,menuDisabled:true, locked:false, dataIndex:"refresh"}
		]);
	this.panel = new Ext.grid.GridPanel({
				title:'数据库SQL缓存',
				layout:"fit",
				iconCls:"grid", 
				border:0, 
				store:this.datads, 
				cm:this.model,
				sm:sm,
				tbar :[
					{text: '添加', iconCls: 'save',pressed:true,  listeners:{'click':function(){
						saveAndUpdate("",false,null);
					}}},
					'-', 
					{text: '修改', iconCls: 'test',pressed:true,  listeners:{'click':function(){
						var selectrow = src.panel.getSelectionModel().getSelected();
						if(selectrow==null){Ext.Msg.alert('提示', '请选择需要修改的SQL！');return;}
						saveAndUpdate(selectrow.data.sql,selectrow.data.refresh!=null,selectrow.data.id);
					}}},
					'-', 
					{text: '删除', iconCls: 'test',pressed:true,  listeners:{'click':function(){
						var selectrow = src.panel.getSelectionModel().getSelected();
						if(selectrow==null){Ext.Msg.alert('提示', '请选择需要删除的SQL！');return;}
						Ext.lt.RCP.server("datasourceserver",'delDatasourceCache2Id',selectrow.data.id+"",function(reps){
							if(reps){
								Ext.Msg.alert('提示', '删除成功！');
								src.panel.loadDBInfo(src.dsid);
							}else{
								Ext.Msg.alert('提示', '删除失败！');
							}
						});
					}}}
				],
				viewConfig: {forceFit:true},   
				frame:true
			});
	this.dsid=null;
	this.isSave=null;
	function saveAndUpdate(orlSql,ref,id){

		src.isSave=id==null;
		if(src.dsid==null)return;
		Ext.lt.template.mask();
		if(Ext.getCmp("datasourcecache_sql")==null){
			new Ext.Window({
			   title: '数据库SQL缓存',
			   id:"datasourcecache_sql",
			   width:800,
			   height: 400,
			   layout:'column',
			   closable:false,
			   resizable :false,
			   autoScroll:true,
			   buttonAlign:"center",
			   buttons:[{text:"确认", handler:function (button,win) {
			   		if(src.isSave){
			   			Ext.lt.RCP.server("datasourceserver",'saveDatasourceCache',[Ext.getCmp("datasourcecache_sql_txt").getValue(),src.dsid,Ext.getCmp("datasourcecache_sql_ref").getValue()+""],function(reps){
			   				if(reps){
			   					Ext.Msg.alert('提示', '保存成功！');
								src.panel.loadDBInfo(src.dsid);
							}else{
								Ext.Msg.alert('提示', '保存失败！');
							}
			   				Ext.lt.template.unmask();
			   				Ext.getCmp("datasourcecache_sql").hide();
						});
			   		}else{
						Ext.lt.RCP.server("datasourceserver",'updateDatasourceCache',[Ext.getCmp("datasourcecache_sql_txt").getValue(),Ext.getCmp("datasourcecache_sql_ref").getValue()+"",id+""],function(reps){
							if(reps){
								Ext.Msg.alert('提示', '保存成功！');
								src.panel.loadDBInfo(src.dsid);
							}else{
								Ext.Msg.alert('提示', '保存失败！');
							}
							Ext.lt.template.unmask();
							Ext.getCmp("datasourcecache_sql").hide();
						});
			   		}
			   }},{text:"取消", handler:function (button,win) {
					Ext.getCmp("datasourcecache_sql").hide();
					Ext.lt.template.unmask();
			   }}],
			   items:[{columnWidth:.7,
				       layout: 'form',
				       baseCls: 'x-plain',
				       items:[new Ext.form.TextArea ({id:"datasourcecache_sql_txt",width :400,height:300,fieldLabel:"SQL"})]
				       },{columnWidth:.3,
				       layout: 'form',
				       baseCls: 'x-plain',
				       items:[new Ext.form.Checkbox({id:"datasourcecache_sql_ref",fieldLabel:"刷新时间",checked:ref})]
				       }]
			   });
		}
		Ext.getCmp("datasourcecache_sql_txt").setValue(orlSql);
		Ext.getCmp("datasourcecache_sql").show();
	}
	var src=this;
	this.panel.loadDBInfo=function(dsid){
		src.dsid=dsid;
		Ext.lt.RCP.server("datasourceserver",'loadDatasourceCache',dsid,function(reps){
			// 通过远程调用获取最新的日志记录
			var loaddata = new Array();
				for(var j=0;j<reps.length;j++){
				loaddata.push([reps[j][0],reps[j][1],reps[j][3]]);
			}
			src.datads.loadData(loaddata);
		});
	};
	this.panel.addListener('rowdblclick', function(grid, rowindex, e){
		Ext.Msg.alert("SQL详情",grid.store.data.items[rowindex].data.sql);
	}); 
	this.show=function(){
	return  Ext.lt.console.component.datasourcecache.panel;
	}
};