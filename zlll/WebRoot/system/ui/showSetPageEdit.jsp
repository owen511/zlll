<%@ page contentType="text/html; charset=GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@page import="gov.mof.fasp.ifmis.common.Globals"%>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
<link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=request.getContextPath()%>/style/stylefontS.css" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_LOGO%>_logo.css"/>
<script type="text/javascript" src="../../js/prototype.js"></script>
<script type="text/javascript" src="../../js/choose.js"></script>
<script type="text/javascript" src="../../js/changescroll.js"></script>
<script type="text/javascript" src="../../js/jquery-1[1].3.1.js"></script>
<TITLE>�Զ���༭������</TITLE>
<script type="text/javascript">
function reQuery(){
	$("queryform").action ="/system/ui/editformsetlist.do?query=all&submenu=<c:out value='${param.submenu}'/>&mainmenu=<c:out value='${param.mainmenu}'/>";
	$("queryform").submit();
}
function setDefaultValue(obj,dfObj){
	var elename = obj.name.substr(5);
	var df ="";
	if(obj.value !=null&&obj.value !=""){
		df += obj.valueid;
		df += ","+obj.value;
	}
	if(eval("$('"+dfObj+"')")!="undefined"){
		eval("$('"+dfObj+"').value = df");
	}
}
function dochangepage(){
     var param = document.getElementById("myparam").value;
     var mainmenu = document.getElementById("meu").value;
     var submenu = document.getElementById("seu").value;
     var linkname = '?linkname=' +document.getElementById("hid").value+'&myparam='+param+'&submenu='+submenu+'&mainmenu='+mainmenu<c:if test='${param.elementvalue != null && param.elementvalue != ""}'>+'&elementvalue='+<c:out value="${param.elementvalue}"/></c:if>;
     var url ='/system/ui/autoComplite.do'+linkname;
     
     window.location.href=url;    
}
function dochangepageupdate(){
	var param = document.getElementById("myparam").value;
	var mainmenu = document.getElementById("meu").value;
    var submenu = document.getElementById("seu").value;
	var linkname = '?linkname=' +document.getElementById("hid").value+'&myparam='+param+'&submenu='+submenu+'&mainmenu='+mainmenu<c:if test='${param.elementvalue != null && param.elementvalue != ""}'>+'&elementvalue='+<c:out value="${param.elementvalue}"/></c:if>;
    var url ='/system/ui/findshowsetpageedit.do'+linkname;
    var obj = document.getElementsByName("box");
    var values =forms.box.value
    var j=0;
    var id = "";
    for(var i=0;i< obj.length;i++){
   	if(obj[i].checked){
   		if(j ==0){
   			j++;
   			id = obj[i].value;
   		}else{
   			alert("��ѡ��һ�����ݽ����޸�");
    			return false;
    		}
   	}
    }
    if(j ==0){
    	alert("��ѡ��Ҫ�޸ĵ�����");
    	return;
    }
    if(j ==1){
    	box = '&box='+id;
   		window.location.href=url + box;
    } 
}
function deleteData(){
var linkname = '?linkname=' +document.getElementById("hid").value;
var param = document.getElementById("myparam").value;
var mainmenu = document.getElementById("meu").value;
var submenu = document.getElementById("seu").value;
    var url ='/system/ui/delshowsetpageedit.do'+linkname+'&myparam='+param+'&submenu='+submenu+'&mainmenu='+mainmenu<c:if test='${param.elementvalue != null && param.elementvalue != ""}'>+'&elementvalue='+<c:out value="${param.elementvalue}"/></c:if>;
    var obj = document.getElementsByName("box");
     var count=0;
         for(var i=0;i<obj.length;i++){
           if(obj[i].checked){
              count++;
           }
         }
        if(count==0){
           alert("��ѡ��Ҫɾ��������");
           return;
         }
          if(confirm("ȷ��Ҫɾ��������")){
            forms.action=url;
            forms.submit();
         }
}
function unselectall(){
if(document.forms.chkAll.checked){
document.forms.chkAll.checked = document.forms.chkAll.checked&0;
}
}
function CheckAll(form){
for (var i=0;i<form.elements.length;i++){
var e = form.elements[i];
if (e.Name != 'chkAll'&&e.disabled==false)
e.checked = form.chkAll.checked;
}
}
</script>
<body class=pop_body>
<div id="popPage1">
<div id="shenhe_title">
<div id="shenhe_title_middle">
</div>
</div>
<div id="query_t">
	<div>
		<span><span title="����" class="add_btn"
			onclick="dochangepage()" onmouseover="doChangBg(this)"
			onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a
				href="#">����</a> </span> </span>
		<span><span title="�޸�" class="mod_btn"
			onclick="dochangepageupdate()" onmouseover="doChangBg(this)"
			onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a
				href="#">�޸�</a> </span> </span>
		<span><span title="ɾ��" class="del_btn" onclick="deleteData()"
			onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
			onmousedown="doChangeBg1(this)"><a href="#">ɾ��</a> </span> </span>
		<span><span title="�ر�" class="close_btn"
			onclick="window.close()" onmouseover="doChangBg(this)"
			onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a
				href="#">�ر�</a> </span> </span>
	</div>
</div>
<form name=forms id="editformlist"
	action="/system/ui/saveeditformsetlist.do" method="post">
	<input name="maindata" type="hidden" />
    <input type="hidden" name="mainmenu" id='meu' value="<c:out value="${mainmenu}"/>"/>
	<input type="hidden" name="submenu" id='seu' value="<c:out value="${submenu}"/>"/>
	<div id="form_table_title">
		<ul>
			<li class="top">
				<div>
					�༭������
				</div>
			</li>
		</ul>
	</div>
	<div id="list"
		style="margin-left: 10px;overflow: auto;width:expression(form_table_title.offsetWidth);height:374px;">
		<table id="edittable" border="1" cellspacing="0" align="center" class=main_table_input>
			<tr>
				<th nowrap="nowrap">
					<input name='chkAll' type="checkbox" id='chkAll' onclick='CheckAll(this.form)'  />
				</th>
				<th nowrap="nowrap">
					��ʾ˳��
				</th>
				<th nowrap="nowrap">
					������
				</th>
				<th nowrap="nowrap">
					�ֶ���
				</th>
				<th nowrap="nowrap">
					��������
				</th>
				<th nowrap="nowrap">
					����ƾ֤��
				</th>
				<th nowrap="nowrap">
					����
				</th>
				<th nowrap="nowrap">
					�Ƿ���
				</th>
				<th nowrap="nowrap">
					�ɷ�Ϊ����
				</th>
				<th nowrap="nowrap">
					��ʾ
				</th>
				<th nowrap="nowrap">
					��ʾ����
				</th>
				
				<th nowrap="nowrap">
					���Ƽ���
				</th>
				<th nowrap="nowrap">
					��������
				</th>
				<th nowrap="nowrap">
					��¼
				</th>
				<th nowrap="nowrap">
					��¼˵��
				</th>
				<th nowrap="nowrap">
					�������ĩ��
				</th>
				<th nowrap="nowrap">
					�����޸�
				</th>
				<th nowrap="nowrap">
					¼�������ɸ�
				</th>
				<th nowrap="nowrap">
					¼��������ʾ
				</th>
				<th nowrap="nowrap">
					¼���޸���ʾ
				</th>
				<th nowrap="nowrap">
					¼���޸Ŀɸ�
				</th>
				<th nowrap="nowrap">
					��˿ɸ�
				</th>
				<th nowrap="nowrap">
					����޸���ʾ
				</th>
				<th nowrap="nowrap">
					Ĭ��ֵ
				</th>
				<th nowrap="nowrap">
					������ı��¼�
				</th>
				<th nowrap="nowrap">
					�����¼�
				</th>
				<th nowrap="nowrap">
					����������¼�
				</th>
				<th nowrap="nowrap">
					�������������ʽ�¼�
				</th>
				<th nowrap="nowrap">
					�Ƿ�˳��ϸ��
				</th>
				<th nowrap="nowrap">
					�Զ��庯��
				</th>
				<th nowrap="nowrap" >
					textarea�ĸ߶�
				</th>
				<th nowrap="nowrap" >
					��������
				</th>
				<th nowrap="nowrap" >
					¼��У������
				</th>
				<th nowrap="nowrap" >
					��󳤶�
				</th>
				<th nowrap="nowrap" >
					λ�ø���
				</th>
				<th nowrap="nowrap">
					��������ֶ���
				</th>
				<th nowrap="nowrap">
					��Ŀ�ɷ�����
				</th>
				<th nowrap="nowrap">
					��Ŀ��������
				</th>
				<th nowrap="nowrap">
					input���ݿ���
				</th>
			</tr>
			<c:forEach var="editformSetList" items="${editformSetList}"
				varStatus="status">
				<tr onclick="this.style.backgroundColor='#CBDAF2';"
					onmouseover="this.style.backgroundColor='#e8f4ff';"
					onmouseout="this.style.backgroundColor='#ffffff';">
					<th nowrap="nowrap">
						<input name="box" type="checkbox"
							value="<c:out value='${editformSetList.itemid}' />" onclick='unselectall()' id='id' />
					</th>
					<td nowrap="nowrap">
						<c:out value='${editformSetList.ordernum}'/>
					</td>
					<td nowrap="nowrap">
						<c:out value='${editformSetList.groupid}'/>
					</td>
					<td nowrap="nowrap">
						<c:out value="${editformSetList.dbcolumnname}" />
					</td>
					<td nowrap="nowrap">
						<c:out value="${editformSetList.elementname}" />
					</td>
					<td nowrap="nowrap">
							<c:out value="${editformSetList.vchcode}"/>
					</td>
					<td nowrap="nowrap">
						<c:out value="${editformSetList.itemtype}" />
					</td>
					<td nowrap="nowrap">
						<c:if test="${editformSetList.ismoney==1}">
							&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp��
						</c:if>
						<c:if test="${editformSetList.ismoney!=1}">
							&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp��
						</c:if>
					</td>
					<td nowrap="nowrap">
						<c:if test="${editformSetList.isnegative==1}">
							&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp��
						</c:if>
						<c:if test="${editformSetList.isnegative!=1}">
							&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp��
						</c:if>
					</td>
					<td nowrap="nowrap" >
						<c:if test="${editformSetList.isvisiable=='1'}">
							&nbsp&nbsp��
						</c:if>
						<c:if test="${editformSetList.isvisiable!=1}">
							&nbsp&nbsp��
						</c:if>
					</td>
					
<!-- by liyongze  20090720  start-->
					
					<td nowrap="nowrap">
						<c:if test="${editformSetList.maxlevel=='maxlevel=1'}">һ��</c:if>
						<c:if test="${editformSetList.maxlevel=='maxlevel=2'}">����</c:if>
						<c:if test="${editformSetList.maxlevel=='maxlevel=3'}">����</c:if>
						<c:if test="${editformSetList.maxlevel==null}">ȫ��</c:if>
					</td>
					
					<td nowrap="nowrap">
						<c:if test="${editformSetList.ctrllevel=='ctrllevel=1'}">һ��</c:if>
						<c:if test="${editformSetList.ctrllevel=='ctrllevel=2'}">����</c:if>
						<c:if test="${editformSetList.ctrllevel=='ctrllevel=3'}">����</c:if>
						<c:if test="${editformSetList.ctrllevel==null}">ȫ��</c:if>
				
					</td>
					
<!-- by liyongze  20090720  end-->					
					
					
					
					<td nowrap="nowrap">
						<c:out value='${editformSetList.showlevelconfig}'/>
					</td>
					<td nowrap="nowrap">
						<c:if test="${editformSetList.requirement==1}">
							&nbsp��
						</c:if>
						<c:if test="${editformSetList.requirement!=1}">
							&nbsp��
						</c:if>
					</td>
					<td nowrap="nowrap">
							<c:out value='${editformSetList.requirementcomment}'/>
					</td>
					<td nowrap="nowrap">
						
					</td>
					<td nowrap="nowrap">
						<c:if test="${editformSetList.modifiable==1}">
							&nbsp&nbsp&nbsp&nbsp��
						</c:if>
						<c:if test="${editformSetList.modifiable!=1}">
							&nbsp&nbsp&nbsp&nbsp��
						</c:if>
					</td>
					<td nowrap="nowrap">
						<c:if test="${editformSetList.addmodifiable==1}">
							&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp��
						</c:if>
						<c:if test="${editformSetList.addmodifiable!=1}">
							&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp��
						</c:if>
					</td>
					<td nowrap="nowrap">
						<c:if test="${editformSetList.addvisiable==1}">
							&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp��
						</c:if>
						<c:if test="${editformSetList.addvisiable!=1}">
							&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp��
						</c:if>
					</td>
					<td nowrap="nowrap">
						<c:if test="${editformSetList.updvisiable==1}">
							&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp��
						</c:if>
						<c:if test="${editformSetList.updvisiable!=1}">
							&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp��
						</c:if>
					</td>
					<td nowrap="nowrap">
						<c:if test="${editformSetList.updmodifiable==1}">
							&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp��
						</c:if>
						<c:if test="${editformSetList.updmodifiable!=1}">
							&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp��
						</c:if>
					</td>
					<td nowrap="nowrap">
						<c:if test="${editformSetList.auditmodifiable==1}">
							&nbsp&nbsp&nbsp&nbsp��
						</c:if>
						<c:if test="${editformSetList.auditmodifiable!=1}">
							&nbsp&nbsp&nbsp&nbsp��
						</c:if>
					</td>
					<td nowrap="nowrap">
						<c:if test="${editformSetList.auditvisiable==1}">
							&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp��
						</c:if>
						<c:if test="${editformSetList.auditvisiable!=1}">
							&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp��
						</c:if>
					</td>
					<td nowrap="nowrap">
						<c:out value='${editformSetList.defaultvalue}'/>
					</td>
					<td nowrap="nowrap">
							<c:out value='${editformSetList.onpropertychange}'/>
					</td>
					<td nowrap="nowrap">
						
							<c:out value='${editformSetList.onkeyup}'/>
					</td>
					<td nowrap="nowrap">
							<c:out value='${editformSetList.onattribute}'/>
					</td>
					<td nowrap="nowrap">
							<c:out value='${editformSetList.expressions}'/>
					</td>
					<td nowrap="nowrap">
						<c:if test="${editformSetList.fromsource=='1'}">
							&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp��
						</c:if>
						<c:if test="${editformSetList.fromsource!=1}">
							&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp��
						</c:if>
					</td>
					<td nowrap="nowrap">
						<c:out value='${editformSetList.jsfunction}'/>
					</td>
					<td nowrap="nowrap" align="left"><c:out value="${editformSetList.textarearows}"/></td>
					<td nowrap="nowrap" align="left"><c:out value="${editformSetList.elementfilter}"/></td>
					<td nowrap="nowrap" align="left"><c:out value="${editformSetList.chekinputstr}"/></td>
					<td nowrap="nowrap" align="left"><c:out value="${editformSetList.maxlength}"/></td>
					<td nowrap="nowrap" align="left"><c:out value="${editformSetList.COLSPANNUM}"/></td>
					<td nowrap="nowrap" align="left"><c:out value="${editformSetList.clearjsfunction}"/></td>
					<td nowrap="nowrap">
						<c:if test="${editformSetList.isAddProgam=='1'}">
							&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp��
						</c:if>
						<c:if test="${editformSetList.isAddProgam!=1}">
							&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp��
						</c:if>
					</td>
					<td nowrap="nowrap" align="left"><c:out value="${editformSetList.REPEATPROGRAM}"/></td>
					<td nowrap="nowrap" align="center">
						<c:if test="${editformSetList.inputStyle == 'L'}">
							����
						</c:if>
						<c:if test="${editformSetList.inputStyle == 'M'}">
							����
						</c:if>
						<c:if test="${editformSetList.inputStyle == 'R'}">
							����
						</c:if>
					</td>
				</tr>
			</c:forEach>
		</table>
	</div>
	<div id="showhelp"></div>
	<input type="hidden" id="hid" value="<c:out value='${link}'/>">
	<input type="hidden" id="myparam" name="param" value='<c:out value='${myparam}'/>'/>
	<input type="hidden" name="mainmenu" id='meu' value="<c:out value="${mainmenu}"/>"/>
	<input type="hidden" name="submenu" id='seu' value="<c:out value="${submenu}"/>"/>
</form>
</body>
<script type="text/javascript">
hideUiButton(<%=Globals.IFMIS_UISET_FLAG%>); 
</script>
