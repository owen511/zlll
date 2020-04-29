//检查命名空间
if(Ext.lt.overview==null){
    Ext.lt.overview={component:{}}
};

var winaddsel = new Ext.lt.window({title:'查询SQL',pop:true,w:'410',fitmode:'content',className:'wnd',mark:true});
Ext.lt.overview.dtsoursecon=function(config,service){
	var _bak=null;//记录编辑之前的值
	var dt=new Ext.lt.editdatatable(config.rs);
	var col=[dt.columns.seq,dt.columns.checkbox];
	col.push({alias:'编码',datatype:'S',name:'code',edit:false});
	col.push({alias:'名称',datatype:'S',name:'name',oneditstart:function(table,el,l,c,d){
		_bak = d.name;
	},
	oneditend:function(table,el,l,c,d){
		var k=0;
		for(var i = 0;i<dt.getRecordset().size();i++){
			if(dt.getRecordset().getData(i).name==d.name || dt.getRecordset().getData(i).name==d.name.toUpperCase() || dt.getRecordset().getData(i).name==d.name.toLowerCase()){
				k = k+1;
			}
			if(k>1){
				alert("名称已经存在！"); 
				d.name=_bak;
				break;
			}
		}
	},edit:true});
	col.push({alias:'物理列',datatype:'S',name:'tabcol',style:'text-align:center',format:'#name',mapper:{columns:['tabcol','name'],datas:config.tabColumn},
	oneditstart:function(table,el,l,c,d){
		_bak = d.tabcol;
	},
	oneditend:function(table,el,l,c,d){
		var k=0;
		for(var i = 0;i<dt.getRecordset().size();i++){
			
			if(dt.getRecordset().getData(i).tabcol==d.tabcol){
				k = k+1;
			}
			if(k>1){
				alert("名称已经存在！"); 
				d.tabcol=_bak;
				table.reflash();
				break;
			}
		}
	},edit:true});
	col.push({alias:'展示方式',datatype:'S',name:'type',style:'text-align:center',format:'#name',
	oneditend:function(table,el,l,c,d){
		if(d.type!='select'){ 
			d.selecttext="";
			table.reflash();
		}
		if(d.type!='treeselect'){
			d.selectsuper="";
			d.selectmode="";
			d.format="";
			table.reflash();
		}
		if(d.type=='select' || d.type=='treeselect'){
			
		}else{
			d.tablename="";
			table.reflash();
		}
	}
	,mapper:{columns:['type','name'],datas:[['select','下拉菜单'],['input','文本框'],['treeselect','下拉树形结构'],['date','日期型文本框'],['dateregion','日期区间']]},edit:true});
	col.push({alias:'选项值-名称(下拉菜单,下拉树)',datatype:'S',name:'selecttext',style:'text-align:center',format:'#name',
	oneditstart:function(table,el,l,c,d){
		if(d.type!='select' && d.type!='treeselect'){return false;}
	}
	,mapper:{columns:['selecttext','name'],datas:[['vchcode-name','vchcode-name'],['Itemid-name','Itemid-name'],['userid-name','userid-name']]},edit:true});
	col.push({alias:'父节点(用于下拉树结构)',datatype:'S',
	oneditstart:function(table,el,l,c,d){
		if(d.type!='treeselect'){return false;}
	}
	,name:'selectsuper',edit:true});
	col.push({alias:'是否多选(用于下拉树结构)',datatype:'S',name:'selectmode',style:'text-align:center',format:'#name',
	oneditstart:function(table,el,l,c,d){
		if(d.type!='treeselect'){return false;}
	}
	,mapper:{columns:['selectmode','name'],datas:[['n','是'],['o','否']]},edit:true});
	col.push({alias:'显示方式(用于下拉树结构)',datatype:'S',name:'format',style:'text-align:center',format:'#name',
	oneditstart:function(table,el,l,c,d){
		if(d.type!='treeselect'){return false;}
	}
	,mapper:{columns:['format','name'],datas:[['#code-#name','#code-#name'],['#code','#code'],['#name','#name'],['#code #name','#code #name']]},edit:true});
	col.push({alias:'查询SQL',datatype:'S',name:'tablename',
		oneditstart:function(table,el,l,c,d){
			if(d.type=='select' || d.type=='treeselect'){
				return true;
			}else{
				return false;
		}},
		oneditend:function(table,el,l,c,d){
			var obj={type:d.type,tabcol:d.tabcol,tablename:d.tablename,selecttext:d.selecttext,selectsuper:d.selectsuper,selectmode:d.selectmode,format:d.format};
			var _result=Ext.lt.RCP.asyncall(service,'checkSql',obj);
			if(!_result){
				alert("查询SQL配置错误！");
				return;
			}
		},
		edit:true});
	col.push({alias:'表编码',datatype:'S',name:'tabcode'});
	
	function _buildButton(div){
		function buttonclick(b,m,t){
			var l=dt.getRecordset().query({check:1});
			if(l.length<1){
				alert("请选择一条数据");
				return;
			}
			var codes=[];
			for(var j=0;j<l.length;j++){
				codes.push(l[j].code);
			}
			codes=codes.join("','");
			var c=window.confirm("确定删除？");
			//dt.getRecordset().remove(l);
			if(c){
				Ext.lt.RCP.call(service,m,["'"+codes+"'"],function(rs){
					if(rs){
						dt.getRecordset().remove(l);
						alert(b.innerText+'成功');
					//loadDtSourseConConfig();
					}else{
						alert(b.innerText+'失败,所选记录已被当前或其他用户模板引用,无法删除')
					}
				
				});
			}
			
		}
		 var functions={id:'toolbar',buttons:[
			{name:'add',title:'新增',icon:'add',action:function(){addDetail();},disabled:false},'',
			{name:'qxgx',title:'删除',icon:'return',action:function(){buttonclick(this,'removeDtSourseCon',0);},disabled:false},'',
			{name:'jy',title:'保存',icon:'save',action:function(){Ext.lt.message.send('updatedt','save');},disabled:false},'',
			{name:'return',title:'返回',icon:'return',action:function(){
				var b=window.confirm("是否返回？");
				if(b){
					window.location='./datasourse.page?isMenu=yes&mainmenu='+config.mainmenu+'&submenu=26900959'
				}
			},disabled:false}
		]}
		
		var toolbar=new Ext.lt.toolbar(functions);
		div.innerHTML="<div layout='{w:{fit:true}}'></div>"
		toolbar.draw(div.firstChild);
		Ext.lt.message.hook("updatedt","save",function(){
			for(var i = 0;i<dt.getRecordset().size();i++){
				if(Trim(dt.getRecordset().getData(i).name).length<1){
					alert("名称不能为空！");
					return;
				}else if(dt.getRecordset().getData(i).name.length>50){
					alert("名称最大长度为50个字符！");
					return;
				}else if(dt.getRecordset().getData(i).tablename.length>200){
					alert("查询sql最大长度为200个字符！");
					return;
				}else if(dt.getRecordset().getData(i).selectsuper.length>50){
					alert("父节点(用于下拉树结构)最大长度为50个字符！");
					return;
				}else if(dt.getRecordset().getData(i).tabcol.length<1){
					alert("物理列不能为空！");
					return;
				}else if(dt.getRecordset().getData(i).type.length<1){
					alert("展示方式不能为空！");
					return;
				}else if(dt.getRecordset().getData(i).type =='select' || dt.getRecordset().getData(i).type =='treeselect'){
					if(Trim(dt.getRecordset().getData(i).tablename).length<1){
						alert("当展示方式为'下拉菜单'和'下拉树结构'时'查询SQL'不能为空！");
						return;
					}
				}
			}
			
			Ext.lt.RCP.call(service,'updateDtCon',[dt.getRecordset().toArray(),config.code],function(rs){
			
				if(rs){
					alert('保存成功');
				}else{
					alert('保存失败');
				}
			});
			
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
		dt.setSelectDown(true);
		dt.draw(div);
	}
	
	function _buildAddsel(div){
		
		var q=document.createElement('lable')
		q.innerHTML='sql语句：'
		div.appendChild(q);
		
		var q7=document.createElement('div')
		q7.innerHTML='<textarea style="width:400px;border:1px solid #009ec8; margin-top:3px;" rows="10" >(select * from t_pubindsource order by code)</textarea>'
		div.appendChild(q7);
		
		var b=document.createElement("button");
		b.innerText="确定";
		b.onclick=function(){
			winaddsel.hidden();
			alert("保存成功！");
		}
		div.appendChild(b);
		
		var b2=document.createElement("button");
		b2.innerText="取消";
		b2.onclick=function(){
			winaddsel.hidden();
		}
		div.appendChild(b2);
		
		winaddsel.draw(div);
		winaddsel.hidden();
	}
	
	
	function _draw(div){
		var html=['<div class="perspective_modeconfig_top" layout="{h:{fit:30},w:{fit:true}}"></div>'];
		html.push('<div layout="{h:{fit:\'auto\'},w:{fit:true}}" ></div>');
		html.push('<div id="add" ></div>');
		div.innerHTML=html.join('');
		_buildButton(div.childNodes[0])
		_buildDatatable(div.childNodes[1])
		_buildAddsel(div.childNodes[2])
		
	}
	
	function addDetail(){
		//获取列编码数字部分最大值
		var maxnum = dt.getRecordset().size();
//		var numgroup = [];
//		
//		var rs = Ext.lt.RCP.asyncall(service,'getCodesByTab',[config.code]);
//		if(rs.size()>0){
//			for (var i=0;i<rs.size();i++){
//				var codenum = rs[i].code.replace(config.code,"");
//				numgroup.push(parseInt(codenum));
//			}
//			maxnum = numgroup.max();
//		}else{
//			maxnum = 0;
//		}
		//新增行默认选中状态
		var detailrow = [{code:config.code+(maxnum+1),name:'',tabcode:config.code,selectsuper:'',tablename:'',tabcol:'',type:''}];
		detailrow.checked = true;
		dt.getRecordset().addData(detailrow);
		dt.reflash();
	}
	
//	function loadDtSourseConConfig(){
//		Ext.lt.RCP.call(service,'lodeDtSourseCon',[config.code],function(rs){
//			dt.setRecordset(rs);
//			dt.reflash();
//		});
//	
//	}
	
	function Trim(str){       
    	return str.replace(/(^\s*)|(\s*$)/g, "");   
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
	
	return _modereport;
}