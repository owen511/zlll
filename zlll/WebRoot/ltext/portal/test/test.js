//�����ռ����
if (Ext.lt.portal == null) {
	Ext.lt.portal = {
		component:{}
	}
};


if (Ext.lt.portal.component == null) {
	Ext.lt.portal.component = {};
};
Ext.lt.portal.component.Testmain= function(server,configinfo){
	
	//-------------------------------------------------------
	alert(_ROOT_PATH_);
	Ext.lt.util.createStylesheet(_ROOT_PATH_+'/fcas/ltext/datatabletheme.css','cssID');
	var asdfasdfasdfasdf = new Ext.Panel({
		id:'aaaaaaaaaaaa',
		layout:'column',
		border:false,
		html:'asdfa<br>asdfa<br>asdfa<br>asdfa<br>asdfa<br>'
	});
	var web='';	//����Զ�̵�web����
	var tools_menhu = [
	{id:'maximize',handler: function(e, target, panel){
	if(panel.getHeight()<100){alert('���Ȼ�ԭ�ٲ���');return ;}
	
			if(Ext.getCmp("maxManbody")==null){
				var _window = new Ext.Window({
					id:'maxMainbody',
					width : 600,
					height : 500,
					//maximizable:true ,
					closable:false,
					layout : 'fit',
					items:[]
				});
			_window.show();
			_window.maximize();
			_window.hide();
			}
			
			testMainbodyPPanel=panel.ownerCt;
			var itm=testMainbodyPPanel.items.items;
			for(var i=0;i<itm.length;i++){
				if(itm[i].id==panel.id){
					testIndex=i;
					break;
				}   
			}
			
			
			//debugger;
			testHeight=panel.getHeight();
			panel.tools.maximize.hide();
			panel.tools.restore.show();
 			panel.collapsible=false;
			Ext.lt.template.getMainPanel().show();
			Ext.lt.template.getMainPanel().doLayout();
			
			Ext.getCmp("maxMainbody").add(panel);
			Ext.getCmp("maxMainbody").show();
			if(null!=panel.panelheight){
				panel.bwrap.dom.children[0].children[0].style.height=panel.getHeight()-50;
			}
			
			if(null!=panel.reportinfo_tmp){
				Ext.lt.portal.component.report.GenerateGraphics_tmp(panel.reportinfo_tmp,panel.getHeight()-50,panel.getWidth()-50);
			}
			//debugger;
			
			var ids = panel.id.split('@');
			var aaaaa=document.getElementById(ids[1]);
			
			var setHtml=[];
			setHtml.push("<div id=\""+ids[1]+"\" style= \"width:100%; height:100%;background-color:#FF0000;\">"+aaaaa.innerHTML+"</div>");
				
		}
	},
	{id:'restore',hidden:true,handler: function(e, target, panel){
	if(panel.getHeight()<100){alert('���Ȼ�ԭ�ٲ���');return ;}
			//debugger;
			//alert(panel.id);
			testMainbodyPPanel.insert(testIndex,panel);
			var w=testMainbodyPPanel.getWidth();
			panel.collapsible=true;
			panel.tools.maximize.show();
			panel.tools.restore.hide();
			testMainbodyPPanel.doLayout();
			panel.setHeight(testHeight);
			panel.setWidth(w);
			testMainbodyPPanel=null;
			if(null!=panel.panelheight){
				panel.bwrap.dom.children[0].children[0].style.height=panel.panelheight;
			}
			Ext.lt.template.getMainPanel().show();
			Ext.lt.template.getMainPanel().doLayout();
    		Ext.getCmp("maxMainbody").close();
			if(null!=panel.reportinfo_tmp){
				if(panel.reportinfo_tmp.reportorimage == 0){
					Ext.lt.portal.component.report.GenerateGraphics_tmp(panel.reportinfo_tmp,330,372);
				}else{
					Ext.lt.portal.component.report.GenerateGraphics_tmp(panel.reportinfo_tmp,330,372);
				}
			}
			var aaaaa=document.getElementById('panel_1_1');
			aaaaa.style.width='100%';
			
		}
	}
];
	
	/***
	 * ���ز�����Ext_lt_fcas_webserver����
	 */
	//-----------------------------------------------------------------------------------------------------------------------------
	/****
	 * ���Եİ���
	 */
	var panelCircular = new Ext.Panel({
		id:'panel1',
		title:'����ͼ1',
		columnWidth:.5,
		height:400,
		margins:'0 0 0 0',
		 cmargins:'0 5 5 5',
		tools :tools
	});
	var panelBar = new Ext.Panel({
		id:'panel2',
		title:'����ͼ1',
		columnWidth:.5,
		height:400
		
	});
	var panelTale = new Ext.Panel({
		id:'panel3',
		title:'���1',
		tools:tools
		
	});
	var panelcomlon1 =new Ext.Panel({
		layout: 'column',
		items:[panelCircular,panelBar]
	});
	var panelcomlon2=new Ext.Panel({
		layout: 'column',
		items:[panelTale]
	});
	
	//-------------------------------------------------------------------------------------------------
	/***
	 * �����ж��м���
	 */
	function judgeCol(str){
		var list=new Array();
		var strArray = str.split("&@");

		for(var i=0;i<strArray.length;i++){

			var strArray2=strArray[i].split("&");
			
			var strArray3=strArray2[0].split("=");

			var strArray4=strArray3[1].split("_");
			
			var strArray5=parseInt(strArray4[1]);
			for(var x=0;x<strArray2.length;x++){
				var strArray6=strArray2[x].split("=");
				if(strArray6[0]=='divId'){
					var strhtml_Id=strArray6[1].split('_');
					list.push(parseInt(strhtml_Id[1]));
				}
			}
			
			
		}
		//alert("list.length"+list.length);
		var max2 = Math.max.apply(null,list);
		return max2
	}
	/***
	 * �жϵڼ����м���
	 * rowNum�ڼ���
	 */
	function judgeRow(rowNum,str){
		var list=new Array();
		var strArray = str.split("&@");
		//debugger;
		for(var i=0;i<strArray.length;i++){

			var strArray2=strArray[i].split("&");
			
			var strArray3=strArray2[0].split("=");

			var strArray4=strArray3[1].split("_");
			
			var strArray5=parseInt(strArray4[1]);
			for(var x=0;x<strArray2.length;x++){
				var strArray6=strArray2[x].split("=");
				if(strArray6[0]=='divId'){
					var strhtml_Id=strArray6[1].split('_');
					if(strhtml_Id[1]==rowNum){
						list.push(parseInt(strhtml_Id[2]));
					}
					
				}
			}
			
			
		}
		var max2 = Math.max.apply(null,list);
		return max2
	}
	
	/***
	 * ѭ���в����η���panel 
	 */
	function colpanel_chongxiefangfa(str){
		//debugger
		var colnum=judgeCol(str);
		colnum=parseInt(colnum);
		var vitem=[];
		for(var i=1;i<=colnum;i++){
			var rowMax = judgeRow(i,str);//�ж�ÿ���м���
			var item=[];
			for(var colsNum = 1;colsNum<=rowMax;colsNum++){
				var strArray = str.split("&@");
				//�ڼ���
				var strvalue=0;
				//�ڼ��еĵڼ���
				var strRowNum=0;
				for(var y=0;y<strArray.length;y++){
					var strArray2=strArray[y].split("&");
					strvalue=0;
					strRowNum=0;
				for(var zz=0;zz<strArray2.length;zz++){
					var strArray3=strArray2[zz].split("=");
					
					if(strArray3[0]=='col'){
						strvalue=strArray3[1];
					}
					if(strArray3[0]=='row'){
						strRowNum=strArray3[1];
					}
					if(i== strRowNum && colsNum==strvalue){
						strvalue=0;
						strRowNum=0;
						//div��ID
						var strhtml_Id='';
						//div�Ŀ��
						var strhtml_width='';
						//div�Ŀ�ȵ�����
						var strhtml_width_type='';
						//div�ĸ߶�
						var strhtml_height='';
						//div�ĸ߶ȵ�����
						var strhtml_height_type='';
						//panel�ı���
						var paneltitle='';
						//panel��ʾ���ݵ������磺����ͼ
						var show_type='';
						//�����Ψһ��ʾ
						var markID='';
						//var borderboolean=''//�Ƿ���ʾ�߿�
						//�Ƿ���ʾ�߿��ֵ
						var borderboolean_value='';
						
						//body��css��ʽ��ֵ
						var bodyStyle_value='';
						for(var x=0;x<strArray2.length;x++){
							
							var strArray6=strArray2[x].split("=");
							if(strArray6[0]=='divId'){
								strhtml_Id=strArray6[1];
							}
							/***
							 * ������panel�Ŀ��
							 */
							if(strArray6[0]=='width'){
								strhtml_width=strArray6[1];
								strhtml_width_type='width';
							}
							/***
							 * ������panel�ĸ߶�
							 */
							if(strArray6[0]=='height'){
								strhtml_height=strArray6[1];
								strhtml_height_type='height';
							}
							/***
							 * ������panel�ı���
							 */
							if(strArray6[0]=='title'){
								paneltitle=strArray6[1];
							}
							/***
							 * ������ʾpanel�ı߿�
							 */
							if(strArray6[0]=='borderShowboolean'){
								borderboolean_value=strArray6[1];
							}
							/***
							 * ������panelҪ��ʾ������
							 */
							if(strArray6[0]=='markId'){
								markID=strArray6[1];
							}
							/***
							 * ������panelҪ��ʾ���ݵ�����
							 */
							if(strArray6[0]=='showtype'){
								show_type=strArray6[1];
							}
							if(strArray6[0]=='bodyStyle'){
								bodyStyle_value=strArray6[1];
							}
							
							
	
						}
						var panlechlie=new Ext.Panel({
							id:'panelcolumn_'+i+"@"+strhtml_Id,
							html:'<div id=\''+strhtml_Id+'\' style="width:100%; height:93.9%"></div>'
						});
						/***
						 * ��panel�Ŀ��
						 */
						
						if(strhtml_width_type=='width'){
							if(strhtml_width.indexOf('%')>=0){
								Ext.getCmp('panelcolumn_'+i+"@"+strhtml_Id).columnWidth="."+parseInt(strhtml_width);
							}else if(strhtml_width.indexOf('%')<0 && strhtml_width!=''){
								Ext.getCmp('panelcolumn_'+i+"@"+strhtml_Id).width=parseInt(strhtml_width);
							}
						}
						/**
						 * ��panel�ĸ߶�  parseInt(strhtml_height)
						 */
						if(strhtml_height_type=='height'){
							if(strhtml_height.indexOf('%')>=0){
								Ext.getCmp('panelcolumn_'+i+"@"+strhtml_Id).height=parseInt(strhtml_height)+"%";
							}else if(strhtml_height.indexOf('%')<0 && strhtml_height.length!=0){
								Ext.getCmp('panelcolumn_'+i+"@"+strhtml_Id).height=parseInt(strhtml_height);
							}
						}
						
						/***
						 * ����panel�ı߿�
						 */
						if(borderboolean_value=='false'){
							
							Ext.getCmp('panelcolumn_'+i+"@"+strhtml_Id).border=false;
							
						}else{
							
							Ext.getCmp('panelcolumn_'+i+"@"+strhtml_Id).title=paneltitle;
							Ext.getCmp('panelcolumn_'+i+"@"+strhtml_Id).tools=tools_menhu;
						}
						/***
						 * �ж�body��css����
						 */
						if(bodyStyle_value!=''){
							Ext.getCmp('panelcolumn_'+i+"@"+strhtml_Id).bodyStyle=bodyStyle_value;
						}
						/***
						 * ������ʾ����
						 */
						item.push(panlechlie);
						break;
					}
					
				
				}
				}
			}
			var panelpar=new Ext.Panel({
				id:'panelcolumn_'+i,
				layout: 'column',
				border:false,
				items:item
			});
			vitem.push(panelpar);
	
		}
		return vitem;
	
	}
	
	
	
	
	
	/***
	 * ѭ���в����η���panel������
	 */
	function colpanel_2(str){
		//debugger;
		alert();
		var colnum=judgeCol(str);
		colnum=parseInt(colnum);
		var vitem=[];
		for(var i=1;i<=colnum;i++){
		var item=[];
			//--------------------
			var strArray = str.split("&@");
			
			for(var y=0;y<strArray.length;y++){
	
				var strArray2=strArray[y].split("&");
				
				var strArray3=strArray2[0].split("=");
				
				var strArray4=strArray3[1].split("_");
				
				var strArray5=parseInt(strArray4[1]);
					//div��ID
					var strhtml_Id='';
					//div�Ŀ��
					var strhtml_width='';
					//div�Ŀ�ȵ�����
					var strhtml_width_type='';
					//div�ĸ߶�
					var strhtml_height='b';
					//div�ĸ߶ȵ�����
					var strhtml_height_type='';
					//panel�ı���
					var paneltitle='';
					//panel��ʾ���ݵ������磺����ͼ
					var show_type='';
					//�����Ψһ��ʾ
					var markID='';
					
					for(var x=0;x<strArray2.length;x++){
						var colNums=0;
						
						var strArray6=strArray2[x].split("=");
						if(strArray6[0]=='col'){
							colNums=strArray6[1];
						}
						if(strArray6[0]=='divId'){
							strhtml_Id=strArray6[1];
						}
						
						/***
						 * ������panelҪ��ʾ������
						 */
						if(strArray6[0]=='markId'){
							markID=strArray6[1];
						}
						/***
						 * ������panelҪ��ʾ���ݵ�����
						 */
						if(strArray6[0]=='showtype'){
							show_type=strArray6[1];
						}
						
						
						/***
						 * ������panel�Ŀ��
						 */
						if(strArray6[0]=='width'){
							strhtml_width=strArray6[1];
							strhtml_width_type='width';
						}
						
						
						/***
						 * ������panel�ĸ߶�
						 */
						if(strArray6[0]=='height'){
							strhtml_height=strArray6[1];
							strhtml_height_type='height';
						}

					}
					if(strhtml_height==''){
						document.getElementById(strhtml_Id).style.height=parseInt(100);
					}
					
					if(show_type=='1'){
						web.drawChart(markID,document.getElementById(strhtml_Id),1);
					}else if(show_type=='2'){
						web.drawChart(markID,document.getElementById(strhtml_Id),2);
					}else if(show_type=='tab'){
						//debugger;
						web.drawTable(markID,document.getElementById(strhtml_Id));
					}
				
				
			}
		}
	}
	/***
	 * ����Ψһ��ʾ��markId����ʾͼ�ε����
	 */
	function colpanelShowTypeAndMarkId(str,divID){
		//div��ID
		var strhtml_Id='';
		//panel��ʾ���ݵ������磺����ͼ
		var show_type='';
		//�����Ψһ��ʾ
		var markID='';
		var colnum=judgeCol(str);
		colnum=parseInt(colnum);
		var vitem=[];
		for(var i=1;i<=colnum;i++){
		var item=[];
			//--------------------
			var strArray = str.split("&@");
			
			for(var y=0;y<strArray.length;y++){
	
				var strArray2=strArray[y].split("&");
				
				var strArray3=strArray2[0].split("=");
				
				var strArray4=strArray3[1].split("_");
				
				var strArray5=parseInt(strArray4[1]);
				for(var colNum=0;colNum<strArray2.length;colNum++){
					var strvaluesss=strArray2[colNum].split('=');
					var strvalue=0;
					if(strvaluesss[0]=='col'){
						strvalue=parseInt(strvaluesss[1]);
					}
					if(i==strvalue){
					for(var x=0;x<strArray2.length;x++){

						var strArray6=strArray2[x].split("=");
						alert(strArray6[0]);
						if(strArray6[0]=='divId'){
							strhtml_Id=strArray6[1];
						}
						if(strhtml_Id!=divID){
							break;
						}
						/***
						 * ������panelҪ��ʾ������
						 */
						if(strArray6[0]=='markId'){
							markID=strArray6[1];
							alert(markID);
						}
						/***
						 * ������panelҪ��ʾ���ݵ�����
						 */
						if(strArray6[0]=='showtype'){
							show_type=strArray6[1];
							alert(show_type);
						}
					}
					//return markID+'$$'+show_type;
					return strhtml_Id;
				}
					
				}
				
				
			}
		}
		
	}
	
	
	/***
	 * ����webserver��js
	 */
	function jsload2(jsname,strconfig){
		
		if(jsname != ''){
	      var scpt = document.createElement("SCRIPT");
	      scpt.type = "text/javascript";
	      scpt.src = _ROOT_PATH_+'/fcas/'+jsname+'.js';
	      alert("scpt.onreadystatechange="+scpt.onreadystatechange);
	      scpt.onreadystatechange = function(){
	      	if (this.readyState == "complete") { 
	      		
				
	      		web=Ext_lt_fcas_webserver({username:'temp',password:'1',region:'230001',acctyear:'2011'},'http://192.168.3.224:7008/fcas/');
	      		
	      		colpanel_2(strconfig);
	      		
	      	}else{
	      	}
	      }
	      document.getElementsByTagName("HEAD")[0].appendChild(scpt);
	    }
	}
	
	/***
	 * ��������Ŀ��jsload2
	 */
	var viewport = new Ext.Panel({
			id:'columnFrame',
			border:false,
  	    	items:colpanel_chongxiefangfa(configinfo.col)
			//items:[panelcomlon1,panelcomlon2]
			//items:[panelBar]
  		});
  	jsload2('webserver',configinfo.col);
	return viewport;
	
}