<%@ page language="java" contentType="text/html; charset=GBK"
	pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<link rel="stylesheet" type="text/css" href="image/tbtree.css" />
<link href="image/SpryTabbedPanels.css" rel="stylesheet" type="text/css" />
<script language="JavaScript" type="text/javascript"
	src="image/SpryTabbedPanels.js"></script>
<script language="JavaScript" type="text/javascript"
	src="image/tbajax.js"></script>
<%
String rootPath = request.getContextPath();
String hidePara = (String) request.getAttribute("hidePara");
String usertype = (String)request.getAttribute("usertype");
String userid = (String)request.getAttribute("userid");
%>
<script type="text/javascript">

		var listrarray=new Array();
		listrarray[0]="<li class=\"TabbedPanelsTab\" tabindex=\"0\">查询条件</li>";
		listrarray[1]="<li class=\"TabbedPanelsTab\" tabindex=\"0\">分组及汇总</li>";
		listrarray[2]="<li class=\"TabbedPanelsTab\" tabindex=\"0\">栏显示</li>";
		var tablestrarray=new Array();
		tablestrarray[0]=" <table width=\"85%\" class=\"main_table_98\" border=\"0\" cellspacing=\"0\"> <tr class=\"main_table_title\"><th width=\"45%\" nowrap=\"nowrap\"> 显示查询条件 </th><th width=\"10%\" nowrap=\"nowrap\"> </th><th width=\"45%\" nowrap=\"nowrap\"> 不显示查询条件&nbsp; </th> </tr> <tr class=\"main_table_title_letter\" style=\"height: expression(document . body . offsetHeight-query_t . offsetHeight-50-100); border: 1px red solid;\"> <td align=\"left\" nowrap=\"nowrap\"> <div id=\"panel1_ldiv\" style=\"vertical-align: top; height: 100%;\"> <table border=\"0px\"> <tbody> </tbody> </table> </div> </td> <th align=\"center\"> <input type=\"button\" value=\">\" class=\"btn_style\" onclick=\"movetdcontent('panel1_ldiv','panel1_rdiv')\" /> <br /> <br /> <br /> <input type=\"button\" value=\"<\" class=\" btn_style\" onclick=\"movetdcontent('panel1_rdiv','panel1_ldiv')\" /></th><td align=\"left\" nowrap=\"nowrap\"><div id=\"panel1_rdiv\" align=\"left\" style=\"vertical-align: top; height: 100%;\"><table border=\"0px\"><tbody></tbody></table></div></td></tr></table>"
		tablestrarray[1]="<table width=\"85%\" class=\"main_table_98\" border=\"0\" cellspacing=\"0\"> <tr class=\"main_table_title\"> <th width=\"30%\" nowrap=\"nowrap\"> 待选要素列表 	</th><th width=\"10%\" nowrap=\"nowrap\"> </th> <th width=\"\" nowrap=\"nowrap\"> 已选要素列表&nbsp;<input type=\"button\" value=\"上移\" class=\"button_style\" style=\"margin: 0;\" onclick=\"moveupordown('panel2_rdiv','up')\" /> <input type=\"button\" value=\"下移\" class=\"button_style\" style=\"margin: 0;\" onclick=\"moveupordown('panel2_rdiv','down')\" /> </th> </tr> <tr class=\"main_table_title_letter\"	style=\"height: expression(document . body .  offsetHeight-query_t .    offsetHeight-50-100); border: 0px red solid;\"> <td align=\"left\" nowrap=\"nowrap\"> <div id=\"panel2_ldiv\" style=\"vertical-align: top; height: 100%;\"><table border=\"0px\"><tbody> </tbody></table></div> </td> <th align=\"center\"> <input type=\"button\" value=\">\" class=\"btn_style\" onclick=\"movetdcontent('panel2_ldiv','panel2_rdiv')\" /> <br /> <br /> <br /><input type=\"button\" value=\"<\" class=\" btn_style\"  onclick=\"movetdcontent('panel2_rdiv','panel2_ldiv')\" /> </th> <td align=\"left\" nowrap=\"nowrap\"> <div id=\"panel2_rdiv\" align=\"left\" style=\"vertical-align: top; height: 100%;\">  <table border=\"0px\" cellspacing=\"0\" class=\"main_table_98\"> <tHead class=\"main_table_title\">  <tr>  <td>  </td>  <td>  要素编码 </td>  <td> 要素名称</td> <td>显示级次</td><td>  向上汇总 </td> <td> 显示  </td> </tr>  </tHead><tbody>	</tbody>	</table></div>	</td></tr></table>"
		tablestrarray[2]="<table width=\"85%\" class=\"main_table_98\" border=\"0\" cellspacing=\"0\"> <tr class=\"main_table_title\">  <th width=\"42%\" nowrap=\"nowrap\"> 设置报表显示栏    </th>  </tr>  <tr class=\"main_table_title_letter\"  style=\"height: expression(document .   body .  offsetHeight-query_t .  offsetHeight-50-100); border: 0px red solid;\"> <td align=\"left\" nowrap=\"nowrap\"> <div id=\"panel3_div\" style=\"vertical-align: top; height: 100%;\"> <table border=\"0px\" cellspacing=\"0\" class=\"main_table_98\"><tHead class=\"main_table_title\">  <tr>    <td>  报表栏 </td>  <td> 报表栏内容</td> <td>显示</td> </tr>  </tHead><tbody></tbody></table></div></td> </tr> </table>"
		
		var headstr="<div class=\"TabbedPanels\" id=\"tp1\"> <ul class=\"TabbedPanelsTabGroup\">";
		var middlestr="</ul> <div class=\"TabbedPanelsContentGroup\">"
		var bottomstr="</div></div>"
		
		var joinpath = "<img style=\"vertical-align: middle;\"src=\"" + "image/join.gif" + "\"/>";
		var joinbottompath = "<img style=\"vertical-align: middle;\"src=\"" + "image/joinbottom.gif" + "\"/>";
		var filepath = "<img style=\"vertical-align: middle;\"src=\"" + "image/file.gif" + "\"/>";
		
		var schemasettingarray=<%=request.getAttribute("schemasettingJson")%>;
		
		var queryschemaarray=<%=request.getAttribute("queryschemaJson")%>;
		
		var conditionarray=<%=request.getAttribute("conditionList")%>;
		var grouparray=<%=request.getAttribute("groupList")%>;

		var nullschema=<%=request.getAttribute("qsdtoJson")%>;
		var deleteschemastr="";
		
</script>

<script type="text/javascript">
//初始化节点
function appendnode(divname,appendarray,appendflag,editindex){
    
	var divobj=document.getElementById(divname);
	var tb =divobj.getElementsByTagName("table")[0].getElementsByTagName("tbody")[0];
	//tb.innerHTML="";	
	while(true){
		try{			
			tb.deleteRow(0);
		}catch(err){
			break;
		}
	}
	var userid = <%=request.getAttribute("userid")%>; //当前用户USERID
	var needDef = true;
	var isDef = false;
	var tmp_userscm = [];
	for(var i=0;i<appendarray.length;i++){
		var newTr=tb.insertRow(); 
		var newTd = newTr.insertCell();
		newTd.className="table01-td01"
		var newTd2 = newTr.insertCell(); 
		newTd2.className="table01-td02"  
		newTd.innerHTML=(i==appendarray.length-1)?(joinbottompath+filepath):(joinpath+filepath);
		if(appendarray[i]["userid"]!=userid){ //管理员先不加默认字样，如果当前用户没有选择默认处理则加上默认字样。
			if(appendarray[i]["isdefault"]==1)isDef = true;
			newTd2.innerHTML=appendarray[i]["schemaname"];
			tmp_userscm[tmp_userscm.length] = {
					 isdefault:appendarray[i]["isdefault"],
					 td:newTd2
			};
		}else{
			if(appendarray[i]["isdefault"]==1)needDef = false;
			newTd2.innerHTML=(appendarray[i]["isdefault"]==1)?(appendarray[i]["schemaname"]+" <默认>"):appendarray[i]["schemaname"];
		}
		JQ(newTd2).data("ableedit",appendarray[i]["userid"]=="<%=userid%>")
		newTd2.onclick=function (){
		   
			var divobj=document.getElementById("sub_tree");
			var tb =divobj.getElementsByTagName("table")[0].getElementsByTagName("tbody")[0];
			for(var i=0;i<tb.rows.length;i++){
				tb.rows[i].cells[1].bgColor="transparent";
				tb.rows[i].cells[1].style.color = "black";
			}
			this.bgColor="#003399"
			this.style.color = "white";
			var showarray=new Array(schemasettingarray[0]["showtag1"]+"conditionSchemas",schemasettingarray[0]["showtag2"]+"groupSumSchemas",schemasettingarray[0]["showtag3"]+"columnSchemas");
			for(var i=0;i<showarray.length;i++){
				if(showarray[i].substr(0,1)==1){
					inittabpanel(i+1,queryschemaarray[this.parentElement.rowIndex-1][showarray[i].substr(1)])
				}
			}
			if(JQ(this).data("ableedit")==true){
				JQ("input[value!='返回'],span.mod_btn,span.del_btn,span.copyPlay_btn").attr("disabled",false);
			}else{
				JQ("input[value!='返回'],span.mod_btn,span.del_btn,span.copyPlay_btn").attr("disabled",true);
			}
		}
		if(appendflag==1&&i==(appendarray.length-1)){
			newTd2.id="deleteTD";
			newTd2.innerHTML="<input type='text' class='box1' value='"+appendarray[i]["schemaname"]+"' id='schema_temp' onblur='setvalue(-1)'>";
			var textobj=document.getElementById("schema_temp");
			textobj.focus();
			textobj.focus();  //一句不行，只好再来一句
		} 
		else if(appendflag==2&&i==editindex){
			newTd2.id="deleteTD";
			newTd2.innerHTML="<input type='text' class='box1' value='"+appendarray[i]["schemaname"]+"' id='schema_temp' onblur='setvalue("+editindex+")'>";
			var textobj=document.getElementById("schema_temp");
			textobj.focus();
			textobj.focus();
		}
	}	
	if(needDef){
		for(var i=0;i<tmp_userscm.length;i++){
			if(tmp_userscm[i].isdefault==1){
				tmp_userscm[i].td.innerHTML=tmp_userscm[i].td.innerHTML+" <默认>";
			}
		}
	}
}
//新增方案
function addschema(){
	var divobj=document.getElementById("sub_tree");
	var tb =divobj.getElementsByTagName("table")[0].getElementsByTagName("tbody")[0];
	for(var i=0;i<tb.rows.length;i++){
		tb.rows[i].cells[1].bgColor="transparent";
	}
	eval('var copyschema='+Object.toJSON(nullschema)+';');
	queryschemaarray.push(copyschema);
	appendnode('sub_tree',queryschemaarray,1);
}

function editschema(){
	var divobj=document.getElementById("sub_tree");
	var tb =divobj.getElementsByTagName("table")[0].getElementsByTagName("tbody")[0];
	var index=-1;

	for(var i=0;i<tb.rows.length;i++){
		if(tb.rows[i].cells[1].bgColor=="#003399"){
			index=i;
		}
	}
	if(index==-1){
		alert("请选中要修改的方案");
		return;
	}
  appendnode('sub_tree',queryschemaarray,2, index);
}
//复制方案
function copyschema(){
	var divobj=document.getElementById("sub_tree");
	var tb =divobj.getElementsByTagName("table")[0].getElementsByTagName("tbody")[0];
	var index=-1;
	for(var i=0;i<tb.rows.length;i++){
		if(tb.rows[i].cells[1].bgColor=="#003399"){
			tb.rows[i].cells[1].bgColor="transparent"
			index=i;
		}
	}
	if(index==-1){
		alert("请选中要复制的方案");
		return;
	}
	eval('var copyschema='+Object.toJSON(queryschemaarray[index])+';');
	copyschema.schemaid=0;
	copyschema.isdefault=0;
	queryschemaarray.push(copyschema);
	appendnode('sub_tree',queryschemaarray,1);
}

function copyschematootherusers(){
	eval('var copyschema='+Object.toJSON(nullschema)+';');
	var url='<%=rootPath%>/report/copyschematootherusers.do';
	url = url + '?reportid='+copyschema.reportid;

	//window.location=url;
	window.showModalDialog(url,window,'dialogHeight:450px;dialogWidth: 800px;resizable: No; status: No;help:No;');
}
//删除方案
function deleteschema(){

	var divobj=document.getElementById("sub_tree");
	var tb =divobj.getElementsByTagName("table")[0].getElementsByTagName("tbody")[0];
	var index=-1;
	for(var i=0;i<tb.rows.length;i++){
		if(tb.rows[i].cells[1].bgColor=="#003399"){
			index=i;
		}
	}
	if(index==-1){
		alert("请选中要删除的方案");
		return;
	}
	var usercode = '<%=request.getAttribute("usercode")%>'; //当前用户USERCODE
	if(usercode!=null&&usercode=="IFMIS"){
		if(!confirm('该查询方案可能被其他用户设置为默认查询方案，确定删除该方案？')){
			return;
		}
	}else{
		if(!confirm("确认删除方案["+queryschemaarray[index]["schemaname"]+"]?")){
			return;
		}
	}
	if(queryschemaarray[index]["schemaid"]!=0)
		deleteschemastr+=(","+queryschemaarray[index]["schemaid"])
	queryschemaarray.splice(index,1);
	appendnode('sub_tree',queryschemaarray);
	showpanels(new Array(schemasettingarray[0]["showtag1"],schemasettingarray[0]["showtag2"],schemasettingarray[0]["showtag3"]));
}

//取消方案
function cancelschema(index){
	for(var i=0;i<queryschemaarray.length;i++){
	  if(queryschemaarray[i]["schemaname"]==""){
	    queryschemaarray.splice(index,1);
	    appendnode('sub_tree',queryschemaarray);
	    showpanels(new Array(schemasettingarray[0]["showtag1"],schemasettingarray[0]["showtag2"],schemasettingarray[0]["showtag3"]));
	  }
	}	
	
}

//设置方案名并显示
function setvalue(ignoreindex){
	if(event.srcElement.value==""){
		
		if(confirm("方案名称不能为空,继续录入方案名称?")){
		  event.srcElement.focus();
		  return;
		}
		else{
		  cancelschema(ignoreindex);
		  return;
		}
	}
	for(var i=0;i<queryschemaarray.length;i++){
		if (i==ignoreindex){
			continue;
		}
		if(event.srcElement.value==queryschemaarray[i]["schemaname"]){
			alert("已存在该方案名称");
			event.srcElement.value="";
			event.srcElement.focus();
			return;
		}
	}
	var tdobj=event.srcElement.parentElement;
	//tdobj.bgColor="gray"
	tdobj.innerHTML=event.srcElement.value;
	if (ignoreindex<0){
		queryschemaarray[queryschemaarray.length-1].schemaname=event.srcElement.value;
	}
	else{
		queryschemaarray[ignoreindex].schemaname=event.srcElement.value;
	}
	tdobj.onclick();
}
//页签显示
function showdivcontent(divname,format){
	var divobj=document.getElementById(divname);
	var tb =divobj.getElementsByTagName("table")[0].getElementsByTagName("tbody")[0];
	while(true){
		try{
			tb.deleteRow(0);
		}catch(err){
			break;
		}
	}
	if(format==1){
		for(var i=0;i<divobj.contentarray.length;i++){
			var newTr=tb.insertRow(); 
			var newTd = newTr.insertCell(); 
			newTd.innerHTML="<input type=\"checkbox\" value="+i+" >"+divobj.contentarray[i]["elementcode"]+"-"+divobj.contentarray[i]["controlname"]; 
			newTd.className="table01-td03" 
		}
	}else if(format==2){
		for(var i=0;i<divobj.contentarray.length;i++){
			var newTr=tb.insertRow(); 
			var newTd = newTr.insertCell(); 
			newTd.innerHTML="<input type=\"checkbox\" value="+i+" >"+divobj.contentarray[i]["elementcode"]+"-"+divobj.contentarray[i]["elementname"]; 
			newTd.className="table01-td03" 
		}
	}else if(format==3){
		for(var i=0;i<divobj.contentarray.length;i++){
			var newTr=tb.insertRow(); 
			newTr.className="main_table_title_content";
			var newTd = newTr.insertCell(); 
			 newTd.innerHTML="<input type=\"checkbox\" onclick=\"changebackcolor(this)\" name=\"p2_ordercheck\" value="+i+">";
			var newTd = newTr.insertCell(); 
			newTd.innerHTML=divobj.contentarray[i]["elementcode"];
			var newTd = newTr.insertCell(); 
			newTd.innerHTML=divobj.contentarray[i]["elementname"];
			var newTd = newTr.insertCell(); 
			//newTd.innerHTML=divobj.contentarray[i]["displaylevel"];
			createselect(newTd,divobj.contentarray[i]["displaylevels"],divobj.contentarray[i]["displaylevel"],i)
			var newTd = newTr.insertCell(); 
			if(divobj.contentarray[i]["istotal"]==1)
			newTd.innerHTML="<input type=\"checkbox\" name=\"istotal\" value=1 onclick=\"changepra('"+divname+"',"+i+")\" checked>";
			else
			 newTd.innerHTML="<input type=\"checkbox\" name=\"istotal\" value=0 onclick=\"changepra('"+divname+"',"+i+")\">";
			var newTd = newTr.insertCell(); 
			if(divobj.contentarray[i]["isshow"]==1)
			newTd.innerHTML="<input type=\"checkbox\" name=\"isshow\" value=1 onclick=\"changepra('"+divname+"',"+i+")\" checked>";
			else
			 newTd.innerHTML="<input type=\"checkbox\" name=\"isshow\" value=0 onclick=\"changepra('"+divname+"',"+i+")\">";
		}
	}else if(format==4){
	   
		for(var i=0;i<divobj.contentarray.length;i++){
			var newTr=tb.insertRow(); 
			newTr.className="main_table_title_content";
			//var newTd = newTr.insertCell(); 
			//newTd.innerHTML="<input type=\"checkbox\" onclick=\"changebackcolor(this)\" name=\"p3_ordercheck\" value="+i+">";
			var newTd = newTr.insertCell(); 
			newTd.innerHTML=divobj.contentarray[i]["columnname"];
			var newTd = newTr.insertCell(); 
			newTd.innerHTML=divobj.contentarray[i]["columncode"];
			var newTd = newTr.insertCell(); 
			if(divobj.contentarray[i]["isshow"]==1)
			newTd.innerHTML="<input type=\"checkbox\" name=\"isshow\" value=1 onclick=\"changepra('"+divname+"',"+i+")\" checked>";
			else
			 newTd.innerHTML="<input type=\"checkbox\" name=\"isshow\" value=0 onclick=\"changepra('"+divname+"',"+i+")\">";
		}
	}
}
//左右移动
function movetdcontent(fromdivname,todivname){
	var fromdivobj=document.getElementById(fromdivname);
	var todivobj=document.getElementById(todivname);
	var tb =fromdivobj.getElementsByTagName("table")[0].getElementsByTagName("tbody")[0];
	var checkboxarr=tb.getElementsByTagName("input");
	if(fromdivname=="panel2_rdiv"){
		checkboxarr=document.getElementsByName("p2_ordercheck");
	}
	for(var i=0;i<checkboxarr.length;i++){
		if(checkboxarr[i].checked){
			todivobj.contentarray.push(fromdivobj.contentarray[i]);
		}
	}
	for(var i=checkboxarr.length-1;i>=0;i--){
		if(checkboxarr[i].checked){
			fromdivobj.contentarray.splice(i,1);
		}
	}
	if(fromdivname=="panel2_rdiv"){
		showdivcontent(todivname,2);
		showdivcontent(fromdivname,3);
	}
	else if(fromdivname=="panel2_ldiv"){
		showdivcontent(todivname,3);
		showdivcontent(fromdivname,2);
	}else{
		showdivcontent(todivname,1);
		showdivcontent(fromdivname,1);
	}
}
//上下移动
function moveupordown(orderdivname,upordown){
	var divobj=document.getElementById(orderdivname);
	var checkboxarr=new Array();
	if(orderdivname=="panel1_rdiv"){
		var tb =divobj.getElementsByTagName("table")[0].getElementsByTagName("tbody")[0];
		checkboxarr=tb.getElementsByTagName("input");
	}else if(orderdivname=="panel2_rdiv"){
		checkboxarr=document.getElementsByName("p2_ordercheck");
	}else if(orderdivname=="panel3_div"){
		checkboxarr=document.getElementsByName("p3_ordercheck");
	}
	var checkedarray=new Array();
	if(checkboxarr.length==0)	return;
	var flag=false;
	if(upordown=="up"){
		for(var i=0;i<checkboxarr.length;i++){
			if(!checkboxarr[i].checked){
				flag=true;
			}else{
				if(flag==true){
					divobj.contentarray[i].checked=true;
					var temp=divobj.contentarray[i-1];
					divobj.contentarray[i-1]=divobj.contentarray[i];
					divobj.contentarray[i]=temp;
					checkedarray.push(i-1);
				}else{
					checkedarray.push(i);
				}
			}
		}	
	}else if(upordown=="down"){
		for(var i=checkboxarr.length-1;i>=0;i--){
			if(!checkboxarr[i].checked){
				flag=true;
			}else{
				if(flag==true){
					divobj.contentarray[i].checked=true;
					var temp=divobj.contentarray[i+1];
					divobj.contentarray[i+1]=divobj.contentarray[i];
					divobj.contentarray[i]=temp;
					checkedarray.push(i+1);
				}else{
					checkedarray.push(i);
				}
			}
		}
	}
	if(orderdivname=="panel2_rdiv"){
		showdivcontent(orderdivname,3);
	}else if(orderdivname=="panel3_div"){
		showdivcontent(orderdivname,4);
	}else if(orderdivname=="panel1_rdiv"){
		showdivcontent(orderdivname,1);
	}
	for(var i=0;i<checkedarray.length;i++){
		checkboxarr[checkedarray[i]].checked=true;
		for(var j=0;j<checkboxarr[checkedarray[i]].parentElement.parentElement.cells.length;j++){
			checkboxarr[checkedarray[i]].parentElement.parentElement.cells[j].bgColor="#E1EDFE"
		}
	}
}
//复选框点击事件
function changepra(divname,index){
	document.getElementById(divname).contentarray[index][event.srcElement.name]=Math.abs(event.srcElement.value-1);
}
//创建下拉菜单并添加事件
function createselect(obj,length,selectvalue,index){
	var mySelect = document.createElement('select'); 
	mySelect.name ='displaylevel'; 
	mySelect.id=index;
	obj.appendChild(mySelect);
	for(var i=1;i<length+1;i++){
		mySelect.add(new Option("第"+i+"级",i)); 
	}
	mySelect.value=selectvalue;
	mySelect.onchange=function changedisplaylevel(){
 		document.getElementById('panel2_rdiv').contentarray[event.srcElement.id][event.srcElement.name]=event.srcElement.value;
	} 
}
//绑定数组
function initdivarray(divname,initarray){
	document.getElementById(divname).contentarray=initarray;
}

//初始化panel--查询条件
function inittabpanel(panelindex,arr){
	if(panelindex==1){
		var temparr=new Array();
		for(var i=0;i<arr.length;i++){
			for(var j=0;j<conditionarray.length;j++){
				if(arr[i]["elementcode"]==conditionarray[j]["elementcode"]){
					arr[i]["controlname"]=conditionarray[j]["controlname"];
					temparr.push(j);
					break;
				}
			}
		}
		eval('var arr2='+Object.toJSON(conditionarray)+';');
		temparr=temparr.sort(function(a,b){return a-b});	
		for(var j=temparr.length-1;j>=0;j--){
			arr2.splice(temparr[j],1);
		}
		initdivarray("panel1_ldiv",arr2);
		initdivarray("panel1_rdiv",arr);
		showdivcontent("panel1_ldiv",1);
		showdivcontent("panel1_rdiv",1);
	}else if(panelindex==2){
		var temparr=new Array();
		for(var i=0;i<arr.length;i++){
			for(var j=0;j<grouparray.length;j++){
				if(arr[i]["elementcode"].trim()==grouparray[j]["elementcode"].trim()){
					arr[i]["elementname"]=grouparray[j]["elementname"];
					arr[i]["displaylevels"]=grouparray[j]["displaylevels"];
					temparr.push(j);
					break;
				}
			}
		}
		eval('var arr2='+Object.toJSON(grouparray)+';');
		temparr=temparr.sort(function(a,b){return a-b});	
		for(var j=temparr.length-1;j>=0;j--){
			arr2.splice(temparr[j],1);
		}
		initdivarray("panel2_ldiv",arr2);
		initdivarray("panel2_rdiv", arr);
		showdivcontent("panel2_ldiv",2);
		showdivcontent("panel2_rdiv",3);
	}else if(panelindex==3){
		initdivarray("panel3_div",arr);
		showdivcontent("panel3_div",4);
	}
	
}
//页签显示
function showpanels(showarray){
	var divstr="";
	divstr +=headstr;
	for(var i=0;i<showarray.length;i++){
		if(showarray[i]==1){
			divstr +=listrarray[i];
		}
	}
	divstr+=middlestr;
	for(var i=0;i<showarray.length;i++){
		if(showarray[i]==1){
			divstr +=tablestrarray[i];
		}
	}
	divstr+=bottomstr;
	document.getElementById("pannel").innerHTML=divstr
	var tp1 = new Spry.Widget.TabbedPanels("tp1", { defaultTab: 0 });
}
//行选中背景色改变
function changebackcolor(obj){
	if(obj.checked==true){
		for(var i=0;i<obj.parentElement.parentElement.cells.length;i++){
			obj.parentElement.parentElement.cells[i].bgColor="#E1EDFE"
		}
	}else{
		for(var i=0;i<obj.parentElement.parentElement.cells.length;i++){
			obj.parentElement.parentElement.cells[i].bgColor=""
		}
	}
}
//保存
function saveschemas(){
	var jsonstrobj=new Object();
	jsonstrobj.schemasstr=Object.toJSON(queryschemaarray);
	jsonstrobj.deleteschemas=deleteschemastr.substr(1);
	
	var ajaxobj=new Tbajax("/report/savequeryschemas.do",Object.toJSON(jsonstrobj))
	if(ajaxobj.respText=="success"){
		window.close();
	}else{
		alert("保存失败!");
	}
	//刷新父窗体
	window.dialogArguments.toPrepareQuery();
}
function back(){
	window.close();
}
//设为默认
function setdefault(){
var divobj=document.getElementById("sub_tree");
	var tb =divobj.getElementsByTagName("table")[0].getElementsByTagName("tbody")[0];
	var index=-1;
	for(var i=0;i<tb.rows.length;i++){
		if(tb.rows[i].cells[1].bgColor=="#808080"){
			tb.rows[i].cells[1].bgColor="transparent"
			index=i;
		}
	}
	if(index==-1){
		alert("请选中一个方案");
		return;
	}
	for(var i=0;i<queryschemaarray.length;i++){
		if(queryschemaarray[i]["isdefault"]==1&&i!=index){
			queryschemaarray[i]["isdefault"]=0;
		}
		if(i==index){
			queryschemaarray[i]["isdefault"]=1;
		}
	}
	appendnode('sub_tree',queryschemaarray);
}
</script>
<body
	style="background-image: url(../../images/bg/main_bg.gif); background-repeat: repeat-x; background-position: 0px 0px">

	<div id="query_t">
		<span><span title="新增方案" class="add_btn" onclick="addschema()"
			onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
			onmousedown="doChangeBg1(this)"><a href="#">新增方案</a> </span> </span>
		<span><span title="修改方案" class="mod_btn" onclick="editschema()"
			onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
			onmousedown="doChangeBg1(this)"><a href="#">修改方案</a> </span> </span>
		<span><span title="删除方案" class="del_btn"
			onclick="deleteschema()" onmouseover="doChangBg(this)"
			onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a
				href="#">删除方案</a> </span> </span>
		<span><span title="复制方案" class="copyPlay_btn"
			onclick="copyschema()" onmouseover="doChangBg(this)"
			onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a
				href="#">复制方案</a> </span> </span>
		<%if (!usertype.equals("0")){%>
		<span><span title="复制方案到其他用户" class="accredit_btn"
			onclick="copyschematootherusers()" onmouseover="doChangBg(this)"
			onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a
				href="#">复制方案到其他用户</a> </span> </span>
		<%}%>
	    <!--
		<span><span title="设为默认" class="copyPlay_btn"
			onclick="setdefault()" onmouseover="doChangBg(this)"
			onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a
				href="#">设为默认</a> </span> </span>
		-->
	</div>

	
		<input type="hidden" id="schemasstr">
		<input type="hidden" id="deleteschemas">
		<div id="sub_tree"
			style="width: 25%; float: left; margin-left: 5px; margin-top: 10px; height: expression(document.body.offsetHeight-query_t.offsetHeight-50); overflow: auto;">
			<p class="tt">
			</p>
			<table border="0px">
				<thead>
					<tr>
						<td align="left">
							<img src="image/root.gif">
						</td>
						<td>
							<h5>
								方案
							</h5>
						</td>
					</tr>
				</thead>
				<tbody id="tb">
				</tbody>
			</table>
		</div>

	<div id="pannel"
		style="border: 1px; width: 68%; float: left; margin-left: 15px; margin-top: 10px; height: expression(document.body.offsetHeight-query_t.offsetHeight-50-40); overflow: auto;">
	</div>
	<div id="button_div"
		style="width: 68%; text-align:center;float: left; margin-left: 15px; margin-top: 10px; height: 30px;line-height:30px;overflow: hidden;">
		<input type="button" value="保存" class="button_style"
			onclick="saveschemas()" />
		<input type="button" value="返回" class="button_style" onclick="back()" />
	</div>
	<script type="text/javascript">
	appendnode('sub_tree',queryschemaarray)
	try{
		showpanels(new Array(schemasettingarray[0]["showtag1"],schemasettingarray[0]["showtag2"],schemasettingarray[0]["showtag3"]));
	}catch(err){
		alert("该报表未设置，不可配置!")
		back();
	}
	
</script>