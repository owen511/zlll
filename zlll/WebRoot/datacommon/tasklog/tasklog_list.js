var mainmenu = null;
var submenu = null;
var V = null;
var treedata = null;
var _qtree = null;
var dataTble = null;

var form_list = function(config, service){
  mainmenu = config.mainmenu;
  submenu = config.submenu;
  treedata = config.dcTask;
  
  //��ʼ����ҳ�� 
  initLayoutMain(config);	
  							          
		 _qtree=new Ext.lt.Qtree({
			data:treedata,
			outformart:'#taskname',
			expandlevel:'1',
			showRootNode:true,
			rootNode:{superitemid:'0',itemid:'0',taskname:'�ɼ�������־���',isleaf:'0'}
		});
		_qtree.draw(projectContainer);
		
		_qtree.on({
			nodeclick : function(tree, param) {
				var selNode = param.data;
				if(selNode){
					V = selNode.itemid;
				} else {
					V = null;
				}
				query();
			}
		});
		
		if(!init_table_dc){
		      alert("���ȼ���extendInitTable.js�ļ�");
		      return;
	          }
	          else{
		      dataTble = init_table_dc(config,'tableContainer',function(columns){
			         for(var i=0;i<columns.length;i++){
			         columns[i].edit=false;			
			      }
		       });
	          }
}

//��ʼ����ҳ��
function initLayoutMain(config){
	var sb = new StringBuffer();

	sb.append("<form name=\"mainListForm\" id=\"mainListForm\" action=\"#\" method=\"post\">");
		sb.append("<table align='center' width=\"100%\" border=\"0\" id=\"table\">");
		 sb.append("<tr>");
		    sb.append("<td width=\"20%\" valign=\"top\">");
				sb.append("<div id=\"projectContainer\" layout=\"{h:{fit:-6}}\" style=\"background:#fff;border:1px solid #ccc;padding:4px; overflow:auto;height:550px;\"></div>");
		    sb.append("</td>");
		    sb.append("<td width=\"75%\" valign=\"top\">");
				sb.append("<div id=\"tableContainer\" layout=\"{w:{fit:-320},h:{fit:-4}}\" style=\"width:95%;height:550px;\"></div>");
			 sb.append("</td>");
		sb.append("</tr>");
		sb.append("</table>");
	sb.append("</form>");

	document.getElementById("template_main").innerHTML = sb.toString();
}

function query(){
var params = {};
  params['tableCode'] = "T_TPMS_TASKLOG";
  if(!V){
  params['condition'] = "1=1";
  }
  else{
  params['condition'] = "taskid='"+V+"'";
  }
Ext.lt.RCP.server("datacommon_tasklog_service", "queryTaskLog",params,function(data){
		if(data.error){
		    alert(data.error);   
		}
		else{
           var userdata = dataTble.getRecordset();
           userdata.clear();
           userdata.addData(data.formData.toArray()); 
			}
			},function(){
		alert('����!');	
		});	
	}

													