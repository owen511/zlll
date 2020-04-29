<html>
<head>
<style type="text/css">
/*页面少量编辑区样式-新 指标管理下现金申报管理截止日期*/
.sptbl th{background:#D3E2F7 url(../images/fewtable/th_.gif) repeat-x left top; height:24px; line-height:24px; font-size:13px; color:#2A3D74; text-align:center;}
.tborder{border-right:1px #81A5DD solid;border-bottom:1px #81A5DD solid;}
.thborder{border-right:1px #81A5DD solid;border-left:1px #FFF solid;border-bottom:1px #81A5DD solid;}
.tborder_{border-left:1px #FFF solid;border-bottom:1px #81A5DD solid;}
.sptbl td{height:24px; line-height:24px; font-size:13px; color:#2A3D74;}


.sptopleft_{background:url(../images/fewtable/topleft_.gif) no-repeat right top;}
.sptopleft{background:url(../images/fewtable/topleft.gif) no-repeat left top;}
.sptopcenter{background:url(../images/fewtable/topcenter.gif) repeat-x left top; height:33px; color:#000; font-size:13px; text-align:center;}
.sptopright_{background:url(../images/fewtable/topright_.gif) no-repeat right top;}
.sptopright{background:url(../images/fewtable/topright.gif) no-repeat right top;}
.spmiddleleft{background:url(../images/fewtable/middleleft.gif) repeat-y right top;}
.spmiddle{ background:#FFF;}
.spmiddleright{background:url(../images/fewtable/middleright.gif) repeat-y right top;}
.spbottomleft_{background:url(../images/fewtable/bottomleft_.gif) no-repeat right bottom;}
.spbottomleft{background:url(../images/fewtable/bottomleft.gif) no-repeat left bottom;}
.spbottomcenter{background:url(../images/fewtable/bottomcenter.gif) repeat-x left bottom; height:45px; text-align:center;}
.spbottomright_{background:url(../images/fewtable/bottomright_.gif) no-repeat right bottom;}
.spbottomright{background:url(../images/fewtable/bottomright.gif) no-repeat right bottom;}

.new_btn_shorter{background:url(../images/bg/new_btn_shorter.gif) no-repeat center center; text-align:center; border:0; width:30px; height:21px; line-height:21px; padding-top:1px; margin:0 0 0 5px;}
.new_btn_shortr{background:url(../images/bg/new_btn_shortr.gif) no-repeat center center; text-align:center; border:0; width:35px; height:21px; line-height:21px; padding-top:1px; margin:0 0 0 5px;}
.new_btn_short{background:url(../images/bg/new_btn_short.gif) no-repeat center center; text-align:center; border:0; width:61px; height:21px; line-height:21px; padding-top:1px; margin:0 0 0 5px; cursor:pointer;}
.new_btn_middle{background:url(../images/bg/new_btn_middle.gif) no-repeat center center; text-align:center; border:0; width:80px; height:21px; line-height:21px; padding-top:1px; margin:0 0 0 5px; cursor:pointer;}
.new_btn_long{background:url(../images/bg/new_btn_long.gif) no-repeat center center; text-align:center; border:0; width:100px; height:21px; line-height:21px; padding-top:1px; margin:0 0 0 5px; cursor:pointer;}
.new_btn_longer{background:url(../images/bg/new_btn_longer.gif) no-repeat center center; text-align:center; border:0; width:150px; height:21px; line-height:21px; padding-top:1px; margin:0 0 0 5px; cursor:pointer;}

</style>
</head>
<body>
 <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />

<!-- 
<div id = "ki" class="testKay" layout="{h:{fit: 400},w:{fit:true},fold:{fit:'top'},drag:{fit:'bottom'}}"  id="testKey"
	style="display:none;background-color: white;border :2px solid #CCCCCC;top:30px">
<div id ="ishowDIV" class="testKay"
	 layout="{h:{fit:-400},w:{fit:-450}}" 
	 style="border: 5px solid #8ba3da;background-color: #FFEFC3;position: absolute;width :20;height:60;">
</div>
</div>
<input id= "btnShow" type="button" style = "display:block;margin-top:60px" value="你说呢" onclick ="ddp();"/>
<div id = "cao">123</div>
a <input id="fundtype" name="fundtype" type=text class=text_popm2d readonly onclick='selectMutlElememt(21000,21710,"1005","bdgagency",this,"0","","","","");' /> 

<OBJECT CLASSID="clsid:4FC4CDDF-84E5-437C-8527-B23F6D70866C"    ID="CTJEstampOcx"  CODEBASE="http://192.168.3.207:7001/common/EVoucherOcx-13.02.22.00.cab"></OBJECT>
 
 <OBJECT CLASSID="clsid:4FC4CDDF-84E5-437C-8527-B23F6D70866C" style="width:'1560px'; height:'500px'"  ID="CTJEstampOcx"  CODEBASE="../Release/CTJEstampOcx.cab#version=1,0,0,0"></OBJECT>
-->

<%--<input type="button" value="签章" onclick="doSign();"></input>
<input type="button" value="签名" onclick="doSign2();"></input>
<input type="button" value="验证签名" onclick="verifySign2();"></input>
<input type="button" value="打印预览" onclick="doSign3();"></input>
<input type="button" value="显示盖章结果" onclick="doSign4();"></input>
<input type="button" value="查询签章位置" onclick="findStamp();"></input>
<div id ="ctj" width="800px;">
</div>
--%>
<script type="text/javascript">
window.onload = function (){
    var w = window.screen.width;
	var h = window.screen.height; 
    if(w == 800 && h == 600){
		//alert(window.screen.width);
		//alert(window.screen.height);
		var inpt = document.getElementsByTagName("input");
		for(var i =0; i<inpt.length; i++ ){
		if(inpt[i].className == 'input_short'){
		
		}else if(inpt[i].type == "checkbox" ||inpt[i].type == "radio" ){
		
		}else if(inpt[i].className.indexOf("long_input")>0){
		
		}else{
		inpt[i].style.width = 90;
		
		}
    }
}
if(document.getElementById("nav")!= null){
 var sfEls = document.getElementById("nav").getElementsByTagName("li");
 for (var i=0; i<sfEls.length; i++) {
  sfEls[i].onmouseover=function() {
  this.className+=(this.className.length>0? " ": "") + "sfhover";
  }
  sfEls[i].onMouseDown=function() {
  this.className+=(this.className.length>0? " ": "") + "sfhover";
  }
  sfEls[i].onMouseUp=function() {
  this.className+=(this.className.length>0? " ": "") + "sfhover";
  }
  sfEls[i].onmouseout=function() {
  this.className=this.className.replace(new RegExp("( ?|^)sfhover\\b"), 
"");
  }
 }
 }
}
</script>

<table width="0%" border="0" cellspacing="0" cellpadding="0" style="margin:auto; margin-top:60px;">
  <tr>
    <td width="5" class="sptopleft_">&nbsp;</td>
    <td width="8" class="sptopleft">&nbsp;</td>
    <td nowrap="nowrap" class="sptopcenter">电子凭证库测试页面</td>
    <td width="8" class="sptopright_">&nbsp;</td>
    <td width="6" class="sptopright">&nbsp;</td>
  </tr>
  <tr>
    <td width="5" class="spmiddleleft">&nbsp;</td>
    <td colspan="3" class="spmiddle">
	<div style="width:650px; height:400px;">
	<!--内部表格 开始-->
	    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="sptbl">
	    <tr>
			<th width="150" class="tborder">行政区划</th>
			<td align="left"class="tborder"><input type="text" id="admindiv" value="340000" style="width:90%" /></td>
		  </tr>
		 	    <tr>
			<th width="150" class="tborder">业务年度</th>
			<td align="left"class="tborder"><input type="text" id="ayear" value="2012" style="width:90%" /></td>
		  </tr>
		  <tr>
			<th width="150" class="tborder">凭证类型</th>
			<td align="left"class="tborder"><input type="text" id="vouchno" value="4209" style="width:90%" /></td>
		  </tr>
		   <tr>
			<th width="150" class="tborder">凭证编号</th>
			<td align="left"class="tborder"><input type="text" id="vouchno2" value="61057859" style="width:90%" /></td>
		  </tr>
		  <tr>
			<th width="150" class="tborder">签章服务器地址</th>
			<td align="left"class="tborder"><input type="text" id="stamp_url" value="http://124.254.1.236:31000/realware/services/AsspEStampService" style="width:90%" /></td>
		  </tr>
		  <tr>
			<th width="150" class="tborder">凭证服务器地址</th>
			<td align="left"class="tborder"><input type="text"  id="vouch_url" value="http://124.254.1.236:31001/realware/signer/result!getMethod.action"  style="width:90%"/><button class="new_btn_shortr" onclick="verifyURL()">校验</button></td>
		  </tr>
		  <tr>
			<th width="150" class="tborder">凭证报文</th>
			<td align="left"class="tborder"><textarea id="vouchxml" style="height:100px; width:90%; margin:1px 0;"></textarea></td>
		  </tr>
		  <tr>
			<th width="150" class="tborder">签章报文</th>
			<td align="left" class="tborder"><textarea id="stampxml" style="height:60px; width:90%; margin:1px 0;"><?xml version="1.0" encoding="GBK" ?><Root><Stamp No=dw_gz>e0b9abb3508840c495a9ca12e78bd1bd</Stamp></Root></textarea></td>
		  </tr>	
		  <tr>
			<th width="150" class="tborder">返回结果</th>
			<td align="left" class="tborder"><textarea id="result" style="height:200px; width:90%; margin:1px 0;"></textarea></td>
		  </tr>	
		</table>
	<!--内部表格 结束-->
	</div>
 
 
	</td>
    <td width="6" class="spmiddleright">&nbsp;</td>
  </tr>
  <tr >
    <td width="5" class="spbottomleft_">&nbsp;</td>
    <td width="8" class="spbottomleft">&nbsp;</td>
    <td class="spbottomcenter">
    	<button class="new_btn_shortr" onclick="doSign()">签章</button>
    	<button class="new_btn_shortr" onclick="doSign2()">签名</button>
	    <button class="new_btn_short" onclick = "verifySign2()">验证签名</button>
	    <button class="new_btn_short"  onclick="doSign3();">打印预览</button>
	    <button class="new_btn_long" onclick="doSign4()">显示盖章结果</button>
	    <button class="new_btn_long" onclick="findStamp()">查询盖章位置</button>
	    <button class="new_btn_short" onclick="saveStampVoucher();">签章入库</button>
	    <button class="new_btn_shortr" onclick="send()">发送</button>
	    <button class="new_btn_shortr" onclick="cancle()">撤销</button>
	    <button class="new_btn_shortr" onclick="discard()">作废</button>
	</td>
    <td width="8" class="spbottomright_">&nbsp;</td>
    <td width="6" class="spbottomright">&nbsp;</td>
  </tr>
</table>
<div id ="ctj" width="800px;" style="margin-top:100px;margin-left:200px;">
</div>
<!-- InstanceEndEditable -->
     <div id="showhelp" style="display:none;"><!-- InstanceBeginEditable name="添写本页帮助说明" -->显示页面帮助<!-- InstanceEndEditable --></div>
  </div>
</div>
<script type="text/javascript"><%-- 
doHiddenAll_new();
doHiddenAll_new();
doHiddenTop_new();
doHiddenTop_new();
--%></script>
</body>

<script><%--
 //document.getElementById("cao").innerHTML = document.getElementById("ki").getBoundingClientRect().bottom ;
	document.getElementById("ki").style.display = "block";
	
	var dd = document.createElement("div");
	dd.style.backgroundColor = "#FFEFC3";
	dd.layout="{h:{fit:200},w:{fit:-250},fold:{fit:'bottom',drag:'yes'}}"
	  document.getElementById("ki").appendChild(dd);
		//Ext.lt.layout.appendLayout(dd);
		Ext.lt.message.hook("layout","endlayout",function(){
				//document.getElementById("btnShow").value = "LAYOUT"; 
		});
		function ddp(){
		}
	//Ext.lt.layout.on(fnload);
var test = Ext.lt.ifmis.activex.loadJITFinanceOcx();

--%>
var ctj = Ext.lt.ifmis.evoucher.getCTJEstampOcx('width:800px; height:500px','ctj');
 //var ctj = Ext.lt.ifmis.evoucher.getCTJEstampOcx();
 //var ctj = Ext.lt.ifmis.evoucher.getCTJEstampOcx('width:1200px; height:500px','ctj');
 var ecode = Ext.lt.ifmis.evoucher.init();
  //alert(ecode);
// var certid = Ext.lt.ifmis.activex.getCertId();
 var  stampNo2 = '<?xml version="1.0" encoding="GBK" ?><Root><Stamp No=dw_gz>e0b9abb3508840c495a9ca12e78bd1bd</Stamp></Root>';
  var stampNo = 'dw_gz'; //盖章位置信息
  var  voucher = '<?xml version="1.0" encoding="GBK" ?><Root><VoucherCount>1</VoucherCount><VoucherBody VoucherNo="61057859"><Voucher>PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iR0JLIiA/PjxWb3VjaGVyPjxJZD43Mjg2PC9JZD48QWRtRGl2Q29kZT4zNDAwMDA8L0FkbURpdkNvZGU+PFN0WWVhcj4yMDEyPC9TdFllYXI+PFZ0Q29kZT40MjA5PC9WdENvZGU+PFZvdWNoZXJObz42MTA1Nzg1OTwvVm91Y2hlck5vPjxDcmVhdGVEYXRlPjIwMTItMTAtMDk8L0NyZWF0ZURhdGU+PERlcFByb0NvZGU+MDAxMDAzPC9EZXBQcm9Db2RlPjxEZXBQcm9OYW1lPs/uxL8wMDEwMDM8L0RlcFByb05hbWU+PFByb0NhdENvZGU+dW5kZWZpbmVkPC9Qcm9DYXRDb2RlPjxQcm9DYXROYW1lPnVuZGVmaW5lZDwvUHJvQ2F0TmFtZT48Qmd0VHlwZUNvZGU+NDAxMDI8L0JndFR5cGVDb2RlPjxCZ3RUeXBlTmFtZT7W2LXjz+7Ev9Sky+Oypr/uPC9CZ3RUeXBlTmFtZT48RXhwRnVuY0NvZGU+MjAxMDEwMTwvRXhwRnVuY0NvZGU+PEV4cEZ1bmNOYW1lPtDQ1f7Uy9DQPC9FeHBGdW5jTmFtZT48RXhwRWNvQ29kZT4zMDEwMTwvRXhwRWNvQ29kZT48RXhwRWNvTmFtZT67+bG+uaTXyjwvRXhwRWNvTmFtZT48QWdlbmN5Q29kZT4wMDIwMDE8L0FnZW5jeUNvZGU+PEFnZW5jeU5hbWU+1KTL47WlzrswMDIwMDE8L0FnZW5jeU5hbWU+PEZ1bmRUeXBlQ29kZT4xMTwvRnVuZFR5cGVDb2RlPjxGdW5kVHlwZU5hbWU+uau5srLG1f7UpMvjPC9GdW5kVHlwZU5hbWU+PFBheWVlQWNjdE5vPjEyMzQ1Njc4OTAxNjAzMjU8L1BheWVlQWNjdE5vPjxQYXllZUFjY3ROYW1lPtXLu6fIq7PGuaTXys2zt6LVy7unZ2F0aGVyaW5nYmFua2FjY3Q8L1BheWVlQWNjdE5hbWU+PFBheWVlQWNjdEJhbmtOYW1lPsWp0rXS+NDQPC9QYXllZUFjY3RCYW5rTmFtZT48UGF5QWNjdE5vPjEyMzQ1Njc4OTAxNjEzNTE8L1BheUFjY3RObz48UGF5QWNjdE5hbWU+1cu7p8irs8YxNjEzNTE8L1BheUFjY3ROYW1lPjxQYXlBY2N0QmFua05hbWU+ueLQ0LrPt8q4t8TPwrfWp9DQPC9QYXlBY2N0QmFua05hbWU+PFBheUFtdD4wLjAxPC9QYXlBbXQ+PFBheVN1bW1hcnlDb2RlPjwvUGF5U3VtbWFyeUNvZGU+PFBheVN1bW1hcnlOYW1lPnVuZGVmaW5lZDwvUGF5U3VtbWFyeU5hbWU+PFBheUJhbmtDb2RlPnVuZGVmaW5lZDwvUGF5QmFua0NvZGU+PFBheUJhbmtOYW1lPnVuZGVmaW5lZDwvUGF5QmFua05hbWU+PFBheU1nckNvZGU+PC9QYXlNZ3JDb2RlPjxQYXlNZ3JOYW1lPjwvUGF5TWdyTmFtZT48UGF5VHlwZUNvZGU+MTk8L1BheVR5cGVDb2RlPjxQYXlUeXBlTmFtZT7Wsb3T1qe4tijG5Mv7KTwvUGF5VHlwZU5hbWU+PFNldE1vZGVDb2RlPjI8L1NldE1vZGVDb2RlPjxTZXRNb2RlTmFtZT7XqtXLPC9TZXRNb2RlTmFtZT48UmVtYXJrPjwvUmVtYXJrPjwvVm91Y2hlcj4=</Voucher></VoucherBody></Root>';
//var sign =	Ext.lt.ifmis.evoucher.getVoucherStamp('4209',stampNo,voucher);
	//alert(sign);
  var voucher2 = 'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iR0JLIiA/PjxWb3VjaGVyPjxJZD43Mjg2PC9JZD48QWRtRGl2Q29kZT4zNDAwMDA8L0FkbURpdkNvZGU+PFN0WWVhcj4yMDEyPC9TdFllYXI+PFZ0Q29kZT40MjA5PC9WdENvZGU+PFZvdWNoZXJObz42MTA1Nzg1OTwvVm91Y2hlck5vPjxDcmVhdGVEYXRlPjIwMTItMTAtMDk8L0NyZWF0ZURhdGU+PERlcFByb0NvZGU+MDAxMDAzPC9EZXBQcm9Db2RlPjxEZXBQcm9OYW1lPs/uxL8wMDEwMDM8L0RlcFByb05hbWU+PFByb0NhdENvZGU+dW5kZWZpbmVkPC9Qcm9DYXRDb2RlPjxQcm9DYXROYW1lPnVuZGVmaW5lZDwvUHJvQ2F0TmFtZT48Qmd0VHlwZUNvZGU+NDAxMDI8L0JndFR5cGVDb2RlPjxCZ3RUeXBlTmFtZT7W2LXjz+7Ev9Sky+Oypr/uPC9CZ3RUeXBlTmFtZT48RXhwRnVuY0NvZGU+MjAxMDEwMTwvRXhwRnVuY0NvZGU+PEV4cEZ1bmNOYW1lPtDQ1f7Uy9DQPC9FeHBGdW5jTmFtZT48RXhwRWNvQ29kZT4zMDEwMTwvRXhwRWNvQ29kZT48RXhwRWNvTmFtZT67+bG+uaTXyjwvRXhwRWNvTmFtZT48QWdlbmN5Q29kZT4wMDIwMDE8L0FnZW5jeUNvZGU+PEFnZW5jeU5hbWU+1KTL47WlzrswMDIwMDE8L0FnZW5jeU5hbWU+PEZ1bmRUeXBlQ29kZT4xMTwvRnVuZFR5cGVDb2RlPjxGdW5kVHlwZU5hbWU+uau5srLG1f7UpMvjPC9GdW5kVHlwZU5hbWU+PFBheWVlQWNjdE5vPjEyMzQ1Njc4OTAxNjAzMjU8L1BheWVlQWNjdE5vPjxQYXllZUFjY3ROYW1lPtXLu6fIq7PGuaTXys2zt6LVy7unZ2F0aGVyaW5nYmFua2FjY3Q8L1BheWVlQWNjdE5hbWU+PFBheWVlQWNjdEJhbmtOYW1lPsWp0rXS+NDQPC9QYXllZUFjY3RCYW5rTmFtZT48UGF5QWNjdE5vPjEyMzQ1Njc4OTAxNjEzNTE8L1BheUFjY3RObz48UGF5QWNjdE5hbWU+1cu7p8irs8YxNjEzNTE8L1BheUFjY3ROYW1lPjxQYXlBY2N0QmFua05hbWU+ueLQ0LrPt8q4t8TPwrfWp9DQPC9QYXlBY2N0QmFua05hbWU+PFBheUFtdD4wLjAxPC9QYXlBbXQ+PFBheVN1bW1hcnlDb2RlPjwvUGF5U3VtbWFyeUNvZGU+PFBheVN1bW1hcnlOYW1lPnVuZGVmaW5lZDwvUGF5U3VtbWFyeU5hbWU+PFBheUJhbmtDb2RlPnVuZGVmaW5lZDwvUGF5QmFua0NvZGU+PFBheUJhbmtOYW1lPnVuZGVmaW5lZDwvUGF5QmFua05hbWU+PFBheU1nckNvZGU+PC9QYXlNZ3JDb2RlPjxQYXlNZ3JOYW1lPjwvUGF5TWdyTmFtZT48UGF5VHlwZUNvZGU+MTk8L1BheVR5cGVDb2RlPjxQYXlUeXBlTmFtZT7Wsb3T1qe4tijG5Mv7KTwvUGF5VHlwZU5hbWU+PFNldE1vZGVDb2RlPjI8L1NldE1vZGVDb2RlPjxTZXRNb2RlTmFtZT7XqtXLPC9TZXRNb2RlTmFtZT48UmVtYXJrPjwvUmVtYXJrPjwvVm91Y2hlcj4=';
	var voucher3 = '<?xml version="1.0" encoding="GBK" ?><Voucher><Id>7286</Id><AdmDivCode>340000</AdmDivCode><StYear>2012</StYear><VtCode>4209</VtCode><VoucherNo>61057859</VoucherNo><CreateDate>2012-10-09</CreateDate><DepProCode>001003</DepProCode><DepProName>项目001003</DepProName><ProCatCode>undefined</ProCatCode><ProCatName>undefined</ProCatName><BgtTypeCode>40102</BgtTypeCode><BgtTypeName>重点项目预算拨款</BgtTypeName><ExpFuncCode>2010101</ExpFuncCode><ExpFuncName>行政运行</ExpFuncName><ExpEcoCode>30101</ExpEcoCode><ExpEcoName>基本工资</ExpEcoName><AgencyCode>002001</AgencyCode><AgencyName>预算单位002001</AgencyName><FundTypeCode>11</FundTypeCode><FundTypeName>公共财政预算</FundTypeName><PayeeAcctNo>1234567890160325</PayeeAcctNo><PayeeAcctName>账户全称工资统发账户gatheringbankacct</PayeeAcctName><PayeeAcctBankName>农业银行</PayeeAcctBankName><PayAcctNo>1234567890161351</PayAcctNo><PayAcctName>账户全称161351</PayAcctName><PayAcctBankName>光行合肥阜南路支行</PayAcctBankName><PayAmt>0.01</PayAmt><PaySummaryCode></PaySummaryCode><PaySummaryName>undefined</PaySummaryName><PayBankCode>undefined</PayBankCode><PayBankName>undefined</PayBankName><PayMgrCode></PayMgrCode><PayMgrName></PayMgrName><PayTypeCode>19</PayTypeCode><PayTypeName>直接支付(其他)</PayTypeName><SetModeCode>2</SetModeCode><SetModeName>转账</SetModeName><Remark></Remark></Voucher>';
  var tempsign ;
  var tmp = voucher3.base64encode();
  var d1 = new Date();
  for(var i=0;i<101;i++){
	//  tmp = voucher3.base64encode();
  }
  alert(((new Date)-d1)/1000);
	//alert(tmp.base64decode());
	

//校验服务器地址
function verifyURL(){
	 evoucher_vouurl = document.getElementById("vouch_url").value.trim();
	 evoucher_stampurl = document.getElementById("stamp_url").value.trim();
	var initVal = Ext.lt.ifmis.evoucher.init();
	if(initVal!=0){
		alert(ctj.GetLastErr());
		return;
	}
	
	alert("成功连接!");
}

//签章按钮
function doSign(){
	var vouno = document.getElementById("vouchno").value.trim();
	var stampNo = document.getElementById("stampxml").value.trim();
	var voucher = document.getElementById("vouchxml").value.trim();
	ifmisdiv = document.getElementById("admindiv").value.trim();
	current_year = document.getElementById("ayear").value.trim();
	 evoucher_vouurl = document.getElementById("vouch_url").value.trim();
	 evoucher_stampurl = document.getElementById("stamp_url").value.trim();
	if(vouno==""){
		alert("凭证类型不能为空！");
		return;
	}
	if(stampNo==""){
		alert("签章报文不能为空！");
		return;
	}
	if(voucher==""){
		alert("凭证报文不能为空！");
		return;
	}
	var ctj = Ext.lt.ifmis.evoucher.getCTJEstampOcx();
	if(typeof(ctj)!="undefined"){
		var sign =	Ext.lt.ifmis.evoucher.getVoucherStamp(vouno,stampNo,voucher,ifmisdiv,current_year);
		for(var v in sign){
			tempsign = sign[v];
		}
	}
	document.getElementById("result").value=tempsign;
}
//签名按钮
function doSign2(){
	var vouno = document.getElementById("vouchno").value.trim();
	var voucher = document.getElementById("vouchxml").value.trim();
	ifmisdiv = document.getElementById("admindiv").value.trim();
	current_year = document.getElementById("ayear").value.trim();
	 evoucher_vouurl = document.getElementById("vouch_url").value.trim();
	 evoucher_stampurl = document.getElementById("stamp_url").value.trim();
		if(vouno==""){
			alert("凭证类型不能为空！");
			return;
		}
		if(voucher==""){
			alert("凭证报文不能为空！");
			return;
		}
	var ctj = Ext.lt.ifmis.evoucher.getCTJEstampOcx();
	if(typeof(ctj)!="undefined"){
		var signuture = Ext.lt.ifmis.evoucher.signVoucher(vouno,voucher,ifmisdiv,current_year);
		for(var v in signuture){
			tempsign = signuture[v];
		}
	}
	document.getElementById("result").value=tempsign;
}
//对不带位置的报文进行验签操作
function verifySign2(){
	var vouno = document.getElementById("vouchno").value.trim();
	var voucher = document.getElementById("vouchxml").value.trim();
	 evoucher_vouurl = document.getElementById("vouch_url").value.trim();
	 evoucher_stampurl = document.getElementById("stamp_url").value.trim();
	if(vouno==""){
		alert("凭证类型不能为空！");
		return;
	}
	if(voucher==""){
		alert("凭证报文不能为空！");
		return;
	}
	var anchor = Ext.lt.ifmis.evoucher.verfiySignWithoutPosition(vouno,voucher);
	document.getElementById("result").value="";
	for(var r in anchor){
		document.getElementById("result").value=document.getElementById("result").value + ""+r+":"+anchor[r];
	}
}
function doSign3(){
	var vouno = document.getElementById("vouchno").value.trim();
	var vouchno2 = document.getElementById("vouchno2").value.trim();
	ifmisdiv = document.getElementById("admindiv").value.trim();
	current_year = document.getElementById("ayear").value.trim();
	 evoucher_vouurl = document.getElementById("vouch_url").value.trim();
	 evoucher_stampurl = document.getElementById("stamp_url").value.trim();
		if(vouno==""){
			alert("凭证类型不能为空！");
			return;
		}
		if(vouchno2==""){
			alert("凭证编号不能为空！");
			return;
		}
		var signuture = Ext.lt.ifmis.evoucher.printPreview(vouno,0,vouchno2,ifmisdiv,current_year);
		if(signuture!=0){
			alert(ctj.GetLastErr());
		}
}
// 显示签章结果
function doSign4(){
	var vouno = document.getElementById("vouchno").value.trim();
	var vouchno2 = document.getElementById("vouchno2").value.trim();
	ifmisdiv = document.getElementById("admindiv").value.trim();
	current_year = document.getElementById("ayear").value.trim();
	 evoucher_vouurl = document.getElementById("vouch_url").value.trim();
	 evoucher_stampurl = document.getElementById("stamp_url").value.trim();
		if(vouno==""){
			alert("凭证类型不能为空！");
			return;
		}
		if(vouchno2==""){
			alert("凭证编号不能为空！");
			return;
		}
		var signuture = Ext.lt.ifmis.evoucher.showVoucher(vouno,0,0,0,vouchno2,ifmisdiv,current_year);
		if(signuture!=0){
			alert(ctj.GetLastErr());
		}
 }
 
 //查询签章位置
 function findStamp(){
	 var vouno = document.getElementById("vouchno").value.trim();
	 evoucher_vouurl = document.getElementById("vouch_url").value.trim();
	 evoucher_stampurl = document.getElementById("stamp_url").value.trim();
	 if(vouno==""){
		alert("凭证类型不能为空！");
		return;
	 }
	  var stamp = Ext.lt.ifmis.evoucher.queryStampPosition(vouno);
		document.getElementById("result").value = "";
		for(var r in stamp){
			document.getElementById("result").value=document.getElementById("result").value + ""+r+":"+stamp[r]+" ";
		}
 }
 //入库
 function saveStampVoucher(){
		var ocxobj = Ext.lt.ifmis.evoucher.getCTJEstampOcx();
		if(typeof(ocxobj)!="undefined"){
				certid = ocxobj.SelectCertId();
		}
		var vouchno = document.getElementById("vouchno").value.trim();
		var voucherxml = document.getElementById("result").value.trim();
		if(vouchno==""){
			alert("凭证类型不能为空！");
			return;
		}
		if(voucherxml==""){
			alert("凭证签名(章)结果报文不能为空！");
			return;
		}
		var param_arr = [certid,vouchno,voucherxml];
		var anchor = Ext.lt.RCP.asynserver('gov.mof.fasp.ifmis.system.evoucher.EvoucherServiceImpl','saveStampVoucher',param_arr);
		for(var r in anchor){
			document.getElementById("result").value="电子凭证号 "+r+"-电子凭证编号 "+anchor[r];
		}
 }
 //作废
 function discard(){
		var ocxobj = Ext.lt.ifmis.evoucher.getCTJEstampOcx();
		if(typeof(ocxobj)!="undefined"){
				certid = ocxobj.SelectCertId();
		}
		var vouchno = document.getElementById("vouchno").value.trim();
		var vouchno2= document.getElementById("vouchno2").value.trim();
		if(vouchno==""){
			alert("凭证类型不能为空！");
			return;
		}
		if(vouchno2==""){
			alert("凭证编号不能为空！");
			return;
		}
		var str = vouchno2.split(",");
		var param_arr = [certid,vouchno,str];
		var anchor = Ext.lt.RCP.asynserver('gov.mof.fasp.ifmis.system.evoucher.EvoucherServiceImpl','discardVoucher',param_arr);
 }
 //撤销
 function cancle(){
		var ocxobj = Ext.lt.ifmis.evoucher.getCTJEstampOcx();
		if(typeof(ocxobj)!="undefined"){
				certid = ocxobj.SelectCertId();
		}
		var vouchno = document.getElementById("vouchno").value.trim();
		var vouchno2= document.getElementById("vouchno2").value.trim();
		if(vouchno==""){
			alert("凭证类型不能为空！");
			return;
		}
		if(vouchno2==""){
			alert("凭证编号不能为空！");
			return;
		}
		var str = vouchno2.split(",");
		var param_arr = [certid,vouchno,str];
		var anchor = Ext.lt.RCP.asynserver('gov.mof.fasp.ifmis.system.evoucher.EvoucherServiceImpl','cancelStamp',param_arr);
 }
</script>
</html>
