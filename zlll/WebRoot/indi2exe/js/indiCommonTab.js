/**
 * 页签查询
 */
function commontabclick(index) {
    var url = ROOT_PATH+"/indi/query/ajaxindex.do?newurl="+ linkName +"&mainmenu="+getparam("mainmenu")+"&submenu="+getparam("submenu");
	inditabclick(index,url)
}

/**
 * 页签查询---分页
 */
function tabPageClick() {
    var url = ROOT_PATH+"/indi/query/ajaxindex.do?newurl="+ linkName +"&mainmenu="+getparam("mainmenu")+"&submenu="+getparam("submenu");
    commontabPageClick(url);
}

function inditabclick(index,url){
  show();
    initTabOnclickBeforQuery();
  var querycondition = getTagCondition($('queryform'));

  var pars = "tabcondition="+tabpage_main.getSelectedTabFilter(index);
  if(querycondition!=null&&querycondition!=""){
	pars = [pars , "&" , querycondition].join('');
  }
  
     var myAjax = new Ajax.Request(url,
             {
                method: 'post',
                parameters: pars,
                onComplete : function(resp){                
                  commontagqueryAfter(resp,index);
                },
             onFailure : function(resp) { //"resp" is just the XMLHttpRequest object
               closeDiv();
               alert("操作失败！");
             }
          } 
           );

}

/**
 * 页签查询---分页
 */
function commontabPageClick(url) {
	show();
	initPage(tmain);
	var querycondition = getTagCondition($('queryform'));
	var pars = "tabcondition=" + tabpage_main.getSelectedTabFilter(tabpage_main.currentSelectedTabIndex); 
	if (querycondition != null && querycondition != "")pars += "&" + querycondition;			   
   	var myAjax = new Ajax.Request(url,
				   	{
					   	 method: 'post',
					   	 parameters: pars, 
					   	 onComplete : function (resp) {					   	 
					   	 	commontagqueryAfter(resp,null);
					   	 },
						 onFailure : function (resp) { 
						 	closeDiv();
						 	alert("操作失败!");
						 }
					});
}

/**
 * 页签查询回调方法
 * @param resp 查询更新数据
 * @param index 查询页数
 */
function commontagqueryAfter(resp, index) {
	eval("var json = " + resp.responseText);
    if (json.statuCode != null && json.statuCode == 100 && json.warnmsg != null && json.warnmsg != ""){
    	alert(json.warnmsg);
    } else {
    	tmain.data = json.result;	 
    	setTabPage(tmain, json);		   
    	tmain.show() ;     
    }
    try {
    	tdetail.data = new Array();
    	tdetail.show();
	}catch(err){
	}
    closeDiv();
}