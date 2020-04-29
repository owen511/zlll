<%@ page language="java" contentType="text/html; charset=GBK" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<% 
  response.setHeader("Cache-Control","no-cache"); 
  response.setHeader("Pragma","no-cache"); 
  response.setDateHeader("Expires",0); 
%> 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<HTML xmlns="http://www.w3.org/1999/xhtml">
 <HEAD>
<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
<META HTTP-EQUIV="pragma" CONTENT="no-cache"> 
<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache, must-revalidate"> 
<META HTTP-EQUIV="expires" CONTENT="Wed, 26 Feb 1997 08:21:57 GMT">
  <STYLE>
    
    TD {
      height: 18px;
      font-size: 10pt; 
      font-family: verdana,helvetica; 
      text-decoration: none;
      white-space:nowrap;}
      
    A {
      text-decoration: none;
      color: black;}
  </STYLE>

<script>
//window.resizeTo(400, 350);
</script>
  <script type='text/javascript' src="<%=request.getContextPath()%>/js/prototype.js"></script>
  <script type='text/javascript' src='<%=request.getContextPath()%>/js/zapatec.js'></script>
  <SCRIPT type='text/javascript' src="<%=request.getContextPath()%>/js/tree.js"></SCRIPT>

  	
  <TITLE>上传成功&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TITLE>
<link href="<%=request.getContextPath()%>/style/default.css" rel="stylesheet" type="text/css" />
 </HEAD>
 <BODY class="pop_body">
  <form name="fileform" id="fileform" action="<%=request.getContextPath()%><%=request.getParameter("action") %>" method="post" enctype="multipart/form-data">
   <div id="popPage">
     <div id="shenhe_title">
     	<div id="shenhe_title_middle"></div>
     </div>
   <div id="pop_inner2">
   		<h2>文件上传成功！</h2>
   </div>
   <div id="pop_button">
   <CENTER><INPUT type="button" value="关闭当前窗口" class="button_style" onclick ="javascript:closeWindow(false)" /></CENTER>
  </div>
  </div>
  </form>
 </BODY>

</HTML>
<script>
var returnJSON = '<%=request.getAttribute("indilist") %>';
window.Height = "250px";
window.Width = "200px";
window.onunload = function(){
	closeWindow(true);
}
window.onblur = function(){
	if(returnJSON !="" && returnJSON != null){
		window.returnValue = returnJSON;
	}
	else{
		window.returnValue = null;
	}
	window.opener.showuploadfile(returnJSON);
	window.close();
}

function closeWindow(isReturn){
	if(returnJSON !="" && returnJSON != null){
		window.returnValue = returnJSON;
	}
	else{
		window.returnValue = null;
	}
	window.opener.showuploadfile(returnJSON);
	window.close();
}
</script>
