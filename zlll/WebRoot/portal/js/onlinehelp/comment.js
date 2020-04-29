Ext_lt_Comment = new function(){
	var flag = 0;//当前tab页签是已处理还是未处理,默认为未处理
	var PerCount = 20;//每页显示数据量大小
	var curpage=1;//当前页
	var count=1;
	var filecount=1;//附件数量
	var userfile=1;//用户附件数量
	var questionname="";
    var questiontype="";
	var questionarea="";	
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
	/***
	 * 主显示窗体
	 */
	var sm = new Ext.grid.CheckboxSelectionModel({checkOnly:true});//checkbox多选框的对象
	var smtwo = new Ext.grid.CheckboxSelectionModel({checkOnly:true});//checkbox多选框的对象
	var cm = new Ext.grid.ColumnModel([
		                   				new Ext.grid.RowNumberer(),
		                   				sm,
		                   				{header:'编号',dataIndex:'itemid',width:30,sortable:true,menuDisabled:true},
		                   				{header:'提问标题',dataIndex:'questionname',sortable:true,menuDisabled:true},
		                   				{header:'提问内容',dataIndex:'questioncontent',hidden:true,menuDisabled:true},
		                   				{header:'提问单位',dataIndex:'questionagency',width:80,sortable:true,menuDisabled:true},
		                   				{header:'提问地区',dataIndex:'questionarea',hidden:commentset==0?true:false,width:50,sortable:true,menuDisabled:true},
		                   				{header:'提问时间',dataIndex:'questiondate',width:50,sortable:true,menuDisabled:true},
		                   				{header:'联系电话',dataIndex:'telnumber',hidden:true,sortable:true,menuDisabled:true},
		                   				{header:'问题类型',dataIndex:'questiontype',renderer:findgridquestiontype,width:60,sortable:true,menuDisabled:true},
		                   				{header:'答复时间',dataIndex:'answerdate',hidden:true,menuDisabled:true},
		                   				{header:'答复人',dataIndex:'answeruser',hidden:true,menuDisabled:true},
		                   				{header:'提问人',dataIndex:'questionuser',hidden:true,menuDisabled:true},
		                   				{header:'答复内容',dataIndex:'answercontent',hidden:true,menuDisabled:true},
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
			{name: 'answerdate'},
			{name: 'answeruser'},
			{name: 'questionuser'},
			{name: 'answercontent'},
			{name: 'fileid'},
			{name: 'adminfileid'}
		  ])
		});
	store.load();
	var pager = new Ext.PagingToolbar({
			id:'todopage',
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
		var pager2 = new Ext.PagingToolbar({
			id:'donepage',
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
	var todoGrid = new Ext.grid.GridPanel({
		id:'todoGrid',
		layout:'fit',
		columnLines: true,
		stripeRows:true,
		cm:cm,
		sm:sm,
		autoExpandColumn : 'questionname',
		bodyStyle:'width:100%',  
		autoWidth:true,  
		enableColumnMove:false,
		autoHeight: true,
		border:false,
		store:store,
		title:'待处理',
		viewConfig:{
			forceFit:true,
			enableRowBody:true,
			showPreview:true
		},
		tbar: pager,
		listeners:{cellclick:function(grid, rowIndex, columnIndex, e){
			if(columnIndex!=1){
				var model = todoGrid.getSelectionModel();
				if(model.isSelected(rowIndex)){
					 model.deselectRow(rowIndex);
				}else{
					 model.selectRow(rowIndex,rowIndex+1);
				}
			}	
		}}
	});
	var doneGrid = new Ext.grid.GridPanel({
		id:'doneGrid',
		layout:'fit',
		columnLines: true,
		stripeRows:true,
		title:'已处理',
		autoExpandColumn : 'questionname',
		bodyStyle:'width:100%',  
		autoWidth:true,  
		cm:cm,
		sm:smtwo,
		enableColumnMove:false,
		autoHeight: true,
		border:false,
		store:store,
		viewConfig:{
			forceFit:true,
			enableRowBody:true,
			showPreview:true
		},
		tbar: pager2,
		listeners:{cellclick:function(grid, rowIndex, columnIndex, e){
			if(columnIndex!=1){
				var model = doneGrid.getSelectionModel();
				if(model.isSelected(rowIndex)){
					 model.deselectRow(rowIndex);
				}else{
					 model.selectRow(rowIndex,rowIndex+1);
				}
			}	
		}}
	});
    
 	var tabPanel = new Ext.TabPanel({
		id:'auditcomment',
        activeTab: 0,
        border:false,
        plain:true,
        defaults:{autoScroll: true},
        items:[todoGrid,doneGrid],
       	listeners: {
 			'tabchange': function(t, p) { 							
 				var search = new Object(); 				
	  			if(p.id=='todoGrid'){
	  					flag=0;
	  				    curpage=1;//当前页
	  					search.flag="0";//待处理
	  					questionname = "";
			  			quesiontype = "";
			  			questionarea = "";
	  				    Ext_lt_Comment.loadGrid(search);
	  			}else if(p.id=='doneGrid'){
	  					flag=1;
	  				    curpage=1;//当前页
	  					search.flag="1";//已处理
	  					questionname = "";
			  			quesiontype = "";
			  			questionarea = "";
	  					Ext_lt_Comment.loadGrid(search);
	  			}
	  			temp=p;			
		  	}
		}	
	});	
   
	//查询
	function loadGridPanel(currentpage){
		var search = new Object();
		search.start=currentpage+"";
		search.flag=flag;
		search.typemap=typemap;
		//检索条件
		var searchcondition="";
		search.questionname = questionname;
		search.questiontype = questiontype;
		search.questionarea = questionarea;
		search.area=localquestionarea;
		Ext.lt.RCP.script(onlinehelpurl,"auditcomment", "findAllComment", search,function (resp) {
			count=resp.result;
			if(count==0){
				count=1
			}
			if(flag==0){
				todoGrid.getStore().removeAll();
				store.loadData(resp);
				todoGrid.doLayout();
			}else{
				doneGrid.getStore().removeAll();
				store.loadData(resp);
				doneGrid.doLayout();
			}
		},function(){});
	}
	tabPanel.loadGrid = function(search){
		curpage=1;
		search.start="1";
		search.flag=flag;
		search.typemap=typemap;
		questionname=search.questionname!=undefined?search.questionname:"";
		questiontype=search.questiontype!=undefined?search.questiontype:"";
		questionarea=search.questionarea!=undefined?search.questionarea:"";
		search.area=localquestionarea;
		Ext.lt.RCP.script(onlinehelpurl,"auditcomment", "findAllComment", search,function (resp) {
			count=resp.result;
			if(count==0){
				count=1
			}
			if(flag==0){
				todoGrid.getStore().removeAll();
				store.loadData(resp);
				todoGrid.doLayout();
			}else{
				doneGrid.getStore().removeAll();
				store.loadData(resp);
				doneGrid.doLayout();
			}
		},function(){});
	}
	/**
	*审核评论
	*/
	tabPanel.auditComment = function(){
			var rows;
			if(flag==0){
				 rows = todoGrid.getSelectionModel().getSelections();
			}else{
				 rows = doneGrid.getSelectionModel().getSelections();
			}
			if(rows.length<1){
				alert("请选择要审核的数据");return;
			}else if(rows.length>1){
				alert("请选择一条要审核的数据");return;
			}
			var itemid = rows[0].get("itemid");
			//打开审核页面
			var url=_ROOT_PATH_+"/portal/onlinehelp/auditComment.jsp?id="+itemid+"&flag="+flag;
			//var h = document.body.offsetHeight;
			var h = window.screen.availHeight-40;
		    window.open (url,'newwindow','height='+h+',width=815,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no'); 
	}
	//loadGridPanel(1);
	return tabPanel;
}