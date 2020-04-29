/*************编辑区textarea弹出层效果开始******************/
/**
显示大文本数据
**/
function showTextA(o){
	var event = window.event;
	var showdiv = document.createElement("div");
	JQ("body").append(showdiv);
	JQ(showdiv).css({"padding":"5px"}).html(JQ(o).nextAll("div").html());
	var pos = mousePosition(event);
	screen_x=document.body.clientWidth;
	screen_y=document.body.clientHeight;
	var x = pos.x;
	var y = pos.y;
	if(pos.x+200>screen_x){
		x = pos.x-(pos.x+200 - screen_x);
	}
	if(pos.y+200>screen_y){
		y = pos.y-(pos.y+200 - screen_y);
	}
	JQ(showdiv).css({"left":x-5,"top":y-5,"position":"absolute","background":"#ffffcc","width":200,"height":200,"overflow":"auto"}).show();
	JQ(showdiv).bind("mouseout mousewheel",function (){
		JQ(showdiv).hide();
	})
}
/*
 textarea得到焦点
 input textarea对象
 val 当前值
 position 光标位置
*/
function focusByPosition(input,val,position){
	try{
		//input.value = val;
		reg1 = new RegExp("<br/>","g");
		input.value = val.replace(reg1,"\r\n");	
		if(arguments.length<3)
			position=input.value.length;
		var txt =input.createTextRange(); 
		txt.moveStart('character',position); 
		txt.collapse(true); 
		txt.select();
	}catch(err){
		
	}
}
JQ(document).ready(function(){
    JQ.fn.showTextArea = function(opts) {
        var ps = JQ.extend({
            parentobj:null,
            min: { width: 0, height: 0 },
            max: { width: JQ(document).width(), height: JQ(document).height() },
            onResize: function() { },
            onStop: function() { }
        }, opts);
       
        var hide=function(e){
        	if(e.srcElement.tagName.toUpperCase()!='TEXTAREA' ){
        		reg1 = new RegExp("\r\n","g");
        		JQ("#"+ps.parentobj.id+"_hid").val($('bigtext').value.replace(reg1,"<br/>"));
        		if($('bigtext').value.length>5){
        			ps.parentobj.value = $('bigtext').value.substring(0,4)+"...";
        		}else{
        			ps.parentobj.value = $('bigtext').value;
        		}
        		JQ('#res').hide();
        		JQ(ps.parentobj).show();
        		ps.parentobj.fireEvent("onblur");
        		JQ(this).unbind('mousedown');
        	}	
        	else
        		return;
        }
        this.parents('body').bind('mousedown',hide);
    }
    //textarea div层页面加载完成后为每个textarea都加载此层
    var textareadiv ="<div class='resizeDiv' id='res'><div class='content'><textarea id='bigtext' rows=10 cols=20></textarea></div></div>";
    //customType 自定义的名称
    JQ("body").find("input:[customType=textarea]").each(function(){JQ(this).after(textareadiv)});
});
//显示textarea层
function tashow(obj,d){
	JQ(obj).hide();
	var resobj=JQ('#res');
	JQ('body').append(resobj);
	textareapos(obj,d);
	JQ('#res').show();
	focusByPosition(document.getElementById('bigtext'),document.getElementById(obj.id+"_hid").value);
	JQ('#res').showTextArea({parentobj:obj});
}

function gettextareaObj(s,d){
    var Obj=typeof(d)=="string"?eval("$("+d+")."+s.id):$(s.id); 
    return Obj;
}
//计算textarea大小和位置
function textareapos(s,d){
    //计算下拉div宽度  
    var Obj = gettextareaObj(s,d);  
    var km = Obj.offsetWidth;
    JQ('#res').width(km);
     var x = 0;
     var y = 0;
     var screen_x = 0;
     var screen_y = 0;
	 for (var el = Obj; el; el = el.offsetParent) {
				x += el.offsetLeft;
				y += el.offsetTop;
	 }
	  y = y+Obj.offsetHeight;
	  screen_x=document.body.clientWidth;
	  screen_y=document.body.clientHeight;
      JQ('#res')[0].style.left = x+12;
      if(y+150>screen_y){
       JQ('#res')[0].style.top = y-133;
      }else{
       JQ('#res')[0].style.top = y+10; 
      }
} 
/*************textarea弹出层结束**************************************/   


/*********autocomplete开始**************/
/**
*参照jquery插件jquery.autocomplete.js，
*刨除用不到的东西，提高性能	
*jiangtingbo
*/
;(function($){
	var ie_version=false,browser=navigator.appName ,b_version=navigator.appVersion,version=b_version.split(";"),trim_Version=version[1].replace(/[ ]/g,"");
	if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE6.0") 
		ie_version = "IE6";
	$.fn.extend({
		//扩展jquery函数实现自动完成 参数-data:来源数组，option:配置参数（可不设置，有默认值）
		tbcomplete: function(data, options) {
			//覆盖综合参数设置
			options = $.extend({"data":data},$.TBcompleter.defaults, options);
			//格式化来源，赋值到参数当中
			options = $.extend(options,{"data":$.TBcompleter.formatData(options,options.data)});
			return this.each(function() {
				new $.TBcompleter(this, options);
			});
		},
		result: function(handler) {
			return this.bind("result", handler);
		}
	});
	//自动完成对象
	$.TBcompleter = function(input, options) {
		var input=$(input),timeout;
		input.attr({"oldval":input.val(),"oldvalid":input.attr("valueid")});
		input.bind("init",function(e){	//初始化
			//input.addClass("ac_loading");
			if(input.val().length<options.minChars)//文本框值未达到最小长度，不触发
				return;
			var opobj=$.TBcompleter.build(options,input.val());
			if(opobj.count==0){
				if(options.mustMatch){
					input.trigger("setback");
				}
				return;
			}
			var offset = input.offset();
			var div=$("<div/>").addClass("ac_results").css({
				top: offset.top + input.get(0).offsetHeight,
				left: offset.left
			}).appendTo($(document.body)).css("visibility","hidden");
			var sel=$("<select/>");
			sel.css("margin","-2px").html(opobj.ophtml).attr("size",opobj.count>options.size?options.size:(opobj.count==1?2:opobj.count)).appendTo(div);
			if(opobj.count==1)
				sel.parent().height(sel.height()-14);
			else
				sel.parent().height(sel.height()+2);
			sel.click(function (e){
				if(options["ieversion"])
					input.bind("blur",input.data("blurhandler"));
				input.trigger("fix");
			}).mousedown(function(e){
				if(options["ieversion"]&&!input.data("blurhandler")){
					input.data("blurhandler",input.data("events")["blur"]).unbind("blur");
					}
				this.setCapture();
			}).mouseup(function(e){
				this.releaseCapture();
			}).find("option:first").attr("selected",true);
			sel.find("option:nth-child(odd)").addClass("option2");
			if(sel.width()<input.width()+5)
				sel.width(input.width()+5);
			input.data("bindsel",sel);
			div.css("visibility","visible")
		}).bind("search",function(e,lastval,keycode){//搜索匹配
			if(input.val().length<options.minChars||(input.val().length==0&&(keycode==8||keycode==46))){//当文本框值长度小于最小长度的时候，移除下拉列表
				input.trigger("clear");
				return;
			}
			if(lastval==input.val()&&keycode!=8&&keycode!=46)//backspace或delete键常常是按着不放
				return;
			var sel=input.data("bindsel"),opobj=$.TBcompleter.build(options,input.val());
			if(sel){
				sel.html(opobj.ophtml).attr("size",opobj.count>options.size?options.size:(opobj.count==1?2:opobj.count)).find("option:first").attr("selected",true);
				if(opobj.count==1)sel.parent().height(sel.height()-14);
				else if(opobj.count==0){
					input.trigger("clear");
					if(options.mustMatch){
						input.trigger("setback");
					}
				}else{
					sel.parent().height(sel.height()+2);
				}	
				sel.find("option:nth-child(odd)").addClass("option2");
				sel.width("");
				if(sel.width()<input.width()+5)sel.width(input.width()+5);
			}		
		}).bind("fix",function(e,nomatch){//确定值
			var sel=input.data("bindsel");
			if(!sel)return;
			//input.val(sel.find("option:[selected='true']").text());
			input.attr("value",sel.find("option:[selected='true']").text()).attr("valueid",sel.val()).removeAttr("valuecode");
			input.attr({"oldval":input.val(),"oldvalid":input.attr("valueid")})
			input.trigger("clear");
			//input.trigger("focus",true);
			input.trigger("result",options["formatObj"][sel.val()]);
		}).keydown(function(event){//按键事件处理
			var sel=input.data("bindsel");
			switch(event.keyCode){
				case 9:
					if(sel)
						return false;
					break;
				case 38://上翻
					if(!sel) return;
					var index=sel.find("option:[selected='true']").attr("index");
					if(index==0)
						return;
					else
						sel.find("option:nth-child("+index+")").attr("selected",true);	
					break;
				case 40://下翻
					if(!sel) return;
					var index=sel.find("option:[selected='true']").attr("index"),len=sel.find("option").length;
					if(index==len-1)
						return;
					else
						sel.find("option:nth-child("+(index+2)+")").attr("selected",true);	
					break;
				case 13://回车
					var sel=input.data("bindsel");
					if(!sel&&!input.val()){//清空值回车
						input.trigger("result",{});
						switchFocus(); //当值为空时执行编辑区的换格方法
						return false;
					}
					input.trigger("fix");
					return false;
				case 27://ESC
					if(input.data("bindsel")){
						input.trigger("clear");
					}
					input.val("").attr("valueid",0).attr({"oldval":input.val(),"oldvalid":input.attr("valueid")});
					input.trigger("result");
					break;
				default:
					if(!input.data("bindsel"))
						setTimeout(function(){
							input.trigger("init");
						},0);
					else{
						clearTimeout(timeout);
						var lastval=input.val(),keycode=event.keyCode;
						timeout=setTimeout(function(){
							input.trigger("search",[lastval,keycode]);
						},options.delay);
					}
					break;
			}
		}).bind("focus",function(e,flag){
			if(!flag&&!options.minChars&&!input.data("bindsel"))
				setTimeout(function(){
					var nowval=input.val();
					if(!nowval){
						input.trigger("init");
					}else{
						if(options.matchContains){
							var re=$.TBcompleter.build(options,input.val());
							if(re["count"]==0)return;
						}
						input.val("").trigger("init");
						if(input.data("bindsel"))
							input.data("bindsel").find("option:[text='"+nowval+"']").attr("selected",true);
						input.val(nowval).select();
					}
				},0);
			return false;
		}).bind("setback",function(e){
			input.val(input.attr("oldval")).attr("valueid",input.attr("oldvalid"));
		}).bind("clear",function(e){
			//如果文本框中值没有和任何一个data中值匹配上移除所有
			//debugger;
			if(input.data("bindsel") && input.val()){
				var flag = true; 
				for(var i =0 ;i<input.data("bindsel")[0].length;i++){
					if(input.data("bindsel")[0][i].text==input.val()){
						flag = false;
						break;
					}
				}
				if(flag){
					input.val("").attr("valueid","").removeAttr("valuecode");
					flag = false;
				}
			}
			if(input.data("bindsel")&&input.data("bindsel").length>0){
				s=input.data("bindsel");
				s.parent().remove();
				s.remove();
				input.removeData("bindsel");
			}
		});	
		if(!input.data("events")["blur"])
			input.bind("blur",function(e,flag){
				input.trigger("clear");
			});
	};
	//select下拉列表组装内容
	$.TBcompleter.build=function(options,oval){
		var ophtml="",count=0;
		if(!oval)
			$.each(options.data,function(i,o){
				var text=o["text"].length>1?o["text"].join("-"):o["text"][0];
				ophtml+=("<option value='"+o["value"]+"'>"+text+"</option>");
				count++;
				if(count==options.max)
						return false;
			});
		else
			$.each(options.data,function(i,o){
				var text=o["text"].length>1?o["text"].join("-"):o["text"][0],flag=false;
				if(options.matchContains)
					flag=text.indexOf(oval)>-1;
				else
					if(options.multipleMatch&&o["text"].length>1)
						$.each(o["text"],function(j,t){
							if(flag=text.indexOf(oval)==0)
								return false;
							flag=t.indexOf(oval)==0;
							if(flag) return !flag;
						});
					else
						flag=text.indexOf(oval)==0;
				if(flag){
					ophtml+=("<option value='"+o["value"]+"'>"+text+"</option>");
					count++;
					if(count==options.max)
						return false;
				}
			});
		return {"ophtml":ophtml,"count":count};
	}
	$.TBcompleter.formatData=function (options,data){
		var formatArr=new Array(),formatObj=new Object();
		$.each(data,function(i,o){
			var f=options.formatItem(o);
			formatArr.push(f);
			formatObj[f["value"]]=f["data"];
		});
		options["formatObj"]=formatObj;
		return formatArr;
	}
	//默认参数
	$.TBcompleter.defaults={
		mustMatch: true,//必须匹配
		matchContains:false,//内容模糊匹配
		multipleMatch:false,//text数组多项分开匹配 matchContains为true时将被忽略
		delay: 200,//延迟
		max: 100,//每次匹配最大值
		size:10,//下拉展现条数
		minChars:1,
		width:false,
		ieversion:ie_version,
		formatItem:function(item){//格式化数组
			return  {"value":item,"text":[item],"data":item}
		}
	}
})(jQuery);
/**********autocomplete结束*************/