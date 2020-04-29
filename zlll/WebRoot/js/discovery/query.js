//��չprototype������(����ɾ������ֵ)
/**
  *  ����:Array.removeAt(Index) 
  *  ����:ɾ������Ԫ��. 
  *  ����:Indexɾ��Ԫ�ص��±�. 
  *  ����:��ԭ�������޸����� 
  */ 
Array.prototype.removeAt=function(Index) 
 { 
  if(isNaN(Index)||Index>this.length){return false;} 
  for(var i=0,n=0;i<this.length;i++) 
  { 
   if(this[i]!=this[Index]) 
   { 
       this[n++]=this[i] 
   } 
  } 
  this.length-=1 
 } 

/**                            
  *  ����:Array.remove(obj)      
  *  ����:ɾ������Ԫ��.         
  *  ����:Ҫɾ���Ķ���.     
  *  ����:��ԭ�������޸�����    
  */                            
                                
 Array.prototype.remove=function(obj) 
 { 
  if(null==obj){return;} 
  for(var i=0,n=0;i<this.length;i++) 
  { 
   if(this[i]!=obj) 
   { 
    this[n++]=this[i]; 
   } 
  } 
  this.length-=1 
 } 

if(typeof(PATH_PREFIX)=="undefined"){
	var PATH_PREFIX ="";
}
//Ҫ�޸ĵ�ģ�����
var templateCodeForUpdate = null;
//��ʼ����������
var originalGatherColumns = new Array();
//�������������
//var gatherColumns = [{name:"�ʽ�����",sortNo:1,gatherColumnId:"fundtype20081"},{name:"֧�����ܷ���",sql:"select t.code, t.name, t.equalcode from DW_2008_T_PUBFUNC t where t.code like '2%' and t.equalcode is null and length(code)<=${LENGTH} order by t.code",menuCode:"query1",acctYear:2008,sortNo:2,glColumn:"EXPFUNC",gatherColumnId:"expfunc20081",codeFormat:"3-2-2"},{name:"֧�����÷���",sql:"select t.code, t.name, t.equalcode from DW_2008_T_PUBEXPECONORMIC t where t.equalcode is null and length(code)<=${LENGTH} order by t.code",menuCode:"query1",acctYear:2008,sortNo:3,glColumn:"EXPECONORMIC",gatherColumnId:"expeconormic20081",codeFormat:"3-2-2-2"},{name:"��ڴ���",sql:"SELECT t.code,t.name, t.equalcode FROM dw_2008_t_pubdepdivision t WHERE t.code <= 20 order by t.code",menuCode:"query1",acctYear:2008,sortNo:4,glColumn:"DEPARTMENTDIVISION",gatherColumnId:"departmentdivision20081"},{name:"������",sql:"select t.code, t.name, t.equalcode from dw_2008_t_pubbdgdivision t order by t.code",menuCode:"query1",acctYear:2008,sortNo:5,glColumn:"BDGMANAGEDIVISION",gatherColumnId:"bdgmanagedivision20081"},{name:"��λ",sql:"select t.code, t.name, t.equalcode from DW_2008_T_PUBAGENCY t where t.equalcode is null and length(code)<=${LENGTH} order by t.code",menuCode:"query1",acctYear:2008,sortNo:6,glColumn:"BDGAGENCY",gatherColumnId:"bdgagency20081",codeFormat:"3-3-3"},{name:"֧������ṹ",sql:"select t.code, t.name, t.equalcode from dw_2008_t_pubincomeexpmanage t where t.code<>'0' and t.equalcode is null order by t.code",menuCode:"query1",acctYear:2008,sortNo:7,glColumn:"incomeexpmanage",gatherColumnId:"incomeexpmanage20081"},{name:"�ĺ�",sql:"select t.code, t.name, t.equalcode from DW_2008_T_PUBBDGDOCNO t where t.code<>'0' and equalcode is null order by t.code",menuCode:"query1",acctYear:2008,sortNo:8,glColumn:"BDGDOCNO",gatherColumnId:"bdgdocno20081"},{name:"��Ŀ",sql:"select t.code, t.name, t.equalcode from dw_2008_t_pubprogram t where t.code<>'0' and t.equalcode is null order by t.code",menuCode:"query1",acctYear:2008,sortNo:9,glColumn:"PROGRAM",gatherColumnId:"program20081"},{name:"Ԥ����Դ",sql:"SELECT t.code,t.name, t.equalcode FROM DW_2008_T_PUBFUNDSOURCE t order by t.code",menuCode:"query1",acctYear:2008,sortNo:10,glColumn:"FUNDSOURCE",gatherColumnId:"fundsource20081"},{name:"�ĺ�ʱ��",sql:"select t.code, t.startdate as name, t.equalcode from DW_2008_T_PUBBDGDOCNO t where t.code<>'0' and equalcode is null order by t.code",menuCode:"query1",acctYear:2008,sortNo:11,glColumn:"BDGDOCNO",gatherColumnId:"bdgdocnotime20081"}];
var gatherColumns = new Array();
//��ʼͳ��������
var originalStatColumns = new Array();
//��ʼ��һͳ��������
var originalSingleStatColumns = new Array();
//�������������
var statColumns = new Array();
//��¼�����еķǶ����ʼֵ
var gatherColumnsTemp = new Array();
//��¼ͳ���еķǶ����ʼֵ
var statColumnsTemp = new Array();

//ͳ������ϸID;scdIdArrayΪ���浥��ͳ���е���ϸid;scdIdArrayAllΪ��ά����,ͨ����(ͳ����ID)ֵ(scdIdArray)������ͳ������ϸ��id
var scdIdArrayAll = new Array();
var scdTempColumnAll=new Array();
//ͳ������ϸѡ��״̬;scdCheckArrayΪ���浥��ͳ������ϸ��ѡ��״̬;scdCheckArrayAllΪ��ά����,ͨ����(ͳ����ID)ֵ(scdCheckArray)������ͳ������ϸ��ѡ��״̬
var scdCheckArrayAll = new Array();

//����ͳ������ϸ��������;hiddenStrArrayΪ���浥��ͳ������ϸ��������;scdMapΪ��ά����,ͨ����(ͳ����ID)ֵ(hiddenStrArray)������ͳ������ϸ��������
var scdMap = new Array();

//����ͳ���ж��������;ͳ���ж������������ԣ�statColumnName��scdObject������ͳ����Id
var statColumnObjectArrayAll = new Array();

//��������ͳ������ϸ��Ӧģ��
var templateArrayAll = new Array();

//��������ͳ������ϸ��ӦԤ��ֵ
var warningArrayAll = new Array();

//��������ж���
var calColumnObjectArrayAll = new Array();

//2009-04-09 yuanxin; ����������������ֵ������ģ���޸Ĺ�����
var templateCalArray = new Array();

//�ڼ���ͳ���еĸ߶�ʱ������״̬ʹͳ���еĸ߶��Ե�һ�εĸ߶�Ϊ׼
var flag01 = 0;

//����ȫ�ֱ����������ж���Id�����ڴ���ͳ�����г����������ϵļ�����ʱ���ڼ�����֮��ѡȡʱ����ǰһ�������ж�������ƺ͹�ʽֵ
var beforeCalColumnIdGloble = "";

//����ȫ�ֱ����������ж���Id�����ڴ����������г����������ϵĻ�����ʱ���ڻ�����֮��ѡȡʱ����ǰһ�������ж��������
var beforeGatherColumnIdGloble = "";

//����ȫ�ֱ�����ͳ������ϸId�����ڴ���ѡ��һ��ͳ������ϸʱ������Ѿ�ѡ�й�һ��ͳ������ϸ���͸ı�ǰһ��ͳ������ϸ�ı���ɫ
var beforeStatColumnDetailIdGloble = "";

//�ѻ����з���������
/*gatherColumns.add = function(i,obj){
	// ���������
	var p = 0;
	for(l=0;l<this.length;l++){
	    if(this[l].HTMLobject == obj){
	        p = 1;
	        if(l<i){
	            i--
	        }
	    }
	    this[l] = this[l+p]
	}
	this.length = this.length-p;


	var o = new Object();
	o.HTMLobject = obj;

	if(this.length <= i){
		this[i] = o;
	}
    else if(this[i] == null){
		this[i] = o;
	}
	else{
		for(p=this.length;p>i;p--){
			this[p] = this[p-1];
		}
		this[i] = o;
	}
	
}*/

gatherColumns.containHTMLobject = function(HTMLobject){
	for(i=0;i<this.length;i++){
		if(this[i].HTMLobject == HTMLobject){
			return i;
		}
	}
	return -1;
}

//��ʼ�������к�ͳ����
window.onload = function(){
	//��ȡ�����ж��󲢷���������
	var gathers = gatherpad.getElementsByTagName("P");
	//��ȡͳ���ж��󲢷���������
	var stats = statpad.getElementsByTagName("P");
	//��ȡ����ͳ���ж��󲢷���������
	var singleStats = singlestatpad.getElementsByTagName("P");
	//��ʼ��������

	for(var i=0;i<gathers.length;i++){
      //SongFP 090331 ���������Ϊ��ʾΪ"none",�򽫻����з���ͳ�Ʊ�������
        if(gathers[i].sortNumber != null){
		        //���û������϶��¼�
		        init_gathercolumn(gathers[i]);
		        //�Ѹ��������з����ʼ������������
            originalGatherColumns[i] = gathers[i];
            originalGatherColumns[i].style.display = "none";
        	
          var oCloneNode = gathers[i].cloneNode(true);
          oCloneNode.id = "clone" + gathers[i].id;
          init_gathercolumn(oCloneNode);
          gatherColumns[gathers[i].sortNumber]=oCloneNode;
          gatherColumns[gathers[i].sortNumber].style.display = "";
        }else {
		        //���û������϶��¼�
		        init_gathercolumn(gathers[i]);
		        //�Ѹ��������з����ʼ������������
            originalGatherColumns[i] = gathers[i];
        }
		//�Ѹ��������еĿ�¡���뱨�������������
		/*
		var oCloneNode = gathers[i].cloneNode(true);
		//�޸Ļ����ж����id�����ֳ�ʼ������
		oCloneNode.id = "clone" + gathers[i].id;
		init_gathercolumn(oCloneNode);
		gatherColumns[i] = oCloneNode;
		gatherColumns[i].style.display = "none";
		*/
	}
	//��ʼ��ͳ����
	for(var i=0;i<stats.length;i++){
        //SongFP 090331 ���ͳ����Ϊ��ʾΪ"none",��ͳ���з���ͳ�Ʊ�������
        if(stats[i].sortNumber != null){
		        //����ͳ�����϶��¼�
		        init_statcolumn(stats[i]);
		        //�Ѹ���ͳ���з����ʼͳ����������
            originalStatColumns[i] = stats[i];
            originalStatColumns[i].style.display = "none";
            
            findStatColumnDetail(stats[i].id);
            statColumnNameGlobal = stats[i].name;
            //�Ѹ���ͳ���еĿ�¡���뱨���ͳ��������
				    var oCloneNode1 = stats[i].cloneNode(true);
				    init_statcolumn(oCloneNode1);
				    statColumns[stats[i].sortNumber] = oCloneNode1;
				    statColumns[stats[i].sortNumber].style.display = "";
				    //���ƶ���ͳ���еı�ͷ��Ϣ
				    var regexp = /<!-- row end -->/g;
			      var statColumnHtml = statColumns[stats[i].sortNumber].html;
				    statColumnHtml = statColumnHtml.replace(regexp, "</tr> <tr>");
				    var statColumnHead = "<table height='100%' border='0' cellpadding='1' cellspacing='1' style='display:block;float:left;background-color:#CCCCCC;' id='headTable" + statColumns[statColumns.length - 1].id + "'><thead>"+
						             "<tr>"+statColumnHtml.substring(0,statColumnHtml.length-4)+
						            "</thead></table>";
			       statColumns[stats[i].sortNumber].innerHTML = statColumnHead;
        }else {
		        //����ͳ�����϶��¼�
		        init_statcolumn(stats[i]);
		        //�Ѹ���ͳ���з����ʼͳ����������
            originalStatColumns[i] = stats[i];
        }
  /*
		//�Ѹ���ͳ���еĿ�¡���뱨���ͳ��������
		var oCloneNode1 = stats[i].cloneNode(true);
		init_statcolumn(oCloneNode1);
		statColumns[i] = oCloneNode1;
		statColumns[i].style.display = "none";
		
	  //���ƶ���ͳ���еı�ͷ��Ϣ
   	var regexp = /<!-- row end -->/g;
   	var statColumnHtml = stats[i].html;
    statColumnHtml = statColumnHtml.replace(regexp, "</tr> <tr>");
    var statColumnHead = "<table height='100%' border='0' cellpadding='1' cellspacing='1' style='display:block;float:left;background-color:#CCCCCC;' id='headTable" + stats[i].id + "'><thead>"+
                    "<tr>"+
                    statColumnHtml.substring(0,statColumnHtml.length-4)+
                    "</thead></table>";
	   statColumns[i].innerHTML = statColumnHead;
	*/
	}
	//������ʼ��ͳ����
	for(var i = 0; i < singleStats.length; i++){    
		//�Ѹ���ͳ���еĿ�¡���뱨���ͳ�������� 
		  if(singleStats[i].sortNumber != null && Number(singleStats[i].isSingle) != 2){
		    //����ͳ�����϶��¼�
		    init_statcolumn(singleStats[i]);
		    //�Ѹ���ͳ���з����ʼͳ����������
        originalSingleStatColumns[i] = singleStats[i];
        originalSingleStatColumns[i].style.display = "none";

        findStatColumnDetail(singleStats[i].id);
        statColumnNameGlobal = singleStats[i].name;
		    var oCloneNode2 = singleStats[i].cloneNode(true);
		    init_statcolumn(oCloneNode2);
		    statColumns[singleStats[i].sortNumber] = oCloneNode2;
		    statColumns[singleStats[i].sortNumber].style.display = "";	
		   
		 //���Ƶ���ͳ���еı�ͷ��Ϣ
			 var regexp = /<!-- row end -->/g;
			 var statColumnHtml = singleStats[i].html;
			 statColumnHtml = statColumnHtml.replace(regexp, "</tr> <tr>");
			 var statColumnHead = "<table height='100%' border='0' cellpadding='1' cellspacing='1' style='display:block;float:left;background-color:#CCCFFF;' id='headTable" + statColumns[singleStats[i].sortNumber].id + "'><thead>"+
						                    "<tr>"+
						                    statColumnHtml.substring(0,statColumnHtml.length-4)+
						                    "</thead></table>";
			 statColumns[singleStats[i].sortNumber].innerHTML = statColumnHead;
		}else if(Number(singleStats[i].isSingle) == 2 && "001".localeCompare(singleStats[i].id) == 0){
		    //����ͳ�����϶��¼�
		    init_statcolumn(singleStats[i]);
		    //�Ѹ���ͳ���з����ʼͳ����������
        originalSingleStatColumns[i] = singleStats[i];
        originalSingleStatColumns[i].style.display = "";
        
		    for(var k = 0; k < templateCalArray.length; k++){
		        var oCloneNode2 = singleStats[i].cloneNode(true);
		        oCloneNode2.id = templateCalArray[k].statColumnId;
		        oCloneNode2.className = "pclone";
		        oCloneNode2.sql=templateCalArray[k].sql;
		        init_statcolumn(oCloneNode2);
		        statColumns[templateCalArray[k].sortNumber] = oCloneNode2;
		        statColumns[templateCalArray[k].sortNumber].style.display = "";	
		        //���Ƶ���ͳ���еı�ͷ��Ϣ
			      var regexp = /<!-- row end -->/g;
	          //�������е�html������ݣ�ʹ֮��ͳ���г�����
		        var html = '<th nowrap="nowrap" >'+templateCalArray[k].name+'</th><!-- row end -->';	
			     var statColumnHtml = html;
			     statColumnHtml = statColumnHtml.replace(regexp, "</tr> <tr>");
			     var statColumnHead = "<table height='100%' border='0' cellpadding='1' cellspacing='1' style='display:block;float:left;background-color:#CCCCCC;' id='headTable" + (Number(singleStats[i].id) + statColumns.length) + "'><thead>"+
						                    "<tr>"+
						                    statColumnHtml.substring(0,statColumnHtml.length-4)+
						                    "</thead></table>";
			    statColumns[templateCalArray[k].sortNumber].innerHTML = statColumnHead;
		    }         
		               
		 
		 }else {
		    //����ͳ�����϶��¼�
		    init_statcolumn(singleStats[i]);
		    //�Ѹ���ͳ���з����ʼͳ����������
        originalSingleStatColumns[i] = singleStats[i];
		 }

		
  /*    
		//������������У������в���ģ��ͳ�����г�ʼ��
		if (Number(singleStats[i].isSingle) != 2){
				//�Ѹ���ͳ���еĿ�¡���뱨���ͳ��������
				var oCloneNode2 = singleStats[i].cloneNode(true);
				init_statcolumn(oCloneNode2);
				statColumns[stats.length + i] = oCloneNode2;
				statColumns[stats.length + i].style.display = "none";				
			  //���Ƶ���ͳ���еı�ͷ��Ϣ
		   	var regexp = /<!-- row end -->/g;
		   	//�������е�html������ݣ�ʹ֮��ͳ���г�����
		   	if (Number(singleStats[i].isSingle) == 2){
		   	    singleStats[i].html = '<th nowrap="nowrap" >������</th><!-- row end -->';	
		   	}
		   	var statColumnHtml = singleStats[i].html;
		    statColumnHtml = statColumnHtml.replace(regexp, "</tr> <tr>");
		    var statColumnHead = "<table height='100%' border='0' cellpadding='1' cellspacing='1' style='display:block;float:left;background-color:#CCCCCC;' id='headTable" + singleStats[i].id + "'><thead>"+
		                    "<tr>"+
		                    statColumnHtml.substring(0,statColumnHtml.length-4)+
		                    "</thead></table>";
			   statColumns[stats.length + i].innerHTML = statColumnHead;
		}	
	*/	
	}
	//���ƶ���ͳ���еı�ͷ��Ϣ
	/*for (var i = 0; i < stats.length; i++){
   		var regexp = /<!-- row end -->/g;
   		var statColumnHtml = stats[i].html;
    	statColumnHtml = statColumnHtml.replace(regexp, "</tr> <tr>");
    	statColumnHead = "<table height='100%' border='0' cellpadding='1' cellspacing='1' style='display:block;float:left;background-color:#CCCCCC;' id='headTable" + stats[i].id + "'><thead>"+
                     "<tr>"+
                     statColumnHtml.substring(0,statColumnHtml.length-4)+
                     "</thead></table>";
	    statColumns[i].innerHTML = statColumnHead;
	}*/
//ˢ�³�ʼ��������������
	refresh_originalquerygathercolumns(gatherpad);
	//ˢ�±����������������
	refresh_querygathercolumns(querygathercolumns);
	//ˢ�³�ʼͳ������������
	refresh_originalquerystatcolumns(statpad);
	//ˢ�³�ʼ��һͳ������������
	refresh_originalsinglequerystatcolumns(singlestatpad);
	//ˢ�±���ͳ������������
	refresh_querystatcolumns(querystatcolumns);
	//��ʼ�������������������
	//init_querygathercolumns(querygathercolumns);
	//��ʼ����ʼ��������������
	//init_originalquerygathercolumns(gatherpad);
}

// ���û������϶��¼�
function init_gathercolumn(gathercolumn){
	gathercolumn.onselectstart = function(){return false;};
	gathercolumn.onmousedown = function(){
		gatherFollowMouse(this);
	};
	gathercolumn.release = function(){
		var p = releaseMouse(this);
		//�ѻ����дӳ�ʼ���ϵ�������
		if(hasContain(p.x,p.y,querygathercolumns)){
			//�ѳ�ʼ�����������еĻ�����׷�ӵ����������������
			//�������ж������仯ʱ����̬����ǰһ�������ж��������
			if (beforeGatherColumnIdGloble){
		      for (var i = 0; i < gatherColumns.length; i++){
		          if (gatherColumns[i].id.localeCompare(beforeGatherColumnIdGloble) == 0){
					        gatherColumns[i].name = document.getElementById("gatherColumnName").value;	
		          }	
		      }
			}
			
			for (var i = 0; i < gatherColumns.length; i++){
				if (gatherColumns[i].innerHTML == gathercolumn.innerHTML){
					gatherColumns[i].style.display = "";	
					//���õ�ǰ�����е�id
					beforeGatherColumnIdGloble = gatherColumns[i].id;
				}
			}
			//�Ѵӳ�ʼ�����������Ϸŵ��������������Ļ���������
			for (var i = 0; i < originalGatherColumns.length; i++){
			   if (originalGatherColumns[i].innerHTML == gathercolumn.innerHTML){
				   originalGatherColumns[i].style.display = "none";
			    }
			}
			//�ѻ�������ӵ������������������(���û����в�����ʱ��������)
			var tempTag = 0;
			for (var i = 0; i < gatherColumns.length; i++){
			    if (gatherColumns[i].id.localeCompare(gathercolumn.id) == 0){
			        tempTag = 1;
			        break;
			   }	
			}
			//��������в��������ظ�ֵ
			if (tempTag == 0){
		      var oCloneNode = gathercolumn.cloneNode(true);
		      //�޸Ļ����ж����id�����ֳ�ʼ������
		      oCloneNode.id = "clone" + gathercolumn.id;
		      init_gathercolumn(oCloneNode);
		      gatherColumns[gatherColumns.length] = oCloneNode;
		      gatherColumns[gatherColumns.length - 1].style.display = "";
			}
		
			sortGatherColumn(this,p.x,p.y);
			//querygathercolumns.addGatherColumn(this,p.x,p.y);
		}
	    //ˢ�±����������������
	    refresh_querygathercolumns(querygathercolumns);

		//�ѻ����дӱ������ϵ���ʼ��
		if(hasContain(p.x,p.y,gatherpad)){
			//�ѱ�������������еĻ�����׷�ӵ���ʼ������������
			for (var i = 0; i < originalGatherColumns.length; i++){
				if (originalGatherColumns[i].innerHTML == gathercolumn.innerHTML){
					originalGatherColumns[i].style.display = "";	
				}	
			}
			//�Ѵӱ���������������Ϸŵ���ʼ�����������еĻ����дӱ��������������ɾ��
			for (var i = 0; i< gatherColumns.length; i++){
				if (gatherColumns[i].innerHTML == gathercolumn.innerHTML){
					//gatherColumns[i].style.display = "none";	
				  gatherColumns.removeAt(i);
				  gathercolumn.removeNode(true);					
				}	
			}
			//gatherpad.addGatherColumn(this,p.x,p.y);
			//֮��Ѹû����е����������������
			document.getElementById("gatherColumnProperties").style.display = "none";
		}
		//ˢ�³�ʼ��������������
	    refresh_originalquerygathercolumns(gatherpad);
	};
}
// ����ͳ�����϶��¼�
function init_statcolumn(statcolumn){
	//songfupeng 20100118 ����һ����ʾͳ������ʽ��div
	var statcolumnTableObj= document.createElement("<div>");
	statcolumn.onselectstart = function(){return false;};
	statcolumn.onmousedown = function(){
		statFollowMouse(this);
		statcolumnTableObj.removeNode(true);
	};
	//songfupeng 20100119 �����в��Ӵ��¼�
	if(!(statcolumn.id=="001")){
			//songfupeng 20100118 ��������ƶ��¼�����������ƶ���ĳ��ͳ���б�ǩʱ����ʾ������ʽ
			statcolumn.onmouseover = function(){
				//���Ƶ���ͳ���еı�ͷ��Ϣ
				var regexp = /<!-- row end -->/g;
				var statColumnHtml = statcolumn.html;
				statColumnHtml = statColumnHtml.replace(regexp, "</tr> <tr>");
				var statColumnHead = "<table  height='5%' border='0' cellpadding='1' cellspacing='1' style='border:1px #83A7DB solid;display:block;float:left;background-color:#CCCCCC;' id='headTable" + (statcolumn.id + statColumns.length) + "'>"+
								"<tr style='color:#FFFFFF;'>"+
								statColumnHtml.substring(0,statColumnHtml.length-4)+
								"</table>";
				statcolumnTableObj.innerHTML=statColumnHead;
				//songfupeng 20100119��������ʾ����Ĵ�С
				statcolumnTableObj.style.top="200px";
				statcolumnTableObj.style.left="2px";
				statcolumnTableObj.style.width="635px";
				statcolumnTableObj.style.height="90px";
				//statcolumnTableObj.style.overflow="auto";
				statcolumnTableObj.style.zIndex=1;
				statcolumnTableObj.style.position="absolute";
				var statpadbuttonDiv=document.getElementById("labelsDiv");
				statpadbuttonDiv.appendChild(statcolumnTableObj);
				//songfupeng 20100119 ������ڵ����ֻ��ɰ�ɫ ��ʼ
				var tableObj=document.getElementById("headTable"+statcolumn.id + statColumns.length);
				var tarbleRows=tableObj.rows;
				for(var row=0;row<tarbleRows.length;row++){
					tarbleRows[row].className="statecolumnBackColour";
					var tarbleCells=tarbleRows[row].cells;
					for(var cell=0;cell<tarbleCells.length;cell++){
						tarbleCells[cell].className="statecolumnBackColour";
					}
				}

			   //songfupeng 20100119 ������ڵ����ֻ��ɰ�ɫ ����
			}
		statcolumn.onmouseout = function(){
			//songfupeng 20100119 ɾ������ƶ���ͳ���б�ǩ����ʾ��ʽ���¼�
			statcolumnTableObj.removeNode(true);
		}
	}
	
	statcolumn.release = function(){
		var p = releaseMouse(this);
		//��ͳ���дӳ�ʼ���ϵ�������
		if(hasContain(p.x,p.y,querystatcolumns)){
			  //2��ʾ������
			  if (Number(statcolumn.isSingle) == 2){
			  	  //�������ж������仯ʱ����̬����ǰһ�������ж�������ƺ͹�ʽֵ
			  	  if (beforeCalColumnIdGloble && calColumnObjectArrayAll[beforeCalColumnIdGloble]){
						    calColumnObjectArrayAll[beforeCalColumnIdGloble].name = document.getElementById("calculateStatName").value;
							  calColumnObjectArrayAll[beforeCalColumnIdGloble].calculate = document.getElementById("formulaValue").value;
			  	  }
			  	  if ("001".localeCompare(statcolumn.id) == 0){
							     //�ڱ���ͳ��������̬���������ж���
								//�Ѹ���ͳ���еĿ�¡���뱨���ͳ��������
								var oCloneNode2 = statcolumn.cloneNode(true);
								oCloneNode2.id = Math.random();
								oCloneNode2.className = "pclone";
								init_statcolumn(oCloneNode2);
								statColumns[statColumns.length] = oCloneNode2;
								statColumns[statColumns.length - 1].style.display = "";		
									
							  //���Ƶ���ͳ���еı�ͷ��Ϣ
						   	var regexp = /<!-- row end -->/g;
						   	statColumns[statColumns.length - 1].className="statecolumnBackColour";
						   	//�������е�html������ݣ�ʹ֮��ͳ���г�����
						   	if (Number(statcolumn.isSingle) == 2){
						   	    statcolumn.html = '<th nowrap="nowrap" ><font color="#FFFFFF" >������</font></th><!-- row end -->';	
						   	}
						   	var statColumnHtml = statcolumn.html;
						    statColumnHtml = statColumnHtml.replace(regexp, "</tr> <tr>");
						    var statColumnHead = "<table  height='100%' border='0' cellpadding='1' cellspacing='1' style='display:block;float:left;background-color:#095CBC;' id='headTable" + (Number(statcolumn.id) + statColumns.length) + "'><thead>"+
						                    "<tr>"+
						                    statColumnHtml.substring(0,statColumnHtml.length-4)+
						                    "</thead></table>";
							  statColumns[statColumns.length - 1].innerHTML = statColumnHead
							  	
							  //��������ж���
							  var calColumnObject = new Object();
							  
							  //�����ж���Id
							  calColumnObject.statColumnId = oCloneNode2.id;
							  //����ȫ�ֱ����������ж���Id�����ڴ���ͳ�����г����������ϵļ�����ʱ���ڼ�����֮��ѡȡʱ����ǰһ�������ж�������ƺ͹�ʽֵ
							  beforeCalColumnIdGloble = oCloneNode2.id;
							  //�����ж�������
							  calColumnObject.name = "������";
							  //���������������¸�ֵ
							  document.getElementById("calculateStatName").value = calColumnObject.name;
							  //�����ж���ʽ
							  calColumnObject.calculate = "";
							  //�ֶ�����;Ĭ��Ϊ������(c)
							  calColumnObject.columnType = "c";
							  //��ʽ�����б��ָ�Ĭ��ֵ����Ӧ��עҲ�ָ�Ĭ��ֵ
							  //songfupeng 20090807 ����ʱ����
							  /*
								document.getElementById("formulaDiv").innerHTML = "��ʽ��"
								+ "<select name='��ʽ' size='1' id='formula' onchange='viewNotes();'>"
								+ "<option selected='selected' >��ѡ��...</option>"
					      + "<option value='�ú������㹫ʽΪ��һ�еķ���ֵ+augment- decrease������groupby�е�ֵ����һ�в�ͬʱֱ�ӷ���0'>��̬�����(DYNAMICBALANCE(augment��decrease��groupby))</option>"
					      + "<option value='FUNDTYPEΪҪ�ر���'>��(${FUNDTYPE})</option>"
					      + "</select>";
					      */	
								document.getElementById("notes").innerHTML = "";
							  //�Լ����ж���ʽ���¸�ֵ
								document.getElementById("formulaValue").value = calColumnObject.calculate;
							  calColumnObjectArrayAll[oCloneNode2.id] = calColumnObject;
							  //ʹ��ͳ����ID����ʶ���������ԣ����ƺ͹�ʽ������
							  document.getElementById("calculateStatName").statColumnId = oCloneNode2.id;
							  document.getElementById("formulaValue").statColumnId = oCloneNode2.id;
							  
							  //songfupeng 20090807 �������϶�������ʱ����initNum����Ϊ0-��ʼֵ
							  initNum=0;
							  //songfupeng 20090807 �������϶�������ʱ����totalformulStatus����Ϊ0-��ʼֵ
							  totalformulStatus=0;
							   //songfupeng 20090807 �������϶�������ʱ����formulaValue����Ϊ""
							  formulaValue="";
			  	  }else {
							  //��̬�޸ļ���������ֵ�����ƺ͹�ʽ��
							  for (var key in calColumnObjectArrayAll){
							  	  //����ProtoType����
							  	  if (calColumnObjectArrayAll[key].statColumnId){
									      if (calColumnObjectArrayAll[key].statColumnId.localeCompare(statcolumn.id) == 0){
							              //����ȫ�ֱ����������ж���Id�����ڴ���ͳ�����г����������ϵļ�����ʱ���ڼ�����֮��ѡȡʱ����ǰһ�������ж�������ƺ͹�ʽֵ
							              beforeCalColumnIdGloble = statcolumn.id;
									          document.getElementById("calculateStatName").value = calColumnObjectArrayAll[key].name;
									          document.getElementById("formulaValue").value = calColumnObjectArrayAll[key].calculate;
									          //��̬�ı乫ʽ�����б��ѡ���Լ���Ӧѡ���ע��ֵ
														//��̬�����
														if (document.getElementById("formulaValue").value.indexOf("DYNAMICBALANCE") > -1){
															  document.getElementById("formulaDiv").innerHTML = "��ʽ��"
															  + "<select name='��ʽ' size='1' id='formula' onchange='viewNotes();'>"
															  + "<option>��ѡ��...</option>"
					                      + "<option selected='selected' value='�ú������㹫ʽΪ��һ�еķ���ֵ+augment- decrease������groupby�е�ֵ����һ�в�ͬʱֱ�ӷ���0'>��̬�����(DYNAMICBALANCE(augment��decrease��groupby))</option>"
					                      + "<option value='FUNDTYPEΪҪ�ر���'>��(${FUNDTYPE})</option>"
					                      + "</select>";	
														    var notes = document.getElementById("formula").value;
														    document.getElementById("notes").innerHTML = notes;
														//��
														}else if (document.getElementById("formulaValue").value.indexOf("(${") > -1){
															  document.getElementById("formulaDiv").innerHTML = "��ʽ��"
															  + "<select name='��ʽ' size='1' id='formula' onchange='viewNotes();'>"
															  + "<option>��ѡ��...</option>"
					                      + "<option value='�ú������㹫ʽΪ��һ�еķ���ֵ+augment- decrease������groupby�е�ֵ����һ�в�ͬʱֱ�ӷ���0'>��̬�����(DYNAMICBALANCE(augment��decrease��groupby))</option>"
					                      + "<option selected='selected' value='FUNDTYPEΪҪ�ر���'>��(${FUNDTYPE})</option>"
					                      + "</select>";	
														    var notes = document.getElementById("formula").value;
														    document.getElementById("notes").innerHTML = notes;
														}else {
														 //songfupeng 20090807 ����ʱ����
														/*
															  document.getElementById("formulaDiv").innerHTML = "��ʽ��"
															  + "<select name='��ʽ' size='1' id='formula' onchange='viewNotes();'>"
															  + "<option selected='selected' >��ѡ��...</option>"
					                      + "<option value='�ú������㹫ʽΪ��һ�еķ���ֵ+augment- decrease������groupby�е�ֵ����һ�в�ͬʱֱ�ӷ���0'>��̬�����(DYNAMICBALANCE(augment��decrease��groupby))</option>"
					                      + "<option value='FUNDTYPEΪҪ�ر���'>��(${FUNDTYPE})</option>"
					                      + "</select>";	
														    document.getElementById("notes").innerHTML = "";
														    */
														}
									      }	
							  	  }
					  	  }
					   
					  }					   
			  }else {
						//��ͳ������ӵ�����ͳ������������(����ͳ���в�����ʱ��������)
						var tempTag = 0;
						for (var i = 0; i < statColumns.length; i++){
						    if (statColumns[i].id.localeCompare(statcolumn.id) == 0){
						        tempTag = 1;
						        break;
						   }	
						}
						//����ͳ���в��������ظ�ֵ
						if(tempTag == 0){
								//�Ѹ���ͳ���еĿ�¡���뱨���ͳ��������
								var oCloneNode1 = statcolumn.cloneNode(true);
								init_statcolumn(oCloneNode1);
								statColumns[statColumns.length] = oCloneNode1;
								statColumns[statColumns.length - 1].style.display = "";
								
							  //���ƶ���ͳ���еı�ͷ��Ϣ
						    	var regexp = /<!-- row end -->/g;
						    	var statColumnHtml = statColumns[statColumns.length - 1].html;
						        statColumnHtml = statColumnHtml.replace(regexp, "</tr> <tr>");
						        var statColumnHead = "<table height='100%' border='0' cellpadding='1' cellspacing='1' style='display:block;float:left;background-color:#CCCCCC;' id='headTable" + statColumns[statColumns.length - 1].id + "'><thead>"+
						                    "<tr id=\"tr1\">"+
						                    statColumnHtml.substring(0,statColumnHtml.length-4)+
						                    "</thead></table>";
							    statColumns[statColumns.length - 1].innerHTML = statColumnHead;
							    //2009-04-23 yuanxin;��ʼ�������������У������ͳ���дӳ�ʼ���϶������������ܰ�div���������
							    refresh_querystatcolumns(querystatcolumns);
						}
			  }
			//��̬���ӱ���ͳ�������ڲ�div�Ŀ��
			//alert(statcolumn.offsetWidth);
			//alert(aa.offsetWidth);
			//querystatcolumns.style.width  = statcolumn.offsetWidth + "px";
			//�ѳ�ʼͳ���������е�ͳ����׷�ӵ�����ͳ����������
			//alert("before");
			for (var i = 0; i < statColumns.length; i++){
				if (statColumns[i].id == statcolumn.id){
					statColumns[i].style.display = "";	
					//��̬����ͳ���еĸ߶ȺͿ��
					var childsss = statColumns[i].children[0].children;
					if (flag01 == 0){
						statColumns[i].children[0].style.lineHeight = childsss[0].offsetHeight + "px";
						statColumns[i].children[0].style.width = childsss[0].offsetWidth + "px";
						//alert("ok");
						flag01 = 1;
					}
					
				}
			}
			//alert("end");
			//�Ѵӳ�ʼͳ���������Ϸŵ�����ͳ���������ͳ��������
			for (var i = 0; i < originalStatColumns.length; i++){
			   if (originalStatColumns[i].id == statcolumn.id){
				   originalStatColumns[i].style.display = "none";
			    }
			}
			//�Ѵӳ�ʼ����ͳ���������Ϸŵ�����ͳ���������ͳ��������
			for (var i = 0; i < originalSingleStatColumns.length; i++){
			   if (originalSingleStatColumns[i].id == statcolumn.id){
			       //�ж��Ǽ����л�����ͨ����ͳ����
			       if (Number(originalSingleStatColumns[i].isSingle) == 2){
				         originalSingleStatColumns[i].style.display = "";
			       }else {
				         originalSingleStatColumns[i].style.display = "none";
			       }
			    }
			}
			//��������ͳ��������
			sortStatColumn(this,p.x,p.y);
			
			//querygathercolumns.addGatherColumn(this,p.x,p.y);
			
		}
	    //ˢ�±���ͳ������������
	    refresh_querystatcolumns(querystatcolumns);

		//��ͳ���дӱ������ϵ���ʼ��
		if(hasContain(p.x,p.y,statpad) && Number(statcolumn.isSingle) == 0){
		
			//�ѱ���ͳ���������е�ͳ����׷�ӵ���ʼͳ����������
			for (var i = 0; i < originalStatColumns.length; i++){
				if (originalStatColumns[i].id == statcolumn.id){
					originalStatColumns[i].style.display = "";
					//songfupeng 20100120 �����ϻص���ʼͳ�������󣬱��϶���ͳ���б�ǩ����Ӵֺ���б
					originalStatColumns[i].style.fontWeight = "bold";	
					originalStatColumns[i].style.fontStyle="italic";
				}	
			}
			//�Ѵӱ���ͳ�����������Ϸŵ���ʼͳ���������е�ͳ���дӱ���ͳ����������ɾ��
			for (var i = 0; i< statColumns.length; i++){
				if (statColumns[i].id == statcolumn.id){
				  //statColumns[i].style.display = "none";	
				  statColumns.removeAt(i);
				  statcolumn.removeNode(true);					
				}	
			}
			//gatherpad.addGatherColumn(this,p.x,p.y);
			//��ͳ���б�����ʱ���������������ͳ���е���ϸ��Ϣ
			if (scdIdArrayAll[statcolumn.id]){
			    scdIdArrayAll[statcolumn.id] = null;
			    scdCheckArrayAll[statcolumn.id] = null;
		      scdTempColumnAll[statcolumn.id]=null;
			    scdMap[statcolumn.id] = null;
			    var scdIdArrayAllTem = new Array();
			    var scdCheckArrayAllTem = new Array();
			    var scdTempColumnAllTem = new Array();
			    var scdMapTem = new Array();
			    //ɾ��ͳ������ϸ��Ϣ
			    for (var key in scdIdArrayAll){
			    	  if (scdIdArrayAll[key] != null){
			    	  	  scdIdArrayAllTem[key] = scdIdArrayAll[key];
			    	  	  scdCheckArrayAllTem[key] = scdCheckArrayAll[key];
			    	  	  scdTempColumnAllTem[key] = scdTempColumnAll[key];
			    	  	  scdMapTem[key] = scdMap[key];
			    	  }
			    }
			    scdIdArrayAll = scdIdArrayAllTem;
			    scdCheckArrayAll = scdCheckArrayAllTem;
			    scdTempColumnAll = scdTempColumnAllTem;
			    scdMap = scdMapTem;
			}
			//֮��Ѹ�ͳ���е����������������
			document.getElementById("statColumnProperties").style.display = "none";
		}
		//ˢ�³�ʼͳ������������
	    refresh_originalquerystatcolumns(statpad);
		//��ͳ���дӱ������ϵ�����ͳ���г�ʼ��(����ͳ����)
		if(hasContain(p.x,p.y,singlestatpad) && (Number(statcolumn.isSingle) == 1 || Number(statcolumn.isSingle) == 2)){
			//�ѱ���ͳ���������е�ͳ����׷�ӵ���ʼ����ͳ����������
			for (var i = 0; i < originalSingleStatColumns.length; i++){
				if (originalSingleStatColumns[i].id == statcolumn.id){
					originalSingleStatColumns[i].style.display = "";
					//songfupeng 20100120 �����ϻص���ʼͳ�������󣬱��϶���ͳ���б�ǩ����Ӵֺ���б
					originalSingleStatColumns[i].style.fontWeight = "bold";	
					originalSingleStatColumns[i].style.fontStyle="italic";
				}	
			}
			//�Ѵӱ���ͳ�����������Ϸŵ���ʼͳ���������е�ͳ���дӱ���ͳ����������ɾ��������ͳ���У�
			for (var i = 0; i< statColumns.length; i++){
				if (statColumns[i].id == statcolumn.id){
					//statColumns[i].style.display = "none";	
				  statColumns.removeAt(i);
				  statcolumn.removeNode(true);					
				}	
			}
			//gatherpad.addGatherColumn(this,p.x,p.y);
			//��ͳ���б�����ʱ���������������ͳ���е���ϸ��Ϣ
			//scdIdArrayAll[statColumnIdGlobal] = null;
			//scdCheckArrayAll[statColumnIdGlobal] = null;
			//scdMap[statColumnIdGlobal] = null;
			
			//��ͳ���б�����ʱ���������������ͳ���е���ϸ��Ϣ
			if (scdIdArrayAll[statcolumn.id] || calColumnObjectArrayAll[statcolumn.id]){
			    //2009-04-10 yuanxin;�����ж�����Ϣ
			    if (Number(statcolumn.isSingle) == 2){
			        calColumnObjectArrayAll[statcolumn.id] = null;
			        var calColumnObjectArrayAllTem = new Array();
					    //ɾ��ͳ������ϸ��Ϣ
					    for (var key in calColumnObjectArrayAll){
					    	  if (calColumnObjectArrayAll[key] != null){
					    	  	  calColumnObjectArrayAllTem[key]	= calColumnObjectArrayAll[key];
					    	  }
					    }
			        calColumnObjectArrayAll = calColumnObjectArrayAllTem;	
			    }else {
					    scdIdArrayAll[statcolumn.id] = null;
					    scdCheckArrayAll[statcolumn.id] = null;
				      scdTempColumnAll[statcolumn.id]=null;
					    scdMap[statcolumn.id] = null;
					    var scdIdArrayAllTem = new Array();
					    var scdCheckArrayAllTem = new Array();
					    var scdTempColumnAllTem = new Array();
					    var scdMapTem = new Array();
					    //ɾ��ͳ������ϸ��Ϣ
					    for (var key in scdIdArrayAll){
					    	  if (scdIdArrayAll[key] != null){
					    	  	  scdIdArrayAllTem[key] = scdIdArrayAll[key];
					    	  	  scdCheckArrayAllTem[key] = scdCheckArrayAll[key];
					    	  	  scdTempColumnAllTem[key] = scdTempColumnAll[key];
					    	  	  scdMapTem[key] = scdMap[key];
					    	  }
					    }
					    scdIdArrayAll = scdIdArrayAllTem;
					    scdCheckArrayAll = scdCheckArrayAllTem;
					    scdTempColumnAll = scdTempColumnAllTem;
					    scdMap = scdMapTem;
			    }
			}
			
			if (Number(statcolumn.isSingle) == 2){
					//֮��Ѹü����е����������������
					document.getElementById("calculateStatColumnProperties").style.display = "none";
			}else {
					//֮��Ѹõ���ͳ���е����������������
					document.getElementById("statColumnProperties").style.display = "none";
			}
		}
		//ˢ�³�ʼ��һͳ������������
		refresh_originalsinglequerystatcolumns(singlestatpad);
	}
}

// ���û����ж����������ƶ�
function gatherFollowMouse(objP){
	//2009-03-05 yuanxin;�������Ҳ�����������仯ʱ����̬��������ж����λ��
	// ��ԭλ����ʾ���߿�
	objP.placeholder = showPlaceholder(objP);
	var obj = objP.cloneNode(true);
	obj.className="pclone";
	obj.srcobj = objP;
	objP.style.display = "none";
	//�ѿ�¡����׷�ӵ������ĩβ
	document.body.appendChild(obj);

	var followObj = obj;
	_x = event.offsetX;
	_y = event.offsetY;
	obj.style.position = "absolute";
	obj.style.left = event.clientX-_x + document.documentElement.scrollLeft;
	obj.style.top = event.clientY-_y +document.documentElement.scrollTop;
	obj.style.zIndex = 1000;
	//window.status = event.x + ":" + event.y;

	//alert(obj.style.left);
		//alert(obj.style.top);
		//alert(document.body.scrollHeight);

	
	//��������λ���ڱ�������л�ͳ�����в���һ�����߿�
	/*for (var i = 0; i < gatherColumns.length; i++){
		//debugger;
		if (hasContain(event.x,(event.y+gatherColumns[i].offsetHeight/2),gatherColumns[i])){
			alert("ok");
			var odiv = gatherColumns[i].cloneNode();
			//odiv.style.height = obj.style.height + 20px;
			odiv.style.background = "";
			odiv.style.border = "1px dashed #FF0000";
			obj.insertAdjacentElement("BeforeBegin",odiv);
		}
	}*/

	obj.setCapture();
	obj.onmouseup = function(){
		obj.srcobj.release();
		this.removeNode(true);
		//����������ʱ����ʾ����������,ͬʱ����ͳ�������Ժ͵���ͳ��������
		//��������x��y���������
		var absoluteX = event.clientX + document.documentElement.scrollLeft;
		var absoluteY = event.clientY + document.documentElement.scrollTop
		if (hasContain(absoluteX,absoluteY,querygathercolumns)){
			seniorQueryForm.gatherColumnProperties.style.display="";
			document.getElementById("gatherpad").style.display="";
			document.getElementById("gatherpadbutton").className='selected';
			seniorQueryForm.statColumnProperties.style.display="none";
			document.getElementById("statpad").style.display="none";
			document.getElementById("statpadbutton").className='';
			seniorQueryForm.singleStatColumnProperties.style.display="none";
			document.getElementById("singlestatpad").style.display="none";
			document.getElementById("singlestatpadbutton").className='';
			seniorQueryForm.calculateStatColumnProperties.style.display="none";
			document.getElementById("singlestatpad").style.display="none";
			document.getElementById("singlestatpadbutton").className='';
			document.getElementById("conditionpad").style.display="none";
			document.getElementById("conditionpadbutton").className='';
			document.getElementById("conditionvaluepad").style.display="none";
			document.getElementById("conditionvaluepadbutton").className='';
			//��̬�������е����Ը�ֵ
			//����������
			seniorQueryForm.gatherColumnName.value = obj.name;
			//�ѻ����е�id�������������Ʊ�ǩ
			seniorQueryForm.gatherColumnName.tagName = obj.id
			//�������
			if (obj.codeFormat){
				var htmlStr = "������ȣ�<select name='depth1' id='depth1' tagName='" + obj.id + "' size='1' onchange='changeInitDepth(this.id, this.tagName);'>";
				var codeFormatArray = obj.codeFormat.split("-");
				for (var i = 1; i < codeFormatArray.length + 1; i++){
					if (obj.totleDepth == i){
					    htmlStr += "<option value='" + i + "' selected>" + i + "</option>";	
					    //��̬���Ƴ�ʼ��������б��
					    drawInitDepth(i);
					}else {
					    htmlStr += "<option value='" + i + "'>" + i + "</option>";	
					    //�������еĻ���������Ը�ֵ
					    if (i == 1 && !obj.totleDepth){
    							//�����ϲ������л����²�������
    							var tempId = obj.id;
    							//ԭ�����У����������ܻ������
					        document.getElementById(tempId).totleDepth = i;
	  							if (tempId.indexOf("clone") == -1){
	      							tempId = "clone" + tempId;		
	  							}
	  							//��¡����������ܻ������
					        document.getElementById(tempId).totleDepth = i;
					    }
					}
				}
				htmlStr += "</select>";
				document.getElementById("totleDepth").innerHTML = htmlStr;
				//����������Ը�ֵ
				document.getElementById("totleDepth").style.display = "";	
				//2009-03-31 yuanxin;��̬�޸Ļ����е��ܻ�����Ⱥͳ�ʼ������ȣ���Ϊ��ǰ�����ж���
			}else {
				document.getElementById("totleDepth").style.display = "none";
			}
			
			//��ʼ�������
			if (!obj.totleDepth && !obj.initDepth){
			    if (obj.codeFormat){
				    var htmlStr = "��ʼ������ȣ�<select name='depth2' id='depth2' tagName='" + obj.id + "' size='1' onchange='saveInitDepth(this.id, this.tagName)'>";
				    htmlStr += "<option value='1'>1</option>";	
				    htmlStr += "</select>";
				    document.getElementById("initDepth").innerHTML = htmlStr;	
				    document.getElementById("initDepth").style.display = "";
				    //�������еĳ�ʼ������ȸ�ֵ
    				//�����ϲ������л����²�������
    				var tempId = obj.id;
	  				//ԭʼ�����У����������ĳ�ʼ�������
					  document.getElementById(tempId).initDepth = 1;
	  				if (tempId.indexOf("clone") == -1){
	      				tempId = "clone" + tempId;		
	  				}
	  				//��ǰ��¡����ĳ�ʼ�������
					  document.getElementById(tempId).initDepth = 1;
			    }else {
				    document.getElementById("initDepth").style.display = "none";	
			    }
		  }else {
		      var htmlStr = "��ʼ������ȣ�<select name='depth2' id='depth2' tagName='" + obj.id + "' size='1' onchange='saveInitDepth(this.id, this.tagName)'>";
		      for (var i = 1; i < Number(obj.totleDepth) + 1; i++){
		      	  if (Number(obj.initDepth) == i){
		              htmlStr += "<option value='" + i + "' selected>" + i + "</option>";	
		      	  }else {
		              htmlStr += "<option value='" + i + "'>" + i + "</option>";	
		      	  }
		      }
				  document.getElementById("initDepth").innerHTML = htmlStr;	
				  document.getElementById("initDepth").style.display = "";
		  }
		 
		  //��ʾҪ�غϼ�
		  if (obj.isTotle == 1){
		      var totleStr = "<input type='checkbox' name='isTotle' id='isTotle' tagName='" + obj.id + "' value='' checked='checked' onclick='changeIsTotal(this.tagName);'/>��ʾҪ�غϼ�";
		  }else {
		      var totleStr = "<input type='checkbox' name='isTotle' id='isTotle' tagName='" + obj.id + "' value='' onclick='changeIsTotal(this.tagName);'/>��ʾҪ�غϼ�";
		  }
		  document.getElementById("totle").innerHTML = totleStr;
		  document.getElementById("totle").style.display = "";
		  //�Ƿ�����һ�кϲ�
		  if (obj.isMerger == 1){
		      var mergerStr = "<input type='checkbox' name='isMerger' id='isMerger' tagName='" + obj.id + "' value='' checked='checked' onclick='changeIsMerger(this.tagName);'/>����һ�кϲ�";
		  }else {
		      var mergerStr = "<input type='checkbox' name='isMerger' id='isMerger' tagName='" + obj.id + "' value='' onclick='changeIsMerger(this.tagName);'/>����һ�кϲ�";
		  }
		  document.getElementById("merger").innerHTML = mergerStr;
		  document.getElementById("merger").style.display = "";
		  
		  //songfupeng 20090707 �Ƿ���ʾ����
		  if(obj.isShowCode == 1){
		    var showCodeStr="<input type='checkbox' name='isShowCode' id='isShowCode' tagName='"+obj.id+"' value='' checked='checked' onclick='changeIsShowCode(this.tagName);'/>��ʾ����";
		  }else{
		    var showCodeStr="<input type='checkbox' name='isShowCode' id='isShowCode' tagName='"+obj.id+"' value=''  onclick='changeIsShowCode(this.tagName);'/>��ʾ����"
		  }
		  document.getElementById("showCode").innerHTML=showCodeStr;
		  document.getElementById("showCode").style.display="";
		  
		  //songfupeng 20090709 �Ҳ���ʾ������
		  if(obj.isShowPlace == 1){
		    var showPlaceStr="<input type='checkbox' name='isShowPlace' id='isShowPlace' tagName='"+obj.id+"' value='' checked='checked' onclick='changeIsShowPlace(this.tagName);'/>�Ҳ���ʾ������";
		  }else{
		    var showPlaceStr="<input type='checkbox' name='isShowPlace' id='isShowPlace' tagName='"+obj.id+"' value='' onclick='changeIsShowPlace(this.tagName);'/>�Ҳ���ʾ������"
		  }
		  document.getElementById("showPlace").innerHTML=showPlaceStr;
		  document.getElementById("showPlace").style.display="";
		  
		}else if (!hasContain(absoluteX,absoluteY,gatherpad)){
			objP.style.display = "";
		}
		
	}
	
	document.body.onmousemove=function(){
		obj.style.left = event.clientX-_x+ document.documentElement.scrollLeft;
	  obj.style.top = event.clientY-_y + document.documentElement.scrollTop;
	}
}

// ����ͳ���ж����������ƶ�
function statFollowMouse(objP){
	// ��ԭλ����ʾ���߿�
	//if(statColumns[0]){
	//alert(statColumns[0].style.width);	
  //}

	objP.placeholder = showPlaceholder(objP);
	var obj = objP.cloneNode(true);
	obj.className="sclone";
	obj.srcobj = objP;
	objP.style.display = "none";
	//�ѿ�¡����׷�ӵ������ĩβ
	document.body.appendChild(obj);

	var followObj = obj;
	_x = event.offsetX;
	_y = event.offsetY;
	
	obj.style.position = "absolute";
	obj.style.left = event.clientX - _x + document.documentElement.scrollLeft;
	obj.style.top = event.clientY - _y + document.documentElement.scrollTop;
	obj.style.zIndex = 1000;

	/*for (var i = 0; i < statColumns.length; i++){
		if (statColumns[i].id == obj.id){
			statColumns[i].style.display = "";	
			//��̬����ͳ���еĸ߶ȺͿ��
			var childs = statColumns[i].children;
			if (flag01 == 0){
				obj.style.lineHeight = childs[0].offsetHeight + "px";
				flag01 = 1;
			}
			obj.style.width = childs[0].offsetWidth + "px";
		}
	}*/
	
	//��������λ���ڱ�������л�ͳ�����в���һ�����߿�
	/*for (var i = 0; i < gatherColumns.length; i++){
		//debugger;
		if (hasContain(event.x,(event.y+gatherColumns[i].offsetHeight/2),gatherColumns[i])){
			alert("ok");
			var odiv = gatherColumns[i].cloneNode();
			//odiv.style.height = obj.style.height + 20px;
			odiv.style.background = "";
			odiv.style.border = "1px dashed #FF0000";
			obj.insertAdjacentElement("BeforeBegin",odiv);
		}
	}*/

	obj.setCapture();
	obj.onmouseup = function(){
		obj.srcobj.release();
		this.removeNode(true);
		//����ͳ����ʱ����ʾͳ��������,ͬʱ���ػ����������Ժ͵���ͳ��������
		//��������x��y���������
		var absoluteX = event.clientX + document.documentElement.scrollLeft;
		var absoluteY = event.clientY + document.documentElement.scrollTop
		if (hasContain(absoluteX,absoluteY,querystatcolumns)){
			//1����ʾ����ͳ����
			if ("1".localeCompare(this.isSingle) == 0){
				seniorQueryForm.gatherColumnProperties.style.display="none";
				document.getElementById("gatherpad").style.display="none";
				document.getElementById("gatherpadbutton").className='';
				seniorQueryForm.statColumnProperties.style.display="";
				document.getElementById("statpad").style.display="none";
				document.getElementById("statpadbutton").className='';
				seniorQueryForm.singleStatColumnProperties.style.display="none";
				document.getElementById("singlestatpad").style.display="";
				document.getElementById("singlestatpadbutton").className='selected';
				seniorQueryForm.calculateStatColumnProperties.style.display="none";
				document.getElementById("singlestatpad").style.display="";
				document.getElementById("singlestatpadbutton").className='selected';
			  document.getElementById("conditionpad").style.display="none";
			  document.getElementById("conditionpadbutton").className='';
			  document.getElementById("conditionvaluepad").style.display="none";
			  document.getElementById("conditionvaluepadbutton").className='';
			  //����ͳ���������е�ͳ���е�����
			  document.getElementById("statColumnNameDiv").style.display = "none";
			  //��ʾ����ͳ���������е�ͳ���е�����
			  document.getElementById("singleStatColumnNameDiv").style.display = "";
			  //����ͳ���������е�ͳ������ϸȫѡ��ѡ��
			  document.getElementById("allDiv").style.display = "none";
			  //����ͳ������ϸ��Ӧ��ģ���б�
			  document.getElementById("templateList").style.display = "none";
			  //����ͳ������ϸ��Ӧ������Ԥ������
			  document.getElementById("warningArea").style.display = "none";
				//��̬������ͳ���е����Ը�ֵ
				//ͳ��������
			    seniorQueryForm.singleStatColumnName.value = obj.name;
			    //��̬��ѯ����ͳ���е���ϸ��Ϣ
			    findStatColumnDetail(obj.id);
			    //����ȫ�ֱ�������ͳ�������ƣ����ڼ���������ʾ����ͳ������ϸ�б�
			    statColumnNameGlobal = obj.name;
			//2����ʾ������
			}else if ("2".localeCompare(this.isSingle) == 0){
				seniorQueryForm.gatherColumnProperties.style.display="none";
				document.getElementById("gatherpad").style.display="none";
				document.getElementById("gatherpadbutton").className='';
				seniorQueryForm.statColumnProperties.style.display="none";
				document.getElementById("statpad").style.display="none";
				document.getElementById("statpadbutton").className='';
				seniorQueryForm.singleStatColumnProperties.style.display="none";
				document.getElementById("singlestatpad").style.display="";
				document.getElementById("singlestatpadbutton").className='';
				seniorQueryForm.calculateStatColumnProperties.style.display="";
				document.getElementById("singlestatpad").style.display="";
				document.getElementById("singlestatpadbutton").className='selected';
			  document.getElementById("conditionpad").style.display="none";
			  document.getElementById("conditionpadbutton").className='';
			  document.getElementById("conditionvaluepad").style.display="none";
			  document.getElementById("conditionvaluepadbutton").className='';
			  //��̬���ͳ������ϸ�б�
			  var aa = scdIdArrayAll;
			  var bb = scdCheckArrayAll;
			  var htmlStr = "";
			  for (var key in scdIdArrayAll){
			  	  //����prototype�ķ���
			  	  if (scdIdArrayAll[key][0]){
			  	  	  //���ͳ���е�����
			  	  	  htmlStr += "<div style='margin-top:3px;margin-bottom:3px;'>" + statColumnObjectArrayAll[key].name + "</div>";
					  	  for (var i = 0; i < scdIdArrayAll[key].length; i++){
					  	      htmlStr += "<div class='menu1'>" 
					  	                  + "<input name='checkbox' type='radio' id='" + scdTempColumnAll[key][i] + "' onclick='changeFormula(this.id);'/>"
					  	                  + statColumnObjectArrayAll[key].scd[i].name
					  	                  + "</div>";
					  	  }
			  	  }
			  }
			  //songfupeng 20090807 �������϶�������ʱ����initNum����Ϊ0-��ʼֵ
			  initNum=0;
			  //songfupeng 20090807 �������϶�������ʱ����totalformulStatus����Ϊ0-��ʼֵ
			  totalformulStatus=0;
			   //songfupeng 20090807 �������϶�������ʱ����formulaValue����Ϊ""
			  formulaValue="";
			  document.getElementById("scdList").innerHTML = htmlStr;
			//0:��ʾ��ͨ����ͳ����
			}else{
				seniorQueryForm.gatherColumnProperties.style.display="none";
				document.getElementById("gatherpad").style.display="none";
				document.getElementById("gatherpadbutton").className='';
				seniorQueryForm.statColumnProperties.style.display="";
				document.getElementById("statpad").style.display="";
				document.getElementById("statpadbutton").className='selected';
				seniorQueryForm.singleStatColumnProperties.style.display="none";
				document.getElementById("singlestatpad").style.display="none";
				document.getElementById("singlestatpadbutton").className='';
				seniorQueryForm.calculateStatColumnProperties.style.display="none";
				document.getElementById("singlestatpad").style.display="none";
				document.getElementById("singlestatpadbutton").className='';
			  document.getElementById("conditionpad").style.display="none";
			  document.getElementById("conditionpadbutton").className='';
			  document.getElementById("conditionvaluepad").style.display="none";
			  document.getElementById("conditionvaluepadbutton").className='';
			  //����ͳ�������Եĵ���ͳ���е�����
			  document.getElementById("singleStatColumnNameDiv").style.display = "none";
			  //��ʾ����ͳ�������Ե�ͳ���е�����
			  document.getElementById("statColumnNameDiv").style.display = "";
			  //����ͳ������ϸ��Ӧ��ģ���б�
			  document.getElementById("templateList").style.display = "none";
			  //����ͳ������ϸ��Ӧ������Ԥ������
			  document.getElementById("warningArea").style.display = "none";
			  //��ʾͳ���������е�ͳ������ϸȫѡ��ѡ��
			  document.getElementById("allDiv").style.display = "";
				//��̬������ͳ���е����Ը�ֵ
				//ͳ��������
			    seniorQueryForm.statColumnName.value = obj.name;
			    //��̬��ѯͳ���е���ϸ��Ϣ
			    findStatColumnDetail(obj.id);
			    //����ȫ�ֱ���ͳ�������ƣ����ڼ���������ʾͳ������ϸ�б�
			    statColumnNameGlobal = obj.name;
			}
		}else if (!hasContain(absoluteX,absoluteY,statpad) && !hasContain(absoluteX,absoluteY,singlestatpad)){
			objP.style.display = "";
		}else if (hasContain(absoluteX,absoluteY,singlestatpad)) {
			//1:����ͳ���� 2:������
			if (Number(this.isSingle) != 1 && Number(this.isSingle) != 2){
				objP.style.display = "";
			}else if (Number(this.isSingle) == 2){
				  //ɾ������ͳ�����еļ����ж���
				  for (var i = 0; i <statColumns.length; i++){
				      if (statColumns[i].id.localeCompare(objP.id) == 0){
				      	  //ɾ���������еļ�����
				          statColumns.removeAt(i);
				          objP.removeNode(true);
				          //ɾ���������м����ж�Ӧ�ļ����ж���
				          calColumnObjectArrayAll.remove(calColumnObjectArrayAll[objP.id]);
				      }	
				  }
			    	
			}
		}else if (hasContain(absoluteX,absoluteY,statpad) && (Number(this.isSingle) != 0)){
			objP.style.display = "";
		}
	}
	
	document.body.onmousemove=function(){
		obj.style.left = event.clientX -_x + document.documentElement.scrollLeft;
		obj.style.top = event.clientY -_y + document.documentElement.scrollTop;
	}
}

// ȡ�������������ƶ�
function releaseMouse(obj){
	var p = new Object();
	//p.x = event.x + document.documentElement.scrollLeft;
	//p.y = event.y + document.documentElement.scrollTop
	p.x = event.clientX + document.documentElement.scrollLeft;
	p.y = event.clientY + document.documentElement.scrollTop;
	obj.style.position = "static";
	obj.releaseCapture();
	if(obj.placeholder != null){
		obj.placeholder.removeNode(true);
		obj.placeholder = null;
	}
	
	document.body.onmousemove = null;
	return p;
}

// �ڶ���λ����ʾһ�����߿�
function showPlaceholder(obj){
	var odiv = obj.cloneNode();
	//odiv.style.height = obj.style.height + 20px;
	odiv.style.background = "";
	odiv.style.border = "1px dashed #CCCCCC";
	//#FF0000  #CCCCCC
	obj.insertAdjacentElement("BeforeBegin",odiv);
	
	return odiv;
}


// ��ʼ���Ϸ���������������
/*function init_originalquerygathercolumns(div){
	// ����һ��������
	div.addGatherColumn = function(gather,x,y){
		var p = 0;
		for(i=0;i<gatherColumns.length;i++){
			if(hasContain(x,y,gatherColumns[i].HTMLobject)){
				// �ж����ָ���λ������Ŀ������е����滹������ 
				if(hasContain((x+gatherColumns[i].HTMLobject.offsetHeight/2),y,gatherColumns[i].HTMLobject)){
					// ��Ҫ�������в��뵽��������
					p = i;
				}
				else{
					// ��Ҫ��ͳ���в��뵽��������
					p = i+1;
				}
				break;
			}
		}

		originalGatherColumns.add(p,gather);
		this.showGatherColumns();
	};
	
	// ������ʾ������
	div.showGatherColumns = function(){
		var childs = this.children;
		for(i=childs.length;i>0;i--){
			childs[i-1].removeNode(true);
		}
	
		for(i=0;i<gatherColumns.length;i++){
			var odiv = document.createElement("<div style='border:1px dashed #CCCCCC'></div>");
			odiv.style.paddingLeft = (i*10)+"px";
			odiv.appendChild(gatherColumns[i].HTMLobject);
			this.appendChild(odiv);
		}
	
	}
}

// ��ʼ���·���������������
function init_querygathercolumns(div){
	// ����һ��������
	div.addGatherColumn = function(gather,x,y){
		var p = 0;
		for(i=0;i<gatherColumns.length;i++){
			if(hasContain(x,y,gatherColumns[i].HTMLobject)){
				// �ж����ָ���λ������Ŀ������е����滹������ 
				if(hasContain((x+gatherColumns[i].HTMLobject.offsetHeight/2),y,gatherColumns[i].HTMLobject)){
					// ��Ҫ�������в��뵽��������
					p = i;
				}
				else{
					// ��Ҫ��ͳ���в��뵽��������
					p = i+1;
				}
				break;
			}
		}

		gatherColumns.add(p,gather);
		this.showGatherColumns();
	};
	
	// ������ʾ������
	div.showGatherColumns = function(){
		var childs = this.children;
		for(i=childs.length;i>0;i--){
			childs[i-1].removeNode(true);
		}
	
		for(i=0;i<gatherColumns.length;i++){
			var odiv = document.createElement("<div style='border:1px dashed #CCCCCC'></div>");
			odiv.style.paddingLeft = (i*10)+"px";
			odiv.appendChild(gatherColumns[i].HTMLobject);
			this.appendChild(odiv);
		}
	
	}
}*/

// �ж������Ƿ���Ŀ����
function hasContain (x,y,obj){
	var left = 0;
	var top = 0;
	var width = obj.offsetWidth - 2;
	var height = obj.offsetHeight - 2;
	var o = obj;
	while(o != null){
		left += o.offsetLeft;
		top += o.offsetTop;
		o = o.offsetParent;
	}
	return (left<=x) && ((left+width)>=x) && (top<=y) && ((top+height)>=y);		
}

// �ж������Ƿ���Ŀ����(�����ڻ���������)
function hasContainForGather(x,y,obj,gathersLength){
	var left = 0;
	var top = 0;
	var width = obj.offsetWidth - 2;
	var height = obj.offsetHeight - 2;
	var o = obj;
	while(o != null){
		left += o.offsetLeft;
		top += o.offsetTop;
		o = o.offsetParent;
	}
	var scrollLeft = document.getElementById("querygathercolumns").scrollLeft;
	var scrollTop = document.getElementById("querygathercolumns").scrollTop;
	//songfupeng 200908 ���ƶԻ����н����϶�ʱ����������Զ�����
	if(scrollTop == 0  && gathersLength>=6){
		scrollTop=6;
	}	else if(scrollTop >27 && gathersLength>=6){
		scrollTop = scrollTop-25;
	} else if(scrollTop <=27 && gathersLength>=6){
	   scrollTop = scrollTop-11;
	}

	window.status = scrollLeft + ":" + scrollTop;

//      return ((left-scrollLeft)<=x) && ((left+width-scrollLeft)>=x) && ((top-scrollTop)<=y) && ((top+height-scrollTop)>=y);		

	
   return ((left-scrollLeft)<=(x+scrollLeft)) && ((left+width-scrollLeft)>=(x+scrollLeft)) && ((top-scrollTop)<=(y+scrollTop)) && ((top+height-scrollTop)>=(y+scrollTop));		
}

//ˢ�³�ʼ��������������
function refresh_originalquerygathercolumns(div){
	//ɾ��������ӽڵ�
	var childs = div.children;
	for (i = childs.length; i > 0; i--){
		childs[i - 1].removeNode(true);	
	}
	//��Ӷ�����ӽڵ�
	for(var i=0;i<originalGatherColumns.length;i++){
		//var odiv = document.createElement("<div style='border:0px dashed #CCCCCC'></div>");
		//odiv.style.paddingLeft = (i*10)+"px";
		//odiv.appendChild(originalGatherColumns[i]);
		div.appendChild(originalGatherColumns[i]);
	}
}

//ˢ�±����������������
function refresh_querygathercolumns(div){
	//ɾ��������ӽڵ�
	var childs = div.children;
	for (i = childs.length; i > 0; i--){
		childs[i - 1].removeNode(true);	
	}
	//��ȡҪ�ڱ����������ʾ�Ļ�����
	//var gatherColumnsView = new Array();
	//for (var i = 0; i < gatherColumns.length; i++){
	    //if (gatherColumns[i].style.display == ""){
	        //gatherColumnsView[gatherColumnsView.length] = gatherColumns[i];     	
	    //}	
	//}
	//��Ӷ�����ӽڵ�
	//��ʱ����displayIndex����¼�ڱ���������ʾ�Ļ�����˳��
	var displayIndex = 0;
	var tempFlag = 0;
	for(var i=0;i<gatherColumns.length;i++){
		var odiv = document.createElement("<div style='border:0px dashed #CCCCCC'></div>");
		if (gatherColumns[i].style.display == ""){
			  if (tempFlag == 0){
		        displayIndex += 0;	
			  }else {
		        displayIndex += 1;	
			  }
		    tempFlag = 1;
		}
		odiv.style.paddingLeft = (displayIndex*10)+"px";
		odiv.appendChild(gatherColumns[i]);
		div.appendChild(odiv);
	}
}

//ˢ�³�ʼͳ������������
function refresh_originalquerystatcolumns(div){
	//ɾ��������ӽڵ�
	var childs = div.children;
	for (i = childs.length; i > 0; i--){
		childs[i - 1].removeNode(true);	
	}
	//��Ӷ�����ӽڵ�
	for(var i=0;i<originalStatColumns.length;i++){
		//var odiv = document.createElement("<div style='border:1px dashed #CCCCCC'></div>");
		//odiv.style.paddingLeft = (i*10)+"px";
		//odiv.appendChild(originalStatColumns[i]);
		div.appendChild(originalStatColumns[i]);
	}
}

//ˢ�³�ʼ����ͳ������������
function refresh_originalsinglequerystatcolumns(div){
	//ɾ��������ӽڵ�
	var childs = div.children;
	for (i = childs.length; i > 0; i--){
		childs[i - 1].removeNode(true);	
	}
	//��Ӷ�����ӽڵ�
	for(var i=0;i<originalSingleStatColumns.length;i++){
		//var odiv = document.createElement("<div style='border:1px dashed #CCCCCC'></div>");
		//odiv.style.paddingLeft = (i*10)+"px";
		//odiv.appendChild(originalStatColumns[i]);
		div.appendChild(originalSingleStatColumns[i]);
	}
}

//ˢ�±���ͳ������������
function refresh_querystatcolumns(div){
	//ɾ��������ӽڵ�
	var childs = div.children;
	for (i = childs.length; i > 0; i--){
		childs[i - 1].removeNode(true);	
	}
	//��Ӷ�����ӽڵ�
	for(var i=0;i<statColumns.length;i++){
		var odiv = document.createElement("<div style='border:0px dashed #CCCCCC'></div>");
		//odiv.style.width = 20 + "px";
		//odiv.style.paddingLeft = (i*10)+"px";
		statColumns[i].onmouseover=null;
		odiv.appendChild(statColumns[i]);
		div.appendChild(odiv);
	}
	
			//alert(div.offsetWidth);
		//alert(querystatcolumns.style.width);
		//var temp1 = querystatcolumns.offsetWidth;
		//var temp2 = div.offsetWidth ;
		//alert("temp1:" + temp1);
		//alert("temp2:" + temp2);
		//querystatcolumns.style.width = (temp1 + temp2)+ "px";
		//alert(querystatcolumns.style.width);
	var childs = querystatcolumns.children;
	var w = 0;
	for(var i=0;i<childs.length;i++){
		w += childs[i].offsetWidth + 10;
	}
	if(w < querystatcolumns.parentElement.offsetWidth){
		querystatcolumns.style.width = querystatcolumns.parentElement.offsetWidth + "px";
	}
	else{
		querystatcolumns.style.width = w + "px";
	}
	
}

//���ñ����������е���ʾ˳��
function sortGatherColumn(gather,x,y){
	//�����϶��ĳ�ʼ�����ж�Ӧ�ı��������
	//��¼�϶��Ļ����ж���
	var flag = null;
	//��¼�϶��Ļ��������
	var flag1 = 0;
	for (var m = 0; m < gatherColumns.length; m++){
		if (gatherColumns[m].innerHTML == gather.innerHTML)	{
			flag = gatherColumns[m];
			flag1 = m;
			break;
		}
	}
	for(i=0;i<gatherColumns.length;i++){
		if(hasContainForGather(x,y,gatherColumns[i],gatherColumns.length)){
	/*
			// �ж����ָ���λ������Ŀ������е����滹������ 
			if(hasContain(x,(y+gatherColumns[i].offsetHeight/2),gatherColumns[i])){
				// ��Ҫ�������в��뵽��������
				//��������д��������϶������
				if (flag1 > i){
				   var gatherColumnsTemp = new Array(gatherColumns.length);
				   //��¼temk��ֵ�Ƿ�ӹ�1
				   var f = 0;
				    for (var j = 0; j < i; j++){
					    gatherColumnsTemp[j] = 	gatherColumns[j];
				    }
				    gatherColumnsTemp[i] = flag;
				    for (var k = i + 1; k < gatherColumns.length; k++){
					    var temk = k - 1;
					    if (gatherColumns[temk].innerHTML == flag.innerHTML){
						    temk += 1;
					    	gatherColumnsTemp[k] = gatherColumns[temk];	
							f = 1;
					    }else {
							if (f == 0){
					    		gatherColumnsTemp[k] = gatherColumns[k - 1];	
							}else {
					    		gatherColumnsTemp[k] = gatherColumns[k];	
							}
						}						
				    }
				    gatherColumns = gatherColumnsTemp;
					//alert("1");
				}else if (flag1 < i){
				    var gatherColumnsTemp = new Array(gatherColumns.length);
					//��¼temj��ֵ�Ƿ�ӹ�1
					var f = 0;
				    for (var j = 0; j < i - 1; j++){
						var temj = j;
					    if (gatherColumns[temj].innerHTML == flag.innerHTML){
						    temj += 1;
					    	gatherColumnsTemp[j] = 	gatherColumns[temj];
							f = 1;
					    }else {
							if (f == 0){
					    		gatherColumnsTemp[j] = 	gatherColumns[j];
							}else {
					    		gatherColumnsTemp[j] = 	gatherColumns[j + 1];
							}
						}
				    }
				    gatherColumnsTemp[i - 1] = flag;
				    for (var k = i; k < gatherColumns.length; k++){
					    gatherColumnsTemp[k] = gatherColumns[k];	
				    }
				    gatherColumns = gatherColumnsTemp;
					//alert("2");
				}
			}
			else{
				// ��Ҫ��ͳ���в��뵽��������
				//��������д��������϶������
				if (flag1 > i && (flag1 - i > 1)){
					var gatherColumnsTemp = new Array(gatherColumns.length);
					for (var j = 0; j < i + 1; j++){
						gatherColumnsTemp[j] = 	gatherColumns[j];
					}
					gatherColumnsTemp[i + 1] = flag;
					for (var k = i + 2; k < gatherColumns.length; k++){
						var temk = k - 1;
						if (gatherColumns[temk].innerHTML == flag.innerHTML){
							temk += 1;
						}
						gatherColumnsTemp[k] = gatherColumns[temk];	
					}
					gatherColumns = gatherColumnsTemp;
					//alert("3");
				}else if (flag1 < i){
					var gatherColumnsTemp = new Array(gatherColumns.length);
					//��¼temj��ֵ�Ƿ�ӹ�1
					var f = 0;
					for (var j = 0; j < i; j++){
						var temj = j;
					    if (gatherColumns[temj].innerHTML == flag.innerHTML){
						    temj += 1;
					    	gatherColumnsTemp[j] = 	gatherColumns[temj];
							f = 1;
					    }else {
							if (f == 0){
					    		gatherColumnsTemp[j] = 	gatherColumns[j];
							}else {
					    		gatherColumnsTemp[j] = 	gatherColumns[j + 1];
							}
						}
					}
					gatherColumnsTemp[i] = flag;
					for (var k = i + 1; k < gatherColumns.length; k++){
						gatherColumnsTemp[k] = gatherColumns[k];	
					}
					gatherColumns = gatherColumnsTemp;
					//alert("4");
				}
			}
			break;
	*/	

//debugger;
				//��������д��������϶������
				if (flag1 > i){
				   var gatherColumnsTemp = new Array(gatherColumns.length);
				   //��Ҫ���������֮ǰ��ֵ������ʱ���飨0->i-1��
				   for(var j = 0; j < i; j++){
				       gatherColumnsTemp[j] = gatherColumns[j];
				   }
				   //�Ѳ�������е�ֵ������ʱ����(i)
				   gatherColumnsTemp[j] = gatherColumns[flag1];
				   //�Ѳ�������п�ʼ֮��Ļ�����ֵ������ʱ���飨i->(flag1-1)��
				   for(var j = i; j < flag1; j++){
				       gatherColumnsTemp[j+1] = gatherColumns[j];    	
				   }
				   //��Ҫ���������֮��Ļ�����ֵ������ʱ���飨(flag1+1)->(gatherColumns-1)��
				   for(var j = flag1+1; j < gatherColumns.length; j++){
				   	   gatherColumnsTemp[j] = gatherColumns[j];
				   }
				    gatherColumns = gatherColumnsTemp;
					//alert("1");
				//��������д��������϶���ʱ��
				}else if (flag1 < i){
				    var gatherColumnsTemp = new Array(gatherColumns.length);
				    //��Ҫ���������֮ǰ�Ļ�����ֵ������ʱ�����У�0->flag1��
				    for(var j = 0; j < flag1; j++){
				        gatherColumnsTemp[j] = gatherColumns[j];   	
				    }
				    //��Ҫ���������֮�󵽲�������е�ֵ������ʱ�����У�(flag1+1)->i��
				    for(var j = flag1; j < i; j++){
				        gatherColumnsTemp[j] = gatherColumns[j + 1];    	
				    }
				    //��Ҫ��������з�����ʱ������
				    gatherColumnsTemp[i] = gatherColumns[flag1];
				    //�Ѳ��������֮��Ļ����з�����ʱ������((i+1)->(gatherColumns-1))
				    for(var j = i+1; j < gatherColumns.length; j++){
				        gatherColumnsTemp[j] = gatherColumns[j];   	
				    }
				    gatherColumns = gatherColumnsTemp;
					//alert("2");
				//�������дӳ�ʼ���Ϸŵ�������ʱ
				}
			break;

		
		}
	}
}

//���ñ�����ͳ���е���ʾ˳��
function sortStatColumn(stat,x,y){
	stat.placeholder = showPlaceholder(stat);
	//�����϶��ĳ�ʼͳ���ж�Ӧ�ı���ͳ����
	//��¼�϶���ͳ���ж���
	var flag = null;
	//��¼�϶���ͳ���������
	var flag1 = 0;
	for (var m = 0; m < statColumns.length; m++){
		if (statColumns[m].id == stat.id)	{
			flag = statColumns[m];
			flag1 = m;
			break;
		}
	}
	for(i=0;i<statColumns.length;i++){
		if(hasContain(x,y,statColumns[i])){
				//����ͳ���д��������϶������
				if (flag1 > i){
				   var statColumnsTemp = new Array(statColumns.length);
				   //��Ҫ����ͳ����֮ǰ��ֵ������ʱ���飨0->i-1��
				   for(var j = 0; j < i; j++){
				       statColumnsTemp[j] = statColumns[j];
				   }
				   //�Ѳ���ͳ���е�ֵ������ʱ����(i)
				   statColumnsTemp[j] = statColumns[flag1];
				   //�Ѳ���ͳ���п�ʼ֮���ͳ����ֵ������ʱ���飨i->(flag1-1)��
				   for(var j = i; j < flag1; j++){
				       statColumnsTemp[j+1] = statColumns[j];    	
				   }
				   //��Ҫ����ͳ����֮���ͳ����ֵ������ʱ���飨(flag1+1)->(statColumns-1)��
				   for(var j = flag1+1; j < statColumns.length; j++){
				   	   statColumnsTemp[j] = statColumns[j];
				   }
				    statColumns = statColumnsTemp;
					//alert("1");
				//����ͳ���д��������϶���ʱ��
				}else if (flag1 < i){
				    var statColumnsTemp = new Array(statColumns.length);
				    //��Ҫ����ͳ����֮ǰ��ͳ����ֵ������ʱ�����У�0->flag1��
				    for(var j = 0; j < flag1; j++){
				        statColumnsTemp[j] = statColumns[j];   	
				    }
				    //��Ҫ����ͳ����֮�󵽲���ͳ���е�ֵ������ʱ�����У�(flag1+1)->i��
				    for(var j = flag1; j < i; j++){
				        statColumnsTemp[j] = statColumns[j + 1];    	
				    }
				    //��Ҫ����ͳ���з�����ʱ������
				    statColumnsTemp[i] = statColumns[flag1];
				    //�Ѳ���ͳ����֮���ͳ���з�����ʱ������((i+1)->(statColumns-1))
				    for(var j = i+1; j < statColumns.length; j++){
				        statColumnsTemp[j] = statColumns[j];   	
				    }
				    statColumns = statColumnsTemp;
					//alert("2");
				//��ͳ���дӳ�ʼ���Ϸŵ�������ʱ
				}
			break;
	
	
		}
	}
}

//���ı�����еĻ������ֵʱ��̬�ı�����г�ʼ���ѡ��Χ
function changeInitDepth(id, objId){
	var depthTem = document.getElementById(id).value;
	drawInitDepth(depthTem, objId);
	//��̬�ı�����еĻ����������ֵ
	if (objId.indexOf("clone") == -1){
	    objId = "clone" + objId;		
	}
	document.getElementById(objId).totleDepth = depthTem;
}

//��̬���Ƴ�ʼ��������б��
function drawInitDepth(depth, objIdTem){
	depth = Number(depth);
	var htmlStr1 = "��ʼ������ȣ�<select name='depth2' id='depth2' tagName='" + objIdTem + "' size='1' onchange='saveInitDepth(this.id, this.tagName)'>";
	for (var i = 1; i < depth + 1; i++){
		htmlStr1 += "<option value='" + i + "'>" + i + "</option>";	
	}
	htmlStr1 += "</select>";
	document.getElementById("initDepth").innerHTML = htmlStr1;	
	document.getElementById("initDepth").style.display = "";
}

//�ѳ�ʼ��ȵ�ѡ��ֵ���浽������
function saveInitDepth(id, objId) {
	  //��ʼ���ѡ��ֵ
    var depthTem = document.getElementById(id).value;	
    //�����ϲ������л����²�������
	  if (objId.indexOf("clone") == -1){
	      objId = "clone" + objId;		
	  }
    //�ѳ�ʼ���ֵ���浽�����ж����ϣ���
	  document.getElementById(objId).initDepth = depthTem;
}

//��̬�ı�����е��Ƿ���ʾ�ϼ�����
function changeIsTotal(objId){
	  if (objId.indexOf("clone") == -1){
	      objId = "clone" + objId;		
	  }
    if (document.getElementById("isTotle").checked){
	      //����ʾҪ�غϼ�ֵ���浽�����ж�����
	      document.getElementById(objId).isTotle = 1;
    }else {
	      //����ʾҪ�غϼ�ֵ���浽�����ж�����
	      document.getElementById(objId).isTotle = 0;
    }
}
//songfupeng 20091209 �ϲ�״̬
var isMergerStatus=0;
//��̬�ı�������Ƿ�����һ�кϲ�����
function changeIsMerger(objId){
	  if (objId.indexOf("clone") == -1){
	      objId = "clone" + objId;		
	  }
	  
	  var io=0;
	  var x;
	  for(x in templateArrayAll){
	    if(x.indexOf("sccd")!=-1){
		    for(var i=0;i<templateArrayAll[x].length;i++){
		     	if(templateArrayAll[x][i]!=0){
		     	 	 document.getElementById("isMerger").checked=false;
				     alert("�Ѿ���ģ��ѡ��!");
				     return;
		     	} 
		    }
	    }
	  }
	 
   	  if (document.getElementById("isMerger").checked){
	      //����ʾҪ�غϼ�ֵ���浽�����ж�����
	      document.getElementById(objId).isMerger = 1;
	      isMergerStatus+=1;
   	  }else {
	      //����ʾҪ�غϼ�ֵ���浽�����ж�����
	      document.getElementById(objId).isMerger = 0;
	      isMergerStatus-=1;
      }
}
//songfupeng 090701 ��̬�ı�������Ƿ���ʾ����
function changeIsShowCode(objId){
	  if (objId.indexOf("clone") == -1){
	      objId = "clone" + objId;		
	  }
	  if (document.getElementById("isShowCode").checked){
	      //����ʾ����ֵ���浽�����ж�����
		  document.getElementById(objId).isShowCode = 1;
	  }else {
	      //����ʾ����ֵ���浽�����ж�����
	      document.getElementById(objId).isShowCode = 0;
	  }
}
//songfupeng 090709 ��̬��Ϊ�Ҳ���ʾ������
function changeIsShowPlace(objId){
	  if (objId.indexOf("clone") == -1){
	      objId = "clone" + objId;		
	  }
	  if (document.getElementById("isShowPlace").checked){
	      //����ʾ����ֵ���浽�����ж�����
		  document.getElementById(objId).isShowPlace = 1;
	  }else {
	      //����ʾ����ֵ���浽�����ж�����
	      document.getElementById(objId).isShowPlace = 0;
	  }
	  
}

//����ͳ���б�ͷ��ϸ��Ϣ�Ļص�����
function processResponse(text){
	//��ͳ������ϸ����������
    eval("var result = " + text);
    statColumnDetailArray = result.statColumnDetailJson;
    //����ͳ���ж������ڼ���������ʾ��ͳ�����б�
    var statColumnObject = new Object();
    statColumnObject.scd = statColumnDetailArray;
    statColumnObject.name = statColumnNameGlobal;
    
    //����ȫ�ֱ�������¼��ǰ������ͳ����id
    statColumnIdGlobal = statColumnDetailArray[0].statColumnId;
    //ͳ������ϸID;����Ϊȫ�ֱ���;scdIdArrayΪ���浥��ͳ���е���ϸid;scdIdArrayAllΪ��ά����,ͨ����(ͳ����ID)ֵ(scdIdArray)������ͳ������ϸ��id
    scdIdArray = new Array();
    scdTempCloumnArray=new Array();
    //ͳ������ϸѡ��״̬;����Ϊȫ�ֱ���;scdCheckArrayΪ���浥��ͳ������ϸ��ѡ��״̬;scdCheckArrayAllΪ��ά����,ͨ����(ͳ����ID)ֵ(scdCheckArray)������ͳ������ϸ��ѡ��״̬
    scdCheckArray = new Array();
    //����ͳ������ϸ��������;����Ϊȫ�ֱ���;hiddenStrArrayΪ���浥��ͳ������ϸ��������;scdMapΪ��ά����,ͨ����(ͳ����ID)ֵ(hiddenStrArray)������ͳ������ϸ��������
    hiddenStrArray = new Array();
    
    //�ж�ͳ�����Ƿ��Ѿ����򿪹������Ϸŵ�ͳ���б�ͷ����
    if (!scdIdArrayAll[statColumnDetailArray[0].statColumnId]){
        //�����ţ�������ͳ������ϸ������ѡ��״̬��ͳ������ϸid������
        for (var i = 0; i < statColumnDetailArray.length; i++){
            hiddenStrArray[i] = "<input type='hidden' id='scd_" + statColumnDetailArray[i].statColumnDetailId + "' name='scd_" 
                              + statColumnDetailArray[i].statColumnId + "_" + statColumnDetailArray[i].sortNo + "' value='1'/>";
            scdCheckArray[i] = "1";
            scdIdArray[i] = statColumnDetailArray[i].statColumnDetailId;	
            scdTempCloumnArray[i]=statColumnDetailArray[i].tmpColumn;
        }
    //���죨�ܵģ�ͳ������ϸid��ѡ��״̬�������������
	  scdIdArrayAll[statColumnDetailArray[0].statColumnId] = scdIdArray;
		scdCheckArrayAll[statColumnDetailArray[0].statColumnId] = scdCheckArray;
		scdTempColumnAll[statColumnDetailArray[0].statColumnId] = scdTempCloumnArray;
    scdMap[statColumnDetailArray[0].statColumnId] = hiddenStrArray;
    //����ͳ���ж�������
    statColumnObjectArrayAll[statColumnDetailArray[0].statColumnId] = statColumnObject;
    }
    //��scdIdArray��scdCheckArray��ֵ���Ա��ڵ���ȫѡ��ťʱ�ı�����ͳ������ϸ��ѡ��״̬
    scdIdArray = scdIdArrayAll[statColumnDetailArray[0].statColumnId];
    scdCheckArray = scdCheckArrayAll[statColumnDetailArray[0].statColumnId];
    scdTempCloumnArray=scdTempColumnAll[statColumnDetailArray[0].statColumnId];
    //��ͳ������ϸ�����������
    var htmlStr01 = "";
    for (var i = 0; i < statColumnDetailArray.length; i++){
        htmlStr01 += "<div class='menu1'>";		
        htmlStr01 += "<input type='checkbox' id='sccd_" + statColumnDetailArray[i].statColumnDetailId + "'" 
                     + " name='scdetail' value='" + i + "' checked='checked' onclick='checkscd(this.id,this.value);'/>"
                     + "<a name='sccd_" + statColumnDetailArray[i].statColumnDetailId + "' href='#' id='ssccd_" + statColumnDetailArray[i].statColumnDetailId + "' scdName='" + statColumnDetailArray[i].name + "' onclick='viewTemplate(this.name, this.scdName);'>" + statColumnDetailArray[i].name + "</a>";
        htmlStr01 += "</div>";
    }
    document.getElementById("statColumnDetail").innerHTML = htmlStr01;
    //��ͳ������ϸȫѡ��ѡ����Ϊѡ��״̬
    document.getElementById("all").checked = "checked";

//��ʼ
    
//�ı��ͷ����ɫ����
var headTableName = "headTable" + statColumnDetailArray[0].statColumnId;
var otable = document.getElementById(headTableName);
//��ʼ����ά�������������headArray����Ϊȫ�ֱ���
headArray = new Array(otable.tHead.rows.length);
//���Ҷ�ά���������
var colNumbers = 0;
	for (var i = 0; i < otable.tHead.rows(0).cells.length; i++){
		var colNumber = otable.tHead.rows(0).cells(i).colSpan;
		colNumbers +=colNumber;
	}
//�Զ�ά�����ÿһ�н��г�ʼ��
	for (var ii = 0; ii < headArray.length; ii++){
		headArray[ii] = new Array(colNumbers);
	}
//��ÿһ��Ԫ�����ݷ����ά����Ķ�Ӧλ��
var startcell=0;
    for (var jj = 0; jj < headArray.length; jj++){
        startcell=0;
		for (var kk = 0; kk < otable.tHead.rows[jj].cells.length; kk++){
			//�Ѻϲ��ж���ϲ���������������value�����������ֺϲ��е�״̬
			otable.tHead.rows[jj].cells[kk].value=otable.tHead.rows[jj].cells[kk].colSpan;
			otable.tHead.rows[jj].cells[kk].className="statecolumnBackColour";
	    	startcell = Filltable(jj,startcell,otable.tHead.rows[jj].cells[kk]);
		}
	}
    /**
     * ����ֵ����һ����䵥Ԫ�������;startrow:������startcol��Ҫ���ĵ�ǰ������thobj��Ҫ���ĵ�ǰ�ж���
     */
function Filltable(startrow,startcol,thobj){
    var currentCell = startcol;
    for (var k = startcol; k < thobj.colSpan + startcol; k++){
    	if (headArray[startrow][k] == null){
    		headArray[startrow][k] = thobj;
    		currentCell += 1; 
    		//������кϲ������
    		if (thobj.rowSpan > 1){
    			for (var j = startrow + 1; j < thobj.rowSpan + startrow; j++){
    			headArray[j][k] = thobj;
    			}
    		}
    	}else {
    		startcol += 1;
    		currentCell += 1; 
    	}
    }
    return currentCell;
}
//�������һ��<tr></tr>����ֵ�����
if (headArray[headArray.length - 1][0] == null){
	delete headArray[headArray.length - 1];
	headArray.length = headArray.length - 1;
}
//����ͳ������ϸԭʼ״̬
if(scdMap[statColumnDetailArray[0].statColumnId]){
	for(var ii = 0; ii < scdIdArrayAll[statColumnDetailArray[0].statColumnId].length; ii++){
		if(scdCheckArrayAll[statColumnDetailArray[0].statColumnId][ii]=="0"){
		var id = "sccd_"+scdIdArrayAll[statColumnDetailArray[0].statColumnId][ii];
		document.getElementById(id).checked="";
		//ȡ��ȫѡ��ѡ���ѡ��״̬
		document.getElementById("all").checked="";
		//�ж�ͳ������ϸ�Ƿ�ѡ��
		if(document.getElementById(id).checked==""){
			scdCheckArray[ii] = "0";
			}else{
				scdCheckArray[ii] = "1";
			}
		}
	}	
}
//����ͳ������ϸԭʼ����ɫ״̬
if (scdMap[statColumnDetailArray[0].statColumnId]){
	for (var ii = 0; ii < scdIdArrayAll[statColumnDetailArray[0].statColumnId].length; ii++){
		if (scdCheckArrayAll[statColumnDetailArray[0].statColumnId][ii]=="0"){
			//�ѱ���ɫ��Ϊ��ɫ
			headArray[headArray.length - 1][ii].className = "";
			//�жϱ��������еı���ɫ״̬
			for (var i = headArray.length - 2 ; i >= 0; i--){
				if (headArray[i][ii].value == 1){
					headArray[i][ii].className="";
					headArray[i][ii].value -= 1;
				}else if (headArray[i][ii].value > 1){
					headArray[i][ii].value -= 1;
				}
			}
		}else {
			//�ѱ���ɫ��Ϊ��ɫ
			headArray[headArray.length - 1][ii].className = "statecolumnBackColour";
			//�жϱ��������еı���ɫ״̬
			for (var i = headArray.length - 2 ; i >= 0; i--){
				//headArray[i][ii].value += 1;
				headArray[i][ii].className = "statecolumnBackColour";
			}
		}
	}	
}

//����    
    
}
//��̬��ѯͳ������ϸ��Ϣ
function findStatColumnDetail(statColumnId){ 
    var postDatastr = "&statColumnId="+statColumnId;
    var preurl = PATH_PREFIX + "/salary/discovery/findstatcolumndetailbyajaxaction.do?t=" + Math.random();
    //����ajax.js�еķ���
    startRequest("POST",preurl,postDatastr,processResponse);
}

//Ϊͳ������ϸ���Ʋ�ѯģ�壨Ϊ�����ھ���׼����
function viewTemplate(statColumnDetailId, scdName) {
	  if (document.getElementById(statColumnDetailId).checked){
	  	  if (beforeStatColumnDetailIdGloble && document.getElementById("s" + beforeStatColumnDetailIdGloble)){
	  	      document.getElementById("s" + beforeStatColumnDetailIdGloble).style.backgroundColor = "ffffff";	
	  	  }
	  	  //�ı�ͳ������ϸ�ı���ɫ����ʾ��ǰ���õ�ͳ������ϸ
	  	  document.getElementById("s" + statColumnDetailId).style.backgroundColor = "ff8000";
        var postDatastr = "&statColumnDetailId=" + statColumnDetailId + "&scdName=" + scdName;
        var preurl = PATH_PREFIX + "/salary/discovery/findtemplatebyajaxaction.do?t=" + Math.random();
        //����ajax.js�еķ���
        startRequest("POST",preurl,postDatastr,queryTemplateResponse);
        //����ͳ������ϸ��id
        beforeStatColumnDetailIdGloble = statColumnDetailId;
	  }else {
	      return false;	
	  }
}

//AJAX��ѯģ��Ļص�����
function queryTemplateResponse(text){
	  var templateList = new Array();
	
	  eval("var result = templateList = " + text);
	  //ģ���б�
	  templateList = result.templateJson;
	  //ͳ������ϸID
	  var statColumnDetailId = result.statColumnDetailId.name;
	  //2009-02-06 yuanxin;ͳ��������name
	  var statColumnDetailName = result.scdName;
	  //����ͳ������ϸ��Ӧ��ģ������
	  var templateArray = new Array();
	  //����ͳ������ϸ��Ӧ��Ԥ��ֵ����
	  var warningObj = new Object();
	  //��ʾͳ������ϸģ���б�
	  document.getElementById("templateList").style.display = "";
	  //��ʾͳ������ϸԤ��ֵ
	  document.getElementById("warningArea").style.display = "";
	  //����ͳ������ϸԤ��ֵ��������
	  //ͳ������ϸ����
	  warningObj.scdName = statColumnDetailName;
	  //����Ԥ��ֵ
	  warningObj.topWarning = "9999999999";
	  //ʹ��ͳ������ϸID��ʾ��Ԥ��ֵ����
	  document.getElementById("topWarning").scdId = statColumnDetailId;
	  //�����ı���ɫ(��ʼֵ)
	  warningObj.topFontColor = "00ff00";
	  //ʹ��ͳ������ϸID��ʾ��Ԥ��ֵ����
	  document.getElementById("topFontColor").scdId = statColumnDetailId;
	  //���ޱ�����ɫ(��ʼֵ)
	  warningObj.topBackColor = "ffffff";
	  //ʹ��ͳ������ϸID��ʾ��Ԥ��ֵ����
	  document.getElementById("topBackColor").scdId = statColumnDetailId;
	  //����Ԥ��ֵ
	  warningObj.bottomWarning = "0";
	  //ʹ��ͳ������ϸID��ʾ��Ԥ��ֵ����
	  document.getElementById("bottomWarning").scdId = statColumnDetailId;
	  //�����ı���ɫ(��ʼֵ)
	  warningObj.bottomFontColor = "ff0000";
	  //ʹ��ͳ������ϸID��ʾ��Ԥ��ֵ����
	  document.getElementById("bottomFontColor").scdId = statColumnDetailId;
	  //���ޱ�����ɫ(��ʼֵ)
	  warningObj.bottomBackColor = "ffffff";
	  //ʹ��ͳ������ϸID��ʾ��Ԥ��ֵ����
	  document.getElementById("bottomBackColor").scdId = statColumnDetailId;
	  //��ģ���б�̬�����ҳ���Ϲ��û�ѡȡ
	  var htmlStr = "";
	      for (var i = 0; i < templateList.length; i++){
//            htmlStr += "<div class='menu1'>";		
//            htmlStr += "<input type='checkbox' id='" + templateList[i].code + "'" 
//                         + " name='" + statColumnDetailId + "' value='" + i + "' onclick='saveTemplate(this.id, this.name, this.value);'/>"
//                         + templateList[i].name;
//songfupeng 20091208 ���document.getElementById("isMerger")Ϊnull,��û�е��������ĳ����ǩ;
//songfupeng 20091208 ���document.getElementById("isMerger")��Ϊnull,����������ĳ����ǩ;
   if(document.getElementById("isMerger")==null){
	   if(updateIsMerger>0){
			htmlStr +="<select id='"+templateList[i].code+"' name='"+statColumnDetailId+"' onchange='saveTemplate1(this.id,this.name)' disabled='disabled'><option value='none'>&nbsp;&nbsp;��ѡ��&nbsp;&nbsp;</option></option><option value='condition'>ѡ��������</option><option value='uncondition'>ѡ��������</option><select>"+templateList[i].name;
		}else{
			htmlStr +="<select id='"+templateList[i].code+"' name='"+statColumnDetailId+"' onchange='saveTemplate1(this.id,this.name)'><option value='none'>&nbsp;&nbsp;��ѡ��&nbsp;&nbsp;</option></option><option value='condition'>ѡ��������</option><option value='uncondition'>ѡ��������</option><select>"+templateList[i].name;
		}
   }else{
     if(isMergerStatus!=0){
     	htmlStr +="<select id='"+templateList[i].code+"' name='"+statColumnDetailId+"' onchange='saveTemplate1(this.id,this.name)' disabled='disabled'><option value='none'>&nbsp;&nbsp;��ѡ��&nbsp;&nbsp;</option></option><option value='condition'>ѡ��������</option><option value='uncondition'>ѡ��������</option><select>"+templateList[i].name;
     }else{
			htmlStr +="<select id='"+templateList[i].code+"' name='"+statColumnDetailId+"' onchange='saveTemplate1(this.id,this.name)'><option value='none'>&nbsp;&nbsp;��ѡ��&nbsp;&nbsp;</option></option><option value='condition'>ѡ��������</option><option value='uncondition'>ѡ��������</option><select>"+templateList[i].name;
		}
   }
	
            
            htmlStr += "</div>";
            //������ͳ������ϸ��Ӧ��ģ�����鸳ֵ;1:ͳ������ϸ��Ӧ��ģ�屻ѡ��,0��ͳ������ϸ��Ӧ��ģ��δ��ѡ��
//            templateArray[i] = 0;
	      }
	      
	  //�ж�ͳ������ϸ��Ӧ��ģ���Ƿ񱻱����
	  if (!templateArrayAll[statColumnDetailId]){
	      //�ѵ���ͳ������ϸ��Ӧ�����鱣�浽��ͳ������ϸ��Ӧ��ģ�������У�����ͳ������ϸId��ֵ��ͳ������ϸ��Ӧģ������
	      templateArrayAll[statColumnDetailId] = templateArray;
	  }
	  //�ж�ͳ������ϸ��Ӧ������Ԥ��ֵ�����Ƿ񱻱����
	  if (!warningArrayAll[statColumnDetailId]){
	      //�ѵ���ͳ������ϸ��Ӧ�����鱣�浽��ͳ������ϸ��Ӧ��Ԥ��ֵ�����У�����ͳ������ϸId��ֵ��Ԥ��ֵ����
	      warningArrayAll[statColumnDetailId] = warningObj;
	  }
	  document.getElementById("templateList").innerHTML = htmlStr;
	  //�ָ�ͳ������ϸ��Ӧģ��ѡ��״̬
//	  for (var i = 0; i < templateArrayAll[statColumnDetailId].length; i++){
//	      if (templateArrayAll[statColumnDetailId][i] != 0){
//	          document.getElementById(templateArrayAll[statColumnDetailId][i]).checked = "checked";	
//	      }	
//	  }
     //songfuprng 090513 �ָ�ͳ������ϸ��Ӧģ��ѡ��״̬
	  for (var i = 0; i < templateArrayAll[statColumnDetailId].length; i++){
	      if (templateArrayAll[statColumnDetailId][i] != 0){
	          var templateArrayAllValue=templateArrayAll[statColumnDetailId][i].split("_");
	          var templateOptions=document.getElementById(templateArrayAllValue[0]).options;
	          for(var j=0;j<templateOptions.length;j++){
	          	if(templateOptions[j].value == templateArrayAllValue[1]){
	          		templateOptions[j].selected="selected";
	          	}
	          }
	      }	
	  }
	  //�ָ�ͳ������ϸԤ��ֵ
	  //����Ԥ��ֵ
	  document.getElementById("topWarning").value = warningArrayAll[statColumnDetailId].topWarning;
	  //�����ı���ɫ
	  document.getElementById("topFontColor").style.color = warningArrayAll[statColumnDetailId].topFontColor;
	  //���ޱ�����ɫ
	  document.getElementById("topBackColor").style.backgroundColor = warningArrayAll[statColumnDetailId].topBackColor;
	  //����Ԥ��ֵ
	  document.getElementById("bottomWarning").value = warningArrayAll[statColumnDetailId].bottomWarning;
	  //�����ı���ɫ
	  document.getElementById("bottomFontColor").style.color = warningArrayAll[statColumnDetailId].bottomFontColor;
	  //���ޱ�����ɫ
	  document.getElementById("bottomBackColor").style.backgroundColor = warningArrayAll[statColumnDetailId].bottomBackColor;
}

//����ͳ������ϸ��Ӧ��ģ����Ϣ value:ģ����ʾ���
function saveTemplate(templateId, statColumnDetailId, value){
	  if (document.getElementById(templateId).checked){
	  	  templateArrayAll[statColumnDetailId][templateArrayAll[statColumnDetailId].length] = templateId;
	  }else {
	  	  for (var i = 0; i < templateArrayAll[statColumnDetailId].length; i++){
	  	      if (templateArrayAll[statColumnDetailId][i] == templateId){
	  	          templateArrayAll[statColumnDetailId][i] = 0;  
	  	          break; 	
	  	      }	
	  	  }
	  }
}
//songfupeng 090513 �����б�ʱ�������û�ѡ��ͳ���ж�Ӧ��ģ��
function saveTemplate1(templateId,statColumnDetailId){
    var selectValue=document.getElementById(templateId).value;
    var isAddTemplate=true;
    for (var i = 0; i < templateArrayAll[statColumnDetailId].length; i++){
          var templateArrayAllId="'"+templateArrayAll[statColumnDetailId][i]+"'";
 	      if (templateArrayAllId.indexOf(templateId)>-1){
 	          if(selectValue == "none"){
 	            templateArrayAll[statColumnDetailId][i] = 0;
 	          }else{
 	            templateArrayAll[statColumnDetailId][i] = templateId+"_"+selectValue
 	          }
            isAddTemplate=false;
 	      }	       	  
	}
	 if(isAddTemplate){
	   templateArrayAll[statColumnDetailId][i]=templateId+"_"+selectValue;
	 }
	  
}


//��ȡԪ����������ҳ���x��y���ꡣ    
function pageX(elem){
    return elem.offsetParent?(elem.offsetLeft+pageX(elem.offsetParent)):elem.offsetLeft;
}
function pageY(elem){
    return elem.offsetParent?(elem.offsetTop+pageY(elem.offsetParent)):elem.offsetTop;
}

