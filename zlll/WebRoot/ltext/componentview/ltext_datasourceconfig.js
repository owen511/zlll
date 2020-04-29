Ext.lt.console.component.datasourcemanager=function(sid,config){
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = 'side';
// �������ݼ�
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
		//Ext.lt.RCP.server("datasourceserver", "findAllProvince", "110" , function (resp)�ɲ鱱������
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
// ������ʾ����Դ���б�
//var sm = new Ext.grid.CheckboxSelectionModel();//grid�����е�һ��checkbox
var sm = new Ext.grid.CheckboxSelectionModel({header: ""});//grid����û�е�һ��checkbox
	this.datasourceGrid = new Ext.grid.GridPanel({
		layout:"fit", //panel����Ӧ
		border:false,
        store: this.store,
        region:'center',
        columns: [
    	//sm = datasourceGrid.getSelectionModel(); 
		//sm.clearSelections(); 
		//��ָ��sm.deselectRow(n)
    	sm,//���checkbox


					{id:'acctyear',header: "���", width: 80, sortable: true,menuDisabled:true, dataIndex: 'acctyear'},
					{id:'region',header: "����", width: 80, sortable: true,menuDisabled:true, dataIndex: 'region', renderer:function (value) {
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
					{id:'id',header: "����Դ����", width: 80, sortable: true,menuDisabled:true, dataIndex: 'id'},
					{id:'dbtype',header: "���ݿ�����", width: 80, sortable: true,menuDisabled:true, dataIndex: 'dbtype'},
					{id:'host',header: "������IP", width: 80, sortable: true,menuDisabled:true, dataIndex: 'host'},
					{id:'port',header: "�˿ں�", width: 80, sortable: true,menuDisabled:true, dataIndex: 'port'},
					{id:'dbname',header: "���ݿ���", width: 80, sortable: true,menuDisabled:true, dataIndex: 'dbname'},
					{id:'username',header: "�û���", width: 80, sortable: true,menuDisabled:true, dataIndex: 'username'},
					{id:'password',header: "����", width: 80, sortable: true,menuDisabled:true, dataIndex: 'password',hidden:true}
					 
        ],
        sm:sm,
        stripeRows: true,
        autoExpandColumn: 'username',
        tbar:[
					{text: '����', iconCls:"cancel", pressed:true,  listeners:{'click':function(){Ext.lt.console.component.datasourcemanager.instance.datasourceGrid.newdatasource()}}},
					'-', 
					{text: 'ɾ��',iconCls:"cancel", pressed:true, listeners:{'click':function(){
						var selectrow = Ext.lt.console.component.datasourcemanager.instance.datasourceGrid.getSelectionModel().selections.items;
						var arr=new Array();
						for(var i=0;i<selectrow.length;i++){
							if(selectrow[i].data.id!=''){
								arr.push(selectrow[i].data.id);
							}
						}
						if(arr.length>0){
							Ext.MessageBox.confirm("ɾ������", "�Ƿ�Ҫɾ����ѡ����Դ��",
							function(btn) {
								if (btn == "yes") {
									if(typeof(deleteFcasDataSourceCallBack)!='undefined'){
										var msg=deleteFcasDataSourceCallBack(arr);
										if(msg&&msg!='false'){
											Ext.MessageBox.confirm("ɾ������", msg,function(button){
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
								Ext.Msg.alert('��ʾ', '��ѡ��Ҫɾ�������ݣ�');
						}
					}}}
				],
        height:380
        //autoHeight: true			 //�Զ������߶�
    }
    );
    //ɾ������
    function remove(arr){
    	Ext.lt.RCP.server("datasourceserver", "remove",[ arr ], function (resp) {
			var selectrow = Ext.lt.console.component.datasourcemanager.instance.datasourceGrid.getSelectionModel().selections.items;
			for(var i=0;i<selectrow.length;){
				Ext.lt.console.component.datasourcemanager.instance.store.remove(selectrow[0]);
			}
			Ext.Msg.alert('��ʾ', 'ɾ���ɹ���');
  		 });
    }
   
    // ������ʾ���������ݼ�'ctrl+shift+p'
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
    
		// ��ϸ���ý���
    this.dsconfig=new Ext.TabPanel({
    
    	id:'dbconfig',
    	activeTab:0,
    	border:false,
    	enableTabScroll:true,
    	region:'south',
    	items:[
    		dbconfigbasic,dbSQLInfo,dbSQLCache
    		/*ע���������
    		,
    		{id:'cache',border:0,title:'�������'}
    		
    		*/
    	]
    });
    
	this.panel= new Ext.Panel({
		
		title:'����Դ����',
		id:'datasourcemanager',
		border:false,
		//width:'99.8%',	//datagrid�б�Ŀ��
		//autoHeight: true,	//�Զ������߶�	
		height:500,
		layout:'border',
		//autoScroll:true,
		items:[this.datasourceGrid,this.dsconfig]
		});
	return this.panel;
}

//��������
Ext.lt.console.component.dbconfigbasic=function(datasourceGrid){
	var datas=Ext.lt.RCP.asynserver("datasourceserver", "findAllProvince", null);
	Ext.lt.console.component.datasourcemanager.instance.provinces=datas[0];
	var treeCombox=new Ext.form.ComboBox({
			fieldLabel: "����<span style='color:red'>*</span>",
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
 			blankText:"������Ϊ�գ�",
			editable:false,
			tpl: "<div style='height:200px' id='regionTreeDiv'></div>",
			onSelect:Ext.emptyFn
			})
  	//��д�����б��ĵ���¼�(����)
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
	//��дgetValue����
	treeCombox.getValue=function(){return treeCombox.comvalue?treeCombox.comvalue:"";}
	 var _grid = datasourceGrid;
	 var basicPanel=new Ext.Panel({
	 	layout:"fit",
		id:'base',
		title:'��������',
		//autoHeight: true,	//�Զ������߶�
		height:155,
		border:false,
		tbar :[
			//
			{text: '����', iconCls: 'save',pressed:true,  listeners:{'click':function(){basicPanel.save()}}},
			'-', 
			{text: '����', iconCls: 'test',pressed:true,  listeners:{'click':function(){basicPanel.test()}}}
		],
		padding:8,
		//�����
		items:new Ext.form.FormPanel({
				
			    id:'datasourcefrom',
				baseCls: 'x-plain',
				labelWidth: 80,
				//��������
				items: [{
		            	layout:'column',
		           	 	baseCls: 'x-plain',
		            	items:[{
				                //һ����������
				                columnWidth:.3,
				                layout: 'form',
				                baseCls: 'x-plain',
				                items: [//����ѡ���
				                new Ext.form.ComboBox({
										fieldLabel: '���ݿ�����',
										store: new Ext.data.SimpleStore({
										fields : ['value', 'name'],
										data : [['һ�廯��', 'һ�廯��'], ['�������ݿ�','�������ݿ�']]
										}),
										displayField:'name',
										typeAhead: true,
									  	mode: 'local',
									  	triggerAction: 'all',
										name: 'db_type',
									  	selectOnFocus:true,
										anchor:'99%',
										allowBlank : false,
				        				blankText:"������Ϊ�գ�",
										editable:false,
										//valueField:'value',
										//setvalue:"value",
										value: 'һ�廯��',
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
				                	//���
						                    xtype:'textfield',
						                    fieldLabel: "���<span style='color:red'>*</span>",
						                    name: 'acctyear',
						                    //selectOnFocus:true,
						                    anchor:'99%',
					                    	//emptyText:'2011',
						                     //��֤textfield�Ƿ�Ϊ��
					                    	allowBlank : false,
				        					//��������Ϊ����ʾ��
				        					blankText:"������Ϊ�գ�", 
											//��ַ������Դﵽ��
				        					maxLength : 8 ,
											//�����趨����ַ�ʱ�������������ʾ
											maxLengthText : '��ȳ��Ȳ��ܳ���8λ��',
				        					//������ʽ��֤����������Ƿ�Ϊ8λ������
     										regex:/^([1-9]\d{0,8})$/,
     										//����IP��ʽ������ʾ��
     										regexText:'��ȸ�ʽ�������ֻ����������(��:2011)��' 
     										
						                },{
						                    xtype:'textfield',
						                    fieldLabel: "����<span style='color:red'>*</span>",
						                    name: 'faspdb',
						                    anchor:'99%',
					                    	allowBlank : false,
					                    	disabled:true,
				        					//��������Ϊ����ʾ��
				        					blankText:"������Ϊ�գ�", 
											//��ַ������Դﵽ��
				        					maxLength : 8 ,
											//�����趨����ַ�ʱ�������������ʾ
											maxLengthText : '��ȳ��Ȳ��ܳ���8λ��',
     										value:'faspdb'
						                },{
						            //����Դ����
						                    xtype:'textfield',
						                    /*fieldLabel: "<span style='color:red'>abcds*</span>",
						                    	����textfield�е�fieldLabel��ɫΪ��ɫ*/
						                    fieldLabel: "����Դ����<span style='color:red'>*</span>",
						                    name: 'id',
						                    align:'center',
						                    anchor:'99%',
						                     //��֤textfield�Ƿ�Ϊ��
					                    	allowBlank : false,
					                    	disabled:true
				        					//��������Ϊ����ʾ��
				        					//blankText:"������Ϊ��!",
				        					//��ַ������Դﵽ��
				        					//maxLength : 50 ,
											//�����趨����ַ�ʱ�������������ʾ
											//maxLengthText : '����Դ���볤�Ȳ��ܳ���50λ��'
											
											
				                		}]
		           				},{
				                baseCls: 'x-plain',
				                width:20
				                },{
				                //һ����������
				                columnWidth:.3,
				                layout: 'form',
				                baseCls: 'x-plain',
				                items: [
				                //����ѡ���
				                treeCombox,
							{
								//��������ַ
					                    xtype:'textfield',
					                    fieldLabel: "��������ַ<span style='color:red'>*</span>",
					                    name: 'host',
					                    anchor:'99%',
					                    //��֤textfield�Ƿ�Ϊ��
					                    allowBlank : false,
				        				//��������Ϊ����ʾ��
				        				blankText:"������Ϊ�գ�",
     									/*��ȡ�����¼���ֹ����ĳЩ�ַ�
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
				        				//������ʽ��֤����������Ƿ�ΪIP��ַ
     									regex:/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
     									//����IP��ʽ������ʾ��
     									regexText:'IP��ַ��ʽ����IP��ַΪ��:xxx.xxx.xxx.xxx(xxxΪ0-255)��'          
				                		},
								//�û���
		                				{
					                    xtype:'textfield',
					                    columnWidth:.5,
					                    fieldLabel:"�û���<span style='color:red'>*</span>",
					                    name: 'username',
					                    anchor:'99%',
					                    //��֤textfield�Ƿ�Ϊ��
					                    allowBlank : false,
				        				//��������Ϊ����ʾ��
				        				blankText:"������Ϊ�գ�",
				        				//��ַ������Դﵽ��
				        				maxLength : 100 ,
										//�����趨����ַ�ʱ�������������ʾ
										maxLengthText : '�û������Ȳ��ܳ���100λ��'
		                				},
				                		{
				                	//���ݿ���
						                    xtype:'textfield',
						                    columnWidth:.5,
						                    fieldLabel: "���ݿ���<span style='color:red'>*</span>",//����*��ɫΪ��ɫ
						                    name: 'dbname',
						                    align:'center',
						                    anchor:'99%',
						                    //��֤textfield�Ƿ�Ϊ��
					                    	allowBlank : false,
				        					//��������Ϊ����ʾ��
				        					blankText:"������Ϊ�գ�" ,
				        					//��ַ������Դﵽ��
				        					maxLength : 50 ,
											//�����趨����ַ�ʱ�������������ʾ
											maxLengthText : '���ݿⳤ�Ȳ��ܳ���50λ��'
				                		}]
		            			} ,{
				                baseCls: 'x-plain',
				                width:20
				                },
		            			{
				                //һ����������
				                columnWidth:.3333333,
				                layout: 'form',
				                baseCls: 'x-plain',
				                items: [	//���ݿ�����ѡ���
		                		new Ext.form.ComboBox({
										fieldLabel:"���ݿ�����<span style='color:red'>*</span>",
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
		        						blankText:"������Ϊ�գ�",
										editable:false,
										valueField:'value',
										setvalue:"value",
										value:"oracle"
										}),{
								//�˿ں�
					                    xtype:'textfield',
					                    fieldLabel: "�˿ں�<span style='color:red'>*</span>",
					                    name: 'port',
					                    anchor:'99%',
					                    selectOnFocus:true,
					                     //��֤textfield�Ƿ�Ϊ��
					                    allowBlank : false,
				        				//��������Ϊ����ʾ��
				        				blankText:"������Ϊ�գ�" ,
				        				//��ַ������Դﵽ��
				        				maxLength : 5 ,
										//�����趨����ַ�ʱ�������������ʾ
										maxLengthText : '�˿ںų��Ȳ��ܳ���5λ��',
										regex:/^([1-9]\d{0,8})$/,
     										//����IP��ʽ������ʾ��
     									regexText:'�˿ں�ֻ�������������ͣ�' 
				                		},{
										//����
										xtype:'textfield',
										fieldLabel: "����<span style='color:red'>*</span>",
										inputType : "password" , 
										name: 'password',
										 
										anchor: '99%',
										 //��֤textfield�Ƿ�Ϊ��
					                    allowBlank : false,
				        				//��������Ϊ����ʾ��
				        				blankText:"������Ϊ�գ�" ,
				        				//��ַ������Դﵽ��
				        				maxLength : 50 ,
										//�����趨����ַ�ʱ�������������ʾ
										maxLengthText : '���볤�Ȳ��ܳ���50λ��'
				            			},{   
							        	//�����ַ���
							            xtype : 'textarea',   
							            fieldLabel : '�����ַ���',   
							            emptyText : '<��>',   
							            name : 'url',   
							            height : 30,
							            anchor: '99.5%' ,
							            //��ַ������Դﵽ��
									    maxLength : 512 ,
										//�����趨����ַ�ʱ�������������ʾ
										maxLengthText : '�����ַ������Ȳ��ܳ���512λ��'
							        	}]
		            			}]
		        	}]
		})
		
	})
//ͳһָ��������Ϣ��ʾ������ʾ��ʽ
//Ext.form.Field.prototype.msgTarget = 'side';
//��ʼ����Ϣ��ʾ����
	Ext.QuickTips.init();
	// ��ӱ�Ҫ��ҵ�񷽷�
	// ��ʾ���ݿ���������
	basicPanel.showDataSource=function(r){
		if(!basicPanel.hasChanged()){
			if(confirm('����Դ��Ϣ�Ѿ����Ķ����Ƿ�Ҫ�滻����Դ��Ϣ��')){
				var d=basicPanel._recordset;
				if(d.get('id')==''){
					// �½������ݼ�
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
				_form.findField('db_type').setValue('һ�廯��');
				_form.findField('faspdb').setValue('faspdb');
				_form.findField('faspdb').setDisabled(true);
			}else{
				_form.findField('db_type').setValue('�������ݿ�');
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
		// TODO: �˴�ʵ���ύ����Դ���õĴ���
		var _form = basicPanel.findById('datasourcefrom').getForm();
		var _rs=new Object();
		_rs.acctyear=_form.findField('acctyear').getValue();
		_rs.region=basicPanel.getRegionCode(_form.findField('region').getValue());
		var faspdb='faspdb'
		if(_form.findField('db_type').getValue()!='һ�廯��'){
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
			Ext.Msg.alert('��ʾ', "����Դ�����Ѵ��ڣ����飡");
			return;
		}
		if(basicPanel._recordset.data.id!=''){
			Ext.lt.RCP.server("datasourceserver", "updateDataSource", _rs , afterSave);
		}else{
			Ext.lt.RCP.server("datasourceserver", "saveDataSource", _rs , afterSave,function(resp){Ext.Msg.alert('��ʾ', "����ʧ�ܣ�")});
		}
	}
	afterSave=function (resp){
		if(resp){
			//Ext.MessageBox.alert('��ʾ','����ɹ�');
			Ext.Msg.alert('��ʾ', '����ɹ���');
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
			Ext.Msg.alert('��ʾ', '����ʧ�ܣ�');
		}
	}
	basicPanel.test=function(sid,config){
		var count=datasourceGrid.getSelectionModel().selections.items.length;
		if(count==0){
			Ext.Msg.alert('��ʾ', '��ѡ������Դ��');
			return;
		}
		// TODO: �˴�ʵ����֤���ݿ�������Ϣ�Ƿ���ȷ�Ĵ��룬���������֤ͨ��
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
				// Ext.MessageBox.confirm('��ʾ','����Դ��֤ͨ�����Ƿ񱣴棿',function(btn){if(btn=='yes'){basicPanel.save()}});
				Ext.Msg.alert('��ʾ', '���ӳɹ���');
			}else{
				Ext.Msg.alert('��ʾ', '����ʧ�ܣ�');
			}		
		});
	}
	
	// ������ݿ�������Ϣ�Ƿ񱻸Ķ���
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
		{header:"����SQL", width:3, sortable:true,menuDisabled:true, locked:false, dataIndex:"sql"},
		{header:"���ִ��ʱ��(ms)", width:2, sortable:true,menuDisabled:true, locked:false, dataIndex:"maxRuntime"},
		{header:"��Сִ��ʱ��(ms)", width:2, sortable:true,menuDisabled:true, locked:false, dataIndex:"minRuntime"},
		{header:"�ۼ�ִ��ʱ��(ms)", width:2, sortable:true,menuDisabled:true, locked:false, dataIndex:"accRuntime"},
		{header:"ƽ��ִ��ʱ��(ms)", width:2, sortable:true,menuDisabled:true, locked:false, dataIndex:"preRuntime"},
		{header:"ִ�д���", width:1, sortable:true,menuDisabled:true, locked:false, dataIndex:"runtime"}
		]);
	this.panel = new Ext.grid.GridPanel({
				title:'���ݿ�SQLִ����־',
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
			// ͨ��Զ�̵��û�ȡ���µ���־��¼
			var loaddata = new Array();
				for(var j=0;j<reps.length;j++){
				loaddata.push([reps[j].sql,reps[j].maxRuntime,reps[j].minRuntime,reps[j].accRuntime,reps[j].preRuntime,reps[j].runtime]);
			}
			src.datads.loadData(loaddata);
		});
	};
	this.panel.addListener('rowdblclick', function(grid, rowindex, e){
		Ext.Msg.alert("SQL����",grid.store.data.items[rowindex].data.sql);
	}); 
	this.show=function(){
	return  Ext.lt.console.component.daomonitorlog.panel;
	}
};

Ext.lt.console.component.datasourcecache=new function(){
	var sm = new Ext.grid.CheckboxSelectionModel({header: "",singleSelect :true});//grid����û�е�һ��checkbox
	this.datads = new Ext.data.Store({
		reader:new Ext.data.ArrayReader({}, [{name:"sql"},{name:"refresh"},{name:"id"}])
	});
	this.model = new Ext.grid.ColumnModel([
		sm,
		new Ext.grid.RowNumberer(), 
		{header:"SQL", width:3, sortable:true,menuDisabled:true, locked:false, dataIndex:"sql"},
		{header:"ˢ��ʱ��", width:1, sortable:true,menuDisabled:true, locked:false, dataIndex:"refresh"}
		]);
	this.panel = new Ext.grid.GridPanel({
				title:'���ݿ�SQL����',
				layout:"fit",
				iconCls:"grid", 
				border:0, 
				store:this.datads, 
				cm:this.model,
				sm:sm,
				tbar :[
					{text: '���', iconCls: 'save',pressed:true,  listeners:{'click':function(){
						saveAndUpdate("",false,null);
					}}},
					'-', 
					{text: '�޸�', iconCls: 'test',pressed:true,  listeners:{'click':function(){
						var selectrow = src.panel.getSelectionModel().getSelected();
						if(selectrow==null){Ext.Msg.alert('��ʾ', '��ѡ����Ҫ�޸ĵ�SQL��');return;}
						saveAndUpdate(selectrow.data.sql,selectrow.data.refresh!=null,selectrow.data.id);
					}}},
					'-', 
					{text: 'ɾ��', iconCls: 'test',pressed:true,  listeners:{'click':function(){
						var selectrow = src.panel.getSelectionModel().getSelected();
						if(selectrow==null){Ext.Msg.alert('��ʾ', '��ѡ����Ҫɾ����SQL��');return;}
						Ext.lt.RCP.server("datasourceserver",'delDatasourceCache2Id',selectrow.data.id+"",function(reps){
							if(reps){
								Ext.Msg.alert('��ʾ', 'ɾ���ɹ���');
								src.panel.loadDBInfo(src.dsid);
							}else{
								Ext.Msg.alert('��ʾ', 'ɾ��ʧ�ܣ�');
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
			   title: '���ݿ�SQL����',
			   id:"datasourcecache_sql",
			   width:800,
			   height: 400,
			   layout:'column',
			   closable:false,
			   resizable :false,
			   autoScroll:true,
			   buttonAlign:"center",
			   buttons:[{text:"ȷ��", handler:function (button,win) {
			   		if(src.isSave){
			   			Ext.lt.RCP.server("datasourceserver",'saveDatasourceCache',[Ext.getCmp("datasourcecache_sql_txt").getValue(),src.dsid,Ext.getCmp("datasourcecache_sql_ref").getValue()+""],function(reps){
			   				if(reps){
			   					Ext.Msg.alert('��ʾ', '����ɹ���');
								src.panel.loadDBInfo(src.dsid);
							}else{
								Ext.Msg.alert('��ʾ', '����ʧ�ܣ�');
							}
			   				Ext.lt.template.unmask();
			   				Ext.getCmp("datasourcecache_sql").hide();
						});
			   		}else{
						Ext.lt.RCP.server("datasourceserver",'updateDatasourceCache',[Ext.getCmp("datasourcecache_sql_txt").getValue(),Ext.getCmp("datasourcecache_sql_ref").getValue()+"",id+""],function(reps){
							if(reps){
								Ext.Msg.alert('��ʾ', '����ɹ���');
								src.panel.loadDBInfo(src.dsid);
							}else{
								Ext.Msg.alert('��ʾ', '����ʧ�ܣ�');
							}
							Ext.lt.template.unmask();
							Ext.getCmp("datasourcecache_sql").hide();
						});
			   		}
			   }},{text:"ȡ��", handler:function (button,win) {
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
				       items:[new Ext.form.Checkbox({id:"datasourcecache_sql_ref",fieldLabel:"ˢ��ʱ��",checked:ref})]
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
			// ͨ��Զ�̵��û�ȡ���µ���־��¼
			var loaddata = new Array();
				for(var j=0;j<reps.length;j++){
				loaddata.push([reps[j][0],reps[j][1],reps[j][3]]);
			}
			src.datads.loadData(loaddata);
		});
	};
	this.panel.addListener('rowdblclick', function(grid, rowindex, e){
		Ext.Msg.alert("SQL����",grid.store.data.items[rowindex].data.sql);
	}); 
	this.show=function(){
	return  Ext.lt.console.component.datasourcecache.panel;
	}
};