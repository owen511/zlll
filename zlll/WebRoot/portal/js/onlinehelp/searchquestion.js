Ext_lt_SearchQuestion = new function(){
		var PerCount = 20;//ÿҳ��ʾ��������С
		var curpage=1;//��ǰҳ
		var count=1;
		var tempsearchid=0;
		var filecount=1;//��������
		var answerfile=1;//��������
		var questionuser="";
	    var questionagency="";
		var questionname="";
		var questioncontent="";
		var questionstartdate="";
		var questionenddate="";
		var questionansweruser="";
		//��������
		var searchcondition="";
		//������----------------------------------------------------------------------------
		var fasptableData = [
		     		        ['0','����'],
		     		        ['1','�Ѵ�'],
		     		        ['2','���δͨ��'],
		     				['3','����������'],
		     				['4','���ͨ��']
		     	];
		var elementcodeStroe = new Ext.data.SimpleStore({
			fields: ['value', 'text'],
			data:fasptableData
		});
		//--------------------------------------
		function questionresultState(val){
			if(val==0){
				return '<div style=\'color:#0000FF\'>'+'����'+'</div>'
			}else if(val==1){
				return '<div style=\'color:#FFFF00\'>'+'�Ѵ�'+'</div>'
			}else if(val==2){
				return '<div style=\'color:#FFFF00\'>'+'���δͨ��'+'</div>'
			}else if(val==3){
				return '<div style=\'color:#FFFF00\'>'+'�ѷ�������'+'</div>'
			}else{
				return '<div style=\'color:#00FF00\'>'+'���ͨ��'+'</div>'
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
		//---------------------------------------------------------------------------------
		/***
		 * ����ʾ����
		 */
		var sm = new Ext.grid.CheckboxSelectionModel({checkOnly:true});//checkbox��ѡ��Ķ���
		var cm = new Ext.grid.ColumnModel([
	                   				new Ext.grid.RowNumberer(),
	                   				sm,
	                   				{header:'���',dataIndex:'itemid',width:30,sortable:true,menuDisabled:true},
                   					{header:'���ʱ���',dataIndex:'questionname',sortable:true,menuDisabled:true,renderer:function(val){
	                   					var	tempflag = val.substr(0,1);
	                   					var value = val.substring(1);
	                   					if(tempflag=="0"){
	                   						return value;
	                   					}else{
	                   						return value+"&nbsp&nbsp<span style='background:url(\"/portal/images/totop.gif\") no-repeat;padding-left:30px'>&nbsp</span>";
	                   				 	}
	                   				}},
	                   				{header:'��������',dataIndex:'questioncontent',hidden:true,menuDisabled:true},
	                   				{header:'���ʵ�λ',dataIndex:'questionagency',width:50,sortable:true,menuDisabled:true},
	                   				{header:'���ʵ���',dataIndex:'questionarea',width:50,sortable:true,menuDisabled:true},
	                   				{header:'����ʱ��',dataIndex:'questiondate',width:40,sortable:true,menuDisabled:true},
	                   				{header:'��ϵ�绰',dataIndex:'telnumber',hidden:true,menuDisabled:true},
	                   				{header:'��������',dataIndex:'questiontype',renderer:findgridquestiontype,width:40,sortable:true,menuDisabled:true},
	                   				{header:'����״̬',dataIndex:'userstatus',hidden:true,menuDisabled:true},
	                   				{header:'��ʱ��',dataIndex:'answerdate',hidden:true,menuDisabled:true},
	                   				{header:'������',dataIndex:'questionuser',hidden:true,menuDisabled:true},
	                   				{header:'����',dataIndex:'answeruser',hidden:true,menuDisabled:true},
	                   				{header:'������',dataIndex:'answercontent',hidden:true,menuDisabled:true},
	                   				{header:'����Ա״̬',dataIndex:'adminstatus',hidden:true,menuDisabled:true},
	                   				{header:'����״̬',dataIndex:'busofficestatus',hidden:true,menuDisabled:true},
	                   				{header:'��������Ա״̬',dataIndex:'superadminstatus',hidden:true,menuDisabled:true},
	                   				{header:'����id',dataIndex:'fileid',hidden:true,menuDisabled:true},
	                   				{header:'�𸴸���id',dataIndex:'adminfileid',hidden:true,menuDisabled:true}
	                   				
	                   			]);                   			
		                   			
			                   			
			var data ={'result':0,'data':[]};
			var store = new Ext.data.Store({
				proxy: new Ext.data.MemoryProxy(data),
				reader: new Ext.data.JsonReader({totalProperty:'result',  
					   root:'data' }, [
				{name: 'itemid'},
				{name: 'questionname'},
				{name: 'questioncontent'},
				{name: 'questionagency'},
				{name: 'questionarea'},
				{name: 'questiondate'},
				{name: 'telnumber'},
				{name: 'questiontype'},
				{name: 'userstatus'},
				{name: 'answerdate'},
				{name: 'questionuser'},
				{name: 'answeruser'},
				{name: 'answercontent'},
				{name: 'adminstatus'},
				{name: 'busofficestatus'},
				{name: 'superadminstatus'},
				{name: 'fileid'},
				{name: 'adminfileid'}
			  ])
		});
		store.load();
		 var pager = new Ext.PagingToolbar({
				id:'Grid_Pager3',
				afterPageText: '/ {0}',
			  beforePageText: 'ҳ',
				pageSize:PerCount,
				store:store,
				displayInfo: true,   
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
				           //  }
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
		 
		var searchquestionGrid = new Ext.grid.GridPanel({
			id:'searchquestionGrid',
			layout:'fit',
			columnLines: true,
			stripeRows:true,
		  	autoExpandColumn:'questionname',  
			cm:cm,
			sm:sm,
			enableColumnMove:false,
			autoHeight: true,
			border:false,
			store:store,
			viewConfig:{
				forceFit:true,
				enableRowBody:true,
				showPreview:true
			},	
		    tbar: pager,
			listeners:{cellclick:function(grid, rowIndex, columnIndex, e){
				if(columnIndex!=1){
					var model = searchquestionGrid.getSelectionModel();
					if(model.isSelected(rowIndex)){
						 model.deselectRow(rowIndex);
					}else{
						 model.selectRow(rowIndex,rowIndex+1);
					}
				}	
			}}	
		});
		/***
		 * �鿴����-------------------------------------------------------------------------------------------------------------------------
		 */
		searchquestionGrid.showpanel = function(){
			var rows = searchquestionGrid.getSelectionModel().getSelections();
			if(rows.length<1){alert("��ѡ��Ҫ�鿴������");return;}else if(rows.length>1){alert("��ѡ��һ�����ݲ鿴");return;}
			var itemid = rows[0].get("itemid");
			var url=_ROOT_PATH_+"/portal/onlinehelp/search.jsp?id="+itemid;
			var h = window.screen.availHeight-40;
		    window.open (url,'newwindow','height='+h+',width=815,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no'); 
		}
		
		
		searchquestionGrid.showpaneltwo = function(){
			var rows = searchquestionGrid.getSelectionModel().getSelections();
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
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'�� �� �� ',id:'shownewQuestionform_questionPreson',anchor:'96%'},
							       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��������',id:'shownewQuestionform_questionType',anchor:'96%'}
							]
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
						items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'���ʵ�λ',id:'shownewQuestionform_questionAgency',anchor:'99%'}]
					},{
						layout:'form',
						columnWidth:.99,
						items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'���ʱ���',id:'shownewQuestionform_questionTitle',anchor:'99%'},
						       {xtype:'textarea',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��������',height:120,id:'shownewQuestionform_questionContent',anchor:'99%'}
						]
					},{
						layout:'form',
						columnWidth:.99,
						items:[{
							layout:'column',
							items:[{
							    layout:'form',
								columnWidth:.99,
								items:[{
								      xtype:"displayfield",       
								      name:"content",   
								      id:'showfile1',    
								      fieldLabel: '��&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp��',     
								      value:''    
									}]
								}]
							}]
						},{
						columnWidth:.5,
						layout: 'form',
						items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'�� �� �� ',id:'auditansweruser',anchor:'96%'}
						]
					},{
						columnWidth:.5,
						layout: 'form',
						items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��ʱ��',id:'auditanswerdate',anchor:'96%'}
						]
					},{
						layout:'form',
						columnWidth:.99,
						items:[{xtype:'textarea',readOnly:true,style:'background:#E6E6E6',fieldLabel:'������',height:120,id:'showReplyQuestionform_questionContent',anchor:'99%'}
						]
					},{
						layout:'form',
						columnWidth:.99,
						items:[{
							layout:'column',
							items:[{
							    layout:'form',
								columnWidth:.99,
								items:[{
								      xtype:"displayfield",       
								      name:"content",   
								      id:'showanswerfile1',    
								      fieldLabel: '��&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp��',     
								      value:''    
									}]
								}]
							}]
						}]
					}]
				});
			//�鿴����
			var fileid = rows[0].get("fileid");
			if(fileid!=null&&fileid!=""){
			var tempids = fileid.split("@");
				//��ѯ��������
			    Ext.lt.RCP.script(onlinehelpurl,"useonliehelp", "findfilename", fileid,function (resp) {
			  		for(var k = 0;k < resp.length;k ++){
			  			if(resp[k]!=""){
			  					var filepath=tempids[k]+"";
			  				  	Ext.getCmp('showfile'+filecount).show();
			  					Ext.getCmp('showfile'+filecount).setValue('<a href="'+onlinehelpurl+'/portaldownloadfile.page?path='+filepath+'">'+resp[k]+'</a>');
								filecount++;
			  			}
			  		}
			    });
			}else{
				var temph = Ext.getCmp('shownewQuestionform_questionContent').height;
				temph=temph+20;
				Ext.getCmp('showfile1').hide();
				Ext.getCmp('showfile1').hideLabel=true;
				Ext.getCmp('shownewQuestionform_questionContent').setHeight(temph);
			}
			//�鿴�𸴸���
			var answerfileid = rows[0].get("adminfileid");
			if(answerfileid!=null&&answerfileid!=""){
			var tempanswerids = answerfileid.split("@");
				//��ѯ��������
			    Ext.lt.RCP.script(onlinehelpurl,"useonliehelp", "findfilename", answerfileid,function (resp) {
			  		for(var k = 0;k < resp.length;k ++){
			  			if(resp[k]!=""){
			  					var filepath=tempanswerids[k]+"";
			  				  	Ext.getCmp('showanswerfile'+answerfile).show();
			  					Ext.getCmp('showanswerfile'+answerfile).setValue('<a href="'+onlinehelpurl+'/portaldownloadfile.page?path='+filepath+'">'+resp[k]+'</a>');
								answerfile++;
								
			  			
			  			}
			  		}
			    });
			}else {
				var temph = Ext.getCmp('showReplyQuestionform_questionContent').height;
				temph=temph+20;
				Ext.getCmp('showanswerfile1').hide();
				Ext.getCmp('showanswerfile1').hideLabel=true;
				Ext.getCmp('showReplyQuestionform_questionContent').setHeight(temph);
			}	
			var showwindone = new Ext.Window({
					buttonAlign: 'right',
					id:'showwin_newQuestion',
					width:800,
					autoHeight:true,
					closeAction:'close',
					modal: true,
					items:[shownewQuestionformdone],
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
				Ext.getCmp("showReplyQuestionform_questionContent").setValue(rows[0].get("answercontent"));
				Ext.getCmp("auditansweruser").setValue(rows[0].get("answeruser"));
				Ext.getCmp("auditanswerdate").setValue(rows[0].get("answerdate"));
				showwindone.show();
		}
	
		//��ѯ
		function loadGridPanel(currentpage){
			//curpage=1;
			var info = new Object();
			info.searchid=tempsearchid+"";
			info.start=currentpage+"";
			if(searchcondition!=null&&searchcondition!=undefined){
				info.searchcondition=searchcondition;
			}
			if(questionname!=null&&questionname!=undefined){
				info.questionname=questionname;
				info.questionuser=questionuser;
				info.questionagency=questionagency;
				info.questionstartdate=questionstartdate;
				info.questionenddate=questionenddate;
				info.answeruser=questionansweruser;
				info.questioncontent=questioncontent;
			}
			Ext.lt.RCP.script(onlinehelpurl,"useonliehelp", "search", info,function (resp) {
				count=resp.result;
				if(count==0){
					count=1
				}
				store.loadData(resp);
				searchquestionGrid.doLayout();
			},function(){});
		}
	
		searchquestionGrid.loadGrid=function(search){
		   curpage=1;
		   searchcondition=search.searchcondition!=undefined?search.searchcondition:"";
		   questionuser=search.questionuser!=undefined?search.questionuser:"";
		   questionagency=search.questionagency!=undefined?search.questionagency:"";
		   questionname=search.questionname!=undefined?search.questionname:"";
		   questioncontent=search.questioncontent!=undefined?search.questioncontent:"";
		   questionstartdate=search.questionstartdate!=undefined?search.questionstartdate:"";
		   questionenddate=search.questionenddate!=undefined?search.questionenddate:"";
		   questionansweruser=search.answeruser!=undefined?search.answeruser:"";
		   tempsearchid=search.searchid!=undefined?search.searchid:"";
		   search.start="1";
		   Ext.lt.RCP.script(onlinehelpurl,"useonliehelp", "search", search,function (resp) {
				 count=resp.result;
				 if(count==0){
						count=1
					}
				store.loadData(resp);
				searchquestionGrid.doLayout();
			},function(){});		
		}
		loadGridPanel(1);
	return searchquestionGrid;
}
