<%@ page language="java" contentType="text/html; charset=GBK"
	pageEncoding="GBK"%>
<jsp:directive.page import="java.util.HashMap" />
<jsp:directive.page import="gov.mof.fasp.ca.user.UserDTO" />
<jsp:directive.page import="gov.mof.fasp.sec.util.SecureUtil" />
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>

<%
	response.setHeader("Cache-Control", "no-cache");
	response.setHeader("Pragma", "no-cache");
	response.setDateHeader("Expires", 0);

	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
	
	UserDTO jnlpUser = SecureUtil.getCurrentUser();	    	
    String year = SecureUtil.getUserSelectYear();   
    String usercode = jnlpUser.getCode();   
    String pws = jnlpUser.getPassword();   
    //给龙图报表传递授权用户Id
    String accuserid = "0";
    if(SecureUtil.getAuthUser()!=null){
        accuserid = "" + SecureUtil.getAuthUser().getAccuserid();
    }
       
    String protocol = request.getScheme();   
    String ip = request.getServerName();   
    int port = request.getServerPort();   
    String context = request.getContextPath();
    sun.misc.BASE64Encoder encoder = new sun.misc.BASE64Encoder(); 
    String reportexturl = "&year="+year+"&protocol="+protocol+"&ip="+ip+"&port="+port+"&context="+context+"&usercode="+usercode+"&pws="+pws+"&accuserid="+accuserid;
    reportexturl= encoder.encode(reportexturl.getBytes("UTF-8")).replaceAll("\r\n", "");
    reportexturl= reportexturl.replaceAll("\n", "");
%>

<script type="text/javascript">
var reportexturl ="<%=reportexturl%>";
function op(){
}

var REPORT_VERSION = '<%=request.getAttribute("reportversion")%>';
<%
	String ltrpt_webstart_version="3,1,0,0";
	if(request.getAttribute("ltrpt_webstart_version")!=null&&!((String)request.getAttribute("ltrpt_webstart_version")).equals("")) {
		ltrpt_webstart_version = (String)request.getAttribute("ltrpt_webstart_version");
	}
%>
window.LTRPT_WEBSTART_VERSION = "<%=ltrpt_webstart_version%>"; 

var treemenujson=<%=request.getAttribute("treemenujson")%>;
var treerootmenujson=<%=request.getAttribute("treerootmenujson")%>;
var submenuid='<%=request.getParameter("submenu")%>'
var mainmenuid='<%=request.getParameter("mainmenu")%>'
//业务系统介绍
var tasIntroduces=<%=request.getAttribute("tasIntroduces")%>;
//左侧菜单跳转
var leftmenusos=<%=request.getAttribute("leftmenusos")%>;
var uid='<%=request.getAttribute("uid")%>';
var sid='<%=request.getAttribute("sid")%>';
var loginyear='<%=request.getAttribute("loginyear")%>';
var lastClickRpt = null;
</script>
<link rel="stylesheet" type="text/css" href="/ltext/datatabletheme.css" />
<div id=submenutree layout="{h:{fit:true},w:{fit:'auto'}}">
	<script>//initializeDocument()</script>
	<noscript>
		A tree for site navigation will open here if you enable JavaScript in
		your browser.
	</noscript>
</div>
<script type="text/javascript" src="<%=basePath%>/portal/js/login/portal_common.js"></script>
<script>
Ext.lt.onload(function(){
	//gaiwenquan 修改ie6下全屏按钮区域被遮住 
	try{
		var _context = document.getElementById('context');
		var _childs = _context.children;
		var _lastChild = _childs[_childs.length-1];
		if(_lastChild.className=="bottomdiv"){
			_context.removeChild(_lastChild);
		}
	}catch(e){}
	var left_tree=document.getElementById("left_tree")
	left_tree.style.overflowY='hidden';
	left_tree.style.paddingLeft='3px';
	try{
		Ext.lt.layout.doLayout();
	}catch(e){}
	var submenutreediv=document.getElementById('submenutree');
	qmenutree=new Ext.lt.Qtree({
				data:treemenujson,
				rootNode:treerootmenujson,
				showRootNode:treerootmenujson!=null,
				outformart:'<a href="#url" onclick="return clickqmenutree(this);" dataid="#itemid" title="#text">#text</a>',
				values:[submenuid],
				classname:'ifmissubmenu',
				clickexpand:true
				,on:{
					'nodeclick':function(tree,param){
					}
				}
		});
	qmenutree.draw(submenutreediv);
	//submenutreediv.style.overflowX='hidden'
	submenutreediv.style.width=left_tree.style.width;
})
</script>