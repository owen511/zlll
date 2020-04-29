<%@ page language="java" contentType="text/html; charset=GBK"
	pageEncoding="GBK"%>

<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<html>
	<head>
	</head>
	<body>

		<form name="form1" method="post"
			action="<%=request.getContextPath()%>/system/ui/addmainlistset.do">

			<table border="1">
				<tr>
					<td>
						LinkName
						<input type="text" name="linkname" />
					</td>
					<td>
						ColID
						<input type="text" name="colid" />
					</td>

				</tr>

				<tr>
					<td>
						ColName
						<input type="text" name="colname" />
					</td>
					<td>
						Order
						<input type="text" name="ordernum" />
					</td>
				</tr>
				<tr>
					<td>
						visible
						<input type="text" name="isvisible" />
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
