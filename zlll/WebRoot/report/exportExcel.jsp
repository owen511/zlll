<%@ page contentType="text/html; charset=GBK"%>
<%@ page import="java.io.*"%>
<%@ page import="com.jiuqi.grid.GridData"%>
<%@ page import="gov.mof.fasp.fm.rpt.rptmanager.dto.ReportDTO"%>
<%@ page import="com.jiuqi.ezReport.output.ExcelExportor"%>
<%@ page import="com.jiuqi.ezReport.report.Report"%>
<%
       GridData gd = (GridData)request.getAttribute("gd");
       Report report = (Report)request.getAttribute("report");
      
       if(gd != null){//���ȡ����ȷ�ı�����ݶ��󣬿�ʼ����������Excel�ļ�
               ExcelExportor out2Excel = new ExcelExportor(report,gd);     
	           out2Excel.setAutoAdjust(false);              
               ReportDTO dto = (ReportDTO)request.getAttribute("ReportDTO");                      
               out.clearBuffer();
               //������д����Ӧ��                       
               response.setContentType("application/vnd.ms-excel;charset=GBK");
               String fileName = "attachment;filename="+dto.getReportspec()+".xls";
               String dispositionHeader = new String(fileName.getBytes(), "iso8859-1");                       
               response.setHeader("Content-Disposition",dispositionHeader);
               ServletOutputStream servletOut = response.getOutputStream();
               out2Excel.export(servletOut);
               servletOut.close();
      } 
%>

