<%@ page language="java" contentType="text/html; charset=GBK" pageEncoding="GBK"%>
<%@ page import="gov.mof.fasp.ifmis.common.Globals"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<% 
  response.setHeader("Cache-Control","no-cache"); 
  response.setHeader("Pragma","no-cache"); 
  response.setDateHeader("Expires",0); 
  String jpgSize=Globals.IFMIS_JPGSIZE;
%> 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<HTML xmlns="http://www.w3.org/1999/xhtml">
 <HEAD>
<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
<META HTTP-EQUIV="pragma" CONTENT="no-cache"> 
<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache, must-revalidate"> 
<META HTTP-EQUIV="expires" CONTENT="Wed, 26 Feb 1997 08:21:57 GMT">
<script type='text/javascript' src="<%=request.getContextPath()%>/js/jquery-1[1].3.1.js"></script>
<script type='text/javascript' src="<%=request.getContextPath()%>/js/jquery.form.js"></script>

  	
<TITLE>��ѡ���ϴ���ͼƬ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TITLE>
<link href="<%=request.getContextPath()%>/style/default.css" rel="stylesheet" type="text/css" />
 </HEAD>
 <BODY class="pop_body">
	  <form name="fileform" id="fileform" method="post" enctype="multipart/form-data">
		   <div id="popPage">
			     <div id="shenhe_title">
			     	<div id="shenhe_title_middle"></div>
			     </div>
		   		 <div id="pop_inner2">
			   		<CENTER><h2>��ѡ��ͼƬ</h2></CENTER>
			   		<input name="file" type="file" id="file" size ="30" onChange="changeSrc(this);"/>
			   		<input type="button" onclick="imgfileUpload()" value="�ϴ�"/>
			     </div>
		  </div>
	  </form>
 </BODY>
</HTML>
<script type='text/javascript'>
/*�ϴ�֮ǰ��֤��С-start  by jiazhiyu*/
var img = new Image();
function changeSrc(filePicker) {
    img.src = filePicker.value;
}
img.onreadystatechange = function() {
    if (img.readyState == "complete") {
        var sizeLimit = '<%=jpgSize%>';
        if (img.fileSize / 1024 > sizeLimit) {
            alert("�ϴ�ͼƬ̫��ѡ���ͼƬ��С���ܳ�����" + (sizeLimit) + "K");
            JQ("#file").replaceWith("<input name='file' type='file' id='file' size ='30' onChange='changeSrc(this);'/>");
        } else {
        }
    }
}
/*�ϴ�֮ǰ��֤��С-end*/

//ͼƬ�ϴ�����
function imgfileUpload(){
	  var opt = { 
			url:   null,  
			dataType:  'json',        	 // �������ͼƬ�������ļ����ظ����
			beforeSubmit: checktype,
			success:  showResponse 	 // �ύ�ɹ���ķ������ύ��ͼƬ��ʾ��ҳ��
			
	   };
	   
	  var options = JQ.extend(opt,opener.imgoptions);
	  JQ("#fileform").ajaxSubmit(options);
}
//�ϴ�֮ǰ��ʽ��֤
 function checktype()
{
	var file = document.getElementById("file").value;
	if(file=="")
	{
		alert("��ѡ��һ��ͼƬ��");
		return false;
	}
	var imgEndWith = file.substr(file.lastIndexOf("."),file.length); 
	var imgEndWithLower = imgEndWith.toLowerCase() 

	if(!(/^.*?\.(gif|png|jpg|jpeg)$/.test(imgEndWithLower)))
	{
		alert("��ѡ��gif��png��jpg��jpeg��ʽ��ͼƬ��");
		return false;
	}
	return true;
}

//�ϴ��ɹ���
function showResponse(data){
	var imgsrc = data.imageurl;
	opener.document.getElementById(opener.imgid).src = imgsrc;
	img = null;
	window.close();
}


</script>
