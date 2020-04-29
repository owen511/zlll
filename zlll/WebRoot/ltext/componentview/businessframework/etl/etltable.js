/*
2012-06-27 �ܼ��� ���ձ�����ά��
*/
Ext.lt.console.component.etltable = function (service,config) {
	var etlcodeids;
	var etlnameids;
	var etlTableFields = [{name:"code"},{name:"name"}];
	
	var etlTableStore = new Ext.data.JsonStore({
			fields : etlTableFields,
			load:	findEtlTableData('','')
	});
	
	//����TextField�ؼ�
			var etlcode = new Ext.form.TextField({
			    fieldLabel: '�ı�������',
			    width: 100,
			    id:'etlcodeid',
			    name: 'etlcodeid'
			});
			
			var etlname = new Ext.form.TextField({
			    fieldLabel: '�ı�������',
			    width: 100,
			    id:'etlnameid',
			    name: 'etlnameid'
			});
	
	
	var sm= new Ext.grid.CheckboxSelectionModel({
							checkOnly : false
						});
	var etlIndexTable =  [sm,{
				header : "��ʶID",
				width : 250,
				fixed : true,
				sortable : true,
				hideable : false,
				menuDisabled : true,
				dataIndex : 'code'
			},{
				header : "��ʶ����",
				width : 325,
				fixed : true,
				sortable : true,
				hideable : false,
				menuDisabled : true,
				dataIndex : 'name'
			},{
				header:"��Ϣ����", 
				width:3, 
				sortable:false, 
				menuDisabled : true,
				locked:false, 
				align : "center", 
				dataIndex:"code",
				renderer:function(value) {
				 	return "<a href='#' ><img src='../images/bann_ico/autoset.gif' width='15' height='16'  align='absmiddle' /></a>";
			}},{
				header:"�޸�", 
				width:2, 
				sortable:false,
				menuDisabled:true, 
				locked:false, 
				align : "center", 
				dataIndex:"code",
					renderer:function(value) {
				 		return "<a href='#' ><img src='../images/bann_ico/edit.gif' width='15' height='16'  align='absmiddle' /></a>";
			}},{
				header:"ɾ��", 
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
		title : '���ձ����',
		stripeRows : true,
		viewConfig : {
			forceFit : true
		},
		width : '100%',
		height : 150,
		border : false,
		tbar : [{
					text:"����",
					pressed:true,
					handler:function(){
						newEtlTable();
					}
				},'-',
				{
					xtype : 'label',
					text : '��ʶID��'
				},etlcode,'-',
				{
					xtype : 'label',
					text : '��ʶ���ƣ�'
				},etlname,'-',
				{
					text:"��ѯ",
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
					Ext.MessageBox.confirm('��ʾ','ȷ��ɾ�������ã�',function(btn) {
						if(btn=='yes'){
							Ext.lt.RCP.server("framework_etlservice", "delEtlTable",etlcodeids ,function (resp) {
								if(resp.flag){
									grid.getStore().remove(grid.getStore().getAt(rowIndex));
									Ext.Msg.alert('��ʾ','ɾ�����óɹ���');
								}else{
									if(resp.msg){
										Ext.Msg.alert('��ʾ',resp.msg);
									}else{
										Ext.Msg.alert('��ʾ','ɾ������ʧ�ܣ�');
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
	*�������չ�ϵ
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
								fieldLabel : '��ʶID',
								allowBlank : false,
								name : 'etlcode',
								id : 'etlcode',
								allowBlank : false,
								blankText:"������Ϊ�գ�",
								maxLength : 64,
							  	maxLengthText : ' ���64���ַ���',
							  	regex : /^(?!_)(?!.*?_$)[a-zA-Z0-9_]+$/,
								regexText : 'ֻ�������֡���ĸ���»��߲������»��߿�ͷ�ͽ�β��',
								width:300,
								anchor : '95%'
							},
							{
								xtype : 'textfield',
								fieldLabel : '��ʶ����',
								allowBlank : false,
								name : 'etlname',
								id : 'etlname',
								allowBlank : false,
								blankText:"������Ϊ�գ�",
								maxLength : 128,
							  	maxLengthText : ' ���128���ַ���',
							  	regex : /^[\u4e00-\u9fa5a-zA-Z0-9_]+$/,
								regexText : 'ֻ�����뺺�֡���ĸ�����ֺ��»��ߣ�',
								width:300,
								anchor : '95%'
							}
							],
					buttons : [
							{
								xtype : 'button',
								text : 'ȷ��',
								handler : function() {
									var etlcode = Ext.getCmp("etlcode").getValue().trim();
									if(etlcode == null || etlcode == ""){
										Ext.Msg.alert('��ʾ','��ʶIDΪ�����'); 
										return;
									}else if(etlcode.length > 64){
										Ext.Msg.alert('��ʾ','��ʶID���64���ַ���'); 
										return;
									}else if(!Ext.getCmp("etlcode").isValid()){
										Ext.Msg.alert('��ʾ','ֻ�������֡���ĸ���»��߲������»��߿�ͷ�ͽ�β��'); 
										return;
									}
									
									var etlname = Ext.getCmp("etlname").getValue().trim();
									if(etlname == null || etlname == ""){
										Ext.Msg.alert('��ʾ','��ʶ����Ϊ�����'); 
										return;
									}else if(etlname.length > 128){
										Ext.Msg.alert('��ʾ','��ʶ�������128���ַ���'); 
										return;
									}else if(!Ext.getCmp("etlname").isValid()){
										Ext.Msg.alert('��ʾ','ֻ�����뺺�֡���ĸ�����ֺ��»��ߣ�'); 
										return;
									}
									
									var map = new Object();
									map.code = etlcode;
									map.name = etlname;
									
									//����
									var chackEtlTable = Ext.lt.RCP.asynserver("framework_etlservice", "chackEtlTable", etlcode);
									if(chackEtlTable){
										Ext.Msg.alert('��ʾ','�ñ�ʶID�Ѿ����ڣ�'); 
										return;
									}
									
									Ext.lt.template.mask('���ݱ�����,���Ժ�...','x-mask-loading');
									Ext.lt.RCP.server("framework_etlservice", "addEtlTable", map, function (response) {
							    		 if(response){
							    		 
							    		 	var templateMenuRecord = Ext.data.Record.create(etlTableFields);
											Ext.getCmp("etlIndexGridPanelId").getStore().add([new  templateMenuRecord(map)]);
											
							    		 	newEtlTableWin.close();
							    		 	Ext.Msg.alert('��ʾ','����ɹ���');
							    		 	Ext.lt.template.unmask();
							    		 }else{
							    		 	newEtlTableWin.close();
							    		 	Ext.Msg.alert('��ʾ','����ʧ�ܣ�');
							    		 	Ext.lt.template.unmask();
							    		 }
							    		 
									});  
									
									
								}
							}, 
						    {
								xtype : 'button',
								text : 'ȡ��',
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
						title : '��Ӷ��չ�ϵ',
						modal : true,
						items : newEtlTablePanel
			})
			newEtlTableWin.show();
	}
	
	/**
	*�޸Ķ��չ�ϵ
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
								fieldLabel : '��ʶID',
								name : 'etlcode',
								id : 'etlcode',
								width:300,
								disabled:true,
								anchor : '95%',
								value:updatemap.get("code")
							},
							{
								xtype : 'textfield',
								fieldLabel : '��ʶ����',
								allowBlank : false,
								name : 'etlname',
								id : 'etlname',
								allowBlank : false,
								blankText:"������Ϊ�գ�",
								maxLength : 128,
							  	maxLengthText : ' ���128���ַ���',
							  	regex : /^[\u4e00-\u9fa5a-zA-Z0-9_]+$/,
								regexText : 'ֻ�����뺺�֡���ĸ�����ֺ��»��ߣ�',
								width:300,
								anchor : '95%',
								value:updatemap.get("name")
							}
							],
					buttons : [
							{
								xtype : 'button',
								text : 'ȷ��',
								handler : function() {
									var etlcode = Ext.getCmp("etlcode").getValue().trim();
									if(etlcode == null || etlcode == ""){
										Ext.Msg.alert('��ʾ','��ʶIDΪ�����'); 
										return;
									}else if(etlcode.length > 64){
										Ext.Msg.alert('��ʾ','��ʶID���64���ַ���'); 
										return;
									}else if(!Ext.getCmp("etlcode").isValid()){
										Ext.Msg.alert('��ʾ','ֻ�������֡���ĸ���»��߲������»��߿�ͷ�ͽ�β��'); 
										return;
									}
									
									var etlname = Ext.getCmp("etlname").getValue().trim();
									if(etlname == null || etlname == ""){
										Ext.Msg.alert('��ʾ','��ʶ����Ϊ�����'); 
										return;
									}else if(etlname.length > 128){
										Ext.Msg.alert('��ʾ','��ʶ�������128���ַ���'); 
										return;
									}else if(!Ext.getCmp("etlname").isValid()){
										Ext.Msg.alert('��ʾ','ֻ�����뺺�֡���ĸ�����ֺ��»��ߣ�'); 
										return;
									}
									
									var map = new Object();
									map.code = etlcode;
									map.name = etlname;
									
									Ext.lt.template.mask('���ݱ�����,���Ժ�...','x-mask-loading');
									Ext.lt.RCP.server("framework_etlservice", "updateEtlTable", map, function (response) {
							    		 if(response){
							    		 	var record = Ext.getCmp("etlIndexGridPanelId").getSelectionModel().selections.itemAt(0);
											record.set("code",map.code);
											record.set("name",map.name);
											record.commit();
											
							    		 	updateEtlTableWin.close();
							    		 	Ext.Msg.alert('��ʾ','����ɹ���');
							    		 	Ext.lt.template.unmask();
							    		 }else{
							    		 	updateEtlTableWin.close();
							    		 	Ext.Msg.alert('��ʾ','����ʧ�ܣ�');
							    		 	Ext.lt.template.unmask();
							    		 }
							    		 
									});  
									
									
								}
							}, 
						    {
								xtype : 'button',
								text : 'ȡ��',
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
						title : '��Ӷ��չ�ϵ',
						modal : true,
						items : updateEtlTablePanel
			})
			updateEtlTableWin.show();
	}
	
	
	
   /**
	* ���չ�ϵ����
	*/
	//����TextField�ؼ�
	
			var fromcodeTextBox = new Ext.form.TextField({
			    fieldLabel: '�ı�������',
			    width: 100,
			    id:'fromcodeTextBoxId',
			    name: 'fromcodeTextBoxId'
			});
			
			var tocodeTextBox = new Ext.form.TextField({
			    fieldLabel: '�ı�������',
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
				{header:"��ʶID", width:10, sortable:true,menuDisabled:true, locked:false, dataIndex:"code"}, 
				{header:"��ʶ����", width:10, sortable:true,menuDisabled:true, locked:false, dataIndex:"name"}, 
				{header:"��ת������", width:10, sortable:true,menuDisabled:true, locked:false, dataIndex:"fromcode"}, 
				{header:"ת�������", width:10, sortable:true,menuDisabled:true, locked:false, dataIndex:"tocode"},
				{header:"�ֶ�����", width:10, sortable:true,menuDisabled:true, locked:false, dataIndex:"filedname"},
				{header:"el���ʽ", width:10, sortable:true,menuDisabled:true, locked:false, dataIndex:"elrule"},
				{header:"��ע", width:10, sortable:true,menuDisabled:true, locked:false, dataIndex:"remark"},
				{header:"�޸�", width:2, sortable:false,menuDisabled:true, locked:false, align : "center", dataIndex:"code",
					renderer:function(value) {
				 		return "<a href='#' ><img src='../images/bann_ico/edit.gif' width='15' height='16'  align='absmiddle' /></a>";
				}},
				{header:"ɾ��", width:2, sortable:false,menuDisabled:true, locked:false, align : "center", dataIndex:"code",
					renderer:function(value) {
				 		return "<a href='#' ><img src='../images/bann_ico/del.gif' width='15' height='16'  align='absmiddle' /></a>";
				}}
				]);
			btoolbar=new Ext.PagingToolbar({
							id : 'bookGrid-paging-toolbar3',
							pageSize : 20,  // һҳ��ʾ25��
							store : etlInfostore,//findlogforuser(reportid,new Date(starttime.getValue()).format("yyyy/MM/dd 00:00:00"),new Date(endtime.getValue()).format("yyyy/MM/dd 23:59:59")),  // ǰ�涨���store
							displayInfo : true, // �Ƿ���ʾ������Ϣ
							displayMsg: '��ʾ�� {0} ���� {1} ����¼���� {2} ��',   
						    emptyMsg: 'û�ж��չ�ϵ',
						    doLoad:function(_start){
								pageLoad(etlcodeids,fromcodeTextBox.getValue(),tocodeTextBox.getValue(),_start);
								return _start;
							}
							
			});
	
	
	var etlInfoGridPanel = new Ext.grid.GridPanel({
				id:"etlInfoGridPanelid",
				title: "���չ�ϵ����",
				border:false,
		        store: etlInfostore,
		        region:'center',
		        viewConfig: {forceFit:true},  
		        cm: etlInfoColumns,
        		stripeRows: true,
				tbar : [
						{
							text:"����", 
							pressed:true,
							handler:function(){
								elementconfig.layout.setActiveItem(0); 
								}
						},
						'-',
						{
							text:"�ֶ�����",
							pressed:true,
							handler:function(){
								addManualConfig(etlcodeids,etlnameids);
							}
						},
						'-',
						{
							text:"��������",
							pressed:true,
							handler:function(){
								dataSourseConfig(etlcodeids,etlnameids);
							}
						},
						'-',
						{
							xtype : 'label',
							text : '��ת�����룺'
						},
						fromcodeTextBox,
						'-',
						{
							xtype : 'label',
							text : 'ת������룺'
						},
						tocodeTextBox,
						'-',
						{
							text:"��ѯ",
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
								Ext.MessageBox.confirm('��ʾ','ȷ��ɾ�������ã�',function(btn) {
									if(btn=='yes'){
										var code = grid.getStore().getAt(rowIndex).get('code');
										var fromcode = grid.getStore().getAt(rowIndex).get('fromcode');
										 
										Ext.lt.RCP.server("framework_etlservice", "delEtlInfo",[code,fromcode] ,function (resp) {
											if(resp){
												grid.getStore().remove(rec);
												Ext.Msg.alert('��ʾ','ɾ�����óɹ���');
											}else{
												Ext.Msg.alert('��ʾ','ɾ������ʧ�ܣ�');
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
	*�ֶ�����
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
								fieldLabel : '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;��ʶID',
								name : 'code',
								id : 'code',
								width:300,
								disabled:true,
								anchor : '95%',
								value:etlcodeids
							},{
								xtype : 'textfield',
								fieldLabel : '&nbsp;&nbsp;&nbsp;��ʶ����',
								name : 'name',
								id : 'name',
								width:300,
								disabled:true,
								anchor : '95%',
								value:etlnameids
							},{
								xtype : 'textfield',
								fieldLabel : '&nbsp;&nbsp;&nbsp;�ֶ�����',
								allowBlank : false,
								name : 'filedname',
								id : 'filedname',
								width:300,
								allowBlank : false,
								blankText:"������Ϊ�գ�",
								maxLength : 128,
							  	maxLengthText : ' ���128���ַ���',
							  	regex : /^(?!_)(?!.*?_$)[a-zA-Z0-9_]+$/,
								regexText : 'ֻ��������ĸ�����ֺ��»��߲������»��߿�ͷ�ͽ�β��',
								anchor : '95%'
							}, {
								xtype : 'textfield',
								fieldLabel : '��ת������',
								name : 'fromcode',
								id : 'fromcode',
								width:300,
								allowBlank : false,
								blankText:"������Ϊ�գ�",
								maxLength : 128,
							  	maxLengthText : ' ���128���ַ���',
							  	regex : /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
								regexText : 'ֻ�����뺺�֡���ĸ�����ֺ��»��߲������»��߿�ͷ�ͽ�β��',
								anchor : '95%'
								
							}, {
								xtype : 'textfield',
								fieldLabel : 'ת�������',
								allowBlank : false,
								name : 'tocode',
								id : 'tocode',
								width:300,
								allowBlank : false,
								blankText:"������Ϊ�գ�",
								maxLength : 128,
							  	maxLengthText : ' ���128���ַ���',
							  	regex : /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
								regexText : 'ֻ�����뺺�֡���ĸ�����ֺ��»��߲������»��߿�ͷ�ͽ�β��',
								anchor : '95%'
								
							},{
								xtype : 'textarea',
								id:"elTextArea",
								fieldLabel : '&nbsp;&nbsp;&nbsp;&nbsp;el���ʽ',
								name : 'elrule',
								id : 'elrule',
								height : 150,
								width:100,
								anchor : '95%',
								maxLength : 256,
							  	maxLengthText : ' ���256���ַ���',
								emptyText:"������el���ʽ"

							},{
								xtype : 'textarea',
								id:"remarkTextArea",
								fieldLabel : '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;��ע',
								name : 'remark',
								id : 'remark',
								height : 150,
								width:100,
								maxLength : 128,
							  	maxLengthText : ' ���128���ַ���',
								anchor : '95%'

							}
							],
					buttons : [{
								xtype : 'button',
								text : '��������',
								handler : function() {
									
							    		 	var code = Ext.getCmp("code").getValue().trim();
							    		 	var name = Ext.getCmp("name").getValue().trim();
							    		 	
							    		 	var fromcode = Ext.getCmp("fromcode").getValue().trim();
							    		 	if(fromcode == null || fromcode == ""){
							    		 		Ext.Msg.alert('��ʾ','��ת������Ϊ�����'); 
												return;
							    		 	}else if(fromcode.length > 128){
												Ext.Msg.alert('��ʾ','��ת���������128���ַ���'); 
												return;
											}else if(!Ext.getCmp("fromcode").isValid()){
												Ext.Msg.alert('��ʾ','��ת����ֻ�����뺺�֡���ĸ�����ֺ��»��߲������»��߿�ͷ�ͽ�β��'); 
												return;
											}
							    		 	
							    		 	var tocode = Ext.getCmp("tocode").getValue().trim();
							    		 	if(tocode == null || tocode == ""){
							    		 		Ext.Msg.alert('��ʾ','ת�������Ϊ�����'); 
												return;
							    		 	}else if(tocode.length > 128){
												Ext.Msg.alert('��ʾ','ת����������128���ַ���'); 
												return;
											}else if(!Ext.getCmp("tocode").isValid()){
												Ext.Msg.alert('��ʾ','ת�������ֻ�����뺺�֡���ĸ�����ֺ��»��߲������»��߿�ͷ�ͽ�β��'); 
												return;
											}
							    		 	var filedname = Ext.getCmp("filedname").getValue().trim().toUpperCase();
							    		 	if(filedname == null || filedname == ""){
												Ext.Msg.alert('��ʾ','�ֶ�����Ϊ�����'); 
												return;
											}else if(filedname.length > 128){
												Ext.Msg.alert('��ʾ','�ֶ��������128���ַ���'); 
												return;
											}else if(!Ext.getCmp("filedname").isValid()){
												Ext.Msg.alert('��ʾ','�ֶ�����ֻ��������ĸ�����ֺ��»��߲������»��߿�ͷ�ͽ�β��'); 
												return;
											}
							    		 	
							    		 	var elrule = Ext.getCmp("elrule").getValue().trim();
							    		 	if(elrule.length > 256){
												Ext.Msg.alert('��ʾ','el���ʽ���256���ַ���'); 
												return;
											}
							    		 	var remark = Ext.getCmp("remark").getValue().trim();
							    		 	if(remark.length > 128){
												Ext.Msg.alert('��ʾ','��ע���128���ַ���'); 
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
										
										//����
										var chackEtlInfo = Ext.lt.RCP.asynserver("framework_etlservice", "chackEtlInfo", map);
										if(chackEtlInfo){
											Ext.Msg.alert('��ʾ','�ü�¼�Ѿ����ڣ�'); 
											return;
										}
							    		 	
							    		 	
							    		 Ext.lt.template.mask('���ݱ�����,���Ժ�...','x-mask-loading');
										 Ext.lt.RCP.server("framework_etlservice", "addEtlInfo", map, function (response) {
							    		 if(response){
							    			pageLoad(etlcodeids,fromcodeTextBox.getValue(),tocodeTextBox.getValue());
											Ext.getCmp("fromcode").reset();
											Ext.getCmp("elrule").reset();
											Ext.getCmp("remark").reset();
							    		 	Ext.Msg.alert('��ʾ','����ɹ���');
							    		 	Ext.lt.template.unmask();
							    		 }else{
							    		 	addManualWin.close();
							    		 	Ext.Msg.alert('��ʾ','����ʧ�ܣ�');
							    		 	Ext.lt.template.unmask();
							    		 }
							    		 
									});  
									
									
								}
							   },{
								xtype : 'button',
								text : 'ȷ��',
								handler : function() {
									var code = Ext.getCmp("code").getValue().trim();
					    		 	var name = Ext.getCmp("name").getValue().trim();
					    		 	
					    		 	var fromcode = Ext.getCmp("fromcode").getValue().trim();
					    		 	if(fromcode == null || fromcode == ""){
					    		 		Ext.Msg.alert('��ʾ','��ת������Ϊ�����'); 
										return;
					    		 	}else if(fromcode.length > 128){
										Ext.Msg.alert('��ʾ','��ת���������128���ַ���'); 
										return;
									}else if(!Ext.getCmp("fromcode").isValid()){
										Ext.Msg.alert('��ʾ','��ת����ֻ�����뺺�֡���ĸ�����ֺ��»��߲������»��߿�ͷ�ͽ�β��'); 
										return;
									}
					    		 	
					    		 	var tocode = Ext.getCmp("tocode").getValue().trim();
					    		 	if(tocode == null || tocode == ""){
					    		 		Ext.Msg.alert('��ʾ','ת�������Ϊ�����'); 
										return;
					    		 	}else if(tocode.length > 128){
										Ext.Msg.alert('��ʾ','ת����������128���ַ���'); 
										return;
									}else if(!Ext.getCmp("tocode").isValid()){
										Ext.Msg.alert('��ʾ','ת�������ֻ�����뺺�֡���ĸ�����ֺ��»��߲������»��߿�ͷ�ͽ�β��'); 
										return;
									}
					    		 	 
					    		 	var filedname = Ext.getCmp("filedname").getValue().trim().toUpperCase();
					    		 	if(filedname == null || filedname == ""){
										Ext.Msg.alert('��ʾ','�ֶ�����Ϊ�����'); 
										return;
									}else if(filedname.length > 128){
										Ext.Msg.alert('��ʾ','�ֶ��������128���ַ���'); 
										return;
									}else if(!Ext.getCmp("filedname").isValid()){
										Ext.Msg.alert('��ʾ','�ֶ�����ֻ��������ĸ�����ֺ��»��߲������»��߿�ͷ�ͽ�β��'); 
										return;
									}
					    		 	
					    		 	var elrule = Ext.getCmp("elrule").getValue().trim();
					    		 	if(elrule.length > 256){
										Ext.Msg.alert('��ʾ','el���ʽ���256���ַ���'); 
										return;
									}
					    		 	var remark = Ext.getCmp("remark").getValue().trim();
					    		 	if(remark.length > 128){
										Ext.Msg.alert('��ʾ','��ע���128���ַ���'); 
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
									//����
										var chackEtlInfo = Ext.lt.RCP.asynserver("framework_etlservice", "chackEtlInfo", map);
										if(chackEtlInfo){
											Ext.Msg.alert('��ʾ','�ü�¼�Ѿ����ڣ�'); 
											return;
										}
									
									Ext.lt.template.mask('���ݱ�����,���Ժ�...','x-mask-loading');
									Ext.lt.RCP.server("framework_etlservice", "addEtlInfo", map, function (response) {
							    		 if(response){
							    		 
							    			pageLoad(etlcodeids,fromcodeTextBox.getValue(),tocodeTextBox.getValue());
											
							    		 	addManualWin.close();
							    		 	Ext.Msg.alert('��ʾ','����ɹ���');
							    		 	Ext.lt.template.unmask();
							    		 }else{
							    		 	addManualWin.close();
							    		 	Ext.Msg.alert('��ʾ','����ʧ�ܣ�');
							    		 	Ext.lt.template.unmask();
							    		 }
							    		 
									});  
									
									
								}
							   }, {
								xtype : 'button',
								text : 'ȡ��',
								handler : function() {
									addManualWin.close();
								}
							  }]
				});
			
			var addManualWin = new Ext.Window({
						id : 'addManualWinId',
						width : 400,
						//height : 400,
						title : '��Ӷ��չ�ϵ��ϸ��Ϣ',
						modal : true,
						items : addManualPanel
			})
			addManualWin.show();
			
			
	}
	
	/**
	*�޸�һ������
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
								fieldLabel : '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;��ʶID',
								name : 'code',
								id : 'code',
								width:300,
								disabled:true,
								anchor : '95%',
								value:updatemap.get('code')
							},{
								xtype : 'textfield',
								fieldLabel : '&nbsp;&nbsp;&nbsp;��ʶ����',
								name : 'name',
								id : 'name',
								width:300,
								disabled:true,
								anchor : '95%',
								value:updatemap.get('name')
							},{
								xtype : 'textfield',
								fieldLabel : '&nbsp;&nbsp;&nbsp;�ֶ�����',
								allowBlank : false,
								name : 'filedname',
								id : 'filedname',
								width:300,
								allowBlank : false,
								blankText:"������Ϊ�գ�",
								maxLength : 128,
							  	maxLengthText : ' ���128���ַ���',
							  	regex : /^(?!_)(?!.*?_$)[a-zA-Z0-9_]+$/,
								regexText : 'ֻ��������ĸ�����ֺ��»��߲������»��߿�ͷ�ͽ�β��',
								anchor : '95%',
								value:updatemap.get('filedname')
							}, {
								xtype : 'textfield',
								fieldLabel : '��ת������',
								name : 'fromcode',
								id : 'fromcode',
								width:300,
								allowBlank : false,
								blankText:"������Ϊ�գ�",
								maxLength : 128,
							  	maxLengthText : ' ���128���ַ���',
							  	regex : /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
								regexText : 'ֻ�����뺺�֡���ĸ�����ֺ��»��߲������»��߿�ͷ�ͽ�β��',
								anchor : '95%',
								value:updatemap.get('fromcode')
								
							}, {
								xtype : 'textfield',
								fieldLabel : 'ת�������',
								allowBlank : false,
								name : 'tocode',
								id : 'tocode',
								width:300,
								allowBlank : false,
								blankText:"������Ϊ�գ�",
								maxLength : 128,
							  	maxLengthText : ' ���128���ַ���',
							  	regex : /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
								regexText : 'ֻ�����뺺�֡���ĸ�����ֺ��»��߲������»��߿�ͷ�ͽ�β��',
								anchor : '95%',
								value:updatemap.get('tocode')
								
							},{
								xtype : 'textarea',
								id:"elTextArea",
								fieldLabel : '&nbsp;&nbsp;&nbsp;&nbsp;el���ʽ',
								name : 'elrule',
								id : 'elrule',
								height : 150,
								width:100,
								anchor : '95%',
								maxLength : 256,
							  	maxLengthText : ' ���256���ַ���',
								emptyText:"������el���ʽ",
								value:updatemap.get('elrule')

							},{
								xtype : 'textarea',
								id:"remarkTextArea",
								fieldLabel : '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;��ע',
								name : 'remark',
								id : 'remark',
								height : 150,
								width:100,
								maxLength : 128,
							  	maxLengthText : ' ���128���ַ���',
								anchor : '95%',
								value:updatemap.get('remark')

							}
							],
					buttons : [{
								xtype : 'button',
								text : 'ȷ��',
								handler : function() {
									var code = Ext.getCmp("code").getValue().trim();
					    		 	var name = Ext.getCmp("name").getValue().trim();
					    		 	
					    		 	var fromcode = Ext.getCmp("fromcode").getValue().trim();
					    		 	if(fromcode == null || fromcode == ""){
					    		 		Ext.Msg.alert('��ʾ','��ת������Ϊ�����'); 
										return;
					    		 	}else if(fromcode.length > 128){
										Ext.Msg.alert('��ʾ','��ת���������128���ַ���'); 
										return;
									}else if(!Ext.getCmp("fromcode").isValid()){
										Ext.Msg.alert('��ʾ','��ת����ֻ�����뺺�֡���ĸ�����ֺ��»��߲������»��߿�ͷ�ͽ�β��'); 
										return;
									}
					    		 	
					    		 	var tocode = Ext.getCmp("tocode").getValue().trim();
					    		 	if(tocode == null || tocode == ""){
					    		 		Ext.Msg.alert('��ʾ','ת�������Ϊ�����'); 
										return;
					    		 	}else if(tocode.length > 128){
										Ext.Msg.alert('��ʾ','ת����������128���ַ���'); 
										return;
									}else if(!Ext.getCmp("tocode").isValid()){
										Ext.Msg.alert('��ʾ','ת�������ֻ�����뺺�֡���ĸ�����ֺ��»��߲������»��߿�ͷ�ͽ�β��'); 
										return;
									}
					    		 	 
					    		 	var filedname = Ext.getCmp("filedname").getValue().trim().toUpperCase();
					    		 	if(filedname == null || filedname == ""){
										Ext.Msg.alert('��ʾ','�ֶ�����Ϊ�����'); 
										return;
									}else if(filedname.length > 128){
										Ext.Msg.alert('��ʾ','�ֶ��������128���ַ���'); 
										return;
									}else if(!Ext.getCmp("filedname").isValid()){
										Ext.Msg.alert('��ʾ','�ֶ�����ֻ��������ĸ�����ֺ��»��߲������»��߿�ͷ�ͽ�β��'); 
										return;
									}
					    		 	
					    		 	var elrule = Ext.getCmp("elrule").getValue().trim();
					    		 	if(elrule.length > 256){
										Ext.Msg.alert('��ʾ','el���ʽ���256���ַ���'); 
										return;
									}
					    		 	var remark = Ext.getCmp("remark").getValue().trim();
					    		 	if(remark.length > 128){
										Ext.Msg.alert('��ʾ','��ע���128���ַ���'); 
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
											//����
											if(fromcode != updatemap.get('fromcode') || filedname != updatemap.get('filedname'))
											var chackEtlInfo = Ext.lt.RCP.asynserver("framework_etlservice", "chackEtlInfo", map);
											if(chackEtlInfo){
												Ext.Msg.alert('��ʾ','�ü�¼�Ѿ����ڣ�'); 
												return;
											}		
									Ext.lt.template.mask('���ݱ�����,���Ժ�...','x-mask-loading');
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
							    		 	Ext.Msg.alert('��ʾ','����ɹ���');
							    		 	Ext.lt.template.unmask();
							    		 }else{
							    		 	updateManualWin.close();
							    		 	Ext.Msg.alert('��ʾ','����ʧ�ܣ�');
							    		 	Ext.lt.template.unmask();
							    		 }
							    		 
									});  
									
									
								}
							   }, {
								xtype : 'button',
								text : 'ȡ��',
								handler : function() {
									updateManualWin.close();
								}
							  }]
				});
			
			var updateManualWin = new Ext.Window({
						id : 'updateManualWinId',
						width : 400,
						//height : 400,
						title : '�޸Ķ��չ�ϵ��ϸ��Ϣ',
						modal : true,
						items : updateManualPanel
			})
			updateManualWin.show();
			
			
	}
	
	//��������
	function dataSourseConfig(etlcodeidss,etlnameidss){
	/*
 	 *    ����combo���������
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
						{etlname:'��ת������',etlid:'1'},{etlname:'ת�������',etlid:'2'}
				      ]
			});
			var datasourseCb = new Ext.form.ComboBox({
				fieldLabel : '&nbsp;&nbsp;&nbsp;��Դ��',
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
	 			blankText:"������Ϊ�գ�",
	 			listeners:{
					'change':function(combo,newvalue,oldvalue){
					Ext.lt.RCP.server('framework_etlservice', 'findAllColumn', combo.getValue(),
						function(resp) {
							if(resp.length==0||resp==null){
								showInfoMessage("��ʾ��Ϣ","����ϢΪ��!");
								return;
							}
						columnStore.loadData(resp);
													})
					}}
			});
			
			var columnCb = new Ext.form.ComboBox({
				fieldLabel : '�ֶ�����',
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
	 			blankText:"������Ϊ�գ�"
			});
			
			var etlCb = new Ext.form.ComboBox({
				fieldLabel : 'ת��ģʽ',
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
	 			blankText:"������Ϊ�գ�"
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
								text : 'ȷ��',
								handler : function() {
									var datasourseCbdata=datasourseCb.getValue();
									var columnCbdata=columnCb.getValue();
									var etlCbdata=etlCb.getValue();
									
									if(datasourseCbdata==null||datasourseCbdata==""){
										showInfoMessage("��ʾ��Ϣ","��ѡ����Դ��");
										return;
									}else if(columnCbdata==null||columnCbdata==""){
										showInfoMessage("��ʾ��Ϣ","��ѡ���ֶ����ƣ�");
										return;
									}else if(etlCbdata==null||etlCbdata==""){
										showInfoMessage("��ʾ��Ϣ","��ѡ��ת�����ͣ�");
										return;
									}
									
									var map = new Object();
									map.code = etlcodeidss;
									map.name = etlnameidss;
									map.etlid = etlCb.getValue();
									map.tablecode = datasourseCb.getValue();
									map.tablecolumn = columnCb.getValue();
									
									
									//����
									var chackall = Ext.lt.RCP.asynserver("framework_etlservice", "chackAll", map); 
										if(chackall.length==0){
										Ext.lt.template.mask('���ݱ�����,���Ժ�...','x-mask-loading');
													Ext.lt.RCP.server("framework_etlservice", "saveEtlInfo", map, function (response) {
											    		 if(response>0){
											    		 	pageLoad(etlcodeidss,fromcodeTextBox.getValue(),tocodeTextBox.getValue());
											    		 	dataSourseWin.close();
											    		 	Ext.Msg.alert('��ʾ','����ɹ���');
											    		 	Ext.lt.template.unmask();
											    		 }else if(response == 0){
											    		 	dataSourseWin.close();
											    		 	Ext.Msg.alert('��ʾ','�ֶ�����Ϊ�գ�����ʧ�ܣ�');
											    		 	Ext.lt.template.unmask();
											    		 }else if(response == -1){
											    			 dataSourseWin.close();
												    		 Ext.Msg.alert('��ʾ','�ֶ����ݲ��ܴ���256�ַ�������ʧ�ܣ�');
												    		 Ext.lt.template.unmask();
											    		 }
											    		 
													});
											
										}else{
											 Ext.MessageBox.show({
											    title:"��ʾ��Ϣ��",
											    msg:"���ձ�����ظ����ݣ��봦���ظ����ݣ�",
												width:400,
												closable:false,
												buttons:{ok:'����',yes:'����',cancel:'ȡ��'},
												fn:function(e){
												if(e=='ok'){ 
													Ext.lt.RCP.asynserver("framework_etlservice", "recoverEtlInfo", map);
													Ext.lt.template.mask('���ݱ�����,���Ժ�...','x-mask-loading');
													Ext.lt.RCP.server("framework_etlservice", "saveEtlInfo", map, function (response) {
											    		 	pageLoad(etlcodeidss,'','');
											    		 	dataSourseWin.close();
											    		 	Ext.Msg.alert('��ʾ','����ɹ�'+response+'����¼��');
											    		 	Ext.lt.template.unmask();
													});  
												}
												else if(e=='yes'){
													Ext.lt.template.mask('���ݱ�����,���Ժ�...','x-mask-loading');
													Ext.lt.RCP.server("framework_etlservice", "jumpEtlInfo", map, function (response) {
											    		 pageLoad(etlcodeidss,'','');
											    		 	dataSourseWin.close();
											    		 	Ext.Msg.alert('��ʾ','����ɹ�'+response+'����¼��');
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
								text : 'ȡ��',
								handler : function() {
									dataSourseWin.close();
								}
							  }]
				});
			//���ñ�������Ϣ����
			var dataSourseWin = new Ext.Window({
						id : 'dataSourseWinId',
						width : 400,
						//height : 400,
						title : '��������',
						modal : true,
						items : dataSoursePanel
			})
			dataSourseWin.show();
			
	}

	//��panel	
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
     * ��ҳ��ѯ
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
					//�ֶ�����ҳ����Ϣ�����˺þã�û�ҵ��Զ�����ķ���
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
						btoolbar.displayItem.el.update(" ��ʾ�� "+(btoolbar.cursor+1)+" ���� "+(allcount-btoolbar.cursor>20?btoolbar.cursor+20:allcount)+" ����¼���� "+allcount+" ��");
					}
					else{
						btoolbar.first.setDisabled(true);
						btoolbar.prev.setDisabled(true);
						btoolbar.next.setDisabled(true);
						btoolbar.last.setDisabled(true);
						btoolbar.inputItem.value=1;
						btoolbar.inputItem.focus();
						btoolbar.inputItem.blur();
						btoolbar.displayItem.el.update("û�ж��չ�ϵ");
					}
				}
					
		})
	}	
		
		
	/**
     *��ȡ���չ�ϵ����
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