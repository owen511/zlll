<%@page language="java" contentType="text/html; charset=GBK"%>
<jsp:directive.page import="java.util.List" />
<jsp:directive.page import="gov.mof.fasp.ifmis.portal.dataright.dto.TableColumnDTO" />
<jsp:directive.page import="java.util.Iterator" />
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<script type="text/javascript">
function doQuery(){
	$('queryform').submit();
}

function do_listacc(){
    var url = "<%=request.getContextPath()%>/portal/dataright/searchUser.do";
    var features = "top=150,left=50,width=750,height=500,scrollbars=no,resizable=no";
    window.open(url, "选择用户信息", features);
}

function doClear(){
	document.getElementById("userName").value = "";
	document.getElementById("userid").value = "";
}
</script>
<form id="queryform" name="queryform" method="post"
	action="<%=request.getContextPath()%>/portal/dataright/query.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>"
	onsubmit="switchValue(this)">
	<div id="query_t">
		<div>
			<span><span title="查询" class="query_btn" onclick="doQuery()"
				onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
				onmousedown="doChangeBg1(this)"><a href="#">查询</a> </span> </span>
			<span><span title="清除查询条件" class="clear_btn" onclick="doClear()"
				onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
				onmousedown="doChangeBg1(this)"><a href="#">清除查询条件</a> </span> </span>
			<span><span title="隐藏查询条件" class="hidden_btn"
				onclick="doQuery2(this)" onmouseover="doChangBg(this)"
				onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a
					href="#">隐藏查询条件</a> </span> </span>
		</div>
	</div>
	<div id="querylist" style="display:block;">
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr>
				<td nowrap="nowrap" width="10%">
					选择用户
				</td>
				<td nowrap="nowrap">
					<input name=userName id=userName  type="text" value="<c:out value='${userDTO.code}'/>-<c:out value='${userDTO.name}'/>" readonly="readonly"/>
					<input id=userid name=userid type=hidden value="<c:out value='${userDTO.userid}'/>">
					<input name=submenu id=submenu type="hidden"
						value="<c:out value='${param.submenu}'/>" />
					<input name=mainmenu id=mainmenu type="hidden"
						value="<c:out value='${param.mainmenu}'/>" />
					<button onclick="do_listacc()"></button>
				</td>
				<td nowrap="nowrap" width="70%"></td>
				<td nowrap="nowrap"></td>
				<td nowrap="nowrap"></td>
				<td nowrap="nowrap"></td>
			</tr>
		</table>
	</div>
		<div id="form_table_title">
			<ul>
				<li class="top">
					<div>
						用户权限查询
					</div>
				</li>
			</ul>
		</div>
		<div id="containerline17">
			<div id='tmain_div'
				style='position:relative;height:expression(this.offsetParent.offsetHeight);width:100%;'></div>
		</div>
		<script type="text/javascript">
			
			col = createColumnConfig();
			col.id = "role";
			col.name = "role";
			col.type = "S";
			col.title = "角色";
			col.show = function(rownum,value,row,tdobj,datatable){
				if(row.name != null){
				  tdobj.innerHTML = row.name;
				} else {
				  tdobj.innerHTML = "";
				}
			}
			ColumnConfig[col.id.toLowerCase()]=col;
			
			col = createColumnConfig();
			col.id = "functionright";
			col.name = "functionright";
			col.type = "S";
			col.title = "功能权限";
			col.show = function(rownum,value,row,tdobj,datatable){
				if(row.funcname != null){
				  tdobj.innerHTML = row.funcname;
				} else {
				  tdobj.innerHTML = "";
				}
			}
			ColumnConfig[col.id.toLowerCase()]=col;
			
			<%	
			List tableColumn = (List)request.getAttribute("tableColumn");
			StringBuffer tableHead = new StringBuffer("\"serial\",\"role\",\"functionright\",");
			for(Iterator it = tableColumn.iterator();it.hasNext();){
				TableColumnDTO tableColumnDTO = (TableColumnDTO)it.next();
				String code = tableColumnDTO.getTableHead();
				String name = tableColumnDTO.getTableColumn();
				int position = tableColumnDTO.getPosition();
				tableHead.append("\""+code+"\",");
				out.println("col = createColumnConfig();");
				out.println("col.id = \""+code+"\";");
				out.println("col.name = \""+code+"\";");
				out.println("col.type = \"S\";");
				out.println("col.title = \""+ code +"-"+ name +"\";");
				out.println("col.show = function(rownum,value,row,tdobj,datatable){");
				out.println("if(row.list != null){");
				out.println("tdobj.innerHTML = row.list["+position+"];");
				out.println("} else {");
				out.println("tdobj.innerHTML = \"\";");
				out.println("}");
				out.println("}");
				out.println("ColumnConfig[col.id.toLowerCase()]=col;");
			}
			tableHead.deleteCharAt(tableHead.lastIndexOf(","));
			out.println("var tmain =new dataTable();");
			out.println("tmain.parent = document.getElementById('tmain_div');");
			out.println("tmain.setTableHead(["+tableHead.toString()+"]);");
			String json = (String)request.getAttribute("json");
			if(null == json || "".equals(json)){
				out.println("tmain.data = new Array();\n");
			}else{
				out.println("tmain.data = "+ json);
			}
			out.println("tmain.show();");
			%>
		</script>
</form>
