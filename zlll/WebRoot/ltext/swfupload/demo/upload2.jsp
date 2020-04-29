<%@ page language="java" import="java.util.*" pageEncoding="gbk"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
  <title>测试文件上传</title>
 <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
<link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=request.getContextPath()%>/style/stylefontS.css" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_LOGO%>_logo.css"/>
<script type="text/javascript" src="<%=basePath%>js/prototype.js"></script>
<script type="text/javascript" src="<%=basePath%>js/jquery-1[1].3.1.js"></script>
<script type="text/javascript" src="<%=basePath%>js/choose.js"></script>
<script type="text/javascript" src="<%=basePath%>/ltext/frameworksupport.js"></script>
<script type="text/javascript" src="<%=basePath%>/ltext/ltext_core.js"></script>
<script type="text/javascript" src="<%=basePath%>js/loadOcx.js"></script>	
<script type="text/javascript" src="<%=basePath%>js/swfupload/fileUpload.js"></script>
<script type="text/javascript" src="<%=basePath%>js/swfupload/swfupload.js"></script>
<script type="text/javascript" src="<%=basePath%>js/swfupload/swfupload.queue.js"></script>
<script type="text/javascript" src="<%=basePath%>js/swfupload/fileprogress.js"></script>
<script type="text/javascript" src="<%=basePath%>js/swfupload/handlers.js"></script>
   <script type="text/javascript">
   var ROOT_PATH = "<%=basePath%>";
		var fpd;
		window.onload = function() {
		var file1 = {
				id: 'file_01',
				name : '上传测试文件',
				GUID : 'C886BE77E25509D5E040A8C0110339A1'
		}
		var file2= {
				id: 'file_06',
				name : '上传测试文件2',
				GUID : 'C886BE77E25609D5E040A8C0110339A1'
		}
		var fileArray = [file1,file2];
		var setting = {
				product : "fasp",
				store : "ifmis_T_pubsystemset@paramcode",
				//file_types :　"*.jpg;*.gif",
				file_types :　"*.*",
				file_size : "100MB",
				resized_width : 260,
				resized_height : 120,
				file_upload_limit : "10",
				enableMultFile : true,
				enableZipFile : true,
				warnlevel : "warn",
				onbeforeupload : dosomething,
				showMark : true,
				autoupload : false,
				drawToHTML : "outcontainer",  //我们内部有一个完整功能的DIV，这个是调用页面自定义的容器DIV
				fileArray  : fileArray,      
				 self_delete : deleteBymyself,       //如果定义fileArray 则这几个文件的删除不使用框架的删除方法，自定义。用于删除文件关联表中的字段
				successcallbackfn : doWhenSuccess,
				failcallbackfn	 :  doWhenFail
			};
			fpd = new Ext.lt.fileupload(setting);
			fpd.draw();
	     }
	function dosomething(file){
		return true;
	}
	function doWhenSuccess(obj){
	}
	function doWhenFail(obj){
		
	}
	function deleteBymyself(id){
		return true;
	}
	
	window.onbeforeunload = function(){
	}
	
	</script>
  </head>
  
  <body class="pop_body">
  <div id="content">
    demo 中 文件上传 到表ifmis_t_uploadfile
  <div id = "outcontainer">
    </div>
   </div>
  </body>
</html>
