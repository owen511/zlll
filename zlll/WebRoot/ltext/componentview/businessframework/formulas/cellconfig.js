//检查命名空间
if(Ext.lt==null){
    Ext.lt={component:{}}
};
	var wn=null;
if(Ext.lt.formula==null){
	Ext.lt.formula={};
}
Ext.lt.formula.cellconfig=function(service,config){
	var rs=new Ext.lt.recordset();
	var dt=null;
	var fm=null;
	var fmobj={};
	var col=[];
   	var _productdata=Ext.lt.RCP.asynserver("consoleinstallservice", "load",  null);
   	Ext.lt.formula.prodata=new Ext.lt.recordset();
   	var prodata=[];
   	for(var i=0;i<_productdata.length;i++){
   		Ext.lt.formula.prodata.addData({v:_productdata[i].config,t:_productdata[i].name});
   		prodata.push([_productdata[i].config,_productdata[i].name]);
   	}
   	Ext.lt.formula.wherefn=new Ext.lt.recordset({columns:['v','t','p'],datas:config.cellQuery});
	function createWin(div){
		var _h=[];
		_h.push('<ul layout="{w:{fit:true}}" columnsize=1 >');
		_h.push('<li label="编码：" width=\"250px\" type=\"input\" maxLength=50 name=\"code\" redwordmode=\"on\" />');
		_h.push('<li label="名称：" width=\"250px\" type=\"input\" maxLength=50 name=\"name\" redwordmode=\"on\" />');
		_h.push('<li label="产品标识：" width=\"250px\" type=\"select\" maxLength=50 name=\"product\" redwordmode=\"on\"  dataloader=\"Ext.lt.formula.prodata\" />');
		_h.push('<li label="行：" width=\"250px\" type=\"input\" maxLength=50 name=\"lines\" redwordmode=\"on\" />');
		_h.push('<li label="列：" width=\"250px\" type=\"input\" maxLength=50 name=\"columns\" redwordmode=\"on\" />');
		_h.push('<li label="后台计算类：" width=\"250px\" type=\"select\" maxLength=50 name=\"wherefn\" redwordmode=\"on\" dataloader=\"Ext.lt.formula.wherefn\" />');
		_h.push('<li label="其他条件：" width=\"250px\" type=\"textarea\" name=\"wheres\" redwordmode=\"on\" />');
		_h.push('</ul>');
		_h.push('<p><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>');
		_h.push('&nbsp;&nbsp;行内容填写行号，不控制行可以不写，多个行号用‘,’隔开<br/>');
		_h.push('&nbsp;&nbsp;例：  <br/>&nbsp;&nbsp;&nbsp;&nbsp;行： 1,2,3 表示第一，二，三行');
		_h.push('<br/><br/>');
		_h.push("&nbsp;&nbsp;列内容可以填写列号或列的英文名字(名字需要用引号''引起来)，不控制列可以不写，多个列号用‘,’隔开<br/>");
		_h.push('&nbsp;&nbsp;例：  <br/>&nbsp;&nbsp;&nbsp;&nbsp;列： 1,2,3 表示第一，二，三列');
		_h.push("<br/>&nbsp;&nbsp;&nbsp;&nbsp;列： 'itemid','code','name' 表示itemid列，code列，name列");
		_h.push('<br/><br/>');
		_h.push('&nbsp;&nbsp;提供默认参数(rs,c,cname,l,d,v)分别表示全部数据的recordSet对象，当前列号，当前列名字，当前行号，当前行的值，当前单元格的值<br/>');
		_h.push('&nbsp;&nbsp;返回值要求返回boolean类型<br/>');
		_h.push('&nbsp;&nbsp;例：<br/>');
		_h.push('&nbsp;&nbsp;&nbsp;&nbsp;其他条件： v>100&&(rs["name"]=="测试"||cname=="name")&&l>1');
		_h.push('</p>')
		_h.push('<center><button>确认</button><button>取消</button></center>');
		div.innerHTML=_h.join('');
		div.lastChild.firstChild.onclick=function(){
			Ext.lt.message.send('formulacell','save');
		}
		div.lastChild.lastChild.onclick=function(){
			wn.hidden();
		}
		fm= Ext.lt.editpanel.initFormPanel(div.firstChild);
		fm.bind(fmobj);
		
		
		wn=new Ext.lt.window({title:"编辑信息",h:500,w:450,className:'wind7', close:false,pop:true,mark:true,autoshow:true});
		wn.draw(div);
		wn.hidden();
	}
	function initTeble(div){
		rs.addData(config.tablers)
		dt=new Ext.lt.datatable(rs);
		col=[dt.columns.seq,dt.columns.checkbox];
		
		col.push({alias:'编码',datatype:'S',name:'code'});
		col.push({alias:'名称',datatype:'S',name:'name'});
		col.push({alias:'产品标识',datatype:'S',name:'product',format:"#name",mapper:{columns:['code','name'],datas:prodata}});
		col.push({alias:'行',datatype:'S',name:'lines'});
		col.push({alias:'列',datatype:'S',name:'columns'});
		col.push({alias:'后台计算类',datatype:'S',name:'wherefn',format:"#name",mapper:{columns:['code','name'],datas:config.cellQuery}});
		col.push({alias:'条件',datatype:'S',name:'wheres'});
		
		dt.drawMultiHead(true);
		dt.setCols(col);
		/*********设置样式*************/
		dt.headsort(true);
		dt.setAllowClock(true);
		dt.setClassName('dttheme_ifmis');
		dt.setMouselight('#CFF6FF');
		dt.mousedrag(false);
		dt.draw(div);
	}
	config.draw=function(d){
		d.innerHTML="<div layout='{h:{fit:20},w:{fit:true}}'><button class=\"btn\" onclick='Ext.lt.message.send(\"formulacell\",\"add\")'>新增</button>&nbsp;&nbsp;<button class=\"btn\" onclick='Ext.lt.message.send(\"formulacell\",\"update\")'>修改</button>&nbsp;&nbsp;<button class=\"btn\" onclick='Ext.lt.message.send(\"formulacell\",\"del\")'>删除</button></div><div layout='{h:{fit:-20},w:{fit:true}}'></div>"
		+"<div class='winfitmode' class='winfitmode' layout='{h:{fit:440},w:{fit:400}}' style='overflow:hidden;'></div>";
		initTeble(d.childNodes[1]);
		createWin(d.childNodes[2]);
	}
	config.resize=function(w,h){
		dt.resize(w,h-40);
	}
	var method=null;
	Ext.lt.message.hook('formulacell','save',function(){
		if(!validation())return;
		var reps=Ext.lt.RCP.asyncall(service,method,fmobj);
		if(reps){
			alert("保存成功");
			loadFormulaCell();
			wn.hidden();
		}else{
			alert("保存失败");
		}
	})
	function loadFormulaCell(){
		rs.clear();
		rs.addData(Ext.lt.RCP.asyncall(service,"loadFormulasCell",null));
		dt.reflash();
	}
	Ext.lt.message.hook('formulacell','add',function(){
		fmobj={};
		fm.bind(fmobj);
		wn.show();
		Ext.lt.layout.doLayout();
		method='saveFormulasCell';
	})
	Ext.lt.message.hook('formulacell','update',function(){
		var l=rs.query({check:1});
		if(l==null||l.length!=1){
			alert("请选择一条数据");
			return;
		}
		fmobj=Ext.lt.clone(l[0]);
		fm.bind(fmobj);
		wn.show();
		Ext.lt.layout.doLayout();
		method='updateFormulasCell';
	})
	
	var _preps=['lines','columns','wherefn','wheres'];
	
	function validation(){
		if(fmobj.code==null||fmobj.code.length==0){alert("请填写编码");return false}
		if(fmobj.name==null||fmobj.name.length==0){alert("请填写名称");return false}
		if(fmobj.product==null||fmobj.product.length==0){alert("请选择产品");return false}
		for(var i=0;i<_preps.length;i++){
			if(fmobj[_preps[i]]!=null&&fmobj[_preps[i]].length!=0){return true}
		}
		alert("请至少配置一个条件");
		return false;
	}
	
	Ext.lt.message.hook('formulacell','del',function(){
		var ids=[];
		var l=rs.query({check:1});
		if(l==null||l.length==0){
			alert("请选择需要删除的内容");
			return;
		}
		var b=window.confirm("是否删除选中数据");
		if(!b)return;
		for(var i=0,lt=l.length;i<lt;i++){
			ids.push(l[i].itemid);
		}
		var reps=Ext.lt.RCP.asyncall(service,"removeById",[ids]);
		if(reps){
			alert("删除成功");
			loadFormulaCell();
		}
	})
	
	return config;
}