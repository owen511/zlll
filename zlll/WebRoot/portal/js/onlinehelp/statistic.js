Ext_lt_Statistic = new function(){
	var PerCount = 10;//ÿҳ��ʾ��������С
	var curpage=1;//��ǰҳ
	var count=1;
	var tt =document.getElementById('window_top').style.height;
	var leftw=document.getElementById("left_tree").offsetWidth;
	var winHeight = document.body.clientHeight-240;
	var winWidth = document.body.clientWidth-leftw-60;
	var _area = "";
	var _type = "";
	var _flag = "";
	var obj = new Array();
	//���ͼ��
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
		collapsible:true,//��ʾ���Ͻ���С����ť
		html:viewHtml.join('')
	});  
	
    /**
     * �����ͼ�ϵ�ĳһ��������ʾ������ɫ��������Ѵ������������״ͼ��
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
					value="�������������"
				}
				xml.push('<chart caption=\''+value+'\' xAxisName=\'��ɫ\' yAxisName=\'����\' palette=\'4\' unescapeLinks=\'0\'  decimals=\'0\' baseFontSize =\'12\' bgColor=\'99CCFF,FFFFFF\'  bgAngle=\'360\' showBorder=\'1\' imageSave=\'1\' startingAngle=\'70\' formatNumber=\'0\' useRoundEdges=\'1\'>');
				catexml.push('<categories>');
				todoxml.push('<dataset seriesName=\'������\'>');
				donexml.push('<dataset seriesName=\'�Ѵ���\'>');
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
	 * �·�������ϸ��ʾ����
	 */
	 function findgridquestiontype(val){
		if(val==null||val.length==0)return "" ;
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
		if(val==null||val.length==0)return "" ;
		for(var z=0;z<(levelmap.data).length;z++){
			if(levelmap.data[z].itemid==val){
				return levelmap.data[z].questionlevel;
			}
		}     
	}
	var detailsm = new Ext.grid.CheckboxSelectionModel({checkOnly:true});//checkbox��ѡ��Ķ���
	var detailcm = new Ext.grid.ColumnModel([
                   				new Ext.grid.RowNumberer(),
                   				detailsm,
                   				{header:'���',dataIndex:'itemid',width:30,sortable:true,menuDisabled:true},
                  				{header:'���ʱ���',dataIndex:'questionname',sortable:true,menuDisabled:true},
                   				{header:'��������',dataIndex:'questioncontent',hidden:true,menuDisabled:true},
                   				{header:'���ʵ�λ',dataIndex:'questionagency',width:60,sortable:true,menuDisabled:true},
                   				{header:'���ʵ���',dataIndex:'questionarea',hidden:staticset==0?true:false,width:50,sortable:true,menuDisabled:true},
                   				{header:'������',dataIndex:'questionuser',width:40,sortable:true,menuDisabled:true},
                   				{header:'����ʱ��',dataIndex:'questiondate',width:40,sortable:true,menuDisabled:true},
                   				{header:'��ϵ�绰',dataIndex:'telnumber',hidden:true,menuDisabled:true},
                   				{header:'��������',dataIndex:'questiontype',renderer:findgridquestiontype,width:60,sortable:true,menuDisabled:true},
                   				{header:'��������',dataIndex:'leveltype',renderer:findgridleveltype,width:30,sortable:true,menuDisabled:true},
                   				{header:'��ʱ��',dataIndex:'answerdate',hidden:true,menuDisabled:true},
                   				{header:'����',dataIndex:'answeruser',hidden:true,menuDisabled:true},
                   				{header:'������',dataIndex:'answercontent',hidden:true,menuDisabled:true},
                   				{header:'����id',dataIndex:'fileid',hidden:true,menuDisabled:true},
                   				{header:'�𸴸���id',dataIndex:'adminfileid',hidden:true,menuDisabled:true},
                   				{header:'֧������״̬',dataIndex:'adminstatus',hidden:true,menuDisabled:true},
                   				{header:'ҵ������״̬',dataIndex:'busofficestatus',hidden:true,menuDisabled:true},
			                   	{header:'���������״̬',dataIndex:'superadminstatus',hidden:true,menuDisabled:true}
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
		    beforePageText: 'ҳ',
			pageSize:PerCount,
			store:detailstore,
			displayInfo: true,   
			emptyMsg: "û�м�¼",
			moveNext:function(){//��һҳ
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
		    doRefresh:function(){//ˢ�·���
			},
		    updateInfo:function (){//��дUpdateInfo        
			},
	        onLoad:function (store,r,o){//��дOnLoad
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
			doLoad:function (start){//��дdoLoad  
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
			 getPageData:function (){//��дgetPageData 
				    return  { total:count, 
			  		activePage:curpage,
			  		pages:count
			  		};
			 }
		});
	  	var tb = new Ext.Toolbar({
	    	 html:'<div><input type="button" class="btn" onclick="Ext_lt_Statistic.showquestion();" value="�鿴"/>'+
	    	 '<input type="button" class="btn"  onclick="Ext_lt_Statistic.processflow();" value="��������"/></div>'   
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
	*�����״ͼ��ʾ���ж�Ӧ����������  area��������� type:��ɫ  flag ��0--������ ��1--�Ѵ���
	*/
	obj.showdetail=function(area,type,flag){
		if(area=="�������������"){
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
	//�ײ�panel
	var bottompanel = new Ext.Panel({
		id:'bottompanel',
		bodyStyle:'margin:0px 0px 0px 0px;',
		frame:true,
		layout:'column',
		width:winWidth,
		border:false,
		autoHeight:true,
		collapsible:true,//��ʾ���Ͻ���С����ť
		items:[detailGrid]
	});
	 /***
	 *�鿴����-----------------------------------------------------------------------------------------------------
	 */
	obj.showquestion = function(){
		var rows = detailGrid.getSelectionModel().getSelections();
		if(rows.length<1){alert("��ѡ��Ҫ�鿴������");return;}else if(rows.length>1){alert("��ѡ��һ�����ݲ鿴");return;}
		var showadminwin = new Ext.form.FormPanel({
					id:'showanswerform',
					labelWidth:65 ,
					title: '������Ϣ��ϸ',
					frame:true,
					layout:'fit',
					height:300,
					items:[{
						layout:'column',
						items:[{
							columnWidth:.5,
							layout: 'form',
							items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'�� �� �� ',id:'showquestionPreson',anchor:'96%'},
							       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'���ʵ�λ',id:'showquestionState',anchor:'96%'},
							       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��������',id:'showquestionType',anchor:'96%'}
							]
						},
						{
							layout:'form',
							columnWidth:.5,
							items:[{
									columnWidth:.5,
									layout: 'form',
									items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'����ʱ��',id:'showquestionTime',anchor:'96%'},
								       	   {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��ϵ�绰',id:'showquestionTelephone',anchor:'96%'}
									  ]
								  },{
									layout: 'column',
									items:[{
											columnWidth:.5,
											layout: 'form',
											items:[{xtype:'combo',readOnly:true,style:'background:#E6E6E6',fieldLabel:'����״̬',id:'showquestionProcess',anchor:'92%'}]
								 	 },{
											columnWidth:.5,
											layout: 'form',
											items:[{xtype:'combo',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��������',id:'showadminleveltype',anchor:'92%',
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
						items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'���ʱ���',id:'showquestionName',anchor:'99%'},
						       {xtype:'textarea',readOnly:true,style:'background:#E6E6E6',fieldLabel:'��������',height:220,id:'showquestionContent',anchor:'99%'}]
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
				var temph = Ext.getCmp('showquestionContent').height;
				temph=temph+20;
				Ext.getCmp('showfile').hide();
				Ext.getCmp('showfile').hideLabel=true;
				Ext.getCmp('showquestionContent').setHeight(temph);
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
			supershowTabPanel.add(showadminwin);
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
			var showwindone = new Ext.Window({
				buttonAlign: 'right',
				id:'showwin_newQuestion',
				width:800,
				autoHeight:true,
				closeAction:'close',
				modal: true,
				items:[supershowTabPanel],
				buttons:[{text :'��  ��',listeners:{'click':function(){showwindone.close();}}}]
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
							statusname="����";
						}else if(temp==3){
							statusname="����ר��";
						}else if(temp==2){
							statusname="�����ϼ�";
						}else {
							statusname="�Ѵ�";
						}
					}
				} 
			}else if(coltype=3){
				var status = rows[0].get("busofficestatus");
				statusname=status=="1"?"�Ѵ�":"����";
			}else{
				var status = rows[0].get("superadminstatus");
				statusname=status=="1"?"�Ѵ�":"����";
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
	 *�鿴��������-----------------------------------------------------------------------------------------------------
	 */
	obj.processflow = function(){
		var rows = detailGrid.getSelectionModel().getSelections();
		if(rows.length<1){
				alert("��ѡ��Ҫ�鿴���̵�����");	
			return;
		}else if(rows.length>1){
				alert("��ѡ��һ������");
				return;
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
	obj.push(viewpanel);	
	obj.push(bottompanel);	
	return obj;
}
