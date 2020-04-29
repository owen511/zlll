//��������ռ�
if(Ext.lt==null){
    Ext.lt={component:{}}
};
	var wn=null;

Ext.lt.formulas=function(cfg){
	var _config=Ext.lt.apply({},cfg);
	_config.cells=Ext.lt.formulas.cells;
	var fors={};
	var formulas={
		cfg:_config,
		type:'formulas',
		version:'1.0'	,
		setCell:function(cells){
			this.cfg.cells=cells;
		},
		getColNames:function(){
			return this.cfg.getColNames();
		},
		getFormulasInfo:function(){
			return 	Ext.lt.formulas.formulaInfo;
		},
		calculation:function(fnname,params){
			return Ext.lt.formulas.formula[fnname](params);
		},
		//c ��ǰ�У�l ��ǰ�У� whereObj,�������}
		getCell:function(c,l,whereObj){
			return this.cfg.cells.getCell(c,l,whereObj);
		},
		bind:function(ds){
			if(ds!=null&&ds.type=='datatable'){
				this.cfg.datatable=ds;
				this.cfg.recordset=null;
			}
			if(ds&&ds.type=='recordset'){
				this.cfg.recordset=ds;
				this.cfg.datatable=null;
			}
			this.cfg.cells.bind(ds);
		},
		getRecordset:function(){
			return this.cfg.getRecordset();
		},
		getColNames:function(){
			return _getCols(this.cfg);
		},
		execution2str:function(str,c,l){
			if(fors[str]==null){
				eval("fors[str]=function(c,l){ return "+str+"}");
			}
			return fors[str](c,l);
		}
	};
	return formulas;
}
Ext.lt.formulas.initcells=function(cfg){
	var _config=Ext.lt.apply({},cfg);
	
	function _getRs(cfg){
		if(cfg.recordset!=null){
			return cfg.recordset;
		}
		if(cfg.datatable!=null){
			return cfg.datatable.getRecordset();
		}
		return null;
	}
	function _getCols(cfg){
		if(cfg.recordset!=null){
			return cfg.recordset.getColNames();
		}
		if(cfg.datatable!=null){
			return cfg.datatable.getRecordset().getColNames();
		}
		return [];
	}
	
	var cels={};
	var celswherefn={};
	var cells={
		cfg:_config,
		type:'cell',
		version:'1.0'	,
		//c ��ǰ�У�l ��ǰ�У� whereObj,�������}
		getCell:function(c,l){
			return this.getRecordset().getData(l)[this.getColNames()[c]];
		},
		getRow:function(l){
			return this.getRecordset().getData(l);
		},
		queryCell:function(str,l,c){
			return cels[str](this,l,c);
		},
		setCells:function(str,cs,ls,wherefnstr){
			eval("celswherefn[\""+wherefnstr+"\"]=function(rs,c,cname,l,d,v){ return "+wherefnstr+"}");	
			cels[str]=function(cells,al,ac){
				var ret=[];
				var rs=cells.getRecordset()
				var names=cells.getColNames();
				var _ls=null;
				var _lslength;
				if(ls!=null){
					_ls=ls.split(",");
					_lslength=_ls.length;
				}else{
					_lslength=rs.size();
				}
				var _cs=null;
				var _cslength;
				if(cs!=null){
					_cs=cs.split(",");
					_cslength=_cs.length;
				}else{
					_cslength=names.length;
				}
				
				for(var l=0;l<_lslength;l++){
					var d;
					if(_ls==null){
						d=rs.getData(l);
					}else{
						d=rs.getData(_ls[l]);
					}
					
					for(var c=0;c<_cslength;c++){
						var cname=_cs[c];
						if(!isNaN(cname)){
							cname=names[cname];
						}
						var v=d[cname];
						if(celswherefn[wherefnstr]==null||celswherefn[wherefnstr](rs,c,cname,l,d,v,al,ac)){
							ret.push(v);
						}
					}
				}
				return ret;
			}
			
		},
		bind:function(ds){
			if(ds!=null&&ds.type=='datatable'){
				this.cfg.datatable=ds;
				this.cfg.recordset=null;
			}
			if(ds&&ds.type=='recordset'){
				this.cfg.recordset=ds;
				this.cfg.datatable=null;
			}
		},
		getRecordset:function(){
			return _getRs(this.cfg);
		},
		getColNames:function(){
			return _getCols(this.cfg);
		}
	};
	return cells;
}
Ext.lt.formulas.cells=Ext.lt.formulas.initcells();
Ext.lt.formulas.createFormulas=function(formulaname,name,promptinfo,fn){
	if(!(fn==null||formulaname==null||Ext.lt.isFunction(fn))){
		alert('���ء�'+name+'������ʧ��');
		return false;	
	}
	Ext.lt.formulas.formulaInfo[formulaname]={name:name,promptinfo:promptinfo,calculation:fn,selfFormulas:true};
	Ext.lt.formulas.formula[formulaname]=fn;
};
Ext.lt.formulas.formulaInfo={'sum':{
		name:"�ϼ�",
		promptinfo:"sum(Array)",
		execution:function(arr){
			var _sum=0;
			for(var i=0,l=arr.length;i<l;i++){
				if(isNaN(arr[i])){
					continue;
				}
				//if(typeof(arr[i])=='string'){
					_sum+=parseFloat(arr[i]);
				//}else{
				//	_sum+=arr[i]
				//}
				
			}
			return _sum;
		}
	},'ave':{
		name:"ƽ��ֵ",
		promptinfo:"ave(Array)",
		execution:function(arr){
			if(arr.length==0)return 0;
			var _sum=0;
			for(var i=0,l=arr.length;i<l;i++){
				_sum+=arr[i]	
			}
			return _sum/arr.length;
		}
	},'sum2obj':{
		name:"�ϼ�",
		promptinfo:"sum(Array,prototypeName)",
		execution:function(arr,pn){
			var _sum=0;
			for(var i=0,l=arr.length;i<l;i++){
				if(isNaN(arr[i][pn])||arr[i][pn]==null){
					continue;
				}
				//if(typeof(arr[i][pn])=='string'){
					_sum+=parseFloat(arr[i][pn]);
				//}else{
				//	_sum+=arr[i]
				//}
			}
			
			return _sum;
		},
		calculation:function(arrs){
			return Ext.lt.formulas.formulaInfo.sum2obj.execution(arrs[0],arrs[1]);
		}
	},'ave2obj':{
		name:"ƽ��ֵ",
		promptinfo:"ave(Array,prototypeName)",
		execution:function(arr,pn){
			if(arr.length==0)return 0;
			var _sum=0;
			for(var i=0,l=arr.length;i<l;i++){
				_sum+=arr[i][pn]
			}
			return _sum/arr.length;
		},
		calculation:function(arrs){
			return Ext.lt.formulas.formulaInfo.ave2obj.execution(arrs[0],arrs[1]);
		}
	},'if':{
		name:"�ж�",
		promptinfo:"�ж�����������������㷵��һ�������򷵻���һ��(if(test,true_value,false_value))",
		execution:function(test,true_value,false_value){
			if(eval(test)){
				return true_value;
			}else{
				return false_value;
			}
		},
		calculation:function(arrs){
			return Ext.lt.formulas.formulaInfo['if'].execution(arrs[0],arrs[1],arrs[2]);
		}
	},'indexOf':{
		name:"������",
		promptinfo:"����ָ�����ַ����ڴ��ַ����е�һ�γ��ִ������������������Ϊһ�����ַ������֣��򷵻� -1��(indexOf(str,str))",
		execution:function(str,s){
			return str.indexOf(s);
		},
		calculation:function(arrs){
			return Ext.lt.formulas.formulaInfo['indexOf'].execution(arrs[0],arrs[1]);
		}
	},'indexOfArray':{
		name:"������ڶ���",
		promptinfo:"����ָ����ֵ�ڴ˼����е�һ�γ��ִ�������������������ڣ��򷵻� -1��(indexOfArray(Array,obj))",
		execution:function(arr,obj){
			  var length = arr.length;
			  for (var i=0; i < length; i++){
			    if (arr[i] === obj) return i;
			  }
			  return -1;
		},
		calculation:function(arrs){
			return Ext.lt.formulas.formulaInfo['indexOfArray'].execution(arrs[0],arrs[1]);
		}
	},'count':{
		name:"��������",
		promptinfo:"�����Ӽ��ĸ���",
		execution:function(arr){
			debugger;
			if(arr==null)return 0;
			if(typeof(arr)==Array){
				return arr.length;
			}else{
				return 1;
			}
		}
	},'max':{
		name:"���ֵ",
		promptinfo:"��ȡ���ϵ����ֵ",
		execution:function(arr){
			var max=arr[0];
			var length = arr.length;
		  for (var i=1; i < length; i++){
		    if (arr[i] >max) {
		    	max=arr[i];
		    }
		  }
		  return max;
		}
	},'min':{
		name:"��Сֵ",
		promptinfo:"��ȡ���ϵ���Сֵ",
		execution:function(arr){
			var min=arr[0];
			var length = arr.length;
		  for (var i=1; i < length; i++){
		    if (arr[i] <min) {
		    	min=arr[i];
		    }
		  }
		  return min;
		}
	},'round':{
		name:"�������뵱ǰֵ",
		promptinfo:"��������(number,��Ҫ���Ƶ�λ��)����Ҫ���Ƶ�λ����0��ʾ���Ƶ�����λ 2��ʾ����������λС����-2��ʾ�������뵽��λ��",
		execution:function(num,n){
			var _n=1;
			var sb=n>=0;
			n=Math.abs(n) 
			for(var i=0;i<n;i++){
				_n=_n*10;
			}
			var v=0;
			if(sb){
				v=num*_n;	
			}else{
				v=num/_n;
			}
			v=parseInt((v+(0.5*Math.pow(0.1, 0))),10);
			if(sb){
				v=v/_n;	
			}else{
				v=v*_n;
			}
			return v;
		},
		calculation:function(arrs){
			return  Ext.lt.formulas.formulaInfo['round'].execution(arrs[0],arrs[1]);
		}
	},'isNull':{
		name:"�ж��Ƿ�Ϊ��",
		promptinfo:"�жϵ�ǰֵ�Ƿ�Ϊ�գ��ǿշ���true",
		execution:function(arr){
			if(arr==null){
				return true;	
			}
			return false;
		}
	}
};
function initFormula(){
	var o={};
	for(var E in Ext.lt.formulas.formulaInfo){
		if(Ext.lt.formulas.formulaInfo[E].calculation==null){
			Ext.lt.formulas.formulaInfo[E].calculation=Ext.lt.formulas.formulaInfo[E].execution
		}
		o[E]=Ext.lt.formulas.formulaInfo[E].calculation;
	}
	return o;
}
Ext.lt.formulas.formula=initFormula();