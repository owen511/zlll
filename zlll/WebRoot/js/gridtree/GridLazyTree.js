var myTree= new GridTree();
	
/**
 * 创建树方法
 * remake重建树标志 
 */
function getGridTree(remake)
{   
	var GridColumnType =  [
                  {
					header : '编码',
					headerIndex : 'code',
					//建议下面的宽带使用百分比,效果较好.
					headerCode :'',
					width:'50px'
				}, {
					header : '名称',
					headerIndex : 'name',
					headerCode :'',
					width:'50px'
				}, {
					header : '单位',
					headerIndex : 'bdgagency_name',
					headerCode :'bdgagency_code',
					width:'100px'
				},{
					header : '项目归类',
					headerIndex : 'type_name',
					headerCode :'type_code',
					width:'100px'
				}, {
					header : '处室',
					headerIndex : 'bdgmanagedivision_name',
					headerCode :'bdgmanagedivision_code',
					width:'50px'
				}];
	var url = ROOT_PATH+"/common/jump/list_program2.do";
	if(pars)url = url+pars;
	var content = {columnModel:GridColumnType,   
                        dataUrl:url,
                        lazyLoadUrl:url,
                        idColumn:'itemid',//id所在的列,一般是主键(不一定要显示出来)
                        parentColumn:'superitemid', //父亲列id
                        pageSize:20,
                        analyzeAtServer:true,//设置了dataUrl属性的时候，如果此属性是false表示分析树形结构在前台进行，默认是后台分析（仅支持java）,体现在json格式不用！
                        multiChooseMode:5,//选择模式，共有1，2，3，4，5种。
                      	tableId:'testTable',//表格树的id
                      	checkOption:ismutl,//1:出现单选按钮,2:出现多选按钮,其他:不出现选择按钮
                      	pageBar:true,//是否分页
                      	rowCount:true,
                      	remake:remake,//重新创建树
                      	hadValueCode:function(){
                      		if(parent.selvalue){
	                      		if(ismutl == 1){
	                      			//valuecode逗号分隔
	                      			//value中线分隔，用C标识是code查询
	                      			//alert(parent.selvalue);
	                      			if(parent.selvalue.indexOf("-")>-1){
	                      				var hadSelected = parent.selvalue.split("-");
	                      				return "C"+hadSelected[0];
	                      			}
	                      			else{
		                      			var hadSelected = parent.selvalue.split(",");
		                      			//直接选择带0，查询后选择不带0，标识N区分选择是一级节点还是子节点
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
                      		//单选选中赋值和多选选中赋值
                      		if(ismutl == 1){
                      			parent.itemid.value = instance.value; //为增加页面传递父节点 id
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
                      		//alert('懒加载执行完了..');
                      	},
                      	onSuccess:function(gt){   
                      		//alert('初次加载表格树执行完了..');
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
                      		//alert('翻页执行完了..');
                      		if(ismutl == 1){
                      			selectDefault();
                      		}else{
                      			selectMulDefault();
                      		}
                      	},
                      	lazy:true,//使用懒加载模式（此时打开全部，关闭全部功能不可使用）
                      	leafColumn:'isleaf',//用于判断节点是不是树叶
                        el:'tableTree'//要进行渲染的div id
           };
	myTree.loadData(content);
	myTree.makeTable();
}

var pageSuc = false; //自动翻页一次就不再翻页
//得到单选选中值
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

//单选默认值选中将对应的节点展开
function selectDefault(){
	if(!parent.selvalue)return;
	var chkCode = parent.selvalue; //被选中子节点id;
	var arrcode = chkCode.split(",");
	if(arrcode[0]!=0){
		var zero = [0];
		arrcode = zero.concat(arrcode);
	}
	//长度小于3说明选中为父节点
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
	//展开后将已选中值赋给变量
	setSelectObj(arrcode[arrcode.length-1]);
}
//已有选中值的处理
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
// 全选选中
function setAllMulSelected() {
	JQ("#testTable").find("tr input").each(function(){
		if (JQ(this).attr("id") == "_checkAll") return true;
		var _vid = JQ(this).attr("value");
		if (_vid != null)
			setMulSelectedObj(_vid)
	});
}
//多选选中值
function setMulSelectedObj(vid){
	var pnode = myTree.getRowObjById(vid);
	var ppath = pnode.getAttribute('_node_path');
	var pid = pnode.id.replace(/\_node/g,"");
	var path = ppath.replace(/\_node/g,"")+","+vid+";";
	var chkflag = jQuery(pnode).find("INPUT:[type=checkbox]").attr("checked");
	parent.selectObj.data[vid]={"ppath":ppath,"pid":pid,"path":path};
	parent.selectObj.page[vid]=myTree.getCurrentPage();	//页码记录
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
//多选默认值选中将对应的节点展开
function selectMulDefault(){
	if(!parent.selvalue)return;
	var chkCode = parent.selvalue; //被选中子节点id;
	var chkPath = chkCode.split(";");
	var topage = "";
	//找到第一个被选中数据所在页码
	for(var pr in parent.selectObj.page){
		if(parent.selectObj.page[pr]!=""){
			topage = parent.selectObj.page[pr];
			break;
		}		
	}
	var checkedCode = [];
	//只是展开
	for(var i = 0 ;i<chkPath.length;i++){
		if(chkPath[i].indexOf(",")>-1){
			var arrcode = chkPath[i].split(",");
			checkedCode.push(arrcode[arrcode.length-1]);
			//长度小于3说明选中为父节点
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
	//把选中值选中
	for(var j = 0 ;j<checkedCode.length;j++){
		jQuery("#_node"+checkedCode[j]).find("INPUT:[type='checkbox']").attr("checked",true);
	}
	
}

/**
 * 用来查看一个对象的属性
 */
function debugObjectInfo(obj){
	traceObject(obj);
	
	function traceObject(obj){ 
		var str = '';
		if(obj.tagName&&obj.name&&obj.id)
		str="<table border='1' width='100%'><tr><td colspan='2' bgcolor='#ffff99'>traceObject 　　tag: &lt;"+obj.tagName+"&gt;　　 name = \""+obj.name+"\" 　　id = \""+obj.id+"\" </td></tr>"; 
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
		alert('没有选择');
}

function openAll()
{
	myTree.expandAll();
}

function closeAll()
{
	myTree.closeAll();
}