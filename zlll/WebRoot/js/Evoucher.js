/**
 * ����ƾ֤�����
 * �����ռ�Ext.lt.ifmis.evoucher.
 * ����ϵͳ�����Ҫ�������뱾�ļ���ʹ���ṩ��������ȷ����˳������choose.js,loadOcx.js����������ROOT_PATH��ȫ�ֱ������������
 */

if(Ext==null){
var Ext={};
Ext.lt={};
Ext.lt.ifmis={};
}
Ext.lt.ifmis.evoucher={}; 


/********����ƾ֤��***********/
/**
 * ����ǩ�¿ؼ�(����)
 * style :ָ��object���,Ĭ��Ϊ0��ֻ���ã�����ʾ��
 * targetel:ָ������ҳ���div�������ָ������body���
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
 * ��ȡǩ��ID
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
 * ��ʼ�������ַ.
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
 * ��ʼ����ʾ�ؼ����ӵ���ƾ֤����˼��ص���ƾ֤��ģ��. ���ֻ����ʾ���½��
 * certid �û�֤��id Ĭ��ȡ��ǰ�û�֤��ID
 * admdivcode ��������
 * styear ҵ����� Ĭ��Ϊ����
 * vtcode ƾ֤����
 * payflowno *
 * operatetype ����ģʽ
 * displaymode ��ʾģʽ 
 * defaultpage Ĭ����ʾ�� Ĭ��Ϊ0
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
 * ����ǩ�±��� 
 * vtcode ƾ֤����
 * stamp ǩ��λ�� ������������
 * voucherxml ƾ֤����
 * adv �������� Ĭ�ϴ�ϵͳ������ȡ
 * ayear  ҵ����� Ĭ��Ϊ������ʱ�䵱��
 */
Ext.lt.ifmis.evoucher.getVoucherStamp = function(vtcode, stamp, voucherxml,adv,ayear,certid){
	var   admdivcode = ifmisdiv;
	var   styear = current_year;
	if(adv!=null&&adv!=""){ //��ֹ�������ַ���
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
 * ����ǩ������(��ǩ��λ��)
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
 * ���ش���ʾƾ֤��Ϣ����ԭ�Ľӿڣ������Ҫ��ʾ��ǩ��ƾ֤��Ϣ�������ӡ�
 * ����ֵ���������óɹ������� >=0 �ļ���ƾ֤��˳��� ������ ���� ���������ԭ���ַ���
 */
Ext.lt.ifmis.evoucher.addVoucher = function(vcherno,voucherxml,certid){
	var ocxobj = Ext.lt.ifmis.evoucher.getCTJEstampOcx();
	var reMsg = -1; //��ż���ƾ֤��˳���
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
 * ��̨������ӡ ʵ��ƾ֤����ʾ�ؼ���̨������ӡ
 * defaultPageĬ���� voucherNo ƾ֤�������/Ҳ�ɴ����Զ��Ÿ������ַ���
 * ��ӡ�ɹ� ����0�����򷵻ش���ԭ��
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
 * ��֤����λ�õ�ǩ��,ͬ�����ú�̨����
 * vtcode ƾ֤����
 * voucherxml  ����
 * ����ֵ: ����ɹ��򷵻� Map<ƾ֤���,1/0> �����ʧ�� ���� Map<error,������Ϣ>
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
 *  ָ��ƾ֤���Ͳ�ѯ����λ��
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
 * ��ӡԤ���ӿ�.
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
 * ��ʾǩ�½��.
 * ������ȣ��ṩĬ��ֵ��ȡ������ʱ�䣩
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
 * �����ѿͻ��˵��ô�����Ϣ��¼����̨��־�ļ�
 */
Ext.lt.ifmis.evoucher.writeLogForRcp = function(funcname,params,errmsg){
	var log = "���ÿ��ѿͻ���ocx�ӿ�"+funcname+"����  ("+params+" )�쳣��Ϣ: "+errmsg;
	var anchor = Ext.lt.RCP.asynserver('ifmis.evoucher.EvoucherService','writeLoggerForRCP',log);
}


Ext.lt.ifmis.evoucher.GetLastErr = function(obj){
	if(typeof(obj)!="undefined"){
		return obj.GetLastErr();
	}
	return "���ѿؼ�δ��װ���޷���ȡ�ؼ��ͻ��˲�������";
}
