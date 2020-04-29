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
     var username='<%=username%>';
     var usercode='<%=usercode%>';
     var types='<%=types%>';
     var useragency='';
     var picContent='';
     var picImgId='';
  </script>
  <link rel="stylesheet" type="text/css" href="<%=basePath%>/ltext/style/ext-all.css"/> 
  <link rel="stylesheet" type="text/css" href="<%=basePath%>/portal/style/fileuploadfield.css"/> 
  <script type="text/javascript" src="<%=basePath%>/ltext/frameworksupport.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/ltext_core.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/ltext_template.js"></script>
  <script type="text/javascript" src="<%=basePath%>/js/template.js"></script>
  <script type="text/javascript" src="<%=basePath%>/portal/js/FileUploadField.js"></script>
  <script type="text/javascript" src="<%=basePath%>/portal/js/onlinehelp/oneKeyHelp.js"></script>
  <script type="text/javascript" src="<%=basePath%>/js/choose.js"></script>
  <script type="text/javascript" src="<%=basePath%>/js/loadOcx.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/componentview/businessframework/captuerscreen/captuerscreen.js"></script>
<OBJECT   ID= "cap" name="cap"  CLASSID= "CLSID:D4A55BDB-B9FF-4CF2-AB5C-F073492D46DF"  codebase="<%=request.getContextPath()%>/portal/CaptureScreen.cab#version=1,0,0,1" ></OBJECT> 

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
 </head>
 <body style="background:transparent">
 	<div id='previewId' style="height:410;OVERFLOW-Y:auto;OVERFLOW-X:hidden;OVERFLOW:auto">
   		<div id = 'newID'></div>
   		<a  id='hidefile' href=""></a>
   		<div id = 'showimgid'></div>
   	</div>
  </body>
</html>
<script>
	//<img src="" id="showimgid1"/>
	var gridid;
	var onlinehelpurl = "";
	var _config;
	var localarea = "";
	var isboosave=false;
	//调用方法在页面生成panel
	new Ext_lt_oneKeyHelp();
	//保存截图
	function cutWin(){
		var ieHeight = 470;//弹出窗口高度
		var ver;//浏览器版本 
		var bType;//浏览器类型 
		var ver = navigator.appVersion; 
	    var vNumber=parseFloat(ver.substring(ver.indexOf("MSIE ")+5,ver.lastIndexOf("Windows"))); 
		if (vNumber == 6.0){
		    ieHeight = 514;
		}
		//window.parent.document.getElementById('helpDIV').style.display="none";
		document.getElementById('previewId').style.display="none";
		//Ext.getCmp('helppanel').hide();
		setTimeout(cutPic,500);
	}
	
	//截图
	function cutPic(){
		//截图
		Ext.lt.CaptureScreen.capture();
	    //picContent = Ext.lt.ifmis.activex.getScreenPicInfo();
	    //图片内容
	    picContent = Ext.lt.CaptureScreen.picContent;
	    if(picContent==null||picContent==""){
	    	alert("截图失败");
	    	closePic();
	    	return;
	    }
		//截图后把div显示出来
		Ext.lt.message.hook('capturescreen','oncapture',function(config){
			document.getElementById('previewId').style.display="block";
			Ext.getCmp('prePic').setDisabled(false);
			Ext.getCmp('downPic').setDisabled(false);
	   		Ext.getCmp('userfile').setValue(config+".jpg");
	   		picImgId = config;
	   		document.getElementById("hidefile").href="<%=basePath%>/portal/com/showImg.do?type=1&guid="+config;
		});
	}
	
	//预览
	function previewWin(){
		var _hidefile=document.getElementById("hidefile")
		if(_hidefile=="<%=basePath%>/portal/onlinehelp/"){
			alert("请先点击截取当前屏幕");
			return;
		}
		var picId=Ext.lt.CaptureScreen.getId();
		//var url = "<%=basePath%>/portal/onlinehelp/previewPic.jsp?id="+picId;
		//window.open (url,'newwindow',"height=650,width=900,scrollbars=yes,status=no,resizable=0;");  
		Ext.lt.CaptureScreen.showCaptureScreen(picId,'showimgid','700','410');
	    document.getElementById("showimgid").scrollIntoView();
	}
	//下载	
	function downloadWin(){
		var _hidefile=document.getElementById("hidefile")
		if(_hidefile=="<%=basePath%>/portal/onlinehelp/"){
			alert("请先点击截取当前屏幕");
			return;
		}
		_hidefile.click();
	}
	
	function delPic(){
		 if(picImgId!=''){
				Ext.lt.CaptureScreen.del(picImgId);
		 }
	}
    //document.body.onbeforeunload = delPic;
	
	function closePic(){
		try{
			var _helpDiv=parent.document.getElementById('helpDIV');
			if(_helpDiv!=null){
				parent.document.body.removeChild(_helpDiv);
			}
		}catch(e){
			document.getElementById('previewId').style.display="none";
		}
	}
</script>