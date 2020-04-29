<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ page import="gov.mof.fasp.ifmis.common.Globals"%>

<HTML >
<HEAD>
<TITLE>查询条件页面显示设置</TITLE>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
<link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=request.getContextPath()%>/style/stylefontS.css" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_LOGO%>_logo.css"/>
<script type="text/javascript" src="../../js/prototype.js"></script>
<script type="text/javascript" src="../../js/choose.js"></script>
<script type="text/javascript" src="../../js/changescroll.js"></script>
<script type="text/javascript" src="../../js/jquery-1[1].3.1.js"></script>

 </HEAD>

<body>

<div id="popPage"><div id="shenhe_title"><div id="shenhe_title_middle"></div></div>

<div id="form_table_title" >
	<ul>
	    <li class="top">
	      	<div>自定义查询条件页面显示设置</div>
	    </li>
	</ul>
</div>
<div style="height:290px">
<form>
<!--请保留此div和a标签 -->
	 <div id="list" style="position:absolute;height:290px;width:98%;overflow:scroll;margin-left:10px;">
	  	 <table width="93%"  border="0" align="center" cellspacing="1">
	          <tr >
		          <th width="1%"  height="27" align="center" nowrap="nowrap">
		          		<input name="contralCheck" id="ifAll" type="checkbox" onclick="myCheckAll();"/>
		          </th>
		          <th width="10%" nowrap="nowrap" align="center">显示次序</th>
		          <th nowrap="nowrap" align="center">字段名</th>
	          </tr>
	          <c:forEach var = "list" items = "${myConditionList}">
		          <tr onclick="this.style.backgroundColor='#CBDAF2';" onmouseover="this.style.backgroundColor='#e8f4ff';" onmouseout="this.style.backgroundColor='#ffffff';">
		          		<td nowrap="nowrap" align="center">
		          			<input type="checkbox" id="<c:out value='${list.colid}'/>" <c:if test="${list.checked}">checked</c:if>/>
		          		</td>
		          		<td id="myordernum" nowrap="nowrap" align="center" onclick="changeToEdit(event);">
		          			<c:out value="${list.myordernum}"></c:out>
		          		</td>
		          		<td id="name" nowrap="nowrap" align="left">
		          			<c:out value="${list.colname}"></c:out>
		          		</td>
		          		<td id="inputrule" nowrap="nowrap" align="left" style= "display:none">
		          			<c:out value="${list.inputrule}"></c:out>
		          		</td>
		          		<td id="elementfilter" nowrap="nowrap" align="left" style= "display:none">
		          			<c:out value="${list.elementfilter}"></c:out>
		          		</td>
		          </tr>
	          </c:forEach>
	     </table>
     </div>   
<input type="hidden" id="link" name="link" value="<c:out value='${linkname}'/>"/>
</form>
</div>
<div style="float:right;">
      <input type="button" name="Submit" value="保存"  onclick="saveMyCondtion();"  class="button_style"/>
      <input type="button" name="reback" value="恢复默认"  onclick="reBack();"  class="button_style" />
      <input type="button" name="exit" value="关闭"  onclick="window.close();" class="button_style"/>
</div>
</body>
</HTML>
<script>
JQ(document).ready(function(){
	JQ("input[type=button]")
	.bind("mouseover",function(){
		JQ(this).attr("className","OverBtn");
	}).bind("mouseout",function(){
		JQ(this).attr("className","button_style");
	}).bind("mousedown",function(){
		JQ(this).attr("className","down");
	});
	JQ(":checkbox").not("#ifAll").click(function(){
		if(this.checked){
			//如果此项包含控制规则，或者过滤条件
			var inputrule = JQ(this).parents("tr").find("td[id=inputrule]").text();
			if(inputrule != "" && !JQ("#"+inputrule+"").attr("checked")) {
				//确定默认选中主控项
				if(confirm(JQ("#"+inputrule+"").parents("tr").find("#name").text()+"是此项的主控条件也要被选中！")){
					JQ("#"+inputrule+"").parents("tr").find(":checkbox").attr("checked","true");
				}else{
					JQ(this).parents("tr").find(":checkbox").removeAttr("checked");
				}
			}
			var tempfilter = JQ(this).parents("tr").find("td[id=elementfilter]").text();
			var temparr = [];
			if(tempfilter.indexOf("[$")>-1){
				var arr = tempfilter.split("[$");
				for(var i=0,len = arr.length;i<len;i++){
					if(arr[i].indexOf("]")>-1)
						temparr.push(arr[i].split(".")[1]);
				}
			}
			for(var j=0,len=temparr.length;j<len;j++){
				if(temparr[j] != "" && !JQ("#"+temparr[j]+"").attr("checked")) {
					//确定默认选中主控项
					if(confirm(JQ("#"+temparr[j]+"").parents("tr").find("#name").text()+"是此项的过滤条件也要被选中！")){
						JQ("#"+temparr[j]+"").parents("tr").find(":checkbox").attr("checked","true");
					}else{
						JQ(obj).parent("tr").find(":checkbox").removeAttr("checked");
					}
				}
			}
		}else{
			var id = this.id;
			JQ("tr").each(function() {
					//判断有无控制规则和过滤条件关联
					if(JQ(this).find("td[id=inputrule]").text().trim()==id){
						JQ(this).find(":checkbox").removeAttr("checked");
					}else{
						var tempfilter = JQ(this).find("td[id=elementfilter]").text();
						if(!tempfilter) return true;
						var temparr = [];
						if(tempfilter.indexOf("[$")>-1){
							var arr = tempfilter.split("[$");
							for(var i=0,len = arr.length;i<len;i++){
								if(arr[i].indexOf("]")>-1)
									temparr.push(arr[i].split(".")[1]);
							}
						}
						for(var i=0,len=temparr.length;i<len;i++){
							if(temparr[i] == id)
							JQ(this).find(":checkbox").removeAttr("checked");
						}
					}
				});
		}
	});
});
//全选
function myCheckAll(){
	 for (var i = 0; i < JQ("input[type=checkbox]").length; i++) {
	 	JQ(":checkbox")[i].checked = JQ("#ifAll")[0].checked;
	 }
}
//保存
function  saveMyCondtion(){
	var arr = [];
	var chk = JQ("input[type=checkbox][checked]");
	for(var i=0;i<chk.length;i++){
		var obj = {ordernum:null,colid:null,isvisible:null};
		if(chk[i].id == "ifAll")continue;
		obj["ordernum"] = JQ(chk[i]).parents("tr").find("#myordernum").text();
		if(JQ(chk[i]).attr("checked")){
			isvisible = 1;
		}
		obj["isvisible"] = isvisible;
		obj["colid"] = chk[i].id;
		arr.push(obj);
	}
	var linkname = JQ("#link").val();
	var pars = "linkname="+encodeURIComponent(linkname)+"&mycondition="+Object.toJSON(arr);
	var url = "/system/ui/saveMyCondition.do";
    var myAjax = new Ajax.Request(url,
          {
            method:'post',
            parameters:pars,
            onComplete:function(){
            	window.close();
            },
            onFailure : function(resp) {
				  alert("网络异常");
				  closeDiv();
				}
           });
}
//恢复到原始默认状态，也就是删除自定义到超级管理员设置的状态
function reBack(){
	var linkname = JQ("#link").val();
	var pars = "linkname="+encodeURIComponent(linkname);
	var url = "/system/ui/delMyCondition.do";
    var myAjax = new Ajax.Request(url,
          {
            method:'post',
            parameters:pars,
            onComplete:function(){
            	window.close();
            },
            onFailure : function(resp) {
				  alert("网络异常");
				  closeDiv();
				}
           });
}
//编辑列表序号
var inputItem; // 输入框句柄
function changeToEdit(event) {
	e = window.event;
	if (e.srcElement.tagName.toUpperCase() != "TD")
	 return;
	var obj = e.srcElement;
	JQ(obj).parent("tr").find(":checkbox").attr("checked","true");
	if (!inputItem) {
		inputItem = document.createElement('input');
		inputItem.type = 'text';
		inputItem.size = 8;
		inputItem.value = obj.innerText.trim();
		obj.innerHTML = "";
		obj.appendChild(inputItem);
		inputItem.focus();
	}
	inputItem.onblur = function() {
		var reg = new RegExp("^[0-9]*$");
        var val = this.value.trim();
     	if(!reg.test(val)){
     		alert("请输入正确数字！");
     		obj.innerHTML = "";
     		inputItem = null;
     		return;
     	}
		obj.innerHTML = this.value.trim();
		inputItem = null;
	}
}
</script>

