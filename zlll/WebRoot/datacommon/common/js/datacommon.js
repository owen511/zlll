//-------------------------------------------一些公用的方法

function StringBuffer(){
  var strs=[];
  this.append = function(str){
    strs.push(str);
    
    return this;
  };
  
  this.toString = function(split){
    if(split==undefined){
      split = "";
    }
    return strs.join(split);
  };
}

//保留小数位
var ToFixed = function(value,decimal) {
	var len = Math.pow(10, decimal);

	if (parseFloat(value) == value) {
		value = Math.round(value * len) / len;
	}
	if (value.toString().indexOf(".") != -1) {
		var cellarr = new Array();
		cellarr = value.toString().split(".");
		if (cellarr[1].length < decimal) {
			var cz = Math.pow(10, decimal - cellarr[1].length);
			var decw = cz.toString().substring(1, cz.length);
			value = value.toString() + decw.toString();
		}
	}
	if (value != null && value != "" && value.toString().indexOf(".") == -1) {
		if (value != "NaN") {
			var dec = len.toString().substring(1, len.length);
			if (!dec)
				value = value;
			else
				value = value + "." + dec;
		} else {
			value = "0." + dec;
		}
	}
	return value;
}

//-------------------------------------------------------------------

if(DataCommon == null) { var DataCommon = {}}

//公用事件处理函数
(function(window){
	
	function EventTarget(){
		this.handlers = {};
	}
	
	EventTarget.prototype = {
		constructor : EventTarget,		
		
		addHandler : function(type,handlerId, handler){
			(this.handlers[type] == undefined) && (this.handlers[type] = {});  
			
			if(typeof this.handlers[type][handlerId] == "undefined"){
				this.handlers[type][handlerId] = function(){};
			}
			
			if(typeof handler != "function"){
				eval(" _eventHandler = "+handler);
			}
			
			this.handlers[type][handlerId] = _eventHandler;
		},
		
		fireHandler: function(type,handlerId,context){
			if(typeof this.handlers[type][handlerId] == "function"){
			
				return this.bind(this.handlers[type][handlerId], (context || this ))();	
			}
		},
		
		removeHandler : function(type,handlerId){
			if(!handlerId){
				delete this.handlers[type];
			}
			else{
				delete this.handlers[type][handlerId];
			}
		},
		
		bind : function(fn, context){
			return function(){
				return fn.apply(context,arguments);
			}
		}
	};
	
	window.DataCommon.EventTarget = new EventTarget();
})(window);

//-------------------------------------------------------------------

//创建按钮工具     可传入buts:array
DataCommon.topbutton = function(config){
	if(this instanceof DataCommon.topbutton){
		
		return new DataCommon.topbutton(config);
	}
	
	var prefixBtn = "dc_topbutton_";
	var button = new Object();
	var buts = config.buttons || [];
	var serverId = config.serverId;
	var disabledBtn = {},displayBtn = {}, notDisabledBtn = {};
	
	var eventType = "topbutton";
	
	var defbtndef = "<span><span id='"+prefixBtn+"$id' title='$title' class='$className' ondcaction='$action' onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0);\">$title</a></span></span>";
	
	var showbutton = function(obj){
		var temp = defbtndef.replace('$id', obj.name).replace('$title', obj.title).replace('$title', obj.title).replace('$action', obj.action).replace('$className', obj.className);
		//console.info(temp);
		return temp;
	}
	
	var throttle = function(func,context){
		clearTimeout(context.timeId);
		context.timeId = setTimeout(function(){
			
			func.call(context);
		},200);
	}
	
	var defp = '<span>｜</span>';
	
	this.timeId = null;
	
	//生成按钮区域
	button.draw = function(divId){
		if (!divId) {
			alert("请输入按钮展示的divId");
			return;
		}
		this.divId = divId;
		var bu = this;
		
		document.getElementById("template_main").onresize = function(){
			
			throttle(initBtn,bu);
		}
		
		registerEvent();
	}	
	
	//!----以下是处理框口缩小时按钮出现下拉框
	var Postion = {
		"top": function(e){
			var offset = e.offsetTop;
			if (e.offsetParent != null) 
				offset += this.top(e.offsetParent);
			return offset;
		},
		"left": function(e){
			var offset = e.offsetLeft;
			if (e.offsetParent != null) 
				offset += this.left(e.offsetParent);
			return offset;
		}
	};
	
	//加载多余按钮的显示下拉框
	function drawDropList(elements){
		var dropDiv = document.getElementById('moreButtonDiv');
		if (dropDiv == null) {
			dropDiv = document.createElement('DIV');
			dropDiv.id = 'moreButtonDiv';
			dropDiv.style.border = '#99bbe8 solid 2px';
			dropDiv.style.width = '80px';
			dropDiv.style.visibility = 'hidden';
			dropDiv.style.backgroundColor = '#CFCFCF';
			dropDiv.style.position = 'absolute';
			dropDiv.className = 'budget_moreDiv';
			
			document.body.appendChild(dropDiv);
		}
		
		dropDiv.innerHTML = elements.join('');
	}
	
	var registerEvent = function(){
		
		$("#"+button.divId).live("click",function(e){
			var $t = $(e.target), _span = null;
			
			if(!$t.is("span") && !$t.is("a")) return;
			
			if(!$t.is("[ondcaction]")){
				
			 	_span = $t.parents("span[ondcaction]")[0];
			}
			else{
				_span = $t[0];
			}
			
			//如果置灰则不触发事件
			if(!_span || $("#"+_span.id).attr("disabled") == "disabled"){
				return;
			}
			
			DataCommon.EventTarget.fireHandler(eventType+"-"+serverId,_span.id,window);
		});
	}
	
	var initBtn = function(){
		$("#" + button.divId + "").width($("#template_main").width());
			
		var tWidth = 0;
		var blankWidth = $("#" + button.divId + "").width() - 20;
		
		var html = [],dropContent = [];
		html.push("<div>");
		
		var _span = null;
		for (var i = 0, n = buts.length; i < n; i++) {
			var temp = "";
		
			if (typeof(buts[i]) == 'string' && buts[i] == "p") {
				tWidth += 10;
				temp = defp;
			}
			else {
				tWidth += 70;
				temp = showbutton(buts[i]);
				
				_span = $(temp).find("span[ondcaction]")[0];
				DataCommon.EventTarget.addHandler(eventType+"-"+serverId,_span.id,_span.ondcaction);
			}
			
			if(tWidth >= blankWidth){
				dropContent.push(temp);
			}
			else{
				html.push(temp);
			}
		}
		html.push('</div>');
		
		if(dropContent.length > 0){
			html.push("<span id='moreMenuBTN' style=\"position:absolute; \"><button class=\"budget_morebtn\"></button></span>");
			drawDropList(dropContent);
		}
			
		document.getElementById(button.divId).innerHTML = html.join('');
				
		if(document.getElementById('moreMenuBTN') != null){
			var dropDiv = document.getElementById('moreButtonDiv');
			
			document.getElementById('moreMenuBTN').onmouseover = function(){
				dropDiv.style.top=(Postion.top(this)+26)+'px';
				var leftPX = Postion.left(this);
				if(leftPX > (document.body.clientWidth-102)){
					leftPX = document.body.clientWidth-102;
				}
				dropDiv.style.left = leftPX+'px';
				dropDiv.style.visibility = 'visible';
			}
			
			document.getElementById('moreMenuBTN').onmouseout = function(){
				setTimeout(function(){
					function moveFN(){
						if(!dropDiv.contains(window.event.srcElement)){
							dropDiv.style.visibility='hidden';
							document.body.detachEvent("onmousemove",moveFN);
						}
					}
					document.body.attachEvent("onmousemove",moveFN);
				},100);
			}
		}
		
		for(var disb in disabledBtn){
			
			button.setDisabled(disb,disabledBtn[disb]);
		}
		
		for(var disp in displayBtn){
			
			button.setDisplay(disp,displayBtn[disp]);
		}
	}
	
	//隐藏按钮
	button.setDisplay = function(name, bol){
		name = (name instanceof Array) ? name : [name];
		
		for(var i=0,n=name.length; i<n; i++){
				
			var btnId = prefixBtn + name[i];
			
			bol ? $("#"+btnId).parent().css("display","none") : $("#"+btnId).parent().css("display","line");
			
			displayBtn[name[i]] = bol;
		}
	}
	
	button.refresh = function(){
		initBtn();
	}
	
	//添加按钮
	button.add = function(params){
		if(params instanceof Array){
			
			buts = buts.concat(params);
		}
		else{
			buts.push(params);
		}
		
		this.refresh();
	}
	
	//置灰按钮
	button.setDisabled = function(name,bol){
		if(arguments.length == 0){
			
			name = [];
			for(var j=0,k=buts.length; j<k; j++){
				
				buts[j].name && name.push(buts[j].name);
			}
			
			bol = true;
		}
		
		name = (name instanceof Array) ? name : [name];
		
		for(var i=0,n=name.length; i<n; i++){
			
			if(notDisabledBtn[name[i]]) continue;
			
			var btnId = prefixBtn + name[i];
			$("#"+btnId).attr("disabled",bol);
			
			disabledBtn[name[i]] = bol;
		}
		
		notDisabledBtn = {};
	}
	
	button.setNotDisabledBtn = function(array){
		array = (array instanceof Array) ? array : [array];
		
		for(var i=0,n=array.length; i<n; i++){
			
			notDisabledBtn[array[i]] = true;
		}
	}
	
	button.exeFunction = function(buttonName){
		if(buttonName == undefined) return;
		
		var id = prefixBtn+""+buttonName;
		
		return DataCommon.EventTarget.fireHandler(eventType+"-"+serverId,id,window);
	}
	
	//重写事件
	button.regEvent = function(name, func){
		if(typeof func == "function"){
			
			func = "("+func+")()";
			
			for(var i=0,n=buts.length; i<n; i++){
			
				if(buts[i].name == name){
					buts[i].action = func;
					
					this.refresh();
					break;
				}
			}
		}
		else{
			alert("按钮<"+name+">注册的事件不是一个函数，请检查！");
			
		}
	}
	
	return button;
}

//--------------------------------------------------------------------------

//创建分页函数
DataCommon.Pageable = function(config){
	if(!(this instanceof DataCommon.Pageable)){
		
		return new DataCommon.Pageable(html); 
	}
	
	var queryData = function(start,length){
		
		//不在分页中处理数据
		alert(start+"--"+length);
	}
	
	var beforeQueryData = function(){
		
		return false;
	}
	
	var page = new Object();
	page = {
		html : "",
		serviceId : "datacommon_excelbase_service",
		queryData : queryData,
		beforeQueryData : beforeQueryData
	};
	
	$.extend(page, config); config = null;
	
	var context = $(page.html || "");
	 
	page.version = "1.0";
	page.type = "pageable"; 
	
	page.draw = function(divId){
		var divObj = document.getElementById(divId);

		if (!divId || !divObj) {
			alert("请输入分页区域展示的divId无效！");
			return;
		}
		
		$(divObj).html(context);
		page.divId = divId;
		
		registerEvent();
	}
	
	var registerEvent = function(){
		
		context.unbind("unclick").bind("click",function(e){
			var el = $(e.target);
		    if(el.is("img[name=btn_page]")){
		       var start = el.attr("startNum"), length = context.find("#currperpage").val();
		       
			   if(start == "-1") start = 0;
			   
			   var res = page.beforeQueryData(start, length);
			   if(res == false){ return;}
			   
			   var html = page.queryData(start, length);
			   context = $(html || "");
			   
			   page.draw(page.divId);
		    }
			
			if(el.is("img[name=btn_pagerJumpTo]")){
				var length = context.find("#currperpage").val();
				var pageNum = context.find("#currPageStart").val();
				
				if(!$.isNumeric(length)){
					alert("每页条数不为数字");
					return;
				}
				
				if(!$.isNumeric(pageNum)){
					alert("跳转页数不为数字");
					return;
				}
				
				var count = parseInt(context.attr("totalcount"),10);
				var maxPage = parseInt(context.attr("maxPageCount"),10);
				//if(parseInt(length,10)<=0 || parseInt(length,10) > count){
				//	alert("请输入合法条数");
				//	return;
				//}
				
				if(parseInt(length,10) > 3000){
					alert("最大可输入3000条");
					return;
				}
				
				if(parseInt(pageNum,10)<0 || parseInt(pageNum,10)>maxPage){
					alert("请输入合法页数");
					return;
				}
				
				if(pageNum == 0) pageNum = 1;
				
				var start = ((pageNum-1)*length);
				
				var res = page.beforeQueryData(start, length);
			    if(res == false){ return;}
				
			    var html = page.queryData(start, length);
			    context = $(html || "");
			   
			    page.draw(page.divId);
			}
		});
		
	}
	
	page.setClass = function(className){
		
		className && context.removeClass().addClass(className);
	}
	
	page.getJumpButton = function(){
		return document.getElementById("btn_pagerJumpTo");
	}
	
	page.refresh = function(){
		this.getJumpButton().click();
	}
	
	return page;
}
