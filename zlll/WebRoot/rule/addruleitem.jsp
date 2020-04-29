<%@ page language="java" contentType="text/html; charset=GBK"
	pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%
	response.setHeader("Cache-Control", "no-cache");
	response.setHeader("Pragma", "no-cache");
	response.setDateHeader("Expires", 0);
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<HTML xmlns="http://www.w3.org/1999/xhtml">
	<HEAD>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<script type='text/javascript'
			src="<%=request.getContextPath()%>/js/prototype.js"></script>
		<script type='text/javascript'
			src='<%=request.getContextPath()%>/js/zapatec.js'></script>
		<SCRIPT type='text/javascript'
			src="<%=request.getContextPath()%>/js/tree.js"></SCRIPT>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/js/changescroll.js"></script>
		<script type='text/javascript' src="ruleconfig.js"></script>
		<link href="<%=request.getContextPath()%>/style/style.css"
			rel="stylesheet" type="text/css" />
		<link href="<%=request.getContextPath()%>/style/default.css"
			rel="stylesheet" type="text/css" />
		<STYLE>
			#rule_source_div {
				overflow: auto;
				BACKGROUND-POSITION: left top;
				BACKGROUND-ATTACHMENT: scroll;
				BACKGROUND-IMAGE: url(../images/bg/popPage_bg_filter.gif);
				background-repeat: repeat-x;
				border:1px solid;
				height: 300px;
				display:none;
			}
			#element_tree_div{
				overflow: auto;
				BACKGROUND-POSITION: left top;
				BACKGROUND-ATTACHMENT: scroll;
				BACKGROUND-IMAGE: url(../images/bg/popPage_bg_filter.gif);
				background-repeat: repeat-x;
				border:1px solid;
				height: 300px;
				display:block;
			}
  		</STYLE>
		<TITLE>规则条件维护&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TITLE>
	</HEAD>
	<BODY class="pop_body">
		<div id="popPage">
			<div>
				<div id="shenhe_title">
					<div id="shenhe_title_middle">
					</div>
				</div>
				<div id="elementcodediv">
					<table>
						<tr>
							<td nowrap="nowrap">
								<input name="isinclude" type="radio" value="1" checked="checked" />
								&nbsp;包含
								<input name="isinclude" type="radio" value="0" />
								&nbsp;排除
							</td>
						</tr>
						<tr>
							<td nowrap="nowrap">
								规则数据元：<input id="elementcodeStr" name="elementcodeStr" type="text"
									value="" readonly="readonly" size="37"/>
								<button onclick="showRuleSourceDiv()">
									..
								</button>
								<input id="elementcode" name="elementcode" type="hidden"
									value=""/>
							</td>
						</tr>
					</table>
				</div>
				<div id="rule_source_div"></div>
				<div id="matchtypediv">
					<table>
						<tr>
							<td nowrap="nowrap">
								&nbsp;&nbsp;&nbsp;&nbsp;匹配符：<select id="matchtypeid" name="matchtypeid" style="width:295px;" onpropertychange="changeBaseValue()">
									<option value="">
									</option>
								</select>
							</td>
						</tr>
						<tr>
							<td nowrap="nowrap">
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;值：<input type="text" id="basevalue" name="basevalue" value="" size="41" onpropertychange="clearElementTree()"/>
							</td>
						</tr>
					</table>
				</div>
				<div id="element_tree_div"></div>
				<br />
				<div id="pop_button">
					<CENTER>
						<INPUT type="button" value="确定" class="button_style" onclick="confirmSave()" 
							onmouseover="this.className='OverBtn'"
							onmouseout="this.className='button_style'"
							onmousedown="this.className='down'" />
						&nbsp;&nbsp;&nbsp;
						<INPUT type="button" value="取消" class="button_style" onclick="cancelSave()" 
							onmouseover="this.className='OverBtn'"
							onmouseout="this.className='button_style'"
							onmousedown="this.className='down'" />
					</CENTER>
				</div>
				<div>
	</BODY>

</HTML>
<script>
//保存前窗口传来的ruScopeItem参数
var ruScopeItem = new Object();
var tablecode = "";
var operateFlag = "";
//得到性能参数 可以打开层次数
var layerSet = <c:out value="${layerSet}" />;
//规则数据树
var queryRuleSourceUrl = "";
var ruleSourceTree = null;
//要素树
var elementTree = null;
//匹配符
var matchTypeList = <%=(String)request.getAttribute("matchTypeList")%>;

function init(){

	operateFlag = '<%=(String)request.getAttribute("operateFlag")%>';
	queryRuleSourceUrl = '<%=(String)request.getAttribute("queryRuleSourceUrl")%>';
	
	tablecode = '<c:out value="${queryRuleSourceTableCode}" />';
	ruScopeItem = <%=(String)request.getAttribute("ruScopeItem")%>;
	
	var elementcodeStr = document.getElementById("elementcodeStr");
	var elementcode = document.getElementById("elementcode");
	var matchtypeid = document.getElementById("matchtypeid");
	var basevalue = document.getElementById("basevalue");
	
	//包含（排除）
	var isinclude = document.getElementsByName("isinclude");  
    for(var i=0;i<isinclude.length;i++){  
        if(isinclude[i].value == ruScopeItem.isinclude){  
        	isinclude[i].checked = true;
            break;
        }
    }
    
	elementcodeStr.value = ruScopeItem.elementcodeStr;
	elementcode.value = ruScopeItem.elementcode;
	if("0" == ruScopeItem.lastColumnIsleaf){
		elementcode.setAttribute("elementcode",ruScopeItem.lastColumnElementcode);
	}
	elementcode.setAttribute("isleaf",ruScopeItem.lastColumnIsleaf);
	elementcode.setAttribute("datatype",ruScopeItem.lastColumnDatatype);
	
	changeMatchtype();
	
	if(null != ruScopeItem.matchtypeid && "" != ruScopeItem.matchtypeid){
		matchtypeid.value = ruScopeItem.matchtypeid;
	}
	if(null != ruScopeItem.basevalue && "" != ruScopeItem.basevalue){
		basevalue.value = ruScopeItem.basevalue;
	}
	
}

function fixbody(){
	// 修正页面问题
	var rule_source_div = document.getElementById("rule_source_div");
	var element_tree_div = document.getElementById("element_tree_div");
	if(rule_source_div != null && rule_source_div.style.display == "block"){	
		if($("element_tree_div") != null && $("element_tree_div").style.display != "none"){
			rule_source_div.style.height = popPage.offsetHeight - shenhe_title.offsetHeight - pop_button.offsetHeight - elementcodediv.offsetHeight - matchtypediv.offsetHeight - element_tree_div.offsetHeight - 20;
		}else{
			rule_source_div.style.height = popPage.offsetHeight - shenhe_title.offsetHeight - pop_button.offsetHeight - elementcodediv.offsetHeight - matchtypediv.offsetHeight - 20;		
		}
		rule_source_div.style.width = popPage.offsetWidth;
	}
	if(element_tree_div != null && element_tree_div.style.display == "block"){
		if(rule_source_div !=null && rule_source_div.style.display != "none"){
			element_tree_div.style.height = popPage.offsetHeight - shenhe_title.offsetHeight - pop_button.offsetHeight - elementcodediv.offsetHeight - matchtypediv.offsetHeight - rule_source_div.offsetHeight - 20;	
		}else{
			element_tree_div.style.height = popPage.offsetHeight - shenhe_title.offsetHeight - pop_button.offsetHeight - elementcodediv.offsetHeight - matchtypediv.offsetHeight - 20;
		}
		element_tree_div.style.width = popPage.offsetWidth;
	}
}

window.dialogHeight = "500px";
window.dialogWidth = "600px";
window.onresize = fixbody;
window.onload = function(){
	fixbody();
	init();
}

//显示规则数据树
function showRuleSourceDiv(){
	$("rule_source_div").style.display = "block";
	$("matchtypediv").style.display = "none";
	$("element_tree_div").style.display = "none";
	if(null == ruleSourceTree){
		var url = '<%=request.getContextPath()%>/rule/ruleitem/findRuleSource.do';
		var pars = "";
		if(null != tablecode && "" != tablecode){
			pars = 'tablecode='+tablecode;
		}
		var myAjax = new Ajax.Request(
		                    url,
		                    {method: 'post',parameters: pars, onComplete:buildRuleSourceTree }
		                    );
	}else{
		ruleSourceTree.collapseAll();
	}
}
function buildRuleSourceTree(request){
	eval("var jsonObj = " + request.responseText);
	if(null != ruleSourceTree){
		ruleSourceTree.destroy(false);
		ruleSourceTree = null;
	}else{
		ruleSourceTree = new Zapatec.Tree({
                                parent: "rule_source_div",
                                source: jsonObj,
                                sourceType: "json",
                                expandOnLabelClick: true,
                                highlightSelectedNode: true,
                                eventListeners:{
                                    'select': ruleSource_select,'labelDblclick':ruleSource_Dblclick
                                }
                            });
	}
}

//隐藏规则数据树
function hiddenRuleSourceDiv(){
	$("rule_source_div").style.display = "none";
	$("matchtypediv").style.display = "block";
	$("element_tree_div").style.display = "block";
	clearElementTree();
}

function ruleSource_select(){
	var node = this;
	//得到打开的层次
	var parentNodes = new Array();
	var parentNode = node.config.parentNode;
	while(parentNode.data.code != null ){
		parentNodes[parentNodes.length] = parentNode;
		parentNode=parentNode.config.parentNode;
	}
	if(parentNodes.length < <c:out value="${layerSet}" />){
		if("0" == node.data.isleaf){
			var url = '<%=request.getContextPath()%>/rule/ruleitem/findColumnByTableCode.do';
			var pars = 'elementCode='+node.data.sourceelement;
			var myAjax = new Ajax.Request(
			                    url,
			                    {method: 'post',parameters: pars, onComplete: function(originalRequest){showElementColumn(originalRequest,node)}}
			                    );
		}
	}
}
function showElementColumn(originalRequest,node){
	eval("var columnList = " + originalRequest.responseText);
	for(var i=0;i<columnList.length;i++){
		node.addNode(columnList[i],i);
	}
}

function ruleSource_Dblclick(){
	var elementcode = document.getElementById("elementcode");
	var elementcodeStr = document.getElementById("elementcodeStr");
	var node=this;
	var parentNodes = new Array();
	parentNodes[parentNodes.length] = node;
	var parentNode = node.config.parentNode;
	while(parentNode.data.code != null ){
		parentNodes[parentNodes.length] = parentNode;
		parentNode=parentNode.config.parentNode;
	}
	elementcode.value = "";
	elementcodeStr.value = "";
	for(var i = 0;i < parentNodes.length;i++){
		elementcode.value = parentNodes[i].data.code + "," + elementcode.value;
		elementcodeStr.value = parentNodes[i].data.label + "," + elementcodeStr.value;
		if(i == 0 ){
			if("0" == parentNodes[i].data.isleaf){
				elementcode.setAttribute("elementcode",parentNodes[i].data.sourceelement);
			}
			elementcode.setAttribute("isleaf",parentNodes[i].data.isleaf);
			elementcode.setAttribute("datatype",parentNodes[i].data.datatype);
		}
	}
	//删除最后的逗号
	elementcode.value = elementcode.value.substring(0,elementcode.value.length-1);
	elementcodeStr.value = elementcodeStr.value.substring(0,elementcodeStr.value.length-1);
	hiddenRuleSourceDiv();
	changeMatchtype();
}

//改变下拉选项
function changeMatchtype(){
	var elementcode = document.getElementById("elementcode");
	var matchtypeid = document.getElementById("matchtypeid");
	matchtypeid.value = "";
	matchtypeid.options.length = 0;
	var elementCodeName = elementcode.value;
	var datatype = elementcode.datatype;
	var isleaf = elementcode.isleaf;
	if("MONTH" == elementCodeName){
		for(var i=0;i<matchTypeList.length;i++){
			var temp = matchTypeList[i];
			if(1 == temp.matchtypeid || 2 == temp.matchtypeid || 6 == temp.matchtypeid ||
			   7 == temp.matchtypeid || 8 == temp.matchtypeid || 9 == temp.matchtypeid ||
			  40 == temp.matchtypeid){
				var opt = new Option(temp.matchtypename,temp.matchtypeid,true,true);
				matchtypeid.options[matchtypeid.options.length] = opt;
			}
		}
	}else{
		if("0" == isleaf){
			for(var i=0;i<matchTypeList.length;i++){
				var temp = matchTypeList[i];
				if(3 == temp.matchtypeid || 5 == temp.matchtypeid || 44 == temp.matchtypeid){
					var opt = new Option(temp.matchtypename,temp.matchtypeid,true,true);
					matchtypeid.options[matchtypeid.options.length] = opt;
				}
			}
		}else{
			if("S" == datatype){
				for(var i=0;i<matchTypeList.length;i++){
					var temp = matchTypeList[i];
					if(1 == temp.matchtypeid || 2 == temp.matchtypeid || 6 == temp.matchtypeid ||
					   7 == temp.matchtypeid || 8 == temp.matchtypeid || 9 == temp.matchtypeid ||
					  40 == temp.matchtypeid ||41 == temp.matchtypeid ||42 == temp.matchtypeid ||
					  43 == temp.matchtypeid){
						var opt = new Option(temp.matchtypename,temp.matchtypeid,true,true);
						matchtypeid.options[matchtypeid.options.length] = opt;
					}
				}
			}else if("N" == datatype){
				for(var i=0;i<matchTypeList.length;i++){
					var temp = matchTypeList[i];
					if(1 == temp.matchtypeid || 2 == temp.matchtypeid || 6 == temp.matchtypeid ||
					   7 == temp.matchtypeid || 8 == temp.matchtypeid || 9 == temp.matchtypeid ||
					  40 == temp.matchtypeid){
						var opt = new Option(temp.matchtypename,temp.matchtypeid,true,true);
						matchtypeid.options[matchtypeid.options.length] = opt;
					}
				}
			}
		}
	}
}

//改变basevalue或者要素树
function changeBaseValue(){
	var elementcode = document.getElementById("elementcode");
	var matchtypeid = document.getElementById("matchtypeid");
	var basevalue = document.getElementById("basevalue");
	var isleaf = elementcode.isleaf;
	if("0" == isleaf){
		//多选
		if(matchtypeid.value == 3){
			basevalue.value = matchtypeid.options[matchtypeid.selectedIndex].text;
			basevalue.readOnly = "readOnly";
			//生成要素树
			var url = '<%=request.getContextPath()%>/rule/ruleitem/findElementTree.do';
			var pars = 'elementCode='+elementcode.elementcode;
			var myAjax = new Ajax.Request(
			                    url,
			                    {method: 'post',parameters: pars, onComplete: buildElementTree}
			                    );
		//全部
		}else if(matchtypeid.value == 5){
			basevalue.value = "";
			basevalue.readOnly = "readOnly";
		}else{
			basevalue.value = "";
			basevalue.readOnly = "";
		}
	}else{
		basevalue.value = "";
		basevalue.readOnly = "";
	}
}

//清取要素树
function clearElementTree(){
	if(null != elementTree){
		elementTree.destroy(false);
		elementTree = null;
	}
}

//创建要素树
function buildElementTree(originalRequest){
	eval("var jsonObj = " + originalRequest.responseText);
	clearElementTree();
	elementTree = new Zapatec.Tree({
                                parent: "element_tree_div",
                               	source: jsonObj,
                                sourceType: "json",
                                expandOnLabelClick: true,
                                highlightSelectedNode: true,
                                putCheckboxes: true
                            });
    var basevalueset = ruScopeItem.basevalueset;
    var selectNodes = elementTree.findAll(function(node){
								return true;
							});
    if(null != basevalueset && basevalueset.length > 0 && null != selectNodes && selectNodes.length > 0){
    	for(var i=0;i<selectNodes.length;i++){
    		var node = selectNodes[i];
			for(var j=0;j<basevalueset.length;j++){
				var basevalue = basevalueset[j];
				if(basevalue.basevalue == node.data.id ){
					node.checkboxChanged(true);
				}
			}
    	}
    }
    
}

//确定按钮事件
function confirmSave(){
	var elementcodeStr = document.getElementById("elementcodeStr");
	var elementcode = document.getElementById("elementcode");
	var matchtypeid = document.getElementById("matchtypeid");
	var basevalue = document.getElementById("basevalue");
	var isinclude = document.getElementById("isinclude");
	var selectNodes = new Array();
	if(null == elementcode.value || "" == elementcode.value){
		alert("请选择规则数据元！");
		return false;
	}
	if(null == matchtypeid.value || "" == matchtypeid.value){
		alert("请选择匹配符！");
		return false;
	}else{
		if(matchtypeid.value == 3){
			selectNodes = elementTree.findAll(function(node){
				return node.data.isChecked;
			});
			if(selectNodes.length == 0){
				alert("请选择值！");
				return false;
			}
		}else if(matchtypeid.value == 5){
			
		}else{
			if(null == basevalue.value || "" == basevalue.value.trim()){
				alert("请输入值！");
				return false;
			}
		}
	}
	window.dialogArguments.addruleitemSaveCallBack(window);
}

//取消按钮事件
function cancelSave(){
	if(confirm("是否确定要取消操作？")){
		window.dialogArguments.addruleitemCancelCallBack(window);
	}
}
</script>
