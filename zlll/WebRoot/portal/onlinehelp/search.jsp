<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ page import="gov.mof.fasp.sec.util.SecureUtil"%>
<%@ page import="gov.mof.fasp.ca.user.UserDTO" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
			 UserDTO user = SecureUtil.getCurrentUser();
String username=user.getName();	
//存储问题的服务地址
String onlinehelpurl=(String)request.getSession().getAttribute("onlinehelpurl");
//问题地区
String localquestionarea=(String)request.getSession().getAttribute("questionarea");
String id = request.getParameter("id");
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
   <head>
    <script type="text/javascript">
	     var onlinehelpurl='<%=onlinehelpurl%>';
	     var localquestionarea='<%=localquestionarea%>';
	     var _ROOT_PATH_='<%=basePath%>';
	     var username='<%=username%>';
    </script>
    <title>问题查看</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" type="text/css" href="<%=basePath%>/ltext/style/ext-all.css"/> 
	<script type="text/javascript" src="<%=basePath%>/ltext/frameworksupport.js"></script>
	<script type="text/javascript" src="<%=basePath%>/ltext/ltext_core.js"></script>
	<base target="_self">
	<style>
	.collect{display:block;width:50px;background:url(/portal/images/success.gif) no-repeat left center;}
	</style>
  </head>
  <body>
  	<div style="height:expression(window.screen.availHeight-50);OVERFLOW-Y:scroll;OVERFLOW-X:hidden;OVERFLOW:auto">
		<div id = 'newId'>
		</div>
		<div id = 'answerid'>
		</div>
		<div id = 'commentId'></div> 
	</div> 
  </body>
</html>
<script>
   //问题id
   var id = '<%=id%>';
   var config = {};
   config.id = id;
   Ext.lt.RCP.script(onlinehelpurl,"auditcomment", "findComments",config,function (resp) {
	    //所有评论
	    var commentList = resp.commentList;
	    //问题信息
	    var question = (resp.question)[0];
	    var html = [];	
	    var answerhtml = [];	
	    var commentHtml = [];
	    //html.push('<a title="收藏" href="javascript:collect('+question.ITEMID+');" class="">收藏</a></td>');
   		html.push('&nbsp&nbsp&nbsp&nbsp'+question.QUESTIONCONTENT);
   		html.push('<hr style="height:1px;margin:0;border:1px dotted #036" />');
   		html.push('<table border="0" cellspacing="0" cellpadding="0"  width="100%" width="100%"><tr><td>');
   		if(question.FILEID!=null){
   			html.push('<font size=2>附件：<a href="'+onlinehelpurl+'/portaldownloadfile.page?path='+question.FILEID+'">'+question.USERFILE+'</a></font>');
   		}
   		html.push('</td><td align="right"><font size=2>'+question.QUESTIONUSER+'&nbsp&nbsp&nbsp&nbsp提问于&nbsp&nbsp&nbsp&nbsp'+question.QUESTIONDATE+'</font></td></tr></table>');
	   	//answerhtml.push('<font size=2>'+question.ANSWERUSER+'&nbsp&nbsp&nbsp&nbsp答复于&nbsp&nbsp&nbsp&nbsp'+question.ANSWERDATE+'</font>');
   		//answerhtml.push('<hr style="border:1px dotted #036" />');
   		answerhtml.push('&nbsp&nbsp&nbsp&nbsp'+question.ANSWERCONTENT);
   		answerhtml.push('<hr style="height:1px;margin:0;border:1px dotted #036" />');
   		answerhtml.push('<table border="0" cellspacing="0" cellpadding="0"  width="100%"  width="100%"><tr><td>');
   		if(question.ADMINFILEID!=null){
   			answerhtml.push('<font size=2>附件：<a href="'+onlinehelpurl+'/portaldownloadfile.page?path='+question.ADMINFILEID+'">'+question.ADMINFILE+'</a></font>');
   		}
   		answerhtml.push('</td><td align="right"><font size=2>'+question.ANSWERUSER+'&nbsp&nbsp&nbsp&nbsp答复于&nbsp&nbsp&nbsp&nbsp'+question.ANSWERDATE+'</font></td></tr></table>');
   		
   		
   		commentHtml.push('<table  width="100%"><tr ><td>');
   		commentHtml.push('<textarea id="newcomment" style="height:200px;width:650px"></textarea></td><td  width="150px" align="left" valign="bottom">');
   		commentHtml.push('<button onclick="comment()" style="width:60px">发表评论</button>');
   		commentHtml.push('</td></tr></table>');
   		commentHtml.push('<hr style="height:2px;margin:0;border:2px solid #5599ff" />');
	   	for(var i = 0;i <commentList.length;i ++){
	   		var comment = commentList[i];//t.content,t.commentuser,t.commentdate,t.fileid,t1.filename 
	   		commentHtml.push('<div id=commentdiv'+comment.itemid+'>');
	   		commentHtml.push('&nbsp&nbsp&nbsp&nbsp'+comment.content);
	   		commentHtml.push('<hr style="height:1px;margin:0;border:1px dotted #036" />');
	   		commentHtml.push('<table border="0" cellspacing="0" cellpadding="0"  width="100%" ><tr ><td align="right"><font size=2 >'+comment.commentuser+'&nbsp&nbsp&nbsp&nbsp回复于&nbsp&nbsp&nbsp&nbsp'+comment.commentdate+'</font>');
	   		commentHtml.push('</td></tr></table>');
	   		commentHtml.push('<hr  style="height:2px;margin:-6;border:2px solid #5599ff" />');
	   		commentHtml.push('</div>');
	   	}
	   	commentHtml.push('<div id="newcommentdiv">');
	   	commentHtml.push('</div>');
	   	var defaultPanel = new Ext.Panel({
			id:"defaultId",
			frame:true, 
			region : 'center',  
			autoScroll:true,
			enableTabScroll:true,
			width:800,
			title:'标题：'+question.QUESTIONNAME,
			autoHeight:true,
			collapsible:true,//显示右上角最小化按钮
			renderTo:'newId',
			html:html.join('')
		});
		var answerPanel = new Ext.Panel({
			id:"answerPanel", 
			width:800,
			frame:true,
			title:'答复信息',
			autoHeight:true,
			renderTo:'answerid',
			collapsible:true,//显示右上角最小化按钮
			html:answerhtml.join('')
		});
		var commentpanel = new Ext.Panel({
			id:"commentpanel", 
			frame:true,
			width:800,
			title:'所有评论',
			autoHeight:true,
			collapsible:true,//显示右上角最小化按钮
			renderTo:'commentId',
			html:commentHtml.join('')
		});
	},function(resp){})
	
	//发表评论
	function comment(){
		var date = new Date();
		var m =date.getMonth()+1<10?"0"+(date.getMonth()+1):date.getMonth()+1;
	    var h = date.getHours()<10?"0"+date.getHours():date.getHours();
	    var mi = date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes();
	    var s = date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds();
	    var time = date.getYear()+"-"+m+"-"+date.getDate()+" "+h+":"+mi+":"+s;
		var comment = document.getElementById('newcomment').value;
		if(comment.trim()==""){
			alert("评论内容为空！");
			return;
		}
	    var config = {};
	    config.commentdate=time;
	    config.commentuser=username;
	    config.comment = comment;
	    //问题id
	    config.questionid = id;
	    if(confirm("确认发表该评论？")){
		    Ext.lt.RCP.script(onlinehelpurl,"auditcomment", "comment",config,function (resp) {
		    	var html = [];
				html.push('<div>');
		   		html.push('&nbsp&nbsp&nbsp&nbsp'+comment);
		   		html.push('<hr style="height:1px;margin:0;border:1px dotted #036" />');
		   		html.push('<table border="0" cellspacing="0" cellpadding="0" width="100%"><tr><td align="right"><font size=2>'+username+'&nbsp&nbsp&nbsp&nbsp回复于&nbsp&nbsp&nbsp&nbsp'+time+'</font>');
		   		html.push('</td></tr></table>');
		   		html.push('<hr style="height:2px;margin:-6;border:2px solid #5599ff" />');
		   		html.push('</div>');
				document.getElementById('newcommentdiv').innerHTML=document.getElementById('newcommentdiv').innerHTML+html.join('')+"";
				document.getElementById('newcomment').value="";
		    },function(resp){alert("评论失败");});
	    }
    }
	//收藏问题
	function collect(id){
		  Ext.lt.RCP.script(onlinehelpurl,"auditcomment", "collect",id,function (resp) {
		  },function(resp){});
	}
</script>