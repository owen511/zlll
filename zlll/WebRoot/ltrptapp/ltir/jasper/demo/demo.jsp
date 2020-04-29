<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>龙图软件--套打组件调用演示</title>
<%@ include file="/ltrptapp/ltir/jasper/interface/ltjasper.jsp"%> 
</head>
<body>
<b>龙图软件--套打组件调用演示</b><br>

<br>
数据参数：<input type="text" name="jrid"  value="410720"/>
模板参数：<input type="text" name="printid" value="23456"/><br>
js调用:rpt_JasperPrint('410720','23456','viewer')  　　　　　　  rpt_JasperPrint('410720,410720','23456','printer')<br>
<input name="bnt_viewer" value="启动查看器" onclick="rpt_JasperPrint(jrid.value,printid.value,'viewer')" type="button" />  　　　　　　    　　　　　　    　　　　　　  <input name="bnt_printer" value="直接打印" onclick="rpt_JasperPrint(jrid.value,printid.value,'printer')" type="button" /><br><br>

<b>参数说明</b><br>

数据参数：为票据ID（多个用英文逗号隔开 410720,410721,410722）<br>
模板参数：t_rptmanager的reportid<br>
打印方式：viewer|printer<br>
参考：/ltrptapp/ltir/jasper/interface/ltjasper.jsp
</body>
</html>
