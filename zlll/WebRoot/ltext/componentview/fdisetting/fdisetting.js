Ext.lt.console.component.fdisetting=function(sid,config){
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = 'side';
	//������
	function mainPanel(){
		
		//����˵����ݽṹ
		var fields=[{name:'name'},{name:'titlerow'},{name:'product'},{name:'delimitercol'},{name:'delimiterline'},
		{name:'table'},{name:'repeatedtype'},{name:'repeatedwhere'},{name:'code'},{name:'affairstype'},{name:'_info'},{name:'infos'},{name:'_info'}];
		
		var store= new Ext.data.JsonStore({
			load: init(),
			fields: fields 
		});
		var _ctype=0;
		var _rowIndex=null;
		var gpanel = new Ext.grid.GridPanel({
			layout:"fit", //panel����Ӧ
			border:false,
			store: store,
			region:'center',
			viewConfig: {forceFit:true},  
			columns: [
				{header: "���ñ���", width: 130, sortable: true,menuDisabled:true, dataIndex: 'code'},
				{header: "��������", width: 130, sortable: true,menuDisabled:true, dataIndex: 'name'},
				{header: "��ͷ����", width: 80, sortable: true,menuDisabled:true, dataIndex: 'titlerow'},
				{header: "��Ʒ��", width: 180, sortable: true,menuDisabled:true, dataIndex: 'product',renderer:function(value){
					for(var i=0;i<_productdata.length;i++){
						if(value==_productdata[i].config)return _productdata[i].name;
					}
				}},
				{header: "����", width: 180, sortable: true,menuDisabled:true, dataIndex: 'table'},
				{header: "���ı��зָ���", width: 120, sortable: true,menuDisabled:true, dataIndex: 'delimitercol'},
				{header: "���ı��зָ���", width: 120, sortable: true,menuDisabled:true, dataIndex: 'delimiterline'},
				{header: "������", width: 180, sortable: true,menuDisabled:true, dataIndex: 'affairstype',renderer:function(v){
					if(v==1)return 'δȷ������ȫ���ع�';
					if(v==2)return '���ִ���ʱ������';
					if(v==3)return '���ִ���ʱֹͣ';
				}},
				{header: "�ظ����ݲ���", width: 180, sortable: true,menuDisabled:true, dataIndex: 'repeatedtype',renderer:function(v){
					if(v==0)return '�ظ����ݲ�����';
					if(v==1)return 'ɾ��֮ǰ���ڵ��ظ�����';
				}},
				{header: "�޸�",width:50,menuDisabled:true,align:"center",renderer:function(value, cellmeta, record){return "<a href='#' ><img src='../ltext/images/bann_ico/edit.gif' width='15' height='16'  align='absmiddle' /></a>";}},
				{header: "ɾ��",width:50,menuDisabled:true,align:"center",renderer:function(value, cellmeta, record){return "<a href='#' ><img src='../ltext/images/bann_ico/del.gif' width='15' height='16'  align='absmiddle' /></a>";}},
				{header:"����ϸ����", width:100, sortable:true, locked:false, align : "center", dataIndex:"ltableid",
					renderer:function(value) {
					 return "<a href='#' ><img src='../ltext/images/bann_ico/autoset.gif' width='15' height='16'  align='absmiddle' /></a>";
				}}],
			stripeRows: true,
			listeners:{
				cellclick:function(grid,rowIndex,cellIndex,e){
					var _data=store.getAt(rowIndex).data;
					if(cellIndex==10){
						Ext.MessageBox.confirm("ɾ������", "�Ƿ�Ҫɾ�������ã�",function(btn) {
							if(btn!='yes')return;
							var boo=Ext.lt.RCP.asynserver("framework_fdisetting",'removeConfig',  _data.code+"");
							if(boo=='true'||boo==true){
								Ext.MessageBox.alert("ɾ������", 'ɾ���ɹ�');
								init();
								_win.hide();
							}else{
								Ext.MessageBox.alert("ɾ������", 'ɾ��ʧ��');
							}
						});
						return;
					}
					if(cellIndex==9){
						_ctype=1;
						_rowIndex=rowIndex;
						_win.show();
				    	var items=_win.items.items;
				    	for(var i=0;i<items.length-1;i++){
				    		items[i].setValue(_data[items[i].name]);
				    	}
				    	_win.items.items[0].setDisabled(true);
				    	return;
					}
					if(cellIndex==11){
						showChildPanel(_data);
						return;
					}
				}
			}
    });
   	var _productdata=Ext.lt.RCP.asynserver("consoleinstallservice", "load",  null);
    var _win=new Ext.Window({
			title : '���ô���',
			width : 350,
			height : 420,
			layout : 'form',
			plain : true,
			closeAction : 'hide',
			bodyStyle : 'pfFing:5px;',
			modal : true,
			items : [new Ext.form.TextField ({
					fieldLabel:"���ñ���<span style='color:red'>*</span>",
					name:"code",
					anchor: '99%',
					maxLength:50,
					maxLengthText:"ֻ������50�����֣�",
					allowBlank:false,
					blankText:"���ñ��벻��Ϊ�գ�",
					regex : /^[\u4e00-\u9fa5a-zA-Z0-9_]+$/,
					regexText:'ֻ�����뺺�֡���ĸ�����ֺ��»��ߣ�'
				}),new Ext.form.TextField ({
					fieldLabel:"��������<span style='color:red'>*</span>",
					name:"name",
					anchor: '99%',
					maxLength:50,
					maxLengthText:"ֻ������50�����֣�",
					allowBlank:false,
					blankText:"�������Ʋ���Ϊ�գ�",
					regex : /^[\u4e00-\u9fa5a-zA-Z0-9_]+$/,
					regexText:'ֻ�����뺺�֡���ĸ�����ֺ��»��ߣ�'
				}),new Ext.form.ComboBox ({
					fieldLabel:"��Ʒ����<span style='color:red'>*</span>",
					name:"product",
					anchor: '99%',
					store: new Ext.data.JsonStore({
						fields: [{name:'name'},{name:'config'}],
						data : _productdata
					}),
					displayField:'name',
					valueField :'config',
					typeAhead: true,
				  	mode: 'local',
				  	triggerAction: 'all',
				  	selectOnFocus:true,
					allowBlank : false,
      				blankText:"������Ϊ�գ�",
					editable:false
				}),new Ext.form.NumberField({
					fieldLabel:"��ͷ����<span style='color:red'>*</span>",
					name:"titlerow",
					anchor: '99%',
					maxLength:5,
					maxLengthText:"ֻ������5�����ȣ�",
					blankText:"�����Ʋ���Ϊ�գ�",
					value:0
				}),new Ext.form.TextField({
					fieldLabel:"����<span style='color:red'>*</span>",
					name:"table",
					anchor: '99%',
					maxLength:50,
					maxLengthText:"ֻ������50���ַ���",
					allowBlank:false,
					blankText:"�����Ʋ���Ϊ�գ�",
					regex : /^[\u4e00-\u9fa5a-zA-Z0-9_]+$/,
					regexText:'ֻ�����뺺�֡���ĸ�����ֺ��»��ߣ�'
				}),new Ext.form.TextField({
					fieldLabel:"���ı��зָ���",
					name:"delimitercol",
					anchor: '99%',
					maxLength:10,
					maxLengthText:"ֻ������10���ַ���"
				}),new Ext.form.TextField({
					fieldLabel:"���ı��зָ���",
					name:"delimiterline",
					anchor: '99%',
					maxLength:10,
					maxLengthText:"ֻ������10���ַ���"
				}),new Ext.form.ComboBox ({
					fieldLabel:"������ʽ",
					name:"affairstype",
					anchor: '99%',
					store: new Ext.data.SimpleStore({
						fields : ['value', 'name'],
						data : [[1, 'δȷ������ȫ���ع�'],[2, '���ִ���ʱ������'],[3, '���ִ���ʱֹͣ']]
					}),
					displayField:'name',
					valueField :'value',
					typeAhead: true,
				  	mode: 'local',
				  	triggerAction: 'all',
					editable:false,
					value:2
				}),new Ext.form.ComboBox ({
					fieldLabel:"�ظ����ݲ���",
					name:"repeatedtype",
					anchor: '99%',
					store: new Ext.data.SimpleStore({
						fields : ['value', 'name'],
						data : [[0, '�ظ����ݲ�����'],[1, 'ɾ��֮ǰ���ڵ��ظ�����']]
					}),
					displayField:'name',
					valueField :'value',
					typeAhead: true,
				  	mode: 'local',
				  	triggerAction: 'all',
					editable:false,
					value:1
				}),new Ext.form.TextArea ({
					fieldLabel:"�ظ����ݹ������",
					name:"repeatedwhere",
					anchor: '99%',
					maxLength:1000,
					maxLengthText:"ֻ������1000���ַ���"
				})
				,new Ext.form.Label ({html   :"�зָ�����зָ�����ڴ��ı�����ʱʹ��"})],
			buttons:[
				{
					text : 'ȷ��',
					handler : function() {
						var items=_win.items.items;
						var o={};
						for(var i=0;i<items.length-1;i++){
							o[items[i].name]=items[i].getValue();
							if(items[i].maxLength!=null&&items[i].getValue().length>items[i].maxLength){
								Ext.MessageBox.alert("�������", '��������ȹ���');
								return ;
							}
							if(items[i].fieldLabel.indexOf('*')!=-1&&(items[i].getValue()+''==''||items[i].getValue()==null)){
								Ext.MessageBox.alert("�������", '�зǿ�������δ��д');
								return ;
							}
							
						}
						
						var regex = /^[\u4e00-\u9fa5a-zA-Z0-9_]+$/;
						//��֤�����ַ� 
						if(!Ext.lt.util.checkData(o.code)){
							Ext.MessageBox.alert("�������", 'ֻ�����뺺�֡���ĸ�����ֺ��»��ߣ�');
							return;
						}
						if(!Ext.lt.util.checkData(o.name)){
							Ext.MessageBox.alert("�������", 'ֻ�����뺺�֡���ĸ�����ֺ��»��ߣ�');
							return;
						}
						if(!Ext.lt.util.checkData(o.table)){
							Ext.MessageBox.alert("�������", 'ֻ�����뺺�֡���ĸ�����ֺ��»��ߣ�');
							return;
						}
						for(var i=0;i<store.data.length;i++){
							if(store.getAt(i).data.code==o.code&&_rowIndex!=i){
								Ext.MessageBox.alert("�������", '�����ظ�');
								return ;
							}
						}
						var boo=Ext.lt.RCP.asynserver("framework_fdisetting", _ctype==0?'save':'updateConfig',  o);
						if(boo=='true'||boo==true){
							Ext.MessageBox.alert("�������", '����ɹ�');
							init();
							_win.hide();
						}else{
							Ext.MessageBox.alert("�������", '����ʧ��');
						}
					}
				}, {
					text : 'ȡ��',
					handler : function() {
						_win.hide();
					}
				}
			],
			buttonAlign:'center'
		});
	var _name=new Ext.form.TextField({fieldLabel: '��������',name: 'name',anchor: '99%'});
    var _product=new Ext.form.ComboBox ({
		fieldLabel:"��Ʒ����",
		name:"product",
		anchor: '99%',
		store: new Ext.data.JsonStore({
			fields: [{name:'name'},{name:'config'}],
			data : _productdata
		}),
		displayField:'name',
		valueField :'config',
		typeAhead: true,
	  	mode: 'local',
	  	triggerAction: 'all',
	  	selectOnFocus:true,
		allowBlank : false,
		editable:false
	});
    var _addbutton=new Ext.Button({text: '����',handler: function(){
    	_win.show();
    	_win.items.items[0].setDisabled(false);
    	_ctype=0;
    	_rowIndex=-1;
    	var items=_win.items.items;
    	for(var i=0;i<=items.length-2;i++){
    		items[i].reset();
    	}
    }});
    
    var _querybutton=new Ext.Button({text: '��ѯ',handler: function(){
    	var name=_name.getValue();
    	var product=_product.getValue();
    	store.filterBy(function(record, id){
    		if(product==""&&name=="")return true;
    		var boo=name==""?true:(record.get("name").indexOf(name)>-1);
    		if(product!=""&&boo){
    			boo=record.get("product")==product;
    		}
    		return boo;
    	});
    }});
    var queryPanel=new Ext.form.FormPanel({
    	id:"asklfhjaskldfhjlaskhjdflk",
    	layout:'column', //panel����Ӧ
		border:false,
	    region:'north',
	    width:800,
	    height:35,
	    items:[{width:100,
				style: 'padding-left:30px',
				baseCls: 'x-plain',
				anchor: '100%',
				items:[_addbutton]
			},{width:200,
				layout: 'form',
				baseCls: 'x-plain',
				anchor: '100%',
				items:[_name]
			},{width:200,
				layout: 'form',
				baseCls: 'x-plain',
				anchor: '100%',
				items:[_product]
			},{style: 'padding-left:30px',
				baseCls: 'x-plain',
				anchor: '100%',
				items:[_querybutton]
			}]
    });
	    var panel=new Ext.Panel({
	    	border:false,
	    	layout:'border',
	    	title: "������Ϣ",
	    	items:[queryPanel,gpanel]
	    });
	    function init(){
			Ext.lt.RCP.server("framework_fdisetting","load",null, function(resp) {
				store.loadData(resp);
			});
		}
	    return panel;
	}
	
	
	
	
	
	function childPanel(){
		var _ctype=0;
		var _rowIndex=null;
		var _code=null;	
		//����˵����ݽṹ
		var fields=[{name:'name'},{name:'col'},{name:'index'},{name:'elstr'},{name:'code'},{name:'pcode'},{name:'type'},{name:'pk'},{name:'colcheck'}];
		
		var store= new Ext.data.JsonStore({
			fields: fields 
		});
		var _win=new Ext.Window({
			title : '���ô���',
			width : 350,
			height : 300,
			layout : 'form',
			plain : true,
			closeAction : 'hide',
			bodyStyle : 'padding:5px;',
			modal : true,
			items : [new Ext.form.TextField ({
					fieldLabel:"����*",
					name:'name',
					anchor: '99%',
					maxLength:50,
					maxLengthText:"ֻ������50�����֣�",
					allowBlank:false,
					blankText:"���Ʋ���Ϊ�գ�",
					regex : /^[\u4e00-\u9fa5a-zA-Z0-9_]+$/,
					regexText:'ֻ�����뺺�֡���ĸ�����ֺ��»��ߣ�'
				}),new Ext.form.TextField ({
					fieldLabel:"���ݿ�����*",
					anchor: '99%',
					name:'col',
					maxLength:50,
					maxLengthText:"ֻ������50�����֣�",
					allowBlank:false,
					blankText:"���ݿ���������Ϊ�գ�",
					regex : /^[\u4e00-\u9fa5a-zA-Z0-9_]+$/,
					regexText:'ֻ�����뺺�֡���ĸ�����ֺ��»��ߣ�'
				}),new Ext.form.ComboBox ({
					fieldLabel:"��������*",
					name:"type",
					anchor: '99%',
					store: new Ext.data.SimpleStore({
						fields : ['value', 'name'],
						data : [['string', '�ı�'],['int', '����'],['long', '������'],['double', 'С��']]
					}),
					displayField:'name',
					valueField :'value',
					typeAhead: true,
					mode: 'local',
					triggerAction: 'all',
					selectOnFocus:true,
					allowBlank : false,
					editable:false
				}),new Ext.form.NumberField({
					fieldLabel:"�����ļ�������*",
					name:'index',
					anchor: '99%',
					maxLength:5,
					maxLengthText:"ֻ������5�����ȣ�",
					blankText:"�����ļ�����������Ϊ�գ�"
				}),new Ext.form.TextArea ({
					fieldLabel:"�������ʽ",
					anchor: '99%',
					name:'el',
					maxLength:500,
					maxLengthText:"ֻ������500�����֣�"
				}),new Ext.form.Checkbox ({
					name:'pk',
					fieldLabel:"����",
					anchor: '99%'
				}),new Ext.form.Checkbox ({
					name:'colcheck',
					fieldLabel:"�ǿ�",
					anchor: '99%'
				})],
				buttons:[
				{
					text : 'ȷ��',
					handler : function() {
						var items=_win.items.items;
						var o={pcode:_subcode,code:_code};
						for(var i=0;i<items.length;i++){
							o[items[i].name]=items[i].getValue();
							if(items[i].maxLength!=null&&items[i].getValue().length>items[i].maxLength){
								Ext.MessageBox.alert("�������", '��������ȹ���');
								return ;
							}
							if(items[i].fieldLabel.indexOf('*')!=-1&&(items[i].getValue()+''==''||items[i].getValue()==null)){
								Ext.MessageBox.alert("�������", '�зǿ�������δ��д');
								return ;
							}
						}
						//��֤�����ַ� 
						if(!Ext.lt.util.checkData(o.name)){
							Ext.MessageBox.alert("�������", 'ֻ�����뺺�֡���ĸ�����ֺ��»��ߣ�');
							return;
						}
						if(!Ext.lt.util.checkData(o.col)){
							Ext.MessageBox.alert("�������", 'ֻ�����뺺�֡���ĸ�����ֺ��»��ߣ�');
							return;
						}
						for(var i=0;i<store.data.length;i++){
							if(store.getAt(i).data.index==o.index&&_rowIndex!=i){
								Ext.MessageBox.alert("�������", '�����ļ��������ظ�');
								return ;
							}
							if(store.getAt(i).data.col==o.col&&_rowIndex!=i){
								Ext.MessageBox.alert("�������", '�������ظ�');
								return ;
							}
						}
						o.pk=o.pk?1:0;
						o.colcheck=o.colcheck?1:0;
						var boo=Ext.lt.RCP.asynserver("framework_fdisetting", _ctype==0?'saveCol':'updataColConfig',  o);
						if(boo=='true'||boo==true){
							Ext.MessageBox.alert("�������", '����ɹ�');
							init();
							_win.hide();
						}else{
							Ext.MessageBox.alert("�������", '����ʧ��');
						}
					}
				}, {
					text : 'ȡ��',
					handler : function() {
						_win.hide();
					}
				}
			],
			buttonAlign:'center'
		});
		var panel = new Ext.grid.GridPanel({ 
			title:"����ϸ��Ϣ����",
			layout:"fit", //panel����Ӧ
			border:false,
			store: store,
			region:'center',
			viewConfig: {forceFit:true},
			tbar:[{
				text:"��������", 
				pressed:true, 
				handler:function(){
					_ctype=0;
					_rowIndex=null;
					_code=null;
					var items=_win.items.items;
			    	for(var i=0;i<=items.length-1;i++){
			    		items[i].reset();
			    	}
					_win.show();
				}}
				,'-',
				{	text:"����������Ϣ", 
				pressed:true,
				handler:function(){
					elementconfig.layout.setActiveItem(0); 
				}
			}],
			columns: [
				{header: "�����ļ�������", width: 80, sortable: true,menuDisabled:true, dataIndex: 'index'},
				{header: "����", width: 180, sortable: true,menuDisabled:true, dataIndex: 'name'},
				{header: "���ݿ���", width: 80, sortable: true,menuDisabled:true, dataIndex: 'col'},
				{header: "��������", width: 80, sortable: true,menuDisabled:true, dataIndex: 'type',renderer:function(value, cellmeta, record){
					if(value=='string')return '�ı�';
					if(value=='int')return '����';
					if(value=='long')return '������';
					if(value=='double')return 'С��';
				}},
				{header: "�������ʽ", width: 180, sortable: true,menuDisabled:true, dataIndex: 'elstr'},
				{header: "����", width: 80, sortable: true,menuDisabled:true, dataIndex: 'pk',renderer:function(value, cellmeta, record){return value==1?"��":"��"}},
				{header: "�ǿ�", width: 80, sortable: true,menuDisabled:true, dataIndex: 'colcheck',renderer:function(value, cellmeta, record){return value=="1"||value==1?"��":"��"}},
				{header: "�޸�",width:50,menuDisabled:true,align:"center",renderer:function(value, cellmeta, record){return "<a href='#' ><img src='../ltext/images/bann_ico/edit.gif' width='15' height='16'  align='absmiddle' /></a>";}},
				{header: "ɾ��",width:50,menuDisabled:true,align:"center",renderer:function(value, cellmeta, record){return "<a href='#' ><img src='../ltext/images/bann_ico/del.gif' width='15' height='16'  align='absmiddle' /></a>";}}
			],
			stripeRows: true,
			listeners:{
				cellclick:function(grid,rowIndex,cellIndex,e){
					var _data=store.getAt(rowIndex).data;
					if(cellIndex==8){
						Ext.MessageBox.confirm("ɾ������", "�Ƿ�Ҫɾ�������ã�",function(btn) {
							if(btn!='yes')return;
							var boo=Ext.lt.RCP.asynserver("framework_fdisetting",'removeColConfig',  _data.code+"");
							if(boo=='true'||boo==true){
								Ext.MessageBox.alert("ɾ������", 'ɾ���ɹ�');
								init();
								_win.hide();
							}else{
								Ext.MessageBox.alert("ɾ������", 'ɾ��ʧ��');
							}
						});
						return;
					}
					if(cellIndex==7){
						_ctype=1;
						_rowIndex=rowIndex;
						_code=_data.code;
						_win.show();
				    	var items=_win.items.items;
				    	for(var i=0;i<items.length;i++){
				    		var value=_data[items[i].name];
				    		items[i].setValue(value);
				    	}
				    	return;
					}
				}
			}
   		});
   		function init(){
			Ext.lt.RCP.server("framework_fdisetting","loadCols",_subcode, function(resp) {
				store.loadData(resp);
			});
		}
    	return panel
	}
	var elementconfig=new Ext.Panel({
	 	activeItem:0,
	 	layout:'card',
	 	border:false, 
	 	enableTabScroll:true,
	 	region:'center',
	 	//title: "�ļ���������",
	 	items:[mainPanel(),childPanel()]
	});
  var _subcode=null;
  function showChildPanel(_data){
  	_subcode=_data.code;
  	Ext.lt.RCP.server("framework_fdisetting","loadCols",_data.code, function(resp) {
  		elementconfig.layout.setActiveItem(1);
		elementconfig.items.items[1].store.loadData(resp);
	});
  }
  return elementconfig;
}