//按拼音查找的方法 代码重复，统一使用word_spell
if(typeof(strChineseFirstPY)=="undefined"){
		document.write("<script language='javascript' src='/js/Word_Spell.js' ></script>");
}

function getPYCode(str)    
   {      
     var arrRslt = makePy(str.trim());
     return arrRslt;
   }  

function filterbytextbyall(select_obj,txt,ods,nds){
	var s="";
	var ss="";
	var firstadd=0;;
	if(firstrun==0){
	 firstrun=1;
	 initdata(select_obj,ods);	 	 
	}
	nds.RemoveAll();
	var aa = (new VBArray(ods.Keys())).toArray();			
	var c=getdscount(ods);	
	for (i=0;i<c;i++){
	  s=aa[i];
	  ss=ods(aa[i]);
	  var pos=ss.indexOf(txt);
	  if(pos>-1){
	    if(firstadd==0) ss=setblankstr(ss);
	    firstadd=1;
	  	nds.add(s,ss);
	  }
	  else
	  {
	  	var sss=getPYCode(ss);
	  	var pos2=sss.indexOf(txt.toUpperCase());	  
	  	if(pos2>-1){
	  		if(firstadd==0) ss=setblankstr(ss);
	    	firstadd=1;
	  		nds.add(s,ss);
	  	}
	  }
	}
	setselectionoptions(select_obj,nds);
}

function setblankstr(str){
  var l=str.length;
  var s=str;
  var i=0;
  if(l<maxlen){
  	for(i=0;i<maxlen-l;i++){
  		s=s+"　";
  	}
  }
  return s;
}


function getdscount(ds){
	return ds.count;
}
	
function setselectionoptions(select_obj,ds){
  select_obj.options.length = 0;
  var aa = (new VBArray(ds.Keys())).toArray();		
  var j=0;
  var c=ds.count;
  for(i=0;i<c;i++){	
	  s=aa[i];
	  ss=ds(aa[i]);	  
	  select_obj.options[j] = new Option(ss,s);
	  j=j+1;
	}
}

function getoptions(select_obj,ds){
	var ss="";
	var s="";	
	ds.RemoveAll();
	for (i=0;i<select_obj.length;i++){
		s=select_obj.options[i].value;			
		ss=select_obj.options[i].text;
		if(ss.length>maxlen) maxlen=ss.length;
		ds.add(s,ss);
	}
	//return ds;
}

function initdata(select_obj,ods){
  getoptions(select_obj,ods);
}