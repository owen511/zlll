<%@ page language="java" contentType="text/html; charset=GBK" pageEncoding="GBK"%>
<%@ page import="gov.mof.framework.util.DBUtil"%>
<%@ page import="gov.mof.fasp.systemset.dto.SystemSetDTO"%>
<%@ page import="gov.mof.fasp.systemset.bpo.ISystemSetService"%>
<%
  response.setHeader("Cache-Control","no-cache"); 
  response.setHeader("Pragma","no-cache"); 
  response.setDateHeader("Expires",0); 
  String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
	String errorMsg = (String)request.getParameter("errorMessage");
	if(errorMsg==null||"null".equals(errorMsg)){
		errorMsg="";
	}
	ISystemSetService systemSetService = (ISystemSetService) DBUtil.getBeanByName("fasp.systemset.systemSetBPO");
	boolean ukeycheck = false;
	try{
		SystemSetDTO systemSetDTO = systemSetService.findSystemSetByCode("common_ca_ukey");
		if(systemSetDTO!=null){
			ukeycheck = ("1".equals(systemSetDTO.getParamdata()));
		}
	}catch(Exception e){}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />

<%if(ukeycheck){%>
<object  id="ocxukey" classid="clsid:CC9AB409-D49F-4574-B07C-DD316E3114AD"  style="display:none">
</object>
<%}%>
<object classid="clsid:707C7D52-85A8-4584-8954-573EFCE77488"
	id="JITDSignOcx" width="0" codebase="<%=basePath%>/JITDSign.cab#version=2,0,24,13"></object>

<title>厦门市财政信息系统</title>
<script type="text/javascript">
var _ROOT_PATH_='<%=basePath%>';
</script>
  <link rel="stylesheet" type="text/css" href="<%=basePath%>/ltext/style/ext-all.css"/> 
  <link rel="stylesheet" type="text/css" href="<%=basePath%>/ltext/datatabletheme.css"/>
  <script type="text/javascript" src="<%=basePath%>/ltext/frameworksupport.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/ltext_core.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/ltext_template.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/ltext_portal.js"></script>
  <script type="text/javascript" src="<%=basePath%>/js/template.js"></script>
<style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
}
.content{ margin:auto; width:984px;}
.main{ margin:auto;width:984px;}
.header{ float:left; width:374px; height:112px;}
.title{ float:left; width:678px; height:88px; margin-left:206px;}
*html .title{ float:left; width:678px; height:88px; margin-left:103px;}
.main01{ float:left; width:441px; height:254px; background-image:url(images/bg02.jpg); margin-top:35px;}
.main02{ float:left; width:441px; height:254px; background-image:url(images/bg03.jpg);}
*html .main02{ float:left; width:441px; height:254px;background-image:url(images/bg03.jpg);}
.input01{ float:left; width:318px; margin-left:123px; margin-top:108px;}
*html .input01{ float:left; width:318px; margin-left:61px; margin-top:108px;}
.input02{ float:left; width:157px; height:62px;}
.input03{ float:left; width:157px;}
.input04{ float:left; width:157px; margin-top:20px;}
.input05{ width:157px; padding:0px; margin:0px; border:1px #FFFFFF solid; height:18px; line-height:18px; padding-left:2px;}
.input05_1{ width:153px; padding:0px; margin:0px; border:0px; height:24px; line-height:24px; background-image:url

(images/input02.jpg); padding-left:6px;}
.input06{ float:left; width:77px; height:77px; margin-left:32px;}
*html .input06{ float:left; width:77px; height:77px; margin-left:16px;}
.input07{ float:left; width:260px; height:77px; margin-left:133px; margin-top:103px;}
*html .input07{ float:left; width:260px; height:77px; margin-left:66px; margin-top:103px;}
.input08{ float:left; width:156px; margin-top:25px;}
.input09{ float:left; width:77px; height:77px; margin-left:22px;}
*html .input09{ float:left; width:77px; height:77px; margin-left:11px;}
.input10{ width:156px;}

.xz01{ float:left; width:71px; height:17px; margin-top:32px; margin-left:350px;}
*html .xz01{ float:left; width:71px; height:17px; margin-top:32px; margin-left:175px;}
.xz02{ float:left; width:71px; height:17px; margin-top:35px; margin-left:350px;}
*html .xz02{ float:left; width:71px; height:17px; margin-top:35px; margin-left:175px;}

-->
</style>
<script type="text/javascript">
<!--
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
//-->
</script>
<script src="Scripts/AC_RunActiveContent.js" type="text/javascript"></script>
</head>
<body onload="MM_preloadImages('images/dl02.jpg','images/xz02.jpg')">
       <div class="main02">
            <div class="input07">
           	    <div class="input08"><select name="year" id="year" class="input10"></select></div>
                <div class="input09"><a href="#" onclick="doDataProcess()" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('Image5','','images/lz02.jpg',1)">
                	 <img src="images/lz01.jpg" name="Image5" width="77" height="77" border="0" id="Image5" /></a>
                </div>
                <div style="width:440px;float:left; margin-left:-77px;" id=''><font color="red"  id="errorMessage"><%=errorMsg %></font></div>
            </div>
            <div class="xz02"><a id="xmxzkj" href="#" onclick="" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('Image6','','images/xz02.jpg',1)" >
				     <img src="images/xz01.jpg" name="Image6" width="71" height="17" border="0" id="Image6" /></a>
		    </div>
       </div>
        <form id="multiAreaForm" name="multiAreaForm" method="post" target="_parent" action="">
			<!--用户编码  -->
			<input type="hidden" id="username" name="username"/>
			<!--财政年度-->
			<input type="hidden" id="year" name="year"/>
			<!-- //密码 -->
			<input type="hidden" id="password" name="password"/>
			<!-- //地区标识 -->
			<input type="hidden" id="area" name="area"/>
			 <input type="hidden" id="area_name" name="area_name"/>
			<!--//用于控制菜单宽度-->
			<input type="hidden" id="screenwidth" name="screenwidth"/>
			<!--//主服务地址，用户控制退出系统操作-->
			<input type="hidden" id="mainUrl" name="mainUrl"/>
			<!--//CA认证信息-->
		    <input type="hidden" id="signed_data" name="signed_data"/>
			<!--//CA认证随机数信息-->
			 <input type="hidden" id="DSign_Content" name="DSign_Content"/>
			</form>
</body>
<script type="text/javascript">
   //CA证书产生随机数
   var DSign_Content = "";
   //登录参数信息
   var para_login = new Object();
   var config = {};
    //屏幕宽度
	para_login.screenwidth = String(window.screen.width);
	//获取字体大小设置信息
	para_login.fontsize = getFont("ifmisfont");
	if (para_login.fontsize != null && para_login.fontsize != "") {
		if (para_login.fontsize == "l") {
			para_login.fontFile = "stylefontL.css";
		} else {
			if (para_login.fontsize == "m") {
				para_login.fontFile = "stylefontM.css";
			} else {
				para_login.fontFile = "stylefontS.css";
			}
		}
	} else {
		para_login.fontFile = "stylefontS.css";
	}
   Ext.lt.RCP.server('defaultcommonloginservice', "getLoginYears", config, function (resp) {
  		DSign_Content=resp.DSign_Content
 		document.getElementById("xmxzkj").onclick=function onclick(){exe(resp.jdcontrolURL)};
 		var obj=document.getElementById('year');
		obj.innerHTML="";
		//遍历地区列表信息填充到地区下拉框对象中
		for (var i = 0; i < resp.loginaCctyear.length; i++) {
		    //创建下拉信息对象
			var opt=document.createElement('option');
			opt.value=resp.loginaCctyear[i].all;
			opt.innerText=resp.loginaCctyear[i].acctmainbodyname;
			//把下拉信息对象追加到下拉列表对象中
			obj.appendChild(opt);
		}
  });
/**
* 根据原文和证书产生认证数据包    （处理CA登录）
*/
function doDataProcess() { 
	<%if(ukeycheck){%>
		if(ocxukey!=null&&!("MOF_WaitForDeviceEvent" in ocxukey)){
			if(window.confirm("系统UKEY插件已升级，请确认安装！")){
				window.location.replace(_ROOT_PATH_+"/common/xm/ifmis_plugins.exe");
				return;
			}
		}
	<%}%>
	var DSign_Subject = "";
	if (DSign_Content == "") {
		alert("原文不能为空，请输入原文!");
	} else {
		//控制证书为一个时，不弹出证书选择框
		JITDSignOcx.SetCertChooseType(1);
		JITDSignOcx.SetCert("SC", "", "", "", "CN=Private Certificate Authority Of MOF, O=MOF, C=CN", "");
		if (JITDSignOcx.GetErrorCode() != 0) {
			alert("\u9519\u8bef\u4fe1\u606f\uff1a" + JITDSignOcx.GetErrorMessage(JITDSignOcx.GetErrorCode()));
			return false;
		} else {
			var temp_DSign_Result = JITDSignOcx.DetachSignStr(DSign_Subject, DSign_Content);
			if (JITDSignOcx.GetErrorCode() != 0) {
				alert("\u9519\u8bef\u4fe1\u606f\uff1a" + JITDSignOcx.GetErrorMessage(JITDSignOcx.GetErrorCode()));
				return false;
			}
			//如果Get请求，需要放开下面注释部分
			//	 while(temp_DSign_Result.indexOf('+')!=-1) {
			//		 temp_DSign_Result=temp_DSign_Result.replace("+","%2B");
			//	 }
			//CA认证信息
			para_login.signed_data = temp_DSign_Result;
			//CA随机数
			para_login.DSign_Content = DSign_Content;
			//获取年度及地区财政信息
			if (document.getElementById('year') != null) {
				para_login.year = document.getElementById('year').value;
			} else {
				para_login.loginacctyear = document.forms[0].loginacctyear.value;
				para_login.logingovid = document.forms[0].logingovid.value;
			}
		}
	}
	//处理CA登录
	Ext.lt.RCP.server('defaultcommonloginservice', "calogin", para_login , function (resp) {
		if (resp.errorMessage=="true") {
			   window.parent.location.href=_ROOT_PATH_ + "/defaultcommon.page";
		//多地区跳转
		}else if (resp.httpUrl != null){
		    var multiAreaForm = document.getElementById("multiAreaForm");
		    //表单提交地址
		    multiAreaForm.action = resp.httpUrl;
	        //地区标识 
	        if(document.forms[0].area!=null){
		        multiAreaForm.area.value = document.forms[0].area.value;
	        }
			//财政年度
			//宁夏，如果多地区跳转没有配置年度则使用主服务选中年度
			if (resp.year != null){
			    multiAreaForm.year.value = resp.year;
			}else {
			    multiAreaForm.year.value = document.forms[0].year.value;
			}
			//CA认证信息
			multiAreaForm.signed_data.value = temp_DSign_Result;
			//CA认证随机数信息
			multiAreaForm.DSign_Content.value = DSign_Content;
			//用于控制菜单宽度
			multiAreaForm.screenwidth.value = window.screen.width;
			//当前服务地址，用户推迟系统操作
			multiAreaForm.mainUrl.value = resp.mainUrl;
			//提交表单
		    multiAreaForm.submit();
		//如果是授权用户，则跳转到授权登录页面
		}else if(resp.errorMessage == "shouquan"){
			window.parent.location.href = _ROOT_PATH_ + "/portal/portal2/login/accuser.jsp";
			//form.password.value = "";
		//如果登录失败，则给出提示信息
		 }else {
			document.getElementById("errorMessage").innerHTML = resp.errorMessage;
		}
	});
}
function exe(controlURL){
	if(controlURL!=null && controlURL !=""){
		window.location.replace(controlURL);
	}else{
		window.location.replace( "/common/ifmis_plugins.exe ");
	}
}
</script>
</html>
