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

  	
<TITLE>请选择上传的图片&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TITLE>
<link href="<%=request.getContextPath()%>/style/default.css" rel="stylesheet" type="text/css" />
 </HEAD>
 <BODY class="pop_body">
	  <form name="fileform" id="fileform" method="post" enctype="multipart/form-data">
		   <div id="popPage">
			     <div id="shenhe_title">
			     	<div id="shenhe_title_middle"></div>
			     </div>
		   		 <div id="pop_inner2">
			   		<CENTER><h2>请选择图片</h2></CENTER>
			   		<input name="file" type="file" id="file" size ="30" onChange="changeSrc(this);"/>
			   		<input type="button" onclick="imgfileUpload()" value="上传"/>
			     </div>
		  </div>
	  </form>
 </BODY>
</HTML>
<script type='text/javascript'>
/*上传之前验证大小-start  by jiazhiyu*/
var img = new Image();
function changeSrc(filePicker) {
    img.src = filePicker.value;
}
img.onreadystatechange = function() {
    if (img.readyState == "complete") {
        var sizeLimit = '<%=jpgSize%>';
        if (img.fileSize / 1024 > sizeLimit) {
            alert("上传图片太大，选择的图片大小不能超过：" + (sizeLimit) + "K");
            JQ("#file").replaceWith("<input name='file' type='file' id='file' size ='30' onChange='changeSrc(this);'/>");
        } else {
        }
    }
}
/*上传之前验证大小-end*/

//图片上传方法
function imgfileUpload(){
	  var opt = { 
			url:   null,  
			dataType:  'json',        	 // 将保存的图片流重新文件返回给框架
			beforeSubmit: checktype,
			success:  showResponse 	 // 提交成功后的方法将提交后图片显示在页面
			
	   };
	   
	  var options = JQ.extend(opt,opener.imgoptions);
	  JQ("#fileform").ajaxSubmit(options);
}
//上传之前格式验证
 function checktype()
{
	var file = document.getElementById("file").value;
	if(file=="")
	{
		alert("请选择一张图片！");
		return false;
	}
	var imgEndWith = file.substr(file.lastIndexOf("."),file.length); 
	var imgEndWithLower = imgEndWith.toLowerCase() 

	if(!(/^.*?\.(gif|png|jpg|jpeg)$/.test(imgEndWithLower)))
	{
		alert("请选择gif、png、jpg、jpeg格式的图片！");
		return false;
	}
	return true;
}

//上传成功后
function showResponse(data){
	var imgsrc = data.imageurl;
	opener.document.getElementById(opener.imgid).src = imgsrc;
	img = null;
	window.close();
}


</script>
