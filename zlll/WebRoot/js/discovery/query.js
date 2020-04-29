//扩展prototype的属性(用于删除数组值)
/**
  *  方法:Array.removeAt(Index) 
  *  功能:删除数组元素. 
  *  参数:Index删除元素的下标. 
  *  返回:在原数组上修改数组 
  */ 
Array.prototype.removeAt=function(Index) 
 { 
  if(isNaN(Index)||Index>this.length){return false;} 
  for(var i=0,n=0;i<this.length;i++) 
  { 
   if(this[i]!=this[Index]) 
   { 
       this[n++]=this[i] 
   } 
  } 
  this.length-=1 
 } 

/**                            
  *  方法:Array.remove(obj)      
  *  功能:删除数组元素.         
  *  参数:要删除的对象.     
  *  返回:在原数组上修改数组    
  */                            
                                
 Array.prototype.remove=function(obj) 
 { 
  if(null==obj){return;} 
  for(var i=0,n=0;i<this.length;i++) 
  { 
   if(this[i]!=obj) 
   { 
    this[n++]=this[i]; 
   } 
  } 
  this.length-=1 
 } 

if(typeof(PATH_PREFIX)=="undefined"){
	var PATH_PREFIX ="";
}
//要修改的模板编码
var templateCodeForUpdate = null;
//初始汇总列数组
var originalGatherColumns = new Array();
//报表汇总列数组
//var gatherColumns = [{name:"资金性质",sortNo:1,gatherColumnId:"fundtype20081"},{name:"支出功能分类",sql:"select t.code, t.name, t.equalcode from DW_2008_T_PUBFUNC t where t.code like '2%' and t.equalcode is null and length(code)<=${LENGTH} order by t.code",menuCode:"query1",acctYear:2008,sortNo:2,glColumn:"EXPFUNC",gatherColumnId:"expfunc20081",codeFormat:"3-2-2"},{name:"支出经济分类",sql:"select t.code, t.name, t.equalcode from DW_2008_T_PUBEXPECONORMIC t where t.equalcode is null and length(code)<=${LENGTH} order by t.code",menuCode:"query1",acctYear:2008,sortNo:3,glColumn:"EXPECONORMIC",gatherColumnId:"expeconormic20081",codeFormat:"3-2-2-2"},{name:"归口处室",sql:"SELECT t.code,t.name, t.equalcode FROM dw_2008_t_pubdepdivision t WHERE t.code <= 20 order by t.code",menuCode:"query1",acctYear:2008,sortNo:4,glColumn:"DEPARTMENTDIVISION",gatherColumnId:"departmentdivision20081"},{name:"管理处室",sql:"select t.code, t.name, t.equalcode from dw_2008_t_pubbdgdivision t order by t.code",menuCode:"query1",acctYear:2008,sortNo:5,glColumn:"BDGMANAGEDIVISION",gatherColumnId:"bdgmanagedivision20081"},{name:"单位",sql:"select t.code, t.name, t.equalcode from DW_2008_T_PUBAGENCY t where t.equalcode is null and length(code)<=${LENGTH} order by t.code",menuCode:"query1",acctYear:2008,sortNo:6,glColumn:"BDGAGENCY",gatherColumnId:"bdgagency20081",codeFormat:"3-3-3"},{name:"支出管理结构",sql:"select t.code, t.name, t.equalcode from dw_2008_t_pubincomeexpmanage t where t.code<>'0' and t.equalcode is null order by t.code",menuCode:"query1",acctYear:2008,sortNo:7,glColumn:"incomeexpmanage",gatherColumnId:"incomeexpmanage20081"},{name:"文号",sql:"select t.code, t.name, t.equalcode from DW_2008_T_PUBBDGDOCNO t where t.code<>'0' and equalcode is null order by t.code",menuCode:"query1",acctYear:2008,sortNo:8,glColumn:"BDGDOCNO",gatherColumnId:"bdgdocno20081"},{name:"项目",sql:"select t.code, t.name, t.equalcode from dw_2008_t_pubprogram t where t.code<>'0' and t.equalcode is null order by t.code",menuCode:"query1",acctYear:2008,sortNo:9,glColumn:"PROGRAM",gatherColumnId:"program20081"},{name:"预算来源",sql:"SELECT t.code,t.name, t.equalcode FROM DW_2008_T_PUBFUNDSOURCE t order by t.code",menuCode:"query1",acctYear:2008,sortNo:10,glColumn:"FUNDSOURCE",gatherColumnId:"fundsource20081"},{name:"文号时间",sql:"select t.code, t.startdate as name, t.equalcode from DW_2008_T_PUBBDGDOCNO t where t.code<>'0' and equalcode is null order by t.code",menuCode:"query1",acctYear:2008,sortNo:11,glColumn:"BDGDOCNO",gatherColumnId:"bdgdocnotime20081"}];
var gatherColumns = new Array();
//初始统计列数组
var originalStatColumns = new Array();
//初始单一统计列数组
var originalSingleStatColumns = new Array();
//报表汇总列数组
var statColumns = new Array();
//记录汇总列的非对象初始值
var gatherColumnsTemp = new Array();
//记录统计列的非对象初始值
var statColumnsTemp = new Array();

//统计列明细ID;scdIdArray为保存单个统计列的明细id;scdIdArrayAll为二维数组,通过键(统计列ID)值(scdIdArray)保存多个统计列明细的id
var scdIdArrayAll = new Array();
var scdTempColumnAll=new Array();
//统计列明细选中状态;scdCheckArray为保存单个统计列明细的选中状态;scdCheckArrayAll为二维数组,通过键(统计列ID)值(scdCheckArray)保存多个统计列明细的选中状态
var scdCheckArrayAll = new Array();

//保存统计列明细的隐藏域;hiddenStrArray为保存单个统计列明细的隐藏域;scdMap为二维数组,通过键(统计列ID)值(hiddenStrArray)保存多个统计列明细的隐藏域
var scdMap = new Array();

//保存统计列对象的数组;统计列对象有两个属性：statColumnName和scdObject，键是统计列Id
var statColumnObjectArrayAll = new Array();

//保存所有统计列明细对应模板
var templateArrayAll = new Array();

//保存所有统计列明细对应预警值
var warningArrayAll = new Array();

//保存计算列对象
var calColumnObjectArrayAll = new Array();

//2009-04-09 yuanxin; 报表区计算列数组值，用于模板修改功能中
var templateCalArray = new Array();

//在计算统计列的高度时，保持状态使统计列的高度以第一次的高度为准
var flag01 = 0;

//设置全局变量：计算列对象Id，用于处理当统计列中出现两个以上的计算列时，在计算列之间选取时保存前一个计算列对象的名称和公式值
var beforeCalColumnIdGloble = "";

//设置全局变量：汇总列对象Id，用于处理当汇总列中出现两个以上的汇总列时，在汇总列之间选取时保存前一个汇总列对象的名称
var beforeGatherColumnIdGloble = "";

//设置全局变量：统计列明细Id，用于处理当选中一个统计列明细时，如果已经选中过一个统计列明细，就改变前一个统计列明细的背景色
var beforeStatColumnDetailIdGloble = "";

//把汇总列放入数组中
/*gatherColumns.add = function(i,obj){
	// 清理空数据
	var p = 0;
	for(l=0;l<this.length;l++){
	    if(this[l].HTMLobject == obj){
	        p = 1;
	        if(l<i){
	            i--
	        }
	    }
	    this[l] = this[l+p]
	}
	this.length = this.length-p;


	var o = new Object();
	o.HTMLobject = obj;

	if(this.length <= i){
		this[i] = o;
	}
    else if(this[i] == null){
		this[i] = o;
	}
	else{
		for(p=this.length;p>i;p--){
			this[p] = this[p-1];
		}
		this[i] = o;
	}
	
}*/

gatherColumns.containHTMLobject = function(HTMLobject){
	for(i=0;i<this.length;i++){
		if(this[i].HTMLobject == HTMLobject){
			return i;
		}
	}
	return -1;
}

//初始化汇总列和统计列
window.onload = function(){
	//获取汇总列对象并放入数组中
	var gathers = gatherpad.getElementsByTagName("P");
	//获取统计列对象并放入数组中
	var stats = statpad.getElementsByTagName("P");
	//获取单列统计列对象并放入数组中
	var singleStats = singlestatpad.getElementsByTagName("P");
	//初始化汇总列

	for(var i=0;i<gathers.length;i++){
      //SongFP 090331 如果汇总列为显示为"none",则将汇总列放入统计报表区中
        if(gathers[i].sortNumber != null){
		        //设置汇总列拖动事件
		        init_gathercolumn(gathers[i]);
		        //把各个汇总列放入初始汇总列数组中
            originalGatherColumns[i] = gathers[i];
            originalGatherColumns[i].style.display = "none";
        	
          var oCloneNode = gathers[i].cloneNode(true);
          oCloneNode.id = "clone" + gathers[i].id;
          init_gathercolumn(oCloneNode);
          gatherColumns[gathers[i].sortNumber]=oCloneNode;
          gatherColumns[gathers[i].sortNumber].style.display = "";
        }else {
		        //设置汇总列拖动事件
		        init_gathercolumn(gathers[i]);
		        //把各个汇总列放入初始汇总列数组中
            originalGatherColumns[i] = gathers[i];
        }
		//把各个汇总列的克隆放入报表汇总列数组中
		/*
		var oCloneNode = gathers[i].cloneNode(true);
		//修改汇总列对象的id来区分初始汇总列
		oCloneNode.id = "clone" + gathers[i].id;
		init_gathercolumn(oCloneNode);
		gatherColumns[i] = oCloneNode;
		gatherColumns[i].style.display = "none";
		*/
	}
	//初始化统计列
	for(var i=0;i<stats.length;i++){
        //SongFP 090331 如果统计列为显示为"none",则将统计列放入统计报表区中
        if(stats[i].sortNumber != null){
		        //设置统计列拖动事件
		        init_statcolumn(stats[i]);
		        //把各个统计列放入初始统计列数组中
            originalStatColumns[i] = stats[i];
            originalStatColumns[i].style.display = "none";
            
            findStatColumnDetail(stats[i].id);
            statColumnNameGlobal = stats[i].name;
            //把各个统计列的克隆放入报表汇统计数组中
				    var oCloneNode1 = stats[i].cloneNode(true);
				    init_statcolumn(oCloneNode1);
				    statColumns[stats[i].sortNumber] = oCloneNode1;
				    statColumns[stats[i].sortNumber].style.display = "";
				    //绘制多列统计列的表头信息
				    var regexp = /<!-- row end -->/g;
			      var statColumnHtml = statColumns[stats[i].sortNumber].html;
				    statColumnHtml = statColumnHtml.replace(regexp, "</tr> <tr>");
				    var statColumnHead = "<table height='100%' border='0' cellpadding='1' cellspacing='1' style='display:block;float:left;background-color:#CCCCCC;' id='headTable" + statColumns[statColumns.length - 1].id + "'><thead>"+
						             "<tr>"+statColumnHtml.substring(0,statColumnHtml.length-4)+
						            "</thead></table>";
			       statColumns[stats[i].sortNumber].innerHTML = statColumnHead;
        }else {
		        //设置统计列拖动事件
		        init_statcolumn(stats[i]);
		        //把各个统计列放入初始统计列数组中
            originalStatColumns[i] = stats[i];
        }
  /*
		//把各个统计列的克隆放入报表汇统计数组中
		var oCloneNode1 = stats[i].cloneNode(true);
		init_statcolumn(oCloneNode1);
		statColumns[i] = oCloneNode1;
		statColumns[i].style.display = "none";
		
	  //绘制多列统计列的表头信息
   	var regexp = /<!-- row end -->/g;
   	var statColumnHtml = stats[i].html;
    statColumnHtml = statColumnHtml.replace(regexp, "</tr> <tr>");
    var statColumnHead = "<table height='100%' border='0' cellpadding='1' cellspacing='1' style='display:block;float:left;background-color:#CCCCCC;' id='headTable" + stats[i].id + "'><thead>"+
                    "<tr>"+
                    statColumnHtml.substring(0,statColumnHtml.length-4)+
                    "</thead></table>";
	   statColumns[i].innerHTML = statColumnHead;
	*/
	}
	//继续初始化统计列
	for(var i = 0; i < singleStats.length; i++){    
		//把各个统计列的克隆放入报表汇统计数组中 
		  if(singleStats[i].sortNumber != null && Number(singleStats[i].isSingle) != 2){
		    //设置统计列拖动事件
		    init_statcolumn(singleStats[i]);
		    //把各个统计列放入初始统计列数组中
        originalSingleStatColumns[i] = singleStats[i];
        originalSingleStatColumns[i].style.display = "none";

        findStatColumnDetail(singleStats[i].id);
        statColumnNameGlobal = singleStats[i].name;
		    var oCloneNode2 = singleStats[i].cloneNode(true);
		    init_statcolumn(oCloneNode2);
		    statColumns[singleStats[i].sortNumber] = oCloneNode2;
		    statColumns[singleStats[i].sortNumber].style.display = "";	
		   
		 //绘制单列统计列的表头信息
			 var regexp = /<!-- row end -->/g;
			 var statColumnHtml = singleStats[i].html;
			 statColumnHtml = statColumnHtml.replace(regexp, "</tr> <tr>");
			 var statColumnHead = "<table height='100%' border='0' cellpadding='1' cellspacing='1' style='display:block;float:left;background-color:#CCCFFF;' id='headTable" + statColumns[singleStats[i].sortNumber].id + "'><thead>"+
						                    "<tr>"+
						                    statColumnHtml.substring(0,statColumnHtml.length-4)+
						                    "</thead></table>";
			 statColumns[singleStats[i].sortNumber].innerHTML = statColumnHead;
		}else if(Number(singleStats[i].isSingle) == 2 && "001".localeCompare(singleStats[i].id) == 0){
		    //设置统计列拖动事件
		    init_statcolumn(singleStats[i]);
		    //把各个统计列放入初始统计列数组中
        originalSingleStatColumns[i] = singleStats[i];
        originalSingleStatColumns[i].style.display = "";
        
		    for(var k = 0; k < templateCalArray.length; k++){
		        var oCloneNode2 = singleStats[i].cloneNode(true);
		        oCloneNode2.id = templateCalArray[k].statColumnId;
		        oCloneNode2.className = "pclone";
		        oCloneNode2.sql=templateCalArray[k].sql;
		        init_statcolumn(oCloneNode2);
		        statColumns[templateCalArray[k].sortNumber] = oCloneNode2;
		        statColumns[templateCalArray[k].sortNumber].style.display = "";	
		        //绘制单列统计列的表头信息
			      var regexp = /<!-- row end -->/g;
	          //给计算列的html填充内容，使之把统计列撑起来
		        var html = '<th nowrap="nowrap" >'+templateCalArray[k].name+'</th><!-- row end -->';	
			     var statColumnHtml = html;
			     statColumnHtml = statColumnHtml.replace(regexp, "</tr> <tr>");
			     var statColumnHead = "<table height='100%' border='0' cellpadding='1' cellspacing='1' style='display:block;float:left;background-color:#CCCCCC;' id='headTable" + (Number(singleStats[i].id) + statColumns.length) + "'><thead>"+
						                    "<tr>"+
						                    statColumnHtml.substring(0,statColumnHtml.length-4)+
						                    "</thead></table>";
			    statColumns[templateCalArray[k].sortNumber].innerHTML = statColumnHead;
		    }         
		               
		 
		 }else {
		    //设置统计列拖动事件
		    init_statcolumn(singleStats[i]);
		    //把各个统计列放入初始统计列数组中
        originalSingleStatColumns[i] = singleStats[i];
		 }

		
  /*    
		//单独处理计算列，计算列不在模板统计列中初始化
		if (Number(singleStats[i].isSingle) != 2){
				//把各个统计列的克隆放入报表汇统计数组中
				var oCloneNode2 = singleStats[i].cloneNode(true);
				init_statcolumn(oCloneNode2);
				statColumns[stats.length + i] = oCloneNode2;
				statColumns[stats.length + i].style.display = "none";				
			  //绘制单列统计列的表头信息
		   	var regexp = /<!-- row end -->/g;
		   	//给计算列的html填充内容，使之把统计列撑起来
		   	if (Number(singleStats[i].isSingle) == 2){
		   	    singleStats[i].html = '<th nowrap="nowrap" >计算列</th><!-- row end -->';	
		   	}
		   	var statColumnHtml = singleStats[i].html;
		    statColumnHtml = statColumnHtml.replace(regexp, "</tr> <tr>");
		    var statColumnHead = "<table height='100%' border='0' cellpadding='1' cellspacing='1' style='display:block;float:left;background-color:#CCCCCC;' id='headTable" + singleStats[i].id + "'><thead>"+
		                    "<tr>"+
		                    statColumnHtml.substring(0,statColumnHtml.length-4)+
		                    "</thead></table>";
			   statColumns[stats.length + i].innerHTML = statColumnHead;
		}	
	*/	
	}
	//绘制多列统计列的表头信息
	/*for (var i = 0; i < stats.length; i++){
   		var regexp = /<!-- row end -->/g;
   		var statColumnHtml = stats[i].html;
    	statColumnHtml = statColumnHtml.replace(regexp, "</tr> <tr>");
    	statColumnHead = "<table height='100%' border='0' cellpadding='1' cellspacing='1' style='display:block;float:left;background-color:#CCCCCC;' id='headTable" + stats[i].id + "'><thead>"+
                     "<tr>"+
                     statColumnHtml.substring(0,statColumnHtml.length-4)+
                     "</thead></table>";
	    statColumns[i].innerHTML = statColumnHead;
	}*/
//刷新初始汇总列设置区域
	refresh_originalquerygathercolumns(gatherpad);
	//刷新报表汇总列设置区域
	refresh_querygathercolumns(querygathercolumns);
	//刷新初始统计列设置区域
	refresh_originalquerystatcolumns(statpad);
	//刷新初始单一统计列设置区域
	refresh_originalsinglequerystatcolumns(singlestatpad);
	//刷新报表统计列设置区域
	refresh_querystatcolumns(querystatcolumns);
	//初始化报表汇总列设置区域
	//init_querygathercolumns(querygathercolumns);
	//初始化初始汇总列设置区域
	//init_originalquerygathercolumns(gatherpad);
}

// 设置汇总列拖动事件
function init_gathercolumn(gathercolumn){
	gathercolumn.onselectstart = function(){return false;};
	gathercolumn.onmousedown = function(){
		gatherFollowMouse(this);
	};
	gathercolumn.release = function(){
		var p = releaseMouse(this);
		//把汇总列从初始区拖到报表区
		if(hasContain(p.x,p.y,querygathercolumns)){
			//把初始汇总列数组中的汇总列追加到报表汇总列数组中
			//当汇总列对象发生变化时，动态保存前一个汇总列对象的名称
			if (beforeGatherColumnIdGloble){
		      for (var i = 0; i < gatherColumns.length; i++){
		          if (gatherColumns[i].id.localeCompare(beforeGatherColumnIdGloble) == 0){
					        gatherColumns[i].name = document.getElementById("gatherColumnName").value;	
		          }	
		      }
			}
			
			for (var i = 0; i < gatherColumns.length; i++){
				if (gatherColumns[i].innerHTML == gathercolumn.innerHTML){
					gatherColumns[i].style.display = "";	
					//设置当前汇总列的id
					beforeGatherColumnIdGloble = gatherColumns[i].id;
				}
			}
			//把从初始汇总列数组拖放到报表汇总列数组的汇总列隐藏
			for (var i = 0; i < originalGatherColumns.length; i++){
			   if (originalGatherColumns[i].innerHTML == gathercolumn.innerHTML){
				   originalGatherColumns[i].style.display = "none";
			    }
			}
			//把汇总列添加到报表汇总列区数组中(当该汇总列不存在时进行增加)
			var tempTag = 0;
			for (var i = 0; i < gatherColumns.length; i++){
			    if (gatherColumns[i].id.localeCompare(gathercolumn.id) == 0){
			        tempTag = 1;
			        break;
			   }	
			}
			//报表汇总列不允许有重复值
			if (tempTag == 0){
		      var oCloneNode = gathercolumn.cloneNode(true);
		      //修改汇总列对象的id来区分初始汇总列
		      oCloneNode.id = "clone" + gathercolumn.id;
		      init_gathercolumn(oCloneNode);
		      gatherColumns[gatherColumns.length] = oCloneNode;
		      gatherColumns[gatherColumns.length - 1].style.display = "";
			}
		
			sortGatherColumn(this,p.x,p.y);
			//querygathercolumns.addGatherColumn(this,p.x,p.y);
		}
	    //刷新报表汇总列设置区域
	    refresh_querygathercolumns(querygathercolumns);

		//把汇总列从报表区拖到初始区
		if(hasContain(p.x,p.y,gatherpad)){
			//把报表汇总列数组中的汇总列追加到初始汇总列数组中
			for (var i = 0; i < originalGatherColumns.length; i++){
				if (originalGatherColumns[i].innerHTML == gathercolumn.innerHTML){
					originalGatherColumns[i].style.display = "";	
				}	
			}
			//把从报表汇总列数组中拖放到初始汇总列数组中的汇总列从报表汇总列数组中删除
			for (var i = 0; i< gatherColumns.length; i++){
				if (gatherColumns[i].innerHTML == gathercolumn.innerHTML){
					//gatherColumns[i].style.display = "none";	
				  gatherColumns.removeAt(i);
				  gathercolumn.removeNode(true);					
				}	
			}
			//gatherpad.addGatherColumn(this,p.x,p.y);
			//之后把该汇总列的属性区域进行隐藏
			document.getElementById("gatherColumnProperties").style.display = "none";
		}
		//刷新初始汇总列设置区域
	    refresh_originalquerygathercolumns(gatherpad);
	};
}
// 设置统计列拖动事件
function init_statcolumn(statcolumn){
	//songfupeng 20100118 定义一个显示统计列样式的div
	var statcolumnTableObj= document.createElement("<div>");
	statcolumn.onselectstart = function(){return false;};
	statcolumn.onmousedown = function(){
		statFollowMouse(this);
		statcolumnTableObj.removeNode(true);
	};
	//songfupeng 20100119 计算列不加此事件
	if(!(statcolumn.id=="001")){
			//songfupeng 20100118 定义鼠标移动事件，处理当鼠标移动到某个统计列标签时，显示它的样式
			statcolumn.onmouseover = function(){
				//绘制单列统计列的表头信息
				var regexp = /<!-- row end -->/g;
				var statColumnHtml = statcolumn.html;
				statColumnHtml = statColumnHtml.replace(regexp, "</tr> <tr>");
				var statColumnHead = "<table  height='5%' border='0' cellpadding='1' cellspacing='1' style='border:1px #83A7DB solid;display:block;float:left;background-color:#CCCCCC;' id='headTable" + (statcolumn.id + statColumns.length) + "'>"+
								"<tr style='color:#FFFFFF;'>"+
								statColumnHtml.substring(0,statColumnHtml.length-4)+
								"</table>";
				statcolumnTableObj.innerHTML=statColumnHead;
				//songfupeng 20100119　设置显示区域的大小
				statcolumnTableObj.style.top="200px";
				statcolumnTableObj.style.left="2px";
				statcolumnTableObj.style.width="635px";
				statcolumnTableObj.style.height="90px";
				//statcolumnTableObj.style.overflow="auto";
				statcolumnTableObj.style.zIndex=1;
				statcolumnTableObj.style.position="absolute";
				var statpadbuttonDiv=document.getElementById("labelsDiv");
				statpadbuttonDiv.appendChild(statcolumnTableObj);
				//songfupeng 20100119 将表格内的文字换成白色 开始
				var tableObj=document.getElementById("headTable"+statcolumn.id + statColumns.length);
				var tarbleRows=tableObj.rows;
				for(var row=0;row<tarbleRows.length;row++){
					tarbleRows[row].className="statecolumnBackColour";
					var tarbleCells=tarbleRows[row].cells;
					for(var cell=0;cell<tarbleCells.length;cell++){
						tarbleCells[cell].className="statecolumnBackColour";
					}
				}

			   //songfupeng 20100119 将表格内的文字换成白色 结束
			}
		statcolumn.onmouseout = function(){
			//songfupeng 20100119 删除鼠标移动到统计列标签后显示样式的事件
			statcolumnTableObj.removeNode(true);
		}
	}
	
	statcolumn.release = function(){
		var p = releaseMouse(this);
		//把统计列从初始区拖到报表区
		if(hasContain(p.x,p.y,querystatcolumns)){
			  //2表示计算列
			  if (Number(statcolumn.isSingle) == 2){
			  	  //当计算列对象发生变化时，动态保存前一个计算列对象的名称和公式值
			  	  if (beforeCalColumnIdGloble && calColumnObjectArrayAll[beforeCalColumnIdGloble]){
						    calColumnObjectArrayAll[beforeCalColumnIdGloble].name = document.getElementById("calculateStatName").value;
							  calColumnObjectArrayAll[beforeCalColumnIdGloble].calculate = document.getElementById("formulaValue").value;
			  	  }
			  	  if ("001".localeCompare(statcolumn.id) == 0){
							     //在报表统计列区动态创建计算列对象
								//把各个统计列的克隆放入报表汇统计数组中
								var oCloneNode2 = statcolumn.cloneNode(true);
								oCloneNode2.id = Math.random();
								oCloneNode2.className = "pclone";
								init_statcolumn(oCloneNode2);
								statColumns[statColumns.length] = oCloneNode2;
								statColumns[statColumns.length - 1].style.display = "";		
									
							  //绘制单列统计列的表头信息
						   	var regexp = /<!-- row end -->/g;
						   	statColumns[statColumns.length - 1].className="statecolumnBackColour";
						   	//给计算列的html填充内容，使之把统计列撑起来
						   	if (Number(statcolumn.isSingle) == 2){
						   	    statcolumn.html = '<th nowrap="nowrap" ><font color="#FFFFFF" >计算列</font></th><!-- row end -->';	
						   	}
						   	var statColumnHtml = statcolumn.html;
						    statColumnHtml = statColumnHtml.replace(regexp, "</tr> <tr>");
						    var statColumnHead = "<table  height='100%' border='0' cellpadding='1' cellspacing='1' style='display:block;float:left;background-color:#095CBC;' id='headTable" + (Number(statcolumn.id) + statColumns.length) + "'><thead>"+
						                    "<tr>"+
						                    statColumnHtml.substring(0,statColumnHtml.length-4)+
						                    "</thead></table>";
							  statColumns[statColumns.length - 1].innerHTML = statColumnHead
							  	
							  //保存计算列对象
							  var calColumnObject = new Object();
							  
							  //计算列对象Id
							  calColumnObject.statColumnId = oCloneNode2.id;
							  //设置全局变量：计算列对象Id，用于处理当统计列中出现两个以上的计算列时，在计算列之间选取时保存前一个计算列对象的名称和公式值
							  beforeCalColumnIdGloble = oCloneNode2.id;
							  //计算列对象名称
							  calColumnObject.name = "计算列";
							  //给计算列名称重新赋值
							  document.getElementById("calculateStatName").value = calColumnObject.name;
							  //计算列对象公式
							  calColumnObject.calculate = "";
							  //字段类型;默认为计算列(c)
							  calColumnObject.columnType = "c";
							  //公式下拉列表框恢复默认值，对应备注也恢复默认值
							  //songfupeng 20090807 先暂时屏蔽
							  /*
								document.getElementById("formulaDiv").innerHTML = "公式："
								+ "<select name='公式' size='1' id='formula' onchange='viewNotes();'>"
								+ "<option selected='selected' >请选择...</option>"
					      + "<option value='该函数计算公式为上一行的返回值+augment- decrease，遇到groupby列的值与上一行不同时直接返回0'>动态余额列(DYNAMICBALANCE(augment，decrease，groupby))</option>"
					      + "<option value='FUNDTYPE为要素编码'>宏(${FUNDTYPE})</option>"
					      + "</select>";
					      */	
								document.getElementById("notes").innerHTML = "";
							  //对计算列对象公式重新赋值
								document.getElementById("formulaValue").value = calColumnObject.calculate;
							  calColumnObjectArrayAll[oCloneNode2.id] = calColumnObject;
							  //使用统计列ID来标识计算列属性（名称和公式）对象
							  document.getElementById("calculateStatName").statColumnId = oCloneNode2.id;
							  document.getElementById("formulaValue").statColumnId = oCloneNode2.id;
							  
							  //songfupeng 20090807 在重新拖动计算列时，将initNum设置为0-初始值
							  initNum=0;
							  //songfupeng 20090807 在重新拖动计算列时，将totalformulStatus设置为0-初始值
							  totalformulStatus=0;
							   //songfupeng 20090807 在重新拖动计算列时，将formulaValue设置为""
							  formulaValue="";
			  	  }else {
							  //动态修改计算列属性值（名称和公式）
							  for (var key in calColumnObjectArrayAll){
							  	  //屏蔽ProtoType属性
							  	  if (calColumnObjectArrayAll[key].statColumnId){
									      if (calColumnObjectArrayAll[key].statColumnId.localeCompare(statcolumn.id) == 0){
							              //设置全局变量：计算列对象Id，用于处理当统计列中出现两个以上的计算列时，在计算列之间选取时保存前一个计算列对象的名称和公式值
							              beforeCalColumnIdGloble = statcolumn.id;
									          document.getElementById("calculateStatName").value = calColumnObjectArrayAll[key].name;
									          document.getElementById("formulaValue").value = calColumnObjectArrayAll[key].calculate;
									          //动态改变公式下拉列表的选项以及对应选项的注释值
														//动态余额列
														if (document.getElementById("formulaValue").value.indexOf("DYNAMICBALANCE") > -1){
															  document.getElementById("formulaDiv").innerHTML = "公式："
															  + "<select name='公式' size='1' id='formula' onchange='viewNotes();'>"
															  + "<option>请选择...</option>"
					                      + "<option selected='selected' value='该函数计算公式为上一行的返回值+augment- decrease，遇到groupby列的值与上一行不同时直接返回0'>动态余额列(DYNAMICBALANCE(augment，decrease，groupby))</option>"
					                      + "<option value='FUNDTYPE为要素编码'>宏(${FUNDTYPE})</option>"
					                      + "</select>";	
														    var notes = document.getElementById("formula").value;
														    document.getElementById("notes").innerHTML = notes;
														//域
														}else if (document.getElementById("formulaValue").value.indexOf("(${") > -1){
															  document.getElementById("formulaDiv").innerHTML = "公式："
															  + "<select name='公式' size='1' id='formula' onchange='viewNotes();'>"
															  + "<option>请选择...</option>"
					                      + "<option value='该函数计算公式为上一行的返回值+augment- decrease，遇到groupby列的值与上一行不同时直接返回0'>动态余额列(DYNAMICBALANCE(augment，decrease，groupby))</option>"
					                      + "<option selected='selected' value='FUNDTYPE为要素编码'>宏(${FUNDTYPE})</option>"
					                      + "</select>";	
														    var notes = document.getElementById("formula").value;
														    document.getElementById("notes").innerHTML = notes;
														}else {
														 //songfupeng 20090807 先暂时屏蔽
														/*
															  document.getElementById("formulaDiv").innerHTML = "公式："
															  + "<select name='公式' size='1' id='formula' onchange='viewNotes();'>"
															  + "<option selected='selected' >请选择...</option>"
					                      + "<option value='该函数计算公式为上一行的返回值+augment- decrease，遇到groupby列的值与上一行不同时直接返回0'>动态余额列(DYNAMICBALANCE(augment，decrease，groupby))</option>"
					                      + "<option value='FUNDTYPE为要素编码'>宏(${FUNDTYPE})</option>"
					                      + "</select>";	
														    document.getElementById("notes").innerHTML = "";
														    */
														}
									      }	
							  	  }
					  	  }
					   
					  }					   
			  }else {
						//把统计列添加到报表统计列区数组中(当该统计列不存在时进行增加)
						var tempTag = 0;
						for (var i = 0; i < statColumns.length; i++){
						    if (statColumns[i].id.localeCompare(statcolumn.id) == 0){
						        tempTag = 1;
						        break;
						   }	
						}
						//报表统计列不允许有重复值
						if(tempTag == 0){
								//把各个统计列的克隆放入报表汇统计数组中
								var oCloneNode1 = statcolumn.cloneNode(true);
								init_statcolumn(oCloneNode1);
								statColumns[statColumns.length] = oCloneNode1;
								statColumns[statColumns.length - 1].style.display = "";
								
							  //绘制多列统计列的表头信息
						    	var regexp = /<!-- row end -->/g;
						    	var statColumnHtml = statColumns[statColumns.length - 1].html;
						        statColumnHtml = statColumnHtml.replace(regexp, "</tr> <tr>");
						        var statColumnHead = "<table height='100%' border='0' cellpadding='1' cellspacing='1' style='display:block;float:left;background-color:#CCCCCC;' id='headTable" + statColumns[statColumns.length - 1].id + "'><thead>"+
						                    "<tr id=\"tr1\">"+
						                    statColumnHtml.substring(0,statColumnHtml.length-4)+
						                    "</thead></table>";
							    statColumns[statColumns.length - 1].innerHTML = statColumnHead;
							    //2009-04-23 yuanxin;初始化报表区汇总列，解决把统计列从初始区拖动到报表区后不能把div撑起的问题
							    refresh_querystatcolumns(querystatcolumns);
						}
			  }
			//动态增加报表统计列区内层div的宽度
			//alert(statcolumn.offsetWidth);
			//alert(aa.offsetWidth);
			//querystatcolumns.style.width  = statcolumn.offsetWidth + "px";
			//把初始统计列数组中的统计列追加到报表统计列数组中
			//alert("before");
			for (var i = 0; i < statColumns.length; i++){
				if (statColumns[i].id == statcolumn.id){
					statColumns[i].style.display = "";	
					//动态计算统计列的高度和宽度
					var childsss = statColumns[i].children[0].children;
					if (flag01 == 0){
						statColumns[i].children[0].style.lineHeight = childsss[0].offsetHeight + "px";
						statColumns[i].children[0].style.width = childsss[0].offsetWidth + "px";
						//alert("ok");
						flag01 = 1;
					}
					
				}
			}
			//alert("end");
			//把从初始统计列数组拖放到报表统计列数组的统计列隐藏
			for (var i = 0; i < originalStatColumns.length; i++){
			   if (originalStatColumns[i].id == statcolumn.id){
				   originalStatColumns[i].style.display = "none";
			    }
			}
			//把从初始单列统计列数组拖放到报表统计列数组的统计列隐藏
			for (var i = 0; i < originalSingleStatColumns.length; i++){
			   if (originalSingleStatColumns[i].id == statcolumn.id){
			       //判断是计算列还是普通单列统计列
			       if (Number(originalSingleStatColumns[i].isSingle) == 2){
				         originalSingleStatColumns[i].style.display = "";
			       }else {
				         originalSingleStatColumns[i].style.display = "none";
			       }
			    }
			}
			//给报表区统计列排序
			sortStatColumn(this,p.x,p.y);
			
			//querygathercolumns.addGatherColumn(this,p.x,p.y);
			
		}
	    //刷新报表统计列设置区域
	    refresh_querystatcolumns(querystatcolumns);

		//把统计列从报表区拖到初始区
		if(hasContain(p.x,p.y,statpad) && Number(statcolumn.isSingle) == 0){
		
			//把报表统计列数组中的统计列追加到初始统计列数组中
			for (var i = 0; i < originalStatColumns.length; i++){
				if (originalStatColumns[i].id == statcolumn.id){
					originalStatColumns[i].style.display = "";
					//songfupeng 20100120 当被拖回到初始统计列区后，被拖动的统计列标签字体加粗和倾斜
					originalStatColumns[i].style.fontWeight = "bold";	
					originalStatColumns[i].style.fontStyle="italic";
				}	
			}
			//把从报表统计列数组中拖放到初始统计列数组中的统计列从报表统计列数组中删除
			for (var i = 0; i< statColumns.length; i++){
				if (statColumns[i].id == statcolumn.id){
				  //statColumns[i].style.display = "none";	
				  statColumns.removeAt(i);
				  statcolumn.removeNode(true);					
				}	
			}
			//gatherpad.addGatherColumn(this,p.x,p.y);
			//在统计列被拖走时，在数组中清除该统计列的明细信息
			if (scdIdArrayAll[statcolumn.id]){
			    scdIdArrayAll[statcolumn.id] = null;
			    scdCheckArrayAll[statcolumn.id] = null;
		      scdTempColumnAll[statcolumn.id]=null;
			    scdMap[statcolumn.id] = null;
			    var scdIdArrayAllTem = new Array();
			    var scdCheckArrayAllTem = new Array();
			    var scdTempColumnAllTem = new Array();
			    var scdMapTem = new Array();
			    //删除统计列明细信息
			    for (var key in scdIdArrayAll){
			    	  if (scdIdArrayAll[key] != null){
			    	  	  scdIdArrayAllTem[key] = scdIdArrayAll[key];
			    	  	  scdCheckArrayAllTem[key] = scdCheckArrayAll[key];
			    	  	  scdTempColumnAllTem[key] = scdTempColumnAll[key];
			    	  	  scdMapTem[key] = scdMap[key];
			    	  }
			    }
			    scdIdArrayAll = scdIdArrayAllTem;
			    scdCheckArrayAll = scdCheckArrayAllTem;
			    scdTempColumnAll = scdTempColumnAllTem;
			    scdMap = scdMapTem;
			}
			//之后把该统计列的属性区域进行隐藏
			document.getElementById("statColumnProperties").style.display = "none";
		}
		//刷新初始统计列设置区域
	    refresh_originalquerystatcolumns(statpad);
		//把统计列从报表区拖到单列统计列初始区(单列统计列)
		if(hasContain(p.x,p.y,singlestatpad) && (Number(statcolumn.isSingle) == 1 || Number(statcolumn.isSingle) == 2)){
			//把报表统计列数组中的统计列追加到初始单列统计列数组中
			for (var i = 0; i < originalSingleStatColumns.length; i++){
				if (originalSingleStatColumns[i].id == statcolumn.id){
					originalSingleStatColumns[i].style.display = "";
					//songfupeng 20100120 当被拖回到初始统计列区后，被拖动的统计列标签字体加粗和倾斜
					originalSingleStatColumns[i].style.fontWeight = "bold";	
					originalSingleStatColumns[i].style.fontStyle="italic";
				}	
			}
			//把从报表统计列数组中拖放到初始统计列数组中的统计列从报表统计列数组中删除（单列统计列）
			for (var i = 0; i< statColumns.length; i++){
				if (statColumns[i].id == statcolumn.id){
					//statColumns[i].style.display = "none";	
				  statColumns.removeAt(i);
				  statcolumn.removeNode(true);					
				}	
			}
			//gatherpad.addGatherColumn(this,p.x,p.y);
			//在统计列被拖走时，在数组中清除该统计列的明细信息
			//scdIdArrayAll[statColumnIdGlobal] = null;
			//scdCheckArrayAll[statColumnIdGlobal] = null;
			//scdMap[statColumnIdGlobal] = null;
			
			//在统计列被拖走时，在数组中清除该统计列的明细信息
			if (scdIdArrayAll[statcolumn.id] || calColumnObjectArrayAll[statcolumn.id]){
			    //2009-04-10 yuanxin;计算列对象信息
			    if (Number(statcolumn.isSingle) == 2){
			        calColumnObjectArrayAll[statcolumn.id] = null;
			        var calColumnObjectArrayAllTem = new Array();
					    //删除统计列明细信息
					    for (var key in calColumnObjectArrayAll){
					    	  if (calColumnObjectArrayAll[key] != null){
					    	  	  calColumnObjectArrayAllTem[key]	= calColumnObjectArrayAll[key];
					    	  }
					    }
			        calColumnObjectArrayAll = calColumnObjectArrayAllTem;	
			    }else {
					    scdIdArrayAll[statcolumn.id] = null;
					    scdCheckArrayAll[statcolumn.id] = null;
				      scdTempColumnAll[statcolumn.id]=null;
					    scdMap[statcolumn.id] = null;
					    var scdIdArrayAllTem = new Array();
					    var scdCheckArrayAllTem = new Array();
					    var scdTempColumnAllTem = new Array();
					    var scdMapTem = new Array();
					    //删除统计列明细信息
					    for (var key in scdIdArrayAll){
					    	  if (scdIdArrayAll[key] != null){
					    	  	  scdIdArrayAllTem[key] = scdIdArrayAll[key];
					    	  	  scdCheckArrayAllTem[key] = scdCheckArrayAll[key];
					    	  	  scdTempColumnAllTem[key] = scdTempColumnAll[key];
					    	  	  scdMapTem[key] = scdMap[key];
					    	  }
					    }
					    scdIdArrayAll = scdIdArrayAllTem;
					    scdCheckArrayAll = scdCheckArrayAllTem;
					    scdTempColumnAll = scdTempColumnAllTem;
					    scdMap = scdMapTem;
			    }
			}
			
			if (Number(statcolumn.isSingle) == 2){
					//之后把该计算列的属性区域进行隐藏
					document.getElementById("calculateStatColumnProperties").style.display = "none";
			}else {
					//之后把该单列统计列的属性区域进行隐藏
					document.getElementById("statColumnProperties").style.display = "none";
			}
		}
		//刷新初始单一统计列设置区域
		refresh_originalsinglequerystatcolumns(singlestatpad);
	}
}

// 设置汇总列对象跟随鼠标移动
function gatherFollowMouse(objP){
	//2009-03-05 yuanxin;当窗口右侧滚动条发生变化时，动态计算汇总列对象的位置
	// 在原位置显示虚线框
	objP.placeholder = showPlaceholder(objP);
	var obj = objP.cloneNode(true);
	obj.className="pclone";
	obj.srcobj = objP;
	objP.style.display = "none";
	//把克隆对象追加到窗体的末尾
	document.body.appendChild(obj);

	var followObj = obj;
	_x = event.offsetX;
	_y = event.offsetY;
	obj.style.position = "absolute";
	obj.style.left = event.clientX-_x + document.documentElement.scrollLeft;
	obj.style.top = event.clientY-_y +document.documentElement.scrollTop;
	obj.style.zIndex = 1000;
	//window.status = event.x + ":" + event.y;

	//alert(obj.style.left);
		//alert(obj.style.top);
		//alert(document.body.scrollHeight);

	
	//根据鼠标的位置在报表汇总列或统计列中插入一个虚线框
	/*for (var i = 0; i < gatherColumns.length; i++){
		//debugger;
		if (hasContain(event.x,(event.y+gatherColumns[i].offsetHeight/2),gatherColumns[i])){
			alert("ok");
			var odiv = gatherColumns[i].cloneNode();
			//odiv.style.height = obj.style.height + 20px;
			odiv.style.background = "";
			odiv.style.border = "1px dashed #FF0000";
			obj.insertAdjacentElement("BeforeBegin",odiv);
		}
	}*/

	obj.setCapture();
	obj.onmouseup = function(){
		obj.srcobj.release();
		this.removeNode(true);
		//单击汇总列时，显示汇总列属性,同时隐藏统计列属性和单列统计列属性
		//设置鼠标的x和y轴绝对坐标
		var absoluteX = event.clientX + document.documentElement.scrollLeft;
		var absoluteY = event.clientY + document.documentElement.scrollTop
		if (hasContain(absoluteX,absoluteY,querygathercolumns)){
			seniorQueryForm.gatherColumnProperties.style.display="";
			document.getElementById("gatherpad").style.display="";
			document.getElementById("gatherpadbutton").className='selected';
			seniorQueryForm.statColumnProperties.style.display="none";
			document.getElementById("statpad").style.display="none";
			document.getElementById("statpadbutton").className='';
			seniorQueryForm.singleStatColumnProperties.style.display="none";
			document.getElementById("singlestatpad").style.display="none";
			document.getElementById("singlestatpadbutton").className='';
			seniorQueryForm.calculateStatColumnProperties.style.display="none";
			document.getElementById("singlestatpad").style.display="none";
			document.getElementById("singlestatpadbutton").className='';
			document.getElementById("conditionpad").style.display="none";
			document.getElementById("conditionpadbutton").className='';
			document.getElementById("conditionvaluepad").style.display="none";
			document.getElementById("conditionvaluepadbutton").className='';
			//动态给汇总列的属性赋值
			//汇总列名称
			seniorQueryForm.gatherColumnName.value = obj.name;
			//把汇总列的id传给汇总列名称标签
			seniorQueryForm.gatherColumnName.tagName = obj.id
			//汇总深度
			if (obj.codeFormat){
				var htmlStr = "汇总深度：<select name='depth1' id='depth1' tagName='" + obj.id + "' size='1' onchange='changeInitDepth(this.id, this.tagName);'>";
				var codeFormatArray = obj.codeFormat.split("-");
				for (var i = 1; i < codeFormatArray.length + 1; i++){
					if (obj.totleDepth == i){
					    htmlStr += "<option value='" + i + "' selected>" + i + "</option>";	
					    //动态绘制初始深度下拉列表框
					    drawInitDepth(i);
					}else {
					    htmlStr += "<option value='" + i + "'>" + i + "</option>";	
					    //给汇总列的汇总深度属性赋值
					    if (i == 1 && !obj.totleDepth){
    							//区分上部汇总列还是下部汇总列
    							var tempId = obj.id;
    							//原汇总列（报表区）总汇总深度
					        document.getElementById(tempId).totleDepth = i;
	  							if (tempId.indexOf("clone") == -1){
	      							tempId = "clone" + tempId;		
	  							}
	  							//克隆对象汇总列总汇总深度
					        document.getElementById(tempId).totleDepth = i;
					    }
					}
				}
				htmlStr += "</select>";
				document.getElementById("totleDepth").innerHTML = htmlStr;
				//给对象的属性赋值
				document.getElementById("totleDepth").style.display = "";	
				//2009-03-31 yuanxin;动态修改汇总列的总汇总深度和初始汇总深度，因为当前汇总列对象
			}else {
				document.getElementById("totleDepth").style.display = "none";
			}
			
			//初始汇总深度
			if (!obj.totleDepth && !obj.initDepth){
			    if (obj.codeFormat){
				    var htmlStr = "初始汇总深度：<select name='depth2' id='depth2' tagName='" + obj.id + "' size='1' onchange='saveInitDepth(this.id, this.tagName)'>";
				    htmlStr += "<option value='1'>1</option>";	
				    htmlStr += "</select>";
				    document.getElementById("initDepth").innerHTML = htmlStr;	
				    document.getElementById("initDepth").style.display = "";
				    //给汇总列的初始汇总深度赋值
    				//区分上不汇总列还是下部汇总列
    				var tempId = obj.id;
	  				//原始汇总列（报表区）的初始汇总深度
					  document.getElementById(tempId).initDepth = 1;
	  				if (tempId.indexOf("clone") == -1){
	      				tempId = "clone" + tempId;		
	  				}
	  				//当前克隆对象的初始汇总深度
					  document.getElementById(tempId).initDepth = 1;
			    }else {
				    document.getElementById("initDepth").style.display = "none";	
			    }
		  }else {
		      var htmlStr = "初始汇总深度：<select name='depth2' id='depth2' tagName='" + obj.id + "' size='1' onchange='saveInitDepth(this.id, this.tagName)'>";
		      for (var i = 1; i < Number(obj.totleDepth) + 1; i++){
		      	  if (Number(obj.initDepth) == i){
		              htmlStr += "<option value='" + i + "' selected>" + i + "</option>";	
		      	  }else {
		              htmlStr += "<option value='" + i + "'>" + i + "</option>";	
		      	  }
		      }
				  document.getElementById("initDepth").innerHTML = htmlStr;	
				  document.getElementById("initDepth").style.display = "";
		  }
		 
		  //显示要素合计
		  if (obj.isTotle == 1){
		      var totleStr = "<input type='checkbox' name='isTotle' id='isTotle' tagName='" + obj.id + "' value='' checked='checked' onclick='changeIsTotal(this.tagName);'/>显示要素合计";
		  }else {
		      var totleStr = "<input type='checkbox' name='isTotle' id='isTotle' tagName='" + obj.id + "' value='' onclick='changeIsTotal(this.tagName);'/>显示要素合计";
		  }
		  document.getElementById("totle").innerHTML = totleStr;
		  document.getElementById("totle").style.display = "";
		  //是否与上一列合并
		  if (obj.isMerger == 1){
		      var mergerStr = "<input type='checkbox' name='isMerger' id='isMerger' tagName='" + obj.id + "' value='' checked='checked' onclick='changeIsMerger(this.tagName);'/>与上一列合并";
		  }else {
		      var mergerStr = "<input type='checkbox' name='isMerger' id='isMerger' tagName='" + obj.id + "' value='' onclick='changeIsMerger(this.tagName);'/>与上一列合并";
		  }
		  document.getElementById("merger").innerHTML = mergerStr;
		  document.getElementById("merger").style.display = "";
		  
		  //songfupeng 20090707 是否显示代码
		  if(obj.isShowCode == 1){
		    var showCodeStr="<input type='checkbox' name='isShowCode' id='isShowCode' tagName='"+obj.id+"' value='' checked='checked' onclick='changeIsShowCode(this.tagName);'/>显示代码";
		  }else{
		    var showCodeStr="<input type='checkbox' name='isShowCode' id='isShowCode' tagName='"+obj.id+"' value=''  onclick='changeIsShowCode(this.tagName);'/>显示代码"
		  }
		  document.getElementById("showCode").innerHTML=showCodeStr;
		  document.getElementById("showCode").style.display="";
		  
		  //songfupeng 20090709 右侧显示汇总列
		  if(obj.isShowPlace == 1){
		    var showPlaceStr="<input type='checkbox' name='isShowPlace' id='isShowPlace' tagName='"+obj.id+"' value='' checked='checked' onclick='changeIsShowPlace(this.tagName);'/>右侧显示汇总列";
		  }else{
		    var showPlaceStr="<input type='checkbox' name='isShowPlace' id='isShowPlace' tagName='"+obj.id+"' value='' onclick='changeIsShowPlace(this.tagName);'/>右侧显示汇总列"
		  }
		  document.getElementById("showPlace").innerHTML=showPlaceStr;
		  document.getElementById("showPlace").style.display="";
		  
		}else if (!hasContain(absoluteX,absoluteY,gatherpad)){
			objP.style.display = "";
		}
		
	}
	
	document.body.onmousemove=function(){
		obj.style.left = event.clientX-_x+ document.documentElement.scrollLeft;
	  obj.style.top = event.clientY-_y + document.documentElement.scrollTop;
	}
}

// 设置统计列对象跟随鼠标移动
function statFollowMouse(objP){
	// 在原位置显示虚线框
	//if(statColumns[0]){
	//alert(statColumns[0].style.width);	
  //}

	objP.placeholder = showPlaceholder(objP);
	var obj = objP.cloneNode(true);
	obj.className="sclone";
	obj.srcobj = objP;
	objP.style.display = "none";
	//把克隆对象追加到窗体的末尾
	document.body.appendChild(obj);

	var followObj = obj;
	_x = event.offsetX;
	_y = event.offsetY;
	
	obj.style.position = "absolute";
	obj.style.left = event.clientX - _x + document.documentElement.scrollLeft;
	obj.style.top = event.clientY - _y + document.documentElement.scrollTop;
	obj.style.zIndex = 1000;

	/*for (var i = 0; i < statColumns.length; i++){
		if (statColumns[i].id == obj.id){
			statColumns[i].style.display = "";	
			//动态计算统计列的高度和宽度
			var childs = statColumns[i].children;
			if (flag01 == 0){
				obj.style.lineHeight = childs[0].offsetHeight + "px";
				flag01 = 1;
			}
			obj.style.width = childs[0].offsetWidth + "px";
		}
	}*/
	
	//根据鼠标的位置在报表汇总列或统计列中插入一个虚线框
	/*for (var i = 0; i < gatherColumns.length; i++){
		//debugger;
		if (hasContain(event.x,(event.y+gatherColumns[i].offsetHeight/2),gatherColumns[i])){
			alert("ok");
			var odiv = gatherColumns[i].cloneNode();
			//odiv.style.height = obj.style.height + 20px;
			odiv.style.background = "";
			odiv.style.border = "1px dashed #FF0000";
			obj.insertAdjacentElement("BeforeBegin",odiv);
		}
	}*/

	obj.setCapture();
	obj.onmouseup = function(){
		obj.srcobj.release();
		this.removeNode(true);
		//单击统计列时，显示统计列属性,同时隐藏汇总列列属性和单列统计列属性
		//设置鼠标的x和y轴绝对坐标
		var absoluteX = event.clientX + document.documentElement.scrollLeft;
		var absoluteY = event.clientY + document.documentElement.scrollTop
		if (hasContain(absoluteX,absoluteY,querystatcolumns)){
			//1：表示单列统计列
			if ("1".localeCompare(this.isSingle) == 0){
				seniorQueryForm.gatherColumnProperties.style.display="none";
				document.getElementById("gatherpad").style.display="none";
				document.getElementById("gatherpadbutton").className='';
				seniorQueryForm.statColumnProperties.style.display="";
				document.getElementById("statpad").style.display="none";
				document.getElementById("statpadbutton").className='';
				seniorQueryForm.singleStatColumnProperties.style.display="none";
				document.getElementById("singlestatpad").style.display="";
				document.getElementById("singlestatpadbutton").className='selected';
				seniorQueryForm.calculateStatColumnProperties.style.display="none";
				document.getElementById("singlestatpad").style.display="";
				document.getElementById("singlestatpadbutton").className='selected';
			  document.getElementById("conditionpad").style.display="none";
			  document.getElementById("conditionpadbutton").className='';
			  document.getElementById("conditionvaluepad").style.display="none";
			  document.getElementById("conditionvaluepadbutton").className='';
			  //隐藏统计列属性中的统计列的名称
			  document.getElementById("statColumnNameDiv").style.display = "none";
			  //显示单列统计列属性中的统计列的名称
			  document.getElementById("singleStatColumnNameDiv").style.display = "";
			  //隐藏统计列属性中的统计列明细全选复选框
			  document.getElementById("allDiv").style.display = "none";
			  //隐藏统计列明细对应的模板列表
			  document.getElementById("templateList").style.display = "none";
			  //隐藏统计列明细对应的数据预警设置
			  document.getElementById("warningArea").style.display = "none";
				//动态给单列统计列的属性赋值
				//统计列名称
			    seniorQueryForm.singleStatColumnName.value = obj.name;
			    //动态查询单列统计列的明细信息
			    findStatColumnDetail(obj.id);
			    //设置全局变量单列统计列名称，用于计算列中显示单列统计列明细列表
			    statColumnNameGlobal = obj.name;
			//2：表示计算列
			}else if ("2".localeCompare(this.isSingle) == 0){
				seniorQueryForm.gatherColumnProperties.style.display="none";
				document.getElementById("gatherpad").style.display="none";
				document.getElementById("gatherpadbutton").className='';
				seniorQueryForm.statColumnProperties.style.display="none";
				document.getElementById("statpad").style.display="none";
				document.getElementById("statpadbutton").className='';
				seniorQueryForm.singleStatColumnProperties.style.display="none";
				document.getElementById("singlestatpad").style.display="";
				document.getElementById("singlestatpadbutton").className='';
				seniorQueryForm.calculateStatColumnProperties.style.display="";
				document.getElementById("singlestatpad").style.display="";
				document.getElementById("singlestatpadbutton").className='selected';
			  document.getElementById("conditionpad").style.display="none";
			  document.getElementById("conditionpadbutton").className='';
			  document.getElementById("conditionvaluepad").style.display="none";
			  document.getElementById("conditionvaluepadbutton").className='';
			  //动态输出统计列明细列表
			  var aa = scdIdArrayAll;
			  var bb = scdCheckArrayAll;
			  var htmlStr = "";
			  for (var key in scdIdArrayAll){
			  	  //屏蔽prototype的方法
			  	  if (scdIdArrayAll[key][0]){
			  	  	  //标记统计列的名称
			  	  	  htmlStr += "<div style='margin-top:3px;margin-bottom:3px;'>" + statColumnObjectArrayAll[key].name + "</div>";
					  	  for (var i = 0; i < scdIdArrayAll[key].length; i++){
					  	      htmlStr += "<div class='menu1'>" 
					  	                  + "<input name='checkbox' type='radio' id='" + scdTempColumnAll[key][i] + "' onclick='changeFormula(this.id);'/>"
					  	                  + statColumnObjectArrayAll[key].scd[i].name
					  	                  + "</div>";
					  	  }
			  	  }
			  }
			  //songfupeng 20090807 在重新拖动计算列时，将initNum设置为0-初始值
			  initNum=0;
			  //songfupeng 20090807 在重新拖动计算列时，将totalformulStatus设置为0-初始值
			  totalformulStatus=0;
			   //songfupeng 20090807 在重新拖动计算列时，将formulaValue设置为""
			  formulaValue="";
			  document.getElementById("scdList").innerHTML = htmlStr;
			//0:表示普通多列统计列
			}else{
				seniorQueryForm.gatherColumnProperties.style.display="none";
				document.getElementById("gatherpad").style.display="none";
				document.getElementById("gatherpadbutton").className='';
				seniorQueryForm.statColumnProperties.style.display="";
				document.getElementById("statpad").style.display="";
				document.getElementById("statpadbutton").className='selected';
				seniorQueryForm.singleStatColumnProperties.style.display="none";
				document.getElementById("singlestatpad").style.display="none";
				document.getElementById("singlestatpadbutton").className='';
				seniorQueryForm.calculateStatColumnProperties.style.display="none";
				document.getElementById("singlestatpad").style.display="none";
				document.getElementById("singlestatpadbutton").className='';
			  document.getElementById("conditionpad").style.display="none";
			  document.getElementById("conditionpadbutton").className='';
			  document.getElementById("conditionvaluepad").style.display="none";
			  document.getElementById("conditionvaluepadbutton").className='';
			  //隐藏统计列属性的单列统计列的名称
			  document.getElementById("singleStatColumnNameDiv").style.display = "none";
			  //显示多列统计列属性的统计列的名称
			  document.getElementById("statColumnNameDiv").style.display = "";
			  //隐藏统计列明细对应的模板列表
			  document.getElementById("templateList").style.display = "none";
			  //隐藏统计列明细对应的数据预警设置
			  document.getElementById("warningArea").style.display = "none";
			  //显示统计列属性中的统计列明细全选复选框
			  document.getElementById("allDiv").style.display = "";
				//动态给多列统计列的属性赋值
				//统计列名称
			    seniorQueryForm.statColumnName.value = obj.name;
			    //动态查询统计列的明细信息
			    findStatColumnDetail(obj.id);
			    //设置全局变量统计列名称，用于计算列中显示统计列明细列表
			    statColumnNameGlobal = obj.name;
			}
		}else if (!hasContain(absoluteX,absoluteY,statpad) && !hasContain(absoluteX,absoluteY,singlestatpad)){
			objP.style.display = "";
		}else if (hasContain(absoluteX,absoluteY,singlestatpad)) {
			//1:单列统计列 2:计算列
			if (Number(this.isSingle) != 1 && Number(this.isSingle) != 2){
				objP.style.display = "";
			}else if (Number(this.isSingle) == 2){
				  //删除报表统计列中的计算列对象
				  for (var i = 0; i <statColumns.length; i++){
				      if (statColumns[i].id.localeCompare(objP.id) == 0){
				      	  //删除报表区中的计算列
				          statColumns.removeAt(i);
				          objP.removeNode(true);
				          //删除报表区中计算列对应的计算列对象
				          calColumnObjectArrayAll.remove(calColumnObjectArrayAll[objP.id]);
				      }	
				  }
			    	
			}
		}else if (hasContain(absoluteX,absoluteY,statpad) && (Number(this.isSingle) != 0)){
			objP.style.display = "";
		}
	}
	
	document.body.onmousemove=function(){
		obj.style.left = event.clientX -_x + document.documentElement.scrollLeft;
		obj.style.top = event.clientY -_y + document.documentElement.scrollTop;
	}
}

// 取消对象跟随鼠标移动
function releaseMouse(obj){
	var p = new Object();
	//p.x = event.x + document.documentElement.scrollLeft;
	//p.y = event.y + document.documentElement.scrollTop
	p.x = event.clientX + document.documentElement.scrollLeft;
	p.y = event.clientY + document.documentElement.scrollTop;
	obj.style.position = "static";
	obj.releaseCapture();
	if(obj.placeholder != null){
		obj.placeholder.removeNode(true);
		obj.placeholder = null;
	}
	
	document.body.onmousemove = null;
	return p;
}

// 在对象位置显示一个虚线框
function showPlaceholder(obj){
	var odiv = obj.cloneNode();
	//odiv.style.height = obj.style.height + 20px;
	odiv.style.background = "";
	odiv.style.border = "1px dashed #CCCCCC";
	//#FF0000  #CCCCCC
	obj.insertAdjacentElement("BeforeBegin",odiv);
	
	return odiv;
}


// 初始化上方汇总列设置区域
/*function init_originalquerygathercolumns(div){
	// 增加一个汇总列
	div.addGatherColumn = function(gather,x,y){
		var p = 0;
		for(i=0;i<gatherColumns.length;i++){
			if(hasContain(x,y,gatherColumns[i].HTMLobject)){
				// 判断鼠标指针的位置是在目标汇总列的上面还是下面 
				if(hasContain((x+gatherColumns[i].HTMLobject.offsetHeight/2),y,gatherColumns[i].HTMLobject)){
					// 需要将汇总列插入到它的上面
					p = i;
				}
				else{
					// 需要将统计列插入到它的下面
					p = i+1;
				}
				break;
			}
		}

		originalGatherColumns.add(p,gather);
		this.showGatherColumns();
	};
	
	// 在中显示汇总列
	div.showGatherColumns = function(){
		var childs = this.children;
		for(i=childs.length;i>0;i--){
			childs[i-1].removeNode(true);
		}
	
		for(i=0;i<gatherColumns.length;i++){
			var odiv = document.createElement("<div style='border:1px dashed #CCCCCC'></div>");
			odiv.style.paddingLeft = (i*10)+"px";
			odiv.appendChild(gatherColumns[i].HTMLobject);
			this.appendChild(odiv);
		}
	
	}
}

// 初始化下方汇总列设置区域
function init_querygathercolumns(div){
	// 增加一个汇总列
	div.addGatherColumn = function(gather,x,y){
		var p = 0;
		for(i=0;i<gatherColumns.length;i++){
			if(hasContain(x,y,gatherColumns[i].HTMLobject)){
				// 判断鼠标指针的位置是在目标汇总列的上面还是下面 
				if(hasContain((x+gatherColumns[i].HTMLobject.offsetHeight/2),y,gatherColumns[i].HTMLobject)){
					// 需要将汇总列插入到它的上面
					p = i;
				}
				else{
					// 需要将统计列插入到它的下面
					p = i+1;
				}
				break;
			}
		}

		gatherColumns.add(p,gather);
		this.showGatherColumns();
	};
	
	// 在中显示汇总列
	div.showGatherColumns = function(){
		var childs = this.children;
		for(i=childs.length;i>0;i--){
			childs[i-1].removeNode(true);
		}
	
		for(i=0;i<gatherColumns.length;i++){
			var odiv = document.createElement("<div style='border:1px dashed #CCCCCC'></div>");
			odiv.style.paddingLeft = (i*10)+"px";
			odiv.appendChild(gatherColumns[i].HTMLobject);
			this.appendChild(odiv);
		}
	
	}
}*/

// 判断坐标是否在目标内
function hasContain (x,y,obj){
	var left = 0;
	var top = 0;
	var width = obj.offsetWidth - 2;
	var height = obj.offsetHeight - 2;
	var o = obj;
	while(o != null){
		left += o.offsetLeft;
		top += o.offsetTop;
		o = o.offsetParent;
	}
	return (left<=x) && ((left+width)>=x) && (top<=y) && ((top+height)>=y);		
}

// 判断坐标是否在目标内(适用于汇总列排序)
function hasContainForGather(x,y,obj,gathersLength){
	var left = 0;
	var top = 0;
	var width = obj.offsetWidth - 2;
	var height = obj.offsetHeight - 2;
	var o = obj;
	while(o != null){
		left += o.offsetLeft;
		top += o.offsetTop;
		o = o.offsetParent;
	}
	var scrollLeft = document.getElementById("querygathercolumns").scrollLeft;
	var scrollTop = document.getElementById("querygathercolumns").scrollTop;
	//songfupeng 200908 完善对汇总列进行拖动时，对其进行自动排序
	if(scrollTop == 0  && gathersLength>=6){
		scrollTop=6;
	}	else if(scrollTop >27 && gathersLength>=6){
		scrollTop = scrollTop-25;
	} else if(scrollTop <=27 && gathersLength>=6){
	   scrollTop = scrollTop-11;
	}

	window.status = scrollLeft + ":" + scrollTop;

//      return ((left-scrollLeft)<=x) && ((left+width-scrollLeft)>=x) && ((top-scrollTop)<=y) && ((top+height-scrollTop)>=y);		

	
   return ((left-scrollLeft)<=(x+scrollLeft)) && ((left+width-scrollLeft)>=(x+scrollLeft)) && ((top-scrollTop)<=(y+scrollTop)) && ((top+height-scrollTop)>=(y+scrollTop));		
}

//刷新初始汇总列设置区域
function refresh_originalquerygathercolumns(div){
	//删除对象的子节点
	var childs = div.children;
	for (i = childs.length; i > 0; i--){
		childs[i - 1].removeNode(true);	
	}
	//添加对象的子节点
	for(var i=0;i<originalGatherColumns.length;i++){
		//var odiv = document.createElement("<div style='border:0px dashed #CCCCCC'></div>");
		//odiv.style.paddingLeft = (i*10)+"px";
		//odiv.appendChild(originalGatherColumns[i]);
		div.appendChild(originalGatherColumns[i]);
	}
}

//刷新报表汇总列设置区域
function refresh_querygathercolumns(div){
	//删除对象的子节点
	var childs = div.children;
	for (i = childs.length; i > 0; i--){
		childs[i - 1].removeNode(true);	
	}
	//提取要在报表汇总区显示的汇总列
	//var gatherColumnsView = new Array();
	//for (var i = 0; i < gatherColumns.length; i++){
	    //if (gatherColumns[i].style.display == ""){
	        //gatherColumnsView[gatherColumnsView.length] = gatherColumns[i];     	
	    //}	
	//}
	//添加对象的子节点
	//临时变量displayIndex来记录在报表区可显示的汇总列顺序
	var displayIndex = 0;
	var tempFlag = 0;
	for(var i=0;i<gatherColumns.length;i++){
		var odiv = document.createElement("<div style='border:0px dashed #CCCCCC'></div>");
		if (gatherColumns[i].style.display == ""){
			  if (tempFlag == 0){
		        displayIndex += 0;	
			  }else {
		        displayIndex += 1;	
			  }
		    tempFlag = 1;
		}
		odiv.style.paddingLeft = (displayIndex*10)+"px";
		odiv.appendChild(gatherColumns[i]);
		div.appendChild(odiv);
	}
}

//刷新初始统计列设置区域
function refresh_originalquerystatcolumns(div){
	//删除对象的子节点
	var childs = div.children;
	for (i = childs.length; i > 0; i--){
		childs[i - 1].removeNode(true);	
	}
	//添加对象的子节点
	for(var i=0;i<originalStatColumns.length;i++){
		//var odiv = document.createElement("<div style='border:1px dashed #CCCCCC'></div>");
		//odiv.style.paddingLeft = (i*10)+"px";
		//odiv.appendChild(originalStatColumns[i]);
		div.appendChild(originalStatColumns[i]);
	}
}

//刷新初始单列统计列设置区域
function refresh_originalsinglequerystatcolumns(div){
	//删除对象的子节点
	var childs = div.children;
	for (i = childs.length; i > 0; i--){
		childs[i - 1].removeNode(true);	
	}
	//添加对象的子节点
	for(var i=0;i<originalSingleStatColumns.length;i++){
		//var odiv = document.createElement("<div style='border:1px dashed #CCCCCC'></div>");
		//odiv.style.paddingLeft = (i*10)+"px";
		//odiv.appendChild(originalStatColumns[i]);
		div.appendChild(originalSingleStatColumns[i]);
	}
}

//刷新报表统计列设置区域
function refresh_querystatcolumns(div){
	//删除对象的子节点
	var childs = div.children;
	for (i = childs.length; i > 0; i--){
		childs[i - 1].removeNode(true);	
	}
	//添加对象的子节点
	for(var i=0;i<statColumns.length;i++){
		var odiv = document.createElement("<div style='border:0px dashed #CCCCCC'></div>");
		//odiv.style.width = 20 + "px";
		//odiv.style.paddingLeft = (i*10)+"px";
		statColumns[i].onmouseover=null;
		odiv.appendChild(statColumns[i]);
		div.appendChild(odiv);
	}
	
			//alert(div.offsetWidth);
		//alert(querystatcolumns.style.width);
		//var temp1 = querystatcolumns.offsetWidth;
		//var temp2 = div.offsetWidth ;
		//alert("temp1:" + temp1);
		//alert("temp2:" + temp2);
		//querystatcolumns.style.width = (temp1 + temp2)+ "px";
		//alert(querystatcolumns.style.width);
	var childs = querystatcolumns.children;
	var w = 0;
	for(var i=0;i<childs.length;i++){
		w += childs[i].offsetWidth + 10;
	}
	if(w < querystatcolumns.parentElement.offsetWidth){
		querystatcolumns.style.width = querystatcolumns.parentElement.offsetWidth + "px";
	}
	else{
		querystatcolumns.style.width = w + "px";
	}
	
}

//设置报表区汇总列的显示顺序
function sortGatherColumn(gather,x,y){
	//查找拖动的初始汇总列对应的报表汇总列
	//记录拖动的汇总列对象
	var flag = null;
	//记录拖动的汇总列序号
	var flag1 = 0;
	for (var m = 0; m < gatherColumns.length; m++){
		if (gatherColumns[m].innerHTML == gather.innerHTML)	{
			flag = gatherColumns[m];
			flag1 = m;
			break;
		}
	}
	for(i=0;i<gatherColumns.length;i++){
		if(hasContainForGather(x,y,gatherColumns[i],gatherColumns.length)){
	/*
			// 判断鼠标指针的位置是在目标汇总列的上面还是下面 
			if(hasContain(x,(y+gatherColumns[i].offsetHeight/2),gatherColumns[i])){
				// 需要将汇总列插入到它的上面
				//处理汇总列从下往上拖动的情况
				if (flag1 > i){
				   var gatherColumnsTemp = new Array(gatherColumns.length);
				   //记录temk的值是否加过1
				   var f = 0;
				    for (var j = 0; j < i; j++){
					    gatherColumnsTemp[j] = 	gatherColumns[j];
				    }
				    gatherColumnsTemp[i] = flag;
				    for (var k = i + 1; k < gatherColumns.length; k++){
					    var temk = k - 1;
					    if (gatherColumns[temk].innerHTML == flag.innerHTML){
						    temk += 1;
					    	gatherColumnsTemp[k] = gatherColumns[temk];	
							f = 1;
					    }else {
							if (f == 0){
					    		gatherColumnsTemp[k] = gatherColumns[k - 1];	
							}else {
					    		gatherColumnsTemp[k] = gatherColumns[k];	
							}
						}						
				    }
				    gatherColumns = gatherColumnsTemp;
					//alert("1");
				}else if (flag1 < i){
				    var gatherColumnsTemp = new Array(gatherColumns.length);
					//记录temj的值是否加过1
					var f = 0;
				    for (var j = 0; j < i - 1; j++){
						var temj = j;
					    if (gatherColumns[temj].innerHTML == flag.innerHTML){
						    temj += 1;
					    	gatherColumnsTemp[j] = 	gatherColumns[temj];
							f = 1;
					    }else {
							if (f == 0){
					    		gatherColumnsTemp[j] = 	gatherColumns[j];
							}else {
					    		gatherColumnsTemp[j] = 	gatherColumns[j + 1];
							}
						}
				    }
				    gatherColumnsTemp[i - 1] = flag;
				    for (var k = i; k < gatherColumns.length; k++){
					    gatherColumnsTemp[k] = gatherColumns[k];	
				    }
				    gatherColumns = gatherColumnsTemp;
					//alert("2");
				}
			}
			else{
				// 需要将统计列插入到它的下面
				//处理汇总列从下往上拖动的情况
				if (flag1 > i && (flag1 - i > 1)){
					var gatherColumnsTemp = new Array(gatherColumns.length);
					for (var j = 0; j < i + 1; j++){
						gatherColumnsTemp[j] = 	gatherColumns[j];
					}
					gatherColumnsTemp[i + 1] = flag;
					for (var k = i + 2; k < gatherColumns.length; k++){
						var temk = k - 1;
						if (gatherColumns[temk].innerHTML == flag.innerHTML){
							temk += 1;
						}
						gatherColumnsTemp[k] = gatherColumns[temk];	
					}
					gatherColumns = gatherColumnsTemp;
					//alert("3");
				}else if (flag1 < i){
					var gatherColumnsTemp = new Array(gatherColumns.length);
					//记录temj的值是否加过1
					var f = 0;
					for (var j = 0; j < i; j++){
						var temj = j;
					    if (gatherColumns[temj].innerHTML == flag.innerHTML){
						    temj += 1;
					    	gatherColumnsTemp[j] = 	gatherColumns[temj];
							f = 1;
					    }else {
							if (f == 0){
					    		gatherColumnsTemp[j] = 	gatherColumns[j];
							}else {
					    		gatherColumnsTemp[j] = 	gatherColumns[j + 1];
							}
						}
					}
					gatherColumnsTemp[i] = flag;
					for (var k = i + 1; k < gatherColumns.length; k++){
						gatherColumnsTemp[k] = gatherColumns[k];	
					}
					gatherColumns = gatherColumnsTemp;
					//alert("4");
				}
			}
			break;
	*/	

//debugger;
				//处理汇总列从下往上拖动的情况
				if (flag1 > i){
				   var gatherColumnsTemp = new Array(gatherColumns.length);
				   //把要插入汇总列之前的值放入临时数组（0->i-1）
				   for(var j = 0; j < i; j++){
				       gatherColumnsTemp[j] = gatherColumns[j];
				   }
				   //把插入汇总列的值放入临时数组(i)
				   gatherColumnsTemp[j] = gatherColumns[flag1];
				   //把插入汇总列开始之后的汇总列值放入临时数组（i->(flag1-1)）
				   for(var j = i; j < flag1; j++){
				       gatherColumnsTemp[j+1] = gatherColumns[j];    	
				   }
				   //把要插入汇总列之后的汇总列值放入临时数组（(flag1+1)->(gatherColumns-1)）
				   for(var j = flag1+1; j < gatherColumns.length; j++){
				   	   gatherColumnsTemp[j] = gatherColumns[j];
				   }
				    gatherColumns = gatherColumnsTemp;
					//alert("1");
				//处理汇总列从上往下拖动的时候
				}else if (flag1 < i){
				    var gatherColumnsTemp = new Array(gatherColumns.length);
				    //把要插入汇总列之前的汇总列值放入临时数组中（0->flag1）
				    for(var j = 0; j < flag1; j++){
				        gatherColumnsTemp[j] = gatherColumns[j];   	
				    }
				    //把要插入汇总列之后到插入汇总列的值放入临时数组中（(flag1+1)->i）
				    for(var j = flag1; j < i; j++){
				        gatherColumnsTemp[j] = gatherColumns[j + 1];    	
				    }
				    //把要插入汇总列放入临时数组中
				    gatherColumnsTemp[i] = gatherColumns[flag1];
				    //把插入汇总列之后的汇总列放入临时数组中((i+1)->(gatherColumns-1))
				    for(var j = i+1; j < gatherColumns.length; j++){
				        gatherColumnsTemp[j] = gatherColumns[j];   	
				    }
				    gatherColumns = gatherColumnsTemp;
					//alert("2");
				//当汇总列从初始区拖放到报表区时
				}
			break;

		
		}
	}
}

//设置报表区统计列的显示顺序
function sortStatColumn(stat,x,y){
	stat.placeholder = showPlaceholder(stat);
	//查找拖动的初始统计列对应的报表统计列
	//记录拖动的统计列对象
	var flag = null;
	//记录拖动的统计列列序号
	var flag1 = 0;
	for (var m = 0; m < statColumns.length; m++){
		if (statColumns[m].id == stat.id)	{
			flag = statColumns[m];
			flag1 = m;
			break;
		}
	}
	for(i=0;i<statColumns.length;i++){
		if(hasContain(x,y,statColumns[i])){
				//处理统计列从下往上拖动的情况
				if (flag1 > i){
				   var statColumnsTemp = new Array(statColumns.length);
				   //把要插入统计列之前的值放入临时数组（0->i-1）
				   for(var j = 0; j < i; j++){
				       statColumnsTemp[j] = statColumns[j];
				   }
				   //把插入统计列的值放入临时数组(i)
				   statColumnsTemp[j] = statColumns[flag1];
				   //把插入统计列开始之后的统计列值放入临时数组（i->(flag1-1)）
				   for(var j = i; j < flag1; j++){
				       statColumnsTemp[j+1] = statColumns[j];    	
				   }
				   //把要插入统计列之后的统计列值放入临时数组（(flag1+1)->(statColumns-1)）
				   for(var j = flag1+1; j < statColumns.length; j++){
				   	   statColumnsTemp[j] = statColumns[j];
				   }
				    statColumns = statColumnsTemp;
					//alert("1");
				//处理统计列从上往下拖动的时候
				}else if (flag1 < i){
				    var statColumnsTemp = new Array(statColumns.length);
				    //把要插入统计列之前的统计列值放入临时数组中（0->flag1）
				    for(var j = 0; j < flag1; j++){
				        statColumnsTemp[j] = statColumns[j];   	
				    }
				    //把要插入统计列之后到插入统计列的值放入临时数组中（(flag1+1)->i）
				    for(var j = flag1; j < i; j++){
				        statColumnsTemp[j] = statColumns[j + 1];    	
				    }
				    //把要插入统计列放入临时数组中
				    statColumnsTemp[i] = statColumns[flag1];
				    //把插入统计列之后的统计列放入临时数组中((i+1)->(statColumns-1))
				    for(var j = i+1; j < statColumns.length; j++){
				        statColumnsTemp[j] = statColumns[j];   	
				    }
				    statColumns = statColumnsTemp;
					//alert("2");
				//当统计列从初始区拖放到报表区时
				}
			break;
	
	
		}
	}
}

//当改变汇总列的汇总深度值时动态改变汇总列初始深度选择范围
function changeInitDepth(id, objId){
	var depthTem = document.getElementById(id).value;
	drawInitDepth(depthTem, objId);
	//动态改变汇总列的汇总深度属性值
	if (objId.indexOf("clone") == -1){
	    objId = "clone" + objId;		
	}
	document.getElementById(objId).totleDepth = depthTem;
}

//动态绘制初始深度下拉列表框
function drawInitDepth(depth, objIdTem){
	depth = Number(depth);
	var htmlStr1 = "初始汇总深度：<select name='depth2' id='depth2' tagName='" + objIdTem + "' size='1' onchange='saveInitDepth(this.id, this.tagName)'>";
	for (var i = 1; i < depth + 1; i++){
		htmlStr1 += "<option value='" + i + "'>" + i + "</option>";	
	}
	htmlStr1 += "</select>";
	document.getElementById("initDepth").innerHTML = htmlStr1;	
	document.getElementById("initDepth").style.display = "";
}

//把初始深度的选中值保存到对象上
function saveInitDepth(id, objId) {
	  //初始深度选中值
    var depthTem = document.getElementById(id).value;	
    //区分上不汇总列还是下部汇总列
	  if (objId.indexOf("clone") == -1){
	      objId = "clone" + objId;		
	  }
    //把初始深度值保存到汇总列对象上（）
	  document.getElementById(objId).initDepth = depthTem;
}

//动态改变汇总列的是否显示合计属性
function changeIsTotal(objId){
	  if (objId.indexOf("clone") == -1){
	      objId = "clone" + objId;		
	  }
    if (document.getElementById("isTotle").checked){
	      //把显示要素合计值保存到汇总列对象上
	      document.getElementById(objId).isTotle = 1;
    }else {
	      //把显示要素合计值保存到汇总列对象上
	      document.getElementById(objId).isTotle = 0;
    }
}
//songfupeng 20091209 合并状态
var isMergerStatus=0;
//动态改变汇总列是否与上一列合并属性
function changeIsMerger(objId){
	  if (objId.indexOf("clone") == -1){
	      objId = "clone" + objId;		
	  }
	  
	  var io=0;
	  var x;
	  for(x in templateArrayAll){
	    if(x.indexOf("sccd")!=-1){
		    for(var i=0;i<templateArrayAll[x].length;i++){
		     	if(templateArrayAll[x][i]!=0){
		     	 	 document.getElementById("isMerger").checked=false;
				     alert("已经有模板选择!");
				     return;
		     	} 
		    }
	    }
	  }
	 
   	  if (document.getElementById("isMerger").checked){
	      //把显示要素合计值保存到汇总列对象上
	      document.getElementById(objId).isMerger = 1;
	      isMergerStatus+=1;
   	  }else {
	      //把显示要素合计值保存到汇总列对象上
	      document.getElementById(objId).isMerger = 0;
	      isMergerStatus-=1;
      }
}
//songfupeng 090701 动态改变汇总列是否显示代码
function changeIsShowCode(objId){
	  if (objId.indexOf("clone") == -1){
	      objId = "clone" + objId;		
	  }
	  if (document.getElementById("isShowCode").checked){
	      //把显示代码值保存到汇总列对象上
		  document.getElementById(objId).isShowCode = 1;
	  }else {
	      //把显示代码值保存到汇总列对象上
	      document.getElementById(objId).isShowCode = 0;
	  }
}
//songfupeng 090709 动态改为右侧显示汇总列
function changeIsShowPlace(objId){
	  if (objId.indexOf("clone") == -1){
	      objId = "clone" + objId;		
	  }
	  if (document.getElementById("isShowPlace").checked){
	      //把显示代码值保存到汇总列对象上
		  document.getElementById(objId).isShowPlace = 1;
	  }else {
	      //把显示代码值保存到汇总列对象上
	      document.getElementById(objId).isShowPlace = 0;
	  }
	  
}

//返回统计列表头明细信息的回调函数
function processResponse(text){
	//把统计列明细放入数组中
    eval("var result = " + text);
    statColumnDetailArray = result.statColumnDetailJson;
    //创建统计列对象，用于计算列中显示各统计列列表
    var statColumnObject = new Object();
    statColumnObject.scd = statColumnDetailArray;
    statColumnObject.name = statColumnNameGlobal;
    
    //定义全局变量来记录当前操作的统计列id
    statColumnIdGlobal = statColumnDetailArray[0].statColumnId;
    //统计列明细ID;定义为全局变量;scdIdArray为保存单个统计列的明细id;scdIdArrayAll为二维数组,通过键(统计列ID)值(scdIdArray)保存多个统计列明细的id
    scdIdArray = new Array();
    scdTempCloumnArray=new Array();
    //统计列明细选中状态;定义为全局标量;scdCheckArray为保存单个统计列明细的选中状态;scdCheckArrayAll为二维数组,通过键(统计列ID)值(scdCheckArray)保存多个统计列明细的选中状态
    scdCheckArray = new Array();
    //保存统计列明细的隐藏域;定义为全局变量;hiddenStrArray为保存单个统计列明细的隐藏域;scdMap为二维数组,通过键(统计列ID)值(hiddenStrArray)保存多个统计列明细的隐藏域
    hiddenStrArray = new Array();
    
    //判断统计列是否已经被打开过（被拖放到统计列表头区域）
    if (!scdIdArrayAll[statColumnDetailArray[0].statColumnId]){
        //构造存放（单个）统计列明细隐藏域、选中状态和统计列明细id的数组
        for (var i = 0; i < statColumnDetailArray.length; i++){
            hiddenStrArray[i] = "<input type='hidden' id='scd_" + statColumnDetailArray[i].statColumnDetailId + "' name='scd_" 
                              + statColumnDetailArray[i].statColumnId + "_" + statColumnDetailArray[i].sortNo + "' value='1'/>";
            scdCheckArray[i] = "1";
            scdIdArray[i] = statColumnDetailArray[i].statColumnDetailId;	
            scdTempCloumnArray[i]=statColumnDetailArray[i].tmpColumn;
        }
    //构造（总的）统计列明细id、选中状态、隐藏域的数组
	  scdIdArrayAll[statColumnDetailArray[0].statColumnId] = scdIdArray;
		scdCheckArrayAll[statColumnDetailArray[0].statColumnId] = scdCheckArray;
		scdTempColumnAll[statColumnDetailArray[0].statColumnId] = scdTempCloumnArray;
    scdMap[statColumnDetailArray[0].statColumnId] = hiddenStrArray;
    //构造统计列对象数组
    statColumnObjectArrayAll[statColumnDetailArray[0].statColumnId] = statColumnObject;
    }
    //给scdIdArray和scdCheckArray赋值，以便在单击全选按钮时改变所有统计列明细的选中状态
    scdIdArray = scdIdArrayAll[statColumnDetailArray[0].statColumnId];
    scdCheckArray = scdCheckArrayAll[statColumnDetailArray[0].statColumnId];
    scdTempCloumnArray=scdTempColumnAll[statColumnDetailArray[0].statColumnId];
    //把统计列明细输出到界面上
    var htmlStr01 = "";
    for (var i = 0; i < statColumnDetailArray.length; i++){
        htmlStr01 += "<div class='menu1'>";		
        htmlStr01 += "<input type='checkbox' id='sccd_" + statColumnDetailArray[i].statColumnDetailId + "'" 
                     + " name='scdetail' value='" + i + "' checked='checked' onclick='checkscd(this.id,this.value);'/>"
                     + "<a name='sccd_" + statColumnDetailArray[i].statColumnDetailId + "' href='#' id='ssccd_" + statColumnDetailArray[i].statColumnDetailId + "' scdName='" + statColumnDetailArray[i].name + "' onclick='viewTemplate(this.name, this.scdName);'>" + statColumnDetailArray[i].name + "</a>";
        htmlStr01 += "</div>";
    }
    document.getElementById("statColumnDetail").innerHTML = htmlStr01;
    //把统计列明细全选复选框置为选中状态
    document.getElementById("all").checked = "checked";

//开始
    
//改变表头背景色功能
var headTableName = "headTable" + statColumnDetailArray[0].statColumnId;
var otable = document.getElementById(headTableName);
//初始化二维数组的行数；把headArray定义为全局变量
headArray = new Array(otable.tHead.rows.length);
//查找二维数组的列数
var colNumbers = 0;
	for (var i = 0; i < otable.tHead.rows(0).cells.length; i++){
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
		for (var kk = 0; kk < otable.tHead.rows[jj].cells.length; kk++){
			//把合并列对象合并的列数放入对象的value属性中来保持合并列的状态
			otable.tHead.rows[jj].cells[kk].value=otable.tHead.rows[jj].cells[kk].colSpan;
			otable.tHead.rows[jj].cells[kk].className="statecolumnBackColour";
	    	startcell = Filltable(jj,startcell,otable.tHead.rows[jj].cells[kk]);
		}
	}
    /**
     * 返回值：下一个填充单元格的列数;startrow:行数、startcol：要填充的当前列数、thobj：要填充的当前列对象
     */
function Filltable(startrow,startcol,thobj){
    var currentCell = startcol;
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
    return currentCell;
}
//处理最后一行<tr></tr>中无值的情况
if (headArray[headArray.length - 1][0] == null){
	delete headArray[headArray.length - 1];
	headArray.length = headArray.length - 1;
}
//保持统计列明细原始状态
if(scdMap[statColumnDetailArray[0].statColumnId]){
	for(var ii = 0; ii < scdIdArrayAll[statColumnDetailArray[0].statColumnId].length; ii++){
		if(scdCheckArrayAll[statColumnDetailArray[0].statColumnId][ii]=="0"){
		var id = "sccd_"+scdIdArrayAll[statColumnDetailArray[0].statColumnId][ii];
		document.getElementById(id).checked="";
		//取消全选复选框的选中状态
		document.getElementById("all").checked="";
		//判断统计列明细是否被选中
		if(document.getElementById(id).checked==""){
			scdCheckArray[ii] = "0";
			}else{
				scdCheckArray[ii] = "1";
			}
		}
	}	
}
//保持统计列明细原始背景色状态
if (scdMap[statColumnDetailArray[0].statColumnId]){
	for (var ii = 0; ii < scdIdArrayAll[statColumnDetailArray[0].statColumnId].length; ii++){
		if (scdCheckArrayAll[statColumnDetailArray[0].statColumnId][ii]=="0"){
			//把背景色变为白色
			headArray[headArray.length - 1][ii].className = "";
			//判断本列所有行的背景色状态
			for (var i = headArray.length - 2 ; i >= 0; i--){
				if (headArray[i][ii].value == 1){
					headArray[i][ii].className="";
					headArray[i][ii].value -= 1;
				}else if (headArray[i][ii].value > 1){
					headArray[i][ii].value -= 1;
				}
			}
		}else {
			//把背景色变为蓝色
			headArray[headArray.length - 1][ii].className = "statecolumnBackColour";
			//判断本列所有行的背景色状态
			for (var i = headArray.length - 2 ; i >= 0; i--){
				//headArray[i][ii].value += 1;
				headArray[i][ii].className = "statecolumnBackColour";
			}
		}
	}	
}

//结束    
    
}
//动态查询统计列明细信息
function findStatColumnDetail(statColumnId){ 
    var postDatastr = "&statColumnId="+statColumnId;
    var preurl = PATH_PREFIX + "/salary/discovery/findstatcolumndetailbyajaxaction.do?t=" + Math.random();
    //调用ajax.js中的方法
    startRequest("POST",preurl,postDatastr,processResponse);
}

//为统计列明细定制查询模板（为数据挖掘做准备）
function viewTemplate(statColumnDetailId, scdName) {
	  if (document.getElementById(statColumnDetailId).checked){
	  	  if (beforeStatColumnDetailIdGloble && document.getElementById("s" + beforeStatColumnDetailIdGloble)){
	  	      document.getElementById("s" + beforeStatColumnDetailIdGloble).style.backgroundColor = "ffffff";	
	  	  }
	  	  //改变统计列明细的背景色来表示当前设置的统计列明细
	  	  document.getElementById("s" + statColumnDetailId).style.backgroundColor = "ff8000";
        var postDatastr = "&statColumnDetailId=" + statColumnDetailId + "&scdName=" + scdName;
        var preurl = PATH_PREFIX + "/salary/discovery/findtemplatebyajaxaction.do?t=" + Math.random();
        //调用ajax.js中的方法
        startRequest("POST",preurl,postDatastr,queryTemplateResponse);
        //保存统计列明细的id
        beforeStatColumnDetailIdGloble = statColumnDetailId;
	  }else {
	      return false;	
	  }
}

//AJAX查询模板的回调函数
function queryTemplateResponse(text){
	  var templateList = new Array();
	
	  eval("var result = templateList = " + text);
	  //模板列表
	  templateList = result.templateJson;
	  //统计列明细ID
	  var statColumnDetailId = result.statColumnDetailId.name;
	  //2009-02-06 yuanxin;统计列名称name
	  var statColumnDetailName = result.scdName;
	  //单个统计列明细对应的模板数组
	  var templateArray = new Array();
	  //单个统计列明细对应的预警值对象
	  var warningObj = new Object();
	  //显示统计列明细模板列表
	  document.getElementById("templateList").style.display = "";
	  //显示统计列明细预警值
	  document.getElementById("warningArea").style.display = "";
	  //保存统计列明细预警值到对象上
	  //统计列明细名称
	  warningObj.scdName = statColumnDetailName;
	  //上线预警值
	  warningObj.topWarning = "9999999999";
	  //使用统计列明细ID表示各预警值对象
	  document.getElementById("topWarning").scdId = statColumnDetailId;
	  //上限文本颜色(初始值)
	  warningObj.topFontColor = "00ff00";
	  //使用统计列明细ID表示各预警值对象
	  document.getElementById("topFontColor").scdId = statColumnDetailId;
	  //上限背景颜色(初始值)
	  warningObj.topBackColor = "ffffff";
	  //使用统计列明细ID表示各预警值对象
	  document.getElementById("topBackColor").scdId = statColumnDetailId;
	  //下线预警值
	  warningObj.bottomWarning = "0";
	  //使用统计列明细ID表示各预警值对象
	  document.getElementById("bottomWarning").scdId = statColumnDetailId;
	  //下限文本颜色(初始值)
	  warningObj.bottomFontColor = "ff0000";
	  //使用统计列明细ID表示各预警值对象
	  document.getElementById("bottomFontColor").scdId = statColumnDetailId;
	  //下限背景颜色(初始值)
	  warningObj.bottomBackColor = "ffffff";
	  //使用统计列明细ID表示各预警值对象
	  document.getElementById("bottomBackColor").scdId = statColumnDetailId;
	  //把模板列表动态输出到页面上供用户选取
	  var htmlStr = "";
	      for (var i = 0; i < templateList.length; i++){
//            htmlStr += "<div class='menu1'>";		
//            htmlStr += "<input type='checkbox' id='" + templateList[i].code + "'" 
//                         + " name='" + statColumnDetailId + "' value='" + i + "' onclick='saveTemplate(this.id, this.name, this.value);'/>"
//                         + templateList[i].name;
//songfupeng 20091208 如果document.getElementById("isMerger")为null,则没有点击汇总列某个标签;
//songfupeng 20091208 如果document.getElementById("isMerger")不为null,则点击汇总列某个标签;
   if(document.getElementById("isMerger")==null){
	   if(updateIsMerger>0){
			htmlStr +="<select id='"+templateList[i].code+"' name='"+statColumnDetailId+"' onchange='saveTemplate1(this.id,this.name)' disabled='disabled'><option value='none'>&nbsp;&nbsp;不选择&nbsp;&nbsp;</option></option><option value='condition'>选择有条件</option><option value='uncondition'>选择无条件</option><select>"+templateList[i].name;
		}else{
			htmlStr +="<select id='"+templateList[i].code+"' name='"+statColumnDetailId+"' onchange='saveTemplate1(this.id,this.name)'><option value='none'>&nbsp;&nbsp;不选择&nbsp;&nbsp;</option></option><option value='condition'>选择有条件</option><option value='uncondition'>选择无条件</option><select>"+templateList[i].name;
		}
   }else{
     if(isMergerStatus!=0){
     	htmlStr +="<select id='"+templateList[i].code+"' name='"+statColumnDetailId+"' onchange='saveTemplate1(this.id,this.name)' disabled='disabled'><option value='none'>&nbsp;&nbsp;不选择&nbsp;&nbsp;</option></option><option value='condition'>选择有条件</option><option value='uncondition'>选择无条件</option><select>"+templateList[i].name;
     }else{
			htmlStr +="<select id='"+templateList[i].code+"' name='"+statColumnDetailId+"' onchange='saveTemplate1(this.id,this.name)'><option value='none'>&nbsp;&nbsp;不选择&nbsp;&nbsp;</option></option><option value='condition'>选择有条件</option><option value='uncondition'>选择无条件</option><select>"+templateList[i].name;
		}
   }
	
            
            htmlStr += "</div>";
            //给单个统计列明细对应的模板数组赋值;1:统计列明细对应的模板被选中,0：统计列明细对应的模板未被选中
//            templateArray[i] = 0;
	      }
	      
	  //判断统计列明细对应的模板是否被保存过
	  if (!templateArrayAll[statColumnDetailId]){
	      //把单个统计列明细对应的数组保存到总统计列明细对应的模板数组中；键：统计列明细Id，值：统计列明细对应模板数组
	      templateArrayAll[statColumnDetailId] = templateArray;
	  }
	  //判断统计列明细对应的数据预警值对象是否被保存过
	  if (!warningArrayAll[statColumnDetailId]){
	      //把单个统计列明细对应的数组保存到总统计列明细对应的预警值数组中；键：统计列明细Id，值：预警值对象
	      warningArrayAll[statColumnDetailId] = warningObj;
	  }
	  document.getElementById("templateList").innerHTML = htmlStr;
	  //恢复统计列明细对应模板选中状态
//	  for (var i = 0; i < templateArrayAll[statColumnDetailId].length; i++){
//	      if (templateArrayAll[statColumnDetailId][i] != 0){
//	          document.getElementById(templateArrayAll[statColumnDetailId][i]).checked = "checked";	
//	      }	
//	  }
     //songfuprng 090513 恢复统计列明细对应模板选中状态
	  for (var i = 0; i < templateArrayAll[statColumnDetailId].length; i++){
	      if (templateArrayAll[statColumnDetailId][i] != 0){
	          var templateArrayAllValue=templateArrayAll[statColumnDetailId][i].split("_");
	          var templateOptions=document.getElementById(templateArrayAllValue[0]).options;
	          for(var j=0;j<templateOptions.length;j++){
	          	if(templateOptions[j].value == templateArrayAllValue[1]){
	          		templateOptions[j].selected="selected";
	          	}
	          }
	      }	
	  }
	  //恢复统计列明细预警值
	  //上线预警值
	  document.getElementById("topWarning").value = warningArrayAll[statColumnDetailId].topWarning;
	  //上限文本颜色
	  document.getElementById("topFontColor").style.color = warningArrayAll[statColumnDetailId].topFontColor;
	  //上限背景颜色
	  document.getElementById("topBackColor").style.backgroundColor = warningArrayAll[statColumnDetailId].topBackColor;
	  //下线预警值
	  document.getElementById("bottomWarning").value = warningArrayAll[statColumnDetailId].bottomWarning;
	  //下限文本颜色
	  document.getElementById("bottomFontColor").style.color = warningArrayAll[statColumnDetailId].bottomFontColor;
	  //下限背景颜色
	  document.getElementById("bottomBackColor").style.backgroundColor = warningArrayAll[statColumnDetailId].bottomBackColor;
}

//保存统计列明细对应的模板信息 value:模板显示序号
function saveTemplate(templateId, statColumnDetailId, value){
	  if (document.getElementById(templateId).checked){
	  	  templateArrayAll[statColumnDetailId][templateArrayAll[statColumnDetailId].length] = templateId;
	  }else {
	  	  for (var i = 0; i < templateArrayAll[statColumnDetailId].length; i++){
	  	      if (templateArrayAll[statColumnDetailId][i] == templateId){
	  	          templateArrayAll[statColumnDetailId][i] = 0;  
	  	          break; 	
	  	      }	
	  	  }
	  }
}
//songfupeng 090513 下拉列表时，保存用户选择统计列对应的模板
function saveTemplate1(templateId,statColumnDetailId){
    var selectValue=document.getElementById(templateId).value;
    var isAddTemplate=true;
    for (var i = 0; i < templateArrayAll[statColumnDetailId].length; i++){
          var templateArrayAllId="'"+templateArrayAll[statColumnDetailId][i]+"'";
 	      if (templateArrayAllId.indexOf(templateId)>-1){
 	          if(selectValue == "none"){
 	            templateArrayAll[statColumnDetailId][i] = 0;
 	          }else{
 	            templateArrayAll[statColumnDetailId][i] = templateId+"_"+selectValue
 	          }
            isAddTemplate=false;
 	      }	       	  
	}
	 if(isAddTemplate){
	   templateArrayAll[statColumnDetailId][i]=templateId+"_"+selectValue;
	 }
	  
}


//获取元素相对于这个页面的x和y坐标。    
function pageX(elem){
    return elem.offsetParent?(elem.offsetLeft+pageX(elem.offsetParent)):elem.offsetLeft;
}
function pageY(elem){
    return elem.offsetParent?(elem.offsetTop+pageY(elem.offsetParent)):elem.offsetTop;
}

