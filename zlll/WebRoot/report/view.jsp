<%@ page contentType="text/html; charset=GBK"%>
<%@ page import="com.jiuqi.ezReport.report.Report"%>
<%@ page import="com.jiuqi.ezReport.report.PrintTemplets"%>
<%@ page import="com.jiuqi.ezReport.report.PrintTemplet"%>
<%@ page import="com.jiuqi.util.Base64"%>
<%
  response.setHeader("Cache-Control","no-cache"); 
  response.setHeader("Pragma","no-cache"); 
  response.setDateHeader("Expires",0); 
  
  String rootPath = request.getContextPath();
%>
<html>
<script type="text/javascript" src="<%=rootPath%>/ltext/ltext_core.js"></script>
<script type="text/javascript" src="<%=rootPath%>/js/choose.js"></script>
<script type="text/javascript" src="<%=rootPath%>/js/loadOcx.js"></script>
<script type="text/javascript">
  //系统报表组件是否允许自动安装
 var rptOcxIsAuto =<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_RPTOCXAUTO%>;
</script>
<body>
<%
            String templetIndex = request.getParameter("printTemplet");
            String templetData = null;
            boolean needCWPage = false;
            String cwMsgCols = null;
            String cwCopyCols = null;
            String cwSumCols = null;

            if (templetIndex != null) {//有打印模板
                if (templetIndex == null)
                    templetIndex = "0";
                //String printView = request.getParameter("printView");
                	
	            Report report = (Report) request.getAttribute("report");
                PrintTemplets printTemplets = report.getPrintTemplets();
                PrintTemplet printTemplet = printTemplets.get(Integer.parseInt(templetIndex));
                byte[] templetbytes = printTemplet.getTempletData();
                templetData = Base64.byteArrayToBase64(templetbytes);

                needCWPage = printTemplet.getNeedCWPage();
                cwCopyCols = printTemplet.getCWCopyCols();
                cwMsgCols = printTemplet.getCWMsgCol();
                cwSumCols = printTemplet.getCWSumCols();
            }

            
            String gridData = (String)request.getAttribute("gridData");
%>
<script language="javascript">
function printTable(){

var griddata = "<%=gridData%>";

var WebPrinter = Ext.lt.ifmis.activex.loadJQReportOcx();

<%if(templetIndex == null){%>
WebPrinter.Preview(griddata);
<%}else{%>
var templetdata = "<%=templetData%>";
var useCWPage = <%=needCWPage%>;
var copyCols = "<%=cwCopyCols%>";
var msgCols = "<%=cwMsgCols%>";
var sumCols = "<%=cwSumCols%>";
WebPrinter.UseCWPage = useCWPage;
WebPrinter.CWMsgCol = msgCols;
WebPrinter.CWSumCols =sumCols;
WebPrinter.CWCopyCols =copyCols;
WebPrinter.PreviewEx(griddata,templetdata);
<%}%>
}
  window.onload = printTable;
</script>
</body>
</html>
