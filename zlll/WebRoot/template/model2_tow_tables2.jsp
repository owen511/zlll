<%@ page language="java" contentType="text/html; charset=GBK"
	pageEncoding="GBK"%>
<%@ taglib uri="/WEB-INF/struts-tiles.tld" prefix="tiles" %>
<%@ page import="gov.mof.fasp.ifmis.common.Globals"%>
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
			
String currentuseragencyname = "";
if(session.getAttribute("currentuseragency")!=null){
	java.util.HashMap currentuseragency = (java.util.HashMap)session.getAttribute("currentuseragency");
	currentuseragencyname = currentuseragency.get("name").toString();
}

//财政
String financial = "";
if(session.getAttribute("financial")!=null){
	financial = session.getAttribute("financial").toString();
}	

String intranetConfig ="";
	if(session.getAttribute("intranetConfig")!="" && session.getAttribute("intranetConfig")!=null){
		intranetConfig = session.getAttribute("intranetConfig").toString();
	}
//福州财政特殊处理
String area_name = "";
if(session.getAttribute("area_name") != null){
	area_name = session.getAttribute("area_name").toString();
}
			
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="X-UA-Compatible" content="IE=7" />

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
<script type="text/javascript" src="<%=basePath%>/js/prototype.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/jquery-1[1].3.1.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/choose.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/changescroll.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/calendar.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/formatNumber.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/Word_Spell.js"></script>
<script type="text/vbscript" src="<%=basePath%>/js/decode_resource.vbs"></script>
<script type="text/javascript" src="<%=basePath%>/js/ua.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/ftiens4.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/datatable.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/template.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/overlib/overlibmws.js" type=text/javascript></SCRIPT>
<script type="text/javascript" src="<%=basePath%>/js/overlib/overlibmws_filter.js" type=text/javascript></SCRIPT>
<script type="text/javascript" src="<%=basePath%>/js/overlib/overlibmws_shadow.js" type=text/javascript></SCRIPT>
<script type="text/javascript" src="<%=basePath%>/js/jquery.autocomplete.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/rightButton.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/jqueryExtend.js"></script>
<tiles:insert attribute="selfscript"/>
<tiles:insert attribute="common"/>

<script type="text/javascript">
var linkvchtypeid = '<%=request.getAttribute("linkvchtypeid")%>';
var ROOT_PATH = '<%=basePath%>';
String.prototype.trim = function(){
	return this.replace(/(^\s*)|(\s*$)/g,"");
}
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
</script>


<title><tiles:insert attribute="title"/></title>

</head>


<body onload="loadshow()">
<!--这里是顶部的div，主要用来装logo和menu模块的div-->
<div id="window_top"
	style=" display:block;height:80px; overflow:hidden;">
<div id="top" style="display:block">
<!--这里是顶部的div中装载的第一个模块div，里边定义了网页的logo及退出&版本&系统时间-->
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
          <div><a title="返回首页" href="<%=basePath%>/common/index.do"><img src="<%=basePath%>/images/actions/house.gif" width="16" height="16" /> 首页</a></div><div class="w_gang"></div>
          <div><img src="<%=basePath%>/images/actions/font_size.gif" width="16" height="16" border="0" title="字号" /><a href="#" onclick="setFont('l')">大</a><a href="#" onclick="setFont('m')"> 中</a><a href="#" onclick="setFont('s')"> 小</a></div><div class="w_gang"></div>
           <% String passwordshow = Globals.IFMIS_PASSWORDSHOW_FLAG;
        	if(passwordshow.equals("1")){
          %>
          <div><a title="修改密码" href="<%=basePath%>/portal/login/mod_password.jsp" target="_blank"><img src="<%=basePath%>/images/actions/mod_pwd.gif" width="16" height="16" border="0"/> 修改密码</a></div><div class="w_gang"></div>
          <%}%>
          <% if(intranetConfig!=null&&intranetConfig!=""){%>
          <div><a title="进入内网" href="<%=intranetConfig%>"><img src="<%=basePath%>/images/actions/go_innerNet.gif" width="16" height="16" /> 内网</a></div> <div class="w_gang"></div>  
          <%} %>    
            </td>
        <div class="w_head"></div> 
        <td nowrap="nowrap"  class="w_right">&nbsp;</td>
      </tr>
      <tr><td class="welcomeA">
	<%if(area_name != null && area_name != ""){ %>
       	财政:<%=area_name%> 
       <%}%>
      <% if(currentuseragencyname!=null && currentuseragencyname!=""){%>
        单位:<c:out value="${sessionScope.currentuseragency.name}"/> 
      <%} %>
        用户:<c:out value="${sessionScope.currentuser.name}"/> 系统日期：
         <span id=cdate>
         <% java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyy-MM-dd"); 
        	out.println(formatter.format(new java.util.Date()));
         %></span></td>
        <td>&nbsp;</td>
      </tr>
    </table>
  </div>
  <!--这里是menu模块儿，使用了一个div装载-->
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
<!--下边为一个大的div,包含一个大的table(1行3列),其中包含了左侧的树（div）及右侧的工作区-->
<div style="background-color:#CCCCCC; height:expression(document.body.offsetHeight-window_top.offsetHeight-hidden_top.offsetHeight);position:relative;">
	<div id="left_tree" style="display:block; height:expression(this.offsetParent.style.height); overflow-y:scroll">
    <!--第一列用来装载树，这一部分在资源库中有几个模版，使用的时候只要把原编辑区域的代码删除，把资源库中的文件拖拽到可编辑区即可-->
	<tiles:insert attribute="edittree"/></div>
    <!--这里是table的第二列，装载一个按钮收缩条，点击后左边的树就会隐藏或显示-->
  <div id="switchBar" style="display:block; height:expression(this.offsetParent.style.height); overflow:hidden">
  <table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0">
   <tr>
        <td id="hidden_left" align="center"><span id="hiddenLeftBar" title="隐藏左侧树" onClick="doHiddenLeft(this)"></span></td>
   </tr>
   </table>
  </div>
  <div id="main" style="display:block; height:expression(this.offsetParent.style.height);position:relative;">
    <!--这里是table的第三列，它是主要的工作区域，所以id命名为work,它主要装载的内容有以下几大部分：-->
	<!--1、各种操作按钮（增加、修改、删除）；2、各种查询条件；3、数据以及每条数据的明细-->
	<!--注：不是每张网页都会同时具备这些要素，每个程序员根据的自己的模块儿选择增删-->		   <!--本区域在资源库中也有原型，使用方法也是直接拖拽，然后选定要更改的地方点右键，使其与源文件分离，就可以更改其中的具体文字和按钮了-->
	<!--第一部分：操作按钮，采用了一个表格的第一行，这一行应该就足够装载所有按钮，如有装不下的，请和美工联系-->
	
	<div>
	<tiles:insert attribute="navigation"/>
	</div>
    <!--第三部分:数据显示及数据明细显示区域,这里可以有多个表格,本模版以两个表格为例,一个表格负责显示数据,一个表格负责显示明细-->

	
	<tiles:insert attribute="btnarea"/>
	<tiles:insert attribute="queryarea"/>
	<!--存放table1,div标签id为tbl-container1,table1的id为"tbl1",代码请参照\Library\data_table3.lib--><!--负责显示明细的表格-->
		<!--存放table2,div标签id为tbl-container2,table2的id为"tbl2",代码请参照\Library\data_table3.lib-->
	<div style="position:relative;"><tiles:insert attribute="data_main"/></div>
	<div><tiles:insert attribute="data_detail"/></div>
	<div><!-- TemplateBeginEditable name="EditRegion11" -->可编辑区域2<!-- TemplateEndEditable --></div>
    <div id="showhelp" style="display:none;"><!-- TemplateBeginEditable name="添写本页帮助说明" -->显示页面帮助<!-- TemplateEndEditable --></div></div>
	 
</div>
</body>
</html>
