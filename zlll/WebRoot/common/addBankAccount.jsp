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
		<TITLE>项目维护&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TITLE>
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
if(checkNull()){
	    setSavingData();
      var pars = "["+Object.toJSON(detailObj)+"]"
     
      var url ='/common/addBankAccount.do';
      var reulst = "elementcode=BANKACCOUNT&"+"savdata="+pars;
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
	
	detailObj.name =  convertStr(dtlform.name.value);
	detailObj.code = dtlform.code.value;
  	detailObj.startdate = dtlform.startdate.value;
  	detailObj.bdgagency = dtlform.bdgagency.valueid;
  	detailObj.currency = dtlform.currency.valueid;
  	detailObj.agentbank = dtlform.agentbank.valueid;
  	detailObj.type = dtlform.type.valueid;
  	detailObj.isleaf = dtlform.isleaf.value;
  	detailObj.status = dtlform.status.value;
  	detailObj.levelno = dtlform.levelno.value;
	}
//验证
function checkNull(){
	var dtlform = $("detailform");
		if(dtlform.code.value.trim() == ""){
			alert("请录入账号!");
			dtlform.code.focus();
			closeDiv();
			return false; 
		}
		var patrn=/^[0-9]{10,30}$/;
		if (!patrn.exec(dtlform.code.value)){
			alert("账号信息有误，请核实！");
			dtlform.code.focus();
			closeDiv();
			return false; 
		}
		if(dtlform.name.value.trim() == ""){
			alert("请录入银行账户名称!");
			dtlform.name.focus();
			closeDiv();
			return false; 
		}
		
		if(dtlform.bdgagency.value.trim() == ""){
			alert("请录入预算单位!");
			dtlform.bdgagency.focus();
			closeDiv();
			return false; 
		}
		if(dtlform.startdate.value.trim() == ""){
			alert("请录入启用日期!");
			dtlform.startdate.focus();
			closeDiv();
			return false; 
		}
		//判断必录项后，判断时候有重复值。
		check();
		 if(checkfalg != "0")
			 return false;
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
							单位信息明细
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
									账号
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
									银行账户名称
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
						<tr>			
							<th nowrap=nowrap style='width:13%'>
								<div align=left>
									预算单位
									<span>*</span>
								</div>
							</th>
							<td nowrap=nowrap style='width:20%' align="left">
								<input id="bdgagency" name="bdgagency" type=text class=text_pop readonly
									title="" onclick='bdgagency_selecttree(this);' />
								<button id="type_btn" onclick='bdgagency_selecttree()'>
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
						<tr>	
							<th nowrap=nowrap style='width:13%'>
								<div align=left>
									启用日期
									<span>*</span>
								</div>
							</th>
							<td nowrap=nowrap style = 'width:20%' align="left"><input name=startdate type="text" maxlength="250" title="" id=startdate size=10  /><img src="/images/calendar/date.gif" alt="选择日期" id = "startdate_img" onclick="showCalendar('startdate', '%Y-%m-%d', null, true);" style="cursor:hand; border:0;" onmouseover="this.style.background='red';"  onmouseout="this.style.background=''"  /></td>
						</tr>
						<tr>
						<td>
						<input id="isleaf" name="isleaf" type="hidden" value="1" />
						<input id="status" name="status" type="hidden" value="2" />
						<input id="levelno" name="levelno" type="hidden" value="1" />
						</td>
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
		var pars = "elementcode=BANKACCOUNT&"+"code="+$("detailform").code.value;
   		var url ="/common/queryBankAccountByCodeName.do";
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
    
    
	//不刷新页面操作后更新单据状态
	function afterOperation(resp){
  		var flag = resp.responseText;
  		checkfalg=flag;
  		if(flag == "1"){
     		alert("账户已存在！");
     		$("detailform").code.value = "";
     		$("detailform").code.focus();
     		checkfalg = "1";
     		closeDiv();
  		}
	}
	
	
 	document.title = '单位账户维护';
 	
	</script>
</HTML>
