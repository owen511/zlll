<%@ page contentType="text/html; charset=GBK"%>
<jsp:directive.page import="java.util.Map" />
<jsp:directive.page
	import="gov.mof.fasp.ifmis.system.report.dto.ReportTypeTreeView" />
<jsp:directive.page import="java.util.List" />
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<link type="text/css" rel="stylesheet"
	href="<%=request.getContextPath()%>/style/dtree.css" />
<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/dtree.js"></script>
<script src="<%=request.getContextPath()%>/js/datatable.js"></script>
<style type="text/css">
div#dragbar {
	z-index: 99999;
	cursor: col-resize;
	FLOAT: left;
	WIDTH: 5px;
	width: 100%;
	text-align: left;
	border: 1px solid #CCC;
	border-left: 0;
	background: #fafafa url(../images/bg/ktz.gif) no-repeat left center;
	vertical-align: middle;
}

div#splitter2 {
	position: absolute;
	background: #fafafa url(../images/bg/ktz.gif) no-repeat left center;
	z-index: 9999;
	display: none;
	cursor: col-resize;
	width: 2px;
	height: expression(document.body.offsetHeight-window_top.offsetHeight-hidden_top.offsetHeight-query_t.offsetHeight-query_t.offsetHeight-20
		);
}

#form_table_title22 {
	color: #000000;
	text-align: left;
	margin-left: 10px;
	height: 23px;
	line-height: 23px;
	margin-top: 10px;
	width: 98%;
	background-image: url(../ifmis_images/bg/form_table_title_bg.gif);
	background-repeat: repeat-x;
	background-position: left top;
	position: relative;
}

#form_table_title22 li {
	float: left;
}

#form_table_title22 li.top {
	background-image:
		url( ../ifmis_images/bg/form_table_title_blue_begin1.gif);
	background-position: left top;
	background-repeat: no-repeat;
	padding-left: 25px;
	padding-right: 40px;
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
var typeids = "";
var menuids = "";
var row = -1;
var userid = "<%=gov.mof.fasp.sec.util.SecureUtil.getCurrentUser()
							.getUserid()%>";
</script>
<%
	String mainmenu = "";
	String submenu = "";
	java.util.List reports = null;
	if (request.getParameter("mainmenu") != null) {
		mainmenu = request.getParameter("mainmenu").toString();
	}
	if (request.getParameter("submenu") != null) {
		submenu = request.getParameter("submenu").toString();
	}
	if (request.getAttribute("reports") != null) {
		reports = (java.util.List) request.getAttribute("reports");
	}
%>



<script type="text/javascript">
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
			            oSplitter.style.width="80%";
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

    function doAdd(){
       window.location = '/report/add_reporttype.do?mainmenu='+<%=mainmenu%>+"&submenu="+<%=submenu%>+"&action=add";
    }
    
    function checkData(i){
       var typeid = document.all("typeid"+i).value;       
       var menuid = document.all("menuid"+i).value;
       if(document.all("theId"+i).checked == true){
          row = i;
          if(typeids.length > 0){
             typeids = typeids +","+typeid;
             menuids = menuids +","+menuid;          
          }else{
             typeids = typeid;
             menuids = menuid;
          }          
       }else{
          if(typeids == typeid){
              typeids = "";
              menuid = "";
          }else{
             if(typeids.indexOf(typeid) == 0){
                typeids = typeids.substring(typeid.length+1,typeids.length);
                menuids = menuids.substring(menuid.length+1,menuids.length);
             }else{
                if(typeids.length - typeids.indexOf(typeid)-1 > typeid.length){
                  typeids = typeids.substring(0,typeids.indexOf(typeid))+typeids.substring(typeids.indexOf(typeid)+1,typeids.length);
                  menuids = menuids.substring(0,menuids.indexOf(menuid))+menuids.substring(menuids.indexOf(menuid)+1,menuids.length);                                  
                }else{
                  typeids = typeids.substring(0,typeids.indexOf(typeid)-1);
                  menuids = menuids.substring(0,menuids.indexOf(menuid)-1);
                }
             }
          }
       }
    }
    
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
	    var typeid = selectedRow[0].reporttypeid;
	    if(typeid == null || "" == typeid)
	    {
	    	alert("输入值出错，请刷新页面！");
	    	return false;
	    }
       	window.location = '/report/update_reporttype.do?mainmenu='+<%=mainmenu%>+"&submenu="+<%=submenu%>+"&typeid="+typeid;    
    }
    
    
    function sumbitQuery(){
        window.location = '/report/list_reporttype_find.do?mainmenu='+<%=mainmenu%>+"&submenu="+<%=submenu%>;
    }
    
    
    function doDel(){
		if (getSelectedCount() < 1) {
		   alert("请选择要删除记录！");
		   return;
		}
		var submenuid = <c:out value="${submenu}"/>;
		var mainmenu = <c:out value="${param.mainmenu}"/>;
		  	
		var selectedRow = tmain.getSelectedRow();
		var typeids = "";
		var menuids = "";
		for(var i = 0; i<selectedRow.length; i++ )
		{
			if(selectedRow[i].reporttypeid == null || "" == selectedRow[i].reporttypeid)
			{
				alert("输入值出错，请刷新页面！");
				return false;
			}else{
				if(typeids == "")
				{
					typeids = selectedRow[i].reporttypeid;
					menuids = selectedRow[i].menuid;
				}else{
					typeids = typeids + ","+ selectedRow[i].reporttypeid;
					menuids = menuids + ","+ selectedRow[i].menuid;
				}
				
			}
		}
		window.location = '/report/list_reporttype_del.do?mainmenu='+<%=mainmenu%>+"&submenu="+<%=submenu%>
	+ "&typeids="
				+ typeids + "&menuids=" + menuids;
	}

	function showResponse(request) {
		eval("var reporttypes = " + request.responseText);
		alert(reporttypes);
	}
</script>

<div id="query_t">
	<span><span title="新增" class="add_btn" onclick="doAdd()"
		onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
		onmousedown="doChangeBg1(this)"><a href="#">新增</a> </span> </span> <span><span
		title="修改" class="mod_btn" onclick="doUpdate()"
		onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
		onmousedown="doChangeBg1(this)"><a href="#">修改</a> </span> </span> <span><span
		title="删除" class="del_btn" onclick="doDel()"
		onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
		onmousedown="doChangeBg1(this)"><a href="#">删除</a> </span> </span> </span>
</div>

<!-- InstanceBeginEditable name="EditRegion8" -->
<div>
	<div id="sub_tree"
		style="display: inline; width: 150px; float: left; margin-left: 5px; margin-top: 10px; height: expression(document.body.offsetHeight-window_top.offsetHeight-hidden_top.offsetHeight-query_t.offsetHeight-query_t.offsetHeight-20); overflow: auto; border: #8BA3DA 1px solid;">
		<div style="margin-top: 5px; font-weight: bold;">
			<script type="text/javascript">
				document.getElementById("sub_tree").style.width = subTreeWidth;
				d = new dTree('d', '/images/dtree/');
			<%String treeUrl = "/report/reporttype.do?mainmenu=" + mainmenu
					+ "&submenu=" + submenu;
			out.print("d.add(0,-1,'全部','" + treeUrl + "');");
			List viewLists = (java.util.List) request.getAttribute("viewLists");
			if (null != viewLists) {
				StringBuffer strExcute = new StringBuffer();
				String url = "/report/list_reporttype_find.do?mainmenu="
						+ mainmenu + "&submenu=" + submenu;
				ReportTypeTreeView.showTree(viewLists, 0, url, strExcute);
				out.print(strExcute.toString());
			}%>
				document.write(d);
			</script>
		</div>
	</div>
	<div id="dragbar" title="拖动调整宽度"
		style="display: block; margin-top: 10px; overflow: hidden; width: 5px; height: expression(document.body.offsetHeight-window_top.offsetHeight-hidden_top.offsetHeight-query_t.offsetHeight-query_t.offsetHeight-20);">
		<div id="splitter2"></div>
	</div>
	<div id="main_area" layout="{h:{fit:true},w:{fit:'auto'}}"
		style="float: left; width: expression(this.offsetParent.offsetWidth-180);">
		<form id=queryform action="#" method="post">
			<div id="form_table_title22">
				<ul>
					<li class="top">
						<div style="">报表类别定义</div>
					</li>
				</ul>
			</div>
			<div id="containerline15" style="">
				<div id='tmain_div'
					style='position: relative; height: expression(this.offsetParent.offsetHeight-42); width: 100%;'></div>
			</div>
			<script>
				col = createColumnConfig();
				col.id = "systemcode";
				col.name = "systemcode";
				col.type = "S";
				col.title = "类别编码";
				col.show = function(rownum, value, row, tdobj, datatable) {
					if (row["systemcode"] != null && value != null) {
						tdobj.innerHTML = value;
					} else {
						tdobj.innerHTML = "";
					}
				}
				ColumnConfig[col.id.toLowerCase()] = col;

				col = createColumnConfig();
				col.id = "reporttypename";
				col.name = "reporttypename";
				col.type = "S";
				col.title = "类别名称";
				col.show = function(rownum, value, row, tdobj, datatable) {
					if (row["reporttypename"] != null && value != null) {
						tdobj.innerHTML = value;
					} else {
						tdobj.innerHTML = "";
					}
				}
				ColumnConfig[col.id.toLowerCase()] = col;

				var tmain = new dataTable();
				tmain.parent = document.getElementById('tmain_div');
				tmain.setTableHead([ "serial", "checkbox", "systemcode",
						"reporttypename" ]);
			<%String json = (String) request.getAttribute("json");
			if (null == json || "".equals(json)) {
				out.println("tmain.data = new Array();\n");
			} else {
				out.println("tmain.data = " + json);
			}%>
				tmain.show();
			</script>
		</form>
	</div>
</div>

