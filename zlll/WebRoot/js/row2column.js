/***����ȫ�ֱ���*/
var shownum=-1;//��ʾ����
var listheight = null;
/**
*�ṩһ�����׷�������ǰ��srcdiv��jsondataname+'_div'
*jsondataname--string
*
*/
function  doShowEditSimple(jsondataname,descdiv,num){
	var srcdiv = jsondataname+"_div";	
	//isShowList = getIsShowList(descdiv);//�����б���Ƿ�����ʾ״̬�����жϵ����ǰ��ťӦ������ר�л�����ת��	
	var ed = document.getElementById(descdiv);
	if(getIsShowList(descdiv)){//ת��
		if(listheight==null)listheight = ed.parentElement.offsetHeight;
		doShowEdit(srcdiv,jsondataname,descdiv,num);		
	}else{//ת��
		if(listheight!=null){
		   if(ed.innerHTML!= ""){
			  ed.innerHTML= "";
		   }
		    ed.parentElement.style.height =listheight+"px";
		}	    
		doShowListSimple(jsondataname,descdiv);		
	}
	
}

//wy added 20091009 ת��ͼƬ��title��ʾ����
function  doShowEditSimpleWithTitle(jsondataname,descdiv,num,imgObj){
	var srcdiv = jsondataname+"_div";	
	//isShowList = getIsShowList(descdiv);//�����б���Ƿ�����ʾ״̬�����жϵ����ǰ��ťӦ������ר�л�����ת��	
	var ed = document.getElementById(descdiv);
 
	if(getIsShowList(descdiv)){//ת��
	    if(listheight==null)listheight = ed.parentElement.offsetHeight;
		doShowEdit(srcdiv,jsondataname,descdiv,num);
		imgObj.title = "��ʾΪ�б���ʽ";	 	
	}else{//ת��
		if(listheight!=null){
		   var ed = document.getElementById(descdiv);
		   if(ed.innerHTML!= ""){
			  ed.innerHTML= "";
		   }
			ed.parentElement.style.height =listheight+"px";
		}
		doShowListSimple(jsondataname,descdiv);	
		imgObj.title = "��ת��";
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
*��ת��
*srcdiv:��Դdiv��id
*jsondataname��jsondata
*descdiv  ��ʾdescdiv��id
*num:��ʾ����
**/
function doShowEdit(srcdiv,jsonname,descdiv,num){
   /*ȡ����Ҫ�滻��div*/
   var jsondataname = eval(jsonname);
   var row = jsondataname.getSelectedRow();
  
   if(row.length>1){
   		alert("ֻ��ѡ��һ��");
   		return false;
   	}  
   var ed = document.getElementById(descdiv);
   if(ed.innerHTML!= ""){
      ed.innerHTML= "";
   }
	var columnName = jsondataname.columnConfig;	
    if(row.length==1){
    		//���ñ����ʾ����
    		if(shownum==-1) shownum = num;
    		
    		var ed = document.getElementById(descdiv);	   		 
		 	ed.innerHTML = createShowTable(jsonname,columnName,shownum);  
		 	
		 	var div = document.getElementById(srcdiv);
		 	if(div.style.display!='none'){
		      div.style.display='none';
			  ed.style.display='block';
		    }
		    
	      if(ed.style.display=='none'){//��ר��
		      ed.style.display='none';
			  ed.style.display='block';
			}
				
		 	for (var i=2; i<columnName.length; i++){	
		 		 	 
				columnName[i].show(0,eval("row[0]."+columnName[i].id),row[0],document.getElementById(String('columnValue_'+jsonname+(i+1))),jsondataname,123); 			   
			 }
		 	ed.parentNode.style.height = ed.offsetHeight + 20;//IE8��DIV�ص�����.
		 }else{
		   alert("��ѡ��һ�У�");
		 }
		
}
function createShowTable(jsonname,columnName,num){
	     /*ȡֵ����*/   
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
				if(i==2)th_td += "<th width=8% onclick=\"ShowList('"+jsonname+"',this)\" style=\"border-right:1px #8ba3da solid;border-bottom:1px #8ba3da solid;\" >���</th><td onmouseout=\"return nd();\" width=17% style=\"background:#FFF;border-right:1px #8ba3da solid;border-bottom:1px #8ba3da solid;\" >"+getSelectedRowNum(jsondataname)+"/"+eval(jsondataname).data.length+"</td>\n"	;
				if(i ==columnName.length -1){
					th_td += "<th width=8% style=\"border-right:1px #8ba3da solid;border-bottom:1px #8ba3da solid;\" >"+columnName[i].title+"</th><td onmouseout=\"return nd();\" width=17% colspan ="+colValue+" style=\"background:#FFF;border-right:1px #8ba3da solid;border-bottom:1px #8ba3da solid;\" id=columnValue_"+jsonname+(i+1)+" style=\"text-align:"+(columnName[i].title=="���"?"right":"left")+";\" ></td>\n"	;	
				} else {
					th_td += "<th width=8% style=\"border-right:1px #8ba3da solid;border-bottom:1px #8ba3da solid;\" >"+columnName[i].title+"</th><td onmouseout=\"return nd();\" width=17% style=\"background:#FFF;border-right:1px #8ba3da solid;border-bottom:1px #8ba3da solid;\" id=columnValue_"+jsonname+(i+1)+" style=\"text-align:"+(columnName[i].title=="���"?"right":"left")+";\" ></td>\n"	;	
				}	  			
				if(i%num==0||i==(columnName.length-1))th_td+="</tr>\n";	
			    if(i%num==0||i==(columnName.length-1))th_td1 += th_td; 			
			   
			 }			
		 return "<table width=100% style= 'TABLE-LAYOUT:fixed'>"+ th_td1 +"</table>";	 
		
}
/**
*�ṩһ�����׷�������ǰ��srcdiv��jsondataname+'_div'
*jsondataname--string
*
*/
function doShowListSimple(jsondataname,curdiv){
	var listdiv = jsondataname+"_div";
	doShowList(listdiv,curdiv);
	var newdata=eval(jsondataname);
	newdata.show();
	var n = getSelectedRowNum(newdata);
	//����
	newdata.drawToRow(n-1);
}
/**
*listdiv   �����div����
*
*curdiv    ��ǰ��div������ת�к��div��
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
		
		if(drawDetail){//��ʱ�ӵ��ػ���ͬʱ�ӵ��������б�״̬
			var detailData =  eval(tdetailName);			
			//detailData.data = row[0].detail;		
			if(typeof(row[0].details)=="undefined"||row[0].details.length<1){//û��ֱ�Ӹ��ӵ���ֵ�����
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
	//����
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
			if(typeof(row[0].details)=="undefined"||row[0].details.length<1){//û��ֱ�Ӹ��ӵ���ֵ�����
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
// ����ѡ���е�����
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
//��ǰ�Ƿ����б�����Ƿ���true�����򷵻�false
  	  var a = document.getElementById(listdiv);
  	 
	  if(a.style.display =='none'){//��ʾ�����б�
		isShowList = true;		 
	  }else{//��ʾ�Ĳ����б�
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
	if(typeof(row.details)=='undefined'){//û��ֱ�Ӹ��ӵ���ֵ�����
	
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