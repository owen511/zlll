<%@ page contentType="text/html; charset=GBK" %>
<%@page import="java.util.ArrayList"%>
<%@page import="gov.mof.fasp.ifmis.common.Globals"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<HTML >
 <HEAD>

  <TITLE>�ؼ����</TITLE>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
<link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=request.getContextPath()%>/style/stylefontS.css" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_LOGO%>_logo.css"/>
<script type="text/javascript" src="../../js/prototype.js"></script>
<script type="text/javascript" src="../../js/choose.js"></script>
<script type="text/javascript" src="../../js/loadOcx.js"></script>
<script type="text/javascript" src="../../js/changescroll.js"></script>
<script type="text/javascript" src="../../js/jquery-1[1].3.1.js"></script>	
<style type="text/css">
tr{
 text-align:left;
  }
#downurl a{
	color:red; text-decoration:none;
}
</style>
 </HEAD>

 <BODY  class="pop_body">


     
<div id="popPage"><div id="shenhe_title"><div id="shenhe_title_middle"></div></div>
<div id="query_t">

	<div id="form_table_title">
		<ul>
			<li class="top">
				<div>
					һ�廯ϵͳ��ؿؼ�
				</div>
			</li>
		</ul>
		</div>
<div id="container">
	<div id="list"></div>
							<br><br>
						<br>
<center><div id="showResult" style="margin-left: 10px;">���ڼ�飬���Ժ�...</div></center>
<br><br>
<center><div id="showResult2" style="margin-left: 10px;"></div></center>
<br>
<div id="downurl" style="display:none;margin-left: 10px;">
<%
if(Globals.IFMIS_DOWNURL.indexOf(";")!=-1){ 
 String[] url=Globals.IFMIS_DOWNURL.split(";");
 for(int i=0;i<url.length;i++){
%>
<a href="<%=url[i]%>" onclick=""  target="_blank">��ַ<%=i+1%></a>&nbsp&nbsp
<%}
}else if(Globals.IFMIS_DOWNURL!=""&&Globals.IFMIS_DOWNURL.indexOf(";")==-1){
%>
<a href="<%=Globals.IFMIS_DOWNURL%>" onclick=""  target="_blank">��ַ1</a>&nbsp&nbsp
<%
}%>
</div>
</div>
  </BODY>
</HTML>

<script>
/*�����鿪ʼ--by jiazhiyu*/
var count=0;
setTimeout(function() {
    var url = '<%=request.getContextPath()%>/common/getplugininfo.do';
    var myAjax = new Ajax.Request(
    url, {
        method: 'post',
        onComplete: showR
    });
},
1);
function showR(request) {
    var jsons = request.responseText.evalJSON(true);
    var length =jsons.length;
    var tmp = null;
    
    for (var i = 0; i < length; i++) {
        tmp = jsons[i]["PROGID"];
        if(checkOcx2(tmp)){
        jsons[i]["PROGID"] ="�Ѱ�װ";
        count++;
        }else{
        jsons[i]["PROGID"] ="û�а�װ";
        }
    }
    showCheckResult(jsons);
}
/*���������*/
var url = '<%=request.getContextPath()%>/common/ifmis_plugins.exe';;
function showCheckResult(jsons) {
    var show = jsons;
    var tablestr = "<table border=\"0\" id=\"tbl\" cellspacing=\"1\" align=\"center\"><tr style=\"text-align:center;\"><th >����	</th><th>�ؼ�����</th><th>��ʾ</th><th>״̬</th></tr>"
    for (var i = 0; i < show.length; i++) {
        tablestr += "<tr><td style=\"text-align:center;\">" + (i + 1) + "</td><td>" + show[i]["PLUGINNAME"] + "</td><td>" + show[i]["REMARK"] + "</td><td>" + show[i]["PROGID"] + "</td></tr>";
    }
    tablestr += "</table>";
    document.getElementById("list").innerHTML = tablestr;
    document.getElementById("container").style.height = "320px";
    document.getElementById("showResult").innerHTML = "ϵͳ�����Ŀؼ�û�а�װ����������װһ�廯���,��װ��ɺ��������������";
    document.getElementById("showResult2").innerHTML = "���ص�ַ��";
    document.getElementById("downurl").style.display="block";
}
/*
 * ��Ȿ���Ƿ�װ�ؼ�
 * proid---ע���progid
 */
function checkOcx2(proid) {
    var obj;
    var sum = 0;
    try {
        obj = new ActiveXObject(proid);
        sum++;
    }
    catch(e) {
        for (var x = 1; x < 10; x++) {
        try {
            obj = eval("new ActiveXObject('" + proid + "." + x + "')");
            sum++;
            break;
        } catch(e) {}
    }
    }
    if (sum > 0) {
        return true;
    } else if (sum === 0) {
        return false;
    }
}
</script>

