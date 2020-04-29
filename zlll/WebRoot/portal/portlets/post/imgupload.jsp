<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>

<html>
  <head>
    
    <title>上传图片</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->

  </head>
  <%
  	request.getAttribute("vvv");
  	String value="";
  	if(null!=request.getAttribute("vvv")){
  		value=(String)request.getAttribute("vvv");
  	}
   %>
   <script type="text/javascript">
   		//上传图片的js
   		function uploadimg(){
   			var typeFlag = false;
   			var fileType = document.getElementById('fileupload').value.split(".");
   			var totleType = "jpg,bmp,png,gif".split(",");
   			for(var i=0;i<totleType.length;i++){
   				if(fileType[fileType.length-1] == totleType[i]){
		        	typeFlag = true;
		        	break;
		    	}
   			}
   			if (!typeFlag){
		    	alert("附件类型只能支持（jpg,bmp,png,gif）类型！");
		    	return false;
			}
			document.getElementById('detailform').submit();
   		}
   </script>
  <body>
  <br> <br>
   <form action ='<%=request.getContextPath()%>/common/post/uploadImgFile.do' method='post' ENCTYPE='multipart/form-data' id='detailform' target='smz'>
   		<iframe name="smz" width="0" height="0" frameborder="0"style="display: none"></iframe>
   		<table width="100%" border="1" cellspacing="0" cellpadding="0">

              <tr>

                  <td width="30%" align="right">

                     <font color="red">*</font>上传图片文件

                  </td>

                  <td width="20%">

                     <s:file name="myFile"></s:file>
                     <input type="file" name="fileupload" id="fileupload"/>
              </tr>
           </table>
               &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <input type="button" value="上传" onclick="uploadimg()" style="width:80px;background-image: url(<%=request.getContextPath()%>/ifmis_images/bg/button_bg.gif);border: 1px solid #003c74;color: #000000;height: 20px;padding-top: 2px;margin-left: 5px;margin-right: 10px;" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/>
                     <input type="button" value="取消" onclick="window.close()" style="width:80px;background-image: url(<%=request.getContextPath()%>/ifmis_images/bg/button_bg.gif);border: 1px solid #003c74;color: #000000;height: 20px;padding-top: 2px;margin-left: 5px;margin-right: 10px;" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/>
           <input type="hidden" name="pagePath" id="_page_path" value="<%=value%>"/>
   </form>
  </body>
  <script type="text/javascript">

    var _page_path = document.getElementById("_page_path").value;


    if(null!=_page_path  && ""!=_page_path){
		
       window.returnValue='<%=request.getContextPath()%>/postimage.do?path='+_page_path;

       window.close();

    }

  </script>
</html>
