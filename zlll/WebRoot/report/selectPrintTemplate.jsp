<%@ page contentType="text/html; charset=GBK" %>
<%@ page import="com.jiuqi.ezReport.report.Report"%>
<%@ page import="com.jiuqi.ezReport.report.PrintTemplets"%>
<%@ page import="com.jiuqi.ezReport.report.PrintTemplet"%>

<html>
<head>
<title>
打印模板选择
</title>
</head>
<body>
<link href="<%=request.getContextPath()%>/style/style_jq.css" rel="stylesheet" type="text/css">

<%
Report report = (Report) request.getAttribute("report");
PrintTemplets printTemplets = report.getPrintTemplets();
%>

<form name=form1 action="">
<table width="80%" cellpadding=1 cellspacing=1 align=center>
<tr><td>
请选择打印模板:
</td>
</tr>
 <tr><td align=center><div style="width:100%;height:80px;border-style:;overflow:auto" align=center><table width=80%>
<%
for(int i=0;i<printTemplets.size();i++){
  PrintTemplet printTemplet = printTemplets.get(i);
  String templetName = printTemplet.getName() ;
  String checkStr="";
  if(i==0) checkStr="checked";
  %>
  <tr><td width=10><input type=radio  onclick='radioCheck()' name=PrintTemplet id="pg_<%=i%>" value="<%=i%>" <%=checkStr%>></td>
      <td nowrap><label for='pg_<%=i%>' style="cursor:hand"><%=templetName%></label></td>
  </tr>
  <%
}
%></table></div>
</td></tr>
<tr><td colspan=2>
请选择其他方式:
</td>
</tr>
<tr>
<td align=center colspan=2>
<table width=80% >
  <tr><td width=10><input type=radio name=PrintTemplet id="self1" value="-1" onclick='radioCheck()'></td>
      <td nowrap><label for=self1 style="cursor:hand">不使用系统的打印模板</label></td>
  </tr>
</table>
</td>
</tr>
<tr><td colspan=2>&nbsp</td></tr>
<tr><td align=center>
 <input type=button value="打印" id='printStart' onclick="javascript:print(0);" class=editbutton style="width:60px">
 &nbsp;&nbsp;&nbsp;&nbsp;
 
</td></tr>
</table>
<!--</center>  -->
</form>

</body>
<script language="javascript">
function print(a){
  var element = document.getElementsByName("PrintTemplet");
  var templetIndex = "-1";
  var ret = [];
  for(var i=0;i<element.length;i++) {
    if(element[i].checked == true) {
        templetIndex = element[i].value;
        break;
    }
  }
   ret[0] = templetIndex;
   ret[1] = a;
   window.returnValue = ret;
   window.close();
}
function radioCheck() {
   var element = document.getElementsByName("PrintTemplet"); 
   for(var i=0;i<element.length;i++) {

   }
}
</script>
</html>
