Ext_lt_BusOfficeAnswerContent = new function(){
		var PerCount = 20;
		var curpage=1;
		var userfile=1;//用户附件数量
		var filecount=1;//附件数量
		var buscount=1;//附件数量
		//待处理----------------------------------------------------------------------------
		var fasptableData = [
			     		        ['0','待答复'],
			     		        ['1','已答复'],
			     		        ['2','用户退回']
			     	];
		var elementcodeStroe = new Ext.data.SimpleStore({
			fields: ['value', 'text'],
			data:fasptableData
		});
	    function questionresultState(val){
	  		if(val==0){
	  			return '<div style=\'color:#FF0000\'>'+'待答复'+'</div>'
	  		}else if(val==1){
	  			return '<div style=\'color:#00FF00\'>'+'已答复'+'</div>'
	  		}else if(val==2){
	  			return '<div style=\'color:#AA7700\'>'+'用户退回'+'</div>'
	  		}else{
    			return '<div style=\'color:#0000CC\'>'+'已解决'+'</div>'
    		}
	  	}
	  	function findgridquestiontype(val){
			var results="";
			var types = val.split(',');
			for(var z=0;z<typemap.length;z++){
				for(var k = 0;k < types.length;k ++){
					if(typemap[z].itemid == types[k]){
						results += typemap[z].name+"，";
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
	    var sm = new Ext.grid.CheckboxSelectionModel({checkOnly:true});//checkbox多选框的对象
		var cm = new Ext.grid.ColumnModel([
			                   				new Ext.grid.RowNumberer(),
			                   				sm,
			                   				{header:'编号',dataIndex:'itemid',width:30,sortable:true,menuDisabled:true},
			                   				{header:'提问标题',dataIndex:'questionname',sortable:true,menuDisabled:true},
			                   				{header:'提问内容',dataIndex:'questioncontent',hidden:true,menuDisabled:true},
			                   				{header:'提问单位',dataIndex:'questionagency',width:60,sortable:true,menuDisabled:true},
			                   				{header:'提问地区',dataIndex:'questionarea',hidden:officeset==0?true:false,width:50,sortable:true,menuDisabled:true},
			                   				{header:'提问时间',dataIndex:'questiondate',width:50,sortable:true,menuDisabled:true},
			                   				{header:'联系电话',dataIndex:'telnumber',hidden:true,menuDisabled:true},
			                   				{header:'问题类型',dataIndex:'questiontype',renderer:findgridquestiontype,width:60,sortable:true,menuDisabled:true},
				                   			{header:'紧急类型',dataIndex:'leveltype',renderer:findgridleveltype,width:30,sortable:true,menuDisabled:true},
			                   				{header:'问题状态',dataIndex:'busofficestatus',renderer:questionresultState,width:30,sortable:true,menuDisabled:true},
			                   				{header:'管理员状态',dataIndex:'adminstatus',hidden:true,menuDisabled:true},
			                   				{header:'答复时间',dataIndex:'answerdate',hidden:true,menuDisabled:true},
			                   				{header:'答复人',dataIndex:'answeruser',hidden:true,menuDisabled:true},
			                   				{header:'提问人',dataIndex:'questionuser',hidden:true,menuDisabled:true},
			                   				{header:'答复内容',dataIndex:'answercontent',hidden:true,menuDisabled:true},
			                   				{header:'附件id',dataIndex:'fileid',hidden:true,menuDisabled:true},
			                   				{header:'管理员附件id',dataIndex:'adminfileid',hidden:true,menuDisabled:true},
			                   				{header:'业务附件id',dataIndex:'busfileid',hidden:true,menuDisabled:true},
			                   				{header:'专家意见',dataIndex:'expertadvice',hidden:true,menuDisabled:true},
			                   				{header:'专家',dataIndex:'expert',hidden:true,menuDisabled:true},
					                   		{header:'处理时间',dataIndex:'advicedate',hidden:true,menuDisabled:true},
					                   		{header:'用户意见',dataIndex:'givebackadvice',hidden:true,menuDisabled:true}
			                   				
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
			    beforePageText: '页',
				pageSize:PerCount,
				store:store,
				displayInfo: true,   
				firstText: '第一页',
				prevText: '前一页',
				nextText: '后一页',
				lastText: '最后一页',
				refreshText: '刷新',
				emptyMsg: "没有记录",
				moveNext:function(){//下一页
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
			   doRefresh:function(){//刷新方法
					   		var t=this.cursor;                
		  				    this.cursor=t;                
		  				    this.doLoad(t);        
				},
			   updateInfo:function (){//重写UpdateInfo        
							if(this.displayInfo){
				                var count=this.store.getCount();             
				                var msg=count==0?this.emptyMsg:String.format(this.displayMsg,this.cursor+1,Math.min(this.cursor+this.pageSize-1,data.data.length-1)+1,data.data.length);               
				             }
				 },          
		        onLoad:function (store,r,o){//重写OnLoad
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
				 doLoad:function (start){//重写doLoad  
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
				 getPageData:function (){//重写getPageData 
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
			title:'待处理',
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
		 * 查看问题------------------------------------------------------------------
		 */
		busOffcieAnswerGrid.showpanel = function(){
			var rows = busOffcieAnswerGrid.getSelectionModel().getSelections();
			if(rows.length<1){alert("请选择要查看的数据");return;}else if(rows.length>1){alert("请选择一条数据查看");return;}
			var showbusOffcieAnswerform = new Ext.form.FormPanel({
				id:'showbusAnswerformnoanswer',
				labelWidth:65 ,
				title: '提问信息明细',
				frame:true,
				layout:'fit',
				height:400,
				items:[{
					layout:'column',
					items:[{
						columnWidth:.5,
						layout: 'form',
						items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提 问 人 ',id:'busofficeform_questionPreson',anchor:'96%'},
						       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'问题类型',id:'busofficeform_questionType',anchor:'96%'},
						       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问单位',id:'busofficeform_questionArea',anchor:'96%'}
						]
					},{
					layout:'form',
					columnWidth:.5,
					items:[{
							columnWidth:.5,
							layout: 'form',
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问时间',id:'busofficeform_questionTime',anchor:'96%'},
						       	   {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'联系电话',id:'busofficeform_questionTelephone',anchor:'96%'}
							  ]
						  },{
							layout: 'column',
							items:[{
									columnWidth:.5,
									layout: 'form',
									items:[{xtype:'combo',readOnly:true,style:'background:#E6E6E6',fieldLabel:'问题状态',id:'busofficeform_questionState',anchor:'92%'
								    	  ,displayField:'text',
							               valueField:'value',
							               triggerAction:"all",
							               typeAhead: true,
						                   store:elementcodeStroe
							   	   }]
						 	 },{
									columnWidth:.5,
									layout: 'form',
									items:[{xtype:'combo',readOnly:true,style:'background:#E6E6E6',fieldLabel:'紧急类型',id:'adminleveltype',anchor:'92%',
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
						items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问标题',id:'busofficeform_questionTitle',anchor:'99%'},
						       {xtype:'textarea',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问内容',height:220,id:'busofficeform_questionContent',anchor:'99%'}
						]
					},{
					layout:'form',
					columnWidth:.99,
					items:[{
						  xtype:"displayfield",       
					      name:"content",   
					      id:'showfile',    
					      fieldLabel: '附&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp件',     
					      value:''    
						}]
					}]
				}]
			});
			//查看附件
			var fileids = rows[0].get("fileid");
			if(fileids!=null&&fileids!=""){
				//查询附件名字
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
			//查看问题的tabpanel
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
			//查询所有答复记录，并动态添加tab页
			Ext.lt.RCP.script(onlinehelpurl,"useonliehelp", "showquestion", rows[0].get("itemid") ,function (resp) {
					for(var k = 0;k < resp.length;k ++){
						var opp=resp[k];
						var operateuser=opp.operateuser;
						var operatedate=opp.operatedate;
						var operatetype=opp.operatetype;
						var content=opp.content;
						var fileid = opp.fileid;
						var filename=opp.filename;
						var titlename="答复信息";
						if(operatetype==1){
							titlename="一线支持答复";
						}else if(operatetype==2){
							titlename="二线支持答复";
						}else if(operatetype==8){
							titlename="专家答复";
						}else if(operatetype==9){
							titlename="审核人答复";
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
									items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',value:operateuser,fieldLabel:'答 复 人 ',id:'',anchor:'96%'}]
								},{
									columnWidth:.5,
									layout: 'form',
									items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',value:operatedate,fieldLabel:'答复时间',id:'',anchor:'96%'}]
								},{
									layout:'form',
									columnWidth:.99,
									items:[{xtype:'textarea',readOnly:true,style:'background:#E6E6E6',value:content,fieldLabel:'答复内容',height:300,id:'anscontent'+k,anchor:'99%'}]
								},{
									layout:'form',
									columnWidth:.99,
									items:[{
										  xtype:"displayfield",       
									      name:"content",   
									      id:'showfile'+k,
									      fieldLabel: '附&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp件',     
									      value:''    
									  }]
								 }]
							}]
						});
						//查看附件
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
	   		//查看问题的window		
			var busshowwin = new Ext.Window({
				buttonAlign: 'right',
				id:'busshowwin',
				width:800,
				autoHeight:true,
				closeAction:'close',
				modal: true,
				buttons:[{text :'关  闭',listeners:{'click':function(){busshowwin.close();}}}],
				items:[supershowTabPanel],
				listeners: {
					'close': function() {
						filecount=1;
						userfile=1;//用户附件数量
						buscount=1;//业务附件数量
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
		 * 答复问题-----------------------------------------------------------------------------------------------------------------
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
				alert("请选择待处理中的数据进行答复");return;
			}else if(rows.length>1){
				alert("请选择一条数据进行答复");return;
			}
			var bufanswerform;
			if(rows[0].get("givebackadvice")==null||rows[0].get("givebackadvice")==""){//未答复
				bufanswerform = new Ext.form.FormPanel({
					id:'bufanswerform',
					labelWidth:65 ,
					title: '提问信息明细',
					frame:true,
					layout:'fit',
					height:500,
					items:[{
						layout:'column',
						items:[{
							columnWidth:.5,
							layout: 'form',
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提 问 人 ',id:'bufanswerform_questionuser',anchor:'96%'},
						           {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问单位',id:'bufanswerform_questionarea',anchor:'96%'},
						      	   {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'问题类型',id:'bufanswerform_questiontype',anchor:'96%'}]
					    },{
						layout:'form',
						columnWidth:.5,
						items:[{
								columnWidth:.5,
								layout: 'form',
								items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问时间',id:'bufanswerform_questiondate',anchor:'96%'},
							       	   {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'联系电话',id:'bufanswerform_questiontel',anchor:'96%'}]
							  },{
								layout: 'column',
								items:[{
										columnWidth:.5,
										layout: 'form',
										items:[{xtype:'combo',readOnly:true,style:'background:#E6E6E6',fieldLabel:'问题状态',id:'bufanswerform_questionstatus',anchor:'92%'
									    	  ,displayField:'text',
								               valueField:'value',
								               triggerAction:"all",
								               typeAhead: true,
							                   store:elementcodeStroe
								   	   }]
							 	 },{
										columnWidth:.5,
										layout: 'form',
										items:[{xtype:'combo',readOnly:true,style:'background:#E6E6E6',fieldLabel:'紧急类型',id:'adminleveltype',anchor:'92%',
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
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问标题',id:'bufanswerform_questiontitle',anchor:'99%'},
							       {xtype:'textarea',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问内容',height:65,id:'bufanswerform_questioncontent',anchor:'99%'}]
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
										      fieldLabel: '附&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp件',     
										      value:''    
									}]
								}]
						   }]
						},{
							columnWidth:.5,
							layout: 'form',
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'答 复 人 ',id:'bufanswerform_answeruser',anchor:'96%'}]
						},{
							columnWidth:.5,
							layout: 'form',
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'答复时间',id:'bufanswerform_answerdate',anchor:'96%'}]
						},{
							layout:'form',
							columnWidth:.99,
							items:[{xtype:'textarea',readOnly:true,style:'background:#E6E6E6',fieldLabel:'答复内容',height:65,id:'bufanswerform_answercontent',anchor:'99%'}]
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
									      fieldLabel: '附&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp件',     
									      value:''    
										}]
									}]
							   }]
						},{
							columnWidth:.5,
							layout: 'form',
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'业务专家 ',id:'bufanswerform_busoffer',anchor:'96%'}]
						},{
							columnWidth:.5,
							layout: 'form',
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'答复时间',id:'bufanswerform_bufanswerdate',anchor:'96%'}]
						},{
							layout:'form',
							columnWidth:.99,
							items:[
								{xtype:'textarea',readOnly:false,fieldLabel:'处理意见:'+redStar+"<font  color='red'>(500字以内)</font>",labelSeparator:'',height:65,id:'bufanswerform_expertcontent',anchor:'99%'}]
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
										fieldLabel: '附&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp件',
										emptyText: '',
										name: 'file',
										readOnly:false,
										buttonText: '浏览',
										buttonCfg: {
											id:'liulan1',
											width:'65'
										},
										listeners: {
											'fileselected': function(fb, v){
												//重新选择附件，删除原来的附件 ，原来附件id————》busfileids
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
			}else{//退回后再次发送到业务专家
			     bufanswerform = new Ext.form.FormPanel({
					id:'auditedQuestionform',
					labelWidth:65,
					title: '提问信息明细',
					frame:true,
					layout:'fit',
					height:500,
					items:[{
						layout:'column',
						items:[{
							columnWidth:.5,
							layout: 'form',
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提 问 人 ',id:'bufanswerform_questionuser',anchor:'96%'},
						           {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问单位',id:'bufanswerform_questionarea',anchor:'96%'},
						      	   {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'问题类型',id:'bufanswerform_questiontype',anchor:'96%'}]
					    },{
						layout:'form',
						columnWidth:.5,
						items:[{
								columnWidth:.5,
								layout: 'form',
								items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问时间',id:'bufanswerform_questiondate',anchor:'96%'},
							       	   {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'联系电话',id:'bufanswerform_questiontel',anchor:'96%'}
								  ]
							  },{
								layout: 'column',
								items:[{
										columnWidth:.5,
										layout: 'form',
										items:[{xtype:'combo',readOnly:true,style:'background:#E6E6E6',fieldLabel:'问题状态',id:'bufanswerform_questionstatus',anchor:'92%'
									    	  ,displayField:'text',
								               valueField:'value',
								               triggerAction:"all",
								               typeAhead: true,
							                   store:elementcodeStroe
								   	   }]
							 	 },{
										columnWidth:.5,
										layout: 'form',
										items:[{xtype:'combo',readOnly:true,style:'background:#E6E6E6',fieldLabel:'紧急类型',id:'adminleveltype',anchor:'92%',
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
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问标题',id:'bufanswerform_questiontitle',anchor:'99%'},
							       {xtype:'textarea',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问内容',height:55,id:'bufanswerform_questioncontent',anchor:'99%'}]
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
										      fieldLabel: '附&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp件',     
										      value:''    
									}]
								}]
						   }]
						},{
							columnWidth:.5,
							layout: 'form',
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'答 复 人 ',id:'bufanswerform_answeruser',anchor:'96%'}]
						},{
							columnWidth:.5,
							layout: 'form',
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'答复时间',id:'bufanswerform_answerdate',anchor:'96%'}]
						},{
							layout:'form',
							columnWidth:.99,
							items:[{xtype:'textarea',readOnly:true,style:'background:#E6E6E6',fieldLabel:'答复内容',height:55,id:'bufanswerform_answercontent',anchor:'99%'}]
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
									      fieldLabel: '附&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp件',     
									      value:''    
										}]
									}]
							   }]
						},{
							layout:'form',
							columnWidth:.99,
							items:[
								{xtype:'textarea',readOnly:true,style:'background:#E6E6E6',fieldLabel:'用户意见',height:30,id:'bufanswerform_givebackadvise',anchor:'99%'}
								]
						},{
							columnWidth:.5,
							layout: 'form',
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'业务专家 ',id:'bufanswerform_busoffer',anchor:'96%'}]
						},{
							columnWidth:.5,
							layout: 'form',
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'答复时间',id:'bufanswerform_bufanswerdate',anchor:'96%'}]
						},{
							layout:'form',
							columnWidth:.99,
							items:[
								{xtype:'textarea',readOnly:false,fieldLabel:'处理意见:'+redStar+"<font  color='red'>(500字以内)</font>",labelSeparator:'',height:50,id:'bufanswerform_expertcontent',anchor:'99%'}]
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
										fieldLabel: '附&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp件',
										emptyText: '',
										name: 'file',
										readOnly:false,
										buttonText: '浏览',
										buttonCfg: {
											id:'liulan1',
											width:'65'
										},
										listeners: {
											'fileselected': function(fb, v){
												//重新选择附件，删除原来的附件 ，原来附件id————》busfileids
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
			//查看用户附件------------------------------
			var fileid = rows[0].get("fileid");
			if(fileid!=null&&fileid!=""){
			var tempids = fileid.split("@");
				//查询附件名字
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
			//查看答复的附件
			var answerfileid = rows[0].get("adminfileid");
			if(answerfileid!=null&&answerfileid!=""){
			var tempbusids = answerfileid.split("@");
				//查询附件名字
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
			//修改附件
			var busfileid = rows[0].get("busfileid");
			busfileids = busfileid;
			if(busfileid!=null&&busfileid!=""){
				//查询附件名字
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
			//---专家答复窗口--
		    var busanswerwin = new Ext.Window({
				buttonAlign: 'right',
				id:'busanswerwin',
				width:800,
				autoHeight:true,
				closeAction:'close',
				modal: true,
				buttons:[{text:'答  复',id:'busanswer',listeners:{'click':function(){
							var config=new Object();
							config.expert=Ext.getCmp("bufanswerform_busoffer").getValue();
							config.expertdate=Ext.getCmp("bufanswerform_bufanswerdate").getValue();
							config.expertadvice=Ext.getCmp("bufanswerform_expertcontent").getValue();
							config.itemid=rows[0].get("itemid");
							config.adminstatus=rows[0].get("adminstatus");
							if(config.expertadvice.trim().length==0){
								alert("处理建议不能为空");return;
							}else if(config.expertadvice.length>500){
								alert("处理建议不能大于500字");return;
							}
							if(confirm("确认答复吗？")){
								Ext.getCmp('busanswer').setDisabled(true);
								saveQuit();//上传附件
							}
						  }}
					    },{text:'关  闭',listeners:{'click':function(){
					    		if(confirm("确认关闭窗口吗？")){
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
						userfile=1;//用户附件数量
						buscount=1;//业务附件数量
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
				Ext.getCmp("bufanswerform_answercontent").setValue("(暂无答复内容，等待业务专家的处理意见)");
			}
			if(rows[0].get("expertadvice")!=null&&rows[0].get("expertadvice")!=""){
				Ext.getCmp("bufanswerform_expertcontent").setValue(rows[0].get("expertadvice"));
			}
			Ext.getCmp("bufanswerform_questionstatus").setValue(rows[0].get("busofficestatus"));
			Ext.getCmp("bufanswerformtemid").setValue(rows[0].get("itemid"));
			Ext.getCmp("bufanswerformadminstatus").setValue(rows[0].get("adminstatus"));
			Ext.getCmp("bufanswerform_busoffer").setValue(username);
			Ext.getCmp("bufanswerform_bufanswerdate").setValue(time);
			if(Ext.getCmp("bufanswerform_givebackadvise")!=undefined){//退回的待答复
				Ext.getCmp("bufanswerform_givebackadvise").setValue(rows[0].get("givebackadvice"));
			}
			busanswerwin.show();
		}
	
		 function GetPagerData(InData)//从静态数据中获取每页的数据
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
		
		
		//查询
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
	 *查看问题流程-----------------------------------------------------------------------------------------------------
	 */
	busOffcieAnswerGrid.processflow = function(){
		var rows = busOffcieAnswerGrid.getSelectionModel().getSelections();
		if(rows.length<1){
				alert("请选择要查看流程的数据");return;
		}else if(rows.length>1){
				alert("请选择一条数据");return;
		}
	    var cm = new Ext.grid.ColumnModel([
		                   				new Ext.grid.RowNumberer(),
  	                   				     {header:'操作人',dataIndex:'operateuser',sortable:true,menuDisabled:true},
		                   				 {header:'操作时间',dataIndex:'operatedate',sortable:true,menuDisabled:true},
		       							 {header:'操作',dataIndex:'operate',sortable:true,menuDisabled:true}
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
			title:'问题处理流程',
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
	   //查看问题流程的window
	   var mywin = new Ext.Window({
					buttonAlign: 'right',
					width:500,
					height:350,
					closeAction:'close',
					modal: true,
					items:[mygrid],
					buttons:[{text :'关  闭',listeners:{'click':function(){mywin.close();}}}]
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