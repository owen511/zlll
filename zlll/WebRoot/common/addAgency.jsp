<%@ page contentType="text/html; charset=GBK"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%
	response.setHeader("Cache-Control","no-cache"); 
  	response.setHeader("Pragma","no-cache"); 
  	response.setDateHeader("Expires",0); 
    
	String styleName ="stylefontS.css";
	if(session.getAttribute("StyleName")!=null){
		styleName = (String)session.getAttribute("StyleName");
	}
	
	response.setDateHeader("Expires", 0);
	String basePath = request.getScheme() + "://"
		+ request.getServerName() + ":" + request.getServerPort()
		+ request.getContextPath();
%>
<HTML>
<link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=basePath%>/style/<%=styleName %>" />
	<HEAD>
		<TITLE>单位维护&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TITLE>
		<STYLE>
    TD {
      font-size: 10pt; 
      font-family: verdana,helvetica; 
      text-decoration: none;
      white-space:nowrap;}
    A {
      text-decoration: none;
      color: black;}
select{
	  width:110px;
	  }
	  textarea {
	   width:100%;
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
			src="<%=request.getContextPath()%>/indi2exe/js/changedata.js"></script>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/js/formatNumber.js"></script>
		<script type="text/javascript" 
			src="/cal/js/jquery-1[1].3.1.js"></script>
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
		<link rel="stylesheet" type="text/css"
			href="<%=request.getContextPath()%>/style/calendar.css" />
		<script type="text/vbscript"
			src="<%=request.getContextPath()%>/js/decode_resource.vbs"></script>

		<SCRIPT src="<%=request.getContextPath()%>/js/ua.js"></SCRIPT>
		<SCRIPT src="<%=request.getContextPath()%>/js/ftiens4.js"></SCRIPT>
		<SCRIPT SRC="<%=request.getContextPath()%>/js/chooseacc_radio.js"></SCRIPT>

		<script type="text/javascript">
var ROOT_PATH = '<%=basePath%>';
var detailObj = new Object();
var checkfalg = "0";
//返回
function back(){
     window.close();
}
function showResponse(tr){
 var json = tr.responseText;
 detailObj.id = json.split(";")[0];
 detailObj.value = json.split(";")[1];
 window.returnValue=detailObj;
 closeDiv();
 window.close();
}
//保存
function savetest(){
show();
setSavingData()
if(checkNull()){
      var pars = "["+Object.toJSON(detailObj)+"]"
     
      var url ='/common/addAgency.do';
      var reulst = "isgather=1&elementcode=BDGAGENCY&"+"savdata="+pars;
      var myAjax = new Ajax.Request(url,
					   	{
						   	 method: 'post',
						   	 parameters: reulst,
						   	 onComplete : showResponse
						} 
	   				);   
	}
}

/*
	2010年3月19日 17:43:16
	处理特殊字符问号
*/
function convertStr(remark) {
/*
特殊字替换为 全角
\>
\<
\;
\& 和号 
\'单引号  
\" 双引号   
\% 百分号
\# #号
*/

var  s= ">,<,;,&,',\",%,#,:,?" ;
var  n= "》,《,；,＆,‘,“,％,＃,：,？" ;

var sArray = s.split(",");
var nArray = n.split(",") ;

for (var i = 0 ;i<sArray.length;i++){
  remark = remark.replace( sArray[i],nArray[i]) ;	
}
  return remark ;
}
function setSavingData(){
	var dtlform = $("detailform");
	detailObj.code =  dtlform.code.value;
	detailObj.shortname =  convertStr(dtlform.shortname.value);
	detailObj.name =  convertStr(dtlform.name.value);
	detailObj.levelno =  2;
	detailObj.isleaf =  1;
  	detailObj.bankaccountcode = dtlform.bankaccountcode.value;
  	detailObj.bankaccountname = dtlform.bankaccountname.value;
  	detailObj.type = dtlform.type.valueid;
  	detailObj.currency = dtlform.currency.valueid;
  	detailObj.agentbank = dtlform.agentbank.valueid;
	}
//验证
function checkNull(){
	var dtlform = $("detailform");
		/*if(dtlform.code.value.trim() == ""){
			alert("请录入编码!");
			dtlform.code.focus();
			closeDiv();
			return false; 
		}*/
		if(dtlform.name.value.trim() == ""){
			alert("请录入单位名称!");
			dtlform.name.focus();
			closeDiv();
			return false; 
		}
		if(dtlform.bankaccountcode.value.trim() == ""){
			alert("请录入账号!");
			dtlform.bankaccountcode.focus();
			closeDiv();
			return false; 
		}
		var patrn=/^[0-9]{10,30}$/;
		if (!patrn.exec(dtlform.bankaccountcode.value)){
			alert("账号信息有误，请核实！");
			dtlform.bankaccountcode.focus();
			closeDiv();
			return false; 
		}
		if(dtlform.bankaccountname.value.trim() == ""){
			alert("请录入银行账户名称!");
			dtlform.bankaccountname.focus();
			closeDiv();
			return false; 
		}
		if(!dtlform.agentbank.valueid){
			alert("请选择开户银行!");
			closeDiv();
			return false; 
		}
		/*if(dtlform.shortname.value.trim() == ""){
			alert("请录入简称!");
			dtlform.shortname.focus();
			closeDiv();
			return false; 
		}
		if(dtlform.mofdepmanager.value.trim() == ""){
			alert("请录入主管处室!");
			dtlform.mofdepmanager.focus();
			closeDiv();
			return false; 
		}
		if(dtlform.startdate.value.trim() == ""){
			alert("请录入启用日期!");
			dtlform.startdate.focus();
			closeDiv();
			return false; 
		}*/
		//判断必录项后，判断时候有重复值。
		check();
		 if(checkfalg != "0")
			 return false;
	return true;
}

function  callBeforeOpenSingleElementTree_bdgagency(window){
	
	window.elementfilter = " levelno = 1 and isleaf = 0 ";
	
    return true;
}

</script>
	</HEAD>
	<BODY onload="" class="pop_body">
		<div id="popPage1">
			<div id="shenhe_title">
				<div id="shenhe_title_middle"></div>
			</div>
			<div id="form_table_title_edit" style="margin-right:20px;">
				<ul>
					<li class="top">
						<div>
							单位及账户信息维护
						</div>
					</li>
				</ul>
			</div>

			<FORM name="detailform" id="detailform" method="post"
				action="/common/addProgram.do">
				<input type="hidden" id="program" name="program" />
				<div id="edit_table" style="width:99%;">
					<table width="100%" border="0" cellspacing="0" cellpadding="0">
						
						<tr>
							<th nowrap=nowrap style='width:13%'>
								<div align=left>
									编码
									<span>*</span>
								</div>
							</th>
							<td nowrap=nowrap style='width:20%' align="left">
								<input name=code id=code type="text" maxlength="250"
									class="main_lookup_input" />
						</tr>
						<tr>		
							<th nowrap=nowrap style='width:13%'>
								<div align=left>
									单位名称
									<span>*</span>
								</div>
							</th>
							<td nowrap=nowrap style='width:20%' align="left">
								<input name=name id=name type="text" maxlength="250"
									class="main_lookup_input" />
						</tr>
						<tr id="type_tr">
							<th nowrap=nowrap style='width:13%'>
								<div align=left>
									简称
								</div>
							</th>
							<td nowrap=nowrap style='width:20%' align="left">
								<input name=shortname id=shortname type="text" maxlength="250"
									class="main_lookup_input" />
						</tr>
						<tr>
						<tr>
							<th nowrap=nowrap style='width:13%'>
								<div align=left>
									账号
									<span>*</span>
								</div>
							</th>
							<td nowrap=nowrap style='width:20%' align="left">
								<input name=bankaccountcode id=bankaccountcode type="text" maxlength="250"
									class="main_lookup_input" />
						</tr>
						<tr>		
							<th nowrap=nowrap style='width:13%'>
								<div align=left>
									银行账户名称
									<span>*</span>
								</div>
							</th>
							<td nowrap=nowrap style='width:20%' align="left">
								<input name=bankaccountname id=bankaccountname type="text" maxlength="250"
									class="main_lookup_input" />
						</tr>
						<tr id="type_tr">
							<th nowrap=nowrap style='width:13%'>
								<div align=left>
									类型
									
								</div>
							</th>
							<td nowrap=nowrap style='width:20%' align="left">
								<input id="type" name="type" type=text class=text_pop readonly
									title="" onclick='type_selecttree(this);' />
								<button id="type_btn" onclick='type_selecttree()'>
								</button>
							</td>
						</tr>
						<tr id="bdgagency_tr"  style="display:block">
							<th nowrap=nowrap style='width:13%'>
								<div align=left>
									币种
								</div>
							</th>
							<td nowrap=nowrap style='width:20%' align="left">
								<input id="currency" name="currency" type=text class=text_pop readonly
									title="" onclick='currency_selecttree(this);' />
								<button id="type_btn" onclick='currency_selecttree()'>
								</button>
							</td>
						</tr>
						<tr>	
							<th nowrap=nowrap style='width:13%'>
								<div align=left>
									开户银行
									<span>*</span>
								</div>
							</th>
							<td nowrap=nowrap style='width:20%' align="left">
								<input id="agentbank" name="agentbank" type=text class=text_pop readonly
									title="" onclick='agentbank_selecttree(this);' />
								<button id="type_btn" onclick='agentbank_selecttree()'>
								</button>
							</td>
						</tr>
						</tr>
					</table>
				</div>
				<BR />
				<BR />
				<div id="confirm_exit_btn">
					<center>
						<INPUT type="button" name="buton" class="button_style" value="保存"
							onclick="savetest()" />
						<INPUT type="button" class="button_style" value="取消"
							onclick="back()" />
					</center>
				</div>
			</FORM>

		</div>
	</BODY>
	<script>
	function mofdepmanager_selecttree(){
		selectElememtByOnlyElementcode("BDGMANAGEDIVISION",document.getElementById("mofdepmanager"),"1");
	}
 
	function mofdepmanager1_selecttree(){
		selectElememtByOnlyElementcode("BDGMANAGEDIVISION",document.getElementById("mofdepmanager1"),"1");
	}

	function mofdepmanager2_selecttree(){
		selectElememtByOnlyElementcode("BDGMANAGEDIVISION",document.getElementById("mofdepmanager2"),"1");
	}
	
	function bdgagency_selecttree(){
		selectElememtByOnlyElementcode("bdgagency",document.getElementById("superitemid"),"0");
	}
	function type_selecttree(){
		selectElememtByOnlyElementcode("BANKACCTTYPE",document.getElementById("type"),"1");
	}
 
	function currency_selecttree(){
		selectElememtByOnlyElementcode("CURRENCY",document.getElementById("currency"),"1");
	}

	function agentbank_selecttree(){
		selectElememtByOnlyElementcode("AGENTBANK",document.getElementById("agentbank"),"1");
	}
	
	function bdgagency_selecttree(){
		selectElememtByOnlyElementcode("bdgagency",document.getElementById("bdgagency"),"0");
	}
	
			
			// 校验code
	function check() {
		var pars = "elementcode=BDGAGENCY&"+"code="+detailObj["code"] +"&name="+detailObj["name"]+"&bankaccountcode="+detailObj["bankaccountcode"];
   		var url ="/common/queryAgencyByCodeName.do";
		var myAjax = new Ajax.Request(url,
					   	{
						   	 method: 'post',
						   	 parameters: pars,
						   	 onComplete : afterOperation,
							 onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
							 	alert("操作失败！");
							 },
							 asynchronous: false
						} 
	   				);
    }
    function getNextCode(){
    	var pars = "methodname=getNextCode";
    	var nextcode=JQ.ajax({
					type:"post",
			  		url: "/common/queryAgencyByCodeName.do",
			  		data: pars,
			  		async: false
			 	}).responseText;
		return nextcode;
    }
    
    
	//不刷新页面操作后更新单据状态
	function afterOperation(resp){
  		var flag = resp.responseText;
  		checkfalg="0";
  		if(flag == "1"){
     		alert("代码已存在！");
     		$("detailform").code.value = "";
     		$("detailform").code.focus();
     		checkfalg = "1";
     		closeDiv();
  		}
  		if(flag == "2"){
     		alert("单位名称已存在！");
     		$("detailform").name.value = "";
     		$("detailform").name.focus();
     		checkfalg = "2";
     		closeDiv();
  		}
  		if(flag == "3"){
     		alert("银行账号已存在！");
     		$("detailform").bankaccountcode.value = "";
     		$("detailform").bankaccountcode.focus();
     		checkfalg = "3";
     		closeDiv();
  		}
	}
	
 	document.title = '单位维护';
 	JQ(document).ready(function(){
 		detailObj.code = getNextCode();
 		JQ("#code").val(detailObj.code).attr("disabled","disabled");
 		
 		//alert(document.getElementById("code").value)
 	});
	</script>
</HTML>
