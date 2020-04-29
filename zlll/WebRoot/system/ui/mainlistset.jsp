<%@ page language="java" contentType="text/html; charset=GBK"
	pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<html>
	<head>
	</head>
	<body>
		<script type="text/javascript">
function query(){
	if (document.getElementById("linkname").value =="") {
		alert("enter link!") ;
		return 
	}
	window.location.href = "/system/ui/findmainlistsetlist.do?linkname=" + document.getElementById("linkname").value ; 

}
function add(){
	if (document.getElementById("linkname").value =="") {
		alert("enter link!") ;
		return 
	}
	window.location.href = "/system/ui/add_mainlistset.jsp" ; 
}
</script>

		<table border="1">
			<tr>
				<td>
					link
				</td>
				<td>
					<input type="text" name="linkname" />
					<input type="button" value="query" onclick="query();" />
				</td>
				<td>
					<input type="button" value="add" onclick="add();" />
				</td>
			</tr>
		</table>

		<table border="1">
			<tr>
				<td>
					link
				</td>
				<td>
					ID
				</td>
				<td>
					Name
				</td>
				<td>
					Order
				</td>
				<td>
					Visible
				</td>
				<td>
					Operate
				</td>
			</tr>

			<%
						java.util.List list = (java.util.List) request
						.getAttribute("mainListSetList");
				if (list != null) {

					for (int row = 0; row < list.size(); row++) {
						out.println("<tr>");
						java.util.Map map = (java.util.Map) list.get(row);

						out.println("<td>" + map.get("LINKNAME") + "</td>");
						out.println("<td>" + map.get("COLID") + "</td>");
						out.println("<td>" + map.get("COLNAME") + "</td>");
						out.println("<td>" + map.get("ORDERNUM") + "</td>");
						out.println("<td>" + map.get("ISVISIBLE") + "</td>");
						String para = "linkname=" + map.get("LINKNAME") + "&"
						+ "colid=" + map.get("colid");

						out.println("<td>"
						+ "<a href='/system/ui/findmainlistset.do?" + para
						+ "'>modify" + "</a> &amp;&amp;"
						+ "<a href='/system/ui/delmainlistset.do?" + para
						+ "'>delete</a></td>");
						out.println("</tr>");
					}
				}
			%>
			`


		</table>
	</body>
</html>
