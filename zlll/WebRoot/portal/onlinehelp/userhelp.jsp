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
String username=user.getName();	
String usercode=user.getCode();	
//�û��绰
String telnumber=request.getSession().getAttribute("telnum")!=null?(String)request.getSession().getAttribute("telnum"):"";
//�洢����ķ����ַ
String onlinehelpurl=(String)request.getSession().getAttribute("onlinehelpurl");
//��������
String typemap=(String)request.getSession().getAttribute("typemap");
//�����������
String levelmap=(String)request.getSession().getAttribute("levelmap");
//�������
String localquestionarea=(String)request.getSession().getAttribute("questionarea");
ISystemSetService systemSetService = (ISystemSetService) DBUtil.getBeanByName("fasp.systemset.systemSetBPO");
String types="doc,txt,jpg,bmp,xls,png,swf,rar";
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
     var useragency = ' <c:out value="${sessionScope.currentuseragency.name}"/> ';
     var username='<%=username%>';
     var usercode='<%=usercode%>';
     var telnumber='<%=telnumber%>';
     var onlinehelpurl='<%=onlinehelpurl%>';
     var localquestionarea='<%=localquestionarea%>';
     var types='<%=types%>';
     var typemap = eval(<%=typemap%>);  
     var levelmap = eval(<%=levelmap%>);  
  </script>
  <link rel="stylesheet" type="text/css" href="<%=basePath%>/ltext/style/ext-all.css"/> 
  <link rel="stylesheet" type="text/css" href="<%=basePath%>/portal/style/fileuploadfield.css"/> 
  <script type="text/javascript" src="<%=basePath%>/ltext/frameworksupport.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/ltext_core.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/ltext_template.js"></script>
  <script type="text/javascript" src="<%=basePath%>/js/template.js"></script>
  <script type="text/javascript" src="<%=basePath%>/portal/js/FileUploadField.js"></script>
  <script type="text/javascript" src="<%=basePath%>/portal/js/onlinehelp/userNewQuestion.js"></script>
  <script type="text/javascript" src="<%=basePath%>/portal/js/onlinehelp/userReplyQuestion.js"></script>
  <style type="text/css">
	.ifmissubmenuqtree .overlink a{color:#000;text-decoration:none;}
	.ifmissubmenuqtree .overlink a:hover{color:#D70312;text-decoration:underline;}
  </style>
 <!-- <style>.shanchu{background-image:url('/images/done_btn/clear_qry2.gif')!important;}</style>
 --> 
 <style>
	.mytplover {
		background:#dae7f6;
		height:20px;
		white-space: nowrap;
		overflow:hidden; 
		text-overflow: ellipsis;
		cursor:pointer;
	}
	.mytplout {
		background:white;
		height:20px
		cursor:pointer;
	}
 </style>
   <script type="text/javascript" src="<%=basePath%>/portal/js/login/ltext_common_menu.js"></script>
  </head>
    <body>
    	<div id='query_t' style="margin:0 0 0 0;width:expression(document.body.clientWidth-200);height:20px;background:#dae7f6;overflow:hidden;">
    	<span style="border: #dae7f6 1px solid;"><span style="border: #dae7f6 1px solid;" title="��ѯ" class="query_btn" onclick="queryquestioin()" onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#">��ѯ</a></span><span style="border: #dae7f6 1px solid;">��</span></span>
    	<span style="border: #dae7f6 1px solid;"><span style="border: #dae7f6 1px solid;" title="�����ѯ����" class="clear_btn" onclick="clear_btnquestioin()" onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#">�����ѯ����</a></span><span style="border: #dae7f6 1px solid;">��</span></span>
    	<span style="border: #dae7f6 1px solid;"><span style="border: #dae7f6 1px solid;" title="����" class="add_btn" onclick="addquestion();" onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#">����</a></span><span style="border: #dae7f6 1px solid;">��</span></span>
		<span style="border: #dae7f6 1px solid;"><span style="border: #dae7f6 1px solid;" title="�޸�" class="mod_btn" onclick="modquestion()" onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#">�޸�</a></span><span style="border: #dae7f6 1px solid;">��</span></span>
		<span style="border: #dae7f6 1px solid;"><span style="border: #dae7f6 1px solid;" title="ɾ��" class="del_btn" onclick="delquestion()" onmouseover="doChangBg(this)" onmouseout="doReturn(this)"><a href="#">ɾ��</a></span><span style="border: #dae7f6 1px solid;">��</span></span>
		<span style="border: #dae7f6 1px solid;"><span style="border: #dae7f6 1px solid;" title="�ύ" class="toAudit_btn" onclick="publishquestion();" onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#">�ύ</a></span><span style="border: #dae7f6 1px solid;">��</span></span>
		<span style="border: #dae7f6 1px solid;"><span style="border: #dae7f6 1px solid;" title="ȷ��" class="goAudit_btn" onclick="notarizequestion();" onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#">ȷ��</a></span><span style="border: #dae7f6 1px solid;">��</span></span>
		<span style="border: #dae7f6 1px solid;"><span style="border: #dae7f6 1px solid;" title="��������" class="auditInfo_btn" onclick="auditInfoquestion();" onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#">��������</a></span><span style="border: #dae7f6 1px solid;">��</span></span>
    	<span style="border: #dae7f6 1px solid;"><span style="border: #dae7f6 1px solid;" title="�鿴" style="float: left;height: 20px;background-image: url(/images/done_btn/view.gif);background-repeat: no-repeat;background-position: left;padding-left: 18px;padding-right: 5px;" onclick="showquestion();" onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#">�鿴</a></span></span>
    	</div>
   		<div id = 'newID'></div>
   </body>
</html>
<script type="text/javascript">
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
	search.questionname = questionname;
	search.questiontype = quesiontype;
	if(temp.id=='newquestionGrid'){
		  search.flag="0";
		  Ext_lt_NewQuestion.loadGrid(search);
	}else if(temp.id=='overquestionGrid'){
		  search.flag="1";
 		  Ext_lt_ReplyQuestion.loadGrid(search);
 	}
}
//����
function addquestion(){
	Ext_lt_NewQuestion.showinfor();
}
//�޸�
function modquestion(){
	if(temp.id=='newquestionGrid'){
		Ext_lt_NewQuestion.update();
	}else{
		alert("��ѡ��Ҫ�޸ĵ����ݴ�����");
	}
}
//ɾ��
function delquestion(){
	if(temp.id=='newquestionGrid'){
		Ext_lt_NewQuestion.delGridPanel();
	}else{
		alert("ֻ��ɾ���ݴ������");
		//Ext_lt_ReplyQuestion.delGridPanel();
	}	
}
//�ύ
function publishquestion(){
	if(temp.id=='newquestionGrid'){
			Ext_lt_NewQuestion.publish();
	}else{
		alert("��ѡ��Ҫ�ύ�����ݴ�����");
	}
}
//ȷ��
function notarizequestion(){
	if(temp.id=='newquestionGrid'){
			Ext_lt_NewQuestion.notarize();
	}else{
		alert("��ѡ��һ����ȷ�ϵ�����");
	}
}
//��������
function auditInfoquestion(){
	if(temp.id=='newquestionGrid'){
			Ext_lt_NewQuestion.processflow();
	}else{
			Ext_lt_ReplyQuestion.processflow();
	}	
}
//�鿴
function showquestion(){
	if(temp.id=='newquestionGrid'){
		Ext_lt_NewQuestion.showPanel();
	}else if(temp.id='overquestionGrid'){
		Ext_lt_ReplyQuestion.showPanel();
	}
}
//�����ѯ����
function clear_btnquestioin(){
    Ext.getCmp("textfieldnewquestionName").setValue();
    Ext.getCmp("questionType").setValue();
}
//---------------------------------------------------------------------
if(Ext.lt.portal==null) Ext.lt.portal = {component:{}};

var onlineHiddenAll = doHiddenAll;
doHiddenAll=function(){
	onlineHiddenAll();
	var top= document.getElementById("window_top");
	var left_tree=document.getElementById("left_tree");
	if(left_tree.style.display=="none"&&top.offsetHeight == 0 ){
		userTabPanel.setWidth(document.body.clientWidth-30);
		templatesuperUser.setWidth(document.body.clientWidth-30);
		document.getElementById("query_t").style.width=document.body.clientWidth-30;
	}
	if(left_tree.style.display=="block"&&top.offsetHeight != 0)	{
		var treeWidth = left_tree.offsetWidth+30;
		userTabPanel.setWidth(document.body.clientWidth-treeWidth);
		templatesuperUser.setWidth(document.body.clientWidth-treeWidth);
		document.getElementById("query_t").style.width=document.body.clientWidth-treeWidth;
	}
}

var onlineHiddenLeft = doHiddenLeft;
doHiddenLeft=function(obj){
	onlineHiddenLeft(obj);
	var left_tree=document.getElementById("left_tree");
	if(left_tree.style.display=="none"){
	 	userTabPanel.setWidth(document.body.clientWidth-30);
		templatesuperUser.setWidth(document.body.clientWidth-30);
		document.getElementById("query_t").style.width=document.body.clientWidth-30;
	}
	else{
		var treeWidth = left_tree.offsetWidth+30;
		userTabPanel.setWidth(document.body.clientWidth-treeWidth);
	    templatesuperUser.setWidth(document.body.clientWidth-treeWidth);
	    document.getElementById("query_t").style.width=document.body.clientWidth-treeWidth;
	}
}

JQ("body").bind("mouseup",function(event){
	var left_tree=document.getElementById("left_tree");
	if(left_tree.style.display=="none"){
	 	userTabPanel.setWidth(document.body.clientWidth-30);
		templatesuperUser.setWidth(document.body.clientWidth-30);
		document.getElementById("query_t").style.width=document.body.clientWidth-30;
	}
	else{
		var treeWidth = left_tree.offsetWidth+30;
		userTabPanel.setWidth(document.body.clientWidth-treeWidth);
	    templatesuperUser.setWidth(document.body.clientWidth-treeWidth);
	    document.getElementById("query_t").style.width=document.body.clientWidth-treeWidth;
	}
});
//---------------------------------------------------------------------------------------------------------
	var temp;
	var questionname="";
	var quesiontype="";
	var fasptableData = [
		        ['1','�Ѵ�'],
		        ['2','���ݴ�'],
		        ['3','���ύ']
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
		triggerAction: 'all',
		width:104,
		valueField: 'value',
       	displayField: 'text',
       	hideTrigger:true
	}
);
	//-------------------------------------------------------------
	var comstore = new Ext.data.Store({
		 proxy: new Ext.data.MemoryProxy(typemap),
		 reader: new Ext.data.JsonReader({}, [{name:'itemid'},
			            {name:'name'}
			            ])
	 			})
	comstore.load();
	var comdata;
	var typestore = new Ext.data.Store({
		 proxy: new Ext.data.MemoryProxy(comdata),
		 reader: new Ext.data.JsonReader({}, [{name:'itemid'},
			            {name:'name'}
			            ])
	 			})
	typestore.load();
	var questionType = new Ext.form.ComboBox({
		id:'questionType',
		editable: false,
		store: typestore,
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
	typestore.loadData(arr);
	//----------------------------------------------------
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
	//----------------------------------------------------------
	var userTabPanel = new Ext.TabPanel({
   	   	activeTab: 0,
       	border:false,
        plain:true,
        defaults:{autoScroll: true},
    	items:[Ext_lt_NewQuestion,Ext_lt_ReplyQuestion],
    	listeners: {
  			'tabchange': function(t, p) {
   			var search = new Object();
  			if(p.id=='newquestionGrid'){
  				  search.flag="0";//������
  				  questionname = "";
				  quesiontype = "";
  	  			  Ext_lt_NewQuestion.loadGrid(search);
  	  		}else if(p.id=='overquestionGrid'){
	  	  		  search.flag="1";
	  	  		  questionname = "";
				  quesiontype = "";
	  			  Ext_lt_ReplyQuestion.loadGrid(search);
  			}
  			temp=p;			
  			}
		}	
		});

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
		items:[userTabPanel],
		tbar:new Ext.Toolbar(['���⣺',{xtype:'textfield',width:130,id:'textfieldnewquestionName'},'-',
									'�������ͣ�',questionType
								])	
	});
	if(document.getElementById("left_tree").style.display=="none"){
		userTabPanel.setWidth(document.body.clientWidth-30);
		templatesuperUser.setWidth(document.body.clientWidth-30);
		document.getElementById("query_t").style.width=document.body.clientWidth-30;
	}
	//--------------------------------------
	var gridid;
	var fileids="";//�޸�ǰ����id
	var isboosave=false;
	function savefile(){
		isboosave=true;
		var div=document.getElementById("newID");
		var p=document.getElementById('file').parentNode;
		var fileDiv=document.createElement("div");
		fileDiv.style.visibility='hidden';
		fileDiv.id='fileDiv';	
		var innerHTMLStr="<form action ='"+onlinehelpurl+"/portaluploadfile.page?usercode="+usercode+"&localquestionarea="+localquestionarea+"' method='post' ENCTYPE='multipart/form-data' id='fileUploadForm' target='fileUploadIfr'>";
		//innerHTMLStr="<form action ='<%=request.getContextPath()%>/portaluploadfile.page' method='post' ENCTYPE='multipart/form-data' id='fileUploadForm' target='fileUploadIfr'>";
	    //innerHTMLStr="<form action ='<%=request.getContextPath()%>/portal/onlinehelpupload.do' method='post' ENCTYPE='multipart/form-data' id='fileUploadForm' target='fileUploadIfr'>";
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
					if(Ext.getCmp('modzc')!=null){
						Ext.getCmp('modzc').setDisabled(false);
						Ext.getCmp('modfb').setDisabled(false);
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
		//var fileuploads = document.getElementsByName('file');
		//var paths = fileuploads[0].value.split('\\');
		//para.path=paths[paths.length-1];
		para.usercode=usercode;
		para.localquestionarea=localquestionarea;
		Ext.lt.RCP.script(onlinehelpurl,"useonliehelp", "findfileid", para,function (resp) {
		//Ext.lt.RCP.server("useonliehelp", "findfileid", para,function (resp) {
			if(resp==null||resp==""||resp=="null"){
				window.setTimeout("isNotUpload()",200);
			}else if(resp=="true"){
				alert('�����ϴ��ɹ�!');
				isboosave=false;
				if(gridid==1){
					addsave1();
				}else if(gridid==2){
					addsave2();
				}else if(gridid==3){
					modsave3();
				}else if(gridid==4){
					modsave4();
				}			
			}else if(resp=="false"){
				alert("�����ϴ�ʧ�ܣ�");
				if(Ext.getCmp('zc')!=null){
					Ext.getCmp('zc').setDisabled(false);
					Ext.getCmp('fb').setDisabled(false);
				}
				if(Ext.getCmp('modzc')!=null){
					Ext.getCmp('modzc').setDisabled(false);
					Ext.getCmp('modfb').setDisabled(false);
				}
				isboosave=false;
				var div=document.getElementById('fileDiv');
				div.parentNode .removeChild(div);
				return true;
				}
		});
		/*
		var locas=window.frames('fileUploadIfr').location.toString().split('/');
		if(locas[locas.length-1]=='no'){
			window.setTimeout("isNotUpload()",100);
		}else if(locas[locas.length-1]=='true'){
			window.frames('fileUploadIfr').location="<%=request.getContextPath()%>/portal/user/no";
			alert('�����ϴ��ɹ�!');
			isboosave=false;
			if(gridid==1){
				addsave1();
			}else if(gridid==2){
				addsave2();
			}else if(gridid==3){
				modsave3();
			}else if(gridid==4){
				modsave4();
			}			
		}else {
			alert("�ϴ�ʧ�ܣ�");
			if(Ext.getCmp('zc')!=null){
						Ext.getCmp('zc').setDisabled(false);
						Ext.getCmp('fb').setDisabled(false);
					}
			if(Ext.getCmp('modzc')!=null){
				Ext.getCmp('modzc').setDisabled(false);
				Ext.getCmp('modfb').setDisabled(false);
			}
			isboosave=false;
			var div=document.getElementById('fileDiv');
			div.parentNode .removeChild(div);
			return true;
		}
		*/
	}
	function saveQuit(){
		//if((document.getElementById('userfile1').value!=''&&(document.getElementById('liulan1')==null||document.getElementById('liulan1').disabled==false))||(document.getElementById('userfile2').value!=''&&(document.getElementById('liulan2')==null||document.getElementById('liulan2').disabled==false))||(document.getElementById('userfile3').value!=''&&(document.getElementById('liulan3')==null||document.getElementById('liulan3').disabled==false))){
		//if((document.getElementById('userfile1').value!=''&&(document.getElementById('liulan1')==null||document.getElementById('liulan1').disabled==false))){
		if(document.getElementById('userfile1').value!=""&&fileids==""){
		//������и���
				if(isboosave){
						alert("�����ϴ������Ժ�...");
						return ;
					}
					savefile();//�ϴ�����
					//isNotUpload();
		}else{
			if(gridid==1){
				addsave1();
			}else if(gridid==2){
				addsave2();
			}else if(gridid==3){
				modsave3();
			}else if(gridid==4){
				modsave4();
			}			
		}				
	}
</script>
