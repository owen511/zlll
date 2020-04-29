<%@ page contentType="text/html; charset=GBK"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<jsp:directive.page
	import="gov.mof.fasp.ifmis.system.report.dto.ReportTypeTreeView" />
<jsp:directive.page import="gov.mof.fasp.fm.rpt.rptmanager.dto.ReportTypeDTO" />
<jsp:directive.page import="java.util.List" />
<link type="text/css" rel="stylesheet"
	href="<%=request.getContextPath()%>/style/dtree.css" />
<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/dtree.js"></script>
<script src="<%=request.getContextPath()%>/js/datatable.js"></script>
<script type="text/javascript">
var userid = "<%=gov.mof.fasp.sec.util.SecureUtil.getCurrentUser()
							.getUserid()%>";
</script>
<script type="text/javascript">
<!-- 
    function saveContinue(){
      var formObject = $("rpttypeform");
      var rptname = formObject.reporttypename.value;
      if(rptname == ""){
            alert("请输入报表名称！");
            return;
      }
      formObject.action = '/report/reporttype_add_continue.do';	
      formObject.submit();
    }
    function saveExit(){
      var formObject = $("rpttypeform");
      var rptname = formObject.reporttypename.value;
      if(rptname == ""){
            alert("请输入报表名称！");
            return;
      }
      formObject.action = '/report/reporttype_add.do';	
      formObject.submit();
    }
    function cancel(){
	    var submenuid = <c:out value="${param.submenu}"/>;
		var mainmenu = <c:out value="${param.mainmenu}"/>;
		var url = "/report/list_reporttype_find.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
       	window.location.href = url;
    }
//-->
</script>
<!-- InstanceBeginEditable name="EditRegion8" -->
<div style="width:98%;">
	<table>
		<tr>
			<!-- tree -->
			<td width='40%' valign='top'>
				<div id="sub_tree"
					style="width:200px; float:left; margin-left:5px; margin-top:10px;height:expression(document.body.offsetHeight-window_top.offsetHeight-hidden_top.offsetHeight-12); overflow:auto; border:#8BA3DA 1px solid; ">
					<script type="text/javascript">
					var d = new dTree('d','/images/dtree/');
					d.add(0,-1,'');
					<%
					String mainmenu = "";
					String submenu = "";
					ReportTypeDTO superid = null;
					if (request.getParameter("mainmenu") != null) {
						mainmenu = request.getParameter("mainmenu").toString();
					}
					if (request.getParameter("submenu") != null) {
						submenu = request.getParameter("submenu").toString();
					}
					if (request.getAttribute("superid") != null) {
						superid = (ReportTypeDTO)request.getAttribute("superid");
					}
					List viewLists = (java.util.List) request.getAttribute("viewLists");
					if(null != viewLists)
					{
						StringBuffer strExcute = new StringBuffer();
						String treeUrl = "/report/add_reporttype.do?mainmenu="+mainmenu+"&submenu="+submenu;
						ReportTypeTreeView.showTree(viewLists,0,treeUrl,strExcute);
						out.print(strExcute.toString());
					}
					%>
					document.write(d);
					</script>
				</div>
			</td>
			<!-- table -->
			<td width='60%' valign='top'>
				<div
					style="  overflow:auto; width:expression(document.body.offsetWidth-left_tree.offsetWidth-switchBar.offsetWidth-sub_tree.offsetWidth-switchBar.offsetWidth-switchBar.offsetWidth-20); display:block; ">
					<form action="/report/reporttype_add.do" name='rpttypeform'
						method="post">
						<input name=submenu id=submenu type="hidden"
							value="<c:out value='${param.submenu}'/>" />
						<input name=mainmenu id=mainmenu type="hidden"
							value="<c:out value='${param.mainmenu}'/>" />
						<input name=superid id=superid type="hidden" value="<c:out value='${superid.reporttypeid}'/>" />
						<div id="form_table_title_edit">
							<ul>
								<li class="top">
									<div>
										报表分类定义编辑区
									</div>
								</li>
							</ul>
						</div>
						<div id="edit_table">
							<table border="0" cellpadding="0px" cellspacing="0px">
								<tr>
									<th nowrap="nowrap">
										类别编码
									</th>
									<td nowrap="nowrap">
										<input type="text" name='systemcode' id='systemcode'
											value="<%=ReportTypeDTO.SYSCODE_BDG %>" readonly="readonly" />
									</td>
									<th nowrap="nowrap">
										类别名称
										<span style="color:#FF0000;">*</span>
									</th>
									<td nowrap="nowrap">
										<input type="text" name='reporttypename' id='reporttypename'
											value="" />
									</td>
								</tr>
								<tr>
									<th nowrap="nowrap">父级节点</th>
									<td nowrap="nowrap">
										<%
										if(null != superid && !"".equals(superid))
										{
											out.print(superid.getReporttypename());
										}else{
											out.print("顶级");
										}
										%>
									</td>
									<th nowrap="nowrap"></th>
									<td nowrap="nowrap"></td>

								</tr>
								<tr>
									<th nowrap="nowrap"></th>
									<td nowrap="nowrap"></td>
									<th nowrap="nowrap">
										&nbsp;
									</th>
									<td nowrap="nowrap">
										&nbsp;
									</td>

								</tr>
								<tr>
									<th nowrap="nowrap">
										&nbsp;
									</th>
									<td nowrap="nowrap">
										&nbsp;
									</td>
									<th nowrap="nowrap">
										&nbsp;
									</th>
									<td nowrap="nowrap">
										&nbsp;
									</td>

								</tr>
								<tr>
									<th nowrap="nowrap">
										&nbsp;
									</th>
									<td nowrap="nowrap">
										&nbsp;
									</td>
									<th nowrap="nowrap">
										&nbsp;
									</th>
									<td nowrap="nowrap">
										&nbsp;
									</td>

								</tr>
							</table>
						</div>
						<div id="confirm_exit_btn">
							<input name="submit1" type="button" class="button_style"
								onmouseover="this.className='OverBtn'"
								onmouseout="this.className='button_style'"
								onmousedown="this.className='down'" value="保存并继续"
								onclick="saveContinue();" />
							<input name="submit2" type="button" class="button_style"
								onmouseover="this.className='OverBtn'"
								onmouseout="this.className='button_style'"
								onmousedown="this.className='down'" value="保存并退出"
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
