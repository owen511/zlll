if(Ext.lt==null) alert('�����ltext_core.js');

/**
	��׼�༭����չ,��չ�����API����
	
	֧�ֵı༭�����ͣ�type���ԣ���
	input���ı��༭��
	amtinput�����༭��
	numberinput�����ֱ༭��
	select����ѡ�б��ı���
	treeselect����ѡ�����ı���
	label�����ֱ�ǩ
	button����ť
	date���������ı���
	
	
EditPanel
	����HTMLԪ�س�ʼ����ʱ�������UL LI��ǩ������UL��ǩ��������������LI�������е�ÿһ���༭ѡ�ͨ��UL��LI��ǩ���������ñ���ۺ���Ϊ
������
	initFormPanel(element,ds)	��Ҫ��չ�ɱ༭���HTMLԪ�أ����ݼ�

���ϣ�
	elements	�������б༭��Ԫ�ض�������ã�����Array/Object��ʽ�洢���б༭���Ӷ������á�

������
	getData()		��ȡ�༭���󶨵�ֵ���������ʼ��ʱֵ����ΪNull���༭�������´���һ��ֵ����
	on({eventname:function(ds,param),��})	���¼�������Ϊ����key���¼�����ֵΪ�¼����������¼�����������������������һ��Ϊ�༭���󶨵����ݼ����ڶ����ǳ����¼��Ķ����͵Ĳ���
	fireEvent(eventname,param)		����ָ�����¼�������Ϊ�¼����ʹ��ݵĲ�����
	reset()		���ñ༭��������
	check()		У��༭�������ݣ�����ֵΪboolean��true��ʾȫ��У��ͨ��
	submit(callback:function(returnvalue))		���ʼ��������action���������õĵ�ַ�ύ�༭�����ݣ���Զ�̵���ǰ��ִ��submit�¼���Զ�̵��óɹ����ִ��aftersubmit�¼�
	bind(object)	��༭�������ݼ����󣬿���Ϊnull���������Ϊnullʱ����һ���µ�ֵ����
	isChange()	����ֵΪboolean���÷�������༭���󶨵�ֵ����������Ƿ񱻸ı��������иı��򷵻�true��û���򷵻�false



�༭Ԫ�ض���
    �༭���������label��input��select�ȳ����������
    
�������ԣ�
	type���༭Ԫ�ص�����
	name���༭Ԫ�ص����ƣ�Ҳ�Ǳ༭������elements������ָ��༭Ԫ�ص���������
	label���༭��ǰ�����ֲ��֣�֧��HTML��ʽ
	labelwidth���༭��ǰ��������ʾ���ֵĿ�ȣ�֧�����أ��ٷֱȷ�ʽ���á�Ĭ��120����
	width���༭�������ȣ�����ʹ�����ء��ٷֱȷ�ʽ���á�Ĭ��33.3%���༭�����ݷ�3����ʾ
	maxlength�����¼������������input��amtinput��text�ȿ�¼������������
	clearbtn����ѡֵyes��no��Ĭ��no ��ʾ�����ť������ͨ�������ťɾ���༭������ʾ������
	isnull���Ƿ�ɿգ���ѡֵtrue��������Ϊtrueʱ��label����׷�Ӻ�ɫ�Ǻţ���check��������֤�û�����¼����Ϣ��ѡ����Ϣ
	
	

���з�����
	reset()	���÷��������༭Ԫ���������ֵ���������ֵ�ָ�����ʼ״̬��ע�������ǻָ�����ʼ״̬�������������
	check()	���༭Ԫ����¼���ֵ�Ƿ����ϵͳҪ�󣬷��Ϸ���true�������Ϸ���false���÷���Ϊ�༭Ԫ��ǿ��Ҫ��ʵ�ֵķ�������֤�߼��и����༭Ԫ���Լ�ʵ�֡�
	bind(object)	�����ݶ���������༭Ԫ��name������ͬ������ֵ���������Ϊ�գ����Զ�����һ���¶���



	
 */
Ext.lt.editpanel=new function(){
	var _labelstart=this._labelstart='<table width="100%" border="0" cellpadding="0" cellspacing="0"><tr>';
	var _labelend=this._labelend='</tr></table>';
	var _clearbtn=this._clearbtn='<button class="btn_clear" overclass="btn_clear_over" clickclass="btn_clear_click"></button>';
	var _morebtn=this._morebtn='<button class="btn_pop" overclass="btn_pop_over" clickclass="btn_pop_click"></button>';
	var _listbtn=this._listbtn='<button class="btn_list" overclass="btn_list_over" clickclass="btn_list_click"></button>';
	var _datebtn=this._datebtn='<button class="btn_date" overclass="btn_date_over" clickclass="btn_date_click"></button>';
	var _calbtnfn=this._calbtnfn=function(s){
		return '<button class="cal" switchgroup="_buildfrom" switchclass="calon" '+(s?'switch="on"':'')+'></button>';
	}
	
	var _elconfig=this._elconfig=function(el){
		return {
			type:el.getAttribute("type")==null?'input':el.getAttribute("type"),
			label:el.getAttribute("label")==null?'':el.getAttribute("label"),
			isnull:el.getAttribute("isnull")!='false',
			labelwidth:el.getAttribute("labelwidth")==null?'0':el.getAttribute("labelwidth"),
			format:el.getAttribute("format")==null?'':el.getAttribute("format"),
			width:el.getAttribute("width"),
			clearbtn:el.getAttribute("clearbtn")==null?false:el.getAttribute("clearbtn")=='true',
			morebtn:el.getAttribute("morebtn")==null?false:el.getAttribute("morebtn")=='true',
			name:el.getAttribute("name")==null?'':el.getAttribute("name"),
			maxlength:el.getAttribute("maxlength")==null?'250':el.getAttribute("maxlength"),
			cal:el.getAttribute("cal")==null?false:el.getAttribute("cal")=='true',
			calmode:el.getAttribute("calmode")==null?false:el.getAttribute("calmode")=='on',
			redwordmode:el.getAttribute("redwordmode")==null?false:el.getAttribute("redwordmode")=='on',
			dot:el.getAttribute("dot")==null?2:parseInt(el.getAttribute("dot"),10),
			qfw:el.getAttribute("qfw")==null?true:el.getAttribute("qfw")=='true',
			action:el.getAttribute("action")==null?'':el.getAttribute("action"),
			dataloader:el.getAttribute("dataloader")==null?'':el.getAttribute("dataloader"),
			selectmode:el.getAttribute("selectmode")==null?'':el.getAttribute("selectmode"),
			tagel:el
		}
	}
	
	/**
	 * ��ʼ��һ��������
	 * ����HTMLԪ�س�ʼ����ʱ�������UL LI��ǩ������UL��ǩ��������������LI�������е�ÿһ���༭ѡ�ͨ��UL��LI��ǩ���������ñ���ۺ���Ϊ
	 */
	this.initFormPanel=function(element,ds){
		// ���ص�FormPanel����
		var times=[]
		var start=new Date();
		var _form=element;
		    _form.elements=[];
		var _ds=ds==null?{}:ds;
		var _dsbak=null;  // ���ݱ���
		var _action=element.action;
		var _btn_submit=[];

		// ֧�ֵ�ʱ����
		var _events=['submit','aftersubmit','reset','valuechange','aftervaluechange'];
		var _method=['reset','check','bind'];


		function initformattr(attr,dv){
			var v=_form.getAttribute(attr)
			if(v==null){
				 _form[attr]=dv
			}
			else{
				if(typeof(dv)=='number'){
					v=parseInt(v,10);
					_form[attr]=isNaN(v)?dv:v;
				}
				else if(typeof(dv)=='string'){
					_form[attr]=v==null?dv:v;
				}
				else if(typeof(dv)=='boolean'){
					v=v=='true'?true:v=='false'?false:true;
					_form[attr]=v==null?dv:v;
				}

			}
		}
		    
		// ���editpanel��ʽ
		_form.className+=" editpanel";
		// �����������п���С120px
		initformattr('columnsize',3);
		initformattr('mincolumnwidth',200);		
		initformattr('autolayout',true);		
		
		times.push(new Date()-start)
		Ext.lt.HTML.expand(element);
		
		var els=_form.children,el,type,cfg,obj;
		for(var i=0,j=els.length;i<j;i++){
			el=els.item(i);
			el.className+=' box';
			cfg=_elconfig(el);
			cfg.bind=_ds;
			cfg.formpanel=_form;
			if(cfg.width!=null) Ext.lt.HTML.setStyle(el,"width:"+cfg.width+";min-width:"+((cfg.width>250)?"250":cfg.width)+";");
			// ��������
			switch (cfg.type){
				case 'input':
					obj=new _input(cfg);
					break;
				case 'amtinput':
					obj=_amtinput(cfg);
					break;
				case 'label':
					obj=_label(cfg);
					break;
				case 'select':
					obj=new _select(cfg);
					break;
				case 'treeselect':
					obj=new _treeselect(cfg);
					break;
				case 'numberinput':
					obj=new _numberinput(cfg);
					break;
				case 'button':
					obj=_button(cfg);
					if(cfg.type=='submit') _btn_submit.push(obj)
					_events.push(cfg.name+'click')
					break;
				case 'date':
					obj=new _date(cfg);
					break;
				case 'dateregion':
					obj=new _dateregion(cfg);
					break;
				case 'textarea':	
					obj=new _textarea(cfg);
					break;	
				default: 
					obj=_label(cfg);
					break;
			}
			
			// ��������Ϊ����
			var noMethod=[]
			for(var n=0,m=_method.length;n<m;n++){
				if(obj[_method[n]]==null) noMethod.push(_method[n])
			}
			if(noMethod.length>1)alert('�༭�����'+cfg.type+'û��ʵ��'+noMethod.join('��')+'����');
			
			obj.draw(el);
			
			_form.elements.push(cfg.name);
			_form.elements[cfg.name]=obj;
			times.push(new Date()-start)
		}
		
		// ��ӱ༭���ķ������¼�
		
		// ��ȡ�༭������
		_form.getData=function(){return _ds};
		
		_form.on=function(events){
			for(var i=0;i<_events.length;i++){
				if(events[_events[i]]!=null){
					// ����¼�
					_events['on'+_events[i]]=Ext.lt.util.fnbind(events[_events[i]],_form);
				}
			}
		};
		
		// �����¼�ִ��
		_form.fireEvent=function(en,param){
			if(_events[en]!=null){
				_events[en](_ds,param);
			}
		}
		// ���ñ༭����ֵ
		_form.reset=function(){
			var eles=_form.elements;
			for(var i=0,l=eles.length;i<l;i++){
				if(eles[eles[i]].reset!=null)	eles[eles[i]].reset();
			}
		}
		// �����и���Ҫ�ص������Ƿ����¼�����
		_form.check=function(){
			var eles=_form.elements;
			for(var i=0,l=eles.length;i<l;i++){
				if(eles[eles[i]].check!=null)	if(eles[eles[i]].check()==false) return false;
			}
			return true;
		}
		
		// �ύ�༭��
		_form.submit=function(fn){
			if(!_form.check()) return false;
			if(_action==null){
				alert('û��ָ���ύ�ĵ�ַ');
				return false;
			}
			_form.fireEvent('onsubmit',_form);
			_form.holdSubmitButton();
			$.ajax({
				type: "POST",
				url: _action,
				data:_ds,
				success : function(retobj){
					var _data=retobj;
					try{
						eval('var _data='+retobj);
					}
					catch(ex){}
				  _form.fireEvent('onaftersubmit',_data);
				  _form.releaseSubmitButton()
				  if(fn!=null) fn(_data);
				},
				error : function(resp, textStatus, errorThrown) {
					alert(_action+"�ύ����ʧ��"+resp.responseText.replace('\\','\\\\'));
				  _form.releaseSubmitButton()
				}
			})
			return true;
		}
		
		// ��������submit�͵İ�ť
		_form.holdSubmitButton=function(){
			for(var i=0;i<_btn_submit.length;i++) _btn_submit[i].hold();	
		}
		// �ͷ�����submit�Ͱ�ť������״̬
		_form.releaseSubmitButton=function(){
			for(var i=0;i<_btn_submit.length;i++) _btn_submit[i].release();
		}
		
		// �ñ༭�����°󶨶���
		_form.bind=function(obj){
			if(obj==null) obj={}
			_ds=obj;
			var eles=_form.elements;
			for(var i=0,l=eles.length;i<l;i++){
				if(eles[eles[i]].bind!=null) eles[eles[i]].bind(obj);
			}
			_dsbak=Ext.lt.clone(_ds);
		}
		
		_form.isChange=function(){
			// ������������Ƿ��޸Ĺ�
			var eles=_form.elements;
			for(var i=0,l=eles.length;i<l;i++){
				if(_ds[eles[i]]!=_dsbak[eles[i]]) return true;
			}
			return false;
		}

		_form._layout=function(){
			var columnwidth;
			if(this.columnsize>0){
				// ��С���
				var formminwidth=this.mincolumnwidth*this.columnsize;
				var formwidth=this.offsetWidth;
				if(formwidth<formminwidth){
					this.style.width=formminwidth+'px';
					formwidth=formminwidth;
				}
				
				columnwidth=formwidth/this.columnsize;
			}
			var boxs=this.elements;
			for(var i=0,l=boxs.length;i<l;i++){
				boxs[boxs[i]].resize(columnwidth);
			}
			
			
		}
		
		
		if(_form.autolayout) Ext.lt.message.hook("layout","endlayout",Ext.lt.util.fnbind(_form._layout,_form));
		_form._layout();
		_form.bind();
		return _form;
	}
	
	// ����Label����
	var _buildLabel=this._buildLabel=function(cfg,contextfn){
		var _html=[]
		if(cfg.label!=null && cfg.label!=''){
			// _html.push(_labelstart);
			if(cfg.labelwidth==0){
				_html.push('<q class="lab">',cfg.label);
			}
			else{
				_html.push('<q style="width:',cfg.labelwidth,';" class="lab">',cfg.label);
			}
			// �ж��Ƿ�Ϊ������
			if(!cfg.isnull) _html.push('&nbsp;<font color=red>*</font>');
			_html.push('</q><q>');
		}

		// �����ڲ�HTML
		_html.push(contextfn(),'</q>');

		// ��������Table����
		//if(cfg.label!=null &&cfg.label!='') _html.push('</div>',_labelend);
		return _html.join('');
	}
	
	// ����˾�淶ʵ�ֵı�׼�����
	/*
	type:"input"  ¼�������
	width:String ������ã�����ʹ�ðٷֱȻ����ּӵ�λ����ʽ����"49.9%"��"300px"
	maxlength:String ������볤�ȣ�Ĭ��250
	isnull:"true"    �Ƿ���Ĭ��Ϊfalse������Ϊtrue��¼��˵��λ���Զ�׷�Ӻ�ɫ�Ǻ�
	label:"�����ı�"     label������
	labelwidth:			 label�����
	tipstext:     ȱʡ��ʾ�����֣������ø����Ժ����ı�������ʱ���ı�������Ϊ�յ�״̬��ʧȥ����ʱ���ı������ݽ���ʾΪdefaulttext�������õ�����
	bind:		�����ݼ��������������������Զ��޸İ����ݼ���������name��ͬ������
	*/
	var _input=function(cfg){
		var _cfg=cfg;
		var _tagel=_cfg.tagel;
		var _inner=_tagel==null?'':_tagel.innerHTML;
		var _input=null;
		var _morebtn=null;
		var _clearbtn=null;
		var _id=_cfg.id;
		var _defaulttext=_cfg.defaulttext==null?'':''+_cfg.defaulttext;
		var _tipstext=_cfg.tipstext==null?'':''+_cfg.tipstext;
		var _tipstextcolor='#CCC';
		var _name=_cfg.name;
		var _ds=_cfg.bind;
		var _defaultvalue=_ds==null?'':_ds[_name]==null?'':_ds[_name];
		var _isnull=cfg.isnull;
		var _pl_input;
		var _form=cfg.formpanel;
		
		// ���������Ƕ�����ʱ�����ȫ�ֱ����в��Ҹö���
		if(typeof(_ds)=='string') _ds=eval(_ds);
		
		_pl_input=new function(){
			
			// ���ö��󷵻�ֵ
			this.getValue=function(){return _input.value};
			
			this.toString=function(){
				return _buildLabel(_cfg,function(){
					var _html=['<input id="',_cfg.id,'" name="',_name,'" class="inputbox" type="text" maxLength=',_cfg.maxlength,'/>'];
					if(_cfg.morebtn) _html.push(Ext.lt.editpanel._morebtn);
					if(_cfg.clearbtn) _html.push(Ext.lt.editpanel._clearbtn);
					return _html.join('');
				});
			};
			
			this.draw=function(el){
				if(el!=null) _tagel=el;
				if(_tagel==null) {
					errlog('û��ָ��Input�����ɵ�Ŀ�����');
					return;
				}
				_tagel.setInnerHTML(this.toString());
				
				
				// ��ȡInput�������Ӵ�������
				_input=_tagel.getElementsByTagName('INPUT').item(0);
				if(_cfg.morebtn) _morebtn=_input.nextSibling;
				if(_cfg.clearbtn) _morebtn==null?_clearbtn=_input.nextSibling:_clearbtn=_morebtn.nextSibling

				// �����������ݼ��е�ֵ
				if(_ds==null){
					_input.value=_tipstext;
					Ext.lt.HTML.setRuntimeStyle(_input,"color:"+_tipstextcolor);
				}
				else if(_ds[_name]!=null){
					_input.value=_ds[_name];
				}
				
				// ��հ�ť�ĵ���¼�
				if(_clearbtn!=null){
						_clearbtn.onclick=function(){
						_input.value='';
						_input.fireEvent('onblur');
					}
				}

				_input.attachEvent('onfocus',function(){
					_input.select()
					_input.runtimeStyle.color='';
				});
				
				// ʧ�����¼�����������У�飬ͬ�����ݼ����ݵȲ���
				_input.attachEvent('onblur',Ext.lt.util.fnbind(function(){
					var v=this.value;
					
					// У��ǿ���ʾ��������ʽ�������input���ȱ��Σ������ʱ��Ϊ�������ó�����ʽ
					if(!_isnull && v==''){
						if(this.borderBottomColorbak==null) this.borderBottomColorbak=this.currentStyle.borderBottomColor
						if(this.borderBottomStylebak==null) this.borderBottomStylebak=this.currentStyle.borderBottomStyle
						this.style.borderBottomColor='red'
						this.style.borderBottomStyle='dashed'
					}
					else{
						if(this.borderBottomColorbak!=null)this.style.borderBottomColor=this.borderBottomColorbak
						if(this.borderBottomStylebak!=null)this.style.borderBottomStyle=this.borderBottomStylebak
					}
					window.event.cancelBubble=true;
				},_input));
				
				_input.onafterbind=function(){
					var v=this.value;
					if(v=='') this.value=_tipstext
					
					if(_tipstext!='' && v==_tipstext){
						this.runtimeStyle.color=_tipstextcolor;
					}

					// �����༭���޸��¼�
					if(_form!=null) _form.fireEvent('onaftervaluechange',{src:_input,value:v});	
				}
				
			};
			
			// ������������
			this.name=_name;
			
			// ��������������Ϊ��ʼֵ
			this.reset=function(){
				_input.reset();
			}
			// У���ı��������Ƿ��������
			this.check=function(){
				if(!_isnull && (_input.value==null || _input.value=='')){
					alert(_cfg.label+'�Ǳ��������д');
					_input.fireEvent('onfocus');
					_input.focus();
					return false;
				}
			}
			// �����ݼ�
			this.bind=function(ds){
				_input.bind(ds);
				_input.fireEvent('onblur');
			}
			this.resize=function(w,h){
				if(w!=null) _tagel.style.width=w+'px'
				if(h!=null) _tagel.style.height=h+'px'
				this._layout();
			}
			this._layout=function(){
				var width=_tagel.offsetWidth;
				if(_tagel.children.length>1) width-=_tagel.firstChild.offsetWidth
				if(_morebtn!=null ) width-=20
				if(_clearbtn!=null ) width-=20
				if(width>80) width*=.9;
				if(width<80) width=80
				_input.style.width=width+'px';
			}
		}
		
		return _pl_input
	}
	this.input=_input;
	
	// ����˾�淶ʵ�ֵı�׼�����
	/*
	type:"input"  ¼�������
	width:String ������ã�����ʹ�ðٷֱȻ����ּӵ�λ����ʽ����"49.9%"��"300px"
	maxlength:String ������볤�ȣ�Ĭ��250
	isnull:"true"    �Ƿ���Ĭ��Ϊfalse������Ϊtrue��¼��˵��λ���Զ�׷�Ӻ�ɫ�Ǻ�
	label:"�����ı�"     label������
	labelwidth:			 label�����
	tipstext:     ȱʡ��ʾ�����֣������ø����Ժ����ı�������ʱ���ı�������Ϊ�յ�״̬��ʧȥ����ʱ���ı������ݽ���ʾΪdefaulttext�������õ�����
	bind:		�����ݼ��������������������Զ��޸İ����ݼ���������name��ͬ������
	*/
	var _textarea=function(cfg){
		var _cfg=cfg;
		var _tagel=_cfg.tagel;
		var _inner=_tagel==null?'':_tagel.innerHTML;
		var _textarea=null;
		var _morebtn=null;
		var _clearbtn=null;
		var _id=_cfg.id;
		var _defaulttext=_cfg.defaulttext==null?'':''+_cfg.defaulttext;
		var _tipstext=_cfg.tipstext==null?'':''+_cfg.tipstext;
		var _tipstextcolor='#CCC';
		var _name=_cfg.name;
		var _ds=_cfg.bind;
		var _defaultvalue=_ds==null?'':_ds[_name]==null?'':_ds[_name];
		var _isnull=cfg.isnull;
		var _pl_textarea;
		var _form=cfg.formpanel;
		
		// ���������Ƕ�����ʱ�����ȫ�ֱ����в��Ҹö���
		if(typeof(_ds)=='string') _ds=eval(_ds);
		
		_pl_textarea=new function(){
			
			// ���ö��󷵻�ֵ
			this.getValue=function(){return _textarea.value};
			
			this.toString=function(){
				return _buildLabel(_cfg,function(){
					if(_cfg.height==null||_cfg.height<20)_cfg.height=40;
					var _html=['<textarea id="',_cfg.id,'" name="',_name,'" class="inputbox" style="height:',_cfg.height,'px" ROWS =2 maxLength=',_cfg.maxlength,'></textarea>'];
					if(_cfg.morebtn) _html.push(Ext.lt.editpanel._morebtn);
					if(_cfg.clearbtn) _html.push(Ext.lt.editpanel._clearbtn);
					return _html.join('');
				});
			};
			
			this.draw=function(el){
				if(el!=null) _tagel=el;
				if(_tagel==null) {
					errlog('û��ָ��Input�����ɵ�Ŀ�����');
					return;
				}
				_tagel.setInnerHTML(this.toString());
				
				
				// ��ȡInput�������Ӵ�������
				_textarea=_tagel.getElementsByTagName('TEXTAREA').item(0);
				if(_cfg.morebtn) _morebtn=_textarea.nextSibling;
				if(_cfg.clearbtn) _morebtn==null?_clearbtn=_textarea.nextSibling:_clearbtn=_morebtn.nextSibling

				// �����������ݼ��е�ֵ
				if(_ds==null){
					_textarea.value=_tipstext;
					Ext.lt.HTML.setRuntimeStyle(_textarea,"color:"+_tipstextcolor);
				}
				else if(_ds[_name]!=null){
					_textarea.value=_ds[_name];
				}
				
				// ��հ�ť�ĵ���¼�
				if(_clearbtn!=null){
						_clearbtn.onclick=function(){
						_textarea.value='';
						_textarea.fireEvent('onblur');
					}
				}

				_textarea.attachEvent('onfocus',function(){
					_textarea.select()
					_textarea.runtimeStyle.color='';
				});
				
				// ʧ�����¼�����������У�飬ͬ�����ݼ����ݵȲ���
				_textarea.attachEvent('onblur',Ext.lt.util.fnbind(function(){
				},_textarea));
				
				_textarea.onafterbind=function(){
					var v=this.value;
					if(v=='') this.value=_tipstext
					
					if(_tipstext!='' && v==_tipstext){
						this.runtimeStyle.color=_tipstextcolor;
					}

					// �����༭���޸��¼�
					if(_form!=null) _form.fireEvent('onaftervaluechange',{src:_textarea,value:v});	
				}
				_pl_textarea.resize=function(w,h){
					if(w!=null) el.style.width=w+'px'
					if(h!=null) el.style.height=h+'px'
					this._layout();
				}
				_pl_textarea._layout=function(){
					var width=el.offsetWidth;
					if(el.children.length>1) width-=el.firstChild.offsetWidth
					if(_clearbtn!=null ) width-=20
					if(width>80){
						width*=.9;
						if(width<80) width=80
					}
					_textarea.style.width=width+'px';
				}
			};
			
			// ������������
			this.name=_name;
			
			// ��������������Ϊ��ʼֵ
			this.reset=function(){
				_textarea.reset();
			}
			// У���ı��������Ƿ��������
			this.check=function(){
				if(!_isnull && (_textarea.value==null || _textarea.value=='')){
					alert(_cfg.label+'�Ǳ��������д');
					_textarea.fireEvent('onfocus');
					_textarea.focus();
					return false;
				}else if(_textarea.maxLength!=null&&_textarea.value!=null&&_textarea.value.length>_textarea.maxLength){
					alert(_cfg.label+'���ȳ���'+_textarea.maxLength+'������д');
					_textarea.fireEvent('onfocus');
					_textarea.focus();
					return false;
				}
			}
			// �����ݼ�
			this.bind=function(ds){
				_textarea.bind(ds);
			}
		
		}
		
		return _pl_textarea
	}
	this.textarea=_textarea;
	
	
	// ����˾�淶ʵ�ֵı�׼��������
	/*
	type:"amtinput"  ¼�������
	width:String ������ã�����ʹ�ðٷֱȻ����ּӵ�λ����ʽ����"49.9%"��"300px"
	maxlength:String ������볤�ȣ�Ĭ��250
	isnull:"true"    �Ƿ���Ĭ��Ϊfalse������Ϊtrue��¼��˵��λ���Զ�׷�Ӻ�ɫ�Ǻ�
	label:"���"     label������
	labelwidth:			 label�����
	cal:             �Ƿ�ʹ�ü���������
	calmode:         �Ƿ���������ģʽ��ʹ�ø�������cal����Ϊtrue��������ֵΪonʱ��¼�����Զ����������ģʽ
	qfw:             �Ƿ���ʾǧ��λ��Ĭ��Ϊtrue
	dot:             С������λ����Ĭ��2λ
	redwordmode:     ����ģʽ����¼������Ϊ����ʱ��Ϊ��ɫ
	*/
	var _amtinput=function(cfg){
		var _cfg=cfg;
		var _tagel=_cfg.tagel;
		var _inner=_tagel.innerHTML;
		var _input=null;
		var _calbtn=null;
		var _express='';

		return new function(){
			this.toString=function(){
				return _buildLabel(_cfg,function(){
					var _html=['<input name="',_cfg.name,'" class="inputbox" type="text" style="text-align:right" maxLength=',_cfg.maxlength,'/>'];
					if(_cfg.cal) _html.push(_calbtnfn(_cfg.calmode));
					if(_cfg.clearbtn) _html.push(Ext.lt.editpanel._clearbtn);
					return _html.join('');
				});
			};
			
			this.draw=function(el){
				if(el==null) el=_tagel;
				if(el==null) {
					errlog('û��ָ��Input�����ɵ�Ŀ�����');
					return;
				}
				el.innerHTML=this.toString();
				// ��ȡInput�������Ӵ�������
				_input=el.getElementsByTagName('INPUT').item(0);
				if(_cfg.cal) _calbtn=_input.nextSibling;
				if(_cfg.clearbtn) _calbtn==null?_clearbtn=_input.nextSibling:_clearbtn=_calbtn.nextSibling
				
				
				// �ı����¼�
				_input.attachEvent('onfocus',function(){
					_input.value=_input.value.replace(/,/g,'');
					_input.select()
				});
				// ʧ�����¼��������ָ�ʽ����ʾ
				_input.attachEvent('onblur',function(){
					// ��������ʽģʽʧ����ʱ�ȴ����������ݣ���ͨ���������ť�����ǽ����¼�
					if(_cfg.cal && _calbtn.switchon) return;
					_input.value=_input.value.toNumber(_cfg.dot,_cfg.qfw,1);
				});
				// ��������ʾΪ���ֵ�����
				_input.attachEvent('onkeyup',function(){
					if(_cfg.redwordmode){
						if(_input.value.charAt(0)=='-'){
							_input.runtimeStyle.color='red';
						}
						else{
							_input.runtimeStyle.color='';
						}
					}
				});
				_input.attachEvent('onkeydown',function(){
					var keycode=event.keyCode;

					// ������ģʽ�¿������������ַ�
					if(_cfg.cal &&_calbtn.switchon){
						// ������ģʽ�°��س����൱�ڹرռ�����
						if(keycode==13) _calbtn.fireEvent('onclick');
						return true;
					}
					
					var nstr=String.fromCharCode(keycode)
					
					if(!isNaN(nstr)) return true; // �����������
					if(keycode<41 && keycode>36) return true; // �����
					if(keycode==13 || keycode==9 || keycode==46 || keycode==8 ) return true; // �س���tab�� del�� �˸��
					
					// ���� ֻ��¼��һ�������ҳ����ڵ�һ��λ��
					// ���ݸ��ź���¼������ǰ��׷��һ������
					if(keycode==189){
						if(_input.value.indexOf('-')==-1){
							r = document.selection.createRange(); 
							r.collapse(false); 
							r.setEndPoint("StartToStart", _input.createTextRange());
							point= r.text.length;
							_input.value='-'+_input.value;
							r.move("character", point+1); 
							r.select();
						}
						else{
							r = document.selection.createRange(); 
							r.collapse(false); 
							r.setEndPoint("StartToStart", _input.createTextRange());
							point= r.text.length;
							_input.value=_input.value.replace(/-/g,'');
							r.move("character", point-1); 
							r.select();
						}
					}  
					
					// С���㣬ֻ��¼��һ��С���㣬����ı����Ѿ���С���㣬��ɾ��֮ǰ��С���㣬���µ�λ������С����
					if(keycode==190){
						r = document.selection.createRange(); 
						r.collapse(false); 
						r.setEndPoint("StartToStart", _input.createTextRange());
						point= r.text.length;
						_input.value=_input.value.substr(0,point).replace(/\./g,'')+'.'+_input.value.substr(point).replace(/\./g,'');
						r.move("character", point); 
						r.select(); 
					}

					_input.focus();
					return false;						
				});
				
				// ��������ť
				if(_calbtn!=null){
					_calbtn.attachEvent('onclick',function(){
						if(_calbtn.switchon){
							_input.runtimeStyle.backgroundColor='yellow';
							_input.runtimeStyle.color='';
							if(_express==null) _express=_input.value
							_input.value=_express;
						}
						else{
							_input.runtimeStyle.backgroundColor='';
							_express=_input.value;
							try{_input.value=eval(_input.value)}catch(ex){_input.value='0'} ;
							_input.fireEvent('onkeyup');
							_input.fireEvent('onblur');
						}
					});
				}
			};
			
		}
	}
	this.amtinput=_amtinput;
	
	
	/**
	  type:"numberinput"  ������¼���
	  name:String      ��������
	  width:String     �������
	  isnull:boolean   �Ƿ����
	  label:""         label������
	  labelwidth:			 label�����
	  dot:int      С��λ��������������������  -1ʱ������С��λ���������������������
	  maxlength:       ���¼�볤��
	  clearbtn:boolean ��ʾ�����ť
	  qfw:boolean      �Ƿ���ʾǧ��λ
	  redwordmode:boolean ����ģʽ�����û����븺��ʱ��ʾΪ��ɫ
	*/
	var _numberinput=Ext.lt.createComponent(function(config){
		// �����������Ե�Ĭ��ֵ
		
		var _cfg=Ext.lt.apply({width:"",isnull:false,label:"",dot:-1,redwordmode:false,clearbtn:false,qfw:true,maxlength:50,id:'input'+Ext.lt.getNextSeqValue()},config);
		var _name=_cfg.name;
		var numberinput={}
		// ����¼����HTMLDIV����
		var el;
		// ¼������
		var _input;
		// �����ť����
		var _clearbtn;
		// ¼���󶨵����ݼ�����
		var _ds={};
		var _isnull=_cfg.isnull;
		
		numberinput.name=_cfg.name
		numberinput.toString=function(){
			return _buildLabel(_cfg,function(){
				var _html=['<input id="',_name,'" name="',_name,'" class="inputbox" style="text-align:right" type="text" maxLength=',_cfg.maxlength,'/>'];
				if(_cfg.clearbtn) _html.push(Ext.lt.editpanel._clearbtn);
				return _html.join('');
			});
		};
		numberinput.resize=function(w,h){
			if(w!=null) el.style.width=w+'px'
			if(h!=null) el.style.height=h+'px'
			this._layout();
		}
		numberinput._layout=function(){
			var width=el.offsetWidth;
			if(el.children.length>1) width-=el.firstChild.offsetWidth
			if(_clearbtn!=null ) width-=20
			if(width>80){
				width*=.9;
				if(width<80) width=80
			}
			_input.style.width=width+'px';
		}
		numberinput.draw=function(_tagel){
				el=_tagel;
				Ext.lt.HTML.setInnerHTML(el,this.toString());
			//	Ext.lt.HTML.expand(el);
				
				// ��ȡInput�������Ӵ�������
				_input=el.getElementsByTagName('INPUT').item(0);
				if(_cfg.clearbtn) _clearbtn=_input.nextSibling
				
				// �ı����¼�
				_input.attachEvent('onfocus',function(){
					_input.value=_input.value.replace(/,/g,'');
					_input.select()
				});
				
				// ʧ�����¼��������ָ�ʽ����ʾ
				_input.onafterbind=function(){
					_input.setvalue(_input.value.toNumber(_cfg.dot,false,1));
					_input.value=_input.value.toNumber(_cfg.dot,_cfg.qfw,1);
				};
				
				// ��������ʾΪ���ֵ�����
				_input.attachEvent('onkeyup',function(){
					if(_cfg.redwordmode){
						if(_input.value.charAt(0)=='-'){
							_input.runtimeStyle.color='red';
						}
						else{
							_input.runtimeStyle.color='';
						}
					}
				});
				/*
				_input.attachEvent('onkeydown',function(){
					var keycode=event.keyCode;
					
					var nstr=String.fromCharCode(keycode)
					//���������
					if(!isNaN(nstr)) return true; // �����������
					if(keycode<41 && keycode>36) return true; // �����
					if(keycode==13 || keycode==9 || keycode==46 || keycode==8 ) return true; // �س���tab�� del�� �˸��
					
					// ���� ֻ��¼��һ�������ҳ����ڵ�һ��λ��
					// ���ݸ��ź���¼������ǰ��׷��һ������
					if(keycode==189){
						if(_input.value.indexOf('-')==-1){
							r = document.selection.createRange(); 
							r.collapse(false); 
							r.setEndPoint("StartToStart", _input.createTextRange());
							point= r.text.length;
							_input.value='-'+_input.value;
							r.move("character", point+1); 
							r.select();
						}
						else{
							r = document.selection.createRange(); 
							r.collapse(false); 
							r.setEndPoint("StartToStart", _input.createTextRange());
							point= r.text.length;
							_input.value=_input.value.replace(/-/g,'');
							r.move("character", point-1); 
							r.select();
						}
					}  
					
					// С���㣬ֻ��¼��һ��С���㣬����ı����Ѿ���С���㣬��ɾ��֮ǰ��С���㣬���µ�λ������С����
					if(keycode==190){
						r = document.selection.createRange(); 
						r.collapse(false); 
						r.setEndPoint("StartToStart", _input.createTextRange());
						point= r.text.length;
						_input.value=_input.value.substr(0,point).replace(/\./g,'')+'.'+_input.value.substr(point).replace(/\./g,'');
						r.move("character", point); 
						r.select(); 
					}

					_input.focus();
					return false;						
				});*/
			};
			numberinput.bind=function(ds){
				_input.bind(ds);
				_input.fireEvent('onblur')
			}
		numberinput.reset=function(){
			_input.reset();
		}
		numberinput.check=function(){
			if(!_isnull && (_input.value==null || _input.value=='')){
				alert(_cfg.label+'�Ǳ��������д');
				_input.fireEvent('onfocus');
				_input.focus();
				return false;
			}
		}
		return numberinput;
	});
	this.numberinput=_numberinput;
	
	// ��ѡ�ı���
	var _select=Ext.lt.createComponent(function(cfg){
		var _cfg=cfg;
		var _tagel=_cfg.tagel;
		var _isnull=cfg.isnull;
		// ѡ������ݻ����ṹ
		// [{{t:��ʾ�ı�,v:ѡ��ֵ,s:�Ƿ�ѡ��,p:��ʾ�ı���ƴ����ÿ���ֵ�����ĸ����Ϊ��д������Сд}}]
		var v=[],_datas=null;
		
		var _input=null;
		var _pop=new Ext.lt.popwindow();
		
		var _selectValue=cfg.value;
		var _selectText=cfg.text;
		var _selectstyle=cfg.selectstyle==null?'nomorl':'tree';
		var _datas=null;
		var _morebtn=null;
		var _clearbtn=null;
		var select={};

		_pop.checkEvent=function(srcobj){
				return _tagel.contains(srcobj)
		}
		_pop.onclick=function(){
			var srcobj = window.event.srcElement;
			if(srcobj.tagName=='LI'){
				var v=srcobj.innerText;
				var vl=_datas.query({'t':v});
				if(vl.length>0)
					_input.value=_datas.query({'t':v})[0].v;
				else
					_input.value='';
				_input.fireEvent('onblur');
				_input.blur();
			}
			_pop.close();
		};
		_pop.selectfirst=function(){
			var opt=this.firstChild.firstChild;
			if(opt==null) return ;
			var v=opt.getAttribute('value');
			_input.value=v;
			_input.blur();
			_pop.close();
		}
		_pop.onclose=function(){_pop.filter()};
		// ֧��ƴ��¼��
		_pop.filter=function(v){
			// ƴ��,����ʾ����ƥ�䣬����ֵΪ����ָ�Ĭ������������
			if(v==null){
				_pop.setInnerHTML(_pop._htmlcontext);
			}
			else{
				var upperv=v.toUpperCase()
				var rs=_datas.select(function(d){
					var vl=v.length,py=d.p,text=d.t;
					if(py==null) return vl>text.length&&text.substr(0,vl)==v;
	
					if(vl>py.length && vl>text.length) return false				
					return ((vl<=py.length)&&(py.substr(0,vl)==upperv)) || ((vl<=text.length)&&(text.substr(0,vl)==v))
				});
				_pop.setInnerHTML(_buildSelect(rs));
				
			}
			
			return ;
		}
		// ʹ���˳�����������Ч
		_pop.dofilter=function(){
			if(_input.value!=''){
				var opts=_pop.getElementsByTagName('LI');
				if(opts.length==0){
					// û��ѡ����
					_input.value='';	
				}
				else{
					//_input.value=opts.item(0).getAttribute("value");
					var v=opts.item(0).innerText;
					var vl=_datas.query({'t':v});
					if(vl.length>0)
						_input.value=_datas.query({'t':v})[0].v;
					else
						_input.value='';
				}
			}
			_pop.close();
		}

		// ��ȡ���������ݣ�flag���������Ƿ�ص� onafterbind ����
		function dataloader(flag){
			if(_cfg.dataloader=='') return;
			eval("var elementcodes="+_cfg.dataloader)
			if(elementcodes==null) return;
			_datas=elementcodes;
			var pophtml=_buildSelect(_datas);
			_pop.setInnerHTML(pophtml);
			_pop._htmlcontext=pophtml;
			if(flag!=false) _input.onafterbind();
		}
		
		// ��Ϊ���ʱ����
		if(typeof(_cfg.dataloader)=='string'){
			// setTimeout(dataloader,0)
		}

		var _buildSelect=function(ds){
			var _popHTML=['<ul>'];
			ds.each(function(rs){
				_popHTML.push('<li class="opt" value="',rs['v'],'" overclass="opt optover" p="',rs['p'],'">',rs['t'],'</li>');
			});
			_popHTML.push('</ul>');
			return _popHTML.join('');
		}
		

		
		// ��Select��ǩ�ж�ȡ����
		var _readSelectData=function(seltag){
			var opts=seltag.options,opt,v=[];
			for(var i=0,l=opts.length;i<l;i++){
				opt=opts.item(i);
				if(opt.selected){
					_selectValue=opt.value;
					_selectText=opt.text;
				}
				v.push([opt.text,opt.value,opt.selected,opt.getAttribute("py")]);	
			}
			return new Ext.lt.recordset({columns:['t','v','s','p'],datas:v});
		}


		select.name=_cfg.name
		select.toString=function(){
			return _buildLabel(_cfg,function(){
				var _html=['<input name="',_cfg.name,'" type="text" class="inputbox"',(_cfg.maxlength==null?'':' maxLength='+_cfg.maxlength),(_selectText==null?'':' value="'+_selectText+'"'),'/>'];
				_html.push(Ext.lt.editpanel._listbtn);
				if(_cfg.clearbtn) _html.push(Ext.lt.editpanel._clearbtn);
				return _html.join('');
			});
		};
		
		
		function _showMore(){
			if(_pop.isShow()){
				_pop.close()
			}	
			else{
				dataloader(false);
				_pop.show(_input)
			};
		}
			
		select.draw=function(el){
			if(el!=null) _tagel=el;
			if(_tagel==null) {
				errlog('û��ָ��Input�����ɵ�Ŀ�����');
				return;
			}

			// ���Ŀ�����ÿ������select�������ȡ�ڲ�������Ϊ��ʼ������
			if(_tagel.getElementsByTagName('SELECT').length>0){
				_datas=_readSelectData(_tagel.getElementsByTagName('SELECT').item(0));
				_pop.innerHTML=_buildSelect(_datas);
			}
			
			_tagel.setInnerHTML(this.toString());
			
			
			// ��ȡInput�������Ӵ�������
			_input=_tagel.getElementsByTagName('INPUT').item(0);
			_morebtn=_input.nextSibling;
			if(_cfg.clearbtn) _clearbtn=_morebtn.nextSibling
			
			// ׷��������
			_input.insertAdjacentElement('beforeBegin',_pop);

			
			// ������¼�
			_morebtn.attachEvent('onclick',_showMore);
			if(_clearbtn!=null){
				_clearbtn.onclick=function(){
					_input.settext();
					_input.fireEvent('onblur');
				}
			}
			
			// ������ȡ�����¼�
			_input.onfocus=function(){
				_input.settext(_input.getBindValue());
				_input.select();
				_showMore();
			};
			
			_input.onafterbind=function(){
				// ���û�и�ֵ������Ҫ��������
				if(_input.value=='') return;
				// ���û�м������ݣ����￪ʼ��������
				if(_datas==null){dataloader(false);}
				var rs=_datas.query({'v':_input.value});
				if(rs.length==0){
					this.settext();
					this.setvalue();
				}
				else{
					this.settext(rs[0].t);
				}
				Ext.lt.message.send("formSelect","onchange",_input);
			}
			_input.onkeyup=function(){
				var keycode=event.keyCode;
				// �س� tab��
				if(keycode==13){
					_pop.selectfirst();
					return;
				}
				else if(keycode==9){
					_pop.dofilter();
					// ģ��ʧȥ����
					_input.blur();
					_input.fireEvent('onblur');
				}
				// Esc��
				else if(window.event.keyCode==27) {
					_input.value=_input.getBindValue();
					_pop.close();
					_input.blur();
				}
				else _pop.filter(_input.value);
			}
		};
			
		select.resize=function(w,h){
			_pop.close();
			if(w!=null) _tagel.style.width=w+'px'
			if(h!=null) _tagel.style.height=h+'px'
			this._layout();
		}
		select._layout=function(){
			var width=_tagel.offsetWidth;
			if(_tagel.children.length>1) width-=_tagel.firstChild.offsetWidth
			if(_morebtn!=null ) width-=20
			if(_clearbtn!=null ) width-=20
			
			if(width>80) width*=.9;
			if(width<80) width=80
			_input.style.width=width+'px';
		}
	
		select.bind=function(ds){
			_input.bind(ds);
			_input.fireEvent('onblur');
		}
		
		select.reset=function(){
			_input.reset();
		}
		
		select.check=function(){
			if(!_isnull && (_input.value==null || _input.value=='')){
				alert(_cfg.label+'�Ǳ��������д');
				//_input.fireEvent('onfocus');
				//_input.focus();
				return false;
			}
		}

		select.getText=function(v){
			var rs=_datas.query({v:v});
			if(rs!=null) return rs.length==0?null:rs[0].t;			
			return null
		}

		return select;
	});
	this.select=_select;
	
	
	// ��ѡ�����ı���
	var _treeselect=Ext.lt.createComponent(function(cfg){
		var _cfg=cfg;
		var _tagel=_cfg.tagel;
		// ѡ������ݻ����ṹ
		// [{t:��ʾ�ı�,v:ѡ��ֵ,sv:�ϼ�����,s:�Ƿ�ѡ��,p:��ʾ�ı���ƴ����ÿ���ֵ�����ĸ����Ϊ��д������Сд}]
		var _datas=null;
		var _input=null;
		var _selectText=null;
		var _treeselect={}
		var _pop=new Ext.lt.popwindow();
		var _qtree=null;
		var _btn_more=null;
		var _btn_clear=null;
		
		// ��������������
		if(typeof(_cfg.dataloader)=='string'){
				eval("var elementcodes="+_cfg.dataloader)
				// if(elementcodes==null) return;
				_datas=elementcodes;
		}

		function _onTreeNodeClick(){
			var sels=_qtree.getSelected();
			var values=[];
			for(var i=0,l=sels.length;i<l;i++){
				values.push(sels[i].v);
			}
			_input.settext(values.join());
		}
		
		function _onTreeClick(){
			if(_pop.isShow()) return;
			// ����������С
			_pop.show();
		}


		_treeselect.toString=function(){
			return _buildLabel(_cfg,function(){
				var _html=['<input name="',_cfg.name,'" type="text" class="inputbox"',(_cfg.maxlength==null?'':' maxLength='+_cfg.maxlength),(_selectText==null?'':' value="'+_selectText+'"'),'/>'];
				_html.push(Ext.lt.editpanel._morebtn);
				if(_cfg.clearbtn) _html.push(Ext.lt.editpanel._clearbtn);
				return _html.join('');
			});
		};
		
		_treeselect.bind=function(ds){
			_input.bind(ds);
			_input.fireEvent('onblur');
		};
		
		function _getSelectedValue(){
			var values=null;
			var v=_input.getBindValue();
			if(v!=null) values=v.split(',');
			return values;
		}
		
		function _initQtree(){
			if(_qtree==null){
				_qtree=new Ext.lt.Qtree({
					field:{id:'v',sid:'sv',level:'l',isleaf:'isleaf'},
					outformart:'#t',
					data:_datas,
					linkchild:true,
					values:_getSelectedValue(),
					showRootNode:_cfg.selectmode=='n'||_cfg.selectmode=='checkbox',
					selectmode:_cfg.selectmode,
					on:{nodeclick:_onTreeNodeClick,click:_onTreeClick}
				});
				_qtree.draw(_pop);
			}	
		}
		
		_treeselect.draw=function(el){
			// ���Ŀ�����ÿ������select�������ȡ�ڲ�������Ϊ��ʼ������
			if(_tagel.getElementsByTagName('SELECT').length>0){
				_datas=_tagel.getElementsByTagName('SELECT').item(0).readData();
			}
			_tagel.setInnerHTML(this.toString());
			
			// ��ȡInput�������Ӵ�������
			_input=_tagel.getElementsByTagName('INPUT').item(0);
			_btn_more=_input.nextSibling;
			if(_cfg.clearbtn) _btn_clear=_btn_more.nextSibling
			if(_btn_clear!=null){
				_btn_clear.onclick=function(){
					_input.settext();
					_qtree.clearSelected();
					_input.fireEvent('onblur');
				}
			}
			// ����ѡ�������Ƿ�ʧȥ����
			function _checkBlur(en){
				var srcel=en.srcElement
				if(!_pop.contains(srcel) && !_input.contains(srcel) ){
					_pop.close();
					document.detachEvent('onclick',_checkBlur);
				}
			}
			
			// Input�۽�ʱ��ʾ����������
			_input.attachEvent('onfocus',function(){
				_input.select();
				_initQtree();
				_qtree.setFilter(null);
				_pop.show(_input);
				document.attachEvent('onclick',_checkBlur);
			});
			
			_input.onafterbind=function(){
				_initQtree();
				var sels=_qtree.getSelected();
				var values=[],texts=[];
				if(sels[0]!=null){
					for(var i=0,l=sels.length;i<l;i++){
						texts.push(sels[i].t);
						values.push(sels[i].v);
					}
				}
				_input.settext(texts.join());
				_input.setvalue(values.join());
			}
			
			function showfiltertree(){
				var filter=null;
				if(_input.value!=''){
					filter=[{field:'t',values:_input.value}]
					_qtree.setFilter(filter,'left');
					_pop.show();
				}
				else{
					_qtree.setFilter(null);
					_pop.show();
				}
			}
			
			// left:37 up:38 right:39 down:40 space:32 enter13
			_input.onKey({
				'40':function(){ //down:40 
					var node=_qtree.getActiveNode();
					if(node==null){
						node=_qtree.getNode(_datas.toArray()[0].v);
						if(node==null) return;
					}
					else{
						node=node.nextSibling;
						if(node==null) return;						
					}
					node.body.fireEvent('onclick');
				},
				'38':function(){ //up:38
					var node=_qtree.getActiveNode();
					if(node==null){
						node=_qtree.getNode(_datas.toArray()[0].v);
						if(node==null) return;
					}
					else{
						node=node.previousSibling;
						if(node==null) return;						
					}
					node.body.fireEvent('onclick');
				},
				'*':showfiltertree
			});
			_btn_more.onclick=function(){
				_input.fireEvent('onfocus');
			}
		};
				
		_treeselect.blur=function(){
			_input.fireEvent('onblur');
		}
		_pop.onclose=_treeselect.blur

		
		// ���÷���
		_treeselect.reset=function(){
			_input.reset();
		}
		_treeselect.check=function(){
			
		}
		_treeselect.resize=function(w,h){
			_pop.close();
			if(w!=null) _tagel.style.width=w+'px'
			if(h!=null) _tagel.style.height=h+'px'
			this._layout();
		}
		_treeselect._layout=function(){
			var width=_tagel.offsetWidth;
			if(_tagel.children.length>1) width-=_tagel.firstChild.offsetWidth
			if(_btn_more!=null ) width-=20
			if(_btn_clear!=null ) width-=20
			if(width>80) width*=.9;
			if(width<80) width=80
			_input.style.width=width+'px';
		}
		return _treeselect;
	});
	this.treeselect=_treeselect;
	
	// ����˾����淶ʵ��Label����
	var _label=function(cfg){
		var _cfg=cfg;
		var _tagel=_cfg.tagel;
		var _inner=_tagel.innerHTML;
		
		return new function(){
			this.toString=function(){
				return _buildLabel(_cfg,function(){
					return _inner;
				});
			};
			this.reset=function(){
			};
			this.check=function(){
			};
			this.bind=function(){
			};
			this.draw=function(el){
				if(el!=null) _tagel=el;
				_tagel.innerHTML=this.toString();
			};
			
		}
	}
	this.label=_label;
	
	
	// ����˾�淶ʵ��button���Կؼ�
	var _button=function(cfg){
		var _pl_button=null;
		var _cfg=cfg;
		var _tagel=_cfg.tagel;
		var _inner=_tagel.innerHTML;
		var _btn=null;
		var _form=cfg.formpanel;
		var _length_css=[,'one','two',,'four','five']
		
		var _btn_action={
			submit:function(){
				_btn.action='submit';
				_btn.attachEvent('onclick',function(){
					_form.submit();
				})
			},
			reset:function(){
				_btn.action='reset';
				_btn.attachEvent('onclick',function(){
					_form.reset()
				})
			},
			common:function(){
				_btn.attachEvent('onclick',Ext.lt.util.fnbind(function(){
					if(typeof(_pl_button.onclick)=='function') _pl_button.onclick.apply(_btn);
				},_btn));
				_btn.attachEvent('onclick',function(){
					_form.fireEvent('on'+_cfg.name+'click',null,_btn)
				})
			}
		}
		
		
		_pl_button=new function(){
			this.toString=function(){
				return '<button class="buttons '+_length_css[_cfg.label.length]+'">'+_cfg.label+'</button>';
			}
			
			this.draw=function(el){
				if(el!=null) _tagel=el;
				
				// ����ҳ��
				_btn=_tagel.getElementsByTagName('BUTTON').item(0);
				if(_btn==null){
					_tagel.innerHTML=this.toString();
					_btn=_tagel.getElementsByTagName('BUTTON').item(0);
				}
				
				// ����ͨ����Ϊ��Ϊ
				_btn_action['common']();
				if(_btn_action[_cfg.action]!=null){
					// �����ض���Ϊ
					_btn_action[_cfg.action]();
				}
			}
			
			this.hold=function(){
				if(_btn.action=='submit') _btn.disabled=true;
			}
			this.release=function(){
				if(_btn.action=='submit') _btn.disabled=false;
			}
			
			this.name=_cfg.name;
			
			this.reset=function(){};
			
			this.check=function(){};
			
			this.bind=function(){};
			
			this.resize=function(){};
		}
		return _pl_button;
		
	}
	this.button=_button;
	
	// �������ı���
	var _date=Ext.lt.createComponent(function(_cfg){
		var _name=_cfg.name;
		var _cmp={name:_name,resize:function(){},check:function(){}};
		var _input=null;
		var _btn=null;
		var clearbtn=null;
		var _format=_cfg.format==''?'$1-$2-$3':_cfg.format;
		var _datevalue="";
		var _form=_cfg.formpanel;
		var _dataset=null;
		var _tagel=null;
		
		_cmp.draw=function(el){
			_tagel=el;
			el.setInnerHTML(_buildLabel(_cfg,function(){
					var _html=['<input name="',_cfg.name,'" class="inputbox" type="text" readOnly maxLength=',_cfg.maxlength,'/>',_datebtn];
					if(_cfg.clearbtn) _html.push(Ext.lt.editpanel._clearbtn);
					return _html.join('');
				}))
			
			// ��ȡ�ɲ�������	
			_input=el.getElementsByTagName('INPUT').item(0);
			_btn=_input.nextSibling;
			if(_cfg.clearbtn) _clearbtn=_btn.nextSibling;
			
			// ��Ӷ�����Ϊ
			_input.onclick=function(){showCalendar(this, '%Y%m%d', null, true);}
			_btn.onclick=function(){showCalendar(this.previousSibling, '%Y%m%d', null, true);}
			if(_clearbtn!=null) _clearbtn.onclick=function(){_input.value='';_input.onchange();}
			_input.onchange=function(){
				_datevalue=this.value
				_input.fireEvent("onblur");
				
			};
			_input.onafterbind=function(){
				var v=_dataset[_input.name];
				if(v!=null && v!=_datevalue){
					this.value=_datevalue;
					_input.fireEvent("onblur");
					return;
				}
				this.value=_datevalue.replace(/(\d{4})(\d{2})(\d{2})/, _format);
				// �����������
				if(typeof(v)=='string' && v.length>8) _dataset[_input.name]=parseInt(_dataset[_input.name],10);
				// �����༭���޸��¼�
				if(_form!=null) _form.fireEvent('onaftervaluechange',{src:_input,value:_datevalue});	
			}
		};
		
		_cmp.reset=function(){
			_input.reset();
		};
		
		_cmp.bind=function(ds){
			_dataset=ds;
			if(ds[_input.name]!=null){
				var v=ds[_input.name];
				_datevalue=Ext.lt.dateutil.YYYYMMDD(v);
			}
			else{
				_datevalue="";
			}
			_input.bind(ds);
			_input.fireEvent("onblur");
		};
		
		_cmp.resize=function(w,h){
			if(w!=null) _tagel.style.width=w+'px'
			if(h!=null) _tagel.style.height=h+'px'
			this._layout();
		}
		_cmp._layout=function(){
			var width=_tagel.offsetWidth;
			if(_tagel.children.length>1) width-=_tagel.firstChild.offsetWidth
			if(_btn!=null ) width-=20
			if(clearbtn!=null ) width-=20
			if(width>80) width*=.9;
			if(width<80) width=80
			_input.style.width=width+'px';
		}
		
		return _cmp;
	});
	this.date=_date;
	
	
	
	// ���������ı���
	// ������������������ڿؼ���У��ʱ��һ��������ǰһ���ʱ��
	// ������������Ϊ start_�ؼ��� end_�ؼ���
	var _dateregion=Ext.lt.createComponent(function(_cfg){
		var _name=_cfg.name;
		var _format=_cfg.format==''?'$1-$2-$3':_cfg.format;
		var _datevalue_start="";
		var _datevalue_end="";
		var _form=_cfg.formpanel;
		var _dataset=null;
		var _cmp={name:_name,resize:function(){}};
		var _input_start,_input_end,_btn_start,_btn_end,_clearbtn_start,_clearbtn_end;
		var _tagel
		
		
		_cmp.draw=function(el){
			_tagel=el
			// ���������������
			el.setInnerHTML(_buildLabel(_cfg,function(){
					var _html=['<input name="start_',_cfg.name,'" class="shortdate" type="text" readOnly/>',_datebtn,_cfg.clearbtn?Ext.lt.editpanel._clearbtn:'','��<input name="end_',_cfg.name,'" class="shortdate" type="text" readOnly/>',_datebtn,_cfg.clearbtn?Ext.lt.editpanel._clearbtn:''];
					return _html.join('');
				}))
			
			// ��ȡ�ɲ�������	
			_input_start=el.getElementsByTagName('INPUT').item(0);
			_btn_start=_input_start.nextSibling;
			if(_cfg.clearbtn) _clearbtn_start=_btn_start.nextSibling;
			
			_input_end=el.getElementsByTagName('INPUT').item(1);
			_btn_end=_input_end.nextSibling;
			if(_cfg.clearbtn)_clearbtn_end=_btn_end.nextSibling;
			
			// ��Ӷ�����Ϊ
			_input_start.onclick=function(){showCalendar(this, '%Y%m%d', null, true);}
			_btn_start.onclick=function(){showCalendar(this.previousSibling, '%Y%m%d', null, true);}
			if(_cfg.clearbtn) _clearbtn_start.onclick=function(){_input_start.value='';_input_start.onchange()}
			_input_start.onchange=function(){
				_datevalue_start=this.value
				_input_start.fireEvent("onblur");
			};
			_input_start.onafterbind=function(){
				var v=_dataset[_input_start.name];
				if(v!=null && v!=_datevalue_start){
					this.value=_datevalue_start;
					_input_start.fireEvent("onblur");
					return;
				}
				this.value=_datevalue_start.replace(/(\d{4})(\d{2})(\d{2})/, _format);
				
				if(!_cmp.check()){
					return;
				}
				// �����������
				if(typeof(v)=='string' && v.length>8) _dataset[this.name]=parseInt(_dataset[this.name],10);
				// �����༭���޸��¼�
				if(_form!=null) _form.fireEvent('onaftervaluechange',{src:_input_start,value:_datevalue_start});	
			}
			
			
			// ��Ӷ�����Ϊ
			_input_end.onclick=function(){showCalendar(this, '%Y%m%d', null, true);}
			_btn_end.onclick=function(){showCalendar(this.previousSibling, '%Y%m%d', null, true);}
			if(_cfg.clearbtn) _clearbtn_end.onclick=function(){_input_end.value='';_input_end.onchange()}
			_input_end.onchange=function(){
				_datevalue_end=this.value
				_input_end.fireEvent("onblur");
				return;
			};
			_input_end.onafterbind=function(){
				var v=_dataset[_input_end.name];
				if(v!=null && v!=_datevalue_end){
					this.value=_datevalue_end;
					_input_end.fireEvent("onblur");
				}
				
				this.value=_datevalue_end.replace(/(\d{4})(\d{2})(\d{2})/, _format);
				if(!_cmp.check()){
					_btn_end.onclick();
					return;
				}
				
				// �����������
				var v=_dataset[this.name];
				if(typeof(v)=='string' && v.length>8) _dataset[this.name]=parseInt(_dataset[this.name],10);
				// �����༭���޸��¼�
				if(_form!=null) _form.fireEvent('onaftervaluechange',{src:_input_end,value:_datevalue_end});	
			}
			
		}
		
		_cmp.reset=function(){
			_input_start.reset();
			_input_end.reset();
						
		}
		
		_cmp.bind=function(ds){
			_dataset=ds;
			// ����ʼʱ��
			if(ds['start_'+_name]!=null){
				_datevalue_start=Ext.lt.dateutil.YYYYMMDD(ds['start_'+_name]);
			}
			else{
				_datevalue_start="";
			}
			_input_start.bind(ds);
			_input_start.fireEvent("onblur");


			// �������ʱ��
			if(ds['end_'+_name]!=null){
				_datevalue_end=Ext.lt.dateutil.YYYYMMDD(ds['end_'+_name]);
			}
			else{
				_datevalue_end="";
			}
			_input_end.bind(ds);
			_input_end.fireEvent("onblur");
		}
		
		_cmp.check=function(){
			if(_dataset['end_'+_name]==null ||_dataset['end_'+_name]==''){
				return true;
			}
			if(parseInt(_dataset['start_'+_name],10)>parseInt(_dataset['end_'+_name],10)){
				alert('�������ڱ�����ڿ�ʼ����');
				return false;
			}
			return true;
		}
		
		_cmp.resize=function(w,h){
			if(w!=null) _tagel.style.width=w+'px'
			if(h!=null) _tagel.style.height=h+'px'
			this._layout();
		}
		_cmp._layout=function(){
			var width=_tagel.offsetWidth;
			if(_tagel.children.length>1) width-=_tagel.firstChild.offsetWidth
			if(_btn_start!=null) width-=20;
			if(_btn_end!=null) width-=20;
			if(_clearbtn_start!=null) width-=20;
			if(_clearbtn_end!=null) width-=20;
			width-=16 // ɾ���������Ŀ��
			
			if(width>30) width*=.9;
			if(width<30) width=30
			_input_start.style.width=width/2+'px';
			_input_end.style.width=width/2+'px';
		}
		
		return _cmp;
	});
	this.dateregion=_dateregion;
	
	
	
	

}


