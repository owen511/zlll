var form_content_wind=null;
var column_Win=null;
var ctrlTree=null;
var ctrlItemId="";
var	ctrledTree=null; 
var datatable=null;
var paramtable=null;
var itemId="";
var releselect=null;
var headdeafaultvalue = {};
function compute_list(config, service) {
   releselect=config.productList;
   //初始化界面
    initSurface();
   //展现数据列表	
    showDataTable(config);
  // 点击列打开窗口
    $('#tableColumn').click(function(){ 
    	showChooseColumn();
	  });
    $('#addParamRow').click(function(){ 
    	addParamRowData();
	  });
    $('#delParamRow').click(function(){ 
    	delParamRowData();
	  });
    $('#submitBut').click(function(){ 
    	submitButParam();
	  });
    $('#saveDataBut').click(function(){ 
    	saveRelevance();
	  });
 
 }

//确定参数
function submitButParam(){
	column_Win.close();
}
//删除参数行数据
function delParamRowData(){
	var data = paramtable.getRecordSet().query({check:1});
	paramtable.getRecordSet().remove(data);
	paramtable.reflash();
}
//添加参数行数据
function addParamRowData(){
	var newdefault =Ext.lt.apply({},headdeafaultvalue);	
	var paramRs = paramtable.getRecordset();
	paramRs.addData(newdefault,paramRs.size()+1);
	paramtable.endAddData(paramRs.size()+1,1);
	paramtable.reflashdata('viewdata');
}
//展现选择表列
function showChooseColumn(){
	var configInfo={};
	 $("#paramList").show();
	 if(null==column_Win){
		column_Win = new Ext.lt.window({title:'计算关系',fitmode:'content',className:'wind7',mark:true,autoshow:true,pop:true,w:550,h:340});
		column_Win.draw(paramList);
	 }
	 if(null==itemId||itemId=="")  {
		 configInfo.itemid=-1;
	 }
	 Ext.lt.RCP.server('datacommon_relevance_compute_service','findReleData',configInfo,function(resp){
		 var paramRs=resp.paramInfo;
			if(null==paramtable) {
			    showParamTable(paramRs);
			 }else{
			   $("#paramData").show();
				column_Win.show();
				paramtable.setRecordset(paramRs);
				paramtable.redraw() ;
 	          }
		});
 }
//展现paramtable列表数据
function   showParamTable(tableInfo){
	$("#paramList").show();
	var _mapper_data=[['String'],['Int']];
	paramtable= new Ext.lt.formulasdatatable({rs:tableInfo,formulascol:null,formulas:null});
	paramtable.setCols([
	paramtable.columns.seq,
	paramtable.columns.checkbox,
	{name:'paramname',datatype:'S',alias:'参数名',datatype:'S',edit:true,style:''},
	{name:'paramtype',datatype:'S',alias:'参数类型',edit:true,style:'text-align:center',format:'#name',mapper:{columns:['name'],datas:_mapper_data}},
	{name:'paramorder',datatype:'I',alias:'参数顺序',edit:true,style:'text-align:center'} 
	]);
	paramtable.setEditSelectCheckbox(false);
	paramtable.setMouselight('#597EAA');
	paramtable.mousedrag(false);
	paramtable.setClassName('dttheme_ifmis');
	paramtable.draw(paramData);
}
 
//展现datatable列表数据
function   showDataTable(config){
	var out_mapper_data=[['1','字符' ],['0','数字' ]];
	var state_mapper_data=[['1','启用' ],['0','禁用' ]];
	datatable= new Ext.lt.editdatatable(config.tableInfo);
	datatable.setCols([
	datatable.columns.seq,
	datatable.columns.checkbox,
	{name:'configname',datatype:'S',width:300,alias:'宏名',datatype:'S',edit:false,style:'text-align:center'},
	{name:'product',datatype:'S',width:200,alias:'产品',edit:false,style:'text-align:center',format:'#name',mapper:{columns:['billid','name' ],datas:config.tableSelect}},
	{name:'outputtype',datatype:'S',width:150,alias:'输出类型',edit:false,style:'text-align:center',format:'#name',mapper:{columns:['billid','name' ],datas:out_mapper_data}},
	{name:'state',datatype:'S',width:100,alias:'启用标识',edit:false,style:'text-align:center',format:'#name',mapper:{columns:['billid','name' ],datas:state_mapper_data}},
	]);
	datatable.setEditSelectCheckbox(false);
	datatable.setMouselight('#597EAA');
	datatable.mousedrag(false);
	datatable.setClassName('dttheme_ifmis');
	datatable.draw(tableCompute);
}
//保存数据
function saveRelevance(){
	var releOjb= new Object();
	releOjb.configName = $("#configName").val();
	var product= $("#product").val();
    releOjb.sqlTxt=  $("#sqltxt").val();
    releOjb.outPut=  $("#outPut").val();
    releOjb.product=product;
     if(null==$("#configName").val()||$("#configName").val().trim()==""){
    	 alert("值集名称不能为空!");
    	 return ;
     }
    if(null==$("#sqltxt").val()||$("#sqltxt").val().trim()==""){
   	  alert("SQL语句不能为空!");
   	  return ;
    }
	if(null!=paramtable) {
		var paramRecorSet= paramtable.getRecordSet();	
		var paramObj = paramRecorSet.toArrayJSON();
		releOjb.paramObj=paramObj;
	 }
	if(null!=itemId&&itemId!=""){
		releOjb.itemId=itemId;
	}
	var resp=Ext.lt.RCP.asynserver('datacommon_relevance_compute_service' ,'getConfigName',releOjb );
	if(resp.configCount!='0') {
		alert("宏名称存在请输入不存在宏名称!");
		return ;
	}
	Ext.lt.RCP.server('datacommon_relevance_compute_service','saveReleCompute',releOjb,function(resp){
		if(resp.result=="1") {
			alert("保存成功");
			datatable.setRecordset(resp.configTable);
			datatable.redraw();
			form_content_wind.close();
		 }else{
			alert(resp.error);	
			return ;
		}
	});
}
//添加选择列表数据
function  addSelectValue(){
 var releArr=releselect.toArray();
 $("#product").empty();
 $("#outPut").empty();
 for(var i=0;i<releArr.length;i++){
	  document.getElementById("product").options.add(new Option(releArr[i].NAME, releArr[i].PRODUCTS)); 
  }
 var outPutType=document.getElementById("outPut");
 outPutType.options.add(new Option("数字", "0"));
 outPutType.options.add(new Option("字符", "1"));
 outPutType.options.add(new Option("List集合", "2"));
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
		Ext.lt.RCP.server('datacommon_relevance_compute_service','deleteReleState',configInfo,function(resp){
			if(resp.result=="1") {
				alert("删除数据成功");
				datatable.setRecordset(resp.configTable);
				datatable.redraw() ;
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
	Ext.lt.RCP.server('datacommon_relevance_compute_service','updateComputeState',saveData,function(resp){
		if(resp.result=="1") {
		   alert("修改状态成功");
		}
		datatable.setRecordset(resp.configTable);
		datatable.redraw() ;
	}); 
}
 
//新增
function  addConfig(){
	itemId="";
	$("#form_contentsql").show();
	form_content_wind = new Ext.lt.window({title:'计算设置',fitmode:'content',className:'wind7',mark:true,autoshow:true,pop:true,w:800,h:900 });	
	form_content_wind.draw(form_contentsql);
	form_content_wind.show();
	//列表数据
	addSelectValue();
	$("select").css('display','');
	$("#configName").val("");
	$("#outPut").val("");
	$("#sqltxt").val("");
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
		//列表数据
		addSelectValue();
		$("#configName").val(checkTr.configname);
		$("#product").val(checkTr.product);
		$("#outPut").val(checkTr.outputtype);
		$("#sqltxt").val(checkTr.sql);
		itemId=checkTr.itemid;
		$("#form_contentsql").show();
		form_content_wind = new Ext.lt.window({title:'计算过滤设置',fitmode:'content',className:'wind7',mark:true,autoshow:true,pop:true,w:800,h:900});
		form_content_wind.draw(form_contentsql);
		$("select").css('display','');
	  }
 }
//初始化窗口
function   initSurface(){
   document.getElementById("template_main").innerHTML ="";
	var sb = new StringBuffer();
	sb.append("<table align='center' width=\"100%\" border=\"0\" >");
	sb.append("<tr>");
		sb.append("<td>");   
			sb.append("<div id=\"query_t\"  style=\"height:20px;width:99%;margin:0;\">");				
				sb.append("<span><span title=\"新增\" class=\"add_btn\" onclick=\"addConfig()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0)\">新增</a></span></span>");
				sb.append("<span><span title=\"修改\" class=\"add_btn\" onclick=\"updateConfig()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0)\">修改</a></span></span>");	
				sb.append("<span><span title=\"删除\" class=\"del_btn\" onclick=\"deleteCtrl()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0);\">删除</a></span></span>");
				sb.append("<span><span title=\"启动/禁止\" class=\"del_btn\" onclick=\"updateState()\" onmouseover=\"doChangBg(this)\" onmouseout=\"doReturn(this)\" onmousedown=\"doChangeBg1(this)\"><a href=\"javascript:void(0);\">启动/禁止</a></span></span>");	
			sb.append("</div>");
		sb.append("</td>");
	sb.append("</tr>");
	
	sb.append("<tr>");
		sb.append("<td>");
			sb.append("<div id='tableCompute' style='width:99%;height:450px;' layout=\"{w:{fit:true},h:{fit:-20}}\"></div>");
		sb.append("</td>");
	sb.append("</tr>");
	sb.append("</table>");
	sb.append("<div id='form_contentsql' style='display:none;width:400px;height:350px;' >");
	sb.append("<table>");
	sb.append("<thead>");
		sb.append('	<tr>');
	sb.append('		    <td><span>宏&nbsp;&nbsp;&nbsp;&nbsp;名：</span><input style="width:200px;" maxLength=50 id="configName" /></td>');
	sb.append('		  </tr>');
	sb.append('		  <tr>');
	sb.append('		     <td><span>产&nbsp;&nbsp;&nbsp;&nbsp;品：</span><select id="product" style="width:200px;" ></select></td>');
	sb.append('		  </tr>');
	sb.append('		  <tr>');
	sb.append('		     <td><span>输出类型：</span><select id="outPut" style="width:200px;"  ></select></td>');
	sb.append('		  </tr>');
	sb.append('		  <tr>');
	sb.append("		     <td><span>输入参数：</span><input type='button' id ='tableColumn'  class='button_style' style = 'height:20px;' value='参数列表' ></input>注：需按顺序</td>");
	sb.append('		  </tr>');
	sb.append("<tr>");
	sb.append("<td valign='top' width = '100%'>");
	sb.append("	     <span  >SQL： &nbsp;&nbsp;&nbsp;&nbsp;</span>");
	sb.append("<textarea id = 'sqltxt' rows = '13' cols = '40'></textarea>");
	sb.append("</td>");
	sb.append("</tr>");
	sb.append("</thead>");
	sb.append("</table>");
	
	sb.append("<div style='margin-left:40%;'>");
	sb.append("<input type='button' style = 'height:20px;'  id='saveDataBut' class='button_style' value='保 存' ></input>");
	sb.append("<input type='button' style = 'height:20px;' class='button_style'  value='取 消' onclick='form_content_wind.close();'></input>");
	sb.append("</div>");
	sb.append("</div>");
	sb.append('<div id="paramList" style="display:none;width:550px;height:340px;" >');
	sb.append('<div>');
	sb.append("<input type='button' id ='addParamRow'  class='button_style' style = 'height:20px;' value='新增行' ></input>");
	sb.append("<input type='button' id ='delParamRow'  class='button_style' style = 'height:20px;' value='删除行' ></input>");
	sb.append("<input type='button' id ='submitBut'  class='button_style' style = 'height:20px;' value='确定' ></input>");
	sb.append('</div>');
	sb.append("<br>");
	sb.append('<div id="paramData" style="width:550px;height:300px;" />');
	sb.append('</div>');
    document.getElementById("template_main").innerHTML = sb.toString();
}