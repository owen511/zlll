Ext_lt_superAdminAllquestion=  new function(){
		 var PerCount = 20;//每页显示数据量大小
		 var curpage=1;//当前页
		 var count=1;
		 var userfile=1;//用户附件数量
		 var filecount=1;//附件数量
		 var buscount=1;//附件数量
		 var fasptableData = [
		                       ['0','待答复'],
						       ['1','已答复'],	
						       ['2','用户退回']      
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
	    //-------------------------------------------------------------
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
			                   				{header:'问题状态',dataIndex:'superadminstatus',hidden:true,menuDisabled:true},
			                   				{header:'答复时间',dataIndex:'answerdate',hidden:true,menuDisabled:true},
			                   				{header:'答复人',dataIndex:'answeruser',hidden:true,menuDisabled:true},
			                   				{header:'提问人',dataIndex:'questionuser',hidden:true,menuDisabled:true},
			                   				{header:'答复内容',dataIndex:'answercontent',hidden:true,menuDisabled:true},
			                   				{header:'附件id',dataIndex:'fileid',hidden:true,menuDisabled:true},
			                   				{header:'管理员附件id',dataIndex:'adminfileid',hidden:true,menuDisabled:true},
			                   				{header:'加精置顶',dataIndex:'issettop',width:30,menuDisabled:true,renderer:function(val){
			                   					//issettop 为1置顶 0不 默认为0
		                   						if(val=="1"){
		                   						    return "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<span style='background:url(\"/portal/images/jing.gif\") no-repeat;padding-left:20px'>&nbsp</span>";
		                   						}else{
		                   							return "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<span style='background:url(\"/portal/images/notjing.gif\") no-repeat;padding-left:20px'>&nbsp</span>";
		                   						}	
		                   				    }},
			                   				{header:'是否公开',dataIndex:'ispublic',width:30,menuDisabled:true,renderer:function(val){
			                   					//ispublic 为1公开 0不公开 默认为1
		                   						if(val=="1"){
		                   							return "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<span style='background:url(\"/portal/images/check.gif\") no-repeat;padding-left:20px'>&nbsp</span>";
		                   						}else{
		                   							return "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<span style='background:url(\"/portal/images/failed.gif\") no-repeat;padding-left:20px'>&nbsp</span>";
		                   						}	
		                   				    }}
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
				{name: 'superadminstatus'},
				{name: 'answerdate'},
				{name: 'answeruser'},
				{name: 'questionuser'},
				{name: 'answercontent'},
				{name: 'fileid'},
				{name: 'adminfileid'},
				{name: 'issettop'},
				{name: 'ispublic'}
			    ])
			});
    	store.load();
    	var pager = new Ext.PagingToolbar({
				id:'Grid_Pager9',
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
					    return  { total:count,activePage:curpage,pages:count};
				 }
		});
    	var adminsetquestiongrid = new Ext.grid.GridPanel({
			id:'adminsetquestiongrid',
			layout:'fit',
			columnLines: true,
			stripeRows:true,
			cm:cm,
			sm:sm,
			enableColumnMove:false,
			autoHeight: true,
			border:false,
			store:store,
			title:'加精置顶',
			viewConfig:{
				forceFit:true,
				enableRowBody:true,
				showPreview:true
			},
			tbar: pager,
			listeners:{cellclick:function(grid, rowIndex, columnIndex, e){
							if(columnIndex!=1){
								var model = adminsetquestiongrid.getSelectionModel();
								if(model.isSelected(rowIndex)){
									 model.deselectRow(rowIndex);
								}else{
									 model.selectRow(rowIndex,rowIndex+1);
								}
							}	
					   },celldblclick:function(grid, rowIndex, columnIndex, e){
							if(columnIndex==17){//是否置顶
								grid.getSelectionModel().selectRow(rowIndex);
								var cell=grid.getSelectionModel().getSelections();
						   		var itemid = cell[0].get('itemid')+"";
						   		var issettop = cell[0].get('issettop')+"";
						   		if(issettop==1){
						    		issettop="0";
						   		}else{
						   			issettop="1";
						   		}
						   	    cell[0].set('issettop',issettop);       
				                cell[0].commit();
								var para={};
								para.itemid="'"+itemid+"'";
								para.issettop=issettop;
								Ext.lt.RCP.script(onlinehelpurl,"superadminhelp", "settop", para,function (resp) {
					            });
						    }else if(columnIndex==18){//是否公开
						  		grid.getSelectionModel().selectRow(rowIndex);
								var cell=grid.getSelectionModel().getSelections();
						   		var itemid = cell[0].get('itemid')+"";
						   		var ispublic = cell[0].get('ispublic')+"";
						   		if(ispublic==1){
						    		ispublic="0";
						   		}else{
						   			ispublic="1";
						   		}
						   	    cell[0].set('ispublic',ispublic);       
				                cell[0].commit();
								var para={};
								para.itemid="'"+itemid+"'";
								para.ispublic=ispublic;
								Ext.lt.RCP.script(onlinehelpurl,"superadminhelp", "setpublic", para,function (resp) {
					            });
						  }
				}}
		});
		/***
		 * 查看问题------------------------------------------------------------------
	    */
		adminsetquestiongrid.showpanel=function(){
			var rows = adminsetquestiongrid.getSelectionModel().getSelections();
			if(rows.length<1){alert("请选择要查看的数据");return;}else if(rows.length>1){alert("请选择一条数据查看");return;}
			//提问form
			var adminsetquestionshowpanel = new Ext.form.FormPanel({
				id:'adminsetquestionshowpanel',
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
							       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'联系电话',id:'superadminform_questionTelephone',anchor:'96%'},
							       {xtype:'combo',readOnly:true,style:'background:#E6E6E6',fieldLabel:'问题状态',id:'superadminform_questionState',anchor:'96%'
								    	,displayField:'text',
							            valueField:'value',
							            triggerAction:"all",
							            typeAhead: true,
							            store:elementcodeStroe
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
			supershowTabPanel.add(adminsetquestionshowpanel);
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
			var adminsetquestionshowwin = new Ext.Window({
				buttonAlign: 'right',
				id:'adminsetquestionshowwin',
				width:800,
				autoHeight:true,
				closeAction:'close',
				modal: true,
				buttons:[{text :'关  闭',listeners:{'click':function(){adminsetquestionshowwin.close();}}}],
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
			Ext.getCmp("superadminform_questionState").setValue("已解决");
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
				Ext.getCmp('superadminform_questionType').setValue(names);
			}
			Ext.getCmp("superadminform_questionTelephone").setValue(rows[0].get("telnumber"));
			Ext.getCmp("superadminform_questionArea").setValue(rows[0].get("questionagency"));
			Ext.getCmp("superadminform_questionName").setValue(rows[0].get("questionname"));
			Ext.getCmp("superadminform_questionContent").setValue(rows[0].get("questioncontent"));
			adminsetquestionshowwin.show();
		}

		//	查询-----------------------------------------------------------------------
		function loadGridPanel(currentpage){
			var search = new Object();
			search.flag="1";
			search.start=currentpage+"";
			search.questionname = questionname;
			search.questiontype = quesiontype;
			search.questionarea = questionarea;
			search.area=localquestionarea;
			search.typemap=typemap;
			Ext.lt.RCP.script(onlinehelpurl,"superadminhelp", "findallquestion", search,function (resp) {
				count=resp.result;
				if(count==0){
					count=1
				}
				store.loadData(resp);
				adminsetquestiongrid.doLayout();
			},function(){});
		}
		adminsetquestiongrid.loadGrid= function(search){
			curpage=1;
			pager.cursor=0;
			pager.inputItem.setValue(1);
			search.start="1";
			search.area=localquestionarea;
			search.typemap=typemap;
			Ext.lt.RCP.script(onlinehelpurl,"superadminhelp", "findallquestion", search,function (resp) {
				count=resp.result;
				if(count==0){
					count=1
				}
				store.loadData(resp);
				adminsetquestiongrid.doLayout();
			},function(){});
		}
		//加精置顶
		adminsetquestiongrid.settop= function(){
			var rows = adminsetquestiongrid.getSelectionModel().getSelections();
			if(rows.length<1){
		    	return;
		    }
			var search = {};
			var ids1="";//0
			var ids2="";//1
			for(var i =0;i<rows.length;i++){
				if(rows[i].get("issettop")==0){
					ids1+="'"+rows[i].get("itemid")+"',";
				}else{
					ids2+="'"+rows[i].get("itemid")+"',";
				}
			}
			search.ids1=ids1
			search.settop1="1";
			search.ids2=ids2
			search.settop2="0";
			Ext.lt.RCP.script(onlinehelpurl,"superadminhelp", "settop", search,function (resp) {
					curpage=1;
					loadGridPanel(1);
			},function(){});
		}
		//禁止或者开放问题
		adminsetquestiongrid.setpublic= function(){
		    var rows = adminsetquestiongrid.getSelectionModel().getSelections();
		    if(rows.length<1){
		    	return;
		    }
			var search = {};
			var ids1="";//0
			var ids2="";//1
			for(var i =0;i<rows.length;i++){
				if(rows[i].get("ispublic")==0){
					ids1+="'"+rows[i].get("itemid")+"',";
				}else{
					ids2+="'"+rows[i].get("itemid")+"',";
				}
			}
			search.ids1=ids1
			search.setpublic1="1";
			search.ids2=ids2
			search.setpublic2="0";
			Ext.lt.RCP.script(onlinehelpurl,"superadminhelp", "setpublic", search,function (resp) {
					curpage=1;
					loadGridPanel(1);
			},function(){});
		}
	/***
	 *查看问题流程-----------------------------------------------------------------------------------------------------
	 */
	adminsetquestiongrid.processflow = function(){
		var rows = adminsetquestiongrid.getSelectionModel().getSelections();
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
		var data ;
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
		height:335	,
		autoScroll:true,
		border:false,
		store:store,
		viewConfig:{
			forceFit:true,
			enableRowBody:true,
			showPreview:true
		}
	   });
	   var mywin = new Ext.Window({
					autoHeight:true,
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
	return adminsetquestiongrid;
}
