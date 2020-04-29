/*!
 * 控件相关方法JS，提供控件检测，根据参数动态加载等方法。
 * 其他系统如果需要单独引入本文件并使用提供方法，请确保引入choose.js，并定义了ROOT_PATH等全局变量，避免出错。
 * Copyright 2012, szlongtu
 * Date: 2012-05-22
 */

if(Ext==null){
var Ext={};
Ext.lt={};
}
Ext.lt.ifmis={};
Ext.lt.ifmis.activex={}; 
if(typeof(rptOcxIsAuto) == "undefined"){
	rptOcxIsAuto = "1";
}

if(typeof(ROOT_PATH) == "undefined"){
	ROOT_PATH = "";
}
/**
* 加载AppCallerXControl.ocx
* 该方法暂时废弃.
*/
Ext.lt.ifmis.activex.loadAppCallerOcx=function(){
	var isAuto = rptOcxIsAuto;
		var ocxObject = Ext.lt.ifmis.activex.checkOcx("AppCallerXControl2.AppCaller");
		if(ocxObject == null){
			if (isAuto == "0") {
				Ext.lt.ifmis.activex.showOcxCheckResult();
			}else{
				Ext.lt.ifmis.activex.showObjectTips('9252769C-08EF-4E3A-9E04-490D76C0C832','AppCaller','/appcaller.cab#version=1,0,0,0');
			}
		}else{
    		if(typeof(AppCaller) == "undefined"){
    			ocxObject.close();
    			ocxObject=null;
    			return Ext.lt.ifmis.activex.loadObject('9252769C-08EF-4E3A-9E04-490D76C0C832','AppCaller','','<param name="Visible" value="0"><param name="Enabled" value="-1"><param name="ParentBackground" value="0"><param name="DoubleBuffered" value="0"><param name="HideBar" value="0">');
    		}else{
    			return ocxObject;
			}
		}
}

/**
* 加载久其报表
*/
Ext.lt.ifmis.activex.loadJQReportOcx=function(){
		var isAuto = rptOcxIsAuto;
		var ocxObject = Ext.lt.ifmis.activex.checkOcx("JQezPrinter.JQezPrinterXCtrl");
		if(ocxObject == null){
			if (isAuto == "0") {
				Ext.lt.ifmis.activex.showOcxCheckResult();
			} else {
				Ext.lt.ifmis.activex.showObjectTips('0B7A9F67-EB6F-42B4-847B-E4A451E276F6','WebPrinter','/common/JQezPrinter.ocx#version=1.0.0.0');
			}
		}else{
			return ocxObject;
		}
}
/**
* 加载龙图报表
*/
Ext.lt.ifmis.activex.loadLTReportOcx=function(){
		var isAuto = rptOcxIsAuto;
    	if(typeof(window.LTRPT_WEBSTART_VERSION) == "undefined"){
    		window.LTRPT_WEBSTART_VERSION = "3,1,0,0";
    	}
    	if(Ext.lt.ifmis.activex.checkOcx("ActiveWebStartProj.ActiveWebStart") == null){
	        if (isAuto == "0") {
	        	Ext.lt.ifmis.activex.showOcxCheckResult();
	        } else {
	        	Ext.lt.ifmis.activex.showObjectTips('E1D2CA62-FA6D-40F0-9680-DBC40A067C8F','ltrptocx','/common/webstart.cab#version='+window.LTRPT_WEBSTART_VERSION);
	        }
    	}else{
    		if(typeof(ltrptocx) == "undefined"){
    			return Ext.lt.ifmis.activex.loadObject('E1D2CA62-FA6D-40F0-9680-DBC40A067C8F','ltrptocx','');
    		}else{
				return ltrptocx;
			}
    	}
}
/*
 * 动态载入object标签.（暂时只有这三个基本的通用属性）
 * @param classid      控件唯一的clsid
 * @param id object    对象id
 * @param codebase     下载路径
 */
Ext.lt.ifmis.activex.loadObject=function(classid,id,codebase,params,style,targetel){
	var selfParams="";
	if(typeof(params)!="undefined"){
		selfParams=params;
	}
	// document.write有时创建不成功
	try{
	var rptobj=document.createElement('div');
    	rptobj.id="rptobj";
    	if(document.getElementById(targetel)!=null){
    		document.getElementById(targetel).appendChild(rptobj);
    	}else{
    		document.body.appendChild(rptobj);
    	}
		rptobj.innerHTML = ('<object classid="clsid:'+classid+'" id='+id+' style='+style+' codebase="'+codebase+'">'+selfParams+'</object>');
	}catch(e){
	}
	var target=document.getElementById(id);
	if(target!=null){
		return target;
	}
}
/*
 * 弹出控件检测结果.
 */
Ext.lt.ifmis.activex.showOcxCheckResult=function(){
	window.showModalDialog(ROOT_PATH+"/system/checkPlugin2.jsp","", 'dialogWidth:600px;dialogHeight:450px;status:no;resizable:no;help:No;');
	return null;
}
/*
 * 弹出自动安装提示
 */
Ext.lt.ifmis.activex.showObjectTips=function(classid,id,codebase){
/*	var tmpObj={
			tclassid:classid,
			tid:id,
			tcodebase:codebase
	};*/
	var url = ROOT_PATH+"/system/loadObject.jsp?classid="+classid+"&id="+id+"&codebase="+codebase;
	var iWidth = 300;
	var iHeight = 300;
	var iTop = (window.screen.availHeight-30-iHeight)/2;       //获得窗口的垂直位置;
    var iLeft = (window.screen.availWidth-10-iWidth)/2; 
	
	if(getCookie("notips_"+id)==null||getCookie("notips_"+id)!="yes"){ //控制今日不再提示
	//window.showModalDialog(ROOT_PATH+"/system/loadObject.jsp",tmpObj, 'dialogWidth:280px;dialogHeight:280px;status:no;resizable:no;help:No;');
		window.open(url, '','width=350px,height=430px,top='+iTop+',left='+iLeft+',status=yes,toolbar=no,menubar=no,directories=no,resizable=yes,Scrollbars=yes,help:No');
	}
}
/*
 * 检测本地是否安装控件
 * proid---注册表progid
 */
Ext.lt.ifmis.activex.checkOcx=function(proid) {
    var obj;
    var sum = 0;
    try {
        obj = new ActiveXObject(proid);
        sum++;
    }catch(e) {
        for (var x = 1; x < 10; x++) {
			try {
				obj = eval("new ActiveXObject('" + proid + "." + x + "')");
				sum++;
				break;
			} catch(e) {}
		}
    }
    if (sum > 0) {
        return obj;
    } else if (sum === 0) {
        return null;
    }
}

/*
 * 检查客户端安装flash版本
 * 如果低于10的版本，则提示安装升级。
 */
Ext.lt.ifmis.activex.getFlashVersion=function(){
 var f=0;
if(window.ActiveXObject) {
        for(var j=11;j>=4;j--) {
           try {   
                 var fl=eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash."+j+"');");
                 if (fl) {
                     f=j ;
                     break;
                 }
         }
               catch(e)
               {
               }
          }
        if(f<10){
        	Ext.lt.ifmis.activex.showDiv();
        }
    } 
}

/*
 * 遮罩层提示安装flash
 */
Ext.lt.ifmis.activex.showDiv=function(){
	if(!document.getElementById("mask2")){
		var d_mask=document.createElement('div');
    	d_mask.id="mask2";
    	document.body.appendChild(d_mask);
    }else{
    	var d_mask=document.getElementById("mask2");
    }
    if(!document.getElementById("LoadDown")){
    	var d_dialog = document.createElement('div');
	    d_dialog.id = "LoadDown";
	    var objHtml = "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\">";
	    objHtml = objHtml + "<tr><td>";
	    objHtml = objHtml + "<div class=\"loaddown_in\"><a href=\"#\" onclick=\"Ext.lt.ifmis.activex.closeDiv()\"><img src=\"/images/actions/delete.gif\" /></a></div>";
	    objHtml = objHtml + "<div id=\"loaddown_out\" class=\"loaddown_out\">检测到您的flash版本太低或者没有安装，请您点击<a onclick=\"Ext.lt.ifmis.activex.showyourInfo();\" href=\"#\"  target=\"_blank\"><font color=\"red\">下载</font></a>安装。";
	    objHtml = objHtml + "</div></td></tr></table>";
				
	    d_dialog.innerHTML=''+objHtml+'';
	    document.body.appendChild(d_dialog);
    }else{
    	var d_dialog = document.getElementById('LoadDown'); 
    }
        var vwidth =screen.width;
        var dialogWidth = document.body.offsetWidth;
     	var vheight = screen.height ;
     	var dialogHeight = document.body.offsetHeight;
     	d_mask.style.width = vwidth;
     	d_mask.style.height = vheight; 
		d_dialog.style.left = (dialogWidth - 332) / 2 - 10;
		d_dialog.style.top = (dialogHeight - 72) / 2 - 10;
    d_mask.style.visibility='visible';
    d_dialog.style.visibility='visible';
    d_dialog.style.display='block';
    Ext.lt.ifmis.activex.hiddselect(true);
}
/*
 * 点击链接提示
 */
Ext.lt.ifmis.activex.showyourInfo=function(){
	document.getElementById("loaddown_out").innerHTML="为避免重启电脑，安装过程中请关闭浏览器及其他程序。<br> <font color = 'red'>*</font>注：安装失败，请先点击<a target='_blank' href='"+ROOT_PATH+"/ltext/uninstall_flash_player_32bit.exe'><font color = 'red'>此处</font></a>进行卸载。";
		window.open(ROOT_PATH+"/ltext/flashplayer.exe");
}
/*
 * 关闭遮罩层
 */
Ext.lt.ifmis.activex.closeDiv=function(){
 	var d_mask=document.getElementById('mask2');
    var d_dialog = document.getElementById('LoadDown');
    d_mask.style.width=0;
    d_mask.style.height=0;
    d_mask.style.visibility='hidden';
    d_dialog.style.visibility='hidden';
    d_dialog.style.display='none';
    Ext.lt.ifmis.activex.hiddselect(false);
   // window.location.reload();//关闭遮罩层刷新当前页面
}
Ext.lt.ifmis.activex.hiddselect = function(flag){
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
/*
 * 截取当前屏幕并返回jpeg格式的图片base64编码字符串.
 * by jzy
 */
Ext.lt.ifmis.activex.getScreenPicInfo=function(){	
	var isAuto = rptOcxIsAuto;
	var capture = Ext.lt.ifmis.activex.checkOcx("CaptureScreen.Foo");
	var base64code = "";
	if(capture == null){
        if (isAuto == "0") {
        	Ext.lt.ifmis.activex.showOcxCheckResult();
        } else {
        	Ext.lt.ifmis.activex.showObjectTips('D4A55BDB-B9FF-4CF2-AB5C-F073492D46DF','cap','/common/CaptureScreen.cab#version=1,0,0,1');
        }
	}else{
		base64code = capture.PicValue();
		return base64code.replace(/(\s*$)/g,""); //结尾去除空格
	}
	
}

//龙图报表预览 
function ltViewReport(printConfig){
	 var defaults = {
		 	jnlpbase:ROOT_PATH+'/ltrptapp/ltir/jasper/jnlp',
	        printurl:ROOT_PATH+'/servlet/ltrpt/JasperSqlServlet',
	        server_jnlp_url:ROOT_PATH+'/servlet/ltrpt/MakeJasperJnlpServlet',
		 	jre_url:ROOT_PATH+'/common/jre6.zip',
		 	rtp_name:'ltrpt_jasper',
		 	worker:'viewer',
		 	jnlp_version:REPORT_VERSION//左侧菜单中获得
	 };
	 printConfig = JQ.extend(defaults,printConfig);
	 rpt_JasperPrint(printConfig);
}
//龙图报表打印
// printConfig 必须包括参数jrid,printid
//jrid:数据参数串 模板中的参数,也就是选中行对象id
//printid:模板参数
function ltPrintReport(printConfig){
	 var defaults = {
		 	jnlpbase:ROOT_PATH+'/ltrptapp/ltir/jasper/jnlp',
	        printurl:ROOT_PATH+'/servlet/ltrpt/JasperSqlServlet',
	        server_jnlp_url:ROOT_PATH+'/servlet/ltrpt/MakeJasperJnlpServlet',
		 	jre_url:ROOT_PATH+'/common/jre6.zip',
		 	rtp_name:'ltrpt_jasper',
		 	worker:'printer',
		 	jnlp_version:REPORT_VERSION//左侧菜单中获得
	 };
	 printConfig = JQ.extend(defaults,printConfig);
	 rpt_JasperPrint(printConfig);
}
//龙图报表组件调用    马德滔修改[多年度调用]
function rpt_JasperPrint(printConfig){
    var ocx_jnlp_url=printConfig.server_jnlp_url+'?jrid='+printConfig.jrid+'&printid='+printConfig.printid+'&worker='+printConfig.worker+'&jnlpbase='+printConfig.jnlpbase+'&printurl='+printConfig.printurl+Base64.decode(reportexturl);
    var run_param=ocx_jnlp_url.substring(ocx_jnlp_url.indexOf('?')+1);
    //报表组件ltrptocx要在门户中加载
    var ltrptocx=Ext.lt.ifmis.activex.loadLTReportOcx(); //之前在maimenu.jsp中加载，现在改为使用时候加载。
    if(typeof(ltrptocx)!="undefined"){
       ltrptocx.openJnlpProgram(printConfig.rtp_name,printConfig.jnlp_version,printConfig.jre_url,ocx_jnlp_url,run_param);
    }
}

// 打印凭证  rptid 是凭证打印模板，rows是打印的数据  模板中定义的数据项通过名称匹配自动从rows中获取
// rows 必须是一个数据对象
function printVoucher(rptid, rows){
	if($('WebPrinter')==null){
		var divobj = document.createElement("DIV");
		document.body.appendChild(divobj);
		divobj.innerHTML = '<object classid="clsid:0B7A9F67-EB6F-42B4-847B-E4A451E276F6" id=WebPrinter codebase="/common/JQezPrinter.ocx#version=1.0.0.0"></object>';
	}
	var rowJson = encodeURIComponent(Object.toJSON(rows));
    new Ajax.Request(
                    ROOT_PATH+"/common/printvoucher.do",
                    {method: 'post', parameters: "printid="+rptid+"&json="+rowJson, onComplete: printReport}
                    );
}

function printReport(request){
	try{
		eval("var gridData = "+request.responseText+"");
		  var printer = Ext.lt.ifmis.activex.loadJQReportOcx();
		  if(typeof(printer)!="undefined"){
				if(gridData.success){
					printer.PreviewEx(gridData.rpt,gridData.tmp);
				}
				else{
					alert(gridData.msg);
				}
		  }
	}
	catch(ex){
		alert("请将该系统的IP地址设置成信任站点.");
	}
}
