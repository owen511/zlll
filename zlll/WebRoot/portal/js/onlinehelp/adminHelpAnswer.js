Ext_lt_AdminAnswerContent = new function(){
		var PerCount = 20;
		var curpage=1;
		var userfile=1;//用户附件数量
		var filecount=1;//附件数量
		var buscount=1;//附件数量
		//待处理----------------------------------------------------------------------------
		var fasptableData = [
		     				['0','待答复'],
		     				['1','已答复'],
		     				['4','用户退回'],
		     				['3','发送专家'],
		     				['2','发送上级'],
		     				['5','已解决'],
		     				['6','专家已答复']
		     	];
		var elementcodeStroe = new Ext.data.SimpleStore({
			fields: ['value', 'text'],
			data:fasptableData
		});
		//-----------------------------------------------------------------------------
	  	function questionresultState(val){
	  			val=val+"";
				if(val.indexOf(usertype+"0")!=-1){
					return '<div style=\'color:#FF0000\'>'+'待答复'+'</div>'
				}else if(val.indexOf(usertype+"1")!=-1){
					return '<div style=\'color:#0000FF\'>'+'已答复'+'</div>'
				}else if(val.indexOf(usertype+"4")!=-1){
					return '<div style=\'color:#AA7700\'>'+'用户退回'+'</div>'
				}else if(val.indexOf(usertype+"3")!=-1){
					return '<div style=\'color:\'>'+'发送专家'+'</div>'
				}else if(val.indexOf(usertype+"2")!=-1){
					return '<div style=\'color:#AA7700\'>'+'发送上级'+'</div>'
				}else if(val.indexOf(usertype+"6")!=-1){
					return '<div style=\'color:#00FF00\'>'+'专家已答复'+'</div>'
				}else{
					return '<div style=\'color:#00FF00\'>'+'已解决'+'</div>'
				}
		}
		function findgridquestiontype(val){
			if(val==null||val.length==0)return "" ;
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
			if(val==null||val.length==0)return "" ;
			for(var z=0;z<(levelmap.data).length;z++){
				if(levelmap.data[z].itemid==val){
					return levelmap.data[z].questionlevel;
				}
			}     
		}
		//鼠标放在某一列上,就会有tip
		//Ext.QuickTips.init();
		//---------------------------------------------------------------------------------
		/***
		 * 主显示窗体
		 */
		var sm = new Ext.grid.CheckboxSelectionModel({checkOnly:true});//checkbox多选框的对象
		var cm = new Ext.grid.ColumnModel([
			                   				new Ext.grid.RowNumberer(),
			                   				sm,
			                   				{header:'编号',dataIndex:'itemid',width:30,sortable:true,menuDisabled:true},
			                   				{header:'提问标题',dataIndex:'questionname',sortable:true,menuDisabled:true},
			                   				/*{header:'提问标题',dataIndex:'questionname',sortable:true,menuDisabled:true,renderer:function(value,metaData,record,colIndex,store,view) { 
			                   						return '<div ext:qtitle="" ext:qtip="' + value + '">'+ value +'</div>';          
			                   					}  
			                   				},//鼠标放在某一列上,就会有tip
			                   				*/
			                   				{header:'提问内容',dataIndex:'questioncontent',hidden:true,menuDisabled:true},
			                   				{header:'提问单位',dataIndex:'questionagency',width:60,sortable:true,menuDisabled:true},
			                   				{header:'提问地区',dataIndex:'questionarea',hidden:adminset==0?true:false,width:50,sortable:true,menuDisabled:true},
			                   				{header:'提问时间',dataIndex:'questiondate',width:50,sortable:true,menuDisabled:true},
			                   				{header:'联系电话',dataIndex:'telnumber',hidden:true,sortable:true,menuDisabled:true},
			                   				{header:'问题类型',dataIndex:'questiontype',renderer:findgridquestiontype,width:60,sortable:true,menuDisabled:true},
				                   			{header:'紧急类型',dataIndex:'leveltype',renderer:findgridleveltype,width:30,sortable:true,menuDisabled:true},
			                   				{header:'问题状态',dataIndex:'adminstatus',renderer:questionresultState,width:30,sortable:true,menuDisabled:true},
			                   				{header:'问题状态',dataIndex:'superadminstatus',hidden:true,menuDisabled:true},
			                   				{header:'答复时间',dataIndex:'answerdate',hidden:true,menuDisabled:true},
			                   				{header:'答复人',dataIndex:'answeruser',hidden:true,menuDisabled:true},
			                   				{header:'提问人',dataIndex:'questionuser',hidden:true,menuDisabled:true},
			                   				{header:'答复内容',dataIndex:'answercontent',hidden:true,menuDisabled:true},
			                   				{header:'业务专家',dataIndex:'expert',hidden:true,menuDisabled:true},
			                   				{header:'答复时间',dataIndex:'advicedate',hidden:true,menuDisabled:true},
			                   				{header:'修改意见',dataIndex:'expertadvice',hidden:true,menuDisabled:true},
			                   				{header:'附件id',dataIndex:'fileid',hidden:true,menuDisabled:true},
			                   				{header:'管理员附件id',dataIndex:'adminfileid',hidden:true,menuDisabled:true},
			                   				{header:'业务附件id',dataIndex:'busfileid',hidden:true,menuDisabled:true},
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
				                // this.displayItem.setText(msg);
				             }
				 },
			    onPageSizeChanged:function(combo){alert("123");}	   ,             
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
						// this.loading.enable();            
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
			title:'待处理',
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
		 * 查看问题
		 */
		adminanswerGrid.showpanel = function(){
			var rows = adminanswerGrid.getSelectionModel().getSelections();
			if(rows.length<1){alert("请选择要查看的数据");return;}else if(rows.length>1){alert("请选择一条数据查看");return;}
			var tempstatus = rows[0].get("adminstatus");
			var showadminwin = new Ext.form.FormPanel({
					id:'showanswerform',
					labelWidth:65 ,
					title: '提问信息明细',
					frame:true,
					layout:'fit',
					height:300,
					items:[{
						layout:'column',
						items:[{
							columnWidth:.5,
							layout: 'form',
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提 问 人 ',id:'showquestionPreson',anchor:'96%'},
							       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问单位',id:'showquestionState',anchor:'96%'},
							       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'问题类型',id:'showquestionType',anchor:'96%'}
							]
						},
						{
							layout:'form',
							columnWidth:.5,
							items:[{
									columnWidth:.5,
									layout: 'form',
									items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问时间',id:'showquestionTime',anchor:'96%'},
								       	   {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'联系电话',id:'showquestionTelephone',anchor:'96%'}
									  ]
								  },{
									layout: 'column',
									items:[{
											columnWidth:.5,
											layout: 'form',
											items:[{xtype:'combo',readOnly:true,style:'background:#E6E6E6',fieldLabel:'问题状态',id:'showquestionProcess',anchor:'92%'
										    	  ,displayField:'text',
									               valueField:'value',
									               triggerAction:"all",
									               typeAhead: true,
								                   store:elementcodeStroe
									   	   }]
								 	 },{
											columnWidth:.5,
											layout: 'form',
											items:[{xtype:'combo',readOnly:true,style:'background:#E6E6E6',fieldLabel:'紧急类型',id:'showadminleveltype',anchor:'92%',
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
						items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问标题',id:'showquestionName',anchor:'99%'},
						       {xtype:'textarea',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问内容',height:220,id:'showquestionContent',anchor:'99%'}]
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
				var temph = Ext.getCmp('showquestionContent').height;
				temph=temph+20;
				Ext.getCmp('showfile').hide();
				Ext.getCmp('showfile').hideLabel=true;
				Ext.getCmp('showquestionContent').setHeight(temph);
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
			supershowTabPanel.add(showadminwin);
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
			var showwindone = new Ext.Window({
				buttonAlign: 'right',
				id:'showwin_newQuestion',
				width:800,
				autoHeight:true,
				closeAction:'close',
				modal: true,
				items:[supershowTabPanel],
				buttons:[{text :'关  闭',listeners:{'click':function(){showwindone.close();}}}]
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
		 * 答复问题-------------------------------------------------------------------------------------------------------------------------
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
			if(rows.length<1){alert("请选择待处理中的数据进行答复");return;}else if(rows.length>1){alert("请选择一条数据答复");return;}
			var val = rows[0].get("adminstatus")+"";
			var adminanswerform;
			if(val.indexOf(usertype+"0")!=-1){//待答复
		 		adminanswerform = new Ext.form.FormPanel({
		 			id:'adminanswerform',
		 			labelWidth:65 ,
					title: '提问信息明细',
					frame:true,
					layout:'fit',
					height:440,
					items:[{
						layout:'column',
						items:[{
							columnWidth:.5,
							layout: 'form',
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提 问 人 ',id:'adminaskuser',anchor:'96%'},
							       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问单位',id:'adminaskagency',anchor:'96%'},
							       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'问题类型',id:'adminasktype',anchor:'96%'}]
						},{
						layout:'form',
						columnWidth:.5,
						items:[{
								columnWidth:.5,
								layout: 'form',
								items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问时间',id:'adminaskdate',anchor:'96%'},
							       	   {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'联系电话',id:'adminasktel',anchor:'96%'}
								  ]
							  },{
								layout: 'column',
								items:[{
										columnWidth:.5,
										layout: 'form',
										items:[{xtype:'combo',readOnly:true,style:'background:#E6E6E6',fieldLabel:'问题状态',id:'adminaskstatus',anchor:'92%'
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
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问标题',id:'adminasktitle',anchor:'99%'},
							       {xtype:'textarea',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问内容',height:100,id:'adminaskcontent',anchor:'99%'}]
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
								      fieldLabel: '附&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp件',     
								      value:''    
									}]
								}]
						   }]
						},{
							columnWidth:.5,
							layout: 'form',
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'答 复 人 ',id:'adminaskansweruser',anchor:'96%'}]
						},{
							columnWidth:.5,
							layout: 'form',
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'答复时间',id:'adminaskanswerdate',anchor:'96%'}]
						},{
							layout:'form',
							columnWidth:.99,
							items:[{xtype:'textarea',readOnly:false,fieldLabel:'答复内容:'+redStar+"<font  color='red'>(500字以内)</font>",labelSeparator:'',height:100,id:'adminaskanswercontent',anchor:'99%'}]
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
											//重新选择附件，删除原来的附件 ，原来附件id————》adminfileids
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
		 	}else if(val.indexOf(usertype+"6")!=-1&&(rows[0].get("givebackadvice")==null||rows[0].get("givebackadvice")=="")){//有处理意见的待答复
		 		adminanswerform = new Ext.form.FormPanel({
				id:'adminanswerform',
				labelWidth:65 ,
				title: '提问信息明细',
				frame:true,
				layout:'fit',
				height:505,
					items:[{
						layout:'column',
						items:[{
							columnWidth:.5,
							layout: 'form',
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提 问 人 ',id:'adminaskuser',anchor:'96%'},
							       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问单位',id:'adminaskagency',anchor:'96%'},
							       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'问题类型',id:'adminasktype',anchor:'96%'}]
									
						},{
						layout:'form',
						columnWidth:.5,
						items:[{
								columnWidth:.5,
								layout: 'form',
								items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问时间',id:'adminaskdate',anchor:'96%'},
							       	   {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'联系电话',id:'adminasktel',anchor:'96%'}
								  ]
							  },{
								layout: 'column',
								items:[{
										columnWidth:.5,
										layout: 'form',
										items:[{xtype:'combo',readOnly:true,style:'background:#E6E6E6',fieldLabel:'问题状态',id:'adminaskstatus',anchor:'92%'
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
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问标题',id:'adminasktitle',anchor:'99%'},
							       	{xtype:'textarea',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问内容',height:70,id:'adminaskcontent',anchor:'99%'}]
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
									      fieldLabel: '附&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp件',     
									      value:''    
										}]
									}]
							   }]
						},{
							columnWidth:.5,
							layout: 'form',
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'答 复 人 ',id:'adminaskansweruser',anchor:'96%'}
							]
						},{
							columnWidth:.5,
							layout: 'form',
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'答复时间',id:'adminaskanswerdate',anchor:'96%'}
							]
						},{
							layout:'form',
							columnWidth:.99,
							items:[
									{xtype:'textarea',readOnly:false,fieldLabel:'答复内容:'+redStar+"<font  color='red'>(500字以内)</font>",labelSeparator:'',height:70,id:'adminaskanswercontent',anchor:'99%'}
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
												//重新选择附件，删除原来的附件 ，原来附件id————》adminfileids
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
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'业务专家 ',id:'adminaskexpert',anchor:'96%'}
							]
						},{
							columnWidth:.5,
							layout: 'form',
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'答复时间',id:'adminaskexpertdate',anchor:'96%'}
							]
						},{
							layout:'form',
							columnWidth:.99,
							items:[
								{xtype:'textarea',readOnly:true,style:'background:#E6E6E6',fieldLabel:'处理意见',height:60,id:'adminaskexpertadvice',anchor:'99%'}
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
										      fieldLabel: '附&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp件',     
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
		 	}else if(val.indexOf(usertype+"4")!=-1&&(rows[0].get("expertadvice")==null||rows[0].get("expertadvice")=="")){//用户退回的待答复+无处理意见的待答复
			 	adminanswerform = new Ext.form.FormPanel({
					id:'adminanswerform',
					labelWidth:65 ,
					title: '提问信息明细',
					frame:true,
					layout:'fit',
					height:490,
						items:[{
							layout:'column',
							items:[{
								columnWidth:.5,
								layout: 'form',
								items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提 问 人 ',id:'adminaskuser',anchor:'96%'},
								       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问单位',id:'adminaskagency',anchor:'96%'},
								       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'问题类型',id:'adminasktype',anchor:'96%'}]
							
							},{
						layout:'form',
						columnWidth:.5,
						items:[{
								columnWidth:.5,
								layout: 'form',
								items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问时间',id:'adminaskdate',anchor:'96%'},
							       	   {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'联系电话',id:'adminasktel',anchor:'96%'}
								  ]
							  },{
								layout: 'column',
								items:[{
										columnWidth:.5,
										layout: 'form',
										items:[{xtype:'combo',readOnly:true,style:'background:#E6E6E6',fieldLabel:'问题状态',id:'adminaskstatus',anchor:'92%'
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
								items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问标题',id:'adminasktitle',anchor:'99%'},
								       	{xtype:'textarea',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问内容',height:95,id:'adminaskcontent',anchor:'99%'}]
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
									      fieldLabel: '附&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp件',     
									      value:''    
										}]
									}]
							   }]
							},{
								columnWidth:.5,
								layout: 'form',
								items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'答 复 人 ',id:'adminaskansweruser',anchor:'96%'}
								]
							},{
								columnWidth:.5,
								layout: 'form',
								items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'答复时间',id:'adminaskanswerdate',anchor:'96%'}]
							},{
								layout:'form',
								columnWidth:.99,
								items:[{xtype:'textarea',readOnly:false,fieldLabel:'答复内容:'+redStar+"<font  color='red'>(500字以内)</font>",labelSeparator:'',height:95,id:'adminaskanswercontent',anchor:'99%'}]
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
											fieldLabel: '附&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp件',
											emptyText: '',
											name: 'file',
											width:350,
											readOnly:false,
											buttonText: '浏览',
											buttonCfg: {
												id:'liulan1',
												width:'65'
											},
											listeners: {
											   'fileselected': function(fb, v){
													//重新选择附件，删除原来的附件 ，原来附件id————》adminfileids
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
								items:[{xtype:'textarea',readOnly:true,style:'background:#E6E6E6',fieldLabel:'用户意见 ',height:50,id:'adminaskgiveback',anchor:'99%'},
									   {xtype:'textfield',hidden:true,readOnly:true,style:'background:#E6E6E6',hideLabel:true,fieldLabel:'',id:'adminitemid'},
									   {xtype:'textfield',hidden:true,readOnly:true,style:'background:#E6E6E6',hideLabel:true,fieldLabel:'',id:'adminanswerstatus'},
									   {xtype:'textfield',hidden:true,readOnly:true,style:'background:#E6E6E6',hideLabel:true,fieldLabel:'',id:'admingivebackadvice'},
									   {xtype:'textfield',hidden:true,readOnly:true,style:'background:#E6E6E6',hideLabel:true,fieldLabel:'',id:'adminanswersuperadminstatus'}]
							}]
						}]
					});
		 	}else {//有处理意见+退回的待答复
		 		adminanswerform = new Ext.form.FormPanel({
					id:'adminanswerform',
					labelWidth:65 ,
					title: '提问信息明细',
					frame:true,
					layout:'fit',
					height:515,
						items:[{
							layout:'column',
							items:[{
								columnWidth:.5,
								layout: 'form',
								items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提 问 人 ',id:'adminaskuser',anchor:'96%'},
								       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问单位',id:'adminaskagency',anchor:'96%'},
								       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'问题类型',id:'adminasktype',anchor:'96%'}]
							},{
						layout:'form',
						columnWidth:.5,
						items:[{
								columnWidth:.5,
								layout: 'form',
								items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问时间',id:'adminaskdate',anchor:'96%'},
							       	   {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'联系电话',id:'adminasktel',anchor:'96%'}
								  ]
							  },{
								layout: 'column',
								items:[{
										columnWidth:.5,
										layout: 'form',
										items:[{xtype:'combo',readOnly:true,style:'background:#E6E6E6',fieldLabel:'问题状态',id:'adminaskstatus',anchor:'92%'
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
								items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问标题',id:'adminasktitle',anchor:'99%'},
								       	{xtype:'textarea',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问内容',height:60,id:'adminaskcontent',anchor:'99%'}]
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
										      fieldLabel: '附&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp件',     
										      value:''    
											}]
									}]
								}]
							},{
								columnWidth:.5,
								layout: 'form',
								items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'答 复 人 ',id:'adminaskansweruser',anchor:'96%'}]
							},{
								columnWidth:.5,
								layout: 'form',
								items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'答复时间',id:'adminaskanswerdate',anchor:'96%'}]
							},{
								layout:'form',
								columnWidth:.99,
								items:[{xtype:'textarea',readOnly:false,fieldLabel:'答复内容:'+redStar+"<font  color='red'>(500字以内)</font>",labelSeparator:'',height:65,id:'adminaskanswercontent',anchor:'99%'}]
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
													//重新选择附件，删除原来的附件 ，原来附件id————》adminfileids
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
								items:[{xtype:'textarea',readOnly:true,style:'background:#E6E6E6',fieldLabel:'用户意见 ',height:35,id:'adminaskgiveback',anchor:'99%'}]
							},{
								columnWidth:.5,
								layout: 'form',
								items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'业务专家 ',id:'adminaskexpert',anchor:'96%'}]
							},{
								columnWidth:.5,
								layout: 'form',
								items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'答复时间',id:'adminaskexpertdate',anchor:'96%'}]
							},{
								layout:'form',
								columnWidth:.99,
								items:[{xtype:'textarea',readOnly:true,style:'background:#E6E6E6',fieldLabel:'处理意见',height:45,id:'adminaskexpertadvice',anchor:'99%'}]
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
										      fieldLabel: '附&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp件',     
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
			//查看用户附件
			var fileid = rows[0].get("fileid");
			if(fileid!=null&&fileid!=""){
			var tempids = fileid.split("@");
				//查询附件名字
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
			//查看业务专家的附件
			var busfileid = rows[0].get("busfileid");
			if(busfileid!=null&&busfileid!=""){
			var tempbusids = busfileid.split("@");
				//查询附件名字
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
			//修改附件
			var adminfileid = rows[0].get("adminfileid");
			adminfileids = adminfileid;
			if(adminfileid!=null&&adminfileid!=""){
				//查询附件名字
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
			//答复窗口
		 	var answerwin = new Ext.Window({
				buttonAlign: 'right',
				id:'adminwinanswerwin',
				width:800,
				authHeight:true,
				closeAction:'close',
				modal: true,
				buttons:[{text:'提交业务专家',id:'submitbus',listeners:{'click':function(){
							var answercontent=Ext.getCmp("adminaskanswercontent").getValue();
							if(answercontent.length>500){
								alert("答复内容不能大于500字");
								return;
							}
							var confitmmsg = "确认提交吗";
							if(rows[0].get("expertadvice")!=null&&rows[0].get("expertadvice")!=""){
								confitmmsg = "业务专家已答复，确认再次提交吗";
							}
							if(confirm(confitmmsg)){
								gridid=2;
								Ext.getCmp('adminanswer').setDisabled(true);
								Ext.getCmp('submitbus').setDisabled(true);
								saveQuit();//上传附件
							}
							}}
						},{text:'答  复',id:'adminanswer',listeners:{'click':function(){
							var rows = adminanswerGrid.getSelectionModel().getSelections();
							var answercontent=Ext.getCmp("adminaskanswercontent").getValue();
							if(answercontent.trim().length==0){
								alert("答复内容不能为空");return;
							}else if(answercontent.length>500){
								alert("答复内容不能大于500字");
								return;
							}
							if(confirm("确认答复吗？")){
								gridid=1;
								Ext.getCmp('adminanswer').setDisabled(true);
								Ext.getCmp('submitbus').setDisabled(true);
								saveQuit();//上传附件
							}
							}}
						},{text:'关  闭',listeners:{'click':function(){
							if(confirm("确认关闭窗口吗？")){
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
						userfile=1;//用户附件数量
						buscount=1;//业务附件数量
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
			if(Ext.getCmp("adminaskexpert")!=undefined){//有处理意见的待答复
				Ext.getCmp("adminaskexpert").setValue(rows[0].get("expert"));
				Ext.getCmp("adminaskexpertdate").setValue(rows[0].get("advicedate"));
				Ext.getCmp("adminaskexpertadvice").setValue(rows[0].get("expertadvice"));
			}
			if(Ext.getCmp("adminaskgiveback")!=undefined){//退回的待答复
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
	 *查看问题流程-----------------------------------------------------------------------------------------------------
	 */
	adminanswerGrid.processflow = function(){
		var rows = adminanswerGrid.getSelectionModel().getSelections();
		if(rows.length<1){
				alert("请选择要查看流程的数据");	
			return;
		}else if(rows.length>1){
				alert("请选择一条数据");
				return;
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
		//本级无法解决，发送上级
		adminanswerGrid.superior = function(){
			var rows = adminanswerGrid.getSelectionModel().getSelections();
			if(rows.length<1){alert("请选择待处理中的数据");return;}
			var config=new Object();
			var itemids="";
			for(var j = 0;j < rows.length;j ++){
				itemids += "'" + rows[j].get("itemid")+"',";
			}
			config.itemids=itemids;
			config.adminstatus=rows[0].get("adminstatus");
			config.answeruser=username;
			config.usertype=usertype;
			if(confirm("确认提交该问题至"+nextoperate+"吗？")){
				Ext.lt.RCP.script(onlinehelpurl,"adminhelp", "superior", config,function (resp) {
					loadGridPanel();
				});
			}
		}
		//涉及业务，咨询专家
		adminanswerGrid.expert = function(){
			var rows = adminanswerGrid.getSelectionModel().getSelections();
			if(rows.length<1){alert("请选择待处理中的数据");return;}
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
			var confirmmsg="确认提交该问题至业务专家吗？";
			if(rows[0].get("expertadvice")!=null&&rows[0].get("expertadvice")!=""){
				confirmmsg="业务专家已答复，确认再次提交吗?"
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