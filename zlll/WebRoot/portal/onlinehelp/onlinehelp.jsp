<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ page import="gov.mof.fasp.sec.util.SecureUtil"%>
<%@ page import="gov.mof.fasp.ca.user.UserDTO" %>
<%@ page import="java.util.Map"%>
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
//存储问题的服务地址
String onlinehelpurl=(String)request.getSession().getAttribute("onlinehelpurl");
//问题类型
String typemap=(String)request.getSession().getAttribute("typemap");
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
   <script type="text/javascript">
   var username='<%=username%>';
   var usercode='<%=usercode%>';
   var onlinehelpurl='<%=onlinehelpurl%>';
   var typemap = eval(<%=typemap%>);  
   var _ROOT_PATH_='<%=basePath%>';
  </script>
  <link rel="stylesheet" type="text/css" href="<%=basePath%>/ltext/style/ext-all.css"/> 
  <link rel="stylesheet" type="text/css" href="<%=basePath%>/portal/style/fileuploadfield.css"/> 
  <script type="text/javascript" src="<%=basePath%>/ltext/frameworksupport.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/ltext_core.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/ltext_template.js"></script>
  <script type="text/javascript" src="<%=basePath%>/portal/js/login/ltext_common_menu.js"></script>
  <script type="text/javascript" src="<%=basePath%>/js/template.js"></script>
  <script type="text/javascript" src="<%=basePath%>/portal/js/FileUploadField.js"></script>
  <script type="text/javascript" src="<%=basePath%>/portal/js/onlinehelp/searchquestion.js"></script>
  <style type="text/css">
	.ifmissubmenuqtree .overlink a{color:#000;text-decoration:none;}
	.ifmissubmenuqtree .overlink a:hover{color:#D70312;text-decoration:underline;}
  </style>
  </head>
	<body>
		<div id='query_t' style="margin:0 0 0 0;width:expression(document.body.clientWidth-200);height:20px;background:#dae7f6;overflow:hidden;">
	    	<span ><input id="textfieldnewquestionName" type="text" size="40" value="请输入检索内容" onclick="overfind()" onmouseout="outfind()" ></span>
	    	<span style="border: #dae7f6 1px solid;"><span style="border: #dae7f6 1px solid;" title="查询" class="query_btn" onclick="queryquestioin()" onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#">查询</a></span><span style="border: #dae7f6 1px solid;">｜</span></span>
	    	<span style="border: #dae7f6 1px solid;"><span style="border: #dae7f6 1px solid;" title="清除查询条件" class="clear_btn" onclick="clear_btnquestioin()" onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#">清除查询条件</a></span><span style="border: #dae7f6 1px solid;">｜</span></span>
	    	<span style="border: #dae7f6 1px solid;"><span style="border: #dae7f6 1px solid;" title="高级查询" style="float: left;height: 20px;background-image: url(/images/done_btn/find.gif);background-repeat: no-repeat;background-position: left;padding-left: 18px;padding-right: 5px;" onclick="highquery();" onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#">高级查询</a></span><span style="border: #dae7f6 1px solid;">｜</span></span>
	    	<span style="border: #dae7f6 1px solid;"><span style="border: #dae7f6 1px solid;" title="查看" style="float: left;height: 20px;background-image: url(/images/done_btn/view.gif);background-repeat: no-repeat;background-position: left;padding-left: 18px;padding-right: 5px;" onclick="showquestion();" onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#">查看</a></span></span>
    	</div>
   		<div id = 'newID'></div>
  </body>
</html>
<script type="text/javascript">
	var tempid ="0";//记录当前问题类型
	function doReturn(obj) {
	    var btn_bg = obj.parentNode;
	    btn_bg.className = ' ';
	    obj.style.border='#dae7f6 1px dotted';
	}
	function overfind(){
		var o = document.getElementById("textfieldnewquestionName");
		if(o.value=="请输入检索内容"){
			o.value="";
		}
	}
	function outfind(){
		var o = document.getElementById("textfieldnewquestionName");
		if(o.value==""){
			o.value="请输入检索内容";
		}
	}
	//查询
	function queryquestioin(){
		 var obj = document.getElementById("textfieldnewquestionName");
		 var search = new Object();
		 search.searchid=tempid;
		 search.searchcondition=obj.value=="请输入检索内容"?"":obj.value;
		 Ext_lt_SearchQuestion.loadGrid(search);
	}
	//高级查询
	function highquery(){
		var form = new Ext.form.FormPanel({
				id:'',
			    labelWidth:60,
				title: '高级查询',
				frame:true,
				layout:'fit',
				height:200,
				items:[{
					layout:'column',
					items:[{
							layout: 'form',
							columnWidth:.99,
							items:[{xtype:'textfield',fieldLabel:'提 问 人',id:'highsearchquestionuser',anchor:'99%'}]
					    },{
							layout:'form',
							columnWidth:.99,
							items:[{xtype:'textfield',fieldLabel:'提问单位',id:'highsearchquestionagency',anchor:'99%'}]
						},{
							layout:'form',
							columnWidth:.99,
							items:[{xtype:'textfield',fieldLabel:'提问标题',id:'highsearchquestionname',anchor:'99%'}]
						},{
							layout:'form',
							columnWidth:.99,
							items:[{xtype:'textfield',fieldLabel:'提问内容',id:'highsearchquestioncontent',anchor:'99%'}]
						},{
							layout:'form',
							columnWidth:.5,
							items:[{
								columnWidth:.5,
								layout: 'form',
								items:[{xtype:'datefield',fieldLabel:'发布时间',id:'highsearchquestionstartdate',format:'Y-m-d',anchor:'95%', editable:false}]
					  		}]
						},{
							layout:'form',
							columnWidth:.5,
							items:[{
								columnWidth:.5,
								layout: 'form',
								items:[{xtype:'datefield',fieldLabel:'至',id:'highsearchquestionenddate',format:'Y-m-d',anchor:'95%',editable:false}]
					  		}]
						},{
							layout:'form',
							columnWidth:.99,
							items:[{xtype:'textfield',fieldLabel:'答 复 人',id:'highsearchansweruser',anchor:'99%'}]
						}]
					}]
				});
				var highsearchwin = new Ext.Window({
					width:400,
					autoHeight:true,
					height:236,
					closeAction:'close',
					closable:false,
					items:[form],
					buttons:[{text:'确定',listeners:{'click':function(){
									var search = new Object();
									search.questionname=Ext.getCmp("highsearchquestionname").getValue();
									search.questionuser=Ext.getCmp("highsearchquestionuser").getValue();
									search.questionagency=Ext.getCmp("highsearchquestionagency").getValue();
									search.questionstartdate=Ext.getCmp("highsearchquestionstartdate").getValue();
									search.questionenddate=Ext.getCmp("highsearchquestionenddate").getValue();
									if(search.questionstartdate!=""){
											search.questionstartdate=Ext.getCmp("highsearchquestionstartdate").getValue().format('Y-m-d');
									}
									if(search.questionenddate!=""){
											search.questionenddate=Ext.getCmp("highsearchquestionenddate").getValue().format('Y-m-d');
									}	
									if(search.questionstartdate!=""&&search.questionenddate!=""){
										if(search.questionstartdate>search.questionenddate){alert("起始时间大于结束时间");return;}
									}
									search.answeruser=Ext.getCmp("highsearchansweruser").getValue();
									search.questioncontent=Ext.getCmp("highsearchquestioncontent").getValue();
									search.searchid=tempid;
									Ext_lt_SearchQuestion.loadGrid(search);
									highsearchwin.close();
								}}
							},{text :'关闭',listeners:{'click':function(){highsearchwin.close();}}},
								{text :'清空',listeners:{'click':function(){
									Ext.getCmp("highsearchquestionuser").setValue("");
									Ext.getCmp("highsearchquestionagency").setValue("");
									Ext.getCmp("highsearchquestionname").setValue("");
									Ext.getCmp("highsearchquestionstartdate").setValue("");
									Ext.getCmp("highsearchquestionenddate").setValue("");
									Ext.getCmp("highsearchansweruser").setValue("");
									Ext.getCmp("highsearchaudituser").setValue("");
									}}}]
					
					});
				highsearchwin.show();
	}
	//查看
	function showquestion(){
		Ext_lt_SearchQuestion.showpanel();
	}
	//清除查询条件
	function clear_btnquestioin(){
	    document.getElementById("textfieldnewquestionName").value="请输入检索内容";
	}
//---------------------------------------------------------------------
var onlineHiddenAll = doHiddenAll;
doHiddenAll=function(){
	onlineHiddenAll();
	var top= document.getElementById("window_top");
	var left_tree=document.getElementById("left_tree");
	if(left_tree.style.display=="none"&&top.offsetHeight == 0 ){
			userTabPanel.setWidth(document.body.clientWidth-190);
			templatesuperUser.setWidth(document.body.clientWidth-30);
			document.getElementById("query_t").style.width=document.body.clientWidth-30;
			tree.setHeight(document.body.clientHeight-75);
	}
	if(left_tree.style.display=="block"&&top.offsetHeight != 0)	{
		var treeWidth = left_tree.offsetWidth+30;
		userTabPanel.setWidth(document.body.clientWidth-treeWidth-160);
		templatesuperUser.setWidth(document.body.clientWidth-treeWidth);
		document.getElementById("query_t").style.width=document.body.clientWidth-treeWidth;
		tree.setHeight(document.body.clientHeight-150);
	}
}

var onlineHiddenLeft = doHiddenLeft;
doHiddenLeft=function(obj){
	onlineHiddenLeft(obj);
	var left_tree=document.getElementById("left_tree");
	if(left_tree.style.display=="none"){
	 	userTabPanel.setWidth(document.body.clientWidth-190);
	 	templatesuperUser.setWidth(document.body.clientWidth-30);
	 	document.getElementById("query_t").style.width=document.body.clientWidth-30;
	}
	else{
		var treeWidth = left_tree.offsetWidth+30;
		userTabPanel.setWidth(document.body.clientWidth-treeWidth-160);
		templatesuperUser.setWidth(document.body.clientWidth-treeWidth);
		document.getElementById("query_t").style.width=document.body.clientWidth-treeWidth;
	}
}

JQ("body").bind("mouseup",function(event){
	var left_tree=document.getElementById("left_tree");
	if(left_tree.style.display=="none"){
	 	userTabPanel.setWidth(document.body.clientWidth-190);
	 	templatesuperUser.setWidth(document.body.clientWidth-30);
	 	document.getElementById("query_t").style.width=document.body.clientWidth-30;
	}
	else{
		var treeWidth = left_tree.offsetWidth+30;
		userTabPanel.setWidth(document.body.clientWidth-treeWidth-160);
		templatesuperUser.setWidth(document.body.clientWidth-treeWidth);
		document.getElementById("query_t").style.width=document.body.clientWidth-treeWidth;
	}
});
//---------------------------------------------------------------------------------------------------------
	var tree = new Ext.tree.TreePanel({
			width:160,
			border:false,
			style:'border-right: 1px solid #8db2e3;',
			height:document.body.clientHeight-150

	});
	var root = new Ext.tree.TreeNode({text:'问题分类'});
	tree.setRootNode(root);    
	

	var userTabPanel = new Ext.Panel({
       	border:false,
       	width:document.body.clientWidth-360,
        layout:'fit',
     	plain:true,
     	viewConfig:{
				forceFit:true,
				enableRowBody:true,
				showPreview:true
			},	
     	defaults:{autoScroll: true},
    	items:[Ext_lt_SearchQuestion]
		});

	var templatesuperUser =new Ext.Panel({
		bodyStyle:'margin:0px 0px 0px 0px;',
		width:document.body.clientWidth-200,   
		frame:false,
		layout:'column',
		border:false,
		autoHeight:true,
		renderTo:'newID',
		items:[tree,userTabPanel]
	});
	//加载左侧问题类型树-----------------------------------------------
	var data = typemap;
	var node = new Ext.tree.TreeNode({text:'全部分类',id:'0'});
	root.appendChild(node);
	for(var i =0;i<data.length;i++){
			var node = new Ext.tree.TreeNode({text:data[i].name,id:data[i].itemid});
			root.appendChild(node);
	}
	tree.render();   
	root.expand(true,true);//直接全部展开，不用去挨个点开节点
	tree.on('click',function(node){
	        searchid=node.id;
	        var search = new Object();
	        var obj = document.getElementById("textfieldnewquestionName");
			search.questionname=obj.value=="请输入检索内容"?"":obj.value;
			//点击问题分类与点击全部分类效果相同
			if(node.id=='xnode-6'){
				search.searchid="0";
			    tempid="0";
			}else{
				search.searchid=node.id+"";
				tempid=node.id+"";
			}
			Ext_lt_SearchQuestion.loadGrid(search);
	})
	//---------------------------------------------------------------------------------------
	if(document.getElementById("left_tree").style.display=="none"){
		userTabPanel.setWidth(document.body.clientWidth-190);
		templatesuperUser.setWidth(document.body.clientWidth-30);
	}
	var top= document.getElementById("window_top");
	if(top.offsetHeight==0){tree.setHeight(document.body.clientHeight-65);}
</script>
