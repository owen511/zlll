<%@ page contentType="text/html; charset=GBK" import="java.util.*"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>

<html>
	<head>
	    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
<link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=request.getContextPath()%>/style/stylefontS.css" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_LOGO%>_logo.css"/>
		<script type="text/javascript" src="../js/choose.js"></script>
		<script type="text/javascript" src="../js/changescroll.js"></script>
		<TITLE>请选择 级联控制</TITLE>
		<script type="text/javascript">
  function doshowlevelconfig(){
      var iput= document.getElementsByTagName("input");
      var divox = document.getElementsByName("divo");
      var revalue= new Object();
      var showvalue = "";
      var showid = "";
      for(j = 0;j<iput.length;j++){
          if(iput[j].type=="checkbox" && iput[j].checked){
           showvalue += divox[j].innerHTML+",";
           showid += iput[j].value+","
          }
      }
      showvalue =showvalue.substring(0,showvalue.length-1);
      showid =showid.substring(0,showid.length-1);
      revalue.value= showvalue;
      revalue.valueid= showid;
      opener.returnresult(revalue);
      window.close();
  }
  </script>
	</head>

	<body class="pop_body">
		<form name="fom" action="#">
			<div id="pop_inner" style="height:450px;overflow-y:scroll;">

				<div id="edit_table" style="width:99%;">
					<table width="100%" border="0" cellspacing="0" cellpadding="0"
						style=" font-size:12px;">
						<%
							String value = request.getParameter("value");
							Map map = (Map) request.getAttribute("showlevelconfig");
							if (map != null) {
								if(map.size() == 0){
							    out.println("主控字段名不匹配");
							    } else {
									Set set = map.keySet();
									for (Iterator iter = set.iterator(); iter.hasNext();) {
										out.println("<tr>");
										String name = (String) iter.next();
										List list = (List) map.get(name);
										for (int i = 0; i < list.size(); i++) {
									Map tempmap = (Map) list.get(i);
									if(value != null && !value.equals("")) {
										 if(value.indexOf(tempmap.get("id").toString()) > -1)
										 {
											out.println(" <td nowrap=\"nowrap\"><input name=\""
												+ name
												+ "\" type=\"checkbox\" checked id=\"radioid\" value=\""
												+ tempmap.get("id") + "\"/>");
										 } else {
										 	out.println(" <td nowrap=\"nowrap\"><input name=\""
												+ name
												+ "\" type=\"checkbox\"  id=\"radioid\" value=\""
												+ tempmap.get("id") + "\"/>");
										 }
												
									} else {
										out.println(" <td nowrap=\"nowrap\"><input name=\""
											+ name
											+ "\" type=\"checkbox\" id=\"radioid\" value=\""
											+ tempmap.get("id") + "\"/>");
									}
									out.println(" <a id =\"divo\">" + tempmap.get("label")
											+ "</a><br></td>");
										}
										out.println("</tr><tr></tr>");
									}
								}
							}else{
							out.println("无控制");
							}
						%>
					</table>
				</div>
			</div>
			<BR />
			<BR />
			<center>
				<INPUT type="button" name="buton" class="button_style" value="确定"
					onclick="doshowlevelconfig()" />
				<INPUT type="button" class="button_style" value="取消"
					onclick="window.close()" />
			</center>
		</form>
	</body>
</html>
