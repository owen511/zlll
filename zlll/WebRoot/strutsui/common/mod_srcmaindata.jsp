<%@page language="java" contentType="text/html; charset=GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%
       String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
%>
<SCRIPT LANGUAGE="JavaScript" type="text/javascript" src="<%=basePath%>/strutsui/js/editsrcmaindata.js"></SCRIPT>
<div id="form_table_title">
	<ul>
		<li class="top">
			<div>
				ָ����Դ��Ϣ
			</div>
		</li>
	</ul>
</div>
<!-- ���DIV�϶�����������ʽ -->
<div id="containerline6">
	<!-- ʹ�ñ�ǩ������onclick ʹ�õķ��������֮ǰ����� -->
	<ui:datatable id="tmain" tabletype="MainList" data="sourcesjson"
		showradio="true" columndefine="true" />
</div>
<!--һ�з�������ѯ����-->
<form name="detailform" id="detailform"
	action="save.do?submittype=form&mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>"
	method="post">
	<input type="hidden" name="maindata" id="maindata" />
	<input type="hidden" name="billid" id="billid" value="<c:out value='${mainVouDTO.billid}'/>" />
	<input type="hidden"name="billcode" id="billcode" value="<c:out value='${mainVouDTO.billcode}'/>" />
	<div id="form_table_title_edit">
		<ul>
			<li class="top">
				<div>
					ָ�������༭��
				</div>
			</li>
		</ul>
	</div>
	<div id="form_table" style="display:block;">
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
		<ui:datatable id="tdetail" tabletype="DetailList" onclick="detailclick"
			showradio="true" data="detailsjson" columndefine="true" />
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
	<ui:editform formid="detailform" pagetype="add" parsetype="link" tableName="tdetail" />
	</div>
	<div id="confirm_exit_btn">
		<input name="button1" type="button" value="������ϸ��" class="button_style"
			onclick="addDetail()" />
		<input name="button2" type="button" value="ɾ����ϸ��" class="button_style"
			onclick="delDetail();" />
		<input name="savebutton" type="button" value="����" class="button_style"
			onclick="return saveQuit()" />
		<input name="mod3" type="button" value="����" class="button_style"
			onclick="backCheckSave()" />
	</div>
</form>
<!--�к�����д���Ա���������λ��-->
<SCRIPT LANGUAGE="JavaScript" type="text/javascript" src="<%=basePath%>/strutsui/js/editsrcmaindata.js"></SCRIPT>
<script>
//beginҳ��״̬��ʼ��
    
    //Ĭ��ҳ����ؼ�ѡ����Դ����
    tmain.selectedallrows(true);
	var selectrows = tmain.getSelectedRow();
	var selectrow = selectrows[0];
	
	mainVouch = selectrow;
	
	//���޸���˵����ϸ�б��б�Ȼ�����ݣ����Ĭ��ѡ�е�һ����ϸ��������ȫ�ֱ���detailObj��Ϊ��ʼֵ
	tdetail.data[0].checked=true;
	tdetail.show();
	detailObj=tdetail.data[0];

	datasynchfromtable(detailObj);
	detailamtDefault=detailObj.amt;
	
	//ͬ��mainVouDTO�����༭��
	var mainJson = <%= request.getAttribute("mainJson")%>;
   	maindatasynchfromtable(mainJson[0]);
	//������ǧ��λ
	if($('detailform').amt){
   		$('detailform').amt.value = formatNumber($('detailform').amt.value,"#,###.00");
    }
//endҳ��״̬��ʼ�� 
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

