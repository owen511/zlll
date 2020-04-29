<%@page language="java" import="java.util.*" pageEncoding="GBK" isErrorPage="true"%>
<%@page import="gov.mof.fasp.ifmis.system.saveerror.action.ErrorLogManager" %>
<%response.setStatus(HttpServletResponse.SC_OK);%>
<%
    String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path;
    // ȷ�������������ҳ��
    gov.mof.fasp.ifmis.common.WebUtils.clearBrowerCache(response);
    Enumeration e = request.getParameterNames();
    List list = new ArrayList();
    while (e.hasMoreElements()) {
    	Map m = new HashMap();
   		String name = (String)e.nextElement();
   		String value = request.getParameter(name);
   		m.put(name, value);
   		list.add(m);
  	}
  	String mainmenu = "";
  	String submenu = "";
  	String fromurl = "";
  	if (request.getParameter("mainmenu") != null) {
  		mainmenu = String.valueOf(request.getParameter("mainmenu"));
  	}
  	if (request.getParameter("submenu") != null) {
  		submenu = String.valueOf(request.getParameter("submenu"));
  	}
  	if (request.getAttribute("path") != null) {
  		fromurl = String.valueOf(request.getAttribute("path"));
  	}
  	// ������IP���˿ں�
  	String ipport = request.getServerName()+":"+String.valueOf(request.getServerPort());
  	//Ŀ��·��
  	String tourl = "";
  	String managerStr = ErrorLogManager.getErrorManager();
%>
<head>
<title>����ҳ��</title>
<link type="text/css" rel="stylesheet"	href="<%=basePath%>/style/ifmis_style.css" />
<script type="text/javascript" src="<%= basePath %>/js/choose.js"></script>
<script type="text/javascript" src="<%= basePath %>/js/jquery-1[1].3.1.js"></script>
</head>
<body style="overflow: scroll;">
	<div style="width:100%; height:100%;overflow: scroll;">
		<div class="erroroutter">
			<p class="fourerror"></p>
			<p class="font_nomal">��ʹ�õ�ҳ����ִ�������ϵ&nbsp;<span>����Ա:</span></p>
			<p class="font_blue"><%=managerStr %></p>
			<p class="font_nomal">�Խ�����⡣</p>
			<p class="btnarea">
				<button id="reback" onclick="window.history.go(-1)" class="returnbtn" onmouseover="this.className='returnbtn_over'" onmouseout="this.className='returnbtn'"></button>
			</p>
		</div>
	</div>
</body>
<script>
	var mainmenu = '<%=mainmenu%>';
	var submenu = '<%=submenu%>';
	var fromurl = '<%=fromurl%>';
	var postdata = '<%=list%>';
	var ipport ='<%=ipport%>'
	var errorlog = '<%=tourl%>'+"δ����";
	var d ={mainmenu:mainmenu, submenu:submenu, fromurl:fromurl, errorlog:errorlog, postdata:postdata,errortype:"404",ipport:ipport};
	JQ.ajax({
		type:"post",
		url:"/common/error/saveErrorLog.do",
		contentType:"application/x-www-form-urlencoded; charset=utf-8",
		data:d
	});
</script>
