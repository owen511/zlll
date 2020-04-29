/**
 * FusionMaps: Flash Player detection and Map embedding.
 * Version: 1.3.2 (2nd March, 2009) - Added fix for map with % width/height.
 * Version: 1.3.1 (3rd December 2008) - Added fix for % and & characters, fixes to properly handle double quotes and single quotes in setDataXML() function. Fixes in setDataXML() and setDataURL() functions.
 * Version: 1.3 (2nd April, 2007) - Added setting up Transparent/opaque mode, added fix for % scaled dimensions
 * Version: 1.2 (1st November, 2007) - FORM fix for IE 
 * Version: 1.1 (29th June, 2007) - Added Player detection, New conditional fixes for IE
 *
 * Morphed from SWFObject (http://blog.deconcept.com/swfobject/) under MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
if(typeof infosoftglobal == "undefined") var infosoftglobal = new Object();
if(typeof infosoftglobal.FusionMapsUtil == "undefined") infosoftglobal.FusionMapsUtil = new Object();
infosoftglobal.FusionMaps = function(swf, id, w, h, debugMode, registerWithJS, c, scaleMode, lang, detectFlashVersion, autoInstallRedirect){
	if (!document.getElementById) { return; }
	
	//Flag to see whether data has been set initially
	this.initialDataSet = false;
	
	//Create container objects
	this.params = new Object();
	this.variables = new Object();
	this.attributes = new Array();
	
	//Set attributes for the SWF
	if(swf) { this.setAttribute('swf', swf); }
	if(id) { this.setAttribute('id', id); }
	
	w=w.toString().replace(/\%/,"%25");
	if(w) { this.setAttribute('width', w); }
	h=h.toString().replace(/\%/,"%25");
	if(h) { this.setAttribute('height', h); }
	
	//Set background color
	if(c) { this.addParam('bgcolor', c); }
	
	//Set Quality	
	this.addParam('quality', 'high');
	
	//Add scripting access parameter
	this.addParam('allowScriptAccess', 'always');
	
	//Pass width and height to be appended as mapWidth and mapHeight
	this.addVariable('mapWidth', w);
	this.addVariable('mapHeight', h);

	//Whether in debug mode
	debugMode = debugMode ? debugMode : 0;
	this.addVariable('debugMode', debugMode);
	//Pass DOM ID to Map
	this.addVariable('DOMId', id);
	//Whether to registed with JavaScript
	registerWithJS = registerWithJS ? registerWithJS : 0;
	this.addVariable('registerWithJS', registerWithJS);
	
	//Scale Mode of Map
	scaleMode = scaleMode ? scaleMode : 'noScale';
	this.addVariable('scaleMode', scaleMode);
	
	//Application Message Language
	lang = lang ? lang : 'EN';
	this.addVariable('lang', lang);
	
	//Whether to auto detect and re-direct to Flash Player installation
	this.detectFlashVersion = detectFlashVersion?detectFlashVersion:1;
	this.autoInstallRedirect = autoInstallRedirect?autoInstallRedirect:1;
	
	//Ger Flash Player version 
	this.installedVer = infosoftglobal.FusionMapsUtil.getPlayerVersion();
	
	if (!window.opera && document.all && this.installedVer.major > 7) {
		// Only add the onunload cleanup if the Flash Player version supports External Interface and we are in IE
		infosoftglobal.FusionMaps.doPrepUnload = true;
	}
}

infosoftglobal.FusionMaps.prototype = {
	setAttribute: function(name, value){
		this.attributes[name] = value;
	},
	getAttribute: function(name){
		return this.attributes[name];
	},
	addParam: function(name, value){
		this.params[name] = value;
	},
	getParams: function(){
		return this.params;
	},
	addVariable: function(name, value){
		this.variables[name] = value;
	},
	getVariable: function(name){
		return this.variables[name];
	},
	getVariables: function(){
		return this.variables;
	},
	getVariablePairs: function(){
		var variablePairs = new Array();
		var key;
		var variables = this.getVariables();
		for(key in variables){
			variablePairs.push(key +"="+ variables[key]);
		}
		return variablePairs;
	},
	getSWFHTML: function() {
		var swfNode = "";
		if (navigator.plugins && navigator.mimeTypes && navigator.mimeTypes.length) { 
			// netscape plugin architecture			
			swfNode = '<embed type="application/x-shockwave-flash" src="'+ this.getAttribute('swf') +'" width="'+ this.getAttribute('width') +'" height="'+ this.getAttribute('height') +'"  ';
			swfNode += ' id="'+ this.getAttribute('id') +'" name="'+ this.getAttribute('id') +'" ';
			var params = this.getParams();
			 for(var key in params){ swfNode += [key] +'="'+ params[key] +'" '; }
			var pairs = this.getVariablePairs().join("&");
			 if (pairs.length > 0){ swfNode += 'flashvars="'+ pairs +'"'; }
			swfNode += '/>';
		} else { // PC IE			
			swfNode = '<object id="'+ this.getAttribute('id') +'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+ this.getAttribute('width') +'" height="'+ this.getAttribute('height') +'">';
			swfNode += '<param name="movie" value="'+ this.getAttribute('swf') +'" />';
			var params = this.getParams();
			for(var key in params) {
			 swfNode += '<param name="'+ key +'" value="'+ params[key] +'" />';
			}
			var pairs = this.getVariablePairs().join("&");			
			if(pairs.length > 0) {swfNode += '<param name="flashvars" value="'+ pairs +'" />';}
			swfNode += "</object>";
		}
		return swfNode;
	},
	setDataURL: function(strDataURL){
		//This method sets the data URL for the Map.
		//If being set initially
		if (this.initialDataSet==false){
			this.addVariable('dataURL',strDataURL);
			//Update flag
			this.initialDataSet = true;
		}else{
			//Else, we update the Map data using External Interface
			//Get reference to map object
			var mapObj = infosoftglobal.FusionMapsUtil.getMapObject(this.getAttribute('id'));
			if (!mapObj.setDataURL)
			{
				__flash__addCallback(mapObj, "setDataURL");
			}
			
			mapObj.setDataURL(strDataURL);
		}
	},
	
	//This function :
	//fixes the double quoted attributes to single quotes
	//Encodes all quotes inside attribute values
	//Encodes % to %25 and & to %26;
	encodeDataXML: function(strDataXML){
		
			var regExpReservedCharacters=["\\$","\\+"];
			var arrDQAtt=strDataXML.match(/=\s*\".*?\"/g);
			if (arrDQAtt){
				for(var i=0;i<arrDQAtt.length;i++){
					var repStr=arrDQAtt[i].replace(/^=\s*\"|\"$/g,"");
					repStr=repStr.replace(/\'/g,"%26apos;");
					var strTo=strDataXML.indexOf(arrDQAtt[i]);
					var repStrr="='"+repStr+"'";
					var strStart=strDataXML.substring(0,strTo);
					var strEnd=strDataXML.substring(strTo+arrDQAtt[i].length);
					var strDataXML=strStart+repStrr+strEnd;
				}
			}
			
			strDataXML=strDataXML.replace(/\"/g,"%26quot;");
			strDataXML=strDataXML.replace(/%(?![\da-f]{2}|[\da-f]{4})/ig,"%25");
			strDataXML=strDataXML.replace(/\&/g,"%26");

			return strDataXML;

	},
	
	setDataXML: function(strDataXML){
		//If being set initially
		if (this.initialDataSet==false){
			//This method sets the data XML for the map INITIALLY.
			this.addVariable('dataXML',this.encodeDataXML(strDataXML));
			//Update flag
			this.initialDataSet = true;
		}else{
			//Else, we update the map data using External Interface
			//Get reference to map object
			var mapObj = infosoftglobal.FusionMapsUtil.getMapObject(this.getAttribute('id'));
			
			if (!mapObj.setDataXML)
			{
				__flash__addCallback(mapObj, "setDataXML");
			}
			mapObj.setDataXML(strDataXML);
		}
	},
	setTransparent: function(isTransparent){
		//Sets map to transparent mode when isTransparent is true (default)
		//When no parameter is passed, we assume transparent to be true.
		if(typeof isTransparent=="undefined") {
			isTransparent=true;
		}			
		//Set the property
		if(isTransparent)
			this.addParam('WMode', 'transparent');
		else
			this.addParam('WMode', 'Opaque');
	},
	
	render: function(elementId){
	
		//First check for installed version of Flash Player - we need a minimum of 8
		if( (this.detectFlashVersion==1) && (this.installedVer.major < 8) ) {
			if( this.autoInstallRedirect==1 ) {
			
				//If we can auto redirect to install the player?
				var installationConfirm = window.confirm("You need Adobe Flash Player 8 (or above) to view the maps. It is a free and lightweight installation from Adobe.com. Please click on Ok to install the same.");
				
				if( installationConfirm ) {
					window.location = "http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash";
				}
				else {
					return false;
				}

			}else{
				//Else, do not take an action. It means the developer has specified a message in the DIV (and probably a link).
				//So, expect the developers to provide a course of way to their end users.
				return false;
			}			
		}
		else {
		
		
		
			//Render the map
			var n = (typeof elementId == 'string') ? document.getElementById(elementId) : elementId;
			
			if(  this.getVariable('scaleMode').search(/noscale/i)>=0 &&  
		         ( this.getAttribute('width').search("%")>0 || 
        		    this.getAttribute('height').search("%")>0) ) {
					
				//store current object reference
				var obj=this;
				if(window.addEventListener) {
					//add onload event on firefox                                 
			        window.addEventListener("load",function() { n.innerHTML = obj.getSWFHTML(); }, false );
				} else if(window.attachEvent) {
					//add onload event on IE
					n.innerHTML = this.getSWFHTML();		
					//window.attachEvent("onload", function() { n.innerHTML = obj.getSWFHTML(); } );
				} else { 
					// if all onload fails fails
					n.innerHTML = this.getSWFHTML();		
				}
			} else {
				//Normal case. Instantly load the map
				n.innerHTML = this.getSWFHTML();
			}
			
			
			//Added <FORM> compatibility
			//Check if it's added in Mozilla embed array or if already exits 
			if(!document.embeds[this.getAttribute('id')] && !window[this.getAttribute('id')]) {
		      	window[this.getAttribute('id')]=document.getElementById(this.getAttribute('id')); 
			}
			//or else document.forms[formName/formIndex][cmapId]		
			return true;		
		}
	}
}

/* ---- detection functions ---- */
infosoftglobal.FusionMapsUtil.getPlayerVersion = function(){
	var PlayerVersion = new infosoftglobal.PlayerVersion([0,0,0]);
	if(navigator.plugins && navigator.mimeTypes.length){
		var x = navigator.plugins["Shockwave Flash"];
		if(x && x.description) {
			PlayerVersion = new infosoftglobal.PlayerVersion(x.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s+r|\s+b[0-9]+)/, ".").split("."));
		}
	}else if (navigator.userAgent && navigator.userAgent.indexOf("Windows CE") >= 0){ 
		//If Windows CE
		var axo = 1;
		var counter = 3;
		while(axo) {
			try {
				counter++;
				axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+ counter);
				PlayerVersion = new infosoftglobal.PlayerVersion([counter,0,0]);
			} catch (e) {
				axo = null;
			}
		}
	} else { 
		// Win IE (non mobile)
		// Do minor version lookup in IE, but avoid Flash Player 6 crashing issues
		try{
			var axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
		}catch(e){
			try {
				var axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
				PlayerVersion = new infosoftglobal.PlayerVersion([6,0,21]);
				axo.AllowScriptAccess = "always"; // error if player version < 6.0.47 (thanks to Michael Williams @ Adobe for this code)
			} catch(e) {

				if (PlayerVersion.major == 6) {
					return PlayerVersion;
				}
			}
			try {
				axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			} catch(e) {}
		}
		if (axo != null) {
			PlayerVersion = new infosoftglobal.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","));
		}
	}
	return PlayerVersion;
}
infosoftglobal.PlayerVersion = function(arrVersion){
	this.major = arrVersion[0] != null ? parseInt(arrVersion[0]) : 0;
	this.minor = arrVersion[1] != null ? parseInt(arrVersion[1]) : 0;
	this.rev = arrVersion[2] != null ? parseInt(arrVersion[2]) : 0;
}
// ------------ Fix for Out of Memory Bug in IE in FP9 ---------------//
/* Fix for video streaming bug */
infosoftglobal.FusionMapsUtil.cleanupSWFs = function() {
	var objects = document.getElementsByTagName("OBJECT");
	for (var i = objects.length - 1; i >= 0; i--) {
		objects[i].style.display = 'none';
		for (var x in objects[i]) {
			if (typeof objects[i][x] == 'function') {
				objects[i][x] = function(){};
			}
		}
	}
}
// Fixes bug in fp9
if (infosoftglobal.FusionMaps.doPrepUnload) {
	if (!infosoftglobal.unloadSet) {
		infosoftglobal.FusionMapsUtil.prepUnload = function() {
			__flash_unloadHandler = function(){};
			__flash_savedUnloadHandler = function(){};
			window.attachEvent("onunload", infosoftglobal.FusionMapsUtil.cleanupSWFs);
		}
		window.attachEvent("onbeforeunload", infosoftglobal.FusionMapsUtil.prepUnload);
		infosoftglobal.unloadSet = true;
	}
}
/* Add document.getElementById if needed (mobile IE < 5) */
if (!document.getElementById && document.all) { document.getElementById = function(id) { return document.all[id]; }}
/* Add Array.push if needed (ie5) */
if (Array.prototype.push == null) { Array.prototype.push = function(item) { this[this.length] = item; return this.length; }}

/* Function to return Flash Object from ID */
infosoftglobal.FusionMapsUtil.getMapObject = function(id)
{
  var mapRef=null;
  if (navigator.appName.indexOf("Microsoft Internet")==-1) {
    if (document.embeds && document.embeds[id])
      mapRef = document.embeds[id]; 
	else
	mapRef  = window.document[id];
  }
  else {
   	mapRef = window[id];
  }
  if (!mapRef)
	mapRef  = document.getElementById(id);
  
  return mapRef;
}
/* Aliases for easy usage */
var getMapFromId = infosoftglobal.FusionMapsUtil.getMapObject;
var FusionMaps = infosoftglobal.FusionMaps;