<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<script type="text/javascript">
function reQuery(){
	$("queryform").action ="/system/ui/editformsetlist.do?query=all&submenu=<c:out value='${param.submenu}'/>&mainmenu=<c:out value='${param.mainmenu}'/>";
	$("queryform").submit();
}
//整合提交的数据
function subdata(){
	var rows = $("edittable").rows;
	var cells = $("edittable").cells;
	var subdata = new Array();	
	if(rows.length > 1 ){
		for(var i = 1 ;i< rows.length;i++){	
			var row = new Object();	
			//itemid
			var inpObj = $("edittable").rows[i].cells[0].children;
			eval("row."+inpObj[0].name +"=inpObj[0].value");
			//ordernum
			inpObj = $("edittable").rows[i].cells[1].children;
			if(inpObj[0].value != null){
				eval("row."+inpObj[0].name +"=inpObj[0].value");
			}else{
				eval("row."+inpObj[0].name +"='0'");
			}
			//isvisiable
			inpObj = $("edittable").rows[i].cells[5].children;
			if(inpObj[0].value != null){
				eval("row."+inpObj[0].name +"=inpObj[0].value");	
			}else{
				eval("row."+inpObj[0].name +"= '0'");	
			}
			//expressions
			inpObj = $("edittable").rows[i].cells[6].children;
			eval("row."+inpObj[0].name +"=inpObj[0].value");
			//showlevelconfig
			inpObj = $("edittable").rows[i].cells[7].children;
			eval("row."+inpObj[0].name +"=inpObj[0].value");
			//requirement
			inpObj = $("edittable").rows[i].cells[8].children;
			eval("row."+inpObj[0].name +"=inpObj[0].value");
			//defaultvalue
			inpObj = $("edittable").rows[i].cells[9].children;
			eval("row."+inpObj[0].name +"=inpObj[0].value");
			//inputrule
			inpObj = $("edittable").rows[i].cells[10].children;
			eval("row."+inpObj[0].name +"=inpObj[0].value");
			//modifiable
			inpObj = $("edittable").rows[i].cells[11].children;
			eval("row."+inpObj[0].name +"=inpObj[0].value");
			//addmodifiable
			inpObj = $("edittable").rows[i].cells[12].children;
			eval("row."+inpObj[0].name +"=inpObj[0].value");
			//auditmodifiable
			inpObj = $("edittable").rows[i].cells[13].children;
			eval("row."+inpObj[0].name +"=inpObj[0].value");
			//onpropertychange
			inpObj = $("edittable").rows[i].cells[14].children;
			eval("row."+inpObj[0].name +"=inpObj[0].value");			
			//onkeyup
			inpObj = $("edittable").rows[i].cells[15].children;
			eval("row."+inpObj[0].name +"=inpObj[0].value");			
			//onattribute
			inpObj = $("edittable").rows[i].cells[16].children;
			eval("row."+inpObj[0].name +"=inpObj[0].value");
			subdata[subdata.length]=row;
		}
		//alert(subdata.toJSON());
		$("maindata").value = subdata.toJSON();
		$("editformlist").submit();
	}
}

function setDefaultValue(obj,dfObj){
	var elename = obj.name.substr(5);
	var df ="";
	if(obj.value !=null&&obj.value !=""){
		df += obj.valueid;
		df += ","+obj.value;
	}
	
	if(eval("$('"+dfObj+"')")!="undefined"){
		eval("$('"+dfObj+"').value = df");
	}
}
</script>

<div id="query_t">
<div>
<span><span title="查询" class="query_btn" onclick="reQuery()" onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#">查询</a></span></span>
<span><span title="清除查询条件" class="clear_btn" onclick="clearFormInputAll($('queryform'))" onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#">清除查询条件</a></span></span>
<span><span title="隐藏查询条件" class="hidden_btn" onclick="doQuery2(this)" onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#">隐藏查询条件</a></span></span>
</div></div>
<form name ="queryform" action="/system/ui/editformsetlist.do?submenu=<c:out value='${param.submenu}'/>" method="post">
<div id= querylist style='display:block;'> 
<table width=100% border=0 cellspacing=0 cellpadding=0  class=main_lookup_input>
  <tr>
    <td nowrap="nowrap" >交易凭证</td>
    <td nowrap="nowrap"><select name ="vouchercode">
    <option></option>
    <c:forEach var="vchType" items="${vchTypeList}">    	
    	<c:if test="${vchcode==vchType.voucherCode}">
    		<option value="<c:out value='${vchType.voucherCode}'/>" SELECTED><c:out value="${vchType.voucherType}" /></option>
    	</c:if>
    	<c:if test="${vchType.voucherCode!=vchcode}">
    		<option value="<c:out value='${vchType.voucherCode}'/>"><c:out value="${vchType.voucherType}"/></option>
    	</c:if>
    </c:forEach>
    </select>
    </td>
    <td nowrap="nowrap">&nbsp;</td>
    <td nowrap="nowrap">&nbsp;</td>
    <td nowrap="nowrap">&nbsp;</td>
    <td nowrap="nowrap">&nbsp;</td>
  </tr>
</table>
</div>
</form>
<form id ="editformlist" action="/system/ui/saveeditformsetlist.do" method="post">
<input name="maindata" type="hidden"/>
<div id="form_table_title_edit">
  <ul>
    <li class="top">
      <div>编辑区配置</div>
    </li>
  </ul>
</div>
	<div id="list" style="margin-left: 10px;overflow: auto;width:expression(form_table_title_edit.offsetWidth);height:374px;">
	<table id="edittable" border="0" cellspacing="1"  align="center" class=main_lookup_input>
      <tr>
      	<th nowrap="nowrap">序号</th>
        <th nowrap="nowrap">显示顺序</th>
        <th nowrap="nowrap">要素名称</th>
        <th nowrap="nowrap">数据库字段</th>
        <th nowrap="nowrap">类型</th>
        <th nowrap="nowrap">显示</th>
        <th nowrap="nowrap">触发表达式</th>
        <th nowrap="nowrap">级联控制</th>
        <th nowrap="nowrap">必录</th>
        <th nowrap="nowrap">默认值</th>
        <th nowrap="nowrap">录入级次</th>
        <th nowrap="nowrap">任意修改</th>
        <th nowrap="nowrap">录入可改</th>
        <th nowrap="nowrap">审核可改</th>
        <th nowrap="nowrap">onPropertyChange()</th>
        <th nowrap="nowrap">onKeyup()</th>
        <th nowrap="nowrap">onAttribute()</th>
      </tr>
      <c:forEach var="editformSetList" items="${editformSetList}" varStatus="status">
      <tr>
      	<td align="center" nowrap="nowrap"><c:out value="${status.count}"/><input type ="hidden" name = "itemid" value="<c:out value='${editformSetList.itemid}'/>"/></td>
        <td nowrap="nowrap"><input type ="text" name ="ordernum" value="<c:out value='${editformSetList.ordernum}'/>" size="5" /></td>
        <td nowrap="nowrap"><c:out value="${editformSetList.elementname}"/></td>
        <td nowrap="nowrap"><c:out value="${editformSetList.dbcolumnname}"/></td>
        <td nowrap="nowrap"><c:out value="${editformSetList.itemtype}"/></td>
        <td nowrap="nowrap">
	        <c:if test="${editformSetList.isvisiable=='1'}">
	       	 	<input type ="checkbox" name="isvisiable" value="<c:out value='${editformSetList.isvisiable}'/>"  checked/>
	        </c:if>
	        <c:if test="${editformSetList.isvisiable==0}">
	        	<input type ="checkbox" name="isvisiable" value ="0"/>
	        </c:if>
        </td>
        <td nowrap="nowrap">
        	<input type ="text" name="expressions" value ="<c:out value='${editformSetList.expressions}'/>" />
        </td>
        <td nowrap="nowrap"><input type ="text" name="showlevelconfig" value="<c:out value='${editformSetList.showlevelconfig}'/>" /></td>
        <td nowrap="nowrap">
        	<c:if test="${editformSetList.requirement==1}">
	        	<input type ="checkbox" name="requirement" value="<c:out value='${editformSetList.requirement}'/>" checked/><c:out value="${editformSetList.requirementcomment}"/>
	        </c:if>
	        <c:if test="${editformSetList.requirement==0}">
	        	<input type ="checkbox" name="requirement" value ="0"/><c:out value="${editformSetList.requirementcomment}"/>
	        </c:if>
        </td>
        <td nowrap="nowrap">
        	<c:if test="${editformSetList.itemtype !='tree'}">
	        	<input type ="text" name="defaultvalue" value ="<c:out value='${editformSetList.defaultvalue}'/>"/>	        	
	        </c:if>
	        <c:if test="${editformSetList.itemtype =='tree'}">
	        	<input type ="hidden" id="defaultvalue_<c:out value='${editformSetList.itemid}'/>" name="defaultvalue" value ="<c:out value='${editformSetList.defaultvalue}'/>"/>	        	
	        	<input id="tree_<c:out value='${editformSetList.itemid}'/>_<c:out value='${editformSetList.dbcolumnname}'/>" name="tree_<c:out value='${editformSetList.dbcolumnname}'/>" type=text class=main_lookup_input readonly 
	        		onpropertychange="setDefaultValue(this,'defaultvalue_<c:out value='${editformSetList.itemid}'/>')" onclick='selectElememt(<c:out value="${param.mainmenu}"/>,<c:out value="${param.submenu}"/>,"1001","<c:out value='${editformSetList.dbcolumnname}'/>",$("tree_<c:out value='${editformSetList.dbcolumnname}'/>"))' />
	        		<button id="<c:out value='${editformSetList.dbcolumnname}'/>_btn" onclick='selectElememt(<c:out value="${param.mainmenu}"/>,<c:out value="${param.submenu}"/>,"1001","<c:out value='${editformSetList.dbcolumnname}'/>",$("tree_<c:out value='${editformSetList.dbcolumnname}'/>"))'></button>
	            <script>
	            	var defaultValue ="<c:out value='${editformSetList.defaultvalue}'/>";
	            	if(defaultValue !=""){
	            		var dfv = defaultValue.split(",");
	            		$("tree_<c:out value='${editformSetList.itemid}'/>_<c:out value='${editformSetList.dbcolumnname}'/>").valueid=dfv[0];
	            		$("tree_<c:out value='${editformSetList.itemid}'/>_<c:out value='${editformSetList.dbcolumnname}'/>").value=dfv[1];
	            	}
	            </script>
	        </c:if>        	
        </td>
        <td nowrap="nowrap">        	
        	<c:if test="${editformSetList.inputrule=='OnlySelectBottom'&&editformSetList.itemtype=='tree'}">
        		<select name="inputrule">
	        	<option value="OnlySelectBottom" selected>末级</option>
	        	<option value="" >无控制</option>
	        	</select>
	        </c:if>
	        <c:if test="${editformSetList.inputrule!='OnlySelectBottom'&&editformSetList.itemtype=='tree'}">
	        	<select name="inputrule">
	        	<option value="OnlySelectBottom">末级</option>
	        	<option value="" selected>无控制</option>
	        	</select>
	        </c:if>
	        <c:if test="${editformSetList.itemtype !='tree'}">
	        	<select name="inputrule" disabled="disabled">
	        	<option value="" selected>无控制</option>
	        	</select>	        	
	        </c:if>
		</td>
        <td nowrap="nowrap">
        	<c:if test="${editformSetList.modifiable==1}">
	        	<input type ="checkbox" name="modifiable" value="<c:out value='${editformSetList.modifiable}'/>" checked/>
	        </c:if>
	        <c:if test="${editformSetList.modifiable!=1}">
	        	<input type ="checkbox" name="modifiable" value ="0"/>
	        </c:if>
		</td>
        <td nowrap="nowrap">
        	<c:if test="${editformSetList.addmodifiable==1}">
	        	<input type ="checkbox" name="addmodifiable" value="<c:out value='${editformSetList.addmodifiable}'/>" checked/>
	        </c:if>
	        <c:if test="${editformSetList.addmodifiable!=1}">
	        	<input type ="checkbox" name="addmodifiable" value ="0"/>
	        </c:if>
		</td>
        <td nowrap="nowrap">
        	<c:if test="${editformSetList.auditmodifiable==1}">
	        	<input type ="checkbox" name="auditmodifiable" value="<c:out value='${editformSetList.auditmodifiable}'/>" checked/>
	        </c:if>
	        <c:if test="${editformSetList.auditmodifiable!=1}">
	        	<input type ="checkbox" name="auditmodifiable" value ="0"/>
	        </c:if>
		</td>
        <td nowrap="nowrap">
        	<input type ="text" name="onpropertychange" value ="<c:out value='${editformSetList.onpropertychange}'/>" disabled="disabled"/>
        </td>
        <td nowrap="nowrap">
        <input type ="text" name="onkeyup" value ="<c:out value='${editformSetList.onkeyup}'/>" disabled="disabled"/>
        </td>
        
        <td nowrap="nowrap"><input type ="text" name="onattribute" value ="<c:out value='${editformSetList.onattribute}'/>" disabled="disabled"/></td>
        </tr>   
      </c:forEach>  
    </table>
    </div>
    <div id="confirm_exit_btn">  
    <input type="button" name="Submit" value="保存" class="button_style" onclick ="subdata()"/>
    </div>
    <div id="showhelp"></div>
    </form>
    
<script type="text/javascript">
//给checkbox添加点击事件
for (var i = 0; i < $('editformlist').elements.length; i++) {
    var e = $('editformlist').elements[i];
    if (e.type == "checkbox") {
        e.onclick = function(){
        	if(this.checked){
        		if(this.value==""){
        			this.value = 1;
        		} else {
        			this.value = 1;
        		}        		
        	}else{
        		if(this.value==""){
        			this.value = 0;
        		} else {
        			this.value = 0;
        		}
        	}
        }
    }
}
</script>