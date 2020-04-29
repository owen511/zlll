//设置所有功能按钮不可用
//指标模块使用
function disabledFunctionButton(){
	var element = document.getElementsByTagName('input');
	var length = element.length;
	
	for(var i = 0; i < length; i++){
		if(element[i].type=="button" || element[i].type=="submit"){
			element[i].disabled=true;
		}
	}
}
function enabledFunctionButton(){
	var element = document.getElementsByTagName('input');
	var length = element.length;
	
	for(var i = 0; i < length; i++){
		if(element[i].type=="button" || element[i].type=="submit"){
			element[i].disabled=false;
		}
	}
}



//统计表格中的值
function sumAmt(tmain,amtname){
	if(typeof(amtname)=="undefined"){
		var amtname = "amt";
	}
	var sumAmtColumn = '0.00';			
	var selectrows = tmain.data;	
	for(var i=0;i<selectrows.length;i++){
		var m = '0.00';	
		if(typeof(eval('selectrows['+i+'].'+amtname))!='undefined'){
			if(typeof(eval('selectrows['+i+'].'+amtname))=="number"){
				m = String(eval('selectrows['+i+'].'+amtname));
			}else{
				m = eval('selectrows['+i+'].'+amtname);
			}
			
		}
		
		m = m.replace(/,/g,"");				
		sumAmtColumn = accAdd(parseFloat(sumAmtColumn), parseFloat(m));
	}
	return 	sumAmtColumn;		
}

//统计表格中的选中值
function sumAmtBySel(tmain,amtname){
	var otmain = new Object();
	otmain.data = new Array();
	otmain.data = tmain.getSelectedRow();
	return sumAmt(otmain,amtname);		
}

//浮点数相乘
function accMul(arg1,arg2){
    var m=0,s1=arg1.toString(),s2=arg2.toString();
    try{m+=s1.split(".")[1].length}catch(e){}
    try{m+=s2.split(".")[1].length}catch(e){}
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
}

function moneyFormatToNumber(m){
    if(m==null || m=="")
      return 0;
    m=m+"";
	m = m.replace(/,/g,"");
	return m;
}

//修改编辑区可用 非可用
function setDisabled(flag){
	if(flag ==false){
		enableMainEditFormInput();
		enableEditFormInput();
	}
	if(flag ==true){
		disEnableMainEditFormInput();
		disEnableEditFormInput();
	}
}

function showLastupdatetime(rownum,value,row,tdobj,datatable){
if(row.lastupdatetime != null){ 
 var optiondate = new Date(parseInt(value,10)); 
 var clock = optiondate.getHours()+':';  
 if (optiondate.getMinutes() < 10)  clock += '0';  
 clock += optiondate.getMinutes()+':'; 
 if (optiondate.getSeconds() < 10)  clock += '0';  
 clock += optiondate.getSeconds(); 
 tdobj.innerHTML = optiondate.getYear()+""+ (optiondate.getMonth() + 1) +""+optiondate.getDate(); 
 }
}

function getCurrentDate(format){
	if(typeof(format)=="undefined"){
		 format='';
	 }
	var d=new Date();
	var curMonth=d.getMonth()+1;
	if(curMonth<10){
		curMonth='0'+curMonth;
	}
	var curDate=d.getDate();
	if(curDate<10){
		curDate='0'+curDate;
	}
	return d.getYear()+format+curMonth+format+curDate;
}

function limitNum(obj) {
    obj.value=obj.value.replace(/[^0-9]/g,'');
}

function checkLength(obj,ilen,scaption){
  if(obj.value!=null && obj.value!=""){
			if(obj.value.length>ilen){
			    var strcaption ="";
			    if (scaption != null)
			    	strcaption = scaption;    
			//	alert(strcaption+"录入数据不能超过"+ilen+"位！"); 
				obj.value = obj.value.substring(0,ilen);
				return false;
			}
   }
   return true;		
}

//验证身份证号
function checkcard(obj){
	if(obj.value==null||obj.value.length==0)return true;
	var isIDCard1=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/; 
	var isIDCard2=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[0-9xX])$/; 
	if(isIDCard1.test(obj.value)==true||isIDCard2.test(obj.value)==true){
		obj.value = obj.value.toUpperCase();
		return true;
	}else{
		alert("提示：身份证号不合法!");
		return false;
	}
}
/**
*	比较两个行对象是否相等，用于判断数据是否修改。如果修改将修改标识设为真 .modify = 'true';
*
**/
function compareRowObj(rowdata,oldrowdata){
	try{
		if(oldrowdata==null||rowdata==null){
			return false;
		}
		var oldrowdatastr=Object.toJSON(oldrowdata);
		var rowdatastr=Object.toJSON(rowdata);
		if(oldrowdatastr!=rowdatastr){
			for(var key in rowdata){
				if(oldrowdata[key]!=rowdata[key]){
					if(!isNaN(oldrowdata[key])&&!isNaN(rowdata[key])&&(parseFloat(oldrowdata[key])-parseFloat(rowdata[key]))==0){
						continue;
					}
					rowdata.modify = 'true';
					return true;
				}
			}
		}
	}catch(err){
		alert(err);
	}
	return false;
}