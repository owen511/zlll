<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <title></title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	

  </head>
  <%

  	List list =(List)request.getAttribute("publicListInforTanChu");
  	if(null!=list && list.size()==0){
  %>
  <script type="text/javascript">
  	window.close(); 
  </script>
  <%		
  	}
  	int maxnum = list.size();
  	int minnum=1;
  %>
  <script type="text/javascript">
  	var maxnum = <%=maxnum%>;
  	var minnum = <%=minnum%>;
  	var list = new Array();
  	var prenum=1;
  	var flag=false;
  	//下一页的判断
  	function nextPage(){
  		prenum=prenum+1;
  		if(prenum<maxnum && prenum!=1){
  			document.getElementById('nextbutton').disabled=false;
  			document.getElementById('upbutton').disabled=false;
  			document.getElementById('closewid').disabled=true;
  			document.getElementById('showpre').innerText=prenum;
  		}else if(prenum==maxnum){
  			document.getElementById('nextbutton').disabled=true;
  			document.getElementById('upbutton').disabled=false;
  			document.getElementById('closewid').disabled=false;
  			prenum=maxnum;
  			document.getElementById('showpre').innerText=prenum;
  			flag=true;
  		}
  		if(flag==true){
  			document.getElementById('closewid').disabled=false;
  		}
  		var id= list[prenum-1];
  		document.getElementById('public_frame').src="<%=basePath%>/common/post/showload.do?id="+id;
  	}
  	//上一也的判断
  	function upPage(){
  		prenum=prenum-1;
  		if(prenum<maxnum && prenum!=1){
  			document.getElementById('nextbutton').disabled=false;
  			document.getElementById('upbutton').disabled=false;
  			document.getElementById('showpre').innerText=prenum;
  			document.getElementById('showpre').innerText=prenum;
  			document.getElementById('closewid').disabled=true;
  		}else if(prenum<maxnum && prenum==1){
  			document.getElementById('nextbutton').disabled=false;
  			document.getElementById('upbutton').disabled=true;
  			prenum=1;
  			document.getElementById('showpre').innerText=prenum;
  			document.getElementById('closewid').disabled=true;
  		}
  		if(flag==true){
  			document.getElementById('closewid').disabled=false;
  		}
  		var id= list[prenum-1];
  		document.getElementById('public_frame').src="<%=basePath%>/common/post/showload.do?id="+id;
  	}
  	//关闭窗体
  	function colsewindows(){
  		window.close(); 
  	}
  </script>
  <body   onblur= "this.focus() "> 
    <div><iframe src="" name="public_frame" id="public_frame" marginwidth=0 marginheight=0 width=100% height=600 frameborder=1></iframe></div>
    <div style="width:100%; text-align:center">
    	
    	当前第<span id="showpre">页</span>/总页数：<span id="showMaxPage"> </span><input type="button" value="下一页" onclick="nextPage()" id="nextbutton"/><input type="button" value="上一页" onclick="upPage()" id="upbutton"/>
    	<input type="button" id="closewid" disabled='true' value="关闭" onclick='window.close()'/>
    </div>
  </body>
</html>
<script type="text/javascript">

function loadpage(){
  		//alert(document.getElementById('showpre'));
  		document.getElementById('showpre').innerText=1;
  		document.getElementById('showMaxPage').innerText=maxnum;
  		if(maxnum==1){
  			document.getElementById('closewid').disabled=false;
  			document.getElementById('nextbutton').disabled=true;
  			document.getElementById('upbutton').disabled=true;
  		}else{
  			document.getElementById('closewid').disabled=true;
  			document.getElementById('upbutton').disabled=true;
  		}
  		<%
  			for(int i=0;i<list.size();i++){
  				gov.mof.fasp.ifmis.portal.portlets.post.PostCauserDTO postCauserDTO = (gov.mof.fasp.ifmis.portal.portlets.post.PostCauserDTO)list.get(i);
  				
  		%>
  			list.push('<%=postCauserDTO.getPublicId()%>');
  		<%
  		}
  		%>
  		document.getElementById('public_frame').src="<%=basePath%>/common/post/showload.do?id="+list[0];
  	}
  	window.load=loadpage();
  	window.onbeforeunload = function()     
     {   
       var n = window.event.screenX - window.screenLeft;   
       var b = n > document.documentElement.scrollWidth-20;   
       if(b && window.event.clientY < 0 || window.event.altKey)   
       {   
       		if(document.getElementById('closewid').disabled==true){
       			 return ;  
       		}else{
       		 return ;  
       		}
           
       }else{
       	return false;
       }
       //return false;  
    }
</script>
