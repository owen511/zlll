//来源去向导出
function srcAndtragetExportExcel(tmain,tdetail){		   
		   //判断页面有无数据
		   if(tmain == null && tdetail == null){
				  alert("导出表格无数据，请查询后再导出！");
		   		  return;   
		   }else{
		  		var flag = 0;
			   	if(tmain!=null){
				   var len = tmain.data.length;
				   if(len == 0){
				   	  flag = flag+1;
				   }   
			   }
			   if(tdetail!=null){
				   var len = tdetail.data.length;
				   if(len == 0){
				   	  flag = flag+1;
				   }   
			   }
			   if(flag==2){
			      alert("导出表格无数据，请查询后再导出！");
		   		  return;
			   }
		   }
	       srcAndtragetexport(tmain,tdetail,0,1,0,1);
		   return;
}
//来源或去向导出
function srcAndtragetExportExcel2(tmain,typeflag){
		   //判断页面有无数据
		   if(tmain!=null){
			   var len = tmain.data.length;
			   if(len == 0){
				  alert("导出表格无数据，请查询后再导出！");
				  return;
			   }   
		   }else{
		   		 alert("导出表格无数据，请查询后再导出！");
		   		  return;
		   }
		   if(typeflag=="to"){
	       		srcAndtragetexport(null,tmain,0,1,0,1);
	       }else{
	       		srcAndtragetexport(tmain,null,0,1,0,1);
	       }
		   return;
}
 //来源去向导出
 function srcAndtragetexport(tmain,tdetail,isopen,issave,templettag,sumflag){ 
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
	        
	    var bit = 0;
	    var odate = new Date();
	    var start = odate.getMilliseconds() + odate.getSeconds() * 1000;
	    //获得内容开始行号
	    var b = 1;
	    //表头开始行号
	    var h = b+1;
	    var tab = tmain ;
	    var cols;
	    var collen=0;
	    var title;
    	var rows ; 	    
	    var collength = 0;
	    var dataname = null;
	    var datacode = null;
	    var datashow = null;	    
	    var fname = "";
		    
	    for(var tabnum=0;tabnum<2;tabnum++){
	    	if(tabnum==1){
	    		if(b!=1){
			        b = b+5;
				    h = b+1;
				    bit = 0;
			    }
			    tab = tdetail ;
			    title = "数据去向"
		    }else{
		   		title = "数据来源"
		    }
	    	if(tab!=null){
	    	    cols = tab.columnConfig;
			    collen = cols.length;
		    }else{
		    	continue;
		    }
		    for (var i = 0;i<collen;i++){
		       if(cols[i].id == "noFind"){
		          alert("字段配置错误，请核查！");
		          return;
		       }
		       if(cols[i].id != "serial"&& cols[i].id != "itemconfig"&& cols[i].id != "checkbox" && cols[i].id != "radio"){
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
		   oSheet.Range(oSheet.Cells(b,1),oSheet.Cells(b,bit)).mergecells=true;
		   oSheet.Range(oSheet.Cells(b,1),oSheet.Cells(b,bit)).value=title;
		   //标题样式
		   oSheet.Rows(b).RowHeight = 25;  
		   oSheet.Rows(b).Font.Name="MS Sans Serif";  
	       oSheet.Rows(b).Font.Size=18;     
	       oSheet.Rows(b).Font.bold=true; 
	       oSheet.Rows(b).HorizontalAlignment = 3;
	       b++;
	       
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
		    
		    collength = ids.length;
		    rows = tab.data; 	    
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
		       	objAmt = {}; 
	    	}
	} 	
    	
    	odate = new Date();
	   	start = odate.getMilliseconds() + odate.getSeconds() * 1000;
	   	window.status +="|"+(start - end)+"ms";
        if(issave==1) fname = oXL.Application.GetSaveAsFilename(getTime()+".xls", "Excel Spreadsheets (*.xls), *.xls");  
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

//合计行求合
function sumCol(arrSum){
	arrSum = arrSum.without('');
	return eval(arrSum.join('+'));
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