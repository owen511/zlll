<%@ page language="java" contentType="text/html; charset=GBK" pageEncoding="GBK"%>
<% 
  response.setHeader("Cache-Control","no-cache"); 
  response.setHeader("Pragma","no-cache"); 
  response.setDateHeader("Expires",0); 
  String basePath = request.getScheme() + "://"
    + request.getServerName() + ":" + request.getServerPort()
    + request.getContextPath();
  String returnInfo = (String)request.getAttribute("returnInfo");
  String command = "";
  if(returnInfo.substring(0,1).equals("1")){
  	command = "alert('修改成功');" +
  			  "try{window.parent.closeDiv();}catch(e){}" +
  			  "window.close();";
  }else{
  	command = "alert('"+returnInfo.substring(1)+"');"+
  	          "window.history.back();";
  			  //"window.location.href='"+basePath+"/portal/login/mod_password.jsp'";
  }
%> 
<html>
<HEAD>
<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
</head>
<body>
</body>
</html>
<script language="javascript">
<%=command%>
</script>
