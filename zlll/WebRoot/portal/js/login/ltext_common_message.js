//设置js路径对象
// 定义Portal命名空间
if (Ext.lt.portal == null) {
	//Ext.lt.portal = {};
	Ext.lt.portal = {component:{}};
}
if (Ext.lt.portal.component == null) {
	Ext.lt.portal.component = {};
}

//------------------（消息）--------------------------------------------------
Ext.lt.portal.component.advices = function () {
	this.messages;
	this.tempPage=1;//消息记录当前页数
	this.allpages=1;//消息记录总页数
	this.para= {};//保存页面查询条件
	//鼠标放在某一列上,就会有tip
	Ext.QuickTips.init();
	//return '<div ext:qtitle="" ext:qtip="' + value + '">'+ value +'</div>';      
  	var data ={}; 
  	//checkbox多选框的对象
	var sm = new Ext.grid.CheckboxSelectionModel({checkOnly:true});
	var cm = new Ext.grid.ColumnModel([
										new Ext.grid.RowNumberer(),
		                   				sm,
		                   				{header:'标示',dataIndex:'itemid',hidden:true,menuDisabled:true},
		                   				{header:'消息内容',dataIndex:'content',width:315,sortable:true,menuDisabled:true,renderer:function(val,cellmeta,record,rowIndex,columnIndex,stroe){
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
		                   				{header:'发送人',dataIndex:'senduser',width:80,sortable:true,menuDisabled:true,renderer:function(value){
		                   					return '<div ext:qtitle="" ext:qtip="' + value + '">'+ value +'</div>';      
		                   				}},
		                   				{header:'发送时间',dataIndex:'createtime',width:150,sortable:true,menuDisabled:true,renderer:function(value){
		                   					return '<div ext:qtitle="" ext:qtip="' + value + '">'+ value +'</div>';      
		                   				}},
		                   				{header:'消息类型',dataIndex:'type',hidden:true,menuDisabled:true},
		                   				{header:'数据来源',dataIndex:'source',hidden:true,menuDisabled:true},
		                   				{header:'操作',dataIndex:'linkname',width:70,menuDisabled:true,renderer:function(val){
		                   					if(val==""||val==null){
		                   						return "<a href='#'  ><font color=grey>标记已读</font></a>";
		                   					}else{
		                   						return "<a href='#'  ><font color=red>查看</font></a>";
		                   					}
		                   				}},
		                   				{header:'后续标志',dataIndex:'followup',width:65,sortable:true,menuDisabled:true,renderer:function(val){
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
	            //修改消息记录表中的状态，置为已读
			   	var newtitle=Ext.getCmp('msgtId').title;
			   	var readedtitle=Ext.getCmp('donetaskId').title;
	            var start=newtitle.indexOf("(");
	            var end=newtitle.indexOf(")");
	            newtitle=newtitle.substring(start+1,end-1);
	            var newmsgcount=parseInt(newtitle)-1;
				Ext.getCmp('msgtId').setTitle('未读消息('+newmsgcount+"条)");
			    start=readedtitle.indexOf("(");
	            end=readedtitle.indexOf(")");
				readedtitle=readedtitle.substring(start+1,end-1);
				newmsgcount=parseInt(readedtitle)+1;
	            Ext.getCmp('donetaskId').setTitle('已读消息('+newmsgcount+"条)");
	            var itemid = cell[0].get('itemid')+"";
	            var source = cell[0].get('source')+"";
	            grid.getStore().remove(grid.getStore().getAt(rowIndex));//删除行
	            grid.doLayout();
	            var para=[itemid,source];
	            Ext.lt.RCP.server('rightnowmessage', "updatestatus", para, function (resp) {	//更改已读未读
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
	                Ext.getCmp('followuptaskId').setTitle('后续处理('+newfollowcount+"条)");
					var para={};
					para.itemid=itemid;
					para.followup=followup;
					Ext.lt.RCP.server('rightnowmessage', "followup", para, function (resp) {	//更改后续处理
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
	                Ext.getCmp('followuptaskId').setTitle('后续处理('+newfollowcount+"条)");
					var para={};
					para.itemid=itemid;
					para.followup=followup;
					Ext.lt.RCP.server('rightnowmessage', "followup", para, function (resp) {	//更改后续处理
		            });
				}
			}
		}
	});
	//-----------------------------已读grid---------------------------------
	var donedata ={}; 
  	//checkbox多选框的对象
	var donesm = new Ext.grid.CheckboxSelectionModel({checkOnly:true});
	var donecm = new Ext.grid.ColumnModel([
										new Ext.grid.RowNumberer(),
		                   				donesm,
		                   				{header:'标示',dataIndex:'itemid',hidden:true,menuDisabled:true},
		                   				{header:'消息内容',dataIndex:'content',width:315,sortable:true,menuDisabled:true,renderer:function(val,cellmeta,record,rowIndex,columnIndex,stroe){
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
		                   				{header:'发送人',dataIndex:'senduser',width:80,sortable:true,menuDisabled:true,renderer:function(value){
		                   					return '<div ext:qtitle="" ext:qtip="' + value + '">'+ value +'</div>';      
		                   				}},
		                   				{header:'发送时间',dataIndex:'createtime',width:150,sortable:true,menuDisabled:true,renderer:function(value){
		                   					return '<div ext:qtitle="" ext:qtip="' + value + '">'+ value +'</div>';      
		                   				}},
		                   				{header:'消息类型',dataIndex:'type',hidden:true,menuDisabled:true},
		                   				{header:'数据来源',dataIndex:'source',hidden:true,menuDisabled:true},
		                   				{header:'操作',dataIndex:'linkname',width:50,menuDisabled:true,renderer:function(val){
		                   					if(val==""||val==null){
		                   						return "<font color=grey>查看</font>";
		                   					}else{
		                   						return "<a href='#' ><font color=red>查看</font></a>";
		                   					}
		                   				}},
	                   					{header:'后续标志',dataIndex:'followup',width:65,sortable:true,menuDisabled:true,renderer:function(val){
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
                Ext.getCmp('followuptaskId').setTitle('后续处理('+newfollowcount+"条)");
		   	    cell[0].set('followup',followup);       
                cell[0].commit();
				var para={};
				para.itemid=itemid;
				para.followup=followup;
				Ext.lt.RCP.server('rightnowmessage', "followup", para, function (resp) {	//更改后续处理
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
	                Ext.getCmp('followuptaskId').setTitle('后续处理('+newfollowcount+"条)");
			   	    cell[0].set('followup',followup);       
	                cell[0].commit();
					var para={};
					para.itemid=itemid;
					para.followup=followup;
					Ext.lt.RCP.server('rightnowmessage', "followup", para, function (resp) {	//更改后续处理
		            });
				}
			}
		}
	});
	//----------------后续处理grid---------------------------------------------
	var followupdata ={}; 
  	//checkbox多选框的对象
	var followupsm = new Ext.grid.CheckboxSelectionModel({checkOnly:true});
	var followupcm = new Ext.grid.ColumnModel([
										new Ext.grid.RowNumberer(),
		                   				followupsm,
		                   				{header:'标示',dataIndex:'itemid',hidden:true,menuDisabled:true},
		                   				{header:'消息内容',dataIndex:'content',width:315,sortable:true,menuDisabled:true,renderer:function(val,cellmeta,record,rowIndex,columnIndex,stroe){		                   					if(val==0){
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
		                   				{header:'发送人',dataIndex:'senduser',width:80,sortable:true,menuDisabled:true,renderer:function(value){
		                   					return '<div ext:qtitle="" ext:qtip="' + value + '">'+ value +'</div>';      
		                   				}},
		                   				{header:'发送时间',dataIndex:'createtime',width:150,sortable:true,menuDisabled:true,renderer:function(value){
		                   					return '<div ext:qtitle="" ext:qtip="' + value + '">'+ value +'</div>';      
		                   				}},
		                   				{header:'消息类型',dataIndex:'type',hidden:true,menuDisabled:true},
		                   				{header:'数据来源',dataIndex:'source',hidden:true,menuDisabled:true},
		                   				{header:'操作',dataIndex:'linkname',width:50,menuDisabled:true,renderer:function(val){
		                   					if(val==""||val==null){
		                   						return "<font color=grey>查看</font>";
		                   					}else{
		                   						return "<a href='#'  ><font color=red>查看</font></a>";
		                   					}
		                   				}},
	                   					{header:'后续标志',dataIndex:'followup',width:65,sortable:true,menuDisabled:true,renderer:function(val){
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
			    var	tempname = content.substr(0,1);//0为处理；1已处理
			    if(tempname==0){
			    	var newtitle=Ext.getCmp('msgtId').title;
				   	var readedtitle=Ext.getCmp('donetaskId').title;
		            var start=newtitle.indexOf("(");
		            var end=newtitle.indexOf(")");
		            newtitle=newtitle.substring(start+1,end-1);
		            var newmsgcount=parseInt(newtitle)-1;
					Ext.getCmp('msgtId').setTitle('未读消息('+newmsgcount+"条)");
				    start=readedtitle.indexOf("(");
		            end=readedtitle.indexOf(")");
					readedtitle=readedtitle.substring(start+1,end-1);
					newmsgcount=parseInt(readedtitle)+1;
		            Ext.getCmp('donetaskId').setTitle('已读消息('+newmsgcount+"条)");
			    	content = "1"+content.substring(1);
			    	cell[0].set('content',content);       
			    	cell[0].commit();
			    	var itemid = cell[0].get('itemid')+"";
			    	var source = cell[0].get('source')+"";
			    	//修改消息记录表中的状态，置为已读
			    	var para=[itemid,source];
			    	Ext.lt.RCP.server('rightnowmessage', "updatestatus", para, function (resp) {	//更改为已读
			    		if(linkname!=""&&linkname!=null){
			    			openMsg(linkname);
			    		}
			    	});
			    }else{
			    	if(linkname!=""&&linkname!=null){
			    		openMsg(linkname);
			    	}
			    }
	            //grid.getStore().remove(grid.getStore().getAt(rowIndex));//删除行
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
					Ext.lt.RCP.server('rightnowmessage', "followup", para, function (resp) {	//更改后续处理
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
					Ext.lt.RCP.server('rightnowmessage', "followup", para, function (resp) {	//更改后续处理
		            });
				}
			}
		}
	});
	//--------------------------------------------------------------------------
	this.draw = function(el){
		Ext.lt.portal.component.advices.para= {};//清除保存的查询条件
		//消息记录存储数组对象
		var msgHtml = ['<div id="msgdiv" style="height:360px;width:680px ;overflow-y:hidden;">'
					   ,'</div><div id="" style="text-align:center;height:30px;background-color:#D3E9FF;">'
					   ,'<table><tr><td><img src="/images/actions/first.gif" onclick="advice.findMessageForPage(\'first\')"></img>'
					  ,' <img src="/images/actions/pre.gif" onclick="advice.findMessageForPage(\'pre\')"></img>'
					   ,'<img src="/images/actions/next.gif" onclick="advice.findMessageForPage(\'next\')"></img>'
						,'<img src="/images/actions/end.gif" onclick="advice.findMessageForPage(\'last\')"></img>'
					   ,'</td><td>&nbsp当前第</td><td id="msgpageflag"></td><td id="msgallpageflag"></td>'
					   ,'</tr></table></div>'
					  ];
		var doneHtml = ['<div id="donemsgdiv" style="vertical-align:middle;height:360px;width:650px; overflow-y:hidden;">'
					   ,'</div><div id="" style="text-align:center;height:30px;background-color:#D3E9FF;">'
					   ,'<table><tr><td><img src="/images/actions/first.gif" onclick="advice.finddoneMessageForPage(\'first\')"></img>'
					  ,' <img src="/images/actions/pre.gif" onclick="advice.finddoneMessageForPage(\'pre\')"></img>'
					   ,'<img src="/images/actions/next.gif" onclick="advice.finddoneMessageForPage(\'next\')"></img>'
						,'<img src="/images/actions/end.gif" onclick="advice.finddoneMessageForPage(\'last\')"></img>'
					   ,'</td><td>&nbsp当前第</td><td id="donemsgpageflag"></td><td id="donemsgallpageflag"></td>'
					    ,'</tr></table></div>'
					  ];
	  	var followupHtml = ['<div id="followupmsgdiv" style="vertical-align:middle;height:360px;width:650px; overflow-y:hidden;">'
					   ,'</div><div id="" style="text-align:center;height:30px;background-color:#D3E9FF;">'
					   ,'<table><tr><td><img src="/images/actions/first.gif" onclick="advice.findfollowupMessageForPage(\'first\')"></img>'
					  ,' <img src="/images/actions/pre.gif" onclick="advice.findfollowupMessageForPage(\'pre\')"></img>'
					   ,'<img src="/images/actions/next.gif" onclick="advice.findfollowupMessageForPage(\'next\')"></img>'
						,'<img src="/images/actions/end.gif" onclick="advice.findfollowupMessageForPage(\'last\')"></img>'
					   ,'</td><td>&nbsp当前第</td><td id="followupmsgpageflag"></td><td id="followupmsgallpageflag"></td>'
					    ,'</tr></table></div>'
					  ];			  
		var msgPanel = new Ext.Panel({
			id:"msgtId", 
			title:"未读消息",
			border:false,
			layout:'fit',
			//height:450,
			bodyStyle:'border-width:0px',
			width:680,
			autoHeight:true,
			//buttonAlign:'right',
			html:msgHtml.join(''),
			tbar:new Ext.Toolbar(['查询内容：',{xtype:'textfield',id:'messageMenuName',width:90},'-',
			                                 '发送时间：',{xtype:'datefield',fieldLabel:'',width:95,id:'messagestarttime',format:'Y-m-d',anchor:'', editable:false},'至',
											 {xtype:'datefield',fieldLabel:'',width:95,id:'messageendtime',format:'Y-m-d',anchor:'', editable:false},'-',
											 {text:'',icon:'/images/done_btn/clear_qry2.gif',handler:function(){
										     		Ext.getCmp('messageMenuName').setValue();
										     		Ext.getCmp('messagestarttime').setValue();
										     		Ext.getCmp('messageendtime').setValue();
											 }},'-',
										     {text:'查  询',width:50,icon:'/images/done_btn/find.gif',handler:function(){
										     		var a = Ext.getCmp('messageMenuName').getValue();
										     		var b = Ext.getCmp('messagestarttime').value;
										     		var c = Ext.getCmp('messageendtime').value;
										     		if(c!=""&&b!=""&&c!=undefined&&b!=undefined){
										     			if(b>c){
										     				alert("开始时间大于结束时间");
										     				return
										     			}
										     		}
										     		//在页面保存查询条件
												    Ext.lt.portal.component.advices.para.menuname=a;
												    Ext.lt.portal.component.advices.para.start=b;
												    Ext.lt.portal.component.advices.para.end=c;
										    		Ext.lt.portal.component.advices.tempPage=1;
					                              	advice.showadvice("msgdiv",1);
											 }},'-',
					                         {text:'删除',width:50,icon:'/images/done_btn/del.gif',handler:function(){
					                           		var rows = messageGrid.getSelectionModel().getSelections();
													if(rows.length<1){
														alert("请选择要删除的消息记录！")
														return;
													}
													if(confirm("确认删除消息记录吗？")){
														var ids ="";
														for(var i =0;i<rows.length;i++){
															ids+="'"+rows[i].get("itemid")+"',";
														}
														//调用后台删除方法
					                              		Ext.lt.RCP.server('rightnowmessage', "delMsgRecord",  ids, function (resp) {
					                              			//删除消息记录后重新进行查询显示
					                               			Ext.lt.portal.component.advices.tempPage=1;
					                              			advice.showadvice("msgdiv",1);
					                             		});
													}
					                         }}
				                ])	
		});
		
		var donePanel = new Ext.Panel({
			id:"donetaskId", 
			title:"已读消息",
			border:false,
			//height:450,
			width:680,
			autoHeight:true,
			bodyStyle:'border-width:0px',
			html:doneHtml.join(''),
			tbar:new Ext.Toolbar(['查询内容：',{xtype:'textfield',id:'messageName',width:90},'-',
			                                 '发送时间：',{xtype:'datefield',fieldLabel:'',width:95,id:'msgstarttime',format:'Y-m-d',anchor:'', editable:false},'至',
											 {xtype:'datefield',fieldLabel:'',width:95,id:'msgendtime',format:'Y-m-d',anchor:'', editable:false},'-',
											 {text:'',icon:'/images/done_btn/clear_qry2.gif',handler:function(){
										     		Ext.getCmp('messageName').setValue();
										     		Ext.getCmp('msgstarttime').setValue();
										     		Ext.getCmp('msgendtime').setValue();
											 }},'-',
										     {text:'查  询',width:50,icon:'/images/done_btn/find.gif',handler:function(){
										     		var a = Ext.getCmp('messageName').getValue();
										     		var b = Ext.getCmp('msgstarttime').value;
										     		var c = Ext.getCmp('msgendtime').value;
										     		if(c!=""&&b!=""&&c!=undefined&&b!=undefined){
										     			if(b>c){
										     				alert("开始时间大于结束时间");
										     				return
										     			}
										     		}
										     		//在页面保存查询条件
												    Ext.lt.portal.component.advices.para.menuname=a;
												    Ext.lt.portal.component.advices.para.start=b;
												    Ext.lt.portal.component.advices.para.end=c;
										    		Ext.lt.portal.component.advices.tempPage=1;
					                              	advice.showdoneadvice("donemsgdiv",1);
											 }},'-',
					                         {text:'删除',width:50,icon:'/images/done_btn/del.gif',handler:function(){
					                           		var rows = donemessageGrid.getSelectionModel().getSelections();
													if(rows.length<1){
														alert("请选择要删除的消息记录！")
														return;
													}
													if(confirm("确认删除消息记录吗？")){
														var ids ="";
														for(var i =0;i<rows.length;i++){
															ids+="'"+rows[i].get("itemid")+"',";
														}
														//调用后台删除方法
					                              		Ext.lt.RCP.server('rightnowmessage', "delMsgRecord",  ids, function (resp) {
					                              			//删除消息记录后重新进行查询显示
					                               			Ext.lt.portal.component.advices.tempPage=1;
					                              			advice.showdoneadvice("donemsgdiv",1);
					                             		});
													}
					                         }}
				                ])	
		});
		var followupPanel = new Ext.Panel({
			id:"followuptaskId", 
			title:"后续处理",
			border:false,
			//height:450,
			width:680,
			autoHeight:true,
			bodyStyle:'border-width:0px',
			html:followupHtml.join(''),
			tbar:new Ext.Toolbar(['查询内容：',{xtype:'textfield',id:'followupmessageName',width:90},'-',
			                                 '发送时间：',{xtype:'datefield',fieldLabel:'',width:95,id:'followupstarttime',format:'Y-m-d',anchor:'', editable:false},'至',
											 {xtype:'datefield',fieldLabel:'',width:95,id:'followupendtime',format:'Y-m-d',anchor:'', editable:false},'-',
											 {text:'',icon:'/images/done_btn/clear_qry2.gif',handler:function(){
										     		Ext.getCmp('followupmessageName').setValue();
										     		Ext.getCmp('followupstarttime').setValue();
										     		Ext.getCmp('followupendtime').setValue();
											 }},'-', 
										     {text:'查  询',width:50,icon:'/images/done_btn/find.gif',handler:function(){
										     		var a = Ext.getCmp('followupmessageName').getValue();
										     		var b = Ext.getCmp('followupstarttime').value;
										     		var c = Ext.getCmp('followupendtime').value;
										     		if(c!=""&&b!=""&&c!=undefined&&b!=undefined){
										     			if(b>c){
										     				alert("开始时间大于结束时间");
										     				return
										     			}
										     		}
										     		//在页面保存查询条件
												    Ext.lt.portal.component.advices.para.menuname=a;
												    Ext.lt.portal.component.advices.para.start=b;
												    Ext.lt.portal.component.advices.para.end=c;
										    		Ext.lt.portal.component.advices.tempPage=1;
					                              	advice.showfollowupadvice("followupmsgdiv",1);
											 }},'-',
					                         {text:'删除',width:50,icon:'/images/done_btn/del.gif',handler:function(){
					                           		var rows = followupmessageGrid.getSelectionModel().getSelections();
													if(rows.length<1){
														alert("请选择要删除的消息记录！")
														return;
													}
													if(confirm("确认删除消息记录吗？")){
														var ids ="";
														for(var i =0;i<rows.length;i++){
															ids+="'"+rows[i].get("itemid")+"',";
														}
														//调用后台删除方法
					                              		Ext.lt.RCP.server('rightnowmessage', "delMsgRecord",  ids, function (resp) {
					                              			//删除消息记录后重新进行查询显示
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
	  	window.setTimeout(function(){tbpanel.setActiveTab(0)}, 5);//定时调用
	}
	//点击首页尾页上页下页进行分页查询
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
		 	Ext.lt.portal.component.advices.tempPage=page;//更改当前页索引
		 	document.getElementById("msgpageflag").innerHTML=Ext.lt.portal.component.advices.tempPage;
		 	document.getElementById("msgallpageflag").innerHTML="/"+Ext.lt.portal.component.advices.allpages+"页";
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
		 	Ext.lt.portal.component.advices.tempPage=page;//更改当前页索引
		 	document.getElementById("donemsgpageflag").innerHTML=Ext.lt.portal.component.advices.tempPage;
		 	document.getElementById("donemsgallpageflag").innerHTML="/"+Ext.lt.portal.component.advices.allpages+"页";
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
		 	Ext.lt.portal.component.advices.tempPage=page;//更改当前页索引
		 	document.getElementById("followupmsgpageflag").innerHTML=Ext.lt.portal.component.advices.tempPage;
		 	document.getElementById("followupmsgallpageflag").innerHTML="/"+Ext.lt.portal.component.advices.allpages+"页";
		 	advice.showfollowupadvice("followupmsgdiv",page);
		}
	}
	//查询未读消息
	this.showadvice =function(id,index){
		Ext.lt.portal.component.advices.para.index=index;
		var msgHTML = [];
		//加载消息记录数据
		Ext.lt.RCP.server('rightnowmessage', "getMsgRecord",  Ext.lt.portal.component.advices.para, function (resp) {
			if(Ext.lt.portal.component.advices.haswarned==undefined){
				if(resp.warnMsg!=""){
					alert(resp.warnMsg);
					Ext.lt.portal.component.advices.haswarned=1;//标志已经提醒过
				}
			}	
			var remind=pWin.document.getElementById('remind');
			if(remind!=null){
				remind.firstChild.className=resp.totalmsgs>0?'havemsg':'lock';
			}
			window.returnValue = resp.totalmsgs;
			Ext.getCmp('msgtId').setTitle('未读消息('+resp.totalmsgs+"条)");
			Ext.getCmp('donetaskId').setTitle('已读消息('+resp.hasreadcount+"条)");
			Ext.getCmp('followuptaskId').setTitle('后续处理('+resp.followcount+"条)");
			document.getElementById("messagecount").innerHTML='('+resp.messagecount+')';//在个人消息菜单后添加条数
			//把消息记录的表格渲染到div中
			messageGrid.render(id);
			msgstore.loadData(resp);
			messageGrid.doLayout();
			if(resp.result>0){
				Ext.lt.portal.component.advices.allpages=resp.result;//消息记录总页数
			}else{
				Ext.lt.portal.component.advices.allpages=1;//消息记录总页数
			}
			document.getElementById("msgpageflag").innerHTML=Ext.lt.portal.component.advices.tempPage;
			document.getElementById("msgallpageflag").innerHTML="/"+Ext.lt.portal.component.advices.allpages+"页";
		});
	}
	//查询已读消息
	this.showdoneadvice =function(id,index){
		Ext.lt.portal.component.advices.para.index=index;
		var msgHTML = [];
		//加载消息记录数据
		Ext.lt.RCP.server('rightnowmessage', "getHaveReadRecord",  Ext.lt.portal.component.advices.para, function (resp) {
			Ext.getCmp('donetaskId').setTitle('已读消息('+resp.totalmsgs+"条)");
			Ext.getCmp('msgtId').setTitle('未读消息('+resp.newcount+"条)");
			Ext.getCmp('followuptaskId').setTitle('后续处理('+resp.followcount+"条)");
			document.getElementById("messagecount").innerHTML='('+resp.messagecount+')';//在个人消息菜单后添加条数
			//把消息记录的表格渲染到div中
			donemessageGrid.render(id);
			donemsgstore.loadData(resp);
			donemessageGrid.doLayout();
			if(resp.result>0){
				Ext.lt.portal.component.advices.allpages=resp.result;//消息记录总页数
			}else{
				Ext.lt.portal.component.advices.allpages=1;//消息记录总页数
			}
			document.getElementById("donemsgpageflag").innerHTML=Ext.lt.portal.component.advices.tempPage;
			document.getElementById("donemsgallpageflag").innerHTML="/"+Ext.lt.portal.component.advices.allpages+"页";
		});
	}
	//查询后续处理消息
	this.showfollowupadvice =function(id,index){
		Ext.lt.portal.component.advices.para.index=index;
		var msgHTML = [];
		//加载消息记录数据
		Ext.lt.RCP.server('rightnowmessage', "getfollowupRecord",  Ext.lt.portal.component.advices.para, function (resp) {
			Ext.getCmp('followuptaskId').setTitle('后续处理('+resp.totalmsgs+"条)");
			Ext.getCmp('donetaskId').setTitle('已读消息('+resp.hasreadcount+"条)");
			Ext.getCmp('msgtId').setTitle('未读消息('+resp.newcount+"条)");
			document.getElementById("messagecount").innerHTML='('+resp.messagecount+')';//在个人消息菜单后添加条数
			//把消息记录的表格渲染到div中
			followupmessageGrid.render(id);
			followupmsgstore.loadData(resp);
			followupmessageGrid.doLayout();
			if(resp.result>0){
				Ext.lt.portal.component.advices.allpages=resp.result;//消息记录总页数
			}else{
				Ext.lt.portal.component.advices.allpages=1;//消息记录总页数
			}
			document.getElementById("followupmsgpageflag").innerHTML=Ext.lt.portal.component.advices.tempPage;
			document.getElementById("followupmsgallpageflag").innerHTML="/"+Ext.lt.portal.component.advices.allpages+"页";
		});
	}

}
//----------------个人设置--------------------------------------------------------------------------------------	
	function setUp(id){
	   var ieHeight = 200;//弹出窗口高度
	   var ver;//浏览器版本 
	   var bType;//浏览器类型 
	   var vNumber;//版本号 
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
//----------------待办事项展示--------------------------------------------------------------------------------------	
	function showtask(id){
	    document.getElementById("personalmsgmenu").className='userinfo';
		document.getElementById("personalmsgmenu").onmouseout=function onmouseout(){ this.className="userinfo"};
		document.getElementById("waittaskmenu").className='todo_over';
		document.getElementById("waittaskmenu").onmouseout='';
		document.getElementById("setupmenu").className='userinfoset';
		var str;
		var pdtPara = {};
		//查询待办时需要参数如菜单id、名称。。
		     Ext.lt.RCP.server('defaultCommonService', "getMainMenuService",  pdtPara, function (resp) {
		     	str = pendingTaskShowAfterInLogo(resp);
		     	if(str==""){
		     		document.getElementById(id).innerHTML = "<font size=3 color=red>无待办事项</font>";
				}else{
					document.getElementById(id).innerHTML = str;
				}
	          });
	}
	//在窗口中展示待办事项
	function pendingTaskShowAfterInLogo(config){
	    var pendingTaskHtml = [];
		pendingTaskHtml.push('    	     <span id="middle_inner">');
		pendingTaskHtml.push('		         <table width=660px border=0 cellpadding=0 cellspacing=0>');
        //菜单ID
		var menuid = "";
		//业务系统地址
		var hosturl = "";
	    //链接地址
		var clientmodules = "";
		//菜单编码
		var meunname = "";
		//业务系统类型
		var type = "";
		//用户编码
		var uid = config.userCode;
		//sessionID 
		var sid = config.session;
		//财政年度
		var year = config.year;	
		//计算业务系统数目
		var count = 0;
		//循环遍历子系统信息
		config.totalmenus = config.totalmenus.toArray();
		for (var i = 0; i < config.totalmenus.length; i ++){
	        //菜单对象 
	        var menu = config.totalmenus[i]
	        //如果是生长业务系统
	        if (menu.menuid){
	        	//菜单链接
				clientmodules += menu.clientmodule + ";";
	            //菜单编码
				menuid += menu.menuid + ";";
				//业务系统地址
				hosturl += "0" + ";";
				//菜单名称
				meunname += menu.name + ";";
				//业务系统类型：一体化不同不无业务系统接入及一体化本身业务系统类型
				type += 4 + ";";
				count=count+1;
				//绘制业务系统展示区域，一个业务系统占用一个表格的一行
				pendingTaskHtml.push('<tr>');
				pendingTaskHtml.push('    <td>');
				pendingTaskHtml.push('        <div  id=task' + menu.menuid + '>');
				pendingTaskHtml.push('        </div>');
				pendingTaskHtml.push('    </td>');
				pendingTaskHtml.push('</tr>');    
	        //如果是接入业务系统
	        }else {
	            //如果接入业务系统需要展示待办事项
				if (menu.haspendingtask) {
				//alert(menu.haspendingtask);
					//菜单链接
					clientmodules +="null;";
				    //业务系统编码
					menuid += menu.code + ";";
					//业务系统地址
					hosturl += menu.hosturl + ";";
					//业务系统名称
					meunname += menu.name + ";";
					//业务系统类型
					type += menu.tjhqprogram + ";";
					count=count+1;
					//绘制业务系统展示区域，一个业务系统占用一个表格的一行
					pendingTaskHtml.push('<tr>');
					pendingTaskHtml.push('    <td>');
					pendingTaskHtml.push('        <div id=task' + menu.code + '>');
					pendingTaskHtml.push('        </div>');
					pendingTaskHtml.push('    </td>');
					pendingTaskHtml.push('</tr>');    
				}
	        }
	        //组装待办事项查询参数，每五个一组往服务端发送
	        if (count == 5 || i == config.totalmenus.length - 1){
		        var pdtPara = {};
		        //菜单编码
		        pdtPara.menuid = menuid;
		        //系统链接
		        pdtPara.clientmodules = clientmodules;
		        //业务系统地址
		        pdtPara.hosturl = hosturl;
		        //业务系统名称
		        pdtPara.meunname = meunname;
		        //业务系统类型
		        pdtPara.type = type;
		        //用户编码
		        pdtPara.uid = uid;
		        //sessionID
		        pdtPara.sid = sid;
		        //财政年度
		        pdtPara.year = year;
	            //查询待办事项信息
                Ext.lt.RCP.server('defaultCommonService', "getPendingTask",  pdtPara, function (resp) {
                    //待办事项查询返回结果展示
                	if(config.portalisshownewpendingtask==0){
                		showPendingTaskMessageNEW(resp);
                	}else{
                		showPendingTaskInLogo(resp);
                	}
                    
                });
                //清空各对象信息
				//业务系统编码
				menuid = "";
				//业务系统地址
				hosturl = "";
				//业务系统名称
				meunname = "";
				//业务系统类型
				type = "";
				count = 0;
				clientmodules="";
	        }
		}
		pendingTaskHtml.push('		         </table>');
		pendingTaskHtml.push('           </span>');
	    return pendingTaskHtml.join('');
	};
	/**************待办事项查询返回结果展示**********/
	function showPendingTaskInLogo(config){
	    //待办事项展示对象集合
	    var totallist = config;
	    for(var index = 0;index < totallist.length; index++)
	    {   
	        //业务系统待办事项对象，例如：指标系统
		    var pendingtasks=totallist[index];
		    //定义待办事项存储数组对象
		    var taskStrHtml = [];
		    //如果业务系统需要显示待办事项
		    if(pendingtasks.size()>0){
		       //如果是生长业务系统
			   if(pendingtasks[0].outter!=1)
			   {   
			       //如果业务系统不存在待办事项
				   if(!pendingtasks[0].name)
				   {
				        //业务系统ID
					    var k=pendingtasks[0].k;
					    //业务系统名称
						var menuname=pendingtasks[0].menuname;
						//显示业务系统名称
						//taskStrHtml.push('<p style="border: #000000 1px dotted;margin-right: 20px;margin-top: 10px;margin-bottom: 10px;color: #000000;display:block; overflow:auto;">');
						/*taskStrHtml.push('<p >');
						taskStrHtml.push('<a class=inner_title >' + menuname + '&nbsp&nbsp&nbsp&nbsp<b style="color:#000; font-weight:normal;"></b>' + '</a>');
						taskStrHtml.push('</p>');
						*/
			       }
			       //如果业务系统存在待办事项
			       else{
			           //用户换行
					   var count=0;
					   //显示业务系统名称
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
					   //业务系统中待办事项展示表格
					   taskStrHtml.push('<table width=97% border=0 cellpadding=0 cellspacing=0>');
					   //循环业务系统子系统,例如：总指标加载、单位指标调剂等等
				       for(i=0; i<pendingtasks.size();i++) {
				       		count++;
				       		//具体业务系统子系统对象
							var pendingtask= pendingtasks[i];
							//业务系统子系统待办事项对象，例如：待审核、待打印等等
							var details = pendingtask.details;
							//子系统服务地址
							var hostip = pendingtask.hostip;
							//子系统服务端口
							var hostport=pendingtask.hostport;
							//子系统本地服务地址
							var localip = pendingtask.localip;
							//子系统本地服务端口
							var localport=pendingtask.localport;
							//用户编码
							var uid=pendingtask.uid;
							//业务系统菜单ＩＤ
							var k = pendingtask.k;
							//sessionID
							var sid=pendingtask.sid;
							//财政年度
							var year=pendingtask.year;
							//是否换行
							if(count%2==1)
							{
			      				taskStrHtml.push('<tr>');
			    			}
			    			//子系统待办事项展示
							taskStrHtml.push('<td width="45%" style="vertical-align:top;">' + '<span>');
							//子系统名称前的闪动图标
							taskStrHtml.push('<img src="' + _ROOT_PATH_ + '/images/bg/top.gif"/><font size=2>');
							taskStrHtml.push(pendingtask.name + '----->共' + pendingtask.totalcount + '条</font><br/>');
							//遍历子系统待办事项，例如：待审核、待打印等
							for(j=0;j<details.size();j++)
							{
							    //子系统待办事项前边图标
							    taskStrHtml.push('&nbsp' + '<img src="' + _ROOT_PATH_ + '/images/bg/20.png" />');
							    //子系统待办事项对象，例如：待审核、待打印等
							    detail=details[j];
							    //子系统待办事项链接地址
							    var url="http://"+hostip+":"+hostport+detail.linkName;
							    //替换链接地址中的不规则字符
							    url=url.replace(/&/g, "%26");
							    //如果业务系统的服务地址为空则使用当前系统的默认地址
							    if(hostip == "" && hostport == ""){
							    	//有些菜单url中含有' 页面上会报错
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
							    //如果如果业务系统的服务地址与当前服务地址相同则使用当前系统的默认地址 
							    else if(hostip == localip && hostport == localport)
								{
							       taskStrHtml.push('<a href="#" onclick="openMsg(\'' + _ROOT_PATH_+detail.linkName + '\')">');
							    }
							    //跨服务接入生长业务系统
							    else{
								   taskStrHtml.push('<div class="content_black"><a href="#" onclick="openMsg(\'http://'+hostip + ':' + hostport + '/common/pendingtasklogin.do' + '?uid=' + uid + '&sid=' + sid + '&year=' + year + '&url=' + url + '\')">');
							    }
							    //显示具体代办事项内容
							    taskStrHtml.push('<font size=2>&nbsp待' + detail.operattypedto.name + '&nbsp' + detail.totalcount + '条</font></a>');
				   				taskStrHtml.push('<br/>');   
						    } 
							taskStrHtml.push('</span>' + '</td>');
							//子系统是否换行
							if(count%2==0){
			      			    taskStrHtml.push('</tr>');
			    			}  
					    }
						taskStrHtml.push('</table>');
						taskStrHtml.push('</p>');
				    }
			   }
			   //如果为接入待办事项
			   if(pendingtasks[0].outter==1){
				   //循环业务系统子系统信息
				   for(i=0; i<pendingtasks.size();i++) {
				   	  taskStrHtml.push('<p>');
				   	  //子系统对象，例如：总指标加载、单位指标调剂
				      pendingtask= pendingtasks[i];
				      //业务系统ID
				      var k=pendingtask.k;
				      //子系统具体待办事项，例如：待审核、待打印等
				      var details = pendingtask.details;
				      //子系统名称集合
				      var name_tem = pendingtask.name_tem;
				      //业务系统前边闪动图标
				      taskStrHtml.push('<img src="' + _ROOT_PATH_ + '/images/bg/top.gif"/>');
				      //如果是bs业务系统
				      if(pendingtask.type==1)
					  {  
				      	taskStrHtml.push('<a href="' + pendingtask.Url + '" target="_blank">');
				      	//业务系统名称
				      	taskStrHtml.push(pendingtask.name + '</a>');
				      //如果是cs业务系统
				      }else{
				    	taskStrHtml.push('<a href="#">');
				      	//业务系统名称
				      	taskStrHtml.push(pendingtask.name + '</a>');
				      }
				      //如果待办事项条数大于零
				      if(pendingtask.count>0){
				        taskStrHtml.push('----->共' + pendingtask.count + '条<br/>');
				       }
				       taskStrHtml.push('<br/>'); 
				       taskStrHtml.push('<span >');
			           //子系统名称集合为多条，则用table来存放业务系统中不同子系统的待办事项
				       if(name_tem.size()>0){
					        taskStrHtml.push('<table border=0>');
					        //循环遍历业务系统子系统
					       	for(o=0;o<name_tem.size();o++){
					       	//处理换行标记
					       	if(o%2==0)
								{
				      				taskStrHtml.push('<tr>');
				    			}
					       	    taskStrHtml.push('<td width="300" style="vertical-align:top;">');
					       	    //系统名称前的图标
					       		taskStrHtml.push('&nbsp' + '<img src="' + _ROOT_PATH_ + '/images/bg/20.png" />');
					       		//子系统名称
					       		taskStrHtml.push(name_tem[o]);	       		
					       		taskStrHtml.push('<br/>');
					       		//循环遍历子系统对应代办事项，例如待审核、待打印等
					       		for(j=0;j<details.size();j++)
								   { 
								      //子系统待办事项对象，例如待审核、待打印等
								      detail=details[j];
								      //如果子系统待办事项条数大于0
								      if(detail.totalcount>0){
								          //如果子系统名称与待办事项中对应子系统名称一致，则把待办事项放入对应子系统区域中
									      if(detail.menuname == name_tem[o] ){
									         //如果是bs系统
									         if(pendingtask.type==1)
									         {  
									         	taskStrHtml.push('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + '<a href="' + detail.JobUrl + '" target="_blank"><font size=2 color = "' + detail.color + '">' + detail.status + '<' + detail.totalcount + '条></font></a>');
									         	taskStrHtml.push('<br/>');
					                         }
					                         //如果是CS系统
					                         else
					                         {
					                            taskStrHtml.push('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font size=2>' + detail.status + '&nbsp;<' + detail.totalcount + '条></font>');
					                            taskStrHtml.push('<br/>'); 
					                         }
					                       }
								       }
								       //如果如果子系统待办事项条数等于0
								       if(detail.totalcount==0){
								           taskStrHtml.push('<font size=2>&nbsp' + detail.status); 
								           taskStrHtml.push('</font><br/>'); 
								        }								        
							       }					       		
					       		taskStrHtml.push('</td>');
					       		//是否换行
					       		if(o%2==1)
								{
				      				taskStrHtml.push('</tr>');
				    			}
					       	}
					       	taskStrHtml.push('</table>');
				       //子系统名称集合为1条,则不用table展示
				       }else{
				           //循环遍历子系统待办事项
					       for(j=0;j<details.size();j++)
						   {
						      //子系统待办事项对象
						      detail=details[j];
						      taskStrHtml.push('&nbsp' + '<img src="' + _ROOT_PATH_ + '/images/bg/20.png" />');
						     //如果是bs系统
					         if(pendingtask.type==1)
					         {  
					            //如果子系统待办事项大于0条
					            if(detail.totalcount>0){
						         	taskStrHtml.push('<a href="' + detail.JobUrl + '" target="_blank"><font size=2 color = "' + detail.color + '">' + detail.status + '<' + detail.totalcount + '条></font></a>');
					         	}else{
					         		taskStrHtml.push('<a href="' + detail.JobUrl + '" target="_blank"><font size=2 color = "' + detail.color + '">' + detail.status + '</font></a>');
					         	}
	                         }
	                         //如果是cs系统
	                         else
	                         {
	                            //如果子系统待办事项大于0条
	                         	if(detail.totalcount>0){
	                            	taskStrHtml.push(detail.status + '&nbsp;<' + detail.totalcount + '条>');
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
		   //把各业务系统对应的待办事项信息放入其对应ＤＩＶ中
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
	/**************待办事项查询返回结果展示(新版的展示)wyx20120824在消息中心用的**********/
	function showPendingTaskMessageNEW(config){ 
	    //待办事项展示对象集合
		
	    var totallist = config;
	    for(var index = 0;index < totallist.length; index++)
	    {   
	        //业务系统待办事项对象，例如：指标系统
		    var pendingtasks=totallist[index];
		    //定义待办事项存储数组对象
		    var taskStrHtml = [];
		    //如果业务系统需要显示待办事项
		    if(pendingtasks.size()>0){
		       //如果是生长业务系统
			   if(pendingtasks[0].outter!=1)
			   {   
			       //如果业务系统不存在待办事项
				   if(!pendingtasks[0].name)
				   {
				        //业务系统ID
					    var k=pendingtasks[0].k;
					    //业务系统名称
						var menuname=pendingtasks[0].menuname;
						//业务系统链接
						var menuurl=pendingtasks[0].clientmodule;
						//显示业务系统名称
						taskStrHtml.push('<div>');
						taskStrHtml.push('<div class="title_blue">');
						taskStrHtml.push('<a href="#" onclick="openMsg(\'' + _ROOT_PATH_+menuurl+'\')">'+ menuname + '&nbsp&nbsp&nbsp&nbsp<b style="color:#000; font-weight:normal;"></b>' + '</a>');
						taskStrHtml.push('</div>');
						taskStrHtml.push('<table width=97% border=0 cellpadding=0 cellspacing=0>');
						taskStrHtml.push('<tr>');
						taskStrHtml.push('<td colspan="2" style="vertical-align:top;" nowrap="nowrap">');
						taskStrHtml.push('<div class="content_black">&nbsp;<a href="#">暂时没有待办事项</a></div>');
						taskStrHtml.push('</td>');
						taskStrHtml.push('</tr>');
						taskStrHtml.push('</table>');
						taskStrHtml.push('</div>');
						
			       }
			       //如果业务系统存在待办事项
			       else{
			           //用户换行
					   var count=0;
					   //如果待办事项条数少，缩小待办提示框的高度，减少空白
					   taskStrHtml.push('<div>');
					   //显示业务系统名称
					   taskStrHtml.push('<div class="title_blue"><a  href="#" onclick="openMsg(\'' + _ROOT_PATH_+pendingtasks[0].clientmodule+'\')">'+ pendingtasks[0].menuname + '</a></div>');
					   //业务系统中待办事项展示表格
					   taskStrHtml.push('<table width=97% border=0 cellpadding=0 cellspacing=0>');
					   //循环业务系统子系统,例如：总指标加载、单位指标调剂等等
				       for(i=0; i<pendingtasks.size();i++) {
				       		count++;
				       		//具体业务系统子系统对象
							var pendingtask= pendingtasks[i];
							//业务系统子系统待办事项对象，例如：待审核、待打印等等
							var details = pendingtask.details;
							//子系统服务地址
							var hostip = pendingtask.hostip;
							//子系统服务端口
							var hostport=pendingtask.hostport;
							//子系统本地服务地址
							var localip = pendingtask.localip;
							//子系统本地服务端口
							var localport=pendingtask.localport;
							//用户编码
							var uid=pendingtask.uid;
							//业务系统菜单ＩＤ
							var k = pendingtask.k;
							//sessionID
							var sid=pendingtask.sid;
							//财政年度
							var year=pendingtask.year;
							//是否换行
							//if(count%2==1)
							//{
			      				taskStrHtml.push('<tr width="100%">');
			    			//}
			    			//子系统待办事项展示
							taskStrHtml.push('<td colspan="2" style="vertical-align:top;" nowrap="nowrap">');
							//子系统名称前的闪动图标
							taskStrHtml.push('<div class="content_title">');
							taskStrHtml.push(pendingtask.name + '(共' + pendingtask.totalcount + '条)</div>');
							taskStrHtml.push('</td>');
							taskStrHtml.push('</tr>');
							//遍历子系统待办事项，例如：待审核、待打印等
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
							    //子系统待办事项前边图标
								taskStrHtml.push('<div class="content_black">');
							    //taskStrHtml.push('&nbsp' + '<img src="' + _ROOT_PATH_ + '/images/bg/20.png" />');
							    //子系统待办事项对象，例如：待审核、待打印等
							    detail=details[j];
							    //子系统待办事项链接地址
							    var url="http://"+hostip+":"+hostport+detail.linkName;
							    //替换链接地址中的不规则字符
							    url=url.replace(/&/g, "%26");
							    //如果业务系统的服务地址为空则使用当前系统的默认地址
							    if(hostip == "" && hostport == ""){
							    	//有些菜单url中含有' 页面上会报错
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
							    //如果如果业务系统的服务地址与当前服务地址相同则使用当前系统的默认地址 
							    else if(hostip == localip && hostport == localport)
								{
							       taskStrHtml.push('<a href="#" onclick="openMsg(\'' + _ROOT_PATH_+detail.linkName + '\')">');
							       //taskStrHtml.push(detail.linkName + '\')">');
							    }
							    //跨服务接入生长业务系统
							    else{
							       taskStrHtml.push('<div class="content_black"><a href="#" onclick="openMsg(\'http://'+hostip + ':' + hostport + '/common/pendingtasklogin.do' + '?uid=' + uid + '&sid=' + sid + '&year=' + year + '&url=' + url + '\')">');
							       //taskStrHtml.push();
							    }
							    //显示具体代办事项内容
							    taskStrHtml.push('&nbsp待' + detail.operattypedto.name + '&nbsp(' + detail.totalcount + '条)</a>');
				   				taskStrHtml.push('</div>'); 
				   				taskStrHtml.push('</td>');
				   				//屏蔽无法正常显示错误
				   				if(details.size()%2==1){
				   					if(j%2==1){
										taskStrHtml.push('</tr>');
									}
									//封口操作
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
							
							//子系统是否换行
							//if(count%2==0){
			      			    taskStrHtml.push('</tr>');
			    			//}  
					    }
						taskStrHtml.push('</table>');
						taskStrHtml.push('</div>');
				    }
			   }
			   //如果为接入待办事项
			   if(pendingtasks[0].outter==1){
				   //循环业务系统子系统信息
				   for(i=0; i<pendingtasks.size();i++) {
				   	  taskStrHtml.push('<div><div class="title_blue">');
				   	  //子系统对象，例如：总指标加载、单位指标调剂
				      pendingtask= pendingtasks[i];
				      //业务系统ID
				      var k=pendingtask.k;
				      //子系统具体待办事项，例如：待审核、待打印等
				      var details = pendingtask.details;
				      //子系统名称集合
				      var name_tem = pendingtask.name_tem;
				      //业务系统前边闪动图标
				      //taskStrHtml.push('<img src="' + _ROOT_PATH_ + '/images/bg/top.gif"/>');
				      //如果是bs业务系统
				      if(pendingtask.type==1)
					  {  
				      	taskStrHtml.push('<a href="' + pendingtask.Url + '" target="_blank">');
				      	//业务系统名称
				      	taskStrHtml.push(pendingtask.name + '</a>');
				      //如果是cs业务系统
				      }else{
				      	taskStrHtml.push('<a href="#">');
				      	//业务系统名称
				      	taskStrHtml.push(pendingtask.name + '</a>');
				      }
				      //如果待办事项条数大于零
				      if(pendingtask.count>0){
				        taskStrHtml.push('(共' + pendingtask.count + '条)');
				       }
				       //taskStrHtml.push('<br/>'); 
				       //taskStrHtml.push('<span>');
				       taskStrHtml.push('</div>');
				       taskStrHtml.push('<div>');
				       taskStrHtml.push('<table width=97% border=0 cellpadding=0 cellspacing=0>');
				       //子系统名称集合为多条，则用table来存放业务系统中不同子系统的待办事项
				       if(name_tem.size()>0){
					        //循环遍历业务系统子系统
					       	for(o=0;o<name_tem.size();o++){
					       		//处理换行标记
					       		taskStrHtml.push('<tr width="100%"><td colspan="2" style="vertical-align:top;" nowrap="nowrap">');
					       	    //taskStrHtml.push('<td width="300" style="vertical-align:top;">');
					       	    //系统名称前的图标
					       		//taskStrHtml.push('&nbsp' + '<img src="' + _ROOT_PATH_ + '/images/bg/20.png" />11111111111');
					       		//子系统名称
					       		taskStrHtml.push(name_tem[o]);	       		
					       		taskStrHtml.push('</td>');
					       		//循环遍历子系统对应代办事项，例如待审核、待打印等
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
								      //子系统待办事项对象，例如待审核、待打印等
								      detail=details[j];
								      //如果子系统待办事项条数大于0
								      if(detail.totalcount>0){
								          //如果子系统名称与待办事项中对应子系统名称一致，则把待办事项放入对应子系统区域中
									      if(detail.menuname == name_tem[o] ){
									         //如果是bs系统
									         if(pendingtask.type==1)
									         {  
									         	taskStrHtml.push('<a href="#" onclick="openMsg(\'' + detail.JobUrl + '\')">' + detail.status + '(' + detail.totalcount + '条)></a>');
					                         }
					                         //如果是CS系统
					                         else
					                         {
					                            taskStrHtml.push(detail.status + '&nbsp;(' + detail.totalcount + '条)');
					                         }
					                       }
								       }
								       //如果如果子系统待办事项条数等于0
								       if(detail.totalcount==0){
								           taskStrHtml.push('&nbsp' + detail.status); 
								        }
								        taskStrHtml.push('</div>'); 
								        taskStrHtml.push('</td>');
								        if(details.size()%2==1){
								        	if(j%2==1){
								        		taskStrHtml.push('</tr>');
								        	}
								        	//封口操作
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
				       //子系统名称集合为1条,则不用table展示
				       }else{
				           //循环遍历子系统待办事项
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
						      //子系统待办事项对象
						      detail=details[j];
						      //taskStrHtml.push('&nbsp' + '<img src="' + _ROOT_PATH_ + '/images/bg/20.png" />');
						     //如果是bs系统
					         if(pendingtask.type==1)
					         {  
					            //如果子系统待办事项大于0条
					            if(detail.totalcount>0){
						         	taskStrHtml.push('<a href="#" onclick="openMsg(\'' + detail.JobUrl + '\')">' + detail.status + '(' + detail.totalcount + '条)</a>');
					         	}else{
					         		taskStrHtml.push('<a href="#" onclick="openMsg(\'' + detail.JobUrl + '\')">' + detail.status + '</a>');
					         	}
	                         }
	                         //如果是cs系统
	                         else
	                         {
	                            //如果子系统待办事项大于0条
	                         	if(detail.totalcount>0){
	                            	taskStrHtml.push(detail.status + '&nbsp;(' + detail.totalcount + '条)');
	                            }else {
					         		taskStrHtml.push(detail.status);
					         	}
					         }
					         taskStrHtml.push('</div>');
					         taskStrHtml.push('</td>');
						     //屏蔽无法正常显示错误
					         if(details.size()%2==1){
					         		if(j%2==1){
					         			taskStrHtml.push('</tr>');
					         		}
					         		//封口操作
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
		   //把各业务系统对应的待办事项信息放入其对应ＤＩＶ中
		   //alert(k+'========'+taskStrHtml.join(''));
		   document.getElementById("task"+k).innerHTML = taskStrHtml.join('');
		   //document.getElementById(k).innerHTML = taskStrHtml.join('');
		   
	   }//for
	   var aa = document.getElementById("task"+k).innerHTML ;
	}

	
