/*
function StringBuffer(){
  var strs=[], i=0;
  this.append = function(str){
    strs[i++]=str;
  };
  
  this.toString = function(split){
    if(split==undefined){
      split = "";
    }
    return strs.join(split);
  };
}
*/

function TableView(tableEle){
  this.table = $(tableEle)[0];
  
  TableView.STATUS_COMMON = "common";
  TableView.STATUS_RESIZING="resizing";
  
  this.status = TableView.STATUS_COMMON;
  
  this.data = null;
  
  this.div = null;
  
  this.editors = {};
  
  this.init();
}

TableView.prototype.buildCache = function(){

};

TableView.prototype.canEdit = function(td){
  return false;
};

TableView.prototype.init = function(){
   this._bindColumnEvent();
   this._bindCellEvent();
   
   var data = [];
   var columns = this.getColumns();
   var colLength = columns.length;
   var col;
   var tds;
   
   $(this.table).find("tbody tr").each(function(rowIndex){
     data[rowIndex] = {};
     tds = $(this).find("td");
     for(var i=0;i<colLength;i++){
       col = columns[i];
       data[rowIndex][col.colName] = $(tds[i]).text();
     }
   });
   this.data = data;
};

TableView.prototype.clickHead = function(th){
  
};

TableView.prototype._bindCellEvent = function(){
  var tableview = this;
  $(this.table).bind("click",function(e){
    var el = $(e.target);
    //alert(el.attr("tagName"));
    if(el.is("td")){
      tableview.clickCell(el);
    }
  });
  
  $(this.table).bind("dblclick",function(e){
    var el = $(e.target);
    //alert(el.attr("tagName"));
    if(el.is("td")){
      tableview.dblclickCell(el);
    }
  });
};

TableView.prototype.clickCell = function(td){
  //alert($(td).html());
};

TableView.prototype.dblclickCell = function(td){
  
};

TableView.prototype._bindColumnEvent = function(){
  
  var tableView = this;
  
  var mmove = function(e){
    var pos    = $(e.data.col_th).offset();
    var col_w  = e.pageX - pos.left;
    $(e.data.col_th).width(col_w);
  };
  
  var mup = function(e){
    var pos    = $(e.data.col_th).offset();
    var col_w  = e.pageX - pos.left;
    $(e.data.col_th).width(col_w);
    $("body").unbind("mousemove");
    $("body").unbind("mouseup");
    $(e.data.col_th).removeAttr("unselectable");
    tableView.status = "common";
  };
  
  $(this.table).bind("mousemove",function(e){
    var el = e.target;
    if($(el).is("table.tableview>thead>tr>th")){
      var col_th = $(el);
      if((col_th.offset().left+col_th.width()-e.pageX)<4){
        col_th.css("cursor","col-resize");
      }else{
        if(tableView.status != "resizing"){
          $(el).css("cursor","default");
        }
      }
    }
  });
  
  $(this.table).bind("mousedown",function(e){
    var el = e.target;
    while(el!==tableView.table){
      //$(el).filter("table.tableview thead tr th").length>0
      if($(el).is("table.tableview>thead>tr>th")){
        var col_th = $(el);
        if((col_th.offset().left+col_th.width()-e.pageX)<4){
        	//alert("left:"+col_th.offset().left+",width:"+col_th.width()+",e.pageX:"+e.pageX);
            var startX = e.pageX;
            $("body").bind("mousemove",{"col_th":col_th,"startX":startX},mmove);
            $("body").bind("mouseup",{"col_th":col_th,"startX":startX},mup);
            tableView.status = "resizing";
            col_th.attr("unselectable","on");
        }else{
           //sort not impl
           tableView.clickHead(el);
        }
        break;
      }else if($(el).is("table.tableview>tbody>tr>td")){
        //do someing here
        break;
      }else{
        if(el.parentNode){
          el = el.parentNode;
        }else{
          break;  
        }
      }
    }
  });
  
  
};

TableView.prototype.selectRow = function(rowIndex){

};

TableView.prototype.getColumnCount = function(){
  return $(this.table).find("colgroup").length;
};

TableView.prototype.getTdColumn = function(td){
  var columnIndex = $.inArray($(td)[0],$(td).parent().find("td"));
  return this.getColumns()[columnIndex];
};

TableView.prototype.getColumnIndex = function(colName){
  var colIndex = -1;
  var columns = this.getColumns();
  for(var i=0,n=columns.length;i<n;i++){
    if(columns[i].colName==colName){
      colIndex = i;
      break;
    }
  }
  return colIndex;
};

TableView.prototype.getCellValue = function(rowIndex,colName){
  return this.data[rowIndex][colName];
};

TableView.prototype.getCellValueByRowId = function(rowId,colName){
  var $tr = $(this.table).find("tbody tr[rid="+rowId+"]");
  var rowIndex = $.inArray($tr[0],$tr.parent().find("tr"));
  return this.getCellValue(rowIndex,colName);
};

TableView.prototype.getRowIndex = function(tr){
  return $.inArray($(tr)[0],$(this.table).find("tbody tr"));
};

TableView.prototype.getColumns = function(){
  var columns = [];
  $(this.table).find("colgroup").each(function(index){
    
    var column = {};
    column.colName = $(this).attr("colName");
    
    if($(this).attr("width")){
      column.width = parseInt($(this).attr("width"),10);
    }
    if($(this).attr("colType")){
      column.colType = $(this).attr("colType");
    }
    if($(this).attr("colFormat")){
      column.format = $(this).attr("colFormat");
    }
    if($(this).attr("style")){
      column.style = $(this).attr("style");
    }
    if($(this).attr("readonly")){
      column.readonly = $(this).attr("readonly");	
    }
//    if($(this).attr("colHide")){
//    	column.isCodeHide = true;
//    }
    
    columns[index] = column;
  });
  return columns;
};

TableView.prototype.loadData = function(data){
  var sb = new StringBuffer();
  var columns = this.getColumns();
  var i,j,rowLen,colLen,row,column;
  
  rowLen = data.length;
  colLen = columns.length;
  
  this.data = data;
  
  for(i=0;i<rowLen;i++){
    row = data[i];
    sb.append("<tr");
    var rowIdName = $(this.table).attr("rowIdName");
    if(rowIdName){
      sb.append(" rid=\""+row[rowIdName]+"\"");
    }
    sb.append(">");
    for(j=0;j<colLen;j++){
      column = columns[j];
      sb.append("<td>");
      sb.append(this.formatCell(column,row[column.colName],i));
      //sb.append("ssss");
      sb.append("</td>");
    }
    sb.append("</tr>");
  }
  //alert($(this.table).find("tbody").length);
  $(this.table).find("tbody").html(sb.toString());
};

TableView.prototype.formatNumber = function(format,cellData){
 
  if(cellData==undefined){
    cellData = 0;
  }
  
  var decimal;
  var thousand = false;
  var ss = format.split(".");
  if(ss[0].indexOf(",")!=-1) {thousand = true;}
  if(ss[1]) {decimal = ss[1].length;}
  if(decimal!=undefined){
    cellData = cellData.toFixed(decimal);
  }
  if(thousand!=undefined){
    var x = (cellData+"").split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)){
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    cellData = x1 + x2;
  }
  
  return cellData;
};


TableView.prototype.formatCell = function(column,cellData,rowIndex){
  if(column.colType=="serial"){
    return rowIndex+1;
  }
  if(cellData==undefined){
    return "";
  }else if(column.colType=="radio"){
    return "<input type=\"radio\" name=\"radio\" value=\""+cellData.toString()+"\">";
  }else if(column.colType=="checkbox"){
    return "<input type=\"checkbox\" value=\""+cellData.toString()+"\">";
  }else if(column.colType=="str"){
    return cellData.toString();
  }else if(column.colType=="num"){
    var format = column.format;
    if(format){
      return this.formatNumber(format,cellData);
    }else{
      return cellData.toString();
    }
  }else if(column.colType=="datetime"){//I don't know how to format datetime...
    return cellData.toString();
  }else if(column.colType=="ref"){
	  if(column.colName == "BDGAGENCY"){
		  return cellData.name;
	  }
	  return (cellData.code?("["+cellData.code+"]"):"")+cellData.name;
  }else if(column.colType=="bool"){
    return cellData?"是":"否"
  }else{
    return cellData.toString();
  }
};


TableView.prototype.selectRow = function(tr){
  $(this.table).find("tbody tr.sel").removeClass("sel");
  $(tr).addClass("sel");
};

TableView.prototype.getSelectedRow = function(){
	var $selectedRow = $(this.table).find("tbody tr.sel");
	if($selectedRow && $selectedRow.length>0){
		return $selectedRow[0];
	}
	return null;
};

TableView.prototype.findCheckedRow = function(){
	return $(this.table).find("tbody input[type=checkbox]:checked").parent().parent();
}

TableView.prototype.unSelectRow = function(){
  $(this.table).find("tbody tr.sel").removeClass("sel");
};

TableView.prototype.appendRow = function(rowData){
  var i=0,dataVal;
  var columns = this.getColumns();
  var rowIndex = $(this.table).find("tbody tr").length;
  var sb = new StringBuffer();
  sb.append("<tr>");
  for(i=0;i<columns.length;i++){
    sb.append("<td col=\""+columns[i].colName+"\">");
    if(rowData && rowData[columns[i].colName]){
    	 
      sb.append(this.formatCell(columns[i],rowData[columns[i].colName],rowIndex));
    }
    sb.append("</td>");
  }
  sb.append("</tr>");
  $(this.table).find("tbody").append(sb.toString());
};
/**
 * 合计行数据数据格式化调整2012-11-14gpc修改
 * @param rowData
 */
TableView.prototype.appendRowTotal = function(rowData){
	  var i=0,dataVal;
	  var columns = this.getColumns();
	  var rowIndex = $(this.table).find("tbody tr").length;
	  var sb = new StringBuffer();
	  sb.append("<tr>");
	  for(i=0;i<columns.length;i++){
	    sb.append("<td col=\""+columns[i].colName+"\">");
	    if(rowData && rowData[columns[i].colName]){
	    	 
	      sb.append("合计："+this.formatCell(columns[i],rowData[columns[i].colName],rowIndex));
	    }
	    sb.append("</td>");
	  }
	  sb.append("</tr>");
	  $(this.table).find("tbody").append(sb.toString());
	};

TableView.prototype.removeRow = function(tr){
  $(tr).remove();
};

TableView.prototype.encodeHTML = function(html){
  var div = $("<div></div>");
  div.html(html);
  return div.text();
};

TableView.prototype.insertRow = function(rowIndx,rowData){

};

TableView.prototype.appendTotal = function(data){
	var columns = this.getColumns();
	var totalData = [];
	
	if(columns && columns.length > 0){
		var rowLen = data.length;
		for(var i = 0;i < rowLen; i++){
			for(var j = 0; j < columns.length; j++){
				var column = columns[j];
				
				 if(column.colType=="num"){
				 	var row = data[i];
				 	var cellValue = row[column.colName];
				 	
				 	if(totalData[column.colName]){
				 		totalData[column.colName] = totalData[column.colName] + cellValue;
				 	}else{
				 		totalData[column.colName] = cellValue ;
				 	}
				  }else{
				  	 totalData[column.colName] = "";
				  }
			} 
		} 
		for(var e in totalData){
			if(totalData[e]) totalData[e]  =totalData[e] ;
		}
		 
		this.appendRowTotal(totalData);
		$(this.table).find("tbody tr:last").addClass("totalRow");
	}
};


(function($) {

	$.extend($.fn, {
		tableview: function(settings) {
			settings = $.extend({
				cookieId: "tableview"
			}, settings);
			
			
			
			return this;
		}
	});
	
})(jQuery);