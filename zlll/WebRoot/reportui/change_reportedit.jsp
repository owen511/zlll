<%@ page contentType="text/html; charset=GBK"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<jsp:directive.page
	import="gov.mof.fasp.ifmis.system.report.dto.ReportTypeTreeView" />
<jsp:directive.page import="gov.mof.fasp.fm.rpt.rptmanager.dto.ReportTypeDTO" />
<jsp:directive.page import="gov.mof.fasp.fm.rpt.rptmanager.dto.ReportDTO" />
<jsp:directive.page import="java.util.List" />
<link type="text/css" rel="stylesheet" href="<%=request.getContextPath()%>/style/dtree.css" />
<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/dtree.js"></script>
<script src="<%=request.getContextPath()%>/js/datatable.js"></script>
<script type="text/javascript">
var userid = "<%=gov.mof.fasp.sec.util.SecureUtil.getCurrentUser()
							.getUserid()%>";
</script>
<%
	ReportDTO reportDTO = (ReportDTO)request.getAttribute("reportDTO");
	Integer reportid = reportDTO.getReportid();
%>
<script type="text/javascript">
<!--
    function saveExit(){     
      var formObject = $("rptform");     
      var rptname = formObject.rptname.value;
      var rptcode = formObject.rptcode.value;
      var file = formObject.uploadfile.value;
      var reporttypeid = formObject.reporttypeid.value;
    	if("" == reporttypeid)
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
      
      if(file == ""){
         alert("请选择报表模板文件！");
         return;
      }
      formObject.action = '/report/reportedit_update.do';	
      formObject.submit(); 
    }
    function cancel(){
      	var submenuid = <c:out value="${param.submenu}"/>;
		var mainmenu = <c:out value="${param.mainmenu}"/>;
		var url = "/report/reportedit.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
       	window.location.href = url;
    }
//-->
</script>
<!-- InstanceBeginEditable name="EditRegion8" -->
<div style="width:90%;">
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
					ReportTypeDTO superid = (ReportTypeDTO)request.getAttribute("superid");
					if (request.getParameter("mainmenu") != null) {
						mainmenu = request.getParameter("mainmenu").toString();
					}
					if (request.getParameter("submenu") != null) {
						submenu = request.getParameter("submenu").toString();
					}
					List viewLists = (java.util.List) request.getAttribute("viewLists");
					if(null != viewLists)
					{
						StringBuffer strExcute = new StringBuffer();
						String treeUrl = "/report/update_reportedit.do?mainmenu="+mainmenu+"&submenu="+submenu+"&reportid="+reportid;
						ReportTypeTreeView.showTree(viewLists,0,treeUrl,strExcute);
						out.print(strExcute.toString());
					}
					if(null == superid)
					{
						out.print("d.closeAll();");
					}
					%>
					document.write(d);
					</script>
				</div>
			</td>
			<!-- table -->
			<td width='60%' valign='top'>
				<div
					style="overflow:auto;width:expression(document.body.offsetWidth-left_tree.offsetWidth-switchBar.offsetWidth-sub_tree.offsetWidth-switchBar.offsetWidth-switchBar.offsetWidth); display:block; ">
					<form action="/report/reportedit_update.do" name='rptform' method="post" ENCTYPE="multipart/form-data">
						<input name=submenu id=submenu type="hidden"
							value="<c:out value='${param.submenu}'/>" />
						<input name=mainmenu id=mainmenu type="hidden"
							value="<c:out value='${param.mainmenu}'/>" />
						<input type=hidden value='<c:out value='${reportDTO.reportid}'/>' name=reportid id=reportid></input>
						<input type=hidden value='<c:out value='${superid.reporttypeid}'/>' name=reporttypeid id=reporttypeid></input>								
						<div id="form_table_title_edit">
							<ul>
								<li class="top">
									<div>
										报表模板定义编辑区
									</div>
								</li>
							</ul>
						</div>
						<div id="edit_table" style="height:160px;">
							<table border="0" cellpadding="0px" cellspacing="0px" style="position:relative;">
								<tr>
									<th nowrap="nowrap">
										报表编码
										<span style="color:#FF0000;">*</span>
									</th>
									<td nowrap="nowrap">
										<input type="text" name='rptcode' value = '<c:out value='${reportDTO.reportcode}'/>' readonly="readonly"/>
									</td>
									<th nowrap="nowrap">
										报表名称
										<span style="color:#FF0000;">*</span>
									</th>
									<td nowrap="nowrap">
										<input type="text" name = 'rptname' value = '<c:out value='${reportDTO.reportspec}'/>' />
									</td>

								</tr>
								<tr>
									<th nowrap="nowrap">
										报表版本
									</th>
									<td nowrap="nowrap">
										<input type="text" name = 'rptversion' value = '<c:out value='${reportDTO.rptversion}'/>' />
									</td>
									<th nowrap="nowrap">
										是否子报表
									</th>
									<td nowrap="nowrap">
										<select name=ischild id=ischild>
											<c:if test="${reportDTO.ischild == 0}">
												<option value="0" selected="selected">
													否
												</option>
												<option value="1">
													是
												</option>
											</c:if>
											<c:if test="${reportDTO.ischild == 1}">
												<option value="0">
													否
												</option>
												<option value="1" selected="selected">
													是
												</option>
											</c:if>
										</select>
									</td>

								</tr>
								<tr>
									<th nowrap="nowrap">
										报表文件
										<span style="color:#FF0000;">*</span>
									</th>
									<td nowrap="nowrap">
									        <INPUT TYPE="FILE" NAME="uploadfile" SIZE="25"/>
									</td>
									<th nowrap="nowrap">
										报表类别
									</th>
									<td nowrap="nowrap">
										<%
										if(null == superid)
										{
											out.print("00-顶级");
										}else{
											out.print(superid.getSystemcode()+"-"+superid.getReporttypename());
										}
										%>
									</td>

								</tr>
								<tr>
									<th nowrap="nowrap">
										业务主表
									</th>
									<td nowrap="nowrap">
									    <input type="text" name = 'businesstable' value = '<c:out value='${reportDTO.businesstable}'/>' />
									</td>
									<th nowrap="nowrap">
										主表条件
									</th>
									<td nowrap="nowrap">
								     	<input type="text" name = 'filtersql' value = '<c:out value='${reportDTO.filtersql}'/>' />
									</td>

								</tr>
								<tr>
									<th nowrap="nowrap">
										报表说明
									</th>
									<td nowrap="nowrap" colspan="3">
										<TEXTAREA NAME="remark" ROWS="3" COLS="90"><c:out value='${reportDTO.remark}'/></TEXTAREA>
									</td>

								</tr>
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
