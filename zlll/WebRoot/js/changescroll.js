function changescroll(obj){
	if(document.getElementById("tbl").scrollHeight+ 20< document.body.clientHeight-200){
		document.getElementById("tbl-container").style.height = document.getElementById("tbl").scrollHeight + 20;
	} else {
		document.getElementById("tbl-container").style.height = document.body.clientHeight - 200 +"px";
	}
	if(document.getElementById("menu_tree").scrollHeight+ 20< document.body.clientHeight-200){
		document.getElementById("menu_container").style.height = document.getElementById("menu_tree").scrollHeight + 20;
	} else {
		document.getElementById("menu_container").style.height = document.body.clientHeight - 200 +"px";
	}
}
function loadshow() {
	if(document.getElementById("tbl-container") != null){
		//if(document.getElementById("tbl").offsetHeight< 650px)	{
    	  	document.getElementById("tbl-container").style.height = document.getElementById("tbl").offsetHeight + 20;
		//}else {
		//	document.getElementById("tbl-container").style.height = 650px;
		//}
	}
	if(document.getElementById("tbl-container1")!= null){
		//if(document.getElementById("tbl1").offsetHeight< 400px)	{
			document.getElementById("tbl-container1").style.height = document.getElementById("tbl1").offsetHeight + 20;
		//}else {
		//	document.getElementById("tbl-container1").style.height = 400px;
		//}
	}
	if(document.getElementById("tbl-container2") != null){
		//if(document.getElementById("tbl2").offsetHeight < 200px)	{
			document.getElementById("tbl-container2").style.height = document.getElementById("tbl2").offsetHeight + 20;
		//}else {
		//	document.getElementById("tbl-container2").style.height = 250px;
		//}
	}
}

//ȫ��
var imgDir ="../images/actions/";
var calendar = "../images/calendar/";
var navDir = "../images/";
var fullscreenflag = true;
function fullScreenAll(obj) {
    if(obj != null){
        imgDir = obj;
    }
    if(fullscreenflag){      
        var obj = document.getElementById("nav_bartitle");
        obj.src =imgDir + "view-restorescreen.png";
        obj.alt = "��ԭ";
        obj.title = "��������ָ�Ϊԭ����С";
        switchBarAll();
        switchTitleBarAll();
        fullscreenflag = false;
    } else {        
        var obj = document.getElementById("nav_bartitle");
        obj.src =imgDir + "view-fullscreen.png";
        obj.alt = "ȫ��";
        obj.title = "�����������Ϊȫ��";
        switchBarAll();
        switchTitleBarAll();
        fullscreenflag = true;
    }
    parent.locationWidth();
}

function switchBarAll() {
    if (fullscreenflag) {        
        var obj = parent.document.getElementById("nav_bar");
        obj.src = navDir + "nav_bar_right.png";
        obj.alt = "�����˵���";
        parent.iLength1 = 1;
        parent.showMenu=false;
    } else {
        var obj = parent.document.getElementById("nav_bar");
        obj.src = navDir + "nav_bar_left.png";
        obj.alt = "�ر����˵���";
        parent.iLength1 = 200;
        parent.showMenu=true;       
    }
    parent.iLength3 = parent.iTotalLength - parent.iLength1 - parent.iSbarWidth;
    parent.locationWidth();
}

//����������
function switchTitleBarAll() {
    if (fullscreenflag) {       
        var obj = parent.document.getElementById("nav_bar1");
        obj.src = navDir + "nav_bar_down.png";
        obj.alt = "�򿪱�����";
        parent.document.all("headtfrm").style.display="none";
    } else {
        var obj = parent.document.getElementById("nav_bar1");
        obj.src = navDir +  "nav_bar_up.png";
        obj.alt = "�رձ�����";
        parent.document.all("headtfrm").style.display="";
    }
}

// ��ʾ/���ز�ѯ����
function doQuery1(queryButton) {
    var querydiv = document.getElementById("querylist");
    if (querydiv.style.display == "block") {
        querydiv.style.display = "none";
        queryButton.childNodes[0].innerHTML = "��ʾ��ѯ����";
		queryButton.style.backgroundImage='url(../images/done_btn/visible.gif)';
    } else {
        querydiv.style.display = "block";
        queryButton.childNodes[0].innerHTML = "���ز�ѯ����";
		queryButton.style.backgroundImage='url(../images/done_btn/hidden_query.gif)';
    }
}
function doQuery2(queryButton) {
    var querydiv = document.getElementById("querylist");
    if (querydiv.style.display == "block") {
        querydiv.style.display = "none";
        queryButton.childNodes[0].innerHTML = "��ʾ��ѯ����";
		queryButton.style.backgroundImage='url(/images/done_btn/visible.gif)';
    } else {
        querydiv.style.display = "block";
        queryButton.childNodes[0].innerHTML = "���ز�ѯ����";
		queryButton.style.backgroundImage='url(/images/done_btn/hidden_query.gif)';
    }
    Ext.lt.layout.doLayout();
}

// ��ʾ/���ذ���
function doShowHelp() {
    var querydiv = document.getElementById("showhelp");
    if (querydiv.style.display == "block") {
        querydiv.style.display = "none";
    } else {
        querydiv.style.display = "block";
    }
}

//��������ԭ��
function openwindow(url,name,iWidth,iHeight)
 {
    //var urlת����ҳ�ĵ�ַ
    //var name��ҳ���ƣ���Ϊ��;
    //var iWidth;�������ڵĿ��;
    //var iHeight;�������ڵĸ߶�;
    var iTop = (window.screen.availHeight-30-iHeight)/2;//��ô��ڵĴ�ֱλ��;
    var iLeft = (window.screen.availWidth-10-iWidth)/2;//��ô��ڵ�ˮƽλ��;
    window.open(url,name,'height='+iHeight+',,innerHeight='+iHeight+',width='+iWidth+',innerWidth='+iWidth+',top='+iTop+',left='+iLeft+',toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no');
 }
 
 var rowid=1000;
 function add_row(){
  var strdata="st_"+rowid;
  var tableobj=document.getElementById("table1");
  var rowobj=tableobj.insertRow(tableobj.rows.length);
  rowobj.bgColor ='white';
  var frm="'%Y-%m-%d'";
  var _name_inp ="st_"+rowid;
  var _name_inp_1 ="'st_"+rowid+"'";
  var _name_inp2 ="en_"+rowid;
  var _name_inp3 ="sd_"+rowid;
  var _id_inp ="st_"+rowid;
  var _id_inp2 ="en_"+rowid;
  var _id_inp3 ="sd_"+rowid;
      var _id_inp4 ="sn_"+rowid;

  var cell1=rowobj.insertCell(rowobj.cells.length);
  var cell2=rowobj.insertCell(rowobj.cells.length);
  var cell3=rowobj.insertCell(rowobj.cells.length);
      var cell4=rowobj.insertCell(rowobj.cells.length);
  cell1.id="td1_"+rowid;
  cell2.id="td2_"+rowid;
  cell3.id="td3_"+rowid;

  cell1.innerHTML = '<div align="center"><input type="text" id ="'
              +_id_inp4+'" name ="stockHolderName" class="main_lookup_input"/><button onclick = "openwindow()"></button></div>';

  cell2.innerHTML = '<div align="center"><input type="text" name="'+ _name_inp +'" value="" size="10"/><img src="../images/calendar/calendar.png" alt="ѡ������" onclick="return showCalendar('+ _name_inp_1 +', '+ frm +', null, true);" style="cursor:hand; border:0;"/></div>';
  cell3.innerHTML = '<div align="center"><input type="text" id ="'
      +_id_inp3+'" name ="lockedStockNumber" class="main_lookup_input"/></div>';
  cell4.innerHTML = "<div align='center'><input type='button' id ='bn_"
      +rowid+"' value='ɾ��' class='main_lookup_button' onclick='delete_row("
      +(tableobj.rows.length-1)+");leo()'></div>";
   rowid++;
}

function leo(){//��ɾ��һ�к󣬶Ը������½������������� ����leo
  var tableobj = document.getElementById("table1");
  for (i = 1; i < tableobj.rows.length; i++) {
    tableobj.rows[i].cells[3].innerHTML="<div align='center'><input type='button' value='ɾ��' class='main_lookup_button' onclick='delete_row("+i+");leo()'></div>";
  }
}

function delete_row(i){
  var tableobj=document.getElementById("table1");
  alert("ɾ����"+i+"��");
  tableobj.deleteRow(i);
}

function loadhiddenquery(flag){
	for(var i =0;i<document.getElementById("queryform").elements.length;i++){
   		var node = document.getElementById("queryform").elements[i];
   		if(((node.tagName=="INPUT"&&node.type=="text")||node.tagName == "SELECT")&&flag&&node.value!=""){
   			flag = false;
   			break
   		}
   	}
	var querydiv = document.getElementById("querylist");
    if (!flag) {
        querydiv.style.display = "block";
    } else {
        querydiv.style.display = "none";
    }
    if(document.getElementById("query_t")!=null&&document.getElementById("query_t").childNodes.length>0){
    	for(var i =0;i<document.getElementById("query_t").childNodes.length;i++){
    		var node = document.getElementById("query_t").childNodes[i];
    		//if(node.innerHTML&&node.innerHTML.indexOf("hidden_btn")!=-1&&flag){
    		if(node.innerHTML&&node.outerText&&node.outerText=="���ز�ѯ����"&&flag){
    			node.childNodes[0].childNodes[0].innerHTML = "��ʾ��ѯ����";
    			node.childNodes[0].title = '��ʾ��ѯ����';
    			node.childNodes[0].className='show_btn';
    			break
    		}else if(node.innerHTML&&node.outerText&&node.outerText=="��ʾ��ѯ����"&&!flag){
    			node.childNodes[0].childNodes[0].innerHTML = "���ز�ѯ����";
    			node.childNodes[0].title = '���ز�ѯ����';
    			node.childNodes[0].className='hidden_btn';
    			break
    		}
    	}
    }
}
/*����ѯ����SELECTʱ�ȼ������жϲ�ѯ���Ƿ���ʾ*/
function loadselectquery(){
	var selectObj = JQ("#querylist").find("select").find("option:selected");
	if(selectObj.length>0 && selectObj[0].value !=""){
		loadhiddenquery(true);
	}else{
		return;
	}
}