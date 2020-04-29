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

		<title>系统升级安装</title>

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
		requestHeaders:{Accept:"application/json","If-Modified-Since":"0"},//禁止读取缓存数据
		asynchronous: asynchronous,
		onComplete:function (resp) {
			if(resp.responseText=='{}'||resp.responseText=='"加载失败"')return;
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
					alert("网络不通，连接失败!");
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
	if(interval){alert('正在升级');return}
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
			alert('升级失败');
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
				alert("升级完成");
				var b=confirm("是否复制到剪贴板");
				if(b)
					window.clipboardData.setData("text",td.innerHTML.replace(/<br>/g,'\n'));
				interval=false;
				b=confirm("是否自动更新数据");
				if(b)
					window.location.reload();
			}
		},function(){
			alert('升级失败');
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
				alert("重置完成");
				window.location.reload();
			}
		},function(){
			alert('重置失败');
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
								<input type='button' id="button" value="升级" onclick='install();' /><input type='button' id="button" value="初始化版本" onclick='clearVesion();' /><input type='button' id="button" value="读取日志" onclick='loadInfo();' />
							</td>
						</tr>
						<tr>
							<td align="left"></td>
							<td align="left">
								系统名称
							</td>
							<td align="left">
								当前版本
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
					升级日志
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
		    //升级
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