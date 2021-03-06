<%@page language="java" contentType="text/html; charset=GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
				String styleName ="stylefontS.css";	
		if(session.getAttribute("StyleName")!=null){
		    styleName = (String)session.getAttribute("StyleName");
		}
			 %>
<jsp:directive.page import="gov.mof.framework.util.DateUtil" /><html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>审核退回</title>
<script type="text/javascript" src="<%=basePath%>/js/choose.js"></script>
<script type="text/javascript" src="<%=basePath%>/ltext/ltext_core.js"></script>
<script type="text/javascript" src="<%=basePath%>/portal/js/login/ltext_common_util.js"></script>
<link href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" rel="stylesheet" type="text/css" />
<style type="text/css">
#operation_center { /*background-color:#bde3f7;
    border:1px solid #6b8eb5;*/
	text-align: center;
	padding: 5px;
	/*filter:progid:DXImageTransform.Microsoft.Gradient(gradienttype=0, startcolorstr=#f4f7fb, endcolorstr=#87bcfa);*/
}

</style>
<link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=basePath%>/style/<%=styleName %>" />
</head>
<body class="shenhe_body">
<div id="shenhe_title"><div id="shenhe_title_middle">审核意见</div></div>
<div>
    <form name="form1" id="form1" action="#" method="post" >
 	<table width="45%" border="0" cellspacing="0" cellpadding="0" class="auditremark_table">
  <tr>
    <td align="center"></td>
  </tr>
  <tr>
    <td align="right"><textarea  type="text"  name="auditInfo" id="auditInfo" cols="60" rows="9" maxlength ="100" style="overflow:scroll; font-size:14px" >退回</textarea></td>
  </tr>
  <tr>
    <td>
      <div id="operation_center">
 	    <button onclick="saveExit();" class="button_style">确定</button>       
        <button onclick="javascript:window.close();" class="button_style">取消</button>
      </div>
	</td>
  </tr>
</table>

  </form>
 </div>
</body>
<script type="text/javascript">
function saveExit(){
	var auditinfo = document.getElementById("auditInfo").value;
    if(auditinfo == null||auditinfo.trim() == ""){
	  	alert("审核意见不能为空。");
	  	return false;
	  }
	  //楚艳红 退回时只能输入100个字符以内
	  if (auditinfo.length > 100){
		   alert("只能输入100个字以内！");
		   return false;
	  }
	  if (!chknameobj(auditinfo)){
		   alert("请正确输入备注信息!");
		   return false;
	  }
	  window.returnValue = auditinfo; 
	  window.close();
}
</script>
