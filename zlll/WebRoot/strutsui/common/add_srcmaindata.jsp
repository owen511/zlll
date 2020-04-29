<%@page language="java" contentType="text/html; charset=GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%
       String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
%>
<SCRIPT LANGUAGE="JavaScript" type="text/javascript" src="<%=basePath%>/strutsui/js/editsrcmaindata.js"></SCRIPT>
<script>

// ������������¼���row ����ѡ�е��У�Ҳ���Ǵ���ҳ���������Ϣ
function mainclick(row){

	// ��ȡ�ù���ѡ���ѡ��ѡ�е���
	var selectrows = tmain.getSelectedRow();
	if(selectrows.length == 0){
		// �û�ֻ�ڱ���ϵ����һ�£���û��ѡ���κ���
		return ;
	}
	
	// ���ڽ�����ʹ�õ��ǵ�ѡ�������ȡѡ����
	var selectrow = selectrows[0];
	
	// ����Ѿ���ѡ���У�����׷������ϸ����ʾ�û��Ƿ�Ҫ����
	if(selectrow != mainVouch && mainVouch != null && mainVouch.details != null){
		if(confirm("�Ƿ�����༭��")){
			if(tdetail != null && tdetail.data != null && tdetail.data.length > 0 ){
				// ɾ��ѡ�е�����
				var datas = tdetail.data;
				var money = 0.0;
				for(var i=0;i<datas.length;i++){
				    //alert(datas[i].amt);
					money += parseFloat(moneyFormatToNumber(datas[i].amt));
				}	
				// ��ɾ������ϸ�еĽ���˻ص�����
				mainVouch.curbal = parseFloat(moneyFormatToNumber(mainVouch.curbal)) + parseFloat(money);
				clearFormInput();
				mainVouch.details = null;
				tmain.draw();
				detailObj=null;
				setDisabled(true);
			}
			tdetail.data = new Array();
			tdetail.draw();
			mainVouch= selectrow;
			mainsynch2fromtable(mainVouch);
			addDetail();
			return;
		}
		else{
			selectrow.checked=false;
			mainVouch.checked=true;
			tmain.draw();
			mainsynch2fromtable(mainVouch);
			addDetail();
			return ;
		}
	}
	
	mainVouch = selectrow;
	mainsynch2fromtable(mainVouch);
	addDetail();

}

</script>
<ui:menufunction divid="query_t"></ui:menufunction>
<form id="queryform" name="queryform" method="post"
	action="edit.do?actiontype=add&mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>">
	<ui:queryform formid="queryform" />
</form>
<div id="form_table_title">
	<ul>
		<li class="top">
			<div>
				��Դ��Ϣ
			</div>
		</li>
	</ul>
</div>
<!-- ���DIV�϶�����������ʽ -->
<div id="containerline4">
	<!-- ʹ�ñ�ǩ������onclick ʹ�õķ��������֮ǰ����� -->
	<ui:datatable id="tmain" tabletype="MainList" data="sourcesjson"
		onclick="mainclick" showradio="true" columndefine="true" />
</div>

<div id="form_table_title_edit">
	<ul>
		<li class="top">
			<div>
				�����༭��
			</div>
		</li>
	</ul>
</div>
<!--һ�з�������ѯ����-->
<form name="detailform" id="detailform"
	action="save.do?submittype=form&mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>"
	method="post">
	<input type ="hidden" name ="maindata" id ="maindata" />
	<div id="form_table" style="display:block;">
		<%--���༭��--%>
		<ui:maineditform formid="detailform" pagetype="add" parsetype="link"
			tableName="tmain" />
	</div>
	<div id="form_table_title">
		<ul>
			<li class="top">
				<div>
					��ϸ��Ϣ
				</div>
			</li>
		</ul>
	</div>
	<!--�뱣����div��a��ǩ -->
	<div id="containerline4">
		<ui:datatable id="tdetail" tabletype="DetailList" showradio="true"
			onclick="detailclick" columndefine="true" />
	</div>
	<div id="form_table_title_edit">
		<ul>
			<li class="top">
				<div>
					��ϸ�༭��
				</div>
			</li>
		</ul>
	</div>
	<div id="form_table" style="display:block;">
		<ui:editform formid="detailform" pagetype="add" parsetype="link"
			tableName="tdetail" />
	</div>
	<div id="confirm_exit_btn">
		<input name="button1" type="button" value="������ϸ��" class="button_style"
			onclick="addDetail()" />
		<input name="button2" type="button" value="ɾ����ϸ��" class="button_style"
			onclick="delDetail();" />
		<input name="savebutton" type="button" value="���沢����"
			class="button_style" onclick="return saveContinue()" />
		<input name="button3" type="button" value="���沢�˳�" class="button_style"
			onclick="return saveQuit()" />

		<input name="back" type="button" value="����" class="button_style"
			onclick="backCheckSave()" />
	</div>
</form>
<script>
//ҳ�����ʱ�������������Ϊ������
setDisabled(true);

//��rowObj������ͬ�������༭��
function mainsynch2fromtable(rowObj){
	//�������
}
//ͬ�������༭�����ݵ��ӵ�����
function maindatasynch() {
	if("undefined" == typeof(maininpueleList) ||maininpueleList == null || maininpueleList.length ==0){
		return ;
	}
	var ttemp = tmain;
	if(tdetail){
		ttemp = tdetail;
	}
	if (ttemp != null && ttemp.data != null && ttemp.data.length > 0) {
				//ͬ���������������ݷ�������
		var datas = ttemp.data;	
		//���༭�����Ԫ������
		//maininpueleList;
		for (var i = 0; i < datas.length; i++) {
			for (var j = 0; j < maininpueleList.length; j++) {
			
				eval(" var eleObj = $('detailform')." + maininpueleList[j] + ".value");
				var temp = maininpueleList[j].replace("main", "");
				eval("datas[i]." + temp + "= eleObj");
			}
		}
	}
	ttemp.draw();
}
</script>

