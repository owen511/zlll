<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ page import="gov.mof.fasp.sec.util.SecureUtil"%>
<%@ page import="gov.mof.fasp.ca.user.UserDTO" %>
<%
response.setHeader("Cache-Control","no-cache"); 
response.setHeader("Pragma","no-cache"); 
response.setDateHeader("Expires",0); 
String path = request.getContextPath();
String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
UserDTO user = SecureUtil.getCurrentUser();
String username=user.getName();
String usercode=user.getCode();
String userid=user.getUserid()+"";
//存储问题的服务地址
String onlinehelpurl=(String)request.getSession().getAttribute("onlinehelpurl");
//问题类型
String typemap=(String)request.getSession().getAttribute("typemap");
//问题地区
String localquestionarea=(String)request.getSession().getAttribute("questionarea");
String adminset=(String)request.getSession().getAttribute("adminset");
String auditset=(String)request.getSession().getAttribute("auditset");
String officeset=(String)request.getSession().getAttribute("officeset");
String commentset=(String)request.getSession().getAttribute("commentset");
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
   <script type="text/javascript">
   var username='<%=username%>';
   var usercode='<%=usercode%>';
   var userid='<%=userid%>';
   var onlinehelpurl='<%=onlinehelpurl%>';
   var localquestionarea='<%=localquestionarea%>';
   var adminset='<%=adminset%>';
   var auditset='<%=auditset%>';
   var officeset='<%=officeset%>';
   var commentset='<%=commentset%>';
   var _ROOT_PATH_='<%=basePath%>';
    var typemap = eval(<%=typemap%>);  
  </script>
  <link rel="stylesheet"  type="text/css" href="<%=basePath%>/style/stylefontS.css" /> 
  <link rel="stylesheet" type="text/css" href="<%=basePath%>/style/ifmis_style.css"/>
  <link rel="stylesheet" type="text/css" href="<%=basePath%>/ltext/style/ext-all.css"/> 
  <link type="text/css" rel="stylesheet" href="<%=basePath%>/style/jquery.autocomplete.css" />
  <link rel="stylesheet" type="text/css" href="<%=basePath%>/style/calendar.css"/>
  <link rel="stylesheet" type="text/css" href="<%=basePath%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_LOGO%>_logo.css"/>
  <script type="text/javascript" src="<%=basePath%>/ltext/frameworksupport.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/ltext_core.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/ltext_template.js"></script>
  <script type="text/javascript" src="<%=basePath%>/js/template.js"></script>
  <style type="text/css">
	.ifmissubmenuqtree .overlink a{color:#000;text-decoration:none;}
	.ifmissubmenuqtree .overlink a:hover{color:#D70312;text-decoration:underline;}
  </style>
  </head>
  
	<body>
		<div id ="context">
		<style type="text/css">
		<!--
		.STYLE1 {
			color: #FF0000
		}
		-->
		</style>
		  	<div id="form_table_title">
		  		<ul>
						<li class="top">
							<div>
								待办事项
							</div>
						</li>
					</ul>
				</div>
		
				<div id="container">
					<div id="list">
		 			 </div>
				</div>
		</div>
  </body>
</html>
<script type="text/javascript">
	//查询待办事项并拼装展示
	var config = {};
	config.localquestionarea=localquestionarea;
	config.adminset=adminset;
	config.auditset=auditset;
	config.officeset=officeset;
	config.commentset=commentset;
	config.usercode=usercode;
	config.username=username;
	config.userid=userid;
	config.typemap=typemap;
	Ext.lt.RCP.script(onlinehelpurl,"useonliehelp", "pending", config,function (resp) {
				var setHtml = "<table border=\"0\" id=\"tbl\" cellspacing=\"1\" align=\"center\">";
				setHtml+="<tr><th style=\"text-align:center;\" nowrap=\"NOWRAP\">序号</th><th style=\"text-align:center;\" nowrap=\"NOWRAP\">业务类型</th><th style=\"text-align:center;\" nowrap=\"NOWRAP\">待办事项</th><th style=\"text-align:center;\" nowrap=\"NOWRAP\">操作</th></tr>"
				for(var i = 0 ;i <resp.length;i ++){
				 setHtml += " <tr><td rowspan=1 style='text-align:center' nowrap=\"NOWRAP\">"+(i+1)+"</td><td nowrap=\"NOWRAP\" style='text-align:center'; rowspan=1>"+resp[i].status+"</td><td style='text-align:center;' nowrap=\"NOWRAP\" rowspan=1>待&nbsp<span class=\"STYLE1\">"+resp[i].operate+"</span>&nbsp共&nbsp<span class=\"STYLE1\">"+resp[i].count+"</span>&nbsp条</td><td style='text-align:center;' nowrap=\"NOWRAP\" rowspan=1><a href='"+resp[i].link+"'>查&nbsp看</a></td></tr>";
				}
				setHtml += "</table>";
				document.getElementById("list").innerHTML+=setHtml;
			},function(){});
			
var html="";
</script>