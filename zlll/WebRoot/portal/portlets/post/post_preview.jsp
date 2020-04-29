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
	//记录该公告是否有内容，没有的需要去发请求查询内容;0没有内容，1有
	String  hastext="0";
	gov.mof.fasp.ifmis.portal.portlets.post.PostDTO post =null;
	//在公告管理下的预览ispostcontent=1，首页点击公告此参数为null
	if(id!=null&&!"1".equals(ispostcontent)){
		List postList =(List)session.getAttribute("postList");
		for(int i=0;i<postList.size();i++){
			post =(gov.mof.fasp.ifmis.portal.portlets.post.PostDTO)postList.get(i);
            String postid = post.getId()+"";			
		 	if(postid.trim().equals(id.trim())){
		 		title=post.getPosttitle();
		 		text=post.getPosttext();
		 		if(text!=null&&!"".equals(text)){
					hastext="1";
				}else{
				    text=""; 
				}
		 		fileid=post.getFileid();
		 	}
		 }
	}else if(request.getAttribute("postcontent")!=null){//在公告管理下的预览
		post = (gov.mof.fasp.ifmis.portal.portlets.post.PostDTO)request.getAttribute("postcontent");
	    title=post.getPosttitle();
		text=post.getPosttext();
		if(text!=null&&!"".equals(text)){
			hastext="1";
		}else{
		    text=""; 
		}
		fileid=post.getFileid();
	}
	String filename="";
	/********查询方法后添加的wyx****/
	String[] fileidStr=null;
	List filenamelist = new ArrayList();
	if(null!=fileid&&fileid.length()>0){
		fileidStr=fileid.split("@");
		gov.mof.fasp.ifmis.portal.portlets.post.FileUtil util = new gov.mof.fasp.ifmis.portal.portlets.post.FileUtil();
		for(int i=0;i<fileidStr.length;i++){
			filename= util.getFileNameForPreview(fileidStr[i]);
			filenamelist.add(filename);
		}
	}
	/************/
%>
  <script type="text/javascript">
      var _ROOT_PATH_='<%=basePath%>';
  </script>
  <script type="text/javascript" src="<%=basePath%>/ltext/frameworksupport.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/ltext_core.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/ltext_template.js"></script>
  <script type="text/javascript" src="<%=basePath%>/js/template.js"></script>
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
background-image:none;
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
width:96%;
margin-left:20px;
/*border-bottom:1px #CCC dotted;*/
height:530px;
overflow-x:hidden;
margin-bottom:10px;
margin-top:5px;
}
.set_center{
text-align:center;
}
</style>
</head>

<body class="bg_picture" onload='this.focus();'>
<div >
    <form name="detailform" id="detailform" action="#" method="post" >
    	
		<!-- 请保留此div和a标签  -->
			<div class="attention_title"><b><font size="4"><%=title%></font></b></div>
			<div class="attention_content" > <div id="posttext"> <%=text%></div>
		    <script language="JavaScript" type="text/javascript">	
  			var hastext= '<%=hastext%>';
  			//判断页面上是否已经有公告内容
  			if(hastext=='0'){
  				var id = '<%=id%>';
				var para = new Object();
				para.id = id;
				//同步获取公告内容
				var pText = Ext.lt.RCP.asynserver('defaultCommonService', 'getPostText',para).PostText;
				document.getElementById('posttext').innerHTML=pText;
		 	}	   	
  			</script>
			<%
				for(int i=0;i<filenamelist.size();i++){
			%>
			<%if(!filenamelist.get(0).equals("")){%> 
				附件：<a href="<%=basePath%>/downLoad.do?path=<%=fileidStr[i] %>"><%=filenamelist.get(i).toString() %></a>
			<%}%>
			</br>
			<% }%>
			</div>
			<div id="confirm_exit_btn" align='center' style='height:20px'> 
				<input type="button" id="saveAndOut" name="save"  value="关闭" onclick="javascript:window.close();" class="button_style">
			</div>
	</form>
	
</div>
</body>