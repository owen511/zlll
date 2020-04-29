/*************�༭��textarea������Ч����ʼ******************/
/**
��ʾ���ı�����
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
 textarea�õ�����
 input textarea����
 val ��ǰֵ
 position ���λ��
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
    //textarea div��ҳ�������ɺ�Ϊÿ��textarea�����ش˲�
    var textareadiv ="<div class='resizeDiv' id='res'><div class='content'><textarea id='bigtext' rows=10 cols=20></textarea></div></div>";
    //customType �Զ��������
    JQ("body").find("input:[customType=textarea]").each(function(){JQ(this).after(textareadiv)});
});
//��ʾtextarea��
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
//����textarea��С��λ��
function textareapos(s,d){
    //��������div���  
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
/*************textarea���������**************************************/   


/*********autocomplete��ʼ**************/
/**
*����jquery���jquery.autocomplete.js��
*�ٳ��ò����Ķ������������	
*jiangtingbo
*/
;(function($){
	var ie_version=false,browser=navigator.appName ,b_version=navigator.appVersion,version=b_version.split(";"),trim_Version=version[1].replace(/[ ]/g,"");
	if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE6.0") 
		ie_version = "IE6";
	$.fn.extend({
		//��չjquery����ʵ���Զ���� ����-data:��Դ���飬option:���ò������ɲ����ã���Ĭ��ֵ��
		tbcomplete: function(data, options) {
			//�����ۺϲ�������
			options = $.extend({"data":data},$.TBcompleter.defaults, options);
			//��ʽ����Դ����ֵ����������
			options = $.extend(options,{"data":$.TBcompleter.formatData(options,options.data)});
			return this.each(function() {
				new $.TBcompleter(this, options);
			});
		},
		result: function(handler) {
			return this.bind("result", handler);
		}
	});
	//�Զ���ɶ���
	$.TBcompleter = function(input, options) {
		var input=$(input),timeout;
		input.attr({"oldval":input.val(),"oldvalid":input.attr("valueid")});
		input.bind("init",function(e){	//��ʼ��
			//input.addClass("ac_loading");
			if(input.val().length<options.minChars)//�ı���ֵδ�ﵽ��С���ȣ�������
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
		}).bind("search",function(e,lastval,keycode){//����ƥ��
			if(input.val().length<options.minChars||(input.val().length==0&&(keycode==8||keycode==46))){//���ı���ֵ����С����С���ȵ�ʱ���Ƴ������б�
				input.trigger("clear");
				return;
			}
			if(lastval==input.val()&&keycode!=8&&keycode!=46)//backspace��delete�������ǰ��Ų���
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
		}).bind("fix",function(e,nomatch){//ȷ��ֵ
			var sel=input.data("bindsel");
			if(!sel)return;
			//input.val(sel.find("option:[selected='true']").text());
			input.attr("value",sel.find("option:[selected='true']").text()).attr("valueid",sel.val()).removeAttr("valuecode");
			input.attr({"oldval":input.val(),"oldvalid":input.attr("valueid")})
			input.trigger("clear");
			//input.trigger("focus",true);
			input.trigger("result",options["formatObj"][sel.val()]);
		}).keydown(function(event){//�����¼�����
			var sel=input.data("bindsel");
			switch(event.keyCode){
				case 9:
					if(sel)
						return false;
					break;
				case 38://�Ϸ�
					if(!sel) return;
					var index=sel.find("option:[selected='true']").attr("index");
					if(index==0)
						return;
					else
						sel.find("option:nth-child("+index+")").attr("selected",true);	
					break;
				case 40://�·�
					if(!sel) return;
					var index=sel.find("option:[selected='true']").attr("index"),len=sel.find("option").length;
					if(index==len-1)
						return;
					else
						sel.find("option:nth-child("+(index+2)+")").attr("selected",true);	
					break;
				case 13://�س�
					var sel=input.data("bindsel");
					if(!sel&&!input.val()){//���ֵ�س�
						input.trigger("result",{});
						switchFocus(); //��ֵΪ��ʱִ�б༭���Ļ��񷽷�
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
			//����ı�����ֵû�к��κ�һ��data��ֵƥ�����Ƴ�����
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
	//select�����б���װ����
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
	//Ĭ�ϲ���
	$.TBcompleter.defaults={
		mustMatch: true,//����ƥ��
		matchContains:false,//����ģ��ƥ��
		multipleMatch:false,//text�������ֿ�ƥ�� matchContainsΪtrueʱ��������
		delay: 200,//�ӳ�
		max: 100,//ÿ��ƥ�����ֵ
		size:10,//����չ������
		minChars:1,
		width:false,
		ieversion:ie_version,
		formatItem:function(item){//��ʽ������
			return  {"value":item,"text":[item],"data":item}
		}
	}
})(jQuery);
/**********autocomplete����*************/