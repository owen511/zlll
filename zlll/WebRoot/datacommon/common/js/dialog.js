var Sys = {}; 
var ua = navigator.userAgent.toLowerCase(); 
var s; 
(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] : 
(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] : 
(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] : 
(s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] : 
(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0; 

/*if (Sys.ie) document.write('IE: ' + Sys.ie); 
if (Sys.firefox) document.write('Firefox: ' + Sys.firefox); 
if (Sys.chrome) document.write('Chrome: ' + Sys.chrome); 
if (Sys.opera) document.write('Opera: ' + Sys.opera); 
if (Sys.safari) document.write('Safari: ' + Sys.safari);*/ 

var pwin = window;
//if(window.top){
//  pwin = window.top;
//}

var Dialogs = {};
var zIndex = 10000;
var Dialog = function(dlgName){
  this.dlgName = dlgName;
  this.init();
}
var outpaydlg;

Dialog.prototype.init = function(){
  this.dlg = pwin.jQuery("<dl id=\""+this.dlgName+"\" class=\"dialog\" style=\"display:none;\"><iframe id=\"appendIframe\" frameborder=\"0\" height=\"0\" width=\"0\"></iframe><dt class=\"dialog_bar\"><span class=\"dialog_closeIcon\"></span><span class=\"dialog_title\"></span></dt><dd class=\"dialog_pane\"></dd></dl>");
  this.dlgMask = pwin.jQuery("<div id=\""+this.dlgName+"_mask\" class=\"dialog_mask\" style=\"display:none\"></div>");
  if(Sys.ie && parseFloat(Sys.ie)<7){
    var dlgIE6MaskHtml = "<iframe id=\"ie6bugframe\" src=\"javascript:false;\" style=\"position:absolute; visibility:inherit; top:0px; left:0px; width:100%; height:100%; z-index:800; filter='alpha(opacity=0)';\"></iframe>";
    this.dlgMask.append(dlgIE6MaskHtml);
  }
  this.dlgAlphaBorder = pwin.jQuery("<div id=\""+this.dlgName+"_alphaborder\" class=\"dialog_alphaborder\" style=\"display:none\"></div>");
  pwin.jQuery("body").append(this.dlg);
  pwin.jQuery("body").append(this.dlgMask);
  //pwin.jQuery("body").append(this.dlgAlphaBorder);
 
  this.dlg.find(".dialog_closeIcon").bind("click",this,function(e){
    e.data.close();
  });
  if(Dialogs[this.dlgName]){
    Dialogs[this.dlgName] = null;  
  }
  Dialogs[this.dlgName] = this;
  pwin.dlg = this.dlg;
}


Dialog.prototype._initStyle = function(title,style){
  if(this.isVisible()){
    this.close();  
  }
  
  if(!style.model){
    style.model = "";  
  }
  
  if(style.zIndex){
	  zIndex = style.zIndex;
  }
  
  if(style.model == ""){
    
    //if(document.documentElement){
      //this.dlgMask.css("width",pwin.jQuery("body").width()+"px");
      //this.dlgMask.css("height",pwin.jQuery("body").height()+"px");//ie bug?
   
      //this.dlgMask.css("width","100%");
      //this.dlgMask.css("height","100%");
    //}else{
      this.dlgMask.css("width",document.body.scrollWidth+"px");
      this.dlgMask.css("height",document.body.scrollHeight+"px");
    //}
    //alert(this.dlgMask.css("width")+","+this.dlgMask.css("height"));
    this.dlgMask.css("display","");
  }
  
  this.dlg.css("display","");
  var contentContainer = this.dlg.find(".dialog_pane");
  
  this.dlg.find(".dialog_title").text(title);

  
  
  if(style.width){  this.dlg.css("width",style.width+"px");}
  if(style.height){  this.dlg.css("height",style.height+"px");}
  
  var dlgBar = this.dlg.find(".dialog_bar");
  var contentWidth = this.dlg.width();
  var contentHeight = this.dlg.height()-dlgBar.height();
  if(style.width){  contentContainer.css("width",contentWidth+"px");}
  if(style.height){  contentContainer.css("height",contentHeight+"px");}
  
  if(style.left){    this.dlg.css("left",style.left+"px");}
  if(style.top){  this.dlg.css("top",style.top+"px");}
  if(style.draggable){ 
    this.dlg.draggable({ handle: ".dialog_bar" });
  };

  if(style.center){
    if (typeof document.body.style.maxHeight === "undefined") {//if IE 6
      
      var top = pwin.document.documentElement.scrollTop+(pwin.document.documentElement.clientHeight-this.dlg.height())/2; 
      var left = (pwin.document.documentElement.clientWidth - this.dlg.width())/2;

      this.dlg.css("position","absolute");
      
      this.dlg.css("top",(pwin.jQuery("body").scrollTop()+top)+"px");
      this.dlg.css("left",(pwin.jQuery("body").scrollLeft()+left)+"px");
      this.dlg.css("margin-top","0px");
      this.dlg.css("margin-left","0px");
     
    }else{
      this.dlg.css("position","fixed");
      this.dlg.css("top","50%");
      this.dlg.css("left","50%");
      this.dlg.css("margin-top",-this.dlg.height()/2+"px");
      this.dlg.css("margin-left",-this.dlg.width()/2+"px");
    }
    
    if(style.alphaborder!="none"){
      this.dlgAlphaBorder.css("display","");
      this.dlgAlphaBorder.css("width",this.dlg.width()+13+"px");
      this.dlgAlphaBorder.css("height",this.dlg.height()+13+"px");
      if (typeof document.body.style.maxHeight === "undefined") {//if IE 6           
        this.dlgAlphaBorder.css("position","absolute");
        this.dlgAlphaBorder.css("top",(this.dlg.position().top-6)+"px");
        this.dlgAlphaBorder.css("left",(this.dlg.position().left-6)+"px");
      }else{
        this.dlgAlphaBorder.css("position","fixed");
        this.dlgAlphaBorder.css("margin-top",-this.dlgAlphaBorder.height()/2+"px");
        this.dlgAlphaBorder.css("margin-left",-this.dlgAlphaBorder.width()/2+"px");
        this.dlgAlphaBorder.css("top","50%");
        this.dlgAlphaBorder.css("left","50%");
      }
    }
  }else{
    this.dlg.css("position","absolute");
    this.dlgAlphaBorder.css("position","absolute");
    if(style.alphaborder!="none"){
      this.dlgAlphaBorder.css("display","");
      this.dlgAlphaBorder.css("display","");
      var w = this.dlg.width();
      var h = this.dlg.height();
      var pos = this.dlg.position();
      this.dlgAlphaBorder.css("margin-top","0px");
      this.dlgAlphaBorder.css("margin-left","0px");
      this.dlgAlphaBorder.css("width",w+12);
      this.dlgAlphaBorder.css("height",h+12);
      this.dlgAlphaBorder.css("top",pos.top-5);
      this.dlgAlphaBorder.css("left",pos.left-5);
    }
  }
  
  this.dlgMask.css("z-index",zIndex);
  zIndex++;
  this.dlgAlphaBorder.css("z-index",zIndex);
  zIndex++;
  this.dlg.css("z-index",zIndex);
}

Dialog.prototype.isVisible = function(){
  return this.dlg.css("display")!="none";
}

Dialog.prototype.showDiv = function(title,style,divId,context){
  this.context = context;
  this._initStyle(title,style);
  this.cType = "div";
  this.divContainer = pwin.jQuery("#"+divId).parent();
  this.dlg.find(".dialog_pane").append(pwin.jQuery("#"+divId));
  pwin.jQuery("#"+divId).css("display","");
}

Dialog.prototype.showIframe = function(title,style,iframeUrl,context){
  //alert(iframeUrl);
  //alert(this.dlg.attr("id"));

  this.context = context;
  
  this._initStyle(title,style);
  this.cType = "iframe";
  //alert(this.dlg.find(".dialog_pane").length);

  var iframe = pwin.jQuery("<iframe class=\"dialog_iframeContent\" width=\"100%\" height=\"100%\" src=\""+iframeUrl+"\" frameborder=\"0\"></iframe>");
  this.dlg.find(".dialog_pane").append(iframe);
  iframe[0].contentWindow.dialog = this;
}

Dialog.prototype.showSimple = function(title,style,content,buttons,context){
  this.context = context;
  this._initStyle(title,style);
  this.cType = "simple";
  var dlgContentContainer = this.dlg.find(".dialog_pane");
  var dlgContent = pwin.jQuery("<div>"+content+"</div>");
  dlgContentContainer.append(dlgContent);
  var dlgButtons = pwin.jQuery("<div></div>");
  dlgContentContainer.append(dlgButtons);
  for(var i=0;i<buttons.length;i++){
    var btn = pwin.jQuery("<button type=\"button\">"+buttons[i].text+"</button>");
    btn.click(buttons[i].click);
    dlgButtons.append(btn);
  }
}

Dialog.prototype.onClose = function(dlg){

};

Dialog.prototype.close = function(){
  if(this.dlgName == 'OutpayProject') {
	  this.dlg.find(".dialog_pane").parent().hide();
  }else if(this.dlgName == 'BDGATTR') {
	  this.dlg.find(".dialog_pane").parent().hide();
	  this.dlgMask.remove();
  } else {
  	  this.onClose(this);
	  var dlgContent = this.dlg.find(".dialog_pane").children();
	  if(this.cType == "div"){
	    dlgContent.css("display","none");
	    this.divContainer.append(dlgContent);
	  }else{
	    dlgContent.empty();
	  }
	  this.cType = null;
	  this.dlg.remove();
	  this.dlgMask.remove();
	  this.dlgAlphaBorder.remove();
	  Dialogs[this.dlgName] = null;
  }
}

Dialog.prototype.toString = function(){
  return "dialog";
}

function showDivDialog(title,contentId,styles,model,dlgName,context){
  if(!dlgName){
    dlgName = contentId.substring(4);
  }
  var dlg = Dialogs[dlgName];
  if(!dlg){
    dlg = new Dialog(dlgName);  
  }
  if(!model){
    styles.model = "none";  
  }
  dlg.showDiv(title,styles,contentId,context);
}

function showDivDialogNotAppend(title,contentId,styles,model,dlgName,context){
  pwin.jQuery("#"+dlgName).css("display","");
  //outpaydlg.showDivNotAppend(title,styles,contentId,context);
}

function showIFrameDialog(title,frameUrl,styles,model,dlgName,context){
  if(!dlgName){
    dlgName = "";
  }
  var dlg = Dialogs[dlgName];
  if(!dlg){
    dlg = new Dialog(dlgName);  
  }
  if(!model){
    styles.model = "none";  
  }
  dlg.showIframe(title,styles,frameUrl,context);
  
}

function closeDialog(dlgName){
  if(!dlgName){
    for(var dName in Dialogs){
      Dialogs[dName].close();
      Dialogs[dName] = null;
    }
  }else{
    Dialogs[dlgName].close(); 
    Dialogs[dName] = null;
  }
}

function showDialog(title,contentId,styles,model,dlgName,context){
  showDivDialog(title,contentId,styles,model,dlgName,context);
}

function showDialogNotAppend(title,contentId,styles,model,dlgName,context){
  showDivDialogNotAppend(title,contentId,styles,model,dlgName,context);
}

function initDivNotAppend(title,style,divId,dlgName) {
	  if(!dlgName){
	    dlgName = divId.substring(4);
	  }
	  outpaydlg = Dialogs[dlgName];
	  if(!outpaydlg){
	    outpaydlg = new Dialog(dlgName);  
	  }
	  style.model = "none"; 
	  outpaydlg.context = context;
	  outpaydlg._initStyle(title,style);
	  outpaydlg.cType = "div";
	  outpaydlg.divContainer = pwin.jQuery("#"+divId).parent();
	  outpaydlg.dlg.find(".dialog_pane").append(pwin.jQuery("#"+divId));
	  pwin.jQuery("#"+divId).css("display","");
	  pwin.jQuery("#"+dlgName).css("display","none");
}