Ext_lt_AdminAnswerContent = new function(){
		var PerCount = 20;
		var curpage=1;
		var userfile=1;//�û���������
		var filecount=1;//��������
		var buscount=1;//��������
		//������----------------------------------------------------------------------------
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
		//-----------------------------------------------------------------------------
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
		//������ĳһ����,�ͻ���tip
		//Ext.QuickTips.init();
		//---------------------------------------------------------------------------------
		/***
		 * ����ʾ����
		 */
		var sm = new Ext.grid.CheckboxSelectionModel({checkOnly:true});//checkbox��ѡ��Ķ���
		var cm = new Ext.grid.ColumnModel([
			                   				new Ext.grid.RowNumberer(),
			                   				sm,
			                   				{header:'���',dataIndex:'itemid',width:30,sortable:true,menuDisabled:true},
			                   				{header:'���ʱ���',dataIndex:'questionname',sortable:true,menuDisabled:true},
			                   				/*{header:'���ʱ���',dataIndex:'questionname',sortable:true,menuDisabled:true,renderer:function(value,metaData,record,colIndex,store,view) { 
			                   						return '<div ext:qtitle="" ext:qtip="' + value + '">'+ value +'</div>';          
			                   					}  
			                   				},//������ĳһ����,�ͻ���tip
			                   				*/
			                   				{header:'��������',dataIndex:'questioncontent',hidden:true,menuDisabled:true},
			                   				{header:'���ʵ�λ',dataIndex:'questionagency',width:60,sortable:true,menuDisabled:true},
			                   				{header:'���ʵ���',dataIndex:'questionarea',hidden:adminset==0?true:false,width:50,sortable:true,menuDisabled:true},
			                   				{header:'����ʱ��',dataIndex:'questiondate',width:50,sortable:true,menuDisabled:true},
			                   				{header:'��ϵ�绰',dataIndex:'telnumber',hidden:true,sortable:true,menuDisabled:true},
			                   				{header:'��������',dataIndex:'questiontype',renderer:findgridquestiontype,width:60,sortable:true,menuDisabled:true},
				                   			{header:'��������',dataIndex:'leveltype',renderer:findgridleveltype,width:30,sortable:true,menuDisabled:true},
			                   				{header:'����״̬',dataIndex:'adminstatus',renderer:questionresultState,width:30,sortable:true,menuDisabled:true},
			                   				{header:'����״̬',dataIndex:'superadminstatus',hidden:true,menuDisabled:true},
			                   				{header:'��ʱ��',dataIndex:'answerdate',hidden:true,menuDisabled:true},
			                   				{header:'����',dataIndex:'answeruser',hidden:true,menuDisabled:true},
			                   				{header:'������',dataIndex:'questionuser',hidden:true,menuDisabled:true},
			                   				{header:'������',dataIndex:'answercontent',hidden:true,menuDisabled:true},
			                   				{header:'ҵ��ר��',dataIndex:'expert',hidden:true,menuDisabled:true},
			                   				{header:'��ʱ��',dataIndex:'advicedate',hidden:true,menuDisabled:true},
			                   				{header:'�޸����',dataIndex:'expertadvice',hidden:true,menuDisabled:true},
			                   				{header:'����id',dataIndex:'fileid',hidden:true,menuDisabled:true},
			                   				{header:'����Ա����id',dataIndex:'adminfileid',hidden:true,menuDisabled:true},
			                   				{header:'ҵ�񸽼�id',dataIndex:'busfileid',hidden:true,menuDisabled:true},
			                   				{header:'�û����',dataIndex:'givebackadvice',hidden:true,menuDisabled:true}
			                   			]);
			var data ={result:0,data:[]};
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
				{name: 'leveltype'},
				{name: 'adminstatus'},
				{name: 'superadminstatus'},
				{name: 'answerdate'},
				{name: 'answeruser'},
				{name: 'questionuser'},
				{name: 'answercontent'},
				{name: 'expert'},
				{name: 'advicedate'},
				{name: 'expertadvice'},
				{name: 'fileid'},
				{name: 'adminfileid'},
				{name: 'busfileid'},
				{name: 'givebackadvice'}
			  ])
			});
		store.load();
		 var pager = 	new Ext.PagingToolbar({
				id:'Grid_Pager3',
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
			             var t=this.cursor;                
		  			     this.cursor=t+this.pageSize;               
		  			     this.doLoad(t+this.pageSize); 
		   		},
		   		moveFirst: function(){
		   			     this.cursor=0;
				 	     this.doLoad(0);  
		   		},
			   movePrevious : function(){
		   				var t=this.cursor;                
		   				this.cursor=Math.max(0,t-this.pageSize);                
		   				this.doLoad(Math.max(0,t-this.pageSize));    
			   },
			   moveLast : function(){
				   		var total=data.data.length;                
	  				    var extra=total%this.pageSize;                
	  				    var lastStart=extra?(total-extra):total-this.pageSize;               
	  				    this.cursor=extra?(total-extra):total-this.pageSize;                
	  				    this.doLoad(lastStart);       
			   },
			   doRefresh:function(){//ˢ�·���
					   		var t=this.cursor;                
		  				    this.cursor=t;                
		  				    this.doLoad(t);        
				},
			   updateInfo:function (){//��дUpdateInfo        
							if(this.displayInfo){
				                var count=this.store.getCount();             
				                var msg=count==0?this.emptyMsg:String.format(this.displayMsg,this.cursor+1,Math.min(this.cursor+this.pageSize-1,data.data.length-1)+1,data.data.length);               
				                // this.displayItem.setText(msg);
				             }
				 },
			    onPageSizeChanged:function(combo){alert("123");}	   ,             
		        onLoad:function (store,r,o){//��дOnLoad
			    		if(!this.rendered) {                
							this.dsLoaded=[store,r,o];                
							return ; 
						}    
						var d=this.getPageData(),ap=d.activePage,ps=d.pages; 
						this.afterTextItem.setText(String.format(this.afterPageText, d.pages));
					    this.inputItem.setValue(ap);      
						this.first.setDisabled(ap==1|| ps == 0);            
						this.prev.setDisabled(ap==1|| ps == 0);            
						this.next.setDisabled(ap==ps|| ps == 0);            
						this.last.setDisabled(ap==ps|| ps == 0); 
						// this.loading.enable();            
						this.updateInfo();   
				 },        
				 doLoad:function (start){//��дdoLoad  
					 var curinput = this.inputItem.getValue();
					 	var d=this.getPageData(),ap=d.activePage,ps=d.pages;
						if(curpage!=this.inputItem.getValue()){
							if(curinput>ps){
									curinput=ps
								}else if(curinput<=0){
									curinput=1;
								}
							this.cursor = (this.pageSize)*(curinput-1);
						}
					  d=this.getPageData(),ap=d.activePage,ps=d.pages;
					 	curpage=ap;
					    var TempData={'result':3,'data':[]};            
					    var i=0;            
					    var len=this.pageSize;  //5            
					    for(i=0;i<len;i++) {                
					  	     if(data.data[start+i]!=null) {                    
					  		      TempData.data.push(data.data[start+i]); 
					  		   } 
					  	}        
					  	this.store.loadData(TempData,false); 
					  if(ap==0){
					  	this.inputItem.setValue(1);
					  }else{
						  this.inputItem.setValue(ap);
					  }
				 },        
				 getPageData:function (){//��дgetPageData 
					 	var total=data.data.length;  
					 	return  { total:total, 
				  			activePage:Math.ceil((this.cursor+this.pageSize)/this.pageSize),
				  			pages:total<this.pageSize?1:Math.ceil(total/this.pageSize)};
				 } 
		});
		var adminanswerGrid = new Ext.grid.GridPanel({
			id:'adminanswerGrid',
			layout:'fit',
			columnLines: true,
			stripeRows:true,
			cm:cm,
			sm:sm,
			enableColumnMove:false,
			autoHeight: true,
			border:false,
			store:store,
			title:'������',
			viewConfig:{
				forceFit:true,
				enableRowBody:true,
				showPreview:true
			},
			tbar: pager,
			listeners:{cellclick:function(grid, rowIndex, columnIndex, e){
				if(columnIndex!=1){
					var model = adminanswerGrid.getSelectionModel();
					if(model.isSelected(rowIndex)){
						 model.deselectRow(rowIndex);
					}else{
						 model.selectRow(rowIndex,rowIndex+1);
					}
				 }
			 }}	
		});
		
		//---------------------------------------------------------------------------------------------------------------------------
		/***
		 * �鿴����
		 */
		adminanswerGrid.showpanel = function(){
			var rows = adminanswerGrid.getSelectionModel().getSelections();
			if(rows.length<1){alert("��ѡ��Ҫ�鿴������");return;}else if(rows.length>1){alert("��ѡ��һ�����ݲ鿴");return;}
			var tempstatus = rows[0].get("adminstatus");
			var showadminwin = new Ext.form.FormPanel({
					id:'showanswerform',
					labelWidth:65 ,
					title: '������Ϣ��ϸ',
					frame:true,
					layout:'fit',
					height:300,
					items:[{
						layout:'column',
						items:[{
							columnWidth:.5,
							layout: 'form',
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'�� �� �� ',id:'showquestionPreson',anchor:'96%'},
							       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'���ʵ�λ',id:'showquestionState',anchor:'96%'},
							       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��������',id:'showquestionType',anchor:'96%'}
							]
						},
						{
							layout:'form',
							columnWidth:.5,
							items:[{
									columnWidth:.5,
									layout: 'form',
									items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'����ʱ��',id:'showquestionTime',anchor:'96%'},
								       	   {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��ϵ�绰',id:'showquestionTelephone',anchor:'96%'}
									  ]
								  },{
									layout: 'column',
									items:[{
											columnWidth:.5,
											layout: 'form',
											items:[{xtype:'combo',readOnly:true,style:'background:#E6E6E6',fieldLabel:'����״̬',id:'showquestionProcess',anchor:'92%'
										    	  ,displayField:'text',
									               valueField:'value',
									               triggerAction:"all",
									               typeAhead: true,
								                   store:elementcodeStroe
									   	   }]
								 	 },{
											columnWidth:.5,
											layout: 'form',
											items:[{xtype:'combo',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��������',id:'showadminleveltype',anchor:'92%',
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
						items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'���ʱ���',id:'showquestionName',anchor:'99%'},
						       {xtype:'textarea',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��������',height:220,id:'showquestionContent',anchor:'99%'}]
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
				var temph = Ext.getCmp('showquestionContent').height;
				temph=temph+20;
				Ext.getCmp('showfile').hide();
				Ext.getCmp('showfile').hideLabel=true;
				Ext.getCmp('showquestionContent').setHeight(temph);
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
			supershowTabPanel.add(showadminwin);
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
				buttons:[{text :'��  ��',listeners:{'click':function(){showwindone.close();}}}]
				,listeners: {
				'close': function() {filecount=1; userfile=1;buscount=1; } 
				}
			});
			
			Ext.getCmp("showquestionPreson").setValue(rows[0].get("questionuser"));
			Ext.getCmp("showquestionTime").setValue(rows[0].get("questiondate"));
			var status = rows[0].get("adminstatus");
			var s = status.split(",");
			for(var i = 0;i<s.length;i++){
				if(s[i].indexOf(usertype)==0){
					Ext.getCmp("showquestionProcess").setValue(s[i].substr(1,1));
				}
			} 
			var level = rows[0].get("leveltype");
			Ext.getCmp("showadminleveltype").setValue(level);
			if(rows[0].get("questiontype")!=null){
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
				Ext.getCmp('showquestionType').setValue(names);
			}
			Ext.getCmp("showquestionTelephone").setValue(rows[0].get("telnumber"));
			Ext.getCmp("showquestionState").setValue(rows[0].get("questionagency"));
			Ext.getCmp("showquestionName").setValue(rows[0].get("questionname"));
			Ext.getCmp("showquestionContent").setValue(rows[0].get("questioncontent"));
		
			showwindone.show();
			
		}
		/***
		 * ������-------------------------------------------------------------------------------------------------------------------------
		 */	
		adminanswerGrid.answer =  function(){
		 	var redStar="<font color='red'>&nbsp*</font>"; 
		 	var date = new Date();
			var m =date.getMonth()+1<10?"0"+(date.getMonth()+1):date.getMonth()+1;
		    var h = date.getHours()<10?"0"+date.getHours():date.getHours();
		    var mi = date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes();
		    var s = date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds();
		    var time = date.getYear()+"-"+m+"-"+date.getDate()+" "+h+":"+mi+":"+s;
			var rows = adminanswerGrid.getSelectionModel().getSelections();
			if(rows.length<1){alert("��ѡ��������е����ݽ��д�");return;}else if(rows.length>1){alert("��ѡ��һ�����ݴ�");return;}
			var val = rows[0].get("adminstatus")+"";
			var adminanswerform;
			if(val.indexOf(usertype+"0")!=-1){//����
		 		adminanswerform = new Ext.form.FormPanel({
		 			id:'adminanswerform',
		 			labelWidth:65 ,
					title: '������Ϣ��ϸ',
					frame:true,
					layout:'fit',
					height:440,
					items:[{
						layout:'column',
						items:[{
							columnWidth:.5,
							layout: 'form',
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'�� �� �� ',id:'adminaskuser',anchor:'96%'},
							       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'���ʵ�λ',id:'adminaskagency',anchor:'96%'},
							       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��������',id:'adminasktype',anchor:'96%'}]
						},{
						layout:'form',
						columnWidth:.5,
						items:[{
								columnWidth:.5,
								layout: 'form',
								items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'����ʱ��',id:'adminaskdate',anchor:'96%'},
							       	   {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��ϵ�绰',id:'adminasktel',anchor:'96%'}
								  ]
							  },{
								layout: 'column',
								items:[{
										columnWidth:.5,
										layout: 'form',
										items:[{xtype:'combo',readOnly:true,style:'background:#E6E6E6',fieldLabel:'����״̬',id:'adminaskstatus',anchor:'92%'
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
						},{
							layout:'form',
							columnWidth:.99,
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'���ʱ���',id:'adminasktitle',anchor:'99%'},
							       {xtype:'textarea',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��������',height:100,id:'adminaskcontent',anchor:'99%'}]
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
								      hidden:true,    
								      fieldLabel: '��&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp��',     
								      value:''    
									}]
								}]
						   }]
						},{
							columnWidth:.5,
							layout: 'form',
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'�� �� �� ',id:'adminaskansweruser',anchor:'96%'}]
						},{
							columnWidth:.5,
							layout: 'form',
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��ʱ��',id:'adminaskanswerdate',anchor:'96%'}]
						},{
							layout:'form',
							columnWidth:.99,
							items:[{xtype:'textarea',readOnly:false,fieldLabel:'������:'+redStar+"<font  color='red'>(500������)</font>",labelSeparator:'',height:100,id:'adminaskanswercontent',anchor:'99%'}]
						},{
						layout:'form',
						columnWidth:.99,
						items:[{
							layout:'column',
							items:[{
							    layout:'form',
								columnWidth:.99,
								items:[{
									xtype: 'fileuploadfield',  
									id: 'userfile1',
									width:350,
									fieldLabel: '��&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp��',
									emptyText: '',
									name: 'file',
									readOnly:false,
									buttonText: '���',
									buttonCfg: {
										id:'liulan1',
										width:'65'
									},
									listeners: {
										'fileselected': function(fb, v){
											//����ѡ�񸽼���ɾ��ԭ���ĸ��� ��ԭ������id����������adminfileids
											if(adminfileids!=null&&adminfileids!=""){
												Ext.lt.RCP.script(onlinehelpurl,"useonliehelp", "delfile", adminfileids,function (resp) {
												});
											}
											adminfileids="";
										}
									}
								} ,{xtype:'textfield',hidden:true,hideLabel:true,hideMode:'display',fieldLabel:'',id:'adminitemid'},
							       {xtype:'textfield',hidden:true,hideLabel:true,hideMode:'display',fieldLabel:'',id:'adminanswerstatus'},
							       {xtype:'textfield',hidden:true,hideLabel:true,hideMode:'display',fieldLabel:'',id:'admingivebackadvice'},
							       {xtype:'textfield',hidden:true,hideLabel:true,hideMode:'display',fieldLabel:'',id:'adminanswersuperadminstatus'}]
								}
							]
						}]
					}]
					}]
				});
		 	}else if(val.indexOf(usertype+"6")!=-1&&(rows[0].get("givebackadvice")==null||rows[0].get("givebackadvice")=="")){//�д�������Ĵ���
		 		adminanswerform = new Ext.form.FormPanel({
				id:'adminanswerform',
				labelWidth:65 ,
				title: '������Ϣ��ϸ',
				frame:true,
				layout:'fit',
				height:505,
					items:[{
						layout:'column',
						items:[{
							columnWidth:.5,
							layout: 'form',
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'�� �� �� ',id:'adminaskuser',anchor:'96%'},
							       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'���ʵ�λ',id:'adminaskagency',anchor:'96%'},
							       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��������',id:'adminasktype',anchor:'96%'}]
									
						},{
						layout:'form',
						columnWidth:.5,
						items:[{
								columnWidth:.5,
								layout: 'form',
								items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'����ʱ��',id:'adminaskdate',anchor:'96%'},
							       	   {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��ϵ�绰',id:'adminasktel',anchor:'96%'}
								  ]
							  },{
								layout: 'column',
								items:[{
										columnWidth:.5,
										layout: 'form',
										items:[{xtype:'combo',readOnly:true,style:'background:#E6E6E6',fieldLabel:'����״̬',id:'adminaskstatus',anchor:'92%'
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
						},{
							layout:'form',
							columnWidth:.99,
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'���ʱ���',id:'adminasktitle',anchor:'99%'},
							       	{xtype:'textarea',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��������',height:70,id:'adminaskcontent',anchor:'99%'}]
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
									      hidden:true,    
									      fieldLabel: '��&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp��',     
									      value:''    
										}]
									}]
							   }]
						},{
							columnWidth:.5,
							layout: 'form',
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'�� �� �� ',id:'adminaskansweruser',anchor:'96%'}
							]
						},{
							columnWidth:.5,
							layout: 'form',
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��ʱ��',id:'adminaskanswerdate',anchor:'96%'}
							]
						},{
							layout:'form',
							columnWidth:.99,
							items:[
									{xtype:'textarea',readOnly:false,fieldLabel:'������:'+redStar+"<font  color='red'>(500������)</font>",labelSeparator:'',height:70,id:'adminaskanswercontent',anchor:'99%'}
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
										xtype: 'fileuploadfield',  
										id: 'userfile1',
										width:350,
										fieldLabel: '��&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp��',
										emptyText: '',
										name: 'file',
										readOnly:false,
										buttonText: '���',
										buttonCfg: {
											id:'liulan1',
											width:'65'
										},
										listeners: {
											'fileselected': function(fb, v){
												//����ѡ�񸽼���ɾ��ԭ���ĸ��� ��ԭ������id����������adminfileids
												if(adminfileids!=null&&adminfileids!=""){
													Ext.lt.RCP.script(onlinehelpurl,"useonliehelp", "delfile", adminfileids,function (resp) {
													});
												}
												adminfileids="";
											}
										}
									}]
									}
								]
							}]
						},{
							columnWidth:.5,
							layout: 'form',
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'ҵ��ר�� ',id:'adminaskexpert',anchor:'96%'}
							]
						},{
							columnWidth:.5,
							layout: 'form',
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��ʱ��',id:'adminaskexpertdate',anchor:'96%'}
							]
						},{
							layout:'form',
							columnWidth:.99,
							items:[
								{xtype:'textarea',readOnly:true,style:'background:#E6E6E6',fieldLabel:'�������',height:60,id:'adminaskexpertadvice',anchor:'99%'}
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
										      id:'busshowfile1', 
										      hidden:true,    
										      fieldLabel: '��&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp��',     
										      value:''    
											},
							       {xtype:'textfield',hidden:true,readOnly:true,style:'background:#E6E6E6',hideLabel:true,fieldLabel:'',id:'adminitemid'},
							       {xtype:'textfield',hidden:true,readOnly:true,style:'background:#E6E6E6',hideLabel:true,fieldLabel:'',id:'adminanswerstatus'},
								   {xtype:'textfield',hidden:true,readOnly:true,style:'background:#E6E6E6',hideLabel:true,fieldLabel:'',id:'admingivebackadvice'},
								   {xtype:'textfield',hidden:true,readOnly:true,style:'background:#E6E6E6',hideLabel:true,fieldLabel:'',id:'adminanswersuperadminstatus'}]
									}]
								}]
							}]
					}]
				});
		 	}else if(val.indexOf(usertype+"4")!=-1&&(rows[0].get("expertadvice")==null||rows[0].get("expertadvice")=="")){//�û��˻صĴ���+�޴�������Ĵ���
			 	adminanswerform = new Ext.form.FormPanel({
					id:'adminanswerform',
					labelWidth:65 ,
					title: '������Ϣ��ϸ',
					frame:true,
					layout:'fit',
					height:490,
						items:[{
							layout:'column',
							items:[{
								columnWidth:.5,
								layout: 'form',
								items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'�� �� �� ',id:'adminaskuser',anchor:'96%'},
								       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'���ʵ�λ',id:'adminaskagency',anchor:'96%'},
								       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��������',id:'adminasktype',anchor:'96%'}]
							
							},{
						layout:'form',
						columnWidth:.5,
						items:[{
								columnWidth:.5,
								layout: 'form',
								items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'����ʱ��',id:'adminaskdate',anchor:'96%'},
							       	   {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��ϵ�绰',id:'adminasktel',anchor:'96%'}
								  ]
							  },{
								layout: 'column',
								items:[{
										columnWidth:.5,
										layout: 'form',
										items:[{xtype:'combo',readOnly:true,style:'background:#E6E6E6',fieldLabel:'����״̬',id:'adminaskstatus',anchor:'92%'
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
						},{
								layout:'form',
								columnWidth:.99,
								items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'���ʱ���',id:'adminasktitle',anchor:'99%'},
								       	{xtype:'textarea',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��������',height:95,id:'adminaskcontent',anchor:'99%'}]
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
									      hidden:true,    
									      fieldLabel: '��&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp��',     
									      value:''    
										}]
									}]
							   }]
							},{
								columnWidth:.5,
								layout: 'form',
								items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'�� �� �� ',id:'adminaskansweruser',anchor:'96%'}
								]
							},{
								columnWidth:.5,
								layout: 'form',
								items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��ʱ��',id:'adminaskanswerdate',anchor:'96%'}]
							},{
								layout:'form',
								columnWidth:.99,
								items:[{xtype:'textarea',readOnly:false,fieldLabel:'������:'+redStar+"<font  color='red'>(500������)</font>",labelSeparator:'',height:95,id:'adminaskanswercontent',anchor:'99%'}]
							},{
								layout:'form',
								columnWidth:.99,
								items:[{
									layout:'column',
									items:[{
									    layout:'form',
										columnWidth:.99,
										items:[{
											xtype: 'fileuploadfield',  
											id: 'userfile1',
											fieldLabel: '��&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp��',
											emptyText: '',
											name: 'file',
											width:350,
											readOnly:false,
											buttonText: '���',
											buttonCfg: {
												id:'liulan1',
												width:'65'
											},
											listeners: {
											   'fileselected': function(fb, v){
													//����ѡ�񸽼���ɾ��ԭ���ĸ��� ��ԭ������id����������adminfileids
													if(adminfileids!=null&&adminfileids!=""){
														Ext.lt.RCP.script(onlinehelpurl,"useonliehelp", "delfile", adminfileids,function (resp) {
														});
													}
													adminfileids="";
												}
											}
										}]
										}
									]
								}]
							},{
								layout:'form',
								columnWidth:.99,
								items:[{xtype:'textarea',readOnly:true,style:'background:#E6E6E6',fieldLabel:'�û���� ',height:50,id:'adminaskgiveback',anchor:'99%'},
									   {xtype:'textfield',hidden:true,readOnly:true,style:'background:#E6E6E6',hideLabel:true,fieldLabel:'',id:'adminitemid'},
									   {xtype:'textfield',hidden:true,readOnly:true,style:'background:#E6E6E6',hideLabel:true,fieldLabel:'',id:'adminanswerstatus'},
									   {xtype:'textfield',hidden:true,readOnly:true,style:'background:#E6E6E6',hideLabel:true,fieldLabel:'',id:'admingivebackadvice'},
									   {xtype:'textfield',hidden:true,readOnly:true,style:'background:#E6E6E6',hideLabel:true,fieldLabel:'',id:'adminanswersuperadminstatus'}]
							}]
						}]
					});
		 	}else {//�д������+�˻صĴ���
		 		adminanswerform = new Ext.form.FormPanel({
					id:'adminanswerform',
					labelWidth:65 ,
					title: '������Ϣ��ϸ',
					frame:true,
					layout:'fit',
					height:515,
						items:[{
							layout:'column',
							items:[{
								columnWidth:.5,
								layout: 'form',
								items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'�� �� �� ',id:'adminaskuser',anchor:'96%'},
								       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'���ʵ�λ',id:'adminaskagency',anchor:'96%'},
								       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��������',id:'adminasktype',anchor:'96%'}]
							},{
						layout:'form',
						columnWidth:.5,
						items:[{
								columnWidth:.5,
								layout: 'form',
								items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'����ʱ��',id:'adminaskdate',anchor:'96%'},
							       	   {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��ϵ�绰',id:'adminasktel',anchor:'96%'}
								  ]
							  },{
								layout: 'column',
								items:[{
										columnWidth:.5,
										layout: 'form',
										items:[{xtype:'combo',readOnly:true,style:'background:#E6E6E6',fieldLabel:'����״̬',id:'adminaskstatus',anchor:'92%'
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
						    },{
								layout:'form',
								columnWidth:.99,
								items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'���ʱ���',id:'adminasktitle',anchor:'99%'},
								       	{xtype:'textarea',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��������',height:60,id:'adminaskcontent',anchor:'99%'}]
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
										      hidden:true,    
										      fieldLabel: '��&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp��',     
										      value:''    
											}]
									}]
								}]
							},{
								columnWidth:.5,
								layout: 'form',
								items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'�� �� �� ',id:'adminaskansweruser',anchor:'96%'}]
							},{
								columnWidth:.5,
								layout: 'form',
								items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��ʱ��',id:'adminaskanswerdate',anchor:'96%'}]
							},{
								layout:'form',
								columnWidth:.99,
								items:[{xtype:'textarea',readOnly:false,fieldLabel:'������:'+redStar+"<font  color='red'>(500������)</font>",labelSeparator:'',height:65,id:'adminaskanswercontent',anchor:'99%'}]
							},{
								layout:'form',
								columnWidth:.99,
								items:[{
									layout:'column',
									items:[{
									    layout:'form',
										columnWidth:.99,
										items:[{
											xtype: 'fileuploadfield',  
											id: 'userfile1',
											width:350,
											fieldLabel: '��&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp��',
											emptyText: '',
											name: 'file',
											readOnly:false,
											buttonText: '���',
											buttonCfg: {
												id:'liulan1',
												width:'65'
											},
											listeners: {
												'fileselected': function(fb, v){
													//����ѡ�񸽼���ɾ��ԭ���ĸ��� ��ԭ������id����������adminfileids
													if(adminfileids!=null&&adminfileids!=""){
														Ext.lt.RCP.script(onlinehelpurl,"useonliehelp", "delfile", adminfileids,function (resp) {
														});
													}
													 adminfileids="";
												}
											}
										}]
									}]
								}]
							},{
								layout:'form',
								columnWidth:.99,
								items:[{xtype:'textarea',readOnly:true,style:'background:#E6E6E6',fieldLabel:'�û���� ',height:35,id:'adminaskgiveback',anchor:'99%'}]
							},{
								columnWidth:.5,
								layout: 'form',
								items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'ҵ��ר�� ',id:'adminaskexpert',anchor:'96%'}]
							},{
								columnWidth:.5,
								layout: 'form',
								items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��ʱ��',id:'adminaskexpertdate',anchor:'96%'}]
							},{
								layout:'form',
								columnWidth:.99,
								items:[{xtype:'textarea',readOnly:true,style:'background:#E6E6E6',fieldLabel:'�������',height:45,id:'adminaskexpertadvice',anchor:'99%'}]
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
										      id:'busshowfile1', 
										      hidden:true,    
										      fieldLabel: '��&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp��',     
										      value:''    
											},
								       {xtype:'textfield',hidden:true,readOnly:true,style:'background:#E6E6E6',hideLabel:true,fieldLabel:'',id:'adminitemid'},
								       {xtype:'textfield',hidden:true,readOnly:true,style:'background:#E6E6E6',hideLabel:true,fieldLabel:'',id:'adminanswerstatus'},
								       {xtype:'textfield',hidden:true,readOnly:true,style:'background:#E6E6E6',hideLabel:true,fieldLabel:'',id:'admingivebackadvice'},
								       {xtype:'textfield',hidden:true,readOnly:true,style:'background:#E6E6E6',hideLabel:true,fieldLabel:'',id:'adminanswersuperadminstatus'}]
									}]
								}]
							}]
						}]
					});
		 	}
			//�鿴�û�����
			var fileid = rows[0].get("fileid");
			if(fileid!=null&&fileid!=""){
			var tempids = fileid.split("@");
				//��ѯ��������
			    Ext.lt.RCP.script(onlinehelpurl,"useonliehelp", "findfilename", fileid,function (resp) {
			  		for(var k = 0;k < resp.length;k ++){
			  			if(resp[k]!=""){
			  					var filepath=tempids[k]+"";
			  					if(Ext.getCmp('showfile'+userfile)!=null){
			  				  		Ext.getCmp('showfile'+userfile).show();
			  						Ext.getCmp('showfile'+userfile).setValue('<a href="'+onlinehelpurl+'/portaldownloadfile.page?path='+filepath+'">'+resp[k]+'</a>');
									userfile++;
								}
			  			}
			  		}
			    });
			}else{
				var temph = Ext.getCmp('adminaskcontent').height;
				temph=temph+20;
				Ext.getCmp('showfile1').hide();
				Ext.getCmp('showfile1').hideLabel=true;
				Ext.getCmp('adminaskcontent').setHeight(temph);
			}
			//�鿴ҵ��ר�ҵĸ���
			var busfileid = rows[0].get("busfileid");
			if(busfileid!=null&&busfileid!=""){
			var tempbusids = busfileid.split("@");
				//��ѯ��������
			    Ext.lt.RCP.script(onlinehelpurl,"useonliehelp", "findfilename", busfileid,function (resp) {
			  		for(var k = 0;k < resp.length;k ++){
			  			if(resp[k]!=""){
			  					var filepath=tempbusids[k]+"";
			  					if(Ext.getCmp('busshowfile'+buscount)!=null){
			  				  		Ext.getCmp('busshowfile'+buscount).show();
			  						Ext.getCmp('busshowfile'+buscount).setValue('<a href="'+onlinehelpurl+'/portaldownloadfile.page?path='+filepath+'">'+resp[k]+'</a>');
									buscount++;
								}
			  			}
			  		}
			    });
			}else{
				if(Ext.getCmp('busshowfile1')!=null){
					Ext.getCmp('busshowfile1').hide();
					Ext.getCmp('busshowfile1').hideLabel=true;
					var temph = Ext.getCmp('adminaskexpertadvice').height;
					temph=temph+20;
					Ext.getCmp('adminaskexpertadvice').setHeight(temph);
				}
			}
			//�޸ĸ���
			var adminfileid = rows[0].get("adminfileid");
			adminfileids = adminfileid;
			if(adminfileid!=null&&adminfileid!=""){
				//��ѯ��������
			    Ext.lt.RCP.script(onlinehelpurl,"useonliehelp", "findfilename", adminfileid,function (resp) {
			  		for(var k = 0;k < resp.length;k ++){
			  			if(resp[k]!=""){
			  				    if(Ext.getCmp('userfile'+filecount)!=null){
			  						Ext.getCmp('userfile'+filecount).show();
				  					Ext.getCmp('userfile'+filecount).setValue(resp[k]);
									//Ext.getCmp('clear'+filecount).show();
									Ext.getCmp('liulan'+filecount).show();
									//Ext.getCmp('liulan'+filecount).setDisabled(true);
									filecount++;
								}
			  			}
			  		}
			  		if(filecount>1)filecount--;
			    });
			
			}
			//�𸴴���
		 	var answerwin = new Ext.Window({
				buttonAlign: 'right',
				id:'adminwinanswerwin',
				width:800,
				authHeight:true,
				closeAction:'close',
				modal: true,
				buttons:[{text:'�ύҵ��ר��',id:'submitbus',listeners:{'click':function(){
							var answercontent=Ext.getCmp("adminaskanswercontent").getValue();
							if(answercontent.length>500){
								alert("�����ݲ��ܴ���500��");
								return;
							}
							var confitmmsg = "ȷ���ύ��";
							if(rows[0].get("expertadvice")!=null&&rows[0].get("expertadvice")!=""){
								confitmmsg = "ҵ��ר���Ѵ𸴣�ȷ���ٴ��ύ��";
							}
							if(confirm(confitmmsg)){
								gridid=2;
								Ext.getCmp('adminanswer').setDisabled(true);
								Ext.getCmp('submitbus').setDisabled(true);
								saveQuit();//�ϴ�����
							}
							}}
						},{text:'��  ��',id:'adminanswer',listeners:{'click':function(){
							var rows = adminanswerGrid.getSelectionModel().getSelections();
							var answercontent=Ext.getCmp("adminaskanswercontent").getValue();
							if(answercontent.trim().length==0){
								alert("�����ݲ���Ϊ��");return;
							}else if(answercontent.length>500){
								alert("�����ݲ��ܴ���500��");
								return;
							}
							if(confirm("ȷ�ϴ���")){
								gridid=1;
								Ext.getCmp('adminanswer').setDisabled(true);
								Ext.getCmp('submitbus').setDisabled(true);
								saveQuit();//�ϴ�����
							}
							}}
						},{text:'��  ��',listeners:{'click':function(){
							if(confirm("ȷ�Ϲرմ�����")){
								answerwin.close();
							}
							}}
						}],
				items:[adminanswerform],
				listeners: {
					'show': function() {
						Ext.getCmp("adminaskanswercontent").focus(true, true);
					}
					,'close': function() {
						filecount=1;
						userfile=1;//�û���������
						buscount=1;//ҵ�񸽼�����
					} 
				}
			});
			answerwin.show();
			if(rows[0].get("givebackadvice")!=null){
		    	Ext.getCmp("admingivebackadvice").setValue(rows[0].get("givebackadvice"));
		    }
		    Ext.getCmp("adminanswersuperadminstatus").setValue(rows[0].get("superadminstatus"));
		    Ext.getCmp("adminitemid").setValue(rows[0].get("itemid"));
		    Ext.getCmp("adminanswerstatus").setValue(rows[0].get("adminstatus"));
		    Ext.getCmp("adminaskuser").setValue(rows[0].get("questionuser"));
			Ext.getCmp("adminaskdate").setValue(rows[0].get("questiondate"));
			Ext.getCmp("adminaskagency").setValue(rows[0].get("questionagency"));
			Ext.getCmp("adminasktel").setValue(rows[0].get("telnumber"));
			Ext.getCmp("adminasktitle").setValue(rows[0].get("questionname"));
			Ext.getCmp("adminaskcontent").setValue(rows[0].get("questioncontent"));
			Ext.getCmp("adminaskansweruser").setValue(username);
			Ext.getCmp("adminaskanswerdate").setValue(time);
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
				Ext.getCmp('adminasktype').setValue(names);
			}
			if(rows[0].get("answercontent")!=null&&rows[0].get("answercontent")!="")
			Ext.getCmp("adminaskanswercontent").setValue(rows[0].get("answercontent"))
			if(Ext.getCmp("adminaskexpert")!=undefined){//�д�������Ĵ���
				Ext.getCmp("adminaskexpert").setValue(rows[0].get("expert"));
				Ext.getCmp("adminaskexpertdate").setValue(rows[0].get("advicedate"));
				Ext.getCmp("adminaskexpertadvice").setValue(rows[0].get("expertadvice"));
			}
			if(Ext.getCmp("adminaskgiveback")!=undefined){//�˻صĴ���
				Ext.getCmp("adminaskgiveback").setValue(rows[0].get("givebackadvice"));
			}
			Ext.getCmp("adminleveltype").setValue(rows[0].get("leveltype"));
			var status = rows[0].get("adminstatus");
			var s = status.split(",");
			for(var i = 0;i<s.length;i++){
				if(s[i].indexOf(usertype)==0){
					Ext.getCmp("adminaskstatus").setValue(s[i].substr(1,1));
				}
			} 
		 	return;
		}
		
		function GetPagerData(InData)//�Ӿ�̬�����л�ȡÿҳ������
		   {	
		   	var TempData={ 'result':3,'data':[] };    
		   	if(InData.data.length>PerCount){        
		   		for(var i=0;i<=PerCount-1;i++){            
		   			TempData.data.push(InData.data[i]);
		   			} 
		   		}else{        
		   				for(var i=0;i<=InData.data.length-1;i++) {           
		   					 TempData.data.push(InData.data[i]);
		   					 }
		   				}    
		   					 return TempData;
		   	}
		//��ѯ
		function loadGridPanel(){
			pager.cursor=0;
			pager.inputItem.setValue(1);
			var search = new Object();
			search.flag="0"
			search.area=localquestionarea;
			search.usercode=usercode;
			search.username=username;
			search.usertype=usertype;
			search.typemap=typemap;
			//Ext.lt.RCP.server("adminhelp", "query", search,function (resp) {
			Ext.lt.RCP.script(onlinehelpurl,"adminhelp", "query", search,function (resp) {
				data=resp;
				store.loadData(GetPagerData(resp));
				pager.doLoad(0);
				adminanswerGrid.doLayout();
			},function(){});
		}
		
		
	 /***
	 *�鿴��������-----------------------------------------------------------------------------------------------------
	 */
	adminanswerGrid.processflow = function(){
		var rows = adminanswerGrid.getSelectionModel().getSelections();
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
		//�����޷�����������ϼ�
		adminanswerGrid.superior = function(){
			var rows = adminanswerGrid.getSelectionModel().getSelections();
			if(rows.length<1){alert("��ѡ��������е�����");return;}
			var config=new Object();
			var itemids="";
			for(var j = 0;j < rows.length;j ++){
				itemids += "'" + rows[j].get("itemid")+"',";
			}
			config.itemids=itemids;
			config.adminstatus=rows[0].get("adminstatus");
			config.answeruser=username;
			config.usertype=usertype;
			if(confirm("ȷ���ύ��������"+nextoperate+"��")){
				Ext.lt.RCP.script(onlinehelpurl,"adminhelp", "superior", config,function (resp) {
					loadGridPanel();
				});
			}
		}
		//�漰ҵ����ѯר��
		adminanswerGrid.expert = function(){
			var rows = adminanswerGrid.getSelectionModel().getSelections();
			if(rows.length<1){alert("��ѡ��������е�����");return;}
			var config=new Object();
			var itemids="";
			for(var j = 0;j < rows.length;j ++){
				itemids += "'" + rows[j].get("itemid")+"',";
			}
			config.itemids=itemids;
			config.adminstatus=rows[0].get("adminstatus");
			if(rows[0].get("givebackadvice")!=null){
				config.givebackadvice=rows[0].get("givebackadvice");
			}
			config.answeruser=username;
			config.usertype=usertype;
			var confirmmsg="ȷ���ύ��������ҵ��ר����";
			if(rows[0].get("expertadvice")!=null&&rows[0].get("expertadvice")!=""){
				confirmmsg="ҵ��ר���Ѵ𸴣�ȷ���ٴ��ύ��?"
			}
			if(confirm(confirmmsg)){
				Ext.lt.RCP.script(onlinehelpurl,"adminhelp", "expert", config,function (resp) {
					loadGridPanel();
				});
			}
		}
		adminanswerGrid.loadGrid=function(search){
			curpage=1;
			pager.cursor=0;
			pager.inputItem.setValue(1);
			search.area=localquestionarea;
			search.usercode=usercode;
			search.username=username;
			search.usertype=usertype;
			search.typemap=typemap;
			curpage=1;
			pager.cursor=0;
			pager.inputItem.setValue(1);
			//Ext.lt.RCP.server("adminhelp", "query", search,function (resp) {
			Ext.lt.RCP.script(onlinehelpurl,"adminhelp", "query", search,function (resp) {
				data=resp;
				store.loadData(GetPagerData(resp));
				pager.doLoad(0);
				adminanswerGrid.doLayout();
			});
		}
		//loadGridPanel();
	return adminanswerGrid;
}
function adminsave(){
		var config=new Object();
		config.oldfileids=adminfileids;
		config.itemid = Ext.getCmp("adminitemid").getValue();
		config.answeruser = Ext.getCmp("adminaskansweruser").getValue();
		config.answerdate = Ext.getCmp("adminaskanswerdate").getValue();
		config.answercontent = Ext.getCmp("adminaskanswercontent").getValue();
		config.adminstatus = Ext.getCmp("adminanswerstatus").getValue();
		config.superadminstatus = Ext.getCmp("adminanswersuperadminstatus").getValue();
		config.usertype=usertype;
		config.usercode=usercode;
		config.area=localquestionarea;
		Ext.lt.RCP.script(onlinehelpurl,"adminhelp", "answer", config,function (resp) {
			 Ext.getCmp('adminwinanswerwin').close();
			 var temp= {};
			 temp.flag="0";
		 	 Ext_lt_AdminAnswerContent.loadGrid(temp);
		 	 
		});
}
function submitbus(){
		var config=new Object();
		config.oldfileids=adminfileids;
		config.itemids = "'"+Ext.getCmp("adminitemid").getValue()+"'";
		config.answeruser = Ext.getCmp("adminaskansweruser").getValue();
		config.answerdate = Ext.getCmp("adminaskanswerdate").getValue();
		config.answercontent = Ext.getCmp("adminaskanswercontent").getValue();
		config.adminstatus = Ext.getCmp("adminanswerstatus").getValue();
		config.superadminstatus = Ext.getCmp("adminanswersuperadminstatus").getValue();
		config.givebackadvice = Ext.getCmp("admingivebackadvice").getValue();
		config.usertype=usertype;
		config.usercode=usercode;
		config.area=localquestionarea;
		Ext.lt.RCP.script(onlinehelpurl,"adminhelp", "expert", config,function (resp) {
			 Ext.getCmp('adminwinanswerwin').close();
			 var temp= {};
			 temp.flag="0";
		 	 Ext_lt_AdminAnswerContent.loadGrid(temp);
		});
}