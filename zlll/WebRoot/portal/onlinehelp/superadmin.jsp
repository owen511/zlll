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
String username=user.getName();
String usercode=user.getCode();	
//�洢����ķ����ַ
String onlinehelpurl=(String)request.getSession().getAttribute("onlinehelpurl");
//��������
String typemap=(String)request.getSession().getAttribute("typemap");
//�����������
String levelmap=(String)request.getSession().getAttribute("levelmap");
//�������
String localquestionarea=(String)request.getSession().getAttribute("questionarea");
//��ѯ�������������е���
String auditset=(String)request.getSession().getAttribute("auditset");
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
   var _ROOT_PATH_='<%=basePath%>';
   var username='<%=username%>';
   var usercode='<%=usercode%>';
   var onlinehelpurl='<%=onlinehelpurl%>';
   var localquestionarea='<%=localquestionarea%>';
   var auditset='<%=auditset%>';
   var types='<%=types%>';
   var typemap = eval(<%=typemap%>); 
   var levelmap = eval(<%=levelmap%>); 
   </script>
  <link rel="stylesheet" type="text/css" href="<%=basePath%>/ltext/style/ext-all.css"/> 
  <link rel="stylesheet" type="text/css" href="<%=basePath%>/portal/style/fileuploadfield.css"/> 
  <script type="text/javascript" src="<%=basePath%>/ltext/frameworksupport.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/ltext_core.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/ltext_template.js"></script>
  <script type="text/javascript" src="<%=basePath%>/portal/js/login/ltext_common_menu.js"></script>
  <script type="text/javascript" src="<%=basePath%>/js/template.js"></script>
  <script type="text/javascript" src="<%=basePath%>/portal/js/FileUploadField.js"></script>
  <script type="text/javascript" src="<%=basePath%>/portal/js/onlinehelp/superAdminOnlineHelpDone.js"></script>
  <script type="text/javascript" src="<%=basePath%>/portal/js/onlinehelp/superAdminOnlineHelpToDo.js"></script>
  <script type="text/javascript" src="<%=basePath%>/portal/js/onlinehelp/superAdminAllQuestion.js"></script>
  <style type="text/css">
	.ifmissubmenuqtree .overlink a{color:#000;text-decoration:none;}
	.ifmissubmenuqtree .overlink a:hover{color:#D70312;text-decoration:underline;}
  </style>
  </head>
  <body>
    	<div id='query_t' style="margin:0 0 0 0;width:expression(document.body.clientWidth-200);height:20px;background:#dae7f6;overflow:hidden;">
    	<span style="border: #dae7f6 1px solid;"><span style="border: #dae7f6 1px solid;" title="��ѯ" class="query_btn" onclick="queryquestioin()" onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#">��ѯ</a></span><span style="border: #dae7f6 1px solid;">��</span></span>
    	<span style="border: #dae7f6 1px solid;"><span style="border: #dae7f6 1px solid;" title="�����ѯ����" class="clear_btn" onclick="clear_btnquestioin()" onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#">�����ѯ����</a></span><span style="border: #dae7f6 1px solid;">��</span></span>
    	<span style="border: #dae7f6 1px solid;"><span style="border: #dae7f6 1px solid;" title="��" class="mod_btn" onclick="answerquestion();" onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#">��</a></span><span style="border: #dae7f6 1px solid;">��</span></span>
    	<span style="border: #dae7f6 1px solid;"><span style="border: #dae7f6 1px solid;" title="�Ӿ��ö�" style="float: left;height: 20px;background-image: url(/images/done_btn/state.gif);background-repeat: no-repeat;background-position: left;padding-left: 18px;padding-right: 5px;" onclick="settopquestion();" onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#">�Ӿ��ö�</a></span><span style="border: #dae7f6 1px solid;">��</span></span>
    	<span style="border: #dae7f6 1px solid;"><span style="border: #dae7f6 1px solid;" title="��ֹ����" style="float: left;height: 20px;background-image: url(/images/done_btn/close.gif);background-repeat: no-repeat;background-position: left;padding-left: 18px;padding-right: 5px;" onclick="setpublicquestion();" onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#">��ֹ����</a></span><span style="border: #dae7f6 1px solid;">��</span></span>
		<span style="border: #dae7f6 1px solid;"><span style="border: #dae7f6 1px solid;" title="��������" class="auditInfo_btn" onclick="auditInfoquestion();" onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#">��������</a></span><span style="border: #dae7f6 1px solid;">��</span></span>
    	<span style="border: #dae7f6 1px solid;"><span style="border: #dae7f6 1px solid;" title="�鿴" style="float: left;height: 20px;background-image: url(/images/done_btn/view.gif);background-repeat: no-repeat;background-position: left;padding-left: 18px;padding-right: 5px;" onclick="showquestion();" onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#">�鿴</a></span></span>
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
//��ѯ
function queryquestioin(){
	 var search = new Object();
  	 questionname = Ext.getCmp("textfieldnewquestionName").getValue();
     quesiontype = Ext.getCmp("questionType").getValue()+"";
     questionarea = Ext.getCmp("questionArea").getValue()+"";
     search.questionname = questionname;
     search.questiontype = quesiontype;
     search.questionarea = questionarea;
     if(temp.id=='adminnewquestion_examineGrid'){
	    search.flag="0";
	    Ext_lt_AdminNewQuestionExamine.loadGrid(search);
     }else if(temp.id=='adminnewquestion_examine_PostGrid'){
	    search.flag="1";
	    Ext_lt_AdminNewQuestionExaminePost.loadGrid(search);
     }else{
		Ext_lt_superAdminAllquestion.loadGrid(search);
	 }			
}
//��
function answerquestion(){
	if(temp.id=='adminnewquestion_examineGrid'){
		Ext_lt_AdminNewQuestionExamine.audit();
	}else{
		alert("��ѡ��������е����ݽ��д�");
	}
}
//��������
function auditInfoquestion(){
	if(temp.id=='adminnewquestion_examineGrid'){
			Ext_lt_AdminNewQuestionExamine.processflow();
	}else if(temp.id=='adminnewquestion_examine_PostGrid'){
			Ext_lt_AdminNewQuestionExaminePost.processflow();
	}else{
			Ext_lt_superAdminAllquestion.processflow();
	}	
}
//�鿴
function showquestion(){
	if(temp.id=='adminnewquestion_examineGrid'){
		Ext_lt_AdminNewQuestionExamine.showpanel();
	}else if(temp.id=='adminnewquestion_examine_PostGrid'){
		Ext_lt_AdminNewQuestionExaminePost.showpanel();
	}else{
		Ext_lt_superAdminAllquestion.showpanel();
	}
}
//�����ѯ����
function clear_btnquestioin(){
    Ext.getCmp("textfieldnewquestionName").setValue();
    Ext.getCmp("questionType").setValue();
    Ext.getCmp("questionArea").setValue();
}
//�Ӿ��ö�
function settopquestion(){
	if(temp.id=='adminsetquestiongrid'){
		Ext_lt_superAdminAllquestion.settop();
	}else{
		alert("��ѡ��Ӿ��ö��е�����");
	}
}
//��ֹ����
function setpublicquestion(){
	if(temp.id=='adminsetquestiongrid'){
		Ext_lt_superAdminAllquestion.setpublic();
	}else{
		alert("��ѡ��Ӿ��ö��е�����");
	}
}
//---------------------------------------------------------------------
var onlineHiddenAll = doHiddenAll;
doHiddenAll=function(){
	onlineHiddenAll();
	var top= document.getElementById("window_top");
	var left_tree=document.getElementById("left_tree");
	if(left_tree.style.display=="none"&&top.offsetHeight == 0 ){
			superadminTabPanel.setWidth(document.body.clientWidth-30);
			templatesuperAdmin.setWidth(document.body.clientWidth-30);
			document.getElementById("query_t").style.width=document.body.clientWidth-30;
	}
	if(left_tree.style.display=="block"&&top.offsetHeight != 0)	{
		var treeWidth = left_tree.offsetWidth+30;
			superadminTabPanel.setWidth(document.body.clientWidth-treeWidth);
			templatesuperAdmin.setWidth(document.body.clientWidth-treeWidth);
			document.getElementById("query_t").style.width=document.body.clientWidth-treeWidth;
	}
}

var onlineHiddenLeft = doHiddenLeft;
doHiddenLeft=function(obj){
	onlineHiddenLeft(obj);
	var left_tree=document.getElementById("left_tree");
	if(left_tree.style.display=="none"){
	 	superadminTabPanel.setWidth(document.body.clientWidth-30);
		templatesuperAdmin.setWidth(document.body.clientWidth-30);
		document.getElementById("query_t").style.width=document.body.clientWidth-30;
	}
	else{
		var treeWidth = left_tree.offsetWidth+30;
		superadminTabPanel.setWidth(document.body.clientWidth-treeWidth);
		templatesuperAdmin.setWidth(document.body.clientWidth-treeWidth);
		document.getElementById("query_t").style.width=document.body.clientWidth-treeWidth;
	}
}

JQ("body").bind("mouseup",function(event){
	var left_tree=document.getElementById("left_tree");
	if(left_tree.style.display=="none"){
	 	superadminTabPanel.setWidth(document.body.clientWidth-30);
		templatesuperAdmin.setWidth(document.body.clientWidth-30);
		document.getElementById("query_t").style.width=document.body.clientWidth-30;
	}
	else{
		var treeWidth = left_tree.offsetWidth+30;
		superadminTabPanel.setWidth(document.body.clientWidth-treeWidth);
		templatesuperAdmin.setWidth(document.body.clientWidth-treeWidth);
		document.getElementById("query_t").style.width=document.body.clientWidth-treeWidth;
	}
});
//---------------------����״̬--------------------------------
	var temp;
	var questionname="";
	var quesiontype="";
	var questionarea="";
	var fasptableData = [
		        ['1','�Ѵ�'],
		        ['2','����'],
		        ['3','�����'],
				['4','���δͨ��'],
				['5','����������'],
				['6','���ݴ�']
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
		emptyText: '��ѡ������״̬',
		mode:'local',
		displayField : 'typeName',
		triggerAction: 'all',
		width:130,
		valueField: 'id',//�õ�idʱvalueField : 'id'/value,      
       	displayField: 'text',
       	hideTrigger:true
	});
	//-----------------��������--------------------------
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
    //-----------------�������--------------------------
 	var areadata;
	var areastore = new Ext.data.Store({
		 proxy: new Ext.data.MemoryProxy(areadata),
		 reader: new Ext.data.JsonReader({}, [{name:'itemid'},{name:'questionarea'}])
	 			})
	areastore.load();
	var questionArea = new Ext.form.ComboBox({
		id:'questionArea',
		editable: false,
		store: areastore,
		hidden:auditset==1?false:true,
		emptyText: '��ѡ���������',
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
	//����ʱ0����ֻ��ʾ�����������Ϊ1 ��ȥ�������ѯ���еĵ���
	if(auditset==0){
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
    //----------��������------	
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
	var superadminTabPanel = new Ext.TabPanel({
        activeTab: 0,
        border:false,
        plain:true,
        defaults:{autoScroll: true},
        items:[Ext_lt_AdminNewQuestionExamine,Ext_lt_AdminNewQuestionExaminePost,Ext_lt_superAdminAllquestion],
        	listeners: {
  			'tabchange': function(t, p) { 							
  				  	var search = new Object(); 				
		  			if(p.id=='adminnewquestion_examineGrid'){
		  					search.flag="0";//������
		  					questionname = "";
				  			quesiontype = "";
				  			questionarea = "";
		  				    Ext_lt_AdminNewQuestionExamine.loadGrid(search);
		  			}else if(p.id=='adminnewquestion_examine_PostGrid'){
		  					search.flag="1";//�Ѵ���
		  					questionname = "";
				  			quesiontype = "";
				  			questionarea = "";
		  					Ext_lt_AdminNewQuestionExaminePost.loadGrid(search);
		  			}else{
		  				questionname = "";
				  		quesiontype = "";
	  					Ext_lt_superAdminAllquestion.loadGrid(search);
		  			}
		  			temp=p;			
			  	}
			}	
		});
		var templatesuperAdmin =new Ext.Panel({
			bodyStyle:'margin:0px 0px 0px 0px;',
			width:document.body.clientWidth-200,   
			border:false,
			autoHeight:true,
			renderTo:'newID',
			items:[superadminTabPanel],
			tbar:new Ext.Toolbar(['���⣺',{xtype:'textfield',width:130,id:'textfieldnewquestionName'},'-',
									'�������ͣ�',questionType,'-',
									auditset==1?'�������:&nbsp&nbsp':'',questionArea
									])	
		
	});
	if(document.getElementById("left_tree").style.display=="none"){
			superadminTabPanel.setWidth(document.body.clientWidth-30);
			templatesuperAdmin.setWidth(document.body.clientWidth-30);
			document.getElementById("query_t").style.width=document.body.clientWidth-30;
	}
	//--------------------------------------
	var adminfileids="";//�޸�ǰ����id
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
					alert("��������ֻ��֧�֣�"+types+"�����ͣ�");
					if(Ext.getCmp('auditanswer')!=null){
						Ext.getCmp('auditanswer').setDisabled(false);
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
				alert('�����ϴ��ɹ�!');
				isboosave=false;
				auditanswer();
			}else if(resp=="false"){
				alert("�����ϴ�ʧ�ܣ�");
				if(Ext.getCmp('auditanswer')!=null){
				Ext.getCmp('auditanswer').setDisabled(false);
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
		//������и���
				if(isboosave){
						alert("�����ϴ������Ժ�...");
						return ;
					}
					savefile();//�ϴ�����
					//isNotUpload();
		}else{
			auditanswer();
		}				
	}
</script>