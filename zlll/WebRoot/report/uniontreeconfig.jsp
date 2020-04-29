<%@ page language="java" contentType="text/html; charset=GBK"
	pageEncoding="GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c"%>

<style>
.only_border{ border:1px #7891CC solid;}
.only_border_th{ border-right:1px #7891CC solid; border-bottom:1px #7891CC solid; font-size:13px; height:23px; line-height:23px;background-color:#e7ebf7; }
.only_border_td{ border-right:1px #7891CC solid; border-bottom:1px #7891CC solid; font-size:12px; height:23px; line-height:23px; background:#FFF;}
.only_border_leftR{ border-left:1px #7891CC solid; border-right:1px #7891CC solid; } 
.only_border_left{border-left:1px #7891CC solid;}
.only_border_right{border-right:1px #7891CC solid;}
.only_border_bottom{border-bottom:1px #7891CC solid;}
</style>
<script language="JavaScript" type="text/javascript"  src="/report/image/tbajax.js"></script>

<script type="text/javascript">
		
	   var reportid = <%=request.getAttribute("reportid")%>;
       //���п�Ŀ�����õ���ʾ����Ҫ��
       var allelementarr=<%=request.getAttribute("conditionList")%>;
       //��ǰ��Ŀ��ѡҪ�� 
       var allgrouparr=<%=request.getAttribute("groupList")%>;
       var grouparr=new Array();

       var old_compare = new Array();
       


//��ʾ��ĿҪ�ؼ����������
function showgrouplist(){ 
   elearr = allelementarr;
   grouparr = allgrouparr;
   old_compare = setcompare(grouparr);
   inittabpanel(elearr);
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
			//newTd.className="table01-td03" 
		}
	}else if(format==2){
		for(var i=0;i<divobj.contentarray.length;i++){
			var newTr=tb.insertRow(); 
			var newTd = newTr.insertCell(); 
			newTd.width="40%";
			//newTd.innerHTML="<input type=\"checkbox\" value="+i+" >"+divobj.contentarray[i]["elementcode"]+"-"+divobj.contentarray[i]["elementname"]; 
			 newTd.innerHTML="<input type=\"checkbox\" value="+i+" name=\"elementName\">"+divobj.contentarray[i]["elementname"];
			
			//newTd.className="table01-td03" 
		}
	}else if(format==3){
		for(var i=0;i<divobj.contentarray.length;i++){
		    
			var newTr=tb.insertRow(); 
			newTr.className="table01-td03";
			var newTd = newTr.insertCell(); 
			newTd.width="12%";
			newTd.className="only_border_td";
			newTd.innerHTML="<input type=\"checkbox\"  name=\"p2_ordercheck\" value="+i+">";
			var newTd = newTr.insertCell(); 
			newTd.width="55%";
			newTd.className="only_border_td";
			newTd.innerHTML=divobj.contentarray[i]["elementname"];
			//var newTd = newTr.insertCell(); 
			//newTd.width="30%";
			//newTd.className="only_border_bottom";
			//createselect(newTd,divobj.contentarray[i]["displaylevels"],divobj.contentarray[i]["displaylevel"],i)
		
		}
	}else if(format==4){
		for(var i=0;i<divobj.contentarray.length;i++){
			var newTr=tb.insertRow(); 
			newTr.className="main_table_title_content";
			var newTd = newTr.insertCell(); 
			 newTd.innerHTML="<input type=\"checkbox\"  name=\"p3_ordercheck\" value="+i+">";
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
//ȫ��ѡ��
function selectAllItem(pid,eid){
	checkboxarr=document.getElementsByName(eid);
	for(i = 0, iSize = checkboxarr.length;i<iSize;i++){
	   if(checkboxarr[i].name!=pid&&checkboxarr[i].disabled==false){
			checkboxarr[i].checked = document.getElementById(pid).checked;
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
	if(document.getElementById("selectAllLeftElement").checked==true){
		document.getElementById("selectAllLeftElement").checked = false;
	}
	if(document.getElementById("selectAllRightElement").checked==true){
		document.getElementById("selectAllRightElement").checked = false;
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
			checkboxarr[checkedarray[i]].parentElement.parentElement.cells[j].bgColor=""
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
function inittabpanel(elearr){
	var temparr=new Array();
	for(var i=0;i<grouparr.length;i++){
		for(var j=0;j<elearr.length;j++){
			if(elearr[j]["elementcode"].trim()==grouparr[i]["elementcode"].trim()){
				grouparr[i]["elementname"] = elearr[j]["elementname"];
				grouparr[i]["displaylevels"] = elearr[j]["displaylevels"];
				temparr.push(j);
				break;
			}
		}
	}
	
	//��Ŀ��Ҫ��-��ѡ���Ҫ�� =��ѡ��Ҫ��
	eval('var unselect='+Object.toJSON(elearr)+';');
	temparr=temparr.sort(function(a,b){return a-b});	
	for(var j=temparr.length-1;j>=0;j--){
		unselect.splice(temparr[j],1);
	}
	
	initdivarray("panel2_ldiv",unselect);
	initdivarray("panel2_rdiv", grouparr);
	showdivcontent("panel2_ldiv",2);
	showdivcontent("panel2_rdiv",3);
	
}
//����
function savetreeset(){
    if (isSettingChange()){
       alert("����δ�ı䣬�뷵��!");
	   return ;
    }
	//�Ǽ���Ҫ�����÷����仯�Ŀ�Ŀ
    var changearr = new Array();
    for(var j=0; j<grouparr.length; j++){
       changearr[changearr.length] = grouparr[j];
    }   
	var jsonstrobj=new Object();
	jsonstrobj.reportid=Object.toJSON(parseInt(reportid));
	jsonstrobj.changestr=Object.toJSON(changearr);
	
	var ajaxobj=new Tbajax("/report/saveuniontreeconfig.do",Object.toJSON(jsonstrobj))
	if(ajaxobj.respText=="success"){
		//window.close();
		changearr.length = 0;
		alert("����ɹ�!");
		window.close();
	}else{
		alert("����ʧ��!");
	}
	//ˢ�¸�����
	//window.dialogArguments.toPrepareQuery();
}
function back(){
	window.close();
}
 
 //ѡ��ÿ�Ŀʱ���Ǽ���������Ϣ
 function setcompare(old_arr){
    var old_row;
    var compare = new Array();
    for(var i=0; i<old_arr.length; i++){
  	    old_row = old_arr[i]["seq"]
  	          + old_arr[i]["elementcode"] 
  	          + old_arr[i]["displaylevel"]  
  	     compare.push(old_row); 
  	}
  	return  compare;
  	
}
  	
//�ж��Ƿ�ı�����
function isSettingChange(){
   	//���л���Ŀ֮ǰ����ȡ�ÿ�Ŀ����������Ϣ
   	var new_row;
   	var new_compare = new Array(); 
  	for(var j=0; j<grouparr.length; j++){
  	    var seq = (j+1);
  	    new_row = seq
  	          + grouparr[j]["elementcode"] 
  	          + grouparr[j]["displaylevel"]  
  	    new_compare.push(new_row); 
  	}
  	
  	//�Ƚϸÿ�Ŀ�Ľ�����뿪ʱ������Ϣ�����б仯�򽫸ÿ�ĿID�Ǽǵ��仯�б�
  	var ischange = (old_compare.sort().toString() == new_compare.sort().toString());
    return (ischange )
}



</script>
	<ul class="TabbedPanelsTabGroup">
		<li class="TabbedPanelsTab" tabindex="0">�����������ʾ����</li>
	</ul>
	<div class="TabbedPanelsContentGroup">
		<table width="84%" class="only_border" border="0" cellspacing="0" cellpadding="0">
			<tr>
				<th width="30%" nowrap="nowrap" class="only_border_th">
				<input type="checkbox" onclick="selectAllItem('selectAllLeftElement','elementName');" id="selectAllLeftElement">��ѡҪ��&nbsp;&nbsp; 
				</th>
				<th width="10%" nowrap="nowrap" class="only_border_th">&nbsp;</th>
				<th width nowrap="nowrap" class="only_border_th">
				<table border="0px" cellpadding="0" cellspacing="0" style="font-size: 12px;width: 100%;text-indent: 1px;overflow: auto;text-align: center;">
					<tr>
						<td width="12%">
						<input type="checkbox" id="selectAllRightElement" onclick="selectAllItem('selectAllRightElement','p2_ordercheck');"></td>
						<td width="55%" class="only_border_left">Ҫ������</td>
					</tr>
				</table>
				</th>
			</tr>
			<tr style="height: expression(document . body .offsetHeight-50-100); border: 0px red solid;">
				<td align="left" nowrap="nowrap" class="only_border_right">
				<div id="panel2_ldiv" style="vertical-align: top; height: 100%;">
					<table border="0px" cellpadding="0" cellspacing="0">
					</table>
				</div>
				</td>
				<th align="center" class="only_border_right">
				<input type="button" value=" �� " title="����" class="btn_style" onclick="moveupordown('panel2_rdiv','up')" /><br />
				<br />
				<input type="button" value=" �� " title="����" class="btn_style" onclick="moveupordown('panel2_rdiv','down')" /><br />
				<br />
				<input type="button" value=" �� " title="����" class="btn_style" onclick="movetdcontent('panel2_ldiv','panel2_rdiv')" /><br />
				<br />
				<input type="button" value=" �� " title="����" class=" btn_style" onclick="movetdcontent('panel2_rdiv','panel2_ldiv')" /></th>
				<td align="left" nowrap="nowrap">
				<div id="panel2_rdiv" align="left" style="vertical-align: top; height: 100%;">
					<table border="0px" cellspacing="0" cellpadding="0" style="font-size: 12px;padding-bottom: 3px;width: 100%;text-indent: 1px;overflow:auto;text-align: center;">
						</div>
					</table>
				</div>
				</div>
				</td>
			</tr>
		</table>
	</div>
	 
	
	<div id="button_div"
		style="width:65%; text-align:center;float: left; margin-left: 50px; margin-top:10px; height: 20px;line-height:20px;overflow: hidden;">
		<input type="button" value="����" class="button_style"
			onclick="savetreeset()" />
		<input type="button" value="����" class="button_style" onclick="back()" />
	</div>
	<script type="text/javascript">
	     showgrouplist();
	</script>
</body>
</html>
