<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ page import="gov.mof.fasp.sec.util.SecureUtil"%>
<%@ page import="gov.mof.fasp.ca.user.UserDTO" %>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>
<%@ page import="gov.mof.framework.util.DBUtil"%>
<%@ page import="gov.mof.fasp.systemset.dto.SystemSetDTO"%>
<%@ page import="gov.mof.fasp.systemset.bpo.ISystemSetService"%>
<%
response.setHeader("Cache-Control","no-cache"); 
response.setHeader("Pragma","no-cache"); 
response.setDateHeader("Expires",0); 
String path = request.getContextPath();
String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
			 UserDTO user = SecureUtil.getCurrentUser();
//当前用户名
String username=user.getName();
String usercode=user.getCode();	
//记录当前是一线人员还是二线人员
String usertype=(String)request.getSession().getAttribute("questionmenutype");
String nextoperate=(String)request.getSession().getAttribute("nextoperate");
//存储问题的服务地址
String onlinehelpurl=(String)request.getSession().getAttribute("onlinehelpurl");
//问题类型
String typemap=(String)request.getSession().getAttribute("typemap");
//问题紧急类型
String levelmap=(String)request.getSession().getAttribute("levelmap");
//问题地区
String localquestionarea=(String)request.getSession().getAttribute("questionarea");
//查询本地区还是所有地区
String adminset=(String)request.getSession().getAttribute("adminset");
ISystemSetService systemSetService = (ISystemSetService) DBUtil.getBeanByName("fasp.systemset.systemSetBPO");
String types="doc,txt,jpg,bmp,xls,png,swf";
try{
	SystemSetDTO systemSetDTO = systemSetService.findSystemSetByCode("portal_postfiletype");
	if(systemSetDTO!=null&&systemSetDTO.isIsused())types = systemSetDTO.getParamdata();
}catch(Exception e){}
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
   <script type="text/javascript">
   var username='<%=username%>';
   var usercode='<%=usercode%>';
   var usertype='<%=usertype%>';
   var nextoperate='<%=nextoperate%>';
   var onlinehelpurl='<%=onlinehelpurl%>';
   var localquestionarea='<%=localquestionarea%>';
   var adminset='<%=adminset%>';
   var types='<%=types%>';
   var typemap = eval(<%=typemap%>); 
   var levelmap = eval(<%=levelmap%>);  
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
  <script type="text/javascript" src="<%=basePath%>/portal/js/onlinehelp/adminHelpAnswer.js"></script>
  <script type="text/javascript" src="<%=basePath%>/portal/js/onlinehelp/adminHelpNewQuestion.js"></script>
    <style type="text/css">
	.ifmissubmenuqtree .overlink a{color:#000;text-decoration:none;}
	.ifmissubmenuqtree .overlink a:hover{color:#D70312;text-decoration:underline;}
  </style>
  </head>
  <body>
    	<div id='query_t' style="margin:0 0 0 0;width:expression(document.body.clientWidth-200);height:20px;background:#dae7f6;overflow:hidden;">
    	<span style="border: #dae7f6 1px solid;"><span style="border: #dae7f6 1px solid;" title="查询" class="query_btn" onclick="queryquestioin()" onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#">查询</a></span><span style="border: #dae7f6 1px solid;">｜</span></span>
    	<span style="border: #dae7f6 1px solid;"><span style="border: #dae7f6 1px solid;" title="清除查询条件" class="clear_btn" onclick="clear_btnquestioin()" onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#">清除查询条件</a></span><span style="border: #dae7f6 1px solid;">｜</span></span>
    	<span style="border: #dae7f6 1px solid;"><span style="border: #dae7f6 1px solid;" title="答复" class="mod_btn" onclick="answerquestion();" onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#">答复</a></span><span style="border: #dae7f6 1px solid;">｜</span></span>
    	<span style="border: #dae7f6 1px solid;"><span style="border: #dae7f6 1px solid;" title="业务专家" style="float: left;height: 20px;background-image: url(/images/done_btn/chuanchu.gif);background-repeat: no-repeat;background-position: left;padding-left: 18px;padding-right: 5px;" onclick="expertquestion();" onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#">业务专家</a></span><span style="border: #dae7f6 1px solid;">｜</span></span>
    	<span style="border: #dae7f6 1px solid;"><span style="border: #dae7f6 1px solid;" title="<%=nextoperate%>" style="float: left;height: 20px;background-image: url(/images/done_btn/chuanchu.gif);background-repeat: no-repeat;background-position: left;padding-left: 18px;padding-right: 5px;" onclick="answerquestionquestion();" onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#"><%=nextoperate%></a></span><span style="border: #dae7f6 1px solid;">｜</span></span>
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
	questionname = Ext.getCmp("textfieldnewquestionName").getValue();
	questiontype = Ext.getCmp("questionType").getValue()+"";
	questionarea = Ext.getCmp("questionArea").getValue()+"";
	search.questionname = questionname;
	search.questiontype = questiontype;
	search.questionarea = questionarea;
	if(temp.id=='adminanswerGrid'){
		search.flag="0";//待处理
	  	Ext_lt_AdminAnswerContent.loadGrid(search );
 	}else if(temp.id=='adminnewquestionGrid'){
 	  	search.flag="1";//已处理
		Ext_lt_NewAdminQuestion.loadGrid(search );
	}
}
//答复
function answerquestion(){
	if(temp.id=='adminanswerGrid'){
		Ext_lt_AdminAnswerContent.answer();
	}else{alert("请选择待处理中的数据进行答复");}
}
//业务专家
function expertquestion(){
	if(temp.id=='adminanswerGrid'){
			Ext_lt_AdminAnswerContent.expert();
	}else{alert("请选择待处理中的数据");}
}
//上级
function answerquestionquestion(){
	if(temp.id=='adminanswerGrid'){
			Ext_lt_AdminAnswerContent.superior();
	}else{alert("请选择待处理中的数据");}
}
//问题流程
function auditInfoquestion(){
	if(temp.id=='adminanswerGrid'){
			Ext_lt_AdminAnswerContent.processflow();
	}else{
			Ext_lt_NewAdminQuestion.processflow();
	}	
}
//查看
function showquestion(){
	if(temp.id=='adminanswerGrid'){
		Ext_lt_AdminAnswerContent.showpanel();
	}else if(temp.id='adminnewquestionGrid'){
		Ext_lt_NewAdminQuestion.showpanel();
	}
}
//清除查询条件
function clear_btnquestioin(){
    Ext.getCmp("textfieldnewquestionName").setValue();
    Ext.getCmp("questionType").setValue();
    Ext.getCmp("questionArea").setValue();
}
//---------------------------------------------------------------------
var onlineHiddenAll = doHiddenAll;
doHiddenAll=function(){
	onlineHiddenAll();
	var top= document.getElementById("window_top");
	var left_tree=document.getElementById("left_tree");
	if(left_tree.style.display=="none"&&top.offsetHeight == 0 ){
			adminTabPanel.setWidth(document.body.clientWidth-30);
			templateuser.setWidth(document.body.clientWidth-30);
			document.getElementById("query_t").style.width=document.body.clientWidth-30;
	}
	if(left_tree.style.display=="block"&&top.offsetHeight != 0)	{
		var treeWidth = left_tree.offsetWidth+30;
		adminTabPanel.setWidth(document.body.clientWidth-treeWidth);
		templateuser.setWidth(document.body.clientWidth-treeWidth);
		document.getElementById("query_t").style.width=document.body.clientWidth-treeWidth;
	}
}

var onlineHiddenLeft = doHiddenLeft;
doHiddenLeft=function(obj){
	onlineHiddenLeft(obj);
	var left_tree=document.getElementById("left_tree");
	if(left_tree.style.display=="none"){
	 	adminTabPanel.setWidth(document.body.clientWidth-30);
		templateuser.setWidth(document.body.clientWidth-30);
		document.getElementById("query_t").style.width=document.body.clientWidth-30;
	}
	else{
		var treeWidth = left_tree.offsetWidth+30;
		adminTabPanel.setWidth(document.body.clientWidth-treeWidth);
		templateuser.setWidth(document.body.clientWidth-treeWidth);
		document.getElementById("query_t").style.width=document.body.clientWidth-treeWidth;
	}
}
JQ("body").bind("mouseup",function(event){
	var left_tree=document.getElementById("left_tree");
	if(left_tree.style.display=="none"){
	 	adminTabPanel.setWidth(document.body.clientWidth-30);
		templateuser.setWidth(document.body.clientWidth-30);
		document.getElementById("query_t").style.width=document.body.clientWidth-30;
	}
	else{
		var treeWidth = left_tree.offsetWidth+30;
		adminTabPanel.setWidth(document.body.clientWidth-treeWidth);
		templateuser.setWidth(document.body.clientWidth-treeWidth);
		document.getElementById("query_t").style.width=document.body.clientWidth-treeWidth;
	}
});
//---------------------------------------------------------------------------------------------------------
	var temp;
	var questionname="";
	var questiontype="";
	var questionarea="";
	//--------------------问题类型-----------------------------------------
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
	//--------------------问题地区-----------------------------------------
    var areadata;
	var areastore = new Ext.data.Store({
		 proxy: new Ext.data.MemoryProxy(areadata),
		 reader: new Ext.data.JsonReader({}, [{name:'itemid'},{name:'questionarea'} ])
		})
	areastore.load();
	var questionArea = new Ext.form.ComboBox({
		id:'questionArea',
		editable: false,
		hidden:adminset==1?false:true,
		store: areastore,
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
	//设置是0，查询条件只显示本地区，如果为1 ，去主服务查询所有的地区
   if(adminset==0){
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
   //----------紧急类型-------------------	
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
	
	var adminTabPanel = new Ext.TabPanel({
        activeTab: 2,
       	border:false,
        plain:true,
        defaults:{autoScroll: true},
        items:[Ext_lt_AdminAnswerContent,Ext_lt_NewAdminQuestion],
        	listeners: {
  			'tabchange': function(t, p) {
        	var search = new Object();
  			if(p.id=='adminanswerGrid'){
					search.flag="0";//待处理
					questionname = "";
				    questiontype = "";
				    questionarea = "";
  	  				Ext_lt_AdminAnswerContent.loadGrid(search);
  	  			}else if(p.id=='adminnewquestionGrid'){
  	  	  			search.flag="1";//已处理
  	  	  			questionname = "";
				    questiontype = "";
				    questionarea = "";
  					Ext_lt_NewAdminQuestion.loadGrid(search );
  			}
  			temp=p;			
  			}
		}	
		});

	var templateuser =new Ext.Panel({
		bodyStyle:'margin:0px 0px 0px 0px;',
		width:document.body.clientWidth-200,   
		//layout: 'column',
		border:false,
		autoHeight:true,
		renderTo:'newID',
		items:[adminTabPanel],
		tbar:new Ext.Toolbar(['标题：',{xtype:'textfield',width:130,id:'textfieldnewquestionName'},'-',
									'问题类型：',questionType,'-',
									adminset==1?'问题地区:&nbsp&nbsp':'',questionArea
									])	
		});
		if(document.getElementById("left_tree").style.display=="none"){
			adminTabPanel.setWidth(document.body.clientWidth-30);
			templateuser.setWidth(document.body.clientWidth-30);
			document.getElementById("query_t").style.width=document.body.clientWidth-30;
		}
	
	//--------------------------------------
	var gridid;
	var adminfileids="";//修改前附件id
	var isboosave=false;
	function savefile(){
		isboosave=true;
		var div=document.getElementById("newID");
		var p=document.getElementById('file').parentNode;
		var fileDiv=document.createElement("div");
		fileDiv.style.visibility='hidden';
		fileDiv.id='fileDiv';	
		var innerHTMLStr="<form action ='"+onlinehelpurl+"/portaluploadfile.page?usercode="+usercode+"&localquestionarea="+localquestionarea+"' method='post' ENCTYPE='multipart/form-data' id='fileUploadForm' target='fileUploadIfr'>";
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
					if(Ext.getCmp('adminanswer')!=null){
						Ext.getCmp('adminanswer').setDisabled(false);
						Ext.getCmp('submitbus').setDisabled(false);
					}
					isboosave=false;
			     	return false;
				}
				form.appendChild(fileuploads[i]);
			}
		}
		form.submit();
		isNotUpload();
		p.appendChild(document.getElementById('file'));
	}
	function isNotUpload(){
		var para={};
		para.usercode=usercode;
		para.localquestionarea=localquestionarea;
		Ext.lt.RCP.script(onlinehelpurl,"useonliehelp", "findfileid", para,function (resp) {
			if(resp==null||resp==""||resp=="null"){
				window.setTimeout("isNotUpload()",200);
			}else if(resp=="true"){
				alert('附件上传成功!');
				isboosave=false;
				if(gridid==1){
					adminsave();
				}else {
					submitbus();
				}	
			}else if(resp=="false"){
				alert("附件上传失败！");
				if(Ext.getCmp('adminanswer')!=null){
					Ext.getCmp('adminanswer').setDisabled(false);
					Ext.getCmp('submitbus').setDisabled(false);
				}
				isboosave=false;
				var div=document.getElementById('fileDiv');
				div.parentNode .removeChild(div);
				return true;
			}
		});
	}
	function saveQuit(){
		if(document.getElementById('userfile1').value!=""&&adminfileids==""){
		//如果含有附件
				if(isboosave){
						alert("附件上传中请稍候...");
						return ;
					}
					savefile();//上传附件
					//isNotUpload();
		}else{
			if(gridid==1){
				adminsave();
			}else {
				submitbus();
			}	
			
		}				
	}
	adminTabPanel.setActiveTab(0);
</script>