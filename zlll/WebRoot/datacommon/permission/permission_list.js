var mainmenu = null;
var submenu = null;
var treedata = null;
var userid = null;
var qtree = null;
var userdata = null;
var V = null;
var M = null;
var datatable = null;

var issave = 0;

var form_list = function (config, service){
  mainmenu = config.mainmenu;
  submenu = config.submenu;
  treedata = config.userlist; 
  userid = config.userid;
  userdata=new function(){return new Ext.lt.recordset({columns:["name","pcheck","pdetailing","receiver","issued","task","bureaus"],datas:[]})};
  
  //初始化主页面 
  initLayoutMain(config);
  
		 qtree=new Ext.lt.Qtree({
			data:treedata,
			outformart:'#name',
			expandlevel:'1',
			showRootNode:true,
			rootNode:{name:"权限管理",itemid:"0",superitemid:"0",isleaf:0}
		});
		qtree.draw(treediv);
		
		qtree.on({
			nodeclick : function(tree, param) {
				var selNode = param.data;
				if(selNode){
					V = selNode.itemid;
					M = selNode.isleaf;
					query();
				} else {
					V = null;
					M = null;
				}
			}
		});
						   
			var test = function(i,j,rs,value){
			if(value==1){
			return ['<input type="checkbox" checked> ']
			}
			else{
			rs["permission"]=0;
			return ['<input type="checkbox"> ']			
			}
			};
					
			var node = function(td,el,l,c,d){
			issave = 1;			
				var _val = $(el).find("input[type=checkbox]");	
				var name = datatable.getCol(c).name;
				if(_val.attr("checked")){
	  		    d[name]=1;
	  		    datatable.reflash();
	  		    }
	  		    else{
	  		    d[name]=0;
	  		    }
			};
								   
            datatable=new Ext.lt.datatable35(userdata);
			datatable.setCols([
			datatable.columns.seq,
			{name:'name',alias:'任务分类名称',width:400,datatype:'S'},
			{name:'permission',alias:'权限',width:400,datatype:'S',fn:test,style:'text-align:center'}
			]);		
			datatable.setEditSelectCheckbox(false);
			datatable.setMouselight('#597EAA');
			datatable.mousedrag(false);
			datatable.setClassName('dttheme_ifmis');	
			datatable.onEvent('onclick',node);	
			datatable.setLayout();
			datatable.draw(edittableprogramtype);
}

//初始化主页面
function initLayoutMain(config){
	var sb = new StringBuffer();

	sb.append("<table align='center' width=\"100%\" border=\"0\">");
	sb.append("<tr><td width=\"25%\" valign=\"top\">");
	sb.append("<div class=\"budget_title\" style=\"position:relative;z-index:100;\">");
	sb.append("<span style=\"vertical-align:middle;\" onmouseover=\"this.className='budget_over'\" onmouseout=\"this.className=''\"><button class=\"budget_clear\" id=\"btn_unBdgagency01\" onclick=\"dosave()\">保存</button></span>");
	sb.append("</div>");
	sb.append("</td>");
	sb.append("<td width=\"75%\">");
	sb.append("</tr>");
	sb.append("<tr>");
	sb.append("<td valign=\"top\">");
	sb.append("<div id=\"treediv\" layout=\"{h:{fit:-25}}\" style=\"background:#fff;border:1px solid #ccc;padding:0px; overflow:auto;height:550px;width:100%;\"></div>");
	sb.append("</td>");
	sb.append("<td valign=\"top\">");
	sb.append("<div id='edittableprogramtype' layout=\"{w:{fit:-320},h:{fit:-25}}\" style=\"background:#fff;border:1px solid #ccc;padding:0px; overflow:auto;height:550px;width:100%;\"></div>");
	sb.append("</td>");
	sb.append("</tr>");
	sb.append("</table>");

	document.getElementById("template_main").innerHTML = sb.toString();
}

 //查询
function query(){
var params = {};
params["itemid"]=V;
if(M==0){
  var userdata = datatable.getRecordset();
  userdata.remove(userdata.toArray());
}
else{
Ext.lt.RCP.server("datacommon_permission_service", "queryPermission",params,function(data){
		if(data.error){
		    alert(data.error);   
		}else{
          var userdata = datatable.getRecordset();
          userdata.clear();
          userdata.addData(data.permission.toArray()); 
			}
			},function(){
		alert('错误!');	
		});
		}
		}
  
//保存
function dosave(){
	if(!V || M == 0){
		alert("请先选择用户");
		return;
	}
  issave = 0;
   var userdata = datatable.getRecordset();
   var inputocs = userdata.toArray();
   var params = {};
   params['rsjason'] = inputocs;
   params['itemid'] = V;
   
	showdiv();
	Ext.lt.RCP.server("datacommon_permission_service", "savePermission", params, function(data){
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
	
	function openmenubefore(){
	 if(issave == 1){
	 if(window.confirm("你还未保存，是否保存？")){
	 dosave();
	 }
	 }
	 }
