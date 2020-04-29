<%@ page language="java" contentType="text/html; charset=GBK" pageEncoding="GBK"%>
<%@ page import="java.util.Map"%>
<%
  response.setHeader("Cache-Control","no-cache"); 
  response.setHeader("Pragma","no-cache"); 
  response.setDateHeader("Expires",0); 
  String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<meta http-equiv="X-UA-Compatible" content="IE=7" />
<title>查看全部&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</title>
<script type="text/javascript">
	var _ROOT_PATH_='<%=basePath%>';
</script>
  <link rel="stylesheet" type="text/css" href="<%=basePath%>/style/ifmis_style.css"/>
  <link rel="stylesheet" type="text/css" href="<%=basePath%>/style/stylefontL.css"/>
  <script type="text/javascript" src="<%=basePath%>/ltext/frameworksupport.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/ltext_core.js"></script>
  <script type="text/javascript" src="<%=basePath%>/portal/js/login/ltext_common_menu.js"></script>
  <style>
/*待办事项标题样式*/

/*快速导航、公告标题样式*/
.title_orange{
 font-size:16px;
 color:#DD7D2E;
 height:30px;
 line-height:30px;
 border-bottom:2px #2C609C solid;
 margin-right:20px;
 }
 </style>
</head>
<body>
<div id="msgwin" style="text-align:center; background-color:#fff;  line-height:25px;width:437px; height:320px; overflow-y:auto;">
</div>
</body>
</html>
<script type="text/javascript">
  var obj = window.dialogArguments;
  var msglist=obj.msglist;
  var o = document.getElementById('msgwin');
  //Ext.lt.portal.component.advices.showAll(msglist,o);
  Ext.lt.portal.component.rightRowMenssage.showAll(msglist,o);
  //关闭右下角消息提醒的模态窗口时将未读的消息保存进消息表中
  window.onbeforeunload = function() {    
   	   saveAllMessage(); 
   	   return "点击右上角的消息中心可以查看未浏览的待办事项！"; // 可以阻止关闭   
  }  


//Ext.lt.portal.component.rightRowMenssage.openMsg()
//window.dialogArguments   window.parent.document  window.showModelessDialog(sURL,vArguments,sFeatures)
//获取父窗口某字段值，对该值加一后返回父窗口
//var parent=window.dialogArguments;
//var x=parent.docuement.getElementById("age").value;
//获取父窗口某字段值，对该值加一后返回父窗口
///var parent=window.dialogArguments;

//var x=parent.docuement.getElementById("age").value;
//子窗口中：
//var parent=window.dialogArguments;
//var x=parent.document.getElementByIdx_x("age").value;
//x=x+1；
//设置父窗口中age属性值
//parent.document.getElementByIdx_x("age").value=x;
//var newWin=window.showModelDialog(url,window,'');
//newWin.open();

</script>