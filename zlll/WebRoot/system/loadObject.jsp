
<%@ page language="java" contentType="text/html; charset=GBK" pageEncoding="GBK"%>
<%@ page import="java.io.*,java.util.*" %>
<%@ page import="gov.mof.fasp.ifmis.common.Globals" %>
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
 <script type="text/javascript" src="<%=basePath%>/js/jquery-1[1].3.1.js"></script>	
    <script type="text/javascript" src="<%=basePath%>/js/choose.js"></script>
  <script type="text/javascript">
 //  var tmpObj=window.dialogArguments;
//����ʹ��unonload�¼�����ˢ��Ҳ�رմ��ڣ�ʹ��onbeforeunload by jzy
var id2 ="<%=request.getParameter("id")%>";
window.onbeforeunload=function(){
	getTips();
} 
/**
 * �رմ���
 */
 function getTips(){
 //window.returnValue = 'true';
 if(document.getElementById('tips').checked==true){
 	setCookie("notips_"+id2,"yes",1);
 }
 window.close();
 }
 
 function refreshParent(){
  	if(document.getElementById('tips').checked==true){
 		setCookie("notips_"+id2,"yes",1);
 	}
 	window.opener.location = window.opener.location;
 	 window.opener=null;
     window.close();
 }
 /**
 * �õ������Ӳ���
 * @param name ��������
 */
function getUrlParam(url,name)
{
	var r;
	var reg = new RegExp("(^|&|\\?)"+ name +"=([^&]*)(&|$)");
	if (r=url.match(reg))
	{
		return unescape(r[2]);
	} 
	return null;
}
  </script>
<meta http-equiv="Content-Type" content="text/html; charset=GB2312" />
<style type="text/css">
	.pop_body{
	font-size: 13px;
	font-weight: normal;
	}
   #content a {
      text-decoration: none;
      color: red;}
   #content{
   height:400px;
   margin-top:10px;
   margin-left:20px;
   margin-right:10px;
   }
   .title{
   font-size:14px;
   color:blue;
   }
   .list{
   padding-top:5px;
   }
   .list_title{
   font-size:14px;
   }
</style>
  <TITLE>�ؼ���װ��ʾ</TITLE>
<link rel="stylesheet" type="text/css" href="<%=basePath%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
 </head>

 <body class="pop_body" >
   <div id="popPage"><div id="shenhe_title"><div id="shenhe_title_middle"></div></div>
   <div id="content">
   ��⵽��û�а�װ��վ��Ҫ����ؿؼ��������������²�����в�����<br><br>1. �����IE������ʾ��װϵͳ����ؼ���<br><br>
   2. ���û���κ���ʾ��������<a href="<%=basePath%>/system/setIE/create.do"  target="_blank">һ������IE</a>���޸�IE���ã����ڵ����Ĵ�����ѡ��"����"��ϵͳ��ʾע����޸ĳɹ��󣬹ر�������������ڣ����µ�¼��Ч��
   <br><br>
   3. ��װ��ɺ����ڹرձ����ں�F5�����ֶ�ˢ��ҳ�档<a href="#" onclick="refreshParent();">ˢ��</a>����<a href="#" onclick="getTips();">�رձ�����</a>��<br><br>
     <font color = "red">*</font> ��������ʱ��ϵͳ���Ͻǵ�<img src="<%=basePath%>/ifmis_images/systemSet.png">�����һ������IE��
 <br><br><br><div><input type="checkbox" id="tips" value="false" /> ���첻����ʾ</div>
 </div>
<object id = "<%=request.getParameter("id")%>"  classid='clsid:<%=request.getParameter("classid")%>' codebase="<%=request.getParameter("codebase")%>"></object>
 </body>
</html>
