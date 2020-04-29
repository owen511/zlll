
var form_content_wind=null;
var form_tree=null;
var ctrlTree=null;
var ctrlItemId="";
var	ctrledTree=null; 
var datatable=null;
var itemId="";
var releselect=null;
var productList=null;
var selNode=null;
var ctrledTreeData=null;
var ctrlTreeData=null;
function element_list(config, service) {
  releselect=config.relevanceInfo;
  productList=config. productList;
   //初始化界面
   initSurface();
   //展现数据列表	
  showDataTable(config);
  //点击下一步
   document.getElementById("dataResource_nextBTN").onclick = function() {
	  nextConfig();	
   }
   //点击保存
   document.getElementById("dataResource_submitBTN").onclick = function() {
	   saveRelevance();	
   }
	 //切换控制类型
   $('#ctrltype').change(function(){ 
	   var optval=$(this).children('option:selected').val(); 
	   changeCtrlType(optval);
	});
	 //保存数据
	$('#mapping_preBTN').click(function(){ 
		confirmRelevance(); 
	});
	$("#checkedDiv").unbind("click").bind("click",function(e){
		var el = $(e.target);
		if(el.is("input")){
			el.parent().parent().remove();
		}
	});
	$("#product").change(function(e){ 
		var el = $(e.target);
		var product=el.val();
		addCtrlColumn(product); 
	});
 }
 
//切换控制类型
function   changeCtrlType(optval){
	 if (optval == "0") {   //值集关联  
		  $("#dataResource_nextBTN").css("display" ,"");
		// $("#dataResource_submitBTN").css("display" ,"none");    
		  $("#trRele").css("display" ,"none");  
	}else if (optval == "1") {  //字段关联  
		var configInfo = new Object();
		var ctrlcode= $("#ctrlcode").val();
		var ctrledcode= $("#ctrledcode").val();
		if(ctrlcode==ctrledcode&&null!=ctrlcode&&ctrlcode!=""){
			alert("受控元素和控制元素不能相同!");
			return ;
		}
		configInfo.ctrlCode =ctrlcode;
		configInfo.ctrledCode =ctrledcode ;
		Ext.lt.RCP.server('datacommon_relevance_element_service','getReleColumn',configInfo,function(resp){
		var listTable=resp.columnTable;
		var arrColumns=listTable.toArray();
		if(arrColumns&&arrColumns.length>0) {
		 for(var i=0;i<arrColumns.length;i++) {
			 document.getElementById("relevanceCol").options.add(new Option(arrColumns[i].name, arrColumns[i].columncode));
		   }
		}
		 $("#dataResource_nextBTN").css("display" ,"none");
		//$("#dataResource_submitBTN").css("display" ,""); 
		 $("#trRele").css("display" ,""); 
		});
	 } 
}
//展现datatable列表数据
function   showDataTable(config){
	var ctrltype_mapper=[['1','字段关联' ],['0','值集关联' ]]; 
	var state_mapper_data=[['1','启用' ],['0','禁用' ]];
	   datatable = new Ext.lt.editdatatable(config.configTable);
	   datatable.setCols([datatable.columns.seq, datatable.columns.checkbox,
						{name:'configname',datatype:'S',alias:'值集名称',datatype:'S',edit:false,style:'text-align:center'},
						{name:'product',datatype:'S',alias:'产品',edit:false,style:'text-align:center',format:'#name',mapper:{columns:['billid','name' ],datas:config.tableSelect}},
						{name:'ctrlcol',datatype:'S',alias:'控制要素',edit:false,style:'text-align:center'},
						{name:'ctrledcol',datatype:'S',alias:'受控要素',edit:false,style:'text-align:center'},
						{name:'ctrltype',datatype:'S',alias:'控制类型',edit:false,style:'text-align:center' ,format:'#name',mapper:{columns:['billid','name' ],datas:ctrltype_mapper}},
						{name:'relecol',datatype:'S',alias:'关联字段',edit:false,style:'text-align:center'},
						{name:'state',datatype:'S',alias:'启用标识',edit:false,style:'text-align:center',format:'#name',mapper:{columns:['billid','name' ],datas:state_mapper_data}},
						{name:'mark',datatype:'S',alias:'备注',width:300 ,edit:false,style:'text-align:center'}
						]);
		 datatable.setEditSelectCheckbox(false);
		 datatable.setMouselight('#597EAA');
		 datatable.mousedrag(false);
		 datatable.setClassName('dttheme_ifmis');
		 datatable.draw(attachDiv); 
}
//保存数据
function saveRelevance(){
	var releOjb= new Object();
	if(null==$("#configName").val()||$("#configName").val().trim()==""){
		alert("值集名称不能为空!");
		return ;
	}
	var ctrlType= $("#ctrltype").val();
	if(ctrlType=='0') { //值集关联
		var lis = "";
  		$("#checkedDiv li").each(function(){
  			lis = lis + this.itemid + ",";
  		});
        if( null==lis||lis==""){
        	alert("关联无对应数据!");
        	return ;
        }
        releOjb.itemIds=lis;	
	    
    }else{ //字段关联
    	if($("#ctrlcode").val()==$("#ctrledcode").val()){
    		 alert("受控元素和控制元素不能相同!");
    		 return ;
    	 }
    	  releOjb.relevanceCol=$("#relevanceCol").val();
    	  if(null==$("#relevanceCol").val()||$("#relevanceCol").val()==""){
    		  alert("字段关联没有找到关联字段请核实!");
    		  return ;
    	}
    }
	if(null!=itemId&&itemId!=""){
		releOjb.itemId=itemId;
	}
	releOjb.configName = $("#configName").val();
	releOjb.ctrlCode = $("#ctrlcode").val();
	releOjb.ctrledCode = $("#ctrledcode").val();
	releOjb.mark=$("#remark").val();
	releOjb.product=$("#product").val();
	releOjb.ctrlType=ctrlType;
	releOjb.itemids=lis;
	var resp=Ext.lt.RCP.asynserver('datacommon_relevance_element_service' ,'getConfigName',releOjb );
	if(resp.configCount!='0') {
		alert("值集名称存在请输入不存在值集名称!");
		return ;
	}
	Ext.lt.RCP.server('datacommon_relevance_element_service','saveReleElement',releOjb,function(resp){
		if(resp.result=="1") {
			alert("保存成功");
			 datatable.setRecordset(resp.configTable)
			 datatable.redraw();
			 datatable.reflash();
			 form_content_wind.close();
		 }else{
			alert(resp.error);	
			return ;
		}
	});
	
}
//添加选择列表数据
function  addCtrlColumn(optval){
 var releArr=releselect.toArray();
 $("#ctrlcode").empty();
 $("#ctrledcode").empty();
 for(var i=0;i<releArr.length;i++){
	 if(optval==releArr[i].PRODUCTS){
		document.getElementById("ctrlcode").options.add(new Option(releArr[i].NAME, releArr[i].ELEMENTCODE)); 
		document.getElementById("ctrledcode").options.add(new Option(releArr[i].NAME, releArr[i].ELEMENTCODE)); 
	  }
	}
}

//添加选择列表数据
function  addSelectValue(){
 var releProArr=productList.toArray();
 $("#ctrltype").empty();
 $("#product").empty();
 for(var i=0;i<releProArr.length;i++){
	  document.getElementById("product").options.add(new Option(releProArr[i].NAME, releProArr[i].PRODUCTS)); 
 }
 document.getElementById("ctrltype").options.add(new Option("值集关联", "0"));
 document.getElementById("ctrltype").options.add(new Option("字段关联", "1"));
}

//删除控制类型
 function   deleteCtrl(){
  var recordSet = datatable.getRecordSet();
  var checkTrs = recordSet.query({check:1});
  var configInfo = new Object();
  if(!checkTrs || checkTrs.length< 1){
	  alert("请选择删除记录！");
	  return;
  }
  if(confirm("确定要删除数据！")){
	  var ctrlItemId=[] ;
		for ( var i = 0; i < checkTrs.length; i++) {
			ctrlItemId.push(checkTrs[i].itemid);
		}
		configInfo.itemIds=ctrlItemId.join(",");
		Ext.lt.RCP.server('datacommon_relevance_element_service','deleteReleElementState',configInfo,function(resp){
			if(resp.result=="1") {
				alert("删除数据成功");
				datatable.setRecordset(resp.configTable)
				datatable.redraw();
				datatable.reflash();
			}
		 });   
   }
}
 
//修改数据状态
function   updateState(){
  var recordSet = datatable.getRecordSet();
  var checkTrs = recordSet.query({check:1});
  var configInfo = new Object();
  if(!checkTrs || checkTrs.length< 1){
	  alert("请选择修改状态记录！");
	  return;
  }
  var ctrlItemId=[];
	for ( var i = 0; i < checkTrs.length; i++) {
		var  itemIdData={};
		itemIdData.itemid=checkTrs[i].itemid;
		itemIdData.state=checkTrs[i].state;
		ctrlItemId.push(itemIdData); 
	}
	var states = ctrlItemId.toJSON();
	var saveData={};
	saveData.states=states;
	Ext.lt.RCP.server('datacommon_relevance_element_service','updateReleElementState',saveData,function(resp){
		if(resp.result=="1") {
		   alert("修改状态成功");
			datatable.setRecordset(resp.configTable)
			datatable.redraw();
			datatable.reflash();
		}
	}); 
}
 
//新增
function  addConfig(){
	form_content_wind = new Ext.lt.window({title:'值集过滤设置',fitmode:'content',className:'wind7',mark:true,autoshow:true,pop:true,w:800,h:900});
	form_content_wind.draw(zjgl);
	form_content_wind.show();
	//列表数据
	addSelectValue();
	$("select").css('display','');
	$("#trRele").css("display" ,"none");
	$("#configName").val("");
	$("#relevanceCol").val("");
	$("#remark").val("");
	addCtrlColumn($("#product").val());
 }
 //修改数据
 function  updateConfig(){
	  var recordSet = datatable.getRecordSet();
	  var checkTrs = recordSet.query({check:1});
	  if(!checkTrs || checkTrs.length != 1){
		  alert("请选择一条记录！");
		  return;
	  }else{
	    var checkTr=checkTrs[0];
	    addSelectValue();
	    addCtrlColumn(checkTr.product)
		//列表数据
		$("#configName").val(checkTr.configname);
		$("#ctrlcode").val(checkTr.ctrlcol);
		$("#ctrledcode").val(checkTr.ctrledcol);
		$("#ctrltype").val(checkTr.ctrltype);
		$("#relevanceCol").val(checkTr.relename);
		$("#product").val(checkTr.product);
		$("#remark").val(checkTr.mark);
		itemId=checkTr.itemid;
		//控制类型处理
		changeCtrlType(checkTr.ctrltype);
		$("#zjgl").show();
		form_content_wind = new Ext.lt.window({title:'值集过滤设置',fitmode:'content',className:'wind7',mark:true,autoshow:true,pop:true,w:800,h:900});
		form_content_wind.draw(zjgl);
		form_content_wind.show();
		$("select").css('display','');
		$("#trRele").css("display" ,"none");  
	  }
 }
//下一步执行
function nextConfig(){
	var configInfo = new Object();
	var ctrlcode= $("#ctrlcode").val();
	var ctrledcode= $("#ctrledcode").val();
	if(ctrlcode==ctrledcode){
		alert("受控元素和控制元素不能相同!");
		return ;
	}
	configInfo.ctrlCode =ctrlcode;
	configInfo.ctrledCode =ctrledcode ;
	if(null!=itemId&&itemId!=""){
		 configInfo.itemId=itemId;	
	}
	Ext.lt.RCP.server('datacommon_relevance_element_service','getReleTree',configInfo,function(resp){
    ctrlTreeData=resp.ctrlTree;
    ctrlTree=new Ext.lt.Qtree({
	    data: resp.ctrlTree,
		linkchild:true,
		linkparend:true,
		parentlinksub:true,
		showRootNode:true,
		selectmode:'false',
		outformart:'#name' 
	 });
	ctrlTree.draw(ctrltreediv);
	// 树的点击事件
	ctrledTreeData=resp.ctrledTree;
	ctrlTree.on({
		nodeclick : function(tree, param){
			  selNode = param.data;
			 if (selNode.isleaf == 0) {
				 alert("请选择末级单位！");
				  return;
				} 
			 /* var configInfo={};
			  var seleId=selNode.itemid;
			  //确定是修改操作
			  if(null!=itemId&&itemId!=""){
				  configInfo.ctrlId=seleId;
				  configInfo.itemId=itemId;
				  Ext.lt.RCP.server('datacommon_relevance_element_service','getReleSelected',configInfo,function(resp){
				  var ctrleds=resp.ctrledval;
				  var arrayCtr=ctrleds.split(",");
				  checkedCtrl(selNode,arrayCtr);
				}); 
				 }*/
 		    	ctrledTree.checkAll(false);
			}
	});
	ctrledTreeData=resp.ctrledTree;
	ctrledTree=new Ext.lt.Qtree({
			data:resp.ctrledTree,
			linkchild:true,
			linkparend:true,
			parentlinksub:true,
			showRootNode:true,
			selectmode:'n',
			outformart:'#name' 
		});
	ctrledTree.draw(ctrledtreediv);
	ctrledTree.on({
	change : function(tree, param) {
			var  ctrled=param.data;
			if(ctrled._checked=="checked"){
				if(null==selNode) {
					alert("请选择控制元素！");
					return;
				 } 
			  addMiddleLi(selNode ,ctrled);	
			}
			
		}
	});
	//修改处理默认选中值
	if(null!=resp.ctrledTree&&resp.ctrledTree){
		checkedUpdateCtrl(resp.checkTree);
	}
	$("#form_content_tree").show();
	form_tree = new Ext.lt.window({title:'设置过滤关系',fitmode:'content',className:'wind7',mark:true,autoshow:true,pop:true,w:600,h:500});
	form_tree.draw(form_content_tree);
	form_tree.show();
	
 });
}

//中间li
function addMiddleLi(ctrl ,ctrled){
	var $li = jQuery("<li></li>");
	var code=ctrl.code+"-"+ctrled.code;
	var itmeid=ctrl.itemid+"-"+ctrled.itemid;
	var checkId=false;
	$("#checkedDiv li").each(function(){
		 if(this.itemid==itmeid){
			 checkId=true;	
			   return ;
			}
		   return ;
		});
	 if(checkId){
		alert("控制对应关系存在!");
		return false;
	  }
	$li.attr("code",code);
	$li.attr("itemid",itmeid);
	var $span = jQuery("<span><input type='checkbox' checked='checked'/>"+ctrl.name+"-"+ctrled.name+"</span>");
	$li.append($span);
	$("#checkedDiv").prepend($li);
};

//中间li
function checkedCtrl(ctrl ,  ctrledId){
    var arrCtrls=ctrledTreeData.toArray();
      for(var j=0;j<ctrledId.length;j++) {
    	 var checked=getCheckTree(arrCtrls); 
        if(checked.itemid==ctrledId[j]) {
        	var $li = jQuery("<li></li>");
        	var code=ctrl.code+"-"+arrCtrls[i].code;
        	var itmeid=ctrl.itemid+"-"+arrCtrls[i].itemid;
        	$li.attr("code",code);
        	$li.attr("itemid",itmeid);
        	var $span = jQuery("<span><input type='checkbox' checked='checked'/>"+ctrl.name+"-"+arrCtrls[i].name+"</span>");
        	$li.append($span);
        	$("#checkedDiv").prepend($li);	
       }
    }
};

//中间li
function checkedUpdateCtrl(ctrled){
	$("#checkedDiv").empty();
    var arrCtrls=ctrlTreeData.toArray();
    var arredCtrls=ctrledTreeData.toArray();
    if(null!=ctrled&&ctrled){
        var ctrledId=ctrled.toArray();
        for(var j=0;j<ctrledId.length;j++) {
     	 var ctId=ctrledId[j].CTRLID;
     	 var ctedId=ctrledId[j].CTRLEDID; 
     	 var ctrl=getCheckTree(arrCtrls,ctId);
     	 var ctrled=getCheckTree(arredCtrls,ctedId);
          var $li = jQuery("<li></li>");
          var code=ctrl.code+"-"+ctrled.code;
          var itmeid=ctrl.itemid+"-"+ctrled.itemid;
          $li.attr("code",code);
          $li.attr("itemid",itmeid);
          var $span = jQuery("<span><input type='checkbox' checked='checked'/>"+ctrl.name+"-"+ctrled.name+"</span>");
          $li.append($span);
          $("#checkedDiv").prepend($li);	
        }	
     }

     }
 //获取备选节点
 function getCheckTree(arrCtrls ,itemid){
	  for(var i=0;i<arrCtrls.length;i++) {
		 if(arrCtrls[i].itemid==itemid){
			 return arrCtrls[i];
		 }
	  }
  }

 // 获取Qtree叶子节点的主键值
 function getQTreeLeafId(qTree) {
		var selectNode = qTree.getSelected();
		var itemids = [];
		var j = 0;
		if (selectNode.length > 0) {
			for ( var i = 0; i < selectNode.length; i++) {
				if (selectNode[i].isleaf == '1') {
					itemids[j] = selectNode[i].itemid;
					j++;
				}
			}
		}
		return itemids;
	}
 // 获取Qtree叶子节点的主键值
 function getSelectLeafId(ctrlTree ,ctrledTree) {
		var  ctrlArr = ctrlTree.getRecorSet();
		var  ctrledArr = ctrledTree.getRecorSet();
		if (ctrlArr.length > 0) {
			for ( var i = 0; i < ctrlArr.length; i++) {
				for ( var j = 0; j < ctrledArr.length; j++) {
					ctrlArr[i].itemid
				}
			}
		}
		return itemids;
	}
 
//初始化窗口
function   initSurface(){
   document.getElementById("template_main").innerHTML ="";
	var sb = new StringBuffer();
	sb.append("<table align='center' width=\"100%\" border=\"0\" >");
	sb.append("<tr>");
	sb.append("<td>");
	sb.append("<div id=\"query_t\"  style=\"height:20px;width:99%;margin:0;\">");
	sb.append("<span><span title=\"新增\" class=\"add_btn\" onclick=\"addConfig();\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0)\">新增</a></span></span>");
	sb.append("<span><span title=\"修改\" class=\"add_btn\" onclick=\"updateConfig();\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0)\">修改</a></span></span>");
	sb.append("<span><span title=\"删除\" class=\"del_btn\" onclick=\"deleteCtrl();\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0);\">删除</a></span></span>");
	sb.append("<span><span title=\"启动/停止\" class=\"del_btn\" onclick=\"updateState();\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0);\">启动/禁止</a></span></span>");
	sb.append("</div>");
	sb.append("</td>");
	sb.append("</tr>");
	sb.append("<tr>");
	sb.append("<td>");
	sb.append("<div id='attachDiv' style='width:99%;height:450px;' layout=\"{w:{fit:true},h:{fit:-20}}\"></div>");
	sb.append("</td>");
	sb.append("</tr>");
	sb.append("</table>");
	sb.append('<div class="dialog_content" id="zjgl" style="height:240px;width:310px;">');
	sb.append('      <table style="width:300px;" class="form" style="margin:auto">');
	sb.append('		  <tr>');
	sb.append('		     <td><span>值集名称：</span><input style="width:200px;" maxLength=50 id="configName" /></td>');
	sb.append('		  </tr>');
	sb.append('		  <tr>');
	sb.append('		     <td><span>产&nbsp;&nbsp;&nbsp;&nbsp;品：</span><select id="product" style="width:200px;" ></select></td>');
	sb.append('		  </tr>');

	sb.append('		  <tr>');
	sb.append('		     <td><span>控制要素：</span><select  id="ctrlcode" style="width:200px;"></select>');
	sb.append('				</td>');
	sb.append('		  </tr>');
	sb.append('		  <tr>');
	sb.append('		     <td><span>受控要素：</span><select  id="ctrledcode" style="width:200px;"></select>');
	sb.append('				</td>');
	sb.append('		  </tr>');
	sb.append('		  <tr>');
	sb.append('<td><span>受控类型：</span>');
	sb.append('<select style="width:200px;"  id="ctrltype"  >')
    sb.append('</select>')
	sb.append('				</td>');
	sb.append('		  </tr>');
	sb.append('		  <tr>');
	sb.append('		  <tr id ="trRele"  >');
 	sb.append('<td><span>关联字段：<select style="width:200px;" id="relevanceCol" ></select></td>');
	sb.append('		  </tr>');
	sb.append('		  <tr>');
	sb.append('		     <td><span>备　　注：</span><textarea style="width:200px;height:60px;"  onpropertychange="if(this.value.length>120){this.value=this.value.substring(0,120);}" id="remark" ></textarea></td>');
	sb.append('		  </tr>');
	sb.append('       </table>');
	sb.append(' <div class="formbtns" style="width:300px;" align="center">');
	sb.append('    <button type="button" class="button_style" id="dataResource_nextBTN">下一步</button>');
	sb.append('    <button type="button" class="button_style" id="dataResource_submitBTN">保  存</button>');
	sb.append('    <button type="button" class="button_style" onclick="form_content_wind.close();">取消</button>');
	sb.append('  </div>');
	sb.append('</div>');
	sb.append('<div id="form_content_tree" style="display:none;" >');
	sb.append('   <table width="100%" class="form" style="margin:auto;">');
	sb.append('	  <tr>');
	sb.append('	     <td width="40%">');
	sb.append('			<div class="treecontainer" id="ctrltreediv" style="width:240px;height:400px;overflow:scroll;position:relative;border-top: #8ba3da 1px solid;border-left: #8ba3da 1px solid;"></div>');
	sb.append('		 </td>');
	sb.append('      <td width="20%">');
	sb.append('			<div class="treecontainer" id="checkedDiv" style="width:300px;height:400px;overflow:scroll;position:relative;border-top: #8ba3da 1px solid;border-left: #8ba3da 1px solid;"></div>');
	sb.append('		  </td>');
	sb.append('      <td width="40%">');
	sb.append('			<div class="treecontainer" id="ctrledtreediv" style="width:240px;height:400px;overflow:scroll;position:relative;border-top: #8ba3da 1px solid;border-left: #8ba3da 1px solid;"></div>');
	sb.append('		  </td>');
	sb.append('	  </tr>');
	sb.append('    </table>');
	sb.append('	<div class="formbtns" align="center">');
	sb.append('	<button type="button" class="button_style" onclick="form_tree.close();"  >确定</button>');
	sb.append('	<button type="button" class="button_style" onclick="form_tree.close();">取消</button>');
	sb.append('</div>');
	sb.append('</div>');
	document.getElementById("template_main").innerHTML = sb.toString();
}