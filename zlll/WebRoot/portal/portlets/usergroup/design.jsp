<%@ page language="java" import="java.util.*" pageEncoding="GB18030"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
//�û������
String gcode = (String)request.getAttribute("gcode");
//�û�������
String gname = (String)request.getAttribute("gname");
%>

  <link href="<%=request.getContextPath()%>/style/styleportal.css" rel="stylesheet" type="text/css" />
<script>
function selectOrgan(obj){
	var formObject = $("queryform");
	var elementcode = formObject.organtype.value;
	if(null == elementcode || "" == elementcode){
		alert("����ѡ��һ�ֻ������ͣ�");
		return false;
	}
	var submenu = <c:out value="${param.submenu}"/>;
	var mainmenu = <c:out value="${param.mainmenu}"/>;
	selectMutlElememt(mainmenu,submenu,"5001",elementcode,obj,false,"",elementcode);
}

function selectBaseInfoElememt(mainmenu,submenu,elementcode,backinputStr,codevalue){
	var selvalue = backinputStr.valuecode != undefined ? backinputStr.valuecode : backinputStr.value;
	window.selvalue = selvalue;
    var element = window.$(elementcode);
   	var url = "<%=request.getContextPath()%>/portal/userinfo/elementtree.do?mainmenu="+mainmenu+"&submenu="+submenu+"&elementcode="+elementcode+"&organCode="+codevalue+"&managerid=1";
	var result = window.showModalDialog(url,window,'dialogHeight:500px;dialogWidth: 325px;resizable: No; status: No;help:No;');
	
	if(result != null){
	    if(typeof(result)!="string"){
		var str = backinputStr.id;
		eval(" var backinput = document.getElementById('"+str.substring(0,str.length-3)+"')");
		backinput.value = result.id;
		backinputStr.value = result.value;
		}
	}
}

//��ѯ���е�Ȩ��
function selectMutlElememt(mainmenu,submenu,vchtypecode,vchfieldcode,backinput,checkflag,elementfilter,organtype){
    //wy add 20090923     46000000,46000011,"5001",    "bdgagency", this.form.bdgagency, false,"","bdgagency"
    					//46000000,46000011,"5001",    "agentbank", this.form.agentbank, false,"","agentbank"
    /** ganhua 20080304 �ڴ�ѡ�񴰿�ǰ�ص�һ��������ĳЩ����
	  * �磺���ù�����������������������ؼ��Ƿ�ѡ��ֵ
	  * 
	**/
	codeShowFlag=0;
	var selvalue = backinput.valuecode != undefined ? backinput.valuecode : backinput.value;
	window.selvalue = selvalue;
	window.checkflag = checkflag;
	var func = "callBeforeOpenMultElementTree_"+vchfieldcode+"(window)";;
	var notReturn = true;
    try{
        notReturn = eval(func);
	}catch(e){
		//���ɹ�,������,��û��ʵ�ָ÷���
	}
	if(notReturn == false)
	{
		return;
	}
	var elementfilter = "";
	if(window.elementfilter){
		elementfilter = window.elementfilter;
	}

	var refererurl = ""+window.location.href;
	
	var url = ROOT_PATH+"/common/tree/openTreeUser.do?organtype="+organtype+"&mainmenu="+mainmenu+"&submenu="+submenu+"&vchtypecode="+vchtypecode
		+"&vchfieldcode="+vchfieldcode+"&elementfilter="+elementfilter+"&managerid=1"
		+"&Referer="+refererurl.substring(0,refererurl.indexOf("?"));
	var result = window.showModalDialog(url,window,"dialogHeight:500px;dialogWidth: 325px;resizable: No; status: No; help:No;");
	//var result = window.open(url, 'newWindow','dialogWidth=400px,dialogHeight=450px,status=yes,toolbar=no,menubar=no,directories=no,resizable=no,Scrollbars=no');
    //�������Ĺ������� ganhua 20090509
	if(window.elementfilter);
	{
		window.elementfilter = null;
	}
	if(result != null){
	    if(typeof(result)!="string"){
			if(backinput == null){
				backinput = $(vchfieldcode);
			}
			backinput.value = result.value;
			backinput.valueid = result.id;
			backinput.isleaf= result.isleaf;
			backinput.valuecode = result.valuecode;
			//document.getElementById("hidden_"+backinput.id).value= result.valuecode;
		}
	}
	else
	{
	    if(backinput != null){
	        backinput.value = "";
			backinput.valueid = null;
			backinput.valuecode = "";
			//document.getElementById("hidden_"+backinput.id).value= "";
	    } 
	 }
	 codeShowFlag=null;
}
function clearOranid(){
	try{
		clearInputRule("bdgagency");
		clearInput(document.getElementById("bdgagency"));
	}catch(e){}
}
</script>
<div id='query_t'> 
	<span><span title=��ѯ class=query_btn onclick=selectByCode() onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>��ѯ</a></span></span>
	<span><span title=�����ѯ���� class=clear_btn onclick=clearFormInputAll($('queryform')) onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>�����ѯ����</a></span></span>
	<span><span title=���ز�ѯ���� class=hidden_btn onclick=doQuery2(this) onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>���ز�ѯ����</a></span></span><span><span>��</span></span>
	<span><span title=���� class=save_btn onclick=selectByCode_All() onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>����</a></span></span>
	<span><span title=���� class=hidden_btn onclick=back() onmouseover=doChangBg(this) onmouseout=doReturn(this)><a href=#>����</a></span></span>
</div>
<script>
<!--���ܰ�ť�Զ��庯��start-->
var tabMenufun = new Object();
<!--���ܰ�ť�Զ��庯��end-->
</script>
<form id="queryform"
	action="/portal/onlineuser/index.do?mainmenu=26900938&submenu=26900998"
	method="post">
	<div id= querylist style='display:block;'>   
		<table width=97% border=0 cellspacing=0 cellpadding=0> 
       		<tr> 
       		    <script> function createOption(optList){ if(optList==undefined||optList==null ||optList.length==0) return; var htmlStr =''; for(var i=0; i<optList.length;i++){ var opt = optList[i]; htmlStr += '<option value ='+opt+'>'+opt+'</option>' } return htmlStr; } function checkDef(def){ if(def.indexOf('|')<0||def==undefined ||def==null) alert('������Ĳ˵�ѡ���ʽ���ԣ�'); } </script>
 				<td nowrap=nowrap style = 'width:7%'>�û�����</td>
  				<td nowrap=nowrap style = 'width:17%'>
  				    <input type="text" id= "user_code"  style='width:170px'>
  				</td> 
  				<td nowrap=nowrap style = 'width:7%'>�û�����</td>
  				<td nowrap=nowrap style = 'width:17%'>
  				    <input type="text" id= "user_name"  style='width:170px'>
  				</td> 
				<td nowrap=nowrap id='td_organtype_1' style = 'width:7%'>��������</td>
				<td nowrap=nowrap id='td_organtype_2' style = 'width:17%'>
					<select name=organtype id=organtype onchange="clearOranid()" style="width:170px;">
						    <option value="">
								&nbsp;
							</option>
							<c:forEach items="${organTypeMap}" var="entry">
								<option value="<c:out value='${entry.key}' />" <c:if test="${userViewDTO.organtype eq entry.key}"> selected </c:if> >
									<c:out value="${entry.value}" />
								</option>
							</c:forEach>
					</select>				
			   </td> 
			  <td nowrap=nowrap id='td_organcode_1' style = 'width:5%'>����</td>
			  <td nowrap=nowrap id='td_organcode_2' style = 'width:17%'>
				  <input style='width:170px' id="bdgagency" name="bdgagency" type=text class=text_pop readonly onclick='selectOrgan(this)' />
				  <button style='margin-left:8px;' onclick='selectOrgan(this.form.bdgagency)'></button>
				  <img align=middle type ='image' value='���' src='/images/done_btn/clear_qry2.gif' onclick='clearInputRule("bdgagency");clearInput(document.getElementById("bdgagency"));'>
			  </td> 
			</tr>
  		</table> 
  </div>
  <input type="hidden" name="allflag"/>
  <input type="hidden" name="totalrows" />
  <input type="hidden" name="totalpages" />
  <input type="hidden" name="rows"/>
  <input type="hidden" name="currpage" value="1"/>
  <script> ExForm($('queryform'));  function addQueryFormInput(){ var obj; return true; }
	 function queryCheckIdata(){return true;}
	 function clearInputRule(element){ 
	 } 
	 function clearValueofIsDataSouce(){ var obj;} 
  </script> 
<input type='hidden' name='fromquery' value='yes'/><input type='hidden'id='isQuery' name='isQuery' value='yes'/><script> ExForm($('queryform')); </script> 
<script> JQ(document).ready(function() {loadselectquery();});  </script> 
<script> var programtreetype = 0;</script>


</form>

  <div>
	<form name="mainListForm" id="mainListForm" action="#" method="post">
		<input name="selectedbillids" id="selectedbillids" type="hidden"
			value="">
			<input type ="hidden" name = "usercodes" id="usercodes" value="">
			<input name="gcode" id="gcode" type="hidden"
			value="<%= request.getAttribute("gcode") %>">
		<div id="form_table_title">
			<ul>
				<li class="top">
					<div>�����û��飨<%=gcode %>-<%=gname %>���û�</div>
				</li>
				<li><div id ="tmainpaginationdiv" style="color:#000000 ; margin-right:5px; height:23px;">
					<img id='img_row2column_tmainedit_table' src='/images/done_btn/edit_style.gif' style='float:left;margin-right:5px;cursor:pointer;'
						onclick="doShowEditSimpleWithTitle('tmain','edit_table',4,this)" title='��ת��' />
					 <img id='img_showNextRow_tmainedit_table' src='/images/done_btn/bottom_c.gif' title='�·�' style='float:left;cursor:pointer;margin-right:5px;' 
					 	onclick="showNextRow('tmain','edit_table',false,'null','null')"/>
					<img id='img_showBeforRow_tmainedit_table' src='/images/done_btn/top_c.gif' title='�Ϸ�' style='float:left;cursor:pointer;' 
						onclick="showBeforRow('tmain','edit_table',false,'null','null')"/>
					<script type='text/javascript' src='/js/row2column.js'></script>
					<a id='pageTagDiv' ></a></div>
				</li>
			</ul>
		</div>
		<!--�뱣����div��a��ǩ -->		
		<div id='edit_table' style='display:none;padding:0;margin:0;'></div>
		<div id="containerline20" style="display: block;">
			<div id=tmain_div style='position:relative;behavior:url(#default#userData);height:100%;width:100%;'> </div>
	 	</div>
	</form>
</div>
  <%
  //String usergroup=(String)request.getAttribute("usergroup");
  //String departments=(String)request.getAttribute("departments");
  String unifiedUsers=(String)request.getAttribute("unifiedUsers");
  String usercodes=(String)request.getAttribute("usercodes");
   %>
<script>
 //document.getElementById('edittable').style.display='none';
//��������
col = createColumnConfig();
col.id = "gname";
col.name = "gname";
col.type = "S";
col.title = "������";
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "gcode";
col.name = "gcode";
col.type = "S";
col.title = "�����";
ColumnConfig[col.id.toLowerCase()]=col;


col = createColumnConfig();
col.id = "usercode";
col.name = "usercode";
col.type = "S";
col.title = "�û�����";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null ){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}	
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "name";
col.name = "name";
col.type = "S";
col.title = "�û�����";
col.show = function(rownum,value,row,tdobj,datatable){
	if(value != null ){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}	
}
ColumnConfig[col.id.toLowerCase()]=col;
col = createColumnConfig();
col.id = "departmentcode";
col.name = "departmentcode";
col.type = "S";
col.title = "���ű���";
col.show = function(rownum,value,row,tdobj,datatable){
if(value != null ){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;
col = createColumnConfig();
col.id = "departmentname";
col.name = "departmentname";
col.type = "S";
col.title = "��������";
col.show = function(rownum,value,row,tdobj,datatable){
if(value != null ){
		tdobj.innerHTML = value;
	} else {
		tdobj.innerHTML = "";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;
    var userinfo=<%=unifiedUsers%>;
	tmain =new dataTable();
	tmain.parent = document.getElementById('tmain_div');
	tmain.setTableHead(["checkbox","usercode","name","departmentcode","departmentname"]);
	tmain.data = userinfo; 
	tmain.show();
	//��ѯ
	function selectByCode(){
		var code = document.getElementById('user_code').value;
		var name = document.getElementById('user_name').value;
		var organtype = document.getElementById('organtype').value;
		var bdgagency = document.getElementById('bdgagency').value;
		var arr = new Array();
		for(var i=0;i<userinfo.length;i++){
			if(code != "" ){
				if(userinfo[i].usercode.indexOf(code)==-1&&userinfo[i].usercode.indexOf(code.toUpperCase())==-1){
					continue;
				}
			}
			if(name != "" ){
				if(userinfo[i].name.indexOf(name)==-1&&userinfo[i].name.indexOf(name.toUpperCase())==-1){
					continue;
				}
			}
			if(organtype != ""){
	   			if(null == userinfo[i].organtype || organtype.indexOf(userinfo[i].organtype) == -1){
	   				continue;
	   			}
   			}
			if(bdgagency != ""){
	   			if(null == userinfo[i].departmentname || bdgagency.indexOf(userinfo[i].departmentname) == -1){
	   				continue;
	   			}
   			}
   			arr.push(userinfo[i]);
		}
		tmain.data=arr;
		tmain.show();
	}
	
	//����
	function back(){
		var submenuid = '<c:out value="${param.submenu}"/>';
		var mainmenu = '<c:out value="${param.mainmenu}"/>';
		var url = "<%=request.getContextPath()%>/portal/usergroup/query.do?mainmenu="+mainmenu+"&submenu="+ submenuid;
		window.location.href = url;
	}

    //����
	function selectByCode_All(){
		var formObject = $("mainListForm");	
		clearFormInputAll($('queryform'));
		var submenuid = '<c:out value="${param.submenu}"/>';
		var mainmenu = '<c:out value="${param.mainmenu}"/>';
		selectByCode();
		if(tmain!=null && tmain.data !=null){			
			var rows = tmain.getSelectedRow();
			var usercodes = "";
			for(i = 0 ;i<rows.length;i++){
				if(i>0){
					usercodes = usercodes +",";
				}
				usercodes = usercodes + rows[i].usercode;
			}
			show();
			document.getElementById("usercodes").value = usercodes;			
	    
	    	formObject.action = "<%=request.getContextPath()%>/portal/usergroup/designusersave.do?mainmenu="+mainmenu+"&submenu="+submenuid;
			formObject.submit();
		}	
			
    }
</script>
