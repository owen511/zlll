//����js·������
// ����Portal�����ռ�
if (Ext.lt.portal == null) {
	//Ext.lt.portal = {};
	Ext.lt.portal = {component:{}};
}
if (Ext.lt.portal.component == null) {
	Ext.lt.portal.component = {};
}

//------------------����Ϣ��--------------------------------------------------
Ext.lt.portal.component.advices = function () {
	this.messages;
	this.tempPage=1;//��Ϣ��¼��ǰҳ��
	this.allpages=1;//��Ϣ��¼��ҳ��
	this.para= {};//����ҳ���ѯ����
	//������ĳһ����,�ͻ���tip
	Ext.QuickTips.init();
	//return '<div ext:qtitle="" ext:qtip="' + value + '">'+ value +'</div>';      
  	var data ={}; 
  	//checkbox��ѡ��Ķ���
	var sm = new Ext.grid.CheckboxSelectionModel({checkOnly:true});
	var cm = new Ext.grid.ColumnModel([
										new Ext.grid.RowNumberer(),
		                   				sm,
		                   				{header:'��ʾ',dataIndex:'itemid',hidden:true,menuDisabled:true},
		                   				{header:'��Ϣ����',dataIndex:'content',width:315,sortable:true,menuDisabled:true,renderer:function(val,cellmeta,record,rowIndex,columnIndex,stroe){
		                   					if(val==0){
		                   						return "<span style='background:url(\"/portal/images/needdo.gif\") no-repeat;padding-left:20px'>&nbsp</span>";
		                   					}else if(val==1){
		                   						return "<span style='background:url(\"/portal/images/done.gif\") no-repeat;padding-left:20px'>&nbsp</span>";
		                   					} 
		                   					var	tempflag = val.substr(0,1);
		                   					var value = val.substring(1);
		                   					var qtip = record.data.qtip;
		                   					if(qtip==null||qtip==""){
		                   						qtip=value;
		                   					}
		                   					if(tempflag=="0"){
		                   						return "<div ext:qtitle='' ext:qtip='"+qtip+"' style='background:url(\"/portal/images/needdo.gif\") no-repeat;padding-left:20px'>"+value+"</div>";
		                   					}else{
		                   						return "<div ext:qtitle='' ext:qtip='"+qtip+"' style='background:url(\"/portal/images/done.gif\") no-repeat;padding-left:20px'>"+value+"</div>";
		                   				 	}
		                   				}},
		                   				{header:'������',dataIndex:'senduser',width:80,sortable:true,menuDisabled:true,renderer:function(value){
		                   					return '<div ext:qtitle="" ext:qtip="' + value + '">'+ value +'</div>';      
		                   				}},
		                   				{header:'����ʱ��',dataIndex:'createtime',width:150,sortable:true,menuDisabled:true,renderer:function(value){
		                   					return '<div ext:qtitle="" ext:qtip="' + value + '">'+ value +'</div>';      
		                   				}},
		                   				{header:'��Ϣ����',dataIndex:'type',hidden:true,menuDisabled:true},
		                   				{header:'������Դ',dataIndex:'source',hidden:true,menuDisabled:true},
		                   				{header:'����',dataIndex:'linkname',width:70,menuDisabled:true,renderer:function(val){
		                   					if(val==""||val==null){
		                   						return "<a href='#'  ><font color=grey>����Ѷ�</font></a>";
		                   					}else{
		                   						return "<a href='#'  ><font color=red>�鿴</font></a>";
		                   					}
		                   				}},
		                   				{header:'������־',dataIndex:'followup',width:65,sortable:true,menuDisabled:true,renderer:function(val){
		                   					if(val=="1"){
		                   						return "&nbsp<span style='background:url(\"/portal/images/redflag.gif\") no-repeat;padding-left:20px'>&nbsp</span>";
		                   					}else{
		                   						return "&nbsp<span style='background:url(\"/portal/images/grayflag.gif\") no-repeat;padding-left:20px'>&nbsp</span>";
		                   					}	
		                   				}},
		                   			 	{header:'qtip',dataIndex:'qtip',hidden:true,menuDisabled:true}
		                   			]); 
	var msgstore = new Ext.data.Store({
			proxy: new Ext.data.MemoryProxy(data),
			reader: new Ext.data.JsonReader({totalProperty:'result',  
				   root:'data' }, [
			{name: 'itemid'},
			{name: 'content'},
			{name: 'senduser'},
			{name: 'createtime'},
			{name: 'type'},
			{name: 'source'},
			{name: 'linkname'},
			{name: 'followup'},
			{name: 'qtip'}
		  ])
		});							               	
    msgstore.load();			
	var messageGrid = new Ext.grid.GridPanel({
		id:'messageGrid',
		title:'',
	    layout:'fit',
		columnLines: true,
		enableColumnMove: false, 
		stripeRows:true,
		cm:cm,
		sm:sm,
		width:680, 
	    //height:304, 
	    bodyStyle:'border-width:0px',
	    autoHeight:true,
		border:false,
		store:msgstore,
		viewConfig:{
				forceFit:true,
				enableRowBody:true, 
				showPreview:true
		},
		listeners:{cellclick:function(grid, rowIndex, columnIndex, e){ 
			if(columnIndex!=1&&columnIndex!=7&&columnIndex!=8){
				var model = grid.getSelectionModel();
				if(model.isSelected(rowIndex)){
					 model.deselectRow(rowIndex);
				}else{
					 model.selectRow(rowIndex,rowIndex+1);
				}
			}	 
			if(columnIndex==8){
			    grid.getSelectionModel().selectRow(rowIndex);
			    var cell=grid.getSelectionModel().getSelections();
			    var linkname = cell[0].get('linkname');
			    if(linkname!=""&&linkname!=null){
			    	openMsg(linkname);
			    }
			     /*var value="1";
			    if(tempname!=0){
			    	value = "1"+tempname.substring(1);
			    }
			    cell[0].set('menuname',value);       
	            cell[0].commit();
	            */
	            //�޸���Ϣ��¼���е�״̬����Ϊ�Ѷ�
			   	var newtitle=Ext.getCmp('msgtId').title;
			   	var readedtitle=Ext.getCmp('donetaskId').title;
	            var start=newtitle.indexOf("(");
	            var end=newtitle.indexOf(")");
	            newtitle=newtitle.substring(start+1,end-1);
	            var newmsgcount=parseInt(newtitle)-1;
				Ext.getCmp('msgtId').setTitle('δ����Ϣ('+newmsgcount+"��)");
			    start=readedtitle.indexOf("(");
	            end=readedtitle.indexOf(")");
				readedtitle=readedtitle.substring(start+1,end-1);
				newmsgcount=parseInt(readedtitle)+1;
	            Ext.getCmp('donetaskId').setTitle('�Ѷ���Ϣ('+newmsgcount+"��)");
	            var itemid = cell[0].get('itemid')+"";
	            var source = cell[0].get('source')+"";
	            grid.getStore().remove(grid.getStore().getAt(rowIndex));//ɾ����
	            grid.doLayout();
	            var para=[itemid,source];
	            Ext.lt.RCP.server('rightnowmessage', "updatestatus", para, function (resp) {	//�����Ѷ�δ��
	            	advice.showadvice("msgdiv",1);
	            });
		    }
		    if(columnIndex==9){
					grid.getSelectionModel().selectRow(rowIndex);
					var cell=grid.getSelectionModel().getSelections();
			   		var itemid = cell[0].get('itemid')+"";
			   		var followup = cell[0].get('followup')+"";
			   		var followtitle=Ext.getCmp('followuptaskId').title;
	                var start=followtitle.indexOf("(");
	                var end=followtitle.indexOf(")");
	                followtitle=followtitle.substring(start+1,end-1);
	                var newfollowcount=parseInt(followtitle);
			   		if(followup==1){
			    		followup="0";
			    		newfollowcount--;
			   		}else{
			   			followup="1";
			   			newfollowcount++;
			   		}
			   	    cell[0].set('followup',followup);       
	                cell[0].commit();
	                Ext.getCmp('followuptaskId').setTitle('��������('+newfollowcount+"��)");
					var para={};
					para.itemid=itemid;
					para.followup=followup;
					Ext.lt.RCP.server('rightnowmessage', "followup", para, function (resp) {	//���ĺ�������
		            });
				}
		},celldblclick:function(grid, rowIndex, columnIndex, e){
				if(columnIndex==9){
					grid.getSelectionModel().selectRow(rowIndex);
					var cell=grid.getSelectionModel().getSelections();
			   		var itemid = cell[0].get('itemid')+"";
			   		var followup = cell[0].get('followup')+"";
			   		var followtitle=Ext.getCmp('followuptaskId').title;
	                var start=followtitle.indexOf("(");
	                var end=followtitle.indexOf(")");
	                followtitle=followtitle.substring(start+1,end-1);
	                var newfollowcount=parseInt(followtitle);
			   		if(followup==1){
			    		followup="0";
			    		newfollowcount--;
			   		}else{
			   			followup="1";
			   			newfollowcount++;
			   		}
			   	    cell[0].set('followup',followup);       
	                cell[0].commit();
	                Ext.getCmp('followuptaskId').setTitle('��������('+newfollowcount+"��)");
					var para={};
					para.itemid=itemid;
					para.followup=followup;
					Ext.lt.RCP.server('rightnowmessage', "followup", para, function (resp) {	//���ĺ�������
		            });
				}
			}
		}
	});
	//-----------------------------�Ѷ�grid---------------------------------
	var donedata ={}; 
  	//checkbox��ѡ��Ķ���
	var donesm = new Ext.grid.CheckboxSelectionModel({checkOnly:true});
	var donecm = new Ext.grid.ColumnModel([
										new Ext.grid.RowNumberer(),
		                   				donesm,
		                   				{header:'��ʾ',dataIndex:'itemid',hidden:true,menuDisabled:true},
		                   				{header:'��Ϣ����',dataIndex:'content',width:315,sortable:true,menuDisabled:true,renderer:function(val,cellmeta,record,rowIndex,columnIndex,stroe){
		                   					if(val==0){
		                   						return "<span style='background:url(\"/portal/images/needdo.gif\") no-repeat;padding-left:20px'>&nbsp</span>";
		                   					}else if(val==1){
		                   						return "<span style='background:url(\"/portal/images/done.gif\") no-repeat;padding-left:20px'>&nbsp</span>";
		                   					} 
		                   					var	tempflag = val.substr(0,1);
		                   					var value = val.substring(1);
		                   					var qtip = record.data.qtip;
		                   					if(qtip==null||qtip==""){
		                   						qtip=value;
		                   					}
		                   					if(tempflag=="0"){
		                   						return "<div ext:qtitle='' ext:qtip='"+qtip+"' style='background:url(\"/portal/images/needdo.gif\") no-repeat;padding-left:20px'>"+value+"</div>";
		                   					}else{
		                   						return "<div ext:qtitle='' ext:qtip='"+qtip+"' style='background:url(\"/portal/images/done.gif\") no-repeat;padding-left:20px'>"+value+"</div>";
		                   				 	}
		                   				}},
		                   				{header:'������',dataIndex:'senduser',width:80,sortable:true,menuDisabled:true,renderer:function(value){
		                   					return '<div ext:qtitle="" ext:qtip="' + value + '">'+ value +'</div>';      
		                   				}},
		                   				{header:'����ʱ��',dataIndex:'createtime',width:150,sortable:true,menuDisabled:true,renderer:function(value){
		                   					return '<div ext:qtitle="" ext:qtip="' + value + '">'+ value +'</div>';      
		                   				}},
		                   				{header:'��Ϣ����',dataIndex:'type',hidden:true,menuDisabled:true},
		                   				{header:'������Դ',dataIndex:'source',hidden:true,menuDisabled:true},
		                   				{header:'����',dataIndex:'linkname',width:50,menuDisabled:true,renderer:function(val){
		                   					if(val==""||val==null){
		                   						return "<font color=grey>�鿴</font>";
		                   					}else{
		                   						return "<a href='#' ><font color=red>�鿴</font></a>";
		                   					}
		                   				}},
	                   					{header:'������־',dataIndex:'followup',width:65,sortable:true,menuDisabled:true,renderer:function(val){
		                   					if(val=="1"){
		                   						return "&nbsp<span style='background:url(\"/portal/images/redflag.gif\") no-repeat;padding-left:20px'>&nbsp</span>";
		                   					}else{
		                   						return "&nbsp<span style='background:url(\"/portal/images/grayflag.gif\") no-repeat;padding-left:20px'>&nbsp</span>";
		                   					}	
		                   				}},
		                   				{header:'qtip',dataIndex:'qtip',hidden:true,menuDisabled:true}
		                   			]); 
	var donemsgstore = new Ext.data.Store({
			proxy: new Ext.data.MemoryProxy(donedata),
			reader: new Ext.data.JsonReader({totalProperty:'result',  
				   root:'data' }, [
			{name: 'itemid'},
			{name: 'content'},
			{name: 'senduser'},
			{name: 'createtime'},
			{name: 'type'},
			{name: 'source'},
			{name: 'linkname'},
			{name: 'followup'},
			{name: 'qtip'}	
		  ])
		});							               	
    msgstore.load();			
	var donemessageGrid = new Ext.grid.GridPanel({
		id:'donemessageGrid',
		title:'',
	    layout:'fit',
		columnLines: true,
		stripeRows:true,
		cm:donecm,
		sm:donesm,
		width:680, 
	    //height:354, 
	    autoHeight:true,
	    enableColumnMove: false,
		border:false,
		store:donemsgstore,
		viewConfig:{
				forceFit:true,
				enableRowBody:true,
				showPreview:true
		},
		listeners:{cellclick:function(grid, rowIndex, columnIndex, e){
			if(columnIndex!=1&&columnIndex!=7&&columnIndex!=8){
				var model = grid.getSelectionModel();
				if(model.isSelected(rowIndex)){
					 model.deselectRow(rowIndex);
				}else{
					 model.selectRow(rowIndex,rowIndex+1);
				}
			}	 
			if(columnIndex==8){
				grid.getSelectionModel().selectRow(rowIndex);
				var cell=grid.getSelectionModel().getSelections();
			    var linkname = cell[0].get('linkname');
			    if(linkname!=""&&linkname!=null){
			    	openMsg(linkname);
			    }
		    }
	    	if(columnIndex==9){
				grid.getSelectionModel().selectRow(rowIndex);
				var cell=grid.getSelectionModel().getSelections();
		   		var itemid = cell[0].get('itemid')+"";
		   		var followup = cell[0].get('followup')+"";
		   		var followtitle=Ext.getCmp('followuptaskId').title;
                var start=followtitle.indexOf("(");
                var end=followtitle.indexOf(")");
                followtitle=followtitle.substring(start+1,end-1);
                var newfollowcount=parseInt(followtitle);
		   		if(followup==1){
		    		followup="0";
		    		newfollowcount--;
		   		}else{
		   			followup="1";
		   			newfollowcount++;
		   		}
                Ext.getCmp('followuptaskId').setTitle('��������('+newfollowcount+"��)");
		   	    cell[0].set('followup',followup);       
                cell[0].commit();
				var para={};
				para.itemid=itemid;
				para.followup=followup;
				Ext.lt.RCP.server('rightnowmessage', "followup", para, function (resp) {	//���ĺ�������
	            });
			}
		},celldblclick:function(grid, rowIndex, columnIndex, e){
				if(columnIndex==9){
					grid.getSelectionModel().selectRow(rowIndex);
					var cell=grid.getSelectionModel().getSelections();
			   		var itemid = cell[0].get('itemid')+"";
			   		var followup = cell[0].get('followup')+"";
			   		var followtitle=Ext.getCmp('followuptaskId').title;
	                var start=followtitle.indexOf("(");
	                var end=followtitle.indexOf(")");
	                followtitle=followtitle.substring(start+1,end-1);
	                var newfollowcount=parseInt(followtitle);
			   		if(followup==1){
			    		followup="0";
			    		newfollowcount--;
			   		}else{
			   			followup="1";
			   			newfollowcount++;
			   		}
	                Ext.getCmp('followuptaskId').setTitle('��������('+newfollowcount+"��)");
			   	    cell[0].set('followup',followup);       
	                cell[0].commit();
					var para={};
					para.itemid=itemid;
					para.followup=followup;
					Ext.lt.RCP.server('rightnowmessage', "followup", para, function (resp) {	//���ĺ�������
		            });
				}
			}
		}
	});
	//----------------��������grid---------------------------------------------
	var followupdata ={}; 
  	//checkbox��ѡ��Ķ���
	var followupsm = new Ext.grid.CheckboxSelectionModel({checkOnly:true});
	var followupcm = new Ext.grid.ColumnModel([
										new Ext.grid.RowNumberer(),
		                   				followupsm,
		                   				{header:'��ʾ',dataIndex:'itemid',hidden:true,menuDisabled:true},
		                   				{header:'��Ϣ����',dataIndex:'content',width:315,sortable:true,menuDisabled:true,renderer:function(val,cellmeta,record,rowIndex,columnIndex,stroe){		                   					if(val==0){
		                   						return "<span style='background:url(\"/portal/images/needdo.gif\") no-repeat;padding-left:20px'>&nbsp</span>";
		                   					}else if(val==1){
		                   						return "<span style='background:url(\"/portal/images/done.gif\") no-repeat;padding-left:20px'>&nbsp</span>";
		                   					} 
		                   					var	tempflag = val.substr(0,1);
		                   					var value = val.substring(1);
		                   					var qtip = record.data.qtip;
		                   					if(qtip==null||qtip==""){
		                   						qtip=value;
		                   					}
		                   					if(tempflag=="0"){
		                   						return "<div ext:qtitle='' ext:qtip='"+qtip+"' style='background:url(\"/portal/images/needdo.gif\") no-repeat;padding-left:20px'>"+value+"</div>";
		                   					}else{
		                   						return "<div ext:qtitle='' ext:qtip='"+qtip+"' style='background:url(\"/portal/images/done.gif\") no-repeat;padding-left:20px'>"+value+"</div>";
		                   				 	}
		                   				}},
		                   				{header:'������',dataIndex:'senduser',width:80,sortable:true,menuDisabled:true,renderer:function(value){
		                   					return '<div ext:qtitle="" ext:qtip="' + value + '">'+ value +'</div>';      
		                   				}},
		                   				{header:'����ʱ��',dataIndex:'createtime',width:150,sortable:true,menuDisabled:true,renderer:function(value){
		                   					return '<div ext:qtitle="" ext:qtip="' + value + '">'+ value +'</div>';      
		                   				}},
		                   				{header:'��Ϣ����',dataIndex:'type',hidden:true,menuDisabled:true},
		                   				{header:'������Դ',dataIndex:'source',hidden:true,menuDisabled:true},
		                   				{header:'����',dataIndex:'linkname',width:50,menuDisabled:true,renderer:function(val){
		                   					if(val==""||val==null){
		                   						return "<font color=grey>�鿴</font>";
		                   					}else{
		                   						return "<a href='#'  ><font color=red>�鿴</font></a>";
		                   					}
		                   				}},
	                   					{header:'������־',dataIndex:'followup',width:65,sortable:true,menuDisabled:true,renderer:function(val){
		                   					if(val=="1"){
		                   						return "&nbsp<span style='background:url(\"/portal/images/redflag.gif\") no-repeat;padding-left:20px'>&nbsp</span>";
		                   					}else{
		                   						return "&nbsp<span style='background:url(\"/portal/images/grayflag.gif\") no-repeat;padding-left:20px'>&nbsp</span>";
		                   					}	
		                   				}},
		                   				{header:'qtip',dataIndex:'qtip',hidden:true,menuDisabled:true}
		                   			]); 
	var followupmsgstore = new Ext.data.Store({
			proxy: new Ext.data.MemoryProxy(followupdata),
			reader: new Ext.data.JsonReader({totalProperty:'result',  
				   root:'data' }, [
			{name: 'itemid'},
			{name: 'content'},
			{name: 'senduser'},
			{name: 'createtime'},
			{name: 'type'},
			{name: 'source'},
			{name: 'linkname'},
			{name: 'followup'},
			{name: 'qtip'}
		  ])
		});							               	
    followupmsgstore.load();			
	var followupmessageGrid = new Ext.grid.GridPanel({
		id:'followupmessageGrid',
		title:'',
	    layout:'fit',
		columnLines: true,
		stripeRows:true,
		cm:followupcm,
		sm:followupsm,
		enableColumnMove: false,
		width:680, 
	    //height:354, 
	    autoHeight:true,
		border:false,
		store:followupmsgstore,
		viewConfig:{
				forceFit:true,
				enableRowBody:true,
				showPreview:true
		},
		listeners:{cellclick:function(grid, rowIndex, columnIndex, e){
			if(columnIndex!=1&&columnIndex!=7&&columnIndex!=8){
				var model = grid.getSelectionModel();
				if(model.isSelected(rowIndex)){
					 model.deselectRow(rowIndex);
				}else{
					 model.selectRow(rowIndex,rowIndex+1);
				}
			}	 
			if(columnIndex==8){
				grid.getSelectionModel().selectRow(rowIndex);
				var cell=grid.getSelectionModel().getSelections();
			    var linkname = cell[0].get('linkname');
			    var content = cell[0].get('content');
			    var	tempname = content.substr(0,1);//0Ϊ����1�Ѵ���
			    if(tempname==0){
			    	var newtitle=Ext.getCmp('msgtId').title;
				   	var readedtitle=Ext.getCmp('donetaskId').title;
		            var start=newtitle.indexOf("(");
		            var end=newtitle.indexOf(")");
		            newtitle=newtitle.substring(start+1,end-1);
		            var newmsgcount=parseInt(newtitle)-1;
					Ext.getCmp('msgtId').setTitle('δ����Ϣ('+newmsgcount+"��)");
				    start=readedtitle.indexOf("(");
		            end=readedtitle.indexOf(")");
					readedtitle=readedtitle.substring(start+1,end-1);
					newmsgcount=parseInt(readedtitle)+1;
		            Ext.getCmp('donetaskId').setTitle('�Ѷ���Ϣ('+newmsgcount+"��)");
			    	content = "1"+content.substring(1);
			    	cell[0].set('content',content);       
			    	cell[0].commit();
			    	var itemid = cell[0].get('itemid')+"";
			    	var source = cell[0].get('source')+"";
			    	//�޸���Ϣ��¼���е�״̬����Ϊ�Ѷ�
			    	var para=[itemid,source];
			    	Ext.lt.RCP.server('rightnowmessage', "updatestatus", para, function (resp) {	//����Ϊ�Ѷ�
			    		if(linkname!=""&&linkname!=null){
			    			openMsg(linkname);
			    		}
			    	});
			    }else{
			    	if(linkname!=""&&linkname!=null){
			    		openMsg(linkname);
			    	}
			    }
	            //grid.getStore().remove(grid.getStore().getAt(rowIndex));//ɾ����
	            //grid.doLayout();
		    }
		    if(columnIndex==9){
					grid.getSelectionModel().selectRow(rowIndex);
					var cell=grid.getSelectionModel().getSelections();
			   		var itemid = cell[0].get('itemid')+"";
			   		var followup = cell[0].get('followup')+"";
			   		if(followup==1){
			    		followup="0";
			   		}else{
			   			followup="1";
			   		}
			   	    cell[0].set('followup',followup);       
	                cell[0].commit();
					var para={};
					para.itemid=itemid;
					para.followup=followup;
					Ext.lt.RCP.server('rightnowmessage', "followup", para, function (resp) {	//���ĺ�������
		            });
		     }
		},celldblclick:function(grid, rowIndex, columnIndex, e){
				if(columnIndex==9){
					grid.getSelectionModel().selectRow(rowIndex);
					var cell=grid.getSelectionModel().getSelections();
			   		var itemid = cell[0].get('itemid')+"";
			   		var followup = cell[0].get('followup')+"";
			   		if(followup==1){
			    		followup="0";
			   		}else{
			   			followup="1";
			   		}
			   	    cell[0].set('followup',followup);       
	                cell[0].commit();
					var para={};
					para.itemid=itemid;
					para.followup=followup;
					Ext.lt.RCP.server('rightnowmessage', "followup", para, function (resp) {	//���ĺ�������
		            });
				}
			}
		}
	});
	//--------------------------------------------------------------------------
	this.draw = function(el){
		Ext.lt.portal.component.advices.para= {};//�������Ĳ�ѯ����
		//��Ϣ��¼�洢�������
		var msgHtml = ['<div id="msgdiv" style="height:360px;width:680px ;overflow-y:hidden;">'
					   ,'</div><div id="" style="text-align:center;height:30px;background-color:#D3E9FF;">'
					   ,'<table><tr><td><img src="/images/actions/first.gif" onclick="advice.findMessageForPage(\'first\')"></img>'
					  ,' <img src="/images/actions/pre.gif" onclick="advice.findMessageForPage(\'pre\')"></img>'
					   ,'<img src="/images/actions/next.gif" onclick="advice.findMessageForPage(\'next\')"></img>'
						,'<img src="/images/actions/end.gif" onclick="advice.findMessageForPage(\'last\')"></img>'
					   ,'</td><td>&nbsp��ǰ��</td><td id="msgpageflag"></td><td id="msgallpageflag"></td>'
					   ,'</tr></table></div>'
					  ];
		var doneHtml = ['<div id="donemsgdiv" style="vertical-align:middle;height:360px;width:650px; overflow-y:hidden;">'
					   ,'</div><div id="" style="text-align:center;height:30px;background-color:#D3E9FF;">'
					   ,'<table><tr><td><img src="/images/actions/first.gif" onclick="advice.finddoneMessageForPage(\'first\')"></img>'
					  ,' <img src="/images/actions/pre.gif" onclick="advice.finddoneMessageForPage(\'pre\')"></img>'
					   ,'<img src="/images/actions/next.gif" onclick="advice.finddoneMessageForPage(\'next\')"></img>'
						,'<img src="/images/actions/end.gif" onclick="advice.finddoneMessageForPage(\'last\')"></img>'
					   ,'</td><td>&nbsp��ǰ��</td><td id="donemsgpageflag"></td><td id="donemsgallpageflag"></td>'
					    ,'</tr></table></div>'
					  ];
	  	var followupHtml = ['<div id="followupmsgdiv" style="vertical-align:middle;height:360px;width:650px; overflow-y:hidden;">'
					   ,'</div><div id="" style="text-align:center;height:30px;background-color:#D3E9FF;">'
					   ,'<table><tr><td><img src="/images/actions/first.gif" onclick="advice.findfollowupMessageForPage(\'first\')"></img>'
					  ,' <img src="/images/actions/pre.gif" onclick="advice.findfollowupMessageForPage(\'pre\')"></img>'
					   ,'<img src="/images/actions/next.gif" onclick="advice.findfollowupMessageForPage(\'next\')"></img>'
						,'<img src="/images/actions/end.gif" onclick="advice.findfollowupMessageForPage(\'last\')"></img>'
					   ,'</td><td>&nbsp��ǰ��</td><td id="followupmsgpageflag"></td><td id="followupmsgallpageflag"></td>'
					    ,'</tr></table></div>'
					  ];			  
		var msgPanel = new Ext.Panel({
			id:"msgtId", 
			title:"δ����Ϣ",
			border:false,
			layout:'fit',
			//height:450,
			bodyStyle:'border-width:0px',
			width:680,
			autoHeight:true,
			//buttonAlign:'right',
			html:msgHtml.join(''),
			tbar:new Ext.Toolbar(['��ѯ���ݣ�',{xtype:'textfield',id:'messageMenuName',width:90},'-',
			                                 '����ʱ�䣺',{xtype:'datefield',fieldLabel:'',width:95,id:'messagestarttime',format:'Y-m-d',anchor:'', editable:false},'��',
											 {xtype:'datefield',fieldLabel:'',width:95,id:'messageendtime',format:'Y-m-d',anchor:'', editable:false},'-',
											 {text:'',icon:'/images/done_btn/clear_qry2.gif',handler:function(){
										     		Ext.getCmp('messageMenuName').setValue();
										     		Ext.getCmp('messagestarttime').setValue();
										     		Ext.getCmp('messageendtime').setValue();
											 }},'-',
										     {text:'��  ѯ',width:50,icon:'/images/done_btn/find.gif',handler:function(){
										     		var a = Ext.getCmp('messageMenuName').getValue();
										     		var b = Ext.getCmp('messagestarttime').value;
										     		var c = Ext.getCmp('messageendtime').value;
										     		if(c!=""&&b!=""&&c!=undefined&&b!=undefined){
										     			if(b>c){
										     				alert("��ʼʱ����ڽ���ʱ��");
										     				return
										     			}
										     		}
										     		//��ҳ�汣���ѯ����
												    Ext.lt.portal.component.advices.para.menuname=a;
												    Ext.lt.portal.component.advices.para.start=b;
												    Ext.lt.portal.component.advices.para.end=c;
										    		Ext.lt.portal.component.advices.tempPage=1;
					                              	advice.showadvice("msgdiv",1);
											 }},'-',
					                         {text:'ɾ��',width:50,icon:'/images/done_btn/del.gif',handler:function(){
					                           		var rows = messageGrid.getSelectionModel().getSelections();
													if(rows.length<1){
														alert("��ѡ��Ҫɾ������Ϣ��¼��")
														return;
													}
													if(confirm("ȷ��ɾ����Ϣ��¼��")){
														var ids ="";
														for(var i =0;i<rows.length;i++){
															ids+="'"+rows[i].get("itemid")+"',";
														}
														//���ú�̨ɾ������
					                              		Ext.lt.RCP.server('rightnowmessage', "delMsgRecord",  ids, function (resp) {
					                              			//ɾ����Ϣ��¼�����½��в�ѯ��ʾ
					                               			Ext.lt.portal.component.advices.tempPage=1;
					                              			advice.showadvice("msgdiv",1);
					                             		});
													}
					                         }}
				                ])	
		});
		
		var donePanel = new Ext.Panel({
			id:"donetaskId", 
			title:"�Ѷ���Ϣ",
			border:false,
			//height:450,
			width:680,
			autoHeight:true,
			bodyStyle:'border-width:0px',
			html:doneHtml.join(''),
			tbar:new Ext.Toolbar(['��ѯ���ݣ�',{xtype:'textfield',id:'messageName',width:90},'-',
			                                 '����ʱ�䣺',{xtype:'datefield',fieldLabel:'',width:95,id:'msgstarttime',format:'Y-m-d',anchor:'', editable:false},'��',
											 {xtype:'datefield',fieldLabel:'',width:95,id:'msgendtime',format:'Y-m-d',anchor:'', editable:false},'-',
											 {text:'',icon:'/images/done_btn/clear_qry2.gif',handler:function(){
										     		Ext.getCmp('messageName').setValue();
										     		Ext.getCmp('msgstarttime').setValue();
										     		Ext.getCmp('msgendtime').setValue();
											 }},'-',
										     {text:'��  ѯ',width:50,icon:'/images/done_btn/find.gif',handler:function(){
										     		var a = Ext.getCmp('messageName').getValue();
										     		var b = Ext.getCmp('msgstarttime').value;
										     		var c = Ext.getCmp('msgendtime').value;
										     		if(c!=""&&b!=""&&c!=undefined&&b!=undefined){
										     			if(b>c){
										     				alert("��ʼʱ����ڽ���ʱ��");
										     				return
										     			}
										     		}
										     		//��ҳ�汣���ѯ����
												    Ext.lt.portal.component.advices.para.menuname=a;
												    Ext.lt.portal.component.advices.para.start=b;
												    Ext.lt.portal.component.advices.para.end=c;
										    		Ext.lt.portal.component.advices.tempPage=1;
					                              	advice.showdoneadvice("donemsgdiv",1);
											 }},'-',
					                         {text:'ɾ��',width:50,icon:'/images/done_btn/del.gif',handler:function(){
					                           		var rows = donemessageGrid.getSelectionModel().getSelections();
													if(rows.length<1){
														alert("��ѡ��Ҫɾ������Ϣ��¼��")
														return;
													}
													if(confirm("ȷ��ɾ����Ϣ��¼��")){
														var ids ="";
														for(var i =0;i<rows.length;i++){
															ids+="'"+rows[i].get("itemid")+"',";
														}
														//���ú�̨ɾ������
					                              		Ext.lt.RCP.server('rightnowmessage', "delMsgRecord",  ids, function (resp) {
					                              			//ɾ����Ϣ��¼�����½��в�ѯ��ʾ
					                               			Ext.lt.portal.component.advices.tempPage=1;
					                              			advice.showdoneadvice("donemsgdiv",1);
					                             		});
													}
					                         }}
				                ])	
		});
		var followupPanel = new Ext.Panel({
			id:"followuptaskId", 
			title:"��������",
			border:false,
			//height:450,
			width:680,
			autoHeight:true,
			bodyStyle:'border-width:0px',
			html:followupHtml.join(''),
			tbar:new Ext.Toolbar(['��ѯ���ݣ�',{xtype:'textfield',id:'followupmessageName',width:90},'-',
			                                 '����ʱ�䣺',{xtype:'datefield',fieldLabel:'',width:95,id:'followupstarttime',format:'Y-m-d',anchor:'', editable:false},'��',
											 {xtype:'datefield',fieldLabel:'',width:95,id:'followupendtime',format:'Y-m-d',anchor:'', editable:false},'-',
											 {text:'',icon:'/images/done_btn/clear_qry2.gif',handler:function(){
										     		Ext.getCmp('followupmessageName').setValue();
										     		Ext.getCmp('followupstarttime').setValue();
										     		Ext.getCmp('followupendtime').setValue();
											 }},'-', 
										     {text:'��  ѯ',width:50,icon:'/images/done_btn/find.gif',handler:function(){
										     		var a = Ext.getCmp('followupmessageName').getValue();
										     		var b = Ext.getCmp('followupstarttime').value;
										     		var c = Ext.getCmp('followupendtime').value;
										     		if(c!=""&&b!=""&&c!=undefined&&b!=undefined){
										     			if(b>c){
										     				alert("��ʼʱ����ڽ���ʱ��");
										     				return
										     			}
										     		}
										     		//��ҳ�汣���ѯ����
												    Ext.lt.portal.component.advices.para.menuname=a;
												    Ext.lt.portal.component.advices.para.start=b;
												    Ext.lt.portal.component.advices.para.end=c;
										    		Ext.lt.portal.component.advices.tempPage=1;
					                              	advice.showfollowupadvice("followupmsgdiv",1);
											 }},'-',
					                         {text:'ɾ��',width:50,icon:'/images/done_btn/del.gif',handler:function(){
					                           		var rows = followupmessageGrid.getSelectionModel().getSelections();
													if(rows.length<1){
														alert("��ѡ��Ҫɾ������Ϣ��¼��")
														return;
													}
													if(confirm("ȷ��ɾ����Ϣ��¼��")){
														var ids ="";
														for(var i =0;i<rows.length;i++){
															ids+="'"+rows[i].get("itemid")+"',";
														}
														//���ú�̨ɾ������
					                              		Ext.lt.RCP.server('rightnowmessage', "delMsgRecord",  ids, function (resp) {
					                              			//ɾ����Ϣ��¼�����½��в�ѯ��ʾ
					                               			Ext.lt.portal.component.advices.tempPage=1;
					                              			advice.showfollowupadvice("followupmsgdiv",1);
					                             		});
													}
					                         }}
				                ])	
		});
		var tbpanel = new Ext.TabPanel({
		    activeTab: 4,
       		border:false,
      	    plain:true,
      	    autoHeight:true,
      	    defaults:{autoScroll: true},
			id:"msgtbpanel",
	    	width:680,
	   	    items:[msgPanel,donePanel,followupPanel],
	    	listeners: {
	  			'tabchange': function(t, p) {
		  			if(p.id=='msgtId'){
		  				  Ext.lt.portal.component.advices.para= {};
		  	  			  advice.showadvice("msgdiv",1);
		  	  			  Ext.lt.portal.component.advices.tempPage=1;
						  Ext.getCmp('messageMenuName').setValue();
						  Ext.getCmp('messagestarttime').setValue();
						  Ext.getCmp('messageendtime').setValue();
		  	  		}else if(p.id=='followuptaskId'){
			  			  Ext.lt.portal.component.advices.para= {};
		  				  advice.showfollowupadvice("followupmsgdiv",1);
		  	  			  Ext.lt.portal.component.advices.tempPage=1;
		  	  			  Ext.getCmp('followupmessageName').setValue();
						  Ext.getCmp('followupstarttime').setValue();
						  Ext.getCmp('followupendtime').setValue();
		  			}else if(p.id=='donetaskId'){
		  			 	  Ext.lt.portal.component.advices.para= {};
		  				  advice.showdoneadvice("donemsgdiv",1);
		  	  			  Ext.lt.portal.component.advices.tempPage=1;
		  	  			  Ext.getCmp('messageName').setValue();
						  Ext.getCmp('msgstarttime').setValue();
						  Ext.getCmp('msgendtime').setValue();
		  			}
	 			}
		    }	
	    });
	  	tbpanel.render(el);
	  	window.setTimeout(function(){tbpanel.setActiveTab(0)}, 5);//��ʱ����
	}
	//�����ҳβҳ��ҳ��ҳ���з�ҳ��ѯ
	this.findMessageForPage=function(page){
		if(page=="first"){
			page=1;
		}else if(page=="last"){
			page=parseInt(Ext.lt.portal.component.advices.allpages);
		}else if(page=="pre"){
			page=Ext.lt.portal.component.advices.tempPage-1;
		}else{
			page=Ext.lt.portal.component.advices.tempPage+1;
		}
		if(page>0&&page<=Ext.lt.portal.component.advices.allpages){
		 	Ext.lt.portal.component.advices.tempPage=page;//���ĵ�ǰҳ����
		 	document.getElementById("msgpageflag").innerHTML=Ext.lt.portal.component.advices.tempPage;
		 	document.getElementById("msgallpageflag").innerHTML="/"+Ext.lt.portal.component.advices.allpages+"ҳ";
		 	advice.showadvice("msgdiv",page);
		}
	}
	this.finddoneMessageForPage=function(page){
		if(page=="first"){
			page=1;
		}else if(page=="last"){
			page=parseInt(Ext.lt.portal.component.advices.allpages);
		}else if(page=="pre"){
			page=Ext.lt.portal.component.advices.tempPage-1;
		}else{
			page=Ext.lt.portal.component.advices.tempPage+1;
		}
		if(page>0&&page<=Ext.lt.portal.component.advices.allpages){
		 	Ext.lt.portal.component.advices.tempPage=page;//���ĵ�ǰҳ����
		 	document.getElementById("donemsgpageflag").innerHTML=Ext.lt.portal.component.advices.tempPage;
		 	document.getElementById("donemsgallpageflag").innerHTML="/"+Ext.lt.portal.component.advices.allpages+"ҳ";
		 	advice.showdoneadvice("donemsgdiv",page);
		}
	}
	this.findfollowupMessageForPage=function(page){
		if(page=="first"){
			page=1;
		}else if(page=="last"){
			page=parseInt(Ext.lt.portal.component.advices.allpages);
		}else if(page=="pre"){
			page=Ext.lt.portal.component.advices.tempPage-1;
		}else{
			page=Ext.lt.portal.component.advices.tempPage+1;
		}
		if(page>0&&page<=Ext.lt.portal.component.advices.allpages){
		 	Ext.lt.portal.component.advices.tempPage=page;//���ĵ�ǰҳ����
		 	document.getElementById("followupmsgpageflag").innerHTML=Ext.lt.portal.component.advices.tempPage;
		 	document.getElementById("followupmsgallpageflag").innerHTML="/"+Ext.lt.portal.component.advices.allpages+"ҳ";
		 	advice.showfollowupadvice("followupmsgdiv",page);
		}
	}
	//��ѯδ����Ϣ
	this.showadvice =function(id,index){
		Ext.lt.portal.component.advices.para.index=index;
		var msgHTML = [];
		//������Ϣ��¼����
		Ext.lt.RCP.server('rightnowmessage', "getMsgRecord",  Ext.lt.portal.component.advices.para, function (resp) {
			if(Ext.lt.portal.component.advices.haswarned==undefined){
				if(resp.warnMsg!=""){
					alert(resp.warnMsg);
					Ext.lt.portal.component.advices.haswarned=1;//��־�Ѿ����ѹ�
				}
			}	
			var remind=pWin.document.getElementById('remind');
			if(remind!=null){
				remind.firstChild.className=resp.totalmsgs>0?'havemsg':'lock';
			}
			window.returnValue = resp.totalmsgs;
			Ext.getCmp('msgtId').setTitle('δ����Ϣ('+resp.totalmsgs+"��)");
			Ext.getCmp('donetaskId').setTitle('�Ѷ���Ϣ('+resp.hasreadcount+"��)");
			Ext.getCmp('followuptaskId').setTitle('��������('+resp.followcount+"��)");
			document.getElementById("messagecount").innerHTML='('+resp.messagecount+')';//�ڸ�����Ϣ�˵����������
			//����Ϣ��¼�ı����Ⱦ��div��
			messageGrid.render(id);
			msgstore.loadData(resp);
			messageGrid.doLayout();
			if(resp.result>0){
				Ext.lt.portal.component.advices.allpages=resp.result;//��Ϣ��¼��ҳ��
			}else{
				Ext.lt.portal.component.advices.allpages=1;//��Ϣ��¼��ҳ��
			}
			document.getElementById("msgpageflag").innerHTML=Ext.lt.portal.component.advices.tempPage;
			document.getElementById("msgallpageflag").innerHTML="/"+Ext.lt.portal.component.advices.allpages+"ҳ";
		});
	}
	//��ѯ�Ѷ���Ϣ
	this.showdoneadvice =function(id,index){
		Ext.lt.portal.component.advices.para.index=index;
		var msgHTML = [];
		//������Ϣ��¼����
		Ext.lt.RCP.server('rightnowmessage', "getHaveReadRecord",  Ext.lt.portal.component.advices.para, function (resp) {
			Ext.getCmp('donetaskId').setTitle('�Ѷ���Ϣ('+resp.totalmsgs+"��)");
			Ext.getCmp('msgtId').setTitle('δ����Ϣ('+resp.newcount+"��)");
			Ext.getCmp('followuptaskId').setTitle('��������('+resp.followcount+"��)");
			document.getElementById("messagecount").innerHTML='('+resp.messagecount+')';//�ڸ�����Ϣ�˵����������
			//����Ϣ��¼�ı����Ⱦ��div��
			donemessageGrid.render(id);
			donemsgstore.loadData(resp);
			donemessageGrid.doLayout();
			if(resp.result>0){
				Ext.lt.portal.component.advices.allpages=resp.result;//��Ϣ��¼��ҳ��
			}else{
				Ext.lt.portal.component.advices.allpages=1;//��Ϣ��¼��ҳ��
			}
			document.getElementById("donemsgpageflag").innerHTML=Ext.lt.portal.component.advices.tempPage;
			document.getElementById("donemsgallpageflag").innerHTML="/"+Ext.lt.portal.component.advices.allpages+"ҳ";
		});
	}
	//��ѯ����������Ϣ
	this.showfollowupadvice =function(id,index){
		Ext.lt.portal.component.advices.para.index=index;
		var msgHTML = [];
		//������Ϣ��¼����
		Ext.lt.RCP.server('rightnowmessage', "getfollowupRecord",  Ext.lt.portal.component.advices.para, function (resp) {
			Ext.getCmp('followuptaskId').setTitle('��������('+resp.totalmsgs+"��)");
			Ext.getCmp('donetaskId').setTitle('�Ѷ���Ϣ('+resp.hasreadcount+"��)");
			Ext.getCmp('msgtId').setTitle('δ����Ϣ('+resp.newcount+"��)");
			document.getElementById("messagecount").innerHTML='('+resp.messagecount+')';//�ڸ�����Ϣ�˵����������
			//����Ϣ��¼�ı����Ⱦ��div��
			followupmessageGrid.render(id);
			followupmsgstore.loadData(resp);
			followupmessageGrid.doLayout();
			if(resp.result>0){
				Ext.lt.portal.component.advices.allpages=resp.result;//��Ϣ��¼��ҳ��
			}else{
				Ext.lt.portal.component.advices.allpages=1;//��Ϣ��¼��ҳ��
			}
			document.getElementById("followupmsgpageflag").innerHTML=Ext.lt.portal.component.advices.tempPage;
			document.getElementById("followupmsgallpageflag").innerHTML="/"+Ext.lt.portal.component.advices.allpages+"ҳ";
		});
	}

}
//----------------��������--------------------------------------------------------------------------------------	
	function setUp(id){
	   var ieHeight = 200;//�������ڸ߶�
	   var ver;//������汾 
	   var bType;//��������� 
	   var vNumber;//�汾�� 
	   ver = navigator.appVersion; 
	   bType =navigator.appName; 
	   if(bType=="Microsoft Internet Explorer"){
	     	vNumber=parseFloat(ver.substring(ver.indexOf("MSIE ")+5,ver.lastIndexOf("Windows")));
	       if (vNumber == 6.0){
				ieHeight = 230;
	       }	
	   }
		var url = "/portal/portal2/message/messageSetUp.jsp";
	    var result = window.showModalDialog(url,window,"dialogHeight:"+ieHeight+"px;dialogWidth:400px;resizable: No; status: No; help:No;");
	}
//----------------��������չʾ--------------------------------------------------------------------------------------	
	function showtask(id){
	    document.getElementById("personalmsgmenu").className='userinfo';
		document.getElementById("personalmsgmenu").onmouseout=function onmouseout(){ this.className="userinfo"};
		document.getElementById("waittaskmenu").className='todo_over';
		document.getElementById("waittaskmenu").onmouseout='';
		document.getElementById("setupmenu").className='userinfoset';
		var str;
		var pdtPara = {};
		//��ѯ����ʱ��Ҫ������˵�id�����ơ���
		     Ext.lt.RCP.server('defaultCommonService', "getMainMenuService",  pdtPara, function (resp) {
		     	str = pendingTaskShowAfterInLogo(resp);
		     	if(str==""){
		     		document.getElementById(id).innerHTML = "<font size=3 color=red>�޴�������</font>";
				}else{
					document.getElementById(id).innerHTML = str;
				}
	          });
	}
	//�ڴ�����չʾ��������
	function pendingTaskShowAfterInLogo(config){
	    var pendingTaskHtml = [];
		pendingTaskHtml.push('    	     <span id="middle_inner">');
		pendingTaskHtml.push('		         <table width=660px border=0 cellpadding=0 cellspacing=0>');
        //�˵�ID
		var menuid = "";
		//ҵ��ϵͳ��ַ
		var hosturl = "";
	    //���ӵ�ַ
		var clientmodules = "";
		//�˵�����
		var meunname = "";
		//ҵ��ϵͳ����
		var type = "";
		//�û�����
		var uid = config.userCode;
		//sessionID 
		var sid = config.session;
		//�������
		var year = config.year;	
		//����ҵ��ϵͳ��Ŀ
		var count = 0;
		//ѭ��������ϵͳ��Ϣ
		config.totalmenus = config.totalmenus.toArray();
		for (var i = 0; i < config.totalmenus.length; i ++){
	        //�˵����� 
	        var menu = config.totalmenus[i]
	        //���������ҵ��ϵͳ
	        if (menu.menuid){
	        	//�˵�����
				clientmodules += menu.clientmodule + ";";
	            //�˵�����
				menuid += menu.menuid + ";";
				//ҵ��ϵͳ��ַ
				hosturl += "0" + ";";
				//�˵�����
				meunname += menu.name + ";";
				//ҵ��ϵͳ���ͣ�һ�廯��ͬ����ҵ��ϵͳ���뼰һ�廯����ҵ��ϵͳ����
				type += 4 + ";";
				count=count+1;
				//����ҵ��ϵͳչʾ����һ��ҵ��ϵͳռ��һ������һ��
				pendingTaskHtml.push('<tr>');
				pendingTaskHtml.push('    <td>');
				pendingTaskHtml.push('        <div  id=task' + menu.menuid + '>');
				pendingTaskHtml.push('        </div>');
				pendingTaskHtml.push('    </td>');
				pendingTaskHtml.push('</tr>');    
	        //����ǽ���ҵ��ϵͳ
	        }else {
	            //�������ҵ��ϵͳ��Ҫչʾ��������
				if (menu.haspendingtask) {
				//alert(menu.haspendingtask);
					//�˵�����
					clientmodules +="null;";
				    //ҵ��ϵͳ����
					menuid += menu.code + ";";
					//ҵ��ϵͳ��ַ
					hosturl += menu.hosturl + ";";
					//ҵ��ϵͳ����
					meunname += menu.name + ";";
					//ҵ��ϵͳ����
					type += menu.tjhqprogram + ";";
					count=count+1;
					//����ҵ��ϵͳչʾ����һ��ҵ��ϵͳռ��һ������һ��
					pendingTaskHtml.push('<tr>');
					pendingTaskHtml.push('    <td>');
					pendingTaskHtml.push('        <div id=task' + menu.code + '>');
					pendingTaskHtml.push('        </div>');
					pendingTaskHtml.push('    </td>');
					pendingTaskHtml.push('</tr>');    
				}
	        }
	        //��װ���������ѯ������ÿ���һ��������˷���
	        if (count == 5 || i == config.totalmenus.length - 1){
		        var pdtPara = {};
		        //�˵�����
		        pdtPara.menuid = menuid;
		        //ϵͳ����
		        pdtPara.clientmodules = clientmodules;
		        //ҵ��ϵͳ��ַ
		        pdtPara.hosturl = hosturl;
		        //ҵ��ϵͳ����
		        pdtPara.meunname = meunname;
		        //ҵ��ϵͳ����
		        pdtPara.type = type;
		        //�û�����
		        pdtPara.uid = uid;
		        //sessionID
		        pdtPara.sid = sid;
		        //�������
		        pdtPara.year = year;
	            //��ѯ����������Ϣ
                Ext.lt.RCP.server('defaultCommonService', "getPendingTask",  pdtPara, function (resp) {
                    //���������ѯ���ؽ��չʾ
                	if(config.portalisshownewpendingtask==0){
                		showPendingTaskMessageNEW(resp);
                	}else{
                		showPendingTaskInLogo(resp);
                	}
                    
                });
                //��ո�������Ϣ
				//ҵ��ϵͳ����
				menuid = "";
				//ҵ��ϵͳ��ַ
				hosturl = "";
				//ҵ��ϵͳ����
				meunname = "";
				//ҵ��ϵͳ����
				type = "";
				count = 0;
				clientmodules="";
	        }
		}
		pendingTaskHtml.push('		         </table>');
		pendingTaskHtml.push('           </span>');
	    return pendingTaskHtml.join('');
	};
	/**************���������ѯ���ؽ��չʾ**********/
	function showPendingTaskInLogo(config){
	    //��������չʾ���󼯺�
	    var totallist = config;
	    for(var index = 0;index < totallist.length; index++)
	    {   
	        //ҵ��ϵͳ��������������磺ָ��ϵͳ
		    var pendingtasks=totallist[index];
		    //�����������洢�������
		    var taskStrHtml = [];
		    //���ҵ��ϵͳ��Ҫ��ʾ��������
		    if(pendingtasks.size()>0){
		       //���������ҵ��ϵͳ
			   if(pendingtasks[0].outter!=1)
			   {   
			       //���ҵ��ϵͳ�����ڴ�������
				   if(!pendingtasks[0].name)
				   {
				        //ҵ��ϵͳID
					    var k=pendingtasks[0].k;
					    //ҵ��ϵͳ����
						var menuname=pendingtasks[0].menuname;
						//��ʾҵ��ϵͳ����
						//taskStrHtml.push('<p style="border: #000000 1px dotted;margin-right: 20px;margin-top: 10px;margin-bottom: 10px;color: #000000;display:block; overflow:auto;">');
						/*taskStrHtml.push('<p >');
						taskStrHtml.push('<a class=inner_title >' + menuname + '&nbsp&nbsp&nbsp&nbsp<b style="color:#000; font-weight:normal;"></b>' + '</a>');
						taskStrHtml.push('</p>');
						*/
			       }
			       //���ҵ��ϵͳ���ڴ�������
			       else{
			           //�û�����
					   var count=0;
					   //��ʾҵ��ϵͳ����
					   if(pendingtasks.size()<=2){
					   		var total=0;
					   		for(i=0; i<pendingtasks.size();i++) {
					   			var tempdetails = pendingtasks[i].details;
					   			if(tempdetails.size()>total)total=tempdetails.size();
					   		}
					   		var divH=155-(4-total)*13;
					   		taskStrHtml.push('<p style="height:'+divH+'px; display:block; overflow:auto;">');
					   }else{
					     	taskStrHtml.push('<p style="height:150px; display:block; overflow:auto;">');
					   }
					   taskStrHtml.push('<a class=inner_title href="#" onclick="openMsg(\'' + _ROOT_PATH_+pendingtasks[0].clientmodule+'\')">'+ pendingtasks[0].menuname + '</a>');
					   //ҵ��ϵͳ�д�������չʾ���
					   taskStrHtml.push('<table width=97% border=0 cellpadding=0 cellspacing=0>');
					   //ѭ��ҵ��ϵͳ��ϵͳ,���磺��ָ����ء���λָ������ȵ�
				       for(i=0; i<pendingtasks.size();i++) {
				       		count++;
				       		//����ҵ��ϵͳ��ϵͳ����
							var pendingtask= pendingtasks[i];
							//ҵ��ϵͳ��ϵͳ��������������磺����ˡ�����ӡ�ȵ�
							var details = pendingtask.details;
							//��ϵͳ�����ַ
							var hostip = pendingtask.hostip;
							//��ϵͳ����˿�
							var hostport=pendingtask.hostport;
							//��ϵͳ���ط����ַ
							var localip = pendingtask.localip;
							//��ϵͳ���ط���˿�
							var localport=pendingtask.localport;
							//�û�����
							var uid=pendingtask.uid;
							//ҵ��ϵͳ�˵��ɣ�
							var k = pendingtask.k;
							//sessionID
							var sid=pendingtask.sid;
							//�������
							var year=pendingtask.year;
							//�Ƿ���
							if(count%2==1)
							{
			      				taskStrHtml.push('<tr>');
			    			}
			    			//��ϵͳ��������չʾ
							taskStrHtml.push('<td width="45%" style="vertical-align:top;">' + '<span>');
							//��ϵͳ����ǰ������ͼ��
							taskStrHtml.push('<img src="' + _ROOT_PATH_ + '/images/bg/top.gif"/><font size=2>');
							taskStrHtml.push(pendingtask.name + '----->��' + pendingtask.totalcount + '��</font><br/>');
							//������ϵͳ����������磺����ˡ�����ӡ��
							for(j=0;j<details.size();j++)
							{
							    //��ϵͳ��������ǰ��ͼ��
							    taskStrHtml.push('&nbsp' + '<img src="' + _ROOT_PATH_ + '/images/bg/20.png" />');
							    //��ϵͳ��������������磺����ˡ�����ӡ��
							    detail=details[j];
							    //��ϵͳ�����������ӵ�ַ
							    var url="http://"+hostip+":"+hostport+detail.linkName;
							    //�滻���ӵ�ַ�еĲ������ַ�
							    url=url.replace(/&/g, "%26");
							    //���ҵ��ϵͳ�ķ����ַΪ����ʹ�õ�ǰϵͳ��Ĭ�ϵ�ַ
							    if(hostip == "" && hostport == ""){
							    	//��Щ�˵�url�к���' ҳ���ϻᱨ��
							    	var tempurl=_ROOT_PATH_+detail.linkName;
							    	if(tempurl.indexOf("'")!=-1){
							    		for(var m = 0;m <tempurl.length; m++){
							    			if(tempurl.substring(m,m+1)=="'"){
							    			tempurl=tempurl.replace("'","");
							    			}
							    		}
							    	}
							    	taskStrHtml.push('<a href="#" onclick="openMsg(\'' + tempurl + '\')">');
							    }  
							    //������ҵ��ϵͳ�ķ����ַ�뵱ǰ�����ַ��ͬ��ʹ�õ�ǰϵͳ��Ĭ�ϵ�ַ 
							    else if(hostip == localip && hostport == localport)
								{
							       taskStrHtml.push('<a href="#" onclick="openMsg(\'' + _ROOT_PATH_+detail.linkName + '\')">');
							    }
							    //������������ҵ��ϵͳ
							    else{
								   taskStrHtml.push('<div class="content_black"><a href="#" onclick="openMsg(\'http://'+hostip + ':' + hostport + '/common/pendingtasklogin.do' + '?uid=' + uid + '&sid=' + sid + '&year=' + year + '&url=' + url + '\')">');
							    }
							    //��ʾ���������������
							    taskStrHtml.push('<font size=2>&nbsp��' + detail.operattypedto.name + '&nbsp' + detail.totalcount + '��</font></a>');
				   				taskStrHtml.push('<br/>');   
						    } 
							taskStrHtml.push('</span>' + '</td>');
							//��ϵͳ�Ƿ���
							if(count%2==0){
			      			    taskStrHtml.push('</tr>');
			    			}  
					    }
						taskStrHtml.push('</table>');
						taskStrHtml.push('</p>');
				    }
			   }
			   //���Ϊ�����������
			   if(pendingtasks[0].outter==1){
				   //ѭ��ҵ��ϵͳ��ϵͳ��Ϣ
				   for(i=0; i<pendingtasks.size();i++) {
				   	  taskStrHtml.push('<p>');
				   	  //��ϵͳ�������磺��ָ����ء���λָ�����
				      pendingtask= pendingtasks[i];
				      //ҵ��ϵͳID
				      var k=pendingtask.k;
				      //��ϵͳ�������������磺����ˡ�����ӡ��
				      var details = pendingtask.details;
				      //��ϵͳ���Ƽ���
				      var name_tem = pendingtask.name_tem;
				      //ҵ��ϵͳǰ������ͼ��
				      taskStrHtml.push('<img src="' + _ROOT_PATH_ + '/images/bg/top.gif"/>');
				      //�����bsҵ��ϵͳ
				      if(pendingtask.type==1)
					  {  
				      	taskStrHtml.push('<a href="' + pendingtask.Url + '" target="_blank">');
				      	//ҵ��ϵͳ����
				      	taskStrHtml.push(pendingtask.name + '</a>');
				      //�����csҵ��ϵͳ
				      }else{
				    	taskStrHtml.push('<a href="#">');
				      	//ҵ��ϵͳ����
				      	taskStrHtml.push(pendingtask.name + '</a>');
				      }
				      //���������������������
				      if(pendingtask.count>0){
				        taskStrHtml.push('----->��' + pendingtask.count + '��<br/>');
				       }
				       taskStrHtml.push('<br/>'); 
				       taskStrHtml.push('<span >');
			           //��ϵͳ���Ƽ���Ϊ����������table�����ҵ��ϵͳ�в�ͬ��ϵͳ�Ĵ�������
				       if(name_tem.size()>0){
					        taskStrHtml.push('<table border=0>');
					        //ѭ������ҵ��ϵͳ��ϵͳ
					       	for(o=0;o<name_tem.size();o++){
					       	//�����б��
					       	if(o%2==0)
								{
				      				taskStrHtml.push('<tr>');
				    			}
					       	    taskStrHtml.push('<td width="300" style="vertical-align:top;">');
					       	    //ϵͳ����ǰ��ͼ��
					       		taskStrHtml.push('&nbsp' + '<img src="' + _ROOT_PATH_ + '/images/bg/20.png" />');
					       		//��ϵͳ����
					       		taskStrHtml.push(name_tem[o]);	       		
					       		taskStrHtml.push('<br/>');
					       		//ѭ��������ϵͳ��Ӧ��������������ˡ�����ӡ��
					       		for(j=0;j<details.size();j++)
								   { 
								      //��ϵͳ������������������ˡ�����ӡ��
								      detail=details[j];
								      //�����ϵͳ����������������0
								      if(detail.totalcount>0){
								          //�����ϵͳ��������������ж�Ӧ��ϵͳ����һ�£���Ѵ�����������Ӧ��ϵͳ������
									      if(detail.menuname == name_tem[o] ){
									         //�����bsϵͳ
									         if(pendingtask.type==1)
									         {  
									         	taskStrHtml.push('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + '<a href="' + detail.JobUrl + '" target="_blank"><font size=2 color = "' + detail.color + '">' + detail.status + '<' + detail.totalcount + '��></font></a>');
									         	taskStrHtml.push('<br/>');
					                         }
					                         //�����CSϵͳ
					                         else
					                         {
					                            taskStrHtml.push('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font size=2>' + detail.status + '&nbsp;<' + detail.totalcount + '��></font>');
					                            taskStrHtml.push('<br/>'); 
					                         }
					                       }
								       }
								       //��������ϵͳ����������������0
								       if(detail.totalcount==0){
								           taskStrHtml.push('<font size=2>&nbsp' + detail.status); 
								           taskStrHtml.push('</font><br/>'); 
								        }								        
							       }					       		
					       		taskStrHtml.push('</td>');
					       		//�Ƿ���
					       		if(o%2==1)
								{
				      				taskStrHtml.push('</tr>');
				    			}
					       	}
					       	taskStrHtml.push('</table>');
				       //��ϵͳ���Ƽ���Ϊ1��,����tableչʾ
				       }else{
				           //ѭ��������ϵͳ��������
					       for(j=0;j<details.size();j++)
						   {
						      //��ϵͳ�����������
						      detail=details[j];
						      taskStrHtml.push('&nbsp' + '<img src="' + _ROOT_PATH_ + '/images/bg/20.png" />');
						     //�����bsϵͳ
					         if(pendingtask.type==1)
					         {  
					            //�����ϵͳ�����������0��
					            if(detail.totalcount>0){
						         	taskStrHtml.push('<a href="' + detail.JobUrl + '" target="_blank"><font size=2 color = "' + detail.color + '">' + detail.status + '<' + detail.totalcount + '��></font></a>');
					         	}else{
					         		taskStrHtml.push('<a href="' + detail.JobUrl + '" target="_blank"><font size=2 color = "' + detail.color + '">' + detail.status + '</font></a>');
					         	}
	                         }
	                         //�����csϵͳ
	                         else
	                         {
	                            //�����ϵͳ�����������0��
	                         	if(detail.totalcount>0){
	                            	taskStrHtml.push(detail.status + '&nbsp;<' + detail.totalcount + '��>');
	                            }else {
					         		taskStrHtml.push('<font size=2>'+detail.status+'</font>');
					         	}
					         }
						        taskStrHtml.push('<br/>'); 
					       }
				       }
				       taskStrHtml.push('</span>');
				       taskStrHtml.push('</p>'); 
				    }
			    }
		    }//pendingtasks>0
		   //�Ѹ�ҵ��ϵͳ��Ӧ�Ĵ���������Ϣ�������Ӧ�ģɣ���
		   document.getElementById("task"+k).innerHTML = taskStrHtml.join('');
	   }
	};
	function openMsg(val){
		var ww = window.screen.width-10;
		var hh = window.screen.height - 70;
		window.dialogArguments.open(val,"","toolbar=no,location=no,directories=no,menubar=no,scrollbars=no,resizable=yes,status=no,top=0,left=0,width="+ww+",height="+hh);
		//window.dialogArguments.open(val,"_blank");
		//window.open(url,'window',"Width=700px;Height=550px;scroll=0;status=no;resizable=0;");  
	}
	/**************���������ѯ���ؽ��չʾ(�°��չʾ)wyx20120824����Ϣ�����õ�**********/
	function showPendingTaskMessageNEW(config){ 
	    //��������չʾ���󼯺�
		
	    var totallist = config;
	    for(var index = 0;index < totallist.length; index++)
	    {   
	        //ҵ��ϵͳ��������������磺ָ��ϵͳ
		    var pendingtasks=totallist[index];
		    //�����������洢�������
		    var taskStrHtml = [];
		    //���ҵ��ϵͳ��Ҫ��ʾ��������
		    if(pendingtasks.size()>0){
		       //���������ҵ��ϵͳ
			   if(pendingtasks[0].outter!=1)
			   {   
			       //���ҵ��ϵͳ�����ڴ�������
				   if(!pendingtasks[0].name)
				   {
				        //ҵ��ϵͳID
					    var k=pendingtasks[0].k;
					    //ҵ��ϵͳ����
						var menuname=pendingtasks[0].menuname;
						//ҵ��ϵͳ����
						var menuurl=pendingtasks[0].clientmodule;
						//��ʾҵ��ϵͳ����
						taskStrHtml.push('<div>');
						taskStrHtml.push('<div class="title_blue">');
						taskStrHtml.push('<a href="#" onclick="openMsg(\'' + _ROOT_PATH_+menuurl+'\')">'+ menuname + '&nbsp&nbsp&nbsp&nbsp<b style="color:#000; font-weight:normal;"></b>' + '</a>');
						taskStrHtml.push('</div>');
						taskStrHtml.push('<table width=97% border=0 cellpadding=0 cellspacing=0>');
						taskStrHtml.push('<tr>');
						taskStrHtml.push('<td colspan="2" style="vertical-align:top;" nowrap="nowrap">');
						taskStrHtml.push('<div class="content_black">&nbsp;<a href="#">��ʱû�д�������</a></div>');
						taskStrHtml.push('</td>');
						taskStrHtml.push('</tr>');
						taskStrHtml.push('</table>');
						taskStrHtml.push('</div>');
						
			       }
			       //���ҵ��ϵͳ���ڴ�������
			       else{
			           //�û�����
					   var count=0;
					   //����������������٣���С������ʾ��ĸ߶ȣ����ٿհ�
					   taskStrHtml.push('<div>');
					   //��ʾҵ��ϵͳ����
					   taskStrHtml.push('<div class="title_blue"><a  href="#" onclick="openMsg(\'' + _ROOT_PATH_+pendingtasks[0].clientmodule+'\')">'+ pendingtasks[0].menuname + '</a></div>');
					   //ҵ��ϵͳ�д�������չʾ���
					   taskStrHtml.push('<table width=97% border=0 cellpadding=0 cellspacing=0>');
					   //ѭ��ҵ��ϵͳ��ϵͳ,���磺��ָ����ء���λָ������ȵ�
				       for(i=0; i<pendingtasks.size();i++) {
				       		count++;
				       		//����ҵ��ϵͳ��ϵͳ����
							var pendingtask= pendingtasks[i];
							//ҵ��ϵͳ��ϵͳ��������������磺����ˡ�����ӡ�ȵ�
							var details = pendingtask.details;
							//��ϵͳ�����ַ
							var hostip = pendingtask.hostip;
							//��ϵͳ����˿�
							var hostport=pendingtask.hostport;
							//��ϵͳ���ط����ַ
							var localip = pendingtask.localip;
							//��ϵͳ���ط���˿�
							var localport=pendingtask.localport;
							//�û�����
							var uid=pendingtask.uid;
							//ҵ��ϵͳ�˵��ɣ�
							var k = pendingtask.k;
							//sessionID
							var sid=pendingtask.sid;
							//�������
							var year=pendingtask.year;
							//�Ƿ���
							//if(count%2==1)
							//{
			      				taskStrHtml.push('<tr width="100%">');
			    			//}
			    			//��ϵͳ��������չʾ
							taskStrHtml.push('<td colspan="2" style="vertical-align:top;" nowrap="nowrap">');
							//��ϵͳ����ǰ������ͼ��
							taskStrHtml.push('<div class="content_title">');
							taskStrHtml.push(pendingtask.name + '(��' + pendingtask.totalcount + '��)</div>');
							taskStrHtml.push('</td>');
							taskStrHtml.push('</tr>');
							//������ϵͳ����������磺����ˡ�����ӡ��
							for(j=0;j<details.size();j++)
							{ 
								//taskStrHtml.push('<tr><td colspan="2">');
								if(j%2==0){
									taskStrHtml.push('<tr>');
								}
								if(details.size()%2==1){
									if((j+1)==details.size()){
										taskStrHtml.push('<td colspan="2" nowrap="nowrap" >');
									}else{
										taskStrHtml.push('<td nowrap="nowrap">');
									}
								}else{
									taskStrHtml.push('<td nowrap="nowrap">');
								}
							    //��ϵͳ��������ǰ��ͼ��
								taskStrHtml.push('<div class="content_black">');
							    //taskStrHtml.push('&nbsp' + '<img src="' + _ROOT_PATH_ + '/images/bg/20.png" />');
							    //��ϵͳ��������������磺����ˡ�����ӡ��
							    detail=details[j];
							    //��ϵͳ�����������ӵ�ַ
							    var url="http://"+hostip+":"+hostport+detail.linkName;
							    //�滻���ӵ�ַ�еĲ������ַ�
							    url=url.replace(/&/g, "%26");
							    //���ҵ��ϵͳ�ķ����ַΪ����ʹ�õ�ǰϵͳ��Ĭ�ϵ�ַ
							    if(hostip == "" && hostport == ""){
							    	//��Щ�˵�url�к���' ҳ���ϻᱨ��
							    	var tempurl=_ROOT_PATH_+detail.linkName;
							    	if(tempurl.indexOf("'")!=-1){
							    		for(var m = 0;m <tempurl.length; m++){
							    			if(tempurl.substring(m,m+1)=="'"){
							    			tempurl=tempurl.replace("'","");
							    			}
							    		}
							    	}
							    	taskStrHtml.push('<a href="#" onclick="openMsg(\'' + tempurl + '\')">');
							       //taskStrHtml.push(detail.linkName + '\')">');
							    }  
							    //������ҵ��ϵͳ�ķ����ַ�뵱ǰ�����ַ��ͬ��ʹ�õ�ǰϵͳ��Ĭ�ϵ�ַ 
							    else if(hostip == localip && hostport == localport)
								{
							       taskStrHtml.push('<a href="#" onclick="openMsg(\'' + _ROOT_PATH_+detail.linkName + '\')">');
							       //taskStrHtml.push(detail.linkName + '\')">');
							    }
							    //������������ҵ��ϵͳ
							    else{
							       taskStrHtml.push('<div class="content_black"><a href="#" onclick="openMsg(\'http://'+hostip + ':' + hostport + '/common/pendingtasklogin.do' + '?uid=' + uid + '&sid=' + sid + '&year=' + year + '&url=' + url + '\')">');
							       //taskStrHtml.push();
							    }
							    //��ʾ���������������
							    taskStrHtml.push('&nbsp��' + detail.operattypedto.name + '&nbsp(' + detail.totalcount + '��)</a>');
				   				taskStrHtml.push('</div>'); 
				   				taskStrHtml.push('</td>');
				   				//�����޷�������ʾ����
				   				if(details.size()%2==1){
				   					if(j%2==1){
										taskStrHtml.push('</tr>');
									}
									//��ڲ���
									if((j+1)==details.size()){
										taskStrHtml.push('</tr>');
									}
				   				}else{
				   					if(j%2==1){
				   						taskStrHtml.push('</tr>');
				   					}
				   				}
				   				//taskStrHtml.push('</td></tr>');
				   				
						    } 
							
							//��ϵͳ�Ƿ���
							//if(count%2==0){
			      			    taskStrHtml.push('</tr>');
			    			//}  
					    }
						taskStrHtml.push('</table>');
						taskStrHtml.push('</div>');
				    }
			   }
			   //���Ϊ�����������
			   if(pendingtasks[0].outter==1){
				   //ѭ��ҵ��ϵͳ��ϵͳ��Ϣ
				   for(i=0; i<pendingtasks.size();i++) {
				   	  taskStrHtml.push('<div><div class="title_blue">');
				   	  //��ϵͳ�������磺��ָ����ء���λָ�����
				      pendingtask= pendingtasks[i];
				      //ҵ��ϵͳID
				      var k=pendingtask.k;
				      //��ϵͳ�������������磺����ˡ�����ӡ��
				      var details = pendingtask.details;
				      //��ϵͳ���Ƽ���
				      var name_tem = pendingtask.name_tem;
				      //ҵ��ϵͳǰ������ͼ��
				      //taskStrHtml.push('<img src="' + _ROOT_PATH_ + '/images/bg/top.gif"/>');
				      //�����bsҵ��ϵͳ
				      if(pendingtask.type==1)
					  {  
				      	taskStrHtml.push('<a href="' + pendingtask.Url + '" target="_blank">');
				      	//ҵ��ϵͳ����
				      	taskStrHtml.push(pendingtask.name + '</a>');
				      //�����csҵ��ϵͳ
				      }else{
				      	taskStrHtml.push('<a href="#">');
				      	//ҵ��ϵͳ����
				      	taskStrHtml.push(pendingtask.name + '</a>');
				      }
				      //���������������������
				      if(pendingtask.count>0){
				        taskStrHtml.push('(��' + pendingtask.count + '��)');
				       }
				       //taskStrHtml.push('<br/>'); 
				       //taskStrHtml.push('<span>');
				       taskStrHtml.push('</div>');
				       taskStrHtml.push('<div>');
				       taskStrHtml.push('<table width=97% border=0 cellpadding=0 cellspacing=0>');
				       //��ϵͳ���Ƽ���Ϊ����������table�����ҵ��ϵͳ�в�ͬ��ϵͳ�Ĵ�������
				       if(name_tem.size()>0){
					        //ѭ������ҵ��ϵͳ��ϵͳ
					       	for(o=0;o<name_tem.size();o++){
					       		//�����б��
					       		taskStrHtml.push('<tr width="100%"><td colspan="2" style="vertical-align:top;" nowrap="nowrap">');
					       	    //taskStrHtml.push('<td width="300" style="vertical-align:top;">');
					       	    //ϵͳ����ǰ��ͼ��
					       		//taskStrHtml.push('&nbsp' + '<img src="' + _ROOT_PATH_ + '/images/bg/20.png" />11111111111');
					       		//��ϵͳ����
					       		taskStrHtml.push(name_tem[o]);	       		
					       		taskStrHtml.push('</td>');
					       		//ѭ��������ϵͳ��Ӧ��������������ˡ�����ӡ��
					       		for(j=0;j<details.size();j++)
								   {
								   	  if(j%2==0){
								   	  		taskStrHtml.push('<tr>');
								   	  }
								   	  if(details.size()%2==1){
								   	  		if((j+1)==details.size()){
								   	  			taskStrHtml.push('<td colspan="2" nowrap="nowrap" >');
								   	  		}else{
								   	  			taskStrHtml.push('<td nowrap="nowrap">');
								   	  		}
								   	  }else{
								   	  		taskStrHtml.push('<td nowrap="nowrap">');
								   	  }
								   	  taskStrHtml.push('<div class="content_black">');
								      //��ϵͳ������������������ˡ�����ӡ��
								      detail=details[j];
								      //�����ϵͳ����������������0
								      if(detail.totalcount>0){
								          //�����ϵͳ��������������ж�Ӧ��ϵͳ����һ�£���Ѵ�����������Ӧ��ϵͳ������
									      if(detail.menuname == name_tem[o] ){
									         //�����bsϵͳ
									         if(pendingtask.type==1)
									         {  
									         	taskStrHtml.push('<a href="#" onclick="openMsg(\'' + detail.JobUrl + '\')">' + detail.status + '(' + detail.totalcount + '��)></a>');
					                         }
					                         //�����CSϵͳ
					                         else
					                         {
					                            taskStrHtml.push(detail.status + '&nbsp;(' + detail.totalcount + '��)');
					                         }
					                       }
								       }
								       //��������ϵͳ����������������0
								       if(detail.totalcount==0){
								           taskStrHtml.push('&nbsp' + detail.status); 
								        }
								        taskStrHtml.push('</div>'); 
								        taskStrHtml.push('</td>');
								        if(details.size()%2==1){
								        	if(j%2==1){
								        		taskStrHtml.push('</tr>');
								        	}
								        	//��ڲ���
								        	if((j+1)==details.size()){
								        		taskStrHtml.push('</tr>');
								        	}
								        }else{
								        	if(j%2==1){
								        		taskStrHtml.push('</tr>');
								        	}
								        }
							       }					       		
					       		
					       	}
					       	//taskStrHtml.push('</table>');
				       //��ϵͳ���Ƽ���Ϊ1��,����tableչʾ
				       }else{
				           //ѭ��������ϵͳ��������
					       for(j=0;j<details.size();j++)
						   {
						   	  if(j%2==0){
						   	  		taskStrHtml.push('<tr>');
						   	  }	
						   	  if(details.size()%2==1){
						   	  		if((j+1)==details.size()){
						   	  			taskStrHtml.push('<td colspan="2" nowrap="nowrap" >');
						   	  		}else{
						   	  			taskStrHtml.push('<td nowrap="nowrap">');
						   	  		
						   	  		}
						   	  }else{
						   	  		taskStrHtml.push('<td nowrap="nowrap">');
						   	  }
						   	  taskStrHtml.push('<div class="content_black">');
						      //��ϵͳ�����������
						      detail=details[j];
						      //taskStrHtml.push('&nbsp' + '<img src="' + _ROOT_PATH_ + '/images/bg/20.png" />');
						     //�����bsϵͳ
					         if(pendingtask.type==1)
					         {  
					            //�����ϵͳ�����������0��
					            if(detail.totalcount>0){
						         	taskStrHtml.push('<a href="#" onclick="openMsg(\'' + detail.JobUrl + '\')">' + detail.status + '(' + detail.totalcount + '��)</a>');
					         	}else{
					         		taskStrHtml.push('<a href="#" onclick="openMsg(\'' + detail.JobUrl + '\')">' + detail.status + '</a>');
					         	}
	                         }
	                         //�����csϵͳ
	                         else
	                         {
	                            //�����ϵͳ�����������0��
	                         	if(detail.totalcount>0){
	                            	taskStrHtml.push(detail.status + '&nbsp;(' + detail.totalcount + '��)');
	                            }else {
					         		taskStrHtml.push(detail.status);
					         	}
					         }
					         taskStrHtml.push('</div>');
					         taskStrHtml.push('</td>');
						     //�����޷�������ʾ����
					         if(details.size()%2==1){
					         		if(j%2==1){
					         			taskStrHtml.push('</tr>');
					         		}
					         		//��ڲ���
					         		if((j+1)==details.size()){
					         			taskStrHtml.push('</tr>');
					         		}
					         	
					         }else{
					         	if(j%2==1){
					         		taskStrHtml.push('</tr>');
					         	}
					         }
					       }
					       
				       }
				       taskStrHtml.push('</table');
				       taskStrHtml.push('</div>');
				       taskStrHtml.push('</div>'); 
				    }
				     
			    }
		    }//pendingtasks>0
		   //�Ѹ�ҵ��ϵͳ��Ӧ�Ĵ���������Ϣ�������Ӧ�ģɣ���
		   //alert(k+'========'+taskStrHtml.join(''));
		   document.getElementById("task"+k).innerHTML = taskStrHtml.join('');
		   //document.getElementById(k).innerHTML = taskStrHtml.join('');
		   
	   }//for
	   var aa = document.getElementById("task"+k).innerHTML ;
	}

	
