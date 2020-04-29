<%@page language="java" contentType="text/html; charset=GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<script>
function loadError(){
	var error = '<c:out value="${error}"/>';
	if("" != error ){
		alert(error);
	}
}
loadError();

function saveExit(){
	var formObject = $("form1");
	if(formObject.name.value.trim()==""){
       alert("请输入格式名称！");
       return false;
    }
    if(formObject.tovchtypeid.value.trim()==""){
       alert("请选择交易凭证！");
       return false;
    }
    if(formObject.totablecode.value.trim()==""){
       alert("请选择数据库业务表！");
       return false;
    }
    if(formObject.fromtablecode.value.trim()==""){
       alert("请选择数据库来源表！");
       return false;
    }
    if(formObject.classname.value.trim()==""){
       alert("请输入调用类名称！");
       return false;
    }
    if(formObject.functionname.value.trim()==""){
       alert("请输调用方法名称！");
       return false;
    }
    if(formObject.fromtablecode.value==formObject.totablecode.value){
       alert("数据库业务表同数据库来源表不能相等！");
       return false;
    }
	formObject.action = '<%=request.getContextPath()%>/system/importConfig/save.do';
	formObject.submit();
}

function cancel(){
	var submenuid = <c:out value="${param.submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
	var url = "<%=request.getContextPath()%>/system/importConfig/query.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
	window.location.href = url;
}
</script>
<form name="form1" id="form1"
	action="<%=request.getContextPath()%>/system/importConfig/save.do"
	method="post">
	<div id="form_table_title_edit">
		<ul>
			<li class="top">
				<div>
					导入格式模板编辑区
				</div>
			</li>
		</ul>
	</div>
	<div id="edit_table" style="height:375px">
		<table border="0" cellpadding="0px" cellspacing="0px">
			<tr>
				<th nowrap="nowrap">
					格式名称
					<span>*</span>
				</th>
				<td nowrap="nowrap">
					<input type="text" name=name id=name value="" />
					<input name=submenu id=submenu type="hidden"
						value="<c:out value='${param.submenu}'/>" />
					<input name=mainmenu id=mainmenu type="hidden"
						value="<c:out value='${param.mainmenu}'/>" />
				</td>
			</tr>
			<tr>
				<th nowrap="nowrap">
					交易凭证
					<span>*</span>
				</th>
				<td nowrap="nowrap">
					<select id=tovchtypeid name=tovchtypeid>
						<option value="">
						</option>
						<c:forEach items="${vchtypeMap}" var="entry">
							<option value="<c:out value='${entry.key}' />">
								<c:out value="${entry.value}" />
							</option>
						</c:forEach>
					</select>
				</td>
			</tr>
			<tr>
				<th nowrap="nowrap">
					模板标志
				</th>
				<td nowrap="nowrap">
					<input type="text" name=vchflagStr id=vchflagStr value="" /> *同一交易凭证的不同模板区分标志
				</td>
			</tr>
			<tr>
				<th nowrap="nowrap">
					导入数据文件格式
				</th>
				<td nowrap="nowrap">
					<select id=type name=type>
						<c:forEach items="${typeMap}" var="entry">
							<option value="<c:out value='${entry.key}' />">
								<c:out value="${entry.value}" />
							</option>
						</c:forEach>
					</select>
				</td>
			</tr>
			<tr>
				<th nowrap="nowrap">
					数据库业务表
					<span>*</span>
				</th>
				<td nowrap="nowrap">
					<select id=totablecode name=totablecode>
						<option value="">
						</option>
						<c:forEach items="${tableMap}" var="entry">
							<option value="<c:out value='${entry.key}' />">
								<c:out value="${entry.value}" />
							</option>
						</c:forEach>
					</select>
				</td>
			</tr>
			<tr>
				<th nowrap="nowrap">
					数据库来源表
					<span>*</span>
				</th>
				<td nowrap="nowrap">
					<select id=fromtablecode name=fromtablecode>
						<option value="">
						</option>
						<c:forEach items="${tableMap}" var="entry">
							<option value="<c:out value='${entry.key}' />">
								<c:out value="${entry.value}" />
							</option>
						</c:forEach>
					</select>
				</td>
			</tr>
			<tr>
				<th nowrap="nowrap">
					是否启用
				</th>
				<td nowrap="nowrap">
					<select id=state name=state>
						<c:forEach items="${stateMap}" var="entry">
							<option value="<c:out value='${entry.key}' />">
								<c:out value="${entry.value}" />
							</option>
						</c:forEach>
					</select>
				</td>
			</tr>
			<tr>
				<th nowrap="nowrap">
					调用类名称
					<span>*</span>
				</th>
				<td nowrap="nowrap">
					<input type="text" name=classname id=classname value="" />
				</td>
			</tr>
			<tr>
				<th nowrap="nowrap">
					调用方法名称
					<span>*</span>
				</th>
				<td nowrap="nowrap">
					<input type="text" name=functionname id=functionname value="" />
				</td>
			</tr>
			<tr>
				<th nowrap="nowrap">
					自定义解析器类名
				</th>
				<td nowrap="nowrap">
					<input type="text" name=definitionclass id=definitionclass value="" />
				</td>
			</tr>
			<tr>
				<th nowrap="nowrap">
					自定义解析器方法名
				</th>
				<td nowrap="nowrap">
					<input type="text" name=definitionmethod id=definitionmethod value="" />
				</td>
			</tr>
			<tr>
				<th nowrap="nowrap">
					自定义编码解析器类名
				</th>
				<td nowrap="nowrap">
					<input type="text" name=definitioncodeclass id=definitioncodeclass value="" />
				</td>
			</tr>
			<tr>
				<th nowrap="nowrap">
					自定义编码解析器方法名
				</th>
				<td nowrap="nowrap">
					<input type="text" name=definitioncodemethod id=definitioncodemethod value="" />
				</td>
			</tr>
			
			<tr>
				<th nowrap="nowrap">
					默认值
				</th>
				<td nowrap="nowrap">
					<input type="text" name=defaultvalue id=defaultvalue value="" /><br/>
					注：字段名=编码或者字符串的形式，以逗号字分割如：bdglevel=20001,bdgversion=3
				</td>
			</tr>
		</table>
	</div>
	<div id="confirm_exit_btn">
		<button name="submit2" class="button_style"
			onmouseover="this.className='OverBtn'"
			onmouseout="this.className='button_style'"
			onmousedown="this.className='down'"  onclick="saveExit()" >保存</button>
		<button name="submit3" class="button_style"
			onmouseover="this.className='OverBtn'"
			onmouseout="this.className='button_style'"
			onmousedown="this.className='down'"  onclick="cancel();" >返回</button>
	</div>
</form>
