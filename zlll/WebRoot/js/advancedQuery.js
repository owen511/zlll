var orgInnerHTML = "<select name='relations' onChange='toSetRelation(this);'><option  value='like'>部份包含(like)</option>"
						+"<option  value='in'>全包含(in)</option><option  value='between'>介于(between)</option><option value='='>等于(=)</option>>"
						+"<option  value='>'>大于等于(&gt;=)</option><option value='<'>小于等于(&lt;=)</option><option value='<>'>不等于(<>)</option></select>";
 var origElement = ttt.getElementsByTagName("TABLE").item(0).rows.item(1).cells.item(2).innerHTML;

  function   addR()   {  
    //alert("加一行");    
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
	tdd.align = 'center';
	tdd.innerHTML = "<select name='selectRelation'  class='small'><option value='and' selected>并且(and)</option><option value='or'>或者(or)</option></select>";
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
   /* 不允许删除最后一条查询条件
   if(advancedQueryForm.theId.checked){
	 tb.removeChild(tb.rows[1]);
	}
	*/
} 

/**
*要是变动时设置其他框的值
*/
function toSetOtherElement(obj){

	var editrow = getEditRowBySelectElement(obj);	
	tb.rows[editrow+1].cells[4].innerHTML="<input type='text' class='one'/>";
	var type_advanced = obj.value.substring(obj.value.indexOf("___"),obj.value.length).replace("___","");	
		//可以在这里进行判断
						
	if(document.getElementById(String('div'+obj.value))!=null){
		tb.rows[editrow+1].cells[4].innerHTML = document.getElementById(String('div'+obj.value)).innerHTML;
		//只选中in		
		tb.rows[editrow+1].cells[3].innerHTML = "<select name='relations' onChange='toSetRelation(this);'><option  value='in' selected>全包含(in)</option></select>";
	}else{
		tb.rows[editrow+1].cells[3].innerHTML = orgInnerHTML;
	}
} 

function toSetRelation(obj){
	var editrow = getEditRowBySelectRelation(obj);	
	tb.rows[editrow+1].cells[4].innerHTML="<input type='text' class='one'/>";
	
	var tableobj = ttt.getElementsByTagName("TABLE").item(0).rows;	
	var elementValue = tableobj.item(editrow+1).cells.item(2).children.item(0).value;	
	var type_advanced = elementValue.substring(elementValue.indexOf("___"),elementValue.length).replace("___","");
	
	if(obj.value=='between'){
		var editrow = getEditRowBySelectRelation(obj);
		if(type_advanced=="d"||type_advanced=="di"){
			var str1 = "<img src='/images/calendar/date.gif' alt='选择日期' onclick=\"return showCalendar('conditioninput1', '%Y%m%d', null, true);\" style='cursor:hand; border:0;' onmouseover=\"this.style.background='red';\" onmouseout=\"this.style.background=''\"/>";
			var str2 = "<img src='/images/calendar/date.gif' alt='选择日期' onclick=\"return showCalendar('conditioninput2', '%Y%m%d', null, true);\" style='cursor:hand; border:0;' onmouseover=\"this.style.background='red';\" onmouseout=\"this.style.background=''\"/>";
			
			tb.rows[editrow+1].cells[4].innerHTML = "<input name='conditioninput1' type='text' style='width:90px'/>"+str1+"--<input name='conditioninput2' type='text' class='two' style='width:90px'/>"+str2;
		}else{
			tb.rows[editrow+1].cells[4].innerHTML = "<input name='conditioninput' type='text' class='two'/>--<input name='conditioninput' type='text' class='two'/>";
		}
	}

}
/*
*
*获取选中行
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
*获取选中行
*
*/
function getEditRowBySelectRelation(obj){
	var editrow = 0;
    var g = 1;	
	if(typeof(advancedQueryForm.theId.length)!="undefined")g = advancedQueryForm.theId.length;	 
	 
	for(a=0;a<g;a++){	
     if(advancedQueryForm.relations[a]==obj){     	
    	 editrow = a;  
    	 break;    	     	
	 }
   }
   return editrow; 
}

/*
*
*获取选中行
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
	/*
     if(advancedQueryForm.selectButton[a]==obj){     	
    	 editrow = a;  
    	 break;    	     	
	 }
	 */
   }
   return editrow; 
}
function checkNull_advanced(){
	var g = 1;	
	if(typeof(advancedQueryForm.theId.length)!="undefined")g = advancedQueryForm.theId.length;	 
	var tableobj = ttt.getElementsByTagName("TABLE").item(0).rows;	
	for(a=0;a<g;a++){		
     if(tableobj.item(a+1).cells.item(2).children.item(0).value==''){     	
    	 alert('第'+(a+1)+'行的要素为空，请选择要查询的要素');  
    	 advancedQueryForm.selectElement[a].focus();        	 
    	 return true;  	
    	 break;     	
	 }
   }
   return false;
}
function infunction (conditionstr){		
		var newCondition = new Array();				
		newCondition = conditionstr.split(",");
		
		conditionstr = "";				
		if(newCondition.length>0)conditionstr += " (";
		for(var j=0;j<newCondition.length;j++){				
			conditionstr +="'"+newCondition[j]+"'";
			if(j!=newCondition.length-1)conditionstr +=",";
		}
		if(newCondition.length>0)conditionstr += " )";	
		return " in "+conditionstr;
}

function likefunction (conditionstr){
		return " like '%"+conditionstr.trim()+"%'";
}

function equalfunction (conditionstr){
		return " = '"+conditionstr.trim()+"'";
}

function lessfunction (conditionstr){
		if(!typeof(conditionstr)=="number"){
		alert('比较时必须是数字型');
		return false;
		}else{
			return " <= '"+conditionstr+"'";
		}
		
}
function morefunction (conditionstr){
		if(!typeof(conditionstr)=="number"){
			alert('比较时必须是数字型');
		return false;
		}else{
			return " >='"+conditionstr+"'";
		}
		
}
function noequalfunction (conditionstr, valuestr){
		if(!typeof(conditionstr)=="number"){
			alert('比较时必须是数字型');
		return false;
		}else{
			return " <>'"+conditionstr+"' or " +valuestr+ " is null ";
		}
}
function betweenfunction (conditionstr1,conditionstr2){

	return " between '"+conditionstr1+"' and '"+conditionstr2+"'";		
}
function biulsql(){

	var createdtable = ttt.getElementsByTagName("table");
	var sql = "";	
	var tableobj = ttt.getElementsByTagName("TABLE").item(0).rows;	

	if(createdtable.length>0){
			// 获取当前表格的表头HTML代码
						
			for(var i=1;i<tableobj.length;i++){						
				if(i>1)sql += tableobj.item(i).cells.item(1).children.item(0).value;
				var valuestr = tableobj.item(i).cells.item(2).children.item(0).value;				
				valuestr = valuestr.substring(0,valuestr.indexOf("___"));
				sql += "("+valuestr;//要素						
				var conditionstr = "";
				var isElement = document.getElementById(String('div'+tableobj.item(i).cells.item(2).children.item(0).value));
				
				if(isElement!=null){//要素时只有in运算符				
					var stringid = "";
					if(typeof(tableobj.item(i).cells.item(4).children.item(1).valueid)!="undefined")stringid = tableobj.item(i).cells.item(4).children.item(1).valueid;
					
					sql += infunction (stringid);
					
				}else{
				
					var operator = tableobj.item(i).cells.item(3).children.item(0).value;
					conditionstr= tableobj.item(i).cells.item(4).children.item(0).value;	
					//conditionstr = conditionstr.substring(0,conditionstr.indexOf("___"));
					if(operator=='like'){					
						sql += likefunction(conditionstr);
					}else if(operator=='in'){
						sql += infunction(conditionstr);
					}
					else if(operator=='between'){
					
						var tableobj = ttt.getElementsByTagName("TABLE").item(0).rows;						
						
						var elementValue = tableobj.item(i).cells.item(2).children.item(0).value;	
						
						var type_advanced = elementValue.substring(elementValue.indexOf("___"),elementValue.length).replace("___","");
						var conditionstr1 = "";
						if(type_advanced=="d"||type_advanced=="di")		
							 conditionstr1 = tableobj.item(i).cells.item(4).children.item(2).value;
						else
							conditionstr1 = tableobj.item(i).cells.item(4).children.item(1).value;
							
						sql += betweenfunction(conditionstr,conditionstr1);
					}else if(operator=='='){						
						sql += equalfunction(conditionstr);
					}
					else if(operator=='>'){
						sql += morefunction(conditionstr);
					}
					else if(operator=='<'){
						sql += lessfunction(conditionstr);
					}	
					else if (operator=='<>'){
						// 工资甘肃BUG50445,提出增加不等于。lp 20120903
						sql += noequalfunction(conditionstr, valuestr);
					}	
				}				
			sql += ")";	
			
			}
			
		}
		return "(" +sql +")";
	}
function  query(){
	if(checkNull_advanced())return false;
	$('advancedQueryForm').queryconhtml.value=document.getElementById("ttt").innerHTML;
	var sql = biulsql();	
	$('advancedQueryForm').advancedQuerySql.value=sql;
	$('advancedQueryForm').advancedQuery.value='advancedQuery';
	var formObj = document.getElementById("advancedQueryForm");
	if(document.getElementById("page")!=null){
		if(document.getElementById("setpage_size")!=null){
			 var page_size = document.getElementById("setpage_size").value
			 var r = /^[0-9]*[1-9][0-9]*$/ ;
             if(!r.test(page_size)){
                 document.getElementById("setpage_size").value=document.getElementById("pageSize").value;
                 return ;
             }else{
                formObj.ad_rows.value=page_size;
           	 }
		}else{
			document.getElementById("ad_rows").value = document.getElementById("pageSize").value;
		}
	}else {
		formObj.ad_allflag.value = 1;
	}
	cleargetOtherForm_advanced();
	$('advancedQueryForm').submit();	
	 closeDivQuery();
}

function hiddselect(flag){
	var selects = document.getElementsByTagName("SELECT");
	var formObj = document.getElementById("advancedQueryForm")
	if(selects!=null&&selects.length>0){
		for(var i=0;i<selects.length;i++){
			var obj = selects[i];
			if(formObj.contains(obj)){
				continue;
			}
			if(flag){
				obj.style.visibility='hidden';
				obj.style.display='none';
			} else {
				obj.style.visibility='visible';
				obj.style.display='block';
			}
		}
	}
}

function showQuery()
{	
	hiddselect(true);
    var d_mask=document.getElementById('maskquery');
    var d_dialog = document.getElementById('div_setymOpposition'); 
    d_mask.style.width = document.body.offsetWidth - document.getElementById("left_tree").offsetWidth - document.getElementById("switchBar").offsetWidth ;
    d_mask.style.height=document.getElementById('context').offsetHeight+100; 
    //高级查询显示位置控制
    if(document.getElementById("window_top").style.display=="none"){
    	d_dialog.style.top  = document.body.offsetHeight/4;
    }else{
    	d_dialog.style.top  = document.getElementById("window_top").offsetHeight+50;
    }
    if(document.getElementById("left_tree").style.display =="none"){
        d_dialog.style.left = document.body.offsetWidth/4;
    }else{
    	d_dialog.style.left =document.getElementById("left_tree").offsetWidth- document.getElementById("switchBar").offsetWidth-150;
    }
    d_mask.style.visibility='visible';
    d_dialog.style.visibility='visible';
    d_dialog.style.display='block';
}
function closeDivQuery(){
 	var d_mask=document.getElementById('maskquery'); 	
    var d_dialog = document.getElementById('div_setymOpposition');
 	d_mask.style.visibility='hidden';
    d_dialog.style.visibility='hidden';
    hiddselect(false);
}

function cleargetOtherForm_advanced(){
	var g = document.getElementsByTagName("form");	
	for(var a=0;a<g.length;a++){
		//if(g[a]!=$('advancedQueryForm')){alert(g[a].id);clearFormInputAll(g[a]);}
		//if(g[a]!=$('advancedQueryForm')){clearFormInputAll(g[a]);}
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