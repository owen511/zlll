//��ֹ������ת
function stopDefaultHref(e) { 
    if (e && e.preventDefault){ 
    	e.preventDefault(); 
    }else{ 
    	window.event.returnValue = false;
    }	
    return false; 
} 
   
function createNewForm(url, uid, sid,year,target,webservice){
	var currenturl = target.replace("http://","");
	if(webservice==null||webservice==""){
		webservice  = currenturl.substring(currenturl.indexOf('/'));
	}
	var pserver = "http://"+currenturl.substring(0,currenturl.indexOf('/'))+"/security/authservice";
	var submitForm = document.createElement("FORM");
    document.body.appendChild(submitForm);
    submitForm.method = "POST";
    submitForm.action = url+"/portal/portallogin.do";
    var newElement1 = document.createElement("input");
    newElement1.setAttribute("name","uid");
    newElement1.setAttribute("type","hidden");
    newElement1.setAttribute("value",uid);
    submitForm.appendChild(newElement1);
    var newElement2 = document.createElement("input");
    newElement2.setAttribute("name","sid");
    newElement2.setAttribute("type","hidden");
    newElement2.setAttribute("value",sid);
    submitForm.appendChild(newElement2);
    var newElement3 = document.createElement("input");
    newElement3.setAttribute("name","webservice");
    newElement3.setAttribute("type","hidden");
    newElement3.setAttribute("value",webservice);
    submitForm.appendChild(newElement3);
    var newElement4 = document.createElement("input");
    newElement4.setAttribute("name","pserver");
    newElement4.setAttribute("type","hidden");
    newElement4.setAttribute("value",pserver);
    submitForm.appendChild(newElement4);
    var newElement5 = document.createElement("input");
    newElement5.setAttribute("name","year");
    newElement5.setAttribute("type","hidden");
    newElement5.setAttribute("value",year);
    submitForm.appendChild(newElement5);
    submitForm.submit();
}

function clickqmenutree(el){
	var target = el.href;
	//���˵���ת
	if(leftmenusos!=null&&leftmenusos.length>0){
		for(var i=0;i<leftmenusos.length;i++){
			var meunstr="submenu="+leftmenusos[i].MENUID;
			var urlstr = leftmenusos[i].URL;
			//����Ҫ��ת�Ĳ˵�and��ת��ַ�뵱ǰ�����ַ��ͬ
			if(target.indexOf(meunstr)!=-1&&target.indexOf(urlstr)==-1){
				stopDefaultHref(el);
				createNewForm(urlstr,uid,sid,loginyear,target,leftmenusos[i].WEBSERVICE);
				break;
			}
		}
	}
	//ҵ��ϵͳ����
	if(tasIntroduces!=null&&tasIntroduces.length>0){
		tasIntroduce(el.dataid);
	}
	if (isLinked(target)) {
		//�ۺϲ�ѯiframeǶ�뼰����
		if(target.indexOf("openModel=fcas")>=0){
			stopDefaultHref(el);
			if(target.indexOf("userdefinedwindowshow=true")>-1){
				window.open(target,'','fullscreen=0,resizable=yes');
			}else{
				var height=document.body.clientHeight-document.getElementById('window_top').offsetHeight-30+'px';
				var fcasiframe="<iframe id='fcasiframe' name='fcasiframe' src="+target+" border=0 width=100% frameborder=0 height="+height+"></iframe>";
				document.getElementById('context').innerHTML=fcasiframe;
				document.getElementById('context').style.width='100%';
			}
		}else if(target.indexOf("javascript:openReport(")>=0){
			//����Ǵ���ͼ��������ֹ<a>������ת
			stopDefaultHref(el);
			//��ʱ���ڴ�������ͼ������
			var time = (new Date()).getTime();
	    	if(lastClickRpt!=null){
	    		var sub = (time-lastClickRpt)/1000;
	    		if(sub<5){
	    			return;
	    		}
	    	}
			lastClickRpt = time;
			target = target.substring(22,target.indexOf(")"));
			openReport(target);
		}else if(target.indexOf("/longtu/report")>=0&&reportexturl!=null){
			//����Ǵ���ͼ��������ֹ<a>������ת
			stopDefaultHref(el);
			var time = (new Date()).getTime();
	    	if(lastClickRpt!=null){
	    		var sub = (time-lastClickRpt)/1000;
	    		if(sub<5){
	    			return;
	    		}
	    	}
			lastClickRpt = time;
			target += ((target.indexOf("?")==-1)?"?":"&")+Base64.decode(reportexturl);
			try{
				if(document.all.ltrptocx==undefined||document.all.ltrptocx.object==null){ // ���ϵͳ������౨����Ȳ˵���ж�ltrpt�Ƿ���ڣ��������������Զ���װ�򵯳�������ʾ
					Ext.lt.ifmis.activex.loadLTReportOcx();
				}
				ltrptocx.openJnlpProgram('RPT',
			            REPORT_VERSION,
						ROOT_PATH+'/common/jre6.zip',
						target,
						target.substring(target.indexOf('?')+1));	
			 }catch(ex){
				 alert("����ltrptocx�쳣��"+ex);	
			 }
    	}else{
			var v=qmenutree.getSelected()
			var open=true;
			if(typeof(openmenubefore)=="function"){
				open = openmenubefore();
			}
			// ����˸��ڵ�
			if(el.dataid==mainmenuid){
				open=false;
			}
			return open;
    	}
    }
}

function tasIntroduce(meunid){
	try{
		var iframeSrc = "";
		for(var i=0;i<tasIntroduces.length;i++){
			if(meunid==tasIntroduces[i].MENUID){
				iframeSrc=tasIntroduces[i].URL;break;
			}
		}
		if(""==iframeSrc){
			return false;
		}	
		var contextDiv = document.getElementById("context");
		var tasIntroduce = document.getElementById("tasIntroduce");
		contextDiv.style.display="none";
		var mainDivH = document.body.offsetHeight-document.getElementById("window_top").offsetHeight-30;
		if(tasIntroduce!=null){
			tasIntroduce.style.height = mainDivH;
			tasIntroduce.src=iframeSrc;
		}else{
			var iframeObj = document.createElement("iframe");
			iframeObj.id="tasIntroduce";
			iframeObj.width="100%";
			iframeObj.height=mainDivH;
			iframeObj.frameborder=0;
			iframeObj.src=iframeSrc;
			document.getElementById("main").appendChild(iframeObj);
		}
	}catch(e){}	
}

//gaiwenquan 2012-8-16 �޸� �϶���ද�����ı������div�Ŀ��
JQ("body").bind("mouseup",function(event){
	if (bStart == true){
		  if (event.clientX > posTable.x && event.clientX < posTable.x + oTable.offsetWidth - oTdSplitter.offsetWidth){
		  	  var m = event.clientX - posTable.x;
			  if(m>400){
			   		oTdLeft.style.width = 260;
			  }else{
			    	oTdLeft.style.width = m;
			  }
			  //��layout��������ʾ��ȫ����Ϊleft_tree.style.paddingLeft='3px';
			  //Ext.lt.layout.doLayout();
			  var submenutreediv=document.getElementById('submenutree');
			  var left_tree=document.getElementById("left_tree")
			  submenutreediv.style.width=left_tree.style.width;
		  }
	 }
});


//gaiwenquan 2012-8-20 �޸� ҳ�����ʱˢ��ҳ�� ����ԭ�����˵�����ʾ
var _doHiddenAll = doHiddenAll;
doHiddenAll=function(){
	_doHiddenAll();
	var _left_tree=document.getElementById("left_tree");
	if(_left_tree.style.display=="block"){
		Ext.lt.layout.doLayout();
	    var submenutreediv=document.getElementById('submenutree');
	    var left_tree=document.getElementById("left_tree")
		submenutreediv.style.width=left_tree.style.width;
	}
	//�ı��ۺϲ�ѯIFrame�Ĵ�С
	setFcasIFrameHeight();
}
var _doHiddenLeft = doHiddenLeft;
doHiddenLeft=function(obj){
	_doHiddenLeft(obj);
	var left_tree=document.getElementById("left_tree");
	if(left_tree.style.display=="block"){
		Ext.lt.layout.doLayout();
		var submenutreediv=document.getElementById('submenutree');
	    var left_tree=document.getElementById("left_tree")
	    submenutreediv.style.width=left_tree.style.width;
	}
}
var _doHiddenTop = doHiddenTop;
doHiddenTop=function(obj){
	_doHiddenTop(obj);
	Ext.lt.layout.doLayout();
	var submenutreediv=document.getElementById('submenutree');
	var left_tree=document.getElementById("left_tree")
	submenutreediv.style.width=left_tree.style.width;
	//�ı��ۺϲ�ѯIFrame�Ĵ�С
	setFcasIFrameHeight();
}
//�ı��ۺϲ�ѯIFrame�Ĵ�С
function setFcasIFrameHeight(){
	var tasIntroduce = document.getElementById('tasIntroduce');
	if(tasIntroduce!=null){
		tasIntroduce.style.height=document.body.clientHeight-document.getElementById('window_top').offsetHeight-30+'px';
	}else if(document.getElementById('fcasiframe')){//window_top
		document.getElementById('fcasiframe').style.height=document.body.clientHeight-document.getElementById('window_top').offsetHeight-30+'px';
	}
}