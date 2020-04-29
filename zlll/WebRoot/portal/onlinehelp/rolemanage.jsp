<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%
response.setHeader("Cache-Control","no-cache"); 
response.setHeader("Pragma","no-cache"); 
response.setDateHeader("Expires",0); 
String path = request.getContextPath();
String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
   <script type="text/javascript">
   var _ROOT_PATH_='<%=basePath%>';
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
  <script type="text/javascript" src="<%=basePath%>/portal/js/onlinehelp/rolemanage.js"></script>
  <script type="text/javascript" src="<%=basePath%>/portal/js/login/ltext_common_menu.js"></script>
   <style type="text/css">
	.ifmissubmenuqtree .overlink a{color:#000;text-decoration:none;}
	.ifmissubmenuqtree .overlink a:hover{color:#D70312;text-decoration:underline;}
  </style>	
  </head>
	<body>
		<div id = 'newID'></div>
    </body>
</html>
<script type="text/javascript">
var onlineHiddenAll = doHiddenAll;
doHiddenAll=function(){
	onlineHiddenAll();
	var top= document.getElementById("window_top");
	var left_tree=document.getElementById("left_tree");
	if(left_tree.style.display=="none"&&top.offsetHeight == 0 ){
			template.setWidth(document.body.clientWidth-30);
			Ext.getCmp("rolepanel").setHeight(document.body.clientHeight-130);
			Ext.getCmp("rolegrid").setHeight(document.body.clientHeight-130);
			Ext.getCmp("usergrid").setHeight(document.body.clientHeight-130);
			Ext.getCmp("userpanel").setHeight(document.body.clientHeight-130);
			Ext.getCmp("typegrid").setHeight(document.body.clientHeight-103);
			Ext.getCmp("typepanel").setHeight(document.body.clientHeight-103);
	}
	if(left_tree.style.display=="block"&&top.offsetHeight != 0)	{
		var hh = top.offsetHeight;
		hh=hh+110;
		var treeWidth = left_tree.offsetWidth+30;
		template.setWidth(document.body.clientWidth-treeWidth);
		Ext.getCmp("rolepanel").setHeight(document.body.clientHeight-hh);
		Ext.getCmp("rolegrid").setHeight(document.body.clientHeight-hh);
		Ext.getCmp("usergrid").setHeight(document.body.clientHeight-hh);
		Ext.getCmp("userpanel").setHeight(document.body.clientHeight-hh);
		Ext.getCmp("typegrid").setHeight(document.body.clientHeight-hh+27);
		Ext.getCmp("typepanel").setHeight(document.body.clientHeight-hh+27);
	}
}

var onlineHiddenLeft = doHiddenLeft;
doHiddenLeft=function(obj){
	onlineHiddenLeft(obj);
	var left_tree=document.getElementById("left_tree");
	if(left_tree.style.display=="none"){
	 	template.setWidth(document.body.clientWidth-30);
	}
	else{
		var treeWidth = left_tree.offsetWidth+30;
		template.setWidth(document.body.clientWidth-treeWidth);
	}
}
var onlineHiddenTop = doHiddenTop;
doHiddenTop=function(obj){
	onlineHiddenTop(obj);
	var top = document.getElementById("window_top");
	if(top.offsetHeight==0){
		Ext.getCmp("rolepanel").setHeight(document.body.clientHeight-130);
		Ext.getCmp("rolegrid").setHeight(document.body.clientHeight-130);
		Ext.getCmp("usergrid").setHeight(document.body.clientHeight-130);
		Ext.getCmp("userpanel").setHeight(document.body.clientHeight-130);
		Ext.getCmp("typegrid").setHeight(document.body.clientHeight-103);
		Ext.getCmp("typepanel").setHeight(document.body.clientHeight-103);     
	}
	else{
		var hh= top.offsetHeight;
		hh=hh+110;
		Ext.getCmp("rolepanel").setHeight(document.body.clientHeight-hh);
		Ext.getCmp("rolegrid").setHeight(document.body.clientHeight-hh);
		Ext.getCmp("usergrid").setHeight(document.body.clientHeight-hh);
		Ext.getCmp("userpanel").setHeight(document.body.clientHeight-hh);
		Ext.getCmp("typegrid").setHeight(document.body.clientHeight-hh+27);
		Ext.getCmp("typepanel").setHeight(document.body.clientHeight-hh+27); 
	}
}

JQ("body").bind("mouseup",function(event){
	var left_tree=document.getElementById("left_tree");
	if(left_tree.style.display=="none"){
	 	template.setWidth(document.body.clientWidth-30);
	}
	else{
		var treeWidth = left_tree.offsetWidth+30;
		template.setWidth(document.body.clientWidth-treeWidth);
	}
});
//---------------------------------------------------------------------------------------------------------
		var cond = "";//检索用户匹配的条件
		var start=-1;//检索用户匹配的条件
		var todo=[];//检索用户匹配的条件
		var searchindex=-1;//检索用户匹配的条件
		var template = new Ext.Panel({
			bodyStyle:'margin:0px 0px 0px 0px;',
			width:document.body.clientWidth-200,   
			border:false,
			layout:'column',
			autoHeight:true,
			renderTo:'newID',
			defaults: {  
		        autoScroll: true,  
		        autoHeight:true
	   		},  
			items:[Ext_lt_RoleManage[0],Ext_lt_RoleManage[1],Ext_lt_RoleManage[2],Ext_lt_RoleManage[3]],
			tbar:new Ext.Toolbar()	
		});
//---------------------------------------------------------------------------------------------------------		
	if(document.getElementById("left_tree").style.display=="none"){
		template.setWidth(document.body.clientWidth-30);
	}
	var temp = document.getElementById("window_top");
	if(temp.offsetHeight==0){
		Ext.getCmp("rolepanel").setHeight(document.body.clientHeight-130);
		Ext.getCmp("rolegrid").setHeight(document.body.clientHeight-130);
		Ext.getCmp("usergrid").setHeight(document.body.clientHeight-130);
		Ext.getCmp("userpanel").setHeight(document.body.clientHeight-130);
		Ext.getCmp("typegrid").setHeight(document.body.clientHeight-103);
		Ext.getCmp("typepanel").setHeight(document.body.clientHeight-103);
	}
</script>
