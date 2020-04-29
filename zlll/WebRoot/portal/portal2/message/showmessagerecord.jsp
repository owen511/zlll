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
<title>个人消息中心&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</title>
<script type="text/javascript">
var _ROOT_PATH_='<%=basePath%>';
</script>
  <link rel="stylesheet" type="text/css" href="<%=basePath%>/ltext/style/ext-all.css"/> 
  <link rel="stylesheet" type="text/css" href="<%=basePath%>/style/ifmis_style.css"/>
  <link rel="stylesheet" type="text/css" href="<%=basePath%>/portal/style/newpendingtask.css"/>
  <script type="text/javascript" src="<%=basePath%>/ltext/frameworksupport.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/ltext_core.js"></script>
  <script type="text/javascript" src="<%=basePath%>/portal/js/login/ltext_common_message.js"></script>
  <script type="text/javascript" src="<%=basePath%>/portal/js/login/ltext_common_menu.js"></script>
  <style>
/*待办事项标题样式*/
.inner_title {
	font-size: 14px;
	color: blue;
	margin-left: 20px;
	margin-top: 10px;
	display: block;
	margin-bottom: 5px;
}
.todo{border:0; background:#D3E9FF url(/portal/images/msgImages/todo.gif) no-repeat left center; width:120px; height:30px; line-height:30px; text-align:left; padding-left:30px; cursor:pointer; margin-bottom:10px;}
.todo_over{border:0; background:#95BFE9 url(/portal/images/msgImages/todo_.gif) no-repeat left center; width:120px; height:30px; line-height:30px; text-align:left; padding-left:30px; cursor:pointer; margin-bottom:10px;}
.userinfo{border:0; background:#D3E9FF url(/portal/images/msgImages/user.gif) no-repeat left center; width:120px; height:30px; line-height:30px; text-align:left;padding-left:30px; cursor:pointer; margin-bottom:10px;}
.userinfo_over{border:0; background:#95BFE9 url(/portal/images/msgImages/user_.gif) no-repeat left center; width:120px; height:30px; line-height:30px; text-align:left;padding-left:30px; cursor:pointer; margin-bottom:10px;}
.userinfoset{border:0; background:#D3E9FF url(/portal/images/msgImages/userinfoset.gif) no-repeat left top; width:120px; height:30px; line-height:30px; text-align:left;padding-left:30px; cursor:pointer; margin-bottom:10px;}
.userinfoset_over{border:0; background:#95BFE9 url(/portal/images/msgImages/userinfoset_.gif) no-repeat left top; width:120px; height:30px; line-height:30px; text-align:left; padding-left:30px; cursor:pointer; margin-bottom:10px;}
.ltinfo{border:0; background:#D3E9FF url(/portal/images/msgImages/ltinfo.gif) no-repeat left top; width:120px; height:30px; line-height:30px; text-align:left; padding-left:30px; cursor:pointer; margin-bottom:10px;}
.ltinfo_over{border:0; background:#95BFE9 url(/portal/images/msgImages/ltinfo_.gif) no-repeat left top; width:120px; height:30px; line-height:30px; text-align:left; padding-left:30px; cursor:pointer; margin-bottom:10px;}
.counts{ background:#E09700; color:#FFF; font-weight:bold; margin-left:8px; font-family:"Times New Roman", Times, serif;}
.replace{ background:#E09700; color:#FFF; font-size:1}
</style>
</head>
<body style="margin:0px;padding:0px;">

<div layout="{h:{fit:450},w:{fit:true,min:800}}" style="background:#D3E9FF;">
			<div layout="{h:{fit:450},w:{fit:120}}"
				style="width: 120px; background:#D3E9FF; float: left;">
				<table width="100%" border="0" cellspacing="0" cellpadding="0" style="height:450px;">
		  			<tr>
		    			<td valign="top"><button id="waittaskmenu" class="todo" onclick="showtask('msgtaskdiv')" onmouseover="this.className='todo_over'" onmouseout="this.className='todo'">待办事项<span class="counts"></span></button><br />
		   				<button id="personalmsgmenu" class="userinfo" onclick="msgCenter();" onmouseover="this.className='userinfo_over'" onmouseout="this.className='userinfo'">个人消息<span id="messagecount" class=""></span></button><br />
		   		    	<!--  <button class="ltinfo" onmouseover="this.className='ltinfo_over'" onmouseout="this.className='ltinfo'">论坛消息</button>
		   			    -->
		                </td>
		  		   </tr>
		  		   <tr>
		    		    <td style="background:#D3E9FF; ">&nbsp;</td>
				   </tr>
				   <tr>
				        <td valign="bottom" style="background:#D3E9FF; "><button id="setupmenu" onclick="setUp('msgtaskdiv');" class="userinfoset" onmouseover="this.className='userinfoset_over'" onmouseout="this.className='userinfoset'">个人设置</button></td>
				   </tr>
		      </table>
		    </div>
			<div id="msgtaskdiv" layout="{h:{fit:450},w:{fit:680}}"
				style="width:680px;height:450px;background:white; float: right;overflow:auto;"></div>
		</div>
</body>
</html>
<script type="text/javascript">
function msgCenter(){
	document.getElementById("personalmsgmenu").className='userinfo_over';
	document.getElementById("personalmsgmenu").onmouseout='';
	document.getElementById("waittaskmenu").className='todo';
	document.getElementById("waittaskmenu").onmouseout=function onmouseout(){ this.className="todo"};
	document.getElementById("setupmenu").className='userinfoset';
	advice=new Ext.lt.portal.component.advices();
	var obj = document.getElementById("msgtaskdiv");
	obj.innerHTML="";
	advice.draw(obj);
}	
msgCenter();
var pWin=window.dialogArguments;
</script>