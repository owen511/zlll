<%@ page language="java" contentType="text/html; charset=GBK"
	pageEncoding="GBK"%>
<%@ taglib uri="http://struts.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%
String auditinfo = "";
if(request.getParameter("auditinfo")!=null)auditinfo = request.getParameter("auditinfo");
String datatableStyle="";
    if(request.getAttribute("datatableStyle")!=null)datatableStyle = (String)request.getAttribute("datatableStyle"); 
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
<script type="text/javascript" src="<%= basePath %>/js/datatable.js"></script>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
<link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=basePath%>/style/<%=styleName %>" />
<link rel="stylesheet" type="text/css" href="<%=basePath%>/style/calendar.css"/>
<script type="text/javascript" src="<%=basePath%>/js/prototype.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/changescroll.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/calendar.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/formatNumber.js"></script>
<script type="text/vbscript" src="<%=basePath%>/js/decode_resource.vbs"></script>
<script type="text/javascript" src="<%=basePath%>/js/ua.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/ftiens4.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/overlib/overlibmws.js" type=text/javascript></SCRIPT>
<script type="text/javascript" src="<%=basePath%>/js/overlib/overlibmws_filter.js" type=text/javascript></SCRIPT>
<script type="text/javascript" src="<%=basePath%>/js/overlib/overlibmws_shadow.js" type=text/javascript></SCRIPT>
<script type="text/javascript" src="<%=basePath%>/js/rightButton.js"></script>
<script type="text/javascript" src="<%=basePath%>/pay/js/ishightlight.js"></script>

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
	  var auditremark = encodeURIComponent(document.getElementById("auditInfo").value);
	  window.returnValue = auditremark;  
	  window.close();
  }
 function doAuditRefuse() {
	var pWindow=window.dialogArguments;  
	if(pWindow != null){
	   pWindow.doWorkVou(13);
	}else{
	   window.opener.doWorkVou(13);
	}
	window.close();
 }
</script> 
<base target="_self">
</head>
<body class="shenhe_body">
<div align ="center" style="background-image: url(../../ifmis_images/bg/shenhe_title.gif);"><div id="shenhe_title_middle" align ="center">审核意见</div></div>
<div id="audit_remark" align="center">
<form action="" method="post">
   <table width="400" border="0" cellspacing="0" cellpadding="0" class="auditremark_table" >
  
  <tr>
    <td align="left" colspan="2" ><textarea  name="auditInfo" id="auditInfo" cols="50" rows="9"  style="overflow:hidden; width:787px; font-size:14px"><%=auditinfo %></textarea></td>
  </tr>
  <tr>
    <td align="center" colspan="2">
      <div id="operation_center" >
 	    <button onclick="ok();" class="button_style">确定</button>       
        <button onclick="javascript:window.close();" class="button_style">取消</button> 
        <button id= "d1"  onclick="doAuditRefuse();"  class="button_style">退回</button>
      </div>
	</td>
  </tr>
</table>
<div id="form_table_title">
	<ul>
		<li class="top">
			<div>
				单位资金使用情况信息
			</div>
		</li>
	</ul>
</div>
<div id="containerline12" align="left">
	<ui:datatable id="tmain" tabletype="MainList" data="mainlist"  columndefine="true" sumColumnList="amt,curbal" sumamtrow="all"/>
</div>		
</form>
</div>
</body>
</html>
<script>
var datatableStyle= "<%=datatableStyle %>";
if(datatableStyle=="none"){

	document.getElementById("form_table_title").style.display=datatableStyle;
	document.getElementById("containerline12").style.display=datatableStyle;
	document.getElementById("d1").style.display=datatableStyle;
	document.getElementById("auditInfo").style.width=390;
	window.dialogWidth = '400px';
	window.dialogHeight = '280px';
}else{
	window.dialogWidth = '800px';
	window.dialogHeight = '600px';
	
}
</script>
