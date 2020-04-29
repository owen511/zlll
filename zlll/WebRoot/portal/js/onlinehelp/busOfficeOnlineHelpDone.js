Ext_lt_NewBusOfficeQuestion = new function(){
		var PerCount = 20;//每页显示数据量大小
		var curpage=1;//当前页
		var count=1;//总页数
		var userfile=1;//用户附件数量
		var filecount=1;//附件数量
		var buscount=1;//附件数量
		var fasptableData = [
			     		        ['0','待答复'],
			     		        ['1','已答复']
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
		 var pager = 	new Ext.PagingToolbar({
				id:'Grid_Pager7',
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
				//displayMsg: '显示第{0}条到{1}条记录，一共{2}条',
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
		var busOfficenewquestionGrid = new Ext.grid.GridPanel({
			id:'busOfficenewquestionGrid',
			title:'管理员新增提问',
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
					var model = busOfficenewquestionGrid.getSelectionModel();
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
		 * 查看问题
		 */
		busOfficenewquestionGrid.showpanel = function(){
			var rows = busOfficenewquestionGrid.getSelectionModel().getSelections();
			if(rows.length<1){alert("请选择要查看的数据");return;}else if(rows.length>1){alert("请选择一条数据查看");return;}
			var showbusOfficenewQuestionform = new Ext.form.FormPanel({
				id:'showbusOfficenewQuestionform',
				labelWidth:65 ,
				title: '提问信息明细',
				frame:true,
				layout:'fit',
				height:495,
				items:[{
					layout:'column',
					items:[{
						columnWidth:.5,
						layout: 'form',
						items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提 问 人 ',id:'busofficeform_questionPreson',anchor:'96%'},
						       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问单位',id:'busofficeform_questionArea',anchor:'96%'},
						       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'问题类型',id:'busofficeform_questionType',anchor:'96%'}
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
			supershowTabPanel.add(showbusOfficenewQuestionform);
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
			var showwin = new Ext.Window({
				buttonAlign: 'right',
				id:'showadminwin_answer',
				width:800,
				autoHeight:true,
				closeAction:'close',
				modal: true,
				buttons:[{text :'关  闭',listeners:{'click':function(){showwin.close();}}}],
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
			showwin.show();
		}

		//	查询---------------------------------------------------------------------------------------------------
		function loadGridPanel(currentpage){
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
			Ext.lt.RCP.script(onlinehelpurl,"busofficehelp", "query", search,function (resp) {
				count=resp.result;
				if(count==0){
					count=1
				}
				store.loadData(resp);
				busOfficenewquestionGrid.doLayout();
			},function(){});
		}
		busOfficenewquestionGrid.loadGrid= function(search){
			curpage=1;
			pager.cursor=0;
			pager.inputItem.setValue(1);
			search.start="1";
			search.area=localquestionarea;
			search.username=username;
			search.typemap=typemap;
			Ext.lt.RCP.script(onlinehelpurl,"busofficehelp", "query", search,function (resp) {
				count=resp.result;
				if(count==0){
					count=1
				}
				store.loadData(resp);
				busOfficenewquestionGrid.doLayout();
			},function(){});
			
		}
	/***
	 *查看问题流程-----------------------------------------------------------------------------------------------------
	 */
	busOfficenewquestionGrid.processflow = function(){
		var rows = busOfficenewquestionGrid.getSelectionModel().getSelections();
		if(rows.length<1){
				alert("请选择要查看流程的数据");	return;
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
		//loadGridPanel(1);
	return busOfficenewquestionGrid;
}