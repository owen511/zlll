<%@ page language="java" contentType="text/html; charset=GBK"
	pageEncoding="GBK"%>
<jsp:directive.page import="java.util.Map;"/>	
<%@ taglib uri="/WEB-INF/struts-tiles.tld" prefix="tiles" %>
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
%>


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 6.0 Transitional//EN">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
	
<object classid="clsid:0B7A9F67-EB6F-42B4-847B-E4A451E276F6" id=WebPrinter codebase="<%=basePath%>/common/JQezPrinter.ocx#version=1.0.0.0"></object>
<OBJECT WIDTH="1" HEIGHT="1" ID="RemoveIEToolbar" 
    CLASSID="CLSID:2646205B-878C-11d1-B07C-0000C040BCDB" codebase="<%=basePath%>/common/flyie.cab#version=1,0,0,0" VIEWASTEXT>
	 <PARAM NAME="ToolBar" VALUE="0">
	 <PARAM NAME="StatusBar" VALUE="1">
	 <PARAM NAME="MenuBar" VALUE="0">     
</OBJECT>
<link rel="stylesheet" type="text/css" href="<%=basePath%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
<link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=basePath%>/style/<%=styleName %>" />
<link rel="stylesheet" type="text/css" href="<%=basePath%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_LOGO%>_logo.css"/>
<link type="text/css" rel="stylesheet"	href="<%=basePath%>/style/jquery.autocomplete.css" />
<link rel="stylesheet" type="text/css" href="<%=basePath%>/style/calendar.css"/>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/scripts/jsframework.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/prototype.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/choose.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/tabpage.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/changescroll.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/calendar.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/formatNumber.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/Word_Spell.js"></script>
<script type="text/vbscript" src="<%=basePath%>/js/decode_resource.vbs"></script>
<script type="text/javascript" src="<%=basePath%>/js/ua.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/ftiens4.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/datatable.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/export.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/tbajax.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/template.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/overlib/overlibmws.js" type=text/javascript></SCRIPT>
<script type="text/javascript" src="<%=basePath%>/js/overlib/overlibmws_filter.js" type=text/javascript></SCRIPT>
<script type="text/javascript" src="<%=basePath%>/js/overlib/overlibmws_shadow.js" type=text/javascript></SCRIPT>
<script type="text/javascript" src="<%=basePath%>/js/jquery-1[1].3.1.js"></script>	
<script type="text/javascript" src="<%=basePath%>/js/jquery.autocomplete.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/rightButton.js"></script>

<script type="text/javascript">
Using("System.Web.UI.WebControls.MzTreeView");
var linkvchtypeid = '<%=request.getAttribute("linkvchtypeid")%>';
var ROOT_PATH = '<%=basePath%>';
String.prototype.trim = function(){
	return this.replace(/(^\s*)|(\s*$)/g,"");
}
<% 
String intranetConfig ="";
if(session.getAttribute("intranetConfig")!="" && session.getAttribute("intranetConfig")!=null){
	intranetConfig = session.getAttribute("intranetConfig").toString();
}
	
%>


function setFont(fontsize){
  	if(fontsize=="l"){
  	  document.getElementById('ifmisfontstyle').href = '<%=basePath%>/style/stylefontL.css';
      setFontSession("stylefontL.css");	
    }else if(fontsize=="m"){
      document.getElementById('ifmisfontstyle').href = '<%=basePath%>/style/stylefontM.css';
      setFontSession("stylefontM.css");	
    }else{
      document.getElementById('ifmisfontstyle').href = '<%=basePath%>/style/stylefontS.css';
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
</script>


<title>
    <tiles:insert attribute="title" />
</title>


<%
   
  String showAcctsystype = null;
  
  Map hpacctsystype = (Map)session.getAttribute("hpacctsystype");
  Object acctsystypeid = session.getAttribute("acctsystype");
  if(hpacctsystype != null && acctsystypeid != null){	  
	  showAcctsystype = (String)hpacctsystype.get(acctsystypeid.toString()) ;
  }
  if(showAcctsystype == null){
	  showAcctsystype = "";
  }
  String hsagnecy = null;
  if(session.getAttribute("hsagencyname") != null){
	  hsagnecy =  "/"+session.getAttribute("hsagencycode").toString()+"-"+session.getAttribute("hsagencyname").toString();
  }
  
  String isbudget = "";
  if(session.getAttribute("isbudget") != null){
	  isbudget =  session.getAttribute("isbudget").toString();
  }
  if (showAcctsystype!=null && showAcctsystype!="" && isbudget.equals("2") && hsagnecy != null ){
	  showAcctsystype += hsagnecy;
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

 
%>
</head>
<body >

<div id="window_top" >
<div id="top" >
  <div id="logo">
    <table  border="0" cellspacing="0" cellpadding="0">
      <tr>
        <th rowspan="2" nowrap="nowrap"></th>
        <td nowrap="nowrap">
<%--        <div><a title="显示版本信息" href="<%=basePath%>/version/index.html"><img src="../images/actions/version.gif" width="16" height="16" border="0"/> 版本</a></div>--%>
        <div><a title="退出" href="<%=basePath%>/logout.page"><img src="<%=basePath%>/images/actions/exit.gif" width="16" height="16" border="0"/> 退出 </a></div><div class="w_gang"></div>
          <div><a title="返回首页" href="<%=basePath%>/default.page"><img src="<%=basePath%>/images/actions/house.gif" width="16" height="16" /> 首页</a></div><div class="w_gang"></div>
		      
		 <% 
		     //启用ca 后不在一体化系统中修改密码 20100107
		     String isportalca = "fasle" ;
			 if (session.getAttribute("isportalca")!=null ) isportalca =  (String)session.getAttribute("isportalca");
             if(isportalca.equalsIgnoreCase("false")) {%>
          <div><a title="修改密码" href="<%=basePath%>/portal/login/mod_password.jsp" target="_blank"><img src="<%=basePath%>/images/actions/mod_pwd.gif" width="16" height="16" border="0"/> 修改密码</a></div><div class="w_gang"></div>
		<% } %>

         <% if(intranetConfig!=null&&intranetConfig!=""){%>
          <div><a title="进入内网" href="<%=intranetConfig%>"><img src="<%=basePath%>/images/actions/go_innerNet.gif" width="16" height="16" /> 内网</a></div><div class="w_gang"></div>   
          <%} %>    
         <div class="w_head"></div> 
        <td width="6" nowrap="nowrap" class="w_right">&nbsp;</td>
      </tr>
      <tr>
        <td nowrap="nowrap" class="welcomeA">
        <% if(agencyType!=null&&agencyType!=""){%>
        	<c:out value="${sessionScope.currentagencytype}"/>:<c:out value="${sessionScope.currentuseragency.name}"/> 
        <%}else if(currentuseragencyname!=null && currentuseragencyname!=""){%>
         单位:<c:out value="${sessionScope.currentuseragency.name}"/> 
        <%} %>       
        <%if (showAcctsystype!=null && showAcctsystype!=""){%>
         账套:<%=showAcctsystype%>
        <% } %> 
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
<div id="hidden_top" align="center" ><span id="hiddenTopBar" title="隐藏上部" onClick="doHiddenTop(this)"></span></div>
<div style="position:relative;background-color:#CCCCCC; overflow:hidden;height:expression(this.offsetParent.offsetHeight-window_top.offsetHeight-hidden_top.offsetHeight-10);">
    <div id="left_tree" style="display:block; height:expression(this.offsetParent.offsetHeight-25); overflow-y:scroll">
       <tiles:insert attribute="edittree"/></div>
    <div id="switchBar" style="display:block; height:expression(this.offsetParent.style.height); overflow:hidden">
        <table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0">
       <tr>
        <td id="hidden_left" align="center"><span id="hiddenLeftBar" title="隐藏左侧树" onClick="doHiddenLeft(this)"></span></td>
       </tr>
       </table>
    </div>
    <tiles:insert attribute="selfscript"/>
	<tiles:insert attribute="common"/>
    <div id="main" style="display:block; height:expression(this.offsetParent.style.height);">
    <div id="tree_inner" oncontextmenu="return false;"></div>    
       <tiles:insert attribute="navigation"/>
       <div id ="context">
       	<tiles:insert attribute="main"/>
       	<tiles:insert attribute="showhelp"/>
       </div>	
    </div>	  
</div> 
<script>screeMaintain();</script> 
</body>
</html>
   <%
   String mainmenu = "";
	if(request.getParameter("mainmenu")!=null && request.getParameter("mainmenu")!=""){
		mainmenu = request.getParameter("mainmenu").toString();
	}
	
	//财政
	String financial = "";
	if(session.getAttribute("financial")!=null){
		financial = session.getAttribute("financial").toString();
	}	
   if(mainmenu.equals("30000")||mainmenu.equals("28000")){ %>
        	<% if(financial!=null && financial!=""){%>
        	<script>				
        		document.title = "财政管理一体化信息系统(IFMIS)  财政："+'<%=financial%>';
        		
			</script> 
        	<%} 
        }%>
