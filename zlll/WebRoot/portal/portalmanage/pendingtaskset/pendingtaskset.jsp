<%@ page contentType="text/html; charset=GBK"%>
<jsp:directive.page import="java.util.List" />
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<link type="text/css" rel="stylesheet"
	href="<%=request.getContextPath()%>/style/style.css" />
<link type="text/css" rel="stylesheet"
	href="<%=request.getContextPath()%>/style/dtree.css" />
<script type="text/javascript"
	src="<%=request.getContextPath()%>/js/dtree.js"></script>
<script src="<%=request.getContextPath()%>/js/datatable.js"></script>
<script src="<%=request.getContextPath()%>/js/tbajax.js"></script>

<script>
var editarray=new Array();
var checkmenuid="";
var temp = -1;
var tmp = 0;
function getsubmenu(menuid){
	temp += 1;
	if(temp > 0&&tmp!=0){
		if(confirm("是否取消当前操作?")){
			tmp=0;
			checkmenuid=menuid;
  			var jsonstrobj=new Object();
			jsonstrobj.menuid=menuid;
			var ajaxobj=new Tbajax("/pendingtask/query.do",Object.toJSON(jsonstrobj));
			var array=eval(ajaxobj.respText);
			tmain.data=array;
			tmain.show();
			}
	}else{
		checkmenuid=menuid;
 		var jsonstrobj=new Object();
		jsonstrobj.menuid=menuid;
		var ajaxobj=new Tbajax("/pendingtask/query.do",Object.toJSON(jsonstrobj));
		var array=eval(ajaxobj.respText);
		tmain.data=array;
		tmain.show();
	}
	
}
	
function setvchtypeid(id,obj){
	//delete(tmain.data[id].vchtypeid);
	tmain.data[id].vchtypeid=obj.value;
	tmain.data[id].vchtypeid_id=obj.valueid;
	if(editarray.length==0){
		editarray.push(tmain.data[id].rownum);
	}
	for(var i =0;i<editarray.length;i++){
		if(editarray[i]==tmain.data[id].rownum){
			break;
		}
		if(i==editarray.length-1){
			editarray.push(tmain.data[id].rownum);
		}
	}

}

function setopertype(id,obj){
	//delete(tmain.data[id].opertype);
	tmain.data[id].opertype=obj.value;
	tmain.data[id].opertype_id=obj.value;
	if(editarray.length==0){
		editarray.push(tmain.data[id].rownum);
	}
	for(var i =0;i<editarray.length;i++){
		if(editarray[i]==tmain.data[id].rownum){
			break;
		}
		if(i==editarray.length-1){
			editarray.push(tmain.data[id].rownum);
		}
	}
	
}
function setparam2(id,obj){
	//delete(tmain.data[id].param2);
	tmain.data[id].param2=obj.value;
	tmain.data[id].param2_id=obj.value;
	if(editarray.length==0){
		editarray.push(tmain.data[id].rownum);
	}
	for(var i =0;i<editarray.length;i++){
		if(editarray[i]==tmain.data[id].rownum){
			break;
		}
		if(i==editarray.length-1){
			editarray.push(tmain.data[id].rownum);
		}
	}
}
	
function dosave()
{	
	temp = -2;
	var changedarray=new Array();
	for(var i=0;i<editarray.length;i++){
		changedarray.push(tmain.data[editarray[i]]);
	}
	var jsonstrobj=new Object();
		jsonstrobj.changedarray=Object.toJSON(changedarray);
		var ajaxobj=new Tbajax("/pendingtask/save.do",Object.toJSON(jsonstrobj));
		//var array=eval(ajaxobj.respText);
		alert(ajaxobj.respText);
		getsubmenu(checkmenuid);
	
}
function tlettersclick(){
		tmp =1;
	}
</script>
<div id="query_t">
	<span><span title="保存" class="save_btn" onclick="dosave()"
		onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
		onmousedown="doChangeBg1(this)"><a href="#">保存</a> </span> </span>
</div>
<div style="width: 98%;">
	<!-- InstanceBeginEditable name="EditRegion8" -->

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
			<div id="form_table_title" style="margin-left: 10px;">
				<ul>
					<li class="top">
						<div>
							编辑区
						</div>
					</li>
				</ul>
			</div>
			<div id="containerline20">
				<div id='tmain_div'
					style='position: relative; height: expression(this . offsetParent . offsetHeight); width: 100%;'></div>
			</div>
			<script>
					col = createColumnConfig();
					col.id = "name";
					col.name = "name";
					col.type = "S";
					col.title = "名称";
					col.show = function(rownum,value,row,tdobj,datatable){
						  tdobj.innerHTML = row["isleaf"]!=0?"----"+value:value;
					}
					ColumnConfig[col.id.toLowerCase()]=col;		
					 
					col = createColumnConfig();
					col.id = "vchtypeid";
					col.name = "vchtypeid";
					col.type = "S";
					col.title = "交易凭证类型";
					col.show = function(rownum,value,row,tdobj,datatable){
						tdobj.innerHTML=row["isleaf"]==0?"":'<input type=text id="vchtypeid'+row['rownum']+'" value="'+value+'"  class=main_lookup_input readonly onpropertychange="setvchtypeid('+row['rownum']+',this)" onclick=\'selectMutElememtByOnlyElementcode("vchtypeid",this,0);null\' /><button class="button" onclick="$(\'vchtypeid'+row['rownum']+'\').onclick()">...</button>';					}
					ColumnConfig[col.id.toLowerCase()]=col;
					
					col = createColumnConfig();
					col.id = "opertype";
					col.name = "opertype";
					col.type = "S";
					col.title = "操作类型";
					col.show = function(rownum,value,row,tdobj,datatable){
						  //tdobj.innerHTML = row["isleaf"]==0?"":"<input type=text id=vchtypeid size='10' value="+value+" ></input><button class='button' onclick='selectopertype()'>...</button>";
						  tdobj.innerHTML=row["isleaf"]==0?"":'<input type=text id="opertype'+row['rownum']+'" value="'+value+'"  class=main_lookup_input readonly onpropertychange="setopertype('+row['rownum']+',this)" onclick=\'selectMutElememtByOnlyElementcode("operatetype",this,0);null\' /><button class="button" onclick="$(\'opertype'+row['rownum']+'\').onclick()">...</button>';
					
					}
					ColumnConfig[col.id.toLowerCase()]=col;
					
					col = createColumnConfig();
					col.id = "param2";
					col.name = "param2";
					col.type = "S";
					col.title = "待办事项(录入2，审核0)";
					col.show = function(rownum,value,row,tdobj,datatable){
						  tdobj.innerHTML = row["isleaf"]==0?"":'<input type=text id="param2'+row['rownum']+'" size=10 value="'+value+'" onpropertychange="setparam2('+row['rownum']+',this)"></input>';
					}
					ColumnConfig[col.id.toLowerCase()]=col;
					
					var tmain =new dataTable();
					tmain.parent = document.getElementById('tmain_div');
					tmain.setTableHead(["serial","checkbox","name","vchtypeid","opertype","param2"]);
					<%
						String json = (String)request.getAttribute("json");
						if(null == json || "".equals(json)){
							out.println("tmain.data = new Array();\n");
						}else{
							out.println("tmain.data = "+ json);
						}
					%>
					tmain.onrowclick = tlettersclick;
					tmain.show();
				</script>
		</form>
	</div>
</div>
</div>


