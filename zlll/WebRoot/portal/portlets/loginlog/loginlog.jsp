<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<script>
function query(){
	$('queryform').dosubmit();
}
</script>
<ui:menufunction divid="query_t"></ui:menufunction>
<form id="queryform"
	action="<%=request.getContextPath()%>/portal/loginlog/index.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>"
	method="post">
	<ui:queryform formid="queryform" />
</form>
<div>
	<form name="mainListForm" id="mainListForm" action="#" method="post">
		<input name="selectedbillids" id="selectedbillids" type="hidden"
			value="">
		<div id="form_table_title">
			<ul>
				<li class="top">
					<div>
						��ѯ��־
					</div>
				</li>
				
				<li><ui:row2column dataid="tmain" showdivname="edit_table" columnNum= "4"/></li>
			</ul>
		</div>
		<!--�뱣����div��a��ǩ -->
		
		<div id='edit_table' style='display:none;padding:0;margin:0;'></div>
		<div id="containerline20" style="display: block;">
			<ui:datatable columndefine="true" id="tmain" tabletype="MainList"  data="json"  showcheckbox="true"/>
		</div>
		
	</form>
</div>
<script>
//ѭ����ʾ���ݣ��ѵ�¼״̬��1�ĸ�Ϊ���ɹ�����0�ĸ�Ϊ��ʧ�ܡ�
for(var i=0;i<tmain.data.length;i++){
	if(tmain.data[i].status == 1 ){
		tmain.data[i].status = '�ɹ�';
	}
	if(tmain.data[i].status == 0){
		tmain.data[i].status = 'ʧ��';
	}
}
tmain.show();
</script>
