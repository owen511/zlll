//��������ռ�
if(Ext.lt.overview==null){
    Ext.lt.overview={component:{}}
};
var yulanwin=null;
var fl={};
var _itemid=null;
Ext.lt.overview.modepage=function(config,service){
	var rs=Ext.lt.RCP.asyncall(service,'loadRepotrConfig',{});
	var dt=new Ext.lt.datatable(rs);
	var query={name:'',name:'',username:'',sourcetablename:''};
	var col=[dt.columns.seq,dt.columns.checkbox];
	col.push({alias:'ģ�����',datatype:'S',name:'code'});
	col.push({alias:'ģ������',datatype:'S',name:'name'});
	col.push({alias:'ģ������',style:'text-align:center',datatype:'S',name:'usercode',fn:function(i,j,rs,v){ if(config.usercode==v){return "����ģ��"}else{return "����ģ��"}}});
	col.push({alias:'�༭',style:'text-align:center',datatype:'S',name:'usercode',fn:function(i,j,rs,v){ if(config.usercode==v){return "<a href='./reportcolconfig.page?code="+rs.code+"&isMenu=yes&mainmenu="+config.mainmenu+"&submenu=26900956&itemid="+rs.itemid+"'>�༭</a>"}else{return ""}}});
	col.push({alias:'ɾ��',style:'text-align:center',datatype:'S',name:'usercode',fn:function(i,j,rs,v){ if(config.usercode==v){return "<a href=\"javascript:Ext.lt.message.send('modepage','del','"+rs.itemid+"')\">ɾ��</a>"}else{return ""}}});
	col.push({alias:'����',style:'text-align:center',datatype:'S',name:'usercode',fn:function(i,j,rs,v){ if(config.usercode!=v){return "<a href='./reportcolconfig.page?copy=1&code="+rs.code+"&isMenu=yes&mainmenu="+config.mainmenu+"&submenu=26900956'>����</a>"}else return ''}});
	col.push({alias:'Ԥ��',style:'text-align:center',datatype:'S',name:'code',fn:function(i,j,rs,v){ return "<a href='./report.page?code="+v+"&isMenu=yes&mainmenu="+config.mainmenu+"&submenu=26900956'>Ԥ��</a>"}});
	col.push({alias:'�Ƿ���',style:'text-align:center',datatype:'S',name:'sharing',fn:function(i,j,rs,v){ if(v==1){ return "��" }else{ return '��'}}});
	col.push({alias:'״̬',style:'text-align:center',datatype:'S',name:'state',fn:function(i,j,rs,v){ if(v==1){ return "����" }else{ return '����'}}});
	col.push({alias:'͸��ͼ��������',style:'text-align:center',datatype:'S',name:'code',fn:function(i,j,rs,v){return "<a  href=\"javascript:Ext.lt.message.send('modepage','down','"+v+"')\">����</a>"}});
	col.push({alias:'������',datatype:'S',name:'username'});
	col.push({alias:'����ʱ��',datatype:'S',name:'createtime',style:'text-align:center'});
	col.push({alias:'����Դ',datatype:'S',name:'sourcetablename',style:'text-align:center'});
	col.push({alias:'ģ���ϴ�',style:'text-align:center',datatype:'S',name:'uploading',fn:function(i,j,rs,v){return "<a  href=\"javascript:Ext.lt.message.send('modelupload','upload','"+rs.itemid+"')\">�ϴ�</a>"}});
	col.push({alias:'ģ���ϴ���',style:'text-align:center',datatype:'S',name:'modelman'});
	var overview=null;
	Ext.lt.message.hook('modelupload','upload',function(itemid){
		_itemid=itemid;
		var isHave=Ext.lt.RCP.asyncall(service,'isHaveReport',itemid);
		if (isHave==null) {
			alert("��������!");
			return;
		}
		var msg=Ext.lt.RCP.asyncall(service,'isReload',itemid);
		if (msg!=null) {
			var a=window.confirm("���û����ϴ�ģ�壬�Ƿ������ϴ�?");
			if(!a){
				return;
			}
		}
		doShowFileupload();
		var div=document.getElementById("overview");
		var linkname=window.location.pathname;
		linkname=linkname.substr(0,linkname.indexOf('/reportconfig.page'));
		var _cofg={file_queue_limit:1,file_types:'*.xlsm',upload_button_image:false,param:'modelcode='+itemid/*+'&paramjson='+1*/,linkname:linkname};
		fl=new Ext.lt.console.component.fileupload(null,_cofg);
		fl.draw(div);
		function doShowFileupload(){	
			if(overview==null){
				var dicv=document.createElement('div')
				dicv.innerHTML="<div id='overview'></div><center><button id='btn' onclick=\"Ext.lt.message.send(\'fileuploads\',\'upload\')\">�ϴ�</button>&nbsp;&nbsp;<button onclick=\"Ext.lt.message.send(\'fileuploads\',\'clear\')\">ȡ��</button></center>";
				dicv.style.height=60;
				dicv.style.width=260;
				overview=new Ext.lt.window({title:"�ļ��ϴ�", w:300, h:100,close:true,pop:true,mark:true});
				overview.draw(dicv);
			}
			overview.show();
		}});
	Ext.lt.message.hook("fileupload","queue_complete_submit",function(p){
		fl.clear();
	});
	Ext.lt.message.hook("fileupload","file_dialog_start_handler",function(p){
		Ext.lt.message.send("fileupload","clear");
		p.cancelQueue();
		p.cancelUpload();
	});
	Ext.lt.message.hook("fileupload","clear",function(obj){
		document.getElementById('filenamelist').value='';
	});
	Ext.lt.message.hook("fileupload","fileQueued",function(p){
		document.getElementById('filenamelist').value=p.fileProgressElement.children[1].innerText;
	});
	Ext.lt.message.hook("fileuploads","upload",function(){
		document.getElementById("btn").disabled=true;
		if (fl.swfUpload.getStats().files_queued > 0) {
			fl.swfUpload.startUpload();
		} else {
			alert('��ѡ���ļ�');
			document.getElementById("btn").disabled=false;
		}
	});
	Ext.lt.message.hook("fileuploads","clear",function(){
		overview.hidden();
	});
	Ext.lt.message.hook("fileupload","queue_complete_submit",function(p){
		document.getElementById('filenamelist').value='';
		alert('�ϴ��ɹ�');
		document.getElementById("btn").disabled=false;
		overview.hidden();
		//rs.query({itemid:_itemid})[0].modelman=rs.query({usercode:config.usercode})[0].username;
		rs.query({itemid:_itemid})[0].modelman=Ext.lt.RCP.asyncall(service,'isReload',_itemid);
		dt.reflash();
	});
	function _buildButton(div){
		
		function buttonclick(b,m,t){
			var l=rs.query({check:1,usercode:config.usercode});
			if(l.length!=rs.query({check:1}).length){
				alert("��ѡ�񴴽������Լ���ģ��");
				return ;
			}
			if(l.length<1){
				alert("��ѡ��һ������");
				return ;
			}
			var codes=[];
			for(var j=0;j<l.length;j++){
				codes.push(l[j].code);
			}
			codes=codes.join("','");
			var _b=Ext.lt.RCP.asyncall(service,m,["'"+codes+"'",t]);
			if(_b){
				alert(b.innerText+'�ɹ�')
				loadRepotrConfig();
			}else{
				alert(b.innerText+'ʧ��')
			}
		}
		 var functions={id:'toolbar',buttons:[
			{name:'add',title:'����',icon:'add',action:function(){window.location='./reportcolconfig.page?isMenu=yes&mainmenu='+config.mainmenu+'&submenu=26900956';},disabled:false},'',
			{name:'gxmb',title:'����ģ��',icon:'audit',action:function(){buttonclick(this,'updateShare',1);},disabled:false},
			{name:'qxgx',title:'ȡ������',icon:'audit',action:function(){buttonclick(this,'updateShare',0);},disabled:false},'',
			{name:'qd',title:'����',icon:'enabled',action:function(){buttonclick(this,'updateState',1);},disabled:false},
			{name:'jy',title:'����',icon:'disable',action:function(){buttonclick(this,'updateState',0);},disabled:false},'',
			{name:'query',title:'��ѯ',icon:'query',action:function(){
				loadRepotrConfig();
			},disabled:false}
		]}
		
		var toolbar=new Ext.lt.toolbar(functions);
		div.innerHTML="<div layout='{w:{fit:true}}'></div><div layout='{w:{fit:true}}'></div>"
		toolbar.draw(div.firstChild);
		
		//div.appendChild(document.createElement("BR"));
		//var q=document.createElement('div')
		//ģ����룺<input name="code"/>&nbsp;ģ�����ƣ�<input name="name" />&nbsp;�����ˣ�<input name="username" />&nbsp;����Դ��<input name="sourcetablename" />
		var _chtml=['<ul columnsize=4>'];
		_chtml.push('<li width="23%" labelwidth="60" type="input" name = "code" label="ģ�����" value=""/>');
		_chtml.push('<li width="23%" labelwidth="60" type="input" name = "name" label="ģ������" value=""/>');
		_chtml.push('<li width="23%" labelwidth="60" type="input" name = "username" label="������" value=""/>');
		_chtml.push('<li width="23%" labelwidth="60" type="input" name = "sourcetablename" label="����Դ" value=""/>');
		_chtml.push('</ul>');
		div.lastChild.innerHTML=_chtml.join('');
		var _form = Ext.lt.editpanel.initFormPanel(div.lastChild.firstChild);
		_form.bind(query);
	}
	function _buildDatatable(div){
		dt.setCols(col);
		/*********������ʽ*************/
		
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
	}
	_modereport.resize=function(w,h){
		var div=this.el.childNodes[1];
		dt.resize(div.clientWidth,div.clientHeight-10);
	}
	Ext.lt.message.hook("modepage","del",function(itemid){
	if(!window.confirm("�Ƿ�ȷ��ɾ����ģ�棿ȷ��ɾ�����Զ���͸�ӱ�һ��ɾ����")){return}
		var resp=Ext.lt.RCP.asyncall(service,'removeRepotrConfig',itemid);
		if(resp){
			alert("ɾ���ɹ�")
			loadRepotrConfig();
		}
		else{
			alert("ɾ��ʧ��")
		}
	});
	Ext.lt.message.hook("modepage","down",function(code){
		Ext.lt.RCPConsole.processdown("overview_reportdown","down",code);
	});
	function loadRepotrConfig(){
		rs=Ext.lt.RCP.asyncall(service,'loadRepotrConfig',query);
		dt.setRecordset(rs);
		dt.reflash();
	}
	return _modereport;
}