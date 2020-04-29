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

System.debug=true; //false
System._codebase={};
/*
try
{
  if (window!=parent && parent.System && parent.System._codebase)
    System._codebase = parent.System._codebase;
  else if ("undefined"!=typeof opener&&opener.System&&opener.System._codebase)
    System._codebase = opener.System._codebase;
  else if ("undefined"!=typeof dialogArguments && dialogArguments.System)
    System._codebase = dialogArguments.System._codebase;
}
catch(ex){}
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
System._alert=function(msg){if(System.debug)alert(msg);};
System._parseResponseText=function(s)
{
    if (null==s||"\uFFFD"==s.charAt(0)){System._alert(System.MISCODING);return "";}
    if ("\xef"==s.charAt(0))s=s.substr(3); //for firefox
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
  //alert("System._eval(\""+namespace+"\")=\r\n"+System._codebase[namespace]);
  try{if(window.execScript)window.execScript(System._codebase[namespace]);else
  {
    var script=document.createElement("SCRIPT");script.type="text/javascript";
    script.innerHTML="eval(System._codebase['"+ namespace +"']);";
    document.getElementsByTagName("HEAD")[0].appendChild(script);
    setTimeout(function(){script.parentNode.removeChild(script)},99);
  }}catch(ex){System._alert("Syntax error on load "+ namespace);}
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

if(System.ie && !System.debug) Include("System.Plugins.IE"); //IE UserData
if(window.opera) Include("System.Plugins.Opera"); //Opera support
Include("System.Global");





/****** Common Helper *****/
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

//------For Statutory------
var hashArea = new Hashtable();
var hashRegion = new Hashtable();
var hashCountry = new Hashtable();
var hashCompany = new Hashtable();
var hashSelectedCompany = new Hashtable();
var hashSelectedNodes = new Hashtable();
//-------------------------

//------For Executive------
var hashCorp = new Hashtable();
var hashBV = new Hashtable();
var hashSelectedBV = new Hashtable();
var hashSelectedNodesBV = new Hashtable();
//-------------------------

//------For Vendor---------
var hashVendor = new Hashtable();
var hashContract = new Hashtable();
var hashSelectedCon = new Hashtable();
var hashSelectedNodesCon = new Hashtable();
//-------------------------

//------For Process--------
var hashTower = new Hashtable();
var hashProcess = new Hashtable();
var hashSelectedPro = new Hashtable();
var hashSelectedNodesPro = new Hashtable();




//--------------------------------------
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
//父节点
function getTree(data){
  d['-1_root'] = "text: abcdroot;";
  for(var i in data){
  if(data[i]['label']!=undefined){
  var parent =data[i]['code'] ;
  var isleaf =data[i]['isleaf'];
  var id = data[i]['id'];
  leafHashMap.Set(parent,isleaf);
  idHashMap.Set(parent,id);
  d['root_'+parent+''] = 'text:'+data[i]['label']+';';
  var children = data[i]['children'];
  if(children !=undefined){
  getChild(children,parent,d)
     }
   }
  }
return d;
}
//子节点
function  getChild(children,parent,d){
   for(var j = 0; j<children.length;j++){
   var childcode = children[j]['code'];
   var childlable = children[j]['label'];
   var childisleaf = children[j]['isleaf'];
   var childid = children[j]['id'];
   leafHashMap.Set(childcode,childisleaf);
   idHashMap.Set(childcode,childid);
   d[''+parent+'_'+childcode+''] = 'text:'+childlable+';'
   if( children[j]['children'] != undefined){
     getChild(children[j]['children'],children[j]['code'],d);
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
	 var popInnerobj = document.getElementById("pop_inner");
	 if(type=="code"){
    //父结点
    //debugger;
		  var source = maintree.dataSource;
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
    //根节点
		      if(parentCode=="account" || parentCode=="null"){
	      	  	  len = childCode.length;
	      	  	   rootSum="";
		      }
		      /*
		      if(len == childCode.length){
		         rootSum="";
		      }
		      */
	      	  rootSum +=childCode+",";
    //如果parent=1一级结点
	       	  if(childCode==code && parentCode=="account"){
	       		  var acode = maintree.getNodeById(code);
			      if(acode!=null){
				      //父结点滚动条位置
				      maintree.focus(code);
				      return ;
			     }
	      	  }
    //子结点
			  else if(childCode==code && parentCode!="-1"){
				  var arrRoot = rootSum.split(",");
				  for(var j = 0;j<arrRoot.length;j++){
					  //if(arrRoot[j]!="" && code.indexOf(arrRoot[j])>-1){
					  //debugger;
					  if(arrRoot[j]!=""){
						   maintree.expand(arrRoot[j]);
						   maintree.getNodeById(arrRoot[j]).expanded = true;
					  }
				   } 
				   maintree.focus(code);
				   return;
			  }
	     }
	}
    else if(type == "name"){
	   var arrNameCode = nameToCode(code);
	   var firstCode = arrNameCode[0];
	   if(arrNameCode!=null && arrNameCode[selcnt]!= undefined){
		      if(selcnt>0){
			      if(arrNameCode[selcnt]!=firstCode){
				      findByCode("code",arrNameCode[selcnt]);
				      ++selcnt;
				      return ;
			       }
		     }
		     if(selcnt==0){
			      findByCode("code",arrNameCode[selcnt]);
			      ++selcnt;
			      return ;
		     }
	     }
    }
  
   if(selcnt==0)
   		alert("找不到匹配数据项！");
   else 
        alert("已到最后匹配数据项！");		
   selcnt = 0;
}
//名称转成编码
var arrCode=[];
function nameToCode(s){
//debugger;
	  var source = maintree.dataSource;
	  for(var i in source){
	  	   var needCode = "";
	  	   if(i!="length" && source[i].indexOf("-")>-1){
	  	   		needCode = source[i].split("text:")[1].split("url:")[0];
	  	   }
	  	   //避免重复数据
		   if(needCode!="" && needCode.indexOf(s)>-1&& maintree.getNodeById(i.split("_")[0])){
		   		arrCode.push(i.split("_")[1]);
		   }
	  }
	  return arrCode.uniq();
}

function clearCodes(){
	if(arrCode.length>0){
		arrCode.length = 0;
		selcnt = 0;	
	}
}
//计算鼠标位置
function mousePosition(ev){
     if(ev.pageX || ev.pageY){
      return {x:ev.pageX, y:ev.pageY};
      }
      return {
       x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
       y:ev.clientY + document.body.scrollTop  - document.body.clientTop
       }; 
 } 
//右键弹出层
function createPopDiv(oe){
	var obj = event.srcElement;
	var popdiv = document.getElementById("rightMenu");
	var itemdiv1 = document.getElementById("menuItem1");
	var itemdiv2 = document.getElementById("menuItem2");
	var itemdiv3 = document.getElementById("menuItem3");
	var mousePos = mousePosition(event);
	obj.insertAdjacentElement("afterBegin", popdiv);
	with(popdiv.style){
		display = 'block';
		left = mousePos.x;
		top = mousePos.y+10;
	}
    var source = maintree.firstNode.childNodes;
	itemdiv1.onclick = function(){
	   var selectId = oe.selectedNode.id;
	   oe.selectedNode.check(true);
	   maintree.expandAll(selectId);
	}
	itemdiv2.onclick = function(){	
	    for(var i = 0; i<source.length;i++){
             source[i].check(true);
             source[i].expandAll(source[i].id);
	    }
	}
	itemdiv3.onclick = function(){
	    for(var i = 0; i<source.length;i++){
             source[i].check(false);
             source[i].collapseAll();
	    }	
	   
	}
	document.body.onclick = function(){
		popdiv.style.display = "none";
    }
}
//得到选中值
function getTreeSelected(){
   var result = new Object();
   result.value = "";
   result.id = "";
   result.isleaf = "";
   result.valuecode = "";
    for (var i in maintree.nodes) {
        if (maintree.nodes[i].checked && maintree.nodes[i].sourceIndex!="-1_root" && maintree.nodes[i].text!="") {
        result.value += maintree.nodes[i].text + ";";
        result.id += idHashMap.Get(maintree.nodes[i].id)+",";
        result.isleaf += leafHashMap.Get(maintree.nodes[i].id)+",";
        result.valuecode += maintree.nodes[i].id+",";
        }
    }
    return result;
}

//单选树单击
var selectObj = new Object();
selectObj.value="";
selectObj.id="";
selectObj.isleaf="";
selectObj.valuecode="";

function tree_labelDblclick(oe){
    selectObj.value =oe.text;
	selectObj.id=idHashMap.Get(oe.id);
	selectObj.isleaf = leafHashMap.Get(oe.id);
	closeSWindow(true)
}
//根据已选择项查找code相匹配的节点

function searchMulNode (flag){
//debugger;
  var popInnerobj = document.getElementById("pop_inner");
  sel = selvalue.split(";");
  for(var k = 0 ; k<sel.length ;k++){
  code = sel[k].split("-")[0];
  var source = maintree.dataSource;
  var parentCode;
  var childCode;
  var rootSum;
  var len;
  for(var i in source){
    if(i!="length"){
     parentCode=i.split("_")[0];
     childCode=i.split("_")[1];
    }
    //根节点
      if(parentCode=="account"){
       len = childCode.length;
      }
      if(len == childCode.length){
         rootSum="";
      }
      rootSum +=childCode+",";
    //如果parent=1一级结点
       if(childCode==code && parentCode=="account"){
       var acode = maintree.getNodeById(code);
       if(acode!=null){
         if(flag){
          maintree.getNodeById(code).check(true);
          maintree.getNodeById(code).upCheck();
           }else{
          maintree.focus(code);
          }
         }
      }
    //子结点
     else if(childCode==code && parentCode!="-1"){
      var arrRoot = rootSum.split(",");
      var m=0;
      for(var j = 0;j<arrRoot.length;j++){
         if(arrRoot[j]!="" && code.indexOf(arrRoot[j])>-1)
         maintree.expand(arrRoot[j]);
         m++;
      } 
         if(flag){
         maintree.getNodeById(code).check(true);
         maintree.getNodeById(code).upCheck();
         }else{
         maintree.focus(code);
         }
     }
  }
  }
}

