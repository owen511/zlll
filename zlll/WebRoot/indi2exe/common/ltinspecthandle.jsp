<%@ page contentType="text/html; charset=GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path;
%>
<input type="hidden" id="againFlag" name="againFlag" value="">
<form id="explainForm" target="explainFrame" method="post" enctype="multipart/form-data" action="<%=request.getContextPath() %>/indi/common/uploadImg.do?mainmenu=<c:out value='${param.mainmenu}'/>&submenu=<c:out value='${param.submenu}'/>">
<div id="ltinspect2" style="POSITION: absolute;top:50px;left:400px;display:none;background:#fff;border:5px solid #C0D9D9">
<div id="shenhe_title" >
<div id="shenhe_title_middle">用户意见</div></div>
<div id="audit_remark" align="center">
   <table width="500px" border="0" cellspacing="0" cellpadding="0" class="auditremark_table">
  <tr>
    <td align="left"><span><font style="font-weight:bold;color:blue;padding-left:10px"><span id="image2"><img src='/pay/image/0.gif' alt='通过'/></span>
	<span id="inspectresult2"></span></font></span>
	
	</td>
  </tr>
    <tr>
    <td align="left"><br/>
	<span id = "isImgMust"><span style="padding-left:10px;padding-top:20px"><font style="font-weight:bold;font-size:2;color:red;padding-left:10px">* 请上传领导签字盖章图片</font></span><br/><br/>
	<input type="file"  id="signImg" name="signImg" style="margin-left:30px"> </input></span></td>
  </tr>
  <tr>
    
    <td align="left" style="padding-left:10px;padding-top:10px">
	<span style="padding-left:10px"><font style="font-weight:bold;font-size:2;color:red;">*请填写理由说明：</font></span><br/><br/>
	<textarea  name="explainInfo" id="explainInfo" cols="45" rows="7"  style="overflow:hidden;margin-left:15px"></textarea></td>
  </tr>
  <tr>
  <input type="hidden" name="selData" id="selData"/>
  <tr>
    <td>
      <div id="operation_center" style="padding-top:10px;height:30px">
	    <button onclick="close_view('ltinspect2');" class="button_style">返回修改</button>
    	<button onclick="continuesave();" class="button_style">确定</button>       
      </div>
	</td>
  </tr>
</table>

</div>
</div>

<div id="ltinspect1" style="POSITION: absolute;top:100px;left:400px;display:none;background:#fff;border:5px solid #C0D9D9">
<div id="shenhe_title" >
<div id="shenhe_title_middle">提示</div></div>
<div id="audit_remark" align="center" style = "top:40px">
   <table width="500px" border="0" cellspacing="0" cellpadding="0" class="auditremark_table" style="margin-top:20px">
  <tr>
    <td align="left"><span><font style="font-weight:bold;color:red;padding-left:10px"><span id="image1"></span>
	<span id="inspectresult1"></span></font></span>
	
	</td>
  </tr>
  <tr>
  <input type="hidden" name="selData" id="selData"/>
  <tr>
    <td>
      <div id="operation_center" style="padding-top:30px;height:30px">
	    <button onclick="close_view('ltinspect1');" class="button_style">确定</button>
      </div>
	</td>
  </tr>
</table>

</div>
</div>
<input type="hidden" id="imgid" name="imgid" value="">
</form>
<iframe id="explainFrame" name="explainFrame" style="width:0px;height:0px"></iframe>
<script>
var ismustflag = "1";
var imageid = 0;
var handleFunc ;
function showInspectResult(imageseq,code,result,ismust,callback){
	handleFunc = callback;
	imageid = imageseq;
	document.getElementById("againFlag").value="";
	if(code == null || code == "" || code == "null"){
		return;
	}
	document.getElementById("imgid").value = imageid;
	ismustflag = ismust;
	var imgsrc = code ==0 ? "<img src='/pay/image/0.gif' alt='通过'/>" :
			     code == 1 ? "<img src='/pay/image/2.gif' alt='违规'/>" :
			     code == 2 ? "<img src='/pay/image/1.gif' alt='存疑'/>" :
			     code == 3 ? "<img src='/pay/image/1.gif' alt='提醒'/>" : "";
	
	if (ismust != "1"){
		document.getElementById("isImgMust").innerHTML = "";
	} 
	var result_content = "违反监控规则<a href='#' style='text-decoration:underline;color:red' color='red' title='查看违反规则' onclick='getitinspectinfo(this.parentElement)'>【"+(!!result?result:"")+"】</a>，规则详情，请点击查看！"
	
    var content_div = document.getElementById("ltinspect"+code);
    document.getElementById("image"+code).innerHTML=imgsrc;
    document.getElementById("inspectresult"+code).innerHTML=result_content;
    document.getElementById("inspectresult"+code).value = result;
    content_div.style.width = 500;
	content_div.style.offsetWidth = 50;
	content_div.style.height= code==2?ismust==1?350:300:150; 
	content_div.style.zIndex=1000;
	content_div.style.display='block';
}

function close_view(dialog){
	closeDiv();
    var content_div = document.getElementById(dialog);
	document.getElementById("explainInfo").value="";
	if(!!document.getElementById("signImg")) document.getElementById("signImg").value="";
	content_div.style.display = "none";

}

function continuesave(){
	var explainInfo = JQ("#explainInfo").text();
	if(ismustflag=="1" && !JQ("#signImg").val()){
		alert("请上传领导签字盖章图片后保存！");
		return;
	}
	if(!explainInfo){
		alert("请填写理由说明后保存！");
		return ;
	}
	document.getElementById("againFlag").value=1;
	JQ("#explainForm").submit();
	close_view('ltinspect2')
	show();
	setTimeout(function(){
		if(!!document.getElementById("againFlag").value){
			if (typeof handleFunc == "function") {
				handleFunc();
			}
		}
	},1000);
}

</script>