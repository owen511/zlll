<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ page import="gov.mof.fasp.sec.util.SecureUtil"%>
<%@ page import="gov.mof.fasp.ca.user.UserDTO" %>
<%@ page import="java.util.Map"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
  <script type="text/javascript">
  var _ROOT_PATH_='<%=basePath%>';
  </script>
  <link rel="stylesheet" type="text/css" href="<%=basePath%>/style/ifmis_style.css"/>
  <link rel="stylesheet" type="text/css" href="<%=basePath%>/portal/style/message.css"/>
  <script type="text/javascript" src="<%=basePath%>/ltext/frameworksupport.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/ltext_core.js"></script>
  <script type="text/javascript" src="<%=basePath%>/portal/js/login/ltext_common_menu.js"></script>
  
  </head>
  
  <body>
  	 <table>
  	 <tr><td >
  	 	�������1:</td><td><textarea style="height:200px;width:expression(document.body.offsetWidth/2-60)"  id='inpara1' ></textarea>
  	 </td><td rowspan=2>
  	 	<textarea style="height:240px;width:expression(document.body.offsetWidth/2-60)"  id='simple'>��1��
[{"phone":"15011111111","user":"001003","failnumber":"1","content":"����һ��֧�����뵥����Ҫ��ˣ�лл��","smsid":"pay-001","system":"pay","createtime":"2012-07-12 10:38:50"},{"phone":"15011111112","user":"001004","failnumber":"1","content":"����һ��֧�����뵥����Ҫ��ˣ�лл��","smsid":"pay-002","system":"pay","createtime":"2012-07-13 10:38:50"}]
��2��
[{"msid":"indi-1"},{"msid":"indi-2"}]	 	</textarea>
  	 </td></tr>
  	 <tr><td>
     	�������2:</td><td><textarea style="height:40px;width:expression(document.body.offsetWidth/2-60)"  id='inpara2' ></textarea>
  	 </td></tr>
  	 <tr><td >
     	��������&nbsp:</td><td colspan=2><textarea style="height:100px;width:expression(document.body.offsetWidth-120)"  id='outpara' ></textarea>
  	 </td></tr>
  	 <tr height="10px"><td colspan=2></td></tr>
  	 <tr><td></td><td colspan=2>
	     <input type="button" value="ʵʱ���ŷ��ͽӿ�(����ʧ�ܵ�id)" onclick="a()">
	     <input type="button" value="���ű���ӿ�" onclick="b()">
	     <input type="button" value="����ɾ���ӿ�" onclick="c()">
	     <input type="button" value="���Ų�ѯ�ӿ�" onclick="d()">
	     <input type="button" value="���" onclick="f()">
     </td></tr>
      <tr><td >
	   ������Ϣ:</td><td colspan=2> <textarea  style="height:150px;width:expression(document.body.offsetWidth-120)"  id='errorMsg'></textarea>
     </td></tr>
     </table>
  </body>
</html>
<script type="text/javascript">
function a(){
	    var inpara = document.getElementById("inpara1").value;
	    var system = document.getElementById("inpara2").value;
 		var itype = "1";
 		var config = [inpara,system,itype];
 		//debugger;
		Ext.lt.RCP.server("testsms", "testSms",  config, function (resp) {
			document.getElementById("outpara").value=resp.result;
		},function(){});
}
function b(){
 		var inpara = document.getElementById("inpara1").value;
	    var system = document.getElementById("inpara2").value;
 		var itype = "2";
 		var config = [inpara,system,itype];
		Ext.lt.RCP.server("testsms", "testSms",  config, function (resp) {
			 document.getElementById("outpara").value=resp.result;
			 document.getElementById("errorMsg").value=resp.eMsg;
		},function(){});
}
function c(){
	    var inpara = document.getElementById("inpara1").value;
	    var system = document.getElementById("inpara2").value;
 		var itype = "3";
 		var config = [inpara,system,itype];
		Ext.lt.RCP.server("testsms", "testSms",  config, function (resp) {
			document.getElementById("outpara").value=resp.result;
			document.getElementById("errorMsg").value=resp.eMsg;
		},function(){});
}
function d(){
		var inpara = document.getElementById("inpara1").value;
	    var system = document.getElementById("inpara2").value;
 		var itype = "4";
 		var config = [inpara,system,itype];
		Ext.lt.RCP.server("testsms", "testSms",  config, function (resp) {
			document.getElementById("outpara").value=resp.result;
			document.getElementById("errorMsg").value=resp.eMsg;
		},function(){});

}
	/*
	var msgcmp=new Ext.lt.portal.component.message({
			remind:document.getElementById('remind'),
			refreshtime:20000,
			popflag:true,
			showflash:false
	});
	msgcmp.draw(document.body)
	*/
//}
function f(){
 	 document.getElementById("inpara1").value="";
	 document.getElementById("inpara2").value="";
	 document.getElementById("errorMsg").value="";
	 document.getElementById("outpara").value="";
}
</script>