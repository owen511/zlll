<%@page language="java" contentType="text/html; charset=GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%
       String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
       String actiontype = request.getParameter("actiontype");
%>
<SCRIPT LANGUAGE="JavaScript">
<!--
var uieditmodel = "<c:out value='${ifmis_ui_page_editmodel}'/>";//��ע�༭������"����Դ���ӵ��ı༭"
var actiontype = "<%=actiontype%>";
controlcurbal = true; //���ƽ��
//-->
</SCRIPT>
<script>
// ����������Ϣ�ı���
var mainVouch = null;

var detailObj=null;

var detailamtDefault = null;

// ������������¼���row ����ѡ�е��У�Ҳ���Ǵ���ҳ���������Ϣ
function mainclick(row){
	if(actiontype!="add")return;
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
				// ��ɾ������ϸ�еĽ���˻ص�����
				//alert(mainVouch.curbal+"+"+sumAmt(tdetail));
				mainVouch.curbal = accAdd(parseFloat(moneyFormatToNumber(mainVouch.curbal)),sumAmt(tdetail));
				clearFormInput();
				mainVouch.details = null;
				tmain.draw();
				//disEnableMainEditFormInput();
			}
			//tdetail.data = new Array();
			//tdetail.draw();
			mainVouch= selectrow;
			mainVouch.fromapp = mainVouch.billid;
			//enableMainEditFormInput();
			loadDetail();
			return;
		}else{
			selectrow.checked=false;
			mainVouch.checked=true;
			tmain.draw();
			return ;
		}
	}
	enableMainEditFormInput();
	mainVouch = selectrow;
	mainVouch.originalbal = mainVouch.curbal;
	mainVouch.fromapp = mainVouch.billid;
	loadDetail();

}
//�����ӵ�
function loadDetail(){
	if(mainVouch == null){
		alert("��ѡ����Դ���ݣ�");
		return;
	}
	var url = 'edit.do?actiontype=loaddetail&mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>';
	var pars = 'billid='+mainVouch.billid+"&model=back";//�г��˿����Ϣ
    var myAjax = new Ajax.Request(
                    url,
                    {method: 'post', parameters: pars, onComplete: showResponse}
                    );    
}

function showResponse(request){
    eval("var tdetaildata = "+request.responseText);
    tdetail.data = tdetaildata;
	for(var i=0;tdetail.data!=null&&i<tdetail.data.length;i++){
		//������Ʊ�ϼƵ�ֵ���ڵ�ǰ�ӵ���ֵ�����õ�ǰ�ӵ���ֵΪ�������
		var amt = parseFloat(moneyFormatToNumber(tdetail.data[i].amt));
		if(amt>0&&amt<parseFloat(tdetail.data[i].curbal))tdetail.data[i].curbal = amt;
		tdetail.data[i].originalbal = 0;
		tdetail.data[i].amt = 0;
		tdetail.data[i].fromapp = mainVouch.fromapp;
	}
    tdetail.show();
	mainVouch.details = tdetail.data;
	detailObj =  mainVouch.details[0];
	if($("detailform").mainamt)$("detailform").mainamt.value =  0;
	if(mainVouch.details.length==1)detailamtDefault = detailObj.amt;
	if(uieditmodel != "srcmainsubdata"){
		maindatasynchfromtable(detailObj);
	}else{
		//maindatasynchfromtable(mainVouch);
	}

    updateRow2ColumnForDetail('edit_table_tdetail','tdetail');
}


// ��ѡ�е�������д���༭����
function detailclick(row){
	if(tdetail ==null ||tdetail.data == null || tdetail.data.length <1 ){
		return;
	}
	detailObj = row;
	//detailamtDefault = moneyFormatToNumber(detailObj.amt);
	return;
}

// ����������ϸ��Ϣ���浽��̨���������б�ҳ
function saveContinue(backindex){
	if(backindex==undefined)
		backindex = false;
	if(mainVouch == null){
		alert("��ѡ����Դ���ݣ�");
		return false;
	}
	
	if(!addMainEditFormInput()) return;

	 if(tdetail != null && tdetail.data != null && tdetail.data.length >0){
    	if(checkNull()){ 
		   var saveMainVouch = Object.clone(mainVouch);
           maindatasynchtoObj(saveMainVouch);
		   maindatasynch();
		   saveMainVouch.details = tdetail.data;
		   if(saveMainVouch.details.length==1&&uieditmodel != "srcmainsubdata"){
				saveMainVouch = Object.clone(saveMainVouch.details[0]);
		   }

           $("detailform").maindata.value = Object.toJSON(saveMainVouch);
    	   //�������й��ܰ�ť������
			disabledFunctionButton();
		   var url = 'save.do?random='+Math.random()+'&'+urlmenuparameter;
		   var pars = "maindata="+$("detailform").maindata.value;
		   if($("detailform").billid)pars += "&billid="+$("detailform").billid.value;
           save(url,pars,backindex);
        }else{
			 alert("��¼���˿���Ϣ��");
		}
    	return false;
    }else{
        alert("���������һ����ϸ��Ϣ��");
        return false;
    }
}

// ����������ϸ��Ϣ���浽��̨�������ر�ҳ
function saveQuit(){
	saveContinue(true);
}

//����
function backCheckSave(){
	if(tdetail != null && tdetail.data != null && tdetail.data.length >0){
		if(confirm("����δ���棬�Ƿ񱣴����ݣ�")){
		  saveContinue()		    
		} else {
			window.location.href = 'index.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>';
		}
	} else {
		window.location.href = 'index.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>';
	}

}

function checkNull(){
   // У���û�¼����Ϣ
  	if(!addMainEditFormInput()) return false;
	if($("detailform").mainamt&&$("detailform").mainamt.value !=  0){
		return true;
	}else{
		return false;
	}
    return true;
}

var isInputErr = false;
//�޸Ŀ������
function checkAMT(obj){
	isInputErr = true; //��ֹ���ı�����б�ͬʱ�༭ʱ��ʧȥ����ʱ��ͻ��
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
	if(detailObj==null) {
		detailObj = new Object();
	}
	if(detailamtDefault==null){ detailamtDefault=0;}
	var curbal = parseFloat(moneyFormatToNumber(mainVouch.curbal));
	detailamtDefault = parseFloat(moneyFormatToNumber(detailamtDefault));
	var inputamt = parseFloat(moneyFormatToNumber(obj.value));
	if(curbal >= 0){
			if(curbal + detailamtDefault < inputamt){
				alert("�������ѳ���������");
				//obj.value = 0;
				obj.focus();//�����ƽ������õĻ�������ĳЩ�����ʧȥ���ơ�����Ϊ�˳�����ȷ������һЩ�����Ѻ��ԡ�
				return false;
			} else { //����ֵ > ���ý�� �� ����ֵ <= ���ý�� + ԭֵ
				//���ý�� = ���ý�� + ԭֵ - ��ֵ
				mainVouch.curbal = accAdd(accAdd(curbal , detailamtDefault), -inputamt);
				detailObj.amt = inputamt;
				detailObj.originalbal = detailObj.amt;
				detailObj.curbal = accAdd(accAdd(detailObj.curbal , detailamtDefault), -inputamt);
				//��ֵ�ɹ�������Ĭ��ֵΪ��ֵ
				detailamtDefault = inputamt;
				tmain.draw();	
				tdetail.draw();
				isInputErr = false;
				return true;
			}	
		
	} else {
		alert("���ý���!");
		//obj.focus();
		return false;
	}
}


//�޸Ŀ������
function checkMoney(amt,curbal,oldamt){
	if(isInputErr){
		isInputErr = false;
		return false;
	}
	if( amt.trim().length == 0 || amt == null){
		alert("����Ϊ�գ�");
		//obj.focus();
		return false;
	}
	if(!moneyFormatToNumber(amt).isNumber()){
		alert("�����������֣�");
		//obj.focus();
		return false;
	}
	if(accAdd(curbal,oldamt) > 0){
			if(accAdd(curbal,oldamt) < parseFloat(moneyFormatToNumber(amt))){
				alert("�������ѳ���������");
				//obj.value = 0;
				//obj.focus();//�����ƽ������õĻ�������ĳЩ�����ʧȥ���ơ�����Ϊ�˳�����ȷ������һЩ�����Ѻ��ԡ�
				return false;
			} else { //����ֵ > ���ý�� �� ����ֵ <= ���ý�� + ԭֵ
				return true;
			}	
		
	} else {
		alert("���ý���!");
		//obj.focus();
		return false;
	}
}
// ���FORM�еĿ�¼������
function  clearFormInput(){
	clearMainEditFormInput();
	detailamtDefault = null;
}


function showInputRemark(rownum,value,row,tdobj,datatable){
	if(value != null){
		value = value+"";
	} else {
		value ="";
	}
	var colname=this.name;
	// �����ɱ༭����
	var tableid=datatable.id; 
	var col = this;
	var colname =this.name;
	var divobj = document.createElement('<div style="width:98%;height:98%;border: 1px solid #000080"></div>');
	if(colname=="amt"){
		divobj.innerHTML = value.toMoneyFormat();
		divobj.style.textAlign = "right";
	}else{
		divobj.innerHTML = value;
	}
	// ��datatable�������ù�ϵ
	divobj.datarow = row;
	divobj.datatable = datatable;
	// ���ɱ༭ȡ׷�ӵ����
	tdobj.appendChild(divobj);
	if(datatable.disabled==false && datatable.getDisabledConfig(this.id,rownum) == false){	
		// ��굥����Ԫ�������޸����� 
		divobj.onclick = function(){
			var m = this.innerText.trim();
			if(m == null){
				this.innerHTML ="";
				this.defaultremark = "";
			} else {
				this.defaultremark = m;
				if(colname=="amt"){
					if(detailamtDefault == null)detailamtDefault = m;
				}
			}
			
			// ������ʽ����
			if(this.parentElement!=null) this.parentElement.oldbackgroundColor = this.parentElement.runtimeStyle.backgroundColor;
			if(this.parentElement!=null) this.parentElement.runtimeStyle.backgroundColor = 'yellow';
			
			// ���ÿɱ༭����
			this.contentEditable = true;
			this.focus();
			this.setActive();
		}
		
		divobj.onblur = function(){
			var m = this.innerHTML;	
			if(this.parentElement!=null) this.parentElement.runtimeStyle.backgroundColor = "";
			// ���ò��ɱ༭
			this.contentEditable = false;
			if(colname=="amt"){
				//debugger;
				var inputamt = Math.abs(parseFloat(moneyFormatToNumber(m)));
				var curbal =  parseFloat(moneyFormatToNumber(divobj.datarow.curbal));
				var oldamt =  parseFloat(moneyFormatToNumber(divobj.datarow.originalbal));
				if(checkMoney(m,curbal,oldamt)){
					m = inputamt;//m.toMoneyFormat();
					divobj.datarow.curbal =  accAdd(accAdd(curbal,oldamt),-inputamt);
					$("detailform").mainamt.value = accAdd(accAdd(parseFloat(moneyFormatToNumber($("detailform").mainamt.value)),-oldamt),inputamt);
					mainVouch.curbal = accAdd(parseFloat(moneyFormatToNumber(mainVouch.originalbal)),-parseFloat(moneyFormatToNumber($("detailform").mainamt.value)));
					tmain.draw();
					divobj.datarow.originalbal = inputamt;
					detailamtDefault = inputamt;
				}
			}
			eval("divobj.datarow."+colname+" = m");
			this.innerHTML = m;
			this.datatable.draw();

		}
		divobj.onkeydown = function(){
			if(event.keyCode == 13){
				//Ѱ����һ����Ԫ�񣬲���������div��onclick����
				nextDiv(tdobj,divobj,datatable);
				
				// �س���,����ʧ�����¼�
				this.fireEvent("onblur");
				return false;
			}
			else if(event.keyCode == 27 ){
				// Esc��,�ָ�Ĭ��ֵ
				this.innerText = this.defaultremark;
				this.fireEvent("onblur");
				return false;
			}
		}
	}
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
	<input type="hidden" name="billid" id="billid" value="<c:out value='${mainVouDTO.billid}'/>" />
	<div id="form_table" style="display:block;">
		<%--���༭��--%>
		<ui:maineditform formid="detailform" pagetype="add" parsetype="link"
			tableName="tmain" />
	</div>
	<div id="form_table_title">
		<ul><li class="top"><div>��ϸ��Ϣ</div></li></ul>
	</div>
	<!--�뱣����div��a��ǩ -->
	<div id="containerline4">
		<div id='edit_table_tdetail' style='display:none;padding:0;margin:0;'></div>
		<ui:datatable id="tdetail" tabletype="DetailList" showradio="false"  data="detailsjson"  columndefine="true" />
	</div>
	
	<div id="confirm_exit_btn">
	<c:choose>
		<c:when test="${actiontype eq 'add'}">
			<input name="goonbtn" type="button" value="���沢����" class="button_style" id="saveAndOn" onclick="saveContinue()"/>
			<input name="submitbtn" type="button" value="���沢�˳�" class="button_style" id="saveAndOut" onclick="saveQuit()"/>
		</c:when>   
		   <c:otherwise> 
			<input name="submitbtn" type="button" value="����" class="button_style" id="saveAndOut" onclick="saveQuit()"/>
		</c:otherwise>
	</c:choose>
	<input name="back" type="button" value="����" class="button_style" onclick="backCheckSave()" />
	</div>
</form>

<script>
if(actiontype=="add"){
	//ҳ�����ʱ�������������Ϊ������
	disEnableMainEditFormInput();
}else{
    //Ĭ��ҳ����ؼ�ѡ����Դ����
    tmain.selectedallrows(true);
	var selectrows = tmain.getSelectedRow();
	var selectrow = selectrows[0];
	mainVouch = selectrow;
	
	//���޸���˵����ϸ�б��б�Ȼ�����ݣ����Ĭ��ѡ�е�һ����ϸ��������ȫ�ֱ���detailObj��Ϊ��ʼֵ
	tdetail.data[0].checked=true;
	for(var i=0;tdetail.data!=null&&i<tdetail.data.length;i++){
		//������Ʊ�ϼƵ�ֵ���ڵ�ǰ�ӵ���ֵ�����õ�ǰ�ӵ���ֵΪ�������
		tdetail.data[i].originalbal = tdetail.data[i].amt;
	}
	detailObj = tdetail.data[0];
	tdetail.show();
	
	//ͬ��mainVouDTO�����༭��
	var mainJson = <%= request.getAttribute("mainJson")%>;
   	maindatasynchfromtable(mainJson[0]);
	mainVouch.originalbal = accAdd(parseFloat(moneyFormatToNumber(mainVouch.curbal)),sumAmt(tdetail));
	//������ǧ��λ
	if($('detailform').mainamt){
		$("detailform").mainamt.value =  sumAmt(tdetail);
		detailamtDefault = $("detailform").mainamt.value;
   		$('detailform').mainamt.value = formatNumber($('detailform').mainamt.value,"#,###.00");
    }
}

function maindatasynch() {
	
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
				if(temp=="amt") eleObj = eleObj.replace(/,/g,"");
				eval("datas[i]." + temp + "= eleObj");
			}
		}
	}
	ttemp.draw();
}

</script>

