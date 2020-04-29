<%@ page language="java" contentType="text/html; charset=GBK" pageEncoding="GBK"%>
<%
  response.setHeader("Cache-Control","no-cache"); 
  response.setHeader("Pragma","no-cache"); 
  response.setDateHeader("Expires",0); 
  String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<meta http-equiv="X-UA-Compatible" content="IE=7" />
<title>消息设置&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</title>
<script type="text/javascript">
	var _ROOT_PATH_='<%=basePath%>';
</script>
  <link rel="stylesheet" type="text/css" href="<%=basePath%>/style/ifmis_style.css"/>
  <link rel="stylesheet" type="text/css" href="<%=basePath%>/style/stylefontL.css"/>
  <script type="text/javascript" src="<%=basePath%>/ltext/frameworksupport.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/ltext_core.js"></script>
</head>
 <body class="" >
   <div id="pop_inner2">
    <br/>
   <div id="table_list_title"><ul><li class="top"><div>消息设置</div></li></ul></div>
   <div id="edit_table" style="padding-left:0;">
 <form name="form1" id="form1" action="" method="post">
	<table width="100%" border="0" cellpadding="0" cellspacing="0">
	 <!-- <tr>
	    <th>采集频度(秒):</th>
	    <td><input type="text" name="frequency" /></td>
	  </tr>
	  -->
	  <tr>
	    <th>是否右下角提醒个人消息</th>
	    <td><select id="taskremide" name="taskremide" style="width:172px"><option value="1">是</option><option value="0">否</option></select></td>
	  </tr>
	  <tr>
	    <th>消息记录预警(最多500)</th>
	    <td><input type="text" id="warnLine" name="warnLine" /></td>
	  </tr>
	<!--  <tr>
	    <th>消息超过500条</th>
	    <td><select name="outnumber" style="width:172px"><option value="1">是</option><option value="0">否</option></select></td>
	  </tr>
	   --> 
	</table>
</form>
  </div>
  </div>
<center>
<input type="button" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'" value="确定" onclick="saveSetUp()"/>
<input type="button" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'" onclick="javascript:window.close()" value="取消" /></center>
 </body>
</html>
<script type="text/javascript">
var para = {};
Ext.lt.RCP.server('rightnowmessage', "getSetUp", para, function (resp) {
	var remind=resp.popupremind;
	var warn=resp.warnline;
	if(remind!=null){
		document.getElementById('taskremide').value=remind;
	}else{
		document.getElementById('taskremide').value=1;
	}
	if(warn!=null){
		document.getElementById('warnLine').value=warn;
	}else{
		document.getElementById('warnLine').value=500;
	}
});
function saveSetUp(){
	//var frequency = document.form1.frequency.value; 
	//frequency=frequency.replace(/\s/g,'');
	var warnLine = document.form1.warnLine.value; 
	warnLine=warnLine.replace(/\s/g,'');
	if(isNaN(warnLine)){
		alert("请输入数字");
		return;
	}
	if(warnLine>500){
		alert("请输入500以内的数字");
		return;
	}
	if(warnLine==""){
		warnLine="500";
	}	
	var taskremide = document.form1.taskremide.value; 
	//var outnumber = document.form1.outnumber.value;
	var para = {};
	//para.frequency = frequency;
	para.taskremide = taskremide;
	para.warnLine = warnLine;
	//para.outnumber = outnumber;
	Ext.lt.RCP.server('rightnowmessage', "saveSetUp",  para, function (resp) {
		alert("保存成功");
	    window.close();
    });
}
function document.onkeydown(){
	if (window.event.keyCode==13){
		saveSetUp();
	}
}
</script>