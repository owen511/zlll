
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
   //��ʼ������
   initSurface();
   //չ�������б�	
  showDataTable(config);
  //�����һ��
   document.getElementById("dataResource_nextBTN").onclick = function() {
	  nextConfig();	
   }
   //�������
   document.getElementById("dataResource_submitBTN").onclick = function() {
	   saveRelevance();	
   }
	 //�л���������
   $('#ctrltype').change(function(){ 
	   var optval=$(this).children('option:selected').val(); 
	   changeCtrlType(optval);
	});
	 //��������
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
 
//�л���������
function   changeCtrlType(optval){
	 if (optval == "0") {   //ֵ������  
		  $("#dataResource_nextBTN").css("display" ,"");
		// $("#dataResource_submitBTN").css("display" ,"none");    
		  $("#trRele").css("display" ,"none");  
	}else if (optval == "1") {  //�ֶι���  
		var configInfo = new Object();
		var ctrlcode= $("#ctrlcode").val();
		var ctrledcode= $("#ctrledcode").val();
		if(ctrlcode==ctrledcode&&null!=ctrlcode&&ctrlcode!=""){
			alert("�ܿ�Ԫ�غͿ���Ԫ�ز�����ͬ!");
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
//չ��datatable�б�����
function   showDataTable(config){
	var ctrltype_mapper=[['1','�ֶι���' ],['0','ֵ������' ]]; 
	var state_mapper_data=[['1','����' ],['0','����' ]];
	   datatable = new Ext.lt.editdatatable(config.configTable);
	   datatable.setCols([datatable.columns.seq, datatable.columns.checkbox,
						{name:'configname',datatype:'S',alias:'ֵ������',datatype:'S',edit:false,style:'text-align:center'},
						{name:'product',datatype:'S',alias:'��Ʒ',edit:false,style:'text-align:center',format:'#name',mapper:{columns:['billid','name' ],datas:config.tableSelect}},
						{name:'ctrlcol',datatype:'S',alias:'����Ҫ��',edit:false,style:'text-align:center'},
						{name:'ctrledcol',datatype:'S',alias:'�ܿ�Ҫ��',edit:false,style:'text-align:center'},
						{name:'ctrltype',datatype:'S',alias:'��������',edit:false,style:'text-align:center' ,format:'#name',mapper:{columns:['billid','name' ],datas:ctrltype_mapper}},
						{name:'relecol',datatype:'S',alias:'�����ֶ�',edit:false,style:'text-align:center'},
						{name:'state',datatype:'S',alias:'���ñ�ʶ',edit:false,style:'text-align:center',format:'#name',mapper:{columns:['billid','name' ],datas:state_mapper_data}},
						{name:'mark',datatype:'S',alias:'��ע',width:300 ,edit:false,style:'text-align:center'}
						]);
		 datatable.setEditSelectCheckbox(false);
		 datatable.setMouselight('#597EAA');
		 datatable.mousedrag(false);
		 datatable.setClassName('dttheme_ifmis');
		 datatable.draw(attachDiv); 
}
//��������
function saveRelevance(){
	var releOjb= new Object();
	if(null==$("#configName").val()||$("#configName").val().trim()==""){
		alert("ֵ�����Ʋ���Ϊ��!");
		return ;
	}
	var ctrlType= $("#ctrltype").val();
	if(ctrlType=='0') { //ֵ������
		var lis = "";
  		$("#checkedDiv li").each(function(){
  			lis = lis + this.itemid + ",";
  		});
        if( null==lis||lis==""){
        	alert("�����޶�Ӧ����!");
        	return ;
        }
        releOjb.itemIds=lis;	
	    
    }else{ //�ֶι���
    	if($("#ctrlcode").val()==$("#ctrledcode").val()){
    		 alert("�ܿ�Ԫ�غͿ���Ԫ�ز�����ͬ!");
    		 return ;
    	 }
    	  releOjb.relevanceCol=$("#relevanceCol").val();
    	  if(null==$("#relevanceCol").val()||$("#relevanceCol").val()==""){
    		  alert("�ֶι���û���ҵ������ֶ����ʵ!");
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
		alert("ֵ�����ƴ��������벻����ֵ������!");
		return ;
	}
	Ext.lt.RCP.server('datacommon_relevance_element_service','saveReleElement',releOjb,function(resp){
		if(resp.result=="1") {
			alert("����ɹ�");
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
//���ѡ���б�����
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

//���ѡ���б�����
function  addSelectValue(){
 var releProArr=productList.toArray();
 $("#ctrltype").empty();
 $("#product").empty();
 for(var i=0;i<releProArr.length;i++){
	  document.getElementById("product").options.add(new Option(releProArr[i].NAME, releProArr[i].PRODUCTS)); 
 }
 document.getElementById("ctrltype").options.add(new Option("ֵ������", "0"));
 document.getElementById("ctrltype").options.add(new Option("�ֶι���", "1"));
}

//ɾ����������
 function   deleteCtrl(){
  var recordSet = datatable.getRecordSet();
  var checkTrs = recordSet.query({check:1});
  var configInfo = new Object();
  if(!checkTrs || checkTrs.length< 1){
	  alert("��ѡ��ɾ����¼��");
	  return;
  }
  if(confirm("ȷ��Ҫɾ�����ݣ�")){
	  var ctrlItemId=[] ;
		for ( var i = 0; i < checkTrs.length; i++) {
			ctrlItemId.push(checkTrs[i].itemid);
		}
		configInfo.itemIds=ctrlItemId.join(",");
		Ext.lt.RCP.server('datacommon_relevance_element_service','deleteReleElementState',configInfo,function(resp){
			if(resp.result=="1") {
				alert("ɾ�����ݳɹ�");
				datatable.setRecordset(resp.configTable)
				datatable.redraw();
				datatable.reflash();
			}
		 });   
   }
}
 
//�޸�����״̬
function   updateState(){
  var recordSet = datatable.getRecordSet();
  var checkTrs = recordSet.query({check:1});
  var configInfo = new Object();
  if(!checkTrs || checkTrs.length< 1){
	  alert("��ѡ���޸�״̬��¼��");
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
		   alert("�޸�״̬�ɹ�");
			datatable.setRecordset(resp.configTable)
			datatable.redraw();
			datatable.reflash();
		}
	}); 
}
 
//����
function  addConfig(){
	form_content_wind = new Ext.lt.window({title:'ֵ����������',fitmode:'content',className:'wind7',mark:true,autoshow:true,pop:true,w:800,h:900});
	form_content_wind.draw(zjgl);
	form_content_wind.show();
	//�б�����
	addSelectValue();
	$("select").css('display','');
	$("#trRele").css("display" ,"none");
	$("#configName").val("");
	$("#relevanceCol").val("");
	$("#remark").val("");
	addCtrlColumn($("#product").val());
 }
 //�޸�����
 function  updateConfig(){
	  var recordSet = datatable.getRecordSet();
	  var checkTrs = recordSet.query({check:1});
	  if(!checkTrs || checkTrs.length != 1){
		  alert("��ѡ��һ����¼��");
		  return;
	  }else{
	    var checkTr=checkTrs[0];
	    addSelectValue();
	    addCtrlColumn(checkTr.product)
		//�б�����
		$("#configName").val(checkTr.configname);
		$("#ctrlcode").val(checkTr.ctrlcol);
		$("#ctrledcode").val(checkTr.ctrledcol);
		$("#ctrltype").val(checkTr.ctrltype);
		$("#relevanceCol").val(checkTr.relename);
		$("#product").val(checkTr.product);
		$("#remark").val(checkTr.mark);
		itemId=checkTr.itemid;
		//�������ʹ���
		changeCtrlType(checkTr.ctrltype);
		$("#zjgl").show();
		form_content_wind = new Ext.lt.window({title:'ֵ����������',fitmode:'content',className:'wind7',mark:true,autoshow:true,pop:true,w:800,h:900});
		form_content_wind.draw(zjgl);
		form_content_wind.show();
		$("select").css('display','');
		$("#trRele").css("display" ,"none");  
	  }
 }
//��һ��ִ��
function nextConfig(){
	var configInfo = new Object();
	var ctrlcode= $("#ctrlcode").val();
	var ctrledcode= $("#ctrledcode").val();
	if(ctrlcode==ctrledcode){
		alert("�ܿ�Ԫ�غͿ���Ԫ�ز�����ͬ!");
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
	// ���ĵ���¼�
	ctrledTreeData=resp.ctrledTree;
	ctrlTree.on({
		nodeclick : function(tree, param){
			  selNode = param.data;
			 if (selNode.isleaf == 0) {
				 alert("��ѡ��ĩ����λ��");
				  return;
				} 
			 /* var configInfo={};
			  var seleId=selNode.itemid;
			  //ȷ�����޸Ĳ���
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
					alert("��ѡ�����Ԫ�أ�");
					return;
				 } 
			  addMiddleLi(selNode ,ctrled);	
			}
			
		}
	});
	//�޸Ĵ���Ĭ��ѡ��ֵ
	if(null!=resp.ctrledTree&&resp.ctrledTree){
		checkedUpdateCtrl(resp.checkTree);
	}
	$("#form_content_tree").show();
	form_tree = new Ext.lt.window({title:'���ù��˹�ϵ',fitmode:'content',className:'wind7',mark:true,autoshow:true,pop:true,w:600,h:500});
	form_tree.draw(form_content_tree);
	form_tree.show();
	
 });
}

//�м�li
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
		alert("���ƶ�Ӧ��ϵ����!");
		return false;
	  }
	$li.attr("code",code);
	$li.attr("itemid",itmeid);
	var $span = jQuery("<span><input type='checkbox' checked='checked'/>"+ctrl.name+"-"+ctrled.name+"</span>");
	$li.append($span);
	$("#checkedDiv").prepend($li);
};

//�м�li
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

//�м�li
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
 //��ȡ��ѡ�ڵ�
 function getCheckTree(arrCtrls ,itemid){
	  for(var i=0;i<arrCtrls.length;i++) {
		 if(arrCtrls[i].itemid==itemid){
			 return arrCtrls[i];
		 }
	  }
  }

 // ��ȡQtreeҶ�ӽڵ������ֵ
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
 // ��ȡQtreeҶ�ӽڵ������ֵ
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
 
//��ʼ������
function   initSurface(){
   document.getElementById("template_main").innerHTML ="";
	var sb = new StringBuffer();
	sb.append("<table align='center' width=\"100%\" border=\"0\" >");
	sb.append("<tr>");
	sb.append("<td>");
	sb.append("<div id=\"query_t\"  style=\"height:20px;width:99%;margin:0;\">");
	sb.append("<span><span title=\"����\" class=\"add_btn\" onclick=\"addConfig();\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0)\">����</a></span></span>");
	sb.append("<span><span title=\"�޸�\" class=\"add_btn\" onclick=\"updateConfig();\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0)\">�޸�</a></span></span>");
	sb.append("<span><span title=\"ɾ��\" class=\"del_btn\" onclick=\"deleteCtrl();\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0);\">ɾ��</a></span></span>");
	sb.append("<span><span title=\"����/ֹͣ\" class=\"del_btn\" onclick=\"updateState();\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0);\">����/��ֹ</a></span></span>");
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
	sb.append('		     <td><span>ֵ�����ƣ�</span><input style="width:200px;" maxLength=50 id="configName" /></td>');
	sb.append('		  </tr>');
	sb.append('		  <tr>');
	sb.append('		     <td><span>��&nbsp;&nbsp;&nbsp;&nbsp;Ʒ��</span><select id="product" style="width:200px;" ></select></td>');
	sb.append('		  </tr>');

	sb.append('		  <tr>');
	sb.append('		     <td><span>����Ҫ�أ�</span><select  id="ctrlcode" style="width:200px;"></select>');
	sb.append('				</td>');
	sb.append('		  </tr>');
	sb.append('		  <tr>');
	sb.append('		     <td><span>�ܿ�Ҫ�أ�</span><select  id="ctrledcode" style="width:200px;"></select>');
	sb.append('				</td>');
	sb.append('		  </tr>');
	sb.append('		  <tr>');
	sb.append('<td><span>�ܿ����ͣ�</span>');
	sb.append('<select style="width:200px;"  id="ctrltype"  >')
    sb.append('</select>')
	sb.append('				</td>');
	sb.append('		  </tr>');
	sb.append('		  <tr>');
	sb.append('		  <tr id ="trRele"  >');
 	sb.append('<td><span>�����ֶΣ�<select style="width:200px;" id="relevanceCol" ></select></td>');
	sb.append('		  </tr>');
	sb.append('		  <tr>');
	sb.append('		     <td><span>������ע��</span><textarea style="width:200px;height:60px;"  onpropertychange="if(this.value.length>120){this.value=this.value.substring(0,120);}" id="remark" ></textarea></td>');
	sb.append('		  </tr>');
	sb.append('       </table>');
	sb.append(' <div class="formbtns" style="width:300px;" align="center">');
	sb.append('    <button type="button" class="button_style" id="dataResource_nextBTN">��һ��</button>');
	sb.append('    <button type="button" class="button_style" id="dataResource_submitBTN">��  ��</button>');
	sb.append('    <button type="button" class="button_style" onclick="form_content_wind.close();">ȡ��</button>');
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
	sb.append('	<button type="button" class="button_style" onclick="form_tree.close();"  >ȷ��</button>');
	sb.append('	<button type="button" class="button_style" onclick="form_tree.close();">ȡ��</button>');
	sb.append('</div>');
	sb.append('</div>');
	document.getElementById("template_main").innerHTML = sb.toString();
}