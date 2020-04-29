/*
2012-06-27 周继勇 对照表数据维护
*/
Ext.lt.console.component.etltable = function (service,config) {
	var etlcodeids;
	var etlnameids;
	var etlTableFields = [{name:"code"},{name:"name"}];
	
	var etlTableStore = new Ext.data.JsonStore({
			fields : etlTableFields,
			load:	findEtlTableData('','')
	});
	
	//定义TextField控件
			var etlcode = new Ext.form.TextField({
			    fieldLabel: '文本框名称',
			    width: 100,
			    id:'etlcodeid',
			    name: 'etlcodeid'
			});
			
			var etlname = new Ext.form.TextField({
			    fieldLabel: '文本框名称',
			    width: 100,
			    id:'etlnameid',
			    name: 'etlnameid'
			});
	
	
	var sm= new Ext.grid.CheckboxSelectionModel({
							checkOnly : false
						});
	var etlIndexTable =  [sm,{
				header : "标识ID",
				width : 250,
				fixed : true,
				sortable : true,
				hideable : false,
				menuDisabled : true,
				dataIndex : 'code'
			},{
				header : "标识名称",
				width : 325,
				fixed : true,
				sortable : true,
				hideable : false,
				menuDisabled : true,
				dataIndex : 'name'
			},{
				header:"信息配置", 
				width:3, 
				sortable:false, 
				menuDisabled : true,
				locked:false, 
				align : "center", 
				dataIndex:"code",
				renderer:function(value) {
				 	return "<a href='#' ><img src='../images/bann_ico/autoset.gif' width='15' height='16'  align='absmiddle' /></a>";
			}},{
				header:"修改", 
				width:2, 
				sortable:false,
				menuDisabled:true, 
				locked:false, 
				align : "center", 
				dataIndex:"code",
					renderer:function(value) {
				 		return "<a href='#' ><img src='../images/bann_ico/edit.gif' width='15' height='16'  align='absmiddle' /></a>";
			}},{
				header:"删除", 
				width:2, 
				sortable:false,
				menuDisabled:true, 
				locked:false, 
				align : "center", 
				dataIndex:"code",
					renderer:function(value) {
				 		return "<a href='#' ><img src='../images/bann_ico/del.gif' width='15' height='16'  align='absmiddle' /></a>";
			}}
			];
	
	var etlIndexGridPanel = new Ext.grid.GridPanel({
		id:"etlIndexGridPanelId",
		region : 'center',
		store : etlTableStore,
		columns : etlIndexTable,
		//sm :sm,
		title : '对照表管理',
		stripeRows : true,
		viewConfig : {
			forceFit : true
		},
		width : '100%',
		height : 150,
		border : false,
		tbar : [{
					text:"新增",
					pressed:true,
					handler:function(){
						newEtlTable();
					}
				},'-',
				{
					xtype : 'label',
					text : '标识ID：'
				},etlcode,'-',
				{
					xtype : 'label',
					text : '标识名称：'
				},etlname,'-',
				{
					text:"查询",
					pressed:true,
					handler:function(){
						findEtlTableData(Ext.getCmp("etlcodeid").getValue().trim(),Ext.getCmp("etlnameid").getValue().trim());
					}
				}
			   ],
		listeners:{
			cellclick : function(grid,rowIndex,columnIndex,e) {
				etlcodeids = grid.getStore().getAt(rowIndex).get('code');
				etlnameids = grid.getStore().getAt(rowIndex).get('name');
				if(columnIndex==3){
					pageLoad(etlcodeids,'','');
					elementconfig.layout.setActiveItem(1); 
				}
				else if(columnIndex==4){
					var updatemap = grid.getStore().getAt(rowIndex); 
					updateEtlTable(updatemap);
				}
				else if(columnIndex==5){
					Ext.MessageBox.confirm('提示','确认删除该配置？',function(btn) {
						if(btn=='yes'){
							Ext.lt.RCP.server("framework_etlservice", "delEtlTable",etlcodeids ,function (resp) {
								if(resp.flag){
									grid.getStore().remove(grid.getStore().getAt(rowIndex));
									Ext.Msg.alert('提示','删除配置成功！');
								}else{
									if(resp.msg){
										Ext.Msg.alert('提示',resp.msg);
									}else{
										Ext.Msg.alert('提示','删除配置失败！');
									}
								}
							}); 
						}
					});
				}
			}
		}		
	});	
	
	/**
	*新增对照关系
	*/	
	function newEtlTable(){
		var newEtlTablePanel = new Ext.form.FormPanel({
		
					id : 'newEtlTablePanelId',
					layout : 'form',
					height : 100,
					labelWidth : 60,
					buttonAlign : 'center',
					region : 'center',
					autoScroll:true,
					bodyStyle:'padding-top:5px',
					border : false,
					frame:false,
					items : [
							{
								xtype : 'textfield',
								fieldLabel : '标识ID',
								allowBlank : false,
								name : 'etlcode',
								id : 'etlcode',
								allowBlank : false,
								blankText:"不允许为空！",
								maxLength : 64,
							  	maxLengthText : ' 最大64个字符！',
							  	regex : /^(?!_)(?!.*?_$)[a-zA-Z0-9_]+$/,
								regexText : '只含有数字、字母、下划线不能以下划线开头和结尾！',
								width:300,
								anchor : '95%'
							},
							{
								xtype : 'textfield',
								fieldLabel : '标识名称',
								allowBlank : false,
								name : 'etlname',
								id : 'etlname',
								allowBlank : false,
								blankText:"不允许为空！",
								maxLength : 128,
							  	maxLengthText : ' 最大128个字符！',
							  	regex : /^[\u4e00-\u9fa5a-zA-Z0-9_]+$/,
								regexText : '只能输入汉字、字母、数字和下划线！',
								width:300,
								anchor : '95%'
							}
							],
					buttons : [
							{
								xtype : 'button',
								text : '确定',
								handler : function() {
									var etlcode = Ext.getCmp("etlcode").getValue().trim();
									if(etlcode == null || etlcode == ""){
										Ext.Msg.alert('提示','标识ID为必填项！'); 
										return;
									}else if(etlcode.length > 64){
										Ext.Msg.alert('提示','标识ID最大64个字符！'); 
										return;
									}else if(!Ext.getCmp("etlcode").isValid()){
										Ext.Msg.alert('提示','只含有数字、字母、下划线不能以下划线开头和结尾！'); 
										return;
									}
									
									var etlname = Ext.getCmp("etlname").getValue().trim();
									if(etlname == null || etlname == ""){
										Ext.Msg.alert('提示','标识名称为必填项！'); 
										return;
									}else if(etlname.length > 128){
										Ext.Msg.alert('提示','标识名称最大128个字符！'); 
										return;
									}else if(!Ext.getCmp("etlname").isValid()){
										Ext.Msg.alert('提示','只能输入汉字、字母、数字和下划线！'); 
										return;
									}
									
									var map = new Object();
									map.code = etlcode;
									map.name = etlname;
									
									//查重
									var chackEtlTable = Ext.lt.RCP.asynserver("framework_etlservice", "chackEtlTable", etlcode);
									if(chackEtlTable){
										Ext.Msg.alert('提示','该标识ID已经存在！'); 
										return;
									}
									
									Ext.lt.template.mask('数据保存中,请稍候...','x-mask-loading');
									Ext.lt.RCP.server("framework_etlservice", "addEtlTable", map, function (response) {
							    		 if(response){
							    		 
							    		 	var templateMenuRecord = Ext.data.Record.create(etlTableFields);
											Ext.getCmp("etlIndexGridPanelId").getStore().add([new  templateMenuRecord(map)]);
											
							    		 	newEtlTableWin.close();
							    		 	Ext.Msg.alert('提示','保存成功！');
							    		 	Ext.lt.template.unmask();
							    		 }else{
							    		 	newEtlTableWin.close();
							    		 	Ext.Msg.alert('提示','保存失败！');
							    		 	Ext.lt.template.unmask();
							    		 }
							    		 
									});  
									
									
								}
							}, 
						    {
								xtype : 'button',
								text : '取消',
								handler : function() {
									newEtlTableWin.close();
								}
							}
						]
				});
			
			var newEtlTableWin = new Ext.Window({
						id : 'newEtlTableWinId',
						width : 400,
						//height : 400,
						title : '添加对照关系',
						modal : true,
						items : newEtlTablePanel
			})
			newEtlTableWin.show();
	}
	
	/**
	*修改对照关系
	*/
	function updateEtlTable(updatemap){
		var updateEtlTablePanel = new Ext.form.FormPanel({
		
					id : 'updateEtlTablePanelId',
					layout : 'form',
					height : 100,
					labelWidth : 60,
					buttonAlign : 'center',
					region : 'center',
					autoScroll:true,
					bodyStyle:'padding-top:5px',
					border : false,
					frame:false,
					items : [
							{
								xtype : 'textfield',
								fieldLabel : '标识ID',
								name : 'etlcode',
								id : 'etlcode',
								width:300,
								disabled:true,
								anchor : '95%',
								value:updatemap.get("code")
							},
							{
								xtype : 'textfield',
								fieldLabel : '标识名称',
								allowBlank : false,
								name : 'etlname',
								id : 'etlname',
								allowBlank : false,
								blankText:"不允许为空！",
								maxLength : 128,
							  	maxLengthText : ' 最大128个字符！',
							  	regex : /^[\u4e00-\u9fa5a-zA-Z0-9_]+$/,
								regexText : '只能输入汉字、字母、数字和下划线！',
								width:300,
								anchor : '95%',
								value:updatemap.get("name")
							}
							],
					buttons : [
							{
								xtype : 'button',
								text : '确定',
								handler : function() {
									var etlcode = Ext.getCmp("etlcode").getValue().trim();
									if(etlcode == null || etlcode == ""){
										Ext.Msg.alert('提示','标识ID为必填项！'); 
										return;
									}else if(etlcode.length > 64){
										Ext.Msg.alert('提示','标识ID最大64个字符！'); 
										return;
									}else if(!Ext.getCmp("etlcode").isValid()){
										Ext.Msg.alert('提示','只含有数字、字母、下划线不能以下划线开头和结尾！'); 
										return;
									}
									
									var etlname = Ext.getCmp("etlname").getValue().trim();
									if(etlname == null || etlname == ""){
										Ext.Msg.alert('提示','标识名称为必填项！'); 
										return;
									}else if(etlname.length > 128){
										Ext.Msg.alert('提示','标识名称最大128个字符！'); 
										return;
									}else if(!Ext.getCmp("etlname").isValid()){
										Ext.Msg.alert('提示','只能输入汉字、字母、数字和下划线！'); 
										return;
									}
									
									var map = new Object();
									map.code = etlcode;
									map.name = etlname;
									
									Ext.lt.template.mask('数据保存中,请稍候...','x-mask-loading');
									Ext.lt.RCP.server("framework_etlservice", "updateEtlTable", map, function (response) {
							    		 if(response){
							    		 	var record = Ext.getCmp("etlIndexGridPanelId").getSelectionModel().selections.itemAt(0);
											record.set("code",map.code);
											record.set("name",map.name);
											record.commit();
											
							    		 	updateEtlTableWin.close();
							    		 	Ext.Msg.alert('提示','保存成功！');
							    		 	Ext.lt.template.unmask();
							    		 }else{
							    		 	updateEtlTableWin.close();
							    		 	Ext.Msg.alert('提示','保存失败！');
							    		 	Ext.lt.template.unmask();
							    		 }
							    		 
									});  
									
									
								}
							}, 
						    {
								xtype : 'button',
								text : '取消',
								handler : function() {
									updateEtlTableWin.close();
								}
							}
						]
				});
			
			var updateEtlTableWin = new Ext.Window({
						id : 'updateEtlTableWinId',
						width : 400,
						//height : 400,
						title : '添加对照关系',
						modal : true,
						items : updateEtlTablePanel
			})
			updateEtlTableWin.show();
	}
	
	
	
   /**
	* 对照关系详情
	*/
	//定义TextField控件
	
			var fromcodeTextBox = new Ext.form.TextField({
			    fieldLabel: '文本框名称',
			    width: 100,
			    id:'fromcodeTextBoxId',
			    name: 'fromcodeTextBoxId'
			});
			
			var tocodeTextBox = new Ext.form.TextField({
			    fieldLabel: '文本框名称',
			    width: 100,
			    id:'tocodeTextBoxId',
			    name: 'tocodeTextBoxId'
			});
			
			
			
			var etlInfoFields = [{
				name:"code"
			},{
				name:"name"
			},{
				name:"fromcode"
			},{
				name:"tocode"
			},{
				name:"filedname"
			},{
				name:"elrule"
			},{
				name:"remark"
			}];
			
			var etlInfostore = new Ext.data.Store({
				pageSize:20,
				reader:new Ext.data.JsonReader({
					totalProperty:'total',
					root:'rows',
					fields:etlInfoFields
				})
			});
			
			var etlInfoColumns =  new Ext.grid.ColumnModel([
				{header:"标识ID", width:10, sortable:true,menuDisabled:true, locked:false, dataIndex:"code"}, 
				{header:"标识名称", width:10, sortable:true,menuDisabled:true, locked:false, dataIndex:"name"}, 
				{header:"待转换编码", width:10, sortable:true,menuDisabled:true, locked:false, dataIndex:"fromcode"}, 
				{header:"转换后编码", width:10, sortable:true,menuDisabled:true, locked:false, dataIndex:"tocode"},
				{header:"字段名称", width:10, sortable:true,menuDisabled:true, locked:false, dataIndex:"filedname"},
				{header:"el表达式", width:10, sortable:true,menuDisabled:true, locked:false, dataIndex:"elrule"},
				{header:"备注", width:10, sortable:true,menuDisabled:true, locked:false, dataIndex:"remark"},
				{header:"修改", width:2, sortable:false,menuDisabled:true, locked:false, align : "center", dataIndex:"code",
					renderer:function(value) {
				 		return "<a href='#' ><img src='../images/bann_ico/edit.gif' width='15' height='16'  align='absmiddle' /></a>";
				}},
				{header:"删除", width:2, sortable:false,menuDisabled:true, locked:false, align : "center", dataIndex:"code",
					renderer:function(value) {
				 		return "<a href='#' ><img src='../images/bann_ico/del.gif' width='15' height='16'  align='absmiddle' /></a>";
				}}
				]);
			btoolbar=new Ext.PagingToolbar({
							id : 'bookGrid-paging-toolbar3',
							pageSize : 20,  // 一页显示25行
							store : etlInfostore,//findlogforuser(reportid,new Date(starttime.getValue()).format("yyyy/MM/dd 00:00:00"),new Date(endtime.getValue()).format("yyyy/MM/dd 23:59:59")),  // 前面定义的store
							displayInfo : true, // 是否显示总体信息
							displayMsg: '显示第 {0} 条到 {1} 条记录，共 {2} 条',   
						    emptyMsg: '没有对照关系',
						    doLoad:function(_start){
								pageLoad(etlcodeids,fromcodeTextBox.getValue(),tocodeTextBox.getValue(),_start);
								return _start;
							}
							
			});
	
	
	var etlInfoGridPanel = new Ext.grid.GridPanel({
				id:"etlInfoGridPanelid",
				title: "对照关系详情",
				border:false,
		        store: etlInfostore,
		        region:'center',
		        viewConfig: {forceFit:true},  
		        cm: etlInfoColumns,
        		stripeRows: true,
				tbar : [
						{
							text:"返回", 
							pressed:true,
							handler:function(){
								elementconfig.layout.setActiveItem(0); 
								}
						},
						'-',
						{
							text:"手动新增",
							pressed:true,
							handler:function(){
								addManualConfig(etlcodeids,etlnameids);
							}
						},
						'-',
						{
							text:"批量新增",
							pressed:true,
							handler:function(){
								dataSourseConfig(etlcodeids,etlnameids);
							}
						},
						'-',
						{
							xtype : 'label',
							text : '待转换编码：'
						},
						fromcodeTextBox,
						'-',
						{
							xtype : 'label',
							text : '转换后编码：'
						},
						tocodeTextBox,
						'-',
						{
							text:"查询",
							pressed:true,
							handler:function(){
								pageLoad(etlcodeids,fromcodeTextBox.getValue(),tocodeTextBox.getValue());
							}
						}
					
					],
					listeners:{
						cellclick : function(grid,rowIndex,columnIndex,e) {
						var rec = grid.getStore().getAt(rowIndex);
							if(columnIndex==7){
								var updatemap = grid.getStore().getAt(rowIndex);
								updateManualConfig(updatemap);
							}else if(columnIndex == 8){
								Ext.MessageBox.confirm('提示','确认删除该配置？',function(btn) {
									if(btn=='yes'){
										var code = grid.getStore().getAt(rowIndex).get('code');
										var fromcode = grid.getStore().getAt(rowIndex).get('fromcode');
										 
										Ext.lt.RCP.server("framework_etlservice", "delEtlInfo",[code,fromcode] ,function (resp) {
											if(resp){
												grid.getStore().remove(rec);
												Ext.Msg.alert('提示','删除配置成功！');
											}else{
												Ext.Msg.alert('提示','删除配置失败！');
											}
										}); 
									}
								});
							}
						}
					},
					bbar : btoolbar
			})
	
		
		
			
	/**
	*手动新增
	*/
	
	function addManualConfig(etlcodeids,etlnameids){
		var addManualPanel = new Ext.form.FormPanel({
		
					id : 'addManualPanelId',
					layout : 'form',
					height : 500,
					labelWidth : 70,
					buttonAlign : 'center',
					region : 'center',
					bodyStyle:'padding-top:5px',
					border : false,
					frame:false,
					items : [{
								xtype : 'textfield',
								fieldLabel : '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;标识ID',
								name : 'code',
								id : 'code',
								width:300,
								disabled:true,
								anchor : '95%',
								value:etlcodeids
							},{
								xtype : 'textfield',
								fieldLabel : '&nbsp;&nbsp;&nbsp;标识名称',
								name : 'name',
								id : 'name',
								width:300,
								disabled:true,
								anchor : '95%',
								value:etlnameids
							},{
								xtype : 'textfield',
								fieldLabel : '&nbsp;&nbsp;&nbsp;字段名称',
								allowBlank : false,
								name : 'filedname',
								id : 'filedname',
								width:300,
								allowBlank : false,
								blankText:"不允许为空！",
								maxLength : 128,
							  	maxLengthText : ' 最大128个字符！',
							  	regex : /^(?!_)(?!.*?_$)[a-zA-Z0-9_]+$/,
								regexText : '只能输入字母、数字和下划线不能以下划线开头和结尾！',
								anchor : '95%'
							}, {
								xtype : 'textfield',
								fieldLabel : '待转换编码',
								name : 'fromcode',
								id : 'fromcode',
								width:300,
								allowBlank : false,
								blankText:"不允许为空！",
								maxLength : 128,
							  	maxLengthText : ' 最大128个字符！',
							  	regex : /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
								regexText : '只能输入汉字、字母、数字和下划线不能以下划线开头和结尾！',
								anchor : '95%'
								
							}, {
								xtype : 'textfield',
								fieldLabel : '转换后编码',
								allowBlank : false,
								name : 'tocode',
								id : 'tocode',
								width:300,
								allowBlank : false,
								blankText:"不允许为空！",
								maxLength : 128,
							  	maxLengthText : ' 最大128个字符！',
							  	regex : /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
								regexText : '只能输入汉字、字母、数字和下划线不能以下划线开头和结尾！',
								anchor : '95%'
								
							},{
								xtype : 'textarea',
								id:"elTextArea",
								fieldLabel : '&nbsp;&nbsp;&nbsp;&nbsp;el表达式',
								name : 'elrule',
								id : 'elrule',
								height : 150,
								width:100,
								anchor : '95%',
								maxLength : 256,
							  	maxLengthText : ' 最大256个字符！',
								emptyText:"请输入el表达式"

							},{
								xtype : 'textarea',
								id:"remarkTextArea",
								fieldLabel : '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;备注',
								name : 'remark',
								id : 'remark',
								height : 150,
								width:100,
								maxLength : 128,
							  	maxLengthText : ' 最大128个字符！',
								anchor : '95%'

							}
							],
					buttons : [{
								xtype : 'button',
								text : '连续增加',
								handler : function() {
									
							    		 	var code = Ext.getCmp("code").getValue().trim();
							    		 	var name = Ext.getCmp("name").getValue().trim();
							    		 	
							    		 	var fromcode = Ext.getCmp("fromcode").getValue().trim();
							    		 	if(fromcode == null || fromcode == ""){
							    		 		Ext.Msg.alert('提示','待转换编码为必填项！'); 
												return;
							    		 	}else if(fromcode.length > 128){
												Ext.Msg.alert('提示','待转换编码最大128个字符！'); 
												return;
											}else if(!Ext.getCmp("fromcode").isValid()){
												Ext.Msg.alert('提示','待转换编只能输入汉字、字母、数字和下划线不能以下划线开头和结尾！'); 
												return;
											}
							    		 	
							    		 	var tocode = Ext.getCmp("tocode").getValue().trim();
							    		 	if(tocode == null || tocode == ""){
							    		 		Ext.Msg.alert('提示','转换后编码为必填项！'); 
												return;
							    		 	}else if(tocode.length > 128){
												Ext.Msg.alert('提示','转换后编码最大128个字符！'); 
												return;
											}else if(!Ext.getCmp("tocode").isValid()){
												Ext.Msg.alert('提示','转换后编码只能输入汉字、字母、数字和下划线不能以下划线开头和结尾！'); 
												return;
											}
							    		 	var filedname = Ext.getCmp("filedname").getValue().trim().toUpperCase();
							    		 	if(filedname == null || filedname == ""){
												Ext.Msg.alert('提示','字段名称为必填项！'); 
												return;
											}else if(filedname.length > 128){
												Ext.Msg.alert('提示','字段名称最大128个字符！'); 
												return;
											}else if(!Ext.getCmp("filedname").isValid()){
												Ext.Msg.alert('提示','字段名称只能输入字母、数字和下划线不能以下划线开头和结尾！'); 
												return;
											}
							    		 	
							    		 	var elrule = Ext.getCmp("elrule").getValue().trim();
							    		 	if(elrule.length > 256){
												Ext.Msg.alert('提示','el表达式最大256个字符！'); 
												return;
											}
							    		 	var remark = Ext.getCmp("remark").getValue().trim();
							    		 	if(remark.length > 128){
												Ext.Msg.alert('提示','备注最大128个字符！'); 
												return;
											}
											
											var map = new Object();
											map.code = code;
											map.name = name;
											map.fromcode = fromcode;
											map.tocode = tocode;
											map.filedname = filedname;
											map.elrule = elrule;
											map.remark = remark;
										
										//查重
										var chackEtlInfo = Ext.lt.RCP.asynserver("framework_etlservice", "chackEtlInfo", map);
										if(chackEtlInfo){
											Ext.Msg.alert('提示','该记录已经存在！'); 
											return;
										}
							    		 	
							    		 	
							    		 Ext.lt.template.mask('数据保存中,请稍候...','x-mask-loading');
										 Ext.lt.RCP.server("framework_etlservice", "addEtlInfo", map, function (response) {
							    		 if(response){
							    			pageLoad(etlcodeids,fromcodeTextBox.getValue(),tocodeTextBox.getValue());
											Ext.getCmp("fromcode").reset();
											Ext.getCmp("elrule").reset();
											Ext.getCmp("remark").reset();
							    		 	Ext.Msg.alert('提示','保存成功！');
							    		 	Ext.lt.template.unmask();
							    		 }else{
							    		 	addManualWin.close();
							    		 	Ext.Msg.alert('提示','保存失败！');
							    		 	Ext.lt.template.unmask();
							    		 }
							    		 
									});  
									
									
								}
							   },{
								xtype : 'button',
								text : '确定',
								handler : function() {
									var code = Ext.getCmp("code").getValue().trim();
					    		 	var name = Ext.getCmp("name").getValue().trim();
					    		 	
					    		 	var fromcode = Ext.getCmp("fromcode").getValue().trim();
					    		 	if(fromcode == null || fromcode == ""){
					    		 		Ext.Msg.alert('提示','待转换编码为必填项！'); 
										return;
					    		 	}else if(fromcode.length > 128){
										Ext.Msg.alert('提示','待转换编码最大128个字符！'); 
										return;
									}else if(!Ext.getCmp("fromcode").isValid()){
										Ext.Msg.alert('提示','待转换编只能输入汉字、字母、数字和下划线不能以下划线开头和结尾！'); 
										return;
									}
					    		 	
					    		 	var tocode = Ext.getCmp("tocode").getValue().trim();
					    		 	if(tocode == null || tocode == ""){
					    		 		Ext.Msg.alert('提示','转换后编码为必填项！'); 
										return;
					    		 	}else if(tocode.length > 128){
										Ext.Msg.alert('提示','转换后编码最大128个字符！'); 
										return;
									}else if(!Ext.getCmp("tocode").isValid()){
										Ext.Msg.alert('提示','转换后编码只能输入汉字、字母、数字和下划线不能以下划线开头和结尾！'); 
										return;
									}
					    		 	 
					    		 	var filedname = Ext.getCmp("filedname").getValue().trim().toUpperCase();
					    		 	if(filedname == null || filedname == ""){
										Ext.Msg.alert('提示','字段名称为必填项！'); 
										return;
									}else if(filedname.length > 128){
										Ext.Msg.alert('提示','字段名称最大128个字符！'); 
										return;
									}else if(!Ext.getCmp("filedname").isValid()){
										Ext.Msg.alert('提示','字段名称只能输入字母、数字和下划线不能以下划线开头和结尾！'); 
										return;
									}
					    		 	
					    		 	var elrule = Ext.getCmp("elrule").getValue().trim();
					    		 	if(elrule.length > 256){
										Ext.Msg.alert('提示','el表达式最大256个字符！'); 
										return;
									}
					    		 	var remark = Ext.getCmp("remark").getValue().trim();
					    		 	if(remark.length > 128){
										Ext.Msg.alert('提示','备注最大128个字符！'); 
										return;
									}
											
											var map = new Object();
											map.code = code;
											map.name = name;
											map.fromcode = fromcode;
											map.tocode = tocode;
											map.filedname = filedname;
											map.elrule = elrule;
											map.remark = remark;
									//查重
										var chackEtlInfo = Ext.lt.RCP.asynserver("framework_etlservice", "chackEtlInfo", map);
										if(chackEtlInfo){
											Ext.Msg.alert('提示','该记录已经存在！'); 
											return;
										}
									
									Ext.lt.template.mask('数据保存中,请稍候...','x-mask-loading');
									Ext.lt.RCP.server("framework_etlservice", "addEtlInfo", map, function (response) {
							    		 if(response){
							    		 
							    			pageLoad(etlcodeids,fromcodeTextBox.getValue(),tocodeTextBox.getValue());
											
							    		 	addManualWin.close();
							    		 	Ext.Msg.alert('提示','保存成功！');
							    		 	Ext.lt.template.unmask();
							    		 }else{
							    		 	addManualWin.close();
							    		 	Ext.Msg.alert('提示','保存失败！');
							    		 	Ext.lt.template.unmask();
							    		 }
							    		 
									});  
									
									
								}
							   }, {
								xtype : 'button',
								text : '取消',
								handler : function() {
									addManualWin.close();
								}
							  }]
				});
			
			var addManualWin = new Ext.Window({
						id : 'addManualWinId',
						width : 400,
						//height : 400,
						title : '添加对照关系详细信息',
						modal : true,
						items : addManualPanel
			})
			addManualWin.show();
			
			
	}
	
	/**
	*修改一个对照
	*/
	
	function updateManualConfig(updatemap){
		var updateManualPanel = new Ext.form.FormPanel({
		
					id : 'updateManualPanelId',
					layout : 'form',
					height : 500,
					labelWidth : 70,
					buttonAlign : 'center',
					region : 'center',
					bodyStyle:'padding-top:5px',
					border : false,
					frame:false,
					items : [{
								xtype : 'textfield',
								fieldLabel : '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;标识ID',
								name : 'code',
								id : 'code',
								width:300,
								disabled:true,
								anchor : '95%',
								value:updatemap.get('code')
							},{
								xtype : 'textfield',
								fieldLabel : '&nbsp;&nbsp;&nbsp;标识名称',
								name : 'name',
								id : 'name',
								width:300,
								disabled:true,
								anchor : '95%',
								value:updatemap.get('name')
							},{
								xtype : 'textfield',
								fieldLabel : '&nbsp;&nbsp;&nbsp;字段名称',
								allowBlank : false,
								name : 'filedname',
								id : 'filedname',
								width:300,
								allowBlank : false,
								blankText:"不允许为空！",
								maxLength : 128,
							  	maxLengthText : ' 最大128个字符！',
							  	regex : /^(?!_)(?!.*?_$)[a-zA-Z0-9_]+$/,
								regexText : '只能输入字母、数字和下划线不能以下划线开头和结尾！',
								anchor : '95%',
								value:updatemap.get('filedname')
							}, {
								xtype : 'textfield',
								fieldLabel : '待转换编码',
								name : 'fromcode',
								id : 'fromcode',
								width:300,
								allowBlank : false,
								blankText:"不允许为空！",
								maxLength : 128,
							  	maxLengthText : ' 最大128个字符！',
							  	regex : /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
								regexText : '只能输入汉字、字母、数字和下划线不能以下划线开头和结尾！',
								anchor : '95%',
								value:updatemap.get('fromcode')
								
							}, {
								xtype : 'textfield',
								fieldLabel : '转换后编码',
								allowBlank : false,
								name : 'tocode',
								id : 'tocode',
								width:300,
								allowBlank : false,
								blankText:"不允许为空！",
								maxLength : 128,
							  	maxLengthText : ' 最大128个字符！',
							  	regex : /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
								regexText : '只能输入汉字、字母、数字和下划线不能以下划线开头和结尾！',
								anchor : '95%',
								value:updatemap.get('tocode')
								
							},{
								xtype : 'textarea',
								id:"elTextArea",
								fieldLabel : '&nbsp;&nbsp;&nbsp;&nbsp;el表达式',
								name : 'elrule',
								id : 'elrule',
								height : 150,
								width:100,
								anchor : '95%',
								maxLength : 256,
							  	maxLengthText : ' 最大256个字符！',
								emptyText:"请输入el表达式",
								value:updatemap.get('elrule')

							},{
								xtype : 'textarea',
								id:"remarkTextArea",
								fieldLabel : '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;备注',
								name : 'remark',
								id : 'remark',
								height : 150,
								width:100,
								maxLength : 128,
							  	maxLengthText : ' 最大128个字符！',
								anchor : '95%',
								value:updatemap.get('remark')

							}
							],
					buttons : [{
								xtype : 'button',
								text : '确定',
								handler : function() {
									var code = Ext.getCmp("code").getValue().trim();
					    		 	var name = Ext.getCmp("name").getValue().trim();
					    		 	
					    		 	var fromcode = Ext.getCmp("fromcode").getValue().trim();
					    		 	if(fromcode == null || fromcode == ""){
					    		 		Ext.Msg.alert('提示','待转换编码为必填项！'); 
										return;
					    		 	}else if(fromcode.length > 128){
										Ext.Msg.alert('提示','待转换编码最大128个字符！'); 
										return;
									}else if(!Ext.getCmp("fromcode").isValid()){
										Ext.Msg.alert('提示','待转换编只能输入汉字、字母、数字和下划线不能以下划线开头和结尾！'); 
										return;
									}
					    		 	
					    		 	var tocode = Ext.getCmp("tocode").getValue().trim();
					    		 	if(tocode == null || tocode == ""){
					    		 		Ext.Msg.alert('提示','转换后编码为必填项！'); 
										return;
					    		 	}else if(tocode.length > 128){
										Ext.Msg.alert('提示','转换后编码最大128个字符！'); 
										return;
									}else if(!Ext.getCmp("tocode").isValid()){
										Ext.Msg.alert('提示','转换后编码只能输入汉字、字母、数字和下划线不能以下划线开头和结尾！'); 
										return;
									}
					    		 	 
					    		 	var filedname = Ext.getCmp("filedname").getValue().trim().toUpperCase();
					    		 	if(filedname == null || filedname == ""){
										Ext.Msg.alert('提示','字段名称为必填项！'); 
										return;
									}else if(filedname.length > 128){
										Ext.Msg.alert('提示','字段名称最大128个字符！'); 
										return;
									}else if(!Ext.getCmp("filedname").isValid()){
										Ext.Msg.alert('提示','字段名称只能输入字母、数字和下划线不能以下划线开头和结尾！'); 
										return;
									}
					    		 	
					    		 	var elrule = Ext.getCmp("elrule").getValue().trim();
					    		 	if(elrule.length > 256){
										Ext.Msg.alert('提示','el表达式最大256个字符！'); 
										return;
									}
					    		 	var remark = Ext.getCmp("remark").getValue().trim();
					    		 	if(remark.length > 128){
										Ext.Msg.alert('提示','备注最大128个字符！'); 
										return;
									}
											
											var map = new Object();
											map.code = code;
											map.name = name;
											map.fromcode = fromcode;
											map.oldfromcode = updatemap.get('fromcode');
											map.oldfiledname = updatemap.get('filedname');
											map.tocode = tocode;
											map.filedname = filedname;
											map.elrule = elrule;
											map.remark = remark;
											//查重
											if(fromcode != updatemap.get('fromcode') || filedname != updatemap.get('filedname'))
											var chackEtlInfo = Ext.lt.RCP.asynserver("framework_etlservice", "chackEtlInfo", map);
											if(chackEtlInfo){
												Ext.Msg.alert('提示','该记录已经存在！'); 
												return;
											}		
									Ext.lt.template.mask('数据保存中,请稍候...','x-mask-loading');
									Ext.lt.RCP.server("framework_etlservice", "updateEtlInfo", map, function (response) {
							    		 if(response){
							    		 
							    		 	var record = Ext.getCmp("etlInfoGridPanelid").getSelectionModel().selections.items[0];
											record.set("code",map.code);
											record.set("name",map.name);
											record.set("fromcode",map.fromcode);
											record.set("filedname",map.filedname);
											record.set("tocode",map.tocode);
											record.set("elrule",map.elrule);
											record.set("remark",map.remark);
											record.commit();
											
							    		 	updateManualWin.close();
							    		 	Ext.Msg.alert('提示','保存成功！');
							    		 	Ext.lt.template.unmask();
							    		 }else{
							    		 	updateManualWin.close();
							    		 	Ext.Msg.alert('提示','保存失败！');
							    		 	Ext.lt.template.unmask();
							    		 }
							    		 
									});  
									
									
								}
							   }, {
								xtype : 'button',
								text : '取消',
								handler : function() {
									updateManualWin.close();
								}
							  }]
				});
			
			var updateManualWin = new Ext.Window({
						id : 'updateManualWinId',
						width : 400,
						//height : 400,
						title : '修改对照关系详细信息',
						modal : true,
						items : updateManualPanel
			})
			updateManualWin.show();
			
			
	}
	
	//批量新增
	function dataSourseConfig(etlcodeidss,etlnameidss){
	/*
 	 *    定义combo组件及数据
     */    
 			var datasourseStore = new Ext.data.JsonStore({
				fields : [
						{name:"text",mapping:"text"},
						{name:"value",mapping:"value"}],
				data : Ext.lt.RCP.asynserver('framework_etlservice','findAllDataTable')
				});
			
			var columnStore = new Ext.data.SimpleStore({
				fields : [{name:"COLUMNNAME",mapping:"COLUMNNAME"}]
			});
			
			var etlStore = new Ext.data.SimpleStore({
				fields : [{name:"etlname",mapping:"etlname"},
							{name:"etlid",mapping:"etlid"}],
				data: [
						{etlname:'待转换编码',etlid:'1'},{etlname:'转换后编码',etlid:'2'}
				      ]
			});
			var datasourseCb = new Ext.form.ComboBox({
				fieldLabel : '&nbsp;&nbsp;&nbsp;来源表',
				width : 300,
				listWidth:300,
				store : datasourseStore,
				displayField:'text',
				valueField : "value", //value
				typeAhead: true,
			  	mode: 'local',
			  	triggerAction: 'all',
				name: 'region',
			  	selectOnFocus:true,
				anchor:'95%',
				allowBlank : false,
	 			blankText:"不允许为空！",
	 			listeners:{
					'change':function(combo,newvalue,oldvalue){
					Ext.lt.RCP.server('framework_etlservice', 'findAllColumn', combo.getValue(),
						function(resp) {
							if(resp.length==0||resp==null){
								showInfoMessage("提示信息","列信息为空!");
								return;
							}
						columnStore.loadData(resp);
													})
					}}
			});
			
			var columnCb = new Ext.form.ComboBox({
				fieldLabel : '字段名称',
				width : 300,
				listWidth:300,
				store : columnStore,
				displayField:'COLUMNNAME',
				typeAhead: true,
			  	mode: 'local',
			  	triggerAction: 'all',
				name: 'region',
			  	selectOnFocus:true,
				anchor:'95%',
				allowBlank : false,
	 			blankText:"不允许为空！"
			});
			
			var etlCb = new Ext.form.ComboBox({
				fieldLabel : '转化模式',
				width : 300,
				listWidth:300,
				store : etlStore,
				displayField:'etlname',
				valueField : "etlid", //value
				typeAhead: true,
			  	mode: 'local',
			  	triggerAction: 'all',
				name: 'region',
			  	selectOnFocus:true,
				anchor:'95%',
				allowBlank : false,
	 			blankText:"不允许为空！"
			});
			
			var dataSoursePanel = new Ext.form.FormPanel({
		
					id : 'dataSoursePanelId',
					layout : 'form',
					height : 150,
					labelWidth : 60,
					buttonAlign : 'center',
					region : 'center',
					bodyStyle:'padding-top:5px',
					border : false,
					frame:false,
					items : [datasourseCb,columnCb,etlCb],
					buttons : [{
								xtype : 'button',
								text : '确定',
								handler : function() {
									var datasourseCbdata=datasourseCb.getValue();
									var columnCbdata=columnCb.getValue();
									var etlCbdata=etlCb.getValue();
									
									if(datasourseCbdata==null||datasourseCbdata==""){
										showInfoMessage("提示信息","请选择来源表！");
										return;
									}else if(columnCbdata==null||columnCbdata==""){
										showInfoMessage("提示信息","请选择字段名称！");
										return;
									}else if(etlCbdata==null||etlCbdata==""){
										showInfoMessage("提示信息","请选择转换类型！");
										return;
									}
									
									var map = new Object();
									map.code = etlcodeidss;
									map.name = etlnameidss;
									map.etlid = etlCb.getValue();
									map.tablecode = datasourseCb.getValue();
									map.tablecolumn = columnCb.getValue();
									
									
									//查重
									var chackall = Ext.lt.RCP.asynserver("framework_etlservice", "chackAll", map); 
										if(chackall.length==0){
										Ext.lt.template.mask('数据保存中,请稍候...','x-mask-loading');
													Ext.lt.RCP.server("framework_etlservice", "saveEtlInfo", map, function (response) {
											    		 if(response>0){
											    		 	pageLoad(etlcodeidss,fromcodeTextBox.getValue(),tocodeTextBox.getValue());
											    		 	dataSourseWin.close();
											    		 	Ext.Msg.alert('提示','保存成功！');
											    		 	Ext.lt.template.unmask();
											    		 }else if(response == 0){
											    		 	dataSourseWin.close();
											    		 	Ext.Msg.alert('提示','字段内容为空，保存失败！');
											    		 	Ext.lt.template.unmask();
											    		 }else if(response == -1){
											    			 dataSourseWin.close();
												    		 Ext.Msg.alert('提示','字段内容不能大于256字符，保存失败！');
												    		 Ext.lt.template.unmask();
											    		 }
											    		 
													});
											
										}else{
											 Ext.MessageBox.show({
											    title:"提示信息：",
											    msg:"对照表存在重复数据，请处理重复数据！",
												width:400,
												closable:false,
												buttons:{ok:'覆盖',yes:'跳过',cancel:'取消'},
												fn:function(e){
												if(e=='ok'){ 
													Ext.lt.RCP.asynserver("framework_etlservice", "recoverEtlInfo", map);
													Ext.lt.template.mask('数据保存中,请稍候...','x-mask-loading');
													Ext.lt.RCP.server("framework_etlservice", "saveEtlInfo", map, function (response) {
											    		 	pageLoad(etlcodeidss,'','');
											    		 	dataSourseWin.close();
											    		 	Ext.Msg.alert('提示','保存成功'+response+'条记录！');
											    		 	Ext.lt.template.unmask();
													});  
												}
												else if(e=='yes'){
													Ext.lt.template.mask('数据保存中,请稍候...','x-mask-loading');
													Ext.lt.RCP.server("framework_etlservice", "jumpEtlInfo", map, function (response) {
											    		 pageLoad(etlcodeidss,'','');
											    		 	dataSourseWin.close();
											    		 	Ext.Msg.alert('提示','保存成功'+response+'条记录！');
											    		 	Ext.lt.template.unmask();
											    		 
													});
												}
												else if(e=='cancel'){dataSourseWin.close();}
												}
											});
										}
									
								}
							   }, {
								xtype : 'button',
								text : '取消',
								handler : function() {
									dataSourseWin.close();
								}
							  }]
				});
			//内置表配置信息窗口
			var dataSourseWin = new Ext.Window({
						id : 'dataSourseWinId',
						width : 400,
						//height : 400,
						title : '批量新增',
						modal : true,
						items : dataSoursePanel
			})
			dataSourseWin.show();
			
	}

	//主panel	
		var elementconfig = new Ext.Panel({  
	    	activeItem:0,
	    	layout:'card',
	    	border:false, 
	    	enableTabScroll:true,
	    	region:'center',
	    	items:[etlIndexGridPanel,etlInfoGridPanel]
	    });
		function afterShow(){
	    	try{
	 			Ext.lt.fcas.businessinnertable.elementconfig.layout.setActiveItem(0);
	 		}catch(e){}
		}
		elementconfig.on("show",afterShow); 
		
		return elementconfig;
	
	/**
     * 分页查询
     * 
     */
     function pageLoad(code,fromcode,tocode,pagestart){
     	
		if(typeof(pagestart)=='undefined'){
			pagestart = 0;
		}
				
		var json=[{'code':code,'fromcode':fromcode,'tocode':tocode,'start':pagestart,'limit':btoolbar.pageSize}];
		Ext.lt.RCP.server('framework_etlservice','findEtlInfoPage', Ext.encode(json),
			function(resp) {
				if(resp.length>0){
					
					btoolbar.store.loadData(resp[0],false);
					//baseInnerstore.loadData(resp);
					//手动处理页码信息，搞了好久，没找到自动处理的方法
					if(resp[0].rows.length>0){
						btoolbar.cursor=parseInt(resp[0].start);
						
						var allcount=parseInt(resp[0].total);
						var pageIndex;
						if(btoolbar.cursor==0)
							pageIndex=1
						else
							pageIndex=parseInt((btoolbar.cursor-1)/20)+2;
						
						if(pageIndex==1){
							btoolbar.first.setDisabled(true);
							btoolbar.prev.setDisabled(true);
						}else{
							btoolbar.first.setDisabled(false);
							btoolbar.prev.setDisabled(false);
						}
						
						if(allcount-btoolbar.cursor<=20){
							btoolbar.next.setDisabled(true);
							btoolbar.last.setDisabled(true);
						}
						else{
							btoolbar.next.setDisabled(false);
							btoolbar.last.setDisabled(false);
						}
						
						btoolbar.inputItem.value=pageIndex;
						btoolbar.inputItem.focus();
						btoolbar.inputItem.blur();
						btoolbar.displayItem.el.update(" 显示第 "+(btoolbar.cursor+1)+" 条到 "+(allcount-btoolbar.cursor>20?btoolbar.cursor+20:allcount)+" 条记录，共 "+allcount+" 条");
					}
					else{
						btoolbar.first.setDisabled(true);
						btoolbar.prev.setDisabled(true);
						btoolbar.next.setDisabled(true);
						btoolbar.last.setDisabled(true);
						btoolbar.inputItem.value=1;
						btoolbar.inputItem.focus();
						btoolbar.inputItem.blur();
						btoolbar.displayItem.el.update("没有对照关系");
					}
				}
					
		})
	}	
		
		
	/**
     *获取对照关系数据
     * 
     */
	function findEtlTableData(code,name){
		Ext.lt.RCP.server('framework_etlservice','queryEtlTable',[code,name],
			function(resp) {
				etlTableStore
						.loadData(resp);
		});
	}
	
	
     
}