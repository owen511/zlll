<%@ page language="java" contentType="text/html; charset=GBK"
	pageEncoding="GBK" buffer="1400k"%>
<jsp:directive.page import="java.util.Map" />
<jsp:directive.page
	import="gov.mof.fasp.ifmis.system.configspace.ConfigElement" />
<%@ taglib uri="/WEB-INF/struts-tiles.tld" prefix="tiles"%>
<%@ page import="gov.mof.fasp.ifmis.common.Globals"%>
<%@ page import="gov.mof.fasp.ifmis.common.JsLoader"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>

<%
    response.setHeader("Cache-Control", "no-cache");
    response.setHeader("Pragma", "no-cache");
    response.setDateHeader("Expires", 0);

    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + request.getContextPath();
    String styleName = "stylefontS.css";
    if (session.getAttribute("StyleName") != null) {
        styleName = (String) session.getAttribute("StyleName");
    }
    String datatablejs = "datatable.js";
    String linkname = "";
    ConfigElement configElement = (ConfigElement) request
            .getAttribute("UIConfigElement");
    if (configElement != null && configElement.get("LINKNAME") != null) {
        linkname = configElement.get("LINKNAME").toString();
    }
    if (linkname.indexOf("/salary/salariesmanage/*") > -1
            || linkname.indexOf("/salary/salariesmanage/edit.do") > -1
            || linkname.indexOf("/salary/derivation/salariesmanage/*") > -1) {
        datatablejs = "datatable_1.1.js";
    }
    long modifytime = JsLoader.modifyTime();
    int clientWidth = JsLoader.getCookieInt(request, "clientWidth");
    if (clientWidth == 0) clientWidth = 1020;
    int clientHeight = JsLoader.getCookieInt(request, "clientHeight");
    if (clientHeight == 0) clientHeight = 764;
    int windowtopHeight = 120;
    int lefttreeWidth = 160;
    int switchBarWidth = 8;
    int bottomHeight = clientHeight - windowtopHeight;
    int mainWidth = clientWidth - lefttreeWidth - switchBarWidth - 10;
%>


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 6.0 Transitional//EN">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="X-UA-Compatible" content="IE=7" />

		<OBJECT WIDTH="1" HEIGHT="1" ID="RemoveIEToolbar"
			CLASSID="CLSID:2646205B-878C-11d1-B07C-0000C040BCDB" VIEWASTEXT>
			<PARAM NAME="ToolBar" VALUE="0">
			<PARAM NAME="StatusBar" VALUE="1">
			<PARAM NAME="MenuBar" VALUE="0">
		</OBJECT>
		<script type="text/javascript">
			var info_load={};
			info_load.publics=[];//每个js/css加载时间  {name:string,time:int};
			info_load.ocxs=[];//每个ojbect(ocx等控件)加载时间  {name:string,time:int};
			info_load.public=new Date();
			info_load.all=new Date();
			var _ROOT_PATH_='<%=basePath%>';
			var windot_top=null;
			var col=[];
		</script>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>/ltext/datatabletheme.css" />
		<link rel="stylesheet" type="text/css" href="<%=basePath%>/ltext/datatabletheme35.css" />
		<link rel="stylesheet" type="text/css" href="<%=basePath%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css?t=<%=modifytime%>" />
		<link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=basePath%>/style/<%=styleName%>?t=<%=modifytime%>" />
		<link rel="stylesheet" type="text/css" href="<%=basePath%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_LOGO%>_logo.css?t=<%=modifytime%>" />
		<link type="text/css" rel="stylesheet" href="<%=basePath%>/style/jquery.autocomplete.css?t=<%=modifytime%>" />
		<link rel="stylesheet" type="text/css" href="<%=basePath%>/style/calendar.css?t=<%=modifytime%>" />
		<link rel="stylesheet" type="text/css" href="<%=basePath%>/overview/style/style.css?t=<%=modifytime%>" />
		<link rel="stylesheet" type="text/css" href="<%=basePath%>/overview/style/overview.css?t=<%=modifytime%>" />
		<script type="text/javascript" src="<%=basePath%>/js/prototype.js?t=<%=modifytime%>"></script>
		<script type="text/javascript" src="<%=basePath%>/js/jquery-1[1].3.1.js?t=<%=modifytime%>"></script>
		<script type="text/javascript" src="<%=basePath%>/js/jquery.md5.js?t=<%=modifytime%>"></script>
		<script type="text/javascript" src="<%=basePath%>/js/jquery.editable-select.js?t=<%=modifytime%>"></script>
		<script type="text/javascript" src="<%=basePath%>/js/choose.js?t=<%=modifytime%>"></script>
		
		
		<script type="text/javascript" src="<%=basePath%>/js/ftiens4.js?t=<%=modifytime%>"></script>
		
		<script type="text/javascript" src="<%=basePath%>/ltext/frameworksupport.gzjs?t=<%=modifytime%>"></script>
		<script type="text/javascript" src="<%=basePath%>/ltext/FusionCharts.js"></script>
		<script type="text/javascript" src="<%=basePath%>/js/calendar.js?t=<%=modifytime%>"></script>
		<script type="text/javascript" src="<%=basePath%>/ltext/ltext_core.js"></script>
		<script type="text/javascript" src="<%=basePath%>/js/changescroll.js?t=<%=modifytime%>"></script>
		<script type="text/javascript" src="<%=basePath%>/ltext/ltext_template.js"></script>
		<script type="text/javascript" src="<%=basePath%>/js/template.js?t=<%=modifytime%>"></script>
		<script type="text/javascript" src="<%=basePath%>/ltext/datatable3.0.js"></script>
		<script type="text/javascript" src="<%=basePath%>/ltext/editpanel.js"></script>
		<script type="text/javascript" src="<%=basePath%>/ltext/editdatatable.js"></script>
		<script type="text/javascript" src="<%=basePath%>/ltext/componentview/ltext_fileupload.js"></script>
		<script type="text/javascript" src="<%=basePath%>/ltext/swfupload/jslib/fupload.js"></script>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>ltext\swfupload\css\default.css" />
		

		<SCRIPT LANGUAGE="JavaScript">
	
		
	/**
	 * 阻止js事件的冒泡
	 */
	function stopBubble(e){ 
		 //一般用在鼠标或键盘事件上 
	     if(!isIE){ 
	     	e.preventDefault();
	     	e.stopPropagation();
	     }else{ 
	         //IE取消冒泡事件 
	         window.event.cancelBubble = true; 
	     } 
	 }
<!--
	var ROOT_PATH = "<%=basePath%>";
	var linkvchtypeid = '<%=request.getAttribute("linkvchtypeid")%>';

	//获取Code全局变量
	var codeShowConfigs = new Array();
	var codeShowConfigs_ =<%=request.getAttribute("CODESHOWCONFIG")%> ;
	if(codeShowConfigs_ != null){
		codeShowConfigs = codeShowConfigs_;
	}
	//系统CODE配置参数
	var codeShowFlag =<%=request.getAttribute("CODESHOWFLAG")%> ;
	//系统报表组件是否允许自动安装
	var rptOcxIsAuto ='<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_RPTOCXAUTO%>';



//-->
</SCRIPT>


		<title>
			财政管理一体化信息系统(IFMIS)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp
		</title>
	</head>
	<body style="margin: 0px;">
		<tiles:insert definition="windowtop" />
		<div id="hidden_top" align="center">
			<span id="hiddenTopBar" title="隐藏上部"
				onClick="doHiddenTop(this);Ext.lt.layout.doLayout()"></span>
		</div>
		<div
			style="position: absolute; background-color: #8BA3DA; z-index: 9999; display: none; cursor: col-resize;"
			id="splitter"></div>
		<div id="div_all" layout="{w:{fit:true,min:800},h:{fit:'auto',min:450}}"
			style="position: relative; background-color: #CCCCCC; overflow: hidden; width: <%=clientWidth%>px; height: <%=bottomHeight%> px;">
			<div id="left_tree" layout="{h:{fit:true}}"
				style="display: block; float:left; overflow-y: scroll; width: <%=lefttreeWidth%>px; height: <%=bottomHeight%>px">
				<tiles:insert page="/template/treemenu.do" />
			</div>
			<div id="switchBar" layout="{h:{fit:true},w:{fit:<%=switchBarWidth%>}}"
				style="display: block; float:left; overflow: hidden; width: <%=switchBarWidth%>px; height: <%=bottomHeight%>px">
				<table width="100%" height="100%" border="0" cellspacing="0"
					cellpadding="0">
					<tr>
						<td align="center" id="hidden_left">
							<span id="hiddenLeftBar" class="hideLeftBar" title="隐藏左侧树"
								onClick="doHiddenLeft(this);Ext.lt.layout.doLayout()"></span>
						</td>
					</tr>
				</table>
			</div>
				<link href="<%=basePath%>/perspective/style/style.css" rel="stylesheet"
			type="text/css" />
			<div id="main" layout="{h:{fit:true},w:{fit:'auto'}}"
				style="width: <%=mainWidth%> px; float:left; height: <%=bottomHeight%> px;">
				<div id="tree_inner" oncontextmenu="return false;"></div>
				<tiles:insert page="/template/navigation.do" />
				<div id ="context" layout='{h:{fit:"auto"}}' style='overflow: hidden;'>
					<div id='template_main' layout='{h:{fit:true},w:{fit:true}}' style="margin-left:  5px;">
					</div>
					<tiles:insert page="/common/_blank.html"/>
					<div class="bottomdiv">&nbsp;</div> 
				</div>
			</div>
		</div>
		<script>screeMaintain();</script>
	</body>
	<script>
//临时8007测试改进控件加载方法，测试完成后删除这段script
//var ltrptocx = Ext.lt.ifmis.activex.loadLTReportOcx(); 
//var WebPrinter = Ext.lt.ifmis.activex.loadJQReportOcx();
//var AppCaller = Ext.lt.ifmis.activex.loadAppCallerOcx();
</script>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>/overview/style/style.css?t=<%=modifytime%>" />
		<link rel="stylesheet" type="text/css" href="<%=basePath%>/overview/style/overview.css?t=<%=modifytime%>" />

</html>
<%
    String mainmenu = "";
    if (request.getParameter("mainmenu") != null
            && request.getParameter("mainmenu") != "") {
        mainmenu = request.getParameter("mainmenu").toString();
    }

    //财政
    String financial = "";
    if (session.getAttribute("financial") != null) {
        financial = session.getAttribute("financial").toString();
    }
    if (mainmenu.equals("30000") || mainmenu.equals("28000")) {
%>
<%
    if (financial != null && financial != "") {
%>
<script>				
        		document.title = "财政管理一体化信息系统(IFMIS)  财政："+'<%=financial%>';
			</script>
<%
    }
    }
%>

<%
    //自定义标题头
    String customtitle = Globals.IFMIS_CUSTOMTITILE;
    if (null != customtitle && !"".equals(customtitle)) {
%>
<script>				
	       		document.title = '<%=customtitle%>';
		</script>
<%
    }
%>

<script>
	Ext.lt.message.hook("layout","endlayout",function(){
			var formtitle = JQ("#form_table_title");
			formtitle.width(formtitle.parent().width()*0.98);
	});
	Ext.lt.layout.on(fnload);
</script>
<script type="text/javascript">
Ext.lt.template.drawDiv=document.getElementById('template_main');

</script>
<%=request.getAttribute("page_content")%>
<script type="text/javascript">
info_load.all=new Date()-info_load.all;

function showCalendar(el, format, showsTime, showsOtherMonths, theElement) {
   // var el = document.getElementById(id);
    if (_dynarch_popupCalendar != null) {
        // we already have some calendar created
        _dynarch_popupCalendar.hide();                 // so we hide it first.
    } else {
        // first-time call, create the calendar.
        var cal = new Calendar(1, null, selected, closeHandler);
        // uncomment the following line to hide the week numbers
        // cal.weekNumbers = false;
        if (typeof showsTime == "string") {
            cal.showsTime = true;
            cal.time24 = (showsTime == "24");
        }
        if (!showsOtherMonths) {
            cal.showsOtherMonths = false;
        }
        _dynarch_popupCalendar = cal;                  // remember it in the global var
        cal.setRange(1900, 2050);        // min/max year allowed.
        cal.create();
    }
    _dynarch_popupCalendar.setDateFormat(format);    // set the specified date format
    _dynarch_popupCalendar.parseDate(el.value);      // try to parse the text in field
    _dynarch_popupCalendar.sel = el;                 // inform it what input field we use
    // Modified by RaTKiNG 2008-05-24
    //_dynarch_popupCalendar.showAtElement(el.nextSibling, "Br"); // show the calendar
    if (theElement) {
        _dynarch_popupCalendar.showAtElement(theElement, "Br"); // show the calendar
    } else {
        _dynarch_popupCalendar.showAtElement(el, "Br"); // show the calendar
    }

    return false;
}
Calendar.prototype.parseDate = function(str, fmt) {
    if (!fmt)
        fmt = this.dateFormat;
        var d=Date.parseDate(str, fmt)
        if(d==null)d=new Date();
    this.setDate(d);
};
</script>