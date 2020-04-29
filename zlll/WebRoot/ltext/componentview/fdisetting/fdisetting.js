Ext.lt.console.component.fdisetting=function(sid,config){
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = 'side';
	//主表区
	function mainPanel(){
		
		//报表菜单数据结构
		var fields=[{name:'name'},{name:'titlerow'},{name:'product'},{name:'delimitercol'},{name:'delimiterline'},
		{name:'table'},{name:'repeatedtype'},{name:'repeatedwhere'},{name:'code'},{name:'affairstype'},{name:'_info'},{name:'infos'},{name:'_info'}];
		
		var store= new Ext.data.JsonStore({
			load: init(),
			fields: fields 
		});
		var _ctype=0;
		var _rowIndex=null;
		var gpanel = new Ext.grid.GridPanel({
			layout:"fit", //panel自适应
			border:false,
			store: store,
			region:'center',
			viewConfig: {forceFit:true},  
			columns: [
				{header: "配置编码", width: 130, sortable: true,menuDisabled:true, dataIndex: 'code'},
				{header: "配置名称", width: 130, sortable: true,menuDisabled:true, dataIndex: 'name'},
				{header: "表头行数", width: 80, sortable: true,menuDisabled:true, dataIndex: 'titlerow'},
				{header: "产品名", width: 180, sortable: true,menuDisabled:true, dataIndex: 'product',renderer:function(value){
					for(var i=0;i<_productdata.length;i++){
						if(value==_productdata[i].config)return _productdata[i].name;
					}
				}},
				{header: "表名", width: 180, sortable: true,menuDisabled:true, dataIndex: 'table'},
				{header: "纯文本列分隔符", width: 120, sortable: true,menuDisabled:true, dataIndex: 'delimitercol'},
				{header: "纯文本行分隔符", width: 120, sortable: true,menuDisabled:true, dataIndex: 'delimiterline'},
				{header: "事务处理", width: 180, sortable: true,menuDisabled:true, dataIndex: 'affairstype',renderer:function(v){
					if(v==1)return '未确认数据全部回滚';
					if(v==2)return '出现错误时不处理';
					if(v==3)return '出现错误时停止';
				}},
				{header: "重复数据操作", width: 180, sortable: true,menuDisabled:true, dataIndex: 'repeatedtype',renderer:function(v){
					if(v==0)return '重复数据不处理';
					if(v==1)return '删除之前存在的重复数据';
				}},
				{header: "修改",width:50,menuDisabled:true,align:"center",renderer:function(value, cellmeta, record){return "<a href='#' ><img src='../ltext/images/bann_ico/edit.gif' width='15' height='16'  align='absmiddle' /></a>";}},
				{header: "删除",width:50,menuDisabled:true,align:"center",renderer:function(value, cellmeta, record){return "<a href='#' ><img src='../ltext/images/bann_ico/del.gif' width='15' height='16'  align='absmiddle' /></a>";}},
				{header:"列详细配置", width:100, sortable:true, locked:false, align : "center", dataIndex:"ltableid",
					renderer:function(value) {
					 return "<a href='#' ><img src='../ltext/images/bann_ico/autoset.gif' width='15' height='16'  align='absmiddle' /></a>";
				}}],
			stripeRows: true,
			listeners:{
				cellclick:function(grid,rowIndex,cellIndex,e){
					var _data=store.getAt(rowIndex).data;
					if(cellIndex==10){
						Ext.MessageBox.confirm("删除操作", "是否要删除该配置？",function(btn) {
							if(btn!='yes')return;
							var boo=Ext.lt.RCP.asynserver("framework_fdisetting",'removeConfig',  _data.code+"");
							if(boo=='true'||boo==true){
								Ext.MessageBox.alert("删除操作", '删除成功');
								init();
								_win.hide();
							}else{
								Ext.MessageBox.alert("删除操作", '删除失败');
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
			title : '配置窗口',
			width : 350,
			height : 420,
			layout : 'form',
			plain : true,
			closeAction : 'hide',
			bodyStyle : 'pfFing:5px;',
			modal : true,
			items : [new Ext.form.TextField ({
					fieldLabel:"配置编码<span style='color:red'>*</span>",
					name:"code",
					anchor: '99%',
					maxLength:50,
					maxLengthText:"只能输入50个汉字！",
					allowBlank:false,
					blankText:"配置编码不能为空！",
					regex : /^[\u4e00-\u9fa5a-zA-Z0-9_]+$/,
					regexText:'只能输入汉字、字母、数字和下划线！'
				}),new Ext.form.TextField ({
					fieldLabel:"配置名称<span style='color:red'>*</span>",
					name:"name",
					anchor: '99%',
					maxLength:50,
					maxLengthText:"只能输入50个汉字！",
					allowBlank:false,
					blankText:"配置名称不能为空！",
					regex : /^[\u4e00-\u9fa5a-zA-Z0-9_]+$/,
					regexText:'只能输入汉字、字母、数字和下划线！'
				}),new Ext.form.ComboBox ({
					fieldLabel:"产品名称<span style='color:red'>*</span>",
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
      				blankText:"不允许为空！",
					editable:false
				}),new Ext.form.NumberField({
					fieldLabel:"表头行数<span style='color:red'>*</span>",
					name:"titlerow",
					anchor: '99%',
					maxLength:5,
					maxLengthText:"只能输入5个长度！",
					blankText:"表名称不能为空！",
					value:0
				}),new Ext.form.TextField({
					fieldLabel:"表名<span style='color:red'>*</span>",
					name:"table",
					anchor: '99%',
					maxLength:50,
					maxLengthText:"只能输入50个字符！",
					allowBlank:false,
					blankText:"表名称不能为空！",
					regex : /^[\u4e00-\u9fa5a-zA-Z0-9_]+$/,
					regexText:'只能输入汉字、字母、数字和下划线！'
				}),new Ext.form.TextField({
					fieldLabel:"纯文本列分隔符",
					name:"delimitercol",
					anchor: '99%',
					maxLength:10,
					maxLengthText:"只能输入10个字符！"
				}),new Ext.form.TextField({
					fieldLabel:"纯文本行分隔符",
					name:"delimiterline",
					anchor: '99%',
					maxLength:10,
					maxLengthText:"只能输入10个字符！"
				}),new Ext.form.ComboBox ({
					fieldLabel:"事务处理方式",
					name:"affairstype",
					anchor: '99%',
					store: new Ext.data.SimpleStore({
						fields : ['value', 'name'],
						data : [[1, '未确认数据全部回滚'],[2, '出现错误时不处理'],[3, '出现错误时停止']]
					}),
					displayField:'name',
					valueField :'value',
					typeAhead: true,
				  	mode: 'local',
				  	triggerAction: 'all',
					editable:false,
					value:2
				}),new Ext.form.ComboBox ({
					fieldLabel:"重复数据操作",
					name:"repeatedtype",
					anchor: '99%',
					store: new Ext.data.SimpleStore({
						fields : ['value', 'name'],
						data : [[0, '重复数据不处理'],[1, '删除之前存在的重复数据']]
					}),
					displayField:'name',
					valueField :'value',
					typeAhead: true,
				  	mode: 'local',
				  	triggerAction: 'all',
					editable:false,
					value:1
				}),new Ext.form.TextArea ({
					fieldLabel:"重复数据过滤语句",
					name:"repeatedwhere",
					anchor: '99%',
					maxLength:1000,
					maxLengthText:"只能输入1000个字符！"
				})
				,new Ext.form.Label ({html   :"行分割符和列分割符仅在纯文本导入时使用"})],
			buttons:[
				{
					text : '确定',
					handler : function() {
						var items=_win.items.items;
						var o={};
						for(var i=0;i<items.length-1;i++){
							o[items[i].name]=items[i].getValue();
							if(items[i].maxLength!=null&&items[i].getValue().length>items[i].maxLength){
								Ext.MessageBox.alert("保存操作", '有数据项长度过长');
								return ;
							}
							if(items[i].fieldLabel.indexOf('*')!=-1&&(items[i].getValue()+''==''||items[i].getValue()==null)){
								Ext.MessageBox.alert("保存操作", '有非空数据项未填写');
								return ;
							}
							
						}
						
						var regex = /^[\u4e00-\u9fa5a-zA-Z0-9_]+$/;
						//验证特殊字符 
						if(!Ext.lt.util.checkData(o.code)){
							Ext.MessageBox.alert("保存操作", '只能输入汉字、字母、数字和下划线！');
							return;
						}
						if(!Ext.lt.util.checkData(o.name)){
							Ext.MessageBox.alert("保存操作", '只能输入汉字、字母、数字和下划线！');
							return;
						}
						if(!Ext.lt.util.checkData(o.table)){
							Ext.MessageBox.alert("保存操作", '只能输入汉字、字母、数字和下划线！');
							return;
						}
						for(var i=0;i<store.data.length;i++){
							if(store.getAt(i).data.code==o.code&&_rowIndex!=i){
								Ext.MessageBox.alert("保存操作", '编码重复');
								return ;
							}
						}
						var boo=Ext.lt.RCP.asynserver("framework_fdisetting", _ctype==0?'save':'updateConfig',  o);
						if(boo=='true'||boo==true){
							Ext.MessageBox.alert("保存操作", '保存成功');
							init();
							_win.hide();
						}else{
							Ext.MessageBox.alert("保存操作", '保存失败');
						}
					}
				}, {
					text : '取消',
					handler : function() {
						_win.hide();
					}
				}
			],
			buttonAlign:'center'
		});
	var _name=new Ext.form.TextField({fieldLabel: '配置名称',name: 'name',anchor: '99%'});
    var _product=new Ext.form.ComboBox ({
		fieldLabel:"产品名称",
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
    var _addbutton=new Ext.Button({text: '新增',handler: function(){
    	_win.show();
    	_win.items.items[0].setDisabled(false);
    	_ctype=0;
    	_rowIndex=-1;
    	var items=_win.items.items;
    	for(var i=0;i<=items.length-2;i++){
    		items[i].reset();
    	}
    }});
    
    var _querybutton=new Ext.Button({text: '查询',handler: function(){
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
    	layout:'column', //panel自适应
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
	    	title: "配置信息",
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
		//报表菜单数据结构
		var fields=[{name:'name'},{name:'col'},{name:'index'},{name:'elstr'},{name:'code'},{name:'pcode'},{name:'type'},{name:'pk'},{name:'colcheck'}];
		
		var store= new Ext.data.JsonStore({
			fields: fields 
		});
		var _win=new Ext.Window({
			title : '配置窗口',
			width : 350,
			height : 300,
			layout : 'form',
			plain : true,
			closeAction : 'hide',
			bodyStyle : 'padding:5px;',
			modal : true,
			items : [new Ext.form.TextField ({
					fieldLabel:"名称*",
					name:'name',
					anchor: '99%',
					maxLength:50,
					maxLengthText:"只能输入50个汉字！",
					allowBlank:false,
					blankText:"名称不能为空！",
					regex : /^[\u4e00-\u9fa5a-zA-Z0-9_]+$/,
					regexText:'只能输入汉字、字母、数字和下划线！'
				}),new Ext.form.TextField ({
					fieldLabel:"数据库列名*",
					anchor: '99%',
					name:'col',
					maxLength:50,
					maxLengthText:"只能输入50个汉字！",
					allowBlank:false,
					blankText:"数据库列名不能为空！",
					regex : /^[\u4e00-\u9fa5a-zA-Z0-9_]+$/,
					regexText:'只能输入汉字、字母、数字和下划线！'
				}),new Ext.form.ComboBox ({
					fieldLabel:"数据类型*",
					name:"type",
					anchor: '99%',
					store: new Ext.data.SimpleStore({
						fields : ['value', 'name'],
						data : [['string', '文本'],['int', '整型'],['long', '长整型'],['double', '小数']]
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
					fieldLabel:"导入文件列索引*",
					name:'index',
					anchor: '99%',
					maxLength:5,
					maxLengthText:"只能输入5个长度！",
					blankText:"导入文件列索引不能为空！"
				}),new Ext.form.TextArea ({
					fieldLabel:"函数表达式",
					anchor: '99%',
					name:'el',
					maxLength:500,
					maxLengthText:"只能输入500个汉字！"
				}),new Ext.form.Checkbox ({
					name:'pk',
					fieldLabel:"主键",
					anchor: '99%'
				}),new Ext.form.Checkbox ({
					name:'colcheck',
					fieldLabel:"非空",
					anchor: '99%'
				})],
				buttons:[
				{
					text : '确定',
					handler : function() {
						var items=_win.items.items;
						var o={pcode:_subcode,code:_code};
						for(var i=0;i<items.length;i++){
							o[items[i].name]=items[i].getValue();
							if(items[i].maxLength!=null&&items[i].getValue().length>items[i].maxLength){
								Ext.MessageBox.alert("保存操作", '有数据项长度过长');
								return ;
							}
							if(items[i].fieldLabel.indexOf('*')!=-1&&(items[i].getValue()+''==''||items[i].getValue()==null)){
								Ext.MessageBox.alert("保存操作", '有非空数据项未填写');
								return ;
							}
						}
						//验证特殊字符 
						if(!Ext.lt.util.checkData(o.name)){
							Ext.MessageBox.alert("保存操作", '只能输入汉字、字母、数字和下划线！');
							return;
						}
						if(!Ext.lt.util.checkData(o.col)){
							Ext.MessageBox.alert("保存操作", '只能输入汉字、字母、数字和下划线！');
							return;
						}
						for(var i=0;i<store.data.length;i++){
							if(store.getAt(i).data.index==o.index&&_rowIndex!=i){
								Ext.MessageBox.alert("保存操作", '导入文件索引列重复');
								return ;
							}
							if(store.getAt(i).data.col==o.col&&_rowIndex!=i){
								Ext.MessageBox.alert("保存操作", '导入列重复');
								return ;
							}
						}
						o.pk=o.pk?1:0;
						o.colcheck=o.colcheck?1:0;
						var boo=Ext.lt.RCP.asynserver("framework_fdisetting", _ctype==0?'saveCol':'updataColConfig',  o);
						if(boo=='true'||boo==true){
							Ext.MessageBox.alert("保存操作", '保存成功');
							init();
							_win.hide();
						}else{
							Ext.MessageBox.alert("保存操作", '保存失败');
						}
					}
				}, {
					text : '取消',
					handler : function() {
						_win.hide();
					}
				}
			],
			buttonAlign:'center'
		});
		var panel = new Ext.grid.GridPanel({ 
			title:"列详细信息配置",
			layout:"fit", //panel自适应
			border:false,
			store: store,
			region:'center',
			viewConfig: {forceFit:true},
			tbar:[{
				text:"新增配置", 
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
				{	text:"返回配置信息", 
				pressed:true,
				handler:function(){
					elementconfig.layout.setActiveItem(0); 
				}
			}],
			columns: [
				{header: "导入文件列索引", width: 80, sortable: true,menuDisabled:true, dataIndex: 'index'},
				{header: "名称", width: 180, sortable: true,menuDisabled:true, dataIndex: 'name'},
				{header: "数据库列", width: 80, sortable: true,menuDisabled:true, dataIndex: 'col'},
				{header: "数据类型", width: 80, sortable: true,menuDisabled:true, dataIndex: 'type',renderer:function(value, cellmeta, record){
					if(value=='string')return '文本';
					if(value=='int')return '整型';
					if(value=='long')return '长整型';
					if(value=='double')return '小数';
				}},
				{header: "函数表达式", width: 180, sortable: true,menuDisabled:true, dataIndex: 'elstr'},
				{header: "主键", width: 80, sortable: true,menuDisabled:true, dataIndex: 'pk',renderer:function(value, cellmeta, record){return value==1?"是":"否"}},
				{header: "非空", width: 80, sortable: true,menuDisabled:true, dataIndex: 'colcheck',renderer:function(value, cellmeta, record){return value=="1"||value==1?"是":"否"}},
				{header: "修改",width:50,menuDisabled:true,align:"center",renderer:function(value, cellmeta, record){return "<a href='#' ><img src='../ltext/images/bann_ico/edit.gif' width='15' height='16'  align='absmiddle' /></a>";}},
				{header: "删除",width:50,menuDisabled:true,align:"center",renderer:function(value, cellmeta, record){return "<a href='#' ><img src='../ltext/images/bann_ico/del.gif' width='15' height='16'  align='absmiddle' /></a>";}}
			],
			stripeRows: true,
			listeners:{
				cellclick:function(grid,rowIndex,cellIndex,e){
					var _data=store.getAt(rowIndex).data;
					if(cellIndex==8){
						Ext.MessageBox.confirm("删除操作", "是否要删除该配置？",function(btn) {
							if(btn!='yes')return;
							var boo=Ext.lt.RCP.asynserver("framework_fdisetting",'removeColConfig',  _data.code+"");
							if(boo=='true'||boo==true){
								Ext.MessageBox.alert("删除操作", '删除成功');
								init();
								_win.hide();
							}else{
								Ext.MessageBox.alert("删除操作", '删除失败');
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
	 	//title: "文件导入配置",
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