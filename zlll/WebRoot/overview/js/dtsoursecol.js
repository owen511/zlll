//��������ռ�
if(Ext.lt.overview==null){
    Ext.lt.overview={component:{}}
};

Ext.lt.overview.dtsoursecol=function(config,service){
	var _bak=null;
	var dt=new Ext.lt.editdatatable(config.rs);
	var col=[dt.columns.seq,dt.columns.checkbox];
	col.push({alias:'�б���',datatype:'S',name:'code',edit:false});
	col.push({alias:'������',datatype:'S',name:'name',oneditstart:function(table,el,l,c,d){
		_bak = d.name;
	},oneditend:function(table,el,l,c,d){
		var k=0;
		for(var i = 0;i<dt.getRecordset().size();i++){
			
			if(dt.getRecordset().getData(i).name==d.name || dt.getRecordset().getData(i).name==d.name.toUpperCase() || dt.getRecordset().getData(i).name==d.name.toLowerCase()){
				k = k+1;
			}
			if(k>1){
				alert("�����Ѿ����ڣ�"); 
				d.name=_bak;
				break;
			}
		}
	},edit:true});
	col.push({alias:'�������ֶ�',datatype:'S',name:'tabcol',oneditstart:function(table,el,l,c,d){
		_bak = d.tabcol;
	},oneditend:function(table,el,l,c,d){
		var k=0;
		for(var i = 0;i<dt.getRecordset().size();i++){
			
			if(dt.getRecordset().getData(i).tabcol==d.tabcol || dt.getRecordset().getData(i).tabcol==d.tabcol.toUpperCase() || dt.getRecordset().getData(i).tabcol==d.tabcol.toLowerCase()){
				k = k+1;
			}
			if(k>1){
				alert("���������ֶ��Ѿ����ڣ�"); 
				d.tabcol=_bak;
				break;
			}
		}
	},format:'#name',mapper:{columns:['tabcol','name'],datas:config.tabColumn},edit:true});
	col.push({alias:'��������',datatype:'S',style:'text-align:center',name:'datatype',format:'#name',
	oneditend:function(table,el,l,c,d){
		if(d.datatype!='S'){ 
			d.format="";
			d.elementcode="";
		}
	}
	,mapper:{columns:['datestyle','name'],datas:[['N','����'],['S','�ַ�'],['T','ʱ��']]},edit:true});
	col.push({alias:'Ҫ������',datatype:'S',style:'text-align:center',name:'elementcode',oneditstart:function(table,el,l,c,d){
		if(d.datatype!='S'){
			return false
		}
	},oneditend:function(table,el,l,c,d){
		if(d.elementcode!=null && d.elementcode!=""){
			d.format='#code-#name';
		}
		if(d.tabcol!=d.elementcode){
			alert('��ѡҪ���������������ֶβ�һ�£�');
			return;
		}
	},format:'#name',mapper:{columns:['elementcode','name'],datas:config.elementcoders},edit:true});
	col.push({alias:'�����',datatype:'S',name:'tabcode'});
	col.push({alias:'�����ʽ',datatype:'S',style:'text-align:center',name:'format',
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
				alert("��ѡ��һ������");
				return;
			}
			var codes=[];
			for(var j=0;j<l.length;j++){
				codes.push(l[j].code);
			}
			codes=codes.join("','");
			var c=window.confirm("ȷ��ɾ����");
			if(c){
				Ext.lt.RCP.call(service,m,["'"+codes+"'"],function(rs){
					if(rs){
						alert(b.innerText+'�ɹ�');
						loadDtSourseColConfig();
					}else{
						alert(b.innerText+'ʧ��,��ѡ��¼�ѱ���ǰ�������û�ģ������,�޷�ɾ��');
					}
				});
			}
			
		}
		 var functions={id:'toolbar',buttons:[
			{name:'add',title:'����',icon:'add',action:function(){addDetail();},disabled:false},'',
			{name:'qxgx',title:'ɾ��',icon:'return',action:function(){buttonclick(this,'removeDtSourseCol',0);},disabled:false},'',
			{name:'jy',title:'����',icon:'save',action:function(){Ext.lt.message.send('updatedt','save');},disabled:false},'',
			{name:'return',title:'����',icon:'return',action:function(){
				var b=window.confirm("�Ƿ񷵻أ�");
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
					alert("�����Ʋ���Ϊ�գ�");
					return;
				}else if(dt.getRecordset().getData(i).tabcol.length<1){
					alert("�������ֶβ���Ϊ�գ�");
					return;
				}else if(dt.getRecordset().getData(i).name.length>50){
					alert("��������󳤶�Ϊ50���ַ���");
					return;
				}
			}
			Ext.lt.RCP.call(service,'updateDtCol',[dt.getRecordset().toArray(),config.code],function(rs){
				if(!rs){
					alert('����ʧ��');
				}else{
					alert('����ɹ�');
				}
			});
		});
	}
	function _buildDatatable(div){
		dt.setCols(col);
		/*********������ʽ*************/
		
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
		//��ȡ�б������ֲ������ֵ�������ݿ�ȡֵ ������
		var maxnum=dt.getRecordset().size();
//		var numgroup = [];
//		var rs = Ext.lt.RCP.asyncall(service,'getCodesByTab',[config.code]);
//			for (var i=0;i<rs.size();i++){
//				var codenum = rs[i].code.replace(config.code,"");
//				numgroup.push(parseInt(codenum));
//			}
//		
//		maxnum = numgroup.max();
		//������Ĭ��ѡ��״̬
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