//�������й��ܰ�ť������
//ָ��ģ��ʹ��
function disabledButton(){
	var element = document.getElementsByTagName('input');
	var length = element.length;
	
	for(var i = 0; i < length; i++){
		if(element[i].type=="button" || element[i].type=="submit"){
			if(element[i].getAttribute("onclickbak") == null){
				element[i].onclickbak = element[i].onclick;
				element[i].onclick = null;
			}
		}
	}
}
function enabledButton(){
	var element = document.getElementsByTagName('input');
	var length = element.length;
	
	for(var i = 0; i < length; i++){
		if(element[i].type=="button" || element[i].type=="submit"){
			if(element[i].getAttribute("onclickbak")!=null){
				element[i].onclick = element[i].onclickbak;
			}
		}
	}
}
// JavaScript Document
/*������ѡ����ĺ���*/
/*ʹ��ʱע���������Ԫ�ص����֣������Ǹ�form��*/
/*checkbox��name���Ե���������ǰname="theId"*/
/*ȫѡ*/
// ȫ��ѡ�л�ȫ��ȡ�� 
function checkAll() {
    for (var i = 0; i < document.forms[0].elements.length; i++) {
        var e = document.forms[0].elements[i];
        if (e.name == "theId") {
            e.checked = document.forms[0].allbox.checked;
        }
    }
	
} 
/*��������ʾ�汾�ĺ���*/
/*ע����ʾ�����id��������������id="showVersion"*/	
function showVersion(){
	//alert("version");
	var showArea = document.getElementById("showVersion");
	if(showArea.style.display=="none"){
		//alert(showArea);
		showArea.style.display="block";
		
	}else{
		showArea.style.display="none";
	}
	
}
/*ʵ�����ز���ģ��Ĺ���*/
var menuheight =0 ;
var topheight =0 ;
function doHiddenTop(obj){
	//alert("���ض���");
	var top= document.getElementById("window_top");
	//alert(top.style.display);
	if(top.offsetHeight==0){
		top.style.height=menuheight+topheight;
		obj.title = "�����ϲ�";
		//obj.style.backgroundImage = "url(/images/bg/hidden_top_blue_deep.gif)";
		obj.className="";
		obj.id="hiddenTopBar";
		screenStatus(false);	
	}
	else{
		top.style.height=0;
		obj.title = "չ���ϲ�";
		obj.id="";
		obj.className="hiddenTopBar";
		var left_tree=document.getElementById("left_tree");
		if(left_tree.style.display=="block")
			screenStatus(false);
		else
		     screenStatus(true);	
		//obj.style.backgroundImage = "url(/images/bg/show_top_blue_deep.gif)";
	}
	reinit();
	showWorkPanel();
}
/**
*�ı�ʱ���³�ʼ�����϶��ָ���
**/
function reinit(){	
	//�ı�ʱ���³�ʼ�����϶��ָ���
	if(typeof(fnInit)== "function"){
		fnInit();
	}
}
function doHiddenLeft(obj){
	var left_tree=document.getElementById("left_tree");
	if(left_tree.style.display=="block"){
		left_tree.style.display="none";
		obj.title = "չ�������";
		obj.className="showLeftBar";
		
		var top= document.getElementById("window_top");
		if(top.offsetHeight>0)
			screenStatus(false);
		else
		    screenStatus(true);		
	}else{
		left_tree.style.display="block";
		obj.title = "���������";
		obj.className="hideLeftBar";
		screenStatus(false);
	}
	showWorkPanel();
	Ext.lt.layout.doLayout();
}

function doHidden_query(){
	var query=document.getElementById("querylist");
	if(query.style.display=="block"){
		query.style.display="none";
	}
	else{
		query.style.display="block";
	}
}

function screenStatus(isOri){
    var obj = document.getElementById("full_screen_img");
	if(!obj) return; 
	var basePath = obj.src;
	basePath = basePath.substring(0,basePath.indexOf("/images/"));
	var tdobj = document.getElementById("full_screen_text");
	if (isOri) {
        obj.src = basePath + "/images/actions/view-restorescreen.png";
        obj.alt = "��ԭ";
        obj.title = "��������ָ�Ϊԭ����С";
        tdobj.innerHTML="��ԭ";
        tdobj.title = "��������ָ�Ϊԭ����С";
                
    } else {
        obj.src = basePath + "/images/actions/view-fullscreen.png";
        obj.alt = "ȫ��";
        obj.title = "�����������Ϊȫ��";
        tdobj.innerHTML="ȫ��";
        tdobj.title = "�����������Ϊȫ��";      
    }
}
// ȫ��
function fullscreen() {
	var obj = document.getElementById("full_screen_img");
	if(!obj) return; 
	var basePath = obj.src;
	basePath = basePath.substring(0,basePath.indexOf("/images/"));
	var tdobj = document.getElementById("full_screen_text");
    if (obj.src.indexOf("view-fullscreen.png")>-1) {
        obj.src = basePath + "/images/actions/view-restorescreen.png";
        obj.alt = "��ԭ";
        obj.title = "��������ָ�Ϊԭ����С";
        tdobj.innerHTML="��ԭ";
        tdobj.title = "��������ָ�Ϊԭ����С";
                
    } else {
        obj.src = basePath + "/images/actions/view-fullscreen.png";
        obj.alt = "ȫ��";
        obj.title = "�����������Ϊȫ��";
        tdobj.innerHTML="ȫ��";
        tdobj.title = "�����������Ϊȫ��";      
    }
    
}

function screeMaintain() {
    var top= document.getElementById("window_top");
	var left_tree=document.getElementById("left_tree");
	var status ;
	if(top.offsetHeight == 0 && left_tree.style.display=="none")
	   status = 1;
	else
	   status =0;
	var obj = document.getElementById("full_screen_img");
	if(!obj) return; 
	var basePath = obj.src;
	basePath = basePath.substring(0,basePath.indexOf("/images/"));
	var tdobj = document.getElementById("full_screen_text");
    if (status==1) {
        obj.src = basePath + "/images/actions/view-restorescreen.png";
        obj.alt = "��ԭ";
        obj.title = "��������ָ�Ϊԭ����С";
        tdobj.innerHTML="��ԭ";
        tdobj.title = "��������ָ�Ϊԭ����С";
                
    } else {
        obj.src = basePath + "/images/actions/view-fullscreen.png";
        obj.alt = "ȫ��";
        obj.title = "�����������Ϊȫ��";
        tdobj.innerHTML="ȫ��";
        tdobj.title = "�����������Ϊȫ��";      
    }
    
}
function fullscreen2() {
	var obj = document.getElementById("full_screen_img");
	if(!obj) rerturn; 
	var tdobj = document.getElementById("full_screen_text");
    if (obj.src.indexOf("view-fullscreen.png")>-1) {
		
        obj.src ="/images/actions/view-restorescreen.png";
        obj.alt = "��ԭ";
        obj.title = "��������ָ�Ϊԭ����С";
        tdobj.innerHTML="��ԭ";
        tdobj.title = "��������ָ�Ϊԭ����С";
                
    } else {
        obj.src ="/images/actions/view-fullscreen.png";
        obj.alt = "ȫ��";
        obj.title = "�����������Ϊȫ��";
        tdobj.innerHTML="ȫ��";
        tdobj.title = "�����������Ϊȫ��";       
    }
}
var old_window_top_height = 80;
function doHiddenAll(){
	fullscreen();
	var top= document.getElementById("window_top");
	var left_tree=document.getElementById("left_tree");
	
	var tobj= document.getElementById("hidden_top").childNodes[0];
	var index = 0;
	if(document.getElementById("hidden_left").childNodes.length==3)
	    index = 1;
	var lobj= document.getElementById("hidden_left").childNodes[index];
	var main = document.getElementById("main");
	if(top.offsetHeight!= 0){
		old_window_top_height = menuheight+topheight;
				
	}
	if(top.offsetHeight != 0 && left_tree.style.display=="none"){
		//alert(left_tree.style.display);
		//main.style.width = document.body.offsetWidth - document.getElementById("left_tree").offsetWidth - document.getElementById("switchBar").offsetWidth ;
		left_tree.style.display="block";
		
		lobj.title = "���������";
		lobj.className="hideLeftBar";
		
	} else if(top.offsetHeight == 0&&left_tree.style.display=="block"){
		top.style.height = menuheight+topheight;
		
		tobj.title = "�����ϲ�";
		tobj.className="";
		tobj.id="hiddenTopBar";
		
	}	
	if(top.offsetHeight != 0 &&left_tree.style.display=="block"){
		//main.style.width = document.body.offsetWidth - document.getElementById("switchBar").offsetWidth;
		left_tree.style.display="none";
		top.style.height = 0 ;
		
		
		tobj.title = "չ���ϲ�";
		tobj.id="";
		tobj.className="hiddenTopBar";
		
		lobj.title = "չ�������";
		lobj.className="showLeftBar";
			
	} else if(top.offsetHeight == 0&&left_tree.style.display=="none"){
		left_tree.style.display="block";
		//main.style.width = document.body.offsetWidth - document.getElementById("left_tree").offsetWidth - document.getElementById("switchBar").offsetWidth ;
		top.style.height = menuheight+topheight;
		
		tobj.title = "�����ϲ�";
		tobj.id="hiddenTopBar";
		tobj.className="";
		
		lobj.title = "���������";
		lobj.className="hideLeftBar";		
	}
	reinit();
	showWorkPanel();
	Ext.lt.layout.doLayout();
}
function clearInputRule(element){} 
//��ѡ 
function openwindowsingle(url){
   // zhangjusuo 20090711 ���������
	 var iWidth=300;
	 var iHeight =450;
	 var iTop = (window.screen.availHeight-30-iHeight)/2;       //��ô��ڵĴ�ֱλ��;
     var iLeft = (window.screen.availWidth-10-iWidth)/2;           //��ô��ڵ�ˮƽλ��;
	 
	 window.open(url, 'newWindow','width='+iWidth+',height='+iHeight+',top='+iTop+',left='+iLeft+',status=yes,toolbar=no,menubar=no,directories=no,resizable=no,Scrollbars=yes,help:No');
}
//��ѡ
function openwindowsingle1(mainmenu,submenu,vchtypecode,vchfieldcode){
	var url = ROOT_PATH+"/common/elementtree.do?mainmenu="+mainmenu+"&submenu="+submenu+"&vchtypecode="+vchtypecode+"&vchfieldcode="+vchfieldcode;
	result = window.open(url, 'newWindow','dialogWidth=400px,dialogHeight=450px,status=yes,toolbar=no,menubar=no,directories=no,resizable=no,Scrollbars=no,help:No');
	return result;
}

function selectElememt(mainmenu,submenu,vchtypecode,vchfieldcode,backinput,isOnlyData){
	var url;
	if(isOnlyData)
		return selectElememtByUrl(mainmenu,submenu,vchtypecode,vchfieldcode,backinput,url,isOnlyData);
	selectElememtByUrl(mainmenu,submenu,vchtypecode,vchfieldcode,backinput);
}


/*
* ������ܷ�������ʽ���Դ��������ʱ�����������ͳһ�����������֮���ֹ
* added by xyq,2009-02-23
*/
function selectElememtByFundtype(mainmenu,submenu,vchtypecode,vchfieldcode,backinput,fundtype){
	if(fundtype!=undefined){
		selectElememtByUrlAndFundtype(mainmenu,submenu,vchtypecode,vchfieldcode,backinput,fundtype);
	}
	else{
	  return;	
	}	
}



/*******************************************
* ���е���������˵��
* @mainmenu 		 ����ҳ���mainmenu
* @submenu			 ����ҳ���submenu
* @vchtypecode       ����ƾ֤��
* @vchfieldcode      Ԫ��ID
* @backinput         ҳ��Ԫ�ض���(Ϊ�����ֲ�ͬ����)
* @allField			 �Ƿ�ȫ������0��ȫ�� 1������
* @elementfilter     ��������
* @obj 			      ��ѯ��������ƹ������
* @vou				 �༭��������ƹ������
* @defaultvalue		 Ĭ��ֵ	
* @anyvaluetag		 ����ֵ��־
* @parsetype		 ������ʽ
* @isOnlyData	     �����б�ȡ���ݿ���ͨ��ajax��ȡ��ҳ����ת
* @Checkflag		 ��ѡ������ֻѡһ���ڵ����⣨����true��������false��
*********************************************/
/*ȡ������汾��Ȼ����ݰ汾�ŷֱ�ȷ��ģ̬���ڵĴ�С*/
var Sys = {};
var ua = navigator.userAgent.toLowerCase();
if (window.ActiveXObject)
Sys.ie = ua.match(/msie ([\d.]+)/)[1]
else if (document.getBoxObjectFor)
Sys.firefox = ua.match(/firefox\/([\d.]+)/)[1]
else if (window.MessageEvent && !document.getBoxObjectFor)
Sys.chrome = ua.match(/chrome\/([\d.]+)/)[1]
else if (window.opera)
Sys.opera = ua.match(/opera.([\d.]+)/)[1]
else if (window.openDatabase)
Sys.safari = ua.match(/version\/([\d.]+)/)[1];

function setShowDiaSize(){
	  var diaSize = {
		  ieHeight:500,
		  ieWidth:325
	  }
	  if(Sys.ie == '7.0') //IE7���,��IE6������¼�50px 
	  {
	    diaSize.ieHeight -= 35;
	  }
	  else if(Sys.ie == '8.0') //IE8�������IE6������¼�60px   
	  { 
	    diaSize.ieHeight -= 55;
	  }
	  return diaSize;
}
/*	��ѯ����ѡ�����÷���
* wy modified 20090827 �ж��Ƿ�ȫ�������� 0��ȫ�� 1������
*/
function selectElememtWithAllField(mainmenu,submenu,vchtypecode,vchfieldcode,backinput,allField,elementfilter,obj,jsFunction){
	jsFunctionname = jsFunction;
	selectElememtByUrlWithAllField(mainmenu,submenu,vchtypecode,vchfieldcode,backinput,allField,elementfilter,obj);
}

/*
* �����ֶ�SHOWALL�����ֶ��ж��Ƿ�ȫ�����ػ򲿷ּ�����
* added by wy,2009-08-27
*/
function selectElementTreeWithFieldCTRL(mainmenu,submenu,vchtypecode,vchfieldcode,backinput,vou,defaultvalue,anyvaluetag,parsetype,allField){
	//wy add 20090923
	var selvalue = backinput.valuecode != undefined ? backinput.valuecode : backinput.value;
	window.selvalue = selvalue;
	var params = "";
	
	if(typeof(vou) != "object" || vou == null){
		selectElememtByUrl(mainmenu,submenu,vchtypecode,vchfieldcode,backinput);
	} else {
		/** ganhua 20080304 �ڴ�ѡ�񴰿�ǰ�ص�һ��������ĳЩ����
		  * �磺���ù�����������������������ؼ��Ƿ�ѡ��ֵ
		  * 
		**/
		var func = "callBeforeOpenSingleElementTree_"+vchfieldcode+"(window)";
		beforeMakeTree(func);
		var stopFlag = window.stopFlag != null ? true : false;
		if(stopFlag) {
			//����ȫ�ֱ��������Ӱ������
			window.stopFlag = undefined;
			return;
		} 
		var elementfilter = setElementfilter(elementfilter);
	    var voucher = new Array();
	    voucher[voucher.length]= vou;
		var refererurl = ""+window.location.href;
		var	url = ROOT_PATH+"/common/showElementTreeWithFieldCTRL.do?AllField="+allField+"&mainmenu="+mainmenu+"&submenu="+submenu+"&vchtypecode="+vchtypecode+"&vchfieldcode="+vchfieldcode+"&voucher="+voucher.toJSON()+"&defaultvalue="+defaultvalue+"&anyvaluetag="+anyvaluetag
	  			+"&parsetype="+parsetype+"&elementfilter="+elementfilter
	  			+"&Referer="+refererurl.substring(0,refererurl.indexOf("?"));
	  	var diasizeObj = setShowDiaSize();
		var result = window.showModalDialog(url,window,'dialogHeight:'+diasizeObj.ieHeight+'px;dialogWidth:'+diasizeObj.ieWidth+'px;resizable: No; status: No;help:No;');
		backResult(result,backinput);
	 }
}

/*
* �����ֶ�SHOWALL�����ֶ��ж��Ƿ�ȫ�����ػ򲿷ּ�����
* added by wy,2009-09-01
*/
function selectElementTreeForEditWithFieldCTRL(mainmenu,submenu,vchtypecode,vchfieldcode,backinput,vou,defaultvalue,anyvaluetag,parsetype,allField,elementfilter,isOnlyData,elementvalue){
	//wy add 20090923
	var selvalue = backinput.valuecode != undefined ? backinput.valuecode : backinput.value;
	window.selvalue = selvalue;
	var params = "";
	if(typeof(vou) != "object" || vou == null){
		selectElememtByUrl(mainmenu,submenu,vchtypecode,vchfieldcode,backinput);
	} else {
		//�ж��Ƿ�Ϊ��Ŀ��
		if(("program"==vchfieldcode || "budgetproj"==vchfieldcode) && vchtypecode.toString().charAt(0)!='6'){
			if(programtreetype=='0'){
				indi_SelectElementTreeForEditWithFieldCTRL(mainmenu,submenu,vchtypecode,vchfieldcode,backinput, vou, selvalue, "0", "link", "0", elementfilter, "","","1",0,"")
				return;
			}else{
				selectProgramTreeForEditWithFieldCTRL(mainmenu,submenu,vchtypecode,vchfieldcode,backinput,vou,selvalue,"0","link","0",elementfilter,"","",0,"");
				return;
			}
		}
		/** ganhua 20080304 �ڴ�ѡ�񴰿�ǰ�ص�һ��������ĳЩ����
		  * �磺���ù�����������������������ؼ��Ƿ�ѡ��ֵ
		  * 
		**/
		var func = "callBeforeOpenSingleElementTree_"+vchfieldcode+"(window)";
		beforeMakeTree(func);
		var stopFlag = window.stopFlag != null ? true : false;
		if(stopFlag) {
			//����ȫ�ֱ��������Ӱ������
			window.stopFlag = undefined;
			return;
		} 
		elementfilter = setElementfilter(elementfilter);
	    var voucher = new Array();
	    voucher[voucher.length]= vou;
		var refererurl = ""+window.location.href;
		var	url = ROOT_PATH+"/common/showElementTreeForEditWithFieldCTRL.do?AllField="+allField+"&mainmenu="+mainmenu+"&submenu="+submenu+"&vchtypecode="+vchtypecode+"&vchfieldcode="+vchfieldcode+"&voucher="+voucher.toJSON()+"&defaultvalue="+defaultvalue+"&anyvaluetag="+anyvaluetag
	  			+"&parsetype="+parsetype+"&elementfilter="+elementfilter
	  			+"&Referer="+refererurl.substring(0,refererurl.indexOf("?"));
	  	
	  	if(isOnlyData=="1"){
	  		url = ROOT_PATH+"/common/showElementTreeForEditWithFieldCTRL.do?AllField=0&mainmenu="+mainmenu+"&submenu="+submenu+"&vchtypecode="+vchtypecode+"&vchfieldcode="+vchfieldcode+"&voucher="+voucher.toJSON()+"&defaultvalue="+defaultvalue+"&anyvaluetag="+anyvaluetag
	  			+"&parsetype="+parsetype+"&elementfilter="+elementfilter+"&selvalue="+selvalue
	  			+"&Referer="+refererurl.substring(0,refererurl.indexOf("?"));
	  		var initData=eval("("+JQ.ajax({
						type:"post",
				  		url: url,
				  		data: "isOnlyData=1",
				  		async: false
				 	}).responseText+")");
			window.elementfilter=null;
	  		return 	loopgetchildren(initData,new Array());
	  	}
	  	if(typeof(elementvalue)!="undefined"&&elementvalue!=""){
	  		url += "&elementvalue="+elementvalue;
	  	}
	  	var diasizeObj = setShowDiaSize();
		var result = window.showModalDialog(url,window,'dialogHeight:'+diasizeObj.ieHeight+'px;dialogWidth:'+diasizeObj.ieWidth+'px;resizable: No; status: No;help:No;');
		if(vchfieldcode=='budgetincometype'){//��֧����
			backResult2(result,backinput);
		}else{
			backResult(result,backinput);
		}
	 }
}

/*
* �༭�������ӽڵ����Ŀ�����÷���
* @programdefaultvalue  ��Ŀ�����ܿ�����(����:��Ŀ����)
* @mustselect Ԥ�㵥λ������Ŀ�����Ƿ����
*/
function selectProgramTreeForEditWithFieldCTRL(mainmenu,submenu,vchtypecode,vchfieldcode,backinput,vou,defaultvalue,anyvaluetag,parsetype,allField,elementfilter,isOnlyData,programdefaultvalue,isEdit,mustselect,progamAddElements,repeatprogram){
	//wy add 20090923
	var selvalue = backinput.valuecode != undefined ? backinput.valuecode : backinput.value;
	window.selvalue = selvalue;
	window.programdefaultvalue = programdefaultvalue;
	window.mustselect = mustselect;
	window.isEdit = isEdit;
	if(progamAddElements)window.progamAddElements = progamAddElements;
	if(repeatprogram) window.repeatprogram = repeatprogram;
	var params = "";
	if(typeof(vou) != "object" || vou == null){
		selectElememtByUrl(mainmenu,submenu,vchtypecode,vchfieldcode,backinput);
	} else {
		/** ganhua 20080304 �ڴ�ѡ�񴰿�ǰ�ص�һ��������ĳЩ����
		  * �磺���ù�����������������������ؼ��Ƿ�ѡ��ֵ
		  * 
		**/
		var func = "callBeforeOpenSingleElementTree_"+vchfieldcode+"(window)";
		beforeMakeTree(func);
		var stopFlag = window.stopFlag != null ? true : false;
		if(stopFlag) {
			//����ȫ�ֱ��������Ӱ������
			window.stopFlag = undefined;
			return;
		} 
		elementfilter = setElementfilter(elementfilter);
	    var voucher = new Array();
	    voucher[voucher.length]= vou;
		var refererurl = ""+window.location.href;
		var	url = ROOT_PATH+"/common/showElementTreeForEditWithFieldCTRL.do?AllField="+allField+"&mainmenu="+mainmenu+"&submenu="+submenu+"&vchtypecode="+vchtypecode+"&vchfieldcode="+vchfieldcode+"&voucher="+voucher.toJSON()+"&defaultvalue="+defaultvalue+"&anyvaluetag="+anyvaluetag
	  			+"&parsetype="+parsetype+"&elementfilter="+elementfilter
	  			+"&Referer="+refererurl.substring(0,refererurl.indexOf("?"));
	  	
	  	if(isOnlyData=="1"){
	  		url = ROOT_PATH+"/common/showElementTreeForEditWithFieldCTRL.do?AllField=0&mainmenu="+mainmenu+"&submenu="+submenu+"&vchtypecode="+vchtypecode+"&vchfieldcode="+vchfieldcode+"&voucher="+voucher.toJSON()+"&defaultvalue="+defaultvalue+"&anyvaluetag="+anyvaluetag
	  			+"&parsetype="+parsetype+"&elementfilter="+elementfilter+"&selvalue="+selvalue
	  			+"&Referer="+refererurl.substring(0,refererurl.indexOf("?"));
	  		var initData=eval("("+JQ.ajax({
						type:"post",
				  		url: url,
				  		data: "isOnlyData=1",
				  		async: false
				 	}).responseText+")");
			window.elementfilter=null;
	  		return 	loopgetchildren(initData,new Array());
	  	}
	  	var diasizeObj = setShowDiaSize();
		var result = window.showModalDialog(url,window,'dialogHeight:'+diasizeObj.ieHeight+'px;dialogWidth:'+diasizeObj.ieWidth+'px;resizable: No; status: No;help:No;');
		if (result != null) {
			if (typeof(result)=="object") {
				if (backinput == null) {
					backinput = $(vchfieldcode);
				}
				if(result.value.indexOf("-")>-1){
					//����CODE����
					var code = result.value.split("-")[0];
					var name = result.value.split("-")[1];
					backinput.value = showElementCodeCTRL(checkCodeShowFlag(vchfieldcode),code,name);
				}else{
					backinput.value = result.value; //��ѡ����undefined.
				}
				backinput.valueid = result.id;
				backinput.isleaf= result.isleaf;
				backinput.valuecode = result.valuecode;
			}
		} 
	 }
}
/*
* ���������Ʒ���ʱ
* added by wy,2009-08-20
*/
function selectElememtByOnlyElementcode(elementcode,backinput,allField,elementfilter,jsFunction){
		//wy add 20090923
		jsFunctionname = jsFunction;
		var selvalue = backinput.valuecode != undefined ? backinput.valuecode : backinput.value;
		window.selvalue = selvalue;	
		var params = "";
		var func = "callBeforeOpenSingleElementTree_"+elementcode+"(window)";
		beforeMakeTree(func);
		var stopFlag = window.stopFlag != null ? true : false;
		if(stopFlag) {
			//����ȫ�ֱ��������Ӱ������
			window.stopFlag = undefined;
			return;
		} 
		elementfilter = setElementfilter(elementfilter);
		var refererurl = ""+window.location.href;
	  	var	url = ROOT_PATH+"/common/showElementWithOnlyCode.do?elementcode="+elementcode
	  			+"&elementfilter="+elementfilter+"&AllField="+allField
	  			+"&Referer="+refererurl.substring(0,refererurl.indexOf("?"));
	  	var diasizeObj = setShowDiaSize();
		var result = window.showModalDialog(url,window,'dialogHeight:'+diasizeObj.ieHeight+'px;dialogWidth:'+diasizeObj.ieWidth+'px;resizable: No; status: No;help:No;');
		backResult(result,backinput);
}

/*
* ���������Ʒ���ʱ
* added by wy,2009-08-20
*/
function selectMutElememtByOnlyElementcode(elementcode,backinput,allField,elementfilter,jsFunction,OnlySelectBottom){
		jsFunctionname = jsFunction;
		//wy add 20090923
		var selvalue = backinput.valuecode != undefined ? backinput.valuecode : backinput.value;
		window.selvalue = selvalue;
		window.OnlySelectBottom = OnlySelectBottom;
		var params = "";
		var func = "callBeforeOpenSingleElementTree_"+elementcode+"(window)";
		beforeMakeTree(func);
		var stopFlag = window.stopFlag != null ? true : false;
		if(stopFlag) {
			//����ȫ�ֱ��������Ӱ������
			window.stopFlag = undefined;
			return;
		} 
		elementfilter = setElementfilter(elementfilter);
		var refererurl = ""+window.location.href;
	  	var	url = ROOT_PATH+"/common/showMutElementWithOnlyCode.do?elementcode="+elementcode
	  			+"&elementfilter="+elementfilter+"&AllField="+allField
	  			+"&Referer="+refererurl.substring(0,refererurl.indexOf("?"));
	  	var diasizeObj = setShowDiaSize();		
		var result = window.showModalDialog(url,window,'dialogHeight:'+diasizeObj.ieHeight+'px;dialogWidth:'+diasizeObj.ieWidth+'px;resizable: No; status: No;help:No;');
		backResult(result,backinput);
}

/*
* ���������Ʒ���ʱ
* added by jjy,2009-03-10
*/
function selectElememtByUrlWithVou(mainmenu,submenu,vchtypecode,vchfieldcode,backinput,vou,defaultvalue,anyvaluetag,parsetype,isOnlyData){
	//wy add 20090923
	var selvalue = backinput.valuecode != undefined ? backinput.valuecode : backinput.value;
	window.selvalue = selvalue;
	var params = "";
	
	if(typeof(vou) != "object" || vou == null){
		selectElememtByUrl(mainmenu,submenu,vchtypecode,vchfieldcode,backinput);
	} else {
		/** ganhua 20080304 �ڴ�ѡ�񴰿�ǰ�ص�һ��������ĳЩ����
		  * �磺���ù�����������������������ؼ��Ƿ�ѡ��ֵ
		  * 
		**/
		var func = "callBeforeOpenSingleElementTree_"+vchfieldcode+"(window)";
		beforeMakeTree(func);
		var stopFlag = window.stopFlag != null ? true : false;
		if(stopFlag) {
			//����ȫ�ֱ��������Ӱ������
			window.stopFlag = undefined;
			return;
		} 
		var elementfilter = setElementfilter(elementfilter);
	    var voucher = new Array();
	    voucher[voucher.length]= vou;
		var refererurl = ""+window.location.href;
	  	var	url = ROOT_PATH+"/common/elementtreeforedit.do?mainmenu="+mainmenu+"&submenu="+submenu+"&vchtypecode="+vchtypecode+"&vchfieldcode="+vchfieldcode+"&voucher="+voucher.toJSON()+"&defaultvalue="+defaultvalue+"&anyvaluetag="+anyvaluetag
	  			+"&parsetype="+parsetype+"&elementfilter="+elementfilter
	  			+"&Referer="+refererurl.substring(0,refererurl.indexOf("?"));
	  	//alert(refererurl.substring(0,refererurl.indexOf("?")));
	  	if(isOnlyData=="1"){
		url = ROOT_PATH+"/common/elementtreeforedit.do?mainmenu="+mainmenu+"&submenu="+submenu+"&vchtypecode="+vchtypecode+"&vchfieldcode="+vchfieldcode+"&voucher="+voucher.toJSON()+"&defaultvalue="+defaultvalue+"&anyvaluetag="+anyvaluetag
	  			+"&parsetype="+parsetype+"&elementfilter="+elementfilter+"&selvalue="+selvalue
	  			+"&Referer="+refererurl.substring(0,refererurl.indexOf("?"));
	  		window.elementfilter=null;
	  		var initData=eval("("+JQ.ajax({
						type:"post",
				  		url: url,
				  		data: "isOnlyData=1",
				  		async: false
				 	}).responseText+")");
	  		return 	loopgetchildren(initData,new Array());
	  	}
	  var diasizeObj = setShowDiaSize();
	  var result = window.showModalDialog(url,window,'dialogHeight:'+diasizeObj.ieHeight+'px;dialogWidth:'+diasizeObj.ieWidth+'px;resizable: No; status: No;help:No;');		
	  backResult(result,backinput);
	 }
}

/*
* ������ܷ�������ʽ���Դ��������ʱ�����������ͳһ�����������֮���ֹ
* added by xyq,2009-02-23
*/
function selectElememtByUrlAndFundtype(mainmenu,submenu,vchtypecode,vchfieldcode,backinput,fundtype){
	var params = "";
	// ����ֻ��ѡ��ĩ��
	if(backinput.OnlySelectBottom){
		params += "&onlyselectbottom=true";
	}
	// �����ܿط�Χ����
	if(backinput.scopelimit){
		var t = eval(backinput.scopelimit);
		if(typeof(t) == "object" && t.objecttype == "datatable"){
		    var selectRows = t.getSelectedRow();
		    if(selectRows.length>0){
		    	var row = selectRows[0];
		    	limitcode = row[vchfieldcode+"_code"];
		    	params += "&limitcode="+limitcode;
		    }
		}
	}
	
	var refererurl = ""+window.location.href;
	var	url = ROOT_PATH+"/common/elementtree.do?mainmenu="+mainmenu+"&submenu="+submenu+"&vchtypecode="+vchtypecode+"&vchfieldcode="+vchfieldcode+params+"&Referer="+refererurl.substring(0,refererurl.indexOf("?"))+"&fundtypeforspecial="+fundtype;
	
	var diasizeObj = setShowDiaSize();
	var result = window.showModalDialog(url,window,'dialogHeight:'+diasizeObj.ieHeight+'px;dialogWidth:'+diasizeObj.ieWidth+'px;resizable: No; status: No;help:No;');
	//var result = window.open(url, 'newWindow','dialogWidth=400px,dialogHeight=450px,status=yes,toolbar=no,menubar=no,directories=no,resizable=no,Scrollbars=no');
	backResult(result,backinput);
}

//wy modified 20090828 ���������ֶ�allField�ж��Ƿ�ȫ����������0������ 1��ȫ��
function selectElememtByUrlWithAllField(mainmenu,submenu,vchtypecode,vchfieldcode,backinput,allField,elementfilter,obj,url){
	//wy add 20090923
	var selvalue = backinput.valuecode != undefined ? backinput.valuecode : backinput.value;
	window.selvalue = selvalue;
	//�ж��Ƿ�Ϊ��Ŀ��
	if(("program"==vchfieldcode.toLowerCase() || "budgetproj" ==vchfieldcode.toLowerCase()) &&vchtypecode.charAt(0)!='6'&&programtreetype=='0'){
		var isQuery = "1";
		indi_SelectElementTreeForEditWithFieldCTRL(mainmenu,submenu,vchtypecode,vchfieldcode,backinput, obj, selvalue, "0", "link", "0", elementfilter, "",isQuery,"1",0);
		return;
	}
    /** ganhua 20080304 �ڴ�ѡ�񴰿�ǰ�ص�һ��������ĳЩ����
	  * �磺���ù�����������������������ؼ��Ƿ�ѡ��ֵ
	  * 
	**/
	var func = "callBeforeOpenSingleElementTree_"+vchfieldcode+"(window)";
	beforeMakeTree(func);
	var stopFlag = window.stopFlag != null ? true : false;
	if(stopFlag) {
		//����ȫ�ֱ��������Ӱ������
		window.stopFlag = undefined;
		return;
	} 
	elementfilter = setElementfilter(elementfilter);
	var params = "";
	// ����ֻ��ѡ��ĩ��
	if(backinput.OnlySelectBottom){
		params += "&onlyselectbottom=true";
	}
	// �����ܿط�Χ����
	if(backinput.scopelimit){
		var t = eval(backinput.scopelimit);
		if(typeof(t) == "object" && t.objecttype == "datatable"){
		    var selectRows = t.getSelectedRow();
		    if(selectRows.length>0){
		    	var row = selectRows[0];
		    	limitcode = row[vchfieldcode+"_code"];
		    	params += "&limitcode="+limitcode;
		    }
		}
	}
	var refererurl = ""+window.location.href;
    if(obj == null) obj = new Object();
	if(url == undefined){
		url = ROOT_PATH+"/common/elementtree.do?mainmenu="+mainmenu+"&submenu="+submenu+"&vchtypecode="+vchtypecode+"&vchfieldcode="+vchfieldcode
			   +"&elementfilter="+elementfilter+"&AllField="+allField+"&voucher="+Object.toJSON(obj)
		      +params+"&Referer="+refererurl.substring(0,refererurl.indexOf("?"));
	}else{
		url = ROOT_PATH+url+"?mainmenu="+mainmenu+"&submenu="+submenu+"&vchtypecode="+vchtypecode+"&vchfieldcode="+vchfieldcode
			  +"&elementfilter="+elementfilter+"&AllField="+allField+"&voucher="+Object.toJSON(obj)
		      +params+"&Referer="+refererurl.substring(0,refererurl.indexOf("?"));
	}
	var diasizeObj = setShowDiaSize();
	var result = window.showModalDialog(url,window,'dialogHeight:'+diasizeObj.ieHeight+'px;dialogWidth:'+diasizeObj.ieWidth+'px;resizable: No; status: No; help:No');
	//var result = window.open(url, 'newWindow','dialogWidth=400px,dialogHeight=450px,status=yes,toolbar=no,menubar=no,directories=no,resizable=no,Scrollbars=no');
    backResult(result,backinput);
} 
		
function selectDataTableElememtEditByUrl(mainmenu,submenu,vchtypecode,vchfieldcode,backinput,url,vou,elementfilter,showlevel){
	//wy add 20090923
    /** ganhua 20080304 �ڴ�ѡ�񴰿�ǰ�ص�һ��������ĳЩ����
	  * �磺���ù�����������������������ؼ��Ƿ�ѡ��ֵ
	  * 
	**/
	var selvalue = backinput.valuecode != undefined ? backinput.valuecode : backinput.value;
	window.selvalue = selvalue;
	var func = "callBeforeOpenSingleElementTree_"+vchfieldcode+"(window)";
	beforeMakeTree(func);
	var stopFlag = window.stopFlag != null ? true : false;
	if(stopFlag) {
		//����ȫ�ֱ��������Ӱ������
		window.stopFlag = undefined;
		return;
	} 
	if(window.elementfilter && elementfilter){
		elementfilter += " and " +window.elementfilter;
	}
	if(elementfilter==null) elementfilter = "";
	
	var params = "";
	// ����ֻ��ѡ��ĩ��
	if(showlevel=="onlyselectbottom"){
		params += "&parsetype=ET2";
	}
	var refererurl = ""+window.location.href;
	if(url == undefined){
		url = ROOT_PATH+"/common/elementtreeforedit.do?mainmenu="+mainmenu+"&submenu="+submenu+"&vchtypecode="+vchtypecode+"&vchfieldcode="+vchfieldcode
			  +"&elementfilter="+elementfilter+(vou!=null?"&voucher="+Object.toJSON(vou):"")
		      +params+"&Referer="+refererurl.substring(0,refererurl.indexOf("?"));
	}else{
		url = ROOT_PATH+url+"?mainmenu="+mainmenu+"&submenu="+submenu+"&vchtypecode="+vchtypecode+"&vchfieldcode="+vchfieldcode
			  +"&elementfilter="+elementfilter+(vou!=null?"&voucher="+Object.toJSON(vou):"")
		      +params+"&Referer="+refererurl.substring(0,refererurl.indexOf("?"));
	}
	var diasizeObj = setShowDiaSize();
	var result = window.showModalDialog(url,window,'dialogHeight:'+diasizeObj.ieHeight+'px;dialogWidth:'+diasizeObj.ieWidth+'px;resizable: No; status: No; help:No');
	//var result = window.open(url, 'newWindow','dialogWidth=400px,dialogHeight=450px,status=yes,toolbar=no,menubar=no,directories=no,resizable=no,Scrollbars=no');
    backResult(result,backinput);
}

/**
*  ����ʱ�õ��ĵ��������÷���
**/
function selectElememtByUrl(mainmenu,submenu,vchtypecode,vchfieldcode,backinput,url){
	//wy add 20090923
    /** ganhua 20080304 �ڴ�ѡ�񴰿�ǰ�ص�һ��������ĳЩ����
	  * �磺���ù�����������������������ؼ��Ƿ�ѡ��ֵ
	  * 
	**/
	var selvalue = backinput.valuecode != undefined ? backinput.valuecode : backinput.value;
	window.selvalue = selvalue;
	var func = "callBeforeOpenSingleElementTree_"+vchfieldcode+"(window)";
	beforeMakeTree(func);
	var stopFlag = window.stopFlag != null ? true : false;
	if(stopFlag) {
		//����ȫ�ֱ��������Ӱ������
		window.stopFlag = undefined;
		return;
	} 
	var elementfilter = setElementfilter(elementfilter);
	var params = "";
	// ����ֻ��ѡ��ĩ��
	if(backinput.OnlySelectBottom){
		params += "&onlyselectbottom=true";
	}
	// �����ܿط�Χ����
	if(backinput.scopelimit){
		var t = eval(backinput.scopelimit);
		if(typeof(t) == "object" && t.objecttype == "datatable"){
		    var selectRows = t.getSelectedRow();
		    if(selectRows.length>0){
		    	var row = selectRows[0];
		    	limitcode = row[vchfieldcode+"_code"];
		    	params += "&limitcode="+limitcode;
		    }
		}
	}
	var refererurl = ""+window.location.href;
	if(url == undefined){
		url = ROOT_PATH+"/common/elementtree.do?mainmenu="+mainmenu+"&submenu="+submenu+"&vchtypecode="+vchtypecode+"&vchfieldcode="+vchfieldcode
			  +"&elementfilter="+elementfilter+"&selvalue="+selvalue
		      +params+"&Referer="+refererurl.substring(0,refererurl.indexOf("?"));
	}else{
		url = ROOT_PATH+url+"?mainmenu="+mainmenu+"&submenu="+submenu+"&vchtypecode="+vchtypecode+"&vchfieldcode="+vchfieldcode
			  +"&elementfilter="+elementfilter
		      +params+"&Referer="+refererurl.substring(0,refererurl.indexOf("?"));
	}
	var diasizeObj = setShowDiaSize();
	var result = window.showModalDialog(url,window,'dialogHeight:'+diasizeObj.ieHeight+'px;dialogWidth:'+diasizeObj.ieWidth+'px;resizable: No; status: No; help:No');
	//var result = window.open(url, 'newWindow','dialogWidth=400px,dialogHeight=450px,status=yes,toolbar=no,menubar=no,directories=no,resizable=no,Scrollbars=no');
    backResult(result,backinput);
}

//��ѡ
function openwindowmutl(url){
	 window.open(url, 'newWindow','width=300px,height=450px,status=yes,toolbar=no,menubar=no,directories=no,resizable=no,Scrollbars=no,help:No');
}
function selectMutlElememt(mainmenu,submenu,vchtypecode,vchfieldcode,backinput,checkflag,elementfilter){
	//wy add 20090923
    /** ganhua 20080304 �ڴ�ѡ�񴰿�ǰ�ص�һ��������ĳЩ����
	  * �磺���ù�����������������������ؼ��Ƿ�ѡ��ֵ
	  * 
	**/
	var selvalue = backinput.valuecode != undefined ? backinput.valuecode : backinput.value;
	window.selvalue = selvalue;
	window.checkflag = checkflag;
	window.jsFunctionname = jsFunction;
	var func = "callBeforeOpenMultElementTree_"+vchfieldcode+"(window)";;
	beforeMakeTree(func);
	var stopFlag = window.stopFlag != null ? true : false;
	if(stopFlag) {
		//����ȫ�ֱ��������Ӱ������
		window.stopFlag = undefined;
		return;
	} 
	elementfilter = setElementfilter(elementfilter);
	var refererurl = ""+window.location.href;
	
	var url = ROOT_PATH+"/common/mutlelementtree.do?mainmenu="+mainmenu+"&submenu="+submenu+"&vchtypecode="+vchtypecode
		+"&vchfieldcode="+vchfieldcode+"&elementfilter="+elementfilter
		+"&Referer="+refererurl.substring(0,refererurl.indexOf("?"));
	var diasizeObj = setShowDiaSize();
	var result = window.showModalDialog(url,window,'dialogHeight:'+diasizeObj.ieHeight+'px;dialogWidth:'+diasizeObj.ieWidth+'px;resizable: No; status: No; help:No;');
    backResult(result,backinput);
}

/* ��ѯ����ѡ�����õķ������а�����Ŀ���ĵ���
*  wy modified 20090827 Ĭ����ʾ��Ϊ0:������ʾ
*/
function selectMutlElememt(mainmenu,submenu,vchtypecode,vchfieldcode,backinput,allField,elementfilter,obj,checkflag,jsFunction){
	//wy add 20090923
	var selvalue = backinput.valuecode != undefined ? backinput.valuecode : backinput.value;
	window.selvalue = selvalue;
	window.checkflag = checkflag;
	jsFunctionname =jsFunction;
	//�ж��Ƿ�Ϊ��Ŀ������
	if(("program"==vchfieldcode.toLowerCase() || "budgetproj"==vchfieldcode.toLowerCase())&&vchtypecode.charAt(0)!='6'&&programtreetype=='0'){
		var isQuery = "1"; //��ѯ����Ŀ����ʶ
		indi_SelectElementTreeForEditWithFieldCTRL(mainmenu,submenu,vchtypecode,vchfieldcode,backinput, obj, selvalue, "0", "link", "0", elementfilter, "",isQuery,"2",0);
		return;
	}
    /** ganhua 20080304 �ڴ�ѡ�񴰿�ǰ�ص�һ��������ĳЩ����
	  * �磺���ù�����������������������ؼ��Ƿ�ѡ��ֵ
	  * 
	**/

	var func = "callBeforeOpenMultElementTree_"+vchfieldcode+"(window)";;
	beforeMakeTree(func);
	var stopFlag = window.stopFlag != null ? true : false;
	if(stopFlag) {
		//����ȫ�ֱ��������Ӱ������
		window.stopFlag = undefined;
		return;
	} 
	elementfilter = setElementfilter(elementfilter);
	var refererurl = ""+window.location.href;
	if(obj==null) obj=new Object();
	var url = ROOT_PATH+"/common/mutlelementtree.do?mainmenu="+mainmenu+"&submenu="+submenu+"&vchtypecode="+vchtypecode
		+"&vchfieldcode="+vchfieldcode+"&elementfilter="+elementfilter+"&AllField="+allField+"&voucher="+Object.toJSON(obj)
		+"&Referer="+refererurl.substring(0,refererurl.indexOf("?"));
	var diasizeObj = setShowDiaSize();
	var result = window.showModalDialog(url,window,'dialogHeight:'+diasizeObj.ieHeight+'px;dialogWidth:'+diasizeObj.ieWidth+'px;resizable: no; status: no; help:no;');
	backResult(result,backinput);
}
/**
 * Qtree����ȡ��ԭ�е���
 * @param params ��������
 * @param options �Զ����������
 */
function selectQueryTree(params, options){
	//Ĭ�϶���,ֻ����һ����ǰҳ��·��
	var defaults = { Referer : window.location.pathname, url:"" };
	if(typeof options != "undefined") {
		JQ.extend( params, options );
	}
	JQ.extend( defaults, params );
	var url = defaults.url;
	//ѡ��ֵ,���ڴ�������������У�����ֱ�ӷ���window�����У���������Ĳ����
	var parentWin = { selvalue : defaults.backinput.valueid ? defaults.backinput.valueid+"" : null};
	//��ʱ�Ȳ����ö�ѡʱֻѡ��һ���ڵ�
	//parentWin.checkflag = params.checkflag;
	jsFunctionname = defaults.jsFunction;
	//�ж��Ƿ�Ϊ��Ŀ������
	if(params.treetype != "programtree" && defaults.type != "edit"&& ("program"==defaults.vchfieldcode.toLowerCase() || "budgetproj" ==defaults.vchfieldcode.toLowerCase()) &&defaults.vchtypecode.charAt(0)!='6'&&programtreetype=='0'&&params.isImport!=true){
		var isQuery = "1"; //��ѯ����Ŀ����ʶ
		indi_SelectElementTreeForEditWithFieldCTRL(defaults.mainmenu,defaults.submenu,defaults.vchtypecode,defaults.vchfieldcode,defaults.backinput, defaults.voucher, defaults.selvalue, "0", "link", "0", defaults.elementfilter, "",isQuery,"2",0);
		return;
	} else if (params.treetype == "programtree"){
		url = "/common/getNewProgramData.do";
		JQ.extend(defaults, getProgramParam());
	}
	var func = "callBeforeOpenSingleElementTree_"+defaults.vchfieldcode+"(window)";
	if(defaults.type == "checkbox") {
		func = "callBeforeOpenMultElementTree_"+defaults.vchfieldcode+"(window)";
	}
	beforeMakeTree(func);
	defaults.elementfilter = setElementfilter(defaults.elementfilter);
	//���Զ���·�������ö�ѡ����ѡ���༭����������������ͬ·��,
	if(url == "") {
		if(defaults.type == "checkbox") {
			url = ROOT_PATH+"/common/mutlQtree.do";
		}else if(defaults.type == "edit") {
			url = ROOT_PATH+"/common/forEditQtree.do";
		}else{
			url = ROOT_PATH+"/common/singleQtree.do";
		}
	}
	url = url+"?"+frameParam(defaults);
	var result = getWinResult(url, parentWin);
	backQtreeResult(result, defaults.backinput, defaults.type);
}
/**
 * ��ѯ����ѡ��Ŀ������
 * @param params
 */
function getProgramParam() {
	var relationprogram = "";
	var bdgagencyid = "";
	var bdgmanagedivisionid = "";
	var isreport = "";
	//������ص�ҵ��ϵͳ��ʱ����ѯ������Ŀ,���ѯ��ʶʧЧ
	if(typeof(reportcode)!="undefined"&&reportcode != null)isreport = reportcode;
	//����Ŀ��ϵ��ѯ����relationtablecodeΪҵ����Ĺ�����
	if(typeof(relationtablecode)!="undefined"&&relationtablecode != null)relationprogram = relationtablecode;
	var queryformObj = $("queryform"); 
	if (queryformObj != null) {
		var bdgagencyObj = queryformObj.bdgagency;
		var bdgmanagedivisionObj = queryformObj.bdgmanagedivision;
		if(bdgagencyObj != null)bdgagencyid = bdgagencyObj.valueid ? bdgagencyObj.valueid : "";
		if(bdgmanagedivisionObj != null)bdgmanagedivisionid = bdgmanagedivisionObj.valueid ? bdgmanagedivisionObj.valueid : "";
	}
	return {relationprogram:relationprogram, bdgagencyid:bdgagencyid, bdgmanagedivisionid:bdgmanagedivisionid, isreport:isreport};
}
/**
 *Qtree������ѡ��ֵ�Ĵ���
 *@result ģ̬���ڵķ��ض���
 *@backinput ���շ��ؽ���Ķ���
**/
function backQtreeResult(result, backinput, type){
	if(result != null){
		var value=[], valueid=[], valuecode = []
		for(var pro in result) {
			var _resultObj = result[pro];
			if(typeof _resultObj != "object")continue;
			value.push(_resultObj.code,"-",_resultObj.name,";");
			var sp=_resultObj.itemid.split('-');
			if(sp.length>1){
				valueid.push(sp[1]);
			}else{
				valueid.push(_resultObj.itemid);
			}
			valuecode.push(_resultObj.code);
		}
		if(valueid.length > 0) {
			backinput.value = value.join("");
			var id = valueid.join(",");
			// �Ӻ���һ��������Ϊ��ʱ����ԭ����Ŀ�Ĺ����жϡ��������
			if(type == "checkbox") {
				backinput.valueid = id+",";
			}else{
				backinput.valueid = id;
			}
			backinput.valuecode = valuecode.join(",");
		}
		try{
			func="callEnd_"+backinput.id+"(backinput,result)";
        		eval(func);
    		}catch(e){}
		dosearch();
	}
}
/**
 * ȡ�õ���������ѡ�н��
 * @param url ������·��
 * @param parentWin ���ݸ��������
 * @returns
 */
function getWinResult(url, parentWin) {
	var diasizeObj = setShowDiaSize();
	return window.showModalDialog(url,parentWin,'dialogHeight:'+diasizeObj.ieHeight+'px;dialogWidth:'+diasizeObj.ieWidth+'px;resizable: no; status: no; help:no;');
}
/**
 * ��дjuery��param�����������ж����ת��
 * @param a �����Ƕ���/����
 * @returns url����
 */
function frameParam( a ) {
	var s = [ ];

	function add( key, value ){
		s[ s.length ] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
	};
	//�����ת��json�������Ϊ·������Ҫ��encodeURIComponent
	function ObjAdd(key,value){
		s[ s.length ] = encodeURIComponent(key) + '=' + value;
	}
	// ����������Ͳ�����ƴװ
	if ( JQ.isArray(a) || a.jquery )
		JQ.each( a, function(){
			add( this.name, this.value );
		});
	// �������͵Ĵ���
	else
		for ( var j in a )
			if ( !a[j] || j=="jsFunction") continue;
			else if ( JQ.isArray(a[j]) )
				JQ.each( a[j], function(){
					add( j, this );
				});
			else if ( a[j] instanceof Object || j == "Referer" )
				//ֵΪ�������Ϊurl·��ʱ
				ObjAdd( j, a[j] instanceof Object ? Object.toJSON( a[j] ) : a[j]);
			else
				add( j, JQ.isFunction(a[j]) ? a[j]() : a[j] );

	return s.join("&").replace(/%20/g, "+");
}
/**
 * ��ѯ���������͵�����
 * @param elementTable ��������
 * @param belongtype ��������
 * @param backinput ��������
 * @param obj ������ƹ������
 * @param belongFilter ���ƹ�������
 */
function selectElememtBelongType(elementTable,belongtype,backinput,obj,belongFilter){
	var parentWin = { selvalue : backinput.valueid ? backinput.valueid : null};
	var url = ROOT_PATH+"/common/showElementTreeByBelongType.do?elementTable="+elementTable+"&belongtype="+belongtype+"&belongFilter="+belongFilter;
	var result = getWinResult(url, parentWin);
	backQtreeResult(result,backinput);
}
function selectMutlElememtButton(mainmenu,submenu,vchtypecode,vchfieldcode,obj){
    /** ganhua 20080304 �ڴ�ѡ�񴰿�ǰ�ص�һ��������ĳЩ����
	  * �磺���ù�����������������������ؼ��Ƿ�ѡ��ֵ
	  * 
	**/
	var func = "callBeforeOpenMultElementTree_"+vchfieldcode+"(window)";;
	beforeMakeTree(func);
	var stopFlag = window.stopFlag != null ? true : false;
	if(stopFlag) {
		//����ȫ�ֱ��������Ӱ������
		window.stopFlag = undefined;
		return;
	} 
	var elementfilter = setElementfilter(elementfilter);
	var refererurl = ""+window.location.href;
	
	var url = ROOT_PATH+"/common/mutlelementtree.do?mainmenu="+mainmenu+"&submenu="+submenu+"&vchtypecode="+vchtypecode
		+"&vchfieldcode="+vchfieldcode+"&elementfilter="+elementfilter
		+"&Referer="+refererurl.substring(0,refererurl.indexOf("?"));
	var diasizeObj = setShowDiaSize();
	var result = window.showModalDialog(url,window,'dialogHeight:'+diasizeObj.ieHeight+'px;dialogWidth:'+diasizeObj.ieWidth+'px;resizable: No; status: No; help:No;');
	//var result = window.open(url, 'newWindow','dialogWidth=400px,dialogHeight=450px,status=yes,toolbar=no,menubar=no,directories=no,resizable=no,Scrollbars=no');
	var row = getEditRowByButton(obj);		
	var backinput = ttt.getElementsByTagName("TABLE").item(0).rows.item(row).cells.item(4).children.item(1);
	backResult(result,backinput);
}


function selectMutlElememtByUrl(mainmenu,submenu,vchtypecode,vchfieldcode,backinput,originalurl,elementfilter){
	//wy add 20090923
    /** ganhua 20080304 �ڴ�ѡ�񴰿�ǰ�ص�һ��������ĳЩ����
	  * �磺���ù�����������������������ؼ��Ƿ�ѡ��ֵ
	  * 
	**/
	var selvalue = backinput.valuecode != undefined ? backinput.valuecode : backinput.value;
	window.selvalue = selvalue;
	var func = "callBeforeOpenMultElementTree_"+vchfieldcode+"(window)";;
	beforeMakeTree(func);
	var stopFlag = window.stopFlag != null ? true : false;
	if(stopFlag) {
		//����ȫ�ֱ��������Ӱ������
		window.stopFlag = undefined;
		return;
	} 
	elementfilter = setElementfilter(elementfilter);
	var refererurl = originalurl;

	var url = ROOT_PATH+"/common/mutlelementtree.do?mainmenu="+mainmenu+"&submenu="+submenu+"&vchtypecode="+vchtypecode
		+"&vchfieldcode="+vchfieldcode+"&elementfilter="+elementfilter
		+"&Referer="+refererurl.substring(0,refererurl.indexOf("?"));
	var diasizeObj = setShowDiaSize();
	var result = window.showModalDialog(url,window,'dialogHeight:'+diasizeObj.ieHeight+'px;dialogWidth:'+diasizeObj.ieWidth+'px;resizable: No; status: No; help:No;');
	backResult(result,backinput);
}
/**
* opt ������������
* additions �����������
* callback �Զ���ĵ��÷���
**/
function customTree(opt,additions,callback){
	var D = {
		mainmenu:"",
		submenu:"",
		vchtypecode:"",
		vchfieldcode:"",
		backinput:"",
		elementfilter:"",
		obj:"",
		customcolumn:"",					//�Զ���ȡ�ֶ������ö��ŷָ�
		customkey:"",						//����ֵ�ĸ�ʽ�������ö��ŷָ�
		jsFunction:"",
		Referer:""
	}
	var B ={
		url:"",   							//��ѡ��·��/common/elementtree.do ����ѡ��·��/common/mutlelementtree.do
		ajaxUrl:"/common/customTree.do", 	//ajax��ȡ·��
		ajaxFlag:false 						//�Ƿ���ajax�����־
	}
	D = JQ.extend(D,opt);
	B = JQ.extend(B,additions?additions:{});
		//���������Զ��嵯��������ʱ;
	if(callback){this.D=D;this.B=B;callback.call(this);return;} 		
	var func = "callBeforeOpenCustomElementTree_"+D.vchfieldcode+"(window)";
		//����������ǰ����
	beforeMakeTree(func);
	var stopFlag = window.stopFlag != null ? true : false;
	if(stopFlag) {
		//����ȫ�ֱ��������Ӱ������
		window.stopFlag = undefined;
		return;
	} 
		//������������					
	D.elementfilter = setElementfilter(D.elementfilter);
	var refererurl = ""+window.location.href;
	D.Referer = refererurl.substring(0,refererurl.indexOf("?"));
		//�˴��Բ���Ϊ����ʱ���ƵĲ��ã�Ҫ���´���
	var pars = JQ.param(D);				
		//�����ajax�����Ǿ�ֻ��Ҫ�õ����ݲ��öԽ���������Ĵ���
	if(B.ajaxFlag){
		var initData=eval("("+JQ.ajax({
						type:"post",
				  		url: B.ajaxUrl,
				  		data: pars,
				  		async: false
				 	}).responseText+")");
		return initData; 
	}else{
		var selvalue = D.backinput.valuecode != undefined ? D.backinput.valuecode : D.backinput.value;
		window.selvalue = selvalue;
		window.jsFunctionname = D.jsFunction;
		var diasizeObj = setShowDiaSize();
		var result = window.showModalDialog(B.url+"?"+pars,window,'dialogHeight:'+diasizeObj.ieHeight+'px;dialogWidth:'+diasizeObj.ieWidth+'px;resizable: No; status: No; help:No;');
		backResult(result,D.backinput);
	}
}

//select ����
function getSelect(mainmenu,submenu,vchtypecode,vchfieldcode,backinput,elementfilter,arrobj,jsFunction,valueid){
	//var pars = 'submenu='+submenu +'&vchtypecode='+vchtypecode + '&vchfieldcode='+vchfieldcode+'&elementfilter='+elementfilter+'&voucher='+Object.toJSON(obj)+"&defaultvalue="+defaultvalue+"&anyvaluetag="+anyvaluetag+"&parsetype="+parsetype+"&selvalue="+dselvalue;
	var pars = 'submenu='+submenu +'&vchtypecode='+vchtypecode + '&vchfieldcode='+vchfieldcode+'&elementfilter='+elementfilter;
	var url = "/common/mutlelemtree.do?"+pars;
	var initData=eval("("+JQ.ajax({
						type:"post",
				  		url: url,
				  		data: "isOnlyData=1",
				  		async: false
				 	}).responseText+")");
	 creatOptions(initData,backinput,valueid);
}
function creatOptions(initData,backinput,valueid){
	 var f = checkCodeShowFlag(backinput.id);
     JQ.each(initData,function(i,item){
		if(item.children&&item.children.length>0){
			var opt = document.createElement("option");
     		opt.text = f?item.code+"-"+item.name:item.name;
     		opt.value = item.id;
     		//�޸�ҳ��ʱ�Ƿ���Ĭ��ֵ
     		if(backinput.children[1] && backinput.children[1].value != null && backinput.children[1].value == item.id){
     			//��֤��ѡ�����ݵ�λ�ã���ͬ��ʱ�ӽ�����option�Ƴ�
     			backinput.remove(1);
     			opt.selected = true;
     		}
     		if(valueid != null && valueid == item.id){
     			opt.selected = true;
     		}
     		backinput.options.add(opt);
			creatOptions(item.children,backinput,valueid);
		}else{
    		//JQ(backinput).append(JQ("<option>").text(item.code+"-"+item.name).val(item.id));
    		var opt = document.createElement("option");
     		opt.text = f?item.code+"-"+item.name:item.name;
     		opt.value = item.id;
     		if(backinput.children[1] && backinput.children[1].value != null && backinput.children[1].value == item.id){
     			backinput.remove(1);
     			opt.selected = true;
     		}
     		if(valueid != null && valueid == item.id){
     			opt.selected = true;
     		}
     		backinput.options.add(opt);

		}
	});
     
}

/**�������򿪴���ǰ�ص�һ��������ĳЩ����͹�������
*@func ������֮ǰ��Ҫ������¼�
**/
function beforeMakeTree(func){
		var notReturn = true;
	    try{
	        notReturn = eval(func);
		}catch(e){
			//���ɹ�,������,��û��ʵ�ָ÷���
		}
		if(notReturn == false)
		{
			return;
		}
}

/**���������ù�������
*@elementfilter ��������
**/
function setElementfilter(elementfilter){
		if(elementfilter == "" || elementfilter == null){
			if(window.elementfilter){
				elementfilter = window.elementfilter;
				window.elementfilter = undefined;
			}else{
				elementfilter = "";
			}
		}
		else{
			elementfilter = getQueryStr(elementfilter); //wy add ���ý������ù�������
		}
		return elementfilter;
} 

/**������ѡ��ֵ�Ĵ���
*@result ģ̬���ڵķ��ض���
*@backinput ���շ��ؽ���Ķ���
**/
function backResult(result,backinput){
   	//�������Ĺ������� ganhua 20090509
	if(window.elementfilter);
	{
		window.elementfilter = null;
	}
	if(result != null){
	    if(typeof(result)!="string"){
			if(backinput == null){
				backinput = $(vchfieldcode);
			}
			backinput.value = result.value;
			var sp=result.id.split('-');
			if(sp.length>1){
				backinput.valueid = sp[1];
			}else{
				backinput.valueid = result.id;
			}
			backinput.isleaf= result.isleaf;
			backinput.valuecode = result.valuecode;
			try{
				func="callEnd_"+backinput.id+"(backinput,result)";
	        		eval(func);
        		}catch(e){}
			dosearch();
		}
	}
}


// �տ����б�
function selectPayee(agency,payeebankacctnameinput,payeebankacctcodeinput,payeebanknameinput){
	var refererurl = ""+window.location.href;
	var url = ROOT_PATH+"/common/payeetree.do?agency="+agency+"&Referer="+refererurl.substring(0,refererurl.indexOf("?"));
	var result = window.showModalDialog(url,agency,'dialogWidth:600px;dialogHeight:450px;status:no;resizable:no;help:No;');
	//var result = window.open(url, 'newWindow','dialogWidth=600px,dialogHeight=450px,status=yes,toolbar=no,menubar=no,directories=no,resizable=no,Scrollbars=no');

	if(result != null && result.bankacctname!=null){
		payeebankacctnameinput.value = result.bankacctname
		payeebankacctcodeinput.value = result.bankacctcode
		payeebanknameinput.value = result.bankname
	
	}
}

// ���������˺��б�  //�����޸�20090804
function selectBankAccount(element,bankaccount,bankacctnameinput,bankacctcodeinput,banknameinput){
	var elementfilter = "";
	if(window.elementfilter)
	{
	           elementfilter = window.elementfilter;
	}
	var url = ROOT_PATH+"/cal/common/bankinfo.do?element="+element+"&elementfilter="+elementfilter;
	var result = window.showModalDialog(url,element,'dialogWidth:600px;dialogHeight:450px;status:no;resizable:no;help:No;');
	//var result = window.open(url, 'newWindow','dialogWidth=600px,dialogHeight=450px,status=yes,toolbar=no,menubar=no,directories=no,resizable=no,Scrollbars=no');

	if(result != null && result.bankacctname!=null){
		bankacctnameinput.value = result.bankacctname
		bankacctcodeinput.value = result.bankacctcode
		banknameinput.value = result.bankname
		if(bankaccount!=null && bankaccount!="" && bankaccount!="null")
			bankaccount.value=result.bankaccount;
	
	}
}


// Ԫ��������ѡ�����ڱ�������
function selectReportElememt(mainmenu,submenu,elementcode,backinput){
	var refererurl = ""+window.location.href;
	var url = ROOT_PATH+"/common/reportelementtree.do?mainmenu="+mainmenu+"&submenu="+submenu+"&elementcode="+elementcode+"&Referer="+refererurl.substring(0,refererurl.indexOf("?"));
	var result = window.showModalDialog(url,$(elementcode),'dialogWidth=400px,dialogHeight=450px,status=yes,toolbar=no,menubar=no,directories=no,resizable=no,Scrollbars=no,help:No;');
	//var result = window.open(url, 'newWindow','dialogWidth=400px,dialogHeight=450px,status=yes,toolbar=no,menubar=no,directories=no,resizable=no,Scrollbars=no');

	if(result != null){
		if(backinput == null){
			backinput = $(elementcode);
		}
		backinput.value = result.value;
		backinput.valueid = result.id;
	}
}

/*�²�����ť���¼�*/
function doChangBg(obj){
   var btn_bg = obj.parentNode;
   btn_bg.className = 'btn_bg';
   obj.style.border = '#055A77 1px solid';
   
   
}
 
function doReturn(obj) {
    var btn_bg = obj.parentNode;
    btn_bg.className = ' ';
    obj.style.border='#FFF 1px dotted';
   
}
/**
*�༭��ͬ����������
**/
function setElementValueToRow(row, inputobj){
	var element = inputobj.name;
	if(inputobj.tagName =="SELECT" && inputobj.selectedIndex>-1){
		var v = inputobj.options[inputobj.selectedIndex].text;
		inputobj.valueid = inputobj.options[inputobj.selectedIndex].value;
	} else {
		var v = inputobj.value;
	}
	//wy ���ͬ��
	//if(v.indexOf("-")==-1){
	//    return ;
	//}
	if(v.trim() == ""){
		eval("row."+element+"=0");
		eval("row."+element+"_code=null");
		eval("row."+element+"_name=null");
		return ;
	}
    if(v.indexOf("-")>-1){
		var vs = v.split('-');
		var code = vs[0];
		var name = vs[1];
	}else{
		var code = "";
		var name = v;
	}
	
	if(isNaN(inputobj.valueid)){
		eval("row."+element+"='"+inputobj.valueid+"'");
	}else{
		eval("row."+element+"="+inputobj.valueid);
	}
	eval("row."+element+"_code=code");
	eval("row."+element+"_name=name");
}

function setElementValueToInput(row, inputobj){
	var element = inputobj.name;
	eval("var id = row."+element);
	eval("var code = row."+element+"_code");
	eval("var name = row."+element+"_name");
	if(id == null || code == null || name == null){
		return ;
	}
	if(inputobj.tagName =="SELECT"){
		//��Դ�����ȼ��������������ҵ�ѡ��ֵ����Դ���ȼ���ѡ��ֵ���ټ���ȫ������
		if(inputobj.options.length>1){
			for(var i = 0 ;i<inputobj.options.length;i++){
				if(inputobj.options[i].value == id){
					inputobj.options[i].selected = true;
					break;
				}
			}
		}else{
			var opt = document.createElement("option");
	     	opt.text = code+"-"+name;
	     	opt.value = id;
	     	inputobj.options.add(opt);
     	}
 	}else{
		//������ʾ����
		if(checkCodeShowFlag(element)){
			inputobj.value = code+"-"+name;
		} else {
			inputobj.value = name;
		}
	}
	inputobj.valueid = id;
	inputobj.defaultValue = code+"-"+name;
	
}

function setMainElementValueToRow(row, inputobj){
	var element = inputobj.name;
	element = element.substr(4);
	var v = inputobj.value;
	if(v.trim() == ""){
		eval("row."+element+"=0");
		eval("row."+element+"_code=null");
		eval("row."+element+"_name=null");
		return ;
	}

	var vs = v.split('-');
	var code = vs[0];
	var name = vs[1];
	
	if(isNaN(inputobj.valueid)){
		eval("row."+element+"='"+inputobj.valueid+"'");
	}else{
		eval("row."+element+"="+inputobj.valueid);
	}
	eval("row."+element+"_code=code");
	eval("row."+element+"_name=name");
}

function setMainElementValueToInput(row, inputobj){
	var element = inputobj.name;
	element = element.substr(4);
	eval("var id = row."+element);
	eval("var code = row."+element+"_code");
	eval("var name = row."+element+"_name");
	if(id == null || code == null || name == null){
		return ;
	}
	if(checkCodeShowFlag(element)){
		inputobj.value = code+"-"+name;
	} else {
		inputobj.value = name;
	}
	inputobj.valueid = id;
	inputobj.defaultValue = code+"-"+name;
}
function setElementValueToInputText(row, inputobj){
	var element = inputobj.name;
	eval("var id = row."+element);
	inputobj.value = id;
	
}
// ���FORM�еĿ�¼������
function clearFormInput(formObject){
	var inputelements = formObject.elements;
	for(var i=0;i<inputelements.length;i++){
		var obj = inputelements[i];
		//�����ĺźͷ������ڲ������
		if(obj.tagName == "INPUT" && obj.type=="text"){
			obj.value = ""
			obj.valueid = null;
		}
	}
	// ���FORM��Ӧ����
	formObject.selectedRow = null;
}


String.prototype.trim = function(){
	return this.replace(/(^\s*)|(\s*$)/g,"");
}
//�е�ʱ���Ҳ���replace������
Number.prototype.replace=function(){return this;}
//����ֵΪ0.009ʱtoFixed(2)���Ϊ0.00û���������룬������ݶ�ʧ������д�˷���
Number.prototype.toFixed=function(len)
{	
	var symbol = "";
	var tmp = this.toString();
	if(tmp.charAt(0)=='-'){
		symbol="-";
		tmp=tmp.substring(1);
	}
	var add = 0;
	var s,temp;
	var s1 = tmp.toString();
	var start = s1.indexOf(".");
	if(start == -1  || s1.substr(start+1,s1.length).length<=len) {
		return symbol+tmp;
	}
	if(s1.substr(start+len+1,1)>=5)add=1;
	var temp = Math.pow(10,len);
	s = Math.floor(tmp * temp) + add;
	return symbol+s/temp;
}
// ���ַ����������ӻ��ҷ�ʽ��ʾ�ķ���
String.prototype.toMoneyFormat = function(len,isformat){
	if(isformat&&this.trim()==""){ //����һ�����������ַ��� �����и�ʽ��
		return this;
	}
	if(len==null){
		len =2;
	}
	var num = new Number(this);
	var money = num.toFixed(len);
	//money = money.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,"$1,");
	var symbol ="";
	if(money.charAt(0)=='-'){
		symbol="-";
		money=money.substring(1);
	}
	money = fNumFormat(money,3,",");
	money = symbol+money;
	if(money!=null && money!="" && money.indexOf(".")==-1){
	    if(money != "NaN"){
	    	money=money+".00";
    	    } else {
    		money="0.00";
   	    }
	}
	if(money!=null && money!="" && money.indexOf(".")!=-1){
	    var index = money.indexOf(".");
	    var uz = money.substr(index+1);
	    var s1 = uz.replace(/,/g,"");
	    money=money.substr(0,index+1)+s1;
	    if(uz.length==1){
	        //money=money.substr(0,index+1)+s1+"0";
	    }
	    for(var m=uz.length;m<len;m++){
	    	money += "0";
	    }
	} 
	return money;
}

// ��form׷�ӷ���
function ExForm(formObj){
	formObj.dosubmit = function(){
		addQueryFormInput(); //ע�ֳ�����ֻҪ��ʾ�������Ϊ��,��Ҫ��ѯ������.
		if(typeof clearValueofIsDataSouce == "function")clearValueofIsDataSouce();
	    var hiddeninpt;
		var formElems = this.getElementsByTagName("INPUT");
		for(var i=0;i<formElems.length;i++){
		    var inptObj = formElems.item(i);
		    if(inptObj.type == "text" && inptObj.valuetype == "number"){
		      if( inptObj.value!=null && inptObj.value.trim()!="" && !inptObj.value.isNumber()){
  		        alert(inptObj.elementname+"����������");
  		        inptObj.focus();
  		        return false;
  		      }
		    }
		}
		try{
			if(!queryCheckIdata()) return false;
		}catch(err){}
		for(var i=0;i<formElems.length;i++){
			var inptObj = formElems.item(i);
			if(inptObj.type == "text"){
				if(inptObj.valueid != null){
				        var hiddeninptname="hidden_"+inptObj.name;
				        for(var j=0;j<formElems.length;j++){
				          var obj=formElems.item(j);
				          if(obj.type=="hidden" && obj.name==hiddeninptname){
				            hiddeninpt = obj;
				            hiddeninpt.value=inptObj.value;
				          }
				          if(obj.type=="hidden" && obj.name==inptObj.name+"_valuecode"){
				            obj.value= inptObj.valuecode;
				          }
				        }
					inptObj.value = inptObj.valueid;
				}
			}
		}
		var formObj = document.getElementById("queryform");
		if(document.getElementById("page")!=null){
			var sizeinput=JQ("input[id*=setpage_size]",JQ("table[id='paginationtbl']"));
			if(sizeinput&&sizeinput.length!=0){
		 		 var page_size = sizeinput.val();
				 var r = /^[0-9]*[1-9][0-9]*$/ ;
                 if(!r.test(page_size)){
	                 document.getElementById("setpage_size").value=document.getElementById("pageSize").value;
	                 return false;
                 }else{
                	 formObj.rows.value=page_size;
                 }
			}else{
				document.getElementById("rows").value = document.getElementById("pageSize").value;
			}
		}else {
			formObj.allflag.value = 1;
		}
		// ����ֻ������onsubmit�¼�������������Ҫ����submit�����ύ
		formObj.submit();
	}
}

// ���FORM�еĿ�¼������
function clearFormInputAll(formObj){
	var inputelements = formObj.elements;
	for(var i=0;i<inputelements.length;i++){
		var obj = inputelements[i];
		if((obj.tagName == "INPUT" && obj.type=="text") || obj.tagName == "SELECT"){
			obj.value = ""
			obj.valueid = null;
			obj.valuecode = null;
		}else if(obj.tagName == "INPUT" && obj.type=="checkbox"){
			obj.checked=false;
		}
	}
}


function doChangeBg1(obj){
	doChangBg(obj);
}

//�ж��û���Ȩ�ޣ�tmain��������creater�ֶκ�wfstatus������״̬��
//�����ж�����״̬Ĭ��Ϊ��¼������δͨ��������״̬
//falseûȨ�ޣ�true��Ȩ��
//�����Ȱ��ж�״̬�ĵط�ȥ�������ҳ��Ҫ��ĳЩ����״̬�ĵ��������⴦�������checkCando(tmain,wfstatus,info)������ֱ������
function checkAuth(rows,userid){	
	if(rows != null && rows.length > 0){
		if(userid == null || userid == ""){
			alert("�������µ�½��");
			rows.selectedallrows(false);
			tmain.draw();
			return false;
		}else{
			return true;
		}

	} else {
		alert("��ѡ������");
		return false;
	}
}

//�ж��û���Ȩ�ޣ�tmain��������creater�ֶκ�wfstatus������״̬��
//�����ж�����״̬Ĭ��Ϊ��¼������δͨ��������״̬
//falseûȨ�ޣ�true��Ȩ��
//������Ȩ���֪ͨ��
//�����Ȱ��ж�״̬�ĵط�ȥ�������ҳ��Ҫ��ĳЩ����״̬�ĵ��������⴦�������checkCando(tmain,wfstatus,info)������ֱ������
function checkPrintAuth(rows,userid){	
	if(rows != null && rows.length > 0){
		if(userid == null || userid == ""){
			alert("�������µ�½��");
			rows.selectedallrows(false);
			tmain.draw();
			return false;
		}
	
	} else {
		alert("��ѡ������");
		return false;
	}
}
/**
*�����ָ�ʽ���ɶ�Ӧ�ĸ�ʽ
*
*/
function formatNumber(number,pattern)
	{
		var str			= number.toString();
		var strInt;
		var strFloat;
		var formatInt;
		var formatFloat;
		if(/\./g.test(pattern))
		{
			formatInt		= pattern.split('.')[0];
			formatFloat		= pattern.split('.')[1];
		}
		else
		{
			formatInt		= pattern;
			formatFloat		= null;
		}		if(/\./g.test(str))
		{
			if(formatFloat!=null)
			{
				var tempFloat	= Math.round(parseFloat('0.'+str.split('.')[1])*Math.pow(10,formatFloat.length))/Math.pow(10,formatFloat.length);
			
				
				//strInt		= (Math.floor(number)+Math.floor(tempFloat)).toString();
				if (number<0) 
				      strInt = "-"+(Math.floor(number*(-1))+Math.floor(tempFloat)).toString(); 
				else 
				      strInt = (Math.floor(number)+Math.floor(tempFloat)).toString(); 
				
					
				strFloat	= /\./g.test(tempFloat.toString())?tempFloat.toString().split('.')[1]:'0';			
			}
			else
			{
				strInt		= Math.round(number).toString();
				strFloat	= '0';
			}
		}
		else
		{
			strInt		= str;
			strFloat	= '0';
		}
		if(formatInt!=null)
		{
			var outputInt	= '';
			var zero		= formatInt.match(/0*$/)[0].length;
			var comma		= null;
			if(/,/g.test(formatInt))
			{
				comma		= formatInt.match(/,[^,]*/)[0].length-1;
			}
			var newReg		= new RegExp('(\\d{'+comma+'})','g');			if(strInt.length<zero)
			{
				outputInt		= new Array(zero+1).join('0')+strInt;
				outputInt		= outputInt.substr(outputInt.length-zero,zero)
			}
			else
			{
				outputInt		= strInt;
			}			var 
			outputInt			= outputInt.substr(0,outputInt.length%comma)+outputInt.substring(outputInt.length%comma).replace(newReg,(comma!=null?',':'')+'$1')
			outputInt			= outputInt.replace(/^,/,'');			strInt	= outputInt;
		}		if(formatFloat!=null)
		{
			var outputFloat	= '';
			var zero		= formatFloat.match(/^0*/)[0].length;			if(strFloat.length<zero)
			{
				outputFloat		= strFloat+new Array(zero+1).join('0');
				//outputFloat		= outputFloat.substring(0,formatFloat.length);
				var outputFloat1	= outputFloat.substring(0,zero);
				var outputFloat2	= outputFloat.substring(zero,formatFloat.length);
				outputFloat		= outputFloat1+outputFloat2.replace(/0*$/,'');
			}
			else
			{
				outputFloat		= strFloat.substring(0,formatFloat.length);
			}			strFloat	= outputFloat;
		}
		else
		{
			if(pattern!='' || (pattern=='' && strFloat=='0'))
			{
				strFloat	= '';
			}
		}		return strInt+(strFloat==''?'':'.'+strFloat);
	}
// ������
function show_audit_Info() {

    var selectrows = tmain.getSelectedRow();
    if(selectrows.length==0){
      alert("��ѡ��Ҫ�鿴�ļ�¼");
      return false;
    }
    if(selectrows.length>1){
      alert("ֻ��ѡ��һ����¼�鿴");
      return false;
    }
    var subdata= new Object();
    try{
    	if(selectrows[0].wfid==null||selectrows[0].wfid==""){
    		alert("ȱ�����ã�����ϵϵͳ����Ա���������wfid!");
    		return;
    	} else {
    		subdata.wfid = selectrows[0].wfid;
    	}
    	if(selectrows[0].billid==null||selectrows[0].billid==""){
    		alert("ȱ�����ã�����ϵϵͳ����Ա���������billid!");
    		return;
    	} else {	
    		subdata.billid = selectrows[0].billid;
    	}	
    }catch (e){
    	
    }
    var maindata=Object.toJSON(subdata);
    var url="/template/commons/auditinfo.do?maindata="+maindata;
	  var features = "top=150,left=50,width=750,height=500,scrollbars=yes,resizable=no,status=yes";
    window.open(url,"������",features);
	//formCommonsAuditinfo.maindata.value=maindata;	
    //formCommonsAuditinfo.submit();
  
}

//��Դȥ��
function show_source_target_Info(tableName){
    var selectedRow = tmain.getSelectedRow();
     if(selectedRow.length==0){
      alert("������ѡ��1����¼��Ȼ��[��Դȥ��]��");
      return false;
    }
    if(selectedRow.length>1){
      alert("ֻ��ѡ��1����¼��Ȼ��[��Դȥ��]��");
      return false;
    }
    var billid = selectedRow[0].billid;
    var url = ROOT_PATH+"/commons/srcandtragetvouinfo.do?";
    url = url + "&billid="+billid + "&wfid="+selectedRow[0].wfid;
    url = url + "&tableName="+tableName;
	var features = "top=150,left=50,width=750,height=500,scrollbars=yes,resizable=yes";
    window.open(url, "��Դȥ��", features);
}

String.prototype.isNumber = function(){
  var newPar=/^(-|\+)?\d+(\.\d+)?$/;
  return newPar.test(this);
}

//У���Ƿ��Ǻ�����
function isFunctionName(s)
{
	var patrn=/^[a-zA-Z]{1}([a-zA-Z0-9]|[_]){0,19}$/;
	if (!patrn.exec(s)) return false
	return true
}
/***
tmain:��˵��ݶ���
type�������壺0���϶�Ϊ1 Ҳ����˵��0��Ҫд�������1Ĭ����ͬ��,����д������
auditinfo :Ĭ��������
exclusionWfstatus:������ʾ�������Ĺ������ڵ�
*/

function fillAuditInfo(tmain,type,auditinfo,exclusionWfstatus){
 var selectrows = tmain.getSelectedRow();
	if (selectrows.length < 1) {
        alert("��ѡ��Ҫ�����ļ�¼��");
        return false;
    }   
 if(typeof(exclusionWfstatus)!="undefined"&&exclusionWfstatus.length>0&&!isNotContainsExclusionWfstatus(tmain,exclusionWfstatus)){//����exclusionWfstatus֮��Ĺ�����״̬
 		type=1;
 		auditinfo = "";
 }
    var result = auditinfo;
    if(type==0){
        var result = window.showModalDialog("/common/AuditRemark.jsp?auditinfo="+auditinfo,"",'dialogWidth=400px;dialogHeight=280px;status=yes;toolbar=no;help=no;menubar=no;directories=no;resizable=no;Scrollbars=no');    
    }
 //��ѡ�е��и�ֵ
 if(typeof(result)=="undefined")return false;
	if(selectrows.length==1){
	  selectrows[0].auditOpinion=result;
	  return true;
	 }else{	
	 	if(type==0){
	 		if(confirm("�Ƿ��"+selectrows.length+"��ҵ�񵥾���ͬ������������")){
			 	for(var i=0;i<selectrows.length;i++){
			 		selectrows[i].auditOpinion=result;
			 	}
			 	return true;
			 }else{
			 	return false;
			 }
	 	}else{
	 	   	for(var i=0;i<selectrows.length;i++){
			 		selectrows[i].auditOpinion=result;
			 }
			 	return true;
	 	}

	 } 
 return false;
}

/**
*
*������г�exclusionWfstatus֮��Ĺ�����״̬�����з���ture�����򷵻�false
��exclusionWfstatus=10��tmain.getSelectedRow()�к���10����00�򷵻�ture
*/
function isNotContainsExclusionWfstatus(tmain,exclusionWfstatus){
 	var selectrows = tmain.getSelectedRow();
 	
	for(var i=0;i<selectrows.length;i++){	
		for(var j=0;j<exclusionWfstatus.length;j++){
			//if(selectrows[i].wfstatus!=exclusionWfstatus[j])return  true;	
			if(!isContains(selectrows[i].wfstatus,exclusionWfstatus))return  true;	
		}
			
	}
	return false;
}
function isContains(wfstatus,exclusionWfstatus){
		for(var j=0;j<exclusionWfstatus.length;j++){
			if(wfstatus==exclusionWfstatus[j])return  true;	
		}
		return false;
}

function showmsg(msg){
  //alert(msg);
}
function numberAdd(arg1,arg2){
    
    //var r1,r2,m;
    //try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    //try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    //m=Math.pow(10,Math.max(r1,r2))
    //return (arg1*m+arg2*m)/m
    var lessthanzero1;
    var lessthanzero2;
    
    lessthanzero1 = (arg1<0);
    lessthanzero2 = (arg2<0);
    
    var r1,r2,m;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}

    var intn1,intn2,pn1,pn2;
    try{
    	intn1=arg1.toString().split(".")[0];
    	showmsg(parseInt(intn1).abs());
    	if(lessthanzero1 && lessthanzero2){
    	    intn1=parseInt(intn1).abs();//.substring(1,intn1.length());
    	}
    	showmsg(intn1);
    }catch(e){intn1=0}
    try{
    	intn2=arg2.toString().split(".")[0];
    	showmsg(parseInt(intn2).abs());
    	if(lessthanzero1 && lessthanzero2){
    	    intn2=parseInt(intn2).abs();
    	}
    	showmsg(intn2);
    }catch(e){intn2=0}
    try{
    	pn1=arg1.toString().split(".")[1];
    	if(pn1==null) pn1=0;
    	if(lessthanzero1 && !lessthanzero2)
    	   pn1= "-"+pn1;
    }catch(e){pn1=0}
    try{
    	pn2=arg2.toString().split(".")[1];
    	if(pn2==null) pn2=0;
    	if(!lessthanzero1 && lessthanzero2)
    	   pn2= "-"+pn2;
    }catch(e){pn2=0}

    var maxlength = Math.max(r1,r2);

    showmsg("kaishi");
    var intn,pn;
    
    var intlessthanzero; 
    intn = parseInt(intn1)+parseInt(intn2)
	
    showmsg("�ϼ�:"+intn);
    showmsg("maxlength:"+maxlength);
    showmsg("r1:"+r1);showmsg("r2:"+r2);
    pn1= pn1*Math.pow(10,(parseInt(maxlength)-parseInt(r1)));
    pn2= pn2*Math.pow(10,(parseInt(maxlength)-parseInt(r2)));
    
    showmsg("pn1:"+pn1);showmsg("pn2:"+pn2);
    pn=parseInt(pn1)+parseInt(pn2);
    showmsg("����� pn:"+pn);
    var dflessthanzero; 
    dflessthanzero = (pn<0);
    
    showmsg("pn:"+pn);
    
    var spn;
    if(dflessthanzero)  
      	spn = pn.toString().substring(1,pn.toString().length);
    else
        spn = pn.toString();
    var spnlength = spn.length;

    showmsg("����");
    showmsg("spn:"+spn);

    if(spnlength<=maxlength)
    	intn1 = parseInt("0");
    else
    	intn1= parseInt(spn.substring(0,spnlength-maxlength));
    
    showmsg("����ǰ intn:"+intn);
    showmsg ("�����:"+intn1);
    
    intn = parseInt(intn1)+parseInt(intn);
    
    showmsg ("�����:"+intn);
    showmsg("intn:"+intn);
    intlessthanzero = (intn<0);
    showmsg("spnlength:"+spnlength);
    showmsg("spn.substring(spnlength-maxlength,spnlength):"+spn.substring(spnlength-maxlength,spnlength));
    spn = spn.substring(spnlength-maxlength,spnlength);
    showmsg("dflessthanzero:"+dflessthanzero);showmsg("intlessthanzero:"+intlessthanzero);
    showmsg("intn:"+intn);
    if(intn==0){ //Ϊ0
        if(dflessthanzero){ //С��0
            intn="-0";
         }   
    }else if(!intlessthanzero && dflessthanzero && spn!='' && parseInt(spn)!=0) {
    	intn =intn-1;
    	//if(spn.length<maxlength){
	    //   for(var az=0;az<maxlength-spn.length;az++){
	    //      spn="0"+spn;
	   //   }
	    //}
    	bm = 1*Math.pow(10,maxlength);
    	bm = bm-parseInt(spn);
    	spn= bm.toString();
    	
    }else if (intlessthanzero && !dflessthanzero && spn!='' && parseInt(spn)!=0){
        
    	intn =intn+1;
    	if(intn==0) intn="-0";
    	//if(spn.length<maxlength){
	    //   for(var az=0;az<maxlength-spn.length;az++){
	    //      spn="0"+spn;
	    //   }
	    //}
    	bm = 1*Math.pow(10,maxlength);
    	bm = bm-parseInt(spn);
    	spn= bm.toString();
    }
    if(spn.length<maxlength){
       for(var az=0;az<maxlength-spn.length;az++){
          spn="0"+spn;
       }
    }

   	if(lessthanzero1 && lessthanzero2){
   	   return parseFloat("-"+intn.toString()+"."+spn);
   	}
    return parseFloat(intn.toString()+"."+spn);
}

//��Number��������һ��add�����������������ӷ��㡣
Number.prototype.add = function (arg){
    return numberAdd(arg,this);
}

function numberMin(arg1,arg2){
    var r1,r2,m;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2))
    return (arg1*m-arg2*m)/m
}

//��Number��������һ��add�����������������ӷ��㡣
Number.prototype.min = function (arg){
    return numberMin(this,arg);
}
   	//ģ̬�����д��´���session��ʧ
		function changeOpenObj(){
			var openobj = window;
	    	if(typeof(window.dialogArguments) == 'object'){
	    		openobj = window.dialogArguments; 
	    	}
	    	return openobj;
		}
   //������ 
		function configMainColSort(linkname,tableid){
		
		 	var url="/system/ui/mainColSort.do?tabletype=MainList&tableid="+tableid+"&linkname="+linkname;
		 	var features ="top=200,left=350,width=750,height=500,scrollbars=yes,resizable=yes";
		    changeOpenObj().open(url,"�б���˳����",features); 
		}
		function configDetailColSort(linkname,tableid){
		
		 	var url="/system/ui/detailColSort.do?tabletype=DetailList&tableid="+tableid+"&linkname="+linkname;
		 	var features ="top=200,left=350,width=750,height=500,scrollbars=yes,resizable=yes";
		    changeOpenObj().open(url,"�б���˳����",features); 
		}

    //�������� 
		function configMainSet(linkname){
		
		 	var url="/system/ui/mainSetList.do?linkname="+linkname;
		 	var features ="top=200,left=350,width=750,height=500,scrollbars=yes,resizable=yes";
		  	changeOpenObj().open(url,"�б����Զ���",features); 
		}
    //�ӵ�����
		function configDetailSet(linkname, param){
			var _param = param;
			var detailnum = "";
			if (_param != null && _param.detailnum != null)
				detailnum = _param.detailnum;
		 	var url="/system/ui/detailSetList.do?linkname="+linkname+"&type="+detailnum;
		 	var features = "top=200,left=350,width=750,height=500,scrollbars=yes,resizable=yes";
		  	changeOpenObj().open(url,"�б����Զ���",features); 
		}
	//�ӵ�����
		function configSecDetailSet(linkname){
		 	var url="/system/ui/secDetailSetList.do?linkname="+linkname;
		 	var features = "top=200,left=350,width=750,height=500,scrollbars=yes,resizable=yes";
		  	changeOpenObj().open(url,"�б����Զ���",features); 
		}	
	//��ѯ����
    function configCondition(linkname,vouchTypeCode){
      		var url="/system/ui/conditionList.do?linkname="+linkname+"&vouchTypeCode="+vouchTypeCode;
		 	var features = "top=200,left=350,width=750,height=500,scrollbars=yes,resizable=yes";
		  	changeOpenObj().open(url,"�б����Զ���",features);
     }
  //�Զ����ѯ����
    function my_configCondition(linkname,vouchTypeCode){
      		var url="/system/ui/getMyCondition.do?linkname="+linkname+"&vouchTypeCode="+vouchTypeCode;
		 	var features = "top=200,left=350,width=750,height=500,scrollbars=yes,resizable=yes";
		  	changeOpenObj().open(url,"�б����Զ���",features);
    }
    window.attachEvent("onload",function(){ //��̬����ltext_core.js
    	if(typeof(Ext)=="undefined"||typeof(Ext.lt)=="undefined"){
    		  var oHead = document.getElementsByTagName('HEAD').item(0); 
    		    var oScript= document.createElement("script"); 
    		    oScript.type = "text/javascript"; 
    		    oScript.src="/ltext/ltext_core.js"; 
    		    oHead.appendChild( oScript); 
    		}
    	}
    );
    
    var queryPopwindow;
    //��ѯ������������ť
    function my_selectcondition(obj,linkname,formobj,mycondition){
    	var datas=[];
		datas.push({id:1,name:'<span title="����ΪĬ�ϲ�ѯ����">����</span>',code:'cs1',pid:0,ico:'/images/popmenuo/save.gif',click:function(){saveQuery(linkname,formobj,mycondition);}});
		datas.push({id:2,name:'<span title="���Ĭ�ϲ�ѯ����">���</span>',code:'cs1',pid:0,ico:'/images/popmenuo/brush.gif',click:function(){deleteDefaultQuery(linkname,mycondition);}});

		var d=document.getElementById('pmenutest2');
		if(d==null){
		 queryPopwindow=Ext.lt.Popupmenu({
				data:datas,
				field:{id:'id',name:'name',code:'code',sid:'pid'}
		  });
		 d = document.createElement("div");
		 d.id = "pmenutest2";
		 d.className = "popupmenuo";
		 d.style.visibility = "hidden";
		 document.body.appendChild(d);
		 queryPopwindow.draw(d);
		 Ext.lt.message.hook("layout","endlayout",function(){
			 queryPopwindow.close();
		 });
		}else{
			queryPopwindow.show();
			
		}
		var pos=Ext.lt.HTML.positionedOffset(obj,document.body,false);
		
		var x=pos.left;
		if(document.body.clientWidth-x<d.offsetWidth){
			x = document.body.clientWidth - d.offsetWidth;
		}
		 
		var y=pos.top+22;
	
		d.style.left=x+'px';
		d.style.top=y+'px';
		d.style.visibility='visible';
    }
    //���ܰ�ť
    function configFunctionButton(linkname,param){
    		var _param = param;
    		var scope = "";
    		if (_param != null && _param.scope != null) 
    			scope = _param.scope;
      		var url="/system/ui/functionButtonList.do?linkname="+linkname+"&scope="+scope;
		 	var features = "top=200,left=350,width=750,height=500,scrollbars=yes,resizable=yes";
		  	changeOpenObj().open(url,"�б����Զ���",features);
    }
   //ҳ�������Ϣ����
    function configBasicMessage(linkname){
      		var url="/system/ui/showPageMessage.do?linkname="+linkname;
		 	var features = "top=200,left=350,width=750,height=500,scrollbars=yes,resizable=yes";
		  	window.open(url,"�б����Զ���",features);
    }
    
    //�༭������
    function configEditForm(linkname, param){
    		var _param = param;
    		var elementval = "";
    		if (_param != null && _param.elementvalue != null) 
    			elementval = _param.elementvalue;
	     	var url = "/system/ui/showsetpageedit.do?linkname="+linkname+"&mainmenu="+getparam("mainmenu")+"&submenu="+getparam("submenu")+"&elementvalue="+elementval;
			var features = "top=150,left=300,width=750,height=600,scrollbars=yes,resizable=yes";
		  	changeOpenObj().open(url, "�б����Զ���", features);  
  	}
  //���༭��
  function configMainEditForm(linkname){
	      var url = "/system/ui/showsetpageedit.do?linkname="+linkname+"&myparam=main&mainmenu="+getparam("mainmenu")+"&submenu="+getparam("submenu");
	      var features = "top=150,left=300,width=750,height=600,scrollbars=yes,resizable=yes";
	      changeOpenObj().open(url, "�б����Զ���", features);  
  }
 
//�������뷽��
function importexldata(){
    var pars = "?vchtypeid="+linkvchtypeid+ "&mainmenu="+getparam("mainmenu")+"&submenu="+getparam("submenu")+"&action=1";
	window.open(ROOT_PATH+"/common/queryimportdata.do" + pars,"_blank","status=yes,toolbar=no,menubar=no,location=no");
}
//�¹������뷽��
function importexldata1(){
    var pars = "?vchtypeid="+linkvchtypeid+ "&mainmenu="+getparam("mainmenu")+"&submenu="+getparam("submenu")+"&action=1";
	window.open(ROOT_PATH+"/common/queryimportdata1.do" + pars,"_blank","status=yes,toolbar=no,menubar=no,location=no");
}
//js��ȡ��ַ������
function getparam(val) {
	var uri = window.location.search;
	var re = new RegExp("" +val+ "\=([^\&\?]*)", "ig");
	return ((uri.match(re))?(uri.match(re)[0].substr(val.length+1)):null);
}



/*
ת���ַ�����20090701 jiazhitao 
modify jjy 20091227
*/
function convertStrForObj(obj){
	remark =obj.value;
	obj.value = convertStr(remark);
    return remark ;
}

function replaceGBKPoint(remark){
	var oRemark = "";
	for (var i = 0 ;remark!=null&&i<remark.length;i++){
		var code = remark.charCodeAt(i);
		var c = remark.charAt(i);
		if(code==8226){
			oRemark += '��';
		}else{
			oRemark += c;
		}
	}
	return oRemark;
}
/*
ת���ַ�����20090701 jiazhitao 
*/
function convertStr(remark) {
/*
�������滻Ϊ ȫ�� 
\>
\<
\;
\& �ͺ� 
\'������  
\" ˫����   
\% �ٷֺ�
\# #��
*/
remark =remark.replace("\\","��");
var  s= "/,>,<,;,&,',\",%,#,:";
var  n= "��,��,��,��,��,��,��,��,��,��" ;
var sArray = s.split(",");
var nArray = n.split(",") ;

for (var i = 0 ;i<sArray.length;i++){
	var reg = new RegExp(sArray[i],"g") ;
  remark = remark.replace( reg,nArray[i]) ;	
}
	remark = replaceGBKPoint(remark);
  return remark ;
}

function convertInputStr(inputObj) {
  var disVal = convertStr(inputObj.value);
  inputObj.value = disVal;
  return inputObj ;
}

/***
*
*����
*
****/
function sendAuditdata(){
	sendAuditdataInner();
  }


/***
*
*ȡ������
*
****/
function cancelSendAuditdata(){
	cancelSendAuditdataInner();
  }
  
/**
* �����ܰ�ť�Ƿ����
*/  
function ctrlclick(divObj,flag){
	if(divObj!=null&&flag!=null){
		var elementObj = divObj.getElementsByTagName("SPAN");
		for(var i= 0;i<elementObj.length;i++){
			elementObj[i].disabled = flag;
		}
		elementObj = divObj.getElementsByTagName("A");
		for(var i= 0;i<elementObj.length;i++){
			elementObj[i].disabled = flag;
		}
	}
}  

//���input��ֵ wy added 20090927
function clearInput(obj){
	if(obj.tagName == "INPUT" && obj.type=="text"){
		obj.value = ""
		obj.valueid = null;
		obj.valuecode = "";
		if(obj.row){
			obj.row = "";
			obj.page = "";
			obj.chkAll = false;
		}
	}
}

//��¼��Ĳ�ѯ����ת��Ϊ����ִ�е�sql���

/**
�жϲ����Ƿ����������ʽ����
*/
function getQueryStr(sql){
//debugger;
	//��ֹ������ź����Ż��ߵȺ�д��һ�𣬴������ź͵�ǰ�󶼼��Ͽո�
	var arrStrItem = insertSpace(sql).split(" ");
	//��ֹ��ֵռλ
	arrStrItem = arrStrItem.without("");
	for(var i = 0 ;i<arrStrItem.length;i++){
		//���Ƭ���Ƿ�������ʽ
		var strItem = arrStrItem[i];
		if(strItem.indexOf("$(")>-1){
			var arrEx = strItem.split("[");
			var arr = arrEx[1].split("]");
			var val = eval(arr[0]);
			var parentheses = [];
			//ʹ��������ƽ��
			leftparentheses = arrEx[0].match(/\(/g);
			rightparentheses = arr[1].match(/\)/g);
			if(rightparentheses!=null){
				if(leftparentheses != null){
					for(var k=0;k<rightparentheses.length - leftparentheses.length ;k++){
						parentheses.push(")");
					}
				}else{
					parentheses.push(rightparentheses);
				}
			} 
			if(val!=null && val!=""){
				val = val.toString();
				//ֵ�����һ�������,�Žص�
				if(val.endsWith(","))val = val.substring(0,val.length-1);
				//�����ʽ�滻��ֵ
				arrStrItem[i] = arrEx[0]+val+arr[1];
			}else{
				//debugger;
				if(!isExpressSymbol(strItem)){
					var symbol = "";
					if(typeof(arrStrItem[i-3])!= 'undefined' && arrStrItem[i-3] != null){
						symbol = arrStrItem[i-3].toLowerCase();
					}
					if(symbol !="" && isSpecialChar(symbol)){
						arrStrItem.splice(i-3,4,parentheses.join(""),"","","");
					}else{
						arrStrItem.splice(i-2,3,parentheses.join(""),"","");
					}
				}else{
					if(typeof(arrStrItem[i-1]) != "undefined" && arrStrItem[i-1] != null){
						symbol = arrStrItem[i-1].toLowerCase();
					}
					if(symbol !="" && isSpecialChar(symbol)){
						arrStrItem.splice(i-1,2,parentheses.join(""),"");
					}else{
						arrStrItem.splice(i,1,parentheses.join(""));
					}
				}
			}
		}
	}
	//��ֹ��һ��Ϊsql�����ַ�
	if(isSpecialChar(arrStrItem[0])){
		arrStrItem.splice(0,1);
	}
	return arrStrItem.join(" ").trim();
}
//�ж��Ƿ�Ϊsql��������ʾ
function isExpressSymbol(str){   
    var b = false;    
    var sArr = new Array("=","<",">","!=","<>");
    for(var i=0;i<sArr.length;i++){
        //alert(sArr[i] + "---" + str);
        if(str.indexOf(sArr[i])>-1){
            b = true;
            break;
        }
    }
    return b;
}
//�����Ż��ߵȺ����Ҳ���ո�
function insertSpace(sql){
	var arrStrItem = sql.split(" ");
	for(var i =0;i<arrStrItem.length;i++){
		var ment =  arrStrItem[i];
		if(ment.indexOf("(")>-1){
			arrStrItem[i] = ment.replace(/\(/g," (");
			arrStrItem[i] = arrStrItem[i].replace(/\$ /g,"$");
		}else if(ment.indexOf(")")>-1){
			arrStrItem[i] = ment.replace(/\)/g,") ");
			arrStrItem[i] = arrStrItem[i].replace(/\ \./g,".");
		}else if(ment.indexOf("=")>-1){
			var eq = ment.split("=");
			if(eq[0] != "")eq[0]+=" ";
			if(eq[1] != "")eq[1]=" "+eq[1];
			arrStrItem[i] = eq.join("=");
		}else{
			continue;
		}
	}
	return arrStrItem.join(" ");
}
//�ж��Ƿ�Ϊsql�������ַ�
function isSpecialChar(str){
	var b = false;
	if(str=="and" || str=="or" || str=="like"){
		b = true;
	}
	return b;
}
//wy ���ƿ������õķǷ��ַ�¼��
function checkValid(oTextbox){
	oEvent = event||window.event;
	//���⸴��ճ��ʱ���ԭ������
	if(isMoveCode(oEvent.keyCode))return;
	var sValidChars = oTextbox.getAttribute("validchars");
	var nValidChars = oTextbox.getAttribute("notvalidchars");
	
	var sValidReg = oTextbox.getAttribute("validreg");
	var nValidReg = oTextbox.getAttribute("notvalidreg");
	
	//input��textareaȡֵ��ʽ��ͬ
	var textVal = oEvent.srcElement.tagName.toUpperCase()=="TEXTAREA" ? oTextbox.innerText:oTextbox.value;
	//������ı��а����Ϸ��ַ�������ַ�
	if(sValidChars){
		var regs = new RegExp("[^"+sValidChars+"]","gi");
		textVal = textVal.replace(regs,"");
	}
	//������ı��а����Ƿ��ַ�
	if(nValidChars){
		var regs = new RegExp("["+nValidChars+"]","gi");
		textVal = textVal.replace(regs,"");
	}
	//����Ϸ��ַ��ж�
	if(sValidReg){
		textVal = textVal.replace(eval(sValidReg),"");
	}
	//���򲻺Ϸ��ַ��ж�
	if(nValidReg){
		textVal = textVal.replace(eval(nValidReg),"");
	}
	//input ��textarea��ֵ��ʽ��ͬ
	switch(oEvent.srcElement.tagName.toUpperCase()){
		case "INPUT":
			oTextbox.value = textVal;
			break;
			
		case "TEXTAREA":
		 	oTextbox.innerText = textVal;
		 	break;
	}
}

//wy �ж��Ƿ������������ƶ��Ѿ����˼�ctrl��
function isMoveCode(keycode){
	return keycode==8||keycode==37||keycode==38||keycode==39||keycode==40||oEvent.ctrlKey;
}


function checkNumber(oTextbox,compareObj){  
    oTextbox.value = oTextbox.value.trim();
    var inputVal = oTextbox.value;
    if(inputVal=="") return;
	var patrn=/^[0-9]+(.[0-9]{0,6})?$/;
	var isValidDate = patrn.exec(inputVal);
	if(!isValidDate){
		alert("ֻ��¼�����֣���������д��");
		oTextbox.value = "";	
	}
}  
//����У��ֻ������ٽ�� ����ʾ
function checkDate1(oTextbox){
    oTextbox.value = oTextbox.value.trim();
	var inputVal = oTextbox.value;
	var regDate = /^(?:(?!0000)[0-9]{4}([-/.]?)(?:(?:0?[1-9]|1[0-2])([-/.]?)(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])([-/.]?)(?:29|30)|(?:0?[13578]|1[02])([-/.]?)31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-/.]?)0?2([-/.]?)29)$/g;
	var isValidDate = regDate.test(inputVal);
	if(!isValidDate&&inputVal!=null&&inputVal!=""){
		return false;
	}
	return true;
}

/**
 * @param oTextbox ��������
 * @param formid �༭���ᴫ�ݴ˲������༭��ֻ֧��yyyymmdd��ʽ�����㱣��
 * 2012-04-26�޸�
 * ��ѯ��,��֤�����Ƿ������ʽ yyyymmdd ���� yyyy-mm-dd,����ֻ֧�������ָ�ʽ
 * �����ѯ�����ڸ�ʽ��û��ʲô���ã�ֻ������yyyymmdd��ʽ
 * @param oTextbox
 */
function checkDate(oTextbox,formid){
    oTextbox.value = oTextbox.value.trim();
	var inputVal = oTextbox.value;
	//��ʽ��yyyymmdd
	var regDate = /^(?:(?!0000)[0-9]{4}([-]?)(?:(?:0?[1-9]|1[0-2])([-]?)(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])([-]?)(?:29|30)|(?:0?[13578]|1[02])([-]?)31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-]?)0?2([-]?)29)$/g;
	var isValidDate = regDate.test(inputVal);
	if(!isValidDate&&inputVal!=null&&inputVal!=""){
		alert("���ڻ��ʽ������������д��");
		oTextbox.value = "";
	}else{
		if(inputVal.indexOf("-")>-1 && typeof formid !="undefined" && formid) {
			inputVal = 	inputVal.replace(/-/g,"");
		}
		else if(inputVal.indexOf("/")>-1 || inputVal.indexOf(".")>-1){
			inputVal = 	inputVal.replace(/\//g,"").replace(/\./g,"");
		}
		oTextbox.value = inputVal;
	}
}
/**
 * ���ö��������¿ؼ��ĸ�ʽ���.
 * ��֤�����Ƿ������ʽ yyyymm ���� yyyy-mm,����ֻ֧�������ָ�ʽ
 * add 20130204
 */
function checkDate2(oTextbox,formid){
    oTextbox.value = oTextbox.value.trim();
	var inputVal = oTextbox.value;
	//��ʽ��yyyymm
	var regDate = /^\d{4}([-]?)([1-9]|0[1-9]|1[0-2])$/g;
	var isValidDate = regDate.test(inputVal);
	if(!isValidDate&&inputVal!=null&&inputVal!=""){
		alert("���ڻ��ʽ������������д��");
		oTextbox.value = "";
	}else{
		if(inputVal.indexOf("-")>-1 && typeof formid !="undefined" && formid) {
			inputVal = 	inputVal.replace(/-/g,"");
		}
		else if(inputVal.indexOf("/")>-1 || inputVal.indexOf(".")>-1){
			inputVal = 	inputVal.replace(/\//g,"").replace(/\./g,"");
		}
		oTextbox.value = inputVal;
	}
}
//��������У��ֻ������ٽ�� ����ʾ
function checkDate3(oTextbox){
    oTextbox.value = oTextbox.value.trim();
	var inputVal = oTextbox.value;
	var regDate = /^\d{4}([-]?)([1-9]|0[1-9]|1[0-2])$/g;
	var isValidDate = regDate.test(inputVal);
	if(!isValidDate&&inputVal!=null&&inputVal!=""){
		return false;
	}
	return true;
}
/*
* ��Ŀ������ʱʹ��
* @progamAddElements ��Ŀ����ҳ��������
* @repeatprogram ��������
* @isQuery ��ѯ��
*/
function indi_SelectElementTreeForEditWithFieldCTRL(mainmenu, submenu, vchtypecode, vchfieldcode, backinput, vou, defaultvalue, anyvaluetag, parsetype, allField, elementfilter, programdefaultvalue,isQuery,ismutl,isEdit,mustselect,progamAddElements,repeatprograms) {
	var selvalue = backinput.valuecode != undefined ? backinput.valuecode : backinput.valueid;
	var page = backinput.page;
	var row = backinput.row;
	if(typeof(ismutl) == "boolean"){
		if(ismutl){
			ismutl=2;
		}else	{
			ismutl=1;
		}
	}
	window.selvalue = selvalue;
	window.row = row;
	window.page = page;
	window.chkAll = backinput.chkAll;
	var relationprogram = "";
	var bdgagencyid = "";
	var bdgmanagedivisionid = "";
	var isreport = "";
	//������ص�ҵ��ϵͳ��ʱ����ѯ������Ŀ,���ѯ��ʶʧЧ
	if(typeof(reportcode)!='undefined' && reportcode)isreport = reportcode;
	//����Ŀ��ϵ��ѯ����relationtablecodeΪҵ���ṩ����
	if(typeof(relationtablecode)!='undefined' && relationtablecode != null)relationprogram = relationtablecode; 
	if($("queryform")){
		if($("queryform").bdgagency)bdgagencyid = $("queryform").bdgagency.valueid?$("queryform").bdgagency.valueid:"";
		if($("queryform").bdgmanagedivision)bdgmanagedivisionid = $("queryform").bdgmanagedivision.valueid?$("queryform").bdgmanagedivision.valueid:"";
	}
	if(progamAddElements)window.progamAddElements = progamAddElements;
	if(repeatprograms)window.repeatprograms = repeatprograms;
    /** ganhua 20080304 �ڴ�ѡ�񴰿�ǰ�ص�һ��������ĳЩ����
	  * �磺���ù�����������������������ؼ��Ƿ�ѡ��ֵ
	  * 
	**/
	var func = "callBeforeOpenMultElementTree_"+vchfieldcode+"(window)";
	beforeMakeTree(func);
	var stopFlag = window.stopFlag != null ? true : false;
	if(stopFlag) {
		//����ȫ�ֱ��������Ӱ������
		window.stopFlag = undefined;
		return;
	} 
	elementfilter = setElementfilter(elementfilter);
	//if(elementfilter.indexOf(",")>-1)elementfilter = elementfilter.replaceAll(",","");
	window.programdefaultvalue = programdefaultvalue;
	window.elementfilter = elementfilter;
	window.vchfieldcode=vchfieldcode;
	window.ismutl=ismutl;
	window.mustselect = mustselect;
		var voucher = new Array();
		// �߼���ѯʱvou����δ����
		if(!vou)vou = new Object;
		voucher[voucher.length] = vou;
		
		if(!isEdit) isEdit = 0; 
		var url = ROOT_PATH + "/common/jump/htmldialog2.jsp?isedit="+isEdit+ "&mainmenu=" + mainmenu + "&submenu=" + submenu + "&isQuery=" + isQuery + "&relationprogram=" + relationprogram+ "&bdgagencyid=" + bdgagencyid+ "&bdgmanagedivisionid=" + bdgmanagedivisionid + "&vchtypecode=" + vchtypecode + "&voucher=" + voucher.toJSON() + "&defaultvalue=" + defaultvalue+"&isreport="+isreport;
		var result = window.showModalDialog(url, window, "dialogHeight:700px;dialogWidth: 750px;resizable: No; status: No;help:No;");
		if(window.elementfilter);
		{
			window.elementfilter = null;
		}
		if (result != null) {
			if (typeof(result)=="object") {
				if (backinput == null) {
					backinput = $(vchfieldcode);
				}
				//����CODE����
				backinput.value = result.value;
				backinput.valueid = result.id;
				backinput.isleaf= result.isleaf;
				backinput.valuecode = result.valuecode;
				backinput.row = result.data;
				backinput.page = result.page;
				backinput.chkAll = result.chkAll;
			}
		}
}

var isIE;
if(window.navigator.userAgent.indexOf("MSIE")>=1){
   isIE=true;
}else
   isIE=false;

function removeUserData(id,key){
   try{ 
	   obj=document.getElementById(id+"_div");
	   if(obj==null) return null;
	   if(key==null) return null;
	   if(isIE){
	    	var _user ="";
	    	var _path =location.pathname;
	    	if(typeof(current_user)!="undefined"){
	    		_user = current_user;
	    	}
	    	if(typeof(comlinkname)!="undefined"){
	    		_path = comlinkname;
	    	}
		    with(window.document.body)
		    {
		        obj.removeAttribute(key);
		        obj.save(JQ.md5(_path+_user)); 
		    }
	    }else if(window.sessionStorage){
		    headString = sessionStorage.removeItem(key+"_head");
		}
    }catch(ex){} 
}

function getUserData(obj,key){
    var headString;
    try{
	    if(obj==null) return null;
	    if(key==null) return null;
	    if(isIE){
	    	var _user ="";
	    	var _path =location.pathname;
	    	if(typeof(current_user)!="undefined"){
	    		_user = current_user;
	    	}
	    	if(typeof(comlinkname)!="undefined"){
	    		_path = comlinkname;
	    	}
		    with(window.document.body)
		    {    
		    	var  content = JQ.md5(_path+_user);
		        obj.load(content); 
		        headString = obj.getAttribute(key);
		    }
		}else if(window.sessionStorage){
		    headString = sessionStorage.getItem(key+"_head");
		}
	}catch(ex){
	} 
	return headString;
	
}

function setUserData(obj,key,headString){
    try{
	    if(obj==null) return;
	    if(key==null) return;
	    if(isIE){   
	    	var _user ="";
	    	var _path = location.pathname;
	    	if(typeof(current_user)!="undefined"){
	    		_user = current_user;
	    	}
	    	if(typeof(comlinkname)!="undefined"){
	    		_path = comlinkname;
	    	}
		    with(window.document.body)
		    {    
		        obj.setAttribute(key,headString);
		        var de = JQ.md5(_path+_user);
		        obj.save(de);
		    }
		}else if(window.sessionStorage){
		    sessionStorage.setItem(key+"_head",headString);
		}
	}catch(ex){
	}
}
function setUserDataByElementId(id,key,headString){
    obj = document.getElementById(id+"_div");
    setUserData(obj,key,headString);
}

function getUserDataByElementId(id,key){
    obj = document.getElementById(id+"_div");
    return getUserData(obj,key);
}

function getSelfDefElementById(id){
    return document.getElementById(id);
}

function updateArray(oArray,aArray){
  var i,j,isExist,newArray;
  for(i = 0 ;i<aArray.length;i++) {
  	 isExist = false; 
  	 for(j = 0 ;j<oArray.length;j++) {
          if(aArray[i]==oArray[j]){
              isExist = true;
          }
     }
     if(!isExist) oArray.push(aArray[i]);
  }
  
  newArray = new Array();
  for(i = 0 ;i<oArray.length;i++) {
  	 isExist = false; 
  	 for(j = 0 ;j<aArray.length;j++) {
          if(aArray[j]==oArray[i]){
              isExist = true;
          }
     }
     if(isExist) newArray.push(oArray[i]);
  }
  return newArray;
}
/**
* �༭��������ƹ���Ĭ��ֵ
**/
function setInputRuleDefaultValue(form,elementname,vchtypecode,submenu){
    if(form==null) return;
    var obj=null;var objvalue=null;
    obj = form.elements[elementname];
    if(obj==null) return;
    if(obj.tagName=="select")
        objvalue = obj.value;
    else if(obj.valueid!=null)
        objvalue = obj.valueid;
    if(objvalue==null) return;      
    var ruleObj = new Object();
	eval("ruleObj."+elementname+"=objvalue");

    new Ajax.Request(
           ROOT_PATH+"/common/getInputRuleDefaultValue.do",
           {method: 'post', parameters: "submenu="+submenu+"&vchtypecode="+vchtypecode+"&voucher="+Object.toJSON(ruleObj),
            onComplete: function(resp){
			var jsons = resp.responseText.evalJSON(true);
			for (items in jsons){
			     var json = jsons[items];
			     
			     setValueToObject(form,items,json);  
			}
            }}
           );  
}
function setValueToObject(theForm,element,valueObj){
     var obj = theForm.elements[element];
     if(obj==null) return;
     if(obj.tagName=="select"){
         var oos = obj.options;                  
	     for (var i = 0; i < oos.length; i++) { 
	     if (oos.options[i].value == valueObj.id) {        
	             oos.options[i].selected = true;        
	             return;       
	         }        
	     }              
    
     }else{
          if(valueObj.id!=null){
             obj.valueid=valueObj.id;
             var objv ="";
             if(valueObj.code!==null)
                 objv = valueObj.code;
             if(valueObj.name!=null){
                  if(objv!=""){
                  	if(checkCodeShowFlag(element)) {
                  		objv=objv+"-"+valueObj.name;
                  	} else {
                  		objv =valueObj.name; 
                  	}
                  }
                  else {
                  objv =valueObj.name; 
                  }
             }    
             obj.value=objv;
          }   
               
     }
     datasynch(obj);
}       
//--------------��ѯ��������lp 100421-----------
/**
 * �����ѯ����Ĭ��ֵ,֧�ֱ��������
 * @param linkname ���ӵ�ַ
 * @param formid ��id
 * @param mycondition �û��Զ����ѯ����ʶ
 */
function saveQuery(linkName, formid, mycondition){
 	var theForm = document.getElementById(formid);
 	var formElems = theForm.getElementsByTagName("INPUT");
	for(var i=0;i<formElems.length;i++){
	    var inptObj = formElems.item(i);
	    if(inptObj.type == "text" && inptObj.valuetype == "number"){
	      if( inptObj.value!=null && inptObj.value.trim()!="" && !inptObj.value.isNumber()){
			        alert(inptObj.elementname+"����������");
			        inptObj.focus();
			        return;
			      }
	    }
	}
    var url = "/system/savequery/save.do";
	var pars = "";
	for(var i=0;i<formElems.length;i++){
		var inptObj = formElems.item(i);
		if(inptObj.type == "text" && inptObj.value!=""){
			if(inptObj.valueid != null){
				pars +="@"+inptObj.name+":"+inptObj.valueid+":"+inptObj.value+":"+inptObj.valuecode;		
			}else{
				pars +="@"+inptObj.name+":"+inptObj.value;
			}
		}else if(inptObj.type!="hidden" && inptObj.value!=null && inptObj.value!="")
		    pars +="@"+inptObj.name+":"+inptObj.value;   
		  
	}
	if(pars.trim()==""){
		for(var i=0;i<formElems.length;i++){
			var inptObj = formElems.item(i);
			if(inptObj.type == "text"){
				pars +="@"+inptObj.name+":"+" ";   
			}else if(inptObj.type!="hidden")
				pars +="@"+inptObj.name+":"+" ";   
			 
		}
	}
	//����֧��SELECT��ѯ�����ı���
	var formSelectArr = JQ("#"+formid).find("select").find("option:selected");
	for(var j=0;formSelectArr.length>0 && j<formSelectArr.length;j++){
		var formSel = formSelectArr[j];
		if(formSel.value !=""){
				var selectObj = formSel;
				pars +="@"+selectObj.parentNode.name+":"+selectObj.value+":"+selectObj.text+":"+selectObj.valuecode;
		}
	}
	if(pars!=""){
	   pars="query="+pars+"&";
	}
	pars = pars+"linkName="+linkName;
	//
	if(mycondition){
		pars = pars+"&mycondition="+mycondition;
	}
    var url = "/system/savequery/save.do";
/*    var myAjax = new Ajax.Request(url,
          {
            method:'post',
            parameters:pars,
            onComplete:savedquery
           });*/
     JQ.ajax({
    	type: "post",
    	url:url,
    	data:pars,
    	success:savedquery,
    	error:function(){
    		alert("����ʧ��!");
    	}
    });
}
/**
 * ɾ���Զ���Ĭ�ϲ�ѯ����
 * @param linkname ���ӵ�ַ
 * @param mycondition �û��Զ����ѯ����ʶ
 */
function deleteDefaultQuery(linkname,mycondition){
	var pars = "linkName="+linkname;
	if(mycondition){
		pars = pars+"&mycondition="+mycondition;
	}
    JQ.ajax({
    	type: "post",
    	url:"/system/savequery/delete.do",
    	data:pars,
    	success:function(){
			alert("��ճɹ�!");
		},
    	error:function(){
    		alert("���ʧ��!");
    	}
    });
	
}
function savedquery(){
  alert("����ɹ�!");
}
//��ʾ����div����
var a;
var element;
var treetype; //dm��ѡ��,ds��ѡ��,sds���㵥ѡ,sdm�����ѡ
var OnlyBottom; //ĩ������
var selvalue; 
var selectObj = new Object();
selectObj.value="";
selectObj.id="";
var divForm ;
var InputRuleDefault = new Object(); //�༭�����ƹ���
var keyCodes = [17,38,40,13,8];//���¼��ͻس����˸�KEYCODE
var dragData = {};
function divShow(type,mainmenu,submenu,vchtypecode,vchfieldcode,editForm,elementfilter,obj,backinput,defaultvalue,anyvaluetag,parsetype,setInputValue,jsfunction){
	jsFunctionname = jsfunction;
	element = vchfieldcode;
    divForm = editForm;
    InputRuleDefault.inputtag = setInputValue;
    InputRuleDefault.elementname = vchfieldcode;
    if(backinput)InputRuleDefault.setInputForm = backinput.form;
    InputRuleDefault.vchtypecode = vchtypecode;
    InputRuleDefault.submenu = submenu;
    treetype = type;   //������
    key = event.keyCode;
    //debugger;
    if(keyCodes.indexOf(key)>-1){
      	keyEvent(key);
      	return;
    }
	elementfilter = getQueryStr(elementfilter); //wy add ���ý������ù�������
    var tree_inner = $("tree_inner");
    //if(tree_inner.style.display=="none" || tree_inner.style.display==""){
		    if(tree_inner.innerHTML!="")tree_inner.innerHTML="";
		    new Insertion.Bottom(tree_inner,getHTML());
		    getSizeAndPos();
		    tree_inner.style.display="block";
		    //���ҳ��������������������
		   	document.body.onmousedown = function(){
		      if(tree_inner.style.display == "block" && !$(element+"_inner").contains(event.srcElement) && event.srcElement.id != element+("_sure")){
			      tree_inner.hide();
			      document.body.onmousedown = null;
		      }
		    }
		    var Obj = getObj();
		    var dselvalue = Obj.valuecode;
		    selvalue=Obj.valuecode!=undefined?Obj.valuecode:Obj.value
			
			var pars = 'submenu='+submenu +'&vchtypecode='+vchtypecode + '&vchfieldcode='+vchfieldcode+'&elementfilter='+elementfilter+'&voucher='+Object.toJSON(obj)+"&defaultvalue="+defaultvalue+"&anyvaluetag="+anyvaluetag+"&parsetype="+parsetype+"&selvalue="+dselvalue;
			var url = "/common/mutlelemtree.do";
			//ͨ��ajax�õ�ElementData;
			var myAjax = new Ajax.Request(url,
			   {
			     method:'post',
		         parameters:pars,
		         onComplete:getElementData
			   });
}

//�õ������html
function getHTML(){
    var treeHTML='<div id="'+element+'_inner" style="overflow:auto;height:150px; z-index:200; border:1px #5779A5 solid; background:#FFF;"></div>';
    if(treetype=="dm" || treetype == "sdm"){
    treeHTML+='<div id="pop_button"><center><input type="button" style="width:50px;" onclick="javascript:closeMWindow(true)" id="'+element+'_sure" value="ȷ��" class="button_style" onmouseover="onMOver(this);" onmouseout="onMOut(this)" onmousedown="selectT(this)"/><input style="width:50px;" type="button" onclick="javascript:closeMWindow(false)" value="ȡ��" class="button_style" onmouseover="onMOver(this);" onmouseout="onMOut(this)" onmousedown="selectT(this)"/></center></div>';
    }
    else if(treetype=="ds"){
    treeHTML+='<div id="pop_button"><center><input type="button" style="width:50px;" onclick="javascript:closeSWindow(true)" id="'+element+'_sure" value="ȷ��" class="button_style" onmouseover="onMOver(this);" onmouseout="onMOut(this)" onmousedown="selectT(this)"/><input style="width:50px;" type="button" onclick="javascript:closeSWindow(false)" value="ȡ��" class="button_style" onmouseover="onMOver(this);" onmouseout="onMOut(this)" onmousedown="selectT(this)"/></center></div>';
    }
    else if(treetype=="sds"){
    treeHTML+='<div id="pop_button"><center><input style="width:50px;" type="button" onclick="javascript:closeSWindow(false)" value="ȡ��" class="button_style" onmouseover="onMOver(this);" onmouseout="onMOut(this)" onmousedown="selectT(this)"/></center></div>';
    }
    return treeHTML;
}

//������������С��λ��
function getSizeAndPos(){
    //��������div���  
    var Obj = getObj();  
    var km = Obj.offsetWidth;
    tree_inner.style.width =km+12;
    $(element+"_inner").style.width =km+12;
        
     var x = 0;
     var y = 0;
     var screen_x = 0;
     var screen_y = 0;
	 for (var el = Obj; el; el = el.offsetParent) {
	            if(el.id=="main")break;
				x += el.offsetLeft;
				y += el.offsetTop;
	 }
	 
	  y = y+Obj.offsetHeight;
	  screen_x=document.body.clientWidth;
	  screen_y=document.body.clientHeight;
      //alert("screen_x="+screen_x+"screen_y="+screen_y);
      //alert("x="+x+"y="+y);
      tree_inner.style.left = x;
      if(y+150>screen_y){
       tree_inner.style.top = y-133;
      }else{
       tree_inner.style.top = y; 
      }
}
//�õ���ͬ�������
function getObj(){
    var Obj=typeof(divForm)=="string"?eval("$("+divForm+")."+element):$(element); 
    return Obj;
}
//������
function getElementData(request){
     d = new Object();
     var Data = request.responseText.evalJSON(true);
     elementData = eval(Data.elements);
     OnlyBottom = Data.onlybottom;
     if(treetype == "dm" || treetype =="ds"){
     a =  new MzTreeView();
            a.dataSource =  getTree(elementData);
            a.autoSort = true;
            if(treetype=="dm"){
            	a.useCheckbox = true;
            }
            if(treetype=="ds"){
            	a.useCheckbox = false;
            }
            a.canOperate = true;
            a.lastNode = "";
            document.getElementById(element+"_inner").innerHTML=a.render();
            a.expandLevel(1);
            try{
	            if($(element+"_inner").readyState == "complete"){
				   a.getPosition();
				}
			}catch(e){};
    }            
    //�����ѡ
    var inhtml;
    if(treetype == "sdm" || treetype == "sds"){
         var py = $(element).value;
         if(key<1 && ";".indexOf(py)<0)py=py+";";
         try{
         pyDataArr = pyDataArr.splice(0,0);
         }catch(e){}
         pyDataArr =  !!py?findByPy(elementData,py):[];
         var singleData = new Object();
         dragData = dataToObj(singleData,elementData,pyDataArr);
	     inhtml = getSingle(dragData,treetype);
	     document.getElementById(element+"_inner").innerHTML ="";
	     new Insertion.Bottom(element+"_inner" , inhtml);
	     try{
	     		 var _Obj = getObj();
	     		 if($(element+"_inner").readyState == "complete" && _Obj.value !=null && _Obj.value !="" ){
				   getDivPosition( _Obj.valueid,dragData);
				}
	     }catch(e){}
	     keyCount =0;
    }
}
//�����б�����λ
function getDivPosition(valid,data){
	    var arrCheckValue = valid.split(",");
	    for(var i in data){
	    	if(arrCheckValue[0]==i){
	    	   var Obj = $(i);
	    	   var y = 0;
               for (var el = Obj; el; el = el.offsetParent) {
					y += el.offsetTop;
					if(el.id == "tree_inner")break;
			  	}	
		  	   var tree_inner = document.getElementById("tree_inner");
	   	       var divStop = tree_inner.childNodes[0].scrollTop;
	   	       //alert(y+";"+divStop);
			   if(y>150){
			     tree_inner.childNodes[0].scrollTop = y-150;
		   	   }    	
	    	}
	    }
}
function dataToObj(singleData,elementData,pyDataArr){
     for(var i = 0 ;i<elementData.length;i++){
        var k = elementData[i].id;
        var kcode = elementData[i].code;
        //code����
	        if(!!pyDataArr && pyDataArr.length>0){
	           if(pyDataArr.indexOf(kcode)>-1){
	        	singleData[k]=checkCodeShowFlag(element)? elementData[i].label : elementData[i].name;
	           }
	        }else{
	            singleData[k]=checkCodeShowFlag(element)? elementData[i].label : elementData[i].name;
	        }
	        if(elementData[i].children){
	       	 	dataToObj(singleData,elementData[i].children,pyDataArr);
	        }
     }
     return singleData;
}

//��������
function getSingle(data,type){
  var Obj = getObj();
  var htm = "<table id='singleTable' cellspacing='0' cellpadding='0' border='0' width='100%'>";
  for(var i in data){
	  htm += "<tr><td>";
	  if(type == "sdm"){
	    htm += "<div class='single_select' onmouseover='singleOver(this)' onmouseout='singleOut(this)' onclick='selectCK(this);'><input type='checkbox' onclick='selectCK(this);'  id='"+i+"' value ='"+data[i];
	    if(Obj.valueid !=null && Obj.valueid !=""){
		    var arrCheckValue = Obj.valueid.split(",");
		    htm +=arrCheckValue.indexOf(i)>=0?"' checked >":"'>"
	    }
	    else{
	    	htm +="'>";
	    } 
	  }
	  else if(type == "sds"){
	    htm += "<div  onmouseover='singleOver(this)' onmouseout='singleOut(this)'  onclick='singleClick(this)' id='"+i+"' value ='"+data[i];
	    if(Obj.value !=null && Obj.value !=""){
	       htm +=Obj.valueid == i?"' class='click_single_select'>":"' class='single_select'>";
	    }
	    else{
	       htm += "' class='single_select'>"
	    }
	  }
	  htm += data[i]+"</div></td></tr>";
  }
  htm += "</table>";
  return htm;
}
//��������ѡ��checkbox
function selectCK(obj){
    if(obj.type == "checkbox"){ 
     obj.checked = !obj.checked;
    }else{
  	 obj.firstChild.checked = !obj.firstChild.checked;
    }
}

//����õ�ѡ��ֵ
function getSingleSelected() {
    
	var result = new Object();
	result["value"] = "";
	result["id"] = "";
	result["valuecode"] = "";
	result["isleaf"] = "";
	var singleData = new Object();
	var data = dataToObj(singleData,elementData)
	for(var i in data){
		  if($(i)!=null && $(i).checked){
			  result["value"] += $(i).value+";";
			  result["id"] += i+",";
			  result["valuecode"] +=$(i).valuecode+";"; 
		  }
	}
	return result;
}
//����������ƶ���ʽ
function singleOver(Obj){
  if(Obj.className!='click_single_select')
  Obj.className='over_single_select';
}
function singleOut(Obj){
  if(Obj.className!='click_single_select')
  Obj.className='single_select';
}
//���㵥��
function singleClick(obj){
	var eleobj = getObj();
	if(obj){
		eleobj.value = obj.value;
		eleobj.valueid = obj.id;
		eleobj.valuecode = obj.valuecode;
	}else{
	    eleobj.value = "";
		eleobj.valueid = "";
		eleobj.valuecode = "";
	}
	closeSWindow(true);
}
//��ѡ�ر�
function closeMWindow(isReturn){
	var eleobj = getObj();
    if(isReturn){
     		var result = treetype=="dm" ? getTreeSelect():getSingleSelected();
     		if(result.value){
			     eleobj.value = result.value;
			     eleobj.valueid =result.id;
			     eleobj.valuecode = result.valuecode;
			     eleobj.isleaf = result.isleaf;
		     }else{
			     eleobj.value = "";
			     eleobj.valueid = "";
			     eleobj.valuecode = "";
			     eleobj.isleaf = "";
		     }
    }
	var func;
    try{
        /* ��̬���ø����ڵ�ĳ������(����:ѡ����window),
         * ��������ڳ�ʼ����֮ǰ������
         * ��������ڸ����ڿ�ʵ��,���ʵ�ֿ��Զ������������κβ���,��:��������,
         * ��Ȼ,�ڸ�����Ҳ���Բ�ʵ�ָķ���
         * ganhua 20090212
         **/
        func="callByMultElementTreeBeforeClose_"+element+"()";
        eval(func);
	}catch(e){
		//alert("��̬���ø����ڵ�ĳ����������:"+func);
		//���ɹ�,������,��������û��ʵ�ָķ�������
	}
	
    $("tree_inner").hide();
    synchAndRule(eleobj);
    dosearch(eleobj);
}
//��ѡ���ر�
function closeSWindow(isReturn){
    var eleobj;
    if(treetype=="ds" && isReturn){
        if(isReturn && OnlyBottom && a.selectedNode.hasChild){
			alert("ֻ��ѡ��ĩ��");
			return;
		}
	    else if(a.selectedNode!=null){
		    eleobj = getObj();
        	var arrPath = a.selectedNode.path.split("_");
	        var arrCode = [];
	        for(var i =0;i<arrPath.length;i++){
	            if(arrPath[i]!="-1" && arrPath[i]!="root"){
	               arrPath[i]==a.selectedNode.id ? arrCode.push(arrPath[i]):arrCode.push("N"+arrPath[i]);
	            }
	     }
	        eleobj.value=a.selectedNode.text;
		    eleobj.valueid=idHashMap.Get(a.selectedNode.id);
		   	eleobj.isleaf=leafHashMap.Get(a.selectedNode.id);
		    eleobj.valuecode=arrCode.length==1?arrCode.join(",")+"," : arrCode.join(",");
		}
   }	
	var func;
    try{
        /* ��̬���ø����ڵ�ĳ������(����:ѡ����window),
         * ��������ڳ�ʼ����֮ǰ������
         * ��������ڸ����ڿ�ʵ��,���ʵ�ֿ��Զ������������κβ���,��:��������,
         * ��Ȼ,�ڸ�����Ҳ���Բ�ʵ�ָķ���
         * ganhua 20090212
         **/
        func="callByElementTreeBeforeClose_"+element+"()";
        eval(func);
        
	}catch(e){
		//alert("��̬���ø����ڵ�ĳ����������:"+func);
		//���ɹ�,������,��������û��ʵ�ָķ�������
	}
	 $("tree_inner").hide();
	 synchAndRule(eleobj);
	 dosearch(eleobj);
}
//ͬ������ƹ���
function synchAndRule(eleobj){
     if(typeof(divForm)=="string") datasynch(eleobj);
	 if(InputRuleDefault.inputtag)
	 setInputRuleDefaultValue(InputRuleDefault.setInputForm,InputRuleDefault.elementname,InputRuleDefault.vchtypecode ,InputRuleDefault.submenu);
}
//���¼����ƣ��س�ѡ��ֵ,��ѡ�ո�ѡ��
var keyCount =0;
function keyEvent(key){
//debugger;
   if($(tree_inner).style.display != "block" && key !=8)return;
   var codeArr = getCodeArr(dragData);
   try{
	   if(key == 40){
	     //alert(keyCount+";"+codeArr.length);
			  if(keyCount<codeArr.length){
			           if(treetype=="sdm"){
			                if(keyCount>0){
			                   if($(codeArr[keyCount]).parentNode.className!="over_single_select"){
						            $(codeArr[keyCount-1]).parentNode.className="single_select";
							        $(codeArr[keyCount]).parentNode.className="over_single_select";
						        }else{
							        $(codeArr[keyCount]).parentNode.className="single_select";
							        $(codeArr[keyCount+1]).parentNode.className="over_single_select";
						        }
					        }else{
						        $(codeArr[keyCount]).parentNode.className="over_single_select";
					        }
				        }else{
				            if(keyCount>0){
				               if($(codeArr[keyCount]).className!="over_single_select"){
				                    $(codeArr[keyCount-1]).className="single_select";
				                    $(codeArr[keyCount]).className="over_single_select";
				               }else{
							        $(codeArr[keyCount]).className="single_select";
							    	$(codeArr[keyCount+1]).className="over_single_select";
						    	}
					    	}else{
						    	$(codeArr[keyCount]).className="over_single_select";
					    	}
				    	}
				    	if(keyCount>5){
					    	$(element+"_inner").scrollTop +=20;
				    	}
				    	keyCount++;
			    }else{
			        if(treetype=="sdm"){
			        	$(codeArr[keyCount-1]).parentNode.className="single_select";
			        }else{
			        	$(codeArr[keyCount-1]).className="single_select";
			        }
			        keyCount=0;
			        $(element+"_inner").scrollTop = 0;
			    }
	   	}
	   	if(key == 38){
	   	      if(keyCount==0){
		   	       var len = codeArr.length;
		   	       if(treetype=="sdm"){
			   	       $(codeArr[keyCount]).parentNode.className="single_select";
			   	       keyCount = len-1;
			   	       $(codeArr[keyCount]).parentNode.className="over_single_select";
		   	       }else{
			   	       $(codeArr[keyCount]).className="single_select";
			   	       keyCount = len-1;
			   	       $(codeArr[keyCount]).className="over_single_select";
		   	       }
		   	       $(element+"_inner").scrollTop =(len)*20;
	   	       }else{
	   	           if(treetype=="sdm"){
	   	               if($(codeArr[keyCount-1]).parentNode.className!="over_single_select"){
			   	           $(codeArr[keyCount]).parentNode.className="single_select";
					       $(codeArr[keyCount-1]).parentNode.className="over_single_select";
				       }else{
				           $(codeArr[keyCount-1]).parentNode.className="single_select";
					       $(codeArr[keyCount-2]).parentNode.className="over_single_select";
				       }
	   	           }else{
	   	              if($(codeArr[keyCount-1]).className !="over_single_select"){
			   	           $(codeArr[keyCount]).className="single_select";
					       $(codeArr[keyCount-1]).className="over_single_select";
				       }else{
				           $(codeArr[keyCount-1]).className="single_select";
					       $(codeArr[keyCount-2]).className="over_single_select";
				       }
			       }
			       keyCount--;
			       //alert(codeArr.length - keyCount);
			       if(codeArr.length - keyCount > 6){
			        $(element+"_inner").scrollTop -= 20;
			       }
	   	       }
	   	}
	   	if(key == 13){
	   	    if(treetype=="sds")
	   	    singleClick($(codeArr[keyCount-1]));
	   	    if(treetype=="sdm")
	   	    closeMWindow(true);
	   	}
	   	if(key == 17 && keyCount>0 && treetype=="sdm"){
	   	    selectCK($(codeArr[keyCount-1]));
	   	}
	   	if(key == 8){
	   	    clearInputRule(InputRuleDefault.elementname);
		    $(InputRuleDefault.elementname).valueid = null;
		    $(InputRuleDefault.elementname).valuecode = "";
	   	}
   	}catch(e){
   	}
}
//�õ���ʾ�б����ݱ�������
function getCodeArr(data){
    var arr=[];
      for(var pro in data){
        arr.push(pro);
      }
      return arr;
}


function selectT(obj){
		obj.className = 'down';
	}
function onMOver(obj){
		obj.className = 'OverBtn';
	}
function onMOut(obj){
		obj.className = 'button_style';
	}

function showOverlibTips(msg,obj){
   // return overlib(msg,TIMEOUT, 2000,WRAP,BASE,2,OFFSETX,-10,OFFSETY,20,TEXTPADDING,4,TEXTFONTCLASS, 'standard_fontsize', FILTER,FILTERSHADOW,2,FILTERSHADOWCOLOR,'#4466ff',
    // SHADOW, SHADOWCOLOR,'#4466ff');return false;
	try{
		 if(msg.trim().length==0 || msg.indexOf("div")>0 || msg.indexOf("DIV")>0) return;
		 return overlib(msg,WIDTH,obj.offsetWidth,HEIGHT,25,TEXTPADDING,6,BASE,2,BGCLASS,'olbg', CGCLASS,'olcg', FGCLASS,'olfg',TEXTFONTCLASS,'standard_fontsize',CENTER,OFFSETY,10,
		 FILTER,FADEIN,47,FADEOUT,47,FILTERSHADOW,2,FILTERSHADOWCOLOR,'#4466ff',
		 SHADOW,SHADOWCOLOR,'#4466ff');return false;
	}catch(e){}
   //return overlib(msg,CLOSECLICK,TIMEOUT, 2000,HEIGHT,60,TEXTFONTCLASS ,'standard_fontsize',BORDER,5,FGCLASS,'fgClass',BGCLASS,'bgClass',OFFSETX,0);return false;
}
//�б���Ŀ��ר��overlib
function programShowOverlibTips(msg,obj){
	 try {
	     if(msg.trim().length==0 || msg.indexOf("div")>0 || msg.indexOf("DIV")>0) return;
	     return overlib(msg,WIDTH,obj.offsetWidth,HEIGHT,20,TEXTPADDING,6,BASE,0,BGCLASS,'prgramolbg', CGCLASS,'olcg', FGCLASS,'olfg',TEXTFONTCLASS,'standard_fontsize',CENTER,
	     FILTER,FADEIN,47,FADEOUT,47,FILTERSHADOW,2,FILTERSHADOWCOLOR,'#4466ff',SHADOW,SHADOWCOLOR,'#4466ff');return false;
	 }catch(e){}
}

//��ѯ��inputtips���÷���
//jzy�Ż�����div����ʾ״̬ʱ������ı�������ȥ����һ�������Լ��������������������������£�����ʹ��Qtree�ĵ�������
function selectQueryAuto(mainmenu,submenu,vchtypecode,vchfieldcode,backinput,allField,elementfilter,obj,checkflag,jsFunction){
	//wy add 20090923
	var obj={isvisible:null};
	 if(backinput["query_me"]!=null&&backinput["query_me"].autoobj!=null){
		 backinput["query_me"].autoobj.isvisible(obj); //�����ڲ���������DIV�Ƿ�չʾ�������false������Ҫ�������󣨼������Ƶĳ�����
		 if(typeof(obj.isvisible)!="undefined"&&obj.isvisible==true&&backinput["query_me"].ele==vchfieldcode){
			 return;
		 }
	 }
	var selvalue = backinput.valuecode != undefined ? backinput.valuecode : backinput.value;
	window.selvalue = selvalue;
	window.checkflag = checkflag;
	jsFunctionname =jsFunction;
	//�ж��Ƿ�Ϊ��Ŀ������
	if(("program"==vchfieldcode || "budgetproj" ==vchfieldcode.toLowerCase()) &&vchtypecode.charAt(0)!='6'&&programtreetype=='0'){
		var isQuery = "1"; //��ѯ����Ŀ����ʶ
		indi_SelectElementTreeForEditWithFieldCTRL(mainmenu,submenu,vchtypecode,vchfieldcode,backinput, obj, selvalue, "0", "link", "0", elementfilter, "",isQuery,"2",0);
		return;
	}
    /** ganhua 20080304 �ڴ�ѡ�񴰿�ǰ�ص�һ��������ĳЩ����
	  * �磺���ù�����������������������ؼ��Ƿ�ѡ��ֵ
	  * 
	**/
	var func = "callBeforeOpenSingleElementTree_"+vchfieldcode+"(window)";;
	beforeMakeTree(func);
	//�����Զ����ʱ��ֹ����
	var stopFlag = window.stopFlag != null ? true : false;
	if(stopFlag) return; 
	elementfilter = setElementfilter(elementfilter);
	var refererurl = ""+window.location.href;
	var url = ROOT_PATH+"/common/findfuzzyelement.do?mainmenu="+mainmenu+"&submenu="+submenu+"&vchtypecode="+vchtypecode
		+"&vchfieldcode="+vchfieldcode+"&elementfilter="+elementfilter+"&AllField="+allField+"&voucher="+Object.toJSON(obj)
		+"&Referer="+refererurl.substring(0,refererurl.indexOf("?"));
		var rept = JQ.ajax({
			type:"post",
	  		url: url,
	  		data: "isOnlyData=1",
	  		async: false
 		}).responseText;
		var arr;
        if(typeof(rept)!="undefined"&&rept!=""){
        	  arr = eval("("+rept+")");
          }else{
        	  arr = {};
          }
	  if(backinput["query_me"]!=null&&backinput["query_me"].autoobj!=null)backinput["query_me"].autoobj.unautocomplete();
          var obj=   JQ(backinput).autocomplete(arr, {
              		max:50, 				//������ʾ����
              		mustMatch:true,			//�����ֵƥ�䣬�������
              		matchContains: true, 	//����ƥ��
              		cacheLength:1, 			//��������,1Ϊ������
					formatItem: function(row, i, max) {
						return row.code +"-"+ row.name;
					}
				});
           //  window.status = ((new Date)-d1)/1000+"s";
          backinput["query_me"] ={
        		  ele:vchfieldcode,
        		  autoobj:obj
          } ;
}
//�༭��inputtips���÷���
function bindAutoComplete(input,submenu,vouchTypeCode,element,setValueid,showCode,showDivCode,vouObj,defaultValue,anyvaluetag,parsetype,elementfilter,onlybottom){
	var obj={isvisible:null};
	 if(input["me"]!=null&&input["me"].autoobj!=null){
		 input["me"].autoobj.isvisible(obj);
		 if(typeof(obj.isvisible)!="undefined"&&obj.isvisible==true&&input["me"].ele==element){
			 return;
		 }
	 }
	if(!setValueid) setValueid = false;
              if(!showCode) showCode = false;
              if(!showDivCode) showDivCode = false; 
              if(checkCodeShowFlag(element)){
              	 showDivCode = true;
                 showCode = true;
              }
               	var func = "callBeforeOpenSingleElementTree_"+element+"(window)";;
				beforeMakeTree(func);
				//�����Զ����ʱ��ֹ����
				var stopFlag = window.stopFlag != null ? true : false;
				if(stopFlag) {
					//����ȫ�ֱ��������Ӱ������
					window.stopFlag = undefined;
					return;
				} 
				elementfilter = setElementfilter(elementfilter);
				//�༭����������ֵ��ƥ���Ƿ���գ�Ĭ�����
				var mustMatchFlag = true;
				if(window.mustMatchFlag != null){
					//����ȫ�ֱ��������Ӱ������
					mustMatchFlag = window.mustMatchFlag;
					window.mustMatchFlag = undefined;
				}
				
				var otherp ="";   
		        otherp = otherp + "&defaultvalue="+defaultValue;
		        otherp += "&anyvaluetag="+anyvaluetag; 
		        otherp += "&parsetype="+parsetype;
			    var voucher = new Array();
			    if(vouObj!=null)
			        voucher[voucher.length]= vouObj;
              var url = "/common/findfuzzyelement.do?submenu="+submenu+"&vchtypecode="+vouchTypeCode+"&vchfieldcode="+element+"&voucher="+voucher.toJSON()+"&elementfilter="+elementfilter+otherp;    
                  var rept = JQ.ajax({
  					type:"post",
  			  		url: url,
  			  		data: "isOnlyData=1",
  			  		async: false
  			 	}).responseText;
                var arr;
                if(typeof(rept)!="undefined"&&rept!=""){
              	  arr = eval("("+rept+")");
                }else{
              	  arr = {};
                }
			  var sigleflag = {};
			  if(JQ(input)[0].tagName=="IMG"){
			  	input = JQ(input).prev()[0]; //��֤����ʾ���ı�������
			  	sigleflag = {sigleflag:1};	 //�Ƿ�Ϊsinglediv������ť��־
			  }
			   if(input["me"]!=null&&input["me"].autoobj!=null)input["me"].autoobj.unautocomplete();
			  var obj =  JQ(input).autocomplete(arr, {
              		//minChars:0,	//˫����ʾȫ��
              		max:50, 		//������ʾ����
              		mustMatch:mustMatchFlag,			//�����ֵƥ�䣬�������
              		matchContains: true, 	//����ƥ��
              		cacheLength:1, 			//��������,1Ϊ������
					extraParams:sigleflag,
					formatItem: function(row, i, max) {
						return row.code +"-"+ row.name;
					}
				}).result(function(){
					//�м������Ʋ���ͬ������Ҫ�ٵ�һ�ε����� 20120117 jzy.
					setInputRuleDefaultValue(input.form,input.id,vouchTypeCode,submenu);
					//����ͬ�����б���
					if(typeof datasynch =="function"){
						datasynch(this);
					}
					JQ(this).unbind("result");
				});
			   input["me"] ={
					   ele:element,
					   autoobj:obj
			   };
}
/**
* ��¼ҳ��ͷ���������״̬����session
**/
function showWorkPanel(){
	var left_tree=document.getElementById("left_tree");
	var top= document.getElementById("window_top");
	var par = "leftdiv="+ left_tree.style.display;
	par +="&topdiv=" + top.offsetHeight;
	par +="&url="+location.pathname;
	var url = ROOT_PATH + '/common/setTabDIVAction.do';
   	var myAjax = new Ajax.Request(url,{method: 'post', parameters: par,onComplete: function(resp){}});
}
function loopgetchildren(arr1,arr2){
	JQ.each(arr1,function(i,item){
		if(item.children&&item.children.length>0){
			//arr2.push({code:item.code,name:item.name,id:item.id})
			//arr2.push({data:[item.code+"-"+item.name],value:[item.code+"-"+item.name].code,result:item.code+"-"+item.name,valueid:item.itemid})
			arr2=loopgetchildren(item.children,arr2);
		}else{
			arr2.push({code:item.code,name:item.name,id:item.id})
			//arr2.push({data:[item.code+"-"+item.name],value:[item.code+"-"+item.name].code,result:item.code+"-"+item.name,valueid:item.itemid})
		}
	});
	return arr2;
}

var _codeshow_cache={};
function checkCodeShowFlag(element){
   try{	
	 //��ϵͳCODE����Ϊ0ʱ,���ʾ����CODE��������
	  if(codeShowFlag == null || new String(codeShowFlag)=="0"){
	  		return true;
	  }else {
			var isShow = _codeshow_cache[element];
			if(isShow==null||isShow==undefined){
				isShow = (codeShowConfigs.indexOf(element.toUpperCase()) != -1);
				_codeshow_cache[element] = isShow;
			}
			return isShow;
	  }
  	}catch(e){
	  //�쳣,Ĭ��Ϊ��ʾ
	   return true;
	}
}

//������ѡ���ִ�з�������
var jsFunctionname = "";
//ѡ�к�ִ�в�ѯ����
function dosearch(eleobj){
	 if(jsFunctionname!=undefined && jsFunctionname != ""){
	 	eval(jsFunctionname);
	 }
}
function showElementCTRL(element,code,name){
   if(checkCodeShowFlag(element))
       return code+"-"+name;
   else return name;    
}

function showElementCodeCTRL(isShow,code,name){
   if(isShow)
       return code+"-"+name;
   else return name;    
}
/******�رո����� start*****/
/**/
function show(){
	if(!document.getElementById("mask")){
		var d_mask=document.createElement('div');
    	d_mask.id="mask";
    	document.body.appendChild(d_mask);
    }else{
    	var d_mask=document.getElementById("mask");
    }
    
 
    if(!document.getElementById("LoadStatus")){
    	var d_dialog = document.createElement('div');
	    d_dialog.id = "LoadStatus"; 
	    var objHtml = "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\">";
	    objHtml = objHtml + "<tr><td>";
	    objHtml = objHtml + "<div class=\"load_out\"><img src=\"/images/actions/loading.gif\" /> ";
	    objHtml = objHtml + "<div class=\"load_in\">�����У����Ժ�......</div>";
	    objHtml = objHtml + "</div></td></tr></table>";
				
	    d_dialog.innerHTML=''+objHtml+'';
	    document.body.appendChild(d_dialog);
    }else{
    	var d_dialog = document.getElementById('LoadStatus'); 
    }
    //���������
    if(document.getElementById("left_tree")){
    	var vwidth =screen.width - document.getElementById("left_tree").offsetWidth;
    	var dialogWidth = document.body.offsetWidth - document.getElementById("left_tree").offsetWidth - document.getElementById("switchBar").offsetWidth-20 ;
    	d_mask.style.left = document.getElementById("left_tree").offsetWidth;
    	if(document.getElementById("left_tree").offsetWidth>0){
    		d_dialog.style.left = dialogWidth / 2+100;
    	}else{
    		d_dialog.style.left = dialogWidth / 2-100;
    	}
    }else{
        var vwidth =screen.width;
        var dialogWidth = document.body.offsetWidth;
        d_dialog.style.left = dialogWidth / 2-100;
    }
    //���޶����˵�
    if(document.getElementById("window_top")){
    	var vheight = screen.height -document.getElementById("window_top").offsetHeight-20;
    	var dialogHeight = document.body.offsetHeight -document.getElementById("window_top").offsetHeight-20;; 
    	d_mask.style.top = document.getElementById("window_top").offsetHeight;
    }else{
     	var vheight = screen.height ;
     	var dialogHeight = document.body.offsetHeight;
    }
	d_mask.style.width = vwidth;
    d_mask.style.height = vheight; 

    d_dialog.style.top = dialogHeight / 2+50;
    d_mask.style.visibility='visible';
    d_dialog.style.visibility='visible';
    d_dialog.style.display='block';
    hiddselect(true);
}
function closeDiv(){
 	var d_mask=document.getElementById('mask');
    var d_dialog = document.getElementById('LoadStatus');
    d_mask.style.width=0;
    d_mask.style.height=0;
    d_mask.style.visibility='hidden';
    d_dialog.style.visibility='hidden';
    d_dialog.style.display='none';
    hiddselect(false);
}
function hiddselect(flag){
	var selects = document.getElementsByTagName("SELECT");
	var formObj = document.getElementById("advancedQueryForm")
	if(selects!=null&&selects.length>0){
		for(var i=0;i<selects.length;i++){
			var obj = selects[i];
			if(formObj != null ){
				if(formObj.contains(obj)){
					continue;
				}
			}
			
			if(flag){
				obj.style.visibility='hidden';
				obj.style.display='none';
			} else {
				obj.style.visibility='visible';
				obj.style.display='inline';
			}
		}
	}
}
/***������ end**/
//����UI������ɾ��
function hideUiButton(condition){
	if(condition == 1){
		return;
	}else{
		JQ(".add_btn").hide();
		JQ(".del_btn").hide();
	}
}
//�ո���
function trim(str){   
    return str.replace(/(^\s*)|(\s*$)/g, "");   
}
//�ı��л����㷽��
function  changeKeyDirection(obj){
	//�������༭������ϸ�༭��,mainkey �� ,detailkey ��ϸ
	var keyDirection = {mainkey:false,detailkey:false};
	//��һ��ҳ���в�����window.keyDirection ��ʹ��Ĭ�ϱ�ʶ
	if(!window.keyDirection){
		window.keyDirection = keyDirection;
		if(obj.id == "mainkey"){
			window.keyDirection.mainkey  = !keyDirection.mainkey ? true : false;
		}else {
			window.keyDirection.detailkey  = !keyDirection.detailkey ? true : false;
		}
	}else{
		//ҳ���д�����ôʹ��window��ʶ
		if(obj.id == "mainkey"){
			window.keyDirection.mainkey = !window.keyDirection.mainkey ? true : false;
		}else {
			window.keyDirection.detailkey = !window.keyDirection.detailkey ? true : false;
		}
	}
	//�ı��ʶͼƬ
	if(obj.id == "mainkey"){
		if(window.keyDirection.mainkey){
			obj.src = "/ifmis_images/bg/tobottom.gif";
		}else{
			obj.src = "/ifmis_images/bg/toright.gif";
		}
	}else{
		if(window.keyDirection.detailkey){
			obj.src = "/ifmis_images/bg/tobottom.gif";
		}else{
			obj.src = "/ifmis_images/bg/toright.gif";
		}
	}
}
//�༭���л�����
function switchFocus(){
	var key = event.keyCode;
	var hasValFalg = false;
	var keyCode = {
		RETURN:13,//�س�
		TAB:9
	}
	var curr = event.srcElement;
	var tabId = JQ(curr).parents("table").attr("id");
	//�л������ʶ��Ĭ���Ǻ����л�
	if(window.keyDirection){
		//�ж��Ƿ�Ϊ���༭��
		if(tabId == 'mainedittable'){
			var keyDirection = window.keyDirection.mainkey ? true : false; 
		}else{
			var keyDirection = window.keyDirection.detailkey ? true : false; 
		}
	}else{
		var keyDirection = false;
	}
	if(curr.value == "")hasValFalg = true;
	//ѡ��༭�����пɱ༭״̬���ı���
	if(!keyDirection){
		var inputs = JQ(curr).parents("table").find("input:[type=text][readOnly!=true][disabled!=true]");
		var index = JQ.inArray(curr,inputs);
	}
	else{				//������Ϊ����ʱ�����ҵ����пɱ༭���ı���,��6��Ϊ�����������в�ѯ
		var colInputs = [];
		for(var i=0;i<6;i++){
			JQ(curr).parents("table").find("tr").each(function(){
			var inp = JQ(this).find("td:eq("+i+") input:[type=text][readOnly!=true][disabled!=true]");
			if(inp.length>0)colInputs.push(inp[0]);
			});
		}
		var colIndex = JQ.inArray(curr,colInputs);
	}
	//��굽��ǰ�������Ĵ�����
	var endMove = function(){
		var j = index == inputs.length-1?0:inputs.length-1;
		var ne = inputs[j];
		ne.select();
	};
	//������ƹ��÷���
	var nextMove = function (){
		if(index<inputs.length-1){
			for(var i=1;i<inputs.length-index;i++){
				var next = inputs[index+i];
				next.select();
				//next.style.filter="progid:DXImageTransform.Microsoft.Glow(Color=#00ffff, Strength=1);";
				break ;
			}
		}
		else{
			endMove();
		}
	};
	//�����ƶ�����
	var colNextMove = function(){
		if(colIndex < colInputs.length-1){
			for(var i=1;i<colInputs.length-colIndex;i++){
				var next = colInputs[colIndex+i];
				if(!next){
					continue;
				}else{
					next.select();
					break;
				}
			}
		}else{
			colEndMove();
		}
	}
	//�����ƶ���ĩβ����
	var colEndMove = function(){
		var j = colIndex == colInputs.length-1?0:colInputs.length-1;
		var ne = colInputs[j];
		ne.select();
	}
	//��ťѡ��
	switch(key){
		case keyCode.RETURN:
		case keyCode.TAB:
			if(index !=-1 && colIndex !=-1){
				keyDirection ? colNextMove() : nextMove();
				window.event.cancelBubble = true;
				window.event.returnValue = false;
				break;
			}
		}
}
//��λ���λ�� 
function mousePosition(ev){
	    if(ev.pageX || ev.pageY){
	        return {x:ev.pageX, y:ev.pageY};
	    }
	    return {
	        x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
	        y:ev.clientY + document.body.scrollTop  - document.body.clientTop
	    };
	}

/*��ѯ��code��ʾ����Ĭ��ֵ����
* a Ԫ��id
* b Ԫ��valueֵ
*/
function defaultQueryCodeShow(a,b){
	if(checkCodeShowFlag(a)) return b;
	var val = b.split(";");
	var arrname = [];
	for(var i = 0 ;i<val.length;i++){
		if(val[i].indexOf("-")>-1){
			arrname.push(val[i].split("-")[1]);
		}else{
			arrname.push(val[i]);
		}
	}
	return arrname.join(";");
}	
//����ϴ��ؼ���ѡ���ļ�
function cleanFile(id){
	var _file = document.getElementById(id);    
	if(_file.files){
			_file.value = "";    
	}else{        
		if (typeof _file != "object"){
			return null; 
		}        
		var _span = document.createElement("span");       
		_span.id = "__tt__";        
		_file.parentNode.insertBefore(_span,_file);        
		var tf = document.createElement("form");        
		tf.appendChild(_file);        
		document.getElementsByTagName("body")[0].appendChild(tf);        
		tf.reset();        
		_span.parentNode.insertBefore(_file,_span);        
		_span.parentNode.removeChild(_span);        
		_span = null;        
		tf.parentNode.removeChild(tf);    
	}
}

//�༭��textarea����
//ͬʱ���س��滻��<br>
function datasynchTohid(obj){
	reg1 = new RegExp("\r\n","g");
    JQ("#"+obj.id+"_hid").val(obj.value.replace(reg1,"<br/>"));
}
/**
��ʾ���ı�����
**/
function showTextA(o){
	var event = window.event;
	var showdiv = document.createElement("div");
	JQ("body").append(showdiv);
	JQ(showdiv).css({"padding":"5px"}).html(JQ(o).nextAll("div").html());
	var pos = mousePosition(event);
	screen_x=document.body.clientWidth;
	screen_y=document.body.clientHeight;
	var x = pos.x;
	var y = pos.y;
	if(pos.x+200>screen_x){
		x = pos.x-(pos.x+200 - screen_x);
	}
	if(pos.y+200>screen_y){
		y = pos.y-(pos.y+200 - screen_y);
	}
	JQ(showdiv).css({"left":x-5,"top":y-5,"position":"absolute","background":"#ffffcc","width":200,"height":200,"overflow":"auto"}).show();
	JQ(showdiv).bind("mouseout mousewheel",function (){
		JQ(showdiv).hide();
	})
}
/**
* �����ϴ�ͼƬҳ��
**/
function openUpload(obj){
	var imgid = JQ(obj).parent().prev().attr("id");
	//�ڴ��ϴ�����ʱҵ��ϵͳ�������ϴ�·�������������Ķ���window.options={};
	var func = "callBeforeOpenSingleElementTree_upoad_"+imgid+"(window)";
	beforeMakeTree(func);
	window.imgid = imgid;
	window.open(ROOT_PATH+"/common/uploadImg/uploadImg.jsp","_blank",'height=100,width=400,top=300,left=400,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no') 
}
/**
* ɾ��ͼƬ����
**/
function deleteImg(obj){
	var imgid = JQ(obj).parent().prev().attr("id");
	//��ҵ��ϵͳ�Լ������̨ɾ������
	var func = "callBeforeOpenSingleElementTree_delete_"+imgid+"(window)";
	beforeMakeTree(func);
	//ɾ��ҳ����ʾ
	JQ("#"+imgid).attr("src","/ifmis_images/bg/phere.jpg");
}
/**
*����ѯ��������ת����POST ����������AJAX����
*/
function formToString(formObj){
  // formObj.doget();
   var allStr="";
	if(formObj){
	   var elementsObj=formObj.elements;
	   var obj;
	   if(elementsObj){
	    for(var i=0; i<elementsObj.length;i+=1){
	     obj=elementsObj[i];
	     if(obj.type == "text" && obj.valuetype == "number"){
		      if( obj.value!=null && obj.value.trim()!="" && !obj.value.isNumber()){
  		        alert(obj.elementname+"����������");
  		        obj.focus();
  		        return;
  		      }
		   }
	     if(obj.name!=undefined&&obj.name!=""){
	     	if(obj.valueid != null){
	      		allStr+="&"+obj.name+"="+encodeURIComponent(obj.valueid);
	      	}else{
	      		allStr+="&"+obj.name+"="+encodeURIComponent(obj.value);
	      	}
	     }
	    }
	   }else{
	    alert("û��elements����!");
	    return ;
	   }
	}else{
	   return "1=1";
	}
	return allStr;
}
/**
*���ܰ�ť�û�
*arr Ҫ�ûҰ�ť�����������磺["ȫѡ","��ѡ"]
*method �����ֵ�ͽ���ť���� 
*context Ҫ������������ �磺iframe�ʹ�window.parent.document
**/
function uiDie(arr,method,context){
	for(var i=0;i<arr.length;i++){
		var funcbutton = JQ("#query_t [title='"+arr[i]+"']",context); 
		//һ�ִ����ûң�һ�ִ�������
		if(!method){
			if(funcbutton.length>0 && !funcbutton.attr("disabled")){
				funcbutton.attr("disabled","disabled");
				funcbutton[0].onclickbak = funcbutton[0].onclick;
				funcbutton[0].onclick = null;
			}
		}else{
			if(funcbutton.length>0 && funcbutton.css("display")=="block"){
				funcbutton.css("display","none");
			}
		}
	}
}
/**
*���ܰ�ť����
*arr Ҫ���ť�����������磺["ȫѡ","��ѡ"]
*method �����ֵ�ͽ���ť��ʾ
**/
function uiLive(arr,method,context){
	for(var i=0;i<arr.length;i++){
		var funcbutton = JQ("#query_t [title='"+arr[i]+"']",context); 
		if(!method){
			if(funcbutton.length>0 && funcbutton.attr("disabled")){
				funcbutton.removeAttr("disabled");
				funcbutton[0].onclick = funcbutton[0].onclickbak;
			}
		}else{
			if(funcbutton.length>0 && funcbutton.css("display")=="none"){
				funcbutton.css("display","block");
			}
		}
	}
}
/**
 * ���ת�ɴ�д
 * @param num ��ת���
 * @param formid �����id
 * @param amtflag ��λ��ʶ
 * @returns
 */
function numToCny(num,formid,amtflag){
	var obj = JQ("#"+formid+" #isnumtocny");
	if(obj.length==0) return;
	if(num.toString()== ""){
		obj.val("");
		return;
	}
	var isnav = false;
	num = num.toString().replace(/,/g,"");
	if(num.charAt(0)=="-"){
    	isnav = true;
    	num = num.replace("-","");
    }
	if(amtflag>1){
		num = accMul(num, amtflag);
		num = num.toString();
	}
    var strOutput = "";   
    var strUnit = 'Ǫ��ʰ��Ǫ��ʰ��Ǫ��ʰԪ�Ƿ�';   
    num += "00";   
    var intPos = num.indexOf('.');   
    if (intPos >= 0){
    	num = num.substring(0, intPos) + num.substr(intPos + 1, 2);  
    }   
    strUnit = strUnit.substr(strUnit.length - num.length);   
    for (var i=0; i < num.length; i++) {
    	  strOutput += '��Ҽ��������½��ƾ�'.substr(num.substr(i,1),1) + strUnit.substr(i,1);
    }  
    strOutput = strOutput.replace(/������$/, '��').replace(/��[Ǫ��ʰ]/g, '��').replace(/��{2,}/g, '��').replace(/��([��|��])/g, '$1').replace(/��+Ԫ/, 'Ԫ').replace(/����{0,3}��/, '��').replace(/^Ԫ/, "��Ԫ");
    if(isnav) strOutput = "��"+strOutput;
    obj.val(strOutput);
}
//��д�˷����⸡�������ʱ�����ݾ���ʧ��
function accMul(arg1,arg2) 
{ 
	var m=0,s1=arg1.toString(),s2=arg2.toString(); 
	try{m+=s1.split(".")[1].length}catch(e){} 
	try{m+=s2.split(".")[1].length}catch(e){} 
	return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m) 
}
/**
 * �õ������Ӳ���
 * @param name ��������
 */
function getUrlParam(url,name)
{
	var r;
	var reg = new RegExp("(^|&|\\?)"+ name +"=([^&]*)(&|$)");
	if (r=url.match(reg))
	{
		return unescape(r[2]);
	} 
	return null;
}

//��ȡcookie by-jzy
function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=")
  if (c_start!=-1)
    { 
    c_start=c_start + c_name.length+1 
    c_end=document.cookie.indexOf(";",c_start)
    if (c_end==-1) c_end=document.cookie.length
    return unescape(document.cookie.substring(c_start,c_end))
    } 
  }
return "";
}

//����cookie by-jzy
function setCookie(c_name,value,expiredays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate()+expiredays);
exdate.setHours(0,0,0);
document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString())+"; path=/";
}


String.prototype.trim = function(){
	return this.replace(/(^\s*)|(\s*$)/g,"");
}
//ʵ�ַָ������϶�
 var oSplitter, oTdSplitter, oTdLeft, oTdRight, oTable;
 var posTdSplitter, posTable,hiddenLeftBar;
 var bLoaded = false;
 var bStart = false;
 var iPadding = 0;
 function initPosition(x, y)
 {
	this.x = x;
	this.y = y;
 }
 function GetPosition(obj)
 {
    var objThis = obj;
	var oBody = document.body;
	var oLeft = oTop = 0;
	while (objThis!=oBody)
	{
	  oLeft += objThis.offsetLeft;
	  oTop += objThis.offsetTop;
	  objThis = objThis.parentNode;
	}
	return new initPosition(oLeft, oTop); 
}
//��ʼ�����������淽�����ص���ʱ���µ���
function fnInit(){
	 var _doc = document;
	 oSplitter = _doc.getElementById("splitter");
	 oTdSplitter = _doc.getElementById("switchBar");
	 oTdLeft = _doc.getElementById("left_tree");
	 oTdRight = _doc.getElementById("main");
	 oTable = _doc.getElementById("div_all");
	 hiddenLeftBar = _doc.getElementById("hiddenLeftBar");
	 posTable = GetPosition(oTable);
	 oSplitter.style.height = oTdSplitter.offsetHeight;
	 oSplitter.style.width = oTdSplitter.offsetWidth;
	 bLoaded = true;
}	

function fnload() {
    if (document.getElementById("div_all") == null) return;
    //��ʼ��
    fnInit();
    //body�ϰ������¼�
    JQ("body").bind("mouseup",
    function(event) {
        if (bStart == true) {
            oSplitter.style.display = "none";
            if (event.clientX > posTable.x && event.clientX < posTable.x + oTable.offsetWidth - oTdSplitter.offsetWidth) {
                var m = event.clientX - posTable.x;
                if (m > 300) {
                    oTdLeft.style.width = 260;
                } else {
                    oTdLeft.style.width = m;
                }
                setCookie("customer_switchbar_left",oTdLeft.style.width,1000000);
            }
            if (oSplitter.releaseCapture) oSplitter.releaseCapture();
            bStart = false;
			Ext.lt.layout.doLayout();
        }
    }).bind("mousemove",
    function(event) {
        if (bStart == true) {
            oSplitter.style.left = event.clientX + iPadding;
        }
    });
    JQ("#hiddenLeftBar").bind("mousedown",
    function() {
        this.click();
        stopBubble();
    });
    //divBar�ָ����ϰ��¼�
    JQ("#switchBar").bind("mousedown",
    function() {
        if (bLoaded == false) {
            alert("ҳ�����δ��ɣ����Ժ�");
            return;
        }
        posTdSplitter = GetPosition(oTdSplitter);
        iPadding = posTdSplitter.x - event.clientX;
		oSplitter.style.cursor = "col-resize";
        oSplitter.style.left = posTdSplitter.x;
        oSplitter.style.top = posTdSplitter.y;
        oSplitter.style.display = "block";
        if (oSplitter.setCapture) oSplitter.setCapture();
        bStart = true;
    }).bind("mouseover", 
		function(){
			oTdSplitter.style.cursor = "col-resize";
	});
}

function setFont(fontsize){
  	if(fontsize=="l"){
  	  document.getElementById('ifmisfontstyle').href = ROOT_PATH+'/style/stylefontL.css';
      setFontSession("stylefontL.css");	
    }else if(fontsize=="m"){
      document.getElementById('ifmisfontstyle').href =  ROOT_PATH+'/style/stylefontM.css';
      setFontSession("stylefontM.css");	
    }else{
      document.getElementById('ifmisfontstyle').href =  ROOT_PATH+'/style/stylefontS.css';
      setFontSession("stylefontS.css"); 
    }
    setFontCookie(fontsize);
}

var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
		-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
		-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
		52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0,
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
		21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32,
		33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
		51, -1, -1, -1, -1, -1);
// ��չStringԭ��base64���뷽��String.prototype.base64encode=function(){varstr=utf16to8(this);varout,i,len;varc1,c2,c3;len=str.length;i=0;out="";while(i<len){c1=str.charCodeAt(i++)&0xff;if(i==len){out+=base64EncodeChars.charAt(c1>>2);out+=base64EncodeChars.charAt((c1&0x3)<<4);out+="==";break;}c2=str.charCodeAt(i++);if(i==len){out+=base64EncodeChars.charAt(c1>>2);out+=base64EncodeChars.charAt(((c1&0x3)<<4)|((c2&0xF0)>>4));out+=base64EncodeChars.charAt((c2&0xF)<<2);out+="=";break;}c3=str.charCodeAt(i++);out+=base64EncodeChars.charAt(c1>>2);out+=base64EncodeChars.charAt(((c1&0x3)<<4)|((c2&0xF0)>>4));out+=base64EncodeChars.charAt(((c2&0xF)<<2)|((c3&0xC0)>>6));out+=base64EncodeChars.charAt(c3&0x3F);}returnout;}//��չStringԭ��base64���뷽��String.prototype.base64decode=function(){
// returnutf8to16(base64decode(this));}functionbase64decode(str){varc1,c2,c3,c4;vari,len,out;len=str.length;i=0;out="";while(i<len){/*c1*/do{c1=base64DecodeChars[str.charCodeAt(i++)&0xff];}while(i<len&&c1==-1);if(c1==-1)break;/*c2*/do{c2=base64DecodeChars[str.charCodeAt(i++)&0xff];}while(i<len&&c2==-1);if(c2==-1)break;out+=String.fromCharCode((c1<<2)|((c2&0x30)>>4));/*c3*/do{c3=str.charCodeAt(i++)&0xff;if(c3==61)returnout;c3=base64DecodeChars[c3];}while(i<len&&c3==-1);if(c3==-1)break;out+=String.fromCharCode(((c2&0XF)<<4)|((c3&0x3C)>>2));/*c4*/do{c4=str.charCodeAt(i++)&0xff;if(c4==61)returnout;c4=base64DecodeChars[c4];}while(i<len&&c4==-1);if(c4==-1)break;out+=String.fromCharCode(((c3&0x03)<<6)|c4);}returnout;}functionutf16to8(str){varout,i,len,c;out="";len=str.length;for(i=0;i<len;i++){c=str.charCodeAt(i);if((c>=0x0001)&&(c<=0x007F)){out+=str.charAt(i);}elseif(c>0x07FF){out+=String.fromCharCode(0xE0|((c>>12)&0x0F));out+=String.fromCharCode(0x80|((c>>6)&0x3F));out+=String.fromCharCode(0x80|((c>>0)&0x3F));}else{out+=String.fromCharCode(0xC0|((c>>6)&0x1F));out+=String.fromCharCode(0x80|((c>>0)&0x3F));}}returnout;}functionutf8to16(str){varout,i,len,c;varchar2,char3;out="";len=str.length;i=0;while(i<len){c=str.charCodeAt(i++);switch(c>>4){case0:case1:case2:case3:case4:case5:case6:case7://0xxxxxxxout+=str.charAt(i-1);break;case12:case13://110xxxxx10xxxxxxchar2=str.charCodeAt(i++);out+=String.fromCharCode(((c&0x1F)<<6)|(char2&0x3F));break;case14://1110xxxx10xxxxxx10xxxxxxchar2=str.charCodeAt(i++);char3=str.charCodeAt(i++);out+=String.fromCharCode(((c&0x0F)<<12)|((char2&0x3F)<<6)|((char3&0x3F)<<0));break;}}returnout;}

var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
		-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
		-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1,
		63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1,
		0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
		20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31,
		32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
		50, 51, -1, -1, -1, -1, -1);

//��չStringԭ�� base64���뷽��
String.prototype.base64encode = function() {
	var str = utf16to8(this);
	var c1, c2, c3;
	var len = str.length;
	var i = 0;
	var out = "";
	while (i < len) {
		c1 = str.charCodeAt(i++) & 0xff;
		if (i == len) {
			out += base64EncodeChars.charAt(c1 >> 2);
			out += base64EncodeChars.charAt((c1 & 0x3) << 4);
			out += "==";
			break;
		}
		c2 = str.charCodeAt(i++);
		if (i == len) {
			out += base64EncodeChars.charAt(c1 >> 2);
			out += base64EncodeChars.charAt(((c1 & 0x3) << 4)
					| ((c2 & 0xF0) >> 4));
			out += base64EncodeChars.charAt((c2 & 0xF) << 2);
			out += "=";
			break;
		}
		c3 = str.charCodeAt(i++);
		out += base64EncodeChars.charAt(c1 >> 2);
		out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
		out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
		out += base64EncodeChars.charAt(c3 & 0x3F);
	}
	return out;
}

//��չStringԭ�� base64���뷽��
String.prototype.base64decode = function() {
	return utf8to16(base64decode(this));
}

function base64decode(str) {
	var c1, c2, c3, c4;
	var i, len, out;
	len = str.length;
	i = 0;
	out = "";
	while (i < len) {
		/* c1 */
		do {
			c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
		} while (i < len && c1 == -1);
		if (c1 == -1)
			break;
		/* c2 */
		do {
			c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
		} while (i < len && c2 == -1);
		if (c2 == -1)
			break;
		out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
		/* c3 */
		do {
			c3 = str.charCodeAt(i++) & 0xff;
			if (c3 == 61)
				return out;
			c3 = base64DecodeChars[c3];
		} while (i < len && c3 == -1);
		if (c3 == -1)
			break;
		out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
		/* c4 */
		do {
			c4 = str.charCodeAt(i++) & 0xff;
			if (c4 == 61)
				return out;
			c4 = base64DecodeChars[c4];
		} while (i < len && c4 == -1);
		if (c4 == -1)
			break;
		out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
	}
	return out;
}
function utf16to8(str) {
	var out, i, len, c;
	out = "";
	len = str.length;
	for (i = 0; i < len; i++) {
		c = str.charCodeAt(i);
		if ((c >= 0x0001) && (c <= 0x007F)) {
			out += str.charAt(i);
		} else if (c > 0x07FF) {
			out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
			out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
			out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
		} else {
			out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
			out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
		}
	}
	return out;
}

function utf8to16(str) {
	var out, i, len, c;
	var char2, char3;
	out = "";
	len = str.length;
	i = 0;
	while (i < len) {
		c = str.charCodeAt(i++);
		switch (c >> 4) {
		case 0:
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
		case 6:
		case 7:
			// 0xxxxxxx
			out += str.charAt(i - 1);
			break;
		case 12:
		case 13:
			// 110x xxxx 10xx xxxx
			char2 = str.charCodeAt(i++);
			out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
			break;
		case 14:
			// 1110 xxxx 10xx xxxx 10xx xxxx
			char2 = str.charCodeAt(i++);
			char3 = str.charCodeAt(i++);
			out += String.fromCharCode(((c & 0x0F) << 12)
					| ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
			break;
		}
	}
	return out;
}
/*
 * �������ͼ
 * 
 */
 /**
 * �ж������б����Ƿ��й�ѡ������
 */
function hasCheckedobj() {
	var flag =false;		
	if(tmain.getSelectedRow().length > 0) {
		flag=true;
	}
	return flag;
}
 
 function audit_view(){
 	if(hasCheckedobj()){
 		if(tmain.getSelectedRow().length>1){
          alert("��ѡ�������ݽ��в鿴��");
       }else{
            var Mapobj = {};
            Mapobj['rs'] = tmain.getSelectedRow();
            Ext.lt.RCP.server("ifmis_auidtview_service", "AuidtViews", Mapobj, function (rs){
            var dicv = document.createElement('div');
			var html = [];
			html.push("<div style='width:700px; height:270px; font-size:12px; overflow-x:scroll;'>");
			html.push("<table  border='0' cellspacing='0' cellpadding='0' width=100% align='center' style='margin-top:40px; margin-left:20px; width:",rs.length*100+40,"px'>");
			html.push("<tr style='height:50px;'>");
			var zsstate = 0;
			for(var i = 0; i < rs.length; i++){
				if(rs[i].state=='1'){
					if(i==rs.length-1){
						html.push("<td width='40px' class='greenroll'>&nbsp;&nbsp;");
						html.push("</td>");
						
					}else{
						html.push("<td width='40px' class='greenroll'>&nbsp;&nbsp;");
						html.push("</td>");
						html.push("<td width='60px' class='greenjt'>&nbsp;&nbsp;");
						html.push("</td>");
					}
					if(rs[i].status=='������'){
						zsstate = 1;
					}
					
				}else if(rs[i].state=='2'){
					if(i==rs.length-1){
						html.push("<td width='40px' class='yellowroll'>&nbsp;&nbsp;");
						html.push("</td>");
						html.push("<td width='60px'>&nbsp;&nbsp;</td>");
					}else{
						html.push("<td width='40px' class='yellowroll'>&nbsp;&nbsp;");
						html.push("</td>");
						html.push("<td width='60px' class='yellowjt'>&nbsp;&nbsp;");
						html.push("</td>");
					}
				}else if(rs[i].state=='3'){
					if(i==rs.length-1){
						html.push("<td width='40px' class='grayroll'>&nbsp;&nbsp;");
						html.push("</td>");
					}else{
						html.push("<td width='40px' class='grayroll'>&nbsp;&nbsp;");
						html.push("</td>");
						html.push("<td width='60px' class='grayjt'>&nbsp;&nbsp;");
						html.push("</td>");
					}
				}
			}
			if(rs[rs.length-1].state=='1' || zsstate==1){
				html.push("<td width='60px' class='greenjt'>");
						html.push("</td>");
				html.push("<td width='40px' class='greenroll'>");
						html.push("</td>");
			}else{
				html.push("<td width='60px' class='grayjt'>");
						html.push("</td>");
				html.push("<td width='40px' class='grayroll'>");
						html.push("</td>");
			}
			
			html.push("</tr>");
			
			html.push("<tr style='height:50px;'>")
			for(var j = 0; j < rs.length; j++){
				if(rs[j].state=='1'){
					html.push("<td colspan='2' align='left' style='color:#4D4D4D;' valign='top'>");
					html.push("<span style='color:#6B8B10; font-weight:bold; center'>"+rs[j].actiondescname+"</span><br />");
					html.push("<span style='color:#6B8B10; font-weight:bold;'>�� �� �ˣ�"+rs[j].callername+"</span><br />");
					html.push("<span>����ʱ�䣺"+rs[j].enddate+"</span><br />");
					if(rs[j].auditOpinion=='null'){
						rs[j].auditOpinion = "";
					}
					html.push("<span title="+rs[j].auditOpinion+">���������"+rs[j].auditOpinion.substring(0,25)+"</span><br />");
					html.push("</td>");
					
				}else if(rs[j].state=='2'){
					html.push("<td colspan='2' align='left' style='color:#4D4D4D;' valign='top'>");
					html.push("<span style='color:#6B8B10; font-weight:bold; center'>"+rs[j].actiondescname+"</span><br />");
					html.push("<span>��ʼʱ�䣺"+rs[j].startdate+"</span><br />");
					html.push("</td>");
				}else if(rs[j].state=='3'){
					html.push("<td colspan='2' align='left' style='color:#4D4D4D;' valign='top'>");
					html.push("<span style='color:#6B8B10; font-weight:bold; center'>"+rs[j].actiondescname+"</span><br />");
					html.push("</td>");
				}
			}
			
			if(rs[rs.length-1].state=='1'){
				html.push("<td colspan='2' align='left' style='color:#4D4D4D;' valign='top'>");
					html.push("<span style='color:#6B8B10; font-weight:bold; center'>����</span><br />");
					html.push("</td>");
			}else{
				html.push("<td colspan='2' align='left' style='color:#4D4D4D;' valign='top'>");
					html.push("<span style='color:#6B8B10; font-weight:bold; center'>����</span><br />");
					html.push("</td>");
			}
			html.push("</tr>")
			html.push("</table>");
			html.push("</div>");
			dicv.innerHTML = html.join("");
			audit_condition = new Ext.lt.window({title:"�������ͼ",fitmode:'content',close:true,pop:true,drag:false,mark:true});
			audit_condition.draw(dicv);
			
		});
          
       }
 	}else{
        alert("��ѡ��Ҫ�鿴�ĵ��ݣ�");
    }
 	
 }
/**
���ذ�ť��
*/
function hideMemuDiv(divid){
return;
		  var spanbase=document.getElementById(divid);
          //��ltext_core.js��ֲ�����ļ����ֲ㷽�������˼��޸ģ�����������Ч
          var _pw=0,_ph=0,_pl=0,_pt=0;
          //Ϊ������ֹ���������ԭ����iframe��Ϊdiv
          spanbase.initmark=document.createElement('DIV');
          var _p=Ext.lt.HTML.positionedOffset(spanbase,null,false);
          _pl=_p.left;
          _pt=_p.top;
          spanbase.initmark.style.cssText='display:none;filter:Alpha(Opacity=50);position:absolute;background-color:#fff;height:60px;left:'+_pl+'px;top:'+_pt+'px;';
          Ext.lt.HTML.hiddenAll(spanbase.getElementsByTagName('SELECT'));
          Ext.lt.HTML.hiddenAll(spanbase.getElementsByTagName('OBJECT'));
          Ext.lt.HTML.hiddenAll(spanbase.getElementsByTagName('IFRAME'));
          spanbase.initmark.style.display='';
          spanbase.initmark.style.zIndex=Ext.lt.getNextZIndex();
          _pw=spanbase.offsetWidth-parseInt(spanbase.currentStyle.marginLeft,10)-parseInt(spanbase.currentStyle.marginRight,10);
          _ph=spanbase.offsetHeight-parseInt(spanbase.currentStyle.marginTop,10)-parseInt(spanbase.currentStyle.marginBottom,10);
          spanbase.initmark.style.width=_pw+'px';
          spanbase.initmark.style.height=_ph+'px';
          document.body.appendChild(spanbase.initmark);
}
/**
��ʾ��ť�����������ֲ�
*/
function showMenuDiv(spanbase){
return;
         Ext.lt.HTML.showAll(spanbase.getElementsByTagName('SELECT'));
         Ext.lt.HTML.showAll(spanbase.getElementsByTagName('OBJECT'));
         Ext.lt.HTML.showAll(spanbase.getElementsByTagName('IFRAME'));
         spanbase.initmark.style.display='none';
         document.body.removeChild(spanbase.initmark);
}

function backResult2(result,backinput){
	if(window.elementfilter){
		window.elementfilter = null;
	}
	if(result != null){
	    if(typeof(result)!="string"){
			if(backinput == null){
				backinput = $(vchfieldcode);
			}
			var values = result.value;
			var point = values.indexOf('(');// ������λ��
			if(point<0){// ������
				backinput.value = values;
			}else{
				backinput.value = values.substring(0,point).trim();
			}
			var sp=result.id.split('-');
			if(sp.length>1){
				backinput.valueid = sp[1];
			}else{
				backinput.valueid = result.id;
			}
			backinput.isleaf= result.isleaf;
			backinput.valuecode = result.valuecode;
			try{
				func="callEnd_"+backinput.id+"(backinput,result)";
	        		eval(func);
        		}catch(e){
        			
        		}
			dosearch();
		}
	}
}