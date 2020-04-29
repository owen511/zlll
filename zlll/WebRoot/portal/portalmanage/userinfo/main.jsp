<%@page language="java" contentType="text/html; charset=GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<script type="text/javascript">
function clrselect(){
	document.getElementById('code').value="";
	document.getElementById('name').value="";
}
var userinfolist;
function searchUserInfoAfter(resp){
	userinfolist=eval(resp.responseText); 
	setUserInfoData(1);
}
function setUserInfoData(pgint){

	var pgsize=document.getElementById("setpage_size").value;
	var arr=new Array();
	try{
		if(isNaN(pgsize)||pgsize<0){
			document.getElementById("setpage_size").value=pgsizet;
			return ;
		}
		if(userinfolist.size()<pgsize*(pgint-1)){
			pgint = parseInt(userinfolist.size()/pgsize);
			if(pgint%pgsize!=0){
				pgint=pgint+1;
			}
		}
		pgsizet=pgsize;
	}catch(e){
		document.getElementById("setpage_size").value=pgsizet;
		return ;
	}
	for(var i=0;i<pgsize;i++){
		if(pgsize*(pgint-1)+i<userinfolist.size()){
			arr[i]=userinfolist[pgsize*(pgint-1)+i];
		}
	}
	tmain.data = arr;
   	tmain.show();
   	setPage(pgint,pgsize);
}
function setPage(pgint,pgsize){
	tmain.page_pageSize = pgsize;
	tmain.page_page=pgint;
	tmain.page_totalRecord = userinfolist.size();
	tmain.page_pageCount = parseInt(tmain.page_totalRecord/tmain.page_pageSize);
	if(tmain.page_totalRecord%tmain.page_pageSize!=0){
		tmain.page_pageCount=tmain.page_pageCount+1;	
	}
	tmain.page_hasPreviousPage = pgint==1?false:true;
	tmain.page_hasNextPage = pgint==tmain.page_pageCount?false:true;
	tmain.page_previousPage = pgint-1;
	tmain.page_nextPage = pgint+1;
	tmain.paginationdiv = document.getElementById('paginationdiv');
	tmain.createPagination();
	tmain.exportsql = "";
}


  //动态创建script对象
function createScript(param,funct){
   new Ajax.Request("<%=request.getContextPath()%>/portal/userinfo/runsearch.do", 
	     	{	
		   		parameters : param,
		   		method: 'post', 
		   		onComplete : funct,
		   		requestHeaders: {Accept: 'application/json'},
		   		onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
		        }
			}); 
}
var year =2010;
var path_ip;
function search(){
	var valuecode=document.getElementById('area').valuecode;
	if(valuecode==null||valuecode==''){
		alert('请选择财政地区');
		return ;
	}else{
		var values=valuecode.split(',');
		if(values[2]==null||values[2]=='null'||values[2]==''){
			values[2]=<%=request.getAttribute("year")%>;
		}
		path_ip=values[1];
		year=values[2];
	}
	
	var url="http://"+path_ip+"/userinfo.do&year="+year;
	var code = document.getElementById("code").value;
	if(code!=null&&code.length>0){
		url=url+"&code="+code;
	}
	var name = document.getElementById("name").value;
	if(name!=null&&name.length>0){
		url=url+"&name="+name;
	}
	createScript('action='+url,searchUserInfoAfter);
}
// 返回ID列复选框勾选的个数
function getSelectedCount() {
    var count = 0;
    for (var i = 0; i < $('mainListForm').elements.length; i++) {
        var e = $('mainListForm').elements[i];
        if (e.type == "radio" && e.checked) {
            count++;
        }
    }
    return count;
}
function datapermission(){
	if (getSelectedCount() == 0) {
        alert("请首先选择1个记录，然后按[数据权限]！");
        return false;
    } else if (getSelectedCount() > 1) {
        alert("只能选择1个记录，然后按[数据权限]！");
        return false;
    }
	var selectedRow = tmain.getSelectedRow();
    var userid = selectedRow[0].userid;
	
    if(userid == null || "" == userid)
    {
    	alert("输入值出错，请刷新页面！");
    	return false;
    }
   
    var url="action=http://"+path_ip+"/queryDataRight.do&year="+year+"&userid="+ userid;
    var features = "top=150,left=50,width=750,height=500,scrollbars=no,resizable=no";
    window.open("<%=request.getContextPath()%>/portal/userinfo/runsearchDataRight.do?"+url, "数据权限", features);
}
</script>

<form id="mainListForm" name="mainListForm" method="post"
	action="<%=request.getContextPath()%>/baseinfo/userinfo/query.do?mainmenu=<c:out value="${mainmenu}"/>&submenu=<c:out value="${submenu}"/>"
	onsubmit="switchValue(this)">
	<div id="query_t">
		<div>
			<span><span title="查询" class="query_btn" onclick="search()"
				onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
				onmousedown="doChangeBg1(this)"><a href="#">查询</a> </span> </span>
			<span><span title="清除查询条件" class="clear_btn" onclick="clrselect();"
				onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
				onmousedown="doChangeBg1(this)"><a href="#">清除查询条件</a> </span> </span>
			<span><span title="隐藏查询条件" class="hidden_btn"
				onclick="doQuery2(this)" onmouseover="doChangBg(this)"
				onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a
					href="#">隐藏查询条件</a> </span><span>｜</span> </span>

			<span><span title="数据权限" class="datapermission_btn"
				onclick="datapermission()" onmouseover="doChangBg(this)"
				onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a
					href="#">数据权限</a> </span> </span>
		</div>
	</div>
	<div id="querylist" style="display:block">
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr>
				<td nowrap="nowrap">
					用户编码
				</td>
				<td nowrap="nowrap">
					<input type="text" name="code" id="code" maxlength="50">
				</td>
				<td nowrap="nowrap">
					用户名称
				</td>
				<td nowrap="nowrap">
					<input type="text" name="name" id="name" maxlength="50">
				</td>
				<td width="10%" nowrap="nowrap">
					财政地区
				</td>
				<td width="20%" nowrap="nowrap">
					<input id="area" name="area" value="" valueid="" valuecode=""
							type=text class=text_pop style="width: 100px" readonly
							onclick='selectMutlElememt(42000000,<c:out value="${submenu}"/>,"5001","area",this,false,"");' />
						<button
							onclick='selectMutlElememt(42000000,<c:out value="${submenu}"/>,"5001","area",document.getElementById("area"),false,"");null'></button>
						<img align=middle src='/images/done_btn/clear_qry2.gif'
							onclick='clearInput(document.getElementById("area"));'>
				</td>
			</tr>
		</table>
	</div>
	<form id="queryform"
		action="<%=request.getContextPath()%>/portal/userinfo/index.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>"
				method="post">
		<ui:queryform formid="queryform" />
	</form>
		<div id="form_table_title">
			<ul>
				<li class="top">
					<div>
						用户信息 
					</div>
				</li>
				
				<li><ui:row2column dataid="tmain" showdivname="edit_table" columnNum= "4"/></li>
			</ul>
		</div>
		<div id='edit_table' style='display:none;padding:0;margin:0;'></div>
		<div id="containerline10" style="display: block;">
			<ui:datatable columndefine="true" id="tmain" tabletype="MainList"  data="json"  showcheckbox="true"/>
		</div>
	<!--请保留此div和a标签 -->
		<script type="text/javascript">
	col = createColumnConfig();
		col.id = "code";
		col.name = "code";
		col.type = "S";
		col.title = "编码";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row!=null && value != null){
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
		col.title = "名称";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row!=null && value != null){
			  tdobj.innerHTML = value;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "userclsid";
		col.name = "userclsid";
		col.type = "S";
		col.title = "组别";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row!=null && row.userclsidStr != null){
			  tdobj.innerHTML = row.userclsidStr;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "organtype";
		col.name = "organtype";
		col.type = "S";
		col.title = "机构类型";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row!=null && row.organtypeStr != null){
			  tdobj.innerHTML = row.organtypeStr;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "organid";
		col.name = "organid";
		col.type = "S";
		col.title = "机构";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row!=null && row.organidStr != null){
			  tdobj.innerHTML = row.organidStr;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "type";
		col.name = "type";
		col.type = "S";
		col.title = "用户类型";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row!=null && row.typeStr != null){
			  tdobj.innerHTML = row.typeStr;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "managerid";
		col.name = "managerid";
		col.type = "S";
		col.title = "管理者";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row!=null && row.manageridStr != null){
			  tdobj.innerHTML = row.manageridStr;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "state";
		col.name = "state";
		col.type = "S";
		col.title = "状态";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row!=null && row.stateStr != null){
			  tdobj.innerHTML = row.stateStr;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "createdate";
		col.name = "createdate";
		col.type = "S";
		col.title = "创建日期";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row!=null && value != null){
			  var dateObject = new Date(value); 
			  tdobj.innerHTML = eval(dateObject.getYear())+"-"+eval(dateObject.getMonth()+1)+"-"+dateObject.getDate();
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "updatedate";
		col.name = "updatedate";
		col.type = "S";
		col.title = "修改日期";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row!=null && value != null){
			  var dateObject = new Date(value); 
			  tdobj.innerHTML = eval(dateObject.getYear())+"-"+eval(dateObject.getMonth()+1)+"-"+dateObject.getDate();
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "overduedate";
		col.name = "overduedate";
		col.type = "S";
		col.title = "过期日期";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row!=null && value != null){
			  var dateObject = new Date(value); 
			  tdobj.innerHTML = eval(dateObject.getYear())+"-"+eval(dateObject.getMonth()+1)+"-"+dateObject.getDate();
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "remark";
		col.name = "remark";
		col.type = "S";
		col.title = "备注";
		col.show = function(rownum,value,row,tdobj,datatable){
			if(row!=null && value != null){
			  tdobj.innerHTML = value;
			} else {
			  tdobj.innerHTML = "";
			}
		}
		ColumnConfig[col.id.toLowerCase()]=col;
		
		function mainclick(row){
			var s = "";
			for(var v in row ){
				s += v+":";
				eval("s += row."+v);
				s += "\n";
			}
		var url="action=http://"+path_ip+"/queryRoleByUser.do&year="+year+"&userid="+ +row.userid;;
		createScript(url,showResponse);
		}
		function showResponse(responseText){
			var userList=eval(responseText.responseText); 
		   	tdetail.data = userList;
		   	tdetail.show();
		}
		tmain =new dataTable();
		tmain.parent = document.getElementById('tmain_div');
		tmain.setTableHead(["radio","serial","code","name","organtype","organid","userclsid","type","managerid","state","createdate","updatedate","overduedate","remark"]);
		tmain.data=new Array();
		tmain.onrowclick = mainclick;
		tmain.checkedOnclick = true;
		tmain.show();
		var pgsizet=document.getElementById("setpage_size").value;
		tmain.gotoPage=function(pgint){
			var page = document.getElementById("page");
	    	page.value = pgint;
	    	setUserInfoData(pgint);
		}
		tmain.submitGotoPage=function(){
			var page = document.getElementById("page");
			if(tmain.checkPage(page.value)){
	    		setUserInfoData(page.value);
	    	}
		}
		</script>
	<div id="form_table_title">
		<ul>
			<li class="top">
				<div>
					角色信息
				</div>
			</li>
		</ul>
	</div>
	<div id="containerline3">
		<div id='tdetail_div'
			style='position:relative;height:expression(this.offsetParent.offsetHeight);width:100%;'></div>
		<script type="text/javascript">
		var tdetail =new dataTable();
		tdetail.parent = document.getElementById('tdetail_div');
		tdetail.setTableHead(["serial","userclsid","code","name"]);
		tdetail.data = new Array();
		tdetail.show();
		</script>
	</div>
</form>
<script type="text/javascript">
<!--
function selectMutlElememt(mainmenu,submenu,vchtypecode,vchfieldcode,backinput,checkflag,elementfilter){
    //wy add 20090923
    /** ganhua 20080304 在打开选择窗口前回调一个方法做某些事情
	  * 如：设置过滤条件，检查联动的其它控件是否选择值
	  * 
	**/
		codeShowFlag=1;
	var selvalue = backinput.valuecode != undefined ? backinput.valuecode : backinput.value;
	window.selvalue = selvalue;
	window.checkflag = checkflag;
	var func = "callBeforeOpenMultElementTree_"+vchfieldcode+"(window)";;
	var notReturn = true;
    try{
        notReturn = eval(func);
	}catch(e){
		//不成功,不管它,当没有实现该方法
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
	var treeyear=<c:out value="${sessionScope.loginacctyear}"/>;
	var url = ROOT_PATH+"/common/tree/openAreaTree.do?year="+treeyear+"&mainmenu="+mainmenu+"&submenu="+submenu+"&vchtypecode="+vchtypecode
		+"&vchfieldcode="+vchfieldcode+"&elementfilter="+elementfilter
		+"&Referer="+refererurl.substring(0,refererurl.indexOf("?"));
		
	//var url = ROOT_PATH+"/common/tree/openAreaTree.do?year=<%=request.getAttribute("year")!=null?request.getAttribute("year").toString().split(";")[0]:""%>&mainmenu="+mainmenu+"&submenu="+submenu+"&vchtypecode="+vchtypecode
	//	+"&vchfieldcode="+vchfieldcode+"&elementfilter="+elementfilter
	//	+"&Referer="+refererurl.substring(0,refererurl.indexOf("?"));
	var result = window.showModalDialog(url,window,"dialogHeight:500px;dialogWidth: 325px;resizable: No; status: No; help:No;");
    //清楚窗体的过滤条件 ganhua 20090509
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
		}
	}
	else
	{
	    if(backinput != null){
	        backinput.value = "";
			backinput.valueid = null;
			backinput.valuecode = "";
	    } 
	 }
	 	codeShowFlag=0;
}
//-->
</script>