
function isPlusInteger(str){
  return (new RegExp(/^[0-9]*[1-9][0-9]* || -[0-9]*[1-9][0-9]*$/)).test(str);
}

function isInteger(str){
  return (new RegExp(/^[0-9]*$/)).test(str);
}

function isMail(mail){
  return (new RegExp(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)).test(mail);
}


function isMoney(str){
  return (new RegExp(/^\d{1,10}$|\.\d{1,6}$/).test(str));
	//return (new RegExp(/\d+\.?\d{2}/).test(str));
}


function isFloat(str){
	return (new RegExp(/^\d{1,10}$|\.\d{1,6}$/).test(str));
}


function isNumber(num){
  return !isNaN(num);
}


function ltrim(s){
 return s.replace( /^\s*/, "");
}


function rtrim(s){
 return s.replace( /\s*$/, "");
}


function trim(s){
 return rtrim(ltrim(s));
}


function isEmpty(s){
 var tmp_str = trim(s);
 return tmp_str.length == 0;
}

function betweenLength(val,start,end){
	var temp_str = trim(val);
	return temp_str.length>=start && temp_str.length<end;
}


function isPhone(phoneNum){
	return (new RegExp(/^((\(\d{3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}$/)).test(phoneNum);
}


function isMobile(mobileNum){
	return (new RegExp(/^((\(\d{3}\))|(\d{3}\-))?13\d{9}$/)).test(mobileNum);
}


function isURL(u){
	return (new RegExp(/^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/)).test(u);
}

function isIP(ip){
	return (new RegExp(/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/)).test(ip);
}


function isZipCode(zipCode){
	return (new RegExp(/^[1-9]\d{5}$/)).test(zipCode);
}


function isChinese(chinses){
	return (new RegExp(/^[\u0391-\uFFE5]+$/)).test(chinses);
}


function isEnglish(english){
	return (new RegExp(/^[A-Za-z]+$/)).test(english);
}


function isNumLetUnd(nlu){
 	return (new RegExp(/^[A-Za-z\d_]+$/)).test(nlu);
}

function isYear(year){
	return (new RegExp(/^(20)[\d]{2}$/).test(year));
}

function isDate(str) {
	var r = str.match(/^(\d{1,4})(-|\/|)(\d{1,2})\2(\d{1,2})$/);
	if(r==null)return false;
	var d= new Date(r[1], r[3]-1, r[4]);

	return str.length==8 && (r[1].length==4 && d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]);
}

//物理表名
function isTable(str){
	
	return (new RegExp(/^[a-zA-Z]{1}([a-zA-Z0-9]|[_]){4,28}$/)).test(str);
}

function Str2Date(str){
	if(str==null || str==""){
		return null;
	}
	var strarray = str.split("-");
	date = new Date();
	date.setYear(strarray[0]);
	date.setMonth(strarray[1]-1);
	date.setDate(strarray[2]);
	return date;
}

function Date2Str(date){
  if(date==null){
  	return "";
  }
	var str = "";
	str+=date.getYear();
	str+="-";
	month = date.getMonth()+1;
	strMonth = month.toString();
	if(strMonth.length<2){
		strMonth = "0"+strMonth;
	}
	str+=(strMonth);
	str+="-";
	day = date.getDate();
	strDay = day.toString();
	if(strDay.length<2){
	  strDay = "0"+strDay
	}

	str+=strDay;
	return str;
}

function FullDate2Str(date){
  if(date==null){
  	return "";
  }
	var str = "";
	str+=date.getFullYear();
	str+="-";
	month = date.getMonth()+1;
	strMonth = month.toString();
	if(strMonth.length<2){
		strMonth = "0"+strMonth;
	}
	str+=(strMonth);
	str+="-";
	day = date.getDate();
	strDay = day.toString();
	if(strDay.length<2){
	  strDay = "0"+strDay
	}
	str+=strDay;
	
	str+=" ";
	var hour = date.getHours();
	var strHour = hour.toString();
	if(strHour.length<2){
		strHour = "0"+strHour;
	}
	str+=strHour;
	
	str+=":";
	var minu = date.getMinutes();
	var strMinu = minu.toString();
	if(strMinu.length<2){
		strMinu = "0"+strMinu;
	}
	str+=strMinu;
	
	str+=":";
	var sec = date.getSeconds();
	var strSec = sec.toString();
	if(strSec.length<2){
		strSec = "0"+strSec;
	}
	str+=strSec;
	
	return str;
}

function formatDate(date,option){
  if(!option){
    option = "yyyy-MM-dd HH:mm";
  }
  option.replace();
}

function formatDate(date,option){
  if(typeof date == 'string') v = parseDate(v); 
  if(date instanceof Date){
    var result;
    if(!option){
      option = "yyyy-MM-dd HH:mm"; 
    }
    result = option;
    var rey4 = /yyyy/g;
    var reM2 = /MM/g;
    var red2 = /dd/g;
   
    var reH2 = /HH/g;
    var rem2 = /mm/g;
    var res2 = /ss/g;
   
    result = result.replace(rey4,date.getFullYear());
    result = result.replace(reM2,((date.getMonth()+1<10)?"0":"")+(date.getMonth()+1));
    result = result.replace(red2,date.getDate());
   
    result = result.replace(reH2,date.getHours());
    result = result.replace(rem2,((date.getMinutes()<10)?"0":"")+date.getMinutes());
    result = result.replace(res2,((date.getSeconds()<10)?"0":"")+date.getSeconds());
    return result;
  }
  return '';
}



