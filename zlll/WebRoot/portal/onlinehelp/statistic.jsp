<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ page import="gov.mof.fasp.sec.util.SecureUtil"%>
<%@ page import="gov.mof.fasp.ca.user.UserDTO" %>
<%
response.setHeader("Cache-Control","no-cache"); 
response.setHeader("Pragma","no-cache"); 
response.setDateHeader("Expires",0); 
String path = request.getContextPath();
String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
UserDTO user = SecureUtil.getCurrentUser();
String username=user.getName();
String usercode=user.getCode();
String userid=user.getUserid()+"";
//�洢����ķ����ַ
String onlinehelpurl=(String)request.getSession().getAttribute("onlinehelpurl");
//�������
String localquestionarea=(String)request.getSession().getAttribute("questionarea");
//�����������
String levelmap=(String)request.getSession().getAttribute("levelmap");
//��������
String typemap=(String)request.getSession().getAttribute("typemap");
//��ѯ�������������е���
String staticset=(String)request.getSession().getAttribute("staticset");
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
   <script type="text/javascript">
   var _ROOT_PATH_='<%=basePath%>';
   var username='<%=username%>';
   var usercode='<%=usercode%>';
   var userid='<%=userid%>';
   var onlinehelpurl='<%=onlinehelpurl%>';
   var localquestionarea='<%=localquestionarea%>';
   var staticset='<%=staticset%>';
   var typemap = eval(<%=typemap%>);  
   var levelmap = eval(<%=levelmap%>);  
  </script>
    <style type="text/css">
	.btn {
	     BORDER-RIGHT: #002D96 1px solid; PADDING-RIGHT: 2px; BORDER-TOP: #002D96 1px solid; PADDING-LEFT: 2px;
	     FONT-SIZE: 12px; 
	     FILTER: progid:DXImageTransform.Microsoft.Gradient(GradientType=0, StartColorStr=#FFFFFF, EndColorStr=#9DBCEA); 
	     BORDER-LEFT: #002D96 1px solid; CURSOR: hand; COLOR: black;
	     PADDING-TOP: 2px; BORDER-BOTTOM: #002D96 1px solid
     }
  </style>
  <link rel="stylesheet" type="text/css" href="<%=basePath%>/ltext/style/ext-all.css"/> 
  <script type="text/javascript" src="<%=basePath%>/ltext/frameworksupport.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/ltext_core.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/ltext_template.js"></script>
  <script type="text/javascript" src="<%=basePath%>/js/template.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/FusionCharts.js"></script>
  <script type="text/javascript" src="<%=basePath%>/portal/js/onlinehelp/statistic.js"></script>
  <script type="text/javascript" src="<%=basePath%>/portal/js/login/ltext_common_menu.js"></script>
  <style type="text/css">
	.ifmissubmenuqtree .overlink a{color:#000;text-decoration:none;}
	.ifmissubmenuqtree .overlink a:hover{color:#D70312;text-decoration:underline;}
  </style>
  </head>
	<body>
	<div id = 'newId'></div>
  </body>
</html>
<script type="text/javascript">
	function doReturn(obj) {
	    var btn_bg = obj.parentNode;
	    btn_bg.className = ' ';
	    obj.style.border='#dae7f6 1px dotted';
	}
	var onlineHiddenAll = doHiddenAll;
	doHiddenAll=function(){
		onlineHiddenAll();
		var top= document.getElementById("window_top");
		var left_tree=document.getElementById("left_tree");
		if(left_tree.style.display=="none"&&top.offsetHeight == 0 ){
			templatepanel.setWidth(document.body.clientWidth-30);
			Ext.getCmp("bottompanel").setWidth(document.body.clientWidth-70);
			Ext.getCmp("viewpanel").setWidth(document.body.clientWidth-70);
			Ext.getCmp("detailGrid").setWidth(document.body.clientWidth-70);
		}
		if(left_tree.style.display=="block"&&top.offsetHeight != 0)	{
			var treeWidth = left_tree.offsetWidth+30;
			templatepanel.setWidth(document.body.clientWidth-treeWidth);
			Ext.getCmp("bottompanel").setWidth(document.body.clientWidth-treeWidth-30);
			Ext.getCmp("viewpanel").setWidth(document.body.clientWidth-treeWidth-30);
			Ext.getCmp("detailGrid").setWidth(document.body.clientWidth-treeWidth-30);
		}
	}
	
	var onlineHiddenLeft = doHiddenLeft;
	doHiddenLeft=function(obj){
		onlineHiddenLeft(obj);
		var left_tree=document.getElementById("left_tree");
		if(left_tree.style.display=="none"){
		 	templatepanel.setWidth(document.body.clientWidth-30);
			Ext.getCmp("bottompanel").setWidth(document.body.clientWidth-70);
			Ext.getCmp("viewpanel").setWidth(document.body.clientWidth-70);
			Ext.getCmp("detailGrid").setWidth(document.body.clientWidth-70);
		}
		else{
			var treeWidth = left_tree.offsetWidth+30;
			templatepanel.setWidth(document.body.clientWidth-treeWidth);
			Ext.getCmp("bottompanel").setWidth(document.body.clientWidth-treeWidth-30);
			Ext.getCmp("viewpanel").setWidth(document.body.clientWidth-treeWidth-30);
			Ext.getCmp("detailGrid").setWidth(document.body.clientWidth-treeWidth-30);
		}
	}
	JQ("body").bind("mouseup",function(event){
		var left_tree=document.getElementById("left_tree");
		if(left_tree.style.display=="none"){
		 	templatepanel.setWidth(document.body.clientWidth-30);
			Ext.getCmp("bottompanel").setWidth(document.body.clientWidth-70);
			Ext.getCmp("viewpanel").setWidth(document.body.clientWidth-70);
			Ext.getCmp("detailGrid").setWidth(document.body.clientWidth-70);
		}
		else{
			var treeWidth = left_tree.offsetWidth+30;
			templatepanel.setWidth(document.body.clientWidth-treeWidth);
			Ext.getCmp("bottompanel").setWidth(document.body.clientWidth-treeWidth-30);
			Ext.getCmp("viewpanel").setWidth(document.body.clientWidth-treeWidth-30);
			Ext.getCmp("detailGrid").setWidth(document.body.clientWidth-treeWidth-30);
		}
	});
	//-----------------------------------------
	var coltype="";//
	var comdata;
	var comstore = new Ext.data.Store({
		 proxy: new Ext.data.MemoryProxy(comdata),
		 reader: new Ext.data.JsonReader({}, [{name:'itemid'},{name:'name'}])
	 			})
	comstore.load();
	var questionType = new Ext.form.ComboBox({
		id:'questionType',
		editable: false,
		store: comstore,
		emptyText: '��ѡ����������',
		mode:'local',
		triggerAction: 'all',
		width:130,
		valueField: 'itemid',
    	displayField: 'name',
        tpl:'<tpl for=".">' +   
            '<div class="x-combo-list-item" style="height:12px;">' +   
            '{name}' +   
        '</div>'+   
        '</tpl>' 
    });
    var arr = new Array();
    var obj1={};
	obj1.questionarea="";
	obj1.itemid="00000";
	arr.push(obj1);
	for(var i = 0;i < typemap.length;i ++ ){
		arr.push(typemap[i]);
	}
	comstore.loadData(arr);
   //----------��������-------------------	
   var leveldata;
   var levelstore = new Ext.data.Store({
		 proxy: new Ext.data.MemoryProxy(leveldata),
		 reader: new Ext.data.JsonReader({totalProperty:'result',  
			   root:'data' , remoteSort:true  
		 			}, [{name:'itemid'},
			            {name:'questionlevel'}
			            ])
	 			})
	levelstore.load();
	levelstore.loadData(levelmap);
	
	//���÷�����ҳ������panel
	var templatepanel = new Ext.Panel({
		bodyStyle:'margin:0px 0px 0px 0px;',
		frame:true,
		layout:'column',
		border:false,
		autoWidth:true,
		autoHeight:true,
		renderTo:'newID',
		items:[Ext_lt_Statistic[0],Ext_lt_Statistic[1]]
	});
	//����������е����ı�ͼ
	var config = {};
	config.type = 'questionarea';
	//�û���ǰ���������Ϊ�����ѯ���е���
	config.area= localquestionarea;
	Ext.lt.RCP.script(onlinehelpurl,"adminhelp", "findQuestions", config,function (resp) {
		document.getElementById('chartdiv').innerHTML="";
		if(resp.length>0){
			var chart = new FusionCharts(_ROOT_PATH_+"/ltext/Charts/Pie2D.swf", "ChartId", 500, "350");
			var xml=[];//unescapeLinks=\'0\'����������룻%26apos; ������'�������ų�ͻ����˸���%26apos;���浥����
			xml.push('<chart caption=\'�������������\'  palette=\'4\' decimals=\'0\' baseFontSize =\'12\' bgColor=\'99CCFF,FFFFFF\'  bgAngle=\'360\' showBorder=\'1\' startingAngle=\'70\' unescapeLinks=\'0\' >');
			for(var i = 0;i < resp.length;i ++){//clickURL=\'\'
				var map = resp[i];
				xml.push('<set link=\'javascript:Ext_lt_Statistic.onPathTypeClick(%26apos;'+map.type+'%26apos;);\'   label=\''+map.type+'\' value=\''+map.count+'\'/>'); 
			} 
			xml.push('</chart>');
		    chart.setDataXML(xml.join(''));
			chart.render("chartdiv");
		}
	});		
	if(document.getElementById("left_tree").style.display=="none"){
		templatepanel.setWidth(document.body.clientWidth-30);
		Ext.getCmp("bottompanel").setWidth(document.body.clientWidth-70);
		Ext.getCmp("viewpanel").setWidth(document.body.clientWidth-70);
		Ext.getCmp("detailGrid").setWidth(document.body.clientWidth-70);
	}
</script> 
