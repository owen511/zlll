//检查命名空间
if(Ext.lt.overview==null){
    Ext.lt.overview={component:{}}
};
var yulanwin=null;
Ext.lt.overview.reportmessage=function(config,service){
	var rs=new Ext.lt.recordset();
	var dt=new Ext.lt.datatable(rs);
	var col=[dt.columns.seq];
	var query={}
	col.push({alias:'模版编码',datatype:'S',name:'code'});
	col.push({alias:'模版名称',datatype:'S',name:'name'});
	if(config.type=='all'){
		col.push({alias:'创建人',datatype:'S',name:'username'});
	}
	col.push({alias:'创建时间',datatype:'S',name:'createtime',style:'text-align:center'});
	col.push({alias:'数据源',datatype:'S',name:'sourcetablename',style:'text-align:center'});
	col.push({alias:'浏览',style:'text-align:center',datatype:'S',name:'code',fn:function(i,j,rs,v){ return "<a href='./report.page?code="+v+"&mainmenu="+config.mainmenu+"&submenu="+config.submenu+"'>浏览</a>"}});
	col.push({alias:'透视图数据下载',style:'text-align:center',datatype:'S',name:'code',fn:function(i,j,rs,v){return "<a  href=\"javascript:Ext.lt.message.send('modepage','down','"+v+"')\">下载</a>"}});
	function _buildButton(div){
		 var functions={id:'toolbar',buttons:[
			{name:'query',title:'查询',icon:'query',action:function(){
				Ext.lt.message.send('reportmessage','query');
			},disabled:false}
		]}
		
		var toolbar=new Ext.lt.toolbar(functions);
		div.innerHTML="<div layout='{w:{fit:true}}'></div><div layout='{w:{fit:true}}'></div>"
		toolbar.draw(div.firstChild);
	
	
		var _chtml=['<ul columnsize=4>'];
		_chtml.push('<li  labelwidth="60" type="input" name = "code" label="模版编码" value=""/>');
		_chtml.push('<li labelwidth="60" type="input" name = "name" label="模版名称" value=""/>');
		_chtml.push('<li labelwidth="60" type="input" name = "sourcetablename" label="数据源" value=""/>');
		if(config.type=='all'){
			_chtml.push('<li labelwidth="60" type="input" name = "username" label="创建人" value=""/>');
		}
	//	_chtml.push('<li width="20%" labelwidth="60" type="button" onclick="Ext.lt.message.send(\'reportmessage\',\'query\')" label="查询" />');
		
		_chtml.push('</ul>');
		
		div.lastChild.innerHTML=_chtml.join('');
		var _form = Ext.lt.editpanel.initFormPanel(div.lastChild.lastChild);
		_form.bind(query);
		Ext.lt.message.hook("reportmessage","query",function(){
			loadRepotrConfig();
		});
	}
	function _buildDatatable(div){
		dt.setCols(col);
		/*********设置样式*************/
		
		dt.headsort(false);
		dt.setAllowClock(false);
		dt.setClassName('dttheme_ifmis');
		dt.setMouselight('#CFF6FF');
		dt.mousedrag(false);
		dt.draw(div);
	}
	function _draw(div){
		var html=['<div class="overview_modeconfig_top" layout="{h:{fit:60},w:{fit:true}}"></div>'];
		html.push('<div layout="{h:{fit:\'auto\'},w:{fit:true}}" ></div>');
		div.innerHTML=html.join('');
		_buildDatatable(div.lastChild)
		_buildButton(div.firstChild)
	}
	var _modereport={};
	_modereport.draw=function(div){
		_draw(div);
		_modereport.el=div;
		loadRepotrConfig();
	}
	_modereport.resize=function(w,h){
		var div=this.el.childNodes[1];
		dt.resize(div.clientWidth,div.clientHeight-10);
	}
	
	Ext.lt.message.hook("modepage","down",function(code){
			Ext.lt.RCPConsole.processdown("overview_reportdown","down",code);
	});
	
	function loadRepotrConfig(){
		var reg = new RegExp("[a-zA-Z0-9$]");
		var regn = new RegExp("^[_~!@#$%^&*()_=+-]");
		var flag=1;
		for(var e in query){
			if(query[e]==null){
				query[e]='';
			}
			if(e=='code' && query[e]!=""){
				if(!reg.test(query[e])){
					alert("只允许输入数字,字母,美元符！");
					flag=0;
				}
			}
			if(e!='code'&& query[e]!=""){
					if(regn.test(query[e])){
					alert("不允许输入特殊字符！");
					flag=0;
				}
			}
			if(flag==0)return;
		}
		Ext.lt.RCP.call(service,'loadRepotrMenu',[query,config.type],function(rs){
			dt.setRecordset(rs);
			dt.reflash();
		});
	}
	
	return _modereport;
}