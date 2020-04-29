<%@page language="java" contentType="text/html; charset=GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<jsp:directive.page import="java.util.List" />
<jsp:directive.page import="java.util.Map" />
<jsp:directive.page import="java.util.Set" />
<jsp:directive.page import="java.util.Iterator" />
<jsp:directive.page import="gov.mof.fasp.dic.column.dto.ColumnDTO" />
<jsp:directive.page
	import="gov.mof.fasp.pa.vouchertype.dto.VoucherTypeDTO" />
<script>
	function exportdata() {
		var curTbl = document.getElementById("datatable");
		var oXL = new ActiveXObject("Excel.Application");
		//����AX����excel
		var oWB = oXL.Workbooks.Add();
		//��ȡworkbook����
		var oSheet = oWB.ActiveSheet;
		//���ǰsheet
		var Lenr = curTbl.rows.length;
		//ȡ�ñ������
		var curCellText = "";
		for (i = 0; i < Lenr; i++) {
			var Lenc = curTbl.rows(i).cells.length;

			//ȡ��ÿ�е�����
			for (j = 0; j < Lenc; j++) {
				oSheet.Cells(i + 1, j + 1).value = curTbl.rows(i).cells(j).innerText;
				if (i == 0) {
					oSheet.Columns(j + 1).NumberFormatLocal = "@";
				}
			}
			if (i % 20 == 1) {
				if (Lenr - i - 1 > 19) {
					oSheet.Range(oSheet.Cells(i + 1, Lenc),
							oSheet.Cells(i + 20, Lenc)).Merge();
				} else {
					oSheet.Range(oSheet.Cells(i + 1, Lenc),
							oSheet.Cells(Lenr, Lenc)).Merge();
				}
			}
		}
		oXL.Visible = true;
	}

	function closeWindows() {
		if (window.opener.returnBack) {
			window.opener.returnBack();
		}
		window.opener = null;
		window.close();
	}
</script>
<style>
.main_table_title1 {
	position: relative;
	top: expression(this.offsetParent.scrollTop);
	BORDER-RIGHT: #ffffff 1px solid;
	BORDER-TOP: #ffffff 1px solid;
	BORDER-LEFT: #ffffff 1px solid;
	BORDER-BOTTOM: #ffffff 1px solid;
	BACKGROUND-COLOR: #e7ebf7;
	HEIGHT: 22px;
	FONT-SIZE: 12px;
}
;
</style>
<form id="mainform" name="mainform" method="post" action="%">
	<%
	    List columnList = (List) request.getAttribute("tableColumnList");
	    List dataList = (List) request.getAttribute("returnList");
	    String rightNum = (String) request.getAttribute("rightnum");
	%>
	<div
		style="width: 98%; border: 1px #E3E3E3 solid; height: 50px; display: block; margin: 0 10px;">
		<div
			style="margin: 10px 10px; background-color: #D8E4F3; height: 30px; text-align: left; display: block;">
			<table width="100%" border="0" cellspacing="0" cellpadding="0"
				style="line-height: 30px; font-size: 14px;">
				<tr>
					<td align="center">
						��������
					</td>
					<td align="center">
						�ɹ�������<%=rightNum%></td>
					<td align="center" style="color: #FF0000;">
						ʧ������:<%=dataList.size()%></td>
				</tr>
			</table>
		</div>
	</div>
	<br />
	<%
	    if (dataList.size() > 0) {
	%>
	<div id="form_table_title">
		<ul>
			<li class="top">
				<div>
					�����������
				</div>
			</li>
		</ul>
	</div>
	<!-- ָ���б� -->
	<%
	    int size = dataList.size();
	        int height = 0;
	        if (size > 20) {
	            height = 20;
	        } else if (size < 7) {
	            height = 7;
	        } else {
	            height = size;
	        }
	%>
	<div id="containerline15">
		<div
			style="height: 100%; width: 100%; margin-left: 0px; margin-bottom: 10px; overflow: scroll;">
			<table class="main_table_98" id="datatable" border="0"
				cellspacing="0" cellpadding="1" hight="100%" width="100%">
				<tr class="main_table_title">
					<th nowrap="nowarp">
						�к�
					</th>
					<%
					    if (null != columnList) {
					            for (Iterator it = columnList.iterator(); it.hasNext();) {
					                ColumnDTO columnDTO = (ColumnDTO) it.next();
					                out.println("<th nowrap=\"nowarp\">" + columnDTO.getName() + "</th>");
					            }
					        }
					%>
					<th nowrap="nowarp">
						������Ϣ
					</th>
				</tr>
				<%
				    if (null != dataList) {
				            if (null != columnList) {
				                for (int i = 0; i < dataList.size(); i++) {
				                    Map tempMap = (Map) dataList.get(i);
				                    out.println("<tr class=\"main_table_title_letter\">");
				                    out.println("<td align=\"center\">" + i + "</td>");
				                    for (Iterator it = columnList.iterator(); it.hasNext();) {
				                        ColumnDTO columnDTO = (ColumnDTO) it.next();
				                        if (columnDTO.getSourcetable() == null || "".equals(columnDTO.getSourcetable())) {
				                            out.println("<td align=\"left\">"
				                                    + (tempMap.get(columnDTO.getColumncode()) != null ? tempMap.get(columnDTO
				                                            .getColumncode()) : "") + "</td>");
				                        } else {
				                            out.println("<td align=\"left\">"
				                                    + (tempMap.get(columnDTO.getColumncode() + "_code") != null ? tempMap
				                                            .get(columnDTO.getColumncode() + "_code") : "") + "</td>");
				                        }
				                    }
				                    if (tempMap.get("errorlog") != null && !"".equals(tempMap.get("errorlog"))) {
				                        out.println("<td align=\"left\">" + tempMap.get("errorlog") + "</td>");
				                    } else {
				                        out.println("<td align=\"left\">&nbsp;</td>");
				                    }
				                    out.println("</tr>");
				                }
				            }
				        }
				%>
			</table>
		</div>
	</div>
	<%
	    }
	%>
</form>
<div id="querybutton">
	<div align="right">
		<input name="export" type="button" value="����Excel"
			class="button_style" onclick="exportdata()" />
		<input name="close" type="button" value="�ر�" class="button_style"
			onclick="closeWindows()" />
	</div>
</div>



