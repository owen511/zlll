<%@ page language="java" contentType="text/html; charset=GBK" pageEncoding="GBK"%>
<%@ page import="gov.mof.fasp.ca.user.UserDTO"%>
<%@ page import="gov.mof.fasp.sec.util.SecureUtil"%>
<%@ page import="gov.mof.fasp.dic.IDictionaryService"%>
<%@ page import="gov.mof.framework.util.DBUtil"%>
<%@ page import="gov.mof.fasp.dic.elementcode.dto.CommonElementDTO"%>
<%@ page import="gov.mof.fasp.systemset.bo.SystemSetBO"%>
<%@ page import="gov.mof.fasp.systemset.dto.SystemSetDTO"%>
<%@ page import="gov.mof.fasp.ifmis.common.ServiceFactory"%>
<%@ page import="com.zlll.bba.base.VerifyCode"%>
<%@ page import="java.awt.image.BufferedImage"%>
<%@ page import="javax.imageio.ImageIO"%>
<%@ page import="java.io.OutputStream"%>
<%
String basePath = request.getScheme() + "://"
+ request.getServerName() + ":" + request.getServerPort()
+ request.getContextPath();
String ui_logo_area = "";
String commonCode = "";
String validate = request.getParameter("validate");
//获取当前用户
UserDTO userDTO = SecureUtil.getCurrentUser();

//获取单位编码
IDictionaryService dicService = (IDictionaryService) DBUtil.getBeanByName("fasp.dic.dictionaryService");
if(userDTO.getOrgantype()!=null&&userDTO.getOrganid()!=null&&!userDTO.getOrgantype().equals("")&&!userDTO.getOrganid().equals("")){
	CommonElementDTO commonElementDTO = dicService.findElementInfo(userDTO.getOrgantype(), userDTO.getOrganid().intValue());
	if(commonElementDTO!=null&&commonElementDTO.Code()!=null){
		commonCode = commonElementDTO.Code();
	}
}
//获取地区标识，如果是重庆的，修改密码需要进行验证
SystemSetBO systemSetBO = (SystemSetBO) ServiceFactory.getBean("fasp.systemset.systemSetBO");
SystemSetDTO systemSetDTO = null;
		try{
			systemSetDTO = (SystemSetDTO)systemSetBO.findSystemSetByCode("ui_logo");
			if(systemSetDTO!=null){
				if(systemSetDTO.getParamdata()!=null){
					ui_logo_area = systemSetDTO.getParamdata();
					
				}else{
					ui_logo_area ="";
				}
			}else{
					ui_logo_area ="";
			}
		}catch(Exception e)	{
				ui_logo_area ="";
		}
		//生成验证码
		int width = 200;
		int height = 50;
		BufferedImage verifyImg=new BufferedImage(width,height,BufferedImage.TYPE_INT_RGB);
		String randomText = VerifyCode.drawRandomText(width, height, verifyImg);
		System.out.println("randomText====="+randomText);
		
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<base target="_self"/>


 <head>
<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
<meta http-equiv="X-UA-Compatible" content="IE=7" />
 <OBJECT WIDTH="1" HEIGHT="1" ID="RemoveIEToolbar" 
    CLASSID="CLSID:2646205B-878C-11d1-B07C-0000C040BCDB" codebase="<%=basePath%>/common/flyie.cab#version=1,0,0,0" VIEWASTEXT>
	 <PARAM NAME="ToolBar" VALUE="0"/>
	 <PARAM NAME="StatusBar" VALUE="1"/>
	 <PARAM NAME="MenuBar" VALUE="0"/>     
</OBJECT>


  <STYLE>
   
    TD {
      font-size: 10pt; 
      font-family: verdana,helvetica; 
      text-decoration: none;
      white-space:nowrap;}
    A {
      text-decoration: none;
      color: black;}
  </STYLE>
  <!-- Code for browser detection. DO NOT REMOVE.             -->
  <script type="text/javascript" src="<%=basePath%>/js/ua.js"></script>
  <script type="text/javascript" src="<%=basePath%>/js/jquery-1[1].3.1.js"></script>
  <!-- Infrastructure code for the TreeView. DO NOT REMOVE.   -->
  <script src="<%=basePath%>/js/ftiens4.js"></script>
  <script type="text/javascript">
 	var Sid ="";
	function Loadfrm(){
		var aParams;
		aParams = document.location.search.substr(1).toLowerCase().split('=');
		Sid=aParams[1];
	}
    function generateQueryString() {
	  var recheck ="";
	  for (var i = 0; i < document.forms[0].elements.length; i++) {
        var e = document.forms[0].elements[i];
        if (e.type == "radio"&&e.checked) {
             recheck = e.value;
        }		
      }
	  return recheck;
     }
	function checkValue(){
	
		var id =Sid ;
		if(id != null){
			window.opener.document.getElementById(id).value=generateQueryString();
			self.close();	
		} else {
			alert("页面错误：传入id为空！");
		}		
	}	
$=function(id){return document.getElementById(id);}
function mc(){var _i=$("uploadfile");_i.click();}
function mm(){$("puf").value=(document.f1.uf.value);}
window.onload=function(){
}



function resizewindow(w,h){
	window.resizeTo(w,h);
	//alert(window.opener.screenLeft);
	//alert(window.opener.screenTop);
	//window.moveTo(window.opener.screenLeft+window.opener.document.body.clientWidth/2-200,window.opener.screenTop+window.opener.document.body.clientHeight/2-150);
}

function modpwd(){

	var commonCode_tem = Trim(document.form1.commonCode.value);
	var ui_logo_area_tem = Trim(document.form1.ui_logo_area.value);
	if(document.form1.oldpwd==null||document.form1.oldpwd.value==""){	
	
		alert("请填写原先密码");
		return false;
	}
	if(document.form1.newpwd==null||document.form1.newpwd.value==""){
		alert("请填写新密码");
		return false;
	}
	
	if(document.form1.newpwd.value.length<6){
		alert("密码长度最少6位");
		document.form1.newpwd.value ="";
		document.form1.newpwd1.value ="";
		return false;
	}
	if(document.form1.newpwd.value.length>16){
		alert("密码长度不能大于16位");
		document.form1.newpwd.value ="";
		document.form1.newpwd1.value ="";
		return false;
	}
	if(document.form1.newpwd1==null||document.form1.newpwd1.value==""){
		alert("请填写确认密码");
		return false;
	}
	
	if(document.form1.newpwd1.value != document.form1.newpwd.value){
		alert("两次输入的新密码不一致");
		return false;
	}
	
	if(ui_logo_area_tem == 'chongqing'){
			var password = document.form1.newpwd.value;
			var reg = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{2,})$/;	
			var r = reg.test(password);
		if(!r){
			alert("请输入由数字和字母组成的密码!");
			document.form1.newpwd.value ="";
			document.form1.newpwd1.value ="";
			password = document.form1.newpwd.focus();
			return false;
		}	
	}
    document.form1.submit();
}

//window.attachEvent("onbeforeunload",function(){alert("请修改密码！")});

function Trim(TRIM_VALUE){
	if(TRIM_VALUE.length < 1){
		return"";
	}
	TRIM_VALUE = RTrim(TRIM_VALUE);
	TRIM_VALUE = LTrim(TRIM_VALUE);
	if(TRIM_VALUE==""){
		return "";
	}
	else{
		return TRIM_VALUE;
	}
} //End Function

function RTrim(VALUE){
	var w_space = String.fromCharCode(32);
	var v_length = VALUE.length;
	var strTemp = "";
	if(v_length < 0){
		return"";
	}
	var iTemp = v_length -1;

	while(iTemp > -1){
		if(VALUE.charAt(iTemp) == w_space){
		}
		else{
			strTemp = VALUE.substring(0,iTemp +1);
			break;
		}
		iTemp = iTemp-1;

	} //End While
	return strTemp;

} //End Function

function LTrim(VALUE){
	var w_space = String.fromCharCode(32);
	if(v_length < 1){
		return"";
	}
	var v_length = VALUE.length;
	var strTemp = "";
	var iTemp = 0;

	while(iTemp < v_length){
		if(VALUE.charAt(iTemp) == w_space){
			}
			else{
				strTemp = VALUE.substring(iTemp,v_length);
				break;
		}
		iTemp = iTemp + 1;
	} //End While
	return strTemp;
}
  </script>
  	

  <TITLE>修改密码</TITLE>
<link rel="stylesheet" type="text/css" href="<%=basePath%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />

<link href="<%=basePath%>/style/stylefontS.css" rel="stylesheet" type="text/css" />
 </head>

 <body class="pop_body" <%if(!"password".equals(validate)){%>onload=resizewindow(400,360)<%} %>>
 
   <div id="popPage">
   	<div id="shenhe_title">
   		<div id="shenhe_title_middle"><%if("password".equals(validate)){%>您的密码已过期，请重新设置<%} %>
   		</div>
  	 </div>
   <div id="pop_inner2">
    <br/>
       <div id="table_list_title"><ul><li class="top">
   	   <div>密码修改<%if("chongqing".equals(ui_logo_area)){%><font color="red" size="1">(密码须由6-16个字母和数字组成，不能全是数字)</font><%} %>
   	</div>
   	</li>
   	</ul>
   	</div>
   <div id="edit_table" style="padding-left:0;">
 <form name="form1" id="form1" action="<%=request.getContextPath()%>/template/commons/modifypwd.do" method="post">
	<table width="100%" border="0" cellpadding="0" cellspacing="0">
	  <tr>
	    <th width="30%">旧密码<span><font color="red">*</font></span></th>
	    <td colspan="2"><input type="password" name="oldpwd"/></td>
	  </tr>
	  <tr>
	    <th width="30%">新密码<span><font color="red">*</font></span></th>
	    <td width="10%"><input type="password" name="newpwd" /></td>
	    <td align="left">(由英文字母、数字及特殊字符组成，且长度不能少于8位)</td>
	  </tr>
	  <tr>
	    <th width="30%">确认密码<span><font color="red">*</font></span></th>
	    <td colspan="2"><input type="password" name="newpwd1" /></td>
	  </tr>
	  <tr>
	  	<th width="30%">验证码<span><font color="red">*</font></span></th>
	  	<td width="10%"><input type="input" name="yzcode" /></td>
	  	<td align="left"><img src="" id="verifyCode" class="verifyCode" onclick="changeCode()"/></td>	 
	  </tr>
	  <tr style="display:none;">
	    <td style="display:none"><input type="hidden" name="commonCode" value ="<%=commonCode %>"></td>
	    <td style="display:none"><input type="hidden" name="ui_logo_area" value ="<%=ui_logo_area %>"></td>
	  </tr>
	</table>
</form>
  </div>
  </div>
<script type="text/javascript">
window.onload=function () {
    var src = "./common/verifycode.do?time="+new Date().getTime(); //加时间戳，防止浏览器利用缓存
    alert(11);
    //alert($('.verifyCode'));
    $('.verifyCode').attr("src",src);
    document.getElementById("verifyCode").src=src;
}
</script>
<center>
<input type="button" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'" value="确定" onclick="modpwd()"/>
<%if(!"password".equals(validate)){%>
<%} %>
 </div>

 </body>
</html>
