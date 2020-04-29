Ext_lt_oneKeyHelp = function(){	
	var date = new Date();
	var m =date.getMonth()+1<10?"0"+(date.getMonth()+1):date.getMonth()+1;
    var h = date.getHours()<10?"0"+date.getHours():date.getHours();
    var mi = date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes();
    var s = date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds();
    //提问时间
    var time = date.getYear()+"-"+m+"-"+date.getDate()+" "+h+":"+mi+":"+s;
	var redStar="<font color='red'>&nbsp*</font>";
	//查询需要的信息,用户电话、问题类型、紧急类型、问题存储地址、提问地区
	Ext.lt.RCP.server("useonliehelp", "findAllInfo", null,function (resp) { 
		var telnumber = resp.telnumber;
		onlinehelpurl = resp.onlinehelpurl;
		localarea = resp.localarea;
		useragency = resp.useragency;
		//问题类型下拉框
		var comstore = new Ext.data.Store({
			proxy: new Ext.data.MemoryProxy(resp.typemap),
			reader: new Ext.data.JsonReader({}, [{name:'itemid'},
			            {name:'name'}
			            ])
	 			})
		comstore.load();
		var typecombos = new Ext.form.ComboBox({
			id:'help_questiontype',
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
	            '<div  class="done"  onclick="checkCombo({itemid})" onmouseover="this.className=\'mytplover\'" onmouseout="this.className=\'mytplout\'">' +   
	            '<input type="checkbox" name="checktype" id={itemid} value={name}  onclick="checkCombo({itemid});" />{name}' +   
	        	'</div>'+    
	          '</tpl>' 
		});
		typecombos.onViewClick = function(doFocus){
		};
		typecombos.on('collapse',function(){
			var nodes = document.getElementsByName("checktype");
			if(nodes.length!=0){
				typecombos.setValue("");
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
			Ext.getCmp('help_questiontype').setValue(names);
			Ext.getCmp('help_questiontype').comvalue=codes;
			Ext.getCmp('help_questiontype').names=names;
		})

		//紧急类型下拉框
		var levelstore = new Ext.data.Store({
			 proxy: new Ext.data.MemoryProxy(resp.levelmap.data),
			 reader: new Ext.data.JsonReader({}, [{name:'itemid'},{name:'questionlevel'}])
		})
		levelstore.load();
		var levelcombos = new Ext.form.ComboBox({
			id:'help_questionlevel',
			editable: false,
			fieldLabel:'紧急类型:'+redStar,
			labelSeparator:'',
		    store:levelstore,
			anchor:'96%',
			emptyText: '请选择紧急类型',
			mode:'local',
			triggerAction: 'all',	
			width:130,
			displayField:"questionlevel",
		    valueField:"itemid"
		});
		var comdata;
		var comstore = new Ext.data.Store({
			 proxy: new Ext.data.MemoryProxy(comdata),
			 reader: new Ext.data.JsonReader({}, [{name:'itemid'},
					            {name:'name'}
					            ])
			 			})
		comstore.load();
		
		//form表单
		var helpform = new Ext.form.FormPanel({
				id:'helpform',
				labelWidth:70 ,
				width:700,
				frame:true,
				//renderTo:'newID',
				layout:'fit',
				height:410,
			 	defaults: {
			 		allowBlank: false,
				    msgTarget: 'side'
			    },
				items:[{
					layout:'column',
					items:[{
						columnWidth:.5,
						layout: 'form',
						items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',value:username,fieldLabel:'提 问 人 ',id:'help_questionuser',anchor:'96%'},
							   {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',value:useragency!=""?useragency.trim():"",fieldLabel:'提问单位 ',id:'help_questionagency',anchor:'96%'},
							   typecombos]
					},{
					layout:'form',
					columnWidth:.5,
					items:[{
						columnWidth:.5,
						layout: 'form',
						items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',value:time,fieldLabel:'提问时间',id:'help_questiondate',anchor:'96%'},
							   {xtype:'textfield',labelSeparator:'',readOnly:false,value:telnumber,fieldLabel:'联系电话:'+redStar,id:'help_questiontel',anchor:'96%'},
							   levelcombos]
					}]
					},{
						layout:'form',
						columnWidth:.99,
						items:[
						{xtype:'textfield',readOnly:false,fieldLabel:'提问标题:'+redStar,labelSeparator:'',id:'help_questionname',anchor:'99%'}
						]
					},{
						layout:'form',
						columnWidth:.99,
						items:[{xtype:'textarea',readOnly:false,fieldLabel:'提问内容:'+redStar+"<font  color='red'>(500字以内)</font>",labelSeparator:'',height:190,id:'help_questioncontent',anchor:'99%'}]
					},{
						layout:'form',
						columnWidth:.99,
						items:[{
							xtype: 'fileuploadfield',  
							id: 'userfile',
							width:360,
							fieldLabel: '附&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp件',
							emptyText: '支持类型：'+types,
							name: 'file',
							readOnly:false,
							buttonText: '浏览&nbsp&nbsp&nbsp&nbsp',
							buttonCfg: {
								width:'65',
								iconCls: 'exporticon'
							},	
							listeners: {
								'fileselected': function(fb, v){
									if(picImgId!=''){
										Ext.lt.CaptureScreen.del(picImgId);
									}
									var path = v;
									if(path.trim()!=="") {
										path=path.substring(path.lastIndexOf(".")+1);
										//验证上传文件类型types
										if(types.indexOf(path)==-1){
											alert("附件类型只能支持（"+types+"）类型！");
											Ext.getCmp('userfile').setValue("");
											//Ext.Msg.alert('提示', '附件类型只能支持（'+types+'）类型！')
									     	return ;
										}
									}  
								 }
						     }
						}]
					}]
				}],
				//buttonAlign:'center',  
			    buttons:[{text:'截取当前屏幕',listeners:{'click':function(){
			    			cutWin();
			    		 }}},
			    		 {text:'预览截图',id:'prePic',disabled:true,listeners:{'click':function(){
			    			 previewWin();
				    	 }}},
			    		 {text:'下载截图',id:'downPic',disabled:true,listeners:{'click':function(){
			    			 downloadWin();
				         }}},
			             {text :'暂  存',id:'zc',listeners:{'click':function(){
			    				var config=new Object();
								config.flag="0";
								config.usercode=usercode;
								config.area=localarea;
								config.questionUser=Ext.getCmp("help_questionuser").getValue();
								config.questionagency=Ext.getCmp("help_questionagency").getValue();
								config.questiondate=Ext.getCmp("help_questiondate").getValue();
								config.questionname=Ext.getCmp("help_questionname").getValue();
								config.questioncontent=Ext.getCmp("help_questioncontent").getValue();
								config.telnumber=Ext.getCmp("help_questiontel").getValue();
								config.questiontype=Ext.getCmp("help_questiontype").comvalue;
								config.questionleveltype=Ext.getCmp("help_questionlevel").getValue()+"";
								if(config.telnumber.length>30){
									alert("联系电话不能大于30位");return;
								}
								if(config.telnumber.trim().length>0){
									var strTemp= "0123456789-()#+"; 
									var str = config.telnumber.trim()
									for(var k = 0;k < str.length;k ++){
										if(strTemp.indexOf(str.charAt(k))==-1){
											alert("联系电话格式不符合");return;
										}
									}
								}
								if(config.questionname.length>100){
									alert("提问标题不能大于100字");return;
								}
							    if(config.questioncontent.length>500){
									alert("提问内容不能大于500字");return;
								}
								gridid=0;
								//点击暂存或者提交后,是按钮不可用，防止多次提交
								Ext.getCmp('zc').setDisabled(true);
								Ext.getCmp('fb').setDisabled(true);
								_config=config;
								//如果电话与上次电话不一样，则记录这的电话
								if(config.telnumber!=null&&config.telnumber!=""&&config.telnumber!=telnumber){
									telnumber=config.telnumber;
									Ext.lt.RCP.server("useonliehelp", "addTel", config.telnumber,function (resp) {
										saveQuit(config);//上传附件
								});
								}else{
									saveQuit(config);//上传附件
								}
						 }}},
						 {text:'提  交',id:'fb',listeners:{'click':function(){
							 	var config=new Object();
								config.flag="1";
								config.usercode=usercode;
								config.area=localarea;
								config.questionUser=Ext.getCmp("help_questionuser").getValue();
								config.questionagency=Ext.getCmp("help_questionagency").getValue();
								config.questiondate=Ext.getCmp("help_questiondate").getValue();
								config.questionname=Ext.getCmp("help_questionname").getValue();
								config.questioncontent=Ext.getCmp("help_questioncontent").getValue();
								config.telnumber=Ext.getCmp("help_questiontel").getValue();
								config.questiontype=Ext.getCmp("help_questiontype").comvalue;
								config.questionleveltype=Ext.getCmp("help_questionlevel").getValue()+"";
								if(config.questiontype==null||config.questiontype==""){
									alert("问题类型不能为空");return;}
								if(config.questionleveltype==""){
									alert("紧急类型不能为空");return;
								}	
								if(config.telnumber.trim().length==0){
									alert("联系电话不能为空");return;
								}else if(config.telnumber.length>30){
										alert("联系电话不能大于30位");return;
								}
								if(config.telnumber.trim().length>0){
									var strTemp= "0123456789-()#+"; 
									var str = config.telnumber.trim()
									for(var k = 0;k < str.length;k ++){
										if(strTemp.indexOf(str.charAt(k))==-1){
											alert("联系电话格式不符合");return;
										}
									}
								}
								if(config.questionname.trim().length==0){
									alert("提问标题不能为空");return;
								}else if(config.questionname.length>100){
									alert("提问标题不能大于100字");return;
								}
								if(config.questioncontent.trim().length==0){
									alert("提问内容不能为空");return;
								}else if(config.questioncontent.length>500){
									alert("提问内容不能大于500字");return;
								}
								gridid=1;
								//点击暂存或者提交后,是按钮不可用，防止多次提交
								Ext.getCmp('zc').setDisabled(true);
								Ext.getCmp('fb').setDisabled(true);
								_config=config;
								//如果电话与上次电话不一样，则记录这的电话
								if(config.telnumber!=null&&config.telnumber!=""&&config.telnumber!=telnumber){
									telnumber=config.telnumber;
									Ext.lt.RCP.server("useonliehelp", "addTel", config.telnumber,function (resp) {
										saveQuit(config);//上传附件
									});
								}else{
									saveQuit(config);//上传附件
								}
						 }}},
						 {text:'关  闭',listeners:{'click':function(){
							 if(picImgId!=''){
									Ext.lt.CaptureScreen.del(picImgId);
							 }
							 closePic();
							 delPic();
						 }}}]
			});
		//显示的panel
		var helppanel = new Ext.Panel({
			id:'helppanel',
			bodyStyle:'margin:0px 0px 0px 0px;',
			border:true,
			title:'提问信息明细',
			//collapsible:true,
			//tools:[{id:"save"},{id:"help"},{id:"close",handler:function(){alert("")}}],
			tools:[{id:"close",handler:function(){
				 if(picImgId!=''){
						Ext.lt.CaptureScreen.del(picImgId);
				 }
				 closePic();
				 delPic();
			}}],
			width:700,
			layout:'fit',
			height:410,
			items:[helpform],
			renderTo:'newID'	
		}); 
	});
}		

	function checkCombo(id){
			var nodes = document.getElementsByName("checktype");
			for(var i=0;i<nodes.length;i++){
				if(nodes[i].id==id){
					if(nodes[i].checked){
						nodes[i].checked=false;
					}else{
						nodes[i].checked=true;
					}
				}	
			}
		}
	//附件上传
	function savefile(config){
		isboosave=true;
		var div=document.getElementById("newID");
		var p=document.getElementById('file').parentNode;
		var fileDiv=document.createElement("div");
		fileDiv.style.visibility='hidden';
		fileDiv.id='fileDiv';	
		var innerHTMLStr="";
		//如果是上传截图的附件去掉ENCTYPE='multipart/form-data' 通过隐藏域提交
		var _value = Ext.getCmp('userfile').getValue();
		if(_value==picImgId+".jpg"){
			innerHTMLStr="<form action ='"+onlinehelpurl+"/portaluploadfile.page?usercode="+usercode+"&localquestionarea="+localarea+"&picId="+picImgId+"' method='post'  id='fileUploadForm' target='fileUploadIfr'>";
		}else{
			innerHTMLStr="<form action ='"+onlinehelpurl+"/portaluploadfile.page?usercode="+usercode+"&localquestionarea="+localarea+"' method='post' ENCTYPE='multipart/form-data' id='fileUploadForm' target='fileUploadIfr'>";
		}
		innerHTMLStr=innerHTMLStr+"<input type='hidden' id='cutPic' name='cutPic' value='"+picContent+"'/>";
		innerHTMLStr=innerHTMLStr+"</form>";
		innerHTMLStr=innerHTMLStr+"<iframe name='fileUploadIfr' id='fileUploadIfr' src='no'></iframe>";
		fileDiv.innerHTML=innerHTMLStr;
		div.appendChild(fileDiv);
		var form = document.getElementById('fileUploadForm');
		var fileuploads = document.getElementsByName('file');
		for(var i=0;i<fileuploads.length;i++){
			if(fileuploads[i].value!=''){
				var fileType=fileuploads[i].value.split(".");
				if(types.indexOf(fileType[fileType.length-1])==-1){
					alert("附件类型只能支持（"+types+"）类型！");
					if(Ext.getCmp('zc')!=null){
						Ext.getCmp('zc').setDisabled(false);
						Ext.getCmp('fb').setDisabled(false);
					}
					isboosave=false;
			     	return false;
				}
				form.appendChild(fileuploads[i]);
			}
		}
		form.submit();
		isNotUpload(config);
		p.appendChild(document.getElementById('file'));
	}
	function isNotUpload(config){
		var para={};
		para.usercode=usercode;
		para.localquestionarea=localarea;
		Ext.lt.RCP.script(onlinehelpurl,"useonliehelp", "findfileid", para,function (resp) {
			if(resp==null||resp==""||resp=="null"){
				window.setTimeout("isNotUpload()",1000);
			}else if(resp=="true"){
				alert('附件上传成功!');
				isboosave=false;
				addsave(config);
			}else if(resp=="false"){
				alert("附件上传失败！");
				if(Ext.getCmp('zc')!=null){
					Ext.getCmp('zc').setDisabled(false);
					Ext.getCmp('fb').setDisabled(false);
				}
				isboosave=false;
				var div=document.getElementById('fileDiv');
				div.parentNode.removeChild(div);
				return true;
			 }
		});
	}
	
	function saveQuit(config){
		var temptype = '支持类型：'+types;
		if(document.getElementById('userfile').value!=temptype){
			//如果含有附件
			if(isboosave){
					alert("附件上传中请稍候...");
					return ;
				}
				savefile(config);//上传附件
		}else{
			addsave(config);
		}				
	}
	
	function addsave(config){
				Ext.lt.RCP.script(onlinehelpurl,"useonliehelp", "save", _config,function (resp) {
					alert("提交成功");
					document.getElementById('previewId').style.display="none";
					delPic();
				},function(resp){"提交失败"+resp});
	}
	