Ext_lt_NewQuestion = new function(){
	var PerCount = 20;
	var curpage=1;
	var date = new Date();
	var m =date.getMonth()+1<10?"0"+(date.getMonth()+1):date.getMonth()+1;
    var h = date.getHours()<10?"0"+date.getHours():date.getHours();
    var mi = date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes();
    var s = date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds();
    var time = date.getYear()+"-"+m+"-"+date.getDate()+" "+h+":"+mi+":"+s;
	var filecount=1;//附件数量
	var answerfile=1;//答复附件数量
	//----------------------------------------------------------------------------
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
	//---------------------------------------------------------------------------------
	/***
	 * 主显示窗体
	 */
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
				                   				{header:'联系电话',dataIndex:'telnumber',hidden:true,sortable:true,menuDisabled:true},
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
				                   				{header:'答复附件id',dataIndex:'adminfileid',hidden:true,menuDisabled:true}
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
					{name: 'adminfileid'}
				  ])
				});
			store.load();
			 var pager = new Ext.PagingToolbar({
					id:'Grid_Pager1',
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
				             var t=this.cursor;                
			  			     this.cursor=t+this.pageSize;               
			  			     this.doLoad(t+this.pageSize); 
			   		},
			   		moveFirst: function(){
			   			     this.cursor=0;
					 	     this.doLoad(0);  
			   		},
				   movePrevious : function(){
			   				var t=this.cursor;                
			   				this.cursor=Math.max(0,t-this.pageSize);                
			   				this.doLoad(Math.max(0,t-this.pageSize));    
				   },
				   moveLast : function(){
					   		var total=data.data.length;                
		  				    var extra=total%this.pageSize;                
		  				    var lastStart=extra?(total-extra):total-this.pageSize;               
		  				    this.cursor=extra?(total-extra):total-this.pageSize;                
		  				    this.doLoad(lastStart);       
				   },
				   doRefresh:function(){//刷新方法
						   		var t=this.cursor;                
			  				    this.cursor=t;                
			  				    this.doLoad(t);        
					},
				   updateInfo:function (){//重写UpdateInfo        
								if(this.displayInfo){
					                var count=this.store.getCount();             
					                var msg=count==0?this.emptyMsg:String.format(this.displayMsg,this.cursor+1,Math.min(this.cursor+this.pageSize-1,data.data.length-1)+1,data.data.length);               
					                // this.displayItem.setText(msg);
					             }
					 },
			        onLoad:function (store,r,o){//重写OnLoad
				    		if(!this.rendered) {                
								this.dsLoaded=[store,r,o];                
								return ; 
							}    
				    	
							var d=this.getPageData(),ap=d.activePage,ps=d.pages; 
							this.afterTextItem.setText(String.format(this.afterPageText, d.pages));
						   // this.inputItem.setValue(ap);      
							this.first.setDisabled(ap==1|| ps == 0);            
							this.prev.setDisabled(ap==1|| ps == 0);            
							this.next.setDisabled(ap==ps|| ps == 0);            
							this.last.setDisabled(ap==ps|| ps == 0); 
							// this.loading.enable();            
							this.updateInfo();   
					 },        
					 doLoad:function (start){//重写doLoad  
							var curinput = this.inputItem.getValue();
 						    var d=this.getPageData(),ap=d.activePage,ps=d.pages;
							if(curpage!=this.inputItem.getValue()){
								if(curinput>ps){
									curinput=ps
								}else if(curinput<=0){
									curinput=1;
								}
								this.cursor = (this.pageSize)*(curinput-1);
							}
						 	d=this.getPageData(),ap=d.activePage,ps=d.pages;
						 	curpage=ap;
						    var TempData={'result':3,'data':[]};            
						    var i=0;            
						    var len=this.pageSize;  //5            
						    for(i=0;i<len;i++) {                
						  	     if(data.data[start+i]!=null) {                    
						  		      TempData.data.push(data.data[start+i]); 
						  		   } 
						  	}        
						  	this.store.loadData(TempData,false); 
						    if(ap==0){
						  	    this.inputItem.setValue(1);
						    }else{
							    this.inputItem.setValue(ap);
						   }
					 },        
					 getPageData:function (){//重写getPageData 
						 	var total=data.data.length;  
						 	return  { total:total, 
					  			activePage:Math.ceil((this.cursor+this.pageSize)/this.pageSize),
					  			pages:total<this.pageSize?1:Math.ceil(total/this.pageSize)};
					 } 
			});
			var newquestionGrid = new Ext.grid.GridPanel({
				id:'newquestionGrid',
				title:'待处理',
				autoExpandColumn:'questionname',
			    layout:'fit',
				columnLines: true,
				stripeRows:true,
				cm:cm,
				sm:sm,
				enableColumnMove:false,
				autoHeight: true,
				border:false,
				store:store,
				//closable:true,//带关闭标签
				viewConfig:{
						forceFit:true,
						enableRowBody:true,
						showPreview:true
				},
		   		tbar: pager,
				listeners:{cellclick:function(grid, rowIndex, columnIndex, e){
					if(columnIndex!=1){
						var model = newquestionGrid.getSelectionModel();
						if(model.isSelected(rowIndex)){
							 model.deselectRow(rowIndex);
						}else{
							 model.selectRow(rowIndex,rowIndex+1);
						}
					}	
				}}
			});
			function changefn(){
			 }
			pager.addListener('change', changefn);
			
	//修改问题--------------------------------------------------------------------------------------------------------------------
	newquestionGrid.update=function(){
		var rows = newquestionGrid.getSelectionModel().getSelections();
		if(rows.length<1){alert("请选择要维护的已暂存数据");return;}else if(rows.length>1){alert("请选择一条已暂存数据维护");return;}
		if(rows[0].get("userstatus")!=0){
			alert("该问题已提交无法维护");return;
		}
		var questiontypes = rows[0].get("questiontype");
		var redStar="<font color='red'>&nbsp*</font>"; 
		//------------------------------------------------
		var ischeck='';
		var mytpl = new Ext.XTemplate( 
		    '<tpl for=".">', 
		        '<tpl if="this.ischeck(itemid)">',
		        	'<div  class="done" onclick="checkCombo({itemid})" onmouseover="this.className=\'mytplover\'" onmouseout="this.className=\'mytplout\'">',  
	           		'<input type="checkbox" name="checktype" onclick="checkCombo({itemid});" id={itemid} value={name} checked />{name}',  
	        		'</div>'+  
		        '</tpl>', 
		        '<tpl if="this.ischeck(itemid) == false">', 
		        '<div  class="done" onclick="checkCombo({itemid})" onmouseover="this.className=\'mytplover\'" onmouseout="this.className=\'mytplout\'">',   
	            '<input type="checkbox" name="checktype" id={itemid} value={name} onclick="checkCombo({itemid});" />{name}' ,    
	        	'</div>'+ 
		        '</tpl>', 
		    '</tpl>', { 
		     ischeck:function(itemid){
		     	if(questiontypes!=null&&questiontypes.indexOf(itemid)!=-1){
		     	     return true;
		     	}else{
		     		return false;
		     	}
			}
		}); 
		var combos = new Ext.form.ComboBox({
			readOnly:false,
			fieldLabel:'问题类型:'+redStar,
			labelSeparator:'',
			anchor:'96%',
			id:'updatequestionArea',
			store: comstore,
			editable:false, 
			emptyText: '请选择问题类型',
			mode:'local',
			triggerAction: 'all',	
			width:130,
			valueField: 'itemid',
	  	    displayField: 'name',
	  	    tpl:mytpl
		});
		combos.onViewClick = function(doFocus){
		};
		combos.on('collapse',function(){
			var nodes = document.getElementsByName("checktype");
			if(nodes.length!=0){
				questionType.setValue("");
			}
			var codes = [];
			var names = "";
			for(var i=0;i<nodes.length;i++){
				if(nodes[i].checked==true){
					codes.push(nodes[i].id);
					names += (nodes[i].value+"，");
				}	
			}
			names = names.substr(0,names.length-1);
			Ext.getCmp('updatequestionArea').setValue(names);
			Ext.getCmp('updatequestionArea').comvalue=codes;
			Ext.getCmp('updatequestionArea').names=names;
		})
	//---------------------------		
		var updatenewQuestionform = new Ext.form.FormPanel({
			id:'updatenewQuestionform',
			labelWidth:65 ,
			title: '提问信息明细',
			frame:true,
			layout:'fit',
			height:375,
			items:[{
					layout:'column',
					items:[{
						columnWidth:.5,
						layout: 'form',
						items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',value:username,fieldLabel:'提 问 人 ',id:'updatenewQuestionform_questionPreson',anchor:'96%'},
						{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',value:useragency,fieldLabel:'提问单位 ',id:'updatenewQuestionform_questionUnit',anchor:'96%'},
						combos]
					},{
					layout:'form',
					columnWidth:.5,
					items:[{
						columnWidth:.5,
						layout: 'form',
						items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问时间',id:'updatenewQuestionform_questionTime',anchor:'96%'},
							   {xtype:'textfield',labelSeparator:'',readOnly:false,value:telnumber,fieldLabel:'联系电话:'+redStar,id:'updatenewQuestionform_questionTelephone',anchor:'96%'},
							   {xtype:'combo',readOnly:false,fieldLabel:'紧急类型:'+redStar,labelSeparator:'',id:'updatenewQuestionform_leveltype',anchor:'96%', blankText:'请选择',
				                  emptyText:'选择紧急类型',
				                  displayField:"questionlevel",
				                  valueField:"itemid",
				                  lazyRender:true,
				                  mode:'local',
				                  triggerAction:"all",
				                  typeAhead: true,
				                  editable:false, 
				                  selectOnFocus:true, 
				                  store:levelstore
							},{xtype:'textfield',hidden:true,readOnly:true,style:'background:#E6E6E6',hideLabel:true,fieldLabel:'',id:'moditemid'}]
					}]
			},{
				layout:'form',
				columnWidth:.99,
				items:[{xtype:'textfield',readOnly:false,fieldLabel:'提问标题:'+redStar,labelSeparator:'',id:'updatenewQuestionform_questionTitle',anchor:'99%'}]
			},{
				layout:'form',
				columnWidth:.99,
				items:[{xtype:'textarea',readOnly:false,fieldLabel:'提问内容:'+redStar+"<font  color='red'>(500字以内)</font>",labelSeparator:'',height:190,id:'updatenewQuestionform_questionContent',anchor:'99%'}]
			},{
						layout:'form',
						columnWidth:.99,
						items:[{
							layout:'column',
							items:[{
							    layout:'form',
								columnWidth:.57,
								items:[{
									xtype: 'fileuploadfield',  
									id: 'userfile1',
									width:350,
									fieldLabel: '附&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp件',
									emptyText: '',
									name: 'file',
									buttonText: '浏览',
									readOnly:false,
									buttonCfg: {
										id:'liulan1',
										width:'65'
									},
									listeners: {
									'fileselected': function(fb, v){
									//重新选择附件，删除原来的附件 ，原来附件id————》fileids
									if(fileids!=null&&fileids!=""){
										Ext.lt.RCP.script(onlinehelpurl,"useonliehelp", "delfile", fileids,function (resp) {
										});
									}
									fileids="";
									var flag = true;
									var path = v;
									if(path.trim()!=="") {
									//验证上传文件类型doc,txt,pdf,xls,rar,DOC,TXT,PDF,XLS,RAR
									//if(path.substring(path.lastIndexOf("."))==".xls"){
									//if(types.indexOf(path.substring(path.lastIndexOf(".")))==-1){
									flag = false;
									// var obj = Ext.getCmp('importPanel');
									addnewQuestionform.getForm().submit({
									method : 'POST',
									url: "/common/post/uploadFile.do",
									success : function(){
										var config = {  
											title:'消息',  
											msg: '2'  
										};
										Ext.Msg.show(config);  
										setTimeout(function(){
											Ext.Msg.hide();
										},2000);  
									},
									failure : function() {Ext.MessageBox.alert("错误","系统连接超时，请联系管理员或稍后再试!");}
									});
									//}
									}  
									if(flag) {Ext.Msg.alert('提示', '请选择Excel(.xls)文件！');}}}
								}]
								}
								/*,{xtype:"button",id:"clear1",iconCls:'shanchu',text:"",handler:function(){
										Ext.getCmp('userfile1').setValue("");
										//去后台删除该文件
										if(fileids=="")return;
										var tempfileids = fileids.split("@");
										if(tempfileids[0]=="")return;
										var findid = tempfileids[0];
										Ext.lt.RCP.script(onlinehelpurl,"useonliehelp", "delfile", findid,function (resp) {
											 Ext.getCmp('liulan1').setDisabled(false);
											 fileids=fileids.replace(findid,'');  
										});
									}
								}
								,{
							    layout:'form',
								columnWidth:.24,
								items:[
								{
									xtype: 'fileuploadfield',  
									id: 'userfile2',
									hidden:true,
									hideLabel:true,
									fieldLabel: '',
									emptyText: '',
									name: 'file',
									buttonText: '浏览',
									buttonCfg: {
										id:'liulan2',
										hidden:true,
										width:'40'
									},
									listeners: {
									'fileselected': function(fb, v){
									var flag = true;
									var path = v;
									if(path.trim()!=="") {
									//if(path.substring(path.lastIndexOf("."))==".xls"){
									flag = false;
									//}
									}  
									if(flag) {
										Ext.Msg.alert('提示', '请选择Excel(.xls)文件！');
									}
									}
									}
								}
								]
							}
							,{xtype:"button",id:"",text:"添加附件",handler:function(){
								if(filecount>=3){
									alert("只能上传3个附件");
								}
								filecount++;
								Ext.getCmp('userfile'+filecount).show();
								Ext.getCmp('clear'+filecount).show();
								Ext.getCmp('liulan'+filecount).show();
							}}
							*/
							]
						}]
					}]
			}]
		});
		var updatewin = new Ext.Window({
			buttonAlign: 'right',
			id:'updatewin_newQuestion',
			width:800,
			autoHeight:true,
			closeAction:'close',
			modal: true,
			buttons:[{text :'暂  存',id:'modzc',listeners:{'click':function(){
				var config=new Object();
				config.flag="0";
				config.itemid=rows[0].get("itemid");
				config.questionUser=Ext.getCmp("updatenewQuestionform_questionPreson").getValue();
				config.questiondate=Ext.getCmp("updatenewQuestionform_questionTime").getValue();
				config.questionname=Ext.getCmp("updatenewQuestionform_questionTitle").getValue()+"";//
				config.questioncontent=Ext.getCmp("updatenewQuestionform_questionContent").getValue()+"";//
				config.telnumber=Ext.getCmp("updatenewQuestionform_questionTelephone").getValue()+"";
				config.questiontype=Ext.getCmp("updatequestionArea").comvalue;
				if(config.telnumber.length>30){
							alert("联系电话不能大于30位");
							return;
				}
				if(config.telnumber.trim().length>0){
					var strTemp= "0123456789-()#+"; 
					var str = config.telnumber.trim()
					for(var k = 0;k < str.length;k ++){
						if(strTemp.indexOf(str.charAt(k))==-1){
							alert("联系电话格式不符合");
							return;
						}
					}
				}
				if(config.questionname.length>100){
					alert("提问标题不能大于100字");
					return;
				}
			    if(config.questioncontent.length>500){
					alert("提问内容不能大于500字");
					return;
				}
				gridid=3;
				Ext.getCmp('modzc').setDisabled(true);
				Ext.getCmp('modfb').setDisabled(true);
				if(config.telnumber!=null&&config.telnumber!=""&&config.telnumber!=telnumber){
						telnumber=config.telnumber;
						Ext.lt.RCP.server("useonliehelp", "addTel", config.telnumber,function (resp) {
							saveQuit();//上传附件
						});
				}else{
						saveQuit();//上传附件
				}
			}}},{text:'提  交',id:'modfb',listeners:{'click':function(){
				var config=new Object();
				config.flag="1";
				config.itemid=rows[0].get("itemid");
				config.questionUser=Ext.getCmp("updatenewQuestionform_questionPreson").getValue();
				config.questiondate=Ext.getCmp("updatenewQuestionform_questionTime").getValue();
				config.questionname=Ext.getCmp("updatenewQuestionform_questionTitle").getValue();//
				config.questioncontent=Ext.getCmp("updatenewQuestionform_questionContent").getValue();//
				config.telnumber=Ext.getCmp("updatenewQuestionform_questionTelephone").getValue();
				config.questiontype=Ext.getCmp("updatequestionArea").comvalue;
				if(config.telnumber.trim().length==0){
					alert("联系电话不能为空");
					return;
				}else if(config.telnumber.length>30){
					alert("联系电话不能大于30位");
					return;
				}
				if(config.telnumber.trim().length>0){
					var strTemp= "0123456789-()#+"; 
					var str = config.telnumber.trim()
					for(var k = 0;k < str.length;k ++){
						if(strTemp.indexOf(str.charAt(k))==-1){
							alert("联系电话格式不符合");
							return;
						}
					}
				}	
				if(config.questiontype==""||config.questiontype==0){
					alert("问题类型不能为空");
					return;}	
				if(config.questionleveltype==""){
						alert("紧急类型不能为空");
						return;}			
				if(config.questionname.trim().length==0){
					alert("提问标题不能为空");
					return;
				}else if(config.questionname.length>100){
					alert("提问标题不能大于100字");
					return;
				}
				if(config.questioncontent.trim().length==0){
					alert("提问内容不能为空");
					return;
				}else if(config.questioncontent.length>500){
					alert("提问内容不能大于500字");
					return;
				}
				gridid=4;
				Ext.getCmp('modzc').setDisabled(true);
				Ext.getCmp('modfb').setDisabled(true);
				if(config.telnumber!=null&&config.telnumber!=""&&config.telnumber!=telnumber){
						telnumber=config.telnumber;
						Ext.lt.RCP.server("useonliehelp", "addTel", config.telnumber,function (resp) {
							saveQuit();//上传附件
						});
				}else{
						saveQuit();//上传附件
				}
			}}}],
			items:[updatenewQuestionform],
			listeners: {'close': function() {filecount=1;}} 
		});
		var date = new Date();
		var m =date.getMonth()+1<10?"0"+(date.getMonth()+1):date.getMonth()+1;
	    var h = date.getHours()<10?"0"+date.getHours():date.getHours();
	    var mi = date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes();
	    var s = date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds();
	    var time = date.getYear()+"-"+m+"-"+date.getDate()+" "+h+":"+mi+":"+s;
		Ext.getCmp("updatenewQuestionform_questionPreson").setValue(username);
		Ext.getCmp("updatenewQuestionform_questionTime").setValue(time);
		var codes = [];
		var names = "";
		if(rows[0].get("questiontype")!=null){
			var types = (rows[0].get("questiontype")).split(',');
			for(var z=0;z<typemap.length;z++){
				for(var k = 0;k < types.length;k ++){
					if(typemap[z].itemid==types[k]){
						names+=typemap[z].name+",";
						codes.push(typemap[z].itemid);
					}
				}
			}
			names = names.substr(0,names.length-1);
			Ext.getCmp('updatequestionArea').setValue(names);
			Ext.getCmp('updatequestionArea').comvalue=codes;
			Ext.getCmp('updatequestionArea').names=names;
		}	
		for(var z=0;z<(levelmap.data).length;z++){
			if(levelmap.data[z].itemid==rows[0].get("leveltype")){
				Ext.getCmp("updatenewQuestionform_leveltype").setValue(levelmap.data[z].itemid);
			}
		}
		Ext.getCmp("moditemid").setValue(rows[0].get("itemid"));
		Ext.getCmp("updatenewQuestionform_questionTelephone").setValue(rows[0].get("telnumber"));
		Ext.getCmp("updatenewQuestionform_questionUnit").setValue(rows[0].get("questionagency"));
		Ext.getCmp("updatenewQuestionform_questionTitle").setValue(rows[0].get("questionname"));
		Ext.getCmp("updatenewQuestionform_questionContent").setValue(rows[0].get("questioncontent"));
		//修改附件
		var fileid = rows[0].get("fileid");
		fileids = fileid;
		if(fileid!=null&&fileid!=""){
			//查询附件名字
		    Ext.lt.RCP.script(onlinehelpurl,"useonliehelp", "findfilename", fileid,function (resp) {
		  		for(var k = 0;k < resp.length;k ++){
		  			if(resp[k]!=""){
		  					Ext.getCmp('userfile'+filecount).show();
		  					Ext.getCmp('userfile'+filecount).setValue(resp[k]);
							//Ext.getCmp('clear'+filecount).show();
							Ext.getCmp('liulan'+filecount).show();
							//Ext.getCmp('liulan'+filecount).setDisabled(true);
							filecount++;
		  			
		  			}
		  		}
		  		if(filecount>1)filecount--;
		    });
		
		}
		updatewin.show();
		//});
	}
	 function GetPagerData(InData)//从静态数据中获取每页的数据
	   {	
	   	var TempData={ 'result':3,'data':[] };    
	   	if(InData.data.length>PerCount){        
	   		for(var i=0;i<=PerCount-1;i++){            
	   			TempData.data.push(InData.data[i]);
	   			} 
	   		}else{        
	   				for(var i=0;i<=InData.data.length-1;i++) {           
	   					 TempData.data.push(InData.data[i]);
	   					 }
	   				}    
	   					 return TempData;
	   	}
	/***
	 * 新增问题------------------------------------------------------------------------------------------------------
	 */
	newquestionGrid.showinfor = function(){
		var date = new Date();
		var m =date.getMonth()+1<10?"0"+(date.getMonth()+1):date.getMonth()+1;
	    var h = date.getHours()<10?"0"+date.getHours():date.getHours();
	    var mi = date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes();
	    var s = date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds();
	    var time = date.getYear()+"-"+m+"-"+date.getDate()+" "+h+":"+mi+":"+s;
		var redStar="<font color='red'>&nbsp*</font>"; 
		//------------------------------------------------
		var combos = new Ext.form.ComboBox({
			id:'addquestiontype',
			editable: false,
			fieldLabel:'问题类型:'+redStar,
			labelSeparator:'',
			anchor:'96%',
			store: comstore,
			emptyText: '请选择问题类型',
			mode:'local',
			triggerAction: 'all',	
			width:130,
			valueField: 'itemid',
	  	    displayField: 'name',
	  	    tpl:'<tpl for=".">' +   
	            '<div  class="mytplout" onclick="checkCombo({itemid})" onmouseover="this.className=\'mytplover\'" onmouseout="this.className=\'mytplout\'">' +   
	            '<input type="checkbox" name="checktype" onclick="checkCombo({itemid})" id={itemid} value={name} />{name}' +   
	        	'</div>'+    
	            '</tpl>'
		});
		combos.onViewClick = function(doFocus){
		};
		combos.on('collapse',function(){
			var nodes = document.getElementsByName("checktype");
			if(nodes.length!=0){
				questionType.setValue("");
			}
			var codes = [];
			var names = "";
			for(var i=0;i<nodes.length;i++){
				if(nodes[i].checked==true){
					codes.push(nodes[i].id);
					names += (nodes[i].value+"，");
				}	
			}
			names = names.substr(0,names.length-1);
			Ext.getCmp('addquestiontype').setValue(names);
			Ext.getCmp('addquestiontype').comvalue=codes;
			Ext.getCmp('addquestiontype').names=names;
		})
		Ext.getCmp('addquestiontype').setValue("")
		Ext.getCmp('addquestiontype').comvalue=[];
		Ext.getCmp('addquestiontype').names="";
		//---------------------------		
			var addnewQuestionform = new Ext.form.FormPanel({
				id:'addnewQuestionform',
				labelWidth:65 ,
				title: '提问信息明细',
				frame:true,
				layout:'fit',
				height:370,
			 	defaults: {
			 		allowBlank: false,
				    msgTarget: 'side'
			    },
				items:[{
					layout:'column',
					items:[{
						columnWidth:.5,
						layout: 'form',
						items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',value:username,fieldLabel:'提 问 人 ',id:'addnewQuestionform_questionPreson',anchor:'96%'},
							   {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',value:useragency.trim(),fieldLabel:'提问单位 ',id:'addnewQuestionform_questionUnit',anchor:'96%'},
							   combos]
					},{
					layout:'form',
					columnWidth:.5,
					items:[{
						columnWidth:.5,
						layout: 'form',
						items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问时间',id:'addnewQuestionform_questionTime',anchor:'96%'},
							   {xtype:'textfield',labelSeparator:'',readOnly:false,value:telnumber,fieldLabel:'联系电话:'+redStar,id:'addnewQuestionform_questionTelephone',anchor:'96%'},
							   {xtype:'combo',readOnly:false,fieldLabel:'紧急类型:'+redStar,labelSeparator:'',id:'questionleveltype',anchor:'96%', blankText:'请选择',
				                  emptyText:'选择紧急类型',
				                  displayField:"questionlevel",
				                  valueField:"itemid",
				                  lazyRender:true,
				                  mode:'local',
				                  triggerAction:"all",
				                  typeAhead: true,
				                  editable:false, 
				                  selectOnFocus:true, 
				                  store:levelstore
							}]
					}]
					},{
						layout:'form',
						columnWidth:.99,
						items:[
						{xtype:'textfield',readOnly:false,fieldLabel:'提问标题:'+redStar,labelSeparator:'',id:'addnewQuestionform_questionTitle',anchor:'99%'}
						]
					},{
						layout:'form',
						columnWidth:.99,
						items:[{xtype:'textarea',readOnly:false,fieldLabel:'提问内容:'+redStar+"<font  color='red'>(500字以内)</font>",labelSeparator:'',height:190,id:'addnewQuestionform_questionContent',anchor:'99%'}]
					},{
						layout:'form',
						columnWidth:.99,
						items:[{
							layout:'column',
							items:[{
							    layout:'form',
								columnWidth:.99,
								items:[{
									xtype: 'fileuploadfield',  
									id: 'userfile1',
									width:360,
									fieldLabel: '附&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp件',
									emptyText: '',
									name: 'file',
									readOnly:false,
									buttonText: '浏览',
									buttonCfg: {
										width:'65'
										//iconCls: 'exporticon'
									},
									listeners: {
									'fileselected': function(fb, v){
									return;
									var flag = true;
									var path = v;
									if(path.trim()!=="") {
										//验证上传文件类型doc,txt,pdf,xls,rar,DOC,TXT,PDF,XLS,RAR
										//if(path.substring(path.lastIndexOf("."))==".xls"){
										flag = false;
										// var obj = Ext.getCmp('importPanel');
										addnewQuestionform.getForm().submit({
										method : 'POST',
										url: "/common/post/uploadFile.do",
										success : function(){
											var config = {  
												title:'消息',  
												msg: '2'  
											};
											Ext.Msg.show(config);  
											setTimeout(function(){
												Ext.Msg.hide();
											},2000);  
										},
										failure : function() {
											Ext.MessageBox.alert("错误","系统连接超时，请联系管理员或稍后再试!");
										}
										});
										//}
									}  
									if(flag) {
										Ext.Msg.alert('提示', '请选择Excel(.xls)文件！');
									}
									}
									}
								}]
							}]
						}]
					}]
				}]
			});
			Ext.getCmp("addnewQuestionform_questionTime").setValue(time);
			var addwin = new Ext.Window({
				buttonAlign: 'right',
				id:'addwin_newQuestion',
				width:800,
				autoHeight:true,
				closeAction:'close',
				modal: true,
				buttons:[{text :'暂  存',id:'zc',listeners:{'click':function(){
					var config=new Object();
					config.flag="0";
					config.questionUser=Ext.getCmp("addnewQuestionform_questionPreson").getValue();
					config.questiondate=Ext.getCmp("addnewQuestionform_questionTime").getValue();
					config.questionname=Ext.getCmp("addnewQuestionform_questionTitle").getValue();//
					config.questioncontent=Ext.getCmp("addnewQuestionform_questionContent").getValue();//
					config.telnumber=Ext.getCmp("addnewQuestionform_questionTelephone").getValue();
					config.questiontype=Ext.getCmp("addquestiontype").comvalue;
					config.questionleveltype=Ext.getCmp("questionleveltype").getValue()+"";
					config.questionagency=Ext.getCmp("addnewQuestionform_questionUnit").getValue();
					if(config.telnumber.length>30){
						alert("联系电话不能大于30位");
						return;
					}
					if(config.telnumber.trim().length>0){
						var strTemp= "0123456789-()#+"; 
						var str = config.telnumber.trim()
						for(var k = 0;k < str.length;k ++){
							if(strTemp.indexOf(str.charAt(k))==-1){
								alert("联系电话格式不符合");
								return;
							}
						}
					}
					if(config.questionname.length>100){
						alert("提问标题不能大于100字");
						return;
					}
				    if(config.questioncontent.length>500){
						alert("提问内容不能大于500字");
						return;
					}
					gridid=1;
					Ext.getCmp('zc').setDisabled(true);
					Ext.getCmp('fb').setDisabled(true);
					if(config.telnumber!=null&&config.telnumber!=""&&config.telnumber!=telnumber){
						telnumber=config.telnumber;
						Ext.lt.RCP.server("useonliehelp", "addTel", config.telnumber,function (resp) {
							saveQuit();//上传附件
						});
					}else{
						saveQuit();//上传附件
					}
				}}},{text:'提  交',id:'fb',listeners:{'click':function(){
					var config=new Object();
					config.flag="1";
					config.questionUser=Ext.getCmp("addnewQuestionform_questionPreson").getValue();
					config.questiondate=Ext.getCmp("addnewQuestionform_questionTime").getValue();
					config.questionname=Ext.getCmp("addnewQuestionform_questionTitle").getValue();//
					config.questioncontent=Ext.getCmp("addnewQuestionform_questionContent").getValue();//
					config.telnumber=Ext.getCmp("addnewQuestionform_questionTelephone").getValue();
					config.questiontype=Ext.getCmp("addquestiontype").comvalue;
					config.questionleveltype=Ext.getCmp("questionleveltype").getValue()+"";
					config.questionagency=Ext.getCmp("addnewQuestionform_questionUnit").getValue();
					if(config.questiontype==""||config.questiontype=="00000"){
						alert("问题类型不能为空");
						return;}
					if(config.questionleveltype==""){
						alert("紧急类型不能为空");
						return;}	
					if(config.telnumber.trim().length==0){
						alert("联系电话不能为空");
						return;}else if(config.telnumber.length>30){
							alert("联系电话不能大于30位");
							return;
						}
					if(config.telnumber.trim().length>0){
						var strTemp= "0123456789-()#+"; 
						var str = config.telnumber.trim()
						for(var k = 0;k < str.length;k ++){
							if(strTemp.indexOf(str.charAt(k))==-1){
								alert("联系电话格式不符合");
								return;
							}
						}
					}
					if(config.questionname.trim().length==0){
						alert("提问标题不能为空");
						return;}else if(config.questionname.length>100){
							alert("提问标题不能大于100字");
							return;
						}
					if(config.questioncontent.trim().length==0){
						alert("提问内容不能为空");
						return;
					}else if(config.questioncontent.length>500){
							alert("提问内容不能大于500字");
							return;
					}
					gridid=2;
					Ext.getCmp('zc').setDisabled(true);
					Ext.getCmp('fb').setDisabled(true);
					if(config.telnumber!=null&&config.telnumber!=""&&config.telnumber!=telnumber){
						telnumber=config.telnumber;
						Ext.lt.RCP.server("useonliehelp", "addTel", config.telnumber,function (resp) {
							saveQuit();//上传附件
						});
					}else{
						saveQuit();//上传附件
					}
				}}}],
				items:[addnewQuestionform],
				listeners: {'close': function() {filecount=1;answerfile=1;}} 
			});
			addwin.show();
	}
	//------------------------------------------------------------------
	/***
	 * 查看问题
	 */
	newquestionGrid.showPanel=function(){
		var rows = newquestionGrid.getSelectionModel().getSelections();
		if(rows.length<1){alert("请选择要查看的数据");return;}else if(rows.length>1){alert("请选择一条数据查看");return;}
		var shownewQuestionform ;
		if(rows[0].get("userstatus")==0){
			shownewQuestionform= new Ext.form.FormPanel({
				id:'shownewQuestionform',
				labelWidth:65 ,
				title: '提问信息明细',
				frame:true,
				layout:'fit',
				height:303,
				items:[{
					layout:'column',
					items:[{
						columnWidth:.5,
						layout: 'form',
						items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提 问 人 ',id:'showusername',anchor:'96%'},
						       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问单位',id:'showquestionProcess',anchor:'96%'},
						       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'问题类型',id:'showquestionArea',anchor:'96%'}]
					},{
						layout:'form',
						columnWidth:.5,
						items:[{
								columnWidth:.5,
								layout: 'form',
								items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问时间',id:'showQuestiondate',anchor:'96%'},
							       	   {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'联系电话',id:'showquestionTelephone',anchor:'96%'}
								  ]
							  },{
								layout: 'column',
								items:[{
										columnWidth:.5,
										layout: 'form',
										items:[{xtype:'combo',readOnly:true,style:'background:#E6E6E6',fieldLabel:'问题状态',id:'showquestionstate',anchor:'90%'
									    	  ,displayField:'text',
								               valueField:'value',
								               triggerAction:"all",
								               typeAhead: true,
							                   store:elementcodeStroe
								   	   }]
							 	 },{
										columnWidth:.5,
										layout: 'form',
										items:[{xtype:'combo',readOnly:true,style:'background:#E6E6E6',fieldLabel:'紧急类型',id:'showadminleveltype',anchor:'90%',
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
					items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问标题',id:'showquestionTitle',anchor:'99%'},
					       {xtype:'textarea',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问内容',height:130,id:'showquestionContent',anchor:'99%'}]
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
			shownewQuestionform= new Ext.form.FormPanel({
				id:'shownewQuestionformhaveasnwer',
				labelWidth:65 ,
				title: '提问信息明细',
				autoScroll:true,  
				frame:true,
				layout:'fit',
				height:415,
				items:[{
					layout:'column',
					items:[{
						columnWidth:.5,
						layout: 'form',
						items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提 问 人 ',id:'showusername',anchor:'96%'},
						       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问单位',id:'showquestionProcess',anchor:'96%'},
						       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'问题类型',id:'showquestionArea',anchor:'96%'}]
					},{
						layout:'form',
						columnWidth:.5,
						items:[{
								columnWidth:.5,
								layout: 'form',
								items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问时间',id:'showQuestiondate',anchor:'96%'},
							       	   {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'联系电话',id:'showquestionTelephone',anchor:'96%'}
								  ]
							  },{
								layout: 'column',
								items:[{
										columnWidth:.5,
										layout: 'form',
										items:[{xtype:'combo',readOnly:true,style:'background:#E6E6E6',fieldLabel:'问题状态',id:'showquestionstate',anchor:'90%'
									    	  ,displayField:'text',
								               valueField:'value',
								               triggerAction:"all",
								               typeAhead: true,
							                   store:elementcodeStroe
								   	   }]
							 	 },{
										columnWidth:.5,
										layout: 'form',
										items:[{xtype:'combo',readOnly:true,style:'background:#E6E6E6',fieldLabel:'紧急类型',id:'showadminleveltype',anchor:'90%',
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
					items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问标题',id:'showquestionTitle',anchor:'99%'},
					       {xtype:'textarea',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问内容',height:90,id:'showquestionContent',anchor:'99%'}]
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
					},{
						columnWidth:.5,
						layout: 'form',
						items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'答 复 人 ',id:'showansweruser',anchor:'96%'}]
					},{
						columnWidth:.5,
						layout: 'form',
						items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'答复时间',id:'showanswerdate',anchor:'96%'}]
					},{
						layout:'form',
						columnWidth:.99,
						items:[{xtype:'textarea',readOnly:true,style:'background:#E6E6E6',fieldLabel:'答复内容',height:90,id:'showanswerContent',anchor:'99%'}]
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
		  					//Ext.getCmp('showfile'+filecount).setValue('<a href="/portal/onlinehelpdownLoad.do?path='+filepath+'">'+resp[k]+'</a>');
		  					Ext.getCmp('showfile'+filecount).setValue('<a href="'+onlinehelpurl+'/portaldownloadfile.page?path='+filepath+'">'+resp[k]+'</a>');
							filecount++;
		  			}
		  		}
		    });
		}else{
			var temph = Ext.getCmp('showquestionContent').height;
			temph=temph+20;
			Ext.getCmp('showfile1').hide();
			Ext.getCmp('showfile1').hideLabel=true;
			Ext.getCmp('showquestionContent').setHeight(temph);
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
		}else if(Ext.getCmp("showansweruser")!=null){
			var temph = Ext.getCmp('showanswerContent').height;
			temph=temph+20;
			Ext.getCmp('showanswerfile1').hide();
			Ext.getCmp('showanswerfile1').hideLabel=true;
			Ext.getCmp('showanswerContent').setHeight(temph);
		}
		var showwin = new Ext.Window({
			buttonAlign: 'right',
			id:'showwin_newQuestion',
			width:800,
			autoHeight:true,
			closeAction:'close',
			modal: true,
			items:[shownewQuestionform],
			buttons:[{text :'关  闭',listeners:{'click':function(){showwin.close();}}}],
			listeners: {'close': function() {filecount=1;answerfile=1;}} 
		});
		Ext.getCmp("showusername").setValue(rows[0].get("questionuser"));
		Ext.getCmp("showQuestiondate").setValue(rows[0].get("questiondate"));
		Ext.getCmp("showquestionstate").setValue(rows[0].get("userstatus"));
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
			Ext.getCmp('showquestionArea').setValue(names);
		}
		Ext.getCmp("showquestionTelephone").setValue(rows[0].get("telnumber"));
		Ext.getCmp("showquestionProcess").setValue(rows[0].get("questionagency"));
		Ext.getCmp("showquestionTitle").setValue(rows[0].get("questionname"));
		Ext.getCmp("showquestionContent").setValue(rows[0].get("questioncontent"));
		if(Ext.getCmp("showansweruser")!=null){
			Ext.getCmp("showansweruser").setValue(rows[0].get("answeruser"));
			Ext.getCmp("showanswerdate").setValue(rows[0].get("answerdate"));
			Ext.getCmp("showanswerContent").setValue(rows[0].get("answercontent"));
		}
		var level = rows[0].get("leveltype");
		if(level!=0){
			Ext.getCmp("showadminleveltype").setValue(level);
		}
		showwin.show();
		
	}
	//查询--------------------------------------------------------------------------------
	function loadGridPanel(){
		curpage=1;
		pager.cursor=0;
		pager.inputItem.setValue(1);
		var search = new Object();
		search.flag="0"
		search.area=localquestionarea;
		search.usercode=usercode;
		search.username=username;
		Ext.lt.RCP.script(onlinehelpurl,"useonliehelp", "query", search,function (resp) {
			data=resp;
			store.loadData(GetPagerData(resp));
			pager.doLoad(0);
			newquestionGrid.doLayout();
		});
	}
	newquestionGrid.loadGrid=function(search){
		curpage=1;
		pager.cursor=0;
		pager.inputItem.setValue(1);
		search.area=localquestionarea;
		search.usercode=usercode;
		search.username=username;
		Ext.lt.RCP.script(onlinehelpurl,"useonliehelp", "query", search,function (resp) {
			data=resp;
			store.loadData(GetPagerData(resp));
			pager.doLoad(0);
			newquestionGrid.doLayout();
		});
	}
	//提交-----------------------------------------------------------------------------------------
	newquestionGrid.publish=function(){
		var rows = newquestionGrid.getSelectionModel().getSelections();
		if(rows.length<1){alert("请选择要提交的待处理数据");return;}
		var date = new Date();
		var m =date.getMonth()+1<10?"0"+(date.getMonth()+1):date.getMonth()+1;
	    var h = date.getHours()<10?"0"+date.getHours():date.getHours();
	    var mi = date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes();
	    var s = date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds();
	    var time = date.getYear()+"-"+m+"-"+date.getDate()+" "+h+":"+mi+":"+s;
		var config=new Object();
		var strs='';
		for(var i = 0;i<rows.length;i++){
			if(rows[i].get("userstatus")==1){alert("该问题已经提交");return;}
			if(rows[i].get("userstatus")==2){alert("该问题已经答复,请确认答复内容是否满意");return;}
			if(rows[i].get("userstatus")==3){alert("该问题已经退回等待重新答复");return;}
			config.itemid=rows[i].get("itemid");
			config.questiondate=time;
			config.questionname=rows[i].get("questionname");
			config.questioncontent=rows[i].get("questioncontent");
			config.telnumber=rows[i].get("telnumber");
			config.questiontype=rows[i].get("questiontype");
			config.username=username;
			if(config.questiontype==null||config.questiontype.trim().length==0){
				alert("问题类型不能为空");
				return;}
			if(config.telnumber==null||config.telnumber.trim().length==0){
				alert("联系电话不能为空");
				return;}
			if(config.questionname==null||config.questionname.trim().length==0){
				alert("提问标题不能为空");
				return;}
			if(config.questioncontent==null||config.questioncontent.trim().length==0){
				alert("提问内容不能为空");
				return;}
			 strs+="'"+rows[i].get("itemid")+"',";
		}
		config.itemids=strs;
		Ext.lt.RCP.script(onlinehelpurl,"useonliehelp", "publish", config,function (resp) {
			alert("提交成功");
			loadGridPanel();
		},function(){});
		
	}
	//确认为是否满意----------------------------------------------------------------------------------------
	newquestionGrid.notarize=function(){
		var rows = newquestionGrid.getSelectionModel().getSelections();
		if(rows.length<1){alert("请选择待确认的数据");return;}
		if(rows.length>1){alert("请选择一条待确认的数据");return;}
		if(rows[0].get("userstatus")==0){alert("该问题尚未提交");return;}
		if(rows[0].get("userstatus")!=2){alert("该问题尚未获得答复");return;}
		var date = new Date();
		var m =date.getMonth()+1<10?"0"+(date.getMonth()+1):date.getMonth()+1;
	    var h = date.getHours()<10?"0"+date.getHours():date.getHours();
	    var mi = date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes();
	    var s = date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds();
	    var time = date.getYear()+"-"+m+"-"+date.getDate()+" "+h+":"+mi+":"+s;
	    var config=new Object();
		config.itemid=rows[0].get("itemid");
		config.notarizedate=time;//确认时间
		config.notarizeuser=rows[0].get("questionuser");
		config.adminstatus=rows[0].get("adminstatus");
		config.superadminstatus=rows[0].get("superadminstatus");
		var notarizeform = new Ext.form.FormPanel({
			id:'notarizeform',
			labelWidth:65 ,
			title: '提问信息明细',
			frame:true,
			layout:'fit',
			height:455,
			items:[{
					layout:'column',
					items:[{
						columnWidth:.5,
						layout: 'form',
						items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',height:'20px',fieldLabel:'提 问 人 ',id:'notarize_questionPreson',anchor:'96%'},
						       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问单位',id:'notarize_questionagency',anchor:'96%'},
						       {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',height:'20px',fieldLabel:'问题类型',id:'notarizem_questiontype',anchor:'96%'}]
					},{
						layout:'form',
						columnWidth:.5,
						items:[{
								columnWidth:.5,
								layout: 'form',
								items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问时间',id:'notarize_questionTime',anchor:'96%'},
							       	   {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'联系电话',id:'notarize_questionTelephone',anchor:'96%'}
								  ]
							  },{
								layout: 'column',
								items:[{
										columnWidth:.5,
										layout: 'form',
										items:[{xtype:'combo',readOnly:true,style:'background:#E6E6E6',fieldLabel:'问题状态',id:'notarize_questionstatus',anchor:'90%'
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
						items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问标题',id:'notarize_questionTitle',anchor:'99%'},
					       {xtype:'textarea',readOnly:true,style:'background:#E6E6E6',fieldLabel:'提问内容',height:80,id:'notarize_questionContent',anchor:'99%'}]
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
								      id:'notarizeshowfile1',    
								      fieldLabel: '附&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp件',     
								      value:''    
									}]
							  }]
						}]
				},{
					columnWidth:.5,
					layout: 'form',
					items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'答 复 人 ',id:'notarize_answeruser',anchor:'96%'}]
				},{
					columnWidth:.5,
					layout: 'form',
					items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',fieldLabel:'答复时间',id:'notarize_answerdate',anchor:'96%'}]
				},{
					layout:'form',
					columnWidth:.99,
					items:[{xtype:'textarea',readOnly:true,style:'background:#E6E6E6',fieldLabel:'答复内容',height:80,id:'notarize_answerContent',anchor:'99%'}
					]
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
								      id:'answershowfile1',    
								      fieldLabel: '附&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp件',     
								      value:''    
									},{xtype:'textfield',hidden:true,readOnly:true,style:'background:#E6E6E6',hideLabel:true,fieldLabel:'',id:'notarize_useritemid'}]
							   }]
						  }]
				},{
					layout:'form',
					columnWidth:.99,
					items:[{xtype:'textarea',fieldLabel:'用户意见:'+"<font  color='red'>(100字以内)</font>",labelSeparator:'',height:50,id:'notarize_useradvice',anchor:'99%'}
					]
				}]
			}]
		});
		//查看用户附件
		var fileid = rows[0].get("fileid");
		if(fileid!=null&&fileid!=""){
		var tempids = fileid.split("@"); 	
			//查询附件名字
		    Ext.lt.RCP.script(onlinehelpurl,"useonliehelp", "findfilename", fileid,function (resp) {
		  		for(var k = 0;k < resp.length;k ++){
		  			if(resp[k]!=""){
		  					var filepath=tempids[k]+"";
		  				  	Ext.getCmp('notarizeshowfile'+filecount).show();
		  					Ext.getCmp('notarizeshowfile'+filecount).setValue('<a href="'+onlinehelpurl+'/portaldownloadfile.page?path='+filepath+'">'+resp[k]+'</a>');
							filecount++;
		  			} 
		  		}
		    });
		}else{
			var temph = Ext.getCmp('notarize_questionContent').height;
			temph=temph+20;
			Ext.getCmp('notarizeshowfile1').hide();
			Ext.getCmp('notarizeshowfile1').hideLabel=true;
			Ext.getCmp('notarize_questionContent').setHeight(temph);
		}
		//查看答复附件
		var adminfileid = rows[0].get("adminfileid");
		if(adminfileid!=null&&adminfileid!=""){
		var tempids = adminfileid.split("@");
			//查询附件名字
		    Ext.lt.RCP.script(onlinehelpurl,"useonliehelp", "findfilename", adminfileid,function (resp) {
		  		for(var k = 0;k < resp.length;k ++){
		  			if(resp[k]!=""){
		  					var filepath=tempids[k]+"";
		  				  	Ext.getCmp('answershowfile'+answerfile).show();
		  					Ext.getCmp('answershowfile'+answerfile).setValue('<a href="'+onlinehelpurl+'/portaldownloadfile.page?path='+filepath+'">'+resp[k]+'</a>');
							answerfile++;
		  			}
		  		}
		    });
		}else{
			var temph = Ext.getCmp('notarize_answerContent').height;
			temph=temph+20;
			Ext.getCmp('answershowfile1').hide();
			Ext.getCmp('answershowfile1').hideLabel=true;
			Ext.getCmp('notarize_answerContent').setHeight(temph);
		}	
		var notarizewin = new Ext.Window({
			buttonAlign: 'right',
			id:'notarizewin',
			width:800,
			autoHeight:true,
			closeAction:'close',
			modal: true,
			items:[notarizeform],
			listeners: {
				'close': function() {
					filecount=1;
					answerfile=1;//答复附件数量
				} 
			},
			buttons:[{text :'满  意',listeners:{'click':function(){
							var useradvice = Ext.getCmp('notarize_useradvice').getValue();
							if(useradvice.length>100){
								alert("用户意见不能大于100字");
								return;
							}
							if(confirm("确认提交吗？")){
								config.givebackadvice=useradvice;
								Ext.lt.RCP.script(onlinehelpurl,"useonliehelp", "open", config,function (resp) {
									loadGridPanel();
									notarizewin.close();
								},function(){});
							}
					 }}},
					 {text :'不满意',listeners:{'click':function(){
					 		var useradvice = Ext.getCmp('notarize_useradvice').getValue();
					 		if(useradvice.trim().length==0){
					 			alert("请输入用户意见");return;
					 		}
					 		if(useradvice.length>100){
								alert("用户意见不能大于100字");return;
							}
						 	if(confirm("确认提交吗？")){
								config.givebackadvice=useradvice;
								Ext.lt.RCP.script(onlinehelpurl,"useonliehelp", "giveback", config,function (resp) {
									loadGridPanel();
									notarizewin.close();
								},function(){});
							}
					 }}}]
		});
		Ext.getCmp("notarize_questionPreson").setValue(rows[0].get("questionuser"));
		Ext.getCmp("notarize_questionTime").setValue(rows[0].get("questiondate"));
		Ext.getCmp("notarize_questionstatus").setValue(rows[0].get("userstatus"));
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
			Ext.getCmp('notarizem_questiontype').setValue(names);
		}
		Ext.getCmp("adminleveltype").setValue(rows[0].get("leveltype"));
		Ext.getCmp("notarize_questionTelephone").setValue(rows[0].get("telnumber"));
		Ext.getCmp("notarize_questionagency").setValue(rows[0].get("questionagency"));
		Ext.getCmp("notarize_questionTitle").setValue(rows[0].get("questionname"));
		Ext.getCmp("notarize_questionContent").setValue(rows[0].get("questioncontent"));
		Ext.getCmp("notarize_answeruser").setValue(rows[0].get("answeruser"));
		Ext.getCmp("notarize_answerdate").setValue(rows[0].get("answerdate"));
		Ext.getCmp("notarize_answerContent").setValue(rows[0].get("answercontent"));
		Ext.getCmp("notarize_useritemid").setValue(rows[0].get("itemid"));
		Ext.getCmp("adminleveltype").setValue(rows[0].get("leveltype"));
		notarizewin.show();
	}
	//删除-------------------------------------------------------------------------------
	newquestionGrid.delGridPanel = function(){
	var rows = newquestionGrid.getSelectionModel().getSelections();
	if(rows.length<1){
		alert("请选择要删除的数据");	
		return;
	}
	var codes ="";
	var delfiles ="";
	for(var i = 0;i < rows.length;i ++){
		if(rows[i].get("userstatus")!=0){
			alert("只能删除暂存的问题");
			return;
		}
		codes += "'"+rows[i].get("itemid")+"',";
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
	if(confirm("确认删除数据吗？")){
		var para = {};
		para.codes = codes;
		para.delfiles = delfiles;
		Ext.lt.RCP.script(onlinehelpurl,"useonliehelp", "del", para,function (resp) {
				loadGridPanel();
		});
	}
	};
	/***
	 *查看问题流程-----------------------------------------------------------------------------------------------------
	 */
	newquestionGrid.processflow = function(){
		var rows = newquestionGrid.getSelectionModel().getSelections();
		if(rows.length<1){
				alert("请选择要查看流程的数据");	return;
		}else if(rows.length>1){
				alert("请选择一条数据");return;
		}
		if(rows[0].get("userstatus")==0){
			alert("该问题尚未提交");return;
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
	//loadGridPanel();
	return newquestionGrid;
}	
		function addsave1(){
				    var config=new Object();
					config.flag="0";
					config.questionUser=Ext.getCmp("addnewQuestionform_questionPreson").getValue();
					config.questiondate=Ext.getCmp("addnewQuestionform_questionTime").getValue();
					config.questionname=Ext.getCmp("addnewQuestionform_questionTitle").getValue();//
					config.questioncontent=Ext.getCmp("addnewQuestionform_questionContent").getValue();//
					config.telnumber=Ext.getCmp("addnewQuestionform_questionTelephone").getValue();
					config.questiontype=Ext.getCmp("addquestiontype").comvalue;
					config.questionleveltype=Ext.getCmp("questionleveltype").getValue();
					config.questionagency=Ext.getCmp("addnewQuestionform_questionUnit").getValue();
					config.usercode=usercode;
					config.area=localquestionarea;
					Ext.lt.RCP.script(onlinehelpurl,"useonliehelp", "save", config,function (resp) {
						var search= {};
						search.flag="0";//待处理
					 	Ext_lt_NewQuestion.loadGrid(search);
					 	Ext.getCmp('addwin_newQuestion').close();
						userTabPanel.setActiveTab(0);
					});
		}
		function addsave2(){
			    var config=new Object();
				config.flag="1";
				config.questionUser=Ext.getCmp("addnewQuestionform_questionPreson").getValue();
				config.questiondate=Ext.getCmp("addnewQuestionform_questionTime").getValue();
				config.questionname=Ext.getCmp("addnewQuestionform_questionTitle").getValue();//
				config.questioncontent=Ext.getCmp("addnewQuestionform_questionContent").getValue();//
				config.telnumber=Ext.getCmp("addnewQuestionform_questionTelephone").getValue();
				config.questiontype=Ext.getCmp("addquestiontype").comvalue;
				config.questionleveltype=Ext.getCmp("questionleveltype").getValue();
				config.questionagency=Ext.getCmp("addnewQuestionform_questionUnit").getValue();
				config.area=localquestionarea;
				config.usercode=usercode;
				Ext.lt.RCP.script(onlinehelpurl,"useonliehelp", "save", config,function (resp) {
					if(userTabPanel.getActiveTab().id=='overquestionGrid'){
					 	 var temp= {};
						 temp.flag="1";
  			 			 Ext_lt_ReplyQuestion.loadGrid(temp);
					}else{
						userTabPanel.setActiveTab(1);	
					}
					Ext.getCmp('addwin_newQuestion').close();
				});
		}
		function modsave3(){
				var config=new Object();
				config.flag="0";
				config.itemid=Ext.getCmp("moditemid").getValue();
				config.questionUser=Ext.getCmp("updatenewQuestionform_questionPreson").getValue();
				config.questiondate=Ext.getCmp("updatenewQuestionform_questionTime").getValue();
				config.questionname=Ext.getCmp("updatenewQuestionform_questionTitle").getValue()+"";//
				config.questioncontent=Ext.getCmp("updatenewQuestionform_questionContent").getValue()+"";//
				config.telnumber=Ext.getCmp("updatenewQuestionform_questionTelephone").getValue()+"";
				config.questiontype=Ext.getCmp("updatequestionArea").comvalue;
				config.questionleveltype=Ext.getCmp("updatenewQuestionform_leveltype").getValue();
				config.oldfileids=fileids;
				config.username=username;
				config.usercode=usercode;
				config.area=localquestionarea;
				Ext.lt.RCP.script(onlinehelpurl,"useonliehelp", "update", config,function (resp) {
					var search= {};
					search.flag="0";//待处理
				 	Ext_lt_NewQuestion.loadGrid(search);
				 	Ext.getCmp('updatewin_newQuestion').close();
					userTabPanel.setActiveTab(0);
				});
		}
		function modsave4(){
				var config=new Object();
				config.flag="1";
				config.itemid=Ext.getCmp("moditemid").getValue();
				config.questionUser=Ext.getCmp("updatenewQuestionform_questionPreson").getValue();
				config.questiondate=Ext.getCmp("updatenewQuestionform_questionTime").getValue();
				config.questionname=Ext.getCmp("updatenewQuestionform_questionTitle").getValue();//
				config.questioncontent=Ext.getCmp("updatenewQuestionform_questionContent").getValue();//
				config.telnumber=Ext.getCmp("updatenewQuestionform_questionTelephone").getValue();
				config.questiontype=Ext.getCmp("updatequestionArea").comvalue;
				config.questionleveltype=Ext.getCmp("updatenewQuestionform_leveltype").getValue();
				config.oldfileids=fileids;
				config.username=username;
				config.usercode=usercode;
				config.area=localquestionarea;
				Ext.lt.RCP.script(onlinehelpurl,"useonliehelp", "update", config,function (resp) {
					if(userTabPanel.getActiveTab().id=='overquestionGrid'){
					 	 var temp= {};
						 temp.flag="1";
  			 			 Ext_lt_ReplyQuestion.loadGrid(temp);
					}else{
						userTabPanel.setActiveTab(1);	
					}
					Ext.getCmp('updatewin_newQuestion').close();
				});
		}
