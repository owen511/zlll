// $Id: mouse.js 2091 2007-12-26 03:07:14Z wangdakui $

//扩展字符串的方法
String.prototype.trimMouse = function(){
	return this.replace(/(^[\s　]*)|([\s　]*$)/g,"");
}
if(typeof(PATH_PREFIX)=="undefined"){
	var PATH_PREFIX ="";
}
//高亮标示鼠标当前行
var markobj = null;
function markColumn() {
    var eventobj = event.srcElement;
    while(eventobj != null && eventobj.tagName != "TR") {
        eventobj = eventobj.parentElement;
    }
    if (eventobj == null) {
        return;
    }
    if (this.contains(eventobj) && markobj != eventobj) {
        if (markobj != null) {
            //删除原标示行的颜色
            markobj.runtimeStyle.backgroundColor = "";
        }
        //在新标示行上增加颜色
        markobj = eventobj
        markobj.runtimeStyle.backgroundColor = "#FFFFAC";
    }
}

//拖拽选择功能
function startDragSelect() {
    var tableobj = document.getElementById("contenttable");

    //y用户按下右键,不做任何处理
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
                        var startnum = Math.floor(document.getElementById("scroll-y").scrollTop / 50);
                        var nownum = i + startnum;
                        queryResult[nownum].selected = true;
                    }
                }

                //鼠标右键功能
                eventobj.oncontextmenu = function() {
                    return false;
                    var popwindow = window.createPopup();

                    var oPopBody = popwindow.document.body;
                    oPopBody.style.backgroundColor = "lightyellow";
                    oPopBody.style.border = "solid black 1px";
                    oPopBody.innerHTML = "<div style='text-align: center;font-size: 12px;padding: 3Px;cursor :hand' onmouseenter='document.body.style.backgroundColor=\"#86E7FF\"' onmouseout='document.body.style.backgroundColor=\"lightyellow\"' onclick='window.parent.document.getElementById(\"toExcel\").showSubGather()'>显示汇总</div>";

                    opop_x = getPos(this, "Left");
                    opop_y = getPos(this, "Top");

                    popwindow.show(event.offsetX, event.offsetY, 80, 20, event.srcElement);
                }
            } else {
                eventobj.style.backgroundColor = "";
                eventobj.selected = null;
                eventobj.oncontextmenu = null;

                var trObj = eventobj.parentElement.children;
                for (var i = 0; i < trObj.length; i++) {
                    if (trObj.item(i) == eventobj) {
                        var startnum = Math.floor(document.getElementById("scroll-y").scrollTop / 50);
                        var nownum = i + startnum;
                        queryResult[nownum].selected = null;
                    }
                }
            }
            currentColumn = eventobj;
        }
    } // tableobj.onmousemove

    tableobj.onmouseup = function() {
        tableobj.onmousemove=markColumn;
    }

    tableobj.onclick = tableobj.onmousemove
}

//取得对象在浏览者屏幕的位置
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
                //鼠标右键功能
                eventobj.oncontextmenu = function() {
                    var popwindow = window.createPopup();

                    var oPopBody = popwindow.document.body;
                    oPopBody.style.backgroundColor = "lightyellow";
                    oPopBody.style.border = "solid black 1px";
                    oPopBody.innerHTML = "<div style='text-align: center;font-size: 12px;padding: 3Px;cursor :hand' onmouseenter='document.body.style.backgroundColor=\"#86E7FF\"' onmouseout='document.body.style.backgroundColor=\"lightyellow\"' onclick='window.parent.document.getElementById(\"toExcel\").showSubGather()'>显示汇总</div>";

                    opop_x = getPos(this,"Left");
                    opop_y = getPos(this,"Top");

                    popwindow.show(event.offsetX, event.offsetY, 80, 20, event.srcElement);
            }
        }
    }
}

// 是否正在执行表格重绘
var funcrunning = false;

//检查汇总列类型（例如：单位、支出功能分类）
function checkGatherColumnType(i,colNumber,level){
       //隐藏右键单击弹出的窗口
       oPopupMenu.hide();
       //检测本模板是否包含合并的汇总列，如果包含，则退出，因为模板暂时不支持包含合并汇总列的模板查询要素下级数据的功能
       //union是在后台的json串中带过来的
       if (union > 0){
           return;
       }
	//设置全局变量rowNum:数据行号；columnNumber:汇总列号；showLevel：显示级次
	rowNum = parseInt(i);
	columnNumber = parseInt(colNumber);
       showLevel = parseInt(level);
/*
	//获取当前行数据
	var columnsTem = queryResult[i];
	//左侧汇总列
	var leftgatherColumnTem = columnsTem.gl;
	//右侧汇总列
	var rightgatherColumnTem = columnsTem.gr;
	//获取汇总列ID,以便组合成查询条件:(全局变量)
	gatherColumns = new Array(leftgatherColumnTem.length + rightgatherColumnTem.length);
       //获取汇总列glColumn标识，来区别是那个汇总列（支出功能分类还是单位）：（全局变量）
	canShowByLevel= new Array(leftgatherColumnTem.length + rightgatherColumnTem.length);
       canShowByAgencyLevel = new Array(leftgatherColumnTem.length + rightgatherColumnTem.length);
       //获取汇总列的层码结构
       codeFormats = new Array(leftgatherColumnTem.length + rightgatherColumnTem.length);
       //当显示代码的时候
       if (document.getElementById("showGatherColumnCode").checked){
           var temp = 0;
	    for(var i = 0;i < gatherColumns.length/2;i++){
		gatherColumns[temp] = document.getElementById("gatherColumn"+i).value;
              canShowByLevel[temp] = document.getElementById("gatherColumn"+i).tagName;
              canShowByAgencyLevel[temp] = document.getElementById("gatherColumn"+i).scopeName;
              codeFormats[temp] = document.getElementById("gatherColumn"+i).nodeName;
		gatherColumns[temp + 1] = document.getElementById("gatherColumn"+i).value;
              canShowByLevel[temp + 1] = document.getElementById("gatherColumn"+i).tagName;
              canShowByAgencyLevel[temp + 1] = document.getElementById("gatherColumn"+i).scopeName;
              codeFormats[temp + 1] = document.getElementById("gatherColumn"+i).nodeName;
              temp  += 2;
	    }
       }else {
	    for(var i = 0;i < gatherColumns.length;i++){
		gatherColumns[i] = document.getElementById("gatherColumn"+i).value;
              canShowByLevel[i] = document.getElementById("gatherColumn"+i).tagName;
              canShowByAgencyLevel[i] = document.getElementById("gatherColumn"+i).scopeName;
              codeFormats[i] = document.getElementById("gatherColumn"+i).nodeName;
	    }
       }
*/
       //判断当前汇总列是支出功能分类还是单位;如果是其中之一就继续执行，如果不是就退出程序
       if (canShowByLevel[columnNumber].localeCompare("true") == 0 || canShowByAgencyLevel[columnNumber].localeCompare("true") == 0){
       //判断如果已将存在下级数据，则删除其下级数据; rowNum + 1:当前行数据的下一行数据
       //记录删除下级数据的总行数;break为只删除当前数据的下级数据
       //合计行的默认代码为"0";小计行的默认代码为""
       var code = "0";
       var code2 = "";
       var delRowNum = rowNum;
       //当合计类型是小计、小计或合计时，双击第一行时，执行返回操作
           if (code.localeCompare(queryResult[rowNum].gl[0].c) == 0 || code2.localeCompare(queryResult[rowNum].gl[columnNumber].c) == 0 && rowNum == 0){
               return;
           }
       //小计行不能被单击查询下级数据
       if (code2.localeCompare(queryResult[rowNum].gl[columnNumber].c) == 0){
           return;
       }
       //判断是否是合计和小计
       //if (code.localeCompare(queryResult[0].gl[0].c) == 0 && code2.localeCompare(queryResult[1].gl[columnNumber].c) == 0){
           //delRowNum = rowNum + 1;
       //}
       //当前要素的行合并数
       var mergerNuber = queryResult[rowNum].gl[columnNumber].rsp;
       //记录总共删除了几行数据
       var delRow = 0;
       
       //当不是查询要素全部下级数据时，当当前要素有下级数据时会删除其下级数据并不再查询其全部下级数据，反之删除下级数据之后再去查询其所有下级数据
       if (!queryChildren){
           for (var j = delRowNum + mergerNuber; j < queryResult.length; j++ ){
               nextRowLevel = parseInt(queryResult[j].gl[columnNumber].l);
               if (nextRowLevel > showLevel){
                   delete queryResult[j];
                   delRow += 1;
               }else {
                   break;
               }
           }
       }
       if (delRow > 0){
           for (var k = delRowNum + mergerNuber; k < queryResult.length - delRow; k++ ){
               queryResult[k] = queryResult[k + delRow ];
           }
       queryResult.length -= delRow ;

    //处理汇总列行合并问题
    //当当前汇总列是从第二列开始的汇总列时，其前面的汇总列需要考虑行合并问题
    if (columnNumber >= 1){
        var columnNumberTem = columnNumber -1;
        //当显示代码时
        if (document.getElementById("showGatherColumnCode").checked){
            //当查询要素是名字汇总列时
            if (queryResult[rowNum].gl[columnNumber].c.localeCompare(queryResult[rowNum].gl[columnNumber - 1].c) == 0){
                columnNumberTem = columnNumber - 2;
            }else {
                columnNumberTem = columnNumber - 1;
            }
        }
      for (var mm = columnNumberTem; mm >= 0; mm--){
      var minRowNum = rowNum;
      var maxRowNum = rowNum;
            //为了在显示代码时提供便利而设置的变量
            var minColumnSize = 0;
            var mmTemp = mm - 1;
            //当显示代码时
            if (document.getElementById("showGatherColumnCode").checked){
                            minColumnSize = 1;
                mmTemp = mm - 2;        
            } 

        //查找合并汇总列的最大行号
        for (var i = rowNum + 1; i < queryResult.length; i++){
            //合并行代码
            var mergerCode = queryResult[i].gl[mm].c;
            if (mm > minColumnSize){
                if (mergerCode.localeCompare(queryResult[rowNum].gl[mm].c) == 0 && queryResult[i].gl[mmTemp].c.localeCompare(queryResult[rowNum].gl[mmTemp].c) == 0 ){
                    maxRowNum += 1;   
                }else {
                    break;
                }
            }else {
                if (mergerCode.localeCompare(queryResult[rowNum].gl[mm].c) == 0){
                    maxRowNum += 1;   
                }else {
                    break;
                }
            }
        }
        //查找合并汇总列的最小行号
        for (var j = rowNum - 1; j >= 0; j--){
            //合并行代码
            var mergerCode = queryResult[j].gl[mm].c;
            if (mm > minColumnSize){
                if (mergerCode.localeCompare(queryResult[rowNum].gl[mm].c) == 0 && queryResult[j].gl[mmTemp].c.localeCompare(queryResult[rowNum].gl[mmTemp].c) == 0 ){
                    minRowNum -= 1;   
                }else {
                    break;
                }
            }else {
                if (mergerCode.localeCompare(queryResult[rowNum].gl[mm].c) == 0){
                    minRowNum -= 1;   
                }else {
                    break;
                }
            }

        }
        //修改汇总列行合并
        for (var k = minRowNum; k < maxRowNum + 1; k++){
            queryResult[k].gl[mm].rsp = maxRowNum - k + 1;
        }
      }
    }

           filltable();
           return;
   }// (if (delRow > 0))如果删除了下级数据

        //如果是查询要素所有下级数据，则先把要素的所有已经存在的下级数据删除
    if (queryChildren){
       for (var j = delRowNum + mergerNuber; j < queryResult.length; j++ ){
           nextRowLevel = parseInt(queryResult[j].gl[columnNumber].l);
           if (nextRowLevel > parseInt(queryResult[rowNum].gl[columnNumber].l)){
               delete queryResult[j];
               delRow += 1;
           }else {
               break;
           }
       }
       if (delRow > 0){
           for (var k = delRowNum + mergerNuber; k < queryResult.length - delRow; k++ ){
               queryResult[k] = queryResult[k + delRow ];
           }
           queryResult.length -= delRow ;
       }
    }
    queryChildren = false;

        //开始查询要素下级数据：rowNum：行号；columnNumber：列号
        getChildData(rowNum,columnNumber);
       }else {
    return;
}
}

//i:汇总列的当前行号,colNumber:或总列的列号
//开始查询要素下级数据：i：行号；colNumber：列号
function getChildData(i,colNumber){
	//获取当前行数据
	var columnsTem = queryResult[i];
	//左侧汇总列
	var leftgatherColumnTem = columnsTem.gl;
	//当前行的查询条件
	var condition = "";
	for(var j = 0; j < parseInt(colNumber) + 1; j++){
		if(leftgatherColumnTem[j].c != "" || leftgatherColumnTem[j].c != null){
		condition += "&" + "quecondition_statcolumn_" + gatherColumns[j] + "=" + leftgatherColumnTem[j].c.trimMouse();
		}
	}
    var poststr = "";
//    if (datatable2.form != null) {
        for (i = 0; i < queryResultForm.elements.length; i++) {
            if (queryResultForm.elements[i].tagName == "SELECT") {
                var options = queryResultForm.elements[i].options;
                var name = queryResultForm.elements[i].name;
                for (var j = 0; j < options.length; j++) {
                    if (options[j].selected) {
                        //处理支出功能分类
                        if (canShowByLevel[colNumber].localeCompare("true") == 0 && name.localeCompare("showLevel") == 0){
                            //获取该汇总列的层码结构
                            var codeFormat = codeFormats[colNumber];
                            var codeFormatArray = codeFormat.split("-");
                            //处理默认查询时，一级单位或类级支出功能分类层次代码为0的情况
                            //if (showLevel == 0){
                                showLevel += 1;
                            //}
                            showLevel += 1; 
				 if(showLevel == codeFormatArray.length + 1 || showLevel == 0){
                               //提示该数据已是末级数据，不存在下级数据
                               alert("该数据已是末级数据!");
				    return;
				}else{
                                poststr += "&" + name + "=" + showLevel;                      
				}
                         //处理单位
                         }else if (canShowByAgencyLevel[colNumber].localeCompare("true") == 0 && name.localeCompare("agencyLevel") == 0){
                            //获取该汇总列的层码结构
                            var codeFormat = codeFormats[colNumber];
                                                 var codeFormatArray = codeFormat.split("-");
                            //处理默认查询时，一级单位或类级支出功能分类层次代码为0的情况
                            //if (showLevel == 0){
                                showLevel += 1;
                            //}
                            showLevel += 1; 
				 if(showLevel == codeFormatArray.length + 1 || showLevel == 0){
                               //提示该数据已是末级数据，不存在下级数据
                               alert("该数据已是末级数据!");
				    return;
				}else{
                                poststr += "&" + name + "=" + showLevel;                      
				}

                             }else{
                                //如果当前汇总列之前的汇总列包含支出功能分类或单位汇总列时，设置其级次

                                var le = 0;
                                if (document.getElementById("showGatherColumnCode").checked){
                                  if (colNumber > 1){
                                    for (var ii = 0 ; ii < colNumber - 1 ; ii= ii + 2){
                                        if (canShowByLevel[ii].localeCompare("true") == 0 && name.localeCompare("showLevel") == 0){
                                            le = parseInt(leftgatherColumnTem[ii].l) + 1;
                                            poststr += "&" + name + "=" + le;                      
                                        }else if(canShowByAgencyLevel[ii].localeCompare("true") == 0 && name.localeCompare("agencyLevel") == 0){
                                            le = parseInt(leftgatherColumnTem[ii].l) + 1;
                                            poststr += "&" + name + "=" + le;                      
                                        }else {
                                            poststr += "&" + name + "=" + options[j].value ;                      
                                        }
                                    }
                                  }else {
                                    poststr += "&" + name + "=" + options[j].value ;                      
                                  }
                                }else {
                                  if ( colNumber >0 ){
                                    for (var ii = 0 ; ii < colNumber ; ii ++){
                                        if (canShowByLevel[ii].localeCompare("true") == 0 && name.localeCompare("showLevel") == 0){
                                            le = parseInt(leftgatherColumnTem[ii].l) + 1;
                                            poststr += "&" + name + "=" + le;                      
                                        }else if(canShowByAgencyLevel[ii].localeCompare("true") == 0 && name.localeCompare("agencyLevel") == 0){
                                            le = parseInt(leftgatherColumnTem[ii].l) + 1;
                                            poststr += "&" + name + "=" + le;                      
                                        }else {
                                            poststr += "&" + name + "=" + options[j].value ;                      
                                        }
                                    }
                                  }else {
                                    poststr += "&" + name + "=" + options[j].value ;                      
                                  }
                                }
                            }
                    }
                }
            } else if (queryResultForm.elements[i].type == "checkbox"){
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
        //poststr += checkStr;
//    }
    var preurl = PATH_PREFIX + "/salary/discovery/template/ajaxquerybytemplateaction.do?t=" + Math.random();
    //发送请求
//alert(poststr);
    startRequest("POST",preurl,poststr,childDataResponse);
    //出现查询数据等待滚动条
    createDiv();
}
//回调函数
function childDataResponse(text){
    eval("var childData =" + text); 
    childDataResult = childData.body;

    //2008年12月16日 袁鑫;修改查询下级要素数据之后导出Excel并打印时打印内容与报表内容不一致的问题
    //ebody = childData.excel;

    //在要素下级数据插入到数组queryResult之前数组的长度，以便于与临时数组进行比较，看是否查到了要素的下级数据
    var queryResultLength = queryResult.length;
    //查找要插入的起始行号
    var insertNumber = 0;
    for (var i = 0; i < childDataResult.length; i++){
        //标识两行数据是否完全相等
        var flag = 1;
        for (var j = 0; j < columnNumber + 1; j++){
            if(queryResult[rowNum].gl[j].c.localeCompare(childDataResult[i].gl[j].c) != 0 || queryResult[rowNum].gl[j].l.localeCompare(childDataResult[i].gl[j].l) != 0){
                flag = 0;
                break;
            }
        }
        if (flag == 1){
            insertNumber = i;
        } 
    }
    //以上insertNumber行是和查询要素行相等的行，所以要从下级数据的下一行开始插入
    insertNumber += 1;
    //当要求显示代码时 
    var columnNumberForCode = columnNumber;
    if (document.getElementById("showGatherColumnCode").checked){
        columnNumberForCode -= 1;
    }
    //查找要插入的结束行号
    var insertEndNumber = 0;
    for (var i = 0; i < childDataResult.length; i++){
        //标识两行数据是否完全相等
        var flag = 1;
        for (var j = 0; j < columnNumberForCode; j++){
            if(queryResult[rowNum].gl[j].c.localeCompare(childDataResult[i].gl[j].c) != 0 || queryResult[rowNum].gl[j].l.localeCompare(childDataResult[i].gl[j].l) != 0){
                flag = 0;
                break;
            }
        }
        if (flag == 1){
            insertEndNumber = i;
        } 
    }
    //因为要插入包括结束行在内的数据，所以结束行insertEndNumber要加1
    insertEndNumber += 1;

    //当前要素的行合并数
    var mergerNuber = queryResult[rowNum].gl[columnNumber].rsp;
    var queryResultTem = new Array(queryResult.length + insertEndNumber - insertNumber);
    //把当前要素之前的数据存入临时数组中，存储当前要素
    for(var i = 0; i < rowNum + mergerNuber; i++){
    	queryResultTem[i] = queryResult[i];
    	}
    //把当前要素数据及当前要素下级数据存入临时数组中，向临时数组中存储除重复数据外的数据
    for(var j = rowNum + mergerNuber ; j < rowNum + mergerNuber + insertEndNumber -insertNumber ; j++){
    	queryResultTem[j] = childDataResult[j - rowNum - mergerNuber + insertNumber];
    	}
    //把剩余要素存入临时数组中
    for(var k = rowNum + insertEndNumber + mergerNuber - insertNumber; k < queryResultTem.length; k++){
    	queryResultTem[k] = queryResult[k - insertEndNumber + insertNumber];
    	}
    queryResult = queryResultTem; 
    //处理汇总列行合并问题
    //当当前汇总列是从第二列开始的汇总列时，其前面的汇总列需要考虑行合并问题
    if (columnNumber >= 1){
        var columnNumberTem = columnNumber -1;
        //当显示代码时
        if (document.getElementById("showGatherColumnCode").checked){
            //当查询要素是名字汇总列时
            if (queryResult[rowNum].gl[columnNumber].c.localeCompare(queryResult[rowNum].gl[columnNumber - 1].c) == 0){
                columnNumberTem = columnNumber - 2;
            }else {
                columnNumberTem = columnNumber - 1;
            }
        }
      for (var mm = columnNumberTem; mm >= 0; mm--){
      var minRowNum = rowNum;
      var maxRowNum = rowNum;
            //为了在显示代码时提供便利而设置的变量
            var minColumnSize = 0;
            var mmTemp = mm - 1;
            //当显示代码时
            if (document.getElementById("showGatherColumnCode").checked){
                            minColumnSize = 1;
                mmTemp = mm - 2;        
            } 

        //查找合并汇总列的最大行号
        for (var i = rowNum + 1; i < queryResult.length; i++){
            //合并行代码
            var mergerCode = queryResult[i].gl[mm].c;
            if (mm > minColumnSize){
                if (mergerCode.localeCompare(queryResult[rowNum].gl[mm].c) == 0 && queryResult[i].gl[mmTemp].c.localeCompare(queryResult[rowNum].gl[mmTemp].c) == 0 ){
                    maxRowNum += 1;   
                }else {
                    break;
                }
            }else {
                if (mergerCode.localeCompare(queryResult[rowNum].gl[mm].c) == 0){
                    maxRowNum += 1;   
                }else {
                    break;
                }
            }
        }
        //查找合并汇总列的最小行号
        for (var j = rowNum - 1; j >= 0; j--){
            //合并行代码
            var mergerCode = queryResult[j].gl[mm].c;
            if (mm > minColumnSize){
                if (mergerCode.localeCompare(queryResult[rowNum].gl[mm].c) == 0 && queryResult[j].gl[mmTemp].c.localeCompare(queryResult[rowNum].gl[mmTemp].c) == 0 ){
                    minRowNum -= 1;   
                }else {
                    break;
                }
            }else {
                if (mergerCode.localeCompare(queryResult[rowNum].gl[mm].c) == 0){
                    minRowNum -= 1;   
                }else {
                    break;
                }
            }

        }
        //修改汇总列行合并
        for (var k = minRowNum; k < maxRowNum + 1; k++){
            queryResult[k].gl[mm].rsp = maxRowNum - k + 1;
        }
      }
    }
    //fillChildren(rowNum,childDataResult.length - 1);
    //判断是否查询到了要素的下级数据，如果没有查到，则给出提示
    if (queryResultLength == queryResult.length){
        alert("该行数据没有下级数据!");
    }
    filltable();
}

//创建一个DIV窗口；用于在查询数据时告诉用户数据正在处理中
function createDiv(){
	//显示数据加载进度对象
	var moveDiv = document.getElementById("moveDiv");
       //覆盖数据div对象
       var convertData = document.getElementById("convertData");
	//显示数据div对象
	var viewDataDiv = document.getElementById("dataarea");
       var ttop  = viewDataDiv.offsetTop;  
	var twid = viewDataDiv.offsetWidth;
	var thei = viewDataDiv.offsetHeight;
	var tleft = viewDataDiv.offsetLeft;
	while (viewDataDiv = viewDataDiv.offsetParent){ttop+=viewDataDiv.offsetTop; tleft+=viewDataDiv.offsetLeft;}
       
       //设置覆盖数据div对象的绝对坐标
       convertData.style.position = "absolute";
       convertData.style.left = tleft;
            convertData.style.top = ttop;
            convertData.style.height = thei;
            convertData.style.width = twid + 18;
            convertData.style.backgroundColor = "black";
            convertData.style.filter = "alpha(opacity=50)";
            convertData.style.display = "inline";
 
	//设置div的绝对坐标
	moveDiv.style.position = "absolute";
       moveDiv.style.left = tleft + twid/2 - (400)/2; 
       moveDiv.style.top = ttop + thei/2 - (100)/2; 
	moveDiv.style.display = "inline";
}
//关闭div
function closeDiv(){
	document.getElementById("moveDiv").style.display = "none";
	document.getElementById("convertData").style.display = "none";
}

//设置全局变量来记录是查询要素下级数据还是查询要素所有下级数据
var queryChildren = false;

//当用户在汇总列要素单元格内右键单击时弹出查询下级要素的菜单;菜单为一弹出窗口
var oPopupMenu = window.createPopup();
function popMenu(i,colNumber,level){
    //获取当前鼠标的横坐标(x)和纵坐标（y）
    var tempx = event.clientX + document.body.scrollLeft;
    var tempy = event.clientY + document.body.scrollTop;

    //获取该汇总列的层码结构
    var codeFormat = codeFormats[colNumber];
    var codeFormatArray = codeFormat.split("-");
    //显示下级数据
    var popChild = document.getElementById("popChild");
    popChild.value = i;
    popChild.type = colNumber;
    popChild.className = level;

    //显示全部数据
    var popChildren = document.getElementById("popChildren");
    popChildren.value = i;
    popChildren.type = colNumber;
    //codeFormatArray的长度为要素的总级次，第一级是从0开始，所以要减1；因为要查下级数据，所以要查询做后一级的前一级，所以又要减1；共减2
    popChildren.className = codeFormatArray.length - 2;

    //折叠下级数据
    var collapseData = document.getElementById("collapseData");
    collapseData.value = i;
    collapseData.type = colNumber;
    collapseData.className = level;

    //当要素有下级数据的时候，折叠下级数据功能才能操作
    if (i < queryResult.length - parseInt(queryResult[i].gl[colNumber].rsp) && queryResult[i].gl[colNumber].l < queryResult[parseInt(i) + parseInt(queryResult[i].gl[colNumber].rsp)].gl[colNumber].l){
        collapseData.disabled = false;
        collapseData.onclick = "parent.checkGatherColumnType(this.value,this.type,this.className)";
        popChild.disabled = true;
        popChild.onclick = "return false";
    }else {
        collapseData.disabled = true;
        collapseData.onclick = "return false";
        popChild.disabled = false;
        popChild.onclick = "parent.checkGatherColumnType(this.value,this.type,this.className)";
    }
    var oPopupBody = oPopupMenu.document.body;
    oPopupBody.innerHTML = document.getElementById("test").innerHTML;;
    oPopupMenu.show(tempx, tempy, 105, 105, document.body);
}

//获取汇总列ID,以便组合成查询条件:(全局变量)
var gatherColumns;
//获取汇总列glColumn标识，来区别是那个汇总列（支出功能分类还是单位）：（全局变量）
var canShowByLevel;
var canShowByAgencyLevel;
//获取汇总列的层码结构
var codeFormats;

// 重绘表格(仅绘制MAXLINE=25行)
function filltable(startnum) {
    //2008-08-05袁鑫;处理查询结果没有数据的情况
    if (queryResult.length != 0){
	//获取第一行数据
	var columnsTem = queryResult[0];
	//左侧汇总列
	var leftgatherColumnTem = columnsTem.gl;
	//右侧汇总列
	var rightgatherColumnTem = columnsTem.gr;
	//获取汇总列ID,以便组合成查询条件:(全局变量)
	gatherColumns = new Array(leftgatherColumnTem.length + rightgatherColumnTem.length);
       //获取汇总列glColumn标识，来区别是那个汇总列（支出功能分类还是单位）：（全局变量）
	canShowByLevel= new Array(leftgatherColumnTem.length + rightgatherColumnTem.length);
       canShowByAgencyLevel = new Array(leftgatherColumnTem.length + rightgatherColumnTem.length);
       //获取汇总列的层码结构
       codeFormats = new Array(leftgatherColumnTem.length + rightgatherColumnTem.length);
       //当显示代码的时候
    if (isTemplateQuery.localeCompare("true") == 0){
       if (document.getElementById("showGatherColumnCode").checked){
           var temp = 0;
	    for(var i = 0;i < gatherColumns.length/2;i++){
		gatherColumns[temp] = document.getElementById("gatherColumn"+i).value;
              canShowByLevel[temp] = document.getElementById("gatherColumn"+i).tagName;
              canShowByAgencyLevel[temp] = document.getElementById("gatherColumn"+i).scopeName;
              codeFormats[temp] = document.getElementById("gatherColumn"+i).nodeName;
		gatherColumns[temp + 1] = document.getElementById("gatherColumn"+i).value;
              canShowByLevel[temp + 1] = document.getElementById("gatherColumn"+i).tagName;
              canShowByAgencyLevel[temp + 1] = document.getElementById("gatherColumn"+i).scopeName;
              codeFormats[temp + 1] = document.getElementById("gatherColumn"+i).nodeName;
              temp  += 2;
	    }
       }else {
	    for(var i = 0;i < gatherColumns.length;i++){
		gatherColumns[i] = document.getElementById("gatherColumn"+i).value;
              canShowByLevel[i] = document.getElementById("gatherColumn"+i).tagName;
              canShowByAgencyLevel[i] = document.getElementById("gatherColumn"+i).scopeName;
              codeFormats[i] = document.getElementById("gatherColumn"+i).nodeName;
	    }
       }
    }
       //跟据是系统菜单模板查询还是普通模板查询来设置树形展开、折叠按钮的绝对路径
		var imageAddUrl = PATH_PREFIX + "/images/tree_ico/plus.gif";
		var imageSubtractUrl = PATH_PREFIX + "/images/tree_ico/minus.gif";
    }

    funcrunning = true;
    var MAXLINE = 25;

    var odate = new Date();
    var start = odate.getMilliseconds() + odate.getSeconds() * 1000;
    //如果起始行为空，则重新算一下起始行
    if (startnum == null) {
        startnum = Math.floor(document.getElementById("scroll-y").scrollTop / 50);
    }

    tbody = "";
//    loop = 1;

    //cloop = queryResult[i];
    for (var i = startnum; i < queryResult.length && i < startnum+MAXLINE; i++) {
//        if (loop++ > MAXLINE) {
//            break;
//        }

        cloop = i;
        columns = queryResult[cloop];
        if (columns.selected) {
            TRHTML = "<tr selected='true'>";
        } else{
            TRHTML = "<tr>";
        }
        leftgatherColumn = columns.gl;
        rightgatherColumn = columns.gr;
        statColumn = columns.s;

        //当显示汇总列代码时，记录是代码列还是名称列
        var isCode = 1;

        //2008-07-21袁鑫；判断是模板查询还好似普通查询
      if (isTemplateQuery.localeCompare("false") == 0){
        for (gloop in leftgatherColumn) {
            gcolumn = leftgatherColumn[gloop];
            if (gcolumn.t == "" || gcolumn.t == null) {
                gcolumn.t = "&nbsp;";
            }
            if (gcolumn.rsp != null && gcolumn.rsp != 0) {
                if (i == startnum) {
                    TRHTML += '<td rowspan="' + gcolumn.rsp + '" valign="top" nowrap><div align="left">' + gcolumn.t + '</div></td>';
                } else {
                    if (queryResult[cloop-1].gl[gloop].rsp == 1) {
                        TRHTML += '<td rowspan="' + gcolumn.rsp + '" valign="top" nowrap><div align="left">' + gcolumn.t + '</div></td>';
                    }
                }
            } else if (gcolumn.csp != null && gcolumn.csp != 0) {
                TRHTML += '<td colspan="' + gcolumn.csp + '" nowrap><div align="left">' + gcolumn.t + '</div></td>';
            }
        }
      }else {
        for (gloop in leftgatherColumn) {
            gcolumn = leftgatherColumn[gloop];
            //查找汇总列名字最后一个空格的位置，然后放置展开折叠图标
            var index = gcolumn.t.lastIndexOf("　");
            index += 1;
            if (gcolumn.t == "" || gcolumn.t == null) {
                gcolumn.t = "&nbsp;";
            }
            if (gcolumn.rsp != null && gcolumn.rsp != 0) {
                if (i == startnum) {

                    //合计行的默认代码为"0";小计行的默认代码为""
                    var code = "0";
                    var code2 = "";
                    //2008-07-14判断当汇总列是支出功能分类或单位时加上下级要素展开标志
                    if ((canShowByLevel[gloop].localeCompare("true") == 0 || canShowByAgencyLevel[gloop].localeCompare("true") == 0) && union == 0){
                        if (code.localeCompare(queryResult[cloop].gl[0].c) == 0 || code2.localeCompare(queryResult[cloop].gl[gloop].c) == 0 && cloop == 0){
                            TRHTML += '<td rowspan="' + gcolumn.rsp + '" valign="top" id="' + cloop + '" name="' + gloop + '" tagName="' + gcolumn.l + '" nowrap ondblclick="checkGatherColumnType(this.id,this.name,this.tagName);"><div align="left">' + gcolumn.t + '</div></td>';
                        }else {
                            if (isCode == 1){
                                TRHTML += '<td rowspan="' + gcolumn.rsp + '" valign="top" id="' + cloop + '" name="' + gloop + '" tagName="' + gcolumn.l + '" nowrap ondblclick="checkGatherColumnType(this.id,this.name,this.tagName);" oncontextmenu="popMenu(this.id,this.name,this.tagName);"><div align="left">' + gcolumn.t.substring(0,index) + '<img src="' + imageAddUrl + '" border="0" id="' + cloop + '" name="' + gloop + '" tagName="' + gcolumn.l + '" onclick="checkGatherColumnType(this.id,this.name,this.tagName);"/>&nbsp;' + gcolumn.t.substring(index) + '</div></td>';
                                isCode = 0;
                            }else {
                                TRHTML += '<td rowspan="' + gcolumn.rsp + '" valign="top" id="' + cloop + '" name="' + gloop + '" tagName="' + gcolumn.l + '" nowrap ondblclick="checkGatherColumnType(this.id,this.name,this.tagName);"  oncontextmenu="popMenu(this.id,this.name,this.tagName);"><div align="left">' + gcolumn.t + '</div></td>';
                            }
                        }
                    }else {
                        TRHTML += '<td rowspan="' + gcolumn.rsp + '" valign="top" id="' + cloop + '" name="' + gloop + '" tagName="' + gcolumn.l + '" nowrap ondblclick="checkGatherColumnType(this.id,this.name,this.tagName);"><div align="left">' + gcolumn.t + '</div></td>';
                    }
                } else {
                    if (queryResult[cloop-1].gl[gloop].rsp == 1) {
                        //2008-07-14判断当汇总列是支出功能分类或单位时加上下级要素展开标志
                        if ((canShowByLevel[gloop].localeCompare("true") == 0 || canShowByAgencyLevel[gloop].localeCompare("true") == 0) && union == 0){
                            //处理当前行是小计行时，不现实展开折叠符号;合计行的默认代码为"0";小计行的默认代码为""
                            if ("".localeCompare(queryResult[cloop].gl[gloop].c) != 0 ){
                                //判断当显示代码时，只在代码汇总列上显示其展开折叠符号
                                if (document.getElementById("showGatherColumnCode").checked){
                                    if (isCode == 1){
                                        //判断数据是否有下级数据,如果下一行数据的显示级次大于本行数据的显示级次，则本行数据的图标应用可折叠的图标标识
                                        if (cloop < queryResult.length - parseInt(leftgatherColumn[gloop].rsp) && leftgatherColumn[gloop].l < queryResult[cloop + parseInt(leftgatherColumn[gloop].rsp)].gl[gloop].l){
                                            TRHTML += '<td rowspan="' + gcolumn.rsp + '" valign="top" id="' + cloop + '" name="' + gloop + '" tagName="' + gcolumn.l + '" nowrap ondblclick="checkGatherColumnType(this.id,this.name,this.tagName);" oncontextmenu="popMenu(this.id,this.name,this.tagName);"><div align="left">' + gcolumn.t.substring(0,index) + '<img src="' + imageSubtractUrl + '" border="0" id="' + cloop + '" name="' + gloop + '" tagName="' + gcolumn.l + '" onclick="checkGatherColumnType(this.id,this.name,this.tagName);"/>&nbsp;' + gcolumn.t.substring(index) + '</div></td>';
                                        }else {
                                            TRHTML += '<td rowspan="' + gcolumn.rsp + '" valign="top" id="' + cloop + '" name="' + gloop + '" tagName="' + gcolumn.l + '" nowrap ondblclick="checkGatherColumnType(this.id,this.name,this.tagName);" oncontextmenu="popMenu(this.id,this.name,this.tagName);"><div align="left">' + gcolumn.t.substring(0,index) + '<img src="' + imageAddUrl + '" border="0" id="' + cloop + '" name="' + gloop + '" tagName="' + gcolumn.l + '" onclick="checkGatherColumnType(this.id,this.name,this.tagName);"/>&nbsp;' + gcolumn.t.substring(index) + '</div></td>';
                                        }
                                        isCode = 0;
                                    }else {
                                        TRHTML += '<td rowspan="' + gcolumn.rsp + '" valign="top" id="' + cloop + '" name="' + gloop + '" tagName="' + gcolumn.l + '" nowrap ondblclick="checkGatherColumnType(this.id,this.name,this.tagName);"  oncontextmenu="popMenu(this.id,this.name,this.tagName);"><div align="left">' + gcolumn.t + '</div></td>';
                                        isCode = 1;
                                    }
                                }else {
                                    //判断数据是否有下级数据,如果下一行数据的显示级次大于本行数据的显示级次，则本行数据的图标应用可折叠的图标标识
                                    if (cloop < queryResult.length - parseInt(leftgatherColumn[gloop].rsp) && leftgatherColumn[gloop].l < queryResult[cloop + parseInt(leftgatherColumn[gloop].rsp)].gl[gloop].l){
                                        TRHTML += '<td rowspan="' + gcolumn.rsp + '" valign="top" id="' + cloop + '" name="' + gloop + '" tagName="' + gcolumn.l + '" nowrap ondblclick="checkGatherColumnType(this.id,this.name,this.tagName);" oncontextmenu="popMenu(this.id,this.name,this.tagName);"><div align="left">' + gcolumn.t.substring(0,index) + '<img src="' + imageSubtractUrl + '" border="0" id="' + cloop + '" name="' + gloop + '" tagName="' + gcolumn.l + '" onclick="checkGatherColumnType(this.id,this.name,this.tagName);"/>&nbsp;' + gcolumn.t.substring(index) + '</div></td>';
                                    }else {
                                        TRHTML += '<td rowspan="' + gcolumn.rsp + '" valign="top" id="' + cloop + '" name="' + gloop + '" tagName="' + gcolumn.l + '" nowrap ondblclick="checkGatherColumnType(this.id,this.name,this.tagName);" oncontextmenu="popMenu(this.id,this.name,this.tagName);"><div align="left">' + gcolumn.t.substring(0,index) + '<img src="' + imageAddUrl + '" border="0" id="' + cloop + '" name="' + gloop + '" tagName="' + gcolumn.l + '" onclick="checkGatherColumnType(this.id,this.name,this.tagName);"/>&nbsp;' + gcolumn.t.substring(index) + '</div></td>';
                                    }
                                }
                            }else {
                                TRHTML += '<td rowspan="' + gcolumn.rsp + '" valign="top" id="' + cloop + '" name="' + gloop + '" tagName="' + gcolumn.l + '" nowrap ondblclick="checkGatherColumnType(this.id,this.name,this.tagName);"><div align="left">' + gcolumn.t + '</div></td>';
                            }
                        }else {
                            TRHTML += '<td rowspan="' + gcolumn.rsp + '" valign="top" id="' + cloop + '" name="' + gloop + '" tagName="' + gcolumn.l + '" nowrap ondblclick="checkGatherColumnType(this.id,this.name,this.tagName);"><div align="left">' + gcolumn.t + '</div></td>';
                        }
                    }
                }
            } else if (gcolumn.csp != null && gcolumn.csp != 0) {
                TRHTML += '<td colspan="' + gcolumn.csp + '" nowrap><div align="left">' + gcolumn.t + '</div></td>';
            }
        }
      }
        TRHTML += "<td nowrap>" + statColumn.replace(/;/g,"&nbsp;</td><td nowrap>") + "&nbsp;</td>";
        for (gloop in rightgatherColumn) {
            gcolumn = rightgatherColumn[gloop];
            if (gcolumn.t == "") {
                gcolumn.t = "&nbsp;";
            }
            if (gcolumn.rsp != null && gcolumn.rsp != 0) {
                if (i == startnum) {
                    TRHTML += '<td rowspan="' + gcolumn.rsp + '" valign="top" nowrap><div align="left" nowrap>' + gcolumn.t + '</div></td>';
                } else {
                    if (cloop == 1 || queryResult[cloop-1].gr[gloop].rsp == 1) {
                        TRHTML += '<td rowspan="' + gcolumn.rsp + '" valign="top" nowrap><div align="left" nowrap>' + gcolumn.t + '</div></td>';
                    }
                }
            } else if (gcolumn.csp != null && gcolumn.csp != 0) {
                TRHTML += '<td colspan="' + gcolumn.csp + '" nowrap><div align="left" nowrap>' + gcolumn.t + '</div></td>';
            }
        }
        TRHTML += "</tr>";
        tbody += TRHTML;
    }
    //ebody = tbody;
    contenttable.tBodies.item(0).removeNode(true);
    //2008-07-11袁鑫 在要素下级数据填充之前，关闭数据加载滚动条
    if (isTemplateQuery.localeCompare("true") == 0){
        closeDiv();
    }
    temptablearea.innerHTML = "<table id=temptable><tbody>" + tbody + "</tbody></table>";
    var otable = document.getElementById("temptable");

    otbody = otable.tBodies.item(0);
    contenttable.appendChild(otbody);
    otable.removeNode(true);

    var odate = new Date();
    var end = odate.getMilliseconds() + odate.getSeconds() * 1000;

    //window.status = (end-start)+"(ms)";
    funcrunning = false;
    flag = false;
    bar.style.height = queryResult.length*50+document.getElementById("scroll-y").offsetHeight - 100;
}

//根据合计行创建编号列
function createNumberColumn(column) {
	if(column == null) return "";

    var leftgatherColumn = column.gl;
    var rightgatherColumn = column.gr;
    var statColumn = column.s.split(";");

    TRHTML = "<tr>";
    TRHTML += '<td colspan="' + getColumnNumberOfGatherColumn(leftgatherColumn) + '">&nbsp;</td>';
    for (var i = 0; i < statColumn.length; i++) {
        TRHTML += '<td><div align="center">' + (i + 1) + '</div></td>';
    }
    if (rightgatherColumn.length > 0) {
        TRHTML += '<td colspan="' + getColumnNumberOfGatherColumn(rightgatherColumn) + '">&nbsp;</td>';
    }
    return TRHTML;
}

function getColumnNumberOfGatherColumn(gatherColumn){
    var cnumber = 0;
    for (gloop in gatherColumn) {
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
    oMark.style.height = "100%"; //oObject.offsetHeight;
    oMark.style.width = "100%"; //oObject.offsetWidth;
    oMark.style.backgroundColor = "#000000";
    oMark.style.filter = "Alpha=50%";

    oObject.insertAdjacentElement("afterEnd", oMark);
    oObject.mark = oMark;
}

function unmark(oObject) {
    var oMark = oObject.mark;
    oMark.removeNode(true);
}

// 查询结果的数据表对象
datatable = function() {
    this.parentDiv = null; //显示表格用的DIV元素
    this.form = null; //提交查询条件用的form
    this.type = 0;
    this.url = "/salary/discovery/template/ajaxquerybytemplateaction.do";
    this.running = false;

    //2008-07-21袁鑫
    var imageForView =  PATH_PREFIX + "/images/bann_ico/loading.gif";

    this.show = function() {
        this.parentDiv.innerHTML = '<div id="scroll-y" class="scroll-y"><div class="bar" id="bar"></div></div><div id="scroll-x" class="scroll-x"><div align="left"></div><table border="0" cellspacing="0" class="searchtable" width="100%" id="contenttable"><thead></thead><tbody><tr><td><div align="left"><img src="' + imageForView + '" border="0" alt="加载中，请稍候……"/>加载中，请稍候……</div></td></tr></tbody></table></div>';
        var temptablearea = document.getElementById("temptablearea");
        if (temptablearea == null) {
            temptablearea = document.createElement('<div id=temptablearea style="display:none"></div>');
            this.parentDiv.insertAdjacentElement("afterEnd", temptablearea);
        }

        var tableobj = document.getElementById("contenttable");
        var scroll_y = document.getElementById("scroll-y");
        tableobj.onmousemove = markColumn;
        //屏蔽鼠标右键
        tableobj.oncontextmenu = function() {return false;};
        scroll_y.oncontextmenu = function() {return false;};
        //屏蔽圈选
        tableobj.onselectstart = function() {return false;};
        scroll_y.onselectstart = function() {return false;};
        //增加圈选功能
        //tableobj.onmousedown = startDragSelect;

        var odiv_y = document.getElementById("scroll-y");
        odiv_y.onscroll = function() {
            if (!funcrunning) {
                window.setTimeout(filltable, 1);
                funcrunning = true;
            }
        }
        loadJson(this);
        //this.resize();
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

        var high = windowHigh-ttop-10;
        var width = windowWidth-tleft-32;

        scroll_x.style.height = high;
        scroll_x.style.width = width;
        var scroll_y = document.getElementById("scroll-y");
        scroll_y.style.height = high;
        scroll_y.style.width = width+17;
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
            } else if (queryResultForm.elements[i].type == "checkbox"){
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
//alert(poststr);
    oXMLHttp.open("POST", url, true);
    oXMLHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
    oXMLHttp.send(poststr);
}

function callback(responseText, datatable2) {
//        var d = new Date();
//        start = d.getMilliseconds() + d.getSeconds() * 1000;
    try {
        eval("var result = " + responseText);
    } catch (ex) {
        alert("无法获取数据！");
        return;
    }
//        d = new Date();
//        end = d.getMilliseconds() + d.getSeconds() * 1000;
    //window.status = "解析耗时："+(end-start)+"ms"

    // 获得查询结果
    queryResult = result.body;
    // 获取本模板是否具有合并汇总列
    union = parseInt(result.union);
    //判断是模板查询还是普通查询
    isTemplateQuery = result.isTemplateQuery;
    // 所有json串的记录总数
    var total = result.total;
    // 如果该json串后面还有其他块，就按uuid从服务器缓存中继续查询
    var uuid = result.uuid;
    if (uuid != null) {
        loadJsonFromCache(uuid, datatable2);
    }
    // 获得模板的标题内容
    var caption = result.headTable;
    var templateCaptionDiv = document.getElementById("templateCaption");
    if (templateCaptionDiv != null) {
        templateCaptionDiv.innerHTML = caption;
    }

    headTable = result.headTable;
    var head = result.head + createNumberColumn(queryResult[0]);
    ehead = head;
    ebody = result.excel;


    if (contenttable.tHead != null) {
        contenttable.tHead.removeNode(true);
    }

    var column = queryResult[0];

    temptablearea.innerHTML = "<table id=temptable><thead>" + head + "</thead></table>";
    var otable = document.getElementById("temptable");

    //隐藏不需要的统计列明细表头信息
    var hearArrayLength = otable.tHead.rows.length - 1;
    if (queryResult.length == 0){
        hearArrayLength = otable.tHead.rows.length;	
    }
    var headArray = new Array(hearArrayLength);
    //左侧汇总列的个数 
    var leftGatherColumn = parseInt(result.leftGatherColumnNumber);
    //统计列明细值
    var statColumnDetailStr = result.statColumnDetails;
    //把显示隐藏统计列明细信息放入数组中
    var statColumnDetail = new Array(statColumnDetailStr.length);
    for (var m = 0; m < statColumnDetail.length; m++){
            statColumnDetail[m] = parseInt(statColumnDetailStr.substring(m, m + 1));
    }
    //查找二维数组的列数
    var colNumbers = 0;
    for (var i = leftGatherColumn; i < otable.tHead.rows(0).cells.length; i++){
	var colNumber = otable.tHead.rows(0).cells(i).colSpan;
	colNumbers +=colNumber;
    }
    //对二维数组的每一行进行初始化
    for (var ii = 0; ii < headArray.length; ii++){
	headArray[ii] = new Array(colNumbers);
    }
    //把每一单元格内容放入二维数组的对应位置
    var startcell=0;
    for (var jj = 0; jj < headArray.length; jj++){
        startcell=0;
	//如果是第一行要删除左侧的汇总列
	if (jj == 0){
		for (var kk = leftGatherColumn; kk < otable.tHead.rows[jj].cells.length; kk++){
	    	startcell = Filltable(jj,startcell,otable.tHead.rows[jj].cells[kk]);
		}
	}else {
		for (var kk = 0; kk < otable.tHead.rows[jj].cells.length; kk++){
	    	startcell = Filltable(jj,startcell,otable.tHead.rows[jj].cells[kk]);
		}
	}
    }

    /**
     *  返回值：下一个填充单元格的列数
   *  参数：startrow:起始行；startcol：当前列；thobj：统计列明细对象
   */
    function Filltable(startrow,startcol,thobj){
    	var currentCell = startcol;
    	if (startrow == 0){
    	    for (var k = startcol; k < thobj.colSpan + startcol; k++){
    			if (headArray[startrow][k] == null){
    				headArray[startrow][k] = thobj;
    				currentCell += 1; 
    				//处理多行合并的情况
    				if (thobj.rowSpan > 1){
    					for (var j = startrow + 1; j < thobj.rowSpan + startrow; j++){
    					    headArray[j][k] = thobj;
    					  }
    				  }
    			  }else {
    				  startcol += 1;
    			  	  currentCell += 1; 
    			    }
    		    }
    	    }else {
    			for (var k = startcol; k < thobj.colSpan + startcol; k++){
    			//处理多个统计列联合查询时，各个统计列的高度不一致的情况
                         //if (startrow > 1){
    				if (headArray[startrow - 1][k].colSpan > 1){
    					if (headArray[startrow][k] == null){
    						headArray[startrow][k] = thobj;
    						currentCell += 1; 
    						//处理多行合并的情况
    					if (thobj.rowSpan > 1){
    						for (var j = startrow + 1; j < thobj.rowSpan + startrow; j++){
    							headArray[j][k] = thobj;
    						}
    					}
    			}else {
    				startcol += 1;
    				currentCell += 1; 
    			}
    		}else {
    				startcol += 1;
    				currentCell += 1; 
    			}
    	}
     //}//if (startrow > 1)

    }
    	return currentCell;
    }
    //处理多个统计列联合查询时，各个统计列的高度不一致的情况
    for (var aa = 0; aa < headArray.length - 1; aa++){
            for (var a = 0; a < headArray[aa].length; a++){
                    if (headArray[aa + 1][a] == null){
                            headArray[aa + 1][a] = headArray[aa][a];
                            headArray[aa + 1][a].rowSpan += 1;        
                        }
                }
        }
    for ( var mm = 0; mm < statColumnDetail.length; mm++){
    	if (statColumnDetail[mm] == 0){
    		//保存多行多列合并对象修改之前的状态
    		var colState = 0;
    		for (var nn = 0; nn < headArray.length; ){
    			element = headArray[nn][mm];
    			rowNumber = element.rowSpan;
    			colNumber = element.colSpan;
    			//处理没有列合并的情况
    			if (colNumber == 1){
    				element.style.display="none";
    			}
    			//处理多列合并的情况
    			else if (colNumber > 1){
    				element.colSpan = element.colSpan - 1;
    			}
    			nn+=rowNumber;
    		}
    	}
    }
    ohead = otable.tHead;
    contenttable.appendChild(ohead);
    otable.removeNode(true);

    filltable(0);
    //bar.style.height = queryResult.length*50+document.getElementById("scroll-y").offsetHeight - 100;
    bar.style.height = total*50+document.getElementById("scroll-y").offsetHeight - 100;
}

// 按uuid从服务器缓存中查询json串
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
    oXMLHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    oXMLHttp.send(poststr);
}

// 处理从服务器缓存中取回的json串
function callbackFromCache(responseText, datatable2) {
    try {
        eval("var result = " + responseText);
    } catch (ex) {
        alert("无法获取数据！");
        return;
    }

    var queryResultFromCache = result.body;
    // 把queryResultFromCache追加到queryResult末尾
    queryResult = queryResult.concat(queryResultFromCache);

    // 如果该json串后面还有其他块，就按uuid从服务器缓存中继续查询
    var uuid = result.uuid;
    if (uuid != null) {
        loadJsonFromCache(uuid, datatable2);
    }
}

function createText() {
    var downText = "<br/><b>查询时间为</b>:";
    if (document.getElementById("begintime") != null) {
        var beginT = document.getElementById("begintime").value;
        var endT = document.getElementById("endtime").value;
        downText += beginT + " 至 " + endT + "\n";
    } else if (document.getElementById("term") != null) {
        termvalue = document.getElementById("term").value
        if (termvalue == '-1') {
            downText += "1-12月";
        } else {
            downText += termvalue + "月";
        }
    } else{
        downText = "";
    }

    var selectlist = document.getElementsByTagName("SELECT");
    downText += "<br/><b>查询条件如下</b>:\n<br/>";
    for (var i = 0; i < selectlist.length; i++) {
        if (selectlist[i].id == "selectsearchcolumn") {
            var oLabel = document.getElementById(selectlist[i].conditionid + "_label");
            if (selectlist[i].type == "select") {
                var oDiv = document.getElementById(selectlist[i].conditionid + "_treewindow");
                if (oDiv.tree.getSelected2() != null) {
                    downText += oLabel.innerText + ":&nbsp;&nbsp;" + oDiv.tree.getSelected2() + "<br/>\n";
                }
//            } else if (selectlist[i].type == "list") {
//                if (inText != null) {
//                    downText += oLabel.innerText + ":&nbsp;&nbsp;" + inText + "<br/>\n";
//                }
            }
        }
    }
    return downText;
}