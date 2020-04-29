function initGotoForm(){
  var html = "<form id=\"gotoForm\" name=\"gotoForm\" action=\"\" method=\"get\">";
  html+="</form>";
  jQuery("body").append(html);
}


function jumpTo(url,method,params,target){
  if(!method){method="get"}
  if(!params){params = {};}
  if(!target){target="_self";}
  if(jQuery("#gotoForm").length==0){
    initGotoForm();
  }
  jQuery("#gotoForm").attr("action",url);
  jQuery("#gotoForm").attr("method",method);
  jQuery("#gotoForm").attr("target",target);
  var hiddenInputs = "";
  for(var varName in params){
    hiddenInputs += "<input type=\"hidden\" name=\""+varName+"\" />";
  }
  jQuery("#gotoForm").html(hiddenInputs);
  jQuery("#gotoForm input[type=hidden]").each(function(){
    var name = jQuery(this).attr("name");
    jQuery(this).val(params[name]);
  });
  document.forms["gotoForm"].submit();
  if(window.event){
    event.returnValue=false;
  }
    
}