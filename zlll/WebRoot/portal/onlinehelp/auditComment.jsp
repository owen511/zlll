<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
//�洢����ķ����ַ
String onlinehelpurl=(String)request.getSession().getAttribute("onlinehelpurl");
//�������
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
    <title>�������</title>
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
	//��������
	var commentSize = 0;
	//����id	
    var id = '<%=id%>';
    //��ʶ��ʾ���µ����ۻ�����˹�������
    var flag = '<%=flag%>';
    var config = {};
    config.id = id;
    config.flag = flag;
    //��ѯ��������������ۺ͸��������ϸ��Ϣ
    Ext.lt.RCP.script(onlinehelpurl,"auditcomment", "findComments",config,function (resp) {
	    //��������
	    var commentList = resp.commentList;
	    //������Ϣ
	    var question = (resp.question)[0];
	    var html = [];	
	    var answerhtml = [];	
	    var commentHtml = [];
	    html.push('<font size=2>'+question.QUESTIONUSER+'&nbsp&nbsp&nbsp&nbsp������&nbsp&nbsp&nbsp&nbsp'+question.QUESTIONDATE+'</font>');
   		html.push('<hr style="border:1px dotted #036" />');
   		html.push('&nbsp&nbsp&nbsp&nbsp'+question.QUESTIONCONTENT);
	   	answerhtml.push('<font size=2>'+question.ANSWERUSER+'&nbsp&nbsp&nbsp&nbsp����&nbsp&nbsp&nbsp&nbsp'+question.ANSWERDATE+'</font>');
   		answerhtml.push('<hr style="border:1px dotted #036" />');
   		answerhtml.push('&nbsp&nbsp&nbsp&nbsp'+question.ANSWERCONTENT);
   		commentSize=commentList.length;
	   	for(var i = 0;i <commentList.length;i ++){
	   		var comment = commentList[i];//t.content,t.commentuser,t.commentdate,t.fileid,t1.filename 
	   		commentHtml.push('<div id=commentdiv'+comment.itemid+'>');
	   		commentHtml.push('<table border="0"  width="100%"><tr><td><font size=2>'+comment.commentuser+'&nbsp&nbsp&nbsp&nbsp�ظ���&nbsp&nbsp&nbsp&nbsp'+comment.commentdate+'</font>');
	   		commentHtml.push('</td><td width="65px" align="right" id="button'+comment.itemid+'">');
	   		//�µ�����
	   		if(comment.audited==0){
	   			commentHtml.push('<a title="ͨ��" href="javascript:auditsuccess(\''+comment.itemid+'\');" class="success">ͨ   ��</a></td><td width="65px" align="right"><a title="��ͨ��" href="javascript:auditfail(\''+comment.itemid+'\');" class="fail">��ͨ��</a>');
	   		//�����ͨ����
	   		}else if(comment.audited==1){
	   			commentHtml.push('<a title="��ͨ��" href="javascript:void(0);" class="success">��ͨ��</a></td><td width=40 align="right"><a id="update'+comment.itemid+'"  title="�޸�" href="javascript:changeComment(\''+comment.itemid+'\',2);"><font size=2>[�޸�]</font></a></td>');
	   		//�����δͨ����
	   		}else{
	   			commentHtml.push('<a title="��ȡ��" href="javascript:void(0);" class="fail">��ȡ��</a></td><td width=40 align="right"><a id="update'+comment.itemid+'" title="�޸�" href="javascript:changeComment(\''+comment.itemid+'\',1);"><font size=2>[�޸�]</font></a></td>');
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
			title:'���⣺ '+question.QUESTIONNAME,
			autoHeight:true,
			collapsible:true,//��ʾ���Ͻ���С����ť
			renderTo:'newId',
			html:html.join('')
		});
		var answerPanel = new Ext.Panel({
			id:"answerPanel", 
			width:800,
			frame:true,
			title:'����Ϣ',
			autoHeight:true,
			renderTo:'answerid',
			collapsible:true,//��ʾ���Ͻ���С����ť
			html:answerhtml.join('')
		});
		var commentpanel = new Ext.Panel({
			id:"commentpanel", 
			width:800,
			frame:true,
			title:'��������',
			autoHeight:true,
			collapsible:true,//��ʾ���Ͻ���С����ť
			renderTo:'commentId',
			html:commentHtml.join('')
		});
	},function(resp){})
	
	//���ͨ��
	function auditsuccess(id){
		  if(confirm("ȷ��ͨ�������ۣ�")){
			  Ext.lt.RCP.script(onlinehelpurl,"auditcomment", "auditsuccess",id,function (resp) {
			  		document.getElementById('commentdiv'+id).style.display="none";
			  		commentSize--;
			  },function(resp){});
		  }
	}
	//��˲�ͨ��	
	function auditfail(id){
		 if(confirm("ȷ��ȡ�������ۣ�")){
			  Ext.lt.RCP.script(onlinehelpurl,"auditcomment", "auditfail",id,function (resp) {
			  		document.getElementById('commentdiv'+id).style.display="none";
			  		commentSize--;
			  },function(resp){});
		  }
	}
	//�޸�������˽��
	function changeComment(itemid,status){
		if(confirm("ȷ���޸���")){
			var method = status=="2"?"auditfail":"auditsuccess";
		 	//Ext.lt.RCP.server("auditcomment", method,itemid,function (resp) {
		 	Ext.lt.RCP.script(onlinehelpurl,"auditcomment", method,itemid,function (resp) {
		 		if(status==2){	
		 			document.getElementById('button'+itemid).innerHTML="<a title='��ȡ��' href='javascript:void(0);' class='fail'>��ȡ��</a>";
		 			document.getElementById('update'+itemid).href="javascript:changeComment('"+itemid+"',1)";
		 		}else{
		 			document.getElementById('button'+itemid).innerHTML="<a title='��ͨ��' href='javascript:void(0);' class='success'>��ͨ��</a>";
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
