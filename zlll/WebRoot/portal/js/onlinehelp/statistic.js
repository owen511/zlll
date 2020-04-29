Ext_lt_Statistic = new function(){
	var PerCount = 10;//每页显示数据量大小
	var curpage=1;//当前页
	var count=1;
	var tt =document.getElementById('window_top').style.height;
	var leftw=document.getElementById("left_tree").offsetWidth;
	var winHeight = document.body.clientHeight-240;
	var winWidth = document.body.clientWidth-leftw-60;
	var _area = "";
	var _type = "";
	var _flag = "";
	var obj = new Array();
	//左侧图形
	var viewHtml = ['<table  cellspacing="0" cellpadding="0" width="100%" >',
					'<tr><td  width="50%"><div id="chartdiv" style=""></div></td>',
					'<td width="50%" valign="top"><div id="chartdiv2" style=""></td></tr>',
					'</table>'
					];
	var viewpanel = new Ext.Panel({
		id:'viewpanel',
		bodyStyle:'margin:0px 0px 0px 0px;',
		frame:true,
		layout:'column',
		width:winWidth,
		border:false,
		height:400,
		collapsible:true,//显示右上角最小化按钮
		html:viewHtml.join('')
	});  
	
    /**
     * 点击饼图上的某一地区，显示各个角色待处理和已处理的条数（柱状图）
     */
	obj.onPathTypeClick=function(value){
		var config = {};
		config.value = value;
		Ext.lt.RCP.script(onlinehelpurl,"adminhelp", "findAreaquestion", config,function (resp) {
				if(resp.length>0){
				var chart = new FusionCharts(_ROOT_PATH_+"/ltext/Charts/MSColumn2D.swf", "ChartId", "500", "350");
				var xml=[];
				var catexml=[];
				var todoxml=[];
				var donexml=[];
				if(value==undefined||value==""){
					value="各地区问题汇总"
				}
				xml.push('<chart caption=\''+value+'\' xAxisName=\'角色\' yAxisName=\'数量\' palette=\'4\' unescapeLinks=\'0\'  decimals=\'0\' baseFontSize =\'12\' bgColor=\'99CCFF,FFFFFF\'  bgAngle=\'360\' showBorder=\'1\' imageSave=\'1\' startingAngle=\'70\' formatNumber=\'0\' useRoundEdges=\'1\'>');
				catexml.push('<categories>');
				todoxml.push('<dataset seriesName=\'待处理\'>');
				donexml.push('<dataset seriesName=\'已处理\'>');
				for(var i = 0;i < resp.length;i ++){
					catexml.push('<category label=\''+resp[i].name+'\'/>');
					todoxml.push('<set  link=\'javascript:Ext_lt_Statistic.showdetail(%26apos;'+value+'%26apos;,'+resp[i].type+',0);\'  value=\''+resp[i].todo+'\' />');
					donexml.push('<set  link=\'javascript:Ext_lt_Statistic.showdetail(%26apos;'+value+'%26apos;,'+resp[i].type+',1);\'  value=\''+resp[i].done+'\' />');
				}
				catexml.push('</categories>')
				todoxml.push('</dataset>')
				donexml.push('</dataset>')
				xml.push(catexml);
				xml.push(todoxml);
				xml.push(donexml);
				xml.push('</chart>');
			    chart.setDataXML(xml.join(''));
				chart.render("chartdiv2");
			}
		});	
	}	
	
	/***
	 * 下方问题详细显示窗体
	 */
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
	var detailsm = new Ext.grid.CheckboxSelectionModel({checkOnly:true});//checkbox多选框的对象
	var detailcm = new Ext.grid.ColumnModel([
                   				new Ext.grid.RowNumberer(),
                   				detailsm,
                   				{header:'编号',dataIndex:'itemid',width:30,sortable:true,menuDisabled:true},
                  				{header:'提问标题',dataIndex:'questionname',sortable:true,menuDisabled:true},
                   				{header:'提问内容',dataIndex:'questioncontent',hidden:true,menuDisabled:true},
                   				{header:'提问单位',dataIndex:'questionagency',width:60,sortable:true,menuDisabled:true},
                   				{header:'提问地区',dataIndex:'questionarea',hidden:staticset==0?true:false,width:50,sortable:true,menuDisabled:true},
                   				{header:'提问人',dataIndex:'questionuser',width:40,sortable:true,menuDisabled:true},
                   				{header:'提问时间',dataIndex:'questiondate',width:40,sortable:true,menuDisabled:true},
                   				{header:'联系电话',dataIndex:'telnumber',hidden:true,menuDisabled:true},
                   				{header:'问题类型',dataIndex:'questiontype',renderer:findgridquestiontype,width:60,sortable:true,menuDisabled:true},
                   				{header:'紧急类型',dataIndex:'leveltype',renderer:findgridleveltype,width:30,sortable:true,menuDisabled:true},
                   				{header:'答复时间',dataIndex:'answerdate',hidden:true,menuDisabled:true},
                   				{header:'答复人',dataIndex:'answeruser',hidden:true,menuDisabled:true},
                   				{header:'答复内容',dataIndex:'answercontent',hidden:true,menuDisabled:true},
                   				{header:'附件id',dataIndex:'fileid',hidden:true,menuDisabled:true},
                   				{header:'答复附件id',dataIndex:'adminfileid',hidden:true,menuDisabled:true},
                   				{header:'支持问题状态',dataIndex:'adminstatus',hidden:true,menuDisabled:true},
                   				{header:'业务问题状态',dataIndex:'busofficestatus',hidden:true,menuDisabled:true},
			                   	{header:'审核人问题状态',dataIndex:'superadminstatus',hidden:true,menuDisabled:true}
                   			]);                   			
	var detaildata ={'result':0,'data':[]};
	var detailstore = new Ext.data.Store({
		proxy: new Ext.data.MemoryProxy(detaildata),
		reader: new Ext.data.JsonReader({totalProperty:'result',  
			   root:'data' }, [
		{name: 'itemid'},
		{name: 'questionname'},
		{name: 'questioncontent'},
		{name: 'questionagency'},
		{name: 'questionarea'},
		{name: 'questionuser'},
		{name: 'questiondate'},
		{name: 'telnumber'},
		{name: 'questiontype'},
		{name: 'leveltype'},
		{name: 'userstatus'},
		{name: 'answerdate'},
		{name: 'answeruser'},
		{name: 'answercontent'},
		{name: 'fileid'},
		{name: 'adminfileid'},
		{name: 'adminstatus'},
		{name: 'busofficestatus'},
		{name: 'superadminstatus'},
	    ])
	});
	detailstore.load();
	var pager = new Ext.PagingToolbar({
			afterPageText: '/ {0}',
		    beforePageText: '页',
			pageSize:PerCount,
			store:detailstore,
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
	  	var tb = new Ext.Toolbar({
	    	 html:'<div><input type="button" class="btn" onclick="Ext_lt_Statistic.showquestion();" value="查看"/>'+
	    	 '<input type="button" class="btn"  onclick="Ext_lt_Statistic.processflow();" value="问题流程"/></div>'   
	    });
		var detailGrid = new Ext.grid.GridPanel({
			id:'detailGrid',
			layout:'fit',
			columnLines: true,
			stripeRows:true,
		  	autoExpandColumn:'questionname',  
			cm:detailcm,
			sm:detailsm,
			enableColumnMove:false,
			//bodyStyle:'width:100%',  
			//autoWidth:true,  
			width:winWidth,
			autoHeight: true,
			border:false,
			store:detailstore,
			viewConfig:{
				forceFit:true,
				enableRowBody:true,
				showPreview:true
			},	
			tbar:{items:[pager,tb]},
			listeners:{cellclick:function(grid, rowIndex, columnIndex, e){
				if(columnIndex!=1){
					var model = detailGrid.getSelectionModel();
					if(model.isSelected(rowIndex)){
						 model.deselectRow(rowIndex);
					}else{
						 model.selectRow(rowIndex,rowIndex+1);
					}
				}	
			}}	
		});
	
   /**
	*点击柱状图显示所有对应的问题数据  area：问题地区 type:角色  flag ：0--待处理 ；1--已处理
	*/
	obj.showdetail=function(area,type,flag){
		if(area=="各地区问题汇总"){
			area="";
		}
		coltype=type;
		curpage=1;
		pager.cursor=0;
		pager.inputItem.setValue(1);
		var config = {};
		config.area = area;
		config.type = type;
		config.flag = flag;
	    _area = area;
	    _type = type;
	    _flag = flag;
		config.start="1";
		Ext.lt.RCP.script(onlinehelpurl,"adminhelp", "finddetails", config,function (resp) {
			count=resp.result;
			if(count==0){
				count=1
			}
			detailstore.loadData(resp);
			detailGrid.doLayout();
		});
	
	};
	function loadGridPanel(currentpage){
			var config = new Object();
			config.start=currentpage+"";
			config.area = _area;
			config.type = _type;
			config.flag = _flag;
			Ext.lt.RCP.script(onlinehelpurl,"adminhelp", "finddetails", config,function (resp) {
				detailstore.loadData(resp);
				count=resp.result;
				if(count==0){
					count=1
				}
				pager.afterTextItem.setText(String.format(pager.afterPageText, count));
				detailGrid.doLayout();
			},function(){});
	}
	//底部panel
	var bottompanel = new Ext.Panel({
		id:'bottompanel',
		bodyStyle:'margin:0px 0px 0px 0px;',
		frame:true,
		layout:'column',
		width:winWidth,
		border:false,
		autoHeight:true,
		collapsible:true,//显示右上角最小化按钮
		items:[detailGrid]
	});
	 /***
	 *查看问题-----------------------------------------------------------------------------------------------------
	 */
	obj.showquestion = function(){
		var rows = detailGrid.getSelectionModel().getSelections();
		if(rows.length<1){alert("请选择要查看的数据");return;}else if(rows.length>1){alert("请选择一条数据查看");return;}
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
											items:[{xtype:'combo',readOnly:true,style:'background:#E6E6E6',fieldLabel:'问题状态',id:'showquestionProcess',anchor:'92%'}]
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
			var statusname="";
			if(coltype==1||coltype==2){
				var status = rows[0].get("adminstatus");
				var s = status.split(",");
				for(var i = 0;i<s.length;i++){
					if(s[i].indexOf(coltype)==0){
						var temp = s[i].substr(1,1);
						if(temp==0||temp==6||temp==4){
							statusname="待答复";
						}else if(temp==3){
							statusname="发送专家";
						}else if(temp==2){
							statusname="发送上级";
						}else {
							statusname="已答复";
						}
					}
				} 
			}else if(coltype=3){
				var status = rows[0].get("busofficestatus");
				statusname=status=="1"?"已答复":"待答复";
			}else{
				var status = rows[0].get("superadminstatus");
				statusname=status=="1"?"已答复":"待答复";
			}
			Ext.getCmp("showquestionProcess").setValue(statusname);
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
	 *查看问题流程-----------------------------------------------------------------------------------------------------
	 */
	obj.processflow = function(){
		var rows = detailGrid.getSelectionModel().getSelections();
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
	obj.push(viewpanel);	
	obj.push(bottompanel);	
	return obj;
}
