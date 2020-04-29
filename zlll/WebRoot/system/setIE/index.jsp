<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
 <%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
	String[] iplist=null;
	if(request.getAttribute("file")!=null&&(String)request.getAttribute("file")!=""){
	iplist=((String)request.getAttribute("file")).split(";");
	}
%>
  <head>
  <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
<link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=request.getContextPath()%>/style/stylefontS.css" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_LOGO%>_logo.css"/>
<script type="text/javascript" src="../../js/prototype.js"></script>
<script type="text/javascript" src="../../js/choose.js"></script>
<script type="text/javascript" src="../../js/changescroll.js"></script>
<script type="text/javascript" src="../../js/jquery-1[1].3.1.js"></script>	
  </head>
  
  	<div id="query_t">
		<span><span title="新增" class="add_btn" onclick="doAdd()"
			onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
			onmousedown="doChangeBg1(this)"><a href="#">新增</a> </span> </span>
		<span><span title="修改" class="mod_btn" onclick="doMod()"
			onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
			onmousedown="doChangeBg1(this)"><a href="#">修改</a> </span> </span>
		<span><span title="删除" class="del_btn" onclick="doDel()"
			onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
			onmousedown="doChangeBg1(this)"><a href="#">删除</a> </span> </span>
		<span><span title="生成注册表文件" class="initialization_btn"
			onclick="doSet()" onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
			onmousedown="doChangeBg1(this)"><a href="#">生成注册表文件</a></span></span>     
	</div>
<div id="form_table_title">
		<ul>
			<li class="top">
				<div>
					可选启用信任站点
				</div>
			</li>
		</ul>
		</div>
<div id="container">
	<div id="list">
		<table border="0" id="tbl" cellspacing="1" align="center">
						<tr>
							<th style="width:50px">
								序列
							</th>
							<th style="width:60px">
							</th>
							<th>
								站点IP
							</th>
							<th>
								状态
							</th>
						</tr>
					<%if(iplist!=null) 
					for(int i=0;i<iplist.length;i++){
					%>
					<tr>
					<td  style="width:50px"><%=i+1%></td>
					<td style="width:60px"><input type="radio" name="ip" value="<%=iplist[i]%>"/></td>
					<td><%=iplist[i]%></td>
					<td>
					可用
					</td>
					</tr>
					<%} %>
					</table>
						</div>
<script type="text/javascript">
// 新增
function doAdd() {
	var submenuid = <c:out value="${param.submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
    var url = "<%=request.getContextPath()%>/system/setIE/turnToSave.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
    window.location.href = url;
}
function doMod(){
	if (getSelectedContent()=="") {
        alert("请选择一条要修改的记录！");
        return;
    }
   	var site=getSelectedContent();
	var submenuid = <c:out value="${submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
    var url = "<%=request.getContextPath()%>/system/setIE/modify.do?mainmenu="+mainmenu+"&submenu="+ submenuid+"&site=" + site;
    	window.location.href = url;
}
//删除
function doDel()
{
	if (getSelectedContent()=="") {
        alert("请选择一条要删除的记录！");
        return;
    }
    var site=getSelectedContent();
	var submenuid = <c:out value="${submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
    var url = "<%=request.getContextPath()%>/system/setIE/delete.do?mainmenu="+mainmenu+"&submenu="+ submenuid+"&site=" + site;
    if(confirm("确定删除所选地址"+site+"吗？")){
    	window.location.href = url;
    }
}

function doSet(){
 	var submenuid = <c:out value="${submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
    var url = "<%=request.getContextPath()%>/system/setIE/create.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
 	if(confirm("确定将列表中的所有地址添加到受信任站点吗？")){
   	 window.location.href = url;
    }
}
function getSelectedContent(){
var radio = document.getElementsByName("ip");
for(var i=0;i<radio.length;i++){
	if(radio[i].checked==true){
	return radio[i].value;
	}
}
return "";
}
</script>