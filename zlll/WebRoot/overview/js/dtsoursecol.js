//检查命名空间
if(Ext.lt.overview==null){
    Ext.lt.overview={component:{}}
};

Ext.lt.overview.dtsoursecol=function(config,service){
	var _bak=null;
	var dt=new Ext.lt.editdatatable(config.rs);
	var col=[dt.columns.seq,dt.columns.checkbox];
	col.push({alias:'列编码',datatype:'S',name:'code',edit:false});
	col.push({alias:'列名称',datatype:'S',name:'name',oneditstart:function(table,el,l,c,d){
		_bak = d.name;
	},oneditend:function(table,el,l,c,d){
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
	col.push({alias:'列物理字段',datatype:'S',name:'tabcol',oneditstart:function(table,el,l,c,d){
		_bak = d.tabcol;
	},oneditend:function(table,el,l,c,d){
		var k=0;
		for(var i = 0;i<dt.getRecordset().size();i++){
			
			if(dt.getRecordset().getData(i).tabcol==d.tabcol || dt.getRecordset().getData(i).tabcol==d.tabcol.toUpperCase() || dt.getRecordset().getData(i).tabcol==d.tabcol.toLowerCase()){
				k = k+1;
			}
			if(k>1){
				alert("该列物理字段已经存在！"); 
				d.tabcol=_bak;
				break;
			}
		}
	},format:'#name',mapper:{columns:['tabcol','name'],datas:config.tabColumn},edit:true});
	col.push({alias:'数据类型',datatype:'S',style:'text-align:center',name:'datatype',format:'#name',
	oneditend:function(table,el,l,c,d){
		if(d.datatype!='S'){ 
			d.format="";
			d.elementcode="";
		}
	}
	,mapper:{columns:['datestyle','name'],datas:[['N','数字'],['S','字符'],['T','时间']]},edit:true});
	col.push({alias:'要素名称',datatype:'S',style:'text-align:center',name:'elementcode',oneditstart:function(table,el,l,c,d){
		if(d.datatype!='S'){
			return false
		}
	},oneditend:function(table,el,l,c,d){
		if(d.elementcode!=null && d.elementcode!=""){
			d.format='#code-#name';
		}
		if(d.tabcol!=d.elementcode){
			alert('已选要素名称与列物理字段不一致！');
			return;
		}
	},format:'#name',mapper:{columns:['elementcode','name'],datas:config.elementcoders},edit:true});
	col.push({alias:'表编码',datatype:'S',name:'tabcode'});
	col.push({alias:'传码格式',datatype:'S',style:'text-align:center',name:'format',
	oneditstart:function(table,el,l,c,d){
		if(d.datatype!='S'){
			return false
		}
		
	},
	format:'#name',mapper:{columns:['format','name'],datas:[['#code-#name','#code-#name'],['#code #name','#code #name'],['#name','#name']]},edit:true});
	
	
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
			if(c){
				Ext.lt.RCP.call(service,m,["'"+codes+"'"],function(rs){
					if(rs){
						alert(b.innerText+'成功');
						loadDtSourseColConfig();
					}else{
						alert(b.innerText+'失败,所选记录已被当前或其他用户模板引用,无法删除');
					}
				});
			}
			
		}
		 var functions={id:'toolbar',buttons:[
			{name:'add',title:'新增',icon:'add',action:function(){addDetail();},disabled:false},'',
			{name:'qxgx',title:'删除',icon:'return',action:function(){buttonclick(this,'removeDtSourseCol',0);},disabled:false},'',
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
					alert("列名称不能为空！");
					return;
				}else if(dt.getRecordset().getData(i).tabcol.length<1){
					alert("列物理字段不能为空！");
					return;
				}else if(dt.getRecordset().getData(i).name.length>50){
					alert("列名称最大长度为50个字符！");
					return;
				}
			}
			Ext.lt.RCP.call(service,'updateDtCol',[dt.getRecordset().toArray(),config.code],function(rs){
				if(!rs){
					alert('保存失败');
				}else{
					alert('保存成功');
				}
			});
		});
	}
	function _buildDatatable(div){
		dt.setCols(col);
		/*********设置样式*************/
		
		dt.headsort(true);
		dt.setAllowClock(true);
		dt.setClassName('dttheme_ifmis');
		dt.setMouselight('#CFF6FF');
		dt.mousedrag(false);
		//dt.setLinedrop(true);
		dt.setSelectDown(true);
		dt.draw(div);
	}
	
	
	function _draw(div){
		var html=['<div class="perspective_modeconfig_top" layout="{h:{fit:30},w:{fit:true}}"></div>'];
		html.push('<div layout="{h:{fit:\'auto\'},w:{fit:true}}" ></div>');
		//html.push("")
		div.innerHTML=html.join('');
		_buildButton(div.childNodes[0])
		_buildDatatable(div.childNodes[1])
		
		
	}
	
	function addDetail(){
		//获取列编码数字部分最大值（从数据库取值 并发）
		var maxnum=dt.getRecordset().size();
//		var numgroup = [];
//		var rs = Ext.lt.RCP.asyncall(service,'getCodesByTab',[config.code]);
//			for (var i=0;i<rs.size();i++){
//				var codenum = rs[i].code.replace(config.code,"");
//				numgroup.push(parseInt(codenum));
//			}
//		
//		maxnum = numgroup.max();
		//新增行默认选中状态
		var detailrow = [{code:config.code+(maxnum+1),name:'',tabcode:config.code,tabcol:'',orderby:(maxnum+1)}];
		detailrow.checked = true;
		dt.getRecordset().addData(detailrow);
		dt.reflash();
	}
	
	function loadDtSourseColConfig(){
		
		Ext.lt.RCP.call(service,'lodeDtSourseCol',[config.code],function(rs){
			dt.setRecordset(rs);
			dt.reflash();
		});
	
	}
	
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