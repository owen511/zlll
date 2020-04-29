<%@ page language="java" contentType="text/html; charset=GBK"
	pageEncoding="GBK" buffer="1400k"%>
<%@ taglib uri="/WEB-INF/struts-tiles.tld" prefix="tiles" %>
<%@ page import="gov.mof.fasp.ifmis.common.Globals"%>
<%@ page import="gov.mof.fasp.ifmis.common.JsLoader"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>
<%
    	
       response.setHeader("Cache-Control","no-cache"); 
       response.setHeader("Pragma","no-cache"); 
       response.setDateHeader("Expires",0); 
  
    	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
		String styleName ="stylefontS.css";	
		if(session.getAttribute("StyleName")!=null){
		    styleName = (String)session.getAttribute("StyleName");
		}
		long modifytime = JsLoader.modifyTime();	
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<!-- 测试门户登录首页客户端及服务端加载时间 -->
<script type="text/javascript">var startTime = new Date().getTime();</script>
<html xmlns="http://www.w3.org/1999/xhtml"><!-- InstanceBegin template="/Templates/model5_default.dwt" codeOutsideHTMLIsLocked="false" -->
<head>

<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="X-UA-Compatible" content="IE=7" />


<!-- OBJECT WIDTH="1" HEIGHT="1" ID="RemoveIEToolbar" 
    CLASSID="CLSID:2646205B-878C-11d1-B07C-0000C040BCDB"  VIEWASTEXT>
	 <PARAM NAME="ToolBar" VALUE="0">
	 <PARAM NAME="StatusBar" VALUE="1">
	 <PARAM NAME="MenuBar" VALUE="0">     
</OBJECT -->

<link rel="stylesheet" type="text/css" href="<%=basePath%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css?t=<%=modifytime%>" />
<link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=basePath%>/style/<%=styleName %>?t=<%=modifytime%>" />
<link type="text/css" rel="stylesheet"	href="<%=basePath%>/style/jquery.autocomplete.css?t=<%=modifytime%>" />
<link rel="stylesheet" type="text/css" href="<%=basePath%>/style/calendar.css?t=<%=modifytime%>"/>
<script type="text/javascript" src="<%=basePath%>/js/prototype.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/jquery-1[1].3.1.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/ltext/ltext_core.js?t=<%=modifytime%>"></script>	
<script type="text/javascript" src="<%=basePath%>/js/choose.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/loadOcx.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/changescroll.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/calendar.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/formatNumber.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/Word_Spell.js?t=<%=modifytime%>"></script>
<script type="text/vbscript" src="<%=basePath%>/js/decode_resource.vbs"></script>
<script type="text/javascript" src="<%=basePath%>/js/ua.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/ftiens4.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/datatable.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/template.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/overlib/overlibmws.js?t=<%=modifytime%>" type=text/javascript></SCRIPT>
<script type="text/javascript" src="<%=basePath%>/js/overlib/overlibmws_filter.js?t=<%=modifytime%>" type=text/javascript></SCRIPT>
<script type="text/javascript" src="<%=basePath%>/js/overlib/overlibmws_shadow.js?t=<%=modifytime%>" type=text/javascript></SCRIPT>
<script type="text/javascript" src="<%=basePath%>/js/jquery.autocomplete.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/rightButton.js?t=<%=modifytime%>"></script>
<script type="text/javascript" src="<%=basePath%>/js/jqueryExtend.js?t=<%=modifytime%>"></script>
<tiles:insert attribute="common"/>
<tiles:insert attribute="selfscript"/>
<script type="text/javascript">
var ROOT_PATH = '<%=basePath%>';
String.prototype.trim = function(){
	return this.replace(/(^\s*)|(\s*$)/g,"");
}
<% 
String intranetConfig ="";
if(session.getAttribute("intranetConfig")!="" && session.getAttribute("intranetConfig")!=null){
	intranetConfig = session.getAttribute("intranetConfig").toString();
}

String currentuseragencyname = "";
if(session.getAttribute("currentuseragency")!=null){
	java.util.HashMap currentuseragency = (java.util.HashMap)session.getAttribute("currentuseragency");
	currentuseragencyname = currentuseragency.get("name").toString();
}
//单位类型
String agencyType = "";
if(session.getAttribute("currentagencytype")!=null&&session.getAttribute("currentagencytype")!=""){
	agencyType = (String)session.getAttribute("currentagencytype");
}
//财政
String financial = "";
if(session.getAttribute("financial")!=null){
	financial = session.getAttribute("financial").toString();
}
//福州财政特殊处理
String area_name = "";
if(session.getAttribute("area_name") != null){
	area_name = session.getAttribute("area_name").toString();
}
%>
function setFont(fontsize){
  	if(fontsize=="l"){
  	  document.getElementById('ifmisfontstyle').href = '<%=basePath%>/style/stylefontL.css';
      setFontSession("stylefontL.css");	
    }else if(fontsize=="s"){
      document.getElementById('ifmisfontstyle').href = '<%=basePath%>/style/stylefontS.css';
      setFontSession("stylefontM.css");	
    }else{
      document.getElementById('ifmisfontstyle').href = '<%=basePath%>/style/stylefontM.css';
      setFontSession("stylefontS.css"); 
    }
    setFontCookie(fontsize);
}
//获取Code全局变量
 var codeShowConfigs = new Array();
 var codeShowConfigs_ =<%=request.getAttribute("CODESHOWCONFIG") %> ;
 if(codeShowConfigs_ != null){
   codeShowConfigs = codeShowConfigs_;
 }
  //系统CODE配置参数
 var codeShowFlag =<%=request.getAttribute("CODESHOWFLAG") %> ;
 //系统参数控制报表组件是否允许自动安装
 var rptOcxIsAuto ='<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_RPTOCXAUTO%>';

</script>
<title><tiles:insert attribute="title"/></title>

</head>
<body>
<div id="window_top">
<div id="top">
  <div id="logo">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <th rowspan="2" nowrap="nowrap"></th>
        <td  nowrap="nowrap">
        <% String exitshow = Globals.IFMIS_EXITSHOW_FLAG;
        	if(exitshow.equals("1")){
         %>
        	<div><a title="退出" href="<%=basePath%>/logout.do"><img src="<%=basePath%>/images/actions/exit.gif" width="16" height="16" border="0"/> 退出 </a></div><div class="w_gang"></div>
         <%}%>
          <div><a title="返回首页" href="<%=basePath%>/common/index.do"><img src="<%=basePath%>/images/actions/house.gif" width="16" height="16" /> 刷新</a></div><div class="w_gang"></div>
          <div><img src="<%=basePath%>/images/actions/font_size.gif" width="16" height="16" border="0" title="字号" /><a href="#" onclick="setFont('l')">大</a><a href="#" onclick="setFont('m')"> 中</a><a href="#" onclick="setFont('s')"> 小</a></div><div class="w_gang"></div>
          <% 
		     //启用ca 后不在一体化系统中修改密码 20100107
		     String isportalca = "fasle" ;
		     String passwordshow = Globals.IFMIS_PASSWORDSHOW_FLAG;
			 if (session.getAttribute("isportalca")!=null ) isportalca =  (String)session.getAttribute("isportalca");
             if(passwordshow.equals("1") && isportalca.equalsIgnoreCase("false")) {%>
          <div><a title="修改密码" href="<%=basePath%>/portal/login/mod_password.jsp" target="_blank"><img src="<%=basePath%>/images/actions/mod_pwd.gif" width="16" height="16" border="0"/> 修改密码</a></div><div class="w_gang"></div>
		<% } %>
          <% if(intranetConfig!=null&&intranetConfig!=""){%>
          <div><a title="进入内网" href="<%=intranetConfig%>" target="_blank"><img src="<%=basePath%>/images/actions/go_innerNet.gif" width="16" height="16" /> 内网</a></div><div class="w_gang"></div>   
          <%} %>    
          <div class="w_head"></div>   
            </td>
        <td width="6" nowrap="nowrap" class="w_right">&nbsp;</td>
      </tr>
      <tr>
        <td nowrap="nowrap" class="welcomeA">
        <%if(area_name != null && area_name != ""){ %>
       	财政:<%=area_name%> 
       <%}%>
		年度:<c:out value="${sessionScope.loginacctyear}"/>
        <% if(agencyType!=null&&agencyType!=""){%>
        	<c:out value="${sessionScope.currentagencytype}"/>:<c:out value="${sessionScope.currentuseragency.name}"/> 
        <%}else if(currentuseragencyname!=null && currentuseragencyname!=""){%>
         单位:<c:out value="${sessionScope.currentuseragency.name}"/> 
        <%} %>       
        用户:<c:out value="${sessionScope.currentuser.name}"/> 
        <% if(agencyType!=null&&agencyType!=""){%>日期:<%}else{%>系统日期:<%}%>
         <span id=cdate>
         <% java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyy-MM-dd"); 
        	out.println(formatter.format(new java.util.Date()));
         %></span></td>
        <td nowrap="nowrap">&nbsp;</td>
      </tr> 
    </table>
  </div>
  <div id="menu">
<tiles:insert attribute="mainmenu"/>
  </div>
   <script type="text/javascript">
     var menuelement= document.getElementById("menu");
     var logoelement= document.getElementById("logo");
     menuheight = menuelement.offsetHeight;
     topheight = logoelement.offsetHeight;
  </script>
 </div>
</div>
<div id="default_main" style="display:block; height:expression(this.offsetParent.style.height); overflow:auto; position:relative;">
<tiles:insert attribute="main"/>        
</div>
<div id ="mask"></div>
<iframe id="LoadStatus" src="<%=basePath%>/portal/login/mod_password.jsp?validate=password" height="200px" width="450px" SCROLLING="no" FRAMEBORDER ="0"></iframe>
</body>
</html>
   <%
   String mainmenu = "";
	if(request.getParameter("mainmenu")!=null && request.getParameter("mainmenu")!=""){
		mainmenu = request.getParameter("mainmenu").toString();
	}	
   if(mainmenu.equals("30000")||mainmenu.equals("28000")){ %>
        	<% if(financial!=null && financial!=""){%>
        	<script>				
        		document.title = "财政管理一体化信息系统(IFMIS)  财政："+'<%=financial%>';
			</script> 
        	<%} 
        }%>
<%
if("false".equalsIgnoreCase(session.getAttribute("passwordvalidate")+"")){
%>
<!-- 如果密码过期，则强制进入修改密码页面 -->
<script>

/******浮动层 start*****/
function show()
{
    var d_mask=document.getElementById('mask');
    var d_dialog = document.getElementById('LoadStatus'); 
       
    d_mask.style.width = document.body.offsetWidth ;
    d_mask.style.height=document.body.offsetHeight; 
    
    
    d_mask.style.visibility='visible';
    d_dialog.style.visibility='visible';
 	d_dialog.style.display='block';

    d_dialog.style.top = document.body.clientHeight / 2 - d_dialog.height/2;
    d_dialog.style.left =document.body.clientWidth / 2 - d_dialog.width/2;
}
;
function closeDiv(){
 	var d_mask=document.getElementById('mask'); 	
    var d_dialog = document.getElementById('LoadStatus');
    d_mask.style.visibility='hidden';
    d_dialog.style.visibility='hidden';
    d_dialog.style.display='none';
}


window.attachEvent("onload",function(){
  show();
  
  /*
  var d_dialog = document.getElementById('LoadStatus'); 
  d_dialog.Document.parentWindow.resizeTo(400,200);
  d_dialog.Document.getElementById("shenhe_title_middle").innerText = "您的密码已过期，请重新设置"
  var btns = d_dialog.Document.getElementsByTagName("INPUT");
  for(var i=0;i<btns.length;i++){
  	if(btns[i].value=="取消"){
  		btns[i].style.display="none";
  	}
  }
  */
})


</script>
<%}%>
<!-- 测试门户登录首页客户端及服务端加载时间 -->
<script type="text/javascript">var endTime = new Date().getTime(); var subTimeS = '<%=request.getAttribute("subTime")%>'; var subTime = endTime - startTime; var csTime = "浏览器端加载时间：" + subTime + " 服务端加载时间：" + subTimeS;</script>