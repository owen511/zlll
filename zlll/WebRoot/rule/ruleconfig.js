 function Basevalue(){
	this.basevalue = 0;
	this.scopeitemid = 0;
	this.basevalueid = 0;
	this.basevalueStr = "";
}

function RuScopeItem(data){
	var max = 0;
	for(i=0;i<data.length;i++){
		var ruScopeItem = data[i];
		if(ruScopeItem.sequenceno > max){
			max = ruScopeItem.sequenceno;
		}
	}
	this.sequenceno = max+1;
	this.scopeitemid = 0;
	this.elementcode = "";
	this.elementcodeStr = "";
	this.isinclude = 1;
	this.isincludeStr = "包含";
	this.matchtypeid = "";
	this.matchtypeidStr = "";
	this.basevalue = "";
	this.basevalueset = new Array();
	this.condition = "";
	this.filter = "";
	this.scopesubid = 0;
	this.lastColumnElementcode = 0;
	this.lastColumnIsleaf = 1;
	this.lastColumnDatatype = "";
	this.checked  = true;
}

function copyRuScopeItem(origin,target){
	target.scopeitemid = origin.scopeitemid;
	target.elementcode = origin.elementcode;
	target.isinclude = origin.isinclude;
	target.sequenceno = origin.sequenceno;
	target.matchtypeid = origin.matchtypeid;
	target.basevalue = origin.basevalue;
	target.basevalueset = origin.basevalueset;
	target.condition = origin.condition;
	target.filter = origin.filter;
	target.scopesubid = origin.scopesubid;
	target.lastColumnElementcode = origin.lastColumnElementcode;
	target.lastColumnIsleaf = origin.lastColumnIsleaf;
	target.lastColumnDatatype = origin.lastColumnDatatype;
	return target;
}

function RuScopeSub(data){
	this.scopesubid = 0;
	this.remark = "";
	this.scoperuleid = 0;
	var max = 0;
	for(i=0;i<data.length;i++){
		var ruScopeSub = data[i];
		if(ruScopeSub.sequenceno > max){
			max = ruScopeSub.sequenceno;
		}
	}
	this.sequenceno = max+1;
	this.scopesubname = "规则"+Transform(max+2+"");
	this.scopeitemset = new Array();
	this.checked = true;
}

function Transform(num)
{
	var len = num.length;
	var dw = new Array("零","一","二","三","四","五","六","七","八","九");//整数部分用
	var str="";
	
	for(i=1;i<=len;i++){
		var n = num.charAt(len-i);
		str = str +  dw[Number(n)] ;//加数字
	}
	return str
}