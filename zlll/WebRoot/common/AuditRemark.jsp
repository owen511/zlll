<%@ page language="java" contentType="text/html; charset=GBK"
	pageEncoding="GBK"%>
<%
String auditinfo = "";
if(request.getParameter("auditinfo")!=null)auditinfo = request.getParameter("auditinfo");
 %>
 <%
    	
    	 response.setHeader("Cache-Control","no-cache"); 
       response.setHeader("Pragma","no-cache"); 
       response.setDateHeader("Expires",0); 
  
    	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
					//字体相关
		String styleName ="stylefontS.css";	
		if(session.getAttribute("StyleName")!=null){
		    styleName = (String)session.getAttribute("StyleName");
		}
			
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<title>录入审核意见</title>
<link href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%= basePath %>/js/choose.js"></script>
<style type="text/css">
#operation_center { /*background-color:#bde3f7;
    border:1px solid #6b8eb5;*/
	text-align: center;
	padding: 5px;
	/*filter:progid:DXImageTransform.Microsoft.Gradient(gradienttype=0, startcolorstr=#f4f7fb, endcolorstr=#87bcfa);*/
}

</style>
<link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=basePath%>/style/<%=styleName %>" />
<script language="JavaScript">    
  function ok(){
	  if(document.getElementById("auditInfo").value==null||document.getElementById("auditInfo").value.replace(/ /g,"")==""){
	  	alert("审核意见不能为空。");
	  	return false;
	  }
	  if (document.getElementById("auditInfo").value.length > 200)
		 {
		   alert("审核意见长度不能大于200个字符！");
		   return false;
		 }
	  //处理特殊字符
	  //var auditremark = convertStr(document.getElementById("auditInfo").value);
	   //edited by zhangkai 使用encodeURIComponent()对;/?:@&=+$,#进行编码
	  var auditremark = encodeURIComponent(document.getElementById("auditInfo").value);
	  window.returnValue = auditremark;  
	  window.close();
  }
</script> 
<base target="_self">
</head>
<body class="shenhe_body">
<div id="shenhe_title"><div id="shenhe_title_middle">审核意见</div></div>
<div id="audit_remark" align="center">
<form action="" method="post">
   <table width="45%" border="0" cellspacing="0" cellpadding="0" class="auditremark_table">
  <tr>
    <td align="center"></td>
  </tr>
  <tr>
    <td align="center"><textarea  name="auditInfo" id="auditInfo" cols="50" rows="9"  style="overflow:hidden; font-size:14px"><%=auditinfo %></textarea></td>
  </tr>
  <tr>
    <td>
      <div id="operation_center">
 	    <button onclick="ok();" class="button_style">确定</button>       
        <button onclick="javascript:window.close();" class="button_style">取消</button>
      </div>
	</td>
  </tr>
</table>
</form>
</div>
</body>
</html>
