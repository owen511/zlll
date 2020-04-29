<%@ page language="java" contentType="text/html; charset=GBK"
	pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%
	response.setHeader("Cache-Control", "no-cache");
	response.setHeader("Pragma", "no-cache");
	response.setDateHeader("Expires", 0);
	String styleName ="stylefontS.css";	
	if(session.getAttribute("StyleName")!=null){
		 styleName = (String)session.getAttribute("StyleName");
    }
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<meta http-equiv="X-UA-Compatible" content="IE=7" />
        <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/ltext/datatabletheme.css" />
		<script src="<%=request.getContextPath()%>/ltext/ltext_core.js"></script>
		<script src="<%=request.getContextPath()%>/js/prototype.js"></script>
		<script src="<%=request.getContextPath()%>/js/choose.js"></script>
		<title>请选择&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</title>
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
        <link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=request.getContextPath()%>/style/<%=styleName %>" />
	</head>
	<body class="pop_body">
		<div id="popPage">
				<div id="shenhe_title">
					<div id="shenhe_title_middle"></div>
				</div>
				<div id="pop_search" style="padding-bottom: 2px">
					<input style="width:85%" type='text' id='searchcontent' onkeyup="filtertree(this.value)"/>
				</div>
				<div id="pop_inner"></div>
				<div id="rightMenu">
					<div id="menuItem1" onmouseover="onMOver(this)" onmouseout="onMOut(this)" class="nomal">
						反       选
					</div>
				</div>
				<div id="pop_button">
					<center>
					    <input type="button" onclick="javascript:try{closeMWindow(true)}catch(e){window.close();}" value="确定" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'" />&nbsp;&nbsp;&nbsp;
						<input type="button" onclick="javascript:try{closeMWindow(false)}catch(e){window.close();}" value="取消" class="button_style" onmouseover="this.className='OverBtn'" onmouseout="this.className='button_style'" onmousedown="this.className='down'" />
					</center>
				</div>
		</div>			
	</body>
</html>
<script>
window.onload = function(){
     if(Sys.ie=="6.0"){
         document.getElementById("pop_inner").style.height="318px";
     }else{
    	 document.getElementById("pop_inner").style.height="310px";
     }
}
function stut(obj){
	document.getElementById("searchcontent").value="";
	document.getElementById("searchcontent").style.color='#000'
}
</script>
<script>
var config = window.dialogArguments;
var treemenujson = config.treemenujson;
var values = [];
if(config!=null){
	var ckvalue = config.ckvalue;
	if(ckvalue){
		values = ckvalue.split(";");
	}
}
if(treemenujson!=null){
//try{
	var _qtree=new Ext.lt.Qtree({
		data:treemenujson,
		linkchild:true,		
		outformart:'#code-#name',
		selectmode:'n',
		values:values,
		showRootNode:true,
		
		classname:'pop',
			on:{
				// 右键反选
				'contextmenu':function(tree, curnode) {
					// 全部根结点不显示反选
					var cur = curnode.node.getAttribute("dataid");
					if(cur == "QTreeAllNode") return;
					// 右键菜单定位
					var popdiv = document.getElementById("rightMenu");
					var mousePos = mousePosition(event);
					with(popdiv.style){
						display = 'block';
						left = mousePos.x;
						top = mousePos.y+10;
					}
					// 反选
					var menu1 = document.getElementById("menuItem1");
					menu1.onclick = function () {
						var _d = tree.getAllData();
						for (var i=0,len=_d.length; i<len; i++) {
							if (typeof _d[i]["_checked"]== "undefined" || _d[i]["_checked"] == null) {
								_d[i]["_checked"] = "checked";
							} else {
								_d[i]["_checked"] = undefined;
							}
						}
						var eles = document.getElementsByTagName('INPUT')
						for (var i=0,len=eles.length; i<len; i++) {
							var eleid = eles[i].getAttribute("dataid");
							if (eleid != "QTreeAllNode" && eles[i].type=='checkbox') {
								eles[i].checked = !eles[i].checked;
							}
						}
					}
					// 隐藏右侧菜单
					document.body.onclick = function(){
						popdiv.style.display = "none";
				  }
				}
			}
	});
	_qtree.draw(pop_inner);
//}catch(){
//}
}
//过滤条件
function filtertree(f){
		_qtree.setFilter([{field:'name',values:f},{field:'code',values:f},{field:'pinyin',values:f}],'contain');
}
//关闭并得到选中值
function closeMWindow(isReturn){

	if(isReturn){
		window.returnValue = _qtree.getSelected();
	}
	else{
		window.returnValue = "cancel_";
	}
	
	var func;
	window.close();
}
function selectT(obj){
	obj.className = 'select';
}
function onMOver(obj){
	obj.className = 'Mover';
}
function onMOut(obj){
	obj.className = 'Mout';
}
// 计算鼠标位置
function mousePosition(ev){
     if(ev.pageX || ev.pageY){
     	return {x:ev.pageX, y:ev.pageY};
     }
     return {
       x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
       y:ev.clientY + document.body.scrollTop  - document.body.clientTop
     }; 
 } 

</SCRIPT>
</body>
</html>
