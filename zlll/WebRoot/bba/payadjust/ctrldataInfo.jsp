<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ include file="/bba/common/common.jsp"%>
<%
	String styleName = "stylefontS.css";
	response.setHeader("Cache-Control", "no-cache");
	response.setHeader("Pragma", "no-cache");
	response.setDateHeader("Expires", 0);
	//���´�����Ϊ�ڵ�ǰҳ��ѯʱ�����Ĵ��ݣ�������Ŀ��Ԥ����Դ�����ܷ����п�������Ϊ��ѯ���������Բ������͵��'ѡ����Ŀ��'��ťʱ���ݲ������� bengin
	Object budgetproj2Obj = request.getAttribute("budgetproj2");
	Object budgetsource2Obj = request.getAttribute("budgetsource2");
	Object budgetfuncclass2Obj = request
			.getAttribute("budgetfuncclass2");
	Object budgetagency = request.getAttribute("budgetagency");
	Object accountno = request.getAttribute("accountno");
	Object element01 = request.getAttribute("element01");
	Object curamt = request.getAttribute("curamt");
	StringBuffer paramsSql = new StringBuffer();
	if (null != budgetproj2Obj
			|| "undefined".equals(budgetproj2Obj.toString())) {
		paramsSql.append("&").append("budgetproj2=")
				.append(budgetproj2Obj.toString());
	}
	if (null != budgetsource2Obj
			|| "undefined".equals(budgetsource2Obj.toString())) {
		paramsSql.append("&").append("budgetsource2=")
				.append(budgetsource2Obj.toString());
	}
	if (null != budgetfuncclass2Obj
			|| "undefined".equals(budgetfuncclass2Obj.toString())) {
		paramsSql.append("&").append("budgetfuncclass2=")
				.append(budgetfuncclass2Obj.toString());
	}
	if (null != accountno || "undefined".equals(accountno.toString())) {
		paramsSql.append("&").append("accountno=")
				.append(accountno.toString());
	}
	if (null != budgetagency
			|| "undefined".equals(budgetagency.toString())) {
		paramsSql.append("&").append("budgetagency=")
				.append(budgetagency.toString());
	}
	if (null != element01 || "undefined".equals(element01.toString())) {
		paramsSql.append("&").append("element01=")
				.append(element01.toString());
	}
	if (null != curamt || "undefined".equals(curamt.toString())) {
		paramsSql.append("&").append("curamt=")
				.append(curamt.toString());
	}
	//��ô������Ϊ�ڵ�ǰҳ��ѯ�ǲ����Ĵ��ݣ�������Ŀ��Ԥ����Դ�����ܷ����п�������Ϊ��ѯ���� end
	//System.out.println(paramsSql.toString());
%>
<script type="text/javascript">
	window.name="spare";
	var params = window.dialogArguments;
	var commonMenu = '<%=menu%>';
	String.prototype.trim = function() {
		return this.replace(/(^\s*)|(\s*$)/g, "");
	}
	/*
	var url = window.location.href;
	if (params != null && params.condition != null
			&& params.condition.trim() != "") {
		url += params.condition.trim();
	}*/
	var result = new Object();
	//ȡ���¼�.
	function closeWindow(isReturn) {
		if (isReturn) {
			window.returnValue = result;
		} else {
			window.returnValue = null;
		}
		window.close();
	}

	//�������¼�.
	function mainclick(row) {
		tmain.selectedallrows(false);
		row.checked = true;
		tmain.draw();
	}

	//ȷ���¼�.
	function conformcolse() {
		//ѡ�������ݷ��ظ���ҳ��
		var trobj = tmain.getSelectedRow()[0];
		if (trobj == null) {
			alert("��ѡ��һ�����ݡ�");
			return;
		}
		result = trobj;
		closeWindow(true);
	}
</script>
</head>
<body class="pop_body">
	<div id="popPage">
		<div id="shenhe_title">
			<div id="shenhe_title_middle">��ѡ��</div>
		</div>
		<ui:menufunction divid="query_t"></ui:menufunction>
		<form id="queryform"
			action="./findctrl.do?fromquery=yes&<%=menu%><%=paramsSql%>"
			method="post" target="spare">
			<ui:queryform formid="queryform" />
		</form>
		<div>
			<form name="mainListForm" id="mainListForm" action="#" method="post">
				<input name="selectedbillids" id="selectedbillids" type="hidden" value="">
				<div id="form_table_title">
					<ul>
						<li class="top">
							<div>�����Ϣ</div>
						</li>
						<li><ui:row2column dataid="tmain" showdivname="edit_table"
								columnNum="4" drawDetail="true" /></li>
					</ul>
				</div>
				<!--�뱣����div��a��ǩ -->
				<div id="containerline10">
					<div id='edit_table' style='display: none; padding: 0; margin: 0;'></div>
					<ui:datatable id="tmain" tabletype="MainList" data="json"
						onclick="mainclick" showradio="true" columndefine="true"
						sumColumnList="curamt" />
				</div>
			</form>
		</div>
		<div id="pop_button" style="margin-top: 10px;">
			<CENTER>
				<INPUT type="button" onClick="conformcolse()" value="ȷ��"
					class="button_style" onMouseOver="this.className='OverBtn'"
					onMouseOut="this.className='button_style'"
					onMouseDown="this.className='down'" /> <INPUT type="button"
					onClick="javascript:closeWindow(false)" value="ȡ��"
					class="button_style" onMouseOver="this.className='OverBtn'"
					onMouseOut="this.className='button_style'"
					onMouseDown="this.className='down'" />
			</CENTER>
		</div>
	</div>
</body>
<script type="text/javascript">
	tmain.show();
</script>