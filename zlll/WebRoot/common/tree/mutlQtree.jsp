<%@ page language="java" contentType="text/html; charset=GBK"
	pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%
	response.setHeader("Cache-Control", "no-cache");
	response.setHeader("Pragma", "no-cache");
	response.setDateHeader("Expires", 0);

	//wy add 
	String mainmenu = "";
	String submenu = "";
	String vchtypecode = "";
	String voucherFieldCode = "";
	String elementfilter = "";
	String Referer = "";

	int start = 0;
	int step = 0;
	int allcount = 0;
	int endlevelselect=0;
	//wy added 20090922
	String selvalue = "";

	if (request.getParameter("mainmenu") != null) {
		mainmenu = request.getParameter("mainmenu").toString();
	}
	if (request.getParameter("submenu") != null) {
		submenu = request.getParameter("submenu").toString();
	}
	if (request.getParameter("vchtypecode") != null) {
		vchtypecode = request.getParameter("vchtypecode");
	}

	if (request.getParameter("vchfieldcode") != null) {
		voucherFieldCode = request.getParameter("vchfieldcode");
	}

	if (request.getParameter("elementfilter") != null) {
		elementfilter = request.getParameter("elementfilter");
	}

	if (request.getParameter("Referer") != null) {
		Referer = request.getParameter("Referer");
	}
	if (request.getAttribute("start") != null) {
		start = Integer.parseInt(request.getAttribute("start")
				.toString());
	}
	if (request.getAttribute("step") != null) {
		step = Integer
				.parseInt(request.getAttribute("step").toString());
	}

	if (request.getAttribute("selvalue") != null) {
		selvalue = request.getAttribute("selvalue").toString();
	}
	if (request.getAttribute("allCount") != null) {
		allcount = Integer.parseInt(request.getAttribute("allCount")
				.toString());
	}
	if (request.getParameter("endlevelselect") != null) {
		endlevelselect = Integer.parseInt( request.getParameter("endlevelselect").toString());
	}
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
		<title>请选择&nbsp;<c:out value="${elementcolumn.name}" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</title>
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
        <link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=request.getContextPath()%>/style/<%=styleName %>" />
		<link href="<%=request.getContextPath()%>/js/scripts/system/_resource/mztreeview/mztreeview.css"rel="stylesheet" type="text/css" />
        <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_LOGO%>_logo.css"/>
		<link href="<%=request.getContextPath()%>/style/default.css"rel="stylesheet" type="text/css" />
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
	</body>

</html>
<script>
var s = window.dialogArguments;
var values = [];
if(s!=null){
	var selvalue = s.selvalue;
	if(selvalue)values = selvalue.split(",");
}
var element = "<%=voucherFieldCode%>";
var elementfilter = "<%=elementfilter%>";
var elements=<%=request.getAttribute("jsonelements")%>;
var _qtree;
window.onload=function(){
		_qtree=new Ext.lt.Qtree({
			data:elements,
			selectmode:'n',
			values:values,
			endlevelselect:<%=endlevelselect==1%>,
			showRootNode:true,
			linkchild:true,
			linkparend:true,
			parentlinksub:true,
			outformart:'#code-#name',
			classname:'pop',
			expand:'click',
			clickexpandlevel:-1,
			bodydblselect:true,
			on:{
			    // 双击选中
				'dblclick':function(tree){
					closeMWindow(true);
				},
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
						var rootNode=null;
						var indexchecked=1;
						for (var i=0,len=eles.length; i<len; i++) {
							var eleid = eles[i].getAttribute("dataid");
							if(eleid == "QTreeAllNode"){
								rootNode=eles[i]
								rootNode.checked=false;
							}else{
								if(!eles[i].checked){
									indexchecked++;
								}
							}
							if (eleid != "QTreeAllNode" && eles[i].type=='checkbox') {
								eles[i].checked = !eles[i].checked;
							}
						}
						rootNode.checked=eles.length==indexchecked;
					}
					// 隐藏右侧菜单
					document.body.onclick = function(){
						popdiv.style.display = "none";
				  }
				}
			}
		});
		_qtree.draw(pop_inner);
}
//过滤条件
function filtertree(f){
		var array_toPage = f.split("");
			var digitalStr = "^$*+??\\";
			for (var i = 0; i < array_toPage.length; i++) {
				if (digitalStr.indexOf(array_toPage[i]) != -1) {
					array_toPage[i] = '\\'+array_toPage[i];
				}
			}
		f = array_toPage.join('');
		_qtree.setFilter([{field:'name',values:f},{field:'code',values:f},{field:'pinyin',values:f}],'contain');
		
}
//关闭并得到选中值
function closeMWindow(isReturn){
	if(isReturn){
		window.returnValue = _qtree.getSelected();
	}
	//090527 mod by liuhongchang
	else{
		window.returnValue = "cancel_";
	}
	
	var func;
    try{
        /* 动态调用父窗口的某个方法(参数:选择树window),
         * 这个方法在初始化数之前被调用
         * 这个方法在父窗口可实现,如果实现可以对数的数据作任何操作,如:过滤数据,
         * 当然,在父窗口也可以不实现改方法
         * ganhua 20090212
         **/
        func="window.dialogArguments.callByMultElementTreeBeforeClose_"+"<%=voucherFieldCode%>"+"(window)";
        eval(func);
	}catch(e){
		//alert("动态调用父窗口的某个方法出错:"+func);
		//不成功,不管它,当父窗口没有实现改方法处理
	}
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
</script>
