//��������ռ�
if(Ext.lt.overview==null){
    Ext.lt.overview={component:{}}
};

var winaddsel = new Ext.lt.window({title:'��ѯSQL',pop:true,w:'410',fitmode:'content',className:'wnd',mark:true});
Ext.lt.overview.dtsoursecon=function(config,service){
	var _bak=null;//��¼�༭֮ǰ��ֵ
	var dt=new Ext.lt.editdatatable(config.rs);
	var col=[dt.columns.seq,dt.columns.checkbox];
	col.push({alias:'����',datatype:'S',name:'code',edit:false});
	col.push({alias:'����',datatype:'S',name:'name',oneditstart:function(table,el,l,c,d){
		_bak = d.name;
	},
	oneditend:function(table,el,l,c,d){
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
	col.push({alias:'������',datatype:'S',name:'tabcol',style:'text-align:center',format:'#name',mapper:{columns:['tabcol','name'],datas:config.tabColumn},
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
				alert("�����Ѿ����ڣ�"); 
				d.tabcol=_bak;
				table.reflash();
				break;
			}
		}
	},edit:true});
	col.push({alias:'չʾ��ʽ',datatype:'S',name:'type',style:'text-align:center',format:'#name',
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
	,mapper:{columns:['type','name'],datas:[['select','�����˵�'],['input','�ı���'],['treeselect','�������νṹ'],['date','�������ı���'],['dateregion','��������']]},edit:true});
	col.push({alias:'ѡ��ֵ-����(�����˵�,������)',datatype:'S',name:'selecttext',style:'text-align:center',format:'#name',
	oneditstart:function(table,el,l,c,d){
		if(d.type!='select' && d.type!='treeselect'){return false;}
	}
	,mapper:{columns:['selecttext','name'],datas:[['vchcode-name','vchcode-name'],['Itemid-name','Itemid-name'],['userid-name','userid-name']]},edit:true});
	col.push({alias:'���ڵ�(�����������ṹ)',datatype:'S',
	oneditstart:function(table,el,l,c,d){
		if(d.type!='treeselect'){return false;}
	}
	,name:'selectsuper',edit:true});
	col.push({alias:'�Ƿ��ѡ(�����������ṹ)',datatype:'S',name:'selectmode',style:'text-align:center',format:'#name',
	oneditstart:function(table,el,l,c,d){
		if(d.type!='treeselect'){return false;}
	}
	,mapper:{columns:['selectmode','name'],datas:[['n','��'],['o','��']]},edit:true});
	col.push({alias:'��ʾ��ʽ(�����������ṹ)',datatype:'S',name:'format',style:'text-align:center',format:'#name',
	oneditstart:function(table,el,l,c,d){
		if(d.type!='treeselect'){return false;}
	}
	,mapper:{columns:['format','name'],datas:[['#code-#name','#code-#name'],['#code','#code'],['#name','#name'],['#code #name','#code #name']]},edit:true});
	col.push({alias:'��ѯSQL',datatype:'S',name:'tablename',
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
				alert("��ѯSQL���ô���");
				return;
			}
		},
		edit:true});
	col.push({alias:'�����',datatype:'S',name:'tabcode'});
	
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
			//dt.getRecordset().remove(l);
			if(c){
				Ext.lt.RCP.call(service,m,["'"+codes+"'"],function(rs){
					if(rs){
						dt.getRecordset().remove(l);
						alert(b.innerText+'�ɹ�');
					//loadDtSourseConConfig();
					}else{
						alert(b.innerText+'ʧ��,��ѡ��¼�ѱ���ǰ�������û�ģ������,�޷�ɾ��')
					}
				
				});
			}
			
		}
		 var functions={id:'toolbar',buttons:[
			{name:'add',title:'����',icon:'add',action:function(){addDetail();},disabled:false},'',
			{name:'qxgx',title:'ɾ��',icon:'return',action:function(){buttonclick(this,'removeDtSourseCon',0);},disabled:false},'',
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
					alert("���Ʋ���Ϊ�գ�");
					return;
				}else if(dt.getRecordset().getData(i).name.length>50){
					alert("������󳤶�Ϊ50���ַ���");
					return;
				}else if(dt.getRecordset().getData(i).tablename.length>200){
					alert("��ѯsql��󳤶�Ϊ200���ַ���");
					return;
				}else if(dt.getRecordset().getData(i).selectsuper.length>50){
					alert("���ڵ�(�����������ṹ)��󳤶�Ϊ50���ַ���");
					return;
				}else if(dt.getRecordset().getData(i).tabcol.length<1){
					alert("�����в���Ϊ�գ�");
					return;
				}else if(dt.getRecordset().getData(i).type.length<1){
					alert("չʾ��ʽ����Ϊ�գ�");
					return;
				}else if(dt.getRecordset().getData(i).type =='select' || dt.getRecordset().getData(i).type =='treeselect'){
					if(Trim(dt.getRecordset().getData(i).tablename).length<1){
						alert("��չʾ��ʽΪ'�����˵�'��'�������ṹ'ʱ'��ѯSQL'����Ϊ�գ�");
						return;
					}
				}
			}
			
			Ext.lt.RCP.call(service,'updateDtCon',[dt.getRecordset().toArray(),config.code],function(rs){
			
				if(rs){
					alert('����ɹ�');
				}else{
					alert('����ʧ��');
				}
			});
			
		});
	}
	function _buildDatatable(div){
		dt.setCols(col);
		/*********������ʽ*************/
		
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
		q.innerHTML='sql��䣺'
		div.appendChild(q);
		
		var q7=document.createElement('div')
		q7.innerHTML='<textarea style="width:400px;border:1px solid #009ec8; margin-top:3px;" rows="10" >(select * from t_pubindsource order by code)</textarea>'
		div.appendChild(q7);
		
		var b=document.createElement("button");
		b.innerText="ȷ��";
		b.onclick=function(){
			winaddsel.hidden();
			alert("����ɹ���");
		}
		div.appendChild(b);
		
		var b2=document.createElement("button");
		b2.innerText="ȡ��";
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
		//��ȡ�б������ֲ������ֵ
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
		//������Ĭ��ѡ��״̬
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