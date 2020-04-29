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

	//由“代办事项”链接点击进入 wy add 20091020
	String submenu = "";
	if (request.getParameter("submenu") != null
			&& request.getParameter("submenu") != "") {
		submenu = request.getParameter("submenu");
	}
	
	UserDTO jnlpUser = SecureUtil.getCurrentUser();	    	
    String year = SecureUtil.getUserSelectYear();   
    String usercode = jnlpUser.getCode();   
    String pws = jnlpUser.getPassword();   
       
    String protocol = request.getScheme();   
    String ip = request.getServerName();   
    int port = request.getServerPort();   
    String context = request.getContextPath();
    sun.misc.BASE64Encoder encoder = new sun.misc.BASE64Encoder(); 
    String reportexturl = "&year="+year+"&protocol="+protocol+"&ip="+ip+"&port="+port+"&context="+context+"&usercode="+usercode+"&pws="+pws;
    reportexturl= encoder.encode(reportexturl.getBytes("UTF-8")).replaceAll("\r\n", "");
    reportexturl= reportexturl.replaceAll("\n", "");
%>

<script type="text/javascript">
var reportexturl ="<%=reportexturl%>";


function op(){

}
USETEXTLINKS = 1;

STARTALLOPEN = 0;

ICONPATH = '<%=basePath%>/images/tree/';
USEFRAMES = 0;
PRESERVESTATE = 1;
HIGHLIGHT = 1;


foldersTree = gFld("<b><c:out value="${mainmenu.name}"/></b>", "");
foldersTree.treeID = "<c:out value="${mainmenu.menuid}"/>";
foldersTree.iconSrc = ICONPATH + "home_contract.gif";
foldersTree.iconSrcClosed = ICONPATH + "home_expand.gif";

<%
gov.mof.fasp.ca.menu.MenuDTO mainmenu = (gov.mof.fasp.ca.menu.MenuDTO)request.getAttribute("mainmenu");

HashMap map = new HashMap();
java.util.List treemenus = (java.util.List)request.getAttribute("treemenus");
if(treemenus != null){
	gov.mof.fasp.ca.menu.MenuDTO menu = null;
	
	//ganhua 2009-3-26 增加支持弹出新窗口显示连接，弹出显示报表需要
	String targetFlag = "T";
	
	for (java.util.Iterator i = treemenus.iterator(); i.hasNext();) {
		menu = (gov.mof.fasp.ca.menu.MenuDTO)i.next();
		if(menu.getParam4() != null && menu.getParam4().equalsIgnoreCase("B"))
		{
			targetFlag = "B";
		}else{
			targetFlag = "T";
		}
		if(menu.getIsleaf().intValue() ==0){
			// 不是末级节点 aux1 = insFld(foldersTree, gFld("总指标加载", "javascript:parent.op()"));
			String varName = (String)map.get(menu.getParentid()+"");
			if(varName == null){
				varName = "foldersTree";
			}
			//modified by xyq,实现多层菜单树
			out.println("aux_"+menu.getMenuid()+" = insFld("+varName+", gFld(\""+menu.getName()+"\", \"\"));");
			//out.println("aux_"+menu.getMenuid()+" = insFld(foldersTree, gFld(\""+menu.getName()+"\", \"\"));");
			map.put(menu.getMenuid()+"","aux_"+menu.getMenuid());
		}
		else{
			// 末级节点 insDoc(aux1, gLnk("T", "录入", "../../indi/totalindiload/totalindiload_index.html"));
			String varName = (String)map.get(menu.getParentid()+"");
			if(varName == null){
				varName = "foldersTree";
			}
			if(mainmenu== null){
			    if(menu.getClientmodule()!= null&&menu.getClientmodule().indexOf("?")>0)
			    {
					out.println("insDoc("+varName+", gLnk(\""+targetFlag+"\", \""+menu.getName()+"\", \""+basePath+menu.getClientmodule()+"&submenu="+menu.getMenuid()+"\"));");
				}else{
				    out.println("insDoc("+varName+", gLnk(\""+targetFlag+"\", \""+menu.getName()+"\", \""+basePath+menu.getClientmodule()+"?submenu="+menu.getMenuid()+"\"));");			
				}
			}
			else{
			    if(menu.getClientmodule()!= null&&menu.getClientmodule().indexOf("?")>0)
			    {
			        if(menu.getClientmodule().startsWith("javascript:openReport('"))
			        {
						out.println("insDoc("+varName+", gLnk(\""+targetFlag+""+"\", \""+menu.getName()+"\", \""+"javascript:openReport('"+basePath + menu.getClientmodule().substring(23)+"&mainmenu="+mainmenu.getMenuid()+"&submenu="+menu.getMenuid()+"')\"));");
					}else{
					    out.println("insDoc("+varName+", gLnk(\""+targetFlag+"\", \""+menu.getName()+"\", \""+basePath+menu.getClientmodule()+"&mainmenu="+mainmenu.getMenuid()+"&submenu="+menu.getMenuid()+"\"));");
					}
				}else{
				    out.println("insDoc("+varName+", gLnk(\""+targetFlag+"\", \""+menu.getName()+"\", \""+basePath+menu.getClientmodule()+"?mainmenu="+mainmenu.getMenuid()+"&submenu="+menu.getMenuid()+"\"));");
				}
			}
		}
	}
}
%>
var REPORT_VERSION = '<%=request.getAttribute("reportversion")%>';
</script>
<div id=submenutree>
	<script>initializeDocument()</script>
	<noscript>
		A tree for site navigation will open here if you enable JavaScript in
		your browser.
	</noscript>
</div>
<script type="text/javascript">
<!-- 由“代办事项”点击，链接过来定位 wy add 20091020 
var clickedStr = '<%=submenu%>';
function getSubNode(curnode){
	if(!curnode.nChildren)
	   return;
	for(var i=0;i<curnode.nChildren;i++){
		var subnode = curnode.children[i];
		if(subnode.isOpen)
			subnode.setState(false);
		if(subnode.nChildren>0){   //父级节点
			getSubNode(subnode);
		}else if(subnode.nChildren ==0){  //末级节点
			var sublink = subnode.link;
			if(sublink){
				var curstr = sublink.substring(sublink.indexOf("&submenu=")+9,sublink.length);
				if(curstr == clickedStr){
					expendParentNode(subnode);
					highlightObjLink(findObj(subnode.getID()));
				}
			}
  		}
  }
}

//展开相关父级节点
function expendParentNode(cnode){
    var parent = new Array();
    var parentNode = cnode;
    //将父节点封装到数组
	for(var i=0 ;i<cnode.level-1;i++){
	   parentNode = parentNode.parentObj;
	   parent.push(parentNode);
	}
	//按顺序展开数组
	for(var j=parent.length ;j>-1;j--){
		if(!parent[j])
		    continue;
		if(!parent[j].isOpen)
			parent[j].setState(true);	
		expendParentNode(parent[j]);	
	}
}
getSubNode(foldersTree);
//-->
</script>
