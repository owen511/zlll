Ext_lt_ReplyQuestion = new function(){
		var PerCount = 20;//每页显示数据量大小
		var curpage=1;//当前页
		var count=1;
		var filecount=1;//附件数量
		var answerfile=1;//附件数量
		var fasptableData = [
		        ['0','已暂存'],
		        ['1','已提交'],
		        ['2','待确认'],
		        ['3','已退回'],
		        ['4','已解决']
	    ];
     	var elementcodeStroe = new Ext.data.SimpleStore({
     		fields: ['value', 'text'],
     		data:fasptableData
     	});
     	var resultTpl = new Ext.XTemplate(
     		'<tpl for="."><div style="width:100%" class="x-combo-list-item" ext:qtitle="{value}" ext:qtip="{text}">{text}</div></tpl>'
     	);
     	var questionState = new Ext.form.ComboBox({										  								  									  
     		id:'questionState',
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
     	//--------------------------------------
	    function questionresultState(val){
			if(val==3){
				return '<div style=\'color:#AA7700\'>'+'已退回'+'</div>'
			}else if(val==0){
				return '<div style=\'color:#000000\'>'+'已暂存'+'</div>'
			}else if(val==1){
				return '<div style=\'color:#00FF00\'>'+'已提交'+'</div>'
			}else if(val==2){
				return '<div style=\'color:#FF0000\'>'+'待确认'+'</div>'
			}else{
				return '<div style=\'color:#0000CC  \'>'+'已解决'+'</div>'
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
	//-----------------------------------------------------
		var data ={result:0,data:[]};
		var sm = new Ext.grid.CheckboxSelectionModel({checkOnly:true});//checkbox多选框的对象
		var cm = new Ext.grid.ColumnModel([
		                   				new Ext.grid.RowNumberer(),
		                   				sm,
		                   				{header:'编号',dataIndex:'itemid',width:30,sortable:true,menuDisabled:true},
		                   				{header:'提问标题',dataIndex:'questionname',sortable:true,menuDisabled:true},
		                   				{header:'提问内容',dataIndex:'questioncontent',hidden:true,width:200,menuDisabled:true},
		                   				{header:'提问单位',dataIndex:'questionagency',width:80,sortable:true,menuDisabled:true},
		                   				{header:'提问时间',dataIndex:'questiondate',width:50,sortable:true,menuDisabled:true},
		                   				{header:'联系电话',dataIndex:'telnumber',hidden:true,menuDisabled:true},
										{header:'问题类型',dataIndex:'questiontype',renderer:findgridquestiontype,width:60,sortable:true,menuDisabled:true},
				                   		{header:'紧急类型',dataIndex:'leveltype',renderer:findgridleveltype,width:30,sortable:true,menuDisabled:true},		                   				
				                   		{header:'问题状态',dataIndex:'userstatus',renderer:questionresultState,width:30,sortable:true,menuDisabled:true},
		                   				{header:'答复时间',dataIndex:'answerdate',hidden:true,menuDisabled:true},
		                   				{header:'答复人',dataIndex:'answeruser',hidden:true,menuDisabled:true},
		                   				{header:'提问人',dataIndex:'questionuser',hidden:true,menuDisabled:true},
		                   				{header:'答复内容',dataIndex:'answercontent',hidden:true,menuDisabled:true},
		                   				{header:'管理员状态',dataIndex:'adminstatus',hidden:true,menuDisabled:true},
		                   				{header:'处室状态',dataIndex:'busofficestatus',hidden:true,menuDisabled:true},
		                   				{header:'超级管理员状态',dataIndex:'superadminstatus',hidden:true,menuDisabled:true},
		                   				{header:'附件id',dataIndex:'fileid',hidden:true,menuDisabled:true},
		                   				{header:'业务附件id',dataIndex:'busfileid',hidden:true,menuDisabled:true},
		                   				{header:'答复附件id',dataIndex:'adminfileid',hidden:true,menuDisabled:true},
		                   				{header:'用户意见',dataIndex:'givebackadvice',hidden:true,menuDisabled:true}
		                   				
		                   			]);
		var store = new Ext.data.Store({
			proxy: new Ext.data.MemoryProxy(data),
			reader: new Ext.data.JsonReader({totalProperty:'result',  
				   root:'data' }, [
			{name: 'itemid'},
			{name: 'questionname'},
			{name: 'questioncontent'},
			{name: 'questionagency'},
			{name: 'questiondate'},
			{name: 'telnumber'},
			{name: 'questiontype'},
			{name: 'leveltype'},
			{name: 'userstatus'},
			{name: 'answerdate'},
			{name: 'answeruser'},
			{name: 'questionuser'},
			{name: 'answercontent'},
			{name: 'adminstatus'},
			{name: 'busofficestatus'},
			{name: 'superadminstatus'},
			{name: 'fileid'},
			{name: 'busfileid'},
			{name: 'adminfileid'},
			{name: 'givebackadvice'}
		  ])
		});
	store.load();
	   
	   var pager = 	new Ext.PagingToolbar({
			id:'Grid_Pager',
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
	var overquestionGrid = new Ext.grid.GridPanel({
		id:'overquestionGrid',
		title:'已处理',
		layout:'fit',
		columnLines: true,
		autoExpandColumn:'questionname',
		stripeRows:true,
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
				var model = overquestionGrid.getSelectionModel();
				if(model.isSelected(rowIndex)){
					 model.deselectRow(rowIndex);
				}else{
					 model.selectRow(rowIndex,rowIndex+1);
				}
			}	
		}}
	});
	/*
	* 查看--------------------------------------------------------------------------------------------------------
	 */
	overquestionGrid.showPanel=function(){
			var rows = overquestionGrid.getSelectionModel().getSelections();
			if(rows.length<1){alert("请选择要查看的数据");return;}else if(rows.length>1){alert("请选择一条数据查看");return;}
			var showQuestionformanswered ;
			if(rows[0].get("userstatus")==1){
				showQuestionformanswered = new Ext.form.FormPanel({
					id:'showQuestionformnotanswered',
					labelWidth:65 ,
					title: '提问信息明细',
					frame:true,
					layout:'fit',
					height:345,
					items:[{
						layout:'column',
						items:[{
							columnWidth:.5,
							layout: 'form',
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',height:'20px',fieldLabel:'提 问 人 ',id:'showQuestionform_questionPreson',anchor:'96%'},
							       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问单位',id:'showQuestionform_questionagency',anchor:'96%'},
							       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',height:'20px',fieldLabel:'问题类型',id:'showQuestionform_questionArea',anchor:'96%'}
							]
						},{
						layout:'form',
						columnWidth:.5,
						items:[{
								columnWidth:.5,
								layout: 'form',
								items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问时间',id:'showQuestionform_questionTime',anchor:'96%'},
							       	   {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'联系电话',id:'showQuestionform_questionTelephone',anchor:'96%'}
								  ]
							  },{
								layout: 'column',
								items:[{
										columnWidth:.5,
										layout: 'form',
										items:[{xtype:'combo',readOnly:true,style:'background:#E6E6E6',fieldLabel:'问题状态',id:'showQuestionform_questionstatus',anchor:'92%'
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
					},{
						layout:'form',
						columnWidth:.99,
						items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问标题',id:'showQuestionform_questionTitle',anchor:'99%'},
						       {xtype:'textarea',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问内容',height:170,id:'showQuestionform_questionContent',anchor:'99%'}]
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
						}]
					}]
				});
			}else{
				showQuestionformanswered = new Ext.form.FormPanel({
					id:'showQuestionformanswered',
					labelWidth:65 ,
					title: '提问信息明细',
					frame:true,
					layout:'fit',
					height:480,
					items:[{
						layout:'column',
						items:[{
							columnWidth:.5,
							layout: 'form',
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',height:'20px',fieldLabel:'提 问 人 ',id:'showQuestionform_questionPreson',anchor:'96%'},
							       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',height:'20px',fieldLabel:'问题类型',id:'showQuestionform_questionArea',anchor:'96%'},
							       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问单位',id:'showQuestionform_questionagency',anchor:'96%'}
							]
						},{
						layout:'form',
						columnWidth:.5,
						items:[{
								columnWidth:.5,
								layout: 'form',
								items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问时间',id:'showQuestionform_questionTime',anchor:'96%'},
							       	   {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'联系电话',id:'showQuestionform_questionTelephone',anchor:'96%'}
								  ]
							  },{
								layout: 'column',
								items:[{
										columnWidth:.5,
										layout: 'form',
										items:[{xtype:'combo',readOnly:true,style:'background:#E6E6E6',fieldLabel:'问题状态',id:'showQuestionform_questionstatus',anchor:'92%'
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
					},{
						layout:'form',
						columnWidth:.99,
						items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问标题',id:'showQuestionform_questionTitle',anchor:'99%'},
						       {xtype:'textarea',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问内容',height:90,id:'showQuestionform_questionContent',anchor:'99%'}]
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
								}
							]
						}]
					},{
						columnWidth:.5,
						layout: 'form',
						items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'答 复 人 ',id:'showQuestionform_answeruser',anchor:'96%'}]
					},{
						columnWidth:.5,
						layout: 'form',
						items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'答复时间',id:'showQuestionform_answerdate',anchor:'96%'}]
					},{
						layout:'form',
						columnWidth:.99,
						items:[{xtype:'textarea',readOnly:true,style:'background:#E6E6E6',fieldLabel:'答复内容',height:90,id:'showQuestionform_answerContent',anchor:'99%'}]
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
						},{
							layout:'form',
							columnWidth:.99,
							items:[{xtype:'textarea',readOnly:true,style:'background:#E6E6E6',fieldLabel:'用户意见',height:50,id:'showQuestionform_givebackadvice',anchor:'99%'}]
						}]
					}]
				});
			}	
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
				var temph = Ext.getCmp('showQuestionform_questionContent').height;
				temph=temph+20;
				Ext.getCmp('showfile1').hideLabel=true;
				Ext.getCmp('showfile1').hide();
				Ext.getCmp('showQuestionform_questionContent').setHeight(temph);
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
			}else if(Ext.getCmp("showQuestionform_answerdate")!=null){
				var temph = Ext.getCmp('showQuestionform_answerContent').height;
				temph=temph+20;
				Ext.getCmp('showanswerfile1').hide();
				Ext.getCmp('showanswerfile1').hideLabel=true;
				Ext.getCmp('showQuestionform_answerContent').setHeight(temph);
			}
			var showdonewin = new Ext.Window({
				buttonAlign: 'right',
				id:'showdonewin',
				width:800,
				autoHeight:true,
				closeAction:'close',
				modal: true,
				items:[showQuestionformanswered],
				listeners: {'close': function() {
								filecount=1;
								answerfile=1;
							}}, 
				buttons:[{text :'关  闭',listeners:{'click':function(){showdonewin.close();
				}}}]
			});
			Ext.getCmp("showQuestionform_questionPreson").setValue(rows[0].get("questionuser"));
			Ext.getCmp("showQuestionform_questionTime").setValue(rows[0].get("questiondate"));
			Ext.getCmp("showQuestionform_questionstatus").setValue(rows[0].get("userstatus"));
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
				Ext.getCmp('showQuestionform_questionArea').setValue(names);
			}
			if(rows[0].get("givebackadvice")!=null&&rows[0].get("givebackadvice")!=""&&Ext.getCmp("showQuestionform_givebackadvice")!=null){
				Ext.getCmp("showQuestionform_givebackadvice").setValue(rows[0].get("givebackadvice"));
			}else if (Ext.getCmp("showQuestionform_givebackadvice")!=null){
				var temph = Ext.getCmp('showQuestionform_questionContent').height;
				temph=temph+30;
				Ext.getCmp('showQuestionform_givebackadvice').hide();
				Ext.getCmp('showQuestionform_givebackadvice').hideLabel=true;
				Ext.getCmp('showQuestionform_questionContent').setHeight(temph);
				temph = Ext.getCmp('showQuestionform_answerContent').height;
				temph=temph+30;
				Ext.getCmp('showQuestionform_answerContent').setHeight(temph);
			}
			Ext.getCmp("showQuestionform_questionTelephone").setValue(rows[0].get("telnumber"));
			Ext.getCmp("showQuestionform_questionagency").setValue(rows[0].get("questionagency"));
			Ext.getCmp("showQuestionform_questionTitle").setValue(rows[0].get("questionname"));
			Ext.getCmp("showQuestionform_questionContent").setValue(rows[0].get("questioncontent"));
			if(Ext.getCmp("showQuestionform_answerdate")!=null){
				Ext.getCmp("showQuestionform_answeruser").setValue(rows[0].get("answeruser"));
				Ext.getCmp("showQuestionform_answerdate").setValue(rows[0].get("answerdate"));
				Ext.getCmp("showQuestionform_answerContent").setValue(rows[0].get("answercontent"));
			}
			var level = rows[0].get("leveltype");
			Ext.getCmp("showadminleveltype").setValue(level);
			showdonewin.show();
		}

		/***
		 * 查询--------------------------------------------------------------------------------------------------------------------
		 */
		function loadGridPanel(currentpage){
			//curpage=1;
			var search = new Object();
			search.flag="1";
			search.start=currentpage+"";
			search.questionname = questionname;
			search.questiontype = quesiontype;
			search.area=localquestionarea;
			search.usercode=usercode;
			search.username=username;
			Ext.lt.RCP.script(onlinehelpurl,"useonliehelp", "query", search,function (resp) {
				store.loadData(resp);
				count=resp.result;
				if(count==0){
					count=1
				}
				pager.afterTextItem.setText(String.format(pager.afterPageText, count));
				overquestionGrid.doLayout();
			},function(){});
		}
		overquestionGrid.loadGrid=function(search){
			curpage=1;
			pager.cursor=0;
			pager.inputItem.setValue(1);
			search.start="1";
			search.area=localquestionarea;
			search.usercode=usercode;
			search.username=username;
		    //search.questionname = questionname;
			//search.questiontype = quesiontype;
			Ext.lt.RCP.script(onlinehelpurl,"useonliehelp", "query", search,function (resp) {
				count=resp.result;
				if(count==0){
					count=1
				}
				store.loadData(resp);
				overquestionGrid.doLayout();
			},function(){});
		}
	
		//删除--------------------------------------------------------------------------------------------------------
		overquestionGrid.delGridPanel = function(){
			var rows = overquestionGrid.getSelectionModel().getSelections();
			if(rows.length<1){
				alert("请选择要删除的数据");return;
			}
			if(confirm("确认删除数据吗？")){
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
				Ext.lt.RCP.script(onlinehelpurl,"useonliehelp", "del", para,function (resp) {
					curpage=1;
					loadGridPanel(1);
				});
			}
		};
		/***
		 *查看问题流程-----------------------------------------------------------------------------------------------------
		 */
		overquestionGrid.processflow = function(){
			var rows = overquestionGrid.getSelectionModel().getSelections();
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
		return overquestionGrid;
}
