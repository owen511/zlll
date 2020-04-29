//��������ռ�
if(Ext.lt.overview==null){
    Ext.lt.overview={component:{}}
};
Ext.lt.overview.down=function(config,service){
var dt=null;
	var cols=[];
	var coltree=null;
	var col=[];
	var rs=new Ext.lt.recordset();
	rs.addData({});
	var yulanwin=null;
	var yulandt=null;
	
	function _buildButtons(div){
		var asSave=document.createElement("button");
		asSave.innerText="��������";
		div.appendChild(asSave);
		asSave.onclick=function(){window.location='./͸�ӱ�.xlsx'}
	}
	
	function _buildDatatable(div){
		dt=new Ext.lt.datatable(rs);
		
		col.push(dt.columns.seq);
		//col.push({alias:'A',datatype:'S',name:'A'});
		dt.setCols(col);
		/*********������ʽ*************/
		
		dt.headsort(false);
		dt.setAllowClock(false);
		dt.setClassName('dttheme_ifmis');
		dt.setMouselight('#CFF6FF');
		dt.mousedrag(false);
		dt.draw(div);
	}
	
	function _buildColumn(div){
		_buildColTree(div);
	}
	
	function _buildColTree(div){
		coltree=new Ext.lt.Qtree({
			data: config.cols,
			field:{id:'code',name:'name',code:'code',sid:'sid',level:'level',isleaf:'isleaf',datatype:"type"},
			outformartfn:function(ele){
				return ele.name+('N'==ele.type?"  �������У�":"");
			},
			selectmode:'n',
			viewmodel:'list',
			on:{'change':function(qtree){
				var nodes=qtree.getSelected();
				var _cols=[];
				_cols.push(dt.columns.seq);
				for(var i=0;i<nodes.length;i++){
					var node=nodes[i];
					_cols.push({alias:(i<9?'0':'')+(i+1)+" "+node.name,datatype:node.type,name:node.code});
				}
				dt.clearCols();
				dt.mergeColumn(0)
				dt.setCols(_cols);
				dt.redraw();
				
			}}
		});

		coltree.draw(div);
	}
	
	function removeCol(node){
		var div=document.getElementById("overview_modeconfig_cols_"+node.code);
		if(div==null)return false;
		div.parentNode.removeChild(div);
		coldata[div.id]=null;
		return true;
	}
	
	function _draw(div){
		var html=['<div class="overview_modeconfig_top" layout="{h:{fit:30},w:{fit:true}}"></div>'];
		html.push('<div layout="{h:{fit:-30},w:{fit:-310}}" style="float:left"></div>');
		html.push('<div class="overview_modeconfig_cols" layout="{h:{fit:-30},w:{fit:300}}" style="float:left"></div>');
		div.innerHTML=html.join('');
		_buildButtons(div.childNodes[0])
		_buildDatatable(div.childNodes[1])
		_buildColumn(div.childNodes[2])
		
	}
	var _modereport={};
	_modereport.draw=function(div){
		_draw(div);
		_modereport.el=div;
	}
	_modereport.resize=function(w,h){
		var div=this.el.childNodes[1];
		dt.resize(div.clientWidth,div.clientHeight);
	}
	return _modereport;
}