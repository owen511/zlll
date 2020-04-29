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
	if(formObject.name.value==""){
       alert("�������ʽ���ƣ�");
       return false;
    }
    if(formObject.classname.value==""){
       alert("��������������ƣ�");
       return false;
    }
    if(formObject.functionname.value==""){
       alert("������÷������ƣ�");
       return false;
    }
    if(formObject.fromtablecode.value==formObject.totablecode.value){
       alert("���ݿ�ҵ���ͬ���ݿ���Դ������ȣ�");
       return false;
    }
	formObject.action = '<%=request.getContextPath()%>/system/importConfig/update.do';
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
	action="<%=request.getContextPath()%>/system/accredit/save.do"
	method="post">
	<div id="form_table_title_edit">
		<ul>
			<li class="top">
				<div>
					�����ʽģ��༭��
				</div>
			</li>
		</ul>
	</div>
	<div id="edit_table" style="height:375px">
		<table border="0" cellpadding="0px" cellspacing="0px">
			<tr>
				<th nowrap="nowrap">
					��ʽ����
					<span>*</span>
				</th>
				<td nowrap="nowrap">
					<input type="text" name=name id=name
						value="<c:out value='${importFormatDTO.name}'/>" />
					<input name=submenu id=submenu type="hidden"
						value="<c:out value='${param.submenu}'/>" />
					<input name=mainmenu id=mainmenu type="hidden"
						value="<c:out value='${param.mainmenu}'/>" />
					<input name=billid id=billid type="hidden"
						value="<c:out value='${importFormatDTO.billid}'/>" />
				</td>
			</tr>
			<tr>
				<th nowrap="nowrap">
					����ƾ֤
					<span>*</span>
				</th>
				<td nowrap="nowrap">
					<select id=tovchtypeid name=tovchtypeid>
						<c:forEach items="${vchtypeMap}" var="entry">
							<c:choose>
								<c:when test="${entry.key == vchtypeid}">
									<option value="<c:out value='${entry.key}'/>"
										selected="selected">
										<c:out value="${entry.value}" />
									</option>
								</c:when>
								<c:otherwise>
									<option value="<c:out value='${entry.key}' />">
										<c:out value="${entry.value}" />
									</option>
								</c:otherwise>
							</c:choose>
						</c:forEach>
					</select>
				</td>
			</tr>
			<tr>

				<th nowrap="nowrap">
					ģ���־
				</th>
				<td nowrap="nowrap">
					<input type="text" name=vchflagStr id=vchflagStr
						value="<c:out value='${importFormatDTO.vchflagstr}'/>" />  *ͬһ����ƾ֤�Ĳ�ͬģ�����ֱ�־
				</td>
			</tr>
			<tr>
				<th nowrap="nowrap">
					���������ļ���ʽ
				</th>
				<td nowrap="nowrap">
					<select id=type name=type>
						<c:forEach items="${typeMap}" var="entry">
							<c:choose>
								<c:when test="${entry.key == importFormatDTO.type}">
									<option value="<c:out value='${entry.key}'/>"
										selected="selected">
										<c:out value="${entry.value}" />
									</option>
								</c:when>
								<c:otherwise>
									<option value="<c:out value='${entry.key}' />">
										<c:out value="${entry.value}" />
									</option>
								</c:otherwise>
							</c:choose>
						</c:forEach>
					</select>
				</td>
			</tr>
			<tr>
				<th nowrap="nowrap">
					���ݿ�ҵ���
					<span>*</span>
				</th>
				<td nowrap="nowrap">
					<select id=totablecode name=totablecode>
						<c:forEach items="${tableMap}" var="entry">
							<c:choose>
								<c:when test="${entry.key == importFormatDTO.totablecode}">
									<option value="<c:out value='${entry.key}'/>"
										selected="selected">
										<c:out value="${entry.value}" />
									</option>
								</c:when>
								<c:otherwise>
									<option value="<c:out value='${entry.key}' />">
										<c:out value="${entry.value}" />
									</option>
								</c:otherwise>
							</c:choose>
						</c:forEach>
					</select>
				</td>
			</tr>
			<tr>
				<th nowrap="nowrap">
					���ݿ���Դ��
					<span>*</span>
				</th>
				<td nowrap="nowrap">
					<select id=fromtablecode name=fromtablecode>
						<c:forEach items="${tableMap}" var="entry">
							<c:choose>
								<c:when
									test="${entry.key == importFormatDTO.fromtablecode}">
									<option value="<c:out value='${entry.key}'/>"
										selected="selected">
										<c:out value="${entry.value}" />
									</option>
								</c:when>
								<c:otherwise>
									<option value="<c:out value='${entry.key}' />">
										<c:out value="${entry.value}" />
									</option>
								</c:otherwise>
							</c:choose>
						</c:forEach>
					</select>
				</td>
			</tr>
			<tr>
				<th nowrap="nowrap">
					�Ƿ�����
				</th>
				<td nowrap="nowrap">
					<select id=state name=state>
						<c:forEach items="${stateMap}" var="entry">
							<c:choose>
								<c:when test="${entry.key == state}">
									<option value="<c:out value='${entry.key}'/>"
										selected="selected">
										<c:out value="${entry.value}" />
									</option>
								</c:when>
								<c:otherwise>
									<option value="<c:out value='${entry.key}' />">
										<c:out value="${entry.value}" />
									</option>
								</c:otherwise>
							</c:choose>
						</c:forEach>
					</select>
				</td>
			</tr>
			<tr>

				<th nowrap="nowrap">
					����������
					<span>*</span>
				</th>
				<td nowrap="nowrap">
					<input type="text" name=classname id=classname
						value="<c:out value='${importFormatDTO.classname}'/>" />
				</td>
			</tr>
			<tr>
				<th nowrap="nowrap">
					���÷�������
					<span>*</span>
				</th>
				<td nowrap="nowrap">
					<input type="text" name=functionname id=functionname
						value="<c:out value='${importFormatDTO.functionname}'/>" />
				</td>
			</tr>
			<tr>
				<th nowrap="nowrap">
					�Զ������������
				</th>
				<td nowrap="nowrap">
					<input type="text" name=definitionclass id=definitionclass
						value="<c:out value='${importFormatDTO.definitionclass}'/>" />
				</td>
			</tr>
			<tr>
				<th nowrap="nowrap">
					�Զ��������������
				</th>
				<td nowrap="nowrap">
					<input type="text" name=definitionmethod id=definitionmethod 
					value="<c:out value='${importFormatDTO.definitionmethod}'/>"/>
				</td>
			</tr>
			<tr>
				<th nowrap="nowrap">
					�Զ���������������
				</th>
                <td nowrap="nowrap">
					<input type="text" name=definitioncodeclass id=definitioncodeclass 
					value="<c:out value='${importFormatDTO.definitioncodeclass}'/>"/>
				</td>
			</tr>
			<tr>
				<th nowrap="nowrap">
					�Զ�����������������
				</th>
				<td nowrap="nowrap">
					<input type="text" name=definitioncodemethod id=definitioncodemethod  
					value="<c:out value='${importFormatDTO.definitioncodemethod}'/>"/>
				</td>
			</tr>
			
			<tr>
				<th nowrap="nowrap">
					Ĭ��ֵ
				</th>
				<td nowrap="nowrap">
					<input type="text" name=defaultvalue id=defaultvalue value="<c:out value='${importFormatDTO.defaultvalue}'/>" /><br/>
					ע���ֶ���=��������ַ�������ʽ���Զ����ַָ��磺bdglevel=20001,bdgversion=3
				</td>
			</tr>
		</table>
	</div>
	<div id="confirm_exit_btn">
		<button name="submit2" class="button_style"
			onmouseover="this.className='OverBtn'"
			onmouseout="this.className='button_style'"
			onmousedown="this.className='down'" onclick="saveExit()">����</button>
		<button name="submit3"  class="button_style"
			onmouseover="this.className='OverBtn'"
			onmouseout="this.className='button_style'"
			onmousedown="this.className='down'" onclick="cancel();">����</button>
	</div>
</form>
