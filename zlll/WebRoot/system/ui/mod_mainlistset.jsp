<%@ page language="java" contentType="text/html; charset=GBK"
	pageEncoding="GBK"%>

<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<html>
	<head>
	</head>
	<body>

		<%
					gov.mof.fasp.ifmis.system.ui.dto.MainListSetDTO dto = (gov.mof.fasp.ifmis.system.ui.dto.MainListSetDTO) request
					.getAttribute("mainListSet");
		%>
		<form name="form1" method="post"
			action="<%=request.getContextPath()%>/system/ui/modmainlistset.do">
			<input type="hidden" name="oldlinkname"
				value="<%=dto.getLinkName()%>" />
			<input type="hidden" name="oldcolid" value="<%=dto.getColID()%>" />
			<table border="1">
				<tr>
					<td>
						LinkName
						<input type="text" name="linkname" value="<%=dto.getLinkName()%>" />
					</td>
					<td>
						ColID
						<input type="text" name="colid" value="<%=dto.getColID()%>" />
					</td>

				</tr>

				<tr>
					<td>
						ColName
						<input type="text" name="colname" value="<%=dto.getColName()%>" />
					</td>
					<td>
						Order
						<input type="text" name="ordernum" value="<%=dto.getOrderNum()%>" />
					</td>
				</tr>
				<tr>
					<td>
						visible
						<input type="text" name="isvisible"
							value="<%=dto.getIsVisible()%>" />
					</td>
					<td>

					</td>
				</tr>
				<tr>
					<td>
					</td>
					<td>
						<input type="submit" value="save" />
					</td>
				</tr>
			</table>
		</form>
	</body>
</html>
