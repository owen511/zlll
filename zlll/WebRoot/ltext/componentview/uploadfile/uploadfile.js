Ext.lt.console.component.uploadfile=function(sid,config){
	// ��ʼ��Extjs
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = 'side';
		var u=['Bytes','KB','MB','GB'];
		function load(i){
			Ext.lt.RCP.server("framework_filemanagement","loadFile2Folder",i, function(resp) {
				store.loadData(resp);
			});
		}
	//����˵����ݽṹ
		var fields=[{name:'name'},{name:'ext'},{name:'product'},{name:'inserttime'},{name:'updatetime'},{name:'size'},{name:'code'}];
		var store= new Ext.data.JsonStore({
			fields: fields
		});
		var msm= new Ext.grid.CheckboxSelectionModel({
			singleSelect:false	
		});
		var gpanel = new Ext.grid.GridPanel({
			layout:"fit", //panel����Ӧ
			border:false,
			store: store,
			region:'center',
			sm:msm,
			viewConfig: {forceFit:true},  
			columns: [  new Ext.grid.RowNumberer(),
				msm,
				{header: "�ļ�����", width: 180, sortable: true,menuDisabled:true, dataIndex: 'name'},
				{header: "�ļ�����", width: 180, sortable: true,menuDisabled:true, dataIndex: 'ext'},
				{header: "�ļ���С", width: 180, sortable: true,menuDisabled:true, dataIndex: 'size' ,renderer:function(value){
					function calculate(v,i){
						if(v<1000){
							return Math.round(v)+u[i];
						}else{
							return calculate(v/1024,i+1);
						}
					}
					 return calculate(value,0);
				}},
				{header: "�ϴ�ʱ��", width: 180, sortable: true,menuDisabled:true, dataIndex: 'inserttime'},
				{header: "�޸�ʱ��", width: 180, sortable: true,menuDisabled:true, dataIndex: 'updatetime'},
				{header: "��Ʒ����", width: 180, sortable: true,menuDisabled:true, dataIndex: 'product'}
			],
			stripeRows: true,
			tbar : [/*{
					pressed : true,
					text : '����',
					tooltip : "����"
				},'-',*/{
					pressed : true,
					text : 'ɾ��',
					tooltip : "ɾ��",
					handler : function(){
						if(msm.selections.length==0){
							Ext.MessageBox.alert("ɾ������", "��ѡ��Ҫɾ�����ļ�");
							return ;
						}
						var arr=[];
						var selections=msm.selections;
						for(var i=0;i<selections.getCount();i++){
							arr.push(selections.get(i).data.code);
						}
						var map={codes:arr};
						Ext.MessageBox.confirm("ɾ������", "�Ƿ�Ҫɾ�����ļ���",
							function(btn) {
								if (btn == "yes") {
									var message=Ext.lt.RCP.asynserver("framework_filemanagement","deleteFiles",map);
									var data=qt.getSelected()[0];
									load(data.itemid);
									Ext.MessageBox.alert("��ʾ��Ϣ",message);
								}
							});
					}
				},'-',{
					xtype : 'label',
					text : '�ļ��е�ַ��'
				},{
					id:'console_uploadfile_doc_config_url',
					xtype : 'label',
					lable : '�ļ��е�ַ',
					text : ''
				}]
		});

	var treedata=Ext.lt.RCP.asynserver ("framework_folder_service", "load", null) ;
	qd=new Ext.lt.recordset();
	qd.setData(treedata);
	var qt=new Ext.lt.Qtree({
		data:qd,
		field:{id:'itemid',sid:'sid',level:'level',isleaf:'isleaf'},
		outformart:'#name',
		showRootNode:false,
		rootNode:{itemid:'0',sid:'-1',name:'ȫ��',isleaf:0}
	});
	qt.on({
		nodeclick:function(tree,param){
			Ext.getCmp('console_uploadfile_doc_config_url').setText(param.data.href);
			load(param.data.itemid)
		}	
	});
	var panel=new Ext.Panel({
		title:'�ϴ��ļ�����',
  		layout:"border", //panel����Ӧ
		border:false,
		items:[new Ext.Panel({
				region:'west',
				width:250,
				html:'<div  id = "console_uploadfile_doc_config_tree" style="width:250px"></div>'
			}),gpanel]
	});
	var boo=false;
	function resize(){
		var file_info_tree=document.getElementById('console_uploadfile_doc_config_tree');
		var h=panel.getHeight()-2;
		file_info_tree.style.height=h;
	}
	panel.on('afterlayout',function(panel){
		if(!panel.drawing){
			setTimeout(function(){
				resize();
				if(!boo){
					qt.draw(document.getElementById('console_uploadfile_doc_config_tree'));
					boo=true;
				}
				panel.drawing=false
			},200);
			panel.drawing=true;
		}
	});
	return panel;
}