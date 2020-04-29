<%@ page language="java" contentType="text/html; charset=GBK" pageEncoding="GBK"%>
<%@ page import="gov.mof.framework.util.DBUtil"%>
<%@ page import="java.util.HashMap"%>
<%@ page import="java.util.Map"%>
<%@ page import="gov.mof.fasp.systemset.dto.SystemSetDTO"%>
<%@ page import="gov.mof.fasp.systemset.bpo.ISystemSetService"%>
<%@ page import="gov.mof.fasp.ifmis.common.Globals"%>
<%
  response.setHeader("Cache-Control","no-cache"); 
  response.setHeader("Pragma","no-cache"); 
  response.setDateHeader("Expires",0); 
  String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
  ISystemSetService systemSetService = (ISystemSetService) DBUtil.getBeanByName("fasp.systemset.systemSetBPO");
  String timeout = "-1";
  try{
		SystemSetDTO systemSetDTO = systemSetService.findSystemSetByCode("common_timeout");
		if(systemSetDTO!=null&&systemSetDTO.isIsused())timeout = systemSetDTO.getParamdata();
  }catch(Exception e){}
  //0��ƽ̨���ƣ�1:��������ʾ·��2��������ʾ��ȡ�������·��
  String titlename=(String)request.getSession().getAttribute("titlename");
  //�ж��Ƿ�ʹ�ü�ʱ��Ϣ
  String ismessage=(String)request.getSession().getAttribute("isMessage");
  //��ʱ��Ϣˢ�¼��
  String msgrefreshtime=(String)request.getSession().getAttribute("msgrefreshtime");
  //��Ϣ�Ƿ�����е�����ʾ
  String popflag=(String)request.getSession().getAttribute("popflag");
  //��ʾʱ�Ƿ�ʹ��falshͼƬ
  String showflash=(String)request.getSession().getAttribute("showflash");
  //��Ϣ�����Ƿ���δ����Ϣ
  String unreadMsg=(String)request.getSession().getAttribute("unreadMsg");
  //��ʾ������
  String isShowCalculator = (String)request.getSession().getAttribute("isShowCalculator");
  //��ǰϵͳ����
  java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyy-MM-dd"); 
  String systemdate = formatter.format(new java.util.Date());
  //����������
  String titleArea = "";
  //���
  String titleYear = (String)session.getAttribute("loginacctyear"); 
  java.util.Map areamap=new java.util.HashMap();
  if(null!=session.getAttribute("loginAreaInfor") && !session.getAttribute("loginAreaInfor").equals("")){
	    areamap=(java.util.Map)session.getAttribute("loginAreaInfor");
		if(areamap.containsKey("area_name")){
			titleArea=areamap.get("area_name")!=null?areamap.get("area_name").toString():"";
		}
  }
  //�Ƿ���ʾ��������
  String onlineUser=(String)session.getAttribute("onlineUser"); 
  //��������ͳ�Ƽ��
  String onlinetime=(String)session.getAttribute("onlinetime"); 
  //�����л������
  String changeYears=(String)session.getAttribute("changeYears");
  String areaInfo=(String)session.getAttribute("areaInfo");
  String passwordvalidate = (String)request.getSession().getAttribute("passwordvalidate");
  String indexjsp = (String)request.getSession().getAttribute("indexjsp");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<meta http-equiv="X-UA-Compatible" content="IE=7" />
<title>��������һ�廯��Ϣϵͳ</title>
		<script type="text/javascript">
			var info_load={};
			info_load.publics=[];//ÿ��js/css����ʱ��  {name:string,time:int};
			info_load.ocxs=[];//ÿ��ojbect(ocx�ȿؼ�)����ʱ��  {name:string,time:int};
			info_load.all=new Date();
			var _ROOT_PATH_='<%=basePath%>';
			var ROOT_PATH=_ROOT_PATH_; 
			info_load.ocx=new Date();
		</script>
<OBJECT WIDTH="1" HEIGHT="1" ID="RemoveIEToolbar" 
    CLASSID="CLSID:2646205B-878C-11d1-B07C-0000C040BCDB" codebase="common/flyie.cab#version=1,0,0,0" VIEWASTEXT>
	 <PARAM NAME="ToolBar" VALUE="0">
	 <PARAM NAME="StatusBar" VALUE="1">
	 <PARAM NAME="MenuBar" VALUE="0">    
</OBJECT>
	<object  id="ocxukey" classid="clsid:CC9AB409-D49F-4574-B07C-DD316E3114AD"  style="display:none">
	</object>
<%if("30".equals(indexjsp)||"31".equals(indexjsp)){%>
    <OBJECT ID="ATL1" CLASSID="CLSID:{7FBD3C43-8609-4C8F-B46D-0633BEC7BC83}" codebase="<%=basePath%>/portal/setstate.cab#version=3,0,17,2">  
  </OBJECT> 
<%}%>
<script type="text/javascript">
			info_load.ocx=new Date()-info_load.ocx;
			info_load.public=new Date();
			var msgrefreshtime='<%=msgrefreshtime%>';
			var systemdate='<%=systemdate%>';
			var unreadMsg='<%=unreadMsg%>';
			var indexjsp = '<%=indexjsp%>';
			var titleYear='<%=titleYear%>';
			var changeYears=eval('<%=changeYears%>');
			var allAreaInfo='<%=areaInfo%>';
			var areaInfo=eval('<%=areaInfo%>');
			//ϵͳ��������Ƿ������Զ���װ
			var rptOcxIsAuto ='<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_RPTOCXAUTO%>';
			var titlename='<%=titlename%>';
			var titleArea='<%=titleArea%>';
			if(titlename=='1'){
				document.title="��ҳ";
			}else if(titlename=='2'&&titleArea!=""){
		   		document.title="������<%=titleArea%>  ��ȣ�<%=titleYear%> λ�ã���ҳ";
		   	}
	   		<%
	   	    //�Զ������ͷ
	   	    String customtitle = Globals.IFMIS_CUSTOMTITILE;
	   	    if(null != customtitle && !"".equals(customtitle)){
	   	    %>
	   			document.title = '<%=customtitle%>';
	   	    <%} %>   
			var common_timeout = '<%=timeout%>';
			var passwordvalidate = '<%=passwordvalidate%>';
			//ismessage-->0:��ʹ�ü�ʱ��Ϣ��1��ʹ����Ϣ��2���ݲ�ʹ�ã�����ĳ���ر�����
			var ismessage='<%=ismessage%>';
			var popflag=<%=popflag%>;
			var showflash=<%=showflash%>;
			var isShowCalculator = <%=isShowCalculator%>;
			
			//����F5ˢ��
			function DisableF5(){   
				var d_url=document.location.href;
			   with (event){   
			           // F5 and Ctrl+R   
			     if (keyCode==116 || (ctrlKey && keyCode==82)){  
			    	 window.location='<%=basePath%>/defaultcommon.page';
					event.keyCode = 0;   
			       event.cancelBubble = true;   
			       return false;   
			     }   
			   }   
			} 
			document.onkeydown = DisableF5;
</script> 
<%
  //�Ƿ�ʹ��ѹ����ʽ��css js
  String isCompression = (String)request.getSession().getAttribute("isCompression");
//ҳ�����
String configs1=request.getSession().getAttribute("indexjsp")!=null?(String)request.getSession().getAttribute("indexjsp"):"";
if(("1").equals(isCompression)&&configs1.indexOf("31")==-1){
  	%>
  	<link rel="stylesheet" type="text/css" href="<%=basePath%>/ltext/style/ext-all.gzcss"/> 
	<script type="text/javascript" src="<%=basePath%>/ltext/frameworksupport.gzjs"></script>
  	<%
  }else if (configs1.indexOf("31")!=-1){      
    %>
    
    <script>
    var now = new Date();    
    var year = now.getFullYear();       //��
    var month = now.getMonth() + 1;     //��
    var day = now.getDate();            //��
    var clock = year + "-";
   
    if(month < 10)
        clock += "0";
   
    clock += month + "-";
   
    if(day < 10)
        clock += "0";
       
    clock += day + " ";
    systemdate = clock;
    </script>
  	<link rel="stylesheet" type="text/css" href="<%=basePath%>/portal/style/ext-allsx.css"/> 
  	<script type="text/javascript" src="<%=basePath%>/ltext/frameworksupport.js"></script>
  	<%
  }else{
%>
	<link rel="stylesheet" type="text/css" href="<%=basePath%>/ltext/style/ext-all.css"/> 
  	<script type="text/javascript" src="<%=basePath%>/ltext/frameworksupport.js"></script>
<%}%>
  <link rel="stylesheet" type="text/css" href="<%=basePath%>/style/ifmis_style.css"/>
  <link rel="stylesheet" type="text/css" href="<%=basePath%>/portal/style/message.css"/>
  <link rel="stylesheet" type="text/css" href="<%=basePath%>/portal/style/newpendingtask.css"/>
  <link rel="stylesheet" type="text/css" href="<%=basePath%>/ltext/datatabletheme.css"/>
  <link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=basePath%>/style/stylefontL.css"/>
    	<%  
  
	if (configs1.indexOf("28")!=-1){%>
 		   <link rel="stylesheet" type="text/css" href="<%=basePath%>/portal/style/cqdb.css"/>
 	<%}else if (configs1.indexOf("31")!=-1){%>
	  <link rel="stylesheet" type="text/css" href="<%=basePath%>/portal/style/sx_default.css"/>
	<%}%>
 
  <%
		String area = gov.mof.fasp.ifmis.common.Globals.IFMIS_LOGO;
		String logo = "/style/" + area + "_logo.css";
		if ("yueyang, loudi, gansu".indexOf(area) != -1){
		    logo = "/portal/style/" + area + "_logo.css";
		}
  %>
  <link rel="stylesheet" type="text/css" href="<%=basePath%><%=logo %>"/>
  <script type="text/javascript" src="<%=basePath%>/ltext/ltext_core.js"></script>
  <script type="text/javascript" src="<%=basePath%>/ltext/ltext_template.js"></script>
  <script type="text/javascript" src="<%=basePath%>/js/template.js"></script>
  <script type="text/javascript" src="<%=basePath%>/js/choose.js"></script>
  <script type="text/javascript" src="<%=basePath%>/js/changescroll2.js"></script>
  <script type="text/javascript" src="<%=basePath%>/portal/js/login/ltext_common_menu.js"></script>
    <script type="text/javascript" src="<%=basePath%>/portal/js/ltext_calendars.js"></script>  
  <script type="text/javascript" src="<%=basePath%>/js/jquery-1[1].3.1.js"></script>
  <script type="text/javascript" src="<%=basePath%>/js/loadOcx.js"></script>
  <script type="text/javascript" src="<%=basePath%>/portal/js/login/gsSso.js"></script>
  <script type="text/javascript" src="<%=basePath%>/portal/js/login/portal_default.js"></script>
  
<script type="text/javascript">
info_load.public=new Date()-info_load.public;
</script>
</head>
<!--ie��bodyĬ���б߿�������ʽȥ���߿�  -->
<body style="margin: 0px;padding:0px;">
<%if("1".equals(ismessage)){%>
<div id="eMengbg" style="display:none;bottom:0;right:0;background:url(/portal/images/msgImages/wininfo_k.png); Z-INDEX:999;  no-repeat left top; width:278px; height:193px; POSITION: absolute;overflow:hidden;"></div>
<%} %>
<%
if("false".equalsIgnoreCase((String)request.getSession().getAttribute("passwordvalidateinit"))){
%>
<div id ="mask"></div>
<iframe id="LoadStatus" style="border:3px solid blue;" src="<%=basePath%>/portal/login/mod_passwordinit.jsp?validate=password" height="200px" width="450px" SCROLLING="no" FRAMEBORDER ="0">
</iframe>
<%
}else if("false".equalsIgnoreCase((String)request.getSession().getAttribute("passwordvalidate"))){ %>
<div id ="mask"></div>
<iframe id="LoadStatus" style="border:3px solid blue;" src="<%=basePath%>/portal/login/mod_password.jsp?validate=password" height="200px" width="450px" SCROLLING="no" FRAMEBORDER ="0">
</iframe>
<%} %>
</body>
</html>
<!--����������ֿ� -->


<%=request.getAttribute("page_content")%>
<script type="text/javascript">
info_load.all=new Date()-info_load.all;

//�Ƿ�ʹ����������ͳ��
var onlineUser='<%=onlineUser%>';
var onlinetime='<%=onlinetime%>';
if("1"==onlineUser){
	new Ext.lt.portal.component.onlineuser();
}
</SCRIPT>
<%if(!"-1".equals(timeout)){%>
<SCRIPT LANGUAGE=javascript FOR=document EVENT=onkeypress>
documentKeypress();
</SCRIPT>
<SCRIPT LANGUAGE=javascript FOR=document EVENT=onmousedown>
documentEvent();
</SCRIPT>
<%}%>