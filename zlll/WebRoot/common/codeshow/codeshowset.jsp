<%@ page contentType="text/html; charset=GBK"%>
<jsp:directive.page import="java.util.List" />
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<link type="text/css" rel="stylesheet"
	href="<%=request.getContextPath()%>/style/dtree.css" />
<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/dtree.js"></script>
<script src="<%=request.getContextPath()%>/js/datatable.js"></script>
<script src="<%=request.getContextPath()%>/js/tbajax.js"></script>

<script>
var checkmenuid="";
function getsubmenu(menuid){
		checkmenuid=menuid;
  		var jsonstrobj=new Object();
		jsonstrobj.menuid=menuid;
		var ajaxobj=new Tbajax("/common/codeShowManage/query.do",Object.toJSON(jsonstrobj));
		var array=eval(ajaxobj.respText);
		tmain.data=array;
		for(j=0;j<tmain.data.length;j++){
			if(menuid==tmain.data[j].MAINMENU){
				tmain.data[j].checked=true;
			}
		}
		tmain.show();
	}
function dosave(){
	  var changedarray=new Array();
	  changedarray = tmain.getSelectedRow();
	  var jsonstrobj=new Object();
	  jsonstrobj.changedarray=Object.toJSON(changedarray);
	  var ajaxobj=new Tbajax("/common/codeShowManage/save.do?checkmenuid="+checkmenuid,Object.toJSON(jsonstrobj));
	  alert(ajaxobj.respText);
	  getsubmenu(checkmenuid);
}

function donew(){
	if(checkmenuid == ""){
	  alert("请选择功能菜单!");
	  return false;
	}
  	var url="/common/codeShowManage/addQueryList.do?checkmenuid="+checkmenuid;
	var features = "top=200,left=350,width=750,height=500,scrollbars=yes,resizable=yes";
	window.open(url,"列表项自定义",features);
}
</script>
<div id="query_t">
	<span><span title="保存CODE显示设置" class="save_btn" onclick="dosave()"
		onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
		onmousedown="doChangeBg1(this)"><a href="#">保存编码显示设置</a> </span> 
		<span title="总账外要素信息" class="query_btn" onclick="donew()"
		onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
		onmousedown="doChangeBg1(this)"><a href="#">总账外要素信息</a> </span>
		</span>
</div>
<div style="width: 98%;">

	<div id="sub_tree"
		style="width: 200px; height: 512px; float: left; margin-left: 5px; margin-top: 10px; height: expression(document . body . offsetHeight-window_top . offsetHeight-hidden_top . offsetHeight-query_t . offsetHeight-query_t . offsetHeight-12); overflow: auto; border: #8BA3DA 1px solid;">
		<div style="margin-top: 5px; font-weight: bold;">
			<script>
			    d = new dTree('d','../../images/dtree2/');
			    d.add(0,-1,"功能菜单",'','','','globe.gif','globe.gif');
				<%
				List list=(List)request.getAttribute("list");
				for(int i=0;i<list.size();i++){
				String[] t=(String[])list.get(i);
				%>
				d.add(<%=t[0]%>,<%=t[1]%>,'<%=t[2]%>','<%=t[3]%>');
				<%	
				}
				%>	
				document.write(d);
		</script>
		</div>
	</div>

	<div style="overflow: auto; width: 70%; display: block;">
		<form id=queryform action="#" method="post">
			<div id="form_table_title">
					  <ul>
					    <li class="top">
					      <div>编码显示设置列表</div>
					    </li>
					  </ul>
					</div>
					<div id='containerline15'> 
						<div id='tmain_div' style='position:relative;height:expression(this.offsetParent.offsetHeight);width:100%;'>
					</div>
			</div>
		</form>
	</div>
</div>
<script>
       		 
		col = createColumnConfig();
		col.id = "COLUMNCODE";
		col.name = "COLUMNCODE";
		col.type = "S";
		col.title = "要素编码";
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "NAME";
		col.name = "NAME";
		col.type = "S";
		col.title = "要素名称";
		ColumnConfig[col.id.toLowerCase()]=col;
		
		col = createColumnConfig();
		col.id = "BELONG";
		col.name = "BELONG";
		col.type = "S";
		col.title = "归属";
		ColumnConfig[col.id.toLowerCase()]=col;
		
		var tmain =new dataTable();
		tmain.parent = document.getElementById('tmain_div');
		tmain._checkHeaderOperation=function(el, x) {
			    if(el.tagName!="th" && el.tagName!="TH") return;
			    var prev, next, left, right, l, r,leftwidth;
			    leftwidth = 0;
			    if(document.getElementById("left_tree"))
			    	leftwidth = document.getElementById("left_tree").offsetWidth;
			    if(document.getElementById("switchBar"))
			    	leftwidth =  leftwidth+document.getElementById("switchBar").offsetWidth; 
				prev = el.previousSibling;
				next = el.nextSibling;
				left = getLeftPos(el)-leftwidth - document.getElementById("sub_tree").offsetWidth;
				right = left + el.offsetWidth;
				l = x - left+10;
				r = right - x-15;
		        //alert("l:"+l+";r:"+r);
				if ((l < 3) && (prev)) {
				    //alert("l:"+l+";r:"+r);
				    //alert("left:"+left+";right:"+right+";el.offsetWidth:"+el.offsetWidth);\
				    //alert("l:"+l);
				    if(el.className=="FixedDataColumn") {
				    el.parentNode.style.cursor = 'default';
				    return};
				    if(this.columnConfig[el.cellIndex].id=="radio" || this.columnConfig[el.cellIndex].id=="checkbox")
				        return;
					el.parentNode.style.cursor = 'e-resize';
					this._headerOper         = COL_HEAD_EDGE;
					this._headerData         = [prev, prev.offsetWidth - 5, x, el.parentNode.offsetWidth];
					
				} else if (r < 5) {
				    //alert(r);
				    //alert("l:"+l+";r:"+r);
				    //alert("left:"+left+";right:"+right+";el.offsetWidth:"+el.offsetWidth);
					el.parentNode.style.cursor = 'e-resize';
					this._headerOper         = COL_HEAD_EDGE;
					this._headerData         = [el, el.offsetWidth - 5, x, el.parentNode.offsetWidth];
				}else {
					el.parentNode.style.cursor = 'default';
					this._headerOper         = COL_HEAD_OVER;
					this._headerData         = [el, el.offsetLeft, x, getLeftPos(el), el.cellIndex];
				}	
   		 } 
		tmain.setTableHead(["serial","checkbox","BELONG","COLUMNCODE","NAME"]);
		
		<%
			String json = (String)request.getAttribute("json");
			if(null == json || "".equals(json)){
				out.println("tmain.data = new Array();\n");
			}else{
				out.println("tmain.data = "+ json);
			}
		%>
		
		tmain.show();
</script>



