if(Ext == null) var Ext={};
Ext.BLANK_IMAGE_URL = '../images/s.gif';
/**
ext��ܵ���չ�����ļ�Ϊ���İ���������̬���أ�ģ������Ĺ��ܡ�

API˵����

�����ռ䣺Ext.lt
����˵����
getNextSeqValue()  ���ظ�ҳ���е�һ��Ψһ��������������Сֵ1000
regKeyEvent(char,fn,ctrl,shift) ע����ϼ��¼���char��ʾҪ��ص���ĸ�����������ִ�Сд��ctrl��shift��ʾ�Ƿ�Ҫͬʱ��ס���̵�ctrl����shift��
clone(Object)	 �����Զ���
createComponent(function(){ return cmpinstance}) ����������󷽷���Ҫ�󷵻ض������ʵ��draw��resize����



aninmation(HTMLElement)  ���Զ���ʵ����,�����������������Զ���ʵ�ַ�����
    return HTMLElement.setAnimatProperty(proerty,start,end) ���ö������Լ���ʼֵ�ͽ���ֵ
                      .play(time);                          ִ�ж�����timeΪ����ִ�е�ʱ��
                      .stop();                              ��ֹ����ִ�У�����ֱ�Ӹ�ֵΪ����ֵ





�����ռ䣺Ext.lt.RCP
    ʵ�����������Զ�̷���ķ��������Կ�ݼ�'ctrl+shift+r'
����˵����
call(server, m, parameters, callbakfn, falsefun)
asyncall(server, m, parameters);
asynserver(serverid, m, parameters)
asynserverNotEncode(serverid, m, parameters)  ���Բ������б���
server(serverid, m, parameters, callbakfn, falsefun)
script( serverid, m, parameters, callName)




�����ռ䣺Ext.lt.util
    ����JavaScript�ĳ��ù��߷���
����˵����
setText(String)		�������е��ı����͵���������
fnbind(fn,Object)		��������this����ָ��Object
clone(Object)		����һ��ֵ����ֻ�ܸ��ƶ�����ַ��������֡��������ԡ������Ͱ󶨵��¼����ܶ���
setUserData(key,value) IE ���ش洢��Userdata
getUserData(key)       IE ���ش洢ȡֵ
removedata(key)        IE ���ش洢ɾ��




�����ռ䣺Ext.lt.HTML
		����HTML���÷�������չ
		��HTMLԪ������������롢�Ƴ������ʱ����ʽ���ƣ�������
			���������ʽ overclass overstyle
			�������ʽ clickclass clickstyle
			������ʽ     switchstyle switchclass  �������һ�Σ�������ʽ��Ϊ����ָ�����ݣ��ٴε���Ժ���ʽ�ָ�
			������       switchgroup һ�鿪����ֻ����һ�����ش򿪣�����һ�����غ�ͬһ���е����������Զ��رգ�������onclickʱ��
			����״̬     switch=on   ��������Ϊonʱ����Ԫ��Ĭ��ʹ�ô�״̬��ʽ

����˵����
positionedOffset(element)  ����ָ��Ԫ����ҳ���е�λ�á�Ϊ����ʹ�ã�����ֵ�ṹΪ���顢�������ģʽ������ֵ��������Ϊ����[��߾࣬�ϱ��]��Ҳ���Դӷ���ֵ�����л�ȡleft��top����
mark(element,boolean:flag)     ����IFRAME����ָ������flag Ĭ��Ϊtrue����flagΪtrueʱ����ָ������flaseʱ�ָ�
setStyle(element,csstext)      ����CSS��ʽ���ö�����ʽ���� setStyle(divid,'width:100%;border:1px red solid')
drag(cfg:{})               ��HTML����������ק����������Ϊ��ק��������Ϣ��
 cfg={element:HTMLElement, ��Ҫ��ק��HTMLԪ��
      holder:boolean,      �Ƿ���ʾռλ����
      x:int,               ������ק�����X�����λ��
      y:int,               ������ק�����Y�����λ��
      onend:function,      ����ק����ʱִ�еķ���
      onstart:function     ����ק��ʼʱִ�еķ���
      dragel:HTMLElement   ��ק����
      }    



�����ռ䣺Ext.lt.dateutil
    ʵ�ָ������ڹ���
����˵����
YYMMDD(dateobj)    ����'YYYY��MM��DD��' �����ĸ�ʽ
weekday(dateobj)   �������ĵ����ڼ�
solarDay(dateobj)  ����ũ���ͽ���
holiday(dateobj)   ����������������
chinaholiday(dateobj)  �����й���ͳ��������




�����ռ䣺Ext.lt.layout
		�򵥲��ֹ���
ʹ�ò��ֹ���ʱ��Ҫ��HTMLԪ�������Ӳ�������layout���ԡ��磺<div layout="{h:{fit:-65,min:400}}"></div>
��layout����������HTMLԪ�صĿ��������ã�������Ϣ����Json��ʽ������㲼��Ԫ�ص���������Դ��ڿɼ����Ĵ�С�����õ�
min:��ʾԪ�ص���Сֵ��������߶Ȼ����С�����ֵʱ����ʹ�����ֵ
fit:������������Ԫ�ؿ��ȡ�
		'auto' - �Զ���Ӧ���ȣ�ʹ���ϼ�Ԫ�صĿ��ȣ��߶ȣ���ȥ�����ֵ�Ԫ�صĿ��ȣ��߶ȣ������ƽ���ֵ�Ԫ�����ж��fit:auto��ֻ�е�һ����Ч
		 true  - �Զ������������
		 ����  - Ӧ�øÿ���
		 ����  - ���ϼ�����Ԫ�ص����ԵĲ�ֵ
��ҳ���С���ı�󣬲�����ʽ��0.2��֮��ʼӦ�á�����ɲ��ּ������ҳ�淢��"layout","endlayout"��Ϣ������ҳ���������ͨ��Ext.lt.message.hook("layout","endlayout",function(){})����ȡ��Ϣ
���磺
����һ��div����С����������ڿɼ����� 
	<div layout="{h:{fit:true},w:{fit:true}}"></div>
����һ��div���߶�Ϊ���ڿɼ������С��ȥҳͷ�߶ȣ�100px��
	<div layout="{h:{fit:-100}}"></div>
����һ��div������Ϊ���ڿɼ�����ȥ���˵�����150px�����ң����Ȳ���С��600px
	<div layout="{w:{fit:-150,min:600}}"></div>


�����ռ䣺Ext.lt.message
		ҳ����Ϣ��������ҳ����������ͨ����Ϣ�໥ͨѶ����Ϣ���ƿ��������֮�䱣�������״̬�µ�ʵ�ָ�������Ч����

���ԣ�
	assistfn:function()	������������չ������������alert������ͬ������HTML���벢���ɵ�ϵͳ��ʾ�������У�ͨ��Ext.lt.message.hook('assistfn',helpobj)ʵ�ֻص���
����˵����
	send(src,type,msg)  ����һ����Ϣ��src��Ϣ��Դ  type��Ϣ����  msg��Ϣ���ݣ���Ϣ���ݿ��������֡����ڡ��ַ��������󣬽ṹ����Ϣ�����߹涨������Ҫ�ṩ��ϸ�Ľṹ˵������Ϣʹ���߸��ݸ�˵��ʹ��
	hook(src,type,fn)   ����һ����Ϣ��src��Ϣ��Դ  type��Ϣ����  fn��Ϣ�����Ļص�����������Ϊ������Ϣ��msg�������ں����п����޸�msg�����ݣ����һ�Ӱ�����ظ���Ϣ�����������
	unhook(src,type,fn) ȡ����Ϣ���أ�src��Ϣ��Դ  type��Ϣ����  fn��Ϣ�����Ļص�����
	alert(msg,{title:,assist:,})	�滻�����ȱʡ��ʾ����ԭ����ʾ��Ļ��������ӱ�����ƺ͸����������ṩ��չ�ӿڿ��޸ķ���������






Ext.lt.cookie
	add(name,value,expires,path,domain,secure)  ����һ��cookie
	del(name)                                   ɾ��cookie
	get(key)									��ȡһ��cookie





 */
 
var N=null;
if(Ext.lt==null){
Ext.lt = new function(){
	var _seq=1000;  //��������
	var _keymap={}; //��ݼ�����
	var _keymapTime={key:'',time:new Date()}; //��ݼ�����
	var _zIndex=99999;	
	
	// ����ģʽ��Ĭ��Ϊ��ʾģʽʹ�ñ��������ļ�����Ϊ����ģʽ������server�������ü��ط�����������
	this.demomode=false;
	// ��ʾģʽ��ģ�⽻��������,keyΪԶ�̵��õ�URL
	this.demodatamap=[];
	
	// ����������·������ϵͳΪ��ʾģʽʱ�ò�����Ч������Ϊ����ģʽʱ�����������ļ����ʽ��Զ�׷�ӷ�������ַ
	this.serverUrl='';
	// �������ÿͻ��˿�ܸ�Ŀ¼λ�ã�Ĭ��/ltext
	this.ltextpath='/ltext';
	
	// ie�汾��
	var _msie=navigator.userAgent.toLowerCase().match(/msie (\d+)\./);
	this.ieversion=_msie?_msie[1]:7;
	this.documentmode=document.documentMode;
	
	// �洢�Ѽ���js���ļ�����
	this.jslib={};
	
	// ���峣��NULL
	N=null;   
	
	var _onload_fn =[];
	
	this.onload=function(fn){
		_onload_fn.push(fn)
	}
	
	// �����¼���/������������ݸ����汾�����
	this.bindEvent=function(el,en,fn,useCapture){
		var tagel=el;
		if(fn.bindel==null) fn.bindel=[];
		fn.bindel.push(tagel);

		if(window.attachEvent){
			if(en.indexOf('on')!=0) en='on'+en;
			// IE�����
			tagel.attachEvent(en,fn);
			fn.unbindEvent=function(tagel,en){
				if(tagel==null){
					// ��������¼���
					for(var i=0,l=this.bindel.length;i<l;i++) this.bindel[i].detachEvent(en,this);
				}
				else{
					tagel.detachEvent(en,this);
				}
			}
		}
		else{
			if(en.indexOf('on')==0) en=en.substring(2);
			tagel.addEventListener(en,fn,useCapture==true);
			fn.unbindEvent=function(tagel,en){
				if(tagel==null){
					// ��������¼���
					for(var i=0,l=this.bindel.length;i<l;i++) this.bindel[i].removeEventListener(en,this,useCapture==true);
				}
				else{
					tagel.removeEventListener(en,this,useCapture==true);
				}
			}
			
		}
	};
	
	this.unbindEvent=function(el,en,fn,useCapture){
		var tagel=el;
		if(fn.unbindEvent==null){
			if(window.attachEvent){
				if(en.indexOf('on')!=0) en='on'+en;
				tagel.detachEvent(en,this);
			}
			else{
				if(en.indexOf('on')==0) en=en.substring(2);
				tagel.removeEventListener(en,fn,useCapture==true);
			}
		}
		else{
			fn.unbindEvent(el,en);
		}
	}
	
	this.bindEvent(window,'onload',function(){
		if(this.isonload==false)return;
		for(var i=0,l=_onload_fn.length;i<l;i++){
			_onload_fn[i]();
		}
	});
	this.runOnload=function(){
		for(var i=0,l=_onload_fn.length;i<l;i++){
			_onload_fn[i]();
		}
	}

	
	
	/**
	 * ��ҳ���м����µ�js��
	 * ����ҳ���ʼ��ʾʱ������Ҫ�������е�js�ļ�����ˣ���ʹ�õ�js���ļ�ͨ���ķ�����̬���ص�ҳ����
	 */
	this.loadLib=function(libname, fn){
    if(this.jslib.libname == null){
      var scpt = document.createElement("SCRIPT");
      scpt.type = "text/javascript";
      scpt.src = './ltext/extends/'+libname+'.js';
      scpt.onreadystatechange = function(){
      	if (this.readyState == "complete") { 
      		Ext.lt.jslib.libname = true;
      		// ����ִ��js��ĳ�ʼ������
   			  eval(libname+"_init()");
      		
      		if(Ext.lt.isFunction(fn)){
      			fn();
      		}
      	}
      }
      document.getElementsByTagName("HEAD")[0].appendChild(scpt);
    }
    else{
    	if(Ext.lt.isFunction(fn)){
        fn();
      }
    }
	};
	
	/**
	 * ���ָ����js���Ƿ񱻼���
	 */
	this.hasJsLib=function(libname){
		return (this.jslib.libname)?true:false;
	};
	
	/**
	 * ����ϵͳ�л�ȡ����url
	 * ��Ϊdemoϵͳ����ʱ������ݣ��������ʵϵͳ�������Ext.lt.serverUrl�޸����ӣ�ֱ�Ӵ���ʽ�����ϻ�ȡ����
	 */
	this.encodeUrl=function(url){
	    // ��������Ѿ�ָ�������������ֱ�ӷ���
	    if(url.toLowerCase().indexOf('http') ==0){
		   return url;
	    }
	    
	    if(!Ext.lt.demomode){
		   if(url.substring(0,1) == '/'){
		       return Ext.lt.serverUrl+url;
		   }
		   else{
		       return Ext.lt.serverUrl+'/'+url;
		   }
	    }
	    return url;
	};
	
	/**
	 * ����ģ���õ�Զ�̵��÷���
	 */
	this.createModule=function(modulename,moduleparams){
		modulerul = Ext.lt.serverUrl+'/module/'+modulename;
		return function(fn){
			Ext.Ajax.request({
				url: modulerul,
				success: fn,
				failure: function(){
			  	alert("error");	
				},
				params: moduleparams
			});
		}
	}
	
	this.getNextSeqValue=function(){return _seq++};
	this.getNextZIndex=function(){return _zIndex++};
	this.apply=function(p,c){for(var n in c){p[n]=c[n]};return p};
	this.isArray=function(object) {return object && object.constructor === Array;};
	this.isFunction=function(e){return typeof(e)=='function'};
	this.isDate=function(e){return Object.prototype.toString.apply(e)==='[object Date]'}
	this.isRegexp=function(e){return e.compile!=null}
	this.isString=function(e){return typeof(e)=='string'}
	this.exception=function(){};
	this.log=function(){};
	
	this.clone=function(obj){
		if(obj==null) return null;
		eval('var tmp='+Object.toJSON(obj));
		// �������е��������Ը��Ƶ���¡������
		Ext.lt.apply(tmp,obj);
		return tmp;
	}

	// ��������
	this.errlib=new function(){
			var errs=[]
			addErr=function(e){
				if(!e.code){i=i/0}
				if(!e.msg){i=i/0}
				errs.push(e);
			}
			this.loadErr=function(){
				
			}
	};
	
	this.bindEvent(document,'onkeypress',function(){
		var nD=new Date();
		if((nD-_keymapTime.time)>1000){
			_keymapTime.key='';
		}
		_keymapTime.key=_keymapTime.key+"_"+event.keyCode
		_keymapTime.time=nD;
		var en=_keymap['press'+_keymapTime.key];
		if(en==null) return true;
		if(event.ctrlKey==en.ctrl && event.shiftKey==en.shift){
			en.fn();
		}
	});

	
	// ע����ϼ��¼���ctrl��shift��ʾ����ctrl������shift����ϣ���ĸ�������ִ�Сд
	this.regKeyEvent=function(k,fn,pressctrl,pressshift){
		if(fn==null || k==null) return false ;
		if(k.length<1) return false;
		var charcodes=['','',''];
		for(var i=0;i<k.length;i++){
			var _k=k.charAt(i);
			charcodes[0]=charcodes[0]+"_"+(_k.toUpperCase().charCodeAt(0));
			charcodes[1]=charcodes[1]+"_"+(_k.toLowerCase().charCodeAt(0));
			charcodes[2]=charcodes[2]+"_"+(_k.toUpperCase().charCodeAt(0)-64);
		}
		_keymap['press'+charcodes[0]]={'fn':fn,'ctrl':(pressctrl==true),'shift':(pressshift==true)}
		_keymap['press'+charcodes[1]]={'fn':fn,'ctrl':(pressctrl==true),'shift':(pressshift==true)}
		_keymap['press'+charcodes[2]]={'fn':fn,'ctrl':(pressctrl==true),'shift':(pressshift==true)}
		if(pressctrl){
			if(k=='v') _keymap['press22']={'fn':fn,'ctrl':(pressctrl==true),'shift':(pressshift==true)}
		}
	}

	var _logger=[]
	window.errlog=function(msg){
		// ������ջ��rio�Ǹ�
		var stack=[],caller=errlog.caller;
		while(caller!=null){
			stack.push(caller.toString('Function'));
			caller=caller.caller;
		alert(caller)
		}
		_logger.push({'Date':new Date(),'msg':msg,'stack':stack})		
	}
	
	
	this.createComponent=function(cmpfunction){
		return function(cfg){
			var newcmp=new cmpfunction(cfg);
			// ���newcmp�����Ƿ����draw��resize�ȷ���
			if(Ext.lt.isFunction(newcmp.draw) && Ext.lt.isFunction(newcmp.resize)){
				// �����������з���������ͨ��fnbind�����������з�����thisָ��ָ��newcmp
				for(var fn in newcmp){
					if(Ext.lt.isFunction(newcmp[fn])){
						Ext.lt.util.fnbind(newcmp[fn],newcmp);
					}
				}
				
				// ���������������װ�������
				return new Ext.lt.component(newcmp);
			}
			else{
				alert("�޷�������������û��ʵ��draw������resize����");
				return;
			}
		}
	}

};


Ext.lt.cache=new function(){
	
	this.setData=function(key,v){
		if(key==null) return null;
		Ext.lt.util.setUserData(key,v);
	}
	this.getData=function(key){
		if(key==null) return null;
		var v =  Ext.lt.util.getUserData(key);
		return v;	
	}
	this.removeData=function(key){
		if(key==null) return null;
		Ext.lt.util.removeUserData(key);
	}
}

// �����ָ�ʽ������չ������Ϊunit:int������λ��dot:intС��λ��qfw:boolean�Ƿ���ʾǧ��λ
String.prototype.toNumber=function(dot, qfw, unit){
	if(unit==null || isNaN(unit)) unit=1;
	if(dot==null || isNaN(dot)) dot=2;
	if(qfw==null) qfw=true;
	var ins =this;
	
	if(qfw){ //����ǧ��λparseFloat�������ֵ��׼ȷ��
		ins = this.replace(/,/g,'');
	}
	
	var v=parseFloat(ins,10);
	if(isNaN(v)) v=0;	
	
	v=v/unit;
	
	if(v*Math.pow(10,dot)>Math.pow(10,16)){
		alert('�������С��λ���ƣ��޷�����');
		return v;	
	}
	
	//0�����⴦��
	if(v==0){
		
		if(dot==0){
			return '0';
		}
		var ret='0.';
		for(var i=0;i<dot;i++){
			ret+='0';
		}
		return ret;	
	}
	// �ж��Ƿ�Ϊ����
	var neg=v<0
	if(neg) v*=-1;
	// �������� dot����С��0ʱ������������Ŀ���
	if(dot>-1){
		v=(v+(0.5*Math.pow(0.1, dot)))
	}
	v+=''
	var p=v.lastIndexOf('.');
	if(p==-1){
		p=v.length;
		v+=".";
	}
	
	// ����ǧ��λ
	if(qfw){
		if(p>3){
			var re = /(\d)(\d{3}[,\.])/;
			while (re.test(v)){
				v = v.replace(re, "$1,$2");
				p++;
			}
		}
	}
	
	// ����С��λ
	if(dot==0){
		v=v.substring(0,p);
	}
	else if((p+dot+1)<v.length){
		v=v.substring(0,(p+dot+1));
	}
	
	return neg?'-'+v:v;
}
// md5 lp 20130403
String.prototype.md5 = function(string) {
	var x = Array();
	var k, AA, BB, CC, DD, a, b, c, d;
	var S11=7, S12=12, S13=17, S14=22;
	var S21=5, S22=9 , S23=14, S24=20;
	var S31=4, S32=11, S33=16, S34=23;
	var S41=6, S42=10, S43=15, S44=21;
	var rotateLeft = function(lValue, iShiftBits) {
		return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
	}
	var addUnsigned = function(lX, lY) {
		var lX4, lY4, lX8, lY8, lResult;
		lX8 = (lX & 0x80000000);
		lY8 = (lY & 0x80000000);
		lX4 = (lX & 0x40000000);
		lY4 = (lY & 0x40000000);
		lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
		if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
		if (lX4 | lY4) {
			if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
			else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
		} else {
			return (lResult ^ lX8 ^ lY8);
		}
	}
	
	var F = function(x, y, z) {
		return (x & y) | ((~ x) & z);
	}
	
	var G = function(x, y, z) {
		return (x & z) | (y & (~ z));
	}
	
	var H = function(x, y, z) {
		return (x ^ y ^ z);
	}
	
	var I = function(x, y, z) {
		return (y ^ (x | (~ z)));
	}
	
	var FF = function(a, b, c, d, x, s, ac) {
		a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
		return addUnsigned(rotateLeft(a, s), b);
	};
	
	var GG = function(a, b, c, d, x, s, ac) {
		a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
		return addUnsigned(rotateLeft(a, s), b);
	};
	
	var HH = function(a, b, c, d, x, s, ac) {
		a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
		return addUnsigned(rotateLeft(a, s), b);
	};
	
	var II = function(a, b, c, d, x, s, ac) {
		a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
		return addUnsigned(rotateLeft(a, s), b);
	};
	
	var convertToWordArray = function(string) {
		var lWordCount;
		var lMessageLength = string.length;
		var lNumberOfWordsTempOne = lMessageLength + 8;
		var lNumberOfWordsTempTwo = (lNumberOfWordsTempOne - (lNumberOfWordsTempOne % 64)) / 64;
		var lNumberOfWords = (lNumberOfWordsTempTwo + 1) * 16;
		var lWordArray = Array(lNumberOfWords - 1);
		var lBytePosition = 0;
		var lByteCount = 0;
		while (lByteCount < lMessageLength) {
			lWordCount = (lByteCount - (lByteCount % 4)) / 4;
			lBytePosition = (lByteCount % 4) * 8;
			lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
			lByteCount++;
		}
		lWordCount = (lByteCount - (lByteCount % 4)) / 4;
		lBytePosition = (lByteCount % 4) * 8;
		lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
		lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
		lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
		return lWordArray;
	};
	
	var wordToHex = function(lValue) {
		var WordToHexValue = "", WordToHexValueTemp = "", lByte, lCount;
		for (lCount = 0; lCount <= 3; lCount++) {
			lByte = (lValue >>> (lCount * 8)) & 255;
			WordToHexValueTemp = "0" + lByte.toString(16);
			WordToHexValue = WordToHexValue + WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2);
		}
		return WordToHexValue;
	};
	
	var uTF8Encode = function(string) {
		string = string+"";
		string = string.replace(/\x0d\x0a/g, "\x0a");
		var output = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) {
				output += String.fromCharCode(c);
			} else if ((c > 127) && (c < 2048)) {
				output += String.fromCharCode((c >> 6) | 192);
				output += String.fromCharCode((c & 63) | 128);
			} else {
				output += String.fromCharCode((c >> 12) | 224);
				output += String.fromCharCode(((c >> 6) & 63) | 128);
				output += String.fromCharCode((c & 63) | 128);
			}
		}
		return output;
	};
	string = uTF8Encode(this);
	x = convertToWordArray(string);
	a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
	for (k = 0; k < x.length; k += 16) {
		AA = a; BB = b; CC = c; DD = d;
		a = FF(a, b, c, d, x[k+0],  S11, 0xD76AA478);
		d = FF(d, a, b, c, x[k+1],  S12, 0xE8C7B756);
		c = FF(c, d, a, b, x[k+2],  S13, 0x242070DB);
		b = FF(b, c, d, a, x[k+3],  S14, 0xC1BDCEEE);
		a = FF(a, b, c, d, x[k+4],  S11, 0xF57C0FAF);
		d = FF(d, a, b, c, x[k+5],  S12, 0x4787C62A);
		c = FF(c, d, a, b, x[k+6],  S13, 0xA8304613);
		b = FF(b, c, d, a, x[k+7],  S14, 0xFD469501);
		a = FF(a, b, c, d, x[k+8],  S11, 0x698098D8);
		d = FF(d, a, b, c, x[k+9],  S12, 0x8B44F7AF);
		c = FF(c, d, a, b, x[k+10], S13, 0xFFFF5BB1);
		b = FF(b, c, d, a, x[k+11], S14, 0x895CD7BE);
		a = FF(a, b, c, d, x[k+12], S11, 0x6B901122);
		d = FF(d, a, b, c, x[k+13], S12, 0xFD987193);
		c = FF(c, d, a, b, x[k+14], S13, 0xA679438E);
		b = FF(b, c, d, a, x[k+15], S14, 0x49B40821);
		a = GG(a, b, c, d, x[k+1],  S21, 0xF61E2562);
		d = GG(d, a, b, c, x[k+6],  S22, 0xC040B340);
		c = GG(c, d, a, b, x[k+11], S23, 0x265E5A51);
		b = GG(b, c, d, a, x[k+0],  S24, 0xE9B6C7AA);
		a = GG(a, b, c, d, x[k+5],  S21, 0xD62F105D);
		d = GG(d, a, b, c, x[k+10], S22, 0x2441453);
		c = GG(c, d, a, b, x[k+15], S23, 0xD8A1E681);
		b = GG(b, c, d, a, x[k+4],  S24, 0xE7D3FBC8);
		a = GG(a, b, c, d, x[k+9],  S21, 0x21E1CDE6);
		d = GG(d, a, b, c, x[k+14], S22, 0xC33707D6);
		c = GG(c, d, a, b, x[k+3],  S23, 0xF4D50D87);
		b = GG(b, c, d, a, x[k+8],  S24, 0x455A14ED);
		a = GG(a, b, c, d, x[k+13], S21, 0xA9E3E905);
		d = GG(d, a, b, c, x[k+2],  S22, 0xFCEFA3F8);
		c = GG(c, d, a, b, x[k+7],  S23, 0x676F02D9);
		b = GG(b, c, d, a, x[k+12], S24, 0x8D2A4C8A);
		a = HH(a, b, c, d, x[k+5],  S31, 0xFFFA3942);
		d = HH(d, a, b, c, x[k+8],  S32, 0x8771F681);
		c = HH(c, d, a, b, x[k+11], S33, 0x6D9D6122);
		b = HH(b, c, d, a, x[k+14], S34, 0xFDE5380C);
		a = HH(a, b, c, d, x[k+1],  S31, 0xA4BEEA44);
		d = HH(d, a, b, c, x[k+4],  S32, 0x4BDECFA9);
		c = HH(c, d, a, b, x[k+7],  S33, 0xF6BB4B60);
		b = HH(b, c, d, a, x[k+10], S34, 0xBEBFBC70);
		a = HH(a, b, c, d, x[k+13], S31, 0x289B7EC6);
		d = HH(d, a, b, c, x[k+0],  S32, 0xEAA127FA);
		c = HH(c, d, a, b, x[k+3],  S33, 0xD4EF3085);
		b = HH(b, c, d, a, x[k+6],  S34, 0x4881D05);
		a = HH(a, b, c, d, x[k+9],  S31, 0xD9D4D039);
		d = HH(d, a, b, c, x[k+12], S32, 0xE6DB99E5);
		c = HH(c, d, a, b, x[k+15], S33, 0x1FA27CF8);
		b = HH(b, c, d, a, x[k+2],  S34, 0xC4AC5665);
		a = II(a, b, c, d, x[k+0],  S41, 0xF4292244);
		d = II(d, a, b, c, x[k+7],  S42, 0x432AFF97);
		c = II(c, d, a, b, x[k+14], S43, 0xAB9423A7);
		b = II(b, c, d, a, x[k+5],  S44, 0xFC93A039);
		a = II(a, b, c, d, x[k+12], S41, 0x655B59C3);
		d = II(d, a, b, c, x[k+3],  S42, 0x8F0CCC92);
		c = II(c, d, a, b, x[k+10], S43, 0xFFEFF47D);
		b = II(b, c, d, a, x[k+1],  S44, 0x85845DD1);
		a = II(a, b, c, d, x[k+8],  S41, 0x6FA87E4F);
		d = II(d, a, b, c, x[k+15], S42, 0xFE2CE6E0);
		c = II(c, d, a, b, x[k+6],  S43, 0xA3014314);
		b = II(b, c, d, a, x[k+13], S44, 0x4E0811A1);
		a = II(a, b, c, d, x[k+4],  S41, 0xF7537E82);
		d = II(d, a, b, c, x[k+11], S42, 0xBD3AF235);
		c = II(c, d, a, b, x[k+2],  S43, 0x2AD7D2BB);
		b = II(b, c, d, a, x[k+9],  S44, 0xEB86D391);
		a = addUnsigned(a, AA);
		b = addUnsigned(b, BB);
		c = addUnsigned(c, CC);
		d = addUnsigned(d, DD);
	}
	var tempValue = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
	return tempValue.toLowerCase();
}
String.prototype.compare=function(s){
	return this.localeCompare(s);
}
Number.prototype.compare=function(i){
	if(this==i) return 0;
	return this>i?1:-1;
}
Date.prototype.compare=function(d){
	if(this==d) return 0;
	return this>d?1:-1;
}

// ���ö����ʽ�������ģ�壬����ģ����׷��out���������ú���ģ����ʽ�����ַ���
// ��������ģ��
var _regfn={}
Object.setTemplate=function(obj,tmp){
	var _tmp=tmp;
	
	var _getRegFn=function(field){
		var regx=_regfn[field]
		if(regx==null){
			regx=RegExp("#"+field,"ig");
			_regfn[field]=regx
		}
		return regx;
	}
	
	
	obj.out=function(){
		var o=_tmp,fs=[],fi,l;
		for(var f in this){
			l=f.length
			if(l!=null && fs[l]==null){
				fs[l]=[];
			}
			fs[l].push(f);
		}
		
		for(var i=fs.length-1;i>-1;i--){
			fi=fs[i];
			if(fi==null) continue;
			for(var j=fi.length;j>-1;j--){
				f=fi[j]
				if(this[f]==null){
					o=o.replace(_getRegFn(f),'');
				}else if(typeof(this[f])!='function' && typeof(this[f])!='object'){
					o=o.replace(_getRegFn(f),this[f]);
				}
			}
		}
		
		return o;
	}
}

// ��չ����toArray����
Array.prototype.toArray=function(){return this}
Array.prototype.indexOf=function(elem){
	for (var i=0, length=this.length; i<length; i++)
		if (this[i]==elem)return i;
	return -1;
}
// ��չ������շ���
Array.prototype.clear=function(){
	this.splice(0,this.length);
}
// ɾ�������е�ָ������
Array.prototype.remove=function(obj){
	var c=0
	for(var i=0,l=this.length;i<l;i++){
		if(this[i]==obj){
			this.splice(i--,1);
			c++;
			l--;
		}
	}
	return c;
}


// ��������׷����Ԫ��
Array.prototype.add=function(arr){
	for(var i=0,l=arr.length;i<l;i++) this.push(arr[i]);
}
// ��������׷����Ԫ��
Array.prototype.insert=function(obj,i){
	this.splice(i, 0, obj)
}
// ������ true����false����Ĭ������
Array.prototype.sortArray=function(asc){
	var nullsize=this.remove(null);
	this._sort(asc);
	if(nullsize>0){
		var nullarr=[];
		for(;nullsize>0;nullsize--) {
			if(asc==false){
				this.splice(this.length,0,null);
			}
			else{
				this.splice(0,0,null);
			}
		}
	}
}
// ������ true����false����Ĭ������
Array.prototype._sort=function(asc){
	var cmpvalue=asc!=false?1:-1
	var size=this.length;
	// shell����
	for (var step = size >> 1; step > 0; step >>= 1){
		for (var i = 0; i < step; ++i){
			for (var j = i + step; j < size; j += step){
				var k = j, value =this[j];
				
				while (k >= step && this[k - step]!=null && (this[k - step].compare(value))==cmpvalue){
					this[k]=this[k - step]
	   				k -= step;
					}					
				this[k]=value;
			}
		}
	}
}

// ɸѡ����������֧��ͨ����Ǻš��ʺ�
Array.prototype.filter=function(filter){
	var t=typeof(filter);
	if(t=='string'){
		return this._Stringfilter(filter);
	}
	if(t=='object'){
		return this._Objectfilter(filter);
	}
	if(t=='array'){
		
	}
	return this;
}
// ��ֹ��JQuery��ͻ
Array.prototype.dofilter=function(filter){
	var t=typeof(filter);
	if(t=='string'){
		return this._Stringfilter(filter);
	}
	if(t=='object'){
		return this._Objectfilter(filter);
	}
	if(t=='array'){
		
	}
	return this;
}



Array.prototype._Stringfilter=function(filter){
	if(filter==null) return this
	var buf=[],regstr=eval("/(\\d+):"+filter.replace(/\*/ig,'.*').replace(/\?/ig,'.')+"/ig");
	for(var i=0,l=this.length;i<l;i++) buf.push(i+':'+this[i]+'\n')
	
	buf=buf.join('').match(regstr)
	if(buf==null) return [];
	buf=buf.join('\n').replace(regstr,'$1').split('\n');
	
	for(var i=0,l=buf.length;i<l;i++){
		buf[i]=this[buf[i]];
	}
	
	return buf
}

Array.prototype._Objectfilter=function(filter){
	if(filter==null) return this
	var buf=[];
	
	var regstr=["/(\\d+):"],fn=['function datafunction(d,i){return [i,":"'];
	for(var k in filter){
		var v=filter[k];
		if(v==null) continue;
		if(!Ext.lt.isArray(v)) v=[v];
		var matchstr=[],ms;
		for(var i=0,li=v.length;i<li;i++){
			matchstr.push(v[i].replace(/\*/ig,'.*').replace(/\?/ig,'.'));
		}
		regstr.push('@@',k,"##(",matchstr.join('|'),")@#");
		fn.push(',"@@',k,'##",d["',k,'"],"@#"');
	}
	fn.push('].join("")}');
	regstr.push('/ig');
	regstr=eval(regstr.join(''));
	eval(fn.join(''));
	
	
	for(var i=0,l=this.length;i<l;i++) buf.push(datafunction(this[i],i));
	
	buf=buf.join('\n').match(regstr);
	if(buf==null) return [];
	buf=buf.join('\n').replace(regstr,'$1').split('\n');
	
	for(var i=0,l=buf.length;i<l;i++){
		buf[i]=this[buf[i]];
	}
	
	return buf
}

// ����ɾ���ո�ķ���
String.prototype.trim = function(){
	return this.replace(/(^\s*)|(\s*$)/g,"");
}

// �������ģ��
Ext.lt.out={};
Ext.lt.out.template=function(template){
	var _template=template;
	var _cmp={};
	var _fields=[];
	var _formatfn=null; // ��ʽ���������
	
	// ��������ֶμ��ϻ��ֶ���
	_cmp.setField=function(fs){
		if(!Ext.lt.isArray(fs)) fs=[fs];
		for(var i=0,l=fs.length;i<l;i++){
			_fields.push(fs[i]);
			_fields[fs[i]]=RegExp("#"+fs[i],"ig")
		}
		// ���ֶγ�������
		var t=[],len,o;
		for(var i=0,l=_fields.length;i<l;i++){
			o=_fields[i];
			if(o==null)return;
			len=o.length
			if(len!=null && t[len]==null){
				t[len]=[];
			}
			t[len].push(o);
		}
		
		// ���ֶ������ɳ�������������
		var f=[],fi;
		for(var i=t.length-1;i>-1;i--){
			fi=t[i];
			if(fi==null) continue;
			f=f.concat(fi);
		}
		_fields.clear();
		_fields.add(f);
		
		// �����ֶ��������ģ�������������
		var useredfield=[],outtext=[_template.replace(/(")/g,'\\\"')],r;
		function splitTemplate(f){
			var t=[],field='#'+f,size=outtext.length;
			for(var i=0;i<outtext.length;i++){
				t=outtext[i].split(field);
				if(t.length>1){
					outtext[i]=t[0];
					for(var m=1;m<t.length;m++){
						outtext.splice(i+m,0,t[m]);
						useredfield.splice(i+m-1,0,f);
					}
					i+=m.length-1;
				}
			}
		}
		for(var i=0,l=_fields.length;i<l;i++){
			splitTemplate(_fields[i]);
		}
		
		var outfn=['function templateoutfunction(d){ return ['];
		outfn.push('"',outtext[0],'"');
		for(var i=1,l=outtext.length;i<l;i++){
			outfn.push(',d["',useredfield[i-1],'"],"',outtext[i],'"');
		}
		outfn.push('].join("")}');
		eval(outfn.join(''));
		_formatfn=templateoutfunction;
	}
	
	
	_cmp.out=function(o){
		if(_formatfn!=null){
			return _formatfn(o);
		}
		// �����������
		var str=_template+'',f
		for(var i=0,l=_fields.length;i<l;i++){
				f=_fields[i]
				if(o[f]==null){
					str=str.replace(_fields[f],'');
				}else if(typeof(o[f])!='function' && typeof(o[f])!='object'){
					str=str.replace(_fields[f],o[f]);
				}
		}
		return str;
	}
	
	return _cmp;
}


// ���ݼ�����
Ext.lt.recordset=function(obj){
	var _datas=[];
	    _datas.size=0;
	var _datas_all=[];
	    _datas_all.size=0
	var _columnNames=[];      // ��������
	var lt=Ext.lt;
	var _datatable;  // ���ݱ������
	var _asc=true;   // ��������falseʱΪ��������
	var _total=-1;
	var dataSort=false;
	var _prejson=obj==null?false:true==obj.prejson; // �Ƿ�Ԥ��������JSON��
	var _version=(obj!=null&&obj.ver!=null)?obj.ver:'1.1';
	var _filter=[]; 	// ���ݹ��˵��ڼ���
	var _locationposition=0;
	var maxlength=null;
	var sortobj=null;
	var compress=obj==null?2:(obj.compress==null?2:obj.compress);
	var _groupcolumn=null;
	var _groupdata=[];
		
	// �������ݹ����������ṹΪ{key1:[value1,value2,��],key1:[value1,value2,��],��}
	function _setFilter(filterset){
		// ���ԭ�й�������
		_filter=[];
		if(filterset!=null){
			for(var key in filterset){
				var values=filterset[key];
				// ���������������
				_filter.push(key);
				for(var i=0,l=values.length;i<l;i++){
					_filter['_k'+key+'_v'+values[i]]=true
				}
			}
		}
		// ��������
		_filterData();
	}
	
	function _filterData(){
		if(_filter.length==0){
			_datas=_datas_all;
			_setSortId()
			return;
		}
		
		// ������ݼ�
		_datas=[];
		// ��֤���ݣ��������ݲ������ݼ���
		for(var i=0,n=_datas_all.length;i<n;i++){
			for(var j=0,l=_filter.length;j<l;j++){
				if(_filter['_k'+_filter[j]+'_v'+_datas_all[i][_filter[j]]]){
					// ����ƥ���������ƥ�����������ӵ���ʾ������
					_datas.push(_datas_all[i]);
					break;
				}
			}
		}
		_datas.size=_datas.length;
		_setSortId()
	}
	
	function _clearFilter(){
		_setFilter();
	}
			
	function _addData(d){
	
		// �������ݸ���
		_datas_all.push(d);
		_datas_all.size++;
		_fix(d);
	}
	
	function _fix(d){
		// Ԥ������Json
		if(_prejson && d._jsonstring==null){
			var _temp=[];
			for (var i=0,l=_columnNames.size;i<l;) {
				_cn=_columnNames[i++]
				if(d[_cn]!=null)	_temp.push(_cn+":"+d[_cn]);
			}
			d._jsonstring='{'+_temp.join(',')+'}';
		}
		
		// �ڲ������ֶ�
		if(d._locationposition==null) d._locationposition=_locationposition++;
	}
	
	function _size(){
		return _datas.size;
	};

	function _getData(n){
		// �����Ϊ��������
		return _datas[n];
	}
			
	function _insertData(i,d){
		var _newdatas=_datas_all.slice(0,i+1);
		var _newdatae=_datas_all.slice(i+1);
		
		// ��׷�����ݽ���Ԥ����
		for(var i=0,l=d.length;i<l;i++) _fix(d[i]);
		
		_datas_all=_newdatas.concat(d,_newdatae);
		_datas_all.size=_datas_all.length;
		_filterData();
		return ;
	}
	
	function _delData(fn,i){
		var _newdatas=[];
		_newdatas.size=0;
		
		var tmp,p=0;
		if(i==null)i=0;
		for(n=0,l=_datas_all.length;n<l;n++){
			tmp=_datas_all[n];
			if(n>=i){
				if(!fn(tmp)){
					_newdatas.push(tmp);
					_newdatas.size++
				}
			}
			else{
				_newdatas.push(tmp)
				_newdatas.size++
			}
		}
		_datas_all=_newdatas;
		_datas_all.size=_datas_all.length;
		_filterData();
	}
	
	function _delRow(rownum){
		if(!Ext.lt.isArray(rownum)) rownum=[rownum];
		var start=0,end=0,newdatas=[];
		
		// ɾ��ָ�����ݲ�ƴ��������
		for(var i=0,l=rownum.length;i<l;i++){
			end=rownum[i]
			newdatas=newdatas.concat(_datas_all.slice(start, end));
			start=end+1;
		}
		newdatas=newdatas.concat(_datas_all.slice(start));
		
		_datas_all=newdatas;
		_datas_all.size=_datas_all.length;
		_filterData();
	}
	
	function _setData(n,data){
		//_datas[n]=data
		_datas_all[n].push(data);
		_filterData();
	}
	
	function _swap(i,j,arr){
		if(arr==null) arr=_datas;
		var d=arr[i];
		arr[i,arr[j]];
		arr[j,d];
	}
	
	// ������
	function _sortArray(s,e,arr){
	
		//���л�ĩβ������
		var totval=null;
		if(_total>-1){
			totval=arr[_total];
			arr[_total]=null;
			arr.remove(null);
		}
		
		arr.sortArray(_asc);
		
		//���л�ĩβ������
		if(_total==0){
			arr=[].concat(totval, arr);
		}else if(_total>0){
			arr=arr.concat(totval);
		}
		//----------
		return arr;	
	}
	
	function _sortWithColumn(s,e,cname){

		var size=_size();
		/*
		// ��������
		if (s == null) s = 0;
    if (e == null) e = size - 1;
    if (s >= e) return;
    _swap((s + e) >> 1, e);
    var index = s - 1;
    
    var d2=_getData(e);
    for (var i = s; i <= e; ++i){
    	var d1=_getData(i);
			if (d1[cname] <= d2[cname]){
				_setData(i,_getData(++index));
				_setData(index,d1);
			}
    }
        
    _sortWithColumn(s, index - 1,cname);
    _sortWithColumn(index + 1, e,cname);
		*/
		
		// shell����
			for (var step = size >> 1; step > 0; step >>= 1){
				for (var i = 0; i < step; ++i){
					for (var j = i + step; j < size; j += step){
						var k = j, data=_getData(j), value =data[cname];
						
						while (k >= step && (_getData(k - step)[cname]>value)==_asc){
							_setData(k,_getData(k - step));
							k -= step;
						}
						
						_setData(k,data);
					}
				}
			}
	}
	
	var _setColNames=function(cs){
		if(lt.isArray(cs)){
			_columnNames=[];
			for(var i=0,j=cs.length;i<j;i++){
				_columnNames[i]=cs[i];
				_columnNames[cs[i]]=i
			}	
			_columnNames.size=_columnNames.length;
		}
	}
	
	// Ϊ��ʾ��������������ID��������Ϊ_sortid
	function _setSortId(){
		for(var i=0,l=_datas.size;i<l;i++){
			_datas[i]['_sortid']=i;
		}
	}
	
	// ������ʼ�����ݼ��������ݼ�����ת��Ϊ����ṹ
	var start = new Date(),log=[];
	if(obj!=null && obj.columns!=null && obj.datas!=null){
		_setColNames(obj.columns);
		var m=0,n=obj.columns.length;
		var t,o,v,sv;
		var seqdata=obj.seqdata;
		var seqdatamap=obj.seqdatamap==null?{}:obj.seqdatamap;
		
		if(seqdata!=null){
			for(var i=0,j=seqdata.length;i<j;i++){
				seqdatamap['@'+i]=seqdata[i];
			}
		}

		log.push(new Date()-start);
		var l=0;
		
		if(compress==1 || _prejson==true){
			// ����Map��ʽѹ����prejson��ʽѹ���Ľ�ѹ
			var json=[],datas=obj.datas;
			for(var i=1,j=datas.length;i<j;i++){
				json.push(datas[i].join(''));
			}
			_datas_all=eval('(['+json.join(',')+'])');
			_datas_all.size=_datas_all.length;
			for(var i=0,j=_datas_all.length;i<j;i++) _datas_all[i]['_jsonstring']=json[i]
		}/*
		else if(compress==2){
			for(var i=0,j=obj.datas.length;i<j;i++){
				t=obj.datas[i],o={_locationposition:null};
				for(m=0;m<n;m++) if(t[m]!=null) o[_columnNames[m]]=t[m];
				_addData(o);
			}
		}*/
 		else if(compress==2){
			// ���ɴ�������ĺ���
			var fnbuffer=['var buildobjectfunction=function(d){return {"_locationposition":_locationposition++']
			for(m=0;m<n;m++) fnbuffer.push(',"',_columnNames[m],'":d[',m,']');
			fnbuffer.push('}}')
			eval(fnbuffer.join(''));
			for(var i=0,j=obj.datas.length;i<j;i++){
				_addData(buildobjectfunction(obj.datas[i]));
			}
		}
		_locationposition=_datas_all.length;
		
		maxlength=obj.ml;
		log.push(l);
	}
		
	log.push(new Date()-start);


	_filterData();
	
	// �����˳�ʱ�ͷ��ڴ�
	if(window.attachEvent){
		window.attachEvent('onunload',function(){
			_datas=null;
			_columnNames=null;
		});
	}
	else{
		window.addEventListener('unload',function(){
			_datas=null;
			_columnNames=null;
		});
	}
  // ���з���
	return new function(){
		this.version="1.0";
		this.type="recordset";
		this.setTotal=function(v){
			if(v>=0)
			_total=v
		}
		// �������ݼ�����
		this.size=function(){return _size()};
		// �����ݼ���׷������
		this.setData=function(d,i){
			if(d==null) return;
			if(i==null){
				if(lt.isArray(d)){for(var n=0,l=d.length;n<l;n++){_addData(d[n]);}}
				else{_addData(d);}
			}
			else{
				if(!lt.isArray(d)){d=[d]}
				var data;
				for(var n=0,l=d.length;n<l;n++){
					data=_datas[i+n];
					if(data==null){
						d[n]['_locationposition']=_locationposition++;
					}
					else{
						d[n]['_locationposition']=data['_locationposition'];
					}
					_datas[i+n]=d[n]
				}
			}
			_filterData();
			if(sortobj!=null&&sortobj.col!=null&&i==null&&dataSort){
				this.sort(sortobj.col,sortobj.asc,sortobj.fn);
			}
			if(_datatable!=null) _datatable.reflash();
		}
		// �����ݼ��е�ָ��λ��׷������
		this.addData=function(d,i){
			if(i==null) i=this.size();
			if(lt.isArray(d)){
				//����_locationposition;
				for(var loop=0,end=d.length;loop<end;loop++){
					d[loop]._locationposition=null;
				}
				_insertData(i,d)
			}else{
				d._locationposition=null;
				_insertData(i,[d])
			}
			
			if(_datatable!=null) _datatable.reflash();
		}
		this.join=function(dt,ip){
			if(ip==null) ip=this.size();
			// ���������ݼ���׷���ֶ���
			var cs=dt.getColNames();
			if(lt.isArray(cs)){
				var cn;
				for(var i=0,j=cs.length;i<j;i++){
					cn=cs[i];
					if(_columnNames[cn]==null){
							// �������ݼ���û�и��ֶ�������׷���ֶ���
							_columnNames[cn]=_columnNames.length;
							_columnNames.push(cn);
					}
				}	
			}
			
			// ���������ݼ���׷������
			this.addData(dt.toArray(),ip);
		}
		
		this.toArray=function(){
			return _datas;
		}
		//�����ݼ��л�ȡ����
		this.getData=function(n){
			return 	_getData(n);
		}
		this.getDataValue=function(n,name){
			var r=this.getData(n);
			return 	(r)?r[name]:r[columns[name]];
		}
		// ��������
		this.setColNames=function(cs){
			_setColNames(cs)
		}
		// ��ȡ����������
		this.getColNames=function(){
			if(_columnNames.length==0 && this.size()>0){
				var obj=this.getData(0);
				for(var n in obj){
					if('_locationposition'!=n ) _columnNames.push(n);
				}
			}
			
			var cols=[];
			for(var i=0,l=_columnNames.length;i<l;i++){
				var c=_columnNames[i];
				if('_locationposition'!=c && '_sortid'!=c && '_jsonstring'!=c) cols.push(c);
			}
			
			return cols;
		}
		// ѭ������� fn 
		this.each=function(fn,s,l){
			if(!s){s=0}
			if(!l){l=this.size()}else{(s+l<this.size())?l=s+l:l=this.size()-l}
			for(;s<l;s++){
				fn(this.getData(s));
			}
		}
		
		this.bindTable=function(dt){
			_datatable=dt;
		}
		this.setDataSort=function(b){
			dataSort=b;
		}
		
		// ��ָ���ֶη��飬�ڶ�������Ϊ���������trueΪ����falseΪ����Ĭ������
		this.groupby=function(colname,asc){
			if(_groupcolumn!=null) _groupdata=[];
			_groupcolumn=colname;
			
			this.each(function(d){
				var v=d==null?null:d[colname];
				if(typeof(v)=='undefined'){
					d[colname]=null;
					v=null;
				}
				g=_groupdata['v:'+v];
				if(g==null){
					_groupdata['v:'+v]=[{colname:v,_datatye:'group'}]
					g=_groupdata['v:'+v];
					_groupdata.push(v);
				}
				g.push(d);
			})
						
			// ͳ�Ʒ�������
			for(var i=0,l=_groupdata.length;i<l;i++){
				_groupdata['v:'+_groupdata[i]][0]['_groupdatasize']=_groupdata['v:'+_groupdata[i]].length-1
			}
			_groupdata.sortArray(asc);
		}
		this.getgrouncolum=function(){return _groupcolumn}
		this.getgroupinfo=function(colvalue){
			if(_groupdata['v:'+colvalue]==null) return null;
			return _groupdata['v:'+colvalue][0];
		}
		
		this.cleargroup=function(){
			_groupcolumn=null;
			_groupdata=[];
		}
		this.getgroupsize=function(){
			return _groupcolumn==null?0:_groupdata.length;
		}
		
		// ����ָ����������ʹ��л������
		// ����jsҳ������ʱ��Ҫ�����Ĵ������л�ȡ���ݶ����ٻ�ȡ���ԵĲ���������js�ǽ��������ԡ���ˣ�Ƶ���ظ��Ĳ��������Ĵ�����ʱ�䡣
		// ��ˣ���������Ż��ķ�ʽʱ�Ƚ���Ҫ��������ݱ��浽һ������sortkey�У���Ҫ��������ݰ����������ݷ��鱣�浽һ������sortmap�С�
		// Ȼ���sortkey�е����ݽ�����������ٽ�sortmap�е����ݰ�sortkey�е�˳�򱣴浽�������
		this.sort=function(col,asc,fn){
			sortobj={col:col,asc:asc,fn:fn};
			if(col==null) col="_locationposition";
			_asc=asc==true;
			var start = new Date();
			
			// ���÷��������Ż���ʽ��������ٶ�
			var sortkey=[],sortmap={};
			var ds=this.toArray(),dobj,darr,dk;
			
			if(_groupcolumn==null) {
				// ���������ֶη���
				for(var i=0,l=ds.length;i<l;i++){
					dobj=ds[i];
					dk=dobj[col];  // �˴�Ӧ��ת��Ϊ����ʾ��ʵ������
					if(dk==null) dk='null';
	
					darr=sortmap['sk:'+dk];
					if(darr==null){
						darr=[];
						sortmap['sk:'+dk]=darr;
						sortkey.push(dk);
					}
					darr.push(dobj);
				}
			}
			else{
				var gkey;
				for(var gi=0,gl=_groupdata.length;gi<gl;gi++) sortmap['g:'+_groupdata[gi]]={};
				for(var i=0,l=ds.length;i<l;i++){
					dobj=ds[i];
					dk=dobj[col];  // �˴�Ӧ��ת��Ϊ����ʾ��ʵ������
	
					darr=sortmap['g:'+dobj[_groupcolumn]][dk];
					if(darr==null){
						darr=[];
						sortmap['g:'+dobj[_groupcolumn]][dk]=darr;
					}
					if(sortkey['v:'+dk]==null){
						sortkey.push(dk);
						sortkey['v:'+dk]=''
						sortkey['sk:'+dk]=dk
					}
					darr.push(dobj);
					
				}
			}
	
			if(fn!=null){
				var dk,sk;
				for(var i=0,l=sortkey.length;i<l;i++){
					dk=sortkey[i];
					sk=fn(dk);
					sortkey[i]=sk;
					sortkey['sk:'+sk]=dk;
					sortmap['sk:'+sk]=sortmap['sk:'+dk];
				}
			}
			
			// ����ָ���ֶε�ֵ
			sortkey=_sortArray(null,null,sortkey);

			// �����������
			_datas=[];
			var sortgroupdata;
			if(_groupcolumn==null){
				for(var i=0,l=sortkey.length;i<l;i++){
					sortgroupdata=sortmap['sk:'+sortkey[i]]
					for(var j=0,m=sortgroupdata.length;j<m;j++){
						_datas.push(sortgroupdata[j]);
					}
				}
			}
			else{
				var gdata,temp={}
				
				for(var gi=0,gl=_groupdata.length;gi<gl;gi++){
					var gmap=sortmap['g:'+_groupdata[gi]]
					for(var i=0,l=sortkey.length;i<l;i++){
						if(gmap[sortkey['sk:'+sortkey[i]]]!=null)
							_datas=_datas.concat(gmap[sortkey['sk:'+sortkey[i]]]);
					}
				}
				
			}
			
			
			
			_datas.size=_datas.length;
			_setSortId()
			sortmap=null;
			sortkey=null;
			ds=null;
			dobj=null;
			darr=null;
			dk=null;
		}
		
		// ������ݼ�����
		this.clear=function(){
			_datas=null;
			_datas=[];
			_datas.size=0;
			_datas_all=null;
			_datas_all=[];
	    _datas_all.size=0
		}
		
		// ��ָ��λ�ÿ�ʼɾ������
		this.delData=function(fn,i){
			_delData(fn,i);
			if(_datatable!=null) _datatable.reflash();
		}
		
		// ת��ΪJSON��ʽ���ַ���
		this.toJSON=function(){
			
			if(_prejson){
				var r=[];
				for(var i=0,li=_datas.size;i<li;i++){
					r.push(_datas[i]._jsonstring);
				}
				return '['+r.join(',')+']'.replace(/'/g,"\\\'").replace(/"/g,"\\\"");;
			}
			else{
				// �����������ɵ������� 
				/* */
				var fn=['function _toDataJSON(datas){var  str=["["],str1,data;for(var i=0,il=datas.length;i<il;i++){data=datas[i],str.push("{"),str1=[];'],cn,colnames=this.getColNames();
				for(var i=0,l=_columnNames.length;i<l;i++){
					cn=_columnNames[i];
					fn.push('var d=data["',cn,'"],dtype=typeof d;if(dtype!="undefined")if(dtype=="string"){str1.push("\\"',cn,'\\":\\""+d+"\\"")}else if(dtype=="number"){str1.push("\\"',cn,'\\":"+d)}else if(dtype=="boolean"){str1.push("\\"',cn,'\\":"+d.toString())}else{str1.push("\\"',cn,'\\":"+Object.toJSON(d))}');
				}
				
				fn.push('str.push(str1.join(","));str.push("},");} str.splice(str.length-1,1,"}");str.push("]");')
				
				
				fn.push('return str.join("");}');
				eval(fn.join(''));
				
				/*
				var _json=[];
				for(var i=0,l=_datas.length;i<l;i++){
					_json.push(_toDataJSON(_datas[i]));
				}
				return '['+_json.join(',')+']';
				*/
				
				return _toDataJSON(_datas);
				//return Object.toJSON(_datas);	
			}
		}
		
		// ת��Ϊ{columns:[],datas:[[],[]]}��ʽ���ַ���
		this.toArrayJSON=function(){
			var fn=['function _toDataArrayJSON(datas){var  str=[],_json=[];for(var i=0,l=datas.length;i<l;i++){var data=datas[i],str=[];'],cn,colnames=this.getColNames();
			for(var i=0,l=colnames.length;i<l;i++){
				cn=colnames[i];
				fn.push('var d=data["',cn,'"],dtype=typeof d;if(d==null){str.push("null")}else if(dtype=="string"){str.push("\\""+d+"\\"")}else if(dtype=="number"){str.push(d)}else if(dtype=="boolean"){str.push(d.toString())}else{str.push(Object.toJSON(d))}');
			}
			fn.push('_json.push("["+str.join(",")+"]");}return _json.join(',')}');
			eval(fn.join(''));
			
			return ['{columns:',Object.toJSON(colnames),',datas:[',_toDataArrayJSON(_datas),']}'].join('');
		}
		
		// ���ù������������ø�ʽΪ{key:string/number/array[number/string],��}
		this.setFilter=function(filterset){
			for(var key in filterset){
				if(!Ext.lt.isArray(filterset[key])){
					filterset[key]=[filterset[key]];
				}
			}
			_setFilter(filterset);
		}
		this.sortobj=function(){
			if(sortobj!=null&&sortobj.col!=null){
				this.sort(sortobj.col,sortobj.asc,sortobj.fn);
			}
		}
		// ������ݹ���
		this.clearFilter=function(){
			_clearFilter();
		}
		
		
		// ���ݹ���������ѯ���ݼ��е����ݣ�����������ʽΪ{key:string/number/array[number/string],��}
		this.query=function(filterset){
			var r=[],keys=[];
			
			// û�в�ѯ����������ȫ������
			if(filterset==null){
				return _datas_all;
			}
		
			// ���ɲ�ѯ����
			if(filterset!=null){
				for(var key in filterset){
					keys.push(key);
				}
				
				for(var k=0,j=keys.length;k<j;k++){
					var values=filterset[keys[k]];
					if(!Ext.lt.isArray(values)) values=[values];
					for(var i=0,l=values.length;i<l;i++){
						filterset['_k'+keys[k]+'_v'+values[i]]=true
					}
				}
			}
		
			// ��֤���ݣ��������ݲ������ݼ���
			var checkflag=true;
			for(var i=0,n=_datas_all.length;i<n;i++){
				checkflag=true;
				for(var j=0,l=keys.length;j<l;j++){
					if(filterset['_k'+keys[j]+'_v'+_datas_all[i][keys[j]]]!=true){
						// ����ƥ���������ƥ�����������ӵ���ʾ������
						checkflag=false;
						break;
					}
				}
				if(checkflag) r.push(_datas_all[i]);
				
			}
		
			return r;
		}
		
		// �����ݼ����Ƴ�����Ԫ�أ��Ƴ���Ԫ�ر����Ǵ����ݼ���ȡ���Ķ���
		this.remove=function(datas){
			if(!Ext.lt.isArray(datas)) datas=[datas];
			for(var i=0,l=datas.length;i<l;i++){
				datas['_locationposition'+datas[i]._locationposition]=true;
			}
			
			var _datas_all_new=[];
			for(var i=0,l=_datas_all.length;i<l;i++){
					if(datas['_locationposition'+_datas_all[i]._locationposition]!=true) _datas_all_new.push(_datas_all[i]);
			}
			_datas_all=_datas_all_new;
			_datas_all.size=_datas_all.length;
			_filterData();
			if(_datatable!=null) _datatable.reflash();
		}
		
		this.moveTo=function(s,e){
			var d=_getData(s);
		
			var _datas_all_new=[];
			for(var i=0,l=_datas_all.length;i<l;i++){
					if(i==e){ 
						_datas_all_new.push(d);
						d._locationposition=_locationposition++;
					}
					if(i!=s){ _datas_all_new.push(_datas_all[i]);}
					
					if(i>=e){
						_datas_all[i]._locationposition=_locationposition++;
					}
			}
			_datas_all=_datas_all_new;
			_datas_all.size=_datas_all.length;
			_filterData();
				if(_datatable!=null) _datatable.reflash();
		}
		
		this.select=function(fn){
			if(!Ext.lt.isFunction(fn)){
				return this;
			}
			
			var rs=new Ext.lt.recordset({columns:this.getColNames(),datas:[]}),ds=[];
			this.each(function(d){
				if(fn(d)) ds.push(d);
			});
			rs.addData(ds);
			return rs;
		}
		
		this.createMaxColLength=function(){
			maxlength=[];
			var collength=_columnNames.length
			for(var p=0;p<collength;p++) maxlength[p]=0;
			
			this.each(function(d){
				for(var n=0;n<collength;n++){
					var v=d[_columnNames[n]];
					if(v!=null && maxlength[n]<v.length) maxlength[n]=v.length;
				}
			},0,1000)
		}
		
		this.getMaxColDataLength=function(){
			if(maxlength==null) this.createMaxColLength();
			return maxlength;
		}
		
		this.getMaxLength=function(col){
			for(var i=0;i<_columnNames.length;i++){
				if(col==_columnNames[i]){
					if(maxlength==null) this.createMaxColLength();
					return maxlength[i];
				}
			}
			return 0;
		}
		this.setMaxLength=function(col,l){
			for(var i=0;i<_columnNames.length;i++){
				if(col==_columnNames[i]){ 
					maxlength[i]=l;
					return ;
				}
			}
		}
		this.delRow=function(rownum){
			_delRow(rownum)
			if(_datatable!=null) _datatable.reflash();
		}
		Ext.lt.message.hook("recordset","load",function(config){
			if(config.rs==this){this.clear();this.setData(config.data,0);}
		});
	}
}


/**
 * ���Զ���ʵ����
 * �����������������Զ���ʵ�ַ�����
 * ִ�к󣬽�����������setAnimatProperty(proerty,start,end);
                       play(time,fn);
                       stop();
   ��������
 */
Ext.lt.aninmation=function(elem){
	elem.animat={playtime:0,property:[],timer:0,starttime:0};
	
	elem.setAnimatProperty=function(proerty,start,end){
		this.animat.property.push({"name":proerty,"start":start,"end":end});
	}
	
	// ��ֹ��������
	elem._stop=function(){
		if(this.animat.timer!=0){
			clearInterval(this.animat.timer);
			
			var l=this.animat.property.length;
			for(var i=0;i<l;i++){
				var pro=this.animat.property[i];
				this._changeAnimatProperty(pro.name,0,pro.end,-1);
			}

			this.animat.timer=0
			this.animat.playtime=0;
			this.animat.property=[];
			
			if(Ext.lt.isFunction(this.animat.endfn)) this.animat.endfn();
		}
	}
	
	elem._changeAnimatProperty=function(proerty,start,end,run){
		var v=end;
		if(run>0){
			var x=Math.sqrt(run/this.animat.playtime);
			v=start+((end-start)*(x));
		}
		
		if(proerty.indexOf('style')==0){
			this.style[proerty.replace('style\.','')]=v+'px';
		}
		else{
			this.setAttribute(proerty,v);
		}
	}
	
	elem._play=function(){
		var p=new Date()-this.animat.starttime;
		// �ж϶����Ƿ����
		if(p>=this.animat.playtime){
			this._stop();
			return;
		}
		
		var l=this.animat.property.length;
		for(i=0;i<l;i++){
			var pro=this.animat.property[i];
			this._changeAnimatProperty(pro.name,pro.start,pro.end,p);
		}
		
	}
	
	// ���Ŷ���
	elem.play=function(time,fn){
		// ��鵱ǰ�Ƿ��ж���������
		if(this.animat.timer!=0){
			this._stop();
		}
		
		this.animat.playtime=time;
		this.animat.starttime=new Date();
		this.animat.timer=setInterval( Ext.lt.util.fnbind(this._play,elem),1);
		this.animat.endfn=fn;
	}
	
	return elem;
}


Ext.lt.RCP = new function () {
	var _param="";
	
	this.setAllParameters=function(param){
		if(param!=null)
		_param="&"+param;
	}
	
	var _lt=Ext.lt;
	// Զ�̵�����־
	var _remotelog = [];
	var _url = "";
	//try{_url=_ROOT_PATH_;}catch(e){}
	function _getUrl(){
		var _url=Ext.lt.serverUrl;
		try{_url=_ROOT_PATH_;}catch(e){}
		return _url;
	}
	
	
	// Զ�̵��÷���
	// server    ����ID��ʹ�������ʼ��ʱ����ṩ�ķ������ò���
	// m         ������
	// paramets  �������ϣ������Ǽ򵥱����������֡��ı��ȣ����������Ҫʹ��������ʽ
	// callbakfn �ص������������ִ�н�����󻯺�ֱ����Ϊ��һ���������ڶ���������ʾ������Ƿ��д���
	// falsefun  Զ�̵����쳣ʱִ�и÷����������ش�����
	this.call = function (server, m, parameters, callbakfn, falsefun) {
		///defaulttitleservice.rcp
		if (server == null || m == null) {
			return;
		}
		var para = "";
		para += "method=" + m;
		if (null != parameters) {
			if(_lt.isArray(parameters)){
				para += "&paramjson=" + encodeURIComponent(Object.toJSON(parameters));
			}
			else{
				para += "&paramjson=" +encodeURIComponent(Object.toJSON([parameters]));;
			}
		}
		// ��֤ϵͳ����ģʽ�����Ϊ��ʾģʽ����ʹ�ñ��������ļ�ģ��Զ�̵���
		var remote_url = "."+server + ".rcp";
		if(Ext.lt.demomode){
			this.demoCall(remote_url+'?'+para,callbakfn);
		}
		else{
			new Ajax.Request(_getUrl()+server + ".rcp?"+new Date(),{
				parameters:para+_param, 
				method:"post", 
				requestHeaders:{Accept:"application/json","If-Modified-Since":"0"},//��ֹ��ȡ��������
				onComplete:function (resp) {
					var respText = resp.responseText.split(":");
					if(respText[0]=='error'){
						// �������������־
						_remotelog.push({'calltype':'call','httpurl':remote_url+'?'+para,'response':resp.responseText,'result':'error','calltime':new Date()});
						var err=resp.responseText.substr(6);
						if(falsefun==null){
							alert(err);
						}
						else{
							falsefun(err);	
						}
						return;
					}
					else{
						// �����ɹ�������־
						_remotelog.push({'calltype':'call','httpurl':remote_url+'?'+para,'response':resp.responseText,'result':'success','calltime':new Date()});
						if(callbakfn!=null) callbakfn(Ext.lt.util.JSON.decode(resp.responseText.replace(/\n/g,' ').replace(/\r/g,' ')),true);
					}
				},
				onFailure:function (resp) {
					if(falsefun==null){
						if(resp.status==12029){
							alert("���粻ͨ������ʧ��!");
						}else{
							alert(x.statusText);
						}
					}
					else{
						// ����ʧ�ܵ�����־
						_remotelog.push({'calltype':'call','httpurl':remote_url+'?'+para,'response':resp.statusText+'('+resp.status+')','result':'fail','calltime':new Date()});
						falsefun(x.statusText);	
					}
				}
			});
		}
	};
	// Զ�̵��÷���
	// server    ����ID��ʹ�������ʼ��ʱ����ṩ�ķ������ò���
	// m         ������
	// paramets  �������ϣ������Ǽ򵥱����������֡��ı��ȣ����������Ҫʹ��������ʽ
	// callbakfn �ص������������ִ�н�����󻯺�ֱ����Ϊ��һ���������ڶ���������ʾ������Ƿ��д���
	// falsefun  Զ�̵����쳣ʱִ�и÷����������ش�����
	this.asyncall = function (server, m, parameters) {
		///defaulttitleservice.rcp
		if (server == null || m == null) {
			return;
		}
		var para = "";
		para += "method=" + m;
		if (null != parameters) {
			if(_lt.isArray(parameters)){
				para += "&paramjson=" + encodeURIComponent(Object.toJSON(parameters));
			}
			else{
				para += "&paramjson=" +encodeURIComponent(Object.toJSON([parameters]));;
			}
		}
		// ��֤ϵͳ����ģʽ�����Ϊ��ʾģʽ����ʹ�ñ��������ļ�ģ��Զ�̵���
		var remote_url = "."+server + ".rcp";
		if(Ext.lt.demomode){
			return this.demoCall(remote_url+'?'+para);
		}
		else{
			var resps=null;
			new Ajax.Request(_getUrl()+server + ".rcp?"+new Date(),{
				parameters:para+_param, 
				method:"post", 
				requestHeaders:{Accept:"application/json","If-Modified-Since":"0"},//��ֹ��ȡ��������
				asynchronous: false,
				onComplete:function (resp) {
					var respText = resp.responseText.split(":");
					if(respText[0]=='error'){
						// �������������־
						_remotelog.push({'calltype':'call','httpurl':remote_url+'?'+para,'response':respText[1],'result':'error','calltime':new Date()});
						var err=resp.responseText.substr(6);
						if(falsefun==null){
							alert(err);
						}
						else{
							falsefun(err);	
						}
						return;
					}
					// �����ɹ�������־
					_remotelog.push({'calltype':'call','httpurl':remote_url+'?'+para,'response':resp.responseText,'result':'success','calltime':new Date()});
					resps=Ext.lt.util.JSON.decode(resp.responseText.replace(/\n/g,' ').replace(/\r/g,' '));
				}
			});
			return resps;
		}
	};
		//ͬ������
	this.asynserver = function (serverid, m, parameters,exception) {
		///defaulttitleservice.rcp
		var para = "";
		if (serverid == null || m == null) {
			return;
		}
		para += "serverid=" + serverid;
		para += "&method=" + m;
		if (null != parameters) {
			if(_lt.isArray(parameters)){
				para += "&paramjson=" + encodeURIComponent(Object.toJSON(parameters));
			}
			else{
				para += "&paramjson=" +encodeURIComponent(Object.toJSON([parameters]));;
			}
		}
				// ��֤ϵͳ����ģʽ�����Ϊ��ʾģʽ����ʹ�ñ��������ļ�ģ��Զ�̵���
		var remote_url = "./webservice.rcp";
		if(Ext.lt.demomode){
			return this.demoCall(remote_url+'?'+para);
		}
		else{
			var resps=null;
		var ajax=new Ajax.Request(_getUrl() + "/webservice.rcp?"+new Date(), {
				parameters:para+_param, method:"post", 
				requestHeaders:{Accept:"application/json","If-Modified-Since":"0"},
				asynchronous: false,
				onComplete:function (resp) {
					var respText = resp.responseText.split(":");
					if(respText[0]=='error'){
						// �������������־
						_remotelog.push({'calltype':'server','httpurl':remote_url+'?'+para,'response':respText[1],'result':'error','calltime':new Date()});

						var err=resp.responseText.substr(6);
						if(exception==null){
							alert(err);
						}
						else{
							exception(err);	
						}
						return;
					}
					// �����ɹ�������־
					_remotelog.push({'calltype':'server','httpurl':remote_url+'?'+para,'response':resp.responseText,'result':'success','calltime':new Date()});
					resps=Ext.lt.util.JSON.decode(resp.responseText.replace(/\n/g,' ').replace(/\r/g,' '));
				},
				onFailure:function (resp) {
					// ����ʧ�ܵ�����־
						_remotelog.push({'calltype':'server','httpurl':remote_url+'?'+para,'response':respText[1],'result':'error','calltime':new Date()});

					if(exception==null){
						alert(x.statusText);
					}
					else{
						exception(x.statusText);	
					}
				}
				
			});
			return resps;
		}
	};
//--------------
	this.asynserverNotParamts = function (serverid, m, parastr,exception) {
		///defaulttitleservice.rcp
		var para = "";
		if (serverid == null || m == null) {
			return;
		}
		if(parastr==null)parastr='';
		para += "serverid=" + serverid;
		para += "&method=" + m;
		para += "&" + parastr;
				// ��֤ϵͳ����ģʽ�����Ϊ��ʾģʽ����ʹ�ñ��������ļ�ģ��Զ�̵���
		var remote_url = "./webservice.rcp";
		if(Ext.lt.demomode){
			return this.demoCall(remote_url+'?'+para);
		}
		else{
			var resps=null;
		var ajax=new Ajax.Request(_getUrl() + "/webservice.rcp?"+new Date(), {
				parameters:para+_param, method:"post", 
				requestHeaders:{Accept:"application/json","If-Modified-Since":"0"},
				asynchronous: false,
				onComplete:function (resp) {
					var respText = resp.responseText.split(":");
					if(respText[0]=='error'){
						// �������������־
						_remotelog.push({'calltype':'server','httpurl':remote_url+'?'+para,'response':respText[1],'result':'error','calltime':new Date()});

						var err=resp.responseText.substr(6);
						if(exception==null){
							alert(err);
						}
						else{
							exception(err);	
						}
						return;
					}
					// �����ɹ�������־
					_remotelog.push({'calltype':'server','httpurl':remote_url+'?'+para,'response':resp.responseText,'result':'success','calltime':new Date()});
					resps=Ext.lt.util.JSON.decode(resp.responseText.replace(/\n/g,' ').replace(/\r/g,' '));
				},
				onFailure:function (resp) {
					// ����ʧ�ܵ�����־
						_remotelog.push({'calltype':'server','httpurl':remote_url+'?'+para,'response':respText[1],'result':'error','calltime':new Date()});

					if(exception==null){
						alert(x.statusText);
					}
					else{
						exception(x.statusText);	
					}
				}
			});
			return resps;
		}
	};
	//webservice.rcp?serverid=defaultloginservice&method=getLoginYears
	this.serverNotParamts = function (serverid, m, parastr, callbakfn, falsefun) {
		///defaulttitleservice.rcp
		var para = "";
		if (serverid == null || m == null) {
			return;
		}
		if(parastr==null)parastr='';
		para += "serverid=" + serverid;
		para += "&method=" + m;
		para += "&" + parastr;
		// ��֤ϵͳ����ģʽ�����Ϊ��ʾģʽ����ʹ�ñ��������ļ�ģ��Զ�̵���
		var remote_url = "./webservice.rcp";
		if(Ext.lt.demomode){
			return this.demoCall(remote_url+'?'+para);
		}
		else{
			var ajax=new Ajax.Request(_getUrl() + "/webservice.rcp?"+new Date(), {
				parameters:para+_param,
				method:"post", 
				requestHeaders:{Accept:"application/json","If-Modified-Since":"0"},
				onComplete:function (resp) {
					var respText = resp.responseText.split(":");
					if(respText[0]=='error'){
						// �������������־
						_remotelog.push({'calltype':'server','httpurl':remote_url+'?'+para,'response':respText[1],'result':'error','calltime':new Date()});

						var err=resp.responseText.substr(6);
						if(falsefun==null){
							alert(err);
						}
						else{
							falsefun(err);	
						}
						return;
					}
					// �����ɹ�������־
					_remotelog.push({'calltype':'server','httpurl':remote_url+'?'+para,'response':resp.responseText,'result':'success','calltime':new Date()});
					if(callbakfn!=null) callbakfn(Ext.lt.util.JSON.decode(resp.responseText.replace(/\n/g,' ').replace(/\r/g,' ')),true);
				},
				onFailure:function (resp) {
					// ����ʧ�ܵ�����־
					_remotelog.push({'calltype':'server','httpurl':remote_url+'?'+para,'response':resp.statusText+'('+resp.status+')','result':'fail','calltime':new Date()});

					if(falsefun==null){
						alert(x.statusText);
					}
					else{
						falsefun(x.statusText);	
					}
				}
			});
		}
	};
//----------------
	this.asynserverNotEncode = function (serverid, m, parameters,exception) {
		///defaulttitleservice.rcp
		var para = "";
		if (serverid == null || m == null) {
			return;
		}
		para += "serverid=" + serverid;
		para += "&method=" + m;
		if (null != parameters) {
			if(_lt.isArray(parameters)){
				para += "&paramjson=" + Object.toJSON(parameters);
			}
			else{
				para += "&paramjson=" +Object.toJSON([parameters]);;
			}
		}
				// ��֤ϵͳ����ģʽ�����Ϊ��ʾģʽ����ʹ�ñ��������ļ�ģ��Զ�̵���
		var remote_url = "./webservice.rcp";
		if(Ext.lt.demomode){
			return this.demoCall(remote_url+'?'+para);
		}
		else{
			var resps=null;
		var ajax=new Ajax.Request(_getUrl() + "/webservice.rcp?"+new Date(), {
				parameters:para+_param, method:"post", 
				requestHeaders:{Accept:"application/json","If-Modified-Since":"0"},
				asynchronous: false,
				onComplete:function (resp) {
					var respText = resp.responseText.split(":");
					if(respText[0]=='error'){
						// �������������־
						_remotelog.push({'calltype':'server','httpurl':remote_url+'?'+para,'response':respText[1],'result':'error','calltime':new Date()});

						var err=resp.responseText.substr(6);
						if(exception==null){
							alert(err);
						}
						else{
							exception(err);	
						}
						return;
					}
					// �����ɹ�������־
					_remotelog.push({'calltype':'server','httpurl':remote_url+'?'+para,'response':resp.responseText,'result':'success','calltime':new Date()});
					resps=Ext.lt.util.JSON.decode(resp.responseText.replace(/\n/g,' ').replace(/\r/g,' '));
				},
				onFailure:function (resp) {
					// ����ʧ�ܵ�����־
						_remotelog.push({'calltype':'server','httpurl':remote_url+'?'+para,'response':respText[1],'result':'error','calltime':new Date()});

					if(exception==null){
						alert(x.statusText);
					}
					else{
						exception(x.statusText);	
					}
				}
			});
			return resps;
		}
	};
	//webservice.rcp?serverid=defaultloginservice&method=getLoginYears
	this.serverNotEncode = function (serverid, m, parameters, callbakfn, falsefun) {
		///defaulttitleservice.rcp
		var para = [];
		if (serverid == null || m == null) {
			return;
		}
		para.push("serverid=",serverid,"&method=",m);
		var start=new Date();
		if (null != parameters) {
			para.push("&paramjson=",Object.toJSON(_lt.isArray(parameters)?parameters:[parameters]));
		}
		para=para.join('');
		// ��֤ϵͳ����ģʽ�����Ϊ��ʾģʽ����ʹ�ñ��������ļ�ģ��Զ�̵���
		var remote_url = "./webservice.rcp";
		if(Ext.lt.demomode){
			return this.demoCall(remote_url+'?'+para);
		}
		else{
			var ajax=new Ajax.Request(_getUrl() + "/webservice.rcp?"+new Date(), {
				parameters:para+_param,
				method:"post", 
				requestHeaders:{Accept:"application/json","If-Modified-Since":"0"},
				onComplete:function (resp) {
					var respText = resp.responseText.split(":");
					if(respText[0]=='error'){
						// �������������־
						_remotelog.push({'calltype':'server','httpurl':remote_url+'?'+para,'response':respText[1],'result':'error','calltime':new Date()});
						var err=resp.responseText.substr(6);
						if(falsefun==null){
							alert(err);
						}
						else{
							falsefun(err);	
						}
						return;
					}
					// �����ɹ�������־
					_remotelog.push({'calltype':'server','httpurl':remote_url+'?'+para,'response':resp.responseText,'result':'success','calltime':new Date()});
					if(callbakfn!=null) callbakfn(Ext.lt.util.JSON.decode(resp.responseText.replace(/\n/g,' ').replace(/\r/g,' ')),true);
				},
				onFailure:function (resp) {
					// ����ʧ�ܵ�����־
					_remotelog.push({'calltype':'server','httpurl':remote_url+'?'+para,'response':resp.statusText+'('+resp.status+')','result':'fail','calltime':new Date()});

					if(falsefun==null){
						alert(x.statusText);
					}
					else{
						falsefun(x.statusText);	
					}
				}
			});
		}
	};
	//webservice.rcp?serverid=defaultloginservice&method=getLoginYears
	this.server = function (serverid, m, parameters, callbakfn, falsefun) {
		///defaulttitleservice.rcp
		var para = [];
		if (serverid == null || m == null) {
			return;
		}
		para.push("serverid=",serverid,"&method=",m);
		var start=new Date();
		if (null != parameters) {
			para.push("&paramjson=",encodeURIComponent(Object.toJSON(_lt.isArray(parameters)?parameters:[parameters])));
		}
		para=para.join('');
		// ��֤ϵͳ����ģʽ�����Ϊ��ʾģʽ����ʹ�ñ��������ļ�ģ��Զ�̵���
		var remote_url = "./webservice.rcp";
		if(Ext.lt.demomode){
			return this.demoCall(remote_url+'?'+para);
		}
		else{
			var ajax=new Ajax.Request(_getUrl() + "/webservice.rcp?"+new Date(), {
				parameters:para+_param,
				method:"post", 
				requestHeaders:{Accept:"application/json","If-Modified-Since":"0"},
				onComplete:function (resp) {
					var respText = resp.responseText.split(":");
					if(respText[0]=='error'){
						// �������������־
						_remotelog.push({'calltype':'server','httpurl':remote_url+'?'+para,'response':respText[1],'result':'error','calltime':new Date()});

						var err=resp.responseText.substr(6);
						if(falsefun==null){
							alert(err);
						}
						else{
							falsefun(err);	
						}
						return;
					}
					// �����ɹ�������־
					_remotelog.push({'calltype':'server','httpurl':remote_url+'?'+para,'response':resp.responseText,'result':'success','calltime':new Date()});
					if(callbakfn!=null) callbakfn(Ext.lt.util.JSON.decode(resp.responseText.replace(/\n/g,' ').replace(/\r/g,' ')),true);
				},
				onFailure:function (resp) {
					// ����ʧ�ܵ�����־
					_remotelog.push({'calltype':'server','httpurl':remote_url+'?'+para,'response':resp.statusText+'('+resp.status+')','result':'fail','calltime':new Date()});

					if(falsefun==null){
						alert(x.statusText);
					}
					else{
						falsefun(x.statusText);	
					}
				}
			});
		}
	};
	
	this.script = function ( serverid, m, parameters, callName) {
		if (callName == null || m == null || serverid == null) {
			return false;
		}
		var httpurl = "";
		var para = "";
		para += "&method=" + m;
		if (null != parameters) {
			if(_lt.isArray(parameters)){
				para += "&paramjson=" + encodeURIComponent(Object.toJSON(parameters));
			}
			else{
				para += "&paramjson=" +encodeURIComponent(Object.toJSON([parameters]));;
			}
		}
		//new Ext.lt.util().createScript(httpurl + "/" + serverid + ".script?" + para, serverid);
		// ���ɷ��صı�����
		var returnname="servrereturnvalue" + _lt.getNextSeqValue();
		if(Ext.lt.demomode){
			this.demoCall("." + serverid + ".script?returnname="+returnname+"&"+ para,callName);
		}
		else{
			var s = document.createElement("SCRIPT");
			s.id = "cgi_emotion_list" + _lt.getNextSeqValue();
			s.src = httpurl + serverid + ".script?returnname="+returnname+"&"+ para+_param;
			s.onreadystatechange = function () {
				if (this.readyState == "complete" || this.readyState == "loaded") {
					// ����ʧ�ܵ�����־
					if (callName != null) {
						callName(eval(returnname));
						try{
						_remotelog.push({'calltype':'script','httpurl':"."+serverid + ".script?returnname="+returnname+"&"+ para,'response':returnname+'='+eval(returnname).toJSON(),'result':'success','calltime':new Date()});
						}catch(e){}
					}
				}
			};
			document.getElementsByTagName("HEAD")[0].appendChild(s);
		}
	};
	
	
	this.script = function (httpurl, serverid, m, parameters, callName,jsessionid) {
		if (callName == null || m == null || serverid == null) {
			return false;
		}
		if (httpurl == null || httpurl == "") {
			httpurl = "";
		}
		var para = "";
		para += "&method=" + m;
		if (null != parameters) {
			if(_lt.isArray(parameters)){
				para += "&paramjson=" + Object.toJSON(parameters);
			}
			else{
				para += "&paramjson=" +Object.toJSON([parameters]);
			}
		}
		if(jsessionid!=null){
			jsessionid='&seesionid='+jsessionid;
		}else{
			jsessionid=''
		}
		//new Ext.lt.util().createScript(httpurl + "/" + serverid + ".script?" + para, serverid);
		// ���ɷ��صı�����
		var returnname="servrereturnvalue" + _lt.getNextSeqValue();
		if(Ext.lt.demomode){
			this.demoCall("." + serverid + ".script?returnname="+returnname+"&"+ para,callName);
		}
		else{
		//��ȡϵͳʱ�䣬��ֹ�����ַ��ͬ���ٷ�������
		 var date = new Date();
		 /*  
         var sysTime = String(date.getFullYear()) + String((date.getMonth()+1)) +  String(date.getDate()) + String(date.getHours()) + String(date.getMinutes()) + String(date.getSeconds())+String(date.getMilliseconds());  
			var s = document.createElement("SCRIPT");
			s.id = "cgi_emotion_list" + _lt.getNextSeqValue();
			s.src = httpurl + serverid + ".script?returnname="+returnname+"&"+ para+jsessionid+"&"+sysTime;
			*/
		    var sysTime = String(date.getFullYear()) + String((date.getMonth()+1)) +  String(date.getDate()) + String(date.getHours()) + String(date.getMinutes()) + String(date.getSeconds())+String(date.getMilliseconds());  
       //  var sysTime = String(date.getFullYear()) + String((date.getMonth()+1)) +  String(date.getDate()) + String(date.getHours()) + String(date.getMinutes()) + String(date.getSeconds())+String(date.getMilliseconds());  
			var s = document.createElement("SCRIPT");
			s.id = "cgi_emotion_list" + _lt.getNextSeqValue();
			s.src = httpurl + "/" + serverid + ".script?returnname="+returnname+"&"+ para+jsessionid+"&"+sysTime+_param;
			//s.src = httpurl + "/" + serverid + ".script?returnname="+returnname+"&"+ para+jsessionid+"&"+1;
			s.onreadystatechange = function () {
				if (this.readyState == "complete" || this.readyState == "loaded") {
					// ����ʧ�ܵ�����־
					if (callName != null) {
						callName(eval(returnname));
						try{
						_remotelog.push({'calltype':'script','httpurl':"."+serverid + ".script?returnname="+returnname+"&"+ para,'response':returnname+'='+eval(returnname).toJSON(),'result':'success','calltime':new Date()});
						}catch(e){}
					}
				}
			};
			document.getElementsByTagName("HEAD")[0].appendChild(s);
		}
	};
	this.down=function(serverid, m, parameters,target){
		var para = [];
		if (serverid == null || m == null) {
			return;
		}
		para.push("serverid=",serverid,"&method=",m);
		var start=new Date();
		if (null != parameters) {
			para.push("&paramjson=",encodeURIComponent(Object.toJSON(_lt.isArray(parameters)?parameters:[parameters])));
		}
		para=para.join('');
		var url=_getUrl() + "/webservicedown.rcp?"+para+_param;
		
		window.open(url,target==null?"_blank":target);
	};
	// ���ñ��������ļ�ģ��Զ�̵���
	this.demoCall = function(httpurl,callbakfn){
		for(var i=0;i<Ext.lt.demodatamap.length;i++){
			if(Ext.lt.demodatamap[i].httpurl==httpurl){
				if(null!=callbakfn){
					window.setTimeout ((function(){callbakfn(Ext.lt.demodatamap[i].value); }),100);
					return ;
				}else{
					return Ext.lt.demodatamap[i].value;
				}
			}
		}
	};
	// ���ӵ��Կ�ݼ�'ctrl+shift+r'
	var _RCPlogWindow=null;
	Ext.lt.regKeyEvent('r',function(){
		var event = window.event;
		if(event.shiftKey && event.ctrlKey && event.keyCode==18){
			// ������־���񼰵�����־
			var logtable=[],logscript=[],tmp=[];
			var log;
			logtable.push('<table border=1 width="100%"><tr><td>����ʱ��</td><td>��������</td><td>����</td><td>�������Ӧ</td><td>����ֵ</td></tr>');
			for(var i=0,loop=_remotelog.length;i<loop;){
				log = _remotelog[i++];
				logtable.push('<tr><td>');
				logtable.push(log.calltime);
				logtable.push('</td><td>');
				logtable.push(log.calltype);
				logtable.push('</td><td>');
				logtable.push(log.httpurl);
				logtable.push('</td><td>');
				logtable.push(log.result);
				logtable.push('</td><td >');
				if(log.response.length>197){
					logtable.push(log.response.substring(0,197)+'...');
				}else{
					logtable.push(log.response);
				}
				logtable.push('</td></tr>');

				tmp.push('Ext.lt.demodatamap.push({"httpurl":\'');
				tmp.push(log.httpurl);
				tmp.push('\',"value":');
				tmp.push(log.response);
				tmp.push('});');
				logscript.push(tmp.join(''));
				tmp=[];
				//logscript.push();
				//logscript.push();
				//logscript.push();
				//logscript.push();
			}
			logtable.push('</table>');
			
			
			if(_RCPlogWindow==null){
				_RCPlogWindow=Ext.lt.window({title:"�鿴������־", w:406, h:481,close:true,pop:true,mark:false});
				var _div=document.createElement("div");
				document.body.appendChild(_div);
				_div.style.height='450px';
				_div.style.width='400px';
				_div.innerHTML="<button onclick='Ext.lt.message.send(\"RCPlogWindow\",\"logtable\")'>�鿴������־</button><button onclick='Ext.lt.message.send(\"RCPlogWindow\",\"logscript\")'>����ģ������</button><div id='_RCPlogWindow_div' style='height:428px;width:400px;overflow:scroll;font-size:12px;'></div>";
				_RCPlogWindow.draw(_div);
				document.getElementById('_RCPlogWindow_div').innerHTML=logtable.join('');
				Ext.lt.message.hook("RCPlogWindow","logtable",function(){
					document.getElementById('_RCPlogWindow_div').innerHTML=logtable.join('');
				});
				Ext.lt.message.hook("RCPlogWindow","logscript",function(){
					document.getElementById('_RCPlogWindow_div').innerHTML=logscript.join('\n');
				});
			}
			_RCPlogWindow.show();

		}
	},true,true);
	
};


/**
  �ն˵���
  ��Զ�̵��õ�ͬʱ���ڿͻ����ṩһ����ʾ�նˣ����Խ��������Ϣ���͵��ͻ�����ʾ
  �ṩ�����ն���ʾ��ʽ�������������Ϣ��ʾ��������Ϣ��
*/
Ext.lt.RCPConsole=new function(){
	var _url = "";
	//try{_url=_ROOT_PATH_;}catch(e){}
	function _getUrl(){
		var _url=Ext.lt.serverUrl;
		try{_url=_ROOT_PATH_;}catch(e){}
		return _url;
	}
	// ��������ʱ�Ķ�ʱ��
	var _timeout_interval=0;
	// ���ڻ�ȡ����̫����Ķ�ʱ��
	var _console_interval=0;
	// �ն��Ƿ��Ѿ����뵽ҳ����
	var _tipsappend=false;
	var _tipsconsolediv=document.createElement('DIV');
	_tipsconsolediv.className='rcpconsole';
	_tipsconsolediv.style.display='none';
	_tipsconsolediv.consoletype=null;
	var _closebtn=null;
	var _messagediv=null;
	var _processdiv=null;
	
	// �ر��ն˴��ڣ����������ݣ��ر�����
	function _close(){
		clearInterval(_timeout_interval);
		clearInterval(_console_interval);
		_console_interval=0;
		_timeout_interval=0;
		_tipsconsolediv.style.display='none';
		if(_messagediv!=null)_messagediv.innerHTML='';
		if(_processdiv!=null)_processdiv.style.width='0px';
		Ext.lt.HTML.unmark();
	}
	
	// ��ʾ�նˣ��ڴﵽ��ʱʱ��֮����ʾ�رհ�ť��Ĭ��15��
	function _showtipsconsole(timeout){
		timeout=timeout==null?15:timeout;
		if(_tipsconsolediv.consoletype!='tips'){
			_tipsconsolediv.innerHTML='<table cellpadding="0" cellspacing="0" background="0" width="100%"><tr><td nowrap="nowrap" class="ll">&nbsp;</td><td nowrap="nowrap" class="l_loading"><img src="'+Ext.lt.ltextpath+'/images/rcpconsole/wait.gif"></td><td nowrap="nowrap" class="l_loading"><div class="console"></div></td><td nowrap="nowrap" width="12px" valign="top" align="right" class="l_loading title"><button class="closebtn" type="button" overclass="closebtn_over" title="�ر�"></button></td><td nowrap="nowrap" class="lr">&nbsp;</td></tr></table>';
			document.body.appendChild(_tipsconsolediv);
			// ���ҹرհ�ť
			var l=_tipsconsolediv.firstChild.cells.length;
			_closebtn=_tipsconsolediv.firstChild.cells.item(l-2).firstChild;
	    _closebtn.style.display='none';
	    _closebtn.onclick=_close;
	    // ����������ݵ�λ��
	    _messagediv=_tipsconsolediv.firstChild.cells.item(l-3).firstChild
			_tipsconsolediv.consoletype='tips';
		}
		
		_tipsconsolediv.style.display='';
		Ext.lt.HTML.center(_tipsconsolediv);
		
		// ��ʱ����ʾ�رմ���
		_timeout_interval=setInterval(function(){
			_closebtn.style.display='';
		},timeout*1000)
	}
	
	this.tipscall=function(serverid, m, parameters, callbakfn, falsefun){
		var config={timeout:15,rcptype:'call'};
		config['serverid']=serverid
		config['m']=m
		config['parameters']=parameters
		config['callbakfn']=callbakfn
		config['falsefun']=falsefun
		
		buildtipsconsole(config);
	}
	this.tipsserver=function(serverid, m, parameters, callbakfn, falsefun){
		var config={timeout:15,rcptype:'server'};
		config['serverid']=serverid
		config['m']=m
		config['parameters']=parameters
		config['callbakfn']=callbakfn
		config['falsefun']=falsefun
		
		buildtipsconsole(config);
	}
	this.tipsserverNotEncode=function(serverid, m, parameters, callbakfn, falsefun){
		var config={timeout:15,rcptype:'serverNotEncode'};
		config['serverid']=serverid
		config['m']=m
		config['parameters']=parameters
		config['callbakfn']=callbakfn
		config['falsefun']=falsefun
		
		buildtipsconsole(config);
	}
	function buildtipsconsole(config){
		
		Ext.lt.HTML.mark();
		_showtipsconsole(config.timeout);
		
		// ��ʾ��ܿ����ն�
		config.m+="&rcpconsole=tips&noserveranalyselog=true"
		var callbakfn=config.callbakfn
		var falsefun=config.falsefun
		
		_timeout_interval=1;
		function _console_function(){
			var messagediv=_messagediv;
			Ext.lt.RCP.server('com.longtu.framework.portal.termial.RCPConsoleComponentService','getConsoleMessage',null,function(msg){
				if(_timeout_interval==0) return;
				if(msg==null) return _console_continue_function();
				msg.each(function(text){
					var lastdiv = messagediv.lastChild;
					if(lastdiv!=null && lastdiv.doaninmation==null){
						Ext.lt.aninmation(lastdiv);
						lastdiv.setAnimatProperty('style.marginTop',0,-1*_messagediv.offsetHeight);
						lastdiv.play(200,function(){lastdiv.removeNode(true)});
						lastdiv.doaninmation=true
					}
					
					var msgdiv=document.createElement('DIV');
					msgdiv.className='tipsmsg';
					msgdiv.style.cssText='width:'+(_messagediv.offsetWidth)+'px;Height:'+(_messagediv.offsetHeight)+'px';
					msgdiv.innerHTML=text;
					messagediv.appendChild(msgdiv);
				});
				_console_continue_function();
			})
		}
		
		function _console_continue_function(){
			setTimeout(_console_function,100);
		}
		_console_continue_function();
		
		
		// ���ػص�����
		Ext.lt.RCP[config.rcptype](config.serverid, config.m, config.parameters, function(rs){
			_close();
			callbakfn(rs)
		}, function(rs){
			_close();
			if(falsefun!=null)falsefun(rs)
		});
		
	}
	
	// ��ʾ�նˣ��ڴﵽ��ʱʱ��֮����ʾ�رհ�ť��Ĭ��15��
	function _showprocessconsole(timeout){
		timeout=timeout==null?15:timeout;
		if(_tipsconsolediv.consoletype!='process'){
			_tipsconsolediv.innerHTML='<table cellpadding="0" cellspacing="0" background="0" width="100%"><tr><td nowrap="nowrap" class="ll">&nbsp;</td><td nowrap="nowrap" class="l_loading"><div class="console"><div class="lt"><div class="process0"><div class="process100"></div></div></div><div class="processmsg" ></div></td><td nowrap="nowrap" width="12px" valign="top" align="right" class="l_loading title"><button class="closebtn" type="button" overclass="closebtn_over" title="�ر�"></button></td><td nowrap="nowrap" class="lr">&nbsp;</td></tr></table>';
			document.body.appendChild(_tipsconsolediv);
			// ���ҹرհ�ť
			var l=_tipsconsolediv.firstChild.cells.length;
			_closebtn=_tipsconsolediv.firstChild.cells.item(l-2).firstChild;
	    _closebtn.style.display='none';
	    _closebtn.onclick=_close;
	    // ���ҽ�����λ��
	    _processdiv=_tipsconsolediv.firstChild.cells.item(l-3).firstChild.firstChild.firstChild.firstChild;
	    _processdiv.style.width='1px'
	    // ����������ݵ�λ��
	    _messagediv=_tipsconsolediv.firstChild.cells.item(l-3).firstChild.lastChild
			_tipsconsolediv.consoletype='process'
		}
		
		_tipsconsolediv.style.display='';
		Ext.lt.HTML.center(_tipsconsolediv);
		//edited zhangkai993 ������Ϣ���zindex�����ⱻ���ֲ㸲��
		_tipsconsolediv.style.zIndex=Ext.lt.getNextZIndex();
		// ��ʱ����ʾ�رմ���
		_timeout_interval=setInterval(function(){
			_closebtn.style.display='';
		},timeout*1000)
	}
	this.processcall=function(serverid, m, parameters, callbakfn, falsefun){
		var config={timeout:15,rcptype:'call'};
		config['serverid']=serverid
		config['m']=m
		config['parameters']=parameters
		config['callbakfn']=callbakfn
		config['falsefun']=falsefun
		
		buildprocessconsole(config);
	}
	this.processserver=function(serverid, m, parameters, callbakfn, falsefun){
		var config={timeout:15,rcptype:'server'};
		config['serverid']=serverid
		config['m']=m
		config['parameters']=parameters
		config['callbakfn']=callbakfn
		config['falsefun']=falsefun
		
		buildprocessconsole(config);
	}
	this.processdown=function(serverid, m, parameters){
		var iframe=document.getElementById("processdown");
		if(iframe==null){
			iframe=document.createElement("iframe");
			iframe.style.display ="none";
			document.body.appendChild(iframe);
		}
		this.processserver(serverid, m, parameters,function(){
			var url=_getUrl() + "/consoledown.rcp";
			iframe.src =url;
			//window.open(url);
		})
	}
	this.processserverNotEncode=function(serverid, m, parameters, callbakfn, falsefun){
		var config={timeout:15,rcptype:'serverNotEncode'};
		config['serverid']=serverid
		config['m']=m
		config['parameters']=parameters
		config['callbakfn']=callbakfn
		config['falsefun']=falsefun
		
		buildprocessconsole(config);
	}
	this.processdownNotEncode=function(serverid, m, parameters){
		var iframe=document.getElementById("processdown");
		if(iframe==null){
			iframe=document.createElement("iframe");
			iframe.style.display ="none";
			document.body.appendChild(iframe);
		}
		this.processserverNotEncode(serverid, m, parameters,function(){
			var url=_getUrl() + "/consoledown.rcp";
			iframe.src =url;
			//window.open(url);
		})
	}
	function buildprocessconsole(config){
		
		Ext.lt.HTML.mark();
		_showprocessconsole(config.timeout);
		
		// ��ʾ��ܿ����ն�
		config.m+="&rcpconsole=process&noserveranalyselog=true"
		var callbakfn=config.callbakfn
		var falsefun=config.falsefun
		
		_console_interval=1;
		function _console_function(){
			var messagediv=_messagediv;
			
			// ͨ��ͬ�����û�ȡ����ֵ
			Ext.lt.RCP.server('com.longtu.framework.portal.termial.RCPConsoleComponentService','getProcessMessage',null,function(msg){
				if(_console_interval==0) return;
				
				var p=msg.process;
				_processdiv.style.width=Math.round(_processdiv.parentElement.offsetWidth*p)+'px';
				
				if(msg.text==null) return _console_continue_function();
				msg.text.each(function(text){
					messagediv.innerHTML=text
				});
				_console_continue_function();
			});
		}
		
		function _console_continue_function(){
			setTimeout(_console_function,100);
		}
		_console_continue_function();
		
		// ���ػص�����
		Ext.lt.RCP[config.rcptype](config.serverid, config.m, config.parameters, function(rs){
			_processdiv.style.width=_processdiv.parentElement.offsetWidth+'px';
			_close();
			callbakfn(rs);
		}, function(rs){
			_processdiv.style.width=_processdiv.parentElement.offsetWidth+'px';
			_close();
			if(falsefun!=null)falsefun(rs);
		})

	}
	
	
}


Ext.lt.util = new function () {
	// ��¼��ǰҳ����ع���js
	var JSCACH=[];
	this.hiddselect=function(flag){
		var selects = document.getElementsByTagName("SELECT");
		var formObj = document.getElementById("advancedQueryForm")
		if(selects!=null&&selects.length>0){
			for(var i=0;i<selects.length;i++){
				var obj = selects[i];
				if(formObj != null ){
					if(formObj.contains(obj)){
						continue;
					}
				}
				
				if(flag){
					obj.style.visibility='hidden';
					obj.style.display='none';
				} else {
					obj.style.visibility='visible';
					obj.style.display='inline';
				}
			}
		}
	}
	this.createScript = function (srcIp, divId) {
		if (document.getElementById("cgi_emotion_list" + divId)) {
			document.getElementsByTagName("HEAD")[0].removeChild(document.getElementById("cgi_emotion_list" + divId));
		}
		var s = document.createElement("SCRIPT");
		s.id = "cgi_emotion_list" + divId;
		document.getElementsByTagName("HEAD")[0].appendChild(s);
		s.src = srcIp;
		return s;
	};
	this.createScript = function (srcIp, divId, fn) {
		if(JSCACH[srcIp]){
			if(fn!=null){
				fn();
			}
			return;
		}
		
		if (document.getElementById("cgi_emotion_list" + divId)) {
			document.getElementsByTagName("HEAD")[0].removeChild(document.getElementById("cgi_emotion_list" + divId));
		}
		var s = document.createElement("SCRIPT");
		s.id = "cgi_emotion_list" + divId;
		s.src = srcIp+"?id"+Math.random();
		s.onreadystatechange = function () {
			if (this.readyState == "complete" || this.readyState == "loaded") {
				if (fn != null) {
					fn();
				}
			}
		};
		document.getElementsByTagName("HEAD")[0].appendChild(s);
		JSCACH[srcIp]=true
		return s;
	};
	this.createStylesheet = function (srcIp, divId) {
		var s = document.createElement("LINK");
		s.id = "cgi_LINK_list" + divId;
		document.getElementsByTagName("HEAD")[0].appendChild(s);
		s.type = "text/css";
		s.rel='stylesheet';
		s.href = srcIp;
	};
	this.addTablPanel = function (title, panel, tablpanelid) {
		Ext.getCmp(tablpanelid).add({title:title, items:[panel]}).show();
	};
	this.setText=function(txt){
		return window.clipboardData.setData("text",txt);
	};
	this.fnbind=function(fn,context){
		if (arguments.length < 2 && context===undefined) return fn;  
		var method = fn//,args=arguments
		//slice = Array.prototype.slice,  
		//args = slice.call(arguments, 2) ;  
		return function(){ 
			//var array = slice.call(arguments, 0);  
			//return method.apply(context,args.concat(array))  
			return method.apply(context,arguments)  
		} 
	};
	this.checkData=function(data){
		var check=/^[\u4e00-\u9fa5a-zA-Z0-9_]+$/;
		if(check.test(data)){
			return true;
		}
		return false;
	};
	this.clone=function(obj){
		return Ext.lt.clone(obj);
	};
		//����ֵ 0�ɹ�
	//����ֵ 1���з��������͵�
	//����ֵ 2С����Сֵ
	//����ֵ 3�������ֵ
	//����ֵ 4whereʱ��ʧ��
	this.checkNumber=function(num,min,max,wherefn){
		if(isNaN(num)){
			return 1;
		}
		if(min!=null&&num<min){
			return 2;
		}
		if(max!=null&&num>max){
			return 3;
		}
		if(wherefn!=null&&!wherefn(num)){
			return 4;
		}
		return 0;
	};
	
	this.JSON=new function(){
		this.decode=function(json){
			return eval("(" + json + ')');
		}
		
	};
	var userdataDiv;
	this.setUserData=function(key,headString){
	    try{
		    if(typeof(userdataDiv)=="undefined"){
		    	createUserDataDiv();
		    	obj = userdataDiv;
		    }
		    if(obj==null) return;
		    if(key==null) return;
		    var isIE = Ext.lt.ieversion;
		    if(isIE){   
		    	var _user ="";
		    	var _path = location.pathname;
		    	if(typeof(current_user)!="undefined"){
		    		_user = current_user;
		    	}
		    	if(typeof(comlinkname)!="undefined"){
		    		_path = comlinkname;
		    	}
			    with(window.document.body)
			    {
			    	var newKey = (_path+_user).md5();
			    	obj.load(newKey);	//��ֹ�ļ�ָ�����
			        obj.setAttribute(key,headString);
			        obj.save(newKey);
			    }
			}else if(window.sessionStorage){
			    sessionStorage.setItem(key+"_head",headString);
			}
		}catch(ex){
		} 
	};
	this.getUserData=function(key){ 
	    var headString;
	    try{
		    if(typeof(userdataDiv)=="undefined"){
		    	createUserDataDiv();
		    	obj = userdataDiv;
		    }
		    if(obj==null) return null;
		    if(key==null) return null;
		    var isIE = Ext.lt.ieversion;
		    if(isIE){
		    	var _user ="";
		    	var _path =location.pathname;
		    	if(typeof(current_user)!="undefined"){
		    		_user = current_user;
		    	}
		    	if(typeof(comlinkname)!="undefined"){
		    		_path = comlinkname;
		    	}
			    with(window.document.body)
			    {
			       try{ 
			    	var newKey = (_path+_user).md5();
			    	obj.load(newKey); 
			        headString = obj.getAttribute(key);
			       }catch(ex){
			       }  
			    }
			}else if(window.sessionStorage){
			    headString = sessionStorage.getItem(key+"_head");
			}
		}catch(ex){
		} 
		return headString;
	}
	this.removeUserData = function(key){
		   try{ 
			    if(typeof(userdataDiv)=="undefined"){
			    	createUserDataDiv();
			    	obj = userdataDiv;
			    }
			   if(obj==null) return null;
			   if(key==null) return null;
			   var isIE = Ext.lt.ieversion;
			   if(isIE){
			    	var _user ="";
			    	var _path =location.pathname;
			    	if(typeof(current_user)!="undefined"){
			    		_user = current_user;
			    	}
			    	if(typeof(comlinkname)!="undefined"){
			    		_path = comlinkname;
			    	}
				    with(window.document.body)
				    {
				    	var newKey = (_path+_user).md5();
				    	obj.load(newKey); 
				        obj.removeAttribute(key);
				        obj.save(newKey); 
				    }
			    }else if(window.sessionStorage){
				    headString = sessionStorage.removeItem(key+"_head");
				}
		    }catch(ex){
		    } 
	}
	function createUserDataDiv(){
		if(typeof(userdataDiv)=="undefined"){
			userdataDiv= document.createElement("div");
			userdataDiv.style.behavior="url(#default#userData)";
			userdataDiv.style.display="none";
			userdataDiv.style.height="0";
			userdataDiv.style.widtht="0";
	        document.body.appendChild(userdataDiv);
		}
	}
};

if(Ext.lt.HTML==null)
Ext.lt.HTML=new function(){
	var _returnOffset = function(l, t) {
	  var result = [l, t];
	  result.left = l;
	  result.top = t;
	  return result;
	};
	
	var _camelize=function(style) {
    var parts = style.split('-'), len = parts.length;
    if (len == 1) return parts[0];

    var camelized = parts[0].charAt(0) == '-'
      ? parts[0].charAt(0).toUpperCase() + parts[0].substring(1)
      : parts[0];

    for (var i = 1; i < len; i++)
      camelized += parts[i].charAt(0).toUpperCase() + parts[i].substring(1);

    return camelized;
  };
  
  this.hiddenAll=function(sels){
  	var sel;
  	for(var i=0,l=sels.length;i<l;i++){
  		sel=sels.item(i);
  		if(sel.currentStyle.display!='none'){
  			sel.style.display='none';
  			sel._marked=true;
  		}
  	}
	}
	
  this.showAll=function(sels){
  	var sel;
  	for(var i=0,l=sels.length;i<l;i++){
  		sel=sels.item(i);
  		if(sel._marked){
  			sel.style.display='';
  		}
  	}
	}
  this.markload=function(el,flag){
  	Ext.lt.HTML.mark(el,flag);
  	if(flag==null) flag=true;
  	if(el==null) el=document.body;
	if(el.initmark.loaddiv==null){
		el.initmark.loaddiv=document.createElement("div");
		document.body.appendChild(el.initmark.loaddiv);
		el.initmark.loaddiv.className="markload";
	}
  	if(flag){
  		el.initmark.style.display='';
  	}
	Ext.lt.message.hook("mark","endresize",resizeMarkLoad);
  }
  function resizeMarkLoad(el){
	  		var t=el.initmark.clientTop;
	  		var l=el.initmark.clientLeft;
	  		var h=el.initmark.clientHeight;
	  		var w=el.initmark.clientWidth;
	  		el.initmark.loaddiv.style.left=(w-32)/2+l
	  		el.initmark.loaddiv.style.top=(h-32)/2+t
  	}
  // ����ָ��HTMLԪ��
  // ����DIV����
  this.mark=function(el,flag){
  	if(flag==null) flag=true;
  	if(el==null) el=document.body;
  	
  	
  	function elresize(){
  		if(el.tagName=="BODY"){
			_pw=document.documentElement.clientWidth;
			_ph=document.documentElement.clientHeight;
		}
		else{
			_pw=el.offsetWidth-parseInt(el.currentStyle.marginLeft,10)-parseInt(el.currentStyle.marginRight,10);
			_ph=el.offsetHeight-parseInt(el.currentStyle.marginTop,10)-parseInt(el.currentStyle.marginBottom,10);
		}
		el.initmark.style.width=_pw+'px';
  		el.initmark.style.height=_ph+'px';
  		Ext.lt.message.send("mark","endresize",el);
  	}
  	
  	if(el.initmark==null){
  		el.initmark=document.createElement('IFRAME');
  		//el.initmark=document.createElement('DIV');
  		var _pl=0,_pt=0;
  		if(el.tagName=='BODY'){
	  		_pl=0;
				_pt=0;
			}
			else{
				var _p=this.positionedOffset(el,null,false);
				_pl=_p.left;
				_pt=_p.top;
			}
  		el.initmark.style.cssText="display:none;filter:Alpha(Opacity=50);position:absolute;background-color:#fff;height:0px;left:"+_pl+"px;top:"+_pt+"px;";
  		Ext.lt.aninmation(el.initmark)
  		document.body.appendChild(el.initmark);
  	}
  	// ��������
  	if(flag==true){
  		// �Ѿ����ֳɹ���
  		if(el.initmark.style.display=='') return false;
  		var _pw=0,_ph=0;
  		if(el.tagName=="BODY"){
				_pw=document.documentElement.scrollWidth;
				_ph=document.documentElement.scrollHeight;
			}
			else{
				_pw=el.offsetWidth-parseInt(el.currentStyle.marginLeft,10)-parseInt(el.currentStyle.marginRight,10);
				_ph=el.offsetHeight-parseInt(el.currentStyle.marginTop,10)-parseInt(el.currentStyle.marginBottom,10);
				
			}
			// �������в��ܱ����ֵ�HTML����
	  	Ext.lt.HTML.hiddenAll(el.getElementsByTagName('SELECT'));
	  	Ext.lt.HTML.hiddenAll(el.getElementsByTagName('OBJECT'));
	  	Ext.lt.HTML.hiddenAll(el.getElementsByTagName('IFRAME'));
  		
			//el.initmark.contentWindow.document.write('<html><body style="background-color:#000"></body></html>');
  		el.initmark.style.display='';
  		el.initmark.style.zIndex=Ext.lt.getNextZIndex();
  		el.initmark.style.width=_pw+'px';
  		el.initmark.style.height='0px';
  		el.initmark.setAnimatProperty("style.height",0,_ph);
  		//ʱ�������
  		el.initmark.play(0,function(){
  			 Ext.lt.message.hook("layout","endlayout",elresize);
  		}); 
  		
  		return true;
  	}
  	else{
			// �������в��ܱ����ֵ�HTML����
	  	Ext.lt.HTML.showAll(el.getElementsByTagName('SELECT'));
	  	Ext.lt.HTML.showAll(el.getElementsByTagName('OBJECT'));
	  	Ext.lt.HTML.showAll(el.getElementsByTagName('IFRAME'));
	  	
	  	if(el.initmark.loaddiv!=null){el.initmark.loaddiv.style.display='none';}
  		// ��������
  		Ext.lt.message.unhook("layout","endlayout",elresize);
  		Ext.lt.message.unhook("mark","endresize",resizeMarkLoad);
  		el.initmark.style.display='none';
  		Ext.lt.layout.doLayout();
  		return true;
  	}
  }
  this.unmark=function(el){
  	if(el==null) el=document.body;
  	Ext.lt.HTML.mark(el,false);
  	
  }
  
  // ��ָ����HTML����λ����Ļ�м�
  this.center=function(el){
  	var left=isNaN(document.documentElement.scrollLeft)?0:document.documentElement.scrollLeft+(document.documentElement.clientWidth-el.offsetWidth)/2
		var top=isNaN(document.documentElement.scrollTop)?0:document.documentElement.scrollTop+(document.documentElement.clientHeight-el.offsetHeight)/3
		
		if(top<0){
			el.runtimeStyle.height=(document.body.offsetHeight-50)+'px';
			top=30;
		}
		el.style.left=left+'px'
		el.style.top=(top)+'px'
  }
  
  // ������ק����
  this.drag=function(cfg){
  	var el=cfg.element;
  	var endfn=cfg.onend==null?function(){}:cfg.onend;
  	var startfn=cfg.onstart==null?function(){}:cfg.onstart;
		var holder=cfg.holder!=false; // �����Ƿ���ʾռλ��
		var _x=cfg.x;
		var _y=cfg.y;
		var _dragel=cfg.dragel==null?el:cfg.dragel;
		var _el_zindex=el.style.zIndex;
		
  	
  	// ����ռλ��ǩ
	  _dragel._placeholder=document.createElement('DIV');
	  _dragel._placeholder.style.cssText='border:#999999 2px dotted;display:none';
	  
  
  	// ��갴�º�ʼ�϶�
  	el.onmousedown=function(){
  		startfn.apply(el);
  		
  		// ����������λ��
  		var pos=Ext.lt.HTML.positionedOffset(_dragel,document.body,false);
  		(cfg.x==null)? _x=window.event.screenX-pos.left:_x=cfg.x;//-window.event.offsetX;
  		(cfg.y==null)? _y=window.event.screenY-pos.top:_y=cfg.y;//-window.event.offsetY;
  		//window.status=window.event.y+' '+window.event.screenY+' '+window.event.offsetY+' '+pos.top+'  '+_y;
  		_dragel.runtimeStyle.position='absolute';
  		_dragel.style.left=(window.event.screenX -_x)+"px";
  		_dragel.style.top=(window.event.screenY-_y)+"px";
  		_el_zindex=el.style.zIndex;
  		_dragel.style.zIndex=Ext.lt.getNextZIndex();
  		_dragel.runtimeStyle.cursor='pointer';
  		// ͨ������ռλ����¼HTMLԪ��ԭ��λ��
  		_dragel.insertAdjacentElement('beforeBegin',_dragel._placeholder);
  		document.body.appendChild(_dragel);

  		// ��ʾռλDIV
  		if(holder){
	  		_dragel._placeholder.style.display='block';
	  		_dragel._placeholder.style.width=(_dragel.offsetWidth-4)+'px';
	  		_dragel._placeholder.style.height=(_dragel.offsetHeight-4)+'px';
	  	}
  	
  		document.body.onmousemove=function(){
  			_dragel.style.left=(window.event.screenX -_x)+'px';
  			_dragel.style.top=(window.event.screenY-_y)+'px';
  		}
  		
  		// ���̧���ֹͣ�϶�
	  	document.body.onmouseup=function(){
	  		document.body.onmousemove=null;
	  		document.body.onmouseup=null;
	  		_dragel.runtimeStyle.cursor='';
	  		
	  		if(_dragel==null) return;
	  		if(holder) _dragel._placeholder.style.display='none';
	  		_dragel._placeholder.insertAdjacentElement('beforeBegin',_dragel);
	  		_dragel.runtimeStyle.position='';
	  		if(_el_zindex>0) _dragel.style.zIndex=_el_zindex;
	  		
	  		endfn.apply(el);
	  	}
  		return true;
  	}
  	
  	el.onselect=function(){return false};
  	el.onselectstart=function(){return false};
  	el.ondragstart=function(){return false};

  	
  }
	
	this.positionedOffset=function(element,endel,flag) {
    var valueT = 0, valueL = 0;
    if(flag==null) flag=true;
    if(endel==null) endel=document.body;
    if(element==endel) return _returnOffset(0, 0);
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      element = element.offsetParent;
      if (element) {
        if (element == endel) break;
        var p = this.getStyle(element, 'position');
        if ((p == 'relative' || p == 'absolute') && flag) break;
      }
    } while (element);
    return _returnOffset(valueL, valueT);
  };
  
  function buildBorderSetObject(r){
  	r.left=r[0];
  	r.right=r[1];
  	r.top=r[2];
  	r.bottom=r[3]
  	r.width=r.left+r.right;
  	r.height=r.top+r.bottom;
  	
  	return r;
  }
  
  // ��ȡָ��HTMLԪ�ص��ĸ��߿���
  this.getBorderSet=function(element,sty,attr){
  	var r=[0,0,0,0];
  	attr=attr==null?['Left','Right','Top','Bottom']:attr;
  	sty=sty==null?['padding','margin','border']:sty;
  	if(element==null) return buildBorderSetObject(r);
  	var v=0
  	var v=0,styleobj,num
  	for(var i=0;i<sty.length;i++){
  		for(var j=0;j<attr.length;j++){
  			styleobj=element.currentStyle==null?element.style:element.currentStyle;
  			num=styleobj[sty[i]+attr[j]+(sty[i]=='border'?'Width':'')]
  			v=parseInt(num,10);
  			r[j]+=isNaN(v)?0:v;
  		}	
  	}

  	return buildBorderSetObject(r);
  }
  
  this.getStyle=function(element, style) {
    //element = $(element);
    style = style == 'float' ? 'cssFloat' : _camelize(style);
    var styleobj=element.currentStyle?element.currentStyle:element.style
    var value = styleobj[style];
    if (style == 'opacity') return value ? parseFloat(value) : 1.0;
    return value == 'auto' ? null : value;
  }
  
  this.setStyle=function(element, styletext) {
    var sty=styletext.split(';');
    var s,k,v;
    for(var i=0,l=sty.length;i<l;i++){
    	s=sty[i].split(':');
    	if(s.length!=2) continue;
			k=s[0],v=s[1];
    	k = k == 'float' ? 'styleFloat' : _camelize(k);
   		element.style[k]=v;
    }
  }
  
  this.setRuntimeStyle=function(element, styletext) {
    var sty=styletext.split(';');
    var s,k,v;
    for(var i=0,l=sty.length;i<l;i++){
    	s=sty[i].split(':');
    	if(s.length!=2) continue;
			k=s[0],v=s[1];
    	k = k == 'float' ? 'cssFloat' : _camelize(k);
   		element.runtimeStyle[k]=v;
    }
  }
  
  this.clearRuntimeStyle=function(ele){
  	var rsty=ele.runtimeStyle;
  	rsty.cssText="";
  }
  
  var _switchgroup={}; // ���濪����
  Ext.lt.onload(function(){
  	Ext.lt.bindEvent(document.body,'onmouseout',function(event){
	  	var el=event.srcElement;
	  	if(el==null) return;
	  	try{
		  	while(el!=null){
		  		var attr=el.getAttribute("overclass"),flag=false;
		  		if(attr!=null){
		  			el.className=_expandelement[el.uniqueID];
		  			flag=true;
		  		}
		  		
		  		attr=el.getAttribute("overstyle");
		  		if(attr!=null){
						el.runtimeStyle.cssText='';
						flag=true;
		  		}
		  		
		  		//if(flag) return
		  		el=el.parentElement;
		  	}
		  }
		  catch(e){}
	  });
	  
	  Ext.lt.bindEvent(document.body,'onmousedown',function(event){
	  	var el=event.srcElement
	  	if(el==null) return;
	  	try{
		  	var attr=el.getAttribute("clickclass");
		  	if(attr!=null)el.className=attr;
		  	
		  	attr=el.getAttribute("clickstyle");
		  	if(attr!=null){
			  	el.rsty=el.runtimeStyle.cssText;
		  		Ext.lt.HTML.setRuntimeStyle(el,attr);
		  	}
		  }
		  catch(e){}
	  });
	  
	  Ext.lt.bindEvent(document.body,'onmouseup',function(event){
	  	var el=event.srcElement
	  	if(el==null) return;  		
	  	try{
		  	var attr=el.getAttribute("clickclass");
		  	var el=event.srcElement;
		  	if(attr!=null) el.className=el.overclass==null?_expandelement[el.uniqueID]:el.overclass;
	  		if(el.rsty!=null)	el.runtimeStyle.cssText=el.rsty;
		  }
		  catch(e){}
	  });
	  
	  Ext.lt.bindEvent(document.body,'onmouseover',function(event){
	  	var el=event.srcElement
	  	if(el==null) return;	  	
	  	try{
	  		do{
			  	var attr=el.getAttribute("overclass");
			  	if(attr!=null){
			  		var uniqueID=el.uniqueID;
			  		if(_expandelement[uniqueID]==null) _expandelement[uniqueID]=el.className;
			  		el.className=attr;
			  	}
			  	
			  	var attr=el.getAttribute("overstyle");
			  	if(attr!=null){
			  		el.runtimeStyle.cssText=attr;
			  	}
			  	
			  	el=el.parentElement;
			  }while(el!=null)
		  }
		  catch(e){}

	  });

/*
	  document.body.attachEvent('onmouseout',function(event){
	  	var el=event.srcElement;
	  	if(el==null) return;
	  	try{
		  	while(el!=null){
		  		var attr=el.getAttribute("overclass"),flag=false;
		  		if(attr!=null){
		  			el.className=_expandelement[el.uniqueID];
		  			flag=true;
		  		}
		  		
		  		attr=el.getAttribute("overstyle");
		  		if(attr!=null){
						el.runtimeStyle.cssText='';
						flag=true;
		  		}
		  		
		  		//if(flag) return
		  		el=el.parentElement;
		  	}
		  }
		  catch(e){}
	  });

	  document.body.attachEvent('onmousedown',function(event){
	  	var el=event.srcElement
	  	if(el==null) return;
	  	try{
		  	var attr=el.getAttribute("clickclass");
		  	if(attr!=null)el.className=attr;
		  	
		  	attr=el.getAttribute("clickstyle");
		  	if(attr!=null){
			  	el.rsty=el.runtimeStyle.cssText;
		  		Ext.lt.HTML.setRuntimeStyle(el,attr);
		  	}
		  }
		  catch(e){}
	  })
  
	  document.body.attachEvent('onmouseup',function(event){
	  	var el=event.srcElement
	  	if(el==null) return;  		
	  	try{
		  	var attr=el.getAttribute("clickclass");
		  	var el=event.srcElement;
		  	if(attr!=null) el.className=el.overclass==null?_expandelement[el.uniqueID]:el.overclass;
	  		if(el.rsty!=null)	el.runtimeStyle.cssText=el.rsty;
		  }
		  catch(e){}
	  })
	
	  
	  document.body.attachEvent('onmouseover',function(event){
	  	var el=event.srcElement
	  	if(el==null) return;	  	
	  	try{
	  		do{
			  	var attr=el.getAttribute("overclass");
			  	if(attr!=null){
			  		var uniqueID=el.uniqueID;
			  		if(_expandelement[uniqueID]==null) _expandelement[uniqueID]=el.className;
			  		el.className=attr;
			  	}
			  	
			  	var attr=el.getAttribute("overstyle");
			  	if(attr!=null){
			  		el.runtimeStyle.cssText=attr;
			  	}
			  	
			  	el=el.parentElement;
			  }while(el!=null)
		  }
		  catch(e){}

	  })
*/
  })
  
  
  function getElementExpAttr(el){
  	return {attroverclass:el.getAttribute("overclass")}
  }
  
  
  
  
  
  // ��չ������롢�Ƴ��������ʽ overclass clickclass  
  // ����������ʽ���ԣ�����switchclass��switchgroup��switch
  function expandHTMLElementSwitchStyle(el){
  	var switchclass=el.getAttribute('switchclass');
  	if(switchclass==null) return;
  	
  	var switchgroup=el.getAttribute('switchgroup');
  	
  	// ������ʽ��ָ������Ժ���ʽ�ı䣬�ٵ��һ�κ�ָ���Ч����ͬһ��Ŀ��ذ�ťֻ����һ��������
		el.onswitchclass=Ext.lt.util.fnbind(function(){  		
			if(this.switchon){
				this.className=this.getAttribute("switchclass");
			}
			else{
				this.className=_expandelement[this.uniqueID];
			}
		},el);
		
		
		el.switchon=false;
		el.attachEvent('onclick',Ext.lt.util.fnbind(function(){
			// �޸Ŀ���״̬
			this.switchon^=true
			
			var group=_switchgroup[this.getAttribute("switchgroup")];
			if(group!=null){
				// ��ʼ���з����飬������������ť�ķ�����
				window.switchgroupskip=true;
				var grouptype='',tmp=this.getAttribute("switchgroup").split(':'),otherclear=false;
				if(tmp.length>1) grouptype=tmp[1];
					
				for(var i=0,l=group.length;i<l;i++){
					// �������е�����ѡ�������ѡ��״̬
  				if(group[i].switchon && group[i]!=this){
  					//group[i].fireEvent('onclick');
  					// �޸�ѡ��״̬
  					group[i].switchon^=true
  					// ������ʽ
  					group[i].onswitchclass()
  					otherclear=true
  				}
  			}
  			
  			// ǿ��ѡ��һ��������ȡ��ѡ��״̬
  			if('clockone'==grouptype && this.switchon==false && !otherclear) this.switchon=true;
  			
  		}
  		
  		this.onswitchclass();
  		
		},el));
	
  	// _switchgroup ����������
  	if(switchgroup!=null){
  		var group=_switchgroup[switchgroup];
  		if(group==null){group=[];_switchgroup[switchgroup]=group}
  		group.push(el);
  		
			// �滻ɾ��������ɾ������֮ǰ������
			el.oldremoveNode=el.removeNode;
			el.removeNode=function(flag){
				_switchgroup[this.getAttribute("switchgroup")].remove(this);
				this.oldremoveNode(flag);
			}
  	}
  	
  	if(el.getAttribute('switch')=='on') el.fireEvent('onclick');
  }
  
  
  function expandEditHTMLElement(el,tagName){
		// �ɱ༭�ؼ�������
		if((tagName=='INPUT' && el.type=='text')||tagName=='TEXTAREA'){
			expandINPUTHTMLElement(el);
		}
		// select �ؼ��󶨷���
		else if(tagName=='SELECT'){
			expandSELECTHTMLElement(el);
		}
  }
  
  var _expandelement={};

  // �����е�HTMLԪ�غܶ࣬��ȫ��������չû�б�Ҫ����ˣ���������ɸѡ����
  var _StyleExpanderHTMLTag={'SPAN':true,'DIV':true,'FONT':true,'LI':true,'TD':true,'TH':true,'A':true,'BUTTON':true};
  var _EditHTMLExpander={'INPUT':true,'BUTTON':true,'TEXTAREA':true,'SELECT':true};
  
	function isinclude(uniqueID){
		return _expandelement[uniqueID]!=null;
	}
	

  
  // ����������롢�Ƴ������ʱ����ʽ���ƣ�
  // ������ overclass overstyle clickclass clickstyle switchstyle switchclass switchgroup switch
  // Ϊinput select �ؼ��������ݰ󶨷���
  function _expandHTMLElement(el){
  	var tagname=el.tagName,uniqueID=el.uniqueID;
  	// ������Ѿ���������չ���Ե�HTMLԪ����ֱ���˳�
 		if(el.getAttribute('ignoreexpand')=='true') return;
 		if(isinclude(uniqueID)) return;
  	
  	if(_StyleExpanderHTMLTag[tagname]){
  		_expandelement[uniqueID]=el.className;
  		el.setInnerHTML=innerHTMLsetter;
  		expandHTMLElementSwitchStyle(el);  		
  	}
  	else if(_EditHTMLExpander[tagname]){
  		_expandelement[uniqueID]=el.className;
  		expandEditHTMLElement(el,tagname);
  	}
  }
  this.expandHTMLElement=function(el){_expandHTMLElement(el)}
  
  var func_bind=function(ds){
			if(ds==null) ds={};
			this._binddataset=ds;
			if(ds[this.name]==null) ds[this.name]='';
			this.value=ds[this.name]
			this.defaultValue=ds[this.name];
		}
  
  // ��չInput���������
  var expandINPUTHTMLElement=function(el){
		// �������ݰ󶨷��� bind������Ϊ���ݶ��󣬰󶨺������ݶ�����nameͬ�����Ե�ֵ���а󶨡�
		// ���ݰ�ֻ֧�� typeΪ checkbox hidden password radion text ��text���ͽ��󶨸�����Ϊ
		el.bind=Ext.lt.util.fnbind(function(ds){
			if(ds==null) ds={};
			this._binddataset=ds;
			if(ds[this.name]==null) ds[this.name]='';
			this.defaultValue=ds[this.name];
			this.settext(ds[this.name]);
		},el);
		
		el.settext=Ext.lt.util.fnbind(inputsetvalue,el);
		el.setvalue=function(v){el._binddataset[el.name]=v};
		// ��ȡ���������
		el.getBindValue=Ext.lt.util.fnbind(function(){return this._binddataset[this.name];},el);
		el.getValue=function(){var tips=this.getAttribute("tipstext"),v=this.value;if(tips==null){return v}else{if(v==tips){return ''}else{return v}}}
		// ʧ����ʱ���������ݣ��������������޸ĺ���¼�
		el.attachEvent('onblur',Ext.lt.util.fnbind(htmlelementbind,el));
		// �����ı��������
		el.reset=htmlelementreset;
		// ��������У�鹦��
		if(el.getAttribute('validchars')!=null || el.getAttribute('notvalidchars')!=null || el.getAttribute('validreg')!=null || el.getAttribute('notvalidreg')!=null){
			el.attachEvent('onkeyup',Ext.lt.util.fnbind(validinput,el));
			el.attachEvent('onpaste',Ext.lt.util.fnbind(validClipboardData,el));
		}
		// ������ı�������Ĭ��ֵ�������
		if(el.type=='text' && el.getAttribute("tipstext")!=null){
			el.tipstext=el.getAttribute("tipstext");
			el.attachEvent('onfocus',Ext.lt.util.fnbind(inputdefaulttips,el));
			el.attachEvent('onblur',Ext.lt.util.fnbind(inputdefaulttips,el));
			el.fireEvent('onblur');
		}
		// ��չ�����¼�����
		// {keycode:fn} keycode��u��ͷ��ʾ����̧��ʱ����
		// left:37 up:38 right:39 down:40 space:32 enter13
		el.onKey=function(keyevent){
			var _keydownevent={};
			var _keyupevent={};
			
			var fn;
			for(var key in keyevent){
				fn=keyevent[key];
				if(key.charAt(0)=='u'){
					key=key.substring(1);
					if(!isNaN(parseInt(key,10))){
						_keyupevent['k'+key]=fn;
					}
					else{
						_keyupevent[key]=fn;
					}
				}
				else{
					if(!isNaN(parseInt(key,10))){
						_keydownevent['k'+key]=fn;
					}
					else{
						_keydownevent[key]=fn;
					}
				}
			}
			if(_keydownevent['*']!=null) _keydownevent['k*']=_keydownevent['*'];
			if(_keyupevent['*']!=null) _keyupevent['k*']=_keyupevent['*'];
			
			el.attachEvent('onkeydown',function(en){
				var r=true;
				if(_keydownevent['k'+en.keyCode]!=null){
					r=r&(_keydownevent['k'+en.keyCode].apply(el,[en])!=false);
				}
				if(_keydownevent['k*']!=null){
					r=r&(_keydownevent['k*'].apply(el,[en])!=false);
				}
				return r;
			});

			el.attachEvent('onkeyup',function(en){
				var r=true;
				if(_keyupevent['k'+en.keyCode]!=null){
					r=r&(_keyupevent['k'+en.keyCode].apply(el,[en])!=false);
				}
				if(_keyupevent['k*']!=null){
					r=r&(_keyupevent['k*'].apply(el,[en])!=false);
				}
				return r;
			});
		}
		
		// ���������ı���
  }
  
  // ��չSelect���������
  var expandSELECTHTMLElement=function(el){
		// ��Select��ǩ�ж�ȡ���ݣ���ת����RecordSet����
		el.readData=Ext.lt.util.fnbind(function(){
			var opts=el.options,opt,v=[];
			for(var i=0,l=opts.length;i<l;i++){
				opt=opts.item(i);
				if(opt.selected){
					_selectValue=opt.value;
					_selectText=opt.text;
				}
				v.push([opt.text,opt.value,opt.selected,opt.getAttribute("py")]);	
			}
			return new Ext.lt.recordset({columns:['t','v','s','p'],datas:v});
		},el);
  }
  
  var valid=function(nstr){
  	if(nstr==null) return;
  	if(nstr.srcElement!=null){
	  	// ��ȡ���밴���ı���
		 	var keycode=event.keyCode;
			if(keycode<41 && keycode>36) return true; // �����
			if(keycode==13 || keycode==9 || keycode==46 || keycode==8 ) return true; // �س���tab�� del�� �˸��
		 	// ת��Ϊ�ַ�
		 	if(keycode>128 && keycode<256) keycode-=128;
			nstr=String.fromCharCode(keycode)
	  }
	  
  	if(this.validchars!=null){
  		if(this.validchars.indexOf(nstr)==-1) return false;
  	}
		if(this.notvalidchars!=null){
  		if(this.notvalidchars.indexOf(nstr)>-1) return false;
  	}
  	if(this.validreg!=null){
  		if(!eval('('+this.validreg+')').test(nstr)){
  			return false;
  		}
  	}
  	if(this.notvalidreg!=null){
  		if(eval('('+this.notvalidreg+')').test(nstr)) return false;
  	}

		return true;  	
  }
  
  var validinput=function(){
  	var txt=this.value,char,i=0,v=[],f=false;
  	
  	for(l=txt.length;i<l;i++){
  		char=txt.charAt(i)
  		if(!valid.apply(this,[char])){
  			Ext.lt.HTML.minitips(this,char+'&nbsp;����¼��');
  			f=true
  		}
  		else v.push(char);
  	}
  	
  	if(f){
			r = document.selection.createRange(); 
			r.collapse(false); 
			r.setEndPoint("StartToStart", this.createTextRange());
			point= r.text.length;
  		this.value=v.join('');
			r.move("character", point-1); 
			r.select();
  	}
  	return true;
  }
  
  var inputdefaulttips=function(en){
  	if(en.type=='focus'){
  		if(this.value==this.tipstext){
  			this.value='';
  		}
 			this.runtimeStyle.color='';
  	}
  	else if(en.type=='blur'){
  		if(this.value==this.tipstext || this.value.trim()==''){
  			this.runtimeStyle.color='#ccc';
  			this.value=this.tipstext;
  		}
  	}
  }
  
  
  // ��֤����������
  var validClipboardData=function(){
		var clipdata=window.clipboardData.getData('Text');
  	if(clipdata==null) return true;
  	var char
  	for(var i=0,l=clipdata.length;i<l;i++){
  		char=clipdata.charAt(i)
  		if(!valid.apply(this,[char])){
  			alert("�������а�����ֹ¼����ַ�-> "+char+"\r\n����������Ϊ��"+clipdata);
  			return false;
  		}
  	}
  	return true;
  }
  
  var inputsetvalue=function(v){
  	this.value=v==null?'':v
  }
  
  // HTMLԪ�����÷���
  var htmlelementreset=function(){
		this.value=this.defaultValue;
  	if(window.event.type!='blur'){
			this.fireEvent('onblur');
		}
  }
  
  // ��������¼���ʧȥ������û�¼�����ݰ󶨵����ݼ���
  var htmlelementbind=function(){
		if(this._binddataset==null) return;
		if(this.type=='radio' || this.type=='checkbox'){
			// ��ѡ�����ѡ��ֻ��ѡ��ʱ�Ÿ��İ�����
			if(this.checked) this._binddataset[this.name]=this.value;
		}
		else if(this.type=='text' || this.type=='password'||this.tagName=='TEXTAREA'){
			this._binddataset[this.name]=this.value==''?null:this.value;
		}
		if(Ext.lt.isFunction(this.onafterbind)) this.onafterbind();
  }
  
  // ����Ԫ��HTML���Զ�����HTML��ժ
  var innerHTMLsetter=function(html){
  	if(html==null) return;
  	this.innerHTML=html;
  	Ext.lt.HTML.expand(this)
  }
  
  this.setInnerHTML=function(el,html){
  	el.setInnerHTML=innerHTMLsetter;
  	el.setInnerHTML(html);
  }
  
  // ��HTML�ṹ���������Ա�ǩ������չ
  // ������ǩ�а���ignoreexpand=true�ı�ǩ��������չ
  _expand=function(el){
  	if(el==null) return;
  	if(el==document) return;
  	if(el.getAttribute("ignoreexpand")=="true") return;
		_expandHTMLElement(el);
		
		var subels=el.children;
		for(var i=0,l=subels.length;i<l;i++){
			_expand(subels[i])
		}
  }
  
  // �����е�HTMLԪ�غܶ࣬��ȫ��������չû�б�Ҫ����ˣ���������ɸѡ����
  this.expand=function(el){
  	function HTMLElementExpandTestPoint(){}
  	HTMLElementExpandTestPoint();
  	_expand(el);
  	return;  	
  	
		if(el!=document)
			_expandHTMLElement(el);
		var els=el.all;
		// ��������Ԫ���Ƿ�ʹ��ָ����ǩ
		for(var i=0,l=els.length;i<l;i++){
			_expandHTMLElement(els(i));
		}  	
  }
  
  // ����������롢�Ƴ������ʱ����ʽ���ƣ������� overclass overstyle clickclass clickstyle switchstyle switchclass switchgroup switch
  Ext.lt.onload(function(){
		if(document.hoverfinish) return;
		Ext.lt.HTML.expand(document.body);
		document.hoverfinish=true;
  });
	
	
	
	/*
	******************************************
	minitips
	******************************************
	<div class="minitips">
	  <div class="popHeader">
	    <div class="popLeft"></div>
	    <div class="minitipsText"><span class=\"popIcon wrong></span>�����������û�����</div>
	    <div class="popRight"></div>
	  </div>
	  <div class="popAngle"><span></span></div>
	</div>
	*/
	var tipsdiv=null, tipsmsgdiv=null;
	var _lastinputtime=0;
	this.minitips=function(el,txt,p){
		if(tipsdiv==null){
			tipsdiv=document.createElement('DIV');
			tipsdiv.className='minitips';
			tipsdiv.innerHTML='<div class="popHeader"><div class="popLeft"></div><div class="minitipsText"><span class="popIcon wrong"></span>�����������û�����</div><div class="popRight"></div></div><div class="popAngle"><span></span></div>';
			tipsmsgdiv=tipsdiv.firstChild.children.item(1);
			tipsdiv.style.display='none';
			document.body.appendChild(tipsdiv)
		}
		tipsmsgdiv.innerHTML='<span class="popIcon wrong"></span>'+txt;
		var p=Ext.lt.HTML.positionedOffset(el);
		tipsdiv.style.display='';
		tipsdiv.style.top=(p.top-tipsdiv.offsetHeight)+'px';
		tipsdiv.style.left=p.left+'px';
		
		_lastinputtime=new Date()
		window.setTimeout(function(){
			if(new Date()-_lastinputtime>=1500) tipsdiv.style.display='none';
		},2000);
	};
	
	var _promptValue=null;
	var _promptInput="<div style='width:360px' class='prompt'><input type='text' style='width:350px' onkeypress ='Ext.lt.message.send(\"prompt\",\"onkeypress\")' id='prompt_input' value=''></div>"
	
	Ext.lt.onload(function(){
		Ext.lt.message.hook('assistfn','prompt',function(){return _promptInput;});
		Ext.lt.message.hook("prompt","onkeypress",function(){
			if(event.keyCode==13){
				event.srcElement.parentElement.parentElement.nextSibling.firstChild.onclick();
			}
		});
		Ext.lt.message.hook('alert','show',function(){
			var input=document.getElementById('prompt_input');
			if(input==null) return;
			input.focus();
		});
		Ext.lt.message.hook('alert','close',function(button){
			var ipt=document.getElementById('prompt_input');
			if(ipt==null) return;
			if(button.innerText!=''){
				_promptValue=ipt.value;
			}else{
				_promptValue=null;
			}
			ipt.value='';
			Ext.lt.message.send('prompt','close');
		});
	});
	
	this.prompt={
		show:function(msg){
			_promptValue=null;
			window.alert(msg,'prompt');
		},
		getValue:function(){
			return _promptValue;
		}
	};
}

Ext.lt.HTML.select=function(config)
{
	var _cfg=Ext.lt.apply({id:'selectdemo'+Ext.lt.getNextSeqValue(),nullvalue:true,className:''+'selectclass'},config);
	var obj={};
	var _id=_cfg.id; 
	var rs=_cfg.data;
	var _class=_cfg.className;
	var _style =_cfg.style;
	var _value = _cfg.value;
	var _nullvalue = _cfg.nullvalue&true;
	var _nullvaluehtml = '<option value=""></option>';
	var _valuefield = _cfg.valuefield?_cfg.valuefield:'v';
	var _textfield = _cfg.textfield?_cfg.textfield:'t';
	var _selobj = {};
	
	obj.draw=function(d){
		// ����������HTML����
		var str1=['<select id = "',_id,'" class  = "',_class,'" style ="',_style,'" ', '>'];
		// �ж��Ƿ���ʾ������
		if(_nullvalue) str1.push(_nullvaluehtml);
		for(var i=0;l=rs.length,i<l; i++){
			str1.push('<option value="' , rs[i][_valuefield], '" >',rs[i][_textfield], '</option>');
		}
		str1.push("</select>");
		d.innerHTML=str1.join('');
		// ��ȡ���������		
		_selobj=d.firstChild;
		// ����Ĭ��ֵ
		obj.setValue(_value);
		// ����onselected�¼�����
		_selobj.onchange=function(en){
			var rt=true;
			if(obj.onselected!=null){
				var data=obj.getData();
				if(data==null){
					rt=obj.onselected(null,null,null);
				}
				else{
					rt=obj.onselected(data,data[_valuefield],data[_textfield]);
				}
			}
			if(rt==false) return rt;
			
			if(obj.onchange!=null){
				rt=obj.onchange.apply(_selobj,en)
			}
			
			return rt;
		}
	}
 
	obj.getId=function(){
		return _id;
	}
	
	obj.getValue=function(){
		  return _selobj.value; 
	}
	
	obj.setValue=function(v){
		_selobj.value=v
		return;
	}
	
	obj.getText = function(){
		var d=obj.getData()
		return d==null?null:d[_textfield];
	}
  
	obj.getData=function(){
		var selid=_selobj.selectedIndex;
		return rs[selid-(_nullvalue?1:0)];
	}
	
	return obj;	
}


Ext.lt.Qtree=function(cfg){
	// ���ݼ��ṹΪ[{itemid:,code:,name:,level:,isleaf:,superitemid:,},����]
	var _config=Ext.lt.apply({data:{},doRootSelected:false,endlevelselect:false,el:null,field:{id:'itemid',name:'name',code:'code',sid:'superitemid',level:'level',isleaf:'isleaf',tps:'tps'},outformart:'#code-#name',showRootNode:false,rootNode:null,selectmode:false,values:[],on:{},viewmodel:'tree',linkchild:false,expandlevel:1,expand:null,parentlinksub:true,isexpand:true,contextmenudata:null,search:false,search_attribute:'*',complementary:true},cfg);
	var contextmenudata=_config.contextmenudata;
	var _id='qtree'+Ext.lt.getNextSeqValue();
	// ��ѡ��״̬��Ĭ��Ϊfalse
	var _indeterminate=_config.indeterminate==true;
	//�Ƿ��Զ���ѡȫ��Ĭ��ֵ/Ĭ��ֵ��true
	var _complementary=_config.complementary==true;
	// ���ݼ�
	var _data=(_config.data==null)?[]:(_config.data.toArray());
	    _data.size=_data.length;
	var _data_bak=_data; // �����������ݹ���������ʹ�øö��󱣴�ԭʼ���ݼ�
	    _data_bak.size=_data_bak.length;
	var _maxlength=50;
	if(_data.getMaxColDataLength!=null){
		var _coldatalength=_config.data.getMaxColDataLength();
		for(var i=0;i<_coldatalength.length;i++){
			_maxlength=_maxlength>_coldatalength[i]?_maxlength:_coldatalength[i];
		}
	}
	var _doRootSelected=_config.doRootSelected;
	//���ó�ʼ������չ��
	var _onclick_expand=false;
	if(_config.expand=='click'){
		_onclick_expand=true;
	}
	if(_config.clickexpand==true){
		_onclick_expand=true;
	}
	//���õ��չ�����
	var _onclick_expandlevel=1;
	if(_config.clickexpandlevel!=null){
		_onclick_expandlevel=_config.clickexpandlevel;
	}
	
	// �������ݹ�����������������Ϊ������������б�����Ҫ���˵�������
	// ƥ���ֵ����Ϊ�������Ա��� _filter._kXXX_vXXX=true ������ٹ�������ֵ��,�����Ϲ������������ݣ���ѡ�����Խ��Զ�ɾ��
	var _filter=[];
	// ���ݼ��������ֶ���
	var _fields=[];
	// ������ȾĿ��HTML����
	var _tagel=_config.el;
	// ����id������
	var _field_id=_config.field.id;
			_fields[_field_id]='';
			_fields.push(_field_id);
	var _preid='PK_'
	// ����name����
	var _field_name=_config.field.name;
			_fields[_field_name]='';
			_fields.push(_field_name);
	// ����code����
	var _field_code=_config.field.code;
			_fields[_field_code]='';
			_fields.push(_field_code);
	// �����ϼ�ID������
	var _field_sid=_config.field.sid;
			_fields[_field_sid]='';
			_fields.push(_field_sid);
	// ��Ƽ���������
	var _field_level=_config.field.level;
			_fields[_field_level]='';
			_fields.push(_field_level);
	// �����Ƿ�ĩ����������ʹ��true��false��0��1
	var _field_isleaf=_config.field.isleaf;
			_fields[_field_isleaf]='';
			_fields.push(_field_isleaf);
	// ��ʾѡ�е�����
	var _field_checked='_checked'
			_fields[_field_checked]='';
			_fields.push(_field_checked);
	// ����Ĭ����ʾ��ʽ
	var _formart=_config.outformart;
	// ���������ʽ�ĺ���
	var _formartfn=_config.outformartfn;
	// �Ƿ�������ڵ㣬Ĭ��Ϊfalse��
	var _showRootNode=_config.showRootNode;
	// �Ƿ��Զ�չ��,Ĭ��ֵΪtrue��
	var _isexpand = _config.isexpand;
	// ���ڵ�ֵ����
	var _rootnodeobject=_config.rootNode;
	if(_rootnodeobject==null){
		_rootnodeobject={'name':'ȫ��'}
		_rootnodeobject[_field_id]='QTreeAllNode';
		_rootnodeobject[_field_sid]='QTreeRootNode';
		_rootnodeobject[_field_isleaf]=1;
	}
	var _rootnode=null;
	// �Ѿ�����HTML����Ľڵ����飬�ڵ�������顢�����ϴ洢��ʽ�������Ҫ�������԰����鷽ʽѰԵ_treenode���󣬱������нڵ㡣
	// �����Ҫͨ������ID���Ҿ���Ľڵ�������ͨ���ö����'node'+dataid�ķ�ʽ���ҽڵ�
	var _treenode=[];
	
	// ����ѡ��
	var _disabled=_config.disabled==true;

	// ѡ��ģʽ false-��ѡ��  radio��1-��ѡ  checkbox��n-��ѡ
	var _selectmode=_config.selectmode;
	var _endlevelselect=_config.endlevelselect==true;
	var _select_formart=''
	if(_selectmode==1 || _selectmode=='radio'){
		// ȡ����ѡ����
		_selectmode=null
	}
	else if(_selectmode=='n' || _selectmode=='checkbox'){
		_selectmode='n';
		_select_formart='<input type="checkbox" name="'+_id+'" dataid="#'+_field_id+'" value="#'+_field_id+'" #'+_field_checked+' '+(_disabled?'disabled':'')+'/>';
	}
	
	var _viewmodel=_config.viewmodel;
	var _oldviewmodel=_viewmodel;
	var _linkchild=_config.linkchild==true&&_selectmode=='n'&&_viewmodel=='tree';
	var _linkchildonchecked=_linkchild;
	var _linkchildonunchecked=_linkchild;
	    if(_config.linkchildonchecked!=null) 
	    	_linkchildonchecked=_config.linkchildonchecked==true;
	    if(_config.linkchildonunchecked!=null) 
	    	_linkchildonunchecked=_config.linkchildonunchecked==true;
	var _linkparend=_config.linkparend==true&&_selectmode=='n'&&_viewmodel=='tree';
	var _parentlinksub=_config.parentlinksub==true;
	var _bodydblselect=_config.bodydblselect==true; // ˫��ǿ��ѡ��
	//�Զ�����ʽ��
	var _classname = _config.classname ? _config.classname : "";
	
	var _lastSelected={className:'',getAttribute:function(attr){return this[attr]}};
	// �첽������־
	var _sync=false;
	// �첽���ݷ�ֵ
	var _sync_value=_config.syncvalue==null?100:isNaN(_config.syncvalue)?100:_config.syncvalue<1?100:_config.syncvalue;
	
	
	// Ĭ��ѡ��ֵ
	var _values=_config.values==null?[]:_config.values;
	if(_values!=null) for(var i=0;i<_values.length;i++) _values[_preid+_values[i]]='checked';
	
	// ��ʾ����������
	var _search=_config.search==true;
	var _searchdiv=null;
	var _search_attribute=_config.search_attribute;
	var _search_key={};
	if(_search_attribute=='*' && _data.length>0){
		_search_attribute=[];
		var d=_data[0];
		for(attr in d){
			if(typeof(attr)=='string'){
				_search_attribute.push(attr);
			}
		}
	}
	if(_search){
		_search_key={'enter':_config.search_enter==true,'keypress':_config.search_keypress!=false,'button':true,'blue':_config.search_blur!=false};
	}
	var _search_match=_config.search_match==null?'left':_config.search_match;
	
	var keypress=_config.keypress==true;
	
	// ��Ԫ�أ�������ݼ�û�и�Ԫ��������ȱʡ��Ԫ�أ�һ����Ϊ_field_sid����Ϊnull��0�Ķ���Ϊ���ڵ�
	var _root=[];

	
	// ��������ʾ�������ݽ��д���
	var _initRootData=function(){
		_root=[];
		
		// �����ȫѡ�ڵ㣬�����Ӵνڵ�
		if(_showRootNode){
			_root.push(_rootnodeobject);
			_root['dataid_'+_rootnodeobject[_field_id]]=_rootnodeobject;
		}
		
		// �����������ĸ�Ŀ¼���ӵ�root�У����й���������ʱ���������ݶ��γ�List�ṹ
		if(_viewmodel=='tree'){
			var temp
			for(var i=0,l=_data.length;i<l;i++){
				temp=_data[i]
				if(_filter.length>0){
					_root.push(temp);
					_root['dataid_'+temp[_field_id]]=temp;
				}
				else if((temp[_field_sid]==0&&(temp[_field_sid]+'').length<=1) || temp[_field_sid]==null || 
					temp[_field_level]==1 || _data[_preid+temp[_field_sid]]==null){
					_root.push(_data[i]);
					_root['dataid_'+_data[i][_field_id]]=_data[i];
				}
			}
		}
		else{
			_root=_root.concat(_data)
		}
		
		// ���ø��ڵ�ĳ���
		_root.size=_root.length;
		// �����첽���ر�־
		_sync=_root.size>=_sync_value
		
	}
	
	// ���������ݽ��й��ˣ������������Ϊ����ֱ�ӷ���
	var _filterData=function(regfilter,checkflag){
		_subnodes=null;
		if(_filter.length==0){
			_data=_data_bak;
			_viewmodel=_oldviewmodel
			return;
		}
		_viewmodel='list';

		// ������ݼ�
		_data=[];
		
		// ������ƥ�������ƴ��һ���ַ����У���ʽ$@xxxxx$%dataid$@xxxxx$%dataid
		// Ŀǰ�����������ʵ�ַ����ٶȲ�࣬��Ҫ���������ڵ���������̫��ʱ�ٶȻ���
		var searchText=[];
		var l=_filter.length,d
		for(var i=0;i<_data_bak.size;i++){
			d=_data_bak[i]
			if(checkflag==true)d[_field_checked]='';
			for(var j=0;j<l;j++){
				searchText.push('##',d[_filter[j]])
			}
			searchText.push('%%',d[_field_id],'\n');
		}
		
		// �����������ʽƥ��
		var tmp=searchText.join('').match(regfilter),d;
		
		if(tmp!=null){
			tmp=tmp.join('\n').replace(/.*%%(.*)/ig,'$1').split('\n');
			for(var i=0,l=tmp.length;i<l;i++){
				d=_data_bak[_preid+tmp[i]]
				_data.push(d);
				if(checkflag==true)d[_field_checked]='checked';
				_data[_preid+tmp[i]]=d
			}
		}
		
		_data.size=_data.length;
	}
	
	var _t,_superIds={};
	var _supkeys={}//�洢��ǰ�ڵ���ӽڵ㡣����˭
	//�ж��Ƿ����ּ���Ĭ��ֵ��
	//1.selectmode�Ƕ�ѡ��2.��tree����
	var _modeType=_selectmode=='n'&&_viewmodel=='tree'&&(_linkchildonchecked||_linkparend);
	// �����ݼ�ת��Ϊ���������Ľṹ
	for(var i=0,l=_data.size;i<l;i++){
		_t=_data[i];
		// ��ֹidΪ���֣��������PKǰ׺
		_data[_preid+_t[_field_id]]=_t;
		
		// ����ѡ������
		_t[_field_checked]=_values[_preid+_t[_field_id]]
		
		// �Ƿ�ĩ���ڵ�Ϊ����Ĭ��ĩ���ڵ�
		if(_t[_field_isleaf]==null) _t[_field_isleaf]=1;
		else if(_t[_field_isleaf]==true) _t[_field_isleaf]=1
		else if(_t[_field_isleaf]==false) _t[_field_isleaf]=0
			
		// ����Ϊ����Ĭ��Ϊ1��
		if(_t[_field_level]==null) _t[_field_level]=0;
		_superIds[_preid+_t[_field_sid]]=true;
		//Ҫ��ѡ״̬��
		if(_modeType&&_complementary){
			//���ø��ڵ㡣
			if(_supkeys[_preid+_t[_field_sid]]==null){
				_supkeys[_preid+_t[_field_sid]]=[_t[_field_id]];
			}else{
				_supkeys[_preid+_t[_field_sid]].push(_t[_field_id]);
			}
		}
	}
	
	// ����Ƿ�ĩ����־
	for(var i=0,l=_data.size;i<l;i++){
		_t=_data[i];
		// ����ĩ���ڵ������Ƿ����ҵ��¼�����
		_superIds[_preid+_t[_field_id]]==true?_t[_field_isleaf]=0:_t[_field_isleaf]=1;
		
	}
	//��ʼ���ʼĬ��ֵ��
		//if(_values!=null) for(var i=0;i<_values.length;i++) _values[_preid+_values[i]]='checked';
	var _allcheck_sid={};
	var _indeterminate_values={};//�빴ѡ����
	var _values_baks=[];
	if(_modeType&&_complementary){
		for(var i=0,l=_values.length;i<l;i++){
			_setDefValues(_values[i]);
		}
	}
	function _setIndeterminate(){
		if(!_complementary)return;
		for(var e in _indeterminate_values){
			if(_treenode['node'+_indeterminate_values[e]]!=null){
				var node=_treenode['node'+_indeterminate_values[e]];
				if(node.body.select!=null&&!node.body.select.checked){
					node.body.select.indeterminate=true;
				}
			}else if(_indeterminate_values[e]==0||_indeterminate_values[e]=='0'){
				if(_showRootNode&&_rootnode!=null&&!_rootnode.body.select.checked){
					_rootnode.body.select.indeterminate=true;
				}
			}
		}
	}
	//1.���ڵ㹴ѡ���¼�ȫѡ��
	//2.ѡ�и��ڵ㣬���治ѡ�������Ӽ���
	//3.�Ӽ�ȫѡ�����ڵ㹴ѡ
	//4.�Ӽ���ѡ�����ڵ㹴ѡ��
	//5.�빴ѡ��
	//6.ʲô��û��ϵ��
	
	function _setDefIndeterminate(keys){
		if(!_complementary)return;
		if(keys==null||keys==''||keys=='QTreeRootNode')return;
		//��ǰ�ڵ㱻���ù��ˡ�
		if(_indeterminate_values[_preid+keys]!=null){
			return ;
		}
		if(_values_baks[_preid+keys]!=null){
			return ;
		}
		_indeterminate_values[_preid+keys]=keys;
		if(keys==0||keys=='0'){
			_indeterminate_values[_preid+0]='0';
			return;
		}
		if(_data[_preid+keys]==null)return;
		if(_data[_preid+keys][_field_checked]=='checked')return;
		_setDefIndeterminate(_data[_preid+keys][_field_sid]);
	}
	
	function _setDefValues(keys,dc,dp){
		if(!_complementary)return;
		if(keys==null||keys==''||keys=='QTreeRootNode')return;
		//��ǰ�ڵ㱻���ù��ˡ�
		if(_values_baks[_preid+keys]!=null){
			return ;
		}
		_values_baks.push(keys);
		_values_baks[_preid+keys]='checked';
		if(_data[_preid+keys]==null)return;
		_data[_preid+keys][_field_checked]='checked';
		//��Ҫ�㸸�ڵ��
		if(_linkparend){
			var sid=_data[_preid+keys][_field_sid];
			if(!_parentlinksub){
				//1.�͸�_parentlinksub==false   �¼�ֻҪ��һ���ڵ�ѡ�У���ѡ���ϼ�
				//ֻ���Ҹ��ڵ㡣���ÿ����Ӽ��������⡣
				_setDefValues(sid,false)
			}else{
				//2._parentlinksub==true
				
				if(_allcheck_sid[_preid+sid]==null){
					_allcheck_sid[_preid+sid]=0;	
				}
				_allcheck_sid[_preid+sid]++;
				
				if(_allcheck_sid[_preid+sid]==_supkeys[_preid+sid].length){
					_setDefValues(sid);
				}else{
					//���ð빴ѡ
					if(_indeterminate){
						_setDefIndeterminate(sid)
					}
				}
			}
		}
		//��Ҫ���ӽڵ��
		if(_linkchildonchecked&&(dc==null||dc)){
			var arr=_supkeys[_preid+keys]
			if(arr!=null){
				for(var i=0,l=arr.length;i<l;i++){
						_setDefValues(arr[i])
				}
			}
			
		}
	}
	if(_modeType&&_complementary){
		_values = _values_baks
	}
	function getselectpath(dataid){
		var _t=_data[_preid+dataid],_tmp=[];
		
		while(_t!=null){
			_tmp.push(_t[_field_id]);
			if(_t[_field_sid]==0) break;
			_t=_data[_preid+_t[_field_sid]];
		}
		// ��ת˳��
		_tmp.reverse();
		return _tmp;
	}
	
	// Ϊѡ��ֵ����ѡ��·��
	var _t,_tmp;
	for(var i=0,l=_values.length;i<l;i++){
		_values['path:'+_values[i]]=getselectpath(_values[i]);
	}
	
	_filterData();
	_initRootData();

	// �������ģ��
	var _template=new Ext.lt.out.template(_select_formart+(_formartfn==null?_formart:''));
	if(_endlevelselect){
		var _unendlevel_template=new Ext.lt.out.template(_formartfn==null?_formart:'');
	}
	// ��ȡ����ֶ��б�
	if(_data.length>0){
		var v=_data[0];
		for(var f in v){
			if(!Ext.lt.isFunction(v[f])){
				if(_fields[f]==null){
					_fields[f]=''
					_fields.push(f);
				}
			}
		}
	}
	_template.setField(_fields);
	if(_endlevelselect) _unendlevel_template.setField(_fields);

	
	// �����ϼ�ID��ȡ�¼�����
	var _subnodes=null;
	function _getSubData(sid){
		if(_subnodes==null){
			_subnodes={}
			var t=[],d,_sid;
			for(var i=0,l=_data.size;i<l;i++){
				d=_data[i],_sid=d[_field_sid];
				if(_subnodes[_sid]==null) _subnodes[_sid]=[]
				_subnodes[_sid].push(d);
			}
		}
		return _subnodes[sid]==null?[]:_subnodes[sid];
	}
	
	
	// ��������HTML����
	function _buildTreeHTML(){
		var start=new Date();
		var _popHTML=[];
		var _subHTML=[];
		var ele,cls,end='0';
		var i=0,out,maxlength=1,dataid

		// ����ȫѡ�ڵ�
		if(_showRootNode){
			ele=_root[i];
			_popHTML.push('<div class="rootitem" type="node" stat="open" stat="close" level="0" isleaf="',ele[_field_isleaf],'"  end="',end,'" dataid="',ele[_field_id],'"><div level=0 class="qbody" type="body" class="qbody" end="',end,'" dataid="',ele[_field_id],'" style="width:250px"><font class="link" overclass="overlink">',((_endlevelselect==true)?_unendlevel_template.out(ele):_template.out(ele)),(_formartfn!=null?_formartfn(ele):''),'</font></div></div>');
			i++;
		}

		for(;i<_root.size;i++){

			// ����һ����๹��200�ڵ�
			if(i<_sync_value){
				_popHTML.push(_buildRootNodeHTML(_root[i],i));
			}
			else{
				break;
				_subHTML.push(['<div id=',_id,'_node_',dataid,' class="item" stat="close" type="node" level="0" isleaf="',ele[_field_isleaf],'" end=',end,' dataid=',dataid,'><span class=',cls,'></span><div type="body" class="qbody" level=0 end=',end,' dataid=',dataid,'><font class="link" overclass="overlink">',((_endlevelselect==true&&ele[_field_isleaf]==false)?_unendlevel_template.out(ele):_template.out(ele)),(_formartfn!=null?_formartfn(ele):''),'</font></div></div>'].join(''));
			}
			
		}
		return [_popHTML.join(''),_subHTML];
	}
	
	function _buildRootNodeHTML(ele,i){
			var cls='itemclose',end='0',i=i==null?0:i
			if(ele[_field_isleaf]==1) cls='rootline'; // û���ֶ�
			if(i==_root.size-1){
				cls+='-nl'
				end='1'
			}
			var dataid=ele[_field_id]
		
		return ['<div id=',_id,'_node_',dataid,' class="item" stat="close" type="node" level="0" isleaf="',ele[_field_isleaf],'" end=',end,' dataid=',dataid,'><span class=',cls,' type=i></span><div type="body" class="qbody" level=0 end=',end,' dataid=',dataid,'><font class="link" overclass="overlink">',((_endlevelselect==true&&ele[_field_isleaf]==false)?_unendlevel_template.out(ele):_template.out(ele)),(_formartfn!=null?_formartfn(ele):''),'</font></div></div>'].join('')
	}
	
	// ����˫���¼�
	function _body_dblclick(){
		if(!_onclick_expand){
			this.parentElement.fireEvent('onclick');
		}
		
		var node=_treenode['node'+this.getAttribute('dataid')];
		if(node!=null){
			if(node.body.select!=null && !_disabled){
				if(_bodydblselect){
					node.body.select.checked=true;
				}
				else{
					node.body.select.checked^=true;
				}
			}
			if(node.body.select!=null) _check_click.apply(node.body.select)
		}
		
	};
	// ����ѡ�к���ʽ
	function _body_click_style(){
		var dataid=this.getAttribute('dataid');

		// ������ʽ
		if(_lastSelected!=this){
			// û������ѡ��ģʽ��ͨ��body�ĵ������ѡ������
			if(_selectmode!='n'){
				if(_lastSelected.getAttribute!=null && _lastSelected.getAttribute('dataid')!=""+_rootnodeobject[_field_id] && _data[_preid+_lastSelected.getAttribute('dataid')]!=null) _data[_preid+_lastSelected.getAttribute('dataid')][_field_checked]=null;
				if(this.getAttribute('dataid')!=""+_rootnodeobject[_field_id]) _data[_preid+this.getAttribute('dataid')][_field_checked]='checked';
			}

			_lastSelected.className=_lastSelected.className.replace(' selected','');
			_lastSelected=this;
			this.className+=' selected';			
		}
		if(_onclick_expand){
			_node_click_load.apply(this.parentElement,[false,_onclick_expandlevel])
		}

		_fireEvent('onnodeclick',{body:this,node:this.parentElement,data:_data[_preid+this.getAttribute('dataid')]});
	}

	// �����¼����ݼ����¼�,flagΪǿ��չ����־
	function _node_click_load(flag,expandlevel,bodyclick){
		// ֻ��������Ҫ�����¼��ڵ����
		if(_viewmodel!='tree') return;
		// ���������ڵ����˳�������
		var dataid=this.getAttribute('dataid');
		if(dataid==_rootnodeobject[_field_id]) return;
		if(dataid==null&&this.firstChild.getAttribute('dataid')==_rootnodeobject[_field_id]){
			return;
		}
		flag=flag==true;
		expandlevel=expandlevel==null?1:expandlevel;
		bodyclick=bodyclick!=false;
		// ĩ���ڵ㲻��Ҫ�����¼����ݵļ���
		if(this.getAttribute('isleaf')==1) return;
		
		var stat=this.getAttribute('stat');
		if(stat==null&&this.getAttribute('level')==null)return;
		var icon=this.children.item(parseInt(this.getAttribute('level'),10));
		if(this.getAttribute('stat')=='close' || flag){
			// �����ڵ�ر���ʽ���򻻳ɸ��ڵ��
			icon.className=icon.className.replace('itemclose','itemopen');
			this.setAttribute('stat','open');
			if(this.subtree==null){
				// �����¼�����
				var ul=document.createElement('DIV'),html=[];
				ul.superitem=this;
				var level=parseInt(this.getAttribute('level'),10)+1
				var dataid=this.getAttribute('dataid');
				var subeles=_getSubData(dataid);
				    subeles.size=subeles.length;

				
				var ele,rootpath=[this],end=0,spclass='line'
				
				var sel=this.parentElement.parentElement; // ��ȡ�ϼ�����DIV����
				while(sel!=null && _tagel.contains(sel)){
					rootpath.push(sel);
					if(sel.getAttribute('level')==0) break;
					if(sel.parentElement==null) break;
					sel=sel.parentElement.parentElement; // ��ȡ�ϼ�����UL����
				}
				
					var spclass='line',spanhtml=[];
					//ֻ����������span
					if(_viewmodel=='tree'){
						// ����֮ǰ��ε�����
						for(var j=level-1;j>-1;j--){
							if(rootpath[j].getAttribute('end')==1){
								spclass='line-nl'
							}else{
								spclass='line';
							}
							spanhtml.push('<span class=',spclass,' type=i></span>');
						}
					}
				
				for(var i=0;i<subeles.size;i++){
					ele=subeles[i];
					cls='itemclose'
					if(ele[_field_isleaf]==1) cls='itemnomorl'; // û���¼��ֶ�
					if(i==subeles.size-1){
						cls+='-nl';
						end='1';
					}
					
					html.push('<div type="node" class="item" stat="close"  level="',level,'" isleaf="',ele[_field_isleaf],'" end=',end,' dataid=',ele[_field_id],'>');

					html.push(spanhtml.join(''),'<span class=',cls,' type=i></span><div type="body" class="qbody" level=',level,' end=',end,' dataid=',ele[_field_id],'><font class="link" overclass="overlink">',((_endlevelselect==true&&ele[_field_isleaf]==false)?_unendlevel_template.out(ele):_template.out(ele)),(_formartfn!=null?_formartfn(ele):''),'</font></div></div>');
				}

				ul.innerHTML=html.join('');
				// ׷���¼��ڵ�
				this.subtree=ul;
				this.appendChild(ul);
				
				// ��������Ϊ
				var items=ul.children,it,txtlength,txtmaxlength=0;
				items.size=items.length;
				for(var i=0;i<items.size;i++){
					it=items.item(i);
					it.body=it.lastChild
					if(_selectmode=='n')it.body.select=it.body.getElementsByTagName('INPUT').item(0);
					// ׷��node����
					_treenode.push(it);
					_treenode['node'+it.getAttribute('dataid')]=it;
					txtlength=it.innerText.length;
					txtmaxlength=txtmaxlength>txtlength?txtmaxlength:txtlength
				}
				ul.style.width=(txtmaxlength*17+40+level*20)+'px'
			}
			this.subtree.style.display='';
			
			if(expandlevel>1 || expandlevel<0){
				var subids=_getSubData(this.getAttribute('dataid'));
				for(var i=0,l=subids.length;i<l;i++){
					_tree.nodeExpand(_tree.getNode(subids[i][_field_id]),expandlevel-1);
				}
			}
		}
		else if(this.getAttribute('stat')=='open'){
			// �����ڵ����ʽ���򻻳ɸ��ڵ�ر�
			icon.className=icon.className.replace('itemopen','itemclose');
			this.setAttribute('stat','close');
			
			// �����¼��б�
			if(this.subtree==null){
				var childs=this.children;
				childs.size=childs.length;
				for(var i=0;i<childs.size;i++){
					if(childs.item(i).tagName=='UL'){
						this.subtree=childs.item(i);
						break;
					}
				}
			}
			if(bodyclick && this.subtree!=null && _lastSelected!=null && _lastSelected.all!=null && this.subtree.contains(_lastSelected)){
				this.body.fireEvent('onclick');
			}
			this.subtree.style.display='none';
		}
		else{
		//	alert('���ڵ�״̬���󣬱���Ϊopen��close֮һ')
		}
	}

	// ��ѡ��ģʽ��������Ҫ�󶨵�ѡ�򡢸�ѡ�����Ϊ
	var _last_checkbox=null;
	function _check_click(){
		if(_disabled) return false;
		var dataid=this.getAttribute('dataid');
		var obody=this.parentElement.parentElement;
		if(dataid==_rootnodeobject[_field_id]){
			// ȫѡ�ڵ� ��������������
			for(var i=0;i<_data.size;i++){
				_data[i][_field_checked]=this.checked?'checked':null;
			}
			// �������н�������ʾ��ѡ����ѡ��״̬
			var eles=_tagel.getElementsByTagName('INPUT');
			    eles.size=eles.length;
			for(var i=0;i<eles.size;i++){
				if(eles[i].type=='checkbox' || eles[i].type=='radio') eles[i].checked=this.checked;
			}
			_fireEvent('onchange',{body:obody,node:obody.parentElement,data:_data[_preid+obody.getAttribute('dataid')]});
			return;
		}
		
		_data[_preid+dataid][_field_checked]=this.checked?'checked':null;
		
		// ��Ҫ�������¼�ѡ������
		if(this.checked && _linkchildonchecked){
			_syncchildnode(dataid,true);
		}
		else if(!this.checked &&_linkchildonunchecked){
			_syncchildnode(dataid,false);
		}
		
		if(_linkparend){
			// ����ϼ��ڵ�״̬
			_checkparentnode(dataid);
		}
			//if(this.checked ){
			if(_rootnode!=null&&_rootnode.body!=null&&_rootnode.body.select!=null){
				// ����Ƿ��Ѿ���ȫѡ
				var hashCheck=false;
				var hashNotCheck=false;
				var i=0,l=_data.size;
				for(;i<l;i++){
					if(_data[i][_field_checked]!='checked') {
						hashNotCheck=true;
					}else{
						hashCheck=true;
					}
					if(hashCheck&&hashNotCheck)break;
				}
				if(!hashNotCheck){//�϶�ȫ��ѡ��
					_rootnode.body.select.checked=true;
				}else{
					_rootnode.body.select.checked=false;
				}
				
				if(_indeterminate){
					//hashCheck&&hashNotCheck == tree&&true ������ѡ�к�ûѡ�еĲ���
					_rootnode.body.select.indeterminate=hashCheck&&hashNotCheck;
				}
			}
				
				// ����ǵ�ѡ��ť�������������һ��ѡ�����ݵ�ѡ��״̬
				if(this.type=='radio'){
					for(var i=0,l=_data.length;i<l;i++){
						_data[i][_field_checked]=(_data[i][_field_id]==dataid)?'checked':null;
					}
				}
		
		_fireEvent('onchange',{body:obody,node:obody.parentElement,data:_data[_preid+obody.getAttribute('dataid')]});
	}
	// ͬ���¼��ڵ����ݣ�����Ϊ�ڵ�ID
	function _syncchildnode(dataid,checkstatus){
		var sub=_getSubData(dataid),t,node;
		for(var i=0,l=sub.length;i<l;i++){
			t=sub[i];
			t[_field_checked]=checkstatus?"checked":null;
			node=_treenode['node'+t[_field_id]]
			if(node!=null) {
				node.body.select.checked=checkstatus;
				if(_indeterminate){
					node.body.select.indeterminate=false;
				}
			}
			_syncchildnode(t[_field_id],checkstatus);
		}
	}
	
	// ����ϼ��ڵ�״̬
	function _checkparentnode(dataid,subindeterminateflag){
		var sid=_data[_preid+dataid][_field_sid];
		if(subindeterminateflag==null) subindeterminateflag=false
		if(sid==null || sid==0 || _treenode['node'+sid]==null) return;
		// ���ͬ���ڵ��Ƿ�ȫ��ѡ��
		var sub=_getSubData(sid),i,l,flag=false,p=0;
		for(i=0,l=sub.length;i<l;i++){
			node=_treenode['node'+sub[i][_field_id]]
			if(node!=null&&(sub[i][_field_checked]=='checked'||node.body.select.indeterminate)) p++;
			indeterminateflag=indeterminateflag||sub[i][_field_checked]=='checked'
		}
		var flag=_parentlinksub?p==l:p>0
		// ��ѡ���ѡ��״̬
		var indeterminateflag=subindeterminateflag||(p>0&&p<l)
		
		_treenode['node'+sid].body.select.checked=flag;
		if(_indeterminate) _treenode['node'+sid].body.select.indeterminate=indeterminateflag;
		
		if(_data[_preid+sid]==null){
			return;
		}
		_data[_preid+sid][_field_checked]=flag?"checked":null;
		_checkparentnode(sid,indeterminateflag);
	}
	
	// �����¼�
	var _events=['onchange','onclick','onnodeclick','ondblclick','oncontextmenu'];
	for(var i=0;i<_events.length;i++){
		var fname=_events[i];
		if(_config.on[fname.substr(2)]!=null) _events[fname]=_config.on[fname.substr(2)];
	}
	
	if(_events['oncontextmenu']==null&&contextmenudata!=null){
		
		if(contextmenudata.correctionX==null){contextmenudata.correctionX=0}
		if(contextmenudata.correctionY==null){contextmenudata.correctionY=0}
		if(contextmenudata.selectColor==null){contextmenudata.selectColor=''}
		_events['oncontextmenu']=function(qtree,node){
			
			var qtreemenu=document.getElementById('qtree_menu');
			if(qtreemenu==null){
					qtreemenu=document.createElement("div");
					qtreemenu.id='qtree_menu';
					qtreemenu.className='popupmenu';
					document.body.appendChild(qtreemenu);
			}
		
			//var node={body:t,node:t.parentElement,data:_data[_preid+t.getAttribute('dataid')]};
			//debugger;
			
			var _menud=cfg.contextmenudata.data;
			for(var i=0,l=_menud.length;i<l;i++){
				if(_menud[i].click!=null){
					if(_menud[i]._click==null)_menud[i]._click=_menud[i].click;
					_menud[i].click=function(d){
						this._click(qtree,{body:node.body,node:node.node,data:_data[_preid+node.node.body.getAttribute('dataid')]},d);
					}
				}	
			}
			if(cfg.contextmenu==null){
				cfg.contextmenu=Ext.lt.Popupmenu(cfg.contextmenudata);
				cfg.contextmenu.draw(qtreemenu);
			}

			var x=document.documentElement.scrollLeft+event.x+contextmenudata.correctionX;
			var y=document.documentElement.scrollTop+event.y-event.offsetY+event.srcElement.offsetHeight+contextmenudata.correctionY;
			if(popupmenuOpenNode!=null){
				popupmenuOpenNode.runtimeStyle.cssText='';
			}
			//���õ�Ԫ��ѡ����ʽ��
			if(cfg.contextmenudata.selectColor!=null&&cfg.contextmenudata.selectColor!=''){
				node.body.firstChild.runtimeStyle.background=cfg.contextmenudata.selectColor
			}
			popupmenuOpenNode=node.body.firstChild
			qtreemenu.style.left=x+'px';
			qtreemenu.style.top=y+'px';
			qtreemenu.style.visibility='visible';
			cfg.contextmenu.show();
		}
	}
	var popupmenuOpenNode
	Ext.lt.message.hook("Popupmenu","closed",function(){
		if(popupmenuOpenNode!=null){
			popupmenuOpenNode.runtimeStyle.cssText='';
		}
	})
	function _getContextmenu(){
		if(cfg.contextmenu!=null){
			return cfg.contextmenu;	
		}
		return null;
	}
	
	function _fireEvent(eventname,params){
		var en=_events[eventname];
		if(en==null) return ;
		en(_tree,params);
	}
	
	// �����¼���Դ�������Node�ڵ����
	function _findNode(el){
		var obj={bodyclick:true};
		if(el.tagName=='INPUT'){
			obj.check=el;
			obj.body=el.parentElement.parentElement;
			obj.node=obj.body.parentElement;
			obj.src='check';
		}
		else while(el!=null && el.getAttribute("type")!='body' && el.getAttribute("type")!='node' ){
			if(el.getAttribute("type")=='i'){
				obj.bodyclick=false;
			}			
			if(_tagel.contains(el)){
				el = el.parentElement;				
			}
			else{
				return obj;
			}
		}
		el.type=el.getAttribute("type");
		
		if(el.type=='body'){
			var t=el.getElementsByTagName('INPUT');
			obj.check=(t.length>0)?t[0]:null;
			obj.body=el;
			obj.node=el.parentElement;
			obj.src='body';
		}
		else if(el.type=='node'){
			obj.node=el;
			if(el.lastChild.getAttribute("type")==null){
				obj.body=el.lastChild.previousSibling;
			}
			else{
				obj.body=el.lastChild;
			}
			obj.check=obj.body.firstChild;
			obj.src='node';
		}
		return obj;
	}
	
	var elTop=0; // ��¼��һ�����ݻ��Ƴ��ĸ߶�
	function _buildtree(){
		var start=new Date(),log=[];
		// �����ײ�����
		var html=_buildTreeHTML();

		function setInnerHTML(html){
			_tagel.innerHTML=html;
		}
		// ��ȡ��ʱ���ؽڵ�
		var othernode=html[1];
		var initnode=['<div class="',_classname,'q',_viewmodel,'">',html[0]],nodehieght=20*_sync_value;
		for(i=0,l=Math.ceil(_root.length/_sync_value)-1;i<l;i++){
			initnode.push('<div id="',_id,'_',i,'" type="othernode" seq="',i,'" style="height:',nodehieght,'px;display:block"></div>');
		}
		initnode.push('</div>');

		// ���ɴ�����
		setInnerHTML(initnode.join(''))
		
		
		// ��������Ϊ
		var items=_tagel.firstChild.children,it;
		

		// ����node��body֮������ù�ϵ
		var node,body,nodeid,nodehieght=0,txtlength,txtmaxlength=0,checkobj;
		for(var i=0,l=items.length;i<l;i++){
			node=items.item(i);
			if(node.getAttribute('type')=='othernode'){
				if(elTop==0) elTop=node.offsetTop;
				node.style.height=elTop+'px';
			}
			else{
				nodeid=node.getAttribute('dataid');
				body=node.lastChild;
				node.body=body
				if(_selectmode=='n'){
					checkobj=body.firstChild.firstChild;
					body.select=checkobj.type=='checkbox'?checkobj:null;
				}
				// ׷��node����
				_treenode.push(node);
				_treenode['node'+nodeid]=node;
				txtlength=node.innerText.length;
				txtmaxlength=txtmaxlength>txtlength?txtmaxlength:txtlength;
			}
			_tagel.firstChild.style.width=(txtmaxlength*17+40)+'px'
		}
		

		// ������ڵ�������ã�û�и��ڵ����ɾ�����ڵ㶨��
		if(_showRootNode){
			_rootnode=items.item(0);
			_rootnode.body=_rootnode.lastChild;
			_rootnode.body.select=_rootnode.body.getElementsByTagName('INPUT').item(0);
		}
		else{
			_rootnode=null;
		}
		
		document.body.attachEvent('onscroll',_buildQtree);
		document.attachEvent('onmousewheel',_buildQtree);
		_tagel.attachEvent('onscroll',_buildQtree);
		_tagel.attachEvent('onmousewheel',_buildQtree);
	}
	
		
		// ����Qtree�ɼ��Ĳ���
	function _buildQtree(en){
		if(cfg.contextmenu!=null){
			cfg.contextmenu.close();
		}
		if(elTop==0) return;
		// ������ʾҳ��
		var showpage=Math.ceil((_tagel.scrollTop+document.body.scrollTop)/elTop)-1;
		var pagediv=document.getElementById(_id+'_'+showpage--);
		_buildQtreeContent(pagediv);

		var pagediv=document.getElementById(_id+'_'+showpage);
		_buildQtreeContent(pagediv);
		
		if(pagediv==null) return;
		
		var flag=pagediv.offsetTop>(_tagel.scrollTop+document.body.scrollTop);
		while(pagediv!=null &&  pagediv.offsetTop>(_tagel.scrollTop+document.body.scrollTop)){
			showpage+=flag?-1:1;
			pagediv=document.getElementById(_id+'_'+showpage);
			_buildQtreeContent(pagediv);
		}
	}
	
	function _buildQtreeContent(div){
		if(div==null) return;
		if(div._displayflag==true) return;
			
		var id=div.id.split('_')[1];
		var start=_sync_value*(parseInt(id,10)+1);
		var html=[];
		
		for(var i=start,l=(start+_sync_value)<_root.length?(start+_sync_value):_root.length;i<l;i++){
			html.push(_buildRootNodeHTML(_root[i],i))
		}
		
		div.innerHTML=html.join('')
		div.style.height='auto';
		div._displayflag=true;
		
		// ����Node����
		var node,body,nodeid,nodehieght=0,items=div.children,txtlength,txtmaxlength=0;
		for(var i=0,l=items.length;i<l;i++){
			node=items.item(i);
			nodeid=node.getAttribute('dataid');
			body=node.lastChild;
			node.body=body
			if(_selectmode=='n'){
				body.select=body.firstChild.firstChild;
			}
			// ׷��node����
			_treenode.push(node);
			_treenode['node'+nodeid]=node;
			txtlength=node.innerText.length;
			txtmaxlength=txtmaxlength>txtlength?txtmaxlength:txtlength;
		}
		div.style.width=(txtmaxlength*17+40)+'px'
	}
	
	// �������ӳټ��صĽڵ�ȫ������
	function _showOthernode(){
		var items=_tagel.firstChild.children,it;
		for(var i=0,l=items.length;i<l;i++){
			node=items.item(i);
			if(node.type!='othernode') continue;
			_buildQtreeContent(node)
		}
	}
	
	// ����ѡ�е�ֵ�Ľڵ�չ��
	function _expandSelect(){
		if(_values==null) return;
		if(_values.length==0) return null;
		var v,paths,node,rootv,viewnode;
		for(var i=0,l=_values.length;i<l;i++){
			v=_values[i],paths=_values['path:'+v];
			// ��ʾ��id
			if(paths.length!=1) {
				_showRootNodeById(paths[0])
				for(var j=0,m=paths.length-1;j<m;j++){
					node=_treenode['node'+paths[j]];
					if(node!=null && node.getAttribute('stat')=='close') 
						_node_click_load.apply(node,[true]);
				}
			}
			else{
				if(_treenode['node'+paths[0]]!=null){
					_body_click_style.apply(_treenode['node'+paths[0]]);
				}
			}
			if(viewnode==null && _treenode['node'+v]) viewnode=_treenode['node'+v]
		}

		// ��λѡ�нڵ㣬��ѡʱ��λ�ĵ�һ��ѡ�еĽڵ�
		if(viewnode!=null){
			_body_click_style.apply(viewnode.body);
			
			var top=Ext.lt.HTML.positionedOffset(viewnode,_tagel).top;
			if(top>(_tagel.offsetHeight+_tagel.scrollTop)){
				_tagel.scrollTop=top-_tagel.offsetHeight+50;
			}
		}
	}
	
	// ����ָ�����ڵ�HTML����
	function _showRootNodeById(dataid){
		var d=_root['dataid_'+dataid];
		if(d==null) return;
		var i=0,li=_root.length;
		for(;i<li && _root[i]!=d;){
			i++;
		}
		
		pagediv=document.getElementById(_id+'_'+Math.floor((i-_sync_value)/_sync_value));
		_buildQtreeContent(pagediv);
	}
	function onTreekeydownFunction(en){
		if(!_tagel.contains(en.srcElement)) return true;
		if(_viewmodel!='tree') return true;
		
		var code=en.keyCode;
		switch (code){
			case 38: return up(en);break;
			case 40: return down(en);break;
			case 39: return right(en);break;
			case 37: return left(en);break;
			case 32: return space(en);break;
		}
	}
	
	function space(en){
		if(_selectmode=='n'){
			var node=_tree.getActiveNode();
			_check_click.apply(node.body.select);
		}
		return false;
	}
	
	function right(en){
		var node=_tree.getActiveNode();
		var stat=node.getAttribute('stat');
		if(stat=='close'){
			_tree.nodeExpand(node,1);
		}
		else if(node.getAttribute('isleaf')=='0'){
			down(en);
		}
		return false;
	}
	
	function left(en){
		var node=_tree.getActiveNode();
		var stat=node.getAttribute('stat');
		if(stat=='open'){
			_node_click_load.apply(node);
		}
		else{
			var nodeid=node.getAttribute('dataid');
			var paths=getselectpath(nodeid);
			if(paths.length==1) return false;
			_tree.gotoNode(_treenode['node'+paths[paths.length-2]]);
			return false;
		}
	}
	
	// ���������
	function down(en){
		var node=_tree.getActiveNode();
		if(node==null){
			// δѡ���κνڵ㣬����������һ���ڵ�
			var d=_root[0];
			_tree.gotoNode(_treenode['node'+d[_field_id]]);
		}
		else{
			var id=node.getAttribute('dataid');
			// �ж��Ƿ���ڵ�
			if(_showRootNode){
				if(node==_treenode['node'+_root[0][_field_id]]){
					_tree.gotoNode(_treenode['node'+_root[1][_field_id]]);
					return false;
				}
			}
			// �жϽڵ��Ƿ�չ��
			var stat=node.getAttribute('stat');
			if(stat=='open'){
				_tree.gotoNode(_treenode['node'+_getSubData(id)[0][_field_id]]);
				return false;
			}
			
			function gotoNode(nodeid){
				var paths=getselectpath(nodeid);
				if(paths==null) return;
				var brothers=(paths.length==1)?_root:_getSubData(paths[paths.length-2]),i=0,l=brothers.length;
				for(;i<l;i++){if(brothers[i][_field_id]==nodeid)break;}
				if(i<l-1){
					_tree.gotoNode(_treenode['node'+brothers[i+1][_field_id]]);
				}
				else if(paths.length>1){
					gotoNode(paths[paths.length-2]);
				}
			}
			gotoNode(id);
		}
		
		return false;
	}
	
	// ���������
	function up(en){
		var node=_tree.getActiveNode();
		if(node==null){
			// δѡ���κνڵ㣬����������һ���ڵ�
			var d=_root[0];
			_tree.gotoNode(_treenode['node'+d[_field_id]]);
		}
		else{
			var id=node.getAttribute('dataid');
			
			function gotoNode(nodeid){
				var paths=getselectpath(nodeid);
				if(paths==null) return;
				var brothers=(paths.length==1)?_root:_getSubData(paths[paths.length-2]),i=0,l=brothers.length;
				for(;i<l;i++){if(brothers[i][_field_id]==nodeid)break;}
				if(0<i&&i<l){

					var nodeid=brothers[i-1][_field_id];node=_treenode['node'+nodeid];
					if(_showRootNode){
						if(node==_treenode['node'+_root[0][_field_id]]){
							_tree.gotoNode(node);
							return false;
						}
					}
						
					// �жϽڵ��Ƿ�չ��
					var stat=node.getAttribute('stat');
					if(stat=='open'){
						var subs=_getSubData(nodeid);
						_tree.gotoNode(_treenode['node'+subs[subs.length-1][_field_id]]);
						return false;
					}
					else{

						_tree.gotoNode(node);
					}
				}
				else if(paths.length>1){
						_tree.gotoNode(_treenode['node'+paths[paths.length-2]]);
						return false;
				}
			}
			gotoNode(id);
		}
		
		return false;
	}
	
	function buildKeyPress(){
		if(keypress!=true) return;
		
		Ext.lt.unbindEvent(document.body,'keydown',onTreekeydownFunction);
		Ext.lt.bindEvent(document.body,'keydown',onTreekeydownFunction)
		
	}

	var _tree=new function(){
		this.resize=function(w,h){
			if(_search){
				_tagel.style.height=(_tagel.parentElement.offsetHeight-_tagel.parentElement.firstChild.offsetHeight)+'px';
				var inputobj=_searchdiv.firstChild;
				var inputborder=Ext.lt.HTML.getBorderSet(inputobj);
				var w=_searchdiv.offsetWidth-_searchdiv.lastChild.offsetWidth-inputborder.width-2;
				inputobj.style.width=(w>0?w:0)+'px';
			}
		}
		
		function onTreeClick(){
			var obj=_findNode(window.event.srcElement);
			if(obj.src==null) return;
			var d=_data[_preid+obj.body.getAttribute('dataid')];
			if(d!=null&&d.disable){return false};
			if(obj.src=='node'){
				_node_click_load.apply(obj.node,[false,1,obj.bodyclick]);
			}
			
			else if(obj.src=='body'){
				_body_click_style.apply(obj.body);
				if(obj.check && !_disabled){
					obj.check.checked^=true
					_check_click.apply(obj.check);
				}
			}
			else if(obj.src=='check'){
				_check_click.apply(obj.check);
				_tree.nodeExpand(obj.node,_onclick_expandlevel);
			}
			_fireEvent('onclick',{body:obj.body,node:obj.node,data:d});
		}
		
		function onTreeDblClick(){
			var obj=_findNode(window.event.srcElement);
			if(obj.src==null) return;
			if(obj.body.getAttribute('dataid') != 'QTreeAllNode'){
			var d=_data[_preid+obj.body.getAttribute('dataid')];
			if(d!=null&&d.disable){return false};
			_body_dblclick.apply(obj.body);
			_fireEvent('ondblclick',[]);
			}
		}
		
		// ��չ�����Ҽ��¼� lp
		function onContextMenu(){
			var obj=_findNode(window.event.srcElement);
			if(obj.src==null) return;

			_fireEvent('oncontextmenu', obj);
			return _events['oncontextmenu']==null;
		}
		
		this.getContextmenu=function(){
			return _getContextmenu();	
		}
		this.draw=function(tagel){
			var start=new Date(),t=[];
			if(tagel!=null) _tagel=tagel;
			if(_tagel==null){
				alert('û��ָ����������');
				return ;
			}
			
			if(_tagel._qtree!=null){
				_tagel._qtree.destory();
			}
			
			// ����������
			if(_search){
				var html='<div class="'+_classname+'qsearch" style="width:100%"><input type="text" class="input"  style="float:left"><span class="btn" style="float:right">����</span></div><div id="aaaa" style="width:100%"></div>';
				Ext.lt.HTML.setInnerHTML(tagel,html);
				_searchdiv=tagel.firstChild;
				_tagel=tagel.lastChild
			}

			var h=tagel.offsetHeight;
			var w=tagel.offsetWidth;
			 Ext.lt.HTML.setStyle(_tagel,"overflow:auto");
			tagel.ignoreexpand=true;
			tagel.ignorelayout=true;
			_buildtree();
			
			// �¼���չ
			var _eventel=_tagel;
			_eventel.attachEvent('onclick',onTreeClick)
			_eventel.attachEvent('ondblclick',onTreeDblClick);
			_eventel.attachEvent('oncontextmenu',onContextMenu);
						
			// ��չ�������¼�
			if(_search){
				Ext.lt.bindEvent(_searchdiv.firstChild,'keydown',function(en){
					if(en.keyCode==13 && _search_key.enter){
						_search_do();
					}
					if(en.keyCode==13) return false;
				});
				
				Ext.lt.bindEvent(_searchdiv.firstChild,'keyup',function(en){
					var char=en.keyCode;

					// ����������ʵʱƥ��
					if(char!=13 && _search_key.keypress)	{
						_search_do();
					};
					if(char==13) return false;
				});
				
				Ext.lt.bindEvent(_searchdiv.firstChild,'blur',function(){
					if(_search_key.blue){
						_search_do();
					}
					else{
						_searchdiv.firstChild.reset();
					}
				});
			}
			
			buildKeyPress();
		
			this.expandlevel(_config.expandlevel);
			if(_viewmodel=='tree' && _isexpand){ _expandSelect()}
			_tagel._qtree=this;
			_setIndeterminate();
			//��ѡ�¸��ڵ�
			if(_showRootNode&&_rootnode!=null&&_rootnode.body.select!=null&&!_rootnode.body.select.checked){
				if(_values!=null&&_values.PK_0!=null){
					_rootnode.body.select.checked='checked'
				}
			}
			if(_values.length>0 && _values[0]!=null && _values[0]!="")
				this.gotoNode(_values[0]);
			this.resize();
		};
		
		function _search_do(){
				var filter=[],txt=_searchdiv.firstChild.value;
				for(var i=0,il=_search_attribute.length;i<il;i++){
					filter.push({'field':_search_attribute[i],'values':txt});
				}
				_tree.setFilter(filter,_search_match,false);
		}
		
		// չ��ָ���������
		this.expandlevel=function(l){
			if(l<2) return;
			
			// ��ʾ�����ӳټ��ؽڵ�
			_showOthernode();
			
			var node,flag=true,start=0,loop=_treenode.length;
			while(flag){
				flag=false;
				for(;start<loop;start++){
					var node=_treenode[start];
					if(node!=null && node.getAttribute('level')<l && node.getAttribute('stat')=='close'){
						_node_click_load.apply(node,[true])
					}
				}
				flag=loop<_treenode.length
				loop=_treenode.length
			}
		}
		
		this.dataExpand=function(){
			
		}
		
		// չ��ָ���ڵ�
		this.nodeExpand=function(node,expandlevel){
			if(!node)return;
			var expandlevel=isNaN(expandlevel)?1:expandlevel;
			if(expandlevel==0) return
			// չ��ָ���ڵ�
			if(node.getAttribute('isleaf') == '0'){
				_node_click_load.apply(node,[true])
				var dataid=node.getAttribute('dataid');
				var subids=_getSubData(dataid);
				for(var i=0,l=subids.length;i<l;i++){
					this.nodeExpand(this.getNode(subids[i][_field_id]),expandlevel-1);
				}
			}
		}
		function _addNode(node,aitemid){
			if(!(_data[_preid+node[_field_sid]]==null||_data[_preid+node[_field_sid]]=="0"||_data[_preid+node[_field_sid]]==0)){
				_data[_preid+node[_field_sid]][_field_isleaf]=0
			}
			if(node[_field_isleaf]==null)node[_field_isleaf]=1;
			if(aitemid==null){
				_data.push(node);	
			}else{
				_data.insert(node,_data.indexOf(_data[_preid+aitemid]))
			}
			_data[_preid+node[_field_id]]=node;
		}
		this.updateNode=function(node){
			var _node=_data[_preid+node[_field_id]];
			var osnode=_node[_field_sid];
			
			for(var p in node){
				_node[p]=node[p];
			}
			
			if(osnode!='0'&&osnode!=0&&osnode!=_node[_field_sid]){
				_subnodes=null;
				var isleaf=_getSubData(_node[_field_sid]);
				_data[_preid+osnode][_field_isleaf]=(isleaf==null||isleaf.length<1)?1:0
			}
			_initRootData();
			this.reflash();
		}
		
		this.setDisabled=function(node,b){
			var _node=_data[_preid+node[_field_id]];
			if(_node==null){return}
			_node.disable=b;
			_treenode['node'+node[_field_id]].disabled=b==true;
			if(b==true&&_treenode['node'+node[_field_id]].getAttribute('stat')=='open'){
				_node_click_load.apply(_treenode['node'+node[_field_id]],[false]);
			}
		}
		
		this.addNode=function(nodes,aitemid){
			if(Ext.lt.isArray(nodes)){
				for(var i=0,l=nodes.length;i<l;i++){
					_addNode(nodes[i],aitemid);
				}
			}else{
				_addNode(nodes,aitemid);
				
			}
			_subnodes=null;
			_data.size=_data.length;
			_initRootData();
			this.reflash();
		}
		function _removeNode(id){
			var cdata=_getSubData(id);
			var _b=_data[_preid+id];
			_data.remove(_data[_preid+id]);
			_data[_preid+id]=null;
			for(var i=0,l=cdata.length;i<l;i++){
				_removeNode(cdata[i][_field_id]);
			}	
		}
		this.removeNode=function(id){
			var _dnode=_data[_preid+id];
			_removeNode(id)
			_subnodes=null;
			_data.size=_data.length;
			var isleaf=_getSubData(_dnode[_field_sid]);
			if(_data[_preid+_dnode[_field_sid]]!=null){
				_data[_preid+_dnode[_field_sid]][_field_isleaf]=(isleaf==null||isleaf.length==0)?1:0
			}
			_initRootData();
			this.reflash();
		}
		this.getData=function(id){
			return _data[_preid+id];
		}
		
		// ��ȡ�������ݼ� lp
		this.getAllData = function() {
			return _data;
		}
		// ��������ID��ȡ�ڵ����
		this.getNode=function(id){
			return _treenode['node'+id];
		}
		// ֱ�Ӷ�λ��ָ��ID�Ľڵ㣬������Node����
		this.gotoNode=function(node){
			if(node.tagName=='DIV'){
				_body_click_style.apply(node.body);
				return node;
			}
			else{
				id=node;
				var paths=getselectpath(id);
				// ��ʾ��id
				_showRootNodeById(paths[0])
				for(var j=0,m=paths.length-1;j<m;j++){
					node=_treenode['node'+paths[j]];
					if(node!=null && node.getAttribute('stat')=='close') 
						_node_click_load.apply(node,[true]);
				}
				var _n=_treenode['node'+id];
				// this.selectedNode(_n);
				_body_click_style.apply(_n.body);
				return _n;
			}			
		}
		// ѡ�нڵ�
		this.selectedNode=function(node){
			if(node==null) return;
			var n=this.gotoNode(node);
			if(n==null) return;
			
			if(n.tagName!='DIV'){
				//_body_dblclick.apply(n.body);
				// _body_click_style.apply(node.body);
				n.body.focus()
			}else{
				n.focus()
			}
		}
		
		// ����ָ�����ݵ������¼��ڵ�
		this.getSubData=function(id){
			return _getSubData(id);
		}
		
		// ������ѡ�е����ݶ���
		this.getSelected=function(){
			if(_selectmode !="n"){
				// ��ѡ���������һ��ѡ�еĽڵ�
				if(_lastSelected.className!=""&&_data[_preid+_lastSelected.getAttribute("dataid")]){
					return [_data[_preid+_lastSelected.getAttribute("dataid")]];
				}else{
					return [];
				}
			}
			else{
				
				var r=[]
				for(var i=0;i<_data_bak.length;i++){
					if(_data_bak[i][_field_checked]=='checked')
						r.push(_data_bak[i])
				}
				return r;
			}
		}
		// ��ȡ�������Ｖ����,����id����  lp
		this._getAllSubData = function (sid){
			var sub = {subid:[],subdata:[]};
			var subid = [];
			var subdata = []; 
			for (var i=0,l=_data.size;i<l;i++){
				var d = _data[i];
				// �Ӽ�
				if(d[_field_sid] == sid) {
					subid.push(d[_field_id]);
					subdata.push(d);
				}
				// �Ｖ
				for (var j=0,len=subdata.length; j<len; j++) {
					if (d[_field_sid] && d[_field_sid] == subdata[j][_field_id]) {
						subid.push(d[_field_id]);
						subdata.push(d);
					}
				}
			}
			sub.subid = subid;
			sub.subdata = subdata;
			return sub;
		}
		// ���ѡ��
		this.clearSelected=function(){
			var sels=this.getSelected();
			for(var i=0,l=sels.length;i<l;i++){
				sels[i][_field_checked]=null;
			}
			//�����ѡģʽ�����ѡ��״̬
			_lastSelected={className:''};
			this.reflash();
		}
		
		
		// �����û����һ�β����Ľ��
		this.getActiveNode=function(){
			return this.getNode(_lastSelected.getAttribute('dataid'));//  _lastSelected.parentElement;
		}
		
		// �������ݹ����������ṹΪ[{field:key1,values:[value1,value2,��],{field:key1,values:[value1,value2,��],��],match:fn}
		this.setFilter=function(filter,match,checkflag){
			// ���ԭ�й�������
			_filter=[];
			// �����������ʽ�������ݣ��������ʽ�ṹ������ʾ
			// /\$#.*[1].*\$%(.*)/ig
			var regfilter=[];
			if(checkflag==null) checkflag==false
			
			if(filter!=null){
				var values,field
				for(var i=0,l=filter.length;i<l;i++){
					values=filter[i].values;
					if(values=='' || values.length==0)
						continue;
					field=filter[i].field;
					_filter.push(field);
					values=Ext.lt.isArray(values)?values:[values];
					_filter['_k'+field]=values;
					for(var j=0,m=values.length;j<m;j++){
						_filter['_k'+field+'_v'+values[j]]=true
						if(regfilter['v+'+values[j]]==null){
							regfilter.push(values[j]);
							regfilter['v+'+values[j]]=true;
						}
					}
				}
			}
			

			
			if(match==null){
				// ��ȷƥ��
				_filter.matchfn=function(k,v){
					var vs=this['_k'+k];
					for(var i=0,l=vs.length;i<l;i++){
						if(v==vs[i]) return true;
					}
					return false;
				}
				regfilter=regfilter.length>0?eval('/##('+regfilter.join('|')+')%%.*/ig'):null
			}
			else if(match=='left'){
				// ��࿪ʼƥ��
				_filter.matchfn=function(k,v){
					if(v==null) return false;
					var vs=this['_k'+k];
					for(var i=0,l=vs.length;i<l;i++){
						if(v.indexOf(vs[i])==0) return true;
					}
					return false;
				}
				regfilter=regfilter.length>0?eval('/##('+regfilter.join('|')+').*%%.*/ig'):null
			}
			else if(match=='contain'){
				// ������ʼƥ��
				_filter.matchfn=function(k,v){
					if(v==null) return false;
					var vs=this['_k'+k];
					for(var i=0,l=vs.length;i<l;i++){
						if(v.indexOf(vs[i])>-1) return true;
					}
					return false;
				}
					regfilter=regfilter.length>0?eval('/##.*('+regfilter.join('|')+').*%%.*/ig'):null
			}
			_filterData(regfilter,checkflag);
			_initRootData();
			this.reflash();
		}
		
		// �ػ���
		this.reflash=function(){
			_buildtree();
		}
		
		// �����¼�
		this.on=function(events){
			for(var event in events){
					_events['on'+event]=events[event]
			}
		}
		
		this.destory=function(){
			_tagel.detachEvent('onclick',onTreeClick)
			_tagel.detachEvent('ondblclick',onTreeDblClick);
			_tagel.detachEvent('oncontextmenu',onContextMenu);
		}
		// ����Ĭ��ѡ��״̬
		this.checkAll=function(flag){
			if(_selectmode!='n') return;
			flag=!(flag==false)
			var stat=flag?'checked':null;
			// �޸�����ѡ��״̬
			for(var i=0,l=_data.length;i<l;i++){
				_data[i][_field_checked]=stat;
			}
			
			// �޸Ľ���checkbox״̬
			for(var i=0,l=_treenode.length;i<l;i++){
				if(_treenode[i].body.select.checked!=flag){
					_treenode[i].body.select.checked=flag
				}
			}
			// �޸�ȫѡ�ڵ�
			if(_rootnode!=null && _rootnode.body.select!=null){
				_rootnode.body.select.checked=flag
			}
		}
				
		this.searchnode=function(filters,match,startnodeid){
			var filter=[],f,matchfn;
			if(!Ext.lt.isArray(filters)) filters=[filters];
			for(var i=0;i<filters.length;i++){
				f=filters[i];
				filter.push(f['field'])
				filter['_k'+f['field']]=f['values'];
			}
			
			if(match==null){
				// ��ȷƥ��
				filter.matchfn=function(k,v){
					var vs=this['_k'+k];
					for(var i=0,l=vs.length;i<l;i++){
						if(v==vs[i]) return true;
					}
					return false;
				}
			}
			else if(match=='left'){
				// ����ƥ��
				filter.matchfn=function(k,v){
					var vs=this['_k'+k],t;
					for(var i=0,l=vs.length;i<l;i++){
						t=vs[i]
						if(v==t) return true;
						if(v==null) return false;
						if(v.indexOf(t)==0) return true;
					}
					return false;
				}
			}
			else if(match=='contain'){
				// ģ��ƥ��
				filter.matchfn=function(k,v){
					var vs=this['_k'+k],t;
					for(var i=0,l=vs.length;i<l;i++){
						t=vs[i]
						if(v==t) return true;
						if(v==null) return false;
						if(v.indexOf(t)>-1) return true;
					}
					return false;
				}
			}

			
			var starti=0;
			if(startnodeid!=null){
				// �ҵ��������
				for(var l=_data.length;starti<l;){
					if(_data[starti++][_field_id]==startnodeid) break;
				}
			}
			
			// ����ƥ������
			var mi=0,ml=filter.length,d,nodeid=null;
			for(var l=_data.length;starti<l;starti++){
				d=_data[starti]
				for(mi=0;mi<ml;mi++){
					if(filter.matchfn(filter[mi],d[filter[mi]])){
						nodeid=d[_field_id];
						break;
					}
				}
				if(nodeid!=null) break;
			}
			
			if(nodeid==null) return;
			
			
			// ��λѡ�нڵ�
			var paths=getselectpath(nodeid);
			_showRootNodeById(paths[0])
			for(var j=0,m=paths.length-1;j<m;j++){
				node=_treenode['node'+paths[j]];
				if(node!=null && node.getAttribute('stat')=='close') 
					_node_click_load.apply(node,[true]);
			}
			var viewnode=_treenode['node'+nodeid]
			_body_click_style.apply(viewnode.body);
			var top=Ext.lt.HTML.positionedOffset(viewnode,_tagel).top;
			if(top>(_tagel.offsetHeight+_tagel.scrollTop-viewnode.scrollHeight-50)){
				_tagel.scrollTop=top-_tagel.offsetHeight+50;
				return nodeid;
			}
			if(top<_tagel.offsetHeight){
					_tagel.scrollTop=0;
					return nodeid;
			}
			
			if(top<_tagel.scrollTop){
				_tagel.scrollTop=top-50;
				return nodeid;
			}
			return nodeid;
		}
	}
	
	// ���ܲ��ֹ�������
	Ext.lt.message.hook("layout","endlayout",_tree.resize);
	return _tree;
}


Ext.lt.dateutil=new function(){
	var lunarInfo = new Array(
	0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, 0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, 0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, 0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, 0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, 0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0, 0x14573, 0x052d0, 0x0a9a8, 0x0e950, 0x06aa0, 0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, 0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6, 0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, 0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0, 0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, 0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, 0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, 0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, 0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0);
	var Gan = new Array("��", "��", "��", "��", "��", "��", "��", "��", "��", "��");
	var Zhi = new Array("��", "��", "��", "î", "��", "��", "��", "δ", "��", "��", "��", "��");
	var cmStr = new Array('��', '��', '��', '��', '��', '��', '��', '��', '��', '��', 'ʮ', '��', '��');
	var nStr1 = new Array('��', 'һ', '��', '��', '��', '��', '��', '��', '��', '��', 'ʮ');
	var solarTerm = new Array("С��", "��", "����", "��ˮ", "����", "����", "����", "����", "����", "С��", "â��", "����", "С��", "����", "����", "����", "��¶", "���", "��¶", "˪��", "����", "Сѩ", "��ѩ", "����")
	var lFtv = new Array("0101*����", "0115 Ԫ����", "0505 �����", "0707 ��Ϧ", "0715 ��Ԫ��", "0815 �����", "0909 ������", "1208 ���˽�", "1224 С��", "0100*��Ϧ")
	var sFtv = new Array("0101*Ԫ��", "0214 ���˽�", "0308 ��Ů��", "0312 ֲ����", "0401 ���˽�", "0501 �Ͷ���", "0504 �����", "0512 ��ʿ��", "0601 ��ͯ��", "0701 ������", "0801 ������", "0910 ��ʦ��", "1001*�����", "1101 ��ʥ��", "1108 ������", "1225 ʥ����", "0513 ĸ�׽�", "0617 ���׽�")

	function cyclical(num) { return (Gan[num % 10] + Zhi[num % 12]) }
	function lYearDays(y) {
    var i, sum = 348
    for (i = 0x8000; i > 0x8; i >>= 1) sum += (lunarInfo[y - 1900] & i) ? 1 : 0
    return (sum + leapDays(y))
	}
	function leapDays(y) {
    if (leapMonth(y)) return ((lunarInfo[y - 1900] & 0x10000) ? 30 : 29)
    else return (0)
	}
	function leapMonth(y) { return (lunarInfo[y - 1900] & 0xf) }
	function monthDays(y, m) { return ((lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29) }
	function Lunar(objDate) {
    var i, leap = 0, temp = 0
    var baseDate = new Date(1900, 0, 31)
    var offset = (objDate - baseDate) / 86400000
    this.dayCyl = offset + 40
    this.monCyl = 14
    for (i = 1900; i < 2050 && offset > 0; i++) {
        temp = lYearDays(i)
        offset -= temp
        this.monCyl += 12
    }
    if (offset < 0) {
        offset += temp;
        i--;
        this.monCyl -= 12
    }
    this.year = i
    this.yearCyl = i - 1864
    leap = leapMonth(i)
    this.isLeap = false
    for (i = 1; i < 13 && offset > 0; i++) {
        if (leap > 0 && i == (leap + 1) && this.isLeap == false)
        { --i; this.isLeap = true; temp = leapDays(this.year); }
        else
        { temp = monthDays(this.year, i); }
        if (this.isLeap == true && i == (leap + 1)) this.isLeap = false
        offset -= temp
        if (this.isLeap == false) this.monCyl++
    }
    if (offset == 0 && leap > 0 && i == leap + 1)
        if (this.isLeap)
        { this.isLeap = false; }
        else
        { this.isLeap = true; --i; --this.monCyl; }
    if (offset < 0) { offset += temp; --i; --this.monCyl; }
    this.month = i
    this.day = offset + 1
	}	
	function cDay(m, d) {
		d=parseInt(d);
	    var nStr2 = new Array('��', 'ʮ', 'إ', 'ئ', '��'); var s
	    s = cmStr[m] + '��'
	    switch (d) {
	        case 10: s += '��ʮ'; break;
	        case 20: s += '��ʮ'; break;
	        case 30: s += '��ʮ'; break;
	        default: s += nStr2[Math.floor(d / 10)]; s += nStr1[Math.round(d % 10)];
	    } return (s)
	}

	// �������ĵ������ո�ʽ
	this.YYMMDD=function(dateobj) {
		if(dateobj==null) dateobj=new Date();
		return ('' + dateobj.getFullYear() + '-' + (dateobj.getMonth() + 1) + '-' + dateobj.getDate() + '') 
	}
	// ����������
	this.weekday=function(dateobj) {
		if(dateobj==null) dateobj=new Date();
		var cl = '';
		return (cl + '����' + nStr1[dateobj.getDay()] + '');
	}
	// ���ؽ���
	this.holiday=function(dateobj){
		var SY = dateobj.getFullYear(); SM = dateobj.getMonth(); SD = dateobj.getDate();
		for (var i=0,loop=sFtv.length;i<loop;i++)
			if (sFtv[i].match(/^(\d{2})(\d{2})([\s\*])(.+)$/)) {
				tmp1 = Number(RegExp.$1) - (SM + 1)
				tmp2 = Number(RegExp.$2) - SD
				if (tmp1 == 0 && tmp2 == 0) return RegExp.$4
			}
	}
	//�����й���ͳ����
	this.chinaholiday=function(dateobj){
		// ת��Ϊ����
		var lDObj = new Lunar(dateobj);

		for (var i=0,loop=lFtv.length;i<loop;i++)
			if (lFtv[i].match(/^(\d{2})(.{2})([\s\*])(.+)$/)) {
				tmp1 = Number(RegExp.$1) - lDObj.month
				tmp2 = Number(RegExp.$2) - lDObj.day
				if (tmp1 == 0 && tmp2 == 0) return RegExp.$4
			}		
	}
	
	// ����ũ���ͽ���
	this.solarDay=function(dateobj) {
		var sTermInfo = new Array(0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758)
		var sDObj = dateobj;
		var SY = dateobj.getFullYear(); SM = dateobj.getMonth(); SD = dateobj.getDate();
		var lDObj = new Lunar(sDObj);
		var lDPOS = new Array(3)
		var festival = '', solarTerms = '', solarFestival = '', lunarFestival = '', solarTerms = '', tmp1, tmp2;

		for (var i=0,loop=lFtv.length;i<loop;i++)
			if (lFtv[i].match(/^(\d{2})(.{2})([\s\*])(.+)$/)) {
				tmp1 = Number(RegExp.$1) - lDObj.month
				tmp2 = Number(RegExp.$2) - lDObj.day
				if (tmp1 == 0 && tmp2 == 0) lunarFestival = RegExp.$4
			}


		if (lunarFestival == '') {
			for (var i=0,loop=sFtv.length;i<loop;i++)
				if (sFtv[i].match(/^(\d{2})(\d{2})([\s\*])(.+)$/)) {
					tmp1 = Number(RegExp.$1) - (SM + 1)
					tmp2 = Number(RegExp.$2) - SD
					if (tmp1 == 0 && tmp2 == 0) solarFestival = RegExp.$4
				}

				if (solarFestival == '') {
					tmp1 = new Date((31556925974.7 * (SY - 1900) + sTermInfo[SM * 2 + 1] * 60000) + Date.UTC(1900, 0, 6, 2, 5))
					tmp2 = tmp1.getUTCDate()
					if (tmp2 == SD) solarTerms = solarTerm[SM * 2 + 1]
					tmp1 = new Date((31556925974.7 * (SY - 1900) + sTermInfo[SM * 2] * 60000) + Date.UTC(1900, 0, 6, 2, 5))
					tmp2 = tmp1.getUTCDate()

					if (tmp2 == SD) solarTerms = solarTerm[SM * 2]
					if (solarTerms == '') sFtv = ''; else sFtv = solarTerms
				} else sFtv = solarFestival
		} else sFtv = lunarFestival
		if (sFtv == '')
			sTermInfo = cyclical(lDObj.year - 1900 + 36) + '�� ũ��' + cDay(lDObj.month, lDObj.day)
		else sTermInfo = cDay(lDObj.month, lDObj.day) + ' ' + sFtv + ''
		return (sTermInfo)
	}
	
	this.YYYYMMDD=function(v){
		var _datevalue='';
		if(typeof(v)=='string'){
			if(v.length=8){
				// 8λ���֣�������YYYYMMdd��ʽ
				_datevalue=v
			}
			else{
				var dateobj=new Date(parseInt(ds[_input.name],10));
				var mm=(dateobj.getMonth()<9?'0':'')+(dateobj.getMonth() + 1);
				var dd=(dateobj.getDate()<10?'0':'')+dateobj.getDate();
				_datevalue=dateobj.getFullYear()  + mm +  dd;
			}
		}
		else if(typeof(v)=='number'){
				var dateobj=new Date(v);
				var mm=(dateobj.getMonth()<9?'0':'')+(dateobj.getMonth() + 1);
				var dd=(dateobj.getDate()<10?'0':'')+dateobj.getDate();
				_datevalue=dateobj.getFullYear()  + mm +  dd;
		}
		else if(Ext.lt.isDate(v)){
				var mm=(v.getMonth()<9?'0':'')+(v.getMonth() + 1);
				var dd=(v.getDate()<10?'0':'')+v.getDate();
				_datevalue=v.getFullYear()  + mm +  dd;
		}
		return _datevalue;
	}
	
}



// ���ֹ�������ֹ�ظ�����
if(Ext.lt.layout==null){
Ext.lt.layout=new function(){
	var elroot=document.body;
	var _onload_fn=[];
	var sidebardiv=document.createElement('DIV');
	sidebardiv.style.cssText='position:absolute;font-size:5px;line-height:5px'
	Ext.lt.aninmation(sidebardiv);
	// ���ֵ����Ƿ�������
	this.running=false;
	
	function showfoldbar(el,foldside){
		sidebardiv.innerHTML=foldside;
		el.appendChild(sidebardiv);
		sidebardiv.style.height=(foldside=='bottom'||foldside=='top')?'5px':(el.offsetHeight+'px')
		sidebardiv.style.width=(foldside=='bottom'||foldside=='top')?(el.offsetWidth+'px'):'5px'
		sidebardiv.style.top=(foldside=='bottom')?((el.offsetHeight-5)+'px'):'0px'
		sidebardiv.style.left=(foldside=='right')?((el.offsetWidth-5)+'px'):'0px'
	}
	
	function addLayout(pel,el,c){
		if(pel==null) pel=document.body;
		if(pel.childlayoutelement==null) pel.childlayoutelement=[]
		
		pel.childlayoutelement.push(el)
		el.layout=Ext.lt.apply({h:{},w:{}},c);
		if(el.style.position=='')el.style.position='relative';
		// Ϊ�˷�ֹԪ�س��������޸ģ���Ԫ����ʽ��Ϊ�������
		//el.style.overflow='hidden';
		
		// ��������۵����ԣ��򴴽��۵��¼�
		if(el.layout.fold==null || true) return;
		if(el.layout.fold.bottom) el.style.paddingBottom='5px';
		el.attachEvent('onmousemove',function(en){
			var x=en.offsetX,y=en.offsetY;
			if(this.layout.fold.bottom!=null && el._h-y<5) showfoldbar(el,'bottom');
			if(this.layout.fold.top!=null && el._h-y<5) showfoldbar(el,'top');
			if(this.layout.fold.left!=null && el._h-y<5) showfoldbar(el,'left');
			if(this.layout.fold.right!=null && el._h-y<5) showfoldbar(el,'right');
		})
		
		
	}
	
	function getOffsetHeight(el){
		var style=el.currentStyle==null?el.style:el.currentStyle;
		var mt=parseInt(style.paddingTop,10),ml=parseInt(style.paddingBottom,10);
		if(el.tagName=="BODY") return document.documentElement.clientHeight-mt-ml;
		return el.offsetHeight-mt-ml;
	}
	
	function getOffsetWidth(el){
		var style=el.currentStyle==null?el.style:el.currentStyle;
		var mt=parseInt(style.paddingLeft,10),ml=parseInt(style.paddingRight,10);
		if(el.tagName=="BODY") return document.documentElement.clientWidth;
		return el.offsetWidth;
	}
	
	this.doLayout=function(el){
		_doLayout(el);
		Ext.lt.message.send("layout","endlayout");
		Ext.lt.layout.running=false;
	}
	
	function _doLayout(pel){
		if(pel==null) pel=document.body;
		if(pel!=document.body) {
			if(pel.id=='aaaa')alert(pel.id+' '+pel.currentStyle.position);
			if(pel.style.overflow=='') pel.style.overflow="hidden";
		}
		
		var el,els=pel.childlayoutelement,_pw=pel._w,_ph=pel._h;
		
		if(els==null) return;
		if(pel.tagName=="BODY"){
			var border=Ext.lt.HTML.getBorderSet(document.body);
			_pw=document.documentElement.clientWidth-border.width;
			_ph=document.documentElement.clientHeight-border.height;
		}
		
		// ��¼��ʼ����
		for(var i=0,l=els.length;i<l;i++){
			el=els[i];
			pel=el.parentElement;
			el._w=el.offsetWidth,el._h=el.offsetHeight;
			
			if(Ext.lt.ieversion=='6' && el.style.styleFloat =='left'){
				el.style.marginRight='-3px';
				el.ie6widthfix=true
			}
							
			var border=Ext.lt.HTML.getBorderSet(el,['margin','border']);
			el._wfix=border.width+(el.ie6widthfix==true?3:0); 
			el._hfix=border.height;
		}
		
		// Ӧ�ò���
		var _brothers,_tempel,_autoel=[],style,pstyle;
		for(var i=0,l=els.length;i<l;i++){
			el=els[i];
			style=el.currentStyle==null?el.style:el.currentStyle;
			if(el==null) continue;
			
			// �����������õ��߼�
			var _wconfig=el.layout.w,_w=_pw;
			// ���ú����������
			if(_wconfig.overflow!=null){
				el.style.overflowX=_wconfig.overflow
				if(_wconfig.overflow=='scroll') el._hfix+=18;
			}
			if(_wconfig.fit!=null && _wconfig.fit!='auto'){
				if(_wconfig.fit==true) _w=_pw;
				else if(_wconfig.fit>1) _w=_wconfig.fit;
				else if(_wconfig.fit>0) _w=_pw*_wconfig.fit;
				else if(_wconfig.fit<0) _w=_pw+_wconfig.fit;
				
				// ������С��������			
				if(_w<_wconfig.min){
					_w=_wconfig.min;
				}
				
				var elw=parseInt(style.paddingLeft,10);
				if(!isNaN(elw))_w-=elw;
				var elw=parseInt(style.paddingRight,10);
				if(!isNaN(elw))_w-=elw;
				
				if(_w<0) _w=0;
				el._w=(_w-el._wfix>0?_w-el._wfix:0);
				el.style.width=el._w+'px';
			}
			else if(_wconfig!=null){
				//el._w=_pw
			}
			
			var _hconfig=el.layout.h,_h=_ph,_tempelm;
			// ���������������
			if(_hconfig.overflow!=null){
				el.style.overflowY=_hconfig.overflow
				if(_hconfig.overflow=='scroll') el._wfix+=18;
			}
			if(_hconfig.fit!=null && _hconfig.fit!='auto'){
				if(_hconfig.fit==true) _h=_ph;
				else if(_hconfig.fit>1) _h=_hconfig.fit;
				else if(_hconfig.fit>0) _h=_ph*_hconfig.fit;
				else if(_hconfig.fit<0) _h=_ph+_hconfig.fit;
				// ������С��������			
				if(_h<_hconfig.min){
					_h=_hconfig.min;
				}
				
				var elh=parseInt(style.paddingTop,10);
				if(!isNaN(elh))_h-=elh;
				var elh=parseInt(style.paddingBottum,10);
				if(!isNaN(elh))_h-=elh;
				
				try{
					if(_h<0 || style.visibility=='hidden' || style.display=='none') _h=0;
				}catch(e){
					_h=0;
				}
				try{
					el._h=(_h-el._hfix>0?_h-el._hfix:0);
					el.style.height=el._h+'px'
				}catch(e){}
			}
			else if(_hconfig!=null){
				//el._h=_ph;
			}
			
			if((_wconfig!=null && _wconfig.fit=='auto')||(_hconfig!=null && _hconfig.fit=='auto')){
				_autoel.push(el);
			}
			// �����¼���ʽ
			else if(el.childlayoutelement!=null) _doLayout(el);
		}
		
		
		
		// ����'auto'��ʽ
		for(var i=0,l=_autoel.length;i<l;i++){
			el=_autoel[i];
			style=el.currentStyle==null?el.style:el.currentStyle;
			pstyle=el.parentElement.currentStyle==null?el.parentElement.style:el.parentElement.currentStyle;
			// �����������õ��߼�
			var _wconfig=el.layout.w,_w=_pw;
			if(_wconfig.fit!=null && _wconfig.fit=='auto'){
				if(_wconfig.fit=='auto') {
					var _divw=getOffsetWidth(el.parentElement),_brothers=el.parentElement.children;
					var elw=parseInt(pstyle.paddingLeft,10);
					if(!isNaN(elw))_divw-=elw;
					var elw=parseInt(pstyle.paddingRight,10);
					if(!isNaN(elw))_divw-=elw;
					
					for(var wi=0,wl=_brothers.length;wi<wl;wi++){
						_tempel=_brothers.item(wi);
						//�����ʽ������·�������㡣������
						if(el!=_tempel && _tempel.tagName!='!' && _tempel.tagName!='SCRIPT' && _tempel.tagName!='LINK' && _tempel.tagName!='STYLE' && _tempel.currentStyle.visibility!='hidden' && _tempel.currentStyle.display!='none'&&_tempel.style.left==""&&_tempel.style.right==""){
							_divw-=_tempel._w==null?_tempel.offsetWidth:(_tempel._w+_tempel._wfix);
							
							var _tempelm=parseInt(_tempel.currentStyle.marginLeft,10)
							_divw-=isNaN(_tempelm)?0:_tempelm;
							var _tempelm=parseInt(_tempel.currentStyle.marginRight,10)
							_divw-=isNaN(_tempelm)?0:_tempelm;
							
							_divw-=_tempel.ie6widthfix==true?3:0;
						}
					}
					_w=_divw;

					var elw=parseInt(style.marginLeft,10);
					if(!isNaN(elw))_w-=elw;
					var elw=parseInt(style.marginRight,10);
					if(!isNaN(elw))_w-=elw;

					var elw=parseInt(style.borderLeftWidth ,10);
					if(!isNaN(elw))_w-=elw;
					var elw=parseInt(style.borderRightWidth,10);
					if(!isNaN(elw))_w-=elw;
					
					_w-=el.ie6widthfix==true?3:0
				}
				
				// ������С��������			
				if(_w<_wconfig.min){
					_w=_wconfig.min;
				}
				if(_w<0) _w=0;
				el._w=(_w-el._wfix>0?_w-el._wfix:0);
				el.style.width=el._w+'px';
				
			}
			
			var _hconfig=el.layout.h,_h=_ph,_tempelm;
			if(_hconfig.fit!=null && _hconfig.fit=='auto'){
				if(_hconfig.fit=='auto') {
					var _divh=getOffsetHeight(el.parentElement),_brothers=el.parentElement.children;
					var elh=parseInt(pstyle.paddingTop,10);
					if(!isNaN(elh))_divh-=elh;
					var elh=parseInt(pstyle.paddingBottom,10);
					if(!isNaN(elh))_divh-=elh;
					
					for(var hi=0,hl=_brothers.length;hi<hl;hi++){
						_tempel=_brothers.item(hi);
						var _tstyle=_tempel.currentStyle==null?_tempel.style:_tempel.currentStyle;
							//�����ʽ������·�������㡣���ߣ�
						if(el!=_tempel && _tempel.tagName!='!' && _tempel.tagName!='SCRIPT' && _tempel.tagName!='LINK' && _tempel.tagName!='STYLE' && _tstyle.visibility!='hidden' && _tstyle.display!='none'&&_tempel.style.bottom==""&&_tempel.style.top==""&&_tstyle.position!="absolute"){
							_divh-=_tempel.offsetHeight
							_tempelm=parseInt(_tstyle.marginTop,10);
							_divh-=isNaN(_tempelm)?0:_tempelm;
							_tempelm=parseInt(_tstyle.marginBottom,10)
							_divh-=isNaN(_tempelm)?0:_tempelm;
							_divh-=_tempel.tagName=='FORM'?10:0;
						}
					}
					_h=_divh
					_tempelm=parseInt(style.marginTop,10);
					_h-=isNaN(_tempelm)?0:_tempelm;
					_tempelm=parseInt(style.marginBottom,10);
					_h-=isNaN(_tempelm)?0:_tempelm;
					
					_tempelm=parseInt(style.borderTopWidth,10);
					_h-=isNaN(_tempelm)?0:_tempelm;
					_tempelm=parseInt(style.borderBottomWidth,10);
					_h-=isNaN(_tempelm)?0:_tempelm;
				}
				// ������С��������			
				if(_h<_hconfig.min){
					_h=_hconfig.min;
				}
				if(_h<0 || style.visibility=='hidden' || style.display=='none') _h=0;
				try{
					el._h=(_h-el._hfix>0?_h-el._hfix:0);
					el.style.height=el._h+'px'
				}catch(e){}
			}
			
			// �����¼���ʽ
			if(el.childlayoutelement!=null) _doLayout(el);
		}

	}
	var doLayout=this.doLayout;
	
	// �ݹ�������ò��ֵ�ҳ��Ԫ��
	function initLayoutElement(pel,cel){
		if(cel.ignorelayout==true) return;
		var els=cel.children,el,layout;
		for(var i=0,l=els.length;i<l;i++){
			el=els[i];
			//if(el.tagName=='IFRAME') continue;
			layout=el.getAttribute("layout");
			if(layout!=null && typeof(layout)=='string'){
				try{
					eval("config="+layout)
					addLayout(pel,el,config);
				}
				catch(ex){}
				initLayoutElement(el,el);
			}
			else{
				initLayoutElement(pel,el);
			}
		}
	}
	
	this.init=function(){
		var config,el;
		// ����ҳ������HTMLԪ��
		var root=document.body;
		if(root.initlayout==true) return ;
		root.initlayout=true;
		var els=root.children,layout;
		for(var i=0,l=els.length;i<l;i++){
			el=els.item(i);
			//if(el.tagName=='IFRAME') continue;
			layout=el.getAttribute("layout");
			if(layout!=null && typeof(layout)=='string'){
				try{
					eval("config="+layout)
					addLayout(root,el,config);
				}
				catch(ex){}
				initLayoutElement(el,el);
			}
			else{
				initLayoutElement(root,el);
			}
		}
		setTimeout(function(){
			Ext.lt.layout.doLayout();
			
			for(var i=0,l=_onload_fn.length;i<l;i++){
				//try{
					_onload_fn[i]();
				//}catch(e){}
			}
		},100)
	}
	
	this.on=function(fn){
		_onload_fn.push(fn)
	}
	
	// ����ģ��
	this.template=function(config){
		var _cmp={};
		
		_cmp.draw=function(){
			
			
		}
		
		return _cmp;
	}
	
	
	
	// ��ҳ���л�ȡ��Ҫ��Ҫ�����ֿ��Ƶ�Ԫ��
	Ext.lt.onload(this.init);
	
	Ext.lt.bindEvent(window,'onresize',function(){
		if(!Ext.lt.layout.running){
			Ext.lt.layout.running=true;
			window.setTimeout(Ext.lt.layout.doLayout,200);
		}
	});

}
}


// ҳ����Ϣѭ��
Ext.lt.message=new function(){
	var _reghooks={};
	
	
	// ��ҳ���з�����Ϣ
	this.send=function(src,type,msg){
		if(_reghooks[type+"@"+src]==null) return;
		var fns=_reghooks[type+"@"+src];
		for(var i=0,j=fns.length;i<j;i++){
			fns[i](msg);
		}
	};
	
	// ��ҳ���л�ȡ��Ϣ����ִ��ָ���ص�����
	this.hook=function(src,type,fn){
		if(_reghooks[type+"@"+src]==null) _reghooks[type+"@"+src]=[];
		for(var i=0,j=_reghooks[type+"@"+src].length;i<j;i++){
			// У���ظ�ע��
			if(_reghooks[type+"@"+src][i]==fn) return;
		}
		_reghooks[type+"@"+src].push(fn);
	};

	// ȡ��������ҳ����Ϣ
	this.unhook=function(src,type,fn){
		if(_reghooks[type+"@"+src]==null) return;
		var newfn=[],fns=_reghooks[type+"@"+src];
		
		for(var i=0,j=fns.length;i<j;i++){
			// У���ظ�ע��
			if(fns[i]!=fn) newfn.push(fns[i]);
		}
		_reghooks[type+"@"+src]=newfn;
	};
	
	// ���������Ĭ��alert����
	var _alert=window.alert;
	this.assistfn=function(msg,helpobj){
		if(_reghooks[helpobj+"@assistfn"]==null) return;
		var fns=_reghooks[helpobj+"@assistfn"];
		if(fns==null||fns.length==0)return null;
		return fns[0]();
	}
	
	var _messageDiv=document.createElement('DIV');
	//Ext.lt.HTML.expand(_messageDiv);
	_messageDiv.className='alertbox';
	_messageDiv.style.display='none'
	Ext.lt.HTML.setInnerHTML(_messageDiv,'<div class="message-t"><button class="closebtn" overclass="closebtn_over" clickclass="closebtn_click"></button></div><div class="message-h">����ϵͳ����Ϣ</div><div class="message-c"><table cellSpacing=0><tr><td colSpan=2><div class="content"></div></td></tr><tr class="function"><td class="help"><a href="#">��������ȡ�������</a></td><td class="btn" align="right"><button>ȷ��</button></td></tr></table></div><div class="message-b"></div>');
	
	var _messagedrag=_messageDiv.children.item(1)
	var _messagebody=_messageDiv.children.item(2).firstChild.rows.item(0).cells.item(0).firstChild;
	var _messagehelp=_messageDiv.children.item(2).firstChild.rows.item(1).cells.item(0);
	var _messageclosebtn=_messageDiv.getElementsByTagName('BUTTON').item(0);
	var _messagebtn=_messageDiv.getElementsByTagName('BUTTON').item(1);
	
	var _append=false;
	
	function _close(){
		_messageDiv.style.display='none';
		_messagebody.innerText='';
		_messageDiv.style.height='';
		Ext.lt.message.send('alert','close',this);
		Ext.lt.HTML.unmark();
	}
	
	_messagebtn.onclick=_close;
	_messageclosebtn.onclick=_close;
		
	window.alert=function(msg,helpobj){
		// ����û�г�ʼ�����
		if(document.body==null){
			_alert(msg)
		}
		
		// �����ʾ���Ƿ��Ѿ�׷�ӵ�ҳ����
		if(!_append){
			document.body.appendChild(_messageDiv);
			Ext.lt.HTML.drag({element:_messagedrag,holder:false,dragel:_messageDiv});
			_append=true
		}
		
		// û�а�����Ϣʱʹ�������Ĭ����ʾ����
		if(helpobj==null){
			_alert(msg);
		}
		else{
			if(_messageDiv.style.display==''){
				_messagebody.innerText+="\r\n"+msg;
			}
			else{
				_messagebody.innerText=msg;
				var helpcontent='';
				if(Ext.lt.message.assistfn!=null){
					helpcontent=Ext.lt.message.assistfn(msg,helpobj);
				}
				_messagehelp.innerHTML=helpcontent==null?'':helpcontent;

				_messageDiv.style.display='';
				
				Ext.lt.HTML.center(_messageDiv);
				_messagebody.style.height=_messagebody.offsetHeight>150?150:'auto'
				_messagebody.style.width=474;
				_messageDiv.style.zIndex=Ext.lt.getNextZIndex();
				Ext.lt.HTML.mark();
				Ext.lt.message.send('alert','show');
			}
		}
	}
}


//��Ϣ��ʾ����������
if(Ext.Msg!=null){
	Ext.Msg.buttonText.ok="ȷ��";
	Ext.Msg.buttonText.cancel="ȡ��";
	Ext.Msg.buttonText.yes="ȷ��";
	Ext.Msg.buttonText.no="ȡ��";
}
Ext.lt.shutter=new function(){};


Ext.lt.window=function(d){
	var _config=Ext.lt.apply({icon:'wnd_icon',className:'wnd',style:'',bodystyle:'',title:'&nbsp;',autoshow:true,close:true,w:100,h:100,fitmode:'body',mark:false,drag:true},d)
	if(_config.id==null) _config.id='wnd'+Ext.lt.getNextSeqValue();
	
	
	var wind=document.createElement('DIV');
	wind.id=_config.id;
	wind.className=_config.className;
	if(_config.pop){
		wind.style.cssText='width:'+_config.w+'px;height:'+_config.h+'px';
	}
	Ext.lt.HTML.setStyle(wind,_config.style.replace(/\s/g,''))
	wind.style.display='none';

	
	if(_config.onclose!=null) _config.onclose=Ext.lt.util.fnbind(_config.onclose,wind);
	var _events={
		'close':function(){if(_config.onclose==null){return}else{return _config.onclose()}},
		'show':function(){if(_config.onshow==null){return}else{return _config.onshow()}},
		'hidden':function(){if(_config.onhidden==null){return}else{return _config.onhidden()}}
	};
	function _fireEvent(en,param){
		if(_events[en]!=null) return _events[en](param);
	}


	if(_config.layout!=null)wind.setAttribute('layout',_config.layout);
	
	
	
	
	var _html=['<table width="100%"  border="0" cellSpacing="0" cellPadding="0"><tr class="head"><td class="left"></td><td class="bg"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td class="',_config.icon,'">&nbsp;</td><td class=" title" NOWRAP >',_config.title,'</td><td class="closewidth">',(_config.close?'<button method=close class=btn_close overclass=btn_close_over title=�ر�></button>':''),'</td></tr></table></td><td class="right">&nbsp;</td></tr>',
	'<tr class="foot"><td class="left_bg"></td><td><div class="wbody">',
	'</div></td><td class="right_bg"></td></tr><tr class="foot"><td class="tw_bl"></td><td class="tw_bbg"></td><td class="tw_br"></td></tr></table>'];
	
	wind.resetTitle=function(title){
		var tds=this.head.cells.item(1).innerHTML = title;
	};
	
	wind.draw=Ext.lt.util.fnbind(function(div){
		if(_config.pop){
			document.body.appendChild(this);    
		}
		else{
			div.insertAdjacentElement('beforeBegin',this);
		}
		Ext.lt.HTML.setInnerHTML(this,_html.join(''))
		this.head=wind.firstChild.rows.item(0).cells.item(1).firstChild;
		this.body=wind.lastChild.rows.item(1).getElementsByTagName('DIV').item(0);
		Ext.lt.HTML.setStyle(this.body,_config.bodystyle.replace(/\s/g,''));

		var btns=this.getElementsByTagName('BUTTON');
		for(var i=0;i<btns.length;i++){
			btns[i].onclick=function(){
				var m=this.getAttribute('method');
				if(wind[m]!=null) 
					wind[m]();
			}
		}
		
		this.body.appendChild(div);
		
		if(_config.pop){
			this.style.position='absolute';
	      // ������ק����
	      if(_config.drag){
	    	  Ext.lt.HTML.drag({
		      	element:this.head.rows.item(0).cells.item(1),
		      	dragel:this,
		      	holder:false
		      });
			}
		}
		// ��ʾ����
		if(_config.autoshow){
			this.show();
		}
		else{
//			this.close();	
		}
	},wind);
	
	// �رմ���
	wind.close=function(){
		if(_fireEvent('close')!=false) wind.hidden();
	}
	
	wind.hidden=function(){
		if(_config.mark) Ext.lt.HTML.unmark();
		if(_fireEvent('hidden')!=false)
		wind.style.display='none';
	}
	
	wind.show=Ext.lt.util.fnbind(function(){
		if(_fireEvent('show')==false) return;
		if(_config.mark){
			Ext.lt.HTML.mark();
		}
		this.style.display='';
		this.style.zIndex=Ext.lt.getNextZIndex();
		var w=this.offsetWidth,h=this.offsetHeight;
		if(w==0||h==0) return;
		
		var bodyborder_leftobj=this.body.parentElement.previousSibling
		var bodyborder_left=isNaN(parseInt(bodyborder_leftobj.currentStyle.width,10))?bodyborder_leftobj.offsetWidth:parseInt(bodyborder_leftobj.currentStyle.width,10);
		var bodyborder_rightobj=this.body.parentElement.nextSibling
		var bodyborder_right=isNaN(parseInt(bodyborder_rightobj.currentStyle.width,10))?bodyborder_rightobj.offsetWidth:parseInt(bodyborder_rightobj.currentStyle.width,10);
		var bodyborder_bottomobj=this.body.parentElement.parentElement.nextSibling
		var bodyborder_bottom=bodyborder_bottomobj.offsetHeight;
		
		var divborder = Ext.lt.HTML.getBorderSet(this.body);
		
		
		if(_config.fitmode=='body'){
			var windborder=Ext.lt.HTML.getBorderSet(this);
			w=_config.w;
			h=_config.h;
			this.body.style.width=(w-bodyborder_left-bodyborder_right-windborder.width-divborder.width)+'px';
			this.body.style.height=(h-this.head.offsetHeight-bodyborder_bottom-windborder.height)+'px';
		}
		else if(_config.fitmode=='content'){
			var div=this.body.firstChild;
			var w=div.offsetWidth,h=div.offsetHeight;
			this.body.style.width=(w)+'px';
			this.body.style.height=(h)+'px';
			this.style.width=(bodyborder_left+bodyborder_right+w+divborder.width)+'px'
			this.style.height=(this.head.offsetHeight+h+bodyborder_bottom)+'px'
		}
		
		if(_config.left==null){
			this.style.left=((document.documentElement.offsetWidth-w)/2)+'px';
		}
		else{
			this.style.left=_config.left+'px';
		}

		if(_config.top==null){
			this.style.top=((document.documentElement.offsetHeight-h)*0.4+document.documentElement.scrollTop)+'px';
		}
		else{
			this.style.top=_config.top+'px';
		}
	},wind);
	
	// ���ڰ�ť�¼�
	// wind.attachEvent('onclick',Ext.lt.util.fnbind(function(){
	Ext.lt.bindEvent(wind,"onclick",Ext.lt.util.fnbind(function(){
		var srcel=window.event.srcElement;
		// �÷���ֻ������ť�¼�
		if(srcel.tagName!='BUTTON') return ;
		if(srcel.className=='btn_close'){
			if(_fireEvent('close')!=false){
				this.close();
			}
		}
		
	},wind))
	
	Ext.lt.HTML.expandHTMLElement(wind);
	
	return wind;
}

/**
�����������һ��������ʾ��
�������Ϊһ��DIVԪ�أ���DIVԪ�ؽ�������չ
��ʼ������Ϊ:
  id:String   �������ID�����û��ָ��ID��������������һ��'popwindow'+�����
  className:String  �����ʽ����Ĭ����ʽ����Ϊsel

���������
  checkEvent() Ĭ�ϼ���¼�������û������ڵ�����֮����رյ�����
  show()     ������򿪺�Ϳ�ʼ�����궯������������������������Ͻ��в������Զ��رյ�����
  close()    �رյ����򷽷�
  isShow()     ���ص�������ʾ״̬��true��ʾ������ʾ

�¼���
  onclose    ������ִ��close������������¼�

 */
Ext.lt.popwindow=function(config){
	var cfg=Ext.lt.apply({id:'popwindow'+Ext.lt.getNextSeqValue(),className:'sel'},config);
	var _pop=document.createElement('DIV');
	var _tagel=null;
	
	Ext.lt.aninmation(_pop);
	_pop.className=cfg.className;
	_pop.style.cssText='display:none;z-index:999999;overflow:auto;padding:2px;';
	Ext.lt.HTML.expandHTMLElement(_pop);
	var _popresize=document.createElement('DIV');
	_popresize.className='popresize';
	_popresize.style.cssText='position:absolute;top:100px;left:50px;display:block;width:16px;height:16px';
	
	// Ĭ�ϼ���¼�������û������ڵ�����֮����رյ�����
	_pop.checkEvent=function(srcobj){
			return _pop.contains(srcobj) || (_tagel!=null && _tagel.contains(srcobj))
	}
	_pop.documentEvent=function(){
		if(_pop.checkEvent(event.srcElement)!=true){
			_pop.close();
			document.detachEvent('onclick',_pop.documentEvent);
		}
	}
	// ������򿪺�Ϳ�ʼ�����궯������������������������Ͻ��в������Զ��رյ�����
	_pop.show=function(el){
		if(_pop.style.display!='') {
			_pop.style.display='';
	
			if(el!=null){
				// �����el����������ݶ���ǰ��Ļλ�ü��㵯������ʾ�ڶ������滹������
				var p=Ext.lt.HTML.positionedOffset(el,null,true)
				_pop.style.top=(p.top+el.offsetHeight)+'px';
				_pop.style.left=p.left+'px';
				_pop.style.width=el.offsetWidth+'px';
				el.insertAdjacentElement('beforeBegin',_pop);
				_tagel=el
			}
		}
		else{
			// �����趨�����С
			_pop.style.height='auto'
		}
		
		var bw=Ext.lt.HTML.getBorderSet(_pop);
		var endHeight=_pop.scrollHeight>300?300:_pop.scrollHeight+bw.height;
		if(_pop.scrollWidth-_pop.offsetWidth>bw.width) endHeight+=18;
		_pop.style.height=endHeight<0?0:endHeight+'px';
		
		document.attachEvent('onclick',_pop.documentEvent);
		if(Ext.lt.isFunction(_pop.onshow)){_pop.onshow();}
		

		
	}
	_pop.close=function(){
		_pop.style.display='none';
		_tagel=null;
		document.detachEvent('onclick',_pop.documentEvent);
		if(Ext.lt.isFunction(_pop.onclose)){_pop.onclose();}
	}
	_pop.isShow=function(){return _pop.style.display==''};
	
	/*
	_pop.attachEvent('onmouseenter',function(){
		_pop.appendChild(_popresize);
	});
	*/
	
	
	return _pop;
}

Ext.lt.cookie=new function(){
	var cookie=document.cookie;
	this.add=function(name,value){
		var argv = this.add.arguments;
		var argc = this.add.arguments.length;
		var expires = (argc > 2) ? argv[2] : null;
		var path = (argc > 3) ? argv[3] : null;
		var domain = (argc > 4) ? argv[4] : null;
		var secure = (argc > 5) ? argv[5] : false;
		document.cookie = name + "=" + escape(value)
				+ ((expires == null) ? "" : ("; expires=" + expires.toGMTString()))
				+ ((path == null) ? "" : ("; path=" + path))
				+ ((domain == null) ? "" : ("; domain=" + domain))
				+ ((secure == true) ? "; secure" : "");
	}
	this.del=function(name){
		var exp = new Date();
		exp.setTime(exp.getTime() - 100);
		var cval = this.get(name);
		document.cookie = name + "=" + cval + "; expires="
			+ exp.toGMTString() + ";path=/";
	}
	this.get=function(key){
		var reg=key+'=(.*)';
		var vs=new RegExp(reg).exec(cookie)
		if(vs!=null){
			return vs[1].split(/;.*/)[0];
		}
		return null;
	}
	this.getKeys=function(){
	
	}
}

if(window.info_load==null) info_load={};
Ext.lt.showPageTest=function(){
	var tpltest='<table width=\'100%\' style=\'background:#fff\' height=\'40\'><tr><td colspan=2 style=" height:20px;font-size:12px; background:#FFF url(\''+_ROOT_PATH_+'/ltext/images/page_test_title.gif\') no-repeat left top;padding-left:18px;padding-top:1px;">���ܲ���</td></tr>'
	+'<tr><td ><ul><li>Javascript����&nbsp;��{js}</li><li>DHTML���ܡ���&nbsp;&nbsp;��{dhtml}</li><li>HTML���ܡ���&nbsp;&nbsp;&nbsp;��{html}</li><li>���ٲ��ԡ���&nbsp;&nbsp;&nbsp;��{web}</li></ul></td><td width=\'150\'>������:{all}</td></tr></table>';
	function showTest(obj){
		if(obj.web==null||obj.web=='null')obj.web=0;
		var value=obj.web;
		if(value!=0)value=(1/value)*10000;
		obj.web=value;
		if(value>1024){
			value=(value/1024+'').toNumber(2,false,1)+"MB/s";
		}else{
			value=(value+'').toNumber(2,false,1)+"KB/s";
		}
		obj.all=60
		obj.txt=''
		if(obj.js<3000){obj.all=parseFloat((obj.js/100+'').toNumber(2,false,1),10)}
		
		if(obj.web<40){
			obj.all+=parseFloat((obj.web/100+'').toNumber(2,false,1),10)
		}else{
			obj.all+=40;
		}
		
		if(obj.js<2000){
			if(Ext.lt.ieversion<8){
				obj.txt='����������������汾��';
			}else{
				obj.txt='�����������������á�';
			}
		}
		if(obj.web<20){
			obj.txt+='\t�������绷���ϲ���ط����ٶȽϵ͡�';
		}
		if(obj.txt==''){
			obj.txt='���Ļ���״̬���á�';
		}
		return tpltest.replace('{js}',obj.js).replace('{dhtml}',obj.dhtml).replace('{html}',obj.html).replace('{web}',value).replace('{all}',obj.all);
	}
	var cookie=Ext.lt.cookie.get('loadtest');
	var info_test=null;
	if(cookie!=null){
		info_test=Ext.lt.util.JSON.decode(cookie.replace(/%7B/g,'{').replace(/%22/g,'').replace(/%3A/g,':').replace(/%20/g,' ').replace(/%7D/g,'}').replace(/%2C/g,','));
		//info_test={js:0,dhtml:0,html:0,web:0,all:0};
	}else{
		info_test={js:0,dhtml:0,html:0,web:0,all:0};
	}
	function testjs(){
		var str="";
		var d=new Date();
		while(new Date()-d<1000){
			str+="s";
		}
		info_test.js=str.length;
	}
	function testDhtml(){
		var div=document.getElementById("test_html_div");
		var d=new Date();
		while(new Date()-d<1000){
			div.appendChild(document.createElement("div"));
		}
		info_test.dhtml=div.childNodes.length;
	}
	function testhtml(){
		var l=0;
		var d=new Date();
		while(new Date()-d<1000){
			document.createElement("div");
			l++;
		}
		info_test.html=l;
	}
	function testweb(){
		var statr=new Date();
		var v=Ext.lt.RCP.asynserver('com.longtu.managerconsole.loadtest.LoadTestComponent','loadTest',null);
		var statrtest=new Date();
		var v2=Ext.lt.RCP.asynserver('com.longtu.managerconsole.loadtest.LoadTestComponent','loadTest1M',null);
		//100kb
		var end=new Date();
		info_test.web=(end-statrtest)-(statrtest-statr);
	}
	function setcookie(){
		var v=Object.toJSON(info_test);
		var expdate = new Date();
		expdate.setTime(expdate.getTime() + (24 * 60 * 60 * 1000 * 31));
		Ext.lt.cookie.add('loadtest',v,expdate);
	}
	function loadshow(div,info_test){
		if(info_test.txt==null)info_test.txt='';
		div.innerHTML=["<table width=\'100%\' style=\'background:#fff\' ><tr height=\'80\'><td id=\'test_web_sef\'></td></tr><tr height=\'80\'><td id=\'test_web_w\'>�ۺ����ۣ�",
		info_test.txt
		,"</td></tr></table>"].join('');
		
		var chart = new FusionCharts(_ROOT_PATH_+"/ltext/Charts/Bar2D.swf", "ChartId3", "480", "60");
		var xml=[];
		xml.push('<chart palette=\'5\' yAxisMinValue=\'0\' yAxisMaxValue=\'100\'  decimals=\'0\'  baseFontSize =\'12\'  enableSmartLabels=\'1\' enableRotation=\'0\' bgColor=\'99CCFF,FFFFFF\' bgAlpha=\'40,100\' bgRatio=\'0,100\' bgAngle=\'360\' showBorder=\'1\' >');
		xml.push('<set label=\'���ĵ÷�\' value=\'',info_test.all,'\' />'); 
		xml.push('</chart>');
		chart.setDataXML(xml.join(''));
		chart.render("test_web_sef","test_web_sef", "480", "60");
	}
	function showFlash(){
		var chart = new FusionCharts(_ROOT_PATH_+"/ltext/Charts/Pie2D.swf", "ChartId", "200", "170");
		var xml=[];
		xml.push('<chart palette=\'1\' showLabels=\'0\'  baseFontSize =\'12\' showValues=\'0\'   bgColor=\'99CCFF,FFFFFF\' bgAlpha=\'40,100\' bgRatio=\'0,100\' bgAngle=\'360\' showBorder=\'1\' >');
		xml.push('<set label=\'��Դ����ʱ��\' value=\'',info_load.npublics,'\' color=\'883366\' />'); 
		xml.push('<set label=\'ocx����ʱ��\' value=\'',info_load.nocxs,'\' color=\'878345\'/>');
		xml.push('<set label=\'�������ʱ��\' value=\'',info_load.ncomponents,'\' color=\'11ffee\'/>');
		xml.push('<set label=\'ģ�洴��ʱ��\' value=\'',info_load.ntemplates,'\' color=\'f674f6\'/>');
		xml.push('<set label=\'����ʱ��\' value=\'',info_load.other,'\' color=\'1155ff\'/>');
		xml.push('</chart>');
		chart.setDataXML(xml.join(''));
		chart.render("chart");
	}
	function loadnavigator(){
		var value=window.navigator;
		function os(){
			var vs=new RegExp(/Windows NT (\d{1,}.\d{1,})/).exec(value.userAgent);
			if(vs==null)return "��������ϵͳ";
			var v=parseFloat(vs[1]);
			if(v<5.1)return 'WINDOWS 2000';
			if(v==5.1)return 'WINDOWS XP';
			if(v==5.2)return 'WINDOWS 2003';
			if(v==6.0)return 'WINDOWS Vista';
			if(v==6.1)return 'WINDOWS 7';
			if(v==6.8)return 'WINDOWS 8';
			return "��������ϵͳ"
		}
		function userLanguage(){
			if(value.userLanguage=='zh-cn') return '��������';
			return value.userLanguage;
		}
		function browser(){
			var vs=new RegExp(/MSIE (\d{1,}.\d{1,})/).exec(value.userAgent);
			if(vs==null)return "���������";
			return "IE "+vs[1];
		}
		var tpl='<table width=\'100%\' style=\'background:#fff\' height=\'30\'><tr><td>����ϵͳ��'+os()+' </td><td>���������ͣ�'+value.cpuClass+'</td></tr><tr><td>���Ի�����'+userLanguage()+'</td><td>������汾��'+browser()+'</td></tr></table>';
		return tpl;
	}
	function loadtime(obj){
		var tpl=[];
		tpl.push('<table width=\'100%\' height=\'200\' style=\'background:#fff\'>');
		tpl.push('<tr><td colspan=2 style=" height:20px;font-size:12px; background:#FFF url(\''+_ROOT_PATH_+'/ltext/images/page_test_title.gif\') no-repeat left top;padding-left:18px;padding-top:1px;">����������</td></tr>');
		tpl.push('<tr><td><ul style=\'height:170px;overflow: scroll;\'>');
		tpl.push('<li><span style="background:#1155ff">��</span>&nbsp;ҳ�����ʱ�䣺',obj.all,'</li>');
		var _all=obj.all
		obj.npublics=0;
		var _npublics=[];
		for(var r in obj.npublic){
			obj.npublics+=obj.npublic[r];
			_npublics.push('<li>��',r,'��',obj.npublic[r],'</li>');
		}
		_all-=obj.npublics
		tpl.push('<li style="padding-top:1px"><span style="background:#883366">��</span>&nbsp;��Դ����ʱ�䣺',obj.npublics,'<ul>');
		tpl.push(_npublics.join(''));
		tpl.push('</ul></li>');
		obj.nocxs=0;
		for(var r=0 ;r<obj.nocx.size();i++){
			obj.nocxs+=obj.nocx[r];
		}
		_all-=obj.nocxs
		tpl.push('<li style="padding-top:1px"><span style="background:#878345">��</span>&nbsp;ocx����ʱ��&nbsp;��',obj.nocxs,'</li>');
		
		obj.ncomponents=0;
		var _ncomponents=[];
		for(var r in obj.ncomponent){
			obj.ncomponents+=obj.ncomponent[r];
			_ncomponents.push('<li>��',r,'��',obj.ncomponent[r],'</li>');
		}
		tpl.push('<li style="padding-top:1px"><span style="background:#11ffee">��</span>&nbsp;�������ʱ�䣺',obj.ncomponents,'<ul>');
		tpl.push(_ncomponents.join(''));
		tpl.push('</ul></li>');
		_all-=obj.ncomponents
		obj.ntemplates=0;
		var _ntemplates=[];
		for(var r in obj.ntemplate){
			obj.ntemplates+=obj.ntemplate[r];
			_ntemplates.push('<li>��',r,'��',obj.ntemplate[r],'</li>');
		}
		_all-=obj.ntemplates
		tpl.push('<li style="padding-top:1px"><span style="background:#f674f6">��</span>&nbsp;ģ�洴��ʱ�䣺',obj.ntemplates,'<ul>');
		tpl.push(_ntemplates.join(''));
		tpl.push('</ul></li>');
		obj.other=obj.all-_all;
		tpl.push('</ul></td><td width="200" id="chart"></td></tr>');
		tpl.push('</table>');
		return tpl.join("");
	}
	
	if(Ext.lt.showPageTest.win==null){
		Ext.lt.showPageTest.win=Ext.lt.window({title:"���ܲ���", w:545, h:571,close:true,className:'wind7',pop:true,mark:false});
		var _div=document.createElement("div");
		document.body.appendChild(_div);
		_div.style.height='510px';
		_div.style.width='500px';
		_div.style.color='#003399';
		_div.style.background='#C9d5e4';
		_div.style.fontSize='12px';
		//_div.style.width='500px';
		var _divhtml=[];
		_divhtml.push(loadnavigator());
		_divhtml.push(loadtime(info_load));
		_divhtml.push("<div id='test_html_div_show' style='background:#fff'>");
		_divhtml.push(showTest(info_test));
		_divhtml.push("</div>");
		_divhtml.push("<div id='test_html_div_flash' style='height:170px;'></div>");
		_divhtml.push("<center ><button onclick='Ext.lt.message.send(\"page_test\",\"test\")' style='border:0; width:64px; height:22px; line-height:22px; background:url("+_ROOT_PATH_+"/ltext/images/btn.gif) no-repeat left center; cursor:pointer; margin-left:5px;'>�⡡�ԡ�</button>&nbsp;&nbsp;&nbsp;<button onclick='Ext.lt.showPageTest.win.hidden();' style='border:0; width:64px; height:22px; line-height:22px; background:url("+_ROOT_PATH_+"/ltext/images/btn.gif) no-repeat left center; cursor:pointer; margin-left:5px;'>ȷ���ϡ�</button></center>");
		_divhtml.push("<div id=\'test_html_div\' style=\'visibility: hidden\'/>");
		_div.innerHTML=_divhtml.join('');
		Ext.lt.showPageTest.win.draw(_div);
		showFlash();
		loadshow(document.getElementById("test_html_div_flash"),info_test);
	}
	Ext.lt.message.hook("page_test","test",function(){
		testjs();
		testDhtml();
		testhtml();
		testweb();
		setcookie();
		document.getElementById('test_html_div_show').innerHTML=showTest(info_test)
	});
	Ext.lt.showPageTest.win.show();
}
Ext.lt.regKeyEvent('v',Ext.lt.showPageTest,true,true);
//ie9����
Ext.lt.showIE9Test=function(){window.open("http://ie9pvz.lonelystar.org/");}
Ext.lt.regKeyEvent('eev',Ext.lt.showIE9Test,true,true);







/**
�����������

˵����
Ϊ����ҳ������ṩ���з�����ȱʡ��Ϊ������ҳ�������Ҫ�̳иö���
��������ȿ�����ģ�����ʹ�ã�Ҳ���Զ���ʹ�á���ˣ�ÿ���������ʵ��draw��resize������
ʵ�ֽ������ʱ�Ƽ����ý������Ϊ����ı�̷��Ҳ������ͨ��������Ϣ�����������������HTMLԪ�ء�֮����Ϊ����пɽ�������������Ϊ���¼���

 */
Ext.lt.nullcomponent={draw:function(){},resize:function(){}};
Ext.lt.component=function(cmp){
	
	//��ָ����HTMLԪ���л���ҳ�����������һ����DIV����Ҳ������ָ�������ID���÷�������ʵ�� 
	//��֤�ɹ��󣬵���ҳ�������draw���� 
	var draw=function(el){
		if(el==null || (el!=null && el.innerHTML==null)){
			//datatable �ڸİ������ԭ�е�draw����û�в���
			//alert('û��ָ���������ݹ��������HTMLԪ��');
			return true;
		}
		Ext.lt.HTML.expandHTMLElement(el);
		return true;
	};
	
	// ��֤�����ö���Ŀ����ߡ��������ʱû��ָ�����������Ѷ���ȱʡ������Ϊ׼���÷�������ʵ�� 
	var resize=function(w,h){
		if(isNaN(w) || w<0) w=0;
		if(isNaN(h) || h<0) w=0;
		return true;
	};
	
	// ���ö����¼����������� ����Ϊjs����keyΪ�¼�����
	this.on=function(en){
		
	};
	
	// ����ָ���¼��� �¼����ƺʹ���������on����ָ�� 
	this.fireEvent=function(eventname,callback){
		alert('call '+eventname);
	}
	
	// ��ָ����HMTL����������������ý��� 
	this.showconfig=function(el){
		cmp.showconfig(el);
	};
	
	// ����������õķ���
	this.saveconfig=function(){
		cmp.saveconfig();
	}
	
	// ��ҳ�����ȱʡ�������ӵ����������
  // �������׼����draw��resize�����ӵ�ָ�������ϡ���ִ�����׼��������ִ�����ԭ���ķ�������draw����Ϊ����
	this.exp=function(cmp){
		if(Ext.lt.isFunction(cmp['draw'])){
			var _fn_draw=Ext.lt.util.fnbind(cmp['draw'],cmp);
		cmp.draw=function(e){if(draw(e)!=false) _fn_draw(e)};
		}
		if(Ext.lt.isFunction(cmp['resize'])){
			var _fn_resize=Ext.lt.util.fnbind(cmp['resize'],cmp);
			cmp.resize=function(w,h){if(resize(w,h)!=false) _fn_resize(w,h)};
		}
		
		// ׷���������
		if(cmp['on']==null) cmp['on']=this['on'];
		if(cmp['fireEvent']==null) cmp['fireEvent']=this['fireEvent'];
		if(cmp['showconfig']==null) cmp['showconfig']=this['showconfig'];
		if(cmp['saveconfig']==null) cmp['saveconfig']=this['saveconfig'];
	}
	
	this.exp(cmp);
	return cmp;
}


// Ϊ�˼���һ�ﲻ���ִ�Сд��xx
var ext=Ext
ext.lt.recordset.toarray=ext.lt.recordset.toArray;
/*
 *	�����ṩ����draw(div)���˵����Ƶ��Ǹ�div�ϡ�
 *	�ṩ����close()      : �رմ��ڡ�
 *	������¼�������������ǵ���ڲ˵��������ʾ�ر���
 *	�����ڴ�С�ı���е���layout��dolayout֮����Ҳ�ر�
 *	config�������ݣ�
 *			data������
 *			className:��ʽ������ͨ������className���ı�˵���ʽ
 *			field: id,name,code,sid(�˵����ڵ㣬���ڱ�ʾ���ι�ϵ),click(����˵��ڵ�ʱ�ķ���),ico(�ڵ�ǰ���ͼ��)
 *			��֧��select������
 */
Ext.lt.Popupmenu=function(cfg){
	this.version='v1.0';
	this.buildMenu=true;
	if(Ext.lt.Popupmenu.divs==null)Ext.lt.Popupmenu.divs=[];
	if(Ext.lt.Popupmenu.leveldiv==null)Ext.lt.Popupmenu.leveldiv={};
	var _config=Ext.lt.apply({data:{},values:[],el:null,field:{id:'itemid',name:'name',code:'code',sid:'superitemid'},className:'popupmenu',outformart:'#name',on:{},maxHeight:true},cfg);
	var values={};
	for(var i=0,l=_config.values.length;i<l;i++){
		values[_config.values[i]]=i;
	}
	_config._values=values;
	var _id='menu'+Ext.lt.getNextSeqValue();
	var _data=_config.data.toArray();
			_data.size=_config.data.length;
	var _menu=null;
	//�������ݡ�
	for(var i=0;i<_data.size;i++){
		if(_data['PK_'+_data[i][_config.field.sid]]==null)_data['PK_'+_data[i][_config.field.sid]]=[];
		_data['PK_'+_data[i][_config.field.sid]].push(_data[i]);
		_data[_id+'_PK_'+_data[i][_config.field.id]]=_data[i];
		_data[i].isleaf=true;
	}
	//�Ӹ����ڵ㡣
	_data[_id+'_PK_0']={};
	//�����Ƿ����ӽڵ�
	for(var i=0;i<_data.size;i++){
		_data[_id+'_PK_'+_data[i][_config.field.sid]].isleaf=false;
		//�������ʾ�ص���������Ϊ�����ӽڵ㡣
		if(_data[i].show!=null){
			_data[i].isleaf=false;
		}
		if(_data[i].end){
			_data[i].end='end';
		}else{
			_data[i].end='';	
		}
	}
	_config.fields=[];
	for(var e in _config.field){
		_config.fields.push(_config.field[e]);
	}
	_buildMenuHTML=function(div,_cfg,sid,level){
		Ext.lt.Popupmenu.buildMenu=true;
		if(sid==null)sid=0;
		if(level==null)level=0;
		div.style.height='auto';
		var _id=_cfg.id;
		var _d=_cfg.data['PK_'+sid];
		if(_d==null||_d.length==0)return;
		var _html=[];
		var _template=Ext.lt.out.template(_cfg.outformart);
		_template.setField(_cfg.fields);
		if(div.id==null){
			div.id=_cfg.id	
		}
		_html.push('<div><table border="0" id="',div.id,'_t"  cellpadding="0" cellspacing="0" >');
		
		for(var i=0;i<_d.length;i++){
			var s=_d[i].name;
			if(s=='|'){
				_buildSplitLine(_d[i],_html)
			}else{
				_buildMenuLine(_d[i],_html,i,_template,_cfg)
			}
		}
		_html.push('</table></div>');
		div.innerHTML=_html.join('');
		if(_cfg.maxHeight!=true){
				_build2Scroll(div,_cfg);
		}
		if(div.className==null||div.className==''){
			div.className=_cfg.className;
		}
		div.ismenu=true;
		_buildEvent(div,_cfg,level);
		Ext.lt.Popupmenu.buildMenu=false;
	}
	function _build2Scroll(div,_cfg){
		var mh=_cfg.maxHeight;

		var pos=Ext.lt.HTML.positionedOffset(div,document.body,true);
		var dElHeightType='offsetHeight';
		
		if(mh=='auto'){
			mh=document.documentElement[dElHeightType]+document.documentElement.scrollHeight-pos.top-50;
		}else{
			if(mh+pos.top>(document.documentElement[dElHeightType]+document.documentElement.scrollTop)&&mh<div.clientHeight){
				mh=document.documentElement[dElHeightType]+document.documentElement.scrollTop-pos.top-50;
			}
		}
		var ith=document.getElementById(div.id+'_t').firstChild.firstChild.clientHeight;
		mh=mh-(mh-12)%ith;
		div.style.width='auto';
		if(div.clientHeight<=mh){return}
		div.style.height=mh;
		_cfg.scroll=new Ext.lt.scroll({itemlength:ith*5,el:div.firstChild});
		_cfg.scroll.draw();
		_cfg.scroll.cfg.top.setAttribute('ismenu',true);
		_cfg.scroll.cfg.bottom.setAttribute('ismenu',true);
		_cfg.scroll.cfg.top.innerHTML="<div style='width:25px' class='scrollico' ismenu=true>&nbsp;</div><div style='width:"+(div.clientWidth-25)+"px' class='scrollitem' ismenu=true>&nbsp;</div>";
		_cfg.scroll.cfg.bottom.innerHTML="<div style='width:25px' class='scrollico' ismenu=true>&nbsp;</div><div style='width:"+(div.clientWidth-25)+"px' class='scrollitem' ismenu=true>&nbsp;</div>";
	}
	
	function _buildMenuLine(_d,_html,i,_template,_cfg){
			if(_d.fn!=null){s=_d.fn()}
			else{
				s=_template.out(_d);
			}
			_html.push("<tr height=25px  id ='",_cfg.id,'_PK_',_d[_cfg.field.id],"' vid='",_d[_cfg.field.id],"' ",_d.disabled==true?"disabled":""," itemnum=",i,"  class='item ");
			if(_cfg._values[_d[_cfg.field.id]]!=null){
				_html.push(" select ");	
			}
			_html.push(_d.end,"' ismenu=true>");
			_html.push("<td width=25px ismenu=true style='");
			if(_d.ico){
				_html.push("background:url(",_d.ico,");");
			}
			if(_d.icostyle){
				_html.push(_d.icostyle);
			}
			if(_d.icoclass){
				_html.push("' class='",_d.icoclass);
			}
			_html.push("'><div style='width:25px'></div></td><td class='itemtd ",(_d.isleaf==true?'':'notleaf'),"'  nowrap='nowrap' ismenu=true>",s,"</td></tr>");
	}
	function _buildSplitLine(_d,_html){
			_html.push("<tr ismenu=true><td colspan=2 ismenu=true class='split'>&nbsp;</td></tr>");
	}


	//��ʼ�����¼�����ʽ��
	_buildEvent=function(div,_cfg,level){
		var cn=document.getElementById(div.id+'_t').firstChild.childNodes;
		for(var i=0;i<cn.length;i++){
			if(cn[i].tagName=='TR'){
				_buildItem(cn[i],_cfg,level)
			}
		}
	}
	_buildItem=function(item,_cfg,level){
		var d=_cfg.data[item.id];
		item.level=level;
		var l=item.level;
		
		var div=document.getElementById(_cfg.id+'_itemdiv'+(l+1));
		if(div==null){
			div=document.createElement('div');
			div.id=_cfg.id+'_itemdiv'+(l+1);
			div.className=_cfg.className;
			//document.body.appendChild(div);
			div.style.visibility='hidden';
			_cfg.el.appendChild(div);
			Ext.lt.Popupmenu.divs.push(div);
		}
		//span��������ʽ����,���ӽڵ㣬��������Ƴ�����ʽ���
		
		item.onmouseover=function(){
			//��ɫ1
			var d=_cfg.data[item.id];
			if(d==null)return;
			//�Ƿ����ӽڵ�
			var cfg=Ext.lt.Popupmenu;
			if(cfg.showli==null){cfg.showli=[];}
			if(cfg.showli[item.level]){
				cfg.showli[item.level].className=cfg.showli[item.level].className.replace(/ selected/g,'');
			}
			if(item.className=='split')return;
			this.className+=' selected';
			cfg.showli[item.level]=this;
			_cfg.el.appendChild(div);
			if(!d.isleaf){
				//�Ƿ��Լ������ֽڵ�
				Ext.lt.Popupmenu.buildMenu=true;
				if(d.show!=null){
					d.show(div,_cfg,this.vid,this.level+1);
					setChildNodeAttribute(div.childNodes);
				}else{
					_buildMenuHTML(div,_cfg,this.vid,this.level+1);
				}
				
				var pos=Ext.lt.HTML.positionedOffset(this,_cfg.el,false);
				//window.status=x+';'+y;
				window.status=pos.left+this.offsetWidth
				var x=pos.left+this.offsetWidth;
				var y=pos.top+5;
				//window.status='x='+x+';y='+y
				div.style.left=x+'px';
				div.style.top=y+'px';
				div.style.visibility='visible';
				Ext.lt.Popupmenu.leveldiv[this.level]=div;
			}else{
				if(Ext.lt.Popupmenu.leveldiv[this.level]!=null)
				Ext.lt.Popupmenu.leveldiv[this.level].style.visibility='hidden';
			}
			//�ر��¼��Ľڵ���	
			for(var e in Ext.lt.Popupmenu.leveldiv){
				if(e>this.level){
					Ext.lt.Popupmenu.leveldiv[e].style.visibility='hidden';
				}
			}
		}
		item.onmouseout=function(){
			//��ɫ2	
		//	this.className=this.className.replace(' selected','');
		}
		item.onclick=function(){
			if(d.href!=null&&d.href.length>0){
				window.open(d.href,d.target);
				//�ر�
				_close();
			}else	if(d.click!=null){
				_close();
				d.click(d);
			}
		}
	}
	function setChildNodeAttribute(cn){
		if(cn==null)return;
		for(var i=0;i<cn.length;i++){
			if(cn[i].tagName!=null){
				cn[i].setAttribute('ismenu',true);
				setChildNodeAttribute(cn[i].childNodes);
			}	
		}
	}
	function _close(){
		for(var i=0;i<Ext.lt.Popupmenu.divs.length;i++){
			Ext.lt.Popupmenu.divs[i].style.visibility='hidden';
		}
		Ext.lt.message.send("Popupmenu","closed");
		var showli=Ext.lt.Popupmenu.showli;
		if(showli!=null){
			for(var i=0;i<showli.length;i++){
				showli[i].className=showli[i].className.replace(/ selected/g,'');
			}
		}
	}
	
	function _mouselistener(en){
		// �����Ϊ�������¼����ǴӲ˵������ڲ�������
		for(var i=0;i<Ext.lt.Popupmenu.divs.length;i++){
			if(Ext.lt.Popupmenu.divs[i].contains(en.srcElement)){
				return;
			}
		}
		_close();
		// ����¼���
		//document.detachEvent ('onmousedown',_mouselistener);
		_mouselistener.unbindEvent(document,'onmousedown');
	}
	
	Ext.lt.message.hook("Popupmenu","close",_close);
	_menu={
		cfg:_config,
		id:_id,
		draw:function(div){
			if(!this.cfg.drawed){
				this.cfg.el=div
				Ext.lt.Popupmenu.divs.push(div);
				_buildMenuHTML(div,this.cfg);
				this.cfg.drawed=true;
				// ������¼�
			//	document.attachEvent('onmousedown',_mouselistener);
			}
			this.show();
		},
		show:function(){
			if(this.cfg.drawed){
				this.cfg.el.style.visibility='visible';
			}
			// ������¼�
			//document.attachEvent('onmousedown',_mouselistener);
			Ext.lt.bindEvent(document,'onmousedown',_mouselistener);
		},
		resize:function(w,h){
			
		},
		setDisabled:function(id,b){
			this.cfg.data[this.cfg.id+"_PK_"+id].disabled=b;
			document.getElementById(this.cfg.id+"_PK_"+id).disabled=b;
		},
		close:function(){
			_close();
		}
	};
	_menu.cfg.id=_menu.id;
	return _menu;
}
}
/*
 *	�����ṩ����draw(div)���˵����Ƶ��Ǹ�div�ϡ�
 *	�ṩ����close()      : �رմ��ڡ�
 *	������¼�������������ǵ���ڲ˵��������ʾ�ر���
 *	�����ڴ�С�ı���е���layout��dolayout֮����Ҳ�ر�
 *	config�������ݣ�
 *			data������
 *			className:��ʽ������ͨ������className���ı�˵���ʽ
 *			field: id,name,code,sid(�˵����ڵ㣬���ڱ�ʾ���ι�ϵ),click(����˵��ڵ�ʱ�ķ���),ico(�ڵ�ǰ���ͼ��)
 *			��֧��select������
 */
Ext.lt.TabPanel=function(cfg){
	this.version='v1.0';
	var _config=Ext.lt.apply({items:[],className:'tabpanel',activeTab:0,on:{},buttons:[],buttonAlign:'center'},cfg);
	_config.itemsid=-1;
	var _id='menu'+Ext.lt.getNextSeqValue();
	_config.id=_id;
	function _activate(t,i,_b){
		var item=t.cfg.items[t.cfg.activeTab];
		if(item==null)return;
		item.el.style.display='none';
		item.titleel.className='title';
		t.cfg.activeTab=i;
		var item=t.cfg.items[t.cfg.activeTab];
		item.el.style.display='inline';
		item.titleel.className+=' select';
		if(_b){
			var d=t.cfg.el.firstChild.childNodes[1];
			d.setAttribute('scroll',i);
			var pos=Ext.lt.HTML.positionedOffset(item.titleel,d.firstChild,false);
			//d.firstChild.style.left=pos.left*-1+'px';
			Ext.lt.aninmation(d.firstChild);
			d.firstChild.setAnimatProperty('style.left',d.firstChild.offsetLeft,-1*pos.left);
			d.firstChild.play(150)
			scroll2Activate(t.cfg.el.firstChild.childNodes[1],i,item);
		}
		if(t.cfg.aftershow!=null){
			t.cfg.aftershow(t,item);	
		}
	}
	function _remove(t,i){
		var d=t.cfg.el;
		var item=t.cfg.items[i];
		if(item==null)return;
		var top=d.firstChild.childNodes[1].firstChild;
		var main=d.lastChild;
		var elw=item.titleel.offsetWidth
		main.removeChild(item.el);
		top.removeChild(item.titleel)
		var w=top.offsetWidth-elw;
		top.style.width=w+'px';
	}
	function _addItems(t,i){
		var d=t.cfg.el;
		var top=d.firstChild.childNodes[1].firstChild;
		var main=d.lastChild;
		if(i.el==null){
			i.el=document.createElement('div');
		}
		if(i.html!=null){
			i.el.innerHTML=i.html;	
		}
		main.appendChild(i.el);

		var title=document.createElement('div');
		title.className='title';
		title.innerHTML="<div class='title_left'></div><div class='title_center'>"+i.title+"</div><div class='title_right'></div>";
		top.appendChild(title);
		title.index=_config.itemsid+1;
		_config.itemsid++;
		i.titleel=title;
		i.el.style.display='none';
		title.onclick=function(){
			_activate(t,this.index,true);
		}
		var w=title.offsetWidth+top.offsetWidth;	
		top.style.width=w+'px';
	}
	
	function _initButton(d,t){
		if(t.cfg.buttons.length==0)return;
		var btns=document.createElement('div')
		btns.className='buttons';
		btns.id='tabpanel_buttons'+t.id;
		//btns.style.width=d.offsetWidth+'px';
		btns.align=t.cfg.buttonAlign;
		for(var i=0;i<t.cfg.buttons.length;i++){
			var btn=document.createElement('button');
			if(t.cfg.buttons[i].text==null){
				btn.innerText='';
			}else{
				btn.innerText=t.cfg.buttons[i].text;
			}
			if(t.cfg.buttons[i].handler!=null){
				btn.onclick=t.cfg.buttons[i].handler;
			}
			if(t.cfg.buttons[i].className!=null){
				btn.className=t.cfg.buttons[i].className;
			}
			t.cfg.buttons[i].el=btn;
			btns.appendChild(btn);
		}
		d.appendChild(btns);
	}
	
	function _draw(d,t){
		d.className=t.cfg.className;
		d.innerHTML=["<div class='top' id='tabpanel_top",t.id,"'><div class='left' id='tabpanel_left",t.id,"'></div><div class='centersorll' id='tabpanel_title",t.id,"'><div class='center'></div></div><div class='right' id='tabpanel_right",t.id,"'></div></div><div class='main' style='height:",
		d.offsetHeight-(t.cfg.buttons.length==0?30:60),"px' id='tabpanel_main",t.id,"'></div>"].join('');
		
		d.firstChild.style.width=d.offsetWidth+'px';
		d.firstChild.childNodes[1].style.width=d.offsetWidth-26+'px';
		
		d.firstChild.firstChild.onclick=function(){
			var titlesdiv=this.parentNode.childNodes[1]
			scroll(titlesdiv,-1);
		}
		d.firstChild.lastChild.onclick=function(){
			var titlesdiv=this.parentNode.childNodes[1]
			scroll(titlesdiv,1);
		}
		
		for(var i=0;i<t.cfg.items.length;i++){
			_addItems(t,t.cfg.items[i]);
		}
		_activate(t,t.cfg.activeTab,true);
		_initButton(d,t);
	}
	function scroll2Activate(d,i,item){
		//����ǵ�һ��
		if(d.scrollWidth<=d.offsetWidth){
			d.parentNode.childNodes[0].className='leftnotscroll';
			d.parentNode.childNodes[2].className='rightnotscroll';
			return ;
		}
		if(i==0){
			if(d.parentNode.childNodes[0].className!='leftnoscroll'){
				d.parentNode.childNodes[0].className='leftnoscroll';	
			}
		}else{
			if(d.parentNode.childNodes[0].className=='leftnoscroll'){
				d.parentNode.childNodes[0].className='left';	
			}
		}
		//�жϵ�ǰλ���Ƿ������Ҳ಻���й�����
		if(item.titleel.offsetLeft>=(d.firstChild.offsetWidth-d.clientWidth)){
			if(d.parentNode.childNodes[2].className!='rightnoscroll'){
				d.parentNode.childNodes[2].className='rightnoscroll';
			}
			
		}else{
			if(d.parentNode.childNodes[2].className=='rightnoscroll'){
				d.parentNode.childNodes[2].className='right';	
			}
		}
		
	}
	function scroll(d,r){
		if(d.parentNode.childNodes[2].className=='rightnoscroll'&&r==1){return;}
		if(d.parentNode.childNodes[0].className=='leftnoscroll'&&r==-1){return;}
		var sindex=d.getAttribute('scroll');
		var allw=0;
		for(var i=sindex;i>=0&&i<d.firstChild.childNodes.length-1;){
			
			allw+=d.firstChild.childNodes[i].offsetWidth;
			i=i+(1*r);
			if(allw>d.clientWidth){
				i=i-(1*r);
				d.setAttribute('scroll',i);
				allw-=d.firstChild.childNodes[i].offsetWidth;
				break;
			}else if(allw==d.clientWidth){
				d.setAttribute('scroll',i);	
				break;
			}
		}
		var l=allw*r-d.firstChild.offsetLeft;
		if(r==1&&l>=(d.firstChild.offsetWidth-d.clientWidth)){
			if(d.parentNode.childNodes[2].className!='rightnoscroll'){
				d.parentNode.childNodes[2].className='rightnoscroll';
			}
		}else{
			if(d.parentNode.childNodes[2].className=='rightnoscroll'){
				d.parentNode.childNodes[2].className='right';	
			}
		}
		if(r==-1&&l<=0){
			l=0;
			if(d.parentNode.childNodes[0].className!='leftnoscroll'){
				d.parentNode.childNodes[0].className='leftnoscroll';	
			}
		}else{
			if(d.parentNode.childNodes[0].className=='leftnoscroll'){
				d.parentNode.childNodes[0].className='left';	
			}
		}
	
		Ext.lt.aninmation(d.firstChild);
		d.firstChild.setAnimatProperty('style.left',d.firstChild.offsetLeft,-1*l);
		d.firstChild.play(150)
	}
	var tp={
		cfg:_config,
		id:_id,
		activate:function(num){
			_activate(this,num,true)
		},
		addItem:function(item){
			if(this.cfg.el!=null){
				_addItems(this,item);
			}
			this.cfg.items.push(item);
			_activate(this,this.cfg.items.length-1,true)
		},
		removeItem:function(num){
			if(this.cfg.el!=null){
				_remove(this,num);
			}
			this.cfg.items.remove(num);
		},
		getActiveTab:function(){
			return this.cfg.activeTab;
		},
		getSelectItem:function(){
			return this.getItem(this.getActiveTab());
		},
		getItem:function(num){
			return this.cfg.items[num];
		},
		getItems:function(){
			return this.cfg.items;	
		},
		draw:function(div){
			if(div==null)return;
			this.cfg.el=div;
			_draw(div,this)
		},
		resize:function(w,h){}
	}
	return tp;
}
/*
 *	�����ṩ����draw(div)���˵����Ƶ��Ǹ�div�ϡ�
 *	�ṩ����close()      : �رմ��ڡ�
 *	������¼�������������ǵ���ڲ˵��������ʾ�ر���
 *	�����ڴ�С�ı���е���layout��dolayout֮����Ҳ�ر�
 *	config�������ݣ�
 *			data������
 *			className:��ʽ������ͨ������className���ı�˵���ʽ
 *			field: id,name,code,sid(�˵����ڵ㣬���ڱ�ʾ���ι�ϵ),click(����˵��ڵ�ʱ�ķ���),ico(�ڵ�ǰ���ͼ��)
 *			��֧��select������
 */
Ext.lt.color=function(cfg){
	this.version='v1.0';
	var ColorHex=new Array('00','33','66','99','CC','FF');
	var _config=Ext.lt.apply({lable:'',value:null},cfg);
//	var SpColorHex=new Array('FF0000','00FF00','0000FF','FFFF00','00FFFF','FF00FF')
	var current=null
	var wdiv=document.getElementById('Ext_lt_color_win');
	if(wdiv==null){
		wdiv=document.createElement('div');
		wdiv.className='color_div';
		wdiv.id='Ext_lt_color_win';
		wdiv.iscolorwin=true;
		//wdiv.innerHTML="";
		var h=[];
		h.push('<table iscolorwin=true border="1" cellspacing="0" cellpadding="0" style="text-align:center;cursor:pointer;border-collapse:collapse" bordercolor="000000" >');
		for (i = 0; i < 2; i++){
			for (j = 0; j < 6; j++){
				h.push('<tr iscolorwin=true height=15>');
				for (k = 0; k < 3; k++){
					 for (l = 0; l < 6; l++){
					 	 h.push('<td iscolorwin=true width=15 style="cursor:pointer;background-color:#' + ColorHex[k + i * 3] + ColorHex[l] + ColorHex[j] + '">��</td>')
					 }	
				}
				h.push('</tr>');
			}
		}
		h.push('</table>')
		wdiv.innerHTML=h.join('');
		wdiv.style.display ='none';
		wdiv.style.top=0;
		wdiv.style.left=0;
		document.body.appendChild(wdiv);
		document.body.attachEvent('onmousedown',function(en){
			if(en.srcElement.iscolorwin){
				wdiv.el.style.backgroundColor=en.srcElement.style.backgroundColor;
			}
			wdiv.style.display='none';
		});
	}
	function showWdiv(i,c,d){
			var pos=Ext.lt.HTML.positionedOffset(i,document.body,false);
			wdiv.style.left=pos.left+i.offsetWidth;
			wdiv.style.top=pos.top;
			wdiv.style.display='inline';
			wdiv.el=i;
	
		wdiv.onclick=function(){
		}
	}
	
	function _draw(c,d){
		d.innerHTML=c.cfg.lable+'<input type="text" readOnly = true/>';
		if(c.cfg.value!=null){
			d.lastChild.style.backgroundColor=c.cfg.value;
		}
		d.lastChild.onclick=function(){
			showWdiv(this,c,d);
		}
	}
	var color	= {cfg:_config};
	color.draw=function(div){
		this.el=div;
		_draw(this,div);
	}
	color.resize=function(w,h){}
	color.getValue=function(){
		return this.el.lastChild.style.backgroundColor;
	}
	color.setValue=function(color){
		this.cfg.value=color;
		if(this.el!=null){
			this.el.lastChild.style.backgroundColor=color;
		}
	}
	return color;
}


/**
���湤�������

ʵ����������
	id:String	����������id��ͨ����ǩ���ɵĹ����������ڽ��������ɵĶ�����
	configbtn:boolean	�Ƿ���ʾ���ð�ť
	querybtn:boolean �Ƿ���ʾ����ʾ��ѯ����ť
	buttons:array+object	��ť��������
	name:string	��ť����id����ť�������ñ�־
	title:string	��ť��ʾ����
	icon:string	��ťͼ�꣬ϵͳ���� icon+'_btn'�Ĺ���Ϊ��ť������ʽ�����ң�����icon+'_btn '+icon+'btn_over'  icon+'_btn '+icon+'_click'�Ĺ������ɰ�ť�����ʽ
	action:function	��ťִ���¼�
	isvisible:boolean	�Ƿ�ɼ���Ĭ��Ϊtrue
	disabled:boolean	��ť�Ƿ�Ϊ����״̬

�������������ԣ�
	id:string	����������id
	configbtn:HTMLButtonElement	���ð�ť����
	querybtn:HTMLButtonElement	��ѯ��ť����
	buttons:array	����ͨ����ť���ƻ�ťλ�ò��Ұ�ť����
		��ť����ṹ
			���ԣ�
			name:string	��ť����id����ť�������ñ�־
			title:string	��ť��ʾ����
			icon:string	��ťͼ�꣬ϵͳ���� icon+'_btn'�Ĺ���Ϊ��ť������ʽ�����ң�����icon+'_btn '+icon+'btn_over'  icon+'_btn '+icon+'_click'�Ĺ������ɰ�ť�����ʽ
			action:function	��ťִ���¼�
			disabled:boolean	��ť�Ƿ�Ϊ����״̬
			isvisible:boolean	�Ƿ�ɼ���Ĭ��Ϊtrue
			������
			setDisabled(boolean)	�����Ƿ����
			setIsvisible(boolean)	�����Ƿ�ɼ�
*/
Ext.lt.toolbar=Ext.lt.createComponent(function(cfg){
	var _config=Ext.lt.apply({configbtn:true,querybtn:true,className:'toolbarcmp',buttons:[]},cfg);
	if(_config.id==null) _config.id='toolbar'+Ext.lt.getNextSeqValue();
	
	var _cmp={buttons:[],rootbutton:[],subbtn:{}};
	var _subbtnmenu=null;
	
	_cmp.draw=function(el){
		var html=['<ul class="',_config.className,'">'];
		var btn,queryflag=false;

		for(var i=0,l=_config.buttons.length;i<l;i++){
			btn=_config.buttons[i]
			if(typeof(btn)=='string') {
				html.push('<li class="line" style="float:left;">|</li>');
			}
			else {
				var defbtn=null,subbtns=null;
				if(Ext.lt.isArray(btn)){
					subbtns=btn;
					for(var j=0;j<subbtns.length;j++){
						if(subbtns[j].defaultbutton){
							defbtn=subbtns[j];
						}
						_cmp.buttons[subbtns[j].name]=subbtns[j];
						_cmp.buttons.push(subbtns[j]);
					}
					if(defbtn==null) defbtn=subbtns[0];
					btn=defbtn;
				}

				if(btn.name==null) btn.name='toolbarbtn'+Ext.lt.getNextSeqValue();
				if(btn.isvisible==null) btn.isvisible=true;
				html.push('<li class="',btn.icon,'_bg bg" overclass="',btn.icon,'_bg_over bg bg_over"><button id="',btn.name,'" title="',btn.title,'" icon="',btn.icon,'" class="',btn.icon,'_btn btn" overclass="',btn.icon,'_btn ',btn.icon,'_btn_over btn" clickclass="',btn.icon,'_btn ',btn.icon,'_btn_click btn" ',(btn.disabled?'disabled':''),' style="float:left;',(btn.isvisible?'':'display:none'),'" >',btn.title,'</button></li>');
				_cmp.buttons[btn.name]=btn;
				_cmp.buttons.push(btn);
				
				// ���Ӹ�ѡ��ť
				if(subbtns!=null){
					html.push('<button id="',btn.name,'_sub" group="',btn.name,'" class="groupbtn btn" style="float:left">6</button>');
					_cmp.subbtn[btn.name]=subbtns
					subbtns=null;
				}
				html.push('')
			}
		}
		html.push('</ul><div style="position:absolute;"></div>');
		
		// ���ɹ�����
		//el.style.position='relative'
		el.style.zIndex=Ext.lt.getNextZIndex();
		Ext.lt.HTML.setInnerHTML(el,html.join(''));
		
		_subbtnmenu=el.lastChild;
		
		// �������á����÷���
		var btns=el.getElementsByTagName('BUTTON');
		for(var i=0,l=btns.length;i<l;i++){
			btn=btns[i];
			if(_cmp.buttons[btn.id]!=null){
				_cmp.buttons[btn.id].element=btn;
				if(Ext.lt.isFunction(_cmp.buttons[btn.id].action)) _cmp.buttons[btn.id].element.onclick=_cmp.buttons[btn.id].action;
				_cmp.buttons[btn.id].setDisabled=function(flag){
					flag=flag==true;
					this.disabled=flag;
					flag?this.element.setAttribute('disabled','true'):this.element.removeAttribute('disabled');
				}
				_cmp.buttons[btn.id].setIsvisible=function(flag){
					flag=flag==true;
					this.isvisible=flag;
					this.element.style.display=flag?'':'none';
				}
			}
			else if(btn.className.indexOf('groupbtn')>-1){
				_cmp.subbtn[btn.getAttribute('group')].element=btn;
				
				btn.onclick=function(){
					var btns=_cmp.subbtn[this.getAttribute('group')];
					
					var datas=[];
					for(var i=0;i<btns.length;i++){
						datas.push({name:btns[i].title,group:this.getAttribute('group'),id:btns[i].name,icostyle:btns[i].icon+'_btn',pid:0,click:function(){
							var btn=_cmp.buttons[this.id]
							var grpbtn=_cmp.subbtn[this.group].element

							if(btn==null) return;
							grpbtn.previousSibling.removeNode(true);
							if(btn.element==null){
								if(btn.isvisible==null) btn.isvisible=true;
								var t=document.createElement('DIV');
								t.innerHTML=['<li class="',btn.icon,'_bg bg" overclass="',btn.icon,'_bg_over bg  bg_over"><button id="',btn.name,'" title="',btn.title,'" icon="',btn.icon,'" class="',btn.icon,'_btn btn" overclass="',btn.icon,'_btn ',btn.icon,'_btn_over btn" clickclass="',btn.icon,'_btn ',btn.icon,'_btn_click btn" ',(btn.disabled?'disabled':''),' style="float:left;',(btn.isvisible?'':'display:none'),'" >',btn.title,'</button></li>'].join('');
								grpbtn.insertAdjacentElement('beforeBegin',t.firstChild);
								btn.element=grpbtn.previousSibling.firstChild
								if(btn.action!=null) btn.element.onclick=btn.action;
								btn.setDisabled=function(flag){
									flag=flag==true;
									this.disabled=flag;
									flag?this.element.setAttribute('disabled','true'):this.element.removeAttribute('disabled');
								}
								btn.setIsvisible=function(flag){
									flag=flag==true;
									this.isvisible=flag;
									this.element.style.display=flag?'':'none';
								}
							}
							else{
								grpbtn.insertAdjacentElement('beforeBegin',btn.element);
							}
							
						}});
					}
					var m=new Ext.lt.Popupmenu({
						data:datas,
						field:{id:'id',name:'name',code:'code',sid:'pid'}
					});
					m.draw(_subbtnmenu);
					var p=Ext.lt.HTML.positionedOffset(this.previousSibling);
					_subbtnmenu.style.visibility='';
					_subbtnmenu.style.left=(p.left)+'px'
					_subbtnmenu.style.Top=(this.offsetHeight+p.top)+'px'
				}
			}
		}
		
		
	}

	// ��������ʵ��ersize����	
	_cmp.resize=function(){
	}
	
	_cmp.setDisabled=function(btns,flag){
		flag=flag==true
		for(var i=0,j=btns.length;i<j;i++){
			_cmp.buttons[btns[i]].setDisabled(flag);
		}
	}
	
	return _cmp
});

Ext.lt.scroll=function(cfg){
	var version='v1.0';
	//direction:un/lr
	var _config=Ext.lt.apply({direction:'ud',el:null,srcEl:null,itemlength:10},cfg);
	//upward  upwardend  downward  downwardend
	//left leftend right rightend
	function _draw(_cfg){
		var directionclass=[];
		_cfg.styletype='top';
		var el=_cfg.el;
		if(_cfg.direction=='ud'){
			directionclass=['upward','downward'];
		}else{
			directionclass=['left','right'];
			_cfg.styletype='left';
		}
		//<div class='left' ></div><div class='centersorll' ><div class='center'></div></div><div class='right' id='tabpanel_right",t.id,"'></div>
		if(_cfg.srcEl==null){
			_cfg.srcEl=_cfg.el.firstChild;
		}
		var center=document.createElement('div');
		center.className='_center';
		center.appendChild(_cfg.srcEl);
		center.style.position='absolute';
		el.innerHTML="<div class='scl "+directionclass[0]+"end'>&nbsp;</div><div class='centersorll' style='width:0px;height:0px'></div><div class='scl "+directionclass[1]+"'>&nbsp;</div>";
		el.childNodes[1].appendChild(center);
		setTimeout(function(){
			if(_cfg.direction=='ud'){
				el.childNodes[1].style.width=el.parentNode.clientWidth;
				var h=(el.clientHeight-el.lastChild.offsetHeight-el.firstChild.offsetHeight);
				if(h<=0){
					h=el.parentNode.clientHeight-el.lastChild.offsetHeight-el.firstChild.offsetHeight
				}
				el.childNodes[1].style.height=h;//(el.clientHeight-el.lastChild.offsetHeight-el.firstChild.offsetHeight);
				if(el.childNodes[1].firstChild.offsetHeight<el.childNodes[1].offsetHeight){
					el.lastChild.className+='end';
				}
			}else{
				el.childNodes[1].style.width=el.clientWidth-el.lastChild.offsetWidth-el.firstChild.offsetWidth;
				el.childNodes[1].style.height=el.parentNode.offsetHeight;
				if(el.childNodes[1].firstChild.offsetWidth<el.childNodes[1].offsetWidth){
					el.lastChild.className+='end';
				}
			}
		},100)
		
		el.lastChild.onclick=function(){toScroll(this.parentNode,1,_cfg)}
		el.firstChild.onclick=function(){toScroll(this.parentNode,-1,_cfg)}	
		_cfg.top=el.firstChild;
		_cfg.left=el.firstChild;
		_cfg.bottom=el.lastChild;
		_cfg.right=el.lastChild;
		
	}
	function _resize(_cfg,w,h){
		var el=_cfg.el;
		if(_cfg.direction=='ud'){
			el.childNodes[1].style.width=w;
			el.childNodes[1].style.height=(h-el.lastChild.offsetHeight-el.firstChild.offsetHeight);
		}else{
			el.childNodes[1].style.width=w-el.lastChild.offsetWidth-el.firstChild.offsetWidth;
			el.childNodes[1].style.height=h;
		}
	}
	function toScroll(d,r,_cfg){
		if(d.lastChild.className.indexOf('end')!=-1&&r==1){return;}
		if(d.firstChild.className.indexOf('end')!=-1&&r==-1){return;}
		var div=d.childNodes[1].firstChild;

		var endl=div.getAttribute('offset'+_cfg.styletype);
		var l=_cfg.itemlength*r-div.getAttribute('offset'+_cfg.styletype);
		var _alllength=0;
		var cd=d.childNodes[1];
		if(_cfg.direction=='ud'){
			_alllength=cd.firstChild.offsetHeight-cd.offsetHeight;
		}else{
			_alllength=cd.firstChild.offsetWidth-cd.offsetWidth;
		}
				
		if(r==1&&l>=_alllength){
			l=_alllength;
			d.lastChild.className+='end';
		}else{
			d.lastChild.className=d.lastChild.className.replace('end','');
		}
		if(r==-1&&l<=0){
			l=0;
			d.firstChild.className+='end';
		}else{
			d.firstChild.className=d.firstChild.className.replace('end','');
		}
		Ext.lt.aninmation(div);
		div.setAnimatProperty('style.'+_cfg.styletype,endl,-1*l);
		div.play(150)
	}
	var scroll={
		cfg:_config,
		draw:function(div){
			if(div!=null){
				this.cfg.el=div;	
			}else{
				if(this.cfg.el==null){return;}	
			}
			_draw(this.cfg);
		},
		scroll:function(r){
			toScroll(this.cfg.el,r,this.cfg);
		},
		resize:function(w,h){
			_resize(this.cfg,w,h);
		}
	};
	return scroll;
}
//ǰ�����˲���
Ext.lt.recallOperation=function(cfg){
	var _config=Ext.lt.apply({maxOper:10},cfg);
	_config.rs=[];
	_config.nextRs=[];
	function _addOperation(o,cfg){
			if(cfg.rs.length==cfg.maxOper){
				cfg.rs.remove(cfg.rs.first());
			}
			cfg.rs.push(o);
			cfg.nextRs.clear();
	}
	function _next(cfg){
		var v=cfg.nextRs.pop();
		cfg.rs.push(v);
		return v;
	}
	function _back(cfg){
		var v=cfg.rs.pop();
		cfg.nextRs.push(v);
		return v;
	}
	var recall={
			version:'1.0',
			cfg:_config,
			next:function(){return _next(this.cfg);},
			back:function(){return _back(this.cfg);},
			addOperation:function(o){_addOperation(o,this.cfg);},
			clear:function(){this.cfg.rs.clear();this.cfg.nextRs.clear();}
		}
	return recall;
}
Ext.lt.topmenu=function(cfg){
	var _config=Ext.lt.apply({data:{},values:[],el:null,field:{id:'itemid',name:'name',code:'code',sid:'superitemid'},className:'topmenu',outformart:'#name',on:{},maxHeight:true,correction:15,scroll:false,showmenu:'onclick'},cfg);
	_config.maxHeight=true;
	_config.id='topmenu'+Ext.lt.getNextSeqValue();
	var values={};
	for(var i=0,l=_config.values.length;i<l;i++){
		values[_config.values[i]]=i;
	}
	_config._values=values;
	var _id=_config.id;
	var topmenu={
		version:'1.0',
		cfg:_config
	}
	function _initData(cfg){
		var _data=cfg.data.toArray();
		_data.size=cfg.data.length;
		var data_bak={};
		cfg.data_bak=data_bak;
		var _menu=null;
		//�������ݡ�
		
		for(var i=0;i<_data.size;i++){
			_data[i]._sid=_data[i][cfg.field.sid]
			if(data_bak['PK_'+_data[i][cfg.field.sid]]==null)data_bak['PK_'+_data[i][cfg.field.sid]]=[];
			data_bak['PK_'+_data[i][cfg.field.sid]].push(_data[i]);
			data_bak[_id+'_PK_'+_data[i][cfg.field.id]]=_data[i];
		}
		//�Ӹ����ڵ㡣
		data_bak[_id+'_PK_0']={};
		
		if(data_bak.PK_0==null)data_bak.PK_0=[];
		for(var i=0;i<data_bak.PK_0.length;i++){
			var _d=data_bak.PK_0[i];
			var arr=[];
			_buildmenudatas(_d[cfg.field.id],_d[cfg.field.id],cfg,data_bak,arr);
			data_bak[_id+'_MD_'+_d[cfg.field.id]]=arr;
		}
	}
	function _buildmenudatas(fid,id,cfg,_data,arr){
		var ds=_data["PK_"+id];
		if(ds==null||ds.length==0){return;}
		for(var i=0;i<ds.length;i++){
			var d=ds[i];
			if(fid==id){
				d._sid=0;
			}
			arr.push(d);
			_buildmenudatas(fid,d[cfg.field.id],cfg,_data,arr)
		}
	}
	function _buildTopmenu(cfg){
		cfg.menu={};
		var _template=Ext.lt.out.template(cfg.outformart);
		_template.setField(cfg.fields);
		var d=cfg.el;
		d.innerHTML='<ul class="'+cfg.className+'_tops" id="'+cfg.id+'" ></ul>';
		_buildtopmenuli(cfg);
		_buildEvent(d,cfg);
	}
	
	function _buildtopmenuli(cfg){
		var ul=document.getElementById(cfg.id);
		var _data=cfg.data_bak.PK_0;
		var html=[];
		for(var i=0;i<_data.length;i++){
			var _mainmenu=_data[i];;
			//html.push('<li><a id="'+cfg.id+'_PK_'+_data[i][cfg.field.id]+'" href="#">'+_mainmenu.name+'</a></li>');
			
			html.push('<li')
			if(cfg._values[_data[i][cfg.field.id]]!=null){
				html.push(' class="select" ')
			}
			html.push('><a id="'+cfg.id+'_PK_'+_data[i][cfg.field.id]+'" ><div>'+_mainmenu.name+'</div></a></li>');
		}
		ul.innerHTML=html.join('');
	}
	function _buildEvent(d,cfg){
		var l=d.firstChild.childNodes.length;
		for(var i=0;i<l;i++){
			var li=d.firstChild.childNodes[i];
			li.firstChild.cfg=cfg;
			li.firstChild.showmenu=showmenu;
			li.firstChild[cfg.showmenu]=li.firstChild.showmenu;
			if(li.innerText=='|'){
				li.className='split';
				li.innerText="��";
				continue;	
			}
			li.onmouseover=function(){
				if(cfg.showli){
					cfg.showli.className=cfg.showli.className.replace(/ selected/g,'');
				}
				this.className+=" selected";
				if(cfg._showmenu){
					this.firstChild.showmenu(cfg);
				}
				cfg.showli=this;
			}
			li.onmouseout=function(){
				//��ɫ2	
				this.className=this.className.replace(' selected','');
			}

			li.firstChild.onclick=function(){
				var d=cfg.data_bak[this.id];
				if(d.href!=null&&d.href.length>0){
					window.open(d.href,d.target);
				}else	if(d.click!=null){
					d.click(d);
				}
				if(cfg.on['onclick']!=null){
					cfg.on['onclick'](d);
				}
				if(cfg.showmenu=='onclick'){
					this.showmenu(cfg);
					
				}
			}
		}	
	}
	_config._showmenu=false;
	Ext.lt.message.hook("Popupmenu","closed",function(){
		_config._showmenu=false;
		if(_config.showli){
			_config.showli.className=_config.showli.className.replace(/ selected/g,'');
		}
		_config.showli=null;
		Ext.lt.util.hiddselect(false);
	});
	
	
	
	function showmenu(cfg){
			var mid=this.id.replace("PK","MD");
			if(cfg.beforeshowmenu!=null){
				var menuid = this.id.replace("topmenu1000_PK_","");
				cfg.beforeshowmenu(parseInt(menuid));
			}
			Ext.lt.message.send("Popupmenu","close");
			Ext.lt.util.hiddselect(true);
			this.parentNode.className+=" selected";
			cfg.showli=this.parentNode;
			cfg._showmenu=true;
			if(cfg.data_bak[mid]==null||cfg.data_bak[mid].length==0){return;}
			if(cfg.menu[mid]==null){
				if(cfg._field==null){
					cfg._field={};
					for(var ec in cfg.field){
						cfg._field[ec]=cfg.field[ec];
					}
					cfg._field.sid="_sid";
				}
				
				cfg.menu[mid]=Ext.lt.Popupmenu({
					data:cfg.data_bak[mid],
					field:cfg._field,
					className:cfg.className,
					outformart:cfg.outformart,
					values:cfg.values,
					maxHeight:cfg.maxHeight,
					on:cfg.on
				});
				var div=document.createElement("div");
				div.id=mid;
				document.body.appendChild(div);
				cfg.menu[mid].draw(div);
				div.style.visibility='visible';
				cfg.menu[mid].div=div;
			}
			var _pos=Ext.lt.HTML.positionedOffset(this,document.body,false);
			var x=_pos.left;
			var y=_pos.top+this.offsetHeight+cfg.correction;
			cfg.menu[mid].div.style.left=x-6+'px';
			cfg.menu[mid].div.style.top=y+'px';
			cfg.menu[mid].show();
		}
	function _setDisabled(cfg,d){
		var superid=_getsuperid(cfg,d);
		if(cfg.menu[cfg.id+"_MD_"+superid]!=null){
			cfg.menu[cfg.id+"_MD_"+superid].setDisabled(d[cfg.field.id],d.disabled);;
		}
	}
	function _getsuperid(cfg,d){
		var sid=d._sid;
		if(sid==0){
			return d[cfg.field.sid];
		}else{
			return _getsuperid(cfg,cfg.data_bak[cfg.id+'_PK_'+d[cfg.field.sid]]);
		}
	}
	function _clearMenus(cfg){
		var menus=cfg.menu;
		cfg.data_bak={};
		for(var p in menus){
			document.body.removeChild(document.getElementById(p));
		}
		cfg.menu={};
	}
	
	function _draw(cfg){
		_initData(cfg);
		_buildTopmenu(cfg);
		
		setTimeout(function(){
			var _el=document.getElementById(cfg.id);
			var w=0;
			for(var i=0,l=_el.childNodes.length;i<l;i++){
				w+=_el.childNodes[i].offsetWidth;
				w+=_el.firstChild.offsetLeft;
			}
			if(cfg.scroll){
				_el.style.width=w+"px";
			}
		},100);
	}
	function _removeById(cfg,id){
		var arr=cfg.data_bak["PK_"+id];
		cfg.data.remove(cfg.data_bak[cfg.id+"_PK_"+id]);	
		if(arr!=null){
			cfg.data.remove(arr[i]);
			for(var i=0,l=arr.length;i<l;i++){
				_removeById(cfg,arr[i][cfg.field.id])
			}	
		}
	}
	
	topmenu.initData = function(cfg){
		_initData(this.cfg);
	}
	topmenu.draw=function(div){
		if(div!=null){
			this.cfg.el=div;	
		}
		if(this.cfg.el==null){
			alert('�����û��Ʋ˵���λ��');
			return ;	
		}
		div=this.cfg.el;
		_draw(this.cfg);
		
		if(div.className==null||div.className==""){
			div.className="topmenus2";	
		}
		if(this.cfg.scroll){
			this.cfg._scrollobj=new Ext.lt.scroll({direction:"lr",itemlength:100});
			this.cfg._scrollobj.draw(div);
		}
	}
	topmenu.scroll=function(r){
		if(this.cfg._scrollobj!=null)
		this.cfg._scrollobj.scroll(r);
	}
	topmenu.additem=function(d){
		if(Ext.lt.isArray(d)){
			for(var n=0,l=d.length;n<l;n++){this.cfg.data.push(d[n]);}
		}else{
			this.cfg.data.push(d);
		}
	}
	topmenu.remove=function(d){
		if(Ext.lt.isArray(d)){
			for(var n=0,l=d.length;n<l;n++){this.removeById(d[n][this.cfg.field.id]);}
		}else{
			this.removeById(d[this.cfg.field.id]);
		}
	}
	topmenu.removeById=function(id){
		_removeById(this.cfg,id);
	}
	topmenu.setDisabled=function(id,b){
		this.cfg.data_bak[this.cfg.id+'_PK_'+id].disabled=b;
		_setDisabled(this.cfg,this.cfg.data_bak[this.cfg.id+'_PK_'+id]);
	}
	topmenu.reflash=function(){
		_clearMenus(this.cfg)
		_initData(this.cfg);
		_buildtopmenuli(this.cfg);
		_buildEvent(this.cfg.el,this.cfg)
	}
	topmenu.setShowmenu=function(eventname){
		this.cfg.showmenu=eventname;
	}
	return topmenu;	
}

Ext.lt.pagecomponents=[];
Ext.lt.pagecomponent=function(config){

	var _cmp={};
	var _pagecmpid=config.pagecmpid;
	var _targel=config.target;
	
	// ����̨����ҳ�������ƶ���ָ������
	_cmp.draw=function(el){
		if(this.drawed)return;
		this.drawed=true;
		var pagecmp=document.getElementById(_pagecmpid);
		if(pagecmp==null) return;
		
		//document.body.removeChild(pagecmp);
		el.appendChild(pagecmp);
		pagecmp.style.visibility='visible'
		//pagecmp.removeNode();
		var e=new Date();
	}
	_cmp.resize=function(){}
	Ext.lt.pagecomponents.push(_cmp);
	_cmp._targel=config.target;
	if(_targel!=null){
		try{
		_targel=eval('('+_targel+')');
		}catch(e){}
		if( _targel==null){
			_targel=document.getElementById(_targel);
		}
		Ext.lt.onload(function(){_cmp.draw(_targel)});
	}
	
	return _cmp;
}



Ext.lt.cube=function(cubedata){
	var _cmp=Ext.lt.datatable35(cubedata);
	    _cmp.version='1.0';
	    _cmp.type='cube';
	// ����ԭʼ���ݼ�
	var _cubedata=cubedata.toArray();
	// ��X�ᣬY�����û��ܳ���������
	var fcubedata=[];
	// �����ֶ���
	var _columns=cubedata.getColNames();
	
	var _columnsX=[],_columnsY=[],_columnsZ=[];
	var _initshowlevel=1;
	var _columnYdatas=[];  // Y���׼���ݼ������ö�ά����ķ�ʽ�������ݼ�ʵ�����ݹ����׼����
	var _columnXdatas=[];  // Y���׼���ݼ������ö�ά����ķ�ʽ�������ݼ�ʵ�����ݹ����׼����
	

	
	// ��ȡ��ֵ����ȥ�ز�����
	function _getcolumnvalues(config){
		if(_columns[cn]!=null) return ;
		var carr=[],v,cn=config.name;
		
		for(var j=0,jl=_cubedata.length;j<jl;j++){
			v=_cubedata[j][cn];
			if(!carr['v:'+v]){
				carr.push(v)
				carr['v:'+v]=true;
			}
		}

		if(carr.length<5000)carr._sort(config.asc);
		_columns[cn]=carr;
	}
	
	
	// ����ͳ��X�����ݣ����Դ�������ͳ�����ö���{name:����,alias:��ʾ����,asc:true,filter:array/reg/function,total:{show:true,position:'head',txt:''},}
	_cmp.setColumnX=function(rows){
		if(!Ext.lt.isArray(rows)) rows=[rows]; 
		_columnsX=[];
		var row
		for(var i=0;i<rows.length;i++){
			row=rows[i]
			if(typeof(row)=='string'){
				row={name:row,alias:row,asc:true,filter:null,values:[]};
			}
			else{
				if(row.name==null) alert('ͳ��X�����õ�����Ϊ��');
				if(row.alias==null) row.alias=row.name
				row.asc=row.asc!=true;
				// ���Ƿ������������ʽ������Ϊnull
				if(row.filter!=null && Ext.lt.isArray(row.filter) && Ext.lt.isFunction(row.filter) && Ext.lt.isString(row.filter)) row.filter=null;
				if(row.values==null) row.values=[];
			}
			_getcolumnvalues(row);
			
			if(row.filter==null){
				row.values=row.values.concat(_columns[row.name]);
			}
			else if(Ext.lt.isArray(row.filter)){
				row.values=[].concat(row.filter);
				row.hasfilter=true;
			}
			else if(Ext.lt.isFunction(row.filter)){
				var colvs=_columns[row.name],d;
				for(var j=0,jl=colvs.length;j<jl;j++){
					d=colvs[j];
					if(row.filter(d))row.values.push(d);
				}
				row.hasfilter=true;
			}
			else if(Ext.lt.isString(row.filter)){
				var colvs=_columns[row.name];
				row.values=colvs.filter(filter);
				row.hasfilter=true;
			}
			
			if(row.total==null){
				row.total={show:true,position:'head',txt:'�ϼ�'}
			}
			else{
				row.total.show=true==row.total.show;
				if(row.total.position!='head' && row.total.position!='tail') row.total.position='head'
				if(row.total.txt==null) row.total.txt='�ϼ�';
			}
			
			_columnsX.push(row)
			
		}
	}
	
	// ����ͳ��Y������{name:����,asc:true,filter:array/reg/function}
	_cmp.setColumnY=function(columns){
		if(!Ext.lt.isArray(columns)) columns=[columns];
		
		_columnsY=[];
		var column
		for(var i=0;i<columns.length;i++){
			column=columns[i];
			if(typeof(column)=='string'){
				column={name:column,alias:column,asc:true,filter:null,values:[]};
			}
			else{
				if(column.name==null) alert('ͳ��Y�����õ�����Ϊ��');
				if(column.alias==null) column.alias=column.name;
				column.asc=column.asc!=true;
				if(column.values==null)column.values=[];
				// ���Ƿ������������ʽ������Ϊnull
				if(column.filter!=null && Ext.lt.isArray(column.filter) && Ext.lt.isFunction(column.filter) && Ext.lt.isString(column.filter)) column.filter=null;
			}
			_getcolumnvalues(column);
			
			if(column.filter==null){
				column.values=column.values.concat(_columns[column.name]);
			}
			else if(Ext.lt.isArray(column.filter)){
				column.values=[].concat(column.filter);
				column.hasfilter=true;
			}
			else if(Ext.lt.isFunction(column.filter)){
				var colvs=_columns[column.name],d;
				for(var j=0,jl=colvs.length;j<jl;j++){
					d=colvs[j];
					if(column.filter(d))column.values.push(d);
				}
				column.hasfilter=true;
			}
			else if(Ext.lt.isString(column.filter)){
				var colvs=_columns[column.name];
				column.values=colvs.filter(filter);
				column.hasfilter=true;
			}
			
			if(column.total==null){
				column.total={show:true,position:'head',txt:(i==0?'�ܼ�':'С��')}
			}
			else{
				column.total.show=true==column.total.show;
				if(column.total.position!='head' && column.total.position!='tail') column.total.position='head'
				if(column.total.txt==null) column.total.txt=i==0?'�ܼ�':'С��';
			}
			_columnsY.push(column)
		}
		
		// �������ݹ��˺���
		var filterfn=['var Yfilterfunction=function(d){'],col,cvalues,filterflag=false;
		for(var i=0,l=_columnsY.length;i<l;i++){
			col=_columnsY[i];
			if(column.hasfilter){
				filterflag=true
				cvalues=col.values;
				for(var j=0,m=cvalues.length;j<m;j++) col['f_'+cvalues[j]]=true;
				filterfn.push('var dv',i,'=d["'+col.name+'"];if(_columnsY[',i,']["f_"+dv',i,']) return true;');
			}
		}		
		filterfn.push('return false;}')
		if(filterflag){
			eval(filterfn.join(''));
			_cmp['Yfilterfunction']=Yfilterfunction;
		}
		else{
			_cmp['Yfilterfunction']=function(){return true};
		}
	}
	
	// ����ͳ�������ݣ�ֻ���������Ϳ������û��� ����{name:����,sigma:}
	_cmp.setColumnZ=function(counts){
		if(!Ext.lt.isArray(counts)) counts=[counts];
		
		_columnsZ=[];
		var count
		for(var i=0;i<counts.length;i++){
			count=counts[i]
			if(typeof(count)=='string'){
				count={name:count,sigma:'count',datatype:'I'};
			}
			else{
				if(count.name==null) alert('ͳ�������õ�����Ϊ��');
				if(count.sigma==null) count.sigma='count';
				if(count.datatype==null) count.datatype='I';
			}
			
			if(count.sigma=='count'){
				count.dosigma=function(obj,data){
					if(obj==null) obj={v:0};
					obj.v++;
					return obj
				};
				count.sumsigma=function(obj1,obj2){
					if(obj1==null) obj1={v:0};
					if(obj1.v==null) obj1.v=0;
					
					if(Ext.lt.isArray(obj2)){
						for(var i=0,l=obj2.length;i<l;i++) obj1.v+=isNaN(obj2.v[i])?0:obj2.v[i];
					}
					else{
						obj1.v+=isNaN(obj2.v)?0:obj2.v; 
					}
					return obj1;
				}
			}
			else if(count.sigma=='sum'){
				count.datatype='N';
				count.dosigma=function(obj,data){
					if(obj==null) obj={size:0,v:0.0};
					obj.size++;
					obj.v+=isNaN(data)?0:data;
					return obj;
				};
				count.sumsigma=function(obj1,obj2){
					if(obj1==null) obj1={size:0,v:0.0};
					if(obj1.v==null) obj1.v=0.0;
					if(obj1.size==null) obj1.size=0.0;
					if(Ext.lt.isArray(obj2)){
						for(var i=0,l=obj2.length;i<l;i++){
							obj1.v+=isNaN(obj2[i].v)?0:obj2[i].v; 
							obj1.size+=isNaN(obj2[i].size)?0:obj2[i].size;
						}
					}
					else{
							obj1.v+=isNaN(obj2.v)?0:obj2.v; 
							obj1.size+=isNaN(obj2.size)?0:obj2.size;
					}
					return obj1;
				}
			}
			else{
				count.dosigma=function(values){return Ext.lt.isArray(values)?values.length:0};
			}
			
			_columnsZ.push(count)
			_columnsZ['Z'+count.name]=count;
		}
	}
	
	
	// ����ϼ�ֵ������recordset���ݼ�
	_cmp.doSigma=function(){
		fcubedata=[]
		var d,fd,key,cname,v,seq,seqtxt,fdata,tmp;
		_columnYdatas=[];
		_columnXdatas=[];
		
		// ����ykeyֵ���ɺ�����ͬʱ����Y���׼����
		var fnbuf=['var buildColumnYValuesFunction=function(d){var t,coly=_columnYdatas,colx=_columnXdatas;\n']
		// ����Y���׼����
		for(var n=0,nl=_columnsY.length;n<nl;n++){
			cname=_columnsY[n].name;
			fnbuf.push('var v=d["',cname,'"],k="v:"+(v==null?"":v);if(v==null)v="";t=coly[k];if(t==null){coly[k]=[];t=coly[k];coly.push(v);};coly=t;\n');
		}
		// ����X���׼����
		for(var n=0,nl=_columnsX.length;n<nl;n++){
			cname=_columnsX[n].name;
			fnbuf.push('var v=d["',cname,'"],k="v:"+(v==null?"":v);if(v==null)v="";t=colx[k];if(t==null){colx[k]=[];t=colx[k];colx.push(v);};colx=t;\n');
		}
		
		// ����ykeyֵ
		fnbuf.push('return {"ykey":[');
		for(var n=0,nl=_columnsY.length;n<nl;n++){
			cname=_columnsY[n].name;
			fnbuf.push(',"Y',cname,'@",d["',cname,'"]');
		}
		fnbuf.push('].join(""),"data":');
		fnbuf.push('{');
		for(var n=0,nl=_columnsY.length;n<nl;n++){
			cname=_columnsY[n].name;
			fnbuf.push('"',cname,'":d["',cname,'"],');
		}
		fnbuf.push('t:0},"xkey":[');
		for(var n=0,nl=_columnsX.length;n<nl;n++){
			cname=_columnsX[n].name;
			fnbuf.push('"X',cname,'@"+d["',cname,'"],');
		}
		fnbuf.push('"Z"].join("_")}}');
		
		eval(fnbuf.join(''))
		

		for(var i=0,l=_cubedata.length;i<l;i++){
			d=_cubedata[i];
			
			// �����ݽ���ɸѡ
			if(!_cmp.Yfilterfunction(d)) continue;
			
			fd={},key=[],seq=[];
			tmp=buildColumnYValuesFunction(d);
			fd=tmp.data,seq=tmp.ykey,key=tmp.xkey;
			
			tmp=fcubedata[seq]
			if(tmp==null){
				fcubedata.push(seq);
				fcubedata[seq]=fd
			}
			else{
				fd=tmp
			}

			for(var n=0,nl=_columnsZ.length;n<nl;n++){
				cname=_columnsZ[n].name,keytxt=key+cname,fdata=fd[keytxt];
				if(fdata==null){
					fd[keytxt]=_columnsZ[n].dosigma(null,d[cname]);
				}
				else{
					_columnsZ[n].dosigma(fdata,d[cname])
				}
			}
		}
		
		// �������ڼ����кϼƵĺ���
		function buildRowSumFunction(){
			var fnbuf=['var rowsumfunction=function(d){'];
			
			// ���ɵ���ϼƺ�������
			function _rowsumfunction(preX,rowlevel,Zrow,zi,colx){
				if(rowlevel>=_columnsX.length) return ;
				if(colx==null) colx=_columnXdatas;
				var nextlevel=rowlevel+1;
				var row=_columnsX[rowlevel];
				var cname=row.name
				var vs=row.values
				var key;
				var fnrowbuf=['d["',preX,Zrow,'"]={};\n']				
				
				for(var i=0,l=vs.length;i<l;i++){
					if(colx['v:'+vs[i]]==null) continue;
					key=preX+'X'+cname+'@'+vs[i]+'_';
					if(rowlevel<_columnsX.length-1) {
						_rowsumfunction(key,nextlevel,Zrow,zi,colx['v:'+vs[i]]);
					}
					fnrowbuf.push('if(d["',key,Zrow,'"]!=null) zcol.sumsigma(d["',preX,Zrow,'"],d["',key,Zrow,'"]);\n')
				}
				fnbuf.push(fnrowbuf.join(''))
			}
			
			for(var zi=0,zl=_columnsZ.length;zi<zl;zi++) {
				fnbuf.push('var zcol=_columnsZ[',zi,'];');
				_rowsumfunction('',0,'Z'+_columnsZ[zi].name,zi);
			}
			fnbuf.push('}')
			eval(fnbuf.join(''))
			return rowsumfunction;
		}
		
		var fn=buildRowSumFunction();
		for(var i=0,l=fcubedata.length;i<l;i++){
			fn(fcubedata[fcubedata[i]]);
		}
		
		_buildColumnSet();
		_buildTemplateDataSet();
		
		return fcubedata;
	}
	
	
	function _buildSumDataFunction(){
		var columns=_cmp.getCols();
		var funcbuf_sum=['var sumdatafunction=function(t,s){'];
		var funcbuf_create=['var createsumlinefunction=function(){var obj={};'];
		var colname;
		
		for(var i=0,l=columns.length;i<l;i++){
			colname=columns[i].name;
			if(columns[i].sumsigma!=null){
				funcbuf_sum.push('if(s["',colname,'"]!=null){_columnsZ[',columns[i].zcolid,'].sumsigma(t["',colname,'"],s["',colname,'"])};\n')
			}
			funcbuf_create.push('obj["',colname,'"]={};');
		}
		
		funcbuf_sum.push('}');
		funcbuf_create.push('return obj}');
		eval(funcbuf_sum.join(''))
		eval(funcbuf_create.join(''))
		_cmp.sumlinedatafunction=sumdatafunction;
		_cmp.createsumlinefunction=createsumlinefunction;
	}
	
	var _lastlinedata={key:null,data:null}
	function _getLineDataByYkey(ykey){
		if(_lastlinedata.key==ykey) return _lastlinedata.data;
		
		var data=[];
		if(ykey.charAt(ykey.length-1)=='@'){
			for(var i=0,l=fcubedata.length;i<l;i++){
				if(fcubedata[i]==ykey || fcubedata[i].indexOf(ykey+'Y')==0){
					data.push(fcubedata[fcubedata[i]]);
				}
			}
		}
		else{
			for(var i=0,l=fcubedata.length;i<l;i++){
				if(fcubedata[i].indexOf(ykey)==0){
					data.push(fcubedata[fcubedata[i]]);
				}
			}
		}
		
		_lastlinedata['key']=ykey;
		_lastlinedata['data']=data;
		return data;
	}
	
	function _Zfn(i,j,rs,value){
		var data=_getLineDataByYkey(rs['_Ykey']);
		var sigmafn=_columnsZ[this.zcolid].sumsigma,key=this.name,v={};
		for(var i=0,l=data.length;i<l;i++){
			if(data[i][key]!=null) sigmafn(v,data[i][key]);
		}
		return this._formartValue(v.v);
	}
	
	
	
		
	function _Yfn(i,j,rs,value){
		var level=rs['_level'],out=[];
		if(level<0) level=0
		for(var i=0;i<level;i++) out.push('&nbsp;&nbsp;')
		var txt=rs[_columnsY[level].name];
		if(txt==null || txt=='') txt='(��ֵ)';
		
		if(rs['_isleaf']){
			out.push('<a>',txt,'</a>')
		}
		else{
			out.push('<font>',(rs['_stat']=='close'?'+':'-'),'&nbsp;</font><a href="#">',txt,'(',rs['_subcount'],')</a>')
		}
		return out.join('');
	}
	
	function _expandData(table,el,l,c,d){
		// �ܼ��в���������¼�
		if(l==0 && _columnsY.length>0 && _columnsY[0].total.show) return;
		if(d['_isleaf']) return;
		if(d['_stat']=='close'){
			d['_stat']='open';
			
			// �޸���ʾ״̬
			var columns=_getTemplateDataColumns();
			var predata=[],columnydata=_columnYdatas;
			for(var i=0,il=d['_level']+1;i<il;i++){
				predata.push(d[_columnsY[i].name]);
				columnydata=columnydata['v:'+d[_columnsY[i].name]];
			}
			var datas=buildcolumny(d['_Ykey'],d['_level']+1,predata,d['_level']+2,columnydata);
			var newrs=new Ext.lt.recordset({columns:columns,datas:datas})
			
			var rs=_cmp.getRecordSet();
			rs.addData(newrs.toArray().slice(1),l);
			
			// _cmp.reflash('viewdata')
		}
		else{
			d['_stat']='close';
			var rs=_cmp.getRecordSet().toArray();
			var ykey=d['_Ykey'];
			var data,deldatas=[];
			if(ykey.charAt(ykey.length-1)=='@') ykey+='Y';
			for(var i=l+1,il=rs.size;i<il;i++){
				data=rs[i];
				if(data['_Ykey'].indexOf(ykey)==0){
					deldatas.push(data);
				}
				else{
					break;
				}
			}
			_cmp.getRecordSet().remove(deldatas);
		}

	}
	
	function _getTemplateDataColumns(){
		var columns=['_Ykey','_level','_isleaf','_stat','_subcount'];
		for(var i=0,l=_columnsY.length;i<l;i++) columns.push(_columnsY[i].name);
		return columns;
	}
	
	function buildcolumny(preY,rowlevel,predata,maxlevel,columnydatas){
		if(rowlevel>=_columnsY.length) return 0;
		if(maxlevel==null) maxlevel=0
		if(columnydatas==null) return []
		var datas=[];
		var nextlevel=rowlevel+1;
		var row=_columnsY[rowlevel];
		var cname=row.name
		var vs=row.values
		var key=preY,keytxt;
		var linetxt
		var line;
		var totalline=null;
		var subcount=0
		var linedatas=[]
		var subcolumnydatas=null;
		
		// ���Ӻϼ�
		if(row.total.show) {
			totalline=[preY,rowlevel-1,false,'open',0].concat(predata,row.total.txt);
		}
		
		if(vs.length==0){
			buildcolumny(preY+'Y'+cname+'@',nextlevel,predata.concat('(��ֵ)'),maxlevel);
		}
		else {
			// ������¼����ݼ�����ɸѡ
			for(var i=0,l=vs.length;i<l;i++){
				subcolumnydatas=columnydatas['v:'+(vs[i]==null?'':vs[i])];
				if(subcolumnydatas==null) continue;
				
				linetxt=vs[i]==null?'':vs[i]
				key=preY+'Y'+cname+'@'+(vs[i]==null?'':vs[i]);
				if(rowlevel<_columnsY.length-1) {
					var subdatas=buildcolumny(key,nextlevel,predata.concat(linetxt),maxlevel,subcolumnydatas);
					if(subdatas.length>0){
						subcount+=subdatas['count'];
						if(maxlevel>0 && nextlevel==maxlevel){
							subdatas[0][3]='close';
							subdatas[0][4]=subdatas['count'];
							linedatas.push(subdatas[0]);
						}
						else{
							linedatas=linedatas.concat(subdatas);
						}
					}
				}
				else{
					var v=fcubedata[key]
					if(v!=null){
						line=[key,rowlevel,true,'open',0].concat(predata,linetxt);
						linedatas.push(line);
						subcount++;
						if(rowlevel>maxlevel) break;
					}
				}
			}
		}
		
		if(totalline!=null) totalline[4]=subcount;
		
		if(subcount>0){
			if(row.total.position=='head') datas.push(totalline)
			datas=datas.concat(linedatas);
			if(row.total.position=='tail') datas.push(totalline)
		}
		datas['count']=subcount;
		return datas;
	}
	
	// ����Y����������ģ�����ݣ�����ֻ����Y�ܷ������ݣ�û�л������ݵ����ݽṹ��
	function _buildTemplateDataSet(){
		var columns=_getTemplateDataColumns();
		
		var datas=buildcolumny('',0,[],_initshowlevel,_columnYdatas);
		
		var rs=new Ext.lt.recordset({columns:columns,datas:datas})
		_cmp.setRecordset(rs);
	}
	
	function _headclick_open(table,l,c,el){
		var col=table.getCols()[c],colname=col.name;
		var keyx=col.keyx,headtxt=col.head.join('');
		var allcols=table.getAllCols(),showcolnames=[],cn;
		var xlevel=col.xlevel,stat=col._headbtns.left[el.getAttribute('index')].icon;
		
		var newcols=[];
		for(var i=0,li=allcols.length;i<li;i++){
			col=allcols[i];
			if(col.xlevel==xlevel && col.keyx==keyx){
				col.display=false;
			}
			else if(col.xlevel==xlevel+1 && col.prex==keyx){
				col.display=true;
			}
			
			newcols.push(col);
		}
		_cmp.setCols(newcols);
		_cmp.redraw();
	}
	
	function _headclick_close(table,l,c,el){
		var col=table.getCols()[c],colname=col.name;
		var prex=col.prex,keyx=col.keyx;
		var allcols=table.getAllCols(),showcolnames=[],cn;
		var xlevel=parseInt(el.getAttribute('level'))+1;
		var tmp=keyx.split('_X');
		prex=tmp.slice(0,xlevel).join('_X');
		keyx=tmp.slice(0,xlevel+1).join('_X');
		if(prex.charAt(prex.length-1)!='_') prex+='_'
		if(keyx.charAt(keyx.length-1)!='_') keyx+='_'
		
		var totalprex=prex+'X'+colname+'@_';

		var newcols=[];
		for(var i=0,li=allcols.length;i<li;i++){
			col=allcols[i];
			if(col.xlevel==xlevel-1 && col.keyx==prex){
				col.display=true;
			}
			else{
				if(col.xlevel==xlevel && col.keyx==keyx){
					col.display=false;
				}
				else if(col.keyx!=null && (col.keyx.indexOf(prex)==0 || col.keyx.indexOf(totalprex)==0)){
					col.display=false;
				}
			}
			newcols.push(col);
		}
		_cmp.setCols(newcols);
		_cmp.redraw();
	}
	
	function _buildColumnHead(headtxt,prehead){
		var maxlevel=_columnsX.length-1,h=[];
		for(var i=prehead.length,li=0;i>li;i--){
			h[maxlevel--]=prehead[i-1];
		}
		for(;maxlevel>-1;) h[maxlevel--]=headtxt;
		return h;
	}
	
	// ������ʾ�ж���
	function _buildColumnSet(){
		var columns=[],rscolumns=[],col;
		columns.push({name:'columnY',alias:'',fn:_Yfn,width:150,onclick:_expandData})
		for(var i=0,l=_columnsY.length;i<l;i++){
			col=_columnsY[i];
			columns.push(Ext.lt.apply({display:false},col));
		}
		
		// ���ɺ��ͷ
		function buildcolumnx(preX,rowlevel,prehead,colx){
			if(rowlevel>=_columnsX.length) return ;
			var nextlevel=rowlevel+1;
			var row=_columnsX[rowlevel];
			var cname=row.name
			var vs=row.values
			var key=preX,keytxt;
			var zcol,headtxt;
			var display=rowlevel==0?true:false;
			var icon=rowlevel==0?'close':'open';
			var btns=[];
			var preheadtxt='';//rowlevel
			var xv;
			if(colx==null) colx=_columnXdatas;
			
			for(var i=0;i<rowlevel;i++){
				btns.push({icon:'open',level:i+1,position:'left',click:_headclick_close});
			}
			if(rowlevel<_columnsX.length-1) btns.push({icon:'close',level:rowlevel+1,position:'left',click:_headclick_open});

			
			// ���Ӻϼ�
			if(row.total.show && row.total.position=='head'){
				for(var n=0,nl=_columnsZ.length;n<nl;n++){
					zcol=_columnsZ[n],keytxt=key+'Z'+zcol.name;
					var colconfig={name:keytxt,istotal:true,keyx:key,prex:preX,alias:preheadtxt+(_columnsZ.length==1?row.total.txt:zcol.name),xlevel:rowlevel,datatype:zcol.datatype,zcolid:n,fn:_Zfn,head:_buildColumnHead(preheadtxt+row.total.txt,prehead),sumsigma:zcol.sumsigma,display:display};
					
						if(colconfig.head.length !="1"){
							colconfig.btns=btns;
							}
				
					
					columns.push(colconfig);
				}
				buildcolumnx(key,nextlevel,[].concat(preheadtxt+row.total.txt,prehead));
			}
			
			// if(rowlevel<_columnsX.length-1) btn=[{icon:icon,level:rowlevel+1,position:'left',click:_headclick}]
			for(var i=0,l=vs.length;i<l;i++){
				xv=vs[i];
				// �������û����������Ҫ����
				if(colx['v:'+xv]==null) continue;
				
				headtxt=xv==null?'(��ֵ)':xv;
				key=preX+'X'+cname+'@'+vs[i]+'_';
				for(var n=0,nl=_columnsZ.length;n<nl;n++){
					zcol=_columnsZ[n],keytxt=key+'Z'+zcol.name;
					var colconfig={name:keytxt,istotal:false,keyx:key,prex:preX,alias:preheadtxt+(_columnsZ.length==1?headtxt:zcol.name),xlevel:rowlevel,datatype:zcol.datatype,zcolid:n,fn:_Zfn,head:_buildColumnHead(preheadtxt+headtxt,prehead),sumsigma:zcol.sumsigma,display:display};
					colconfig.btns=btns
					columns.push(colconfig);
				}
				
				buildcolumnx(key,nextlevel,[].concat(preheadtxt+headtxt,prehead),colx['v:'+xv]);
			}
			
			// ���Ӻϼ�
			if(row.total.show && row.total.position=='tail'){
				for(var n=0,nl=_columnsZ.length;n<nl;n++){
					key=preX+'X'+cname+'@_';
					zcol=_columnsZ[n],keytxt=key+'Z'+zcol.name;
					var colconfig={name:keytxt,istotal:true,keyx:key,prex:preX,alias:preheadtxt+(_columnsZ.length==1?row.total.txt:zcol.name),xlevel:rowlevel,datatype:zcol.datatype,zcolid:n,fn:_Zfn,head:_buildColumnHead(preheadtxt+row.total.txt,prehead),sumsigma:zcol.sumsigma,display:display};
					colconfig.btns=btns;
					columns.push(colconfig);
				}
				buildcolumnx(key,nextlevel,[].concat(preheadtxt+row.total.txt,prehead));
			}
		}
		buildcolumnx('',0,[])
		_cmp.setCols(columns);
		_cmp.clockColumnSize(1);
		_buildSumDataFunction()
	}
	
	
	_cmp.drawMultiHead(true);
	_cmp.setInitshowlevel=function(level){
		if(isNaN(level)) return;
		if(level<0) return;
		_initshowlevel=level
	}
	
	
	var _cmpdraw=_cmp.draw;
	_cmp.draw=function(el){
		el.className+=' cube '
		_cmpdraw.apply(this,[el]);
	}
	
	/*
	var cubecomdiv=null;
	var showsigmadatadiv=null;
	var showcolumndatadiv=null;
	var showcolumnXdiv=null;
	var showcolumnYdiv=null;
	var showcolumnZdiv=null;
	
	
	
	
	_cmp.draw=function(el){
		if(el==null) return;
		
		var w=el.offsetWidth,h=el.offsetHeight;
		if(w<500) w=500;
		if(h<400) h=400;
		
		// ���ɽ�������ṹ
		Ext.lt.HTML.setInnerHTML(el,'<div><div></div><div style="height:100%;width:150px;float:left"><div style="width:150px;"></div><table width=150px height=150px border=1 cellpadding=0 cellmargin=0><tr><td></td><td>X</td></tr><tr><td>Y</td><td>Z</td></tr></table></div></div>');
		cubecomdiv=el.firstChild;
		cubecomdiv.style.cssText='width:'+w+'px;height:'+h+'px;overflow:hidden;';
		showsigmadatadiv=cubecomdiv.firstChild;
		showsigmadatadiv.style.cssText='width:'+(w-150-1)+'px;height:'+h+'px;overflow:hidden;float:left;overflow:hidden;';
		var tmpdiv=cubecomdiv.lastChild;
		showcolumndatadiv=tmpdiv.firstChild;
		showcolumndatadiv.style.height=(h-150)+'px';
		tmpdiv=tmpdiv.lastChild.cells;
		showcolumnXdiv=tmpdiv[1];
		showcolumnYdiv=tmpdiv[2];
		showcolumnZdiv=tmpdiv[3];
		
		
		_drawColumnList();
		
		
		_cmp._draw(showsigmadatadiv);
	}
	
	var columnqlist=null;
	function _drawColumnList(){
		var ldata=[];
		for(var i=0,l=_columns.length;i<l;i++){
			ldata.push({itemid:_columns[i],isleaf:true,level:0});
		}
		
		columnqlist=new Ext.lt.Qtree({
			data:ldata
			,outformart:'#itemid'
			,viewmodel:'list'
		});
		columnqlist.draw(showcolumndatadiv);
	}
	*/
	return _cmp;
}

