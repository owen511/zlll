/**
 * 页签index 从0开始
 */

function tabpage(){
	this.id = null;
	this.datatable = null;
	this.tabNames = new Array(); // 数据
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
	 * 页签点击事件之前，增加控制功能按钮显示
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
	 * 获取页签对应过滤条件
	 * @param {Object} index 页签index
	 */
	this.getSelectedTabFilter = function(index){
		if(index==null) index = this.currentSelectedTabIndex;
		if(this.tabFilters.length-1<index) return "";
		return this.tabFilters[index];
	}
	
	/**
	 * 获取页签对应过滤条件
	 * @param {Object} index 页签index
	 */
	this.getSelectedTabFixIndex = function(index){
		if(index==null) index = this.currentSelectedTabIndex;
		if(this.tabIndexs.length-1<index) return 0;
		return this.tabIndexs[index];
	}
	// 设置页签index
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
	
	// 设置过滤条件
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
	 * 设置当前页签对应的datatable的页码（datatable翻页）
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
	 * 获取页签对应datatable的页面
	 * @param {Object} index 页签index
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
	 * 获取所有页签对象datatable的当前页码
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
	 * 设置页签的选中index ， 需要和draw 方法配合使用才能实现切换效果
	 * @param {Object} index
	 */
	this.setSelectedTabIndex = function(index){
		onBeforTabClick(index);
		this.firstSelectedIndex = index;
		this.currentSelectedTabIndex = index;
	}
	/**
	 * 切换到选中页签
	 */
	this.draw = function(){
		this.selectTag(this.currentSelectedTabIndex);
	};
	
	/**
	 * 选中指定的页签 ,不执行用户自定义事件 注意和switchToTab的区别
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
	 * 获取选中的页签index
	 */
	this.getSelectedTabIndex = function(){
		return this.currentSelectedTabIndex;
	}
	
	/**
	 * 切换到指定的页签，同时执行自定义事件
	 * @param {Object} index
	 */
	this.switchTab = function(index){
		this.currentSelectedTabIndex = index;
		selectTag(index);
		// 调用自定义的点击事件
		if (this.onTabClick) {
			this.onTabClick(this.index);
		}
	}
	
	
	// 设置表头
	this.setTabNames = function(names){
		if (typeof(names) == "string") {//字符串表头
			if (names == "") 
				this.tabNames = new Array();
			else 
				this.tabNames = names.split(",");
		}
		else 
			this.tabNames = names;
	}
	
	/**
	 * 设置每个页签对应的datatable当前页码
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
	 * 显示页签
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
				// 调用自定义的点击事件
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
	 * 得到默认页签条件
	 */
	this.getFirstTabFilter = function(){
		if(this.firstSelectedIndex == "") return "";
		return this.tabFilters[this.firstSelectedIndex];
	}
}	
