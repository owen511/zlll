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
<TITLE>自定义编辑区设置</TITLE>
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
   			alert("请选择一条数据进行修改");
    			return false;
    		}
   	}
    }
    if(j ==0){
    	alert("请选择要修改的数据");
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
           alert("请选择要删除的数据");
           return;
         }
          if(confirm("确定要删除数据吗？")){
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
		<span><span title="新增" class="add_btn"
			onclick="dochangepage()" onmouseover="doChangBg(this)"
			onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a
				href="#">新增</a> </span> </span>
		<span><span title="修改" class="mod_btn"
			onclick="dochangepageupdate()" onmouseover="doChangBg(this)"
			onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a
				href="#">修改</a> </span> </span>
		<span><span title="删除" class="del_btn" onclick="deleteData()"
			onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
			onmousedown="doChangeBg1(this)"><a href="#">删除</a> </span> </span>
		<span><span title="关闭" class="close_btn"
			onclick="window.close()" onmouseover="doChangBg(this)"
			onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a
				href="#">关闭</a> </span> </span>
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
					编辑区配置
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
					显示顺序
				</th>
				<th nowrap="nowrap">
					分组编号
				</th>
				<th nowrap="nowrap">
					字段名
				</th>
				<th nowrap="nowrap">
					中文名称
				</th>
				<th nowrap="nowrap">
					交易凭证号
				</th>
				<th nowrap="nowrap">
					类型
				</th>
				<th nowrap="nowrap">
					是否金额
				</th>
				<th nowrap="nowrap">
					可否为负数
				</th>
				<th nowrap="nowrap">
					显示
				</th>
				<th nowrap="nowrap">
					显示级次
				</th>
				
				<th nowrap="nowrap">
					控制级次
				</th>
				<th nowrap="nowrap">
					级联控制
				</th>
				<th nowrap="nowrap">
					必录
				</th>
				<th nowrap="nowrap">
					必录说明
				</th>
				<th nowrap="nowrap">
					输入控制末级
				</th>
				<th nowrap="nowrap">
					任意修改
				</th>
				<th nowrap="nowrap">
					录入新增可改
				</th>
				<th nowrap="nowrap">
					录入新增显示
				</th>
				<th nowrap="nowrap">
					录入修改显示
				</th>
				<th nowrap="nowrap">
					录入修改可改
				</th>
				<th nowrap="nowrap">
					审核可改
				</th>
				<th nowrap="nowrap">
					审核修改显示
				</th>
				<th nowrap="nowrap">
					默认值
				</th>
				<th nowrap="nowrap">
					属性域改变事件
				</th>
				<th nowrap="nowrap">
					按键事件
				</th>
				<th nowrap="nowrap">
					添加属性域事件
				</th>
				<th nowrap="nowrap">
					触发弹出树表达式事件
				</th>
				<th nowrap="nowrap">
					是否顺向细化
				</th>
				<th nowrap="nowrap">
					自定义函数
				</th>
				<th nowrap="nowrap" >
					textarea的高度
				</th>
				<th nowrap="nowrap" >
					过滤条件
				</th>
				<th nowrap="nowrap" >
					录入校验条件
				</th>
				<th nowrap="nowrap" >
					最大长度
				</th>
				<th nowrap="nowrap" >
					位置个数
				</th>
				<th nowrap="nowrap">
					联动清空字段名
				</th>
				<th nowrap="nowrap">
					项目可否增加
				</th>
				<th nowrap="nowrap">
					项目判重条件
				</th>
				<th nowrap="nowrap">
					input内容控制
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
							&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp是
						</c:if>
						<c:if test="${editformSetList.ismoney!=1}">
							&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp否
						</c:if>
					</td>
					<td nowrap="nowrap">
						<c:if test="${editformSetList.isnegative==1}">
							&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp是
						</c:if>
						<c:if test="${editformSetList.isnegative!=1}">
							&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp否
						</c:if>
					</td>
					<td nowrap="nowrap" >
						<c:if test="${editformSetList.isvisiable=='1'}">
							&nbsp&nbsp是
						</c:if>
						<c:if test="${editformSetList.isvisiable!=1}">
							&nbsp&nbsp否
						</c:if>
					</td>
					
<!-- by liyongze  20090720  start-->
					
					<td nowrap="nowrap">
						<c:if test="${editformSetList.maxlevel=='maxlevel=1'}">一级</c:if>
						<c:if test="${editformSetList.maxlevel=='maxlevel=2'}">二级</c:if>
						<c:if test="${editformSetList.maxlevel=='maxlevel=3'}">三级</c:if>
						<c:if test="${editformSetList.maxlevel==null}">全部</c:if>
					</td>
					
					<td nowrap="nowrap">
						<c:if test="${editformSetList.ctrllevel=='ctrllevel=1'}">一级</c:if>
						<c:if test="${editformSetList.ctrllevel=='ctrllevel=2'}">二级</c:if>
						<c:if test="${editformSetList.ctrllevel=='ctrllevel=3'}">三级</c:if>
						<c:if test="${editformSetList.ctrllevel==null}">全部</c:if>
				
					</td>
					
<!-- by liyongze  20090720  end-->					
					
					
					
					<td nowrap="nowrap">
						<c:out value='${editformSetList.showlevelconfig}'/>
					</td>
					<td nowrap="nowrap">
						<c:if test="${editformSetList.requirement==1}">
							&nbsp是
						</c:if>
						<c:if test="${editformSetList.requirement!=1}">
							&nbsp否
						</c:if>
					</td>
					<td nowrap="nowrap">
							<c:out value='${editformSetList.requirementcomment}'/>
					</td>
					<td nowrap="nowrap">
						
					</td>
					<td nowrap="nowrap">
						<c:if test="${editformSetList.modifiable==1}">
							&nbsp&nbsp&nbsp&nbsp是
						</c:if>
						<c:if test="${editformSetList.modifiable!=1}">
							&nbsp&nbsp&nbsp&nbsp否
						</c:if>
					</td>
					<td nowrap="nowrap">
						<c:if test="${editformSetList.addmodifiable==1}">
							&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp是
						</c:if>
						<c:if test="${editformSetList.addmodifiable!=1}">
							&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp否
						</c:if>
					</td>
					<td nowrap="nowrap">
						<c:if test="${editformSetList.addvisiable==1}">
							&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp是
						</c:if>
						<c:if test="${editformSetList.addvisiable!=1}">
							&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp否
						</c:if>
					</td>
					<td nowrap="nowrap">
						<c:if test="${editformSetList.updvisiable==1}">
							&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp是
						</c:if>
						<c:if test="${editformSetList.updvisiable!=1}">
							&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp否
						</c:if>
					</td>
					<td nowrap="nowrap">
						<c:if test="${editformSetList.updmodifiable==1}">
							&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp是
						</c:if>
						<c:if test="${editformSetList.updmodifiable!=1}">
							&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp否
						</c:if>
					</td>
					<td nowrap="nowrap">
						<c:if test="${editformSetList.auditmodifiable==1}">
							&nbsp&nbsp&nbsp&nbsp是
						</c:if>
						<c:if test="${editformSetList.auditmodifiable!=1}">
							&nbsp&nbsp&nbsp&nbsp否
						</c:if>
					</td>
					<td nowrap="nowrap">
						<c:if test="${editformSetList.auditvisiable==1}">
							&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp是
						</c:if>
						<c:if test="${editformSetList.auditvisiable!=1}">
							&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp否
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
							&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp是
						</c:if>
						<c:if test="${editformSetList.fromsource!=1}">
							&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp否
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
							&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp是
						</c:if>
						<c:if test="${editformSetList.isAddProgam!=1}">
							&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp否
						</c:if>
					</td>
					<td nowrap="nowrap" align="left"><c:out value="${editformSetList.REPEATPROGRAM}"/></td>
					<td nowrap="nowrap" align="center">
						<c:if test="${editformSetList.inputStyle == 'L'}">
							居左
						</c:if>
						<c:if test="${editformSetList.inputStyle == 'M'}">
							居中
						</c:if>
						<c:if test="${editformSetList.inputStyle == 'R'}">
							居右
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
