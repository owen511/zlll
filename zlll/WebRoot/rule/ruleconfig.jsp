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
		<title>�������</title>
		<!--������ʽ��-->
		<link href="<%=request.getContextPath()%>/style/style.css"
			rel="stylesheet" type="text/css" />
		<link href="<%=request.getContextPath()%>/style/default.css"
			rel="stylesheet" type="text/css" />
		<!--����js�ļ�-->
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
		//����ؼ��Ĳ���
		this.tablecode='';
		this.queryRuleSourceUrl='/rule/ruleItemConfig/queryRuleSource.do';//��ѯ����ԭ�������ַ
		this.queryRuleSourceTableCode = '';//��ѯ����ԭ���������
		this.objecttype = "ruleconfigtable";
		this.parent = null;	// �ϼ�Ԫ��
		this.data = new Array();// ����
		this.contentdiv = null;		// ��ʾ���ݵ�div
		this.borderdiv = null;		// ������ʾ�����div
		
		this.headHTML = null;		// ��ͷ����
		this.drawing = false;		// ��ʾ��ǰ�Ƿ����ڻ��Ʊ��
		this.display = "line";		// ��ʾ��ʽ: block���ո��������С��ʾ  line�������õ�������ʾ
		// ������ͷ��HTML����
		this.setTableHead = function(){};
		// �������ȫ�ػ棬�޸�����ʱʹ��
		this.show = function(){};
		// �ػ�����ʾ���֣�û���޸�����ʱʹ��
		this.draw = function(){};
		//����ruScopeSub���������
		this.appendRuScopeSub = function(){};
		//ɾ��ruScopeSub���������
		this.deleteRuScopeSub = function(){};
		//����ruScopeItem��������
		this.appendRuScopeItem = function(){};
		//�޸�ruScopeItem��������
		this.changeRuScopeItem = function(){};
		//����ruScopeItem��������
		this.updateRuScopeItem = function(){};
		//ɾ��ruScopeItem��������
		this.deleteRuScopeItem = function(){};
		// ���ñ�ͷ
		this.setTableHead = function(){
			// ������ͷ����
			this.headHTML = '<tr class="main_table_title">';
			this.headHTML += '<th nowrap="nowrap">������</th>';
			this.headHTML += '<th nowrap="nowrap">��������</th>';
			this.headHTML += '<th nowrap="nowrap">����Ԫ��־</th>';
			this.headHTML += '<th nowrap="nowrap">�Ƿ����</th>';
			this.headHTML += '<th nowrap="nowrap">ƥ�����</th>';
			this.headHTML += '<th nowrap="nowrap">ֵ</th>';
			this.headHTML += '</tr>';	
		}	
		// �������ȫ�ػ棬�޸�����ʱʹ��
		this.show = function(){
			if(this.parent == null) return ;
			// ���Ԫ������
			this.parent.innerHTML = "";
		
			// ������ʼHTML����
			var borderdiv = document.createElement('<div style="position:relative;height:expression(this.offsetParent.offsetHeight);width:expression(this.offsetParent.offsetWidth-1);overflow:hidden"></div>');
			var contentdiv = document.createElement('<div id="'+this.parent.id+'_contentdiv" style="position:absolute;height:expression(this.offsetParent.offsetHeight);width:expression(this.offsetParent.offsetWidth-15);overflow-x:auto;overflow-y:hidden;"></div>');
			
			// ��װ���
			borderdiv.appendChild(contentdiv);
			this.parent.appendChild(borderdiv);
			
			this.borderdiv = borderdiv;
			this.contentdiv = contentdiv;
			this.borderdiv.id = this.parent.id + "_dataTable";
			this.borderdiv.dataTable = this;
			this.setTableHead();
			
			// ����ʾ�������
			this.draw();
	
			if(this.display == "line"){
				this.contentdiv.style.overflowY = "visible";
				this.parent.style.height = (document.getElementById(this.parent.id+"_contentdiv").scrollWidth>document.getElementById(this.parent.id+"_contentdiv").offsetWidth)?document.getElementById(this.parent.id+"_contentdiv").getElementsByTagName("TABLE").item(0).offsetHeight+15:document.getElementById(this.parent.id+"_contentdiv").getElementsByTagName("TABLE").item(0).offsetHeight;
			}
		}
		
		this.draw = function(){	
			// ����ʱ��ͳ��
		    var odate = new Date();
			var start = odate.getMilliseconds() + odate.getSeconds() * 1000;
			
			// ����Ƿ񴴽������
			var createdtable = this.contentdiv.getElementsByTagName("TABLE");
			
			var tablehtml = '<table id="tbl1" cellspacing="1" align="center" style="line-height:25px; font-size:12px;">';
			
			if(createdtable.length>0){
				// ��ȡ��ǰ���ı�ͷHTML����
				tablehtml += this.contentdiv.getElementsByTagName("TABLE").item(0).rows.item(0).outerHTML;
			}
			else{
				tablehtml += this.headHTML;
			}
			tablehtml += '</table>';
			this.contentdiv.innerHTML = tablehtml;
			// ��table���������� datatable ������
			this.contentdiv.getElementsByTagName("TABLE").item(0).datatable = this;
			// ��ȡ������
			var tableobj = this.contentdiv.getElementsByTagName("TABLE").item(0);
			// ׷��Tbody����
			var tbodyobj = document.createElement("TBODY");
			tableobj.appendChild(tbodyobj);
			
	    	if(this.data == null){
		    	// ���û�������򷵻�
	    		return null
	    	}  	
	    	for (var i = 0; i < this.data.length; i++) {	
	    		var ruScopeSub = this.data[i];
	    		//��һ�㣬ruScopeSub���������
	    		var trobj = document.createElement("TR");
	    		//д���������Ϣ
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
					// ���ѡ����
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
					// ѡ�е�ǰ��
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
				//�����Ԫ��
				td1.appendChild(document.createTextNode(ruScopeSub.scopesubname));
				trobj.appendChild(td1);
	    		//д�����������Ϣ
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
			//�������Ƶ�Ԫ��
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
				// ���ѡ����
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
				// ѡ�е�ǰ��
				this.data.checked = true;
				this.parent.checked = true;
				datatable.draw();
			}
	   		td2.appendChild(ruScopeItembtn);
	   		
			td2.appendChild(document.createTextNode('����'+ruScopeItem.sequenceno));
			trobj.appendChild(td2);
			//����Ԫ��־��Ԫ��
			var td3 = document.createElement("TD");
			td3.appendChild(document.createTextNode(ruScopeItem.elementcodeStr));
			trobj.appendChild(td3);
			//�Ƿ������Ԫ��
			var td4 = document.createElement("TD");
			td4.appendChild(document.createTextNode(ruScopeItem.isincludeStr));
			trobj.appendChild(td4);
			//ƥ�������Ԫ��
			var td5 = document.createElement("TD");
			td5.appendChild(document.createTextNode(ruScopeItem.matchtypeidStr));
			trobj.appendChild(td5);
			if(itemrowspanNum > 1){
				td2.rowSpan = itemrowspanNum;
				td3.rowSpan = itemrowspanNum;
				td4.rowSpan = itemrowspanNum;
				td5.rowSpan = itemrowspanNum;
			}
			 
			//д��ֵ��Ϣ
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
			//��ȡѡ��
			var rows = this.data;
			// ���ѡ����
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
				alert("����ѡ��һ��������");
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
				alert("����ѡ��һ�������");
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
				alert("����ѡ��һ��������");
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
				alert("����ѡ��һ��������");
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
						alert("����ѡ��һ��������");
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

	//����ruScopeSub���ж�������Ϣ
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
	
	//����ruScopeItem���ж�������Ϣ
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
        //window.open(url, "��������", features); 
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
		
		//��װ����
		var isinclude = subwindow.document.getElementsByName("isinclude");  
	    for(var i=0;i<isinclude.length;i++){  
	        if(isinclude[i].checked == true){  
	        	subwindow.ruScopeItem.isinclude = isinclude[i].value;
	        }
	    }
		if(isinclude.value == 1){
			subwindow.ruScopeItem.isincludeStr = "����";
		}else{
			subwindow.ruScopeItem.isincludeStr = "�ų�";
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
					<span><span title="����������" class="add_btn"
						onclick="ruleconfig.appendRuScopeSub()"
						onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
						onmousedown="doChangeBg1(this)"><a href="#">����������</a> </span> </span>
					<span><span title="ɾ��������" class="del_btn"
						onclick="ruleconfig.deleteRuScopeSub()"
						onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
						onmousedown="doChangeBg1(this)"><a href="#">ɾ��������</a> </span> </span>
					<span><span title="��������" class="add_btn"
						onclick="ruleconfig.appendRuScopeItem()"
						onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
						onmousedown="doChangeBg1(this)"><a href="#">��������</a> </span> </span>
					<span><span title="�޸�����" class="mod_btn"
						onclick="ruleconfig.changeRuScopeItem()"
						onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
						onmousedown="doChangeBg1(this)"><a href="#">�޸�����</a> </span><span>��</span>
					</span>
					<span><span title="ɾ������" class="del_btn"
						onclick="ruleconfig.deleteRuScopeItem()"
						onmouseover="doChangBg(this)" onmouseout="doReturn(this)"
						onmousedown="doChangeBg1(this)"><a href="#">ɾ������</a> </span> </span>
					<br />
					ע�����������֮���ǻ�Ĺ�ϵ������������������Ϊ���Ĺ�ϵ����������ȫ������Ϊһ������
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
