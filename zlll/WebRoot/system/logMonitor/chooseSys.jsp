<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
<link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=request.getContextPath()%>/style/stylefontS.css" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_LOGO%>_logo.css"/>
<link href="<%=basePath%>/js/scripts/system/_resource/mztreeview/mztreeview.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=basePath%>/js/scripts/jsframework.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/scripts/system/data/mzdata.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/scripts/system/web/forms/mzeffect.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/scripts/system/web/ui/webcontrols/mztreeview.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/jquery-1[1].3.1.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/choose.js"></script>

<body class="pop_body">
	<form name="mainListForm" id="mainListForm" action="#" method="post">
		<input type="hidden" id="menuid" name="menuid"/>
		<div id="popPage">
				<div id="shenhe_title">
					<div id="shenhe_title_middle"></div>
				</div>
				<div id="pop_inner" style="height:400px;"></div>
				<div id="pop_button">
				<center>
					    <input type="button" onclick="closeMWindow();" value="确定" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'" />&nbsp;&nbsp;&nbsp;
						<input type="button" onclick="window.close();" value="取消" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'" />
				</center>
				</div>
		</div>
	</form>
</body>

<script>
function createPopDiv(){
 //覆盖框架MZtree右键弹出菜单事件.-jzy
}
show();
var d = new Object();
var a = new MzTreeView();
var codeArray = window.opener.document.getElementById('sysID').value.split(',');
JQ(document).ready(function(){
		var h = JQ('#subtree').parent().height();
		JQ('#subtree').css({ height:h-10 });
		var elementcodetree = <c:out value="${mainMenus}" escapexml="false"/>;
		elementcodetree["-1_0"]="text:abcdroot"
		a.dataSource = elementcodetree;
		a.autoSort = true;
		a.useCheckbox = true;
		a.canOperate = true;
		a.lastNode = "";
		a.checkflag = false;
		a.checkboxonclick = function(tree){
		    var ids = "";
			for (var i in tree.nodes) {
				if (tree.nodes[i].checked && tree.nodes[i].sourceIndex!="-1_0" && tree.nodes[i].text!="") {
					ids += (ids.length>0?",":"")+ tree.nodes[i].id;
				}
			}
			document.getElementById("menuid").value = ids;
		}
		document.getElementById("pop_inner").innerHTML=a.render();
		a.expandLevel(1);
	//	debugger;
		closeDiv();
		//debugger;
/*		for (var i in a.nodes) {
			for(var j=0;j<codeArray.length;j++){
				if (codeArray[j]==a.nodes[i].id) {
					a.nodes[i].checked=true;
				}
				}
			}*/
	});
function closeMWindow(){
	var result = getTreeSelect(true);
	if(window.opener){
	window.opener.document.getElementById('systemmenu').value=result.value;
	var tmpStr=result.valuecode;
	tmpStr=tmpStr.substr(tmpStr.indexOf(','));
	window.opener.document.getElementById('sysID').value=tmpStr;
	//alert(window.opener.document.getElementById('sysID').value);
	}
	window.close();
}
</script>