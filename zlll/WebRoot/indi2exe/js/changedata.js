/*��֧��Ȳ�ѯ 2013.12.26 �Թ���*/
function queryIncomeLimit(){
 	var agency;
	var selectrows = tmain.getSelectedRow();
	if(selectrows.length < 1 ){
	    alert("��ѡ��һ���ҽ�һ������!");
	}else if(selectrows.length > 1 ){
		alert("����ѡ�����һ������!");
	}else{
	agency = selectrows[0].bdgagency;
    var	url = "/plan/normalplan/auditForAHHA/queryIncomeLimit/index.do?agency="+ agency + "&mainmenu="+getArgs()["mainmenu"]+"&submenu="+getArgs()["submenu"];
    var result = window.showModalDialog(url,window,'dialogWidth:1000px;dialogHeight:900px;status:no;resizable:yes;help:No;scroll:yes;');
	}
}
//���޸ı����ʱ�� �ѷ����ĺźͷ������ڱ��浽�ӵ���ÿ��������
//�������� tmain Ϊdatatable��id,
//formid �Ƿ����ĺ����ڵ�form�� id
function changeDataText3(tmain,formid){
    if(detailObj==null) return;
    if(tmain != null && tmain.data != null && tmain.data.length > 0 ){
				//ͬ���������������ݷ�������
				var datas = tmain.data;
				for(var i=0;i<datas.length;i++){
				    datas[i].senddoctime = $(formid).senddoctime.value;
				    datas[i].text3 = $(formid).text3.value;
				}	
			}
}

//�������й��ܰ�ť������
//ָ��ģ��ʹ��
function disabledFunctionButton(){
	var element = document.getElementsByTagName('input');
	var length = element.length;
	
	for(var i = 0; i < length; i++){
		if(element[i].type=="button" || element[i].type=="submit"){
			element[i].disabled="disabled";
		}
	}
}
//�������й��ܰ�ť���� ר��ʹ��
function abledFunctionButton(){
	var element = document.getElementsByTagName('input');
	var length = element.length;
	
	for(var i = 0; i < length; i++){
		if(element[i].type=="button" || element[i].type=="submit"){
			element[i].disabled=false;
		}
	}
}


//ָ���ӡ����
function printindi() {
	if(tmain != null && tmain.data != null){
		selectrows = tmain.getSelectedRow();
	}
	if(selectrows == null){
		return;
	}

	if(selectrows != null && selectrows.length == 0){
		alert("��ѡ��Ҫ��ӡ�ļ�¼��");
		return;
	}
	
	var indiDetails = new Array();
	for(i = 0 ; i < selectrows.length; i ++ ){
		indiDetails=indiDetails.concat(selectrows[i].details);
	}
   
   var ds = new Object();
    ds.DS1 = selectrows;
    ds.DS2 = indiDetails; 
    ds.DS3 = modulename; 
    printVoucher(rptid,ds);
}

// �˻�
function doReturnApply() {
	if(hasChecked()){
		var selectRow=new Array();
		for(var i=0;i<tmain.getSelectedRow().length;i++){
			selectRow[i]=tmain.getSelectedRow()[i].billid;
		}
		
		        
        var url ="/indi/totalindiassign/audit/sendBack.do";		
		
		var auditOpinion = 'auditOpinion=' + tmain.getSelectedRow()[0].auditOpinion;
        var selectedbillids = 'selectedbillids=' + selectRow;
        var pars = selectedbillids + '&'+auditOpinion;
		
		show();
	   	var myAjax = new Ajax.Request(url,
					   	{
						   	 method: 'post',
						   	 parameters: pars,
						   	 onComplete : afterOperation,
							 onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
							 	closeDiv();alert("����ʧ�ܣ�");
							 }
						} 
	   				);
    }
}
// ȡ���˻�
function doCancelReturn() {

	if(hasChecked()){
		var selectRow=new Array();
		for(var i=0;i<tmain.getSelectedRow().length;i++){
			selectRow[i]=tmain.getSelectedRow()[i].billid;
		
		}
		
		var auditOpinion = 'auditOpinion=' + tmain.getSelectedRow()[0].auditOpinion;
        var selectedbillids = 'selectedbillids=' + selectRow;
        var pars = selectedbillids + '&'+auditOpinion;       
		         
        var url ="/indi/totalindiassign/audit/cancelSendBack.do";		
		
		show(); 
	   	var myAjax = new Ajax.Request(url,
					   	{
						   	 method: 'post',
						   	 parameters: pars,
						   	 onComplete : afterOperation,
							 onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
							 closeDiv();alert("����ʧ�ܣ�");
							 }
						} 
	   				);
    } 
}
/*
�����Ƿ���Բ���
1����¼�����
   ֻ���Ƶ��˿��ԶԵ��ݽ����޸ġ�ɾ����ȡ��������������
2����������
   ֻ�õ��ݵĲ����˲ſɽ��������������ȡ����ˡ�ȡ�����͵ȣ�
3����˽�����޸�Ҫ��������������
4���˻صĵ���ֻ����¼��������Ƶ����޸ġ�ɾ��

op = true ¼��
opuserid  �����û�
*/
function isOpertion(op,opuserid,selectedrow){
   for (var i= 0 ; i<selectedrow.length ;i++) {
   	if (op && opuserid != selectedrow[i].creater || !op && opuserid != selectedrow[i].userid){
     	  alert('��û�в�����' + selectedrow[i].serial + '��¼��Ȩ�ޣ����飡') ;
     	  return false ;
        }  
   }
   return true ;
}

/*
 �����Ƿ�ɸ�
*/
function issendUpdate(row){
   return true ;
}


/*
20091010 jiazhitao
���༭���޸�ʱ��ͬʱ�޸ĵ�ǰ��Ĭ��amt ��� curbal ��ǰ���
������Ҫ��ҳ�渲�Ǵ˷���
*/
function ondatachange(datatable,row,col,olddata){

	if (row.amt == "" || isNaN(row.amt)) row.amt = 0.00 ;
	if (olddata.value == "" || isNaN(olddata.value)) olddata.value = 0.00 ;
	
	if( parseFloat(row.curbal)+ parseFloat(olddata.value) - parseFloat(row.amt) >=0.00){
	    row.curbal = parseFloat(row.curbal)+ parseFloat(olddata.value) - parseFloat(row.amt) ;
	    row.changed = true;
	}else{
	   row.amt = 0.00 ;
	   row.curbal = parseFloat(row.curbal)+ parseFloat(olddata.value) - parseFloat(row.amt) ;
       	   row.changed = true;
	   alert("���ý��㣬����!");
	}
	datatable.draw();

}

var config ;
var selectedRows ;
var sealList ;
var ymd ;

function getReportid(printConfig){
    
    if (tmain!=null || tmain!=undefined) {
    	selectedRows = tmain.getSelectedRow();
    }
    if(selectedRows == null || selectedRows.length < 1){
	  alert("��ѡ��Ҫ��ӡ�ĵ���");
	  return "";
     } 
  
    if (printConfig == undefined || printConfig =='null' || printConfig ==null || printConfig.length <1) {
    	alert("û�ж����ӡģ�壬����ϵ����Ա��") ;
    	return "" ;
    }
    var  row = selectedRows[0];
    var  config  ;
    for(var i = 0 ; i < printConfig.length ; i++){
	if(eval(printConfig[i]['condition'])){
		config = printConfig[i] ;
		break ;
         }
    }
    
    if (config == undefined || config =='null' || config.length <1) {
    	alert("û�з��ϴ�ӡ������ģ�壬����ϵ����Ա��") ;
    	return "" ;
    }
    for( var j = 0 ; j < selectedRows.size() ; j++){
           row = selectedRows[j];
          if(!eval(config['condition'])){
             alert("��ѡ��ͬ�����͵ĵ��ݽ��в���,����ѡ��ĵ���������������,����!");
             return "" ;
          }
     }
     return config;
}
function getReportidForPrintR(printConfig){
    
    if (tmain!=null || tmain!=undefined) {
    	selectedRows = tmain.getSelectedRow();
    }
    if(selectedRows == null || selectedRows.length < 1){
	  alert("��ѡ��Ҫ��ӡ�ĵ���");
	  return "";
     } 
    if (printConfig == undefined || printConfig =='null' || printConfig ==null || printConfig.length <1) {
    	alert("û�ж����ӡģ�壬����ϵ����Ա��") ;
    	return "" ;
    }
    var  row = selectedRows[0];
    var  config  ;
    for(var i = 0 ; i < printConfig.length ; i++){
	    if(rptid == printConfig[i]['reportId']){
	    	//if(printConfig[i]['sealList'].size() > 0){
		    		if(eval(printConfig[i]['condition'])){
						config = printConfig[i] ;
						break ;
		     		}
	    	//}
	     }else{
		     if(eval(printConfig[i]['condition'])){
				config = printConfig[i] ;
				continue ;
	         }
	     
	     }
    }
    if (config == undefined || config =='null' || config.length <1) {
    	alert("û�з��ϴ�ӡ������ģ�壬����ϵ����Ա��") ;
    	return "" ;
    }
    for( var j = 0 ; j < selectedRows.size() ; j++){
           row = selectedRows[j];
          if(!eval(config['condition'])){
             alert("��ѡ��ͬ�����͵ĵ��ݽ��в���,����ѡ��ĵ���������������,����!");
             return "" ;
          }
     }
     return config;
}
function printL(printConfig,linkName,ymd){
 	Ext.lt.ifmis.activex.loadJQReportOcx();
    config = getReportid(printConfig) ;    
    if (config=='') return ;
    sealList = config['sealList'] ;
    if (sealList.length>0) {
       // printSeal() ;
       querySealList();
    }else{
        var ds = createDS() ;
	printVoucherIndiPayPrintL(config['reportId'],ds);
    }
}

function printVoucherIndiPayPrintL(rptid, rows){
 
v_rows =rows;

   printWithTempPrintL(rptid);
}


//����ģ����ȥ��ѯ����ģ�����
function printWithTempPrintL(reportid){
 
  new Ajax.Request(
                 ROOT_PATH+"/indipay/common/queryRptTemp.do",
                 {method: 'post',
                  parameters: "reportid="+reportid,
                  onComplete: afterprintWithTempPrintL,asynchronous:false}
                 );

}
function afterprintWithTempPrintL(request){

	eval("var v_rptTemp = "+request.responseText+"");
	var rptnum = v_rptTemp.v_num;
	var v_rptid = v_rptTemp.reportId;

	Ext.lt.ifmis.activex.loadJQReportOcx();
	if(Number(rptnum)>1){
		var url = "/indipay/common/getRptTemp.do?reportid="+v_rptid;

	    var ret = window.showModalDialog(url,"","dialogWidth:400px;dialogHeight:300px;scroll:1;resizable:1;status:0;help:0;center:1");
	    	 if(typeof(ret) != "undefined"){
			     if(ret.length>0) {
			              new Ajax.Request(
		                    ROOT_PATH+"/indipay/common/printvoucherQZ.do",
		                    {method: 'post', parameters: "printid="+v_rptid+"&tempname="+ret[0]+"&json="+Object.toJSON(v_rows), onComplete: printReport}
		                    );
			        }
	        }
	}else{
	   new Ajax.Request(
                    ROOT_PATH+"/common/printvoucher.do",
                    {method: 'post', parameters: "printid="+v_rptid+"&json="+Object.toJSON(v_rows), onComplete: printReport}
                    );
	}
}




/**
 ��ѯǩ����Ϣ
*/
var seaNameList = "";
function querySealList(){
		if(sealList.length>0){
		    seaNameList ="'"+sealList[0]['sealName']+"'";
			for (var j=1;j<sealList.length;j++) {
				seaNameList =seaNameList + ",'"+sealList[j]['sealName']+"'";
			}
		}
/**
20091316
*/
		var selectedbillids="";
		for(var i=0;i<tmain.getSelectedRow().length;i++){
			selectedbillids +=tmain.getSelectedRow()[i].billid;
			if(i<tmain.getSelectedRow().length-1)selectedbillids += ",";
		
		}   
	    new Ajax.Request(
                    ROOT_PATH+"/common/querySealList.do",
                    {method: 'post', parameters: "sealist="+seaNameList+"&selectedbillids="+selectedbillids,
                     onComplete: afterQuerySealList}
                    );
}
var ros ="dr";
var rptid ="";
// printConfig linkname ����ģ��  ���ݼ�������Դ
function printR(printConfig,linkName,obj,rORs){
	ros = rORs;
	rptid = obj;
    config = getReportidForPrintR(printConfig) ;   
    if (config=='') return ;
    	sealList = config['sealList'] ;
    if (sealList.length>0) {
	    var selectedbillids="";
			for(var i=0;i<tmain.getSelectedRow().length;i++){
				selectedbillids +=tmain.getSelectedRow()[i].billid;
				if(i<tmain.getSelectedRow().length-1)selectedbillids += ",";
			} 
			//����linkname ��rptid��ѯ 
		     new Ajax.Request(
		                    ROOT_PATH+"/common/getSealListByRptId.do",
		                    {method: 'post',
		                     parameters: "linkname="+linkName+"&rptid="+rptid+"&selectedbillids="+selectedbillids,
		                     onComplete: aftergetDataFromAction}
		                    );
    }else{
	    if("dr" == ros){
	          var ds = createDS() ;
			 printVoucherIndiPay(rptid,ds);
	    }
	    if("ds" == ros){
	       	var billid = createDS_billid() ;
			printVoucherBillidIndiPay(rptid,billid);
	    }
    }
}
function aftergetDataFromAction(request){
	var sealList =""+ request.responseText+"";
	 if( "one"==sealList ){
	 	querySealListByRptId(linkName,rptid);
	 }else{
		    if("dr" == ros){
		         var ds = createDS() ;
				 printVoucherIndiPay(rptid,ds);
		    }
		    if("ds" == ros){
		       	var billid = createDS_billid() ;
				printVoucherBillidIndiPay(rptid,billid);
		    }
	    }
}
//����ģ��id��ѯ����ǩ����Ϣ
function querySealListByRptId(linkname,obj){
	rptid = obj;
		var selectedbillids="";
		for(var i=0;i<tmain.getSelectedRow().length;i++){
			selectedbillids +=tmain.getSelectedRow()[i].billid;
			if(i<tmain.getSelectedRow().length-1)selectedbillids += ",";
		}   
		var v_vchtypeid = tmain.getSelectedRow()[0].vchtypeid;
	    new Ajax.Request(
                    ROOT_PATH+"/common/querySealListByRptId.do",
                    {method: 'post', parameters: "linkname="+linkname+"&rptid="+rptid+"&selectedbillids="+selectedbillids+"&vchtypeid="+v_vchtypeid,
                     onComplete: afterQuerySealListForPrintR}
                    );
}
function afterQuerySealListForPrintR(request){
	   	if("dr" == ros){
        	 	afterQuerySealList(request);
       }
	    if("ds" == ros){
	       		afterQuerySealListForBillds(request);
	    }
}



/**********************/
function afterQuerySealList(request){

eval("var sealmess = "+request.responseText+"");
try{	
	    // ���������˵���   
	    document.all.HWPostil1.ShowDefMenu=0;
	    document.all.HWPostil1.ShowScrollBarButton = 0;
        document.all.HWPostil1.HideMenuItem(8192);
		document.all.HWPostil1.HideMenuItem(2);
		
		document.all.HWPostil1. HideMenuItem(262144);
		document.all.HWPostil1. HideMenuItem(16384);
		document.all.HWPostil1. HideMenuItem(8192) ;	
		document.all.HWPostil1.SetPageMode(1,100);		

		//HWPostil �ؼ������ش�ӡ��
		document.all.HWPostil1.Login("HWSEALDEMO**", 4, 65535, "DEMO", "");
		document.all.HWPostil1.BeforeConvert("");       
	    //������ӡģ��
	   	var ds = createDS() ;	   
	    printVoucherQZ(config['reportId'],ds);	   	     
	   	document.all.HWPostil1.WaitConverting(6000);
		//������ӡ
	   	document.all.HWPostil1.AfterConvert();
		if(!document.all.HWPostil1.IsOpened()){
			alert("��ش�ӡ��ʧ��");
		}else{ 
			//��ӡ��ͼƬ���뵽��ӡ�ļ��� , ��i �� ��j ��ǩ��
			var n = config['num'];
			//var m = 2;			
			if(n==0)n=1;
			for(var i = 0;i<selectedRows.length*n;i++){			
				eval("var sealBmpList  = sealmess.sealinfo_"+selectedRows[Math.floor(i/n)].billid);
				for (var j=0;j<sealBmpList.length;j++) {					   
					   var sealposion = getsealBmpPosion(sealBmpList[j].sealname);					   
					    if(typeof(sealposion)!="undefined"&&sealposion.lzoom!=null)
					   document.all.HWPostil1.InsertPicture(sealBmpList[j].sealname ,"STRDATA:" + sealBmpList[j].sealdata,i,sealposion.lleft,sealposion.ltop,sealposion.lzoom);
		      		  // if(n>1&&n%m==0)document.all.HWPostil1.InsertPicture(sealList[j]['sealName'] ,"STRDATA:" + sealList[j]['sealBmp'],i,sealList[j]['lleft'],sealList[j]['ltop']*2,sealList[j]['lzoom']);
	      			}	      
	     		 }
	     	}	
		document.all.HWPostil1.ShowFullScreen = 1; 	
	}catch(e){
		alert(e.name + ":" + e.message);
	}
}
/************************/
//Ϊģ�巽ʽΪ����Դ�Ĵ�ӡģ��
function querySealListForBillds(){
		if(sealList.length>0){
		    seaNameList ="'"+sealList[0]['sealName']+"'";
			for (var j=1;j<sealList.length;j++) {
				seaNameList =seaNameList + ",'"+sealList[j]['sealName']+"'";
			}
		}
/**
20091316
*/
		var selectedbillids="";
		var v_vchtypeid = tmain.getSelectedRow()[0].vchtypeid;//��ӽ���ƾ֤���͵���ѯ
		for(var i=0;i<tmain.getSelectedRow().length;i++){
			selectedbillids +=tmain.getSelectedRow()[i].billid;
			if(i<tmain.getSelectedRow().length-1)selectedbillids += ",";
		}   
	    new Ajax.Request(
                    ROOT_PATH+"/common/querySealList.do",
                    {method: 'post', parameters: "sealist="+seaNameList+"&selectedbillids="+selectedbillids+"&vchtypeid="+v_vchtypeid,
                     onComplete: afterQuerySealListForBillds}
                    );
                    
}
function afterQuerySealListForBillds(request){

eval("var sealmess = "+request.responseText+"");
try{	
	    // ���������˵���   
	    document.all.HWPostil1.ShowDefMenu=0;
	    document.all.HWPostil1.ShowScrollBarButton = 0;
        document.all.HWPostil1.HideMenuItem(8192);
		document.all.HWPostil1.HideMenuItem(2);
		document.all.HWPostil1. HideMenuItem(262144);
		document.all.HWPostil1. HideMenuItem(16384);
		document.all.HWPostil1. HideMenuItem(8192) ;	
		document.all.HWPostil1.SetPageMode(1,100);		
		//HWPostil �ؼ������ش�ӡ��
		document.all.HWPostil1.Login("HWSEALDEMO**", 4, 65535, "DEMO", "");
		document.all.HWPostil1.BeforeConvert("");      
		//����Ƿ�ǩ�¹�
		for(var i = 0;i<selectedRows.length;i++){	
			eval("var sealBmpList  = sealmess.sealinfo_"+selectedRows[i].billid);	
			if(sealBmpList.length>0){
				eval("var sealBmpList  = sealmess.sealinfo_"+selectedRows[i].billid);	
				break;
			}		
		} 
		
	    //������ӡģ��
	   	var ds = createDS() ;	   
	   	var billid = createDS_billid() ;
	   	printVoucherBillidIndiPay(config['reportId'],billid);
	    //printVoucherQZ(config['reportId'],ds);	   	     
	   	document.all.HWPostil1.WaitConverting(3000);
		//������ӡ
	   	document.all.HWPostil1.AfterConvert();
		if(!document.all.HWPostil1.IsOpened()){
			alert("��ش�ӡ��ʧ��");
		}else{ 
			//��ӡ��ͼƬ���뵽��ӡ�ļ��� , ��i �� ��j ��ǩ��
			var n = config['num'];
			//n�ĸ�ʽ�� �򼸴�*����
			var m = 2;		
				
			 var rid = config['reportId'];	
			if(n==0)n=1;
//�˴�����Ϊ��Ȼ���֪ͨ��׼�����������ط���ӡǩ�£�����ȷ���Ƿ���ʽ���Ȼ���֪ͨ��һ�£���һ�£������ô˴�����������һ�£���ο����ݼ���ʽ������д����
				if(rptid =='181'||rid =='102'||rid =='1002'){ 				 
					for(var i = 0;i<document.all.HWPostil1.PageCount;i++){			
								//eval("var sealBmpList  = sealmess.sealinfo_"+selectedRows[0].billid);
								for (var j=0;j<sealBmpList.length;j++) {					   
									   var sealposion = getsealBmpPosion(sealBmpList[j].sealname);					   
									    if(typeof(sealposion)!="undefined"&&sealposion.lzoom!=null)
									   document.all.HWPostil1.InsertPicture(sealBmpList[j].sealname ,"STRDATA:" + sealBmpList[j].sealdata,i,sealposion.lleft,sealposion.ltop,sealposion.lzoom);
						      		  // if(n>1&&n%m==0)document.all.HWPostil1.InsertPicture(sealList[j]['sealName'] ,"STRDATA:" + sealList[j]['sealBmp'],i,sealList[j]['lleft'],sealList[j]['ltop']*2,sealList[j]['lzoom']);
					      			}	      
					     		 }
				}else {
				//��������  ʹ���ݰ���billcode��������
					var tmpList=[];
					if(rptid =='201103'||rid =='210101'||rid =='210103' ||rid =='210108'){
				   	  	selectedRows.sort(compareWithTime);
				   	  }else{
				   	  	selectedRows.sort(compare);
						for(var i=selectedRows.length-1;i>=0;i=i-1){//��������
					           tmpList[tmpList.length]=selectedRows[i];
					   	  }
					   	  selectedRows = tmpList;
				   	  }
	   	  			
						for(var i = 0;i<selectedRows.length;i++){	

								eval("var sealBmpList  = sealmess.sealinfo_"+selectedRows[i].billid);	
								
								    /*
								    201103-ʵ�������˻��飨������	2
									30540110-ר��ƾ֤������һ��ɿ��飩	2
									30540210-ר��ƾ֤������Ԥ����ɿ	2
									201104-ʵ�������˻��飨���У�	2
									30540101-ר��ƾ֤������һ��ɿ��飩	2
									30540201-ר��ƾ֤������Ԥ���Ⲧ�	2
									30540301-ר��ƾ֤������֧��ƾ֤��	3					
									30540310-ר��ƾ֤������֧��ƾ֤��	3
									
								    102-ֱ��֧������������֪ͨ��	6
									1002-��Ȩ֧������������֪ͨ��	7
			
								   
								    var w = 0;
								    if(rid==201103 || rid==30540110|| rid==30540210|| rid==201104|| rid==30540101|| rid==30540201){
								    	w = selectedRows[i].details.length/2;
								    }else 	if(rid==30540301 || rid==30540310){
								    	w = selectedRows[i].details.length/3;
								    }else 	if(rid==102){
								    	w = selectedRows[i].details.length/6;
								    }else 	if(rid==1002){
								    	w = selectedRows[i].details.length/7;
								    }
									 */
								for(var a=0;a<n;a++){
									for (var j=0;j<sealBmpList.length;j++) {	
										   var sealposion = getsealBmpPosion(sealBmpList[j].sealname);					   
										    if(typeof(sealposion)!="undefined"&&sealposion.lzoom!=null){
										     		 document.all.HWPostil1.InsertPicture(sealBmpList[j].sealname ,"STRDATA:" + sealBmpList[j].sealdata,i*n+a,sealposion.lleft,sealposion.ltop,sealposion.lzoom);
					 							 	 //if(n>1&&n%m==0)	   document.all.HWPostil1.InsertPicture(sealBmpList[j].sealname ,"STRDATA:" + sealBmpList[j].sealdata,a,sealposion.lleft,(sealposion.ltop)*2.4,sealposion.lzoom);
										    }
										  // if(n>1&&%m==0)document.all.HWPostil1.InsertPicture(sealList[j]['sealName'] ,"STRDATA:" + sealList[j]['sealBmp'],i,sealList[j]['lleft'],sealList[j]['ltop']*2,sealList[j]['lzoom']);
						      		}	
					      		}      
				     	}
	     		}
	     	}	
		document.all.HWPostil1.ShowFullScreen = 1; 	
	}catch(e){
		alert(e.name + ":" + e.message);
	}
}
function compare(a,b){ 
	         if(a.billcode > b.billcode){
	         	return 1;
	         	}else if(a.billcode < b.billcode){
	         		return -1;
	         		}else{
	         				return 0;
	         			}
} 
function compareWithTime(a,b){ 
 if(a.createtime > b.createtime){
 		return 1;
 	}else if(a.createtime < b.createtime){
 		return -1;
 		}else{
 				if(a.billcode > b.billcode){
 					return 1;
 				}else if(a.billcode < b.billcode){
 					return -1;
 				}else{
 				 return 0;
 				}
 		}
} 	        
/*************************/

function getsealBmpPosion(name){

	var a = new Object();
	for(var n =0;n<sealList.length;n++){
		 if(name==sealList[n]['sealName']){		 	
		 	a.sealname=name;	 	
		 	a.lleft = sealList[n]['lleft'];
		 	a.ltop = sealList[n]['ltop'];
		 	a.lzoom = sealList[n]['lzoom'];
			return a;
		 }
	}
	
}
/* ��ӡǩ��*/
var v_rows ;
function printVoucherQZ(rptid, rows){
	v_rows= rows;

	Ext.lt.ifmis.activex.loadJQReportOcx();
	printWithTemp(rptid);
    //new Ajax.Request(
    //                ROOT_PATH+"/common/printvoucher.do",
    //                {method: 'post', parameters: "printid="+rptid+"&json="+Object.toJSON(rows), onComplete: printReportQZ}
    //                );
}
/* ��ӡǩ��*/
function printReportQZ(request){
	//alert(request.responseText);
	try{
		eval("var gridData = "+request.responseText+"");
		var printer = new ActiveXObject("JQezPrinter.JQezPrinterXCtrl");
		if(gridData.success){
			//printer.PreviewEx(gridData.rpt,gridData.tmp);
			printer.PrintEx(gridData.rpt,gridData.tmp);
		}
		else{
			alert(gridData.msg);
		}
	}
	catch(ex){
		alert(ex);
	}
}
/**
 ��ѯǩ����Ϣ
*/

function querySeal(linkname,config,row){
	    new Ajax.Request(
                    ROOT_PATH+"/common/printvoucher.do",
                    {method: 'post', parameters: "printid="+rptid+"&json="+Object.toJSON(rows), onComplete: printReportQZ}
                    );
}

/*
��ӡǩ��
*/
function printSeal() {
	
	try{	     
	     	//����ǩ�´�ӡ
	       //��ȡǩ����Ϣ 
	       //�����Ѹǵ�ӡ������   request

	 	//����ȫ��ǩ��
	    for (var j=0;j<sealList.length;j++) {
                	sealList[j]['sealBmp'] = document.all.DWebSignSeal.GetSealBmpString( sealList[j]['sealName']  ,'jpg');
			document.all.DWebSignSeal.ShowSeal(sealList[j]['sealName'],0);	
		}
	       
	       	
		//HWPostil �ؼ������ش�ӡ��
		document.all.HWPostil1.Login("HWSEALDEMO**", 4, 65535, "DEMO", "");
		document.all.HWPostil1.BeforeConvert("");     
     
	    	//������ӡģ��
	   	var ds = createDS() ;
	   			
	        printVoucherQZ(config['reportId'],ds);	         
	    
	   	document.all.HWPostil1.WaitConverting(5000);
		//������ӡ
	   	document.all.HWPostil1.AfterConvert();
		if(!document.all.HWPostil1.IsOpened()){
			alert("��ش�ӡ��ʧ��");
		}else{ 
			//��ӡ��ͼƬ���뵽��ӡ�ļ��� , ��i �� ��j ��ǩ��
			for(var i = 0;i<selectedRows.length;i++){
				for (var j=0;j<sealList.length;j++) {
					// i �ڼ���
		      			document.all.HWPostil1.InsertPicture("seal" ,"STRDATA:" + sealList[j]['sealBmp'],i,sealList[j]['lleft'],sealList[j]['ltop'],sealList[j]['lzoom']);
	      			}	      
	     		 }
	     	}	
		document.all.HWPostil1.ShowFullScreen = 1; 
	
	}catch(e){
		alert(e.name + ":" + e.message);
	}
	
}
/*
������ӡ����
*/
function createDS(){
	//������ӡģ��
    var ds = new Object();
    ds.DS1 = selectedRows;

    var details = new Array() ;    
    for(i = 0 ; i < selectedRows.length; i ++ ){
	details=details.concat(selectedRows[i].details);
    }
    ds.DS2 = details;    
    //ds.DS3 = ymd; 
    
    return ds ;
}

// ��ѯָ�긽����Ϣ
function show_files_Info() {
	
	
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
    	if(selectrows[0].billid==null||selectrows[0].billid==""){
    		alert("ȱ�����ã�����ϵϵͳ����Ա���������billid!");
    		return;
    	} else {	
    		subdata.billid = selectrows[0].billid;
    	}	
    }catch (e){
    	
    }
    var maindata=Object.toJSON(subdata);
    var url="/indi/filesinfo.do?billid="+selectrows[0].billid;
	var features = "top=150,left=50,width=750,height=500,scrollbars=yes,resizable=yes";
    window.open(url,"�������",features);
  
}
/*
*��ĳ��״̬�ĵ��ݽ��в���ʱ���Բ���������ʾ
*���ѡ������к��������wfstatus���򵯳�info��ͬʱ����false�����򷵻�true��
*���û��ѡ���򷵻�true
*@tmain��������
*@wfstatus������״̬  �����ʽ[00,01]
*@info  ��ʾ��Ϣ
checkCando(tmain,[00,01],"��������¼���������״̬������")
*/

function checkCando(tmain,wfstatus,info){
	
	var selectRows = tmain.getSelectedRow();
	if (selectRows.length < 1) {   
        return true;
    }
    for(var n=0;n<selectRows.length;n++){
    	if(chekcondition(wfstatus,selectRows[n].wfstatus)){    	
	    	alert(info);
	    	return false;
    	}    	
    }
    return true;
}

/*
��鹦�ܷ���
*/

function checkExpeconormic(){

	var selectRows = tmain.getSelectedRow();
	if (selectRows.length < 1) {   
        return true;
    }
    for(var n=0;n<selectRows.length;n++){
    	if(selectRows[n].expeconormic_isleaf=='0'){    	
	    	alert('�������溬��֧�����÷���û��ϸ����ĩ���ĵ���');
	    	return false;
    	}    	
    }
    return true;
}
function chekcondition(wfstatus,curwfstatus){
    for(var n=0;n<wfstatus.length;n++){
    	if(curwfstatus==wfstatus[n]){     	
	    	return true;
    	}
    }
    return false;
}
function hiddselect(flag){
	var selects = document.getElementsByTagName("SELECT");
	var formObj = document.getElementById("advancedQueryForm");
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
				obj.style.display='block';
			}
		}
	}
}
//����Ԥ�㵥λȡ��Ĭ���տ��˺�
function findBankByBdgagency(obj){
var	url = ROOT_PATH+"/voucher/common/getbankaccountByBdgagency/getbankaccountByBdgagency.do";
	    new Ajax.Request(
                    url,
                    {method: 'post', parameters: "bdgagency="+obj, onComplete: afterFindBank}
                    );
}
function afterFindBank(request){
	if(""==request.responseText){
		gatheringbankaccount_var = "";		
	    var selectRows = tdetail.getSelectedRow();
	    if(selectRows.length>0){
		    rowObj = selectRows[0];
	    }
		rowObj.gatheringbankaccount = "";  
		$('gatheringbankacctcode').value = "";
		$('gatheringbankacctname').value = "";
		$('gatheringbankname').value = "";	
	    return ;
	}
	eval("var result = "+request.responseText+"");	
  	if(result != null){	
		gatheringbankaccount_var = result.itemid
				gatheringbankaccount_var = result.itemid
	    var selectRows = tdetail.getSelectedRow();
	    if(selectRows.length>0){
		    rowObj = selectRows[0];
	    }
		rowObj.gatheringbankaccount = result.itemid;  
		$('gatheringbankacctcode').value = result.code;
		$('gatheringbankacctname').value = result.name;
		$('gatheringbankname').value = result.agentbankname;		
	}
	datasynch(this);
}
//����Ԥ�㵥λȡ��Ĭ���տ��˺�   ʵ��
function findBankByBdgagencyForRealpay(obj){
var	url = ROOT_PATH+"/voucher/realpay/getbankaccountByBdgagency/getbankaccountByBdgagencyForRealpay.do";
	    new Ajax.Request(
                    url,
                    {method: 'post',asynchronous: false, parameters: "bdgagency="+obj, onComplete: afterFindBank}
                    );
}

function printM(printConfig,linkName,ymd){
	  config = getReportid(printConfig) ;
	  if (config=='') return ;
	
      var row = selectedRows[0];
      var printArr = new Array();
      //���˲����������ı���
      for(var i = 0 ; i < printConfig.length ; i++){
		   if(eval(printConfig[i]['condition'])){
			 	 printArr.push(printConfig[i]);
			}
	  }
	  //�ж��Ƿ���Ҫ��������ѡ���
	  if(printArr.length>1){
	         var url = '/indipay/common/findmodel.do?printArr='+Object.toJSON(printArr);
		     var chooseStr = window.showModalDialog(url,window,'dialogHeight:200px;dialogWidth:500px;toolbar=no;menubar=no;scrollbars=no;resizable=no;location=no; status=no');
		     if(chooseStr=="exit"||typeof(chooseStr)=="undefined") return;
		     config = getConfig(printArr,chooseStr);
	  }else{
	  	     config = printArr[0];
	  }
	  //����config���ж�:lt������߾��䣬��ǩ�»��߲���ǩ��
	  var billid = createDS_billid() ;
	  sealList = config['sealList'] ;
	  if(config.engine=='2'){
	  		Ext.lt.ifmis.activex.loadLTReportOcx();
	  		if (sealList.length>0) {
	  			querySealListForBilldsLT();
	   		}else{
		  		var ltprintConf = new Array();
				ltprintConf.jrid=billid;
				ltprintConf.printid=config['reportId'];	   			
				ltViewReport(ltprintConf);
			}
	   }else{
	   		Ext.lt.ifmis.activex.loadJQReportOcx();
	   		if (sealList.length>0) {
	     		 querySealListForBillds();
	   		}else{
				printVoucherBillidIndiPay(config['reportId'],billid);
	  		}
	   }
}

function getConfig(printArr,chooseStr){
	 for(var i = 0 ; i < printArr.length ; i++){
	   var tempStr = printArr[i].reportId+printArr[i].engine;
	   if(tempStr==chooseStr){
		  return printArr[i];
	   }
	 }
}
	
function printRById(printConfig,linkName,reportId){
    config = getReportidForPrintRById(printConfig,reportId) ;   
    ros='ds';
    rptid = reportId;
    if (config=='') return ;
    sealList = config['sealList'] ;
    var billid = createDS_billid() ;	
	if(config.engine=='2'){
			Ext.lt.ifmis.activex.loadLTReportOcx();
			if (sealList.length>0) {
				querySealListForBilldsLT();
	 		}else{
		 		var ltprintConf = new Array();
				ltprintConf.jrid=billid;
				ltprintConf.printid=reportId;	   			
				ltViewReport(ltprintConf);
			}
	 }else{
	 		Ext.lt.ifmis.activex.loadJQReportOcx();
	 		if (sealList.length>0) {
	   			querySealListForBillds();
	 		}else{
				printVoucherBillidIndiPay(reportId,billid);
			}
	 }    	
    	
    /**	
    if (sealList.length>0) {
	    var selectedbillids=createDS_billid() ;
		     new Ajax.Request(
		                    ROOT_PATH+"/common/getSealListByRptId.do",
		                    {method: 'post',
		                     parameters: "linkname="+linkName+"&rptid="+reportId+"&selectedbillids="+selectedbillids,
		                     onComplete: aftergetDataFromAction}
		                    );
    }else{
	   	var billid = createDS_billid() ;
		printVoucherBillidIndiPay(reportId,billid);
    }
    **/
}

function getReportidForPrintRById(printConfig,reportId){
    
    if (tmain!=null || tmain!=undefined) {
    	selectedRows = tmain.getSelectedRow();
    }
    if(selectedRows == null || selectedRows.length < 1){
	  alert("��ѡ��Ҫ��ӡ�ĵ���");
	  return "";
     } 
    if (printConfig == undefined || printConfig =='null' || printConfig ==null || printConfig.length <1) {
    	alert("û�ж����ӡģ�壬����ϵ����Ա��") ;
    	return "" ;
    }
    var  row ;
    var  config  ;
    for(var i = 0 ; i < printConfig.length ; i++){
	     if(reportId == printConfig[i]['reportId']){
			config = printConfig[i] ;
			break ;
	     }
    }
    if (config == undefined || config =='null' || config.length <1) {
    	alert("û�з��ϴ�ӡ������ģ�壬����ϵ����Ա��") ;
    	return "" ;
    }
    return config;
}
/*
������ӡ����
*/
function createDS_billid(){
	//������ӡģ��
	//����

    var billid = "" ;    
    for(i = 0 ; i < selectedRows.length; i++ ){
		billid+=selectedRows[i].billid+",";
    }
    billid=billid.substring(0,billid.lastIndexOf(','));    
    return billid ;
}

//20091209
// ��ӡƾ֤  rptid ��ƾ֤��ӡģ�壬billid�Ǵ�ӡ�Ĳ��� 
function printVoucherBillid(rptid, billid){

	Ext.lt.ifmis.activex.loadJQReportOcx();
    new Ajax.Request(
                    ROOT_PATH+"/common/printvoucherbillid.do",
                    {method: 'post', parameters: "printid="+rptid+"&billid="+billid, onComplete: printComplete,asynchronous:false}
                    );
}

function printComplete(request){
	try{
		eval("var gridData = "+request.responseText+"");
		var printer = new ActiveXObject("JQezPrinter.JQezPrinterXCtrl");
		if(gridData.success){
			//�������ǩ�£�����ú�̨��ӡ���������ǰ̨��ӡ
			if(sealList.length>0){
				printer.PrintEx(gridData.rpt,gridData.tmp);
			}else{
			    printer.PreviewEx(gridData.rpt,gridData.tmp);
			}
		}
		else{
			alert(gridData.msg);
		}
	}
	catch(ex){
		alert(ex);
	}
}
  var currsels="";
  
  
  // �������б�
function selectClerk(agency,text6input,text7input){
	var refererurl = ""+window.location.href;
	var url = ROOT_PATH+"/common/getClerk.do?agency="+agency+"&Referer="+refererurl.substring(0,refererurl.indexOf("?"));
	var result = window.showModalDialog(url,agency,'dialogWidth:600px;dialogHeight:450px;status:no;resizable:no;help:No;');
	//var result = window.open(url, 'newWindow','dialogWidth=600px,dialogHeight=450px,status=yes,toolbar=no,menubar=no,directories=no,resizable=no,Scrollbars=no');
	if(result != null && result.clerkname!=null){
		text6input.value = result.clerkname;
		text7input.value = result.clerktel;
	
	}
}

/**
 * ��ȡ��ǰ�û������˺���ϵ�绰Ĭ��ֵ add 20130111
 * @returns
 */
function  getDefClerkForUser(){
	var url = ROOT_PATH+'/common/getDefClerkForUser.do?random='+Math.random();
	var pars ="";
	var myAjax = new Ajax.Request(url,
					   	{
						   	 method: 'post',
						   	 parameters: pars,
						   	 onComplete : afterDefClerkForUser,
							 onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
							 	//alert("����ʧ�ܣ�");  ʧ�ܲ�������
							 }
							 //asynchronous:false  //ȡ��ͬ��
						} 
		  				);
}

function afterDefClerkForUser(resp){
	var json = resp.responseText;
    var myobj=eval(json);  
    if(json!="" && myobj != null){
    	if($('text6')&&$('text7')){
			if( ($('text6').value == null ||$('text6').value =="")  &&  ($('text7').value ==null || $('text7').value =="")){
				$('text6').value = myobj[0].CLERKNAME;
				$('text7').value = myobj[0].CLERKTEL;
			}
		}
    }
}

/*
���Ԥ�㵥λ
*/

function checkBdgAgency(){
	var selectRows = tmain.getSelectedRow();
	if (selectRows.length < 2) {   
        return true;
    }   
    var ary = new Array();      
    for(var n=0;n<selectRows.length;n++)ary[n]=selectRows[n].bdgagency;    
    var nary=ary.sort();
    for(var m=0;m<nary.length-1;m++){      
    	if(nary[m] != nary[m+1]){
    		alert('�������溬�в�ͬԤ�㵥λ�ĵ���');
    		return false;
    	}
    }
    return true;
}
/*
��鲿��
*/

function checkDepartment(){
	var selectRows = tmain.getSelectedRow();
	if (selectRows.length < 2) {   
        return true;
    }
    var ary = new Array();    
    for(var n=0;n<selectRows.length;n++)ary[n]=selectRows[n].bdgagency_code.substring(0,3);
    var nary=ary.sort();
    for(var m=0;m<nary.length-1;m++){    
    	if(nary[m] != nary[m+1]){
    		alert('�������溬�в�ͬ���ŵĵ���');
    		return false;
    	}
    }
    return true;
}
/*
���ǩ��
*/
var checkSignFlag = true;
function  checkSign(obj){

	    checkSignFlag = true;
		var billids = "" ;
		var vchtypeids = "" ;
		var selectrows = obj.getSelectedRow();
		var selectrowsSize = selectrows.length;
		if ( selectrowsSize > 0){
		   		billids = selectrows[0].billid ;
		   		vchtypeids = selectrows[0].vchtypeid;
				for(var i = 1 ; i< selectrowsSize;i++){
					billids = billids + "," + selectrows[i].billid  ;
					vchtypeids = vchtypeids + "," + selectrows[i].vchtypeid  ;
				}
		 }else{
		 	alert("��ѡ��Ҫ�����ļ�¼��");
		 	return false;
		 }
		
		var url = ROOT_PATH+'/system/signaturecheck/manage/checkSign.do?random='+Math.random();
		var pars = 'billids='+billids+'&vchtypeids='+vchtypeids;
		var myAjax = new Ajax.Request(url,
					   	{
						   	 method: 'post',
						   	 parameters: pars,
						   	 onComplete : afterCheck,
							 onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
							 	alert("����ʧ�ܣ�");
							 },
							 asynchronous:false
						} 
		  				);
		if(checkSignFlag){
			return true;
		}else{
			return false;
		}
}

function  afterCheck(resp){
 var json = resp.responseText.evalJSON(true);
  if(json.statuCode!=null && json.statuCode==100 && json.warnmsg !=null && json.warnmsg!=""){
 	     checkSignFlag = false;
 	     alert(json.warnmsg);
   } 
}

/*
 * ���ǩ��
 */
var checkSelSignFlag = true;
function  checkSelSign(obj){
	checkSelSignFlag = true;
	var billids = "" ;
	var vchtypeids = "" ;
	var selectrows = obj.getSelectedRow();
	if ( selectrows.length > 0){
		billids = obj.getSelectedRow()[0].billid ;
		vchtypeids = obj.getSelectedRow()[0].vchtypeid;
		for(var i = 1 ; i< obj.getSelectedRow().length;i++){
			billids = billids + "," + obj.getSelectedRow()[i].billid  ;
			vchtypeids = vchtypeids + "," + obj.getSelectedRow()[i].vchtypeid  ;
		}
	}else{
		alert("��ѡ��Ҫ�����ļ�¼��");
		return false;
	}
	var url = ROOT_PATH+'/system/signaturecheck/manage/checkSelSign.do?random='+Math.random();
	var pars = 'billids='+billids+'&vchtypeids='+vchtypeids;
	var myAjax = new Ajax.Request(url,
					   	{
						   	 method: 'post',
						   	 parameters: pars,
						   	 onComplete : afterSelCheck,
							 onFailure : function(resp) {
							 	alert("����ʧ�ܣ�");
							 },
							 asynchronous:false
						});
	if(checkSelSignFlag){
		return true;
	}else{
		return false;
	}
}

function afterSelCheck(resp){
	var json = resp.responseText.evalJSON(true);
  	if(json.statuCode!=null && json.statuCode==100 && json.warnmsg !=null && json.warnmsg!=""){
 		checkSelSignFlag = false;
 	    alert(json.warnmsg);
 	    return;
   	} 
   	if (json.vous != null) {
   		var apps = json.vous;
   		var selectrows =  tmain.getSelectedRow();
   		for(var i= 0; i<apps.size();i++) {
   			for(var j=0;j<selectrows.length;j++){
   				if(apps[i].billid==selectrows[j].billid){
   					var DSign_Result = apps[i].selSigndata;
		   		 	if (DSign_Result != "") {
		   		 		var DSign_Source = selectrows[j].billcode+","+selectrows[j].createtime
			     					+","+selectrows[j].gatheringbankacctcode+","+selectrows[j].amt;
		   		 		var Check_Result = document.all.JITDSignOcx.verifyDetachedSignStr(DSign_Result, DSign_Source);
		   		 		if(document.all.JITDSignOcx.GetErrorCode()!=0){
							alert("���ݣ���"+selectrows[j].billcode+"�����۸��ˣ�");
							checkSelSignFlag = false;
							return;
					 	}
		   		 	}
   					break;
   				}
   			}
   		}
   	}
}

// ִ�����
function showIndiExecInfo(rownum,tableid) {
    var row = eval(tableid+".data[rownum]");
    var tableobj = eval(tableid);
    try{
    	if(row.billid==null||row.billid==""){
    		alert("ȱ�����ã�����ϵϵͳ����Ա���������billid!");
    		return;
    	}
    	if(row.vchtypeid==null||row.vchtypeid==""){
    		alert("ȱ�����ã�����ϵϵͳ����Ա���������vchtypeid!");
    		return;
    	}
    	if(row.wfstatus!=null&&row.wfstatus=="101"){
    		alert("���ϵ�����ִ�����");
    		return;
    	}
    }catch (e){
    	
    }
    var url="/common/indiexecinfo.do?billid="+row.billid+"&vchtypeid="+row.vchtypeid+"&submenu="+getArgs()["submenu"]+"&mainmenu="+getArgs()["mainmenu"]+"&tabletype="+tableobj.tabletype;
	var features = "top=150,left=50,width=750,height=450,scrollbars=yes,resizable=yes";
	var data = new Array();
	data[data.length] = tableid;
	data[data.length] = Object.toJSON(row);
    openPostWindow(url,data,"ִ�����",features);
}
//JS��ȡURL����
function getArgs() {
    var args = new Object( );
    var query = location.search.substring(1);    
    var pairs = query.split("&");                
    for(var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('=');        
        if (pos == -1) continue;                 
        var argname = pairs[i].substring(0,pos);  
        var value = pairs[i].substring(pos+1);  
        value = decodeURIComponent(value);       
        args[argname] = value;                   
    }
    return args;                                 
} 

//window.open ʹ��post��ʽ����
function openPostWindow(url, data, name,features)  
{  
     var tempForm = document.createElement("form");  
     tempForm.id="tempForm1";  
     tempForm.method="post";  
     tempForm.action=url;  
     tempForm.target=name;  
     
     if(typeof data =="array"||typeof data =="object"){
     	for(var i =0;i<data.length;i++){
     		var hideInput = document.createElement("input");  
		     hideInput.type="hidden";  
		     hideInput.name= "content"+i;
		     hideInput.value= data[i];
		     tempForm.appendChild(hideInput);   
     	}
     } else {
	     var hideInput = document.createElement("input");  
	     hideInput.type="hidden";  
	     hideInput.name= "content"
	     hideInput.value= data;
	     tempForm.appendChild(hideInput);
	 }
     tempForm.attachEvent("onsubmit",function(){ 
     		var aa = window.open('about:blank',name,features);
     			});
     document.body.appendChild(tempForm);  
     tempForm.fireEvent("onsubmit");
     tempForm.submit();
     document.body.removeChild(tempForm);
}

//���ӵ������ӱ�,������ǰ�������ӵ�������Ϣ
//jjy20100510
function exportexcel3(tmain,tdetail){  
	    var oXL = new ActiveXObject("Excel.Application");
	    //����AX����excel
	    var oWB = oXL.Workbooks.Add();
	    //��ȡworkbook����
	    var oSheet = oWB.ActiveSheet;
	    oSheet.Columns.AutoFit;//����������Ӧ���
	    //�ֶδ���
	    var detailline = 0;
	    for(var x= 0;x<2;x++){
	        if(x==1){
	        	tmain = tdetail;
	        	oSheet.Cells(detailline+1, 1).value = "�ӵ���Ϣ";
	        	oSheet.Rows(detailline+1).Interior.ColorIndex=23;
	        	detailline++;
	        } else {
	        	oSheet.Cells(detailline+1, 1).value = "������Ϣ";
	        	oSheet.Rows(detailline+1).Interior.ColorIndex=23;
	        	detailline++;
	        }
		    var columns = new Array();
		    var ids = new Array();	   
		     
		    var cols = tmain.columnConfig;
		    var collen = cols.length;	   
		    var bit = 0;
		    var odate = new Date();
		    var start = odate.getMilliseconds() + odate.getSeconds() * 1000;
		    for (var i = 0;i<collen;i++){
		       if(cols[i].id == "noFind"){
		          alert("�ֶ����ô�����˲飡");
		          return;
		       }
		       if(cols[i].id != "serial" && cols[i].id != "checkbox" && cols[i].id != "radio"){
		           bit++;
		  	           ids[bit-1] = cols[i].id;	           
		    	       //�����ͷ
		    	    if(cols[i].type=="M"){	   
		    	       oSheet.Cells(detailline+1, bit).value = cols[i].title;
		       			oSheet.Columns(bit).NumberFormatLocal="0.00";//ȫ���ַ���   
			 		}else{	  
			       		oSheet.Cells(detailline+1, bit).value = cols[i].title;      
			       		oSheet.Columns(bit).NumberFormatLocal="@";//ȫ���ַ���    
			      }    	           
		       }
		
		    }
		   odate = new Date();
		   var end = odate.getMilliseconds() + odate.getSeconds() * 1000;
		   window.status=(end - start)+"ms";
		   oSheet.Rows(detailline+1).Interior.ColorIndex = 37;  
		   oSheet.Rows(detailline+1).RowHeight = 17;  
		   oSheet.Rows(detailline+1).Font.Name="MS Sans Serif";  
	       oSheet.Rows(detailline+1).Font.Size=9;     
	       oSheet.Rows(detailline+1).Font.bold=true;  
		      
		    var rows ; 	    
		    var collength = ids.length;
		    var dataname = null;
		    var datacode = null;
		    var datashow = null;	    
		    var fname = "";
		   	rows = tmain.data; 	    
		   	var datalen = rows.length;	   
		   	for(var j = 0;j<datalen;j++){
		   	     var rowX = detailline + j+2;
				  for(var k = 0;k<collength;k++){
			          dataname = ids[k]+"_name";
			          datacode = ids[k]+"_code";
			          if(rows[j][dataname] == null || rows[j][datacode] == null){				          
			          	if(ids[k]=='lastupdatetime'){//lastupdatetime   ʱ������⴦��
				          	var optiondate = new Date(parseInt(rows[j][ids[k]],10));		
							var clock = optiondate.getHours()+':'; 
						    if (optiondate.getMinutes() < 10) 
						    	clock += '0'; 
					    	clock += optiondate.getMinutes()+':'; 
						    if (optiondate.getSeconds() < 10) 
						    	clock += '0'; 
					    	clock += optiondate.getSeconds(); 
					
							datashow = optiondate.getYear()+"-" + (optiondate.getMonth() + 1) + "-"+optiondate.getDate() 
								+ " " + clock;	
			          	}else{
			          		 datashow = rows[j][ids[k]];
			          	}		            
			          }else{ 
			             datashow = rows[j][datacode]+"-"+rows[j][dataname];
			          }	
			          
			        		         
			         oSheet.Cells(rowX, k + 1).value = datashow;	          
		        }
		       oSheet.Rows(rowX).RowHeight = 12.75; 
		       oSheet.Rows(rowX).Font.Size=9;          	      
		       oSheet.Rows(rowX).Font.Name="MS Sans Serif";  
		   	}
		   	detailline = Number(datalen)+3;
		}
    	odate = new Date();
	   	start = odate.getMilliseconds() + odate.getSeconds() * 1000;
	   	window.status +="|"+(start - end)+"ms";
        fname = oXL.Application.GetSaveAsFilename("*.xls", "Excel Spreadsheets (*.xls), *.xls");   
		if (fname!=""){     	
	     		 oWB.SaveAs(fname);
	     		 alert("������ϣ�"); 
     	}
	    oXL.Visible = false;
	    oWB.Close(); 
        return;
}
//�Զ�����
col = createColumnConfig();
col.id = "indiexec";
col.name = "indiexec";
col.type = "L";
col.title = "ִ�����";
col.show = function(rownum,value,row,tdobj,datatable){
	tdobj.innerHTML = "<div ALIGN='center'><img src='"+ROOT_PATH+"/images/actions/indiexec.gif' alt='��ѯ' onclick='showIndiExecInfo(" + rownum +",\"" +datatable.id+"\");' /></div>";
}
ColumnConfig[col.id.toLowerCase()]=col;

//�Զ�����
col = createColumnConfig();
col.id = "incomeinfo";
col.name = "incomeinfo";
col.type = "L";
col.title = "��֧���";
col.show = function(rownum,value,row,tdobj,datatable){
	tdobj.innerHTML = "<div ALIGN='center'><img src='"+ROOT_PATH+"/images/actions/indiexec.gif' alt='��ѯ' onclick='showIncomeInfo(" + rownum +",\"" +datatable.id+"\");' /></div>";
}
ColumnConfig[col.id.toLowerCase()]=col;

// ��֧���
function showIncomeInfo(rownum,tableid) {
    var row = eval(tableid+".data[rownum]");
    try{
    	if(row.element27==null||row.element27==""||row.element27=="0"||row.element27_code=="0"){
    		alert("���ն�֧���Ʊ�־Ϊ�ջ������ն�֧���ݣ���û����������ϵ����Ա");
    		return;
    	} else {
    		if(row.element27_code == "01"){
    			if(row.bdgagency==null||row.bdgagency==""||row.bdgagency=="0"){
		    		alert("��λ����Ϊ�գ���û����������ϵ����Ա");
		    		return;
		    	} 
    		} else if(row.element27_code == "02"){
    			if(row.bdgagency==null||row.bdgagency==""||row.bdgagency=="0"||
    				row.expfunc==null||row.expfunc==""||row.expfunc=="0"){
		    		alert("��λ���ܷ��಻��Ϊ�գ���û����������ϵ����Ա");
		    		return;
		    	} 
    		} else if(row.element27_code == "03"){
    			alert("�ݲ����������"+element27_code+"-"+element27_name);
    			return;
    		} else if(row.element27_code == "04"){
    			if(row.program==null||row.program==""||row.program=="0"){
		    		alert("��Ŀ����Ϊ�գ���û����������ϵ����Ա");
		    		return;
		    	} 
    		} else if(row.element27_code == "05"){
    			
    		} else if(row.element27_code == "06"){
    			if(row.expfunc==null||row.expfunc==""||row.expfunc=="0"){
		    		alert("���ܷ��಻�ܲ���Ϊ�գ���û����������ϵ����Ա");
		    		return;
		    	} 
    		}     	
    	}
    }catch (e){
    	
    }
    var url="/common/showincomeinfo.do?submenu="+getArgs()["submenu"]+"&mainmenu="+getArgs()["mainmenu"];
	var features = "top=150,left=50,width=750,height=400,scrollbars=yes,resizable=yes";
	var vchcode = eval(tableid+".vchtypecode") +"";
	var ctrlsys=1;
	//1��֧����1���ƻ���2��ָ��
	if(vchcode.indexOf("1")==0){
		ctrlsys = 2;
	} else if(vchcode.indexOf("2")==0){
		ctrlsys = 1;
	} else if(vchcode.indexOf("3")==0){
		ctrlsys = 0;
	} 
	var data = new Array();
	data[data.length] = tableid;
	data[data.length] = Object.toJSON(row);
	data[data.length] = ctrlsys;
    openPostWindow(url,data,"��֧���",features);
}
/*ǰ�ü����ն�֧�ӿ�*/
function checkincometag(datalist,tableid,ctrlsys){
	if(tableid==null||tableid==""){
		alert("���ü�����ն�֧��֧�������������[�б�ID]������ϵϵͳ����Ա");
		return;
	}
	if(ctrlsys==null||ctrlsys==""){
		alert("���ü�����ն�֧��֧�������������ۿ��ƻ��ڣݣ�����ϵϵͳ����Ա");
		return;
	}
	if(!befercheckincome(datalist)){
		return;
	}
	var url = ROOT_PATH + '/common/checkincomeinfo.do';	
	var pars = 'maindata=' + datalist.toJSON() + '&ctrlsys=' + ctrlsys+"&mainmenu="+getArgs()["mainmenu"]+"&submenu="+getArgs()["submenu"];;
	window.oriincomedatalist = datalist;
	var myAjax = new Ajax.Request(url,{method: 'post', parameters: pars,onComplete: function (resp){ aftercheckincome(resp,datalist,tableid);}});
}

/**
* ������У��
*/
function befercheckincome(datalist){
    var flag = false;
    var reflag = false;
    var errorObj = new Array();
    var errormsg ="";
    if(datalist.length<1){
    	reflag = true;
	    flag = true;
    }
	for(var a=0;a<datalist.length;a++){
		var row = datalist[a];
		row.billids=a;
		try{
			if(row.expbyincflag==null||row.expbyincflag==""||row.expbyincflag=="0"||row.expbyincflag_code=="0"){
	    		//alert("���ն�֧�������Ͳ���Ϊ�գ���û����������ϵ����Ա");
	    		//return;
	    		if(errorObj["expbyincflag"]==null){
	    			errorObj["expbyincflag"] = "���ն�֧��־����Ϊ��";
	    			errormsg += "���ն�֧��־����Ϊ��\n";
	    		}
	    		reflag = true;
	    		flag = true;
	    	}
	    	if(row.element27==null||row.element27==""||row.element27=="0"){
	    		if(errorObj["element27"]==null){
	    			errorObj["element27"] = "���ն�֧�������Ͳ���Ϊ��";
	    			errormsg = "���ն�֧�������Ͳ���Ϊ��\n";
	    		}
	    		flag = true;
	    	} else {
	    		if(row.element27_code == "01"){
	    			if(row.bdgagency==null||row.bdgagency==""||row.bdgagency=="0"){
			    		//alert("��λ����Ϊ�գ���û����������ϵ����Ա");
			    		//return;
			    		if(errorObj["bdgagency"]==null){
			    			errorObj["bdgagency"] = "��λ����Ϊ��";
			    			errormsg += "��λ����Ϊ��\n";
			    		}
			    		flag = true;
			    	} 
	    		} else if(row.element27_code == "02"){
	    			if(row.bdgagency==null||row.bdgagency==""||row.bdgagency=="0"||
	    				row.expfunc==null||row.expfunc==""||row.expfunc=="0"){
			    		//alert("��λ���ܷ��಻��Ϊ�գ���û����������ϵ����Ա");
			    		//return;
			    		if(errorObj["bdgagency"]==null&&(row.bdgagency==null||row.bdgagency==""||row.bdgagency=="0")){
			    			errorObj["bdgagency"] = "��λ����Ϊ��";
			    			errormsg += "��λ����Ϊ��\n";
			    		}
			    		if(errorObj["expfunc"]==null&&(row.expfunc==null||row.expfunc==""||row.expfunc=="0")){
			    			errorObj["expfunc"] = "���ܷ��಻��Ϊ��";
			    			errormsg += "���ܷ��಻��Ϊ��\n";
			    		}
			    		flag = true;
			    	} 
	    		} else if(row.element27_code == "03"){
	    			//alert("�ݲ����������"+element27_code+"-"+element27_name);
	    			//return;
	    		} else if(row.element27_code == "04"){
	    			if(row.program==null||row.program==""||row.program=="0"){
			    		//alert("��Ŀ����Ϊ�գ���û����������ϵ����Ա");
			    		//return;
			    		if(errorObj["program"]==null){
			    			errorObj["program"] = "��Ŀ����Ϊ��";
			    			errormsg += "��Ŀ����Ϊ��\n";
			    		}
			    		flag = true;
			    	} 
	    		} else if(row.element27_code == "05"){
	    			
	    		} else if(row.element27_code == "06"){
	    			if(row.expfunc==null||row.expfunc==""||row.expfunc=="0"){
			    		//alert("���ܷ��಻�ܲ���Ϊ�գ���û����������ϵ����Ա");
			    		//return;
			    		if(errorObj["expfunc"]==null){
			    			errorObj["expfunc"] = "���ܷ��಻��Ϊ��";
			    			errormsg += "���ܷ��಻��Ϊ��\n";
			    		}
			    		flag = true;
			    	} 
	    		}     	
	    	}
	    }catch (e){
	    	
	    }
	}
	if(flag&&!reflag){
    	alert("������ն�֧�����ȱ�ٱ�Ҫ��Ϣ�����顣\n"+errormsg);
    	return false;
    } else if(flag&&reflag){
    	if(typeof contisubmit=="function"){
			contisubmit();
		}
    	return false;
    }
    return true;
}
/**
*AJAX�����ص�����
*/
function aftercheckincome(resp,datalist,tableid){
	var json ;
    try {
		 json = eval(resp.responseText);
	}catch(e){
		alert("����δ֪�쳣��"+Object.toJSON(e));
		return;
	}
	var warningList = new Array();
	var errorList = new Array();
	var passList = new Array();
	for(var a =0;a<json.length;a++){
		var data= json[a];
		if(data.showinfo=="warn"){
			for(var b=0;data.details!=null&&b<data.details.length;b++){
			    var rowobj = datalist[data.details[b].billids];
			    rowobj.incomeamt = data.incomeamt;
			    rowobj.payamt = data.payamt;
			    rowobj.curbalamt = data.curbalamt;
			    rowobj.controltype = data.controltype;
			    rowobj.inaccttypecode = data.inaccttypecode;
			    rowobj.inaccttypename = data.inaccttypename;
			    rowobj.checkinfo = data.showinfo;
			    rowobj.checked = false;
				warningList[warningList.length] = rowobj;			
			}
		} else if(data.showinfo=="error"){
			for(var b=0;data.details!=null&&b<data.details.length;b++){
				var rowobj = datalist[data.details[b].billids];
			    rowobj.checked = false;
			    rowobj.incomeamt = data.incomeamt;
			    rowobj.payamt = data.payamt;
			    rowobj.curbalamt = data.curbalamt;
			    rowobj.controltype = data.controltype;
			    rowobj.inaccttypecode = data.inaccttypecode;
			    rowobj.inaccttypename = data.inaccttypename;
			    rowobj.checkinfo = data.showinfo;
				errorList[errorList.length] = rowobj;			
			}
		} else if(data.showinfo=="pass"){
			for(var b=0;data.details!=null&&b<data.details.length;b++){
				var rowobj = datalist[data.details[b].billids];
			    rowobj.checked = false;
			    rowobj.incomeamt = data.incomeamt;
			    rowobj.payamt = data.payamt;
			    rowobj.curbalamt = data.curbalamt;
			    rowobj.controltype = data.controltype;
			    rowobj.inaccttypecode = data.inaccttypecode;
			    rowobj.inaccttypename = data.inaccttypename;
			    rowobj.checkinfo = data.showinfo;
				passList[passList.length] = rowobj;		
			}
		}
	}
	window.warningList = warningList;
	window.errorList = errorList;
	window.passList = passList;
	showtable("content0="+tableid);
	
}
function showtable(param){
	 url = ROOT_PATH+'/indi2exe/common/incomeerrorinfo.jsp';
	 if(param!=null){
	 	url +='?'+param;
	 }
	 var a = window.showModalDialog(url, window,'dialogWidth=700px;dialogHeight=450px;status: No;help:No;');
	 return a;
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
    if (selectedRow[0].wfid == 0){
      alert("���˵����ݲ�֧�ֲ�ѯ��Դȥ��");
      return false;
    }
    var billid = selectedRow[0].billid;
    var url = ROOT_PATH+"/commons/srcandtragetvouinfo.do?";
    url = url + "&billid="+billid + "&wfid="+selectedRow[0].wfid;
    url = url + "&tableName="+tableName;
    url = url +"&submenu="+getparam("submenu");
	var features = "top=150,left=50,width=750,height=521,scrollbars=yes,,resizable=yes,status=yes";
    window.open(url, "��Դȥ��", features);
}

//�ӵ���Դȥ��
function show_source_target_tdetailInfo(tableName){
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
    url = url +"&submenu="+getparam("submenu");
    url = url +"&showType=tdetail";
	var features = "top=150,left=50,width=750,height=521,scrollbars=yes,,resizable=yes,status=yes";
    window.open(url, "��Դȥ��", features);
}

/**
*
*����ajax���͵Ĳ�ѯ�������ֵ�ʱ��װsql��䣬���������form
*/
function getTagCondition(myQueryform){
	if(document.getElementById("advancedQueryForm")!=null&&document.getElementById("advancedQueryForm").advancedQuery.value=='advancedQuery'){
		return getAdQueryCondition();
	}
       var i,queryString = "", and = "";
       var item;  
       var itemValue;
       for( i=0;i<myQueryform.length;i++ ){
              item = myQueryform[i]; 
               if(item.name=='rows'){
               		continue;
               }
               if ( item.name!='' ) {                   
                     if ( item.type == 'select-one' ) {
                            itemValue = item.options[item.selectedIndex].value;
                     }
                     else if ( item.type=='checkbox' || item.type=='radio'){
                            if ( item.checked == false )
                            {
                                   continue;    
                            }
                            itemValue = item.value; }
                     else if ( item.type == 'button' || item.type == 'submit' || item.type == 'reset' || item.type == 'image'){
                            continue;
                     }
 
                     else{                     
                         
                            if(item.value==null||item.value==""){
                            	itemValue = "";
                            }else{      
                            	if(typeof(item.valueid)=="undefined"){
									itemValue = item.value;
                            	}else{
                            		itemValue = item.valueid;
                            	}        
                            	
                            
                            }
                     } 
                     	queryString += and + item.name + '=' + itemValue;
                     		and="&";
              }
       }
   	var formObj = document.getElementById("advancedQueryForm");
  	if(formObj!=null && formObj.advancedQuery.value=='advancedQuery'){
  		 return getAdQueryCondition();
   
	   }else{
	   	 return queryString+"&"+getPageInfo(myQueryform);
	   }
      
  }
  
  function getAdQueryCondition(){
  	var sqlstring ="";
  	var formObj = document.getElementById("advancedQueryForm");
  	if(formObj.advancedQuery.value=='advancedQuery'){
		sqlstring="advancedQuerySql="+encodeURIComponent(biulsql());
		sqlstring +="&ad_rows="+ formObj.ad_rows.value;
		sqlstring +="&ad_currpage="+ formObj.ad_currpage.value;
		sqlstring +="&ad_allflag=0";
		sqlstring +="&advancedQuery="+ formObj.advancedQuery.value;
		sqlstring +="&ad_totalpages="+ formObj.ad_totalpages.value;
		sqlstring +="&ad_totalrows="+ formObj.ad_totalrows.value;
  	}
  	return sqlstring; 
  }
  /*
  *
  *���ύajax֮ǰ��һЩ����
  */
  function initTabOnclickBeforQuery(tmain){
  	setIndexForQueyForm();
	
  	//������ӵ����Ͱ��ӵ������
  	try{
  	     document.getElementById("edit_table").style.display = 'none';
	     document.getElementById("tmain_div").style.display = 'block';//��д��
         tdetail.data=null;
         //var a = tdetail__table;
  		tdetail.draw();
  	}catch(e){
  	  
  	}

  }

  
  function initPage(tmain){
    
  	 var json = new Object();
  	//json.allflag = tmain.allflag;
  	if(tmain.allflag)json.allflag=0;
	json.currpage = 1;
	json.rows = tmain.page_pageSize ;
	json.totalpages = tmain.page_pageCount;
	json.totalrows = tmain.page_totalRecord ;
	setIndexForQueyForm();
	//document.getElementById("tabpageidex_hidden").value=tabpage_main.currentSelectedTabIndex;
	//if(document.getElementById("page")!=null)document.getElementById("page").value=1;
  	setTabPage(tmain,json);
  }
function setTabPage(tmain,json){

	//�Ƿ�����һҳ
	var hasPreviousPage = json.currpage!=1?(json.totalpages > 1):false;
	// �Ƿ�����һҳ
	var hasNextPage = (json.currpage < json.totalpages);
	// ��һҳ
	var previousPage = json.currpage>1?json.currpage - 1:1;
	// ��һҳ
	var nextPage = json.currpage + 1;
	tmain.allflag = (json.allflag==0);
	tmain.page_page = json.currpage;
	tmain.page_pageSize = json.rows;
	tmain.page_pageCount = json.totalpages;
	tmain.page_totalRecord = json.totalrows;
	if ("function" == typeof(tabPageClick))
		tmain.page_postUrl=tabPageClick;
	tmain.page_hasPreviousPage =  hasPreviousPage;
	tmain.page_hasNextPage =  hasNextPage;
	tmain.page_previousPage = previousPage;
	tmain.page_nextPage = nextPage;
	//���ò�ѯ�����й�����Щpage������
	//setIndexForQueyForm();
	var thePage = 0;
	if(tmain.allflag){
	if(document.getElementById("page").value==0)document.getElementById("page").value=1;
		thePage = document.getElementById("page").value;
		 if(document.getElementById("advancedQueryForm")!=null&&document.getElementById("advancedQueryForm").advancedQuery!=null
			        	&&document.getElementById("advancedQueryForm").advancedQuery.value=="advancedQuery"){
				$('advancedQueryForm').queryconhtml.value=document.getElementById("ttt").innerHTML;
				var sql = biulsql();	
				$('advancedQueryForm').advancedQuerySql.value=sql;
				$('advancedQueryForm').advancedQuery.value='advancedQuery';
				var formObj = document.getElementById("advancedQueryForm");
				if(document.getElementById("page")!=null){
					formObj.ad_allflag.value = 0;
					formObj.ad_currpage.value = thePage;
					if(document.getElementById("setpage_size")!=null){
						formObj.ad_rows.value=document.getElementById("setpage_size").value;
					}else{
						formObj.ad_rows.value = tmain.page_pageSize;
					}
					formObj.ad_totalpages.value = tmain.page_pageCount;
					formObj.ad_totalrows.value = tmain.page_totalRecord;
				}else {
					formObj.ad_allflag.value = 1;
				}
		 } else if(document.getElementById("queryform")!=null){
		       	if(document.getElementById("page")!=null){
		       		var formObj = document.getElementById("queryform");
					formObj.allflag.value = 0;
					formObj.currpage.value = thePage;
					if(document.getElementById("setpage_size")!=null){
						formObj.rows.value=document.getElementById("setpage_size").value;
					}else{
						formObj.rows.value = tmain.page_pageSize;
					}
					formObj.totalpages.value = tmain.page_pageCount;
					formObj.totalrows.value = tmain.page_totalRecord;
					//���Լ���ҳ�����ر���
					
				}else {
					if(formObj.allflag!=null)formObj.allflag.value = 1;
				}
		}
		tmain.paginationdiv = document.getElementById('paginationdiv'); 
		tmain.createPagination(); 
	}
}
/*
*����ҳǩ��index
*/
function setIndexForQueyForm(){
	if ("undefined" == typeof(tabpage_main) || null == tabpage_main)
		return;
	if(document.getElementsByName("selectedTabIndex")==null||document.getElementsByName("selectedTabIndex").length==0){
		if(document.getElementById("advancedQueryForm")!=null){
		 	var tempInput = document.createElement("<INPUT name='selectedTabIndex' type = 'hidden'/>");
			tempInput.value=tabpage_main.currentSelectedTabIndex;
       	  	document.getElementById("advancedQueryForm").appendChild(tempInput);
		 } 
		 if(document.getElementById("queryform")!=null){
		 	var tempInput = document.createElement("<INPUT name='selectedTabIndex' type = 'hidden'/>");
			tempInput.value=tabpage_main.currentSelectedTabIndex;
		 	document.getElementById("queryform").appendChild(tempInput);
		 }
	} else {
		for(var m=0;m<document.getElementsByName("selectedTabIndex").length;m++){
			document.getElementsByName("selectedTabIndex")[m].value=tabpage_main.currentSelectedTabIndex;
		}
	}
}
/*
*
*ҳ����Ϣ
*/
function getPageInfo(form){

    var sqlstring ="";
  	var formObj = form;
  		sqlstring +="rows="+ formObj.rows.value;
		//sqlstring +="&currpage="+ document.getElementById("page").value;
		sqlstring +="&allflag=0";
		sqlstring +="&totalpages="+ formObj.totalpages.value;
		sqlstring +="&totalrows="+ formObj.totalrows.value;
  	
  	return sqlstring; 
  }
  /*
  *
  *
  */
function alertinfo(tmain){
	//alert("�����ɹ�"+tmain.getSelectedRow().length+"��")
	/*
	var sumamt = '0.0';
	var selectedRow = tmain.getSelectedRow();
	for(var i=0;i<selectedRow.length;i++){
		sumamt = accAdd(sumamt,selectedRow[i].amt);
	}
	
	alert("�����ɹ�"+selectedRow.length+"��,��"+String(sumamt).toMoneyFormat());
	*/
	return true;
}

// 20100906 bcg ��ӡ��־������ʶ
var payprintloginfoflag;

/*
*/
function tabTagclick(index,url){ 
	show();
	initTabOnclickBeforQuery();
	var querycondition = getTagCondition($('queryform'));
	var pars = "tabcondition="+tabpage_main.getSelectedTabFilter(index);
	if(querycondition!=null&&querycondition!="")pars += "&"+querycondition;
			   
   	var myAjax = new Ajax.Request(url,
				   	{
					   	 method: 'post',
					   	 parameters: pars,
					   	 onComplete : function(resp){	
					   	 	tagqueryAfter(resp);
					   	 },
						 onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
						 	closeDiv();
						 	alert("����ʧ�ܣ�");
						 }
					} 
   				);
}

/**
*ҳǩ��ѯ---��ҳ
*/
function tabTagPageClick(page,url){ 
	show();
 	initPage(tmain);
	var querycondition = getTagCondition($('queryform'));	
	var pars = "tabcondition="+tabpage_main.getSelectedTabFilter(tabpage_main.currentSelectedTabIndex);
	if(querycondition!=null&&querycondition!="")pars += "&"+querycondition;
   	var myAjax = new Ajax.Request(url,
				   	{
					   	 method: 'post',
					   	 parameters: pars,
					   	 onComplete : function(resp){					   	 
					   	 	tagqueryAfter(resp);
					   	 },
						 onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
						 	closeDiv();
						 	alert("����ʧ�ܣ�");
						 }
					} 
   				);

}
function tagqueryAfter(resp){
    eval("var json = "+resp.responseText);
    if(json.statuCode!=null && json.statuCode==100 && json.warnmsg !=null && json.warnmsg!=""){
    	alert(json.warnmsg);
    	 
    }else{
	   tmain.data = json.result;	 
	   setTabPage(tmain,json);		   
       tmain.show() ;     
    }
    closeDiv();

}

//�����ϴ�
function upload(){
	var selectRow=new Array();
 	var num=tmain.getSelectedRow(); 
 	if(num.length<1){
 		alert("��ѡ��Ҫ�����ĵ��ݣ�");
  	  	return;
 	}
  	if(num.length>1){
  		alert("ֻ��ѡ��һ����������");
  	  	return;
  	}
  	var url = ROOT_PATH + '/indi/mofdeptindiassign/manage/uploadfile/index.do?maindata='+num[0].billid;
	window.open(url,"_blank","status=yes,scrollbars=yes,toolbar=no,menubar=no,location=no");
}

//ָ��������Ԥ�㵼��
function importexldataIndi(){
    var pars = "?vchtypeid="+linkvchtypeid+ "&mainmenu="+getparam("mainmenu")+"&submenu="+getparam("submenu")+"&action=1";
	window.open(ROOT_PATH+"/indi/common/queryimportdata.do" + pars,"_blank","status=yes,toolbar=no,menubar=no,location=no");
}
//ָ��������Ԥ�㵼��1
function importexldataIndi1(){
    var pars = "?vchtypeid="+linkvchtypeid+ "&mainmenu="+getparam("mainmenu")+"&submenu="+getparam("submenu")+"&action=1";
	window.open(ROOT_PATH+"/indi/common/queryimportdata1.do" + pars,"_blank","status=yes,toolbar=no,menubar=no,location=no");
}
/*
*��ĳ�����Եĵ��ݽ��в���ʱ���Բ���������ʾ
*���ѡ������к��������colname���򵯳�info��ͬʱ����false�����򷵻�true��
*���û��ѡ���򷵻�true
*@tmain����������
*@ colname ����
*@colvalues  ����ֵ  �����ʽ[00,01]
*@info  ��ʾ��Ϣ
checkCandoIt(tmain,'wfstatus',['00','01'],"�����޸�00��01������")
*/

function checkCandoIt(tmain,colname,colvalues,info){
	var selectRows = tmain.getSelectedRow();
	if (selectRows.length < 1) {   
        return true;
    }
    for(var n=0;n<selectRows.length;n++){
    eval("var temp =selectRows[n]."+colname);
    if(typeof(temp)=="undefined"){
    	alert("����ϵ����Ա����"+item+"�ֶΣ�");
    	return false;
    }
    	if(chekconditionIt(element,colvalues,temp)){    	
	    	alert(info);
	    	return false;
    	}    	
    }
    return true;
}
function chekconditionIt(element,colvalues,curvalue){
    for(var n=0;n<colvalues.length;n++){
    	if(curvalue==colvalues[n]){     	
	    	return true;
    	}
    }
    return false;
}
var gatheringbankaccount_var="";
/*
*�����տ��˺ŵ����������÷���������Ϊ��ʱ��T_PAYTEMPLATE����ʽΪ����¼���ѡ��
getvoucherPaytrees
*/
function selectBankInput(agencyId,gatheringbankacctname,gatheringbankacctcode,gatheringbankname){
	if(agencyId==null) 
	{
	    alert("��ѡ����Դ����");
		return;
	}
	var	url = ROOT_PATH+"/voucher/getvoucherPaytrees/getPayTrees.do?agency="+agencyId+"&linkvchtypeid="+linkvchtypeid+"&mainmenu="+getparam("mainmenu")+"&submenu="+getparam("submenu");
	var result = window.showModalDialog(url,'','dialogWidth:600px;dialogHeight:500px;status:no;resizable:yes;help:No;scroll:yes;');
   	if(result != null){				
		gatheringbankacctcode.value = result.bankacctcode;
		gatheringbankacctname.value =  result.bankacctname ;
		gatheringbankname.value = result.bankname ;		
	}
	
	if(document.getElementById("gatheringbankprovince")!=null){
		document.getElementById("gatheringbankprovince").value = result.gatheringbankprovince;
	}	
	
	if(document.getElementById("gatheringbankcity")!=null){
		document.getElementById("gatheringbankcity").value = result.gatheringbankcity;
	}	

	if(document.getElementById("inditext11")!=null){
		document.getElementById("inditext11").value = result.bankcode;
	}	
}

/*
* ʵ���տ��˻���t_pubbankaccount����ȡֵ������λ���˻����й��ˡ�����ҳ��û�����������������ӹ��á�
*/
function selectBankByAgencyNX(gatheringbankacctname,gatheringbankacctcode,gatheringbankname){
	if(tmain.getSelectedRow()<1){
		alert("��ѡ����Դ���ݣ�");
		return;
	}
	var	url = ROOT_PATH+"/voucher/common/bankaccount/bankaccountNX.do?&mainmenu="+getparam("mainmenu")+"&submenu="+getparam("submenu")+"&bdgagency="+tmain.getSelectedRow()[0].bdgagency;
	var result = window.showModalDialog(url,'','dialogWidth:600px;dialogHeight:500px;status:no;resizable:yes;help:No;');
   	if(result != null){				
		gatheringbankaccount_var = result.itemid
		gatheringbankacctcode.value = result.code;
		gatheringbankacctname.value = result.wholename;
		gatheringbankname.value = result.agentbank_name;		
	}
}

/*
*ʵ�������տ��˺ŵ����������÷���������ΪT_PUBBNKACCOUNT����ʽΪ����ѡ��Ĭ��ѡ��λ�������˻���
*/
function selectRealBankByAgency(gatheringbankaccount,gatheringbankacctname,gatheringbankacctcode,gatheringbankname){
	var url = ROOT_PATH+"/realpay/common/getbankaccountByBdgagency/bankaccount.do?&mainmenu="+getparam("mainmenu")+"&submenu="+getparam("submenu");
	var result = window.showModalDialog(url,"",'dialogWidth:600px;dialogHeight:450px;status:no;resizable:no;help:No;');
	if(result != null && result.wholename!=null && result.wholename!=''){
		gatheringbankaccount_var=result.itemid;
		//��ѡ���е���ˮ�ű�������
		if(typeof(tdetail)!='undefined'){
			var selectRows = tdetail.getSelectedRow();
		    if(selectRows.length>0){
			    rowObj = selectRows[0];
			    rowObj.gatheringbankaccount = result.itemid;  
		    }
	    }
		
		gatheringbankacctname.value = result.wholename;
		gatheringbankacctcode.value = result.code;
		gatheringbankname.value=result.agentbank_name;
		if(gatheringbankaccount!=null){
			gatheringbankaccount.value=result.code+'-'+result.wholename;
			gatheringbankaccount.valueid = result.itemid;
		}
	}
}

/*
*ʵ�������տ��˺ŵ����������÷���������ΪT_PUBBNKACCOUNT����ʽΪ����ѡ��Ĭ��ѡ���ŵ������˻���
*/
function selectRealBank(gatheringbankaccount,gatheringbankacctname,gatheringbankacctcode,gatheringbankname){
	var url = ROOT_PATH+"/realpay/common/bankaccount/bankaccount.do?&mainmenu="+getparam("mainmenu")+"&submenu="+getparam("submenu");
	var result = window.showModalDialog(url,"",'dialogWidth:600px;dialogHeight:450px;status:no;resizable:no;help:No;');
	if(result != null && result.wholename!=null && result.wholename!=''){
		gatheringbankaccount_var=result.itemid;
		//��ѡ���е���ˮ�ű�������
		var selectRows = tdetail.getSelectedRow();
	    if(selectRows.length>0){
		    rowObj = selectRows[0];
		    rowObj.gatheringbankaccount = result.itemid; 
	    }
		 
		
		gatheringbankacctname.value = result.wholename;
		gatheringbankacctcode.value = result.code;
		gatheringbankname.value=result.agentbank_name;
		if(gatheringbankaccount!=null){
			gatheringbankaccount.value=result.code+'-'+result.wholename;
			gatheringbankaccount.valueid = result.itemid;
		}
	}
}

//ʵ������Ԥ�㵥λȡ��Ĭ�ϵ�λ�տ��˺�
function findRealBankByBdgagency(obj){
var	url = ROOT_PATH+"/realpay/common/getbankaccountByBdgagency/getbankaccountByBdgagency.do";
	    new Ajax.Request(
                    url,
                    {method: 'post', parameters: "bdgagency="+obj, onComplete: afterFindBankAccount}
                    );
}

//ʵ������Ԥ�㵥λȡ��Ĭ�ϲ����տ��˺�
function findRealBank(obj){
var	url = ROOT_PATH+"/realpay/common/bankaccount/getbankaccountByBdgagency.do";
	    new Ajax.Request(
                    url,
                    {method: 'post', parameters: "bdgagency="+obj, onComplete: afterFindBankAccount}
                    );
}

/*
*ר�������տ��˺ŵ����������÷���������ΪT_PUBBNKACCOUNT����ʽΪ����ѡ��Ĭ��ѡ��λ�������˻���
*/
function selectSaBankByAgency(gatheringbankaccount,gatheringbankacctname,gatheringbankacctcode,gatheringbankname){
	var url = ROOT_PATH+"/specialaccount/common/getbankaccountByBdgagency/bankaccount.do?&mainmenu="+getparam("mainmenu")+"&submenu="+getparam("submenu");
	var result = window.showModalDialog(url,"",'dialogWidth:600px;dialogHeight:450px;status:no;resizable:no;help:No;');
	if(result != null && result.wholename!=null && result.wholename!=''){
		gatheringbankaccount_var=result.itemid;
		//��ѡ���е���ˮ�ű�������
		var selectRows = tdetail.getSelectedRow();
	    if(selectRows.length>0){
		    rowObj = selectRows[0];
		    rowObj.gatheringbankaccount = result.itemid;  
	    }
		
		
		gatheringbankacctname.value = result.wholename;
		gatheringbankacctcode.value = result.code;
		gatheringbankname.value=result.agentbank_name;
		if(gatheringbankaccount!=null){
			gatheringbankaccount.value=result.code+'-'+result.wholename;
			gatheringbankaccount.valueid = result.itemid;
		}
	}
}

/*
*ר�������տ��˺ŵ����������÷���������ΪT_PUBBNKACCOUNT����ʽΪ����ѡ��Ĭ��ѡ���ŵ������˻���
*/
function selectSaBank(gatheringbankaccount,gatheringbankacctname,gatheringbankacctcode,gatheringbankname){
	var url = ROOT_PATH+"/specialaccount/common/bankaccount/bankaccount.do?&mainmenu="+getparam("mainmenu")+"&submenu="+getparam("submenu");
	var result = window.showModalDialog(url,"",'dialogWidth:600px;dialogHeight:450px;status:no;resizable:no;help:No;');
	if(result != null && result.wholename!=null && result.wholename!=''){
		gatheringbankaccount_var=result.itemid;
		//��ѡ���е���ˮ�ű�������
		var selectRows = tdetail.getSelectedRow();
	    if(selectRows.length>0){
		    rowObj = selectRows[0];
		    rowObj.gatheringbankaccount = result.itemid;  
	    }
		
		
		gatheringbankacctname.value = result.wholename;
		gatheringbankacctcode.value = result.code;
		gatheringbankname.value=result.agentbank_name;
		if(gatheringbankaccount!=null){		
			gatheringbankaccount.value=result.code+'-'+result.wholename;
			gatheringbankaccount.valueid = result.itemid;
		}
	}
}

//ר������Ԥ�㵥λȡ��Ĭ�ϵ�λ�տ��˺�
function findSaBankByBdgagency(obj){
var	url = ROOT_PATH+"/specialaccount/common/getbankaccountByBdgagency/getbankaccountByBdgagency.do";
	    new Ajax.Request(
                    url,
                    {method: 'post', parameters: "bdgagency="+obj, onComplete: afterFindBankAccount}
                    );
}

//ר������Ԥ�㵥λȡ��Ĭ�ϲ����տ��˺�
function findSaBank(obj){
var	url = ROOT_PATH+"/specialaccount/common/bankaccount/getbankaccountByBdgagency.do";
	    new Ajax.Request(
                    url,
                    {method: 'post', parameters: "bdgagency="+obj, onComplete: afterFindBankAccount}
                    );
}

//��ѯ�տ��˺ŵĻص�����
function afterFindBankAccount(request){
	if(""==request.responseText){  
		gatheringbankaccount_var="";		
		$('gatheringbankacctcode').value = "";
		$('gatheringbankacctname').value = "";
		$('gatheringbankname').value = "";	
		if(typeof($('gatheringbankaccount'))!="undefined"&&$('gatheringbankaccount')!=null){
			$('gatheringbankaccount').valueid = "";	
			$('gatheringbankaccount').value = "";	
		}
	    return ;
	}
	eval("var result = "+request.responseText+"");	
  	if(result != null){	
		gatheringbankaccount_var=result.itemid;
		$('gatheringbankacctcode').value = result.code;
		$('gatheringbankacctname').value = result.name;
		$('gatheringbankname').value = result.agentbankname;;	
		if(typeof($('gatheringbankaccount'))!="undefined"&&$('gatheringbankaccount')!=null){
			$('gatheringbankaccount').valueid = result.itemid;	
			$('gatheringbankaccount').value = result.code+"-"+result.name;		
		}
	}
}


//����ģ����ȥ��ѯ����ģ�����
function printWithTemp(reportid){
 
  new Ajax.Request(
                 ROOT_PATH+"/indipay/common/queryRptTemp.do",
                 {method: 'post',
                  parameters: "reportid="+reportid,
                  onComplete: afterprintWithTemp,asynchronous:false}
                 );

}
function afterprintWithTemp(request){

	eval("var v_rptTemp = "+request.responseText+"");
	var rptnum = v_rptTemp.v_num;
	var v_rptid = v_rptTemp.reportId;

	Ext.lt.ifmis.activex.loadJQReportOcx();
	if(Number(rptnum)>1){
		var url = "/indipay/common/getRptTemp.do?reportid="+v_rptid;

	    var ret = window.showModalDialog(url,"","dialogWidth:400px;dialogHeight:300px;scroll:1;resizable:1;status:0;help:0;center:1");
	    	 if(typeof(ret) != "undefined"){
			     if(ret.length>0) {
			              new Ajax.Request(
		                    ROOT_PATH+"/indipay/common/printvoucherQZ.do",
		                    {method: 'post', parameters: "printid="+v_rptid+"&tempname="+ret[0]+"&json="+Object.toJSON(v_rows), onComplete: printReportQZ}
		                    );
			        }
	        }
	}else{
	   new Ajax.Request(
                    ROOT_PATH+"/common/printvoucher.do",
                    {method: 'post', parameters: "printid="+v_rptid+"&json="+Object.toJSON(v_rows), onComplete: printReportQZ}
                    );
	}
}
function printVoucherIndiPay(rptid, rows){
 
v_rows =rows;

   printWithTemp(rptid);
}
//20091209
// ��ӡƾ֤  rptid ��ƾ֤��ӡģ�壬billid�Ǵ�ӡ�Ĳ��� 
var v_billid="";
function printVoucherBillidIndiPay(rptid, billid){
 v_billid =billid;

	 new Ajax.Request(
                 ROOT_PATH+"/indipay/common/queryRptTemp.do",
                 {method: 'post',
                  parameters: "reportid="+rptid,
                  onComplete: afterprintWithTempIndiPay ,asynchronous:false}
                 );

}
function afterprintWithTempIndiPay(request){
	eval("var v_rptTemp = "+request.responseText+"");
	var rptnum = v_rptTemp.v_num;
	var v_rptid = v_rptTemp.reportId;
	Ext.lt.ifmis.activex.loadJQReportOcx();
	if(Number(rptnum)>1){
		var url = "/indipay/common/getRptTemp.do?reportid="+v_rptid;
		 
	    var ret = window.showModalDialog(url,"","dialogWidth:400px;dialogHeight:300px;scroll:1;resizable:1;status:0;help:0;center:1");
	      if(typeof(ret) != "undefined"){
			     if(ret.length>0) {
			              new Ajax.Request(
		                    ROOT_PATH+"/indipay/common/printvoucherbillid.do",
		                    {method: 'post', parameters: "printid="+v_rptid+"&tempname="+ret[0]+"&billid="+v_billid, onComplete: printComplete,asynchronous:false}
		                    );
			        }
	         }
	}else{
    new Ajax.Request(
                    ROOT_PATH+"/common/printvoucherbillid.do",
                    {method: 'post', parameters: "printid="+v_rptid+"&billid="+v_billid, onComplete: printComplete,asynchronous:false}
                    );
	}
}


//������;ҳ��
function selectUses(text10){
	var refererurl = ""+window.location.href;
	var url = ROOT_PATH+"/common/getUse.do?Referer="+refererurl.substring(0,refererurl.indexOf("?"));
	var result = window.showModalDialog(url,"",'dialogWidth:600px;dialogHeight:450px;status:no;resizable:no;help:No;');
	//var result = window.open(url, 'newWindow','dialogWidth=600px,dialogHeight=450px,status=yes,toolbar=no,menubar=no,directories=no,resizable=no,Scrollbars=no');
	if(result != null && result.use!=null){
		text10.value = result.use;
	}
}
//����ժҪҳ��
function selectSummarys(text5){
	var refererurl = ""+window.location.href;
	var url = ROOT_PATH+"/common/getSummary.do?Referer="+refererurl.substring(0,refererurl.indexOf("?"));
	var result = window.showModalDialog(url,"",'dialogWidth:600px;dialogHeight:450px;status:no;resizable:no;help:No;');
	//var result = window.open(url, 'newWindow','dialogWidth=600px,dialogHeight=450px,status=yes,toolbar=no,menubar=no,directories=no,resizable=no,Scrollbars=no');
	if(result != null && result.use!=null){
		text5.value = result.use;
	}
}

//���в�ѯ��������;������
function selectUsesTree(text10){
	var	url = ROOT_PATH+"/common/getUseTree/index.do?tapIndex=0&mainmenu="+getparam("mainmenu")+"&submenu="+getparam("submenu");	
	var result = window.showModalDialog(url,window,'dialogWidth:600px;dialogHeight:500px;status:no;resizable:yes;help:No;scroll:yes;');
	if(result != null && result.use!=null){
		text10.value = result.use;
	}
}

//���в�ѯ������ժҪ������
function selectSummarysTree(text5){
	var	url = ROOT_PATH+"/common/getSummaryTree/index.do?tapIndex=0&mainmenu="+getparam("mainmenu")+"&submenu="+getparam("submenu");	
	var result = window.showModalDialog(url,window,'dialogWidth:600px;dialogHeight:500px;status:no;resizable:yes;help:No;scroll:yes;');
	if(result != null && result.use!=null){
		text5.value = result.use;
	}
}

//���в�ѯ������ժҪ������(text7)
function selectPlanSumsTree(text7){
	var	url = ROOT_PATH+"/common/getPlanSumTree/index.do?tapIndex=0&mainmenu="+getparam("mainmenu")+"&submenu="+getparam("submenu");	
	var result = window.showModalDialog(url,window,'dialogWidth:600px;dialogHeight:500px;status:no;resizable:yes;help:No;scroll:yes;');
	if(result != null && result.use!=null){
		text7.value = result.use;
	}
}

//��õ�ǰ����
function getDate(){	
	var nowDate = new Date().format("yyyyMMdd",0); 
	return nowDate;
}

//��ü�����ǰ�򼸸��º������
function getDateModMonth(monthnum){	
	var d=new Date();
	return d.format("yyyyMMdd",monthnum); 
}

//��õ�ǰ�·�
function getMonth(){	
	var nowDate = new Date(); 
	var nowMonth  = nowDate.getMonth() + 1;
	return nowMonth;
}

//��õ�ǰ�·�,������ڵ���ʱ�������һ���򷵻�1
function getMonthWithYear(acctyear){	
	var nowDate = new Date();
	var nowYear =  nowDate.getYear();
	if("undefined"==typeof(acctyear)||acctyear==null||acctyear==""||acctyear == nowYear){
		var nowMonth  = nowDate.getMonth() + 1;
		return nowMonth;
	}else if (nowYear - acctyear==1){
		return 1;
	}
	
}
/**  
 * ʱ�����ĸ�ʽ��;  
 * format:���ڸ�ʽ
 * monthnum�����������Ի�ü�����ǰ�򼸸��º��ĳ��
 */  
Date.prototype.format = function(format,monthnum) {    
    var o = {   
        "M+" :this.getMonth() + 1 + monthnum, // month   
        "d+" :this.getDate(), // day   
        "h+" :this.getHours(), // hour   
        "m+" :this.getMinutes(), // minute   
        "s+" :this.getSeconds(), // second   
        "q+" :Math.floor((this.getMonth() + 3) / 3), // quarter   
        "S" :this.getMilliseconds()       // millisecond   
    }   
  
    if (/(y+)/.test(format)) {   
        format = format.replace(RegExp.$1, (this.getFullYear() + "")   
                .substr(4 - RegExp.$1.length));   
    }   
  
    for ( var k in o) {   
        if (new RegExp("(" + k + ")").test(format)) {   
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]   
                    : ("00" + o[k]).substr(("" + o[k]).length));   
        }   
    }   
    return format;   
}

//ָ����ȫ��
function assignDefault(){
    var t_selectrows = tmain.getSelectedRow();
	var selectrows = tdetail.getSelectedRow();	
	if(selectrows.length == 0){
		alert("��ѡ���������!");
		return ;
	}
	var mainVouch=t_selectrows[0];
	var selectrow=selectrows[0];
	selectrow.amt=parseFloat(moneyFormatToNumber(mainVouch.curbal)) + parseFloat(moneyFormatToNumber(selectrow.amt));
	tdetail.draw();
	if(selectrow.amt==0){
		$("detailform").amt.value = 0;
	}
	else{
	    $("detailform").amt.value = fNumFormat(moneyFormatToNumber(selectrow.amt),3,',');
	    $("detailform").amt_hid.value = fNumFormat(moneyFormatToNumber($("detailform").amt_hid.value),3,',');
	}
	//ֱ�Ӹ�ֵΪ0
	mainVouch.curbal = 0;
	//mainVouch.curbal = parseFloat(moneyFormatToNumber(mainVouch.curbal)) + parseFloat(detailamtDefault) -  parseFloat(moneyFormatToNumber($("detailform").amt.value));
	tmain.draw();				
    detailamtDefault = moneyFormatToNumber(selectrow.amt);
    $("detailform").amt_hid.fireEvent("onblur");
}  
/**
*��ѡ�еĵ��ݽ��й��ˣ�Ȼ�����������ݴ��ݵ���̨������ֻ��дid
*
*/
function getSelectedRowId(datatableid){
		var l = new Array();
		for(var i=0;i<datatableid.data.length;i++){
			if(datatableid.data[i].checked){
			    var row = new Object();			  
				row.billid = datatableid.data[i].billid;		
				row.auditOpinion = datatableid.data[i].auditOpinion;	
				row.lastupdatetime = datatableid.data[i].lastupdatetime;
				//���ǩ���ֶ�
				row.inditext13 = datatableid.data[i].inditext13;
				row.inditext16 = datatableid.data[i].inditext16;
				row.indinumber7 = datatableid.data[i].indinumber7;
				//����������չ
				l[l.length] = row;
			}
		}
		return l;
	}
	
/**
*��ѡ�еĵ��ݽ��й��ˣ�Ȼ�����������ݴ��ݵ���̨,���Ӷ�ֻ��id
*
*/
function getSelectedRowMianAndDetailId(datatableid){
		var l = new Array();
	
		for(var i=0;i<datatableid.data.length;i++){
			if(datatableid.data[i].checked){
			    var row = new Object();			  
				row.billid = datatableid.data[i].billid;		
				row.auditOpinion = datatableid.data[i].auditOpinion;	
				row.lastupdatetime = datatableid.data[i].lastupdatetime;
				//������ϸ
				var tdata = datatableid.data[i].details;
				var drow = new Array();
				for(var n=0;n<tdata.length;n++){
				    var detailrow = new Object();
				    detailrow.billid = tdata[n].billid;	
				    detailrow.auditOpinion = tdata[n].auditOpinion;						
					detailrow.lastupdatetime = tdata[n].lastupdatetime;
					//���ǩ���ֶ�
					detailrow.inditext13 = tdata[n].inditext13;
					detailrow.inditext16 = tdata[n].inditext16;
					detailrow.indinumber7 = tdata[n].indinumber7;
					
					drow[drow.length] = detailrow;
				}
				row.details=drow;
				//���ǩ���ֶ�
				row.inditext13 = datatableid.data[i].inditext13;
				row.inditext16 = datatableid.data[i].inditext16;
				row.indinumber7 = datatableid.data[i].indinumber7;
				
				//����������չ		
				l[l.length] = row;
				
				}
			}

		return l;
	}

/**
*��Դȥ�� 20110725 add by lty
*��ѯ��Դȥ��
*/
function showSourceDestinationInfo(rownum,tableid){
	var row = eval(tableid+".data[rownum]");
    var tableobj = eval(tableid);
    try{
    	if("undefined"==typeof(row.billid)||row.billid==null||row.billid==""){
    		alert("ȱ�����ã�����ϵϵͳ����Ա���������billid!");
    		return;
    	}
    	if("undefined"==typeof(SDtablename)||null==SDtablename||""==SDtablename.trim()){
    		alert("ȱ�����ã�����ϵϵͳ����Ա���������SDtablename!");
    		return;
    	}
    	if("undefined"==typeof(SDsourcelevel)||!sourclLevelFormatToNumber(SDsourcelevel).isNumber()){
    		alert("ȱ�����ã�����ϵϵͳ����Ա���������SDsourcelevel!");
    		return;
    	}
    }catch (e){
    }
	var url = ROOT_PATH+"/commons/showSourceDestinationAction.do?billid="+row.billid+"&tableName="+SDtablename+"&SDsourcelevel="+SDsourcelevel+"&mainmenu="+getparam("mainmenu")+"&submenu="+getparam("submenu");
	window.showModalDialog(url,window,'dialogWidth:'+screen.width+'px;dialogHeight:'+screen.height+'px;status:no;resizable:yes;help:No;scroll:yes;center:yes;');
}


function openWindowWithPost(url, name, keys, values,features) {   
    var newWindow = window.open(url, name,features);   
    if (!newWindow) return false;   
    var html = "";
    html += "<html><head></head><body><form id='formid' method='post' action='" + url + "'>";   
    if (keys && values && (keys.length == values.length))   
        for (var i = 0; i < keys.length; i++)   
        html += "<input type='hidden' name='" + keys[i] + "' value='" + values[i] + "'/>";   
        html += "</form><script type='text/javascript'>document.getElementById(\"formid\").submit()</script></body></html>";   
    newWindow.document.write(html);   
    return newWindow;   
}  

/**
*׷�ݼƻ� 20130417 add by dengdegao
*��ѯ�ƻ���ȶ�Ӧ�ļƻ���ϸ
*/
function showSourcePlanInfo(rownum,tableid){
	var row = eval(tableid+".data[rownum]");
    var tableobj = eval(tableid);
    var ctrlidStr="";
    try{
    	if("undefined"==typeof(row.details)||row.details==null||row.details==""){
    		if("undefined"==typeof(row.ctrlid)||row.ctrlid==null||row.ctrlid==""){
    			alert("ȱ�����ã�����ϵϵͳ����Ա���������ctrlid!");
    			return;
    		}
    		ctrlidStr=row.ctrlid;
    	}else{
    		var datas = row.details;				
			for(var i=0;i<datas.length;i++){					
				ctrlidStr=ctrlidStr+","+datas[i].ctrlid;
			}	
			ctrlidStr = ctrlidStr.substring(1,ctrlidStr.length);
    	}
    	
    	
    }catch (e){
    }
	//var url = ROOT_PATH+"/commons/showSourcePlanAction.do?&ctrlid="+ctrlidStr;
	var features = "top=200,left=200,width=750,height=320,scrollbars=yes,,resizable=yes,status=yes,center:yes";
	//window.open(url, "׷�ݼƻ�", features);
	var keys=["ctrlid"];
	var values=[ctrlidStr];
	openWindowWithPost(ROOT_PATH+"/commons/showSourcePlanAction.do","׷�ݼƻ�",keys,values,features)
}

/**
*��Դ����ж�
*/
function sourclLevelFormatToNumber(m){
    if(m==null || m=="")
    	return 1;
    m=m+"";
	m = m.replace(/,/g,"");
	return m;
}

//�Զ�����
col = createColumnConfig();
col.id = "sourceDestination";
col.name = "sourceDestination";
col.type = "L";
col.title = "��Դȥ��";
col.show = function(rownum,value,row,tdobj,datatable){
	tdobj.innerHTML = "<div ALIGN='center'><img src='"+ROOT_PATH+"/ifmis_images/done_btn/refresh.gif' alt='��Դȥ��' onclick='showSourceDestinationInfo(" + rownum +",\"" +datatable.id+"\");' /></div>";
}
ColumnConfig[col.id.toLowerCase()]=col;

//�Զ�����Դ�ƻ���
col = createColumnConfig();
col.id = "sourcePlan";
col.name = "sourcePlan";
col.type = "L";
col.title = "׷�ݼƻ�";
//ͼƬ�ľ���·��
//var url = ROOT_PATH+"/ifmis_images/done_btn/refresh.gif";
col.show = function(rownum,value,row,tdobj,datatable){
	tdobj.innerHTML = "<div ALIGN='center'><img src='"+ROOT_PATH+"/ifmis_images/done_btn/refresh.gif' alt='׷�ݼƻ�' onclick='showSourcePlanInfo(" + rownum +",\"" +datatable.id+"\");' /></div>";
}
ColumnConfig[col.id.toLowerCase()]=col;

/************************/
//Ϊģ�巽ʽΪ����Դ�Ĵ�ӡģ��,��ͼ����ʹ��
function querySealListForBilldsLT(){
		if(sealList.length>0){
		    seaNameList ="'"+sealList[0]['sealName']+"'";
			for (var j=1;j<sealList.length;j++) {
				seaNameList =seaNameList + ",'"+sealList[j]['sealName']+"'";
			}
		}
/**
20091316
*/
		var selectedbillids="";
		var v_vchtypeid = tmain.getSelectedRow()[0].vchtypeid;//��ӽ���ƾ֤���͵���ѯ
		for(var i=0;i<tmain.getSelectedRow().length;i++){
			selectedbillids +=tmain.getSelectedRow()[i].billid;
			if(i<tmain.getSelectedRow().length-1)selectedbillids += ",";
		}   
	    new Ajax.Request(
                    ROOT_PATH+"/common/querySealList.do",
                    {method: 'post', parameters: "sealist="+seaNameList+"&selectedbillids="+selectedbillids+"&vchtypeid="+v_vchtypeid,
                     onComplete: afterQuerySealListForBilldsLT}
                    );
                    
}
function afterQuerySealListForBilldsLT(request){

eval("var sealmess = "+request.responseText+"");
try{	
	    // ���������˵���   
	    document.all.HWPostil1.ShowDefMenu=0;
	    document.all.HWPostil1.ShowScrollBarButton = 0;
        document.all.HWPostil1.HideMenuItem(8192);
		document.all.HWPostil1.HideMenuItem(2);
		document.all.HWPostil1. HideMenuItem(262144);
		document.all.HWPostil1. HideMenuItem(16384);
		document.all.HWPostil1. HideMenuItem(8192) ;	
		document.all.HWPostil1.SetPageMode(1,100);		
		//HWPostil �ؼ������ش�ӡ��
		document.all.HWPostil1.Login("HWSEALDEMO**", 4, 65535, "DEMO", "");
		document.all.HWPostil1.BeforeConvert("");      
		//����Ƿ�ǩ�¹�
		for(var i = 0;i<selectedRows.length;i++){	
			eval("var sealBmpList  = sealmess.sealinfo_"+selectedRows[i].billid);	
			if(sealBmpList.length>0){
				eval("var sealBmpList  = sealmess.sealinfo_"+selectedRows[i].billid);	
				break;
			}		
		} 
		
	   	var billid = createDS_billid() ;
	   	//ʹ����ͼ��̨��ӡ
  		var ltprintConf = new Array();
		ltprintConf.jrid=billid;
		ltprintConf.printid=config['reportId'];	 	   	
	   	ltPrintReport(ltprintConf);
	   	
	   	document.all.HWPostil1.WaitConverting(3000);
		//������ӡ
	   	document.all.HWPostil1.AfterConvert();
		if(!document.all.HWPostil1.IsOpened()){
			alert("��ش�ӡ��ʧ��");
		}else{ 
			//��ӡ��ͼƬ���뵽��ӡ�ļ��� , ��i �� ��j ��ǩ��
			var n = config['num'];
			//n�ĸ�ʽ�� �򼸴�*����
			var m = 2;		
				
			 var rid = config['reportId'];	
			if(n==0)n=1;
//�˴�����Ϊ��Ȼ���֪ͨ��׼�����������ط���ӡǩ�£�����ȷ���Ƿ���ʽ���Ȼ���֪ͨ��һ�£���һ�£������ô˴�����������һ�£���ο����ݼ���ʽ������д����
				if(rptid =='181'||rid =='102'||rid =='1002'){ 				 
					for(var i = 0;i<document.all.HWPostil1.PageCount;i++){			
								//eval("var sealBmpList  = sealmess.sealinfo_"+selectedRows[0].billid);
								for (var j=0;j<sealBmpList.length;j++) {					   
									   var sealposion = getsealBmpPosion(sealBmpList[j].sealname);					   
									    if(typeof(sealposion)!="undefined"&&sealposion.lzoom!=null)
									   document.all.HWPostil1.InsertPicture(sealBmpList[j].sealname ,"STRDATA:" + sealBmpList[j].sealdata,i,sealposion.lleft,sealposion.ltop,sealposion.lzoom);
						      		  // if(n>1&&n%m==0)document.all.HWPostil1.InsertPicture(sealList[j]['sealName'] ,"STRDATA:" + sealList[j]['sealBmp'],i,sealList[j]['lleft'],sealList[j]['ltop']*2,sealList[j]['lzoom']);
					      			}	      
					     		 }
				}else {
				//��������  ʹ���ݰ���billcode��������
					var tmpList=[];
					if(rptid =='201103'||rid =='210101'||rid =='210103' ||rid =='210108'){
				   	  	selectedRows.sort(compareWithTime);
				   	  }else{
				   	  	selectedRows.sort(compare);
						for(var i=selectedRows.length-1;i>=0;i=i-1){//��������
					           tmpList[tmpList.length]=selectedRows[i];
					   	  }
					   	  selectedRows = tmpList;
				   	  }
	   	  			
						for(var i = 0;i<selectedRows.length;i++){	

								eval("var sealBmpList  = sealmess.sealinfo_"+selectedRows[i].billid);	
								
								for(var a=0;a<n;a++){
									for (var j=0;j<sealBmpList.length;j++) {	
										   var sealposion = getsealBmpPosion(sealBmpList[j].sealname);					   
										    if(typeof(sealposion)!="undefined"&&sealposion.lzoom!=null){
										     		 document.all.HWPostil1.InsertPicture(sealBmpList[j].sealname ,"STRDATA:" + sealBmpList[j].sealdata,i*n+a,sealposion.lleft,sealposion.ltop,sealposion.lzoom);
										    }
						      		}	
					      		}      
				     	}
	     		}
	     	}	
		document.all.HWPostil1.ShowFullScreen = 1; 	
	}catch(e){
		alert(e.name + ":" + e.message);
	}
}

//�����ĺ�ѡ�����
function selectIndiDocuments(obj){
	var	url = ROOT_PATH+"/common/IndiDocument/showIndiDocument.do?mainmenu="+getparam("mainmenu")+"&submenu="+getparam("submenu");
	var result = window.showModalDialog(url,'','dialogWidth:600px;dialogHeight:500px;status:no;resizable:yes;help:No;scroll:yes;');
	//var result = window.open(url,'','top=200,left=200,width=750,height=600,scrollbars=yes,resizable=yes,status=yes');
	if(result != null && result.text3!=null){
		obj.value = result.text3;
		obj.textid = result.textid;
	}
}
//ʵ����ȡ�����˻�
function getrealPayBankAccount(paymentbankacctname,paymentbankacctcode,paymentbankname,paymentbankaccount){

	var	url = ROOT_PATH+"/realpay/common/getrealvoucherPaytrees/getPayTrees.do?mainmenu="+getparam("mainmenu")+"&submenu="+getparam("submenu");
	var result = window.showModalDialog(url,'','dialogWidth:600px;dialogHeight:600px;status:no;resizable:yes;help:No;');
   	if(result != null){				
		paymentbankacctcode.value = result.code;
		paymentbankacctname.value = result.wholename;
		paymentbankname.value = result.agentbank_name;			
		tdetail.getSelectedRow()[0].paymentbankaccount =result.itemid; 		
		//��������Ϣ
		tdetail.getSelectedRow()[0].agentbank= result.agentbank; 	
		tdetail.getSelectedRow()[0].agentbank_code= result.agentbank_code;
		tdetail.getSelectedRow()[0].agentbank_name= result.agentbank_name;
		//��������ʡ����
		tdetail.getSelectedRow()[0].city= result.city; 
		tdetail.getSelectedRow()[0].province= result.province; 
        //�鼯��
		tdetail.getSelectedRow()[0].gatherbank= result.gatherbank; 	
		tdetail.getSelectedRow()[0].gatherbank_code= result.gatherbank_code;
		tdetail.getSelectedRow()[0].gatherbank_name= result.gatherbank_name;	
		tdetail.show();
	}
}

//ʵ����ȡ�����˻�,��������Ȩ�޹���
function getrealPayBankAccountCa(paymentbankacctname,paymentbankacctcode,paymentbankname,paymentbankaccount){

	var	url = ROOT_PATH+"/realpay/common/getrealvoucherPaytrees/getPayTreesCa.do?mainmenu="+getparam("mainmenu")+"&submenu="+getparam("submenu");
	var result = window.showModalDialog(url,'','dialogWidth:600px;dialogHeight:600px;status:no;resizable:yes;help:No;');
   	if(result != null){				
		paymentbankacctcode.value = result.code;
		paymentbankacctname.value = result.wholename;
		paymentbankname.value = result.agentbank_name;			
		tdetail.getSelectedRow()[0].paymentbankaccount =result.itemid; 		
		//��������Ϣ
		tdetail.getSelectedRow()[0].agentbank= result.agentbank; 	
		tdetail.getSelectedRow()[0].agentbank_code= result.agentbank_code;
		tdetail.getSelectedRow()[0].agentbank_name= result.agentbank_name;
		//��������ʡ����
		tdetail.getSelectedRow()[0].city= result.city; 
		tdetail.getSelectedRow()[0].province= result.province; 
        //�鼯��
		tdetail.getSelectedRow()[0].gatherbank= result.gatherbank; 	
		tdetail.getSelectedRow()[0].gatherbank_code= result.gatherbank_code;
		tdetail.getSelectedRow()[0].gatherbank_name= result.gatherbank_name;	
		tdetail.show();
	}
}

//ʵ����ȡ�����˻�Ĭ��ֵ bug[41982,41522]
function setrealPayBankAccDef(paymentbankaccount,paymentbankacctname,paymentbankacctcode,paymentbankname){
  var url = ROOT_PATH+"/realpay/common/getrealvoucherPaytrees/getBankAccountDefault.do?mainmenu="+getparam("mainmenu")+"&submenu="+getparam("submenu");
    new Ajax.Request(
                url,
                {method: 'post', parameters: "paymentbankaccount="+paymentbankaccount,
                	onComplete: function(request){
             		   if(""==request.responseText){
             		      var selectRows = tdetail.getSelectedRow();
             		      if(selectRows.length>0){
             		    	  rowObj = selectRows[0];
             			    }
             				rowObj.paymentbankaccount = ""; 
             				paymentbankacctcode.value="";
             				paymentbankacctname.value="";
             				paymentbankname.value="";
             			    return ;
             			}
             			eval("var result = "+request.responseText+"");	
             		  	if(result != null){		
             		  		paymentbankacctcode.value = result.code;
             		  		paymentbankacctname.value = result.wholename;
             		  		paymentbankname.value = result.agentbank_name;	
             				tdetail.getSelectedRow()[0].paymentbankaccount =result.itemid; 		
             				//��������Ϣ
             				tdetail.getSelectedRow()[0].agentbank= result.agentbank; 	
             				tdetail.getSelectedRow()[0].agentbank_code= result.agentbank_code;
             				tdetail.getSelectedRow()[0].agentbank_name= result.agentbank_name;
             				
             		        //�鼯��
             				tdetail.getSelectedRow()[0].gatherbank= result.gatherbank; 	
             				tdetail.getSelectedRow()[0].gatherbank_code= result.gatherbank_code;
             				tdetail.getSelectedRow()[0].gatherbank_name= result.gatherbank_name;	
             			}
             			datasynch(paymentbankacctname);
             			datasynch(paymentbankacctcode);
             			datasynch(paymentbankname);
             		
             	} ,  onFailure : function(req) {
             		 alert("��ȡ�����˻�Ĭ��ֵʧ�ܡ�");
             		
             	}
                }
      );
}


//�Զ������ĺ�����OA
col = createColumnConfig();
col.id = "text3s";
col.name = "text3s";
col.type = "L";
col.title = "ָ���ĺ�";
col.show = function(rownum,value,row,tdobj,datatable){;
	var rowData = eval(datatable.id+".data[rownum]");
	if("undefined"==typeof(row.text3)||row.text3==null||row.text3==""||row.text3=="0"){
		tdobj.innerHTML = rowData.text3;
	} else {
		tdobj.innerHTML = "<a href='javascript:showUrloadbifileno(" + rownum +",\"" +datatable.id+"\");' title='" + rowData.text3 + "'>" + rowData.text3 + "</a>";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;

/**
*�ĺ�����OA 20120207 add by lty
*/
function showUrloadbifileno(rownum,tableid){
	var row = eval(tableid+".data[rownum]");
    var tableobj = eval(tableid);
    try{
    	if("undefined"==typeof(row.text3)||row.text3==null||row.text3==""){
    		alert("ȱ�����ã�����ϵϵͳ����Ա���������text3!");
    		return;
    	}
    }catch (e){
    }
    var url = ROOT_PATH+'/common/IndiDocument/showUrloadbifileno.do';
	var pars = 'text3='+row.text3;
	var myAjax = new Ajax.Request(url,
					{
						method: 'post',
						parameters: pars,
						onComplete : afterUrloadbifileno,
						onFailure : function(resp) { 
							alert("����ʧ�ܣ�");
						},
						asynchronous:false
					});
}

function  afterUrloadbifileno(resp){
	var json = resp.responseText;
	if (json=="") {
		alert("OAϵͳ��ַ���õ������⣬����ϵ����Ա���!");
		return;
	}
	_OAWindow=Ext.lt.window({title:"<b>ָ���ļ�</b>", w:900, h:512,close:true,pop:true,className:'wind7',fitmode:'content',mark:false});
	var _div=document.createElement("div");
	document.body.appendChild(_div);
	_div.style.height='512px';
	_div.style.width='900px';
	_div.innerHTML="<iframe src="+json+" width=\"100%\" height=\"100%\" frameborder=\"0\"></iframe>";		
	_OAWindow.draw(_div);
}


//�޸ķ�������ΪԤ������modify 20120830.
col = createColumnConfig();
col.id = "controltypecode";
col.name = "controltypecode";
col.type = "S";
col.title = "Ԥ��״̬";
col.show = function(rownum,value,row,tdobj,datatable){
	if(row["controltypecode"] == null || row["controltypecode"] == ""){
		tdobj.innerHTML = "";
	}
	else if(row["controltypecode"] == 0){
		tdobj.innerHTML = "0-ͨ��";
	}else if(row["controltypecode"] == 1){
		tdobj.innerHTML = "1-Υ��";
	}else if(row["controltypecode"] == 2){
		tdobj.innerHTML = "2-����";
	}else if(row["controltypecode"] == 3){
		tdobj.innerHTML = "3-����";
	}else if(row["controltypecode"] == 4){
		tdobj.innerHTML = "4-�澯";
	}else if(row["controltypecode"] == 5){
		tdobj.innerHTML = "5-��¼";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;


// �Զ�����״̬���� add 20120830
function setControltypecodeDef(name){
	col = createColumnConfig();
	col.id = "controltypecode";
	col.name = "controltypecode";
	col.type = "S";
	col.title = name;
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["controltypecode"] == null || row["controltypecode"] == ""){
			tdobj.innerHTML = "";
		}
		else if(row["controltypecode"] == 0){
			tdobj.innerHTML = "0-ͨ��";
		}else if(row["controltypecode"] == 1){
			tdobj.innerHTML = "1-Υ��";
		}else if(row["controltypecode"] == 2){
			tdobj.innerHTML = "2-����";
		}else if(row["controltypecode"] == 3){
			tdobj.innerHTML = "3-����";
		}else if(row["controltypecode"] == 4){
			tdobj.innerHTML = "4-�澯";
		}else if(row["controltypecode"] == 5){
			tdobj.innerHTML = "5-��¼";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
}


// �޸ķ�������ΪԤ������ͬʱ�����ж����json �������ϵͳ modify 20120830.
col = createColumnConfig();
col.id = "rulearray";
col.name = "rulearray";
col.type = "S";
col.title = "Ԥ������";
col.show = function(rownum,value,row,tdobj,datatable){
        if(value!=null&&value!=""){
            var tips="�鿴Υ������";
		   // tdobj.innerHTML = "<a href="+url+" color="red" title="+tips+">"+value+"</a>";
		   tdobj.value = value;
		   tdobj.myrow = row;
		   tdobj.innerHTML = "<a href='#' color='red' title="+tips+" onclick='getitinspectinfo(this.parentElement)'>"+value+"</a>";
		}
}
ColumnConfig[col.id.toLowerCase()]=col;

function getitinspectinfo(thetdobj){
     var myvalue = thetdobj.value;
     var data = thetdobj.myrow;
     var resultvalue = window.showModalDialog("/ltinspect/system/rule/queryrule.do?billids="+myvalue,data,'dialogWidth=1000px;dialogHeight=500px;status=yes;toolbar=no;help=no;menubar=no;directories=no;resizable=no;Scrollbars=no');
}

//�ṩ�Զ�����״̬���� add 20120830 
function setulearrayDef(name){
	col = createColumnConfig();
	col.id = "rulearray";
	col.name = "rulearray";
	col.type = "S";
	col.title = name;
	col.show = function(rownum,value,row,tdobj,datatable){
	        if(value!=null&&value!=""){
	            var tips="�鿴Υ������";
			   // tdobj.innerHTML = "<a href="+url+" color="red" title="+tips+">"+value+"</a>";
	            tdobj.value = value;
	 		   tdobj.myrow = row;
			   tdobj.innerHTML = "<a href='#' color='red' title="+tips+" onclick='getitinspectinfo(this.parentElement)'>"+value+"</a>";
			}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
}

/**
 * ���ݼ�ؽ���жϲ����Ƿ�ͨ��
 * @returns {Boolean}
 */
function checkInspectflag(){
    var inspectflag = "0";
    try{
    	var selectedRow=tmain.getSelectedRow();
    	var auditOpinion = "";
    	for(var i=0;i<selectedRow.length;i++){
    		if(typeof(selectedRow[i].controltypecode)!= "undefined" && selectedRow[i].controltypecode == 1){
    			inspectflag = "1";
    			break;
    		}else if(typeof(selectedRow[i].controltypecode)!= "undefined" && selectedRow[i].controltypecode == 2){
    			inspectflag = "2";
    			break;
    		} 
    	}
    }catch(e){
    	 return true;
    }
    if(inspectflag == "1"){
        alert("����Υ�����ݣ�������!");
        return false;
    }else if(inspectflag == "2"){
          if(!confirm("���ڴ������ݣ��Ƿ�ȷ������������")){
              return false;
          } 
    }
    return true;
}



//�ṩ�Զ�����״̬���� add 20120830 
function setltinspectstatusDef(name){
	col = createColumnConfig();
	col.id = "ltinspectstatus";
	col.name = "ltinspectstatus";
	col.type = "S";
	col.title = name;
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["controltypecode"] == null || row["controltypecode"] == "" || row["controltypecode"] == "null"){
			tdobj.innerHTML = "<img src='../../../pay/image/0.gif' alt='ͨ��'/>";
		}
		else if(row["controltypecode"] == 0){
			tdobj.innerHTML = "<img src='../../../pay/image/0.gif' alt='ͨ��'/>";
		}else if(row["controltypecode"] == 1){
			tdobj.innerHTML = "<img src='../../../pay/image/2.gif' alt='Υ��'/>";
		}else if(row["controltypecode"] == 2){
			tdobj.innerHTML = "<img src='../../../pay/image/1.gif' alt='����'/>";
		}else if(row["controltypecode"] == 3){
			tdobj.innerHTML = "<img src='../../../pay/image/1.gif' alt='����'/>";
		}	
	}
	ColumnConfig[col.id.toLowerCase()]=col;	
}

//ָ���ĺŵ�����text3
function selectIntree_text3(mainmenu,submenu,vouchTypeCode,input,elementfilter,inputruleobj,jsFunction){
        var refererurl = ""+window.location.href;
		var	url = ROOT_PATH+"/indi/common/showtree/showIndiTree.do?mainmenu="+getparam("mainmenu")+"&submenu="+getparam("submenu")+"&vchtypecode="+vouchTypeCode+"&elementfilter="+elementfilter
	  			+"&Referer="+refererurl.substring(0,refererurl.indexOf("?"));
		var result = window.showModalDialog(url,window,'dialogHeight:500px;dialogWidth: 425px;resizable: No; status: no;help:No;');
		//var result = window.open(url,'','top=200,left=200,width=750,height=600,scrollbars=yes,resizable=yes,status=yes');
		if (typeof(result)!="undefined" && result != null) {
		   var nameList = result[0].text3+";";
		   for(var i=1;i<result.length;i++){
		      nameList = nameList+result[i].text3+";";
		   }
		   input.value=nameList;
		   var idList = nameList.replace(/;/g,',');
		   input.valueid=idList;
		}
}

//ָ���ĺŵ�����text3
function selectIntree_bdgmanagedivision(mainmenu,submenu,vouchTypeCode,input,elementfilter,inputruleobj,jsFunction){
        var refererurl = ""+window.location.href;
		var	url = ROOT_PATH+"/indi/common/showtree/showIndiTree.do?mainmenu="+getparam("mainmenu")+"&submenu="+getparam("submenu")+"&vchtypecode="+vouchTypeCode+"&elementfilter="+elementfilter
	  			+"&Referer="+refererurl.substring(0,refererurl.indexOf("?"));
		var result = window.showModalDialog(url,window,'dialogHeight:500px;dialogWidth: 425px;resizable: No; status: no;help:No;');
		//var result = window.open(url,'','top=200,left=200,width=750,height=600,scrollbars=yes,resizable=yes,status=yes');
		if (typeof(result)!="undefined" && result != null) {
		   var nameList = result[0].text3+";";
		   for(var i=1;i<result.length;i++){
		      nameList = nameList+result[i].text3+";";
		   }
		   input.value=nameList;
		   var idList = nameList.replace(/;/g,',');
		   input.valueid=idList;
		}
}

//ָ���ĺŵ�����text2
function selectIntree_text2(mainmenu,submenu,vouchTypeCode,input,elementfilter,inputruleobj,jsFunction){
        var refererurl = ""+window.location.href;
		var	url = ROOT_PATH+"/indi/common/showtree/showIndiTree.do?mainmenu="+getparam("mainmenu")+"&submenu="+getparam("submenu")+"&vchtypecode="+vouchTypeCode+"&elementfilter="+elementfilter
	  			+"&Referer="+refererurl.substring(0,refererurl.indexOf("?"));
		var result = window.showModalDialog(url,window,'dialogHeight:500px;dialogWidth: 425px;resizable: No; status: No;help:No;');
		//var result = window.open(url,'','top=200,left=200,width=750,height=600,scrollbars=yes,resizable=yes,status=yes');
		if (typeof(result)!="undefined" && result != null) {
		   var nameList = result[0].text3+";";
		   for(var i=1;i<result.length;i++){
		      nameList = nameList+result[i].text3+";";
		   }
		   input.value=nameList;
		   var idList = nameList.replace(/;/g,',');
		   input.valueid=idList;
		}
}
//ָ���ĺŵ�����text8
function selectIntree_text8(mainmenu,submenu,vouchTypeCode,input,elementfilter,inputruleobj,jsFunction){
        var refererurl = ""+window.location.href;
		var	url = ROOT_PATH+"/indi/common/showtree/showIndiTree.do?mainmenu="+getparam("mainmenu")+"&submenu="+getparam("submenu")+"&vchtypecode="+vouchTypeCode+"&elementfilter="+elementfilter
	  			+"&Referer="+refererurl.substring(0,refererurl.indexOf("?"));
		var result = window.showModalDialog(url,window,'dialogHeight:500px;dialogWidth: 425px;resizable: No; status: No;help:No;');
		//var result = window.open(url,'','top=200,left=200,width=750,height=600,scrollbars=yes,resizable=yes,status=yes');
		if (typeof(result)!="undefined" && result != null) {
		   var nameList = result[0].text3+";";
		   for(var i=1;i<result.length;i++){
		      nameList = nameList+result[i].text3+";";
		   }
		   input.value=nameList;
		   var idList = nameList.replace(/;/g,',');
		   input.valueid=idList;
		}
}

function elementIndexOfArray(array, element) {
	if ("undefined" == typeof(array) || null == array || Array != array.constructor || array.length <= 0)
		return -1;
	for(var i = array.length - 1; i >= 0; i--) {
		if(element == array[i])
			return i;
	}
	return -1;
}

/**
*��֤���۸�����
*/
function checkIcaSign(selectrows,tablename,wfStatusArray) {
	if (null == tablename || "" == tablename)
		return false;
	tablename = tablename.toLowerCase();
	if ("t_glbdgctrl" == dataSourceTableName)
		tablename += ",t_glbdgctrl";
	var billidArray = new Array();
	if (null != selectrows && selectrows.length > 0) {
		var needJudgeSignFlag = true;
		if ("undefined" == typeof(wfStatusArray) || null == wfStatusArray || Array != wfStatusArray.constructor
				|| wfStatusArray.length <= 0)
			needJudgeSignFlag = false;
		
		if ("t_glbdgctrl" == dataSourceTableName) {
			for(var i = selectrows.length - 1; i >= 0; i--){
				if(!needJudgeSignFlag || elementIndexOfArray(wfStatusArray, selectrows[i].wfstatus) >= 0)
					billidArray.push(selectrows[i].ctrlid);
			}
		} else {
			for(var i = selectrows.length - 1; i >= 0; i--){
				if(!needJudgeSignFlag || elementIndexOfArray(wfStatusArray, selectrows[i].wfstatus) >= 0)
					billidArray.push(selectrows[i].billid);
			}
		}
	} else
		return false;
	var success = true;
	var url = ROOT_PATH+'/system/certificatesignature/manage/checkIcaSign.do?random='+Math.random();
	var pars = 'billids=' +billidArray.toString()+ '&tablename=' + tablename;
	var myAjax = new Ajax.Request(url,
					{
						method: 'post',
						parameters: pars,
						onComplete : function(resp) {
							try {
								var json = resp.responseText.evalJSON(true);
								if (null != json.statuCode && 100 == json.statuCode
										&& null != json.warnmsg && "" != json.warnmsg) {
									alert(json.warnmsg);
									success = false;
								}
							} catch (e) {
								success = false;
							}
						},
						onFailure : function(resp) { 
							success = false;
						},
						asynchronous:false
					});
	return success;
}

//ȡ������ʱ���ǩ��������Ϣ
var signColumn = null;
var serverTime = null;
function getSignInfo() {
	if (null != signColumn && "" != signColumn && null != serverTime && "" != serverTime)
		return true;
	var operationMsg = null;
	new Ajax.Request("/system/certificatesignature/manage/getSignInfo.do",
	   		{
				method: "post",
				parameters: "vchtypeid=" + linkvchtypeid,
		   		asynchronous :false,
		   		onComplete : function(resp){
		   			try {
						var json = resp.responseText.evalJSON(true);
						if (null != json.statuCode && 100 == json.statuCode
								&& null != json.warnmsg && "" != json.warnmsg)
							operationMsg = warnmsg;
						else {
							serverTime = json.serverTime;
							signColumn = json.signColumns;
							if (null == signColumn || "" == signColumn)
								operationMsg = "��ȡǩ��������Ϣʧ�ܣ�����ǩ������";
						}
					} catch (e) {
						operationMsg = "��ȡǩ��������Ϣʧ��";
					}
		   		},
				onFailure : function(resp) { 
					operationMsg = "��ȡǩ��������Ϣʧ��";
				}
			});
	if (null != operationMsg){
		alert(operationMsg);
		return false;
	}
	return true;
}

var iTrusPTA = null;
function certSignMessage(datas, wfStatusArray) {
	if (null == iTrusPTA) {
		var div = document.createElement("div");
		div.innerHTML = '<OBJECT id="iTrusPTA" classid="clsid:1E0DFFCF-27FF-4574-849B-55007349FEDA"></OBJECT>';
		iTrusPTA = div.firstChild;
	}
	var Certs;
	var CurCert;
	var OUTPUT_BASE64 = 0x04;
	var CertFilter;
	try  {
		if(null == datas || datas.length < 0)
	    	return false;
		if(!getSignInfo())
			return false;
		if ("undefined" != typeof(serialname) && null != serialname && "" != serialname) {
	        CertFilter = iTrusPTA.Filter;
	        CertFilter.SerialNumber = serialname;
	        Certs = iTrusPTA.MyCertificates;
	        if (Certs.Count == 0) {
	        	alert("û�в��ҵ�֤��!");
	        	return false;
			}
			
			var needJudgeSignFlag = true;
			if ("undefined" == typeof(wfStatusArray) || null == wfStatusArray || Array != wfStatusArray.constructor || wfStatusArray.length <= 0)
				needJudgeSignFlag = false;
        	CurCert=Certs.item(1);
       		var signCol = signColumn.split(',');
  			for (var i = 0; i < datas.length;  i++) {
  				var signStringVal = "";
  				// ���wfStatusArray��ûֵ(needJudgeSignFlagΪfalse)�Ͳ����wfStatusArray�Ƿ�����ü�¼wfstatusֱ��ִ��ǩ��
  				if(!needJudgeSignFlag || elementIndexOfArray(wfStatusArray, datas[i].wfstatus) >= 0){
       				for (var j = 0; j < signCol.length;  j++) {
       					if(null != signCol[j] && "" != signCol[j]){
	       					eval("var signDtVal = datas[i]." + signCol[j]);
	       					if ("undefined" != typeof(signDtVal) && signDtVal !=null && signDtVal != "") {
	       						if (signCol[j] != "amt")
	       							signStringVal += signDtVal;
	       						else {
	       							if (signDtVal.length > 0 && '-' == signDtVal.charAt(0))
	       								signDtVal = signDtVal.substring(1);
	       							signStringVal += formatNumber(signDtVal,"#,###.00");
	       						}
	       						signStringVal += "/";
							} else {
		       					alert("�б�û�����á�" +signCol[j]+ "���ֶλ��߸��ֶε�ֵΪ�գ����ܽ���ǩ��!");
		      	 				return false;
							}
       					}
					}
					// ����û�id��serverTime��ǩ�����ĺ�Ҫ����ļ�¼��
					signStringVal += userid + "/";
					signStringVal += serverTime + "/";
					datas[i].inditext13 = CurCert.SignMessage(signStringVal,OUTPUT_BASE64);
					datas[i].indinumber7 = userid;
					datas[i].inditext16 = serverTime;
  				}
			}	
			return true;
	  	} else {
	      	alert("û�в��ҵ�֤��!");
	      	return false;
	  	}
	} catch(Exception) {
		alert("ǩ��ʧ��!");
		return false;
	}
}
  	
/*
*ǩ����ǩ����
*@params tableData Ҫǩ�������ݼ��ϣ�tdetail,tmain��
*@params checkType Ҫǩ�������ݼ������ͣ���1��Ϊtdetail,����Ϊtmain��
*@params wfStatusArray Ҫִ��ǩ����ǩ�Ĺ�����״̬���ϣ�Array���ͣ���
*                          Ϊnull�Ļ���ֻҪ���ô˷������м�¼��ִ��ǩ������������ǩ��ǩ����ͨ��needVerify���ƣ���
*                          �����ֵ�Ļ���ֻ�е�ǰ��wfStatus�ڴ������еļ�¼��ִ�У�����ִ��
*@params waitingShowMsg �ȴ���ʾ����Ҫ��ʾ���ı�������Ϊnull
*@params needVerify(boolean����) �Ƿ���Ҫ��ǩ������Ϊnull������ǩ��
*@params tableName �������� "T_PLANMAIN"��������Ҫ��ǩ��Ϊnull����
*/
function signMessage(tableData, checkType, wfStatusArray, waitingShowMsg,
		needVerify, tableName) {
	var success = true;
	if ("function" == typeof(beforeSignMessage))
		success = beforeSignMessage();
	if (!success){
		alert("ǩ��ʧ�ܣ�");
		return false;
	}
	var datas, verifyDatas = null;
	// ���ٽ���tableData�Ƿ�δ��������Ƿ�Ϊ�յ��жϣ���������������������Ҫ���ű��Ƿ�����
	if (Array == tableData.constructor)
		datas = tableData;
	else if ("undefined" != typeof(checkType) && "1" == checkType)
		datas = tableData.data;
	else
		verifyDatas = datas = tableData.getSelectedRow();
	if (null == datas || datas.length <= 0){
		alert("��ѡ��Ҫ�����ļ�¼��");
		return false;
	}
	waitingShowMsg = (null == waitingShowMsg || "" == waitingShowMsg) ? "���С�" +datas.length+ "������¼����ǩ�������Ժ�..."
			: waitingShowMsg;
	showWaitDialog(waitingShowMsg);
	if (needVerify) {
		if ("function" == typeof(verifyMainSubAccordance) && !verifyMainSubAccordance()) {
			closeWaitDialog();
			return false;
		}
		verifyDatas = (null == verifyDatas ? tmain.getSelectedRow() : verifyDatas);
		if ("function" == typeof(collectVerifyData))
			verifyDatas = collectVerifyData();
		success = checkIcaSign(verifyDatas, tableName, wfStatusArray);
	}
	if (!success) {
		closeWaitDialog();
		alert("��ǩʧ�ܣ�");
		return false;
	}
	if ("function" == typeof(collectSignData))
		datas = collectSignData();
	success = certSignMessage(datas, wfStatusArray);
	closeWaitDialog();
	return success;
}

/*
*רΪ����ʱ����ǩ
*@params tableName �������� "T_PLANMAIN"������Ϊ��
*@params waitingShowMsg �ȴ���ʾ����Ҫ��ʾ���ı�������Ϊnull�����߲�д
*�������µ��ã�verifySignatureForCreate("T_PLANMAIN", null)����verifySignatureForCreate("T_PLANMAIN")
*			     ����verifySignatureForCreate("T_PLANMAIN", "������ǩ�����Ժ�...")
*/
function verifySignatureForCreate(tableName, waitingShowMsg) {
	var datas = tmain.getSelectedRow();
	if (null == datas || datas.length <= 0){
		alert("��ѡ��Ҫ�����ļ�¼��");
		return false;
	}
	waitingShowMsg = ("undefined" == waitingShowMsg || null == waitingShowMsg || "" == waitingShowMsg) 
						? "���С�" +datas.length+ "������¼������ǩ�����Ժ�..." : waitingShowMsg;
	showWaitDialog(waitingShowMsg);
	var success = checkIcaSign(datas, tableName);
	if (!success)
		alert("��ǩʧ�ܣ�");
	closeWaitDialog();
	return success;
}

function showWaitDialog(waitingShowMsg) {
	var d_dialog;
	if (null != (d_dialog = document.getElementById("LoadStatus"))) {
		document.body.removeChild(d_dialog);
	}
	d_dialog = document.createElement('div');
	d_dialog.id = "LoadStatus";
	var msgLength = waitingShowMsg.length;
	var objHtml = "<table id='waitTable' border=\"0\" cellpadding=\"0\" cellspacing=\"0\">";
	objHtml = objHtml + "<tr><td>";
	objHtml = objHtml
			+ "<div id='waitOutDiv' style='min-width=200px;width=" +(msgLength-0.2)+ "em' class=\"load_out\"><img src=\"/images/actions/loading.gif\" /> ";
	objHtml = objHtml + "<div id='waitInDiv' class=\"load_in\">" + waitingShowMsg
			+ "</div></div>";
	objHtml = objHtml + "</td></tr></table>";
	d_dialog.innerHTML = '' + objHtml + '';
	document.body.appendChild(d_dialog);
	show(null);
}

function closeWaitDialog() {
	var d_mask=document.getElementById('mask');
    var d_dialog = document.getElementById('LoadStatus');
    if (null != d_mask) {
    	d_mask.style.width=0;
        d_mask.style.height=0;
        d_mask.style.visibility='hidden';
    }
    if (null != d_dialog) {
	    d_dialog.style.visibility='hidden';
	    d_dialog.style.display='none';
		document.body.removeChild(d_dialog);
	}
    hiddselect(false);
}

//���÷��ط���
function goBack() {
	var needGoBack = false;
	var selectedRows = tmain.getSelectedRow();
	//���tmain���й�ѡ����Ϊ��Ҫ����
	if (selectedRows.length > 0 && confirm("����δ���棬�Ƿ񱣴����ݣ�")) {
		var buttonValue;
		JQ(":button").each(function(){
			buttonValue = this.value;
			//�ҵ� [����]��ť
			if (null != buttonValue && "" != buttonValue && buttonValue.search(/����/) >= 0 
					&& buttonValue.search(/����/) < 0) {
				this.click();
			}
		});
	}
	else
		needGoBack = true;
	if (needGoBack)
		history.go(-1);
}

/*
*�����տ��˺ŵ����������÷���������Ϊ��ʱ��T_PAYTEMPLATE��ͨ���û�userid�����ѯ����ʽΪ����¼���ѡ��
* modify 20130111 ���õ�λ�����˻�����λ���ݿ��Կ���������bdgagency��
*/
function selectBankByUser(gatheringbankacctname,gatheringbankacctcode,gatheringbankname){
	//  modify 20130111 ���õ�λ�����˻�����λ���ݿ��Կ���������bdgagency��
	var bdgagency = 0;
	try{
		bdgagency = tmain.getSelectedRow()[0].bdgagency;
	}catch(e){
		
	}
	var	url = ROOT_PATH+"/voucher/getvoucherGathertrees/getGatherTrees.do?mainmenu="+getparam("mainmenu")+"&submenu="+getparam("submenu")+"&linkvchtypeid="+linkvchtypeid+"&bdgagency=" +bdgagency;
	var ch = changeOpenObj();
	var result = ch.showModalDialog(url,window,'dialogWidth:600px;dialogHeight:500px;status:no;resizable:yes;help:No;scroll:yes;');
   	if(result != null){	
   		gatheringbankaccount_var = 0;
		gatheringbankacctcode.value = result.bankacctcode;
		gatheringbankacctname.value =  result.bankacctname ;
		gatheringbankname.value = result.bankname ;		
	}
}

/*
 * �����Զ�ƥ���������
 */
function loadChangeAutoMatch(){
	var url = ROOT_PATH+'/common/indiautomatch/loadautomatch.do';
	var myAjax = new Ajax.Request(url,
					{
						method: 'post',
						onComplete : function(resp){
							var result = resp.responseText;
							if (result != "") {
								for (var i =0; i<document.getElementById("query_t").childNodes.length; i++) {
							    	var node = document.getElementById("query_t").childNodes[i];
							    	if (node.innerHTML && node.outerText && node.outerText=="�����Զ�ƥ��" && result=="1") {
							    		node.childNodes[0].childNodes[0].innerHTML = "�ر��Զ�ƥ��";
							   			node.childNodes[0].title = '�ر��Զ�ƥ��';
							   			break;
							    	}
							    }
							} else {
								for (var i =0; i<document.getElementById("query_t").childNodes.length; i++) {
							    	var node = document.getElementById("query_t").childNodes[i];
							    	if (node.innerHTML && node.outerText && node.outerText=="�����Զ�ƥ��") {
							    		node.style.display = "block";
							   			break;
							    	}
							    }
							}
						},
						onFailure : function(resp) { 
							alert("����ʧ�ܣ�");
						}
					});
}

/*
 * �Զ�ƥ��������ؿ���
 */
function doChangeAutoMatch(){
	var url = ROOT_PATH+'/common/indiautomatch/changeautomatch.do';
	var changedate = "";
	var changeMessage = "";
	var node;
	for (var i =0; i<document.getElementById("query_t").childNodes.length; i++) {
    	node = document.getElementById("query_t").childNodes[i];
    	if (node.innerHTML && node.outerText && node.outerText=="�ر��Զ�ƥ��") {
    		changedate = "0";
    		changeMessage = "�����Զ�ƥ��";
   			break;
    	} else if (node.innerHTML && node.outerText && node.outerText=="�����Զ�ƥ��") {
    		changedate = "1";
    		changeMessage = "�ر��Զ�ƥ��";
   			break;
    	}
    }
    show();
    var pars = 'changedate='+changedate;
    var myAjax = new Ajax.Request(url,
					{
						method: 'post',
						parameters: pars,
						onComplete : function(resp){
							var result = resp.responseText;
							if (result != "") {
								node.childNodes[0].childNodes[0].innerHTML = changeMessage;
							   	node.childNodes[0].title = changeMessage;
							}
							closeDiv();
						},
						onFailure : function(resp) { 
							alert("����ʧ�ܣ�");
							closeDiv();
						}
					});
}

/*
 * �����ӵ����ݴ�ӡ��������ͼ����
 */
function printBParaByDetails() {
	var selectrows = tmain.getSelectedRow();
	for (var i=0; i<selectrows.length; i++) {
		var tdata = selectrows[i].details;
		var selectedbillids = "";
		for (var n=0; n<tdata.length; n++) {
			selectedbillids += tdata[n].billid;
			if(n<tdata.length-1)selectedbillids += ",";
		}
		selectrows[i].billid = selectedbillids;
	}
	printBPara();
}

function viewSignature(){
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
	    	if(selectrows[0].vchtypeid==null||selectrows[0].vchtypeid==""){
	    		alert("ȱ�����ã�����ϵϵͳ����Ա���������vchtypeid!");
	    		return;
	    	} else {
	    		subdata.vchtypeid = selectrows[0].vchtypeid;
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
	    //var url="/common/querySignature.do?maindata="+maindata;
	     var url="/common/querySignature/index.do?vchtypeid="+selectrows[0].vchtypeid+"&billid="+selectrows[0].billid;
		  var features = "top=150,left=50,width=750,height=500,scrollbars=yes,resizable=no,status=yes";
	    window.open(url,"ǩ�����",features);
		//formCommonsAuditinfo.maindata.value=maindata;	
	    //formCommonsAuditinfo.submit();
}


/*** add 20120730 �˻أ����ϵȲ������ �ṩ��ѡ���bug46939
tmain:��˵��ݶ���
type�������壺0���϶�Ϊ1 Ҳ����˵��0��Ҫд�������1Ĭ����ͬ��,����д���
auditinfo :Ĭ��������
*/

function fillGoBackAuditInfo(tmain,type,auditinfo){
 var selectrows = tmain.getSelectedRow();
	if (selectrows.length < 1) {
        alert("��ѡ��Ҫ�����ļ�¼��");
        return false;
    }   
    var result = auditinfo;
    if(type==0){
    	
    	// ���ý���ƾ֤���������������Ϊѡ�����ߵ�����.
        //var result = window.showModalDialog("/pay/goBackAuditSelectInfo.jsp?auditinfo="+auditinfo,"",'dialogWidth=400px;dialogHeight=350px;status=yes;toolbar=no;help=no;menubar=no;directories=no;resizable=no;Scrollbars=no');    
    	var result = window.showModalDialog("/pay/getGobackInfo/findinfo.do?auditinfo="+auditinfo+"&linkvchtypeid="+linkvchtypeid+"&mainmenu="+getparam("mainmenu")+"&submenu="+getparam("submenu"),"",'dialogWidth=500px;dialogHeight=350px;status=yes;toolbar=no;help=no;menubar=no;directories=no;resizable=no;Scrollbars=no');
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
//֧Ʊ��Ψһ��֤(����)20140327����ظ���ʾ�޸�BUG11337
function checkIndiText1(){
    var  exists = false;
    var url = ROOT_PATH+'/bcommon/pay/voucher/common/action/isleaf.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>';
    var pars = 'inditext1=' + $("detailform").inditext1.value;
    var myAjax = new Ajax.Request(
	                    url,
	                    {method: 'post', asynchronous: false,parameters: pars, onComplete: function printout(resp){ 
	                     var rs = resp.responseText;  
                            if(rs==""){
                                 exists = false;
    						}else if(rs!=null&&rs!= ""){
    							if('noonlyshowmess'==rs){
    								exists= !(confirm("��֧Ʊ����ʹ�ã��Ƿ����¼�룿"));
    							}else{
    						   exists=true;
    						   alert(rs);}
    						}
    						else{
    						   exists = false;
    						} 
    				}		 
    				,onFailure:function(e){exists=true;}
    				});
    				return exists;      
}

//֧Ʊ�Ÿ��ݽ��㷽ʽ�ж��Ƿ����(����) add 20131123 bug 8923 �ൺ
function isNullIndiText1BySettlemode(){
	if(typeof($("detailform").settlemode)!="undefined" &&$("detailform").settlemode.value!=""){
		if(typeof($("detailform").inditext1)!="undefined" &&$("detailform").inditext1.value!=""){
		}
		var settlemode_code = $("detailform").settlemode.value.split("-")[0];
		if(typeof($("detailform").inditext1)!="undefined" &&$("detailform").inditext1.value==""
			&&(settlemode_code=="2"||settlemode_code=="3")){
			alert("���㷽ʽΪת��֧Ʊ�����ֽ�֧Ʊ��֧Ʊ�ű��");
			return false;
		}
	}
	return true;
}

// add 20120831 ����  ����  function drawauditcol()
col = createColumnConfig();
col.id = "audit";
col.name = "audit";
col.type = "S";
col.title = "���";
col.show = function(rownum,value,row,tdobj,datatable){
		tdobj.innerHTML = "<img src='../../../ifmis_images/done_btn/audit.gif' alt='���' onclick='auditflag=1;' />";
}
ColumnConfig[col.id.toLowerCase()]=col;	

function showFilesInfo(billid) {
	var url="/indi/filesinfo.do?billid="+billid;
	var features = "top=150,left=50,width=750,height=500,scrollbars=yes,resizable=yes";
    window.open(url,"�������",features);
}

// �ض���indinumber9�е���ʾ
col = createColumnConfig();
col.id = "indinumber9";
col.name = "indinumber9";
col.type = "S";
col.title = "������ʶ";
col.show = function(rownum,value,row,tdobj,datatable){
	var aInnerHTML;
	if (1 == value)
		aInnerHTML = "<img src='/indi2exe/common/attachment.gif' alt='�и���' onclick='showFilesInfo("+row.billid+")'/>";
	else
		aInnerHTML = "";
	tdobj.innerHTML = aInnerHTML;
}
ColumnConfig[col.id.toLowerCase()]=col;

/*
*�����տ��˺ŵ����������÷���������Ϊ��ʱ��T_PAYTEMPLATE�������˻���T_PUBBANKACCOUNT����ʽΪ����¼���ѡ��
*/
function selectAllBankAccount(agencyId,gatheringbankacctname,gatheringbankacctcode,gatheringbankname){
	if(agencyId==null) 
	{
	    alert("��ѡ����Դ����");
		return;
	}
	var	url = ROOT_PATH+"/voucher/getAllGatherTrees/getAccountTrees.do?agency="+agencyId+"&linkvchtypeid="+linkvchtypeid+"&mainmenu="+getparam("mainmenu")+"&submenu="+getparam("submenu");
	var result = window.showModalDialog(url,'','dialogWidth:600px;dialogHeight:500px;status:no;resizable:yes;help:No;scroll:yes;');
   	if(result != null){				
		gatheringbankacctcode.value = result.bankacctcode;
		gatheringbankacctname.value =  result.bankacctname ;
		gatheringbankname.value = result.bankname ;
		gatheraccount = result.bankaccount;		
	}
}

/*
* �����������ݶ�ȱ��뵼��
*/
function checkExporttagForClear(){
	show();
	var exists = false;
	var selectedRows = tmain.getSelectedRow();
    if ( selectedRows == null || selectedRows.length <= 0) {
    	alert("��ѡ��һ������!");
    	closeDiv();
    	return false;
    } 
    var billids = selectedRows[0].billid;
    for(var i=1,selectSize=selectedRows.length; i<selectSize; i++){
		billids = billids + "," + selectedRows[i].billid;
	}
	var url = '/bank/BankAction/checkExporttagForClearAction.do';
	var pars = 'billids=' + billids ;
   	var myAjax = new Ajax.Request(url,
   								{method: 'post', 
   									parameters: pars,
   									onComplete : function afterCheckExporttag(resp) {
										var rs = resp.responseText;  
                            			if ( rs != null && rs != "" ) {
    						   				exists=true;
    						   				alert(rs);
    									} 
    									closeDiv();
									},
							 		onFailure : function(resp) {
							 			closeDiv();alert("��ȵ���У�����δ֪�쳣������ʧ��!");
							 		},
							 		asynchronous:false
							 	});
	if (!exists) {
		return true;
	} else {
		return false;
	}
}

/*
*��ĳ�����Եĵ��ݽ��в���ʱ���Բ���������ʾ
*���ѡ������к��������colname���򵯳�info��ͬʱ����false�����򷵻�true��
*���û��ѡ���򷵻�true
*@tmain����������
*@ colname ����
*@colvalues  ����ֵ  �����ʽ[00,01]
*@info  ��ʾ��Ϣ
checkDetailCandoIt(tmain,'wfstatus',['00','01'],"�����޸�00��01������")
*/
function checkDetailCandoIt(tmain,colname,colvalues,info){
	var selectRows = tmain.getSelectedRow();
	if (selectRows.length < 1) {   
        return true;
    }
    var selectedbillids = 'selectedbillids=' + selectRows.billids;
    var checkCodes = "";
    for (var n = 0; n < colvalues.length; n++) {
    	checkCodes = checkCodes + colvalues[n] + ",";
    }
    var success = true;
	var url = ROOT_PATH+'/common/indi/checkDetailCandoIt.do';
	var pars = selectedbillids + '&checkCodes=' + checkCodes + '&colname=' + colname + '&info=' + info;
	show();
	var myAjax = new Ajax.Request(url,
					{
						method: 'post',
						parameters: pars,
						onComplete : function(resp) {
							var rs = resp.responseText;  
                        	if ( rs != null && rs != "" ) {
						   		success = false;
						   		alert(rs);
							} 
							closeDiv();
						},
						onFailure : function(resp) { 
							alert("����ʧ�ܣ�");
							closeDiv();
						},
						asynchronous:false
					});
	return success;
}

/**
 * ��ѡ��Դ������󣬸���ѡ���������ֵ�����ϸ����֧������Դ�Ķ�ѡ��.
 * @param colid ���룬����������Сд��
 * @param elementFilter ��ѡ����ѡ��ѡ������������ͱ༭����Ĺ������������÷���һ��
 */
function multiAddDetailBySelectTree(colid, elementFilter) {
	// ���Ϊtdetail˵��������Դ�ģ�����Ϊ����Դ��
	var dataTableObj = ("undefined" != typeof(tdetail) ? tdetail : tmain);
	var inputObj = $(colid+"Temp");
	if (null == inputObj) {
		inputObj = document.createElement("<input type=hidden id="+colid+"Temp />");
		document.body.appendChild(inputObj);
	} else  {
		// ��ε��ø÷���ʱ�������һ��ѡ�������
		inputObj.value = null;
		inputObj.valueid = null;
		inputObj.isleaf = null;
		inputObj.valuecode = null;
	}
	elementFilter = ("undefined" == typeof(elementFilter) || null == elementFilter ? "" : elementFilter);
	// ���ÿ��ѡ����
	selectMutlElememt(dataTableObj.mainmenu, dataTableObj.submenu, dataTableObj.vchtypecode+"", colid, inputObj, "", elementFilter, null);
	if ("undefined" == inputObj.value || null == inputObj.value || "undefined" == inputObj.valueid || null == inputObj.valueid)
		return;
	
	var codeNamePairArray = inputObj.value.split(";");
	var itemidArray = inputObj.valueid.split(",");
	inputObj.isleaf = ("undefined" != typeof(inputObj.isleaf) && null != inputObj.isleaf ? inputObj.isleaf : "");
	var isleafArray = inputObj.isleaf.split(",");
	isleafArray = (isleafArray.length != itemidArray.length ? null : isleafArray);
	var mainRow;
	// ���������ӵ����ݵ�ԭ��
	if (dataTableObj != tmain)
		mainRow = Object.clone(tmain.getSelectedRow()[0]);
	else
		mainRow = new Object();
	// ͬ���༭�����ݵ��ӵ�ԭ��
	if ("function" == typeof(maindatasynchtoObj))
		maindatasynchtoObj(mainRow);
	if ("function" == typeof(datasynchtoObj))
		datasynchtoObj(mainRow);
	dataTableObj.selectedallrows(false);
	var newRow = null;
	var codeNamePair;
	for(var i = 0; i < itemidArray.length; i++) {
		if ("" != itemidArray[i] && (null == isleafArray || 1 == isleafArray[i])) {
			newRow = Object.clone(mainRow);
			newRow.amt = "";
			newRow.checked = true;
			codeNamePair = codeNamePairArray[i].split("-");
			newRow[colid] = itemidArray[i];
			newRow[colid+"_code"] = codeNamePair[0];
			newRow[colid+"_name"] = codeNamePair[1];
			dataTableObj.appendRow(newRow);
		}
	}
	// ����䲢�Ǳ��룬��ʵ��������������÷����ı��벿�֣���Ҫ��Ϊ�˼�������Դ����������radio��Ϊcheckbox�󣬸��ٵ��޸Ĵ��룩
	if ("undefined" != detailObj)
		detailObj = newRow;
	dataTableObj.draw();
}

/**
 * ��������billid�����ӵ�.
 * @param billid ����billid
 */
function getDetails(url, billid) {
	show(null);
	new Ajax.Request(url, {
		method: "post",
		parameters: "billid="+billid,
		onComplete: function(resp) {
			closeDiv();
			try {
				var json = resp.responseText.evalJSON(true);
				if (null != json.statuCode && 100 == json.statuCode
						&& null != json.warnmsg && "" != json.warnmsg) {
					alert(json.warnmsg);
					return;
				}
				tdetail.data = eval(json.vous);
				tdetail.show();
			} catch (e) {
				alert("��ȡ��ϸ����ʧ�ܣ������ԣ�");
			}
		},
		onFailure : function(resp) {
			closeDiv();
			alert("��ȡ��ϸ����ʧ�ܣ������ԣ�");
		}
	});
}

/**
 * ������ӽṹ��һ���ԣ���ҪΪ����ǩʱʹ�ã�
 * @param billids ����billids
 * @param mainTable ��������
 * @param subTable �ӵ�����
 * @param subForeignKeyForMain �ӵ�����������billid�������ʶ����Ϊ�գ����Ϊ�գ���Ĭ��Ϊmainid
 * @param checkColumn �����������԰�Ƕ��ŷָ�������Ϊ�գ����Ϊ�������ǩ�������У���amt����У��
 */
function checkMainSubAccordance(billids, mainTable, subTable, subForeignKeyForMain, checkColumn) {
	subForeignKeyForMain = ("undefined" == typeof(subForeignKeyForMain) || null == subForeignKeyForMain
								|| "" == subForeignKeyForMain ? "mainid" : subForeignKeyForMain);
	if ("undefined" == typeof(checkColumn) || null == checkColumn || Array != checkColumn.constructor) {
		if (getSignInfo())
			checkColumn = signColumn.replace("amt","").replace(/\s+/g,"").replace(/(^,+|,+$)/g,"").replace(/,{2,}/g,",");
		else checkColumn = "";
	}
	var success = true;
	var myAjax = new Ajax.Request("/system/certificatesignature/manage/checkMainSubAccordance.do",
			{
				method: "post",
				parameters: "vchtypeid="+linkvchtypeid+"&billids="+billids+"&mainTable="+mainTable+"&subTable="+subTable
								+"&subForeignKeyForMain="+subForeignKeyForMain+"&checkColumn="+checkColumn,
				onComplete : function(resp) {
					try {
						var json = resp.responseText.evalJSON(true);
						if (null != json.statuCode && 100 == json.statuCode
								&& null != json.warnmsg && "" != json.warnmsg) {
							alert(json.warnmsg);
							success = false;
						}
					} catch (e) {
						success = false;
						alert("����ʧ�ܣ�");
					}
				},
				onFailure : function(resp) { 
					success = false;
					alert("����ʧ�ܣ�");
				},
				asynchronous:false
			});
	return success;
}

/**
 * ���������ˢ�±�ҳ�� 
 */
function returnBack() {
	if(window.location.href.indexOf("?") > -1){
 		window.location.href = window.location.href.replace("?","?fromquery=yes&");
 	} else {
		window.location.reload();
	}
}

//�տ��˺��Ƿ��Ӧ����տ��˻�����֤(����)
function checkPayeeAcctcodeUniqueness(tdetail){
    var continueSave = true;
    if (tdetail == null || tdetail.data == null || tdetail.data.length == 0) {
        return continueSave;
    }
    
    var code = new Array();
    var name = new Array();
    for (var n = 0; n < tdetail.data.length; n++) {
        var row = tdetail.data[n];
        if ("undefined" != typeof(row.gatheringbankacctcode) && null != row.gatheringbankacctcode && "" != row.gatheringbankacctcode) {
            code[code.length] = row.gatheringbankacctcode;
            name[name.length] = row.gatheringbankacctname;
        }
    }
    if (code.length == 0) {
        return continueSave;
    }
    
    var url = ROOT_PATH + '/common/pay/checkPayeeAcctcodeUniqueness.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>';
    var pars = 'gatheringbankacctcode=' + code + '&gatheringbankacctname=' + name + "&linkvchtypeid="+linkvchtypeid;
    var myAjax = new Ajax.Request(url, {
        				method: 'post',
        				asynchronous: false,
        				parameters: pars,
        				onComplete: function (resp){
            				var rs = resp.responseText;
                			if (rs != null && rs != "") {
                    			if(confirm(rs)){
									continueSave = true;
								}else{
									continueSave = false;
								}
                			}else {
                    			continueSave = true;
                			}
        				},
        				onFailure: function(e){
							alert("����տ��˺�Ψһ�Գ��������ԣ�");
            				continueSave = false;
        				}
    				});
    return continueSave;
}

//�鿴��Ŀ��Чָ�깦��
function checkprogram(tmain){
	if(tmain.getSelectedRow().length > 0) {
		if (tmain.getSelectedRow().length > 1) {
			alert("��ѡ�������ݽ��в鿴!");
		} else {
			var code = tmain.getSelectedRow()[0].billid;
			var bdgagency = tmain.getSelectedRow()[0].bdgagency;
			var url = ROOT_PATH + '/indi/checkprogram/getPdmsProjectid.do?mainmenu=<c:out value="${param.mainmenu}"/>&submenu=<c:out value="${param.submenu}"/>';
    		var pars = 'billid=' + code;
			var myAjax = new Ajax.Request(url, {
        				method: 'post',
        				asynchronous: false,
        				parameters: pars,
        				onComplete: function (resp){
            				var rs = resp.responseText;
                			if (rs != null && rs != "") {
								if(rs.isNumber()){
									var pars = "?billids="+rs+"&bdgAgencyid="+bdgagency+"&mainmenu="+getparam("mainmenu")+"&submenu="+getparam("submenu")+"&flag=0&flag2=0&flag3=1";
									var url = ROOT_PATH+'/pdms/collection/fillpdms/checkForm.do'+pars;
									var features = "top=150,left=50,width=750,height=521,scrollbars=yes,,resizable=yes,status=yes";
    								window.open(url, "�鿴��Ŀ��Ч", features);
								}else{
									alert(rs);
								}
                			}
        				},
        				onFailure: function(e){
							alert("����ʧ�ܣ�");
        				}
    				});
		}
	}else{
		alert("��ѡ��Ҫ�鿴�ĵ���!");
	}
}

//�����ϴ�
function upload_plan(){
	var selectRow=new Array();
 	var num=tmain.getSelectedRow(); 
 	if(num.length<1){
 		alert("��ѡ��Ҫ�����ĵ��ݣ�");
  	  	return;
 	}
  	if(num.length>1){
  		alert("ֻ��ѡ��һ����������");
  	  	return;
  	}
  	var url = ROOT_PATH + '/plan/common/manage/uploadfile/index.do?maindata='+num[0].billid;
	window.open(url,"_blank","status=yes,scrollbars=yes,toolbar=no,menubar=no,location=no");
}

// ��ѯָ�긽����Ϣ
function show_files_plan() {
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
    	if(selectrows[0].billid==null||selectrows[0].billid==""){
    		alert("ȱ�����ã�����ϵϵͳ����Ա���������billid!");
    		return;
    	} else {	
    		subdata.billid = selectrows[0].billid;
    	}	
    }catch (e){
    	
    }
    var maindata=Object.toJSON(subdata);
    var url="/plan/filesinfo.do?billid="+selectrows[0].billid;
	var features = "top=150,left=50,width=750,height=500,scrollbars=yes,resizable=yes";
    window.open(url,"�������",features);
}

function doWorkVou(operateType,printPara){
	doCommonAction(operateType,'false',printPara);
}

function doCancelWorkVou(operateType){
	doCommonAction(operateType,'true');
}

// ͨ�ò�������
function doCommonAction(operateType,iscancel,printPara) {
	
	var selectrows = tmain.getSelectedRow();
	if (selectrows==null||(selectrows != null && selectrows.length < 1)) {
        alert("��ѡ��Ҫ������¼��");
        return;
    }
	show();
	var url = ROOT_PATH + '/bcommon/CommonWorkAction.do';	
	var subdata = new Array();
	for(var i= 0;i<selectrows.length;i++){
   		var rowObj = selectrows[i];
   		if(rowObj.billid!=null){
   			var newRow = new Object();
   			newRow.billid = rowObj.billid;
   			newRow.auditOpinion = rowObj.auditOpinion;
   			newRow.lastupdatetime = rowObj.lastupdatetime; 
   			subdata[subdata.length]=newRow;
   		}
   	}
   	if(subdata.length<1){
   		alert("�㵱ǰδѡ�е��ݻ�ǰ�����ò���ȷ���������Ա��ϵ��");
   		closeDiv();
   		return;
   	}
   	//Ĭ�ϸ���˲���
   	if(typeof(operateType)=='undefined'){
   		operateType = '7';
   	}
   	var pars = 'maindata=' + subdata.toJSON() +'&operatetype='+operateType+'&iscancel='+iscancel+'&submenu='+getArgs()["submenu"];
   	var myAjax = new Ajax.Request(url,{method: 'post', parameters: pars,onComplete : function (resp){afterDoCommonAction(resp,printPara);},
							 onFailure : function(resp) {
							 	closeDiv();alert("���Ĳ�������δ֪�쳣������ʧ�ܣ�");
							 }});
}

//ͨ�ò��������ص�����
function afterDoCommonAction(resp,printPara){
   
	var json = resp.responseText.evalJSON(true);
    if(json.statuCode!=null && json.statuCode==100 && json.warnmsg !=null && json.warnmsg!=""){
    	alert(json.warnmsg);
    }
    if(printPara!='undefined' && typeof(printPara)=='function' ){
    	printBPara();
    	
    }
    
    if(typeof(tabpage_main)!='undefined' && tabpage_main.tabNames.length > 0){
    	
    	tabclick(tabpage_main.currentSelectedTabIndex); 
    	return;
    }
    
    // ��ûҳǩʱ��,��ˢ��ҳ���������µ���״̬
    if(json.vous!=null){
	    var apps = json.vous;    
	    //alert(apps.toJSON());
	    var selectrows =  tmain.getSelectedRow();
	    for(var i= 0; i<apps.size();i++) {
	    	for(var j=0;j<selectrows.length;j++){
	    		if(apps[i].billid==selectrows[j].billid){
	    			selectrows[j].wfstatus_code=apps[i].wfstatus_code;
	    			selectrows[j].wfstatus_name=apps[i].wfstatus_name;
	    			selectrows[j].wfstatus = apps[i].wfstatus;
	    			selectrows[j].userid = apps[i].userid;
	    			selectrows[j].lastupdatetime = apps[i].lastupdatetime;
	    			//���¼���ֶ�
	    			if(apps[i].inspectresult != undefined ){
	    				selectrows[j].inspectresult = apps[i].inspectresult;	
	    			}
	    			if(apps[i].controltypecode != undefined){
	    				selectrows[j].controltypecode = apps[i].controltypecode;
	    			}
	    			if(apps[i].linkname != undefined){
	    				selectrows[j].linkname = apps[i].linkname;
	    			}
	    			if(apps[i].linktel != undefined){
	    				selectrows[j].linktel = apps[i].linktel;
	    			}
	    			if(apps[i].rulearray != undefined){
	    				selectrows[j].rulearray = apps[i].rulearray;
	    			}
	    		}
	    	}
	    }
    }
    tmain.draw();
    closeDiv();
  
}
//����׷��ָ��
function show_all_assigned_Indi(){
    var selectedRow = tmain.getSelectedRow();
    if(selectedRow.length==0){
      	alert("������ѡ��1����¼��Ȼ��[����׷��ָ��]��");
      	return false;
    }
    if(selectedRow.length>1){
      	alert("ֻ��ѡ��1����¼��Ȼ��[����׷��ָ��]��");
      	return false;
    }
	if(selectrows[0].billid==null||selectrows[0].billid==""){
    	alert("ȱ�����ã�����ϵϵͳ����Ա���������billid!");
    	return;
    }
    var billid = selectedRow[0].billid;
    var url = ROOT_PATH+"/commons/showAllAssignedIndiAction.do?";
    url = url + "&billid="+billid;
	var features = "top=150,left=50,width=750,height=450,scrollbars=yes,,resizable=yes,status=yes";
    window.open(url, "����׷��ָ��", features);
}
/**
 * ��˲��´�
 */
function auditorassign(textno) {
	var url ="/indi/totalindiload/audit/auditorassign.do";
	if (hasChecked()) {
		var selectRow = new Array();
		for(var i = 0; i < tmain.getSelectedRow().length; i++){
			selectRow[i] = tmain.getSelectedRow()[i].billid;
		}
		var auditOpinion = 'auditOpinion=' + tmain.getSelectedRow()[0].auditOpinion;
        var selectedbillids = 'selectedbillids=' + selectRow + '&isCancel=false';
        var pars = selectedbillids + '&'+auditOpinion;
        if(typeof(JQ)!="undefined" && textno!=null){
        	pars = pars + '&textno='+textno;
        }
        show();
	   	var myAjax = new Ajax.Request(url,
					   	{
						   	 method: 'post',
						   	 parameters: pars,
						   	 onComplete : afterOperation,
							 onFailure : function(resp) { 
								 closeDiv();
								 alert("����ʧ��!");
							 }
						});
    } else {
    	alert("��ѡ��Ҫ�����ĵ���!");
    }
}
/**
 * ȡ����˲��´�
 */
function cancelauditorassign(textno) {
	var url ="/indi/totalindiload/audit/cancelauditorassign.do";
	if (hasChecked()) {
		var selectRow = new Array();
		for(var i = 0; i < tmain.getSelectedRow().length; i++){
			selectRow[i] = tmain.getSelectedRow()[i].billid;
		}
		var auditOpinion = 'auditOpinion=' + tmain.getSelectedRow()[0].auditOpinion;
        var selectedbillids = 'selectedbillids=' + selectRow + '&isCancel=true';
        var pars = selectedbillids + '&'+auditOpinion;
        if(typeof(JQ)!="undefined" && textno!=null){
        	pars = pars + '&textno='+textno;
        }
        show();
	   	var myAjax = new Ajax.Request(url,
					   	{
						   	 method: 'post',
						   	 parameters: pars,
						   	 onComplete : afterOperation,
							 onFailure : function(resp) { 
								 closeDiv();
								 alert("����ʧ��!");
							 }
						});
    } else {
    	alert("��ѡ��Ҫ�����ĵ���!");
    }
}

//ָ�긽���ϴ�
function upload_indi(){
	var selectRow=new Array();
 	var num=tmain.getSelectedRow(); 
 	if(num.length<1){
 		alert("��ѡ��Ҫ�����ĵ��ݣ�");
  	  	return;
 	}
  	if(num.length>1){
  		alert("ֻ��ѡ��һ����������");
  	  	return;
  	}
  	var url = ROOT_PATH + '/indi/common/manage/uploadfile/index.do?maindata='+num[0].billid;
	window.open(url,"_blank","status=yes,scrollbars=yes,toolbar=no,menubar=no,location=no");
}

// ��ѯָ�긽����Ϣ
function show_files_indi() {
	var selectrows = tmain.getSelectedRow();
    if(selectrows.length==0){
      alert("��ѡ��Ҫ�鿴�ļ�¼");
      return false;
    }
    if(selectrows.length>1){
      alert("ֻ��ѡ��һ����¼�鿴");
      return false;
    }
    var url="/indi/uploadfile/filesinfo.do?billid="+selectrows[0].billid+"&vchid="+linkvchtypeid+"&document="+selectrows[0].text3;
	var features = "top=150,left=50,width=750,height=500,scrollbars=yes,resizable=yes";
    window.open(url,"�������",features);
}

// ֧�������û���ѯ������Ϣ
function show_files_pay() {
	var selectrows = tmain.getSelectedRow();
    if(selectrows.length==0){
      alert("��ѡ��Ҫ�鿴�ļ�¼");
      return false;
    }
    if(selectrows.length>1){
      alert("ֻ��ѡ��һ����¼�鿴");
      return false;
    }
    var url="/pay/uploadfile/filesinfo.do?billid="+selectrows[0].billid+"&vchid="+linkvchtypeid+"&document="+selectrows[0].text3;
	var features = "top=150,left=50,width=750,height=500,scrollbars=yes,resizable=yes";
    window.open(url,"�������",features);
}

// �����û���ѯ������Ϣ
function show_files_bank() {
	var selectrows = tmain.getSelectedRow();
    if(selectrows.length==0){
      alert("��ѡ��Ҫ�鿴�ļ�¼");
      return false;
    }
    if(selectrows.length>1){
      alert("ֻ��ѡ��һ����¼�鿴");
      return false;
    }
    var url="/pay/uploadfile/bankfilesinfo.do?billid="+selectrows[0].billid+"&vchid="+linkvchtypeid+"&document="+selectrows[0].text3;
	var features = "top=150,left=50,width=750,height=500,scrollbars=yes,resizable=yes";
    window.open(url,"�������",features);
}

// ֧�������û����ø�����ʾ���
function show_delfiles() {
	var selectrows = tmain.getSelectedRow();
    if(selectrows.length==0){
      alert("��ѡ��Ҫ�鿴�ļ�¼");
      return false;
    }
    if(selectrows.length>1){
      alert("ֻ��ѡ��һ����¼�鿴");
      return false;
    }
    var url="/pay/uploadfile/delfilesinfo.do?billid="+selectrows[0].billid+"&vchid="+linkvchtypeid+"&document="+selectrows[0].text3;
	var features = "top=150,left=50,width=750,height=500,scrollbars=yes,resizable=yes";
    window.open(url,"�������",features);
}

//֧�������ϴ�
function upload_pay(isVch){
	var selectRow=new Array();
 	var num=tmain.getSelectedRow(); 
 	if(num.length<1){
 		alert("��ѡ��Ҫ�����ĵ��ݣ�");
  	  	return;
 	}
  	if(num.length>1){
  		alert("ֻ��ѡ��һ����������");
  	  	return;
  	}
  	var url = ROOT_PATH + '/indi/pay/manage/uploadfile/index.do?maindata='+num[0].billid+"&isVch="+isVch;
	window.open(url,"_blank","status=yes,scrollbars=yes,toolbar=no,menubar=no,location=no");
}

//��ѯ֧��������Ϣ
function show_payfiles(isVch) {
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
    	if(selectrows[0].billid==null||selectrows[0].billid==""){
    		alert("ȱ�����ã�����ϵϵͳ����Ա���������billid!");
    		return;
    	} else {	
    		subdata.billid = selectrows[0].billid;
    	}	
    }catch (e){
    	
    }
    var maindata=Object.toJSON(subdata);
    var url="/indi/pay/filesinfo.do?billid="+selectrows[0].billid+"&isVch="+isVch;
	var features = "top=150,left=50,width=750,height=500,scrollbars=yes,resizable=yes";
    window.open(url,"�������",features);
  
}
//���㷽ʽΪ�ֽ�ʱ �տ�������Ĭ��ΪԤ�㵥λ
function show_bdgagencyByPaytype(settlemode){
	var value = settlemode.value;
	if(value == null || value == undefined){
		return;
	}
	if(value.split("-")[0] == 1){
		var selectrows = tmain.getSelectedRow();
		if(selectrows.length == 0){ 
			return;
		}
		
		if($('gatheringbankacctname')!=null){
			$('gatheringbankacctname').value = selectrows[0].bdgagency_name;
			$('gatheringbankacctname').disabled=true;
		}
		
		if($('gatheringbankacctcode')!=null){
			$('gatheringbankacctcode').value = "";
			$('gatheringbankacctcode').disabled=true;
		}
		
		if($('gatheringbankname')!=null){
			$('gatheringbankname').value = "";
			$('gatheringbankname').disabled=true;
		}
		
		if($('gatheringbankacctname_btn')!=null){$('gatheringbankacctname_btn').disabled=true;}
		if($('gatheringbankacctcode_btn')!=null){$('gatheringbankacctcode_btn').disabled=true;}
		if($('gatheringbankname_btn')!=null){$('gatheringbankname_btn').disabled=true;}
	}else{
		if($('gatheringbankacctname')!=null){
			$('gatheringbankacctname').disabled=false;
		}
		
		if($('gatheringbankacctcode')!=null){
			$('gatheringbankacctcode').disabled=false;
		}
		
		if($('gatheringbankname')!=null){
			$('gatheringbankname').disabled=false;
		}
		
		if($('gatheringbankacctname_btn')!=null){$('gatheringbankacctname_btn').disabled=false;}
		if($('gatheringbankacctcode_btn')!=null){$('gatheringbankacctcode_btn').disabled=false;}
		if($('gatheringbankname_btn')!=null){$('gatheringbankname_btn').disabled=false;}
	}
}

//ָ���ĺŶ�λ
function selectIndiSymbol(obj){
	var num = obj.value.length>0?obj.value.length-1:0;
    var range=obj.createTextRange(); 
    range.collapse(true);
    range.moveStart('character',num);
    range.select();
}

// ��װ����
function _toDataJSON(datas){
	var str = ["["],str1,data;
	for (var i = 0, il = datas.length; i < il; i++) {
		data = datas[i],str1=['{'];
		str1.push('"billid":"' + data['billid'] + '",');
		str1.push('"lastupdatetime":"' + data['lastupdatetime']+'"}');
		if (i < il-1) str1.push(',');
		str.push(str1.join(""));
	} 
	str.push("]");
	return str.join("");
}

// �������⴦��
function showAlertTime(datas) {
	if (datas.length > 2000) {
		var thinkMin = parseInt(datas.length/1000);
		alert("Ԥ��"+thinkMin+"���Ӻ����꣬��"+thinkMin+"���Ӻ�ˢ�£�");
	}else{
		alert("Ԥ��1�����ڴ����꣬��1���Ӻ�ˢ�£�");
	}
	closeDiv();
	return;
}
/***
tmain:��˵��ݶ���
type�������壺0���϶�Ϊ1 Ҳ����˵��0��Ҫд�������1Ĭ����ͬ��,����д������,2Ϊ���������������ʾ�����Ϣ
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
        var result = window.showModalDialog("/common/AuditRemark.jsp?auditinfo="+auditinfo,'','dialogWidth=400px;dialogHeight=280px;status=yes;toolbar=no;help=no;menubar=no;directories=no;resizable=no;Scrollbars=no');    
    }else if(type==2){
    	var selectrowsTemp = getSelectedRowId(tmain);
    	var	url = ROOT_PATH+"/common/audit/AuditRemak.do?mainmenu="+getparam("mainmenu")+"&submenu="+getparam("submenu")+"&linkvchtypeid="+linkvchtypeid+"&auditinfo="+auditinfo+"&selectrows="+selectrowsTemp.toJSON();
    	var result = window.showModalDialog(url,window,'status:no;resizable:no;help:No;');
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
 * �жϱ༭���Ƿ��޸� 
 * @returns
 */
function checkeditchange(ischangeedit){
    if(tdetail.data.length==0){
		return false;
	}else{
	   	if(ischangeedit){
	   		return true;
	   	}else{
	   	   return false;
	   	}
	  	
	}
}

//�Զ���
col = createColumnConfig();
col.id = "amt11";
col.name = "amt11";
col.type = "S";
col.title = "�����ƻ�����";
col.style = "text-align:right";
col.show = function(rownum,value,row,tdobj,datatable){
	value = value+"";
	tdobj.innerHTML = value.toMoneyFormat()+"%";
}
ColumnConfig[col.id.toLowerCase()]=col;

col = createColumnConfig();
col.id = "amt14";
col.name = "amt14";
col.type = "S";
col.title = "����֧������";
col.style = "text-align:right";
col.show = function(rownum,value,row,tdobj,datatable){
	value = value+"";
	tdobj.innerHTML = value.toMoneyFormat()+"%";
}
ColumnConfig[col.id.toLowerCase()]=col;

/**
 * ����������ƹ���У��֧����ʽ by yanglin 20140626 BUG20536
 * @param vchcode ҵ��ƾ֤
 * @param sourcelement У���ֶ�
 * @param onobject �༭��У���ֶ�ֵ
 * @returns
 */
function checkPaytype(vchcode,sourcelement,onobject){
	  var selectrows = tdetail.getSelectedRow();  
	  var url = ROOT_PATH + '/indi/common/checkpaytype.do';
	  var issucces=false;
	  var test=onobject;
	  var pars = 'detaildata=' + Object.toJSON(selectrows) + '&vchcode=' +vchcode+"&sourcelement="+sourcelement+"&onobject="+onobject ;
	   var myAjax = new Ajax.Request(url,
	   							{method: 'post', 
	   							parameters: pars,
	   							onComplete: function afterSave(resp){ 
	   							   var json = resp.responseText.evalJSON(true);
	   							if(json.statuCode!=null && json.statuCode==100 && json.warnmsg !=null && json.warnmsg!=""){
	   						    	alert(json.warnmsg);
	   						    }else{
	   						    	issucces=true;
	   						    }},
	   							 asynchronous:false,
	   						     onFailure : function(resp) { 
								 	alert("�ֶ�У��ʧ�ܣ�");
								 }
	   							});
	if(!issucces){
		$(sourcelement).value="";
	}   

}

/**
 * ����������ƹ���У��֧����ʽ by yanglin 20140626 BUG20536(����ʱУ��)
 * @param vchcode ҵ��ƾ֤
 * @param sourcelement У���ֶ�
 * @param onobject �༭��У���ֶ�ֵ
 * @returns
 */
function saveCheckPaytype(vchcode,sourcelement){
	var newdatas = new Array() ;
  	for (var i = 0; i < tdetail.data.length; i++) {
    	if (tdetail.data[i].amt > 0) {
       		newdatas[newdatas.length] = tdetail.data[i] ;
    	}
  	}
	var url = ROOT_PATH + '/indi/common/savecheckpaytype.do';
	var issucces=false;
	var pars = 'detaildata=' + Object.toJSON(newdatas) + '&vchcode=' +vchcode+"&sourcelement="+sourcelement;
	var myAjax = new Ajax.Request(url,
	   						{method: 'post', 
	   						parameters: pars,
	   						onComplete: function afterSave(resp){ 
	   							var json = resp.responseText.evalJSON(true);
	   							if (json.statuCode != null && json.statuCode == 100 && json.warnmsg != null && json.warnmsg != "") {
	   						    	alert(json.warnmsg);
	   						    }else{
	   						    	issucces=true;
	   						    }},
	   						asynchronous:false,
   						    onFailure : function(resp) { 
							 	alert("�ֶ�У��ʧ�ܣ�");
							 }
   							});
	return issucces;
}

col = createColumnConfig();
col.id = "refundlink";
col.name = "�鿴";
col.type = "S";
col.title = "�˿�";
col.show = function(rownum,value,row,tdobj,datatable){
           var tips="�鿴�˿�";
		   // tdobj.innerHTML = "<a href="+url+" color="red" title="+tips+">"+value+"</a>";
		   tdobj.value = value;
		   tdobj.myrow = row;
		   tdobj.innerHTML = "<div ALIGN='center'><a href='#' style='text-decoration:underline;color:blue;' title="+tips+" onclick='showRefundInfo(this.parentElement.parentElement)'>�鿴�˿�</a></div>";
}
ColumnConfig[col.id.toLowerCase()]=col;
function showRefundInfo(obj) {
	var ctrlid = parseInt(obj.myrow.ctrlid);
	if (!ctrlid) {
		return;
	}
	var	url = ROOT_PATH+"/voucher/directvoucherrefundment/manage/getRefundByCtrlid.do?ctrlid="+ctrlid;
	var result = window.showModalDialog(url,'','dialogWidth:1000px;dialogHeight:500px;status:no;resizable:yes;help:No;');
}
