<%@ page language="java" contentType="text/html; charset=GBK"
	pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%
    String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
		+ request.getContextPath();
	String introducetype = (String)request.getAttribute("introducetype");
	String introduceurl = (String)request.getAttribute("introduceurl");//1û�д��죻����2���д��죻3�����챳��
	String introduceheight = (String)request.getAttribute("introduceheight");
%>
<style type="text/css">
<!--
.STYLE1 {
	color: #FF0000
}
-->
</style>
<script type="text/javascript">
	var contentDiv=document.getElementById('context');
	<% if("1".equals(introducetype)){%>
	contentDiv.layout="{w:{fit:true},h:{fit:'auto'}}";
	<%}else{%>
	contentDiv.style.width="98%";
	<%}%>
	contentDiv.align="center";
	contentDiv.style.overflow="auto";
</script>
<% if(!"1".equals(introducetype)){
	String areaflag=gov.mof.fasp.ifmis.common.Globals.IFMIS_LOGO;
    String urlPath=request.getParameter("mainmenu")!=null?request.getParameter("mainmenu").toString():""; 
	if(("anhuisheng".equals(areaflag)&&"57000000".equals(urlPath))){//����ר��
%>
<div style="height:476px; background:url('<%=basePath%>/portal/images/zhbg.gif') no-repeat center top;">
<% }%>
<div id="form_table_title" style="width:96%;margin-left:0;">
	<ul>
		<li class="top">
			<div>
				��������
			</div>
		</li>
	</ul>
</div>
<div  style="width:96%;">
	<div id="list">
		<table border="0" id="tbl" cellspacing="1" align="center">
			<tr>
				<th nowrap="NOWRAP">
					���
				</th>
				<th nowrap="NOWRAP">
					ҵ������
				</th>
				<th nowrap="NOWRAP">
					��������
				</th>
				<th nowrap="NOWRAP">
					����
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
						<c:out value="${operate.menuName}" />
					</td>
					</c:if>
						<td nowrap="NOWRAP">
							��
							<span class="STYLE1">
							<c:choose>
								<c:when test="${returnHandle == true && operatedetail.operattypedto.name=='�˻�'}">
									����
								</c:when>
								<c:otherwise>
									<c:out
									value="${operatedetail.operattypedto.name}" />
								</c:otherwise>
							</c:choose>
							</span> ��
							<span class="STYLE1"><c:out
									value="${operatedetail.totalcount}" />
							</span> ��
						</td>
						<td nowrap="NOWRAP">
						<span class="STYLE1"><a
							href="<%=request.getContextPath()%><c:out value='${operatedetail.linkName}'/>">��
								��</a>
						</span>
					</td>			
					</tr>
					</c:forEach>
			</c:forEach>
		</table>
	</div>
</div>
<% 
if("anhuisheng".equals(areaflag)&&"57000000".equals(urlPath)){
%>
</div>
<% }%>
<% }
 if("2".equals(introducetype)){%>
	<iframe src = '<%=introduceurl %>' name="iframepage"  frameBorder=0 scrolling=no height="<%=introduceheight%>px"  width="96%" ></iframe>
<% }else if("1".equals(introducetype)){%>
	<iframe src = '<%=introduceurl %>' name="iframepage"  frameBorder=0 scrolling=no height="100%"  width="100%" ></iframe>
<% }%>
