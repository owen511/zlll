<%@ page language="java" import="java.util.*,java.io.File" pageEncoding="GBK"%>

<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path;
	String id=request.getParameter("id");
	String title="";
	String text="";
	String ispostcontent=(String)request.getAttribute("ispostcontent");
	String fileid="";
	boolean showimage=false; 
	//System.out.println(id);
	gov.mof.fasp.ifmis.portal.portlets.post.PostDTO post =null;
	//System.out.println(ispostcontent);
	if(id!=null&&!"1".equals(ispostcontent)){
		//System.out.println("asdlfjhaskd------------------------");
		//System.out.println(id);
		List postList =(List)session.getAttribute("postList");
		 for(int i=0;i<postList.size();i++){
			 post	=(gov.mof.fasp.ifmis.portal.portlets.post.PostDTO)postList.get(i);
		 	if(post.getId()==Integer.parseInt(id)){
		 		title=post.getPosttitle();
		 		text=post.getPosttext();
		 		if(text==null)
		 		  text="";
		 		fileid=post.getFileid();
		 		if(1==post.getFiledisplay()){
		 			showimage=true;
		 		}
		 	}
		 }
	}else if(request.getAttribute("postcontent")!=null){
		post = (gov.mof.fasp.ifmis.portal.portlets.post.PostDTO)request.getAttribute("postcontent");
	     title=post.getPosttitle();
		 text=post.getPosttext();
		 if(text==null)
		 	text="";
		 fileid=post.getFileid();
		 if(1==post.getFiledisplay()){
			 //System.out.println(post.getFiledisplay());
	 			showimage=true;
	 	}
	}
	//System.out.println(fileid);
	String filename="";
	String showimagetype="jpg,bmp,png,gif";
	if(fileid!=null&&fileid.length()>0){
		gov.mof.fasp.ifmis.portal.portlets.post.FileUtil util = new gov.mof.fasp.ifmis.portal.portlets.post.FileUtil();
		filename= util.getFileName(fileid);
		
		if(showimage){
			if(showimagetype.indexOf(util.getFileType().toLowerCase())<0){
				showimage=false;
			}
		}
	}
%>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title>公告</title>
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
<div>
    <form name="detailform" id="detailform" action="#" method="post" >
    	
		<!-- 请保留此div和a标签  -->
		<div >
		
			<div class="attention_title"><b><font size="4"><%=title%></font></b></div>
			<div class="attention_content" style="overflow: auto;"> <%=text%>
			<%if(!filename.equals("")){ 
				if(showimage){%>
				<img src="<%=basePath%>/postimage.do?path=<%=fileid %>"/>
				<%}else{%>
				附件：<a href="<%=basePath%>/downLoad.do?path=<%=fileid %>"><%=filename %></a>
			<%}} %>
			</div>
			
		</div>

	<div id="confirm_exit_btn" align='center'> 
		<input type="button" id="saveAndOut" name="save"  value="关闭" onclick="javascript:window.close();" class="button_style">
		</div>
	</form>
	
</div>
</body>