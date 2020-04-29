<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ page import="gov.mof.fasp.sec.util.SecureUtil"%>
<%@ page import="gov.mof.fasp.ca.user.UserDTO" %>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>
<%@ page import="gov.mof.framework.util.DBUtil"%>
<%@ page import="gov.mof.fasp.systemset.dto.SystemSetDTO"%>
<%@ page import="gov.mof.fasp.systemset.bpo.ISystemSetService"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
			 UserDTO user = SecureUtil.getCurrentUser();
//存储问题的服务地址
String onlinehelpurl=(String)request.getSession().getAttribute("onlinehelpurl");
//问题类型
String typemap=(String)request.getSession().getAttribute("typemap");
//问题紧急类型
String levelmap=(String)request.getSession().getAttribute("levelmap");
//问题地区
String localquestionarea=(String)request.getSession().getAttribute("questionarea");
//查询本地区还是所有地区
String clearset=(String)request.getSession().getAttribute("clearset");
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
   <script type="text/javascript">
     var onlinehelpurl='<%=onlinehelpurl%>';
     var localquestionarea='<%=localquestionarea%>';
     var _ROOT_PATH_='<%=basePath%>';
     var typemap = eval(<%=typemap%>);  
     var levelmap = eval(<%=levelmap%>);
     var clearset='<%=clearset%>';    
  </script>
  <link rel="stylesheet" type="text/css" href="<%=basePath%>/ltext/style/ext-all.css"/> 
  <script type="text/javascript" src="<%=basePath%>/ltext/frameworksupport.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/ltext_core.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/ltext_template.js"></script>
  <script type="text/javascript" src="<%=basePath%>/js/template.js"></script>
  <script type="text/javascript" src="<%=basePath%>/portal/js/onlinehelp/clearQuestion.js"></script>
  <script type="text/javascript" src="<%=basePath%>/portal/js/login/ltext_common_menu.js"></script>
    <style type="text/css">
	.ifmissubmenuqtree .overlink a{color:#000;text-decoration:none;}
	.ifmissubmenuqtree .overlink a:hover{color:#D70312;text-decoration:underline;}
  </style>
  </head>
    <body>
    	<div id='query_t' style="margin:0 0 0 0;width:expression(document.body.clientWidth-200);height:20px;background:#dae7f6;overflow:hidden;">
    	<span style="border: #dae7f6 1px solid;"><span style="border: #dae7f6 1px solid;" title="查询" class="query_btn" onclick="queryquestioin()" onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#">查询</a></span><span style="border: #dae7f6 1px solid;">｜</span></span>
    	<span style="border: #dae7f6 1px solid;"><span style="border: #dae7f6 1px solid;" title="清除查询条件" class="clear_btn" onclick="clear_btnquestioin()" onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#">清除查询条件</a></span><span style="border: #dae7f6 1px solid;">｜</span></span>
		<span style="border: #dae7f6 1px solid;"><span style="border: #dae7f6 1px solid;" title="删除" class="del_btn" onclick="delquestion()" onmouseover="doChangBg(this)" onmouseout="doReturn(this)"><a href="#">删除</a></span><span style="border: #dae7f6 1px solid;">｜</span></span>
		<span style="border: #dae7f6 1px solid;"><span style="border: #dae7f6 1px solid;" title="问题流程" class="auditInfo_btn" onclick="auditInfoquestion();" onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#">问题流程</a></span><span style="border: #dae7f6 1px solid;">｜</span></span>
    	<span style="border: #dae7f6 1px solid;"><span style="border: #dae7f6 1px solid;" title="查看" style="float: left;height: 20px;background-image: url(/images/done_btn/view.gif);background-repeat: no-repeat;background-position: left;padding-left: 18px;padding-right: 5px;" onclick="showquestion();" onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#">查看</a></span></span>
    	</div>
   		<div id = 'newID'></div>
   </body>
</html>
<script type="text/javascript">
function doReturn(obj) {
    var btn_bg = obj.parentNode;
    btn_bg.className = ' ';
    obj.style.border='#dae7f6 1px dotted';
   
}
//查询
function queryquestioin(){
	var search = new Object();
	search.questionname = Ext.getCmp("textfieldnewquestionName").getValue();
	search.questiontype = Ext.getCmp("questionType").getValue()+"";
	search.questionarea = Ext.getCmp("questionArea").getValue()+"";;
 	Ext_lt_ClearQuestion.loadGrid(search);
}
//删除
function delquestion(){
		Ext_lt_ClearQuestion.delGridPanel();
}
//问题流程
function auditInfoquestion(){
		Ext_lt_ClearQuestion.processflow();
}
//查看
function showquestion(){
		Ext_lt_ClearQuestion.showpanel();
}
//清除查询条件
function clear_btnquestioin(){
    Ext.getCmp("textfieldnewquestionName").setValue();
    Ext.getCmp("questionType").setValue();
    Ext.getCmp("questionArea").setValue();
}
//---------------------------------------------------------------------
if(Ext.lt.portal==null) Ext.lt.portal = {component:{}};
var onlineHiddenAll = doHiddenAll;
doHiddenAll=function(){
	onlineHiddenAll();
	var top= document.getElementById("window_top");
	var left_tree=document.getElementById("left_tree");
	if(left_tree.style.display=="none"&&top.offsetHeight == 0 ){
		templatesuperUser.setWidth(document.body.clientWidth-30);
		document.getElementById("query_t").style.width=document.body.clientWidth-30;
		Ext.getCmp("clearquestionGrid").setWidth(document.body.clientWidth-30);
	}
	if(left_tree.style.display=="block"&&top.offsetHeight != 0)	{
		var treeWidth = left_tree.offsetWidth+30;
		templatesuperUser.setWidth(document.body.clientWidth-treeWidth);
		document.getElementById("query_t").style.width=document.body.clientWidth-treeWidth;
		Ext.getCmp("clearquestionGrid").setWidth(document.body.clientWidth-treeWidth);
	}
}

var onlineHiddenLeft = doHiddenLeft;
doHiddenLeft=function(obj){
	onlineHiddenLeft(obj);
	var left_tree=document.getElementById("left_tree");
	if(left_tree.style.display=="none"){
	 	templatesuperUser.setWidth(document.body.clientWidth-30);
		document.getElementById("query_t").style.width=document.body.clientWidth-30;
		Ext.getCmp("clearquestionGrid").setWidth(document.body.clientWidth-30);
	}
	else{
		var treeWidth = left_tree.offsetWidth+30;
		templatesuperUser.setWidth(document.body.clientWidth-treeWidth);
	    document.getElementById("query_t").style.width=document.body.clientWidth-treeWidth;
	    Ext.getCmp("clearquestionGrid").setWidth(document.body.clientWidth-treeWidth);
	}
}
JQ("body").bind("mouseup",function(event){
	var left_tree=document.getElementById("left_tree");
	if(left_tree.style.display=="none"){
	 	templatesuperUser.setWidth(document.body.clientWidth-30);
		document.getElementById("query_t").style.width=document.body.clientWidth-30;
		Ext.getCmp("clearquestionGrid").setWidth(document.body.clientWidth-30);
	}
	else{
		var treeWidth = left_tree.offsetWidth+30;
		templatesuperUser.setWidth(document.body.clientWidth-treeWidth);
	    document.getElementById("query_t").style.width=document.body.clientWidth-treeWidth;
	    Ext.getCmp("clearquestionGrid").setWidth(document.body.clientWidth-treeWidth);
	}
});
//---------------------------------------------------------------------------------------------------------
	var temp;
	//-------------------问题类型------------------------------------------
	var comdata;
	var comstore = new Ext.data.Store({
		 proxy: new Ext.data.MemoryProxy(comdata),
		 reader: new Ext.data.JsonReader({}, [{name:'itemid'},
				            {name:'name'}
				            ])
		 			})
	comstore.load();
	var questionType = new Ext.form.ComboBox({
		id:'questionType',
		editable: false,
		store: comstore,
		emptyText: '请选择问题类型',
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
	//------------------------地区列表----------------------------------
	var areadata;
	var areastore = new Ext.data.Store({
		 proxy: new Ext.data.MemoryProxy(areadata),
		 reader: new Ext.data.JsonReader({}, [{name:'itemid'}, {name:'questionarea'}])
	 			})
	areastore.load();
	var questionArea = new Ext.form.ComboBox({
		id:'questionArea',
		editable: false,
		store: areastore,
		hidden:clearset==1?false:true,
		emptyText: '请选择问题地区',
		mode:'local',
		triggerAction: 'all',
		width:130,
		valueField: 'questionarea',
    	displayField: 'questionarea',
        tpl:'<tpl for=".">' +   
            '<div class="x-combo-list-item" style="height:12px;">' +   
            '{questionarea}' +   
        	'</div>'+   
        	'</tpl>' 
	});
   	//设置时0条件只显示本地区，如果为1 ，去主服务查询所有的地区
	if(clearset==0){
   		var arr=new Array();
   		var obj1={};
   		obj1.questionarea="";
   		obj1.itemid="0";
   		arr.push(obj1);
   		if(localquestionarea!=null&&localquestionarea!=""){
   			var obj2={};
   			obj2.questionarea=localquestionarea;
   			obj2.itemid="1";
   			arr.push(obj2);
   		}	
   		areastore.loadData(arr);
   }else{
    	Ext.lt.RCP.script(onlinehelpurl,"useonliehelp", "findAreas",null,function (resp) {
  			areastore.loadData(resp);
  		 });	
   }	
	/*
	------------紧急类型----------------------------------------
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
	--------------gridpanel--------------------------------------------
	*/
	var templatesuperUser =new Ext.Panel({
		bodyStyle:'margin:0px 0px 0px 0px;',
		width:document.body.clientWidth-200,   
		//layout: 'column',
		border:false,
		autoHeight:true,
		renderTo:'newID',
		defaults: {  
	        autoScroll: true,  
	        autoHeight:true
   		},  
		items:[Ext_lt_ClearQuestion],
		tbar:new Ext.Toolbar(['标题：',{xtype:'textfield',width:130,id:'textfieldnewquestionName'},'-',
							  '问题类型：',questionType,'-',
							  clearset==1?'问题地区:&nbsp&nbsp':'',questionArea
							])	
	});
	if(document.getElementById("left_tree").style.display=="none"){
		templatesuperUser.setWidth(document.body.clientWidth-30);
		document.getElementById("query_t").style.width=document.body.clientWidth-30;
		Ext.getCmp("clearquestionGrid").setWidth(document.body.clientWidth-30);
	}
</script>