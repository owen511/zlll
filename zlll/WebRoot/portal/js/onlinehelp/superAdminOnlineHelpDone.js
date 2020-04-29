Ext_lt_AdminNewQuestionExaminePost=  new function(){
		var PerCount = 20;//每页显示数据量大小
		var curpage=1;//当前页
		var count=1;
		var userfile=1;//用户附件数量
		var filecount=1;//附件数量
	    var fasptableData = [
	                       ['0','待答复'],
					       ['1','已答复'],	
					       ['2','用户退回'],      
					       ['3','已解决']      
         ];
	     var elementcodeStroe = new Ext.data.SimpleStore({
	     		fields: ['value', 'text'],
	     		data:fasptableData
	        });
	     var resultTpl = new Ext.XTemplate(
	     		'<tpl for="."><div style="width:100%" class="x-combo-list-item" ext:qtitle="{value}" ext:qtip="{text}">{text}</div></tpl>'
	     	);
     	 var adminnewquestion_examineState = new Ext.form.ComboBox({
     		id:'adminnewquestion_examineState',
     		editable: false,
     		store: elementcodeStroe,
     		emptyText: '请选择问题状态',
     		mode:'local',
     		triggerAction: 'all',
     		width:150,
     		valueField: 'value',
            	displayField: 'text',
            	hideTrigger:true
     		
     	});
	     //-------------------------------------------------------------
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
     	//--------------------------------------
    	var sm = new Ext.grid.CheckboxSelectionModel({checkOnly:true});//checkbox多选框的对象
		var cm = new Ext.grid.ColumnModel([
			                   				new Ext.grid.RowNumberer(),
			                   				sm,
			                   				{header:'编号',dataIndex:'itemid',width:30,sortable:true,menuDisabled:true},
			                   				{header:'提问标题',dataIndex:'questionname',sortable:true,menuDisabled:true},
			                   				{header:'提问内容',dataIndex:'questioncontent',hidden:true,menuDisabled:true},
			                   				{header:'提问单位',dataIndex:'questionagency',width:60,sortable:true,menuDisabled:true},
			                   				{header:'提问地区',dataIndex:'questionarea',hidden:auditset==0?true:false,width:50,sortable:true,menuDisabled:true},
			                   				{header:'提问时间',dataIndex:'questiondate',width:50,sortable:true,menuDisabled:true},
			                   				{header:'联系电话',dataIndex:'telnumber',hidden:true,menuDisabled:true},
			                   				{header:'问题类型',dataIndex:'questiontype',renderer:findgridquestiontype,width:60,sortable:true,menuDisabled:true},
				                   			{header:'紧急类型',dataIndex:'leveltype',renderer:findgridleveltype,width:30,sortable:true,menuDisabled:true},
			                   				{header:'问题状态',dataIndex:'superadminstatus',renderer:questionresultState,width:30,sortable:true,menuDisabled:true},
			                   				{header:'答复时间',dataIndex:'answerdate',hidden:true,menuDisabled:true},
			                   				{header:'答复人',dataIndex:'answeruser',hidden:true,menuDisabled:true},
			                   				{header:'答复内容',dataIndex:'answercontent',hidden:true,menuDisabled:true},
			                   				{header:'提问人',dataIndex:'questionuser',hidden:true,menuDisabled:true},
			                   				{header:'附件id',dataIndex:'fileid',hidden:true,menuDisabled:true},
			                   				{header:'管理员附件id',dataIndex:'adminfileid',hidden:true,menuDisabled:true},
			                   				//{header:'业务附件id',dataIndex:'busfileid',hidden:true,menuDisabled:true},
			                   				{header:'用户意见',dataIndex:'givebackadvice',hidden:true,menuDisabled:true}
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
				{name: 'superadminstatus'},
				{name: 'answerdate'},
				{name: 'answeruser'},
				{name: 'answercontent'},
				{name: 'questionuser'},
				{name: 'fileid'},
				{name: 'adminfileid'},
				{name: 'givebackadvice'}
			  ])
			});
    	store.load();
    	 var pager = new Ext.PagingToolbar({
				id:'Grid_Pager5',
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
    	var adminnewquestion_examine_PostGrid = new Ext.grid.GridPanel({
			id:'adminnewquestion_examine_PostGrid',
			layout:'fit',
			columnLines: true,
			stripeRows:true,
			cm:cm,
			sm:sm,
			enableColumnMove:false,
			autoHeight: true,
			border:false,
			store:store,
			title:'已处理',
			//closable:true,//带关闭标签
			viewConfig:{
				forceFit:true,
				enableRowBody:true,
				showPreview:true
			},
			tbar: pager,
			listeners:{cellclick:function(grid, rowIndex, columnIndex, e){
				if(columnIndex!=1){
					var model = adminnewquestion_examine_PostGrid.getSelectionModel();
					if(model.isSelected(rowIndex)){
						 model.deselectRow(rowIndex);
					}else{
						 model.selectRow(rowIndex,rowIndex+1);
					}
				}	
			}}
		});
		/***
		 * 查看问题------------------------------------------------------------------
		 */
		adminnewquestion_examine_PostGrid.showpanel=function(){
			var rows  = adminnewquestion_examine_PostGrid.getSelectionModel().getSelections();
			if(rows.length<1){alert("请选择要查看的数据");return;}else if(rows.length>1){alert("请选择一条数据查看");return;}
			//提问form
			var supershowaskform = new Ext.form.FormPanel({
				id:'supershowaskform',
				labelWidth:65 ,
				title: '提问信息',
				frame:true,
				layout:'fit',
				closable:true,
				height:400,
				items:[{
					layout:'column',
					items:[{
						columnWidth:.5,
						layout: 'form',
						items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提 问 人 ',id:'superadminform_questionPreson',anchor:'96%'},
						       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问单位',id:'superadminform_questionArea',anchor:'96%'},
						       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'问题类型',id:'superadminform_questionType',anchor:'96%'}]
					},{
						layout:'form',
						columnWidth:.5,
						items:[{
								columnWidth:.5,
								layout: 'form',
								items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问时间',id:'superadminform_questionTime',anchor:'96%'},
							       	   {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'联系电话',id:'superadminform_questionTelephone',anchor:'96%'}]
							  },{
								layout: 'column',
								items:[{
										columnWidth:.5,
										layout: 'form',
										items:[{xtype:'combo',readOnly:true,style:'background:#E6E6E6',fieldLabel:'问题状态',id:'superadminform_questionState',anchor:'92%'
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
					items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问标题',id:'superadminform_questionName',anchor:'99%'},
					       {xtype:'textarea',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问内容',height:220,id:'superadminform_questionContent',anchor:'99%'}]
				  },{
					layout:'form',
					columnWidth:.99,
					items:[{
						 xtype:"displayfield",       
					      name:"content",   
					      id:'showfile', 
					      hidden:true,    
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
				var temph = Ext.getCmp('superadminform_questionContent').height;
				temph=temph+20;
				Ext.getCmp('showfile').hide();
				Ext.getCmp('showfile').hideLabel=true;
				Ext.getCmp('superadminform_questionContent').setHeight(temph);
			}
			//查看问题的tabpanel
			var supershowTabPanel = new Ext.TabPanel({
				height:400,
				width:780,
				id:'supershowTabPanel',
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
			supershowTabPanel.add(supershowaskform);
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
							closable:true,
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
			var showdonewin = new Ext.Window({
				buttonAlign: 'right',
				id:'showdonewin_examineQuestion',
				width:800,
				autoHeight:true,
				closeAction:'close',
				modal: true,
				buttons:[{text :'关  闭',listeners:{'click':function(){showdonewin.close();}}}],
				items:[supershowTabPanel],
				listeners: {
					'close': function() {
						filecount=1;
						userfile=1;//用户附件数量
					} 
				} 
			});
			Ext.getCmp("superadminform_questionPreson").setValue(rows[0].get("questionuser"));
			Ext.getCmp("superadminform_questionTime").setValue(rows[0].get("questiondate"));
			Ext.getCmp("superadminform_questionState").setValue(rows[0].get("superadminstatus"));
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
				Ext.getCmp('superadminform_questionType').setValue(names);
			}
			Ext.getCmp("superadminform_questionTelephone").setValue(rows[0].get("telnumber"));
			Ext.getCmp("superadminform_questionArea").setValue(rows[0].get("questionagency"));
			Ext.getCmp("superadminform_questionName").setValue(rows[0].get("questionname"));
			Ext.getCmp("superadminform_questionContent").setValue(rows[0].get("questioncontent"));
			showdonewin.show();
		}
		
		//	查询-----------------------------------------------------------------------
		function loadGridPanel(currentpage){
			//curpage=1;
			//pager.cursor=0;
			//pager.inputItem.setValue(1);
			var search = new Object();
			search.flag="1";
			search.start=currentpage+"";
			search.questionname = questionname;
			search.questiontype = quesiontype;
			search.questionarea = questionarea;
			search.area=localquestionarea;
			search.username=username;
			search.typemap=typemap;
			Ext.lt.RCP.script(onlinehelpurl,"superadminhelp", "query", search,function (resp) {
				count=resp.result;
				if(count==0){
					count=1
				}
				store.loadData(resp);
				adminnewquestion_examine_PostGrid.doLayout();
			},function(){});
		}
		adminnewquestion_examine_PostGrid.loadGrid= function(search){
			curpage=1;
			pager.cursor=0;
			pager.inputItem.setValue(1);
			search.start="1";
			search.area=localquestionarea;
			search.typemap=typemap;
			search.username=username;
			Ext.lt.RCP.script(onlinehelpurl,"superadminhelp", "query", search,function (resp) {
				count=resp.result;
				if(count==0){
					count=1
				}
				store.loadData(resp);
				adminnewquestion_examine_PostGrid.doLayout();
			},function(){});
		}
	/***
	 *查看问题流程-----------------------------------------------------------------------------------------------------
	 */
	adminnewquestion_examine_PostGrid.processflow = function(){
		var rows = adminnewquestion_examine_PostGrid.getSelectionModel().getSelections();
		if(rows.length<1){alert("请选择要查看流程的数据");return;
		}else if(rows.length>1){alert("请选择一条数据");return;}
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
	   //根据问题id查询该问题的所有流程
	   Ext.lt.RCP.script(onlinehelpurl,"useonliehelp", "findprocess", itemid,function (resp) {
					store.loadData(resp);
					mygrid.doLayout();
	   });
	}
	//loadGridPanel(1);
return adminnewquestion_examine_PostGrid;
}