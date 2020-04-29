var mainmenu = null;
var submenu = null;
var treedata = null;
var treeData = null;
var qtree = null;
var _qtree = null;
var V = null;

var issave = 0;
var checkvalues = [];

var form_list = function(config, service){
  mainmenu = config.mainmenu;
  submenu = config.submenu;
  treedata = config.ptConfig;
  treeData = config.ptTable;
  
  //初始化主页面 
  initLayoutMain(config);	
            
		  qtree=new Ext.lt.Qtree({
			data:treedata,
			outformart:'#code-#name',
			expandlevel:'2',
			showRootNode:true,
			rootNode:{superitemid:'0',itemid:'1',name:'产品名称',isleaf:'0'}
		});
		qtree.draw(treediv);
        
		qtree.on({
			nodeclick : function(tree, param) {
				var selNode = param.data;
				if(selNode){
					V = selNode.itemid;
					query();
				} else {
					V = null;
				}
			}
		});
       
	treeView(treeData, _treediv);
}

//初始化主页面
function initLayoutMain(config){
	var sb = new StringBuffer();
	
	sb.append("<table align='center' width=\"100%\"  border=\"0\">");
	sb.append("<tr><td valign=\"top\" width=\"20%\">");
	sb.append("<div class=\"budget_title\" style=\"position:relative;z-index:100;\">");
	sb.append("<span style=\"vertical-align:middle;\" onmouseover=\"this.className='budget_over'\" onmouseout=\"this.className=''\"><button class=\"budget_clear\" id=\"btn_unBdgagency01\" onclick=\"dosave()\">保存</button></span>");
	sb.append("</div>");
	sb.append("</td>");
	sb.append("<td width=\"60%\">");
	sb.append("</td>");
	sb.append("<td width=\"20%\">");
	sb.append("<div><input type='text'id='formname' value=\"\" /></div>");
	sb.append("</td>");
	sb.append("</tr>");
	sb.append("<tr>");
	sb.append("<td valign=\"top\">");
	sb.append("<div id=\"treediv\" layout=\"{h:{fit:-25}}\" style=\"background:#fff;border:1px solid #ccc;padding:0px; overflow:auto;height:550px;width:100%;\"></div>");
	sb.append("</td>");
	sb.append("<td valign=\"top\">");
	sb.append("<div id='project_economic' layout=\"{w:{fit:-450},h:{fit:-25}}\" style=\"background:#fff;border:1px solid #ccc;padding:0px; overflow:auto;height:550px;width:100%;\"></div>");
	sb.append("</td>");
	sb.append("<td valign=\"top\" >");
	sb.append("<div id='_treediv' layout=\"{h:{fit:-25}}\" style=\"background:#fff;border:1px solid #ccc;padding:0px; overflow:auto;height:550px;width:100%;\"></div>");		
	sb.append("</td>");	     
	sb.append("</tr>");
	sb.append("</table>");

	document.getElementById("template_main").innerHTML = sb.toString();
}

     

//页面删除
$("#project_economic").live("click","",function(e){
    issave = 1;
    var el = $(e.target);
    if ( el.is("input") ){
    el.parent().remove();  
    } 
    var pe = $("#project_economic").find("input[type=checkbox]");
      checkvalues = [];
      if(pe.length>0){
     for(var i=0; i<pe.length; i++){
     checkvalues[i] = pe[i].value;
     }
     }
     
     //重新画树  
     treeView(treeData, _treediv);
});

 //查询
function query(){
var params = {};
params["products"]=V;
Ext.lt.RCP.server("datacommon_products_service", "queryProductsToConfig",params,function(data){
		if(data.error){
		    alert(data.error);   
		}else{
           $("#project_economic").empty();
           var checkedSpan = data.ptconfig.toArray(); 
           checkvalues=[];
           for(var i=0,n=checkedSpan.length;i<n;i++){
	   $("#project_economic").append('<li><input type="checkbox" checked=true value='+checkedSpan[i].elementcode+'>'+checkedSpan[i].elementcode+'-'+checkedSpan[i].name+'</li>');	
	   	checkvalues[i]=checkedSpan[i].elementcode;
	       }
	      
	    //重新画树  
	    treeView(treeData, _treediv);	
			}
			},function(){
		alert('错误!');	
		});
		}
		
     //添加
	function appendSelectedNodes(){
	issave = 1;		
	$("#project_economic").empty();
	var checkedSpan = _qtree.getSelected();
	for(var i=0,n=checkedSpan.length;i<n;i++){
		if(checkedSpan[i].isleaf==1){
	   $("#project_economic").append('<li><input type="checkbox" checked=true value='+checkedSpan[i].itemid+'>'+checkedSpan[i].itemid+'-'+checkedSpan[i].name+'</li>');
	   }
	}	
}

//保存
function dosave(){
	if(!V){
		alert("请先选择产品");
		return;
	}
     issave = 0;
     var inputocs = [];
     var k = 0;
     var data = _qtree.getSelected();
     for(var i=0;i<data.length;i++){
     var dl = {};
     if(data[i].isleaf==1){
     dl['name']=data[i].name;
     dl['elementcode']=data[i].itemid;
     inputocs[k]=dl;
     k++;
     }
     }
     var params = {};
     params['rsjason'] = inputocs;
     params['products'] = V;
     
	showdiv();
	Ext.lt.RCP.server("datacommon_products_service", "saveProductsToConfig", params, function(data){
		if(data.error){
		    alert(data.error);
		    closediv();
		}else{
			alert("保存成功！");
			closediv();					
		}
	},function(){
		alert('错误!');
		closediv();
	});
	}

//画右侧树
function treeView(treeData, treeDiv){
	_qtree=new Ext.lt.Qtree({
		data:treeData,
		outformart:'#code-#name',
		selectmode:'n',
		linkchild:true,
		linkparend:true,
		parentlinksub:false,
		expandlevel:'1',
		values:checkvalues,
		showRootNode:true,
		rootNode:{superitemid:'0',itemid:'1',name:'引用项名称',isleaf:'0'}
	});
	_qtree.draw(treeDiv);
	
	_qtree.on({
		change : function(tree, param) {
			if(!V){
				alert("请选择产品");
				treeView(treeData, _treediv);
				return;
			}
			appendSelectedNodes();
		}
	});
	
	//树的查询方法
  	$("#formname").keyup(function(){
  		_qtree.searchnode([{field:'code',values:[this.value.trim()]},{field:'name',values:[this.value.trim()]}],'contain');
  		
//  		if(!this.value.trim()) _qtree.clearSelected();
  	}).keyup();
}
	
	function openmenubefore(){
	 if(issave == 1){
	 if(window.confirm("你还未保存，是否保存？")){
	 dosave();
	 }
	 }
	 }
	