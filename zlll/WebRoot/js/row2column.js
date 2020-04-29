/***定义全局变量*/
var shownum=-1;//显示行数
var listheight = null;
/**
*提供一个简易方法，提前是srcdiv是jsondataname+'_div'
*jsondataname--string
*
*/
function  doShowEditSimple(jsondataname,descdiv,num){
	var srcdiv = jsondataname+"_div";	
	//isShowList = getIsShowList(descdiv);//根据列表的是否在显示状态，类判断点击当前按钮应进行行专列还是列转行	
	var ed = document.getElementById(descdiv);
	if(getIsShowList(descdiv)){//转列
		if(listheight==null)listheight = ed.parentElement.offsetHeight;
		doShowEdit(srcdiv,jsondataname,descdiv,num);		
	}else{//转行
		if(listheight!=null){
		   if(ed.innerHTML!= ""){
			  ed.innerHTML= "";
		   }
		    ed.parentElement.style.height =listheight+"px";
		}	    
		doShowListSimple(jsondataname,descdiv);		
	}
	
}

//wy added 20091009 转换图片的title显示内容
function  doShowEditSimpleWithTitle(jsondataname,descdiv,num,imgObj){
	var srcdiv = jsondataname+"_div";	
	//isShowList = getIsShowList(descdiv);//根据列表的是否在显示状态，类判断点击当前按钮应进行行专列还是列转行	
	var ed = document.getElementById(descdiv);
 
	if(getIsShowList(descdiv)){//转列
	    if(listheight==null)listheight = ed.parentElement.offsetHeight;
		doShowEdit(srcdiv,jsondataname,descdiv,num);
		imgObj.title = "显示为列表形式";	 	
	}else{//转行
		if(listheight!=null){
		   var ed = document.getElementById(descdiv);
		   if(ed.innerHTML!= ""){
			  ed.innerHTML= "";
		   }
			ed.parentElement.style.height =listheight+"px";
		}
		doShowListSimple(jsondataname,descdiv);	
		imgObj.title = "行转列";
	}
	
}

function showEdit(jsondataname){
	var srcdiv = jsondataname+"_div";	
	var descdiv = getDescdivId(srcdiv);
	var ed = document.getElementById(descdiv);
	if(listheight==null)listheight = ed.parentElement.offsetHeight;
	doShowEdit(srcdiv,jsondataname,descdiv,4);	
}

function ShowList(jsondataname,td){
	var descdiv = td.parentElement.parentElement.parentElement.parentElement.id;
	var srcdiv = jsondataname+"_div";	
	var ed = document.getElementById(descdiv);
		if(listheight!=null){
		   if(ed.innerHTML!= ""){
			  ed.innerHTML= "";
		   }
		    ed.parentElement.style.height =listheight+"px";
		}	
	doShowListSimple(jsondataname,descdiv);	
}

function getDescdivId(srcdiv){
	var divs = document.getElementById(srcdiv).parentElement.getElementsByTagName("DIV");
	if(divs[0].style.display=='none') return divs[0].id;
	for(var i=0;i<divs.length;i++){
		if(divs[i].style.display=='none'&&divs[i].id!=null&&divs[i].id.indexOf("edit")!=-1){
			return divs[i].id;
		}
	}
}

/***
*行转列
*srcdiv:来源div的id
*jsondataname：jsondata
*descdiv  显示descdiv的id
*num:显示列数
**/
function doShowEdit(srcdiv,jsonname,descdiv,num){
   /*取到需要替换的div*/
   var jsondataname = eval(jsonname);
   var row = jsondataname.getSelectedRow();
  
   if(row.length>1){
   		alert("只能选择一行");
   		return false;
   	}  
   var ed = document.getElementById(descdiv);
   if(ed.innerHTML!= ""){
      ed.innerHTML= "";
   }
	var columnName = jsondataname.columnConfig;	
    if(row.length==1){
    		//设置表格显示列数
    		if(shownum==-1) shownum = num;
    		
    		var ed = document.getElementById(descdiv);	   		 
		 	ed.innerHTML = createShowTable(jsonname,columnName,shownum);  
		 	
		 	var div = document.getElementById(srcdiv);
		 	if(div.style.display!='none'){
		      div.style.display='none';
			  ed.style.display='block';
		    }
		    
	      if(ed.style.display=='none'){//行专列
		      ed.style.display='none';
			  ed.style.display='block';
			}
				
		 	for (var i=2; i<columnName.length; i++){	
		 		 	 
				columnName[i].show(0,eval("row[0]."+columnName[i].id),row[0],document.getElementById(String('columnValue_'+jsonname+(i+1))),jsondataname,123); 			   
			 }
		 	ed.parentNode.style.height = ed.offsetHeight + 20;//IE8下DIV重叠问题.
		 }else{
		   alert("请选定一行！");
		 }
		
}
function createShowTable(jsonname,columnName,num){
	     /*取值过程*/   
	     var jsondataname = eval(jsonname);
		  var th_td1 = "";		  
		  var th_td="";
		  var tdValue = (columnName.length-1)%num;
		  var colValue = 1;
		  if(tdValue != 0){
		  	colValue = (num-tdValue)*2+1;
		  }
		  for (var i=2; i<columnName.length; i++){
				var m = columnName[i].title;			
				if((i-1)%num==0)th_td="<tr>\n";
				if(i==2)th_td += "<th width=8% onclick=\"ShowList('"+jsonname+"',this)\" style=\"border-right:1px #8ba3da solid;border-bottom:1px #8ba3da solid;\" >序号</th><td onmouseout=\"return nd();\" width=17% style=\"background:#FFF;border-right:1px #8ba3da solid;border-bottom:1px #8ba3da solid;\" >"+getSelectedRowNum(jsondataname)+"/"+eval(jsondataname).data.length+"</td>\n"	;
				if(i ==columnName.length -1){
					th_td += "<th width=8% style=\"border-right:1px #8ba3da solid;border-bottom:1px #8ba3da solid;\" >"+columnName[i].title+"</th><td onmouseout=\"return nd();\" width=17% colspan ="+colValue+" style=\"background:#FFF;border-right:1px #8ba3da solid;border-bottom:1px #8ba3da solid;\" id=columnValue_"+jsonname+(i+1)+" style=\"text-align:"+(columnName[i].title=="金额"?"right":"left")+";\" ></td>\n"	;	
				} else {
					th_td += "<th width=8% style=\"border-right:1px #8ba3da solid;border-bottom:1px #8ba3da solid;\" >"+columnName[i].title+"</th><td onmouseout=\"return nd();\" width=17% style=\"background:#FFF;border-right:1px #8ba3da solid;border-bottom:1px #8ba3da solid;\" id=columnValue_"+jsonname+(i+1)+" style=\"text-align:"+(columnName[i].title=="金额"?"right":"left")+";\" ></td>\n"	;	
				}	  			
				if(i%num==0||i==(columnName.length-1))th_td+="</tr>\n";	
			    if(i%num==0||i==(columnName.length-1))th_td1 += th_td; 			
			   
			 }			
		 return "<table width=100% style= 'TABLE-LAYOUT:fixed'>"+ th_td1 +"</table>";	 
		
}
/**
*提供一个简易方法，提前是srcdiv是jsondataname+'_div'
*jsondataname--string
*
*/
function doShowListSimple(jsondataname,curdiv){
	var listdiv = jsondataname+"_div";
	doShowList(listdiv,curdiv);
	var newdata=eval(jsondataname);
	newdata.show();
	var n = getSelectedRowNum(newdata);
	//滚动
	newdata.drawToRow(n-1);
}
/**
*listdiv   列面的div名称
*
*curdiv    当前的div（即行转列后的div）
*/
function doShowList(listdiv,curdiv){
  var a = document.getElementById(listdiv);
  var e  = document.getElementById(curdiv);
  if(a.style.display =='none'){
  	  e.style.display = 'none';
	  a.style.display = 'block';
  }else{
  }
   
}

/**
*
*
*
*/
function showNextRow(jsonData,showdiv,drawDetail,tdetailName,tdetailShowDivName){
	var newdata = eval(jsonData);
	var n = getSelectedRowNum(newdata);
	if(n==0)return ;
	//newdata.selectedallrows(false) ;	
	
	if(n<newdata.data.length){
		
		
		newdata.data[n].checked = true; 
		newdata.data[n-1].checked = false; 
		newdata.isredraw = true;
		newdata.draw();	
		var row = newdata.getSelectedRow();
		
		if(drawDetail){//此时子单重画，同时子单贴换到列表状态
			var detailData =  eval(tdetailName);			
			//detailData.data = row[0].detail;		
			if(typeof(row[0].details)=="undefined"||row[0].details.length<1){//没有直接给子单赋值的情况
				 newdata.onrowclick(row[0]);
			}else{
				detailData.data = row[0].details;
				detailData.show();		
				detailData.draw();
			}
			
		   document.getElementById(tdetailShowDivName).style.display = 'none';
		   document.getElementById(tdetailName+"_div").style.display = 'block';	
			  
		}
		if(!getIsShowList(showdiv)){		
			var columnName = newdata.columnConfig;
			
			var ed = document.getElementById(showdiv);
			
			if(ed.innerHTML!= ""){
			      ed.innerHTML= "";
			 }
			ed.innerHTML = createShowTable(jsonData,columnName,shownum);  
		 	for (var i=2; i<columnName.length; i++)	{
		 		columnName[i].show(0,eval("row[0]."+columnName[i].id),row[0],document.getElementById(String('columnValue_'+jsonData+(i+1))),tmain); 			   
			}			
		}
	
	}
	//滚动
	newdata.drawToRow(n);
}
function showBeforRow(jsonData,showdiv,drawDetail,tdetailName,tdetailShowDivName){
	var newdata = eval(jsonData);
	var n = getSelectedRowNum(newdata);	
	if(n==0)return ;
	if(n>1){
		newdata.data[n-2].checked = true; 
		newdata.data[n-1].checked = false; 
		newdata.isredraw = true;
		newdata.draw();
		var row = newdata.getSelectedRow();
		if(drawDetail){
			var detailData =  eval(tdetailName);			
			//detailData.data = row[0].detail;		
			if(typeof(row[0].details)=="undefined"||row[0].details.length<1){//没有直接给子单赋值的情况
				 newdata.onrowclick(row[0]);
			}else{
				detailData.data = row[0].details;
				detailData.show();		
				detailData.draw();
			}
		   document.getElementById(tdetailShowDivName).style.display = 'none';
		   document.getElementById(tdetailName+"_div").style.display = 'block';
		}
		
		if(!getIsShowList(showdiv)){
			var columnName = newdata.columnConfig;			
			var ed = document.getElementById(showdiv);
			
			if(ed.innerHTML!= ""){
			      ed.innerHTML= "";
			 }
			ed.innerHTML = createShowTable(jsonData,columnName,shownum);  
		 	for (var i=2; i<columnName.length; i++)	{
		 		columnName[i].show(0,eval("row[0]."+columnName[i].id),row[0],document.getElementById(String('columnValue_'+jsonData+(i+1))),tmain); 			   
			}			
		}
	}
	newdata.drawToRow(n-2);
}
// 返回选中行的行数
function getSelectedRowNum(jsondata){ 		
		var n=-1;		
		for(var i=0;i<jsondata.data.length;i++){
			if(jsondata.data[i].checked){
				n=i;
				break;
			}
		}		
		return n+1;

	}
	
function getIsShowList(listdiv){
//listdiv  
//当前是否是列表，如果是返回true，否则返回false
  	  var a = document.getElementById(listdiv);
  	 
	  if(a.style.display =='none'){//显示的是列表
		isShowList = true;		 
	  }else{//显示的不是列表
	  	isShowList = false;
	  }
	  return isShowList;
}
function updateRow2Column(dataname,row2columnDiv){

			if(!getIsShowList(row2columnDiv)){		
			var newdata = eval(dataname);
			var columnName = newdata.columnConfig;
			var row = newdata.getSelectedRow();
			var ed = document.getElementById(row2columnDiv);
			
			if(ed.innerHTML!= ""){
			      ed.innerHTML= "";
			 }
			ed.innerHTML = createShowTable(dataname,columnName,shownum);  
	   
		 	for (var i=2; i<columnName.length; i++)	{
		 		columnName[i].show(0,eval("row[0]."+columnName[i].id),row[0],document.getElementById(String('columnValue_'+dataname+(i+1))),newdata); 			   
			}			
		}
}

function updateRow2ColumnForDetail(edit_table_tdetail,tdetail){
	var tdetailShowDivName=edit_table_tdetail,tdetailName=tdetail;
	//var detailData =  eval(tdetailName);
	
	/*
	if(typeof(row.details)=='undefined'){//没有直接给子单赋值的情况
	
	}else{	
		document.getElementById(tdetailShowDivName).style.display = 'none';
		document.getElementById(tdetailName+'_div').style.display = 'block';
		//detailData.data = row.details;
		}
		*/
	//detailData.show();
	
		document.getElementById(tdetailShowDivName).style.display = 'none';
		document.getElementById(tdetailName+'_div').style.display = 'block';
}