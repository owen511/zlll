<%@ page contentType="text/html; charset=GBK"%><%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%><%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%><%
       response.setHeader("Cache-Control","no-cache"); 
       response.setHeader("Pragma","no-cache"); 
       response.setDateHeader("Expires",0); 
    	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ request.getContextPath();
		String styleName ="stylefontS.css";	
		if(session.getAttribute("StyleName")!=null){
		    styleName = (String)session.getAttribute("StyleName");
		}	
%><link rel="stylesheet" type="text/css" href="<%=basePath%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_SKIN%>_style.css" />
<link rel="stylesheet" id="ifmisfontstyle" type="text/css" href="<%=basePath%>/style/<%=styleName %>" />
<link rel="stylesheet" type="text/css" href="<%=basePath%>/style/<%=gov.mof.fasp.ifmis.common.Globals.IFMIS_LOGO%>_logo.css"/>
<link type="text/css" rel="stylesheet"	href="<%=basePath%>/style/jquery.autocomplete.css" />
<script type="text/javascript" src="<%=basePath%>/js/prototype.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/choose.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/tabpage.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/changescroll.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/formatNumber.js"></script>
<script type="text/vbscript" src="<%=basePath%>/js/decode_resource.vbs"></script>
<script type="text/javascript" src="<%=basePath%>/js/ua.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/ftiens4.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/datatable.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/export.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/tbajax.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/template.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/overlib/overlibmws.js" type=text/javascript></SCRIPT>
<script type="text/javascript" src="<%=basePath%>/js/overlib/overlibmws_filter.js" type=text/javascript></SCRIPT>
<script type="text/javascript" src="<%=basePath%>/js/overlib/overlibmws_shadow.js" type=text/javascript></SCRIPT>
<script type="text/javascript" src="<%=basePath%>/js/jquery-1[1].3.1.js"></script>	
<script type="text/javascript" src="<%=basePath%>/js/jquery.autocomplete.js"></script>
<script type="text/javascript" src="<%=basePath%>/js/rightButton.js"></script>
<link rel="stylesheet" id="programstyle" type="text/css" >
<style>
#querylist table tr{
	height:25px;
	line-height:25px;
	font-size:12px
}
#querylist input {
	width:120px;
    height:18px;
	
}
</style>
<script type="text/javascript">
var ROOT_PATH = '<%=basePath%>';
</script>
<script type="text/javascript">

//标志是第一次进入还是查询
var isQuery = <%=request.getParameter("isQuery")%>;

var k = window.dialogArguments;
$("programstyle").href = k.$("ifmisfontstyle").href;
var	filter = "<%=request.getParameter("elementfilter")%>";
var	elementfilter = "<%=request.getParameter("elementfilter")%>";
elementfilter= elementfilter.replace(/bdgagency/g,"itemid");
var	defaultvalue = "<%=request.getParameter("defaultvalue")%>";
var ismutl = top.ismutl;

function query(){
	  $('queryform').action = "<%=request.getContextPath()%>/common/jump/list_program.do"+document.location.search + '&isQuery=true' ;
	  $('queryform').dosubmit();
 }
  
function add(){
     var mainmenu = document.all("hid_mainmenu").value;
     var submenu = document.all("hid_submenu").value;
     var url = "/common/jump/add.do?";
     url = url +"mainmenu="+mainmenu;
     url = url +"&submenu="+submenu;
     window.location.href = url;
}
  
function deleteData(){
   if(tmain.getSelectedRow().length == 0){
		     alert("请先选择要删除的数据！");
			 return;
	 }
	 if(confirm("确定删除选中的数据吗？")){
		    var rows = tmain.getSelectedRow();  
		    var json =  Object.toJSON(rows);
		    var mainmenu = document.all("hid_mainmenu").value;
		    var submenu = document.all("hid_submenu").value;
		    var url = "/common/jump/delete.do?";
		    url = url +"mainmenu="+mainmenu;
		    url = url +"&submenu="+submenu;
		    var reulst = "&json="+json;
		    var myAjax = new Ajax.Request(url,
							   	{
								   	 method: 'post',
								   	 parameters: reulst,
								   	 onComplete : showResponse
								} 
			   				);   
    }
}
  
function modify(){
  if(tmain.getSelectedRow().length == 0){
	     alert("请先选择要修改的数据！");
		 return;
	 }
    var rows = tmain.getSelectedRow();    
    var json =  Object.toJSON(rows);
    var mainmenu = document.all("hid_mainmenu").value;
    var submenu = document.all("hid_submenu").value;
    var url = "/common/jump/update.do?";
    url = url +"mainmenu="+mainmenu;
    url = url +"&submenu="+submenu;
    url = url +"&json="+json;    
    window.location.href = url;          
  }
  
function changeData(){}
function mainclick(row){}
function clear(){}
  
function exportTabExcel(){
     exportExcel(tmain);
}


function showResponse(tr){
		 var id = tr.responseText;
		 if(id!=null&&id!=''){
		    alert(id);
		 }else{
		    window.location.href("<%=request.getContextPath()%>/common/jump/list_program.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>");;  
		 }
}

</script>
<SCRIPT LANGUAGE="JavaScript">
<!--
function arraycopy(datas,start,end){
		var newdata = new Array();
		for(var i=start;i<datas.length&&i<=end;i++){
			newdata[newdata.length]=datas[i];
		}
		return newdata;
}

dataTable.prototype.beforeShow = function(){
		if(this.data == null){
			this.data = new Array();
		}
		if(isQuery == true || top.selectObj.data==null||top.selectObj.data.length==0)return;
		var newdata = new Array();
		newdata = arraycopy(top.selectObj.data,0,top.selectObj.data.length);
		var selLen = newdata.length;
		for(var i=0;i<this.data.length;i++){
			var row = this.data[i];
			
			var isexits = false;
			for(var j=0;j<selLen;j++){
				if(row["itemid"]==newdata[j]["itemid"]){
					isexits = true;
					break;
				}
			}
			if(isexits)continue;
			newdata[newdata.length]=row;
		}
		this.data= newdata;
		
}

function setSelectObj(){
		var data = top.selectObj.data;
		//debugger;
		top.selectObj.id = "";
		top.selectObj.value = "";
		for(var i=0;i<data.length;i++){
			var isaddsplit = top.selectObj.id.length>0?",":"";
			top.selectObj.id += isaddsplit+data[i]["itemid"];
			//判断CODE显示
			if(checkCodeShowFlag("program")){
				top.selectObj.value += isaddsplit+data[i]["code"]+"-"+data[i]["name"];
			} else {
				top.selectObj.value += isaddsplit+data[i]["name"];
			}		
		}
		top.selectObj.value = top.selectObj.value.replace(/,/g,";");
}

function checkboxOnChecked(row,checked){
	if(checked){
		if((","+top.selectObj.id+",").indexOf(","+row["itemid"]+",")==-1){
			top.selectObj.data[top.selectObj.data.length] = row;
		}
	}else{
		var newdatas = new Array();
		var removedatas = new Array();
		var data = top.selectObj.data;
		for(var i=0;i<data.length;i++){
			if(data[i]["itemid"]==row["itemid"]){
				removedatas[removedatas.length] = data[i];
			}
			else {
				newdatas[newdatas.length] = data[i];
			}
		}
		top.selectObj.data = null;
		top.selectObj.data = newdatas;
	}
	 setSelectObj();
}
function radioOnChecked(row){
	top.selectObj.id=row["itemid"];
	top.selectObj.value=row["code"]+"-"+row["name"];
	top.selectObj.data[0] = row;//top.selectObj.data.length++
}

var checkboxshow = function(rownum,value,row,tdobj,datatable){
	var checkbox = null;
	if(typeof(top.selectObj.id)!="undefined"&&(","+top.selectObj.id+",").indexOf(","+row["itemid"]+",")!=-1){
		//debugger;
		row.checked = true;
	}
	if(row.checked == true ||row.checked == "true" || datatable.selectedall){
		checkbox = document.createElement('<input name="" type="checkbox" checked/>');
		if(typeof(checkboxOnChecked)=="function")checkboxOnChecked(row,true);
	}
	else{
		checkbox = document.createElement('<input name="" type="checkbox"/>');
	}
	
	tdobj.appendChild(checkbox);
	
	checkbox.row = row;
	checkbox.datatable = datatable;
	
	checkbox.onclick = function(){
		var datatable = this.datatable
		this.row.checked = this.checked;
		if(!this.checked){
			var inputs = datatable.contentdiv.getElementsByTagName("INPUT");
			
			for(var i=0;i<inputs.length;i++){
				if(inputs[i].name == "allbox"){
					inputs[i].checked = false;
					datatable.selectedall = false;
					break;
				}
			}
		}
		if(typeof(checkboxOnChecked)=="function")checkboxOnChecked(this.row,this.checked);
		this.parentElement.fireEvent("onclick");
		datatable.draw();
	}
}

	// 单选框列设置
col = createColumnConfig();
col.id = "radio";
col.name = "radio";
col.type = "radio";
col.title = '&nbsp;';
col.style = "width:30px";
col.show = function(rownum,value,row,tdobj,datatable){
	if(ismutl=="true"){checkboxshow(rownum,value,row,tdobj,datatable);return;}
	var radiobtn = null;
	if(typeof(top.selectObj.id)!="undefined"&&(";"+top.selectObj.id+";").indexOf(";"+row["itemid"]+";")!=-1){
		row.checked = true;
	}
	if(row.checked == true||row.checked == "true"){
		radiobtn = document.createElement('<input name="" type="radio" checked/>');
		if(typeof(radioOnChecked)=="function")radioOnChecked(row);
		
	}
	else{
		radiobtn = document.createElement('<input name="" type="radio"/>');
	}
	
	tdobj.appendChild(radiobtn);
	radiobtn.row = row;
	row.checkobj = radiobtn;
	radiobtn.datatable = datatable;
	radiobtn.onclick = function(){
		var datatable = this.datatable;
		// 清除选中项
		var selectedrows = datatable.getSelectedRow();
		if(selectedrows.length > 0){
			for(var i=0;i<selectedrows.length;i++){
				selectedrows[i].checked = false;
			}
		}
		// 选中当前行
		this.row.checked = true;
		if(typeof(radioOnChecked)=="function")radioOnChecked(this.row);
		this.parentElement.fireEvent("onclick");
		
		datatable.draw();
	}
}
ColumnConfig[col.id.toLowerCase()]=col;
//获取Code全局变量
		 var codeShowConfigs = new Array();
		 var codeShowConfigs_ =<%=request.getAttribute("CODESHOWCONFIG") %> ;
		 if(codeShowConfigs_ != null){
		   codeShowConfigs = codeShowConfigs_;
		 }
//系统CODE配置参数
		 var codeShowFlag =<%=request.getAttribute("CODESHOWFLAG") %> ;
//-->
</SCRIPT>
<html>
  <HEAD>
	<%
		String mainmenu = request.getParameter("mainmenu");
		String submenu = request.getParameter("submenu");
		String result = null;
		if (request.getAttribute("result") != null)
			result = request.getAttribute("result").toString();
	%>
</HEAD>
	<body>
				<div id="query_t">
					<span><span title="查询" class="query_btn" onclick="query()"
						onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
						onmousedown="doChangeBg1(this)"><a href="#">查询</a>
					</span>
					</span>
					<span><span title="清除查询条件" class="clear_btn" onclick="clearFormInputAll($('queryform'))"
						onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
						onmousedown="doChangeBg1(this)"><a href="#">清除查询条件</a>
					</span>
					</span>
					<span><span title="隐藏查询条件" class="hidden_btn" onclick="doQuery2(this)" onmouseover="doChangBg(this)" onmouseout="doReturn(this)"><a href="#">隐藏查询条件</a></span></span>
					<!-- <span><span title="新增" class="add_btn" onclick="add()"
						onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
						onmousedown="doChangeBg1(this)"><a href="#">新增</a>
					</span>
					</span>
					<span><span title="修改" class="mod_btn" onclick="modify()"
						onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
						onmousedown="doChangeBg1(this)"><a href="#">修改</a>
					</span>
					</span>
					<span><span title="删除" class="del_btn"
						onclick="deleteData()" onmouseover="doChangBg(this)"
						onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a
							href="#">删除</a>
					</span><span>｜</span>
					</span>
				</span>
				 -->
			</div>
		<form id="queryform" name="queryform" method="post"
			action=""  >
				<ui:queryform formid="queryform" />
			</form>
			<div>
				<div id="form_table_title">
					<ul>
						<li class="top">
							<div>
								项目信息
							</div>
						</li>
					    <li> <a id='pageTagDiv' ></a> </li>
					</ul>
				</div>
				<!--请保留此div和a标签 -->
				<div id="containerline18">
				<div id='edit_table' style='display:none;padding:0;margin:0;'></div>
					<ui:datatable id="tmain" tabletype="MainList" data="result"  display="line" showcheckbox="false" showradio="true" columndefine = "true" />
				</div>
				<input type='hidden' name='hid_mainmenu' id='hid_mainmenu'
					value='<%=mainmenu%>' />
				<input type='hidden' name='hid_submenu' id='hid_submenu'
					value='<%=submenu%>' />
	</body>
</html>