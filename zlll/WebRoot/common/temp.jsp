
<%@ page language="java" contentType="text/html; charset=GBK"
	pageEncoding="GBK"%>
<% 
  response.setHeader("Cache-Control","no-cache"); 
  response.setHeader("Pragma","no-cache"); 
  response.setDateHeader("Expires",0); 
%> 

<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
<META HTTP-EQUIV="pragma" CONTENT="no-cache"> 
<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache, must-revalidate"> 
<META HTTP-EQUIV="expires" CONTENT="Wed, 26 Feb 1997 08:21:57 GMT">

<script language="javascript">
		<!--ȫ���򿪴���-->
		window.open('<%=request.getContextPath()%>/common/index.do', '_blank', 'width='+ (window.screen.availwidth) + ',height='+ (window.screen.availheight)  +  ',status=yes,toolbar=yes,menubar=yes,directories=yes,resizable=yes,location=yes top=0,left=0' );
        opener = null; //û����䣬�ر�ʱ����ʾ,ie5.5������Ч   
        window.close(); 
 </script>
