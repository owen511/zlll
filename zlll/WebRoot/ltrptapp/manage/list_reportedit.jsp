<%@ page contentType="text/html; charset=GBK"%>
<jsp:directive.page import="java.util.Map,gov.mof.fasp.SysConfig" />
<jsp:directive.page import="gov.mof.fasp.ca.user.UserDTO,gov.mof.fasp.sec.util.SecureUtil" />
<jsp:directive.page
	import="gov.mof.fasp.ifmis.ltrptapp.manage.LTReportTypeTreeView" />
<jsp:directive.page
	import="com.longtu.rpt.fm.rpt.rptmanager.dto.LtReportTypeDTO" />
<jsp:directive.page import="java.util.List" />
<jsp:directive.page import="java.util.Set" />
<jsp:directive.page import="java.util.Iterator" />
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<link type="text/css" rel="stylesheet" href="../../style/style.css" />
<link type="text/css" rel="stylesheet"
	href="<%=request.getContextPath()%>/style/dtree.css" />
<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/dtree.js"></script>
<script src="<%=request.getContextPath()%>/js/datatable.js"></script>
<!-- 马德滔  2012-7-23  修改 -->
<OBJECT
	  classid="clsid:9252769C-08EF-4E3A-9E04-490D76C0C832"
	  codebase="AppCaller.cab#version=1,1,0,0"
	  width="0"
	  height="0"
	  visible="0" 
	  id="JASPERAPP"
>
    <param name="Visible" value="0">
    <param name="Enabled" value="-1">
    <param name="ParentBackground" value="0">
    <param name="DoubleBuffered" value="0">
    <param name="HideBar" value="0">
</OBJECT>

<script language="text/javascript">
  AppCaller.initIE();
</script>
<script type="text/javascript">
var checkIndex;
var reportids = "";
var rpttypeids = "";
var row = -1;
var userid = "<%=gov.mof.fasp.sec.util.SecureUtil.getCurrentUser()
							.getUserid()%>";
var currenRow ;

//套打参数设置
var jServerName = "<%=request.getServerName()%>";
var jServerPort = "<%=request.getServerPort()%>";
var jPath = "<%=request.getContextPath()%>";

var jUsercode = "<%=gov.mof.fasp.sec.util.SecureUtil.getCurrentUser().getCode()%>";
var jPassword = "<%=gov.mof.fasp.sec.util.SecureUtil.getCurrentUser().getPassword()%>";
var jDatasource = "<%=gov.mof.fasp.sec.util.SecureUtil.getUserSelectYear()%>";

var ltireportArgs = "-J-DLongtuServer="+jServerName+"&"+jServerPort+"&"+jPath;
ltireportArgs = ltireportArgs + "  "+"-J-DLongtuLogin="+jUsercode+"&"+jPassword+"&"+jDatasource;
ltireportArgs = ltireportArgs + "  "+"-J-DLongtuReport=";
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
	String reporttypeid = request.getParameter("reporttypeid");
	if(reporttypeid==null){
		reporttypeid = "0";
	}
	String engine = request.getParameter("engine");
	if(engine==null){
		engine = "1";
	}
 
 
    

    
    
%>



<script type="text/javascript">
	
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


		Map rptTypeTypeMap = (Map)request.getAttribute("rptTypeTypeMap");
		if(null != rptTypeTypeMap)
		{
			Set keySet = rptTypeTypeMap.keySet();
			for(Iterator it = keySet.iterator();it.hasNext();)
			{
				Integer key = (Integer)it.next();
				LtReportTypeDTO rpttypedto = (LtReportTypeDTO)rptTypeTypeMap.get(key);
				if(null != rpttypedto){
					out.println("var reporttypename_"+key + "='"+rpttypedto.getReporttypename()+"';");
				}
			}
		}
	%>
	
	var engine=<%=engine%>;
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
       var reporttypeid = getCurRptTypeId();
       if (!isLeaf(reporttypeid)){
         alert("请先选择一个末级报表分类！");
         return;
       }
                
       window.location = "/ltrptapp/manage/add_reportedit.do?mainmenu="+<%=mainmenu%>+"&submenu="+<%=submenu%>+"&reporttypeid="+reporttypeid+"&engine="+<%=engine%>;
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
       
       var url = "/ltrptapp/manage/update_reportedit.do?mainmenu="+<%=mainmenu%>+"&submenu="+<%=submenu%>;
       url = url +"&reportid=" + reportid+"&engine="+<%=engine%>;

        window.location = url;
    }
    function doPreview(){
      if (getSelectedCount() == 0) {
	        alert("请首先选择1个记录，然后按[查看报表]！");
	        return false;
	  } else if (getSelectedCount() > 1) {
	        alert("只能选择1个记录，然后按[查看报表]！");
	        return false;
	  }
	  var selectedRow = tmain.getSelectedRow();
	  openOCX('RPT',selectedRow[0].reportid,1,"");	    
    }
    
    function editReport(){
      if (getSelectedCount() == 0) {
	        alert("请首先选择1个记录，然后按[编辑报表]！");
	        return false;
	  } else if (getSelectedCount() > 1) {
	        alert("只能选择1个记录，然后按[编辑报表]！");
	        return false;
	  }
	  var selectedRow = tmain.getSelectedRow();
	  if (engine==2)
	  {
		  //openOCX('RPT_jasper',selectedRow[0].reportid,0,ltireportArgs);
		  //马德滔  2012-7-23  修改
		  JASPERAPP.callApp("RPT_jasper",ltireportArgs+selectedRow[0].reportid+"&noreportcode");
	  }else{
		  openOCX('RPT',selectedRow[0].reportid,0,"");
	  }
	  
    }
    
    

    function sumbitQuery(){
        window.location = "/ltrptapp/manage/list_reportedit_find.do?mainmenu="+<%=mainmenu%>+"&submenu="+<%=submenu%>+"&engine="+<%=engine%>;
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
      	window.location = "/ltrptapp/manage/reportedit_del.do?mainmenu="+<%=mainmenu%>+"&submenu="+<%=submenu%>+"&reportids="+reportids + "&rpttypeids=" + rpttypeids+"&reporttypeid="+<%=reporttypeid%>+"&engine="+<%=engine%>;
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
		var url = "/ltrptapp/manage/list_reportparaset.do?mainmenu="+<%=mainmenu%>+"&submenu="+<%=submenu%>+ "&rptid=" + reportid+"&reporttypeid="+selectedRow[0].reporttypeid+"&engine="+<%=engine%>;
		window.location = url;
    }

    
    function showResponse(request){
	    eval("var reporttypes = " + request.responseText);
    }
    
    function mainclick(row){
       currenRow = row;
	}
	
	

</script>

<div id="query_t">
	<span><span title="查询" class="query_btn" onclick="sumbitQuery()"
		onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
		onmousedown="doChangeBg1(this)"><a href="#">查询</a> </span> </span>
	<!--
	<span><span title="清除查询条件" class="clear_btn" onclick=""
		onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
		onmousedown="doChangeBg1(this)"><a href="#">清除查询条件</a> </span> </span>
	<span><span title="隐藏查询条件" class="hidden_btn" onclick=""
		onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
		onmousedown="doChangeBg1(this)"><a href="#">隐藏查询条件</a> </span><span>｜</span>
     -->

		<span><span title="新增" class="add_btn" onclick="doAdd()"
			onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
			onmousedown="doChangeBg1(this)"><a href="#">新增</a> </span> </span> <span><span
			title="修改" class="mod_btn" onclick="doUpdate()"
			onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
			onmousedown="doChangeBg1(this)"><a href="#">修改</a> </span> </span> <span><span
			title="删除" class="del_btn" onclick="doDel()"
			onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
			onmousedown="doChangeBg1(this)"><a href="#">删除</a> </span><span>｜</span>
	</span> </span>
	<%if ("1".equals(engine)) {%>
	<span ><span title="查看报表" class="queryEle_btn" onclick="doPreview()"
		onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
		onmousedown="doChangeBg1(this)"><a href="#">查看报表</a> </span> </span>
	<div id="editReportDiv"  >
		<%}%>
	<span ><span title="编辑报表" class="template_btn" onclick="editReport()"
		onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
		onmousedown="doChangeBg1(this)"><a href="#">编辑报表</a> </span> </span>
	

</div>
	<!--
	<span><span title="更多模版" class="view_btn" onclick="moreTemplate()" onmouseover="doChangBg(this)" onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a href="#">更多模版</a></span></span>
	-->
</div>

<form id=queryform action="#" method="post">
<span>
<!-- InstanceBeginEditable name="EditRegion8" -->
	<div id="sub_tree"	style="display:inline;width:150px;float:left; margin-left:5px; margin-top:10px;height:expression(document.body.offsetHeight-window_top.offsetHeight-hidden_top.offsetHeight-query_t.offsetHeight-query_t.offsetHeight-20); overflow:auto; border:#8BA3DA 1px solid; ">
					<script type="text/javascript">
					d = new dTree('d','/images/dtree/');
					<%if(reporttypeid=="0"){%>
					    d.clearCookie();
					<%}%>
					<%
						//String url = "/ltrptapp/manage/list_reportedit_find.do?mainmenu="+mainmenu+"&submenu="+submenu;
						String url = "javascript:clickRptType(d)";
					%>
					d.add(0,-1,'');
					<%
					List viewLists = (java.util.List) request.getAttribute("viewLists");
					if(null != viewLists)
					{
						StringBuffer strExcute = new StringBuffer();
						LTReportTypeTreeView.showTree(viewLists,0,url,strExcute);
						out.print(strExcute.toString());
					}
					%>
					document.write(d);
					d.openAll();
					</script>
	</div>
	<div  style="width:expression(this.offsetParent.offsetWidth-180);">
		<div id="form_table_title" style=" margin-top:10px;">
			<ul>
				<li class="top" >
					<div style="">
						报表模板定义
					</div>
				</li>
			</ul>
		</div>				
		<div id="containerline19" style="">
			<div id='tmain_div'
				style='position:relative;height:expression(this.offsetParent.offsetHeight-42);width:100%;'></div>
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
	col.id = "reporttypeid";
	col.name = "reporttypeid";
	col.type = "S";
	col.title = "报表类型";
	col.show = function(rownum,value,row,tdobj,datatable){
		
		if(row["reporttypeid"] != null && value != null){
		  eval("var temp_reporttypename = reporttypename_"+row["reporttypeid"]);
		  tdobj.innerHTML = temp_reporttypename;
		} else {
		  tdobj.innerHTML = "";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;

	col = createColumnConfig();
	col.id = "ispublic";
	col.name = "ispublic";
	col.type = "S";
	col.title = "公用报表";
	col.show = function(rownum,value,row,tdobj,datatable){
		   if(row["ispublic"] != null  && row["ispublic"]=="1"){
		       tdobj.innerHTML = "是";					   
		   }else{
		       tdobj.innerHTML = "否";
		   }						
	}
	ColumnConfig[col.id.toLowerCase()]=col;
	
	col = createColumnConfig();
	col.id = "showmenu";
	col.name = "showmenu";
	col.type = "S";
	col.title = "显示菜单";
	col.show = function(rownum,value,row,tdobj,datatable){
		   if(row["showmenu"] != null  && row["showmenu"]=="1"){
		       tdobj.innerHTML = "是";					   
		   }else{
		       tdobj.innerHTML = "否";
		   }						
	}
	ColumnConfig[col.id.toLowerCase()]=col;

	var tmain =new dataTable();

	tmain.parent = document.getElementById('tmain_div');
//	tmain.onrowclick=mainclick;

	tmain.setTableHead(["serial","checkbox","reportcode","reportspec","reporttypeid","creater","ispublic","showmenu"]);
	
	<%
		String json = (String)request.getAttribute("json");
		if(null == json || "".equals(json)){
			out.println("var rptdata = new Array();\n");
		}else{
			out.println("var rptdata = "+ json);
		}
	%>
	if(<%=reporttypeid%>==0){
		tmain.data = rptdata;
		tmain.show();
	}else{
		clickRptType(d);
	}
</script>

</form>
