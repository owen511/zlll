/**
 add by yxs
**/
var doReturn_1 = "";
var dobin = null;
var textObjct = null;

function dealText(sText){
  doReturn_1 = sText;
  if(dobin != null){
    if(doReturn_1 != null && doReturn_1.length > 2)
        dobin.data = ParseJson(doReturn_1);
     else
         dobin.data = new Array();  
     dobin.show();		
  }
}
function process(){
	if (xmlHttp.readyState==4){
		if(xmlHttp.status==200){
		    dealText(xmlHttp.responseText);
		}
	}
}

function sendAjax(strUrl,doi){
    dobin = doi;
	createXmlHttp();	
	xmlHttp.open("post",strUrl,true);
	
    xmlHttp.onreadystatechange=process;
	xmlHttp.send(null);
}

function createXmlHttp(){
     if(window.ActiveXObject){
       xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
     }else if(window.XMLHttpRequest){
		       xmlHttp=new XMLHttpRequest();
     }else{
          alert("Sorry,your brows don't support to create XMLHttpRequest Object!");
     }
} 
function ParseJson(jsonString){
	    try 
	    {
	        jsonObj = eval('(' + jsonString + ')'); // 将json字符串转换成对象
	    } 
	    catch (ex)
	   {
	        return null;
	   }
	   return jsonObj; 
} 
function UTF8ToUnicode(strInUTF8){
  if (null==strInUTF8)
    return null;
  var strUTF8=new String(strInUTF8);
  var strUni= new String();
  for(var i=0;i<strUTF8.length;){
    var chr1=strUTF8.charCodeAt(i);
    var chr2=strUTF8.charCodeAt(i+1);
    var chr3=strUTF8.charCodeAt(i+2);    
    if(chr1<0x80){
      strUni+=strUTF8.charAt(i);
      i++;
      }
    else if(0xC0==(chr1&0xE0)){
      if(0x80!=(chr2&0xC0))
        return null;
      strUni+=String.fromCharCode(((chr1&0x1F)<<6)|(chr2&0x3F));
      i+=2;
      }
    else if(0xE0==(chr1&0xF0)){
      if(0x80!=(chr2&0xC0)||0x80!=(chr3&0xC0))
        return null;
      strUni+=String.fromCharCode(((chr1&0x0F)<<12)|((chr2&0x3F)<<6)|(chr3&0x3F));
      i+=3;
      }
    else{
      return null;
      }
    }
  return strUni;
}

function UnicodeToUTF8(strInUni){
  if(null==strInUni)
    returnnull;
  var strUni=String(strInUni);
  var strUTF8=String();
  for(var i=0;i<strUni.length;i++){
    var wchr=strUni.charCodeAt(i);
    if(wchr<0x80){
      strUTF8+=strUni.charAt(i);
      }
    else if(wchr<0x800){
      var chr1=wchr&0xff;
      var chr2=(wchr>>8)&0xff;
      strUTF8+=String.fromCharCode(0xC0|(chr2<<2)|((chr1>>6)&0x3));
      strUTF8+=String.fromCharCode(0x80|(chr1&0x3F));
      }
    else{
      var chr1=wchr&0xff;
      var chr2=(wchr>>8)&0xff;
      strUTF8+=String.fromCharCode(0xE0|(chr2>>4));
      strUTF8+=String.fromCharCode(0x80|((chr2<<2)&0x3C)|((chr1>>6)&0x3));
      strUTF8+=String.fromCharCode(0x80|(chr1&0x3F));
      }
    }
  return strUTF8;
}
//20080101 - > format '/' or '-' split date
function toFormatDate(curdate,format){
   var newdate = null;
   if(curdate != null && curdate != 'undefined'){
     if(format != null){
        var year = curdate.substring(0,4);
        var month = curdate.substring(4,6);
        var day = curdate.substring(6,8);
        newdate = year+format+month+format+day;	               
     }	            
   }
   return newdate;
}
//去掉日期分割符 2008-01-01 ->20080101
function goFormatDate(curdate,format){
    var newdate = "";
   if(curdate != null && curdate != 'undefined'){
      if(format != null){
        var arr_newdate = curdate.split(format);
           newdate = arr_newdate[0]+arr_newdate[1]+arr_newdate[2];
      }	              
   }
   return newdate;	         
}

//单选 获得选中行位置
function toSelectRowBit(table){
  var bit = -1;
  if(table != null && table.data != null){
    var datas = table.data;
    
    for(var i=0;i<datas.length;i++){
       if(datas[i].checked){
         bit = i;
         continue;
       }
    }
  }
  return bit;
}
function isHZ(obj){
   if(isNaN(Number(obj.value))){
     obj.value = '';
     obj.focus();
     return true;     
   }  
}  
function  paste(obj){   
  if(clipboardData.getData('text').match(/^[\d]{1,4}$/)==null)   
      return   false;   
  if(obj.value.length+clipboardData.getData('text').length>4)return   false;   
}  
function strDateTime(str)
{
	var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/); 
	if(r==null)return false; 
	var d= new Date(r[1], r[3]-1, r[4]); 
	return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]);
}
