function method1(tableid) {
   //整个表格拷贝到EXCEL中
    var curTbl = document.getElementById(tableid);
    var oXL = new ActiveXObject("Excel.Application");
    //创建AX对象excel
    var oWB = oXL.Workbooks.Add();
    //获取workbook对象
    var oSheet = oWB.ActiveSheet;
    //激活当前sheet
    var sel = document.body.createTextRange();
    sel.moveToElementText(curTbl);
    //把表格中的内容移到TextRange中
    sel.select();
    //全选TextRange中内容
    sel.execCommand("Copy");
    //复制TextRange中内容 
    oSheet.Paste();
    //粘贴到活动的EXCEL中      
    oXL.Visible = true;
    //设置excel可见属性
}

function method2(tableid) //读取表格中每个单元到EXCEL中
{   
    var curTbl = document.getElementById(tableid);
    var oXL = new ActiveXObject("Excel.Application");
    //创建AX对象excel
    var oWB = oXL.Workbooks.Add();
    //获取workbook对象
    var oSheet = oWB.ActiveSheet;
    //激活当前sheet
    var Lenr = curTbl.rows.length;
    //取得表格行数
    var curCellText = "";
    for (i = 0; i < Lenr; i++)
    {        
        var Lenc = curTbl.rows(i).cells.length;

        //取得每行的列数
        for (j = 0; j < Lenc; j++)
        {
            if(i == 0){
               if(curTbl.rows(i).cells(j).innerText == ""){                 
                   
               }
            }
            oSheet.Cells(i + 1, j + 1).value = curTbl.rows(i).cells(j).innerText;
            //赋值
        }
    }
    oXL.Visible = true;
    //设置excel可见属性
}

function method3(tableid) //读取表格中每个单元到EXCEL中
	{   
	    var curTbl = document.getElementById(tableid);
	    var oXL = new ActiveXObject("Excel.Application");
	    //创建AX对象excel
	    var oWB = oXL.Workbooks.Add();
	    //获取workbook对象
	    var oSheet = oWB.ActiveSheet;
	    //激活当前sheet
	    var Lenr = curTbl.rows.length;
	    //取得表格行数
	    var curCellText = "";
	    var nkcol = -1; //空表格记录	    
	    
	    for (i = 0; i < Lenr; i++)
	    {    	       
	        var Lenc = curTbl.rows(i).cells.length;	        
	        if(i == 0){
		        //取得每行的列数
		        for (j = 0; j < Lenc; j++)
		        {
		            var vText = curTbl.rows(i).cells(j).innerText;
		            if(nkcol == -1){
		              if(vText == null || vText == ""){
		                 nkcol = j;
		                 oSheet.Cells(i + 1, j + 1).value = curTbl.rows(i).cells(j+1).innerText;
		              }else{
		                 oSheet.Cells(i + 1, j + 1).value = curTbl.rows(i).cells(j).innerText;		 
		              }
		            }else{
		               if(j == Lenc - 1){
                          continue;
		               }else{
      	                  oSheet.Cells(i + 1, j + 1).value = curTbl.rows(i).cells(j+1).innerText;		 
		               }
		            }		          
		        }
	        }
	        
	        if(nkcol > -1){	           
	           	//取得每行的列数
		        for (j = 0; j < Lenc; j++)
		        {
		            if(nkcol > j){
          		            oSheet.Cells(i + 1, j + 1).value = curTbl.rows(i).cells(j).innerText;
		            }else{
		                if(j == Lenc-1){
		                  continue;
		                }else
		                  oSheet.Cells(i + 1, j + 1).value = curTbl.rows(i).cells(j+1).innerText;
		            }
		        }
	        }else{
	          	//取得每行的列数
		        for (j = 0; j < Lenc; j++)
		        {
		            oSheet.Cells(i + 1, j + 1).value = curTbl.rows(i).cells(j).innerText;
		            //赋值
		        }
	        }	        
	        	 
	    }
	    oXL.Visible = true;
	    //设置excel可见属性
	}	

 function method4(tableid,diretory,isopen) //读取表格中每个单元到EXCEL中
	{   
	    diretory=diretory.replace("\"","\\\"");
	    var curTbl = document.getElementById(tableid);
	    var oXL = new ActiveXObject("Excel.Application");
	    //创建AX对象excel
	    var oWB = oXL.Workbooks.Add();
	    //获取workbook对象
	    var oSheet = oWB.ActiveSheet;
	    //激活当前sheet
	    var Lenr = curTbl.rows.length;
	    //取得表格行数
	    var curCellText = "";
	    var nkcol = -1; //空表格记录	    
	    
	    for (i = 0; i < Lenr; i++)
	    {    	       
	        var Lenc = curTbl.rows(i).cells.length;	        
	        if(i == 0){
		        //取得每行的列数
		        for (j = 0; j < Lenc; j++)
		        {
		            var vText = curTbl.rows(i).cells(j).innerText;
		            if(nkcol == -1){
		              if(vText == null || vText == ""){
		                 nkcol = j;
		                 oSheet.Cells(i + 1, j + 1).value = curTbl.rows(i).cells(j+1).innerText;
		              }else{
		                 oSheet.Cells(i + 1, j + 1).value = curTbl.rows(i).cells(j).innerText;		 
		              }
		            }else{
		               if(j == Lenc - 1){
                          continue;
		               }else{
      	                  oSheet.Cells(i + 1, j + 1).value = curTbl.rows(i).cells(j+1).innerText;		 
		               }
		               
		            }		          
		        }
	        }
	        
	        if(nkcol > -1){	           
	           	//取得每行的列数
		        for (j = 0; j < Lenc; j++)
		        {
		            if(nkcol > j){
          		            oSheet.Cells(i + 1, j + 1).value = curTbl.rows(i).cells(j).innerText;
		            }else{
		                if(j == Lenc-1){
		                  continue;
		                }else
		                  oSheet.Cells(i + 1, j + 1).value = curTbl.rows(i).cells(j+1).innerText;
		            }
		        }
	        }else{
	          	//取得每行的列数
		        for (j = 0; j < Lenc; j++)
		        {
		            oSheet.Cells(i + 1, j + 1).value = curTbl.rows(i).cells(j).innerText;
		            //赋值
		        }
	        }	        
	        	 
	    }
  	    oWB.SaveAs(diretory);  
  	    
 	    //设置excel可见属性
	    if(isopen == 1){
		    oXL.Visible = true;
	    }else{
		    oXL.Visible = false;	     			    
		    oWB.Close();   
            oWB.Quit();   
	    }	     
	}

function exportExcel(tmain){
    var len = tmain.data.length;
    if(len == 0){
      alert("导出表格无数据，请查询后再导出！")
      return;
    }    
    var url = "../../../common/exportchoose.jsp";
    var ret = window.showModalDialog(url,window,"dialogWidth=350px;dialogHeight=200px;scroll=1;status=no;resizable=0;"); 
    if(ret == "" || ret == null){
         alert("选择错误！");
         return;      
    }    
    var arr_ret = ret.split(',');
    var diretory = arr_ret[0];
    var isopen = arr_ret[1];
    var ischecked = arr_ret[2];
    method5(tmain,diretory,isopen,ischecked);      
}		 			
function method5(tmain, diretory, isopen, ischecked) {
	var cdatas = tmain.getSelectedRow();
	if (ischecked == 1) {
		if (cdatas == null || cdatas.length == 0) {
			alert("界面没有勾选，请勾选界面数据！");
			return;
		}
	}

	diretory = diretory.replace("\"", "\\\"");
	var oXL = new ActiveXObject("Excel.Application");
	// 创建AX对象excel
	var oWB = oXL.Workbooks.Add();
	// 获取workbook对象
	var oSheet = oWB.ActiveSheet;

	// 字段处理
	var columns = new Array();
	var ids = new Array();

	var cols = tmain.columnConfig;
	var collen = cols.length;
	var col = null;
	var id = null;
	var name = null;
	var bit = 0;
	for (var i = 0; i < collen; i++) {
		col = cols[i];
		id = col.id;
		if (id == "noFind") {
			alert("字段配置错误，请核查！");
			return;
		}

		if (id != "serial" && id != "checkbox" && id != "radio") {
			bit++;
			ids[bit - 1] = id;
			name = col.title;
			// 输出表头
			oSheet.Cells(1, bit).value = name;
		}

	}
	var datas = tmain.data;
	var datalen = datas.length;
	var row = null;
	var collength = ids.length;
	var dataname = null;
	var datacode = null;
	var datashow = null;
	var bit = 0;
	for (var j = 0; j < datalen; j++) {
		row = datas[j];
		if (ischecked == 1) {
			if (row.checked) {
				bit++;
				for (var k = 0; k < collength; k++) {

					dataname = ids[k] + "_name";
					datacode = ids[k] + "_code";
					if (row[dataname] == null || row[datacode] == null) {
						datashow = row[ids[k]];
					} else {
						datashow = row[datacode] + "-" + row[dataname];
					}
					oSheet.Cells(bit + 1, k + 1).value = datashow;
				}
			}
		} else {
			for (var k = 0; k < collength; k++) {
				dataname = ids[k] + "_name";
				datacode = ids[k] + "_code";
				if (row[dataname] == null || row[datacode] == null) {
					datashow = row[ids[k]];
				} else {
					datashow = row[datacode] + "-" + row[dataname];
				}
				oSheet.Cells(j + 2, k + 1).value = datashow;
			}
		}

	}

	oWB.SaveAs(diretory);

	// 设置excel可见属性
	if (isopen == 1) {
		oXL.Visible = true;
	} else {
		oXL.Visible = false;
		oWB.Close();
		oWB.Quit();
	}
	alert("导出完毕！");
	return 3;
} 	
function getXlsFromTbl(inTblId, inWindow) {

    try {

        var allStr = "";

        var curStr = "";

 

        //alert("getXlsFromTbl");

        if (inTblId != null && inTblId != "" && inTblId != "null") {

            curStr = getTblData(inTblId, inWindow);

        }

 

        if (curStr != null) {

            allStr += curStr;

        }

        else {

            alert("你要导出的表不存在！");

            return;

        }

 

        var fileName = getExcelFileName();

        doFileExport(fileName, allStr);

 

    }

    catch(e) {

        alert("导出发生异常:" + e.name + "->" + e.description + "!");

    }

}

function getTblData(inTbl, inWindow) {
    var rows = 0;
    //alert("getTblData is " + inWindow);
    var tblDocument = document;
    if (!!inWindow && inWindow != "") {
        if (!document.all(inWindow)) {
            return null;
        }
        else {
            tblDocument = eval(inWindow).document;
        }
    }
    var curTbl = tblDocument.getElementById(inTbl);
    var outStr = "";
    if (curTbl != null) {
        for (var j = 0; j < curTbl.rows.length; j++) {
            //alert("j is " + j);
            for (var i = 0; i < curTbl.rows[j].cells.length; i++) {
                //alert("i is " + i);
                if (i == 0 && rows > 0) {
                    outStr += " \t";
                    rows -= 1;
                }
                outStr += curTbl.rows[j].cells[i].innerText + "\t";
                if (curTbl.rows[j].cells[i].colSpan > 1) {
                    for (var k = 0; k < curTbl.rows[j].cells[i].colSpan - 1; k++) {
                        outStr += " \t";
                    }
                }
                if (i == 0) {
                    if (rows == 0 && curTbl.rows[j].cells[i].rowSpan > 1) {
                        rows = curTbl.rows[j].cells[i].rowSpan - 1;
                    }
                }
            }
            outStr += "\r\n";
        }
    }
    else {
        outStr = null;
        alert(inTbl + "不存在!");
    }
    return outStr;
}

function getExcelFileName() {
    var d = new Date();
    var curYear = d.getYear();
    var curMonth = "" + (d.getMonth() + 1);
    var curDate = "" + d.getDate();
    var curHour = "" + d.getHours();
    var curMinute = "" + d.getMinutes();
    var curSecond = "" + d.getSeconds();

    if (curMonth.length == 1) {
        curMonth = "0" + curMonth;
    }

    if (curDate.length == 1) {
        curDate = "0" + curDate;
    }

    if (curHour.length == 1) {
        curHour = "0" + curHour;
    }

    if (curMinute.length == 1) {
        curMinute = "0" + curMinute;
    }
    if (curSecond.length == 1) {
        curSecond = "0" + curSecond;
    }

    var fileName = "leo_zhang" + "_" + curYear + curMonth + curDate + "_"
            + curHour + curMinute + curSecond + ".csv";

    //alert(fileName);
    return fileName;
}

 

function doFileExport(inName, inStr) {
    var xlsWin = null;
    if (!!document.all("glbHideFrm")) {
        xlsWin = glbHideFrm;
    }
    else {
        var width = 6;
        var height = 4;
        var openPara = "left=" + (window.screen.width / 2 - width / 2)
                + ",top=" + (window.screen.height / 2 - height / 2)
                + ",scrollbars=no,width=" + width + ",height=" + height;
        xlsWin = window.open("", "_blank", openPara);
    }
    xlsWin.document.write(inStr);
    xlsWin.document.close();
    xlsWin.document.execCommand('Saveas', true, inName);
    xlsWin.close();
}
/*
*yongbaohua  20090401
*
*/


var amtNumFor2excel = new Array();
 amtNumFor2excel[0] = "amt";
 amtNumFor2excel[1] = "curbal";
 amtNumFor2excel[2] = "endbal";
 amtNumFor2excel[3] = "amt03";
 amtNumFor2excel[4] = "amt04";
 amtNumFor2excel[5] = "amt07";
 amtNumFor2excel[6] = "amt08";
 amtNumFor2excel[7] = "amt10";
 amtNumFor2excel[8] = "amt13";
 amtNumFor2excel[9] = "amt15";
 amtNumFor2excel[10] = "amt16";
 amtNumFor2excel[11] = "amt17";
 amtNumFor2excel[12] = "busimoney";
 
 //-------------------------------------
 //后台导出 lp100419
 //tabname 如果是可以传一个表对象例如：tmain,如果是页签可以传
 //@sumflag 是否导出合计行标志
 //@IXLSExportData 个性化导出接口，对应spring的beanid
 function exportExcelById(tabname, path, templettag, titleflag, sumflag,useRCP,IXLSExportData) {
		var tab = tabname;
		//如果是导出标签那么配置成标签对象
		var tabPageObj = {};
		if (typeof tabpage_main != "undefined") {
			tab = eval(tabpage_main.datatable);
			tabPageObj = {
				submenu: getUrlParam(window.location.search, "submenu"),
				defTabIndex: tabpage_main.firstSelectedIndex,
				defCondition: tabpage_main.getFirstTabFilter(),
				tabcondition: tabpage_main.getSelectedTabFilter(),
				selectedTabIndex: tabpage_main.getSelectedTabIndex()
			}
		}
		var isUseHead = tab.useThisHead; //自定义表头
		var header = tab.columnConfig;
		var maxnum = 0;
		var bit = 0;
		var arr = [];
		var mularr = [];
		var sarr = [];
		//仿二维数组
		if (isUseHead != null && isUseHead != "") {
			maxnum = JQ(isUseHead).length;
			for (var j = 0; j < maxnum; j++) {
				sarr[j] = [];
			}
		}
		getHead();
		/*创建表格对象
		 */
		var tabObj = {
			heads: arr,
			//表头基本信息
			mulhead: mularr,
			//多表头信息
			rows: null,
			//选中行信息
			title: getTitle(),
			//标题
			sumflag: sumflag,
			//1 有合计行,合计标识
			titleflag: titleflag,
			//1 有标题行,标题行标识
			len: bit,
			//列数
			tabtype: tab.tabletype,
			//表类型
			path: path,
			//业务页面路径
			maxspanrows: maxnum,
			//最大跨行数
			exportsql: "",
			//后台sql
			amtflag: tab.amtflag //单位标识
		}
		//判断页面有无数据
		var len = tab.data.length;
		if (len == 0) {
			alert("导出表格无数据，请查询后再导出！")
			return;
		}
		//没路径则执行原导出
		if (path == null || path == undefined) {
			export2excel(tab, 0, 1, templettag, titleflag, sumflag);
			return;
		}

		//得到表头信息

		function getHead() {
			//多表头
			if (isUseHead != null && isUseHead != "") {
				//长度
				for (var i = 0; i < header.length; i++) {
					var head = {
						headid: null,
						headname: null,
						headtype: null,
						trnum: 0,
						colspan: 0,
						rowspan: 0
					};
					if (header[i].id == "noFind") {
						alert("字段配置错误，请核查！");
						return;
					}
					if (header[i].id != "serial" && header[i].id != "checkbox" && header[i].id != "radio") {
						head.headid = header[i].id.indexOf(".input") > -1 ? header[i].id.split(".")[0] : header[i].id;
						head.headname = header[i].title;
						head.headtype = header[i].type;
						arr.push(head);
						bit++;
					}
				}
				//表头信息
				JQ(isUseHead).each(function(i) {
					var k = 0; //不需要字段数
					JQ(this).find("th").each(function(j) {
						var head = {
							headid: null,
							headname: null,
							headtype: null,
							trnum: 0,
							thnum: 0,
							colspan: 1,
							rowspan: 1
						};
						var tho = JQ(this);
						var id = tho.attr("id") != "" ? tho.attr("id").split("_")[1] : "";
						if (id == "noFind") {
							alert("字段配置错误，请核查！");
							return;
						}
						if (tho.text() != "序号" && id != "serial" && id != "checkbox" && id != "radio") {
							head.trnum = i;
							head.headid = id.indexOf(".") > -1 ? id.split(".")[0] : id;
							head.headname = tho.text();
							head.headtype = getType(id);
							head.colspan = tho.attr("colspan");
							head.rowspan = tho.attr("rowspan");
							//debugger;
							head.thnum = getThNum(i);
							setSarr(i, head.thnum, head.rowspan, head.colspan, head.thnum);
							mularr.push(head);
						} else {
							k++;
						}
					});
				});
				//取表头列类型

				function getType(id) {
					for (var i = 0; i < header.length; i++) {
						if (header[i].id == id) return header[i].type;
					}
				}
				/*将单元格都细化为二维数组
				 * o所在行号
				 * p所在列号
				 * m跨行数
				 * n跨列数
				 * q细化后所在列
				 */

				function setSarr(o, p, m, n, q) {
					if (m != 1 && n != 1) {
						var a = o + m;
						var b = p + n;
						for (o; o < a; o++) {
							for (p; p < b; p++) {
								sarr[o][p] = 1;
							}
						}
					} else if (m != 1) {
						for (o; o < m; o++) {
							sarr[o][q] = 1;
						}
					} else if (n != 1) {
						var c = p + n;
						for (p; p < c; p++) {
							sarr[o][p] = 1;
						}
					} else {
						sarr[o][q] = 1;
					}
				}

				function getThNum(o) {
					for (var i = 0; i < bit; i++) {
						if (typeof sarr[o][i] == "undefined" || !sarr[o][i]) return i;
					}
					return 0;
				}
			} else {
				for (var i = 0; i < header.length; i++) {
					var head = {
						headid: null,
						headname: null,
						headtype: null,
						trnum: 0,
						colspan: 0,
						rowspan: 0
					};
					if (header[i].id == "noFind") {
						alert("字段配置错误，请核查！");
						return;
					}
					if (header[i].id != "serial" && header[i].id != "checkbox" && header[i].id != "radio") {
						head.headid = header[i].id;
						head.headname = header[i].title;
						head.headtype = header[i].type;
						arr.push(head);
						bit++;
					}
				}
			}
			return arr;
		}
		//判断有无选中
		var len = tab.getSelectedRow().length;
		//如果有选中则把数据传到后台
		if (len > 0) {
			//选中行内容
			tabObj.rows = tab.getSelectedRow();
		} else {
			//判断有无sql
			var exportsql = tab.exportsql;
			if (exportsql == null || exportsql.trim().length == 0 || typeof exportsql == "undefined") {
				tabObj.rows = tab.data;
			} else {
				tabObj.exportsql = exportsql;
			}
		}
		//added by zhangkai 增加个性化导出接口
		if(typeof(IXLSExportData)!="undefined"&&IXLSExportData!=null&&IXLSExportData!="")
			tabObj.IXLSExportData=IXLSExportData;
		//edited by zhangkai 增加使用RCP导出的判断
		if(typeof(useRCP)=="undefined"||useRCP==null||useRCP=="")
			xlsExport(tabObj, tabPageObj);
		else
			xlsExportUseRCP(tabObj, tabPageObj);
	}
function xlsExport(tabObj,tabPageObj){
	 var url = "/system/export/xlsExport.do";
  	 var exportForm =document.createElement("<form id='exportform'  method='post' ></form>");
  	 document.body.appendChild(exportForm);
     var table = document.createElement("<input type='hidden' id='table' name='table' value=''></input>");
  	 exportForm.appendChild(table);
  	 for (var pro in tabPageObj) {
	  	 var tabpage = document.createElement("<input type='hidden' id='tabpage' name='tabpage' value=''></input>");
	  	 exportForm.appendChild(tabpage);
	  	 document.getElementById("tabpage").value = Object.toJSON(tabPageObj);
	  	 break;
  	 }
  	 exportForm.action = url;
  	 document.getElementById("table").value = Object.toJSON(tabObj);
  	 document.getElementById("exportform").submit();
  	 document.body.removeChild(exportForm);
  	 
}
function xlsExportTem(tabObj,tabPageObj){
	 var url = "/system/export/xlsExportTem.do";
  	 var exportForm =document.createElement("<form id='exportform'  method='post' ></form>");
  	 document.body.appendChild(exportForm);
     var table = document.createElement("<input type='hidden' id='table' name='table' value=''></input>");
  	 exportForm.appendChild(table);
  	 for (var pro in tabPageObj) {
	  	 var tabpage = document.createElement("<input type='hidden' id='tabpage' name='tabpage' value=''></input>");
	  	 exportForm.appendChild(tabpage);
	  	 document.getElementById("tabpage").value = Object.toJSON(tabPageObj);
	  	 break;
  	 }
  	 exportForm.action = url;
  	 document.getElementById("table").value = Object.toJSON(tabObj);
  	 document.getElementById("exportform").submit();
  	 document.body.removeChild(exportForm);
  	 
}
 //edited by zhangkai 20130712 使用RPC方式下载，优化用户体验
function xlsExportUseRCP(tabObj,tabPageObj){
	var table="";
	var tabpage="";
 	for (var pro in tabPageObj) {
	  	 tabpage=Object.toJSON(tabPageObj);
	  	 break;
  	}
	table=Object.toJSON(tabObj);
  	Ext.lt.RCPConsole.processdown('system.XlsExportBO', 'doExportUseRCP',[table, tabpage]); 
}
//--------------------------------------
//增加导出模板标志
//jjy20090730
//日志导出改为后台导出 
//update By zhoujiyong20131028
function exportExcelByIdl(tabname,templettag,path){
    //var url = "/common/exportchoose_excel.jsp";
    //var ret = window.showModalDialog(url,window,"dialogWidth=350px;dialogHeight=200px;scroll=1;status=no;resizable=0;"); 
    //if(ret == "" || ret == null){
          //alert("选择错误！");
    //     return;      
    //}       
    //var arr_ret = ret.split(',');
    //var isopen = arr_ret[0];
    //var issave = arr_ret[1];     
    //export2excel(tmain,0,1,templettag);
	var tab = tabname;
	//如果是导出标签那么配置成标签对象
	var tabPageObj = {};
	var isUseHead = tab.useThisHead; //自定义表头
	var header = tab.columnConfig;
	var maxnum = 0;
	var bit = 0;
	var arr = [];
	var mularr = [];
	var sarr = [];
		//仿二维数组
		if (isUseHead != null && isUseHead != "") {
			maxnum = JQ(isUseHead).length;
			for (var j = 0; j < maxnum; j++) {
				sarr[j] = [];
			}
		}
		//表头
		getHead();
		
		//创建表格对象
		var tabObj = {
			heads: arr,
			//表头基本信息
			mulhead: mularr,
			//多表头信息
			rows: null,
			//选中行信息
			title: getTitle(),
			//标题
			//titleflag: titleflag,
			//1 有标题行,标题行标识
			len: bit,
			//列数
			tabtype: tab.tabletype,
			//表类型
			path: path,
			//业务页面路径
			maxspanrows: maxnum,
			//最大跨行数
			exportsql: "",
			//后台sql
			amtflag: tab.amtflag //单位标识
		}

		//得到表头信息
		function getHead() {
			//多表头
			if (isUseHead != null && isUseHead != "") {
				//长度
				for (var i = 0; i < header.length; i++) {
					var head = {
						headid: null,
						headname: null,
						headtype: null,
						trnum: 0,
						colspan: 0,
						rowspan: 0
					};
					if (header[i].id == "noFind") {
						alert("字段配置错误，请核查！");
						return;
					}
					if (header[i].id != "serial" && header[i].id != "checkbox" && header[i].id != "radio") {
						head.headid = header[i].id.indexOf(".input") > -1 ? header[i].id.split(".")[0] : header[i].id;
						head.headname = header[i].title;
						head.headtype = header[i].type;
						arr.push(head);
						bit++;
					}
				}
				//表头信息
				JQ(isUseHead).each(function(i) {
					var k = 0; //不需要字段数
					JQ(this).find("th").each(function(j) {
						var head = {
							headid: null,
							headname: null,
							headtype: null,
							trnum: 0,
							thnum: 0,
							colspan: 1,
							rowspan: 1
						};
						var tho = JQ(this);
						var id = tho.attr("id") != "" ? tho.attr("id").split("_")[1] : "";
						if (id == "noFind") {
							alert("字段配置错误，请核查！");
							return;
						}
						if (tho.text() != "序号" && id != "serial" && id != "checkbox" && id != "radio") {
							head.trnum = i;
							head.headid = id.indexOf(".") > -1 ? id.split(".")[0] : id;
							head.headname = tho.text();
							head.headtype = getType(id);
							head.colspan = tho.attr("colspan");
							head.rowspan = tho.attr("rowspan");
							head.thnum = getThNum(i);
							setSarr(i, head.thnum, head.rowspan, head.colspan, head.thnum);
							mularr.push(head);
						} else {
							k++;
						}
					});
				});
				
				//取表头列类型
				function getType(id) {
					for (var i = 0; i < header.length; i++) {
						if (header[i].id == id) return header[i].type;
					}
				}
				
				/*将单元格都细化为二维数组
				 * o所在行号
				 * p所在列号
				 * m跨行数
				 * n跨列数
				 * q细化后所在列
				 */
				function setSarr(o, p, m, n, q) {
					if (m != 1 && n != 1) {
						var a = o + m;
						var b = p + n;
						for (o; o < a; o++) {
							for (p; p < b; p++) {
								sarr[o][p] = 1;
							}
						}
					} else if (m != 1) {
						for (o; o < m; o++) {
							sarr[o][q] = 1;
						}
					} else if (n != 1) {
						var c = p + n;
						for (p; p < c; p++) {
							sarr[o][p] = 1;
						}
					} else {
						sarr[o][q] = 1;
					}
				}

				function getThNum(o) {
					for (var i = 0; i < bit; i++) {
						if (typeof sarr[o][i] == "undefined" || !sarr[o][i]) return i;
					}
					return 0;
				}
			} else {
				for (var i = 0; i < header.length; i++) {
					var head = {
						headid: null,
						headname: null,
						headtype: null,
						trnum: 0,
						colspan: 0,
						rowspan: 0
					};
					if (header[i].id == "noFind") {
						alert("字段配置错误，请核查！");
						return;
					}
					if (header[i].id != "serial" && header[i].id != "checkbox" && header[i].id != "radio") {
						head.headid = header[i].id;
						head.headname = header[i].title;
						head.headtype = header[i].type;
						arr.push(head);
						bit++;
					}
				}
			}
			return arr;
		}
		tabObj.rows = tab.data;
		xlsExportTem(tabObj, tabPageObj);
      
}

//导出用于导入的模板 2009年07月16日 17:52:18 周伟
function exportExcelTemplet(tmain){
    var url = "/common/exportchoose_excel.jsp";
    export2excel(tmain,0,1,1);  
}		
//增加导出模板标志
//jjy20090730
function export2excel(tmain,isopen,issave,templettag,titleflag,sumflag){  
	   if(isopen==0&&issave==0)isopen=1;
	    var oXL = new ActiveXObject("Excel.Application");
	    //创建AX对象excel
	    var oWB = oXL.Workbooks.Add();
	    //获取workbook对象
	    var oSheet = oWB.ActiveSheet;	    
	    //字段处理
	    var columns = new Array();
	    var ids = new Array();
	    //金额列数组	   
	    var objAmt = {}; 
	    var cols = tmain.columnConfig;
	    var collen = cols.length;
	    var bit = 0;
	    var odate = new Date();
	    var start = odate.getMilliseconds() + odate.getSeconds() * 1000;
	    //获得内容开始行号
	    var b = 1;
	    //表头开始行号
	    var h = 1;
	    if(titleflag){
	    	h = h+b;
	    }
	    for (var i = 0;i<collen;i++){
	       if(cols[i].id == "noFind"){
	          alert("字段配置错误，请核查！");
	          return;
	       }
	       if(cols[i].id != "serial" && cols[i].id != "checkbox" && cols[i].id != "radio"){
	           bit++;
   	           ids[bit-1] = cols[i].id.indexOf(".")==-1?cols[i].id:cols[i].id.substring(0,cols[i].id.indexOf("."));	           
     	       //输出表头	    
     	       //if(isContainAmtNum(cols[i].id)){	
     	       if(cols[i].type=='M'){
     	       		objAmt[bit]=[];   
     	       		if(cols[i].title.indexOf("元")==-1){
     	       			oSheet.Cells(h, bit).value = cols[i].title+"(元)";
     	       		}else{
     	       			oSheet.Cells(h, bit).value = cols[i].title
     	       		}
     	       		//oSheet.Cells(h, bit).value = cols[i].title.substring(0,cols[i].title.lastIndexOf("("))+"(元)";
	       			oSheet.Columns(bit).NumberFormatLocal="0.00";//全部字符型   
		 		}else if(cols[i].type=='I'){
		 			objAmt[bit]=[];
		 			oSheet.Cells(h, bit).value = cols[i].title;      
			       	oSheet.Columns(bit).NumberFormatLocal="0";//整数
		 		}else{	  
			       	oSheet.Cells(h, bit).value = cols[i].title;      
			       	oSheet.Columns(bit).NumberFormatLocal="@";//全部字符型    
		      	}    	           
	       }

	    }
	   //设置标题 合并单元格
	   if(titleflag){
		   oSheet.Range(oSheet.Cells(b,1),oSheet.Cells(b,bit)).mergecells=true;
		   oSheet.Range(oSheet.Cells(b,1),oSheet.Cells(b,bit)).value=getTitle();
		   //标题样式
		   oSheet.Rows(b).RowHeight = 25;  
		   oSheet.Rows(b).Font.Name="MS Sans Serif";  
	       oSheet.Rows(b).Font.Size=18;     
	       oSheet.Rows(b).Font.bold=true; 
	       oSheet.Rows(b).HorizontalAlignment = 3;
	       b++;
	   }
       //日期处理
	   odate = new Date();
	   var end = odate.getMilliseconds() + odate.getSeconds() * 1000;
	   window.status=(end - start)+"ms";
	   //表头样式
	   oSheet.Rows(b).RowHeight = 17;  
	   oSheet.Rows(b).Font.Name="MS Sans Serif";  
       oSheet.Rows(b).Font.Size=9;     
       oSheet.Rows(b).Font.bold=true; 
       b++; 
       
	    var rows ; 	    
	    var collength = ids.length;
	    var dataname = null;
	    var datacode = null;
	    var datashow = null;	    
	    var fname = "";
	    //当导出模板标志为空或0时导数据
	    //jjy20090730
	    if(templettag==null|| templettag == "0"){
	    	 if(tmain.getSelectedRow().length > 0){
		    	 rows = tmain.getSelectedRow(); 
		    }else{
		    	rows = tmain.data; 	    
		    }
	    	var datalen = rows.length;	   
	    	for(var j = 0;j<datalen;j++){		   	
				  for(var k = 0;k<collength;k++){
			        
			          dataname = ids[k]+"_name";
			          datacode = ids[k]+"_code";
			         
			          if(rows[j][dataname] == null || rows[j][datacode] == null){				          
			          	if(ids[k]=='lastupdatetime'){//lastupdatetime   时间戳特殊处理
				          	var optiondate = new Date(parseInt(rows[j][ids[k]],10));		
							var clock = optiondate.getHours()+':'; 
						    if (optiondate.getMinutes() < 10) 
						    	clock += '0'; 
					    	clock += optiondate.getMinutes()+':'; 
						    if (optiondate.getSeconds() < 10) 
						    	clock += '0'; 
					    	clock += optiondate.getSeconds(); 
					
							datashow = optiondate.getYear()+"-" + (optiondate.getMonth() + 1) + "-"+optiondate.getDate() 
								+ " " + clock;	
			          	}else{
			          		 datashow = rows[j][ids[k]];
			          	}		            
			          }else{ 
			             datashow = rows[j][datacode]+"-"+rows[j][dataname];
			          }	
			         if(sumflag){         
			         	oSheet.Cells(j+b+1, k + 1).value = datashow;	 
			         }else{
			         	oSheet.Cells(j+b, k + 1).value = datashow;	
			         }
			         //保存金额列所有金额值
			         if(typeof(objAmt[k+1]) != 'undefined' && objAmt[k+1] != null){
			         	objAmt[k+1].push(datashow);
			         }         
		        }
		       if(sumflag){ 
			       oSheet.Rows(j+b+1).RowHeight = 12.75; 
		           oSheet.Rows(j+b+1).Font.Size=9;          	      
			       oSheet.Rows(j+b+1).Font.Name="MS Sans Serif";  
		       }else{
		       	   oSheet.Rows(j+b).RowHeight = 12.75; 
		           oSheet.Rows(j+b).Font.Size=9;          	      
			       oSheet.Rows(j+b).Font.Name="MS Sans Serif"; 
		       }
	    	}
	    	//合计行
	    	if(sumflag && objAmt != null){
	    		for(var k = 0;k<collength;k++){
	    			oSheet.Cells(b,k+1).value = typeof(objAmt[k+1] != 'undefined')&& objAmt[k+1]!=null?sumCol(objAmt[k+1]):"";
	    		}
	    		oSheet.Rows(b).RowHeight = 12.75; 
	           	oSheet.Rows(b).Font.Size=10;          	      
		       	oSheet.Rows(b).Font.Name="MS Sans Serif"; 
	    	}
    	}
    	odate = new Date();
	   	start = odate.getMilliseconds() + odate.getSeconds() * 1000;
	   	window.status +="|"+(start - end)+"ms";
        if(issave==1) fname = oXL.Application.GetSaveAsFilename(getTime()+".xls", "Excel Spreadsheets (*.xls), *.xls,(*.xlsx), *.xlsx");  
		if (issave==1&&fname!=""){     	
	     		 oWB.SaveAs(fname);
	     		 if(isopen==0) alert("导出完毕！"); 
     	}
	    if(isopen == 1){
		    oXL.Visible = true;
	    }else{
		    oXL.Visible = false;
		    oWB.Saved = true; //不管是否对excel进行修改都不提示保存它
		    oWB.Close(); 
		}
        return 3;
}
//得到当前系统时间
function getTime(){
	var date = new Date();
	var yy = date.getFullYear();
	var MM = (date.getMonth()+1)<10?"0"+(date.getMonth()+1):(date.getMonth()+1).toString();;
	var dd = date.getDate()<10?"0"+date.getDate():date.getDate().toString();
	var HH = date.getHours()<10?"0"+date.getHours():date.getHours().toString();
	var mm = date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes().toString();
	var ss = date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds().toString();
	var arrTime = [yy,MM,dd,HH,mm,ss];
	return arrTime.join(''); 
}
function isContainAmtNum(id){
	for(var n =0;n<amtNumFor2excel.length;n++){
	
	       	if(id==amtNumFor2excel[n]){	       
	       		return true;
	       		break;
	       	}
	}
	return false;
}
//合计行求合
function sumCol(arrSum){
	var r1,r2,m,sumval=0;
	for(var i = 0;i<arrSum.length;i++){
		if(arrSum[i]!=""){
			try{
				r1 = arrSum[i].toString().split(".")[1].length;
			} catch(e){
				r1 = 0;
			}
			try{
				r2 = sumval.toString().split(".")[1].length;
			}catch(e){
				r2 = 0;
			}
			m = Math.pow(10,Math.max(r1,r2));
			sumval = (arrSum[i]*m+sumval*m)/m;
		}
	}
	return sumval;
}
//得到标题名称
function getTitle(){
   var tit = JQ("#your_position table tr td").eq(0).text().split(">>");
   if(!tit || tit.length<2){
   		tit = "导出数据";
   }
   else if(tit.length<3){
   		tit = tit[2];
   }
   else{
   		tit = tit[tit.length-2]+"-"+tit[tit.length-1];
   }
   return tit;
}
  
  