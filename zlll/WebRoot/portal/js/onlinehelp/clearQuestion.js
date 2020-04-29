Ext_lt_ClearQuestion = new function(){
	var PerCount = 20;//ÿҳ��ʾ��������С
	var curpage=1;//��ǰҳ
	var count=1;
	var filecount=1;//��������
	var userfile=1;//�û���������
	var questionname="";
    var questiontype="";
	var questionarea="";	
 	function findgridquestiontype(val){
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
	/***
	 * ����ʾ����
	 */
	var sm = new Ext.grid.CheckboxSelectionModel({checkOnly:true});//checkbox��ѡ��Ķ���
	var cm = new Ext.grid.ColumnModel([
		                   				new Ext.grid.RowNumberer(),
		                   				sm,
		                   				{header:'���',dataIndex:'itemid',width:30,sortable:true,menuDisabled:true},
		                   				{header:'���ʱ���',dataIndex:'questionname',sortable:true,menuDisabled:true},
		                   				{header:'��������',dataIndex:'questioncontent',hidden:true,menuDisabled:true},
		                   				{header:'���ʵ�λ',dataIndex:'questionagency',width:80,sortable:true,menuDisabled:true},
		                   				{header:'���ʵ���',dataIndex:'questionarea',hidden:clearset==0?true:false,width:50,sortable:true,menuDisabled:true},
		                   				{header:'����ʱ��',dataIndex:'questiondate',width:50,sortable:true,menuDisabled:true},
		                   				{header:'��ϵ�绰',dataIndex:'telnumber',hidden:true,sortable:true,menuDisabled:true},
		                   				{header:'��������',dataIndex:'questiontype',renderer:findgridquestiontype,width:60,sortable:true,menuDisabled:true},
		                   				{header:'��ʱ��',dataIndex:'answerdate',hidden:true,menuDisabled:true},
		                   				{header:'����',dataIndex:'answeruser',hidden:true,menuDisabled:true},
		                   				{header:'������',dataIndex:'questionuser',hidden:true,menuDisabled:true},
		                   				{header:'������',dataIndex:'answercontent',hidden:true,menuDisabled:true},
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
			{name: 'answerdate'},
			{name: 'answeruser'},
			{name: 'questionuser'},
			{name: 'answercontent'},
			{name: 'fileid'},
			{name: 'adminfileid'}
		  ])
		});
	store.load();
	var pager = new Ext.PagingToolbar({
			id:'Grid_Pager11',
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
	var clearquestionGrid = new Ext.grid.GridPanel({
		id:'clearquestionGrid',
		layout:'fit',
		columnLines: true,
		stripeRows:true,
		cm:cm,
		sm:sm,
		autoExpandColumn : 'questionname',
		bodyStyle:'width:100%',  
		autoWidth:true,  
		enableColumnMove:false,
		autoHeight: true,
		border:false,
		store:store,
		title:'',
		viewConfig:{
			forceFit:true,
			enableRowBody:true,
			showPreview:true
		},
		tbar: pager,
		listeners:{cellclick:function(grid, rowIndex, columnIndex, e){
			if(columnIndex!=1){
				var model = clearquestionGrid.getSelectionModel();
				if(model.isSelected(rowIndex)){
					 model.deselectRow(rowIndex);
				}else{
					 model.selectRow(rowIndex,rowIndex+1);
				}
			}	
		}}
	});
	//ɾ��--------------------------------------------------------------------------------------------------------
	clearquestionGrid.delGridPanel = function(){
		var rows = clearquestionGrid.getSelectionModel().getSelections();
		if(rows.length<1){
			alert("��ѡ��Ҫɾ��������");	
			return;
		}
		if(confirm("ȷ��ɾ��������")){
			var para = {};
			var codes ="";
			var delfiles ="";
			for(var i =0;i<rows.length;i++){
				codes+="'"+rows[i].get("itemid")+"',";
				if(rows[i].get("fileid")!=null&&rows[i].get("fileid")!=""){
				delfiles += "'"+rows[i].get("fileid")+"',";
				}
				if(rows[i].get("busfileid")!=null&&rows[i].get("busfileid")!=""){
					delfiles += "'"+rows[i].get("fileid")+"',";
				}
				if(rows[i].get("adminfileid")!=null&&rows[i].get("adminfileid")!=""){
					delfiles += "'"+rows[i].get("fileid")+"',";
				}
			}
			para.codes = codes;
			para.delfiles = delfiles;
			Ext.lt.RCP.script(onlinehelpurl,"adminhelp", "clear", para,function (resp) {
				curpage=1;
				//	count--;
				loadGridPanel(1);
			});
		}
	};
	/**
	 * �鿴����------------------------------------------------------------------
	 */
	clearquestionGrid.showpanel = function(){
			var rows = clearquestionGrid.getSelectionModel().getSelections();
			if(rows.length<1){alert("��ѡ��Ҫ�鿴������");return;}else if(rows.length>1){alert("��ѡ��һ�����ݲ鿴");return;}
			var shownewQuestionformdone = new Ext.form.FormPanel({
				id:'shownewQuestionformdone',
				labelWidth: 65,
				title: '������Ϣ��ϸ',
				frame:true,
				layout:'fit',
				height:475,
				items:[{
					layout:'column',
					items:[{
						columnWidth:.5,
						layout: 'form',
						items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'�� �� ��',id:'shownewQuestionform_questionPreson',anchor:'96%'},
						       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'���ʵ�λ',id:'shownewQuestionform_questionAgency',anchor:'96%'}]
					},{
						layout:'form',
						columnWidth:.5,
						items:[{
							columnWidth:.5,
							layout: 'form',
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'����ʱ��',id:'shownewQuestionform_questionTime',anchor:'96%'},
							       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��ϵ�绰',id:'shownewQuestionform_questionTelephone',anchor:'96%'}
							       ]
						}]
					},{
						layout:'form',
						columnWidth:.99,
						items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��������',id:'shownewQuestionform_questionType',anchor:'99%'}]
					},{
						layout:'form',
						columnWidth:.99,
						items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'���ʱ���',id:'shownewQuestionform_questionTitle',anchor:'99%'},
						       {xtype:'textarea',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��������',height:220,id:'shownewQuestionform_questionContent',anchor:'99%'}
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
				var temph = Ext.getCmp('shownewQuestionform_questionContent').height;
				temph=temph+20;
				Ext.getCmp('showfile').hide();
				Ext.getCmp('showfile').hideLabel=true;
				Ext.getCmp('shownewQuestionform_questionContent').setHeight(temph);
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
			supershowTabPanel.add(shownewQuestionformdone);
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
			var showwindone = new Ext.Window({
					buttonAlign: 'right',
					id:'showwin_newQuestion',
					width:800,
					autoHeight:true,
					closeAction:'close',
					modal: true,
					items:[supershowTabPanel],
					listeners: {'close': function() {
								filecount=1;
								answerfile=1;
							}}, 
					buttons:[{text :'��  ��',listeners:{'click':function(){showwindone.close();}}}]
				});
				Ext.getCmp("shownewQuestionform_questionPreson").setValue(rows[0].get("questionuser"));
				Ext.getCmp("shownewQuestionform_questionTime").setValue(rows[0].get("questiondate"));
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
				Ext.getCmp('shownewQuestionform_questionType').setValue(names);
				}	
				Ext.getCmp("shownewQuestionform_questionTelephone").setValue(rows[0].get("telnumber"));
				Ext.getCmp("shownewQuestionform_questionAgency").setValue(rows[0].get("questionagency"));
				Ext.getCmp("shownewQuestionform_questionTitle").setValue(rows[0].get("questionname"));
				Ext.getCmp("shownewQuestionform_questionContent").setValue(rows[0].get("questioncontent"));
				showwindone.show();
	}
	//	��ѯ
	function loadGridPanel(currentpage){
		var search = new Object();
		search.start=currentpage+"";
		search.typemap=typemap;
		//��������
		var searchcondition="";
		search.questionname = questionname;
		search.questiontype = questiontype;
		search.questionarea = questionarea;
		search.area=localquestionarea;
		Ext.lt.RCP.script(onlinehelpurl,"superadminhelp", "findallquestion", search,function (resp) {
			count=resp.result;
			if(count==0){
				count=1
			}
			store.loadData(resp);
			clearquestionGrid.doLayout();
		},function(){});
	}
	clearquestionGrid.loadGrid= function(search){
		curpage=1;
		search.start="1";
		search.typemap=typemap;
		search.area=localquestionarea;
		questionname=search.questionname!=undefined?search.questionname:"";
		questiontype=search.questiontype!=undefined?search.questiontype:"";
		questionarea=search.questionarea!=undefined?search.questionarea:"";
		Ext.lt.RCP.script(onlinehelpurl,"superadminhelp", "findallquestion", search,function (resp) {
			count=resp.result;
			if(count==0){
				count=1
			}
			store.loadData(resp);
			clearquestionGrid.doLayout();
		},function(){});
		
	}
	 /***
	 *�鿴��������-----------------------------------------------------------------------------------------------------
	 */
	clearquestionGrid.processflow = function(){
		var rows = clearquestionGrid.getSelectionModel().getSelections();
		if(rows.length<1){
				alert("��ѡ��Ҫ�鿴���̵�����");	return;
		}else if(rows.length>1){
				alert("��ѡ��һ������");return;
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
	loadGridPanel(1);
	return clearquestionGrid;
}