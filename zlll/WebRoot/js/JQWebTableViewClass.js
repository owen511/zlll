function JiuQiWebTableView(containerObj,stylePath,imgPath,colorPanlPath){
  eval("window." + containerObj.id + "_jiuqiWebTableViewObj=this;");
  window.jiuqiWebTableViewObj=this;
  this.parentObj="";                                                                               // 用户容器对象
  this.isDesignMode=true;
  var cElement="<div style='width:100%;height:10px;background-color:#aaaadd;display:'></div>";
  this.designPanel=document.createElement (cElement);                                              // 设计面板
  this.setDesignMode=jiuqiWebTableViewSetDesignMode;
  this.appendToParentObj=jiuqiWebTableViewAppendToParentObj;                                       //*对外接口，参数可有可无（多态）
  this.appendToOneObj=jiuqiWebTableViewAppendToOneObj;                                             // 把内部象放置到参数容器中去
  this.lockTableHead=null;
  cElement="<div style='width:100%;height:94%;background-color:;overflow:auto' onscroll='' onresize='' onmousemove='onWorkPanelMouseMove(this)' onselectstart='//if(event.srcElement==jiuqiWebTableViewObj.mainTableHome.inputRange.inputText) return false;'></div>";
  this.workPanel=document.createElement (cElement);                                                // 报表主工作区对象
  this.workPanel.currentJiuQiWebTableViewObj=this;
  this.paintTableNew=jiuqiWebTableViewPaintTableNew;
  this.appendToParentObj(containerObj);
  this.parentObj.currentJiuQiWebTableViewObj=this;
  cElement="<div style='position:absolute;display:none;border:1 solid #606060;background-color:#999999;z-index:990;width:3;overflow:hidden' ondblclick='onCellBoundaryDblClick()' onmousedown='onCellBoundaryMouseDown()' onmousemove='onCellBoundaryMouseMove()' onmouseup='onCellBoundaryMouseUp()' onmouseout='onCellBoundaryMouseMove()'></div>";
  this.cellBoundary=document.createElement (cElement);
  this.workPanel.appendChild(this.cellBoundary);
  this.cellBoundary.jiuqiWebTableViewObj=this;
  cElement="<div style='position:absolute;border:1 solid #FFFFFF;z-index:900;width:100px;height:1;left:0;top:-1;overflow:hidden' ></div>";
  this.xBrace=document.createElement (cElement);
  this.workPanel.appendChild(this.xBrace);
  cElement="<div style='position:absolute;border:1 solid #FFFFFF;z-index:900;width:1;height:100px;left:-1;top:0;overflow:hidden' ></div>";
  this.yBrace=document.createElement (cElement);
  this.workPanel.appendChild(this.yBrace);
  cElement="XML"  ;
  this.xmlDataSouce=document.createElement (cElement);
  this.loadTable=jiuqiWebTableViewLoatTable;
  this.waitClockImg=document.createElement("<IMG src='../images/donghua.gif' style='position:absolute;left:30;top:30;index-z:99;display:none'>");
	document.body.appendChild(this.waitClockImg);
	this.setCenter=jiuqiWebTableViewSetCenter;

  var tableViewStylePath="JiuQiWebTableViewStyle.css";
  var imgPathStr="images";
  this.colorPath="selectcolor.html";
  if(typeof(stylePath)!="undefined") {
    if(stylePath!=null && stylePath!="")
    tableViewStylePath=stylePath;
  }
  if(typeof(imgPath)!="undefined") {
    if(imgPath!=null && imgPath!="")
    imgPathStr=imgPath;
  }
  if(typeof(colorPanlPath)!="undefined") {
    if(colorPanlPath!=null && colorPanlPath!="")
    this.colorPath=colorPanlPath;
  }
  this.tableViewStylePath=tableViewStylePath;
  this.mystylesheet=document.createStyleSheet(tableViewStylePath);
  var cstr="this.parentElement.parentElement.currentJiuQiWebTableViewObj";
  var parentstr="this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.currentJiuQiWebTableViewObj";
  cElement='<table cellSpacing="0" cellPadding="0" border="0" onmouseover="' + cstr + '.designonmouseover(1)" onmousedown="' + cstr + '.designonmouseover(2)" onmouseout="' + cstr + '.designonmouseover(3)"><tr><td>';
  cElement+='<table  style="TABLE-LAYOUT: fixed; WIDTH: 100%; BORDER-BOTTOM: gray 0px solid;  HEIGHT: 22px" cellSpacing="0" cellPadding="0" bgColor="buttonface" border="0">';
  cElement+='<tbody><tr align="middle">';
  //cElement+='<td class="mouseoutclass" title="打印预览" width="22"><img src="' + imgPathStr + '/preview.gif" width="16" height="15" cmdImg=1></td>';
  //cElement+='<td class="mouseoutclass" title="打印" width="22"><img src="' + imgPathStr + '/print.gif" width="16" height="16" cmdImg=1></td>';
  //cElement+='<td class="mouseoutclass" id="'+ containerObj.id + '_cmdBlockCopy" title="块复制" width="22"><img src="' + imgPathStr + '/copy.gif" width="16" height="16" cmdImg=1></td>';
  //cElement+='<td class="mouseoutclass" id="'+ containerObj.id + '_cmdBlockPaste" title="块粘贴" width="22"><img src="' + imgPathStr + '/paste.gif" width="16" height="16" cmdImg=1></td>';
  //cElement+='<td class="mouseoutclass" id="'+ containerObj.id + '_cmdBrush" title="格式刷" width="22"><img src="' + imgPathStr + '/brush.gif" width="16" height="15" cmdImg=1></td>';
  //cElement+='<!--td class="mouseoutclass" id="'+ containerObj.id + '_cmdUndo" title="撤消" width="22"><img src="' + imgPathStr + '/wzundo.gif" width="15" height="14" cmdImg=1></td>';
  //cElement+='<td class="mouseoutclass" id="'+ containerObj.id + '_cmdRedo" title="恢复" width="22"><img src="' + imgPathStr + '/re.gif" width="16" height="16" cmdImg=1></td>';
  //cElement+='-->';
  cElement+='<td class="mouseoutclass" id="'+ containerObj.id + '_cmdLock" title="锁定表头" width="22"><img src="' + imgPathStr + '/lockHead.gif" width="16" height="16" cmdImg=1></td>';
  cElement+='<td class="mouseoutclass" id="'+ containerObj.id + '_cmdMerge" title="合并单元格" onclick="'+ parentstr + '.mainTableHome.workControlObj.combineCells()" width="22"><img src="' + imgPathStr + '/merg.gif" width="16" height="16" cmdImg=1></td>';
  cElement+='<td class="mouseoutclass" id="'+ containerObj.id + '_cmdUnMerge" title="拆分单元格" onclick="'+ parentstr + '.mainTableHome.workControlObj.unCombineCells()" width="22"><img src="' + imgPathStr + '/unMerg.gif" width="16" height="16" cmdImg=1></td>';
  cElement+='<td class="mouseoutclass" id="'+ containerObj.id + '_cmdInsRow" title="插入行" width="22"><img src="' + imgPathStr + '/inset-row.gif" ></td>';
  cElement+='<td class="mouseoutclass" id="'+ containerObj.id + '_insRowNum"  width="45" style="display:" ><select title="插入行数"  cmdImg=1 style="width:45px" onblur="//this.parentElement.style.display=\'none\'"><option value=1>1行</option><option value=2>2行</option><option value=3>3行</option><option value=4>4行</option><option value=5>5行</option><option value=6>6行</option><option value=7>7行</option><option value=8>8行</option><option value=9>9行</option><option value=10>10行</option><option value=15>15行</option><option value=20>20行</option><option value=50>50行</option></select></td>';
  cElement+='<td class="mouseoutclass" id="'+ containerObj.id + '_cmdDelRow" title="删除行" width="22"><img src="' + imgPathStr + '/del-r1.gif" ></td>';
  cElement+='<td class="mouseoutclass" id="'+ containerObj.id + '_cmdInsCol" title="插入列" width="22"><img src="' + imgPathStr + '/ins-coll.gif" ></td>';
  cElement+='<td class="mouseoutclass" id="'+ containerObj.id + '_insColNum" width="45" style="display:" ><select title="插入列数"  cmdImg=1 style="width:45px" onblur="//this.parentElement.style.display=\'none\'"><option value=1>1列</option><option value=2>2列</option><option value=3>3列</option><option value=4>4列</option><option value=5>5列</option><option value=6>6列</option><option value=7>7列</option><option value=8>8列</option><option value=9>9列</option><option value=10>10列</option><option value=15>15列</option><option value=20>20列</option><option value=50>50列</option></select></td>';
  cElement+='<td class="mouseoutclass" id="'+ containerObj.id + '_cmdDelCol" title="删除列" width="22"><img src="' + imgPathStr + '/del-l1.gif" ></td>';
  cElement+='<td class="mouseoutclass" id="'+ containerObj.id + '_cmdFontName" title="字体名称" width="80"><select cmdImg=1 title="字体" style="Z-INDEX: -1; WIDTH: 80px; HEIGHT: 112px" onchange="setCellsFontName(this)">';
  cElement+='<option style="FONT-FAMILY: 宋体" selected value="宋体">宋体</option><option style="FONT-FAMILY: 仿宋_GB2312" value="仿宋_GB2312" >仿宋_GB2312</option><option style="FONT-FAMILY: 黑体" value="黑体">黑体</option><option style="FONT-FAMILY: 楷体_GB2312" value="楷体_GB2312">楷体_GB2312</option><option style="FONT-FAMILY: 隶书" value="隶书">隶书</option><option style="FONT-FAMILY: 幼圆" value="幼圆">幼圆</option><option style="FONT-FAMILY: Arial" value="Arial">Arial</option><option style="FONT-FAMILY: Courier" value="Courier">Courier</option>';
  cElement+='</select></td>';
  cElement+='<td width="40"  class="mouseoutclass" id="'+ containerObj.id + '_cmdFontSize" title="字体大小" ><select cmdImg=1 title="字号" style="Z-INDEX: -1; WIDTH: 40px; HEIGHT: 20px" onchange="setCellsFontSize(this)"><option value=1>1</option><option value=2>2</option><option value=3>3</option><option value=4>4</option><option value=6>6</option><option value=8>8</option><option value=9 selected>9</option><option value=10>10</option><option value=11>11</option><option value=12 >12</option><option value=13>13</option><option value=14>14</option><option value=15>15</option><option  value=16>16</option><option value=17>17</option><option  value=18>18</option><option  value=20>20</option><option  value=22>22</option><option  value=24>24</option><option value=26>26</option><option value=28>28</option><option value=36>36</option><option value=48>48</option><option value=72>72</option></select></td>';
  cElement+='<td class="mouseoutclass" id="'+ containerObj.id + '_cmdFontToB" title="粗体" width="22"><img src="' + imgPathStr + '/font_b.gif" cmdImg=1></td>';
  cElement+='<td class="mouseoutclass" id="'+ containerObj.id + '_cmdFontToI" title="斜体" width="22"><img src="' + imgPathStr + '/font_i.gif" cmdImg=1></td>';
  cElement+='<td class="mouseoutclass" id="'+ containerObj.id + '_cmdFontToU" title="下划线" width="22"><img src="' + imgPathStr + '/font_u.gif" cmdImg=1></td>';
  cElement+='<td class="mouseoutclass" id="'+ containerObj.id + '_cmdColAutoFit" title="列宽依据内容自动适应" width="22"><img src="' + imgPathStr + '/colAutoFit.gif" cmdImg=1></td>';
  cElement+='<td class="mouseoutclass" id="'+ containerObj.id + '_cmdAlignToLeft" title="居左" width="22"><img src="' + imgPathStr + '/align_left.gif" cmdImg=1></td>';
  cElement+='<td class="mouseoutclass" id="'+ containerObj.id + '_cmdAlignToCenter" title="居中" width="22"><img src="' + imgPathStr + '/align_middle.gif" cmdImg=1></td>';
  cElement+='<td class="mouseoutclass" id="'+ containerObj.id + '_cmdAlignToRight" title="居右" width="22"><img src="' + imgPathStr + '/align_right.gif" cmdImg=1></td>';
  cElement+='<td class="mouseoutclass" id="'+ containerObj.id + '_cmdVAlignToTop" title="居上" width="22"><img src="' + imgPathStr + '/up-.gif" cmdImg=1></td>';
  cElement+='<td class="mouseoutclass" id="'+ containerObj.id + '_cmdVAlignToMiddle" title="居中" width="22"><img src="' + imgPathStr + '/middle-.gif" cmdImg=1></td>';
  cElement+='<td class="mouseoutclass" id="'+ containerObj.id + '_cmdVAlignToBottom" title="居下" width="22"><img src="' + imgPathStr + '/down-.gif" cmdImg=1></td>';
  cElement+='<td class="mouseoutclass" id="'+ containerObj.id + '_cmdBackColor" title="背景颜色" width="22"><img src="' + imgPathStr + '/back_fill.gif" cmdImg=1></td>';
  cElement+='<td class="mouseoutclass" id="'+ containerObj.id + '_cmdFontColor" title="字体颜色" width="22"><img src="' + imgPathStr + '/font_fill.gif" cmdImg=1></td>';
  cElement+='<td class="mouseoutclass" id="'+ containerObj.id + '_cmdFontFit" title="自动缩小字体以适应单元格" width="22"><img src="' + imgPathStr + '/fontFit.gif" cmdImg=1></td>';
  cElement+='<td class="mouseoutclass" id="'+ containerObj.id + '_cmdWrap" title="字体折行" width="22"><img src="' + imgPathStr + '/wrap.gif" cmdImg=1></td>';
  cElement+='<td class="mouseoutclass" id="'+ containerObj.id + '_cmdReadOnly" title="单元格只读" width="22"><img src="' + imgPathStr + '/readOnly.gif" cmdImg=1></td>';
  cElement+='<td class="mouseoutclass" id="'+ containerObj.id + '_cmdToMode" title="单元格立体显示" width="22"><img src="' + imgPathStr + '/mode.gif" cmdImg=1></td>';
  cElement+='<td class="mouseoutclass" id="'+ containerObj.id + '_cmdSolid" title="单实边线" width="22"><img src="' + imgPathStr + '/border/solid.gif" cmdImg=1></td>';
  cElement+='<td class="mouseoutclass" id="'+ containerObj.id + '_cmdBorderDown" title="边线样式选择" width="11"><img src="' + imgPathStr + '/borderdown.gif" cmdImg=1></td>';
  cElement+='<td ></td></tr></tbody></table></td></tr><tr><td>';
  cElement+='<table style="TABLE-LAYOUT: fixed; BORDER-TOP: white 0px solid; WIDTH: 100%;  HEIGHT: 0px" cellSpacing="0" cellPadding="0" bgColor="silver" border="0">';
  cElement+=' <tr align="middle">';
  cElement+='<td ></td></tr></table>';
  cElement+='<table id=borderSelectPanle style="position:absolute;TABLE-LAYOUT:;WIDTH:100;BORDER:gray 1px solid;HEIGHT:90px;display:none" cellSpacing="2" cellPadding="0" bgColor="buttonface" border="1" bordercolordark=buttonface bordercolor=buttonface>';
  cElement+='<tr align="middle">';
  cElement+='<td colspan=4 cmdImg=1 align=right height=1 style="padding:0px;" style="background-color:#999999;padding:0;margin:0" >';
  cElement+='<img src="' + imgPathStr + '/close0.gif" cmdImg=1 style="cursor:hand" onmousedown="hideBorderStylePanle()"></img></td>';
  cElement+='</tr><tr align="middle">';
  cElement+='<td class="mouseoutclass" id="'+ containerObj.id + '_cmdDashed" title="虚边线" width="22"><img src="' + imgPathStr + '/border/dashed.gif" cmdImg=1></td>';
  cElement+='<td class="mouseoutclass" id="'+ containerObj.id + '_cmdSolidBottom" title="下单边线" width="22"><img src="' + imgPathStr + '/border/solid_bottom.gif" cmdImg=1></td>';
  cElement+='<td class="mouseoutclass" id="'+ containerObj.id + '_cmdSolidLeft" title="左单边线" width="22"><img src="' + imgPathStr + '/border/solid_left.gif" cmdImg=1></td>';
  cElement+='<td class="mouseoutclass" id="'+ containerObj.id + '_cmdSolidRight" title="右单边线" width="22"><img src="' + imgPathStr + '/border/solid_right.gif" cmdImg=1></td>';
  cElement+='</tr><tr align="middle">';
  cElement+='<td class="mouseoutclass" id="'+ containerObj.id + '_cmdDoubleSolidBottom" title="下双边线" width="22"><img src="' + imgPathStr + '/border/double_bottom.gif" cmdImg=1></td>';
  cElement+='<td class="mouseoutclass" id="'+ containerObj.id + '_cmdBoldBottom" title="周围粗边线" width="22"><img src="' + imgPathStr + '/border/bold_bottom.gif" cmdImg=1></td>';
  cElement+='<td class="mouseoutclass" id="'+ containerObj.id + '_cmdSolidTopBottom" title="上下单边线" width="22"><img src="' + imgPathStr + '/border/solid_top_bottom.gif" cmdImg=1></td>';
  cElement+='<td class="mouseoutclass" id="'+ containerObj.id + '_cmdSolidTopDoubleSolidBottom" title="上单实下双实" width="22"><img src="' + imgPathStr + '/border/solid_top_double_bottom.gif" cmdImg=1></td>';
  cElement+='</tr><tr align="middle">';
  cElement+='<td class="mouseoutclass" id="'+ containerObj.id + '_cmdSolidTopBoldBottom" title="上单实下粗" width="22"><img src="' + imgPathStr + '/border/solid_top_bold_bottom.gif" cmdImg=1></td>';
  cElement+='<td class="mouseoutclass" id="'+ containerObj.id + '_cmdSolid" title="单实边线" width="22"><img src="' + imgPathStr + '/border/solid.gif" cmdImg=1></td>';
  cElement+='<td class="mouseoutclass" id="'+ containerObj.id + '_cmdSolidAround" title="周围单边线" width="22"><img src="' + imgPathStr + '/border/solid_around.gif" cmdImg=1></td>';
  cElement+='<td class="mouseoutclass" id="'+ containerObj.id + '_cmdBoldAround" title="周围粗边线" width="22"><img src="' + imgPathStr + '/border/bold_around.gif" cmdImg=1></td>';
  cElement+='</tr></table>';

  cElement+='</td></tr></table>';
  this.designonmouseover=jiuqiWebTableViewDesignOnmouseover;
  this.designPanel.innerHTML=cElement;
  this.attachTable=jiuqiWebTableViewAttachTable;
  this.attachOverTable=jiuqiWebTableViewAttachOverTable;
  this.inputTextdir="down";
  this.lockColHead=0;
  this.lockRowHead=0;
  this.dataIsChanged=false;
  this.paraIschanged=false;
  this.clearTable=jiuqiWebTableViewClearTable;
  this.commandDo=jiuqiWebTableViewCommandDo;
  this.setCurrentCellState=jiuqiWebTableViewSetCurrentCellState;
  this.setObjToActive=jiuqiWebTableViewSetObjToActive;
  this.clearObjStyle=jiuqiWebTableViewClearObjStyle;
  this.tableIsChange=false;
}
function jiuqiWebTableViewLockTableHead(cdiv){
  try{
    this.mainTableHome.lockTableHead(cdiv);
  }catch(e){}
}
function jiuqiWebTableViewAppendToParentObj(containerObj){                                         //*this.appendToParentObj
  if(typeof(containerObj)=="object"){
    if(typeof(this.parentObj)=="object"){
      this.parentObj.removeNode(this.designPanel);
      this.parentObj.removeNode(this.workPanel);
    }
    this.parentObj=containerObj;
  }
  this.appendToOneObj(this.parentObj);
}
function jiuqiWebTableViewAppendToOneObj(containerObj){                                            //this.appendToOneObj
  if(typeof(containerObj)=="object"){
    containerObj.JiuQiWebTableViewObj=this;
    containerObj.appendChild(this.designPanel);
    containerObj.appendChild(this.workPanel);
  }else{
    alert("容器对象不能为空!");
  }
}
function jiuqiWebTableViewPaintTableNew(width,height){                                                //设置表行列数，并且画出表样
  //this.workPanel.innerHTML="";
  this.clearTable();
  this.mainTableHome=new JiuQiWebTableClass(this);
  window.document.body.detachEvent("onmouseup",this.mainTableHome.mainTableBlur);
  window.document.detachEvent("onkeypress",this.mainTableHome.inputRange.onDocumentKeyDown);
  window.document.detachEvent("onkeydown",this.mainTableHome.inputRange.onDocumentKeyDown);
  window.document.body.attachEvent("onmouseup",this.mainTableHome.mainTableBlur);
  window.document.attachEvent("onkeypress",this.mainTableHome.inputRange.onDocumentKeyDown);
  window.document.attachEvent("onkeydown",this.mainTableHome.inputRange.onDocumentKeyDown);
  this.workPanel.attachEvent("onresize",this.mainTableHome.lockTableHead);
  this.workPanel.attachEvent("onscroll",this.mainTableHome.lockTableHead);
  window.attachEvent("onresize",this.mainTableHome.lockTableHead);
  this.mainTableHome.xmlDataSouce=this.xmlDataSouce;
  this.workPanel.appendChild(this.mainTableHome.mainTable);
  this.mainTableHome.mainTableINI(width,height);
  this.mainTableHome.mainTable.parentObj=this.mainTableHome;

  //this.mainTableHome.createLockTableHead();
}
function jiuqiWebTableViewClearTable(){
  var ctable=null;
  for(var i=0;i<this.workPanel.children.length;i++){
    if(this.workPanel.children[i].tagName=="TABLE"){
      ctable=this.workPanel.children[i];
      break;
    }
  }
  if(ctable!=null){
    this.workPanel.removeChild(ctable);
  }
  ctable=null;
}
function jiuqiWebTableViewAttachTable(targetT){
  //this.workPanel.innerHTML="";
  this.clearTable();
  this.mainTableHome=new JiuQiWebTableClass(this);
  window.document.body.detachEvent("onmouseup",this.mainTableHome.mainTableBlur);
  window.document.detachEvent("onkeypress",this.mainTableHome.inputRange.onDocumentKeyDown);
  window.document.detachEvent("onkeydown",this.mainTableHome.inputRange.onDocumentKeyDown);
  window.document.body.attachEvent("onmouseup",this.mainTableHome.mainTableBlur);
  window.document.attachEvent("onkeypress",this.mainTableHome.inputRange.onDocumentKeyDown);
  window.document.attachEvent("onkeydown",this.mainTableHome.inputRange.onDocumentKeyDown);
  this.workPanel.attachEvent("onresize",this.mainTableHome.lockTableHead);
  this.workPanel.attachEvent("onscroll",this.mainTableHome.lockTableHead);
  window.attachEvent("onresize",this.mainTableHome.lockTableHead);
  this.mainTableHome.xmlDataSouce=this.xmlDataSouce;
  this.workPanel.appendChild(this.mainTableHome.mainTable);
  this.mainTableHome.createTableDesignFrom(targetT);
  this.mainTableHome.setXYBrace();
  //this.mainTableHome.createLockTableHead();
  this.mainTableHome.mainTable.parentObj=this.mainTableHome;
}
var targetTableBorder;
var targetTableBorderColor;
function jiuqiWebTableViewAttachOverTable(targetT){
  //this.workPanel.innerHTML="";
  targetTableBorder  =  targetT.border;
  targetTableBorderColor = targetT.bordercolor;
  this.clearTable();
  this.mainTableHome=new JiuQiWebTableClass(this);
  window.document.body.detachEvent("onmouseup",this.mainTableHome.mainTableBlur);
  window.document.detachEvent("onkeypress",this.mainTableHome.inputRange.onDocumentKeyDown);
  window.document.detachEvent("onkeydown",this.mainTableHome.inputRange.onDocumentKeyDown);
  window.document.body.attachEvent("onmouseup",this.mainTableHome.mainTableBlur);
  window.document.attachEvent("onkeypress",this.mainTableHome.inputRange.onDocumentKeyDown);
  window.document.attachEvent("onkeydown",this.mainTableHome.inputRange.onDocumentKeyDown);
  this.workPanel.attachEvent("onresize",this.mainTableHome.lockTableHead);
  this.workPanel.attachEvent("onscroll",this.mainTableHome.lockTableHead);
  window.attachEvent("onresize",this.mainTableHome.lockTableHead);
  this.mainTableHome.xmlDataSouce=this.xmlDataSouce;
  this.workPanel.appendChild(this.mainTableHome.mainTable);
  this.mainTableHome.createOverTableDesignFrom(targetT);
  this.mainTableHome.setXYBrace();
  //this.mainTableHome.createLockTableHead();
  this.mainTableHome.mainTable.parentObj=this.mainTableHome;
}
function jiuqiWebTableViewSetDesignMode(isdesignmode){
  if(!(typeof(isdesignmode)=="undefined")){
    if(this.isDesignMode==isdesignmode) return;
    this.isDesignMode=isdesignmode;
  }
  if(this.isDesignMode){
    this.designPanel.style.display="";
    this.designPanel.runtimeStyle.height="10px";
    this.workPanel.runtimeStyle.height=(parseInt(this.parentObj.offsetHeight)-10) + "px";
  }else{
    this.designPanel.style.display="none";
    this.designPanel.runtimeStyle.height="0";
    this.workPanel.runtimeStyle.height="100%";
  }
  if(typeof(this.mainTableHome)!="undefined")
  this.mainTableHome.setDesignMode(this.isDesignMode);
}
function jiuqiWebTableViewLoatTable(url){
  if(typeof(url)=="undefined") {
    alert("参数不能不空！");
    return;
  }
  if(url==null || url=="") {
    alert("参数错误！");
    return;
  }
  this.xmlDataSouce.async = false;
  this.setCenter();
  this.waitClockImg.style.display="";
  try{
    this.xmlDataSouce.load(url);
  }catch(mye){
    alert(mye)
  }
  this.waitClockImg.style.display="none";
  if(this.xmlDataSouce.parseError.errorCode != 0)	{
		var errorinfor='';
		errorinfor+='XML文档的结构错误：';
		errorinfor+=this.xmlDataSouce.parseError.reason;
		errorinfor+=' 第' + this.xmlDataSouce.parseError.line + '行处 ';
		errorinfor+=this.xmlDataSouce.parseError.srcText;
		alert(errorinfor);
	}
}
//把图片放置到页面中央
function jiuqiWebTableViewSetCenter(){
  cobj=this.waitClockImg;
  cobj.style.left=document.body.clientWidth/2-cobj.clientWidth/2-document.body.clientWidth/40
  cobj.style.top=document.body.clientHeight/2-cobj.clientHeight/2-document.body.clientHeight/20
}
function jiuqiWebTableViewDesignOnmouseover(a){
  var oldActive=false;
  var cobj=event.srcElement;
  if(cobj.tagName=="IMG"){//如果是图片按钮的话
    cTD=cobj.parentNode
    if(cTD.id=="") return;
    if(cTD.isActive){
      oldActive=true;
    }
	if(cTD.tagName=="TD"){
		if(a==2){//mousedown
		  this.commandDo(cTD);
		  if(!cTD.isActive){
		    this.setObjToActive(cTD,false);

		  }
		  setButtonBorderIn(cTD);
		}
		if(a==1){//mouseover
		  if(!cTD.isActive){
		    setButtonBorderOut(cTD);
		  }
		  if(cTD.id==this.parentObj.id + "_cmdInsRow"){
		    eval(this.parentObj.id + "_insRowNum").style.display="";
		  }
		  if(cTD.id==this.parentObj.id + "_cmdInsCol"){
		    eval(this.parentObj.id + "_insColNum").style.display="";
		  }
		}
		if(a==3){//mouserout
		  if(!cTD.isActive){
		    setButtonBorderAuto(cTD);
		  }
		}
	    if(cTD.isActive){
		  this.setObjToActive(cTD,true);
		}
    }
  }
}
function jiuqiWebTableViewSetCurrentCellState(ctd){//在设计模式下此方法被调用，用于设置当前单元格的风格于命令栏中。
  var cells=this.designPanel.firstChild.rows[0].cells[0].firstChild.rows[0].cells;
  for(var i=0;i<cells.length;i++){
    this.setObjToActive(cells[i],false);
  }
  if(ctd==null) return;
  var inputText=this.mainTableHome.inputRange.inputText;
  this.clearObjStyle(inputText);
  var cStyle=ctd.currentStyle;
  if(cStyle.fontWeight=="bold" || cStyle.fontWeight==700){
    this.setObjToActive(eval(this.parentObj.id + "_cmdFontToB"),true);
    inputText.runtimeStyle.fontWeight="bold";
  }
  if(cStyle.fontStyle=="italic"){
    this.setObjToActive(eval(this.parentObj.id + "_cmdFontToI"),true);
    inputText.runtimeStyle.fontStyle="italic";
  }
  if(cStyle.textDecoration=="underline"){
    this.setObjToActive(eval(this.parentObj.id + "_cmdFontToU"),true);
    inputText.runtimeStyle.textDecoration="underline";
  }
  if(cStyle.textAlign=="left"){
    this.setObjToActive(eval(this.parentObj.id + "_cmdAlignToLeft"),true);
    inputText.runtimeStyle.textAlign="left";
  }
  if(cStyle.textAlign=="right"){
    this.setObjToActive(eval(this.parentObj.id + "_cmdAlignToRight"),true);
    inputText.runtimeStyle.textAlign="right";
  }
  if(cStyle.textAlign=="center"){
    this.setObjToActive(eval(this.parentObj.id + "_cmdAlignToCenter"),true);
    inputText.runtimeStyle.textAlign="center";
  }
  if(cStyle.verticalAlign=="top"){
    this.setObjToActive(eval(this.parentObj.id + "_cmdVAlignToTop"),true);
    inputText.runtimeStyle.verticalAlign="top";
  }
  if(cStyle.verticalAlign=="middle"){
    this.setObjToActive(eval(this.parentObj.id + "_cmdVAlignToMiddle"),true);
    inputText.runtimeStyle.verticalAlign="middle";
  }
  if(cStyle.verticalAlign=="bottom"){
    this.setObjToActive(eval(this.parentObj.id + "_cmdVAlignToBottom"),true);
    inputText.runtimeStyle.verticalAlign="bottom";
  }
  var cFamily=cStyle.fontFamily;
  if(cFamily==""){
    eval(this.parentObj.id + "_cmdFontName").firstChild.value="宋体";
    ctd.style.fontFamily="宋体";
  }else{
    eval(this.parentObj.id + "_cmdFontName").firstChild.value=cFamily;
  }
  inputText.runtimeStyle.fontFamily=cStyle.fontFamily;
  var cSize=cStyle.fontSize;
  if(cSize==""){
    eval(this.parentObj.id + "_cmdFontSize").firstChild.value=9;
    ctd.style.fontSize="9pt";
  }else{
    eval(this.parentObj.id + "_cmdFontSize").firstChild.value=parseInt(cSize);
  }
  inputText.runtimeStyle.fontSize=cStyle.fontSize ;
  var cbackcolor=cStyle.backgroundColor;
  if(cbackcolor==""){
    eval(this.parentObj.id + "_cmdBackColor").firstChild.runtimeStyle.backgroundColor="";
  }else{
    try{
      eval(this.parentObj.id + "_cmdBackColor").firstChild.runtimeStyle.backgroundColor=cStyle.backgroundColor;
    }catch(e){}
  }
  if(cbackcolor=="transparent"){
    inputText.runtimeStyle.backgroundColor="#ffffff";
  }else{
    try{
      inputText.runtimeStyle.backgroundColor=cStyle.backgroundColor;
    }catch(e){}
  }
  var cfontcolor=cStyle.color;
  if(cfontcolor==""){
    //cStyle.color=eval(this.parentObj.id + "_cmdFontColor").firstChild.runtimeStyle.backgroundColor;
    eval(this.parentObj.id + "_cmdFontColor").firstChild.runtimeStyle.backgroundColor="";
  }else{
    eval(this.parentObj.id + "_cmdFontColor").firstChild.runtimeStyle.backgroundColor=cStyle.color;
  }
  inputText.runtimeStyle.color=cStyle.color;
  var cWrap=ctd.noWrap;
  if(cWrap){
    this.setObjToActive(eval(this.parentObj.id + "_cmdWrap"),false);
  }else{
    this.setObjToActive(eval(this.parentObj.id + "_cmdWrap"),true);
  }
  var fft=ctd.fft;
  if("1"==fft){
    this.setObjToActive(eval(this.parentObj.id + "_cmdFontFit"),true);
  }else{
    this.setObjToActive(eval(this.parentObj.id + "_cmdFontFit"),false);
  }
  var isMode=ctd.isMode;
  if((typeof(isMode)=="string" && isMode=="true") || (typeof(isMode)=="boolean" && isMode==true)){
    this.setObjToActive(eval(this.parentObj.id + "_cmdToMode"),true);
  }else{
    this.setObjToActive(eval(this.parentObj.id + "_cmdToMode"),false);
  }
  var isReadOnly=ctd.rOC;
  if("1"==isReadOnly){
    this.setObjToActive(eval(this.parentObj.id + "_cmdReadOnly"),true);
  }else{
    this.setObjToActive(eval(this.parentObj.id + "_cmdReadOnly"),false);
  }
  if(this.lockRowHead==ctd.parentElement.rowIndex-1 && this.lockColHead==parseInt(ctd.lx)-1){
    this.setObjToActive(eval(this.parentObj.id + "_cmdLock"),true);
  }else{
    this.setObjToActive(eval(this.parentObj.id + "_cmdLock"),false);
  }
}
function setCellsFontName(cobj){
  jiuqiWebTableViewObj.mainTableHome.workControlObj.setAttribByName(["fontFamily"],[cobj.value],[true],[true]);
}
function setCellsFontSize(cobj){
  jiuqiWebTableViewObj.mainTableHome.workControlObj.setAttribByName(["fontSize"],[cobj.value+"pt"],[true],[true]);
}
function jiuqiWebTableViewClearObjStyle(cobj){
  cobj.runtimeStyle.fontWeight="";
  cobj.runtimeStyle.textAlign="";
  cobj.runtimeStyle.verticalAlign="";
  cobj.runtimeStyle.fontStyle="";
  cobj.runtimeStyle.textDecoration="";
  cobj.runtimeStyle.fontFamily="";
  cobj.runtimeStyle.border="gray 1px solid";
}
function jiuqiWebTableViewSetObjToActive(cobj,isA){//设置一个按钮的状态
  if(isA){
    cobj.isActive=true;
    setButtonBorderIn(cobj);
    cobj.style.backgroundColor="#f0f0f0";
  }else{
    cobj.isActive=false;
    setButtonBorderAuto(cobj);
    if(!(cobj.id==this.parentObj.id + "_cmdFontColor" || cobj.id==this.parentObj.id + "_cmdBackColor")){
      cobj.style.backgroundColor="";
    }
  }
}
function setButtonBorderOut(cobj){
  cobj.style.borderRight="gray 1px solid";
  cobj.style.borderTop="white 1px solid";
  cobj.style.borderLeft="white 1px solid";
  cobj.style.borderTottom="gray 1px solid";
  cobj.style.cursor="hand";
}
function setButtonBorderIn(cobj){
  cobj.style.borderRight="white 1px solid";
  cobj.style.borderTop="gray 1px solid";
  cobj.style.borderLeft="gray 1px solid";
  cobj.style.borderTottom="white 1px solid";
  cobj.style.cursor="hand";
}
function setButtonBorderAuto(cobj){
  cobj.style.borderRight="buttonface 1px solid";
  cobj.style.borderTop="buttonface 1px solid";
  cobj.style.borderLeft="buttonface 1px solid";
  cobj.style.borderTottom="buttonface 1px solid";
  cobj.style.cursor="hand";
}
function getObjLeftAndTop(cObj){
  var returnObj=[0,0];
  var co=cObj;
  while(co.tagName!="BODY"){
    if(co.style.position=="absolute"){
      returnObj[0]=returnObj[0] + parseInt(co.style.left);
      returnObj[1]=returnObj[1] + parseInt(co.style.top);
    }else{
      returnObj[0]=returnObj[0] + parseInt(co.offsetLeft);
      returnObj[1]=returnObj[1] + parseInt(co.offsetTop);
    }
    co=co.parentElement;
  }
  return returnObj;
}
function showBorderStylePanle(){
  var downImg=event.srcElement;
  var lt=getObjLeftAndTop(downImg);
  var panle=window.borderSelectPanle[0];
  panle.style.display='';
  panle.style.left=lt[0]-panle.offsetWidth + downImg.offsetWidth;
  panle.style.top=lt[1] + downImg.offsetHeight;
}
function hideBorderStylePanle(){
  window.borderSelectPanle[0].style.display='none';
}
function jiuqiWebTableViewCommandDo(ctd){//按下一个按钮
  var currentId=ctd.id;
  var isActive=false;
  if(ctd.isActive){
    isActive=true;
  }
  var cValue="";
  switch(currentId){
    case this.parentObj.id + "_cmdFontToB":
      if(!isActive){
        cValue="bold";
        ctd.isActive=true;
	  }else{
	    ctd.isActive=false;
	    cValue="normal";
	  }
      this.mainTableHome.workControlObj.setAttribByName(["fontWeight"],[cValue],[true],[true]);
	  break;
	case this.parentObj.id + "_cmdFontToI":
      if(!isActive){
        cValue="italic";
        ctd.isActive=true;
	  }else{
	    ctd.isActive=false;
	  }
	  this.mainTableHome.workControlObj.setAttribByName(["fontStyle"],[cValue],[true],[true]);
	  break;
	case this.parentObj.id + "_cmdFontToU":
      if(!isActive){
        cValue="underline";
        ctd.isActive=true;
	  }else{
	    ctd.isActive=false;
	  }
	  this.mainTableHome.workControlObj.setAttribByName(["textDecoration"],[cValue],[true],[true]);
	  break;
	case this.parentObj.id + "_cmdAlignToLeft":
	  ctd.isActive=true;
	  this.setObjToActive(eval(this.parentObj.id + "_cmdAlignToRight"),false);
	  this.setObjToActive(eval(this.parentObj.id + "_cmdAlignToCenter"),false);
	  this.mainTableHome.workControlObj.setAttribByName(["textAlign"],["left"],[true],[true]);
	  break;
	case this.parentObj.id + "_cmdColAutoFit":
          this.mainTableHome.setSelectedColAutoFit();
	  break;
	case this.parentObj.id + "_cmdAlignToRight":
	  ctd.isActive=true;
	  this.setObjToActive(eval(this.parentObj.id + "_cmdAlignToLeft"),false);
	  this.setObjToActive(eval(this.parentObj.id + "_cmdAlignToCenter"),false);
	  this.mainTableHome.workControlObj.setAttribByName(["textAlign"],["right"],[true],[true]);
	  break;
	case this.parentObj.id + "_cmdAlignToCenter":
	  ctd.isActive=true;
	  this.setObjToActive(eval(this.parentObj.id + "_cmdAlignToRight"),false);
	  this.setObjToActive(eval(this.parentObj.id + "_cmdAlignToLeft"),false);
	  this.mainTableHome.workControlObj.setAttribByName(["textAlign"],["center"],[true],[true]);
	  break;
	case this.parentObj.id + "_cmdVAlignToTop":
	  ctd.isActive=true;
	  this.setObjToActive(eval(this.parentObj.id + "_cmdVAlignToBottom"),false);
	  this.setObjToActive(eval(this.parentObj.id + "_cmdVAlignToMiddle"),false);
	  this.mainTableHome.workControlObj.setAttribByName(["verticalAlign"],["top"],[true],[true]);
	  break;
	case this.parentObj.id + "_cmdVAlignToMiddle":
	  ctd.isActive=true;
	  this.setObjToActive(eval(this.parentObj.id + "_cmdVAlignToBottom"),false);
	  this.setObjToActive(eval(this.parentObj.id + "_cmdVAlignToTop"),false);
	  this.mainTableHome.workControlObj.setAttribByName(["verticalAlign"],["middle"],[true],[true]);
	  break;
	case this.parentObj.id + "_cmdVAlignToBottom":
	  ctd.isActive=true;
	  this.setObjToActive(eval(this.parentObj.id + "_cmdVAlignToMiddle"),false);
	  this.setObjToActive(eval(this.parentObj.id + "_cmdVAlignToTop"),false);
	  this.mainTableHome.workControlObj.setAttribByName(["verticalAlign"],["bottom"],[true],[true]);
	  break;
	case this.parentObj.id + "_cmdFontColor":
	  var oldColor=eval(this.parentObj.id + "_cmdFontColor").firstChild.style.backgroundColor;
	  var newColor = window.showModalDialog(this.colorPath,oldColor,"dialogHeight:180px; dialogWidth:170px; help:no;status:no");
	  if(newColor!="#NaNNaNNaN"  && typeof(newColor)!="undefined"){
	    this.mainTableHome.workControlObj.setAttribByName(["color"],[newColor],[true],[true]);
	    eval(this.parentObj.id + "_cmdFontColor").firstChild.runtimeStyle.backgroundColor=newColor;
	  }
	  break;
	case this.parentObj.id + "_cmdBackColor":
	  var oldColor=eval(this.parentObj.id + "_cmdBackColor").firstChild.runtimeStyle.backgroundColor;
	  var newColor = window.showModalDialog(this.colorPath,oldColor,"dialogHeight:180px; dialogWidth:170px; help:no;status:no;scroll:no;");
	  if(newColor!="#NaNNaNNaN" && typeof(newColor)!="undefined"){
	    this.mainTableHome.workControlObj.setAttribByName(["backgroundColor"],[newColor],[true],[true]);
	    eval(this.parentObj.id + "_cmdBackColor").firstChild.runtimeStyle.backgroundColor=newColor;
	  }
	  break;
	case this.parentObj.id + "_cmdWrap":
	  if(!isActive){
            cValue=false;
            ctd.isActive=true;
	  }else{
	    cValue=true;
	    ctd.isActive=false;
	  }
          var nameArr=["wordWrap","wordBreak","noWrap"];
          var valueArr=["","","true"];
	  if(!cValue){
	    valueArr=["break-word","break-all",""];
	  }
          var isStyleArr=[true,true,false];
          var setInputArr=[true,true,true];
	  this.mainTableHome.workControlObj.setAttribByName(nameArr,valueArr,isStyleArr,setInputArr);
	  break;
	case this.parentObj.id + "_cmdFontFit":
	  if(!isActive){
            cValue='1';
            ctd.isActive=true;
	  }else{
	    cValue='0';
	    ctd.isActive=false;
	  }
          var nameArr=["fft"];
          var valueArr=[cValue];
          var isStyleArr=[false];
          var setInputArr=[false];
	  this.mainTableHome.workControlObj.setAttribByName(nameArr,valueArr,isStyleArr,setInputArr);
          this.mainTableHome.workControlObj.setTdsFontFit(!isActive);
	  break;
	case this.parentObj.id + "_cmdToMode":
	  if(isActive){
	    var nameArr=["isMode","borderLeftWidth","borderTopWidth","borderRightColor","borderBottomColor","backgroundColor"];
	    var valueArr=[false,0,0,"buttonface","buttonface","transparent"];
	    var isStyleArr=[false,true,true,true,true,true];
	    var setInputArr=[false,false,false,false,false,true];
            this.mainTableHome.workControlObj.setAttribByName(nameArr,valueArr,isStyleArr,setInputArr);
            eval(this.parentObj.id + "_cmdToMode").isActive=false;
	  }else{
	    var nameArr=["isMode","borderRightColor","borderBottomColor","borderLeftColor","borderTopColor","borderLeftWidth","borderTopWidth","backgroundColor"];
	    var valueArr=[true,"#000000","#000000","#ffffff","#ffffff",1,1,"buttonface"];
	    var isStyleArr=[false,true,true,true,true,true,true,true];
	    var setInputArr=[false,false,false,false,false,false,false,true];
            this.mainTableHome.workControlObj.setAttribByName(nameArr,valueArr,isStyleArr,setInputArr);
            eval(this.parentObj.id + "_cmdToMode").isActive=true;
	  }
	  break;
	case this.parentObj.id + "_cmdDashed"://虚边线
	  this.mainTableHome.workControlObj.setBordSolid(false);
          hideBorderStylePanle();
	  break;
	case this.parentObj.id + "_cmdSolidBottom"://底单线
	  this.mainTableHome.workControlObj.setBordSolidBottom();
          hideBorderStylePanle();
	  break;
	case this.parentObj.id + "_cmdSolidLeft"://左单线
	  this.mainTableHome.workControlObj.setBordSolidLeft(false);
          hideBorderStylePanle();
	  break;
	case this.parentObj.id + "_cmdSolidRight"://右单线
	  this.mainTableHome.workControlObj.setBordSolidRight(false);
          hideBorderStylePanle();
	  break;
	case this.parentObj.id + "_cmdDoubleSolidBottom"://下双线
	  this.mainTableHome.workControlObj.setBordDoubleSolidBottom(false);
          hideBorderStylePanle();
	  break;
	case this.parentObj.id + "_cmdBoldBottom"://下粗线
	  this.mainTableHome.workControlObj.setBordBottom(true);
          hideBorderStylePanle();
	  break;
	case this.parentObj.id + "_cmdSolidTopBottom"://上下单线
	  this.mainTableHome.workControlObj.setBordSolidTopBottom(false);
          hideBorderStylePanle();
	  break;
	case this.parentObj.id + "_cmdSolidTopDoubleSolidBottom"://上单线，下双线
	  this.mainTableHome.workControlObj.setBordSolidTopDoubleSolidBottom(false);
          hideBorderStylePanle();
	  break;
	case this.parentObj.id + "_cmdSolidTopBoldBottom"://上单线，下粗线
	  this.mainTableHome.workControlObj.setBordSolidTopBoldBottom(false);
          hideBorderStylePanle();
	  break;
	case this.parentObj.id + "_cmdSolid"://单实边线
	    this.mainTableHome.workControlObj.setBordSolid(true);
            hideBorderStylePanle();
	    break;
	case this.parentObj.id + "_cmdSolidAround"://周围单边线
	  this.mainTableHome.workControlObj.setBordAround(false);
          hideBorderStylePanle();
	  break;
	case this.parentObj.id + "_cmdBoldAround"://周围粗线
	  this.mainTableHome.workControlObj.setBordAround(true);
          hideBorderStylePanle();
	  break;

	case this.parentObj.id + "_cmdDelRow":
	  this.mainTableHome.workControlObj.delRow();
	  break;
	case this.parentObj.id + "_cmdDelCol":
	  this.mainTableHome.workControlObj.delCol();
	  break;
	case this.parentObj.id + "_cmdInsRow":
	  this.mainTableHome.workControlObj.insRow(eval(this.parentObj.id + "_insRowNum").firstChild.value);
	  break;
	case this.parentObj.id + "_cmdInsCol":
	  this.mainTableHome.workControlObj.insCol(eval(this.parentObj.id + "_insColNum").firstChild.value);
	  break;
	case this.parentObj.id + "_cmdReadOnly":
	  if(!isActive){
	    this.mainTableHome.workControlObj.setAttribByName(["rOC"],["1"],[false],[false]);
	    ctd.isActive=true;
	  }else{
	    this.mainTableHome.workControlObj.setAttribByName(["rOC"],["0"],[false],[false]);
	    ctd.isActive=false;
	  }
	  break;
        case this.parentObj.id+ "_cmdBorderDown":
          showBorderStylePanle(ctd);
          break;
        case this.parentObj.id+ "_closeSelectPanle":
          hideBorderStylePanle(ctd);
          break;
	case this.parentObj.id + "_cmdLock":
	  if(!isActive){
		if(this.mainTableHome.workControlObj.currentSelectIndex!=0 ) {
		  alert("请选择一个单元格做为两个表头的交差点.");
		  return false;
		}
		var ctable=this.mainTableHome.mainTable;
		var lx1=this.mainTableHome.workControlObj.selecteddiv[0].lx1;
		var ly1=this.mainTableHome.workControlObj.selecteddiv[0].ly1;
		if(lx1==ctable.rows[0].cells.length-1 && ly1==ctable.rows.length-1){
		  alert("不可以锁定整个表!");
		  return;
		}
        this.lockColHead=lx1-1;
        this.lockRowHead=ly1-1;
        ctd.isActive=true;
      }else{
        this.lockColHead=0;
        this.lockRowHead=0;
        ctd.isActive=false;
      }
      this.mainTableHome.createLockTableHead();
	  break;
  }
  this.tableIsChange=true;
}
//script name=tableClass
//成员对象this.workPanel.maintable的构造器
function JiuQiWebTableClass(cparentobj){
  this.parentObj=cparentobj;
  var cstr="this.parentElement.currentJiuQiWebTableViewObj.mainTableHome";
  var myeventstr=" onmouseover='"+cstr+".onMouseOver()'  onmouseout='"+cstr+".onMouseOut()' onmousemove='"+cstr+".onMouseMove()' onmousedown='"+cstr+".onMouseDown()' onmouseup='"+cstr+".onMouseUp()' ondblclick='"+cstr+".onDoubleClick()'";
  var cElement="<table bgcolor='#FFFFFF' class='JiuQiWebTableViewTable' style='position:absolute;table-layout:fixed;left:0;top:1;z-index:10;filter:alpha(opacity=80);background-color:window;' border="+targetTableBorder+" bordercolor="+targetTableBorderColor+" cellpadding=1 cellspacing=0 " + myeventstr + " onselectstart='return false' ondragstart='return false' >";
  this.mainTable=document.createElement(cElement);
  this.rowHeadTable=document.createElement(cElement);
  this.colHeadTable=document.createElement(cElement);
  this.twoHeadTable=document.createElement(cElement);
  this.rowHeadTable.style.filter="";
  this.colHeadTable.style.filter="";
  this.twoHeadTable.style.filter="";
  this.mainTableINI=jiuqiWebTableViewMainTableINI;
  this.mainTableWidth=20;
  this.mainTableHeight=30;
  this.mainTablePaintNew=jiuqiWebTableViewMainTablePaintNew;
  this.mainTablePaint=jiuqiWebTableViewMainTablePaint;
  this.headCellBGColor="#aaaaaa";
  this.rowHeadWidth=40;
  this.defaultCellWidth=60;
  this.defaultCellHeight=22;
  this.colHeadHeight=22;
  this.xmlDataSouce=null;
  this.setDesignMode=jiuqiWebTableViewMainTableSetDesignMode;
  this.resizeBrace=jiuqiWebTableViewMainTableResizeBrace;
  this.workControlObj=new JiuQiWebTableWorkControl(this);
  this.onMouseDown=jiuqiWebTableViewMainTableOnMouseDown;
  this.onMouseMove=jiuqiWebTableViewMainTableOnMouseMove;
  this.onMouseOver=jiuqiWebTableViewMainTableOnMouseOver;
  this.onMouseOut=jiuqiWebTableViewMainTableOnMouseOut;
  this.onTdMouseOver=null;
  this.onTdMouseOut=null;
  this.onMouseUp=jiuqiWebTableViewMainTableOnMouseUp;
  this.onClick=jiuqiWebTableViewMainTableOnClick
  this.onTableClick=jiuqiWebTableViewMainTableOnTableClick;
  this.onDoubleClick=jiuqiWebTableViewMainTableOnDoubleClick;
  this.boolMouseisdown=0;
  this.inputRange=new JiuQiWebTableInputRange(this);
  this.createTableDesignFrom=jiuqiWebTableViewMainTableCreateTableDesignFrom;
  this.createOverTableDesignFrom=jiuqiWebTableViewMainTableCreateOverTableDesignFrom;
  this.getNextChar=jiuqiWebTableViewGetNextChar;
  this.createLockTableHead=jiuqiWebTableViewCreateLockTableHead;
  this.lockTableHead=jiuqiWebTableViewLockTableHead;
  this.onWorkPanelScroll=null;
  this.oldScrollX=0;
  this.oldScrollY=0;
  this.mergeTD=jiuqiWebTableViewMergeTD;
  this.lastMoveTD=null;
  this.eventCount=0;
  this.mainTableBlur=jiuqiWebTableViewBlur;
  this.firstLockAdjust=jiuqiWebTableViewFirstLockAdjust
  this.mainTableTrOnclick=null;
  this.cellCanEdit=null;
  this.cellCanWrite=null;
  this.isReadOnly=false;
  this.onTdDoubleClick=null;
  this.onTdSingleClick=null;
  this.changeTransparence=jiuqiWebTableViewMainTableChangeTransparence;
  this.setColAutoFit=jiuqiWebTableViewMainTableSetColAutoFit;
  this.setSelectedColAutoFit=jiuqiWebTableViewMainTableSetSelectedColAutoFit;
  this.setColFontAutoFit=jiuqiWebTableViewMainTableSetColFontAutoFit;
  this.setRowCount=jiuqiWebTableViewMainTableSetRowCount;
  this.setColCount=jiuqiWebTableViewMainTableSetColCount;
  this.colAndRowCountIni=jiuqiWebTableViewMainTableColAndRowCountIni;
  this.setXYBrace=jiuqiWebTableViewMainTableSetXYBrace;
}
function jiuqiWebTableViewMainTableOnMouseOut(){
  var ctd=event.srcElement;
  if(ctd.tagName=="TD"){
    if(this.onTdMouseOut!=null) this.onTdMouseOut(ctd);
  }
}
function jiuqiWebTableViewMainTableOnMouseOver(){
  var ctd=event.srcElement;
  if(ctd.tagName=="TD"){
    if(this.onTdMouseOver!=null) this.onTdMouseOver(ctd);
  }
}
function jiuqiWebTableViewMainTableSetXYBrace(){
  this.parentObj.xBrace.style.width=(parseInt(this.mainTable.offsetWidth) + 20) + "px";
  this.parentObj.yBrace.style.height=(parseInt(this.mainTable.offsetHeight) + 20) + "px";
}
function jiuqiWebTableViewMainTableColAndRowCountIni(){
  this.mainTableWidth=this.mainTable.rows[0].cells.length;
  this.mainTableHeight=this.mainTable.rows.length;
}
function jiuqiWebTableViewMainTableSetRowCount(n){
  if(isNaN(n)) return;
  if(n<=0) return;
  if(this.mainTable.rows.length<parseInt(n)+1){
    this.workControlObj.insertRow(this.mainTable.rows.length,n-this.mainTable.rows.length+1);
  }
  if(this.mainTable.rows.length>parseInt(n)+1){
    this.workControlObj.hiddeAll();
    this.workControlObj.parentObj.inputRange.outFromTd();
    this.workControlObj.delRows(1,1,parseInt(n)+1,this.mainTable.rows.length-1);
  }
  this.mainTableHeight=parseInt(n)+1;
}
function jiuqiWebTableViewMainTableSetColCount(n){
  if(isNaN(n)) return;
  if(n<=0) return;
  if(this.mainTable.rows[0].cells.length<parseInt(n)+1){
    this.workControlObj.insertCol(this.mainTable.rows[0].cells.length,n-this.mainTable.rows[0].cells.length+1);
  }
  if(this.mainTable.rows[0].cells.length>parseInt(n)+1){
    this.workControlObj.hiddeAll();
    this.workControlObj.parentObj.inputRange.outFromTd();
    this.workControlObj.delCols(parseInt(n)+1,this.mainTable.rows[0].cells.length-1);
  }
  this.mainTableWidth=parseInt(n)+1;
}
function jiuqiWebTableViewMainTableSetColFontAutoFit(n){
  for(var i=1;i<this.mainTable.rows.length;i++){
    var ccell=this.workControlObj.getCellByLxy(n,i,1);
    if(ccell.fft=="1")
    this.inputRange.fontFitAuto(ccell,this.inputRange.inputText);
  }
}
function jiuqiWebTableViewMainTableSetSelectedColAutoFit(){
  var ccells=this.mainTable.rows[0].cells;
  for(var i=0;i<=this.workControlObj.currentSelectIndex;i++){
    for(var m=this.workControlObj.selecteddiv[i].lx1;m<=this.workControlObj.selecteddiv[i].lx2;m++){
	ccells[m].colAutoFitTextSign=true;
    }
  }
  this.workControlObj.hiddeAll();
  this.inputRange.outFromTd();
  for(var i=ccells.length-1;i>0;i--){
    if(ccells[i].colAutoFitTextSign){
      this.setColAutoFit(i);
      ccells[i].colAutoFitTextSign=false;
    }
  }

}
function jiuqiWebTableViewMainTableSetColAutoFit(n){
  if(n>=this.mainTable.rows[0].cells.length || n==0) return 0;
  var nochange=true;
  var maxWidth=1;
  var crows=this.mainTable.rows;
  for(var i=1;i<crows.length;i++){
    var ccell=this.workControlObj.getCellByLxy(n,i,0);
    if(ccell==null) continue;
    if(ccell.colSpan>1) continue;
    var cwidth=this.inputRange.getTdFitWidth(ccell,this.inputRange.inputText);
    if(cwidth>-1) nochange=false;
    if(cwidth>maxWidth) maxWidth=cwidth;
  }
  if(nochange) return 0;
  var returnInt=maxWidth - parseInt(crows[0].cells[n].width) + 6;
  var newWidth=maxWidth + 6;
    var rowheadt=this.rowHeadTable;
    var colheadt=this.colHeadTable;
    var twoheadt=this.twoHeadTable;
    var tables=[this.mainTable,rowheadt,colheadt,twoheadt];
    var addWidth=returnInt;
    for(var i=0;i<tables.length;i++){
      this.workControlObj.setColWidthByTable(tables[i],n,newWidth,addWidth);
    }
  return returnInt;
}
function jiuqiWebTableViewMainTableChangeTransparence(n){
  if(isNaN(n)) {
    alert("透明度参数必须是整数类型");
  }
  var tmd=parseInt(n);
  if(tmd>100) tmd=100;
  if(tmd<0) tmd=0;
  this.mainTable.runtimeStyle.filter="alpha(opacity=" + tmd + ")";
}
function jiuqiWebTableViewFirstLockAdjust(){
  if(this.mainTable.rows[0].style.display!="none") return;
  var rowheadt=this.rowHeadTable;
  var colheadt=this.colHeadTable;
  var twoheadt=this.twoHeadTable;
  if(window.everyColWidth!=null){
    rowheadt.width=parseInt(rowheadt.width)-parseInt(this.mainTable.rows[0].cells[0].width)+6;
    twoheadt.width=parseInt(twoheadt.width)-parseInt(this.mainTable.rows[0].cells[0].width)+6;
  }
  if(window.everyRowHeight!=null){
    var cheight=parseInt(colheadt.height)-parseInt(this.mainTable.rows[0].cells[0].height);
    colheadt.height=parseInt(colheadt.height)-parseInt(this.mainTable.rows[0].cells[0].height)+1;
    twoheadt.height=parseInt(twoheadt.height)-parseInt(this.mainTable.rows[0].cells[0].height)+1;
  }
  if(!this.parentObj.isDesignMode){
    if(this.parentObj.lockRowHead==0){
      colheadt.style.display="none";
      twoheadt.style.display="none";
    }
    if(this.parentObj.lockColHead==0){
      rowheadt.style.display="none";
      twoheadt.style.display="none";
    }
    if(this.parentObj.lockRowHead==0 && this.parentObj.lockColHead==0){
      twoheadt.style.display="none";
      colheadt.style.display="none";
      rowheadt.style.display="none";
    }
  }
}
function jiuqiWebTableViewMainTableResizeBrace(){
  var addValue0=60;
  var xb=this.parentObj.xBrace;
  var yb=this.parentObj.yBrace;
  if(parseInt(xb.style.width)<parseInt(this.mainTable.width)){
    xb.style.width=parseInt(this.mainTable.width) + addValue0;
  }
  if(parseInt(yb.style.height)<parseInt(this.mainTable.height)){
    yb.style.height=parseInt(this.mainTable.height) + addValue0;
  }
  if(parseInt(xb.style.width)>parseInt(this.mainTable.width)+addValue0){
    xb.style.width=parseInt(this.mainTable.width) + addValue0;
  }
  if(parseInt(yb.style.height)>parseInt(this.mainTable.height)+addValue0){
    yb.style.height=parseInt(this.mainTable.height) + addValue0;
  }
}
function jiuqiWebTableViewMainTableOnDoubleClick(){
  var ctd=event.srcElement;
  if(ctd.tagName!="TD") return;
  if(this.onTdDoubleClick!=null) {
    this.onTdDoubleClick(ctd);
  }
}
function jiuqiWebTableViewMainTableOnTableClick(ctd){
  //var ctd=event.srcElement;
  if(ctd.tagName!="TD" ) return;
  var ctr=ctd.parentElement;
  //if(this.parentObj.isDesignMode){
    this.parentObj.setCurrentCellState(ctd);//设置当前单元格的显示属性
  //}
  if(this.mainTableTrOnclick!=null){
    this.mainTableTrOnclick(ctr);
  }
}
function jiuqiWebTableViewBlur(){
  var workPanel=window.jiuqiWebTableViewObj.workPanel;
  var jqTable=window.jiuqiWebTableViewObj.mainTableHome.mainTable;
  var jqTableHome=window.jiuqiWebTableViewObj.mainTableHome;
  var eventTable=null;
  if(jqTable.contains(event.srcElement)) return;
  try{
    eventTable=event.srcElement.parentElement.parentElement.parentElement;
  }catch(e){}
  if((event.srcElement==jqTableHome.inputRange.inputText) ||  (event.srcElement.parentElement.parentElement==workPanel)  || (event.srcElement.cmdImg) ||  (eventTable==jqTable)) {
    return;
  }else{
    if(event.srcElement==workPanel){
      if((event.offsetY<parseInt(jqTable.offsetHeight)+parseInt(jqTable.style.top))&&(event.offsetY>parseInt(jqTable.style.top))&&(event.offsetX<parseInt(jqTable.offsetWidth)+parseInt(jqTable.style.left))&&(event.offsetX>parseInt(jqTable.style.left))) {
        return;
      }else{
        if(jqTableHome.boolMouseisdown==1) {
          jqTableHome.boolMouseisdown=0;
          return;
        }
      }
    }else{
      try{
      if(jqTableHome.inputRange.inputText.stillShow) return;
      if(event.srcElement.className=="dicttree") return;
      if(window.calendar.contains(event.srcElement)) return;
      if(jqTableHome.inputRange.dictObj!=null){
        if(jqTableHome.inputRange.dictObj.contains(event.srcElement)) {
          var cimgObj=event.srcElement;
          if(cimgObj.tagName=="IMG"){
            if(cimgObj.downloaded!=null && cimgObj.nodeid!=null && cimgObj.expanded!=null){
              window.setTimeout("rightposition(window.jiuqiWebTableViewObj.mainTableHome.inputRange.cTD,window.jiuqiWebTableViewObj.mainTableHome.inputRange.dictObj)",300);
            }
          }
          return;
        }
      }
        if(event.srcElement.parentElement.parentElement.parentElement ==workPanel || event.srcElement.parentElement.parentElement.parentElement.parentElement==workPanel) {
          return;
        }
      }catch(e){}
    }
  }
  var inputText=jqTableHome.inputRange.inputText;
  if(inputText.style.display!="none"){
    jqTableHome.inputRange.outFromTd()
    inputText.style.display="none";
  }
  jqTableHome.workControlObj.hiddeAll();
  jqTableHome.boolMouseisdown=0;
  if(jqTableHome.parentObj.isDesignMode){
    jqTableHome.parentObj.setCurrentCellState(null);//设置当前单元格的显示属性
  }
}
function jiuqiWebTableViewMergeTD(td1,td2){
  if(td1==null || td2==null) return false;
  td2.lx=td1.lx;
  td2.className=td1.className;
  td2.id=td1.id;
  var cwidth=td1.parentElement.parentElement.rows[0].cells[td2.lx].width;
  if(cwidth=="") {
    cwidth="1";
    td1.parentElement.parentElement.rows[0].cells[td2.lx].width="1";
  }
  td2.width=parseInt(cwidth);
  try{
    var cheight=td1.parentElement.cells[0].height;
    if(cheight==""){
      cheight="1";
      //td1.parentElement.cells[0].height="1";//把自动适应行隐藏掉了 干掉！
    }
    td2.height=parseInt(cheight);
  }catch(e){}
  if(td1.parentElement.display=="none")
  td2.style.display="none";
  td2.colSpan=td1.colSpan;
  td2.rowSpan=td1.rowSpan;
  td2.style.display=td1.style.display;
  if(td1.tagName=="TH") td2.style.fontWeight="bold";
  td2.style.borderTopColor=td1.currentStyle.borderTopColor;
  td2.style.borderLeftColor=td1.currentStyle.borderLeftColor;
  td2.style.borderRightColor=td1.currentStyle.borderRightColor;
  td2.style.borderBottomColor=td1.currentStyle.borderBottomColor;
  td2.style.borderTopStyle=td1.currentStyle.borderTopStyle;
  td2.style.borderLeftStyle=td1.currentStyle.borderLeftStyle;
  td2.style.borderRightStyle=td1.currentStyle.borderRightStyle;
  td2.style.borderBottomStyle=td1.currentStyle.borderBottomStyle;
  td2.style.borderTopWidth=td1.currentStyle.borderTopWidth;
  td2.style.borderLeftWidth=td1.currentStyle.borderLeftWidth;
  td2.style.borderRightWidth=td1.currentStyle.borderRightWidth;
  td2.style.borderBottomWidth=td1.currentStyle.borderBottomWidth;
  td2.style.fontWeight=td1.currentStyle.fontWeight;
  td2.style.textAlign=td1.currentStyle.textAlign;
  td2.style.verticalAlign=td1.currentStyle.verticalAlign;
  td2.style.fontSize=td1.currentStyle.fontSize;
  td2.style.fontStyle=td1.currentStyle.fontStyle;
  td2.style.fontFamily=td1.currentStyle.fontFamily;
  td2.style.textDecoration=td1.currentStyle.textDecoration;
  td2.style.backgroundColor=td1.currentStyle.backgroundColor;
  td2.noWrap=td1.noWrap;
  td2.style.wordWrap=td1.currentStyle.wordWrap;
  td2.style.wordBreak=td1.currentStyle.wordBreak;
  if("medium"==td2.style.borderLeftWidth ) td2.style.borderLeftWidth="1px";
  if("medium"==td2.style.borderTopWidth ) td2.style.borderTopWidth="1px";
  if("medium"==td2.style.borderRightWidth ) td2.style.borderRightWidth="0px";
  if("medium"==td2.style.borderBottomWidth ) td2.style.borderBottomWidth="0px";
  if(window.onCopyCellToCell!=null){
    onCopyCellToCell(td1,td2);
  }
  td2.innerHTML=td1.innerHTML;
}

function jiuqiWebTableViewCreateLockTableHead(){
  //if(!this.parentObj.isDesignMode){
    //alert("本操作只能在设计模式下执行！");
    //return;
  //}
  var ctable=this.mainTable;
  var rowheadt=this.rowHeadTable;
  var colheadt=this.colHeadTable;
  var twoheadt=this.twoHeadTable;
  var rowheadtWidth=0,rowheadtHeight=0,colheadtWidth=0,colheadtHeight=0,twoheadtWidth=0,twoheadtHeight=0;
  var tempt=rowheadt;
  for(var j=0;j<3;j++){
    if(j==1) tempt=colheadt;
    if(j==2) tempt=twoheadt;
    for(var i=tempt.rows.length-1;i>=0;i--){
      tempt.deleteRow(i);
    }
  }
  /***************************************************************************/
  var tempCol = this.parentObj.lockColHead-1;
  var tempRow = this.parentObj.lockRowHead-1;
  if(tempCol < 0) tempCol = 0;
  if(tempRow < 0) tempRow = 0;
  this.parentObj.lockColHead = tempCol;
  this.parentObj.lockRowHead = tempRow;
  /***************************************************************************/
  var rowheadmax=this.parentObj.lockColHead;

  for(var i=0;i<ctable.rows.length;i++){
    var mainrow=ctable.rows[i];
    if(i<=this.parentObj.lockRowHead){
      var newrow=colheadt.insertRow();
      for(var j=0;j<mainrow.cells.length;j++){
        var maincell=this.workControlObj.getCellByLxy(parseInt(mainrow.cells[j].lx),i,0);
        if(maincell!=null){
          var newcell=newrow.insertCell();
          this.mergeTD(maincell,newcell);
          //if(maincell.rowSpan+i-1>this.parentObj.lockRowHead) this.parentObj.lockRowHead=maincell.rowSpan+i-1;
          if(maincell.rowSpan+i-1>this.parentObj.lockRowHead) this.parentObj.lockRowHead=maincell.rowSpan+i-1;
          if(i==0) colheadtWidth+=parseInt(maincell.width);
          if(j==0) {
            var heightStr=maincell.height;
            if(heightStr=="" ) heightStr=maincell.clientHeight;
            colheadtHeight+=parseInt(heightStr);
          }
        }
      }
      newrow.style.display=mainrow.style.display;
    }
    var newrow=rowheadt.insertRow();
    for(var j=0;j<mainrow.cells.length;j++){
      if(parseInt(mainrow.cells[j].lx)<=this.parentObj.lockColHead){
          var maincell=this.workControlObj.getCellByLxy(parseInt(mainrow.cells[j].lx),i,0);
          if(maincell!=null){
            var newcell=newrow.insertCell();
            this.mergeTD(maincell,newcell);
            if(maincell.colSpan+parseInt(mainrow.cells[j].lx)-1>rowheadmax) rowheadmax=maincell.colSpan+parseInt(mainrow.cells[j].lx)-1;
            if(i==0){
              try{
                var widthStr=maincell.width;
                if(maincell.width=="") widthStr=maincell.clientWidth;
                var widthInt=parseInt(widthStr);
                if(!isNaN(widthInt)){
                  rowheadtWidth+=widthInt;
                }
              }catch(e){rowheadtWidth+=parseInt(maincell.clientWidth);}
            }
            if(j==0) rowheadtHeight+=parseInt(maincell.height);
          }
      }else{
        break;
      }
    }
    newrow.style.display=mainrow.style.display;
    if(i<=this.parentObj.lockRowHead){
      var newrow=twoheadt.insertRow();
      for(var j=0;j<mainrow.cells.length;j++){
        if(parseInt(mainrow.cells[j].lx)<=this.parentObj.lockColHead){
          var maincell=this.workControlObj.getCellByLxy(parseInt(mainrow.cells[j].lx),i,0);
          if(maincell!=null){
            var newcell=newrow.insertCell();
            this.mergeTD(maincell,newcell);
            //if(j==0) newcell.width=parseInt(newcell.width)-0;
            //if(j==1) newcell.width=parseInt(newcell.width)-0;
            if(i==0){
              try{
                var widthStr=maincell.width;
                if(maincell.width=="") widthStr=maincell.clientWidth;
                var widthInt=parseInt(widthStr);
                if(!isNaN(widthInt)){
                twoheadtWidth+=widthInt;
                }
              }catch(e){twoheadtWidth+=parseInt(maincell.clientWidth);}
            }
            if(j==0) {
              var heightStr=maincell.height;
              if(heightStr=="")  heightStr=maincell.clientHeight;
              twoheadtHeight+=parseInt(heightStr);
            }
          }
        }else{
          break;
        }
      }
      newrow.style.display=mainrow.style.display;
    }
  }
  if(rowheadmax>this.parentObj.lockColHead){
    this.parentObj.lockColHead=rowheadmax;
    for(var i=0;i<ctable.rows.length;i++){
      var mainrow=ctable.rows[i];
      var newrow=rowheadt.rows[i];
      for(var j=0;j<mainrow.cells.length;j++){
        if(parseInt(mainrow.cells[j].lx)+mainrow.cells[j].colSpan-1<=this.parentObj.lockColHead){
            var maincell=this.workControlObj.getCellByLxy(parseInt(mainrow.cells[j].lx),i,0);
            if(maincell!=null && maincell.cellIndex>=newrow.cells.length){
              var newcell=newrow.insertCell();
              this.mergeTD(maincell,newcell);
              if(i==0){
                try{
                  var widthStr=maincell.width;
                  if(maincell.width=="") widthStr=maincell.clientWidth;
                  var widthInt=parseInt(widthStr);
                  if(!isNaN(widthInt)){
                    rowheadtWidth+=widthInt;
                  }
                }catch(e){rowheadtWidth+=parseInt(maincell.clientWidth);}
              }
            }
        }else{
          break;
        }
      }
      if(i<=this.parentObj.lockRowHead){
        var newrow=twoheadt.rows[i];
        for(var j=0;j<mainrow.cells.length;j++){
          if(parseInt(mainrow.cells[j].lx)+mainrow.cells[j].colSpan-1<=this.parentObj.lockColHead){
            var maincell=this.workControlObj.getCellByLxy(parseInt(mainrow.cells[j].lx),i,0);
            if(maincell!=null && maincell.cellIndex>=newrow.cells.length){
              var newcell=newrow.insertCell();
              this.mergeTD(maincell,newcell);
              if(i==0){
                try{
                  var widthStr=maincell.width;
                  if(maincell.width=="") widthStr=maincell.clientWidth;
                  var widthInt=parseInt(widthStr);
                  if(!isNaN(widthInt)){
                    twoheadtWidth+=widthInt;
                  }
                }catch(e){twoheadtWidth+=parseInt(maincell.clientWidth);}
              }
            }
          }else{
            break;
          }
        }
      }
    }
  }
  tempt=rowheadt;
  for(var j=0;j<3;j++){
    tempt.style.display="";
    if(j==1) tempt=colheadt;
    if(j==2) tempt=twoheadt;
    if(tempt.parentElement!=this.parentObj.workPanel){
      this.parentObj.workPanel.appendChild(tempt);
    }
  }
  //rowheadt.height=ctable.clientHeight;
  //colheadt.width=ctable.offsetWidth;
  var widthAdd=0;
  rowheadt.height=ctable.offsetHeight;
  rowheadt.width=rowheadtWidth + widthAdd;
  colheadt.height=colheadtHeight;
  colheadt.width=ctable.offsetWidth;
  twoheadt.height=twoheadtHeight;
  twoheadt.width=twoheadtWidth + widthAdd;
  //ctable.width=colheadtWidth;
  //ctable.height=rowheadtHeight;

  rowheadt.style.backgroundColor="white";
  colheadt.style.backgroundColor="white";
  twoheadt.style.backgroundColor="white";
  twoheadt.style.zIndex=913;
  rowheadt.style.zIndex=911;
  colheadt.style.zIndex=912;
  this.firstLockAdjust()
  this.lockTableHead();
}

function jiuqiWebTableViewLockTableHead(cdiv){
 // if(typeof(cdiv)!="undefined") this=cdiv.currentJiuQiWebTableViewObj.mainTableHome;
  var ctable=this.mainTable;
  var rowheadt=this.rowHeadTable;
  var colheadt=this.colHeadTable;
  var twoheadt=this.twoHeadTable;
  var workpanel=null;
  try{
    workpanel=this.parentObj.workPanel;
  }catch(e){
    var cdiv=event.srcElement;
    if(cdiv==null) return;
    workpanel=cdiv;
    ctable=cdiv.currentJiuQiWebTableViewObj.mainTableHome.mainTable;
    rowheadt=cdiv.currentJiuQiWebTableViewObj.mainTableHome.rowHeadTable;
    colheadt=cdiv.currentJiuQiWebTableViewObj.mainTableHome.colHeadTable;
    twoheadt=cdiv.currentJiuQiWebTableViewObj.mainTableHome.twoHeadTable;
  }
  var tctop=parseInt(ctable.style.top);
  var tcleft=parseInt(ctable.style.left) ;
  if(isNaN(tctop)) tctop=0;
  if(isNaN(tcleft)) tcleft=0;
  var ctop= workpanel.scrollTop;
  var cleft= workpanel.scrollLeft;
  rowheadt.style.top=tctop;
  rowheadt.style.left=cleft;
  colheadt.style.top=ctop;
  colheadt.style.left=tcleft;
  twoheadt.style.top=ctop;
  twoheadt.style.left=cleft;
  if(workpanel.scrollLeft<=tcleft && workpanel.scrollTop<=tctop) {
    twoheadt.style.display="none";
    rowheadt.style.display="none";
    colheadt.style.display="none";
    return;
  }
  if(workpanel.scrollLeft<=tcleft) {
    rowheadt.style.display="none";
    twoheadt.style.left=tcleft-cleft;
  }else{
    rowheadt.style.display="";
    twoheadt.style.display="";
  }
  if(workpanel.scrollTop<=tctop) {
    colheadt.style.display="none";
    twoheadt.style.top=tctop-ctop;
  }else{
    colheadt.style.display="";
    twoheadt.style.display="";
  }

  if(!workpanel.currentJiuQiWebTableViewObj.isDesignMode){//如果是非设计模式的话
    if(workpanel.currentJiuQiWebTableViewObj.lockRowHead==0){
      colheadt.style.display="none";
      twoheadt.style.display="none";
    }
    if(workpanel.currentJiuQiWebTableViewObj.lockColHead==0){
      rowheadt.style.display="none";
      twoheadt.style.display="none";
    }
    if(workpanel.currentJiuQiWebTableViewObj.lockRowHead==0 && workpanel.currentJiuQiWebTableViewObj.lockColHead==0){
      twoheadt.style.display="none";
    }
  }
  if(this.onWorkPanelScroll!=null) this.onWorkPanelScroll(cdiv);
}
function jiuqiWebTableViewMainTableOnMouseDown(td){
  window.clearTimeout(window.jiuqiSetTimeOutForSerchZB);
  if(this.boolMouseisdown==1){
    this.onMouseUp();
    return false;
  }
  var currentTD=null;
  if(typeof(td)=="undefined"){
    currentTD=event.srcElement;
    if(currentTD.parentElement.tagName=="FONT"){
      currentTD=currentTD.parentElement;
    }
    if(currentTD.parentElement.tagName=="TD"){
      currentTD=currentTD.parentElement;
    }
  }else{
    currentTD=td;
  }
  if(!(currentTD.tagName=="TD" || currentTD.tagName=="TH")) return;
  window.jiuqiWebTableViewObj=this.parentObj;
  if(currentTD.style.cursor=="w-resize" || currentTD.style.cursor=="s-resize"){
    return false;
  }
  if(this.inputRange.onTdMouseDown!=null){
    var returnV=this.inputRange.onTdMouseDown(currentTD);
    if(false==returnV) return;
  }
  this.onTableClick(currentTD);
  try{
    if (event.button ==2)	return false;
  }catch(e){}
  var cinputobj=null;
  //if(currentTD.tagName=="INPUT") {cinputobj=currentTD;currentTD=currentTD.mainTableHomeObj.inputRange.cTD;}
  if(!(currentTD.tagName=="TD" || currentTD.tagName=="TH")) return false;
  if(currentTD.parentElement.parentElement.parentElement!=this.mainTable){
    currentTD=this.mainTable.rows[currentTD.parentElement.rowIndex].cells[currentTD.cellIndex];

  }
  var returnvalue=this.onClick(currentTD);
  if(returnvalue==1 && currentTD.cellIndex!=0 && currentTD.parentElement.rowIndex!=0) {
    return false;
  }
  var cmydiv=null;
  try{
    if(event.shiftKey ) {
      this.boolMouseisdown=1;
      this.onMouseUp();
      window.setTimeout('window.jiuqiWebTableViewObj.mainTableHome.inputRange.setActive()',10);
      return true;
    }
  }catch(e){}
  try{
    if(!event.ctrlKey ){
      this.workControlObj.hiddeAll();
      this.workControlObj.currentSelectIndex=-1;
    }
  }catch(e){
    this.workControlObj.hiddeAll();
    this.workControlObj.currentSelectIndex=-1;
  }
  cmydiv=this.workControlObj.getNextDiv();
  cmydiv.style.display="";
  cmydiv.bcell=currentTD;
  cmydiv.ecell=currentTD;
  cmydiv.lx1=null;cmydiv.lx2=null;cmydiv.ly1=null;cmydiv.ly2=null;
  this.workControlObj.doSelected();
  this.boolMouseisdown=1;
  return returnvalue;
}
function jiuqiWebTableViewMainTableOnMouseMove(){
  var currentTD=event.srcElement;
  var cinputobj=null;
  var isControlTD=false;
  try{
    if (event.button ==2)	return false;
  }catch(e){}
  if(currentTD==this.inputRange.inputText) {cinputobj=currentTD;currentTD=currentTD.mainTableHomeObj.inputRange.cTD;}
  if(!(currentTD.tagName=="TD" || currentTD.tagName=="TH")) return;
  if((currentTD.cellIndex==0 || currentTD.parentElement.rowIndex==0)&&(event.button!=1)) {
    var tdLeft=getObjLeftToWin(currentTD);
    var tdTop=getObjTopToWin(currentTD);
    //var eventclientX=this.parentObj.workPanel.scrollLeft+event.clientX +  window.document.body.scrollLeft;
    //var eventclientY=this.parentObj.workPanel.scrollTop+event.clientY + window.document.body.scrollTop;
    var eventclientX=event.clientX + getAllParentScrollLeft(this.parentObj.workPanel);
    var eventclientY=event.clientY + getAllParentScrollTop(this.parentObj.workPanel);
    if(((eventclientX-tdLeft<2) && (eventclientX-tdLeft>0)  &&currentTD.cellIndex>1 && currentTD.parentElement.rowIndex==0) || ((tdLeft+currentTD.clientWidth- eventclientX)<=2 && (tdLeft+currentTD.clientWidth- eventclientX)>0  && currentTD.parentElement.rowIndex==0 && currentTD.cellIndex>0)){
      //this.parentObj.cellBoundary.style.display="";
      this.parentObj.cellBoundary.style.cursor="w-resize";
      var resizeTd=currentTD;
      if(eventclientX-tdLeft<2){
        resizeTd=resizeTd.previousSibling;
      }
      this.parentObj.cellBoundary.resizeTd=resizeTd;
      moveBoundary(this.parentObj.cellBoundary);
    }else{
      if(((eventclientY-tdTop)<2 && (eventclientY-tdTop>=0) && currentTD.parentElement.rowIndex>1 && currentTD.cellIndex==0) || ((tdTop+currentTD.clientHeight- eventclientY)<2 && (tdTop+currentTD.clientHeight- eventclientY)>=0 ) && currentTD.cellIndex==0 && currentTD.parentElement.rowIndex>0){
        this.parentObj.cellBoundary.style.display="";
        this.parentObj.cellBoundary.style.cursor="s-resize";
        var resizeTd=currentTD;
        if(eventclientY-tdTop<2){
          resizeTd=this.mainTable.rows[resizeTd.parentElement.rowIndex-1].cells[0];
        }
        this.parentObj.cellBoundary.resizeTd=resizeTd;
        moveBoundary(this.parentObj.cellBoundary);
      }else{
        if(this.parentObj.cellBoundary.mouseisdown){
          moveBoundary(this.parentObj.cellBoundary);
        }else{
          currentTD.style.cursor="auto";
          this.parentObj.cellBoundary.style.display="none";
        }
      }
    }
    return;
  }else{
    if((event.button==1) && this.parentObj.cellBoundary.mouseisdown) {
      moveBoundary(this.parentObj.cellBoundary);
      //this.parentObj.cellBoundary.mouseisdown=false;
      //this.parentObj.cellBoundary.style.display="none";
    }else{
      this.parentObj.cellBoundary.mouseisdown=false;
      this.parentObj.cellBoundary.style.display="none";
    }
  }
  if(currentTD==this.lastMoveTD) return;
  this.lastMoveTD=currentTD;
  if(this.eventCount>1) return;
  this.eventCount+=1;
  if(currentTD.parentElement.parentElement.parentElement!=this.mainTable){
    currentTD=this.mainTable.rows[currentTD.parentElement.rowIndex].cells[currentTD.cellIndex];

  }
  var cmydiv=this.workControlObj.selecteddiv[this.workControlObj.currentSelectIndex];
  if(this.boolMouseisdown==1){
    if(typeof(currentTD) == "undefined") return;
    if(parseInt(currentTD.lx)<=this.parentObj.lockColHead){
      this.parentObj.workPanel.scrollLeft=0;
    }
    if(currentTD.parentElement.rowIndex<=this.parentObj.lockRowHead){
      this.parentObj.workPanel.scrollTop=0;
    }
    var myx=parseInt(cmydiv.style.left)+parseInt(cmydiv.offsetWidth);
    var myy=parseInt(cmydiv.style.top)+parseInt(cmydiv.offsetHeight);
    scrollWorkPanle(myx,myy,this.parentObj.workPanel,null);
    cmydiv.ecell=currentTD;
    try{
      document.selection.empty();
    }catch(e){}
    this.workControlObj.doSelected();
  }
  this.eventCount-=1;
}
function jiuqiWebTableViewMainTableOnMouseUp(td){
  var currentTD=null;
  if(typeof(td)=="undefined"){
    currentTD=event.srcElement;
  }else{
    currentTD=td;
  }
    if(currentTD.parentElement.tagName=="TD"){
      currentTD=currentTD.parentElement;
    }

 // var currentTD=event.srcElement;
  try{
    if (event.button ==2)	return false;
  }catch(e){}
  var cinputobj=null;
  var isInputObjSing=false;
  if(currentTD==this.inputRange.inputText) {cinputobj=currentTD;currentTD=currentTD.mainTableHomeObj.inputRange.cTD;isInputObjSing=true;}
  if(!(currentTD.tagName=="TD" || currentTD.tagName=="TH")) return;
  if(currentTD.parentElement.parentElement.parentElement!=this.mainTable){
    currentTD=this.mainTable.rows[currentTD.parentElement.rowIndex].cells[currentTD.cellIndex];
  }

  var cmydiv=this.workControlObj.selecteddiv[this.workControlObj.currentSelectIndex];
  if(this.boolMouseisdown==1){
    cmydiv.ecell=currentTD;
    var topdiv=this.parentObj.parentObj.uniqueID;
    //window.setTimeout(topdiv + ".JiuQiWebTableViewObj.mainTableHome.workControlObj.doSetHeadStateQueue.length=0;",this.workControlObj.setTimeOutValue);
    this.workControlObj.doSelected();
    this.boolMouseisdown=0;
    this.inputRange.setActive();
  }
  //if(!isInputObjSing)
  //this.inputRange.setActive(false);
  if(this.onTdSingleClick!=null){
    this.onTdSingleClick(currentTD);
  }
}
function jiuqiWebTableViewMainTableINI(width,height){                                             //成员对象this.workPanel.maintable.mainTableINI(width,height)设置表的宽和高，并且显示表，用于没有参数时新建立表时用
  if(!(isNaN(width) || isNaN(height))){
  this.mainTableWidth=width;
  this.mainTableHeight=height;
  }
  this.mainTablePaintNew();
}
function jiuqiWebTableViewMainTableOnClick(ctd){
  var retrunsign=true;
  var currentTD=ctd;
  if(typeof(ctd) == "undefined")  return;
  if(currentTD.cellIndex==0  || currentTD.parentElement.rowIndex==0) return true;
	if(this.inputRange.inputText.style.display==""){
	  retrunsign=this.inputRange.outFromTd();
	  //retrunsign=true;
	  if(!retrunsign) {
	    this.inputRange.setActive();
	    return 1;
	  }
	}
        retrunsign=this.inputRange.gotoTD(ctd);
        if(!retrunsign) {
           this.inputRange.setActive();
           return 2;
	}
  return 0;
}
function jiuqiWebTableViewMainTableCreateTableDesignFrom(modetable){
  modetable.className=this.mainTable.className;
  modetable.style.position=this.mainTable.style.position;
  modetable.style.tableLayout=this.mainTable.style.tableLayout;
  modetable.style.left=this.mainTable.style.left;
  modetable.style.top=this.mainTable.style.top;
  modetable.style.right=this.mainTable.style.right;
  modetable.style.bottom=this.mainTable.style.bottom;
  modetable.style.zIndex=this.mainTable.style.zIndex;
  modetable.style.filter=this.mainTable.style.filter;
  modetable.style.backgroundColor=this.mainTable.style.backgroundColor;
  modetable.border=this.mainTable.border;
  modetable.cellPadding=this.mainTable.cellPadding;
  modetable.cellSpacing=this.mainTable.cellSpacing;
  modetable.onselectstart="return false";
  modetable.onmousemove=this.mainTable.onmousemove;
  modetable.onmousedown=this.mainTable.onmousedown;
  modetable.onmouseup=this.mainTable.onmouseup;
  modetable.ondblclick=this.mainTable.ondblclick;
  //modetable.onclick=this.mainTable.onclick;
  //var colHeadcellWidth=modetable.width/this.mainTableWidth;
  this.mainTable=modetable;
  modetable.parentElement.removeChild(modetable);
  this.parentObj.workPanel.appendChild(this.mainTable);
  this.mainTableWidth=0;
  this.mainTableHeight=this.mainTable.rows.length;
  var ccells=this.mainTable.rows(0).cells;
  for(var i=0;i<ccells.length;i++){
    this.mainTableWidth+=ccells[i].colSpan;
  }
  var crow=this.mainTable.insertRow(0);
  var fisrrow=crow;
  //crow.style.display="none";
  var rowheadtitle='';
  var rowheadCold=rowheadtitle.charCodeAt(0);
  var ccell=crow.insertCell();
  ccell.innerText=" ";
  ccell.bgColor=this.headCellBGColor;
  ccell.width=this.rowHeadWidth;
  ccell.height=this.colHeadHeight;
  ccell.lx=0;
  //ccell.style.display="none";//第一个头隐藏
  //ccell.width=0;//第一个头隐藏
  for(var i=0;i<this.mainTableWidth;i++){
    ccell=crow.insertCell();
    rowheadtitle=this.getNextChar(rowheadtitle);
    ccell.innerHTML= rowheadtitle;
    ccell.bgColor=this.headCellBGColor;
    ccell.align="center";
    ccell.height=this.colHeadHeight;
    ccell.className="JiuQiWebTableViewTableColHead";
    ccell.lx=i+1;
    if(window.everyColWidth!=null){
      ccell.width=everyColWidth[i];
    }
    //ccell.style.display="none";
  }
  //crow.style.display="none";
  for(var i=1;i<=this.mainTableHeight;i++){
    crow=this.mainTable.rows[i];
    var ccell=crow.insertCell(0);
    ccell.innerHTML=(i) ;
    ccell.bgColor=this.headCellBGColor;
    ccell.align="center";
    ccell.className="JiuQiWebTableViewTableRowHead";
    ccell.width=this.rowHeadWidth;
    ccell.height=this.colHeadHeight;
    ccell.lx=0;
    if(window.everyRowHeight!=null) {
      ccell.height=everyRowHeight[i-1];
    }
    //ccell.style.display="none";
    //ccell.width=0;
  }
  //fisrrow.style.display="none";
  this.mainTableWidth+=1;
  this.mainTable.width=parseInt(this.mainTable.width) + this.rowHeadWidth;
  //this.mainTable.height=parseInt(this.mainTable.height) + this.colHeadHeight;
  this.mainTable.height=parseInt(this.mainTable.clientHeight) + this.colHeadHeight;
  this.mainTable.onselectstart=function(){return false};
  if(this.mainTable.rows.length<2) return;
  /*
  var crow=this.mainTable.rows[0];
  for(var j=0;j<crow.cells.length;j++){
    var ccell=crow.cells[j];
    var ccellmode=this.workControlObj.getCellByLxy(j,1,1);
    var modewidth=0;
    var cwidth=parseInt(ccellmode.offsetWidth)/ccellmode.colSpan;
    try{
      ccell.width=cwidth;
    }catch(e){}
  }*/
  this.resizeBrace();
}

function jiuqiWebTableViewMainTableCreateOverTableDesignFrom(modetable){
  modetable.className=this.mainTable.className;
  modetable.style.position=this.mainTable.style.position;
  modetable.style.tableLayout=this.mainTable.style.tableLayout;
  modetable.style.left=this.mainTable.style.left;
  modetable.style.top=this.mainTable.style.top;
  modetable.style.right=this.mainTable.style.right;
  modetable.style.bottom=this.mainTable.style.bottom;
  modetable.style.zIndex=this.mainTable.style.zIndex;
  modetable.style.filter=this.mainTable.style.filter;
  modetable.style.backgroundColor=this.mainTable.style.backgroundColor;
  modetable.border=this.mainTable.border;
  modetable.cellPadding=this.mainTable.cellPadding;
  modetable.cellSpacing=this.mainTable.cellSpacing;
  modetable.onselectstart="return false";
  modetable.onmousemove=this.mainTable.onmousemove;
  modetable.onmousedown=this.mainTable.onmousedown;
  modetable.onmouseup=this.mainTable.onmouseup;
  modetable.ondblclick=this.mainTable.ondblclick;
  this.mainTable=modetable;
  modetable.parentElement.removeChild(modetable);
  this.parentObj.workPanel.appendChild(this.mainTable);
  this.mainTableWidth=0;
  this.mainTableHeight=this.mainTable.rows.length;
  var ccells=this.mainTable.rows(0).cells;
  for(var i=0;i<ccells.length;i++){
    this.mainTableWidth+=ccells[i].colSpan;
  }
  var crow=this.mainTable.rows[0];
  var fisrrow=crow;
  var rowheadtitle='';
  var rowheadCold=rowheadtitle.charCodeAt(0);
  var ccell=crow.cells[0];
  this.rowHeadWidth=ccell.width;
  this.colHeadHeight=ccell.height;
  for(var i=0;i<this.mainTableWidth;i++){
    ccell=crow.cells[i];
    ccell.bgColor=this.headCellBGColor;
    ccell.align="center";
    ccell.className="JiuQiWebTableViewTableColHead";
  }
  for(var i=1;i<this.mainTableHeight;i++){
    crow=this.mainTable.rows[i];
    var ccell=crow.cells(0);
    ccell.bgColor=this.headCellBGColor;
    ccell.align="center";
    ccell.className="JiuQiWebTableViewTableRowHead";
  }
  //fisrrow.style.display="none";
  this.mainTable.onselectstart=function(){return false};
  this.resizeBrace();
}
function jiuqiWebTableViewGetNextChar(a){
  var returnstr='';
  if(a.length>0){
    var lastchar=a.substr(a.length-1,1);
    var firststr=a.substr(0,a.length-1);
    if(lastchar>='Z'){
      returnstr=this.getNextChar(firststr) + "A";
      //returnstr=jiuqiWebTableViewGetNextChar(firststr) + "A";
    }else{
      returnstr=firststr + String.fromCharCode(lastchar.charCodeAt(0)+1);
    }
   }else{
     returnstr="A";
   }
   return returnstr;
}
function jiuqiWebTableViewMainTablePaintNew(){                                                       //成员对象this.workPanel.maintable.mainTablePaint()安照表宽表高画出表样，用于没有参数时新建表用
  var crow=this.mainTable.insertRow();
  var rowheadtitle='';
  var rowheadCold=rowheadtitle.charCodeAt(0);
  var ccell=crow.insertCell();
  ccell.innerText=" ";
  ccell.bgColor=this.headCellBGColor;
  ccell.width=this.rowHeadWidth;
  ccell.height=this.colHeadHeight;
  ccell.lx=0;
  for(var i=0;i<this.mainTableWidth;i++){
    ccell=crow.insertCell();
    rowheadtitle=this.getNextChar(rowheadtitle);
    ccell.innerHTML= rowheadtitle;
    ccell.bgColor=this.headCellBGColor;
    ccell.align="center";
    ccell.width=this.defaultCellWidth;
    ccell.height=this.colHeadHeight;
    ccell.lx=i+1;
    ccell.className="JiuQiWebTableViewTableColHead";
  }
  for(var i=0;i<this.mainTableHeight;i++){
    crow=this.mainTable.insertRow();
    var ccell=crow.insertCell();
    ccell.innerHTML=(i+1) ;
    ccell.width=this.rowHeadWidth;
    ccell.height=this.defaultCellHeight;
    ccell.bgColor=this.headCellBGColor;
    ccell.align="center";
    ccell.className="JiuQiWebTableViewTableRowHead";
    ccell.lx=0;
    for(var j=0;j<this.mainTableWidth;j++){
      ccell=crow.insertCell();
      ccell.innerText=" ";
      ccell.width=this.defaultCellWidth;
      ccell.height=this.defaultCellHeight;
      ccell.className="JiuQiWebTableViewTableWorkTD";
      ccell.lx=j+1;
    }
  }
  //this.createTableMap();
  var ctWidth=0,ctHeight=0;
  for(var i=0;i<this.mainTable.rows.length;i++){
    ctHeight+=parseInt(this.mainTable.rows[i].cells[0].height);
  }
  for(var i=0;i<this.mainTable.rows[0].cells.length;i++){
    ctWidth+=parseInt(this.mainTable.rows[0].cells[i].width);
  }
  this.mainTable.width=ctWidth;
  this.mainTable.height=ctHeight;
  this.mainTableWidth+=1;
  this.mainTableHeight+=1;
  this.createLockTableHead();
  this.resizeBrace();
}
function jiuqiWebTableViewMainTableSetDesignMode(sign){
  var ctable =this.mainTable;
  var displaysign="none",cwidth=0,cheight=0;
  var twoheadWidth=0;twoheadHeight=0;
  var tableWidth=ctable.width,tableHeight=ctable.height;
  if(tableWidth=="" ){
    tableWidth=ctable.offsetWidth;
  }
  if(tableHeight==""){
    tableHeight=ctable.offsetHeight;
  }
  if(sign) {
    cwidth=this.rowHeadWidth;
    cheight=this.colHeadHeight;
    displaysign="";
  }
  var rowheadt=this.rowHeadTable;
  var colheadt=this.colHeadTable;
  var twoheadt=this.twoHeadTable;
  var tables=[ctable,rowheadt,colheadt,twoheadt];
    for(var i=1;i<=this.parentObj.lockRowHead;i++){
      if(i<ctable.rows[i].cells.length){
        twoheadHeight+=parseInt(ctable.rows[i].cells[0].height);
      }
    }
    for(var i=1;i<=this.parentObj.lockColHead;i++){
      if(i<ctable.rows[0].cells.length){
        twoheadWidth+=parseInt(ctable.rows[0].cells[i].width);
      }
    }

  //if(!sign){
    //tableWidth=parseInt(tableWidth) -parseInt(ctable.rows[0].cells[0].width);
    //tableHeight=parseInt(tableHeight) - parseInt(ctable.rows[0].cells[0].height);
  //}
  for(var m =0 ;m<tables.length;m++){
    var mytable=tables[m];
    for(var i=0;i<mytable.rows.length;i++){
      if(i==0){
        //var firstRow=mytable.rows[1];
        //if(firstRow!=null && !sign){
			//for(var t=0;t<firstRow.cells.length;t++){
			  //firstRow.cells[t].width=mytable.rows[0].cells[t].width;
			//}
        //}
          mytable.rows[i].style.display=displaysign;
      }
      //if(!sign){
        //var firstCell=mytable.rows[i].cells[1];
        //if(firstCell!=null){
          //firstCell.height=mytable.rows[i].cells[0].height;
        //}
      //}
      mytable.rows[i].cells[0].style.width=cwidth;
    }
  }
  if(!sign){
    if(tableWidth<0) tableWidth=1;
    if(tableHeight<0) tableHeight=1;
    ctable.width=tableWidth;
    if(tableHeight==0){
      ctable.height=1;
    }else{
      ctable.height=tableHeight;
    }
  }else{
    ctable.width=parseInt(ctable.rows[0].cells[0].width) + parseInt(ctable.width);
    ctable.height=parseInt(ctable.rows[0].cells[0].height) +parseInt(ctable.height) ;
    twoheadHeight=parseInt(ctable.rows[0].cells[0].height)+ parseInt(twoheadHeight);
    twoheadWidth=parseInt(ctable.rows[0].cells[0].width) + parseInt(twoheadWidth);
  }
  try{
    colheadt.width=ctable.width;
    rowheadt.height=ctable.height;
  }catch(e){}
 // if(!sign && twoheadWidth!=0 && twoheadHeight!=0){
    twoheadt.width=parseInt(twoheadWidth)+1;
    twoheadt.height=parseInt(twoheadHeight)+1;
    colheadt.height=parseInt(twoheadHeight)+1;
    rowheadt.width=parseInt(twoheadWidth)+1;
 // }
  //colheadt.width=ctable.clientWidth;
  //this.inputRange.gotoTD(this.inputRange.cTD);
  //this.workControlObj.doSelected();
  if(!sign){
    this.parentObj.designPanel.style.height="0";
    this.parentObj.workPanel.style.height="100%";
  }else{
    this.parentObj.workPanel.style.height=parseInt(this.parentObj.parentObj.offsetHeight)-parseInt(this.parentObj.designPanel.offsetHeight);
  }
}
function jiuqiWebTableViewMainTablePaint(){


}

//script name=currentworkobj
function JiuQiWebTableWorkControl(cparentObj){
  this.parentObj=cparentObj;
  this.cell1=1,this.cell2=1,this.row1=1,this.row2=1;
  this.doSelected=JiuQiWebTableWorkControlDoSelected;
  var eventstr="this.parentElement.currentJiuQiWebTableViewObj.mainTableHome.workControlObj.onDivKeyDown()"
  //this.createDivStr="<div style='z-index:-1;position:absolute;border-color:blue;background-color:#aaaaee;border-style:solid;border-width:thin;display:none;overflow:hidden' onkeydown='" + eventstr + ";' >";
  this.createDivStr="<div style='z-index:-1;position:absolute;border-color:blue;background-color:#aaaaee;border-style:solid;border-width:thin;display:none;overflow:hidden;filter:alpha(opacity=100)'>";
  this.createNewDiv=JiuQiWebTableWorkControlCreateNewDiv;
  this.currentSelectIndex=-1;
  this.selecteddiv=[];
  this.getNextDiv=JiuQiWebTableWorkControlGetNextDiv;
  this.hiddeAll=JiuQiWebTableWorkControlHiddeAll;
  this.combineCells=JiuQiWebTableWorkControlCombineCells;
  this.unCombineCells=JiuQiWebTableWorkControlUnCombineCells;
  this.getFactPoint=JiuQiWebTableWorkControlGetFactPoint;
  this.getCellByLxy= JiuQiWebTableWorkControlGetCellByLxy;
  this.setHeadState=JiuQiWebTableWorkControlSetHeadState;
  this.doSetHeadStateQueue=[];
  this.setTimeOutValue=100;
  this.getSelectedCells=JiuQiWebTableWorkControlGetSelectedCells;
  this.getCellIndexByLxy= JiuQiWebTableWorkControlGetCellIndexByLxy;
  this.getMax=JiuQiWebTableWorkControlGetMax;
  this.setAttribByName=JiuQiWebTableWorkControlSetAttribByName;
  this.setOneCellAttribByName=JiuQiWebTableWorkControlSetOneCellAttribByName;
  this.setBordSolid=JiuQiWebTableWorkControlSetBordSolid;
  this.setBordSolidByTable=JiuQiWebTableWorkControlSetBordSolidByTable;
  this.setBordAround=JiuQiWebTableWorkControlSetBordAround;
  this.setBordAroundByTable=JiuQiWebTableWorkControlSetBordAroundByTable;
  this.setBordSolidBottom=JiuQiWebTableWorkControlSetBordSolidBottom;//下单实线
  this.setBordSolidLeft=JiuQiWebTableWorkControlSetBordSolidLeft//左单实线
  this.setBordSolidRight=JiuQiWebTableWorkControlSetBordSolidRight//右单实线
  this.setBordDoubleSolidBottom=JiuQiWebTableWorkControlSetBordDoubleSolidBottom
  this.setBordBottom=JiuQiWebTableWorkControlSetBordBottom
  this.setBordSolidTopBottom=JiuQiWebTableWorkControlSetBordSolidTopBottom
  this.setBordSolidTopDoubleSolidBottom=JiuQiWebTableWorkControlSetBordSolidTopDoubleSolidBottom
  this.setBordSolidTopBoldBottom=JiuQiWebTableWorkControlSetBordSolidTopBoldBottom

  this.setBordSolidAloneByTable=JiuQiWebTableWorkControlSetBordSolidAloneByTable;//设置左、右、下的单边线
  this.delRow=JiuQiWebTableWorkControlDelRow;
  this.delRows=JiuQiWebTableWorkControlDelRows;
  this.onDelRows=null;
  this.insRow=JiuQiWebTableWorkControlInsRow;
  this.insertRow=JiuQiWebTableWorkControlInsertRow;
  this.insertRowTo=JiuQiWebTableWorkControlInsertRowTo;
  this.delCol=JiuQiWebTableWorkControlDelCol;
  this.insCol=JiuQiWebTableWorkControlInsCol;
  this.insertCol=JiuQiWebTableWorkControlInsertCol;
  this.insertColTo=JiuQiWebTableWorkControlInsertColTo;
  this.delRowByRowIndexs=JiuQiWebTableWorkControlDelRowByRowIndexs;
  this.makeRowNumber=JiuQiWebTableWorkControlMakeRowNumber;
  this.makeColNumber=JiuQiWebTableWorkControlMakeColNumber;
  this.makeCellLx=JiuQiWebTableWorkControlMakeCellLx;
//  this.makeCellLxForInsCols=JiuQiWebTableWorkControlMakeCellLxForInsCols;
  this.getCellIndexByLx=JiuQiWebTableWorkControlGetCellIndexByLx;
  this.beforDelRow=JiuQiWebTableWorkControlBeforDelRow;
  this.delCols=JiuQiWebTableWorkControlDelCols;
  this.onDelCols=null;
  this.beforDelCol=JiuQiWebTableWorkControlBeforDelCol;
  this.getHeadCellByMainCell=JiuQiWebTableWorkControlGetHeadCellByMainCell;
  this.setRowHeightByTable=JiuQiWebTableWorkControlSetRowHeightByTable;
  this.setColWidthByTable=JiuQiWebTableWorkControlSetColWidthByTable;
  this.duplicateRows=JiuQiWebTableWorkControlDuplicateRows;
  this.duplicateCols=JiuQiWebTableWorkControlDuplicateCols;
  this.attCopyRows=JiuQiWebTableWorkControlAttCopyRows;
  this.attCopyCols=JiuQiWebTableWorkControlAttCopyCols;
  this.attCopyRowToRow=JiuQiWebTableWorkControlAttCopyRowToRow;
  this.attCopyCellToCell=JiuQiWebTableWorkControlAttCopyCellToCell;
  this.onBeforDeleteRows=null;
  this.onBeforDeleteOneRow=null;
  this.onAfterDeleteOneRow=null;
  this.onCopyCellToCell=null;
  this.onDuplicateRows=null;
  this.onInsertRow=null;
  this.setTdsFontFit=JiuQiWebTableWorkControlSetTdsFontFit;
}
function JiuQiWebTableWorkControlSetBordSolidBottom(){//下实单边线
  var tableArr=[];
  tableArr[0]=this.parentObj.rowHeadTable;
  tableArr[1]=this.parentObj.colHeadTable;
  tableArr[2]=this.parentObj.twoHeadTable;
  tableArr[3]=this.parentObj.mainTable;
  for(var i=0;i<tableArr.length;i++){
    var ctable=tableArr[i];
    this.setBordSolidAloneByTable(ctable,4);
  }
}
function JiuQiWebTableWorkControlSetBordSolidLeft(){//左实单边线
  var tableArr=[];
  tableArr[0]=this.parentObj.rowHeadTable;
  tableArr[1]=this.parentObj.colHeadTable;
  tableArr[2]=this.parentObj.twoHeadTable;
  tableArr[3]=this.parentObj.mainTable;
  for(var i=0;i<tableArr.length;i++){
    var ctable=tableArr[i];
    this.setBordSolidAloneByTable(ctable,1);
  }
}
function JiuQiWebTableWorkControlSetBordSolidRight(){//右实单边线
  var tableArr=[];
  tableArr[0]=this.parentObj.rowHeadTable;
  tableArr[1]=this.parentObj.colHeadTable;
  tableArr[2]=this.parentObj.twoHeadTable;
  tableArr[3]=this.parentObj.mainTable;
  for(var i=0;i<tableArr.length;i++){
    var ctable=tableArr[i];
    this.setBordSolidAloneByTable(ctable,3);
  }
}
function JiuQiWebTableWorkControlSetBordDoubleSolidBottom(){
  var tableArr=[];
  tableArr[0]=this.parentObj.rowHeadTable;
  tableArr[1]=this.parentObj.colHeadTable;
  tableArr[2]=this.parentObj.twoHeadTable;
  tableArr[3]=this.parentObj.mainTable;
  for(var i=0;i<tableArr.length;i++){
    var ctable=tableArr[i];
    this.setBordSolidAloneByTable(ctable,5);
  }
}
function JiuQiWebTableWorkControlSetBordBottom(){
  var tableArr=[];
  tableArr[0]=this.parentObj.rowHeadTable;
  tableArr[1]=this.parentObj.colHeadTable;
  tableArr[2]=this.parentObj.twoHeadTable;
  tableArr[3]=this.parentObj.mainTable;
  for(var i=0;i<tableArr.length;i++){
    var ctable=tableArr[i];
    this.setBordSolidAloneByTable(ctable,6);
  }
}
function JiuQiWebTableWorkControlSetBordSolidTopBottom(){
  var tableArr=[];
  tableArr[0]=this.parentObj.rowHeadTable;
  tableArr[1]=this.parentObj.colHeadTable;
  tableArr[2]=this.parentObj.twoHeadTable;
  tableArr[3]=this.parentObj.mainTable;
  for(var i=0;i<tableArr.length;i++){
    var ctable=tableArr[i];
    this.setBordSolidAloneByTable(ctable,7);
  }
}
function JiuQiWebTableWorkControlSetBordSolidTopDoubleSolidBottom(){
  var tableArr=[];
  tableArr[0]=this.parentObj.rowHeadTable;
  tableArr[1]=this.parentObj.colHeadTable;
  tableArr[2]=this.parentObj.twoHeadTable;
  tableArr[3]=this.parentObj.mainTable;
  for(var i=0;i<tableArr.length;i++){
    var ctable=tableArr[i];
    this.setBordSolidAloneByTable(ctable,8);
  }
}
function JiuQiWebTableWorkControlSetBordSolidTopBoldBottom(){
  var tableArr=[];
  tableArr[0]=this.parentObj.rowHeadTable;
  tableArr[1]=this.parentObj.colHeadTable;
  tableArr[2]=this.parentObj.twoHeadTable;
  tableArr[3]=this.parentObj.mainTable;
  for(var i=0;i<tableArr.length;i++){
    var ctable=tableArr[i];
    this.setBordSolidAloneByTable(ctable,9);
  }
}
function JiuQiWebTableWorkControlSetBordSolidAloneByTable(ctable,k){
  var styleValue="1px solid #000000";
  var styleValue1="2px solid #000000";
  var styleValue2="3px double #000000";
  for(var i=0;i<=this.currentSelectIndex;i++){
    var lx1=this.selecteddiv[i].lx1;
    var lx2=this.selecteddiv[i].lx2;
    var ly1=this.selecteddiv[i].ly1;
    var ly2=this.selecteddiv[i].ly2;
    if(k==1)
    for(var m=ly1;m<=ly2;m++){
	  var n=lx1-1;
	  var ccell=this.getCellByLxy(n,m,0,ctable);
	  if(ccell==null) continue;
	  ccell.runtimeStyle.borderRight=styleValue;
    }
    if(k==3)
    for(var m=ly1;m<=ly2;m++){
	  var n=lx2;
	  var ccell=this.getCellByLxy(n,m,0,ctable);
	  if(ccell==null) continue;
	  if(ccell.parentElement.rowIndex>=ly1 && (ccell.parentElement.rowIndex+ccell.rowSpan-1)<=ly2){
	    ccell.runtimeStyle.borderRight=styleValue;
	  }
    }
    if(k==2 || k==7 || k==8 || k==9)
    for(var n=lx1;n<=lx2;n++){
	  var m=ly1-1;
	  var ccell=this.getCellByLxy(n,m,0,ctable);
	  if(ccell==null) continue;
	  ccell.runtimeStyle.borderBottom=styleValue;
    }
    if(k==4 || k==7)
    for(var n=lx1;n<=lx2;n++){
	  var m=ly2;
	  var ccell=this.getCellByLxy(n,m,0,ctable);
	  if(ccell==null) continue;
	  if(parseInt(ccell.lx)>=lx1 && (parseInt(ccell.lx)+ccell.colSpan-1)<=lx2){
	    ccell.runtimeStyle.borderBottom=styleValue;
	  }
    }
    if(k==5 || k==8)
    for(var n=lx1;n<=lx2;n++){
	  var m=ly2;
	  var ccell=this.getCellByLxy(n,m,0,ctable);
	  if(ccell==null) continue;
	  if(parseInt(ccell.lx)>=lx1 && (parseInt(ccell.lx)+ccell.colSpan-1)<=lx2){
	    ccell.runtimeStyle.borderBottom=styleValue2;
	  }
    }
    if(k==6 || k==9)
    for(var n=lx1;n<=lx2;n++){
	  var m=ly2;
	  var ccell=this.getCellByLxy(n,m,0,ctable);
	  if(ccell==null) continue;
	  if(parseInt(ccell.lx)>=lx1 && (parseInt(ccell.lx)+ccell.colSpan-1)<=lx2){
	    ccell.runtimeStyle.borderBottom=styleValue1;
	  }
    }
  }

}
function JiuQiWebTableWorkControlSetTdsFontFit(autoFit){
  if(this.currentSelectIndex<0) return;
  var ccells=this.getSelectedCells();
  this.parentObj.inputRange.outFromTd();
  var thisInputObj=this.parentObj.inputRange.inputText;
  thisInputObj.style.display="";
  for(var i=0;i<ccells.length;i++){
    var ctd=ccells[i];
    if(ctd.innerText==" " || ctd.innerText=="") continue;
    if(!this.parentObj.parentObj.isDesignMode && ctd.rOC=='0') continue;
    if(ctd.fft=='1' || !autoFit){
      if(autoFit){
	if(!ctd.noWrap){
    	  if(ctd.style.fontSize==""){
    	    ctd.style.fontSize='9pt';
    	  }
    	  thisInputObj.style.fontSize=ctd.style.fontSize;
    	  thisInputObj.runtimeStyle.fontSize=ctd.style.fontSize;
    	  thisInputObj.style.width=ctd.offsetWidth;
    	  thisInputObj.style.height=ctd.offsetHeight;
          thisInputObj.value=ctd.innerText;
          if(thisInputObj.value==" ") thisInputObj.value="";
	}
	this.parentObj.inputRange.fontFitAuto(ctd,thisInputObj);
      }else{
	ctd.runtimeStyle.fontSize='9pt';
      }
    }
  }
  thisInputObj.style.display="none";
}
//复制一行
function JiuQiWebTableWorkControlDuplicateRows(beginIndex,endIndex,count,insertIndex,afterDelete){
  var rowheadt=this.parentObj.rowHeadTable;
  var colheadt=this.parentObj.colHeadTable;
  var twoheadt=this.parentObj.twoHeadTable;
  var ctable=this.parentObj.mainTable;
  var rowsNum=count*(endIndex-beginIndex+1);
  if(insertIndex<colheadt.rows.length){
    this.insertRowTo(colheadt,insertIndex,rowsNum,true,beginIndex,afterDelete);
    this.insertRowTo(twoheadt,insertIndex,rowsNum,true,beginIndex,afterDelete);
  }
  this.insertRowTo(rowheadt,insertIndex,rowsNum,true,beginIndex,afterDelete);
  this.insertRowTo(ctable,insertIndex,rowsNum,true,beginIndex,afterDelete);
  var bindex=beginIndex;
  var eindex=endIndex;
  if(insertIndex<=beginIndex){
    bindex+=rowsNum;
    eindex+=rowsNum;
  }
  var everyRowCount = eindex-bindex+1;

  if(everyRowCount > 1) {
      this.attCopyRows(rowheadt,bindex,eindex,count,insertIndex,afterDelete);
      this.attCopyRows(colheadt,bindex,eindex,count,insertIndex,afterDelete);
      this.attCopyRows(twoheadt,bindex,eindex,count,insertIndex,afterDelete);
      this.attCopyRows(ctable,bindex,eindex,count,insertIndex,afterDelete);
  }
  if(this.onDuplicateRows!=null){
    this.onDuplicateRows(beginIndex,endIndex,count,insertIndex);
  }
  this.parentObj.setXYBrace();
}
function JiuQiWebTableWorkControlAttCopyRows(ctable,beginIndex,endIndex,count,insertIndex){
  var oldStyle=ctable.style.display;
  if(insertIndex>=ctable.rows.length) return;
  ctable.style.display="";
  var everyRowCout=endIndex-beginIndex+1;
  var cIndex=insertIndex;
  for(var i=0;i<count;i++){
    for(var j=0;j<everyRowCout;j++){
      var targetRow=ctable.rows[cIndex+j];
      var soureRow=ctable.rows[beginIndex+j];
      this.attCopyRowToRow(soureRow,targetRow);
    }
    cIndex+=everyRowCout;
  }
  ctable.style.display=oldStyle;
}
function JiuQiWebTableWorkControlAttCopyRowToRow(soureRow,targetRow,afterDelete){
  for(var i=0;i<soureRow.cells.length;i++){
    var scell=soureRow.cells[i];
    var tcell=targetRow.cells[i];
    this.attCopyCellToCell(scell,tcell,afterDelete);
  }
  for(var j=targetRow.cells.length-1;j>=i;j--){
    targetRow.deleteCell(j);
  }
}
function JiuQiWebTableWorkControlAttCopyCellToCell(scell,tcell,afterDelete){
  if(scell==null || tcell==null) return;
  if(scell.cellIndex==0) {
    //tcell.height=scell.height;
    var addHeight=parseInt(scell.height)-parseInt(tcell.height);
    this.setRowHeightByTable(scell.parentElement.parentElement,tcell.parentElement.rowIndex,scell.height,addHeight)
  }
  if(scell.parentElement.rowIndex==0){
    var addWidth=parseInt(scell.width)-parseInt(tcell.width);
    this.setColWidthByTable(scell.parentElement.parentElement,tcell.cellIndex,scell.width,addWidth);
  }
  if(scell.parentElement.rowIndex==0) tcell.width=scell.width;
  if(afterDelete)  tcell.id=scell.id;
  tcell.colSpan=scell.colSpan;
  tcell.rowSpan=scell.rowSpan;
  tcell.isMode=scell.isMode;
  tcell.noWrap=scell.noWrap;
  tcell.style.backgroundColor=scell.currentStyle.backgroundColor;
  tcell.style.fontWeight=scell.currentStyle.fontWeight;
  tcell.style.color=scell.currentStyle.color;
  tcell.style.textDecoration=scell.currentStyle.textDecoration;
  tcell.style.writingMode=scell.currentStyle.writingMode;
  tcell.style.borderLeftStyle=scell.currentStyle.borderLeftStyle;
  tcell.style.borderTopStyle=scell.currentStyle.borderTopStyle;
  tcell.style.borderRightStyle=scell.currentStyle.borderRightStyle;
  tcell.style.borderBottomStyle=scell.currentStyle.borderBottomStyle;
  tcell.style.borderLeftColor=scell.currentStyle.borderLeftColor;
  tcell.style.borderTopColor=scell.currentStyle.borderTopColor;
  tcell.style.borderRightColor=scell.currentStyle.borderRightColor;
  tcell.style.borderBottomColor=scell.currentStyle.borderBottomColor;
  tcell.style.borderLeftWidth=scell.currentStyle.borderLeftWidth;
  tcell.style.borderTopWidth=scell.currentStyle.borderTopWidth;
  tcell.style.borderRightWidth=scell.currentStyle.borderRightWidth;
  tcell.style.borderBottomWidth=scell.currentStyle.borderBottomWidth;
  tcell.style.wordWrap=scell.currentStyle.wordWrap;
  tcell.style.wordBreak=scell.currentStyle.wordBreak;
  if(scell.cellIndex>0){
    tcell.style.fontFamily=scell.currentStyle.fontFamily;
    tcell.style.fontSize=scell.currentStyle.fontSize;
    tcell.style.fontStyle=scell.currentStyle.fontStyle;
  }
  if("medium"==tcell.style.borderLeftWidth ) tcell.style.borderLeftWidth="1px";
  if("medium"==tcell.style.borderTopWidth ) tcell.style.borderTopWidth="1px";
  if("medium"==tcell.style.borderRightWidth ) tcell.style.borderRightWidth="0px";
  if("medium"==tcell.style.borderBottomWidth ) tcell.style.borderBottomWidth="0px";
  tcell.style.textAlign=scell.currentStyle.textAlign;
  tcell.style.verticalAlign=scell.currentStyle.verticalAlign;

  if(!(scell.cellIndex==0 || scell.parentElement.rowIndex==0)) {
    //tcell.innerHTML=scell.innerHTML;
  }
  if(this.onCopyCellToCell!=null){
    this.onCopyCellToCell(scell,tcell);
  }
}
function JiuQiWebTableWorkControlDuplicateCols(beginIndex,endIndex,count,insertIndex){

}
function JiuQiWebTableWorkControlAttCopyCols(ctable,beginIndex,endIndex,count,insertIndex){

}
function JiuQiWebTableWorkControlSetColWidthByTable(ctable,colNum,newWidth,addWidth){
    if(ctable.rows.length<=0) return;
    if(ctable.rows[0].cells.length<=colNum) return;
    ctable.width=parseInt(ctable.width) + addWidth;
    if(newWidth<=0) newWidth=1;
    for(var i=0;i<ctable.rows.length;i++){
      var crow=ctable.rows[i];
      var ccell=this.getCellByLxy(colNum,i,0,ctable);
      if(ccell!=null){
        if(ccell.colSpan==1){
          ccell.width=newWidth;
        }
      }
    }
}
function JiuQiWebTableWorkControlSetRowHeightByTable(ctable,rowNum,newHeight,addHeight){
	if(ctable.rows.length<=rowNum) return;
        var newTableHeight=parseInt(ctable.height)+addHeight;
	ctable.height=newTableHeight;
	if(newHeight<=0) newHeight=1;
    var crow=ctable.rows[rowNum];
    for(var i=0;i<crow.cells.length;i++){
      var ccell=crow.cells[i];
      if(ccell.rowSpan==1){
        ccell.setAttribute("height",newHeight,0);
      }
    }
    crow.height=newHeight;
    ctable.height=newTableHeight;
}
function JiuQiWebTableWorkControlInsCol(n){//插入列操作
    if(this.currentSelectIndex<0) return;
	if(this.currentSelectIndex>0) {
	  alert("插入行操作不支持复选区域插入！");
	  return false;
	}
	var lx1=this.selecteddiv[0].lx1;
	var lx2=this.selecteddiv[0].lx2;
	//if(lx1!=lx2) {
      //alert("请选定一列或者一个单元格后再进行此操作");
	  //return;
	//}
    this.insertCol(lx1,parseInt(n));
}
function JiuQiWebTableWorkControlInsertCol(lx1,n){//针对一个表,插入n列
	var rowheadt=this.parentObj.rowHeadTable;
	var colheadt=this.parentObj.colHeadTable;
	var twoheadt=this.parentObj.twoHeadTable;
	var ctable=this.parentObj.mainTable;
    this.insertColTo(rowheadt,lx1,n);
    this.insertColTo(colheadt,lx1,n);
    this.insertColTo(twoheadt,lx1,n);
    this.insertColTo(ctable,lx1,n);
    this.parentObj.colAndRowCountIni();
    if(this.onInsertCol!=null){
      this.onInsertCol(lx1,n);
    }
    this.parentObj.setXYBrace();
}
function JiuQiWebTableWorkControlInsertColTo(ctable,lx1,n){//针对一个表,在lx1插入n列{
  var lxArr=[];
  if(ctable.rows.length==0) return;
  if(lx1>ctable.rows[0].cells.length) return;
  var firstCellWidth;
  var copyCellIndex=lx1;
  var insertIndexAdd=0;
  if(lx1==ctable.rows[0].cells.length){
    if(ctable.rows[0].cells.length!=this.parentObj.mainTable.rows[0].cells.length) return;
    copyCellIndex=lx1-1;
    insertIndexAdd=1;
  }
  var tableCols=ctable.rows[0].cells.length;
  var insertCells=[],changeColSpanCells=[],beginLxAddNo1=[];
  for(var i=0;i<ctable.rows.length;i++){
     beginLxAddNo1[i]=getFirstBigLxCell(ctable.rows[i],lx1);
     var ccell=this.getCellByLxy(copyCellIndex,i,1,ctable);
     if(ccell==null) continue;
     if(ccell.parentElement.rowIndex==i){
       if((parseInt(ccell.lx))==copyCellIndex){
         insertCells[insertCells.length]=ccell;
       }else{
         changeColSpanCells[changeColSpanCells.length]=ccell;
       }
     }
  }
  for(var i=0;i<ctable.rows.length;i++){
    var crow=ctable.rows[i];
    var firstCell=beginLxAddNo1[i];
    if(null==firstCell) continue;
    for(var j=firstCell.cellIndex;j<crow.cells.length;j++){
      var cell=crow.cells[j];
      cell.lx=parseInt(cell.lx)+n;
    }
  }
  for(var i=0;i<insertCells.length;i++){
    var ccell=insertCells[i];
    var crow=ccell.parentElement;
    var insertIndex=ccell.cellIndex;
    for(var j=0;j<n;j++){
      var newCell=crow.insertCell(insertIndex+j+insertIndexAdd);
      newCell.innerText=" ";
      newCell.lx=lx1+j;
      if(crow.rowIndex==0){
        newCell.innerText=getABCValue(lx1+j-1);
        newCell.className="JiuQiWebTableViewTableColHead";
        newCell.width=this.parentObj.defaultCellWidth;
        newCell.bgColor=this.parentObj.headCellBGColor;
        newCell.align="center";
      }
      this.attCopyCellToCell(ccell,newCell,false);
      if(newCell.isMode=="true"){
	  newCell.style.backgroundColor="";
	  newCell.className=ccell.className;
      }
      if(crow.rowIndex>0){
        newCell.innerText=" ";
      }
      newCell.lx=lx1+j;
      newCell.colSpan=1;
    }
  }
  for(var i=0;i<changeColSpanCells.length;i++){
    var ccell=changeColSpanCells[i];
    var cRowforLxC=ccell.parentElement;
    ccell.colSpan+=parseInt(n);
//    for(var j=cRowforLxC.cells.length-1;j>ccell.cellIndex;j--){
//      var myCellforLxC=cRowforLxC.cells[j];
//      myCellforLxC.lx=parseInt(myCellforLxC.lx) + parseInt(n);
//    }
  }
//  for(var i=0;i<insertCells.length;i++){
//    var ccell=insertCells[i];
//    var crow=ccell.parentElement;
//    this.makeCellLx(crow,ccell,parseInt(tableCols)+ parseInt(n));
//  }
//  for(var i=0;i<ctable.rows.length;i++){
//    var crow=ctable.rows[i];
//    this.makeCellLx(crow,lx);
//  }
//  this.makeCellLxForInsCols(ctable,lx);
  this.makeColNumber(ctable,lx1 + parseInt(n))
}
function getFirstBigLxCell(crow,lx){
  for(var i=0;i<crow.cells.length;i++){
    var cell=crow.cells[i];
    if(parseInt(cell.lx)>=lx) return cell;
  }
  return null;
}
//function JiuQiWebTableWorkControlMakeCellLxForInsCols(ctable,lx){
//  var allColCount=ctable.rows[0].cells.length-1;
//  for(var i=0;i<ctable.rows.length;i++){
//    var crow=ctable.rows[i];
//    var firstIndex=getTheFirstLittelCellForLx(crow,lx);
//    var currentlx=allColCount;
//    for(var j=crow.cells.length-1;j>=firstIndex;j--){
//      var cell=crow.cells[j];
//
//    }
//  }
//}
function getTheFirstLittelCellForLx(crow,lx){
  if(lx<0) alert("在插入列后计算单位格LX值时产生错误，传入的LX值小于0");
  for(var j=crow.cells.length-1;j>=0;j--){
    var cell=crow.cells[j];
    if(parseInt(cell.lx)<lx) {
      var nextcell=cell.nextSibling;
      if(parseInt(nextcell.lx)==lx){
        return cell.cellIndex+2;
      }
      return cell.cellIndex+1;
    }
  }
}
function JiuQiWebTableWorkControlInsRow(n){//插入行操作
    if(this.currentSelectIndex<0) return;
	if(this.currentSelectIndex>0) {
	  alert("插入行操作不支持复选区域插入！");
	  return false;
	}
	var ly1=this.selecteddiv[0].ly1;
	var ly2=this.selecteddiv[0].ly2;
	//if(ly1!=ly2) {
      //alert("请选定一行或者一个单元格后再进行此操作");
	  //return;
	//}
	this.insertRow(ly1,parseInt(n));
}
function JiuQiWebTableWorkControlInsertRow(ly1,n){//针对一个表,插入n行
    var rowheadt=this.parentObj.rowHeadTable;
    var colheadt=this.parentObj.colHeadTable;
    var twoheadt=this.parentObj.twoHeadTable;
    var ctable=this.parentObj.mainTable;
    this.insertRowTo(rowheadt,ly1,n);
    this.insertRowTo(colheadt,ly1,n);
    this.insertRowTo(twoheadt,ly1,n);
    this.insertRowTo(ctable,ly1,n);
    this.parentObj.colAndRowCountIni();
    if(this.onInsertRow!=null) this.onInsertRow(ly1,n);
    this.parentObj.setXYBrace();
}
//增加效率的处理方法  复制第一行按以前的方法  其他的按新方法
function JiuQiWebTableWorkControlInsertRowTo(ctable,ly1,n,dontCopyStyle,copyIndex,afterDelete){//针对一个表,在ly1处插入n行
  //数据录入增加行
  var copyRowIndex=ly1;
  if(typeof(copyIndex)!="undefined") copyRowIndex=copyIndex;
  if(copyRowIndex==ctable.rows.length){
    if(ctable.rows.length!=this.parentObj.mainTable.rows.length ) return;
    copyRowIndex=ly1-1;
  }
  var copyRow = ctable.rows(copyRowIndex);
  var rowIndex = JiuQiWebTableWorkControlInsertRowToOld(this, ctable, ly1, 1, dontCopyStyle , copyRowIndex);
  if(typeof(rowIndex)=="undefined") return;
  var oldStyle=ctable.style.display;
  ctable.style.display="";
  this.attCopyRowToRow(copyRow, ctable.rows(rowIndex),afterDelete);

  ctable.style.display=oldStyle;
  if(n-1==0)return;
  var node = ctable.rows(rowIndex).parentNode;
  var baseRow = ctable.rows(rowIndex);
  for(var i=0; i<n-1; i++){
    var newRow = baseRow.cloneNode(true);
    node.insertBefore(newRow, baseRow);
  }
}
function JiuQiWebTableWorkControlInsertRowToOld(Obj, ctable,ly1,n,dontCopyStyle,copyIndex){//针对一个表,在ly1处插入n行
  var lxArr=[];
  if(ctable.rows.length==0) return;
  if(ly1>ctable.rows.length) return;
  var firstCellHeight;
  var copyRowIndex=ly1;
  if(typeof(copyIndex)!="undefined") copyRowIndex=copyIndex;
  if(copyRowIndex==ctable.rows.length){
    if(ctable.rows.length!=Obj.parentObj.mainTable.rows.length ) return;
    copyRowIndex=ly1-1;
  }
  var copyRow=ctable.rows[copyRowIndex];
  var changeRowSpanCell=[];
  var tableCols=ctable.rows[0].cells.length;
  for(var i=0;i<tableCols;i++){
    var ccell=Obj.getCellByLxy(i,ly1,1,ctable);
    if(null==ccell) continue;
    if(ccell.rowSpan>1 && ccell.parentElement.rowIndex<ly1 && parseInt(ccell.lx)==i){
      changeRowSpanCell[changeRowSpanCell.length]=ccell;
    }
    i+=ccell.colSpan-1;
  }
  for(var i=0;i<changeRowSpanCell.length;i++){
    var cell=changeRowSpanCell[i];
    cell.rowSpan=parseInt(cell.rowSpan) + n;
  }
  //只复制一行  其余行用另外的方法处理
  var newRow;
  for(var i=0;i<n;i++){
    newRow=ctable.insertRow(ly1);
    for(var j=0;j<copyRow.cells.length;j++){
      var newCell=newRow.insertCell();
      var scell=copyRow.cells(j);
      if(j==0){
          newCell.width=Obj.parentObj.rowHeadWidth;
          newCell.height=Obj.parentObj.defaultCellHeight;
      }
      var copyStyle=true;
      if(typeof(dontCopyStyle)!="undefined"){
        if(dontCopyStyle) copyStyle=false;
      }
      if(copyStyle){
        Obj.attCopyCellToCell(scell,newCell,false);
      }else{
        newCell.colSpan=scell.colSpan;
      }
      if(newCell.isMode=="true"){
          newCell.style.backgroundColor="";
          newCell.className=scell.className;
      }
      newCell.innerText=" ";
      newCell.lx=scell.lx
      newCell.rowSpan=1;
    }
  }
  if(ctable!=Obj.parentObj.mainTable){
    var oldDisplay=ctable.style.display;
    ctable.style.display="";
    //ctable.height=parseInt(ctable.clientHeight)+parseInt(n) * this.parentObj.defaultCellHeight;
    ctable.style.display=oldDisplay;
  }
  Obj.makeRowNumber(ctable,ly1);
  return newRow.rowIndex;
}
function JiuQiWebTableWorkControlRemoveCell(ccell){
  //var crow=ccell.parentElement;
  //var subLx=ccell.colSpan;
  //for(var i=ccell.cellIndex+1;i<crow.cells.length;i++){
    //var thisCell=crow.cells[i];
    //thisCell.lx=parseInt(thisCell.lx)-subLx;
  //}
  //return crow.removeChild(ccell);
}
function JiuQiWebTableWorkControlInsertCell(crow,index){

}
function JiuQiWebTableWorkControlGetCellIndexByLx(crow,lx){//通过lx得到一个行内实际的CELL的INDEX值
  var returnV=-1;
  for(var i=0;i<crow.cells.length;i++){
    var clx=parseInt(crow.cells[i].lx);
    if(clx>=lx) {
      returnV=i;
      break;
    }
  }
  return returnV;
}
function JiuQiWebTableWorkControlDelRow(){//删除行操作
	if(this.currentSelectIndex>0) {
	  alert("删除行操作不支持复选区域删除！");
	  return false;
	}
	if(this.currentSelectIndex<0) {
	  return;
	}
	var ctable=this.parentObj.mainTable;
	var lx1=this.selecteddiv[0].lx1;
	var lx2=this.selecteddiv[0].lx2;
	var ly1=this.selecteddiv[0].ly1;
	var ly2=this.selecteddiv[0].ly2;
	this.hiddeAll();
    this.parentObj.inputRange.outFromTd();
	this.delRows(lx1,lx2,ly1,ly2);
}
function JiuQiWebTableWorkControlDelRows(lx1,lx2,ly1,ly2){//删除指定的行操作
    var ctable=this.parentObj.mainTable;
	if(ly1==1 && ly2==ctable.rows.length-1){
	  alert("不能删除全部行，至少有一行需要保留!");
	  return;
	}
	//if(!confirm("确定要删除选定的行吗？")) return;
	if(this.onBeforDeleteRows!=null){
	  var reValue=this.onBeforDeleteRows(ly1,ly2);
	  if(reValue==false) return;
	}
	var ctable=this.parentObj.mainTable;
	var rowheadt=this.parentObj.rowHeadTable;
	var colheadt=this.parentObj.colHeadTable;
	var twoheadt=this.parentObj.twoHeadTable;
    this.beforDelRow(rowheadt,lx1,lx2,ly1,ly2);
    this.beforDelRow(colheadt,lx1,lx2,ly1,ly2);
    this.beforDelRow(twoheadt,lx1,lx2,ly1,ly2);
    this.beforDelRow(ctable,lx1,lx2,ly1,ly2);
	this.delRowByRowIndexs(lx1,lx2,ly1,ly2);
	if(this.onDelRows!=null){
	  this.onDelRows(ly1,ly2);
	}
    this.parentObj.colAndRowCountIni();
    this.parentObj.setXYBrace();
    this.parentObj.lockTableHead();
}
function JiuQiWebTableWorkControlBeforDelRow(ctable,lx1,lx2,ly1,ly2){//对于一个表,整理要删除的选定的行以及与之相关的单元格的位置和跨行数
  if(ctable.rows.length==0) return;
	if(ly2>=ctable.rows.length) ly2=ctable.rows.length-1;
	var delCells=[],insertCellIndex=[],insertRowIndex=[],newRowSpan=[];
	if(!(lx1==1 && lx2>=(ctable.rows[0].cells.length-1))){//把跨行的单元格整理一遍并且重新定义rowSpan
	  for(var i=ly1;i<=ly2;i++){
	    for(var j=0;j<ctable.rows[0].cells.length;j++){
	      var ccell=this.getCellByLxy(j,i,1,ctable);
	      if(ccell==null) continue;
	      if(ccell.rowSpan>1){//如果是跨行单元格
	        if(ccell.parentElement.rowIndex<ly1){
	          ccell.rowSpan-=1;
	        }else{
	          if(ccell.parentElement.rowIndex+ccell.rowSpan-1>ly2 && parseInt(ccell.lx)==j && ccell.parentElement.rowIndex==i){
	            var newRowIndex=ly2+1;
	            delCells[delCells.length]=ccell;
	            var newCellIndex=this.getCellIndexByLx(ctable.rows[newRowIndex],j);
	            newRowSpan[newRowSpan.length]=ccell.parentElement.rowIndex+ccell.rowSpan-1-ly2;
	            insertCellIndex[insertCellIndex.length]=newCellIndex;
	            insertRowIndex[insertRowIndex.length]=newRowIndex;
	            var newCell=ctable.rows[newRowIndex].insertCell(newCellIndex);
	            newCell.lx=ccell.lx;
	          }
	        }
	      }
	      j+=ccell.colSpan-1;
	    }
	  }
	  for(var i=0;i<delCells.length;i++){
	    var ccell=delCells[i];
	    var removeCell=ccell.parentElement.removeChild(ccell);
	    removeCell.rowSpan=newRowSpan[i];
	    //var newCell=ctable.rows[insertRowIndex[i]].insertCell(insertCellIndex[i]);
            if(insertCellIndex[i]>=0){
	      var newCell=ctable.rows[insertRowIndex[i]].cells(insertCellIndex[i]);
	      ctable.rows[insertRowIndex[i]].replaceChild(removeCell,newCell);
            }
	  }
	  delCells=null;
	  insertCellIndex=null;
	  insertRowIndex=null;
	  newRowSpan=null;
	}
}
function JiuQiWebTableWorkControlBeforDelCol(ctable,lx1,lx2){//对于一个表,整理要删除的选定的列以及与之相关的单元格的位置和跨列数
  if(ctable.rows.length==0) return;
  if(ctable.rows[0].cells.length<=lx1) return;
  if(lx2>=ctable.rows[0].cells.length) lx2=ctable.rows[0].cells.length-1;
  var delCells=[],changeColSpans=[],changeColSpanNums=[],firstChangeLxCells=[];
  for(var i=0;i<ctable.rows.length;i++){
    var lastCell=null;
    for(var j=lx1;j<=lx2;j++){
        var ccell=this.getCellByLxy(j,i,1,ctable);
        if(ccell==null) continue;
        if(parseInt(ccell.lx)==lx1 && parseInt(ccell.lx)+ccell.colSpan-1==lx2){
              if(ccell.parentElement.rowIndex==i){
                delCells[delCells.length]=ccell;
              }
              i+=ccell.rowSpan-1;
              break;
            }else
            if(parseInt(ccell.lx)>lx1 && parseInt(ccell.lx)+ccell.colSpan-1<lx2){
              if(ccell.parentElement.rowIndex==i && parseInt(ccell.lx)==j){
                delCells[delCells.length]=ccell;
              }
            }else
            if(parseInt(ccell.lx)==lx1 && parseInt(ccell.lx)+ccell.colSpan-1<lx2){
              if(ccell.parentElement.rowIndex==i && lx1==j){
                delCells[delCells.length]=ccell;
              }
            }else
            if(parseInt(ccell.lx)>lx1 && parseInt(ccell.lx)+ccell.colSpan-1==lx2){
              if(ccell.parentElement.rowIndex==i && parseInt(ccell.lx)==j){
                delCells[delCells.length]=ccell;
              }
            }else
            if(parseInt(ccell.lx)<lx1 && parseInt(ccell.lx)+ccell.colSpan-1>lx2){
              if(ccell.parentElement.rowIndex==i && j==lx1){
                changeColSpans[changeColSpans.length]=ccell;
                changeColSpanNums[changeColSpanNums.length]=lx2-lx1+1;
                    i+=ccell.rowSpan-1;
                break;
              }
            }else
        if(parseInt(ccell.lx)<lx1){
          if(ccell.parentElement.rowIndex==i && j==lx1){
                changeColSpans[changeColSpans.length]=ccell;
                changeColSpanNums[changeColSpanNums.length]=parseInt(ccell.lx)+ccell.colSpan-lx1;
              }
        }else
        if(parseInt(ccell.lx)+ccell.colSpan-1>lx2){
          if(ccell.parentElement.rowIndex==i && parseInt(ccell.lx)==j){
                changeColSpans[changeColSpans.length]=ccell;
                changeColSpanNums[changeColSpanNums.length]=lx2-parseInt(ccell.lx)+1;
              }
            }
            //if(parseInt(ccell.lx)
        //j+=ccell.colSpan-1;
    }
  }
  var delColWidth=0;
  for(var i=lx1;i<=lx2;i++){
    delColWidth+=parseInt(this.parentObj.mainTable.rows[0].cells[i].width);
  }
  for(var i=0;i<ctable.rows.length;i++){
    firstChangeLxCells[i]=null;
    if(lx2<ctable.rows[0].cells.length-1){
      var crow=ctable.rows[i];
      for(var j=crow.cells.length-1;j>0;j--){
        var ccell=crow.cells[j];
        if((parseInt(ccell.lx)+ccell.colSpan-1<=lx2 && parseInt(ccell.lx)<=lx2) || parseInt(ccell.lx)<=lx1){
          firstChangeLxCells[i]=ccell.nextSibling;
          break;
        }
        if(j==1) firstChangeLxCells[i]=ccell;
      }
    }
  }
  for(var i=0;i<delCells.length;i++){
    var ccell=delCells[i];
    var removeCell=ccell.parentElement.removeChild(ccell);
  }
  for(var i=0;i<changeColSpans.length;i++){
    var ccell=changeColSpans[i];
    ccell.colSpan-=changeColSpanNums[i];
  }
  var firstCells=ctable.rows[0].cells;
  this.makeColNumber(ctable,lx1);
  var allCol=firstCells.length;
  var subNum=lx2-lx1+1;
  for(var i=1;i<ctable.rows.length;i++){
    var crow=ctable.rows[i];
    var ccell=firstChangeLxCells[i];
    if(ccell==null) continue;
    //this.makeCellLx(crow,ccell,allCol);
    for(var j=ccell.cellIndex;j<crow.cells.length;j++){
      var cell=crow.cells[j];
      cell.lx=cell.lx-subNum;
    }
  }
  var oldDisStyle=ctable.style.display;
  ctable.style.display="";
  var newWidth=parseInt(ctable.clientWidth)-delColWidth;
  if(newWidth<=0){
    ctable.width=1;
  }else{
    ctable.width=parseInt(ctable.clientWidth)-delColWidth;
  }
  ctable.style.display=oldDisStyle;
  delCells=null;
  changeColSpans=null;
  insertRowIndex=null;
  changeColSpanNums=null;
}
function JiuQiWebTableWorkControlMakeCellLx(crow,firstCell,allCol){
  var clx=allCol;
  var beginIndex=parseInt(firstCell.lx)+firstCell.colSpan;
  var ctable=crow.parentElement.parentElement;
  for(var i=crow.rowIndex;i<crow.rowIndex+firstCell.rowSpan;i++){
    var row=ctable.rows[i];
    var subColSpan=0;
    for(var j=row.cells.length-1;j>=1;j--){
      var thisCell=row.cells[j];
      if(parseInt(thisCell.lx)>=beginIndex && thisCell!=firstCell){
        subColSpan+=thisCell.colSpan;
        thisCell.lx=clx-subColSpan;
        //thisCell.innerText=thisCell.lx;
      }else{
        break;
      }
    }
  }
}
function JiuQiWebTableWorkControlMakeColNumber(ctable,lx1){
	var firstCells=ctable.rows[0].cells;
	for(var i=lx1;i<firstCells.length;i++){
	  var ccell=firstCells[i];
	  ccell.lx=i;
	  ccell.innerText=getABCValue(i-1);
	}
}
function getABCValue(i){
  if(i<0) return "";
  var returnStr="";
  var modValue=i%26;
  returnStr= String.fromCharCode("A".charCodeAt(0) + modValue);
  var divValue=i/26;
  if(divValue>=1){
    returnStr=getABCValue(parseInt(divValue)-1) + returnStr;
  }
  return returnStr;
}
function JiuQiWebTableWorkControlDelRowByRowIndexs(lx1,lx2,ly1,ly2){//删除已经整理好的行
	var rowheadt=this.parentObj.rowHeadTable;
	var colheadt=this.parentObj.colHeadTable;
	var twoheadt=this.parentObj.twoHeadTable;
	var ctable=this.parentObj.mainTable;
	  for(var i=ly2;i>=ly1;i--){
	    var rowHeight=parseInt(ctable.rows[i].cells[0].clientHeight);
	    if(this.onBeforDeleteOneRow!=null){
	      this.onBeforDeleteOneRow(ctable.rows[i]);
	    }
	    ctable.deleteRow(i);
	    ctable.height=parseInt(ctable.clientHeight)-rowHeight;
	    if(rowheadt.rows.length>i){
	      rowheadt.deleteRow(i);
	      var oldDisStyle=rowheadt.style.display;
	      rowheadt.style.display="";
	      rowheadt.height=parseInt(rowheadt.clientHeight)-rowHeight;
	      rowheadt.style.display=oldDisStyle;
	    }
	    if(this.parentObj.lockRowHead>=i){
	      if(colheadt.rows.length>i){
	        colheadt.deleteRow(i);
	        var oldDisStyle=colheadt.style.display;
	        colheadt.style.display="";
	        colheadt.height=parseInt(colheadt.clientHeight)-rowHeight;
	        colheadt.style.display=oldDisStyle;
	      }
	      if(twoheadt.rows.length>i){
	        twoheadt.deleteRow(i);
	        var oldDisStyle=twoheadt.style.display;
	        twoheadt.style.display="";
	        twoheadt.height=parseInt(twoheadt.clientHeight)-rowHeight;
	        twoheadt.style.display=oldDisStyle;
	      }
	      this.parentObj.lockRowHead-=1;
	    }
	    if(this.onAfterDeleteOneRow!=null){
	      this.onAfterDeleteOneRow(i);
	    }

	  }
	this.makeRowNumber(ctable,ly1);
	this.makeRowNumber(rowheadt,ly1);
	this.makeRowNumber(colheadt,ly1);
	this.makeRowNumber(twoheadt,ly1);
}
function JiuQiWebTableWorkControlMakeRowNumber(ctable,beginRow){//从beginRow行开始重新编行号
  if(ctable.rows.length>beginRow){
    for(var i=beginRow;i<ctable.rows.length;i++){
      ctable.rows[i].cells[0].innerText=i;
    }
  }
}
function JiuQiWebTableWorkControlDelCol(){//删除列操作
	if(this.currentSelectIndex>0) {
	  alert("删除列操作不支持复选区域删除！");
	  return false;
	}
	if(this.currentSelectIndex<0) {
	  return ;
	}
	var lx1=this.selecteddiv[0].lx1;
	var lx2=this.selecteddiv[0].lx2;
	//if(!confirm("确定要删除选定的列吗？")) return;
	this.hiddeAll();
    this.parentObj.inputRange.outFromTd();
	this.delCols(lx1,lx2);

}
function JiuQiWebTableWorkControlDelCols(lx1,lx2){
	var rowheadt=this.parentObj.rowHeadTable;
	var colheadt=this.parentObj.colHeadTable;
	var twoheadt=this.parentObj.twoHeadTable;
	var ctable=this.parentObj.mainTable;
	if(lx1==1 && lx2==ctable.rows[0].cells.length-1){
	  alert("不能删除全部列，至少有一列需要保留!");
	  return;
	}
    this.beforDelCol(rowheadt,lx1,lx2);
    this.beforDelCol(colheadt,lx1,lx2);
    this.beforDelCol(twoheadt,lx1,lx2);
    this.beforDelCol(ctable,lx1,lx2);
	if(this.onDelCols!=null){
	  this.onDelCols(lx1,lx2);
	}
	this.parentObj.mainTableWidth-=(parseInt(lx2)-parseInt(lx1)+1);
     this.parentObj.setXYBrace();
     this.parentObj.lockTableHead();
}
function JiuQiWebTableWorkControlSetAttribByName(nameArr,valueArr,isStyleArr,setInputArr){//设置当前选择单元格的样式通过一个名字
  var cells=this.getSelectedCells();
  var rowheadt=this.parentObj.rowHeadTable;
  var colheadt=this.parentObj.colHeadTable;
  var twoheadt=this.parentObj.twoHeadTable;
  for(var i=0;i<cells.length;i++){
    var ccellArr=[];
    var mainCell=cells[i];
    ccellArr[0]=mainCell;
    ccellArr[1]=this.getHeadCellByMainCell(rowheadt,mainCell);
    ccellArr[2]=this.getHeadCellByMainCell(colheadt,mainCell);
    ccellArr[3]=this.getHeadCellByMainCell(twoheadt,mainCell);
    this.setOneCellAttribByName(ccellArr,nameArr,valueArr,isStyleArr,setInputArr);
  }
}
function JiuQiWebTableWorkControlGetHeadCellByMainCell(ctable,ccell){
  var ly=ccell.parentElement.rowIndex,lx=parseInt(ccell.lx);
  if(ctable.rows.length<=ly || ctable.rows[0].cells.length<=lx) return null;
  var newCell=this.getCellByLxy(lx,ly,0,ctable);
  return newCell;
}
function JiuQiWebTableWorkControlSetOneCellAttribByName(ccellArr,nameArr,valueArr,isStyleArr,setInputArr){//设置当前选择单元格的样式通过一个名字
  for(var i=0;i<ccellArr.length;i++){
    var ccell=ccellArr[i];
    if(ccell==null) continue;
    for(var j=0;j<nameArr.length;j++){
      var name=nameArr[j];
      var value=valueArr[j];
      if(isStyleArr[j]){
        if(typeof(value)=="string"){
		  eval("ccell.runtimeStyle." + name + "='" +  value + "'");
		}else{
		  eval("ccell.runtimeStyle." + name + "=" +  value );
		}
		if(name=="fontSize") eval("ccell.style." + name + "='" +  value + "'");
		if(ccell==this.parentObj.inputRange.cTD  && setInputArr[j]){
		    if(typeof(value)=="string"){
		      if(name=="backgroundColor" && value=="transparent"){
		        value="#ffffff";
		      }
		      //if(name=="backgroundColor" && value=="transparent"){
		        //value="#ffffff";
		      //}
		      eval("this.parentObj.inputRange.inputText.runtimeStyle." + name + "='" +  value + "'") ;
		    }else{
		      eval("this.parentObj.inputRange.inputText.runtimeStyle." + name + "=" +  value ) ;
		    }
		}
	  }else{
	    if(typeof(value)=="string"){
	      eval("ccell." + name + "='" + value + "'") ;
	    }else{
	      eval("ccell." + name + "=" + value ) ;
	    }
	    if(ccell==this.parentObj.inputRange.cTD && setInputArr[j]){
	      if(typeof(value)=="string"){
            eval("this.parentObj.inputRange.inputText." + name + "='" + value + "'") ;
          }else{
            eval("this.parentObj.inputRange.inputText." + name + "=" + value ) ;
          }
        }
	  }
    }
  }
}
function JiuQiWebTableWorkControlGetSelectedCells(){//返回当前选择的单元格的数组集合
  var returnCells=[];
  for(var i=0;i<=this.currentSelectIndex;i++){
    for(var m=this.selecteddiv[i].ly1;m<=this.selecteddiv[i].ly2;m++){
      for(var n=this.selecteddiv[i].lx1;n<=this.selecteddiv[i].lx2;n++){
        var hassign=0;
        var ccell=this.getCellByLxy(n,m,0);
        if(ccell!=null){
          for(var j=0;j<returnCells.length;j++){
            if(returnCells[j]==ccell){
              hassign=1;
              j=returnCells.length;
            }
          }
          if(hassign==0){
            returnCells[returnCells.length]=ccell;
          }
        }
      }
    }
  }
  return returnCells;
}
function JiuQiWebTableWorkControlSetBordSolid(solid){//设置被选择的区域为实边线
  var tableArr=[];
  tableArr[0]=this.parentObj.rowHeadTable;
  tableArr[1]=this.parentObj.colHeadTable;
  tableArr[2]=this.parentObj.twoHeadTable;
  tableArr[3]=this.parentObj.mainTable;
  for(var i=0;i<tableArr.length;i++){
    var ctable=tableArr[i];
    this.setBordSolidByTable(ctable,solid);
  }
}
function JiuQiWebTableWorkControlSetBordSolidByTable(ctable,solid){//设置被选择的区域为实边线
  var styleValue="1px solid #000000";
  if(!solid){
    var styleValue="1px solid buttonface";
  }
  for(var i=0;i<=this.currentSelectIndex;i++){
    var lx1=this.selecteddiv[i].lx1;
    var lx2=this.selecteddiv[i].lx2;
    var ly1=this.selecteddiv[i].ly1;
    var ly2=this.selecteddiv[i].ly2;
    for(var m=ly1-1;m<=ly2;m++){
      for(var n=lx1-1;n<=lx2;n++){
        var ccell=this.getCellByLxy(n,m,0,ctable);
        if(ccell==null) continue;
        if(n>=lx1 && m>=ly1){
          ccell.runtimeStyle.borderBottom=styleValue;
          ccell.runtimeStyle.borderRight=styleValue;
        }
        if(n==lx1-1 && ccell.parentElement.rowIndex>=ly1 && (ccell.parentElement.rowIndex+ccell.rowSpan-1)<=ly2){
          ccell.runtimeStyle.borderRight=styleValue;
        }
        if(m==ly1-1 && parseInt(ccell.lx)>=lx1 && (parseInt(ccell.lx)+ccell.colSpan-1)<=lx2){
          ccell.runtimeStyle.borderBottom=styleValue;
        }
      }
    }
  }
}
function JiuQiWebTableWorkControlSetBordAround(isDouble){
  var tableArr=[];
  tableArr[0]=this.parentObj.rowHeadTable;
  tableArr[1]=this.parentObj.colHeadTable;
  tableArr[2]=this.parentObj.twoHeadTable;
  tableArr[3]=this.parentObj.mainTable;
  for(var i=0;i<tableArr.length;i++){
    var ctable=tableArr[i];
    this.setBordAroundByTable(ctable,isDouble);
  }
}
function JiuQiWebTableWorkControlSetBordAroundByTable(ctable,isDouble){
  var styleValue="2px solid #000000";
  if(!isDouble){
    var styleValue="1px double #000000";
  }
  for(var i=0;i<=this.currentSelectIndex;i++){
    var lx1=this.selecteddiv[i].lx1;
    var lx2=this.selecteddiv[i].lx2;
    var ly1=this.selecteddiv[i].ly1;
    var ly2=this.selecteddiv[i].ly2;
    for(var m=ly1;m<=ly2;m++){
	  var n=lx1-1;
	  var ccell=this.getCellByLxy(n,m,0,ctable);
	  if(ccell==null) continue;
	  ccell.runtimeStyle.borderRight=styleValue;
    }
    for(var m=ly1;m<=ly2;m++){
	  var n=lx2;
	  var ccell=this.getCellByLxy(n,m,0,ctable);
	  if(ccell==null) continue;
	  if(ccell.parentElement.rowIndex>=ly1 && (ccell.parentElement.rowIndex+ccell.rowSpan-1)<=ly2){
	    ccell.runtimeStyle.borderRight=styleValue;
	  }
    }
    for(var n=lx1;n<=lx2;n++){
	  var m=ly1-1;
	  var ccell=this.getCellByLxy(n,m,0,ctable);
	  if(ccell==null) continue;
	  ccell.runtimeStyle.borderBottom=styleValue;
    }
    for(var n=lx1;n<=lx2;n++){
	  var m=ly2;
	  var ccell=this.getCellByLxy(n,m,0,ctable);
	  if(ccell==null) continue;
	  if(parseInt(ccell.lx)>=lx1 && (parseInt(ccell.lx)+ccell.colSpan-1)<=lx2){
	    ccell.runtimeStyle.borderBottom=styleValue;
	  }
    }
  }
}
function JiuQiWebTableWorkControlHiddeAll(){
  this.parentObj.boolMouseisdown=0;
  for(var i=0;i<this.currentSelectIndex+1;i++){
    this.selecteddiv[i].style.display="none";
    this.selecteddiv[i].dirType=null;
  }
  this.currentSelectIndex=-1;
}
function JiuQiWebTableWorkControlSetHeadState(lx1,lx2,ly1,ly2,index){
  if(index<this.doSetHeadStateQueue.length-1) return;
  var ctable=	this.parentObj.mainTable;
	for (var i=0;i<ctable.rows.length;i++){
		if(i>=ly1 && i<=ly2 ){
			ctable.rows(i).cells(0).style.backgroundColor="#888888";
		}
		else{
			ctable.rows(i).cells(0).style.backgroundColor="";
		}
	}
	for (var i=0;i<ctable.rows(0).cells.length;i++){
		if(i>=lx1 && i<=lx2){
			ctable.rows(0).cells(i).style.backgroundColor="#888888";
		}else{
			ctable.rows(0).cells(i).style.backgroundColor="";
	  }
	}
}
function JiuQiWebTableWorkControlCreateNewDiv(){
  var cmydiv=document.createElement(this.createDivStr);
  this.selecteddiv[this.selecteddiv.length]=cmydiv;
  this.parentObj.parentObj.workPanel.appendChild(cmydiv);
}
function JiuQiWebTableWorkControlGetNextDiv(){
  this.currentSelectIndex+=1;
  if(this.selecteddiv.length<=this.currentSelectIndex){
    this.createNewDiv();
  }
  return this.selecteddiv[this.currentSelectIndex];
}
function JiuQiWebTableWorkControlDoSelected(){
  if(this.selecteddiv.length==0) return;
  var mydiv=this.selecteddiv[this.currentSelectIndex];
  if(mydiv.style.display=="none") return;
  this.getFactPoint();
  var lx1=mydiv.lx1,lx2=mydiv.lx2,ly1=mydiv.ly1;ly2=mydiv.ly2;
	var ctable=	this.parentObj.mainTable;
	if(this.parentObj.parentObj.isDesignMode){
	  //var topdiv=this.parentObj.parentObj.parentObj.uniqueID;
	  //var mylength=this.doSetHeadStateQueue.length;
	  //this.doSetHeadStateQueue[mylength]=1;
    //window.setTimeout(topdiv + ".JiuQiWebTableViewObj.mainTableHome.workControlObj.setHeadState("+ lx1 + "," + lx2 + "," + ly1 + "," + ly2  + "," + (mylength) + ")",this.setTimeOutValue);
    //this.setHeadState(lx1,lx2,ly1,ly2);
	}
  var bcell=this.getCellByLxy(lx1,ly1,1);
	var ecell=this.getCellByLxy(lx2,ly2,1);
  var cwidth=0;
	var cheight=0;
        if(bcell == null) return;
	mydiv.style.left=bcell.offsetLeft +parseInt(this.parentObj.mainTable.style.left);;
	mydiv.style.top=bcell.offsetTop -2 + parseInt(this.parentObj.mainTable.style.top)+1;
	var cwidth=ecell.offsetLeft-bcell.offsetLeft + ecell.clientWidth;
	var cheight=ecell.offsetTop-bcell.offsetTop + ecell.clientHeight+1;
	mydiv.style.width=cwidth+1;
	mydiv.style.height=cheight+1;

}
function JiuQiWebTableWorkControlCombineCells(){
  if(!this.parentObj.parentObj.isDesignMode) return;
  var csindex=this.currentSelectIndex;
  if(csindex<0) return;
  if(csindex>0) {
    alert("合并单元格不支持复选合并！");
    return;
  }
  var mydiv=this.selecteddiv[this.currentSelectIndex];
  var c1=mydiv.lx1,c2=mydiv.lx2,r1=mydiv.ly1;r2=mydiv.ly2;
  var firstcell=this.parentObj.inputRange.cTD;
  if(typeof(firstcell)!="undefined" && firstcell!=null)
  if((c1==c2 && r1==r2)|| ((c1+firstcell.colSpan-1==c2)&&(r1+firstcell.rowSpan-1==r2))) return;
  //if(!confirm("合并单元格以后，只保留左上角单元格的内容，是否继续？")) return;
  var ctable=	this.parentObj.mainTable;
  var ccell=null;
  for(var i=r2;i>=r1;i--){
    for(var j=c2;j>=c1;j--){
      ccell=this.getCellByLxy(j,i,0);
      if(ccell!=null){
        if(!(parseInt(ccell.lx)==c1 && ccell.parentElement.rowIndex==r1)){
          var crow=ccell.parentElement;
          var cellin=ccell.cellIndex;
          if(ccell==firstcell){
            this.parentObj.inputRange.outFromTd();
          }
          if( ccell.parentElement!=null){
            try{
               crow.deleteCell(cellin);
            }catch(e){
            }
          }
        }
      }
    }
  }
  var firstcell=this.getCellByLxy(c1,r1,1)
  firstcell.colSpan=(c2-c1)+1;
  firstcell.rowSpan=(r2-r1)+1;
  this.parentObj.inputRange.gotoTD(firstcell);
}
function JiuQiWebTableWorkControlUnCombineCells(){
  if(!this.parentObj.parentObj.isDesignMode) return;
  var csindex=this.currentSelectIndex;
  if(csindex<0) return;
  if(csindex>0) {
    alert("拆分单元格不支持复选拆分！");
    return;
  }
  var mydiv=this.selecteddiv[this.currentSelectIndex];
  var c1=mydiv.lx1,c2=mydiv.lx2,r1=mydiv.ly1;r2=mydiv.ly2;
  var firstcell=this.parentObj.inputRange.cTD;
  var ctable=	this.parentObj.mainTable;
  var ccell=null;
  for(var i=r1;i<=r2;i++){
    for(var j=c1;j<=c2;j++){
      ccell=this.getCellByLxy(j,i,0);
      if(ccell!=null){
        ccell.colSpan=1;
        ccell.rowSpan=1;
        if(firstcell==ccell){
          this.parentObj.inputRange.outFromTd();
        }
      }else{
        var cindex=this.getCellIndexByLxy(j,i);
        var insertCell=ctable.rows[i].insertCell(cindex+1);
        insertCell.innerText=" ";
        //insertCell.className="JiuQiWebTableViewTableWorkTD";
        insertCell.lx=j;
      }
    }
  }
  this.parentObj.inputRange.gotoTD(firstcell);
}
function JiuQiWebTableWorkControlGetMax(nums,sign){
  if(nums.length==0) return null;
  var returnv=nums[0];
  for(var i=1;i<nums.length;i++){
    if(sign){
      if(returnv<nums[i]) returnv=nums[i];
    }else{
      if(returnv>nums[i]) returnv=nums[i];
    }
  }
  return returnv;
}
function JiuQiWebTableWorkControlGetFactPoint(){
  var mydiv=this.selecteddiv[this.currentSelectIndex];
  if(typeof(mydiv) == "undefined" || typeof(mydiv.bcell) == "undefined" || typeof(mydiv.ecell) == "undefined") return;
  var lx1=parseInt(mydiv.bcell.lx),lx2=parseInt(mydiv.bcell.lx)+mydiv.bcell.colSpan-1;
  var lx3=parseInt(mydiv.ecell.lx),lx4=parseInt(mydiv.ecell.lx)+mydiv.ecell.colSpan-1;
  var ly1=mydiv.bcell.parentElement.rowIndex,ly2=mydiv.bcell.parentElement.rowIndex+mydiv.bcell.rowSpan-1;
  var ly3=mydiv.ecell.parentElement.rowIndex,ly4=mydiv.ecell.parentElement.rowIndex+mydiv.ecell.rowSpan-1;
  var ctable=	this.parentObj.mainTable;
  var minX,maxX,minY,maxY;
	if(ly1==0){
	  minY=1;
	  maxY=ctable.rows.length-1;
	}else{
	  //minY=Math.min(ly1,ly2,ly3,ly4);
	  //maxY=Math.max(ly1,ly2,ly3,ly4);
	  minY=this.getMax([ly1,ly2,ly3,ly4],false);
	  maxY=this.getMax([ly1,ly2,ly3,ly4],true);
	}
	if(lx1==0){
	  minX=1;
	  maxX=ctable.rows[0].cells.length-1;
	}else{
	 // minX=Math.min(lx1,lx2,lx3,lx4);
	  //maxX=Math.max(lx1,lx2,lx3,lx4);
	  minX=this.getMax([lx1,lx2,lx3,lx4],false);
	  maxX=this.getMax([lx1,lx2,lx3,lx4],true);
	}
  //var mylx1=minX,mylx2=maxX,myly1=minY,myly2=maxY;
	if(!(mydiv.bcell==mydiv.ecell && mydiv.bcell.lx!="0" && mydiv.bcell.parentElement.rowIndex!=0)){
    for(var i=minY;i<=maxY;i++){
      for(var j=maxX;j>=minX;j--){
        if(i==minY || i==maxY || j==minX || j==maxX){
          var ccell=this.getCellByLxy(j,i,1);
          var reloop=false;
          var ccellleft=parseInt(ccell.lx),ccellright= (parseInt(ccell.lx)+ ccell.colSpan-1),ccelltop=ccell.parentElement.rowIndex,ccellbottom=(ccell.parentElement.rowIndex+ ccell.rowSpan -1);
          if(ccellleft<minX) {
            minX=ccellleft;
            reloop=true;
          }
          if(ccellright>maxX) {
            maxX=ccellright;
            reloop=true;
          }
          if(ccelltop<minY) {
            minY=ccelltop;
            reloop=true;
          }
          if(ccellbottom>maxY) {
            maxY=ccellbottom;
            reloop=true;
          }
          if(reloop) {
            i=minY-1;
            break;
          }
        }else{
          if(j>minX) j=minX+1;
        }
      }
    }
  }
  if(lx1==0 || ly1==0){
    this.parentObj.inputRange.outFromTd();
    this.parentObj.inputRange.inputText.style.display="none";
  }
  if(minX==0) minX=1;
  if(minY==0) minY=1;
  mydiv.lx1=minX;
  mydiv.lx2=maxX;
  mydiv.ly1=minY;
  mydiv.ly2=maxY;
}
function JiuQiWebTableWorkControlGetCellByLxy(lx,ly,sign,cTableObj){
  var returncell=null;
  var ctable=null;
  if(typeof(cTableObj)=="undefined"){
    ctable=this.parentObj.mainTable;
  }else{
    ctable=cTableObj;
  }
  var crow=ctable.rows[ly];
  if(crow==null) return null;
  var cx=lx;
  while (typeof(crow.cells[cx])=="undefined"){
    cx-=1;
  }
  while (parseInt(crow.cells[cx].lx)>lx){
    cx-=1;
  }
  if (parseInt(crow.cells[cx].lx)<=lx && (parseInt(crow.cells[cx].lx)+crow.cells[cx].colSpan-1)>=lx){
    if((parseInt(crow.cells[cx].lx)<lx && sign==1) || parseInt(crow.cells[cx].lx)==lx){
      returncell=crow.cells[cx];
    }
  }else{
    if(ly-1>=0 && sign==1) {
      returncell=this.getCellByLxy(lx,ly-1,1,ctable);
    }
  }
  return returncell;
}
function JiuQiWebTableWorkControlGetCellIndexByLxy(lx,ly){
  var returnIndex=-1;
  var crow=this.parentObj.mainTable.rows[ly];
  if(crow==null) return -1;
  var cx=lx;
  while (typeof(crow.cells[cx])=="undefined"){
    cx-=1;
  }
  while (parseInt(crow.cells[cx].lx)>lx){
    cx-=1;
  }
  returnIndex=crow.cells[cx].cellIndex;
  return returnIndex;
}

//script name=inputRange
function JiuQiWebTableInputRange(cparentobj){
  this.parentObj=cparentobj;
  var cstr="this.parentElement.parentElement.currentJiuQiWebTableViewObj.mainTableHome";
  var myeventstr="onmousemove='"+cstr+".onMouseMove()' onmousedown='"+cstr+".onMouseDown()' onmouseup='"+cstr+".onMouseUp()'";
  myeventstr="onmouseup='"+cstr+".onMouseUp()' onkeydown='//return "+cstr+".inputRange.onInputTextKeyDown()' onkeyup='"+cstr+".inputRange.onInputTextKeyUp()' onpaste='return "+cstr+".inputRange.onInputTextPaste()' oncopy='return "+cstr+".inputRange.onInputTextCopy()' oncut='return "+cstr+".inputRange.onInputTextCut()'  onclick='return "+cstr+".inputRange.onInputTextClick();' ondblclick='return "+cstr+".inputRange.onInputTextDBLClick();'";
  //var cinput="<input type=text class='JiuQiWebTableInputRange' style='position:absolute;display:none;z-index:11;border-style:solid;border-width:2px;background-color:transparent' " + myeventstr + " >";
  var cinput="<TEXTAREA class='JiuQiWebTableInputRange' style='position:absolute;display:none;z-index:11;border-style:solid;border-width:1px;background-color:transparent' " + myeventstr + " style='overflow:hidden'></TEXTAREA>";
  this.onInputTextKeyDown=JiuQiWebTableInputRangeOnKeyDown;
  this.onInputTextKeyUp=JiuQiWebTableInputRangeOnKeyUp;
  this.inputText=document.createElement(cinput);
  //this.inputText.attachEvent("onkeydown",this.onInputTextKeyDown);
  this.inputText.homeObj=this;
  this.parentObj.parentObj.workPanel.appendChild(this.inputText);
  this.outFromTd=JiuQiWebTableInputRangeOutFromTd;
  this.gotoTD=JiuQiWebTableInputRangeGotoTD;
  this.cTD=null;
  this.inputText.mainTableHomeObj=this.parentObj;
  this.inputText.stillShow=false;
  this.setActive=JiuQiWebTableInputRangeSetActive;
  this.onInputTextLeave=null;
  this.onInputTextCome=null;
  this.onInputTextComeEnd=null;
  this.onInputTextComeForAll=null;
  this.nextTdClick=JiuQiWebTableInputRangeNextTdClick;
  this.onInputTextPaste=JiuQiWebTableInputRangePaste;
  this.onPasteOver=null;
  this.onCutOver=null;
  this.onDelOver=null;
  this.onInputTextCopy=JiuQiWebTableInputRangeCopy;
  this.onInputTextCut=JiuQiWebTableInputRangeCut;
  this.onInputTextDel=JiuQiWebTableInputRangeDel;
  this.onInputTextClick=JiuQiWebTableInputRangeClick;
  this.onInputTextDBLClick=JiuQiWebTableInputRangeDBLClick;
  this.onInputTextChanged=null;
  this.onInputKeyDown=null;
  this.onInputKeyUp=null;
  this.onTdMouseDown=null;
  this.onDBLClick=null;
  this.setHeadTableTdValue=JiuQiWebTableInputRangeCutSetHeadTableTdValue;
  this.lastLx=1;
  this.lastLy=1;
  this.formatData=null;
  this.disFormatData=null;
  this.defaultformatData=JiuQiWebTableInputRangeFormatData;
  this.defaultdisFormatData=JiuQiWebTableInputRangeDisFormatData;
  this.formatTdText=JiuQiWebTableInputRangeFormatTdText;  //单元格是数值类型时格式化
  this.disFormatTdText=JiuQiWebTableInputRangeDisFormatTdText;
  this.setTdText=JiuQiWebTableInputRangeSetTdText;
  this.onSetTdValue=null;
  this.getTdText=JiuQiWebTableInputRangeGetTdText;
  this.onDocumentKeyDown=JiuQiWebTableOnDocumentKeyDown;
  this.judgCanSelect=JiuQiWebTableInputRangeJudgCanSelect;
  this.fontFitAuto=JiuQiWebTableInputRangeFontFitAuto;
  this.getTdFitWidth=JiuQiWebTableInputRangeGetTdFitWidth;
}
function JiuQiWebTableInputRangeFormatTdText(ctd,cvalue){
var revalue=TrimStr(cvalue);

//    if(this.formatData!=null){
//      revalue=this.formatData(ctd,revalue);
//    }else{
//      revalue=this.defaultformatData(revalue,2);
//    }

  return revalue;
}
function JiuQiWebTableInputRangeDisFormatTdText(ctd,cvalue){
  var revalue=TrimStr(cvalue);
  if(this.disFormatData!=null){
    //revalue=this.disFormatData(ctd,revalue);
  }else{
    //revalue=this.defaultdisFormatData(revalue);
  }
  return revalue;
}
function JiuQiWebTableInputRangeFormatData(a,b){
  if(isNaN(a))return a;
  if(a=="") return a;
  window.my_restr="";
  vbfun="my_restr=FormatNumber('" + a + "'," + b + ",-1,0,-1)";
  window.execScript (vbfun,"VBscript");
  return my_restr;
}

function JiuQiWebTableInputRangeDisFormatData(a){
  var restr="";
  if(a=="")return "";
  for(var i=0;i<a.length;i++){
        if(a.charAt(i)!=","){
          restr+=a.charAt(i);
        }
  }
  return restr;
}
function JiuQiWebTableInputRangeCutSetHeadTableTdValue(ctd){
  if(ctd==null) return;
  var ctable =this.parentObj.mainTable;
  var rowheadt=this.parentObj.rowHeadTable;
  var colheadt=this.parentObj.colHeadTable;
  var twoheadt=this.parentObj.twoHeadTable;
  var rh=this.parentObj.parentObj.lockColHead;
  var ch=this.parentObj.parentObj.lockRowHead;
  var lx=parseInt(ctd.lx);
  var cellindex=ctd.cellIndex;
  var ly=ctd.parentElement.rowIndex;
  var ccell=null;
  var custtable=null;
  if(lx<=rh && ly<=ch){
    custtable=twoheadt;
  }else{
    if(lx<=rh){
       custtable=rowheadt;
    }
    if(ly<=ch){
       custtable=colheadt;
    }
  }
  try{
  ccell=custtable.rows[ly].cells[cellindex];
  }catch(e){}
  if(ccell!=null){
    ccell.innerText=ctd.innerText;
  }
}
function JiuQiWebTableInputRangeOutFromTd(){
  var returnsign=true;
  if(this.cTD==null) return returnsign;
  if(this.inputText.style.display=="none") return returnsign;
  var cvalue=this.inputText.value;
  returnsign=this.setTdText(this.cTD,cvalue,true);
  if(!returnsign){
    var confirmV=confirm(this.cTD.errorMessage);
    this.inputText.focus();
    this.inputText.select();
    this.lastLx=parseInt(this.cTD.lx);
    this.lastLy=this.cTD.parentElement.rowIndex;
    return false;
  }else{
    this.cTD.errorMessage="";
  }
  if(this.onInputTextLeave!=null) this.onInputTextLeave(this.cTD);
  if(this.cTD.fft=="1"){
    this.fontFitAuto(this.cTD,this.inputText);
  }
  this.inputText.style.display="none";
  this.setHeadTableTdValue(this.cTD);
  return returnsign;
  this.parentObj.parentObj.tableIsChange=true;
}
function JiuQiWebTableInputRangeFontFitAuto(ctd,inputText){
  var thisInputObj=inputText;
  if(ctd.noWrap){
    if(typeof(window.testInputText)=='undefined'){
       var cInputText=document.createElement("<input type=text style='position:absolute;display:none'>");
       document.body.appendChild(cInputText);
       window.testInputText=cInputText;
    }
    thisInputObj=window.testInputText;
    thisInputObj.style.display="";
    if(ctd.currentStyle.fontSize==""){
      ctd.runtimeStyle.fontSize='9pt';
    }
    thisInputObj.style.fontSize=ctd.currentStyle.fontSize;
    thisInputObj.runtimeStyle.fontSize=ctd.currentStyle.fontSize;
    thisInputObj.style.width=ctd.offsetWidth;
    thisInputObj.style.height=ctd.offsetHeight;
    thisInputObj.value=ctd.innerText;
    if(thisInputObj.value==" ") thisInputObj.value="";
  }
  var ctdWidth=parseInt(ctd.offsetWidth)-1;
  if(thisInputObj.tagName=='INPUT') ctdWidth+=0;
  var myRange=thisInputObj.createTextRange() ;
  if(myRange.boundingWidth >ctd.offsetWidth-1 || myRange.boundingHeight>ctd.offsetHeight){
    while((myRange.boundingWidth >ctdWidth || myRange.boundingHeight >ctd.offsetHeight)&&parseInt(thisInputObj.runtimeStyle.fontSize)>0) {
      thisInputObj.runtimeStyle.fontSize=parseInt(thisInputObj.runtimeStyle.fontSize)-1;
    }
    ctd.runtimeStyle.fontSize=thisInputObj.runtimeStyle.fontSize;
  }else{
    if(ctd.currentStyle.fontSize=="") ctd.runtimeStyle.fontSize='9pt';
    while((myRange.boundingWidth <ctdWidth && myRange.boundingHeight <ctd.offsetHeight)&&parseInt(thisInputObj.runtimeStyle.fontSize)<parseInt(ctd.currentStyle.fontSize)) {
      thisInputObj.runtimeStyle.fontSize=parseInt(thisInputObj.runtimeStyle.fontSize)+1;
    }
    ctd.runtimeStyle.fontSize=thisInputObj.runtimeStyle.fontSize;
  }
  if(ctd.noWrap){
    thisInputObj.style.display="none";
  }
  var rowheadt=this.parentObj.rowHeadTable;
  var colheadt=this.parentObj.colHeadTable;
  var twoheadt=this.parentObj.twoHeadTable;
  var tables=[rowheadt,colheadt,twoheadt];
  for(var i=0;i<tables.length;i++){
    var myTable=tables[i];
    if(myTable.rows.length==0) continue;
    if(ctd.cellIndex<myTable.rows[0].cells.length && ctd.parentElement.rowIndex<myTable.rows.length){
      var theSaveCell=myTable.rows[ctd.parentElement.rowIndex].cells[ctd.cellIndex];
      if(typeof(theSaveCell)!="undefined")
      theSaveCell.runtimeStyle.fontSize=ctd.runtimeStyle.fontSize;
    }
  }
}
function JiuQiWebTableInputRangeGetTdFitWidth(ctd,inputText){
  var thisInputObj=inputText;
  if(ctd.noWrap){
    if(typeof(window.testInputText)=='undefined'){
       var cInputText=document.createElement("<input type=text style='position:absolute;display:none'>");
       document.body.appendChild(cInputText);
       window.testInputText=cInputText;
    }
    thisInputObj=window.testInputText;
    thisInputObj.style.display="";
    if(ctd.style.fontSize==""){
      ctd.style.fontSize='9pt';
    }
    thisInputObj.style.fontSize=ctd.style.fontSize;
    thisInputObj.runtimeStyle.fontSize=ctd.style.fontSize;
    ctd.runtimeStyle.fontSize=ctd.style.fontSize;
    thisInputObj.style.width=ctd.offsetWidth;
    thisInputObj.style.height=ctd.offsetHeight;
    thisInputObj.value=ctd.innerText;
    if(thisInputObj.value==" " || thisInputObj.value=="") {
      thisInputObj.style.display="none";
      return -1;
    }
    var myRange=thisInputObj.createTextRange() ;
    var returnInt=parseInt(myRange.boundingWidth);
    thisInputObj.style.display="none";
    return returnInt + 4;
  }else{
    if(ctd.style.fontSize=="") ctd.style.fontSize='9pt';
    ctd.runtimeStyle.fontSize=ctd.style.fontSize;
    thisInputObj.style.display="";
    thisInputObj.runtimeStyle.fontSize=ctd.style.fontSize;
    thisInputObj.style.width=ctd.offsetWidth;
    thisInputObj.style.height=ctd.offsetHeight;
    thisInputObj.value=ctd.innerText;
    if(thisInputObj.value==" " || thisInputObj.value=="") {
      thisInputObj.style.display="none";
      return -1;
    }
    var myRange=thisInputObj.createTextRange() ;
    var boundingWidth=parseInt(myRange.boundingWidth);
    var boundingHeight=parseInt(myRange.boundingHeight);
    var lx_=parseInt(ctd.lx);
    var colHeadCell=ctd.parentElement.parentElement.parentElement.rows[0].cells[lx_];
    var oldWidth=parseInt(colHeadCell.width);
    var oldHeight=parseInt(ctd.offsetHeight);
    if(boundingWidth>oldWidth || boundingHeight>oldHeight){
      while(parseInt(myRange.boundingWidth)>parseInt(ctd.offsetWidth) || parseInt(myRange.boundingHeight)>parseInt(ctd.offsetHeight)) {
        colHeadCell.width=parseInt(colHeadCell.width)+2;
        thisInputObj.style.width=ctd.offsetWidth;
        //thisInputObj.style.height=ctd.offsetHeight;
      }
      var returnInt=parseInt(colHeadCell.width);
      colHeadCell.width=oldWidth;
      thisInputObj.style.display="none";
      return returnInt + 4;
    }else{
      while(parseInt(myRange.boundingWidth)<parseInt(ctd.offsetWidth) && parseInt(myRange.boundingHeight)<parseInt(ctd.offsetHeight)) {
        colHeadCell.width=parseInt(colHeadCell.width)-2;
        thisInputObj.style.width=ctd.offsetWidth;
        //thisInputObj.style.height=ctd.offsetHeight;
      }
      var returnInt=parseInt(colHeadCell.width);
      colHeadCell.width=oldWidth;
      thisInputObj.style.display="none";
      return returnInt + 4;
    }
  }
}

function JiuQiWebTableInputRangeSetTdText(ctd,cv,sign){
    var cvalue=cv;
    var returnsign=true;
    var cvalue2=this.formatTdText(ctd,cvalue);
    if(typeof(cvalue2)=="number"){

    }else
    if(cvalue2=="") cvalue2=" ";
    if(this.onSetTdValue!=null) {
      try{
      this.onSetTdValue(ctd,cvalue);
      }catch(e){}
    }else{
      ctd.innerText=cvalue2;
    }
    var clx=ctd.lx;
    var cly=ctd.parentElement.rowIndex;
    try{
    if(clx<=this.parentObj.parentObj.lockColHead){
      this.parentObj.rowHeadTable.rows[cly].cells[ctd.cellIndex].innerHTML=ctd.innerHTML;
    }
    if(cly<=this.parentObj.parentObj.lockRowHead){
      this.parentObj.colHeadTable.rows[cly].cells[ctd.cellIndex].innerHTML=ctd.innerHTML;
    }
    if(clx<=this.parentObj.parentObj.lockColHead && cly<=this.parentObj.parentObj.lockRowHead){
      this.parentObj.twoHeadTable.rows[cly].cells[ctd.cellIndex].innerHTML=ctd.innerHTML;
    }
    }catch(e){}
    if(this.onInputTextChanged!=null) {
      returnsign=this.onInputTextChanged(ctd,cvalue,sign);
    }
    if(!returnsign) return false;
    return true;
}
function JiuQiWebTableInputRangeGotoTD(ctdobj){
  if(ctdobj==null) return false;
  this.cTD=ctdobj;
  var retrunsign=true;
  if(!this.parentObj.parentObj.isDesignMode){
        if(this.cTD.isMode && !cobj.mainTableHome.isReadOnly) return false;
	if(this.parentObj.isReadOnly) return false;
	if(ctdobj.rOC=="1") return true;
	if(this.parentObj.cellCanEdit!=null){
	  retrunsign=this.parentObj.cellCanEdit(ctdobj);
	}
	if(retrunsign) {
	  if(this.onInputTextCome!=null){
	    this.onInputTextCome(ctdobj);
	  }
	}else{
	  return false;
	}
  }
  if(this.onInputTextComeForAll!=null){
    this.onInputTextComeForAll(ctdobj);
  }
  if(this.lastLx<parseInt(ctdobj.lx) || this.lastLx>parseInt(ctdobj.lx)+ctdobj.colSpan-1 || this.lastLy<ctdobj.parentElement.rowIndex || this.lastLy>ctdobj.parentElement.rowIndex + ctdobj.rowSpan-1){
    this.lastLx=parseInt(ctdobj.lx);
    this.lastLy=ctdobj.parentElement.rowIndex;
  }
  this.inputText.style.display="";
  var inputcolor="";
  if(this.cTD.runtimeStyle.backgroundColor!=""){
    inputcolor=this.cTD.runtimeStyle.backgroundColor;
  }else{
    if(this.cTD.style.backgroundColor!=""){
      if(this.cTD.style.backgroundColor!="transparent")
      inputcolor=this.cTD.style.backgroundColor;
    }else{
      if(this.cTD.bgColor!=""){
        inputcolor=this.cTD.bgColor;
      }
    }
  }
  this.inputText.style.backgroundColor=inputcolor;
  cvalue=this.getTdText(this.cTD);
  //cvalue=this.cTD.innerText;
  if(cvalue==" ") cvalue="";
  this.inputText.value=cvalue;
  this.inputText.style.left=this.cTD.offsetLeft+parseInt(this.parentObj.mainTable.style.left)+0;
  this.inputText.style.top=this.cTD.offsetTop-1+parseInt(this.parentObj.mainTable.style.top)+0;
  this.inputText.style.height=this.cTD.clientHeight+2;
  this.inputText.style.width=this.cTD.clientWidth;
  if(this.cTD.currentStyle.fontSize=="") this.cTD.runtimeStyle.fontSize='9pt';
  this.inputText.runtimeStyle.fontSize=this.cTD.currentStyle.fontSize;
  //this.inputText.scrollIntoView();
  if(!this.parentObj.parentObj.isDesignMode){
    if(!this.parentObj.isReadOnly){
      if(this.onInputTextComeEnd !=null) {
        if(ctdobj.rOC!="1")
        this.onInputTextComeEnd(this.cTD);
      }
    }
  }
  return true;
}
function JiuQiWebTableInputRangeGetTdText(ctd){
  var cvalue=ctd.innerText;
  cvalue=this.disFormatTdText(ctd,cvalue);
  if(cvalue==" ") cvalue="";
  return cvalue;
}
function JiuQiWebTableInputRangeSetActive(){//把选择区域激活
  var cfocusobj=null;
  if(this.inputText.style.display=="none") {
     var csindex=this.parentObj.workControlObj.currentSelectIndex;
     if(csindex<0) return;
     //if(csindex>0) {
       //alert("复制选择区域不支持复选区域复制！");
       //return;
     //}
     var mydiv=this.parentObj.workControlObj.selecteddiv[csindex];
     cfocusobj=mydiv;
  }else{
    //this.inputText.focus();
    //this.inputText.select();
    cfocusobj=this.inputText;
  }
  //if(cfocusobj!=null && this.inputText.style.display==""){
  if(cfocusobj!=null ){
    var ctable =this.parentObj.mainTable;
    var rowheadt=this.parentObj.rowHeadTable;
    var colheadt=this.parentObj.colHeadTable;
    var twoheadt=this.parentObj.twoHeadTable;
    var cworkPanel=this.parentObj.parentObj.workPanel;
    if(this.inputText==cfocusobj){
        cfocusobj.focus();
        cfocusobj.select();
    }else{

    }
    if(parseInt(cfocusobj.style.left)<(parseInt(cworkPanel.scrollLeft)+parseInt(rowheadt.clientWidth)) ){
      if(rowheadt.style.display!="none"){
       // if(parseInt(rowheadt.style.left)>parseInt(cworkPanel.scrollLeft)+parseInt(cworkPanel.style.left)){
          cworkPanel.scrollLeft=parseInt(cfocusobj.style.left)-parseInt(rowheadt.clientWidth);
       // }
      }
    }

    if(parseInt(cfocusobj.style.top)<(parseInt(cworkPanel.scrollTop)+parseInt(colheadt.clientHeight))){
      if(colheadt.style.display!="none"){
		//if(parseInt(rowheadt.style.top)>parseInt(cworkPanel.scrollTop)+parseInt(cworkPanel.style.top)) {
          cworkPanel.scrollTop=parseInt(cfocusobj.style.top)-parseInt(colheadt.clientHeight);
        //}
      }
    }
  }
}
function JiuQiWebTableInputRangeClick(){
  window.clearTimeout(window.jiuqiSetTimeOutForSerchZB);
  return false;
}
function JiuQiWebTableInputRangeDBLClick(){
  if(this.onDBLClick!=null){
    this.onDBLClick(this.cTD);
  }
}
function JiuQiWebTableInputRangeJudgCanSelect(){
      var textRanges=document.selection.createRange();
      var selectedAll=true;
      if(document.selection.type=="Text"){
		if(textRanges.length>0) {
		  selectedAll=(textRanges[0].text==this.inputText.value);
		}
		if(this.inputText.value=="") {
		  selectedAll=true;
		}
      }else{
		if(this.inputText.value!="") {
		  selectedAll=false;
		}
      }
      return selectedAll;
}
function JiuQiWebTableInputRangeOnKeyDown(){
  window.clearTimeout(window.jiuqiSetTimeOutForSerchZB);
  var ctd=this.cTD;
  var keycode=event.keyCode;
  var ctext=event.srcElement;
  var mycell=ctd;
  var ctable=this.parentObj.mainTable;
  var arrowTo="";
  var returnValue=true;
  if(typeof(this.parentObj.parentObj.inputTextdir)!='undefined'){
    arrowTo=this.parentObj.parentObj.inputTextdir;
  }
  if(!(arrowTo=="down" || arrowTo=="up" || arrowTo=="left" || arrowTo=="right")){
    arrowTo="down";
  }
  switch (keycode)
  {
    case 37:
      if(this.judgCanSelect() && !event.shiftKey){
        this.nextTdClick(this.lastLx,this.lastLy,"left");
      }
      break;
    case 38:
      if(this.judgCanSelect()){
        this.nextTdClick(this.lastLx,this.lastLy,"up");
      }
      break;
    case 13:
      if(event.shiftKey){
        return true;
        break;
      }
      this.nextTdClick(this.lastLx,this.lastLy,arrowTo);
      return false;
      break;
    case 27:
      this.outFromTd();
      this.parentObj.workControlObj.hiddeAll();
      this.parentObj.workControlObj.currentSelectIndex=-1;
      break;
    case 39:
      if(this.judgCanSelect() && !event.shiftKey){
        this.nextTdClick(this.lastLx,this.lastLy,"right");
      }
      break;
    case 40:
      if(this.judgCanSelect()&& !event.shiftKey){
        this.nextTdClick(this.lastLx,this.lastLy,"down");
      }
      break;
    case 99:
      if(event.ctrlKey ) this.onInputTextCopy();
      break;
    case 120:
      if(event.ctrlKey ) this.onInputTextCut();
      break;
    case 46:
      this.onInputTextDel();
      break;
    case 65:
      if(event.ctrlKey ) {
        if(document.selection.type=="Text"){
          var rangeCollection=document.selection.createRange();
          var selectText="";
          if(rangeCollection.length>0) {
            selectText=rangeCollection[0].text;
          }else{
            selectText=rangeCollection.text;
          }
          if(selectText!=this.inputText.value && this.inputText.value!="") returnTrue= true;
        }
        if(document.selection.type=="None" && this.inputText.value!="") returnTrue= true;
        window.jiuqiWebTableViewObj.mainTableHome.workControlObj.hiddeAll();
        window.jiuqiWebTableViewObj.mainTableHome.onMouseDown(cobj.mainTableHome.mainTable.rows[1].cells[1]);
        var lastRowIndex=cobj.mainTableHome.mainTable.rows.length-1;
        var lastCellIndex=cobj.mainTableHome.mainTable.rows[lastRowIndex].cells.length-1;
        window.jiuqiWebTableViewObj.mainTableHome.onMouseUp(cobj.mainTableHome.mainTable.rows[lastRowIndex].cells[lastCellIndex]);
        return false;
      }
      break;
    default:
      if(this.onInputKeyDown!=null){
        var userFunReturn=this.onInputKeyDown(ctd);
        if(!userFunReturn) returnValue= false;
      }
  }
  return returnValue;
}
function JiuQiWebTableInputRangeOnKeyUp(){
  window.clearTimeout(window.jiuqiSetTimeOutForSerchZB);
  var ctd=this.cTD;
  var keycode=event.keyCode;
  switch (keycode)
  {
    case 37:
      break;
    case 38:
      break;
    case 13:
      break;
    case 27:
      break;
    case 39:
      break;
    case 40:
      break;
    case 67:
      break;
    case 99:
      break;
    case 88:
      break;
    case 120:
      break;
    case 46:
      //this.onInputTextCut(true);
      break;
    default:
      if(this.onInputKeyUp!=null){
        this.onInputKeyUp(ctd,this.inputText.value);
      }
  }
}
function JiuQiWebTableOnDocumentKeyDown(){
  var cinputText=window.jiuqiWebTableViewObj.mainTableHome.inputRange.inputText;
  var keycode=event.keyCode;
  if(cinputText.style.display=="" && cinputText==document.activeElement && event.srcElement==cinputText) {
    if(event.type=="keypress" ) {
      return window.jiuqiWebTableViewObj.mainTableHome.inputRange.onInputTextKeyDown();
    }else
    if(event.type=="keydown" ) {
      if(keycode>=37 && keycode<=40){
        return window.jiuqiWebTableViewObj.mainTableHome.inputRange.onInputTextKeyDown();
      }
    }
  }
  if(event.type=="keydown"){
  switch (keycode)
  {
    case 67:
      if(event.ctrlKey ) window.jiuqiWebTableViewObj.mainTableHome.inputRange.onInputTextCopy();
      break;
    case 99:
      if(event.ctrlKey ) window.jiuqiWebTableViewObj.mainTableHome.inputRange.onInputTextCopy();
      break;
    case 88:
      if(event.ctrlKey ) window.jiuqiWebTableViewObj.mainTableHome.inputRange.onInputTextCut();
      break;
    case 120:
      if(event.ctrlKey ) window.jiuqiWebTableViewObj.mainTableHome.inputRange.onInputTextCut();
      break;
    case 86:
      if(event.ctrlKey ) window.jiuqiWebTableViewObj.mainTableHome.inputRange.onInputTextPaste();
      break;
    case 46:
      window.jiuqiWebTableViewObj.mainTableHome.inputRange.onInputTextDel();
      break;
    case 65:
      if(event.ctrlKey ) {
        window.jiuqiWebTableViewObj.mainTableHome.workControlObj.hiddeAll();
        window.jiuqiWebTableViewObj.mainTableHome.onMouseDown(window.jiuqiWebTableViewObj.mainTableHome.mainTable.rows[1].cells[1]);
        var lastRowIndex=window.jiuqiWebTableViewObj.mainTableHome.mainTable.rows.length-1;
        var lastCellIndex=window.jiuqiWebTableViewObj.mainTableHome.mainTable.rows[lastRowIndex].cells.length-1;
        window.jiuqiWebTableViewObj.mainTableHome.onMouseUp(window.jiuqiWebTableViewObj.mainTableHome.mainTable.rows[lastRowIndex].cells[lastCellIndex]);
        //return false;
        return ;
      }
      break;
    case 27:
      window.jiuqiWebTableViewObj.mainTableHome.workControlObj.hiddeAll();
      break;
  }
  }
  return ;
}
function JiuQiWebTableInputRangeNextTdClick(lx,ly,arrowTo){
    try{
      if(event.button==1) return;
    }catch(e) {}
    var ctd=this.parentObj.workControlObj.getCellByLxy(lx,ly,1);
    var ctr=this.parentObj.mainTable.rows[ly];
    //var ctdindex=ctd.cellIndex;
    var ctdindex=parseInt(lx);
    var cTable=ctr.parentElement;
    var ctrindex=ly;
    var theight=cTable.rows.length;
    var nextTd,nexttdindex,nexttrindex;
    switch(arrowTo){
    case "left":
        if(ctdindex==0){
                if(ctrindex==0){
                        nexttrindex=cTable.lastChild.rowIndex;
                }else{
                        nexttrindex=ctrindex-1;
                }
                nexttdindex=this.parentObj.mainTableWidth-1;
        }else{
                nexttrindex=ctrindex;
                nexttdindex=ctdindex-1;
        }
        break;
    case "right":
        if(parseInt(ctd.lx)+ ctd.colSpan-1==this.parentObj.mainTableWidth-1){
                if(ctd.parentElement==cTable.lastChild){
                        nexttrindex=0;
                }else{
                        nexttrindex=ctrindex+1;
                }
                nexttdindex=0;
        }else{
                nexttrindex=ctrindex;
                nexttdindex=ctdindex+1;
        }
        break;
    case "up":
        if(ctd.parentElement==cTable.firstChild){
                if(ctdindex==0){
                        nexttdindex=this.parentObj.mainTableWidth-1;
                }else{
                        nexttdindex=ctdindex-1;
                }
                nexttrindex=cTable.rows.length-1;
        }else{
                nexttrindex=ctrindex-1;
                nexttdindex=ctdindex;
        }

        break;
    case "down":
        if((ctd.parentElement.rowIndex+ctd.rowSpan)>=cTable.rows.length){
                if(parseInt(ctd.lx)+ ctd.colSpan-1==this.parentObj.mainTableWidth-1){
                        nexttdindex=0;
                }else{
                        nexttdindex=ctdindex+1;
                }
                nexttrindex=0;
        }else{
                nexttrindex=ctrindex+1;
                nexttdindex=ctdindex;
        }
        break;
    }
    nextTd=this.parentObj.workControlObj.getCellByLxy(nexttdindex,nexttrindex,0);
    if(nextTd==null){
      this.lastLx=nexttdindex;
      this.lastLy=nexttrindex;
      this.nextTdClick(nexttdindex,nexttrindex,arrowTo);
      return;
    }
    if(!(this.lastLx<parseInt(nextTd.lx) || this.lastLx>parseInt(nextTd.lx)+nextTd.colSpan-1 || this.lastLy<nextTd.parentElement.rowIndex || this.lastLy>nextTd.parentElement.rowIndex + nextTd.rowSpan-1)){
      this.nextTdClick(nexttdindex,nexttrindex,arrowTo);
      return;
    }
    this.lastLx=nexttdindex;
    this.lastLy=nexttrindex;
    if(nextTd.cellIndex==0 || nextTd.parentElement.rowIndex==0) {
      //event.shiftKey=false;
      //event.ctrlKey=false;
      this.nextTdClick(nexttdindex,nexttrindex,arrowTo);
      return;
    }
    if(nextTd==this.cTD) {
      this.parentObj.onMouseDown(nextTd);
      this.parentObj.onMouseUp(nextTd);
      return;
    }else{
      var clickreturn=true;
      if(this.parentObj.cellCanEdit!=null){
        clickreturn=this.parentObj.cellCanEdit(nextTd);
      }
      if(!clickreturn && !this.parentObj.parentObj.isDesignMode) {
        window.jiuqiSetTimeOutForSerchZB=window.setTimeout("window.jiuqiWebTableViewObj.mainTableHome.inputRange.nextTdClick("+ nexttdindex + "," + nexttrindex + ",'" + arrowTo + "')",0);
        //this.nextTdClick(nexttdindex,nexttrindex,arrowTo);
        return;
      }else{
        this.parentObj.onMouseDown(nextTd);
        this.parentObj.onMouseUp(nextTd);
        window.inputTextFocusAndSelect=window.setTimeout("window.jiuqiWebTableViewObj.mainTableHome.inputRange.inputText.select()",0);
        //this.inputText.focus();
        //this.inputText.select();
        return;

      }
    }
}
function JiuQiWebTableInputRangePaste(){
  var returnTrue=false;
  if(this.inputText.style.display==""){
  if(document.selection.type=="Text"){
    var rangeCollection=document.selection.createRange();
    var selectText="";
    if(rangeCollection.length>0) {
      selectText=rangeCollection[0].text;
    }else{
      selectText=rangeCollection.text;
    }
    if(selectText!=this.inputText.value && this.inputText.value!="") returnTrue= true;
  }
  if(document.selection.type=="None" && this.inputText.value!="") returnTrue= true;
  }
  var clipboardtext=window.clipboardData.getData("Text");
  var rows=clipboardtext.split("\r\n");
  if(returnTrue && rows.length==2 && rows[1]=="") return true;
  //for(var i=0;i<clipboardtext.length;i++){
    //alert(clipboardtext.charCodeAt(i));
  //}
  var csindex=this.parentObj.workControlObj.currentSelectIndex;
  if(csindex<0) return false;
  if(csindex>0) {
    alert("粘贴选择区域不支持复选区域粘贴！");
    return false;
  }
  var mydiv=this.parentObj.workControlObj.selecteddiv[csindex];
  var c1=mydiv.lx1,c2=mydiv.lx2,r1=mydiv.ly1;r2=mydiv.ly2;
  var cly=r1;
  var ctd=this.parentObj.workControlObj.getCellByLxy(c1,r1,1);
  if((c1+parseInt(ctd.colSpan)-1)==c2 && (r1+parseInt(ctd.rowSpan)-1)==r2){
    if(ctd!=null){
      if(ctd.noWrap==false){
        var canInputOneCell=true;
        if(this.parentObj.cellCanEdit!=null){
	  canInputOneCell=this.parentObj.cellCanEdit(ctd);
	}
        try{
          if(ctd.dT!=_ftString) canInputOneCell=false;
        }catch(e){}
        if(canInputOneCell){
	  ctd.innerText=clipboardtext;
	  return;
        }
      }
    }
  }
  var allChangeCells=[];
  for(var i=0;i<rows.length;i++){
    var clx=c1;
    if(rows[i].length>0){
      cells=rows[i].split("\t");
      for(var j=0;j<cells.length;j++){
        var ccell=this.parentObj.workControlObj.getCellByLxy(clx,cly,0);
        if(ccell!=null) {
          var clickreturn=true;
          if(this.parentObj.cellCanEdit!=null){
            clickreturn=this.parentObj.cellCanEdit(ccell);
          }
          if(clickreturn){
            var cvalue=cells[j];
            if(cvalue=="") cvalue=" " ;
            this.setTdText(ccell,cvalue,false);
	    var inputTextValue=ccell.innerText;
	    if(inputTextValue==" ") inputTextValue="";
            if(ccell==ctd){
              this.inputText.value=inputTextValue;
              this.inputText.focus();
              this.inputText.select();
            }
            //ccell.innerText=cvalue;
            allChangeCells[allChangeCells.length]=cells[j];
          }
        }
        clx+=1;
      }
    }
    cly+=1;
  }
  if(this.onPasteOver!=null){
    this.onPasteOver(allChangeCells);
  }
  return false;
}
function JiuQiWebTableInputRangeCopy(){
  if(this.inputText.style.display==""){
  if(document.selection.type=="Text"){
    var rangeCollection=document.selection.createRange();
    var selectText="";
    if(rangeCollection.length>0) {
      selectText=rangeCollection[0].text;
    }else{
      selectText=rangeCollection.text;
    }
    if(selectText!=this.inputText.value && this.inputText.value!="") return true;
  }
  if(document.selection.type=="None" && this.inputText.value!="") return true;
  }
  var clipboardtext="";
  var csindex=this.parentObj.workControlObj.currentSelectIndex;
  if(csindex<0) return;
  if(csindex>0) {
    alert("拷贝选择区域不支持复选区域拷贝！");
    return false;
  }
  var mydiv=this.parentObj.workControlObj.selecteddiv[csindex];
  var c1=mydiv.lx1,c2=mydiv.lx2,r1=mydiv.ly1;r2=mydiv.ly2;
  var firstcell=this.inputText;
  var ctable=	this.parentObj.mainTable;
  var ccell=null;
  for(var i=r1;i<=r2;i++){
    for(var j=c1;j<=c2;j++){
      ccell=this.parentObj.workControlObj.getCellByLxy(j,i,0);
      if(ccell!=null){
        var cvalue="";
        if(ccell==firstcell){
          cvalue=this.inputText.value;
        }else{
          cvalue=this.getTdText(ccell);
        }
        if(cvalue==" ") cvalue="";
        clipboardtext+=cvalue ;
      }
      if(j<c2)
      clipboardtext+="\t";
    }
    if(i<r2)
    clipboardtext+="\r\n";
  }
  window.clipboardData.setData("Text",clipboardtext);
  return false;
}
function JiuQiWebTableInputRangeCut( delSign){
  if(this.inputText.style.display==""){
  if(document.selection.type=="Text"){
    var rangeCollection=document.selection.createRange();
    var selectText="";
    if(rangeCollection.length>0) {
      selectText=rangeCollection[0].text;
    }else{
      selectText=rangeCollection.text;
    }
    if(selectText!=this.inputText.value && this.inputText.value!="") return true;
  }
  if(document.selection.type=="None" && this.inputText.value!="") return true;
  }
  var clipboardtext="";
  var csindex=this.parentObj.workControlObj.currentSelectIndex;
  if(csindex<0) return;
  if(csindex>0) {
      alert("拷贝选择区域不支持复选区域拷贝！");
      return false;
  }
  var mydiv=this.parentObj.workControlObj.selecteddiv[csindex];
  var c1=mydiv.lx1,c2=mydiv.lx2,r1=mydiv.ly1;r2=mydiv.ly2;
  var firstcell=this.cTD;
  var ctable=	this.parentObj.mainTable;
  var ccell=null;
  var allChangeCells=[];
  for(var i=r1;i<=r2;i++){
    for(var j=c1;j<=c2;j++){
      ccell=this.parentObj.workControlObj.getCellByLxy(j,i,0);
      if(ccell!=null){
        var clickreturn=true;
        if(this.parentObj.cellCanEdit!=null){
          clickreturn=this.parentObj.cellCanEdit(ccell);
        }
        if(clickreturn){
          var cvalue="";
          if(ccell==firstcell){
            cvalue=this.inputText.value;
            this.inputText.value="";
          }else{
            cvalue=this.getTdText(ccell);
            this.setTdText(ccell,"",false);
          }
          if(typeof(judgeCellIsDict)!="undefined"){
            if(judgeCellIsDict!=null){
              if(judgeCellIsDict(ccell)){
                ccell.dictNodeValue="";
                ccell.dictNodeText="";
              }
            }
          }
          if(cvalue==" ") cvalue="";
          clipboardtext+=cvalue ;
          allChangeCells[allChangeCells.length]=ccell;
        }
      }
      if(j<c2)
      clipboardtext+="\t";
    }
    clipboardtext+="\r\n";
  }
  if(!delSign)
  window.clipboardData.setData("Text",clipboardtext);
  if(this.onCutOver!=null){
    this.onCutOver(allChangeCells);
  }
  return false;
}
function JiuQiWebTableInputRangeDel(){
  if(this.parentObj.isReadOnly) return;
  if(this.inputText.style.display==""){
  if(document.selection.type=="Text"){
    var rangeCollection=document.selection.createRange();
    var selectText="";
    if(rangeCollection.length>0) {
      selectText=rangeCollection[0].text;
    }else{
      selectText=rangeCollection.text;
    }
    if(selectText!=this.inputText.value && this.inputText.value!="") return true;
  }
  if(document.selection.type=="None" && this.inputText.value!="") return true;
  }
  var csindex=this.parentObj.workControlObj.currentSelectIndex;
  if(csindex<0) return;
  var allChangeCells=[];
  for(var divNo=csindex;divNo>=0;divNo--){
  var mydiv=this.parentObj.workControlObj.selecteddiv[divNo];
  var c1=mydiv.lx1,c2=mydiv.lx2,r1=mydiv.ly1;r2=mydiv.ly2;
  var firstcell=this.cTD;
  var ctable=	this.parentObj.mainTable;
  var ccell=null;
  for(var i=r1;i<=r2;i++){
    for(var j=c1;j<=c2;j++){
      ccell=this.parentObj.workControlObj.getCellByLxy(j,i,0);
      if(ccell!=null){
        var clickreturn=true;
        if(this.parentObj.cellCanEdit!=null){
          clickreturn=this.parentObj.cellCanEdit(ccell);
        }
        if(clickreturn){
          var cvalue="";
          if(ccell==firstcell){
            this.inputText.value="";
          }else{
            this.setTdText(ccell,"",false);
          }
          if(typeof(judgeCellIsDict)!="undefined"){
            if(judgeCellIsDict!=null){
              if(judgeCellIsDict(ccell)){
                ccell.dictNodeValue="";
                ccell.dictNodeText="";
              }
            }
          }
          allChangeCells[allChangeCells.length]=ccell;
        }
      }
    }
  }
  }
  if(this.onDelOver!=null){
    this.onDelOver(allChangeCells);
  }

}
function isWhChar(ch){if(ch==' '||ch=='\t'||ch=='\r'||ch=='\n')return 1;return 0;}
function TrimStr(str){
        if(typeof(str)=="undefined") return null;
        if(typeof(str)=="number") return str;
        if(str.indexOf(" ")==-1&&str.indexOf("\t")==-1&&str.indexOf("\r")==-1&&str.indexOf("\n")==-1) return str;
        var iBeg=0,iEnd=str.length;
        //while(iBeg<iEnd&&isWhChar(str.charAt(iBeg))) iBeg++;
        while(iEnd>iBeg&&isWhChar(str.charAt(iEnd-1))) iEnd--;//Note -1!
        if(iBeg==0&&iEnd==str.length) return str;
        return str.substring(iBeg,iEnd);
}
function getObjLeftToWin(obj){
  var returnLeft=obj.offsetLeft;
  var parentObj=obj.parentElement;
  while(parentObj!=document.body ){
    if(!(parentObj.tagName=="TR" )){
      returnLeft+=parentObj.offsetLeft;
    }
    parentObj=parentObj.parentElement
  }
  return returnLeft+document.body.clientLeft;
}
function getObjTopToWin(obj){
  var returnTop=obj.offsetTop;
  var parentObj=obj.parentElement;
  while(parentObj!=document.body ){
    //if(parentObj.style.position=="absolute"){
      //returnTop+=parseInt(parentObj.style.top);
      //return returnTop;
      //break;
    //}else
    if(!(parentObj.tagName=="TR" )){
      returnTop+=parentObj.offsetTop;
    }
    parentObj=parentObj.parentElement
  }
  return returnTop+document.body.clientTop;
}
function onCellBoundaryMouseDown(){
  var cBoundary=event.srcElement;
  cBoundary.mouseisdown=true;
}
function onCellBoundaryDblClick(){
  var cBoundary=event.srcElement;
  var ctd=cBoundary.resizeTd;
  var thisobj=cBoundary.jiuqiWebTableViewObj;
  var addWidth=thisobj.mainTableHome.setColAutoFit(ctd.cellIndex);
  if(addWidth!=0) {
    cBoundary.style.left=parseInt(cBoundary.style.left) + addWidth;
  }
  cBoundary.style.display="none";
}
function onCellBoundaryMouseMove(){
  var cBoundary=event.srcElement;
  if(cBoundary.mouseisdown){
    moveBoundary(cBoundary);
  }
}
function onCellBoundaryMouseUp(){//拖动调整行高、列宽
  var cBoundary=event.srcElement;
  var ctd=cBoundary.resizeTd;
  var ctable=ctd.parentElement.parentElement;
  var cWorkPanel=cBoundary.jiuqiWebTableViewObj.workPanel;
  var cWorkControlObj=cBoundary.jiuqiWebTableViewObj.mainTableHome.workControlObj;
  var rowheadt=cBoundary.jiuqiWebTableViewObj.mainTableHome.rowHeadTable;
  var colheadt=cBoundary.jiuqiWebTableViewObj.mainTableHome.colHeadTable;
  var twoheadt=cBoundary.jiuqiWebTableViewObj.mainTableHome.twoHeadTable;
  var tables=[cBoundary.jiuqiWebTableViewObj.mainTableHome.mainTable,rowheadt,colheadt,twoheadt];
  if(cBoundary.style.cursor=="w-resize"){
    var newWidth=event.clientX + getAllParentScrollLeft(cWorkPanel) -getObjLeftToWin(ctd);
    var addWidth=newWidth-parseInt(ctd.offsetWidth);
    if(newWidth<=5) newWidth=6;
    if(newWidth<=6 && ctd.cellIndex==ctable.rows[0].cells.length-1) newWidth=8;
    for(var i=0;i<tables.length;i++){
      cWorkControlObj.setColWidthByTable(tables[i],ctd.lx,newWidth,addWidth);
    }
    cBoundary.jiuqiWebTableViewObj.mainTableHome.setColFontAutoFit(parseInt(ctd.lx));
  }
  if(cBoundary.style.cursor=="s-resize"){
    var newHeight=event.clientY + getAllParentScrollTop(cWorkPanel) - getObjTopToWin(ctd);
    if(newHeight<=5) newHeight=6;
    if(newHeight<=6 && ctd.parentElement.rowIndex==ctable.rows.length-1) newHeight=8;
    var addHeight=newHeight-parseInt(ctd.offsetHeight);
    for(var i=0;i<tables.length;i++){
      cWorkControlObj.setRowHeightByTable(tables[i],ctd.parentElement.rowIndex,newHeight,addHeight);
    }
  }
  cBoundary.mouseisdown=false;
  //cBoundary.style.display="none";
}
function moveBoundary(cBoundary){
  var cmainTable=cBoundary.jiuqiWebTableViewObj.mainTableHome.mainTable;
  if(cBoundary.parentElement!=cBoundary.jiuqiWebTableViewObj.workPanel){
    cBoundary.jiuqiWebTableViewObj.workPanel.appendChild(cBoundary);
  }
  var cWorkPanel=cBoundary.jiuqiWebTableViewObj.workPanel;
  var xBrace=cBoundary.jiuqiWebTableViewObj.xBrace;
  var yBrace=cBoundary.jiuqiWebTableViewObj.yBrace;
  var width=cmainTable.offsetWidth;
  var height=cmainTable.offsetHeight;
  if(cBoundary.style.cursor=="w-resize"){
    cBoundary.style.height=height;
    cBoundary.style.width=4;
    cBoundary.style.top=cmainTable.style.top;
    cBoundary.style.left=event.clientX-getObjLeftToWin(cWorkPanel)-1+getAllParentScrollLeft(cWorkPanel);
    //scrollWorkPanle(cBoundary.style.left,0,cWorkPanel,xBrace);
    cBoundary.style.left=parseInt(cBoundary.style.left)+scrollWorkPanle(cBoundary.style.left,0,cWorkPanel,xBrace)[0];
  }
  if(cBoundary.style.cursor=="s-resize"){
    cBoundary.style.height=4;
    cBoundary.style.width=width;
    cBoundary.style.left=cmainTable.style.left;
    cBoundary.style.top=event.clientY-getObjTopToWin(cWorkPanel)-1+getAllParentScrollTop(cWorkPanel);
    //scrollWorkPanle(0,cBoundary.style.top,cWorkPanel,xBrace);
    cBoundary.style.top=parseInt(cBoundary.style.top)+scrollWorkPanle(0,cBoundary.style.top,cWorkPanel,yBrace)[1];
  }
  cmainTable=null;
}
function scrollWorkPanle(x,y,panle,brace){
    var re=[0,0];
    if(parseInt(x)>(panle.scrollWidth-20)){
      try{
        brace.style.width=parseInt(brace.style.width)+80;
      }catch(e){}
    }
    if(parseInt(x)>(panle.scrollLeft+panle.clientWidth -10)){
      panle.scrollLeft=parseInt(panle.scrollLeft)+40;
      re[0]=40;
    }
    if(parseInt(y)>(panle.scrollHeight-10)){
      try{
        brace.style.height=parseInt(brace.style.height)+80;
      }catch(e){}
    }
    if(parseInt(y)>(panle.scrollTop+panle.clientHeight -20)){
      panle.scrollTop=parseInt(panle.scrollTop)+40;
      re[1]=40;
    }
    return re;
}
function onWorkPanelMouseMove(workPanel){
  if(event.srcElement!=workPanel) return;
  var cBoundary=event.srcElement.currentJiuQiWebTableViewObj.cellBoundary;
  if((event.button==1) && cBoundary.mouseisdown) {
      moveBoundary(cBoundary);
   }
}
function getAllParentScrollLeft(cobj){
  var returnV=parseInt(cobj.scrollLeft);
  var parentObj=cobj.parentElement;
  while(parentObj!=document && parentObj!=null){
    returnV+=parseInt(parentObj.scrollLeft);
    parentObj=parentObj.parentElement;
  }
  return returnV;
}
function getAllParentScrollTop(cobj){
  var returnV=parseInt(cobj.scrollTop);
  var parentObj=cobj.parentElement;
  while(parentObj!=document && parentObj!=null){
    returnV+=parseInt(parentObj.scrollTop);
    parentObj=parentObj.parentElement;
  }
  return returnV;
}


