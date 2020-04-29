<%@ page language="java" contentType="text/html; charset=GBK"
	pageEncoding="GBK"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%
	response.setHeader("Cache-Control", "no-cache");
	response.setHeader("Pragma", "no-cache");
	response.setDateHeader("Expires", 0);

	String styleName = "stylefontS.css";
	if (session.getAttribute("StyleName") != null) {
		styleName = (String) session.getAttribute("StyleName");
	}

	response.setDateHeader("Expires", 0);
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
%>
<HTML>
	<link rel="stylesheet" id="ifmisfontstyle" type="text/css"
		href="<%=basePath%>/style/<%=styleName%>" />
	<HEAD>
		<TITLE>��Ŀά��&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TITLE>
		<STYLE>
TD {
	font-size: 10pt;
	font-family: verdana, helvetica;
	text-decoration: none;
	white-space: nowrap;
}

A {
	text-decoration: none;
	color: black;
}

select {
	width: 110px;
}

textarea {
	width: 100%;
}
</STYLE>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
<script type="text/javascript" src="<%=request.getContextPath()%>/js/prototype.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/choose.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/changescroll.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/jquery-1[1].3.1.js"></script>
			
<script type="text/javascript">
var ROOT_PATH = '<%=basePath%>';
var detailObj = new Object();
var detailObjClone ;//���������Զ�������

	// У��code��name 
	var checkflag = false;
	function check() {
		if(checkNull()){
			if(window.dialogArguments.addFlag!="modify"){
				setSavingData();
				var pars = 'program='+"["+Object.toJSON(detailObj)+"]";
		   		var url ="/common/queryProgramByCode.do";		
				var myAjax = new Ajax.Request(url,
							   	{
								   	 method: 'post',
								   	 parameters: pars,
								   	 onComplete : savetest,
									 onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
									 	alert("����Ŀ�Ѵ���!");
									 }
								} 
			   				);
		   	}else{
				setSavingData();
				var pars = 'program='+"["+Object.toJSON(detailObj)+"]";
		   		var url ="/common/queryProgramByName.do";		
				var myAjax = new Ajax.Request(url,
							   	{
								   	 method: 'post',
								   	 parameters: pars,
								   	 onComplete : savemodify,
									 onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
									 }
								} 
			   				);

    		}
    	}	
 }   
	
function savemodify(resp){
	var data = resp.responseText.evalJSON(true);
	var flag = data.flag;
	if(flag=="true"){ //û��������
		var itemid = window.dialogArguments.itemid;
		var dtlform = $("detailform");
	   var code = dtlform.itemcode.value;
	var name =  convertStr(dtlform.name.value);
	var pars = "itemid="+itemid+"&code="+code+"&name="+name;
	if(detailObjClone){
		pars +='&selfprogram='+"["+Object.toJSON(detailObjClone)+"]";
	}
	var url = "/common/updateprogram.do";
	var myAjax = new Ajax.Request(url,
				   	{
					   	 method: 'post',
					   	 parameters: pars,
					   	 onComplete : function(resp){
					   	 	var data = resp.responseText;
					   	 	if(eval(data)){
					   	 		alert("��Ŀ�޸ĳɹ���");
					   	 		window.dialogArguments.load();
					   	 		window.close();
					   	 	}else{
					   	 		alert("��Ŀ�޸�ʧ�ܣ�");
					   	 	closeDiv();
					   	 	}
					   	 }
					} 
   				);
		}else{
			var itemid = data.json.split(';')[0]; //��ʽд���˺�̨��
			if(data.repeatname==1&&detailObj.superitemid!=itemid){
				show();
				if(!confirm(("����Ŀ�����Ѵ���,�Ƿ��������?"))){
					 closeDiv();
					 //�ر�������
					// window.close();				
				}else{
					var itemid = window.dialogArguments.itemid;
					var dtlform = $("detailform");
				   var code = dtlform.itemcode.value;
				var name =  convertStr(dtlform.name.value);
				var pars = "itemid="+itemid+"&code="+code+"&name="+name;
				if(detailObjClone){
					pars +='&selfprogram='+"["+Object.toJSON(detailObjClone)+"]";
				}
				var url = "/common/updateprogram.do";
				var myAjax = new Ajax.Request(url,
							   	{
								   	 method: 'post',
								   	 parameters: pars,
								   	 onComplete : function(resp){
								   	 	var data = resp.responseText;
								   	 	if(eval(data)){
								   	 		alert("��Ŀ�޸ĳɹ���");
								   	 		window.dialogArguments.load();
								   	 		window.close();
								   	 	}else{
								   	 		alert("��Ŀ�޸�ʧ�ܣ�");
								   	 	closeDiv();
								   	 	}
								   	 }
								} 
			   				);
				}
			}else{
				show();
				var itemid = window.dialogArguments.itemid;
				var dtlform = $("detailform");
			   var code = dtlform.itemcode.value;
			var name =  convertStr(dtlform.name.value);
			var pars = "itemid="+itemid+"&code="+code+"&name="+name;
			if(detailObjClone){
				pars +='&selfprogram='+"["+Object.toJSON(detailObjClone)+"]";
			}
			var url = "/common/updateprogram.do";
			var myAjax = new Ajax.Request(url,
						   	{
							   	 method: 'post',
							   	 parameters: pars,
							   	 onComplete : function(resp){
							   	 	var data = resp.responseText;
							   	 	if(eval(data)){
							   	 		alert("��Ŀ�޸ĳɹ���");
							   	 		window.dialogArguments.load();
							   	 		window.close();
							   	 	}else{
							   	 		alert("��Ŀ�޸�ʧ�ܣ�");
							   	 		closeDiv();
							   	 	}
							   	 }
							} 
		   				);
			}
		} 

}
//����
function savetest(resp){
		var data = resp.responseText.evalJSON(true);
		var flag = data.flag;
		var json = data.json;
		if(flag=="true"){
	      show();  
		  //setSavingData();
	      var pars = "["+Object.toJSON(detailObj)+"]"
		if(detailObjClone){
				pars +='&selfprogram='+"["+Object.toJSON(detailObjClone)+"]";
		}
	      var url ='/common/addProgram.do';
	      var reulst = 'program='+pars;
	      var myAjax = new Ajax.Request(url,
						   	{
							   	 method: 'post',
							   	 parameters: reulst,
							   	 onComplete : showResponse
							} 
		   				); 
		}
		else if(flag=="code"){
			show();
			alert("����Ŀ�����Ѵ���!");
			showMsg(resp);
		}
		else{
			if(data.repeatname==1){
				show();
				if(!confirm(("����Ŀ�����Ѵ���,�Ƿ��������?"))){
					showMsg(resp);					
				}else{
				      var pars = "["+Object.toJSON(detailObj)+"]"
				      var url ='/common/addProgram.do';
				      var reulst = 'program='+pars;
				      var myAjax = new Ajax.Request(url,
									   	{
										   	 method: 'post',
										   	 parameters: reulst,
										   	 onComplete : showResponse
										} 
					   				); 
				}
			}else{
				show();
				alert("����Ŀ�����Ѵ���!");
				showMsg(resp);
			}
		}
}
function showMsg(resp){
		var data = resp.responseText.evalJSON(true);
		 var json = data.json;
		 detailObj.id = json.split(";")[0];
		 detailObj.value = json.split(";")[1];
		 if(codeType=='2' && haveCode && addFlag == "child"){
		 	var code = json.split(";")[0];
		 	detailObj.valuecode = window.dialogArguments.path+","+detailObj.id;
		 }else{
		 	detailObj.valuecode	= detailObj.id;
		 }
		 closeDiv();
		 //�ر�������
		 window.close();
		 window.dialogArguments.parent.addBack(detailObj);
}
function showResponse(tr){
		 var json = tr.responseText;
		 detailObj.id = json.split(";")[0];
		 detailObj.value = json.split(";")[1];
		 if(codeType=='2'&& haveCode && addFlag == "child"){
		 	detailObj.valuecode = window.dialogArguments.path+","+detailObj.id;
		 }else{
		 	detailObj.valuecode	= detailObj.id;
		 }
		 closeDiv();
		 //�ر�������
		 window.close();
		 window.dialogArguments.parent.addBack(detailObj);
}

function setSavingData(){
		var dtlform = $("detailform");
		//2010��2��24�� 11:38:21
		//��ΰ ����Ŀ�����еİ���ַ��滻Ϊȫ���ַ�
		if(dtlform.superid){
			detailObj.superitemid = dtlform.superid.value !="" ? dtlform.superid.value : null;
			detailObj.itemcode = dtlform.itemcode.value;
		}
		detailObj.name =  convertStr(dtlform.name.value).replace(/\-/g, "");
		//��ȡ��������
		if($("repeatprogram") && $("repeatprogram").value){
			detailObj.repeatprogram = dtlform.repeatprogram.value;
		}
		for(var i=0;i<elements.length;i++){
			if($(elements[i]).checkbox){ //�Զ������Ա�����checkbox����
				detailObjClone = new Object();
				detailObjClone.itemcode = detailObj.itemcode;
				detailObjClone.vchtypecode = elements[i].toLowerCase();
			}
			if($(elements[i]).value && $(elements[i]).style.display != "none"){
				if($(elements[i]).checkbox&&$(elements[i]).checkbox=="true"){ //��ѡ����
					var ele = $(elements[i]).value.split(";");
					var ele_name="";
					var ele_code="";
				for(var j=0;j<ele.length-1;j++){
					ele_code +=ele[j].split("-")[0]+",";
					ele_name +=ele[j].split("-")[1]+",";
				}
				detailObjClone[elements[i].toLowerCase()+"_code"] = ele_code;
				detailObjClone[elements[i].toLowerCase()+"_name"] = ele_name;
				detailObjClone[elements[i].toLowerCase()] = $(elements[i]).valueid;
				}else{ //��ѡ��
					detailObj[elements[i].toLowerCase()+"_code"] = $(elements[i]).value.split("-")[0];
					detailObj[elements[i].toLowerCase()+"_name"] = $(elements[i]).value.split("-")[1];
					detailObj[elements[i].toLowerCase()] = $(elements[i]).valueid;
				}
			}
		}
}
//��֤
function checkNull(){
		var dtlform = $("detailform");
		//�в���ʱ�Ž��б����¼�ж�
		if(codeType ==2 && haveCode != "" && dtlform.itemcode.value.trim() == ""){
			alert("��¼�����!");
			dtlform.itemcode.focus();
			return false; 
		}
		
		if(codeType ==2 && haveCode != "" && dtlform.itemcode.value.trim() != ""){
			var reg = /^[0-9]+$/;
			if(!reg.test(dtlform.itemcode.value.trim())){
				alert("����ֻ��������!");
				dtlform.itemcode.focus();
				return false;
			}
			//�������޸��ӽڵ�ʱ��֤�Ǹ�����ϵ
			var code = '<c:out value='${code}'/>';
			var codeVal = dtlform.itemcode.value.trim();
			if(window.dialogArguments.addFlag!="modify"){
				if(code !="" && codeVal.substring(0,code.length) != code){
					alert("��ע�⸸������!");
					dtlform.itemcode.focus();
					return false;
				}
			}else{
				//�޸��ӽڵ�ʱУ���Ƿ��븸����ͬ
				if(codeVal.substring(0,window.dialogArguments.parentcode.length) != window.dialogArguments.parentcode){
					alert("��ע�⸸������!");
					dtlform.itemcode.focus();
					return false;
				}
			}
		}
		if(codeType ==2 && haveCode != "" && dtlform.itemcode.value.trim().length<dtlform.itemcode.maxLength){
			alert("�˽ڵ����ӦΪ"+dtlform.itemcode.maxLength+"λ");
			dtlform.itemcode.focus();
			return false; 
		}
		if(dtlform.name.value.trim() == ""){
			alert("��¼������!");
			dtlform.name.focus();
			return false; 
		}
		//������Ŀ��֤
		if(mustselect){
			var mustElement = mustselect.split(",");
			for(var i=0;i<mustElement.length;i++){
				if(JQ("#"+mustElement[i]).attr("value")==""){
					alert("��ѡ�� "+elementObj[mustElement[i]][0]);
					return false;
				}
			}
		}
	return true;
}

//����
function back(){
	try{
     	window.close();
     }catch(e){
     }
}

</script>
	</HEAD>
	<BODY onload="" class="pop_body">
		<div id="popPage1">
			<div id="shenhe_title">
				<div id="shenhe_title_middle"></div>
			</div>
			<div id="form_table_title_edit" style="margin-right: 20px;">
				<ul>
					<li class="top">
						<div>
							<c:choose>
								<c:when test="${codeType ==2 && codeformat != null}">
									��Ŀ��Ϣ(����:<c:out value='${codeformat}'/>)
								</c:when>
								<c:otherwise>
									��Ŀ��Ϣ
								</c:otherwise>
							</c:choose>
						</div>
					</li>
				</ul>
			</div>

			<FORM name="detailform" id="detailform" method="post"
				action="/common/addProgram.do">
				<input type="hidden" id="program" name="program" />
				<input type="hidden" id="repeatprogram" name="repeatprogram" />
				<c:if test="${codeType ==2 && codeformat != null}">
					<input type="hidden" id="superid" name="superid" value="<c:out value='${superid}'/>"/>
				</c:if>
				<div id="edit_table" style="width: 99%;">
					<table width="100%" border="0" cellspacing="0" cellpadding="0">
						<c:if test="${codeType ==2 && codeformat != null}">
							<tr>
								<th nowrap=nowrap style='width: 13%'>
									<div align=left>
										����
										<span>*</span>
									</div>
								</th>
								<td nowrap=nowrap style='width: 20%' align="left">
									<input name=itemcode id=itemcode type="text" maxlength="250"
										class="main_lookup_input"  value='<c:out value='${code}'/>' />
							</tr>
						</c:if>
						<tr>
							<th nowrap=nowrap style='width: 13%'>
								<div align=left>
									����
									<span>*</span>
								</div>
							</th>
							<td nowrap=nowrap style='width: 20%' align="left">
								<input name=name id=name type="text" maxlength="250"
									class="main_lookup_input" onblur="convertStrForObj(this);"/>
						</tr>
					</table>
				</div>
				<BR />
				<BR />
				<div id="confirm_exit_btn">
					<center>
						<INPUT type="button" name="buton" class="button_style" value="����"
							onclick="check()" />
						<INPUT type="button" class="button_style" value="ȡ��"
							onclick="back()" />
					</center>
				</div>
			</FORM>

		</div>
		<BR />
		<div id="context"></div>
	</BODY>
</HTML>
<script>
	//ҳ���е�������
	var elements = [];
	var dtlform = $("detailform");
	//���볤������
	var codeType = '<c:out value="${codeType}"/>';
	var haveCode = '<c:out value="${codeformat}"/>';
	var selectedCode = '<c:out value='${code}'/>';
	//����޲�������Զ�����,�޸�ʱ���Բ�����֤
	if(window.dialogArguments.addFlag!="modify"){
		if(codeType ==2 && haveCode != ""){
			var arrCode = haveCode.split("-");
			if(selectedCode != null && selectedCode !=""){
				var codeLen = 0;
				for(var i=0;i<arrCode.length;i++){
					codeLen += parseInt(arrCode[i]);
					if(selectedCode.length == codeLen && i+1<arrCode.length){
							codeLen += parseInt(arrCode[i+1]);
							break;
					}
				}
				$("itemcode").maxLength=codeLen;
			}else{
				$("itemcode").maxLength=arrCode[0];
			}
		}
	}else{
		//�޸�ʱ���ѡ�нڵ����ӽڵ������޸ģ�������ӽڵ�ʱ���ɸ��û�
		if(codeType ==2 && haveCode != ""){
			if(window.dialogArguments.haschildnode){
				$("itemcode").disabled = true;
				$("itemcode").maxLength=selectedCode.length;
			}else {
				$("itemcode").maxLength=selectedCode.length;
			}
		}else{
			var html = "<tr><th nowrap=nowrap style='width: 13%'><div align=left>����&nbsp;<span>*</span></div></th><td nowrap=nowrap style='width: 20%' align='left'><input name=itemcode id=itemcode type='text' maxlength='250' class='main_lookup_input'/></tr>";
			JQ("table").prepend(html);
			JQ("#itemcode").val(selectedCode);
			JQ("#name").val(window.dialogArguments.name);
			$("itemcode").maxLength=selectedCode.length;
		}
	}
 	
//���ڵ���Ϣ
var elementFatherObj={type:['��Ŀ����','PROFUND','{mustselect:true}'],bdgagency:['Ԥ�㵥λ','BDGAGENCY'],bdgmanagedivision:['����','BDGMANAGEDIVISION']};
//��ʱֻȡ���ڵ�ļ�����Ϣ	
var elementObj={type:['��Ŀ����','PROFUND','{mustselect:true}'],bdgagency:['Ԥ�㵥λ','BDGAGENCY']};
//ҵ��ϵͳ������������
if(window.dialogArguments.repeatprograms){
	JQ("#repeatprogram").val(window.dialogArguments.repeatprograms);
}
//ҵ��ϵͳ������Ҫ��������
if(window.dialogArguments.progamAddElements){
	elementObj = window.dialogArguments.progamAddElements;
}
var programInfo = <%=request.getAttribute("programInfo")%>;
function fatherInfo(){
	if(programInfo.length>0){
		if(elementObj){
			for(var bro in elementObj){ //�����Ӽ����� ��Ŀ���Զ�������
				if(typeof(elementFatherObj[bro])=="undefined"){
					elementFatherObj[bro] = elementObj[bro];
				}
			}
		}
		for(var pro in elementFatherObj){
		if(programInfo[0][pro] != null && programInfo[0][pro] != '0' && typeof programInfo[0][pro] != "undedfined"){
			var addHTML = "<tr><th nowrap=nowrap style='width: 13%'><div align=left>"+elementFatherObj[pro][0];
			addHTML += "</div></th><td nowrap=nowrap style='width: 20%' align='left'><input name="+pro+" id="+pro;
			addHTML += " type='text' maxlength='250' class='text_pop' readOnly/></td></tr>";
			JQ("table").append(addHTML);
			var code = programInfo[0][pro+"_code"];
			var name = programInfo[0][pro+"_name"];
			var value = code+"-"+name;
			JQ("#"+pro).attr("value",value).attr("valueid",programInfo[0][pro]).attr("disabled","disabled");
			elements.push(pro);
			}else if(elementFatherObj[pro][2]){
		 		var checkbox = false;
		 		var isbottom = false;
		 		if(elementFatherObj[pro][2]){
		 		 var obj = eval('('+elementFatherObj[pro][2]+')');
		 		 checkbox = obj.checkbox;
		 		 isbottom = obj.isbottom;
 		 		 if(obj.mustselect){
				 	if(mustElement.length >0){
				 		mustElement[mustElement.length] = pro;
				 	}else{
				 		mustElement[0] = pro;
				 	}
				 	if(mustselect == null || mustselect == ""){
			 			mustselect += pro;
				 	}else{
			 			mustselect = mustselect + ',' + pro;
				 	}
			 	 }
		 		 
		 		}
				var addHTML = "<tr><th nowrap=nowrap style='width: 13%'><div align=left>"+elementFatherObj[pro][0];
				for(var i=0; i<mustElement.length ; i++){
					if(mustElement[i] == pro){
						addHTML += "<span>*</span>";
					}
				}
				addHTML += "</div></th><td nowrap=nowrap style='width: 20%' align='left'><input name="+pro+" id="+pro;
				//addHTML += " type='text' maxlength='250' class='text_pop' readOnly/></td></tr>";
				addHTML += " type='text' checkbox="+checkbox+" isbottom="+isbottom+" maxlength='250' class='text_pop' onclick='programkind_selecttree(\""+pro+"\",\""+elementFatherObj[pro][1]+"\","+checkbox+","+isbottom+")'/><button id='"+pro+"_btn' onclick='programkind_selecttree(\""+pro+"\",\""+elementFatherObj[pro][1]+"\","+checkbox+","+isbottom+")'></button></td></tr>";
				JQ("table").append(addHTML);
				elements.push(pro);
			}
		}
	}
}
var programAttribute = <%=request.getAttribute("programAttr")%>;

//�Զ��������޸�
function programAttr(){
	if(programInfo.length>0){
		if(elementObj){
			for(var bro in elementObj){ //�����Ӽ����� ��Ŀ���Զ�������
				if(typeof(elementFatherObj[bro])=="undefined"){
					elementFatherObj[bro] = elementObj[bro];
				}
			}
		}
		for(var pro in elementFatherObj){
 			if(elementFatherObj[pro][2]){				
		 		var checkbox = false;
		 		var isbottom = false;
		 		if(elementFatherObj[pro][2]){
		 		 var obj = eval('('+elementFatherObj[pro][2]+')');
		 		 checkbox = obj.checkbox;
		 		 isbottom = obj.isbottom;
 		 		 if(obj.mustselect){
				 	if(mustElement.length >0){
				 		mustElement[mustElement.length] = pro;
				 	}else{
				 		mustElement[0] = pro;
				 	}
				 	if(mustselect == null || mustselect == ""){
			 			mustselect += pro;
				 	}else{
			 			mustselect = mustselect + ',' + pro;
				 	}
			 	 }
				 		 
		 		}
				var addHTML = "<tr><th nowrap=nowrap style='width: 13%'><div align=left>"+elementFatherObj[pro][0];
				for(var i=0; i<mustElement.length ; i++){
					if(mustElement[i] == pro){
						addHTML += "<span>*</span>";
					}
				}
				addHTML += "</div></th><td nowrap=nowrap style='width: 20%' align='left'><input name="+pro+" id="+pro;
				//addHTML += " type='text' maxlength='250' class='text_pop' readOnly/></td></tr>";
				addHTML += " type='text' checkbox="+checkbox+" isbottom="+isbottom+" maxlength='250' class='text_pop' onclick='programkind_selecttree(\""+pro+"\",\""+elementFatherObj[pro][1]+"\","+checkbox+","+isbottom+")'/><button id='"+pro+"_btn' onclick='programkind_selecttree(\""+pro+"\",\""+elementFatherObj[pro][1]+"\","+checkbox+","+isbottom+")'></button></td></tr>";
				JQ("table").append(addHTML);
				
				if(programAttribute){
					var valueid = programAttribute[pro+"_valueid"];
					
					var value = programAttribute[pro];
					if(valueid&&valueid){
						JQ("#"+pro).attr("value",value).attr("valueid",valueid);						
					}
				}
				elements.push(pro);
			}
		}
	}
}
//�ܿ�����
var programdefaultvalue = window.dialogArguments.programdefaultvalue;
var mustselect = window.dialogArguments.mustselect;
var mustElement = []; 
function bdgType(){
	JQ("table").append("<tr><th nowrap=nowrap style='width: 13%'><div align=left>������Ŀ</div></th><td nowrap=nowrap style='width: 20%' align='left'><input type='checkbox' onclick='removeBdg(this);'/></tr>");
	if(mustselect !="" && typeof mustselect != "undefined"){
 		mustElement = mustselect.split(",");
 	}
 	for(var pro in elementObj){
 		var checkbox = false;
 		var isbottom = false;
 		if(elementObj[pro][2]){
 		 var obj = eval('('+elementObj[pro][2]+')');
 		 checkbox = obj.checkbox;
 		 isbottom = obj.isbottom;
		 if(obj.mustselect){
		 	if(mustElement.length >0){
		 		mustElement[mustElement.length] = pro;
		 	}else{
		 		mustElement[0] = pro;
		 	}
		 	if(mustselect == null || mustselect == ""){
	 			mustselect += pro;
		 	}else{
	 			mustselect = mustselect + ',' + pro;
		 	}
	 	 }
 		}	
			var addHTML = "<tr><th nowrap=nowrap style='width: 13%'><div align=left>"+elementObj[pro][0];
			if(typeof mustElement != "undefined" && JQ.inArray(pro,mustElement)>-1){
				addHTML += "<span>*</span>";
			}
			addHTML += "</div></th><td nowrap=nowrap style='width: 20%' align='left'><input name="+pro+" id="+pro;
			addHTML += " type='text' checkbox="+checkbox+" isbottom="+isbottom+" maxlength='250' class='text_pop' onclick='programkind_selecttree(\""+pro+"\",\""+elementObj[pro][1]+"\","+checkbox+","+isbottom+")'/><button id='"+pro+"_btn' onclick='programkind_selecttree(\""+pro+"\",\""+elementObj[pro][1]+"\","+checkbox+","+isbottom+")'></button></td></tr>";
			JQ("table").append(addHTML);
			elements.push(pro);
		}
 	if(programdefaultvalue != "" && typeof programdefaultvalue != "undefined"){
		for(var i =0;i<programdefaultvalue.length;i++){
			if(JQ("#"+programdefaultvalue[i].proname.toLowerCase()).length>0 && programdefaultvalue[i].value){
				JQ("#"+programdefaultvalue[i].proname.toLowerCase()).attr("value",programdefaultvalue[i].value).attr("valueid",programdefaultvalue[i].valueid).attr("disabled","disabled");
				JQ("#"+programdefaultvalue[i].proname.toLowerCase()+"_btn").attr("disabled","disabled");
			}
		}
	}
}
//��Ŀ���� ���Ӹ��ڵ㰴�ܿ���ʾ �Ӽ�����������ز�Ϊ����ʾ
var addFlag = window.dialogArguments.addFlag;
if(codeType ==2 && haveCode != ""){
	if(addFlag == "father"){
 		bdgType();	
 	}else if(addFlag == "child"){
 		fatherInfo();
 	}else{
 		//ֻ�޸ı��������
 		JQ("#name").val(window.dialogArguments.name);
 		programAttr(); //�����޸���Ŀ���Զ������ԣ������Ա�����û������Ŀ���ﶨ����ֶΣ������Զ��������� jzy
 	}	
}else{
	bdgType();
}
//������Ŀ(��λ���ߴ���Ϊ�ռ�Ϊ������Ŀ)
function removeBdg(chk){
	var input = document.getElementById("BDGAGENCY") || document.getElementById("BDGMANAGEDIVISION");
	if(input){
		var tr = input.parentNode.parentNode;
		if(chk.checked){
			tr.style.display = "none";
			input.style.display = "none";
		}else{
			tr.style.display = "";
			input.style.display = "";
		}
	}
}
//���������÷���
var vchCode = window.dialogArguments.vchCode;
function programkind_selecttree(element,sourceelement,ischeckbox,isbottom){
	if(vchCode){
		if(element == 'type')
			selectElememtByUrlWithAllField(0,0,'8003',element,document.getElementById(element));
		else
			selectElememtByUrlWithAllField(0,0,vchCode,element,document.getElementById(element));
	}else{
		if(ischeckbox){ //��ѡ
			selectMutElememtByOnlyElementcode(sourceelement,document.getElementById(element),"1",null,null,isbottom);
		}else{
			selectElememtByOnlyElementcode(sourceelement,document.getElementById(element),"1");			
		}
	}
}
function setFont(fontsize){
  	if(fontsize=="l"){
  	  document.getElementById('ifmisfontstyle').href = '<%=basePath%>/style/stylefontL.css';
      setFontSession("stylefontL.css");	
    }else if(fontsize=="m"){
      document.getElementById('ifmisfontstyle').href = '<%=basePath%>/style/stylefontM.css';
      setFontSession("stylefontM.css");	
    }else{
      document.getElementById('ifmisfontstyle').href = '<%=basePath%>/style/stylefontS.css';
      setFontSession("stylefontS.css"); 
    }
    setFontCookie(fontsize);
}
</script>
