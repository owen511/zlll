function method1(tableid) {
   //������񿽱���EXCEL��
    var curTbl = document.getElementById(tableid);
    var oXL = new ActiveXObject("Excel.Application");
    //����AX����excel
    var oWB = oXL.Workbooks.Add();
    //��ȡworkbook����
    var oSheet = oWB.ActiveSheet;
    //���ǰsheet
    var sel = document.body.createTextRange();
    sel.moveToElementText(curTbl);
    //�ѱ���е������Ƶ�TextRange��
    sel.select();
    //ȫѡTextRange������
    sel.execCommand("Copy");
    //����TextRange������ 
    oSheet.Paste();
    //ճ�������EXCEL��      
    oXL.Visible = true;
    //����excel�ɼ�����
}

function method2(tableid) //��ȡ�����ÿ����Ԫ��EXCEL��
{   
    var curTbl = document.getElementById(tableid);
    var oXL = new ActiveXObject("Excel.Application");
    //����AX����excel
    var oWB = oXL.Workbooks.Add();
    //��ȡworkbook����
    var oSheet = oWB.ActiveSheet;
    //���ǰsheet
    var Lenr = curTbl.rows.length;
    //ȡ�ñ������
    var curCellText = "";
    for (i = 0; i < Lenr; i++)
    {        
        var Lenc = curTbl.rows(i).cells.length;

        //ȡ��ÿ�е�����
        for (j = 0; j < Lenc; j++)
        {
            if(i == 0){
               if(curTbl.rows(i).cells(j).innerText == ""){                 
                   
               }
            }
            oSheet.Cells(i + 1, j + 1).value = curTbl.rows(i).cells(j).innerText;
            //��ֵ
        }
    }
    oXL.Visible = true;
    //����excel�ɼ�����
}

function method3(tableid) //��ȡ�����ÿ����Ԫ��EXCEL��
	{   
	    var curTbl = document.getElementById(tableid);
	    var oXL = new ActiveXObject("Excel.Application");
	    //����AX����excel
	    var oWB = oXL.Workbooks.Add();
	    //��ȡworkbook����
	    var oSheet = oWB.ActiveSheet;
	    //���ǰsheet
	    var Lenr = curTbl.rows.length;
	    //ȡ�ñ������
	    var curCellText = "";
	    var nkcol = -1; //�ձ���¼	    
	    
	    for (i = 0; i < Lenr; i++)
	    {    	       
	        var Lenc = curTbl.rows(i).cells.length;	        
	        if(i == 0){
		        //ȡ��ÿ�е�����
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
	           	//ȡ��ÿ�е�����
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
	          	//ȡ��ÿ�е�����
		        for (j = 0; j < Lenc; j++)
		        {
		            oSheet.Cells(i + 1, j + 1).value = curTbl.rows(i).cells(j).innerText;
		            //��ֵ
		        }
	        }	        
	        	 
	    }
	    oXL.Visible = true;
	    //����excel�ɼ�����
	}	

 function method4(tableid,diretory,isopen) //��ȡ�����ÿ����Ԫ��EXCEL��
	{   
	    diretory=diretory.replace("\"","\\\"");
	    var curTbl = document.getElementById(tableid);
	    var oXL = new ActiveXObject("Excel.Application");
	    //����AX����excel
	    var oWB = oXL.Workbooks.Add();
	    //��ȡworkbook����
	    var oSheet = oWB.ActiveSheet;
	    //���ǰsheet
	    var Lenr = curTbl.rows.length;
	    //ȡ�ñ������
	    var curCellText = "";
	    var nkcol = -1; //�ձ���¼	    
	    
	    for (i = 0; i < Lenr; i++)
	    {    	       
	        var Lenc = curTbl.rows(i).cells.length;	        
	        if(i == 0){
		        //ȡ��ÿ�е�����
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
	           	//ȡ��ÿ�е�����
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
	          	//ȡ��ÿ�е�����
		        for (j = 0; j < Lenc; j++)
		        {
		            oSheet.Cells(i + 1, j + 1).value = curTbl.rows(i).cells(j).innerText;
		            //��ֵ
		        }
	        }	        
	        	 
	    }
  	    oWB.SaveAs(diretory);  
  	    
 	    //����excel�ɼ�����
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
      alert("������������ݣ����ѯ���ٵ�����")
      return;
    }    
    var url = "../../../common/exportchoose.jsp";
    var ret = window.showModalDialog(url,window,"dialogWidth=350px;dialogHeight=200px;scroll=1;status=no;resizable=0;"); 
    if(ret == "" || ret == null){
         alert("ѡ�����");
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
			alert("����û�й�ѡ���빴ѡ�������ݣ�");
			return;
		}
	}

	diretory = diretory.replace("\"", "\\\"");
	var oXL = new ActiveXObject("Excel.Application");
	// ����AX����excel
	var oWB = oXL.Workbooks.Add();
	// ��ȡworkbook����
	var oSheet = oWB.ActiveSheet;

	// �ֶδ���
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
			alert("�ֶ����ô�����˲飡");
			return;
		}

		if (id != "serial" && id != "checkbox" && id != "radio") {
			bit++;
			ids[bit - 1] = id;
			name = col.title;
			// �����ͷ
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

	// ����excel�ɼ�����
	if (isopen == 1) {
		oXL.Visible = true;
	} else {
		oXL.Visible = false;
		oWB.Close();
		oWB.Quit();
	}
	alert("������ϣ�");
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

            alert("��Ҫ�����ı����ڣ�");

            return;

        }

 

        var fileName = getExcelFileName();

        doFileExport(fileName, allStr);

 

    }

    catch(e) {

        alert("���������쳣:" + e.name + "->" + e.description + "!");

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
        alert(inTbl + "������!");
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
 //��̨���� lp100419
 //tabname ����ǿ��Դ�һ����������磺tmain,�����ҳǩ���Դ�
 //@sumflag �Ƿ񵼳��ϼ��б�־
 //@IXLSExportData ���Ի������ӿڣ���Ӧspring��beanid
 function exportExcelById(tabname, path, templettag, titleflag, sumflag,useRCP,IXLSExportData) {
		var tab = tabname;
		//����ǵ�����ǩ��ô���óɱ�ǩ����
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
		var isUseHead = tab.useThisHead; //�Զ����ͷ
		var header = tab.columnConfig;
		var maxnum = 0;
		var bit = 0;
		var arr = [];
		var mularr = [];
		var sarr = [];
		//�¶�ά����
		if (isUseHead != null && isUseHead != "") {
			maxnum = JQ(isUseHead).length;
			for (var j = 0; j < maxnum; j++) {
				sarr[j] = [];
			}
		}
		getHead();
		/*����������
		 */
		var tabObj = {
			heads: arr,
			//��ͷ������Ϣ
			mulhead: mularr,
			//���ͷ��Ϣ
			rows: null,
			//ѡ������Ϣ
			title: getTitle(),
			//����
			sumflag: sumflag,
			//1 �кϼ���,�ϼƱ�ʶ
			titleflag: titleflag,
			//1 �б�����,�����б�ʶ
			len: bit,
			//����
			tabtype: tab.tabletype,
			//������
			path: path,
			//ҵ��ҳ��·��
			maxspanrows: maxnum,
			//��������
			exportsql: "",
			//��̨sql
			amtflag: tab.amtflag //��λ��ʶ
		}
		//�ж�ҳ����������
		var len = tab.data.length;
		if (len == 0) {
			alert("������������ݣ����ѯ���ٵ�����")
			return;
		}
		//û·����ִ��ԭ����
		if (path == null || path == undefined) {
			export2excel(tab, 0, 1, templettag, titleflag, sumflag);
			return;
		}

		//�õ���ͷ��Ϣ

		function getHead() {
			//���ͷ
			if (isUseHead != null && isUseHead != "") {
				//����
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
						alert("�ֶ����ô�����˲飡");
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
				//��ͷ��Ϣ
				JQ(isUseHead).each(function(i) {
					var k = 0; //����Ҫ�ֶ���
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
							alert("�ֶ����ô�����˲飡");
							return;
						}
						if (tho.text() != "���" && id != "serial" && id != "checkbox" && id != "radio") {
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
				//ȡ��ͷ������

				function getType(id) {
					for (var i = 0; i < header.length; i++) {
						if (header[i].id == id) return header[i].type;
					}
				}
				/*����Ԫ��ϸ��Ϊ��ά����
				 * o�����к�
				 * p�����к�
				 * m������
				 * n������
				 * qϸ����������
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
						alert("�ֶ����ô�����˲飡");
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
		//�ж�����ѡ��
		var len = tab.getSelectedRow().length;
		//�����ѡ��������ݴ�����̨
		if (len > 0) {
			//ѡ��������
			tabObj.rows = tab.getSelectedRow();
		} else {
			//�ж�����sql
			var exportsql = tab.exportsql;
			if (exportsql == null || exportsql.trim().length == 0 || typeof exportsql == "undefined") {
				tabObj.rows = tab.data;
			} else {
				tabObj.exportsql = exportsql;
			}
		}
		//added by zhangkai ���Ӹ��Ի������ӿ�
		if(typeof(IXLSExportData)!="undefined"&&IXLSExportData!=null&&IXLSExportData!="")
			tabObj.IXLSExportData=IXLSExportData;
		//edited by zhangkai ����ʹ��RCP�������ж�
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
 //edited by zhangkai 20130712 ʹ��RPC��ʽ���أ��Ż��û�����
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
//���ӵ���ģ���־
//jjy20090730
//��־������Ϊ��̨���� 
//update By zhoujiyong20131028
function exportExcelByIdl(tabname,templettag,path){
    //var url = "/common/exportchoose_excel.jsp";
    //var ret = window.showModalDialog(url,window,"dialogWidth=350px;dialogHeight=200px;scroll=1;status=no;resizable=0;"); 
    //if(ret == "" || ret == null){
          //alert("ѡ�����");
    //     return;      
    //}       
    //var arr_ret = ret.split(',');
    //var isopen = arr_ret[0];
    //var issave = arr_ret[1];     
    //export2excel(tmain,0,1,templettag);
	var tab = tabname;
	//����ǵ�����ǩ��ô���óɱ�ǩ����
	var tabPageObj = {};
	var isUseHead = tab.useThisHead; //�Զ����ͷ
	var header = tab.columnConfig;
	var maxnum = 0;
	var bit = 0;
	var arr = [];
	var mularr = [];
	var sarr = [];
		//�¶�ά����
		if (isUseHead != null && isUseHead != "") {
			maxnum = JQ(isUseHead).length;
			for (var j = 0; j < maxnum; j++) {
				sarr[j] = [];
			}
		}
		//��ͷ
		getHead();
		
		//����������
		var tabObj = {
			heads: arr,
			//��ͷ������Ϣ
			mulhead: mularr,
			//���ͷ��Ϣ
			rows: null,
			//ѡ������Ϣ
			title: getTitle(),
			//����
			//titleflag: titleflag,
			//1 �б�����,�����б�ʶ
			len: bit,
			//����
			tabtype: tab.tabletype,
			//������
			path: path,
			//ҵ��ҳ��·��
			maxspanrows: maxnum,
			//��������
			exportsql: "",
			//��̨sql
			amtflag: tab.amtflag //��λ��ʶ
		}

		//�õ���ͷ��Ϣ
		function getHead() {
			//���ͷ
			if (isUseHead != null && isUseHead != "") {
				//����
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
						alert("�ֶ����ô�����˲飡");
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
				//��ͷ��Ϣ
				JQ(isUseHead).each(function(i) {
					var k = 0; //����Ҫ�ֶ���
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
							alert("�ֶ����ô�����˲飡");
							return;
						}
						if (tho.text() != "���" && id != "serial" && id != "checkbox" && id != "radio") {
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
				
				//ȡ��ͷ������
				function getType(id) {
					for (var i = 0; i < header.length; i++) {
						if (header[i].id == id) return header[i].type;
					}
				}
				
				/*����Ԫ��ϸ��Ϊ��ά����
				 * o�����к�
				 * p�����к�
				 * m������
				 * n������
				 * qϸ����������
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
						alert("�ֶ����ô�����˲飡");
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

//�������ڵ����ģ�� 2009��07��16�� 17:52:18 ��ΰ
function exportExcelTemplet(tmain){
    var url = "/common/exportchoose_excel.jsp";
    export2excel(tmain,0,1,1);  
}		
//���ӵ���ģ���־
//jjy20090730
function export2excel(tmain,isopen,issave,templettag,titleflag,sumflag){  
	   if(isopen==0&&issave==0)isopen=1;
	    var oXL = new ActiveXObject("Excel.Application");
	    //����AX����excel
	    var oWB = oXL.Workbooks.Add();
	    //��ȡworkbook����
	    var oSheet = oWB.ActiveSheet;	    
	    //�ֶδ���
	    var columns = new Array();
	    var ids = new Array();
	    //���������	   
	    var objAmt = {}; 
	    var cols = tmain.columnConfig;
	    var collen = cols.length;
	    var bit = 0;
	    var odate = new Date();
	    var start = odate.getMilliseconds() + odate.getSeconds() * 1000;
	    //������ݿ�ʼ�к�
	    var b = 1;
	    //��ͷ��ʼ�к�
	    var h = 1;
	    if(titleflag){
	    	h = h+b;
	    }
	    for (var i = 0;i<collen;i++){
	       if(cols[i].id == "noFind"){
	          alert("�ֶ����ô�����˲飡");
	          return;
	       }
	       if(cols[i].id != "serial" && cols[i].id != "checkbox" && cols[i].id != "radio"){
	           bit++;
   	           ids[bit-1] = cols[i].id.indexOf(".")==-1?cols[i].id:cols[i].id.substring(0,cols[i].id.indexOf("."));	           
     	       //�����ͷ	    
     	       //if(isContainAmtNum(cols[i].id)){	
     	       if(cols[i].type=='M'){
     	       		objAmt[bit]=[];   
     	       		if(cols[i].title.indexOf("Ԫ")==-1){
     	       			oSheet.Cells(h, bit).value = cols[i].title+"(Ԫ)";
     	       		}else{
     	       			oSheet.Cells(h, bit).value = cols[i].title
     	       		}
     	       		//oSheet.Cells(h, bit).value = cols[i].title.substring(0,cols[i].title.lastIndexOf("("))+"(Ԫ)";
	       			oSheet.Columns(bit).NumberFormatLocal="0.00";//ȫ���ַ���   
		 		}else if(cols[i].type=='I'){
		 			objAmt[bit]=[];
		 			oSheet.Cells(h, bit).value = cols[i].title;      
			       	oSheet.Columns(bit).NumberFormatLocal="0";//����
		 		}else{	  
			       	oSheet.Cells(h, bit).value = cols[i].title;      
			       	oSheet.Columns(bit).NumberFormatLocal="@";//ȫ���ַ���    
		      	}    	           
	       }

	    }
	   //���ñ��� �ϲ���Ԫ��
	   if(titleflag){
		   oSheet.Range(oSheet.Cells(b,1),oSheet.Cells(b,bit)).mergecells=true;
		   oSheet.Range(oSheet.Cells(b,1),oSheet.Cells(b,bit)).value=getTitle();
		   //������ʽ
		   oSheet.Rows(b).RowHeight = 25;  
		   oSheet.Rows(b).Font.Name="MS Sans Serif";  
	       oSheet.Rows(b).Font.Size=18;     
	       oSheet.Rows(b).Font.bold=true; 
	       oSheet.Rows(b).HorizontalAlignment = 3;
	       b++;
	   }
       //���ڴ���
	   odate = new Date();
	   var end = odate.getMilliseconds() + odate.getSeconds() * 1000;
	   window.status=(end - start)+"ms";
	   //��ͷ��ʽ
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
	    //������ģ���־Ϊ�ջ�0ʱ������
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
			          	if(ids[k]=='lastupdatetime'){//lastupdatetime   ʱ������⴦��
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
			         //�����������н��ֵ
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
	    	//�ϼ���
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
	     		 if(isopen==0) alert("������ϣ�"); 
     	}
	    if(isopen == 1){
		    oXL.Visible = true;
	    }else{
		    oXL.Visible = false;
		    oWB.Saved = true; //�����Ƿ��excel�����޸Ķ�����ʾ������
		    oWB.Close(); 
		}
        return 3;
}
//�õ���ǰϵͳʱ��
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
//�ϼ������
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
//�õ���������
function getTitle(){
   var tit = JQ("#your_position table tr td").eq(0).text().split(">>");
   if(!tit || tit.length<2){
   		tit = "��������";
   }
   else if(tit.length<3){
   		tit = tit[2];
   }
   else{
   		tit = tit[tit.length-2]+"-"+tit[tit.length-1];
   }
   return tit;
}
  
  