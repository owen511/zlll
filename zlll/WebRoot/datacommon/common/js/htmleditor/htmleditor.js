if(!window.HtmlEditor_i18n){
  var HtmlEditor_i18n = {};
  HtmlEditor_i18n["Bold"] = "\u7c97\u4f53";
  HtmlEditor_i18n["Italic"] = "\u659c\u4f53";
  HtmlEditor_i18n["Underline"] = "\u4e0b\u5212\u7ebf";
  HtmlEditor_i18n["StrikeThrough"] = "\u5220\u9664\u7ebf";
  HtmlEditor_i18n["Indent"] = "\u7f29\u8fdb";
  HtmlEditor_i18n["Outdent"] = "\u51cf\u5c11\u7f29\u8fdb";
  HtmlEditor_i18n["InsertOrderedList"] = "\u7f16\u53f7";
  HtmlEditor_i18n["InsertUnOrderedList"] = "\u9879\u76ee\u7b26\u53f7";

  HtmlEditor_i18n["FormatBlock"] = "\u6bb5\u843d\u6837\u5f0f";
  HtmlEditor_i18n["FontName"] = "\u5b57\u4f53";
  HtmlEditor_i18n["FontSize"] = "\u5b57\u53f7";

  HtmlEditor_i18n["RemoveFormat"] = "\u6e05\u9664\u683c\u5f0f";
  HtmlEditor_i18n["ForeColor"] = "\u524d\u666f\u8272";
  HtmlEditor_i18n["BackColor"] = "\u80cc\u666f\u8272";
  HtmlEditor_i18n["Insert Link"] = "\u63d2\u5165\u94fe\u63a5";
  HtmlEditor_i18n["UnLink"] = "\u53d6\u6d88\u94fe\u63a5";

  HtmlEditor_i18n["JustifyLeft"] = "\u5de6\u5bf9\u9f50";
  HtmlEditor_i18n["JustifyCenter"] = "\u5c45\u4e2d\u5bf9\u9f50";
  HtmlEditor_i18n["JustifyRight"] = "\u53f3\u5bf9\u9f50";

  HtmlEditor_i18n["FontSize"] = "\u5b57\u53f7";

  HtmlEditor_i18n["Insert Image"] = "\u63d2\u5165\u56fe\u7247";
  HtmlEditor_i18n["Insert Emotion"] = "\u63d2\u5165\u8868\u60c5";

  HtmlEditor_i18n["Insert Math Formula"] = "\u63d2\u5165\u6570\u5b66\u516c\u5f0f";
  HtmlEditor_i18n["Upload File"] = "\u63d2\u5165\u4e0a\u4f20\u6587\u4ef6";
  HtmlEditor_i18n["Insert Table"] = "\u63d2\u5165\u8868\u683c";
  HtmlEditor_i18n["Insert Special Character"] = "\u63d2\u5165\u62fc\u97f3\u7b49\u7279\u6b8a\u5b57\u7b26";
  HtmlEditor_i18n["Edit HTML Source Code"] = "\u7f16\u8f91HTML\u6e90\u4ee3\u7801";

  HtmlEditor_i18n["Formula Example"] = "\u6570\u5b66\u516c\u5f0f\u793a\u4f8b";
  HtmlEditor_i18n["Width"] = "\u5bbd\u5ea6";
  HtmlEditor_i18n["Height"] = "\u9ad8\u5ea6"
  HtmlEditor_i18n.get = function(text){
    var value = text;
    if(HtmlEditor_i18n[text]){
      value = HtmlEditor_i18n[text];
    }
    return value;
  }
  window.HtmlEditor_i18n = HtmlEditor_i18n;
}

var HtmlEditorConfigure = {};

HtmlEditorConfigure.LayoutSetting = {};
HtmlEditorConfigure.LayoutSetting["diary"] =new Array("|","bold","italic","underline","|","focecolor","|","removeformat","|","createlink","|","justifyleft","justifycenter","justifyright","formatblock","fontname","fontsize","|","insertimage","emotion");
//HtmlEditorConfigure.LayoutSetting["diary"] = new Array("|","bold","italic","underline","strikethrough","|","focecolor","backcolor","|","removeformat","|","createlink","unlink","|","justifyleft","justifycenter","justifyright","|","indent","outdent","insertorderedlist","insertunorderedlist","|","formatblock","fontname","fontsize","|","insertimage","inserttable","uploadfile","|","mathformula","specialchar","emotion","mathformula","sourcecode");
HtmlEditorConfigure.LayoutSetting["itembank_admin"] = new Array("bold","italic","underline","focecolor","removeformat","|","justifyleft","justifycenter","justifyright","|","fontname","fontsize","|","insertimage","mathformula","specialchar","sourcecode");
HtmlEditorConfigure.LayoutSetting["itembank_teacher"] = new Array("bold","italic","underline","focecolor","removeformat","|","justifyleft","justifycenter","justifyright","|","fontname","fontsize","|","insertimage","mathformula","specialchar");
HtmlEditorConfigure.LayoutSetting["itembank_student"] = new Array("bold","italic","underline","focecolor","removeformat","|","justifyleft","justifycenter","justifyright","mathformula","specialchar");
//HtmlEditorConfigure.LayoutSetting["default"] =new Array("|","bold","italic","underline","strikethrough","|","focecolor","backcolor","|","removeformat","|","createlink","unlink","|","justifyleft","justifycenter","justifyright","|","indent","outdent","insertorderedlist","insertunorderedlist","|","formatblock","fontname","fontsize","|","insertimage","inserttable","uploadfile","|","mathformula","specialchar","sourcecode");
HtmlEditorConfigure.LayoutSetting["default"] =new Array("|","bold","italic","underline","|","focecolor","backcolor","|","removeformat","|","createlink","unlink","|","justifyleft","justifycenter","justifyright","|","indent","outdent","insertorderedlist","|","fontname","fontsize");
//HtmlEditorConfigure.LayoutSetting["default"] = new Array("|","bold","italic","underline","|","focecolor","backcolor","|","removeformat","|","createlink","|","justifyleft","justifycenter","justifyright","|","insertimage");
HtmlEditorConfigure.LayoutSetting["simple"] = new Array("bold","italic","underline","forecolor","backgroundcolor","createlink","insertimage","justifyleft","justifycenter","justifyright");
HtmlEditorConfigure.LayoutSetting["complex"] = new Array("bold","italic","underline","forecolor","backgroundcolor","createlink","insertimage","justifyleft","justifycenter","justifyright","uploadfile");
HtmlEditorConfigure.LayoutSetting["allfunc"] = new Array("|","bold","italic","underline","strikethrough","|","focecolor","backcolor","|","removeformat","|","createlink","unlink","|","justifyleft","justifycenter","justifyright","|","indent","outdent","insertorderedlist","insertunorderedlist","|","formatblock","fontname","fontsize","|","insertimage","inserttable","uploadfile","|","mathformula","specialchar","emotion","mathformula","sourcecode");

HtmlEditorConfigure._MathUrl = "http://www.voojoy.com/cgi-bin/mimetex.cgi?";
HtmlEditorConfigure._HtmlEditorPath = "";


var HtmlEditors = {};
HtmlEditors.editors = [];
HtmlEditors.Add = function(htmleditor){
  if(htmleditor == null) return;
  for(var i=0;i<this.editors.length;i++){
    if(htmleditor == this.editors[i]){
      return;
    }
  }
  this.editors[this.editors.length] = htmleditor;
}

HtmlEditors.Remove = function(htmleditor){
  var index = -1;
  for(var i=0;i<this.editors.length;i++){
    if(htmleditor == this.editors[i]){
      if(htmleditor.cfg.unique){
        $("body").unbind("mousedown",htmleditor.bodymousedown);
      }
      index = i;
    }
  }
  if(index!=-1){ this.editors.splice(index);}
}

HtmlEditors.Contains = function(htmleditor){
  for(var i=0;i<this.editors.length;i++){
    if(htmleditor == this.editors[i]){
      return true;
    }
  }
  return false;
}

HtmlEditors.SaveAll = function(){
  for(var i=0;i<this.editors.length;i++){
    this.editors[i].save();
  }
}

HtmlEditors.HideAll = function(){
  for(var i=0;i<this.editors.length;i++){
    this.editors[i].hide();
  }
}

HtmlEditors.ShowAll = function(){
  for(var i=0;i<this.editors.length;i++){
    this.editors[i].show();
  }
}

HtmlEditors.DestroyAll = function(){
  for(var i=0;i<this.editors.length;i++){
    this.editors[i].destroy();
  }
}

HtmlEditors.getClipboardHTML = function() {
  var oDiv = $("#temp_clipboard").get(0);
  oDiv.innerHTML = "" ;
  var oTextRange = document.body.createTextRange() ;
  oTextRange.moveToElementText(oDiv) ;
  oTextRange.execCommand("Paste") ;
  var sData = oDiv.innerHTML ;
  oDiv.innerHTML = "" ;
	return sData ;
}

HtmlEditors.clearWordFormat = function(html){
// Remove all SPAN tags
  html = html.replace(/<\/?SPAN[^>]*>/gi,"");
  // Remove Class attributes
  html = html.replace(/<(\w[^>]*) class=([^ |>]*)([^>]*)/gi,"<$1$3") ;
  // Remove Style attributes
  html = html.replace(/<(\w[^>]*) style="([^"]*)"([^>]*)/gi,"<$1$3") ;
  // Remove Lang attributes
  html = html.replace(/<(\w[^>]*) lang=([^ |>]*)([^>]*)/gi,"<$1$3") ;
  // Remove XML elements and declarations
  html = html.replace(/<\\?\?xml[^>]*>/gi,"") ;
  // Remove Tags with XML namespace declarations: <o:p></o:p>
  html = html.replace(/<\/?\w+:[^>]*>/gi, "") ;
  // Replace the &nbsp;
  html = html.replace(/&nbsp;/, " ");
  // Transform <P> to <DIV>
  var re = new RegExp("(<P)([^>]*>.*?)(<\/P>)","gi");  // Different because of a IE 5.0 error
  html = html.replace(re,"<div$2</div>");
  return html;
}


function HtmlEditor(bindEle,cfg){
  this.bindEle = bindEle;
  
  this.bindEle.htmleditor = this;
  
  if(!cfg){ cfg = {};}
  if(!cfg.layout){ cfg.layout = "default";}
  if(!cfg.serverCfgName){ cfg.serverCfgName = "Default"; }
  if(!cfg.contentCss){ cfg.contentCss = "/htmleditor/style/editcontent.css";}
  if(!cfg.uploadUrl){cfg.uploadUrl = "/budget/collection/fillexplain/saveFill.do";}
  if(!cfg.path){cfg.path = "/budget/common/js/htmleditor/"; };

  //if(!cfg.btnImageUrl){cfg.btnImageUrl = "/htmleditor/images/htmleditor/"}
  
  this.cfg = cfg;
  
  var bindEleValue = $(this.bindEle).val();
  if(!bindEleValue){
    bindEleValue = $(this.bindEle).html();  
  }
  if(!bindEleValue || bindEleValue==""){
    //bindEleValue = "<p></p>";
    bindEleValue = "";
  }
  
  this.editorDiv = $("<div class=\"htmleditor\"><div class=\"htmleditor_toolbar\"></div><iframe class=\"htmleditor_iframe\" frameborder=\"0\"></iframe></div>");
  $(this.bindEle).after(this.editorDiv);
  if(this.cfg.width){
    this.editorDiv.find(".htmleditor_iframe").width(this.cfg.width);
  }else{
    this.editorDiv.find(".htmleditor_iframe").width($(this.bindEle).width());
  }
  
  if(this.cfg.height){
    this.editorDiv.find(".htmleditor_iframe").height(this.cfg.height);
  }else{
    this.editorDiv.find(".htmleditor_iframe").height($(this.bindEle).height());
  }
  
  this.editorWindow = this.editorDiv.find(".htmleditor_iframe")[0].contentWindow; 
  this.editorWindow.document.designMode = 'On';
  this.editorWindow.document.contentEditable = true;
  
  this.editorWindow.editorObj = this;
  
  
  this.editorWindow.document.open();
  this.editorWindow.document.writeln("<html><head><link href=\""+this.cfg.contentCss+"\" rel=\"stylesheet\" type=\"text/css\"/></head><body>"+bindEleValue+"</body></html>");
  this.editorWindow.document.onclick = "alert()";
  this.editorWindow.document.close();
  
  this.editorWindow.document.charset="utf-8";
  
  
  this.srcElement = null;
  if(window.getSelection){//for ff
    $(this.editorWindow.document).bind("mouseup",this,function(event){
      event.data.srcElement = event.target;
    });
  }
  
  
  //ie bug
  if(document.attachEvent){
      var selRange;
      var ieSelectionBookmark ;
      /**
      * IE bug
      */
      
      this.editorWindow.document.onbeforedeactivate = function() {
        selRange = this.selection.createRange();
        //var range = this.selection.createRange();
        //if(range.getBookmark){
        //  ieSelectionBookmark = range.getBookmark();
        //}
        
      };
      /**
      * IE bug
      */
      this.editorWindow.document.onactivate = function () {
        if(selRange){
          selRange.select();
          selRange = null;
        }
        /*
        if(ieSelectionBookmark){
          var range = this.body.createTextRange();
          range.moveToBookmark(ieSelectionBookmark);
          range.select();
          ieSelectionBookmark = null;
        }
        */
        
      }
  }
  
  if(!this.plugins){
    this.plugins = {};  
  }
  
  //bold button
  var boldPlugin = $("<div class=\"plugin\"><img class=\"btn\" src=\""+this.cfg.path+"images/plugin/"+"bold.gif\" title=\""+HtmlEditor_i18n.get("Bold")+"\" alt=\""+HtmlEditor_i18n.get("Bold")+"\" /></div>");
  boldPlugin.bind("click",this,function(event){
    event.data.execCommand("bold",false,null);
  });
  this.plugins["bold"] = boldPlugin;
  
  //italic button
  var italicPlugin = $("<div class=\"plugin\"><img class=\"btn\" src=\""+this.cfg.path+"images/plugin/"+"italic.gif\" title=\""+HtmlEditor_i18n.get("Italic")+"\" alt=\""+HtmlEditor_i18n.get("Italic")+"\" /></div>");
  italicPlugin.bind("click",this,function(event){
    event.data.execCommand("italic",false,null);
  });
  this.plugins["italic"] = italicPlugin;
  
  //underline button
  var underlinePlugin = $("<div class=\"plugin\"><img class=\"btn\" src=\""+this.cfg.path+"images/plugin/"+"underline.gif\" title=\""+HtmlEditor_i18n.get("Underline")+"\" alt=\""+HtmlEditor_i18n.get("Underline")+"\" /></div>");
  underlinePlugin.bind("click",this,function(event){
    event.data.execCommand("underline",false,null);
  });
  this.plugins["underline"] = underlinePlugin;
  
  //StrikeThrough button
  var strikethroughPlugin = $("<div class=\"plugin\"><img class=\"btn\" src=\""+this.cfg.path+"images/plugin/"+"strikethrough.gif\" title=\""+HtmlEditor_i18n.get("StrikeThrough")+"\" alt=\""+HtmlEditor_i18n.get("StrikeThrough")+"\" /></div>");
  strikethroughPlugin.bind("click",this,function(event){
    event.data.execCommand("StrikeThrough",false,null);
  });
  this.plugins["strikethrough"] = strikethroughPlugin;
  
  //indent button
  var indentPlugin = $("<div class=\"plugin\"><img class=\"btn\" src=\""+this.cfg.path+"images/plugin/"+"indent.gif\" title=\""+HtmlEditor_i18n.get("Indent")+"\" alt=\""+HtmlEditor_i18n.get("Indent")+"\" /></div>");
  indentPlugin.bind("click",this,function(event){
    event.data.execCommand("Indent",false,null);;
  });
  this.plugins["indent"] = indentPlugin;
  
  //outdent button
  var outdentPlugin = $("<div class=\"plugin\"><img class=\"btn\" src=\""+this.cfg.path+"images/plugin/"+"outdent.gif\" title=\""+HtmlEditor_i18n.get("Outdent")+"\" alt=\""+HtmlEditor_i18n.get("Outdent")+"\" /></div>");
  outdentPlugin.bind("click",this,function(event){
    event.data.execCommand("Outdent",false,null);
  });
  this.plugins["outdent"] = outdentPlugin;
  
  //insertorderedlist button
  var insertorderedlistPlugin = $("<div class=\"plugin\"><img class=\"btn\" src=\""+this.cfg.path+"images/plugin/"+"insertorderedlist.gif\" title=\""+HtmlEditor_i18n.get("InsertOrderedList")+"\" alt=\""+HtmlEditor_i18n.get("InsertOrderedList")+"\" /></div>");
  insertorderedlistPlugin.bind("click",this,function(event){
    event.data.execCommand("InsertOrderedList",false,null);
  });
  this.plugins["insertorderedlist"] = insertorderedlistPlugin;
  
  //insertunorderedlist button
  var insertunorderedlistPlugin = $("<div class=\"plugin\"><img class=\"btn\" src=\""+this.cfg.path+"images/plugin/"+"insertunorderedlist.gif\" title=\""+HtmlEditor_i18n.get("InsertUnOrderedList")+"\" alt=\""+HtmlEditor_i18n.get("InsertUnOrderedList")+"\" /></div>");
  insertunorderedlistPlugin.bind("click",this,function(event){
    event.data.execCommand("InsertUnOrderedList",false,null);
  });
  this.plugins["insertunorderedlist"] = insertunorderedlistPlugin;
  
  //formatblock select
  var blocks = [];
  blocks[0] = {"tag":"","text":HtmlEditor_i18n.get("FormatBlock")};
  blocks[1] = {"tag":"<P>","text":HtmlEditor_i18n.get("FormatBlock")};
  blocks[2] = {"tag":"<H1>","text":HtmlEditor_i18n.get("FormatBlock")};
  blocks[3] = {"tag":"<H2>","text":HtmlEditor_i18n.get("FormatBlock")};
  blocks[4] = {"tag":"<H3>","text":HtmlEditor_i18n.get("FormatBlock")};
  var fbPluginHtml = "<div class=\"plugin\"><select>";
  for(var i=0;i<blocks.length;i++){
    fbPluginHtml+="<option value=\""+blocks[i]["tag"]+"\">"+blocks[i]["text"]+"</option>"
  }
  fbPluginHtml+="</select></div>";
  var formatblockPlugin = $(fbPluginHtml);
  formatblockPlugin.find("select").bind("change",this,function(event){
    event.data.execCommand("FormatBlock",false,$(this).val());
    $(this).val("");
  });
  this.plugins["formatblock"] = formatblockPlugin;
  
  //fontname select
  var fontnames = [];
  fontnames[0] = {"font":"","text":HtmlEditor_i18n.get("FontName")};
  fontnames[1] = {"font":"\u5b8b\u4f53","text":"\u5b8b\u4f53"};
  fontnames[2] = {"font":"\u9ed1\u4f53","text":"\u9ed1\u4f53"};
  fontnames[3] = {"font":"\u6977\u4f53","text":"\u6977\u4f53"};
  
  var fnPluginHtml = "<div class=\"plugin\"><select>";
  for(var i=0;i<fontnames.length;i++){
    fnPluginHtml+="<option value=\""+fontnames[i]["font"]+"\">"+fontnames[i]["text"]+"</option>"
  }
  fnPluginHtml+="</select></div>";
  var fontnamePlugin = $(fnPluginHtml);
  fontnamePlugin.find("select").bind("change",this,function(event){
    event.data.execCommand("FontName",false,$(this).val());
    //$(this).val("");
  });
  this.plugins["fontname"] = fontnamePlugin;
  
  //fontsize select
  var fontsizes = [];
  fontsizes[0] = {"size":"","text":HtmlEditor_i18n.get("FontSize")}
  fontsizes[1] = {"size":"7","text":"\u4e03\u53f7\u5b57"}
  fontsizes[2] = {"size":"6","text":"\u516d\u53f7\u5b57"}
  fontsizes[3] = {"size":"5","text":"\u4e94\u53f7\u5b57"}
  fontsizes[4] = {"size":"4","text":"\u56db\u53f7\u5b57"}
  fontsizes[5] = {"size":"3","text":"\u4e09\u53f7\u5b57"}
  fontsizes[6] = {"size":"2","text":"\u4e8c\u53f7\u5b57"}
  fontsizes[7] = {"size":"1","text":"\u4e00\u53f7\u5b57"}
  
  var fsPluginHtml = "<div class=\"plugin\"><select>";
  for(var i=0;i<fontsizes.length;i++){
    fsPluginHtml+="<option value=\""+fontsizes[i]["size"]+"\">"+fontsizes[i]["text"]+"</option>"
  }
  fsPluginHtml+="</select></div>";
  var fontsizePlugin = $(fsPluginHtml);
  fontsizePlugin.find("select").bind("change",this,function(event){
    event.data.execCommand("FontSize",false,$(this).val());
    //$(this).val("");
  });
  this.plugins["fontsize"] = fontsizePlugin;
  
  //removeformat button
  var removeformatPlugin = $("<div class=\"plugin\"><img class=\"btn\" src=\""+this.cfg.path+"images/plugin/"+"removeformat.gif\" title=\""+HtmlEditor_i18n.get("RemoveFormat")+"\" alt=\""+HtmlEditor_i18n["RemoveFormat"]+"\" /></div>");
  removeformatPlugin.bind("click",this,function(event){
    event.data.execCommand("RemoveFormat",false,null);
  });
  this.plugins["removeformat"] = removeformatPlugin;
  
  //focecolor button
  
  var smallcolors = new Array("000000","993300","333300","003300","003366","000080","333399","333333","800000","FF6600","808000","008000","008080","0000FF","666699","808080","FF0000","FF9900","99CC00","339966","33CCCC","3366FF","800080","999999","FF00FF","FFCC00","FFFF00","00FF00","00FFFF","00CCFF","993366","C0C0C0","FF99CC","FFCC99","FFFF99","CCFFCC","CCFFFF","99CCFF","CC99FF","FFFFFF");
  var smallcolorPaneHtml = "<div class=\"smallcolorpane\" style=\"display:none\">";
  for(var i=0;i<smallcolors.length;i++){ smallcolorPaneHtml+="<div class=\"color\" style=\"background-color:#"+smallcolors[i]+"\"></div>"; }
  //smallcolorPaneHtml+="<div class=\"morecolor\" style=\"clear:both;text-align:center\">more</div>";
  smallcolorPaneHtml+="</div>";
  
  var smallcolorPane = $(smallcolorPaneHtml);
  /*
  smallcolorPane.find(".color").bind("mouseover",function(event){
    //$(this).css("border","1px solid #ccc");
  });
  smallcolorPane.find(".color").bind("mouseout",function(event){
    //$(this).css("border","1px solid #000");
  });
  */
  
  var focecolorPlugin = $("<div class=\"plugin\"><img class=\"btn\" src=\""+this.cfg.path+"images/plugin/"+"forecolor.gif\" title=\""+HtmlEditor_i18n.get("ForeColor")+"\" alt=\""+HtmlEditor_i18n["ForeColor"]+"\" /></div>");
  focecolorPlugin.bind("mouseover",{"smallcolorPane":smallcolorPane,"editor":this,"plugin":focecolorPlugin},function(event){
    var editorObj = event.data["editor"];
    if($(this).find(".smallcolorpane").length==0){
      $(this).append(event.data["smallcolorPane"]);
    }
    event.data["smallcolorPane"].css("display","");
    event.data["smallcolorPane"].find("div.color").unbind("click");
    event.data["smallcolorPane"].find("div.color").bind("click",{"editor":editorObj},function(event){
      var color = $(this).css("background-color");
      event.data["editor"].execCommand("ForeColor",false,color);
      $(this).parent().css("display","none");
    });
  });
  focecolorPlugin.bind("mouseout",{},function(event){
    $(this).find(".smallcolorpane").css("display","none");
  });
  
  this.plugins["focecolor"] = focecolorPlugin;
  
  
  var backcolorPlugin = $("<div class=\"plugin\"><img class=\"btn\" src=\""+this.cfg.path+"images/plugin/"+"backcolor.gif\" title=\""+HtmlEditor_i18n.get("BackColor")+"\" alt=\""+HtmlEditor_i18n["BackColor"]+"\" /></div>");
  backcolorPlugin.bind("mouseover",{"smallcolorPane":smallcolorPane,"editor":this,"plugin":focecolorPlugin},function(event){
    var editorObj = event.data["editor"];
    if($(this).find(".smallcolorpane").length==0){
      $(this).append(event.data["smallcolorPane"]);
    }
    event.data["smallcolorPane"].css("display","");
    event.data["smallcolorPane"].find("div.color").unbind("click");
    event.data["smallcolorPane"].find("div.color").bind("click",{"editor":editorObj},function(event){
      var color = $(this).css("background-color");
      event.data["editor"].execCommand("BackColor",false,color);
      $(this).parent().css("display","none");
    });
  });
  backcolorPlugin.bind("mouseout",{},function(event){
    $(this).find(".smallcolorpane").css("display","none");
  });
  this.plugins["backcolor"] = backcolorPlugin;
  
  //createlink
  var linkPlugin = $("<div class=\"plugin\"><img class=\"btn\" src=\""+this.cfg.path+"images/plugin/"+"createlink.gif\" title=\""+HtmlEditor_i18n.get("Insert Link")+"\" alt=\""+HtmlEditor_i18n.get("Insert Link")+"\" /></div>");
  linkPlugin.bind("click",this,function(event){
    var linkDlg = new Dialog("htmleditor_createlink");
    linkDlg.showIframe(HtmlEditor_i18n.get("Insert Link"),{"width":320,"height":200,"center":true,"zIndex":100003},event.data.cfg.path+"plugins/createlink.jsp",event.data);
    closeDialog("htmleditor_createlink");
    event.data.execCommand("CreateLink");
  });
  this.plugins["createlink"] = linkPlugin;
  
  //unlink
  var unlinkPlugin = $("<div class=\"plugin\"><img class=\"btn\" src=\""+this.cfg.path+"images/plugin/"+"unlink.gif\" title=\""+HtmlEditor_i18n.get("UnLink")+"\" alt=\""+HtmlEditor_i18n.get("UnLink")+"\" /></div>");
  unlinkPlugin.bind("click",this,function(event){
    event.data.execCommand("UnLink",false,null);
  });
  this.plugins["unlink"] = unlinkPlugin;
  
  //justifyleft
  var justifyleftPlugin = $("<div class=\"plugin\"><img class=\"btn\" src=\""+this.cfg.path+"images/plugin/"+"justifyleft.gif\" title=\""+HtmlEditor_i18n.get("JustifyLeft")+"\" alt=\""+HtmlEditor_i18n.get("JustifyLeft")+"\" /></div>");
  justifyleftPlugin.bind("click",this,function(event){
    event.data.execCommand("JustifyLeft",false,null);
  });
  this.plugins["justifyleft"] = justifyleftPlugin;
  
  //justifycenter
  var justifycenterPlugin = $("<div class=\"plugin\"><img class=\"btn\" src=\""+this.cfg.path+"images/plugin/"+"justifycenter.gif\" title=\""+HtmlEditor_i18n.get("JustifyCenter")+"\" alt=\""+HtmlEditor_i18n.get("JustifyCenter")+"\" /></div>");
  justifycenterPlugin.bind("click",this,function(event){
    event.data.execCommand("JustifyCenter",false,null);;
  });
  this.plugins["justifycenter"] = justifycenterPlugin;
  
  //justifyright
  var justifyrightPlugin = $("<div class=\"plugin\"><img class=\"btn\" src=\""+this.cfg.path+"images/plugin/"+"justifyright.gif\" title=\""+HtmlEditor_i18n.get("JustifyRight")+"\" alt=\""+HtmlEditor_i18n.get("JustifyRight")+"\" /></div>");
  justifyrightPlugin.bind("click",this,function(event){
    event.data.execCommand("JustifyRight",false,null);
  });
  this.plugins["justifyright"] = justifyrightPlugin;
  
  //insertimage
  var insertimagePlugin = $("<div class=\"plugin\"><img class=\"btn\" src=\""+this.cfg.path+"images/plugin/"+"image.gif\" title=\""+HtmlEditor_i18n.get("Insert Image")+"\" alt=\""+HtmlEditor_i18n.get("Insert Image")+"\" /></div>");
  insertimagePlugin.bind("click",this,function(event){
    var imageDlg = new Dialog("htmleditor_insertimage");
    imageDlg.showIframe(HtmlEditor_i18n.get("Insert Image"),{"width":320,"height":480,"center":true},event.data.cfg.path+"plugins/image.html",event.data);
  });
  $(this.editorWindow.document).bind("dblclick",this,function(event){
    if(event.target.tagName.toLowerCase() == "img" && $(event.target).attr("class")!="math"){
      insertimagePlugin.click();
    }
  });
  this.plugins["insertimage"] = insertimagePlugin;
  
  //uploadfile
  var uploadfilePlugin = $("<div class=\"plugin\"><img class=\"btn\" src=\""+this.cfg.path+"images/plugin/"+"file.gif\" title=\""+HtmlEditor_i18n.get("Upload File")+"\" alt=\""+HtmlEditor_i18n.get("Upload File")+"\" /></div>");
  uploadfilePlugin.bind("click",this,function(event){
    var uploadfileDlg = new Dialog("htmleditor_uploadfile");
    uploadfileDlg.showIframe(HtmlEditor_i18n.get("Upload File"),{"width":320,"height":280,"center":true},event.data.cfg.path+"plugins/uploadfile.html",event.data);
  });
  this.plugins["uploadfile"] = uploadfilePlugin;
  
  //inserttable
  var inserttablePlugin = $("<div class=\"plugin\"><img class=\"btn\" src=\""+this.cfg.path+"images/plugin/"+"inserttable.gif\" title=\""+HtmlEditor_i18n.get("Insert Table")+"\" alt=\""+HtmlEditor_i18n.get("Insert Table")+"\" /></div>");
  inserttablePlugin.bind("click",this,function(event){
    var tableDlg = new Dialog("htmleditor_inserttable");
    tableDlg.showIframe(HtmlEditor_i18n.get("Insert Table"),{"width":320,"height":450,"center":true},event.data.cfg.path+"plugins/table.html",event.data);
  });
  this.plugins["inserttable"] = inserttablePlugin;
  
  //sourcecode
  var sourcecodePlugin = $("<div class=\"plugin\"><img class=\"btn\" src=\""+this.cfg.path+"images/plugin/"+"sourcecode.gif\" title=\""+HtmlEditor_i18n.get("Edit HTML Source Code")+"\" alt=\""+HtmlEditor_i18n.get("Edit HTML Source Code")+"\" /></div>");
  sourcecodePlugin.bind("click",this,function(event){
    var sourcecodeDlg = new Dialog("htmleditor_sourcecode");
    sourcecodeDlg.showIframe(HtmlEditor_i18n.get("Edit HTML Source Code"),{"width":320,"height":400,"center":true},event.data.cfg.path+"plugins/sourcecode.html",event.data);
  });
  this.plugins["sourcecode"] = sourcecodePlugin;
  
  //mathformula
  var mathformulaPlugin = $("<div class=\"plugin\"><img class=\"btn\" src=\""+this.cfg.path+"images/plugin/"+"mathformula.gif\" title=\""+HtmlEditor_i18n.get("Insert Math Formula")+"\" alt=\""+HtmlEditor_i18n.get("Insert Math Formula")+"\" /></div>");
  mathformulaPlugin.bind("click",this,function(event){
    var mathformulaDlg = new Dialog("htmleditor_mathformula");
    mathformulaDlg.showIframe(HtmlEditor_i18n.get("Insert Math Formula"),{"width":320,"height":450,"center":true},event.data.cfg.path+"plugins/mathformula.html",event.data);
  });
  
  $(this.editorWindow.document).bind("dblclick",this,function(event){
    if(event.target.tagName.toLowerCase() == "img" && $(event.target).attr("class")=="math"){
      mathformulaPlugin.click();
    }
  });
  
  this.showFormulaExample = function(inputWindow){
    var formulaExampleDlg = new Dialog("htmleditor_formulaexample");
    formulaExampleDlg.showIframe(HtmlEditor_i18n.get("Formula Example"),{"width":500,"height":450,"center":true},this.cfg.path+"plugins/formula_example.html",{"editor":this,"inputWindow":inputWindow});
  }
  this.plugins["mathformula"] = mathformulaPlugin;
  
  //specialchar
  var specialcharPlugin = $("<div class=\"plugin\"><img class=\"btn\" src=\""+this.cfg.path+"images/plugin/"+"specialchar.gif\" title=\""+HtmlEditor_i18n.get("Insert Special Character")+"\" alt=\""+HtmlEditor_i18n.get("Insert Special Character")+"\" /></div>");
  specialcharPlugin.bind("click",this,function(event){
    var specialcharDlg = new Dialog("htmleditor_specialchar");
    specialcharDlg.showIframe(HtmlEditor_i18n.get("Insert Special Character"),{"width":340,"height":300,"center":true},event.data.cfg.path+"plugins/specialchar.html",event.data);
  });  
  this.plugins["specialchar"] = specialcharPlugin;
  
  //emotion
  var emotionPlugin = $("<div class=\"plugin\"><img class=\"btn\" src=\""+this.cfg.path+"images/plugin/"+"emo.gif\" title=\""+HtmlEditor_i18n.get("Insert Emotion")+"\" alt=\""+HtmlEditor_i18n.get("Insert Emotion")+"\" /></div>");
  var emotionPane = $("<ul class=\"emotionPane\" style=\"display:none;\"></ul>");
  emotionPlugin.append(emotionPane);
  emotionPlugin.bind("mouseout",function(){
    emotionPane.css("display","none");
  });
  emotionPlugin.bind("mouseover",{"emotionPane":emotionPane,"editor":this,"plugin":specialcharPlugin},function(event){
    var editorObj = event.data["editor"];
    emotionPane.css("display","");
    
    if(emotionPane.find("li.emoico").length==0){
      emotionPane.empty();
      ajax.doPost("/editor/loadEmotion.do",{},function(data){
        for(var i=0;i<data.emoList.length;i++){
          var emoli = $("<li class=\"emoico\"><img src=\""+data.emoList[i].image+"\" alt=\""+data.emoList[i].explain+"\" /></li>");
          emoli.bind("click",{"emo":data.emoList[i]},function(event){
            editorObj.insertHtml("<img src=\""+event.data["emo"].image+"\" alt=\""+event.data["emo"].explain+"\" />");
            emotionPane.css("display","none");
          });
          emotionPane.append(emoli);
        }
        /*
        event.data["emotionPane"].find("li.emoico").bind("click",{"editor":editorObj},function(event){
          $(this).parent().css("display","none");
        });
        */
      });
    }
  });
  this.plugins["emotion"] = emotionPlugin;
  
  //init toolbar
  var layout = HtmlEditorConfigure.LayoutSetting[cfg.layout];

  for(var i=0;i<layout.length;i++){
    if(layout[i] == "\n"){
      this.editorDiv.find(".htmleditor_toolbar").append("<div class=\"line\"></div>");
    }else if(layout[i] == "|"){
      this.editorDiv.find(".htmleditor_toolbar").append("<div class=\"sep\"><img src=\""+this.cfg.path+"images/plugin/"+"sep.gif\"></div>");
    }else{
      if(this.plugins[layout[i]]){
        this.editorDiv.find(".htmleditor_toolbar").append(this.plugins[layout[i]]);
      }
    }
  }

  
  
  
  this.editorWindow.document.body.editorObj = this;
  this.editorWindow.document.body.onpaste = this._onPaste;
  
  HtmlEditors.Add(this);
  
  var toolbarW = this.editorDiv.find(".htmleditor_toolbar").outerWidth();
  var editorW = this.editorDiv.find(".htmleditor_iframe").outerWidth();
  /*
  if(toolbarW > editorW){
    this.editorDiv.find(".htmleditor_iframe").css("border-top","0");
  }else{
    this.editorDiv.find(".htmleditor_toolbar").css("border-bottom","0");
  }
  */
  if(this.cfg.unique){
    this.editorDiv.find(".htmleditor_toolbar").css("position","absolute");
    var h = this.editorDiv.find(".htmleditor_toolbar").outerHeight()-1;
    this.editorDiv.find(".htmleditor_toolbar").css("margin-top","-"+h+"px");
  
  
    this.bodymousedown = function(event){
      if($(event.target).parents(".htmleditor").length==0 
        && $(event.target).parents(".dialog").length==0
        && $(event.target).attr("class")!="dialog_mask"
        && $(event.target).attr("class")!="dialog_alphaborder"){
        //alert("aaaa");
        if(HtmlEditors.Contains(event.data)){
          //alert(HtmlEditors.Contains(event.data));
          event.data.save();
          event.data.hide();
          return false;
        }
      }else{
        return true;
      }
    }
  
    $("body").bind("mousedown",this,this.bodymousedown);
  }
  
  $(this.bindEle).css("display","none");
  
  this.editorWindow.focus();
}



HtmlEditor.prototype.getSelected = function(){
  var selection = this.editorWindow.document.selection;
  if(selection){
    if (selection.type == "Control") {
      var oControlRange = selection.createRange();
      return oControlRange(0);
    }else if(selection.type == "Text"){
      var oTextRange = selection.createRange();
      return oTextRange.text;
    }else{
      return null;
    }
  }else{
    selection = this.editorWindow.getSelection();
    if(selection.toString()=="" && this.srcElement){
      selection = this.srcElement;
    }
    return selection;
  }
}

HtmlEditor._Html2Text = function(html){
  var oDiv = $("#temp_clipboard").get(0);
  oDiv.innerHTML = html ;
  var text = oDiv.innerText;
  oDiv.innerHTML = "";
  return text;
}

HtmlEditor._convertFormula = function(text){
  var ss = text;
  var oDiv = $("#temp_clipboard").get(0);
  var re1 = /\&lt;math\&gt;([\s\S]+?)\&lt;\/math\&gt;/g;
  ss = ss.replace(re1,function(str,formula){
    formula = HtmlEditor._Html2Text(formula);
    return "<img class=\"math\" alt=\""+formula+"\" src=\""+HtmlEditorConfigure._MathUrl+encodeURI(formula)+"\" />";
  });
  return ss;
}

HtmlEditor.prototype._onPaste = function(){
  
  var html = HtmlEditors.getClipboardHTML();
  
  if(html!=""){  //paste html
    var wre = /<\w[^>]* style=\".*mso-ansi-language:.*; mso-fareast-language:.*; mso-bidi-language:.*\"/gi ;
    var wre1 = /<\w[^>]* class="?MsoNormal"?/gi ;
    if(wre.test(html) || wre1.test(html)){
      html = HtmlEditors.clearWordFormat(html);
    }
    
    //if(HtmlEditor._convertFormula){
        
        html = HtmlEditor._convertFormula(html);
    //}
    
    this.editorObj.insertHtml(html);
    return false ;
  }
  /*
  var re = /\$\$(.*)\$\$/ ;
  var text = clipboardData.getData("Text");
  if(re.test(text)){
    var a = re.exec(text);
    var mf = encodeURI(a[1]);
    var url = this.editorObj._MathUrl+mf;
    
    this.editorObj.insertHtml("<img src=\""+url+"\" style=\"vertical-align:middle\">");
    return false;
  }
  */
  var text = clipboardData.getData("Text");
  
  return true;
}

HtmlEditor.prototype.execCommand = function(cmd,bUserInterface,value){
  this.editorWindow.focus();
  this.editorWindow.document.execCommand(cmd,bUserInterface,value);
  this.editorWindow.focus();
}

HtmlEditor.prototype.sourceModel = function(){
  this.editorWindow.document.body.innerText = getBodyHtml();
}

HtmlEditor.prototype.designModel = function(){
  this.setHtml(this.editorWindow.document.body.innerText);
}

HtmlEditor.prototype.getBodyHtml = function(){
  return this.editorWindow.document.body.innerHTML;  
}

HtmlEditor.prototype.setBodyHtml = function(html){
  this.editorWindow.document.body.innerHTML = html;
}

HtmlEditor.prototype.insertHtml = function(html){
  this.editorWindow.focus();
  var selection = this.editorWindow.document.selection;
  if(selection){
    if (selection.type.toLowerCase() != "none"){
      this.execCommand("Delete");
    }
    this.editorWindow.document.selection.createRange().pasteHTML(html) ;
  }else{//for ff
    //selection =this.editorWindow.getSelection() || this.editorWindow.document.getSelection();
    //if(selection.rangeCount>0){
      //selection.removeAllRanges();
      //alert(selection.getRangeAt(0));
      //selection.getRangeAt(0).insertNode($(html)[0]);
    //}
    //alert(html);
    this.execCommand("insertHTML",false,html);
  }
   
  this.editorWindow.focus(); 
}

HtmlEditor.prototype.save = function(){
  if(this.bindEle.tagName.toLowerCase()=="textarea" || this.bindEle.tagName.toLowerCase()=="input"){
    $(this.bindEle).val(this.getBodyHtml());
  }else{
    $(this.bindEle).html(this.getBodyHtml());  
  }
}

HtmlEditor.prototype.hide = function(){
  $(this.bindEle).css("display","");
  $(this.editorDiv).css("display","none");
}

HtmlEditor.prototype.show = function(){
  $(this.bindEle).css("display","none");
  $(this.editorDiv).css("display","");
  this.editorWindow.focus();
}

HtmlEditor.prototype.destroy = function(){
  $(this.bindEle).css("display","");
  HtmlEditors.Remove(this);
  $(this.editorDiv).remove();
}


$.fn.extend({    
  showEditor:function(){
    if($(this).css("display")!="none"  && $(this)[0].htmleditor){
      $(this)[0].htmleditor.show();
    }
  }
}); 

$.fn.extend({    
  hideEditor:function(){
    if($(this).css("display")=="none"  && $(this)[0].htmleditor){
      $(this)[0].htmleditor.hide();
    }
  }
});


$.fn.extend({    
  startEditHtml:function(cfg){
    if($(this).css("display")!="none"){
      if(!$(this)[0].htmleditor){
        new HtmlEditor($(this)[0],cfg);
      }else{
        $(this)[0].htmleditor.show();
      }
    }
  }
}); 

$.fn.extend({    
  stopEditHtml:function(save){
    var editor = $(this)[0].htmleditor;
    if(save){
      editor.save();
    }
    editor.hide();
  }
});

$(document).ready(function(){
  if($("#temp_clipboard").length==0){
     $("body").append("<div id=\"temp_clipboard\" style=\"width:0px;height:0px;overflow:hidden;\"></div>");
  }
  $("textarea.HtmlEditor").each(function(index,ele){
    var cfg = {};
    if($(this).attr("layout")){
      cfg["layout"] = $(this).attr("layout");
    }
    var editor = new HtmlEditor(ele,cfg);
  });
});