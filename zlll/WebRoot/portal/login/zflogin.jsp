<%@ page language="java" import="java.util.*" pageEncoding="GB18030"%>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>登录页面</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	

  </head>
  <script language="javascript">
window.name="foundercy_main";
</script>
 <% String uid = request.getParameter("uid");
 	//uid = "006010";
    String password = (String)session.getAttribute("remark");
    //password = "admin";
    String year = request.getParameter("year");
    String zfurl = request.getParameter("zfurl");
 %>
 <body  onkeydown="if(event.keyCode=='13') login();">
 <div id="alert_l" style="position:absolute; left:0px; top:0px; width:353px; height:240px; z-index:1; visibility: hidden">
  <table width="95%" border="0" align="center" cellpadding="4" cellspacing="1">
  <form name="loginForm" method="POST" action="<%=zfurl%>">
  <input type="hidden" name="step" value="initLogin">
    <tr>
      <td width="45%" align="right">用户：</td>
      <td>&nbsp; &nbsp; &nbsp;<input type="text" id="user" name="user_code" size="25" value="<%=uid%>"></td>
    </tr>
    <tr>
      <td width="45%" align="right">密码：</td>
      <td>&nbsp; &nbsp; &nbsp;<input type="password" name="password" size="25" value="<%=password%>"></td>
    </tr>
    <tr>
      <td width="45%" align="right">年度：</td>
      <td>
      &nbsp;&nbsp;&nbsp;&nbsp;
        <select name="year" size="1"><option value="<%=year%>">2010</option></select>
      </td>
    </tr>
 
  </form>
</table>
<script language="javascript">
document.loginForm.submit();
</script>
  
 </body>
</html>
