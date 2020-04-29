<%@ page language="java" contentType="text/html; charset=GBK"
	pageEncoding="GBK"%>
<%@taglib uri="http://java.sun.com/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="/WEB-INF/ifmis-ui.tld" prefix="ui"%>
<%
	response.setHeader("Cache-Control", "no-cache");
	response.setHeader("Pragma", "no-cache");
	response.setDateHeader("Expires", 0);
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>规则组件</title>
		<!--附加样式表-->
		<link href="<%=request.getContextPath()%>/style/style.css"
			rel="stylesheet" type="text/css" />
		<link href="<%=request.getContextPath()%>/style/default.css"
			rel="stylesheet" type="text/css" />
		<!--引入js文件-->
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/js/prototype.js"></script>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/js/changescroll.js"></script>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/js/choose.js"></script>
		<script type='text/javascript' src="ruleconfig.js"></script>
		<script src="<%=request.getContextPath()%>/js/formatNumber.js"></script>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
	</head>
	<script type="text/javascript">
	var ROOT_PATH = '<%=request.getContextPath()%>';
	
	function ruleconfigTable(){
		//规则控件的参数
		this.tablecode='';
		this.queryRuleSourceUrl='/rule/ruleItemConfig/queryRuleSource.do';//查询规则原的请求地址
		this.queryRuleSourceTableCode = '';//查询规则原的请求参数
		this.objecttype = "ruleconfigtable";
		this.parent = null;	// 上级元素
		this.data = new Array();// 数据
		this.contentdiv = null;		// 显示内容的div
		this.borderdiv = null;		// 限制显示区域的div
		
		this.headHTML = null;		// 表头代码
		this.drawing = false;		// 表示当前是否正在绘制表格
		this.display = "line";		// 显示方式: block按照给定区域大小显示  line按照设置的行数显示
		// 产生表头的HTML代码
		this.setTableHead = function(){};
		// 将表格完全重绘，修改数据时使用
		this.show = function(){};
		// 重绘表格显示部分，没有修改数据时使用
		this.draw = function(){};
		//增加ruScopeSub对象规则项
		this.appendRuScopeSub = function(){};
		//删除ruScopeSub对象规则项
		this.deleteRuScopeSub = function(){};
		//增加ruScopeItem对象条件
		this.appendRuScopeItem = function(){};
		//修改ruScopeItem对象条件
		this.changeRuScopeItem = function(){};
		//更新ruScopeItem对象条件
		this.updateRuScopeItem = function(){};
		//删除ruScopeItem对象条件
		this.deleteRuScopeItem = function(){};
		// 设置表头
		this.setTableHead = function(){
			// 产生表头代码
			this.headHTML = '<tr class="main_table_title">';
			this.headHTML += '<th nowrap="nowrap">条件项</th>';
			this.headHTML += '<th nowrap="nowrap">条件名称</th>';
			this.headHTML += '<th nowrap="nowrap">数据元标志</th>';
			this.headHTML += '<th nowrap="nowrap">是否包含</th>';
			this.headHTML += '<th nowrap="nowrap">匹配算符</th>';
			this.headHTML += '<th nowrap="nowrap">值</th>';
			this.headHTML += '</tr>';	
		}	
		// 将表格完全重绘，修改数据时使用
		this.show = function(){
			if(this.parent == null) return ;
			// 清空元素内容
			this.parent.innerHTML = "";
		
			// 创建初始HTML代码
			var borderdiv = document.createElement('<div style="position:relative;height:expression(this.offsetParent.offsetHeight);width:expression(this.offsetParent.offsetWidth-1);overflow:hidden"></div>');
			var contentdiv = document.createElement('<div id="'+this.parent.id+'_contentdiv" style="position:absolute;height:expression(this.offsetParent.offsetHeight);width:expression(this.offsetParent.offsetWidth-15);overflow-x:auto;overflow-y:hidden;"></div>');
			
			// 组装框架
			borderdiv.appendChild(contentdiv);
			this.parent.appendChild(borderdiv);
			
			this.borderdiv = borderdiv;
			this.contentdiv = contentdiv;
			this.borderdiv.id = this.parent.id + "_dataTable";
			this.borderdiv.dataTable = this;
			this.setTableHead();
			
			// 在显示区画表格
			this.draw();
	
			if(this.display == "line"){
				this.contentdiv.style.overflowY = "visible";
				this.parent.style.height = (document.getElementById(this.parent.id+"_contentdiv").scrollWidth>document.getElementById(this.parent.id+"_contentdiv").offsetWidth)?document.getElementById(this.parent.id+"_contentdiv").getElementsByTagName("TABLE").item(0).offsetHeight+15:document.getElementById(this.parent.id+"_contentdiv").getElementsByTagName("TABLE").item(0).offsetHeight;
			}
		}
		
		this.draw = function(){	
			// 运行时间统计
		    var odate = new Date();
			var start = odate.getMilliseconds() + odate.getSeconds() * 1000;
			
			// 检查是否创建过表格
			var createdtable = this.contentdiv.getElementsByTagName("TABLE");
			
			var tablehtml = '<table id="tbl1" cellspacing="1" align="center" style="line-height:25px; font-size:12px;">';
			
			if(createdtable.length>0){
				// 获取当前表格的表头HTML代码
				tablehtml += this.contentdiv.getElementsByTagName("TABLE").item(0).rows.item(0).outerHTML;
			}
			else{
				tablehtml += this.headHTML;
			}
			tablehtml += '</table>';
			this.contentdiv.innerHTML = tablehtml;
			// 在table对象上增加 datatable 的引用
			this.contentdiv.getElementsByTagName("TABLE").item(0).datatable = this;
			// 获取表格对象
			var tableobj = this.contentdiv.getElementsByTagName("TABLE").item(0);
			// 追加Tbody对象
			var tbodyobj = document.createElement("TBODY");
			tableobj.appendChild(tbodyobj);
			
	    	if(this.data == null){
		    	// 如果没有数据则返回
	    		return null
	    	}  	
	    	for (var i = 0; i < this.data.length; i++) {	
	    		var ruScopeSub = this.data[i];
	    		//第一层，ruScopeSub对象规则项
	    		var trobj = document.createElement("TR");
	    		//写入规则项信息
	    		var td1 = document.createElement("TD");
	    		
	    		var subRadiobtn;
	    		if(ruScopeSub.checked == true){
	    			subRadiobtn =  document.createElement('<input name="" type="radio" checked/>');
	    		}else{
	    			subRadiobtn =  document.createElement('<input name="" type="radio" />');
	    		}
				subRadiobtn.subdata = ruScopeSub;
				subRadiobtn.datatable = this;
				subRadiobtn.onclick = function(){
					var datatable = this.datatable;
					var rows = datatable.data;
					// 清除选中项
					if(rows.length > 0){
						for(var i=0;i<rows.length;i++){
							var sub = rows[i];
							sub.checked = false;
							var items = sub.scopeitemset;
							if(null != items){
								for(var j=0;j<items.length;j++){
									items[j].checked = false;
								}
							}
						}
					}
					// 选中当前行
					this.subdata.checked = true;
					var rowitems = this.subdata.scopeitemset;
					var isSelect = 0
					if(null != rowitems && rowitems.length > 0){
						rowitems[0].checked = true;
					}
					datatable.draw();
				}
	    		td1.appendChild(subRadiobtn);
	    		
				var subrowspanNum = ruScopeSubRowspan(ruScopeSub);
				if(subrowspanNum > 1){
					td1.rowSpan = subrowspanNum;
				}
				//条件项单元格
				td1.appendChild(document.createTextNode(ruScopeSub.scopesubname));
				trobj.appendChild(td1);
	    		//写入规则条件信息
	    		var scopeitemset = ruScopeSub.scopeitemset;
	    		if(null == scopeitemset || scopeitemset.length == 0){
	    			var td2 = document.createElement("TD");
	    			trobj.appendChild(td2);
	    			var td3 = document.createElement("TD");
	    			trobj.appendChild(td3);
	    			var td4 = document.createElement("TD");
	    			trobj.appendChild(td4);
	    			var td5 = document.createElement("TD");
	    			trobj.appendChild(td5);
	    			var td6 = document.createElement("TD");
	    			trobj.appendChild(td6);
	    			tbodyobj.appendChild(trobj);
	    		}else{
		    		for(var j=0;j < scopeitemset.length;j++){
		    			var ruScopeItem = scopeitemset[j];
		    			if(j > 0){
		    				var trobj = document.createElement("TR");
	    					this.drawRuScopeItem(ruScopeSub,ruScopeItem,trobj,tbodyobj);
		    			}else{
		    				this.drawRuScopeItem(ruScopeSub,ruScopeItem,trobj,tbodyobj);
		    			}
		    		}
	    		}
	    	}
	
			this.drawing = false;
			
			var odate = new Date();
			var end = odate.getMilliseconds() + odate.getSeconds() * 1000;
		}
		
		this.drawRuScopeItem = function(ruScopeSub,ruScopeItem,trobj,tbodyobj){
			var itemrowspanNum = ruScopeItemRowspan(ruScopeItem);
			//条件名称单元格
			var td2 = document.createElement("TD");
			
			var ruScopeItembtn;
			if(ruScopeItem.checked == true){
	   			ruScopeItembtn = document.createElement('<input name="" type="radio" checked/>');
	   		}else{
	   			ruScopeItembtn = document.createElement('<input name="" type="radio" />');
	   		}
	   		ruScopeItembtn.data = ruScopeItem;
	   		ruScopeItembtn.parent = ruScopeSub;
			ruScopeItembtn.datatable = this;
			ruScopeItembtn.onclick = function(){
				var datatable = this.datatable;
				var rows = datatable.data;
				// 清除选中项
				if(rows.length > 0){
					for(var i=0;i<rows.length;i++){
						var sub = rows[i];
						sub.checked = false;
						var items = sub.scopeitemset;
						if(null != items){
							for(var j=0;j<items.length;j++){
								items[j].checked = false;
							}
						}
					}
				}
				// 选中当前行
				this.data.checked = true;
				this.parent.checked = true;
				datatable.draw();
			}
	   		td2.appendChild(ruScopeItembtn);
	   		
			td2.appendChild(document.createTextNode('条件'+ruScopeItem.sequenceno));
			trobj.appendChild(td2);
			//数据元标志单元格
			var td3 = document.createElement("TD");
			td3.appendChild(document.createTextNode(ruScopeItem.elementcodeStr));
			trobj.appendChild(td3);
			//是否包含单元格
			var td4 = document.createElement("TD");
			td4.appendChild(document.createTextNode(ruScopeItem.isincludeStr));
			trobj.appendChild(td4);
			//匹配算符单元格
			var td5 = document.createElement("TD");
			td5.appendChild(document.createTextNode(ruScopeItem.matchtypeidStr));
			trobj.appendChild(td5);
			if(itemrowspanNum > 1){
				td2.rowSpan = itemrowspanNum;
				td3.rowSpan = itemrowspanNum;
				td4.rowSpan = itemrowspanNum;
				td5.rowSpan = itemrowspanNum;
			}
			 
			//写入值信息
			var basevalueset = ruScopeItem.basevalueset;
			if(null == basevalueset || basevalueset.length == 0){
				var td6 = document.createElement("TD");
				trobj.appendChild(td6);
				if(null != ruScopeItem.basevalue && "" != ruScopeItem.basevalue){
					td6.appendChild(document.createTextNode(ruScopeItem.basevalue));
				}else{
					td6.appendChild(document.createTextNode(ruScopeItem.condition));
				}
				tbodyobj.appendChild(trobj);
			}else{
				for(var k=0;k < basevalueset.length;k++){
					var ruBaseValue = basevalueset[k];
					if(k>0){
						var trobj = document.createElement("TR");
						this.drawRuBaseValue(ruBaseValue,trobj,tbodyobj);
					}else{
						this.drawRuBaseValue(ruBaseValue,trobj,tbodyobj);
					}
				}
			}
		}
		
		this.drawRuBaseValue = function(ruBaseValue,trobj,tbodyobj){
			var td6 = document.createElement("TD");
		    td6.appendChild(document.createTextNode(ruBaseValue.basevalueStr));
			trobj.appendChild(td6);
			tbodyobj.appendChild(trobj);
		}
		
		this.appendRuScopeSub = function(){
			if(null == this.data){
				this.data = new Array();
			}
			//消取选择
			var rows = this.data;
			// 清除选中项
			if(rows.length > 0){
				for(var i=0;i<rows.length;i++){
					var sub = rows[i];
					sub.checked = false;
					var items = sub.scopeitemset;
					if(null != items){
						for(var j=0;j<items.length;j++){
							items[j].checked = false;
						}
					}
				}
			}
							
			var ruScopeSub = new RuScopeSub(this.data);
			this.data[this.data.length] = ruScopeSub;
			this.show();
		}
		
		this.deleteRuScopeSub = function(){
			var newdatas = new Array();
			var isSelect = 0;
			for(var i=0;i<this.data.length;i++){
				if(this.data[i].checked != true){
					newdatas[newdatas.length] = this.data[i];
				}else{
					isSelect = 1;
				}
			}
			if(isSelect == 0){
				alert("请先选择一个规则项");
			}else{
				this.data = null;
				this.data = newdatas;
				this.show();
			}
		}
		
		this.appendRuScopeItem = function(){
			var isSelect = 0;
			if(null == this.data){
				this.data = new Array();
			}
			for(var i=0;i<this.data.length;i++){
				var sub = this.data[i];
				if(sub.checked == true){
					isSelect = 1;
					if(null == sub.scopeitemset){
						sub.scopeitemset = new Array();
					}
					for(var j=0;j<sub.scopeitemset.length;j++){
						sub.scopeitemset[j].checked = false;
					}
					var item = new RuScopeItem(sub.scopeitemset);
					sub.scopeitemset[sub.scopeitemset.length] = item;
					openAddruleItem(item,"create",this.queryRuleSourceUrl,this.queryRuleSourceTableCode);
				}
			}
			
			if(isSelect == 0){
				alert("请先选择一个规则项！");
				return false;
			}
			this.show();
		}
		
		this.changeRuScopeItem = function(){
			if(null == this.data){
				this.data = new Array();
			}
			var isSelect = 0;
			for(var i=0;i<this.data.length;i++){
				var sub = this.data[i];
				if(sub.checked == true){
					var items = sub.scopeitemset;
					if(null != items && items.length > 0){
						for(var j=0;j<items.length;j++){
							if(items[j].checked == true){
								isSelect = 1;
								openAddruleItem(items[j],"change",this.queryRuleSourceUrl,this.queryRuleSourceTableCode);
							}
						}
					}				
				}
			}
			if(isSelect == 0){
				alert("请先选择一个条件！");
				return false;
			}
		}
		
		this.updateRuScopeItem = function(ruScopeItem){
			if(null == this.data){
				this.data = new Array();
			}
			var isSelect = 0;
			for(var i=0;i<this.data.length;i++){
				var sub = this.data[i];
				if(sub.checked == true){
					var items = sub.scopeitemset;
					alert(sub.scopesubname);
					alert(items.length);
					if(null != items && items.length > 0){
						for(var j=0;j<items.length;j++){
							alert(items[j].sequenceno + "="+items[j].checked);
							if(items[j].checked == true){
								isSelect = 1;
								items[j] = ruScopeItem;
							}
						}
					}	
				}
			}
			if(isSelect == 0){
				alert("请先选择一个条件！");
				return false;
			}
			this.show();
		}
		
		this.deleteRuScopeItem = function(){
			if(null == this.data){
				this.data = new Array();
			}
			var newdatas = new Array();
			var isSelect = 0;
			for(var i=0;i<this.data.length;i++){
				var sub = this.data[i];
				if(sub.checked != true){
					newdatas[newdatas.length] = sub;
				}else{
					var items = sub.scopeitemset;
					var newItemDatas = new Array();
					if(null != items && items.length > 0){
						for(var j=0;j<items.length;j++){
							if(items[j].checked != true){
								newItemDatas[newItemDatas.length] = items[j];
							}else{
								isSelect = 1;
							}
						}
					}
					if(isSelect == 0){
						alert("请先选择一个条件！");
						return false;
					}else{
						sub.scopeitemset = newItemDatas;;
						newdatas[newdatas.length] = sub;
					}
					
				}
			}
			this.data = null;
			this.data = newdatas;
			this.show();
		}
	}

	//计算ruScopeSub下有多少行信息
	function ruScopeSubRowspan(ruScopeSub){
		var num = 0;
		if(null == ruScopeSub){
			return num;
		}
		var scopeitemset = ruScopeSub.scopeitemset;
		if(null == scopeitemset || scopeitemset.length == 0){
			num = 1;	
		}else{
			for(var i=0;i < scopeitemset.length;i++){
	  			var ruScopeItem = scopeitemset[i];
	  			var basevalueset = ruScopeItem.basevalueset;
	  			if(null == basevalueset || basevalueset.length == 0){
	  				num = num + 1;
	  			}else{
	  				num = num + basevalueset.length;
	  			}
	  		}
		}
	  	return num;
	}
	
	//计算ruScopeItem下有多少行信息
	function ruScopeItemRowspan(ruScopeItem){
		if(null == ruScopeItem){
			return 0;
		}
	  	var basevalueset = ruScopeItem.basevalueset;
	  	if(null == basevalueset || basevalueset.length == 0){
	  		return 1;
	  	}else{
	  		return basevalueset.length;
	  	}
	}

	function openAddruleItem(ruScopeItem,operateFlag,queryRuleSourceUrl,queryRuleSourceTableCode){
		var url = ROOT_PATH+"/rule/addruleitem.do?a=1";
	    if(null != ruScopeItem){
	    	url = url + "&ruScopeItem="+turnObjectToJSON(ruScopeItem);
	    }
	    if(null != operateFlag){
	    	url = url + "&operateFlag=" + operateFlag;
	    }
	    if(null != queryRuleSourceUrl){
	    	url = url + "&queryRuleSourceUrl="+queryRuleSourceUrl;
	    }
	    if(null != queryRuleSourceTableCode && "" != queryRuleSourceTableCode){
	    	url = url + "&queryRuleSourceTableCode="+queryRuleSourceTableCode;
	    }
	    var time =new Date();
	    url = url + "&time="+time;
	    var features = "dialogHeight:900px;dialogWidth:600px;resizable:No;status:No;help:No;scrollbars:YES;resizable:YES";
	    window.showModalDialog(url,window,features);
	    //var features = "";
        //window.open(url, "新增条件", features); 
	}
	
	function turnObjectToJSON(object){
		var type = typeof object;
	    switch (type) {
	      case 'undefined':
	      case 'function':
	      case 'unknown': return;
	      case 'boolean': return object.toString();
	    }
	
	    if (object === null) return 'null';
	    if (object.toJSON) return object.toJSON();
	    if (Object.isElement(object)) return;
	
	    var results = [];
	    for (var property in object) {
	      var value = Object.toJSON(object[property]);
	      if (value !== undefined)
	        results.push(property.toJSON() + ': ' + value);
	    }
	
	    return '{' + results.join(', ') + '}';
	}
	
	function addruleitemSaveCallBack(subwindow){
		var elementcodeStr = subwindow.document.getElementById("elementcodeStr");
		var elementcode = subwindow.document.getElementById("elementcode");
		var matchtypeid = subwindow.document.getElementById("matchtypeid");
		var basevalue = subwindow.document.getElementById("basevalue");
		var isinclude = document.getElementById("isinclude");
		var selectNodes = new Array();
		
		//组装对象
		var isinclude = subwindow.document.getElementsByName("isinclude");  
	    for(var i=0;i<isinclude.length;i++){  
	        if(isinclude[i].checked == true){  
	        	subwindow.ruScopeItem.isinclude = isinclude[i].value;
	        }
	    }
		if(isinclude.value == 1){
			subwindow.ruScopeItem.isincludeStr = "包含";
		}else{
			subwindow.ruScopeItem.isincludeStr = "排除";
		}
		subwindow.ruScopeItem.elementcodeStr = elementcodeStr.value;
		subwindow.ruScopeItem.elementcode = elementcode.value;
		subwindow.ruScopeItem.lastColumnElementcode = elementcode.elementcode
		subwindow.ruScopeItem.lastColumnIsleaf = elementcode.isleaf
		subwindow.ruScopeItem.lastColumnDatatype = elementcode.datatype
		
		subwindow.ruScopeItem.matchtypeid = matchtypeid.value;
		subwindow.ruScopeItem.matchtypeidStr = matchtypeid.options[matchtypeid.selectedIndex].text
		subwindow.ruScopeItem.basevalueset = new Array();
		if(matchtypeid.value == 3){
			selectNodes = subwindow.elementTree.findAll(function(node){
					return node.data.isChecked;
				});
			for(var i=0;i<selectNodes.length;i++){
				var nodetemp = selectNodes[i];
				var bv = new Basevalue();
				bv.basevalue = nodetemp.data.id;
				bv.basevalueStr = nodetemp.data.label;
				subwindow.ruScopeItem.basevalueset[i] = bv;
			}
		}else if(matchtypeid.value == 5){
			
		}else{
			if(null == basevalue.value || "" == basevalue.value.trim()){
				subwindow.ruScopeItem.basevalue = basevalue.value;
			}
		}
		ruleconfig.updateRuScopeItem(subwindow.ruScopeItem);
		subwindow.close();
	}
	
	function addruleitemCancelCallBack(subwindow){
		if(subwindow.operateFlag == "create"){
			ruleconfig.deleteRuScopeItem();
		}
		subwindow.close();
	}
	</script>
	<body>
		<div>
			<div id="ruleconfig_div">
				<div id="ruleconfig_button">
					<span><span title="新增条件项" class="add_btn"
						onclick="ruleconfig.appendRuScopeSub()"
						onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
						onmousedown="doChangeBg1(this)"><a href="#">新增条件项</a> </span> </span>
					<span><span title="删除条件项" class="del_btn"
						onclick="ruleconfig.deleteRuScopeSub()"
						onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
						onmousedown="doChangeBg1(this)"><a href="#">删除条件项</a> </span> </span>
					<span><span title="新增条件" class="add_btn"
						onclick="ruleconfig.appendRuScopeItem()"
						onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
						onmousedown="doChangeBg1(this)"><a href="#">新增条件</a> </span> </span>
					<span><span title="修改条件" class="mod_btn"
						onclick="ruleconfig.changeRuScopeItem()"
						onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
						onmousedown="doChangeBg1(this)"><a href="#">修改条件</a> </span><span>｜</span>
					</span>
					<span><span title="删除条件" class="del_btn"
						onclick="ruleconfig.deleteRuScopeItem()"
						onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
						onmousedown="doChangeBg1(this)"><a href="#">删除条件</a> </span> </span>
					<br />
					注：规则与规则之间是或的关系，规则内条件与条件为并的关系！下面表格是全部数据为一个规则！
				</div>
				<div id="ruleconfig_table"
					style='position:relative;height:expression(this.offsetParent.offsetHeight);width:100%;'>
				</div>
			</div>
		</div>
		<br />
		<script type="text/javascript">
		var ruleconfig = new ruleconfigTable();
		ruleconfig.parent = document.getElementById('ruleconfig_table');
		<%
			String json = (String)request.getAttribute("json");
			if(null == json || "".equals(json)){
				out.println("ruleconfig.data = new Array();\n");
			}else{
				out.println("ruleconfig.data = "+ json);
			}
		%>
		ruleconfig.show();
		</script>
	</body>
</html>
