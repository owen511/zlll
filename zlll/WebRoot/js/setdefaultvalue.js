var orgInnerHTML = "<label>����(=)</label>";
 var origElement = ttt.getElementsByTagName("TABLE").item(0).rows.item(1).cells.item(2).innerHTML;

  function   addR()   {  
    //alert("��һ��");    
    if(checkNull_advanced())return false;
	var trr = document.createElement("tr");
	trr.style.height = 20;
	tb.appendChild(trr);	
	
	var tdd = document.createElement("td");
	trr.style.color = '#FF0000';
	tdd.innerHTML = '<input type="checkbox" name="theId"/>';	
	tdd.align = 'center';
	trr.appendChild(tdd);
	
	tdd = document.createElement("td");
	trr.style.color = '#FF0000';
	tdd.style.display = "none";
	tdd.align = 'center';
	tdd.innerHTML = "";
	//tdd.innerHTML = "<select name='selectRelation'  class='small'><option value='and' selected>and</option><option value='or'>or</option></select>";
	trr.appendChild(tdd);
	
	
	tdd = document.createElement("td");
	trr.style.color = '#FF0000';
	tdd.align = 'center';
	tdd.innerHTML = origElement ;
	trr.appendChild(tdd);
	

	tdd = document.createElement("td");
	trr.style.color = '#FF0000';
	tdd.align = 'center';
	tdd.innerHTML = orgInnerHTML;
	trr.appendChild(tdd);
	
	var tdd = document.createElement("td");
	trr.style.color = '#FF0000';
	tdd.align = 'center';
	tdd.innerHTML = '<input type="text" class="one"/>';
	trr.appendChild(tdd);
  }  
  
   
function   delR   ()   { 
    var g = advancedQueryForm.theId.length-1;
	for(g; g>0; g--){
     if(advancedQueryForm.theId[g].checked){
     tb.removeChild(tb.rows[g+1]);
	 }
   }
} 

/**
*Ҫ�Ǳ䶯ʱ�����������ֵ
*/
function toSetOtherElement(obj){

	var editrow = getEditRowBySelectElement(obj);	
	tb.rows[editrow+1].cells[4].innerHTML="<input type='text' class='one'/>";
	var type_advanced = obj.value.substring(obj.value.indexOf("___"),obj.value.length).replace("___","");	
		//��������������ж�					
	if(document.getElementById(String('div'+obj.value))!=null){
		tb.rows[editrow+1].cells[4].innerHTML = document.getElementById(String('div'+obj.value)).innerHTML;
	}
		tb.rows[editrow+1].cells[3].innerHTML = orgInnerHTML;
} 

/*
*
*��ȡѡ����
*
*/
function getEditRowBySelectElement(obj){
	var editrow = 0;
    var g = 1;	
    if(typeof(advancedQueryForm.theId.length)!="undefined")g = advancedQueryForm.theId.length;	 
	 
	for(a=0;a<g;a++){	
     if(advancedQueryForm.selectElement[a]==obj){     	
    	 editrow = a;  
    	 break;    	     	
	 }
   }
   return editrow; 
}

/*
*
*��ȡѡ����
*
*/
function getEditRowByButton(obj){
	var editrow = 0;
    var g = 2;	
	if(typeof(advancedQueryForm.theId.length)!="undefined")g = advancedQueryForm.theId.length+1;	 
	for(a=0;a<g;a++){	
		var aaa = ttt.getElementsByTagName("TABLE").item(0).rows.item(a).cells.item(4).children.item(2);
		
		if(typeof(aaa)!="undefined"){	
			if(aaa==obj){		
				 editrow = a;  
	    		 break; 
			}
  
		}
   }
   return editrow; 
}
function checkNull_advanced(){
	var g = 1;	
	if(typeof(advancedQueryForm.theId.length)!="undefined")g = advancedQueryForm.theId.length;	 
	var tableobj = ttt.getElementsByTagName("TABLE").item(0).rows;	
	for(a=0;a<g;a++){		
     if(tableobj.item(a+1).cells.item(2).children.item(0).value==''){     	
    	 alert('��'+(a+1)+'�е�Ҫ��Ϊ�գ���ѡ��Ҫ��ѯ��Ҫ��');  
    	 advancedQueryForm.selectElement[a].focus();        	 
    	 return true;  	
    	 break;     	
	 }
   }
   return false;
}

function biulsql(){

	var createdtable = ttt.getElementsByTagName("table");
	var sql = "";	
	var tableobj = ttt.getElementsByTagName("TABLE").item(0).rows;	

	if(createdtable.length>0){
			// ��ȡ��ǰ���ı�ͷHTML����
						
			for(var i=1;i<tableobj.length;i++){						
				if(i>1)sql += ",";
				var valuestr = tableobj.item(i).cells.item(2).children.item(0).value;				
				valuestr = valuestr.substring(0,valuestr.indexOf("___"));
				sql += ""+valuestr;//Ҫ��
				sql += "=";//=	
				var conditionstr = "";
				var isElement = document.getElementById(String('div'+tableobj.item(i).cells.item(2).children.item(0).value));
				
				if(isElement!=null){//Ҫ��ʱֻ��in�����				
					var stringid = "";
					if(typeof(tableobj.item(i).cells.item(4).children.item(1).valueid)!="undefined")stringid = tableobj.item(i).cells.item(4).children.item(1).valueid;
					sql += stringid;
					
				}else{
					conditionstr= tableobj.item(i).cells.item(4).children.item(0).value;
					sql += conditionstr;
				}							
			}
			
		}
		return sql;
	}
function  query(){
	if(checkNull_advanced())return false;
	var sql = biulsql();
	selectObj.value = sql;
	selectObj.id =sql;
	selectObj.valuecode=sql;
	closeWindow(true);

}

function closeDivQuery(){
 	closeWindow(false);
}

function cleargetOtherForm_advanced(){
	var g = document.getElementsByTagName("form");	
	for(var a=0;a<g.length;a++){
		clearFormInputAll(g[a]);
	}
}

function checkAll() {
    for (var i = 0; i < document.advancedQueryForm.elements.length; i++) {
        var e = document.advancedQueryForm.elements[i];
        if (e.name == "theId") {
            e.checked = document.advancedQueryForm.allbox.checked;
        }
    }
	
} 