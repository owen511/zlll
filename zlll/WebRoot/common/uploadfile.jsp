<%@ page language="java" contentType="text/html; charset=GBK" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<% 
  response.setHeader("Cache-Control","no-cache"); 
  response.setHeader("Pragma","no-cache"); 
  response.setDateHeader("Expires",0); 
%> 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<HTML xmlns="http://www.w3.org/1999/xhtml">
 <HEAD>
<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
<META HTTP-EQUIV="pragma" CONTENT="no-cache"> 
<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache, must-revalidate"> 
<META HTTP-EQUIV="expires" CONTENT="Wed, 26 Feb 1997 08:21:57 GMT">
  <STYLE>
    
    TD {
      height: 18px;
      font-size: 10pt; 
      font-family: verdana,helvetica; 
      text-decoration: none;
      white-space:nowrap;}
      
    A {
      text-decoration: none;
      color: black;}
  </STYLE>

<script>
var outHTML ='<%=request.getAttribute("outHTML") %>';
if(outHTML !=null && outHTML != "null"){
	eval(outHTML);
}

var returnJSON ;
//У���ϴ��ļ���չ��
function checkFile(){   
  	if($('fileform').importexcel.value=="") {   
		alert("��ѡ���ļ�!!");   
		return false;   
  	}   
    
	var typeValue = $('fileform').importexcel.value; 
	var type = typeValue.substring(typeValue.lastIndexOf("\\")+1,typeValue.length);   
    type = type.substring(type.lastIndexOf("\.")+1,type.length)   
    if(type.toUpperCase()=="XLS" || type.toUpperCase()=="CSV"){   
		//alert("ok");   
		return true;   
	} else {   
		alert("�����ļ��Ƿ���ȷ!");   
		return false;   
	}   
}
//window.resizeTo(400, 350);

</script>
  <script type='text/javascript' src="<%=request.getContextPath()%>/js/prototype.js"></script>
  <script type='text/javascript' src='<%=request.getContextPath()%>/js/zapatec.js'></script>
  <SCRIPT type='text/javascript' src="<%=request.getContextPath()%>/js/tree.js"></SCRIPT>

  	
  <TITLE>��ѡ���ϴ����ļ�&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TITLE>
<link href="<%=request.getContextPath()%>/style/default.css" rel="stylesheet" type="text/css" />
 </HEAD>
 <BODY class="pop_body">
  <form name="fileform" id="fileform" action="<%=request.getContextPath()%><%=request.getParameter("action") %>" method="post" enctype="multipart/form-data">
   <div id="popPage">
     <div id="shenhe_title">
     	<div id="shenhe_title_middle"></div>
     </div>
   <div id="pop_inner2">
   		<CENTER><h2>��ѡ��EXCEL�ļ�</h2></CENTER><br/><br/>
   		<label for="file"></label><input name="importexcel" type="file" id="importexcel" size ="40"/>
   </div>
   <div id="pop_button">
   <CENTER><INPUT name ="save" type="button" value="ȷ��" onclick="upload()" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/>&nbsp;&nbsp;&nbsp;<INPUT type="button" onclick="javascript:closeWindow(false)" value="ȡ��" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/></CENTER>
  </div>
  </div>
  </form>
 </BODY>

</HTML>
<script>
function upload(){
	if(checkFile()){
		$('fileform').submit();
		$("save").disabled = true;
	}

}



function closeWindow(isReturn){
	if(returnJSON !="" && returnJSON != null){
		window.returnValue = returnJSON;
	}
	else{
		window.returnValue = null;
	}
	window.close();
}


</script>
