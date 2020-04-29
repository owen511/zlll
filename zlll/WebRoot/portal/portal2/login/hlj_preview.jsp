<%@ page language="java" import="java.util.*,java.io.File" pageEncoding="GBK"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path;
	String id=request.getParameter("id");
	String type=request.getParameter("type");
	String title = "公告";
	if("2".equals(type)){
		title="信息公开";
	}else if("3".equals(type)){
		title="政策法规";
	}
%>
  <script type="text/javascript">
      var _ROOT_PATH_='<%=basePath%>';
  </script>
  <script type="text/javascript" src="<%=basePath%>/ltext/frameworksupport.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/ltext_core.js"></script>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<meta http-equiv="X-UA-Compatible" content="IE=7" />
<title>首页&gt;&gt;<%=title%>&gt;&gt;正文&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</title>
<style>
 	a{color:#5172CF;text-decoration:underline}
	a:hover{color:#800080 ;text-decoration:underline;}
	a:visited{color:#800080 ;text-decoration:underline;}
	a:active{color:#800080 ;text-decoration:underline;}
</style>
</head>
<body scroll=no style="margin: 0px;padding:0px;">
	<div style="background: url(<%=basePath%>/portal/images/bg_02.gif) repeat-x left top;">
	    <form name="detailform" id="detailform" action="#" method="post" >
				<div class="attention_title" id="postname" style="width:100%;height:456px;overflow-y:scroll">
					<b><font size="4"><div id="posttitle" align="center"></div></font></b>
					<div id="posttext"></div>
				</div>
				</br>
				<div align='center'>
					<div id="fileDiv" align="left" style="overflow-y:auto;width:90%;height:44px;display:none;border:1px dotted black;background:#FFFDCA;font-size:12px;">
					</div>
				</div>
				<hr>
				
				<div style="font-size: 12px;">
				<div id="preDiv" style="display:none;">上一篇：<a href="" id='preObj'></a></br></br></div>
				<div id="nextDiv" style="display:none;">下一篇：<a href="" id='nextObj'></a></div>
				</div>
				<!-- 
				<div id="confirm_exit_btn" align='center' style='height:20px'> 
					<input type="button" id="saveAndOut" name="save"  value="关闭" onclick="javascript:window.close();" class="button_style">
				</div>
				 -->
		</form>
		<script language="JavaScript" type="text/javascript">
			var fileid = '<%=id%>';
			var title = '';
			var preObj = null;
			var nextObj = null;
			var para = new Object();
			para.id = fileid;
			para.type = '<%=type%>';
			//同步获取内容
			var postMap = Ext.lt.RCP.asynserver('postService', 'getPosts',para);
			var postList = postMap.postList;
			
			var filenames = postMap.filenames;
			var hh = document.getElementById("postname").offsetHeight;
			var fileh = 44;
			if(postList.length==1){
				hh+=80;
			}
			if(filenames==null||filenames.length==0){
				hh+=44;
			}else{
				var total = filenames.length-2;
				if(total>0){
					hh=hh-total*21;
					fileh+=total*21;
					document.getElementById("fileDiv").style.height=fileh+"px";
				}
			}
			document.getElementById("postname").style.height=hh+"px";
			for(var i = 0;i<postList.length;i++){
				var post = postList[i];
				if(i>0){
					preObj = postList[i-1];
				}else{
					preObj = null;
				}
				if(i<postList.length-1){
					nextObj = postList[i+1];
				}else{
					nextObj = null;
				}
				if(post.id == fileid){
					title = post.posttitle;
					break;
				}
			}
			document.getElementById("posttitle").innerHTML=title;
			if(preObj!=null){
				document.getElementById("preDiv").style.display='';
				document.getElementById("preObj").href='/portal/portal2/login/hlj_preview.jsp?id='+preObj.id+'&type=<%=type%>';
				document.getElementById("preObj").innerHTML=preObj.posttitle;
			}
			if(nextObj!=null){
				document.getElementById("nextDiv").style.display='';
				document.getElementById("nextObj").href='/portal/portal2/login/hlj_preview.jsp?id='+nextObj.id+'&type=<%=type%>';
				document.getElementById("nextObj").innerHTML=nextObj.posttitle;
			}
			document.getElementById("posttext").innerHTML=postMap.postText;
			if(filenames!=null&&filenames.length>0){
			var fileHtml = [];
			fileHtml.push('<table border=0 cellpadding="0" cellspacing="0" style="font-size:12px;">');
			fileHtml.push('<tr><td width="60px;">附件下载：</td>');
			fileHtml.push('<td >');
			
			fileHtml.push('<table border=0  cellpadding="0" cellspacing="5" style="font-size:12px;">');
			for(var j = 0;j < filenames.length;j++){
				var file = filenames[j];
				fileHtml.push('<tr>');
				fileHtml.push('<td title='+file.filename+'><div style="width:444px;height:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"><a href="'+_ROOT_PATH_+'/downLoad.do?path='+file.id+'">'+file.filename+'</a></div></td>');
				fileHtml.push('</tr>');
			}	
			fileHtml.push('</table></td></tr>');
			fileHtml.push('</table>');
				document.getElementById("fileDiv").style.display='';
				document.getElementById("fileDiv").innerHTML=fileHtml.join('');
			}
		</script>
	</div>
</body>