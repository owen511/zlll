<%@ page language="java" import="java.util.*" pageEncoding="GB18030"%>
<%@ page import="gov.mof.fasp.ifmis.portal.portalmanage.userprogramset.dto.VMenu" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
  <script type="text/javascript" src="<%=basePath%>/js/ua.js"></script>


  <script type="text/javascript" src="<%=basePath%>/js/choose.js"></script>
  <script type="text/javascript" src="<%=basePath%>/js/jquery-1[1].3.1.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/ltext_core.js"></script>

  <script type="text/javascript" src="<%=basePath%>/js/template.js"></script>
  <script type="text/javascript" src="<%=basePath%>/js/scripts/jsframework.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/scripts/system/data/mzdata.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/scripts/system/web/forms/mzeffect.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/scripts/system/web/ui/webcontrols/mztreeview.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/prototype.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/jquery-1[1].3.1.js"></script>	
<script type="text/javascript" src="<%=basePath%>/js/jquery.md5.js"></script>	
<script type="text/javascript" src="<%=basePath%>/js/jquery.editable-select.js"></script>	
<script type="text/javascript" src="<%=basePath%>/js/choose.js"></script>

 
<script type="text/javascript" src="<%=basePath%>/js/datatable.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/export.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/tbajax.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/template.js"></script>
<script type="text/javascript" src="<%=basePath%>/ltext/ltext_core.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/loadOcx.js"></script>


  
    <base href="<%=basePath%>">
    
    <title>ҵ������ַ����</title>
    
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
		
		/*��������ҳ��ʽ������ϵͳ��*/
.peizhi_table tr{ height:35px; line-height:35px; font-size:14px; color:#333;}
.peizhi_table tr button{ line-height:23px; height:23px; border:0; width:50px; background-image:url(../images/bg/peizhi_btn.gif); background-repeat:repeat-x; background-position:left center; border:1px #3059A8 solid;}
.kuang_bg{z-index:10; position:absolute; background:#B1BDDA; height:396px; width:626px;filter:alpha(opacity=60);-moz-opacity:0.6;}
.kuang_main{z-index:1000; position:absolute; background:#FFF; height:370px; width:600px;  margin-left:20px;margin-top:20px;margin-bottom:-10px; background-image:url(../images/bg/heilongjiang_daiban.gif); background-position:center center; background-repeat:repeat-x; background-attachment:fixed; text-align:center; border:5px #3C64B5 double;}
.kuang_title{color:#3059A8; text-align:center; font-size:25px; font-weight:bold; height:80px; line-height:80px; border-bottom:1px #B3B3B3 inset;margin-left:30px; margin-right:30px; margin-bottom:30px; margin-top:10px;}

   </style>
  </head>
  
  <body style ="background:#B1BDDA;">
  <div id="default_center" style ="background:#B1BDDA;">
<div id="kuang">
<div class="kuang_bg"></div>
<div class="kuang_main">
<p class="kuang_title">����ָ��ҵ������ַ</p>

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
		row = row+"<td nowrap='nowrap'><button onclick='regedit("+v1.getTjhqprogram()+",\""+v1.getSign()+"\")'>ȷ��</button></td>";
		row = row+"</tr>";
		row = row+"<tr>";
		row = row+"<td nowrap='nowrap' width='170' align='left'>Ĭ��·����</td>"; 
        row = row+"<td nowrap='nowrap' width='60%' align='left'><input type='text' style='height:19px;' readonly size='30' value='"+initpath+"'></td>"; 
		row = row+"<td nowrap='nowrap'></td>";
		row = row+"</tr>";  
		%>
	<%=row %>
  	<%}%>
 
  	  
</table>


</div>
<div>
<p align="right"><input name="submit3" type="button" value="����" onclick="cancel()" /></p>
</div>
</div>
</div>  


<script>
  //begin ���޺� 2012.11.5 ҵ������ַ����ӷ��ذ�ť
function cancel(){
window.close();
}
//end ���޺� 2012.11.5 ҵ������ַ����ӷ��ذ�ť
</script>
<script>
//begin ���޺� 2012.12.06 ҵ������ַ��Ϊ����������appcaller����
function loadAppcaller(){
	Ext.lt.ifmis.activex.loadAppCallerOcx();
}
//end ���޺� 2012.12.06 ҵ������ַ��Ϊ����������appcaller����
function regedit(programtype,sign){
  	
      var value = document.getElementById(sign).value;
      if(value.trim()==''){
           alert("��ѡ���ַ!");
           return;
      }
        //�ж��Ƿ��ǻ���Ԥ����Ƶ�λ��(efmdiv)�����������λ��(dfczdiv)      
        if(1==programtype && sign!='efmdiv' && sign!='dfczdiv'){
        var i = value.lastIndexOf("\\");
        t = value.split("\\");
        var location = '';
	        for(i=0;i<t.size()-2;i++){
	            location = location + t[i] +"\\"
	        }
	        loadAppcaller();
            AppCaller.registryExeApp(sign,value,location);
            alert('�����ɹ�');
      }else{
      		loadAppcaller();
            AppCaller.registryExeApp(sign,value,'');
            alert('�����ɹ�');
      }
  }
  	</script>
  </body>
</html>
