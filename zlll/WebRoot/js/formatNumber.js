String.prototype.formatNumber=function(nLength, sSymbol){
   if(!nLength) nLength=3;
   if(!sSymbol) sSymbol=',';
   return fNumFormat(this, nLength, sSymbol);
}
Number.prototype.formatNumber=function(nLength, sSymbol){
   if(!nLength) nLength=3;
   if(!sSymbol) sSymbol=',';
   return fNumFormat(this, nLength, sSymbol);
}

/*Number.prototype.toFixed=function(len)
{
	var add = 0;
	var s,temp;
	var s1 = this + "";
	s1 = s1.replace(/,/g,"");
	var start = s1.indexOf(".");
	//if(start == -1 ){
	//	return s1;
	//} 
	if(start != -1 && s1.substr(start+len+1,1)>=5){
		add=1;
	} 
	var temp = Math.pow(10,len);
	s = Math.floor(parseFloat(this,10) * temp) + add;
	return s/temp;
}*/

String.prototype.toFixed=function(len)
{   
	var add = 0;
	var s,temp;
	//var s1 = this.replace(/,/g,"");
	var s2 = this + "";
	var s1 = s2.replace(",","");

	var start = s1.indexOf(".");
	if(start == -1){
		return s1;
	} 
	var piont = s1.substr(start+1);
	if(piont.length < 3){
		return s1;
	}
	if(start != -1 && s1.substr(start+len+1,1)>=5){
		add=1;
	}	
	var temp = Math.pow(10,len);
	s = Math.floor(parseFloat(s1,10) * temp) + add;
	return s/temp + "";
}

function fNumFormat(nNumber, nLength, sSymbol){
   if(!nLength)var nLength=3;
   if(!sSymbol)var sSymbol=',';
   if(!nNumber)return false;
   
   var symbol = "";
   if(!isNaN(nNumber) && (nNumber.indexOf("-") == 0) && nNumber.length >1) {
		symbol = "-";
		nNumber = nNumber.substring(1,nNumber.length);
	}   
   
   nNumber+='';
   if(/\./.test(nNumber)){
    nNumber=nNumber.replace(/(^.*?)\./,function($1,$2){
     return padCma($2)+'.'
    });
   } else nNumber=padCma(nNumber);
   return symbol+nNumber;
  
   function padCma(str){
    var temp='';
    var nLen=str.length;
    while(nLen>nLength){
     temp=sSymbol+str.slice(nLen-=nLength, nLen+nLength)+temp;
    }
    if(nLen>0&&nLen<=3) temp=str.slice(0, nLen)+temp;
    return temp;
   }
}
function numFormat(obj){    
    var revalue=obj.value;	
	var tempvalue=obj.value;
	if(revalue.indexOf("+") == 0){
		var tefu = revalue.substring(0,1);
		tempvalue = revalue.substring(1);
		//alert("debug_0:"+tempvalue);
		if(tempvalue.indexOf(".") == 0){
			//alert("debug_0:"+tefu);
			return tefu;
		}else if(tempvalue.indexOf("0") == 0){
			if(tempvalue.indexOf(".") != 1){
				return tefu + "0";
			}
		}
	}
	else if(revalue.indexOf(".") == 0){
		return "";
	}
	else if(revalue.indexOf(".") == 1 && revalue.indexOf("-") ==0){
		return "";
	} 
	else if(revalue.indexOf("0") == 0){
		if(revalue.indexOf(".") != 1){
			return "0";
		}
	}
	//alert(tempvalue);
	if(tempvalue.indexOf("-") == 0 && tempvalue.length == 1){
		return tempvalue;
	}
	while(tempvalue.indexOf("+")>=0 || tempvalue.indexOf("-")>0){//ȥ����һ������ķ���
		if(tempvalue.indexOf("+")>=0){
			var head = tempvalue.substring(0,tempvalue.indexOf("+"));
			var last = tempvalue.substring(tempvalue.indexOf("+")+1);
			tempvalue=head+last;//ɾ������"+"���
			//alert("debug_0:"+tempvalue);
		}
		if(tempvalue.indexOf("-")>0){
			var head1 = tempvalue.substring(0,tempvalue.indexOf("-"));
			var last1 = tempvalue.substring(tempvalue.indexOf("-")+1);
			tempvalue=head1+last1;//ɾ������"-"���
		}
	}
	revalue=tempvalue;
	//alert("debug_2:"+revalue);
	var tempflag=revalue;
	if(revalue.indexOf(".")>0){
		var headn = revalue.substring(0,revalue.indexOf(".")+1);
		tempflag = revalue.substring(revalue.indexOf(".")+1);
		while(tempflag.indexOf(".")>=0){//ɾ�������С����
			headn += tempflag.substring(0,tempflag.indexOf("."));
			tempflag = tempflag.substring(tempflag.indexOf(".")+1);
		}
		revalue = headn + tempflag;	//ɾ������"."���
	}
	if(obj.value.indexOf("+")==0){//��֤ǰ�������
    	var fuhao=obj.value.substring(0,1);
		revalue = revalue.formatNumber();
		//alert("debug_3:"+revalue);
	}
	else if (obj.value.indexOf("-")==0){
		var fuhao=obj.value.substring(0,1);
		revalue = fuhao+revalue.substring(1,revalue.length).formatNumber();
	}
	else{
		revalue=revalue.formatNumber();
	}
	//alert("debug_4:"+revalue);
	
	return revalue;
}

function numFormat_new(values){    
    var revalue=values;	
	var tempvalue=values;
	if(revalue.indexOf("+") == 0){
		var tefu = revalue.substring(0,1);
		tempvalue = revalue.substring(1);
		//alert("debug_0:"+tempvalue);
		if(tempvalue.indexOf(".") == 0){
			//alert("debug_0:"+tefu);
			return tefu;
		}else if(tempvalue.indexOf("0") == 0){
			if(tempvalue.indexOf(".") != 1){
				return tefu + "0";
			}
		}
	}else if(revalue.indexOf(".") == 0){
		return "";
	}else if(revalue.indexOf(".") ==1 && revalue.indexOf("-") ==0){
		return "";
	}
	else if(revalue.indexOf("0") == 0){
		if(revalue.indexOf(".") != 1){
			return "0";
		}
	}
	while(tempvalue.indexOf("+")>=0){//ȥ����һ������ķ���
		if(tempvalue.indexOf("+")>=0){
			var head = tempvalue.substring(0,tempvalue.indexOf("+"));
			var last = tempvalue.substring(tempvalue.indexOf("+")+1);
			tempvalue=head+last;//ɾ������"+"���
			//alert("debug_0:"+tempvalue);
		}
		/*
		if(tempvalue.indexOf("-")>=0){
			var head1 = tempvalue.substring(0,tempvalue.indexOf("-"));
			var last1 = tempvalue.substring(tempvalue.indexOf("-")+1);
			tempvalue=head1+last1;//ɾ������"-"���
			//alert("debug_1:"+tempvalue);
		}*/
		
	}
	revalue=tempvalue;
	//alert("debug_2:"+revalue);
	var tempflag=revalue;
	if(revalue.indexOf(".")>0){
		var headn = revalue.substring(0,revalue.indexOf(".")+1);
		tempflag = revalue.substring(revalue.indexOf(".")+1);
		while(tempflag.indexOf(".")>=0){//ɾ�������С����
			headn += tempflag.substring(0,tempflag.indexOf("."));
			tempflag = tempflag.substring(tempflag.indexOf(".")+1);
		}
		revalue = headn + tempflag;	//ɾ������"."���
	}

	if(values.indexOf("+")==0||values.indexOf("-")==0){//��֤ǰ�������
    	var fuhao=values.substring(0,1);
		revalue = fuhao+revalue.formatNumber();
		//alert("debug_3:"+revalue);
	}else{
		revalue=revalue.formatNumber();
	}
	//alert("debug_4:"+revalue);
	
	return revalue;
}
function chkNumber(obj,isnegative){
	if(typeof(isnegative) != "undefined" && String(isnegative)=="0"){ 
    	return obj.value.replace(/[^+\d|^\.]/g,"");
    } else {
		return obj.value.replace(/[^-\d|^+\d|^\.]/g,"");
    }  
}

function formatMoneyInput(obj,len,isnegative){
	//var start = (new Date()).getTime();
	if(len==null){
		len=2;
	}
	var oldvalue = obj.value;
	var keycode  = event.keyCode;
	if(parseFloat(keycode) == 13 || parseFloat(keycode) ==9)return false;
	if(parseFloat(keycode) > 41 || parseFloat(keycode) < 36){ 
		var r,point,oldlen;
		if(oldvalue=='.'){
			obj.value='0.';
			oldvalue='0.';
		}
		if(obj.type!="hidden"){
			obj.focus();
			r = document.selection.createRange(); 
			r.collapse(false); 
			r.setEndPoint("StartToStart", obj.createTextRange());
			point= r.text.length;
			oldlen=obj.value.length;
		}
		if(keycode==109||keycode==189){//������"-"�ŵ���ǰ��
			obj.value = "-"+obj.value.replaceAll("-","");
		}
		obj.value = chkNumber(obj,isnegative);
		if(obj.value!=null&&obj.value!=""){
			//����һ��ԭ����������ԭ���� --by zjy
			var amtstate = obj.value;
			if(obj.value.length>1&&obj.value.charAt(0)=='0'&&obj.value.charAt(1)!='.') obj.value = obj.value.substring(1,obj.value.length);
			var amtint = obj.value.substring(0,obj.value.indexOf(".")==-1?obj.value.length:obj.value.indexOf("."));
			//�����ж�,�����͸�����һ��
			var checkLength = 14;
			if(typeof(isnegative) != "undefined" && String(isnegative)=="1"){ 
				checkLength = 15;
			}
			if(amtstate.indexOf('-')!=-1){
				checkLength = 15;
			}
			if("10000" == (obj.amtflag+"")){
				checkLength = checkLength-4;
			}
			if(amtint.length>checkLength){
				obj.value = obj.value.substring(0,checkLength);
				obj.value = obj.value.formatNumber();
				//��ԭ����ʱ��С��λ���� --by zjy
				if(amtstate.indexOf(".")!=-1){
					var amtfloat1 = amtstate.substring(amtstate.indexOf(".")+1,amtstate.length).replaceAll("-","");
					obj.value = obj.value+'.'+amtfloat1;
				}
				
				if("10000" == (obj.amtflag+"")){
					alert("¼��Ľ��(��Ԫ)����λֻ��¼��10λ��");
				}else{
					alert("¼��Ľ������λֻ��¼��14λ��");
				}
				return true;
			}
		}
		if(obj.value.indexOf(".")!=-1){
			var amtfloat = obj.value.substring(obj.value.indexOf(".")+1,obj.value.length).replaceAll("-","");
			if(amtfloat.length>len) {
				if(amtfloat.indexOf(".") >=0){
					obj.value = obj.value.substring(0,obj.value.indexOf(".")+1)+amtfloat.substring(0,amtfloat.indexOf("."));
					obj.value = obj.value.formatNumber();
					return;
			    }
				//obj.value = obj.value.replace(/^(\d+\.\d{2})\d*$/,"$1");
				//obj.value = obj.value.formatNumber();
				alert("¼��Ľ��С��λֻ����"+len+"λ��");
				obj.value = roundFormat(obj.value.replace(/,/g,""),len).toFixed(len);
				obj.value = obj.value.formatNumber();
				return true;
			}
		}
		obj.value = obj.value.formatNumber();
		if(obj.type!="hidden"){
			point = point +(obj.value.length-oldlen);
			r.move("character", point); 
			r.select(); 
		}
	} else {
		return false;
	}
	if(keycode == 0||keycode == 8||keycode==46||keycode >= 48&&keycode <= 57 || keycode >= 96&&keycode <= 105||keycode==109||keycode==189||keycode==110||keycode==190) {
		return true;
	}else{
		event.returnValue = false;
		return false;
	}

}

//������Ƿ��ַ��� У�飬����ʾ
function formatNumberInput(obj,len,isnegative){
	if(len==null){
		len=2;
	}
	var oldvalue = obj.value;
	var keycode  = event.keyCode;
	if(parseFloat(keycode) == 13 || parseFloat(keycode) ==9)return false;//�س���tab����
	if(parseFloat(keycode) > 41 || parseFloat(keycode) < 36){ 
		var r,point,oldlen;
		if(oldvalue=='.'){
			obj.value='0.';
			oldvalue='0.';
		}
		if(obj.type!="hidden"){
			obj.focus();
			r = document.selection.createRange(); 
			r.collapse(false); 
			r.setEndPoint("StartToStart", obj.createTextRange());
			point= r.text.length;
			oldlen=obj.value.length;
		}
		if(keycode==109||keycode==189){//������"-"�ŵ���ǰ��
			obj.value = "-"+obj.value.replaceAll("-","");
		}
		if(typeof(isnegative) != "undefined" && String(isnegative)=="0"){ 
			obj.value = obj.value.replace(/[^\d|^\.]/g,""); //�������ֻ�С���� ���滻Ϊ��
										 
	    } else {
	    	obj.value = obj.value.replace(/[^-\d|^\.]/g,"");//���Ǹ��ż����ֻ�С���� ���滻Ϊ��
	    }  
		
		obj.value = obj.value.replace(/[\^]/g,""); //�滻 Ԫ�ַ� ^
		obj.value = obj.value.formatNumber();
		if(obj.type!="hidden"){
			point = point +(obj.value.length-oldlen);
			r.move("character", point); 
			r.select(); 
		}
	} else {
		return false;
	}
	if(keycode == 0||keycode == 8||keycode==46||keycode >= 48&&keycode <= 57 || keycode >= 96&&keycode <= 105||keycode==109||keycode==189||keycode==110||keycode==190) {
		return true;
	}else{
		event.returnValue = false;
		return false;
	}

}

//�ύǰ������ж��ţ���objList��Ҫ��Ӷ��ŵ�Name�б�
function sumbitClearFlag(objList){
    if(objList!=null){
        if(objList.length>0){
            for(i = 0;i<objList.length;i++){
                var myinp = document.getElementsByName(objList[i]);
                if(myinp!=null){
                    for(j = 0;j<myinp.length;j++){
                      if(myinp[j].value != null){
                          while(myinp[j].value.indexOf(",") >= 0){
                              myinp[j].value= myinp[j].value.replace(',','');
                          }
                      }
                   }
                }
            }
        }   
    }       
}

//ҳ������ʱ������ж��ţ���obj��Ҫ��Ӷ��ŵ�Name�б�
function loadFormAddFlag(objList){   
    if(objList !=null ){    
        if(objList.length>0){ 
            sumbitClearFlag(objList);           
            for(i = 0;i<objList.length;i++){
                //alert(objList[i]);               
                var myinp = document.getElementsByName(objList[i]);                
                if(myinp!=null){           
                    for(j = 0;j<myinp.length;j++){
                        //alert(myinp[j].value);
                        if(myinp[j].value!=null){
                            myinp[j].value = myinp[j].value.formatNumber();
                        }
                    }	
                }
            }
        }
    }   
}

//�������(input)����
function clearflag(){
    var myinp = document.getElementsByTagName("input");
    if(myinp!=null){
       for(i = 0;i<myinp.length;i++){
          if(myinp[i].value != null){
              while(myinp[i].value.indexOf(",") >= 0){
                  myinp[i].value= myinp[i].value.replace(',','');
              }
          }
       }
    }
}
//����ʱ���Ӷ���
function loadfrm(obj){
    var myinp = document.getElementsByName(obj);	
    if(myinp!=null){           
        for(i = 0;i<myinp.length;i++){
            if(myinp[i].value!=null){
                myinp[i].value = myinp[i].value.formatNumber();
            }
        }	
    }
}
//���������
function accAdd(arg1,arg2){
    var r1,r2,m;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2))
    return (arg1*m+arg2*m)/m
}

function roundFormat(number,fractionDigits){
    var temp = Math.pow(10,fractionDigits);   
    var s = Math.round(accMul(number, temp))   
    return s/temp; 
}
//�����γ˷���д������˷�ʱ����1.005ʧȥ����
function accMul(arg1,arg2)  
{  
	var m=0,s1=arg1.toString(),s2=arg2.toString();  
	try{m+=s1.split(".")[1].length}catch(e){}  
	try{m+=s2.split(".")[1].length}catch(e){}  
	return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)  
}
//ȥ������
function replaceNegFlag(value,isnegative){
	if(String(isnegative)!="1") 
	{
		value = value.replaceAll("-","");
	}
	return value;
}
//���ΪС����ȡ����������
function getIntPart(value){
	var symbol = "";
	if((value.indexOf("-") == 0) && value.length >1) 
	{
		symbol = "-";
		value = value.substring(1,value.length);
	} 
	value = value.replace("+","").replace(/,/g,"");
	value = value.trim();
	if(value.length>0&&value.charAt(value.length-1)=='.')
	{
		value = value.substr(0,value.length-1);
	}
	return {value:value,symbol:symbol};
}
//
function formatAmt(value,isnegative,amtFlag){
	var symbol = "";
	if(value.trim()=="") 
	{
		return value;
	}
	value = replaceNegFlag(value, isnegative);
	if(value.indexOf("-")== 0 && value.length ==1)
	{
		return "-";
	}
	var obj = getIntPart(value);
	symbol = obj.symbol;
	value = obj.value;
	//���Ϊ��ʱ����λ��ֱ����ȥ
	if(symbol!="") {
		value = Math.round(symbol+accMul(value,Math.pow(10,2))*amtFlag)/Math.pow(10,2);
	} else{
		value = symbol+Math.round(accMul(value,Math.pow(10,2))*amtFlag)/Math.pow(10,2); 
	}
	if(isNaN(value)) value = 0;
	return value;
}
//�������������ʾ��
function formatToHidamt(value,isnegative,amtFlag){
	var symbol = "";
	var len = 2;
	if(value.trim()=="")
	{
		return value;
	}
	value = replaceNegFlag(value, isnegative);
	if(value.indexOf("-")== 0 && value.length ==1)
	{
		return "-"; 
	}
	var obj = getIntPart(value);
	symbol = obj.symbol;
	value = obj.value;
	if(amtFlag>1)
	{
		//len = 6;
		value = Math.round(value)/amtFlag; 
	}else{
		value = Math.round(accMul(value,Math.pow(10,2))*amtFlag)/Math.pow(10,2);
	}
	if(isNaN(value)) value = 0;
	//value = value.toString().replace(/^(\d+\.\d{2})\d*$/,"$1");
	//tofixe���ڴ˴����У������ǧλ��ʱ�������ȱʧ
	value = value.toString().toFixed(len).formatNumber();
	return symbol+value;
}
/** 
 * ��ʽ��������ʾ��ʽ  
 * �÷� 
 * numberFormat(12345.999,'#,##0.00'); 
 * numberFormat(12345.999,'#,##0.##'); 
 * numberFormat(123,'000000'); 
 * @param num 
 * @param pattern 
 */  
function numberFormat(num,pattern){  
  num = Number(num);
  var strarr = num?num.toString().split('.'):['0'];  
  var fmtarr = pattern?pattern.split('.'):[''];  
  var retstr='';  
  
  // ��������  
  var str = strarr[0];
  var isnegative = "";
  if(str.indexOf("-")>-1){ //������������� ����������λ������λС������BUG
	  isnegative = "-";
	  str = str.split("-")[1];
  }
  var fmt = fmtarr[0];  
  var i = str.length-1;    
  var comma = false;
  for(var f=fmt.length-1;f>=0;f--){  
    switch(fmt.substr(f,1)){  
      case '#':  
        if(i>=0 ) retstr = str.substr(i--,1) + retstr;  
        break;  
      case '0':  
        if(i>=0) retstr = str.substr(i--,1) + retstr;  
        else retstr = '0' + retstr;  
        break;  
      case ',':  
        comma = true;  
        retstr=','+retstr;  
        break;
    }
  }  
  if(i>=0){  
    if(comma){  
      var l = str.length;  
      for(;i>=0;i--){  
        retstr = str.substr(i,1) + retstr;  
        if(i>0 && ((l-i)%3)==0) retstr = ',' + retstr;   
      }  
    }  
    else retstr = str.substr(0,i+1) + retstr;  
  }  
  
  retstr = retstr+'.';  
  // ����С������  
  str=strarr.length>1?strarr[1]:'';  
  fmt=fmtarr.length>1?fmtarr[1]:'';
  i=0;  
  for(var f=0;f<fmt.length;f++){  
    switch(fmt.substr(f,1)){  
      case '#':  
        if(i<str.length) retstr+=str.substr(i++,1);  
        break;  
      case '0':  
        if(i<str.length) retstr+= str.substr(i++,1);  
        else retstr+='0';  
        break;  
    }  
  }  
  return isnegative+retstr.replace(/^,+/,'').replace(/\.$/,'');  
}