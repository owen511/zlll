//检查命名空间
if(Ext.lt.overview==null){
    Ext.lt.overview={component:{}}
};

var yulanwin=null;

var winadd = new Ext.lt.window({title:'新增',pop:true,w:'310',fitmode:'content',className:'wnd',mark:true,autoshow:false,onclose:function(){Ext.lt.message.send('close','close');}});
				
			
	var addform = {code:'',name:'',tabname:''};
Ext.lt.overview.datasourse=function(config,service){
	//var rs=new Ext.lt.recordset();
	var query={code:'',name:''};
	//rs.addData({A:"CQ_ZZB",B:"总指标",C:'v_overview_zzb2'});
	
	var _bak=null;
	var dt=new Ext.lt.editdatatable(config.rs);
	var col=[dt.columns.seq,dt.columns.checkbox];
	col.push({alias:'编码',datatype:'S',name:'code'});
	col.push({alias:'名称',datatype:'S',name:'name',
	oneditstart:function(table,el,l,c,d){
		_bak = d.name;
	},
	oneditend:function(table,el,l,c,d){
		var k=0;
		for(var i = 0;i<dt.getRecordset().size();i++){
			
			if(dt.getRecordset().getData(i).name==d.name){
				k = k+1;
			}
			if(k>1){
				alert("名称已经存在！"); 
				d.name=_bak;
				table.reflash();
				break;
			}
		}
		if(_bak!=d.name){
			d.isupdate=1;
		}
	}
	,edit:true});
	col.push({alias:'表(视图)名',datatype:'S',name:'tabname'});
	col.push({alias:'状态',style:'text-align:center',datatype:'S',name:'state',fn:function(i,j,rs,v){ if(v==1){ return "启用" }else{ return '禁用'}}});
	col.push({alias:'列配置',style:'text-align:center',datatype:'S',name:'col_config',fn:function(i,j,rs,v){ return "<a href='./dtsoursecol.page?code="+rs.code+"&isMenu=yes&mainmenu="+config.mainmenu+"&submenu=26900959'>列配置</a>"}});
	col.push({alias:'查询条件配置',style:'text-align:center',datatype:'S',name:'con_config',fn:function(i,j,rs,v){ return "<a href='./dtsoursecon.page?code="+rs.code+"&isMenu=yes&mainmenu="+config.mainmenu+"&submenu=26900959'>查询条件配置</a>"}});
	function _buildButton(div){
		function buttonclick(b,m,t){
			var l=dt.getRecordset().query({check:1});
			if(l.length<1){
				alert("请选择一条数据");
				return ;
			}
			var codes=[];
			for(var j=0;j<l.length;j++){
				codes.push(l[j].code);
			}
			codes=codes.join("','");
			if(m=='updateState'){
				var _r=Ext.lt.RCP.asyncall(service,m,["'"+codes+"'",t]);
				if(_r){
					alert(b.innerText+'成功')
					loadDataSourseConfig();
				}else{
					alert(b.innerText+'失败')
				}
				return;
			}
			var c=window.confirm("确定删除？");
			
			if(c){
				
				var f = Ext.lt.RCP.asyncall(service,'getReportModel',["'"+codes+"'"]);
				
				if(f.length>0){
					alert(f+'\n请先删除引用模版后，再删除数据源配置。');
					return;
				} else {
					var _b=Ext.lt.RCP.asyncall(service,m,["'"+codes+"'"]);
						if(_b){
							alert(b.innerText+'成功')
							loadDataSourseConfig();
						}else{
							alert(b.innerText+'失败')
						}
				}
			}	
			
			
		}
		 var functions={id:'toolbar',buttons:[
			{name:'add',title:'新增',icon:'add',action:function(){winadd.show();Ext.lt.layout.doLayout();},disabled:false},'',
			{name:'qxgx',title:'删除',icon:'return',action:function(){buttonclick(this,'removeDtSourse',0);},disabled:false},'',
			{name:'save',title:'保存',icon:'save',action:function(){_save()},disabled:false},'',
			{name:'qd',title:'启用',icon:'enabled',action:function(){buttonclick(this,'updateState',1);},disabled:false},
			{name:'jy',title:'禁用',icon:'disable',action:function(){buttonclick(this,'updateState',0);},disabled:false},'',
			{name:'query',title:'查询',icon:'query',action:function(){loadDataSourseConfig();},disabled:false}
		]}

		var toolbar=new Ext.lt.toolbar(functions);
		div.innerHTML="<div layout='{w:{fit:true}}'></div><div layout='{w:{fit:true}}'></div>"
		toolbar.draw(div.firstChild);
		
		var _chtml=['<ul>'];
		_chtml.push('<li width="23%" labelwidth="60" type="input" name = "code" label="编码：" value=""/>');
		_chtml.push('<li width="23%" labelwidth="60" type="input" name = "name" label="名称：" value=""/>');
		_chtml.push('</ul>');
		div.lastChild.innerHTML=_chtml.join('');
		var _form = Ext.lt.editpanel.initFormPanel(div.lastChild.firstChild);
		_form.bind(query);
		
		function _save(){
			var list=dt.getRecordset().query({isupdate:1});
			if(list==null||list.length==0)return;
			var _baklist=[];
			for(var i = 0,l=list.length;i<l;i++){
				if(Trim(list[i].name).length<1){
					alert("名称不能为空！");
					return;
				}else if(list[i].name.length>50){
					alert("名称最大长度为50个字符！");
					return;
				}
				_baklist.push({name:list[i].name,itemid:list[i].itemid});
			}
			
			Ext.lt.RCP.call(service,'updateDt',[_baklist],function(rs){
				if(rs){
					alert('保存成功！');
				}else{
					alert('保存失败！');
				}
			});
			
		}
		
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
	function _buildAdd(div){
		var chtml=[];
		chtml.push('<ul id="addnew" style="width:600px" columnsize=1 labelwidth=100 >');
		chtml.push('<li width="600px" labelwidth="100" type="input" name = "code" label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=\'color:red\'>*</span>编码：" value=""  maxlength="50" />');
		chtml.push('<li width="600px" labelwidth="100" type="input" name = "name" label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=\'color:red\'>*</span>名称：" value=""  maxlength="50" />');
		chtml.push('<li width="600px" labelwidth="100" type="input" name = "tabname" label="<span style=\'color:red\'>*</span>表（视图）名：" value=""  maxlength="30" />');
		//chtml.push('<li width="100%"  type="textarea" id="viewsql" name="viewsql" height="40px" rows="40" />');
		chtml.push('</ul>');
		chtml.push('<textarea style="width:600px; border:1px solid #009ec8; margin-top:3px;" rows="20" id="viewsql"></textarea>');
		chtml.push('<center>')
		chtml.push('<span style=\'color:red\'>在文本域编写建立视图语句，从查询语句"select"开始，注意结尾不要加";"号，语句内容不要加注释。若"表（视图）名"填写的是数据库已有表名或视图名则该文本域可以为空。</span>')
		chtml.push('</center>')
		chtml.push('<center>')
		chtml.push('<button  name="submitSave" onclick="Ext.lt.message.send(\'add\',\'add\');">确定</button>')
		chtml.push('<button  name="" onclick="Ext.lt.message.send(\'close\',\'close\');">取消</button>')
		chtml.push('</center>')
		div.innerHTML=chtml.join("");
		var addnew_fm = Ext.lt.editpanel.initFormPanel(addnew);
		addnew_fm.bind(addform);
		Ext.lt.message.hook("add","add",function(){
			document.getElementById("submitSave").disabled=true;
			//Ext.lt.HTML.mark();先这样改，等冬哥bug改完再修正
			var reg = new RegExp("^[a-zA-Z0-9_]+$");
			var regn = new RegExp("^[\u4e00-\u9fa5a-zA-Z0-9_]+$");
			var regv = new RegExp("^(?!_)(?!.*?_$)[a-zA-Z0-9_]+$");
			if(addform.code=="" || addform.code==null || addform.code=="null"){
				alert("编码不能为空！");
				document.getElementById("submitSave").disabled=false;
				return;
			}else if(!reg.test(addform.code)){
				alert("编码非法，只能包含字母、数字和下划线！");
				document.getElementById("submitSave").disabled=false;
				return;
			}else if(addform.name=="" || addform.name==null || addform.name=="null"){
				alert("名称不能为空！");
				document.getElementById("submitSave").disabled=false;
				return;
			}else if(!regn.test(addform.name)){
				alert("名称非法，只能包含汉字、字母、数字和下划线！！");
				document.getElementById("submitSave").disabled=false;
				return;
			}else if(addform.tabname=="" || addform.tabname==null || addform.tabname=="null"){
				alert("表（视图）名不能为空！");
				document.getElementById("submitSave").disabled=false;
				return;
			}else if(!regv.test(addform.tabname)){
				alert("表（视图）名非法，只能包含字母、数字和下划线,且下划线不能开头和结尾！");
				document.getElementById("submitSave").disabled=false;
				return;
			}else if(Ext.lt.RCP.asyncall(service,'getCodeCount',[addform.code.toUpperCase()])>0){
				alert("编码已经存在！");
				document.getElementById("submitSave").disabled=false;
				return;
			}else if(Ext.lt.RCP.asyncall(service,'getNameCount',[addform.name])>0){
				alert("名称已经存在！");
				document.getElementById("submitSave").disabled=false;
				return;
			}else {
				savesql();
			}
		});
		Ext.lt.message.hook("close","close",function(){
			winadd.hidden() 
			addnew_fm.reset();
			document.getElementById('viewsql').value = "";
		});
		winadd.draw(div);
	}
	
	function _draw(div){
		var html=['<div class="overview_modeconfig_top" layout="{h:{fit:60},w:{fit:true}}" ></div>'];
		html.push('<div layout="{h:{fit:-60},w:{fit:true}}" ></div>');
		html.push('<div id="add" ></div>');
		div.innerHTML=html.join('');
		
		
		_buildDatatable(div.childNodes[1])
		_buildButton(div.childNodes[0])
		_buildAdd(div.childNodes[2])
		
		
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
	
	function loadDataSourseConfig(){
		for(var e in query){
			if(query[e]==null){
				query[e]='';
			}
			
		}
		Ext.lt.RCP.call(service,'loadDtSourse',[query],function(rs){
			dt.setRecordset(rs);
			dt.reflash();
		});
	}
	
	function savesql(){
		for(var e in addform){
			if(addform[e]==null){
				addform[e]='';
			}
		}
		addform['viewsql'] = document.getElementById('viewsql').value;
		if(document.getElementById('viewsql').value.indexOf(";")<0){
		
			Ext.lt.RCP.call(service,'saveDtSourse',[addform],function(rs){
				if(rs==""){
					winadd.hidden();
					alert("保存成功");
					document.getElementById("submitSave").disabled=false;
					loadDataSourseConfig();
					Ext.lt.message.send('close','close');
				}else{
					alert(rs);
					document.getElementById("submitSave").disabled=false;
					return;
				}
			});
		}else{
			alert("sql结尾不可以包含';'");
			document.getElementById("submitSave").disabled=false;
			return;
		}
			
			
		
	}
	
	function Trim(str){       
    	return str.replace(/(^\s*)|(\s*$)/g, "");   
    } 
	
	
	
	return _modereport;
}