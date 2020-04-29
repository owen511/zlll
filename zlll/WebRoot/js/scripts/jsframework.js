/*---------------------------------------------------------------------------*\
|  Subject: JavaScript Framework
|  Author:  meizz
|  Created: 2005-02-27
|  Version: 2006-08-11
|-----------------------------------
|  MSN:huangfr@msn.com  QQ:112889082
|  http://www.meizz.com  Copyright (c) meizz   MIT-style license
|  The above copyright notice and this permission notice shall be
|  included in all copies or substantial portions of the Software
\*---------------------------------------------------------------------------*/

window.System = function(){this.setHashCode();}

System.debug=true; // false
System._codebase={};
/*
 * try { if (window!=parent && parent.System && parent.System._codebase)
 * System._codebase = parent.System._codebase; else if ("undefined"!=typeof
 * opener&&opener.System&&opener.System._codebase) System._codebase =
 * opener.System._codebase; else if ("undefined"!=typeof dialogArguments &&
 * dialogArguments.System) System._codebase = dialogArguments.System._codebase; }
 * catch(ex){}
 */
System.MISSING_ARGUMENT="Missing argument";
System.ARGUMENT_PARSE_ERROR="The argument cannot be parsed";
System.NOT_SUPPORTED_XMLHTTP="Your browser do not support XMLHttp";
System.FILE_NOT_FOUND="File not found";
System.MISCODING="Maybe file encoding is not ANSI or UTF-8";
System.NAMESPACE_ERROR=" nonstandard namespace";

System.hashCounter=0;
System.currentVersion="20060811";
var t=document.getElementsByTagName("SCRIPT");
t=(System.scriptElement=t[t.length-1]).src.replace(/\\/g, "/");
System.incorporate=function(d,s){for(var i in s)d[i]=s[i];return d;};
System.path=(t.lastIndexOf("/")<0)?".":t.substring(0, t.lastIndexOf("/"));
System.getUniqueId=function(){return "mz_"+(System.hashCounter++).toString(36);};
System.toHashCode=function(e)
{
  if("undefined"!=typeof e.hashCode) return e.hashCode;
  return e.hashCode=System.getUniqueId();
};
System.supportsXmlHttp=function()
{
  return "object"==typeof(System._xmlHttp||(System._xmlHttp=new XMLHttpRequest()));
};
System._getPrototype=function(namespace, argu)
{
  if("undefined"==typeof System._prototypes[namespace])return new System();
  for(var a=[], i=0; i<argu.length; i++) a[i]="argu["+ i +"]";
  return eval("new (System._prototypes['"+namespace+"'])("+a.join(",")+")");
};
System.ie=navigator.userAgent.indexOf("MSIE")>0 && !window.opera;
System.ns=navigator.vendor=="Netscape";
// System._alert=function(msg){if(System.debug)alert(msg);};
System._parseResponseText=function(s)
{
    if (null==s||"\uFFFD"==s.charAt(0)){System._alert(System.MISCODING);return "";}
    if ("\xef"==s.charAt(0))s=s.substr(3); // for firefox
    return s.replace(/(^|\n)\s*\/\/+\s*((Using|Import|Include)\((\"|\'))/g,"$1$2");
};

if(window.ActiveXObject && (System.ie || !window.XMLHttpRequest))
{
  window.XMLHttpRequest = function()
  {
    var msxmls=['MSXML3','MSXML2','Microsoft'], ex;
    for(var i=0;i<msxmls.length;i++)
      try{return new ActiveXObject(msxmls[i]+'.XMLHTTP')} catch(ex){}
    System._xmlHttp="mz"; throw new Error(System.NOT_SUPPORTED_XMLHTTP);
  }
}
System.load = function(namespace, path)
{
  try
  {
    if(System.supportsXmlHttp()){path=System._mapPath(namespace, path);
    var x=System._xmlHttp; x.open("GET",path,false); x.send(null);
    if (x.readyState==4)
    {
      if(x.status==0||/^file\:/i.test(path))
        return System._parseResponseText(x.responseText);
      else if(x.status==200)return System._parseResponseText(x.responseText);
      else if(x.status==404)System._alert(namespace+"\n"+System.FILE_NOT_FOUND);
      else throw new Error(x.status +": "+ x.statusText);}
    } else System._alert(System.NOT_SUPPORTED_XMLHTTP);
  }
  catch(ex){System._alert(namespace+"\n"+ex.message);}return "";
};
System._eval = function(namespace, path)
{
  // alert("System._eval(\""+namespace+"\")=\r\n"+System._codebase[namespace]);
  try{if(window.execScript)window.execScript(System._codebase[namespace]);else
  {
    var script=document.createElement("SCRIPT");script.type="text/javascript";
    script.innerHTML="eval(System._codebase['"+ namespace +"']);";
    document.getElementsByTagName("HEAD")[0].appendChild(script);
    setTimeout(function(){script.parentNode.removeChild(script)},99);
  }}catch(ex){}
  System._existences[namespace]=System._mapPath(namespace, path);
};
System._exist = function(namespace, path)
{
  if("undefined"==typeof System._existences[namespace]) return false;
  return System._existences[namespace]==System._mapPath(namespace,path);
};
System._mapPath = function(namespace, path)
{
  if("string"==typeof path && path.length>3)return path.toLowerCase();
  var p=(System.path+"/"+namespace.replace(/\./g,"/")+".js").toLowerCase();
  return p +(("undefined"==typeof path||path) ? "" : "?t="+ Math.random());
};

window.Using = function(namespace, path, rename)
{
  if(System._exist(namespace, path)){
  var s=window[namespace.substr(namespace.lastIndexOf(".")+1)];
  if(s!=System._prototypes[namespace])s=System._prototypes[namespace];return}
  var code=namespace +"."; if(!/((^|\.)[\w\$]+)+$/.test(namespace))
  throw new Error(namespace+System.NAMESPACE_ERROR);
  for(var i=code.indexOf("."); i>-1; i=code.indexOf(".", i+1)){
  var e= code.substring(0,i), s=(e.indexOf(".")==-1) ? "window[\""+e+"\"]":e;
  if(e&&"undefined"==typeof(s)){
  eval(s+"=function(){return System._getPrototype(\""+e+"\", arguments)}");}}
  if("undefined"==typeof path &&"string"==typeof System._codebase[namespace])
  {
    System._eval(namespace, path);}else{if(code=System.load(namespace,path)){
    e = "$"+ System.getUniqueId() +"__id"+ new Date().getTime() +"$";
    s = "function "+e+"(){\r\n"+code+";\r\nSystem._prototypes['";
    code=namespace.substr(namespace.lastIndexOf(".")+1);
    s += namespace+"']=window['"+(rename||code)+"']="+code+";\r\n}"+e+"();";
    System._codebase[namespace]=s;s="";System._eval(namespace, path);}
  }
};
window.Import=function(namespace,path,rename){Using(namespace,path,rename)};
window.Instance=function(hashCode){return System._instances[hashCode]};
window.Include=function(namespace, path)
{
  if(System._exist(namespace, path)) return;
  var code;if(!/((^|\.)[\w\$]+)+$/.test(namespace))
  throw new Error(namespace + System.NAMESPACE_ERROR);
  if("undefined"==typeof path&&"string"==typeof(System._codebase[namespace]))
  {
    System._eval(namespace, path);}else if(System.supportsXmlHttp()){
    if(code=System.load(namespace, path)){System._codebase[namespace]=code;
    System._eval(namespace, path);}}else{
    var script=document.createElement("SCRIPT");script.type="text/javascript";
    script.src=System._existences[namespace]=System._mapPath(namespace,path);
    document.getElementsByTagName("HEAD")[0].appendChild(script);
    setTimeout(function(){script.parentNode.removeChild(script)},99);
  }
};

Function.READ=1;Function.WRITE=2;Function.READ_WRITE=3;
Function.prototype.addProperty=function(name,initValue,r_w)
{
  var capital=name.charAt(0).toUpperCase()+name.substr(1);
  r_w=r_w||Function.READ_WRITE; name="_"+name; var p=this.prototype;
  if("undefined"!=typeof initValue) p[name]=initValue;
  if(r_w&Function.READ) p["get"+ capital]=function(){return this[name];};
  if(r_w&Function.WRITE) p["set"+ capital]=function(v){this[name]=v;};
};
Function.prototype.Extends=function(SuperClass,ClassName)
{
  var op=this.prototype, i, p=this.prototype=new SuperClass();
  if(ClassName)p._className=ClassName; for(i in op)p[i]=op[i];
  if(p.hashCode)delete System._instances[p.hashCode];return p;
};
System._instances={};
System._prototypes=
{
  "System":System,
  "System.Object":System,
  "System.Event":System.Event
};
System._existences=
{
  "System":System._mapPath("System"),
  "System.Event":System._mapPath("System.Event"),
  "System.Object":System._mapPath("System.Object")
};
t=System.Extends(Object, "System"); System.Object = System;
t.decontrol=function(){var t;if(t=this.hashCode)delete System._instances[t]};
t.addEventListeners=function(type, handle)
{
  if("function"!=typeof handle)
    throw new Error(this+" addEventListener: "+handle+" is not a function");
  if(!this._listeners) this._listeners={};
  var id=System.toHashCode(handle), t=this._listeners; 
  if("object"!=typeof t[type]) t[type]={}; t[type][id]=handle;
};
t.removeEventListener=function(type, handle)
{
  if(!this._listeners)this._listeners={}; var t=this._listeners;
  if(!t[type]) return; var id=System.toHashCode(handle);
  if( t[type][id])delete t[type][id];if(t[type])delete t[type];
};
t.dispatchEvent=function(evt)
{
  if(!this._listeners)this._listeners={};
  var i, t =this._listeners, p =evt.type;
  evt.target=evt.srcElement=this; if(this[p])this[p](evt);
  if("object"==typeof t[p]) for(i in t[p]) t[p][i].call(this,evt);
  delete evt.target; delete evt.srcElement;return evt.returnValue;
};
t.setHashCode=function()
{
  System._instances[(this.hashCode=System.getUniqueId())]=this;
};
t.getHashCode=function()
{
  if(!this.hashCode)this.setHashCode(); return this.hashCode;
};
t.toString=function(){return "[object "+(this._className||"Object")+"]";};
System.Event=function(type){this.type=type;};
t=System.Event.Extends(System, "System.Event");
t.returnValue=true;
t.cancelBubble=false;
t.target=t.srcElement=null;
t.stopPropagation=function(){this.cancelBubble=true;};
t.preventDefault =function(){this.returnValue=false;};

if(System.ie && !System.debug) Include("System.Plugins.IE"); // IE UserData
if(window.opera) Include("System.Plugins.Opera"); // Opera support
Include("System.Global");





/** **** Common Helper **** */
function Hashtable() 
{
  this._hash = {};
  this._count = 0;
  this.add = function(key, value) 
  {
      if (this._hash.hasOwnProperty(key)) return false;
      else { this._hash[key] = value; this._count++; return true; }
  }
  this.remove = function(key) { delete this._hash[key]; this._count--; }
  this.count = function() { return this._count; }
  this.items = function(key) { if (this.contains(key)) return this._hash[key]; }
  this.contains = function(key) { return this._hash.hasOwnProperty(key); }
  this.clear = function() { this._hash = {}; this._count = 0; }
}

String.prototype.trim = function() { return this.replace(/(^\s*)|(\s*$)/g, ""); }

// ------For Statutory------
var hashArea = new Hashtable();
var hashRegion = new Hashtable();
var hashCountry = new Hashtable();
var hashCompany = new Hashtable();
var hashSelectedCompany = new Hashtable();
var hashSelectedNodes = new Hashtable();
// -------------------------

// ------For Executive------
var hashCorp = new Hashtable();
var hashBV = new Hashtable();
var hashSelectedBV = new Hashtable();
var hashSelectedNodesBV = new Hashtable();
// -------------------------

// ------For Vendor---------
var hashVendor = new Hashtable();
var hashContract = new Hashtable();
var hashSelectedCon = new Hashtable();
var hashSelectedNodesCon = new Hashtable();
// -------------------------

// ------For Process--------
var hashTower = new Hashtable();
var hashProcess = new Hashtable();
var hashSelectedPro = new Hashtable();
var hashSelectedNodesPro = new Hashtable();




// --------------------------------------
function selectT(obj){
	obj.className = 'select';
}
function onMOver(obj){
	obj.className = 'Mover';
}
function onMOut(obj){
	obj.className = 'Mout';
}
var leafHashMap = {   
    Set : function(key,value){this[key] = value},   
    Get : function(key){return this[key]},   
    Contains : function(key){return this.Get(key) == null?false:true},   
    Remove : function(key){delete this[key]}   
}  
var idHashMap = {   
    Set : function(key,value){this[key] = value},   
    Get : function(key){return this[key]},   
    Contains : function(key){return this.Get(key) == null?false:true},   
    Remove : function(key){delete this[key]}   
} 
// 父节点
function getTree(data){
	  if(!(data instanceof Array)){
	  	data["-1_0"]="text: abcdroot;"
			return data;
	  }

		var _checkCodeShowFlag=(typeof(checkCodeShowFlag)!="undefined")?checkCodeShowFlag(element):s.checkCodeShowFlag(element)
	  
	  d['-1_root'] = "text: abcdroot;";
	  var temp;
	  for(var i=0,len=data.length;i<len;i++)
	  {
	  	temp=data[i];
		  if(temp['label']!=undefined)
		  {
			  var parent =temp['code'] ;
			  if(parent.indexOf("_")>-1) parent=parent.replace(/_/g,"-");
			  var isleaf =temp['isleaf'];
			  var id = temp['id'];
			  leafHashMap.Set(parent,isleaf);
			  idHashMap.Set(parent,id);
			  // code显示控制 弹出树和下拉树
			  /*
			  if(typeof(checkCodeShowFlag)!="undefined"){
			    d['root_'+parent] =checkCodeShowFlag(element)?'text:'+temp['label']+';':'text:'+temp['name']+';';
			  }else{
			    d['root_'+parent] =s.checkCodeShowFlag(element)?'text:'+temp['label']+';':'text:'+temp['name']+';';
			  }
			  */
			  d['root_'+parent] =_checkCodeShowFlag?'text:'+temp['label']+';':'text:'+temp['name']+';';
			  var children = temp['children'];
			  if(children !=undefined)
			  {
			  		getChild(children,parent,d,_checkCodeShowFlag)
		      }
	   	  }
  	  }
	return d;
}
// 子节点
function  getChild(children,parent,d,_checkCodeShowFlag){
	var temp;
	   for(var j = 0,len=children.length; j<len;j++)
	   {
	   	temp=children[j];
		   var childcode = temp['code'];
		   if(childcode.indexOf("_")>-1) childcode=childcode.replace(/_/g,"-");
		   var childlable = temp['label'];
		   var childisleaf = temp['isleaf'];
		   var childid = temp['id'];
		   leafHashMap.Set(childcode,childisleaf);
		   idHashMap.Set(childcode,childid);
		   if(_checkCodeShowFlag==null){
		  		if(typeof(checkCodeShowFlag)!="undefined"){
			       d[parent+'_'+childcode] = checkCodeShowFlag(element)?'text:'+childlable+';':'text:'+temp['name']+';';
			    }else{
			       d[parent+'_'+childcode] = s.checkCodeShowFlag(element)?'text:'+childlable+';':'text:'+temp['name']+';';
			    }
			 }
			 else{
			 	d[parent+'_'+childcode]=_checkCodeShowFlag?'text:'+childlable+';':'text:'+temp['name']+';';
			 }
		   if( temp['children'] != undefined)
			   {
			     getChild(temp['children'],childcode,d,_checkCodeShowFlag);
			   }
	  }
	return d;
}

function search(){
	var type = "name";
	var searchcontent = document.getElementById("searchcontent");
	var val = searchcontent.value;
    findByCode(type,val);
}

function getfocus(){
	document.getElementById("searchcontent").focus();
}
var selcnt=0;
function findByCode(type,code) {
	 if(typeof(code)=="string" && code.trim()==""){
	   alert("请输入搜索内容");
	   searchcontent.focus();
	   return;
	 }
	 if(a.loading){
		 alert("正在加载中，请稍候...")
		 return;
	 }
	 if(type=="code"){
    // 父结点
		  var source = a.dataSource;
		  var parentCode;
		  var childCode;
		  var rootSum;
		  var len;
		  code=code.trim();
		  var nodePosition,chindex = 0;
		  for(var i in source){
		    if(i!="length"){
		     parentCode=i.split("_")[0];
		     childCode=i.split("_")[1];
		    }
    // 根节点
	      if(parentCode=="root"){
	       len = childCode.length;
	      }
	      if(len == childCode.length){
	         rootSum="";
	      }
	      rootSum +=childCode+",";
    // 如果parent=1一级结点
	       if(childCode==code && parentCode=="root"){
	       var acode = a.getNodeById(code);
	       if(acode!=null){
	       // 父结点滚动条位置
	       a.focus(code);
	       a.getPosition();
	       return ;
	         }
	      }
    // 子结点
	     else if(childCode==code && parentCode!="-1"){
	      var arrRoot = rootSum.split(",");
	      for(var j = 0;j<arrRoot.length;j++){
	         if(arrRoot[j]!="" && code.indexOf(arrRoot[j])>-1){
	         a.expand(arrRoot[j]);
	         a.getNodeById(arrRoot[j]).expanded = true;
	         }
	      } 
	      
	      function runSetTimeout(){
	      	if(a.selectedNode==null||a.selectedNode.id!=code){
			 a.focus(code);
	         a.getPosition();
	      	 window.setTimeout(runSetTimeout,100);
	      	}else{
	      	
	      	}
	      }
	      runSetTimeout();
	         a.focus(code);
	         a.getPosition();
	         return;
	      }
	     }
	    }
    else if(type == "name"){
       var arrNameCode=[];
       // debugger;
       if(checkHP(code)){ 
          if(pyDataArr != ""){
	  		pyDataArr = arrCode.splice(0,0);
          }
		  arrNameCode=findByPy(elements,code);
	   }else{
	      arrNameCode=nameToCode(code);
	   }
	   if(arrNameCode!=null && arrNameCode[selcnt]!= undefined){
	      findByCode("code",arrNameCode[selcnt]);
	      ++selcnt;
	      return ;
	   }
    }
   if(selcnt==0)
   		alert("找不到匹配数据项！");
   else 
        alert("已到最后匹配数据项！");		
   selcnt = 0;
}
// 名称转成编码
var arrCode=[];
function nameToCode(s,findflag){
	  var arrs = s.indexOf(";")>-1?s.split(";"):"";
	  if(arrCode != ""){
	  	arrCode = arrCode.splice(0,0);
	  }
	  var source = a.dataSource;
	  if(arrs==""){
		  for(var i in source){
		     if(findflag == undefined && !findflag){
				   if(i!="length" && source[i].split("text:")[1].indexOf(s)>-1){
				       if(i.split("_")[1]!="root")
				       arrCode.push(i.split("_")[1]);
				     }
			    }
			  else{
			      if(i!="length" && source[i].split("text:")[1]==s+";"){
				       if(i.split("_")[1]!="root")
				       arrCode.push(i.split("_")[1]);
				     }
			  }
		  }
	  	}
	  else{
	    	for(var j=0;j<arrs.length;j++){
	    	   for(var i in source){
	    	     if(i!="length" && source[i].split("text:")[1]==arrs[j]+";"){
				       if(i.split("_")[1]!="root")
				       arrCode.push(i.split("_")[1]);
				     }
	    	   }
	    	}
	   }
	  return arrCode;
}

function clearCodes(){
	if(arrCode.length>0){
		arrCode.length = 0;
		selcnt = 0;	
	}
}
// 计算鼠标位置
function mousePosition(ev){
     if(ev.pageX || ev.pageY){
      return {x:ev.pageX, y:ev.pageY};
      }
      return {
       x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
       y:ev.clientY + document.body.scrollTop  - document.body.clientTop
       }; 
 }
/*
 * @version1.0  右键弹出层，实现全部选中，取消选中，选中下级功能。
 * @version lp
 * @version 1.1 新增右键反选功能,实现多级反选
 * @author jiazhiyu 2012-02-07
 */
function createPopDiv(oe){
	if(oe.dataSource.length>1000){ //节点大于1000个，屏蔽右键功能，防止卡死
		document.getElementById("rightMenu").style.height="50px";
		document.getElementById("menuItem2").style.display="none";
		document.getElementById("menuItem4").style.display="none";
	}
	var obj = event.srcElement;
	var popdiv = document.getElementById("rightMenu");
	if(popdiv == null){
		return;
	}
	var itemdiv1 = document.getElementById("menuItem1");
	var itemdiv2 = document.getElementById("menuItem2");
	var itemdiv3 = document.getElementById("menuItem3");
	var itemdiv4 = document.getElementById("menuItem4"); // 新增右键反选功能
	var mousePos = mousePosition(event);
	obj.insertAdjacentElement("afterBegin", popdiv);
	with(popdiv.style){
		display = 'block';
		left = mousePos.x;
		top = mousePos.y+10;
	}
    var source = a.firstNode.childNodes;
	itemdiv1.onclick = function(){
		if(oe.selectedNode.checked==true||oe.selectedNode.checked=="true"){
			return;
		}
	   if(oe.selectedNode.$$caller.checkflag){
		   var selectId = oe.selectedNode.id;
		   a.expandAll(selectId);
		   oe.selectedNode.check(true);
		   oe.selectedNode.checkBox();
		   oe.selectedNode.upCheck();
	   }else{
	       var selectId = oe.selectedNode.id;
		   oe.selectedNode.check(true);
		   oe.selectedNode.checkBox();
		   oe.selectedNode.upCheck();
		   a.expandAll(selectId);
	   }
	}
	itemdiv2.onclick = function(){	
	    for(var i = 0; i<source.length;i++){
	         if(oe.selectedNode.$$caller.checkflag){
	         source[i].expandAll(source[i].id);
             source[i].check(true,false);
             source[i].checkBox();
             }else{
             source[i].check(true);
             source[i].checkBox();
             source[i].expandAll(source[i].id);
             }
	    }
	}
	itemdiv3.onclick = function(){
	    for(var i = 0; i<source.length;i++){
             source[i].check(false);
             source[i].hasBox=0;
             if(source[i].hasChild){
                 for(var j=0;j<source[i].childNodes.length;j++){
                	 source[i].childNodes[j].hasBox=0;
                 	if(source[i].childNodes[j].hasChild){
                 		for(var k=0;k<source[i].childNodes[j].childNodes.length;k++){
                 			source[i].childNodes[j].childNodes[k].hasBox=0;
                 		}
                 	}
                 }
             }
             source[i].collapseAll();
	    }	
	   
	}
	if(itemdiv4!=null){
		itemdiv4.onclick =function(){
		    for(var i = 0; i<source.length;i++){
		    	if(source[i].checked||source[i].checked=="true"){
		    		source[i].check(false);
		            source[i].expandAll(source[i].id);
		    	}else {//父级checkbox并未选中但是子节点有选中情况下需要作出判断，因为此时父级checkbox的checked属性为false
		   		 if(!source[i].hasChild){
		   		 source[i].check(true);
		   		 }else {
		   			 checkChild(source[i]);
		   		 }
		    	}       
		    }
		}	
	}
	document.body.onclick = function(){
		popdiv.style.display = "none";
    }
}
/*
 * 递归遍历节点判断：
 * 1.如果节点没有子节点，而且此时为选中状态，那么则取消选中
 * 2.如果节点没有子节点，而且此时为未选中状态，那么则选中
 * 3.如果节点有子节点，则继续递归判断其子节点。
 * @author jiazhiyu 2012-02-07
 */
function checkChild(Nobj){
	if(!Nobj.hasChild){
		if(Nobj.checked||Nobj.checked=="true"){
			Nobj.check(false,false);
		}else {
			Nobj.check(true,false);
		}
		Nobj.upCheck();
		return ;
	}
	Nobj.expandAll(Nobj.id);//expandAll展开
	for(var i=0;i<Nobj.childNodes.length;i++){
		checkChild(Nobj.childNodes[i]);
	}
}

// 得到选中值
function getTreeSelect(OnlySelectBottom){
   var result = new Object();
   result.value = "";
   result.id = "";
   result.isleaf = "";
   result.valuecode = "";
   var arr = [];
   var ob = {};
    for (var i in a.nodes) {
        if (a.nodes[i].checked && a.nodes[i].sourceIndex!="-1_root" && a.nodes[i].text!="") {
        // 如果多选增加了末级控制的话只返回末级数据
        if(OnlySelectBottom && leafHashMap.Get(a.nodes[i].id) == 0) continue; 	
        result.value += a.nodes[i].text + ";";
        result.id += idHashMap.Get(a.nodes[i].id)+",";
        result.isleaf += leafHashMap.Get(a.nodes[i].id)+",";
        arr = arr.concat(a.nodes[i].path.split("_"));
        ob[a.nodes[i].id]=1;
        }
    }
    result.valuecode = clearRepeat(arr,ob)+",";
    // alert(result.valuecode);
    return result;
}
// 去除数组中重复值
var clearRepeat=function(arr,ob){
            var c=[],b={};
            for(var i=0;i<arr.length;i++){
                    if(arr[i]!="-1" && arr[i]!="root" && ! b[arr[i]]){
                            b[arr[i]]=1;
                            if(! ob[arr[i]])
                            	c.push("N"+arr[i])
                            else
                            	c.push(arr[i]);
                        }
                }
            return c.join(",");
        }
// 单选树单击
var selectObj = new Object();
selectObj.value="";
selectObj.id="";
selectObj.isleaf="";
selectObj.valuecode="";

function tree_labelDblclick(oe){
    selectObj.value =oe.text;
    selectObj.valueid=idHashMap.Get(oe.id);
	selectObj.id=idHashMap.Get(oe.id);
	selectObj.isleaf = leafHashMap.Get(oe.id);
	closeSWindow(true);
}
// 根据已选择项查找code相匹配的节点

function searchMulNode (flag,checkflag){
 try{
  var popInnerobj = document.getElementById("pop_inner");
  if(!popInnerobj)
     popInnerobj = document.getElementById("tree_inner");
  if(selvalue==null || selvalue=="" || selvalue == "undefined") return;
  // alert("k="+selvalue);
  // 直接有默认值的选中
  if(selvalue.indexOf("-")>-1){
	  sel = selvalue.split(";");
	  for(var k = 0 ; k<sel.length ;k++){
	  code = sel[k].split("-")[0];
	  var source = a.dataSource;
	  var parentCode;
	  var childCode;
	  var rootSum;
	  var len;
	  for(var i in source){
	    if(i!="length"){
	     parentCode=i.split("_")[0];
	     childCode=i.split("_")[1];
	    }
	    // 根节点
	      if(parentCode=="root"){
	       len = childCode.length;
	      }
	      if(len == childCode.length){
	         rootSum="";
	      }
	      rootSum +=childCode+",";
	    // 如果parent=root一级结点
	       if(childCode==code && parentCode=="root"){
	       var acode = a.getNodeById(code);
	       if(acode!=null){
	         if(flag){
	          a.getNodeById(code).check(true,checkflag);
	          if(!checkflag)a.getNodeById(code).upCheck();
	           }else{
	          a.focus(code);
	          }
	         }
	      }
	    // 子结点
	     else if(childCode==code && parentCode!="-1"){
	      var arrRoot = rootSum.split(",");
	      for(var j = 0;j<arrRoot.length;j++){
	         if(arrRoot[j]!="" && code.indexOf(arrRoot[j])>-1)
	         {
		         a.expand(arrRoot[j]);
		         a.getNodeById(arrRoot[j]).expanded = true;
	         }
	      } 
	         if(flag){
	         a.getNodeById(code).check(true,checkflag);
	         if(!checkflag)a.getNodeById(code).upCheck();
	         }else{
	         a.focus(code);
	         }
	     }
	  }
	  }
  }
  else if(selvalue.indexOf(",")>-1){
  // debugger;
  // 选中后默认值选中
  sel = selvalue.split(",");
	for(var k = 0 ; k<sel.length ;k++){
	  	code = sel[k];
	  	   if(code.indexOf("N")>-1){ 
		   	   a.expand(code.substring(1));
		   }else{
		       if(checkflag){
		       		a.getNodeById(code).check(true);
		            if(leafHashMap.Get(code) !=1){
		               for(var i=k+1;i<sel.length;i++){
		                   if(sel[i].indexOf(code)>-1){
		                    a.expand(code);
		                   	break;
		                   }
		               }
		            }
		       }else{
		       		a.expand(code);
		   	   }
		   	   if(flag){
				   a.getNodeById(code).check(true,checkflag);
				   if(!checkflag)a.getNodeById(code).upCheck();
			   }else{
			  	   a.focus(code);
			   }
		   }
   		}
   }
  else{
    // 无code默认值选中
    findByNoCode("name",selvalue,true);
  } 
  }catch(e){
  }
}

// 无code默认值选中
function findByNoCode(type,code,findflag) {
	 if(code.trim()==""){
	   alert("请输入搜索内容");
	   searchcontent.focus();
	   return;
	 }
	 if(a.loading){
	   //alert("正在加载中，请稍候!"); // by jzy 解决弹出树控件文本框如果值不是" - "或者" , "格式的话，进入该方法提示这个.将判断的语句放在点击节点时候判断
	   return;
	 }
	 if(type=="code"){
    // 父结点
		  var source = a.dataSource;
		  var parentCode;
		  var childCode;
		  var rootSum;
		  var len;
		  code=code.trim();
		  var nodePosition,chindex = 0;
		  for(var i in source){
		    if(i!="length"){
		     parentCode=i.split("_")[0];
		     childCode=i.split("_")[1];
		    }
    // 根节点
	      if(parentCode=="root"){
	       len = childCode.length;
	      }
	      if(len == childCode.length){
	         rootSum="";
	      }
	      rootSum +=childCode+",";
    // 如果parent=1一级结点
	       if(childCode==code && parentCode=="root"){
		       var acode = a.getNodeById(code);
		       if(acode!=null && !a.getNodeById(code).$$caller.useCheckbox){
			       // 父结点滚动条位置
			       a.focus(code);
			       a.getPosition();
			       return ;
	         	}else{
	         	   a.getNodeById(code).check(true,false);
	         	   a.getPosition();
	         	   return;
	         	}
	      }
    // 子结点
	     else if(childCode==code && parentCode!="-1"){
	     // debugger;
		      var arrRoot = rootSum.split(",");
		      for(var j = 0;j<arrRoot.length;j++){
			         if(arrRoot[j]!="" && code.indexOf(arrRoot[j])>-1){
				         a.expand(arrRoot[j]);
				         a.getNodeById(arrRoot[j]).expanded = true;
				         if(a.getNodeById(code)!=null && a.getNodeById(code).$$caller.useCheckbox){
				            a.getNodeById(code).check(true,false);  
				            a.getNodeById(code).upCheck();
				         }
	         		 }
		      } 
	         if(a.getNodeById(code)!=null && !a.getNodeById(code).$$caller.useCheckbox)
	         a.focus(code);
	         a.getPosition();
	         return;
	      }
	     }
	    }
    else if(type == "name"){
	   var arrNameCode = nameToCode(code,findflag);
	   for(var k=0;k<arrNameCode.length;k++){
		   if(arrNameCode!=null && arrNameCode[k]!= undefined){
		      findByNoCode("code",arrNameCode[k],findflag);
		   }
	   }
    }
   
}
// 拼音查询得
var pyDataArr = [];
function findByPy(Data, py) {
	try {
		for (var i = 0, j = Data.length; i < j; i++) {
			var name;
			if (typeof (s) != "undefined") {
				name = s.makePy(Data[i].name);
			} else {
				name = checkHP(py) ? makePy(Data[i].name) : Data[i].name;
			}
			if (name
					&& (name.indexOf(py.toUpperCase()) > -1
							|| name.indexOf(py) > -1 || name.indexOf(py
							.toLowerCase()) > -1)) {
				pyDataArr.push(Data[i].code);
			}
			if (Data[i].children)
				findByPy(Data[i].children, py);
		}
	} catch (e) {
	}
	return pyDataArr;
}
// 汉字拼音数字的判断
function checkHP(val){
  	  // 完全是数字弹出树不走拼音查询
	  var shuzi = new RegExp(/^[0-9\-]+$/);
	  if(shuzi.test(val)){
	  		return false;
	  }
	  // 拼音和数字
	  var reg = new RegExp(/^[A-Za-z0-9\-]+$/);
	  if(reg.test(val)){
	  		return true;
	  }
}
