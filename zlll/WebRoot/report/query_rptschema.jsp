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
		listrarray[0]="<li class=\"TabbedPanelsTab\" tabindex=\"0\">��ѯ����</li>";
		listrarray[1]="<li class=\"TabbedPanelsTab\" tabindex=\"0\">���鼰����</li>";
		listrarray[2]="<li class=\"TabbedPanelsTab\" tabindex=\"0\">����ʾ</li>";
		var tablestrarray=new Array();
		tablestrarray[0]=" <table width=\"85%\" class=\"main_table_98\" border=\"0\" cellspacing=\"0\"> <tr class=\"main_table_title\"><th width=\"45%\" nowrap=\"nowrap\"> ��ʾ��ѯ���� </th><th width=\"10%\" nowrap=\"nowrap\"> </th><th width=\"45%\" nowrap=\"nowrap\"> ����ʾ��ѯ����&nbsp; </th> </tr> <tr class=\"main_table_title_letter\" style=\"height: expression(document . body . offsetHeight-query_t . offsetHeight-50-100); border: 1px red solid;\"> <td align=\"left\" nowrap=\"nowrap\"> <div id=\"panel1_ldiv\" style=\"vertical-align: top; height: 100%;\"> <table border=\"0px\"> <tbody> </tbody> </table> </div> </td> <th align=\"center\"> <input type=\"button\" value=\">\" class=\"btn_style\" onclick=\"movetdcontent('panel1_ldiv','panel1_rdiv')\" /> <br /> <br /> <br /> <input type=\"button\" value=\"<\" class=\" btn_style\" onclick=\"movetdcontent('panel1_rdiv','panel1_ldiv')\" /></th><td align=\"left\" nowrap=\"nowrap\"><div id=\"panel1_rdiv\" align=\"left\" style=\"vertical-align: top; height: 100%;\"><table border=\"0px\"><tbody></tbody></table></div></td></tr></table>"
		tablestrarray[1]="<table width=\"85%\" class=\"main_table_98\" border=\"0\" cellspacing=\"0\"> <tr class=\"main_table_title\"> <th width=\"30%\" nowrap=\"nowrap\"> ��ѡҪ���б� 	</th><th width=\"10%\" nowrap=\"nowrap\"> </th> <th width=\"\" nowrap=\"nowrap\"> ��ѡҪ���б�&nbsp;<input type=\"button\" value=\"����\" class=\"button_style\" style=\"margin: 0;\" onclick=\"moveupordown('panel2_rdiv','up')\" /> <input type=\"button\" value=\"����\" class=\"button_style\" style=\"margin: 0;\" onclick=\"moveupordown('panel2_rdiv','down')\" /> </th> </tr> <tr class=\"main_table_title_letter\"	style=\"height: expression(document . body .  offsetHeight-query_t .    offsetHeight-50-100); border: 0px red solid;\"> <td align=\"left\" nowrap=\"nowrap\"> <div id=\"panel2_ldiv\" style=\"vertical-align: top; height: 100%;\"><table border=\"0px\"><tbody> </tbody></table></div> </td> <th align=\"center\"> <input type=\"button\" value=\">\" class=\"btn_style\" onclick=\"movetdcontent('panel2_ldiv','panel2_rdiv')\" /> <br /> <br /> <br /><input type=\"button\" value=\"<\" class=\" btn_style\"  onclick=\"movetdcontent('panel2_rdiv','panel2_ldiv')\" /> </th> <td align=\"left\" nowrap=\"nowrap\"> <div id=\"panel2_rdiv\" align=\"left\" style=\"vertical-align: top; height: 100%;\">  <table border=\"0px\" cellspacing=\"0\" class=\"main_table_98\"> <tHead class=\"main_table_title\">  <tr>  <td>  </td>  <td>  Ҫ�ر��� </td>  <td> Ҫ������</td> <td>��ʾ����</td><td>  ���ϻ��� </td> <td> ��ʾ  </td> </tr>  </tHead><tbody>	</tbody>	</table></div>	</td></tr></table>"
		tablestrarray[2]="<table width=\"85%\" class=\"main_table_98\" border=\"0\" cellspacing=\"0\"> <tr class=\"main_table_title\">  <th width=\"42%\" nowrap=\"nowrap\"> ���ñ�����ʾ��    </th>  </tr>  <tr class=\"main_table_title_letter\"  style=\"height: expression(document .   body .  offsetHeight-query_t .  offsetHeight-50-100); border: 0px red solid;\"> <td align=\"left\" nowrap=\"nowrap\"> <div id=\"panel3_div\" style=\"vertical-align: top; height: 100%;\"> <table border=\"0px\" cellspacing=\"0\" class=\"main_table_98\"><tHead class=\"main_table_title\">  <tr>    <td>  ������ </td>  <td> ����������</td> <td>��ʾ</td> </tr>  </tHead><tbody></tbody></table></div></td> </tr> </table>"
		
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
//��ʼ���ڵ�
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
	var userid = <%=request.getAttribute("userid")%>; //��ǰ�û�USERID
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
		if(appendarray[i]["userid"]!=userid){ //����Ա�Ȳ���Ĭ�������������ǰ�û�û��ѡ��Ĭ�ϴ��������Ĭ��������
			if(appendarray[i]["isdefault"]==1)isDef = true;
			newTd2.innerHTML=appendarray[i]["schemaname"];
			tmp_userscm[tmp_userscm.length] = {
					 isdefault:appendarray[i]["isdefault"],
					 td:newTd2
			};
		}else{
			if(appendarray[i]["isdefault"]==1)needDef = false;
			newTd2.innerHTML=(appendarray[i]["isdefault"]==1)?(appendarray[i]["schemaname"]+" <Ĭ��>"):appendarray[i]["schemaname"];
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
				JQ("input[value!='����'],span.mod_btn,span.del_btn,span.copyPlay_btn").attr("disabled",false);
			}else{
				JQ("input[value!='����'],span.mod_btn,span.del_btn,span.copyPlay_btn").attr("disabled",true);
			}
		}
		if(appendflag==1&&i==(appendarray.length-1)){
			newTd2.id="deleteTD";
			newTd2.innerHTML="<input type='text' class='box1' value='"+appendarray[i]["schemaname"]+"' id='schema_temp' onblur='setvalue(-1)'>";
			var textobj=document.getElementById("schema_temp");
			textobj.focus();
			textobj.focus();  //һ�䲻�У�ֻ������һ��
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
				tmp_userscm[i].td.innerHTML=tmp_userscm[i].td.innerHTML+" <Ĭ��>";
			}
		}
	}
}
//��������
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
		alert("��ѡ��Ҫ�޸ĵķ���");
		return;
	}
  appendnode('sub_tree',queryschemaarray,2, index);
}
//���Ʒ���
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
		alert("��ѡ��Ҫ���Ƶķ���");
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
//ɾ������
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
		alert("��ѡ��Ҫɾ���ķ���");
		return;
	}
	var usercode = '<%=request.getAttribute("usercode")%>'; //��ǰ�û�USERCODE
	if(usercode!=null&&usercode=="IFMIS"){
		if(!confirm('�ò�ѯ�������ܱ������û�����ΪĬ�ϲ�ѯ������ȷ��ɾ���÷�����')){
			return;
		}
	}else{
		if(!confirm("ȷ��ɾ������["+queryschemaarray[index]["schemaname"]+"]?")){
			return;
		}
	}
	if(queryschemaarray[index]["schemaid"]!=0)
		deleteschemastr+=(","+queryschemaarray[index]["schemaid"])
	queryschemaarray.splice(index,1);
	appendnode('sub_tree',queryschemaarray);
	showpanels(new Array(schemasettingarray[0]["showtag1"],schemasettingarray[0]["showtag2"],schemasettingarray[0]["showtag3"]));
}

//ȡ������
function cancelschema(index){
	for(var i=0;i<queryschemaarray.length;i++){
	  if(queryschemaarray[i]["schemaname"]==""){
	    queryschemaarray.splice(index,1);
	    appendnode('sub_tree',queryschemaarray);
	    showpanels(new Array(schemasettingarray[0]["showtag1"],schemasettingarray[0]["showtag2"],schemasettingarray[0]["showtag3"]));
	  }
	}	
	
}

//���÷���������ʾ
function setvalue(ignoreindex){
	if(event.srcElement.value==""){
		
		if(confirm("�������Ʋ���Ϊ��,����¼�뷽������?")){
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
			alert("�Ѵ��ڸ÷�������");
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
//ҳǩ��ʾ
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
//�����ƶ�
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
//�����ƶ�
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
//��ѡ�����¼�
function changepra(divname,index){
	document.getElementById(divname).contentarray[index][event.srcElement.name]=Math.abs(event.srcElement.value-1);
}
//���������˵�������¼�
function createselect(obj,length,selectvalue,index){
	var mySelect = document.createElement('select'); 
	mySelect.name ='displaylevel'; 
	mySelect.id=index;
	obj.appendChild(mySelect);
	for(var i=1;i<length+1;i++){
		mySelect.add(new Option("��"+i+"��",i)); 
	}
	mySelect.value=selectvalue;
	mySelect.onchange=function changedisplaylevel(){
 		document.getElementById('panel2_rdiv').contentarray[event.srcElement.id][event.srcElement.name]=event.srcElement.value;
	} 
}
//������
function initdivarray(divname,initarray){
	document.getElementById(divname).contentarray=initarray;
}

//��ʼ��panel--��ѯ����
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
//ҳǩ��ʾ
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
//��ѡ�б���ɫ�ı�
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
//����
function saveschemas(){
	var jsonstrobj=new Object();
	jsonstrobj.schemasstr=Object.toJSON(queryschemaarray);
	jsonstrobj.deleteschemas=deleteschemastr.substr(1);
	
	var ajaxobj=new Tbajax("/report/savequeryschemas.do",Object.toJSON(jsonstrobj))
	if(ajaxobj.respText=="success"){
		window.close();
	}else{
		alert("����ʧ��!");
	}
	//ˢ�¸�����
	window.dialogArguments.toPrepareQuery();
}
function back(){
	window.close();
}
//��ΪĬ��
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
		alert("��ѡ��һ������");
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
		<span><span title="��������" class="add_btn" onclick="addschema()"
			onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
			onmousedown="doChangeBg1(this)"><a href="#">��������</a> </span> </span>
		<span><span title="�޸ķ���" class="mod_btn" onclick="editschema()"
			onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
			onmousedown="doChangeBg1(this)"><a href="#">�޸ķ���</a> </span> </span>
		<span><span title="ɾ������" class="del_btn"
			onclick="deleteschema()" onmouseover="doChangBg(this)"
			onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a
				href="#">ɾ������</a> </span> </span>
		<span><span title="���Ʒ���" class="copyPlay_btn"
			onclick="copyschema()" onmouseover="doChangBg(this)"
			onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a
				href="#">���Ʒ���</a> </span> </span>
		<%if (!usertype.equals("0")){%>
		<span><span title="���Ʒ����������û�" class="accredit_btn"
			onclick="copyschematootherusers()" onmouseover="doChangBg(this)"
			onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a
				href="#">���Ʒ����������û�</a> </span> </span>
		<%}%>
	    <!--
		<span><span title="��ΪĬ��" class="copyPlay_btn"
			onclick="setdefault()" onmouseover="doChangBg(this)"
			onmouseout="doReturn(this)" onmousedown="doChangeBg1(this)"><a
				href="#">��ΪĬ��</a> </span> </span>
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
								����
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
		<input type="button" value="����" class="button_style"
			onclick="saveschemas()" />
		<input type="button" value="����" class="button_style" onclick="back()" />
	</div>
	<script type="text/javascript">
	appendnode('sub_tree',queryschemaarray)
	try{
		showpanels(new Array(schemasettingarray[0]["showtag1"],schemasettingarray[0]["showtag2"],schemasettingarray[0]["showtag3"]));
	}catch(err){
		alert("�ñ���δ���ã���������!")
		back();
	}
	
</script>