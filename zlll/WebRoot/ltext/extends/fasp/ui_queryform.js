// ��������ռ�
if(Ext.fasp.ui==null) Ext.fasp.ui={}

/*
��ѯ���������ȡ�ڲ����ݵķ���
 */
Ext.fasp.ui._cache={};
Ext.fasp.ui.elementcodeloader=function(linkname,colid){
	var r=Ext.fasp.ui._cache[linkname+colid];
	if(r == null){
		r=Ext.lt.RCP.asynserver('ui.QueryFromService','getColumnSrcElementcode',[linkname,colid]);
		Ext.fasp.ui._cache[linkname+colid]=r;
	}
	return r;
}


/**
��ѯȥ��ǩ������һ�廯ϵͳ���б�ǩʹ��editpanelʵ�֡��������Ҫע�� ui.QueryFromService ����


��ʼ��������
	formid��form��ǩID������ԭqueryform��ǩ�����ԣ�û��ʵ����;
	linkname������ҳ����
	defaultvalues����ѯ��ȱʡ��ѯ����
	columns����ѯ�������ã��ο�ifmis_t_uiqueryform���ֶ�����
	queryformconfig��ҳ���ѡ��ѯ�������ã���ҳ���Ӧ��������Դ��ı�ṹ��Ϣ�����ڲ�����ѯ�����ý��档�ò������Բ���

������
	draw(formelement) �����ύ��Ϣ��form��ǩ����
	show() ��ʾ��ѯ��
	hide() ���ز�ѯ��
	redraw() ���»��Ʋ�ѯ������ͨ�����ô��ڸı�ʱ��ѯ������ʱ����ѯ�����Զ��ػ�
	saveconfig() �����ѯ������
	showconfig() ������ѯ�����ý���
	
	
������Ϣ������Ϣ��Դqueryform��
	doquery��{'response':respText}  ������˷��ز�ѯ����󣬲�ѯ��ǩ��У��ҳ��ʹ�õ�datatable����汾�������uidatatable�������ҳ�淢��doquery��Ϣ����������˷���ֵ��Ϊ��Ϣ���ݷ��ͳ�ȥ

������Ϣ��
	��Ϣ��Դ��hidshowQuerybtn
	show����ʾ��ѯ��
	hidden�����ز�ѯ��

�÷���
ҳ�����ñ�ǩ��
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>


��Ҫ���ã�
<link rel="stylesheet" type="text/css" href="http://localhost:7001/fasp/ltext/datatable3.0.css" />
<link rel="stylesheet" type="text/css" href="http://localhost:7001/fasp/style/faspcmp.css" />
<script language="JavaScript" src="http://localhost:7001/fasp/ltext/frameworksupport.js" type="text/javascript"></script>
<script language="JavaScript" src="http://localhost:7001/fasp/ltext/ltext_core.js" type="text/javascript"></script>
<script language="JavaScript" src="http://localhost:7001/fasp/ltext/datatable3.0.js" type="text/javascript"></script>
<script language="JavaScript" src="http://localhost:7001/fasp/ltext/extends/fasp/ui.js" type="text/javascript"></script>
<script language="JavaScript" src="http://localhost:7001/fasp/ltext/extends/fasp/ui_queryform.js" type="text/javascript"></script>


��ǩ��ʽʹ�ã�
<ui:uiqueryform formid="queryform" />


js��ʽʹ�ã�
var queryform=new Ext.fasp.ui.queryform({
"queryformconfig":new Ext.lt.recordset({ver:"1.2",columns:["COLUMNCODE","COLID","NAME","DATATYPE","SOURCEELEMENT","ORDERNUM","ISVISIBLE","TYPE","check"],datas:[["code","code","�û�����","S",,1,1,"t",1],["name","name","�û�����","S",,2,1,"t",1],["organid","organid","����ID","N","AGENCY",3,1,"inputtips",1],["createdate","createdate","��������","D",,4,1,"di",1],["managerid",,"������ID","N",,,,,0],["onlinenum",,"��������","N",,,,,0],["organ",,"����","S",,,,,0],["organtype",,"��������","N",,,,,0],["overduedate",,"��������","D",,,,,0],["password",,"����","S",,,,,0],["remark",,"��ע","S",,,,,0],["state",,"״̬","N","STATUS",,,,0],["type",,"�û�����","N",,,,,0],["updatedate",,"��������","D",,,,,0],["userclsid",,"���ID","N",,,,,0],["userid",,"�û�ID","N",,,,,0]],seqdatamap:{},ml:[11,10,8,1,6,1,1,9,1]}),
"columns":new Ext.lt.recordset({ver:"1.2",columns:["LINKNAME","COLID","COLNAME","ORDERNUM","ISVISIBLE","TYPE","FUNCTION","DEFAULTVAL","ISREQUIRED","SHOWLEVELCONFIG","ELEMENTFILTER","INPUTRULE","FILTERFIELD","JSFUNCTION","BELONGTYPE","VOUCHTYPECODE"],datas:[["$0","code","�û�����",1,1,"input",,,,,,,,,,"$1"],["$0","name","�û�����",2,1,"input",,,,,,,,,,"$1"],["$0","organid","����ID",3,1,"select",,,,,,,,,,"$1"],["$0","createdate","��������",4,1,"dateregion",,,,,,,,,,"$1"]],seqdatamap:{$0:"/fasp/ca/agencyuser/*",$1:"10000604"},ml:[21,10,8,1,1,10,0,0,0,0,0,0,0,0,0,8]}),
"defaultvalues":{"code":"asdfas"},
"linkname":"/fasp/ca/agencyuser/*",
"formid":"queryform"});
queryform.draw(document.getElementById('queryform'));



 */
Ext.fasp.ui.queryform=Ext.lt.createComponent(function(config){
	// ��ѯ�����
	var _formobj=typeof(config.formid)=='string'?document.getElementById(config.formid):config.formid;
	var _columns=config.columns.toArray();
	var _defaultvalues=config.defaultvalues;
	var _linkname=config.linkname;
	// �༭������
	var _querypanel;
	var _queryeare;
	var _btn_config,_btn_savedefaultvalue;
	var _config_window=null;
	var _config_table=null;
	var _config_data=config.queryformconfig;
	    _config_data.each(function(rs){_config_data[rs['COLUMNCODE']]=rs})
	var _element=null;


		
	// һ�廯ϵͳ��ѯ���ύ����
	var dosubmit = function(page){
		var obj=_querypanel.getData(),m;
		var postobj=Ext.lt.clone(obj);
		// �������ڲ�ѯ����
		for(var i=0,l=_columns.length;i<l;i++){
			m=_columns[i];
			if(m['TYPE']!='date' && m['TYPE']!='dateregion') continue;
			// �������ֶν��ж�ת��Ϊ������
			var colid=_columns[i].COLID;
			
		}
		
		try{addQueryFormInput();}catch(err){}; //ע�ֳ�����ֻҪ��ʾ�������Ϊ��,��Ҫ��ѯ������.
		if(typeof clearValueofIsDataSouce == "function")clearValueofIsDataSouce();

		// ִ��ҳ��У�鷽��
		try{
			if(!queryCheckIdata()) return false;
		}catch(err){}
		
		if(page!=null){
			postobj.currpage=page.currpage;
			postobj.rows=page.rows;
			postobj.totalpages=page.totalpages;
			postobj.totalrows=page.totalrows;
		}
		// ��ȡ��ҳ����
		postobj.allflag=document.getElementById("page")!=null?1:null;
		postobj.rows=document.getElementById("setpage_size")!=null?document.getElementById("setpage_size").value:null;
		postobj.fromquery='yes'
			var ajax=new Ajax.Request("?method=pageAction&t="+new Date(), {
				parameters:postobj,
				method:"post", 
				requestHeaders:{Accept:"application/json","If-Modified-Since":"0"},
				onComplete:function (resp) {
					// �����ж��Ƿ�ʹ���±�ǩ
					var tablever=null;
					var respText = resp.responseText;
					try{eval('tablever=tmain.version')}catch(e){}
					if(tablever==null){
						eval(respText);
						if(tdetail){
							tdetail.data = null;
							tdetail.show();
						}
					}
					else{
						Ext.lt.message.send('queryform','doquery',{'response':respText});
					}
				},
				onFailure:function (resp) {
					alert('����ʧ��');
				}
			});
	}

	// ���ؿɲ����Ŀؼ�����
	var _cmp={}
	
	_buildElement=function(){
		var queryformdivid="queryformdiv"+Ext.lt.getNextSeqValue();
		document.write('<div style="display:none" id='+queryformdivid+'></div>');
		_element=document.getElementById(queryformdivid);
	}
	
	_cmp.draw=function(element){
		_buildElement();
		_cmp.init();
		_cmp.hide();
	}
	
	_cmp.init=function(){
		var queryformid="queryform"+Ext.lt.getNextSeqValue();
		var html=['<ul id=',queryformid,'>'],m,loader='',clearbtn='';
		for(var i=0,l=_columns.length;i<l;i++){
			m=_columns[i];
			if(m['TYPE']=='select'){
				loader='dataloader="Ext.fasp.ui.elementcodeloader(\''+_linkname+'\',\''+m['COLID']+'\')"';
			}
			else{
				loader='';
			}
			m['TYPE']=='input'?clearbtn='':clearbtn='clearbtn="true"';
			html.push('<li name="',m['COLID'],'" label="',m['COLNAME'],'" type="',m['TYPE'],'" isvisible="',m['ISVISIBLE'],'" ',clearbtn,' ',loader,'></li>');
		}
		html.push('</ul>');
		html.push('<div style="height:20px; position:relative; float:right; vertical-align:top;"><button title="���ò�ѯ����" class="uibtn uibtn_save" overclass="uibtn uibtn_save_over" clickclass="uibtn uibtn_save_click" align="absmiddle"></button><button title="����ΪĬ������" align="absmiddle" class="uibtn uibtn_config" overclass="uibtn uibtn_config_over" clickclass="uibtn uibtn_config_click"></button></div>');
		// document.write(html.join(''));
		_element.innerHTML=html.join('')
		
		// ������ѯ��
		_querypanel=Ext.lt.editpanel.initFormPanel(_element.firstChild);
	  _querypanel.className+=" queryform";
		_queryeare=_element;
		_btn_config=_queryeare.lastChild.firstChild;
		_btn_savedefaultvalue=_queryeare.lastChild.lastChild;
	  
	  // ��Ĭ��ֵ
	  _querypanel.bind(_defaultvalues);
	  
	  // ������ʾ�����ز�ѯ����Ϣ
	  Ext.lt.message.hook('hidshowQuerybtn','show',_cmp.show);
	  Ext.lt.message.hook('hidshowQuerybtn','hidden',_cmp.hide);
	  Ext.lt.message.hook('clearbtn','click',_cmp.clear);
		
		// ������ѯ��ť��Ϣ
	  Ext.lt.message.hook('querybtn','submit',dosubmit);
	  
	  //
	  _btn_savedefaultvalue.onclick=function(){_cmp.saveconfig()};
	  _btn_config.onclick=function(){_cmp.showconfig()};	
	}
	
	_cmp.show=function(){
		_queryeare.style.display='block';
		_formobj.style.display='block';
	}
	_cmp.hide=function(){
		_queryeare.style.display='none'
		_formobj.style.display='none';
	}
	_cmp.redraw=function(){
	  // ������ʾ�����ز�ѯ����Ϣ
	  Ext.lt.message.unhook('hidshowQuerybtn','show',_cmp.show);
	  Ext.lt.message.unhook('hidshowQuerybtn','hidden',_cmp.hide);
	  Ext.lt.message.unhook('clearbtn','show',_cmp.clear);
		
		// ������ѯ��ť��Ϣ
	  Ext.lt.message.unhook('querybtn','click',dosubmit);
		_cmp.init();
	}
	
	_cmp.resize=function(){
		
	}
	
	_cmp.saveconfig=function(){
		var d=_querypanel.getData();
		var r=Ext.lt.RCP.asynserver('ui.QueryFromService','saveconfig',[_linkname,d]);
		if(r=='1'){
			alert('����ɹ�');
		}
		else{
			alert('����ʧ��\r\n'+r);
		}
		
	}
		
	_cmp.showconfig=function(){
		// �������ô���
		var r=Ext.lt.RCP.asynserver('ui.QueryFromService','getQueryFormConfig',[_linkname]);
		if(r==null) return;
		if(_config_window==null) initConfigWindow();
		if(_config_window==null){
			alert('û���ҵ�'+_linkname+'������Ϣ');
			return;
		}
		_config_window.show();
		
		if(_config_data==null){
			_config_data=r;
		}
		else{
			_config_data.clear();
			_config_data.join(r);
		}		
		
		
	}
	
	_cmp.clear=function(){
		var els=_querypanel.getElementsByTagName('INPUT');
		for(var i=0,l=els.length;i<l;i++){
			els[i].value='';
			if(els[i].onchange) els[i].onchange();
			els[i].fireEvent('onblur');
		}
		
		
	}

	// �������ô���
	function initConfigWindow(){
		
		var div=document.createElement('DIV');
		div.style.cssText='width:700px;height:450px;overflow:hidden';
		document.body.appendChild(div);
		div.innerHTML='<div style="width:700px;height:415px;overflow:hidden"></div><div style="width:700px;height:30px;overflow:hidden;margin-top:5px"><center><button>����</button>&nbsp;&nbsp;<button>ȡ��</button></center></div>';
		_config_window=new Ext.lt.window({title:'��ѯ��������',pop:true,autoshow:false,fitmode:'content'});

		_config_table=new Ext.lt.datatable(_config_data);
		_config_table.setCols([
		_config_table.columns.seq,
		_config_table.columns.checkbox,		
		{name:'NAME',alias:'����',datatype:'S',edit:true},
		{name:'DATATYPE',alias:'��������',mapper:{columns:['id','name'],datas:[['N','����'],['D','����'],['S','�ı�']]},format:'#id-#name'},
		{name:'ORDERNUM',alias:'����',datatype:'I',edit:true},
		{name:'TYPE',alias:'����',mapper:{columns:['id','name'],datas:[['t','�ı���'],['inputtips','��¼��������'],['d','����'],['di','��������']]},format:'#name',edit:true},
		{name:'ISVISIBLE',alias:'�Ƿ�ɼ�',mapper:{columns:['id','name'],datas:[[0,'����'],[1,'�ɼ�']]},format:'#name',edit:true}
		]);
		_config_table.setClassName('dttheme_fasp');
		_config_table.setAllowClock(false);
		_config_table.mousedrag(false);
		_config_table.setMouselight('#acbeda');
		_config_table.draw(div.firstChild);
		_config_window.draw(div);
		
		var _save_btn=div.lastChild.firstChild.firstChild;
		var _canel_btn=div.lastChild.lastChild.lastChild;
		_canel_btn.onclick=function(){_config_window.close();}
		
		_save_btn.onclick=function(){
			var config=_config_data.query({check:1});
			
			var r=Ext.lt.RCP.asynserver('ui.QueryFromService','saveQuerFormConfig',[_linkname,config]);
			if(r=='1'){
				_config_window.close();
				Ext.lt.RCP.server('ui.QueryFromService','getConfig',_linkname,function(config){
					_columns=config;
					_cmp.redraw();
				});
				alert('����ɹ�');
			}
			else{
				alert('�����ѯ������Ϣʱ����/r/n'+r);	
			}
			
		}
	}
	
	return _cmp;
});
