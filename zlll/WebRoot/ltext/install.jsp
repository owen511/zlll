<%@ page language="java"
	import="java.util.*,com.longtu.managerconsole.install.*"
	pageEncoding="GBK"%>
<%@page import="com.longtu.framework.portal.server.ServerContext"%>
<%@page import="com.longtu.framework.rpcfw.mapper.ObjectReader"%>

<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    String clazz = request.getParameter("installconfig");
    String isread = request.getParameter("read");
    String clear = request.getParameter("clear");
    IfmisInstallServer ser = new IfmisInstallServer();
    //load
    ser.setServerContext(new ServerContext(request, response));
    
    if (clazz == null && isread == null&& clear == null) {
        List l = ser.load();
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<base href="<%=basePath%>">

		<title>ϵͳ������װ</title>

		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->

	</head>
	<script type="text/javascript"
		src="<%=basePath%>/ltext/frameworksupport.js"></script>
	<script type="text/javascript">
function call(asynchronous, para, callbakfn, falsefun) {
	new Ajax.Request("<%=basePath%>/ltext/install.jsp?"+new Date().getTime(),{
		parameters:para,
		method:"post", 
		requestHeaders:{Accept:"application/json","If-Modified-Since":"0"},//��ֹ��ȡ��������
		asynchronous: asynchronous,
		onComplete:function (resp) {
			if(resp.responseText=='{}'||resp.responseText=='"����ʧ��"')return;
			var respText = resp.responseText.split(":");
			if(respText[0]=='error'){
				if(falsefun==null){
					alert(respText[1]);
				}
				else{
					falsefun();	
				}
				return;
			}
			if(callbakfn!=null) callbakfn(Ext.util.JSON.decode(resp.responseText.replace(/\n/g,' ').replace(/\r/g,' ')),true);
		},
		onFailure:function (resp) {
			if(falsefun==null){
				if(resp.status==12029){
					alert("���粻ͨ������ʧ��!");
				}else{
					alert(x.statusText);
				}
			}
			else{
				falsefun();	
			}
		}
	});
}
var interval=false;

function install(){
	if(interval){alert('��������');return}
	var installconfig=[];
	var chks=document.getElementsByName("clazz");
	for(var i=0;i<chks.length;i++){
		if(chks[i].checked){
			installconfig.push(chks[i].value);
		}
	}
	if(installconfig.length==0){interval=false;return ;}
	interval=true;
	loadInfo();
	var td=document.getElementById("text_value");
	call(true,"installconfig="+installconfig.join(','),
		function (resp) {
			if(resp=="true"){
			}else if(resp=="false"){
			}else{
				if(resp instanceof Array){
					td.insertAdjacentText("beforeEnd", resp.join('').replace(/<br>/g,'\n'));
				}else{
					td.insertAdjacentText("beforeEnd", resp.replace(/<br>/g,'\n'));
				}
				interval=false;
			}
		},function(){
			alert('����ʧ��');
			interval=false;
		}
	);
} 

function loadInfo(){
	if(!interval)return;
	var td=document.getElementById("text_value");
	call(false,"read=1",
		function (resp) {
			if(resp.value){
				var r=resp.value;
				if(r instanceof Array){
					td.insertAdjacentText("beforeEnd", r.join('').replace(/<br>/g,'\n'));
				}else{
					td.insertAdjacentText("beforeEnd", r.replace(/<br>/g,'\n'));
				}
			}
			if(resp.end=="true"){
				alert("�������");
				var b=confirm("�Ƿ��Ƶ�������");
				if(b)
					window.clipboardData.setData("text",td.innerHTML.replace(/<br>/g,'\n'));
				interval=false;
				b=confirm("�Ƿ��Զ���������");
				if(b)
					window.location.reload();
			}
		},function(){
			alert('����ʧ��');
			interval=false;
		}
	);
	if(this.interval){
		window.setTimeout("loadInfo()",10);
	}
	
}

function clearVesion(){
	call(false,"clear=1",
		function (resp) {
			if(resp=="true"){
				alert("�������");
				window.location.reload();
			}
		},function(){
			alert('����ʧ��');
			interval=false;
		}
	);
}
</script>
	<body>
		<table width="98%" border=1 bordercolor="#597EAA" height="100%">
			<tr>
				<td width="50%" valign="top">
					<table width="80%" align="center">
						<tr>
							<td align="left" colspan="3">
								<input type='button' id="button" value="����" onclick='install();' /><input type='button' id="button" value="��ʼ���汾" onclick='clearVesion();' /><input type='button' id="button" value="��ȡ��־" onclick='loadInfo();' />
							</td>
						</tr>
						<tr>
							<td align="left"></td>
							<td align="left">
								ϵͳ����
							</td>
							<td align="left">
								��ǰ�汾
							</td>
						</tr>
						<%
						    for (int i = 0; i < l.size(); i++) {
						            Map m = (Map) l.get(i);
						%>
						<tr>
							<td align="left" width="50px">
								<input type="checkbox" name="clazz" value="<%=m.get("clazz")%>" />
							</td>
							<td align="left" width="50%"><%=m.get("name")%></td>
							<td align="left" width="50%"><%=m.get("cv")%></td>
						</tr>
						<%
						    }
						%>
					</table>
				</td>
				<td>
					������־
					<table width="100%" height="100%">
						<tr>
							<td id="text_value">
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</body>
</html>

		<%
		    }
		    //����
		    if (clazz != null) {
		        ArrayList l = new ArrayList();
		        String s[]=clazz.split(",");
		        for(int i=0;i<s.length;i++){
		            l.add(s[i]);
		        }
		        ObjectReader reader = new ObjectReader(ser.installConfig(l));
		        out.clear();
		        out.print(reader.getObjectValue());
		        out.flush();
		    }
		    //read
		    if (isread != null) {
		        ObjectReader reader = new ObjectReader(ser.readInfo());
		        out.clear();
		        out.print(reader.getObjectValue());
		        out.flush();
		    }
		  //read
		    if (clear != null) {
		        ObjectReader reader = new ObjectReader(ser.clear());
		        out.clear();
		        out.print(reader.getObjectValue());
		        out.flush();
		    }
		    
		%>