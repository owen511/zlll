Ext_lt_BusOfficeAnswerContent = new function(){
		var PerCount = 20;
		var curpage=1;
		var userfile=1;//�û���������
		var filecount=1;//��������
		var buscount=1;//��������
		//������----------------------------------------------------------------------------
		var fasptableData = [
			     		        ['0','����'],
			     		        ['1','�Ѵ�'],
			     		        ['2','�û��˻�']
			     	];
		var elementcodeStroe = new Ext.data.SimpleStore({
			fields: ['value', 'text'],
			data:fasptableData
		});
	    function questionresultState(val){
	  		if(val==0){
	  			return '<div style=\'color:#FF0000\'>'+'����'+'</div>'
	  		}else if(val==1){
	  			return '<div style=\'color:#00FF00\'>'+'�Ѵ�'+'</div>'
	  		}else if(val==2){
	  			return '<div style=\'color:#AA7700\'>'+'�û��˻�'+'</div>'
	  		}else{
    			return '<div style=\'color:#0000CC\'>'+'�ѽ��'+'</div>'
    		}
	  	}
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
		function findgridleveltype(val){
			for(var z=0;z<(levelmap.data).length;z++){
				if(levelmap.data[z].itemid==val){
					return levelmap.data[z].questionlevel;
				}
			}     
		}
	  	//----------------------------------------------------------------------------------------------
	    var sm = new Ext.grid.CheckboxSelectionModel({checkOnly:true});//checkbox��ѡ��Ķ���
		var cm = new Ext.grid.ColumnModel([
			                   				new Ext.grid.RowNumberer(),
			                   				sm,
			                   				{header:'���',dataIndex:'itemid',width:30,sortable:true,menuDisabled:true},
			                   				{header:'���ʱ���',dataIndex:'questionname',sortable:true,menuDisabled:true},
			                   				{header:'��������',dataIndex:'questioncontent',hidden:true,menuDisabled:true},
			                   				{header:'���ʵ�λ',dataIndex:'questionagency',width:60,sortable:true,menuDisabled:true},
			                   				{header:'���ʵ���',dataIndex:'questionarea',hidden:officeset==0?true:false,width:50,sortable:true,menuDisabled:true},
			                   				{header:'����ʱ��',dataIndex:'questiondate',width:50,sortable:true,menuDisabled:true},
			                   				{header:'��ϵ�绰',dataIndex:'telnumber',hidden:true,menuDisabled:true},
			                   				{header:'��������',dataIndex:'questiontype',renderer:findgridquestiontype,width:60,sortable:true,menuDisabled:true},
				                   			{header:'��������',dataIndex:'leveltype',renderer:findgridleveltype,width:30,sortable:true,menuDisabled:true},
			                   				{header:'����״̬',dataIndex:'busofficestatus',renderer:questionresultState,width:30,sortable:true,menuDisabled:true},
			                   				{header:'����Ա״̬',dataIndex:'adminstatus',hidden:true,menuDisabled:true},
			                   				{header:'��ʱ��',dataIndex:'answerdate',hidden:true,menuDisabled:true},
			                   				{header:'����',dataIndex:'answeruser',hidden:true,menuDisabled:true},
			                   				{header:'������',dataIndex:'questionuser',hidden:true,menuDisabled:true},
			                   				{header:'������',dataIndex:'answercontent',hidden:true,menuDisabled:true},
			                   				{header:'����id',dataIndex:'fileid',hidden:true,menuDisabled:true},
			                   				{header:'����Ա����id',dataIndex:'adminfileid',hidden:true,menuDisabled:true},
			                   				{header:'ҵ�񸽼�id',dataIndex:'busfileid',hidden:true,menuDisabled:true},
			                   				{header:'ר�����',dataIndex:'expertadvice',hidden:true,menuDisabled:true},
			                   				{header:'ר��',dataIndex:'expert',hidden:true,menuDisabled:true},
					                   		{header:'����ʱ��',dataIndex:'advicedate',hidden:true,menuDisabled:true},
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
				{name: 'busofficestatus'},
				{name: 'adminstatus'},
				{name: 'answerdate'},
				{name: 'answeruser'},
				{name: 'questionuser'},
				{name: 'answercontent'},
				{name: 'fileid'},
				{name: 'adminfileid'},
				{name: 'busfileid'},
				{name: 'expertadvice'},
				{name: 'expert'},
				{name: 'advicedate'},
				{name: 'givebackadvice'}
			  ])
			});
		store.load();
		 var pager = new Ext.PagingToolbar({
				id:'Grid_Pager4',
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
				             }
				 },          
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
		var busOffcieAnswerGrid = new Ext.grid.GridPanel({
			id:'busOffcieAnswerGrid',
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
					var model = busOffcieAnswerGrid.getSelectionModel();
					if(model.isSelected(rowIndex)){
						 model.deselectRow(rowIndex);
					}else{
						 model.selectRow(rowIndex,rowIndex+1);
					}
				}	
			}}
		});
	
		function showinfor(){
			addwin.show();
		}
		/***
		 * �鿴����------------------------------------------------------------------
		 */
		busOffcieAnswerGrid.showpanel = function(){
			var rows = busOffcieAnswerGrid.getSelectionModel().getSelections();
			if(rows.length<1){alert("��ѡ��Ҫ�鿴������");return;}else if(rows.length>1){alert("��ѡ��һ�����ݲ鿴");return;}
			var showbusOffcieAnswerform = new Ext.form.FormPanel({
				id:'showbusAnswerformnoanswer',
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
						items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'�� �� �� ',id:'busofficeform_questionPreson',anchor:'96%'},
						       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��������',id:'busofficeform_questionType',anchor:'96%'},
						       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'���ʵ�λ',id:'busofficeform_questionArea',anchor:'96%'}
						]
					},{
					layout:'form',
					columnWidth:.5,
					items:[{
							columnWidth:.5,
							layout: 'form',
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'����ʱ��',id:'busofficeform_questionTime',anchor:'96%'},
						       	   {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��ϵ�绰',id:'busofficeform_questionTelephone',anchor:'96%'}
							  ]
						  },{
							layout: 'column',
							items:[{
									columnWidth:.5,
									layout: 'form',
									items:[{xtype:'combo',readOnly:true,style:'background:#E6E6E6',fieldLabel:'����״̬',id:'busofficeform_questionState',anchor:'92%'
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
						items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'���ʱ���',id:'busofficeform_questionTitle',anchor:'99%'},
						       {xtype:'textarea',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��������',height:220,id:'busofficeform_questionContent',anchor:'99%'}
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
				var temph = Ext.getCmp('busofficeform_questionContent').height;
				temph=temph+20;
				Ext.getCmp('showfile').hide();
				Ext.getCmp('showfile').hideLabel=true;
				Ext.getCmp('busofficeform_questionContent').setHeight(temph);
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
			supershowTabPanel.add(showbusOffcieAnswerform);
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
			var busshowwin = new Ext.Window({
				buttonAlign: 'right',
				id:'busshowwin',
				width:800,
				autoHeight:true,
				closeAction:'close',
				modal: true,
				buttons:[{text :'��  ��',listeners:{'click':function(){busshowwin.close();}}}],
				items:[supershowTabPanel],
				listeners: {
					'close': function() {
						filecount=1;
						userfile=1;//�û���������
						buscount=1;//ҵ�񸽼�����
					} 
				} 
			});
			Ext.getCmp("busofficeform_questionPreson").setValue(rows[0].get("questionuser"));
			Ext.getCmp("busofficeform_questionTime").setValue(rows[0].get("questiondate"));
			Ext.getCmp("busofficeform_questionState").setValue(rows[0].get("busofficestatus"));
			Ext.getCmp("adminleveltype").setValue(rows[0].get("leveltype"));
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
				Ext.getCmp('busofficeform_questionType').setValue(names);
			}
			Ext.getCmp("busofficeform_questionTelephone").setValue(rows[0].get("telnumber"));
			Ext.getCmp("busofficeform_questionArea").setValue(rows[0].get("questionagency"));
			Ext.getCmp("busofficeform_questionTitle").setValue(rows[0].get("questionname"));
			Ext.getCmp("busofficeform_questionContent").setValue(rows[0].get("questioncontent"));
			busshowwin.show();
		}
	
		/***
		 * ������-----------------------------------------------------------------------------------------------------------------
		 */
		busOffcieAnswerGrid.answer =  function(){
			var redStar="<font color='red'>&nbsp*</font>"; 
			var date = new Date();
			var m =date.getMonth()+1<10?"0"+(date.getMonth()+1):date.getMonth()+1;
		    var h = date.getHours()<10?"0"+date.getHours():date.getHours();
		    var mi = date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes();
		    var s = date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds();
		    var time = date.getYear()+"-"+m+"-"+date.getDate()+" "+h+":"+mi+":"+s;
			var rows = busOffcieAnswerGrid.getSelectionModel().getSelections();
			if(rows.length<1){
				alert("��ѡ��������е����ݽ��д�");return;
			}else if(rows.length>1){
				alert("��ѡ��һ�����ݽ��д�");return;
			}
			var bufanswerform;
			if(rows[0].get("givebackadvice")==null||rows[0].get("givebackadvice")==""){//δ��
				bufanswerform = new Ext.form.FormPanel({
					id:'bufanswerform',
					labelWidth:65 ,
					title: '������Ϣ��ϸ',
					frame:true,
					layout:'fit',
					height:500,
					items:[{
						layout:'column',
						items:[{
							columnWidth:.5,
							layout: 'form',
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'�� �� �� ',id:'bufanswerform_questionuser',anchor:'96%'},
						           {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'���ʵ�λ',id:'bufanswerform_questionarea',anchor:'96%'},
						      	   {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��������',id:'bufanswerform_questiontype',anchor:'96%'}]
					    },{
						layout:'form',
						columnWidth:.5,
						items:[{
								columnWidth:.5,
								layout: 'form',
								items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'����ʱ��',id:'bufanswerform_questiondate',anchor:'96%'},
							       	   {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��ϵ�绰',id:'bufanswerform_questiontel',anchor:'96%'}]
							  },{
								layout: 'column',
								items:[{
										columnWidth:.5,
										layout: 'form',
										items:[{xtype:'combo',readOnly:true,style:'background:#E6E6E6',fieldLabel:'����״̬',id:'bufanswerform_questionstatus',anchor:'92%'
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
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'���ʱ���',id:'bufanswerform_questiontitle',anchor:'99%'},
							       {xtype:'textarea',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��������',height:65,id:'bufanswerform_questioncontent',anchor:'99%'}]
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
										      id:'usershowfile1', 
										      hidden:true,    
										      fieldLabel: '��&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp��',     
										      value:''    
									}]
								}]
						   }]
						},{
							columnWidth:.5,
							layout: 'form',
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'�� �� �� ',id:'bufanswerform_answeruser',anchor:'96%'}]
						},{
							columnWidth:.5,
							layout: 'form',
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��ʱ��',id:'bufanswerform_answerdate',anchor:'96%'}]
						},{
							layout:'form',
							columnWidth:.99,
							items:[{xtype:'textarea',readOnly:true,style:'background:#E6E6E6',fieldLabel:'������',height:65,id:'bufanswerform_answercontent',anchor:'99%'}]
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
									      id:'answershowfile1', 
									      hidden:true,    
									      fieldLabel: '��&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp��',     
									      value:''    
										}]
									}]
							   }]
						},{
							columnWidth:.5,
							layout: 'form',
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'ҵ��ר�� ',id:'bufanswerform_busoffer',anchor:'96%'}]
						},{
							columnWidth:.5,
							layout: 'form',
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��ʱ��',id:'bufanswerform_bufanswerdate',anchor:'96%'}]
						},{
							layout:'form',
							columnWidth:.99,
							items:[
								{xtype:'textarea',readOnly:false,fieldLabel:'�������:'+redStar+"<font  color='red'>(500������)</font>",labelSeparator:'',height:65,id:'bufanswerform_expertcontent',anchor:'99%'}]
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
										id: 'busfile1',
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
												//����ѡ�񸽼���ɾ��ԭ���ĸ��� ��ԭ������id����������busfileids
												if(busfileids!=null&&busfileids!=""){
													Ext.lt.RCP.script(onlinehelpurl,"useonliehelp", "delfile", busfileids,function (resp) {
													});
												}
												busfileids="";
												var flag = true;
												var path = v;
											}
										}
										},
						       	   {xtype:'textfield',hidden:true,readOnly:true,style:'background:#E6E6E6',hideLabel:true,fieldLabel:'',id:'bufanswerformtemid'},
							   	   {xtype:'textfield',hidden:true,readOnly:true,style:'background:#E6E6E6',hideLabel:true,fieldLabel:'',id:'bufanswerformadminstatus'}]
									}
								]
							}]
						}]
					}]
				});
			}else{//�˻غ��ٴη��͵�ҵ��ר��
			     bufanswerform = new Ext.form.FormPanel({
					id:'auditedQuestionform',
					labelWidth:65,
					title: '������Ϣ��ϸ',
					frame:true,
					layout:'fit',
					height:500,
					items:[{
						layout:'column',
						items:[{
							columnWidth:.5,
							layout: 'form',
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'�� �� �� ',id:'bufanswerform_questionuser',anchor:'96%'},
						           {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'���ʵ�λ',id:'bufanswerform_questionarea',anchor:'96%'},
						      	   {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��������',id:'bufanswerform_questiontype',anchor:'96%'}]
					    },{
						layout:'form',
						columnWidth:.5,
						items:[{
								columnWidth:.5,
								layout: 'form',
								items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'����ʱ��',id:'bufanswerform_questiondate',anchor:'96%'},
							       	   {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��ϵ�绰',id:'bufanswerform_questiontel',anchor:'96%'}
								  ]
							  },{
								layout: 'column',
								items:[{
										columnWidth:.5,
										layout: 'form',
										items:[{xtype:'combo',readOnly:true,style:'background:#E6E6E6',fieldLabel:'����״̬',id:'bufanswerform_questionstatus',anchor:'92%'
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
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'���ʱ���',id:'bufanswerform_questiontitle',anchor:'99%'},
							       {xtype:'textarea',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��������',height:55,id:'bufanswerform_questioncontent',anchor:'99%'}]
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
										      id:'usershowfile1', 
										      hidden:true,    
										      fieldLabel: '��&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp��',     
										      value:''    
									}]
								}]
						   }]
						},{
							columnWidth:.5,
							layout: 'form',
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'�� �� �� ',id:'bufanswerform_answeruser',anchor:'96%'}]
						},{
							columnWidth:.5,
							layout: 'form',
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��ʱ��',id:'bufanswerform_answerdate',anchor:'96%'}]
						},{
							layout:'form',
							columnWidth:.99,
							items:[{xtype:'textarea',readOnly:true,style:'background:#E6E6E6',fieldLabel:'������',height:55,id:'bufanswerform_answercontent',anchor:'99%'}]
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
									      id:'answershowfile1', 
									      hidden:true,    
									      fieldLabel: '��&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp��',     
									      value:''    
										}]
									}]
							   }]
						},{
							layout:'form',
							columnWidth:.99,
							items:[
								{xtype:'textarea',readOnly:true,style:'background:#E6E6E6',fieldLabel:'�û����',height:30,id:'bufanswerform_givebackadvise',anchor:'99%'}
								]
						},{
							columnWidth:.5,
							layout: 'form',
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'ҵ��ר�� ',id:'bufanswerform_busoffer',anchor:'96%'}]
						},{
							columnWidth:.5,
							layout: 'form',
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��ʱ��',id:'bufanswerform_bufanswerdate',anchor:'96%'}]
						},{
							layout:'form',
							columnWidth:.99,
							items:[
								{xtype:'textarea',readOnly:false,fieldLabel:'�������:'+redStar+"<font  color='red'>(500������)</font>",labelSeparator:'',height:50,id:'bufanswerform_expertcontent',anchor:'99%'}]
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
										id: 'busfile1',
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
												//����ѡ�񸽼���ɾ��ԭ���ĸ��� ��ԭ������id����������busfileids
												if(busfileids!=null&&busfileids!=""){
													Ext.lt.RCP.script(onlinehelpurl,"useonliehelp", "delfile", busfileids,function (resp) {
													});
												}
												busfileids="";
											}
										}
									},
						       	   {xtype:'textfield',hidden:true,readOnly:true,style:'background:#E6E6E6',hideLabel:true,fieldLabel:'',id:'bufanswerformtemid'},
							   	   {xtype:'textfield',hidden:true,readOnly:true,style:'background:#E6E6E6',hideLabel:true,fieldLabel:'',id:'bufanswerformadminstatus'}]
									}
								]
							}]
						}]
					}]
					
				});
			}	
			//�鿴�û�����------------------------------
			var fileid = rows[0].get("fileid");
			if(fileid!=null&&fileid!=""){
			var tempids = fileid.split("@");
				//��ѯ��������
			    Ext.lt.RCP.script(onlinehelpurl,"useonliehelp", "findfilename", fileid,function (resp) {
			  		for(var k = 0;k < resp.length;k ++){
			  			if(resp[k]!=""){
			  					var filepath=tempids[k]+"";
			  				  	Ext.getCmp('usershowfile'+userfile).show();
			  					Ext.getCmp('usershowfile'+userfile).setValue('<a href="'+onlinehelpurl+'/portaldownloadfile.page?path='+filepath+'">'+resp[k]+'</a>');
								userfile++;
			  			}
			  		}
			    });
			}else{
				var temph = Ext.getCmp('bufanswerform_questioncontent').height;
				temph=temph+20;
				Ext.getCmp('usershowfile1').hide();
				Ext.getCmp('usershowfile1').hideLabel=true;
				Ext.getCmp('bufanswerform_questioncontent').setHeight(temph);
			}
			//�鿴�𸴵ĸ���
			var answerfileid = rows[0].get("adminfileid");
			if(answerfileid!=null&&answerfileid!=""){
			var tempbusids = answerfileid.split("@");
				//��ѯ��������
			    Ext.lt.RCP.script(onlinehelpurl,"useonliehelp", "findfilename", answerfileid,function (resp) {
			  		for(var k = 0;k < resp.length;k ++){
			  			if(resp[k]!=""){
			  					var filepath=tempbusids[k]+"";
			  				  	Ext.getCmp('answershowfile'+buscount).show();
			  					Ext.getCmp('answershowfile'+buscount).setValue('<a href="'+onlinehelpurl+'/portaldownloadfile.page?path='+filepath+'">'+resp[k]+'</a>');
								buscount++;
			  			}
			  		}
			    });
			}else{
				if(Ext.getCmp('answershowfile1')!=null){
					Ext.getCmp('answershowfile1').hide();
					Ext.getCmp('answershowfile1').hideLabel=true;
					var temph = Ext.getCmp('bufanswerform_expertcontent').height;
					temph=temph+20;
					Ext.getCmp('bufanswerform_expertcontent').setHeight(temph);
				}
			}
			//�޸ĸ���
			var busfileid = rows[0].get("busfileid");
			busfileids = busfileid;
			if(busfileid!=null&&busfileid!=""){
				//��ѯ��������
			    Ext.lt.RCP.script(onlinehelpurl,"useonliehelp", "findfilename", busfileid,function (resp) {
			  		for(var k = 0;k < resp.length;k ++){
			  			if(resp[k]!=""){
			  					Ext.getCmp('busfile'+filecount).show();
			  					Ext.getCmp('busfile'+filecount).setValue(resp[k]);
								//Ext.getCmp('clear'+filecount).show();
								Ext.getCmp('liulan'+filecount).show();
								//Ext.getCmp('liulan'+filecount).setDisabled(true);
								filecount++;
			  			}
			  		}
			  		if(filecount>1)filecount--;
			    });
			
			}
			//---ר�Ҵ𸴴���--
		    var busanswerwin = new Ext.Window({
				buttonAlign: 'right',
				id:'busanswerwin',
				width:800,
				autoHeight:true,
				closeAction:'close',
				modal: true,
				buttons:[{text:'��  ��',id:'busanswer',listeners:{'click':function(){
							var config=new Object();
							config.expert=Ext.getCmp("bufanswerform_busoffer").getValue();
							config.expertdate=Ext.getCmp("bufanswerform_bufanswerdate").getValue();
							config.expertadvice=Ext.getCmp("bufanswerform_expertcontent").getValue();
							config.itemid=rows[0].get("itemid");
							config.adminstatus=rows[0].get("adminstatus");
							if(config.expertadvice.trim().length==0){
								alert("�����鲻��Ϊ��");return;
							}else if(config.expertadvice.length>500){
								alert("�����鲻�ܴ���500��");return;
							}
							if(confirm("ȷ�ϴ���")){
								Ext.getCmp('busanswer').setDisabled(true);
								saveQuit();//�ϴ�����
							}
						  }}
					    },{text:'��  ��',listeners:{'click':function(){
					    		if(confirm("ȷ�Ϲرմ�����")){
					    			busanswerwin.close();
					    		}	
					    	}}
					  }],
				items:[bufanswerform],
				listeners: {
					'show': function() {
						Ext.getCmp("bufanswerform_expertcontent").focus(true, true);
					}
					,'close': function() {
						filecount=1;
						userfile=1;//�û���������
						buscount=1;//ҵ�񸽼�����
					} 
				} 
			});
			
			Ext.getCmp("bufanswerform_questionuser").setValue(rows[0].get("questionuser"));
			Ext.getCmp("bufanswerform_questiondate").setValue(rows[0].get("questiondate"));
			Ext.getCmp("bufanswerform_questionarea").setValue(rows[0].get("questionagency"));
			Ext.getCmp("adminleveltype").setValue(rows[0].get("leveltype"));
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
				Ext.getCmp('bufanswerform_questiontype').setValue(names);
			}
			Ext.getCmp("bufanswerform_questiontel").setValue(rows[0].get("telnumber"));
			Ext.getCmp("bufanswerform_questiontitle").setValue(rows[0].get("questionname"));
			Ext.getCmp("bufanswerform_questioncontent").setValue(rows[0].get("questioncontent"));
			Ext.getCmp("bufanswerform_answeruser").setValue(rows[0].get("answeruser"));
			Ext.getCmp("bufanswerform_answerdate").setValue(rows[0].get("answerdate"));
			if(rows[0].get("answercontent")!=null&&rows[0].get("answercontent")!=""){
				Ext.getCmp("bufanswerform_answercontent").setValue(rows[0].get("answercontent"));
			}else{
				Ext.getCmp("bufanswerform_answercontent").setValue("(���޴����ݣ��ȴ�ҵ��ר�ҵĴ������)");
			}
			if(rows[0].get("expertadvice")!=null&&rows[0].get("expertadvice")!=""){
				Ext.getCmp("bufanswerform_expertcontent").setValue(rows[0].get("expertadvice"));
			}
			Ext.getCmp("bufanswerform_questionstatus").setValue(rows[0].get("busofficestatus"));
			Ext.getCmp("bufanswerformtemid").setValue(rows[0].get("itemid"));
			Ext.getCmp("bufanswerformadminstatus").setValue(rows[0].get("adminstatus"));
			Ext.getCmp("bufanswerform_busoffer").setValue(username);
			Ext.getCmp("bufanswerform_bufanswerdate").setValue(time);
			if(Ext.getCmp("bufanswerform_givebackadvise")!=undefined){//�˻صĴ���
				Ext.getCmp("bufanswerform_givebackadvise").setValue(rows[0].get("givebackadvice"));
			}
			busanswerwin.show();
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
			curpage=1;
			pager.cursor=0;
			pager.inputItem.setValue(1);
			var search = new Object();
			search.area=localquestionarea;
			search.flag="0"
			search.typemap=typemap;
			Ext.lt.RCP.script(onlinehelpurl,"busofficehelp", "query", search,function (resp) {alert("rsp");
				data=resp;
				store.loadData(GetPagerData(resp));
				pager.doLoad(0);
				busOffcieAnswerGrid.doLayout();
			},function(){});
		}
		
		busOffcieAnswerGrid.loadGrid=function(search){
			search.area=localquestionarea;
			search.typemap=typemap;
			curpage=1;
			pager.cursor=0;
			pager.inputItem.setValue(1);
			Ext.lt.RCP.script(onlinehelpurl,"busofficehelp", "query", search,function (resp) {
				data=resp;
				store.loadData(GetPagerData(resp));
				pager.doLoad(0);
				busOffcieAnswerGrid.doLayout();
			},function(){});
			
		}
	/***
	 *�鿴��������-----------------------------------------------------------------------------------------------------
	 */
	busOffcieAnswerGrid.processflow = function(){
		var rows = busOffcieAnswerGrid.getSelectionModel().getSelections();
		if(rows.length<1){
				alert("��ѡ��Ҫ�鿴���̵�����");return;
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
		function show(){
			showwin.show();
		}
		//loadGridPanel();
	return busOffcieAnswerGrid;
}
function busanswersave(){
		var config=new Object();
		config.oldfileids=busfileids;
		config.expert=Ext.getCmp("bufanswerform_busoffer").getValue();
		config.expertdate=Ext.getCmp("bufanswerform_bufanswerdate").getValue();
		config.expertadvice=Ext.getCmp("bufanswerform_expertcontent").getValue();
		config.itemid=Ext.getCmp("bufanswerformtemid").getValue();
		config.adminstatus=Ext.getCmp("bufanswerformadminstatus").getValue();
		config.usercode=usercode;
		config.area=localquestionarea;
		Ext.lt.RCP.script(onlinehelpurl,"busofficehelp", "answer", config,function (resp) {
			 Ext.getCmp('busanswerwin').close();
			 var temp= {};
			 temp.flag="0";
		 	 Ext_lt_BusOfficeAnswerContent.loadGrid(temp);
		});
}