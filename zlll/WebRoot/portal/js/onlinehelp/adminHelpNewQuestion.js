Ext_lt_NewAdminQuestion = new function(){
		var PerCount = 20;//每页显示数据量大小
		var curpage=1;//当前页
		var count=1;
		var filecount=1;//附件数量
		var userfile=1;//用户附件数量
	//已处理----------------------------------------------------------------------------
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
	//--------------------------------------
	/***
	 * 主显示窗体
	 */
	var sm = new Ext.grid.CheckboxSelectionModel({checkOnly:true});//checkbox多选框的对象
	var cm = new Ext.grid.ColumnModel([
		                   				new Ext.grid.RowNumberer(),
		                   				sm,
		                   				{header:'编号',dataIndex:'itemid',width:30,sortable:true,menuDisabled:true},
		                   				{header:'提问标题',dataIndex:'questionname',sortable:true,menuDisabled:true},
		                   				{header:'提问内容',dataIndex:'questioncontent',hidden:true,width:200,menuDisabled:true},
		                   				{header:'提问单位',dataIndex:'questionagency',width:60,sortable:true,menuDisabled:true},
		                   				{header:'提问地区',dataIndex:'questionarea',hidden:adminset==0?true:false,width:50,sortable:true,menuDisabled:true},
		                   				{header:'提问时间',dataIndex:'questiondate',width:50,sortable:true,menuDisabled:true},
		                   				{header:'联系电话',dataIndex:'telnumber',hidden:true,sortable:true,menuDisabled:true},
		                   				{header:'问题类型',dataIndex:'questiontype',renderer:findgridquestiontype,width:60,sortable:true,menuDisabled:true},
				                   		{header:'紧急类型',dataIndex:'leveltype',renderer:findgridleveltype,width:30,sortable:true,menuDisabled:true},
		                   				{header:'问题状态',dataIndex:'adminstatus',renderer:questionresultState,width:30,sortable:true,menuDisabled:true},
		                   				{header:'答复时间',dataIndex:'answerdate',width:100,hidden:true,menuDisabled:true},
		                   				{header:'答复人',dataIndex:'answeruser',width:200,hidden:true,menuDisabled:true},
		                   				{header:'提问人',dataIndex:'questionuser',width:200,hidden:true,menuDisabled:true},
		                   				{header:'答复内容',dataIndex:'answercontent',width:200,hidden:true,menuDisabled:true},
		                   				{header:'附件id',dataIndex:'fileid',hidden:true,menuDisabled:true},
		                   				{header:'管理员附件id',dataIndex:'adminfileid',hidden:true,menuDisabled:true}
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
			{name: 'adminstatus'},
			{name: 'answerdate'},
			{name: 'answeruser'},
			{name: 'questionuser'},
			{name: 'answercontent'},
			{name: 'fileid'},
			{name: 'adminfileid'}
		  ])
		});
	store.load();
	 var pager = 	new Ext.PagingToolbar({
			id:'Grid_Pager2',
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
	var adminnewquestionGrid = new Ext.grid.GridPanel({
		id:'adminnewquestionGrid',
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
		viewConfig:{
			forceFit:true,
			enableRowBody:true,
			showPreview:true
		},
		tbar: pager,
		listeners:{cellclick:function(grid, rowIndex, columnIndex, e){
			if(columnIndex!=1){
				var model = adminnewquestionGrid.getSelectionModel();
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
	adminnewquestionGrid.showpanel = function(){
		var rows = adminnewquestionGrid.getSelectionModel().getSelections();
		if(rows.length<1){alert("请选择要查看的数据");return;}else if(rows.length>1){alert("请选择一条数据查看");return;}
		var val=rows[0].get("adminstatus")+"";
		var showadmindoneform = new Ext.form.FormPanel({
				id:'showadmindoneform',
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
						items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提 问 人 ',id:'showadmindone_questionuser',name:'',anchor:'96%'},
						       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问单位',id:'showadmindone_questionagency',name:'',anchor:'96%'},
						       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'问题类型',id:'showadmindone_questiontype',anchor:'96%'}
						]
					},{
						layout:'form',
						columnWidth:.5,
						items:[{
								columnWidth:.5,
								layout: 'form',
								items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问时间',id:'showadmindone_questiondate',anchor:'96%'},
							       	   {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'联系电话',id:'showadmindone_questiondtel',anchor:'96%'}
								  ]
							  },{
								layout: 'column',
								items:[{
										columnWidth:.5,
										layout: 'form',
										items:[{xtype:'combo',readOnly:true,style:'background:#E6E6E6',fieldLabel:'问题状态',id:'showadmindone_questionstatus',anchor:'92%'
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
					  }
					,{
						layout:'form',
						columnWidth:.99,
						items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问标题',id:'showadmindone_questionname',anchor:'99%'},
							{xtype:'textarea',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问内容',height:220,id:'showadmindone_questioncontent',anchor:'99%'}
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
				var temph = Ext.getCmp('showadmindone_questioncontent').height;
				temph=temph+20;
				Ext.getCmp('showfile').hide();
				Ext.getCmp('showfile').hideLabel=true;
				Ext.getCmp('showadmindone_questioncontent').setHeight(temph);
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
			supershowTabPanel.add(showadmindoneform);
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
			var showadmindonewin = new Ext.Window({
				buttonAlign: 'right',
				id:'showadmindonewin',
				width:800,
				autoHeight:true,
				closeAction:'close',
				modal: true,
				items:[supershowTabPanel],
				listeners: {
				'close': function() {filecount=1; userfile=1;} 
				},
				buttons:[{text :'关  闭',listeners:{'click':function(){showadmindonewin.close();}}}]
			});
			Ext.getCmp("showadmindone_questionuser").setValue(rows[0].get("questionuser"));
			Ext.getCmp("showadmindone_questiondate").setValue(rows[0].get("questiondate"));
			var status = rows[0].get("adminstatus");
			var s = status.split(",");
			for(var i = 0;i<s.length;i++){
				if(s[i].indexOf(usertype)==0){
					Ext.getCmp("showadmindone_questionstatus").setValue(s[i].substr(1,1));
				}
			} 
			var level = rows[0].get("leveltype");
			Ext.getCmp("adminleveltype").setValue(level);
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
				Ext.getCmp('showadmindone_questiontype').setValue(names);
			}
			Ext.getCmp("showadmindone_questiondtel").setValue(rows[0].get("telnumber"));
			Ext.getCmp("showadmindone_questionagency").setValue(rows[0].get("questionagency"));
			Ext.getCmp("showadmindone_questionname").setValue(rows[0].get("questionname"));
			Ext.getCmp("showadmindone_questioncontent").setValue(rows[0].get("questioncontent"));
			showadmindonewin.show();
	}

	//	查询
	function loadGridPanel(currentpage){
		var search = new Object();
		search.flag="1";
		search.start=currentpage+"";
		search.questionname = questionname;
		search.questiontype = questiontype;
		search.questionarea = questionarea;
		search.area=localquestionarea;
		search.usercode=usercode;
		search.username=username;
		search.usertype=usertype;
		search.typemap=typemap;
		Ext.lt.RCP.script(onlinehelpurl,"adminhelp", "query", search,function (resp) {
			count=resp.result;
			if(count==0){
				count=1
			}
			store.loadData(resp);
			adminnewquestionGrid.doLayout();
		},function(){});
	}
	adminnewquestionGrid.loadGrid= function(search){
		search.area=localquestionarea;
		search.usercode=usercode;
		search.username=username;
		search.usertype=usertype;
		search.typemap=typemap;
		curpage=1;
		search.start="1";
		Ext.lt.RCP.script(onlinehelpurl,"adminhelp", "query", search,function (resp) {
			count=resp.result;
			if(count==0){
				count=1
			}
			store.loadData(resp);
			adminnewquestionGrid.doLayout();
		},function(){});
		
	}
	 /***
	 *查看问题流程-----------------------------------------------------------------------------------------------------
	 */
	adminnewquestionGrid.processflow = function(){
		var rows = adminnewquestionGrid.getSelectionModel().getSelections();
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
	//loadGridPanel(1);
	return adminnewquestionGrid;
}