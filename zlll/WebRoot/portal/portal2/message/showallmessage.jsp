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
<title>�鿴ȫ��&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</title>
<script type="text/javascript">
	var _ROOT_PATH_='<%=basePath%>';
</script>
  <link rel="stylesheet" type="text/css" href="<%=basePath%>/style/ifmis_style.css"/>
  <link rel="stylesheet" type="text/css" href="<%=basePath%>/style/stylefontL.css"/>
  <script type="text/javascript" src="<%=basePath%>/ltext/frameworksupport.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/ltext_core.js"></script>
  <script type="text/javascript" src="<%=basePath%>/portal/js/login/ltext_common_menu.js"></script>
  <style>
/*�������������ʽ*/

/*���ٵ��������������ʽ*/
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
  //�ر����½���Ϣ���ѵ�ģ̬����ʱ��δ������Ϣ�������Ϣ����
  window.onbeforeunload = function() {    
   	   saveAllMessage(); 
   	   return "������Ͻǵ���Ϣ���Ŀ��Բ鿴δ����Ĵ������"; // ������ֹ�ر�   
  }  


//Ext.lt.portal.component.rightRowMenssage.openMsg()
//window.dialogArguments   window.parent.document  window.showModelessDialog(sURL,vArguments,sFeatures)
//��ȡ������ĳ�ֶ�ֵ���Ը�ֵ��һ�󷵻ظ�����
//var parent=window.dialogArguments;
//var x=parent.docuement.getElementById("age").value;
//��ȡ������ĳ�ֶ�ֵ���Ը�ֵ��һ�󷵻ظ�����
///var parent=window.dialogArguments;

//var x=parent.docuement.getElementById("age").value;
//�Ӵ����У�
//var parent=window.dialogArguments;
//var x=parent.document.getElementByIdx_x("age").value;
//x=x+1��
//���ø�������age����ֵ
//parent.document.getElementByIdx_x("age").value=x;
//var newWin=window.showModelDialog(url,window,'');
//newWin.open();

</script>