//检查命名空间
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
		//c 当前列，l 当前行， whereObj,条件语句}
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
		//c 当前列，l 当前行， whereObj,条件语句}
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
		alert('加载【'+name+'】方法失败');
		return false;	
	}
	Ext.lt.formulas.formulaInfo[formulaname]={name:name,promptinfo:promptinfo,calculation:fn,selfFormulas:true};
	Ext.lt.formulas.formula[formulaname]=fn;
};
Ext.lt.formulas.formulaInfo={'sum':{
		name:"合计",
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
		name:"平均值",
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
		name:"合计",
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
		name:"平均值",
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
		name:"判断",
		promptinfo:"判断满足条件，如果满足返回一个，否则返回另一个(if(test,true_value,false_value))",
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
		name:"存在于",
		promptinfo:"返回指定子字符串在此字符串中第一次出现处的索引。如果它不作为一个子字符串出现，则返回 -1。(indexOf(str,str))",
		execution:function(str,s){
			return str.indexOf(s);
		},
		calculation:function(arrs){
			return Ext.lt.formulas.formulaInfo['indexOf'].execution(arrs[0],arrs[1]);
		}
	},'indexOfArray':{
		name:"数组存在对象",
		promptinfo:"返回指定子值在此集合中第一次出现处的索引。如果它不存在，则返回 -1。(indexOfArray(Array,obj))",
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
		name:"包含个数",
		promptinfo:"集合子集的个数",
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
		name:"最大值",
		promptinfo:"获取集合的最大值",
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
		name:"最小值",
		promptinfo:"获取集合的最小值",
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
		name:"四舍五入当前值",
		promptinfo:"四舍五入(number,需要控制的位数)。需要控制的位数（0表示控制的整数位 2表示四舍五入两位小数，-2表示四舍五入到百位）",
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
		name:"判断是否为空",
		promptinfo:"判断当前值是否为空，是空返回true",
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