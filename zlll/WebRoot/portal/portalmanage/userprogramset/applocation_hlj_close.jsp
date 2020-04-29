<%@ page language="java" import="java.util.*" pageEncoding="GB18030"%>
<%@ page import="gov.mof.fasp.ifmis.portal.portalmanage.userprogramset.dto.VMenu" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'applocation.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<style>
        .pp{
	    width:40%;
	    float:left;
	    padding-left:3%;
	    padding-right:3%;
        }
        .fontcolor   {color:#000000}
        .sngPst {
			FONT-SIZE: 12px; COLOR: #000; LINE-HEIGHT: 15px
		}
		.divline{
			BORDER-BOTTOM: #8BA3DA 1px dotted;
		}
		
		/*黑龙江首页样式（接入系统）*/
.peizhi_table tr{ height:35px; line-height:35px; font-size:14px; color:#333;}
.peizhi_table tr button{ line-height:23px; height:23px; border:0; width:50px; background-image:url(../images/bg/peizhi_btn.gif); background-repeat:repeat-x; background-position:left center; border:1px #3059A8 solid;}
.kuang_bg{z-index:10; position:absolute; background:#B1BDDA; height:396px; width:626px;filter:alpha(opacity=60);-moz-opacity:0.6;}
.kuang_main{z-index:100; position:absolute; background:#FFF; height:370px; width:600px; margin:10px; background-image:url(../images/bg/heilongjiang_daiban.gif); background-position:center center; background-repeat:repeat-x; background-attachment:fixed; text-align:center; border:3px #3C64B5 double;}
.kuang_title{color:#3059A8; text-align:center; font-size:25px; font-weight:bold; height:80px; line-height:80px; border-bottom:1px #B3B3B3 inset;margin-left:30px; margin-right:30px; margin-bottom:30px; margin-top:10px;}
.kuang_close{color:#3059A8; text-align:right; font-size:10px; height:15px; line-height:15pxpx;margin-left:30px; margin-right:30px; margin-bottom:0px; margin-top:10px;}
   </style>
  </head>
  
  <body>
  <div id="default_center">
<div id="kuang">
<div class="kuang_bg"></div>
<div class="kuang_main">
<p class="kuang_close"><a href="/common/index.do"><img src="/images/actions/exit.gif"/></a></p>
<p class="kuang_title">重新指定业务程序地址</p>

<div style="overflow-y:auto; height:190px;">
<table border="0" width="88%" class="peizhi_table" height="190px" >
<%
     List v=(List)request.getAttribute("menus");   
     for(int i = 0;i<=v.size()-1;i++){
     	String initpath = "";
     	String row ="<tr>";  
  		VMenu v1=(VMenu)v.get(i);
  		if(v1.getInitialpath()!=null && !v1.getInitialpath().equals("") &&!v1.getInitialpath().equals("null")){
  			initpath =v1.getInitialpath();
     	}
		row = row+"<td nowrap='nowrap' width='170' align='left'>"+v1.getName()+"</td>"; 
        row = row+"<td nowrap='nowrap' width='60%' align='left'><input type='file' style='height:23px;' size='30' id='"+v1.getSign()+"'/></td>"; 
		row = row+"<td nowrap='nowrap'><button onclick='regedit("+v1.getTjhqprogram()+",\""+v1.getSign()+"\")'>确定</button></td>";
		row = row+"</tr>";
		row = row+"<tr>";
		row = row+"<td nowrap='nowrap' width='170' align='left'>默认路径：</td>"; 
        row = row+"<td nowrap='nowrap' width='60%' align='left'><input type='text' style='height:19px;' readonly size='30' value='"+initpath+"'></td>"; 
		row = row+"<td nowrap='nowrap'></td>";
		row = row+"</tr>";  %>
	<%=row %>
  	<%}%>
</table>
</div>

</div>
</div>
</div>  
  <div><p align="center"></p></div>
<script>
var kuang = document.getElementById("kuang");
var topPartH = document.getElementById("window_top").offsetHeight;
//var allH = window.screen.height;
//var allW = window.screen.Width;
var allH = document.body.clientHeight;
var allW = document.body.clientWidth;
kuang.style.marginLeft = (allW - 626)/2 - 50;
kuang.style.marginTop = (allH - 396)/2 - topPartH + 80;

function positionAt(){
var kuang = document.getElementById("kuang");
var topPartH = document.getElementById("window_top").offsetHeight;
//var allH = window.screen.height;
//var allW = window.screen.Width;
var allH = document.body.clientHeight;
var allW = document.body.clientWidth;
kuang.style.marginLeft = (allW - 626)/2 - 50;
kuang.style.marginTop = (allH - 396)/2 - topPartH + 80;
}
window.onresize = positionAt;
</script>
       
</div>
  <!-- InstanceEndEditable -->
  
  	
  	<script>
  	function regedit(programtype,sign){
      var value = document.getElementById(sign).value;
      if(value.trim()==''){
            alert("请选择地址!");
            return;
      }
        //判断是否是华清预算编制单位版(efmdiv)或财政供养单位版(dfczdiv)      
        if(1==programtype && sign!='efmdiv' && sign!='dfczdiv'){
        var i = value.lastIndexOf("\\");
        t = value.split("\\");
        var location = '';
	        for(i=0;i<t.size()-2;i++){
	            location = location + t[i] +"\\"
	        }
            AppCaller.registryExeApp(sign,value,location);
            alert('操作成功');
      }else{
      
            AppCaller.registryExeApp(sign,value,'');
            alert('操作成功');
      }
  }
  	</script>
  </body>
</html>
