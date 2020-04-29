String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
}
var pubParentDiv;
var pubParent;
var pUrl;
var pubTreeObj;
elementTree = function() {
	// 查询要素来源的数据接口
	this.url = '/system/faspdatasource/getjsonelementaction.do';

	// 要素编码
	this.elementcode = '';

	// 显示在页面中的元素引用
	this.oDiv = null;

	// 树对象
	this.tree = null;

	// 选中项
	this.selected = "";
	// =0&conditionid=qingdaodepartmentdivision200801copy2009
	// qingdaodepartmentdivision200801copy2009_treewindow
	// 2008-11-11 yuanxin;过滤要素当前选中值
	this.filterElementSelectedValues = "";

	// 错误处理方法
	this.onError = null;

	// 显示树的方法
	this.show = function() {
		// 发送后台请求的对象
		var xmlHttp = creNewRequest();
		var parentDiv = this.oDiv;
		pubParentDiv = this.oDiv;
		var parent = this;
		pubParent = this;
		var selected = this.selected;
		// 2009-05-05 yuanxin;解决展开选中值节点的问题
		var treeObj = this;
		var waitDiv = document.createElement("DIV");
		var errorfunc = this.onError;
		var queryelementcode = this.elementcode;
		pUrl = this.url;
		// 过滤要素sql
		var filterElementSQL = "";
		if (document.getElementById("sql2")) {
			filterElementSQL = document.getElementById("sql2").value;
		}
		if (this.elementcode == '') {
			alert("没有制定要素编码");
		} else {
			xmlHttp.onreadystatechange = function() {
				if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
					if(parentDiv.offsetHeight ==0 || parentDiv.offsetWidth ==0){
						waitDiv.style.height = "196";
						waitDiv.style.width = "196";
					}else{
						waitDiv.style.height = parentDiv.offsetHeight - 10;
						waitDiv.style.width = parentDiv.offsetWidth - 10;
					}
					waitDiv.style.textAlign = "center";
					waitDiv.style.overflow = "hidden"
					parentDiv.appendChild(waitDiv);
					var waitImg = document
							.createElement("<img style='margin-top:"
									+ parentDiv.offsetHeight / 2 + "px ' src='"
									+ PATH_PREFIX + "/images/done_btn/loading.gif'>");
					waitDiv.appendChild(waitImg);
					if ("".localeCompare(filterElementSQL) != 0) {
						xmlHttp.open('POST', this.url + "?t=" + Math.random(),
								true);
					}
					try {
						eval("var result=" + xmlHttp.responseText);
						waitDiv.removeNode(true);
						if (result.success) {
							var start = new Date();
							var queryBlurring1 = '<input type="text" name="'
									+ parentDiv.id
									+ '_query" id="'
									+ parentDiv.id
									+ '_query" value="" size=11%/>&nbsp;<select id="queryTreeSelected" name="queryTreeSelected"><option value="querycode">编码</option><option value="queryname">名称</option></select>&nbsp;<input type="button" value="查询" onclick="queryTreeBluring(\''
									+ queryelementcode + '\',\'' + parentDiv.id
									+ '\')"/>';
							parentDiv.innerHTML = '<div id="'
									+ parentDiv.id
									+ '_tree" style="width:'
									+ (parentDiv.offsetWidth - 4)
									+ 'px; height:'
									+ (parentDiv.offsetHeight - 65)
									+ 'px;padding:0px;overflow-y:auto;"></div>'
									+ queryBlurring1
									+ '<div style="border-top:1px solid #666666;margin-top:2px;padding-top:2px;height:20px;" align="right"><input type="button" value="确定" onclick="closeDiv111(\''
									+ parentDiv.id
									+ '_tree\')"><input type="button" value="全选" onclick="selectAll(\''
									+ parentDiv.id
									+ '_tree\')"><input type="button" value="清空" onclick="clearTreeSelected(\''
									+ parentDiv.id + '_tree\')"></div>'

							parent.tree = new Zapatec.Tree({
										quick : true,
										parent : parentDiv.id + "_tree",
										source : result.tree,
										sourceType : "json",
										expandOnLabelClick : true,
										highlightSelectedNode : true,
										putCheckboxes : true,
										eventListeners : {
											// 'select': function(){var
											// node=this;if(node.data.isChecked){node.checkboxChanged(false)}else{node.checkboxChanged(true)}}
											'labelRightClick' : function() {
												if (this.hasSubtree()) {
													createSelectAllDiv(this);
												}
											}

										}
									});
							document.getElementById(parentDiv.id + "_tree").tree = parent.tree;
							// pubParentDiv=parentDiv;
							// pubParent=parent;
							// 2009-05-05 yuanxin;解决展开选中值节点的问题
							treeObj.tree = parent.tree;
							treeObj.getExpandWithCode();
							var end = new Date();
							// alert(((end.getSeconds()-start.getSeconds())*1000+(end.getMilliseconds()-start.getMilliseconds())))

						} else {
							// 如果定义异常处理函数则调用该函数，并返回错误信息
							if (errorfunc) {
								errorfunc(result.message);
							} else {
								alert(result.message);
							}
						}
					} catch (e) {
						var edebug = "";
						for(var evar in e){
							edebug+=evar+"="+e[evar]+"\n";
						}
						alert("该要素还没有导入数据!"+edebug);
						var waitDivChild = waitDiv.children(0);
						waitDiv.removeChild(waitDivChild);
					}
				}

			}
			if ("".localeCompare(filterElementSQL) == 0) {
				xmlHttp.open('POST', this.url + "?t=" + Math.random(), true);
			}
			var selConditionRelationJson = Object.toJSON(selectConditions);
			xmlHttp.setRequestHeader("Content-Type",
					"application/x-www-form-urlencoded");
			xmlHttp.send('code=' + this.elementcode + '&selected=' + selected
					+ '&filterElementSQL=' + filterElementSQL
					+ '&filterElementSelectedValues='
					+ this.filterElementSelectedValues
					+ "&selConditionRelationJson=" + selConditionRelationJson);

		}
	};

	this.getExpandWithCode = function() {
		// 2009-05-04 yuanxin;展开树的所有选中节点
		// 读取树的所有结点
		var allnode = this.tree.findAll(function(node) {
					return true;
				});
		for (var i = 0; i < allnode.length; i++) {
			var node = allnode[i];
			if (node.data.isChecked && node.getState().isExpanded == false) {
				node.expand();
				this.getExpandWithCode();
			}
		}
	}

	this.getSelected = function() {
		if (this.tree == null)
			return null;
		// this.getExpandWithCode();
		var result = this.tree.findAll(function(node) {
					return node.data.isChecked;
				});

		if (result == null || result.length == 0) {
			return "";
		} else {
			var content = [];
			for (var ii = 0; ii < result.length; ii++) {
				var str = result[ii].data.label.replace(/\n/g, "").replace(
						/^\s*/, "").replace(/\s*$/, "");
				// songfupeng 20100322 显示以格式以code_name
				var strList = str.split(":");
				var strValue = strList[0] + "-" + strList[1];
				content.push(strValue);
				// content.push(str.substring(0,str.indexOf(':')));
			}
			return content.join(",");
		}
	}

	this.getSelected2 = function() {
		if (this.tree == null)
			return null;
		var result = this.tree.findAll(function(node) {
					return node.data.isChecked;
				});

		if (result == null || result.length == 0) {
			return "";
		} else {
			var content = [];
			for (var ii = 0; ii < result.length; ii++) {
				var str = result[ii].data.label.replace(/\n/g, "").replace(
						/^\s*/, "").replace(/\s*$/, "");
				content.push(str);
			}
			return content.join(",");
		}
	}
}
// 模糊查询 SongFP 090313
function queryTreeBluring(queryElementCode, parentDiv_id) {
	var xmlHttp = creNewRequest();
	var url = '';
	if (pUrl.indexOf(PATH_PREFIX) < 0) {
		url += PATH_PREFIX + pUrl;
	}
	url = pUrl;

	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			eval("var result=" + xmlHttp.responseText);
			if (result.success) {
				var start = new Date();
				var queryBlurring1 = '<input type="text" name="'
						+ parentDiv_id
						+ '_query" id="'
						+ parentDiv_id
						+ '_query" value="" size=11%/>&nbsp;<select id="queryTreeSelected" name="queryTreeSelected"><option value="querycode">编码</option><option value="queryname">名称</option></select>&nbsp;<input type="button" value="查询" onclick="queryTreeBluring(\''
						+ queryElementCode + '\',\'' + pubParentDiv.id
						+ '\')"/>';
				pubParentDiv.innerHTML = '<div id="'
						+ pubParentDiv.id
						+ '_tree" style="width:'
						+ (pubParentDiv.offsetWidth - 4)
						+ 'px; height:'
						+ (pubParentDiv.offsetHeight - 65)
						+ 'px;padding:0px;overflow-y:auto;"></div>'
						+ queryBlurring1
						+ '<div style="border-top:1px solid #666666;margin-top:2px;padding-top:2px;height:20px;" align="right"><input type="button" value="确定" onclick="closeDiv111(\''
						+ pubParentDiv.id
						+ '_tree\')"><input type="button" value="全选" onclick="selectAll(\''
						+ pubParentDiv.id
						+ '_tree\')"><input type="button" value="清空" onclick="clearTreeSelected(\''
						+ pubParentDiv.id + '_tree\')"></div>'

				pubParent.tree = new Zapatec.Tree({
							quick : true,
							parent : pubParentDiv.id + "_tree",
							source : result.tree,
							sourceType : "json",
							expandOnLabelClick : true,
							highlightSelectedNode : true,
							putCheckboxes : true,
							eventListeners : {
				// 'select': function(){var
				// node=this;if(node.data.isChecked){node.checkboxChanged(false)}else{node.checkboxChanged(true)}}
							}
						});
				document.getElementById(parentDiv_id + "_tree").tree = pubParent.tree;
				var end = new Date();
				// alert(((end.getSeconds()-start.getSeconds())*1000+(end.getMilliseconds()-start.getMilliseconds())))
			} else {
				alert(result.message);
			}
		}
	}
	var strvalue = document.getElementById(parentDiv_id + "_query").value;
	var queryTreeSelected = document.getElementById("queryTreeSelected").value;

	var queryParame = "&" + queryTreeSelected + "=" + strvalue;
	xmlHttp.open('POST', url, true);
	xmlHttp.setRequestHeader("Content-Type",
			"application/x-www-form-urlencoded;charset=UTF-8");
	xmlHttp.send('code=' + queryElementCode + queryParame);
}
elementTreeCustom = function() {
	// 查询要素来源的数据接口
	this.url = '/system/faspdatasource/getjsoncustomelementaction.do';

	// 要素编码
	this.elementcode = '';

	// 显示在页面中的元素引用
	this.oDiv = null;

	// 发送后台请求的对象
	var xmlHttp = creNewRequest();

	// 树对象
	this.tree = null;

	// 选中项
	this.selected = "";

	// 2008-11-11 yuanxin;过滤要素当前选中值
	this.filterElementSelectedValues = "";

	// 错误处理方法
	this.onError = null;

	// 显示树的方法
	this.show = function() {
		var parentDiv = this.oDiv;
		var parent = this;
		var selected = this.selected;
		var waitDiv = document.createElement("DIV");
		var errorfunc = this.onError;

		// 过滤要素sql
		var filterElementSQL = "";
		if (document.getElementById("sql2")) {
			filterElementSQL = document.getElementById("sql2").value;
		}
		if (this.elementcode == '') {
			alert("没有制定要素编码");
		} else {
			waitDiv.style.height = parentDiv.offsetHeight - 10;
			waitDiv.style.width = parentDiv.offsetWidth - 10;
			waitDiv.style.textAlign = "center";
			waitDiv.style.overflow = "hidden"
			parentDiv.appendChild(waitDiv);
			var waitImg = document.createElement("<img style='margin-top:"
					+ parentDiv.offsetHeight / 2 + "px ' src='" + PATH_PREFIX
					+ "/images/done_btn/loading.gif'>");
			waitDiv.appendChild(waitImg);
			if ("".localeCompare(filterElementSQL) != 0) {
				xmlHttp.open('POST', this.url + "?t=" + Math.random(), true);
			}

			xmlHttp.onreadystatechange = function() {
				if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
					eval("var result=" + xmlHttp.responseText);
					waitDiv.removeNode(true);
					if (result.success) {
						var start = new Date();
						parentDiv.innerHTML = '<div id="' + parentDiv.id
								+ '_tree" style="width:'
								+ (parentDiv.offsetWidth - 4) + 'px; height:'
								+ (parentDiv.offsetHeight - 30)
								+ 'px;padding:0px;overflow-y:auto;"></div>'
						parent.tree = new Zapatec.Tree({
									quick : true,
									parent : parentDiv.id + "_tree",
									source : result.tree,
									sourceType : "json",
									expandOnLabelClick : true,
									highlightSelectedNode : true,
									putCheckboxes : false,
									eventListeners : {
										'select' : tree_select
									}
								});
						document.getElementById(parentDiv.id + "_tree").tree = parent.tree
						var end = new Date();
						// alert(((end.getSeconds()-start.getSeconds())*1000+(end.getMilliseconds()-start.getMilliseconds())))

					} else {
						// 如果定义异常处理函数则调用该函数，并返回错误信息
						if (errorfunc) {
							errorfunc(result.message);
						} else {
							alert(result.message);
						}
					}
				}
			}
			if ("".localeCompare(filterElementSQL) == 0) {
				xmlHttp.open('POST', this.url + "?t=" + Math.random(), true);
			}

			xmlHttp.setRequestHeader("Content-Type",
					"application/x-www-form-urlencoded");
			xmlHttp.send('code=' + this.elementcode + '&selected=' + selected
					+ '&filterElementSQL=' + filterElementSQL
					+ '&filterElementSelectedValues='
					+ this.filterElementSelectedValues);
		}
	};

	this.getSelected = function() {

		if (this.tree == null)
			return null;
		var result = this.tree.findAll(function(node) {
					return node.data.isChecked;
				});

		if (result == null || result.length == 0) {
			return "";
		} else {
			var content = [];
			for (var ii = 0; ii < result.length; ii++) {
				var str = result[ii].data.label.replace(/\n/g, "").replace(
						/^\s*/, "").replace(/\s*$/, "");
				content.push(str.substring(0, str.indexOf(':')));
			}
			return content.join(",");
		}
	}

	this.getSelected2 = function() {
		if (this.tree == null)
			return null;
		var result = this.tree.findAll(function(node) {
					return node.data.isChecked;
				});

		if (result == null || result.length == 0) {
			return "";
		} else {
			var content = [];
			for (var ii = 0; ii < result.length; ii++) {
				var str = result[ii].data.label.replace(/\n/g, "").replace(
						/^\s*/, "").replace(/\s*$/, "");
				content.push(str);
			}
			return content.join(",");
		}
	}
}
var selectObj = new Object();
function tree_select() {
	var node = this;
	getCustomElement(node.data.label);
}
function clearTreeSelected(parentDivId) {
	var treeObj = document.getElementById(parentDivId).tree;
	if (treeObj == null)
		return;

	var result = treeObj.findAll(function(node) {
				if (node.data.isChecked) {
					node.checkboxChanged();
				}
				return false;
			});
}

function selectAll(parentDivId) {
	var treeObj = document.getElementById(parentDivId).tree;
	if (treeObj == null)
		return;

	var result = treeObj.findAll(function(node) {
				if (!node.data.isChecked) {
					node.checkboxChanged(true);
				}
				return false;
			});
}

function closeDiv111(parentDivId) {
	document.getElementById(parentDivId).parentElement.style.display = "none";
	var oInput = document.getElementById(parentDivId).parentElement.associateInput;
	var scrObj = null;
	// songfupeng 20100621 点击"确定"后，保存的值
	var scrValue = "";
	for (var i = 0; i < selectConditions.length; i++) {
		var selectCondition = selectConditions[i];
		if (selectCondition.selConditionId == oInput.associateSelect.conditionid) {
			scrObj = selectCondition;
			break;
		}
	}
	if (oInput) {
		var oSelect = oInput.associateSelect;
		var tree = document.getElementById(parentDivId).parentElement.tree;
		var result = tree.getSelected();
		if (result != null) {
			oInput.value = result;
			var optionlist = result.split(",");
			var options = oSelect.options;
			for (var i = 0; i < options.length;) {
				oSelect.removeChild(options.item(0));
			}
			for (var i = 0; i < optionlist.length; i++) {
				// songfupeng 20100322 处理option以code_name格式的值，处理后将code传到后台
				var valueStrList = optionlist[i].split("-");
				var option = document.createElement("<option value='"
						+ valueStrList[0] + "' selected></option>");
				scrValue += valueStrList[0];
				if (i + 1 < optionlist.length) {
					scrValue += ",";
				}
				oSelect.options.add(option);
			}
		}
	}
	scrObj.selConditionValue = scrValue;
}
// songfupeng 20100128 单击鼠标右键，显示"选择全部"
var treeOpopupMenu = window.createPopup();
// songfupeng 20100128 定义全局变量，用于存放点击右键时选择的节点
var selectedTreeObj;
function createSelectAllDiv(eobj) {
	selectedTreeObj = eobj;
	var oPopupBody = treeOpopupMenu.document.body;
	var obj = event.srcElement;
	// 屏蔽鼠标右键
	obj.oncontextmenu = function() {
		return false;
	};
	// songfupeng 20100128 获取鼠标位置
	var mousePos = mousePosition(event);
	// songfupeng 20100128 菜单背景
	var menuBankgroundDiv = initMenuBankgroundDiv();
	// songfupeng 20100128 给右键div赋初值
	// debugger;
	var menuBankgroundOfChildDiv = initMenuBankgroundDivOfChild(eobj, "选择全部");
	menuBankgroundDiv.appendChild(menuBankgroundOfChildDiv);
	oPopupBody.innerHTML = menuBankgroundDiv.outerHTML;
	treeOpopupMenu.show(mousePos.x, mousePos.y + 10, 70, 30, document.body);

}
// 计算鼠标位置
function mousePosition(ev) {
	if (ev.pageX || ev.pageY) {
		return {
			x : ev.pageX,
			y : ev.pageY
		};
	}
	/*
	 * return { x:ev.clientX + document.body.scrollLeft -
	 * document.body.clientLeft, y:ev.clientY + document.body.scrollTop -
	 * document.body.clientTop };
	 */
	// songfupeng 获取鼠标的位置
	return {
		x : ev.clientX + document.documentElement.scrollLeft,
		y : ev.clientY + document.documentElement.scrollTop
	};

}
// songfupeng 20100128 初始化单击右键菜单背景层
function initMenuBankgroundDiv() {
	var menuBankgroundDiv = document.createElement("div");
	with (menuBankgroundDiv) {
		style.backgroundColor = "#D4D0C8";
		style.borderTopColor = "#FFFFFF";
		style.borderRightColor = "#C9C9C9";
		style.borderBottomColor = "#C9C9C9";
		style.borderLeftColor = "#FFFFFF";

		style.height = "17px";
		style.width = "70px";
		style.borderTopWidth = "2px";
		style.borderRightWidth = "2px";
		style.borderBottomWidth = "2px";
		style.borderLeftWidth = "2px";

		style.borderRightStyle = "outset";
		style.borderBottomStyle = "outset";
		style.borderTopStyle = "outset";
		style.borderLeftStyle = "outset";

		style.fontSize = "12px";
	}
	return menuBankgroundDiv;
}

// songfupeng 20100128 初始化子菜单
function initMenuBankgroundDivOfChild(eobj, context) {
	var mbChildDiv = document.createElement("div");
	var childInnerHTML = "<div id='popChild'style=\"margin-top: 4px; margin-right: 2px; margin-bottom: 8px; margin-left: 2px; color: #000000\""
			+ " onmouseover=\"this.style.background='#000099';this.style.color='#FFFFFF';this.style.cursor='default'\""
			+ " onmouseout=\"this.style.background='#cccccc';this.style.color='#000000';\""
			+ " onclick=\"parent.checkedallchild()\">"
			+ "&nbsp;"
			+ context
			+ "&nbsp;" + "</div>";

	mbChildDiv.innerHTML = childInnerHTML;
	return mbChildDiv;
}
// songfupeng 20100128 关闭菜单
function colseMenuBankgroundDiv() {
	treeOpopupMenu.hide();
}
// 选中当前节点所有子节点
function checkedallchild() {
	selectedTreeObj.expandBranchs();
	selectedTreeObj.checkboxChanged(true);
	colseMenuBankgroundDiv();
}
var selectsearchcolumnTRcolor = "#66FFFF";
window.attachEvent("onload", initSelectSearchColumn);
var selectConditions = [];

function initSelectSearchColumn() {
	var selectlist = document.getElementsByTagName("SELECT")

	for (var i = 0; i < selectlist.length; i++) {
		if (selectlist[i].id == "selectsearchcolumn"
				&& selectlist[i].type == "select") {
			// 树型列表
			buildMultiSearchColumn(selectlist[i]);
		} else if (selectlist[i].id == "selectsearchcolumn"
				&& selectlist[i].type == "list") {
			// 普通列表
			buildListSearchColumn(selectlist[i]);
		}
	}
}

var pubInput;
function buildMultiSearchColumn(obj) {
	var input = document.createElement("<INPUT TYPE='" + obj.name
			+ "' VALUE='' readOnly>");
	var hiddenDiv = document.createElement("<div style='display:none'></div>");
	input.associateSelect = obj;
	obj.associateInput = input;
	input.className = obj.className;
	obj.insertAdjacentElement("beforeBegin", input);
	obj.insertAdjacentElement("beforeBegin", hiddenDiv);
	hiddenDiv.insertAdjacentElement("afterBegin", obj);
	obj.style.display = "none";

	var opts = obj.options;
	var showvalue = ""
	for (var i = 0; i < opts.length; i++) {

		opt = opts(i);
		if (opt.selected) {
			if (opt.value != "")
				showvalue += opt.value + ",";
		}
	}
	// songfupeng 20100621初始查询条件的Id和值,并存放在selectConditions数组中
	var selectConditionObj = {
		selConditionId : "",
		selConditionValue : ""
	};
	// songfupeng 20100622 处理showvalue,只要code
	if (showvalue.length > 0) {
		var newShowValue = "";
		var showvalueArray = showvalue.split(",");
		for (var i = 0; i < showvalueArray.length; i++) {
			if (showvalueArray[i] == "") {
				break;
			}
			var codeNameArray = showvalueArray[i].split("-");
			var conditionCode = codeNameArray[0];
			newShowValue += conditionCode + ",";

		}
		selectConditionObj.selConditionValue = newShowValue.substring(0,
				newShowValue.length - 1);
	} else {
		selectConditionObj.selConditionValue = showvalue;
	}
	selectConditionObj.selConditionId = input.associateSelect.conditionid;
	selectConditions[selectConditions.length] = selectConditionObj;

	input.value = showvalue
	pubInput = input;
	input.treewindow = buildTreeWindow(input);
	input.onclick = showMultiSelectColumn;
}

var queryElementCode = "";
function buildTreeWindow(obj) {
	var oInput = obj;
	var ttop = oInput.offsetTop;
	var tleft = oInput.offsetLeft;

	while (oInput = oInput.offsetParent) {
		ttop += oInput.offsetTop;
		tleft += oInput.offsetLeft;
	}

	oInput = obj;
	var oDiv = document
			.createElement("<div id='"
					+ oInput.associateSelect.conditionid
					+ "_treewindow' style='position:absolute;width:200px;height:200px;display:none;padding:2px;background-color:#EEEEEE;border:1px solid #333333;z-index:1000'></div>");
	oDiv.associateInput = oInput;

	var tree = new elementTree();

	PATH_PREFIX = "";

	tree.url = PATH_PREFIX + '/salary/ajax/getqueryconditioninfoaction.do';
	tree.oDiv = oDiv;
	var conditionid = oInput.associateSelect.conditionid;
	if (conditionid == null) {
		return;
	} else {
		conditionid = "&conditionid=" + conditionid;
	}
	var templateid = oInput.associateSelect.templateid;
	if (templateid != null) {
		templateid = "&templateid=" + templateid
	} else {
		templateid = "";
	}
	tree.elementcode = "=0" + conditionid + templateid;
	tree.selected = oInput.value;
	oDiv.tree = tree;
	oDiv.isloaded = false;

	oDiv.show = function() {
		if (window.showtreewindow != null) {
			window.showtreewindow.close();
		}
		var oInput = this.associateInput;
		var ttop = oInput.offsetTop;
		var tleft = oInput.offsetLeft;
		var oDiv = this;

		while (oInput = oInput.offsetParent) {
			ttop += oInput.offsetTop;
			tleft += oInput.offsetLeft;
		}
		this.style.top = 300;
		this.style.left = tleft-195;
		this.style.display = "";
		if (!this.isloaded) {
			tree.onError = function() {
				var oWaitDiv = oDiv;

				oWaitDiv.isloaded = false;
				oWaitDiv.close();
				alert("无法获取该条件内容！");
			}
			// this.tree.show();
			this.isloaded = true;
		}
		// songfupeng 20090721 修改高级查询
		this.tree.show();
		window.showtreewindow = this;
	}
	oDiv.close = function() {
		this.style.display = "none";
		var oInput = this.associateInput;
		var oSelect = oInput.associateSelect;
		var tree = this.tree;
		var result = tree.getSelected();
		if (result != null) {
			oInput.value = result;
			var optionlist = result.split(",");
			var options = oSelect.options;
			for (var i = 0; i < options.length;) {
				oSelect.removeChild(options.item(0));
			}
			for (var i = 0; i < optionlist.length; i++) {
				var option = document.createElement("<option value='"
						+ optionlist[i] + "' selected></option>");
				oSelect.options.add(option);
			}
		}
		window.showtreewindow = null;
	}
	obj.insertAdjacentElement("beforeBegin", oDiv);
	return oDiv;
}

function showMultiSelectColumn() {
	this.treewindow.show();
	var treewindow = this.treewindow
	var input = this;
	document.body.onmousedown = function() {
		var obj = event.srcElement;
		if (event.srcElement == input)
			return;

		if (!treewindow.contains(event.srcElement)) {
			if(window.showtreewindow != null){
				window.showtreewindow.close();
			}
			document.body.onmousedown = null;
		}
	};

	var input = this;
	this.select()
}

function buildListSearchColumn(oSelect) {
	var oInput = document.createElement("<INPUT TYPE='" + oSelect.name
			+ "' VALUE='' readOnly>");
	var hiddenDiv = document.createElement("<div style='display:none'></div>");

	oInput.associateSelect = oSelect;
	oSelect.associateInput = oInput;
	oInput.className = oSelect.className;
	oSelect.insertAdjacentElement("beforeBegin", oInput);
	oSelect.insertAdjacentElement("beforeBegin", hiddenDiv);
	hiddenDiv.insertAdjacentElement("afterBegin", oSelect);
	oSelect.style.display = "none";

	var opts = oSelect.options;
	var showvalue = ""
	for (var i = 0; i < opts.length; i++) {
		opt = opts(i);
		if (opt.selected) {
			if (opt.value != "")
				showvalue += opt.value + ",";
		}
	}
	// songfupeng 20100621初始查询条件的Id和值,并存放在selectConditions数组中
	var selectConditionObj = {
		selConditionId : "",
		selConditionValue : ""
	};

	// songfupeng 20100622 处理showvalue,只要code
	if (showvalue.length > 0) {
		var newShowValue = "";
		var showvalueArray = showvalue.split(",");
		for (var i = 0; i < showvalueArray.length; i++) {
			if (showvalueArray[i] == "") {
				break;
			}
			var codeNameArray = showvalueArray[i].split("-");
			var conditionCode = codeNameArray[0];
			newShowValue += conditionCode + ",";

		}
		selectConditionObj.selConditionValue = newShowValue.substring(0,
				newShowValue.length - 1);
	} else {
		selectConditionObj.selConditionValue = showvalue;
	}

	selectConditionObj.selConditionId = oInput.associateSelect.conditionid;
	selectConditions[selectConditions.length] = selectConditionObj;

	oInput.value = showvalue

	var xmlHttp = creNewRequest();
	var url = PATH_PREFIX + '/salary/ajax/getqueryconditionlistaction.do';
	var poststr = 'selected=' + showvalue + '&conditionid='
			+ oSelect.conditionid;
	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			var selectHTML = xmlHttp.responseText;
			// alert(selectHTML);
			var oDiv = document
					.createElement("<div id='"
							+ oSelect.conditionid
							+ "_listwindow' style='position:absolute;width:212px;height:230px;display:none;padding:2px;background-color:#EEEEEE;border:1px solid #333333;z-index:1000'></div>");
			oDiv.associateInput = oInput;
			oDiv.associateSelect = oInput.associateSelect;
			oInput.associateListWindow = oDiv;
			var queryBlurring = '<div style="height:20px;padding-top:1px;" align="left"><input type="text" name="queryBlurring" id="queryBlurring" value="" size=16/>&nbsp;&nbsp;<select id="queryTreeSelected1" name="queryTreeSelected1"><option value="querycode">编码</option><option value="queryname">名称</option></select>&nbsp;&nbsp;<input type="button" value="查询" onclick="this.parentElement.parentElement.queryBlurring()"/></div>';
			oDiv.innerHTML = '<select name="select" size="5" multiple="multiple" style="width:100%;height:180px;border:0px">'
					+ selectHTML
					+ '</select>'
					+ queryBlurring
					+ '<div style="border-top:1px solid #666666;padding-top:1px;height:20px;" align="right"><input type="button" value="确定" onclick="window.showtreewindow.close();"><input type="button" value="全选" onclick="this.parentElement.parentElement.selectAllList()"><input type="button" value="清空" onclick="this.parentElement.parentElement.clearListSelected()"></div>';

			oInput.onclick = function() {
				if (window.showtreewindow != null) {
					window.showtreewindow.close();
				}
				var oInput = this;
				var oDiv = this.associateListWindow;
				var ttop = oInput.offsetTop;
				var tleft = oInput.offsetLeft;

				while (oInput = oInput.offsetParent) {
					ttop += oInput.offsetTop;
					tleft += oInput.offsetLeft;
				}
				oDiv.style.top = this.getBoundingClientRect().bottom;
				if(document.body.clientHeight - this.getBoundingClientRect().bottom < 230){ //解决太靠下遮挡问题 jiazhiyu 2012-10-10
					var _msie=navigator.userAgent.toLowerCase().match(/msie (\d+)\./);
					var isIE6 = _msie?_msie[1]:7;
					var divHeight ;
					if(isIE6 == 6){
						divHeight = 278 ;
					}else {
						divHeight = 260 ;
					}
					oDiv.style.top = this.getBoundingClientRect().bottom - divHeight;
				}
				oDiv.style.left = tleft;
				oDiv.style.display = "";
				window.showtreewindow = this.associateListWindow;
				document.body.onmousedown = function() {
					var obj = event.srcElement;
					if (event.srcElement == oDiv.associateInput)
						return;

					if (!oDiv.contains(event.srcElement)) {
						window.showtreewindow.close();
						document.body.onmousedown = null;
					}
				};

				var selConditionRelationJson = Object.toJSON(selectConditions);
				var url = PATH_PREFIX + '/salary/ajax/getqueryconditionlistaction.do';
				var pars = 'selected=' + showvalue + '&conditionid='
						+ oSelect.conditionid + "&selConditionRelationJson="
						+ selConditionRelationJson;
				var myAjax = new Ajax.Request(url, {
					method : 'post',
					parameters : pars,
					onComplete : function(resp) {
						var newContext = resp.responseText;
						oDiv.innerHTML = '<select name="select" size="5" multiple="multiple" style="width:100%;height:180px;border:0px">'
								+ newContext
								+ '</select>'
								+ queryBlurring
								+ '<div style="border-top:1px solid #666666;padding-top:1px;height:20px;" align="right"><input type="button" value="确定" onclick="window.showtreewindow.close();"><input type="button" value="全选" onclick="this.parentElement.parentElement.selectAllList()"><input type="button" value="清空" onclick="this.parentElement.parentElement.clearListSelected()"></div>';
						document.body.insertAdjacentElement("beforeEnd", oDiv);
					},
					onFailure : function(resp) { // "resp" is just the
						// XMLHttpRequest object
						alert("操作失败！");
					}
				});
			}

			oDiv.close = function() {
				var oList = this.children.item(0);
				var opts = oList.options;
				var oSelect = this.associateSelect;
				var loop = oSelect.options.length
				var scrObj = null;
				// songfupeng 20100621 点击"确定"后，保存的值
				var scrValue = "";
				for (var i = 0; i < selectConditions.length; i++) {
					var selectCondition = selectConditions[i];
					if (selectCondition.selConditionId == oInput.associateSelect.conditionid) {
						scrObj = selectCondition;
						break;
					}
				}

				var showvalue = ""

				inText = "";
				for (; loop > 0; loop--) {
					oSelect.options.remove(loop - 1);
				}
				for (var i = 0; i < opts.length; i++) {

					opt = opts(i);
					if (opt.selected) {
						var oopt = opt.cloneNode();
						oopt.value = opt.text;
						oopt.selected = true;
						oSelect.options.add(oopt);
						if (opt.value != "") {
							showvalue += opt.text + ",";
						}
						inText += opt.value + ":" + opt.text + ",";
						scrValue += opt.value + ","
					}
				}
				this.associateInput.value = showvalue;
				this.style.display = "none";
				scrObj.selConditionValue = scrValue.substring(0,
						scrValue.length - 1);
			}

			oDiv.selectAllList = function() {
				var oList = this.children.item(0);
				var opts = oList.options;
				var loop = oSelect.options.length

				for (var i = 0; i < opts.length; i++) {
					opts[i].selected = true;
				}
			}

			oDiv.clearListSelected = function() {
				var oList = this.children.item(0);
				var opts = oList.options;
				var loop = oSelect.options.length
				for (var i = 0; i < opts.length; i++) {
					opts[i].selected = false;
				}
			}
			oDiv.queryBlurring = function() {
				var oList = this.children.item(1);
				var oinput = oList.children.item(0);
				var oselect = oList.children.item(1);
				var qeruyParameters = "&" + oselect.value + "=" + oinput.value;
				var url = PATH_PREFIX + '/salary/ajax/getqueryconditionlistaction.do';
				var pars = 'selected=' + showvalue + '&conditionid='
						+ oSelect.conditionid + qeruyParameters;
				var myAjax = new Ajax.Request(url, {
					method : 'post',
					parameters : pars,
					onComplete : function(resp) {
						var newContext = resp.responseText;
						oDiv.innerHTML = '<select name="select" size="5" multiple="multiple" style="width:100%;height:180px;border:0px">'
								+ newContext
								+ '</select>'
								+ queryBlurring
								+ '<div style="border-top:1px solid #666666;padding-top:1px;height:20px;" align="right"><input type="button" value="确定" onclick="window.showtreewindow.close();"><input type="button" value="全选" onclick="this.parentElement.parentElement.selectAllList()"><input type="button" value="清空" onclick="this.parentElement.parentElement.clearListSelected()"></div>';
						document.body.insertAdjacentElement("beforeEnd", oDiv);
					},
					onFailure : function(resp) { // "resp" is just the
						// XMLHttpRequest object
						alert("操作失败！");
					}
				});
			}
			document.body.insertAdjacentElement("beforeEnd", oDiv);
		}
	}

	xmlHttp.open('POST', url, true);
	xmlHttp.setRequestHeader("Content-Type",
			"application/x-www-form-urlencoded;charset=UTF-8");
	// debugger;
	xmlHttp.send(poststr);
}