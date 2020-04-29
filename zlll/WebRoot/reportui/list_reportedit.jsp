<%@ page contentType="text/html; charset=GBK"%>
<jsp:directive.page import="java.util.Map" />
<jsp:directive.page import="gov.mof.fasp.ca.user.UserDTO" />
<jsp:directive.page
	import="gov.mof.fasp.ifmis.system.report.dto.ReportTypeTreeView" />
<jsp:directive.page import="java.util.List" />
<jsp:directive.page import="java.util.Set" />
<jsp:directive.page import="java.util.Iterator" />
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<link type="text/css" rel="stylesheet"
	href="<%=request.getContextPath()%>/style/dtree.css" />
<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/dtree.js"></script>
<script src="<%=request.getContextPath()%>/js/datatable.js"></script>
<style type="text/css">
div#dragbar {
	z-index:99999;
	cursor:col-resize;
	FLOAT: left;
	WIDTH: 5px;
	width:100%;
	text-align: left;
	border : 1px solid #CCC;
	border-left :0;
	background: #fafafa url(../images/bg/ktz.gif) no-repeat left center; 
	vertical-align: middle;
}
div#splitter2{
	position: absolute;
 	background: #fafafa url(../images/bg/ktz.gif) no-repeat left center; 
 	z-index:9999;
 	display:none;
 	cursor: col-resize;
 	width : 2px;
 	height:expression(document.body.offsetHeight-window_top.offsetHeight-hidden_top.offsetHeight-query_t.offsetHeight-query_t.offsetHeight-20);
}
#form_table_title22 {
	color:#000000 ; 
	text-align:left; 
	margin-left:10px;
	height:23px; 
	line-height:23px; 
	width:98%; 
	background-image:url(../ifmis_images/bg/form_table_title_bg.gif); 
	background-repeat:repeat-x;
	background-position:left top;
	position: relative;
}
#form_table_title22 li {float:left;}
#form_table_title22 li.top {
	background-image:url( ../ifmis_images/bg/form_table_title_blue_begin1.gif); 
	background-position:left top; 
	background-repeat:no-repeat;
	padding-left:25px;
	padding-right:40px;
	
}
</style>
<script type="text/javascript">
var subTreeWidth = "150px";
try{
	var oldSLeft =  getCookie("customer_subTree_left");
	if(oldSLeft != ""){
		subTreeWidth = oldSLeft;
	}
}catch(e){}
var checkIndex;
var reportids = "";
var rpttypeids = "";
var row = -1;
var userid = "<%=gov.mof.fasp.sec.util.SecureUtil.getCurrentUser().getUserid()%>";
var reporttypeidpram = '<%=request.getParameter("reporttypeid")!=null?"&reporttypeid="+request.getParameter("reporttypeid").toString():""%>';

</script>
<%
	String mainmenu = "";
	String submenu = "";
	java.util.ArrayList reports = null;
	if (request.getParameter("mainmenu") != null) {
		mainmenu = request.getParameter("mainmenu").toString();
	}
	if (request.getParameter("submenu") != null) {
		submenu = request.getParameter("submenu").toString();
	}
	if (request.getSession().getAttribute("reports") != null) {
		reports = (java.util.ArrayList) request.getSession()
		.getAttribute("reports");
	}
%>



<script type="text/javascript">
<!--
	<%
		Map userMap = (Map)request.getAttribute("userMap");
		if(null != userMap)
		{
			Set keySet = userMap.keySet();
			for(Iterator it = keySet.iterator();it.hasNext();)
			{
				String key = (String)it.next();
				UserDTO user = (UserDTO)userMap.get(key);
				if(null != user){
					out.println("var create_"+user.getUserid() + "='"+user.getName()+"';");
				}
			}
		}
	%>
    // 返回ID列复选框勾选的个数
	function getSelectedCount() {
	    var count = 0;
	    for (var i = 0; i < $('queryform').elements.length; i++) {
	        var e = $('queryform').elements[i];
	        if (e.type == "checkbox" && e.checked) {
	            count++;
	        }
	    }
	    return count;
	}
	
    function doAdd(){       
       window.location = "/report/add_reportedit.do?mainmenu="+<%=mainmenu%>+"&submenu="+<%=submenu%>+reporttypeidpram;
    }

    function moreTemplate(){     
			if (getSelectedCount() == 0) {
	        alert("请首先选择1个记录，然后按[更多模板]！");
	        return false;
	    } else if (getSelectedCount() > 1) {
	        alert("只能选择1个记录，然后按[更多模板]！");
	        return false;
	    }
			var submenuid = <c:out value="${submenu}"/>;
			var mainmenu = <c:out value="${param.mainmenu}"/>;
		
			var selectedRow = tmain.getSelectedRow();
      var reportid = selectedRow[0].reportid;
       
      var url = "/report/moretemplate.do?mainmenu="+<%=mainmenu%>+"&submenu="+<%=submenu%>;
      url = url +"&reportid=" + reportid;
      window.location = url;
    }    
		
    function checkData(i){
       var reportid = document.all("reportid"+i).value;
       var rpttypeid = document.all("rpttypeid"+i).value;
       if(document.all("theId"+i).checked == true){
          row = i;
          if(reportids.length > 0){
             reportids = reportids +","+reportid;
             rpttypeids = rpttypeids +","+rpttypeid;
          }else{
             reportids = reportid;
             rpttypeids = rpttypeid;
          }          
       }else{
          if(reportids == reportid){
              reportids = "";
              rpttypeids = "";
          }else{
             if(reportids.indexOf(reportid) == 0){
                reportids = reportids.substring(reportid.length+1,reportids.length);
                rpttypeids = rpttypeids.substring(rpttypeid.length+1,rpttypeids.length);
             }else{
                if(reportids.length - reportids.indexOf(reportid)-1 > reportid.length){
                  reportids = reportids.substring(0,reportids.indexOf(reportid))+reportids.substring(reportids.indexOf(reportid)+1,reportids.length);
                  rpttypeids = rpttypeids.substring(0,rpttypeids.indexOf(reportid))+rpttypeids.substring(rpttypeids.indexOf(reportid)+1,rpttypeids.length);
                }else{
                  reportids = reportids.substring(0,reportids.indexOf(reportid)-1);
                  rpttypeids = rpttypeids.substring(0,rpttypeids.indexOf(rpttypeid)-1);
                }
             }
          }
       }
    }
    
    function doUpdate(){
       if (getSelectedCount() == 0) {
	        alert("请首先选择1个记录，然后按[修改]！");
	        return false;
	    } else if (getSelectedCount() > 1) {
	        alert("只能选择1个记录，然后按[修改]！");
	        return false;
	    }
		var submenuid = <c:out value="${submenu}"/>;
		var mainmenu = <c:out value="${param.mainmenu}"/>;
		
		var selectedRow = tmain.getSelectedRow();
       var reportid = selectedRow[0].reportid;
       
       var url = "/report/update_reportedit.do?mainmenu="+<%=mainmenu%>+"&submenu="+<%=submenu%>;
       url = url +"&reportid=" + reportid+reporttypeidpram;

        window.location = url;
    }
    function doPreview(){
    if (getSelectedCount() == 0) {
	        alert("请首先选择1个记录，然后按[预览报表]！");
	        return false;
	    } else if (getSelectedCount() > 1) {
	        alert("只能选择1个记录，然后按[预览报表]！");
	        return false;
	    }
	    var submenuid = <c:out value="${submenu}"/>;
		var mainmenu = <c:out value="${param.mainmenu}"/>;
		
		var selectedRow = tmain.getSelectedRow();
       var reportcode = selectedRow[0].reportcode;
       var reportspec = selectedRow[0].reportspec;
       var url = "/report/show_result.do?mainmenu="+<%=mainmenu%>+"&submenu="+<%=submenu%>;
       url = url +"&reportcode=" + reportcode+"&reportspec="+reportspec+"&edit=1";
              
      
       var windowWidth = window.screen.availwidth;
	   var windowHeight = window.screen.availheight;
	   window.open(url, '_blank','width='+ windowWidth + ',height='+ windowHeight +  ',status=yes,toolbar=no,menubar=no,directories=no,resizable=yes,location=no top=0,left=0' );
    }
    
    function sumbitQuery(){
        window.location = "/report/list_reportedit_find.do?mainmenu="+<%=mainmenu%>+"&submenu="+<%=submenu%>;
    }
    
    
    function doDel(){
      	if (getSelectedCount() < 1) {
		   alert("请选择要删除记录！");
		   return;
		}
		var submenuid = <c:out value="${submenu}"/>;
		var mainmenu = <c:out value="${param.mainmenu}"/>;
		  	
		var selectedRow = tmain.getSelectedRow();
		var reportids = "";
		var rpttypeids = "";
		for(var i = 0; i<selectedRow.length; i++ )
		{
			if(selectedRow[i].reportid == null || "" == selectedRow[i].reportid)
			{
				alert("输入值出错，请刷新页面！");
				return false;
			}else{
				if(reportids == "")
				{
					reportids = selectedRow[i].reportid;
					rpttypeids = selectedRow[i].reporttypeid;
				}else{
					reportids = reportids + ","+ selectedRow[i].reportid;
					rpttypeids = rpttypeids + ","+ selectedRow[i].reporttypeid;
				}
			}
		}
      	window.location = "/report/reportedit_del.do?mainmenu="+<%=mainmenu%>+"&submenu="+<%=submenu%>+"&reportids="+reportids + "&rpttypeids=" + rpttypeids;
    }
    
    function showQuery(){
      	if (getSelectedCount() == 0) {
	        alert("请首先选择1个记录！");
	        return false;
	    } else if (getSelectedCount() > 1) {
	        alert("只能选择1个记录！");
	        return false;
	    }
		var submenuid = <c:out value="${submenu}"/>;
		var mainmenu = <c:out value="${param.mainmenu}"/>;
		
		var selectedRow = tmain.getSelectedRow();
		
		var reportid = selectedRow[0].reportid;
		if(null == reportid || "" == reportid)
		{
			alert("参数错误，请重新刷新页面！");
			return false;
		}
		var url = "/report/list_reportparaset.do?mainmenu="+<%=mainmenu%>+"&submenu="+<%=submenu%>+ "&rptid=" + reportid;
		window.location = url;
    }
	function download(){
		if (getSelectedCount() == 0) {
			alert("请首先选择1个记录！");
			return false;
		} else if (getSelectedCount() > 1) {
			alert("只能选择1个记录！");
			return false;
		}
		var selectedRow = tmain.getSelectedRow();
		var reportid = selectedRow[0].reportid;
		var url = "/report/reportdownload.do?mainmenu="+<%=mainmenu%>+"&submenu="+<%=submenu%>+ "&rptid=" + reportid;
		window.location = url;
	}
    function showParamDef(){
      	if (getSelectedCount() == 0) {
	        alert("请首先选择1个记录！");
	        return false;
	    } else if (getSelectedCount() > 1) {
	        alert("只能选择1个记录！");
	        return false;
	    }
		var submenuid = <c:out value="${submenu}"/>;
		var mainmenu = <c:out value="${param.mainmenu}"/>;
		
		var selectedRow = tmain.getSelectedRow();
		
		var reportid = selectedRow[0].reportid;
       	if(null == reportid || "" == reportid)
		{
			alert("参数错误，请重新刷新页面！");
			return false;
		}
		var url = "/report/list_reportparadef.do?mainmenu="+<%=mainmenu%>+"&submenu="+<%=submenu%> + "&rptid=" + reportid;
		window.location = url;
    }
    
    function showResponse(request){
	    eval("var reporttypes = " + request.responseText);
    }
        
//-->
</script>

<div id="query_t">
<!--
	<span><span title="查询" class="query_btn" onclick="sumbitQuery()"
		onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
		onmousedown="doChangeBg1(this)"><a href="#">查询</a> </span> </span>
	<span><span title="清除查询条件" class="clear_btn" onclick=""
		onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
		onmousedown="doChangeBg1(this)"><a href="#">清除查询条件</a> </span> </span>
	<span><span title="隐藏查询条件" class="hidden_btn" onclick=""
		onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
		onmousedown="doChangeBg1(this)"><a href="#">隐藏查询条件</a> </span><span>｜</span>
-->
		<span><span title="新增" class="add_btn" onclick="doAdd()"
			onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
			onmousedown="doChangeBg1(this)"><a href="#">新增</a> </span> </span>
			 <span><span
			title="修改" class="mod_btn" onclick="doUpdate()"
			onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
			onmousedown="doChangeBg1(this)"><a href="#">修改</a> </span> </span> <span><span
			title="删除" class="del_btn" onclick="doDel()"
			onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
			onmousedown="doChangeBg1(this)"><a href="#">删除</a> </span><span>｜</span>
	</span> </span>
	<span><span title="预览报表" class="queryEle_btn" onclick="doPreview()"
		onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
		onmousedown="doChangeBg1(this)"><a href="#">预览报表</a> </span> </span>
	<span><span title="更多模版" class="view_btn" onclick="moreTemplate()" onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#">更多模版</a></span></span>
</div>
<script>
window.onload=function(){
	 if (document.getElementById("main") == null) return;
	 var oSplitter, oTdSplitter, oTdLeft, oTdRight;
	 var posTdSplitter, posTable,hiddenLeftBar;
	 var sStart = false;
	 var iPadding = 0;
	 var _doc = document;
	 var iRowPadding = 0;
	 oSplitter = _doc.getElementById("splitter2");
	 oTdSplitter = _doc.getElementById("dragBar");
	 oTdLeft = _doc.getElementById("sub_tree");
	 oTdRight = _doc.getElementById("main_area");
	 oSplitter.style.height = oTdSplitter.offsetHeight;
	 oSplitter.style.width = oTdSplitter.offsetWidth;
	 bLoaded = true;
	 
	 document.body.attachEvent("onmouseup", function(event) {
			        if (sStart == true) {
			            oSplitter.style.display = "none";
			    		var oldbottom = oTdLeft.getBoundingClientRect().right;
						var varh = oTdLeft.offsetWidth + event.clientX - oldbottom;
						if (Math.abs(event.clientX - oldbottom) > 5) {
									if (varh < 100){
										varh = 100;
									}else if(varh>280){
										varh = 260;
									}
									oTdLeft.style.width = varh + 'px';
						}
						 setCookie("customer_subTree_left",oTdLeft.style.width,1000000);
			            if (oSplitter.releaseCapture) oSplitter.releaseCapture();
			            sStart = false;
						Ext.lt.layout.doLayout();
			        }
			    });
	 document.body.attachEvent("onmousemove", function(event) {
			           oSplitter.style.left = event.clientX +iRowPadding;
			    });
	  document.getElementById("dragBar").attachEvent("onmousedown",function(event){
			var posTdSplitter = oTdSplitter.getBoundingClientRect().left-oTdLeft.getBoundingClientRect().left;
			iRowPadding = posTdSplitter - event.clientX; 
	    			oSplitter.style.cursor = "col-resize";
	    	        oSplitter.style.left = posTdSplitter+10;
	    	        oSplitter.style.top = 65;
	    	        oSplitter.style.display = "block";
	    	        if (oSplitter.setCapture)
						oSplitter.setCapture();
	    	        sStart = true;
	    	    });
}
</script>
<form id=queryform action="#" method="post">
<span  style="overflow:hidden;">
<!-- InstanceBeginEditable name="EditRegion8" -->
    <div id="sub_tree" style="display:inline;width:150px;float:left; margin-left:5px; margin-top:10px;height:expression(document.body.offsetHeight-window_top.offsetHeight-hidden_top.offsetHeight-query_t.offsetHeight-query_t.offsetHeight-20); overflow:auto; border:#8BA3DA 1px solid; ">
					<script type="text/javascript">
					document.getElementById("sub_tree").style.width =subTreeWidth; //或者用expression 貌似IE8不支持
					d = new dTree('d','/images/dtree/');
					<%
						String url = "/report/list_reportedit_find.do?mainmenu="+mainmenu+"&submenu="+submenu;
					%>
					d.add(0,-1,'');
					<%
					List viewLists = (java.util.List) request.getAttribute("viewLists");
					if(null != viewLists)
					{
						StringBuffer strExcute = new StringBuffer();
						ReportTypeTreeView.showTree(viewLists,0,url,strExcute);
						out.print(strExcute.toString());
					}
					%>
					document.write(d);
					</script>
	</div>
	<div id="dragbar" title="拖动调整宽度"  style="display:block;margin-top:10px; overflow:hidden;width:3px;height:expression(document.body.offsetHeight-window_top.offsetHeight-hidden_top.offsetHeight-query_t.offsetHeight-query_t.offsetHeight-20);">
  <div id="splitter2"></div>
    </div>
	 <div id="main_area" layout="{h:{fit:true},w:{fit:'auto'}}" style="float:left;width:expression(this.offsetParent.offsetWidth-180);">
	
		<div id="form_table_title22" style=" margin-top:10px;">
			<ul>
				<li class="top" >
					<div style="">
						报表模板定义
					</div>
				</li>
			</ul>
		</div>				
		<div id="containerline15" style="">
			<div id='tmain_div'
				style='position:relative;height:expression(this.offsetParent.offsetHeight-42);width:100%;'></div>
		</div>
		<div id="form_table_title22" style=" margin-top:1px;">
			<ul>
				<li class="top" >
					<div style="">
						报表说明
					</div>
				</li>
			</ul>
		</div>				
		<div style="border:1px #8ba3da solid;height:150px;width:98%;margin-left:10px;">
			<span id='rptremark'></span>
		</div>
	</div></span>
<script type="text/javascript">
	col = createColumnConfig();
	col.id = "reportcode";
	col.name = "reportcode";
	col.type = "S";
	col.title = "报表编码";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["reportcode"] != null && value != null){
		  tdobj.innerHTML = value;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "reportspec";
	col.name = "reportspec";
	col.type = "S";
	col.title = "报表名称";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["reportspec"] != null && value != null){
		  tdobj.innerHTML = value;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "rptversion";
	col.name = "rptversion";
	col.type = "S";
	col.title = "报表版本";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["rptversion"] != null && value != null){
		  tdobj.innerHTML = value;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "amtunit";
	col.name = "amtunit";
	col.type = "S";
	col.title = "金额单位";
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["amtunit"] != null && value != null){
		  tdobj.innerHTML = value;
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
		if(row["createdate"] != null && value != null){
		  var dateObject = new Date(value); 
		  tdobj.innerHTML = eval(dateObject.getYear())+"-"+eval(dateObject.getMonth()+1)+"-"+dateObject.getDate();
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "creater";
	col.name = "creater";
	col.type = "S";
	col.title = "创建人";
	col.show = function(rownum,value,row,tdobj,datatable){
		
		if(row["creater"] != null && value != null){
		  eval("var create_name = create_"+row["creater"]);
		  tdobj.innerHTML = create_name;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "query";
	col.name = "query";
	col.type = "S";
	col.title = "查询条件";
	col.show = function(rownum,value,row,tdobj,datatable){
		  tdobj.innerHTML = "<img src='../../images/actions/query.gif' alt='查询条件' onclick='showQuery();' />";
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "canshu";
	col.name = "canshu";
	col.type = "S";
	col.title = "参数定义";
	col.show = function(rownum,value,row,tdobj,datatable){
		  tdobj.innerHTML = "<img src='../../images/actions/canshu.gif' alt='参数定义' onclick='showParamDef();' />";
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "download";
	col.name = "download";
	col.type = "S";
	col.title = "下载";
	col.show = function(rownum,value,row,tdobj,datatable){
		  tdobj.innerHTML = "<img src='../../images/actions/download.gif' alt='下载' onclick='download();' />";
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	var tmain =new dataTable();
	tmain.parent = document.getElementById('tmain_div');
	tmain.setTableHead(["serial","checkbox","reportcode","reportspec","query","canshu","download","rptversion","amtunit","createdate","creater"]);
	<%
		String json = (String)request.getAttribute("json");
		if(null == json || "".equals(json)){
			out.println("tmain.data = new Array();\n");
		}else{
			out.println("tmain.data = "+ json);
		}
	%>
	tmain.onrowclick=function(row){
		if(typeof(row.remark)!="undefined"){
			document.all.rptremark.innerHTML=row.remark;
		}else{
			document.all.rptremark.innerHTML="";
		}
	}
	tmain.show();
</script>

</form>