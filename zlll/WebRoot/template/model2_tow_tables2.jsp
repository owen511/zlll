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

//����
String financial = "";
if(session.getAttribute("financial")!=null){
	financial = session.getAttribute("financial").toString();
}	

String intranetConfig ="";
	if(session.getAttribute("intranetConfig")!="" && session.getAttribute("intranetConfig")!=null){
		intranetConfig = session.getAttribute("intranetConfig").toString();
	}
//���ݲ������⴦��
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

//��ȡCodeȫ�ֱ���
 var codeShowConfigs = new Array();
 var codeShowConfigs_ =<%=request.getAttribute("CODESHOWCONFIG") %> ;
 if(codeShowConfigs_ != null){
   codeShowConfigs = codeShowConfigs_;
 }
  //ϵͳCODE���ò���
 var codeShowFlag =<%=request.getAttribute("CODESHOWFLAG") %> ;
</script>


<title><tiles:insert attribute="title"/></title>

</head>


<body onload="loadshow()">
<!--�����Ƕ�����div����Ҫ����װlogo��menuģ���div-->
<div id="window_top"
	style=" display:block;height:80px; overflow:hidden;">
<div id="top" style="display:block">
<!--�����Ƕ�����div��װ�صĵ�һ��ģ��div����߶�������ҳ��logo���˳�&�汾&ϵͳʱ��-->
  <div id="logo">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <th rowspan="2" nowrap="nowrap"></th>
        <td  nowrap="nowrap">
         <% String exitshow = Globals.IFMIS_EXITSHOW_FLAG;
        	if(exitshow.equals("1")){
         %>
        	<div><a title="�˳�" href="<%=basePath%>/logout.do"><img src="<%=basePath%>/images/actions/exit.gif" width="16" height="16" border="0"/> �˳� </a></div><div class="w_gang"></div>
          <%}%>
          <div><a title="������ҳ" href="<%=basePath%>/common/index.do"><img src="<%=basePath%>/images/actions/house.gif" width="16" height="16" /> ��ҳ</a></div><div class="w_gang"></div>
          <div><img src="<%=basePath%>/images/actions/font_size.gif" width="16" height="16" border="0" title="�ֺ�" /><a href="#" onclick="setFont('l')">��</a><a href="#" onclick="setFont('m')"> ��</a><a href="#" onclick="setFont('s')"> С</a></div><div class="w_gang"></div>
           <% String passwordshow = Globals.IFMIS_PASSWORDSHOW_FLAG;
        	if(passwordshow.equals("1")){
          %>
          <div><a title="�޸�����" href="<%=basePath%>/portal/login/mod_password.jsp" target="_blank"><img src="<%=basePath%>/images/actions/mod_pwd.gif" width="16" height="16" border="0"/> �޸�����</a></div><div class="w_gang"></div>
          <%}%>
          <% if(intranetConfig!=null&&intranetConfig!=""){%>
          <div><a title="��������" href="<%=intranetConfig%>"><img src="<%=basePath%>/images/actions/go_innerNet.gif" width="16" height="16" /> ����</a></div> <div class="w_gang"></div>  
          <%} %>    
            </td>
        <div class="w_head"></div> 
        <td nowrap="nowrap"  class="w_right">&nbsp;</td>
      </tr>
      <tr><td class="welcomeA">
	<%if(area_name != null && area_name != ""){ %>
       	����:<%=area_name%> 
       <%}%>
      <% if(currentuseragencyname!=null && currentuseragencyname!=""){%>
        ��λ:<c:out value="${sessionScope.currentuseragency.name}"/> 
      <%} %>
        �û�:<c:out value="${sessionScope.currentuser.name}"/> ϵͳ���ڣ�
         <span id=cdate>
         <% java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyy-MM-dd"); 
        	out.println(formatter.format(new java.util.Date()));
         %></span></td>
        <td>&nbsp;</td>
      </tr>
    </table>
  </div>
  <!--������menuģ�����ʹ����һ��divװ��-->
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
<div id="hidden_top" align="center" ><span id="hiddenTopBar" title="�����ϲ�" onClick="doHiddenTop(this)"></span></div>
<!--�±�Ϊһ�����div,����һ�����table(1��3��),���а�������������div�����Ҳ�Ĺ�����-->
<div style="background-color:#CCCCCC; height:expression(document.body.offsetHeight-window_top.offsetHeight-hidden_top.offsetHeight);position:relative;">
	<div id="left_tree" style="display:block; height:expression(this.offsetParent.style.height); overflow-y:scroll">
    <!--��һ������װ��������һ��������Դ�����м���ģ�棬ʹ�õ�ʱ��ֻҪ��ԭ�༭����Ĵ���ɾ��������Դ���е��ļ���ק���ɱ༭������-->
	<tiles:insert attribute="edittree"/></div>
    <!--������table�ĵڶ��У�װ��һ����ť���������������ߵ����ͻ����ػ���ʾ-->
  <div id="switchBar" style="display:block; height:expression(this.offsetParent.style.height); overflow:hidden">
  <table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0">
   <tr>
        <td id="hidden_left" align="center"><span id="hiddenLeftBar" title="���������" onClick="doHiddenLeft(this)"></span></td>
   </tr>
   </table>
  </div>
  <div id="main" style="display:block; height:expression(this.offsetParent.style.height);position:relative;">
    <!--������table�ĵ����У�������Ҫ�Ĺ�����������id����Ϊwork,����Ҫװ�ص����������¼��󲿷֣�-->
	<!--1�����ֲ�����ť�����ӡ��޸ġ�ɾ������2�����ֲ�ѯ������3�������Լ�ÿ�����ݵ���ϸ-->
	<!--ע������ÿ����ҳ����ͬʱ�߱���ЩҪ�أ�ÿ������Ա���ݵ��Լ���ģ���ѡ����ɾ-->		   <!--����������Դ����Ҳ��ԭ�ͣ�ʹ�÷���Ҳ��ֱ����ק��Ȼ��ѡ��Ҫ���ĵĵط����Ҽ���ʹ����Դ�ļ����룬�Ϳ��Ը������еľ������ֺͰ�ť��-->
	<!--��һ���֣�������ť��������һ�����ĵ�һ�У���һ��Ӧ�þ��㹻װ�����а�ť������װ���µģ����������ϵ-->
	
	<div>
	<tiles:insert attribute="navigation"/>
	</div>
    <!--��������:������ʾ��������ϸ��ʾ����,��������ж�����,��ģ�����������Ϊ��,һ���������ʾ����,һ���������ʾ��ϸ-->

	
	<tiles:insert attribute="btnarea"/>
	<tiles:insert attribute="queryarea"/>
	<!--���table1,div��ǩidΪtbl-container1,table1��idΪ"tbl1",���������\Library\data_table3.lib--><!--������ʾ��ϸ�ı��-->
		<!--���table2,div��ǩidΪtbl-container2,table2��idΪ"tbl2",���������\Library\data_table3.lib-->
	<div style="position:relative;"><tiles:insert attribute="data_main"/></div>
	<div><tiles:insert attribute="data_detail"/></div>
	<div><!-- TemplateBeginEditable name="EditRegion11" -->�ɱ༭����2<!-- TemplateEndEditable --></div>
    <div id="showhelp" style="display:none;"><!-- TemplateBeginEditable name="��д��ҳ����˵��" -->��ʾҳ�����<!-- TemplateEndEditable --></div></div>
	 
</div>
</body>
</html>
