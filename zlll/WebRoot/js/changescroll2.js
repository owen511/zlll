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
        queryButton.title = '��ʾ��ѯ����';
		queryButton.style.backgroundImage='url(../images/done_btn/visible.gif)';
    } else {
        querydiv.style.display = "block";
        queryButton.childNodes[0].innerHTML = "���ز�ѯ����";
        queryButton.title = '���ز�ѯ����';
		queryButton.style.backgroundImage='url(../images/done_btn/hidden_query.gif)';
    }
}
function doQuery2(queryButton) {
    var querydiv = document.getElementById("querylist");
    if (querydiv.style.display == "block") {
        querydiv.style.display = "none";
        queryButton.childNodes[0].innerHTML = "��ʾ��ѯ����";
        queryButton.title = '��ʾ��ѯ����';
		queryButton.style.backgroundImage='url(/images/done_btn/visible.gif)';
    } else {
        querydiv.style.display = "block";
        queryButton.childNodes[0].innerHTML = "���ز�ѯ����";
        queryButton.title = '���ز�ѯ����';
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


/*�˵�����*/

var count = 0;
function showNext(){
   //alert("next");
   /*����ȡ��ul����*/
   var m_obj = document.getElementById("m_ul");
   var ul_length= m_obj.offsetWidth;
   //alert(m_obj.offsetWidth);//1633
  var x=m_obj.childNodes;
   //alert(x.length);//19
  //var li_in = new Array();
  var c = idd.offsetWidth;
   //alert(c);//1206
  
 //alert(x[count].innerHTML);
  if(c<ul_length){
  x[count].style.display="none";
  x[count+1].style.display="none";
  //alert(x[count].style.display);
  ul_length = ul_length - x[count].offsetWidth - x[count+1].offsetWidth;
  //alert(ul_length);
  count+=2;
  }
/*for (i=0;i<x.length;i++){
  li_in[i] = x[i];
  alert(x[0].style.display);
  
  
  //x[0].style.display=
  //ȡ���ڵ��е�����
  //var content = li_in.innerHTML;
  //�õ��ڵ������
  //alert(x[i].nodeName);
  //alert(li_in[i]);
  //�����ul�ĳ��ȣ�������Ϊ��λ
  //alert(m_ul.offsetWidth);
  
 }*/
}
function showPre(){
   //alert("pre");
   var m_obj = document.getElementById("m_ul");
   var ul_length= m_obj.offsetWidth;
   //alert(ul_length);
   var x=m_obj.childNodes;
   var c = idd.offsetWidth;
   if(count!=0&&count>0){
      //alert(x.length);
	  //alert(count);
	  x[count-1].style.display="";
	  x[count].style.display="";
	  //x[x.length-1].style.display="none";
	  //alert(x[count-1].offsetWidth);
	  ul_length = ul_length - x[count-1].offsetWidth - x[count].offsetWidth;
	 // alert(ul_length );
	  count-=2;
        }
		else {
		//alert("yes");
		}
}
	
	
	function mvqMOv(imgid,divname) {
	  var img=document.getElementById(imgid);
		var mvqPDiv = document.getElementById(divname); 
		mvqPDiv.style.left=   img.offsetLeft-80;   
		mvqPDiv.style.top=   img.offsetTop+65;   
		mvqPDiv.style.visibility = "visible";
	
	}
	
	function mvqMOu(imgid,ev) {
		var x;var y;
		//if(ev.pageX || ev.pageY){
		//	x=ev.pageX;
		//	y=ev.pageY;
	  //}else{
	  //	x=ev.clientX + document.body.scrollLeft - document.body.clientLeft;
	  //	y=ev.clientY + document.body.scrollTop  - document.body.clientTop;
	  //}
		//var img=document.getElementById(imgid);
		//var mvqPDiv = document.getElementById("panelDiv"); 
		//mvqPDiv.style.visibility = "hidden";
	}
	function panelMOv(divname) {
		var p = document.getElementById(divname);
		p.style.visibility = "visible";
	}

	function panelMOu(divname) {
		var p = document.getElementById(divname);
		p.style.visibility = "hidden";
	}