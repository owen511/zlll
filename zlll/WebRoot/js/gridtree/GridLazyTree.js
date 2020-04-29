var myTree= new GridTree();
	
/**
 * ����������
 * remake�ؽ�����־ 
 */
function getGridTree(remake)
{   
	var GridColumnType =  [
                  {
					header : '����',
					headerIndex : 'code',
					//��������Ŀ��ʹ�ðٷֱ�,Ч���Ϻ�.
					headerCode :'',
					width:'50px'
				}, {
					header : '����',
					headerIndex : 'name',
					headerCode :'',
					width:'50px'
				}, {
					header : '��λ',
					headerIndex : 'bdgagency_name',
					headerCode :'bdgagency_code',
					width:'100px'
				},{
					header : '��Ŀ����',
					headerIndex : 'type_name',
					headerCode :'type_code',
					width:'100px'
				}, {
					header : '����',
					headerIndex : 'bdgmanagedivision_name',
					headerCode :'bdgmanagedivision_code',
					width:'50px'
				}];
	var url = ROOT_PATH+"/common/jump/list_program2.do";
	if(pars)url = url+pars;
	var content = {columnModel:GridColumnType,   
                        dataUrl:url,
                        lazyLoadUrl:url,
                        idColumn:'itemid',//id���ڵ���,һ��������(��һ��Ҫ��ʾ����)
                        parentColumn:'superitemid', //������id
                        pageSize:20,
                        analyzeAtServer:true,//������dataUrl���Ե�ʱ�������������false��ʾ�������νṹ��ǰ̨���У�Ĭ���Ǻ�̨��������֧��java��,������json��ʽ���ã�
                        multiChooseMode:5,//ѡ��ģʽ������1��2��3��4��5�֡�
                      	tableId:'testTable',//�������id
                      	checkOption:ismutl,//1:���ֵ�ѡ��ť,2:���ֶ�ѡ��ť,����:������ѡ��ť
                      	pageBar:true,//�Ƿ��ҳ
                      	rowCount:true,
                      	remake:remake,//���´�����
                      	hadValueCode:function(){
                      		if(parent.selvalue){
	                      		if(ismutl == 1){
	                      			//valuecode���ŷָ�
	                      			//value���߷ָ�����C��ʶ��code��ѯ
	                      			//alert(parent.selvalue);
	                      			if(parent.selvalue.indexOf("-")>-1){
	                      				var hadSelected = parent.selvalue.split("-");
	                      				return "C"+hadSelected[0];
	                      			}
	                      			else{
		                      			var hadSelected = parent.selvalue.split(",");
		                      			//ֱ��ѡ���0����ѯ��ѡ�񲻴�0����ʶN����ѡ����һ���ڵ㻹���ӽڵ�
		                      			if(hadSelected[0] == '0'){
		                      				var hadSelectedVal = hadSelected.length<3 ?  hadSelected[1] : "N"+hadSelected[1];                    			
		                      			}
		                      			else{
		                      				var hadSelectedVal = hadSelected.length==1 ? hadSelected[0] : "N"+hadSelected[0];
		                      			}
		                      			return hadSelectedVal;
	                      			}
	                      			
	                      			
	                      		}
	                      		if(ismutl == 2){
	                      			//return parent.selvalue;
	                      		}
                      		}
                      	},
                      	handleCheck:function(handleobj){
				var instance = this;
				if(handleobj&&handleobj.type&&handleobj.type=="checkbox"){
					instance = handleobj;
				}
                      		//debugger;
                      		//��ѡѡ�и�ֵ�Ͷ�ѡѡ�и�ֵ
                      		if(ismutl == 1){
                      			parent.itemid.value = instance.value; //Ϊ����ҳ�洫�ݸ��ڵ� id
                      			setSelectObj(instance.value);
                    		}
                      		else{
                      			var _obj = jQuery(instance).find("INPUT:[type='checkbox']");
                      			var _id = _obj.attr("id");
                      			if(_id != null && _id == "_checkAll"){
                      					var _page = myTree.getCurrentPage();
                      					parent.selectObj.chkAll.push(_page);
                      					setAllMulSelected();
                      			}else{
                      				setMulSelectedObj(instance.value);
                      			}
                      		}
                      	},
                      	chooesdOptionColumn:'rddisbled',
                      	onLazyLoadSuccess:function(gt){   
                      		//alert('������ִ������..');
                      	},
                      	onSuccess:function(gt){   
                      		//alert('���μ��ر����ִ������..');
                      		if(ismutl == 1){
                      			selectDefault();
                      		}else{
                      			var _page = myTree.getCurrentPage();
                      			var _pageNum = jQuery.inArray(_page, parent.chkAll);
                      			if (_pageNum > -1) {
                      				JQ("#_checkAll").attr("checked","true");
                      			}
                      			hadSelected();
                      			selectMulDefault();
                      		}
                      	},
                      	onPagingSuccess:function(gt){   
                      		//alert('��ҳִ������..');
                      		if(ismutl == 1){
                      			selectDefault();
                      		}else{
                      			selectMulDefault();
                      		}
                      	},
                      	lazy:true,//ʹ��������ģʽ����ʱ��ȫ�����ر�ȫ�����ܲ���ʹ�ã�
                      	leafColumn:'isleaf',//�����жϽڵ��ǲ�����Ҷ
                        el:'tableTree'//Ҫ������Ⱦ��div id
           };
	myTree.loadData(content);
	myTree.makeTable();
}

var pageSuc = false; //�Զ���ҳһ�ξͲ��ٷ�ҳ
//�õ���ѡѡ��ֵ
function setSelectObj(vid){
	parent.selectObj.id = vid;
	var pnode = myTree.getRowObjById(vid);
	var ppath = pnode.getAttribute('_node_path');
	var path = ppath.replace(/\_node/g,"")+","+vid;
	parent.selectObj.valuecode = path; 
	if(checkCodeShowFlag("program")){
    	parent.selectObj.value = jQuery(pnode).find("td:[_td_pro='code']").text()+"-"+jQuery(pnode).find("td:[_td_pro='name']").text();
    }else{
        parent.selectObj.value = jQuery(pnode).find("td:[_td_pro='name']").text();
    }
}

//��ѡĬ��ֵѡ�н���Ӧ�Ľڵ�չ��
function selectDefault(){
	if(!parent.selvalue)return;
	var chkCode = parent.selvalue; //��ѡ���ӽڵ�id;
	var arrcode = chkCode.split(",");
	if(arrcode[0]!=0){
		var zero = [0];
		arrcode = zero.concat(arrcode);
	}
	//����С��3˵��ѡ��Ϊ���ڵ�
	if(arrcode.length>2){
		for(var i=1;i<arrcode.length;i++){
			if(i+1 != arrcode.length -1){
				var node = jQuery("#_node"+arrcode[i]);
				if(node.length>0)
				myTree.openChildrenTable("img_"+arrcode[i],jQuery("#_node"+arrcode[i]),event);
			}else{
				var node = jQuery("#_node"+arrcode[i]);
				if(node.length>0)
				myTree.openChildrenTable("img_"+arrcode[i],jQuery("#_node"+arrcode[i]),event,arrcode[i+1]);
				break;
			}
		}
	}
	//չ������ѡ��ֵ��������
	setSelectObj(arrcode[arrcode.length-1]);
}
//����ѡ��ֵ�Ĵ���
function hadSelected(){
	var rows = parent.row;
	if(!rows)return;
	parent.selectObj.page = parent.page;
	for(var pro in rows){
		if(!rows[pro])continue;
		var pnode = rows[pro];
		var ppath = pnode.ppath;
		var pid = pnode.pid;
		parent.mulPath[pid] = pnode.path;
		parent.selectObj.data[pid]=pnode;
		var row = JQ("#testTable input[value="+pid+"]").parents("tr");
		var code = JQ(row).find("td:[_td_pro='code']").text();
		var name = JQ(row).find("td:[_td_pro='name']").text();
		if(checkCodeShowFlag("program")){
	    	parent.mulSelected[pid]= code+"-"+name+";";
	    }else{
	        parent.mulSelected[pid]= code+";";
	    }
    }
}
// ȫѡѡ��
function setAllMulSelected() {
	JQ("#testTable").find("tr input").each(function(){
		if (JQ(this).attr("id") == "_checkAll") return true;
		var _vid = JQ(this).attr("value");
		if (_vid != null)
			setMulSelectedObj(_vid)
	});
}
//��ѡѡ��ֵ
function setMulSelectedObj(vid){
	var pnode = myTree.getRowObjById(vid);
	var ppath = pnode.getAttribute('_node_path');
	var pid = pnode.id.replace(/\_node/g,"");
	var path = ppath.replace(/\_node/g,"")+","+vid+";";
	var chkflag = jQuery(pnode).find("INPUT:[type=checkbox]").attr("checked");
	parent.selectObj.data[vid]={"ppath":ppath,"pid":pid,"path":path};
	parent.selectObj.page[vid]=myTree.getCurrentPage();	//ҳ���¼
	if(!chkflag){
		parent.mulPath[vid] = "";
		parent.mulSelected[vid] = "";
		parent.selectObj.data[vid] = "";
		parent.selectObj.page[vid] = "";
		return;
	}
	parent.mulPath[vid] = path;
	if(checkCodeShowFlag("program")){
    	parent.mulSelected[vid]= jQuery(pnode).find("td:[_td_pro='code']").text()+"-"+jQuery(pnode).find("td:[_td_pro='name']").text()+";";
    }else{
        parent.mulSelected[vid]= jQuery(pnode).find("td:[_td_pro='name']").text()+";";
    }
}
//��ѡĬ��ֵѡ�н���Ӧ�Ľڵ�չ��
function selectMulDefault(){
	if(!parent.selvalue)return;
	var chkCode = parent.selvalue; //��ѡ���ӽڵ�id;
	var chkPath = chkCode.split(";");
	var topage = "";
	//�ҵ���һ����ѡ����������ҳ��
	for(var pr in parent.selectObj.page){
		if(parent.selectObj.page[pr]!=""){
			topage = parent.selectObj.page[pr];
			break;
		}		
	}
	var checkedCode = [];
	//ֻ��չ��
	for(var i = 0 ;i<chkPath.length;i++){
		if(chkPath[i].indexOf(",")>-1){
			var arrcode = chkPath[i].split(",");
			checkedCode.push(arrcode[arrcode.length-1]);
			//����С��3˵��ѡ��Ϊ���ڵ�
			if(arrcode.length>2){
				for(var j=1;j<arrcode.length-1;j++){
					var node = myTree.getRowObjById(arrcode[j]);
					if(!node)break;
					var isopen = node.getAttribute('_open');
					if(isopen == "false"){
						myTree.openChildrenTable("img_"+arrcode[j],jQuery("#_node"+arrcode[j]),event);
						var opennode = myTree.getRowObjById(arrcode[j]);
						opennode.setAttribute('_open','true');
					}
				}
			}
		}		
	}
	if(topage > 1 && !pageSuc){
		myTree._toPage("any",topage);
		pageSuc = true;
	}
	//��ѡ��ֵѡ��
	for(var j = 0 ;j<checkedCode.length;j++){
		jQuery("#_node"+checkedCode[j]).find("INPUT:[type='checkbox']").attr("checked",true);
	}
	
}

/**
 * �����鿴һ�����������
 */
function debugObjectInfo(obj){
	traceObject(obj);
	
	function traceObject(obj){ 
		var str = '';
		if(obj.tagName&&obj.name&&obj.id)
		str="<table border='1' width='100%'><tr><td colspan='2' bgcolor='#ffff99'>traceObject ����tag: &lt;"+obj.tagName+"&gt;���� name = \""+obj.name+"\" ����id = \""+obj.id+"\" </td></tr>"; 
		else{
			str="<table border='1' width='100%'>"; 
		}
		var key=[]; 
		for(var i in obj){ 
			key.push(i); 
		} 
		key.sort(); 
		for(var i=0;i<key.length;i++){ 
			var v= new String(obj[key[i]]).replace(/</g,"&lt;").replace(/>/g,"&gt;"); 
			if(typeof obj[key[i]]=='string'&&v!=null&&v!='')
				str+="<tr><td valign='top'>"+key[i]+"</td><td>"+v+"</td></tr>"; 
		} 
		str=str+"</table>"; 
		writeMsg(str); 
	} 
	function trace(v){ 
		var str="<table border='1' width='100%'><tr><td bgcolor='#ffff99'>"; 
		str+=String(v).replace(/</g,"&lt;").replace(/>/g,"&gt;"); 
		str+="</td></tr></table>"; 
		writeMsg(str); 
	} 
	function writeMsg(s){ 
		traceWin=window.open("","traceWindow","height=600, width=800,scrollbars=yes"); 
		traceWin.document.write(s); 
	} 
}

function showHtml()
{
	jQuery('#ans').text(jQuery('#newtableTree').html());
}

function setGridTreeDisabled(v){
	myTree.setDisabled(v);
}

function showChoosed()
{
	var ans = getAllCheckValue();
	if(ans!='')
		alert(ans);
	else
		alert('û��ѡ��');
}

function openAll()
{
	myTree.expandAll();
}

function closeAll()
{
	myTree.closeAll();
}