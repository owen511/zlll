Ext_lt_NewAdminQuestion = new function(){
		var PerCount = 20;//ÿҳ��ʾ��������С
		var curpage=1;//��ǰҳ
		var count=1;
		var filecount=1;//��������
		var userfile=1;//�û���������
	//�Ѵ���----------------------------------------------------------------------------
	var fasptableData = [
	     				['0','����'],
	     				['1','�Ѵ�'],
	     				['4','�û��˻�'],
	     				['3','����ר��'],
	     				['2','�����ϼ�'],
	     				['5','�ѽ��'],
	     				['6','ר���Ѵ�']
	     	];
	var elementcodeStroe = new Ext.data.SimpleStore({
		fields: ['value', 'text'],
		data:fasptableData
	});
	
    function questionresultState(val){
	  			val=val+"";
				if(val.indexOf(usertype+"0")!=-1){
					return '<div style=\'color:#FF0000\'>'+'����'+'</div>'
				}else if(val.indexOf(usertype+"1")!=-1){
					return '<div style=\'color:#0000FF\'>'+'�Ѵ�'+'</div>'
				}else if(val.indexOf(usertype+"4")!=-1){
					return '<div style=\'color:#AA7700\'>'+'�û��˻�'+'</div>'
				}else if(val.indexOf(usertype+"3")!=-1){
					return '<div style=\'color:\'>'+'����ר��'+'</div>'
				}else if(val.indexOf(usertype+"2")!=-1){
					return '<div style=\'color:#AA7700\'>'+'�����ϼ�'+'</div>'
				}else if(val.indexOf(usertype+"6")!=-1){
					return '<div style=\'color:#00FF00\'>'+'ר���Ѵ�'+'</div>'
				}else{
					return '<div style=\'color:#00FF00\'>'+'�ѽ��'+'</div>'
				}
		}
	function findgridquestiontype(val){
		if(val==null||val.length==0)return "" ;
		var results="";
		var types = val.split(',');
		for(var z=0;z<typemap.length;z++){
			for(var k = 0;k < types.length;k ++){
				if(typemap[z].itemid == types[k]){
					results += typemap[z].name+"��";
				}
			}	
		}
		results = results.substr(0,results.length-1);
		return results;
	}
	function findgridleveltype(val){
		if(val==null||val.length==0)return "" ;
		for(var z=0;z<(levelmap.data).length;z++){
			if(levelmap.data[z].itemid==val){
				return levelmap.data[z].questionlevel;
			}
		}     
	}
	//--------------------------------------
	/***
	 * ����ʾ����
	 */
	var sm = new Ext.grid.CheckboxSelectionModel({checkOnly:true});//checkbox��ѡ��Ķ���
	var cm = new Ext.grid.ColumnModel([
		                   				new Ext.grid.RowNumberer(),
		                   				sm,
		                   				{header:'���',dataIndex:'itemid',width:30,sortable:true,menuDisabled:true},
		                   				{header:'���ʱ���',dataIndex:'questionname',sortable:true,menuDisabled:true},
		                   				{header:'��������',dataIndex:'questioncontent',hidden:true,width:200,menuDisabled:true},
		                   				{header:'���ʵ�λ',dataIndex:'questionagency',width:60,sortable:true,menuDisabled:true},
		                   				{header:'���ʵ���',dataIndex:'questionarea',hidden:adminset==0?true:false,width:50,sortable:true,menuDisabled:true},
		                   				{header:'����ʱ��',dataIndex:'questiondate',width:50,sortable:true,menuDisabled:true},
		                   				{header:'��ϵ�绰',dataIndex:'telnumber',hidden:true,sortable:true,menuDisabled:true},
		                   				{header:'��������',dataIndex:'questiontype',renderer:findgridquestiontype,width:60,sortable:true,menuDisabled:true},
				                   		{header:'��������',dataIndex:'leveltype',renderer:findgridleveltype,width:30,sortable:true,menuDisabled:true},
		                   				{header:'����״̬',dataIndex:'adminstatus',renderer:questionresultState,width:30,sortable:true,menuDisabled:true},
		                   				{header:'��ʱ��',dataIndex:'answerdate',width:100,hidden:true,menuDisabled:true},
		                   				{header:'����',dataIndex:'answeruser',width:200,hidden:true,menuDisabled:true},
		                   				{header:'������',dataIndex:'questionuser',width:200,hidden:true,menuDisabled:true},
		                   				{header:'������',dataIndex:'answercontent',width:200,hidden:true,menuDisabled:true},
		                   				{header:'����id',dataIndex:'fileid',hidden:true,menuDisabled:true},
		                   				{header:'����Ա����id',dataIndex:'adminfileid',hidden:true,menuDisabled:true}
		                   			]);
		var data ={result:0,data:[]};
		var store = new Ext.data.Store({
			proxy: new Ext.data.MemoryProxy(data),
			reader: new Ext.data.JsonReader({totalProperty:'results',  
				   root:'data' }, [
			{name: 'itemid'},
			{name: 'questionname'},
			{name: 'questioncontent'},
			{name: 'questionagency'},
			{name: 'questionarea'},
			{name: 'questiondate'},
			{name: 'telnumber'},
			{name: 'questiontype'},
			{name: 'leveltype'},
			{name: 'adminstatus'},
			{name: 'answerdate'},
			{name: 'answeruser'},
			{name: 'questionuser'},
			{name: 'answercontent'},
			{name: 'fileid'},
			{name: 'adminfileid'}
		  ])
		});
	store.load();
	 var pager = 	new Ext.PagingToolbar({
			id:'Grid_Pager2',
			afterPageText: '/ {0}',
		    beforePageText: 'ҳ',
			pageSize:PerCount,
			store:store,
			displayInfo: true,   
			firstText: '��һҳ',
			prevText: 'ǰһҳ',
			nextText: '��һҳ',
			lastText: '���һҳ',
			refreshText: 'ˢ��',
			emptyMsg: "û�м�¼",
				moveNext:function(){//��һҳ
		  			    curpage++;
		  			    loadGridPanel(curpage);
		   		},
		   		moveFirst: function(){
		   			  curpage=1;
		   			  loadGridPanel(curpage);
		   		},
			   movePrevious : function(){
			    	curpage--;
			   	  loadGridPanel(curpage);
			   },
			   moveLast : function(){
			    	curpage=count;
			   	  loadGridPanel(curpage);
			   },
			   doRefresh:function(){//ˢ�·���
				},
			   updateInfo:function (){//��дUpdateInfo        
				 },
		        onLoad:function (store,r,o){//��дOnLoad
			    			if(!this.rendered) {                
							      this.dsLoaded=[store,r,o];                
							      return ; 
					     	}    
							  this.afterTextItem.setText(String.format(this.afterPageText, count));
							  this.inputItem.setValue(curpage);  
							  if(count==0){
							  		 this.inputItem.setValue(0);  
							  	}    
								this.first.setDisabled(curpage==1|| count == 0);            
								this.prev.setDisabled(curpage==1|| count == 0);            
								this.next.setDisabled(curpage==count|| count == 0);            
								this.last.setDisabled(curpage==count|| count == 0); 
				 },        
				 doLoad:function (start){//��дdoLoad  
				  	var curinput = this.inputItem.getValue();
						if(curpage!=curinput){
									curpage = curinput;
									if(curinput>count){
											 curpage=count;
									}else if(curinput<=0){
												curpage=1;
									}
								  loadGridPanel(curpage);
						}
					
					   	     this.inputItem.setValue(curpage);
				 },        
				 getPageData:function (){//��дgetPageData 
					    return  { total:count, 
				  		activePage:curpage,
				  		pages:count
				  		};
				 }
		});
	var adminnewquestionGrid = new Ext.grid.GridPanel({
		id:'adminnewquestionGrid',
		layout:'fit',
		columnLines: true,
		stripeRows:true,
		cm:cm,
		sm:sm,
		enableColumnMove:false,
		autoHeight: true,
		border:false,
		store:store,
		title:'�Ѵ���',
		viewConfig:{
			forceFit:true,
			enableRowBody:true,
			showPreview:true
		},
		tbar: pager,
		listeners:{cellclick:function(grid, rowIndex, columnIndex, e){
			if(columnIndex!=1){
				var model = adminnewquestionGrid.getSelectionModel();
				if(model.isSelected(rowIndex)){
					 model.deselectRow(rowIndex);
				}else{
					 model.selectRow(rowIndex,rowIndex+1);
				}
			}	
		}}
	});
	//------------------------------------------------------------------
	/***
	 * �鿴����
	 */
	adminnewquestionGrid.showpanel = function(){
		var rows = adminnewquestionGrid.getSelectionModel().getSelections();
		if(rows.length<1){alert("��ѡ��Ҫ�鿴������");return;}else if(rows.length>1){alert("��ѡ��һ�����ݲ鿴");return;}
		var val=rows[0].get("adminstatus")+"";
		var showadmindoneform = new Ext.form.FormPanel({
				id:'showadmindoneform',
				labelWidth:65 , 
				title: '������Ϣ��ϸ',
				frame:true,
				layout:'fit',
				height:400,
				items:[{
					layout:'column',
					items:[{
						columnWidth:.5,
						layout: 'form',
						items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'�� �� �� ',id:'showadmindone_questionuser',name:'',anchor:'96%'},
						       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'���ʵ�λ',id:'showadmindone_questionagency',name:'',anchor:'96%'},
						       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��������',id:'showadmindone_questiontype',anchor:'96%'}
						]
					},{
						layout:'form',
						columnWidth:.5,
						items:[{
								columnWidth:.5,
								layout: 'form',
								items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'����ʱ��',id:'showadmindone_questiondate',anchor:'96%'},
							       	   {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��ϵ�绰',id:'showadmindone_questiondtel',anchor:'96%'}
								  ]
							  },{
								layout: 'column',
								items:[{
										columnWidth:.5,
										layout: 'form',
										items:[{xtype:'combo',readOnly:true,style:'background:#E6E6E6',fieldLabel:'����״̬',id:'showadmindone_questionstatus',anchor:'92%'
									    	  ,displayField:'text',
								               valueField:'value',
								               triggerAction:"all",
								               typeAhead: true,
							                   store:elementcodeStroe
								   	   }]
							 	 },{
										columnWidth:.5,
										layout: 'form',
										items:[{xtype:'combo',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��������',id:'adminleveltype',anchor:'92%',
								                  displayField:"questionlevel",
								                  valueField:"itemid",
								                  triggerAction:"all",
								              	  typeAhead: true,
								                  store:levelstore
								   	   }]
							 	  }]
							  }]
					  }
					,{
						layout:'form',
						columnWidth:.99,
						items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'���ʱ���',id:'showadmindone_questionname',anchor:'99%'},
							{xtype:'textarea',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��������',height:220,id:'showadmindone_questioncontent',anchor:'99%'}
						]
					},{
						layout:'form',
						columnWidth:.99,
						items:[{
							  xtype:"displayfield",       
						      name:"content",   
						      id:'showfile',    
						      fieldLabel: '��&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp��',     
						      value:''  
						 }]
					}]
				}]
			});
			//�鿴����
			var fileids = rows[0].get("fileid");
			if(fileids!=null&&fileids!=""){
				//��ѯ��������
			    Ext.lt.RCP.script(onlinehelpurl,"useonliehelp", "findfilename", fileids,function (resp) {
	  				  	Ext.getCmp('showfile').show();
	  					Ext.getCmp('showfile').setValue('<a href="'+onlinehelpurl+'/portaldownloadfile.page?path='+fileids+'">'+resp[0]+'</a>');
			    });
			}else{
				var temph = Ext.getCmp('showadmindone_questioncontent').height;
				temph=temph+20;
				Ext.getCmp('showfile').hide();
				Ext.getCmp('showfile').hideLabel=true;
				Ext.getCmp('showadmindone_questioncontent').setHeight(temph);
			}
			//�鿴�����tabpanel
			var supershowTabPanel = new Ext.TabPanel({
				height:400,
				width:780,
				region : 'center',  
				autoScroll:true,
				enableTabScroll:true,
		        activeTab: 0,
		        border:false,
		        plain:true,
		        defaults:{autoScroll: true},
	        	listeners: {
		  			'tabchange': function(t, p) {
					 }
				}	
			});
			supershowTabPanel.add(showadmindoneform);
			//��ѯ���д𸴼�¼������̬���tabҳ
			Ext.lt.RCP.script(onlinehelpurl,"useonliehelp", "showquestion", rows[0].get("itemid") ,function (resp) {
					for(var k = 0;k < resp.length;k ++){
						var opp=resp[k];
						var operateuser=opp.operateuser;
						var operatedate=opp.operatedate;
						var operatetype=opp.operatetype;
						var content=opp.content;
						var fileid = opp.fileid;
						var filename=opp.filename;
						var titlename="����Ϣ";
						if(operatetype==1){
							titlename="һ��֧�ִ�";
						}else if(operatetype==2){
							titlename="����֧�ִ�";
						}else if(operatetype==8){
							titlename="ר�Ҵ�";
						}else if(operatetype==9){
							titlename="����˴�";
						}
						var form = new Ext.form.FormPanel({
							id:'from'+k,
							title:titlename,
							frame:true,
							labelWidth:65,
							layout:'fit',
							//closable:true,
							height:400,
							items:[{
								layout:'column',
								items:[{
									columnWidth:.5,
									layout: 'form',
									items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',value:operateuser,fieldLabel:'�� �� �� ',id:'',anchor:'96%'}]
								},{
									columnWidth:.5,
									layout: 'form',
									items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',value:operatedate,fieldLabel:'��ʱ��',id:'',anchor:'96%'}]
								},{
									layout:'form',
									columnWidth:.99,
									items:[{xtype:'textarea',readOnly:true,style:'background:#E6E6E6',value:content,fieldLabel:'������',height:300,id:'anscontent'+k,anchor:'99%'}]
								},{
									layout:'form',
									columnWidth:.99,
									items:[{
										  xtype:"displayfield",       
									      name:"content",   
									      id:'showfile'+k,
									      fieldLabel: '��&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp��',     
									      value:''    
									  }]
								 }]
							}]
						});
						//�鿴����
						if(fileid!=null&&fileid!=""){
							Ext.getCmp('showfile'+k).setValue('<a href="'+onlinehelpurl+'/portaldownloadfile.page?path='+fileid+'">'+filename+'</a>');
						}else{
							var temph = Ext.getCmp('anscontent'+k).height;
							temph=temph+20;
							Ext.getCmp('showfile'+k).hide();
							Ext.getCmp('showfile'+k).hideLabel=true;
							Ext.getCmp('anscontent'+k).setHeight(temph);
						}
						supershowTabPanel.add(form);
					}
	   		});
	   		//�鿴�����window
			var showadmindonewin = new Ext.Window({
				buttonAlign: 'right',
				id:'showadmindonewin',
				width:800,
				autoHeight:true,
				closeAction:'close',
				modal: true,
				items:[supershowTabPanel],
				listeners: {
				'close': function() {filecount=1; userfile=1;} 
				},
				buttons:[{text :'��  ��',listeners:{'click':function(){showadmindonewin.close();}}}]
			});
			Ext.getCmp("showadmindone_questionuser").setValue(rows[0].get("questionuser"));
			Ext.getCmp("showadmindone_questiondate").setValue(rows[0].get("questiondate"));
			var status = rows[0].get("adminstatus");
			var s = status.split(",");
			for(var i = 0;i<s.length;i++){
				if(s[i].indexOf(usertype)==0){
					Ext.getCmp("showadmindone_questionstatus").setValue(s[i].substr(1,1));
				}
			} 
			var level = rows[0].get("leveltype");
			Ext.getCmp("adminleveltype").setValue(level);
			if(rows[0].get("questiontype")!=0){
				var names = "";
				var types = (rows[0].get("questiontype")).split(',');
				for(var z=0;z<typemap.length;z++){
					for(var k = 0;k < types.length;k ++){
						if(typemap[z].itemid==types[k]){
							names+=typemap[z].name+",";
						}
					}
				}
				names = names.substr(0,names.length-1);
				Ext.getCmp('showadmindone_questiontype').setValue(names);
			}
			Ext.getCmp("showadmindone_questiondtel").setValue(rows[0].get("telnumber"));
			Ext.getCmp("showadmindone_questionagency").setValue(rows[0].get("questionagency"));
			Ext.getCmp("showadmindone_questionname").setValue(rows[0].get("questionname"));
			Ext.getCmp("showadmindone_questioncontent").setValue(rows[0].get("questioncontent"));
			showadmindonewin.show();
	}

	//	��ѯ
	function loadGridPanel(currentpage){
		var search = new Object();
		search.flag="1";
		search.start=currentpage+"";
		search.questionname = questionname;
		search.questiontype = questiontype;
		search.questionarea = questionarea;
		search.area=localquestionarea;
		search.usercode=usercode;
		search.username=username;
		search.usertype=usertype;
		search.typemap=typemap;
		Ext.lt.RCP.script(onlinehelpurl,"adminhelp", "query", search,function (resp) {
			count=resp.result;
			if(count==0){
				count=1
			}
			store.loadData(resp);
			adminnewquestionGrid.doLayout();
		},function(){});
	}
	adminnewquestionGrid.loadGrid= function(search){
		search.area=localquestionarea;
		search.usercode=usercode;
		search.username=username;
		search.usertype=usertype;
		search.typemap=typemap;
		curpage=1;
		search.start="1";
		Ext.lt.RCP.script(onlinehelpurl,"adminhelp", "query", search,function (resp) {
			count=resp.result;
			if(count==0){
				count=1
			}
			store.loadData(resp);
			adminnewquestionGrid.doLayout();
		},function(){});
		
	}
	 /***
	 *�鿴��������-----------------------------------------------------------------------------------------------------
	 */
	adminnewquestionGrid.processflow = function(){
		var rows = adminnewquestionGrid.getSelectionModel().getSelections();
		if(rows.length<1){
				alert("��ѡ��Ҫ�鿴���̵�����");	
			return;
		}else if(rows.length>1){
				alert("��ѡ��һ������");
				return;
		}
	    var cm = new Ext.grid.ColumnModel([
		                   				new Ext.grid.RowNumberer(),
  	                   				     {header:'������',dataIndex:'operateuser',sortable:true,menuDisabled:true},
		                   				 {header:'����ʱ��',dataIndex:'operatedate',sortable:true,menuDisabled:true},
		       							 {header:'����',dataIndex:'operate',sortable:true,menuDisabled:true}
		                   			    ]);
		var data;
		var store = new Ext.data.Store({
			proxy: new Ext.data.MemoryProxy(data),
			reader: new Ext.data.JsonReader({}, [
			{name: 'operateuser'},
			{name: 'operatedate'},
			{name: 'operate'}
		  ])
		});
		store.load();
		
		var mygrid = new Ext.grid.GridPanel({
			title:'���⴦������',
			layout:'fit',
			columnLines: true,
			stripeRows:true,
			cm:cm,
			enableColumnMove:false,
			height:285,
			autoScroll:true,
			border:false,
			store:store,
			viewConfig:{
				forceFit:true,
				enableRowBody:true,
				showPreview:true
			}
	   });
	   //�鿴�������̵�window
	   var mywin = new Ext.Window({
					buttonAlign: 'right',
					width:500,
					height:350,
					closeAction:'close',
					modal: true,
					items:[mygrid],
					buttons:[{text :'��  ��',listeners:{'click':function(){mywin.close();}}}]
	   });
	   mywin.show();
	   var itemid = rows[0].get("itemid");
	   Ext.lt.RCP.script(onlinehelpurl,"useonliehelp", "findprocess", itemid,function (resp) {
					store.loadData(resp);
					mygrid.doLayout();
	   });
	}
	//loadGridPanel(1);
	return adminnewquestionGrid;
}