// $Id: mouse.js 2091 2007-12-26 03:07:14Z wangdakui $

// ��չ�ַ����ķ���
String.prototype.trimMouse = function() {
	return this.replace(/(^[\s��]*)|([\s��]*$)/g, "");
}
if(typeof(PATH_PREFIX)=="undefined"){
	var PATH_PREFIX ="";
}
// ��չprototype����תJson����
// Object.prototype.toJSON = function(){
// var json = [];
// for(var i in this){
// if(!this.hasOwnProperty(i)) continue;
// json.push(
// i.toJSON() + " : " +
// ((this[i] != null) ? this[i].toJSON() : "null")
// )
// }
// return "{\n " + json.join(",\n ") + "\n}";
// }

// ������ʾ��굱ǰ��
var markobj = null;
function markColumn() {
	var eventobj = event.srcElement;
	while (eventobj != null && eventobj.tagName != "TR") {
		eventobj = eventobj.parentElement;
	}
	if (eventobj == null) {
		return;
	}
	if (this.contains(eventobj) && markobj != eventobj) {
		if (markobj != null) {
			// ɾ��ԭ��ʾ�е���ɫ
			markobj.runtimeStyle.backgroundColor = "";
		}
		// ���±�ʾ����������ɫ
		markobj = eventobj
		markobj.runtimeStyle.backgroundColor = "#FFFFAC";
	}
}

// ��קѡ����
function startDragSelect() {
	var tableobj = document.getElementById("contenttable");

	// y�û������Ҽ�,�����κδ���
	if (event.button == 2) {
		return;
	}

	var currentColumn;
	tableobj.onmousemove = function() {
		eventobj = event.srcElement;
		while (eventobj != null && eventobj.tagName != "TR") {
			eventobj = eventobj.parentElement;
		}
		if (eventobj == null) {
			return;
		}
		if (currentColumn != eventobj) {
			if (eventobj.selected == null) {
				eventobj.style.backgroundColor = "#FFCC66";
				eventobj.selected = true;

				var trObj = eventobj.parentElement.children;
				for (var i = 0; i < trObj.length; i++) {
					if (trObj.item(i) == eventobj) {
						var startnum = Math.floor(document
								.getElementById("scroll-y").scrollTop
								/ 50);
						var nownum = i + startnum;
						queryResult[nownum].selected = true;
					}
				}

				// ����Ҽ�����
				eventobj.oncontextmenu = function() {
					return false;
					var popwindow = window.createPopup();

					var oPopBody = popwindow.document.body;
					oPopBody.style.backgroundColor = "lightyellow";
					oPopBody.style.border = "solid black 1px";
					oPopBody.innerHTML = "<div style='text-align: center;font-size: 12px;padding: 3Px;cursor :hand' onmouseenter='document.body.style.backgroundColor=\"#86E7FF\"' onmouseout='document.body.style.backgroundColor=\"lightyellow\"' onclick='window.parent.document.getElementById(\"toExcel\").showSubGather()'>��ʾ����</div>";

					opop_x = getPos(this, "Left");
					opop_y = getPos(this, "Top");

					popwindow.show(event.offsetX, event.offsetY, 80, 20,
							event.srcElement);
				}
			} else {
				eventobj.style.backgroundColor = "";
				eventobj.selected = null;
				eventobj.oncontextmenu = null;

				var trObj = eventobj.parentElement.children;
				for (var i = 0; i < trObj.length; i++) {
					if (trObj.item(i) == eventobj) {
						var startnum = Math.floor(document
								.getElementById("scroll-y").scrollTop
								/ 50);
						var nownum = i + startnum;
						queryResult[nownum].selected = null;
					}
				}
			}
			currentColumn = eventobj;
		}
	} // tableobj.onmousemove

	tableobj.onmouseup = function() {
		tableobj.onmousemove = markColumn;
	}

	tableobj.onclick = tableobj.onmousemove
}

// ȡ�ö������������Ļ��λ��
function getPos(el, sProp) {
	var iPos = 0;
	while (el != null) {
		iPos += el["offset" + sProp];
		el = el.offsetParent;
	}
	return iPos;
}

function markColumn1() {
	var tableobj = document.getElementById("contenttable");
	var oItem = tableobj.tBodies.item(0);
	var trItem = oItem.children;
	for (var i = 0; i < trItem.length; i++) {
		if (trItem.item(i).selected) {
			var eventobj = trItem.item(i);
			eventobj.style.backgroundColor = "#FFCC66";
			eventobj.selected = true;
			// ����Ҽ�����
			eventobj.oncontextmenu = function() {
				var popwindow = window.createPopup();

				var oPopBody = popwindow.document.body;
				oPopBody.style.backgroundColor = "lightyellow";
				oPopBody.style.border = "solid black 1px";
				oPopBody.innerHTML = "<div style='text-align: center;font-size: 12px;padding: 3Px;cursor :hand' onmouseenter='document.body.style.backgroundColor=\"#86E7FF\"' onmouseout='document.body.style.backgroundColor=\"lightyellow\"' onclick='window.parent.document.getElementById(\"toExcel\").showSubGather()'>��ʾ����</div>";

				opop_x = getPos(this, "Left");
				opop_y = getPos(this, "Top");

				popwindow.show(event.offsetX, event.offsetY, 80, 20,
						event.srcElement);
			}
		}
	}
}

// �Ƿ�����ִ�б���ػ�
var funcrunning = false;

// �����������ͣ����磺��λ��֧�����ܷ��ࣩ
function checkGatherColumnType(i, colNumber, level, foldSymbol) {

	// �����Ҽ����������Ĵ���
	oPopupMenu.hide();
	// ��Ȿģ���Ƿ�����ϲ��Ļ����У�������������˳�����Ϊģ����ʱ��֧�ְ����ϲ������е�ģ���ѯҪ���¼����ݵĹ���
	// union���ں�̨��json���д�������
	if (union > 0) {
		return;
	}
	// ����ȫ�ֱ���rowNum:�����кţ�columnNumber:�����кţ�showLevel����ʾ����
	rowNum = parseInt(i);
	columnNumber = parseInt(colNumber);
	showLevel = parseInt(level);
	// ��ȡ��ǰ������
	var columnsTem = queryResult[i];
	// ��������
	var leftgatherColumnTem = columnsTem.gl;
	// �Ҳ������
	var rightgatherColumnTem = columnsTem.gr;
	// ��ȡ������ID,�Ա���ϳɲ�ѯ����:(ȫ�ֱ���)
	gatherColumns = new Array(leftgatherColumnTem.length
			+ rightgatherColumnTem.length);
	// ��ȡ������glColumn��ʶ�����������Ǹ������У�֧�����ܷ��໹�ǵ�λ������ȫ�ֱ�����
	canShowByLevel = new Array(leftgatherColumnTem.length
			+ rightgatherColumnTem.length);
	// canShowByAgencyLevel = new Array(leftgatherColumnTem.length +
	// rightgatherColumnTem.length);
	// ��ȡ�����еĲ���ṹ
	// codeFormats = new Array(leftgatherColumnTem.length +
	// rightgatherColumnTem.length);
	// ����ʾ�����ʱ��
	if (document.getElementById("showGatherColumnCode").checked) {
		var temp = 0;
		for (var i = 0; i < gatherColumnsJson.length; i++) {
			// ���������ж���
			gatherColumns[temp] = gatherColumnsJson[i].gatherColumnId + "_"
					+ gatherColumnsJson[i].showPlace;
			canShowByLevel[temp] = gatherColumnsJson[i];
			// canShowByAgencyLevel[temp] =
			// document.getElementById("gatherColumn"+i).scopeName;
			// codeFormats[temp] =
			// document.getElementById("gatherColumn"+i).nodeName;
			if (gatherColumnsJson[i].isShowCode == 1) {
				gatherColumns[temp + 1] = gatherColumnsJson[i].gatherColumnId
						+ "_" + gatherColumnsJson[i].showPlace;
				canShowByLevel[temp + 1] = gatherColumnsJson[i];
				// canShowByAgencyLevel[temp + 1] =
				// document.getElementById("gatherColumn"+i).scopeName;
				// codeFormats[temp + 1] =
				// document.getElementById("gatherColumn"+i).nodeName;
				temp += 2;
			} else {
				temp = i + 1;
			}
		}
		/*
		 * for(var i = 0;i < gatherColumns.length/2;i++){ gatherColumns[temp] =
		 * gatherColumnsJson[i].gatherColumnId; canShowByLevel[temp] =
		 * gatherColumnsJson[i]; //canShowByAgencyLevel[temp] =
		 * document.getElementById("gatherColumn"+i).scopeName;
		 * //codeFormats[temp] =
		 * document.getElementById("gatherColumn"+i).nodeName;
		 * gatherColumns[temp + 1] = gatherColumnsJson[i].gatherColumnId;
		 * canShowByLevel[temp + 1] = gatherColumnsJson[i];
		 * //canShowByAgencyLevel[temp + 1] =
		 * document.getElementById("gatherColumn"+i).scopeName;
		 * //codeFormats[temp + 1] =
		 * document.getElementById("gatherColumn"+i).nodeName; temp += 2; }
		 */
	} else {
		for (var i = 0; i < gatherColumns.length; i++) {
			gatherColumns[i] = gatherColumnsJson[i].gatherColumnId + "_"
					+ gatherColumnsJson[i].showPlace;
			canShowByLevel[i] = gatherColumnsJson[i];
			// canShowByAgencyLevel[i] =
			// document.getElementById("gatherColumn"+i).scopeName;
			// codeFormats[i] =
			// document.getElementById("gatherColumn"+i).nodeName;
		}
	}

	// �жϵ�ǰ��������֧�����ܷ��໹�ǵ�λ;���������֮һ�ͼ���ִ�У�������Ǿ��˳�����
	if (canShowByLevel[columnNumber].totleDepth > 0) {
		// �ж�����ѽ������¼����ݣ���ɾ�����¼�����; rowNum + 1:��ǰ�����ݵ���һ������
		// ��¼ɾ���¼����ݵ�������;breakΪֻɾ����ǰ���ݵ��¼�����
		// �ϼ��е�Ĭ�ϴ���Ϊ"0";С���е�Ĭ�ϴ���Ϊ""
		var code = "0";
		var code2 = "";
		var delRowNum = rowNum;
		// ���ϼ�������С�ơ�С�ƻ�ϼ�ʱ��˫����һ��ʱ��ִ�з��ز���
		if (code.localeCompare(queryResult[rowNum].gl[0].c) == 0
				|| code2.localeCompare(queryResult[rowNum].gl[columnNumber].c) == 0
				&& rowNum == 0) {
			return;
		}
		// С���в��ܱ�������ѯ�¼�����
		if (code2.localeCompare(queryResult[rowNum].gl[columnNumber].c) == 0) {
			return;
		}
		// �ж��Ƿ��Ǻϼƺ�С��
		// if (code.localeCompare(queryResult[0].gl[0].c) == 0 &&
		// code2.localeCompare(queryResult[1].gl[columnNumber].c) == 0){
		// delRowNum = rowNum + 1;
		// }
		// ��ǰҪ�ص��кϲ���
		var mergerNuber = queryResult[rowNum].gl[columnNumber].rsp;
		// ��¼�ܹ�ɾ���˼�������
		var delRow = 0;

		// �����ǲ�ѯҪ��ȫ���¼�����ʱ������ǰҪ�����¼�����ʱ��ɾ�����¼����ݲ����ٲ�ѯ��ȫ���¼����ݣ���֮ɾ���¼�����֮����ȥ��ѯ�������¼�����
		if (!queryChildren) {
			for (var j = delRowNum + mergerNuber; j < queryResult.length; j++) {
				nextRowLevel = parseInt(queryResult[j].gl[columnNumber].l);
				if (nextRowLevel > showLevel) {
					delete queryResult[j];
					delRow += 1;
				} else {
					break;
				}
			}
		}
		if (delRow > 0) {
			for (var k = delRowNum + mergerNuber; k < queryResult.length
					- delRow; k++) {
				queryResult[k] = queryResult[k + delRow];
			}
			queryResult.length -= delRow;

			// ����������кϲ�����
			// ����ǰ�������Ǵӵڶ��п�ʼ�Ļ�����ʱ����ǰ��Ļ�������Ҫ�����кϲ�����

			if (columnNumber >= 1) {
				var columnNumberTem = columnNumber - 1;
				// ����ʾ����ʱ
				if (document.getElementById("showGatherColumnCode").checked) {
					// ����ѯҪ�������ֻ�����ʱ
					if (queryResult[rowNum].gl[columnNumber].c
							.localeCompare(queryResult[rowNum].gl[columnNumber
									- 1].c) == 0) {
						columnNumberTem = columnNumber - 2;
					} else {
						columnNumberTem = columnNumber - 1;
					}
				}
				for (var mm = columnNumberTem; mm >= 0; mm--) {
					var minRowNum = rowNum;
					var maxRowNum = rowNum;
					// Ϊ������ʾ����ʱ�ṩ���������õı���
					var minColumnSize = 0;
					var mmTemp = mm - 1;
					// ����ʾ����ʱ
					if (document.getElementById("showGatherColumnCode").checked) {
						minColumnSize = 1;
						mmTemp = mm - 2;
					}

					// ���Һϲ������е�����к�
					for (var i = rowNum + 1; i < queryResult.length; i++) {
						// �ϲ��д���
						var mergerCode = queryResult[i].gl[mm].c;
						if (mm > minColumnSize) {
							if (mergerCode
									.localeCompare(queryResult[rowNum].gl[mm].c) == 0
									&& queryResult[i].gl[mmTemp].c
											.localeCompare(queryResult[rowNum].gl[mmTemp].c) == 0) {
								maxRowNum += 1;
							} else {
								break;
							}
						} else {
							if (mergerCode
									.localeCompare(queryResult[rowNum].gl[mm].c) == 0) {
								maxRowNum += 1;
							} else {
								break;
							}
						}
					}
					// ���Һϲ������е���С�к�
					for (var j = rowNum - 1; j >= 0; j--) {
						// �ϲ��д���
						var mergerCode = queryResult[j].gl[mm].c;
						if (mm > minColumnSize) {
							if (mergerCode
									.localeCompare(queryResult[rowNum].gl[mm].c) == 0
									&& queryResult[j].gl[mmTemp].c
											.localeCompare(queryResult[rowNum].gl[mmTemp].c) == 0) {
								minRowNum -= 1;
							} else {
								break;
							}
						} else {
							if (mergerCode
									.localeCompare(queryResult[rowNum].gl[mm].c) == 0) {
								minRowNum -= 1;
							} else {
								break;
							}
						}

					}
					// �޸Ļ������кϲ�
					for (var k = minRowNum; k < maxRowNum + 1; k++) {
						queryResult[k].gl[mm].rsp = maxRowNum - k + 1;
					}
				}
			}

			filltable();
			// return;
		}// (if (delRow > 0))���ɾ�����¼�����

		// ����ǲ�ѯҪ�������¼����ݣ����Ȱ�Ҫ�ص������Ѿ����ڵ��¼�����ɾ��
		// debugger;
		if (queryChildren) {
			for (var j = delRowNum + mergerNuber; j < queryResult.length; j++) {
				nextRowLevel = parseInt(queryResult[j].gl[columnNumber].l);
				if (nextRowLevel > parseInt(queryResult[rowNum].gl[columnNumber].l)) {
					delete queryResult[j];
					delRow += 1;
				} else {
					break;
				}
			}
			if (delRow > 0) {
				for (var k = delRowNum + mergerNuber; k < queryResult.length
						- delRow; k++) {
					queryResult[k] = queryResult[k + delRow];
				}
				queryResult.length -= delRow;
			}
		}
		queryChildren = false;

		// ��ʼ��ѯҪ���¼����ݣ�rowNum���кţ�columnNumber���к�

		getChildData(rowNum, columnNumber, foldSymbol);
	} else {
		return;
	}
}

// i:�����еĵ�ǰ�к�,colNumber:�����е��к�
// ��ʼ��ѯҪ���¼����ݣ�i���кţ�colNumber���к�
function getChildData(i, colNumber, foldSymbol) {
	// ��ȡ��ǰ������
	var columnsTem = queryResult[i];
	// ��������
	var leftgatherColumnTem = columnsTem.gl;
	var condition = "";

	for (var j = 0; j < parseInt(colNumber) + 1; j++) {
		if (leftgatherColumnTem[j].c != "" || leftgatherColumnTem[j].c != null) {
			var gatherCloumnArray = gatherColumns[j].split("_");
			var gatherCloumnId = gatherCloumnArray[0];
			condition += "&" + "quecondition_statcolumn_" + gatherCloumnId
					+ "=" + leftgatherColumnTem[j].c.trimMouse();
		}
	}

	var poststr = "";
	// if (datatable2.form != null) {
	for (i = 0; i < queryResultForm.elements.length; i++) {
		if (queryResultForm.elements[i].tagName == "SELECT") {
			var options = queryResultForm.elements[i].options;
			var name = queryResultForm.elements[i].name;
			for (var j = 0; j < options.length; j++) {
				if (options[j].selected) {
					// ����֧�����ܷ���
					// �����ǰ������֮ǰ�Ļ����а���֧�����ܷ����λ������ʱ�������伶��
					/*
					 * var le = 0; if
					 * (document.getElementById("showGatherColumnCode").checked){
					 * if (colNumber > 1){ for (var ii = 0 ; ii < colNumber - 1 ;
					 * ii= ii + 2){ if (canShowByLevel[ii].totleDepth > 0){ le =
					 * parseInt(leftgatherColumnTem[ii].l) + 1; poststr += "&" +
					 * name + "=" + le; }else { poststr += "&" + name + "=" +
					 * options[j].value ; } } }else { poststr += "&" + name +
					 * "=" + options[j].value ; } }else { if ( colNumber >0 ){
					 * for (var ii = 0 ; ii < colNumber ; ii ++){ if
					 * (canShowByLevel[ii].totleDepth > 0){ le =
					 * parseInt(leftgatherColumnTem[ii].l) + 1; poststr += "&" +
					 * name + "=" + le; }else { poststr += "&" + name + "=" +
					 * options[j].value ; } } }else { poststr += "&" + name +
					 * "=" + options[j].value ; } }
					 */
					poststr += "&" + name + "=" + options[j].value;
				}
			}
		} else if (queryResultForm.elements[i].type == "checkbox") {
			if (queryResultForm.elements[i].checked) {
				var name = queryResultForm.elements[i].name;
				var value = queryResultForm.elements[i].value;
				poststr += "&" + name + "=" + value;
			}
		} else {
			var name = queryResultForm.elements[i].name;
			var value = queryResultForm.elements[i].value;
			poststr += "&" + name + "=" + value;
		}
	}

	poststr += condition;
	// 2009-02-19 yuanxin;�ѻ��������Բ������͵���̨
	// ��ȡ�û����еĲ���ṹ
	// var codeFormat = codeFormats[colNumber];
	// var codeFormatArray = codeFormat.split("-");
	// ����Ĭ�ϲ�ѯʱ��һ����λ���༶֧�����ܷ����δ���Ϊ0�����
	// if (showLevel == 0){
	showLevel += 1;
	// }
	showLevel += 1;
	canShowByLevel[colNumber].initDepth = showLevel;

	if (showLevel == canShowByLevel[colNumber].totleDepth + 1) {
		// ��ʾ����������ĩ�����ݣ��������¼�����
		alert("����������ĩ������!");
		return;
	} else {

		var gatherColumnsJsonTemp = "[";
		// songfupeng 20090701 ��������ʾ���빦��:��ʼ��һ�������ж���
		var JsonTemp = "{name:'" + canShowByLevel[0].name
				+ "',gatherColumnId:'" + canShowByLevel[0].gatherColumnId
				+ "',totleDepth:" + canShowByLevel[0].totleDepth
				+ ",initDepth:" + canShowByLevel[0].initDepth + ",isTotle:"
				+ canShowByLevel[0].isTotle + ",isMerger:"
				+ canShowByLevel[0].isMerger + "}";
		gatherColumnsJsonTemp += JsonTemp;
		for (var iii = 1; iii < canShowByLevel.length; iii++) {
			if (canShowByLevel[iii].gatherColumnId != canShowByLevel[iii - 1].gatherColumnId) {
				var JsonTemp = ",{name:'" + canShowByLevel[iii].name
						+ "',gatherColumnId:'"
						+ canShowByLevel[iii].gatherColumnId + "',totleDepth:"
						+ canShowByLevel[iii].totleDepth + ",initDepth:"
						+ canShowByLevel[iii].initDepth + ",isTotle:"
						+ canShowByLevel[iii].isTotle + ",isMerger:"
						+ canShowByLevel[iii].isMerger + "}";
				gatherColumnsJsonTemp += JsonTemp;
			}
		}
		/*
		 * if(document.getElementById("showGatherColumnCode").checked){ for (var
		 * iii = 0; iii < canShowByLevel.length; iii=iii+2){ var JsonTemp =
		 * "{name:'" + canShowByLevel[iii].name + "',gatherColumnId:'" +
		 * canShowByLevel[iii].gatherColumnId + "',totleDepth:" +
		 * canShowByLevel[iii].totleDepth + ",initDepth:" +
		 * canShowByLevel[iii].initDepth + ",isTotle:" +
		 * canShowByLevel[iii].isTotle + ",isMerger:" +
		 * canShowByLevel[iii].isMerger + "}"; if ((iii + 1) <
		 * canShowByLevel.length){ JsonTemp += ","; } gatherColumnsJsonTemp +=
		 * JsonTemp; } }else { for (var iii = 0; iii < canShowByLevel.length;
		 * iii++){ var JsonTemp = "{name:'" + canShowByLevel[iii].name +
		 * "',gatherColumnId:'" + canShowByLevel[iii].gatherColumnId +
		 * "',totleDepth:" + canShowByLevel[iii].totleDepth + ",initDepth:" +
		 * canShowByLevel[iii].initDepth + ",isTotle:" +
		 * canShowByLevel[iii].isTotle + ",isMerger:" +
		 * canShowByLevel[iii].isMerger + "}"; if ((iii + 1) <
		 * canShowByLevel.length){ JsonTemp += ","; } gatherColumnsJsonTemp +=
		 * JsonTemp; } }
		 */
		gatherColumnsJsonTemp += "]";
		poststr += "&gatherColumnsJson=" + gatherColumnsJsonTemp
				+ "&foldSymbol=" + foldSymbol;
	}

	// poststr += checkStr;
	// }
	if (foldSymbol == "subtract") {
		showLevel = canShowByLevel[colNumber].initDepth
		showLevel -= 1;
	}
	canShowByLevel[colNumber].initDepth = showLevel;
	var preurl = PATH_PREFIX
			+ "/salary/discovery/template/ajaxseniorquerybytemplateaction.do?t="
			+ Math.random();
	//songfupeng 20100727 ���Ĭ�ϲ�ѯ����
	var queryStatus = "1";
	poststr+="&queryStatus="+queryStatus;
	// ��������
	startRequest("POST", preurl, poststr, childDataResponse);
	// ���ֲ�ѯ���ݵȴ�������
	createDiv();
}
// �ص�����
function childDataResponse(text) {
	eval("var childData=" + text);
	childDataResult = childData.body;
	var foldSymbol = childData.foldSymbol;
	// 2008��12��16�� Ԭ��;�޸Ĳ�ѯ�¼�Ҫ������֮�󵼳�Excel����ӡʱ��ӡ�����뱨�����ݲ�һ�µ�����
	// ebody = childData.excel;

	// ��Ҫ���¼����ݲ��뵽����queryResult֮ǰ����ĳ��ȣ��Ա�������ʱ������бȽϣ����Ƿ�鵽��Ҫ�ص��¼�����
	var queryResultLength = queryResult.length;
	// ����Ҫ�������ʼ�к�
	var insertNumber = 0;
	for (var i = 0; i < childDataResult.length; i++) {
		// ��ʶ���������Ƿ���ȫ���
		var flag = 1;
		for (var j = 0; j < columnNumber + 1; j++) {
			if (queryResult[rowNum].gl[j].c
					.localeCompare(childDataResult[i].gl[j].c) != 0
					|| queryResult[rowNum].gl[j].l
							.localeCompare(childDataResult[i].gl[j].l) != 0) {
				flag = 0;
				break;
			}
		}
		if (flag == 1) {
			insertNumber = i;
		}
	}

	// ����insertNumber���ǺͲ�ѯҪ������ȵ��У�����Ҫ���¼����ݵ���һ�п�ʼ����
	insertNumber += 1;
	// ��Ҫ����ʾ����ʱ
	var columnNumberForCode = columnNumber;
	if (document.getElementById("showGatherColumnCode").checked) {
		columnNumberForCode -= 1;
	}

	// ����Ҫ����Ľ����к�
	var insertEndNumber = 0;
	for (var i = 0; i < childDataResult.length; i++) {
		// ��ʶ���������Ƿ���ȫ���
		var flag = 1;
		for (var j = 0; j < columnNumberForCode; j++) {
			if (queryResult[rowNum].gl[j].c
					.localeCompare(childDataResult[i].gl[j].c) != 0
					|| queryResult[rowNum].gl[j].l
							.localeCompare(childDataResult[i].gl[j].l) != 0) {
				flag = 0;
				break;
			}
		}
		if (flag == 1) {
			insertEndNumber = i;
		}
	}

	// ��ΪҪ����������������ڵ����ݣ����Խ�����insertEndNumberҪ��1
	insertEndNumber += 1;
	// ��ǰҪ�ص��кϲ���
	var mergerNuber = queryResult[rowNum].gl[columnNumber].rsp;
	var queryResultTem = new Array(queryResult.length + insertEndNumber
			- insertNumber);
	// �ѵ�ǰҪ��֮ǰ�����ݴ�����ʱ�����У��洢��ǰҪ��
	for (var i = 0; i < rowNum + mergerNuber; i++) {
		queryResultTem[i] = queryResult[i];
	}

	// �ѵ�ǰҪ�����ݼ���ǰҪ���¼����ݴ�����ʱ�����У�����ʱ�����д洢���ظ������������
	for (var j = rowNum + mergerNuber; j < rowNum + mergerNuber
			+ insertEndNumber - insertNumber; j++) {
		queryResultTem[j] = childDataResult[j - rowNum - mergerNuber
				+ insertNumber];
	}
	// ��ʣ��Ҫ�ش�����ʱ������

	var startNum = rowNum + insertEndNumber + mergerNuber - insertNumber;
	// songfupeng 20090715 �ظ��ĸ���
	var delNum = 0;
	for (var k = startNum; k < queryResultTem.length; k++) {
		var count = k - insertEndNumber + insertNumber;
		var hasChildResult = false;
		// queryResult�Ƿ���ͬ�������ݴ���childDataResult��
		for (var i = 0; i < childDataResult.length; i++) {
			var columnNum = 0;
			for (var j = 0; j < childDataResult[i].gl.length; j++) {
				if (queryResult[count].gl[j].c == childDataResult[i].gl[j].c) {
					columnNum++;
				}
			}
			if (columnNum == childDataResult[i].gl.length
					&& foldSymbol == "subtract") {
				hasChildResult = true;
				break;
			}
		}
		if (hasChildResult) {
			hasChildResult = false;
			delNum++;
			continue;
		}
		queryResultTem[startNum++] = queryResult[count];
	}

	queryResult = queryResultTem;
	queryResult.length = queryResultTem.length - delNum;

	/*
	 * for(var k = rowNum + insertEndNumber + mergerNuber - insertNumber; k <
	 * queryResultTem.length; k++){
	 * 
	 * queryResultTem[k] = queryResult[k - insertEndNumber + insertNumber]; }
	 * queryResult = queryResultTem;
	 */
	// ����������кϲ�����
	// ����ǰ�������Ǵӵڶ��п�ʼ�Ļ�����ʱ����ǰ��Ļ�������Ҫ�����кϲ�����
	if (columnNumber >= 1) {
		var columnNumberTem = columnNumber - 1;
		// ����ʾ����ʱ
		if (document.getElementById("showGatherColumnCode").checked) {
			// ����ѯҪ�������ֻ�����ʱ
			if (queryResult[rowNum].gl[columnNumber].c
					.localeCompare(queryResult[rowNum].gl[columnNumber - 1].c) == 0) {
				columnNumberTem = columnNumber - 2;
			} else {
				columnNumberTem = columnNumber - 1;
			}
		}
		for (var mm = columnNumberTem; mm >= 0; mm--) {
			var minRowNum = rowNum;
			var maxRowNum = rowNum;
			// Ϊ������ʾ����ʱ�ṩ���������õı���
			var minColumnSize = 0;
			var mmTemp = mm - 1;
			// ����ʾ����ʱ
			if (document.getElementById("showGatherColumnCode").checked) {
				minColumnSize = 1;
				mmTemp = mm - 2;
			}

			// ���Һϲ������е�����к�
			for (var i = rowNum + 1; i < queryResult.length; i++) {
				// �ϲ��д���
				var mergerCode = queryResult[i].gl[mm].c;
				if (mm > minColumnSize) {
					if (mergerCode.localeCompare(queryResult[rowNum].gl[mm].c) == 0
							&& queryResult[i].gl[mmTemp].c
									.localeCompare(queryResult[rowNum].gl[mmTemp].c) == 0) {
						maxRowNum += 1;
					} else {
						break;
					}
				} else {
					if (mergerCode.localeCompare(queryResult[rowNum].gl[mm].c) == 0) {
						maxRowNum += 1;
					} else {
						break;
					}
				}
			}
			// ���Һϲ������е���С�к�
			for (var j = rowNum - 1; j >= 0; j--) {
				// �ϲ��д���
				var mergerCode = queryResult[j].gl[mm].c;
				if (mm > minColumnSize) {
					if (mergerCode.localeCompare(queryResult[rowNum].gl[mm].c) == 0
							&& queryResult[j].gl[mmTemp].c
									.localeCompare(queryResult[rowNum].gl[mmTemp].c) == 0) {
						minRowNum -= 1;
					} else {
						break;
					}
				} else {
					if (mergerCode.localeCompare(queryResult[rowNum].gl[mm].c) == 0) {
						minRowNum -= 1;
					} else {
						break;
					}
				}

			}
			// �޸Ļ������кϲ�
			for (var k = minRowNum; k < maxRowNum + 1; k++) {
				queryResult[k].gl[mm].rsp = maxRowNum - k + 1;
			}
		}
	}
	// fillChildren(rowNum,childDataResult.length - 1);

	// �ж��Ƿ��ѯ����Ҫ�ص��¼����ݣ����û�в鵽���������ʾ
	if (queryResultLength == queryResult.length && foldSymbol == "add") {
		alert("��������û���¼�����!");
	}

	filltable();
}

// ����һ��DIV���ڣ������ڲ�ѯ����ʱ�����û��������ڴ�����
function createDiv() {
	// ��ʾ���ݼ��ؽ��ȶ���
	var moveDiv = document.getElementById("moveDiv");
	// ��������div����
	var convertData = document.getElementById("convertData");
	// ��ʾ����div����
	var viewDataDiv = document.getElementById("dataarea");
	var ttop = viewDataDiv.offsetTop;
	var twid = viewDataDiv.offsetWidth;
	var thei = viewDataDiv.offsetHeight;
	var tleft = viewDataDiv.offsetLeft;
	while (viewDataDiv = viewDataDiv.offsetParent) {
		ttop += viewDataDiv.offsetTop;
		tleft += viewDataDiv.offsetLeft;
	}

	// ���ø�������div����ľ�������
	convertData.style.position = "absolute";
	convertData.style.left = tleft;
	convertData.style.top = ttop;
	convertData.style.height = thei;
	convertData.style.width = twid + 18;
	convertData.style.backgroundColor = "black";
	convertData.style.filter = "alpha(opacity=50)";
	convertData.style.display = "inline";

	// ����div�ľ�������
	moveDiv.style.position = "absolute";
	moveDiv.style.left = tleft + twid / 2 - (400) / 2;
	moveDiv.style.top = ttop + thei / 2 - (100) / 2;
	moveDiv.style.display = "inline";
}
// �ر�div
function closeDiv() {
	//document.getElementById("moveDiv").style.display = "none";
	document.getElementById("convertData").style.display = "none";
}

var oPopupMenu = window.createPopup();
var oPopupMenu1 = window.createPopup();
// ���û���ͳ���е�Ԫ�����Ҽ�����ʱ������ѯ��ģ��˵�
function popCountMenu(idValue, nameValue) {
	// 090424 �޸ĵ���ͳ���� Songfupeng
	nameValue = "s" + nameValue;
	// 090520 �ж��ǲ��Ǻϼ��У��������˵�����ʾ����
	if (idValue == '0_�ϼ�' || idValue == '0') {
		return;
	}
	try {
		// ��ȡ��ǰ���ĺ�����(x)�������꣨y��
		var tempx = event.clientX + document.body.scrollLeft;
		var tempy = event.clientY + document.body.scrollTop;
		var parentPopTemplate = document.getElementById("popMenu1");
		parentPopTemplate.innerHTML = "";
		// ��ʾģ���б�
		// var popTemplate = document.getElementById("popTemplate");
		eval("var templateArray = countColumnConTemplates." + nameValue);
		// songfupeng 090519 ��ȡ��������ģ��
		eval("var templateUnConArray = countColumnUnConTemplates." + nameValue);
		var standardHeigth = 105;
		if (templateArray.length > 5) {
			standardHeigth = 20 * templateArray.length;
		}
		parentPopTemplate.style.height = standardHeigth;
		var widthNum = 0;

		for (var i = 0; i < templateArray.length; i++) {
			var popTemplate = document.createElement("div");
			popTemplate.id = templateArray[i].code;
			popTemplate.innerHTML = "&nbsp;&nbsp;" + templateArray[i].name;
			popTemplate.status = 1;
			if (templateArray[i].name.length > widthNum) {
				widthNum = templateArray[i].name.length;
			}
			popTemplate.value = idValue;
			popTemplate.style.marginTop = "5px";
			popTemplate.style.marginBottom = "5px";
			popTemplate.style.color = "#000000";
			popTemplate.onmouseover = "this.style.background='#000099';this.style.color='#FFFFFF';this.style.cursor='default'";
			popTemplate.onmouseout = "this.style.background='#cccccc';this.style.color='#000000'";
			popTemplate.onclick = "parent.checkGatherTemplate(this.id,this.value,this.innerHTML,this.status)";
			parentPopTemplate.appendChild(popTemplate);
		}
		parentPopTemplate.innerHTML += " <HR> ";
		// songfupeng 090519 ������ģ��
		for (var i = 0; i < templateUnConArray.length; i++) {
			var popTemplate = document.createElement("div");
			popTemplate.id = templateUnConArray[i].code;
			popTemplate.innerHTML = "&nbsp;&nbsp;" + templateUnConArray[i].name;
			popTemplate.status = 0;
			if (templateUnConArray[i].name.length > widthNum) {
				widthNum = templateUnConArray[i].name.length;
			}
			popTemplate.value = idValue;
			popTemplate.style.marginTop = "5px";
			popTemplate.style.marginBottom = "5px";
			popTemplate.style.color = "#000000";
			popTemplate.onmouseover = "this.style.background='#000099';this.style.color='#FFFFFF';this.style.cursor='default'";
			popTemplate.onmouseout = "this.style.background='#cccccc';this.style.color='#000000'";
			popTemplate.onclick = "parent.checkGatherTemplate(this.id,this.value,this.innerHTML,'0')";
			parentPopTemplate.appendChild(popTemplate);
		}
		var oPopupBody = oPopupMenu1.document.body;
		var test1Div = document.getElementById("test1");
		oPopupBody.innerHTML = test1Div.innerHTML;
		var standarderWidth = 105;
		if (13 * widthNum > standarderWidth) {
			standarderWidth = 13 * widthNum + 10;
		}
		parentPopTemplate.style.width = standarderWidth + "px";
		oPopupMenu1.show(tempx, tempy, standarderWidth, standardHeigth,
				document.body);
	} catch (e) {
		// alert("ͳ������ϸ��Ӧģ��û������!");
		return;
	}

}
// ����ȫ�ֱ�������¼�ǲ�ѯҪ���¼����ݻ��ǲ�ѯҪ�������¼�����
var queryChildren = false;

// ���û��ڻ�����Ҫ�ص�Ԫ�����Ҽ�����ʱ������ѯ�¼�Ҫ�صĲ˵�;�˵�Ϊһ��������

function popMenu(i, colNumber, level) {
	// ��ȡ��ǰ���ĺ�����(x)�������꣨y��
	var tempx = event.clientX + document.body.scrollLeft;
	var tempy = event.clientY + document.body.scrollTop;

	// ��ȡ�û����еĲ���ṹ
	// var codeFormat = codeFormats[colNumber];
	// var codeFormatArray = codeFormat.split("-");
	// ��ʾ�¼�����
	var popChild = document.getElementById("popChild");
	popChild.value = i;
	popChild.type = colNumber;
	popChild.className = level;

	// ��ʾȫ������
	var popChildren = document.getElementById("popChildren");
	popChildren.value = i;
	popChildren.type = colNumber;
	// codeFormatArray�ĳ���ΪҪ�ص��ܼ��Σ���һ���Ǵ�0��ʼ������Ҫ��1����ΪҪ���¼����ݣ�����Ҫ��ѯ����һ����ǰһ����������Ҫ��1������2
	popChildren.className = canShowByLevel[colNumber].totleDepth - 2;

	// �۵��¼�����
	var collapseData = document.getElementById("collapseData");
	collapseData.value = i;
	collapseData.type = colNumber;
	collapseData.className = level;

	// ��Ҫ�����¼����ݵ�ʱ���۵��¼����ݹ��ܲ��ܲ���
	if (i < queryResult.length - parseInt(queryResult[i].gl[colNumber].rsp)
			&& queryResult[i].gl[colNumber].l < queryResult[parseInt(i)
					+ parseInt(queryResult[i].gl[colNumber].rsp)].gl[colNumber].l) {
		collapseData.disabled = false;
		collapseData.onclick = "parent.checkGatherColumnType(this.value,this.type,this.className,\'\')";
		popChild.disabled = true;
		popChild.onclick = "return false";
	} else {
		collapseData.disabled = true;
		collapseData.onclick = "return false";
		popChild.disabled = false;
		popChild.onclick = "parent.checkGatherColumnType(this.value,this.type,this.className,\'\')";
	}
	var oPopupBody = oPopupMenu.document.body;
	oPopupBody.innerHTML = document.getElementById("test").innerHTML;;
	oPopupMenu.show(tempx, tempy, 105, 105, document.body);
}

// ��ȡ������ID,�Ա���ϳɲ�ѯ����:(ȫ�ֱ���)
var gatherColumns;
// ��ȡ������glColumn��ʶ�����������Ǹ������У�֧�����ܷ��໹�ǵ�λ������ȫ�ֱ�����
var canShowByLevel;
// var canShowByAgencyLevel;
// ��ȡ�����еĲ���ṹ
// var codeFormats;

// �ػ���(������MAXLINE=25��)
function filltable(startnum) {
	// 2008-08-05Ԭ��;�����ѯ���û�����ݵ����
	if (queryResult.length != 0) {
		// ��ȡ��һ������
		var columnsTem = queryResult[0];
		// ��������
		var leftgatherColumnTem = columnsTem.gl;
		// �Ҳ������
		var rightgatherColumnTem = columnsTem.gr;
		// ��ȡ������ID,�Ա���ϳɲ�ѯ����:(ȫ�ֱ���)
		gatherColumns = new Array(leftgatherColumnTem.length
				+ rightgatherColumnTem.length);
		// ��ȡ������glColumn��ʶ�����������Ǹ������У�֧�����ܷ��໹�ǵ�λ������ȫ�ֱ�����

		canShowByLevel = new Array(leftgatherColumnTem.length
				+ rightgatherColumnTem.length);
		// canShowByAgencyLevel = new Array(leftgatherColumnTem.length +
		// rightgatherColumnTem.length);
		// ��ȡ�����еĲ���ṹ
		// codeFormats = new Array(leftgatherColumnTem.length +
		// rightgatherColumnTem.length);
		// ����ʾ�����ʱ��
		if (isTemplateQuery.localeCompare("true") == 0) {
			if (document.getElementById("showGatherColumnCode").checked) {
				var temp = 0;
				// debugger;
				for (var i = 0; i < gatherColumnsJson.length; i++) {
					// ���������ж���
					gatherColumns[temp] = gatherColumnsJson[i].gatherColumnId
							+ "_" + gatherColumnsJson[i].showPlace;
					canShowByLevel[temp] = gatherColumnsJson[i];
					// canShowByAgencyLevel[temp] =
					// document.getElementById("gatherColumn"+i).scopeName;
					// codeFormats[temp] =
					// document.getElementById("gatherColumn"+i).nodeName;
					if (gatherColumnsJson[i].isShowCode == 1) {
						gatherColumns[temp + 1] = gatherColumnsJson[i].gatherColumnId
								+ "_" + gatherColumnsJson[i].showPlace;
						canShowByLevel[temp + 1] = gatherColumnsJson[i];
						// canShowByAgencyLevel[temp + 1] =
						// document.getElementById("gatherColumn"+i).scopeName;
						// codeFormats[temp + 1] =
						// document.getElementById("gatherColumn"+i).nodeName;
						temp += 2;
					} else {
						temp += 1;
					}
				}
				/*
				 * for(var i = 0;i < gatherColumns.length/2;i++){
				 * 
				 * 
				 * //���������ж��� gatherColumns[temp] =
				 * gatherColumnsJson[i].gatherColumnId; canShowByLevel[temp] =
				 * gatherColumnsJson[i]; //canShowByAgencyLevel[temp] =
				 * document.getElementById("gatherColumn"+i).scopeName;
				 * //codeFormats[temp] =
				 * document.getElementById("gatherColumn"+i).nodeName;
				 * gatherColumns[temp + 1] =
				 * gatherColumnsJson[i].gatherColumnId; canShowByLevel[temp + 1] =
				 * gatherColumnsJson[i]; //canShowByAgencyLevel[temp + 1] =
				 * document.getElementById("gatherColumn"+i).scopeName;
				 * //codeFormats[temp + 1] =
				 * document.getElementById("gatherColumn"+i).nodeName; temp +=
				 * 2; }
				 */
			} else {
				for (var i = 0; i < gatherColumns.length; i++) {
					gatherColumns[i] = gatherColumnsJson[i].gatherColumnId
							+ "_" + gatherColumnsJson[i].showPlace;
					canShowByLevel[i] = gatherColumnsJson[i];
					// canShowByAgencyLevel[i] =
					// document.getElementById("gatherColumn"+i).scopeName;
					// codeFormats[i] =
					// document.getElementById("gatherColumn"+i).nodeName;
				}
			}
		}
		// ������ϵͳ�˵�ģ���ѯ������ͨģ���ѯ����������չ�����۵���ť�ľ���·��
		var imageAddUrl = PATH_PREFIX + "/images/tree_ico/plus.gif";
		var imageSubtractUrl = PATH_PREFIX + "/images/tree_ico/minus.gif";
	}
	funcrunning = true;
	var MAXLINE = 25;

	var odate = new Date();
	var start = odate.getMilliseconds() + odate.getSeconds() * 1000;
	// �����ʼ��Ϊ�գ���������һ����ʼ��
	if (startnum == null) {
		startnum = Math.floor(document.getElementById("scroll-y").scrollTop
				/ 50);
	}

	tbody = "";
	// loop = 1;

	// cloop = queryResult[i];
	for (var i = startnum; i < queryResult.length && i < startnum + MAXLINE; i++) {
		// if (loop++ > MAXLINE) {
		// break;
		// }
		cloop = i;
		columns = queryResult[cloop];
		// if(queryResult.length==19 && i==6){
		// debugger;
		// }
		if (columns.selected) {
			TRHTML = "<tr selected='true'>";
		} else {
			TRHTML = "<tr>";
		}
		leftgatherColumn = columns.gl;
		rightgatherColumn = columns.gr;

		statColumn = columns.s;
		// ����ʾ�����д���ʱ����¼�Ǵ����л���������
		var isCode = 1;

		// 2008-07-21Ԭ�Σ��ж���ģ���ѯ��������ͨ��ѯ
		if (isTemplateQuery.localeCompare("false") == 0) {
			// for (gloop in leftgatherColumn) {
			for (var gloop = 0; gloop < leftgatherColumn.length; gloop++) {
				gcolumn = leftgatherColumn[gloop];
				if (gcolumn.t == "" || gcolumn.t == null) {
					gcolumn.t = "&nbsp;";
				}
				if (gcolumn.rsp != null && gcolumn.rsp != 0) {
					if (i == startnum) {
						TRHTML += '<td rowspan="' + gcolumn.rsp
								+ '" valign="top" nowrap><div align="left">'
								+ gcolumn.t + '</div></td>';
					} else {
						if (queryResult[cloop - 1].gl[gloop].rsp == 1) {
							TRHTML += '<td rowspan="'
									+ gcolumn.rsp
									+ '" valign="top" nowrap><div align="left">'
									+ gcolumn.t + '</div></td>';
						}
					}
				} else if (gcolumn.csp != null && gcolumn.csp != 0) {
					TRHTML += '<td colspan="' + gcolumn.csp
							+ '" nowrap><div align="left">' + gcolumn.t
							+ '</div></td>';
				}

			}
		} else {
			// for (gloop in leftgatherColumn) {

			for (var gloop = 0; gloop < leftgatherColumn.length; gloop++) {
				// if(gloop=="Methods"){
				// continue;
				// }

				gcolumn = leftgatherColumn[gloop];
				// if(!gcolumn.t){
				// continue;
				// }
				// if(gcolumn){
				// ���һ������������һ���ո��λ�ã�Ȼ�����չ���۵�ͼ��
				var index = gcolumn.t.lastIndexOf("��");

				index += 1;
				if (gcolumn.t == "" || gcolumn.t == null) {
					gcolumn.t = "&nbsp;";
				}

				if (gcolumn.rsp != null && gcolumn.rsp != 0) {
					if (i == startnum) {
						// �ϼ��е�Ĭ�ϴ���Ϊ"0";С���е�Ĭ�ϴ���Ϊ""
						var code = "0";
						var code2 = "";
						// 2008-07-14�жϵ���������֧�����ܷ����λʱ�����¼�Ҫ��չ����־
						if (canShowByLevel[gloop].totleDepth > 1 && union == 0) {
							if (code.localeCompare(queryResult[cloop].gl[0].c) == 0
									|| code2
											.localeCompare(queryResult[cloop].gl[gloop].c) == 0
									&& cloop == 0) {
								TRHTML += '<td rowspan="'
										+ gcolumn.rsp
										+ '" valign="top" id="'
										+ cloop
										+ '" name="'
										+ gloop
										+ '" tagName="'
										+ gcolumn.l
										+ '" nowrap ondblclick="checkGatherColumnType(this.id,this.name,this.tagName,\'\');"><div align="left">'
										+ gcolumn.t + '</div></td>';
							} else {
								if (isCode == 1) {
									// TRHTML += '<td rowspan="' + gcolumn.rsp +
									// '" valign="top" id="' + cloop + '"
									// name="' + gloop + '" tagName="' +
									// gcolumn.l + '" nowrap
									// ondblclick="checkGatherColumnType(this.id,this.name,this.tagName);"
									// oncontextmenu="popMenu(this.id,this.name,this.tagName);"><div
									// align="left">' +
									// gcolumn.t.substring(0,index) + '<img
									// src="' + imageAddUrl + '" border="0"
									// id="' + cloop + '" name="' + gloop + '"
									// tagName="' + gcolumn.l + '"
									// onclick="checkGatherColumnType(this.id,this.name,this.tagName);"/>&nbsp;'
									// + gcolumn.t.substring(index) +
									// '</div></td>';
									if (totalType == "1") {
										TRHTML += '<td rowspan="'
												+ gcolumn.rsp
												+ '" valign="top" id="'
												+ cloop
												+ '" name="'
												+ gloop
												+ '" tagName="'
												+ gcolumn.l
												+ '" nowrap ondblclick="checkGatherColumnType(this.id,this.name,this.tagName,\'\');"><div align="left">'
												+ gcolumn.t + '</div></td>';
									} else {
										TRHTML += '<td rowspan="'
												+ gcolumn.rsp
												+ '" valign="top" id="'
												+ cloop
												+ '" name="'
												+ gloop
												+ '" tagName="'
												+ gcolumn.l
												+ '" nowrap ondblclick="checkGatherColumnType(this.id,this.name,this.tagName,\'\');" oncontextmenu="popMenu(this.id,this.name,this.tagName);"><div align="left">'
												+ gcolumn.t.substring(0, index)
												+ '<img src="'
												+ imageAddUrl
												+ '" border="0" id="'
												+ cloop
												+ '" name="'
												+ gloop
												+ '" tagName="'
												+ gcolumn.l
												+ '" onclick="checkGatherColumnType(this.id,this.name,this.tagName,\'add\');"/>&nbsp;'
												+ gcolumn.t.substring(index)
												+ '</div></td>';
									}

									isCode = 0;
								} else {
									TRHTML += '<td rowspan="'
											+ gcolumn.rsp
											+ '" valign="top" id="'
											+ cloop
											+ '" name="'
											+ gloop
											+ '" tagName="'
											+ gcolumn.l
											+ '" nowrap ondblclick="checkGatherColumnType(this.id,this.name,this.tagName,\'\');"><div align="left">'
											+ gcolumn.t + '</div></td>';
									isCode = 1;
								}
							}
						} else {
							TRHTML += '<td rowspan="'
									+ gcolumn.rsp
									+ '" valign="top" id="'
									+ cloop
									+ '" name="'
									+ gloop
									+ '" tagName="'
									+ gcolumn.l
									+ '" nowrap ondblclick="checkGatherColumnType(this.id,this.name,this.tagName);" oncontextmenu="popMenu(this.id,this.name,this.tagName,\'\');"><div align="left">'
									+ gcolumn.t + '</div></td>';
						}
					} else {

						if (queryResult[cloop - 1].gl[gloop].rsp == 1) {
							// 2008-07-14�жϵ���������֧�����ܷ����λʱ�����¼�Ҫ��չ����־
							if (canShowByLevel[gloop].totleDepth > 0
									&& union == 0) {
								// ����ǰ����С����ʱ������ʵչ���۵�����;�ϼ��е�Ĭ�ϴ���Ϊ"0";С���е�Ĭ�ϴ���Ϊ""
								if (""
										.localeCompare(queryResult[cloop].gl[gloop].c) != 0) {

									// �жϵ���ʾ����ʱ��ֻ�ڴ������������ʾ��չ���۵�����
									if (canShowByLevel[gloop].isShowCode == 1) {

										if (isCode == 1) {
											if (parseInt(leftgatherColumn[gloop].l)
													+ 1 < canShowByLevel[gloop].totleDepth) {
												// �ж������Ƿ����¼�����,�����һ�����ݵ���ʾ���δ��ڱ������ݵ���ʾ���Σ��������ݵ�ͼ��Ӧ�ÿ��۵���ͼ���ʶ
												if (cloop < queryResult.length
														- parseInt(leftgatherColumn[gloop].rsp)
														&& leftgatherColumn[gloop].l < queryResult[cloop
																+ parseInt(leftgatherColumn[gloop].rsp)].gl[gloop].l) {
													TRHTML += '<td rowspan="'
															+ gcolumn.rsp
															+ '" valign="top" id="'
															+ cloop
															+ '" name="'
															+ gloop
															+ '" tagName="'
															+ gcolumn.l
															+ '" nowrap ondblclick="checkGatherColumnType(this.id,this.name,this.tagName,\'\');" oncontextmenu="popMenu(this.id,this.name,this.tagName);"><div align="left">'
															+ gcolumn.t
																	.substring(
																			0,
																			index)
															+ '<img src="'
															+ imageSubtractUrl
															+ '" border="0" id="'
															+ cloop
															+ '" name="'
															+ gloop
															+ '" tagName="'
															+ gcolumn.l
															+ '" onclick="checkGatherColumnType(this.id,this.name,this.tagName,\'subtract\');"/>&nbsp;'
															+ gcolumn.t
																	.substring(index)
															+ '</div></td>';
												} else {
													TRHTML += '<td rowspan="'
															+ gcolumn.rsp
															+ '" valign="top" id="'
															+ cloop
															+ '" name="'
															+ gloop
															+ '" tagName="'
															+ gcolumn.l
															+ '" nowrap ondblclick="checkGatherColumnType(this.id,this.name,this.tagName,\'\');" oncontextmenu="popMenu(this.id,this.name,this.tagName);"><div align="left">'
															+ gcolumn.t
																	.substring(
																			0,
																			index)
															+ '<img src="'
															+ imageAddUrl
															+ '" border="0" id="'
															+ cloop
															+ '" name="'
															+ gloop
															+ '" tagName="'
															+ gcolumn.l
															+ '" onclick="checkGatherColumnType(this.id,this.name,this.tagName,\'add\');"/>&nbsp;'
															+ gcolumn.t
																	.substring(index)
															+ '</div></td>';
												}

											} else {
												TRHTML += '<td rowspan="'
														+ gcolumn.rsp
														+ '" valign="top" id="'
														+ cloop
														+ '" name="'
														+ gloop
														+ '" tagName="'
														+ gcolumn.l
														+ '" nowrap ondblclick="checkGatherColumnType(this.id,this.name,this.tagName,\'\');" oncontextmenu="popMenu(this.id,this.name,this.tagName);"><div align="left">'
														+ gcolumn.t.substring(
																0, index)
														+ gcolumn.t
																.substring(index)
														+ '</div></td>';
											}
											isCode = 0;
										} else {
											TRHTML += '<td rowspan="'
													+ gcolumn.rsp
													+ '" valign="top" id="'
													+ cloop
													+ '" name="'
													+ gloop
													+ '" tagName="'
													+ gcolumn.l
													+ '" nowrap ondblclick="checkGatherColumnType(this.id,this.name,this.tagName,\'\');"  oncontextmenu="popMenu(this.id,this.name,this.tagName);"><div align="left">'
													+ gcolumn.t + '</div></td>';
											isCode = 1;
										}
									} else {
										if (parseInt(leftgatherColumn[gloop].l)
												+ 1 < canShowByLevel[gloop].totleDepth) {
											// �ж������Ƿ����¼�����,�����һ�����ݵ���ʾ���δ��ڱ������ݵ���ʾ���Σ��������ݵ�ͼ��Ӧ�ÿ��۵���ͼ���ʶ
											if (cloop < queryResult.length
													- parseInt(leftgatherColumn[gloop].rsp)
													&& leftgatherColumn[gloop].l < queryResult[cloop
															+ parseInt(leftgatherColumn[gloop].rsp)].gl[gloop].l) {
												TRHTML += '<td rowspan="'
														+ gcolumn.rsp
														+ '" valign="top" id="'
														+ cloop
														+ '" name="'
														+ gloop
														+ '" tagName="'
														+ gcolumn.l
														+ '" nowrap ondblclick="checkGatherColumnType(this.id,this.name,this.tagName,\'\');" oncontextmenu="popMenu(this.id,this.name,this.tagName);"><div align="left">'
														+ gcolumn.t.substring(
																0, index)
														+ '<img src="'
														+ imageSubtractUrl
														+ '" border="0" id="'
														+ cloop
														+ '" name="'
														+ gloop
														+ '" tagName="'
														+ gcolumn.l
														+ '" onclick="checkGatherColumnType(this.id,this.name,this.tagName,\'subtract\');"/>&nbsp;'
														+ gcolumn.t
																.substring(index)
														+ '</div></td>';
											} else {
												TRHTML += '<td rowspan="'
														+ gcolumn.rsp
														+ '" valign="top" id="'
														+ cloop
														+ '" name="'
														+ gloop
														+ '" tagName="'
														+ gcolumn.l
														+ '" nowrap ondblclick="checkGatherColumnType(this.id,this.name,this.tagName,\'\');" oncontextmenu="popMenu(this.id,this.name,this.tagName);"><div align="left">'
														+ gcolumn.t.substring(
																0, index)
														+ '<img src="'
														+ imageAddUrl
														+ '" border="0" id="'
														+ cloop
														+ '" name="'
														+ gloop
														+ '" tagName="'
														+ gcolumn.l
														+ '" onclick="checkGatherColumnType(this.id,this.name,this.tagName,\'add\');"/>&nbsp;'
														+ gcolumn.t
																.substring(index)
														+ '</div></td>';
											}
										} else {
											TRHTML += '<td rowspan="'
													+ gcolumn.rsp
													+ '" valign="top" id="'
													+ cloop
													+ '" name="'
													+ gloop
													+ '" tagName="'
													+ gcolumn.l
													+ '" nowrap ondblclick="checkGatherColumnType(this.id,this.name,this.tagName,\'\');" oncontextmenu="popMenu(this.id,this.name,this.tagName);"><div align="left">'
													+ gcolumn.t.substring(0,
															index)
													+ gcolumn.t
															.substring(index)
													+ '</div></td>';
										}

									}
								} else {
									TRHTML += '<td rowspan="'
											+ gcolumn.rsp
											+ '" valign="top" id="'
											+ cloop
											+ '" name="'
											+ gloop
											+ '" tagName="'
											+ gcolumn.l
											+ '" nowrap ondblclick="checkGatherColumnType(this.id,this.name,this.tagName,\'\');" ><div align="left">'
											+ gcolumn.t + '</div></td>';
								}
							} else {
								TRHTML += '<td rowspan="'
										+ gcolumn.rsp
										+ '" valign="top" id="'
										+ cloop
										+ '" name="'
										+ gloop
										+ '" tagName="'
										+ gcolumn.l
										+ '" nowrap ondblclick="checkGatherColumnType(this.id,this.name,this.tagName,\'\');" ><div align="left">'
										+ gcolumn.t + '</div></td>';
							}
						}
					}
				} else if (gcolumn.csp != null && gcolumn.csp != 0) {
					TRHTML += '<td colspan="' + gcolumn.csp
							+ '" nowrap><div align="left">' + gcolumn.t
							+ '</div></td>';
				}

				// }

			}
		}
		// 2009-02-05 yuanxin;�������Էֺ�(;)���в��
		var statColumnTemp = statColumn.split(";");

		// ͨ��ѭ������ʾ���ݵ��ַ���ƴ����
		for (var m = 0; m < statColumnTemp.length; m++) {
			
			var idValue = "";
			// songfupeng 20091118 ֻ����û�кϲ��Ļ����н���ת
			var startNum = 0;
			for (var gloop = 0; gloop < gatherColumnsJson.length; gloop++) {
				if (gatherColumnsJson[gloop].isMerger == 1
						|| gatherColumnsJson[gloop].showPlace == 1) {
					break;
				}
				if (gloop == 0) {
					idValue += leftgatherColumn[startNum].c;
					if (gatherColumnsJson[gloop].isShowCode == 1) {
						startNum += 2;
					} else {
						startNum += 1;
					}

				} else {
					idValue += "_" + leftgatherColumn[startNum].c;
					if (gatherColumnsJson[gloop].isShowCode == 1) {
						startNum += 2;
					} else {
						startNum += 1;
					}
				}
			}
			// 2009-05-20 yuanxin;�ж��Ƿ���ʵ����
			/*
			 * if (document.getElementById("showGatherColumnCode").checked){
			 * for(var gloop=0;gloop<leftgatherColumn.length;gloop+=2){ gcolumn =
			 * leftgatherColumn[gloop]; if(gloop==0){ idValue+=gcolumn.c; }else{
			 * idValue+="_"+gcolumn.c; } } }else { for(var gloop=0;gloop<leftgatherColumn.length;gloop++){
			 * gcolumn = leftgatherColumn[gloop]; if(gloop==0){
			 * idValue+=gcolumn.c; }else{ idValue+="_"+gcolumn.c; } } }
			 */
			// �жϵ�ͳ������ϸ����ѡ��״̬ʱ����ʼ����ͳ������ϸ���ݣ�����������
			// songfupeng 090512 ���bug#2096: �߼���ѯ���������������ߺ󣬳��������ߵ�ģ����ת����ʧЧ
			// if (Number(scdJson[m].isUsable) == Number(1)){
			//songfupeng 20100708 �ж��Ƿ����"%"����,�����������õ�Ԥ�������߽��д���
			var sctNum=0;
			if(statColumnTemp[m].indexOf("%")>0){
				var statColumnTemp1 =statColumnTemp[m].replace(/,/g, "").substring(0,statColumnTemp[m].indexOf("%"));
				sctNum = Number(statColumnTemp1)/(currencyUnit*100);
			}else{
				sctNum=Number(statColumnTemp[m].replace(/,/g, ""));
			}
			if (Number(scdJson[m].topWarning) * 10000 < sctNum
					* currencyUnit) {
				// TRHTML += "<td nowrap style='background-color:#" +
				// scdJson[m].topBackColor + ";color:#" +
				// scdJson[m].topFontColor + "'>" + statColumnTemp[m] +
				// "&nbsp;</td>";
				TRHTML += '<td id="'
						+ idValue
						+ '" name="'
						+ scdJsonTem[m].statColumnDetailId
						+ '" nowrap oncontextmenu="popCountMenu(this.id,this.name);" style="background-color:#'
						+ scdJson[m].topBackColor + ';color:#'
						+ scdJson[m].topFontColor + '">' + statColumnTemp[m]
						+ "&nbsp;</td>";
			} else if (Number(scdJson[m].bottomWarning) * 10000 > sctNum
					* currencyUnit) {
				// TRHTML += "<td nowrap style='background-color:#" +
				// scdJson[m].bottomBackColor + ";color:#" +
				// scdJson[m].bottomFontColor + "' >" + statColumnTemp[m] +
				// "&nbsp;</td>";
				TRHTML += '<td id="'
						+ idValue
						+ '" name="'
						+ scdJsonTem[m].statColumnDetailId
						+ '" nowrap oncontextmenu="popCountMenu(this.id,this.name);" style="background-color:#'
						+ scdJson[m].bottomBackColor + ';color:#'
						+ scdJson[m].bottomFontColor + '">' + statColumnTemp[m]
						+ "&nbsp;</td>";
			} else {
				TRHTML += '<td id="'
						+ idValue
						+ '" name="'
						+ scdJsonTem[m].statColumnDetailId
						+ '" nowrap oncontextmenu="popCountMenu(this.id,this.name);">'
						+ statColumnTemp[m] + '&nbsp;</td>';
			}
			// }
		}
		// TRHTML += "<td nowrap style='background-color:#ff8000'>" +
		// statColumn.replace(/;/g,"&nbsp;</td><td nowrap
		// style='background-color:#ff8000'>") + "&nbsp;</td>";
		// for (gloop in rightgatherColumn) {
		for (var gloop = 0; gloop < rightgatherColumn.length; gloop++) {
			gcolumn = rightgatherColumn[gloop];
			if (gcolumn.t == "") {
				gcolumn.t = "&nbsp;";
			}
			if (gcolumn.rsp != null && gcolumn.rsp != 0) {
				if (i == startnum) {
					TRHTML += '<td rowspan="' + gcolumn.rsp
							+ '" valign="top" nowrap><div align="left" nowrap>'
							+ gcolumn.t + '</div></td>';
				} else {
					if (totalType == "1") {
						if (cloop == 1
								|| queryResult[cloop - 1].gr[gloop].rsp == 1) {
							TRHTML += '<td rowspan="'
									+ gcolumn.rsp
									+ '" valign="top" nowrap><div align="left" nowrap>'
									+ gcolumn.t + '</div></td>';
						}
					} else {
						if (queryResult[cloop - 1].gr[gloop].rsp == 1) {
							TRHTML += '<td rowspan="'
									+ gcolumn.rsp
									+ '" valign="top" nowrap><div align="left" nowrap>'
									+ gcolumn.t + '</div></td>';
						}
					}
				}
			} else if (gcolumn.csp != null && gcolumn.csp != 0) {
				TRHTML += '<td colspan="' + gcolumn.csp
						+ '" nowrap><div align="left" nowrap>' + gcolumn.t
						+ '</div></td>';
			}
		}
		TRHTML += "</tr>";
		tbody += TRHTML;
	}
	// ebody = tbody;
	contenttable.tBodies.item(0).removeNode(true);
	// 2008-07-11Ԭ�� ��Ҫ���¼��������֮ǰ���ر����ݼ��ع�����
	if (isTemplateQuery.localeCompare("true") == 0) {
		closeDiv();
	}
	temptablearea.innerHTML = "<table id=temptable><tbody>" + tbody
			+ "</tbody></table>";
	var otable = document.getElementById("temptable");

	otbody = otable.tBodies.item(0);
	contenttable.appendChild(otbody);
	otable.removeNode(true);

	var odate = new Date();
	var end = odate.getMilliseconds() + odate.getSeconds() * 1000;

	// window.status = (end-start)+"(ms)";
	funcrunning = false;
	flag = false;
	if (queryResult.length) {

		bar.style.height = queryResult.length * 50
				+ document.getElementById("scroll-y").offsetHeight - 100;
	}
}

// ���ݺϼ��д��������
function createNumberColumn(column) {
	if (column == null)
		return "";

	var leftgatherColumn = column.gl;
	var rightgatherColumn = column.gr;
	var statColumn = column.s.split(";");

	TRHTML = "<tr>";
	TRHTML += '<td colspan="' + getColumnNumberOfGatherColumn(leftgatherColumn)
			+ '">&nbsp;</td>';
	for (var i = 0; i < statColumn.length; i++) {
		TRHTML += '<td><div align="center">' + (i + 1) + '</div></td>';
	}
	if (rightgatherColumn.length > 0) {
		TRHTML += '<td colspan="'
				+ getColumnNumberOfGatherColumn(rightgatherColumn)
				+ '">&nbsp;</td>';
	}
	return TRHTML;
}

function getColumnNumberOfGatherColumn(gatherColumn) {
	var cnumber = 0;
	// for (gloop in gatherColumn) {
	for (var gloop = 0; gloop < gatherColumn.length; gloop++) {
		if (gatherColumn[gloop].csp == null) {
			cnumber += 1;
		} else {
			cnumber += gatherColumn[gloop].csp;
		}
	}
	return cnumber;
}

function mark(oObject) {
	oObject = document.getElementById("dataarea");
	var oMark = document.createElement("DIV");
	var temp = oObject;

	ttop = temp.offsetTop;
	tleft = temp.offsetLeft;
	while (temp == temp.offsetParent) {
		ttop += temp.offsetTop;
		tleft += temp.offsetLeft;
	}

	oMark.style.position = "absolute";
	oMark.style.top = 0;
	oMark.style.left = 0;
	oMark.style.height = "100%"; // oObject.offsetHeight;
	oMark.style.width = "100%"; // oObject.offsetWidth;
	oMark.style.backgroundColor = "#000000";
	oMark.style.filter = "Alpha=50%";

	oObject.insertAdjacentElement("afterEnd", oMark);
	oObject.mark = oMark;
}

function unmark(oObject) {
	var oMark = oObject.mark;
	oMark.removeNode(true);
}

// ��ѯ��������ݱ����
datatable = function() {
	this.parentDiv = null; // ��ʾ����õ�DIVԪ��
	this.form = null; // �ύ��ѯ�����õ�form
	this.type = 0;
	this.url = "/salary/discovery/template/ajaxseniorquerybytemplateaction.do";
	this.running = false;

	// 2008-07-21Ԭ��

	PATH_PREFIX = "";

	var imageForView = PATH_PREFIX + "/images/done_btn/loading.gif";

	this.show = function() {
		this.parentDiv.innerHTML = '<div id="scroll-y" class="scroll-y"><div class="bar" id="bar"></div></div><div id="scroll-x" class="scroll-x"><div align="left"></div><table border="0" cellspacing="0" class="searchtable" width="100%" id="contenttable"><thead></thead><tbody><tr><td><div align="left"><img src="'
				+ imageForView
				+ '" border="0" alt="�����У����Ժ򡭡�"/></div></td></tr></tbody></table></div>';
		var temptablearea = document.getElementById("temptablearea");
		if (temptablearea == null) {
			temptablearea = document
					.createElement('<div id=temptablearea style="display:none"></div>');
			this.parentDiv.insertAdjacentElement("afterEnd", temptablearea);
		}

		var tableobj = document.getElementById("contenttable");
		var scroll_y = document.getElementById("scroll-y");
		tableobj.onmousemove = markColumn;
		// ��������Ҽ�
		tableobj.oncontextmenu = function() {
			return false;
		};
		scroll_y.oncontextmenu = function() {
			return false;
		};
		// ����Ȧѡ
		tableobj.onselectstart = function() {
			return false;
		};
		scroll_y.onselectstart = function() {
			return false;
		};
		scroll_y.style.width = document.body.offsetWidth;
		//$("scroll-y").hide();
		// ����Ȧѡ����
		// tableobj.onmousedown = startDragSelect;

		var odiv_y = document.getElementById("scroll-y");
		odiv_y.onscroll = function() {
			if (!funcrunning) {
				window.setTimeout(filltable, 1);
				funcrunning = true;
			}
		}
		loadJson(this);
		// this.resize();
	};

	this.resize = function(windowHigh, windowWidth) {
		if (windowHigh == null) {
			windowHigh = window.document.body.offsetHeight;
		}
		if (windowWidth == null) {
			windowWidth = window.document.body.offsetWidth;
		}

		var scroll_x = document.getElementById("scroll-x");
		ttop = scroll_x.offsetTop;
		tleft = scroll_x.offsetLeft;
		while (scroll_x = scroll_x.offsetParent) {
			ttop += scroll_x.offsetTop;
			tleft += scroll_x.offsetLeft;
		}

		scroll_x = document.getElementById("scroll-x");

		var high = windowHigh - ttop - 10;
		var width = windowWidth - tleft - 32;

		scroll_x.style.height = high;
		scroll_x.style.width = width;
		var scroll_y = document.getElementById("scroll-y");
		scroll_y.style.height = high;
		scroll_y.style.width = width + 17;
		var dataarea = document.getElementById("dataarea");
		dataarea.style.height = high;
		dataarea.style.width = width;
	}
} // datatable

function loadJson(datatable2) {
	var url = PATH_PREFIX + datatable2.url + "?t=" + Math.random();

	var poststr = "";
	if (datatable2.form != null) {
		for (i = 0; i < queryResultForm.elements.length; i++) {
			if (queryResultForm.elements[i].tagName == "SELECT") {
				var options = queryResultForm.elements[i].options;
				var name = queryResultForm.elements[i].name;
				for (var j = 0; j < options.length; j++) {
					if (options[j].selected) {
						poststr += "&" + name + "=" + options[j].value;
					}
				}
			} else if (queryResultForm.elements[i].type == "checkbox") {
				if (queryResultForm.elements[i].checked) {
					var name = queryResultForm.elements[i].name;
					var value = queryResultForm.elements[i].value;
					poststr += "&" + name + "=" + value;
				}
			} else {
				var name = queryResultForm.elements[i].name;
				var value = queryResultForm.elements[i].value;
				poststr += "&" + name + "=" + value;
			}
		}
	}
	var oXMLHttp = creNewRequest();
	oXMLHttp.onreadystatechange = function() {
		if (oXMLHttp.readyState == 4 && oXMLHttp.status == 200) {
			callback(oXMLHttp.responseText, datatable2);
			datatable2.resize();
		}
	}
	var queryStatus = "1";
	url += "&queryStatus=" + queryStatus;
	// alert(poststr);
	oXMLHttp.open("POST", url, true);
	oXMLHttp.setRequestHeader("Content-Type",
			"application/x-www-form-urlencoded;charset=UTF-8");
	oXMLHttp.send(poststr);
}
var allQueryResult = null;
function callback(responseText, datatable2) {
	// var d = new Date();
	// start = d.getMilliseconds() + d.getSeconds() * 1000;
	try {
		eval("var result = " + responseText);
	} catch (ex) {
		alert("�޷���ȡ���ݣ�");
		return;
	}
	// d = new Date();
	// end = d.getMilliseconds() + d.getSeconds() * 1000;
	// window.status = "������ʱ��"+(end-start)+"ms"
	// ��ò�ѯ���
	queryResult = result.body;

	// �����ѯ���Ϊ�գ��������ѯ�������ݵ���ʾ
	if (queryResult.length == 0 && queryStatus == "1") {
		alert("û�в�ѯ���������������ݣ�");
	}

	allQueryResult = queryResult;
	// ��ȡ��ģ���Ƿ���кϲ�������
	union = parseInt(result.union);
	// �ж���ģ���ѯ������ͨ��ѯ
	isTemplateQuery = result.isTemplateQuery;
	// 2009-02-05 yuanxin;ͳ������ϸ���Զ���
	// eval("scdJsonTem = "+ result.scdJson);
	scdJsonTem = result.scdJson;
	// 2009-02-06 yuanxin;��ͳ������ϸ���д����ѱ����ص�ͳ������ϸ�����������
	scdJson = new Array();
	for (var j = 0; j < scdJsonTem.length; j++) {
		if (Number(scdJsonTem[j].isUsable) == Number(1)) {
			scdJson[scdJson.length] = scdJsonTem[j];
		}
	}
	// 2009-02-06 yuanxin;���Ҽ�����λ
	currencyUnit = result.currencyUnit;
	// 20091223 songfupeng �ϼ�����
	totalType = result.totalType;
	// 2009-11-16 yuanxin;��ȡ�����ձ�����ʱ��
	if (document.getElementById("endtime")) {
		document.getElementById("endtime").value = result.endtime;
	}

	// ��ȡģ����������� 2009-02-18 yuanxin
	// eval("gatherColumnsJson = " + result.gatherColumnsJson);
	gatherColumnsJson = result.gatherColumnsJson;
	selectedGatherColumn = result.selectedGatherColumn;
	queryStatus ="1";
	//songfupeng 20100706 ����Ĭ�ϲ�ѯ����,����û�������Ĭ�ϲ�ѯ��ô�������ʱ����ѯ�����Զ���ʾ����
	if(queryStatus=="0"){
	
		initSelectedGatherColumn();
  		initGatherDepth(0,null);
	}
	// SongFP 20090319 ��ѯ������ģ���б������ͳ�����Ҽ���ʾʹ��
	countColumnConTemplates = result.countColumnConTemplates;
	countColumnUnConTemplates = result.countColumnUnConTemplates;
	// ����json���ļ�¼����
	var total = result.total;
	// �����json�����滹�������飬�Ͱ�uuid�ӷ����������м�����ѯ
	var uuid = result.uuid;

	if (uuid != null) {
		loadJsonFromCache(uuid, datatable2);
	}
	// ���ģ��ı�������
	var caption = result.headTable;
	var templateCaptionDiv = document.getElementById("templateCaption");
	if (templateCaptionDiv != null) {
		templateCaptionDiv.innerHTML = caption;
	}

	headTable = result.headTable;
	var head = result.head + createNumberColumn(queryResult[0]);
	ehead = head;
	ebody = queryResult;
	// ebody = result.body;
	// ebody = head;
	excelHtml = result.excel;
	if (contenttable.tHead != null) {
		contenttable.tHead.removeNode(true);
	}

	var column = queryResult[0];

	temptablearea.innerHTML = "<table id=temptable><thead>" + head
			+ "</thead></table>";
	var otable = document.getElementById("temptable");
	// ���ز���Ҫ��ͳ������ϸ��ͷ��Ϣ
	var hearArrayLength = otable.tHead.rows.length - 1;
	if (queryResult.length == 0) {
		hearArrayLength = otable.tHead.rows.length;
	}
	var headArray = new Array(hearArrayLength);
	// �������еĸ���
	var leftGatherColumn = parseInt(result.leftGatherColumnNumber);
	// ͳ������ϸֵ
	var statColumnDetailStr = result.statColumnDetails;
	// ����ʾ����ͳ������ϸ��Ϣ����������
	var statColumnDetail = new Array(statColumnDetailStr.length);
	for (var m = 0; m < statColumnDetail.length; m++) {
		statColumnDetail[m] = parseInt(statColumnDetailStr.substring(m, m + 1));
	}
	// ���Ҷ�ά���������
	var colNumbers = 0;
	for (var i = leftGatherColumn; i < otable.tHead.rows(0).cells.length; i++) {
		var colNumber = otable.tHead.rows(0).cells(i).colSpan;
		colNumbers += colNumber;
	}
	// �Զ�ά�����ÿһ�н��г�ʼ��
	for (var ii = 0; ii < headArray.length; ii++) {
		headArray[ii] = new Array(colNumbers);
	}
	// ��ÿһ��Ԫ�����ݷ����ά����Ķ�Ӧλ��
	var startcell = 0;
	for (var jj = 0; jj < headArray.length; jj++) {
		startcell = 0;
		// ����ǵ�һ��Ҫɾ�����Ļ�����
		if (jj == 0) {
			for (var kk = leftGatherColumn; kk < otable.tHead.rows[jj].cells.length; kk++) {
				startcell = Filltable(jj, startcell,
						otable.tHead.rows[jj].cells[kk]);
			}
		} else {

			for (var kk = 0; kk < otable.tHead.rows[jj].cells.length; kk++) {
				startcell = Filltable(jj, startcell,
						otable.tHead.rows[jj].cells[kk]);
			}
		}
	}

	/**
	 * ����ֵ����һ����䵥Ԫ������� ������startrow:��ʼ�У�startcol����ǰ�У�thobj��ͳ������ϸ����
	 */
	function Filltable(startrow, startcol, thobj) {
		var currentCell = startcol;
		if (startrow == 0) {
			for (var k = startcol; k < thobj.colSpan + startcol; k++) {
				if (headArray[startrow][k] == null) {
					headArray[startrow][k] = thobj;
					currentCell += 1;
					// ������кϲ������
					if (thobj.rowSpan > 1) {
						for (var j = startrow + 1; j < thobj.rowSpan + startrow; j++) {
							headArray[j][k] = thobj;
						}
					}
				} else {
					startcol += 1;
					currentCell += 1;
				}
			}
		} else {
			for (var k = startcol; k < thobj.colSpan + startcol; k++) {
				// ������ͳ�������ϲ�ѯʱ������ͳ���еĸ߶Ȳ�һ�µ����
				// if (startrow > 1){
				if (headArray[startrow - 1][k]) {
					if (headArray[startrow - 1][k].colSpan > 1) {
						if (headArray[startrow][k] == null) {
							headArray[startrow][k] = thobj;
							currentCell += 1;
							// ������кϲ������
							if (thobj.rowSpan > 1) {
								for (var j = startrow + 1; j < thobj.rowSpan
										+ startrow; j++) {
									headArray[j][k] = thobj;
								}
							}
						} else {
							startcol += 1;
							currentCell += 1;
						}
					} else {
						startcol += 1;
						currentCell += 1;
					}
				}// if(headArray[startrow - 1][k]){
			}
			// }//if (startrow > 1)

		}
		return currentCell;
	}
	// ������ͳ�������ϲ�ѯʱ������ͳ���еĸ߶Ȳ�һ�µ����
	for (var aa = 0; aa < headArray.length - 1; aa++) {
		for (var a = 0; a < headArray[aa].length; a++) {
			if (headArray[aa + 1][a] == null) {
				headArray[aa + 1][a] = headArray[aa][a];
				headArray[aa + 1][a].rowSpan += 1;
			}
		}
	}
	for (var mm = 0; mm < statColumnDetail.length; mm++) {
		if (statColumnDetail[mm] == 0) {
			// ������ж��кϲ������޸�֮ǰ��״̬
			var colState = 0;
			for (var nn = 0; nn < headArray.length;) {
				element = headArray[nn][mm];
				rowNumber = element.rowSpan;
				colNumber = element.colSpan;
				// ����û���кϲ������
				if (colNumber == 1) {
					element.style.display = "none";
				}
				// ������кϲ������
				else if (colNumber > 1) {
					element.colSpan = element.colSpan - 1;
				}
				nn += rowNumber;
			}
		}
	}
	ohead = otable.tHead;
	contenttable.appendChild(ohead);
	otable.removeNode(true);

	filltable(0);
	// bar.style.height =
	// queryResult.length*50+document.getElementById("scroll-y").offsetHeight -
	// 100;
	if (total) {
		bar.style.height = total * 50
				+ document.getElementById("scroll-y").offsetHeight - 100;
	}
}

// ��uuid�ӷ����������в�ѯjson��
function loadJsonFromCache(uuid, datatable2) {
	var url = PATH_PREFIX + datatable2.url + "?t=" + Math.random();
	var poststr = "&uuid=" + uuid;

	var oXMLHttp = creNewRequest();
	oXMLHttp.onreadystatechange = function() {
		if (oXMLHttp.readyState == 4 && oXMLHttp.status == 200) {
			callbackFromCache(oXMLHttp.responseText, datatable2);
		}
	}
	oXMLHttp.open("POST", url, true);
	oXMLHttp.setRequestHeader("Content-Type",
			"application/x-www-form-urlencoded");
	oXMLHttp.send(poststr);
}

// ����ӷ�����������ȡ�ص�json��
function callbackFromCache(responseText, datatable2) {
	try {
		eval("var result = " + responseText);
	} catch (ex) {
		alert("�޷���ȡ���ݣ�");
		return;
	}

	var queryResultFromCache = result.body;
	// ��queryResultFromCache׷�ӵ�queryResultĩβ
	queryResult = queryResult.concat(queryResultFromCache);
	allQueryResult = allQueryResult.concat(queryResultFromCache);
	// �����json�����滹�������飬�Ͱ�uuid�ӷ����������м�����ѯ
	var uuid = result.uuid;
	if (uuid != null) {
		loadJsonFromCache(uuid, datatable2);
	}
}

function createText() {
	var downText = "<br/><b>��ѯʱ��Ϊ</b>:";
	if (document.getElementById("begintime") != null) {
		var beginT = document.getElementById("begintime").value;
		var endT = document.getElementById("endtime").value;
		downText += beginT + " �� " + endT + "\n";
	} else if (document.getElementById("term") != null) {
		termvalue = document.getElementById("term").value
		if (termvalue == '-1') {
			downText += "1-12��";
		} else {
			downText += termvalue + "��";
		}
	} else {
		downText = "";
	}

	var selectlist = document.getElementsByTagName("SELECT");
	downText += "<br/><b>��ѯ��������</b>:\n<br/>";
	for (var i = 0; i < selectlist.length; i++) {
		if (selectlist[i].id == "selectsearchcolumn") {
			var oLabel = document.getElementById(selectlist[i].conditionid
					+ "_label");
			if (selectlist[i].type == "select") {
				var oDiv = document.getElementById(selectlist[i].conditionid
						+ "_treewindow");
				if (oDiv.tree.getSelected2() != null) {
					downText += oLabel.innerText + ":&nbsp;&nbsp;"
							+ oDiv.tree.getSelected2() + "<br/>\n";
				}
				// } else if (selectlist[i].type == "list") {
				// if (inText != null) {
				// downText += oLabel.innerText + ":&nbsp;&nbsp;" + inText +
				// "<br/>\n";
				// }
			}
		}
	}
	return downText;

}
