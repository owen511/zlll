<%@ page contentType="text/html; charset=GBK"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<jsp:directive.page
	import="gov.mof.fasp.ifmis.system.report.dto.ReportTypeTreeView" />
<jsp:directive.page
	import="gov.mof.fasp.fm.rpt.rptmanager.dto.ReportTypeDTO" />
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
    function saveContinue(){
      var formObject = $("rptform");     
      var rptname = formObject.rptname.value;
      var rptcode = formObject.rptcode.value;
      var file = formObject.uploadfile.value;
      var reporttypeid = formObject.reporttypeid.value;
    	if("" == reporttypeid)
    	{
    		alert("����ѡ��һ�������ı������");
    		return false;
    	}
      if(rptcode == ""){
            alert("�����뱨����룡");
            return;
      }
      
      if(rptname == ""){
            alert("�����뱨�����ƣ�");
            return;
      }
      
      if(file == ""){
         alert("��ѡ�񱨱�ģ���ļ���");
         return;
      }
      formObject.action = '/report/reportedit_add_continue.do';	
      formObject.submit();
    }
    
    function saveExit(){
      var formObject = $("rptform");     
      var rptname = formObject.rptname.value;
      var rptcode = formObject.rptcode.value;
      var file = formObject.uploadfile.value;
      var reporttypeid = formObject.reporttypeid.value;
    	if("" == reporttypeid)
    	{
    		alert("����ѡ��һ�������ı������");
    		return false;
    	}
      if(rptcode == ""){
            alert("�����뱨����룡");
            return;
      }
      if(rptname == ""){
            alert("�����뱨�����ƣ�");
            return;
      }
      
      if(file == ""){
         alert("��ѡ�񱨱�ģ���ļ���");
         return;
      }
      formObject.action = '/report/reportedit_add.do';	
      formObject.submit(); 
    }
    
    function cancel(){
      	var submenuid = <c:out value="${param.submenu}"/>;
		var mainmenu = <c:out value="${param.mainmenu}"/>;
		var url = "/report/reportedit.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
       	window.location.href = url;
    }
    
    function checkreporttypeid()
    {
    	var formObject = $("rptform");
    	var reporttypeid = formObject.reporttypeid.value;
    	if("" == reporttypeid)
    	{
			window.event.srcElement.blur();
    		alert("����ѡ��һ�������ı������");
    		return false;
    	}
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
						String treeUrl = "/report/add_reportedit.do?mainmenu="+mainmenu+"&submenu="+submenu;
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
					style="overflow:auto; width:100%; display:block; ">
					<form action="/report/reportedit_add.do" name='rptform'
						method="post" ENCTYPE="multipart/form-data">
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
										����ģ�嶨��༭��
									</div>
								</li>
							</ul>
						</div>
						<div id="edit_table" style="height:160px;">
							<table border="0" cellpadding="0px" cellspacing="0px">
								<tr>
									<th nowrap="nowrap">
										�������
										<span style="color:#FF0000;">*</span>
									</th>
									<td nowrap="nowrap">
										<input type="text" name='rptcode'
											value="<c:out value='${param.rptcode}'/>"
											onfocus="checkreporttypeid();" />
									</td>
									<th nowrap="nowrap">
										��������
										<span style="color:#FF0000;">*</span>
									</th>
									<td nowrap="nowrap">
										<input type="text" name='rptname'
											value="<c:out value='${param.rptname}'/>"
											onfocus="checkreporttypeid();" />
									</td>
								</tr>
								<tr>
									<th nowrap="nowrap">
										����汾
									</th>
									<td nowrap="nowrap">
										<input type="text" name='rptversion'
											value="<c:out value='${param.rptversion}'/>"
											onfocus="checkreporttypeid();" />
									</td>
									<th nowrap="nowrap">
										�Ƿ��ӱ���
									</th>
									<td nowrap="nowrap">
										<select name=ischild id=ischild>
											<c:choose>
												<c:when test="${param.ischild == 0}">
													<option value="0" selected="selected">
														��
													</option>
													<option value="1">
														��
													</option>
												</c:when>
												<c:otherwise>
													<option value="0" selected="selected">
														��
													</option>
													<option value="1">
														��
													</option>
												</c:otherwise>
											</c:choose>

										</select>
									</td>
								</tr>
								<tr>
									<th nowrap="nowrap">
										ҵ������
									</th>
									<td nowrap="nowrap">
										<input type="text" name='businesstable'
											value="<c:out value='${param.businesstable}'/>"
											onfocus="checkreporttypeid();" />
									</td>
									<th nowrap="nowrap">
										��������
									</th>
									<td nowrap="nowrap">
										<input type="text" name='filtersql'
											value="<c:out value='${param.filtersql}'/>"
											onfocus="checkreporttypeid();" />
									</td>

								</tr>
								<tr>
									<th nowrap="nowrap">
										�����ļ�
										<span style="color:#FF0000;">*</span>
									</th>
									<td nowrap="nowrap">
										<INPUT TYPE="FILE" NAME="uploadfile" SIZE="25" />
									</td>
									<th nowrap="nowrap">
										�������
									</th>
									<td nowrap="nowrap">
										<%
												if (null != superid && !"".equals(superid)) {
												out.print(superid.getSystemcode()+"-"+superid.getReporttypename());
											} else {
												out.print("����");
											}
										%>
									</td>

								</tr>
								<tr>
									<th nowrap="nowrap">
										����˵��
									</th>
									<td nowrap="nowrap" colspan="3">
										<TEXTAREA NAME="remark" ROWS="3" COLS="90"><c:out value='${param.remark}'/></TEXTAREA>
									</td>

								</tr>
							</table>
						</div>

						<div id="confirm_exit_btn">
							<input name="submit2" type="button" class="button_style"
								onmouseover="this.className='OverBtn'"
								onmouseout="this.className='button_style'"
								onmousedown="this.className='down'" value="����"
								onclick="saveExit();" />
							<input name="submit3" type="button" class="button_style"
								onmouseover="this.className='OverBtn'"
								onmouseout="this.className='button_style'"
								onmousedown="this.className='down'" value="����"
								onclick="cancel();" />
						</div>
					</form>
				</div>
			</td>
		</tr>
	</table>


</div>
