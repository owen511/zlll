//�ͻ������õ������
function showInfo(){
  window.showModalDialog(ROOT_PATH+"/portal/login/systemSet.jsp","","dialogWidth:436px;dialogHeight:430px;center:yes;help:no;resizable:no;status:no");
}
/******�������ǿ���޸�*****/
if("false"==passwordvalidate){
	window.attachEvent("onload",function(){
		showChangePas();
	})
}

function showChangePas(){
    var d_mask=document.getElementById('mask');
    var d_dialog = document.getElementById('LoadStatus'); 
    d_mask.style.width = document.body.offsetWidth ;
    d_mask.style.height=document.body.offsetHeight; 
    d_mask.style.visibility='visible';
    d_dialog.style.visibility='visible';
 	d_dialog.style.display='block';
    d_dialog.style.top = document.body.clientHeight / 2 - d_dialog.height/2;
    d_dialog.style.left =document.body.clientWidth / 2 - d_dialog.width/2;
}

/**һ��ʱ��û�в�����ϵͳ�Զ��˳�*/
var ukeytimer = null;
var lastEventTime = (new Date()).getTime();
function documentKeypress(){
     if(event.keyCode==13&&event.srcElement.type=='submit')//��׽�س���,�����ύ����
     {
		// ukeyCheck();
     } 
	 lastEventTime = (new Date()).getTime();
}

function documentEvent(){
	if(event.button==1&&event.srcElement.tagName=="A"){
		//ukeyCheck();
	}
	lastEventTime = (new Date()).getTime();
}
function timeout(){
	window.clearTimeout(ukeytimer);
	ukeytimer = window.setTimeout("logonout()", timelong);
}
function logonout(){
	if((new Date()).getTime()-lastEventTime>=timelong){
		//alert((timelong/(1000))+"��û�в�����ϵͳ�Զ��˳�");
		window.location = "/logout.do";
		//window.close();
	}else{
		ukeytimer = window.setTimeout("logonout()", timelong-((new Date()).getTime()-lastEventTime));
	}
}

if("-1"!=common_timeout){
	var timelong = 1000*60*common_timeout; //��ʱ�೤ʱ�䲻������ϵͳ�˳�
	ukeytimer = window.setTimeout("logonout()", timelong);
}

window.onresize = function () {
	if(document.body.clientWidth<700){
		window.resizeTo(700,700); 
	}	 
}