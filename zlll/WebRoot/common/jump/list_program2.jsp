<%@ page contentType="text/html; charset=GBK"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
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
<link rel="stylesheet" type="text/css" href="<%=basePath%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
<link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=basePath%>/style/<%=styleName %>" />
<link rel="stylesheet" type="text/css" href="<%=basePath%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_LOGO%>_logo.css"/>
<link type="text/css" rel="stylesheet"	href="<%=basePath%>/style/jquery.autocomplete.css" />
<link rel="stylesheet" type="text/css" href="<%=basePath%>/style/GridTree.css">
<link rel="stylesheet" id="programstyle" type="text/css" >
<script type="text/javascript" src="<%=basePath%>/js/prototype.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/choose.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/changescroll.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/overlib/overlibmws.js"  ></SCRIPT>
<script type="text/javascript" src="<%=basePath%>/js/overlib/overlibmws_filter.js" ></SCRIPT>
<script type="text/javascript" src="<%=basePath%>/js/overlib/overlibmws_shadow.js"></SCRIPT>
<script type="text/javascript" src="<%=basePath%>/js/jquery-1[1].3.1.js"></script>	
<script type="text/javascript" src="<%=basePath%>/js/jquery.autocomplete.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/hashmap.js"></script>
<script type="text/javascript" src="<%=basePath%>/ltext/ltext_core.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/gridtree/GridTree.min.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/gridtree/GridLazyTree.js"></script>

<script type="text/javascript">
var ROOT_PATH = '<%=basePath%>';
</script>
<script type="text/javascript">
var k = window.dialogArguments;
var ismutl = parent.ismutl;

//自定义查询
var vchtypecode = "<%=request.getParameter("vchtypecode")%>";
var mainmenu = "<%=request.getParameter("mainmenu")%>";
var submenu = "<%=request.getParameter("submenu")%>";
var sqlparam = "<%=request.getAttribute("sqlparam")%>";
var isQuery = "<%=request.getAttribute("isQuery")%>";
var bdgagencyid = "<%=request.getAttribute("bdgagencyid")%>";
var bdgmanagedivisionid = "<%=request.getAttribute("bdgmanagedivisionid")%>";
var tablecode = "<%=request.getAttribute("tablecode")%>";
var inQueryFlag = eval('<%=request.getAttribute("inQueryFlag")%>');
var pars = "";
var objPars = {};
if(parent.sqlwhere){
	if(sqlparam !="null"){
		sqlparam = sqlparam+" and ("+parent.sqlwhere+")";
	}else{
		sqlparam = parent.sqlwhere;
	}
}
objPars =JQ.extend(objPars,{
		sqlparam:sqlparam !="null" ? encodeURI(sqlparam) : "",
		vchtypecode:vchtypecode,
		isQuery:isQuery,
		mainmenu:mainmenu,
		submenu:submenu,
		bdgagencyid:bdgagencyid,
		bdgmanagedivisionid:bdgmanagedivisionid,
		relationprogram:tablecode,
		inQueryFlag:inQueryFlag
	}
);
pars = parent.document.location.search;
function query(){
	pageSuc = true;	  
	$('queryform').action = "<%=request.getContextPath()%>/common/jump/turnProgram.do?isProgram=yes&vchtypecode="+vchtypecode+"&submenu="+submenu+"&isQuery="+isQuery+"&mainmenu="+mainmenu+"&bdgagencyid="+bdgagencyid+"&bdgmanagedivisionid="+bdgmanagedivisionid+"&relationprogram="+tablecode
	+"&inQueryFlag="+inQueryFlag;
	$('queryform').dosubmit();
  }
 
  
//页面增加按钮控制
var codeType = '<c:out value="${codeType}"/>';
var haveCode = '<c:out value="${codeformat}"/>';
if(codeType != 2 || haveCode == null){
	JQ("#b",window.parent.document).show();
}else{
	JQ("#a",window.parent.document).show();
}
//获取Code全局变量
var codeShowConfigs = new Array();
var codeShowConfigs_ =<%=request.getAttribute("CODESHOWCONFIG") %> ;
if(codeShowConfigs_ != null){
	codeShowConfigs = codeShowConfigs_;
}
//系统CODE配置参数
var codeShowFlag =<%=request.getAttribute("CODESHOWFLAG") %> ;
 

</SCRIPT>
<html>
  <HEAD>
	<%
		String mainmenu = request.getParameter("mainmenu");
		String submenu = request.getParameter("submenu");
	%>
</HEAD>
	<body onload='getGridTree();' class='popPage1'>
			<div id="query_t">
					<span><span title="查询" class="query_btn" onclick="query()"
						onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
						onmousedown="doChangeBg1(this)"><a href="#">查询</a>
					</span>
					</span>
					<span><span title="清除查询条件" class="clear_btn" onclick="clearFormInputAll($('queryform'))"
						onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
						onmousedown="doChangeBg1(this)"><a href="#">清除查询条件</a>
					</span>
					</span>
					<span><span title="隐藏查询条件" class="hidden_btn" onclick="doQuery2(this)" onmouseover="doChangBg(this)" onmouseout="doReturn(this)"><a href="#">隐藏查询条件</a></span></span>
			</div>
			
			<form id="queryform" name="queryform" method="post" action=""  >
				<ui:queryform formid="queryform" />
			</form>
			
				<div id="form_table_title">
					<ul>
						<li class="top">
							<div>
								项目信息
							</div>
						</li>
					    <li style="float:right;" > <a id='pageTagDiv'></a> </li>
					</ul>
				</div>
				<!--请保留此div和a标签 -->
				<div id='tableTree'
				style='width: 98%; height: 515px;overflow: auto; margin-left:10px;'>
				正在查询数据，请稍侯。。。
				</div>
				<input type='hidden' name='hid_mainmenu' id='hid_mainmenu'
					value='<%=mainmenu%>' />
				<input type='hidden' name='hid_submenu' id='hid_submenu'
					value='<%=submenu%>' />
					<br>
	</body>
</html>
<script type="text/javascript">
//隐藏掉保存查询条件按钮
JQ(document).ready(function (){
	JQ("#savedefault").hide();
	JQ("#config_query").hide();
});
</script>