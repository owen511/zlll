Ext_lt_oneKeyHelp = function(){	
	var date = new Date();
	var m =date.getMonth()+1<10?"0"+(date.getMonth()+1):date.getMonth()+1;
    var h = date.getHours()<10?"0"+date.getHours():date.getHours();
    var mi = date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes();
    var s = date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds();
    //����ʱ��
    var time = date.getYear()+"-"+m+"-"+date.getDate()+" "+h+":"+mi+":"+s;
	var redStar="<font color='red'>&nbsp*</font>";
	//��ѯ��Ҫ����Ϣ,�û��绰���������͡��������͡�����洢��ַ�����ʵ���
	Ext.lt.RCP.server("useonliehelp", "findAllInfo", null,function (resp) { 
		var telnumber = resp.telnumber;
		onlinehelpurl = resp.onlinehelpurl;
		localarea = resp.localarea;
		useragency = resp.useragency;
		//��������������
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
			fieldLabel:'��������:'+redStar,
			labelSeparator:'',
			anchor:'96%',
			store: comstore,
			emptyText: '��ѡ����������',
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
					names += (nodes[i].value+"��");
				}	
			}
			names = names.substr(0,names.length-1);
			Ext.getCmp('help_questiontype').setValue(names);
			Ext.getCmp('help_questiontype').comvalue=codes;
			Ext.getCmp('help_questiontype').names=names;
		})

		//��������������
		var levelstore = new Ext.data.Store({
			 proxy: new Ext.data.MemoryProxy(resp.levelmap.data),
			 reader: new Ext.data.JsonReader({}, [{name:'itemid'},{name:'questionlevel'}])
		})
		levelstore.load();
		var levelcombos = new Ext.form.ComboBox({
			id:'help_questionlevel',
			editable: false,
			fieldLabel:'��������:'+redStar,
			labelSeparator:'',
		    store:levelstore,
			anchor:'96%',
			emptyText: '��ѡ���������',
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
		
		//form��
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
						items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',value:username,fieldLabel:'�� �� �� ',id:'help_questionuser',anchor:'96%'},
							   {xtype:'textfield',readOnly:true,style:'background:#E6E6E6',value:useragency!=""?useragency.trim():"",fieldLabel:'���ʵ�λ ',id:'help_questionagency',anchor:'96%'},
							   typecombos]
					},{
					layout:'form',
					columnWidth:.5,
					items:[{
						columnWidth:.5,
						layout: 'form',
						items:[{xtype:'textfield',readOnly:true,style:'background:#E6E6E6',value:time,fieldLabel:'����ʱ��',id:'help_questiondate',anchor:'96%'},
							   {xtype:'textfield',labelSeparator:'',readOnly:false,value:telnumber,fieldLabel:'��ϵ�绰:'+redStar,id:'help_questiontel',anchor:'96%'},
							   levelcombos]
					}]
					},{
						layout:'form',
						columnWidth:.99,
						items:[
						{xtype:'textfield',readOnly:false,fieldLabel:'���ʱ���:'+redStar,labelSeparator:'',id:'help_questionname',anchor:'99%'}
						]
					},{
						layout:'form',
						columnWidth:.99,
						items:[{xtype:'textarea',readOnly:false,fieldLabel:'��������:'+redStar+"<font  color='red'>(500������)</font>",labelSeparator:'',height:190,id:'help_questioncontent',anchor:'99%'}]
					},{
						layout:'form',
						columnWidth:.99,
						items:[{
							xtype: 'fileuploadfield',  
							id: 'userfile',
							width:360,
							fieldLabel: '��&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp��',
							emptyText: '֧�����ͣ�'+types,
							name: 'file',
							readOnly:false,
							buttonText: '���&nbsp&nbsp&nbsp&nbsp',
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
										//��֤�ϴ��ļ�����types
										if(types.indexOf(path)==-1){
											alert("��������ֻ��֧�֣�"+types+"�����ͣ�");
											Ext.getCmp('userfile').setValue("");
											//Ext.Msg.alert('��ʾ', '��������ֻ��֧�֣�'+types+'�����ͣ�')
									     	return ;
										}
									}  
								 }
						     }
						}]
					}]
				}],
				//buttonAlign:'center',  
			    buttons:[{text:'��ȡ��ǰ��Ļ',listeners:{'click':function(){
			    			cutWin();
			    		 }}},
			    		 {text:'Ԥ����ͼ',id:'prePic',disabled:true,listeners:{'click':function(){
			    			 previewWin();
				    	 }}},
			    		 {text:'���ؽ�ͼ',id:'downPic',disabled:true,listeners:{'click':function(){
			    			 downloadWin();
				         }}},
			             {text :'��  ��',id:'zc',listeners:{'click':function(){
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
									alert("��ϵ�绰���ܴ���30λ");return;
								}
								if(config.telnumber.trim().length>0){
									var strTemp= "0123456789-()#+"; 
									var str = config.telnumber.trim()
									for(var k = 0;k < str.length;k ++){
										if(strTemp.indexOf(str.charAt(k))==-1){
											alert("��ϵ�绰��ʽ������");return;
										}
									}
								}
								if(config.questionname.length>100){
									alert("���ʱ��ⲻ�ܴ���100��");return;
								}
							    if(config.questioncontent.length>500){
									alert("�������ݲ��ܴ���500��");return;
								}
								gridid=0;
								//����ݴ�����ύ��,�ǰ�ť�����ã���ֹ����ύ
								Ext.getCmp('zc').setDisabled(true);
								Ext.getCmp('fb').setDisabled(true);
								_config=config;
								//����绰���ϴε绰��һ�������¼��ĵ绰
								if(config.telnumber!=null&&config.telnumber!=""&&config.telnumber!=telnumber){
									telnumber=config.telnumber;
									Ext.lt.RCP.server("useonliehelp", "addTel", config.telnumber,function (resp) {
										saveQuit(config);//�ϴ�����
								});
								}else{
									saveQuit(config);//�ϴ�����
								}
						 }}},
						 {text:'��  ��',id:'fb',listeners:{'click':function(){
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
									alert("�������Ͳ���Ϊ��");return;}
								if(config.questionleveltype==""){
									alert("�������Ͳ���Ϊ��");return;
								}	
								if(config.telnumber.trim().length==0){
									alert("��ϵ�绰����Ϊ��");return;
								}else if(config.telnumber.length>30){
										alert("��ϵ�绰���ܴ���30λ");return;
								}
								if(config.telnumber.trim().length>0){
									var strTemp= "0123456789-()#+"; 
									var str = config.telnumber.trim()
									for(var k = 0;k < str.length;k ++){
										if(strTemp.indexOf(str.charAt(k))==-1){
											alert("��ϵ�绰��ʽ������");return;
										}
									}
								}
								if(config.questionname.trim().length==0){
									alert("���ʱ��ⲻ��Ϊ��");return;
								}else if(config.questionname.length>100){
									alert("���ʱ��ⲻ�ܴ���100��");return;
								}
								if(config.questioncontent.trim().length==0){
									alert("�������ݲ���Ϊ��");return;
								}else if(config.questioncontent.length>500){
									alert("�������ݲ��ܴ���500��");return;
								}
								gridid=1;
								//����ݴ�����ύ��,�ǰ�ť�����ã���ֹ����ύ
								Ext.getCmp('zc').setDisabled(true);
								Ext.getCmp('fb').setDisabled(true);
								_config=config;
								//����绰���ϴε绰��һ�������¼��ĵ绰
								if(config.telnumber!=null&&config.telnumber!=""&&config.telnumber!=telnumber){
									telnumber=config.telnumber;
									Ext.lt.RCP.server("useonliehelp", "addTel", config.telnumber,function (resp) {
										saveQuit(config);//�ϴ�����
									});
								}else{
									saveQuit(config);//�ϴ�����
								}
						 }}},
						 {text:'��  ��',listeners:{'click':function(){
							 if(picImgId!=''){
									Ext.lt.CaptureScreen.del(picImgId);
							 }
							 closePic();
							 delPic();
						 }}}]
			});
		//��ʾ��panel
		var helppanel = new Ext.Panel({
			id:'helppanel',
			bodyStyle:'margin:0px 0px 0px 0px;',
			border:true,
			title:'������Ϣ��ϸ',
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
	//�����ϴ�
	function savefile(config){
		isboosave=true;
		var div=document.getElementById("newID");
		var p=document.getElementById('file').parentNode;
		var fileDiv=document.createElement("div");
		fileDiv.style.visibility='hidden';
		fileDiv.id='fileDiv';	
		var innerHTMLStr="";
		//������ϴ���ͼ�ĸ���ȥ��ENCTYPE='multipart/form-data' ͨ���������ύ
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
					alert("��������ֻ��֧�֣�"+types+"�����ͣ�");
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
				alert('�����ϴ��ɹ�!');
				isboosave=false;
				addsave(config);
			}else if(resp=="false"){
				alert("�����ϴ�ʧ�ܣ�");
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
		var temptype = '֧�����ͣ�'+types;
		if(document.getElementById('userfile').value!=temptype){
			//������и���
			if(isboosave){
					alert("�����ϴ������Ժ�...");
					return ;
				}
				savefile(config);//�ϴ�����
		}else{
			addsave(config);
		}				
	}
	
	function addsave(config){
				Ext.lt.RCP.script(onlinehelpurl,"useonliehelp", "save", _config,function (resp) {
					alert("�ύ�ɹ�");
					document.getElementById('previewId').style.display="none";
					delPic();
				},function(resp){"�ύʧ��"+resp});
	}
	