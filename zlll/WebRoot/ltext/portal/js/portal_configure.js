//�����ռ����
if (Ext.lt.portal == null) {
	Ext.lt.portal = {
		component:{}
	}
};


if (Ext.lt.portal.component == null) {
	Ext.lt.portal.component = {};
};
var Ext_lt_PortalConfigureJsp= function(panleArray,titleArry){
	/***
	 * ����ȫ�ֵ�web��������
	 */
	var web='';
	/***
	 *����panel����󻯹��ܣ����������µĿ��
	 */
	var tools_menhu_text = [{
        id:'maximize',
        hidden:false,
        handler: function(e, target, panel){
        	colpanelId = panel.id.split('@');
        	if(Ext.getCmp("maxMainbody")==null){
        		 var win = new Ext.Window({
			    	id:'maxMainbody',
					width : 600,
					height : 500,
					closable:false,
					layout : 'fit',
					frame:false,
					
					items:[]
			    }); 
        	}
        	//win.width=document.body.clientWidth;
        	//win.height=document.body.clientHeight;
        	win.show();
        	win.maximize();
            win.hide();
        	_tttpanel=panel;

        	
        	_parpaMiddlefunction=panel.ownerCt;
        	for(var i=0;i<_parpaMiddlefunction.items.items.length;i++){
        		if(_parpaMiddlefunction.items.items[i].id==panel.id){
	        		_witemsIndex=i;
	        		break;
        		}
        	}
        	_panelh=panel.getHeight();
        	_panelw=panel.getWidth();
        	_panelStyleh=document.getElementById(colpanelId[1]).style.height;
        	_panelStylew=document.getElementById(colpanelId[1]).style.width;
        	
        	
        	/***
        	 * ��panel��Id
        	 */
        	
        	//Ext.getCmp(colpanelId[0]).doLayout();
        	
        	
            Ext.getCmp("maxMainbody").add(panel);
			Ext.getCmp("maxMainbody").show();
			
            
        	
        	document.getElementById(colpanelId[1]).style.width=panel.getInnerWidth();
        	document.getElementById(colpanelId[1]).style.height=win.height-100;
        	
        	web.resize(document.getElementById(colpanelId[1]));
        	web.reflash(document.getElementById(colpanelId[1]));
            panel.tools.maximize.hide();
			panel.tools.restore.show();
			Ext.getCmp('mainpanel').doLayout();
			
        }
        
    },{
    	id:'restore',hidden:true,handler:function(e, target, panel){
			panel.setHeight(_panelh);
			panel.setWidth(_panelw);
			//panel.bwrap.dom.children[0].style.height=_panelStyleh;
			//panel.bwrap.dom.children[0].style.width=_panelStylew;
			panel.tools.maximize.show();
			panel.tools.restore.hide();
        	//Ext.getCmp(colpanelId[0]).doLayout();
			
        	
        	
        	//web.reflash(document.getElementById(colpanelId[1]));
        	_parpaMiddlefunction.insert(_witemsIndex,panel);
        	document.getElementById(colpanelId[1]).style.width=parseInt(panel.getInnerWidth())+5;
        	document.getElementById(colpanelId[1]).style.height=parseInt(panel.getInnerHeight())-45;
        	web.resize(document.getElementById(colpanelId[1]));
        	_parpaMiddlefunction.doLayout();
        	_parpaMiddlefunction=null;
        	//setDiv();
        	Ext.getCmp('mainpanel').doLayout();
        	Ext.getCmp("maxMainbody").close();
    	}
    	   
    }];
	/***
	 * �����õİ����ΰ��������µ��Ǹ�ext����Ǻ��õ�
	 */
	var tools_menhu = [{
        id:'maximize',
        hidden:false,
        handler: function(e, target, panel){
        	colpanelId = panel.id.split('@');
        	if(Ext.getCmp("maxMainbody")==null){
        		 var win = new Ext.Window({
			    	id:'maxMainbody',
					width : 100,
					height : 500,
					closable:false,
					layout : 'fit',
					frame:false,
					
					items:[]
			    }); 
        	}
        	//win.width=document.body.clientWidth;
        	//win.height=document.body.clientHeight;
        	//document.body.style.overflow = 'hidden';
        	//alert(document.body.scrollWidth);
        	win.show();
        	win.maximize();
            win.hide();
        	_tttpanel=panel;

        	
        	_parpaMiddlefunction=panel.ownerCt;
        	for(var i=0;i<_parpaMiddlefunction.items.items.length;i++){
        		if(_parpaMiddlefunction.items.items[i].id==panel.id){
	        		_witemsIndex=i;
	        		break;
        		}
        	}
        	_panelh=panel.getHeight();
        	_panelw=panel.getWidth();
        	_panelStyleh=document.getElementById(colpanelId[1]).style.height;
        	_panelStylew=document.getElementById(colpanelId[1]).style.width;
        	
        	
        	/***
        	 * ��panel��Id
        	 */
        	
        	//Ext.getCmp(colpanelId[0]).doLayout();
        	
        	
            Ext.getCmp("maxMainbody").add(panel);
			Ext.getCmp("maxMainbody").show();
			
            
        	document.getElementById(colpanelId[1]).style.width=panel.getInnerWidth();
        	if(document.getElementById(colpanelId[1]).getElementsByTagName('OBJECT').length>0){
        		document.getElementById(colpanelId[1]).style.height=win.getInnerHeight()-90;
        	}else{
        		document.getElementById(colpanelId[1]).style.height=win.getInnerHeight()-45;
        	}
        	
        	web.resize(document.getElementById(colpanelId[1]));
        	web.reflash(document.getElementById(colpanelId[1]));
            panel.tools.maximize.hide();
			panel.tools.restore.show();
			Ext.getCmp('mainpanel').getEl().mask();
			Ext.getCmp('mainpanel').doLayout();
			
        }
        
    },{
    	id:'restore',hidden:true,handler:function(e, target, panel){
			panel.setHeight(_panelh);
			panel.setWidth(_panelw);
			//panel.bwrap.dom.children[0].style.height=_panelStyleh;
			//panel.bwrap.dom.children[0].style.width=_panelStylew;
			panel.tools.maximize.show();
			panel.tools.restore.hide();
        	//Ext.getCmp(colpanelId[0]).doLayout();
			
        	
        	
        	//web.reflash(document.getElementById(colpanelId[1]));
        	_parpaMiddlefunction.insert(_witemsIndex,panel);
        	document.getElementById(colpanelId[1]).style.width=parseInt(panel.getInnerWidth());
        	if(document.getElementById(colpanelId[1]).getElementsByTagName('OBJECT').length>0){
        		document.getElementById(colpanelId[1]).style.height=parseInt(panel.getInnerHeight())-90;
        	}else{
        		document.getElementById(colpanelId[1]).style.height=parseInt(panel.getInnerHeight())-45;
        	}
        	web.resize(document.getElementById(colpanelId[1]));
        	_parpaMiddlefunction.doLayout();
        	_parpaMiddlefunction=null;
        	//setDiv();
        	//document.body.style.overflow = 'scroll';
        	Ext.getCmp('mainpanel').getEl().unmask();
        	Ext.getCmp('mainpanel').doLayout();
        	Ext.getCmp("maxMainbody").close();
    	}
    	   
    }];
	


	
	
	/***
	 * �����ж��м���
	 */
	function judgeCol(panleArray){

		var list=new Array();

		var strArray = panleArray;
		for(var i=0;i<strArray.length;i++){
			for(var e in strArray[i]){
				if(e=='row'){
					var rows=strArray[i].row;
					rows=parseInt(rows);
					list.push(rows);
				}
				
				
			}	
		}
		var max2 = Math.max.apply(null,list);
		return max2
	}
	/***
	 * �жϵڼ����м���
	 * rowNum�ڼ���
	 */
	function judgeRow(rowNum,panleArray){
		var list=new Array();
		var strArray = panleArray;
		for(var i=0;i<strArray.length;i++){
			for(var e in strArray[i]){
				if(e=='row'){
					if(rowNum==strArray[i].row){
						var cols = strArray[i].col;
						cols=parseInt(cols);
						list.push(cols);
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
	function colpanel_chongxiefangfa(panleArray,divObj){
		var colnum=judgeCol(panleArray);
		colnum=parseInt(colnum);
		var vitem=[];
		for(var i=1;i<=colnum;i++){
			var rowMax = judgeRow(i,panleArray);//�ж�ÿ���м���
			var item=[];
			for(var colsNum = 1;colsNum<=rowMax;colsNum++){
				var strArray = panleArray;
				//�ڼ���
				var strvalue=0;
				//�ڼ��еĵڼ���
				var strRowNum=0;
				//�ؼ�------
				for(var y=0;y<strArray.length;y++){
					
					if(i== strArray[y].row && colsNum==strArray[y].col){
						
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
						for(var e in strArray[y]){
							

							strhtml_Id="panel_"+strArray[y].row+'_'+strArray[y].col;

							/***
							 * ������panel�Ŀ��
							 */
							if(e=='width'){
								strhtml_width=strArray[y].width;
								strhtml_width_type='width';
							}
							/***
							 * ������panel�ĸ߶�
							 */
							if(e=='height'){
								strhtml_height=strArray[y].height;
								strhtml_height_type='height';
							}
							/***
							 * ������panel�ı���
							 */
							if(e=='title'){
								paneltitle=strArray[y].title;
							}
							/***
							 * ������ʾpanel�ı߿�
							 */
							if(e=='borderShow'){
								borderboolean_value=strArray[y].borderShow;
							}
							/***
							 * ������panelҪ��ʾ������
							 */
							if(e=='markId'){
								markID=strArray[y].markId;
							}
							/***
							 * ������panelҪ��ʾ���ݵ�����
							 */
							if(e=='showtype'){
								show_type=strArray[y].showtype;
							}
							if(e=='bodyStyle'){
								bodyStyle_value=strArray[y].bodyStyle;
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
							if(strhtml_width.indexOf('%')>=0 && parseInt(strhtml_width)!=100){
								Ext.getCmp('panelcolumn_'+i+"@"+strhtml_Id).columnWidth="."+parseInt(strhtml_width);
							}else if(strhtml_width.indexOf('%')>=0 && parseInt(strhtml_width)==100){
								Ext.getCmp('panelcolumn_'+i+"@"+strhtml_Id).columnWidth="1.0";
							}else if(strhtml_width.indexOf('%')<0 && strhtml_width!=''){
								Ext.getCmp('panelcolumn_'+i+"@"+strhtml_Id).width=parseInt(strhtml_width);
							}
						}
						/**
						 * ��panel�ĸ߶�  parseInt(strhtml_height)
						 */
//						if(strhtml_height_type=='height'){
//							if(strhtml_height.indexOf('%')>=0){
//								Ext.getCmp('panelcolumn_'+i+"@"+strhtml_Id).height=parseInt(strhtml_height)+"%";
//							}else if(strhtml_height.indexOf('%')<0 && strhtml_height.length!=0){
//								Ext.getCmp('panelcolumn_'+i+"@"+strhtml_Id).height=parseInt(strhtml_height);
//							}
//						}
						
						if(strhtml_height_type=='height'){
							if(strhtml_height.indexOf('%')>=0){
								Ext.getCmp('panelcolumn_'+i+"@"+strhtml_Id).height=(parseInt(divObj.style.height)*(parseInt(strhtml_height)/100));
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
					
				
				//}
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
	
	//���ӵ�ַ
	var _url=_ROOT_PATH_+"/";
	//��¼�û�����
	var _user;
	//��¼�û��ķ���
	var _loginserver;
	//�Ƿ���Ҫ��¼
	var _islogin;
	/***
	 * �ж��Ƿ��¼
	 */
	this.setLoginInfo=function(url,user,server,islogin){
		if(url){
			_url=url;
		}
		_user=user;
		_loginserver=server
		if(islogin==false)
		_islogin=false;
		else
		_islogin=true;
	}
	
	/***
	 * 
	 * ���η���panel�ı������ݺ��жϸ��û��Ƿ��¼�ɹ�
	 * 
	 */
	this.draw=function(obj){
		//debugger;{username:'temp',password:'1',region:'230001',acctyear:'2011'}
		
		if(_islogin){
			web.login();
			var loginRes=web.getLoginType();
			if(loginRes>0){
				setDraw(obj);
			}else if(loginRes<0){
				alert("��¼ʧ��");
				return;
			}else{
				var o=this;
				setTimeout(function(){
					o.draw(obj);
				},200);
			}
		}else{
			setDraw(obj);
		}
		
		
	}
	
	/***
	 * ���Ʊ���
	 */
	function setDraw(obj){
		var panelchiles = panleArray;
		web=Ext_lt_fcas_webserver(_user,_url,_loginserver);
		for(var i=0;i<panelchiles.length;i++){
			
				var strhtml_Id ="panel_"+panelchiles[i].row+"_"+panelchiles[i].col;
				if(panelchiles[i].height==''){
					document.getElementById(strhtml_Id).style.height=parseInt(100);
				}			
				if(panelchiles[i].showtype=='tab'){
					if(obj != null && obj.unitdisp != null){
						web.drawTable(panelchiles[i].markId,document.getElementById(strhtml_Id),{unitdisp:obj.unitdisp,publicUnit:obj.publicUnit});
					}else{
						web.drawTable(panelchiles[i].markId,document.getElementById(strhtml_Id));	
					}
					
				}else{
					if(obj != null && obj.unitdisp != null){
						web.drawChart(panelchiles[i].markId,document.getElementById(strhtml_Id),parseInt(panelchiles[i].showtype),{unitdisp:obj.unitdisp,publicUnit:obj.publicUnit,extractionVisible:(obj.extractionVisible!=null?obj.extractionVisible:'0')});	
					}else{
						web.drawChart(panelchiles[i].markId,document.getElementById(strhtml_Id),parseInt(panelchiles[i].showtype));
					}
				}
						
			
		}
	}
	
	
	/***
	 * ��panel
	 * 
	 */
	function mainjsp(panleArray,divObj){
		var viewport = new Ext.Panel({
			id:'columnFrame',
			border:false,
			//renderTo:divObj.id,
  	    	items:colpanel_chongxiefangfa(panleArray,divObj)
			
  		});
  		return viewport;
	}
	/***
	 * ����panel�е�DIV
	 */
	function setDiv(){
		var panelchiles = panleArray;
		for(var i=0;i<panelchiles.length;i++){
			var w = Ext.getCmp('panelcolumn_'+panelchiles[i].row+"@"+"panel_"+panelchiles[i].row+'_'+panelchiles[i].col).getInnerWidth();
			var h = Ext.getCmp('panelcolumn_'+panelchiles[i].row+"@"+"panel_"+panelchiles[i].row+'_'+panelchiles[i].col).getInnerHeight();
			document.getElementById("panel_"+panelchiles[i].row+'_'+panelchiles[i].col).style.width=w;
			document.getElementById("panel_"+panelchiles[i].row+'_'+panelchiles[i].col).style.height=parseInt(h)-30;
		}
		
	}
	

	/***
	 * ������--����panel���
	 */
	this.setPanel=function(divObj){
		var str;
		var titltpanellist = titleArry;
		if(titltpanellist.length==0){
			str=panleArray;	
			var downpanel=mainjsp(panleArray,divObj);
			var mainpanel = new Ext.Panel({
				id:'mainpanel',
				renderTo:divObj.id,
				border:false,
				items:[downpanel]
			});
		}else{
			
			//���һ�������panel
			var titlepanel = new Ext.Panel({
				border:true
			})
			for(var e in titltpanellist[0]){
				if(e=='bodyStyle'){
					var size=titltpanellist[0].bodyStyle;
				}
				if(e=='title'){
					var titlecon=titltpanellist[0].title;
				}
				
				titlepanel.html='<div style='+titltpanellist[0].bodyStyle+'>'+titlecon+'</div>';

				//titlepanel.bodyStyle=size;
			}
			var downpanel=mainjsp(panleArray,divObj);
			var mainpanel = new Ext.Panel({
				id:'mainpanel',
				renderTo:divObj.id,
				border:false,
				items:[titlepanel,downpanel]
			});

		}
		setDiv();
	}
	/***
	 * ����-�����ݹ�ϵ�����в���ʱͬʱִ�ж������ͼ��������ݻ���
	 * @param divΪ����Ǹ����������
	 * @param divsΪ��ʾ��Щ����ļ���
	 */
	this.addRelationshipPortal=function(panel, panels){
		var list = new Array();
		
		var divIdClick='panel_'+panel.row+'_'+panel.col;
		var divObjClick=document.getElementById(divIdClick);
		for(var i=0;i<panels.length;i++){
			var showDivId = 'panel_'+panels[i].row+'_'+panels[i].col;
			var divObjShow=document.getElementById(showDivId);
			if(null==divObjClick && null==divObjShow){
				alert('����Ϊ��');
				return;
			}
			list.push({div:divObjShow,linkingrule:panel.linkingrule,relationtype:panel.relationtype});
		
		}
		
		web.addRelationship(divObjClick,list);
		
	}
	/***
	 * ������ݹ�ϵ�����ȫ����ϵ��
	 */
	this.clearRelationshipPortal=function(){
		web.clearRelationship();
		
		
	}
	/**
     * ɾ�����ݹ�ϵ�������div����Ϊ�¼�������ȫ����ϵ��
     * 
     * @param div
     *        ɾ���Ըö���Ϊ���Ĺ�ϵ��
     */
    this.removeRelationshipPortal=function(panel) {
    	var divIdClick='panel_'+panel.row+'_'+panel.col;
    	var divObjClick=document.getElementById(divIdClick);
    	if(null==divObjClick){
    		alert('����Ϊ��');
    		return;
    	}
		web=removeRelationship(divObjClick);
		
    }
}

/***
 * ����Ext_lt_PortalPanle
 * @param {} title--Panel�ı���
 * @param {} width--panel�Ŀ��
 * @param {} height--panel�ĸ߶ȶ�
 * @param {} markId--���ı�ʾ
 * @param {} showtype--��ʾ��������͡�1Ϊ����ͼ��2Ϊ����ͼ��3Ϊ���
 * @param {} borderShow--�Ƿ���ʾ�߿�falseΪ����ʾ�����в���ʾ�߿�panel�ı�����ҲΪ�ա�Ĭ��Ϊ��ʾ
 * @param {} row--��λ�ڼ��еĵڼ���
 * @param {} col--��λ�ڼ���
 * @param {} bodyStyle--panel��body��css��������
 */
var Ext_lt_PortalPanle = function(obj){
	this.title="";
	this.width="100%";
	this.height="100";
	this.markId="";
	this.showtype="";
	this.borderShow="";
	this.row="";
	this.col="";
	this.bodyStyle="";
	this.linkingrule='';
	for(var e in obj){
		if(e=='title'){
			this.title=obj.title;
		}
		if(e=='width'){
			this.width=obj.width;
		}
		if(e=='height'){
			this.height=obj.height;
		}
		if(e=='markId'){
			this.markId=obj.markId;
		}
		if(e=='showtype'){
			this.showtype=obj.showtype;
		}
		if(e=='borderShow'){
			this.borderShow=obj.borderShow;
		}
		if(e=='row'){
			this.row=obj.row;
		}
		if(e=='col'){
			this.col=obj.col;
		}
		if(e=='bodyStyle'){
			this.bodyStyle=obj.bodyStyle;
		}
		this.linkingrule=obj.linkingrule;
	}
	
}
	//title,width,height,markId,showtype,borderShow,row,col,bodyStyle

/***
 * ����titlepanel
 * @param {} bodyStyle--��ʾ�������css����
 * @param {} title--��ʾ�����������
 * @param {} height--��ʾ������ĸ߶�
 */
var Ext_lt_PortalTitlePanle = function(obj){
	this.bodyStyle="";
	this.title="";
	this.height;
	for(var e in obj){
		if(e=='bodyStyle'){
			this.bodyStyle=obj.bodyStyle;
		}
		if(e=='title'){
			this.title=obj.title;
		}
		if(e=='height'){
			this.height=obj.height;
		}
	}
}


