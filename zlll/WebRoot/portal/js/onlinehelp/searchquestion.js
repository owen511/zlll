Ext_lt_SearchQuestion = new function(){
		var PerCount = 20;//每页显示数据量大小
		var curpage=1;//当前页
		var count=1;
		var tempsearchid=0;
		var filecount=1;//附件数量
		var answerfile=1;//附件数量
		var questionuser="";
	    var questionagency="";
		var questionname="";
		var questioncontent="";
		var questionstartdate="";
		var questionenddate="";
		var questionansweruser="";
		//检索条件
		var searchcondition="";
		//待处理----------------------------------------------------------------------------
		var fasptableData = [
		     		        ['0','待答复'],
		     		        ['1','已答复'],
		     		        ['2','审核未通过'],
		     				['3','已送至处室'],
		     				['4','审核通过']
		     	];
		var elementcodeStroe = new Ext.data.SimpleStore({
			fields: ['value', 'text'],
			data:fasptableData
		});
		//--------------------------------------
		function questionresultState(val){
			if(val==0){
				return '<div style=\'color:#0000FF\'>'+'待答复'+'</div>'
			}else if(val==1){
				return '<div style=\'color:#FFFF00\'>'+'已答复'+'</div>'
			}else if(val==2){
				return '<div style=\'color:#FFFF00\'>'+'审核未通过'+'</div>'
			}else if(val==3){
				return '<div style=\'color:#FFFF00\'>'+'已分至处室'+'</div>'
			}else{
				return '<div style=\'color:#00FF00\'>'+'审核通过'+'</div>'
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
		//---------------------------------------------------------------------------------
		/***
		 * 主显示窗体
		 */
		var sm = new Ext.grid.CheckboxSelectionModel({checkOnly:true});//checkbox多选框的对象
		var cm = new Ext.grid.ColumnModel([
	                   				new Ext.grid.RowNumberer(),
	                   				sm,
	                   				{header:'编号',dataIndex:'itemid',width:30,sortable:true,menuDisabled:true},
                   					{header:'提问标题',dataIndex:'questionname',sortable:true,menuDisabled:true,renderer:function(val){
	                   					var	tempflag = val.substr(0,1);
	                   					var value = val.substring(1);
	                   					if(tempflag=="0"){
	                   						return value;
	                   					}else{
	                   						return value+"&nbsp&nbsp<span style='background:url(\"/portal/images/totop.gif\") no-repeat;padding-left:30px'>&nbsp</span>";
	                   				 	}
	                   				}},
	                   				{header:'提问内容',dataIndex:'questioncontent',hidden:true,menuDisabled:true},
	                   				{header:'提问单位',dataIndex:'questionagency',width:50,sortable:true,menuDisabled:true},
	                   				{header:'提问地区',dataIndex:'questionarea',width:50,sortable:true,menuDisabled:true},
	                   				{header:'提问时间',dataIndex:'questiondate',width:40,sortable:true,menuDisabled:true},
	                   				{header:'联系电话',dataIndex:'telnumber',hidden:true,menuDisabled:true},
	                   				{header:'问题类型',dataIndex:'questiontype',renderer:findgridquestiontype,width:40,sortable:true,menuDisabled:true},
	                   				{header:'问题状态',dataIndex:'userstatus',hidden:true,menuDisabled:true},
	                   				{header:'答复时间',dataIndex:'answerdate',hidden:true,menuDisabled:true},
	                   				{header:'提问人',dataIndex:'questionuser',hidden:true,menuDisabled:true},
	                   				{header:'答复人',dataIndex:'answeruser',hidden:true,menuDisabled:true},
	                   				{header:'答复内容',dataIndex:'answercontent',hidden:true,menuDisabled:true},
	                   				{header:'管理员状态',dataIndex:'adminstatus',hidden:true,menuDisabled:true},
	                   				{header:'处室状态',dataIndex:'busofficestatus',hidden:true,menuDisabled:true},
	                   				{header:'超级管理员状态',dataIndex:'superadminstatus',hidden:true,menuDisabled:true},
	                   				{header:'附件id',dataIndex:'fileid',hidden:true,menuDisabled:true},
	                   				{header:'答复附件id',dataIndex:'adminfileid',hidden:true,menuDisabled:true}
	                   				
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
			  beforePageText: '页',
				pageSize:PerCount,
				store:store,
				displayInfo: true,   
				emptyMsg: "没有记录",
				moveNext:function(){//下一页
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
			   doRefresh:function(){//刷新方法
				},
			   updateInfo:function (){//重写UpdateInfo        
				           //  }
				 },
		        onLoad:function (store,r,o){//重写OnLoad
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
				 doLoad:function (start){//重写doLoad  
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
				 getPageData:function (){//重写getPageData 
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
		 * 查看问题-------------------------------------------------------------------------------------------------------------------------
		 */
		searchquestionGrid.showpanel = function(){
			var rows = searchquestionGrid.getSelectionModel().getSelections();
			if(rows.length<1){alert("请选择要查看的数据");return;}else if(rows.length>1){alert("请选择一条数据查看");return;}
			var itemid = rows[0].get("itemid");
			var url=_ROOT_PATH_+"/portal/onlinehelp/search.jsp?id="+itemid;
			var h = window.screen.availHeight-40;
		    window.open (url,'newwindow','height='+h+',width=815,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no'); 
		}
		
		
		searchquestionGrid.showpaneltwo = function(){
			var rows = searchquestionGrid.getSelectionModel().getSelections();
			if(rows.length<1){alert("请选择要查看的数据");return;}else if(rows.length>1){alert("请选择一条数据查看");return;}
				var shownewQuestionformdone = new Ext.form.FormPanel({
					id:'shownewQuestionformdone',
					labelWidth: 65,
					title: '提问信息明细',
					frame:true,
					layout:'fit',
					height:475,
					items:[{
						layout:'column',
						items:[{
							columnWidth:.5,
							layout: 'form',
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提 问 人 ',id:'shownewQuestionform_questionPreson',anchor:'96%'},
							       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'问题类型',id:'shownewQuestionform_questionType',anchor:'96%'}
							]
						},{
						layout:'form',
						columnWidth:.5,
						items:[{
							columnWidth:.5,
							layout: 'form',
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问时间',id:'shownewQuestionform_questionTime',anchor:'96%'},
							       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'联系电话',id:'shownewQuestionform_questionTelephone',anchor:'96%'}
							       ]
						}]
					},{
						layout:'form',
						columnWidth:.99,
						items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问单位',id:'shownewQuestionform_questionAgency',anchor:'99%'}]
					},{
						layout:'form',
						columnWidth:.99,
						items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问标题',id:'shownewQuestionform_questionTitle',anchor:'99%'},
						       {xtype:'textarea',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问内容',height:120,id:'shownewQuestionform_questionContent',anchor:'99%'}
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
								      fieldLabel: '附&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp件',     
								      value:''    
									}]
								}]
							}]
						},{
						columnWidth:.5,
						layout: 'form',
						items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'答 复 人 ',id:'auditansweruser',anchor:'96%'}
						]
					},{
						columnWidth:.5,
						layout: 'form',
						items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'答复时间',id:'auditanswerdate',anchor:'96%'}
						]
					},{
						layout:'form',
						columnWidth:.99,
						items:[{xtype:'textarea',readOnly:true,style:'background:#E6E6E6',fieldLabel:'答复内容',height:120,id:'showReplyQuestionform_questionContent',anchor:'99%'}
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
								      fieldLabel: '附&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp件',     
								      value:''    
									}]
								}]
							}]
						}]
					}]
				});
			//查看附件
			var fileid = rows[0].get("fileid");
			if(fileid!=null&&fileid!=""){
			var tempids = fileid.split("@");
				//查询附件名字
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
			//查看答复附件
			var answerfileid = rows[0].get("adminfileid");
			if(answerfileid!=null&&answerfileid!=""){
			var tempanswerids = answerfileid.split("@");
				//查询附件名字
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
					buttons:[{text :'关  闭',listeners:{'click':function(){showwindone.close();}}}]
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
	
		//查询
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
