<%@ page language="java" import="java.util.*,java.io.File" pageEncoding="GBK"%>

<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path;
	String fileid="";
	if(request.getAttribute("boflashcontent")!=null){
		fileid = (String)request.getAttribute("boflashcontent");
	}
	String filename="";
	if(fileid!=null&&fileid.length()>0){
		gov.mof.fasp.ifmis.portal.portlets.post.FileUtil util = new gov.mof.fasp.ifmis.portal.portlets.post.FileUtil();
		filename= util.getFileName(fileid);
	}
%>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title>flash预览</title>
<link href="<%=basePath%>/style/style2.css" rel="stylesheet" type="text/css" />
<style>

.button_style {
	width: 80px;
	background-image: url(<%=basePath%>/images/bg/button_bg.gif);
	border: 1px solid #003c74;
	color: #000000;
	height: 20px;
	padding-top: 2px;
	margin-left: 5px;
	margin-right: 10px;
}

.bg_picture{
background-image:url(<%=basePath%>/images/bg/xidihongcun.gif);
background-position:right bottom;
background-repeat:no-repeat;
}
.attention_title{
border-bottom:3px #2C609C double;
width:95%;
margin-left:20px;
font-size:14px;
color:#2C609C;
height:40px;
line-height:40px;
text-align:center;
background-image:url(<%=basePath%>/images/login/notice2.gif);
background-position:left top;
background-repeat:no-repeat;
}
.attention_content{
font-size:12px;
/*line-height:25px;*/
width:630px;
margin-left:20px;
/*border-bottom:1px #CCC dotted;*/
height:450px;
overflow-x:hidden;
overflow-y:scroll;
margin-bottom:10px;
margin-top:5px;
}
.set_center{
text-align:center;
}
</style>
</head>

<body class="bg_picture" onload='this.focus();'>
			<EMBED  src="<%=request.getContextPath()%>/showflash.do?path=<%=fileid %>" width=100% height=90% autostart=true wmode=transparent> 
			</EMBED>

	<div id="confirm_exit_btn" align='center'> 
		<input type="button" id="saveAndOut" name="save"  value="关闭" onclick="javascript:window.close();" class="button_style">
		</div>
	
</body>