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
<script type="text/javascript" src="<%=basePath%>/js/jquery-1[1].3.1.js"></script>
<script type="text/javascript" src="<%=basePath%>/ltext/ltext_core.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/choose.js"></script>

<body class="pop_body">
	<form name="mainListForm" id="mainListForm" action="#" method="post">
		<input type="hidden" id="menuid" name="menuid"/>
		<div id="popPage">
				<div id="shenhe_title">
					<div id="shenhe_title_middle"></div>
				</div>
				<div id="pop_search" style="padding-bottom: 2px">
					<input type='text' id='searchcontent' onkeyup="filtertree(this.value)"/>
				</div>
				<div id="pop_inner" style="height:370px;"></div>
				<div id="pop_button">
						<center>
					    <input type="button" value="检测" onclick="beginCheck();" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'"/>
					</center>
				</div>
		</div>
	</form>
</body>

<script>
var menus = <%=request.getAttribute("mainMenus")%>;
show();
/*
var d = new Object();
var leftMzTree = new MzTreeView();
JQ(document).ready(function(){
		var h = JQ('#subtree').parent().height();
		JQ('#subtree').css({ height:h-10 });
		var elementcodetree = <c:out value="${mainMenus}" escapexml="false"/>;
		elementcodetree["-1_0"]="text:abcdroot"
		leftMzTree.dataSource = elementcodetree;
		leftMzTree.autoSort = true;
		leftMzTree.useCheckbox = true;
		leftMzTree.canOperate = true;
		leftMzTree.lastNode = "";
		leftMzTree.checkflag = false;
		leftMzTree.checkboxonclick = function(tree){
		    var ids = "";
			for (var i in tree.nodes) {
				if (tree.nodes[i].checked && tree.nodes[i].sourceIndex!="-1_0" && tree.nodes[i].text!="") {
					ids += (ids.length>0?",":"")+ tree.nodes[i].id;
				}
			}
			document.getElementById("menuid").value = ids;
		}
		document.getElementById("pop_inner").innerHTML=leftMzTree.render();
		leftMzTree.expandLevel(1);
		closeDiv();
	});
*/
var _qtree = null;
window.onload=function(){
		_qtree=new Ext.lt.Qtree({
			data:menus,
			selectmode:'n',
			showRootNode:true,
			linkchild:true,
			outformart:'#name',
			classname:'pop',
			showRootNode:false,
			viewmodel:'list',
			expand:'click',
			clickexpandlevel:-1,
			bodydblselect:true,
			on:{
			    // 双击选中
				'dblclick':function(tree){
					closeMWindow(true);
				}
			}
		});
		_qtree.draw(pop_inner);
		closeDiv();
}
//过滤条件
function filtertree(f){
		_qtree.setFilter([{field:'name',values:f},{field:'code',values:f},{field:'pinyin',values:f}],'contain');
}	
//开始检测
function beginCheck(){
	var menuids = document.getElementById("menuid").value;
	//如果没有选中择检测所有系统
	if(menuids == ""){
		var source = _qtree.getSelected();
		if(0 == source.length) {
			source = _qtree.getAllData();
		}
		var arr = [];
		for (var i=0; i<source.length; i++) {
			arr.push(source[i].itemid);
		}
		menuids = arr.join(",");
		document.getElementById("menuid").value = menuids;
	}
	window.opener.query(menuids);
	window.close();
}
</script>