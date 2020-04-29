/**
 * 电子凭证库相关
 * 命名空间Ext.lt.ifmis.evoucher.
 * 其他系统如果需要单独引入本文件并使用提供方法，请确保按顺序引入choose.js,loadOcx.js，并定义了ROOT_PATH等全局变量，避免出错。
 */

if(Ext==null){
var Ext={};
Ext.lt={};
Ext.lt.ifmis={};
}
Ext.lt.ifmis.evoucher={}; 


/********电子凭证库***********/
/**
 * 加载签章控件(科友)
 * style :指定object宽高,默认为0，只调用，不显示。
 * targetel:指定画在页面的div，如果不指定则画在body最后
 */
Ext.lt.ifmis.evoucher.getCTJEstampOcx = function(style,targetel){
	var isAuto = rptOcxIsAuto;
	if(style==''||style==null){
		style ="width:0;height:0";
	}
	var ocxObject = Ext.lt.ifmis.activex.checkOcx("ESTAMPOCX.EstampOcxCtrl");
	if(ocxObject == null){
        if (isAuto == "0") {
        	Ext.lt.ifmis.activex.showOcxCheckResult();
        } else {
        	Ext.lt.ifmis.activex.showObjectTips('4FC4CDDF-84E5-437C-8527-B23F6D70866C','CTJEstampOcx','/common/CTJEstampOcx.cab#version=1,0,0,0');
        }
	}else{
		if(typeof(CTJEstampOcx) == "undefined"){
		 	return Ext.lt.ifmis.activex.loadObject('4FC4CDDF-84E5-437C-8527-B23F6D70866C','CTJEstampOcx','','',style,targetel);
		}else{
		 	return CTJEstampOcx;
		}
	}
}

/**
 * 获取签章ID
 */
Ext.lt.ifmis.evoucher.getStampId = function(){
	var ocxobj = Ext.lt.ifmis.evoucher.getCTJEstampOcx();
	var certId = -1;
	if(typeof(ocxobj)!="undefined"){
		try{
			certId = ocxobj.SelectStampId();
		}catch(e){
		}
	}
	return certId;
}
/**
 * 初始化服务地址.
 */
Ext.lt.ifmis.evoucher.init = function(){
	var ocxobj = Ext.lt.ifmis.evoucher.getCTJEstampOcx();
	//var vchurl   = "http://124.254.1.236:31001/realware/signer/result!getMethod.action";
	//var stampurl = "http://124.254.1.236:31000/realware/services/AsspEStampService";
	var vchurl = evoucher_vouurl;
	var stampurl = evoucher_stampurl;
	var result1 = -1;
	var result2 = -1;
	var result3 = -1;
	if(typeof(ocxobj)!="undefined"){
		result1 = ocxobj.SetEvoucherServiceUrl(vchurl);
	}
	if(result1!=0){
		Ext.lt.ifmis.evoucher.writeLogForRcp("SetEvoucherServiceUrl","vchurl:"+vchurl,Ext.lt.ifmis.evoucher.GetLastErr(ocxobj));
		return Ext.lt.ifmis.evoucher.GetLastErr(ocxobj);
	}
	if(typeof(ocxobj)!="undefined"){
		result2 = ocxobj.SetEstampServiceUrl(stampurl);
	}
	if(result2!=0){
		Ext.lt.ifmis.evoucher.writeLogForRcp("SetEstampServiceUrl","stampurl:"+stampurl,Ext.lt.ifmis.evoucher.GetLastErr(ocxobj));
		return Ext.lt.ifmis.evoucher.GetLastErr(ocxobj);
	}
	if(typeof(ocxobj)!="undefined"){
		result3 = ocxobj.ClearPinCache();
	}
	if(result2!=0){
		Ext.lt.ifmis.evoucher.writeLogForRcp("ClearPinCache","",Ext.lt.ifmis.evoucher.GetLastErr(ocxobj));
		return Ext.lt.ifmis.evoucher.GetLastErr(ocxobj);
	}
	return 0;
}
 
 
/**
 * 初始化显示控件，从电子凭证服务端加载电子凭证的模板. 这个只有显示盖章结果
 * certid 用户证书id 默认取当前用户证书ID
 * admdivcode 行政区划
 * styear 业务年度 默认为当年
 * vtcode 凭证类型
 * payflowno *
 * operatetype 操作模式
 * displaymode 显示模式 
 * defaultpage 默认显示联 默认为0
 * 
 */
Ext.lt.ifmis.evoucher.initEvoucher = function(certid,vtcode,operatetype,displaymode,defaultpage,adv,ayear){
	var ocxobj = Ext.lt.ifmis.evoucher.getCTJEstampOcx();
	var reSatus = -1;
	if(typeof(ocxobj)!="undefined"){
		var initVal = Ext.lt.ifmis.evoucher.init();
		if(initVal!=0){
			return Ext.lt.ifmis.evoucher.GetLastErr(ocxobj);
		}
			reSatus = ocxobj.Initialize(certid,adv,ayear,vtcode,"0",operatetype,displaymode,defaultpage);
	}
	return reSatus;
}
/**
 * 生成签章报文 
 * vtcode 凭证类型
 * stamp 签章位置 传入完整报文
 * voucherxml 凭证报文
 * adv 行政区划 默认从系统参数读取
 * ayear  业务年度 默认为服务器时间当年
 */
Ext.lt.ifmis.evoucher.getVoucherStamp = function(vtcode, stamp, voucherxml,adv,ayear,certid){
	var   admdivcode = ifmisdiv;
	var   styear = current_year;
	if(adv!=null&&adv!=""){ //防止传个空字符串
		admdivcode = adv;
	}
	if(ayear!=null&&ayear!=""){
		styear = ayear;
	}
	var ocxobj = Ext.lt.ifmis.evoucher.getCTJEstampOcx();
	var reMsg = "";
	if(certid==null){
		certid = ocxobj.SelectCertId();
	}
	if(typeof(ocxobj)!="undefined"){
		var initVal = Ext.lt.ifmis.evoucher.init();
		if(initVal!=0){
			return reMsg;
		}
		 reMsg = ocxobj.GetVoucherStamp(certid,admdivcode,styear,vtcode,stamp, voucherxml);
	}
	if(reMsg==""){
		Ext.lt.ifmis.evoucher.writeLogForRcp("GetVoucherStamp","certid:"+certid+",admdivcode:"+admdivcode+",styear"+styear+",vtcode:"+vtcode+",stamp:"+stamp+",voucherxml:"+voucherxml,Ext.lt.ifmis.evoucher.GetLastErr(ocxobj));
		return {"error":Ext.lt.ifmis.evoucher.GetLastErr(ocxobj)};
	}
	return {"success":reMsg};
}
 
/**
 * 生成签名报文(带签名位置)
 */
Ext.lt.ifmis.evoucher.signVoucher = function(vtcode, stamp, voucherxml,adv,ayear,certid){
	var   admdivcode = ifmisdiv;
	var   styear = current_year;
	if(adv!=null&&adv!=""){
		admdivcode = adv;
	}
	if(ayear!=null&&ayear!=""){
		styear = ayear;
	}
	var ocxobj = Ext.lt.ifmis.evoucher.getCTJEstampOcx();
	var reMsg = -1;
	if(typeof(ocxobj)!="undefined"){
			var initVal = Ext.lt.ifmis.evoucher.init();
			if(initVal!=0){
				return Ext.lt.ifmis.evoucher.GetLastErr(ocxobj);
			}
			if(certid==null){
				certid = ocxobj.SelectCertId();
			}
			reMsg = ocxobj.GetVoucherSign(certid,admdivcode,styear,vtcode,stamp,voucherxml);
	}
	if(reMsg==""){
		Ext.lt.ifmis.evoucher.writeLogForRcp("GetVoucherSign","certid:"+certid+",admdivcode:"+admdivcode+",styear"+styear+",vtcode:"+vtcode+",stamp:"+stamp+",voucherxml:"+voucherxml,Ext.lt.ifmis.evoucher.GetLastErr(ocxobj));
		return {"error":Ext.lt.ifmis.evoucher.GetLastErr(ocxobj)};
	}
	return {"success":reMsg};
}

/**
 * 加载待显示凭证信息（带原文接口）添加需要显示的签章凭证信息，逐笔添加。
 * 返回值，方法调用成功，返回 >=0 的加载凭证的顺序号 ；否则 返回 发生错误的原因字符串
 */
Ext.lt.ifmis.evoucher.addVoucher = function(vcherno,voucherxml,certid){
	var ocxobj = Ext.lt.ifmis.evoucher.getCTJEstampOcx();
	var reMsg = -1; //存放加载凭证的顺序号
	if(typeof(ocxobj)!="undefined"){
			var initVal = Ext.lt.ifmis.evoucher.init();
			if(initVal!=0){
				return Ext.lt.ifmis.evoucher.GetLastErr(ocxobj);
			}
			if(certid==null){
				certid = ocxobj.SelectCertId();
			}
			reMsg = ocxobj.AddVoucher(vcherno,voucherxml);
	}
	if(reMsg<0){
		Ext.lt.ifmis.evoucher.writeLogForRcp("AddVoucher","vcherno:"+vcherno+",voucherxml"+voucherxml,Ext.lt.ifmis.evoucher.GetLastErr(ocxobj));
		return Ext.lt.ifmis.evoucher.GetLastErr(ocxobj);
	}
	return reMsg;
}

/**
 * 后台批量打印 实现凭证不显示控件后台批量打印
 * defaultPage默认联 voucherNo 凭证编号数组/也可传入以逗号隔开的字符串
 * 打印成功 返回0，否则返回错误原因
 */
Ext.lt.ifmis.evoucher.printAllVoucher = function(vtcode,defaultPage,voucherNo,adv,ayear,certid){
	var   admdivcode = ifmisdiv;
	var   styear = current_year;
	if(adv!=null&&adv!=""){
		admdivcode = adv;
	}
	if(ayear!=null&&ayear!=""){
		styear = ayear;
	}
	var ocxobj = Ext.lt.ifmis.evoucher.getCTJEstampOcx();
	var reMsg = -1;
	if(typeof(ocxobj)!="undefined"){
			var initVal = Ext.lt.ifmis.evoucher.init();
			if(initVal!=0){
				return Ext.lt.ifmis.evoucher.GetLastErr(ocxobj);
			}
			if(certid==null){
				certid = ocxobj.SelectCertId();
			}
			if(typeof(voucherNo)=="string"){
				voucherNo = voucherNo.split(",");
			}
			reMsg = ocxobj.PrintAllVoucher(certid,admdivcode,styear,vtcode,defaultPage,voucherNo);
	}
	if(reMsg!=0){ 
		Ext.lt.ifmis.evoucher.writeLogForRcp("PrintAllVoucher","certid:"+certid+",admdivcode:"+admdivcode+",styear"+styear+",vtcode:"+vtcode+",defaultPage:"+defaultPage+",voucherNo:"+voucherNo,Ext.lt.ifmis.evoucher.GetLastErr(ocxobj));
		return Ext.lt.ifmis.evoucher.GetLastErr(ocxobj);
	}
	return  reMsg;
}

/**
 * 验证不带位置的签名,同步调用后台服务
 * vtcode 凭证类型
 * voucherxml  报文
 * 返回值: 如果成功则返回 Map<凭证编号,1/0> ；如果失败 返回 Map<error,错误信息>
 */
Ext.lt.ifmis.evoucher.verfiySignWithoutPosition = function(vtcode,voucherxml,certid){
	var ocxobj = Ext.lt.ifmis.evoucher.getCTJEstampOcx();
	if(typeof(ocxobj)!="undefined"){
		if(certid==null){
			certid = ocxobj.SelectCertId();
		}
	}
	var param_arr = [certid,vtcode,voucherxml];
	var anchor = Ext.lt.RCP.asynserver('ifmis.evoucher.EvoucherService','verfiySignWithoutPositionForRcp',param_arr);
	return anchor;
}

/**
 *  指定凭证类型查询盖章位置
 */
Ext.lt.ifmis.evoucher.queryStampPosition = function(vtcode,certid){
	var ocxobj = Ext.lt.ifmis.evoucher.getCTJEstampOcx();
	if(typeof(ocxobj)!="undefined"){
		if(certid==null){
			certid = ocxobj.SelectCertId();
		}
	}
	var param_arr = [certid,vtcode];
	var anchor = Ext.lt.RCP.asynserver('ifmis.evoucher.EvoucherService','queryStampPositionForRcp',param_arr);
	return anchor;
}

/**
 * 打印预览接口.
 */
Ext.lt.ifmis.evoucher.printPreview = function(vtcode, pageno,voucherNo,adv,ayear,certid){
	var   admdivcode = ifmisdiv;
	var   styear = current_year;
	if(adv!=null&&adv!=""){
		admdivcode = adv;
	}
	if(ayear!=null&&ayear!=""){
		styear = ayear;
	}
	var ocxobj = Ext.lt.ifmis.evoucher.getCTJEstampOcx();
	var reStauts = -1;
	if(typeof(ocxobj)!="undefined"){
		var initVal = Ext.lt.ifmis.evoucher.init();
		if(initVal!=0){
			return Ext.lt.ifmis.evoucher.GetLastErr(ocxobj);
		}
		if(certid==null){
			certid = ocxobj.SelectCertId();
		}
		reStauts =  ocxobj.PrintPreview(certid, admdivcode, styear, vtcode, pageno,voucherNo);
		if(reStauts!=0){
			Ext.lt.ifmis.evoucher.writeLogForRcp("PrintPreview","certid:"+certid+",admdivcode:"+admdivcode+",styear"+styear+",vtcode:"+vtcode+",pageno:"+pageno+",voucherNo:"+voucherNo,Ext.lt.ifmis.evoucher.GetLastErr(ocxobj));
			reStauts = Ext.lt.ifmis.evoucher.GetLastErr(ocxobj);
		}
		return reStauts;
	}
}

/**
 * 显示签章结果.
 * 传入年度，提供默认值（取服务器时间）
 */
Ext.lt.ifmis.evoucher.showVoucher = function(vtcode, operateType,  displayMode, defaultPage,voucherNo,adv,ayear,certid){
	var   admdivcode = ifmisdiv;
	var   styear = current_year;
	if(adv!=null&&adv!=""){
		admdivcode = adv;
	}
	if(ayear!=null&&ayear!=""){
		styear = ayear;
	}
	var ocxobj = Ext.lt.ifmis.evoucher.getCTJEstampOcx();
	var reStauts = -1;
	if(typeof(ocxobj)!="undefined"){
		var initVal = Ext.lt.ifmis.evoucher.init();
		if(initVal!=0){
			return Ext.lt.ifmis.evoucher.GetLastErr(ocxobj);
		}
		if(certid==null){
			certid = ocxobj.SelectCertId();
		}
		var initModel = Ext.lt.ifmis.evoucher.initEvoucher(certid, vtcode,operateType,  displayMode, defaultPage, admdivcode, styear);
		if(initModel!=0){
			Ext.lt.ifmis.evoucher.writeLogForRcp("initEvoucher","certid:"+certid+",admdivcode:"+admdivcode+",styear"+styear+",vtcode:"+vtcode+",operateType:"+operateType+",displayMode"+displayMode+",defaultPage:"+defaultPage,Ext.lt.ifmis.evoucher.GetLastErr(ocxobj));
			return Ext.lt.ifmis.evoucher.GetLastErr(ocxobj);
		}
		reStauts =  ocxobj.AddVoucherfromServer(voucherNo);
		ocxobj.Refresh(voucherNo);
		if(reStauts!=0){
			Ext.lt.ifmis.evoucher.writeLogForRcp("AddVoucherfromServer","voucherNo:"+voucherNo,Ext.lt.ifmis.evoucher.GetLastErr(ocxobj));
			reStauts = Ext.lt.ifmis.evoucher.GetLastErr(ocxobj);
		}
		return reStauts;
	}
}
/**
 * 将科友客户端调用错误信息记录到后台日志文件
 */
Ext.lt.ifmis.evoucher.writeLogForRcp = function(funcname,params,errmsg){
	var log = "调用科友客户端ocx接口"+funcname+"出错  ("+params+" )异常信息: "+errmsg;
	var anchor = Ext.lt.RCP.asynserver('ifmis.evoucher.EvoucherService','writeLoggerForRCP',log);
}


Ext.lt.ifmis.evoucher.GetLastErr = function(obj){
	if(typeof(obj)!="undefined"){
		return obj.GetLastErr();
	}
	return "科友控件未安装！无法获取控件客户端产生错误";
}
