<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
//存储问题的服务地址
String onlinehelpurl=(String)request.getSession().getAttribute("onlinehelpurl");
//问题地区
String localquestionarea=(String)request.getSession().getAttribute("questionarea");
String id = request.getParameter("id");
String flag = request.getParameter("flag");
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
   <head>
    <script type="text/javascript">
	     var onlinehelpurl='<%=onlinehelpurl%>';
	     var localquestionarea='<%=localquestionarea%>';
	     var _ROOT_PATH_='<%=basePath%>';
    </script>
    <title>审核评论</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<link rel="stylesheet" type="text/css" href="<%=basePath%>/ltext/style/ext-all.css"/> 
	<script type="text/javascript" src="<%=basePath%>/ltext/frameworksupport.js"></script>
	<script type="text/javascript" src="<%=basePath%>/ltext/ltext_core.js"></script>
	<base target="_self">
	<style>
	.success{display:block;width:65px;background:url(/portal/images/success.gif) no-repeat left center;}
	.fail{display:block;width:65px;background:url(/portal/images/fail.gif) no-repeat left center;}
	</style>
  </head>
  <body>
  	<div style="height:expression(window.screen.availHeight-50);OVERFLOW-Y:scroll;OVERFLOW-X:hidden;OVERFLOW:auto">
		<div id = 'newId'>
		</div>
		<div id = 'answerid'>
		</div>
		<div id = 'commentId' style="OVERFLOW-Y:auto;OVERFLOW:scroll"></div> 
	</div> 
<!-- 
<hr style="border:1px dashed #000; height:1px">
<hr style="border:1px dotted #036" />
<hr style="border : 1px dashed blue;" />
 -->
  </body>
</html>
<script>
	//总评论数
	var commentSize = 0;
	//问题id	
    var id = '<%=id%>';
    //标识显示的新的评论还是审核过的评论
    var flag = '<%=flag%>';
    var config = {};
    config.id = id;
    config.flag = flag;
    //查询该问题的所有评论和该问题的详细信息
    Ext.lt.RCP.script(onlinehelpurl,"auditcomment", "findComments",config,function (resp) {
	    //所有评论
	    var commentList = resp.commentList;
	    //问题信息
	    var question = (resp.question)[0];
	    var html = [];	
	    var answerhtml = [];	
	    var commentHtml = [];
	    html.push('<font size=2>'+question.QUESTIONUSER+'&nbsp&nbsp&nbsp&nbsp提问于&nbsp&nbsp&nbsp&nbsp'+question.QUESTIONDATE+'</font>');
   		html.push('<hr style="border:1px dotted #036" />');
   		html.push('&nbsp&nbsp&nbsp&nbsp'+question.QUESTIONCONTENT);
	   	answerhtml.push('<font size=2>'+question.ANSWERUSER+'&nbsp&nbsp&nbsp&nbsp答复于&nbsp&nbsp&nbsp&nbsp'+question.ANSWERDATE+'</font>');
   		answerhtml.push('<hr style="border:1px dotted #036" />');
   		answerhtml.push('&nbsp&nbsp&nbsp&nbsp'+question.ANSWERCONTENT);
   		commentSize=commentList.length;
	   	for(var i = 0;i <commentList.length;i ++){
	   		var comment = commentList[i];//t.content,t.commentuser,t.commentdate,t.fileid,t1.filename 
	   		commentHtml.push('<div id=commentdiv'+comment.itemid+'>');
	   		commentHtml.push('<table border="0"  width="100%"><tr><td><font size=2>'+comment.commentuser+'&nbsp&nbsp&nbsp&nbsp回复于&nbsp&nbsp&nbsp&nbsp'+comment.commentdate+'</font>');
	   		commentHtml.push('</td><td width="65px" align="right" id="button'+comment.itemid+'">');
	   		//新的评论
	   		if(comment.audited==0){
	   			commentHtml.push('<a title="通过" href="javascript:auditsuccess(\''+comment.itemid+'\');" class="success">通   过</a></td><td width="65px" align="right"><a title="不通过" href="javascript:auditfail(\''+comment.itemid+'\');" class="fail">不通过</a>');
	   		//已审核通过的
	   		}else if(comment.audited==1){
	   			commentHtml.push('<a title="已通过" href="javascript:void(0);" class="success">已通过</a></td><td width=40 align="right"><a id="update'+comment.itemid+'"  title="修改" href="javascript:changeComment(\''+comment.itemid+'\',2);"><font size=2>[修改]</font></a></td>');
	   		//已审核未通过的
	   		}else{
	   			commentHtml.push('<a title="已取消" href="javascript:void(0);" class="fail">已取消</a></td><td width=40 align="right"><a id="update'+comment.itemid+'" title="修改" href="javascript:changeComment(\''+comment.itemid+'\',1);"><font size=2>[修改]</font></a></td>');
	   		}
	   		commentHtml.push('</td></tr></table>');
	   		commentHtml.push('<hr style="border:1px dotted #036" />');
	   		commentHtml.push('&nbsp&nbsp&nbsp&nbsp'+comment.content+'</br>');
	   		commentHtml.push('<hr style="border:2px solid #5599ff" />');
	   		commentHtml.push('</div>');
	   	}
	   	var defaultPanel = new Ext.Panel({
			id:"defaultId", 
			width:800,
			frame:true,
			title:'标题： '+question.QUESTIONNAME,
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
			width:800,
			frame:true,
			title:'所有评论',
			autoHeight:true,
			collapsible:true,//显示右上角最小化按钮
			renderTo:'commentId',
			html:commentHtml.join('')
		});
	},function(resp){})
	
	//审核通过
	function auditsuccess(id){
		  if(confirm("确认通过该评论？")){
			  Ext.lt.RCP.script(onlinehelpurl,"auditcomment", "auditsuccess",id,function (resp) {
			  		document.getElementById('commentdiv'+id).style.display="none";
			  		commentSize--;
			  },function(resp){});
		  }
	}
	//审核不通过	
	function auditfail(id){
		 if(confirm("确认取消该评论？")){
			  Ext.lt.RCP.script(onlinehelpurl,"auditcomment", "auditfail",id,function (resp) {
			  		document.getElementById('commentdiv'+id).style.display="none";
			  		commentSize--;
			  },function(resp){});
		  }
	}
	//修改评论审核结果
	function changeComment(itemid,status){
		if(confirm("确认修改吗？")){
			var method = status=="2"?"auditfail":"auditsuccess";
		 	//Ext.lt.RCP.server("auditcomment", method,itemid,function (resp) {
		 	Ext.lt.RCP.script(onlinehelpurl,"auditcomment", method,itemid,function (resp) {
		 		if(status==2){	
		 			document.getElementById('button'+itemid).innerHTML="<a title='已取消' href='javascript:void(0);' class='fail'>已取消</a>";
		 			document.getElementById('update'+itemid).href="javascript:changeComment('"+itemid+"',1)";
		 		}else{
		 			document.getElementById('button'+itemid).innerHTML="<a title='已通过' href='javascript:void(0);' class='success'>已通过</a>";
		 			document.getElementById('update'+itemid).href="javascript:changeComment('"+itemid+"',2)";
		 		}	
			 },function(resp){});
		 }
	}
	function gg(){
		if(commentSize<=0){
			window.opener.location.reload();
		}
	}
  window.onbeforeunload = gg;
</script>
