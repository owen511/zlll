<%@ page contentType="text/html; charset=GBK"%>
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

		<script type="text/javascript"
			src="<%=request.getContextPath()%>/js/ajaxfunc.js"></script>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/js/datatable.js"></script>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/js/prototype.js"></script>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/js/choose.js"></script>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/js/changescroll.js"></script>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/js/calendar.js"></script>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/js/tbajax.js"></script>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/js/export.js"></script>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/js/formatNumber.js"></script>
		<link rel="stylesheet" type="text/css"
			href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
		<link rel="stylesheet" type="text/css"
			href="<%=request.getContextPath()%>/style/calendar.css" />
		<script type="text/vbscript"
			src="<%=request.getContextPath()%>/js/decode_resource.vbs"></script>
		<SCRIPT src="<%=request.getContextPath()%>/js/ua.js"></SCRIPT>
		<SCRIPT src="<%=request.getContextPath()%>/js/ftiens4.js"></SCRIPT>
		<SCRIPT SRC="<%=request.getContextPath()%>/js/chooseacc_radio.js"></SCRIPT>
		<script type="text/javascript"
			src="<%=basePath%>/js/jquery-1[1].3.1.js"></script>
		<script type="text/javascript">
var ROOT_PATH = '<%=basePath%>';
var detailObj = new Object();
// У��code��name 
	var checkflag = false;
	function check() {
		if(checkNull()){
		if($("itemcode").value){
			var pars ="code="+$("itemcode").value+"&name="+$("name").value+"&bdgagency="+$("bdgagency").valueid;
		}else{
			var pars ="name="+$("name").value+"&bdgagency="+$("bdgagency").valueid;
		}
   		var url ="/common/queryProgramByCode.do";		
		var myAjax = new Ajax.Request(url,
					   	{
						   	 method: 'post',
						   	 parameters: pars,
						   	 onComplete : savetest,
							 onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
							 	alert("�������Ѵ��ڣ�");
							 }
						} 
	   				);
    }
 }   
	
//����
function savetest(resp){
		var flag = resp.responseText;
		if(flag!="false"){
	      show();  
		  setSavingData();
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
		}else{
			alert("�����Ѵ���!");
		}
}

function showResponse(tr){
		 var json = tr.responseText;
		 parent.selectObj.id = json.split(";")[0];
		 parent.selectObj.value = json.split(";")[1];
		 closeDiv();
		 //�ر�������
		 parent.closeWindow(true);
}

/*
	2010��3��19�� 17:43:16
	���������ַ��ʺ�
*/
function convertStr(remark) {
		/*
		�������滻Ϊ ȫ��
		\>
		\<
		\;
		\& �ͺ� 
		\'������  
		\" ˫����   
		\% �ٷֺ�
		\# #��
		*/
		
		var  s= ">,<,;,&,',\",%,#,:,?" ;
		var  n= "��,��,��,��,��,��,��,��,��,��" ;
		
		var sArray = s.split(",");
		var nArray = n.split(",") ;
		
		for (var i = 0 ;i<sArray.length;i++){
		  remark = remark.replace( sArray[i],nArray[i]) ;	
		}
		  return remark ;
}
function setSavingData(){
		var dtlform = $("detailform");
		//2010��2��24�� 11:38:21
		//��ΰ ����Ŀ�����еİ���ַ��滻Ϊȫ���ַ�
		detailObj.name =  convertStr(dtlform.name.value);
		var types = dtlform.type.value;
		detailObj.itemcode = dtlform.itemcode.value;
		detailObj.type_code = types.split("-")[0];
	  	detailObj.type_name = types.split("-")[1];
		detailObj.type =  dtlform.type.valueid;
		var bdgagencys = dtlform.bdgagency.value;
	  	detailObj.bdgagency_code = bdgagencys.split("-")[0];
	  	detailObj.bdgagency_name = bdgagencys.split("-")[1];
	  	detailObj.bdgagency = dtlform.bdgagency.valueid;
}
//��֤
function checkNull(){
		var dtlform = $("detailform");
		if(dtlform.name.value.trim() == ""){
			alert("��¼������!");
			dtlform.name.focus();
			return false; 
		}
		if(typeof (mustselect) != "undefined" && mustselect != null && mustselect!=""){
 			var mustElement = mustselect.split(",");
 			if(JQ.inArray("bdgagency",mustElement)>-1 && JQ("#bdgagency").attr("disabled")){
 			 		if(JQ("#bdgagency").attr("value")==""){
 			 				alert("��ѡ��Ԥ�㵥λ");
 			 				return false; 
 			 		}
 			}
 			if(JQ.inArray("type",mustElement)>-1 && JQ("#type").attr("disabled")){
 			 		if(JQ("#type").attr("value")==""){
 			 				alert("��ѡ����Ŀ����");
 			 				return false; 
 			 		}
 			}
 	}
	return true;
}

	 

//����
function back(){
     parent.addBack();
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
							��Ŀ��Ϣ��ϸ
						</div>
					</li>
				</ul>
			</div>
			<FORM name="detailform" id="detailform" method="post"
				action="/common/addProgram.do">
				<input type="hidden" id="program" name="program" />
				<div id="edit_table" style="width: 99%;">
					<table width="100%" border="0" cellspacing="0" cellpadding="0">
						<%--
						<tr>
							<th nowrap=nowrap style='width:13%'>
								<div align=left>
									����
									<span>*</span>
								</div>
							</th>
							<td nowrap=nowrap style='width:20%' align="left">
								<input name=code id=code type="text" maxlength="250"
									class="main_lookup_input" />
						</tr>
						--%>
						<tr>
							<th nowrap=nowrap style='width: 13%'>
								<div align=left>
									����
									<span>*</span>
								</div>
							</th>
							<td nowrap=nowrap style='width: 20%' align="left">
								<input name=itemcode id=itemcode type="text" maxlength="250"
									class="main_lookup_input" />
						</tr>
						<tr>
							<th nowrap=nowrap style='width: 13%'>
								<div align=left>
									����
									<span>*</span>
								</div>
							</th>
							<td nowrap=nowrap style='width: 20%' align="left">
								<input name=name id=name type="text" maxlength="250"
									class="main_lookup_input" />
						</tr>
						<tr id="type_tr">
							<th nowrap=nowrap style='width: 13%'>
								<div align=left>
									��Ŀ����
								</div>
							</th>
							<td nowrap=nowrap style='width: 20%' align="left">
										<input id="type" name="type" type=text class=text_pop readonly
											title="" onclick='programkind_selecttree(this);' value="" />
								<button id="type_btn" onclick='programkind_selecttree()'></button>
							</td>
						</tr>
						<tr id="bdgagency_tr" style="display: block">
							<th nowrap=nowrap style='width: 13%'>
								<div align=left>
									Ԥ�㵥λ
									<c:out value=""></c:out>
								</div>
							</th>
							<td nowrap=nowrap style='width: 20%' align="left">
										<input id="bdgagency" name="bdgagency" type=text
											class=text_pop readonly title=""
											onclick='programkind_selecttree1(this);' value="" />
								<button id="bdgagency_btn" onclick='programkind_selecttree1()'></button>
							</td>
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
	
	var dtlform = $("detailform");
	JQ("table").find("tr:eq(0)").hide();
	function programkind_selecttree(){
		selectElememtByOnlyElementcode("PROFUND",document.getElementById("type"),"1");
	}
 
	
	function programkind_selecttree1(){
		selectElememtByOnlyElementcode("bdgagency",document.getElementById("bdgagency"),"0");
	}
	
 	//�ж�Ԥ�㵥λ������Ŀ�����Ƿ�Ϊ����
 	var mustselect = window.dialogArguments.mustselect;
 	if(typeof (mustselect) != "undefined" && mustselect != null && mustselect!=""){
 			var mustElement = mustselect.split(",");
 			if(JQ.inArray("bdgagency",mustElement)>-1){
 			 		JQ("#bdgagency_tr th div").append("<span>*</span>");
 			}
 			if(JQ.inArray("type",mustElement)>-1){
 			 		JQ("#type_tr th div").append("<span>*</span>");
 			}
 	}
 	
 	//��Ŀά�� ��Ŀ�ĵ�λ����Ŀ����Ĭ��ֵ����
 	
		var programdefaultvalue = window.dialogArguments.programdefaultvalue;
	 	if(typeof (programdefaultvalue) != "undefined" && programdefaultvalue != null && programdefaultvalue!=""){
	 		var defaultvalue =  programdefaultvalue.split(";");
	 		if(defaultvalue.length<5){
			 		if("bdgagency" == defaultvalue[0]){
				 			var dtlform = $("detailform");
				 			dtlform.bdgagency.valueid =defaultvalue[1] ;
				 			dtlform.bdgagency.value =defaultvalue[2] ;
				 			
				 			dtlform.bdgagency.disabled="disabled";
				 			dtlform.bdgagency_btn.disabled="disabled";
				 			document.getElementById("type_tr").style.display="none";
			 		}else{
			 				var dtlform = $("detailform");
			 				dtlform.type.valueid =defaultvalue[1] ;
			 				dtlform.type.value = defaultvalue[2] ;
			 				
			 				dtlform.type.disabled="disabled";
			 				dtlform.type_btn.disabled="disabled";
			 				document.getElementById("bdgagency_tr").style.display="none";
			 			 }
			 	}
	 		else{
	 		      	var dtlform = $("detailform");
		 			$("detailform").bdgagency.valueid =defaultvalue[1] ;
		 			$("detailform").bdgagency.value =defaultvalue[2] ;
		 			$("detailform").type.valueid =defaultvalue[4] ;
		 			$("detailform").type.value =defaultvalue[5] ;
		 			dtlform.bdgagency.disabled="disabled";
	 				dtlform.bdgagency_btn.disabled="disabled";
		 			dtlform.type.disabled="disabled";
	 				dtlform.type_btn.disabled="disabled";
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

