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
		<span><span title="����" class="add_btn" onclick="doAdd()"
			onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
			onmousedown="doChangeBg1(this)"><a href="#">����</a> </span> </span>
		<span><span title="�޸�" class="mod_btn" onclick="doMod()"
			onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
			onmousedown="doChangeBg1(this)"><a href="#">�޸�</a> </span> </span>
		<span><span title="ɾ��" class="del_btn" onclick="doDel()"
			onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
			onmousedown="doChangeBg1(this)"><a href="#">ɾ��</a> </span> </span>
		<span><span title="����ע����ļ�" class="initialization_btn"
			onclick="doSet()" onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
			onmousedown="doChangeBg1(this)"><a href="#">����ע����ļ�</a></span></span>     
	</div>
<div id="form_table_title">
		<ul>
			<li class="top">
				<div>
					��ѡ��������վ��
				</div>
			</li>
		</ul>
		</div>
<div id="container">
	<div id="list">
		<table border="0" id="tbl" cellspacing="1" align="center">
						<tr>
							<th style="width:50px">
								����
							</th>
							<th style="width:60px">
							</th>
							<th>
								վ��IP
							</th>
							<th>
								״̬
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
					����
					</td>
					</tr>
					<%} %>
					</table>
						</div>
<script type="text/javascript">
// ����
function doAdd() {
	var submenuid = <c:out value="${param.submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
    var url = "<%=request.getContextPath()%>/system/setIE/turnToSave.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
    window.location.href = url;
}
function doMod(){
	if (getSelectedContent()=="") {
        alert("��ѡ��һ��Ҫ�޸ĵļ�¼��");
        return;
    }
   	var site=getSelectedContent();
	var submenuid = <c:out value="${submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
    var url = "<%=request.getContextPath()%>/system/setIE/modify.do?mainmenu="+mainmenu+"&submenu="+ submenuid+"&site=" + site;
    	window.location.href = url;
}
//ɾ��
function doDel()
{
	if (getSelectedContent()=="") {
        alert("��ѡ��һ��Ҫɾ���ļ�¼��");
        return;
    }
    var site=getSelectedContent();
	var submenuid = <c:out value="${submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
    var url = "<%=request.getContextPath()%>/system/setIE/delete.do?mainmenu="+mainmenu+"&submenu="+ submenuid+"&site=" + site;
    if(confirm("ȷ��ɾ����ѡ��ַ"+site+"��")){
    	window.location.href = url;
    }
}

function doSet(){
 	var submenuid = <c:out value="${submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
    var url = "<%=request.getContextPath()%>/system/setIE/create.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
 	if(confirm("ȷ�����б��е����е�ַ��ӵ�������վ����")){
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