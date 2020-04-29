<%@page language="java" contentType="text/html; charset=GBK"%>
<%@taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
 
<style type="text/css">
<!--
.STYLE1 {
	color: #FF0000
}
-->
</style>
<div id="form_table_title">
	<ul>
		<li class="top">
			<div>
				待办事项
			</div>
		</li>
	</ul>
</div>
<div id="container">
	<div id="list">
		<table border="0" id="tbl" cellspacing="1" align="center">
			<tr>
				<th nowrap="NOWRAP">
					序号
				</th>
				<th nowrap="NOWRAP">
					业务类型
				</th>
				<th nowrap="NOWRAP">
					待办事项
				</th>
				<th nowrap="NOWRAP">
					操作
				</th>

			</tr>
			<c:forEach var="operate" items="${operates}" varStatus="status">
				<c:forEach var="operatedetail" items="${operate.Details}" varStatus="len">
				<tr>
					
					<c:if test = "${len.count == 1}" >
					<td nowrap="NOWRAP" rowspan='<c:out value="${operate.RowSize}"/>'>
						<c:out value="${status.count}" />
					</td>
					<td nowrap="NOWRAP" rowspan='<c:out value="${operate.RowSize}"/>'>
						<c:out value="${operate.voucherTypeDTO.name}" />
					</td>
					</c:if>
						<td nowrap="NOWRAP">
							待
							<span class="STYLE1"><c:out
									value="${operatedetail.operattypedto.name}" />
							</span> 共
							<span class="STYLE1"><c:out
									value="${operatedetail.totalcount}" />
							</span> 条
						</td>
						<td nowrap="NOWRAP">
						<span class="STYLE1"><a
							href="<%=request.getContextPath()%><c:out value='${operatedetail.linkName}'/>">查
								看</a>
						</span>
					</td>			
					</tr>
					</c:forEach>
			</c:forEach>
		</table>
	</div>
</div>