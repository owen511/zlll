<%@ page contentType="text/html; charset=GBK"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<jsp:directive.page
	import="gov.mof.fasp.ifmis.ltrptapp.manage.LTReportTypeTreeView" />
<jsp:directive.page
	import="com.longtu.rpt.fm.rpt.rptmanager.dto.LtReportTypeDTO" />
<jsp:directive.page import="java.util.List" />
<link type="text/css" rel="stylesheet"
	href="<%=request.getContextPath()%>/style/style.css" />
<link type="text/css" rel="stylesheet"
	href="<%=request.getContextPath()%>/style/dtree.css" />
<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/dtree.js"></script>
<script src="<%=request.getContextPath()%>/js/datatable.js"></script>
<script type="text/javascript">
var userid = "<%=gov.mof.fasp.sec.util.SecureUtil.getCurrentUser()
							.getUserid()%>";
</script>
<%String engine = request.getParameter("engine");
	if(engine==null){
		engine = "1";
	}%>
<script type="text/javascript">
    function saveContinue(){
      var formObject = $("rptform");     
      var rptname = formObject.rptname.value;
      var rptcode = formObject.rptcode.value;
      var reporttypeid = formObject.reporttypeid.value;
    	if("" == reporttypeid || !isLeaf(reporttypeid))
    	{
    		alert("请先选择一个所属的报表类别！");
    		return false;
    	}
      if(rptcode == ""){
            alert("请输入报表编码！");
            return;
      }
      
      if(rptname == ""){
            alert("请输入报表名称！");
            return;
      }
      
      formObject.action = '/ltrptapp/manage/reportedit_add_continue.do';	
      formObject.submit();
    }
    
    function saveExit(){
      var formObject = $("rptform");     
      var rptname = formObject.rptname.value;
      var rptcode = formObject.rptcode.value;
      var reporttypeid = formObject.reporttypeid.value;
    	if("" == reporttypeid  || !isLeaf(reporttypeid))
    	{
    		alert("请先选择一个末级报表分类！");
    		return false;
    	}
      if(rptcode == ""){
            alert("请输入报表编码！");
            formObject.rptcode.focus();
            return;
      }
      if(rptname == ""){
            alert("请输入报表名称！");
            formObject.rptname.focus();
            return;
      }
      
      
      formObject.action = '/ltrptapp/manage/reportedit_add.do' +"?engine="+<%=engine%>;	
      formObject.submit(); 
    }
    
    function cancel(){
        var formObject = $("rptform");
    	var reporttypeid = formObject.reporttypeid.value;
    	
      	var submenuid = <c:out value="${param.submenu}"/>;
		var mainmenu = <c:out value="${param.mainmenu}"/>;
		var url = "/ltrptapp/manage/reportedit.do?mainmenu="+mainmenu+"&submenu="+ submenuid+"&reporttypeid="+reporttypeid+"&engine="+<%=engine%>;
       	window.location.href = url;
    }
    
    function checkreporttypeid()
    {
    	var formObject = $("rptform");
    	var reporttypeid = formObject.reporttypeid.value;
    	if("" == reporttypeid || !isLeaf(reporttypeid))
    	{
    		alert("请先选择一个末级报表分类！");
    		return false;
    	}
    }
    
    function setRptType(tree){
    	
    	var formObject = $("rptform");
    	var rptTypeName = $("reporttypename");
    	var rptTypeId = tree.getSelected();
    	formObject.reporttypeid.value=rptTypeId;
    	rptTypeName.innerHTML=getRptTypeName(rptTypeId); 
    	
    }
    

   

</script>
<div style="width:98%;">
	<table>
		<tr>
			<!-- tree -->
			<td width='40%' valign='top'>
				<div id="sub_tree"
					style="width:200px; height:400px;float:left; margin-left:5px; margin-top:10px;height:expression(document.body.offsetHeight-window_top.offsetHeight-hidden_top.offsetHeight-12); overflow:auto; border:#8BA3DA 1px solid; ">
					<script type="text/javascript">
					var d = new dTree('d','/images/dtree/');
					d.add(0,-1,'');
					<%
					String mainmenu = "";
					String submenu = "";
					LtReportTypeDTO superid = null;
					if (request.getParameter("mainmenu") != null) {
						mainmenu = request.getParameter("mainmenu").toString();
					}
					if (request.getParameter("submenu") != null) {
						submenu = request.getParameter("submenu").toString();
					}
					if (request.getAttribute("superid") != null) {
						superid = (LtReportTypeDTO)request.getAttribute("superid");
					}
					List viewLists = (java.util.List) request.getAttribute("viewLists");
					if(null != viewLists)
					{
						StringBuffer strExcute = new StringBuffer();
						//String treeUrl = "/ltrptapp/manage/add_reportedit.do?mainmenu="+mainmenu+"&submenu="+submenu;
						String treeUrl = "javascript:setRptType(d)";
						LTReportTypeTreeView.showTree(viewLists,0,treeUrl,strExcute);
						out.print(strExcute.toString());
					}
					if(null == superid)
					{
						out.print("d.closeAll();");
					}
					%>
					document.write(d);
					d.openAll();
					</script>
				</div>
			</td>
			<!-- table -->
			<td width='60%' valign='top'>
				<div
					style="overflow:auto; width:expression(document.body.offsetWidth-left_tree.offsetWidth-switchBar.offsetWidth-sub_tree.offsetWidth-switchBar.offsetWidth-switchBar.offsetWidth-20); display:block; ">
					<form action="/ltrptapp/manage/reportedit_add.do" name='rptform'
						method="post" >
						<input name=submenu id=submenu type="hidden"
							value="<c:out value='${param.submenu}'/>" />
						<input name=mainmenu id=mainmenu type="hidden"
							value="<c:out value='${param.mainmenu}'/>" />
						<input name=reporttypeid id=reporttypeid type="hidden"
							value="<c:out value='${superid.reporttypeid}'/>" />
						<div id="form_table_title_edit">
							<ul>
								<li class="top">
									<div>
										报表模板定义编辑区
									</div>
								</li>
							</ul>
						</div>
						<div id="form_table" >
							<table border="0" cellpadding="0px" cellspacing="0px" style="width:100%">
							    <tr>
								    <th nowrap="nowrap">
										报表类别
										<span style="color:#FF0000;">*</span>
									</th>
									<td id="reporttypename" nowrap="nowrap">
										<%
												if (null != superid && !"".equals(superid)) {
												out.print(superid.getReporttypename());
											} 
										%>
									</td>
									<th nowrap="nowrap">
										
									</th>
									<td nowrap="nowrap">
									</td>
								</tr>

								<tr>
									<th nowrap="nowrap">
										报表编码
										<span style="color:#FF0000;">*</span>
									</th>
									<td nowrap="nowrap">
										<input type="text" name='rptcode'
											value="<c:out value='${param.rptcode}'/>"
											onfocus="checkreporttypeid();" />
									</td>

									<th nowrap="nowrap">
										报表名称
										<span style="color:#FF0000;">*</span>
									</th>
									<td nowrap="nowrap">
										<input type="text" name='rptname'
											value="<c:out value='${param.rptname}'/>"
											onfocus="checkreporttypeid();" />
									</td>
								</tr>

					<%if ("1".equals(engine)) {%>
								<tr>
									<th nowrap="nowrap">
										是否公用
									</th>
									<td nowrap="nowrap">
										<select name=ispublic id=ispublic>
											<c:choose>
												<c:when test="${param.ispublic == 1}">
													<option value="0" >
														否
													</option>
													<option value="1" selected="selected">
														是
													</option>
												</c:when>
												<c:otherwise>
													<option value="0" selected="selected">
														否
													</option>
													<option value="1" >
														是
													</option>
												</c:otherwise>
											</c:choose>

										</select>
									</td>

									<th nowrap="nowrap">
										是否显示菜单
									</th>
									<td nowrap="nowrap">
										<select name=showmenu id=showmenu>
											<c:choose>
												<c:when test="${param.showmenu == 1}">
													<option value="0" >
														否
													</option>
													<option value="1" selected="selected">
														是
													</option>
												</c:when>
												<c:otherwise>
													<option value="0" selected="selected">
														否
													</option>
													<option value="1" >
														是
													</option>
												</c:otherwise>
											</c:choose>

										</select>
									</td>
								</tr>
					<%}%>
							</table>
						</div>

						<div id="confirm_exit_btn">
							<input name="submit2" type="button" class="button_style"
								onmouseover="this.className='OverBtn'"
								onmouseout="this.className='button_style'"
								onmousedown="this.className='down'" value="保存"
								onclick="saveExit();" />
							<input name="submit3" type="button" class="button_style"
								onmouseover="this.className='OverBtn'"
								onmouseout="this.className='button_style'"
								onmousedown="this.className='down'" value="返回"
								onclick="cancel();" />
						</div>
					</form>
				</div>
			</td>
		</tr>
	</table>


</div>
