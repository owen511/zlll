/*收支额度查询 2013.12.26 赵国鑫*/
function queryIncomeLimit(){
 	var agency;
	var selectrows = tmain.getSelectedRow();
	if(selectrows.length < 1 ){
	    alert("请选择一条且仅一条数据!");
	}else if(selectrows.length > 1 ){
		alert("不得选择多于一条数据!");
	}else{
	agency = selectrows[0].bdgagency;
    var	url = "/plan/normalplan/auditForAHHA/queryIncomeLimit/index.do?agency="+ agency + "&mainmenu="+getArgs()["mainmenu"]+"&submenu="+getArgs()["submenu"];
    var result = window.showModalDialog(url,window,'dialogWidth:1000px;dialogHeight:900px;status:no;resizable:yes;help:No;scroll:yes;');
	}
}
//在修改保存的时候 把发文文号和发文日期保存到子单中每条数据里
//所传参数 tmain 为datatable的id,
//formid 是发文文号所在的form的 id
function changeDataText3(tmain,formid){
    if(detailObj==null) return;
    if(tmain != null && tmain.data != null && tmain.data.length > 0 ){
				//同步更新所有子数据发文日期
				var datas = tmain.data;
				for(var i=0;i<datas.length;i++){
				    datas[i].senddoctime = $(formid).senddoctime.value;
				    datas[i].text3 = $(formid).text3.value;
				}	
			}
}

//设置所有功能按钮不可用
//指标模块使用
function disabledFunctionButton(){
	var element = document.getElementsByTagName('input');
	var length = element.length;
	
	for(var i = 0; i < length; i++){
		if(element[i].type=="button" || element[i].type=="submit"){
			element[i].disabled="disabled";
		}
	}
}
//设置所有功能按钮可用 专户使用
function abledFunctionButton(){
	var element = document.getElementsByTagName('input');
	var length = element.length;
	
	for(var i = 0; i < length; i++){
		if(element[i].type=="button" || element[i].type=="submit"){
			element[i].disabled=false;
		}
	}
}


//指标打印功能
function printindi() {
	if(tmain != null && tmain.data != null){
		selectrows = tmain.getSelectedRow();
	}
	if(selectrows == null){
		return;
	}

	if(selectrows != null && selectrows.length == 0){
		alert("请选择要打印的记录！");
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

// 退回
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
							 	closeDiv();alert("操作失败！");
							 }
						} 
	   				);
    }
}
// 取消退回
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
							 closeDiv();alert("操作失败！");
							 }
						} 
	   				);
    } 
}
/*
单据是否可以操作
1、在录入界面
   只用制单人可以对单据进行修改、删除、取消送审等逆向操作
2、其他界面
   只用单据的操作人才可进行逆向操作（如取消审核、取消发送等）
3、审核界面的修改要看工作流的设置
4、退回的单据只能在录入界面由制单人修改、删除

op = true 录入
opuserid  操作用户
*/
function isOpertion(op,opuserid,selectedrow){
   for (var i= 0 ; i<selectedrow.length ;i++) {
   	if (op && opuserid != selectedrow[i].creater || !op && opuserid != selectedrow[i].userid){
     	  alert('您没有操作第' + selectedrow[i].serial + '记录的权限，请检查！') ;
     	  return false ;
        }  
   }
   return true ;
}

/*
 送审是否可改
*/
function issendUpdate(row){
   return true ;
}


/*
20091010 jiazhitao
金额编辑区修改时，同时修改当前余额，默认amt 金额 curbal 当前余额
如有需要在页面覆盖此方法
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
	   alert("可用金额不足，请检查!");
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
	  alert("请选择要打印的单据");
	  return "";
     } 
  
    if (printConfig == undefined || printConfig =='null' || printConfig ==null || printConfig.length <1) {
    	alert("没有定义打印模板，请联系管理员！") ;
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
    	alert("没有符合打印条件的模板，请联系管理员！") ;
    	return "" ;
    }
    for( var j = 0 ; j < selectedRows.size() ; j++){
           row = selectedRows[j];
          if(!eval(config['condition'])){
             alert("请选择同种类型的单据进行操作,或您选择的单据条件配置有误,请检查!");
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
	  alert("请选择要打印的单据");
	  return "";
     } 
    if (printConfig == undefined || printConfig =='null' || printConfig ==null || printConfig.length <1) {
    	alert("没有定义打印模板，请联系管理员！") ;
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
    	alert("没有符合打印条件的模板，请联系管理员！") ;
    	return "" ;
    }
    for( var j = 0 ; j < selectedRows.size() ; j++){
           row = selectedRows[j];
          if(!eval(config['condition'])){
             alert("请选择同种类型的单据进行操作,或您选择的单据条件配置有误,请检查!");
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


//根据模板编号去查询配置模板个数
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
 查询签章信息
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
// printConfig linkname 报表模板  数据集或数据源
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
			//根据linkname 和rptid查询 
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
//根据模板id查询配置签章信息
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
	    // 屏蔽其他菜单：   
	    document.all.HWPostil1.ShowDefMenu=0;
	    document.all.HWPostil1.ShowScrollBarButton = 0;
        document.all.HWPostil1.HideMenuItem(8192);
		document.all.HWPostil1.HideMenuItem(2);
		
		document.all.HWPostil1. HideMenuItem(262144);
		document.all.HWPostil1. HideMenuItem(16384);
		document.all.HWPostil1. HideMenuItem(8192) ;	
		document.all.HWPostil1.SetPageMode(1,100);		

		//HWPostil 控件负责监控打印机
		document.all.HWPostil1.Login("HWSEALDEMO**", 4, 65535, "DEMO", "");
		document.all.HWPostil1.BeforeConvert("");       
	    //创建打印模板
	   	var ds = createDS() ;	   
	    printVoucherQZ(config['reportId'],ds);	   	     
	   	document.all.HWPostil1.WaitConverting(6000);
		//结束打印
	   	document.all.HWPostil1.AfterConvert();
		if(!document.all.HWPostil1.IsOpened()){
			alert("监控打印机失败");
		}else{ 
			//把印章图片插入到打印文件中 , 第i 行 第j 个签章
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
//为模板方式为数据源的打印模板
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
		var v_vchtypeid = tmain.getSelectedRow()[0].vchtypeid;//添加交易凭证类型到查询
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
	    // 屏蔽其他菜单：   
	    document.all.HWPostil1.ShowDefMenu=0;
	    document.all.HWPostil1.ShowScrollBarButton = 0;
        document.all.HWPostil1.HideMenuItem(8192);
		document.all.HWPostil1.HideMenuItem(2);
		document.all.HWPostil1. HideMenuItem(262144);
		document.all.HWPostil1. HideMenuItem(16384);
		document.all.HWPostil1. HideMenuItem(8192) ;	
		document.all.HWPostil1.SetPageMode(1,100);		
		//HWPostil 控件负责监控打印机
		document.all.HWPostil1.Login("HWSEALDEMO**", 4, 65535, "DEMO", "");
		document.all.HWPostil1.BeforeConvert("");      
		//检查是否签章过
		for(var i = 0;i<selectedRows.length;i++){	
			eval("var sealBmpList  = sealmess.sealinfo_"+selectedRows[i].billid);	
			if(sealBmpList.length>0){
				eval("var sealBmpList  = sealmess.sealinfo_"+selectedRows[i].billid);	
				break;
			}		
		} 
		
	    //创建打印模板
	   	var ds = createDS() ;	   
	   	var billid = createDS_billid() ;
	   	printVoucherBillidIndiPay(config['reportId'],billid);
	    //printVoucherQZ(config['reportId'],ds);	   	     
	   	document.all.HWPostil1.WaitConverting(3000);
		//结束打印
	   	document.all.HWPostil1.AfterConvert();
		if(!document.all.HWPostil1.IsOpened()){
			alert("监控打印机失败");
		}else{ 
			//把印章图片插入到打印文件中 , 第i 行 第j 个签章
			var n = config['num'];
			//n的格式是 打几次*打级联
			var m = 2;		
				
			 var rid = config['reportId'];	
			if(n==0)n=1;
//此处配置为额度汇总通知单准备，若其他地方打印签章，请先确定是否处理方式与额度汇总通知单一致，如一致，可利用此处方法，若不一致，请参考数据集方式重新书写方法
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
				//设置排序  使数据按照billcode降序排列
					var tmpList=[];
					if(rptid =='201103'||rid =='210101'||rid =='210103' ||rid =='210108'){
				   	  	selectedRows.sort(compareWithTime);
				   	  }else{
				   	  	selectedRows.sort(compare);
						for(var i=selectedRows.length-1;i>=0;i=i-1){//反向排序
					           tmpList[tmpList.length]=selectedRows[i];
					   	  }
					   	  selectedRows = tmpList;
				   	  }
	   	  			
						for(var i = 0;i<selectedRows.length;i++){	

								eval("var sealBmpList  = sealmess.sealinfo_"+selectedRows[i].billid);	
								
								    /*
								    201103-实拨收入退还书（财政）	2
									30540110-专户凭证（财政一般缴款书）	2
									30540210-专户凭证（财政预算外缴款）	2
									201104-实拨收入退还书（人行）	2
									30540101-专户凭证（人行一般缴款书）	2
									30540201-专户凭证（人行预算外拨款）	2
									30540301-专户凭证（人行支付凭证）	3					
									30540310-专户凭证（财政支款凭证）	3
									
								    102-直接支付汇总清算额度通知单	6
									1002-授权支付汇总清算额度通知单	7
			
								   
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
/* 打印签章*/
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
/* 打印签章*/
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
 查询签章信息
*/

function querySeal(linkname,config,row){
	    new Ajax.Request(
                    ROOT_PATH+"/common/printvoucher.do",
                    {method: 'post', parameters: "printid="+rptid+"&json="+Object.toJSON(rows), onComplete: printReportQZ}
                    );
}

/*
打印签章
*/
function printSeal() {
	
	try{	     
	     	//定义签章打印
	       //获取签章信息 
	       //加载已盖的印章数据   request

	 	//设置全部签章
	    for (var j=0;j<sealList.length;j++) {
                	sealList[j]['sealBmp'] = document.all.DWebSignSeal.GetSealBmpString( sealList[j]['sealName']  ,'jpg');
			document.all.DWebSignSeal.ShowSeal(sealList[j]['sealName'],0);	
		}
	       
	       	
		//HWPostil 控件负责监控打印机
		document.all.HWPostil1.Login("HWSEALDEMO**", 4, 65535, "DEMO", "");
		document.all.HWPostil1.BeforeConvert("");     
     
	    	//创建打印模板
	   	var ds = createDS() ;
	   			
	        printVoucherQZ(config['reportId'],ds);	         
	    
	   	document.all.HWPostil1.WaitConverting(5000);
		//结束打印
	   	document.all.HWPostil1.AfterConvert();
		if(!document.all.HWPostil1.IsOpened()){
			alert("监控打印机失败");
		}else{ 
			//把印章图片插入到打印文件中 , 第i 行 第j 个签章
			for(var i = 0;i<selectedRows.length;i++){
				for (var j=0;j<sealList.length;j++) {
					// i 第几行
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
创建打印数据
*/
function createDS(){
	//创建打印模板
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

// 查询指标附件信息
function show_files_Info() {
	
	
	var selectrows = tmain.getSelectedRow();
    if(selectrows.length==0){
      alert("请选择要查看的记录");
      return false;
    }
    if(selectrows.length>1){
      alert("只能选择一条记录查看");
      return false;
    }
    var subdata= new Object();
    try{
    	if(selectrows[0].billid==null||selectrows[0].billid==""){
    		alert("缺少配置，请联系系统管理员，添加配置billid!");
    		return;
    	} else {	
    		subdata.billid = selectrows[0].billid;
    	}	
    }catch (e){
    	
    }
    var maindata=Object.toJSON(subdata);
    var url="/indi/filesinfo.do?billid="+selectrows[0].billid;
	var features = "top=150,left=50,width=750,height=500,scrollbars=yes,resizable=yes";
    window.open(url,"附件情况",features);
  
}
/*
*对某种状态的单据进行操作时，对操作进行提示
*如果选择的行中含有输入的wfstatus，则弹出info，同时返回false，否则返回true。
*如果没有选中则返回true
*@tmain对象名称
*@wfstatus工作流状态  数组格式[00,01]
*@info  提示信息
checkCando(tmain,[00,01],"不能作废录入和已送审状态的数据")
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
检查功能分类
*/

function checkExpeconormic(){

	var selectRows = tmain.getSelectedRow();
	if (selectRows.length < 1) {   
        return true;
    }
    for(var n=0;n<selectRows.length;n++){
    	if(selectRows[n].expeconormic_isleaf=='0'){    	
	    	alert('单据里面含有支出经济分类没有细化到末级的单据');
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
//根据预算单位取得默认收款账号
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
//根据预算单位取得默认收款账号   实拨
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
      //过滤不满足条件的报表
      for(var i = 0 ; i < printConfig.length ; i++){
		   if(eval(printConfig[i]['condition'])){
			 	 printArr.push(printConfig[i]);
			}
	  }
	  //判断是否需要弹出报表选择框
	  if(printArr.length>1){
	         var url = '/indipay/common/findmodel.do?printArr='+Object.toJSON(printArr);
		     var chooseStr = window.showModalDialog(url,window,'dialogHeight:200px;dialogWidth:500px;toolbar=no;menubar=no;scrollbars=no;resizable=no;location=no; status=no');
		     if(chooseStr=="exit"||typeof(chooseStr)=="undefined") return;
		     config = getConfig(printArr,chooseStr);
	  }else{
	  	     config = printArr[0];
	  }
	  //根据config，判断:lt报表或者久其，打签章或者不打签章
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
	  alert("请选择要打印的单据");
	  return "";
     } 
    if (printConfig == undefined || printConfig =='null' || printConfig ==null || printConfig.length <1) {
    	alert("没有定义打印模板，请联系管理员！") ;
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
    	alert("没有符合打印条件的模板，请联系管理员！") ;
    	return "" ;
    }
    return config;
}
/*
创建打印数据
*/
function createDS_billid(){
	//创建打印模板
	//排序

    var billid = "" ;    
    for(i = 0 ; i < selectedRows.length; i++ ){
		billid+=selectedRows[i].billid+",";
    }
    billid=billid.substring(0,billid.lastIndexOf(','));    
    return billid ;
}

//20091209
// 打印凭证  rptid 是凭证打印模板，billid是打印的参数 
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
			//如果配置签章，则调用后台打印，否则调用前台打印
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
  
  
  // 经办人列表
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
 * 获取当前用户经办人和联系电话默认值 add 20130111
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
							 	//alert("操作失败！");  失败不做处理
							 }
							 //asynchronous:false  //取消同步
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
检查预算单位
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
    		alert('单据里面含有不同预算单位的单据');
    		return false;
    	}
    }
    return true;
}
/*
检查部门
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
    		alert('单据里面含有不同部门的单据');
    		return false;
    	}
    }
    return true;
}
/*
检查签章
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
		 	alert("请选择要操作的记录！");
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
							 	alert("操作失败！");
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
 * 检查签名
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
		alert("请选择要操作的记录！");
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
							 	alert("操作失败！");
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
							alert("单据：【"+selectrows[j].billcode+"】被篡改了！");
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

// 执行情况
function showIndiExecInfo(rownum,tableid) {
    var row = eval(tableid+".data[rownum]");
    var tableobj = eval(tableid);
    try{
    	if(row.billid==null||row.billid==""){
    		alert("缺少配置，请联系系统管理员，添加配置billid!");
    		return;
    	}
    	if(row.vchtypeid==null||row.vchtypeid==""){
    		alert("缺少配置，请联系系统管理员，添加配置vchtypeid!");
    		return;
    	}
    	if(row.wfstatus!=null&&row.wfstatus=="101"){
    		alert("作废单据无执行情况");
    		return;
    	}
    }catch (e){
    	
    }
    var url="/common/indiexecinfo.do?billid="+row.billid+"&vchtypeid="+row.vchtypeid+"&submenu="+getArgs()["submenu"]+"&mainmenu="+getArgs()["mainmenu"]+"&tabletype="+tableobj.tabletype;
	var features = "top=150,left=50,width=750,height=450,scrollbars=yes,resizable=yes";
	var data = new Array();
	data[data.length] = tableid;
	data[data.length] = Object.toJSON(row);
    openPostWindow(url,data,"执行情况",features);
}
//JS获取URL参数
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

//window.open 使用post方式传递
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

//增加导出主子表,导出当前主单和子单所有信息
//jjy20100510
function exportexcel3(tmain,tdetail){  
	    var oXL = new ActiveXObject("Excel.Application");
	    //创建AX对象excel
	    var oWB = oXL.Workbooks.Add();
	    //获取workbook对象
	    var oSheet = oWB.ActiveSheet;
	    oSheet.Columns.AutoFit;//所有列自适应宽度
	    //字段处理
	    var detailline = 0;
	    for(var x= 0;x<2;x++){
	        if(x==1){
	        	tmain = tdetail;
	        	oSheet.Cells(detailline+1, 1).value = "子单信息";
	        	oSheet.Rows(detailline+1).Interior.ColorIndex=23;
	        	detailline++;
	        } else {
	        	oSheet.Cells(detailline+1, 1).value = "主单信息";
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
		          alert("字段配置错误，请核查！");
		          return;
		       }
		       if(cols[i].id != "serial" && cols[i].id != "checkbox" && cols[i].id != "radio"){
		           bit++;
		  	           ids[bit-1] = cols[i].id;	           
		    	       //输出表头
		    	    if(cols[i].type=="M"){	   
		    	       oSheet.Cells(detailline+1, bit).value = cols[i].title;
		       			oSheet.Columns(bit).NumberFormatLocal="0.00";//全部字符型   
			 		}else{	  
			       		oSheet.Cells(detailline+1, bit).value = cols[i].title;      
			       		oSheet.Columns(bit).NumberFormatLocal="@";//全部字符型    
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
			          	if(ids[k]=='lastupdatetime'){//lastupdatetime   时间戳特殊处理
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
	     		 alert("导出完毕！"); 
     	}
	    oXL.Visible = false;
	    oWB.Close(); 
        return;
}
//自定义列
col = createColumnConfig();
col.id = "indiexec";
col.name = "indiexec";
col.type = "L";
col.title = "执行情况";
col.show = function(rownum,value,row,tdobj,datatable){
	tdobj.innerHTML = "<div ALIGN='center'><img src='"+ROOT_PATH+"/images/actions/indiexec.gif' alt='查询' onclick='showIndiExecInfo(" + rownum +",\"" +datatable.id+"\");' /></div>";
}
ColumnConfig[col.id.toLowerCase()]=col;

//自定义列
col = createColumnConfig();
col.id = "incomeinfo";
col.name = "incomeinfo";
col.type = "L";
col.title = "收支情况";
col.show = function(rownum,value,row,tdobj,datatable){
	tdobj.innerHTML = "<div ALIGN='center'><img src='"+ROOT_PATH+"/images/actions/indiexec.gif' alt='查询' onclick='showIncomeInfo(" + rownum +",\"" +datatable.id+"\");' /></div>";
}
ColumnConfig[col.id.toLowerCase()]=col;

// 收支情况
function showIncomeInfo(rownum,tableid) {
    var row = eval(tableid+".data[rownum]");
    try{
    	if(row.element27==null||row.element27==""||row.element27=="0"||row.element27_code=="0"){
    		alert("以收定支控制标志为空或不是以收定支数据，如没有配置请联系管理员");
    		return;
    	} else {
    		if(row.element27_code == "01"){
    			if(row.bdgagency==null||row.bdgagency==""||row.bdgagency=="0"){
		    		alert("单位不能为空，如没有配置请联系管理员");
		    		return;
		    	} 
    		} else if(row.element27_code == "02"){
    			if(row.bdgagency==null||row.bdgagency==""||row.bdgagency=="0"||
    				row.expfunc==null||row.expfunc==""||row.expfunc=="0"){
		    		alert("单位或功能分类不能为空，如没有配置请联系管理员");
		    		return;
		    	} 
    		} else if(row.element27_code == "03"){
    			alert("暂不处理该类型"+element27_code+"-"+element27_name);
    			return;
    		} else if(row.element27_code == "04"){
    			if(row.program==null||row.program==""||row.program=="0"){
		    		alert("项目不能为空，如没有配置请联系管理员");
		    		return;
		    	} 
    		} else if(row.element27_code == "05"){
    			
    		} else if(row.element27_code == "06"){
    			if(row.expfunc==null||row.expfunc==""||row.expfunc=="0"){
		    		alert("功能分类不能不能为空，如没有配置请联系管理员");
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
	//1，支付；1，计划；2，指标
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
    openPostWindow(url,data,"收支情况",features);
}
/*前置检以收定支接口*/
function checkincometag(datalist,tableid,ctrlsys){
	if(tableid==null||tableid==""){
		alert("调用检查以收定支收支情况，参数错误[列表ID]，请联系系统管理员");
		return;
	}
	if(ctrlsys==null||ctrlsys==""){
		alert("调用检查以收定支收支情况，参数错误［控制环节］，请联系系统管理员");
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
* 必填项校验
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
	    		//alert("以收定支控制类型不能为空，如没有配置请联系管理员");
	    		//return;
	    		if(errorObj["expbyincflag"]==null){
	    			errorObj["expbyincflag"] = "以收定支标志不能为空";
	    			errormsg += "以收定支标志不能为空\n";
	    		}
	    		reflag = true;
	    		flag = true;
	    	}
	    	if(row.element27==null||row.element27==""||row.element27=="0"){
	    		if(errorObj["element27"]==null){
	    			errorObj["element27"] = "以收定支控制类型不能为空";
	    			errormsg = "以收定支控制类型不能为空\n";
	    		}
	    		flag = true;
	    	} else {
	    		if(row.element27_code == "01"){
	    			if(row.bdgagency==null||row.bdgagency==""||row.bdgagency=="0"){
			    		//alert("单位不能为空，如没有配置请联系管理员");
			    		//return;
			    		if(errorObj["bdgagency"]==null){
			    			errorObj["bdgagency"] = "单位不能为空";
			    			errormsg += "单位不能为空\n";
			    		}
			    		flag = true;
			    	} 
	    		} else if(row.element27_code == "02"){
	    			if(row.bdgagency==null||row.bdgagency==""||row.bdgagency=="0"||
	    				row.expfunc==null||row.expfunc==""||row.expfunc=="0"){
			    		//alert("单位或功能分类不能为空，如没有配置请联系管理员");
			    		//return;
			    		if(errorObj["bdgagency"]==null&&(row.bdgagency==null||row.bdgagency==""||row.bdgagency=="0")){
			    			errorObj["bdgagency"] = "单位不能为空";
			    			errormsg += "单位不能为空\n";
			    		}
			    		if(errorObj["expfunc"]==null&&(row.expfunc==null||row.expfunc==""||row.expfunc=="0")){
			    			errorObj["expfunc"] = "功能分类不能为空";
			    			errormsg += "功能分类不能为空\n";
			    		}
			    		flag = true;
			    	} 
	    		} else if(row.element27_code == "03"){
	    			//alert("暂不处理该类型"+element27_code+"-"+element27_name);
	    			//return;
	    		} else if(row.element27_code == "04"){
	    			if(row.program==null||row.program==""||row.program=="0"){
			    		//alert("项目不能为空，如没有配置请联系管理员");
			    		//return;
			    		if(errorObj["program"]==null){
			    			errorObj["program"] = "项目不能为空";
			    			errormsg += "项目不能为空\n";
			    		}
			    		flag = true;
			    	} 
	    		} else if(row.element27_code == "05"){
	    			
	    		} else if(row.element27_code == "06"){
	    			if(row.expfunc==null||row.expfunc==""||row.expfunc=="0"){
			    		//alert("功能分类不能不能为空，如没有配置请联系管理员");
			    		//return;
			    		if(errorObj["expfunc"]==null){
			    			errorObj["expfunc"] = "功能分类不能为空";
			    			errormsg += "功能分类不能为空\n";
			    		}
			    		flag = true;
			    	} 
	    		}     	
	    	}
	    }catch (e){
	    	
	    }
	}
	if(flag&&!reflag){
    	alert("检查以收定支情况，缺少必要信息，请检查。\n"+errormsg);
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
*AJAX检验后回调方法
*/
function aftercheckincome(resp,datalist,tableid){
	var json ;
    try {
		 json = eval(resp.responseText);
	}catch(e){
		alert("出现未知异常："+Object.toJSON(e));
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

//来源去向
function show_source_target_Info(tableName){
    var selectedRow = tmain.getSelectedRow();
     if(selectedRow.length==0){
      alert("请首先选择1个记录，然后按[来源去向]！");
      return false;
    }
    if(selectedRow.length>1){
      alert("只能选择1个记录，然后按[来源去向]！");
      return false;
    }
    if (selectedRow[0].wfid == 0){
      alert("调账单据暂不支持查询来源去向！");
      return false;
    }
    var billid = selectedRow[0].billid;
    var url = ROOT_PATH+"/commons/srcandtragetvouinfo.do?";
    url = url + "&billid="+billid + "&wfid="+selectedRow[0].wfid;
    url = url + "&tableName="+tableName;
    url = url +"&submenu="+getparam("submenu");
	var features = "top=150,left=50,width=750,height=521,scrollbars=yes,,resizable=yes,status=yes";
    window.open(url, "来源去向", features);
}

//子单来源去向
function show_source_target_tdetailInfo(tableName){
	var selectedRow = tmain.getSelectedRow();
    if(selectedRow.length==0){
    	alert("请首先选择1个记录，然后按[来源去向]！");
      	return false;
    }
    if(selectedRow.length>1){
    	alert("只能选择1个记录，然后按[来源去向]！");
      	return false;
    }
    var billid = selectedRow[0].billid;
    var url = ROOT_PATH+"/commons/srcandtragetvouinfo.do?";
    url = url + "&billid="+billid + "&wfid="+selectedRow[0].wfid;
    url = url + "&tableName="+tableName;
    url = url +"&submenu="+getparam("submenu");
    url = url +"&showType=tdetail";
	var features = "top=150,left=50,width=750,height=521,scrollbars=yes,,resizable=yes,status=yes";
    window.open(url, "来源去向", features);
}

/**
*
*对于ajax类型的查询，用这种当时组装sql语句，输入参数是form
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
  *在提交ajax之前的一些操作
  */
  function initTabOnclickBeforQuery(tmain){
  	setIndexForQueyForm();
	
  	//如果有子单，就把子单区清空
  	try{
  	     document.getElementById("edit_table").style.display = 'none';
	     document.getElementById("tmain_div").style.display = 'block';//先写死
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

	//是否有上一页
	var hasPreviousPage = json.currpage!=1?(json.totalpages > 1):false;
	// 是否有下一页
	var hasNextPage = (json.currpage < json.totalpages);
	// 上一页
	var previousPage = json.currpage>1?json.currpage - 1:1;
	// 下一页
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
	//设置查询条件中关于这些page的属性
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
					//在自己的页面做特别处理
					
				}else {
					if(formObj.allflag!=null)formObj.allflag.value = 1;
				}
		}
		tmain.paginationdiv = document.getElementById('paginationdiv'); 
		tmain.createPagination(); 
	}
}
/*
*设置页签的index
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
*页面信息
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
	//alert("操作成功"+tmain.getSelectedRow().length+"条")
	/*
	var sumamt = '0.0';
	var selectedRow = tmain.getSelectedRow();
	for(var i=0;i<selectedRow.length;i++){
		sumamt = accAdd(sumamt,selectedRow[i].amt);
	}
	
	alert("操作成功"+selectedRow.length+"条,金额："+String(sumamt).toMoneyFormat());
	*/
	return true;
}

// 20100906 bcg 打印日志次数标识
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
						 	alert("操作失败！");
						 }
					} 
   				);
}

/**
*页签查询---分页
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
						 	alert("操作失败！");
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

//附件上传
function upload(){
	var selectRow=new Array();
 	var num=tmain.getSelectedRow(); 
 	if(num.length<1){
 		alert("请选择要操作的单据！");
  	  	return;
 	}
  	if(num.length>1){
  		alert("只能选择一条操作单据");
  	  	return;
  	}
  	var url = ROOT_PATH + '/indi/mofdeptindiassign/manage/uploadfile/index.do?maindata='+num[0].billid;
	window.open(url,"_blank","status=yes,scrollbars=yes,toolbar=no,menubar=no,location=no");
}

//指标管理年初预算导入
function importexldataIndi(){
    var pars = "?vchtypeid="+linkvchtypeid+ "&mainmenu="+getparam("mainmenu")+"&submenu="+getparam("submenu")+"&action=1";
	window.open(ROOT_PATH+"/indi/common/queryimportdata.do" + pars,"_blank","status=yes,toolbar=no,menubar=no,location=no");
}
//指标管理年初预算导入1
function importexldataIndi1(){
    var pars = "?vchtypeid="+linkvchtypeid+ "&mainmenu="+getparam("mainmenu")+"&submenu="+getparam("submenu")+"&action=1";
	window.open(ROOT_PATH+"/indi/common/queryimportdata1.do" + pars,"_blank","status=yes,toolbar=no,menubar=no,location=no");
}
/*
*对某种属性的单据进行操作时，对操作进行提示
*如果选择的行中含有输入的colname，则弹出info，同时返回false，否则返回true。
*如果没有选中则返回true
*@tmain表单对象名称
*@ colname 属性
*@colvalues  属性值  数组格式[00,01]
*@info  提示信息
checkCandoIt(tmain,'wfstatus',['00','01'],"不能修改00、01的数据")
*/

function checkCandoIt(tmain,colname,colvalues,info){
	var selectRows = tmain.getSelectedRow();
	if (selectRows.length < 1) {   
        return true;
    }
    for(var n=0;n<selectRows.length;n++){
    eval("var temp =selectRows[n]."+colname);
    if(typeof(temp)=="undefined"){
    	alert("请联系管理员配置"+item+"字段！");
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
*公用收款账号弹出数树调用方法：数据为临时表T_PAYTEMPLATE，方式为：可录入可选择。
getvoucherPaytrees
*/
function selectBankInput(agencyId,gatheringbankacctname,gatheringbankacctcode,gatheringbankname){
	if(agencyId==null) 
	{
	    alert("请选择来源数据");
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
* 实拨收款账户从t_pubbankaccount表中取值，按单位对账户进行过滤。部分页面没有这个方法，所以添加公用。
*/
function selectBankByAgencyNX(gatheringbankacctname,gatheringbankacctcode,gatheringbankname){
	if(tmain.getSelectedRow()<1){
		alert("请选择来源数据！");
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
*实拨公用收款账号弹出数树调用方法：数据为T_PUBBNKACCOUNT，方式为：可选择，默认选择单位的银行账户。
*/
function selectRealBankByAgency(gatheringbankaccount,gatheringbankacctname,gatheringbankacctcode,gatheringbankname){
	var url = ROOT_PATH+"/realpay/common/getbankaccountByBdgagency/bankaccount.do?&mainmenu="+getparam("mainmenu")+"&submenu="+getparam("submenu");
	var result = window.showModalDialog(url,"",'dialogWidth:600px;dialogHeight:450px;status:no;resizable:no;help:No;');
	if(result != null && result.wholename!=null && result.wholename!=''){
		gatheringbankaccount_var=result.itemid;
		//将选中行的流水号保存下来
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
*实拨公用收款账号弹出数树调用方法：数据为T_PUBBNKACCOUNT，方式为：可选择，默认选择部门的银行账户。
*/
function selectRealBank(gatheringbankaccount,gatheringbankacctname,gatheringbankacctcode,gatheringbankname){
	var url = ROOT_PATH+"/realpay/common/bankaccount/bankaccount.do?&mainmenu="+getparam("mainmenu")+"&submenu="+getparam("submenu");
	var result = window.showModalDialog(url,"",'dialogWidth:600px;dialogHeight:450px;status:no;resizable:no;help:No;');
	if(result != null && result.wholename!=null && result.wholename!=''){
		gatheringbankaccount_var=result.itemid;
		//将选中行的流水号保存下来
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

//实拨根据预算单位取得默认单位收款账号
function findRealBankByBdgagency(obj){
var	url = ROOT_PATH+"/realpay/common/getbankaccountByBdgagency/getbankaccountByBdgagency.do";
	    new Ajax.Request(
                    url,
                    {method: 'post', parameters: "bdgagency="+obj, onComplete: afterFindBankAccount}
                    );
}

//实拨根据预算单位取得默认部门收款账号
function findRealBank(obj){
var	url = ROOT_PATH+"/realpay/common/bankaccount/getbankaccountByBdgagency.do";
	    new Ajax.Request(
                    url,
                    {method: 'post', parameters: "bdgagency="+obj, onComplete: afterFindBankAccount}
                    );
}

/*
*专户公用收款账号弹出数树调用方法：数据为T_PUBBNKACCOUNT，方式为：可选择，默认选择单位的银行账户。
*/
function selectSaBankByAgency(gatheringbankaccount,gatheringbankacctname,gatheringbankacctcode,gatheringbankname){
	var url = ROOT_PATH+"/specialaccount/common/getbankaccountByBdgagency/bankaccount.do?&mainmenu="+getparam("mainmenu")+"&submenu="+getparam("submenu");
	var result = window.showModalDialog(url,"",'dialogWidth:600px;dialogHeight:450px;status:no;resizable:no;help:No;');
	if(result != null && result.wholename!=null && result.wholename!=''){
		gatheringbankaccount_var=result.itemid;
		//将选中行的流水号保存下来
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
*专户公用收款账号弹出数树调用方法：数据为T_PUBBNKACCOUNT，方式为：可选择，默认选择部门的银行账户。
*/
function selectSaBank(gatheringbankaccount,gatheringbankacctname,gatheringbankacctcode,gatheringbankname){
	var url = ROOT_PATH+"/specialaccount/common/bankaccount/bankaccount.do?&mainmenu="+getparam("mainmenu")+"&submenu="+getparam("submenu");
	var result = window.showModalDialog(url,"",'dialogWidth:600px;dialogHeight:450px;status:no;resizable:no;help:No;');
	if(result != null && result.wholename!=null && result.wholename!=''){
		gatheringbankaccount_var=result.itemid;
		//将选中行的流水号保存下来
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

//专户根据预算单位取得默认单位收款账号
function findSaBankByBdgagency(obj){
var	url = ROOT_PATH+"/specialaccount/common/getbankaccountByBdgagency/getbankaccountByBdgagency.do";
	    new Ajax.Request(
                    url,
                    {method: 'post', parameters: "bdgagency="+obj, onComplete: afterFindBankAccount}
                    );
}

//专户根据预算单位取得默认部门收款账号
function findSaBank(obj){
var	url = ROOT_PATH+"/specialaccount/common/bankaccount/getbankaccountByBdgagency.do";
	    new Ajax.Request(
                    url,
                    {method: 'post', parameters: "bdgagency="+obj, onComplete: afterFindBankAccount}
                    );
}

//查询收款账号的回调方法
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


//根据模板编号去查询配置模板个数
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
// 打印凭证  rptid 是凭证打印模板，billid是打印的参数 
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


//弹出用途页面
function selectUses(text10){
	var refererurl = ""+window.location.href;
	var url = ROOT_PATH+"/common/getUse.do?Referer="+refererurl.substring(0,refererurl.indexOf("?"));
	var result = window.showModalDialog(url,"",'dialogWidth:600px;dialogHeight:450px;status:no;resizable:no;help:No;');
	//var result = window.open(url, 'newWindow','dialogWidth=600px,dialogHeight=450px,status=yes,toolbar=no,menubar=no,directories=no,resizable=no,Scrollbars=no');
	if(result != null && result.use!=null){
		text10.value = result.use;
	}
}
//弹出摘要页面
function selectSummarys(text5){
	var refererurl = ""+window.location.href;
	var url = ROOT_PATH+"/common/getSummary.do?Referer="+refererurl.substring(0,refererurl.indexOf("?"));
	var result = window.showModalDialog(url,"",'dialogWidth:600px;dialogHeight:450px;status:no;resizable:no;help:No;');
	//var result = window.open(url, 'newWindow','dialogWidth=600px,dialogHeight=450px,status=yes,toolbar=no,menubar=no,directories=no,resizable=no,Scrollbars=no');
	if(result != null && result.use!=null){
		text5.value = result.use;
	}
}

//带有查询条件的用途弹出框
function selectUsesTree(text10){
	var	url = ROOT_PATH+"/common/getUseTree/index.do?tapIndex=0&mainmenu="+getparam("mainmenu")+"&submenu="+getparam("submenu");	
	var result = window.showModalDialog(url,window,'dialogWidth:600px;dialogHeight:500px;status:no;resizable:yes;help:No;scroll:yes;');
	if(result != null && result.use!=null){
		text10.value = result.use;
	}
}

//带有查询条件的摘要弹出框
function selectSummarysTree(text5){
	var	url = ROOT_PATH+"/common/getSummaryTree/index.do?tapIndex=0&mainmenu="+getparam("mainmenu")+"&submenu="+getparam("submenu");	
	var result = window.showModalDialog(url,window,'dialogWidth:600px;dialogHeight:500px;status:no;resizable:yes;help:No;scroll:yes;');
	if(result != null && result.use!=null){
		text5.value = result.use;
	}
}

//带有查询条件的摘要弹出框(text7)
function selectPlanSumsTree(text7){
	var	url = ROOT_PATH+"/common/getPlanSumTree/index.do?tapIndex=0&mainmenu="+getparam("mainmenu")+"&submenu="+getparam("submenu");	
	var result = window.showModalDialog(url,window,'dialogWidth:600px;dialogHeight:500px;status:no;resizable:yes;help:No;scroll:yes;');
	if(result != null && result.use!=null){
		text7.value = result.use;
	}
}

//获得当前日期
function getDate(){	
	var nowDate = new Date().format("yyyyMMdd",0); 
	return nowDate;
}

//获得几个月前或几个月后的日期
function getDateModMonth(monthnum){	
	var d=new Date();
	return d.format("yyyyMMdd",monthnum); 
}

//获得当前月份
function getMonth(){	
	var nowDate = new Date(); 
	var nowMonth  = nowDate.getMonth() + 1;
	return nowMonth;
}

//获得当前月份,如果是在当年时间操作下一年则返回1
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
 * 时间对象的格式化;  
 * format:日期格式
 * monthnum：月数，可以获得几个月前或几个月后的某天
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

//指标金额全拨
function assignDefault(){
    var t_selectrows = tmain.getSelectedRow();
	var selectrows = tdetail.getSelectedRow();	
	if(selectrows.length == 0){
		alert("请选择操作单据!");
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
	//直接赋值为0
	mainVouch.curbal = 0;
	//mainVouch.curbal = parseFloat(moneyFormatToNumber(mainVouch.curbal)) + parseFloat(detailamtDefault) -  parseFloat(moneyFormatToNumber($("detailform").amt.value));
	tmain.draw();				
    detailamtDefault = moneyFormatToNumber(selectrow.amt);
    $("detailform").amt_hid.fireEvent("onblur");
}  
/**
*对选中的单据进行过滤，然后将少量的数据传递到后台，主单只填写id
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
				//添加签名字段
				row.inditext13 = datatableid.data[i].inditext13;
				row.inditext16 = datatableid.data[i].inditext16;
				row.indinumber7 = datatableid.data[i].indinumber7;
				//其他的再扩展
				l[l.length] = row;
			}
		}
		return l;
	}
	
/**
*对选中的单据进行过滤，然后将少量的数据传递到后台,主子都只填id
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
				//设置明细
				var tdata = datatableid.data[i].details;
				var drow = new Array();
				for(var n=0;n<tdata.length;n++){
				    var detailrow = new Object();
				    detailrow.billid = tdata[n].billid;	
				    detailrow.auditOpinion = tdata[n].auditOpinion;						
					detailrow.lastupdatetime = tdata[n].lastupdatetime;
					//添加签名字段
					detailrow.inditext13 = tdata[n].inditext13;
					detailrow.inditext16 = tdata[n].inditext16;
					detailrow.indinumber7 = tdata[n].indinumber7;
					
					drow[drow.length] = detailrow;
				}
				row.details=drow;
				//添加签名字段
				row.inditext13 = datatableid.data[i].inditext13;
				row.inditext16 = datatableid.data[i].inditext16;
				row.indinumber7 = datatableid.data[i].indinumber7;
				
				//其他的再扩展		
				l[l.length] = row;
				
				}
			}

		return l;
	}

/**
*来源去向 20110725 add by lty
*查询来源去向
*/
function showSourceDestinationInfo(rownum,tableid){
	var row = eval(tableid+".data[rownum]");
    var tableobj = eval(tableid);
    try{
    	if("undefined"==typeof(row.billid)||row.billid==null||row.billid==""){
    		alert("缺少配置，请联系系统管理员，添加配置billid!");
    		return;
    	}
    	if("undefined"==typeof(SDtablename)||null==SDtablename||""==SDtablename.trim()){
    		alert("缺少配置，请联系系统管理员，添加配置SDtablename!");
    		return;
    	}
    	if("undefined"==typeof(SDsourcelevel)||!sourclLevelFormatToNumber(SDsourcelevel).isNumber()){
    		alert("缺少配置，请联系系统管理员，添加配置SDsourcelevel!");
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
*追溯计划 20130417 add by dengdegao
*查询计划额度对应的计划明细
*/
function showSourcePlanInfo(rownum,tableid){
	var row = eval(tableid+".data[rownum]");
    var tableobj = eval(tableid);
    var ctrlidStr="";
    try{
    	if("undefined"==typeof(row.details)||row.details==null||row.details==""){
    		if("undefined"==typeof(row.ctrlid)||row.ctrlid==null||row.ctrlid==""){
    			alert("缺少配置，请联系系统管理员，添加配置ctrlid!");
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
	//window.open(url, "追溯计划", features);
	var keys=["ctrlid"];
	var values=[ctrlidStr];
	openWindowWithPost(ROOT_PATH+"/commons/showSourcePlanAction.do","追溯计划",keys,values,features)
}

/**
*来源层次判断
*/
function sourclLevelFormatToNumber(m){
    if(m==null || m=="")
    	return 1;
    m=m+"";
	m = m.replace(/,/g,"");
	return m;
}

//自定义列
col = createColumnConfig();
col.id = "sourceDestination";
col.name = "sourceDestination";
col.type = "L";
col.title = "来源去向";
col.show = function(rownum,value,row,tdobj,datatable){
	tdobj.innerHTML = "<div ALIGN='center'><img src='"+ROOT_PATH+"/ifmis_images/done_btn/refresh.gif' alt='来源去向' onclick='showSourceDestinationInfo(" + rownum +",\"" +datatable.id+"\");' /></div>";
}
ColumnConfig[col.id.toLowerCase()]=col;

//自定义来源计划列
col = createColumnConfig();
col.id = "sourcePlan";
col.name = "sourcePlan";
col.type = "L";
col.title = "追溯计划";
//图片的绝对路径
//var url = ROOT_PATH+"/ifmis_images/done_btn/refresh.gif";
col.show = function(rownum,value,row,tdobj,datatable){
	tdobj.innerHTML = "<div ALIGN='center'><img src='"+ROOT_PATH+"/ifmis_images/done_btn/refresh.gif' alt='追溯计划' onclick='showSourcePlanInfo(" + rownum +",\"" +datatable.id+"\");' /></div>";
}
ColumnConfig[col.id.toLowerCase()]=col;

/************************/
//为模板方式为数据源的打印模板,龙图报表使用
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
		var v_vchtypeid = tmain.getSelectedRow()[0].vchtypeid;//添加交易凭证类型到查询
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
	    // 屏蔽其他菜单：   
	    document.all.HWPostil1.ShowDefMenu=0;
	    document.all.HWPostil1.ShowScrollBarButton = 0;
        document.all.HWPostil1.HideMenuItem(8192);
		document.all.HWPostil1.HideMenuItem(2);
		document.all.HWPostil1. HideMenuItem(262144);
		document.all.HWPostil1. HideMenuItem(16384);
		document.all.HWPostil1. HideMenuItem(8192) ;	
		document.all.HWPostil1.SetPageMode(1,100);		
		//HWPostil 控件负责监控打印机
		document.all.HWPostil1.Login("HWSEALDEMO**", 4, 65535, "DEMO", "");
		document.all.HWPostil1.BeforeConvert("");      
		//检查是否签章过
		for(var i = 0;i<selectedRows.length;i++){	
			eval("var sealBmpList  = sealmess.sealinfo_"+selectedRows[i].billid);	
			if(sealBmpList.length>0){
				eval("var sealBmpList  = sealmess.sealinfo_"+selectedRows[i].billid);	
				break;
			}		
		} 
		
	   	var billid = createDS_billid() ;
	   	//使用龙图后台打印
  		var ltprintConf = new Array();
		ltprintConf.jrid=billid;
		ltprintConf.printid=config['reportId'];	 	   	
	   	ltPrintReport(ltprintConf);
	   	
	   	document.all.HWPostil1.WaitConverting(3000);
		//结束打印
	   	document.all.HWPostil1.AfterConvert();
		if(!document.all.HWPostil1.IsOpened()){
			alert("监控打印机失败");
		}else{ 
			//把印章图片插入到打印文件中 , 第i 行 第j 个签章
			var n = config['num'];
			//n的格式是 打几次*打级联
			var m = 2;		
				
			 var rid = config['reportId'];	
			if(n==0)n=1;
//此处配置为额度汇总通知单准备，若其他地方打印签章，请先确定是否处理方式与额度汇总通知单一致，如一致，可利用此处方法，若不一致，请参考数据集方式重新书写方法
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
				//设置排序  使数据按照billcode降序排列
					var tmpList=[];
					if(rptid =='201103'||rid =='210101'||rid =='210103' ||rid =='210108'){
				   	  	selectedRows.sort(compareWithTime);
				   	  }else{
				   	  	selectedRows.sort(compare);
						for(var i=selectedRows.length-1;i>=0;i=i-1){//反向排序
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

//弹出文号选择界面
function selectIndiDocuments(obj){
	var	url = ROOT_PATH+"/common/IndiDocument/showIndiDocument.do?mainmenu="+getparam("mainmenu")+"&submenu="+getparam("submenu");
	var result = window.showModalDialog(url,'','dialogWidth:600px;dialogHeight:500px;status:no;resizable:yes;help:No;scroll:yes;');
	//var result = window.open(url,'','top=200,left=200,width=750,height=600,scrollbars=yes,resizable=yes,status=yes');
	if(result != null && result.text3!=null){
		obj.value = result.text3;
		obj.textid = result.textid;
	}
}
//实拨获取付款账户
function getrealPayBankAccount(paymentbankacctname,paymentbankacctcode,paymentbankname,paymentbankaccount){

	var	url = ROOT_PATH+"/realpay/common/getrealvoucherPaytrees/getPayTrees.do?mainmenu="+getparam("mainmenu")+"&submenu="+getparam("submenu");
	var result = window.showModalDialog(url,'','dialogWidth:600px;dialogHeight:600px;status:no;resizable:yes;help:No;');
   	if(result != null){				
		paymentbankacctcode.value = result.code;
		paymentbankacctname.value = result.wholename;
		paymentbankname.value = result.agentbank_name;			
		tdetail.getSelectedRow()[0].paymentbankaccount =result.itemid; 		
		//代理行信息
		tdetail.getSelectedRow()[0].agentbank= result.agentbank; 	
		tdetail.getSelectedRow()[0].agentbank_code= result.agentbank_code;
		tdetail.getSelectedRow()[0].agentbank_name= result.agentbank_name;
		//银行所在省，市
		tdetail.getSelectedRow()[0].city= result.city; 
		tdetail.getSelectedRow()[0].province= result.province; 
        //归集行
		tdetail.getSelectedRow()[0].gatherbank= result.gatherbank; 	
		tdetail.getSelectedRow()[0].gatherbank_code= result.gatherbank_code;
		tdetail.getSelectedRow()[0].gatherbank_name= result.gatherbank_name;	
		tdetail.show();
	}
}

//实拨获取付款账户,根据数据权限过滤
function getrealPayBankAccountCa(paymentbankacctname,paymentbankacctcode,paymentbankname,paymentbankaccount){

	var	url = ROOT_PATH+"/realpay/common/getrealvoucherPaytrees/getPayTreesCa.do?mainmenu="+getparam("mainmenu")+"&submenu="+getparam("submenu");
	var result = window.showModalDialog(url,'','dialogWidth:600px;dialogHeight:600px;status:no;resizable:yes;help:No;');
   	if(result != null){				
		paymentbankacctcode.value = result.code;
		paymentbankacctname.value = result.wholename;
		paymentbankname.value = result.agentbank_name;			
		tdetail.getSelectedRow()[0].paymentbankaccount =result.itemid; 		
		//代理行信息
		tdetail.getSelectedRow()[0].agentbank= result.agentbank; 	
		tdetail.getSelectedRow()[0].agentbank_code= result.agentbank_code;
		tdetail.getSelectedRow()[0].agentbank_name= result.agentbank_name;
		//银行所在省，市
		tdetail.getSelectedRow()[0].city= result.city; 
		tdetail.getSelectedRow()[0].province= result.province; 
        //归集行
		tdetail.getSelectedRow()[0].gatherbank= result.gatherbank; 	
		tdetail.getSelectedRow()[0].gatherbank_code= result.gatherbank_code;
		tdetail.getSelectedRow()[0].gatherbank_name= result.gatherbank_name;	
		tdetail.show();
	}
}

//实拨获取付款账户默认值 bug[41982,41522]
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
             				//代理行信息
             				tdetail.getSelectedRow()[0].agentbank= result.agentbank; 	
             				tdetail.getSelectedRow()[0].agentbank_code= result.agentbank_code;
             				tdetail.getSelectedRow()[0].agentbank_name= result.agentbank_name;
             				
             		        //归集行
             				tdetail.getSelectedRow()[0].gatherbank= result.gatherbank; 	
             				tdetail.getSelectedRow()[0].gatherbank_code= result.gatherbank_code;
             				tdetail.getSelectedRow()[0].gatherbank_name= result.gatherbank_name;	
             			}
             			datasynch(paymentbankacctname);
             			datasynch(paymentbankacctcode);
             			datasynch(paymentbankname);
             		
             	} ,  onFailure : function(req) {
             		 alert("获取付款账户默认值失败。");
             		
             	}
                }
      );
}


//自定义列文号连接OA
col = createColumnConfig();
col.id = "text3s";
col.name = "text3s";
col.type = "L";
col.title = "指标文号";
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
*文号连接OA 20120207 add by lty
*/
function showUrloadbifileno(rownum,tableid){
	var row = eval(tableid+".data[rownum]");
    var tableobj = eval(tableid);
    try{
    	if("undefined"==typeof(row.text3)||row.text3==null||row.text3==""){
    		alert("缺少配置，请联系系统管理员，添加配置text3!");
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
							alert("操作失败！");
						},
						asynchronous:false
					});
}

function  afterUrloadbifileno(resp){
	var json = resp.responseText;
	if (json=="") {
		alert("OA系统地址配置的有问题，请联系管理员检查!");
		return;
	}
	_OAWindow=Ext.lt.window({title:"<b>指标文件</b>", w:900, h:512,close:true,pop:true,className:'wind7',fitmode:'content',mark:false});
	var _div=document.createElement("div");
	document.body.appendChild(_div);
	_div.style.height='512px';
	_div.style.width='900px';
	_div.innerHTML="<iframe src="+json+" width=\"100%\" height=\"100%\" frameborder=\"0\"></iframe>";		
	_OAWindow.draw(_div);
}


//修改方法名称为预警规则modify 20120830.
col = createColumnConfig();
col.id = "controltypecode";
col.name = "controltypecode";
col.type = "S";
col.title = "预警状态";
col.show = function(rownum,value,row,tdobj,datatable){
	if(row["controltypecode"] == null || row["controltypecode"] == ""){
		tdobj.innerHTML = "";
	}
	else if(row["controltypecode"] == 0){
		tdobj.innerHTML = "0-通过";
	}else if(row["controltypecode"] == 1){
		tdobj.innerHTML = "1-违规";
	}else if(row["controltypecode"] == 2){
		tdobj.innerHTML = "2-存疑";
	}else if(row["controltypecode"] == 3){
		tdobj.innerHTML = "3-提醒";
	}else if(row["controltypecode"] == 4){
		tdobj.innerHTML = "4-告警";
	}else if(row["controltypecode"] == 5){
		tdobj.innerHTML = "5-记录";
	}
}
ColumnConfig[col.id.toLowerCase()]=col;


// 自定义监控状态名称 add 20120830
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
			tdobj.innerHTML = "0-通过";
		}else if(row["controltypecode"] == 1){
			tdobj.innerHTML = "1-违规";
		}else if(row["controltypecode"] == 2){
			tdobj.innerHTML = "2-存疑";
		}else if(row["controltypecode"] == 3){
			tdobj.innerHTML = "3-提醒";
		}else if(row["controltypecode"] == 4){
			tdobj.innerHTML = "4-告警";
		}else if(row["controltypecode"] == 5){
			tdobj.innerHTML = "5-记录";
		}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
}


// 修改方法名称为预警规则，同时传递列对象的json 串到监控系统 modify 20120830.
col = createColumnConfig();
col.id = "rulearray";
col.name = "rulearray";
col.type = "S";
col.title = "预警规则";
col.show = function(rownum,value,row,tdobj,datatable){
        if(value!=null&&value!=""){
            var tips="查看违反规则";
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

//提供自定义监控状态名称 add 20120830 
function setulearrayDef(name){
	col = createColumnConfig();
	col.id = "rulearray";
	col.name = "rulearray";
	col.type = "S";
	col.title = name;
	col.show = function(rownum,value,row,tdobj,datatable){
	        if(value!=null&&value!=""){
	            var tips="查看违反规则";
			   // tdobj.innerHTML = "<a href="+url+" color="red" title="+tips+">"+value+"</a>";
	            tdobj.value = value;
	 		   tdobj.myrow = row;
			   tdobj.innerHTML = "<a href='#' color='red' title="+tips+" onclick='getitinspectinfo(this.parentElement)'>"+value+"</a>";
			}
	}
	ColumnConfig[col.id.toLowerCase()]=col;
}

/**
 * 根据监控结果判断操作是否通过
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
        alert("存在违规数据，请修正!");
        return false;
    }else if(inspectflag == "2"){
          if(!confirm("存在存疑数据，是否确定继续操作？")){
              return false;
          } 
    }
    return true;
}



//提供自定义监控状态名称 add 20120830 
function setltinspectstatusDef(name){
	col = createColumnConfig();
	col.id = "ltinspectstatus";
	col.name = "ltinspectstatus";
	col.type = "S";
	col.title = name;
	col.show = function(rownum,value,row,tdobj,datatable){
		if(row["controltypecode"] == null || row["controltypecode"] == "" || row["controltypecode"] == "null"){
			tdobj.innerHTML = "<img src='../../../pay/image/0.gif' alt='通过'/>";
		}
		else if(row["controltypecode"] == 0){
			tdobj.innerHTML = "<img src='../../../pay/image/0.gif' alt='通过'/>";
		}else if(row["controltypecode"] == 1){
			tdobj.innerHTML = "<img src='../../../pay/image/2.gif' alt='违规'/>";
		}else if(row["controltypecode"] == 2){
			tdobj.innerHTML = "<img src='../../../pay/image/1.gif' alt='存疑'/>";
		}else if(row["controltypecode"] == 3){
			tdobj.innerHTML = "<img src='../../../pay/image/1.gif' alt='提醒'/>";
		}	
	}
	ColumnConfig[col.id.toLowerCase()]=col;	
}

//指标文号弹出树text3
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

//指标文号弹出树text3
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

//指标文号弹出树text2
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
//指标文号弹出树text8
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
*验证防篡改数据
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

//取服务器时间和签名配置信息
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
								operationMsg = "获取签名配置信息失败，请检查签名配置";
						}
					} catch (e) {
						operationMsg = "获取签名配置信息失败";
					}
		   		},
				onFailure : function(resp) { 
					operationMsg = "获取签名配置信息失败";
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
	        	alert("没有查找到证书!");
	        	return false;
			}
			
			var needJudgeSignFlag = true;
			if ("undefined" == typeof(wfStatusArray) || null == wfStatusArray || Array != wfStatusArray.constructor || wfStatusArray.length <= 0)
				needJudgeSignFlag = false;
        	CurCert=Certs.item(1);
       		var signCol = signColumn.split(',');
  			for (var i = 0; i < datas.length;  i++) {
  				var signStringVal = "";
  				// 如果wfStatusArray中没值(needJudgeSignFlag为false)就不检查wfStatusArray是否包含该记录wfstatus直接执行签名
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
		       					alert("列表没有配置【" +signCol[j]+ "】字段或者该字段的值为空，不能进行签名!");
		      	 				return false;
							}
       					}
					}
					// 添加用户id和serverTime到签名正文和要保存的记录中
					signStringVal += userid + "/";
					signStringVal += serverTime + "/";
					datas[i].inditext13 = CurCert.SignMessage(signStringVal,OUTPUT_BASE64);
					datas[i].indinumber7 = userid;
					datas[i].inditext16 = serverTime;
  				}
			}	
			return true;
	  	} else {
	      	alert("没有查找到证书!");
	      	return false;
	  	}
	} catch(Exception) {
		alert("签名失败!");
		return false;
	}
}
  	
/*
*签名验签方法
*@params tableData 要签名的数据集合（tdetail,tmain）
*@params checkType 要签名的数据集合类型（“1”为tdetail,否则为tmain）
*@params wfStatusArray 要执行签名验签的工作流状态集合（Array类型）。
*                          为null的话，只要调用此方法所有记录都执行签名（或者先验签再签名，通过needVerify控制）；
*                          如果有值的话，只有当前的wfStatus在此数组中的记录才执行，否则不执行
*@params waitingShowMsg 等待提示框里要显示的文本，可以为null
*@params needVerify(boolean类型) 是否需要验签，可以为null（不验签）
*@params tableName 表名，如 "T_PLANMAIN"，若不需要验签，为null即可
*/
function signMessage(tableData, checkType, wfStatusArray, waitingShowMsg,
		needVerify, tableName) {
	var success = true;
	if ("function" == typeof(beforeSignMessage))
		success = beforeSignMessage();
	if (!success){
		alert("签名失败！");
		return false;
	}
	var datas, verifyDatas = null;
	// 不再进行tableData是否未定义或者是否为空的判断，如果出现这种情况，就需要检查脚本是否有误
	if (Array == tableData.constructor)
		datas = tableData;
	else if ("undefined" != typeof(checkType) && "1" == checkType)
		datas = tableData.data;
	else
		verifyDatas = datas = tableData.getSelectedRow();
	if (null == datas || datas.length <= 0){
		alert("请选择要操作的记录！");
		return false;
	}
	waitingShowMsg = (null == waitingShowMsg || "" == waitingShowMsg) ? "共有【" +datas.length+ "】条记录正在签名，请稍后..."
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
		alert("验签失败！");
		return false;
	}
	if ("function" == typeof(collectSignData))
		datas = collectSignData();
	success = certSignMessage(datas, wfStatusArray);
	closeWaitDialog();
	return success;
}

/*
*专为新增时的验签
*@params tableName 表名，如 "T_PLANMAIN"，不能为空
*@params waitingShowMsg 等待提示框里要显示的文本，可以为null，或者不写
*可以如下调用：verifySignatureForCreate("T_PLANMAIN", null)或者verifySignatureForCreate("T_PLANMAIN")
*			     或者verifySignatureForCreate("T_PLANMAIN", "正在验签，请稍后...")
*/
function verifySignatureForCreate(tableName, waitingShowMsg) {
	var datas = tmain.getSelectedRow();
	if (null == datas || datas.length <= 0){
		alert("请选择要操作的记录！");
		return false;
	}
	waitingShowMsg = ("undefined" == waitingShowMsg || null == waitingShowMsg || "" == waitingShowMsg) 
						? "共有【" +datas.length+ "】条记录正在验签，请稍后..." : waitingShowMsg;
	showWaitDialog(waitingShowMsg);
	var success = checkIcaSign(datas, tableName);
	if (!success)
		alert("验签失败！");
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

//公用返回方法
function goBack() {
	var needGoBack = false;
	var selectedRows = tmain.getSelectedRow();
	//如果tmain中有勾选则认为需要保存
	if (selectedRows.length > 0 && confirm("数据未保存，是否保存数据？")) {
		var buttonValue;
		JQ(":button").each(function(){
			buttonValue = this.value;
			//找到 [保存]按钮
			if (null != buttonValue && "" != buttonValue && buttonValue.search(/保存/) >= 0 
					&& buttonValue.search(/继续/) < 0) {
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
*公用收款账号弹出数树调用方法：数据为临时表T_PAYTEMPLATE，通过用户userid共享查询，方式为：可录入可选择。
* modify 20130111 设置单位共用账户，单位内容可以看到，传入bdgagency。
*/
function selectBankByUser(gatheringbankacctname,gatheringbankacctcode,gatheringbankname){
	//  modify 20130111 设置单位共用账户，单位内容可以看到，传入bdgagency。
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
 * 加载自动匹配核销控制
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
							    	if (node.innerHTML && node.outerText && node.outerText=="启用自动匹配" && result=="1") {
							    		node.childNodes[0].childNodes[0].innerHTML = "关闭自动匹配";
							   			node.childNodes[0].title = '关闭自动匹配';
							   			break;
							    	}
							    }
							} else {
								for (var i =0; i<document.getElementById("query_t").childNodes.length; i++) {
							    	var node = document.getElementById("query_t").childNodes[i];
							    	if (node.innerHTML && node.outerText && node.outerText=="启用自动匹配") {
							    		node.style.display = "block";
							   			break;
							    	}
							    }
							}
						},
						onFailure : function(resp) { 
							alert("操作失败！");
						}
					});
}

/*
 * 自动匹配核销开关控制
 */
function doChangeAutoMatch(){
	var url = ROOT_PATH+'/common/indiautomatch/changeautomatch.do';
	var changedate = "";
	var changeMessage = "";
	var node;
	for (var i =0; i<document.getElementById("query_t").childNodes.length; i++) {
    	node = document.getElementById("query_t").childNodes[i];
    	if (node.innerHTML && node.outerText && node.outerText=="关闭自动匹配") {
    		changedate = "0";
    		changeMessage = "启用自动匹配";
   			break;
    	} else if (node.innerHTML && node.outerText && node.outerText=="启用自动匹配") {
    		changedate = "1";
    		changeMessage = "关闭自动匹配";
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
							alert("操作失败！");
							closeDiv();
						}
					});
}

/*
 * 根据子单数据打印（兼容龙图报表）
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
	      alert("请选择要查看的记录");
	      return false;
	    }
	    if(selectrows.length>1){
	      alert("只能选择一条记录查看");
	      return false;
	    }
	    var subdata= new Object();
	    try{
	    	if(selectrows[0].vchtypeid==null||selectrows[0].vchtypeid==""){
	    		alert("缺少配置，请联系系统管理员，添加配置vchtypeid!");
	    		return;
	    	} else {
	    		subdata.vchtypeid = selectrows[0].vchtypeid;
	    	}
	    	if(selectrows[0].billid==null||selectrows[0].billid==""){
	    		alert("缺少配置，请联系系统管理员，添加配置billid!");
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
	    window.open(url,"签章情况",features);
		//formCommonsAuditinfo.maindata.value=maindata;	
	    //formCommonsAuditinfo.submit();
}


/*** add 20120730 退回，作废等操作意见 提供可选择项。bug46939
tmain:审核单据对象
type：否定意义：0，肯定为1 也就是说，0需要写审意见，1默认是同意,不用写意见
auditinfo :默认审核意见
*/

function fillGoBackAuditInfo(tmain,type,auditinfo){
 var selectrows = tmain.getSelectedRow();
	if (selectrows.length < 1) {
        alert("请选择要操作的记录！");
        return false;
    }   
    var result = auditinfo;
    if(type==0){
    	
    	// 改用交易凭证，操作意见可配置为选择框或者弹出树.
        //var result = window.showModalDialog("/pay/goBackAuditSelectInfo.jsp?auditinfo="+auditinfo,"",'dialogWidth=400px;dialogHeight=350px;status=yes;toolbar=no;help=no;menubar=no;directories=no;resizable=no;Scrollbars=no');    
    	var result = window.showModalDialog("/pay/getGobackInfo/findinfo.do?auditinfo="+auditinfo+"&linkvchtypeid="+linkvchtypeid+"&mainmenu="+getparam("mainmenu")+"&submenu="+getparam("submenu"),"",'dialogWidth=500px;dialogHeight=350px;status=yes;toolbar=no;help=no;menubar=no;directories=no;resizable=no;Scrollbars=no');
    }
 //给选中的行赋值
 if(typeof(result)=="undefined")return false;
	if(selectrows.length==1){
	  selectrows[0].auditOpinion=result;
	  return true;
	 }else{	
	 	if(type==0){
	 		if(confirm("是否对"+selectrows.length+"条业务单据置同样的审核意见？")){
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
//支票号唯一验证(公用)20140327添加重复提示修改BUG11337
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
    								exists= !(confirm("此支票号已使用，是否继续录入？"));
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

//支票号根据结算方式判断是否必填(公用) add 20131123 bug 8923 青岛
function isNullIndiText1BySettlemode(){
	if(typeof($("detailform").settlemode)!="undefined" &&$("detailform").settlemode.value!=""){
		if(typeof($("detailform").inditext1)!="undefined" &&$("detailform").inditext1.value!=""){
		}
		var settlemode_code = $("detailform").settlemode.value.split("-")[0];
		if(typeof($("detailform").inditext1)!="undefined" &&$("detailform").inditext1.value==""
			&&(settlemode_code=="2"||settlemode_code=="3")){
			alert("结算方式为转账支票或者现金支票，支票号必填。");
			return false;
		}
	}
	return true;
}

// add 20120831 作废  方法  function drawauditcol()
col = createColumnConfig();
col.id = "audit";
col.name = "audit";
col.type = "S";
col.title = "审核";
col.show = function(rownum,value,row,tdobj,datatable){
		tdobj.innerHTML = "<img src='../../../ifmis_images/done_btn/audit.gif' alt='审核' onclick='auditflag=1;' />";
}
ColumnConfig[col.id.toLowerCase()]=col;	

function showFilesInfo(billid) {
	var url="/indi/filesinfo.do?billid="+billid;
	var features = "top=150,left=50,width=750,height=500,scrollbars=yes,resizable=yes";
    window.open(url,"附件情况",features);
}

// 重定义indinumber9列的显示
col = createColumnConfig();
col.id = "indinumber9";
col.name = "indinumber9";
col.type = "S";
col.title = "附件标识";
col.show = function(rownum,value,row,tdobj,datatable){
	var aInnerHTML;
	if (1 == value)
		aInnerHTML = "<img src='/indi2exe/common/attachment.gif' alt='有附件' onclick='showFilesInfo("+row.billid+")'/>";
	else
		aInnerHTML = "";
	tdobj.innerHTML = aInnerHTML;
}
ColumnConfig[col.id.toLowerCase()]=col;

/*
*公用收款账号弹出数树调用方法：数据为临时表T_PAYTEMPLATE和银行账户表T_PUBBANKACCOUNT，方式为：可录入可选择。
*/
function selectAllBankAccount(agencyId,gatheringbankacctname,gatheringbankacctcode,gatheringbankname){
	if(agencyId==null) 
	{
	    alert("请选择来源数据");
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
* 控制清算数据额度必须导出
*/
function checkExporttagForClear(){
	show();
	var exists = false;
	var selectedRows = tmain.getSelectedRow();
    if ( selectedRows == null || selectedRows.length <= 0) {
    	alert("请选择一行数据!");
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
							 			closeDiv();alert("额度导出校验出现未知异常，操作失败!");
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
*对某种属性的单据进行操作时，对操作进行提示
*如果选择的行中含有输入的colname，则弹出info，同时返回false，否则返回true。
*如果没有选中则返回true
*@tmain表单对象名称
*@ colname 属性
*@colvalues  属性值  数组格式[00,01]
*@info  提示信息
checkDetailCandoIt(tmain,'wfstatus',['00','01'],"不能修改00、01的数据")
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
							alert("操作失败！");
							closeDiv();
						},
						asynchronous:false
					});
	return success;
}

/**
 * 多选来源数据项后，根据选择数据项的值添加明细，不支持无来源的多选树.
 * @param colid 必须，数据项名（小写）
 * @param elementFilter 可选，多选树选择过滤条件，和编辑区里的过滤条件的配置方法一样
 */
function multiAddDetailBySelectTree(colid, elementFilter) {
	// 如果为tdetail说明是有来源的，否则为无来源的
	var dataTableObj = ("undefined" != typeof(tdetail) ? tdetail : tmain);
	var inputObj = $(colid+"Temp");
	if (null == inputObj) {
		inputObj = document.createElement("<input type=hidden id="+colid+"Temp />");
		document.body.appendChild(inputObj);
	} else  {
		// 多次调用该方法时，清空上一次选择的数据
		inputObj.value = null;
		inputObj.valueid = null;
		inputObj.isleaf = null;
		inputObj.valuecode = null;
	}
	elementFilter = ("undefined" == typeof(elementFilter) || null == elementFilter ? "" : elementFilter);
	// 调用框架选择树
	selectMutlElememt(dataTableObj.mainmenu, dataTableObj.submenu, dataTableObj.vchtypecode+"", colid, inputObj, "", elementFilter, null);
	if ("undefined" == inputObj.value || null == inputObj.value || "undefined" == inputObj.valueid || null == inputObj.valueid)
		return;
	
	var codeNamePairArray = inputObj.value.split(";");
	var itemidArray = inputObj.valueid.split(",");
	inputObj.isleaf = ("undefined" != typeof(inputObj.isleaf) && null != inputObj.isleaf ? inputObj.isleaf : "");
	var isleafArray = inputObj.isleaf.split(",");
	isleafArray = (isleafArray.length != itemidArray.length ? null : isleafArray);
	var mainRow;
	// 产生生成子单数据的原型
	if (dataTableObj != tmain)
		mainRow = Object.clone(tmain.getSelectedRow()[0]);
	else
		mainRow = new Object();
	// 同步编辑区数据到子单原型
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
	// 此语句并非必须，其实并不属于这个公用方法的必须部分，主要是为了兼容无来源的新增（由radio改为checkbox后，更少的修改代码）
	if ("undefined" != detailObj)
		detailObj = newRow;
	dataTableObj.draw();
}

/**
 * 根据主单billid查找子单.
 * @param billid 主单billid
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
				alert("获取明细数据失败，请重试！");
			}
		},
		onFailure : function(resp) {
			closeDiv();
			alert("获取明细数据失败，请重试！");
		}
	});
}

/**
 * 检查主子结构的一致性（主要为了验签时使用）
 * @param billids 主单billids
 * @param mainTable 主单表名
 * @param subTable 子单表名
 * @param subForeignKeyForMain 子单关联到主单billid的外键标识，可为空，如果为空，则默认为mainid
 * @param checkColumn 检查的列名（以半角逗号分隔），可为空，如果为空则根据签名配置列（除amt）来校检
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
						alert("操作失败！");
					}
				},
				onFailure : function(resp) { 
					success = false;
					alert("操作失败！");
				},
				asynchronous:false
			});
	return success;
}

/**
 * 导入结束后刷新本页面 
 */
function returnBack() {
	if(window.location.href.indexOf("?") > -1){
 		window.location.href = window.location.href.replace("?","?fromquery=yes&");
 	} else {
		window.location.reload();
	}
}

//收款账号是否对应多个收款账户名验证(公用)
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
							alert("检查收款账号唯一性出错，请重试！");
            				continueSave = false;
        				}
    				});
    return continueSave;
}

//查看项目绩效指标功能
function checkprogram(tmain){
	if(tmain.getSelectedRow().length > 0) {
		if (tmain.getSelectedRow().length > 1) {
			alert("请选择单条数据进行查看!");
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
    								window.open(url, "查看项目绩效", features);
								}else{
									alert(rs);
								}
                			}
        				},
        				onFailure: function(e){
							alert("操作失败！");
        				}
    				});
		}
	}else{
		alert("请选择要查看的单据!");
	}
}

//附件上传
function upload_plan(){
	var selectRow=new Array();
 	var num=tmain.getSelectedRow(); 
 	if(num.length<1){
 		alert("请选择要操作的单据！");
  	  	return;
 	}
  	if(num.length>1){
  		alert("只能选择一条操作单据");
  	  	return;
  	}
  	var url = ROOT_PATH + '/plan/common/manage/uploadfile/index.do?maindata='+num[0].billid;
	window.open(url,"_blank","status=yes,scrollbars=yes,toolbar=no,menubar=no,location=no");
}

// 查询指标附件信息
function show_files_plan() {
	var selectrows = tmain.getSelectedRow();
    if(selectrows.length==0){
      alert("请选择要查看的记录");
      return false;
    }
    if(selectrows.length>1){
      alert("只能选择一条记录查看");
      return false;
    }
    var subdata= new Object();
    try{
    	if(selectrows[0].billid==null||selectrows[0].billid==""){
    		alert("缺少配置，请联系系统管理员，添加配置billid!");
    		return;
    	} else {	
    		subdata.billid = selectrows[0].billid;
    	}	
    }catch (e){
    	
    }
    var maindata=Object.toJSON(subdata);
    var url="/plan/filesinfo.do?billid="+selectrows[0].billid;
	var features = "top=150,left=50,width=750,height=500,scrollbars=yes,resizable=yes";
    window.open(url,"附件情况",features);
}

function doWorkVou(operateType,printPara){
	doCommonAction(operateType,'false',printPara);
}

function doCancelWorkVou(operateType){
	doCommonAction(operateType,'true');
}

// 通用操作方法
function doCommonAction(operateType,iscancel,printPara) {
	
	var selectrows = tmain.getSelectedRow();
	if (selectrows==null||(selectrows != null && selectrows.length < 1)) {
        alert("请选择要操作记录！");
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
   		alert("你当前未选中单据或当前面配置不正确，请与管理员联系！");
   		closeDiv();
   		return;
   	}
   	//默认给审核操作
   	if(typeof(operateType)=='undefined'){
   		operateType = '7';
   	}
   	var pars = 'maindata=' + subdata.toJSON() +'&operatetype='+operateType+'&iscancel='+iscancel+'&submenu='+getArgs()["submenu"];
   	var myAjax = new Ajax.Request(url,{method: 'post', parameters: pars,onComplete : function (resp){afterDoCommonAction(resp,printPara);},
							 onFailure : function(resp) {
							 	closeDiv();alert("您的操作出现未知异常，操作失败！");
							 }});
}

//通用操作方法回调方法
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
    
    // 当没页签时候,不刷新页面操作后更新单据状态
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
	    			//更新监控字段
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
//所有追加指标
function show_all_assigned_Indi(){
    var selectedRow = tmain.getSelectedRow();
    if(selectedRow.length==0){
      	alert("请首先选择1个记录，然后按[所有追加指标]！");
      	return false;
    }
    if(selectedRow.length>1){
      	alert("只能选择1个记录，然后按[所有追加指标]！");
      	return false;
    }
	if(selectrows[0].billid==null||selectrows[0].billid==""){
    	alert("缺少配置，请联系系统管理员，添加配置billid!");
    	return;
    }
    var billid = selectedRow[0].billid;
    var url = ROOT_PATH+"/commons/showAllAssignedIndiAction.do?";
    url = url + "&billid="+billid;
	var features = "top=150,left=50,width=750,height=450,scrollbars=yes,,resizable=yes,status=yes";
    window.open(url, "所有追加指标", features);
}
/**
 * 审核并下达
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
								 alert("操作失败!");
							 }
						});
    } else {
    	alert("请选择要操作的单据!");
    }
}
/**
 * 取消审核并下达
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
								 alert("操作失败!");
							 }
						});
    } else {
    	alert("请选择要操作的单据!");
    }
}

//指标附件上传
function upload_indi(){
	var selectRow=new Array();
 	var num=tmain.getSelectedRow(); 
 	if(num.length<1){
 		alert("请选择要操作的单据！");
  	  	return;
 	}
  	if(num.length>1){
  		alert("只能选择一条操作单据");
  	  	return;
  	}
  	var url = ROOT_PATH + '/indi/common/manage/uploadfile/index.do?maindata='+num[0].billid;
	window.open(url,"_blank","status=yes,scrollbars=yes,toolbar=no,menubar=no,location=no");
}

// 查询指标附件信息
function show_files_indi() {
	var selectrows = tmain.getSelectedRow();
    if(selectrows.length==0){
      alert("请选择要查看的记录");
      return false;
    }
    if(selectrows.length>1){
      alert("只能选择一条记录查看");
      return false;
    }
    var url="/indi/uploadfile/filesinfo.do?billid="+selectrows[0].billid+"&vchid="+linkvchtypeid+"&document="+selectrows[0].text3;
	var features = "top=150,left=50,width=750,height=500,scrollbars=yes,resizable=yes";
    window.open(url,"附件情况",features);
}

// 支付中心用户查询附件信息
function show_files_pay() {
	var selectrows = tmain.getSelectedRow();
    if(selectrows.length==0){
      alert("请选择要查看的记录");
      return false;
    }
    if(selectrows.length>1){
      alert("只能选择一条记录查看");
      return false;
    }
    var url="/pay/uploadfile/filesinfo.do?billid="+selectrows[0].billid+"&vchid="+linkvchtypeid+"&document="+selectrows[0].text3;
	var features = "top=150,left=50,width=750,height=500,scrollbars=yes,resizable=yes";
    window.open(url,"附件情况",features);
}

// 银行用户查询附件信息
function show_files_bank() {
	var selectrows = tmain.getSelectedRow();
    if(selectrows.length==0){
      alert("请选择要查看的记录");
      return false;
    }
    if(selectrows.length>1){
      alert("只能选择一条记录查看");
      return false;
    }
    var url="/pay/uploadfile/bankfilesinfo.do?billid="+selectrows[0].billid+"&vchid="+linkvchtypeid+"&document="+selectrows[0].text3;
	var features = "top=150,left=50,width=750,height=500,scrollbars=yes,resizable=yes";
    window.open(url,"附件情况",features);
}

// 支付中心用户设置附件显示情况
function show_delfiles() {
	var selectrows = tmain.getSelectedRow();
    if(selectrows.length==0){
      alert("请选择要查看的记录");
      return false;
    }
    if(selectrows.length>1){
      alert("只能选择一条记录查看");
      return false;
    }
    var url="/pay/uploadfile/delfilesinfo.do?billid="+selectrows[0].billid+"&vchid="+linkvchtypeid+"&document="+selectrows[0].text3;
	var features = "top=150,left=50,width=750,height=500,scrollbars=yes,resizable=yes";
    window.open(url,"附件情况",features);
}

//支付附件上传
function upload_pay(isVch){
	var selectRow=new Array();
 	var num=tmain.getSelectedRow(); 
 	if(num.length<1){
 		alert("请选择要操作的单据！");
  	  	return;
 	}
  	if(num.length>1){
  		alert("只能选择一条操作单据");
  	  	return;
  	}
  	var url = ROOT_PATH + '/indi/pay/manage/uploadfile/index.do?maindata='+num[0].billid+"&isVch="+isVch;
	window.open(url,"_blank","status=yes,scrollbars=yes,toolbar=no,menubar=no,location=no");
}

//查询支付附件信息
function show_payfiles(isVch) {
	var selectrows = tmain.getSelectedRow();
    if(selectrows.length==0){
      alert("请选择要查看的记录");
      return false;
    }
    if(selectrows.length>1){
      alert("只能选择一条记录查看");
      return false;
    }
    var subdata= new Object();
    try{
    	if(selectrows[0].billid==null||selectrows[0].billid==""){
    		alert("缺少配置，请联系系统管理员，添加配置billid!");
    		return;
    	} else {	
    		subdata.billid = selectrows[0].billid;
    	}	
    }catch (e){
    	
    }
    var maindata=Object.toJSON(subdata);
    var url="/indi/pay/filesinfo.do?billid="+selectrows[0].billid+"&isVch="+isVch;
	var features = "top=150,left=50,width=750,height=500,scrollbars=yes,resizable=yes";
    window.open(url,"附件情况",features);
  
}
//结算方式为现金时 收款人名称默认为预算单位
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

//指标文号定位
function selectIndiSymbol(obj){
	var num = obj.value.length>0?obj.value.length-1:0;
    var range=obj.createTextRange(); 
    range.collapse(true);
    range.moveStart('character',num);
    range.select();
}

// 组装数据
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

// 甘肃特殊处理
function showAlertTime(datas) {
	if (datas.length > 2000) {
		var thinkMin = parseInt(datas.length/1000);
		alert("预计"+thinkMin+"分钟后处理完，请"+thinkMin+"分钟后刷新！");
	}else{
		alert("预计1分钟内处理完，请1分钟后刷新！");
	}
	closeDiv();
	return;
}
/***
tmain:审核单据对象
type：否定意义：0，肯定为1 也就是说，0需要写审意见，1默认是同意,不用写审核意见,2为添加审核意见，并显示相关信息
auditinfo :默认审核意见
exclusionWfstatus:不被显示审核意见的工作流节点
*/

function fillAuditInfo(tmain,type,auditinfo,exclusionWfstatus){
	var selectrows = tmain.getSelectedRow();
	if (selectrows.length < 1) {
        alert("请选择要操作的记录！");
        return false;
    }   
    if(typeof(exclusionWfstatus)!="undefined"&&exclusionWfstatus.length>0&&!isNotContainsExclusionWfstatus(tmain,exclusionWfstatus)){//含有exclusionWfstatus之外的工作流状态
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
 //给选中的行赋值
 if(typeof(result)=="undefined")return false;
	if(selectrows.length==1){
	  selectrows[0].auditOpinion=result;
	  return true;
	 }else{	
	 	if(type==0){
	 		if(confirm("是否对"+selectrows.length+"条业务单据置同样的审核意见？")){
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
 * 判断编辑区是否修改 
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

//自定义
col = createColumnConfig();
col.id = "amt11";
col.name = "amt11";
col.type = "S";
col.title = "已批计划比例";
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
col.title = "已批支付比例";
col.style = "text-align:right";
col.show = function(rownum,value,row,tdobj,datatable){
	value = value+"";
	tdobj.innerHTML = value.toMoneyFormat()+"%";
}
ColumnConfig[col.id.toLowerCase()]=col;

/**
 * 根据输入控制规则校验支付方式 by yanglin 20140626 BUG20536
 * @param vchcode 业务凭证
 * @param sourcelement 校验字段
 * @param onobject 编辑区校验字段值
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
								 	alert("字段校验失败！");
								 }
	   							});
	if(!issucces){
		$(sourcelement).value="";
	}   

}

/**
 * 根据输入控制规则校验支付方式 by yanglin 20140626 BUG20536(保存时校验)
 * @param vchcode 业务凭证
 * @param sourcelement 校验字段
 * @param onobject 编辑区校验字段值
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
							 	alert("字段校验失败！");
							 }
   							});
	return issucces;
}

col = createColumnConfig();
col.id = "refundlink";
col.name = "查看";
col.type = "S";
col.title = "退款";
col.show = function(rownum,value,row,tdobj,datatable){
           var tips="查看退款";
		   // tdobj.innerHTML = "<a href="+url+" color="red" title="+tips+">"+value+"</a>";
		   tdobj.value = value;
		   tdobj.myrow = row;
		   tdobj.innerHTML = "<div ALIGN='center'><a href='#' style='text-decoration:underline;color:blue;' title="+tips+" onclick='showRefundInfo(this.parentElement.parentElement)'>查看退款</a></div>";
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
