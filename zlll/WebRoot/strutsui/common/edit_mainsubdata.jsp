<%@page language="java" contentType="text/html; charset=GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%
       String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
       String actiontype = request.getParameter("actiontype");
%>
<SCRIPT LANGUAGE="JavaScript" type="text/javascript" src="<%=basePath%>/strutsui/js/editsrcmaindata.js"></SCRIPT>
<SCRIPT LANGUAGE="JavaScript">
<!--
var uieditmodel = "mainsubdata";//��ע�༭������"����Դ���ӵ��ı༭"
var actiontype = "<%=actiontype%>";
var ifmis_uipage_head = "<c:out value="${ifmis_uipage_head}"/>";
controlcurbal = false; //�����ƽ��
//-->
</SCRIPT>
<script>

// ��ѡ�е�������д���༭����
function mainclick(detailrow){
	//У�����ӵ��ı����ֶ�
	if(!addMainEditFormInput()) return;
	if(!addEditFormInput()) return;
	
	if(tdetail ==null ||tdetail.data == null || tdetail.data.length <1 ){
		return;
	}
	var selectrows = tdetail.getSelectedRow();	
	var selectrow=selectrows[0];
	if(tdetail != null && tdetail.data != null && tdetail.data.length >0 && detailObj != selectrow){
		if(addEditFormInput()){
		    detailObj=selectrow;
			var formObject = $("detailform");
            datasynchfromtable(detailObj);
			detailObj=selectrow;
		}
		else
		{
			selectrow.checked=false;
			detailObj.checked=true;
			tdetail.draw();
		}
	}
}

// ����������ϸ��Ϣ���浽��̨
function saveContinue(backindex,datatype){
	if(backindex==undefined)
		backindex = false;
	//У�����ӵ��ı����ֶ�
	if(!addMainEditFormInput()) return;
	if(!addEditFormInput()) return;
	maindatasynchtoObj(mainVouch);
	setMainVouchPK(mainVouch);
    mainVouch.details=tdetail.data;
    if(mainVouch.details!=null&&mainVouch.details.length!=0){
        if(addEditFormInput()){
           maindatasynch();
          // alert("savedatatype:"+datatype);
           if(datatype==undefined||datatype=='tamin'){
          	   $("detailform").maindata.value = Object.toJSON(mainVouch);
           }else{
           
          	   $("detailform").maindata.value = Object.toJSON(tdetail.data);
           }
           //�������й��ܰ�ť������
		   disabledFunctionButton();
		   var url = 'save.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>';
		   var pars = "maindata="+$("detailform").maindata.value+"&billid="+$("detailform").billid.value;
           save(url,pars,backindex);
        }
    	return false;
    }else{
        alert("���������һ����ϸ��Ϣ��");
        return false;
    }
}

function saveQuit(){
	saveContinue(true,'tamin');
}
//datatype: tmain, tdetail
function saveQuit(datatype){
	saveContinue(true,datatype);
}
function setMainVouchPK(mainVouch){
	if($("billid"))mainVouch.billid= $("billid").value;
}
//�޸Ŀ������
function checkAMT(obj){
	if( obj.value.trim().length == 0 || obj.value == null){
		alert("����Ϊ�գ�");
		//obj.focus();
		return false;
	}
	if(!moneyFormatToNumber(obj.value).isNumber()){
		alert("�����������֣�");
		//obj.focus();
		return false;
	}
	if(detailObj==null) return;
}

function setValueToMainVouch(orerowobj){
	if(orerowobj!=null)mainVouch = orerowobj;
}

</script>
<form name="detailform" id="detailform"
	action="save.do?submittype=form&mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>" method="post">
	<input type="hidden" name="maindata" id="maindata" />
	<input type="hidden" name="billid" id="billid" value="<c:out value='${mainVouDTO.billid}'/>" />
	
	<c:choose>
	    <c:when test="${ifmis_uipage_head eq 'nomainedit'}">
		</c:when>
	    <c:otherwise>
	    	<div id="form_table_title_edit">
				<ul><li class="top"><div>	�����༭��	</div></li></ul>
			</div>
			
			<div id="form_table" style="display:block;">
				<ui:maineditform formid="detailform"  pagetype = "add" parsetype="link" tableName="tmain" />
			</div>
			
	    </c:otherwise>   
	</c:choose>
	
	<div id="form_table_title">
		<ul>
			<li class="top">
				<div>	��ϸ��Ϣ </div>
			</li>
		</ul>
	</div>
	<!--�뱣����div��a��ǩ -->
	<div id="containerline10">
		<ui:datatable id="tdetail" tabletype="DetailList" onclick="mainclick"	columndefine="true" showradio="true" data="detailsjson" />
	</div>
	
	<!--��Ҫ��ϸ�༭��ֱ���ڱ���б༭
		<div id="form_table_title_edit">
			<ul><li class="top"><div>��ϸ�༭��</div></li></ul>
		</div>
		<div id="form_table" style="display:block;">
			<ui:editform formid="detailform" pagetype="add" parsetype="link"tableName="tdetail" />
		</div>
	 -->
	 
	<div id="confirm_exit_btn">
			<c:choose>
				<c:when test="${ifmis_uipage_head ne 'nomainedit'&& actiontype eq 'add'}">
				    <input name="button1" type="button" value="������ϸ��" class="button_style" onclick="addDetail()" />
				      	<input name="button1" type="button" value="������ϸ" class="button_style" onclick="copyDetail()" />
				    <input name="button2" type="button" value="ɾ����ϸ��" class="button_style" onclick="delDetail();" />
					<input name="goonbtn" type="button" value="���沢����" class="button_style" id="saveAndOn" onclick="saveContinue(false,'tmain')"/>
					<input name="submitbtn" type="button" value="���沢�˳�" class="button_style" id="saveAndOut" onclick="saveQuit()"/>
				</c:when>
				 <c:when test="${ifmis_uipage_head eq 'nomainedit'&& actiontype eq 'add'}">
				 	  <input name="button1" type="button" value="������ϸ��" class="button_style" onclick="addDetailNoSrc()" />
				 	       <input name="button1" type="button" value="������ϸ" class="button_style" onclick="copyDetail()" />
				     <input name="button2" type="button" value="ɾ����ϸ��" class="button_style" onclick="delDetail();" />
					<input name="goonbtn" type="button" value="���沢����" class="button_style" id="saveAndOn" onclick="saveContinue(false,'tdetail')"/>
					<input name="submitbtn" type="button" value="���沢�˳�" class="button_style" id="saveAndOut" onclick="saveQuit('tdetail')"/>
				</c:when>  
			</c:choose>
			
			<c:choose>
			    <c:when test="${ifmis_uipage_head ne 'nomainedit'&& actiontype ne 'add'}">
					<input name="submitbtn" type="button" value="����" class="button_style" id="saveAndOut" onclick="saveQuit()"/>
				</c:when>
				 <c:when test="${ifmis_uipage_head eq 'nomainedit'&& actiontype ne 'add'}">
					<input name="submitbtn" type="button" value="����" class="button_style" id="saveAndOut" onclick="saveQuit('tdetail')"/>
				</c:when>   
			</c:choose>

		<input name="mod3" type="button" value="����" class="button_style"onclick="backCheckSave()" />
	</div>
</form>
<script>
//beginҳ��״̬��ʼ��
	//���޸���˵����ϸ�б��б�Ȼ�����ݣ����Ĭ��ѡ�е�һ����ϸ��������ȫ�ֱ���detailObj��Ϊ��ʼֵ
	if(tdetail.data.length==0)tdetail.data[0] = new Object();
	tdetail.data[0].checked=true;
	tdetail.show();
	detailObj=tdetail.data[0];
	
	datasynchfromtable(detailObj);
	
    //ͬ��mainVouDTO�����༭��
	var mainJson = <%= request.getAttribute("mainJson")%>;
	setValueToMainVouch(mainJson[0]);
	if(actiontype=="add"){
		setDefaultValue();
   		setMainDefaultValue();
   			
	}else{
		if("nomainedit"==ifmis_uipage_head)detailObj.billid = mainJson[0].billid;//�����༭���б��޸ģ��������ĵ��Ÿ��ӵ�.
		maindatasynchfromtable(mainJson[0]);
	}
	
    //������ǧ��λ
	if($('detailform').amt){
   		$('detailform').amt.value = formatNumber($('detailform').amt.value,"#,###.00");
    }
    
function maindatasynch() {
	if (tdetail != null && tdetail.data != null && tdetail.data.length > 0) {
				//ͬ���������������ݷ�������
		var datas = tdetail.data;
		//���༭�����Ԫ������
		for (var i = 0; datas!=null&&i < datas.length; i++) {
			maindatasynchtoObj(datas[i]);
			/*for (var j = 0; j < maininpueleList.length; j++) {

				maindatasynchtoObj(datas[i],maininpueleList);
				eval(" var eleObj = $('detailform')." + maininpueleList[j] + ".value");
				
				var temp = maininpueleList[j].replace("main", "");
				eval("datas[i]." + temp + "= eleObj");
			}
			*/
		}
	}
	tdetail.draw();
}

//endҳ��״̬��ʼ�� 
</script>
