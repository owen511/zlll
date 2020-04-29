/**
 * ҳǩindex ��0��ʼ
 */

function tabpage(){
	this.id = null;
	this.datatable = null;
	this.tabNames = new Array(); // ����
	this.tabIndexs = new Array(); // 
	this.tabFilters = new Array(); // 
	this.setTabNames = function(tabnames){};
	this.getSelectedTabIndex = function(){};
	this.switchToTab = function(index){};
	this.onTabClick = null;
	this.currentSelectedTabIndex = 0;
	this.setSelectedTabIndex = function(index){};
	this.setDatatablePage = function(pagenum){};
	this.setAllTabDTPageNum = function(pagenumstr){};
	this.tabPageNum=new Array();
	this.setTabIndexs = function(indexs){};
	this.setTabFilters = function(filters){};
	this.getSelectedTabFixIndex = function(){};
	this.getSelectedTabFilter = function(){};
	this.firstSelectedIndex = "";
	this.getFirstTabFilter = function(){};
	
	/**
	 * ҳǩ����¼�֮ǰ�����ӿ��ƹ��ܰ�ť��ʾ
	 * @param index
	 * @returns
	 */
	var onBeforTabClick = function(index){
		index = index.toString();
		if(typeof tabMenufun == "undefined") return;
		JQ("#query_t span").show();
		for(var menuname in tabMenufun){
			var arr = [];
			if(tabMenufun[menuname].indexOf(",")>-1){
				arr = tabMenufun[menuname].split(",");
				if(JQ.inArray(index,arr)==-1){
					JQ("#query_t [title="+menuname+"]").parents("span").hide();
				}
			}else{
				if(tabMenufun[menuname] != index){
					JQ("#query_t [title="+menuname+"]").parents("span").hide();
				}
			}
		}
	}
	/**
	 * ��ȡҳǩ��Ӧ��������
	 * @param {Object} index ҳǩindex
	 */
	this.getSelectedTabFilter = function(index){
		if(index==null) index = this.currentSelectedTabIndex;
		if(this.tabFilters.length-1<index) return "";
		return this.tabFilters[index];
	}
	
	/**
	 * ��ȡҳǩ��Ӧ��������
	 * @param {Object} index ҳǩindex
	 */
	this.getSelectedTabFixIndex = function(index){
		if(index==null) index = this.currentSelectedTabIndex;
		if(this.tabIndexs.length-1<index) return 0;
		return this.tabIndexs[index];
	}
	// ����ҳǩindex
	this.setTabIndexs = function(indexs){
		if (typeof(indexs) == "string") {
			if (indexs == "") 
				this.tabIndexs = new Array();
			else 
				this.tabIndexs = indexs.split(",");
		}
		else 
			this.tabIndexs = indexs;
	}
	
	// ���ù�������
	this.setTabFilters = function(filters){
		if (typeof(filters) == "string") {
			if (filters == "") 
				this.tabFilters = new Array();
			else 
				this.tabFilters = filters.split(",");
		}
		else 
			this.tabFilters = filters;
	}
	/**
	 * ���õ�ǰҳǩ��Ӧ��datatable��ҳ�루datatable��ҳ��
	 * @param {Object} pagenum
	 */
	this.setDatatablePage = function(pagenum){
		if(this.tabPageNum.length-1<this.currentSelectedTabIndex)
		      this.tabPageNum.push(pagenum);
		else 
		      this.tabPageNum[this.currentSelectedTabIndex] = pagenum;
		/*
		var ul = document.getElementById(this.id + "_ul");
		var lis = ul.childNodes;
		for (var i = 0; i < lis.length; i++) {
			if (this.currentSelectedTabIndex == i) 
				lis[i].pageNum = pagenum;
		}
		*/
	}
	
	/**
	 * ��ȡҳǩ��Ӧdatatable��ҳ��
	 * @param {Object} index ҳǩindex
	 */
	this.getDatatablePage = function(index){
		if(index==null) index = this.currentSelectedTabIndex;
		if(this.tabPageNum.length-1<index) return 1;
		return this.tabPageNum[index];
		/*
		var ul = document.getElementById(this.id + "_ul");
		var lis = ul.childNodes;
		for (var i = 0; i < lis.length; i++) {
			if (index == i) 
				return lis[i].pageNum;
		}
		*/
	}
	/**
	 * ��ȡ����ҳǩ����datatable�ĵ�ǰҳ��
	 */
	this.getAllTabDTPageNum =function(){
		var lis = this.tabPageNum;
		var numStr =0+"-"+lis[0];
		for (var i = 1; i < lis.length; i++) {
			numStr +="_"+i+"-"+lis[i];
		}
		return numStr;
	}
	
	/**
	 * ����ҳǩ��ѡ��index �� ��Ҫ��draw �������ʹ�ò���ʵ���л�Ч��
	 * @param {Object} index
	 */
	this.setSelectedTabIndex = function(index){
		onBeforTabClick(index);
		this.firstSelectedIndex = index;
		this.currentSelectedTabIndex = index;
	}
	/**
	 * �л���ѡ��ҳǩ
	 */
	this.draw = function(){
		this.selectTag(this.currentSelectedTabIndex);
	};
	
	/**
	 * ѡ��ָ����ҳǩ ,��ִ���û��Զ����¼� ע���switchToTab������
	 * @param {Object} index 
	 */
	this.selectTag = function(index){
		var ul = document.getElementById(this.id + "_ul");
		var lis = ul.childNodes;
		for (var i = 0; i < lis.length; i++) {
			lis[i].className = "nomal";
			if (index == i) 
				lis[i].className = "select";
		}
	}
	
	/**
	 * ��ȡѡ�е�ҳǩindex
	 */
	this.getSelectedTabIndex = function(){
		return this.currentSelectedTabIndex;
	}
	
	/**
	 * �л���ָ����ҳǩ��ͬʱִ���Զ����¼�
	 * @param {Object} index
	 */
	this.switchTab = function(index){
		this.currentSelectedTabIndex = index;
		selectTag(index);
		// �����Զ���ĵ���¼�
		if (this.onTabClick) {
			this.onTabClick(this.index);
		}
	}
	
	
	// ���ñ�ͷ
	this.setTabNames = function(names){
		if (typeof(names) == "string") {//�ַ�����ͷ
			if (names == "") 
				this.tabNames = new Array();
			else 
				this.tabNames = names.split(",");
		}
		else 
			this.tabNames = names;
	}
	
	/**
	 * ����ÿ��ҳǩ��Ӧ��datatable��ǰҳ��
	 * @param {Object} pagenumStr
	 */
	this.setAllTabDTPageNum = function(pagenumStr){
		
		if(pagenumStr==null) return;
		var tabnum = pagenumStr.split("_");
		for(var i=0;i<tabnum.length;i++){
			var num = tabnum[i].split("-")[1];
			this.tabPageNum.push(num);
		}
		
	}
	
	/**
	 * ��ʾҳǩ
	 */
	this.show = function(){
		if (typeof(this.beforeShow) == "function") {
			this.beforeShow();
		}
		var tabdiv = document.getElementById(this.id + "_tabpage");
		if(this.tabNames.length==0) tabdiv.style.display="none";
		
		var ul = document.createElement("<ul id=\"" + this.id + "_ul\" style=\"margin-left:10px;\"></ul>");
	    var i=0; var pushPagenum = false;
		if (this.tabPageNum == null || this.tabPageNum.length == 0) {
			pushPagenum = true;
			this.tabPageNum = new Array();
		}
		
		for (i = 0; i < this.tabNames.length; i++) {
			var li = document.createElement("<li id=\"" + this.id + "_li_" + i + "\" class=\"nomal\"></li>");
			var lidiv = document.createElement("<div></div>");
			lidiv.innerText = this.tabNames[i];
			li.appendChild(lidiv);
			if (i == this.currentSelectedTabIndex) 
				li.className = "select";
			li.index = i;
			if (this.onTabClick) {
				li.onTabClick = this.onTabClick;
			}
			ul.appendChild(li);
			
			if(pushPagenum)
				this.tabPageNum.push(1);
			
			li.tagpage = this;
			li.onclick = function(){
				if (event.srcElement == this && !event.type == "click") {
					return;
				}
				if(this.index == this.tagpage.currentSelectedTabIndex) return;
				var ul = document.getElementById(this.tagpage.id + "_ul");
				var lis = ul.childNodes;
				for (var i = 0; i < lis.length; i++) {
					lis[i].className = "nomal";
				}
				this.className = "select";
				this.tagpage.currentSelectedTabIndex = this.index;
				// �����Զ���ĵ���¼�
				if (this.onTabClick) {
					onBeforTabClick(this.index);
					try{
						if(this.tagpage.datatable != null){
							eval("var totalcols ="+this.tagpage.datatable+".allpage_totaljson");
							for (var prp in totalcols) {
								totalcols[prp] = "0";
							}
							totalcols["load_total"] = "true";
						}
					}catch(err){}
					this.onTabClick(this.index);
				}
			};
		}
		tabdiv.appendChild(ul);
	}
	/*
	 * �õ�Ĭ��ҳǩ����
	 */
	this.getFirstTabFilter = function(){
		if(this.firstSelectedIndex == "") return "";
		return this.tabFilters[this.firstSelectedIndex];
	}
}	
