<%@ page contentType="text/html; charset=GBK"%>
<jsp:directive.page import="java.util.*" />
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<link type="text/css" rel="stylesheet"
	href="<%=request.getContextPath()%>/style/dtree.css" />
<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/dtree.js"></script>
<script src="<%=request.getContextPath()%>/js/datatable.js"></script>
<script src="<%=request.getContextPath()%>/js/tbajax.js"></script>


  <script>
	  function getVersionLogData(code){
			var ajaxobj=new Tbajax("/common/versionShow/query.do?code="+code,"");
			var array=eval(ajaxobj.respText);
			tmain.data=array;
			tmain.show();
		}
	</script>
 
	<div id="sub_tree"
		style="width: 200px; height: 512px; float: left; margin-left: 5px; margin-top: 10px;overflow: auto; border: #8BA3DA 1px solid;">
		<div style="margin-top: 5px; font-weight: bold;">
			<script>
			    d = new dTree('d','../../images/dtree2/');
			    d.add(0,-1,"系统菜单",'','','','globe.gif','globe.gif');
				<%
					List list=(List)request.getAttribute("list");
					Map map = null;
					Iterator iterator = list.iterator();
					while(iterator.hasNext()){
						map = (Map)iterator.next();		
				%>
					d.add('<%=map.get("CODE")%>',<%=0%>,'<%=map.get("NAME")%>',"javascript:getVersionLogData('<%=map.get("CODE")%>')");
				<%	
					}
				%>
				document.write(d);
		</script>
		</div>
	</div>
	
	<div style="overflow: auto; width: 70%; display: block;margin-top:10px;">
		<form id=queryform action="#" method="post">
			<div id="form_table_title">
					  <ul>
					    <li class="top">
					      <div>版本信息列表</div>
					    </li>
					  </ul>
					</div>
					<div id='containerline15'> 
						<div id='tmain_div' style='position:relative;height:expression(this.offsetParent.offsetHeight);width:100%;'>
					</div>
			</div>
		</form>
	</div>	
	
	<script> 
			col = createColumnConfig();
			col.id = "CODE";
			col.name = "CODE";
			col.type = "S";
			col.title = "系统编码";
			ColumnConfig[col.id.toLowerCase()]=col;
			
			col = createColumnConfig();
			col.id = "NAME";
			col.name = "NAME";
			col.type = "S";
			col.title = "系统名称";
			ColumnConfig[col.id.toLowerCase()]=col;
			
			col = createColumnConfig();
			col.id = "VERSION";
			col.name = "VERSION";
			col.type = "S";
			col.title = "版本";
			ColumnConfig[col.id.toLowerCase()]=col;
			
			col = createColumnConfig();
			col.id = "UPGRADEDATE";
			col.name = "UPGRADEDATE";
			col.type = "S";
			col.title = "升级时间";
			ColumnConfig[col.id.toLowerCase()]=col;
			
			col = createColumnConfig();
			col.id = "OPERATOR";
			col.name = "OPERATOR";
			col.type = "S";
			col.title = "升级人";
			ColumnConfig[col.id.toLowerCase()]=col;
			
			col = createColumnConfig();
			col.id = "REMARK";
			col.name = "REMARK";
			col.type = "S";
			col.title = "备注";
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
			tmain.setTableHead(["serial","checkbox","CODE","NAME","VERSION", "UPGRADEDATE", "OPERATOR", "REMARK"]);
			tmain.show();
	</script>

