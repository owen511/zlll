// 检查命名空间
if(Ext.fasp.ui==null) Ext.fasp.ui={}

/*
查询区下拉框获取内部数据的方法
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
查询去标签，兼容一体化系统现有标签使用editpanel实现。服务端需要注册 ui.QueryFromService 服务。


初始化参数：
	formid：form标签ID，兼容原queryform标签的属性，没有实际用途
	linkname：配置页面名
	defaultvalues：查询区缺省查询条件
	columns：查询区列设置，参考ifmis_t_uiqueryform表字段设置
	queryformconfig：页面可选查询条件配置，该页面对应的数据来源表的表结构信息，用于产生查询区配置界面。该参数可以不传

方法：
	draw(formelement) 用于提交信息的form标签对象
	show() 显示查询区
	hide() 隐藏查询区
	redraw() 重新绘制查询区，当通过配置窗口改变时查询区设置时，查询区会自动重绘
	saveconfig() 保存查询区配置
	showconfig() 弹出查询区配置界面
	
	
发送消息——消息来源queryform：
	doquery：{'response':respText}  当服务端返回查询结果后，查询标签会校验页面使用的datatable组件版本，如果是uidatatable组件则向页面发送doquery消息，并将服务端返回值作为消息内容发送出去

接收消息：
	消息来源：hidshowQuerybtn
	show：显示查询区
	hidden：隐藏查询区

用法：
页面引用标签库
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>


需要引用：
<link rel="stylesheet" type="text/css" href="http://localhost:7001/fasp/ltext/datatable3.0.css" />
<link rel="stylesheet" type="text/css" href="http://localhost:7001/fasp/style/faspcmp.css" />
<script language="JavaScript" src="http://localhost:7001/fasp/ltext/frameworksupport.js" type="text/javascript"></script>
<script language="JavaScript" src="http://localhost:7001/fasp/ltext/ltext_core.js" type="text/javascript"></script>
<script language="JavaScript" src="http://localhost:7001/fasp/ltext/datatable3.0.js" type="text/javascript"></script>
<script language="JavaScript" src="http://localhost:7001/fasp/ltext/extends/fasp/ui.js" type="text/javascript"></script>
<script language="JavaScript" src="http://localhost:7001/fasp/ltext/extends/fasp/ui_queryform.js" type="text/javascript"></script>


标签方式使用：
<ui:uiqueryform formid="queryform" />


js方式使用：
var queryform=new Ext.fasp.ui.queryform({
"queryformconfig":new Ext.lt.recordset({ver:"1.2",columns:["COLUMNCODE","COLID","NAME","DATATYPE","SOURCEELEMENT","ORDERNUM","ISVISIBLE","TYPE","check"],datas:[["code","code","用户编码","S",,1,1,"t",1],["name","name","用户名称","S",,2,1,"t",1],["organid","organid","机构ID","N","AGENCY",3,1,"inputtips",1],["createdate","createdate","创建日期","D",,4,1,"di",1],["managerid",,"管理者ID","N",,,,,0],["onlinenum",,"在线数量","N",,,,,0],["organ",,"部门","S",,,,,0],["organtype",,"机构类型","N",,,,,0],["overduedate",,"过期日期","D",,,,,0],["password",,"密码","S",,,,,0],["remark",,"备注","S",,,,,0],["state",,"状态","N","STATUS",,,,0],["type",,"用户类型","N",,,,,0],["updatedate",,"更新日期","D",,,,,0],["userclsid",,"类别ID","N",,,,,0],["userid",,"用户ID","N",,,,,0]],seqdatamap:{},ml:[11,10,8,1,6,1,1,9,1]}),
"columns":new Ext.lt.recordset({ver:"1.2",columns:["LINKNAME","COLID","COLNAME","ORDERNUM","ISVISIBLE","TYPE","FUNCTION","DEFAULTVAL","ISREQUIRED","SHOWLEVELCONFIG","ELEMENTFILTER","INPUTRULE","FILTERFIELD","JSFUNCTION","BELONGTYPE","VOUCHTYPECODE"],datas:[["$0","code","用户编码",1,1,"input",,,,,,,,,,"$1"],["$0","name","用户名称",2,1,"input",,,,,,,,,,"$1"],["$0","organid","机构ID",3,1,"select",,,,,,,,,,"$1"],["$0","createdate","创建日期",4,1,"dateregion",,,,,,,,,,"$1"]],seqdatamap:{$0:"/fasp/ca/agencyuser/*",$1:"10000604"},ml:[21,10,8,1,1,10,0,0,0,0,0,0,0,0,0,8]}),
"defaultvalues":{"code":"asdfas"},
"linkname":"/fasp/ca/agencyuser/*",
"formid":"queryform"});
queryform.draw(document.getElementById('queryform'));



 */
Ext.fasp.ui.queryform=Ext.lt.createComponent(function(config){
	// 查询框对象
	var _formobj=typeof(config.formid)=='string'?document.getElementById(config.formid):config.formid;
	var _columns=config.columns.toArray();
	var _defaultvalues=config.defaultvalues;
	var _linkname=config.linkname;
	// 编辑区对象
	var _querypanel;
	var _queryeare;
	var _btn_config,_btn_savedefaultvalue;
	var _config_window=null;
	var _config_table=null;
	var _config_data=config.queryformconfig;
	    _config_data.each(function(rs){_config_data[rs['COLUMNCODE']]=rs})
	var _element=null;


		
	// 一体化系统查询区提交函数
	var dosubmit = function(page){
		var obj=_querypanel.getData(),m;
		var postobj=Ext.lt.clone(obj);
		// 处理日期查询条件
		for(var i=0,l=_columns.length;i<l;i++){
			m=_columns[i];
			if(m['TYPE']!='date' && m['TYPE']!='dateregion') continue;
			// 日期型字段将判断转换为日期型
			var colid=_columns[i].COLID;
			
		}
		
		try{addQueryFormInput();}catch(err){}; //注现场需求只要提示必填项不能为空,但要查询出数据.
		if(typeof clearValueofIsDataSouce == "function")clearValueofIsDataSouce();

		// 执行页面校验方法
		try{
			if(!queryCheckIdata()) return false;
		}catch(err){}
		
		if(page!=null){
			postobj.currpage=page.currpage;
			postobj.rows=page.rows;
			postobj.totalpages=page.totalpages;
			postobj.totalrows=page.totalrows;
		}
		// 获取分页设置
		postobj.allflag=document.getElementById("page")!=null?1:null;
		postobj.rows=document.getElementById("setpage_size")!=null?document.getElementById("setpage_size").value:null;
		postobj.fromquery='yes'
			var ajax=new Ajax.Request("?method=pageAction&t="+new Date(), {
				parameters:postobj,
				method:"post", 
				requestHeaders:{Accept:"application/json","If-Modified-Since":"0"},
				onComplete:function (resp) {
					// 这里判断是否使用新标签
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
					alert('调用失败');
				}
			});
	}

	// 返回可操作的控件对象
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
		html.push('<div style="height:20px; position:relative; float:right; vertical-align:top;"><button title="配置查询条件" class="uibtn uibtn_save" overclass="uibtn uibtn_save_over" clickclass="uibtn uibtn_save_click" align="absmiddle"></button><button title="保存为默认条件" align="absmiddle" class="uibtn uibtn_config" overclass="uibtn uibtn_config_over" clickclass="uibtn uibtn_config_click"></button></div>');
		// document.write(html.join(''));
		_element.innerHTML=html.join('')
		
		// 创建查询区
		_querypanel=Ext.lt.editpanel.initFormPanel(_element.firstChild);
	  _querypanel.className+=" queryform";
		_queryeare=_element;
		_btn_config=_queryeare.lastChild.firstChild;
		_btn_savedefaultvalue=_queryeare.lastChild.lastChild;
	  
	  // 绑定默认值
	  _querypanel.bind(_defaultvalues);
	  
	  // 监听显示、隐藏查询区消息
	  Ext.lt.message.hook('hidshowQuerybtn','show',_cmp.show);
	  Ext.lt.message.hook('hidshowQuerybtn','hidden',_cmp.hide);
	  Ext.lt.message.hook('clearbtn','click',_cmp.clear);
		
		// 监听查询按钮消息
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
	  // 监听显示、隐藏查询区消息
	  Ext.lt.message.unhook('hidshowQuerybtn','show',_cmp.show);
	  Ext.lt.message.unhook('hidshowQuerybtn','hidden',_cmp.hide);
	  Ext.lt.message.unhook('clearbtn','show',_cmp.clear);
		
		// 监听查询按钮消息
	  Ext.lt.message.unhook('querybtn','click',dosubmit);
		_cmp.init();
	}
	
	_cmp.resize=function(){
		
	}
	
	_cmp.saveconfig=function(){
		var d=_querypanel.getData();
		var r=Ext.lt.RCP.asynserver('ui.QueryFromService','saveconfig',[_linkname,d]);
		if(r=='1'){
			alert('保存成功');
		}
		else{
			alert('保存失败\r\n'+r);
		}
		
	}
		
	_cmp.showconfig=function(){
		// 构造配置窗口
		var r=Ext.lt.RCP.asynserver('ui.QueryFromService','getQueryFormConfig',[_linkname]);
		if(r==null) return;
		if(_config_window==null) initConfigWindow();
		if(_config_window==null){
			alert('没有找到'+_linkname+'配置信息');
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

	// 创建配置窗口
	function initConfigWindow(){
		
		var div=document.createElement('DIV');
		div.style.cssText='width:700px;height:450px;overflow:hidden';
		document.body.appendChild(div);
		div.innerHTML='<div style="width:700px;height:415px;overflow:hidden"></div><div style="width:700px;height:30px;overflow:hidden;margin-top:5px"><center><button>保存</button>&nbsp;&nbsp;<button>取消</button></center></div>';
		_config_window=new Ext.lt.window({title:'查询条件配置',pop:true,autoshow:false,fitmode:'content'});

		_config_table=new Ext.lt.datatable(_config_data);
		_config_table.setCols([
		_config_table.columns.seq,
		_config_table.columns.checkbox,		
		{name:'NAME',alias:'列名',datatype:'S',edit:true},
		{name:'DATATYPE',alias:'数据类型',mapper:{columns:['id','name'],datas:[['N','数字'],['D','日期'],['S','文本']]},format:'#id-#name'},
		{name:'ORDERNUM',alias:'排序',datatype:'I',edit:true},
		{name:'TYPE',alias:'类型',mapper:{columns:['id','name'],datas:[['t','文本框'],['inputtips','可录入下拉框'],['d','日期'],['di','日期区间']]},format:'#name',edit:true},
		{name:'ISVISIBLE',alias:'是否可见',mapper:{columns:['id','name'],datas:[[0,'隐藏'],[1,'可见']]},format:'#name',edit:true}
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
				alert('保存成功');
			}
			else{
				alert('保存查询配置信息时出错：/r/n'+r);	
			}
			
		}
	}
	
	return _cmp;
});
