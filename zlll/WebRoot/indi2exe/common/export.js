//��Դȥ�򵼳�
function srcAndtragetExportExcel(tmain,tdetail){		   
		   //�ж�ҳ����������
		   if(tmain == null && tdetail == null){
				  alert("������������ݣ����ѯ���ٵ�����");
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
			      alert("������������ݣ����ѯ���ٵ�����");
		   		  return;
			   }
		   }
	       srcAndtragetexport(tmain,tdetail,0,1,0,1);
		   return;
}
//��Դ��ȥ�򵼳�
function srcAndtragetExportExcel2(tmain,typeflag){
		   //�ж�ҳ����������
		   if(tmain!=null){
			   var len = tmain.data.length;
			   if(len == 0){
				  alert("������������ݣ����ѯ���ٵ�����");
				  return;
			   }   
		   }else{
		   		 alert("������������ݣ����ѯ���ٵ�����");
		   		  return;
		   }
		   if(typeflag=="to"){
	       		srcAndtragetexport(null,tmain,0,1,0,1);
	       }else{
	       		srcAndtragetexport(tmain,null,0,1,0,1);
	       }
		   return;
}
 //��Դȥ�򵼳�
 function srcAndtragetexport(tmain,tdetail,isopen,issave,templettag,sumflag){ 
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
	        
	    var bit = 0;
	    var odate = new Date();
	    var start = odate.getMilliseconds() + odate.getSeconds() * 1000;
	    //������ݿ�ʼ�к�
	    var b = 1;
	    //��ͷ��ʼ�к�
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
			    title = "����ȥ��"
		    }else{
		   		title = "������Դ"
		    }
	    	if(tab!=null){
	    	    cols = tab.columnConfig;
			    collen = cols.length;
		    }else{
		    	continue;
		    }
		    for (var i = 0;i<collen;i++){
		       if(cols[i].id == "noFind"){
		          alert("�ֶ����ô�����˲飡");
		          return;
		       }
		       if(cols[i].id != "serial"&& cols[i].id != "itemconfig"&& cols[i].id != "checkbox" && cols[i].id != "radio"){
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
		   oSheet.Range(oSheet.Cells(b,1),oSheet.Cells(b,bit)).mergecells=true;
		   oSheet.Range(oSheet.Cells(b,1),oSheet.Cells(b,bit)).value=title;
		   //������ʽ
		   oSheet.Rows(b).RowHeight = 25;  
		   oSheet.Rows(b).Font.Name="MS Sans Serif";  
	       oSheet.Rows(b).Font.Size=18;     
	       oSheet.Rows(b).Font.bold=true; 
	       oSheet.Rows(b).HorizontalAlignment = 3;
	       b++;
	       
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
		    
		    collength = ids.length;
		    rows = tab.data; 	    
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
		       	objAmt = {}; 
	    	}
	} 	
    	
    	odate = new Date();
	   	start = odate.getMilliseconds() + odate.getSeconds() * 1000;
	   	window.status +="|"+(start - end)+"ms";
        if(issave==1) fname = oXL.Application.GetSaveAsFilename(getTime()+".xls", "Excel Spreadsheets (*.xls), *.xls");  
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

//�ϼ������
function sumCol(arrSum){
	arrSum = arrSum.without('');
	return eval(arrSum.join('+'));
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