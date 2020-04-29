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
	
<OBJECT
	  classid="clsid:A3E8EEE9-E85E-472A-AEB3-EB182A605C62"
	  codebase="AppCaller.cab#version=1,0,0,0"
	  width="0"
	  height="0"
	  visible="0" 
	  id="AppCaller"
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

<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/dtree.js"></script>
<script src="<%=request.getContextPath()%>/js/datatable.js"></script>
<script type="text/javascript">
var checkIndex;
var reportids = "";
var rpttypeids = "";
var row = -1;
var userid = "<%=gov.mof.fasp.sec.util.SecureUtil.getCurrentUser()
							.getUserid()%>";
var currenRow ;
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
       window.location = "/ltrptapp/manage/add_reportedit.do?mainmenu="+<%=mainmenu%>+"&submenu="+<%=submenu%>+"&reporttypeid="+<%=reporttypeid%>;
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
    
  

    function doPreview(){
	  var selectedRow =tmain.getSelectedRow();
	  
	  if (selectedRow.length==0) {
	        alert("请首先选择1个记录，然后按[查看报表]！");
	        return false;
	  } 
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
	  openOCX(selectedRow[0].reportid,1,"");
    }
    
 
    
    function sumbitQuery(){
        window.location = "/ltrptapp/manage/reportlist.do?mainmenu="+<%=mainmenu%>+"&submenu="+<%=submenu%>;
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

<span>｜</span>
	<span ><span title="查看报表" class="queryEle_btn" onclick="doPreview()"
		onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
		onmousedown="doChangeBg1(this)"><a href="#">查看报表</a> </span> </span>
	<div id="editReportDiv"  >

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
						//String url = "/ltrptapp/manage/reportlist.do?mainmenu="+mainmenu+"&submenu="+submenu;
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

	tmain.setTableHead(["serial","radio","reportcode","reportspec","reporttypeid","creater","ispublic","showmenu"]);
	
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