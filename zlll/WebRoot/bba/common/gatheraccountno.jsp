<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ include file="/bba/common/common.jsp"%>
<%
	String styleName = "stylefontS.css";
%>
<script type="text/javascript">
	window.name="spare";
	var params = window.dialogArguments;
	var commonMenu = '<%=menu%>';
	String.prototype.trim = function() {
		return this.replace(/(^\s*)|(\s*$)/g, "");
	}
	var url = window.location.href;
	url = url.substr(0, url.indexOf('?')) + '?' + commonMenu;
	if (params != null && params.condition != null
			&& params.condition.trim() != "") {
		url += params.condition.trim();
	}

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
		<form id="queryform" action="./showgatheraccountno.do?<%=menu%>" method="post"
			target="spare">
			<ui:queryform formid="queryform" />
		</form>
		<div>
			<form name="mainListForm" id="mainListForm" action="#" method="post">
				<input name="selectedbillids" id="selectedbillids" type="hidden"
					value="">
				<div id="form_table_title">
					<ul>
						<li class="top">
							<div>�˺���Ϣ</div>
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
	$("queryform").action = url;
</script>