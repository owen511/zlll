//��������ռ�
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
		_h.push('<li label="���룺" width=\"250px\" type=\"input\" maxLength=50 name=\"code\" redwordmode=\"on\" />');
		_h.push('<li label="���ƣ�" width=\"250px\" type=\"input\" maxLength=50 name=\"name\" redwordmode=\"on\" />');
		_h.push('<li label="��Ʒ��ʶ��" width=\"250px\" type=\"select\" maxLength=50 name=\"product\" redwordmode=\"on\"  dataloader=\"Ext.lt.formula.prodata\" />');
		_h.push('<li label="�У�" width=\"250px\" type=\"input\" maxLength=50 name=\"lines\" redwordmode=\"on\" />');
		_h.push('<li label="�У�" width=\"250px\" type=\"input\" maxLength=50 name=\"columns\" redwordmode=\"on\" />');
		_h.push('<li label="��̨�����ࣺ" width=\"250px\" type=\"select\" maxLength=50 name=\"wherefn\" redwordmode=\"on\" dataloader=\"Ext.lt.formula.wherefn\" />');
		_h.push('<li label="����������" width=\"250px\" type=\"textarea\" name=\"wheres\" redwordmode=\"on\" />');
		_h.push('</ul>');
		_h.push('<p><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>');
		_h.push('&nbsp;&nbsp;��������д�кţ��������п��Բ�д������к��á�,������<br/>');
		_h.push('&nbsp;&nbsp;����  <br/>&nbsp;&nbsp;&nbsp;&nbsp;�У� 1,2,3 ��ʾ��һ����������');
		_h.push('<br/><br/>');
		_h.push("&nbsp;&nbsp;�����ݿ�����д�кŻ��е�Ӣ������(������Ҫ������''������)���������п��Բ�д������к��á�,������<br/>");
		_h.push('&nbsp;&nbsp;����  <br/>&nbsp;&nbsp;&nbsp;&nbsp;�У� 1,2,3 ��ʾ��һ����������');
		_h.push("<br/>&nbsp;&nbsp;&nbsp;&nbsp;�У� 'itemid','code','name' ��ʾitemid�У�code�У�name��");
		_h.push('<br/><br/>');
		_h.push('&nbsp;&nbsp;�ṩĬ�ϲ���(rs,c,cname,l,d,v)�ֱ��ʾȫ�����ݵ�recordSet���󣬵�ǰ�кţ���ǰ�����֣���ǰ�кţ���ǰ�е�ֵ����ǰ��Ԫ���ֵ<br/>');
		_h.push('&nbsp;&nbsp;����ֵҪ�󷵻�boolean����<br/>');
		_h.push('&nbsp;&nbsp;����<br/>');
		_h.push('&nbsp;&nbsp;&nbsp;&nbsp;���������� v>100&&(rs["name"]=="����"||cname=="name")&&l>1');
		_h.push('</p>')
		_h.push('<center><button>ȷ��</button><button>ȡ��</button></center>');
		div.innerHTML=_h.join('');
		div.lastChild.firstChild.onclick=function(){
			Ext.lt.message.send('formulacell','save');
		}
		div.lastChild.lastChild.onclick=function(){
			wn.hidden();
		}
		fm= Ext.lt.editpanel.initFormPanel(div.firstChild);
		fm.bind(fmobj);
		
		
		wn=new Ext.lt.window({title:"�༭��Ϣ",h:500,w:450,className:'wind7', close:false,pop:true,mark:true,autoshow:true});
		wn.draw(div);
		wn.hidden();
	}
	function initTeble(div){
		rs.addData(config.tablers)
		dt=new Ext.lt.datatable(rs);
		col=[dt.columns.seq,dt.columns.checkbox];
		
		col.push({alias:'����',datatype:'S',name:'code'});
		col.push({alias:'����',datatype:'S',name:'name'});
		col.push({alias:'��Ʒ��ʶ',datatype:'S',name:'product',format:"#name",mapper:{columns:['code','name'],datas:prodata}});
		col.push({alias:'��',datatype:'S',name:'lines'});
		col.push({alias:'��',datatype:'S',name:'columns'});
		col.push({alias:'��̨������',datatype:'S',name:'wherefn',format:"#name",mapper:{columns:['code','name'],datas:config.cellQuery}});
		col.push({alias:'����',datatype:'S',name:'wheres'});
		
		dt.drawMultiHead(true);
		dt.setCols(col);
		/*********������ʽ*************/
		dt.headsort(true);
		dt.setAllowClock(true);
		dt.setClassName('dttheme_ifmis');
		dt.setMouselight('#CFF6FF');
		dt.mousedrag(false);
		dt.draw(div);
	}
	config.draw=function(d){
		d.innerHTML="<div layout='{h:{fit:20},w:{fit:true}}'><button class=\"btn\" onclick='Ext.lt.message.send(\"formulacell\",\"add\")'>����</button>&nbsp;&nbsp;<button class=\"btn\" onclick='Ext.lt.message.send(\"formulacell\",\"update\")'>�޸�</button>&nbsp;&nbsp;<button class=\"btn\" onclick='Ext.lt.message.send(\"formulacell\",\"del\")'>ɾ��</button></div><div layout='{h:{fit:-20},w:{fit:true}}'></div>"
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
			alert("����ɹ�");
			loadFormulaCell();
			wn.hidden();
		}else{
			alert("����ʧ��");
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
			alert("��ѡ��һ������");
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
		if(fmobj.code==null||fmobj.code.length==0){alert("����д����");return false}
		if(fmobj.name==null||fmobj.name.length==0){alert("����д����");return false}
		if(fmobj.product==null||fmobj.product.length==0){alert("��ѡ���Ʒ");return false}
		for(var i=0;i<_preps.length;i++){
			if(fmobj[_preps[i]]!=null&&fmobj[_preps[i]].length!=0){return true}
		}
		alert("����������һ������");
		return false;
	}
	
	Ext.lt.message.hook('formulacell','del',function(){
		var ids=[];
		var l=rs.query({check:1});
		if(l==null||l.length==0){
			alert("��ѡ����Ҫɾ��������");
			return;
		}
		var b=window.confirm("�Ƿ�ɾ��ѡ������");
		if(!b)return;
		for(var i=0,lt=l.length;i<lt;i++){
			ids.push(l[i].itemid);
		}
		var reps=Ext.lt.RCP.asyncall(service,"removeById",[ids]);
		if(reps){
			alert("ɾ���ɹ�");
			loadFormulaCell();
		}
	})
	
	return config;
}